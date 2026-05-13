export { acmeFactory } from "./acme.js";
export { backupFactory } from "./backup.js";
export { cephFactory } from "./ceph.js";
export { firewallFactory } from "./firewall.js";
export { haFactory } from "./ha.js";
export { configFactory } from "./config.js";
export { jobsFactory } from "./jobs.js";
export { mappingFactory } from "./mapping.js";
export { metricsFactory } from "./metrics.js";
export { notificationsFactory } from "./notifications.js";
export { optionsFactory } from "./options.js";
export { replicationFactory } from "./replication.js";
export { resourcesFactory } from "./resources.js";
export { sdnFactory } from "./sdn.js";
export { tasksFactory } from "./tasks.js";

// Default export: Cluster function
import { acmeFactory } from "./acme.js";
import { backupFactory } from "./backup.js";
import { cephFactory } from "./ceph.js";
import { firewallFactory } from "./firewall.js";
import { haFactory } from "./ha.js";
import { configFactory } from "./config.js";
import { jobsFactory } from "./jobs.js";
import { mappingFactory } from "./mapping.js";
import { metricsFactory } from "./metrics.js";
import { notificationsFactory } from "./notifications.js";
import { optionsFactory } from "./options.js";
import { replicationFactory } from "./replication.js";
import { resourcesFactory } from "./resources.js";
import { sdnFactory } from "./sdn.js";
import { tasksFactory } from "./tasks.js";
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
		// Add index and other endpoints as needed
		index: () => client.request("/cluster", "GET", {}),
		backup_info: () => client.request("/cluster/backup-info", "GET", {}),
		bulk_action: () => client.request("/cluster/bulk-action", "GET", {}),
	};
}

export default Cluster;
