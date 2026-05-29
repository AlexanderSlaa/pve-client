import type { Client } from "../../index";
import type { ClusterAPI } from "./types";
import type { ArgsTuple, PathContext } from "../index";

type C = ClusterAPI;

export default function notificationsFactory(client: Client) {
    return {
        index: (...a: ArgsTuple<C["/cluster/notifications"]["GET"]["parameters"]>) =>
            client.request("/cluster/notifications", "GET", a[0] ?? {}),

        endpoints: {
            gotify: {
                index:  (...a: ArgsTuple<C["/cluster/notifications/endpoints/gotify"]["GET"]["parameters"]>)  => client.request("/cluster/notifications/endpoints/gotify", "GET",  a[0] ?? {}),
                create: (...a: ArgsTuple<C["/cluster/notifications/endpoints/gotify"]["POST"]["parameters"]>) => client.request("/cluster/notifications/endpoints/gotify", "POST", a[0] ?? {}),
                name: (name: string) => ({
                    get:    (...a: ArgsTuple<PathContext<C["/cluster/notifications/endpoints/gotify/{name}"]["GET"]["parameters"]>>)    => client.request("/cluster/notifications/endpoints/gotify/{name}", "GET",    { ...((a[0]) as any), $path: { name } }),
                    update: (...a: ArgsTuple<PathContext<C["/cluster/notifications/endpoints/gotify/{name}"]["PUT"]["parameters"]>>)   => client.request("/cluster/notifications/endpoints/gotify/{name}", "PUT",    { ...((a[0]) as any), $path: { name } }),
                    delete: (...a: ArgsTuple<PathContext<C["/cluster/notifications/endpoints/gotify/{name}"]["DELETE"]["parameters"]>>) => client.request("/cluster/notifications/endpoints/gotify/{name}", "DELETE", { ...((a[0]) as any), $path: { name } }),
                }),
            },
            sendmail: {
                index:  (...a: ArgsTuple<C["/cluster/notifications/endpoints/sendmail"]["GET"]["parameters"]>)  => client.request("/cluster/notifications/endpoints/sendmail", "GET",  a[0] ?? {}),
                create: (...a: ArgsTuple<C["/cluster/notifications/endpoints/sendmail"]["POST"]["parameters"]>) => client.request("/cluster/notifications/endpoints/sendmail", "POST", a[0] ?? {}),
                name: (name: string) => ({
                    get:    (...a: ArgsTuple<PathContext<C["/cluster/notifications/endpoints/sendmail/{name}"]["GET"]["parameters"]>>)    => client.request("/cluster/notifications/endpoints/sendmail/{name}", "GET",    { ...((a[0]) as any), $path: { name } }),
                    update: (...a: ArgsTuple<PathContext<C["/cluster/notifications/endpoints/sendmail/{name}"]["PUT"]["parameters"]>>)   => client.request("/cluster/notifications/endpoints/sendmail/{name}", "PUT",    { ...((a[0]) as any), $path: { name } }),
                    delete: (...a: ArgsTuple<PathContext<C["/cluster/notifications/endpoints/sendmail/{name}"]["DELETE"]["parameters"]>>) => client.request("/cluster/notifications/endpoints/sendmail/{name}", "DELETE", { ...((a[0]) as any), $path: { name } }),
                }),
            },
            smtp: {
                index:  (...a: ArgsTuple<C["/cluster/notifications/endpoints/smtp"]["GET"]["parameters"]>)  => client.request("/cluster/notifications/endpoints/smtp", "GET",  a[0] ?? {}),
                create: (...a: ArgsTuple<C["/cluster/notifications/endpoints/smtp"]["POST"]["parameters"]>) => client.request("/cluster/notifications/endpoints/smtp", "POST", a[0] ?? {}),
                name: (name: string) => ({
                    get:    (...a: ArgsTuple<PathContext<C["/cluster/notifications/endpoints/smtp/{name}"]["GET"]["parameters"]>>)    => client.request("/cluster/notifications/endpoints/smtp/{name}", "GET",    { ...((a[0]) as any), $path: { name } }),
                    update: (...a: ArgsTuple<PathContext<C["/cluster/notifications/endpoints/smtp/{name}"]["PUT"]["parameters"]>>)   => client.request("/cluster/notifications/endpoints/smtp/{name}", "PUT",    { ...((a[0]) as any), $path: { name } }),
                    delete: (...a: ArgsTuple<PathContext<C["/cluster/notifications/endpoints/smtp/{name}"]["DELETE"]["parameters"]>>) => client.request("/cluster/notifications/endpoints/smtp/{name}", "DELETE", { ...((a[0]) as any), $path: { name } }),
                }),
            },
            webhook: {
                index:  (...a: ArgsTuple<C["/cluster/notifications/endpoints/webhook"]["GET"]["parameters"]>)  => client.request("/cluster/notifications/endpoints/webhook", "GET",  a[0] ?? {}),
                create: (...a: ArgsTuple<C["/cluster/notifications/endpoints/webhook"]["POST"]["parameters"]>) => client.request("/cluster/notifications/endpoints/webhook", "POST", a[0] ?? {}),
                name: (name: string) => ({
                    get:    (...a: ArgsTuple<PathContext<C["/cluster/notifications/endpoints/webhook/{name}"]["GET"]["parameters"]>>)    => client.request("/cluster/notifications/endpoints/webhook/{name}", "GET",    { ...((a[0]) as any), $path: { name } }),
                    update: (...a: ArgsTuple<PathContext<C["/cluster/notifications/endpoints/webhook/{name}"]["PUT"]["parameters"]>>)   => client.request("/cluster/notifications/endpoints/webhook/{name}", "PUT",    { ...((a[0]) as any), $path: { name } }),
                    delete: (...a: ArgsTuple<PathContext<C["/cluster/notifications/endpoints/webhook/{name}"]["DELETE"]["parameters"]>>) => client.request("/cluster/notifications/endpoints/webhook/{name}", "DELETE", { ...((a[0]) as any), $path: { name } }),
                }),
            },
        },

        matcher_field_values: {
            index: (...a: ArgsTuple<C["/cluster/notifications/matcher-field-values"]["GET"]["parameters"]>) =>
                client.request("/cluster/notifications/matcher-field-values", "GET", a[0] ?? {}),
        },

        matcher_fields: {
            index: (...a: ArgsTuple<C["/cluster/notifications/matcher-fields"]["GET"]["parameters"]>) =>
                client.request("/cluster/notifications/matcher-fields", "GET", a[0] ?? {}),
        },

        matchers: {
            index:  (...a: ArgsTuple<C["/cluster/notifications/matchers"]["GET"]["parameters"]>)  => client.request("/cluster/notifications/matchers", "GET",  a[0] ?? {}),
            create: (...a: ArgsTuple<C["/cluster/notifications/matchers"]["POST"]["parameters"]>) => client.request("/cluster/notifications/matchers", "POST", a[0] ?? {}),
            name: (name: string) => ({
                get:    (...a: ArgsTuple<PathContext<C["/cluster/notifications/matchers/{name}"]["GET"]["parameters"]>>)    => client.request("/cluster/notifications/matchers/{name}", "GET",    { ...((a[0]) as any), $path: { name } }),
                update: (...a: ArgsTuple<PathContext<C["/cluster/notifications/matchers/{name}"]["PUT"]["parameters"]>>)   => client.request("/cluster/notifications/matchers/{name}", "PUT",    { ...((a[0]) as any), $path: { name } }),
                delete: (...a: ArgsTuple<PathContext<C["/cluster/notifications/matchers/{name}"]["DELETE"]["parameters"]>>) => client.request("/cluster/notifications/matchers/{name}", "DELETE", { ...((a[0]) as any), $path: { name } }),
            }),
        },

        targets: {
            index: (...a: ArgsTuple<C["/cluster/notifications/targets"]["GET"]["parameters"]>) =>
                client.request("/cluster/notifications/targets", "GET", a[0] ?? {}),
            name: (name: string) => ({
                test: {
                    run: (...a: ArgsTuple<PathContext<C["/cluster/notifications/targets/{name}/test"]["POST"]["parameters"]>>) =>
                        client.request("/cluster/notifications/targets/{name}/test", "POST", { ...((a[0]) as any), $path: { name } }),
                },
            }),
        },
    };
}
