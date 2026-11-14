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
import type { ArgsTuple, HttpMethod, PathContext, RequestInput } from "../index";
import type { NodesAPI, Service } from "./types";
import nodeStorageFactory from "./storage";

type NodePath = keyof NodesAPI;
type NodeMethod<P extends NodePath> = Extract<keyof NodesAPI[P], HttpMethod>;
type NodeParams<P extends NodePath, M extends NodeMethod<P>> =
	NodesAPI[P][M] extends { parameters: infer T } ? RequestInput<T> : never;
type NodeReturn<P extends NodePath, M extends NodeMethod<P>> =
	NodesAPI[P][M] extends { return: infer T } ? T : never;
type BoundArgs<P extends NodePath, M extends NodeMethod<P>> = ArgsTuple<PathContext<NodeParams<P, M>>>;
/** Arguments of a factory function after its bound `node` argument. */
type Bound1<F> = F extends (node: any, ...rest: infer R) => any ? R : never;
/** Arguments of a factory function after its bound `node` and `vmid` arguments. */
type Bound2<F> = F extends (node: any, vmid: any, ...rest: infer R) => any ? R : never;
function Nodes(client: Client) {
	const r = <P extends NodePath, M extends NodeMethod<P>>(
		path: P,
		method: M,
		args: NodeParams<P, M>
	): Promise<NodeReturn<P, M>> =>
		client.request(path, method as never, args as never) as Promise<NodeReturn<P, M>>;

	const qemuApi = qemuFactory(client);
	const lxcApi = lxcFactory(client);
	const aptApi = aptFactory(client);
	const cephApi = cephFactory(client);
	const disksApi = disksFactory(client);
	const firewallApi = firewallFactory(client);
	const hardwareApi = hardwareFactory(client);
	const nodeCache = new Map<string, ReturnType<typeof buildNode>>();

	function buildNode(node: string) {

			return {
				// ── Node index ──────────────────────────────────────────────
				index:    () => r("/nodes/{node}", "GET", { $path: { node } }),

				// ── APT ─────────────────────────────────────────────────────
				apt: {
					index:        (...args: Bound1<typeof aptApi.index>) => aptApi.index(node, ...args),
					changelog:    (...args: Bound1<typeof aptApi.changelog>) => aptApi.changelog(node, ...args),
					repositories: (...args: BoundArgs<"/nodes/{node}/apt/repositories", "GET">) => r("/nodes/{node}/apt/repositories", "GET", { ...args[0], $path: { node } }),
					update:       (...args: BoundArgs<"/nodes/{node}/apt/update", "POST">) => r("/nodes/{node}/apt/update", "POST", { ...args[0], $path: { node } }),
					versions:     (...args: BoundArgs<"/nodes/{node}/apt/versions", "GET">) => r("/nodes/{node}/apt/versions", "GET",  { ...args[0], $path: { node } }),
				},

				// ── Capabilities ────────────────────────────────────────────
				capabilities: {
					index: () => r("/nodes/{node}/capabilities",                 "GET", { $path: { node } }),
					qemu:  {
						index:     () => r("/nodes/{node}/capabilities/qemu",           "GET", { $path: { node } }),
						cpu: (...args: BoundArgs<"/nodes/{node}/capabilities/qemu/cpu", "GET">) => r("/nodes/{node}/capabilities/qemu/cpu", "GET", { ...args[0], $path: { node } }),
						cpu_flags: (...args: BoundArgs<"/nodes/{node}/capabilities/qemu/cpu-flags", "GET">) => r("/nodes/{node}/capabilities/qemu/cpu-flags", "GET", { ...args[0], $path: { node } }),
						machines: (...args: BoundArgs<"/nodes/{node}/capabilities/qemu/machines", "GET">) => r("/nodes/{node}/capabilities/qemu/machines", "GET", { ...args[0], $path: { node } }),
						migration: () => r("/nodes/{node}/capabilities/qemu/migration", "GET", { $path: { node } }),
					},
				},

				// ── Ceph ────────────────────────────────────────────────────
				ceph: {
					index:  (...args: Bound1<typeof cephApi.index>) => cephApi.index(node, ...args),
					cfg:    (...args: Bound1<typeof cephApi.cfg>) => cephApi.cfg(node, ...args),
					cfg_db:    () => r("/nodes/{node}/ceph/cfg/db",    "GET",  { $path: { node } }),
					cfg_raw:   () => r("/nodes/{node}/ceph/cfg/raw",   "GET",  { $path: { node } }),
					cfg_value: (...args: BoundArgs<"/nodes/{node}/ceph/cfg/value", "GET">) => r("/nodes/{node}/ceph/cfg/value", "GET", { ...args[0], $path: { node } }),
					cmd_safety:(...args: BoundArgs<"/nodes/{node}/ceph/cmd-safety", "GET">) => r("/nodes/{node}/ceph/cmd-safety", "GET", { ...args[0], $path: { node } }),
					crush:     () => r("/nodes/{node}/ceph/crush",  "GET",  { $path: { node } }),
					init:      (...args: BoundArgs<"/nodes/{node}/ceph/init", "POST">) => r("/nodes/{node}/ceph/init", "POST", { ...args[0], $path: { node } }),
					log:       (...args: BoundArgs<"/nodes/{node}/ceph/log", "GET">) => r("/nodes/{node}/ceph/log", "GET",  { ...args[0], $path: { node } }),
					restart:   (...args: BoundArgs<"/nodes/{node}/ceph/restart", "POST">) => r("/nodes/{node}/ceph/restart", "POST", { ...args[0], $path: { node } }),
					releases:  () => client.request("/nodes/{node}/ceph/releases", "GET", { $path: { node } }),
					restart_bulk: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/ceph/restart-bulk"]["POST"]["parameters"]>>) =>
						client.request("/nodes/{node}/ceph/restart-bulk", "POST", { ...args[0], $path: { node } }),
					rules:     () => r("/nodes/{node}/ceph/rules",   "GET",  { $path: { node } }),
					start:     (...args: BoundArgs<"/nodes/{node}/ceph/start", "POST">) => r("/nodes/{node}/ceph/start", "POST", { ...args[0], $path: { node } }),
					status:    () => r("/nodes/{node}/ceph/status",  "GET",  { $path: { node } }),
					stop:      (...args: BoundArgs<"/nodes/{node}/ceph/stop", "POST">) => r("/nodes/{node}/ceph/stop", "POST", { ...args[0], $path: { node } }),
					fs: {
						index:  () => r("/nodes/{node}/ceph/fs", "GET", { $path: { node } }),
						name: (name: string) => ({
							create: (...args: BoundArgs<"/nodes/{node}/ceph/fs/{name}", "POST">) => r("/nodes/{node}/ceph/fs/{name}", "POST", { ...args[0], $path: { node, name } }),
							delete: (...args: BoundArgs<"/nodes/{node}/ceph/fs/{name}", "DELETE">) => r("/nodes/{node}/ceph/fs/{name}", "DELETE", { ...args[0], $path: { node, name } }),
						}),
					},
					mds: {
						index: () => r("/nodes/{node}/ceph/mds", "GET", { $path: { node } }),
						name: (name: string) => ({
							create: (...args: BoundArgs<"/nodes/{node}/ceph/mds/{name}", "POST">) => r("/nodes/{node}/ceph/mds/{name}", "POST",   { ...args[0], $path: { node, name } }),
							delete: (...args: BoundArgs<"/nodes/{node}/ceph/mds/{name}", "DELETE">) => r("/nodes/{node}/ceph/mds/{name}", "DELETE", { ...args[0], $path: { node, name } }),
						}),
					},
					mgr: {
						index: () => r("/nodes/{node}/ceph/mgr", "GET", { $path: { node } }),
						id: (id: string) => ({
							create: (...args: BoundArgs<"/nodes/{node}/ceph/mgr/{id}", "POST">) => r("/nodes/{node}/ceph/mgr/{id}", "POST",   { ...args[0], $path: { node, id } }),
							delete: (...args: BoundArgs<"/nodes/{node}/ceph/mgr/{id}", "DELETE">) => r("/nodes/{node}/ceph/mgr/{id}", "DELETE", { ...args[0], $path: { node, id } }),
						}),
					},
					mon: {
						index: () => r("/nodes/{node}/ceph/mon", "GET", { $path: { node } }),
						monid: (monid: string) => ({
							create: (...args: BoundArgs<"/nodes/{node}/ceph/mon/{monid}", "POST">) => r("/nodes/{node}/ceph/mon/{monid}", "POST",   { ...args[0], $path: { node, monid } }),
							delete: (...args: BoundArgs<"/nodes/{node}/ceph/mon/{monid}", "DELETE">) => r("/nodes/{node}/ceph/mon/{monid}", "DELETE", { ...args[0], $path: { node, monid } }),
						}),
					},
					osd: {
						index:  () => r("/nodes/{node}/ceph/osd", "GET",  { $path: { node } }),
						create: (...args: BoundArgs<"/nodes/{node}/ceph/osd", "POST">) => r("/nodes/{node}/ceph/osd", "POST", { ...args[0], $path: { node } }),
						osdid: (osdid: string | number) => ({
							get:       () => r("/nodes/{node}/ceph/osd/{osdid}",          "GET",    { $path: { node, osdid: Number(osdid) } }),
							delete:    (...args: BoundArgs<"/nodes/{node}/ceph/osd/{osdid}", "DELETE">) => r("/nodes/{node}/ceph/osd/{osdid}", "DELETE", { ...args[0], $path: { node, osdid: Number(osdid) } }),
							in:        (...args: BoundArgs<"/nodes/{node}/ceph/osd/{osdid}/in", "POST">) => r("/nodes/{node}/ceph/osd/{osdid}/in", "POST", { ...args[0], $path: { node, osdid: Number(osdid) } }),
							out:       (...args: BoundArgs<"/nodes/{node}/ceph/osd/{osdid}/out", "POST">) => r("/nodes/{node}/ceph/osd/{osdid}/out", "POST", { ...args[0], $path: { node, osdid: Number(osdid) } }),
							scrub:     (...args: BoundArgs<"/nodes/{node}/ceph/osd/{osdid}/scrub", "POST">) => r("/nodes/{node}/ceph/osd/{osdid}/scrub", "POST", { ...args[0], $path: { node, osdid: Number(osdid) } }),
							lv_info:   (...args: BoundArgs<"/nodes/{node}/ceph/osd/{osdid}/lv-info", "GET">) => r("/nodes/{node}/ceph/osd/{osdid}/lv-info", "GET",  { ...args[0], $path: { node, osdid: Number(osdid) } }),
							metadata:  () => r("/nodes/{node}/ceph/osd/{osdid}/metadata",  "GET",  { $path: { node, osdid: Number(osdid) } }),
						}),
					},
					pool: {
						index:  () => r("/nodes/{node}/ceph/pool", "GET",  { $path: { node } }),
						create: (...args: BoundArgs<"/nodes/{node}/ceph/pool", "POST">) => r("/nodes/{node}/ceph/pool", "POST", { ...args[0], $path: { node } }),
						name: (name: string) => ({
							get:    () => r("/nodes/{node}/ceph/pool/{name}",        "GET",    { $path: { node, name } }),
							update: (...args: BoundArgs<"/nodes/{node}/ceph/pool/{name}", "PUT">) => r("/nodes/{node}/ceph/pool/{name}", "PUT",    { ...args[0], $path: { node, name } }),
							delete: (...args: BoundArgs<"/nodes/{node}/ceph/pool/{name}", "DELETE">) => r("/nodes/{node}/ceph/pool/{name}", "DELETE", { ...args[0], $path: { node, name } }),
							status: (...args: BoundArgs<"/nodes/{node}/ceph/pool/{name}/status", "GET">) => r("/nodes/{node}/ceph/pool/{name}/status", "GET", { ...args[0], $path: { node, name } }),
						}),
					},
				},

				// ── Certificates ────────────────────────────────────────────
				certificates: {
					index: () => r("/nodes/{node}/certificates", "GET", { $path: { node } }),
					acme: {
						index:       () => r("/nodes/{node}/certificates/acme",             "GET",    { $path: { node } }),
						certificate: {
							create: (...args: BoundArgs<"/nodes/{node}/certificates/acme/certificate", "POST">) => r("/nodes/{node}/certificates/acme/certificate", "POST",   { ...args[0], $path: { node } }),
							renew:  (...args: BoundArgs<"/nodes/{node}/certificates/acme/certificate", "PUT">) => r("/nodes/{node}/certificates/acme/certificate", "PUT",    { ...args[0], $path: { node } }),
							delete: ()         => r("/nodes/{node}/certificates/acme/certificate", "DELETE", { $path: { node } }),
						},
					},
					custom: {
						upload: (...args: BoundArgs<"/nodes/{node}/certificates/custom", "POST">) => r("/nodes/{node}/certificates/custom", "POST",   { ...args[0], $path: { node } }),
						delete: (...args: BoundArgs<"/nodes/{node}/certificates/custom", "DELETE">) => r("/nodes/{node}/certificates/custom", "DELETE", { ...args[0], $path: { node } }),
					},
					info: () => r("/nodes/{node}/certificates/info", "GET", { $path: { node } }),
				},

				// ── Config ──────────────────────────────────────────────────
				config: {
					get:    (...args: BoundArgs<"/nodes/{node}/config", "GET">) => r("/nodes/{node}/config", "GET", { ...args[0], $path: { node } }),
					update: (...args: BoundArgs<"/nodes/{node}/config", "PUT">) => r("/nodes/{node}/config", "PUT", { ...args[0], $path: { node } }),
				},

				// ── Disks ───────────────────────────────────────────────────
				disks: {
					index:    () => disksApi.list(node, {} as never),
					list:     (...args: Bound1<typeof disksApi.list>) => disksApi.list(node, ...args),
					list_disks: (...args: Bound1<typeof disksApi.list_disks>) => disksApi.list_disks(node, ...args),
					directory: {
						index:  () => r("/nodes/{node}/disks/directory", "GET", { $path: { node } }),
						create: (...args: BoundArgs<"/nodes/{node}/disks/directory", "POST">) => r("/nodes/{node}/disks/directory", "POST", { ...args[0], $path: { node } }),
						name: (name: string) => ({
							delete: (...args: BoundArgs<"/nodes/{node}/disks/directory/{name}", "DELETE">) => r("/nodes/{node}/disks/directory/{name}", "DELETE", { ...args[0], $path: { node, name } }),
						}),
					},
					initgpt: (...args: BoundArgs<"/nodes/{node}/disks/initgpt", "POST">) => r("/nodes/{node}/disks/initgpt", "POST", { ...args[0], $path: { node } }),
					lvm: {
						index:  () => r("/nodes/{node}/disks/lvm", "GET", { $path: { node } }),
						create: (...args: BoundArgs<"/nodes/{node}/disks/lvm", "POST">) => r("/nodes/{node}/disks/lvm", "POST", { ...args[0], $path: { node } }),
						name: (name: string) => ({
							delete: (...args: BoundArgs<"/nodes/{node}/disks/lvm/{name}", "DELETE">) => r("/nodes/{node}/disks/lvm/{name}", "DELETE", { ...args[0], $path: { node, name } }),
						}),
					},
					lvmthin: {
						index:  () => r("/nodes/{node}/disks/lvmthin", "GET", { $path: { node } }),
						create: (...args: BoundArgs<"/nodes/{node}/disks/lvmthin", "POST">) => r("/nodes/{node}/disks/lvmthin", "POST", { ...args[0], $path: { node } }),
						name: (name: string) => ({
							delete: (...args: BoundArgs<"/nodes/{node}/disks/lvmthin/{name}", "DELETE">) => r("/nodes/{node}/disks/lvmthin/{name}", "DELETE", { ...args[0], $path: { node, name } }),
						}),
					},
					smart:    (...args: BoundArgs<"/nodes/{node}/disks/smart", "GET">) => r("/nodes/{node}/disks/smart", "GET",  { ...args[0], $path: { node } }),
					wipedisk: (...args: BoundArgs<"/nodes/{node}/disks/wipedisk", "PUT">) => r("/nodes/{node}/disks/wipedisk", "PUT",  { ...args[0], $path: { node } }),
					zfs: {
						index:  () => r("/nodes/{node}/disks/zfs", "GET", { $path: { node } }),
						create: (...args: BoundArgs<"/nodes/{node}/disks/zfs", "POST">) => r("/nodes/{node}/disks/zfs", "POST", { ...args[0], $path: { node } }),
						name: (name: string) => ({
							get:    () => r("/nodes/{node}/disks/zfs/{name}", "GET",    { $path: { node, name } }),
							delete: (...args: BoundArgs<"/nodes/{node}/disks/zfs/{name}", "DELETE">) => r("/nodes/{node}/disks/zfs/{name}", "DELETE", { ...args[0], $path: { node, name } }),
						}),
					},
				},

				// ── DNS ─────────────────────────────────────────────────────
				dns: {
					get:    () => r("/nodes/{node}/dns", "GET", { $path: { node } }),
					update: (...args: BoundArgs<"/nodes/{node}/dns", "PUT">) => r("/nodes/{node}/dns", "PUT", { ...args[0], $path: { node } }),
				},

				// ── Execute ─────────────────────────────────────────────────
				execute: (...args: BoundArgs<"/nodes/{node}/execute", "POST">) => r("/nodes/{node}/execute", "POST", { ...args[0], $path: { node } }),

				// ── Firewall ────────────────────────────────────────────────
				firewall: {
					get:     (...args: Bound1<typeof firewallApi.get>) => firewallApi.get(node, ...args),
					log:     (...args: BoundArgs<"/nodes/{node}/firewall/log", "GET">) => r("/nodes/{node}/firewall/log", "GET", { ...args[0], $path: { node } }),
					options: {
						get: () => r("/nodes/{node}/firewall/options", "GET", { $path: { node } }),
						set: (...args: BoundArgs<"/nodes/{node}/firewall/options", "PUT">) => r("/nodes/{node}/firewall/options", "PUT", { ...args[0], $path: { node } }),
					},
					rules: {
						index:  () => r("/nodes/{node}/firewall/rules", "GET",  { $path: { node } }),
						create: (...args: BoundArgs<"/nodes/{node}/firewall/rules", "POST">) => r("/nodes/{node}/firewall/rules", "POST", { ...args[0], $path: { node } }),
						pos: (pos: number | string) => ({
							get:    () => r("/nodes/{node}/firewall/rules/{pos}", "GET",    { $path: { node, pos: Number(pos) } }),
							update: (...args: BoundArgs<"/nodes/{node}/firewall/rules/{pos}", "PUT">) => r("/nodes/{node}/firewall/rules/{pos}", "PUT",    { ...args[0], $path: { node, pos: Number(pos) } }),
							delete: (...args: BoundArgs<"/nodes/{node}/firewall/rules/{pos}", "DELETE">) => r("/nodes/{node}/firewall/rules/{pos}", "DELETE", { ...args[0], $path: { node, pos: Number(pos) } }),
						}),
					},
				},

				// ── Hardware ────────────────────────────────────────────────
				hardware: {
					get: (...args: Bound1<typeof hardwareApi.get>) => hardwareApi.get(node, ...args),
					pci: {
						get: (...args: Bound1<typeof hardwareApi.pci.get>) => hardwareApi.pci.get(node, ...args),
						pci_id: (pciId: string) => ({
							get:  () => r("/nodes/{node}/hardware/pci/{pci-id-or-mapping}", "GET", { $path: { node, "pci-id-or-mapping": pciId } }),
							mdev: () => r("/nodes/{node}/hardware/pci/{pci-id-or-mapping}/mdev", "GET", { $path: { node, "pci-id-or-mapping": pciId } }),
						}),
					},
					usb: { get: (...args: Bound1<typeof hardwareApi.usb.get>) => hardwareApi.usb.get(node, ...args) },
				},

				// ── Hosts ───────────────────────────────────────────────────
				hosts: {
					get:    () => r("/nodes/{node}/hosts", "GET", { $path: { node } }),
					update: (...args: BoundArgs<"/nodes/{node}/hosts", "POST">) => r("/nodes/{node}/hosts", "POST", { ...args[0], $path: { node } }),
				},

				// ── Journal ─────────────────────────────────────────────────
				journal: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/journal"]["GET"]["parameters"]>>) =>
					client.request("/nodes/{node}/journal", "GET", { ...args[0], $path: { node } }),

				// ── LXC ─────────────────────────────────────────────────────
				lxc: {
					list:   (...args: Bound1<typeof lxcApi.list>) => lxcApi.list(node, ...args),
					create: (...args: Bound1<typeof lxcApi.create>) => lxcApi.create(node, ...args),
					id: (vmid: number) => ({
						status_index:    () => lxcApi.status_index(node, vmid),
						mtunnel:         (...args: Bound2<typeof lxcApi.mtunnel>) => lxcApi.mtunnel(node, vmid, ...args),
						mtunnelwebsocket:(...args: Bound2<typeof lxcApi.mtunnelwebsocket>) => lxcApi.mtunnelwebsocket(node, vmid, ...args),
						remote_migrate:  (...args: Bound2<typeof lxcApi.remote_migrate>) => lxcApi.remote_migrate(node, vmid, ...args),
						destroy:    (...args: Bound2<typeof lxcApi.delete>) => lxcApi.delete(node, vmid, ...args),
						diridx:     (...args: Bound2<typeof lxcApi.get>) => lxcApi.get(node, vmid, ...args),
						clone:      (...args: Bound2<typeof lxcApi.clone>) => lxcApi.clone(node, vmid, ...args),
						interfaces: ()         => lxcApi.interfaces(node, vmid),
						migrate:    (...args: Bound2<typeof lxcApi.migrate>) => lxcApi.migrate(node, vmid, ...args),
						migrate_info: (...args: Bound2<typeof lxcApi.migrate_info>) => lxcApi.migrate_info(node, vmid, ...args),
						move_volume:(...args: Bound2<typeof lxcApi.move_volume>) => lxcApi.move_volume(node, vmid, ...args),
						resize:     (...args: Bound2<typeof lxcApi.resize>) => lxcApi.resize(node, vmid, ...args),
						template:   ()         => lxcApi.template(node, vmid),
						feature:    (...args: Bound2<typeof lxcApi.feature>) => lxcApi.feature(node, vmid, ...args),
						pending:    ()         => lxcApi.pending(node, vmid),
						rrd:        (...args: Bound2<typeof lxcApi.rrd>) => lxcApi.rrd(node, vmid, ...args),
						rrddata:    (...args: Bound2<typeof lxcApi.rrddata>) => lxcApi.rrddata(node, vmid, ...args),
						spiceproxy: (...args: Bound2<typeof lxcApi.spiceproxy>) => lxcApi.spiceproxy(node, vmid, ...args),
						termproxy:  (...args: Bound2<typeof lxcApi.termproxy>) => lxcApi.termproxy(node, vmid, ...args),
						vncproxy:   (...args: Bound2<typeof lxcApi.vncproxy>) => lxcApi.vncproxy(node, vmid, ...args),
						vncwebsocket:(...args: Bound2<typeof lxcApi.vncwebsocket>) => lxcApi.vncwebsocket(node, vmid, ...args),
						config: {
							get:    (...args: Bound2<typeof lxcApi.config.get>) => lxcApi.config.get(node, vmid, ...args),
							update: (...args: Bound2<typeof lxcApi.config.put>) => lxcApi.config.put(node, vmid, ...args),
						},
						firewall: {
							get:     () => lxcApi.firewall.get(node, vmid),
							log:     (...args: Bound2<typeof lxcApi.firewall.log>) => lxcApi.firewall.log(node, vmid, ...args),
							refs:    (...args: Bound2<typeof lxcApi.firewall.refs>) => lxcApi.firewall.refs(node, vmid, ...args),
							options: {
								get: () => lxcApi.firewall.options.get(node, vmid),
								set: (...args: Bound2<typeof lxcApi.firewall.options.set>) => lxcApi.firewall.options.set(node, vmid, ...args),
							},
							aliases: {
								list:   () => lxcApi.firewall.aliases.list(node, vmid),
								create: (...args: Bound2<typeof lxcApi.firewall.aliases.create>) => lxcApi.firewall.aliases.create(node, vmid, ...args),
								name:   (name: string) => lxcApi.firewall.aliases.name(node, vmid, name),
							},
							ipset: {
								list:   () => lxcApi.firewall.ipset.list(node, vmid),
								create: (...args: Bound2<typeof lxcApi.firewall.ipset.create>) => lxcApi.firewall.ipset.create(node, vmid, ...args),
								name:   (name: string) => lxcApi.firewall.ipset.name(node, vmid, name),
							},
							rules: {
								list:   () => lxcApi.firewall.rules.list(node, vmid),
								create: (...args: Bound2<typeof lxcApi.firewall.rules.create>) => lxcApi.firewall.rules.create(node, vmid, ...args),
								pos:    (pos: number) => lxcApi.firewall.rules.pos(node, vmid, pos),
							},
						},
						snapshot: {
							list:     () => lxcApi.snapshot.list(node, vmid),
							create:   (...args: Bound2<typeof lxcApi.snapshot.create>) => lxcApi.snapshot.create(node, vmid, ...args),
							snapname: (snapname: string) => lxcApi.snapshot.snapname(node, vmid, snapname),
						},
						status: {
							current:  () => lxcApi.status.current(node, vmid),
							start:    (...args: Bound2<typeof lxcApi.status.start>) => lxcApi.status.start(node, vmid, ...args),
							stop:     (...args: Bound2<typeof lxcApi.status.stop>) => lxcApi.status.stop(node, vmid, ...args),
							reboot:   (...args: Bound2<typeof lxcApi.status.reboot>) => lxcApi.status.reboot(node, vmid, ...args),
							resume:   (...args: Bound2<typeof lxcApi.status.resume>) => lxcApi.status.resume(node, vmid, ...args),
							shutdown: (...args: Bound2<typeof lxcApi.status.shutdown>) => lxcApi.status.shutdown(node, vmid, ...args),
							suspend:  (...args: Bound2<typeof lxcApi.status.suspend>) => lxcApi.status.suspend(node, vmid, ...args),
						},
					}),
				},

				// ── Misc node ops ───────────────────────────────────────────
				aplinfo:     (...args: BoundArgs<"/nodes/{node}/aplinfo", "GET">) => r("/nodes/{node}/aplinfo", "GET",  { ...args[0], $path: { node } }),
				download_template: (...args: BoundArgs<"/nodes/{node}/aplinfo", "POST">) => r("/nodes/{node}/aplinfo", "POST", { ...args[0], $path: { node } }),
				migrateall:  (...args: BoundArgs<"/nodes/{node}/migrateall", "POST">) => r("/nodes/{node}/migrateall", "POST", { ...args[0], $path: { node } }),
				netstat:     ()         => r("/nodes/{node}/netstat",     "GET",  { $path: { node } }),
				report:      ()         => r("/nodes/{node}/report",      "GET",  { $path: { node } }),
				rrd:         (...args: BoundArgs<"/nodes/{node}/rrd", "GET">) => r("/nodes/{node}/rrd", "GET",  { ...args[0], $path: { node } }),
				rrddata:     (...args: BoundArgs<"/nodes/{node}/rrddata", "GET">) => r("/nodes/{node}/rrddata", "GET",  { ...args[0], $path: { node } }),
				spiceshell:  (...args: BoundArgs<"/nodes/{node}/spiceshell", "POST">) => r("/nodes/{node}/spiceshell", "POST", { ...args[0], $path: { node } }),
				startall:    (...args: BoundArgs<"/nodes/{node}/startall", "POST">) => r("/nodes/{node}/startall", "POST", { ...args[0], $path: { node } }),
				stopall:     (...args: BoundArgs<"/nodes/{node}/stopall", "POST">) => r("/nodes/{node}/stopall", "POST", { ...args[0], $path: { node } }),
				suspendall:  (...args: BoundArgs<"/nodes/{node}/suspendall", "POST">) => r("/nodes/{node}/suspendall", "POST", { ...args[0], $path: { node } }),
				syslog:      (...args: BoundArgs<"/nodes/{node}/syslog", "GET">) => r("/nodes/{node}/syslog", "GET",  { ...args[0], $path: { node } }),
				termproxy:   (...args: BoundArgs<"/nodes/{node}/termproxy", "POST">) => r("/nodes/{node}/termproxy", "POST", { ...args[0], $path: { node } }),
				time:        {
					get:    () => r("/nodes/{node}/time", "GET", { $path: { node } }),
					update: (...args: BoundArgs<"/nodes/{node}/time", "PUT">) => r("/nodes/{node}/time", "PUT", { ...args[0], $path: { node } }),
				},
				version:     () => r("/nodes/{node}/version",  "GET",  { $path: { node } }),
				vncshell:    (...args: BoundArgs<"/nodes/{node}/vncshell", "POST">) => r("/nodes/{node}/vncshell", "POST", { ...args[0], $path: { node } }),
				vncwebsocket:(...args: BoundArgs<"/nodes/{node}/vncwebsocket", "GET">) => r("/nodes/{node}/vncwebsocket", "GET", { ...args[0], $path: { node } }),
				wakeonlan:   () => r("/nodes/{node}/wakeonlan", "POST", { $path: { node } }),
				status: {
					get:  () => r("/nodes/{node}/status", "GET",  { $path: { node } }),
					post: (...args: BoundArgs<"/nodes/{node}/status", "POST">) => r("/nodes/{node}/status", "POST", { ...args[0], $path: { node } }),
				},
				subscription: {
					get:    () => r("/nodes/{node}/subscription", "GET",    { $path: { node } }),
					update: (...args: BoundArgs<"/nodes/{node}/subscription", "POST">) => r("/nodes/{node}/subscription", "POST",   { ...args[0], $path: { node } }),
					delete: ()         => r("/nodes/{node}/subscription", "DELETE", { $path: { node } }),
					set:    (...args: BoundArgs<"/nodes/{node}/subscription", "PUT">) => r("/nodes/{node}/subscription", "PUT",    { ...args[0], $path: { node } }),
				},

				// ── Network ─────────────────────────────────────────────────
				network: {
					index:  (...args: BoundArgs<"/nodes/{node}/network", "GET">) => r("/nodes/{node}/network", "GET",    { ...args[0], $path: { node } }),
					create: (...args: BoundArgs<"/nodes/{node}/network", "POST">) => r("/nodes/{node}/network", "POST",   { ...args[0], $path: { node } }),
					reload: (...args: BoundArgs<"/nodes/{node}/network", "PUT">) => r("/nodes/{node}/network", "PUT",    { ...args[0], $path: { node } }),
					revert: ()         => r("/nodes/{node}/network", "DELETE", { $path: { node } }),
					iface: (iface: string) => ({
						get:    () => r("/nodes/{node}/network/{iface}", "GET",    { $path: { node, iface } }),
						update: (...args: BoundArgs<"/nodes/{node}/network/{iface}", "PUT">) => r("/nodes/{node}/network/{iface}", "PUT",    { ...args[0], $path: { node, iface } }),
						delete: ()         => r("/nodes/{node}/network/{iface}", "DELETE", { $path: { node, iface } }),
					}),
				},

				// ── QEMU ────────────────────────────────────────────────────
				qemu: {
					list:   (...args: Bound1<typeof qemuApi.list>) => qemuApi.list(node, ...args),
					create: (...args: Bound1<typeof qemuApi.create>) => qemuApi.create(node, ...args),
					vmid: (vmid: number) => ({
						status_index: () => qemuApi.status_index(node, vmid),
						dbus_vmstate: qemuApi.dbus_vmstate,
						mtunnel:      (...args: Bound2<typeof qemuApi.mtunnel>) => qemuApi.mtunnel(node, vmid, ...args),
						mtunnelwebsocket: (...args: Bound2<typeof qemuApi.mtunnelwebsocket>) => qemuApi.mtunnelwebsocket(node, vmid, ...args),
						remote_migrate:   (...args: Bound2<typeof qemuApi.remote_migrate>) => qemuApi.remote_migrate(node, vmid, ...args),
						destroy:     (...args: Bound2<typeof qemuApi.delete>) => qemuApi.delete(node, vmid, ...args),
						diridx:      (...args: Bound2<typeof qemuApi.get>) => qemuApi.get(node, vmid, ...args),
						clone:       (...args: Bound2<typeof qemuApi.clone>) => qemuApi.clone(node, vmid, ...args),
						migrate:     (...args: Bound2<typeof qemuApi.migrate>) => qemuApi.migrate(node, vmid, ...args),
						migrate_info: (...args: Bound2<typeof qemuApi.migrate_info>) => qemuApi.migrate_info(node, vmid, ...args),
						feature:     (...args: Bound2<typeof qemuApi.feature>) => qemuApi.feature(node, vmid, ...args),
						pending:     ()          => qemuApi.pending(node, vmid),
						template:    (...args: Bound2<typeof qemuApi.template>) => qemuApi.template(node, vmid, ...args),
						resize:      (...args: Bound2<typeof qemuApi.resize>) => qemuApi.resize(node, vmid, ...args),
						move_disk:   (...args: Bound2<typeof qemuApi.move_disk>) => qemuApi.move_disk(node, vmid, ...args),
						unlink:      (...args: Bound2<typeof qemuApi.unlink>) => qemuApi.unlink(node, vmid, ...args),
						sendkey:     (...args: Bound2<typeof qemuApi.sendkey>) => qemuApi.sendkey(node, vmid, ...args),
						monitor:     (...args: Bound2<typeof qemuApi.monitor>) => qemuApi.monitor(node, vmid, ...args),
						rrd:         (...args: Bound2<typeof qemuApi.rrd>) => qemuApi.rrd(node, vmid, ...args),
						rrddata:     (...args: Bound2<typeof qemuApi.rrddata>) => qemuApi.rrddata(node, vmid, ...args),
						spiceproxy:  (...args: Bound2<typeof qemuApi.spiceproxy>) => qemuApi.spiceproxy(node, vmid, ...args),
						termproxy:   (...args: Bound2<typeof qemuApi.termproxy>) => qemuApi.termproxy(node, vmid, ...args),
						vncproxy:    (...args: Bound2<typeof qemuApi.vncproxy>) => qemuApi.vncproxy(node, vmid, ...args),
						vncwebsocket:(...args: Bound2<typeof qemuApi.vncwebsocket>) => qemuApi.vncwebsocket(node, vmid, ...args),
						agent: {
							index:                   (...args: Bound2<typeof qemuApi.agent>) => qemuApi.agent(node, vmid, ...args),
							command:                 (...args: Bound2<typeof qemuApi.agent_command>) => qemuApi.agent_command(node, vmid, ...args),
							exec:                    (...args: Bound2<typeof qemuApi.agent_exec>) => qemuApi.agent_exec(node, vmid, ...args),
							exec_status:             (...args: Bound2<typeof qemuApi.agent_exec_status>) => qemuApi.agent_exec_status(node, vmid, ...args),
							file_read:               (...args: Bound2<typeof qemuApi.agent_file_read>) => qemuApi.agent_file_read(node, vmid, ...args),
							file_write:              (...args: Bound2<typeof qemuApi.agent_file_write>) => qemuApi.agent_file_write(node, vmid, ...args),
							get_cpustats:            ()          => qemuApi.agent_get_cpustats(node, vmid),
							get_disks:               ()          => qemuApi.agent_get_disks(node, vmid),
							get_diskstats:           ()          => qemuApi.agent_get_diskstats(node, vmid),
							get_load:                ()          => qemuApi.agent_get_load(node, vmid),
							get_fsinfo:              ()          => qemuApi.agent_get_fsinfo(node, vmid),
							get_host_name:           ()          => qemuApi.agent_get_host_name(node, vmid),
							get_memory_block_info:   ()          => qemuApi.agent_get_memory_block_info(node, vmid),
							get_memory_blocks:       ()          => qemuApi.agent_get_memory_blocks(node, vmid),
							get_osinfo:              ()          => qemuApi.agent_get_osinfo(node, vmid),
							get_time:                ()          => qemuApi.agent_get_time(node, vmid),
							get_timezone:            ()          => qemuApi.agent_get_timezone(node, vmid),
							get_users:               ()          => qemuApi.agent_get_users(node, vmid),
							get_vcpus:               ()          => qemuApi.agent_get_vcpus(node, vmid),
							info:                    ()          => qemuApi.agent_info(node, vmid),
							network_interfaces:      ()          => qemuApi.agent_network_interfaces(node, vmid),
							ping:                    ()          => qemuApi.agent_ping(node, vmid),
							fstrim:                  ()          => qemuApi.agent_fstrim(node, vmid),
							fsfreeze_freeze:         ()          => qemuApi.agent_fsfreeze_freeze(node, vmid),
							fsfreeze_status:         ()          => qemuApi.agent_fsfreeze_status(node, vmid),
							fsfreeze_thaw:           ()          => qemuApi.agent_fsfreeze_thaw(node, vmid),
							shutdown:                ()          => qemuApi.agent_shutdown(node, vmid),
							suspend_disk:            ()          => qemuApi.agent_suspend_disk(node, vmid),
							suspend_hybrid:          ()          => qemuApi.agent_suspend_hybrid(node, vmid),
							suspend_ram:             ()          => qemuApi.agent_suspend_ram(node, vmid),
							set_user_password:       (...args: Bound2<typeof qemuApi.agent_set_user_password>) => qemuApi.agent_set_user_password(node, vmid, ...args),
						},
						cloudinit: {
							get:    () => qemuApi.cloudinit.get(node, vmid),
							update: (...args: Bound2<typeof qemuApi.cloudinit.update>) => qemuApi.cloudinit.update(node, vmid, ...args),
							dump:   (...args: Bound2<typeof qemuApi.cloudinit.dump>) => qemuApi.cloudinit.dump(node, vmid, ...args),
						},
						config: {
							get:          (...args: Bound2<typeof qemuApi.config.get>) => qemuApi.config.get(node, vmid, ...args),
							update_async: (...args: Bound2<typeof qemuApi.config.post>) => qemuApi.config.post(node, vmid, ...args),
							update:       (...args: Bound2<typeof qemuApi.config.put>) => qemuApi.config.put(node, vmid, ...args),
						},
						firewall: {
							get:     () => qemuApi.firewall.get(node, vmid),
							log:     (...args: Bound2<typeof qemuApi.firewall.log>) => qemuApi.firewall.log(node, vmid, ...args),
							refs:    (...args: Bound2<typeof qemuApi.firewall.refs>) => qemuApi.firewall.refs(node, vmid, ...args),
							options: {
								get: () => qemuApi.firewall.options.get(node, vmid),
								set: (...args: Bound2<typeof qemuApi.firewall.options.set>) => qemuApi.firewall.options.set(node, vmid, ...args),
							},
							aliases: {
								list:   () => qemuApi.firewall.aliases.list(node, vmid),
								create: (...args: Bound2<typeof qemuApi.firewall.aliases.create>) => qemuApi.firewall.aliases.create(node, vmid, ...args),
								name:   (name: string) => qemuApi.firewall.aliases.name(node, vmid, name),
							},
							ipset: {
								list:   () => qemuApi.firewall.ipset.list(node, vmid),
								create: (...args: Bound2<typeof qemuApi.firewall.ipset.create>) => qemuApi.firewall.ipset.create(node, vmid, ...args),
								name:   (name: string) => qemuApi.firewall.ipset.name(node, vmid, name),
							},
							rules: {
								list:   () => qemuApi.firewall.rules.list(node, vmid),
								create: (...args: Bound2<typeof qemuApi.firewall.rules.create>) => qemuApi.firewall.rules.create(node, vmid, ...args),
								pos:    (pos: number) => qemuApi.firewall.rules.pos(node, vmid, pos),
							},
						},
						snapshot: {
							list:     () => qemuApi.snapshot.list(node, vmid),
							create:   (...args: Bound2<typeof qemuApi.snapshot.create>) => qemuApi.snapshot.create(node, vmid, ...args),
							snapname: (snapname: string) => qemuApi.snapshot.snapname(node, vmid, snapname),
						},
						status: {
							current:  () => qemuApi.status.current(node, vmid),
							start:    (...args: Bound2<typeof qemuApi.status.start>) => qemuApi.status.start(node, vmid, ...args),
							stop:     (...args: Bound2<typeof qemuApi.status.stop>) => qemuApi.status.stop(node, vmid, ...args),
							reboot:   (...args: Bound2<typeof qemuApi.status.reboot>) => qemuApi.status.reboot(node, vmid, ...args),
							reset:    (...args: Bound2<typeof qemuApi.status.reset>) => qemuApi.status.reset(node, vmid, ...args),
							resume:   (...args: Bound2<typeof qemuApi.status.resume>) => qemuApi.status.resume(node, vmid, ...args),
							shutdown: (...args: Bound2<typeof qemuApi.status.shutdown>) => qemuApi.status.shutdown(node, vmid, ...args),
							suspend:  (...args: Bound2<typeof qemuApi.status.suspend>) => qemuApi.status.suspend(node, vmid, ...args),
						},
					}),
				},

				// ── Replication ─────────────────────────────────────────────
				replication: {
					index: (...args: BoundArgs<"/nodes/{node}/replication", "GET">) => r("/nodes/{node}/replication", "GET", { ...args[0], $path: { node } }),
					id: (id: string) => ({
						get:           () => r("/nodes/{node}/replication/{id}",              "GET",  { $path: { node, id } }),
						log:           (...args: BoundArgs<"/nodes/{node}/replication/{id}/log", "GET">) => r("/nodes/{node}/replication/{id}/log", "GET",  { ...args[0], $path: { node, id } }),
						schedule_now:  (...args: BoundArgs<"/nodes/{node}/replication/{id}/schedule_now", "POST">) => r("/nodes/{node}/replication/{id}/schedule_now", "POST", { ...args[0], $path: { node, id } }),
						status:        () => r("/nodes/{node}/replication/{id}/status",       "GET",  { $path: { node, id } }),
					}),
				},

				// ── Scan ────────────────────────────────────────────────────
				scan: {
					index:   () => r("/nodes/{node}/scan",        "GET", { $path: { node } }),
					cifs:    (...args: BoundArgs<"/nodes/{node}/scan/cifs", "GET">) => r("/nodes/{node}/scan/cifs", "GET", { ...args[0], $path: { node } }),
					iscsi:   (...args: BoundArgs<"/nodes/{node}/scan/iscsi", "GET">) => r("/nodes/{node}/scan/iscsi", "GET", { ...args[0], $path: { node } }),
					lvm:     () => r("/nodes/{node}/scan/lvm",     "GET", { $path: { node } }),
					lvmthin: (...args: BoundArgs<"/nodes/{node}/scan/lvmthin", "GET">) => r("/nodes/{node}/scan/lvmthin", "GET", { ...args[0], $path: { node } }),
					nfs:     (...args: BoundArgs<"/nodes/{node}/scan/nfs", "GET">) => r("/nodes/{node}/scan/nfs", "GET", { ...args[0], $path: { node } }),
					pbs:     (...args: BoundArgs<"/nodes/{node}/scan/pbs", "GET">) => r("/nodes/{node}/scan/pbs", "GET", { ...args[0], $path: { node } }),
					zfs:     () => r("/nodes/{node}/scan/zfs",     "GET", { $path: { node } }),
				},

				// ── SDN ─────────────────────────────────────────────────────
				sdn: {
					index: () => r("/nodes/{node}/sdn", "GET", { $path: { node } }),
					fabrics: {
						fabric: (fabric: string) => ({
							index:      () => r("/nodes/{node}/sdn/fabrics/{fabric}",            "GET", { $path: { node, fabric } }),
							interfaces: () => r("/nodes/{node}/sdn/fabrics/{fabric}/interfaces", "GET", { $path: { node, fabric } }),
							neighbors:  () => r("/nodes/{node}/sdn/fabrics/{fabric}/neighbors",  "GET", { $path: { node, fabric } }),
							routes:     () => r("/nodes/{node}/sdn/fabrics/{fabric}/routes",     "GET", { $path: { node, fabric } }),
						}),
					},
					vnets: {
						vnet: (vnet: string) => ({
							get:     () => r("/nodes/{node}/sdn/vnets/{vnet}",         "GET", { $path: { node, vnet } }),
							mac_vrf: () => r("/nodes/{node}/sdn/vnets/{vnet}/mac-vrf", "GET", { $path: { node, vnet } }),
						}),
					},
					zones: {
						index: () => r("/nodes/{node}/sdn/zones", "GET", { $path: { node } }),
						zone: (zone: string) => ({
							get:     () => r("/nodes/{node}/sdn/zones/{zone}",         "GET", { $path: { node, zone } }),
							bridges: () => r("/nodes/{node}/sdn/zones/{zone}/bridges", "GET", { $path: { node, zone } }),
							content: () => r("/nodes/{node}/sdn/zones/{zone}/content", "GET", { $path: { node, zone } }),
							ip_vrf:  () => r("/nodes/{node}/sdn/zones/{zone}/ip-vrf",  "GET", { $path: { node, zone } }),
						}),
					},
				},

				// ── Services ────────────────────────────────────────────────
				services: {
					index: () => r("/nodes/{node}/services", "GET", { $path: { node } }),
					service: (service: Service) => ({
						get:     () => r("/nodes/{node}/services/{service}",         "GET",  { $path: { node, service } }),
						reload:  () => r("/nodes/{node}/services/{service}/reload",  "POST", { $path: { node, service } }),
						restart: () => r("/nodes/{node}/services/{service}/restart", "POST", { $path: { node, service } }),
						start:   () => r("/nodes/{node}/services/{service}/start",   "POST", { $path: { node, service } }),
						state:   () => r("/nodes/{node}/services/{service}/state",   "GET",  { $path: { node, service } }),
						stop:    () => r("/nodes/{node}/services/{service}/stop",    "POST", { $path: { node, service } }),
					}),
				},

				// ── Storage ─────────────────────────────────────────────────
				storage: nodeStorageFactory(client, node),

				// ── Tasks ───────────────────────────────────────────────────
				tasks: {
					list: (args?: { $query?: NodesAPI["/nodes/{node}/tasks"]["GET"]["parameters"]["$query"] }) =>
						client.request("/nodes/{node}/tasks", "GET", {
							$path: { node },
							...(args ?? {}),
						} as NodesAPI["/nodes/{node}/tasks"]["GET"]["parameters"]),
					upid: (upid: string) => ({
						get:    () => r("/nodes/{node}/tasks/{upid}",       "GET",    { $path: { node, upid } }),
						delete: () => r("/nodes/{node}/tasks/{upid}",       "DELETE", { $path: { node, upid } }),
						log:    (...args: BoundArgs<"/nodes/{node}/tasks/{upid}/log", "GET">) => r("/nodes/{node}/tasks/{upid}/log", "GET", { ...args[0], $path: { node, upid } }),
						status: () => r("/nodes/{node}/tasks/{upid}/status", "GET", { $path: { node, upid } }),
					}),
				},

				// ── VZDump ──────────────────────────────────────────────────
				vzdump: {
					create:        (...args: BoundArgs<"/nodes/{node}/vzdump", "POST">) => r("/nodes/{node}/vzdump", "POST", { ...args[0], $path: { node } }),
					defaults:      (...args: BoundArgs<"/nodes/{node}/vzdump/defaults", "GET">) => r("/nodes/{node}/vzdump/defaults", "GET",  { ...args[0], $path: { node } }),
					extractconfig: (...args: BoundArgs<"/nodes/{node}/vzdump/extractconfig", "GET">) => r("/nodes/{node}/vzdump/extractconfig", "GET",  { ...args[0], $path: { node } }),
				},

				// ── Misc queries ────────────────────────────────────────────
				query_oci_repo_tags:  (...args: BoundArgs<"/nodes/{node}/query-oci-repo-tags", "GET">) => r("/nodes/{node}/query-oci-repo-tags", "GET", { ...args[0], $path: { node } }),
				query_url_metadata:   (...args: BoundArgs<"/nodes/{node}/query-url-metadata", "GET">) => r("/nodes/{node}/query-url-metadata", "GET", { ...args[0], $path: { node } }),
			};
	}

	return {
		/** Lists all cluster nodes. Calls GET /nodes. */
		list: (): Promise<NodesAPI["/nodes"]["GET"]["return"]> =>
			client.request("/nodes", "GET", {}),

		/** Returns node-scoped sub-APIs for the given node name. Memoized per node. */
		get: (node: string) => {
			const cached = nodeCache.get(node);
			if (cached) return cached;
			const api = buildNode(node);
			nodeCache.set(node, api);
			return api;
		},

		// Top-level unscoped factory references
		apt:      aptApi,
		ceph:     cephApi,
		disks:    disksApi,
		firewall: firewallApi,
		hardware: hardwareApi,
		lxc:      lxcApi,
		qemu:     qemuApi,
	};
}

export default Nodes;

// Node-scoped API returned by client.api.nodes.get(nodeName)
export type NodeScopedAPI = ReturnType<ReturnType<typeof Nodes>['get']>

