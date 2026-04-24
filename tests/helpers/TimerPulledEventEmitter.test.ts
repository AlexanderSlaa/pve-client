import {describe, expect, it, vi} from "vitest";
import {EventFilter, TimerPulledEventEmitter} from "./TimerPulledEventEmitter";

type Events = {
	alpha: {count: number};
	beta: string;
};

describe("TimerPulledEventEmitter", () => {
	it("publishes only changed values and tracks history", async () => {
		let value = 1;
		const emitter = new TimerPulledEventEmitter<Events>(({publish}) => {
			publish("alpha", {count: value});
		}, 5_000);
		emitter.stop();

		const seen: Array<{count: number}> = [];
		emitter.on("alpha", (event) => seen.push(event));

		await emitter.pullNow();
		await emitter.pullNow();
		value = 2;
		await emitter.pullNow();

		expect(seen).toEqual([{count: 1}, {count: 2}]);
		expect(emitter.history).toEqual([{count: 2}]);
	});

	it("supports filters and filter removal", async () => {
		const emitter = new TimerPulledEventEmitter<Events>(({publish}) => {
			publish("beta", "match");
			publish("alpha", {count: 10});
		}, 5_000);
		emitter.stop();

		const listener = vi.fn();
		const predicate = vi.fn((value: Events[keyof Events], key: keyof Events) => key === "beta" && value === "match");
		const filter = emitter.filter(predicate as never, listener as never);

		await emitter.pullNow();
		expect(predicate).toHaveBeenCalled();
		expect(listener).toHaveBeenCalledWith("match", "beta");

		const removed = emitter.removeFilter(filter);
		expect(removed).toBe(true);

		listener.mockClear();
		await emitter.pullNow();
		expect(listener).not.toHaveBeenCalled();
	});

	it("emits errors to listeners, or console when no listener exists", async () => {
		const expected = new Error("boom");
		const emitter = new TimerPulledEventEmitter<Events>(async () => {
			throw expected;
		}, 5_000);
		emitter.stop();

		const onError = vi.fn();
		emitter.on("error", onError);
		await emitter.pullNow();
		expect(onError).toHaveBeenCalledWith(expected);

		emitter.off("error", onError);
		const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => undefined);
		await emitter.pullNow();
		expect(consoleSpy).toHaveBeenCalled();

		consoleSpy.mockRestore();
	});

	it("matches EventFilter instances and callback pairs", () => {
		const predicate = vi.fn(() => true);
		const listener = vi.fn();
		const filter = new EventFilter(predicate as never, listener as never);

		expect(filter.matches(filter)).toBe(true);
		expect(filter.matches(predicate as never, listener as never)).toBe(true);
		expect(filter.matches(vi.fn(() => true) as never, listener as never)).toBe(false);
	});
});
