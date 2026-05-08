/* Auto-generated Proxmox VE TypeScript client.
 * - Includes ALL endpoints found in the provided spec.json
 * - Generates TSDoc for every endpoint function (description + @endpoint + parameter list)
 */
import {Agent} from "node:https";
import native_fetch from "./fetch.js";
import Access from "./api/access.js";
import type {ClusterAPI} from "./api/cluster/types.js";
import Cluster from "./api/cluster/index.js";
import type {NodesAPI} from "./api/nodes/types.js";
import Nodes from "./api/nodes/index.js";
import Pools from "./api/pools.js";
import Storage from "./api/storage.js";
import type {AnyArgs, API, MethodKey, Params, Ret} from "./api/index.js";
import Version from "./api/version.js";
import {Display} from "./helpers/Display.js";
import {Terminal, TerminalRenderer, TerminalSession, TerminalState} from "./helpers/Terminal.js";
import type {TerminalTicket, TerminalConnectionInfo, TerminalOpenOptions, TerminalRendererState, TerminalPipe} from "./helpers/Terminal.js";
import {TimerPulledEventEmitter} from "./helpers/TimerPulledEventEmitter.js";


export type FetchLike<Input extends string | URL | Request = string | URL, Init extends RequestInit = RequestInit, Out extends Response = Response> = (input: Input, init?: Init) => Promise<Out>;

export type ClientOptions = (
    {
        /** API token string, either full "PVEAPIToken=user@realm!token=secret" or shorthand "user@realm!token=secret" */
        apiToken: string;
    } |
    {
        username: string;
        password: string;
        /** Defaults to "pam" */
        realm?: string;
    }
    ) & {
    /** Base URL like https://pve.example.com:8006 */
    baseUrl: string;
    /** Defaults to "/api2/json" */
    apiPath?: string;
    fetch?: FetchLike;
    agent?: Agent
}

type AuthState = { ticket?: string; csrf?: string };
type ClusterResource = ClusterAPI["/cluster/resources"]["GET"]["return"][number];
type ClusterTask = ClusterAPI["/cluster/tasks"]["GET"]["return"][number];
type TaskStatusReturn = NodesAPI["/nodes/{node}/tasks/{upid}/status"]["GET"]["return"];
type TaskLogLine = NodesAPI["/nodes/{node}/tasks/{upid}/log"]["GET"]["return"][number];
type LoginResponse = { ticket: string; CSRFPreventionToken: string };

export type TaskState = "running" | "stopped" | "failed";
export type TaskUpdate = {
    logs: string[];
    status: TaskState;
    $status: TaskStatusReturn;
};
export type TaskUpdateHandler = (input: TaskUpdate) => void | Promise<void>;
export type TaskSubscription = {
    stop: () => void;
    readonly stopped: boolean;
};

export type APIClient = {
    access: ReturnType<typeof Access>;
    cluster: ReturnType<typeof Cluster>;
    nodes: ReturnType<typeof Nodes>;
    pools: ReturnType<typeof Pools>;
    storage: ReturnType<typeof Storage>;
    version: ReturnType<typeof Version>;
};

/** The node-scoped sub-API returned by `client.api.nodes.get(node)`. */
export type NodeScopedAPI = ReturnType<ReturnType<typeof Nodes>['get']>;

/** The per-VM sub-API returned by `client.api.nodes.get(node).qemu.vmid(id)`. */
export type QemuScopedAPI = ReturnType<NodeScopedAPI['qemu']['vmid']>;

/** The per-container sub-API returned by `client.api.nodes.get(node).lxc.id(vmid)`. */
export type LxcScopedAPI = ReturnType<NodeScopedAPI['lxc']['id']>;

/** The node-storage sub-API returned by `client.api.nodes.get(node).storage`. */
export type NodeStorageScopedAPI = NodeScopedAPI['storage'];

/** The storage-item sub-API returned by `client.api.nodes.get(node).storage.get(name)`. */
export type StorageItemAPI = ReturnType<NodeStorageScopedAPI['get']>;

/** The cluster sub-API returned by `client.api.cluster`. */
export type ClusterScopedAPI = ReturnType<typeof Cluster>;

/** The access sub-API returned by `client.api.access`. */
export type AccessScopedAPI = ReturnType<typeof Access>;


export class Client {
    private readonly baseUrl: string;
    private readonly apiPath: string;
    private readonly fetchImpl: FetchLike;
    private readonly opts: ClientOptions;
    private auth: AuthState = {};
    private readonly eventMonitors = new Map<string, unknown>();

    /**
     * Structured API surface generated from the spec.
     * Example:
     * ```ts
     * client.api.cluster.replication.read({})
     * client.api.cluster.replication.id("100-1").read({})
     * ```
     */
    public readonly api: APIClient;

    public readonly task = {
        listen: (
            upid: string,
            handler: TaskUpdateHandler = async () => undefined,
            checkInterval = 2000
        ): TaskSubscription => {
            const node = this.getNodeFromUPID(upid);
            const logLines: string[] = [];
            let stopped = false;
            let inFlight = false;
            let knownLogCount = 0;
            let previousStatus: TaskState | undefined;

            const stop = () => {
                stopped = true;
                clearInterval(interval);
            };

            const run = async () => {
                if (stopped || inFlight) return;
                inFlight = true;
                try {
                    const [status, logs] = await Promise.all([
                        this.request("/nodes/{node}/tasks/{upid}/status", "GET", {
                            $path: {node, upid},
                        }) as Promise<TaskStatusReturn>,
                        this.request("/nodes/{node}/tasks/{upid}/log", "GET", {
                            $path: {node, upid},
                        }) as Promise<TaskLogLine[]>,
                    ]);

                    let logsChanged = false;
                    for (const log of logs) {
                        const index = Number(log.n);
                        if (Number.isFinite(index) && index >= 0) {
                            if (logLines[index] !== log.t) {
                                logLines[index] = log.t;
                                logsChanged = true;
                            }
                        } else {
                            logLines.push(log.t);
                            logsChanged = true;
                        }
                    }

                    if (logs.length !== knownLogCount) {
                        knownLogCount = logs.length;
                        logsChanged = true;
                    }

                    const statusState: TaskState =
                        status.status === "stopped" && status.exitstatus !== "OK"
                            ? "failed"
                            : status.status;
                    const statusChanged = previousStatus !== statusState;

                    if (logsChanged || statusChanged) {
                        await handler({
                            logs: logLines.filter((line): line is string => typeof line === "string"),
                            status: statusState,
                            $status: status,
                        });
                    }

                    previousStatus = statusState;
                    if (statusState !== "running") {
                        stop();
                    }
                } finally {
                    inFlight = false;
                }
            };

            const interval = setInterval(() => {
                void run();
            }, Math.max(250, checkInterval));
            void run();

            return {
                stop,
                get stopped() {
                    return stopped;
                },
            };
        },

        wait: (
            upid: string,
            handler: TaskUpdateHandler = async () => undefined,
            checkInterval = 2000
        ): Promise<string[]> =>
            new Promise<string[]>((resolve, reject) => {
                const subscription = this.task.listen(
                    upid,
                    async (input) => {
                        try {
                            await handler(input);
                        } catch (error) {
                            subscription.stop();
                            reject(error);
                            return;
                        }

                        if (input.status === "failed") {
                            subscription.stop();
                            reject(input);
                            return;
                        }
                        if (input.status === "stopped") {
                            subscription.stop();
                            resolve(input.logs);
                        }
                    },
                    checkInterval
                );
            }),
    };

    public readonly helpers = {
        terminal: (vmid: string | number): Terminal => {
            // Terminal now supports both login-cookie auth and API-token auth.
            return new Terminal(vmid, this);
        },
        display: (vmid: string | number): Display => new Display(vmid, this),
    };

    public readonly events = {
        resources: (): TimerPulledEventEmitter<Record<string, ClusterResource>> => {
            const existing = this.eventMonitors.get("resources");
            if (existing) return existing as TimerPulledEventEmitter<Record<string, ClusterResource>>;

            const monitor = new TimerPulledEventEmitter<Record<string, ClusterResource>>(async ({publish}: { publish: <K extends string>(key: K, value: ClusterResource) => boolean }) => {
                const resources = await this.request("/cluster/resources", "GET", {
                    $query: {type: "vm"},
                } as const) as ClusterResource[];
                for (const resource of resources) {
                    if (!resource.id) continue;
                    publish(resource.id, resource);
                }
            });
            this.eventMonitors.set("resources", monitor as unknown);
            return monitor;
        },

        tasks: (): TimerPulledEventEmitter<Record<string, ClusterTask> & {task: ClusterTask}> => {
            const existing = this.eventMonitors.get("tasks");
            if (existing) return existing as TimerPulledEventEmitter<Record<string, ClusterTask> & {task: ClusterTask}>;

            const monitor = new TimerPulledEventEmitter<Record<string, ClusterTask> & {task: ClusterTask}>(async ({publish}: { publish: <K extends string>(key: K, value: ClusterTask) => boolean }) => {
                const tasks = await this.request("/cluster/tasks", "GET", {}) as ClusterTask[];
                for (const task of tasks) {
                    if (!task.upid) continue;
                    publish(task.upid, task);
                }
            });
            // Convenience event: subscribe to all task updates with a single event name.
            monitor.filter(
                () => true,
                (task: ClusterTask) => {
                    monitor.emit("task", task);
                }
            );
            this.eventMonitors.set("tasks", monitor as unknown);
            return monitor;
        },

        stopListening: (): void => {
            for (const monitor of this.eventMonitors.values()) {
                (monitor as TimerPulledEventEmitter<Record<string, unknown>>).destroy();
            }
            this.eventMonitors.clear();
        },
    };

    constructor(options: ClientOptions) {
        this.opts = options;
        this.baseUrl = options.baseUrl.replace(/\/+$/, "");
        this.apiPath = (options.apiPath ?? "/api2/json").replace(/\/+$/, "");
        if (options.fetch) {
            this.fetchImpl = options.fetch;
        } else if (options.agent) {
            this.fetchImpl = native_fetch;
        } else if (typeof globalThis.fetch === "function") {
            this.fetchImpl = globalThis.fetch.bind(globalThis);
        } else {
            this.fetchImpl = native_fetch;
        }
        this.api = createAPI(this);
    }

    /**
     * Log in using username/password (ticket + CSRF).
     * Only applicable if you constructed the client with username/password.
     */
    async login(): Promise<this> {
        if (!("username" in this.opts)) {
            throw new Error("login() is only available for username/password auth.");
        }
        const realm = this.opts.realm ?? "pam";

        // Proxmox: POST /access/ticket with form fields username, password, realm
        const data = await this.request("/access/ticket", 'POST', {
            $body: {username: this.opts.username, password: this.opts.password, realm},
        }) as LoginResponse;

        if (!data.ticket || !data.CSRFPreventionToken) {
            throw new Error("Invalid login response: missing ticket or CSRFPreventionToken.");
        }

        this.auth.ticket = data.ticket;
        this.auth.csrf = data.CSRFPreventionToken;
        return this;
    }

    private buildUrl(path: string, query?: Record<string, unknown>): string {
        const url = new URL(this.baseUrl + this.apiPath + path);
        if (query) {
            for (const [k, v] of Object.entries(query)) {
                if (v === undefined || v === null) continue;
                if (Array.isArray(v)) for (const item of v) url.searchParams.append(k, this.serializeScalar(item));
                else url.searchParams.set(k, this.serializeScalar(v));
            }
        }
        return url.toString();
    }

    url(path: string, query?: Record<string, unknown>): string {
        return this.buildUrl(path, query);
    }

    sessionCookie(): string | undefined {
        if (!this.auth.ticket) return undefined;
        return `PVEAuthCookie=${this.auth.ticket}`;
    }

    tokenAuthorizationHeader(): string | undefined {
        if (!("apiToken" in this.opts)) return undefined;
        return this.opts.apiToken.startsWith("PVEAPIToken=")
            ? this.opts.apiToken
            : `PVEAPIToken=${this.opts.apiToken}`;
    }

    private serializeScalar(value: unknown): string {
        if (typeof value === "boolean") {
            return value ? "1" : "0";
        }
        return String(value);
    }

    private encodeForm(body: Record<string, unknown> | undefined): string {
        const sp = new URLSearchParams();
        for (const [k, v] of Object.entries(body ?? {})) {
            if (v === undefined || v === null) continue;
            if (Array.isArray(v)) for (const item of v) sp.append(k, this.serializeScalar(item));
            else if (typeof v === "object") sp.set(k, JSON.stringify(v));
            else sp.set(k, this.serializeScalar(v));
        }
        return sp.toString();
    }

    private authHeaders(extra?: Record<string, string | undefined> | undefined): Record<string, string> {
        let h: Record<string, string> = Object.fromEntries(Object.entries(extra ?? {}).filter(([, v]) => v !== undefined)) as Record<string, string>

        if ("apiToken" in this.opts) {
            h["Authorization"] = this.opts.apiToken?.startsWith("PVEAPIToken=")
                ? this.opts.apiToken
                : `PVEAPIToken=${this.opts.apiToken}`;
            return h;
        }

        if (this.auth.ticket) h["Cookie"] = `PVEAuthCookie=${this.auth.ticket}`;
        if (this.auth.csrf) h["CSRFPreventionToken"] = this.auth.csrf;
        return h;
    }

    /**
     * Typed request function using the `ProxmoxAPI` mapping.
     * - GET/DELETE use `$query`
     * - POST/PUT/PATCH use `$body` (sent as application/x-www-form-urlencoded, matching Proxmox conventions)
     * - Returns `json.data` when present (Proxmox wraps most results in `{ data: ... }`)
     */
    request = async <P extends keyof API, M extends MethodKey<P>>(
        path: P,
        method: M,
        args: Params<P, M>,
        requestInit?: RequestInit,
    ): Promise<Ret<P, M>> => {
        const a = args as AnyArgs;
        let urlPath = String(path);

        if (a.$path) {
            for (const [k, v] of Object.entries(a.$path)) {
                urlPath = urlPath.replace(`{${k}}`, encodeURIComponent(String(v)));
            }
        }

        const unresolvedPathParams = urlPath.match(/\{[^}]+\}/g);
        if (unresolvedPathParams) {
            throw new Error(`Missing path parameters for ${String(path)}: ${unresolvedPathParams.join(", ")}`);
        }

        const url = this.buildUrl(urlPath, a.$query);
        const headers = this.authHeaders(a.$headers);


        const init: RequestInit & { agent?: Agent | undefined } = {
            ...requestInit,
            method: method as string,
            headers: {
                ...requestInit?.headers,
                ...headers,
            },
            agent: this.opts.agent
        };

        if (a.$body !== undefined) {
            if (typeof a.$body === "string" || a.$body instanceof Blob) {
                init.body = a.$body as BodyInit;
            } else {
                (init.headers as Record<string, string>)["Content-Type"] = "application/x-www-form-urlencoded";
                init.body = this.encodeForm(a.$body as Record<string, unknown>);
            }
        }

        const res = await this.fetchImpl(url, init);
        if (!res.ok) {
            const text = await res.text().catch(() => "");
            throw new Error(`HTTP ${res.status} ${res.statusText}: ${text}`);
        }

        const ct = res.headers.get("content-type") || "";
        if (ct.includes("application/json")) {
            const json = await res.json();
            return (json?.data ?? json) as Ret<P, M>;
        }

        return (await res.text()) as Ret<P, M>;
    }

    private getNodeFromUPID(upid: string): string {
        const parts = upid.split(":");
        const node = parts[1];
        if (!node) {
            throw new Error(`Invalid UPID format: '${upid}'`);
        }
        return node;
    }


}

export function createAPI(client: Client): APIClient {
    return (
        {
            access: Access(client),
            cluster: Cluster(client),
            nodes: Nodes(client),
            pools: Pools(client),
            storage: Storage(client),
            version: Version(client)
        }
    ) as const;
}

// Re-export Terminal helpers for convenience
export {
    Terminal,
    TerminalRenderer,
    TerminalSession,
    TerminalState,
    type TerminalTicket,
    type TerminalConnectionInfo,
    type TerminalOpenOptions,
    type TerminalRendererState,
    type TerminalPipe,
};
