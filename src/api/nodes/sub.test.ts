/**
 * Tests for node sub-factories: apt, ceph, disks, firewall, hardware, storage
 */
import { describe, expect, it, vi } from "vitest";
import aptFactory from "./apt";
import cephFactory from "./ceph";
import disksFactory from "./disks";
import firewallFactory from "./firewall";
import hardwareFactory from "./hardware";
import nodeStorageFactory from "./storage";
import { Client } from "../../index";

function makeClient() {
    return new Client({ baseUrl: "https://pve.local", apiToken: "token", fetch: vi.fn() });
}

describe("aptFactory", () => {
    it("index → GET /nodes/{node}/apt", async () => {
        const client = makeClient();
        const spy = vi.spyOn(client, "request").mockResolvedValue([] as never);
        const api = aptFactory(client);
        await api.index("pve1");
        expect(spy).toHaveBeenCalledWith("/nodes/{node}/apt", "GET",
            expect.objectContaining({ $path: { node: "pve1" } }));
    });

    it("changelog → GET /nodes/{node}/apt/changelog", async () => {
        const client = makeClient();
        const spy = vi.spyOn(client, "request").mockResolvedValue("" as never);
        const api = aptFactory(client);
        await api.changelog("pve1", { $query: { name: "openssh-server" } } as never);
        expect(spy).toHaveBeenCalledWith("/nodes/{node}/apt/changelog", "GET",
            expect.objectContaining({ $path: { node: "pve1" } }));
    });
});

describe("cephFactory", () => {
    it("index → GET /nodes/{node}/ceph", async () => {
        const client = makeClient();
        const spy = vi.spyOn(client, "request").mockResolvedValue({} as never);
        const api = cephFactory(client);
        await api.index("pve1");
        expect(spy).toHaveBeenCalledWith("/nodes/{node}/ceph", "GET",
            expect.objectContaining({ $path: { node: "pve1" } }));
    });

    it("cfg → GET /nodes/{node}/ceph/cfg", async () => {
        const client = makeClient();
        const spy = vi.spyOn(client, "request").mockResolvedValue({} as never);
        const api = cephFactory(client);
        await api.cfg("pve1");
        expect(spy).toHaveBeenCalledWith("/nodes/{node}/ceph/cfg", "GET",
            expect.objectContaining({ $path: { node: "pve1" } }));
    });
});

describe("disksFactory", () => {
    it("list → GET /nodes/{node}/disks/list", async () => {
        const client = makeClient();
        const spy = vi.spyOn(client, "request").mockResolvedValue([] as never);
        const api = disksFactory(client);
        await api.list("pve1");
        expect(spy).toHaveBeenCalledWith("/nodes/{node}/disks", "GET",
            expect.objectContaining({ $path: { node: "pve1" } }));
    });
});

describe("firewallFactory", () => {
    it("get → GET /nodes/{node}/firewall", async () => {
        const client = makeClient();
        const spy = vi.spyOn(client, "request").mockResolvedValue({} as never);
        const api = firewallFactory(client);
        await api.get("pve1");
        expect(spy).toHaveBeenCalledWith("/nodes/{node}/firewall", "GET",
            expect.objectContaining({ $path: { node: "pve1" } }));
    });
});

describe("hardwareFactory", () => {
    it("get → GET /nodes/{node}/hardware", async () => {
        const client = makeClient();
        const spy = vi.spyOn(client, "request").mockResolvedValue([] as never);
        const api = hardwareFactory(client);
        await api.get("pve1");
        expect(spy).toHaveBeenCalledWith("/nodes/{node}/hardware", "GET",
            expect.objectContaining({ $path: { node: "pve1" } }));
    });

    it("pci.get → GET /nodes/{node}/hardware/pci", async () => {
        const client = makeClient();
        const spy = vi.spyOn(client, "request").mockResolvedValue([] as never);
        const api = hardwareFactory(client);
        await api.pci.get("pve1");
        expect(spy).toHaveBeenCalledWith("/nodes/{node}/hardware/pci", "GET",
            expect.objectContaining({ $path: { node: "pve1" } }));
    });

    it("usb.get → GET /nodes/{node}/hardware/usb", async () => {
        const client = makeClient();
        const spy = vi.spyOn(client, "request").mockResolvedValue([] as never);
        const api = hardwareFactory(client);
        await api.usb.get("pve1");
        expect(spy).toHaveBeenCalledWith("/nodes/{node}/hardware/usb", "GET",
            expect.objectContaining({ $path: { node: "pve1" } }));
    });
});

describe("nodeStorageFactory", () => {
    it("list → GET /nodes/{node}/storage", async () => {
        const client = makeClient();
        const spy = vi.spyOn(client, "request").mockResolvedValue([] as never);
        const api = nodeStorageFactory(client, "pve1");
        await api.list();
        expect(spy).toHaveBeenCalledWith("/nodes/{node}/storage", "GET",
            expect.objectContaining({ $path: { node: "pve1" } }));
    });

    it("get(storage).content.list → GET /nodes/{node}/storage/{storage}/content", async () => {
        const client = makeClient();
        const spy = vi.spyOn(client, "request").mockResolvedValue([] as never);
        const api = nodeStorageFactory(client, "pve1");
        await api.get("local").content.list();
        expect(spy).toHaveBeenCalledWith("/nodes/{node}/storage/{storage}/content", "GET",
            expect.objectContaining({ $path: { node: "pve1", storage: "local" } }));
    });

    it("get(storage).content.list with query", async () => {
        const client = makeClient();
        const spy = vi.spyOn(client, "request").mockResolvedValue([] as never);
        const api = nodeStorageFactory(client, "pve1");
        await api.get("local").content.list({ $query: { content: "vztmpl" } } as never);
        expect(spy).toHaveBeenCalledWith("/nodes/{node}/storage/{storage}/content", "GET",
            expect.objectContaining({ $query: { content: "vztmpl" } }));
    });
});
