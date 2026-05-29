import type { Client } from "../../index";
import type { ClusterAPI } from "./types";
import type { ArgsTuple } from "../index";

export default function optionsFactory(client: Client) {
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
