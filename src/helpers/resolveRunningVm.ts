import type {Client} from "../index";

export type GuestType = "qemu" | "lxc";

export type RunningVm = {
    vmid: number;
    node: string;
    type: GuestType;
};

type ResourceEntry = {
    vmid?: number;
    node?: string;
    type?: string;
    status?: string;
};

/**
 * Locates a guest through `/cluster/resources` and makes sure it is running.
 *
 * `/cluster/resources` is refreshed every few seconds, so right after a start it can still
 * report `stopped`. In that case the live status of the guest decides.
 */
export async function resolveRunningVm(client: Client, vmid: string | number, helper: string): Promise<RunningVm> {
    const resources = (await client.request("/cluster/resources", "GET", {
        $query: {type: "vm"},
    } as any)) as ResourceEntry[];

    const vm = resources.find((resource) => resource.vmid?.toString() === vmid.toString());

    if (!vm) throw new Error(`Unable to find virtual machine with id(${vmid}).`);
    if (!vm.node || !vm.vmid) throw new Error(`Virtual machine ${vmid} does not include node/vmid data.`);
    if (vm.type !== "qemu" && vm.type !== "lxc") throw new Error(`Unsupported VM type '${vm.type}' for ${helper} helper.`);

    if (vm.status !== "running") {
        const current = (await client.request(`/nodes/{node}/${vm.type}/{vmid}/status/current`, "GET", {
            $path: {node: vm.node, vmid: vm.vmid},
        } as any)) as { status?: string } | undefined;
        if (current?.status !== "running") throw new Error(`Virtual machine ${vmid} is not running.`);
    }

    return {
        vmid: vm.vmid,
        node: vm.node,
        type: vm.type,
    };
}
