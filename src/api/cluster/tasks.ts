import type { Client } from "../../index.js";
import type { ClusterAPI } from "./types.js";
import type { ArgsTuple } from "../index.js";

export default function tasksFactory(client: Client) {
    return {
        index: (...args: ArgsTuple<ClusterAPI["/cluster/tasks"]["GET"]["parameters"]>) =>
            client.request("/cluster/tasks", "GET", (args[0] ?? {}) as ClusterAPI["/cluster/tasks"]["GET"]["parameters"]),
    };
}
