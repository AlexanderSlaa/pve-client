// Factory for /nodes/{node}/storage endpoints
import type { Client } from "../../index";
import type { NodesAPI } from "./types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type A = any;

export default function nodeStorageFactory(client: Client, node: string) {
    const r = (path: string, method: string, args?: A) =>
        (client.request as A)(path, method, args ?? {});

    return {
        /** Lists all storages on this node. */
        list: (args?: Omit<NodesAPI["/nodes/{node}/storage"]["GET"]["parameters"], "$path">) =>
            client.request("/nodes/{node}/storage", "GET",
                { $path: { node }, ...(args ?? {}) } as NodesAPI["/nodes/{node}/storage"]["GET"]["parameters"]),

        /** Returns storage-scoped sub-APIs pre-bound to node + storage. */
        get: (storage: string) => ({
            get:    (args?: A) => r("/nodes/{node}/storage/{storage}", "GET",    { ...args, $path: { node, storage } }),
            update: (args?: A) => r("/nodes/{node}/storage/{storage}", "PUT",    { ...args, $path: { node, storage } }),
            delete: (args?: A) => r("/nodes/{node}/storage/{storage}", "DELETE", { ...args, $path: { node, storage } }),

            status:   () => r("/nodes/{node}/storage/{storage}/status",          "GET", { $path: { node, storage } }),
            rrd:      (args?: A) => r("/nodes/{node}/storage/{storage}/rrd",     "GET", { ...args, $path: { node, storage } }),
            rrddata:  (args?: A) => r("/nodes/{node}/storage/{storage}/rrddata", "GET", { ...args, $path: { node, storage } }),
            identity: () => r("/nodes/{node}/storage/{storage}/identity",         "GET", { $path: { node, storage } }),

            upload:          (args?: A) => r("/nodes/{node}/storage/{storage}/upload",          "POST", { ...args, $path: { node, storage } }),
            download_url:    (args?: A) => r("/nodes/{node}/storage/{storage}/download-url",    "POST", { ...args, $path: { node, storage } }),
            import_metadata: (args?: A) => r("/nodes/{node}/storage/{storage}/import-metadata", "GET",  { ...args, $path: { node, storage } }),
            oci_pull:        (args?: A) => r("/nodes/{node}/storage/{storage}/oci-registry-pull","POST", { ...args, $path: { node, storage } }),

            prunebackups: {
                list:   (args?: A) => r("/nodes/{node}/storage/{storage}/prunebackups", "GET",    { ...args, $path: { node, storage } }),
                delete: (args?: A) => r("/nodes/{node}/storage/{storage}/prunebackups", "DELETE", { ...args, $path: { node, storage } }),
            },

            file_restore: {
                list:     (args?: A) => r("/nodes/{node}/storage/{storage}/file-restore/list",     "GET", { ...args, $path: { node, storage } }),
                download: (args?: A) => r("/nodes/{node}/storage/{storage}/file-restore/download", "GET", { ...args, $path: { node, storage } }),
            },

            content: {
                list:   (args?: Omit<NodesAPI["/nodes/{node}/storage/{storage}/content"]["GET"]["parameters"], "$path">) =>
                    client.request("/nodes/{node}/storage/{storage}/content", "GET",
                        { $path: { node, storage }, ...(args ?? {}) } as NodesAPI["/nodes/{node}/storage/{storage}/content"]["GET"]["parameters"]),
                upload: (args?: A) => r("/nodes/{node}/storage/{storage}/content", "POST", { ...args, $path: { node, storage } }),
                volume: (volume: string) => ({
                    get:    () => r("/nodes/{node}/storage/{storage}/content/{volume}", "GET",    { $path: { node, storage, volume } }),
                    update: (args?: A) => r("/nodes/{node}/storage/{storage}/content/{volume}", "PUT",    { ...args, $path: { node, storage, volume } }),
                    delete: (args?: A) => r("/nodes/{node}/storage/{storage}/content/{volume}", "DELETE", { ...args, $path: { node, storage, volume } }),
                    copy:   (args?: A) => r("/nodes/{node}/storage/{storage}/content/{volume}", "POST",   { ...args, $path: { node, storage, volume } }),
                }),
            },
        }),
    };
}
