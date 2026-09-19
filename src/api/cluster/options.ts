import type { Client } from "../../index";
import type { ClusterAPI } from "./types";
import type { ArgsTuple } from "../index";

export default function optionsFactory(client: Client) {
    const index = (
        ...args: ArgsTuple<ClusterAPI["/cluster/options"]["GET"]['parameters']>
    ) =>
        client.request(
            "/cluster/options",
            "GET",
            (args[0] ?? {}) as ClusterAPI["/cluster/options"]["GET"]['parameters']
        );

    const update = (
        ...args: ArgsTuple<ClusterAPI["/cluster/options"]["PUT"]['parameters']>
    ) =>
        client.request(
            "/cluster/options",
            "PUT",
            (args[0] ?? {}) as ClusterAPI["/cluster/options"]["PUT"]['parameters']
        );

    return {
        index,
        /**
         * @alias index
         */
        get: index,
        /**
         * @alias update
         */
        set: update,
        update,
        /** @deprecated Use index() instead. */
        get_options: index,
        /** @deprecated Use update() instead. */
        set_options: update,
    };
}
