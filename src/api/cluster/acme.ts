import type { ClusterAPI } from "./types";
import type { ArgsTuple, PathContext } from "../index.js";
import { Client } from "../../index.js";

export function acmeFactory(client: Client) {
    return {
        index: (...args: ArgsTuple<ClusterAPI["/cluster/acme"]["GET"]['parameters']>) => client.request("/cluster/acme", "GET", (args[0] ?? {}) as ClusterAPI["/cluster/acme"]["GET"]['parameters']),
        account: {
            index: (...args: ArgsTuple<ClusterAPI["/cluster/acme/account"]["GET"]['parameters']>) => client.request("/cluster/acme/account", "GET", (args[0] ?? {}) as ClusterAPI["/cluster/acme/account"]["GET"]['parameters']),
            register_account: (...args: ArgsTuple<ClusterAPI["/cluster/acme/account"]["POST"]['parameters']>) => client.request("/cluster/acme/account", "POST", (args[0] ?? {}) as ClusterAPI["/cluster/acme/account"]["POST"]['parameters']),
            name: (value: string) => ({
                deactivate: (...args: ArgsTuple<PathContext<ClusterAPI["/cluster/acme/account/{name}"]["DELETE"]['parameters']>>) => client.request("/cluster/acme/account/{name}", "DELETE", { ...((args[0]) as any), $path: { name: value } }),
                get: (...args: ArgsTuple<PathContext<ClusterAPI["/cluster/acme/account/{name}"]["GET"]['parameters']>>) => client.request("/cluster/acme/account/{name}", "GET", { ...((args[0]) as any), $path: { name: value } }),
                update: (...args: ArgsTuple<PathContext<ClusterAPI["/cluster/acme/account/{name}"]["PUT"]['parameters']>>) => client.request("/cluster/acme/account/{name}", "PUT", { ...((args[0]) as any), $path: { name: value } })
            })
        },
        challenges_chema: (...args: ArgsTuple<ClusterAPI["/cluster/acme/challenge-schema"]["GET"]['parameters']>) => client.request("/cluster/acme/challenge-schema", "GET", (args[0] ?? {}) as ClusterAPI["/cluster/acme/challenge-schema"]["GET"]['parameters']),
        directories: (...args: ArgsTuple<ClusterAPI["/cluster/acme/directories"]["GET"]['parameters']>) => client.request("/cluster/acme/directories", "GET", (args[0] ?? {}) as ClusterAPI["/cluster/acme/directories"]["GET"]['parameters']),
        meta: (...args: ArgsTuple<ClusterAPI["/cluster/acme/meta"]["GET"]['parameters']>) => client.request("/cluster/acme/meta", "GET", (args[0] ?? {}) as ClusterAPI["/cluster/acme/meta"]["GET"]['parameters']),
        plugins: {
            options: {
                index: () => { throw new Error('Not implemented'); },
                update: () => { throw new Error('Not implemented'); }
            },
            add: (...args: ArgsTuple<ClusterAPI["/cluster/acme/plugins"]["POST"]['parameters']>) => client.request("/cluster/acme/plugins", "POST", (args[0] ?? {}) as ClusterAPI["/cluster/acme/plugins"]["POST"]['parameters']),
            id: (value: string | number) => ({
                delete: (...args: ArgsTuple<PathContext<ClusterAPI["/cluster/acme/plugins/{id}"]["DELETE"]['parameters']>>) => client.request("/cluster/acme/plugins/{id}", "DELETE", { ...((args[0]) as any), $path: { id: value.toString() } }),
                get_config: (...args: ArgsTuple<PathContext<ClusterAPI["/cluster/acme/plugins/{id}"]["GET"]['parameters']>>) => client.request("/cluster/acme/plugins/{id}", "GET", { ...((args[0]) as any), $path: { id: value.toString() } }),
                update: (...args: ArgsTuple<PathContext<ClusterAPI["/cluster/acme/plugins/{id}"]["PUT"]['parameters']>>) => client.request("/cluster/acme/plugins/{id}", "PUT", { ...((args[0]) as any), $path: { id: value.toString() } })
            })
        },
        tos: (...args: ArgsTuple<ClusterAPI["/cluster/acme/tos"]["GET"]['parameters']>) => client.request("/cluster/acme/tos", "GET", (args[0] ?? {}) as ClusterAPI["/cluster/acme/tos"]["GET"]['parameters'])
    };
}
