// ----------------- API Mapping -----------------
import {AccessAPI} from "./access";
import {ClusterAPI} from "./cluster";
import {NodesAPI} from "./nodes";
import {PoolsAPI} from "./pools";
import {StorageAPI} from "./storage";
import {VersionAPI} from "./version";

export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

export type PathContext<T extends { $path: any }> = Omit<T, '$path'>;

export type MethodKey<P extends keyof API> = Extract<keyof API[P], HttpMethod>;

export type Params<P extends keyof API, M extends MethodKey<P>> =
    API[P][M] extends { parameters: infer X } ? X : never;

export type Ret<P extends keyof API, M extends MethodKey<P>> =
    API[P][M] extends { return: infer R } ? R : never;

export type AnyArgs = {
    $path?: Record<string, string | number>;
    $query?: Record<string, any>;
    $headers?: Record<string, string | undefined>;
    $body?: unknown;
};

export type API = AccessAPI & ClusterAPI & NodesAPI & PoolsAPI & StorageAPI & VersionAPI;
