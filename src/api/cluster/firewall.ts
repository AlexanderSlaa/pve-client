import type { ClusterAPI } from "../cluster/index.js";
import type { ArgsTuple, PathContext } from "../index.js";
import { Client } from "../../index.js";

export function firewallFactory(client: Client) {
    return {
        index: (...args: ArgsTuple<ClusterAPI["/cluster/firewall"]["GET"]['parameters']>) => client.request("/cluster/firewall", "GET", (args[0] ?? {}) as ClusterAPI["/cluster/firewall"]["GET"]['parameters']),
        options: (...args: ArgsTuple<ClusterAPI["/cluster/firewall/options"]["GET"]['parameters']>) => client.request("/cluster/firewall/options", "GET", (args[0] ?? {}) as ClusterAPI["/cluster/firewall/options"]["GET"]['parameters']),
        rules: {
            index: (...args: ArgsTuple<ClusterAPI["/cluster/firewall/rules"]["GET"]['parameters']>) => client.request("/cluster/firewall/rules", "GET", (args[0] ?? {}) as ClusterAPI["/cluster/firewall/rules"]["GET"]['parameters']),
            rule: (pos: string | number) => ({
                get: (...args: ArgsTuple<PathContext<ClusterAPI["/cluster/firewall/rules/{pos}"]["GET"]['parameters']>>) => client.request("/cluster/firewall/rules/{pos}", "GET", { ...((args[0]) as any), $path: { pos: pos.toString() } }),
                // Add more rule endpoints as needed
            })
        },
        groups: {
            index: (...args: ArgsTuple<ClusterAPI["/cluster/firewall/groups"]["GET"]['parameters']>) => client.request("/cluster/firewall/groups", "GET", (args[0] ?? {}) as ClusterAPI["/cluster/firewall/groups"]["GET"]['parameters']),
            group: (group: string) => ({
                get: (...args: ArgsTuple<PathContext<ClusterAPI["/cluster/firewall/groups/{group}"]["GET"]['parameters']>>) => client.request("/cluster/firewall/groups/{group}", "GET", { ...((args[0]) as any), $path: { group } }),
                // Add more group endpoints as needed
            })
        },
        ipset: {
            index: (...args: ArgsTuple<ClusterAPI["/cluster/firewall/ipset"]["GET"]['parameters']>) => client.request("/cluster/firewall/ipset", "GET", (args[0] ?? {}) as ClusterAPI["/cluster/firewall/ipset"]["GET"]['parameters']),
            name: (name: string) => ({
                get: (...args: ArgsTuple<PathContext<ClusterAPI["/cluster/firewall/ipset/{name}"]["GET"]['parameters']>>) => client.request("/cluster/firewall/ipset/{name}", "GET", { ...((args[0]) as any), $path: { name } }),
                // Add more ipset endpoints as needed
            })
        },
        aliases: {
            index: (...args: ArgsTuple<ClusterAPI["/cluster/firewall/aliases"]["GET"]['parameters']>) => client.request("/cluster/firewall/aliases", "GET", (args[0] ?? {}) as ClusterAPI["/cluster/firewall/aliases"]["GET"]['parameters']),
            name: (name: string) => ({
                get: (...args: ArgsTuple<PathContext<ClusterAPI["/cluster/firewall/aliases/{name}"]["GET"]['parameters']>>) => client.request("/cluster/firewall/aliases/{name}", "GET", { ...((args[0]) as any), $path: { name } }),
                // Add more alias endpoints as needed
            })
        },
        macros: (...args: ArgsTuple<ClusterAPI["/cluster/firewall/macros"]["GET"]['parameters']>) => client.request("/cluster/firewall/macros", "GET", (args[0] ?? {}) as ClusterAPI["/cluster/firewall/macros"]["GET"]['parameters']),
        refs: (...args: ArgsTuple<ClusterAPI["/cluster/firewall/refs"]["GET"]['parameters']>) => client.request("/cluster/firewall/refs", "GET", (args[0] ?? {}) as ClusterAPI["/cluster/firewall/refs"]["GET"]['parameters'])
    };
}
