// Factory for /nodes/{node}/firewall endpoints
import type { Client } from "../../index";
import type { NodesAPI } from "./types";
import type { ArgsTuple, PathContext } from "../index";


export default function firewallFactory(client: Client) {
    return {
        get: (
            node: string,
            ...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/firewall"]["GET"]["parameters"]>>
        ) => client.request(
            "/nodes/{node}/firewall",
            "GET",
            { ...args[0], $path: { node } }
        ),
    };
}
