import type { Client } from "../../index.js";
import type { ClusterAPI } from "./types.js";
import type { ArgsTuple, PathContext } from "../index.js";

export function replicationFactory(client: Client) {
    return {
        index: (
            ...args: ArgsTuple<ClusterAPI["/cluster/replication"]["GET"]['parameters']>
        ) =>
            client.request(
                "/cluster/replication",
                "GET",
                (args[0] ?? {}) as ClusterAPI["/cluster/replication"]["GET"]['parameters']
            ),
        create: (
            ...args: ArgsTuple<ClusterAPI["/cluster/replication"]["POST"]['parameters']>
        ) =>
            client.request(
                "/cluster/replication",
                "POST",
                (args[0] ?? {}) as ClusterAPI["/cluster/replication"]["POST"]['parameters']
            ),
        id: (id: string) => ({
            delete_: (
                ...args: ArgsTuple<PathContext<ClusterAPI["/cluster/replication/{id}"]["DELETE"]['parameters']>>
            ) =>
                client.request(
                    "/cluster/replication/{id}",
                    "DELETE",
                    { ...((args[0]) as any), $path: { id } }
                ),
            read: (
                ...args: ArgsTuple<PathContext<ClusterAPI["/cluster/replication/{id}"]["GET"]['parameters']>>
            ) =>
                client.request(
                    "/cluster/replication/{id}",
                    "GET",
                    { ...((args[0]) as any), $path: { id } }
                ),
            update: (
                ...args: ArgsTuple<PathContext<ClusterAPI["/cluster/replication/{id}"]["PUT"]['parameters']>>
            ) =>
                client.request(
                    "/cluster/replication/{id}",
                    "PUT",
                    { ...((args[0]) as any), $path: { id } }
                ),
        }),
    };
}
