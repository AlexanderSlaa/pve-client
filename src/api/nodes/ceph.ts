// Factory for /nodes/{node}/ceph endpoints
import { Client } from "../../index.js";
import type { NodesAPI } from "./types.js";
import type { ArgsTuple } from "../index.js";

function stripPath<T extends { $path?: unknown }>(obj: T | undefined): Omit<T, "$path"> | undefined {
    if (!obj) return obj;
    const copy = {...obj};
    delete copy.$path;
    return copy as Omit<T, "$path">;
}

export function cephFactory(client: Client) {
    return {
        index: (
            node: string,
            ...args: ArgsTuple<NodesAPI["/nodes/{node}/ceph"]["GET"]["parameters"]>
        ) => client.request(
            "/nodes/{node}/ceph",
            "GET",
            { $path: { node }, ...stripPath(args[0]) }
        ),
        cfg: (
            node: string,
            ...args: ArgsTuple<NodesAPI["/nodes/{node}/ceph/cfg"]["GET"]["parameters"]>
        ) => client.request(
            "/nodes/{node}/ceph/cfg",
            "GET",
            { $path: { node }, ...stripPath(args[0]) }
        ),
        // ...repeat for all other endpoints under /nodes/{node}/ceph
        // For brevity, only a representative sample is shown here. Continue this pattern for all endpoints.
    };
}
