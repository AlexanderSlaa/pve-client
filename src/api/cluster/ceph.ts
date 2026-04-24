import type { ClusterAPI } from "../cluster/index.js";
import type { ArgsTuple, PathContext } from "../index.js";
import { Client } from "../../index.js";

export function cephFactory(client: Client) {
    return {
        index: (...args: ArgsTuple<ClusterAPI["/cluster/ceph"]["GET"]['parameters']>) => client.request("/cluster/ceph", "GET", (args[0] ?? {}) as ClusterAPI["/cluster/ceph"]["GET"]['parameters']),
        flags: {
            get_all: (...args: ArgsTuple<ClusterAPI["/cluster/ceph/flags"]["GET"]['parameters']>) => client.request("/cluster/ceph/flags", "GET", (args[0] ?? {}) as ClusterAPI["/cluster/ceph/flags"]["GET"]['parameters']),
            set: (...args: ArgsTuple<ClusterAPI["/cluster/ceph/flags"]["PUT"]['parameters']>) => client.request("/cluster/ceph/flags", "PUT", (args[0] ?? {}) as ClusterAPI["/cluster/ceph/flags"]["PUT"]['parameters']),
            flag: (value: ClusterAPI["/cluster/ceph/flags/{flag}"]["GET"]['parameters']['$path']['flag']) => ({
                get: (...args: ArgsTuple<PathContext<ClusterAPI["/cluster/ceph/flags/{flag}"]["GET"]['parameters']>>) => client.request("/cluster/ceph/flags/{flag}", "GET", { ...((args[0]) as any), $path: { flag: value } }),
                update: (...args: ArgsTuple<PathContext<ClusterAPI["/cluster/ceph/flags/{flag}"]["PUT"]['parameters']>>) => client.request("/cluster/ceph/flags/{flag}", "PUT", { ...((args[0]) as any), $path: { flag: value } })
            })
        },
        metadata: (...args: ArgsTuple<ClusterAPI["/cluster/ceph/metadata"]["GET"]['parameters']>) => client.request("/cluster/ceph/metadata", "GET", (args[0] ?? {}) as ClusterAPI["/cluster/ceph/metadata"]["GET"]['parameters']),
        status: (...args: ArgsTuple<ClusterAPI["/cluster/ceph/status"]["GET"]['parameters']>) => client.request("/cluster/ceph/status", "GET", (args[0] ?? {}) as ClusterAPI["/cluster/ceph/status"]["GET"]['parameters'])
    };
}
