/**
 * Terminal wire-format utilities — pure functions for parsing, converting,
 * and repairing terminal data flowing across WebSocket boundaries.
 *
 * Shared between TerminalSession, bridgeTerminalSessionToSocket, and tests.
 */

import type { RawData } from "ws";
import type { TerminalBrowserMessage } from "./Terminal.js";

// ---------------------------------------------------------------------------
// Browser message → Buffer / string converters
// ---------------------------------------------------------------------------

/** Convert raw WebSocket `ws` data to a Node Buffer. */
export function rawToBuffer(data: RawData): Buffer {
  if (typeof data === "string") return Buffer.from(data);
  if (Buffer.isBuffer(data)) return data;
  if (data instanceof ArrayBuffer) return Buffer.from(data);
  if (Array.isArray(data))
    return Buffer.concat(
      data.map((part) =>
        Buffer.isBuffer(part) ? part : Buffer.from(part)
      )
    );
  throw new Error(
    `Unsupported websocket payload type: ${Object.prototype.toString.call(data)}`
  );
}

/** Convert a terminal browser message to a UTF-8 string. */
export function browserMessageToUtf8(data: TerminalBrowserMessage): string {
  if (typeof data === "string") return data;
  if (Buffer.isBuffer(data)) return data.toString("utf8");
  if (data instanceof ArrayBuffer) return Buffer.from(data).toString("utf8");
  if (Array.isArray(data)) {
    return Buffer.concat(
      data.map((part) => {
        if (Buffer.isBuffer(part)) return part;
        if (part instanceof ArrayBuffer) return Buffer.from(part);
        return Buffer.from(part.buffer, part.byteOffset, part.byteLength);
      })
    ).toString("utf8");
  }
  return Buffer.from(data.buffer, data.byteOffset, data.byteLength).toString(
    "utf8"
  );
}

/** Convert a terminal browser message to a Buffer. */
export function browserMessageToBuffer(data: TerminalBrowserMessage): Buffer {
  if (typeof data === "string") return Buffer.from(data, "utf8");
  if (Buffer.isBuffer(data)) return data;
  if (data instanceof ArrayBuffer) return Buffer.from(data);
  if (Array.isArray(data)) {
    return Buffer.concat(
      data.map((part) => {
        if (Buffer.isBuffer(part)) return part;
        if (part instanceof ArrayBuffer) return Buffer.from(part);
        return Buffer.from(part.buffer, part.byteOffset, part.byteLength);
      })
    );
  }
  return Buffer.from(data.buffer, data.byteOffset, data.byteLength);
}

// ---------------------------------------------------------------------------
// ANSI / CSI / SS3 helpers
// ---------------------------------------------------------------------------

/**
 * Normalize SS3 cursor key sequences (ESC O A/B/C/D/H/F) to CSI
 * (ESC [ A/B/C/D/H/F).
 */
export function normalizeSs3CursorKeys(
  payload: Buffer,
  mode: "all" | "vertical-only" = "all"
): Buffer {
  const finals =
    mode === "vertical-only" ? [0x41, 0x42] : [0x41, 0x42, 0x43, 0x44, 0x48, 0x46];
  const normalized: number[] = [];
  let changed = false;

  for (let index = 0; index < payload.length; index += 1) {
    const current = payload[index];
    const next = payload[index + 1];
    const final = payload[index + 2];

    if (current === 0x1b && next === 0x4f && finals.includes(final)) {
      normalized.push(0x1b, 0x5b, final);
      changed = true;
      index += 2;
      continue;
    }

    normalized.push(current);
  }

  return changed ? Buffer.from(normalized) : payload;
}

/**
 * Collapse modified CSI cursor keys (e.g. ESC[1;2D from Shift+Left) to plain
 * cursor keys (ESC[D) for shells that do not handle modifiers.
 */
export function simplifyModifiedCursorKeys(payload: Buffer): Buffer {
  const ESC = String.fromCharCode(27);
  const text = payload.toString("utf8");
  const simplified = text.replace(
    new RegExp(`${ESC}\\[[0-9]+;[0-9]+([ABCDHF])`, "g"),
    `${ESC}[$1`
  );
  if (simplified === text) return payload;
  return Buffer.from(simplified, "utf8");
}

/** Detect whether a payload contains any navigation ESC sequence. */
export function hasNavigationSequence(payload: Buffer): boolean {
  const ESC = String.fromCharCode(27);
  const text = payload.toString("utf8");
  return new RegExp(`${ESC}(?:\\[[0-9;]*[ABCDHF~]|O[ABCDHF])`).test(text);
}

/** Check if the entire payload is a single navigation sequence. */
export function isSingleNavigationSequence(payload: Buffer): boolean {
  const ESC = String.fromCharCode(27);
  const text = payload.toString("utf8");
  return new RegExp(`^${ESC}(?:\\[[0-9;]*[ABCDHF~]|O[ABCDHF])$`).test(text);
}

/**
 * Repair orphan navigation fragments that leaked without their ESC prefix.
 * Only applies when a navigation sequence was seen recently to avoid
 * mutating regular typed text.
 */
export function repairOrphanNavigationFragments(
  payload: Buffer,
  recentNavigation: boolean
): Buffer {
  if (!recentNavigation) return payload;

  const text = payload.toString("utf8");

  // Single final-byte leaks are the most common corruption when ESC is lost.
  if (/^[ABCDHF]$/.test(text)) {
    return Buffer.from(`\u001b[${text}`, "utf8");
  }

  // Under sustained repeats we can occasionally receive a short burst of
  // final bytes with all ESC bytes dropped (for example "DDD").
  // Keep this narrow to avoid over-repairing normal typed text.
  if (/^[ABCDHF]{2,4}$/.test(text)) {
    const repaired = Array.from(text)
      .map((final) => `\u001b[${final}`)
      .join("");
    return Buffer.from(repaired, "utf8");
  }

  // Some repeats leak as mixed bracket/final bursts (for example "[DD[D").
  // Rebuild them into discrete CSI navigation sequences when the payload is
  // entirely composed of navigation final bytes and '[' markers.
  if (/^[[]ABCDHF]{2,24}$/.test(text) && text.includes("[")) {
    const ESC = String.fromCharCode(27);
    let repaired: string[] = [];
    for (let index = 0; index < text.length; ) {
      if (text[index] === "[") {
        let j = index + 1;
        while (j < text.length && /[ABCDHF]/.test(text[j])) {
          repaired.push(`${ESC}[${text[j]}`);
          j++;
        }
        index = j;
      } else {
        index += 1;
      }
    }
    if (repaired.length > 0) {
      return Buffer.from(repaired.join(""), "utf8");
    }
  }

  if (/^\[[ABCDHF]$/.test(text) || /^\[[1-8]~$/.test(text)) {
    return Buffer.from(`\u001b${text}`, "utf8");
  }

  if (/^O[ABCDHF]$/.test(text)) {
    return Buffer.from(`\u001b${text}`, "utf8");
  }

  return payload;
}

/**
 * Split trailing incomplete ANSI prefix (e.g. stray ESC) from payload so it
 * can be reassembled with the next incoming frame before forwarding.
 */
export function splitIncompleteAnsiTail(payload: Buffer): {
  complete: Buffer;
  pending: Buffer;
} {
  const ESC = 0x1b;
  const CSI = 0x5b;
  const SS3 = 0x4f;

  for (let index = 0; index < payload.length; index += 1) {
    if (payload[index] !== ESC) continue;

    const next = payload[index + 1];
    if (next === undefined) {
      return {
        complete: payload.subarray(0, index),
        pending: payload.subarray(index),
      };
    }

    // CSI: ESC [ params/intermediates ... final(0x40-0x7E)
    if (next === CSI) {
      let cursor = index + 2;
      if (cursor >= payload.length) {
        return {
          complete: payload.subarray(0, index),
          pending: payload.subarray(index),
        };
      }

      while (cursor < payload.length) {
        const byte = payload[cursor];
        const isFinal = byte >= 0x40 && byte <= 0x7e;
        if (isFinal) {
          index = cursor;
          break;
        }

        const isParam = byte >= 0x30 && byte <= 0x3f;
        const isIntermediate = byte >= 0x20 && byte <= 0x2f;
        if (!isParam && !isIntermediate) {
          // Malformed CSI: do not buffer it into the next frame.
          index = cursor;
          break;
        }

        cursor += 1;
      }

      if (cursor >= payload.length) {
        return {
          complete: payload.subarray(0, index),
          pending: payload.subarray(index),
        };
      }

      continue;
    }

    // SS3: ESC O final(0x40-0x7E)
    if (next === SS3) {
      const final = payload[index + 2];
      if (final === undefined) {
        return {
          complete: payload.subarray(0, index),
          pending: payload.subarray(index),
        };
      }
      const isFinal = final >= 0x40 && final <= 0x7e;
      index = isFinal ? index + 2 : index + 1;
      continue;
    }

    // Other ESC-prefixed sequences are treated as 2-byte forms.
    index += 1;
  }

  return { complete: payload, pending: Buffer.alloc(0) };
}

// ---------------------------------------------------------------------------
// Browser frame parsing
// ---------------------------------------------------------------------------

type ParsedBrowserFrame =
  | { kind: "resize"; cols: number; rows: number; source: "json" | "legacy" }
  | {
      kind: "input";
      data: string;
      source: "json" | "legacy";
      cols?: number;
      rows?: number;
    };

/**
 * Parse a text message from the browser into a structured resize or input
 * frame. Supports both JSON (structured) and legacy prefix formats.
 */
export function parseBrowserFrame(
  text: string,
  resizePrefix: string
): ParsedBrowserFrame {
  // Structured JSON frames are the primary protocol. We keep legacy parsing
  // for backward compatibility with older browser senders.
  if (text.startsWith("{")) {
    try {
      const parsed = JSON.parse(text) as {
        type?: unknown;
        cols?: unknown;
        rows?: unknown;
        data?: unknown;
      };
      if (parsed.type === "resize") {
        const cols = Number(parsed.cols);
        const rows = Number(parsed.rows);
        if (
          Number.isInteger(cols) &&
          Number.isInteger(rows) &&
          cols > 0 &&
          rows > 0
        ) {
          return { kind: "resize", cols, rows, source: "json" };
        }
      }
      if (parsed.type === "input" && typeof parsed.data === "string") {
        const cols = Number(parsed.cols);
        const rows = Number(parsed.rows);
        const hasSize =
          Number.isInteger(cols) &&
          Number.isInteger(rows) &&
          cols > 0 &&
          rows > 0;
        if (hasSize) {
          return { kind: "input", data: parsed.data, source: "json", cols, rows };
        }
        return { kind: "input", data: parsed.data, source: "json" };
      }
    } catch {
      // Fall through to legacy format parsing.
    }
  }

  if (text.startsWith(resizePrefix)) {
    const parts = text.slice(resizePrefix.length).split(":");
    if (parts.length !== 2)
      return { kind: "input", data: text, source: "legacy" };
    const [cols, rows] = parts;
    const parsedCols = Number(cols);
    const parsedRows = Number(rows);
    if (
      Number.isInteger(parsedCols) &&
      Number.isInteger(parsedRows) &&
      parsedCols > 0 &&
      parsedRows > 0
    ) {
      return {
        kind: "resize",
        cols: parsedCols,
        rows: parsedRows,
        source: "legacy",
      };
    }
  }

  return { kind: "input", data: text, source: "legacy" };
}
