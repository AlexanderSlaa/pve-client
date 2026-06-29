import type { Client } from "../../index";
import type { ArgsTuple, PathContext } from "../index";
import type { ClusterAPI } from "./types";

export default function backupFactory(client: Client) {
    return {
        index: (...args: ArgsTuple<ClusterAPI["/cluster/backup"]["GET"]["parameters"]>) =>
            client.request("/cluster/backup", "GET", args[0] ?? {}),
        create_job: (...args: ArgsTuple<ClusterAPI["/cluster/backup"]["POST"]["parameters"]>) =>
            client.request("/cluster/backup", "POST", args[0] ?? {}),
        job: (value: string | number) => ({
            delete: (...args: ArgsTuple<PathContext<ClusterAPI["/cluster/backup/{id}"]["DELETE"]["parameters"]>>) =>
                client.request("/cluster/backup/{id}", "DELETE", {
                    ...(args[0] ?? {}),
                    $path: { id: value.toString() },
                }),
            read: (...args: ArgsTuple<PathContext<ClusterAPI["/cluster/backup/{id}"]["GET"]["parameters"]>>) =>
                client.request("/cluster/backup/{id}", "GET", {
                    ...(args[0] ?? {}),
                    $path: { id: value.toString() },
                }),
            update: (...args: ArgsTuple<PathContext<ClusterAPI["/cluster/backup/{id}"]["PUT"]["parameters"]>>) =>
                client.request("/cluster/backup/{id}", "PUT", {
                    ...(args[0] ?? {}),
                    $path: { id: value.toString() },
                }),
            included_volumes: (...args: ArgsTuple<PathContext<ClusterAPI["/cluster/backup/{id}/included_volumes"]["GET"]["parameters"]>>) =>
                client.request("/cluster/backup/{id}/included_volumes", "GET", {
                    ...(args[0] ?? {}),
                    $path: { id: value.toString() },
                })
        })
    };
}
