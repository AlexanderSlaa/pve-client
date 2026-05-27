// Factory for /nodes/{node}/storage endpoints
import type { Client } from "../../index.js";
import type { NodesAPI } from "./types.js";

export default function nodeStorageFactory(client: Client, node: string) {
    return {
        /** Lists all storages on this node. Calls GET /nodes/{node}/storage. */
        list: (args?: Omit<NodesAPI["/nodes/{node}/storage"]["GET"]["parameters"], "$path">) =>
            client.request(
                "/nodes/{node}/storage",
                "GET",
                { $path: { node }, ...(args ?? {}) } as NodesAPI["/nodes/{node}/storage"]["GET"]["parameters"]
            ),

        /** Returns storage-scoped sub-APIs for the given storage name. */
        get: (storage: string) => ({
            content: {
                list: (args?: Omit<NodesAPI["/nodes/{node}/storage/{storage}/content"]["GET"]["parameters"], "$path">) =>
                    client.request(
                        "/nodes/{node}/storage/{storage}/content",
                        "GET",
                        { $path: { node, storage }, ...(args ?? {}) } as NodesAPI["/nodes/{node}/storage/{storage}/content"]["GET"]["parameters"]
                    ),
            },
        }),
    };
}
