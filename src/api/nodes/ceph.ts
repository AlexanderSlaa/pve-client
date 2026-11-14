// Factory for /nodes/{node}/ceph endpoints
import type { Client } from "../../index";
import type { NodesAPI } from "./types";
import type { ArgsTuple, PathContext } from "../index";


export default function cephFactory(client: Client) {
    return {
        index: (
            node: string,
            ...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/ceph"]["GET"]["parameters"]>>
        ) => client.request(
            "/nodes/{node}/ceph",
            "GET",
            { ...args[0], $path: { node } }
        ),
        cfg: (
            node: string,
            ...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/ceph/cfg"]["GET"]["parameters"]>>
        ) => client.request(
            "/nodes/{node}/ceph/cfg",
            "GET",
            { ...args[0], $path: { node } }
        ),
    };
}
