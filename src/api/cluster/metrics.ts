import type { Client } from "../../index.js";
import type { ClusterAPI } from "./types.js";
import type { ArgsTuple, PathContext } from "../index.js";

export function metricsFactory(client: Client) {
    return {
        index: (
            ...args: ArgsTuple<ClusterAPI["/cluster/metrics"]["GET"]['parameters']>
        ) =>
            client.request(
                "/cluster/metrics",
                "GET",
                (args[0] ?? {}) as ClusterAPI["/cluster/metrics"]["GET"]['parameters']
            ),
        export: (
            ...args: ArgsTuple<ClusterAPI["/cluster/metrics/export"]["GET"]['parameters']>
        ) =>
            client.request(
                "/cluster/metrics/export",
                "GET",
                (args[0] ?? {}) as ClusterAPI["/cluster/metrics/export"]["GET"]['parameters']
            ),
        server: {
            index: (
                ...args: ArgsTuple<ClusterAPI["/cluster/metrics/server"]["GET"]['parameters']>
            ) =>
                client.request(
                    "/cluster/metrics/server",
                    "GET",
                    (args[0] ?? {}) as ClusterAPI["/cluster/metrics/server"]["GET"]['parameters']
                ),
            create: (
                ...args: ArgsTuple<PathContext<ClusterAPI["/cluster/metrics/server/{id}"]["POST"]['parameters']>>
            ) =>
                client.request(
                    "/cluster/metrics/server/{id}",
                    "POST",
                    { ...((args[0]) as any), $path: { id: (args[0] as any)?.$path?.id } }
                ),
            id: (id: string) => ({
                delete: (
                    ...args: ArgsTuple<PathContext<ClusterAPI["/cluster/metrics/server/{id}"]["DELETE"]['parameters']>>
                ) =>
                    client.request(
                        "/cluster/metrics/server/{id}",
                        "DELETE",
                        { ...((args[0]) as any), $path: { id } }
                    ),
                get: (
                    ...args: ArgsTuple<PathContext<ClusterAPI["/cluster/metrics/server/{id}"]["GET"]['parameters']>>
                ) =>
                    client.request(
                        "/cluster/metrics/server/{id}",
                        "GET",
                        { ...((args[0]) as any), $path: { id } }
                    ),
                update: (
                    ...args: ArgsTuple<PathContext<ClusterAPI["/cluster/metrics/server/{id}"]["PUT"]['parameters']>>
                ) =>
                    client.request(
                        "/cluster/metrics/server/{id}",
                        "PUT",
                        { ...((args[0]) as any), $path: { id } }
                    ),
            }),
        },
    };
}
