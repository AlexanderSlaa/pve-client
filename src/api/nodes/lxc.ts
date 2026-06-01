// Factory for /nodes/{node}/lxc endpoints
import { Client } from "../../index.js";
import type { NodesAPI } from "./types.js";
import type { ArgsTuple } from "../index.js";

function stripPath<T extends { $path?: unknown }>(obj: T | undefined): Omit<T, "$path"> | undefined {
    if (!obj) return obj;
    const copy = {...obj};
    delete copy.$path;
    return copy as Omit<T, "$path">;
}

export function lxcFactory(client: Client) {
    return {
        list: (
            node: string,
            ...args: ArgsTuple<NodesAPI["/nodes/{node}/lxc"]["GET"]["parameters"]>
        ) =>
            client.request(
                "/nodes/{node}/lxc",
                "GET",
                { $path: { node }, ...stripPath(args[0]) }
            ),
        create: (
            node: string,
            ...args: ArgsTuple<NodesAPI["/nodes/{node}/lxc"]["POST"]["parameters"]>
        ) =>
            client.request(
                "/nodes/{node}/lxc",
                "POST",
                { $path: { node }, ...stripPath(args[0]) } as NodesAPI["/nodes/{node}/lxc"]["POST"]["parameters"]
            ),
        get: (
            node: string,
            vmid: number,
            ...args: ArgsTuple<NodesAPI["/nodes/{node}/lxc/{vmid}"]["GET"]["parameters"]>
        ) =>
            client.request(
                "/nodes/{node}/lxc/{vmid}",
                "GET",
                { $path: { node, vmid }, ...stripPath(args[0]) }
            ),
        delete: (
            node: string,
            vmid: number,
            ...args: ArgsTuple<NodesAPI["/nodes/{node}/lxc/{vmid}"]["DELETE"]["parameters"]>
        ) =>
            client.request(
                "/nodes/{node}/lxc/{vmid}",
                "DELETE",
                { $path: { node, vmid }, ...stripPath(args[0]) }
            ),
        config: {
            get: (
                node: string,
                vmid: number,
                ...args: ArgsTuple<NodesAPI["/nodes/{node}/lxc/{vmid}/config"]["GET"]["parameters"]>
            ) =>
                client.request(
                    "/nodes/{node}/lxc/{vmid}/config",
                    "GET",
                    { $path: { node, vmid }, ...stripPath(args[0]) }
                ),
            put: (
                node: string,
                vmid: number,
                ...args: ArgsTuple<NodesAPI["/nodes/{node}/lxc/{vmid}/config"]["PUT"]["parameters"]>
            ) =>
                client.request(
                    "/nodes/{node}/lxc/{vmid}/config",
                    "PUT",
                    { $path: { node, vmid }, ...stripPath(args[0]) } as NodesAPI["/nodes/{node}/lxc/{vmid}/config"]["PUT"]["parameters"]
                ),
        },
        clone: (
            node: string,
            vmid: number,
            ...args: ArgsTuple<NodesAPI["/nodes/{node}/lxc/{vmid}/clone"]["POST"]["parameters"]>
        ) =>
            client.request(
                "/nodes/{node}/lxc/{vmid}/clone",
                "POST",
                { $path: { node, vmid }, ...stripPath(args[0]) } as NodesAPI["/nodes/{node}/lxc/{vmid}/clone"]["POST"]["parameters"]
            ),
        // ...repeat for all other endpoints under /nodes/{node}/lxc
        // For brevity, only a representative sample is shown here. Continue this pattern for all endpoints.
    };
}
