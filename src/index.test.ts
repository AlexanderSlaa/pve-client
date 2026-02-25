import {afterEach, beforeEach, describe, expect, it, vi} from "vitest";
import {Client} from "./index";

describe("Client", () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.restoreAllMocks();
        vi.useRealTimers();
    });

    it("builds URLs and token auth headers", () => {
        const client = new Client({
            baseUrl: "https://pve.local/",
            apiPath: "/api2/json/",
            apiToken: "root@pam!id=secret",
            fetch: vi.fn(),
        });

        expect(client.url("/nodes", {a: 1, b: ["x", "y"]})).toBe("https://pve.local/api2/json/nodes?a=1&b=x&b=y");
        expect(client.tokenAuthorizationHeader()).toBe("PVEAPIToken=root@pam!id=secret");
    });

    it("logs in with username/password and sets session cookie", async () => {
        const fetchMock = vi.fn(async () =>
            new Response(
                JSON.stringify({
                    data: {
                        ticket: "ticket-value",
                        CSRFPreventionToken: "csrf-token",
                    },
                }),
                {
                    status: 200,
                    headers: {"content-type": "application/json"},
                }
            )
        );
        const client = new Client({
            baseUrl: "https://pve.local",
            username: "root",
            password: "pass",
            fetch: fetchMock,
        });

        await client.login();
        expect(client.sessionCookie()).toBe("PVEAuthCookie=ticket-value");

        const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit];
        expect(url).toBe("https://pve.local/api2/json/access/ticket");
        expect(init.method).toBe("POST");
        expect((init.headers as Record<string, string>)["Content-Type"]).toBe("application/x-www-form-urlencoded");
        expect(String(init.body)).toContain("realm=pam");
    });

    it("throws on unsuccessful HTTP responses", async () => {
        const client = new Client({
            baseUrl: "https://pve.local",
            apiToken: "PVEAPIToken=user@pam!id=secret",
            fetch: vi.fn(async () => new Response("bad request", {status: 400, statusText: "Bad Request"})),
        });

        await expect(
            client.request("/version", "GET", {} as never)
        ).rejects.toThrow("HTTP 400 Bad Request: bad request");
    });

    it("parses json data wrapper and text responses", async () => {
        const fetchMock = vi
            .fn()
            .mockResolvedValueOnce(
                new Response(JSON.stringify({data: {release: "8.2"}}), {
                    status: 200,
                    headers: {"content-type": "application/json"},
                })
            )
            .mockResolvedValueOnce(new Response("plain-text", {status: 200, headers: {"content-type": "text/plain"}}));

        const client = new Client({
            baseUrl: "https://pve.local",
            apiToken: "token",
            fetch: fetchMock,
        });

        const json = await client.request("/version", "GET", {} as never);
        const text = await client.request("/version", "GET", {} as never);

        expect(json).toEqual({release: "8.2"});
        expect(text).toBe("plain-text");
    });

    it("waits for task completion and resolves merged logs", async () => {
        const client = new Client({
            baseUrl: "https://pve.local",
            apiToken: "token",
            fetch: vi.fn(),
        });

        let call = 0;
        vi.spyOn(client, "request").mockImplementation(async (path) => {
            if (String(path).endsWith("/status")) {
                call += 1;
                if (call === 1) return {status: "running", exitstatus: undefined} as never;
                return {status: "stopped", exitstatus: "OK"} as never;
            }
            if (call === 1) return [{n: 0, t: "step1"}] as never;
            return [{n: 0, t: "step1"}, {n: 1, t: "done"}] as never;
        });

        const resultPromise = client.task.wait("UPID:node01:anything", async () => undefined, 250);
        await vi.advanceTimersByTimeAsync(300);
        await expect(resultPromise).resolves.toEqual(["step1", "done"]);
    });

    it("fails task.wait when task exit status is not OK", async () => {
        const client = new Client({
            baseUrl: "https://pve.local",
            apiToken: "token",
            fetch: vi.fn(),
        });

        vi.spyOn(client, "request").mockImplementation(async (path) => {
            if (String(path).endsWith("/status")) {
                return {status: "stopped", exitstatus: "ERROR"} as never;
            }
            return [{n: 0, t: "failed"}] as never;
        });

        await expect(client.task.wait("UPID:node01:anything")).rejects.toMatchObject({
            status: "failed",
            logs: ["failed"],
        });
    });

    it("rejects terminal helper for API tokens", () => {
        const client = new Client({
            baseUrl: "https://pve.local",
            apiToken: "token",
            fetch: vi.fn(),
        });

        expect(() => client.helpers.terminal(101)).toThrow(
            "Terminal helper requires username/password auth in Proxmox and is not supported with API tokens."
        );
    });

    it("caches event monitors and can stop all listeners", () => {
        const client = new Client({
            baseUrl: "https://pve.local",
            apiToken: "token",
            fetch: vi.fn(),
        });

        const resources = client.events.resources();
        const tasks = client.events.tasks();

        expect(client.events.resources()).toBe(resources);
        expect(client.events.tasks()).toBe(tasks);

        const resourcesDestroy = vi.spyOn(resources, "destroy");
        const tasksDestroy = vi.spyOn(tasks, "destroy");
        client.events.stopListening();

        expect(resourcesDestroy).toHaveBeenCalledOnce();
        expect(tasksDestroy).toHaveBeenCalledOnce();
    });
});
