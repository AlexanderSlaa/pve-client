import type { ClusterAPI } from "./types";
import type { ArgsTuple, PathContext } from "../index";
import { Client } from "../../index";

export default function firewallFactory(client: Client) {
    return {
        index: (...args: ArgsTuple<ClusterAPI["/cluster/firewall"]["GET"]['parameters']>) => client.request("/cluster/firewall", "GET", (args[0] ?? {}) as ClusterAPI["/cluster/firewall"]["GET"]['parameters']),
        options: (...args: ArgsTuple<ClusterAPI["/cluster/firewall/options"]["GET"]['parameters']>) => client.request("/cluster/firewall/options", "GET", (args[0] ?? {}) as ClusterAPI["/cluster/firewall/options"]["GET"]['parameters']),
        update_options: (...args: ArgsTuple<ClusterAPI["/cluster/firewall/options"]["PUT"]['parameters']>) => client.request("/cluster/firewall/options", "PUT", (args[0] ?? {}) as ClusterAPI["/cluster/firewall/options"]["PUT"]['parameters']),
        rules: {
            index: (...args: ArgsTuple<ClusterAPI["/cluster/firewall/rules"]["GET"]['parameters']>) => client.request("/cluster/firewall/rules", "GET", (args[0] ?? {}) as ClusterAPI["/cluster/firewall/rules"]["GET"]['parameters']),
            create: (...args: ArgsTuple<ClusterAPI["/cluster/firewall/rules"]["POST"]['parameters']>) => client.request("/cluster/firewall/rules", "POST", (args[0] ?? {}) as ClusterAPI["/cluster/firewall/rules"]["POST"]['parameters']),
            rule: (pos: string | number) => ({
                get: (...args: ArgsTuple<PathContext<ClusterAPI["/cluster/firewall/rules/{pos}"]["GET"]['parameters']>>) => client.request("/cluster/firewall/rules/{pos}", "GET", { ...((args[0]) as any), $path: { pos: pos.toString() } }),
                update: (...args: ArgsTuple<PathContext<ClusterAPI["/cluster/firewall/rules/{pos}"]["PUT"]['parameters']>>) => client.request("/cluster/firewall/rules/{pos}", "PUT", { ...((args[0]) as any), $path: { pos: pos.toString() } }),
                delete: (...args: ArgsTuple<PathContext<ClusterAPI["/cluster/firewall/rules/{pos}"]["DELETE"]['parameters']>>) => client.request("/cluster/firewall/rules/{pos}", "DELETE", { ...((args[0]) as any), $path: { pos: pos.toString() } }),
            })
        },
        groups: {
            index: (...args: ArgsTuple<ClusterAPI["/cluster/firewall/groups"]["GET"]['parameters']>) => client.request("/cluster/firewall/groups", "GET", (args[0] ?? {}) as ClusterAPI["/cluster/firewall/groups"]["GET"]['parameters']),
            create: (...args: ArgsTuple<ClusterAPI["/cluster/firewall/groups"]["POST"]['parameters']>) => client.request("/cluster/firewall/groups", "POST", (args[0] ?? {}) as ClusterAPI["/cluster/firewall/groups"]["POST"]['parameters']),
            group: (group: string) => ({
                get:    (...args: ArgsTuple<PathContext<ClusterAPI["/cluster/firewall/groups/{group}"]["GET"]["parameters"]>>)    => client.request("/cluster/firewall/groups/{group}", "GET",    { ...((args[0]) as any), $path: { group } }),
                create: (...args: ArgsTuple<PathContext<ClusterAPI["/cluster/firewall/groups/{group}"]["POST"]["parameters"]>>)  => client.request("/cluster/firewall/groups/{group}", "POST",   { ...((args[0]) as any), $path: { group } }),
                delete: (...args: ArgsTuple<PathContext<ClusterAPI["/cluster/firewall/groups/{group}"]["DELETE"]["parameters"]>>) => client.request("/cluster/firewall/groups/{group}", "DELETE", { ...((args[0]) as any), $path: { group } }),
                pos: (pos: number | string) => ({
                    get:    (...args: ArgsTuple<PathContext<ClusterAPI["/cluster/firewall/groups/{group}/{pos}"]["GET"]["parameters"]>>)    => client.request("/cluster/firewall/groups/{group}/{pos}", "GET",    { ...((args[0]) as any), $path: { group, pos } }),
                    update: (...args: ArgsTuple<PathContext<ClusterAPI["/cluster/firewall/groups/{group}/{pos}"]["PUT"]["parameters"]>>)   => client.request("/cluster/firewall/groups/{group}/{pos}", "PUT",    { ...((args[0]) as any), $path: { group, pos } }),
                    delete: (...args: ArgsTuple<PathContext<ClusterAPI["/cluster/firewall/groups/{group}/{pos}"]["DELETE"]["parameters"]>>) => client.request("/cluster/firewall/groups/{group}/{pos}", "DELETE", { ...((args[0]) as any), $path: { group, pos } }),
                }),
            })
        },
        ipset: {
            index: (...args: ArgsTuple<ClusterAPI["/cluster/firewall/ipset"]["GET"]['parameters']>) => client.request("/cluster/firewall/ipset", "GET", (args[0] ?? {}) as ClusterAPI["/cluster/firewall/ipset"]["GET"]['parameters']),
            create: (...args: ArgsTuple<ClusterAPI["/cluster/firewall/ipset"]["POST"]['parameters']>) => client.request("/cluster/firewall/ipset", "POST", (args[0] ?? {}) as ClusterAPI["/cluster/firewall/ipset"]["POST"]['parameters']),
            name: (name: string) => ({
                get:    (...args: ArgsTuple<PathContext<ClusterAPI["/cluster/firewall/ipset/{name}"]["GET"]["parameters"]>>)    => client.request("/cluster/firewall/ipset/{name}", "GET",    { ...((args[0]) as any), $path: { name } }),
                add:    (...args: ArgsTuple<PathContext<ClusterAPI["/cluster/firewall/ipset/{name}"]["POST"]["parameters"]>>)  => client.request("/cluster/firewall/ipset/{name}", "POST",   { ...((args[0]) as any), $path: { name } }),
                delete: (...args: ArgsTuple<PathContext<ClusterAPI["/cluster/firewall/ipset/{name}"]["DELETE"]["parameters"]>>) => client.request("/cluster/firewall/ipset/{name}", "DELETE", { ...((args[0]) as any), $path: { name } }),
                cidr: (cidr: string) => ({
                    get:    (...args: ArgsTuple<PathContext<ClusterAPI["/cluster/firewall/ipset/{name}/{cidr}"]["GET"]["parameters"]>>)    => client.request("/cluster/firewall/ipset/{name}/{cidr}", "GET",    { ...((args[0]) as any), $path: { name, cidr } }),
                    update: (...args: ArgsTuple<PathContext<ClusterAPI["/cluster/firewall/ipset/{name}/{cidr}"]["PUT"]["parameters"]>>)   => client.request("/cluster/firewall/ipset/{name}/{cidr}", "PUT",    { ...((args[0]) as any), $path: { name, cidr } }),
                    delete: (...args: ArgsTuple<PathContext<ClusterAPI["/cluster/firewall/ipset/{name}/{cidr}"]["DELETE"]["parameters"]>>) => client.request("/cluster/firewall/ipset/{name}/{cidr}", "DELETE", { ...((args[0]) as any), $path: { name, cidr } }),
                }),
            })
        },
        aliases: {
            index: (...args: ArgsTuple<ClusterAPI["/cluster/firewall/aliases"]["GET"]['parameters']>) => client.request("/cluster/firewall/aliases", "GET", (args[0] ?? {}) as ClusterAPI["/cluster/firewall/aliases"]["GET"]['parameters']),
            create: (...args: ArgsTuple<ClusterAPI["/cluster/firewall/aliases"]["POST"]['parameters']>) => client.request("/cluster/firewall/aliases", "POST", (args[0] ?? {}) as ClusterAPI["/cluster/firewall/aliases"]["POST"]['parameters']),
            name: (name: string) => ({
                get: (...args: ArgsTuple<PathContext<ClusterAPI["/cluster/firewall/aliases/{name}"]["GET"]['parameters']>>) => client.request("/cluster/firewall/aliases/{name}", "GET", { ...((args[0]) as any), $path: { name } }),
                update: (...args: ArgsTuple<PathContext<ClusterAPI["/cluster/firewall/aliases/{name}"]["PUT"]['parameters']>>) => client.request("/cluster/firewall/aliases/{name}", "PUT", { ...((args[0]) as any), $path: { name } }),
                delete: (...args: ArgsTuple<PathContext<ClusterAPI["/cluster/firewall/aliases/{name}"]["DELETE"]['parameters']>>) => client.request("/cluster/firewall/aliases/{name}", "DELETE", { ...((args[0]) as any), $path: { name } }),
            })
        },
        macros: (...args: ArgsTuple<ClusterAPI["/cluster/firewall/macros"]["GET"]['parameters']>) => client.request("/cluster/firewall/macros", "GET", (args[0] ?? {}) as ClusterAPI["/cluster/firewall/macros"]["GET"]['parameters']),
        refs: (...args: ArgsTuple<ClusterAPI["/cluster/firewall/refs"]["GET"]['parameters']>) => client.request("/cluster/firewall/refs", "GET", (args[0] ?? {}) as ClusterAPI["/cluster/firewall/refs"]["GET"]['parameters'])
    };
}
