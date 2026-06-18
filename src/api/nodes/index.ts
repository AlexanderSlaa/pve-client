export { default as hardwareFactory } from "./hardware.js";
export { default as aptFactory } from "./apt.js";
export { default as cephFactory } from "./ceph.js";
export { default as lxcFactory } from "./lxc.js";
export { default as qemuFactory } from "./qemu.js";
export { default as firewallFactory } from "./firewall.js";
export { default as disksFactory } from "./disks.js";


import aptFactory from "./apt.js";
import cephFactory from "./ceph.js";
import disksFactory from "./disks.js";
import firewallFactory from "./firewall.js";
import hardwareFactory from "./hardware.js";
import lxcFactory from "./lxc.js";
import qemuFactory from "./qemu.js";
import type { Client } from "../../index.js";
import type { NodesAPI } from "./types.js";
import nodeStorageFactory from "./storage.js";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type A = any;

function Nodes(client: Client) {
	// Shortcut for untyped calls
	const r = (path: string, method: string, args?: A) =>
		(client.request as A)(path, method, args ?? {});

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
					index:        (args?: A) => aptApi.index(node, args),
					changelog:    (args?: A) => aptApi.changelog(node, args),
					repositories: (args?: A) => r("/nodes/{node}/apt/repositories", "GET", { ...args, $path: { node } }),
					update:       (args?: A) => r("/nodes/{node}/apt/update",       "POST", { ...args, $path: { node } }),
					versions:     (args?: A) => r("/nodes/{node}/apt/versions",     "GET",  { ...args, $path: { node } }),
				},

				// ── Capabilities ────────────────────────────────────────────
				capabilities: {
					index: () => r("/nodes/{node}/capabilities",                 "GET", { $path: { node } }),
					qemu:  {
						index:     () => r("/nodes/{node}/capabilities/qemu",           "GET", { $path: { node } }),
						cpu:       () => r("/nodes/{node}/capabilities/qemu/cpu",       "GET", { $path: { node } }),
						cpu_flags: () => r("/nodes/{node}/capabilities/qemu/cpu-flags", "GET", { $path: { node } }),
						machines:  () => r("/nodes/{node}/capabilities/qemu/machines",  "GET", { $path: { node } }),
						migration: () => r("/nodes/{node}/capabilities/qemu/migration", "GET", { $path: { node } }),
					},
				},

				// ── Ceph ────────────────────────────────────────────────────
				ceph: {
					index:  (args?: A) => cephApi.index(node, args),
					cfg:    (args?: A) => cephApi.cfg(node, args),
					cfg_db:    () => r("/nodes/{node}/ceph/cfg/db",    "GET",  { $path: { node } }),
					cfg_raw:   () => r("/nodes/{node}/ceph/cfg/raw",   "GET",  { $path: { node } }),
					cfg_value: (args?: A) => r("/nodes/{node}/ceph/cfg/value", "GET", { ...args, $path: { node } }),
					cmd_safety:(args?: A) => r("/nodes/{node}/ceph/cmd-safety", "GET", { ...args, $path: { node } }),
					crush:     () => r("/nodes/{node}/ceph/crush",  "GET",  { $path: { node } }),
					init:      (args?: A) => r("/nodes/{node}/ceph/init",   "POST", { ...args, $path: { node } }),
					log:       (args?: A) => r("/nodes/{node}/ceph/log",    "GET",  { ...args, $path: { node } }),
					restart:   (args?: A) => r("/nodes/{node}/ceph/restart","POST", { ...args, $path: { node } }),
					rules:     () => r("/nodes/{node}/ceph/rules",   "GET",  { $path: { node } }),
					start:     (args?: A) => r("/nodes/{node}/ceph/start",  "POST", { ...args, $path: { node } }),
					status:    () => r("/nodes/{node}/ceph/status",  "GET",  { $path: { node } }),
					stop:      (args?: A) => r("/nodes/{node}/ceph/stop",   "POST", { ...args, $path: { node } }),
					fs: {
						index:  () => r("/nodes/{node}/ceph/fs", "GET", { $path: { node } }),
						name: (name: string) => ({
							create: (args?: A) => r("/nodes/{node}/ceph/fs/{name}", "POST", { ...args, $path: { node, name } }),
							delete: (args?: A) => r("/nodes/{node}/ceph/fs/{name}", "DELETE", { ...args, $path: { node, name } }),
						}),
					},
					mds: {
						index: () => r("/nodes/{node}/ceph/mds", "GET", { $path: { node } }),
						name: (name: string) => ({
							create: (args?: A) => r("/nodes/{node}/ceph/mds/{name}", "POST",   { ...args, $path: { node, name } }),
							delete: (args?: A) => r("/nodes/{node}/ceph/mds/{name}", "DELETE", { ...args, $path: { node, name } }),
						}),
					},
					mgr: {
						index: () => r("/nodes/{node}/ceph/mgr", "GET", { $path: { node } }),
						id: (id: string) => ({
							create: (args?: A) => r("/nodes/{node}/ceph/mgr/{id}", "POST",   { ...args, $path: { node, id } }),
							delete: (args?: A) => r("/nodes/{node}/ceph/mgr/{id}", "DELETE", { ...args, $path: { node, id } }),
						}),
					},
					mon: {
						index: () => r("/nodes/{node}/ceph/mon", "GET", { $path: { node } }),
						monid: (monid: string) => ({
							create: (args?: A) => r("/nodes/{node}/ceph/mon/{monid}", "POST",   { ...args, $path: { node, monid } }),
							delete: (args?: A) => r("/nodes/{node}/ceph/mon/{monid}", "DELETE", { ...args, $path: { node, monid } }),
						}),
					},
					osd: {
						index:  () => r("/nodes/{node}/ceph/osd", "GET",  { $path: { node } }),
						create: (args?: A) => r("/nodes/{node}/ceph/osd", "POST", { ...args, $path: { node } }),
						osdid: (osdid: string | number) => ({
							get:       () => r("/nodes/{node}/ceph/osd/{osdid}",          "GET",    { $path: { node, osdid } }),
							delete:    (args?: A) => r("/nodes/{node}/ceph/osd/{osdid}",  "DELETE", { ...args, $path: { node, osdid } }),
							in:        (args?: A) => r("/nodes/{node}/ceph/osd/{osdid}/in",        "POST", { ...args, $path: { node, osdid } }),
							out:       (args?: A) => r("/nodes/{node}/ceph/osd/{osdid}/out",       "POST", { ...args, $path: { node, osdid } }),
							scrub:     (args?: A) => r("/nodes/{node}/ceph/osd/{osdid}/scrub",     "POST", { ...args, $path: { node, osdid } }),
							lv_info:   (args?: A) => r("/nodes/{node}/ceph/osd/{osdid}/lv-info",   "GET",  { ...args, $path: { node, osdid } }),
							metadata:  () => r("/nodes/{node}/ceph/osd/{osdid}/metadata",  "GET",  { $path: { node, osdid } }),
						}),
					},
					pool: {
						index:  () => r("/nodes/{node}/ceph/pool", "GET",  { $path: { node } }),
						create: (args?: A) => r("/nodes/{node}/ceph/pool", "POST", { ...args, $path: { node } }),
						name: (name: string) => ({
							get:    () => r("/nodes/{node}/ceph/pool/{name}",        "GET",    { $path: { node, name } }),
							update: (args?: A) => r("/nodes/{node}/ceph/pool/{name}", "PUT",    { ...args, $path: { node, name } }),
							delete: (args?: A) => r("/nodes/{node}/ceph/pool/{name}", "DELETE", { ...args, $path: { node, name } }),
							status: (args?: A) => r("/nodes/{node}/ceph/pool/{name}/status", "GET", { ...args, $path: { node, name } }),
						}),
					},
				},

				// ── Certificates ────────────────────────────────────────────
				certificates: {
					index: () => r("/nodes/{node}/certificates", "GET", { $path: { node } }),
					acme: {
						index:       () => r("/nodes/{node}/certificates/acme",             "GET",    { $path: { node } }),
						certificate: {
							create: (args?: A) => r("/nodes/{node}/certificates/acme/certificate", "POST",   { ...args, $path: { node } }),
							renew:  (args?: A) => r("/nodes/{node}/certificates/acme/certificate", "PUT",    { ...args, $path: { node } }),
							delete: ()         => r("/nodes/{node}/certificates/acme/certificate", "DELETE", { $path: { node } }),
						},
					},
					custom: {
						upload: (args?: A) => r("/nodes/{node}/certificates/custom", "POST",   { ...args, $path: { node } }),
						delete: ()         => r("/nodes/{node}/certificates/custom", "DELETE", { $path: { node } }),
					},
					info: () => r("/nodes/{node}/certificates/info", "GET", { $path: { node } }),
				},

				// ── Config ──────────────────────────────────────────────────
				config: {
					get:    () => r("/nodes/{node}/config", "GET", { $path: { node } }),
					update: (args?: A) => r("/nodes/{node}/config", "PUT", { ...args, $path: { node } }),
				},

				// ── Disks ───────────────────────────────────────────────────
				disks: {
					index:    () => disksApi.list(node, undefined as any),
					list:     (args?: A) => disksApi.list(node, args),
					list_disks: (args?: A) => disksApi.list_disks(node, args),
					directory: {
						index:  () => r("/nodes/{node}/disks/directory", "GET", { $path: { node } }),
						create: (args?: A) => r("/nodes/{node}/disks/directory", "POST", { ...args, $path: { node } }),
						name: (name: string) => ({
							delete: (args?: A) => r("/nodes/{node}/disks/directory/{name}", "DELETE", { ...args, $path: { node, name } }),
						}),
					},
					initgpt: (args?: A) => r("/nodes/{node}/disks/initgpt", "POST", { ...args, $path: { node } }),
					lvm: {
						index:  () => r("/nodes/{node}/disks/lvm", "GET", { $path: { node } }),
						create: (args?: A) => r("/nodes/{node}/disks/lvm", "POST", { ...args, $path: { node } }),
						name: (name: string) => ({
							delete: (args?: A) => r("/nodes/{node}/disks/lvm/{name}", "DELETE", { ...args, $path: { node, name } }),
						}),
					},
					lvmthin: {
						index:  () => r("/nodes/{node}/disks/lvmthin", "GET", { $path: { node } }),
						create: (args?: A) => r("/nodes/{node}/disks/lvmthin", "POST", { ...args, $path: { node } }),
						name: (name: string) => ({
							delete: (args?: A) => r("/nodes/{node}/disks/lvmthin/{name}", "DELETE", { ...args, $path: { node, name } }),
						}),
					},
					smart:    (args?: A) => r("/nodes/{node}/disks/smart",    "GET",  { ...args, $path: { node } }),
					wipedisk: (args?: A) => r("/nodes/{node}/disks/wipedisk", "PUT",  { ...args, $path: { node } }),
					zfs: {
						index:  () => r("/nodes/{node}/disks/zfs", "GET", { $path: { node } }),
						create: (args?: A) => r("/nodes/{node}/disks/zfs", "POST", { ...args, $path: { node } }),
						name: (name: string) => ({
							get:    () => r("/nodes/{node}/disks/zfs/{name}", "GET",    { $path: { node, name } }),
							delete: (args?: A) => r("/nodes/{node}/disks/zfs/{name}", "DELETE", { ...args, $path: { node, name } }),
						}),
					},
				},

				// ── DNS ─────────────────────────────────────────────────────
				dns: {
					get:    () => r("/nodes/{node}/dns", "GET", { $path: { node } }),
					update: (args?: A) => r("/nodes/{node}/dns", "PUT", { ...args, $path: { node } }),
				},

				// ── Execute ─────────────────────────────────────────────────
				execute: (args?: A) => r("/nodes/{node}/execute", "POST", { ...args, $path: { node } }),

				// ── Firewall ────────────────────────────────────────────────
				firewall: {
					get:     (args?: A) => firewallApi.get(node, args),
					log:     (args?: A) => r("/nodes/{node}/firewall/log",     "GET", { ...args, $path: { node } }),
					options: {
						get: () => r("/nodes/{node}/firewall/options", "GET", { $path: { node } }),
						set: (args?: A) => r("/nodes/{node}/firewall/options", "PUT", { ...args, $path: { node } }),
					},
					rules: {
						index:  () => r("/nodes/{node}/firewall/rules", "GET",  { $path: { node } }),
						create: (args?: A) => r("/nodes/{node}/firewall/rules", "POST", { ...args, $path: { node } }),
						pos: (pos: number | string) => ({
							get:    () => r("/nodes/{node}/firewall/rules/{pos}", "GET",    { $path: { node, pos } }),
							update: (args?: A) => r("/nodes/{node}/firewall/rules/{pos}", "PUT",    { ...args, $path: { node, pos } }),
							delete: (args?: A) => r("/nodes/{node}/firewall/rules/{pos}", "DELETE", { ...args, $path: { node, pos } }),
						}),
					},
				},

				// ── Hardware ────────────────────────────────────────────────
				hardware: {
					get: (args?: A) => hardwareApi.get(node, args),
					pci: {
						get: (args?: A) => hardwareApi.pci.get(node, args),
						pci_id: (pciId: string) => ({
							get:  () => r("/nodes/{node}/hardware/pci/{pci-id-or-mapping}", "GET", { $path: { node, "pci-id-or-mapping": pciId } }),
							mdev: () => r("/nodes/{node}/hardware/pci/{pci-id-or-mapping}/mdev", "GET", { $path: { node, "pci-id-or-mapping": pciId } }),
						}),
					},
					usb: { get: (args?: A) => hardwareApi.usb.get(node, args) },
				},

				// ── Hosts ───────────────────────────────────────────────────
				hosts: {
					get:    () => r("/nodes/{node}/hosts", "GET", { $path: { node } }),
					update: (args?: A) => r("/nodes/{node}/hosts", "POST", { ...args, $path: { node } }),
				},

				// ── Journal ─────────────────────────────────────────────────
				journal: (args?: A) => r("/nodes/{node}/journal", "GET", { ...args, $path: { node } }),

				// ── LXC ─────────────────────────────────────────────────────
				lxc: {
					list:   (args?: A) => lxcApi.list(node, args),
					create: (args?: A) => lxcApi.create(node, args),
					id: (vmid: number) => ({
						status_index:    () => lxcApi.status_index(node, vmid),
						mtunnel:         (args?: A) => lxcApi.mtunnel(node, vmid, args),
						mtunnelwebsocket:(args?: A) => lxcApi.mtunnelwebsocket(node, vmid, args),
						remote_migrate:  (args?: A) => lxcApi.remote_migrate(node, vmid, args),
						destroy:    (args?: A) => lxcApi.delete(node, vmid, args),
						diridx:     (args?: A) => lxcApi.get(node, vmid, args),
						clone:      (args: A)  => lxcApi.clone(node, vmid, args),
						interfaces: ()         => lxcApi.interfaces(node, vmid),
						migrate:    (args: A)  => lxcApi.migrate(node, vmid, args),
						move_volume:(args: A)  => lxcApi.move_volume(node, vmid, args),
						resize:     (args: A)  => lxcApi.resize(node, vmid, args),
						template:   ()         => lxcApi.template(node, vmid),
						feature:    (args?: A) => lxcApi.feature(node, vmid, args),
						pending:    ()         => lxcApi.pending(node, vmid),
						rrd:        (args?: A) => lxcApi.rrd(node, vmid, args),
						rrddata:    (args?: A) => lxcApi.rrddata(node, vmid, args),
						spiceproxy: (args?: A) => lxcApi.spiceproxy(node, vmid, args),
						termproxy:  (args?: A) => lxcApi.termproxy(node, vmid, args),
						vncproxy:   (args?: A) => lxcApi.vncproxy(node, vmid, args),
						vncwebsocket:(args?: A) => lxcApi.vncwebsocket(node, vmid, args),
						config: {
							get:    (args?: A) => lxcApi.config.get(node, vmid, args),
							update: (args?: A) => lxcApi.config.put(node, vmid, args),
						},
						firewall: {
							get:     () => lxcApi.firewall.get(node, vmid),
							log:     (args?: A) => lxcApi.firewall.log(node, vmid, args),
							refs:    (args?: A) => lxcApi.firewall.refs(node, vmid, args),
							options: {
								get: () => lxcApi.firewall.options.get(node, vmid),
								set: (args?: A) => lxcApi.firewall.options.set(node, vmid, args),
							},
							aliases: {
								list:   () => lxcApi.firewall.aliases.list(node, vmid),
								create: (args: A) => lxcApi.firewall.aliases.create(node, vmid, args),
								name:   (name: string) => lxcApi.firewall.aliases.name(node, vmid, name),
							},
							ipset: {
								list:   () => lxcApi.firewall.ipset.list(node, vmid),
								create: (args: A) => lxcApi.firewall.ipset.create(node, vmid, args),
								name:   (name: string) => lxcApi.firewall.ipset.name(node, vmid, name),
							},
							rules: {
								list:   () => lxcApi.firewall.rules.list(node, vmid),
								create: (args: A) => lxcApi.firewall.rules.create(node, vmid, args),
								pos:    (pos: number) => lxcApi.firewall.rules.pos(node, vmid, pos),
							},
						},
						snapshot: {
							list:     () => lxcApi.snapshot.list(node, vmid),
							create:   (args: A) => lxcApi.snapshot.create(node, vmid, args),
							snapname: (snapname: string) => lxcApi.snapshot.snapname(node, vmid, snapname),
						},
						status: {
							current:  () => lxcApi.status.current(node, vmid),
							start:    (args?: A) => lxcApi.status.start(node, vmid, args),
							stop:     (args?: A) => lxcApi.status.stop(node, vmid, args),
							reboot:   (args?: A) => lxcApi.status.reboot(node, vmid, args),
							resume:   (args?: A) => lxcApi.status.resume(node, vmid, args),
							shutdown: (args?: A) => lxcApi.status.shutdown(node, vmid, args),
							suspend:  (args?: A) => lxcApi.status.suspend(node, vmid, args),
						},
					}),
				},

				// ── Misc node ops ───────────────────────────────────────────
				aplinfo:     (args?: A) => r("/nodes/{node}/aplinfo",     "GET",  { ...args, $path: { node } }),
				migrateall:  (args?: A) => r("/nodes/{node}/migrateall",  "POST", { ...args, $path: { node } }),
				netstat:     ()         => r("/nodes/{node}/netstat",     "GET",  { $path: { node } }),
				report:      ()         => r("/nodes/{node}/report",      "GET",  { $path: { node } }),
				rrd:         (args?: A) => r("/nodes/{node}/rrd",         "GET",  { ...args, $path: { node } }),
				rrddata:     (args?: A) => r("/nodes/{node}/rrddata",     "GET",  { ...args, $path: { node } }),
				spiceshell:  (args?: A) => r("/nodes/{node}/spiceshell",  "POST", { ...args, $path: { node } }),
				startall:    (args?: A) => r("/nodes/{node}/startall",    "POST", { ...args, $path: { node } }),
				stopall:     (args?: A) => r("/nodes/{node}/stopall",     "POST", { ...args, $path: { node } }),
				suspendall:  (args?: A) => r("/nodes/{node}/suspendall",  "POST", { ...args, $path: { node } }),
				syslog:      (args?: A) => r("/nodes/{node}/syslog",      "GET",  { ...args, $path: { node } }),
				termproxy:   (args?: A) => r("/nodes/{node}/termproxy",   "POST", { ...args, $path: { node } }),
				time:        {
					get:    () => r("/nodes/{node}/time", "GET", { $path: { node } }),
					update: (args?: A) => r("/nodes/{node}/time", "PUT", { ...args, $path: { node } }),
				},
				version:     () => r("/nodes/{node}/version",  "GET",  { $path: { node } }),
				vncshell:    (args?: A) => r("/nodes/{node}/vncshell", "POST", { ...args, $path: { node } }),
				vncwebsocket:(args?: A) => r("/nodes/{node}/vncwebsocket", "GET", { ...args, $path: { node } }),
				wakeonlan:   () => r("/nodes/{node}/wakeonlan", "POST", { $path: { node } }),
				status: {
					get:  () => r("/nodes/{node}/status", "GET",  { $path: { node } }),
					post: (args?: A) => r("/nodes/{node}/status", "POST", { ...args, $path: { node } }),
				},
				subscription: {
					get:    () => r("/nodes/{node}/subscription", "GET",    { $path: { node } }),
					update: (args?: A) => r("/nodes/{node}/subscription", "POST",   { ...args, $path: { node } }),
					delete: ()         => r("/nodes/{node}/subscription", "DELETE", { $path: { node } }),
					set:    (args?: A) => r("/nodes/{node}/subscription", "PUT",    { ...args, $path: { node } }),
				},

				// ── Network ─────────────────────────────────────────────────
				network: {
					index:  (args?: A) => r("/nodes/{node}/network", "GET",    { ...args, $path: { node } }),
					create: (args?: A) => r("/nodes/{node}/network", "POST",   { ...args, $path: { node } }),
					revert: ()         => r("/nodes/{node}/network", "DELETE", { $path: { node } }),
					iface: (iface: string) => ({
						get:    () => r("/nodes/{node}/network/{iface}", "GET",    { $path: { node, iface } }),
						update: (args?: A) => r("/nodes/{node}/network/{iface}", "PUT",    { ...args, $path: { node, iface } }),
						delete: ()         => r("/nodes/{node}/network/{iface}", "DELETE", { $path: { node, iface } }),
					}),
				},

				// ── QEMU ────────────────────────────────────────────────────
				qemu: {
					list:   (args?: A) => qemuApi.list(node, args),
					create: (args?: A) => qemuApi.create(node, args),
					vmid: (vmid: number) => ({
						status_index: () => qemuApi.status_index(node, vmid),
						dbus_vmstate: qemuApi.dbus_vmstate,
						mtunnel:      (args?: A) => qemuApi.mtunnel(node, vmid, args),
						mtunnelwebsocket: (args?: A) => qemuApi.mtunnelwebsocket(node, vmid, args),
						remote_migrate:   (args?: A) => qemuApi.remote_migrate(node, vmid, args),
						destroy:     (args?: A) => qemuApi.delete(node, vmid, args),
						diridx:      (args?: A) => qemuApi.get(node, vmid, args),
						clone:       (args: A)  => qemuApi.clone(node, vmid, args),
						migrate:     (args: A)  => qemuApi.migrate(node, vmid, args),
						feature:     (args?: A) => qemuApi.feature(node, vmid, args),
						pending:     ()          => qemuApi.pending(node, vmid),
						template:    (args?: A) => qemuApi.template(node, vmid, args),
						resize:      (args: A)  => qemuApi.resize(node, vmid, args),
						move_disk:   (args: A)  => qemuApi.move_disk(node, vmid, args),
						unlink:      (args: A)  => qemuApi.unlink(node, vmid, args),
						sendkey:     (args: A)  => qemuApi.sendkey(node, vmid, args),
						monitor:     (args: A)  => qemuApi.monitor(node, vmid, args),
						rrd:         (args?: A) => qemuApi.rrd(node, vmid, args),
						rrddata:     (args?: A) => qemuApi.rrddata(node, vmid, args),
						spiceproxy:  (args?: A) => qemuApi.spiceproxy(node, vmid, args),
						termproxy:   (args?: A) => qemuApi.termproxy(node, vmid, args),
						vncproxy:    (args?: A) => qemuApi.vncproxy(node, vmid, args),
						vncwebsocket:(args?: A) => qemuApi.vncwebsocket(node, vmid, args),
						agent: {
							index:                   (args?: A) => qemuApi.agent(node, vmid, args),
							exec:                    (args: A)  => qemuApi.agent_exec(node, vmid, args),
							exec_status:             (args?: A) => qemuApi.agent_exec_status(node, vmid, args),
							file_read:               (args?: A) => qemuApi.agent_file_read(node, vmid, args),
							file_write:              (args: A)  => qemuApi.agent_file_write(node, vmid, args),
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
							set_user_password:       (args: A)  => qemuApi.agent_set_user_password(node, vmid, args),
						},
						cloudinit: {
							get:    () => qemuApi.cloudinit.get(node, vmid),
							update: (args?: A) => qemuApi.cloudinit.update(node, vmid, args),
							dump:   (args?: A) => qemuApi.cloudinit.dump(node, vmid, args),
						},
						config: {
							get:          (args?: A) => qemuApi.config.get(node, vmid, args),
							update_async: (args?: A) => qemuApi.config.post(node, vmid, args),
							update:       (args?: A) => qemuApi.config.put(node, vmid, args),
						},
						firewall: {
							get:     () => qemuApi.firewall.get(node, vmid),
							log:     (args?: A) => qemuApi.firewall.log(node, vmid, args),
							refs:    (args?: A) => qemuApi.firewall.refs(node, vmid, args),
							options: {
								get: () => qemuApi.firewall.options.get(node, vmid),
								set: (args?: A) => qemuApi.firewall.options.set(node, vmid, args),
							},
							aliases: {
								list:   () => qemuApi.firewall.aliases.list(node, vmid),
								create: (args: A) => qemuApi.firewall.aliases.create(node, vmid, args),
								name:   (name: string) => qemuApi.firewall.aliases.name(node, vmid, name),
							},
							ipset: {
								list:   () => qemuApi.firewall.ipset.list(node, vmid),
								create: (args: A) => qemuApi.firewall.ipset.create(node, vmid, args),
								name:   (name: string) => qemuApi.firewall.ipset.name(node, vmid, name),
							},
							rules: {
								list:   () => qemuApi.firewall.rules.list(node, vmid),
								create: (args: A) => qemuApi.firewall.rules.create(node, vmid, args),
								pos:    (pos: number) => qemuApi.firewall.rules.pos(node, vmid, pos),
							},
						},
						snapshot: {
							list:     () => qemuApi.snapshot.list(node, vmid),
							create:   (args: A) => qemuApi.snapshot.create(node, vmid, args),
							snapname: (snapname: string) => qemuApi.snapshot.snapname(node, vmid, snapname),
						},
						status: {
							current:  () => qemuApi.status.current(node, vmid),
							start:    (args?: A) => qemuApi.status.start(node, vmid, args),
							stop:     (args?: A) => qemuApi.status.stop(node, vmid, args),
							reboot:   (args?: A) => qemuApi.status.reboot(node, vmid, args),
							reset:    (args?: A) => qemuApi.status.reset(node, vmid, args),
							resume:   (args?: A) => qemuApi.status.resume(node, vmid, args),
							shutdown: (args?: A) => qemuApi.status.shutdown(node, vmid, args),
							suspend:  (args?: A) => qemuApi.status.suspend(node, vmid, args),
						},
					}),
				},

				// ── Replication ─────────────────────────────────────────────
				replication: {
					index: (args?: A) => r("/nodes/{node}/replication", "GET", { ...args, $path: { node } }),
					id: (id: string) => ({
						get:           () => r("/nodes/{node}/replication/{id}",              "GET",  { $path: { node, id } }),
						log:           (args?: A) => r("/nodes/{node}/replication/{id}/log",          "GET",  { ...args, $path: { node, id } }),
						schedule_now:  (args?: A) => r("/nodes/{node}/replication/{id}/schedule_now", "POST", { ...args, $path: { node, id } }),
						status:        () => r("/nodes/{node}/replication/{id}/status",       "GET",  { $path: { node, id } }),
					}),
				},

				// ── Scan ────────────────────────────────────────────────────
				scan: {
					index:   () => r("/nodes/{node}/scan",        "GET", { $path: { node } }),
					cifs:    (args?: A) => r("/nodes/{node}/scan/cifs",    "GET", { ...args, $path: { node } }),
					iscsi:   (args?: A) => r("/nodes/{node}/scan/iscsi",   "GET", { ...args, $path: { node } }),
					lvm:     () => r("/nodes/{node}/scan/lvm",     "GET", { $path: { node } }),
					lvmthin: (args?: A) => r("/nodes/{node}/scan/lvmthin", "GET", { ...args, $path: { node } }),
					nfs:     (args?: A) => r("/nodes/{node}/scan/nfs",     "GET", { ...args, $path: { node } }),
					pbs:     (args?: A) => r("/nodes/{node}/scan/pbs",     "GET", { ...args, $path: { node } }),
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
					service: (service: string) => ({
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
						log:    (args?: A) => r("/nodes/{node}/tasks/{upid}/log",    "GET", { ...args, $path: { node, upid } }),
						status: () => r("/nodes/{node}/tasks/{upid}/status", "GET", { $path: { node, upid } }),
					}),
				},

				// ── VZDump ──────────────────────────────────────────────────
				vzdump: {
					create:        (args?: A) => r("/nodes/{node}/vzdump",                  "POST", { ...args, $path: { node } }),
					defaults:      (args?: A) => r("/nodes/{node}/vzdump/defaults",         "GET",  { ...args, $path: { node } }),
					extractconfig: (args?: A) => r("/nodes/{node}/vzdump/extractconfig",    "GET",  { ...args, $path: { node } }),
				},

				// ── Misc queries ────────────────────────────────────────────
				query_oci_repo_tags:  (args?: A) => r("/nodes/{node}/query-oci-repo-tags",  "GET", { ...args, $path: { node } }),
				query_url_metadata:   (args?: A) => r("/nodes/{node}/query-url-metadata",   "GET", { ...args, $path: { node } }),
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
