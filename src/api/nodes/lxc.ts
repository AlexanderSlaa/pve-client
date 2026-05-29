// Factory for /nodes/{node}/lxc endpoints
import { Client } from "../../index";
import type { NodesAPI } from "./types";
import type { ArgsTuple } from "../index";

function stripPath<T extends { $path?: unknown }>(obj: T | undefined): Omit<T, "$path"> | undefined {
    if (!obj) return obj;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { $path, ...rest } = obj;
    return rest;
}

type LxcPath = NodesAPI["/nodes/{node}/lxc/{vmid}"];
type LxcConfig = NodesAPI["/nodes/{node}/lxc/{vmid}/config"];
type LxcClone = NodesAPI["/nodes/{node}/lxc/{vmid}/clone"];
type LxcInterfaces = NodesAPI["/nodes/{node}/lxc/{vmid}/interfaces"];
type LxcStatusCurrent = NodesAPI["/nodes/{node}/lxc/{vmid}/status/current"];
type LxcStatusStart = NodesAPI["/nodes/{node}/lxc/{vmid}/status/start"];
type LxcStatusStop = NodesAPI["/nodes/{node}/lxc/{vmid}/status/stop"];
type LxcStatusReboot = NodesAPI["/nodes/{node}/lxc/{vmid}/status/reboot"];
type LxcTermproxy = NodesAPI["/nodes/{node}/lxc/{vmid}/termproxy"];
type LxcVncproxy = NodesAPI["/nodes/{node}/lxc/{vmid}/vncproxy"];
type LxcVncwebsocket = NodesAPI["/nodes/{node}/lxc/{vmid}/vncwebsocket"];
type LxcSnapshot = NodesAPI["/nodes/{node}/lxc/{vmid}/snapshot"];

export default function lxcFactory(client: Client) {
    return {
        list: (node: string, ...args: ArgsTuple<NodesAPI["/nodes/{node}/lxc"]["GET"]["parameters"]>) =>
            client.request("/nodes/{node}/lxc", "GET", { $path: { node }, ...stripPath(args[0]) }),

        create: (node: string, ...args: ArgsTuple<NodesAPI["/nodes/{node}/lxc"]["POST"]["parameters"]>) =>
            client.request("/nodes/{node}/lxc", "POST",
                { $path: { node }, ...stripPath(args[0]) } as NodesAPI["/nodes/{node}/lxc"]["POST"]["parameters"]),

        get: (node: string, vmid: number, ...args: ArgsTuple<LxcPath["GET"]["parameters"]>) =>
            client.request("/nodes/{node}/lxc/{vmid}", "GET", { $path: { node, vmid }, ...stripPath(args[0]) }),

        delete: (node: string, vmid: number, ...args: ArgsTuple<LxcPath["DELETE"]["parameters"]>) =>
            client.request("/nodes/{node}/lxc/{vmid}", "DELETE", { $path: { node, vmid }, ...stripPath(args[0]) }),

        clone: (node: string, vmid: number, ...args: ArgsTuple<LxcClone["POST"]["parameters"]>) =>
            client.request("/nodes/{node}/lxc/{vmid}/clone", "POST",
                { $path: { node, vmid }, ...stripPath(args[0]) } as LxcClone["POST"]["parameters"]),

        interfaces: (node: string, vmid: number) =>
            client.request("/nodes/{node}/lxc/{vmid}/interfaces", "GET",
                { $path: { node, vmid } } as LxcInterfaces["GET"]["parameters"]),

        snapshot: {
            list: (node: string, vmid: number) =>
                client.request("/nodes/{node}/lxc/{vmid}/snapshot", "GET",
                    { $path: { node, vmid } } as LxcSnapshot["GET"]["parameters"]),
            create: (node: string, vmid: number, ...args: ArgsTuple<LxcSnapshot["POST"]["parameters"]>) =>
                client.request("/nodes/{node}/lxc/{vmid}/snapshot", "POST",
                    { $path: { node, vmid }, ...stripPath(args[0]) } as LxcSnapshot["POST"]["parameters"]),
        },

        config: {
            get: (node: string, vmid: number, ...args: ArgsTuple<LxcConfig["GET"]["parameters"]>) =>
                client.request("/nodes/{node}/lxc/{vmid}/config", "GET",
                    { $path: { node, vmid }, ...stripPath(args[0]) } as LxcConfig["GET"]["parameters"]),
            put: (node: string, vmid: number, ...args: ArgsTuple<LxcConfig["PUT"]["parameters"]>) =>
                client.request("/nodes/{node}/lxc/{vmid}/config", "PUT",
                    { $path: { node, vmid }, ...stripPath(args[0]) } as LxcConfig["PUT"]["parameters"]),
        },

        status: {
            current: (node: string, vmid: number) =>
                client.request("/nodes/{node}/lxc/{vmid}/status/current", "GET",
                    { $path: { node, vmid } } as LxcStatusCurrent["GET"]["parameters"]),
            start: (node: string, vmid: number, ...args: ArgsTuple<LxcStatusStart["POST"]["parameters"]>) =>
                client.request("/nodes/{node}/lxc/{vmid}/status/start", "POST",
                    { $path: { node, vmid }, ...stripPath(args[0]) } as LxcStatusStart["POST"]["parameters"]),
            stop: (node: string, vmid: number, ...args: ArgsTuple<LxcStatusStop["POST"]["parameters"]>) =>
                client.request("/nodes/{node}/lxc/{vmid}/status/stop", "POST",
                    { $path: { node, vmid }, ...stripPath(args[0]) } as LxcStatusStop["POST"]["parameters"]),
            reboot: (node: string, vmid: number, ...args: ArgsTuple<LxcStatusReboot["POST"]["parameters"]>) =>
                client.request("/nodes/{node}/lxc/{vmid}/status/reboot", "POST",
                    { $path: { node, vmid }, ...stripPath(args[0]) } as LxcStatusReboot["POST"]["parameters"]),
        },

        termproxy: (node: string, vmid: number, ...args: ArgsTuple<LxcTermproxy["POST"]["parameters"]>) =>
            client.request("/nodes/{node}/lxc/{vmid}/termproxy", "POST",
                { $path: { node, vmid }, ...stripPath(args[0]) } as LxcTermproxy["POST"]["parameters"]),

        vncproxy: (node: string, vmid: number, ...args: ArgsTuple<LxcVncproxy["POST"]["parameters"]>) =>
            client.request("/nodes/{node}/lxc/{vmid}/vncproxy", "POST",
                { $path: { node, vmid }, ...stripPath(args[0]) } as LxcVncproxy["POST"]["parameters"]),

        vncwebsocket: (node: string, vmid: number, ...args: ArgsTuple<LxcVncwebsocket["GET"]["parameters"]>) =>
            client.request("/nodes/{node}/lxc/{vmid}/vncwebsocket", "GET",
                { $path: { node, vmid }, ...stripPath(args[0]) } as LxcVncwebsocket["GET"]["parameters"]),
    };
}
