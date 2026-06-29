import { describe, expect, it, vi } from "vitest";
import { Client } from "../../index";
import type { NodesAPI } from "./types";

function makeClient() {
    return new Client({ baseUrl: "https://pve.local", apiToken: "token", fetch: vi.fn() });
}

describe("Nodes factory", () => {
    it("keeps selected node helpers typed", () => {
        const client = makeClient();

        if (false) {
            const status: Promise<NodesAPI["/nodes/{node}/status"]["GET"]["return"]> =
                client.api.nodes.get("pve1").status.get();
            void status;
            void client.request("/nodes/{node}/qemu", "POST", {
                $path: { node: "pve1" },
                $body: { vmid: 200, start: 1, protection: 0 },
            });

            // @ts-expect-error direct generated request boolean fields accept boolean, 0, or 1, but not arbitrary numbers.
            void client.request("/nodes/{node}/qemu", "POST", {
                $path: { node: "pve1" },
                $body: { vmid: 200, start: 2 },
            });
        }
    });

    it("list → GET /nodes", async () => {
        const client = makeClient();
        const spy = vi.spyOn(client, "request").mockResolvedValue([] as never);
        await client.api.nodes.list();
        expect(spy).toHaveBeenCalledWith("/nodes", "GET", {});
    });

    it("get(node).tasks.list → GET /nodes/{node}/tasks", async () => {
        const client = makeClient();
        const spy = vi.spyOn(client, "request").mockResolvedValue([] as never);
        await client.api.nodes.get("pve1").tasks.list();
        expect(spy).toHaveBeenCalledWith("/nodes/{node}/tasks", "GET",
            expect.objectContaining({ $path: { node: "pve1" } }));
    });

    it("get(node).qemu.create pre-binds node", async () => {
        const client = makeClient();
        const spy = vi.spyOn(client, "request").mockResolvedValue("UPID:test" as never);
        await client.api.nodes.get("pve1").qemu.create({ $body: { vmid: 200 } } as never);
        expect(spy).toHaveBeenCalledWith("/nodes/{node}/qemu", "POST",
            expect.objectContaining({ $path: { node: "pve1" }, $body: { vmid: 200 } }));
    });

    it("get(node).lxc.create pre-binds node", async () => {
        const client = makeClient();
        const spy = vi.spyOn(client, "request").mockResolvedValue("UPID:test" as never);
        await client.api.nodes.get("pve1").lxc.create({ $body: { ostemplate: "local:vztmpl/debian.tar.zst", vmid: 100 } } as never);
        expect(spy).toHaveBeenCalledWith("/nodes/{node}/lxc", "POST",
            expect.objectContaining({ $path: { node: "pve1" } }));
    });

    it("get(node).qemu.vmid.destroy → DELETE /nodes/{node}/qemu/{vmid}", async () => {
        const client = makeClient();
        const spy = vi.spyOn(client, "request").mockResolvedValue(null as never);
        await client.api.nodes.get("pve1").qemu.vmid(100).destroy();
        expect(spy).toHaveBeenCalledWith("/nodes/{node}/qemu/{vmid}", "DELETE",
            expect.objectContaining({ $path: { node: "pve1", vmid: 100 } }));
    });

    it("get(node).qemu.vmid.diridx → GET /nodes/{node}/qemu/{vmid}", async () => {
        const client = makeClient();
        const spy = vi.spyOn(client, "request").mockResolvedValue({} as never);
        await client.api.nodes.get("pve1").qemu.vmid(100).diridx();
        expect(spy).toHaveBeenCalledWith("/nodes/{node}/qemu/{vmid}", "GET",
            expect.objectContaining({ $path: { node: "pve1", vmid: 100 } }));
    });

    it("get(node).qemu.vmid.agent.index → GET /nodes/{node}/qemu/{vmid}/agent", async () => {
        const client = makeClient();
        const spy = vi.spyOn(client, "request").mockResolvedValue({} as never);
        await client.api.nodes.get("pve1").qemu.vmid(100).agent.index();
        expect(spy).toHaveBeenCalledWith("/nodes/{node}/qemu/{vmid}/agent", "GET",
            expect.objectContaining({ $path: { node: "pve1", vmid: 100 } }));
    });

    it("get(node).qemu.vmid.config.get → GET /nodes/{node}/qemu/{vmid}/config", async () => {
        const client = makeClient();
        const spy = vi.spyOn(client, "request").mockResolvedValue({} as never);
        await client.api.nodes.get("pve1").qemu.vmid(100).config.get();
        expect(spy).toHaveBeenCalledWith("/nodes/{node}/qemu/{vmid}/config", "GET",
            expect.objectContaining({ $path: { node: "pve1", vmid: 100 } }));
    });

    it("get(node).qemu.vmid.config.update_async → POST /nodes/{node}/qemu/{vmid}/config", async () => {
        const client = makeClient();
        const spy = vi.spyOn(client, "request").mockResolvedValue("UPID" as never);
        await client.api.nodes.get("pve1").qemu.vmid(100).config.update_async({ $body: { memory: "2048" } } as never);
        expect(spy).toHaveBeenCalledWith("/nodes/{node}/qemu/{vmid}/config", "POST",
            expect.objectContaining({ $path: { node: "pve1", vmid: 100 } }));
    });

    it("get(node).qemu.vmid.config.update → PUT /nodes/{node}/qemu/{vmid}/config", async () => {
        const client = makeClient();
        const spy = vi.spyOn(client, "request").mockResolvedValue(null as never);
        await client.api.nodes.get("pve1").qemu.vmid(100).config.update({ $body: { name: "myvm" } } as never);
        expect(spy).toHaveBeenCalledWith("/nodes/{node}/qemu/{vmid}/config", "PUT",
            expect.objectContaining({ $path: { node: "pve1", vmid: 100 } }));
    });

    it("get(node).qemu.vmid.status.current → GET /nodes/{node}/qemu/{vmid}/status/current", async () => {
        const client = makeClient();
        const spy = vi.spyOn(client, "request").mockResolvedValue({} as never);
        await client.api.nodes.get("pve1").qemu.vmid(100).status.current();
        expect(spy).toHaveBeenCalledWith("/nodes/{node}/qemu/{vmid}/status/current", "GET",
            expect.objectContaining({ $path: { node: "pve1", vmid: 100 } }));
    });

    it("get(node).qemu.vmid.termproxy → POST /nodes/{node}/qemu/{vmid}/termproxy", async () => {
        const client = makeClient();
        const spy = vi.spyOn(client, "request").mockResolvedValue({} as never);
        await client.api.nodes.get("pve1").qemu.vmid(100).termproxy();
        expect(spy).toHaveBeenCalledWith("/nodes/{node}/qemu/{vmid}/termproxy", "POST",
            expect.objectContaining({ $path: { node: "pve1", vmid: 100 } }));
    });

    it("get(node).qemu.vmid.vncproxy → POST /nodes/{node}/qemu/{vmid}/vncproxy", async () => {
        const client = makeClient();
        const spy = vi.spyOn(client, "request").mockResolvedValue({} as never);
        await client.api.nodes.get("pve1").qemu.vmid(100).vncproxy();
        expect(spy).toHaveBeenCalledWith("/nodes/{node}/qemu/{vmid}/vncproxy", "POST",
            expect.objectContaining({ $path: { node: "pve1", vmid: 100 } }));
    });

    it("get(node).qemu.vmid.vncwebsocket → GET /nodes/{node}/qemu/{vmid}/vncwebsocket", async () => {
        const client = makeClient();
        const spy = vi.spyOn(client, "request").mockResolvedValue({} as never);
        await client.api.nodes.get("pve1").qemu.vmid(100).vncwebsocket({ $query: { port: 5900, vncticket: "t" } } as never);
        expect(spy).toHaveBeenCalledWith("/nodes/{node}/qemu/{vmid}/vncwebsocket", "GET",
            expect.objectContaining({ $path: { node: "pve1", vmid: 100 } }));
    });

    it("get(node).lxc.id.destroy → DELETE /nodes/{node}/lxc/{vmid}", async () => {
        const client = makeClient();
        const spy = vi.spyOn(client, "request").mockResolvedValue(null as never);
        await client.api.nodes.get("pve1").lxc.id(100).destroy();
        expect(spy).toHaveBeenCalledWith("/nodes/{node}/lxc/{vmid}", "DELETE",
            expect.objectContaining({ $path: { node: "pve1", vmid: 100 } }));
    });

    it("get(node).lxc.id.diridx → GET /nodes/{node}/lxc/{vmid}", async () => {
        const client = makeClient();
        const spy = vi.spyOn(client, "request").mockResolvedValue({} as never);
        await client.api.nodes.get("pve1").lxc.id(100).diridx();
        expect(spy).toHaveBeenCalledWith("/nodes/{node}/lxc/{vmid}", "GET",
            expect.objectContaining({ $path: { node: "pve1", vmid: 100 } }));
    });

    it("get(node).lxc.id.config.update → PUT /nodes/{node}/lxc/{vmid}/config", async () => {
        const client = makeClient();
        const spy = vi.spyOn(client, "request").mockResolvedValue(null as never);
        await client.api.nodes.get("pve1").lxc.id(100).config.update({ $body: { memory: 1024 } } as never);
        expect(spy).toHaveBeenCalledWith("/nodes/{node}/lxc/{vmid}/config", "PUT",
            expect.objectContaining({ $path: { node: "pve1", vmid: 100 } }));
    });

    it("get(node).lxc.id.status.current → GET /nodes/{node}/lxc/{vmid}/status/current", async () => {
        const client = makeClient();
        const spy = vi.spyOn(client, "request").mockResolvedValue({} as never);
        await client.api.nodes.get("pve1").lxc.id(100).status.current();
        expect(spy).toHaveBeenCalledWith("/nodes/{node}/lxc/{vmid}/status/current", "GET",
            expect.objectContaining({ $path: { node: "pve1", vmid: 100 } }));
    });

    it("get(node).lxc.id.termproxy → POST /nodes/{node}/lxc/{vmid}/termproxy", async () => {
        const client = makeClient();
        const spy = vi.spyOn(client, "request").mockResolvedValue({} as never);
        await client.api.nodes.get("pve1").lxc.id(100).termproxy();
        expect(spy).toHaveBeenCalledWith("/nodes/{node}/lxc/{vmid}/termproxy", "POST",
            expect.objectContaining({ $path: { node: "pve1", vmid: 100 } }));
    });

    it("get(node).lxc.id.vncproxy → POST /nodes/{node}/lxc/{vmid}/vncproxy", async () => {
        const client = makeClient();
        const spy = vi.spyOn(client, "request").mockResolvedValue({} as never);
        await client.api.nodes.get("pve1").lxc.id(100).vncproxy();
        expect(spy).toHaveBeenCalledWith("/nodes/{node}/lxc/{vmid}/vncproxy", "POST",
            expect.objectContaining({ $path: { node: "pve1", vmid: 100 } }));
    });

    it("get(node).lxc.id.vncwebsocket → GET /nodes/{node}/lxc/{vmid}/vncwebsocket", async () => {
        const client = makeClient();
        const spy = vi.spyOn(client, "request").mockResolvedValue({} as never);
        await client.api.nodes.get("pve1").lxc.id(100).vncwebsocket({ $query: { port: 5900, vncticket: "t" } } as never);
        expect(spy).toHaveBeenCalledWith("/nodes/{node}/lxc/{vmid}/vncwebsocket", "GET",
            expect.objectContaining({ $path: { node: "pve1", vmid: 100 } }));
    });

    it("get(node).storage exposes nodeStorageFactory", async () => {
        const client = makeClient();
        const spy = vi.spyOn(client, "request").mockResolvedValue([] as never);
        await client.api.nodes.get("pve1").storage.list();
        expect(spy).toHaveBeenCalledWith("/nodes/{node}/storage", "GET",
            expect.objectContaining({ $path: { node: "pve1" } }));
    });
});
