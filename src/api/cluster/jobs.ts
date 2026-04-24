import type { ClusterAPI } from "./types.js";
import type { ArgsTuple, PathContext } from "../index.js";
import { Client } from "../../index.js";

export function jobsFactory(client: Client) {
    return {
        index: (...args: ArgsTuple<ClusterAPI["/cluster/jobs"]["GET"]['parameters']>) => client.request("/cluster/jobs", "GET", (args[0] ?? {}) as ClusterAPI["/cluster/jobs"]["GET"]['parameters']),
        realm_sync: {
            index: (...args: ArgsTuple<ClusterAPI["/cluster/jobs/realm-sync"]["GET"]['parameters']>) => client.request("/cluster/jobs/realm-sync", "GET", (args[0] ?? {}) as ClusterAPI["/cluster/jobs/realm-sync"]["GET"]['parameters']),
            id: (id: string) => ({
                get: (...args: ArgsTuple<PathContext<ClusterAPI["/cluster/jobs/realm-sync/{id}"]["GET"]['parameters']>>) => client.request("/cluster/jobs/realm-sync/{id}", "GET", { ...((args[0]) as any), $path: { id } }),
                // Add more realm-sync endpoints as needed
            })
        },
        schedule_analyze: (...args: ArgsTuple<ClusterAPI["/cluster/jobs/schedule-analyze"]["GET"]['parameters']>) => client.request("/cluster/jobs/schedule-analyze", "GET", (args[0] ?? {}) as ClusterAPI["/cluster/jobs/schedule-analyze"]["GET"]['parameters'])
    };
}
