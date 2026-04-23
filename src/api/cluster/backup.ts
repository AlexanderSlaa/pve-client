
import type { ArgsTuple, PathContext } from "../index.js";
import { Client } from "../../index.js";

export function backupFactory(client: Client) {
    return {
        index: (...args: any[]) => client.request("/cluster/backup", "GET", (args[0] ?? {})),
        create_job: (...args: any[]) => client.request("/cluster/backup", "POST", (args[0] ?? {})),
        job: (value: string | number) => ({
            delete: (...args: any[]) => client.request("/cluster/backup/{id}", "DELETE", { ...((args[0]) as any), $path: { id: value.toString() } }),
            read: (...args: any[]) => client.request("/cluster/backup/{id}", "GET", { ...((args[0]) as any), $path: { id: value.toString() } }),
            update: (...args: any[]) => client.request("/cluster/backup/{id}", "PUT", { ...((args[0]) as any), $path: { id: value.toString() } }),
            included_volumes: (...args: any[]) => client.request("/cluster/backup/{id}/included_volumes", "GET", { ...((args[0]) as any), $path: { id: value.toString() } })
        })
    };
}
