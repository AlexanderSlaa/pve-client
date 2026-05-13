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
    on(event: "message", listener: (data: TerminalBrowserMessage) => void): unknown;
    on(event: "close", listener: () => void): unknown;
};

export type TerminalBridgeOptions = {
    /** Browser resize frame prefix, defaults to `R:` */
    resizePrefix?: string;
    /** Delay before sending a one-time prompt nudge, defaults to 400ms */
    promptNudgeMs?: number;
    /** One-time prompt nudge payload, defaults to carriage return */
    promptNudgeInput?: string;
    /** Frame formatter for terminal-session errors sent back to browser socket */
    onErrorFrame?: (error: Error) => Buffer | string | undefined;
    /** Browser socket close code when terminal session closes, defaults to 1001 */
    closeCodeOnSessionClose?: number;
    /** Browser socket close reason when terminal session closes */
    closeReasonOnSessionClose?: string;
};

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
    write(data: Buffer | string): void {
        try {
            const str = typeof data === "string" ? data : data.toString("utf8");
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
        if (this.state !== TerminalState.CONNECTED || !this.socket || this.socket.readyState !== WS.OPEN) {
            return false;
        }
        this.socket.send(`0:${Buffer.byteLength(data, "utf8")}:${data}`);
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
 * - Handles browser resize control frames (default prefix `R:`)
 * - Forwards session data/close/error to browser socket
 * - Sends optional one-time prompt nudge after readiness when idle
 */
export function bridgeTerminalSessionToSocket(
    session: TerminalSession,
    browserSocket: TerminalBrowserSocket,
    options: TerminalBridgeOptions = {}
): void {
    const resizePrefix = options.resizePrefix ?? "R:";
    const promptNudgeMs = options.promptNudgeMs ?? 400;
    const promptNudgeInput = options.promptNudgeInput ?? "\r";
    const closeCodeOnSessionClose = options.closeCodeOnSessionClose ?? 1001;

    let sessionReady = false;
    let browserClosed = false;
    const pendingInputs: string[] = [];
    let sawTerminalOutput = false;
    let sawUserStdin = false;
    let promptNudgeTimer: ReturnType<typeof setTimeout> | undefined;

    const forwardBrowserInput = (text: string) => {
        if (!sessionReady) {
            pendingInputs.push(text);
            return;
        }

        if (text.startsWith(resizePrefix)) {
            const [cols, rows] = text.slice(resizePrefix.length).split(":");
            const parsedCols = Number(cols);
            const parsedRows = Number(rows);
            if (Number.isInteger(parsedCols) && Number.isInteger(parsedRows) && parsedCols > 0 && parsedRows > 0) {
                session.emit("resize", parsedCols, parsedRows);
            }
            return;
        }

        sawUserStdin = true;
        session.write(text);
    };

    browserSocket.on("message", (raw) => {
        const text = browserMessageToUtf8(raw);
        forwardBrowserInput(text);
    });

    browserSocket.on("close", () => {
        browserClosed = true;
        if (promptNudgeTimer) {
            clearTimeout(promptNudgeTimer);
            promptNudgeTimer = undefined;
        }
        session.close();
    });

    session.on("data", (data) => {
        sawTerminalOutput = true;
        if (promptNudgeTimer) {
            clearTimeout(promptNudgeTimer);
            promptNudgeTimer = undefined;
        }

        if (browserSocket.readyState === browserSocket.OPEN) {
            browserSocket.send(data);
        }
    });

    session.on("close", () => {
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

    session.once("ready", () => {
        sessionReady = true;

        for (const input of pendingInputs) {
            forwardBrowserInput(input);
        }
        pendingInputs.length = 0;

        promptNudgeTimer = setTimeout(() => {
            if (browserClosed || !sessionReady || sawTerminalOutput || sawUserStdin) return;
            session.write(promptNudgeInput);
        }, promptNudgeMs);
    });
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
