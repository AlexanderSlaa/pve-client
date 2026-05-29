// Factory for /nodes/{node}/qemu endpoints
import { Client } from "../../index";
import type { NodesAPI } from "./types";
import type { ArgsTuple, PathContext } from "../index";

function sp<T extends { $path?: any }>(o: T | undefined): Omit<T, '$path'> | undefined {
    if (!o) return o;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { $path, ...rest } = o as any;
    return rest;
}

type Q = NodesAPI;
type R<P extends keyof Q, M extends keyof Q[P]> =
    Q[P][M] extends { parameters: infer X } ? X : never;

export default function qemuFactory(client: Client) {
    return {
        list: (node: string, ...a: ArgsTuple<R<"/nodes/{node}/qemu", "GET">>) =>
            client.request("/nodes/{node}/qemu", "GET", { $path: { node }, ...sp(a[0]) } as any),

        create: (node: string, ...a: ArgsTuple<R<"/nodes/{node}/qemu", "POST">>) =>
            client.request("/nodes/{node}/qemu", "POST", { $path: { node }, ...sp(a[0]) } as any),

        get: (node: string, vmid: number, ...a: ArgsTuple<PathContext<R<"/nodes/{node}/qemu/{vmid}", "GET">>>) =>
            client.request("/nodes/{node}/qemu/{vmid}", "GET", { ...((a[0]) as any), $path: { node, vmid } }),

        delete: (node: string, vmid: number, ...a: ArgsTuple<PathContext<R<"/nodes/{node}/qemu/{vmid}", "DELETE">>>) =>
            client.request("/nodes/{node}/qemu/{vmid}", "DELETE", { ...((a[0]) as any), $path: { node, vmid } }),

        clone: (node: string, vmid: number, ...a: ArgsTuple<PathContext<R<"/nodes/{node}/qemu/{vmid}/clone", "POST">>>) =>
            client.request("/nodes/{node}/qemu/{vmid}/clone", "POST", { ...((a[0]) as any), $path: { node, vmid } }),

        migrate: (node: string, vmid: number, ...a: ArgsTuple<PathContext<R<"/nodes/{node}/qemu/{vmid}/migrate", "POST">>>) =>
            client.request("/nodes/{node}/qemu/{vmid}/migrate", "POST", { ...((a[0]) as any), $path: { node, vmid } }),

        feature: (node: string, vmid: number, ...a: ArgsTuple<PathContext<R<"/nodes/{node}/qemu/{vmid}/feature", "GET">>>) =>
            client.request("/nodes/{node}/qemu/{vmid}/feature", "GET", { ...((a[0]) as any), $path: { node, vmid } }),

        pending: (node: string, vmid: number) =>
            client.request("/nodes/{node}/qemu/{vmid}/pending", "GET", { $path: { node, vmid } } as any),

        template: (node: string, vmid: number, ...a: ArgsTuple<PathContext<R<"/nodes/{node}/qemu/{vmid}/template", "POST">>>) =>
            client.request("/nodes/{node}/qemu/{vmid}/template", "POST", { ...((a[0]) as any), $path: { node, vmid } }),

        resize: (node: string, vmid: number, ...a: ArgsTuple<PathContext<R<"/nodes/{node}/qemu/{vmid}/resize", "PUT">>>) =>
            client.request("/nodes/{node}/qemu/{vmid}/resize", "PUT", { ...((a[0]) as any), $path: { node, vmid } }),

        move_disk: (node: string, vmid: number, ...a: ArgsTuple<PathContext<R<"/nodes/{node}/qemu/{vmid}/move_disk", "POST">>>) =>
            client.request("/nodes/{node}/qemu/{vmid}/move_disk", "POST", { ...((a[0]) as any), $path: { node, vmid } }),

        unlink: (node: string, vmid: number, ...a: ArgsTuple<PathContext<R<"/nodes/{node}/qemu/{vmid}/unlink", "PUT">>>) =>
            client.request("/nodes/{node}/qemu/{vmid}/unlink", "PUT", { ...((a[0]) as any), $path: { node, vmid } }),

        sendkey: (node: string, vmid: number, ...a: ArgsTuple<PathContext<R<"/nodes/{node}/qemu/{vmid}/sendkey", "PUT">>>) =>
            client.request("/nodes/{node}/qemu/{vmid}/sendkey", "PUT", { ...((a[0]) as any), $path: { node, vmid } }),

        monitor: (node: string, vmid: number, ...a: ArgsTuple<PathContext<R<"/nodes/{node}/qemu/{vmid}/monitor", "POST">>>) =>
            client.request("/nodes/{node}/qemu/{vmid}/monitor", "POST", { ...((a[0]) as any), $path: { node, vmid } }),

        rrd: (node: string, vmid: number, ...a: ArgsTuple<PathContext<R<"/nodes/{node}/qemu/{vmid}/rrd", "GET">>>) =>
            client.request("/nodes/{node}/qemu/{vmid}/rrd", "GET", { ...((a[0]) as any), $path: { node, vmid } }),

        rrddata: (node: string, vmid: number, ...a: ArgsTuple<PathContext<R<"/nodes/{node}/qemu/{vmid}/rrddata", "GET">>>) =>
            client.request("/nodes/{node}/qemu/{vmid}/rrddata", "GET", { ...((a[0]) as any), $path: { node, vmid } }),

        spiceproxy: (node: string, vmid: number, ...a: ArgsTuple<PathContext<R<"/nodes/{node}/qemu/{vmid}/spiceproxy", "POST">>>) =>
            client.request("/nodes/{node}/qemu/{vmid}/spiceproxy", "POST", { ...((a[0]) as any), $path: { node, vmid } }),

        termproxy: (node: string, vmid: number, ...a: ArgsTuple<PathContext<R<"/nodes/{node}/qemu/{vmid}/termproxy", "POST">>>) =>
            client.request("/nodes/{node}/qemu/{vmid}/termproxy", "POST", { ...((a[0]) as any), $path: { node, vmid } }),

        vncproxy: (node: string, vmid: number, ...a: ArgsTuple<PathContext<R<"/nodes/{node}/qemu/{vmid}/vncproxy", "POST">>>) =>
            client.request("/nodes/{node}/qemu/{vmid}/vncproxy", "POST", { ...((a[0]) as any), $path: { node, vmid } }),

        vncwebsocket: (node: string, vmid: number, ...a: ArgsTuple<PathContext<R<"/nodes/{node}/qemu/{vmid}/vncwebsocket", "GET">>>) =>
            client.request("/nodes/{node}/qemu/{vmid}/vncwebsocket", "GET", { ...((a[0]) as any), $path: { node, vmid } }),

        // Agent sub-commands
        agent: (node: string, vmid: number, ...a: ArgsTuple<PathContext<R<"/nodes/{node}/qemu/{vmid}/agent", "GET">>>) =>
            client.request("/nodes/{node}/qemu/{vmid}/agent", "GET", { ...((a[0]) as any), $path: { node, vmid } }),

        agent_exec: (node: string, vmid: number, ...a: ArgsTuple<PathContext<R<"/nodes/{node}/qemu/{vmid}/agent/exec", "POST">>>) =>
            client.request("/nodes/{node}/qemu/{vmid}/agent/exec", "POST", { ...((a[0]) as any), $path: { node, vmid } }),

        agent_exec_status: (node: string, vmid: number, ...a: ArgsTuple<PathContext<R<"/nodes/{node}/qemu/{vmid}/agent/exec-status", "GET">>>) =>
            client.request("/nodes/{node}/qemu/{vmid}/agent/exec-status", "GET", { ...((a[0]) as any), $path: { node, vmid } }),

        agent_file_read: (node: string, vmid: number, ...a: ArgsTuple<PathContext<R<"/nodes/{node}/qemu/{vmid}/agent/file-read", "GET">>>) =>
            client.request("/nodes/{node}/qemu/{vmid}/agent/file-read", "GET", { ...((a[0]) as any), $path: { node, vmid } }),

        agent_file_write: (node: string, vmid: number, ...a: ArgsTuple<PathContext<R<"/nodes/{node}/qemu/{vmid}/agent/file-write", "POST">>>) =>
            client.request("/nodes/{node}/qemu/{vmid}/agent/file-write", "POST", { ...((a[0]) as any), $path: { node, vmid } }),

        agent_get_fsinfo:             (node: string, vmid: number) => client.request("/nodes/{node}/qemu/{vmid}/agent/get-fsinfo",             "GET",  { $path: { node, vmid } } as any),
        agent_get_host_name:          (node: string, vmid: number) => client.request("/nodes/{node}/qemu/{vmid}/agent/get-host-name",          "GET",  { $path: { node, vmid } } as any),
        agent_get_memory_block_info:  (node: string, vmid: number) => client.request("/nodes/{node}/qemu/{vmid}/agent/get-memory-block-info",  "GET",  { $path: { node, vmid } } as any),
        agent_get_memory_blocks:      (node: string, vmid: number) => client.request("/nodes/{node}/qemu/{vmid}/agent/get-memory-blocks",      "GET",  { $path: { node, vmid } } as any),
        agent_get_osinfo:             (node: string, vmid: number) => client.request("/nodes/{node}/qemu/{vmid}/agent/get-osinfo",             "GET",  { $path: { node, vmid } } as any),
        agent_get_time:               (node: string, vmid: number) => client.request("/nodes/{node}/qemu/{vmid}/agent/get-time",               "GET",  { $path: { node, vmid } } as any),
        agent_get_timezone:           (node: string, vmid: number) => client.request("/nodes/{node}/qemu/{vmid}/agent/get-timezone",           "GET",  { $path: { node, vmid } } as any),
        agent_get_users:              (node: string, vmid: number) => client.request("/nodes/{node}/qemu/{vmid}/agent/get-users",              "GET",  { $path: { node, vmid } } as any),
        agent_get_vcpus:              (node: string, vmid: number) => client.request("/nodes/{node}/qemu/{vmid}/agent/get-vcpus",              "GET",  { $path: { node, vmid } } as any),
        agent_info:                   (node: string, vmid: number) => client.request("/nodes/{node}/qemu/{vmid}/agent/info",                   "GET",  { $path: { node, vmid } } as any),
        agent_network_interfaces:     (node: string, vmid: number) => client.request("/nodes/{node}/qemu/{vmid}/agent/network-get-interfaces", "GET",  { $path: { node, vmid } } as any),
        agent_ping:                   (node: string, vmid: number) => client.request("/nodes/{node}/qemu/{vmid}/agent/ping",                   "POST", { $path: { node, vmid } } as any),
        agent_fstrim:                 (node: string, vmid: number) => client.request("/nodes/{node}/qemu/{vmid}/agent/fstrim",                 "POST", { $path: { node, vmid } } as any),
        agent_fsfreeze_freeze:        (node: string, vmid: number) => client.request("/nodes/{node}/qemu/{vmid}/agent/fsfreeze-freeze",        "POST", { $path: { node, vmid } } as any),
        agent_fsfreeze_status:        (node: string, vmid: number) => client.request("/nodes/{node}/qemu/{vmid}/agent/fsfreeze-status",        "POST", { $path: { node, vmid } } as any),
        agent_fsfreeze_thaw:          (node: string, vmid: number) => client.request("/nodes/{node}/qemu/{vmid}/agent/fsfreeze-thaw",          "POST", { $path: { node, vmid } } as any),
        agent_shutdown:               (node: string, vmid: number) => client.request("/nodes/{node}/qemu/{vmid}/agent/shutdown",               "POST", { $path: { node, vmid } } as any),
        agent_suspend_disk:           (node: string, vmid: number) => client.request("/nodes/{node}/qemu/{vmid}/agent/suspend-disk",           "POST", { $path: { node, vmid } } as any),
        agent_suspend_hybrid:         (node: string, vmid: number) => client.request("/nodes/{node}/qemu/{vmid}/agent/suspend-hybrid",         "POST", { $path: { node, vmid } } as any),
        agent_suspend_ram:            (node: string, vmid: number) => client.request("/nodes/{node}/qemu/{vmid}/agent/suspend-ram",            "POST", { $path: { node, vmid } } as any),

        agent_set_user_password: (node: string, vmid: number, ...a: ArgsTuple<PathContext<R<"/nodes/{node}/qemu/{vmid}/agent/set-user-password", "POST">>>) =>
            client.request("/nodes/{node}/qemu/{vmid}/agent/set-user-password", "POST", { ...((a[0]) as any), $path: { node, vmid } }),

        cloudinit: {
            get:    (node: string, vmid: number) => client.request("/nodes/{node}/qemu/{vmid}/cloudinit", "GET", { $path: { node, vmid } } as any),
            update: (node: string, vmid: number, ...a: ArgsTuple<PathContext<R<"/nodes/{node}/qemu/{vmid}/cloudinit", "PUT">>>) =>
                client.request("/nodes/{node}/qemu/{vmid}/cloudinit", "PUT", { ...((a[0]) as any), $path: { node, vmid } }),
            dump:   (node: string, vmid: number, ...a: ArgsTuple<PathContext<R<"/nodes/{node}/qemu/{vmid}/cloudinit/dump", "GET">>>) =>
                client.request("/nodes/{node}/qemu/{vmid}/cloudinit/dump", "GET", { ...((a[0]) as any), $path: { node, vmid } }),
        },

        config: {
            get:  (node: string, vmid: number, ...a: ArgsTuple<PathContext<R<"/nodes/{node}/qemu/{vmid}/config", "GET">>>) =>
                client.request("/nodes/{node}/qemu/{vmid}/config", "GET",  { ...((a[0]) as any), $path: { node, vmid } }),
            post: (node: string, vmid: number, ...a: ArgsTuple<PathContext<R<"/nodes/{node}/qemu/{vmid}/config", "POST">>>) =>
                client.request("/nodes/{node}/qemu/{vmid}/config", "POST", { ...((a[0]) as any), $path: { node, vmid } }),
            put:  (node: string, vmid: number, ...a: ArgsTuple<PathContext<R<"/nodes/{node}/qemu/{vmid}/config", "PUT">>>) =>
                client.request("/nodes/{node}/qemu/{vmid}/config", "PUT",  { ...((a[0]) as any), $path: { node, vmid } }),
        },

        firewall: {
            get:  (node: string, vmid: number) => client.request("/nodes/{node}/qemu/{vmid}/firewall", "GET", { $path: { node, vmid } } as any),
            log:  (node: string, vmid: number, ...a: ArgsTuple<PathContext<R<"/nodes/{node}/qemu/{vmid}/firewall/log", "GET">>>) =>
                client.request("/nodes/{node}/qemu/{vmid}/firewall/log", "GET", { ...((a[0]) as any), $path: { node, vmid } }),
            refs: (node: string, vmid: number, ...a: ArgsTuple<PathContext<R<"/nodes/{node}/qemu/{vmid}/firewall/refs", "GET">>>) =>
                client.request("/nodes/{node}/qemu/{vmid}/firewall/refs", "GET", { ...((a[0]) as any), $path: { node, vmid } }),
            options: {
                get: (node: string, vmid: number) => client.request("/nodes/{node}/qemu/{vmid}/firewall/options", "GET", { $path: { node, vmid } } as any),
                set: (node: string, vmid: number, ...a: ArgsTuple<PathContext<R<"/nodes/{node}/qemu/{vmid}/firewall/options", "PUT">>>) =>
                    client.request("/nodes/{node}/qemu/{vmid}/firewall/options", "PUT", { ...((a[0]) as any), $path: { node, vmid } }),
            },
            aliases: {
                list:   (node: string, vmid: number) => client.request("/nodes/{node}/qemu/{vmid}/firewall/aliases", "GET", { $path: { node, vmid } } as any),
                create: (node: string, vmid: number, ...a: ArgsTuple<PathContext<R<"/nodes/{node}/qemu/{vmid}/firewall/aliases", "POST">>>) =>
                    client.request("/nodes/{node}/qemu/{vmid}/firewall/aliases", "POST", { ...((a[0]) as any), $path: { node, vmid } }),
                name:   (node: string, vmid: number, name: string) => ({
                    get:    () => client.request("/nodes/{node}/qemu/{vmid}/firewall/aliases/{name}", "GET",    { $path: { node, vmid, name } } as any),
                    update: (...a: ArgsTuple<PathContext<R<"/nodes/{node}/qemu/{vmid}/firewall/aliases/{name}", "PUT">>>) =>
                        client.request("/nodes/{node}/qemu/{vmid}/firewall/aliases/{name}", "PUT", { ...((a[0]) as any), $path: { node, vmid, name } }),
                    delete: () => client.request("/nodes/{node}/qemu/{vmid}/firewall/aliases/{name}", "DELETE", { $path: { node, vmid, name } } as any),
                }),
            },
            ipset: {
                list:   (node: string, vmid: number) => client.request("/nodes/{node}/qemu/{vmid}/firewall/ipset", "GET", { $path: { node, vmid } } as any),
                create: (node: string, vmid: number, ...a: ArgsTuple<PathContext<R<"/nodes/{node}/qemu/{vmid}/firewall/ipset", "POST">>>) =>
                    client.request("/nodes/{node}/qemu/{vmid}/firewall/ipset", "POST", { ...((a[0]) as any), $path: { node, vmid } }),
                name: (node: string, vmid: number, name: string) => ({
                    list:   () => client.request("/nodes/{node}/qemu/{vmid}/firewall/ipset/{name}", "GET",    { $path: { node, vmid, name } } as any),
                    add:    (...a: ArgsTuple<PathContext<R<"/nodes/{node}/qemu/{vmid}/firewall/ipset/{name}", "POST">>>) =>
                        client.request("/nodes/{node}/qemu/{vmid}/firewall/ipset/{name}", "POST", { ...((a[0]) as any), $path: { node, vmid, name } }),
                    delete: () => client.request("/nodes/{node}/qemu/{vmid}/firewall/ipset/{name}", "DELETE", { $path: { node, vmid, name } } as any),
                    cidr:   (cidr: string) => ({
                        get:    () => client.request("/nodes/{node}/qemu/{vmid}/firewall/ipset/{name}/{cidr}", "GET",    { $path: { node, vmid, name, cidr } } as any),
                        update: (...a: ArgsTuple<PathContext<R<"/nodes/{node}/qemu/{vmid}/firewall/ipset/{name}/{cidr}", "PUT">>>) =>
                            client.request("/nodes/{node}/qemu/{vmid}/firewall/ipset/{name}/{cidr}", "PUT", { ...((a[0]) as any), $path: { node, vmid, name, cidr } }),
                        delete: () => client.request("/nodes/{node}/qemu/{vmid}/firewall/ipset/{name}/{cidr}", "DELETE", { $path: { node, vmid, name, cidr } } as any),
                    }),
                }),
            },
            rules: {
                list:   (node: string, vmid: number) => client.request("/nodes/{node}/qemu/{vmid}/firewall/rules", "GET", { $path: { node, vmid } } as any),
                create: (node: string, vmid: number, ...a: ArgsTuple<PathContext<R<"/nodes/{node}/qemu/{vmid}/firewall/rules", "POST">>>) =>
                    client.request("/nodes/{node}/qemu/{vmid}/firewall/rules", "POST", { ...((a[0]) as any), $path: { node, vmid } }),
                pos:    (node: string, vmid: number, pos: number) => ({
                    get:    () => client.request("/nodes/{node}/qemu/{vmid}/firewall/rules/{pos}", "GET",    { $path: { node, vmid, pos } } as any),
                    update: (...a: ArgsTuple<PathContext<R<"/nodes/{node}/qemu/{vmid}/firewall/rules/{pos}", "PUT">>>) =>
                        client.request("/nodes/{node}/qemu/{vmid}/firewall/rules/{pos}", "PUT", { ...((a[0]) as any), $path: { node, vmid, pos } }),
                    delete: (...a: ArgsTuple<PathContext<R<"/nodes/{node}/qemu/{vmid}/firewall/rules/{pos}", "DELETE">>>) =>
                        client.request("/nodes/{node}/qemu/{vmid}/firewall/rules/{pos}", "DELETE", { ...((a[0]) as any), $path: { node, vmid, pos } }),
                }),
            },
        },

        snapshot: {
            list:   (node: string, vmid: number) => client.request("/nodes/{node}/qemu/{vmid}/snapshot", "GET", { $path: { node, vmid } } as any),
            create: (node: string, vmid: number, ...a: ArgsTuple<PathContext<R<"/nodes/{node}/qemu/{vmid}/snapshot", "POST">>>) =>
                client.request("/nodes/{node}/qemu/{vmid}/snapshot", "POST", { ...((a[0]) as any), $path: { node, vmid } }),
            snapname: (node: string, vmid: number, snapname: string) => ({
                get:    () => client.request("/nodes/{node}/qemu/{vmid}/snapshot/{snapname}", "GET",    { $path: { node, vmid, snapname } } as any),
                delete: () => client.request("/nodes/{node}/qemu/{vmid}/snapshot/{snapname}", "DELETE", { $path: { node, vmid, snapname } } as any),
                config: {
                    get:    () => client.request("/nodes/{node}/qemu/{vmid}/snapshot/{snapname}/config", "GET", { $path: { node, vmid, snapname } } as any),
                    update: (...a: ArgsTuple<PathContext<R<"/nodes/{node}/qemu/{vmid}/snapshot/{snapname}/config", "PUT">>>) =>
                        client.request("/nodes/{node}/qemu/{vmid}/snapshot/{snapname}/config", "PUT", { ...((a[0]) as any), $path: { node, vmid, snapname } }),
                },
                rollback: (...a: ArgsTuple<PathContext<R<"/nodes/{node}/qemu/{vmid}/snapshot/{snapname}/rollback", "POST">>>) =>
                    client.request("/nodes/{node}/qemu/{vmid}/snapshot/{snapname}/rollback", "POST", { ...((a[0]) as any), $path: { node, vmid, snapname } }),
            }),
        },

        status: {
            current:  (node: string, vmid: number) => client.request("/nodes/{node}/qemu/{vmid}/status/current", "GET", { $path: { node, vmid } } as any),
            start:    (node: string, vmid: number, ...a: ArgsTuple<PathContext<R<"/nodes/{node}/qemu/{vmid}/status/start",    "POST">>>) => client.request("/nodes/{node}/qemu/{vmid}/status/start",    "POST", { ...((a[0]) as any), $path: { node, vmid } }),
            stop:     (node: string, vmid: number, ...a: ArgsTuple<PathContext<R<"/nodes/{node}/qemu/{vmid}/status/stop",     "POST">>>) => client.request("/nodes/{node}/qemu/{vmid}/status/stop",     "POST", { ...((a[0]) as any), $path: { node, vmid } }),
            reboot:   (node: string, vmid: number, ...a: ArgsTuple<PathContext<R<"/nodes/{node}/qemu/{vmid}/status/reboot",   "POST">>>) => client.request("/nodes/{node}/qemu/{vmid}/status/reboot",   "POST", { ...((a[0]) as any), $path: { node, vmid } }),
            reset:    (node: string, vmid: number, ...a: ArgsTuple<PathContext<R<"/nodes/{node}/qemu/{vmid}/status/reset",    "POST">>>) => client.request("/nodes/{node}/qemu/{vmid}/status/reset",    "POST", { ...((a[0]) as any), $path: { node, vmid } }),
            resume:   (node: string, vmid: number, ...a: ArgsTuple<PathContext<R<"/nodes/{node}/qemu/{vmid}/status/resume",   "POST">>>) => client.request("/nodes/{node}/qemu/{vmid}/status/resume",   "POST", { ...((a[0]) as any), $path: { node, vmid } }),
            shutdown: (node: string, vmid: number, ...a: ArgsTuple<PathContext<R<"/nodes/{node}/qemu/{vmid}/status/shutdown", "POST">>>) => client.request("/nodes/{node}/qemu/{vmid}/status/shutdown", "POST", { ...((a[0]) as any), $path: { node, vmid } }),
            suspend:  (node: string, vmid: number, ...a: ArgsTuple<PathContext<R<"/nodes/{node}/qemu/{vmid}/status/suspend",  "POST">>>) => client.request("/nodes/{node}/qemu/{vmid}/status/suspend",  "POST", { ...((a[0]) as any), $path: { node, vmid } }),
        },
    };
}
