const ESC = String.fromCharCode(27);
import EventEmitter from "node:events";
import type {ClusterAPI} from "../api/cluster/types.js";
import type {Client} from "../index.js";
import WS, {type RawData} from "ws";
import TerminalJS from "terminal.js";
import type {TermState} from "terminal.js";

type VMType = "qemu" | "lxc";
type ClusterResource = ClusterAPI["/cluster/resources"]["GET"]["return"][number];

type SocketBuildResult = {
    info: TerminalConnectionInfo;
    socket: WS;
};

type SocketFactory = () => Promise<SocketBuildResult>;

export type TerminalTicket = {
    port: number;
    ticket: string;
    upid: string;
    user: string;
};

export type TerminalConnectionInfo = {
    vmid: number;
    node: string;
    type: VMType;
    ticket: TerminalTicket;
    websocketUrl: string;
    authMessage: string;
};

export enum TerminalState {
    START = 1,
    CONNECTING = 2,
    CONNECTED = 3,
    DISCONNECTING = 4,
    DISCONNECTED = 5,
    RECONNECTING = 6,
}

export type TerminalPipe = {
    send(data: string | ArrayBufferLike | Blob | ArrayBufferView): void;
    close(code?: number, data?: string | Buffer): void;
    on(event: "message", listener: (data: Buffer | string) => void): unknown;
    once(event: "close", listener: () => void): unknown;
} & EventEmitter;

/**
 * Represents a rendered terminal state using terminal.js
 * Provides access to the parsed terminal buffer and state.
 */
export type TerminalRendererState = {
    /**
     * The underlying terminal.js state object containing parsed terminal buffer.
     * Use this to render the terminal to HTML, ANSI, plain text, etc.
     */
    state: TermState;
    /**
     * Current terminal dimensions (columns x rows)
     */
    dimensions: { columns: number; rows: number };
};

export type TerminalOpenOptions = {
    rejectUnauthorized?: boolean;
    pipeTo?: TerminalPipe;
    reconnect?: boolean;
    reconnectIntervalMs?: number;
    reconnectMaxAttempts?: number;
    /**
     * Optional terminal renderer for parsing escape sequences.
     * If provided, the renderer will receive all incoming data.
     */
    renderer?: TerminalRenderer;
};

export type TerminalBrowserMessage =
    | string
    | Buffer
    | ArrayBuffer
    | ArrayBufferView
    | Array<Buffer | ArrayBuffer | ArrayBufferView>;

export type TerminalBrowserSocket = {
    readonly OPEN: number;
    readonly readyState: number;
    send(data: Buffer | string): void;
    close(code?: number, reason?: string): void;
    on(event: "message", listener: (data: TerminalBrowserMessage, isBinary?: boolean) => void): unknown;
    on(event: "close", listener: () => void): unknown;
};

export type TerminalBridgeOptions = {
    /** Browser resize frame prefix, defaults to `R:` */
    resizePrefix?: string;
    /** Enables bridge frame-order tracing to the configured logger */
    trace?: boolean;
    /** Optional logger used when trace is enabled, defaults to console.debug */
    traceLogger?: (line: string) => void;
    /** Optional trace label to identify the bridged session */
    traceLabel?: string;
    /** Delay before sending a one-time prompt nudge, defaults to 400ms */
    promptNudgeMs?: number;
    /** One-time prompt nudge payload, defaults to carriage return */
    promptNudgeInput?: string;
    /** Enable one-time prompt nudge after readiness, defaults to true */
    enablePromptNudge?: boolean;
    /**
     * Maximum output bytes allowed before suppressing the prompt nudge, defaults to 8.
     *
     * Why this exists:
     * - Some guests emit a tiny startup fragment before actually showing a prompt.
     * - If we suppress nudge on any output, initial prompt can regress.
     * - If we always nudge, delayed carriage return can relocate cursor after real output.
     *
     * This threshold keeps one nudge for tiny handshake noise, but blocks it once
     * substantial output has started to avoid cursor-jump regressions.
     */
    promptNudgeMaxOutputBytes?: number;
    /** Frame formatter for terminal-session errors sent back to browser socket */
    onErrorFrame?: (error: Error) => Buffer | string | undefined;
    /** Browser socket close code when terminal session closes, defaults to 1001 */
    closeCodeOnSessionClose?: number;
    /** Browser socket close reason when terminal session closes */
    closeReasonOnSessionClose?: string;
    /** Pre-buffered browser input to process once session is ready */
    initialInputs?: string[];
    /** Pre-buffered binary browser input to process once session is ready */
    initialBinaryInputs?: Buffer[];
    /** Coalesce repeated navigation keys over a short idle window */
    coalesceNavigationRepeats?: boolean;
    /** Idle window (ms) before flushing coalesced navigation repeats */
    navigationRepeatCoalesceMs?: number;
    /* Temporary compatibility only: keep legacy text stdin and narrow ESC-repair
     * fallback until strict binary stdin is stable everywhere. */
    allowTextInputFrames?: boolean;
    enableInputRepairCompatibility?: boolean;
    /**
     * Normalize SS3 cursor key sequences (ESC O A/B/C/D/H/F) to CSI
     * (ESC [ A/B/C/D/H/F). Useful when backend line editors do not handle
     * application cursor mode consistently.
     */
    normalizeSs3CursorKeys?: boolean;
    /**
     * Optional SS3 normalization scope.
     * - "all": normalize A/B/C/D/H/F
     * - "vertical-only": normalize A/B only
     */
    normalizeSs3CursorKeysMode?: "all" | "vertical-only";
    /**
     * Collapse modified CSI cursor keys (for example ESC[1;2D from Shift+Left)
     * to plain cursor keys (ESC[D) for shells that do not handle modifiers.
     */
    simplifyModifiedCursorKeys?: boolean;
};

function normalizeSs3CursorKeys(payload: Buffer, mode: "all" | "vertical-only" = "all"): Buffer {
    const finals = mode === "vertical-only"
        ? [0x41, 0x42]
        : [0x41, 0x42, 0x43, 0x44, 0x48, 0x46];
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

function simplifyModifiedCursorKeys(payload: Buffer): Buffer {
    const text = payload.toString("utf8");
    const simplified = text.replace(new RegExp(`${ESC}\\[[0-9]+;[0-9]+([ABCDHF])`, "g"), `${ESC}[$1`);
    if (simplified === text) return payload;
    return Buffer.from(simplified, "utf8");
}

function hasNavigationSequence(payload: Buffer): boolean {
    const text = payload.toString("utf8");
    return new RegExp(`${ESC}(?:\\[[0-9;]*[ABCDHF~]|O[ABCDHF])`).test(text);
}

function isSingleNavigationSequence(payload: Buffer): boolean {
    const text = payload.toString("utf8");
    return new RegExp(`^${ESC}(?:\\[[0-9;]*[ABCDHF~]|O[ABCDHF])$`).test(text);
}

function repairOrphanNavigationFragments(payload: Buffer, recentNavigation: boolean): Buffer {
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
        const repaired = Array.from(text).map((final) => `\u001b[${final}`).join("");
        return Buffer.from(repaired, "utf8");
    }

    // Some repeats leak as mixed bracket/final bursts (for example "[DD[D").
    // Rebuild them into discrete CSI navigation sequences when the payload is
    // entirely composed of navigation final bytes and '[' markers.
    if (/^[[]ABCDHF]{2,24}$/.test(text) && text.includes("[")) {
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

function splitIncompleteAnsiTail(payload: Buffer): { complete: Buffer; pending: Buffer } {
    const ESC = 0x1b;
    const CSI = 0x5b;
    const SS3 = 0x4f;

    for (let index = 0; index < payload.length; index += 1) {
        if (payload[index] !== ESC) continue;

        const next = payload[index + 1];
        if (next === undefined) {
            return {complete: payload.subarray(0, index), pending: payload.subarray(index)};
        }

        // CSI: ESC [ params/intermediates ... final(0x40-0x7E)
        if (next === CSI) {
            let cursor = index + 2;
            if (cursor >= payload.length) {
                return {complete: payload.subarray(0, index), pending: payload.subarray(index)};
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
                return {complete: payload.subarray(0, index), pending: payload.subarray(index)};
            }

            continue;
        }

        // SS3: ESC O final(0x40-0x7E)
        if (next === SS3) {
            const final = payload[index + 2];
            if (final === undefined) {
                return {complete: payload.subarray(0, index), pending: payload.subarray(index)};
            }
            const isFinal = final >= 0x40 && final <= 0x7e;
            index = isFinal ? index + 2 : index + 1;
            continue;
        }

        // Other ESC-prefixed sequences are treated as 2-byte forms.
        index += 1;
    }

    return {complete: payload, pending: Buffer.alloc(0)};
}

type ParsedBrowserFrame =
    | { kind: "resize"; cols: number; rows: number; source: "json" | "legacy" }
    | { kind: "input"; data: string; source: "json" | "legacy"; cols?: number; rows?: number };

export function parseBrowserFrame(text: string, resizePrefix: string): ParsedBrowserFrame {
    // Structured JSON frames are the primary protocol. We keep legacy parsing
    // for backward compatibility with older browser senders.
    if (text.startsWith("{")) {
        try {
            const parsed = JSON.parse(text) as { type?: unknown; cols?: unknown; rows?: unknown; data?: unknown };
            if (parsed.type === "resize") {
                const cols = Number(parsed.cols);
                const rows = Number(parsed.rows);
                if (Number.isInteger(cols) && Number.isInteger(rows) && cols > 0 && rows > 0) {
                    return { kind: "resize", cols, rows, source: "json" };
                }
            }
            if (parsed.type === "input" && typeof parsed.data === "string") {
                const cols = Number(parsed.cols);
                const rows = Number(parsed.rows);
                const hasSize = Number.isInteger(cols) && Number.isInteger(rows) && cols > 0 && rows > 0;
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
        if (parts.length !== 2) return { kind: "input", data: text, source: "legacy" };
        const [cols, rows] = parts;
        const parsedCols = Number(cols);
        const parsedRows = Number(rows);
        if (Number.isInteger(parsedCols) && Number.isInteger(parsedRows) && parsedCols > 0 && parsedRows > 0) {
            return { kind: "resize", cols: parsedCols, rows: parsedRows, source: "legacy" };
        }
    }

    return { kind: "input", data: text, source: "legacy" };
}

function rawToBuffer(data: RawData): Buffer {
    if (typeof data === "string") return Buffer.from(data);
    if (Buffer.isBuffer(data)) return data;
    if (data instanceof ArrayBuffer) return Buffer.from(data);
    if (Array.isArray(data)) return Buffer.concat(data.map((part) => Buffer.isBuffer(part) ? part : Buffer.from(part)));
    throw new Error(`Unsupported websocket payload type: ${Object.prototype.toString.call(data)}`);
}

function browserMessageToUtf8(data: TerminalBrowserMessage): string {
    if (typeof data === "string") return data;
    if (Buffer.isBuffer(data)) return data.toString("utf8");
    if (data instanceof ArrayBuffer) return Buffer.from(data).toString("utf8");
    if (Array.isArray(data)) {
        return Buffer.concat(data.map((part) => {
            if (Buffer.isBuffer(part)) return part;
            if (part instanceof ArrayBuffer) return Buffer.from(part);
            return Buffer.from(part.buffer, part.byteOffset, part.byteLength);
        })).toString("utf8");
    }
    return Buffer.from(data.buffer, data.byteOffset, data.byteLength).toString("utf8");
}

function browserMessageToBuffer(data: TerminalBrowserMessage): Buffer {
    if (typeof data === "string") return Buffer.from(data, "utf8");
    if (Buffer.isBuffer(data)) return data;
    if (data instanceof ArrayBuffer) return Buffer.from(data);
    if (Array.isArray(data)) {
        return Buffer.concat(data.map((part) => {
            if (Buffer.isBuffer(part)) return part;
            if (part instanceof ArrayBuffer) return Buffer.from(part);
            return Buffer.from(part.buffer, part.byteOffset, part.byteLength);
        }));
    }
    return Buffer.from(data.buffer, data.byteOffset, data.byteLength);
}

/**
 * Terminal renderer using terminal.js for VT100/xterm escape sequence parsing.
 * Maintains the parsed terminal state for rendering to various output formats.
 */
export class TerminalRenderer extends EventEmitter<{
    render: [TerminalRendererState];
    error: [Error];
}> {
    private terminal: InstanceType<typeof TerminalJS>;
    private columns: number = 80;
    private rows: number = 24;

    constructor(columns: number = 80, rows: number = 24) {
        super();
        this.columns = columns;
        this.rows = rows;
        this.terminal = new TerminalJS({columns, rows});
    }

    /**
     * Feed data to the terminal emulator.
     * Parses escape sequences and updates the terminal state.
     * @param data Raw terminal data (may contain escape sequences)
     */
    private static readonly MAX_BUFFER_SIZE = 1024 * 1024; // 1MB

    write(data: Buffer | string): void {
        try {
            const str = typeof data === "string" ? data : data.toString("utf8");
            // Prevent unbounded buffer growth
            if (str.length > TerminalRenderer.MAX_BUFFER_SIZE) {
                throw new Error(`TerminalRenderer: input exceeds max buffer size (${TerminalRenderer.MAX_BUFFER_SIZE} bytes)`);
            }
            this.terminal.write(str);
            this.emit("render", this.getState());
        } catch (error) {
            const err = error instanceof Error ? error : new Error(String(error));
            this.emit("error", err);
        }
    }

    /**
     * Resize the terminal
     * @param columns Number of columns
     * @param rows Number of rows
     */
    resize(columns: number, rows: number): void {
        this.columns = columns;
        this.rows = rows;
        this.terminal.reset();
        this.terminal = new TerminalJS({columns, rows});
        this.emit("render", this.getState());
    }

    /**
     * Get the current rendered terminal state
     */
    getState(): TerminalRendererState {
        return {
            state: this.terminal.getState(),
            dimensions: {columns: this.columns, rows: this.rows},
        };
    }

    /**
     * Clear the terminal
     */
    clear(): void {
        this.terminal.reset();
        this.emit("render", this.getState());
    }
}

/**
 * WebSocket-based terminal session connected to a Proxmox VM/container terminal.
 * 
 * Manages WebSocket connection lifecycle, reconnection, and optionally feeds
 * data through a TerminalRenderer for escape sequence parsing.
 * 
 * Events emitted:
 * - `ready`: Connection established and authenticated
 * - `data`: Raw terminal data received (Buffer)
 * - `close`: Connection closed
 * - `error`: An error occurred (Error)
 * - `state`: State changed (new state, old state)
 * - `reconnect`: Attempting to reconnect (attempt number)
 * - `resize`: Terminal resized (columns, rows) — emit this to resize the VM terminal
 */
export class TerminalSession extends EventEmitter<{
    ready: [];
    data: [Buffer];
    close: [];
    resize: [number, number];
    error: [Error];
    state: [TerminalState, TerminalState];
    reconnect: [number];
}> {
    private socket?: WS;
    private stateValue: TerminalState = TerminalState.START;
    private keepAlive?: NodeJS.Timeout;
    private reconnectTimer?: NodeJS.Timeout;
    private manuallyClosed = false;
    private reconnectAttempts = 0;
    private info?: TerminalConnectionInfo;
    private renderer?: TerminalRenderer;

    constructor(
        private readonly createSocket: SocketFactory,
        private readonly options: Required<Pick<TerminalOpenOptions, "reconnect" | "reconnectIntervalMs" | "reconnectMaxAttempts">> & {
            renderer?: TerminalRenderer;
        }
    ) {
        super();
        this.renderer = options.renderer;
        // Prevent process crashes from unhandled EventEmitter 'error' events.
        // Consumers can still attach their own listeners for observability.
        this.on("error", () => undefined);
        this.bindResizeHandler();
    }

    get state() {
        return this.stateValue;
    }

    get connectionInfo() {
        return this.info;
    }

    async start() {
        await this.connect();
    }

    private bindResizeHandler() {
        this.on("resize", (columns, rows) => {
            if (this.state !== TerminalState.CONNECTED || !this.socket || this.socket.readyState !== WS.OPEN) return;
            if (this.renderer) this.renderer.resize(columns, rows);
            this.socket.send(`1:${columns}:${rows}:`);
        });
    }

    private setState(next: TerminalState) {
        const prev = this.stateValue;
        this.stateValue = next;
        this.emit("state", next, prev);
    }

    private clearTimers() {
        if (this.keepAlive) {
            clearInterval(this.keepAlive);
            this.keepAlive = undefined;
        }
        if (this.reconnectTimer) {
            clearTimeout(this.reconnectTimer);
            this.reconnectTimer = undefined;
        }
    }

    private async connect() {
        try {
            const {socket, info} = await this.createSocket();
            this.socket = socket;
            this.info = info;
            this.bindSocket(socket, info);
        } catch (error) {
            const err = error instanceof Error ? error : new Error(String(error));
            this.emit("error", err);
            this.scheduleReconnect();
        }
    }

    private bindSocket(socket: WS, info: TerminalConnectionInfo) {
        socket.on("open", () => {
            this.setState(TerminalState.CONNECTING);
            socket.send(info.authMessage);

            this.keepAlive = setInterval(() => {
                if (socket.readyState === WS.OPEN) {
                    socket.send("2");
                }
            }, 30_000);
        });

        socket.on("message", (raw) => {
            const data = rawToBuffer(raw);

            if (this.state === TerminalState.CONNECTING) {
                if (data.length >= 2 && data[0] === 79 && data[1] === 75) {
                    this.reconnectAttempts = 0;
                    this.setState(TerminalState.CONNECTED);
                    this.emit("ready");
                    const rest = data.subarray(2);
                    if (rest.length) {
                        if (this.renderer) this.renderer.write(rest);
                        this.emit("data", rest);
                    }
                } else {
                    socket.close();
                }
                return;
            }

            if (this.state === TerminalState.CONNECTED) {
                if (this.renderer) this.renderer.write(data);
                this.emit("data", data);
            }
        });

        socket.on("close", () => {
            this.clearTimers();
            this.emit("close");

            if (this.manuallyClosed) {
                this.setState(TerminalState.DISCONNECTED);
                return;
            }
            this.scheduleReconnect();
        });

        socket.on("error", (error) => {
            const err = error instanceof Error ? error : new Error(String(error));
            this.emit("error", err);
        });
    }

    private scheduleReconnect() {
        if (!this.options.reconnect) {
            this.setState(TerminalState.DISCONNECTED);
            return;
        }

        if (this.reconnectAttempts >= this.options.reconnectMaxAttempts) {
            this.setState(TerminalState.DISCONNECTED);
            return;
        }

        this.reconnectAttempts += 1;
        this.setState(TerminalState.RECONNECTING);
        this.emit("reconnect", this.reconnectAttempts);

        this.reconnectTimer = setTimeout(() => {
            void this.connect();
        }, this.options.reconnectIntervalMs);
    }

    /**
     * Send data to the terminal (keyboard input).
     * Uses Proxmox terminal protocol: `0:byteLength:data`
     * @param data Text to send
     * @returns true if sent, false if not connected
     */
    write(data: string): boolean {
        return this.writeRaw(Buffer.from(data, "utf8"));
    }

    /**
     * Send raw stdin bytes to the terminal preserving control sequences.
     * Uses Proxmox terminal protocol framing: `0:byteLength:` + raw payload bytes.
     */
    writeRaw(payload: Buffer): boolean {
        if (this.state !== TerminalState.CONNECTED || !this.socket || this.socket.readyState !== WS.OPEN) {
            return false;
        }
        const header = Buffer.from(`0:${payload.byteLength}:`, "ascii");
        this.socket.send(Buffer.concat([header, payload]));
        return true;
    }

    /**
     * Close the terminal session and WebSocket connection.
     * Emits 'close' event when fully disconnected.
     * @param code Optional WebSocket close code
     * @param reason Optional close reason
     */
    close(code?: number, reason?: string | Buffer) {
        this.manuallyClosed = true;
        this.setState(TerminalState.DISCONNECTING);
        this.clearTimers();
        if (this.socket && (this.socket.readyState === WS.OPEN || this.socket.readyState === WS.CONNECTING)) {
            this.socket.close(code, typeof reason === "string" ? reason : reason?.toString("utf8"));
        } else {
            this.setState(TerminalState.DISCONNECTED);
        }
    }

    /**
     * Bidirectionally pipe terminal data to another stream (e.g., local TTY).
     * Forwards received data to target.send() and sends target messages back to terminal.
     * Closes both when either side closes.
     * @param target Target implementing TerminalPipe interface
     * @returns The target (for chaining)
     */
    pipe<T extends TerminalPipe>(target: T): T {
        this.on("data", (data) => target.send(data));
        target.on("message", (data) => {
            const text = Buffer.isBuffer(data) ? data.toString("utf8") : data;
            this.write(text);
        });
        target.once("close", () => this.close());
        this.once("close", () => target.close());
        return target;
    }
}

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
    const coalesceNavigationRepeats = options.coalesceNavigationRepeats ?? false;
    const navigationRepeatCoalesceMs = options.navigationRepeatCoalesceMs ?? 8;
    const allowTextInputFrames = options.allowTextInputFrames ?? true;
    const enableInputRepairCompatibility = options.enableInputRepairCompatibility ?? false;
    const normalizeSs3CursorKeysEnabled = options.normalizeSs3CursorKeys ?? false;
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

    /*
     * Browser stdin processing order:
     * 1) Reassemble split ANSI tails across websocket frames.
     * 2) Normalize SS3 cursor keys (optional).
     * 3) Simplify modified cursor keys (optional).
     * 4) Forward to proxmox termproxy via writeRaw.
     */

    const hexPreview = (payload: Buffer) => payload.subarray(0, 8).toString("hex");

    let sessionReady = false;
    let browserClosed = false;
    let appliedResize: { cols: number; rows: number } | undefined;
    const pendingInputs: Array<{ message: TerminalBrowserMessage; fromPreReadyQueue: boolean; isBinary: boolean }> =
        [
            ...(options.initialInputs ?? []).map((text) => ({message: text as TerminalBrowserMessage, fromPreReadyQueue: true, isBinary: false})),
            ...(options.initialBinaryInputs ?? []).map((buffer) => ({message: buffer as TerminalBrowserMessage, fromPreReadyQueue: true, isBinary: true})),
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
    let repeatMeta: { binary: boolean; normalized: boolean; simplified: boolean; repaired: boolean } | undefined;
    let repeatTimer: ReturnType<typeof setTimeout> | undefined;

    const writePayload = (
        payload: Buffer,
        meta: { binary: boolean; normalized: boolean; simplified: boolean; repaired: boolean }
    ) => {
        if (hasNavigationSequence(payload)) {
            lastNavigationInputAt = Date.now();
        }
        trace(
            "stdin-write",
            `bytes=${payload.byteLength} binary=${meta.binary} repaired=${meta.repaired} normalized=${meta.normalized} simplified=${meta.simplified} compat=${enableInputRepairCompatibility} head=${hexPreview(payload)}`
        );
        session.writeRaw(payload);
    };

    const flushRepeatBuffer = () => {
        if (!repeatPayload || repeatCount <= 0 || !repeatMeta) return;
        const basePayload = repeatPayload;
        const payload = repeatCount === 1
            ? basePayload
            : Buffer.concat(Array.from({length: repeatCount}, () => basePayload));
        trace("stdin-coalesce-flush", `count=${repeatCount} bytes=${payload.byteLength} head=${hexPreview(payload)}`);
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
            repeatPayload
            && repeatMeta
            && repeatPayload.equals(payload)
            && repeatMeta.binary === meta.binary
            && repeatMeta.normalized === meta.normalized
            && repeatMeta.simplified === meta.simplified
            && repeatMeta.repaired === meta.repaired
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
        const alreadyApplied = appliedResize?.cols === cols && appliedResize?.rows === rows;
        if (alreadyApplied && !force) {
            trace("skip-resize", `cols=${cols} rows=${rows}`);
            return;
        }

        appliedResize = {cols, rows};
        trace(eventName, `cols=${cols} rows=${rows}`);
        session.emit("resize", cols, rows);
    };

    const forwardBrowserInput = (message: TerminalBrowserMessage, isBinary: boolean, fromPreReadyQueue = false) => {
        if (!sessionReady) {
            const len = isBinary ? browserMessageToBuffer(message).byteLength : browserMessageToUtf8(message).length;
            trace("browser-queue", `len=${len} binary=${isBinary}`);
            pendingInputs.push({message, isBinary, fromPreReadyQueue: true});
            return;
        }

        if (isBinary) {
            const payloadSource = browserMessageToBuffer(message);
            // Reassemble any split ANSI tail before normalization and forwarding.
            const merged = pendingAnsiTail.byteLength > 0
                ? Buffer.concat([pendingAnsiTail, payloadSource])
                : payloadSource;
            const split = splitIncompleteAnsiTail(merged);
            pendingAnsiTail = split.pending;
            if (split.complete.byteLength === 0) {
                trace("stdin-buffer", `bytes=${pendingAnsiTail.byteLength} head=${hexPreview(pendingAnsiTail)}`);
                return;
            }

            const ss3Normalized = normalizeSs3CursorKeysEnabled
                ? normalizeSs3CursorKeys(split.complete, normalizeSs3CursorKeysMode)
                : split.complete;
            const simplifiedPayload = simplifyModifiedCursorKeysEnabled
                ? simplifyModifiedCursorKeys(ss3Normalized)
                : ss3Normalized;
            const repairedPayload = enableInputRepairCompatibility
                ? repairOrphanNavigationFragments(simplifiedPayload, Date.now() - lastNavigationInputAt <= navigationRepairWindowMs)
                : simplifiedPayload;
            const payload = repairedPayload;
            const repaired = payload.compare(simplifiedPayload) !== 0;
            sawUserStdin = true;
            enqueueOrWritePayload(payload, {
                binary: true,
                repaired,
                normalized: payload.compare(payloadSource) !== 0,
                simplified: simplifiedPayload.compare(ss3Normalized) !== 0
            });
            return;
        }

        const text = browserMessageToUtf8(message);

        const parsedFrame = parseBrowserFrame(text, resizePrefix);
        trace("browser-frame", `kind=${parsedFrame.kind} source=${parsedFrame.source} preReady=${fromPreReadyQueue}`);

        if (parsedFrame.kind === "resize") {
            flushRepeatBuffer();
            applyResize(parsedFrame.cols, parsedFrame.rows, "emit-resize");
            return;
        }

        if (!allowTextInputFrames) {
            trace("drop-text-input", `source=${parsedFrame.source} bytes=${Buffer.byteLength(parsedFrame.data, "utf8")}`);
            return;
        }

        const inputCols = parsedFrame.cols;
        const inputRows = parsedFrame.rows;
        const hasInputSize =
            inputCols !== undefined
            && inputRows !== undefined
            && Number.isInteger(inputCols)
            && Number.isInteger(inputRows)
            && inputCols > 0
            && inputRows > 0;
        if (hasInputSize) {
            applyResize(inputCols, inputRows, "input-resize");
        }

        const isQueuedPromptTrigger = fromPreReadyQueue && parsedFrame.data === promptNudgeInput;
        if (!isQueuedPromptTrigger) {
            sawUserStdin = true;
        }
        const textPayload = Buffer.from(parsedFrame.data, "utf8");
        // Apply the same coalescing path for legacy text stdin frames.
        const mergedTextPayload = pendingAnsiTail.byteLength > 0
            ? Buffer.concat([pendingAnsiTail, textPayload])
            : textPayload;
        const splitTextPayload = splitIncompleteAnsiTail(mergedTextPayload);
        pendingAnsiTail = splitTextPayload.pending;
        if (splitTextPayload.complete.byteLength === 0) {
            trace("stdin-buffer", `bytes=${pendingAnsiTail.byteLength} head=${hexPreview(pendingAnsiTail)}`);
            return;
        }

        const ss3NormalizedTextPayload = normalizeSs3CursorKeysEnabled
            ? normalizeSs3CursorKeys(splitTextPayload.complete, normalizeSs3CursorKeysMode)
            : splitTextPayload.complete;
        const simplifiedTextPayload = simplifyModifiedCursorKeysEnabled
            ? simplifyModifiedCursorKeys(ss3NormalizedTextPayload)
            : ss3NormalizedTextPayload;
        const repairedTextPayload = enableInputRepairCompatibility
            ? repairOrphanNavigationFragments(simplifiedTextPayload, Date.now() - lastNavigationInputAt <= navigationRepairWindowMs)
            : simplifiedTextPayload;
        const normalizedTextPayload = repairedTextPayload;
        const repaired = normalizedTextPayload.compare(simplifiedTextPayload) !== 0;
        enqueueOrWritePayload(normalizedTextPayload, {
            binary: false,
            repaired,
            normalized: normalizedTextPayload.compare(splitTextPayload.complete) !== 0,
            simplified: simplifiedTextPayload.compare(ss3NormalizedTextPayload) !== 0
        });
    };

    browserSocket.on("message", (raw, isBinary) => {
        const binary = isBinary === true;
        if (binary) {
            const payload = browserMessageToBuffer(raw);
            trace("browser-message", `len=${payload.byteLength} binary=true head=${hexPreview(payload)}`);
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
            applyResize(appliedResize.cols, appliedResize.rows, "reapply-resize-on-ready", true);
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
                trace("prompt-nudge", `bytes=${Buffer.byteLength(promptNudgeInput, "utf8")}`);
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
        initialInputs: [...preOpenTextInputs, ...(bridgeOptions.initialInputs ?? [])],
        initialBinaryInputs: [...preOpenBinaryInputs, ...(bridgeOptions.initialBinaryInputs ?? [])],
    });

    return session;
}

/**
 * Helper for opening Proxmox VM/container terminals.
 * 
 * Handles ticket creation, WebSocket setup, and provides TerminalSession
 * for managing the connection.
 * 
 * Usage:
 * ```ts
 * const terminal = new Terminal(vmid, client);
 * const renderer = new TerminalRenderer(80, 24);
 * const session = await terminal.open({ renderer });
 * 
 * renderer.on("render", (state) => {
 *   // Update UI with state.state.screen and state.dimensions
 * });
 * 
 * session.on("data", (buf) => {
 *   // Raw data also available here if needed
 * });
 * ```
 */
export class Terminal {
    private cachedTicket?: TerminalTicket;

    /**
     * Create a terminal helper for a specific VM or container.
     * @param vmid VM/container ID
     * @param client Authenticated Proxmox client
     */
    constructor(
        private readonly vmid: string | number,
        private readonly client: Client
    ) {
    }

    /**
     * Get the cached terminal ticket, if available.
     * Tickets are cached after createTicket() and remain valid for the session.
     */
    get ticket() {
        return this.cachedTicket;
    }

    /**
     * Request a terminal ticket from Proxmox.
     * Tickets are valid for the current session and are cached for reuse.
     * The VM must be running.
     */
    async createTicket(): Promise<TerminalTicket> {
        const vm = await this.getRunningVm();
        const ticket = await this.client.request(
            `/nodes/{node}/${vm.type}/{vmid}/termproxy`,
            "POST",
            {
                $path: {
                    node: vm.node,
                    vmid: typeof vm.vmid === "string" ? parseInt(vm.vmid, 10) : vm.vmid,
                },
            }
        );
        this.cachedTicket = ticket as TerminalTicket;
        return this.cachedTicket;
    }

    /**
     * Build WebSocket connection info (URL, headers, auth message).
     * Used internally by open() but also available for custom connection setups.
     */
    async getConnectionInfo(): Promise<TerminalConnectionInfo> {
        const vm = await this.getRunningVm();
        const ticket = this.cachedTicket ?? (await this.createTicket());
        const websocketPath = `/nodes/${encodeURIComponent(vm.node)}/${vm.type}/${encodeURIComponent(vm.vmid.toString())}/vncwebsocket`;
        const httpUrl = this.client.url(websocketPath, {
            port: ticket.port,
            vncticket: ticket.ticket,
        });
        const wsUrl = new URL(httpUrl);
        wsUrl.protocol = wsUrl.protocol === "https:" ? "wss:" : "ws:";

        return {
            vmid: vm.vmid,
            node: vm.node,
            type: vm.type,
            ticket,
            websocketUrl: wsUrl.toString(),
            authMessage: `${ticket.user}:${ticket.ticket}\n`,
        };
    }

    /**
     * Open an interactive terminal session to the VM/container.
     * 
     * The VM must be running. Authentication (login cookie or API token) is required.
     * 
     * @param options Configuration options
     * @param options.renderer Optional TerminalRenderer for escape sequence parsing (VT100/xterm)
     * @param options.pipeTo Optional TerminalPipe for bidirectional data relay (e.g., to local TTY)
     * @param options.reconnect Auto-reconnect on disconnect (default: true)
     * @param options.reconnectIntervalMs Delay between reconnect attempts (default: 1500ms)
     * @param options.reconnectMaxAttempts Max reconnect attempts (default: unlimited)
     * @param options.rejectUnauthorized HTTPS certificate validation (default: false)
     * @returns Active TerminalSession
     */
    async open(options: TerminalOpenOptions = {}): Promise<TerminalSession> {
        // Fail fast on programmer/configuration errors before spinning up reconnect state.
        if (!this.client.sessionCookie() && !this.client.tokenAuthorizationHeader()) {
            throw new Error("Missing authentication for terminal websocket. Provide login cookie or API token.");
        }

        const session = new TerminalSession(
            async () => {
                const info = await this.getConnectionInfo();
                // Websocket auth differs by client auth mode: login() => cookie, API token => Authorization header.
                const cookie = this.client.sessionCookie();
                const authHeader = this.client.tokenAuthorizationHeader();
                if (!cookie && !authHeader) {
                    throw new Error("Missing authentication for terminal websocket. Provide login cookie or API token.");
                }

                const wsUrl = new URL(info.websocketUrl);
                const originProtocol = wsUrl.protocol === "wss:" ? "https:" : "http:";
                const origin = `${originProtocol}//${wsUrl.host}`;

                const headers: Record<string, string> = {
                    // Proxmox checks Origin for websocket terminal connections.
                    Origin: origin,
                };
                if (cookie) headers.Cookie = cookie;
                if (authHeader) headers.Authorization = authHeader;

                const socket = new WS(info.websocketUrl, {
                    headers,
                    rejectUnauthorized: options.rejectUnauthorized ?? false,
                });

                return {info, socket};
            },
            {
                reconnect: options.reconnect ?? true,
                reconnectIntervalMs: Math.max(250, options.reconnectIntervalMs ?? 1500),
                reconnectMaxAttempts: options.reconnectMaxAttempts ?? Number.POSITIVE_INFINITY,
                renderer: options.renderer,
            }
        );

        if (options.pipeTo) {
            session.pipe(options.pipeTo);
        }

        await session.start();
        return session;
    }

    private async getRunningVm(): Promise<{ vmid: number; node: string; type: VMType }> {
        const resources = await this.client.request("/cluster/resources", "GET", {
            $query: {type: "vm"},
        }) as ClusterResource[];

        const vm = (resources as ClusterResource[]).find(
            (resource) => resource.vmid?.toString() === this.vmid.toString()
        );

        if (!vm) {
            throw new Error(`Unable to find virtual machine with id(${this.vmid}).`);
        }
        if (vm.status !== "running") {
            throw new Error(`Virtual machine ${this.vmid} is not running.`);
        }
        if (!vm.node || !vm.vmid) {
            throw new Error(`Virtual machine ${this.vmid} does not include node/vmid data.`);
        }
        if (vm.type !== "qemu" && vm.type !== "lxc") {
            throw new Error(`Unsupported VM type '${vm.type}' for terminal helper.`);
        }

        return {
            vmid: vm.vmid,
            node: vm.node,
            type: vm.type,
        };
    }
}
