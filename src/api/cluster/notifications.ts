import type { Client } from "../../index";
import type { ClusterAPI } from "./types";
import type { ArgsTuple } from "../index";

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
