import type { Client } from "../../index.js";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type A = any;

export default function sdnFactory(client: Client) {
    const r = (path: string, method: string, args?: A) =>
        (client.request as A)(path, method, args ?? {});

    return {
        index:  (args?: A) => r("/cluster/sdn", "GET",  args),
        reload: (args?: A) => r("/cluster/sdn", "PUT",  args),

        controllers: {
            index:  (args?: A) => r("/cluster/sdn/controllers", "GET",  args),
            create: (args?: A) => r("/cluster/sdn/controllers", "POST", args),
            controller: (controller: string) => ({
                get:    (args?: A) => r("/cluster/sdn/controllers/{controller}", "GET",    { ...args, $path: { controller } }),
                update: (args?: A) => r("/cluster/sdn/controllers/{controller}", "PUT",    { ...args, $path: { controller } }),
                delete: (args?: A) => r("/cluster/sdn/controllers/{controller}", "DELETE", { ...args, $path: { controller } }),
            }),
        },

        dns: {
            index:  (args?: A) => r("/cluster/sdn/dns", "GET",  args),
            create: (args?: A) => r("/cluster/sdn/dns", "POST", args),
            dns: (dns: string) => ({
                get:    (args?: A) => r("/cluster/sdn/dns/{dns}", "GET",    { ...args, $path: { dns } }),
                update: (args?: A) => r("/cluster/sdn/dns/{dns}", "PUT",    { ...args, $path: { dns } }),
                delete: (args?: A) => r("/cluster/sdn/dns/{dns}", "DELETE", { ...args, $path: { dns } }),
            }),
        },

        dry_run: { get: () => r("/cluster/sdn/dry-run", "GET") },

        fabrics: {
            index: () => r("/cluster/sdn/fabrics", "GET"),
            all:   { index: () => r("/cluster/sdn/fabrics/all", "GET") },
            fabric: {
                index:  (args?: A) => r("/cluster/sdn/fabrics/fabric", "GET",  args),
                create: (args?: A) => r("/cluster/sdn/fabrics/fabric", "POST", args),
                id: (id: string) => ({
                    get:    (args?: A) => r("/cluster/sdn/fabrics/fabric/{id}", "GET",    { ...args, $path: { id } }),
                    update: (args?: A) => r("/cluster/sdn/fabrics/fabric/{id}", "PUT",    { ...args, $path: { id } }),
                    delete: (args?: A) => r("/cluster/sdn/fabrics/fabric/{id}", "DELETE", { ...args, $path: { id } }),
                }),
            },
            node: {
                index: () => (client.request as any)("/cluster/sdn/fabrics/node", "GET", {}),
                fabric_id: (fabric_id: string) => ({
                    index:  (args?: A) => r("/cluster/sdn/fabrics/node/{fabric_id}", "GET",  { ...args, $path: { fabric_id } }),
                    create: (args?: A) => r("/cluster/sdn/fabrics/node/{fabric_id}", "POST", { ...args, $path: { fabric_id } }),
                    node_id: (node_id: string) => ({
                        get:    (args?: A) => r("/cluster/sdn/fabrics/node/{fabric_id}/{node_id}", "GET",    { ...args, $path: { fabric_id, node_id } }),
                        update: (args?: A) => r("/cluster/sdn/fabrics/node/{fabric_id}/{node_id}", "PUT",    { ...args, $path: { fabric_id, node_id } }),
                        delete: (args?: A) => r("/cluster/sdn/fabrics/node/{fabric_id}/{node_id}", "DELETE", { ...args, $path: { fabric_id, node_id } }),
                    }),
                }),
            },
        },

        ipams: {
            index:  (args?: A) => r("/cluster/sdn/ipams", "GET",  args),
            create: (args?: A) => r("/cluster/sdn/ipams", "POST", args),
            ipam: (ipam: string) => ({
                get:    (args?: A) => r("/cluster/sdn/ipams/{ipam}", "GET",    { ...args, $path: { ipam } }),
                update: (args?: A) => r("/cluster/sdn/ipams/{ipam}", "PUT",    { ...args, $path: { ipam } }),
                delete: (args?: A) => r("/cluster/sdn/ipams/{ipam}", "DELETE", { ...args, $path: { ipam } }),
                status: ()         => r("/cluster/sdn/ipams/{ipam}/status", "GET", { $path: { ipam } }),
            }),
        },

        lock:     { create: () => r("/cluster/sdn/lock", "POST") },
        rollback: { create: () => r("/cluster/sdn/rollback", "POST") },

        prefix_lists: {
            index:  (args?: A) => r("/cluster/sdn/prefix-lists", "GET",  args),
            create: (args?: A) => r("/cluster/sdn/prefix-lists", "POST", args),
            id: (id: string) => ({
                get:    (args?: A) => r("/cluster/sdn/prefix-lists/{id}", "GET",    { ...args, $path: { id } }),
                update: (args?: A) => r("/cluster/sdn/prefix-lists/{id}", "PUT",    { ...args, $path: { id } }),
                delete: (args?: A) => r("/cluster/sdn/prefix-lists/{id}", "DELETE", { ...args, $path: { id } }),
                entries: {
                    index:  (args?: A) => r("/cluster/sdn/prefix-lists/{id}/entries", "GET",  { ...args, $path: { id } }),
                    create: (args?: A) => r("/cluster/sdn/prefix-lists/{id}/entries", "POST", { ...args, $path: { id } }),
                    url_seq: (url_seq: string) => ({
                        get:    (args?: A) => r("/cluster/sdn/prefix-lists/{id}/entries/{url_seq}", "GET",    { ...args, $path: { id, url_seq } }),
                        update: (args?: A) => r("/cluster/sdn/prefix-lists/{id}/entries/{url_seq}", "PUT",    { ...args, $path: { id, url_seq } }),
                        delete: (args?: A) => r("/cluster/sdn/prefix-lists/{id}/entries/{url_seq}", "DELETE", { ...args, $path: { id, url_seq } }),
                    }),
                },
            }),
        },

        route_maps: {
            index: (args?: A) => r("/cluster/sdn/route-maps", "GET", args),
            entries: {
                index:  (args?: A) => r("/cluster/sdn/route-maps/entries", "GET",  args),
                create: (args?: A) => r("/cluster/sdn/route-maps/entries", "POST", args),
                route_map: (route_map_id: string) => ({
                    get: (args?: A) => r("/cluster/sdn/route-maps/entries/{route-map-id}", "GET", { ...args, $path: { "route-map-id": route_map_id } }),
                    entry: (order: string) => ({
                        get:    (args?: A) => r("/cluster/sdn/route-maps/entries/{route-map-id}/entry/{order}", "GET",    { ...args, $path: { "route-map-id": route_map_id, order } }),
                        update: (args?: A) => r("/cluster/sdn/route-maps/entries/{route-map-id}/entry/{order}", "PUT",    { ...args, $path: { "route-map-id": route_map_id, order } }),
                        delete: (args?: A) => r("/cluster/sdn/route-maps/entries/{route-map-id}/entry/{order}", "DELETE", { ...args, $path: { "route-map-id": route_map_id, order } }),
                    }),
                }),
            },
        },

        vnets: {
            index:  (args?: A) => r("/cluster/sdn/vnets", "GET",  args),
            create: (args?: A) => r("/cluster/sdn/vnets", "POST", args),
            vnet: (vnet: string) => ({
                get:    (args?: A) => r("/cluster/sdn/vnets/{vnet}", "GET",    { ...args, $path: { vnet } }),
                update: (args?: A) => r("/cluster/sdn/vnets/{vnet}", "PUT",    { ...args, $path: { vnet } }),
                delete: (args?: A) => r("/cluster/sdn/vnets/{vnet}", "DELETE", { ...args, $path: { vnet } }),
                firewall: {
                    index:   (args?: A) => r("/cluster/sdn/vnets/{vnet}/firewall", "GET", { ...args, $path: { vnet } }),
                    options: {
                        get: (args?: A) => r("/cluster/sdn/vnets/{vnet}/firewall/options", "GET", { ...args, $path: { vnet } }),
                        set: (args?: A) => r("/cluster/sdn/vnets/{vnet}/firewall/options", "PUT", { ...args, $path: { vnet } }),
                    },
                    rules: {
                        index:  (args?: A) => r("/cluster/sdn/vnets/{vnet}/firewall/rules", "GET",  { ...args, $path: { vnet } }),
                        create: (args?: A) => r("/cluster/sdn/vnets/{vnet}/firewall/rules", "POST", { ...args, $path: { vnet } }),
                        pos: (pos: number | string) => ({
                            get:    (args?: A) => r("/cluster/sdn/vnets/{vnet}/firewall/rules/{pos}", "GET",    { ...args, $path: { vnet, pos } }),
                            update: (args?: A) => r("/cluster/sdn/vnets/{vnet}/firewall/rules/{pos}", "PUT",    { ...args, $path: { vnet, pos } }),
                            delete: (args?: A) => r("/cluster/sdn/vnets/{vnet}/firewall/rules/{pos}", "DELETE", { ...args, $path: { vnet, pos } }),
                        }),
                    },
                },
                ips: {
                    create: (args?: A) => r("/cluster/sdn/vnets/{vnet}/ips", "POST",   { ...args, $path: { vnet } }),
                    update: (args?: A) => r("/cluster/sdn/vnets/{vnet}/ips", "PUT",    { ...args, $path: { vnet } }),
                    delete: (args?: A) => r("/cluster/sdn/vnets/{vnet}/ips", "DELETE", { ...args, $path: { vnet } }),
                },
                subnets: {
                    index:  (args?: A) => r("/cluster/sdn/vnets/{vnet}/subnets", "GET",  { ...args, $path: { vnet } }),
                    create: (args?: A) => r("/cluster/sdn/vnets/{vnet}/subnets", "POST", { ...args, $path: { vnet } }),
                    subnet: (subnet: string) => ({
                        get:    (args?: A) => r("/cluster/sdn/vnets/{vnet}/subnets/{subnet}", "GET",    { ...args, $path: { vnet, subnet } }),
                        update: (args?: A) => r("/cluster/sdn/vnets/{vnet}/subnets/{subnet}", "PUT",    { ...args, $path: { vnet, subnet } }),
                        delete: (args?: A) => r("/cluster/sdn/vnets/{vnet}/subnets/{subnet}", "DELETE", { ...args, $path: { vnet, subnet } }),
                    }),
                },
            }),
        },

        zones: {
            index:  (args?: A) => r("/cluster/sdn/zones", "GET",  args),
            create: (args?: A) => r("/cluster/sdn/zones", "POST", args),
            zone: (zone: string) => ({
                get:    (args?: A) => r("/cluster/sdn/zones/{zone}", "GET",    { ...args, $path: { zone } }),
                update: (args?: A) => r("/cluster/sdn/zones/{zone}", "PUT",    { ...args, $path: { zone } }),
                delete: (args?: A) => r("/cluster/sdn/zones/{zone}", "DELETE", { ...args, $path: { zone } }),
            }),
        },
    };
}
