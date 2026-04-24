// Factory for /nodes/{node}/qemu endpoints
import { Client } from "../../index.js";
import type { NodesAPI } from "./types.js";
import type { ArgsTuple } from "../index.js";

function stripPath<T extends { $path?: any }>(obj: T | undefined): Omit<T, "$path"> | undefined {
    if (!obj) return obj;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { $path, ...rest } = obj;
    return rest;
}

export function qemuFactory(client: Client) {
    return {
        list: (
            node: string,
            ...args: ArgsTuple<NodesAPI["/nodes/{node}/qemu"]["GET"]["parameters"]>
        ) =>
            client.request(
                "/nodes/{node}/qemu",
                "GET",
                { $path: { node }, ...stripPath(args[0]) }
            ),
        create: (
            node: string,
            ...args: ArgsTuple<NodesAPI["/nodes/{node}/qemu"]["POST"]["parameters"]>
        ) =>
            client.request(
                "/nodes/{node}/qemu",
                "POST",
                { $path: { node }, ...stripPath(args[0]) }
            ),
        get: (
            node: string,
            vmid: number,
            ...args: ArgsTuple<NodesAPI["/nodes/{node}/qemu/{vmid}"]["GET"]["parameters"]>
        ) =>
            client.request(
                "/nodes/{node}/qemu/{vmid}",
                "GET",
                { $path: { node, vmid }, ...stripPath(args[0]) }
            ),
        delete: (
            node: string,
            vmid: number,
            ...args: ArgsTuple<NodesAPI["/nodes/{node}/qemu/{vmid}"]["DELETE"]["parameters"]>
        ) =>
            client.request(
                "/nodes/{node}/qemu/{vmid}",
                "DELETE",
                { $path: { node, vmid }, ...stripPath(args[0]) }
            ),
        config: {
            get: (
                node: string,
                vmid: number,
                ...args: ArgsTuple<NodesAPI["/nodes/{node}/qemu/{vmid}/config"]["GET"]["parameters"]>
            ) =>
                client.request(
                    "/nodes/{node}/qemu/{vmid}/config",
                    "GET",
                    { $path: { node, vmid }, ...stripPath(args[0]) }
                ),
            put: (
                node: string,
                vmid: number,
                ...args: ArgsTuple<NodesAPI["/nodes/{node}/qemu/{vmid}/config"]["PUT"]["parameters"]>
            ) =>
                client.request(
                    "/nodes/{node}/qemu/{vmid}/config",
                    "PUT",
                    { $path: { node, vmid }, ...stripPath(args[0]) }
                ),
        },
        clone: (
            node: string,
            vmid: number,
            ...args: ArgsTuple<NodesAPI["/nodes/{node}/qemu/{vmid}/clone"]["POST"]["parameters"]>
        ) =>
            client.request(
                "/nodes/{node}/qemu/{vmid}/clone",
                "POST",
                { $path: { node, vmid }, ...stripPath(args[0]) }
            ),
        // ...repeat for all other endpoints under /nodes/{node}/qemu
        // For brevity, only a representative sample is shown here. Continue this pattern for all endpoints.
    };
}
