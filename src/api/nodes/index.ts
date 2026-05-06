
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

function Nodes(client: Client) {
	return {
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
