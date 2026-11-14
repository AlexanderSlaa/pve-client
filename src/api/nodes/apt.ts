// Factory for /nodes/{node}/apt endpoints
import type { Client } from "../../index";

import type { NodesAPI } from "./types";
import type { ArgsTuple, PathContext } from "../index";

export default function aptFactory(client: Client) {
    return {
        index: (
            node: string,
            ...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/apt"]["GET"]['parameters']>>
        ) =>
            client.request(
                "/nodes/{node}/apt",
                "GET",
                { ...args[0], $path: { node } }
            ),
        changelog: (
            node: string,
            ...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/apt/changelog"]["GET"]['parameters']>>
        ) =>
            client.request(
                "/nodes/{node}/apt/changelog",
                "GET",
                { ...args[0], $path: { node } }
            ),
        repositories: {
            get: (
                node: string,
                ...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/apt/repositories"]["GET"]['parameters']>>
            ) =>
                client.request(
                    "/nodes/{node}/apt/repositories",
                    "GET",
                    { ...args[0], $path: { node } }
                ),
            post: (
                node: string,
                ...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/apt/repositories"]["POST"]['parameters']>>
            ) =>
                client.request(
                    "/nodes/{node}/apt/repositories",
                    "POST",
                    { ...args[0], $path: { node } }
                ),
            put: (
                node: string,
                ...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/apt/repositories"]["PUT"]['parameters']>>
            ) =>
                client.request(
                    "/nodes/{node}/apt/repositories",
                    "PUT",
                    { ...args[0], $path: { node } }
                ),
        },
        update: {
            get: (
                node: string,
                ...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/apt/update"]["GET"]['parameters']>>
            ) =>
                client.request(
                    "/nodes/{node}/apt/update",
                    "GET",
                    { ...args[0], $path: { node } }
                ),
            post: (
                node: string,
                ...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/apt/update"]["POST"]['parameters']>>
            ) =>
                client.request(
                    "/nodes/{node}/apt/update",
                    "POST",
                    { ...args[0], $path: { node } }
                ),
        },
        versions: (
            node: string,
            ...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/apt/versions"]["GET"]['parameters']>>
        ) =>
            client.request(
                "/nodes/{node}/apt/versions",
                "GET",
                { ...args[0], $path: { node } }
            ),
    };
}
