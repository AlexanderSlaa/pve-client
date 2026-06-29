import { describe, expect, it, vi } from "vitest";
import { Client } from "../../index";

function makeClient() {
    return new Client({ baseUrl: "https://pve.local", apiToken: "token", fetch: vi.fn() });
}

describe("Cluster factory", () => {
    it("keeps selected cluster helpers strongly typed", () => {
        const client = makeClient();

        if (false) {
            void client.api.cluster.sdn.dry_run.get({ $query: { node: "pve1" } });
            void client.api.cluster.sdn.route_maps.entries.route_map("rm1").entry(10).get();
            void client.api.cluster.backup.create_job({ $body: { compress: "zstd", mode: "snapshot" } });
            void client.api.cluster.backup.create_job({ $body: { all: 1, enabled: 0 } });

            // @ts-expect-error dry-run requires the node query.
            void client.api.cluster.sdn.dry_run.get();
            // @ts-expect-error route-map entry order is numeric in the generated API map.
            void client.api.cluster.sdn.route_maps.entries.route_map("rm1").entry("10");
            // @ts-expect-error backup compression is a constrained Proxmox enum.
            void client.api.cluster.backup.create_job({ $body: { compress: "zip" } });
            // @ts-expect-error Proxmox boolean fields accept boolean, 0, or 1, but not arbitrary numbers.
            void client.api.cluster.backup.create_job({ $body: { all: 2 } });
        }
    });

    it("nextid → GET /cluster/nextid", async () => {
        const client = makeClient();
        const spy = vi.spyOn(client, "request").mockResolvedValue(101 as never);
        await client.api.cluster.nextid();
        expect(spy).toHaveBeenCalledWith("/cluster/nextid", "GET", expect.anything());
    });

    it("index → GET /cluster", async () => {
        const client = makeClient();
        const spy = vi.spyOn(client, "request").mockResolvedValue([] as never);
        await client.api.cluster.index();
        expect(spy).toHaveBeenCalledWith("/cluster", "GET", expect.anything());
    });

    it("status → GET /cluster/status", async () => {
        const client = makeClient();
        const spy = vi.spyOn(client, "request").mockResolvedValue([] as never);
        await client.api.cluster.status();
        expect(spy).toHaveBeenCalledWith("/cluster/status", "GET", expect.anything());
    });

    it("resources.resources → GET /cluster/resources with query", async () => {
        const client = makeClient();
        const spy = vi.spyOn(client, "request").mockResolvedValue([] as never);
        await client.api.cluster.resources.resources({ $query: { type: "vm" } } as never);
        expect(spy).toHaveBeenCalledWith("/cluster/resources", "GET", expect.objectContaining({ $query: { type: "vm" } }));
    });

    it("acme.index → GET /cluster/acme", async () => {
        const client = makeClient();
        const spy = vi.spyOn(client, "request").mockResolvedValue({} as never);
        await client.api.cluster.acme.index();
        expect(spy).toHaveBeenCalledWith("/cluster/acme", "GET", expect.anything());
    });

    it("acme.account.index → GET /cluster/acme/account", async () => {
        const client = makeClient();
        const spy = vi.spyOn(client, "request").mockResolvedValue([] as never);
        await client.api.cluster.acme.account.index();
        expect(spy).toHaveBeenCalledWith("/cluster/acme/account", "GET", expect.anything());
    });

    it("acme.account.name(x).get → GET /cluster/acme/account/{name}", async () => {
        const client = makeClient();
        const spy = vi.spyOn(client, "request").mockResolvedValue({} as never);
        await client.api.cluster.acme.account.name("myacct").get();
        expect(spy).toHaveBeenCalledWith("/cluster/acme/account/{name}", "GET",
            expect.objectContaining({ $path: { name: "myacct" } }));
    });

    it("acme.plugins.options.index → GET /cluster/acme/plugins", async () => {
        const client = makeClient();
        const spy = vi.spyOn(client, "request").mockResolvedValue([] as never);
        await client.api.cluster.acme.plugins.options.index();
        expect(spy).toHaveBeenCalledWith("/cluster/acme/plugins", "GET", expect.anything());
    });

    it("backup.index → GET /cluster/backup", async () => {
        const client = makeClient();
        const spy = vi.spyOn(client, "request").mockResolvedValue([] as never);
        await client.api.cluster.backup.index();
        expect(spy).toHaveBeenCalledWith("/cluster/backup", "GET", expect.anything());
    });

    it("backup.job(id).read → GET /cluster/backup/{id}", async () => {
        const client = makeClient();
        const spy = vi.spyOn(client, "request").mockResolvedValue({} as never);
        await client.api.cluster.backup.job("backup-001").read();
        expect(spy).toHaveBeenCalledWith("/cluster/backup/{id}", "GET",
            expect.objectContaining({ $path: { id: "backup-001" } }));
    });

    it("ceph.index → GET /cluster/ceph", async () => {
        const client = makeClient();
        const spy = vi.spyOn(client, "request").mockResolvedValue({} as never);
        await client.api.cluster.ceph.index();
        expect(spy).toHaveBeenCalledWith("/cluster/ceph", "GET", expect.anything());
    });

    it("ceph.flags.get_all → GET /cluster/ceph/flags", async () => {
        const client = makeClient();
        const spy = vi.spyOn(client, "request").mockResolvedValue([] as never);
        await client.api.cluster.ceph.flags.get_all();
        expect(spy).toHaveBeenCalledWith("/cluster/ceph/flags", "GET", expect.anything());
    });

    it("firewall.index → GET /cluster/firewall", async () => {
        const client = makeClient();
        const spy = vi.spyOn(client, "request").mockResolvedValue({} as never);
        await client.api.cluster.firewall.index();
        expect(spy).toHaveBeenCalledWith("/cluster/firewall", "GET", expect.anything());
    });

    it("firewall.rules.index → GET /cluster/firewall/rules", async () => {
        const client = makeClient();
        const spy = vi.spyOn(client, "request").mockResolvedValue([] as never);
        await client.api.cluster.firewall.rules.index();
        expect(spy).toHaveBeenCalledWith("/cluster/firewall/rules", "GET", expect.anything());
    });

    it("firewall.groups.index → GET /cluster/firewall/groups", async () => {
        const client = makeClient();
        const spy = vi.spyOn(client, "request").mockResolvedValue([] as never);
        await client.api.cluster.firewall.groups.index();
        expect(spy).toHaveBeenCalledWith("/cluster/firewall/groups", "GET", expect.anything());
    });

    it("ha.index → GET /cluster/ha", async () => {
        const client = makeClient();
        const spy = vi.spyOn(client, "request").mockResolvedValue({} as never);
        await client.api.cluster.ha.index();
        expect(spy).toHaveBeenCalledWith("/cluster/ha", "GET", expect.anything());
    });

    it("ha.resources.index → GET /cluster/ha/resources", async () => {
        const client = makeClient();
        const spy = vi.spyOn(client, "request").mockResolvedValue([] as never);
        await client.api.cluster.ha.resources.index();
        expect(spy).toHaveBeenCalledWith("/cluster/ha/resources", "GET", expect.anything());
    });

    it("ha.groups.index → GET /cluster/ha/groups", async () => {
        const client = makeClient();
        const spy = vi.spyOn(client, "request").mockResolvedValue([] as never);
        await client.api.cluster.ha.groups.index();
        expect(spy).toHaveBeenCalledWith("/cluster/ha/groups", "GET", expect.anything());
    });

    it("ha.status.current → GET /cluster/ha/status/current", async () => {
        const client = makeClient();
        const spy = vi.spyOn(client, "request").mockResolvedValue({} as never);
        await client.api.cluster.ha.status.current();
        expect(spy).toHaveBeenCalledWith("/cluster/ha/status/current", "GET", expect.anything());
    });

    it("config.index → GET /cluster/config", async () => {
        const client = makeClient();
        const spy = vi.spyOn(client, "request").mockResolvedValue({} as never);
        await client.api.cluster.config.index();
        expect(spy).toHaveBeenCalledWith("/cluster/config", "GET", expect.anything());
    });

    it("config.nodes.index → GET /cluster/config/nodes", async () => {
        const client = makeClient();
        const spy = vi.spyOn(client, "request").mockResolvedValue([] as never);
        await client.api.cluster.config.nodes.index();
        expect(spy).toHaveBeenCalledWith("/cluster/config/nodes", "GET", expect.anything());
    });

    it("replication.index → GET /cluster/replication", async () => {
        const client = makeClient();
        const spy = vi.spyOn(client, "request").mockResolvedValue([] as never);
        await client.api.cluster.replication.index();
        expect(spy).toHaveBeenCalledWith("/cluster/replication", "GET", expect.anything());
    });

    it("replication.id(x).read → GET /cluster/replication/{id}", async () => {
        const client = makeClient();
        const spy = vi.spyOn(client, "request").mockResolvedValue({} as never);
        await client.api.cluster.replication.id("100-0").read();
        expect(spy).toHaveBeenCalledWith("/cluster/replication/{id}", "GET",
            expect.objectContaining({ $path: { id: "100-0" } }));
    });

    it("sdn.index → GET /cluster/sdn", async () => {
        const client = makeClient();
        const spy = vi.spyOn(client, "request").mockResolvedValue({} as never);
        await client.api.cluster.sdn.index();
        expect(spy).toHaveBeenCalledWith("/cluster/sdn", "GET", expect.anything());
    });

    it("options.get_options → GET /cluster/options", async () => {
        const client = makeClient();
        const spy = vi.spyOn(client, "request").mockResolvedValue({} as never);
        await client.api.cluster.options.get_options();
        expect(spy).toHaveBeenCalledWith("/cluster/options", "GET", expect.anything());
    });

    it("options.set_options → PUT /cluster/options", async () => {
        const client = makeClient();
        const spy = vi.spyOn(client, "request").mockResolvedValue(null as never);
        await client.api.cluster.options.set_options({ $body: { keyboard: "en-us" } } as never);
        expect(spy).toHaveBeenCalledWith("/cluster/options", "PUT", expect.anything());
    });

    it("mapping.index → GET /cluster/mapping", async () => {
        const client = makeClient();
        const spy = vi.spyOn(client, "request").mockResolvedValue({} as never);
        await client.api.cluster.mapping.index();
        expect(spy).toHaveBeenCalledWith("/cluster/mapping", "GET", expect.anything());
    });

    it("metrics.server.index → GET /cluster/metrics/server", async () => {
        const client = makeClient();
        const spy = vi.spyOn(client, "request").mockResolvedValue([] as never);
        await client.api.cluster.metrics.server.index();
        expect(spy).toHaveBeenCalledWith("/cluster/metrics/server", "GET", expect.anything());
    });

    it("notifications.index → GET /cluster/notifications", async () => {
        const client = makeClient();
        const spy = vi.spyOn(client, "request").mockResolvedValue({} as never);
        await client.api.cluster.notifications.index();
        expect(spy).toHaveBeenCalledWith("/cluster/notifications", "GET", expect.anything());
    });

    it("jobs.realm_sync.index → GET /cluster/jobs/realm-sync", async () => {
        const client = makeClient();
        const spy = vi.spyOn(client, "request").mockResolvedValue([] as never);
        await client.api.cluster.jobs.realm_sync.index();
        expect(spy).toHaveBeenCalledWith("/cluster/jobs/realm-sync", "GET", expect.anything());
    });
});
