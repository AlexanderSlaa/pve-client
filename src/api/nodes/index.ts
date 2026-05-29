
export { default as hardwareFactory } from "./hardware";
export { default as aptFactory } from "./apt";
export { default as cephFactory } from "./ceph";
export { default as lxcFactory } from "./lxc";
export { default as qemuFactory } from "./qemu";
export { default as firewallFactory } from "./firewall";
export { default as disksFactory } from "./disks";


import aptFactory from "./apt";
import cephFactory from "./ceph";
import disksFactory from "./disks";
import firewallFactory from "./firewall";
import hardwareFactory from "./hardware";
import lxcFactory from "./lxc";
import qemuFactory from "./qemu";
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
					/** Lists VMs on this node. Node is pre-bound. */
					list: (args?: Parameters<typeof qemuApi.list>[1]) =>
						qemuApi.list(node, args as Parameters<typeof qemuApi.list>[1]),
					/** Creates a VM on this node. Node is pre-bound. */
					create: (args?: Parameters<typeof qemuApi.create>[1]) =>
						qemuApi.create(node, args as Parameters<typeof qemuApi.create>[1]),
					/** Returns per-VM operations pre-bound to this node and vmid. */
					vmid: (vmid: number) => ({
						/** DELETE /nodes/{node}/qemu/{vmid} */
						destroy: (args?: Parameters<typeof qemuApi.delete>[2]) =>
							qemuApi.delete(node, vmid, args as Parameters<typeof qemuApi.delete>[2]),
						/** GET /nodes/{node}/qemu/{vmid} */
						diridx: (args?: Parameters<typeof qemuApi.get>[2]) =>
							qemuApi.get(node, vmid, args as Parameters<typeof qemuApi.get>[2]),
						/** POST /nodes/{node}/qemu/{vmid}/clone */
						clone: (args: Parameters<typeof qemuApi.clone>[2]) =>
							qemuApi.clone(node, vmid, args as Parameters<typeof qemuApi.clone>[2]),
						/** GET /nodes/{node}/qemu/{vmid}/agent */
						agent: {
							index: (args?: Parameters<typeof qemuApi.agent>[2]) =>
								qemuApi.agent(node, vmid, args as Parameters<typeof qemuApi.agent>[2]),
						},
						/** POST /nodes/{node}/qemu/{vmid}/migrate */
						migrate: (args: Parameters<typeof qemuApi.migrate>[2]) =>
							qemuApi.migrate(node, vmid, args as Parameters<typeof qemuApi.migrate>[2]),
						config: {
							get: (args?: Parameters<typeof qemuApi.config.get>[2]) =>
								qemuApi.config.get(node, vmid, args as Parameters<typeof qemuApi.config.get>[2]),
							/** POST — async config update */
							update_async: (args?: Parameters<typeof qemuApi.config.post>[2]) =>
								qemuApi.config.post(node, vmid, args as Parameters<typeof qemuApi.config.post>[2]),
							/** PUT — synchronous config update */
							update: (args?: Parameters<typeof qemuApi.config.put>[2]) =>
								qemuApi.config.put(node, vmid, args as Parameters<typeof qemuApi.config.put>[2]),
						},
						snapshot: {
							list: () => qemuApi.snapshot.list(node, vmid),
							create: (args: Parameters<typeof qemuApi.snapshot.create>[2]) =>
								qemuApi.snapshot.create(node, vmid, args as Parameters<typeof qemuApi.snapshot.create>[2]),
						},
						status: {
							current: () => qemuApi.status.current(node, vmid),
							start: (args?: Parameters<typeof qemuApi.status.start>[2]) =>
								qemuApi.status.start(node, vmid, args as Parameters<typeof qemuApi.status.start>[2]),
							stop: (args?: Parameters<typeof qemuApi.status.stop>[2]) =>
								qemuApi.status.stop(node, vmid, args as Parameters<typeof qemuApi.status.stop>[2]),
							reboot: (args?: Parameters<typeof qemuApi.status.reboot>[2]) =>
								qemuApi.status.reboot(node, vmid, args as Parameters<typeof qemuApi.status.reboot>[2]),
						},
						termproxy: (args?: Parameters<typeof qemuApi.termproxy>[2]) =>
							qemuApi.termproxy(node, vmid, args as Parameters<typeof qemuApi.termproxy>[2]),
						vncproxy: (args?: Parameters<typeof qemuApi.vncproxy>[2]) =>
							qemuApi.vncproxy(node, vmid, args as Parameters<typeof qemuApi.vncproxy>[2]),
						vncwebsocket: (args?: Parameters<typeof qemuApi.vncwebsocket>[2]) =>
							qemuApi.vncwebsocket(node, vmid, args as Parameters<typeof qemuApi.vncwebsocket>[2]),
					}),
				},
				lxc: {
					/** Lists containers on this node. Node is pre-bound. */
					list: (args?: Parameters<typeof lxcApi.list>[1]) =>
						lxcApi.list(node, args as Parameters<typeof lxcApi.list>[1]),
					/** Creates a container on this node. Node is pre-bound. */
					create: (args?: Parameters<typeof lxcApi.create>[1]) =>
						lxcApi.create(node, args as Parameters<typeof lxcApi.create>[1]),
					/** Returns per-container operations pre-bound to this node and vmid. */
					id: (vmid: number) => ({
						/** DELETE /nodes/{node}/lxc/{vmid} */
						destroy: (args?: Parameters<typeof lxcApi.delete>[2]) =>
							lxcApi.delete(node, vmid, args as Parameters<typeof lxcApi.delete>[2]),
						/** GET /nodes/{node}/lxc/{vmid} */
						diridx: (args?: Parameters<typeof lxcApi.get>[2]) =>
							lxcApi.get(node, vmid, args as Parameters<typeof lxcApi.get>[2]),
						/** POST /nodes/{node}/lxc/{vmid}/clone */
						clone: (args: Parameters<typeof lxcApi.clone>[2]) =>
							lxcApi.clone(node, vmid, args as Parameters<typeof lxcApi.clone>[2]),
						/** GET /nodes/{node}/lxc/{vmid}/interfaces */
						interfaces: (args?: Parameters<typeof lxcApi.interfaces>[2]) =>
							lxcApi.interfaces(node, vmid),
						config: {
							get: (args?: Parameters<typeof lxcApi.config.get>[2]) =>
								lxcApi.config.get(node, vmid, args as Parameters<typeof lxcApi.config.get>[2]),
							/** PUT /nodes/{node}/lxc/{vmid}/config */
							update: (args?: Parameters<typeof lxcApi.config.put>[2]) =>
								lxcApi.config.put(node, vmid, args as Parameters<typeof lxcApi.config.put>[2]),
						},
						snapshot: {
							list: () => lxcApi.snapshot.list(node, vmid),
							create: (args: Parameters<typeof lxcApi.snapshot.create>[2]) =>
								lxcApi.snapshot.create(node, vmid, args as Parameters<typeof lxcApi.snapshot.create>[2]),
						},
						status: {
							current: () => lxcApi.status.current(node, vmid),
							start: (args?: Parameters<typeof lxcApi.status.start>[2]) =>
								lxcApi.status.start(node, vmid, args as Parameters<typeof lxcApi.status.start>[2]),
							stop: (args?: Parameters<typeof lxcApi.status.stop>[2]) =>
								lxcApi.status.stop(node, vmid, args as Parameters<typeof lxcApi.status.stop>[2]),
							reboot: (args?: Parameters<typeof lxcApi.status.reboot>[2]) =>
								lxcApi.status.reboot(node, vmid, args as Parameters<typeof lxcApi.status.reboot>[2]),
						},
						termproxy: (args?: Parameters<typeof lxcApi.termproxy>[2]) =>
							lxcApi.termproxy(node, vmid, args as Parameters<typeof lxcApi.termproxy>[2]),
						vncproxy: (args?: Parameters<typeof lxcApi.vncproxy>[2]) =>
							lxcApi.vncproxy(node, vmid, args as Parameters<typeof lxcApi.vncproxy>[2]),
						vncwebsocket: (args?: Parameters<typeof lxcApi.vncwebsocket>[2]) =>
							lxcApi.vncwebsocket(node, vmid, args as Parameters<typeof lxcApi.vncwebsocket>[2]),
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
