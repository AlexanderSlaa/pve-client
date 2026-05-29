

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
		// Add index and other endpoints as needed
		index: () => client.request("/cluster", "GET", {}),
		backup_info: () => client.request("/cluster/backup-info", "GET", {}),
		bulk_action: () => client.request("/cluster/bulk-action", "GET", {}),
	};
}

export default Cluster;
