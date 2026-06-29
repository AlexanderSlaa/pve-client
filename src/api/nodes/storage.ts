// Factory for /nodes/{node}/storage endpoints
import type { Client } from "../../index";
import type { ArgsTuple } from "../index";
import type { NodesAPI } from "./types";

type N = NodesAPI;
type Method<P extends keyof N> = Extract<keyof N[P], "GET" | "POST" | "PUT" | "DELETE" | "PATCH">;
type Params<P extends keyof N, M extends Method<P>> =
    N[P][M] extends { parameters: infer T } ? T : never;
type BoundParams<P extends keyof N, M extends Method<P>> = Omit<Params<P, M>, "$path">;

export default function nodeStorageFactory(client: Client, node: string) {
    return {
        /** Lists all storages on this node. */
        list: (args?: Omit<NodesAPI["/nodes/{node}/storage"]["GET"]["parameters"], "$path">) =>
            client.request("/nodes/{node}/storage", "GET",
                { $path: { node }, ...(args ?? {}) } as NodesAPI["/nodes/{node}/storage"]["GET"]["parameters"]),

        /** Returns storage-scoped sub-APIs pre-bound to node + storage. */
        get: (storage: string) => ({
            get: (...args: ArgsTuple<BoundParams<"/nodes/{node}/storage/{storage}", "GET">>) =>
                client.request("/nodes/{node}/storage/{storage}", "GET", { ...(args[0] ?? {}), $path: { node, storage } }),

            status: () => client.request("/nodes/{node}/storage/{storage}/status", "GET", { $path: { node, storage } }),
            rrd: (...args: ArgsTuple<BoundParams<"/nodes/{node}/storage/{storage}/rrd", "GET">>) =>
                client.request("/nodes/{node}/storage/{storage}/rrd", "GET", { ...(args[0] ?? {}), $path: { node, storage } }),
            rrddata: (...args: ArgsTuple<BoundParams<"/nodes/{node}/storage/{storage}/rrddata", "GET">>) =>
                client.request("/nodes/{node}/storage/{storage}/rrddata", "GET", { ...(args[0] ?? {}), $path: { node, storage } }),
            identity: () => client.request("/nodes/{node}/storage/{storage}/identity", "GET", { $path: { node, storage } }),

            upload: (...args: ArgsTuple<BoundParams<"/nodes/{node}/storage/{storage}/upload", "POST">>) =>
                client.request("/nodes/{node}/storage/{storage}/upload", "POST", { ...(args[0] ?? {}), $path: { node, storage } }),
            download_url: (...args: ArgsTuple<BoundParams<"/nodes/{node}/storage/{storage}/download-url", "POST">>) =>
                client.request("/nodes/{node}/storage/{storage}/download-url", "POST", { ...(args[0] ?? {}), $path: { node, storage } }),
            import_metadata: (...args: ArgsTuple<BoundParams<"/nodes/{node}/storage/{storage}/import-metadata", "GET">>) =>
                client.request("/nodes/{node}/storage/{storage}/import-metadata", "GET", { ...(args[0] ?? {}), $path: { node, storage } }),
            oci_pull: (...args: ArgsTuple<BoundParams<"/nodes/{node}/storage/{storage}/oci-registry-pull", "POST">>) =>
                client.request("/nodes/{node}/storage/{storage}/oci-registry-pull", "POST", { ...(args[0] ?? {}), $path: { node, storage } }),

            prunebackups: {
                list: (...args: ArgsTuple<BoundParams<"/nodes/{node}/storage/{storage}/prunebackups", "GET">>) =>
                    client.request("/nodes/{node}/storage/{storage}/prunebackups", "GET", { ...(args[0] ?? {}), $path: { node, storage } }),
                delete: (...args: ArgsTuple<BoundParams<"/nodes/{node}/storage/{storage}/prunebackups", "DELETE">>) =>
                    client.request("/nodes/{node}/storage/{storage}/prunebackups", "DELETE", { ...(args[0] ?? {}), $path: { node, storage } }),
            },

            file_restore: {
                list: (...args: ArgsTuple<BoundParams<"/nodes/{node}/storage/{storage}/file-restore/list", "GET">>) =>
                    client.request("/nodes/{node}/storage/{storage}/file-restore/list", "GET", { ...(args[0] ?? {}), $path: { node, storage } }),
                download: (...args: ArgsTuple<BoundParams<"/nodes/{node}/storage/{storage}/file-restore/download", "GET">>) =>
                    client.request("/nodes/{node}/storage/{storage}/file-restore/download", "GET", { ...(args[0] ?? {}), $path: { node, storage } }),
            },

            content: {
                list:   (args?: Omit<NodesAPI["/nodes/{node}/storage/{storage}/content"]["GET"]["parameters"], "$path">) =>
                    client.request("/nodes/{node}/storage/{storage}/content", "GET",
                        { $path: { node, storage }, ...(args ?? {}) } as NodesAPI["/nodes/{node}/storage/{storage}/content"]["GET"]["parameters"]),
                upload: (...args: ArgsTuple<BoundParams<"/nodes/{node}/storage/{storage}/content", "POST">>) =>
                    client.request("/nodes/{node}/storage/{storage}/content", "POST", { ...(args[0] ?? {}), $path: { node, storage } }),
                volume: (volume: string) => ({
                    get: () => client.request("/nodes/{node}/storage/{storage}/content/{volume}", "GET", { $path: { node, storage, volume } }),
                    update: (...args: ArgsTuple<BoundParams<"/nodes/{node}/storage/{storage}/content/{volume}", "PUT">>) =>
                        client.request("/nodes/{node}/storage/{storage}/content/{volume}", "PUT", { ...(args[0] ?? {}), $path: { node, storage, volume } }),
                    delete: (...args: ArgsTuple<BoundParams<"/nodes/{node}/storage/{storage}/content/{volume}", "DELETE">>) =>
                        client.request("/nodes/{node}/storage/{storage}/content/{volume}", "DELETE", { ...(args[0] ?? {}), $path: { node, storage, volume } }),
                    copy: (...args: ArgsTuple<BoundParams<"/nodes/{node}/storage/{storage}/content/{volume}", "POST">>) =>
                        client.request("/nodes/{node}/storage/{storage}/content/{volume}", "POST", { ...(args[0] ?? {}), $path: { node, storage, volume } }),
                }),
            },
        }),
    };
}
