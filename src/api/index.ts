// ----------------- API Mapping -----------------
import {AccessAPI} from "./access.js";
import {ClusterAPI} from "./cluster/types.js";
import {NodesAPI} from "./nodes/types.js";
import {PoolsAPI} from "./pools.js";
import {StorageAPI} from "./storage.js";
import {VersionAPI} from "./version.js";

export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

export type PathContext<T extends { $path: any }> = Omit<T, '$path'>;

export type ArgsTuple<T> = keyof T extends never ? [args?: T] : [args: T];


export type MethodKey<P extends keyof API> = Extract<keyof API[P], HttpMethod>;

export type Params<P extends keyof API, M extends MethodKey<P>> =
    API[P][M] extends { parameters: infer X } ? X : never;

export type Ret<P extends keyof API, M extends MethodKey<P>> =
    API[P][M] extends { return: infer R } ? R : never;

export type QueryOf<P extends keyof API, M extends MethodKey<P>> =
    Params<P, M> extends { $query: infer Q } ? Q : never;

export type BodyOf<P extends keyof API, M extends MethodKey<P>> =
    Params<P, M> extends { $body: infer B } ? B : never;


export type AnyArgs = {
    $path?: Record<string, string | number>;
    $query?: Record<string, any>;
    $headers?: Record<string, string | undefined>;
    $body?: unknown;
};

export type API = AccessAPI & ClusterAPI & NodesAPI & PoolsAPI & StorageAPI & VersionAPI;
