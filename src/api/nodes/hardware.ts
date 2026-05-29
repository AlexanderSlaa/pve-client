// Factory for /nodes/{node}/hardware endpoints
import { Client } from "../../index";
import type { NodesAPI } from "./types";
import type { ArgsTuple } from "../index";

export default function hardwareFactory(client: Client) {
    return {
        get: (
            node: string,
            ...args: ArgsTuple<NodesAPI["/nodes/{node}/hardware"]["GET"]["parameters"]>
        ) => client.request(
            "/nodes/{node}/hardware",
            "GET",
            { ...(args[0] ?? {}), $path: { node } }
        ),
        pci: {
            get: (
                node: string,
                ...args: ArgsTuple<NodesAPI["/nodes/{node}/hardware/pci"]["GET"]["parameters"]>
            ) => client.request(
                "/nodes/{node}/hardware/pci",
                "GET",
                { ...(args[0] ?? {}), $path: { node } }
            ),
        },
        usb: {
            get: (
                node: string,
                ...args: ArgsTuple<NodesAPI["/nodes/{node}/hardware/usb"]["GET"]["parameters"]>
            ) => client.request(
                "/nodes/{node}/hardware/usb",
                "GET",
                { ...(args[0] ?? {}), $path: { node } }
            ),
        }
        // ...repeat for all other endpoints under /nodes/{node}/hardware
        // For brevity, only a representative sample is shown here. Continue this pattern for all endpoints.
    };
}
