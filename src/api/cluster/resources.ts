import type { Client } from "../../index.js";
import type { ClusterAPI } from "./types.js";
import type { ArgsTuple } from "../index.js";

export function resourcesFactory(client: Client) {
    return {
        resources: (
            ...args: ArgsTuple<ClusterAPI["/cluster/resources"]["GET"]['parameters']>
        ) =>
            client.request(
                "/cluster/resources",
                "GET",
                (args[0] ?? {}) as ClusterAPI["/cluster/resources"]["GET"]['parameters']
            ),
    };
}
