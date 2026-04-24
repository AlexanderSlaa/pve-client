import type { Client } from "../../index.js";
import type { ClusterAPI } from "./types.js";
import type { ArgsTuple } from "../index.js";

export function statusFactory(client: Client) {
    return {
        index: (
            ...args: ArgsTuple<ClusterAPI["/cluster/ha/status"]["GET"]['parameters']>
        ) =>
            client.request(
                "/cluster/ha/status",
                "GET",
                (args[0] ?? {}) as ClusterAPI["/cluster/ha/status"]["GET"]['parameters']
            ),
    };
}
