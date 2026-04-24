// eslint-disable-next-line @typescript-eslint/no-explicit-any
import type {ArgsTuple} from "./index.js";
import {PathContext} from "./index.js";

export type StorageAPI = {
    "/storage": {
        "GET": { parameters: { $query?: { "type"?: any } } },
        "POST": { parameters: { $body: any } }
    },
    "/storage/{storage}": {
        "DELETE": { parameters: { $path: { "storage": string } } },
        "GET": { parameters: { $path: { "storage": string } } },
        "PUT": { parameters: { $path: { "storage": string }, $body: any } }
    }
};


const Storage = (client: any) => ({
    /**
     * List all storages.
     * @endpoint GET /storage
     */
    index: (...args: ArgsTuple<StorageAPI["/storage"]["GET"]['parameters']>) => client.request("/storage", "GET", (args[0] ?? {}) as StorageAPI["/storage"]["GET"]['parameters']),

    /**
     * Create a new storage.
     * @endpoint POST /storage
     */
    create: (...args: ArgsTuple<StorageAPI["/storage"]["POST"]['parameters']>) => client.request("/storage", "POST", (args[0] ?? {}) as StorageAPI["/storage"]["POST"]['parameters']),

    /**
     * Access a specific storage by name.
     * @endpoint /storage/{storage}
     */
    storage: (value: string) => ({
        /**
         * Get storage config.
         * @endpoint GET /storage/{storage}
         */
        read: (...args: ArgsTuple<PathContext<StorageAPI["/storage/{storage}"]["GET"]['parameters']>>) => client.request("/storage/{storage}", "GET", {
            ...((args[0]) as any),
            $path: { storage: value }
        }),
        /**
         * Update storage config.
         * @endpoint PUT /storage/{storage}
         */
        update: (...args: ArgsTuple<PathContext<StorageAPI["/storage/{storage}"]["PUT"]['parameters']>>) => client.request("/storage/{storage}", "PUT", {
            ...((args[0]) as any),
            $path: { storage: value }
        }),
        /**
         * Delete storage config.
         * @endpoint DELETE /storage/{storage}
         */
        delete: (...args: ArgsTuple<PathContext<StorageAPI["/storage/{storage}"]["DELETE"]['parameters']>>) => client.request("/storage/{storage}", "DELETE", {
            ...((args[0]) as any),
            $path: { storage: value }
        })
    })
});

export default Storage;
