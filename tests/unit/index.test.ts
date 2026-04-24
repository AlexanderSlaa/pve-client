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
		) as typeof globalThis.fetch;
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

	it("fails login when ticket response is malformed", async () => {
		const client = new Client({
			baseUrl: "https://pve.local",
			username: "root",
			password: "pass",
			fetch: vi.fn(async () =>
				new Response(JSON.stringify({data: {ticket: "ticket-only"}}), {
					status: 200,
					headers: {"content-type": "application/json"},
				})
			) as typeof fetch,
		});

		await expect(client.login()).rejects.toThrow(
			"Invalid login response: missing ticket or CSRFPreventionToken."
		);
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

	it("throws when path placeholders remain unresolved", async () => {
		const client = new Client({
			baseUrl: "https://pve.local",
			apiToken: "token",
			fetch: vi.fn(),
		});

		await expect(
			client.request("/nodes/{node}/tasks/{upid}/status", "GET", {
				$path: {node: "pve1"},
			} as never)
		).rejects.toThrow("Missing path parameters for /nodes/{node}/tasks/{upid}/status: {upid}");
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

	it("exposes create methods for both lxc and qemu nodes APIs", async () => {
		const client = new Client({
			baseUrl: "https://pve.local",
			apiToken: "token",
			fetch: vi.fn(),
		});
		const requestSpy = vi.spyOn(client, "request").mockResolvedValue("UPID:test" as never);

		await client.api.nodes.get("pve1").lxc.create({
			$body: {ostemplate: "local:vztmpl/debian.tar.zst", vmid: 100},
		} as never);
		await client.api.nodes.get("pve1").qemu.create({
			$body: {vmid: 101},
		} as never);

		expect(requestSpy).toHaveBeenNthCalledWith(
			1,
			"/nodes/{node}/lxc",
			"POST",
			expect.objectContaining({
				$path: {node: "pve1"},
				$body: {ostemplate: "local:vztmpl/debian.tar.zst", vmid: 100},
			})
		);
		expect(requestSpy).toHaveBeenNthCalledWith(
			2,
			"/nodes/{node}/qemu",
			"POST",
			expect.objectContaining({
				$path: {node: "pve1"},
				$body: {vmid: 101},
			})
		);
	});

	it("wires inline lxc node methods to the expected endpoints", async () => {
		const client = new Client({
			baseUrl: "https://pve.local",
			apiToken: "token",
			fetch: vi.fn(),
		});
		const requestSpy = vi.spyOn(client, "request").mockResolvedValue({} as never);
		const lxc = client.api.nodes.get("pve1").lxc.id(100);

		await lxc.destroy({$query: {force: true}} as never);
		await lxc.diridx({} as never);
		await lxc.clone({$body: {newid: 101}} as never);
		await lxc.config.get({$query: {current: true}} as never);
		await lxc.config.update({$body: {memory: 2048}} as never);
		await lxc.interfaces({} as never);
		await lxc.status.current({} as never);
		await lxc.status.start({$body: {debug: true}} as never);
		await lxc.termproxy({} as never);
		await lxc.vncproxy({$body: {websocket: true}} as never);
		await lxc.vncwebsocket({$query: {port: 5900, vncticket: "ticket"}} as never);

		expect(requestSpy).toHaveBeenCalledWith("/nodes/{node}/lxc/{vmid}", "DELETE", expect.objectContaining({
			$path: {node: "pve1", vmid: 100},
		}));
		expect(requestSpy).toHaveBeenCalledWith("/nodes/{node}/lxc/{vmid}", "GET", expect.objectContaining({
			$path: {node: "pve1", vmid: 100},
		}));
		expect(requestSpy).toHaveBeenCalledWith("/nodes/{node}/lxc/{vmid}/clone", "POST", expect.objectContaining({
			$path: {node: "pve1", vmid: 100},
		}));
		expect(requestSpy).toHaveBeenCalledWith("/nodes/{node}/lxc/{vmid}/config", "GET", expect.objectContaining({
			$path: {node: "pve1", vmid: 100},
		}));
		expect(requestSpy).toHaveBeenCalledWith("/nodes/{node}/lxc/{vmid}/config", "PUT", expect.objectContaining({
			$path: {node: "pve1", vmid: 100},
		}));
		expect(requestSpy).toHaveBeenCalledWith("/nodes/{node}/lxc/{vmid}/interfaces", "GET", expect.objectContaining({
			$path: {node: "pve1", vmid: 100},
		}));
		expect(requestSpy).toHaveBeenCalledWith("/nodes/{node}/lxc/{vmid}/status/current", "GET", expect.objectContaining({
			$path: {node: "pve1", vmid: 100},
		}));
		expect(requestSpy).toHaveBeenCalledWith("/nodes/{node}/lxc/{vmid}/status/start", "POST", expect.objectContaining({
			$path: {node: "pve1", vmid: 100},
		}));
		expect(requestSpy).toHaveBeenCalledWith("/nodes/{node}/lxc/{vmid}/termproxy", "POST", expect.objectContaining({
			$path: {node: "pve1", vmid: 100},
		}));
		expect(requestSpy).toHaveBeenCalledWith("/nodes/{node}/lxc/{vmid}/vncproxy", "POST", expect.objectContaining({
			$path: {node: "pve1", vmid: 100},
		}));
		expect(requestSpy).toHaveBeenCalledWith("/nodes/{node}/lxc/{vmid}/vncwebsocket", "GET", expect.objectContaining({
			$path: {node: "pve1", vmid: 100},
		}));
	});

	it("wires inline qemu node methods to the expected endpoints", async () => {
		const client = new Client({
			baseUrl: "https://pve.local",
			apiToken: "token",
			fetch: vi.fn(),
		});
		const requestSpy = vi.spyOn(client, "request").mockResolvedValue({} as never);
		const qemu = client.api.nodes.get("pve1").qemu.vmid(200);

		await qemu.destroy({$query: {purge: true}} as never);
		await qemu.diridx({} as never);
		await qemu.agent.index({} as never);
		await qemu.clone({$body: {newid: 201}} as never);
		await qemu.config.get({} as never);
		await qemu.config.update_async({$body: {memory: "4096"}} as never);
		await qemu.config.update({$body: {name: "vm-200"}} as never);
		await qemu.status.current({} as never);
		await qemu.status.start({$body: {skiplock: true}} as never);
		await qemu.termproxy({$body: {serial: "serial0"}} as never);
		await qemu.vncproxy({$body: {websocket: true}} as never);
		await qemu.vncwebsocket({$query: {port: 5901, vncticket: "ticket"}} as never);

		expect(requestSpy).toHaveBeenCalledWith("/nodes/{node}/qemu/{vmid}", "DELETE", expect.objectContaining({
			$path: {node: "pve1", vmid: 200},
		}));
		expect(requestSpy).toHaveBeenCalledWith("/nodes/{node}/qemu/{vmid}", "GET", expect.objectContaining({
			$path: {node: "pve1", vmid: 200},
		}));
		expect(requestSpy).toHaveBeenCalledWith("/nodes/{node}/qemu/{vmid}/agent", "GET", expect.objectContaining({
			$path: {node: "pve1", vmid: 200},
		}));
		expect(requestSpy).toHaveBeenCalledWith("/nodes/{node}/qemu/{vmid}/clone", "POST", expect.objectContaining({
			$path: {node: "pve1", vmid: 200},
		}));
		expect(requestSpy).toHaveBeenCalledWith("/nodes/{node}/qemu/{vmid}/config", "GET", expect.objectContaining({
			$path: {node: "pve1", vmid: 200},
		}));
		expect(requestSpy).toHaveBeenCalledWith("/nodes/{node}/qemu/{vmid}/config", "POST", expect.objectContaining({
			$path: {node: "pve1", vmid: 200},
		}));
		expect(requestSpy).toHaveBeenCalledWith("/nodes/{node}/qemu/{vmid}/config", "PUT", expect.objectContaining({
			$path: {node: "pve1", vmid: 200},
		}));
		expect(requestSpy).toHaveBeenCalledWith("/nodes/{node}/qemu/{vmid}/status/current", "GET", expect.objectContaining({
			$path: {node: "pve1", vmid: 200},
		}));
		expect(requestSpy).toHaveBeenCalledWith("/nodes/{node}/qemu/{vmid}/status/start", "POST", expect.objectContaining({
			$path: {node: "pve1", vmid: 200},
		}));
		expect(requestSpy).toHaveBeenCalledWith("/nodes/{node}/qemu/{vmid}/termproxy", "POST", expect.objectContaining({
			$path: {node: "pve1", vmid: 200},
		}));
		expect(requestSpy).toHaveBeenCalledWith("/nodes/{node}/qemu/{vmid}/vncproxy", "POST", expect.objectContaining({
			$path: {node: "pve1", vmid: 200},
		}));
		expect(requestSpy).toHaveBeenCalledWith("/nodes/{node}/qemu/{vmid}/vncwebsocket", "GET", expect.objectContaining({
			$path: {node: "pve1", vmid: 200},
		}));
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
