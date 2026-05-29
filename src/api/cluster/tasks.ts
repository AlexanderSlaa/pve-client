import type { Client } from "../../index";
import type { ClusterAPI } from "./types";
import type { ArgsTuple } from "../index";

export default function tasksFactory(client: Client) {
    return {
        index: (...args: ArgsTuple<ClusterAPI["/cluster/tasks"]["GET"]["parameters"]>) =>
            client.request("/cluster/tasks", "GET", (args[0] ?? {}) as ClusterAPI["/cluster/tasks"]["GET"]["parameters"]),
    };
}
