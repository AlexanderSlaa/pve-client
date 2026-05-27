// Top-level helper for tests: create a RetryableError
export function createConnectError(message: string, retryable: boolean): Error {
    return new RetryableError(message, retryable);
}
import type RFB from "@novnc/novnc";
import type {RFBCapabilities, RFBCredentials} from "@novnc/novnc";

export type NoVNCConnectionOptions = {
    target: HTMLElement;
    urlOrChannel: string | WebSocket | RTCDataChannel;
    shared?: boolean;
    credentials?: RFBCredentials;
    repeaterID?: string;
    wsProtocols?: string[];
};

export type NoVNCViewportOptions = {
    clipViewport?: boolean;
    dragViewport?: boolean;
    scaleViewport?: boolean;
    resizeSession?: boolean;
};

export type NoVNCQualityOptions = {
    compressionLevel?: number;
    qualityLevel?: number;
};

export type NoVNCReconnectAttempt = {
    attempt: number;
    maxAttempts: number;
    error: Error;
    delayMs: number;
};

export type NoVNCReconnectOptions = {
    maxAttempts?: number;
    initialDelayMs?: number;
    maxDelayMs?: number;
    backoffMultiplier?: number;
    jitterRatio?: number;
    connectTimeoutMs?: number;
    retryOnSecurityFailure?: boolean;
    signal?: AbortSignal;
    shouldRetry?: (attempt: NoVNCReconnectAttempt) => boolean;
};

export type NoVNCEventMap = {
    bell: Event;
    capabilities: CustomEvent<{ capabilities: RFBCapabilities }>;
    clipboard: CustomEvent<{ text: string }>;
    clippingviewport: CustomEvent<boolean>;
    connect: Event;
    credentialsrequired: CustomEvent<{ types: string[] }>;
    desktopname: CustomEvent<{ name: string }>;
    disconnect: CustomEvent<{ clean: boolean }>;
    securityfailure: CustomEvent<{ status: number; reason?: string }>;
    serververification: CustomEvent<{ type?: string; publickey?: Uint8Array; subject?: string }>;
};

export type NoVNCEventName = keyof NoVNCEventMap;

/**
 * Thin, typed facade around noVNC's RFB object.
 *
 * Design goals:
 * - Keep consumers on stable, typed helpers rather than direct property mutation.
 * - Be safe across browser + Node toolchains via lazy module loading.
 * - Keep lifecycle state explicit so callers can make robust reconnect decisions.
 */
export class NoVNCFacade {
    private rfb?: RFB;
    private connected = false;
    private connectVersion = 0;
    private static rfbCtor?: typeof import("@novnc/novnc").default;

    /**
     * Opens a new RFB session.
     *
     * If another session exists, it is disconnected first.
     * The method is async because noVNC is loaded dynamically to avoid evaluating
     * browser-only code (window usage) in non-browser runtimes.
     */
    async connect(options: NoVNCConnectionOptions): Promise<RFB> {
        const RFBConstructor = await NoVNCFacade.getRfbConstructor();
        const version = ++this.connectVersion;

        if (this.rfb) {
            this.rfb.disconnect();
        }

        const rfb = new RFBConstructor(options.target, options.urlOrChannel, {
            shared: options.shared,
            credentials: options.credentials,
            repeaterID: options.repeaterID,
            wsProtocols: options.wsProtocols,
        });
        this.rfb = rfb;
        this.connected = false;

        // Keep facade state aligned with the currently active RFB object only.
        // This avoids stale events from earlier sessions corrupting state.
        rfb.addEventListener("connect", () => {
            if (this.rfb !== rfb || this.connectVersion !== version) return;
            this.connected = true;
        });

        rfb.addEventListener("disconnect", () => {
            if (this.rfb !== rfb || this.connectVersion !== version) return;
            this.connected = false;
            this.rfb = undefined;
        });

        return rfb;
    }

    /**
     * Attempts to connect and wait for a successful handshake, retrying failures.
     *
     * This does not auto-reconnect after a later disconnect. It is intended for
     * initial session establishment where network and proxy readiness can be transient.
     */
    async connectWithRetry(options: NoVNCConnectionOptions, reconnectOptions: NoVNCReconnectOptions = {}): Promise<RFB> {
        const maxAttempts = Math.max(1, reconnectOptions.maxAttempts ?? 5);
        const initialDelayMs = Math.max(0, reconnectOptions.initialDelayMs ?? 500);
        const maxDelayMs = Math.max(initialDelayMs, reconnectOptions.maxDelayMs ?? 10_000);
        const backoffMultiplier = Math.max(1, reconnectOptions.backoffMultiplier ?? 2);
        const jitterRatio = Math.min(1, Math.max(0, reconnectOptions.jitterRatio ?? 0.2));
        const connectTimeoutMs = Math.max(1, reconnectOptions.connectTimeoutMs ?? 10_000);
        const retryOnSecurityFailure = reconnectOptions.retryOnSecurityFailure ?? false;

        for (let attempt = 1; attempt <= maxAttempts; attempt++) {
            this.throwIfAborted(reconnectOptions.signal);

            try {
                const rfb = await this.connect(options);
                await this.waitForHandshake(rfb, {
                    timeoutMs: connectTimeoutMs,
                    retryOnSecurityFailure,
                    signal: reconnectOptions.signal,
                });
                return rfb;
            } catch (error) {
                const err = error instanceof Error ? error : new Error(String(error));
                const retryable = this.isRetryable(err);
                if (!retryable || attempt >= maxAttempts) {
                    throw err;
                }

                const delayMs = this.computeBackoffDelay({
                    attempt,
                    initialDelayMs,
                    maxDelayMs,
                    backoffMultiplier,
                    jitterRatio,
                });

                const decision: NoVNCReconnectAttempt = {
                    attempt,
                    maxAttempts,
                    error: err,
                    delayMs,
                };
                if (reconnectOptions.shouldRetry && !reconnectOptions.shouldRetry(decision)) {
                    throw err;
                }

                await this.sleep(delayMs, reconnectOptions.signal);
            }
        }

        throw new Error("NoVNC connection retry exhausted.");
    }

    /** Disconnects and clears the active RFB session. Safe to call repeatedly. */
    disconnect(): void {
        if (!this.rfb) return;
        this.rfb.disconnect();
        this.connected = false;
        this.rfb = undefined;
    }

    /** True after noVNC emits a connect event and before disconnect. */
    isConnected(): boolean {
        return this.connected;
    }

    /** Returns the active low-level RFB instance for advanced use-cases. */
    instance(): RFB {
        return this.requireRfb();
    }

    focus(): void {
        this.requireRfb().focus();
    }

    blur(): void {
        this.requireRfb().blur();
    }

    sendCtrlAltDel(): void {
        this.requireRfb().sendCtrlAltDel();
    }

    machineShutdown(): void {
        this.requirePowerCapability().machineShutdown();
    }

    machineReboot(): void {
        this.requirePowerCapability().machineReboot();
    }

    machineReset(): void {
        this.requirePowerCapability().machineReset();
    }

    sendKey(keysym: number, code?: string | null, down?: boolean): void {
        this.requireRfb().sendKey(keysym, code, down);
    }

    sendCredentials(credentials: RFBCredentials): void {
        this.requireRfb().sendCredentials(credentials);
    }

    approveServer(): void {
        this.requireRfb().approveServer();
    }

    pasteClipboard(text: string): void {
        this.requireRfb().clipboardPasteFrom(text);
    }

    setViewOnly(viewOnly: boolean): void {
        this.requireRfb().viewOnly = viewOnly;
    }

    setBackground(background: string): void {
        this.requireRfb().background = background;
    }

    setViewport(options: NoVNCViewportOptions): void {
        const rfb = this.requireRfb();
        if (options.clipViewport !== undefined) rfb.clipViewport = options.clipViewport;
        if (options.dragViewport !== undefined) rfb.dragViewport = options.dragViewport;
        if (options.scaleViewport !== undefined) rfb.scaleViewport = options.scaleViewport;
        if (options.resizeSession !== undefined) rfb.resizeSession = options.resizeSession;
    }

    setQuality(options: NoVNCQualityOptions): void {
        const rfb = this.requireRfb();
        if (options.compressionLevel !== undefined) {
            rfb.compressionLevel = this.normalizeLevel(options.compressionLevel, "compressionLevel");
        }
        if (options.qualityLevel !== undefined) {
            rfb.qualityLevel = this.normalizeLevel(options.qualityLevel, "qualityLevel");
        }
    }

    capabilities(): RFBCapabilities {
        return this.requireRfb().capabilities;
    }

    on<K extends NoVNCEventName>(event: K, listener: (event: NoVNCEventMap[K]) => void): () => void {
        const rfb = this.requireRfb();
        const handler: EventListener = (ev) => {
            listener(ev as NoVNCEventMap[K]);
        };
        rfb.addEventListener(event, handler);
        // Capture the RFB instance at registration time
        return () => {
            // Remove from the RFB instance that was current at registration
            rfb.removeEventListener(event, handler);
        };
    }

    private requireRfb(): RFB {
        if (!this.rfb) {
            throw new Error("NoVNC is not connected. Call connect() first.");
        }
        return this.rfb;
    }

    private requirePowerCapability(): RFB {
        const rfb = this.requireRfb();
        if (!rfb.capabilities.power) {
            throw new Error("Server power operations are unavailable (capabilities.power=false).");
        }
        return rfb;
    }

    private async waitForHandshake(rfb: RFB, options: { timeoutMs: number; retryOnSecurityFailure: boolean; signal?: AbortSignal }): Promise<void> {
        if (this.connected && this.rfb === rfb) {
            return;
        }

        await new Promise<void>((resolve, reject) => {
            let settled = false;

            const cleanup = () => {
                rfb.removeEventListener("connect", onConnect);
                rfb.removeEventListener("disconnect", onDisconnect);
                rfb.removeEventListener("securityfailure", onSecurityFailure);
                options.signal?.removeEventListener("abort", onAbort);
                clearTimeout(timer);
            };

            const finishResolve = () => {
                if (settled) return;
                settled = true;
                cleanup();
                resolve();
            };

            const finishReject = (error: Error) => {
                if (settled) return;
                settled = true;
                cleanup();
                reject(error);
            };

            const onConnect = () => {
                finishResolve();
            };

            const onDisconnect = (ev: Event) => {
                const detail = (ev as NoVNCEventMap["disconnect"]).detail;
                finishReject(this.createConnectError(`Disconnected before handshake completed (clean=${Boolean(detail?.clean)}).`, true));
            };

            const onSecurityFailure = (ev: Event) => {
                const detail = (ev as NoVNCEventMap["securityfailure"]).detail;
                const reason = detail.reason ? `: ${detail.reason}` : "";
                finishReject(this.createConnectError(`Security negotiation failed (status=${detail.status})${reason}`, options.retryOnSecurityFailure));
            };

            const onAbort = () => {
                finishReject(this.createConnectError("Connection attempt aborted.", false));
            };

            const timer = setTimeout(() => {
                finishReject(this.createConnectError(`Connection timed out after ${options.timeoutMs}ms.`, true));
            }, options.timeoutMs);

            rfb.addEventListener("connect", onConnect);
            rfb.addEventListener("disconnect", onDisconnect);
            rfb.addEventListener("securityfailure", onSecurityFailure);

            if (options.signal?.aborted) {
                onAbort();
                return;
            }
            options.signal?.addEventListener("abort", onAbort, {once: true});
        });
    }

    private createConnectError(message: string, retryable: boolean): Error {
        return new RetryableError(message, retryable);
    }

    private isRetryable(error: Error): boolean {
        const withRetryable = error as Error & { retryable?: boolean };
        return withRetryable.retryable !== false;
    }

    private async sleep(ms: number, signal?: AbortSignal): Promise<void> {
        await new Promise<void>((resolve, reject) => {
            const timer = setTimeout(() => {
                signal?.removeEventListener("abort", onAbort);
            });
        });
    }

    private throwIfAborted(signal?: AbortSignal): void {
        if (!signal?.aborted) return;
        throw this.createConnectError("Connection attempt aborted.", false);
    }
}

// Top-level error class for retryable connection errors
export class RetryableError extends Error {
    constructor(msg: string, public retryable: boolean) {
        super(msg);
        this.name = 'RetryableError';
    }
    private normalizeLevel(value: number, name: "compressionLevel" | "qualityLevel"): number {
        if (!Number.isFinite(value)) {
            throw new Error(`${name} must be a finite number in range 0-9.`);
        }
        const rounded = Math.round(value);
        return Math.min(9, Math.max(0, rounded));
    }

    private static async getRfbConstructor(): Promise<typeof import("@novnc/novnc").default> {
        if (!NoVNCFacade.rfbCtor) {
            const module = await import("@novnc/novnc");
            NoVNCFacade.rfbCtor = module.default;
        }
        return NoVNCFacade.rfbCtor;
    }
}