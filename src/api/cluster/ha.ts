import type { ClusterAPI } from "../cluster/index.js";
import type { ArgsTuple, PathContext } from "../index.js";
import { Client } from "../../index.js";

export function haFactory(client: Client) {
    return {
        index: (...args: ArgsTuple<ClusterAPI["/cluster/ha"]["GET"]['parameters']>) => client.request("/cluster/ha", "GET", (args[0] ?? {}) as ClusterAPI["/cluster/ha"]["GET"]['parameters']),
        status: {
            index: (...args: ArgsTuple<ClusterAPI["/cluster/ha/status"]["GET"]['parameters']>) => client.request("/cluster/ha/status", "GET", (args[0] ?? {}) as ClusterAPI["/cluster/ha/status"]["GET"]['parameters']),
            current: (...args: ArgsTuple<ClusterAPI["/cluster/ha/status/current"]["GET"]['parameters']>) => client.request("/cluster/ha/status/current", "GET", (args[0] ?? {}) as ClusterAPI["/cluster/ha/status/current"]["GET"]['parameters']),
            manager_status: (...args: ArgsTuple<ClusterAPI["/cluster/ha/status/manager_status"]["GET"]['parameters']>) => client.request("/cluster/ha/status/manager_status", "GET", (args[0] ?? {}) as ClusterAPI["/cluster/ha/status/manager_status"]["GET"]['parameters'])
        },
        groups: {
            index: (...args: ArgsTuple<ClusterAPI["/cluster/ha/groups"]["GET"]['parameters']>) => client.request("/cluster/ha/groups", "GET", (args[0] ?? {}) as ClusterAPI["/cluster/ha/groups"]["GET"]['parameters']),
            group: (group: string) => ({
                get: (...args: ArgsTuple<PathContext<ClusterAPI["/cluster/ha/groups/{group}"]["GET"]['parameters']>>) => client.request("/cluster/ha/groups/{group}", "GET", { ...((args[0]) as any), $path: { group } }),
                // Add more group endpoints as needed
            })
        },
        rules: {
            index: (...args: ArgsTuple<ClusterAPI["/cluster/ha/rules"]["GET"]['parameters']>) => client.request("/cluster/ha/rules", "GET", (args[0] ?? {}) as ClusterAPI["/cluster/ha/rules"]["GET"]['parameters']),
            rule: (rule: string) => ({
                get: (...args: ArgsTuple<PathContext<ClusterAPI["/cluster/ha/rules/{rule}"]["GET"]['parameters']>>) => client.request("/cluster/ha/rules/{rule}", "GET", { ...((args[0]) as any), $path: { rule } }),
                // Add more rule endpoints as needed
            })
        },
        resources: {
            index: (...args: ArgsTuple<ClusterAPI["/cluster/ha/resources"]["GET"]['parameters']>) => client.request("/cluster/ha/resources", "GET", (args[0] ?? {}) as ClusterAPI["/cluster/ha/resources"]["GET"]['parameters']),
            resource: (sid: string) => ({
                get: (...args: ArgsTuple<PathContext<ClusterAPI["/cluster/ha/resources/{sid}"]["GET"]['parameters']>>) => client.request("/cluster/ha/resources/{sid}", "GET", { ...((args[0]) as any), $path: { sid } }),
                migrate: (...args: ArgsTuple<PathContext<ClusterAPI["/cluster/ha/resources/{sid}/migrate"]["POST"]['parameters']>>) => client.request("/cluster/ha/resources/{sid}/migrate", "POST", { ...((args[0]) as any), $path: { sid } }),
                relocate: (...args: ArgsTuple<PathContext<ClusterAPI["/cluster/ha/resources/{sid}/relocate"]["POST"]['parameters']>>) => client.request("/cluster/ha/resources/{sid}/relocate", "POST", { ...((args[0]) as any), $path: { sid } })
            })
        }
    };
}
