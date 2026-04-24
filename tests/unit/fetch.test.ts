import http from "node:http";
import https from "node:https";
import {PassThrough} from "node:stream";
import {afterEach, describe, expect, it, vi} from "vitest";
import native_fetch from "./fetch";

describe("native_fetch", () => {
	afterEach(() => {
		vi.restoreAllMocks();
	});

	it("sends body buffers and sets content-length automatically", async () => {
		const requestSpy = vi.spyOn(http, "request").mockImplementation((options: any, callback: any) => {
			const req = new PassThrough() as PassThrough & {
				destroy: (error?: Error) => void;
				write: (chunk: Buffer | string) => boolean;
				end: () => void;
			};
			const bodyChunks: Buffer[] = [];
			req.write = (chunk: Buffer | string) => {
				bodyChunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
				return true;
			};
			req.end = () => {
				const res = new PassThrough() as PassThrough & {
					statusCode: number;
					statusMessage: string;
					headers: http.IncomingHttpHeaders;
				};
				res.statusCode = 200;
				res.statusMessage = "OK";
				res.headers = {"content-type": "application/json"};
				callback(res);
				res.end(
					JSON.stringify({
						method: options.method,
						headers: options.headers,
						body: Buffer.concat(bodyChunks).toString("utf8"),
					})
				);
				req.emit("close");
			};
			req.destroy = (error?: Error) => {
				if (error) req.emit("error", error);
				req.emit("close");
			};
			return req as never;
		});

		const response = await native_fetch("http://example.test/echo", {
			method: "POST",
			headers: {"x-test": "yes"},
			body: new Uint8Array([65, 66]) as unknown as BodyInit,
		});
		const data = await response.json() as Record<string, any>;

		expect(data.method).toBe("POST");
		expect(data.body).toBe("AB");
		expect(data.headers["x-test"]).toBe("yes");
		expect(data.headers["content-length"]).toBe("2");
		expect(requestSpy).toHaveBeenCalledOnce();
	});

	it("merges Request and init values while preferring init method/body", async () => {
		vi.spyOn(http, "request").mockImplementation((options: any, callback: any) => {
			const req = new PassThrough() as PassThrough & {
				destroy: (error?: Error) => void;
				write: (chunk: Buffer | string) => boolean;
				end: () => void;
			};
			const bodyChunks: Buffer[] = [];
			req.write = (chunk: Buffer | string) => {
				bodyChunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
				return true;
			};
			req.end = () => {
				const res = new PassThrough() as PassThrough & {
					statusCode: number;
					statusMessage: string;
					headers: http.IncomingHttpHeaders;
				};
				res.statusCode = 200;
				res.statusMessage = "OK";
				res.headers = {"content-type": "application/json"};
				callback(res);
				res.end(
					JSON.stringify({
						method: options.method,
						headers: options.headers,
						body: Buffer.concat(bodyChunks).toString("utf8"),
						path: options.path,
					})
				);
				req.emit("close");
			};
			req.destroy = (error?: Error) => {
				if (error) req.emit("error", error);
				req.emit("close");
			};
			return req as never;
		});

		const request = new Request("http://example.test/merged?x=1", {
			method: "POST",
			headers: {"x-from-request": "r1"},
			body: "request-body",
		});

		const response = await native_fetch(request, {
			method: "PUT",
			headers: {"x-from-init": "i1"},
			body: "init-body",
		});
		const data = await response.json() as Record<string, any>;

		expect(data.method).toBe("PUT");
		expect(data.body).toBe("init-body");
		expect(data.path).toBe("/merged?x=1");
		expect(data.headers["x-from-request"]).toBe("r1");
		expect(data.headers["x-from-init"]).toBe("i1");
	});

	it("supports abort signals", async () => {
		vi.spyOn(http, "request").mockImplementation(() => {
			const req = new PassThrough() as PassThrough & {
				destroy: (error?: Error) => void;
				write: (chunk: Buffer | string) => boolean;
				end: () => void;
			};
			req.write = () => true;
			req.end = () => undefined;
			req.destroy = (error?: Error) => {
				if (error) req.emit("error", error);
				req.emit("close");
			};
			return req as never;
		});
		vi.spyOn(https, "request").mockImplementation(http.request as never);

		const controller = new AbortController();
		const promise = native_fetch("http://example.test/slow", {signal: controller.signal});
		controller.abort();

		await expect(promise).rejects.toMatchObject({name: "AbortError"});
	});
});
