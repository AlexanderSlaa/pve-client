import type { Client } from "../../index.js";
import type { ClusterAPI } from "./types.js";
import type { ArgsTuple } from "../index.js";

export function sdnFactory(client: Client) {
    return {
        index: (
            ...args: ArgsTuple<ClusterAPI["/cluster/sdn"]["GET"]['parameters']>
        ) =>
            client.request(
                "/cluster/sdn",
                "GET",
                (args[0] ?? {}) as ClusterAPI["/cluster/sdn"]["GET"]['parameters']
            ),
        reload: (
            ...args: ArgsTuple<ClusterAPI["/cluster/sdn"]["PUT"]['parameters']>
        ) =>
            client.request(
                "/cluster/sdn",
                "PUT",
                (args[0] ?? {}) as ClusterAPI["/cluster/sdn"]["PUT"]['parameters']
            ),
    };
}
