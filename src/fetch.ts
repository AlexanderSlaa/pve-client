import http from "node:http";
import https from "node:https";
import {Readable} from "node:stream";
import {Agent as HttpAgent} from "node:http";
import {Agent as HttpsAgent} from "node:https";

type AnyAgent = HttpAgent | HttpsAgent;

type NativeFetchInit = RequestInit & { agent?: AnyAgent };

function isHttps(url: URL) {
    return url.protocol === "https:";
}

function mergeHeaders(base?: HeadersInit, extra?: HeadersInit): Headers {
    const h = new Headers(base);
    if (extra) {
        const e = new Headers(extra);
        e.forEach((v, k) => h.set(k, v));
    }
    return h;
}

async function bodyToBuffer(body: unknown): Promise<Buffer | undefined> {
    if (body == null) return undefined;

    // String
    if (typeof body === "string") return Buffer.from(body);

    // Buffer
    if (Buffer.isBuffer(body)) return body;

    // Uint8Array / ArrayBuffer
    if (body instanceof Uint8Array) return Buffer.from(body);
    if (body instanceof ArrayBuffer) return Buffer.from(new Uint8Array(body));

    // Blob
    if (typeof Blob !== "undefined" && body instanceof Blob) {
        const ab = await body.arrayBuffer();
        return Buffer.from(new Uint8Array(ab));
    }

    // WHATWG ReadableStream -> buffer (basic support)
    if (typeof ReadableStream !== "undefined" && body instanceof ReadableStream) {
        const reader = body.getReader();
        const chunks: Buffer[] = [];
        while (true) {
            const {value, done} = await reader.read();
            if (done) break;
            chunks.push(Buffer.from(value));
        }
        return Buffer.concat(chunks);
    }

    // Node Readable -> buffer (basic support)
    if (body && typeof (body as any).pipe === "function") {
        const chunks: Buffer[] = [];
        for await (const chunk of body as any as AsyncIterable<Buffer | string>) {
            chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
        }
        return Buffer.concat(chunks);
    }

    throw new TypeError(
        `Unsupported body type for native_fetch: ${Object.prototype.toString.call(body)}`
    );
}

const native_fetch: typeof fetch = async (
    input: string | URL | Request,
    init?: NativeFetchInit
): Promise<Response> => {
    // Normalize input into URL + Request fields
    let url: URL;
    let request: Request | undefined;

    if (input instanceof Request) {
        request = input;
        url = new URL(request.url);
    } else if (input instanceof URL) {
        url = input;
    } else {
        url = new URL(input);
    }

    // Merge init with Request (init should override Request)
    const method = (init?.method ?? request?.method ?? "GET").toUpperCase();

    const headers = mergeHeaders(request?.headers, init?.headers);

    // Body precedence:
    // - If init.body present -> use it
    // - else if Request has a body -> use that (buffered)
    const bodySource =
        init && "body" in init && init.body !== undefined ? init.body : request;

    let bodyBuffer: Buffer | undefined;

    if (bodySource instanceof Request) {
        // Only read Request body if method typically allows it
        // (and if body exists)
        if (method !== "GET" && method !== "HEAD") {
            // Cloning avoids "body already used" issues if caller reuses request elsewhere
            const clone = bodySource.clone();
            const ab = await clone.arrayBuffer().catch(() => undefined);
            if (ab) bodyBuffer = Buffer.from(new Uint8Array(ab));
        }
    } else {
        bodyBuffer = await bodyToBuffer(bodySource);
    }

    // Set Content-Length if we have a concrete body and caller didn't set it
    if (
        bodyBuffer &&
        !headers.has("content-length") &&
        method !== "GET" &&
        method !== "HEAD"
    ) {
        headers.set("content-length", String(bodyBuffer.byteLength));
    }

    // Default Host header is handled by node, but keeping user header if provided is fine.
    // Basic request options
    const port =
        url.port !== ""
            ? Number(url.port)
            : isHttps(url)
                ? 443
                : 80;

    const options: http.RequestOptions = {
        protocol: url.protocol,
        hostname: url.hostname,
        port,
        path: url.pathname + url.search,
        method,
        headers: Object.fromEntries(headers.entries()),
        agent: init?.agent,
    };

    const signal = init?.signal ?? request?.signal;

    const transport = isHttps(url) ? https : http;

    return await new Promise<Response>((resolve, reject) => {
        const req = transport.request(options, (res) => {
            // Convert Node headers -> WHATWG Headers
            const resHeaders = new Headers();
            for (const [k, v] of Object.entries(res.headers)) {
                if (typeof v === "undefined") continue;
                if (Array.isArray(v)) {
                    // Multiple headers with same name
                    for (const vv of v) resHeaders.append(k, vv);
                } else {
                    resHeaders.set(k, v);
                }
            }

            const status = res.statusCode ?? 0;
            const statusText = res.statusMessage ?? "";

            // Convert Node Readable -> Web ReadableStream for Response
            const webBody = (Readable as any).toWeb
                ? (Readable as any).toWeb(res)
                : undefined;

            // Note: Response() accepts null body; for HEAD responses body is empty anyway.
            const response = new Response(webBody ?? null, {
                status,
                statusText,
                headers: resHeaders,
            });

            resolve(response);
        });

        req.on("error", reject);

        // Abort handling
        if (signal) {
            if (signal.aborted) {
                req.destroy(new DOMException("Aborted", "AbortError"));
                return reject(new DOMException("Aborted", "AbortError"));
            }
            const onAbort = () => {
                req.destroy(new DOMException("Aborted", "AbortError"));
                reject(new DOMException("Aborted", "AbortError"));
            };
            signal.addEventListener("abort", onAbort, {once: true});
            req.on("close", () => {
                signal.removeEventListener("abort", onAbort);
            });
        }

        // Write body (buffered)
        if (bodyBuffer && method !== "GET" && method !== "HEAD") {
            req.write(bodyBuffer);
        }
        req.end();
    });
};

export default native_fetch
