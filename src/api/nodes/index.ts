
export { hardwareFactory } from "./hardware.js";
export { aptFactory } from "./apt.js";
export { cephFactory } from "./ceph.js";
export { lxcFactory } from "./lxc.js";
export { qemuFactory } from "./qemu.js";
export { firewallFactory } from "./firewall.js";
export { disksFactory } from "./disks.js";

import { aptFactory } from "./apt.js";
import { cephFactory } from "./ceph.js";
import { disksFactory } from "./disks.js";
import { firewallFactory } from "./firewall.js";
import { hardwareFactory } from "./hardware.js";
import { lxcFactory } from "./lxc.js";
import { qemuFactory } from "./qemu.js";
import type { Client } from "../../index.js";
import type { NodesAPI } from "./types.js";

function Nodes(client: Client) {
	return {
		/** Lists all cluster nodes. Calls GET /nodes. */
		list: (): Promise<NodesAPI["/nodes"]["GET"]["return"]> =>
			client.request("/nodes", "GET", {}),

		/** Returns node-scoped sub-APIs for the given node name. */
		get: (node: string) => {
			const qemuApi = qemuFactory(client);
			const lxcApi = lxcFactory(client);
			return {
				apt: aptFactory(client),
				ceph: cephFactory(client),
				disks: disksFactory(client),
				firewall: firewallFactory(client),
				hardware: hardwareFactory(client),
				qemu: {
					...qemuApi,
					/** Returns per-VM operations pre-bound to this node and vmid. */
					vmid: (vmid: number) => ({
						clone: (args: NodesAPI["/nodes/{node}/qemu/{vmid}/clone"]["POST"]["parameters"]) =>
							client.request(
								"/nodes/{node}/qemu/{vmid}/clone",
								"POST",
								{ $path: { node, vmid }, ...(args as object) } as NodesAPI["/nodes/{node}/qemu/{vmid}/clone"]["POST"]["parameters"]
							),
					}),
				},
				lxc: {
					...lxcApi,
					/** Returns per-container operations pre-bound to this node and vmid. */
					id: (vmid: number) => ({
						clone: (args: NodesAPI["/nodes/{node}/lxc/{vmid}/clone"]["POST"]["parameters"]) =>
							client.request(
								"/nodes/{node}/lxc/{vmid}/clone",
								"POST",
								{ $path: { node, vmid }, ...(args as object) } as NodesAPI["/nodes/{node}/lxc/{vmid}/clone"]["POST"]["parameters"]
							),
					}),
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
