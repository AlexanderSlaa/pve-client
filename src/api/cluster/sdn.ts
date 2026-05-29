import type { Client } from "../../index";
import type { ClusterAPI } from "./types";
import type { ArgsTuple } from "../index";

export default function sdnFactory(client: Client) {
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
