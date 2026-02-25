import {EventEmitter} from "node:events";

type EventKey = string | symbol;
type EventValueMap = object;
type ManagedEventKey<T extends EventValueMap> = Extract<keyof T, EventKey>;
type NodeEventMap<T extends EventValueMap> = {
    [K in ManagedEventKey<T>]: [T[K]];
};

export type PullContext<T extends EventValueMap> = {
    readonly emittedEvents: Map<ManagedEventKey<T>, T[ManagedEventKey<T>]>;
    publish<K extends ManagedEventKey<T>>(key: K, value: T[K]): boolean;
};

export type PullFunction<T extends EventValueMap> = (
    context: PullContext<T>
) => Promise<void> | void;

export type EventFilterPredicate<T extends EventValueMap> = (
    value: T[ManagedEventKey<T>],
    key: ManagedEventKey<T>
) => boolean;
export type EventFilterListener<T extends EventValueMap> = (
    value: T[ManagedEventKey<T>],
    key: ManagedEventKey<T>
) => void;

export class EventFilter<T extends EventValueMap> {
    constructor(
        private readonly predicate: EventFilterPredicate<T>,
        private readonly listener: EventFilterListener<T>
    ) {
    }

    test(value: T[ManagedEventKey<T>], key: ManagedEventKey<T>): boolean {
        if (!this.predicate(value, key)) return false;
        this.listener(value, key);
        return true;
    }

    matches(filter: EventFilter<T>): boolean;
    matches(predicate: EventFilterPredicate<T>, listener: EventFilterListener<T>): boolean;
    matches(predicate: EventFilterPredicate<T> | EventFilter<T>, listener?: EventFilterListener<T>): boolean {
        if (predicate instanceof EventFilter) {
            return predicate === this || (predicate.predicate === this.predicate && predicate.listener === this.listener);
        }
        return this.predicate === predicate && this.listener === listener;
    }
}

export class TimerPulledEventEmitter<T extends EventValueMap> extends EventEmitter<NodeEventMap<T>> {
    private timer?: NodeJS.Timeout;
    private filters: EventFilter<T>[] = [];
    private emittedEvents = new Map<ManagedEventKey<T>, T[ManagedEventKey<T>]>();
    private running = false;

    constructor(
        private readonly pullFn: PullFunction<T>,
        private pollInterval = 3000
    ) {
        super();
        this.start();
    }

    get interval() {
        return this.pollInterval;
    }

    set interval(value: number) {
        this.pollInterval = Math.max(100, value);
        if (!this.running) return;
        this.stop();
        this.start();
    }

    get history(): Array<T[ManagedEventKey<T>]> {
        return Array.from(this.emittedEvents.values());
    }

    start() {
        if (this.running) return;
        this.running = true;
        this.timer = setInterval(() => {
            void this.pullNow();
        }, this.pollInterval);
    }

    stop() {
        if (!this.running) return;
        this.running = false;
        if (this.timer) clearInterval(this.timer);
        this.timer = undefined;
    }

    destroy() {
        this.stop();
        this.removeAllListeners();
        this.filters = [];
        this.emittedEvents.clear();
    }

    clearCache() {
        this.emittedEvents.clear();
    }

    on<K extends ManagedEventKey<T>>(eventName: K, listener: (value: T[K]) => void): this;
    on(eventName: "error", listener: (error: Error) => void): this;
    on(eventName: EventKey, listener: (...args: any[]) => void): this {
        super.on(eventName, listener);
        return this;
    }

    once<K extends ManagedEventKey<T>>(eventName: K, listener: (value: T[K]) => void): this;
    once(eventName: "error", listener: (error: Error) => void): this;
    once(eventName: EventKey, listener: (...args: any[]) => void): this {
        super.once(eventName, listener);
        return this;
    }

    off<K extends ManagedEventKey<T>>(eventName: K, listener: (value: T[K]) => void): this;
    off(eventName: "error", listener: (error: Error) => void): this;
    off(eventName: EventKey, listener: (...args: any[]) => void): this {
        super.off(eventName, listener);
        return this;
    }

    async pullNow() {
        try {
            await this.pullFn({
                publish: this.publish.bind(this),
                emittedEvents: this.emittedEvents
            });
        } catch (error) {
            // Keep polling alive while surfacing failures to consumers.
            if (this.listenerCount("error") > 0) {
                (super.emit as (eventName: EventKey, ...args: unknown[]) => boolean)("error", error as Error);
            } else {
                console.error(error);
            }
        }
    }

    private publish<K extends ManagedEventKey<T>>(key: K, value: T[K]): boolean {
        const previous = this.emittedEvents.get(key);
        if (previous !== undefined && this.deepEqual(previous, value)) {
            return false;
        }
        this.emittedEvents.set(key, value);
        const emitted = (super.emit as (eventName: EventKey, ...args: unknown[]) => boolean)(
            key as EventKey,
            value
        );
        const typedKey = key as ManagedEventKey<T>;
        for (const filter of this.filters) {
            filter.test(value as T[ManagedEventKey<T>], typedKey);
        }
        return emitted;
    }

    filter(filter: EventFilter<T>): EventFilter<T>;
    filter(predicate: EventFilterPredicate<T>, listener: EventFilterListener<T>): EventFilter<T>;
    filter(predicate: EventFilterPredicate<T> | EventFilter<T>, listener?: EventFilterListener<T>): EventFilter<T> {
        if (predicate instanceof EventFilter) {
            this.filters.push(predicate);
            return predicate;
        }
        const eventFilter = new EventFilter(predicate, listener as EventFilterListener<T>);
        this.filters.push(eventFilter);
        return eventFilter;
    }

    removeFilter(filter: EventFilter<T>): boolean;
    removeFilter(predicate: EventFilterPredicate<T>, listener: EventFilterListener<T>): boolean;
    removeFilter(predicate: EventFilterPredicate<T> | EventFilter<T>, listener?: EventFilterListener<T>): boolean {
        const before = this.filters.length;
        this.filters = this.filters.filter((f) => !f.matches(predicate as never, listener as never));
        return before !== this.filters.length;
    }

    private deepEqual(a: unknown, b: unknown): boolean {
        if (a === b) return true;
        if (typeof a !== "object" || typeof b !== "object" || !a || !b) return false;
        const aObj = a as Record<string, unknown>;
        const bObj = b as Record<string, unknown>;
        const aKeys = Object.keys(aObj);
        const bKeys = Object.keys(bObj);
        if (aKeys.length !== bKeys.length) return false;
        for (const key of aKeys) {
            if (!(key in bObj)) return false;
            if (!this.deepEqual(aObj[key], bObj[key])) return false;
        }
        return true;
    }
}
