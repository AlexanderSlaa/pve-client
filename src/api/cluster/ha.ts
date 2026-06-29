import type { ClusterAPI } from "./types";
import type { ArgsTuple, PathContext } from "../index";
import { Client } from "../../index";

export default function haFactory(client: Client) {
    return {
        index: (...args: ArgsTuple<ClusterAPI["/cluster/ha"]["GET"]['parameters']>) => client.request("/cluster/ha", "GET", (args[0] ?? {}) as ClusterAPI["/cluster/ha"]["GET"]['parameters']),
        status: {
            index: (...args: ArgsTuple<ClusterAPI["/cluster/ha/status"]["GET"]['parameters']>) => client.request("/cluster/ha/status", "GET", (args[0] ?? {}) as ClusterAPI["/cluster/ha/status"]["GET"]['parameters']),
            current: (...args: ArgsTuple<ClusterAPI["/cluster/ha/status/current"]["GET"]['parameters']>) => client.request("/cluster/ha/status/current", "GET", (args[0] ?? {}) as ClusterAPI["/cluster/ha/status/current"]["GET"]['parameters']),
            manager_status: (...args: ArgsTuple<ClusterAPI["/cluster/ha/status/manager_status"]["GET"]['parameters']>) => client.request("/cluster/ha/status/manager_status", "GET", (args[0] ?? {}) as ClusterAPI["/cluster/ha/status/manager_status"]["GET"]['parameters']),
            arm_ha:   (...args: ArgsTuple<ClusterAPI["/cluster/ha/status/arm-ha"]["POST"]['parameters']>)   => client.request("/cluster/ha/status/arm-ha",   "POST", (args[0] ?? {}) as ClusterAPI["/cluster/ha/status/arm-ha"]["POST"]['parameters']),
            disarm_ha:(...args: ArgsTuple<ClusterAPI["/cluster/ha/status/disarm-ha"]["POST"]['parameters']>) => client.request("/cluster/ha/status/disarm-ha","POST", (args[0] ?? {}) as ClusterAPI["/cluster/ha/status/disarm-ha"]["POST"]['parameters'])
        },
        groups: {
            index: (...args: ArgsTuple<ClusterAPI["/cluster/ha/groups"]["GET"]['parameters']>) => client.request("/cluster/ha/groups", "GET", (args[0] ?? {}) as ClusterAPI["/cluster/ha/groups"]["GET"]['parameters']),
            create: (...args: ArgsTuple<ClusterAPI["/cluster/ha/groups"]["POST"]['parameters']>) => client.request("/cluster/ha/groups", "POST", (args[0] ?? {}) as ClusterAPI["/cluster/ha/groups"]["POST"]['parameters']),
            group: (group: string) => ({
                get: (...args: ArgsTuple<PathContext<ClusterAPI["/cluster/ha/groups/{group}"]["GET"]['parameters']>>) => client.request("/cluster/ha/groups/{group}", "GET", { ...((args[0]) as any), $path: { group } }),
                update: (...args: ArgsTuple<PathContext<ClusterAPI["/cluster/ha/groups/{group}"]["PUT"]['parameters']>>) => client.request("/cluster/ha/groups/{group}", "PUT", { ...((args[0]) as any), $path: { group } }),
                delete: (...args: ArgsTuple<PathContext<ClusterAPI["/cluster/ha/groups/{group}"]["DELETE"]['parameters']>>) => client.request("/cluster/ha/groups/{group}", "DELETE", { ...((args[0]) as any), $path: { group } }),
            })
        },
        rules: {
            index: (...args: ArgsTuple<ClusterAPI["/cluster/ha/rules"]["GET"]['parameters']>) => client.request("/cluster/ha/rules", "GET", (args[0] ?? {}) as ClusterAPI["/cluster/ha/rules"]["GET"]['parameters']),
            create: (...args: ArgsTuple<ClusterAPI["/cluster/ha/rules"]["POST"]['parameters']>) => client.request("/cluster/ha/rules", "POST", (args[0] ?? {}) as ClusterAPI["/cluster/ha/rules"]["POST"]['parameters']),
            rule: (rule: string) => ({
                get: (...args: ArgsTuple<PathContext<ClusterAPI["/cluster/ha/rules/{rule}"]["GET"]['parameters']>>) => client.request("/cluster/ha/rules/{rule}", "GET", { ...((args[0]) as any), $path: { rule } }),
                update: (...args: ArgsTuple<PathContext<ClusterAPI["/cluster/ha/rules/{rule}"]["PUT"]['parameters']>>) => client.request("/cluster/ha/rules/{rule}", "PUT", { ...((args[0]) as any), $path: { rule } }),
                delete: (...args: ArgsTuple<PathContext<ClusterAPI["/cluster/ha/rules/{rule}"]["DELETE"]['parameters']>>) => client.request("/cluster/ha/rules/{rule}", "DELETE", { ...((args[0]) as any), $path: { rule } }),
            })
        },
        resources: {
            index: (...args: ArgsTuple<ClusterAPI["/cluster/ha/resources"]["GET"]['parameters']>) => client.request("/cluster/ha/resources", "GET", (args[0] ?? {}) as ClusterAPI["/cluster/ha/resources"]["GET"]['parameters']),
            create: (...args: ArgsTuple<ClusterAPI["/cluster/ha/resources"]["POST"]['parameters']>) => client.request("/cluster/ha/resources", "POST", (args[0] ?? {}) as ClusterAPI["/cluster/ha/resources"]["POST"]['parameters']),
            resource: (sid: string) => ({
                get: (...args: ArgsTuple<PathContext<ClusterAPI["/cluster/ha/resources/{sid}"]["GET"]['parameters']>>) => client.request("/cluster/ha/resources/{sid}", "GET", { ...((args[0]) as any), $path: { sid } }),
                update: (...args: ArgsTuple<PathContext<ClusterAPI["/cluster/ha/resources/{sid}"]["PUT"]['parameters']>>) => client.request("/cluster/ha/resources/{sid}", "PUT", { ...((args[0]) as any), $path: { sid } }),
                delete: (...args: ArgsTuple<PathContext<ClusterAPI["/cluster/ha/resources/{sid}"]["DELETE"]['parameters']>>) => client.request("/cluster/ha/resources/{sid}", "DELETE", { ...((args[0]) as any), $path: { sid } }),
                migrate: (...args: ArgsTuple<PathContext<ClusterAPI["/cluster/ha/resources/{sid}/migrate"]["POST"]['parameters']>>) => client.request("/cluster/ha/resources/{sid}/migrate", "POST", { ...((args[0]) as any), $path: { sid } }),
                relocate: (...args: ArgsTuple<PathContext<ClusterAPI["/cluster/ha/resources/{sid}/relocate"]["POST"]['parameters']>>) => client.request("/cluster/ha/resources/{sid}/relocate", "POST", { ...((args[0]) as any), $path: { sid } })
            })
        }
    };
}
