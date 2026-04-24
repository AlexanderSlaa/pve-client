// Factory for /nodes/{node}/apt endpoints
import { Client } from "../../index.js";

import type { NodesAPI } from "./types.js";
import type { ArgsTuple, PathContext } from "../index.js";
export function aptFactory(client: Client) {
    function stripPath<T extends { $path?: any }>(obj: T | undefined): Omit<T, "$path"> | undefined {
        if (!obj) return obj;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { $path, ...rest } = obj;
        return rest;
    }
    return {
        index: (
            node: string,
            ...args: ArgsTuple<NodesAPI["/nodes/{node}/apt"]["GET"]['parameters']>
        ) =>
            client.request(
                "/nodes/{node}/apt",
                "GET",
                { $path: { node }, ...stripPath(args[0]) }
            ),
        changelog: (
            node: string,
            ...args: ArgsTuple<NodesAPI["/nodes/{node}/apt/changelog"]["GET"]['parameters']>
        ) =>
            client.request(
                "/nodes/{node}/apt/changelog",
                "GET",
                { $path: { node }, ...stripPath(args[0]) }
            ),
        repositories: {
            get: (
                node: string,
                ...args: ArgsTuple<NodesAPI["/nodes/{node}/apt/repositories"]["GET"]['parameters']>
            ) =>
                client.request(
                    "/nodes/{node}/apt/repositories",
                    "GET",
                    { $path: { node }, ...stripPath(args[0]) }
                ),
            post: (
                node: string,
                ...args: ArgsTuple<NodesAPI["/nodes/{node}/apt/repositories"]["POST"]['parameters']>
            ) =>
                client.request(
                    "/nodes/{node}/apt/repositories",
                    "POST",
                    { $path: { node }, ...stripPath(args[0]) }
                ),
            put: (
                node: string,
                ...args: ArgsTuple<NodesAPI["/nodes/{node}/apt/repositories"]["PUT"]['parameters']>
            ) =>
                client.request(
                    "/nodes/{node}/apt/repositories",
                    "PUT",
                    { $path: { node }, ...stripPath(args[0]) }
                ),
        },
        update: {
            get: (
                node: string,
                ...args: ArgsTuple<NodesAPI["/nodes/{node}/apt/update"]["GET"]['parameters']>
            ) =>
                client.request(
                    "/nodes/{node}/apt/update",
                    "GET",
                    { $path: { node }, ...stripPath(args[0]) }
                ),
            post: (
                node: string,
                ...args: ArgsTuple<NodesAPI["/nodes/{node}/apt/update"]["POST"]['parameters']>
            ) =>
                client.request(
                    "/nodes/{node}/apt/update",
                    "POST",
                    { $path: { node }, ...stripPath(args[0]) }
                ),
        },
        versions: (
            node: string,
            ...args: ArgsTuple<NodesAPI["/nodes/{node}/apt/versions"]["GET"]['parameters']>
        ) =>
            client.request(
                "/nodes/{node}/apt/versions",
                "GET",
                { $path: { node }, ...stripPath(args[0]) }
            ),
    };
}
