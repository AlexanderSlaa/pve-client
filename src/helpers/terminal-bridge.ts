/**
 * Terminal bridge — connects a browser WebSocket socket to an active
 * TerminalSession, handling framing, resize, repair, and prompt nudge.
 *
 * Why this is a separate file:
 * The bridge logic is ~340 lines of closure-coupled inner functions that
 * exercise TerminalSession (events + writeRaw) and terminal-utils
 * conversions. Keeping it here keeps Terminal.ts under the 750-line
 * threshold while preserving the ability to test the bridge independently.
 */

import type { Terminal } from "./Terminal.js";
import { TerminalSession } from "./Terminal.js";
import type {
  TerminalBrowserMessage,
  TerminalBridgeOptions,
  TerminalBrowserSocket,
  TerminalOpenOptions,
} from "./Terminal.js";
import {
  parseBrowserFrame,
  browserMessageToUtf8,
  browserMessageToBuffer,
  normalizeSs3CursorKeys,
  simplifyModifiedCursorKeys,
  repairOrphanNavigationFragments,
  splitIncompleteAnsiTail,
  hasNavigationSequence,
  isSingleNavigationSequence,
} from "./terminal-utils.js";

/**
 * Bridge a browser websocket-like socket to an active TerminalSession.
 *
 * Features:
 * - Buffers browser input until session emits `ready`
 * - Treats text frames as control-plane messages only (resize / legacy metadata)
 * - Forwards binary stdin as raw bytes for control-sequence fidelity
 * - Optionally repairs specific missing-ESC navigation fragments in compatibility mode
 * - Forwards session data/close/error to browser socket
 * - Sends optional one-time prompt nudge after readiness when idle
 */
export function bridgeTerminalSessionToSocket(
  session: TerminalSession,
  browserSocket: TerminalBrowserSocket,
  options: TerminalBridgeOptions = {}
): void {
  const resizePrefix = options.resizePrefix ?? "R:";
  const enablePromptNudge = options.enablePromptNudge ?? true;
  const promptNudgeMs = options.promptNudgeMs ?? 400;
  const promptNudgeInput = options.promptNudgeInput ?? "\r";
  const promptNudgeMaxOutputBytes = options.promptNudgeMaxOutputBytes ?? 8;
  const closeCodeOnSessionClose = options.closeCodeOnSessionClose ?? 1001;
  const coalesceNavigationRepeats = options.coalesceNavigationRepeats ?? true;
  const navigationRepeatCoalesceMs = options.navigationRepeatCoalesceMs ?? 8;
  const allowTextInputFrames = options.allowTextInputFrames ?? true;
  const enableInputRepairCompatibility = options.enableInputRepairCompatibility ?? true;
  const normalizeSs3CursorKeysEnabled = options.normalizeSs3CursorKeys ?? true;
  const normalizeSs3CursorKeysMode = options.normalizeSs3CursorKeysMode ?? "all";
  const simplifyModifiedCursorKeysEnabled = options.simplifyModifiedCursorKeys ?? false;
  const traceEnabled = options.trace ?? false;
  const traceLogger = options.traceLogger ?? ((line: string) => console.debug(line));
  const traceLabel = options.traceLabel ?? "terminal-bridge";
  let traceSequence = 0;

  const trace = (event: string, details: string) => {
    if (!traceEnabled) return;
    traceSequence += 1;
    traceLogger(`[${traceLabel}] #${traceSequence} ${event} ${details}`);
  };

  const hexPreview = (payload: Buffer) => payload.subarray(0, 8).toString("hex");

  let sessionReady = false;
  let browserClosed = false;
  let appliedResize: { cols: number; rows: number } | undefined;
  const pendingInputs: Array<{
    message: TerminalBrowserMessage;
    fromPreReadyQueue: boolean;
    isBinary: boolean;
  }> = [
    ...(options.initialInputs ?? []).map((text) => ({
      message: text as TerminalBrowserMessage,
      fromPreReadyQueue: true,
      isBinary: false,
    })),
    ...(options.initialBinaryInputs ?? []).map((buffer) => ({
      message: buffer as TerminalBrowserMessage,
      fromPreReadyQueue: true,
      isBinary: true,
    })),
  ];
  let outputSinceReadyBytes = 0;
  let sawUserStdin = false;
  let promptNudgeTimer: ReturnType<typeof setTimeout> | undefined;
  // Shared across frames so ESC fragments can be reassembled before forwarding.
  let pendingAnsiTail: Buffer = Buffer.alloc(0);
  // Timestamp for recently emitted navigation traffic. Compatibility repair
  // only runs inside this short window to avoid mutating regular typed text.
  let lastNavigationInputAt = 0;
  const navigationRepairWindowMs = 1_000;
  // Short-window repeat coalescing state for held navigation keys.
  let repeatPayload: Buffer | undefined;
  let repeatCount = 0;
  let repeatMeta:
    | { binary: boolean; normalized: boolean; simplified: boolean; repaired: boolean }
    | undefined;
  let repeatTimer: ReturnType<typeof setTimeout> | undefined;

  const writePayload = (
    payload: Buffer,
    meta: { binary: boolean; normalized: boolean; simplified: boolean; repaired: boolean }
  ) => {
    trace(
      "stdin-write",
      `bytes=${payload.byteLength} binary=${meta.binary} repaired=${meta.repaired} normalized=${meta.normalized} simplified=${meta.simplified} compat=${enableInputRepairCompatibility} head=${hexPreview(payload)}`
    );
    session.writeRaw(payload);
  };

  const flushRepeatBuffer = () => {
    if (!repeatPayload || repeatCount <= 0 || !repeatMeta) return;
    const basePayload = repeatPayload;
    const payload =
      repeatCount === 1
        ? basePayload
        : Buffer.concat(Array.from({ length: repeatCount }, () => basePayload));
    trace(
      "stdin-coalesce-flush",
      `count=${repeatCount} bytes=${payload.byteLength} head=${hexPreview(payload)}`
    );
    writePayload(payload, repeatMeta);
    repeatPayload = undefined;
    repeatCount = 0;
    repeatMeta = undefined;
    if (repeatTimer) {
      clearTimeout(repeatTimer);
      repeatTimer = undefined;
    }
  };

  const scheduleRepeatFlush = () => {
    if (repeatTimer) {
      clearTimeout(repeatTimer);
    }
    repeatTimer = setTimeout(() => {
      flushRepeatBuffer();
    }, navigationRepeatCoalesceMs);
  };

  const enqueueOrWritePayload = (
    payload: Buffer,
    meta: { binary: boolean; normalized: boolean; simplified: boolean; repaired: boolean }
  ) => {
    // Coalesce only single complete navigation sequences. Mixed payloads are
    // flushed immediately to preserve ordering and user-visible responsiveness.
    if (!coalesceNavigationRepeats || !isSingleNavigationSequence(payload)) {
      flushRepeatBuffer();
      writePayload(payload, meta);
      return;
    }

    if (
      repeatPayload &&
      repeatMeta &&
      repeatPayload.equals(payload) &&
      repeatMeta.binary === meta.binary &&
      repeatMeta.normalized === meta.normalized &&
      repeatMeta.simplified === meta.simplified &&
      repeatMeta.repaired === meta.repaired
    ) {
      repeatCount += 1;
      scheduleRepeatFlush();
      return;
    }

    flushRepeatBuffer();
    repeatPayload = payload;
    repeatCount = 1;
    repeatMeta = meta;
    scheduleRepeatFlush();
  };

  const applyResize = (cols: number, rows: number, eventName: string, force = false) => {
    const alreadyApplied =
      appliedResize?.cols === cols && appliedResize?.rows === rows;
    if (alreadyApplied && !force) {
      trace("skip-resize", `cols=${cols} rows=${rows}`);
      return;
    }

    appliedResize = { cols, rows };
    trace(eventName, `cols=${cols} rows=${rows}`);
    session.emit("resize", cols, rows);
  };

  const forwardBrowserInput = (
    message: TerminalBrowserMessage,
    isBinary: boolean,
    fromPreReadyQueue = false
  ) => {
    if (!sessionReady) {
      const len = isBinary
        ? browserMessageToBuffer(message).byteLength
        : browserMessageToUtf8(message).length;
      trace("browser-queue", `len=${len} binary=${isBinary}`);
      pendingInputs.push({ message, isBinary, fromPreReadyQueue: true });
      return;
    }

    if (isBinary) {
      const payloadSource = browserMessageToBuffer(message);
      // Reassemble any split ANSI tail before normalization and forwarding.
      const merged =
        pendingAnsiTail.byteLength > 0
          ? Buffer.concat([pendingAnsiTail, payloadSource])
          : payloadSource;
      const split = splitIncompleteAnsiTail(merged);
      pendingAnsiTail = split.pending;
      if (split.complete.byteLength === 0) {
        trace(
          "stdin-buffer",
          `bytes=${pendingAnsiTail.byteLength} head=${hexPreview(pendingAnsiTail)}`
        );
        return;
      }

      const ss3Normalized = normalizeSs3CursorKeysEnabled
        ? normalizeSs3CursorKeys(split.complete, normalizeSs3CursorKeysMode)
        : split.complete;
      const simplifiedPayload = simplifyModifiedCursorKeysEnabled
        ? simplifyModifiedCursorKeys(ss3Normalized)
        : ss3Normalized;
      const repairedPayload = enableInputRepairCompatibility
        ? repairOrphanNavigationFragments(
            simplifiedPayload,
            Date.now() - lastNavigationInputAt <= navigationRepairWindowMs
          )
        : simplifiedPayload;
      const payload = repairedPayload;
      const repaired = payload.compare(simplifiedPayload) !== 0;
      if (hasNavigationSequence(payload)) {
        lastNavigationInputAt = Date.now();
      }
      sawUserStdin = true;
      enqueueOrWritePayload(payload, {
        binary: true,
        repaired,
        normalized: payload.compare(payloadSource) !== 0,
        simplified: simplifiedPayload.compare(ss3Normalized) !== 0,
      });
      return;
    }

    const text = browserMessageToUtf8(message);

    const parsedFrame = parseBrowserFrame(text, resizePrefix);
    trace(
      "browser-frame",
      `kind=${parsedFrame.kind} source=${parsedFrame.source} preReady=${fromPreReadyQueue}`
    );

    if (parsedFrame.kind === "resize") {
      flushRepeatBuffer();
      applyResize(parsedFrame.cols, parsedFrame.rows, "emit-resize");
      return;
    }

    if (!allowTextInputFrames) {
      trace(
        "drop-text-input",
        `source=${parsedFrame.source} bytes=${Buffer.byteLength(parsedFrame.data, "utf8")}`
      );
      return;
    }

    const inputCols = parsedFrame.cols;
    const inputRows = parsedFrame.rows;
    const hasInputSize =
      inputCols !== undefined &&
      inputRows !== undefined &&
      Number.isInteger(inputCols) &&
      Number.isInteger(inputRows) &&
      inputCols > 0 &&
      inputRows > 0;
    if (hasInputSize) {
      applyResize(inputCols, inputRows, "input-resize");
    }

    const isQueuedPromptTrigger =
      fromPreReadyQueue && parsedFrame.data === promptNudgeInput;
    if (!isQueuedPromptTrigger) {
      sawUserStdin = true;
    }
    const textPayload = Buffer.from(parsedFrame.data, "utf8");
    // Apply the same coalescing path for legacy text stdin frames.
    const mergedTextPayload =
      pendingAnsiTail.byteLength > 0
        ? Buffer.concat([pendingAnsiTail, textPayload])
        : textPayload;
    const splitTextPayload = splitIncompleteAnsiTail(mergedTextPayload);
    pendingAnsiTail = splitTextPayload.pending;
    if (splitTextPayload.complete.byteLength === 0) {
      trace(
        "stdin-buffer",
        `bytes=${pendingAnsiTail.byteLength} head=${hexPreview(pendingAnsiTail)}`
      );
      return;
    }

    const ss3NormalizedTextPayload = normalizeSs3CursorKeysEnabled
      ? normalizeSs3CursorKeys(splitTextPayload.complete, normalizeSs3CursorKeysMode)
      : splitTextPayload.complete;
    const simplifiedTextPayload = simplifyModifiedCursorKeysEnabled
      ? simplifyModifiedCursorKeys(ss3NormalizedTextPayload)
      : ss3NormalizedTextPayload;
    const repairedTextPayload = enableInputRepairCompatibility
      ? repairOrphanNavigationFragments(
          simplifiedTextPayload,
          Date.now() - lastNavigationInputAt <= navigationRepairWindowMs
        )
      : simplifiedTextPayload;
    const normalizedTextPayload = repairedTextPayload;
    const repaired = normalizedTextPayload.compare(simplifiedTextPayload) !== 0;
    if (hasNavigationSequence(normalizedTextPayload)) {
      lastNavigationInputAt = Date.now();
    }
    enqueueOrWritePayload(normalizedTextPayload, {
      binary: false,
      repaired,
      normalized: normalizedTextPayload.compare(splitTextPayload.complete) !== 0,
      simplified: simplifiedTextPayload.compare(ss3NormalizedTextPayload) !== 0,
    });
  };

  browserSocket.on("message", (raw, isBinary) => {
    const binary = isBinary === true;
    if (binary) {
      const payload = browserMessageToBuffer(raw);
      trace(
        "browser-message",
        `len=${payload.byteLength} binary=true head=${hexPreview(payload)}`
      );
    } else {
      const text = browserMessageToUtf8(raw);
      trace("browser-message", `len=${text.length} binary=false`);
    }
    forwardBrowserInput(raw, binary);
  });

  browserSocket.on("close", () => {
    flushRepeatBuffer();
    browserClosed = true;
    if (promptNudgeTimer) {
      clearTimeout(promptNudgeTimer);
      promptNudgeTimer = undefined;
    }
    session.close();
  });

  session.on("data", (data) => {
    if (sessionReady) {
      outputSinceReadyBytes += data.length;
    }
    trace("session-data", `bytes=${data.length} head=${hexPreview(data)}`);

    if (browserSocket.readyState === browserSocket.OPEN) {
      browserSocket.send(data);
    }
  });

  session.on("close", () => {
    flushRepeatBuffer();
    if (browserSocket.readyState === browserSocket.OPEN) {
      browserSocket.close(closeCodeOnSessionClose, options.closeReasonOnSessionClose);
    }
  });

  session.on("error", (err) => {
    if (browserSocket.readyState !== browserSocket.OPEN) return;
    const errorFrame = options.onErrorFrame?.(err);
    if (errorFrame !== undefined) {
      browserSocket.send(errorFrame);
    }
  });

  session.on("ready", () => {
    // Proxmox terminal reconnects can reset PTY size back to defaults.
    // Reapply the last known browser geometry every time readiness flips on.
    if (appliedResize) {
      applyResize(
        appliedResize.cols,
        appliedResize.rows,
        "reapply-resize-on-ready",
        true
      );
    }
  });

  session.once("ready", () => {
    sessionReady = true;
    trace("session-ready", `queued=${pendingInputs.length}`);

    for (const input of pendingInputs) {
      forwardBrowserInput(input.message, input.isBinary, input.fromPreReadyQueue);
    }
    pendingInputs.length = 0;

    if (enablePromptNudge) {
      promptNudgeTimer = setTimeout(() => {
        if (browserClosed || !sessionReady || sawUserStdin) return;
        if (outputSinceReadyBytes > promptNudgeMaxOutputBytes) {
          trace("prompt-nudge-skip", `outputBytes=${outputSinceReadyBytes}`);
          return;
        }
        trace(
          "prompt-nudge",
          `bytes=${Buffer.byteLength(promptNudgeInput, "utf8")}`
        );
        session.write(promptNudgeInput);
      }, promptNudgeMs);
    }
  });
}

/**
 * Open a terminal session and bridge it to a browser socket while preserving
 * browser input that may arrive before the session is available.
 */
export async function openTerminalBridge(
  terminal: Terminal,
  browserSocket: TerminalBrowserSocket,
  openOptions: TerminalOpenOptions = {},
  bridgeOptions: TerminalBridgeOptions = {}
): Promise<TerminalSession> {
  const preOpenTextInputs: string[] = [];
  const preOpenBinaryInputs: Buffer[] = [];
  let bridgeAttached = false;
  let browserClosedBeforeAttach = false;

  browserSocket.on("message", (raw, isBinary) => {
    if (bridgeAttached) return;
    if (isBinary === true) {
      preOpenBinaryInputs.push(browserMessageToBuffer(raw));
      return;
    }
    preOpenTextInputs.push(browserMessageToUtf8(raw));
  });

  browserSocket.on("close", () => {
    if (!bridgeAttached) {
      browserClosedBeforeAttach = true;
    }
  });

  const session = await terminal.open(openOptions);
  if (browserClosedBeforeAttach) {
    session.close();
    return session;
  }

  bridgeAttached = true;
  bridgeTerminalSessionToSocket(session, browserSocket, {
    ...bridgeOptions,
    initialInputs: [
      ...preOpenTextInputs,
      ...(bridgeOptions.initialInputs ?? []),
    ],
    initialBinaryInputs: [
      ...preOpenBinaryInputs,
      ...(bridgeOptions.initialBinaryInputs ?? []),
    ],
  });

  return session;
}
