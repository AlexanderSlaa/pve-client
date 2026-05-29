// Factory for /nodes/{node}/qemu endpoints
import { Client } from "../../index";
import type { NodesAPI } from "./types";
import type { ArgsTuple } from "../index";

function stripPath<T extends { $path?: unknown }>(obj: T | undefined): Omit<T, "$path"> | undefined {
    if (!obj) return obj;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { $path, ...rest } = obj;
    return rest;
}

type QemuPath = NodesAPI["/nodes/{node}/qemu/{vmid}"];
type QemuConfig = NodesAPI["/nodes/{node}/qemu/{vmid}/config"];
type QemuClone = NodesAPI["/nodes/{node}/qemu/{vmid}/clone"];
type QemuAgent = NodesAPI["/nodes/{node}/qemu/{vmid}/agent"];
type QemuStatusCurrent = NodesAPI["/nodes/{node}/qemu/{vmid}/status/current"];
type QemuStatusStart = NodesAPI["/nodes/{node}/qemu/{vmid}/status/start"];
type QemuStatusStop = NodesAPI["/nodes/{node}/qemu/{vmid}/status/stop"];
type QemuStatusReboot = NodesAPI["/nodes/{node}/qemu/{vmid}/status/reboot"];
type QemuTermproxy = NodesAPI["/nodes/{node}/qemu/{vmid}/termproxy"];
type QemuVncproxy = NodesAPI["/nodes/{node}/qemu/{vmid}/vncproxy"];
type QemuVncwebsocket = NodesAPI["/nodes/{node}/qemu/{vmid}/vncwebsocket"];
type QemuSnapshot = NodesAPI["/nodes/{node}/qemu/{vmid}/snapshot"];
type QemuMigrate = NodesAPI["/nodes/{node}/qemu/{vmid}/migrate"];

export default function qemuFactory(client: Client) {
    return {
        list: (node: string, ...args: ArgsTuple<NodesAPI["/nodes/{node}/qemu"]["GET"]["parameters"]>) =>
            client.request("/nodes/{node}/qemu", "GET", { $path: { node }, ...stripPath(args[0]) }),

        create: (node: string, ...args: ArgsTuple<NodesAPI["/nodes/{node}/qemu"]["POST"]["parameters"]>) =>
            client.request("/nodes/{node}/qemu", "POST",
                { $path: { node }, ...stripPath(args[0]) } as NodesAPI["/nodes/{node}/qemu"]["POST"]["parameters"]),

        get: (node: string, vmid: number, ...args: ArgsTuple<QemuPath["GET"]["parameters"]>) =>
            client.request("/nodes/{node}/qemu/{vmid}", "GET", { $path: { node, vmid }, ...stripPath(args[0]) }),

        delete: (node: string, vmid: number, ...args: ArgsTuple<QemuPath["DELETE"]["parameters"]>) =>
            client.request("/nodes/{node}/qemu/{vmid}", "DELETE", { $path: { node, vmid }, ...stripPath(args[0]) }),

        clone: (node: string, vmid: number, ...args: ArgsTuple<QemuClone["POST"]["parameters"]>) =>
            client.request("/nodes/{node}/qemu/{vmid}/clone", "POST",
                { $path: { node, vmid }, ...stripPath(args[0]) } as QemuClone["POST"]["parameters"]),

        migrate: (node: string, vmid: number, ...args: ArgsTuple<QemuMigrate["POST"]["parameters"]>) =>
            client.request("/nodes/{node}/qemu/{vmid}/migrate", "POST",
                { $path: { node, vmid }, ...stripPath(args[0]) } as QemuMigrate["POST"]["parameters"]),

        agent: (node: string, vmid: number, ...args: ArgsTuple<QemuAgent["GET"]["parameters"]>) =>
            client.request("/nodes/{node}/qemu/{vmid}/agent", "GET",
                { $path: { node, vmid }, ...stripPath(args[0]) } as QemuAgent["GET"]["parameters"]),

        snapshot: {
            list: (node: string, vmid: number) =>
                client.request("/nodes/{node}/qemu/{vmid}/snapshot", "GET",
                    { $path: { node, vmid } } as QemuSnapshot["GET"]["parameters"]),
            create: (node: string, vmid: number, ...args: ArgsTuple<QemuSnapshot["POST"]["parameters"]>) =>
                client.request("/nodes/{node}/qemu/{vmid}/snapshot", "POST",
                    { $path: { node, vmid }, ...stripPath(args[0]) } as QemuSnapshot["POST"]["parameters"]),
        },

        config: {
            get: (node: string, vmid: number, ...args: ArgsTuple<QemuConfig["GET"]["parameters"]>) =>
                client.request("/nodes/{node}/qemu/{vmid}/config", "GET",
                    { $path: { node, vmid }, ...stripPath(args[0]) } as QemuConfig["GET"]["parameters"]),
            post: (node: string, vmid: number, ...args: ArgsTuple<QemuConfig["POST"]["parameters"]>) =>
                client.request("/nodes/{node}/qemu/{vmid}/config", "POST",
                    { $path: { node, vmid }, ...stripPath(args[0]) } as QemuConfig["POST"]["parameters"]),
            put: (node: string, vmid: number, ...args: ArgsTuple<QemuConfig["PUT"]["parameters"]>) =>
                client.request("/nodes/{node}/qemu/{vmid}/config", "PUT",
                    { $path: { node, vmid }, ...stripPath(args[0]) } as QemuConfig["PUT"]["parameters"]),
        },

        status: {
            current: (node: string, vmid: number) =>
                client.request("/nodes/{node}/qemu/{vmid}/status/current", "GET",
                    { $path: { node, vmid } } as QemuStatusCurrent["GET"]["parameters"]),
            start: (node: string, vmid: number, ...args: ArgsTuple<QemuStatusStart["POST"]["parameters"]>) =>
                client.request("/nodes/{node}/qemu/{vmid}/status/start", "POST",
                    { $path: { node, vmid }, ...stripPath(args[0]) } as QemuStatusStart["POST"]["parameters"]),
            stop: (node: string, vmid: number, ...args: ArgsTuple<QemuStatusStop["POST"]["parameters"]>) =>
                client.request("/nodes/{node}/qemu/{vmid}/status/stop", "POST",
                    { $path: { node, vmid }, ...stripPath(args[0]) } as QemuStatusStop["POST"]["parameters"]),
            reboot: (node: string, vmid: number, ...args: ArgsTuple<QemuStatusReboot["POST"]["parameters"]>) =>
                client.request("/nodes/{node}/qemu/{vmid}/status/reboot", "POST",
                    { $path: { node, vmid }, ...stripPath(args[0]) } as QemuStatusReboot["POST"]["parameters"]),
        },

        termproxy: (node: string, vmid: number, ...args: ArgsTuple<QemuTermproxy["POST"]["parameters"]>) =>
            client.request("/nodes/{node}/qemu/{vmid}/termproxy", "POST",
                { $path: { node, vmid }, ...stripPath(args[0]) } as QemuTermproxy["POST"]["parameters"]),

        vncproxy: (node: string, vmid: number, ...args: ArgsTuple<QemuVncproxy["POST"]["parameters"]>) =>
            client.request("/nodes/{node}/qemu/{vmid}/vncproxy", "POST",
                { $path: { node, vmid }, ...stripPath(args[0]) } as QemuVncproxy["POST"]["parameters"]),

        vncwebsocket: (node: string, vmid: number, ...args: ArgsTuple<QemuVncwebsocket["GET"]["parameters"]>) =>
            client.request("/nodes/{node}/qemu/{vmid}/vncwebsocket", "GET",
                { $path: { node, vmid }, ...stripPath(args[0]) } as QemuVncwebsocket["GET"]["parameters"]),
    };
}
