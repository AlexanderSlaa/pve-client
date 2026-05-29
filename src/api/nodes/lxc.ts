// Factory for /nodes/{node}/lxc endpoints
import { Client } from "../../index";
import type { NodesAPI } from "./types";
import type { ArgsTuple, PathContext } from "../index";

type N = NodesAPI;
type R<P extends keyof N, M extends keyof N[P]> =
    N[P][M] extends { parameters: infer X } ? X : never;

export default function lxcFactory(client: Client) {
    return {
        list: (node: string, ...a: ArgsTuple<R<"/nodes/{node}/lxc", "GET">>) =>
            client.request("/nodes/{node}/lxc", "GET", { $path: { node }, ...(a[0] as any) }),

        create: (node: string, ...a: ArgsTuple<R<"/nodes/{node}/lxc", "POST">>) =>
            client.request("/nodes/{node}/lxc", "POST", { $path: { node }, ...(a[0] as any) } as any),

        get: (node: string, vmid: number, ...a: ArgsTuple<PathContext<R<"/nodes/{node}/lxc/{vmid}", "GET">>>) =>
            client.request("/nodes/{node}/lxc/{vmid}", "GET", { ...((a[0]) as any), $path: { node, vmid } }),

        delete: (node: string, vmid: number, ...a: ArgsTuple<PathContext<R<"/nodes/{node}/lxc/{vmid}", "DELETE">>>) =>
            client.request("/nodes/{node}/lxc/{vmid}", "DELETE", { ...((a[0]) as any), $path: { node, vmid } }),

        clone: (node: string, vmid: number, ...a: ArgsTuple<PathContext<R<"/nodes/{node}/lxc/{vmid}/clone", "POST">>>) =>
            client.request("/nodes/{node}/lxc/{vmid}/clone", "POST", { ...((a[0]) as any), $path: { node, vmid } }),

        interfaces: (node: string, vmid: number) =>
            client.request("/nodes/{node}/lxc/{vmid}/interfaces", "GET", { $path: { node, vmid } } as any),

        migrate: (node: string, vmid: number, ...a: ArgsTuple<PathContext<R<"/nodes/{node}/lxc/{vmid}/migrate", "POST">>>) =>
            client.request("/nodes/{node}/lxc/{vmid}/migrate", "POST", { ...((a[0]) as any), $path: { node, vmid } }),

        move_volume: (node: string, vmid: number, ...a: ArgsTuple<PathContext<R<"/nodes/{node}/lxc/{vmid}/move_volume", "POST">>>) =>
            client.request("/nodes/{node}/lxc/{vmid}/move_volume", "POST", { ...((a[0]) as any), $path: { node, vmid } }),

        resize: (node: string, vmid: number, ...a: ArgsTuple<PathContext<R<"/nodes/{node}/lxc/{vmid}/resize", "PUT">>>) =>
            client.request("/nodes/{node}/lxc/{vmid}/resize", "PUT", { ...((a[0]) as any), $path: { node, vmid } }),

        template: (node: string, vmid: number) =>
            client.request("/nodes/{node}/lxc/{vmid}/template", "POST", { $path: { node, vmid } } as any),

        feature: (node: string, vmid: number, ...a: ArgsTuple<PathContext<R<"/nodes/{node}/lxc/{vmid}/feature", "GET">>>) =>
            client.request("/nodes/{node}/lxc/{vmid}/feature", "GET", { ...((a[0]) as any), $path: { node, vmid } }),

        pending: (node: string, vmid: number) =>
            client.request("/nodes/{node}/lxc/{vmid}/pending", "GET", { $path: { node, vmid } } as any),

        rrd: (node: string, vmid: number, ...a: ArgsTuple<PathContext<R<"/nodes/{node}/lxc/{vmid}/rrd", "GET">>>) =>
            client.request("/nodes/{node}/lxc/{vmid}/rrd", "GET", { ...((a[0]) as any), $path: { node, vmid } }),

        rrddata: (node: string, vmid: number, ...a: ArgsTuple<PathContext<R<"/nodes/{node}/lxc/{vmid}/rrddata", "GET">>>) =>
            client.request("/nodes/{node}/lxc/{vmid}/rrddata", "GET", { ...((a[0]) as any), $path: { node, vmid } }),

        spiceproxy: (node: string, vmid: number, ...a: ArgsTuple<PathContext<R<"/nodes/{node}/lxc/{vmid}/spiceproxy", "POST">>>) =>
            client.request("/nodes/{node}/lxc/{vmid}/spiceproxy", "POST", { ...((a[0]) as any), $path: { node, vmid } }),

        termproxy: (node: string, vmid: number, ...a: ArgsTuple<PathContext<R<"/nodes/{node}/lxc/{vmid}/termproxy", "POST">>>) =>
            client.request("/nodes/{node}/lxc/{vmid}/termproxy", "POST", { ...((a[0]) as any), $path: { node, vmid } }),

        vncproxy: (node: string, vmid: number, ...a: ArgsTuple<PathContext<R<"/nodes/{node}/lxc/{vmid}/vncproxy", "POST">>>) =>
            client.request("/nodes/{node}/lxc/{vmid}/vncproxy", "POST", { ...((a[0]) as any), $path: { node, vmid } }),

        vncwebsocket: (node: string, vmid: number, ...a: ArgsTuple<PathContext<R<"/nodes/{node}/lxc/{vmid}/vncwebsocket", "GET">>>) =>
            client.request("/nodes/{node}/lxc/{vmid}/vncwebsocket", "GET", { ...((a[0]) as any), $path: { node, vmid } }),

        config: {
            get: (node: string, vmid: number, ...a: ArgsTuple<PathContext<R<"/nodes/{node}/lxc/{vmid}/config", "GET">>>) =>
                client.request("/nodes/{node}/lxc/{vmid}/config", "GET", { ...((a[0]) as any), $path: { node, vmid } }),
            put: (node: string, vmid: number, ...a: ArgsTuple<PathContext<R<"/nodes/{node}/lxc/{vmid}/config", "PUT">>>) =>
                client.request("/nodes/{node}/lxc/{vmid}/config", "PUT", { ...((a[0]) as any), $path: { node, vmid } }),
        },

        firewall: {
            get:  (node: string, vmid: number) => client.request("/nodes/{node}/lxc/{vmid}/firewall", "GET", { $path: { node, vmid } } as any),
            log:  (node: string, vmid: number, ...a: ArgsTuple<PathContext<R<"/nodes/{node}/lxc/{vmid}/firewall/log",  "GET">>>) =>
                client.request("/nodes/{node}/lxc/{vmid}/firewall/log",  "GET", { ...((a[0]) as any), $path: { node, vmid } }),
            refs: (node: string, vmid: number, ...a: ArgsTuple<PathContext<R<"/nodes/{node}/lxc/{vmid}/firewall/refs", "GET">>>) =>
                client.request("/nodes/{node}/lxc/{vmid}/firewall/refs", "GET", { ...((a[0]) as any), $path: { node, vmid } }),
            options: {
                get: (node: string, vmid: number) => client.request("/nodes/{node}/lxc/{vmid}/firewall/options", "GET", { $path: { node, vmid } } as any),
                set: (node: string, vmid: number, ...a: ArgsTuple<PathContext<R<"/nodes/{node}/lxc/{vmid}/firewall/options", "PUT">>>) =>
                    client.request("/nodes/{node}/lxc/{vmid}/firewall/options", "PUT", { ...((a[0]) as any), $path: { node, vmid } }),
            },
            aliases: {
                list:   (node: string, vmid: number) => client.request("/nodes/{node}/lxc/{vmid}/firewall/aliases", "GET",  { $path: { node, vmid } } as any),
                create: (node: string, vmid: number, ...a: ArgsTuple<PathContext<R<"/nodes/{node}/lxc/{vmid}/firewall/aliases", "POST">>>) =>
                    client.request("/nodes/{node}/lxc/{vmid}/firewall/aliases", "POST", { ...((a[0]) as any), $path: { node, vmid } }),
                name: (node: string, vmid: number, name: string) => ({
                    get:    () => client.request("/nodes/{node}/lxc/{vmid}/firewall/aliases/{name}", "GET",    { $path: { node, vmid, name } } as any),
                    update: (...a: ArgsTuple<PathContext<R<"/nodes/{node}/lxc/{vmid}/firewall/aliases/{name}", "PUT">>>) =>
                        client.request("/nodes/{node}/lxc/{vmid}/firewall/aliases/{name}", "PUT",    { ...((a[0]) as any), $path: { node, vmid, name } }),
                    delete: () => client.request("/nodes/{node}/lxc/{vmid}/firewall/aliases/{name}", "DELETE", { $path: { node, vmid, name } } as any),
                }),
            },
            ipset: {
                list:   (node: string, vmid: number) => client.request("/nodes/{node}/lxc/{vmid}/firewall/ipset", "GET",  { $path: { node, vmid } } as any),
                create: (node: string, vmid: number, ...a: ArgsTuple<PathContext<R<"/nodes/{node}/lxc/{vmid}/firewall/ipset", "POST">>>) =>
                    client.request("/nodes/{node}/lxc/{vmid}/firewall/ipset", "POST", { ...((a[0]) as any), $path: { node, vmid } }),
                name: (node: string, vmid: number, name: string) => ({
                    list:   () => client.request("/nodes/{node}/lxc/{vmid}/firewall/ipset/{name}", "GET",    { $path: { node, vmid, name } } as any),
                    add:    (...a: ArgsTuple<PathContext<R<"/nodes/{node}/lxc/{vmid}/firewall/ipset/{name}", "POST">>>) =>
                        client.request("/nodes/{node}/lxc/{vmid}/firewall/ipset/{name}", "POST",   { ...((a[0]) as any), $path: { node, vmid, name } }),
                    delete: () => client.request("/nodes/{node}/lxc/{vmid}/firewall/ipset/{name}", "DELETE", { $path: { node, vmid, name } } as any),
                    cidr: (cidr: string) => ({
                        get:    () => client.request("/nodes/{node}/lxc/{vmid}/firewall/ipset/{name}/{cidr}", "GET",    { $path: { node, vmid, name, cidr } } as any),
                        update: (...a: ArgsTuple<PathContext<R<"/nodes/{node}/lxc/{vmid}/firewall/ipset/{name}/{cidr}", "PUT">>>) =>
                            client.request("/nodes/{node}/lxc/{vmid}/firewall/ipset/{name}/{cidr}", "PUT",    { ...((a[0]) as any), $path: { node, vmid, name, cidr } }),
                        delete: () => client.request("/nodes/{node}/lxc/{vmid}/firewall/ipset/{name}/{cidr}", "DELETE", { $path: { node, vmid, name, cidr } } as any),
                    }),
                }),
            },
            rules: {
                list:   (node: string, vmid: number) => client.request("/nodes/{node}/lxc/{vmid}/firewall/rules", "GET",  { $path: { node, vmid } } as any),
                create: (node: string, vmid: number, ...a: ArgsTuple<PathContext<R<"/nodes/{node}/lxc/{vmid}/firewall/rules", "POST">>>) =>
                    client.request("/nodes/{node}/lxc/{vmid}/firewall/rules", "POST", { ...((a[0]) as any), $path: { node, vmid } }),
                pos: (node: string, vmid: number, pos: number) => ({
                    get:    () => client.request("/nodes/{node}/lxc/{vmid}/firewall/rules/{pos}", "GET",    { $path: { node, vmid, pos } } as any),
                    update: (...a: ArgsTuple<PathContext<R<"/nodes/{node}/lxc/{vmid}/firewall/rules/{pos}", "PUT">>>) =>
                        client.request("/nodes/{node}/lxc/{vmid}/firewall/rules/{pos}", "PUT",    { ...((a[0]) as any), $path: { node, vmid, pos } }),
                    delete: (...a: ArgsTuple<PathContext<R<"/nodes/{node}/lxc/{vmid}/firewall/rules/{pos}", "DELETE">>>) =>
                        client.request("/nodes/{node}/lxc/{vmid}/firewall/rules/{pos}", "DELETE", { ...((a[0]) as any), $path: { node, vmid, pos } }),
                }),
            },
        },

        snapshot: {
            list:   (node: string, vmid: number) => client.request("/nodes/{node}/lxc/{vmid}/snapshot", "GET", { $path: { node, vmid } } as any),
            create: (node: string, vmid: number, ...a: ArgsTuple<PathContext<R<"/nodes/{node}/lxc/{vmid}/snapshot", "POST">>>) =>
                client.request("/nodes/{node}/lxc/{vmid}/snapshot", "POST", { ...((a[0]) as any), $path: { node, vmid } }),
            snapname: (node: string, vmid: number, snapname: string) => ({
                get:    () => client.request("/nodes/{node}/lxc/{vmid}/snapshot/{snapname}", "GET",    { $path: { node, vmid, snapname } } as any),
                delete: () => client.request("/nodes/{node}/lxc/{vmid}/snapshot/{snapname}", "DELETE", { $path: { node, vmid, snapname } } as any),
                config: {
                    get:    () => client.request("/nodes/{node}/lxc/{vmid}/snapshot/{snapname}/config", "GET", { $path: { node, vmid, snapname } } as any),
                    update: (...a: ArgsTuple<PathContext<R<"/nodes/{node}/lxc/{vmid}/snapshot/{snapname}/config", "PUT">>>) =>
                        client.request("/nodes/{node}/lxc/{vmid}/snapshot/{snapname}/config", "PUT", { ...((a[0]) as any), $path: { node, vmid, snapname } }),
                },
                rollback: (...a: ArgsTuple<PathContext<R<"/nodes/{node}/lxc/{vmid}/snapshot/{snapname}/rollback", "POST">>>) =>
                    client.request("/nodes/{node}/lxc/{vmid}/snapshot/{snapname}/rollback", "POST", { ...((a[0]) as any), $path: { node, vmid, snapname } }),
            }),
        },

        status: {
            current:  (node: string, vmid: number) => client.request("/nodes/{node}/lxc/{vmid}/status/current",  "GET",  { $path: { node, vmid } } as any),
            start:    (node: string, vmid: number, ...a: ArgsTuple<PathContext<R<"/nodes/{node}/lxc/{vmid}/status/start",    "POST">>>) => client.request("/nodes/{node}/lxc/{vmid}/status/start",    "POST", { ...((a[0]) as any), $path: { node, vmid } }),
            stop:     (node: string, vmid: number, ...a: ArgsTuple<PathContext<R<"/nodes/{node}/lxc/{vmid}/status/stop",     "POST">>>) => client.request("/nodes/{node}/lxc/{vmid}/status/stop",     "POST", { ...((a[0]) as any), $path: { node, vmid } }),
            reboot:   (node: string, vmid: number, ...a: ArgsTuple<PathContext<R<"/nodes/{node}/lxc/{vmid}/status/reboot",   "POST">>>) => client.request("/nodes/{node}/lxc/{vmid}/status/reboot",   "POST", { ...((a[0]) as any), $path: { node, vmid } }),
            resume:   (node: string, vmid: number, ...a: ArgsTuple<PathContext<R<"/nodes/{node}/lxc/{vmid}/status/resume",   "POST">>>) => client.request("/nodes/{node}/lxc/{vmid}/status/resume",   "POST", { ...((a[0]) as any), $path: { node, vmid } }),
            shutdown: (node: string, vmid: number, ...a: ArgsTuple<PathContext<R<"/nodes/{node}/lxc/{vmid}/status/shutdown", "POST">>>) => client.request("/nodes/{node}/lxc/{vmid}/status/shutdown", "POST", { ...((a[0]) as any), $path: { node, vmid } }),
            suspend:  (node: string, vmid: number, ...a: ArgsTuple<PathContext<R<"/nodes/{node}/lxc/{vmid}/status/suspend",  "POST">>>) => client.request("/nodes/{node}/lxc/{vmid}/status/suspend",  "POST", { ...((a[0]) as any), $path: { node, vmid } }),
        },
    };
}
