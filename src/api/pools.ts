import {Client} from "../index";

export type PoolsAPI = {
    "/pools": {
        "DELETE": {
            parameters: {
                $query?: { "poolid": string },
            }
            return: unknown
        },
        "GET": {
            parameters: {
                $query?: { "poolid"?: string; "type"?: "qemu" | "lxc" | "storage" },
            }
            return: {
                "comment"?: string;
                "members"?: {
                    "id": string;
                    "node": string;
                    "storage"?: string;
                    "type": "qemu" | "lxc" | "openvz" | "storage";
                    "vmid"?: number
                }[];
                "poolid": string
            }[]
        },
        "POST": {
            parameters: {
                $body: { "comment"?: string; "poolid": string },
            }
            return: unknown
        },
        "PUT": {
            parameters: {
                $body: {
                    "allow-move"?: boolean;
                    "comment"?: string;
                    "delete"?: boolean;
                    "poolid": string;
                    "storage"?: string;
                    "vms"?: string
                },
            }
            return: unknown
        }
    },
    "/pools/{poolid}": {
        "DELETE": {
            parameters: {
                $path: { "poolid": string },
            }
            return: unknown
        },
        "GET": {
            parameters: {
                $path: { "poolid": string },
                $query?: { "type"?: "qemu" | "lxc" | "storage" },
            }
            return: {
                "comment"?: string;
                "members": {
                    "id": string;
                    "node": string;
                    "storage"?: string;
                    "type": "qemu" | "lxc" | "openvz" | "storage";
                    "vmid"?: number
                }[]
            }
        },
        "PUT": {
            parameters: {
                $path: { "poolid": string },
                $body: {
                    "allow-move"?: boolean;
                    "comment"?: string;
                    "delete"?: boolean;
                    "storage"?: string;
                    "vms"?: string
                },
            }
            return: unknown
        }
    },
}

export default (client: Client) => ({
    /**
     * Delete pool.
     * @endpoint DELETE /pools
     * @allowToken 1
     * @permissions {"check": ["perm", "/pool/{poolid}", ["Pool.Allocate"]], "description": "You can only delete empty pools (no members)."}
     *
     * Parameters:
     * - `poolid` (query, required, string)
     */
    delete: (args: PoolsAPI["/pools"]["DELETE"]['parameters']) => client.request("/pools", "DELETE", args),
    /**
     * List pools or get pool configuration.
     * @endpoint GET /pools
     * @allowToken 1
     * @permissions {"description": "List all pools where you have Pool.Audit permissions on /pool/<pool>, or the pool specific with {poolid}", "user": "all"}
     *
     * Parameters:
     * - `poolid` (query, optional, string)
     * - `type` (query, optional, "qemu" | "lxc" | "storage")
     */
    index: (args: PoolsAPI["/pools"]["GET"]['parameters']) => client.request("/pools", "GET", args),
    /**
     * Create new pool.
     * @endpoint POST /pools
     * @allowToken 1
     * @permissions {"check": ["perm", "/pool/{poolid}", ["Pool.Allocate"]]}
     *
     * Parameters:
     * - `comment` (body, optional, string)
     * - `poolid` (body, required, string)
     */
    create: (args: PoolsAPI["/pools"]["POST"]['parameters']) => client.request("/pools", "POST", args),
    /**
     * Update pool.
     * @endpoint PUT /pools
     * @allowToken 1
     * @permissions {"check": ["perm", "/pool/{poolid}", ["Pool.Allocate"]], "description": "You also need the right to modify permissions on any object you add/delete."}
     *
     * Parameters:
     * - `allow-move` (body, optional, boolean): Allow adding a guest even if already in another pool. The guest will be removed from its current pool and added to this one.
     * - `comment` (body, optional, string)
     * - `delete` (body, optional, boolean): Remove the passed VMIDs and/or storage IDs instead of adding them.
     * - `poolid` (body, required, string)
     * - `storage` (body, optional, string): List of storage IDs to add or remove from this pool.
     * - `vms` (body, optional, string): List of guest VMIDs to add or remove from this pool.
     */
    update: (args: PoolsAPI["/pools"]["PUT"]['parameters']) => client.request("/pools", "PUT", args),
    id: (poolid: string) => ({
        /**
         * Delete pool (deprecated, no support for nested pools, use 'DELETE /pools/?poolid={poolid}').
         * @endpoint DELETE /pools/{poolid}
         * @allowToken 1
         * @permissions {"check": ["perm", "/pool/{poolid}", ["Pool.Allocate"]], "description": "You can only delete empty pools (no members)."}
         * @deprecated
         * Parameters:
         * - `poolid` (path, required, string)
         */
        delete_deprecated: (args: PoolsAPI["/pools/{poolid}"]["DELETE"]['parameters']) => client.request("/pools/{poolid}", "DELETE", {
            ...args,
            $path: {poolid}
        }),
        /**
         * Get pool configuration (deprecated, no support for nested pools, use 'GET /pools/?poolid={poolid}').
         * @endpoint GET /pools/{poolid}
         * @allowToken 1
         * @permissions {"check": ["perm", "/pool/{poolid}", ["Pool.Audit"]]}
         *
         * Parameters:
         * - `poolid` (path, required, string)
         * - `type` (query, optional, "qemu" | "lxc" | "storage")
         */
        read: (args: PoolsAPI["/pools/{poolid}"]["GET"]['parameters']) => client.request("/pools/{poolid}", "GET", {
            ...args,
            $path: {poolid}
        }),
        /**
         * Update pool data (deprecated, no support for nested pools - use 'PUT /pools/?poolid={poolid}' instead).
         * @endpoint PUT /pools/{poolid}
         * @allowToken 1
         * @permissions {"check": ["perm", "/pool/{poolid}", ["Pool.Allocate"]], "description": "You also need the right to modify permissions on any object you add/delete."}
         * @deprecated
         * Parameters:
         * - `allow-move` (body, optional, boolean): Allow adding a guest even if already in another pool. The guest will be removed from its current pool and added to this one.
         * - `comment` (body, optional, string)
         * - `delete` (body, optional, boolean): Remove the passed VMIDs and/or storage IDs instead of adding them.
         * - `poolid` (path, required, string)
         * - `storage` (body, optional, string): List of storage IDs to add or remove from this pool.
         * - `vms` (body, optional, string): List of guest VMIDs to add or remove from this pool.
         */
        update_deprecated: (args: PoolsAPI["/pools/{poolid}"]["PUT"]['parameters']) => client.request("/pools/{poolid}", "PUT", {
            ...args,
            $path: {poolid}
        })
    })
}) as const
