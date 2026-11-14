// Factory for /nodes/{node}/hardware endpoints
import type { Client } from "../../index";
import type { NodesAPI } from "./types";
import type { ArgsTuple, PathContext } from "../index";

export default function hardwareFactory(client: Client) {
    return {
        get: (
            node: string,
            ...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/hardware"]["GET"]["parameters"]>>
        ) => client.request(
            "/nodes/{node}/hardware",
            "GET",
            { ...args[0], $path: { node } }
        ),
        pci: {
            get: (
                node: string,
                ...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/hardware/pci"]["GET"]["parameters"]>>
            ) => client.request(
                "/nodes/{node}/hardware/pci",
                "GET",
                { ...args[0], $path: { node } }
            ),
        },
        usb: {
            get: (
                node: string,
                ...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/hardware/usb"]["GET"]["parameters"]>>
            ) => client.request(
                "/nodes/{node}/hardware/usb",
                "GET",
                { ...args[0], $path: { node } }
            ),
        }
    };
}
