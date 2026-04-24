// Factory for /nodes/{node}/hardware endpoints
import { Client } from "../../index.js";
import type { NodesAPI } from "./types.js";
import type { ArgsTuple } from "../index.js";

export function hardwareFactory(client: Client) {
    return {
        get: (
            node: string,
            ...args: ArgsTuple<NodesAPI["/nodes/{node}/hardware"]["GET"]["parameters"]>
        ) => client.request(
            "/nodes/{node}/hardware",
            "GET",
            { $path: { node }, ...(args[0] ?? {}) }
        ),
        pci: {
            get: (
                node: string,
                ...args: ArgsTuple<NodesAPI["/nodes/{node}/hardware/pci"]["GET"]["parameters"]>
            ) => client.request(
                "/nodes/{node}/hardware/pci",
                "GET",
                { $path: { node }, ...(args[0] ?? {}) }
            ),
        },
        usb: {
            get: (
                node: string,
                ...args: ArgsTuple<NodesAPI["/nodes/{node}/hardware/usb"]["GET"]["parameters"]>
            ) => client.request(
                "/nodes/{node}/hardware/usb",
                "GET",
                { $path: { node }, ...(args[0] ?? {}) }
            ),
        }
        // ...repeat for all other endpoints under /nodes/{node}/hardware
        // For brevity, only a representative sample is shown here. Continue this pattern for all endpoints.
    };
}
