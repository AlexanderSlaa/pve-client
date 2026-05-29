// Factory for /nodes/{node}/disks endpoints
import { Client } from "../../index";
import type { NodesAPI } from "./types";
import type { ArgsTuple } from "../index";

function stripPath<T extends { $path?: any }>(obj: T | undefined): Omit<T, "$path"> | undefined {
    if (!obj) return obj;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { $path, ...rest } = obj;
    return rest;
}

export default function disksFactory(client: Client) {
    return {
        list: (
            node: string,
            ...args: ArgsTuple<NodesAPI["/nodes/{node}/disks"]["GET"]["parameters"]>
        ) => client.request(
            "/nodes/{node}/disks",
            "GET",
            { $path: { node }, ...stripPath(args[0]) }
        ),
        list_disks: (
            node: string,
            ...args: ArgsTuple<NodesAPI["/nodes/{node}/disks/list"]["GET"]["parameters"]>
        ) => client.request(
            "/nodes/{node}/disks/list",
            "GET",
            { $path: { node }, ...stripPath(args[0]) }
        ),
    };
}
