import type { ClusterAPI } from "./types";
import type { ArgsTuple, PathContext } from "../index";
import { Client } from "../../index";

export default function jobsFactory(client: Client) {
    return {
        index: (...args: ArgsTuple<ClusterAPI["/cluster/jobs"]["GET"]['parameters']>) => client.request("/cluster/jobs", "GET", (args[0] ?? {}) as ClusterAPI["/cluster/jobs"]["GET"]['parameters']),
        realm_sync: {
            index: (...args: ArgsTuple<ClusterAPI["/cluster/jobs/realm-sync"]["GET"]['parameters']>) => client.request("/cluster/jobs/realm-sync", "GET", (args[0] ?? {}) as ClusterAPI["/cluster/jobs/realm-sync"]["GET"]['parameters']),
            id: (id: string) => ({
                get: (...args: ArgsTuple<PathContext<ClusterAPI["/cluster/jobs/realm-sync/{id}"]["GET"]['parameters']>>) => client.request("/cluster/jobs/realm-sync/{id}", "GET", { ...((args[0]) as any), $path: { id } }),
                create: (...args: ArgsTuple<PathContext<ClusterAPI["/cluster/jobs/realm-sync/{id}"]["POST"]['parameters']>>) => client.request("/cluster/jobs/realm-sync/{id}", "POST", { ...((args[0]) as any), $path: { id } }),
                update: (...args: ArgsTuple<PathContext<ClusterAPI["/cluster/jobs/realm-sync/{id}"]["PUT"]['parameters']>>) => client.request("/cluster/jobs/realm-sync/{id}", "PUT", { ...((args[0]) as any), $path: { id } }),
                delete: (...args: ArgsTuple<PathContext<ClusterAPI["/cluster/jobs/realm-sync/{id}"]["DELETE"]['parameters']>>) => client.request("/cluster/jobs/realm-sync/{id}", "DELETE", { ...((args[0]) as any), $path: { id } }),
            })
        },
        schedule_analyze: (...args: ArgsTuple<ClusterAPI["/cluster/jobs/schedule-analyze"]["GET"]['parameters']>) => client.request("/cluster/jobs/schedule-analyze", "GET", (args[0] ?? {}) as ClusterAPI["/cluster/jobs/schedule-analyze"]["GET"]['parameters'])
    };
}
