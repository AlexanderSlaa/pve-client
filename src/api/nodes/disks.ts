// Factory for /nodes/{node}/disks endpoints
import { Client } from "../../index.js";
import type { NodesAPI } from "./types.js";
import type { ArgsTuple } from "../index.js";

function stripPath<T extends { $path?: unknown }>(obj: T | undefined): Omit<T, "$path"> | undefined {
    if (!obj) return obj;
    const copy = {...obj};
    delete copy.$path;
    return copy as Omit<T, "$path">;
}

export function disksFactory(client: Client) {
    return {
        list: (
            node: string,
            ...args: ArgsTuple<NodesAPI["/nodes/{node}/disks"]["GET"]["parameters"]>
        ) => client.request(
            "/nodes/{node}/disks",
            "GET",
            { $path: { node }, ...stripPath(args[0]) }
        ),
        // ...repeat for all other endpoints under /nodes/{node}/disks
        // For brevity, only a representative sample is shown here. Continue this pattern for all endpoints.
    };
}
