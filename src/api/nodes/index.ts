
export { hardwareFactory } from "./hardware";
export { aptFactory } from "./apt";
export { cephFactory } from "./ceph";
export { lxcFactory } from "./lxc";
export { qemuFactory } from "./qemu";
export { firewallFactory } from "./firewall";
export { disksFactory } from "./disks";


import { aptFactory } from "./apt";
import { cephFactory } from "./ceph";
import { disksFactory } from "./disks";
import { firewallFactory } from "./firewall";
import { hardwareFactory } from "./hardware";
import { lxcFactory } from "./lxc";
import { qemuFactory } from "./qemu";
import type { Client } from "../../index";
import type { NodesAPI } from "./types";
import nodeStorageFactory from "./storage";

function Nodes(client: Client) {
	return {
		/** Lists all cluster nodes. Calls GET /nodes. */
		list: (): Promise<NodesAPI["/nodes"]["GET"]["return"]> =>
			client.request("/nodes", "GET", {}),

		/** Returns node-scoped sub-APIs for the given node name. All sub-APIs have node pre-bound. */
		get: (node: string) => {
			const qemuApi = qemuFactory(client);
			const lxcApi = lxcFactory(client);
			const aptApi = aptFactory(client);
			const cephApi = cephFactory(client);
			const disksApi = disksFactory(client);
			const firewallApi = firewallFactory(client);
			const hardwareApi = hardwareFactory(client);

			return {
				apt: {
					index: (args?: Parameters<typeof aptApi.index>[1]) => aptApi.index(node, args as Parameters<typeof aptApi.index>[1]),
					changelog: (args?: Parameters<typeof aptApi.changelog>[1]) => aptApi.changelog(node, args as Parameters<typeof aptApi.changelog>[1]),
				},
				ceph: {
					index: (args?: Parameters<typeof cephApi.index>[1]) => cephApi.index(node, args as Parameters<typeof cephApi.index>[1]),
					cfg: (args?: Parameters<typeof cephApi.cfg>[1]) => cephApi.cfg(node, args as Parameters<typeof cephApi.cfg>[1]),
				},
				disks: {
					list: (args?: Parameters<typeof disksApi.list>[1]) => disksApi.list(node, args as Parameters<typeof disksApi.list>[1]),
				},
				firewall: {
					get: (args?: Parameters<typeof firewallApi.get>[1]) => firewallApi.get(node, args as Parameters<typeof firewallApi.get>[1]),
				},
				hardware: {
					get: (args?: Parameters<typeof hardwareApi.get>[1]) => hardwareApi.get(node, args as Parameters<typeof hardwareApi.get>[1]),
					pci: {
						get: (args?: Parameters<typeof hardwareApi.pci.get>[1]) => hardwareApi.pci.get(node, args as Parameters<typeof hardwareApi.pci.get>[1]),
					},
					usb: {
						get: (args?: Parameters<typeof hardwareApi.usb.get>[1]) => hardwareApi.usb.get(node, args as Parameters<typeof hardwareApi.usb.get>[1]),
					},
				},
				storage: nodeStorageFactory(client, node),
				qemu: {
					...qemuApi,
					/** Lists VMs on this node. Node is pre-bound; pass remaining args or omit. */
					list: (args?: Parameters<typeof qemuApi.list>[1]) =>
						qemuApi.list(node, args as Parameters<typeof qemuApi.list>[1]),
					/** Returns per-VM operations pre-bound to this node and vmid. */
					vmid: (vmid: number) => ({
						delete: (args?: Omit<NodesAPI["/nodes/{node}/qemu/{vmid}"]["DELETE"]["parameters"], "$path">) =>
							qemuApi.delete(node, vmid, ({ $path: { node, vmid }, ...(args ?? {}) } as NodesAPI["/nodes/{node}/qemu/{vmid}"]["DELETE"]["parameters"])),
						clone: (args: Omit<NodesAPI["/nodes/{node}/qemu/{vmid}/clone"]["POST"]["parameters"], "$path">) =>
							client.request(
								"/nodes/{node}/qemu/{vmid}/clone",
								"POST",
								{ $path: { node, vmid }, ...(args ?? {}) } as NodesAPI["/nodes/{node}/qemu/{vmid}/clone"]["POST"]["parameters"]
							),
						status: {
							start: (args?: NodesAPI["/nodes/{node}/qemu/{vmid}/status/start"]["POST"]["parameters"]) =>
								client.request(
									"/nodes/{node}/qemu/{vmid}/status/start",
									"POST",
									{ $path: { node, vmid }, ...(args as object) } as NodesAPI["/nodes/{node}/qemu/{vmid}/status/start"]["POST"]["parameters"]
								),
							stop: (args?: NodesAPI["/nodes/{node}/qemu/{vmid}/status/stop"]["POST"]["parameters"]) =>
								client.request(
									"/nodes/{node}/qemu/{vmid}/status/stop",
									"POST",
									{ $path: { node, vmid }, ...(args as object) } as NodesAPI["/nodes/{node}/qemu/{vmid}/status/stop"]["POST"]["parameters"]
								),
							reboot: (args?: NodesAPI["/nodes/{node}/qemu/{vmid}/status/reboot"]["POST"]["parameters"]) =>
								client.request(
									"/nodes/{node}/qemu/{vmid}/status/reboot",
									"POST",
									{ $path: { node, vmid }, ...(args as object) } as NodesAPI["/nodes/{node}/qemu/{vmid}/status/reboot"]["POST"]["parameters"]
								),
						},
					}),
				},
				lxc: {
					...lxcApi,
					/** Lists containers on this node. Node is pre-bound; pass remaining args or omit. */
					list: (args?: Parameters<typeof lxcApi.list>[1]) =>
						lxcApi.list(node, args as Parameters<typeof lxcApi.list>[1]),
					/** Returns per-container operations pre-bound to this node and vmid. */
					id: (vmid: number) => ({
						delete: (args?: Omit<NodesAPI["/nodes/{node}/lxc/{vmid}"]["DELETE"]["parameters"], "$path">) =>
							lxcApi.delete(node, vmid, ({ $path: { node, vmid }, ...(args ?? {}) } as NodesAPI["/nodes/{node}/lxc/{vmid}"]["DELETE"]["parameters"])),
						clone: (args: Omit<NodesAPI["/nodes/{node}/lxc/{vmid}/clone"]["POST"]["parameters"], "$path">) =>
							client.request(
								"/nodes/{node}/lxc/{vmid}/clone",
								"POST",
								{ $path: { node, vmid }, ...(args ?? {}) } as NodesAPI["/nodes/{node}/lxc/{vmid}/clone"]["POST"]["parameters"]
							),
						interfaces: (): Promise<NodesAPI["/nodes/{node}/lxc/{vmid}/interfaces"]["GET"]["return"]> =>
							client.request(
								"/nodes/{node}/lxc/{vmid}/interfaces",
								"GET",
								{ $path: { node, vmid } }
							),
						config: {
							get: (args?: Omit<NodesAPI["/nodes/{node}/lxc/{vmid}/config"]["GET"]["parameters"], "$path">): Promise<NodesAPI["/nodes/{node}/lxc/{vmid}/config"]["GET"]["return"]> =>
								client.request(
									"/nodes/{node}/lxc/{vmid}/config",
									"GET",
									{ $path: { node, vmid }, ...(args ?? {}) } as NodesAPI["/nodes/{node}/lxc/{vmid}/config"]["GET"]["parameters"]
								),
						},
						status: {
							start: (args?: NodesAPI["/nodes/{node}/lxc/{vmid}/status/start"]["POST"]["parameters"]) =>
								client.request(
									"/nodes/{node}/lxc/{vmid}/status/start",
									"POST",
									{ $path: { node, vmid }, ...(args as object) } as NodesAPI["/nodes/{node}/lxc/{vmid}/status/start"]["POST"]["parameters"]
								),
							stop: (args?: NodesAPI["/nodes/{node}/lxc/{vmid}/status/stop"]["POST"]["parameters"]) =>
								client.request(
									"/nodes/{node}/lxc/{vmid}/status/stop",
									"POST",
									{ $path: { node, vmid }, ...(args as object) } as NodesAPI["/nodes/{node}/lxc/{vmid}/status/stop"]["POST"]["parameters"]
								),
							reboot: (args?: NodesAPI["/nodes/{node}/lxc/{vmid}/status/reboot"]["POST"]["parameters"]) =>
								client.request(
									"/nodes/{node}/lxc/{vmid}/status/reboot",
									"POST",
									{ $path: { node, vmid }, ...(args as object) } as NodesAPI["/nodes/{node}/lxc/{vmid}/status/reboot"]["POST"]["parameters"]
								),
						},
					}),
				},
				tasks: {
					/** Lists recent tasks for this node. Node is pre-bound. */
					list: (args?: { $query?: NodesAPI["/nodes/{node}/tasks"]["GET"]["parameters"]["$query"] }) =>
						client.request("/nodes/{node}/tasks", "GET", {
							$path: { node },
							...(args ?? {}),
						} as NodesAPI["/nodes/{node}/tasks"]["GET"]["parameters"]),
				},
			};
		},

		apt: aptFactory(client),
		ceph: cephFactory(client),
		disks: disksFactory(client),
		firewall: firewallFactory(client),
		hardware: hardwareFactory(client),
		lxc: lxcFactory(client),
		qemu: qemuFactory(client),
	};
}

export default Nodes;
