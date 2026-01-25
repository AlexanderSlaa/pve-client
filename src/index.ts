/* Auto-generated Proxmox VE TypeScript client.
 * - Includes ALL endpoints found in the provided spec.json
 * - Generates TSDoc for every endpoint function (description + @endpoint + parameter list)
 */
import {Agent} from "node:https";
import native_fetch from "./fetch";
import Access from "./api/access";
import Cluster from "./api/cluster";
import Nodes from "./api/nodes";
import Pools from "./api/pools";
import Storage from "./api/storage";
import type {AnyArgs, API, MethodKey, Params, Ret} from "./api";
import Version from "./api/version";


export type FetchLike<Input extends string | URL | Request = string | URL, Init extends RequestInit = RequestInit, Out extends Request = Request> = (input: Input, init?: Init) => Promise<Out>;

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


export class Client {
    private readonly baseUrl: string;
    private readonly apiPath: string;
    private readonly fetchImpl: FetchLike<any, any, any>;
    private readonly opts: ClientOptions;
    private auth: AuthState = {};

    /**
     * Structured API surface generated from the spec.
     * Example:
     * ```ts
     * client.api.cluster.replication.read({})
     * client.api.cluster.replication.id("100-1").read({})
     * ```
     */
    public readonly api: APIClient;

    constructor(options: ClientOptions) {
        this.opts = options;
        this.baseUrl = options.baseUrl.replace(/\/+$/, "");
        this.apiPath = (options.apiPath ?? "/api2/json").replace(/\/+$/, "");
        this.fetchImpl = options.fetch ?? (options.agent ? native_fetch : globalThis.fetch.bind(globalThis));
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
        const data: any = await this.request("/access/ticket", 'POST', {
            $body: {username: this.opts.username, password: this.opts.password, realm} as any,
        } as any);

        this.auth.ticket = data?.ticket;
        this.auth.csrf = data?.CSRFPreventionToken;
        return this;
    }

    private buildUrl(path: string, query?: Record<string, any>): string {
        const url = new URL(this.baseUrl + this.apiPath + path);
        if (query) {
            for (const [k, v] of Object.entries(query)) {
                if (v === undefined || v === null) continue;
                if (Array.isArray(v)) for (const item of v) url.searchParams.append(k, String(item));
                else url.searchParams.set(k, String(v));
            }
        }
        return url.toString();
    }

    private encodeForm(body: any): string {
        const sp = new URLSearchParams();
        for (const [k, v] of Object.entries(body ?? {})) {
            if (v === undefined || v === null) continue;
            if (Array.isArray(v)) for (const item of v) sp.append(k, String(item));
            else if (typeof v === "object") sp.set(k, JSON.stringify(v));
            else sp.set(k, String(v));
        }
        return sp.toString();
    }

    private authHeaders(extra?: Record<string, string | undefined> | undefined): Record<string, string> {
        let h: Record<string, string> = Object.fromEntries(Object.entries(extra ?? {}).filter(([_, v]) => v !== undefined)) as Record<string, string>

        if ("apiToken" in this.opts) {
            h["Authorization"] = this.opts.apiToken.startsWith("PVEAPIToken=")
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
        const a = args as unknown as AnyArgs;
        let urlPath = String(path);

        if (a.$path) {
            for (const [k, v] of Object.entries(a.$path)) {
                urlPath = urlPath.replace(`{${k}}`, encodeURIComponent(String(v)));
            }
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
                init.body = a.$body as any;
            } else {
                (init.headers as any)["Content-Type"] = "application/x-www-form-urlencoded";
                init.body = this.encodeForm(a.$body);
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
            return (json?.data ?? json) as any;
        }

        return (await res.text()) as any;
    }
}

export type APIClient = ReturnType<typeof createAPI>;

export function createAPI(client: Client) {
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
