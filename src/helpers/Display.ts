import EventEmitter from "node:events";
import type {ClusterAPI} from "../api/cluster";
import type {Client} from "../index";
import WS, {type RawData} from "ws";

type VMType = "qemu" | "lxc";

export type DisplayTicket = {
    cert: string;
    port: number;
    ticket: string;
    upid: string;
    user: string;
    password?: string;
};

export type DisplayConnectionInfo = {
    vmid: number;
    node: string;
    type: VMType;
    ticket: DisplayTicket;
    websocketUrl: string;
};

export type DisplayPipe = {
    send(data: string | ArrayBufferLike | Blob | ArrayBufferView): void;
    close(code?: number, data?: string | Buffer): void;
    on(event: "message", listener: (data: Buffer | string) => void): unknown;
    once(event: "close", listener: () => void): unknown;
} & EventEmitter;

export type DisplayOpenOptions = {
    rejectUnauthorized?: boolean;
    pipeTo?: DisplayPipe;
};

function rawToBuffer(data: RawData): Buffer {
    if (typeof data === "string") return Buffer.from(data);
    if (Buffer.isBuffer(data)) return data;
    if (data instanceof ArrayBuffer) return Buffer.from(data);
    if (Array.isArray(data)) return Buffer.concat(data.map((part) => Buffer.isBuffer(part) ? part : Buffer.from(part)));
    throw new Error(`Unsupported websocket payload type: ${Object.prototype.toString.call(data)}`);
}

export class DisplaySession extends EventEmitter<{
    ready: [];
    data: [Buffer];
    close: [];
    error: [Error];
}> {
    constructor(private readonly socket: WS) {
        super();
        this.bind();
    }

    private bind() {
        this.socket.on("open", () => {
            this.emit("ready");
        });

        this.socket.on("message", (raw) => {
            this.emit("data", rawToBuffer(raw));
        });

        this.socket.on("close", () => {
            this.emit("close");
        });

        this.socket.on("error", (error) => {
            const err = error instanceof Error ? error : new Error(String(error));
            this.emit("error", err);
        });
    }

    write(data: string | Buffer | Uint8Array) {
        if (this.socket.readyState !== WS.OPEN) return false;
        this.socket.send(data);
        return true;
    }

    close(code?: number, reason?: string | Buffer) {
        if (this.socket.readyState === WS.OPEN || this.socket.readyState === WS.CONNECTING) {
            this.socket.close(code, typeof reason === "string" ? reason : reason?.toString("utf8"));
        }
    }

    pipe<T extends DisplayPipe>(target: T): T {
        this.on("data", (data) => target.send(data));
        target.on("message", (data) => {
            const payload = Buffer.isBuffer(data) ? data : Buffer.from(data);
            this.write(payload);
        });
        target.once("close", () => this.close());
        this.once("close", () => target.close());
        return target;
    }
}

export class Display {
    private cachedTicket?: DisplayTicket;

    constructor(
        private readonly vmid: string | number,
        private readonly client: Client
    ) {
    }

    get ticket() {
        return this.cachedTicket;
    }

    async createTicket(): Promise<DisplayTicket> {
        const vm = await this.getRunningVm();
        const ticket = await this.client.request(
            `/nodes/{node}/${vm.type}/{vmid}/vncproxy`,
            "POST",
            {
                $path: {
                    node: vm.node,
                    vmid: vm.vmid,
                },
                $body: {
                    websocket: true,
                },
            } as any
        );
        this.cachedTicket = ticket as DisplayTicket;
        return this.cachedTicket;
    }

    async getConnectionInfo(): Promise<DisplayConnectionInfo> {
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
        };
    }

    async open(options: DisplayOpenOptions = {}): Promise<DisplaySession> {
        const info = await this.getConnectionInfo();
        const wsUrl = new URL(info.websocketUrl);
        const originProtocol = wsUrl.protocol === "wss:" ? "https:" : "http:";
        const origin = `${originProtocol}//${wsUrl.host}`;

        const headers: Record<string, string> = {
            Origin: origin,
        };

        const cookie = this.client.sessionCookie();
        if (cookie) headers.Cookie = cookie;

        const token = this.client.tokenAuthorizationHeader();
        if (token) headers.Authorization = token;

        if (!headers.Cookie && !headers.Authorization) {
            throw new Error("Missing websocket authentication headers (cookie or API token).");
        }

        const socket = new WS(info.websocketUrl, {
            headers,
            rejectUnauthorized: options.rejectUnauthorized ?? false,
        });

        const session = new DisplaySession(socket);
        if (options.pipeTo) {
            session.pipe(options.pipeTo);
        }
        return session;
    }

    private async getRunningVm(): Promise<{ vmid: number; node: string; type: VMType }> {
        const resources = await this.client.request("/cluster/resources", "GET", {
            $query: {type: "vm"},
        });

        const vm = resources.find((resource) => resource.vmid?.toString() === this.vmid.toString());

        if (!vm) throw new Error(`Unable to find virtual machine with id(${this.vmid}).`);
        if (vm.status !== "running") throw new Error(`Virtual machine ${this.vmid} is not running.`);
        if (!vm.node || !vm.vmid) throw new Error(`Virtual machine ${this.vmid} does not include node/vmid data.`);
        if (vm.type !== "qemu" && vm.type !== "lxc") throw new Error(`Unsupported VM type '${vm.type}' for display helper.`);

        return {
            vmid: vm.vmid,
            node: vm.node,
            type: vm.type,
        };
    }
}
