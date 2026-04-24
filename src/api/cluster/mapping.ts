import type { Client } from "../../index.js";
import type { ClusterAPI } from "./types.js";
import type { ArgsTuple, PathContext } from "../index.js";

export function mappingFactory(client: Client) {
    return {
        index: (
            ...args: ArgsTuple<ClusterAPI["/cluster/mapping"]["GET"]['parameters']>
        ) =>
            client.request(
                "/cluster/mapping",
                "GET",
                (args[0] ?? {}) as ClusterAPI["/cluster/mapping"]["GET"]['parameters']
            ),
        dir: {
            index: (
                ...args: ArgsTuple<ClusterAPI["/cluster/mapping/dir"]["GET"]['parameters']>
            ) =>
                client.request(
                    "/cluster/mapping/dir",
                    "GET",
                    (args[0] ?? {}) as ClusterAPI["/cluster/mapping/dir"]["GET"]['parameters']
                ),
            create: (
                ...args: ArgsTuple<ClusterAPI["/cluster/mapping/dir"]["POST"]['parameters']>
            ) =>
                client.request(
                    "/cluster/mapping/dir",
                    "POST",
                    (args[0] ?? {}) as ClusterAPI["/cluster/mapping/dir"]["POST"]['parameters']
                ),
            id: (id: string) => ({
                delete: (
                    ...args: ArgsTuple<PathContext<ClusterAPI["/cluster/mapping/dir/{id}"]["DELETE"]['parameters']>>
                ) =>
                    client.request(
                        "/cluster/mapping/dir/{id}",
                        "DELETE",
                        { ...((args[0]) as any), $path: { id } }
                    ),
                get: (
                    ...args: ArgsTuple<PathContext<ClusterAPI["/cluster/mapping/dir/{id}"]["GET"]['parameters']>>
                ) =>
                    client.request(
                        "/cluster/mapping/dir/{id}",
                        "GET",
                        { ...((args[0]) as any), $path: { id } }
                    ),
                update: (
                    ...args: ArgsTuple<PathContext<ClusterAPI["/cluster/mapping/dir/{id}"]["PUT"]['parameters']>>
                ) =>
                    client.request(
                        "/cluster/mapping/dir/{id}",
                        "PUT",
                        { ...((args[0]) as any), $path: { id } }
                    ),
            }),
        },
        pci: {
            index: (
                ...args: ArgsTuple<ClusterAPI["/cluster/mapping/pci"]["GET"]['parameters']>
            ) =>
                client.request(
                    "/cluster/mapping/pci",
                    "GET",
                    (args[0] ?? {}) as ClusterAPI["/cluster/mapping/pci"]["GET"]['parameters']
                ),
            create: (
                ...args: ArgsTuple<ClusterAPI["/cluster/mapping/pci"]["POST"]['parameters']>
            ) =>
                client.request(
                    "/cluster/mapping/pci",
                    "POST",
                    (args[0] ?? {}) as ClusterAPI["/cluster/mapping/pci"]["POST"]['parameters']
                ),
            id: (id: string) => ({
                delete: (
                    ...args: ArgsTuple<PathContext<ClusterAPI["/cluster/mapping/pci/{id}"]["DELETE"]['parameters']>>
                ) =>
                    client.request(
                        "/cluster/mapping/pci/{id}",
                        "DELETE",
                        { ...((args[0]) as any), $path: { id } }
                    ),
                get: (
                    ...args: ArgsTuple<PathContext<ClusterAPI["/cluster/mapping/pci/{id}"]["GET"]['parameters']>>
                ) =>
                    client.request(
                        "/cluster/mapping/pci/{id}",
                        "GET",
                        { ...((args[0]) as any), $path: { id } }
                    ),
                update: (
                    ...args: ArgsTuple<PathContext<ClusterAPI["/cluster/mapping/pci/{id}"]["PUT"]['parameters']>>
                ) =>
                    client.request(
                        "/cluster/mapping/pci/{id}",
                        "PUT",
                        { ...((args[0]) as any), $path: { id } }
                    ),
            }),
        },
        usb: {
            index: (
                ...args: ArgsTuple<ClusterAPI["/cluster/mapping/usb"]["GET"]['parameters']>
            ) =>
                client.request(
                    "/cluster/mapping/usb",
                    "GET",
                    (args[0] ?? {}) as ClusterAPI["/cluster/mapping/usb"]["GET"]['parameters']
                ),
            create: (
                ...args: ArgsTuple<ClusterAPI["/cluster/mapping/usb"]["POST"]['parameters']>
            ) =>
                client.request(
                    "/cluster/mapping/usb",
                    "POST",
                    (args[0] ?? {}) as ClusterAPI["/cluster/mapping/usb"]["POST"]['parameters']
                ),
            id: (id: string) => ({
                delete: (
                    ...args: ArgsTuple<PathContext<ClusterAPI["/cluster/mapping/usb/{id}"]["DELETE"]['parameters']>>
                ) =>
                    client.request(
                        "/cluster/mapping/usb/{id}",
                        "DELETE",
                        { ...((args[0]) as any), $path: { id } }
                    ),
                get: (
                    ...args: ArgsTuple<PathContext<ClusterAPI["/cluster/mapping/usb/{id}"]["GET"]['parameters']>>
                ) =>
                    client.request(
                        "/cluster/mapping/usb/{id}",
                        "GET",
                        { ...((args[0]) as any), $path: { id } }
                    ),
                update: (
                    ...args: ArgsTuple<PathContext<ClusterAPI["/cluster/mapping/usb/{id}"]["PUT"]['parameters']>>
                ) =>
                    client.request(
                        "/cluster/mapping/usb/{id}",
                        "PUT",
                        { ...((args[0]) as any), $path: { id } }
                    ),
            }),
        },
    };
}
