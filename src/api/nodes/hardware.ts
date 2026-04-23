// Factory for /nodes/{node}/hardware endpoints
import { Client } from "../../index.js";

export function hardwareFactory(client: Client) {
    return {
        pci: {
            index: () => { throw new Error('Not implemented'); }
        },
        usb: {
            index: () => { throw new Error('Not implemented'); }
        }
    };
}
