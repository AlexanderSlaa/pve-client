import type { Client } from "../../index";
import type { ClusterAPI } from "./types";
import type { ArgsTuple } from "../index";

export default function resourcesFactory(client: Client) {
    const index = (
        ...args: ArgsTuple<ClusterAPI["/cluster/resources"]["GET"]['parameters']>
    ) =>
        client.request(
            "/cluster/resources",
            "GET",
            (args[0] ?? {}) as ClusterAPI["/cluster/resources"]["GET"]['parameters']
        );

    return {
        index,
        /**
         * @deprecated Use index() instead.
         */
        resources: index,
    };
}
