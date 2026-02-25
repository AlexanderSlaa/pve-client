import EventEmitter from "node:events";
import type {ClusterAPI} from "../api/cluster";
import type {Client} from "../index";
import WS, {type RawData} from "ws";

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

export type TerminalOpenOptions = {
    rejectUnauthorized?: boolean;
    pipeTo?: TerminalPipe;
    reconnect?: boolean;
    reconnectIntervalMs?: number;
    reconnectMaxAttempts?: number;
};

function rawToBuffer(data: RawData): Buffer {
    if (typeof data === "string") return Buffer.from(data);
    if (Buffer.isBuffer(data)) return data;
    if (data instanceof ArrayBuffer) return Buffer.from(data);
    if (Array.isArray(data)) return Buffer.concat(data.map((part) => Buffer.isBuffer(part) ? part : Buffer.from(part)));
    throw new Error(`Unsupported websocket payload type: ${Object.prototype.toString.call(data)}`);
}

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

    constructor(
        private readonly createSocket: SocketFactory,
        private readonly options: Required<Pick<TerminalOpenOptions, "reconnect" | "reconnectIntervalMs" | "reconnectMaxAttempts">>
    ) {
        super();
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
                    if (rest.length) this.emit("data", rest);
                } else {
                    socket.close();
                }
                return;
            }

            if (this.state === TerminalState.CONNECTED) {
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

    write(data: string): boolean {
        if (this.state !== TerminalState.CONNECTED || !this.socket || this.socket.readyState !== WS.OPEN) {
            return false;
        }
        this.socket.send(`0:${Buffer.byteLength(data, "utf8")}:${data}`);
        return true;
    }

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

export class Terminal {
    private cachedTicket?: TerminalTicket;

    constructor(
        private readonly vmid: string | number,
        private readonly client: Client
    ) {
    }

    get ticket() {
        return this.cachedTicket;
    }

    async createTicket(): Promise<TerminalTicket> {
        const vm = await this.getRunningVm();
        const ticket = await this.client.request(
            `/nodes/{node}/${vm.type}/{vmid}/termproxy`,
            "POST",
            {
                $path: {
                    node: vm.node,
                    vmid: vm.vmid,
                },
            } as any
        );
        this.cachedTicket = ticket as TerminalTicket;
        return this.cachedTicket;
    }

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

    async open(options: TerminalOpenOptions = {}): Promise<TerminalSession> {
        const session = new TerminalSession(
            async () => {
                const info = await this.getConnectionInfo();
                const cookie = this.client.sessionCookie();
                if (!cookie) {
                    throw new Error("Missing authenticated session cookie. Did you call login()?");
                }

                const wsUrl = new URL(info.websocketUrl);
                const originProtocol = wsUrl.protocol === "wss:" ? "https:" : "http:";
                const origin = `${originProtocol}//${wsUrl.host}`;

                const socket = new WS(info.websocketUrl, {
                    headers: {
                        Cookie: cookie,
                        Origin: origin,
                    },
                    rejectUnauthorized: options.rejectUnauthorized ?? false,
                });

                return {info, socket};
            },
            {
                reconnect: options.reconnect ?? true,
                reconnectIntervalMs: Math.max(250, options.reconnectIntervalMs ?? 1500),
                reconnectMaxAttempts: options.reconnectMaxAttempts ?? Number.POSITIVE_INFINITY,
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
        } as any);

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
