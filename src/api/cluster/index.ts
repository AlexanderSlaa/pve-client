

// Default export: Cluster function
import acmeFactory from "./acme";
import backupFactory from "./backup";
import cephFactory from "./ceph";
import firewallFactory from "./firewall";
import haFactory from "./ha";
import configFactory from "./config";
import jobsFactory from "./jobs";
import mappingFactory from "./mapping";
import metricsFactory from "./metrics";
import notificationsFactory from "./notifications";
import optionsFactory from "./options";
import replicationFactory from "./replication";
import resourcesFactory from "./resources";
import sdnFactory from "./sdn";
import tasksFactory from "./tasks";
import type { Client } from "../../index";
import type { ClusterAPI } from "./types";

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
			index:    () => client.request("/cluster/bulk-action", "GET", {}),
			guest:    () => (client.request as any)("/cluster/bulk-action/guest", "GET", {}),
			migrate:  (args?: any) => (client.request as any)("/cluster/bulk-action/guest/migrate",  "POST", args ?? {}),
			shutdown: (args?: any) => (client.request as any)("/cluster/bulk-action/guest/shutdown", "POST", args ?? {}),
			start:    (args?: any) => (client.request as any)("/cluster/bulk-action/guest/start",    "POST", args ?? {}),
			suspend:  (args?: any) => (client.request as any)("/cluster/bulk-action/guest/suspend",  "POST", args ?? {}),
		},
		qemu: {
			index:          () => (client.request as any)("/cluster/qemu",                      "GET", {}),
			cpu_flags:      () => (client.request as any)("/cluster/qemu/cpu-flags",            "GET", {}),
			custom_cpu: {
				index:  () => (client.request as any)("/cluster/qemu/custom-cpu-models",        "GET", {}),
				create: (args?: any) => (client.request as any)("/cluster/qemu/custom-cpu-models", "POST", args ?? {}),
				cputype: (cputype: string) => ({
					get:    () => (client.request as any)("/cluster/qemu/custom-cpu-models/{cputype}", "GET",    { $path: { cputype } }),
					update: (args?: any) => (client.request as any)("/cluster/qemu/custom-cpu-models/{cputype}", "PUT",    { ...args, $path: { cputype } }),
					delete: () => (client.request as any)("/cluster/qemu/custom-cpu-models/{cputype}", "DELETE", { $path: { cputype } }),
				}),
			},
		},
	};
}

export default Cluster;
