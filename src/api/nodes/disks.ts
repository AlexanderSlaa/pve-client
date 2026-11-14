// Factory for /nodes/{node}/disks endpoints
import type { Client } from "../../index";
import type { NodesAPI } from "./types";
import type { ArgsTuple, PathContext } from "../index";


export default function disksFactory(client: Client) {
    return {
        list: (
            node: string,
            ...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/disks"]["GET"]["parameters"]>>
        ) => client.request(
            "/nodes/{node}/disks",
            "GET",
            { ...args[0], $path: { node } }
        ),
        list_disks: (
            node: string,
            ...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/disks/list"]["GET"]["parameters"]>>
        ) => client.request(
            "/nodes/{node}/disks/list",
            "GET",
            { ...args[0], $path: { node } }
        ),
    };
}
