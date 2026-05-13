import type { ClusterAPI } from "./types.js";
import type { ArgsTuple, PathContext } from "../index.js";
import { Client } from "../../index.js";

export function configFactory(client: Client) {
  return {
    index: (...args: ArgsTuple<ClusterAPI["/cluster/config"]["GET"]['parameters']>) => client.request("/cluster/config", "GET", (args[0] ?? {}) as ClusterAPI["/cluster/config"]["GET"]['parameters']),
    apiversion: (...args: ArgsTuple<ClusterAPI["/cluster/config/apiversion"]["GET"]['parameters']>) => client.request("/cluster/config/apiversion", "GET", (args[0] ?? {}) as ClusterAPI["/cluster/config/apiversion"]["GET"]['parameters']),
    nodes: {
      index: (...args: ArgsTuple<ClusterAPI["/cluster/config/nodes"]["GET"]['parameters']>) => client.request("/cluster/config/nodes", "GET", (args[0] ?? {}) as ClusterAPI["/cluster/config/nodes"]["GET"]['parameters']),
      node: (node: string) => ({
        get: (
          ...args: ArgsTuple<PathContext<ClusterAPI["/cluster/config/nodes/{node}"]["GET"]['parameters']>>
        ) =>
          client.request(
            "/cluster/config/nodes/{node}",
            "GET",
            { ...((args[0] ?? {}) as PathContext<ClusterAPI["/cluster/config/nodes/{node}"]["GET"]['parameters']>), $path: { node } }
          ),
        // Add more node endpoints as needed
      })
    },
    join: (...args: ArgsTuple<ClusterAPI["/cluster/config/join"]["POST"]['parameters']>) => client.request("/cluster/config/join", "POST", (args[0] ?? {}) as ClusterAPI["/cluster/config/join"]["POST"]['parameters']),
    totem: (...args: ArgsTuple<ClusterAPI["/cluster/config/totem"]["GET"]['parameters']>) => client.request("/cluster/config/totem", "GET", (args[0] ?? {}) as ClusterAPI["/cluster/config/totem"]["GET"]['parameters']),
    qdevice: (...args: ArgsTuple<ClusterAPI["/cluster/config/qdevice"]["GET"]['parameters']>) => client.request("/cluster/config/qdevice", "GET", (args[0] ?? {}) as ClusterAPI["/cluster/config/qdevice"]["GET"]['parameters'])
  };
}
