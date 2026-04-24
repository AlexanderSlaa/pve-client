import type { Client } from "../../index.js";
import type { ClusterAPI } from "./types.js";
import type { ArgsTuple, PathContext } from "../index.js";

export function notificationsFactory(client: Client) {
    return {
        index: (
            ...args: ArgsTuple<ClusterAPI["/cluster/notifications"]["GET"]['parameters']>
        ) =>
            client.request(
                "/cluster/notifications",
                "GET",
                (args[0] ?? {}) as ClusterAPI["/cluster/notifications"]["GET"]['parameters']
            ),
    };
}
