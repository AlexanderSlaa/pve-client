import type { Client } from "../../index";
import type { ArgsTuple } from "../index";
import type { ClusterAPI } from "./types";

type C = ClusterAPI;
type Method<P extends keyof C> = Extract<keyof C[P], "GET" | "POST" | "PUT" | "DELETE" | "PATCH">;
type Params<P extends keyof C, M extends Method<P>> =
    C[P][M] extends { parameters: infer T } ? T : never;
type BoundParams<P extends keyof C, M extends Method<P>> = Omit<Params<P, M>, "$path">;

export default function sdnFactory(client: Client) {
    return {
        index: (...args: ArgsTuple<Params<"/cluster/sdn", "GET">>) =>
            client.request("/cluster/sdn", "GET", args[0] ?? {}),
        reload: (...args: ArgsTuple<Params<"/cluster/sdn", "PUT">>) =>
            client.request("/cluster/sdn", "PUT", args[0] ?? {}),

        controllers: {
            index: (...args: ArgsTuple<Params<"/cluster/sdn/controllers", "GET">>) =>
                client.request("/cluster/sdn/controllers", "GET", args[0] ?? {}),
            create: (...args: ArgsTuple<Params<"/cluster/sdn/controllers", "POST">>) =>
                client.request("/cluster/sdn/controllers", "POST", args[0] ?? {}),
            controller: (controller: string) => ({
                get: (...args: ArgsTuple<BoundParams<"/cluster/sdn/controllers/{controller}", "GET">>) =>
                    client.request("/cluster/sdn/controllers/{controller}", "GET", { ...(args[0] ?? {}), $path: { controller } }),
                update: (...args: ArgsTuple<BoundParams<"/cluster/sdn/controllers/{controller}", "PUT">>) =>
                    client.request("/cluster/sdn/controllers/{controller}", "PUT", { ...(args[0] ?? {}), $path: { controller } }),
                delete: (...args: ArgsTuple<BoundParams<"/cluster/sdn/controllers/{controller}", "DELETE">>) =>
                    client.request("/cluster/sdn/controllers/{controller}", "DELETE", { ...(args[0] ?? {}), $path: { controller } }),
            }),
        },

        dns: {
            index: (...args: ArgsTuple<Params<"/cluster/sdn/dns", "GET">>) =>
                client.request("/cluster/sdn/dns", "GET", args[0] ?? {}),
            create: (...args: ArgsTuple<Params<"/cluster/sdn/dns", "POST">>) =>
                client.request("/cluster/sdn/dns", "POST", args[0] ?? {}),
            dns: (dns: string) => ({
                get: (...args: ArgsTuple<BoundParams<"/cluster/sdn/dns/{dns}", "GET">>) =>
                    client.request("/cluster/sdn/dns/{dns}", "GET", { ...(args[0] ?? {}), $path: { dns } }),
                update: (...args: ArgsTuple<BoundParams<"/cluster/sdn/dns/{dns}", "PUT">>) =>
                    client.request("/cluster/sdn/dns/{dns}", "PUT", { ...(args[0] ?? {}), $path: { dns } }),
                delete: (...args: ArgsTuple<BoundParams<"/cluster/sdn/dns/{dns}", "DELETE">>) =>
                    client.request("/cluster/sdn/dns/{dns}", "DELETE", { ...(args[0] ?? {}), $path: { dns } }),
            }),
        },

        dry_run: {
            get: (...args: ArgsTuple<Params<"/cluster/sdn/dry-run", "GET">>) =>
                client.request("/cluster/sdn/dry-run", "GET", args[0] ?? {}),
        },

        fabrics: {
            index: () => client.request("/cluster/sdn/fabrics", "GET", {}),
            all: { index: () => client.request("/cluster/sdn/fabrics/all", "GET", {}) },
            fabric: {
                index: (...args: ArgsTuple<Params<"/cluster/sdn/fabrics/fabric", "GET">>) =>
                    client.request("/cluster/sdn/fabrics/fabric", "GET", args[0] ?? {}),
                create: (...args: ArgsTuple<Params<"/cluster/sdn/fabrics/fabric", "POST">>) =>
                    client.request("/cluster/sdn/fabrics/fabric", "POST", args[0] ?? {}),
                id: (id: string) => ({
                    get: (...args: ArgsTuple<BoundParams<"/cluster/sdn/fabrics/fabric/{id}", "GET">>) =>
                        client.request("/cluster/sdn/fabrics/fabric/{id}", "GET", { ...(args[0] ?? {}), $path: { id } }),
                    update: (...args: ArgsTuple<BoundParams<"/cluster/sdn/fabrics/fabric/{id}", "PUT">>) =>
                        client.request("/cluster/sdn/fabrics/fabric/{id}", "PUT", { ...(args[0] ?? {}), $path: { id } }),
                    delete: (...args: ArgsTuple<BoundParams<"/cluster/sdn/fabrics/fabric/{id}", "DELETE">>) =>
                        client.request("/cluster/sdn/fabrics/fabric/{id}", "DELETE", { ...(args[0] ?? {}), $path: { id } }),
                }),
            },
            node: {
                index: () => client.request("/cluster/sdn/fabrics/node", "GET", {}),
                fabric_id: (fabric_id: string) => ({
                    index: (...args: ArgsTuple<BoundParams<"/cluster/sdn/fabrics/node/{fabric_id}", "GET">>) =>
                        client.request("/cluster/sdn/fabrics/node/{fabric_id}", "GET", { ...(args[0] ?? {}), $path: { fabric_id } }),
                    create: (...args: ArgsTuple<BoundParams<"/cluster/sdn/fabrics/node/{fabric_id}", "POST">>) =>
                        client.request("/cluster/sdn/fabrics/node/{fabric_id}", "POST", { ...(args[0] ?? {}), $path: { fabric_id } }),
                    node_id: (node_id: string) => ({
                        get: (...args: ArgsTuple<BoundParams<"/cluster/sdn/fabrics/node/{fabric_id}/{node_id}", "GET">>) =>
                            client.request("/cluster/sdn/fabrics/node/{fabric_id}/{node_id}", "GET", { ...(args[0] ?? {}), $path: { fabric_id, node_id } }),
                        update: (...args: ArgsTuple<BoundParams<"/cluster/sdn/fabrics/node/{fabric_id}/{node_id}", "PUT">>) =>
                            client.request("/cluster/sdn/fabrics/node/{fabric_id}/{node_id}", "PUT", { ...(args[0] ?? {}), $path: { fabric_id, node_id } }),
                        delete: (...args: ArgsTuple<BoundParams<"/cluster/sdn/fabrics/node/{fabric_id}/{node_id}", "DELETE">>) =>
                            client.request("/cluster/sdn/fabrics/node/{fabric_id}/{node_id}", "DELETE", { ...(args[0] ?? {}), $path: { fabric_id, node_id } }),
                    }),
                }),
            },
        },

        ipams: {
            index: (...args: ArgsTuple<Params<"/cluster/sdn/ipams", "GET">>) =>
                client.request("/cluster/sdn/ipams", "GET", args[0] ?? {}),
            create: (...args: ArgsTuple<Params<"/cluster/sdn/ipams", "POST">>) =>
                client.request("/cluster/sdn/ipams", "POST", args[0] ?? {}),
            ipam: (ipam: string) => ({
                get: (...args: ArgsTuple<BoundParams<"/cluster/sdn/ipams/{ipam}", "GET">>) =>
                    client.request("/cluster/sdn/ipams/{ipam}", "GET", { ...(args[0] ?? {}), $path: { ipam } }),
                update: (...args: ArgsTuple<BoundParams<"/cluster/sdn/ipams/{ipam}", "PUT">>) =>
                    client.request("/cluster/sdn/ipams/{ipam}", "PUT", { ...(args[0] ?? {}), $path: { ipam } }),
                delete: (...args: ArgsTuple<BoundParams<"/cluster/sdn/ipams/{ipam}", "DELETE">>) =>
                    client.request("/cluster/sdn/ipams/{ipam}", "DELETE", { ...(args[0] ?? {}), $path: { ipam } }),
                status: () => client.request("/cluster/sdn/ipams/{ipam}/status", "GET", { $path: { ipam } }),
            }),
        },

        lock: {
            create: (...args: ArgsTuple<Params<"/cluster/sdn/lock", "POST">>) =>
                client.request("/cluster/sdn/lock", "POST", args[0] ?? {}),
            delete: (...args: ArgsTuple<Params<"/cluster/sdn/lock", "DELETE">>) =>
                client.request("/cluster/sdn/lock", "DELETE", args[0] ?? {}),
        },
        rollback: {
            create: (...args: ArgsTuple<Params<"/cluster/sdn/rollback", "POST">>) =>
                client.request("/cluster/sdn/rollback", "POST", args[0] ?? {}),
        },

        prefix_lists: {
            index: (...args: ArgsTuple<Params<"/cluster/sdn/prefix-lists", "GET">>) =>
                client.request("/cluster/sdn/prefix-lists", "GET", args[0] ?? {}),
            create: (...args: ArgsTuple<Params<"/cluster/sdn/prefix-lists", "POST">>) =>
                client.request("/cluster/sdn/prefix-lists", "POST", args[0] ?? {}),
            id: (id: string) => ({
                get: (...args: ArgsTuple<BoundParams<"/cluster/sdn/prefix-lists/{id}", "GET">>) =>
                    client.request("/cluster/sdn/prefix-lists/{id}", "GET", { ...(args[0] ?? {}), $path: { id } }),
                update: (...args: ArgsTuple<BoundParams<"/cluster/sdn/prefix-lists/{id}", "PUT">>) =>
                    client.request("/cluster/sdn/prefix-lists/{id}", "PUT", { ...(args[0] ?? {}), $path: { id } }),
                delete: (...args: ArgsTuple<BoundParams<"/cluster/sdn/prefix-lists/{id}", "DELETE">>) =>
                    client.request("/cluster/sdn/prefix-lists/{id}", "DELETE", { ...(args[0] ?? {}), $path: { id } }),
                entries: {
                    index: (...args: ArgsTuple<BoundParams<"/cluster/sdn/prefix-lists/{id}/entries", "GET">>) =>
                        client.request("/cluster/sdn/prefix-lists/{id}/entries", "GET", { ...(args[0] ?? {}), $path: { id } }),
                    create: (...args: ArgsTuple<BoundParams<"/cluster/sdn/prefix-lists/{id}/entries", "POST">>) =>
                        client.request("/cluster/sdn/prefix-lists/{id}/entries", "POST", { ...(args[0] ?? {}), $path: { id } }),
                    url_seq: (url_seq: string) => ({
                        get: (...args: ArgsTuple<BoundParams<"/cluster/sdn/prefix-lists/{id}/entries/{url_seq}", "GET">>) =>
                            client.request("/cluster/sdn/prefix-lists/{id}/entries/{url_seq}", "GET", { ...(args[0] ?? {}), $path: { id, url_seq } }),
                        update: (...args: ArgsTuple<BoundParams<"/cluster/sdn/prefix-lists/{id}/entries/{url_seq}", "PUT">>) =>
                            client.request("/cluster/sdn/prefix-lists/{id}/entries/{url_seq}", "PUT", { ...(args[0] ?? {}), $path: { id, url_seq } }),
                        delete: (...args: ArgsTuple<BoundParams<"/cluster/sdn/prefix-lists/{id}/entries/{url_seq}", "DELETE">>) =>
                            client.request("/cluster/sdn/prefix-lists/{id}/entries/{url_seq}", "DELETE", { ...(args[0] ?? {}), $path: { id, url_seq } }),
                    }),
                },
            }),
        },

        route_maps: {
            index: (...args: ArgsTuple<Params<"/cluster/sdn/route-maps", "GET">>) =>
                client.request("/cluster/sdn/route-maps", "GET", args[0] ?? {}),
            entries: {
                index: (...args: ArgsTuple<Params<"/cluster/sdn/route-maps/entries", "GET">>) =>
                    client.request("/cluster/sdn/route-maps/entries", "GET", args[0] ?? {}),
                create: (...args: ArgsTuple<Params<"/cluster/sdn/route-maps/entries", "POST">>) =>
                    client.request("/cluster/sdn/route-maps/entries", "POST", args[0] ?? {}),
                route_map: (route_map_id: string) => ({
                    get: (...args: ArgsTuple<BoundParams<"/cluster/sdn/route-maps/entries/{route-map-id}", "GET">>) =>
                        client.request("/cluster/sdn/route-maps/entries/{route-map-id}", "GET", { ...(args[0] ?? {}), $path: { "route-map-id": route_map_id } }),
                    entry: (order: number) => ({
                        get: (...args: ArgsTuple<BoundParams<"/cluster/sdn/route-maps/entries/{route-map-id}/entry/{order}", "GET">>) =>
                            client.request("/cluster/sdn/route-maps/entries/{route-map-id}/entry/{order}", "GET", { ...(args[0] ?? {}), $path: { "route-map-id": route_map_id, order } }),
                        update: (...args: ArgsTuple<BoundParams<"/cluster/sdn/route-maps/entries/{route-map-id}/entry/{order}", "PUT">>) =>
                            client.request("/cluster/sdn/route-maps/entries/{route-map-id}/entry/{order}", "PUT", { ...(args[0] ?? {}), $path: { "route-map-id": route_map_id, order } }),
                        delete: (...args: ArgsTuple<BoundParams<"/cluster/sdn/route-maps/entries/{route-map-id}/entry/{order}", "DELETE">>) =>
                            client.request("/cluster/sdn/route-maps/entries/{route-map-id}/entry/{order}", "DELETE", { ...(args[0] ?? {}), $path: { "route-map-id": route_map_id, order } }),
                    }),
                }),
            },
        },

        vnets: {
            index: (...args: ArgsTuple<Params<"/cluster/sdn/vnets", "GET">>) =>
                client.request("/cluster/sdn/vnets", "GET", args[0] ?? {}),
            create: (...args: ArgsTuple<Params<"/cluster/sdn/vnets", "POST">>) =>
                client.request("/cluster/sdn/vnets", "POST", args[0] ?? {}),
            vnet: (vnet: string) => ({
                get: (...args: ArgsTuple<BoundParams<"/cluster/sdn/vnets/{vnet}", "GET">>) =>
                    client.request("/cluster/sdn/vnets/{vnet}", "GET", { ...(args[0] ?? {}), $path: { vnet } }),
                update: (...args: ArgsTuple<BoundParams<"/cluster/sdn/vnets/{vnet}", "PUT">>) =>
                    client.request("/cluster/sdn/vnets/{vnet}", "PUT", { ...(args[0] ?? {}), $path: { vnet } }),
                delete: (...args: ArgsTuple<BoundParams<"/cluster/sdn/vnets/{vnet}", "DELETE">>) =>
                    client.request("/cluster/sdn/vnets/{vnet}", "DELETE", { ...(args[0] ?? {}), $path: { vnet } }),
                firewall: {
                    index: (...args: ArgsTuple<BoundParams<"/cluster/sdn/vnets/{vnet}/firewall", "GET">>) =>
                        client.request("/cluster/sdn/vnets/{vnet}/firewall", "GET", { ...(args[0] ?? {}), $path: { vnet } }),
                    options: {
                        get: (...args: ArgsTuple<BoundParams<"/cluster/sdn/vnets/{vnet}/firewall/options", "GET">>) =>
                            client.request("/cluster/sdn/vnets/{vnet}/firewall/options", "GET", { ...(args[0] ?? {}), $path: { vnet } }),
                        set: (...args: ArgsTuple<BoundParams<"/cluster/sdn/vnets/{vnet}/firewall/options", "PUT">>) =>
                            client.request("/cluster/sdn/vnets/{vnet}/firewall/options", "PUT", { ...(args[0] ?? {}), $path: { vnet } }),
                    },
                    rules: {
                        index: (...args: ArgsTuple<BoundParams<"/cluster/sdn/vnets/{vnet}/firewall/rules", "GET">>) =>
                            client.request("/cluster/sdn/vnets/{vnet}/firewall/rules", "GET", { ...(args[0] ?? {}), $path: { vnet } }),
                        create: (...args: ArgsTuple<BoundParams<"/cluster/sdn/vnets/{vnet}/firewall/rules", "POST">>) =>
                            client.request("/cluster/sdn/vnets/{vnet}/firewall/rules", "POST", { ...(args[0] ?? {}), $path: { vnet } }),
                        pos: (pos: number) => ({
                            get: (...args: ArgsTuple<BoundParams<"/cluster/sdn/vnets/{vnet}/firewall/rules/{pos}", "GET">>) =>
                                client.request("/cluster/sdn/vnets/{vnet}/firewall/rules/{pos}", "GET", { ...(args[0] ?? {}), $path: { vnet, pos } }),
                            update: (...args: ArgsTuple<BoundParams<"/cluster/sdn/vnets/{vnet}/firewall/rules/{pos}", "PUT">>) =>
                                client.request("/cluster/sdn/vnets/{vnet}/firewall/rules/{pos}", "PUT", { ...(args[0] ?? {}), $path: { vnet, pos } }),
                            delete: (...args: ArgsTuple<BoundParams<"/cluster/sdn/vnets/{vnet}/firewall/rules/{pos}", "DELETE">>) =>
                                client.request("/cluster/sdn/vnets/{vnet}/firewall/rules/{pos}", "DELETE", { ...(args[0] ?? {}), $path: { vnet, pos } }),
                        }),
                    },
                },
                ips: {
                    create: (...args: ArgsTuple<BoundParams<"/cluster/sdn/vnets/{vnet}/ips", "POST">>) =>
                        client.request("/cluster/sdn/vnets/{vnet}/ips", "POST", { ...(args[0] ?? {}), $path: { vnet } }),
                    update: (...args: ArgsTuple<BoundParams<"/cluster/sdn/vnets/{vnet}/ips", "PUT">>) =>
                        client.request("/cluster/sdn/vnets/{vnet}/ips", "PUT", { ...(args[0] ?? {}), $path: { vnet } }),
                    delete: (...args: ArgsTuple<BoundParams<"/cluster/sdn/vnets/{vnet}/ips", "DELETE">>) =>
                        client.request("/cluster/sdn/vnets/{vnet}/ips", "DELETE", { ...(args[0] ?? {}), $path: { vnet } }),
                },
                subnets: {
                    index: (...args: ArgsTuple<BoundParams<"/cluster/sdn/vnets/{vnet}/subnets", "GET">>) =>
                        client.request("/cluster/sdn/vnets/{vnet}/subnets", "GET", { ...(args[0] ?? {}), $path: { vnet } }),
                    create: (...args: ArgsTuple<BoundParams<"/cluster/sdn/vnets/{vnet}/subnets", "POST">>) =>
                        client.request("/cluster/sdn/vnets/{vnet}/subnets", "POST", { ...(args[0] ?? {}), $path: { vnet } }),
                    subnet: (subnet: string) => ({
                        get: (...args: ArgsTuple<BoundParams<"/cluster/sdn/vnets/{vnet}/subnets/{subnet}", "GET">>) =>
                            client.request("/cluster/sdn/vnets/{vnet}/subnets/{subnet}", "GET", { ...(args[0] ?? {}), $path: { vnet, subnet } }),
                        update: (...args: ArgsTuple<BoundParams<"/cluster/sdn/vnets/{vnet}/subnets/{subnet}", "PUT">>) =>
                            client.request("/cluster/sdn/vnets/{vnet}/subnets/{subnet}", "PUT", { ...(args[0] ?? {}), $path: { vnet, subnet } }),
                        delete: (...args: ArgsTuple<BoundParams<"/cluster/sdn/vnets/{vnet}/subnets/{subnet}", "DELETE">>) =>
                            client.request("/cluster/sdn/vnets/{vnet}/subnets/{subnet}", "DELETE", { ...(args[0] ?? {}), $path: { vnet, subnet } }),
                    }),
                },
            }),
        },

        zones: {
            index: (...args: ArgsTuple<Params<"/cluster/sdn/zones", "GET">>) =>
                client.request("/cluster/sdn/zones", "GET", args[0] ?? {}),
            create: (...args: ArgsTuple<Params<"/cluster/sdn/zones", "POST">>) =>
                client.request("/cluster/sdn/zones", "POST", args[0] ?? {}),
            zone: (zone: string) => ({
                get: (...args: ArgsTuple<BoundParams<"/cluster/sdn/zones/{zone}", "GET">>) =>
                    client.request("/cluster/sdn/zones/{zone}", "GET", { ...(args[0] ?? {}), $path: { zone } }),
                update: (...args: ArgsTuple<BoundParams<"/cluster/sdn/zones/{zone}", "PUT">>) =>
                    client.request("/cluster/sdn/zones/{zone}", "PUT", { ...(args[0] ?? {}), $path: { zone } }),
                delete: (...args: ArgsTuple<BoundParams<"/cluster/sdn/zones/{zone}", "DELETE">>) =>
                    client.request("/cluster/sdn/zones/{zone}", "DELETE", { ...(args[0] ?? {}), $path: { zone } }),
            }),
        },
    };
}
