

// Default export: Cluster function
import acmeFactory from "./acme.js";
import backupFactory from "./backup.js";
import cephFactory from "./ceph.js";
import firewallFactory from "./firewall.js";
import haFactory from "./ha.js";
import configFactory from "./config.js";
import jobsFactory from "./jobs.js";
import mappingFactory from "./mapping.js";
import metricsFactory from "./metrics.js";
import notificationsFactory from "./notifications.js";
import optionsFactory from "./options.js";
import replicationFactory from "./replication.js";
import resourcesFactory from "./resources.js";
import sdnFactory from "./sdn.js";
import tasksFactory from "./tasks.js";
import type { Client } from "../../index.js";
import type { ClusterAPI } from "./types.js";

function Cluster(client: Client) {
	return {
		/** Returns the next available VM ID. Calls GET /cluster/nextid. */
		nextid: (args?: ClusterAPI["/cluster/nextid"]["GET"]["parameters"]):
			Promise<ClusterAPI["/cluster/nextid"]["GET"]["return"]> =>
			client.request("/cluster/nextid", "GET", args ?? {}),

		acme: acmeFactory(client),
		backup: backupFactory(client),
		ceph: cephFactory(client),
		firewall: firewallFactory(client),
		ha: haFactory(client),
		config: configFactory(client),
		jobs: jobsFactory(client),
		mapping: mappingFactory(client),
		metrics: metricsFactory(client),
		notifications: notificationsFactory(client),
		options: optionsFactory(client),
		replication: replicationFactory(client),
		resources: resourcesFactory(client),
		sdn: sdnFactory(client),
		/** Lists cluster and node status. Calls GET /cluster/status. */
		status: (): Promise<ClusterAPI["/cluster/status"]["GET"]["return"]> =>
			client.request("/cluster/status", "GET", {}),
		tasks: tasksFactory(client),
		index: () => client.request("/cluster", "GET", {}),
		log: (args?: ClusterAPI["/cluster/log"]["GET"]["parameters"]) =>
			client.request("/cluster/log", "GET", args ?? {}),
		backup_info: {
			index:           () => client.request("/cluster/backup-info", "GET", {}),
			not_backed_up:   (args?: ClusterAPI["/cluster/backup-info/not-backed-up"]["GET"]["parameters"]) =>
				client.request("/cluster/backup-info/not-backed-up", "GET", args ?? {}),
		},
		bulk_action: {
			index:    (): Promise<ClusterAPI["/cluster/bulk-action"]["GET"]["return"]> =>
				client.request("/cluster/bulk-action", "GET", {}),
			guest:    (): Promise<ClusterAPI["/cluster/bulk-action/guest"]["GET"]["return"]> =>
				client.request("/cluster/bulk-action/guest", "GET", {}),
			migrate:  (args: ClusterAPI["/cluster/bulk-action/guest/migrate"]["POST"]["parameters"]): Promise<ClusterAPI["/cluster/bulk-action/guest/migrate"]["POST"]["return"]> =>
				client.request("/cluster/bulk-action/guest/migrate", "POST", args),
			shutdown: (args: ClusterAPI["/cluster/bulk-action/guest/shutdown"]["POST"]["parameters"]): Promise<ClusterAPI["/cluster/bulk-action/guest/shutdown"]["POST"]["return"]> =>
				client.request("/cluster/bulk-action/guest/shutdown", "POST", args),
			start:    (args: ClusterAPI["/cluster/bulk-action/guest/start"]["POST"]["parameters"]): Promise<ClusterAPI["/cluster/bulk-action/guest/start"]["POST"]["return"]> =>
				client.request("/cluster/bulk-action/guest/start", "POST", args),
			suspend:  (args: ClusterAPI["/cluster/bulk-action/guest/suspend"]["POST"]["parameters"]): Promise<ClusterAPI["/cluster/bulk-action/guest/suspend"]["POST"]["return"]> =>
				client.request("/cluster/bulk-action/guest/suspend", "POST", args),
		},
		qemu: {
			index:     (): Promise<ClusterAPI["/cluster/qemu"]["GET"]["return"]> =>
				client.request("/cluster/qemu", "GET", {}),
			cpu_flags: (args?: ClusterAPI["/cluster/qemu/cpu-flags"]["GET"]["parameters"]): Promise<ClusterAPI["/cluster/qemu/cpu-flags"]["GET"]["return"]> =>
				client.request("/cluster/qemu/cpu-flags", "GET", args ?? {}),
			custom_cpu: {
				index:  (): Promise<ClusterAPI["/cluster/qemu/custom-cpu-models"]["GET"]["return"]> =>
					client.request("/cluster/qemu/custom-cpu-models", "GET", {}),
				create: (args: ClusterAPI["/cluster/qemu/custom-cpu-models"]["POST"]["parameters"]): Promise<ClusterAPI["/cluster/qemu/custom-cpu-models"]["POST"]["return"]> =>
					client.request("/cluster/qemu/custom-cpu-models", "POST", args),
				cputype: (cputype: string) => ({
					get:    (): Promise<ClusterAPI["/cluster/qemu/custom-cpu-models/{cputype}"]["GET"]["return"]> =>
						client.request("/cluster/qemu/custom-cpu-models/{cputype}", "GET", { $path: { cputype } }),
					update: (args?: ClusterAPI["/cluster/qemu/custom-cpu-models/{cputype}"]["PUT"]["parameters"]): Promise<ClusterAPI["/cluster/qemu/custom-cpu-models/{cputype}"]["PUT"]["return"]> =>
						client.request("/cluster/qemu/custom-cpu-models/{cputype}", "PUT", { ...(args ?? {}), $path: { cputype } } as ClusterAPI["/cluster/qemu/custom-cpu-models/{cputype}"]["PUT"]["parameters"]),
					delete: (): Promise<ClusterAPI["/cluster/qemu/custom-cpu-models/{cputype}"]["DELETE"]["return"]> =>
						client.request("/cluster/qemu/custom-cpu-models/{cputype}", "DELETE", { $path: { cputype } }),
				}),
			},
		},
	};
}

export default Cluster;
