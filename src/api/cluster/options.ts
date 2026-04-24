import type { Client } from "../../index.js";
import type { ClusterAPI } from "./types.js";
import type { ArgsTuple } from "../index.js";

export function optionsFactory(client: Client) {
    return {
        get_options: (
            ...args: ArgsTuple<ClusterAPI["/cluster/options"]["GET"]['parameters']>
        ) =>
            client.request(
                "/cluster/options",
                "GET",
                (args[0] ?? {}) as ClusterAPI["/cluster/options"]["GET"]['parameters']
            ),
        set_options: (
            ...args: ArgsTuple<ClusterAPI["/cluster/options"]["PUT"]['parameters']>
        ) =>
            client.request(
                "/cluster/options",
                "PUT",
                (args[0] ?? {}) as ClusterAPI["/cluster/options"]["PUT"]['parameters']
            ),
    };
}
