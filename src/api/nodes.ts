// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const nodes = {
    hardware: {
        pci: {
            index: () => { throw new Error('Not implemented'); }
        },
        usb: {
            index: () => { throw new Error('Not implemented'); }
        },
    },
};
import {Client} from "../index";
import type {ArgsTuple} from "./index";
import {PathContext} from "./index";

export type Service =
    "chrony"
    | "corosync"
    | "cron"
    | "ksmtuned"
    | "lxcfs"
    | "postfix"
    | "proxmox-firewall"
    | "pve-cluster"
    | "pve-firewall"
    | "pve-ha-crm"
    | "pve-ha-lrm"
    | "pve-lxc-syscalld"
    | "pvedaemon"
    | "pvefw-logger"
    | "pveproxy"
    | "pvescheduler"
    | "pvestatd"
    | "qmeventd"
    | "spiceproxy"
    | "sshd"
    | "syslog"
    | "systemd-journald"
    | "systemd-timesyncd";

// ...existing code...
export default (client: Client) => {
    const api = {
        // ...existing code...
        list: (...args: ArgsTuple<NodesAPI["/nodes"]["GET"]['parameters']>) => client.request("/nodes", "GET", (args[0] ?? {}) as NodesAPI["/nodes"]["GET"]['parameters']),
        get: (node: string) => ({
            // ...existing code...
        })
    };
    // Add node alias for test compatibility
    return Object.assign(api, {
        node: api.get
    });
};
// ...existing code...

export type NodesAPI = {
    "/nodes": {
        "GET": {
            parameters: {}
            return: {
                "cpu"?: number;
                "level"?: string;
                "maxcpu"?: number;
                "maxmem"?: number;
                "mem"?: number;
                "node": string;
                "ssl_fingerprint"?: string;
                "status": "unknown" | "online" | "offline";
                "uptime"?: number
            }[]
        }
    },
    "/nodes/{node}": {
        "GET": {
            parameters: {
                $path: { "node": string },
            }
            return: Record<string, unknown>[]
        }
    },
    "/nodes/{node}/aplinfo": {
        "GET": {
            parameters: {
                $path: { "node": string },
            }
            return: Record<string, unknown>[]
        },
        "POST": {
            parameters: {
                $path: { "node": string },
                $body: { "storage": string; "template": string },
            }
            return: string
        }
    },
    "/nodes/{node}/apt": {
        "GET": {
            parameters: {
                $path: { "node": string },
            }
            return: { "id": string }[]
        }
    },
    "/nodes/{node}/apt/changelog": {
        "GET": {
            parameters: {
                $path: { "node": string },
                $query?: { "name": string; "version"?: string },
            }
            return: string
        }
    },
    "/nodes/{node}/apt/repositories": {
        "GET": {
            parameters: {
                $path: { "node": string },
            }
            return: {
                "digest": string;
                "errors": { "error": string; "path": string }[];
                "files": {
                    "digest": number[];
                    "file-type": "list" | "sources";
                    "path": string;
                    "repositories": {
                        "Comment"?: string;
                        "Components"?: string[];
                        "Enabled": boolean;
                        "FileType": "list" | "sources";
                        "Options"?: { "Key": string; "Values": string[] }[];
                        "Suites": string[];
                        "Types": "deb" | "deb-src"[];
                        "URIs": string[]
                    }[]
                }[];
                "infos": { "index": string; "kind": string; "message": string; "path": string; "property"?: string }[];
                "standard-repos": { "handle": string; "name": string; "status"?: boolean }[]
            }
        },
        "POST": {
            parameters: {
                $path: { "node": string },
                $body: { "digest"?: string; "enabled"?: boolean; "index": number; "path": string },
            }
            return: unknown
        },
        "PUT": {
            parameters: {
                $path: { "node": string },
                $body: { "digest"?: string; "handle": string },
            }
            return: unknown
        }
    },
    "/nodes/{node}/apt/update": {
        "GET": {
            parameters: {
                $path: { "node": string },
            }
            return: {
                "Arch": "armhf" | "arm64" | "amd64" | "ppc64el" | "risc64" | "s390x" | "all";
                "Description": string;
                "NotifyStatus"?: string;
                "OldVersion"?: string;
                "Origin": string;
                "Package": string;
                "Priority": string;
                "Section": string;
                "Title": string;
                "Version": string
            }[]
        },
        "POST": {
            parameters: {
                $path: { "node": string },
                $body: { "notify"?: boolean; "quiet"?: boolean },
            }
            return: string
        }
    },
    "/nodes/{node}/apt/versions": {
        "GET": {
            parameters: {
                $path: { "node": string },
            }
            return: {
                "Arch": "armhf" | "arm64" | "amd64" | "ppc64el" | "risc64" | "s390x" | "all";
                "CurrentState": "Installed" | "NotInstalled" | "UnPacked" | "HalfConfigured" | "HalfInstalled" | "ConfigFiles";
                "Description": string;
                "ManagerVersion"?: string;
                "NotifyStatus"?: string;
                "OldVersion"?: string;
                "Origin": string;
                "Package": string;
                "Priority": string;
                "RunningKernel"?: string;
                "Section": string;
                "Title": string;
                "Version": string
            }[]
        }
    },
    "/nodes/{node}/capabilities": {
        "GET": {
            parameters: {
                $path: { "node": string },
            }
            return: Record<string, unknown>[]
        }
    },
    "/nodes/{node}/capabilities/qemu": {
        "GET": {
            parameters: {
                $path: { "node": string },
            }
            return: Record<string, unknown>[]
        }
    },
    "/nodes/{node}/capabilities/qemu/cpu": {
        "GET": {
            parameters: {
                $path: { "node": string },
            }
            return: { "custom": boolean; "name": string; "vendor": string }[]
        }
    },
    "/nodes/{node}/capabilities/qemu/cpu-flags": {
        "GET": {
            parameters: {
                $path: { "node": string },
            }
            return: { "description": string; "name": string }[]
        }
    },
    "/nodes/{node}/capabilities/qemu/machines": {
        "GET": {
            parameters: {
                $path: { "node": string },
            }
            return: { "changes"?: string; "id": string; "type": "q35" | "i440fx"; "version": string }[]
        }
    },
    "/nodes/{node}/capabilities/qemu/migration": {
        "GET": {
            parameters: {
                $path: { "node": string },
            }
            return: { "has-dbus-vmstate": boolean }
        }
    },
    "/nodes/{node}/ceph": {
        "GET": {
            parameters: {
                $path: { "node": string },
            }
            return: Record<string, unknown>[]
        }
    },
    "/nodes/{node}/ceph/cfg": {
        "GET": {
            parameters: {
                $path: { "node": string },
            }
            return: Record<string, unknown>[]
        }
    },
    "/nodes/{node}/ceph/cfg/db": {
        "GET": {
            parameters: {
                $path: { "node": string },
            }
            return: {
                "can_update_at_runtime": boolean;
                "level": string;
                "mask": string;
                "name": string;
                "section": string;
                "value": string
            }[]
        }
    },
    "/nodes/{node}/ceph/cfg/raw": {
        "GET": {
            parameters: {
                $path: { "node": string },
            }
            return: string
        }
    },
    "/nodes/{node}/ceph/cfg/value": {
        "GET": {
            parameters: {
                $path: { "node": string },
                $query?: { "config-keys": string },
            }
            return: Record<string, unknown>
        }
    },
    "/nodes/{node}/ceph/cmd-safety": {
        "GET": {
            parameters: {
                $path: { "node": string },
                $query?: { "action": "stop" | "destroy"; "id": string; "service": "osd" | "mon" | "mds" },
            }
            return: { "safe": boolean; "status"?: string }
        }
    },
    "/nodes/{node}/ceph/crush": {
        "GET": {
            parameters: {
                $path: { "node": string },
            }
            return: string
        }
    },
    "/nodes/{node}/ceph/fs": {
        "GET": {
            parameters: {
                $path: { "node": string },
            }
            return: { "data_pool": string; "metadata_pool": string; "name": string }[]
        }
    },
    "/nodes/{node}/ceph/fs/{name}": {
        "POST": {
            parameters: {
                $path: { "node": string; "name": string },
                $body: { "add-storage"?: boolean; "pg_num"?: number },
            }
            return: string
        }
    },
    "/nodes/{node}/ceph/init": {
        "POST": {
            parameters: {
                $path: { "node": string },
                $body: {
                    "cluster-network"?: string;
                    "disable_cephx"?: boolean;
                    "min_size"?: number;
                    "network"?: string;
                    "pg_bits"?: number;
                    "size"?: number
                },
            }
            return: unknown
        }
    },
    "/nodes/{node}/ceph/log": {
        "GET": {
            parameters: {
                $path: { "node": string },
                $query?: { "limit"?: number; "start"?: number },
            }
            return: { "n": number; "t": string }[]
        }
    },
    "/nodes/{node}/ceph/mds": {
        "GET": {
            parameters: {
                $path: { "node": string },
            }
            return: {
                "addr"?: string;
                "host"?: string;
                "name": string;
                "rank"?: number;
                "standby_replay"?: boolean;
                "state": string
            }[]
        }
    },
    "/nodes/{node}/ceph/mds/{name}": {
        "DELETE": {
            parameters: {
                $path: { "node": string; "name": string },
            }
            return: string
        },
        "POST": {
            parameters: {
                $path: { "node": string; "name": string },
                $body: { "hotstandby"?: boolean },
            }
            return: string
        }
    },
    "/nodes/{node}/ceph/mgr": {
        "GET": {
            parameters: {
                $path: { "node": string },
            }
            return: { "addr"?: string; "host"?: string; "name": string; "state": string }[]
        }
    },
    "/nodes/{node}/ceph/mgr/{id}": {
        "DELETE": {
            parameters: {
                $path: { "node": string; "id": string },
            }
            return: string
        },
        "POST": {
            parameters: {
                $path: { "node": string; "id": string },
            }
            return: string
        }
    },
    "/nodes/{node}/ceph/mon": {
        "GET": {
            parameters: {
                $path: { "node": string },
            }
            return: {
                "addr"?: string;
                "ceph_version"?: string;
                "ceph_version_short"?: string;
                "direxists"?: string;
                "host"?: boolean;
                "name": string;
                "quorum"?: boolean;
                "rank"?: number;
                "service"?: number;
                "state"?: string
            }[]
        }
    },
    "/nodes/{node}/ceph/mon/{monid}": {
        "DELETE": {
            parameters: {
                $path: { "node": string; "monid": string },
            }
            return: string
        },
        "POST": {
            parameters: {
                $path: { "node": string; "monid": string },
                $body: { "mon-address"?: string },
            }
            return: string
        }
    },
    "/nodes/{node}/ceph/osd": {
        "GET": {
            parameters: {
                $path: { "node": string },
            }
            return: Record<string, unknown>
        },
        "POST": {
            parameters: {
                $path: { "node": string },
                $body: {
                    "crush-device-class"?: string;
                    "db_dev"?: string;
                    "db_dev_size"?: number;
                    "dev": string;
                    "encrypted"?: boolean;
                    "osds-per-device"?: number;
                    "wal_dev"?: string;
                    "wal_dev_size"?: number
                },
            }
            return: string
        }
    },
    "/nodes/{node}/ceph/osd/{osdid}": {
        "DELETE": {
            parameters: {
                $path: { "node": string; "osdid": number },
                $query?: { "cleanup"?: boolean },
            }
            return: string
        },
        "GET": {
            parameters: {
                $path: { "node": string; "osdid": number },
            }
            return: Record<string, unknown>[]
        }
    },
    "/nodes/{node}/ceph/osd/{osdid}/in": {
        "POST": {
            parameters: {
                $path: { "node": string; "osdid": number },
            }
            return: unknown
        }
    },
    "/nodes/{node}/ceph/osd/{osdid}/lv-info": {
        "GET": {
            parameters: {
                $path: { "node": string; "osdid": number },
                $query?: { "type"?: "block" | "db" | "wal" },
            }
            return: {
                "creation_time": string;
                "lv_name": string;
                "lv_path": string;
                "lv_size": number;
                "lv_uuid": string;
                "vg_name": string
            }
        }
    },
    "/nodes/{node}/ceph/osd/{osdid}/metadata": {
        "GET": {
            parameters: {
                $path: { "node": string; "osdid": number },
            }
            return: {
                "devices": {
                    "dev_node": string;
                    "device": "block" | "db" | "wal";
                    "devices": string;
                    "size": number;
                    "support_discard": boolean;
                    "type": string
                }[];
                "osd": {
                    "back_addr": string;
                    "front_addr": string;
                    "hb_back_addr": string;
                    "hb_front_addr": string;
                    "hostname": string;
                    "id": number;
                    "mem_usage": number;
                    "osd_data": string;
                    "osd_objectstore": string;
                    "pid": number;
                    "version": string
                }
            }
        }
    },
    "/nodes/{node}/ceph/osd/{osdid}/out": {
        "POST": {
            parameters: {
                $path: { "node": string; "osdid": number },
            }
            return: unknown
        }
    },
    "/nodes/{node}/ceph/osd/{osdid}/scrub": {
        "POST": {
            parameters: {
                $path: { "node": string; "osdid": number },
                $body: { "deep"?: boolean },
            }
            return: unknown
        }
    },
    "/nodes/{node}/ceph/pool": {
        "GET": {
            parameters: {
                $path: { "node": string },
            }
            return: {
                "application_metadata"?: Record<string, unknown>;
                "autoscale_status"?: Record<string, unknown>;
                "bytes_used": number;
                "crush_rule": number;
                "crush_rule_name": string;
                "min_size": number;
                "percent_used": number;
                "pg_autoscale_mode"?: string;
                "pg_num": number;
                "pg_num_final"?: number;
                "pg_num_min"?: number;
                "pool": number;
                "pool_name": string;
                "size": number;
                "target_size"?: number;
                "target_size_ratio"?: number;
                "type": "replicated" | "erasure" | "unknown"
            }[]
        },
        "POST": {
            parameters: {
                $path: { "node": string },
                $body: {
                    "add_storages"?: boolean;
                    "application"?: "rbd" | "cephfs" | "rgw";
                    "crush_rule"?: string;
                    "erasure-coding"?: string;
                    "min_size"?: number;
                    "name": string;
                    "pg_autoscale_mode"?: "on" | "off" | "warn";
                    "pg_num"?: number;
                    "pg_num_min"?: number;
                    "size"?: number;
                    "target_size"?: string;
                    "target_size_ratio"?: number
                },
            }
            return: string
        }
    },
    "/nodes/{node}/ceph/pool/{name}": {
        "DELETE": {
            parameters: {
                $path: { "node": string; "name": string },
                $query?: { "force"?: boolean; "remove_ecprofile"?: boolean; "remove_storages"?: boolean },
            }
            return: string
        },
        "GET": {
            parameters: {
                $path: { "node": string; "name": string },
            }
            return: Record<string, unknown>[]
        },
        "PUT": {
            parameters: {
                $path: { "node": string; "name": string },
                $body: {
                    "application"?: "rbd" | "cephfs" | "rgw";
                    "crush_rule"?: string;
                    "min_size"?: number;
                    "pg_autoscale_mode"?: "on" | "off" | "warn";
                    "pg_num"?: number;
                    "pg_num_min"?: number;
                    "size"?: number;
                    "target_size"?: string;
                    "target_size_ratio"?: number
                },
            }
            return: string
        }
    },
    "/nodes/{node}/ceph/pool/{name}/status": {
        "GET": {
            parameters: {
                $path: { "node": string; "name": string },
                $query?: { "verbose"?: boolean },
            }
            return: {
                "application"?: "rbd" | "cephfs" | "rgw";
                "application_list"?: unknown[];
                "autoscale_status"?: Record<string, unknown>;
                "crush_rule"?: string;
                "fast_read": boolean;
                "hashpspool": boolean;
                "id": number;
                "min_size"?: number;
                "name": string;
                "nodeep-scrub": boolean;
                "nodelete": boolean;
                "nopgchange": boolean;
                "noscrub": boolean;
                "nosizechange": boolean;
                "pg_autoscale_mode"?: "on" | "off" | "warn";
                "pg_num"?: number;
                "pg_num_min"?: number;
                "pgp_num": number;
                "size"?: number;
                "statistics"?: Record<string, unknown>;
                "target_size"?: string;
                "target_size_ratio"?: number;
                "use_gmt_hitset": boolean;
                "write_fadvise_dontneed": boolean
            }
        }
    },
    "/nodes/{node}/ceph/restart": {
        "POST": {
            parameters: {
                $path: { "node": string },
                $body: { "service"?: string },
            }
            return: string
        }
    },
    "/nodes/{node}/ceph/rules": {
        "GET": {
            parameters: {
                $path: { "node": string },
            }
            return: { "name": string }[]
        }
    },
    "/nodes/{node}/ceph/start": {
        "POST": {
            parameters: {
                $path: { "node": string },
                $body: { "service"?: string },
            }
            return: string
        }
    },
    "/nodes/{node}/ceph/status": {
        "GET": {
            parameters: {
                $path: { "node": string },
            }
            return: Record<string, unknown>
        }
    },
    "/nodes/{node}/ceph/stop": {
        "POST": {
            parameters: {
                $path: { "node": string },
                $body: { "service"?: string },
            }
            return: string
        }
    },
    "/nodes/{node}/certificates": {
        "GET": {
            parameters: {
                $path: { "node": string },
            }
            return: Record<string, unknown>[]
        }
    },
    "/nodes/{node}/certificates/acme": {
        "GET": {
            parameters: {
                $path: { "node": string },
            }
            return: Record<string, unknown>[]
        }
    },
    "/nodes/{node}/certificates/acme/certificate": {
        "DELETE": {
            parameters: {
                $path: { "node": string },
            }
            return: string
        },
        "POST": {
            parameters: {
                $path: { "node": string },
                $body: { "force"?: boolean },
            }
            return: string
        },
        "PUT": {
            parameters: {
                $path: { "node": string },
                $body: { "force"?: boolean },
            }
            return: string
        }
    },
    "/nodes/{node}/certificates/custom": {
        "DELETE": {
            parameters: {
                $path: { "node": string },
                $query?: { "restart"?: boolean },
            }
            return: unknown
        },
        "POST": {
            parameters: {
                $path: { "node": string },
                $body: { "certificates": string; "force"?: boolean; "key"?: string; "restart"?: boolean },
            }
            return: {
                "filename"?: string;
                "fingerprint"?: string;
                "issuer"?: string;
                "notafter"?: number;
                "notbefore"?: number;
                "pem"?: string;
                "public-key-bits"?: number;
                "public-key-type"?: string;
                "san"?: string[];
                "subject"?: string
            }
        }
    },
    "/nodes/{node}/certificates/info": {
        "GET": {
            parameters: {
                $path: { "node": string },
            }
            return: {
                "filename"?: string;
                "fingerprint"?: string;
                "issuer"?: string;
                "notafter"?: number;
                "notbefore"?: number;
                "pem"?: string;
                "public-key-bits"?: number;
                "public-key-type"?: string;
                "san"?: string[];
                "subject"?: string
            }[]
        }
    },
    "/nodes/{node}/config": {
        "GET": {
            parameters: {
                $path: { "node": string },
                $query?: {
                    "property"?: "acme" | "acmedomain0" | "acmedomain1" | "acmedomain2" | "acmedomain3" | "acmedomain4" | "acmedomain5" | "ballooning-target" | "description" | "startall-onboot-delay" | "wakeonlan"
                },
            }
            return: {
                "acme"?: string;
                "acmedomain[n]"?: string;
                "ballooning-target"?: number;
                "description"?: string;
                "digest"?: string;
                "startall-onboot-delay"?: number;
                "wakeonlan"?: string
            }
        },
        "PUT": {
            parameters: {
                $path: { "node": string },
                $body: {
                    "acme"?: string;
                    "acmedomain[n]"?: string;
                    "ballooning-target"?: number;
                    "delete"?: string;
                    "description"?: string;
                    "digest"?: string;
                    "startall-onboot-delay"?: number;
                    "wakeonlan"?: string
                },
            }
            return: unknown
        }
    },
    "/nodes/{node}/disks": {
        "GET": {
            parameters: {
                $path: { "node": string },
            }
            return: Record<string, unknown>[]
        }
    },
    "/nodes/{node}/disks/directory": {
        "GET": {
            parameters: {
                $path: { "node": string },
            }
            return: { "device": string; "options": string; "path": string; "type": string; "unitfile": string }[]
        },
        "POST": {
            parameters: {
                $path: { "node": string },
                $body: { "add_storage"?: boolean; "device": string; "filesystem"?: "ext4" | "xfs"; "name": string },
            }
            return: string
        }
    },
    "/nodes/{node}/disks/directory/{name}": {
        "DELETE": {
            parameters: {
                $path: { "node": string; "name": string },
                $query?: { "cleanup-config"?: boolean; "cleanup-disks"?: boolean },
            }
            return: string
        }
    },
    "/nodes/{node}/disks/initgpt": {
        "POST": {
            parameters: {
                $path: { "node": string },
                $body: { "disk": string; "uuid"?: string },
            }
            return: string
        }
    },
    "/nodes/{node}/disks/list": {
        "GET": {
            parameters: {
                $path: { "node": string },
                $query?: { "include-partitions"?: boolean; "skipsmart"?: boolean; "type"?: "unused" | "journal_disks" },
            }
            return: {
                "devpath": string;
                "gpt": boolean;
                "health"?: string;
                "model"?: string;
                "mounted": boolean;
                "osdid": number;
                "osdid-list": number[];
                "parent"?: string;
                "serial"?: string;
                "size": number;
                "used"?: string;
                "vendor"?: string;
                "wwn"?: string
            }[]
        }
    },
    "/nodes/{node}/disks/lvm": {
        "GET": {
            parameters: {
                $path: { "node": string },
            }
            return: {
                "children": {
                    "children"?: { "free": number; "leaf": boolean; "name": string; "size": number }[];
                    "free": number;
                    "leaf": boolean;
                    "name": string;
                    "size": number
                }[];
                "leaf": boolean
            }
        },
        "POST": {
            parameters: {
                $path: { "node": string },
                $body: { "add_storage"?: boolean; "device": string; "name": string },
            }
            return: string
        }
    },
    "/nodes/{node}/disks/lvm/{name}": {
        "DELETE": {
            parameters: {
                $path: { "node": string; "name": string },
                $query?: { "cleanup-config"?: boolean; "cleanup-disks"?: boolean },
            }
            return: string
        }
    },
    "/nodes/{node}/disks/lvmthin": {
        "GET": {
            parameters: {
                $path: { "node": string },
            }
            return: {
                "lv": string;
                "lv_size": number;
                "metadata_size": number;
                "metadata_used": number;
                "used": number;
                "vg": string
            }[]
        },
        "POST": {
            parameters: {
                $path: { "node": string },
                $body: { "add_storage"?: boolean; "device": string; "name": string },
            }
            return: string
        }
    },
    "/nodes/{node}/disks/lvmthin/{name}": {
        "DELETE": {
            parameters: {
                $path: { "node": string; "name": string },
                $query?: { "cleanup-config"?: boolean; "cleanup-disks"?: boolean; "volume-group": string },
            }
            return: string
        }
    },
    "/nodes/{node}/disks/smart": {
        "GET": {
            parameters: {
                $path: { "node": string },
                $query?: { "disk": string; "healthonly"?: boolean },
            }
            return: { "attributes"?: unknown[]; "health": string; "text"?: string; "type"?: string }
        }
    },
    "/nodes/{node}/disks/wipedisk": {
        "PUT": {
            parameters: {
                $path: { "node": string },
                $body: { "disk": string },
            }
            return: string
        }
    },
    "/nodes/{node}/disks/zfs": {
        "GET": {
            parameters: {
                $path: { "node": string },
            }
            return: {
                "alloc": number;
                "dedup": number;
                "frag": number;
                "free": number;
                "health": string;
                "name": string;
                "size": number
            }[]
        },
        "POST": {
            parameters: {
                $path: { "node": string },
                $body: {
                    "add_storage"?: boolean;
                    "ashift"?: number;
                    "compression"?: "on" | "off" | "gzip" | "lz4" | "lzjb" | "zle" | "zstd";
                    "devices": string;
                    "draid-config"?: string;
                    "name": string;
                    "raidlevel": "single" | "mirror" | "raid10" | "raidz" | "raidz2" | "raidz3" | "draid" | "draid2" | "draid3"
                },
            }
            return: string
        }
    },
    "/nodes/{node}/disks/zfs/{name}": {
        "DELETE": {
            parameters: {
                $path: { "node": string; "name": string },
                $query?: { "cleanup-config"?: boolean; "cleanup-disks"?: boolean },
            }
            return: string
        },
        "GET": {
            parameters: {
                $path: { "node": string; "name": string },
            }
            return: {
                "action"?: string;
                "children": {
                    "cksum"?: number;
                    "msg": string;
                    "name": string;
                    "read"?: number;
                    "state"?: string;
                    "write"?: number
                }[];
                "errors": string;
                "name": string;
                "scan"?: string;
                "state": string;
                "status"?: string
            }
        }
    },
    "/nodes/{node}/dns": {
        "GET": {
            parameters: {
                $path: { "node": string },
            }
            return: { "dns1"?: string; "dns2"?: string; "dns3"?: string; "search"?: string }
        },
        "PUT": {
            parameters: {
                $path: { "node": string },
                $body: { "dns1"?: string; "dns2"?: string; "dns3"?: string; "search": string },
            }
            return: unknown
        }
    },
    "/nodes/{node}/execute": {
        "POST": {
            parameters: {
                $path: { "node": string },
                $body: { "commands": string },
            }
            return: Record<string, unknown>[]
        }
    },
    "/nodes/{node}/firewall": {
        "GET": {
            parameters: {
                $path: { "node": string },
            }
            return: Record<string, unknown>[]
        }
    },
    "/nodes/{node}/firewall/log": {
        "GET": {
            parameters: {
                $path: { "node": string },
                $query?: { "limit"?: number; "since"?: number; "start"?: number; "until"?: number },
            }
            return: { "n": number; "t": string }[]
        }
    },
    "/nodes/{node}/firewall/options": {
        "GET": {
            parameters: {
                $path: { "node": string },
            }
            return: {
                "enable"?: boolean;
                "log_level_forward"?: "emerg" | "alert" | "crit" | "err" | "warning" | "notice" | "info" | "debug" | "nolog";
                "log_level_in"?: "emerg" | "alert" | "crit" | "err" | "warning" | "notice" | "info" | "debug" | "nolog";
                "log_level_out"?: "emerg" | "alert" | "crit" | "err" | "warning" | "notice" | "info" | "debug" | "nolog";
                "log_nf_conntrack"?: boolean;
                "ndp"?: boolean;
                "nf_conntrack_allow_invalid"?: boolean;
                "nf_conntrack_helpers"?: string;
                "nf_conntrack_max"?: number;
                "nf_conntrack_tcp_timeout_established"?: number;
                "nf_conntrack_tcp_timeout_syn_recv"?: number;
                "nftables"?: boolean;
                "nosmurfs"?: boolean;
                "protection_synflood"?: boolean;
                "protection_synflood_burst"?: number;
                "protection_synflood_rate"?: number;
                "smurf_log_level"?: "emerg" | "alert" | "crit" | "err" | "warning" | "notice" | "info" | "debug" | "nolog";
                "tcp_flags_log_level"?: "emerg" | "alert" | "crit" | "err" | "warning" | "notice" | "info" | "debug" | "nolog";
                "tcpflags"?: boolean
            }
        },
        "PUT": {
            parameters: {
                $path: { "node": string },
                $body: {
                    "delete"?: string;
                    "digest"?: string;
                    "enable"?: boolean;
                    "log_level_forward"?: "emerg" | "alert" | "crit" | "err" | "warning" | "notice" | "info" | "debug" | "nolog";
                    "log_level_in"?: "emerg" | "alert" | "crit" | "err" | "warning" | "notice" | "info" | "debug" | "nolog";
                    "log_level_out"?: "emerg" | "alert" | "crit" | "err" | "warning" | "notice" | "info" | "debug" | "nolog";
                    "log_nf_conntrack"?: boolean;
                    "ndp"?: boolean;
                    "nf_conntrack_allow_invalid"?: boolean;
                    "nf_conntrack_helpers"?: string;
                    "nf_conntrack_max"?: number;
                    "nf_conntrack_tcp_timeout_established"?: number;
                    "nf_conntrack_tcp_timeout_syn_recv"?: number;
                    "nftables"?: boolean;
                    "nosmurfs"?: boolean;
                    "protection_synflood"?: boolean;
                    "protection_synflood_burst"?: number;
                    "protection_synflood_rate"?: number;
                    "smurf_log_level"?: "emerg" | "alert" | "crit" | "err" | "warning" | "notice" | "info" | "debug" | "nolog";
                    "tcp_flags_log_level"?: "emerg" | "alert" | "crit" | "err" | "warning" | "notice" | "info" | "debug" | "nolog";
                    "tcpflags"?: boolean
                },
            }
            return: unknown
        }
    },
    "/nodes/{node}/firewall/rules": {
        "GET": {
            parameters: {
                $path: { "node": string },
            }
            return: {
                "action": string;
                "comment"?: string;
                "dest"?: string;
                "dport"?: string;
                "enable"?: number;
                "icmp-type"?: string;
                "iface"?: string;
                "ipversion"?: number;
                "log"?: "emerg" | "alert" | "crit" | "err" | "warning" | "notice" | "info" | "debug" | "nolog";
                "macro"?: string;
                "pos": number;
                "proto"?: string;
                "source"?: string;
                "sport"?: string;
                "type": string
            }[]
        },
        "POST": {
            parameters: {
                $path: { "node": string },
                $body: {
                    "action": string;
                    "comment"?: string;
                    "dest"?: string;
                    "digest"?: string;
                    "dport"?: string;
                    "enable"?: number;
                    "icmp-type"?: string;
                    "iface"?: string;
                    "log"?: "emerg" | "alert" | "crit" | "err" | "warning" | "notice" | "info" | "debug" | "nolog";
                    "macro"?: string;
                    "pos"?: number;
                    "proto"?: string;
                    "source"?: string;
                    "sport"?: string;
                    "type": "in" | "out" | "forward" | "group"
                },
            }
            return: unknown
        }
    },
    "/nodes/{node}/firewall/rules/{pos}": {
        "DELETE": {
            parameters: {
                $path: { "node": string; "pos": number },
                $query?: { "digest"?: string },
            }
            return: unknown
        },
        "GET": {
            parameters: {
                $path: { "node": string; "pos": number },
            }
            return: {
                "action": string;
                "comment"?: string;
                "dest"?: string;
                "dport"?: string;
                "enable"?: number;
                "icmp-type"?: string;
                "iface"?: string;
                "ipversion"?: number;
                "log"?: "emerg" | "alert" | "crit" | "err" | "warning" | "notice" | "info" | "debug" | "nolog";
                "macro"?: string;
                "pos": number;
                "proto"?: string;
                "source"?: string;
                "sport"?: string;
                "type": string
            }
        },
        "PUT": {
            parameters: {
                $path: { "node": string; "pos": number },
                $body: {
                    "action"?: string;
                    "comment"?: string;
                    "delete"?: string;
                    "dest"?: string;
                    "digest"?: string;
                    "dport"?: string;
                    "enable"?: number;
                    "icmp-type"?: string;
                    "iface"?: string;
                    "log"?: "emerg" | "alert" | "crit" | "err" | "warning" | "notice" | "info" | "debug" | "nolog";
                    "macro"?: string;
                    "moveto"?: number;
                    "proto"?: string;
                    "source"?: string;
                    "sport"?: string;
                    "type"?: "in" | "out" | "forward" | "group"
                },
            }
            return: unknown
        }
    },
    "/nodes/{node}/hardware": {
        "GET": {
            parameters: {
                $path: { "node": string },
            }
            return: { "type": string }[]
        }
    },
    "/nodes/{node}/hardware/pci": {
        "GET": {
            parameters: {
                $path: { "node": string },
                $query?: { "pci-class-blacklist"?: string; "verbose"?: boolean },
            }
            return: {
                "class": string;
                "device": string;
                "device_name"?: string;
                "id": string;
                "iommugroup": number;
                "mdev"?: boolean;
                "subsystem_device"?: string;
                "subsystem_device_name"?: string;
                "subsystem_vendor"?: string;
                "subsystem_vendor_name"?: string;
                "vendor": string;
                "vendor_name"?: string
            }[]
        }
    },
    "/nodes/{node}/hardware/pci/{pci-id-or-mapping}": {
        "GET": {
            parameters: {
                $path: { "node": string; "pci-id-or-mapping": string },
            }
            return: { "method": string }[]
        }
    },
    "/nodes/{node}/hardware/pci/{pci-id-or-mapping}/mdev": {
        "GET": {
            parameters: {
                $path: { "node": string; "pci-id-or-mapping": string },
            }
            return: { "available": number; "description": string; "name"?: string; "type": string }[]
        }
    },
    "/nodes/{node}/hardware/usb": {
        "GET": {
            parameters: {
                $path: { "node": string },
            }
            return: {
                "busnum": number;
                "class": number;
                "devnum": number;
                "level": number;
                "manufacturer"?: string;
                "port": number;
                "prodid": string;
                "product"?: string;
                "serial"?: string;
                "speed": string;
                "usbpath"?: string;
                "vendid": string
            }[]
        }
    },
    "/nodes/{node}/hosts": {
        "GET": {
            parameters: {
                $path: { "node": string },
            }
            return: { "data": string; "digest"?: string }
        },
        "POST": {
            parameters: {
                $path: { "node": string },
                $body: { "data": string; "digest"?: string },
            }
            return: unknown
        }
    },
    "/nodes/{node}/journal": {
        "GET": {
            parameters: {
                $path: { "node": string },
                $query?: {
                    "endcursor"?: string;
                    "lastentries"?: number;
                    "since"?: number;
                    "startcursor"?: string;
                    "until"?: number
                },
            }
            return: string[]
        }
    },
    "/nodes/{node}/lxc": {
        "GET": {
            parameters: {
                $path: { "node": string },
            }
            return: {
                "cpu"?: number;
                "cpus"?: number;
                "disk"?: number;
                "diskread"?: number;
                "diskwrite"?: number;
                "lock"?: string;
                "maxdisk"?: number;
                "maxmem"?: number;
                "maxswap"?: number;
                "mem"?: number;
                "name"?: string;
                "netin"?: number;
                "netout"?: number;
                "pressurecpusome"?: number;
                "pressureiofull"?: number;
                "pressureiosome"?: number;
                "pressurememoryfull"?: number;
                "pressurememorysome"?: number;
                "status": "stopped" | "running";
                "tags"?: string;
                "template"?: boolean;
                "uptime"?: number;
                "vmid": number
            }[]
        },
        "POST": {
            parameters: {
                $path: { "node": string },
                $body: {
                    "arch"?: "amd64" | "i386" | "arm64" | "armhf" | "riscv32" | "riscv64";
                    "bwlimit"?: number;
                    "cmode"?: "shell" | "console" | "tty";
                    "console"?: boolean;
                    "cores"?: number;
                    "cpulimit"?: number;
                    "cpuunits"?: number;
                    "debug"?: boolean;
                    "description"?: string;
                    "dev[n]"?: string;
                    "entrypoint"?: string;
                    "env"?: string;
                    "features"?: string;
                    "force"?: boolean;
                    "ha-managed"?: boolean;
                    "hookscript"?: string;
                    "hostname"?: string;
                    "ignore-unpack-errors"?: boolean;
                    "lock"?: "backup" | "create" | "destroyed" | "disk" | "fstrim" | "migrate" | "mounted" | "rollback" | "snapshot" | "snapshot-delete";
                    "memory"?: number;
                    "mp[n]"?: string;
                    "nameserver"?: string;
                    "net[n]"?: string;
                    "onboot"?: boolean;
                    "ostemplate": string;
                    "ostype"?: "debian" | "devuan" | "ubuntu" | "centos" | "fedora" | "opensuse" | "archlinux" | "alpine" | "gentoo" | "nixos" | "unmanaged";
                    "password"?: string;
                    "pool"?: string;
                    "protection"?: boolean;
                    "restore"?: boolean;
                    "rootfs"?: string;
                    "searchdomain"?: string;
                    "ssh-public-keys"?: string;
                    "start"?: boolean;
                    "startup"?: string;
                    "storage"?: string;
                    "swap"?: number;
                    "tags"?: string;
                    "template"?: boolean;
                    "timezone"?: string;
                    "tty"?: number;
                    "unique"?: boolean;
                    "unprivileged"?: boolean;
                    "unused[n]"?: string;
                    "vmid": number
                },
            }
            return: string
        }
    },
    "/nodes/{node}/lxc/{vmid}": {
        "DELETE": {
            parameters: {
                $path: { "node": string; "vmid": number },
                $query?: { "destroy-unreferenced-disks"?: boolean; "force"?: boolean; "purge"?: boolean },
            }
            return: string
        },
        "GET": {
            parameters: {
                $path: { "node": string; "vmid": number },
            }
            return: { "subdir": string }[]
        }
    },
    "/nodes/{node}/lxc/{vmid}/clone": {
        "POST": {
            parameters: {
                $path: { "node": string; "vmid": number },
                $body: {
                    "bwlimit"?: number;
                    "description"?: string;
                    "full"?: boolean;
                    "hostname"?: string;
                    "newid": number;
                    "pool"?: string;
                    "snapname"?: string;
                    "storage"?: string;
                    "target"?: string
                },
            }
            return: string
        }
    },
    "/nodes/{node}/lxc/{vmid}/config": {
        "GET": {
            parameters: {
                $path: { "node": string; "vmid": number },
                $query?: { "current"?: boolean; "snapshot"?: string },
            }
            return: {
                "arch"?: "amd64" | "i386" | "arm64" | "armhf" | "riscv32" | "riscv64";
                "cmode"?: "shell" | "console" | "tty";
                "console"?: boolean;
                "cores"?: number;
                "cpulimit"?: number;
                "cpuunits"?: number;
                "debug"?: boolean;
                "description"?: string;
                "dev[n]"?: string;
                "digest": string;
                "entrypoint"?: string;
                "env"?: string;
                "features"?: string;
                "hookscript"?: string;
                "hostname"?: string;
                "lock"?: "backup" | "create" | "destroyed" | "disk" | "fstrim" | "migrate" | "mounted" | "rollback" | "snapshot" | "snapshot-delete";
                "lxc"?: string[][];
                "memory"?: number;
                "mp[n]"?: string;
                "nameserver"?: string;
                "net[n]"?: string;
                "onboot"?: boolean;
                "ostype"?: "debian" | "devuan" | "ubuntu" | "centos" | "fedora" | "opensuse" | "archlinux" | "alpine" | "gentoo" | "nixos" | "unmanaged";
                "protection"?: boolean;
                "rootfs"?: string;
                "searchdomain"?: string;
                "startup"?: string;
                "swap"?: number;
                "tags"?: string;
                "template"?: boolean;
                "timezone"?: string;
                "tty"?: number;
                "unprivileged"?: boolean;
                "unused[n]"?: string
            }
        },
        "PUT": {
            parameters: {
                $path: { "node": string; "vmid": number },
                $body: {
                    "arch"?: "amd64" | "i386" | "arm64" | "armhf" | "riscv32" | "riscv64";
                    "cmode"?: "shell" | "console" | "tty";
                    "console"?: boolean;
                    "cores"?: number;
                    "cpulimit"?: number;
                    "cpuunits"?: number;
                    "debug"?: boolean;
                    "delete"?: string;
                    "description"?: string;
                    "dev[n]"?: string;
                    "digest"?: string;
                    "entrypoint"?: string;
                    "env"?: string;
                    "features"?: string;
                    "hookscript"?: string;
                    "hostname"?: string;
                    "lock"?: "backup" | "create" | "destroyed" | "disk" | "fstrim" | "migrate" | "mounted" | "rollback" | "snapshot" | "snapshot-delete";
                    "memory"?: number;
                    "mp[n]"?: string;
                    "nameserver"?: string;
                    "net[n]"?: string;
                    "onboot"?: boolean;
                    "ostype"?: "debian" | "devuan" | "ubuntu" | "centos" | "fedora" | "opensuse" | "archlinux" | "alpine" | "gentoo" | "nixos" | "unmanaged";
                    "protection"?: boolean;
                    "revert"?: string;
                    "rootfs"?: string;
                    "searchdomain"?: string;
                    "startup"?: string;
                    "swap"?: number;
                    "tags"?: string;
                    "template"?: boolean;
                    "timezone"?: string;
                    "tty"?: number;
                    "unprivileged"?: boolean;
                    "unused[n]"?: string
                },
            }
            return: unknown
        }
    },
    "/nodes/{node}/lxc/{vmid}/feature": {
        "GET": {
            parameters: {
                $path: { "node": string; "vmid": number },
                $query?: { "feature": "snapshot" | "clone" | "copy"; "snapname"?: string },
            }
            return: { "hasFeature": boolean }
        }
    },
    "/nodes/{node}/lxc/{vmid}/firewall": {
        "GET": {
            parameters: {
                $path: { "node": string; "vmid": number },
            }
            return: Record<string, unknown>[]
        }
    },
    "/nodes/{node}/lxc/{vmid}/firewall/aliases": {
        "GET": {
            parameters: {
                $path: { "node": string; "vmid": number },
            }
            return: { "cidr": string; "comment"?: string; "digest": string; "name": string }[]
        },
        "POST": {
            parameters: {
                $path: { "node": string; "vmid": number },
                $body: { "cidr": string; "comment"?: string; "name": string },
            }
            return: unknown
        }
    },
    "/nodes/{node}/lxc/{vmid}/firewall/aliases/{name}": {
        "DELETE": {
            parameters: {
                $path: { "node": string; "vmid": number; "name": string },
                $query?: { "digest"?: string },
            }
            return: unknown
        },
        "GET": {
            parameters: {
                $path: { "node": string; "vmid": number; "name": string },
            }
            return: Record<string, unknown>
        },
        "PUT": {
            parameters: {
                $path: { "node": string; "vmid": number; "name": string },
                $body: { "cidr": string; "comment"?: string; "digest"?: string; "rename"?: string },
            }
            return: unknown
        }
    },
    "/nodes/{node}/lxc/{vmid}/firewall/ipset": {
        "GET": {
            parameters: {
                $path: { "node": string; "vmid": number },
            }
            return: { "comment"?: string; "digest": string; "name": string }[]
        },
        "POST": {
            parameters: {
                $path: { "node": string; "vmid": number },
                $body: { "comment"?: string; "digest"?: string; "name": string; "rename"?: string },
            }
            return: unknown
        }
    },
    "/nodes/{node}/lxc/{vmid}/firewall/ipset/{name}": {
        "DELETE": {
            parameters: {
                $path: { "node": string; "vmid": number; "name": string },
                $query?: { "force"?: boolean },
            }
            return: unknown
        },
        "GET": {
            parameters: {
                $path: { "node": string; "vmid": number; "name": string },
            }
            return: { "cidr": string; "comment"?: string; "digest": string; "nomatch"?: boolean }[]
        },
        "POST": {
            parameters: {
                $path: { "node": string; "vmid": number; "name": string },
                $body: { "cidr": string; "comment"?: string; "nomatch"?: boolean },
            }
            return: unknown
        }
    },
    "/nodes/{node}/lxc/{vmid}/firewall/ipset/{name}/{cidr}": {
        "DELETE": {
            parameters: {
                $path: { "node": string; "vmid": number; "name": string; "cidr": string },
                $query?: { "digest"?: string },
            }
            return: unknown
        },
        "GET": {
            parameters: {
                $path: { "node": string; "vmid": number; "name": string; "cidr": string },
            }
            return: Record<string, unknown>
        },
        "PUT": {
            parameters: {
                $path: { "node": string; "vmid": number; "name": string; "cidr": string },
                $body: { "comment"?: string; "digest"?: string; "nomatch"?: boolean },
            }
            return: unknown
        }
    },
    "/nodes/{node}/lxc/{vmid}/firewall/log": {
        "GET": {
            parameters: {
                $path: { "node": string; "vmid": number },
                $query?: { "limit"?: number; "since"?: number; "start"?: number; "until"?: number },
            }
            return: { "n": number; "t": string }[]
        }
    },
    "/nodes/{node}/lxc/{vmid}/firewall/options": {
        "GET": {
            parameters: {
                $path: { "node": string; "vmid": number },
            }
            return: {
                "dhcp"?: boolean;
                "enable"?: boolean;
                "ipfilter"?: boolean;
                "log_level_in"?: "emerg" | "alert" | "crit" | "err" | "warning" | "notice" | "info" | "debug" | "nolog";
                "log_level_out"?: "emerg" | "alert" | "crit" | "err" | "warning" | "notice" | "info" | "debug" | "nolog";
                "macfilter"?: boolean;
                "ndp"?: boolean;
                "policy_in"?: "ACCEPT" | "REJECT" | "DROP";
                "policy_out"?: "ACCEPT" | "REJECT" | "DROP";
                "radv"?: boolean
            }
        },
        "PUT": {
            parameters: {
                $path: { "node": string; "vmid": number },
                $body: {
                    "delete"?: string;
                    "dhcp"?: boolean;
                    "digest"?: string;
                    "enable"?: boolean;
                    "ipfilter"?: boolean;
                    "log_level_in"?: "emerg" | "alert" | "crit" | "err" | "warning" | "notice" | "info" | "debug" | "nolog";
                    "log_level_out"?: "emerg" | "alert" | "crit" | "err" | "warning" | "notice" | "info" | "debug" | "nolog";
                    "macfilter"?: boolean;
                    "ndp"?: boolean;
                    "policy_in"?: "ACCEPT" | "REJECT" | "DROP";
                    "policy_out"?: "ACCEPT" | "REJECT" | "DROP";
                    "radv"?: boolean
                },
            }
            return: unknown
        }
    },
    "/nodes/{node}/lxc/{vmid}/firewall/refs": {
        "GET": {
            parameters: {
                $path: { "node": string; "vmid": number },
                $query?: { "type"?: "alias" | "ipset" },
            }
            return: { "comment"?: string; "name": string; "ref": string; "scope": string; "type": "alias" | "ipset" }[]
        }
    },
    "/nodes/{node}/lxc/{vmid}/firewall/rules": {
        "GET": {
            parameters: {
                $path: { "node": string; "vmid": number },
            }
            return: {
                "action": string;
                "comment"?: string;
                "dest"?: string;
                "dport"?: string;
                "enable"?: number;
                "icmp-type"?: string;
                "iface"?: string;
                "ipversion"?: number;
                "log"?: "emerg" | "alert" | "crit" | "err" | "warning" | "notice" | "info" | "debug" | "nolog";
                "macro"?: string;
                "pos": number;
                "proto"?: string;
                "source"?: string;
                "sport"?: string;
                "type": string
            }[]
        },
        "POST": {
            parameters: {
                $path: { "node": string; "vmid": number },
                $body: {
                    "action": string;
                    "comment"?: string;
                    "dest"?: string;
                    "digest"?: string;
                    "dport"?: string;
                    "enable"?: number;
                    "icmp-type"?: string;
                    "iface"?: string;
                    "log"?: "emerg" | "alert" | "crit" | "err" | "warning" | "notice" | "info" | "debug" | "nolog";
                    "macro"?: string;
                    "pos"?: number;
                    "proto"?: string;
                    "source"?: string;
                    "sport"?: string;
                    "type": "in" | "out" | "forward" | "group"
                },
            }
            return: unknown
        }
    },
    "/nodes/{node}/lxc/{vmid}/firewall/rules/{pos}": {
        "DELETE": {
            parameters: {
                $path: { "node": string; "vmid": number; "pos": number },
                $query?: { "digest"?: string },
            }
            return: unknown
        },
        "GET": {
            parameters: {
                $path: { "node": string; "vmid": number; "pos": number },
            }
            return: {
                "action": string;
                "comment"?: string;
                "dest"?: string;
                "dport"?: string;
                "enable"?: number;
                "icmp-type"?: string;
                "iface"?: string;
                "ipversion"?: number;
                "log"?: "emerg" | "alert" | "crit" | "err" | "warning" | "notice" | "info" | "debug" | "nolog";
                "macro"?: string;
                "pos": number;
                "proto"?: string;
                "source"?: string;
                "sport"?: string;
                "type": string
            }
        },
        "PUT": {
            parameters: {
                $path: { "node": string; "vmid": number; "pos": number },
                $body: {
                    "action"?: string;
                    "comment"?: string;
                    "delete"?: string;
                    "dest"?: string;
                    "digest"?: string;
                    "dport"?: string;
                    "enable"?: number;
                    "icmp-type"?: string;
                    "iface"?: string;
                    "log"?: "emerg" | "alert" | "crit" | "err" | "warning" | "notice" | "info" | "debug" | "nolog";
                    "macro"?: string;
                    "moveto"?: number;
                    "proto"?: string;
                    "source"?: string;
                    "sport"?: string;
                    "type"?: "in" | "out" | "forward" | "group"
                },
            }
            return: unknown
        }
    },
    "/nodes/{node}/lxc/{vmid}/interfaces": {
        "GET": {
            parameters: {
                $path: { "node": string; "vmid": number },
            }
            return: {
                "hardware-address": string;
                "hwaddr": string;
                "inet"?: string;
                "inet6"?: string;
                "ip-addresses": { "ip-address"?: string; "ip-address-type"?: string; "prefix"?: number }[];
                "name": string
            }[]
        }
    },
    "/nodes/{node}/lxc/{vmid}/migrate": {
        "GET": {
            parameters: {
                $path: { "node": string; "vmid": number },
                $query?: { "target"?: string },
            }
            return: {
                "allowed-nodes"?: string[];
                "dependent-ha-resources"?: string[];
                "not-allowed-nodes"?: { "blocking-ha-resources"?: { "cause": "resource-affinity"; "sid": string }[] };
                "running": boolean
            }
        },
        "POST": {
            parameters: {
                $path: { "node": string; "vmid": number },
                $body: {
                    "bwlimit"?: number;
                    "online"?: boolean;
                    "restart"?: boolean;
                    "target": string;
                    "target-storage"?: string;
                    "timeout"?: number
                },
            }
            return: string
        }
    },
    "/nodes/{node}/lxc/{vmid}/move_volume": {
        "POST": {
            parameters: {
                $path: { "node": string; "vmid": number },
                $body: {
                    "bwlimit"?: number;
                    "delete"?: boolean;
                    "digest"?: string;
                    "storage"?: string;
                    "target-digest"?: string;
                    "target-vmid"?: number;
                    "target-volume"?: "rootfs" | "mp0" | "mp1" | "mp2" | "mp3" | "mp4" | "mp5" | "mp6" | "mp7" | "mp8" | "mp9" | "mp10" | "mp11" | "mp12" | "mp13" | "mp14" | "mp15" | "mp16" | "mp17" | "mp18" | "mp19" | "mp20" | "mp21" | "mp22" | "mp23" | "mp24" | "mp25" | "mp26" | "mp27" | "mp28" | "mp29" | "mp30" | "mp31" | "mp32" | "mp33" | "mp34" | "mp35" | "mp36" | "mp37" | "mp38" | "mp39" | "mp40" | "mp41" | "mp42" | "mp43" | "mp44" | "mp45" | "mp46" | "mp47" | "mp48" | "mp49" | "mp50" | "mp51" | "mp52" | "mp53" | "mp54" | "mp55" | "mp56" | "mp57" | "mp58" | "mp59" | "mp60" | "mp61" | "mp62" | "mp63" | "mp64" | "mp65" | "mp66" | "mp67" | "mp68" | "mp69" | "mp70" | "mp71" | "mp72" | "mp73" | "mp74" | "mp75" | "mp76" | "mp77" | "mp78" | "mp79" | "mp80" | "mp81" | "mp82" | "mp83" | "mp84" | "mp85" | "mp86" | "mp87" | "mp88" | "mp89" | "mp90" | "mp91" | "mp92" | "mp93" | "mp94" | "mp95" | "mp96" | "mp97" | "mp98" | "mp99" | "mp100" | "mp101" | "mp102" | "mp103" | "mp104" | "mp105" | "mp106" | "mp107" | "mp108" | "mp109" | "mp110" | "mp111" | "mp112" | "mp113" | "mp114" | "mp115" | "mp116" | "mp117" | "mp118" | "mp119" | "mp120" | "mp121" | "mp122" | "mp123" | "mp124" | "mp125" | "mp126" | "mp127" | "mp128" | "mp129" | "mp130" | "mp131" | "mp132" | "mp133" | "mp134" | "mp135" | "mp136" | "mp137" | "mp138" | "mp139" | "mp140" | "mp141" | "mp142" | "mp143" | "mp144" | "mp145" | "mp146" | "mp147" | "mp148" | "mp149" | "mp150" | "mp151" | "mp152" | "mp153" | "mp154" | "mp155" | "mp156" | "mp157" | "mp158" | "mp159" | "mp160" | "mp161" | "mp162" | "mp163" | "mp164" | "mp165" | "mp166" | "mp167" | "mp168" | "mp169" | "mp170" | "mp171" | "mp172" | "mp173" | "mp174" | "mp175" | "mp176" | "mp177" | "mp178" | "mp179" | "mp180" | "mp181" | "mp182" | "mp183" | "mp184" | "mp185" | "mp186" | "mp187" | "mp188" | "mp189" | "mp190" | "mp191" | "mp192" | "mp193" | "mp194" | "mp195" | "mp196" | "mp197" | "mp198" | "mp199" | "mp200" | "mp201" | "mp202" | "mp203" | "mp204" | "mp205" | "mp206" | "mp207" | "mp208" | "mp209" | "mp210" | "mp211" | "mp212" | "mp213" | "mp214" | "mp215" | "mp216" | "mp217" | "mp218" | "mp219" | "mp220" | "mp221" | "mp222" | "mp223" | "mp224" | "mp225" | "mp226" | "mp227" | "mp228" | "mp229" | "mp230" | "mp231" | "mp232" | "mp233" | "mp234" | "mp235" | "mp236" | "mp237" | "mp238" | "mp239" | "mp240" | "mp241" | "mp242" | "mp243" | "mp244" | "mp245" | "mp246" | "mp247" | "mp248" | "mp249" | "mp250" | "mp251" | "mp252" | "mp253" | "mp254" | "mp255" | "unused0" | "unused1" | "unused2" | "unused3" | "unused4" | "unused5" | "unused6" | "unused7" | "unused8" | "unused9" | "unused10" | "unused11" | "unused12" | "unused13" | "unused14" | "unused15" | "unused16" | "unused17" | "unused18" | "unused19" | "unused20" | "unused21" | "unused22" | "unused23" | "unused24" | "unused25" | "unused26" | "unused27" | "unused28" | "unused29" | "unused30" | "unused31" | "unused32" | "unused33" | "unused34" | "unused35" | "unused36" | "unused37" | "unused38" | "unused39" | "unused40" | "unused41" | "unused42" | "unused43" | "unused44" | "unused45" | "unused46" | "unused47" | "unused48" | "unused49" | "unused50" | "unused51" | "unused52" | "unused53" | "unused54" | "unused55" | "unused56" | "unused57" | "unused58" | "unused59" | "unused60" | "unused61" | "unused62" | "unused63" | "unused64" | "unused65" | "unused66" | "unused67" | "unused68" | "unused69" | "unused70" | "unused71" | "unused72" | "unused73" | "unused74" | "unused75" | "unused76" | "unused77" | "unused78" | "unused79" | "unused80" | "unused81" | "unused82" | "unused83" | "unused84" | "unused85" | "unused86" | "unused87" | "unused88" | "unused89" | "unused90" | "unused91" | "unused92" | "unused93" | "unused94" | "unused95" | "unused96" | "unused97" | "unused98" | "unused99" | "unused100" | "unused101" | "unused102" | "unused103" | "unused104" | "unused105" | "unused106" | "unused107" | "unused108" | "unused109" | "unused110" | "unused111" | "unused112" | "unused113" | "unused114" | "unused115" | "unused116" | "unused117" | "unused118" | "unused119" | "unused120" | "unused121" | "unused122" | "unused123" | "unused124" | "unused125" | "unused126" | "unused127" | "unused128" | "unused129" | "unused130" | "unused131" | "unused132" | "unused133" | "unused134" | "unused135" | "unused136" | "unused137" | "unused138" | "unused139" | "unused140" | "unused141" | "unused142" | "unused143" | "unused144" | "unused145" | "unused146" | "unused147" | "unused148" | "unused149" | "unused150" | "unused151" | "unused152" | "unused153" | "unused154" | "unused155" | "unused156" | "unused157" | "unused158" | "unused159" | "unused160" | "unused161" | "unused162" | "unused163" | "unused164" | "unused165" | "unused166" | "unused167" | "unused168" | "unused169" | "unused170" | "unused171" | "unused172" | "unused173" | "unused174" | "unused175" | "unused176" | "unused177" | "unused178" | "unused179" | "unused180" | "unused181" | "unused182" | "unused183" | "unused184" | "unused185" | "unused186" | "unused187" | "unused188" | "unused189" | "unused190" | "unused191" | "unused192" | "unused193" | "unused194" | "unused195" | "unused196" | "unused197" | "unused198" | "unused199" | "unused200" | "unused201" | "unused202" | "unused203" | "unused204" | "unused205" | "unused206" | "unused207" | "unused208" | "unused209" | "unused210" | "unused211" | "unused212" | "unused213" | "unused214" | "unused215" | "unused216" | "unused217" | "unused218" | "unused219" | "unused220" | "unused221" | "unused222" | "unused223" | "unused224" | "unused225" | "unused226" | "unused227" | "unused228" | "unused229" | "unused230" | "unused231" | "unused232" | "unused233" | "unused234" | "unused235" | "unused236" | "unused237" | "unused238" | "unused239" | "unused240" | "unused241" | "unused242" | "unused243" | "unused244" | "unused245" | "unused246" | "unused247" | "unused248" | "unused249" | "unused250" | "unused251" | "unused252" | "unused253" | "unused254" | "unused255";
                    "volume": "rootfs" | "mp0" | "mp1" | "mp2" | "mp3" | "mp4" | "mp5" | "mp6" | "mp7" | "mp8" | "mp9" | "mp10" | "mp11" | "mp12" | "mp13" | "mp14" | "mp15" | "mp16" | "mp17" | "mp18" | "mp19" | "mp20" | "mp21" | "mp22" | "mp23" | "mp24" | "mp25" | "mp26" | "mp27" | "mp28" | "mp29" | "mp30" | "mp31" | "mp32" | "mp33" | "mp34" | "mp35" | "mp36" | "mp37" | "mp38" | "mp39" | "mp40" | "mp41" | "mp42" | "mp43" | "mp44" | "mp45" | "mp46" | "mp47" | "mp48" | "mp49" | "mp50" | "mp51" | "mp52" | "mp53" | "mp54" | "mp55" | "mp56" | "mp57" | "mp58" | "mp59" | "mp60" | "mp61" | "mp62" | "mp63" | "mp64" | "mp65" | "mp66" | "mp67" | "mp68" | "mp69" | "mp70" | "mp71" | "mp72" | "mp73" | "mp74" | "mp75" | "mp76" | "mp77" | "mp78" | "mp79" | "mp80" | "mp81" | "mp82" | "mp83" | "mp84" | "mp85" | "mp86" | "mp87" | "mp88" | "mp89" | "mp90" | "mp91" | "mp92" | "mp93" | "mp94" | "mp95" | "mp96" | "mp97" | "mp98" | "mp99" | "mp100" | "mp101" | "mp102" | "mp103" | "mp104" | "mp105" | "mp106" | "mp107" | "mp108" | "mp109" | "mp110" | "mp111" | "mp112" | "mp113" | "mp114" | "mp115" | "mp116" | "mp117" | "mp118" | "mp119" | "mp120" | "mp121" | "mp122" | "mp123" | "mp124" | "mp125" | "mp126" | "mp127" | "mp128" | "mp129" | "mp130" | "mp131" | "mp132" | "mp133" | "mp134" | "mp135" | "mp136" | "mp137" | "mp138" | "mp139" | "mp140" | "mp141" | "mp142" | "mp143" | "mp144" | "mp145" | "mp146" | "mp147" | "mp148" | "mp149" | "mp150" | "mp151" | "mp152" | "mp153" | "mp154" | "mp155" | "mp156" | "mp157" | "mp158" | "mp159" | "mp160" | "mp161" | "mp162" | "mp163" | "mp164" | "mp165" | "mp166" | "mp167" | "mp168" | "mp169" | "mp170" | "mp171" | "mp172" | "mp173" | "mp174" | "mp175" | "mp176" | "mp177" | "mp178" | "mp179" | "mp180" | "mp181" | "mp182" | "mp183" | "mp184" | "mp185" | "mp186" | "mp187" | "mp188" | "mp189" | "mp190" | "mp191" | "mp192" | "mp193" | "mp194" | "mp195" | "mp196" | "mp197" | "mp198" | "mp199" | "mp200" | "mp201" | "mp202" | "mp203" | "mp204" | "mp205" | "mp206" | "mp207" | "mp208" | "mp209" | "mp210" | "mp211" | "mp212" | "mp213" | "mp214" | "mp215" | "mp216" | "mp217" | "mp218" | "mp219" | "mp220" | "mp221" | "mp222" | "mp223" | "mp224" | "mp225" | "mp226" | "mp227" | "mp228" | "mp229" | "mp230" | "mp231" | "mp232" | "mp233" | "mp234" | "mp235" | "mp236" | "mp237" | "mp238" | "mp239" | "mp240" | "mp241" | "mp242" | "mp243" | "mp244" | "mp245" | "mp246" | "mp247" | "mp248" | "mp249" | "mp250" | "mp251" | "mp252" | "mp253" | "mp254" | "mp255" | "unused0" | "unused1" | "unused2" | "unused3" | "unused4" | "unused5" | "unused6" | "unused7" | "unused8" | "unused9" | "unused10" | "unused11" | "unused12" | "unused13" | "unused14" | "unused15" | "unused16" | "unused17" | "unused18" | "unused19" | "unused20" | "unused21" | "unused22" | "unused23" | "unused24" | "unused25" | "unused26" | "unused27" | "unused28" | "unused29" | "unused30" | "unused31" | "unused32" | "unused33" | "unused34" | "unused35" | "unused36" | "unused37" | "unused38" | "unused39" | "unused40" | "unused41" | "unused42" | "unused43" | "unused44" | "unused45" | "unused46" | "unused47" | "unused48" | "unused49" | "unused50" | "unused51" | "unused52" | "unused53" | "unused54" | "unused55" | "unused56" | "unused57" | "unused58" | "unused59" | "unused60" | "unused61" | "unused62" | "unused63" | "unused64" | "unused65" | "unused66" | "unused67" | "unused68" | "unused69" | "unused70" | "unused71" | "unused72" | "unused73" | "unused74" | "unused75" | "unused76" | "unused77" | "unused78" | "unused79" | "unused80" | "unused81" | "unused82" | "unused83" | "unused84" | "unused85" | "unused86" | "unused87" | "unused88" | "unused89" | "unused90" | "unused91" | "unused92" | "unused93" | "unused94" | "unused95" | "unused96" | "unused97" | "unused98" | "unused99" | "unused100" | "unused101" | "unused102" | "unused103" | "unused104" | "unused105" | "unused106" | "unused107" | "unused108" | "unused109" | "unused110" | "unused111" | "unused112" | "unused113" | "unused114" | "unused115" | "unused116" | "unused117" | "unused118" | "unused119" | "unused120" | "unused121" | "unused122" | "unused123" | "unused124" | "unused125" | "unused126" | "unused127" | "unused128" | "unused129" | "unused130" | "unused131" | "unused132" | "unused133" | "unused134" | "unused135" | "unused136" | "unused137" | "unused138" | "unused139" | "unused140" | "unused141" | "unused142" | "unused143" | "unused144" | "unused145" | "unused146" | "unused147" | "unused148" | "unused149" | "unused150" | "unused151" | "unused152" | "unused153" | "unused154" | "unused155" | "unused156" | "unused157" | "unused158" | "unused159" | "unused160" | "unused161" | "unused162" | "unused163" | "unused164" | "unused165" | "unused166" | "unused167" | "unused168" | "unused169" | "unused170" | "unused171" | "unused172" | "unused173" | "unused174" | "unused175" | "unused176" | "unused177" | "unused178" | "unused179" | "unused180" | "unused181" | "unused182" | "unused183" | "unused184" | "unused185" | "unused186" | "unused187" | "unused188" | "unused189" | "unused190" | "unused191" | "unused192" | "unused193" | "unused194" | "unused195" | "unused196" | "unused197" | "unused198" | "unused199" | "unused200" | "unused201" | "unused202" | "unused203" | "unused204" | "unused205" | "unused206" | "unused207" | "unused208" | "unused209" | "unused210" | "unused211" | "unused212" | "unused213" | "unused214" | "unused215" | "unused216" | "unused217" | "unused218" | "unused219" | "unused220" | "unused221" | "unused222" | "unused223" | "unused224" | "unused225" | "unused226" | "unused227" | "unused228" | "unused229" | "unused230" | "unused231" | "unused232" | "unused233" | "unused234" | "unused235" | "unused236" | "unused237" | "unused238" | "unused239" | "unused240" | "unused241" | "unused242" | "unused243" | "unused244" | "unused245" | "unused246" | "unused247" | "unused248" | "unused249" | "unused250" | "unused251" | "unused252" | "unused253" | "unused254" | "unused255"
                },
            }
            return: string
        }
    },
    "/nodes/{node}/lxc/{vmid}/mtunnel": {
        "POST": {
            parameters: {
                $path: { "node": string; "vmid": number },
                $body: { "bridges"?: string; "storages"?: string },
            }
            return: { "socket": string; "ticket": string; "upid": string }
        }
    },
    "/nodes/{node}/lxc/{vmid}/mtunnelwebsocket": {
        "GET": {
            parameters: {
                $path: { "node": string; "vmid": number },
                $query?: { "socket": string; "ticket": string },
            }
            return: { "port"?: string; "socket"?: string }
        }
    },
    "/nodes/{node}/lxc/{vmid}/pending": {
        "GET": {
            parameters: {
                $path: { "node": string; "vmid": number },
            }
            return: { "delete"?: number; "key": string; "pending"?: string; "value"?: string }[]
        }
    },
    "/nodes/{node}/lxc/{vmid}/remote_migrate": {
        "POST": {
            parameters: {
                $path: { "node": string; "vmid": number },
                $body: {
                    "bwlimit"?: number;
                    "delete"?: boolean;
                    "online"?: boolean;
                    "restart"?: boolean;
                    "target-bridge": string;
                    "target-endpoint": string;
                    "target-storage": string;
                    "target-vmid"?: number;
                    "timeout"?: number
                },
            }
            return: string
        }
    },
    "/nodes/{node}/lxc/{vmid}/resize": {
        "PUT": {
            parameters: {
                $path: { "node": string; "vmid": number },
                $body: {
                    "digest"?: string;
                    "disk": "rootfs" | "mp0" | "mp1" | "mp2" | "mp3" | "mp4" | "mp5" | "mp6" | "mp7" | "mp8" | "mp9" | "mp10" | "mp11" | "mp12" | "mp13" | "mp14" | "mp15" | "mp16" | "mp17" | "mp18" | "mp19" | "mp20" | "mp21" | "mp22" | "mp23" | "mp24" | "mp25" | "mp26" | "mp27" | "mp28" | "mp29" | "mp30" | "mp31" | "mp32" | "mp33" | "mp34" | "mp35" | "mp36" | "mp37" | "mp38" | "mp39" | "mp40" | "mp41" | "mp42" | "mp43" | "mp44" | "mp45" | "mp46" | "mp47" | "mp48" | "mp49" | "mp50" | "mp51" | "mp52" | "mp53" | "mp54" | "mp55" | "mp56" | "mp57" | "mp58" | "mp59" | "mp60" | "mp61" | "mp62" | "mp63" | "mp64" | "mp65" | "mp66" | "mp67" | "mp68" | "mp69" | "mp70" | "mp71" | "mp72" | "mp73" | "mp74" | "mp75" | "mp76" | "mp77" | "mp78" | "mp79" | "mp80" | "mp81" | "mp82" | "mp83" | "mp84" | "mp85" | "mp86" | "mp87" | "mp88" | "mp89" | "mp90" | "mp91" | "mp92" | "mp93" | "mp94" | "mp95" | "mp96" | "mp97" | "mp98" | "mp99" | "mp100" | "mp101" | "mp102" | "mp103" | "mp104" | "mp105" | "mp106" | "mp107" | "mp108" | "mp109" | "mp110" | "mp111" | "mp112" | "mp113" | "mp114" | "mp115" | "mp116" | "mp117" | "mp118" | "mp119" | "mp120" | "mp121" | "mp122" | "mp123" | "mp124" | "mp125" | "mp126" | "mp127" | "mp128" | "mp129" | "mp130" | "mp131" | "mp132" | "mp133" | "mp134" | "mp135" | "mp136" | "mp137" | "mp138" | "mp139" | "mp140" | "mp141" | "mp142" | "mp143" | "mp144" | "mp145" | "mp146" | "mp147" | "mp148" | "mp149" | "mp150" | "mp151" | "mp152" | "mp153" | "mp154" | "mp155" | "mp156" | "mp157" | "mp158" | "mp159" | "mp160" | "mp161" | "mp162" | "mp163" | "mp164" | "mp165" | "mp166" | "mp167" | "mp168" | "mp169" | "mp170" | "mp171" | "mp172" | "mp173" | "mp174" | "mp175" | "mp176" | "mp177" | "mp178" | "mp179" | "mp180" | "mp181" | "mp182" | "mp183" | "mp184" | "mp185" | "mp186" | "mp187" | "mp188" | "mp189" | "mp190" | "mp191" | "mp192" | "mp193" | "mp194" | "mp195" | "mp196" | "mp197" | "mp198" | "mp199" | "mp200" | "mp201" | "mp202" | "mp203" | "mp204" | "mp205" | "mp206" | "mp207" | "mp208" | "mp209" | "mp210" | "mp211" | "mp212" | "mp213" | "mp214" | "mp215" | "mp216" | "mp217" | "mp218" | "mp219" | "mp220" | "mp221" | "mp222" | "mp223" | "mp224" | "mp225" | "mp226" | "mp227" | "mp228" | "mp229" | "mp230" | "mp231" | "mp232" | "mp233" | "mp234" | "mp235" | "mp236" | "mp237" | "mp238" | "mp239" | "mp240" | "mp241" | "mp242" | "mp243" | "mp244" | "mp245" | "mp246" | "mp247" | "mp248" | "mp249" | "mp250" | "mp251" | "mp252" | "mp253" | "mp254" | "mp255";
                    "size": string
                },
            }
            return: string
        }
    },
    "/nodes/{node}/lxc/{vmid}/rrd": {
        "GET": {
            parameters: {
                $path: { "node": string; "vmid": number },
                $query?: {
                    "cf"?: "AVERAGE" | "MAX";
                    "ds": string;
                    "timeframe": "hour" | "day" | "week" | "month" | "year"
                },
            }
            return: { "filename": string }
        }
    },
    "/nodes/{node}/lxc/{vmid}/rrddata": {
        "GET": {
            parameters: {
                $path: { "node": string; "vmid": number },
                $query?: { "cf"?: "AVERAGE" | "MAX"; "timeframe": "hour" | "day" | "week" | "month" | "year" },
            }
            return: Record<string, unknown>[]
        }
    },
    "/nodes/{node}/lxc/{vmid}/snapshot": {
        "GET": {
            parameters: {
                $path: { "node": string; "vmid": number },
            }
            return: { "description": string; "name": string; "parent"?: string; "snaptime"?: number }[]
        },
        "POST": {
            parameters: {
                $path: { "node": string; "vmid": number },
                $body: { "description"?: string; "snapname": string },
            }
            return: string
        }
    },
    "/nodes/{node}/lxc/{vmid}/snapshot/{snapname}": {
        "DELETE": {
            parameters: {
                $path: { "node": string; "vmid": number; "snapname": string },
                $query?: { "force"?: boolean },
            }
            return: string
        },
        "GET": {
            parameters: {
                $path: { "node": string; "vmid": number; "snapname": string },
            }
            return: Record<string, unknown>[]
        }
    },
    "/nodes/{node}/lxc/{vmid}/snapshot/{snapname}/config": {
        "GET": {
            parameters: {
                $path: { "node": string; "vmid": number; "snapname": string },
            }
            return: Record<string, unknown>
        },
        "PUT": {
            parameters: {
                $path: { "node": string; "vmid": number; "snapname": string },
                $body: { "description"?: string },
            }
            return: unknown
        }
    },
    "/nodes/{node}/lxc/{vmid}/snapshot/{snapname}/rollback": {
        "POST": {
            parameters: {
                $path: { "node": string; "vmid": number; "snapname": string },
                $body: { "start"?: boolean },
            }
            return: string
        }
    },
    "/nodes/{node}/lxc/{vmid}/spiceproxy": {
        "POST": {
            parameters: {
                $path: { "node": string; "vmid": number },
                $body: { "proxy"?: string },
            }
            return: { "host": string; "password": string; "proxy": string; "tls-port": number; "type": string }
        }
    },
    "/nodes/{node}/lxc/{vmid}/status": {
        "GET": {
            parameters: {
                $path: { "node": string; "vmid": number },
            }
            return: { "subdir": string }[]
        }
    },
    "/nodes/{node}/lxc/{vmid}/status/current": {
        "GET": {
            parameters: {
                $path: { "node": string; "vmid": number },
            }
            return: {
                "cpu"?: number;
                "cpus"?: number;
                "disk"?: number;
                "diskread"?: number;
                "diskwrite"?: number;
                "ha": Record<string, unknown>;
                "lock"?: string;
                "maxdisk"?: number;
                "maxmem"?: number;
                "maxswap"?: number;
                "mem"?: number;
                "name"?: string;
                "netin"?: number;
                "netout"?: number;
                "pressurecpusome"?: number;
                "pressureiofull"?: number;
                "pressureiosome"?: number;
                "pressurememoryfull"?: number;
                "pressurememorysome"?: number;
                "status": "stopped" | "running";
                "tags"?: string;
                "template"?: boolean;
                "uptime"?: number;
                "vmid": number
            }
        }
    },
    "/nodes/{node}/lxc/{vmid}/status/reboot": {
        "POST": {
            parameters: {
                $path: { "node": string; "vmid": number },
                $body: { "timeout"?: number },
            }
            return: string
        }
    },
    "/nodes/{node}/lxc/{vmid}/status/resume": {
        "POST": {
            parameters: {
                $path: { "node": string; "vmid": number },
            }
            return: string
        }
    },
    "/nodes/{node}/lxc/{vmid}/status/shutdown": {
        "POST": {
            parameters: {
                $path: { "node": string; "vmid": number },
                $body: { "forceStop"?: boolean; "timeout"?: number },
            }
            return: string
        }
    },
    "/nodes/{node}/lxc/{vmid}/status/start": {
        "POST": {
            parameters: {
                $path: { "node": string; "vmid": number },
                $body: { "debug"?: boolean; "skiplock"?: boolean },
            }
            return: string
        }
    },
    "/nodes/{node}/lxc/{vmid}/status/stop": {
        "POST": {
            parameters: {
                $path: { "node": string; "vmid": number },
                $body: { "overrule-shutdown"?: boolean; "skiplock"?: boolean },
            }
            return: string
        }
    },
    "/nodes/{node}/lxc/{vmid}/status/suspend": {
        "POST": {
            parameters: {
                $path: { "node": string; "vmid": number },
            }
            return: string
        }
    },
    "/nodes/{node}/lxc/{vmid}/template": {
        "POST": {
            parameters: {
                $path: { "node": string; "vmid": number },
            }
            return: unknown
        }
    },
    "/nodes/{node}/lxc/{vmid}/termproxy": {
        "POST": {
            parameters: {
                $path: { "node": string; "vmid": number },
            }
            return: { "port": number; "ticket": string; "upid": string; "user": string }
        }
    },
    "/nodes/{node}/lxc/{vmid}/vncproxy": {
        "POST": {
            parameters: {
                $path: { "node": string; "vmid": number },
                $body: { "height"?: number; "websocket"?: boolean; "width"?: number },
            }
            return: { "cert": string; "port": number; "ticket": string; "upid": string; "user": string }
        }
    },
    "/nodes/{node}/lxc/{vmid}/vncwebsocket": {
        "GET": {
            parameters: {
                $path: { "node": string; "vmid": number },
                $query?: { "port": number; "vncticket": string },
            }
            return: { "port": string }
        }
    },
    "/nodes/{node}/migrateall": {
        "POST": {
            parameters: {
                $path: { "node": string },
                $body: { "maxworkers"?: number; "target": string; "vms"?: string; "with-local-disks"?: boolean },
            }
            return: string
        }
    },
    "/nodes/{node}/netstat": {
        "GET": {
            parameters: {
                $path: { "node": string },
            }
            return: Record<string, unknown>[]
        }
    },
    "/nodes/{node}/network": {
        "DELETE": {
            parameters: {
                $path: { "node": string },
            }
            return: unknown
        },
        "GET": {
            parameters: {
                $path: { "node": string },
                $query?: {
                    "type"?: "bridge" | "bond" | "eth" | "alias" | "vlan" | "fabric" | "OVSBridge" | "OVSBond" | "OVSPort" | "OVSIntPort" | "vnet" | "any_bridge" | "any_local_bridge" | "include_sdn"
                },
            }
            return: {
                "active"?: boolean;
                "address"?: string;
                "address6"?: string;
                "autostart"?: boolean;
                "bond-primary"?: string;
                "bond_mode"?: "balance-rr" | "active-backup" | "balance-xor" | "broadcast" | "802.3ad" | "balance-tlb" | "balance-alb" | "balance-slb" | "lacp-balance-slb" | "lacp-balance-tcp";
                "bond_xmit_hash_policy"?: "layer2" | "layer2+3" | "layer3+4";
                "bridge-access"?: number;
                "bridge-arp-nd-suppress"?: boolean;
                "bridge-learning"?: boolean;
                "bridge-multicast-flood"?: boolean;
                "bridge-unicast-flood"?: boolean;
                "bridge_ports"?: string;
                "bridge_vids"?: string;
                "bridge_vlan_aware"?: boolean;
                "cidr"?: string;
                "cidr6"?: string;
                "comments"?: string;
                "comments6"?: string;
                "exists"?: boolean;
                "families"?: "inet" | "inet6"[];
                "gateway"?: string;
                "gateway6"?: string;
                "iface": string;
                "link-type"?: string;
                "method"?: "loopback" | "dhcp" | "manual" | "static" | "auto";
                "method6"?: "loopback" | "dhcp" | "manual" | "static" | "auto";
                "mtu"?: number;
                "netmask"?: string;
                "netmask6"?: number;
                "options"?: string[];
                "options6"?: string[];
                "ovs_bonds"?: string;
                "ovs_bridge"?: string;
                "ovs_options"?: string;
                "ovs_ports"?: string;
                "ovs_tag"?: number;
                "priority"?: number;
                "slaves"?: string;
                "type": "bridge" | "bond" | "eth" | "alias" | "vlan" | "fabric" | "OVSBridge" | "OVSBond" | "OVSPort" | "OVSIntPort" | "vnet" | "unknown";
                "uplink-id"?: string;
                "vlan-id"?: number;
                "vlan-protocol"?: "802.1ad" | "802.1q";
                "vlan-raw-device"?: string;
                "vxlan-id"?: number;
                "vxlan-local-tunnelip"?: string;
                "vxlan-physdev"?: string;
                "vxlan-svcnodeip"?: string
            }[]
        },
        "POST": {
            parameters: {
                $path: { "node": string },
                $body: {
                    "address"?: string;
                    "address6"?: string;
                    "autostart"?: boolean;
                    "bond-primary"?: string;
                    "bond_mode"?: "balance-rr" | "active-backup" | "balance-xor" | "broadcast" | "802.3ad" | "balance-tlb" | "balance-alb" | "balance-slb" | "lacp-balance-slb" | "lacp-balance-tcp";
                    "bond_xmit_hash_policy"?: "layer2" | "layer2+3" | "layer3+4";
                    "bridge_ports"?: string;
                    "bridge_vids"?: string;
                    "bridge_vlan_aware"?: boolean;
                    "cidr"?: string;
                    "cidr6"?: string;
                    "comments"?: string;
                    "comments6"?: string;
                    "gateway"?: string;
                    "gateway6"?: string;
                    "iface": string;
                    "mtu"?: number;
                    "netmask"?: string;
                    "netmask6"?: number;
                    "ovs_bonds"?: string;
                    "ovs_bridge"?: string;
                    "ovs_options"?: string;
                    "ovs_ports"?: string;
                    "ovs_tag"?: number;
                    "slaves"?: string;
                    "type": "bridge" | "bond" | "eth" | "alias" | "vlan" | "fabric" | "OVSBridge" | "OVSBond" | "OVSPort" | "OVSIntPort" | "vnet" | "unknown";
                    "vlan-id"?: number;
                    "vlan-raw-device"?: string
                },
            }
            return: unknown
        },
        "PUT": {
            parameters: {
                $path: { "node": string },
                $body: { "regenerate-frr"?: boolean },
            }
            return: string
        }
    },
    "/nodes/{node}/network/{iface}": {
        "DELETE": {
            parameters: {
                $path: { "node": string; "iface": string },
            }
            return: unknown
        },
        "GET": {
            parameters: {
                $path: { "node": string; "iface": string },
            }
            return: { "method": string; "type": string }
        },
        "PUT": {
            parameters: {
                $path: { "node": string; "iface": string },
                $body: {
                    "address"?: string;
                    "address6"?: string;
                    "autostart"?: boolean;
                    "bond-primary"?: string;
                    "bond_mode"?: "balance-rr" | "active-backup" | "balance-xor" | "broadcast" | "802.3ad" | "balance-tlb" | "balance-alb" | "balance-slb" | "lacp-balance-slb" | "lacp-balance-tcp";
                    "bond_xmit_hash_policy"?: "layer2" | "layer2+3" | "layer3+4";
                    "bridge_ports"?: string;
                    "bridge_vids"?: string;
                    "bridge_vlan_aware"?: boolean;
                    "cidr"?: string;
                    "cidr6"?: string;
                    "comments"?: string;
                    "comments6"?: string;
                    "delete"?: string;
                    "gateway"?: string;
                    "gateway6"?: string;
                    "mtu"?: number;
                    "netmask"?: string;
                    "netmask6"?: number;
                    "ovs_bonds"?: string;
                    "ovs_bridge"?: string;
                    "ovs_options"?: string;
                    "ovs_ports"?: string;
                    "ovs_tag"?: number;
                    "slaves"?: string;
                    "type": "bridge" | "bond" | "eth" | "alias" | "vlan" | "fabric" | "OVSBridge" | "OVSBond" | "OVSPort" | "OVSIntPort" | "vnet" | "unknown";
                    "vlan-id"?: number;
                    "vlan-raw-device"?: string
                },
            }
            return: unknown
        }
    },
    "/nodes/{node}/qemu": {
        "GET": {
            parameters: {
                $path: { "node": string },
                $query?: { "full"?: boolean },
            }
            return: {
                "cpu"?: number;
                "cpus"?: number;
                "diskread"?: number;
                "diskwrite"?: number;
                "lock"?: string;
                "maxdisk"?: number;
                "maxmem"?: number;
                "mem"?: number;
                "memhost"?: number;
                "name"?: string;
                "netin"?: number;
                "netout"?: number;
                "pid"?: number;
                "pressurecpufull"?: number;
                "pressurecpusome"?: number;
                "pressureiofull"?: number;
                "pressureiosome"?: number;
                "pressurememoryfull"?: number;
                "pressurememorysome"?: number;
                "qmpstatus"?: string;
                "running-machine"?: string;
                "running-qemu"?: string;
                "serial"?: boolean;
                "status": "stopped" | "running";
                "tags"?: string;
                "template"?: boolean;
                "uptime"?: number;
                "vmid": number
            }[]
        },
        "POST": {
            parameters: {
                $path: { "node": string },
                $body: {
                    "acpi"?: boolean;
                    "affinity"?: string;
                    "agent"?: string;
                    "allow-ksm"?: boolean;
                    "amd-sev"?: string;
                    "arch"?: "x86_64" | "aarch64";
                    "archive"?: string;
                    "args"?: string;
                    "audio0"?: string;
                    "autostart"?: boolean;
                    "balloon"?: number;
                    "bios"?: "seabios" | "ovmf";
                    "boot"?: string;
                    "bootdisk"?: string;
                    "bwlimit"?: number;
                    "cdrom"?: string;
                    "cicustom"?: string;
                    "cipassword"?: string;
                    "citype"?: "configdrive2" | "nocloud" | "opennebula";
                    "ciupgrade"?: boolean;
                    "ciuser"?: string;
                    "cores"?: number;
                    "cpu"?: string;
                    "cpulimit"?: number;
                    "cpuunits"?: number;
                    "description"?: string;
                    "efidisk0"?: string;
                    "force"?: boolean;
                    "freeze"?: boolean;
                    "ha-managed"?: boolean;
                    "hookscript"?: string;
                    "hostpci[n]"?: string;
                    "hotplug"?: string;
                    "hugepages"?: "any" | "2" | "1024";
                    "ide[n]"?: string;
                    "import-working-storage"?: string;
                    "intel-tdx"?: string;
                    "ipconfig[n]"?: string;
                    "ivshmem"?: string;
                    "keephugepages"?: boolean;
                    "keyboard"?: "de" | "de-ch" | "da" | "en-gb" | "en-us" | "es" | "fi" | "fr" | "fr-be" | "fr-ca" | "fr-ch" | "hu" | "is" | "it" | "ja" | "lt" | "mk" | "nl" | "no" | "pl" | "pt" | "pt-br" | "sv" | "sl" | "tr";
                    "kvm"?: boolean;
                    "live-restore"?: boolean;
                    "localtime"?: boolean;
                    "lock"?: "backup" | "clone" | "create" | "migrate" | "rollback" | "snapshot" | "snapshot-delete" | "suspending" | "suspended";
                    "machine"?: string;
                    "memory"?: string;
                    "migrate_downtime"?: number;
                    "migrate_speed"?: number;
                    "name"?: string;
                    "nameserver"?: string;
                    "net[n]"?: string;
                    "numa"?: boolean;
                    "numa[n]"?: string;
                    "onboot"?: boolean;
                    "ostype"?: "other" | "wxp" | "w2k" | "w2k3" | "w2k8" | "wvista" | "win7" | "win8" | "win10" | "win11" | "l24" | "l26" | "solaris";
                    "parallel[n]"?: string;
                    "pool"?: string;
                    "protection"?: boolean;
                    "reboot"?: boolean;
                    "rng0"?: string;
                    "sata[n]"?: string;
                    "scsi[n]"?: string;
                    "scsihw"?: "lsi" | "lsi53c810" | "virtio-scsi-pci" | "virtio-scsi-single" | "megasas" | "pvscsi";
                    "searchdomain"?: string;
                    "serial[n]"?: string;
                    "shares"?: number;
                    "smbios1"?: string;
                    "smp"?: number;
                    "sockets"?: number;
                    "spice_enhancements"?: string;
                    "sshkeys"?: string;
                    "start"?: boolean;
                    "startdate"?: string;
                    "startup"?: string;
                    "storage"?: string;
                    "tablet"?: boolean;
                    "tags"?: string;
                    "tdf"?: boolean;
                    "template"?: boolean;
                    "tpmstate0"?: string;
                    "unique"?: boolean;
                    "unused[n]"?: string;
                    "usb[n]"?: string;
                    "vcpus"?: number;
                    "vga"?: string;
                    "virtio[n]"?: string;
                    "virtiofs[n]"?: string;
                    "vmgenid"?: string;
                    "vmid": number;
                    "vmstatestorage"?: string;
                    "watchdog"?: string
                },
            }
            return: string
        }
    },
    "/nodes/{node}/qemu/{vmid}": {
        "DELETE": {
            parameters: {
                $path: { "node": string; "vmid": number },
                $query?: { "destroy-unreferenced-disks"?: boolean; "purge"?: boolean; "skiplock"?: boolean },
            }
            return: string
        },
        "GET": {
            parameters: {
                $path: { "node": string; "vmid": number },
            }
            return: { "subdir": string }[]
        }
    },
    "/nodes/{node}/qemu/{vmid}/agent": {
        "GET": {
            parameters: {
                $path: { "node": string; "vmid": number },
            }
            return: Record<string, unknown>[]
        },
        "POST": {
            parameters: {
                $path: { "node": string; "vmid": number },
                $body: {
                    "command": "fsfreeze-freeze" | "fsfreeze-status" | "fsfreeze-thaw" | "fstrim" | "get-fsinfo" | "get-host-name" | "get-memory-block-info" | "get-memory-blocks" | "get-osinfo" | "get-time" | "get-timezone" | "get-users" | "get-vcpus" | "info" | "network-get-interfaces" | "ping" | "shutdown" | "suspend-disk" | "suspend-hybrid" | "suspend-ram"
                },
            }
            return: Record<string, unknown>
        }
    },
    "/nodes/{node}/qemu/{vmid}/agent/exec": {
        "POST": {
            parameters: {
                $path: { "node": string; "vmid": number },
                $body: { "command": string[]; "input-data"?: string },
            }
            return: { "pid": number }
        }
    },
    "/nodes/{node}/qemu/{vmid}/agent/exec-status": {
        "GET": {
            parameters: {
                $path: { "node": string; "vmid": number },
                $query?: { "pid": number },
            }
            return: {
                "err-data"?: string;
                "err-truncated"?: boolean;
                "exitcode"?: number;
                "exited": boolean;
                "out-data"?: string;
                "out-truncated"?: boolean;
                "signal"?: number
            }
        }
    },
    "/nodes/{node}/qemu/{vmid}/agent/file-read": {
        "GET": {
            parameters: {
                $path: { "node": string; "vmid": number },
                $query?: { "file": string },
            }
            return: { "content": string; "truncated"?: boolean }
        }
    },
    "/nodes/{node}/qemu/{vmid}/agent/file-write": {
        "POST": {
            parameters: {
                $path: { "node": string; "vmid": number },
                $body: { "content": string; "encode"?: boolean; "file": string },
            }
            return: unknown
        }
    },
    "/nodes/{node}/qemu/{vmid}/agent/fsfreeze-freeze": {
        "POST": {
            parameters: {
                $path: { "node": string; "vmid": number },
            }
            return: Record<string, unknown>
        }
    },
    "/nodes/{node}/qemu/{vmid}/agent/fsfreeze-status": {
        "POST": {
            parameters: {
                $path: { "node": string; "vmid": number },
            }
            return: Record<string, unknown>
        }
    },
    "/nodes/{node}/qemu/{vmid}/agent/fsfreeze-thaw": {
        "POST": {
            parameters: {
                $path: { "node": string; "vmid": number },
            }
            return: Record<string, unknown>
        }
    },
    "/nodes/{node}/qemu/{vmid}/agent/fstrim": {
        "POST": {
            parameters: {
                $path: { "node": string; "vmid": number },
            }
            return: Record<string, unknown>
        }
    },
    "/nodes/{node}/qemu/{vmid}/agent/get-fsinfo": {
        "GET": {
            parameters: {
                $path: { "node": string; "vmid": number },
            }
            return: Record<string, unknown>
        }
    },
    "/nodes/{node}/qemu/{vmid}/agent/get-host-name": {
        "GET": {
            parameters: {
                $path: { "node": string; "vmid": number },
            }
            return: Record<string, unknown>
        }
    },
    "/nodes/{node}/qemu/{vmid}/agent/get-memory-block-info": {
        "GET": {
            parameters: {
                $path: { "node": string; "vmid": number },
            }
            return: Record<string, unknown>
        }
    },
    "/nodes/{node}/qemu/{vmid}/agent/get-memory-blocks": {
        "GET": {
            parameters: {
                $path: { "node": string; "vmid": number },
            }
            return: Record<string, unknown>
        }
    },
    "/nodes/{node}/qemu/{vmid}/agent/get-osinfo": {
        "GET": {
            parameters: {
                $path: { "node": string; "vmid": number },
            }
            return: Record<string, unknown>
        }
    },
    "/nodes/{node}/qemu/{vmid}/agent/get-time": {
        "GET": {
            parameters: {
                $path: { "node": string; "vmid": number },
            }
            return: Record<string, unknown>
        }
    },
    "/nodes/{node}/qemu/{vmid}/agent/get-timezone": {
        "GET": {
            parameters: {
                $path: { "node": string; "vmid": number },
            }
            return: Record<string, unknown>
        }
    },
    "/nodes/{node}/qemu/{vmid}/agent/get-users": {
        "GET": {
            parameters: {
                $path: { "node": string; "vmid": number },
            }
            return: Record<string, unknown>
        }
    },
    "/nodes/{node}/qemu/{vmid}/agent/get-vcpus": {
        "GET": {
            parameters: {
                $path: { "node": string; "vmid": number },
            }
            return: Record<string, unknown>
        }
    },
    "/nodes/{node}/qemu/{vmid}/agent/info": {
        "GET": {
            parameters: {
                $path: { "node": string; "vmid": number },
            }
            return: Record<string, unknown>
        }
    },
    "/nodes/{node}/qemu/{vmid}/agent/network-get-interfaces": {
        "GET": {
            parameters: {
                $path: { "node": string; "vmid": number },
            }
            return: Record<string, unknown>
        }
    },
    "/nodes/{node}/qemu/{vmid}/agent/ping": {
        "POST": {
            parameters: {
                $path: { "node": string; "vmid": number },
            }
            return: Record<string, unknown>
        }
    },
    "/nodes/{node}/qemu/{vmid}/agent/set-user-password": {
        "POST": {
            parameters: {
                $path: { "node": string; "vmid": number },
                $body: { "crypted"?: boolean; "password": string; "username": string },
            }
            return: Record<string, unknown>
        }
    },
    "/nodes/{node}/qemu/{vmid}/agent/shutdown": {
        "POST": {
            parameters: {
                $path: { "node": string; "vmid": number },
            }
            return: Record<string, unknown>
        }
    },
    "/nodes/{node}/qemu/{vmid}/agent/suspend-disk": {
        "POST": {
            parameters: {
                $path: { "node": string; "vmid": number },
            }
            return: Record<string, unknown>
        }
    },
    "/nodes/{node}/qemu/{vmid}/agent/suspend-hybrid": {
        "POST": {
            parameters: {
                $path: { "node": string; "vmid": number },
            }
            return: Record<string, unknown>
        }
    },
    "/nodes/{node}/qemu/{vmid}/agent/suspend-ram": {
        "POST": {
            parameters: {
                $path: { "node": string; "vmid": number },
            }
            return: Record<string, unknown>
        }
    },
    "/nodes/{node}/qemu/{vmid}/clone": {
        "POST": {
            parameters: {
                $path: { "node": string; "vmid": number },
                $body: {
                    "bwlimit"?: number;
                    "description"?: string;
                    "format"?: "raw" | "qcow2" | "vmdk";
                    "full"?: boolean;
                    "name"?: string;
                    "newid": number;
                    "pool"?: string;
                    "snapname"?: string;
                    "storage"?: string;
                    "target"?: string
                },
            }
            return: string
        }
    },
    "/nodes/{node}/qemu/{vmid}/cloudinit": {
        "GET": {
            parameters: {
                $path: { "node": string; "vmid": number },
            }
            return: { "delete"?: number; "key": string; "pending"?: string; "value"?: string }[]
        },
        "PUT": {
            parameters: {
                $path: { "node": string; "vmid": number },
            }
            return: unknown
        }
    },
    "/nodes/{node}/qemu/{vmid}/cloudinit/dump": {
        "GET": {
            parameters: {
                $path: { "node": string; "vmid": number },
                $query?: { "type": "user" | "network" | "meta" },
            }
            return: string
        }
    },
    "/nodes/{node}/qemu/{vmid}/config": {
        "GET": {
            parameters: {
                $path: { "node": string; "vmid": number },
                $query?: { "current"?: boolean; "snapshot"?: string },
            }
            return: {
                "acpi"?: boolean;
                "affinity"?: string;
                "agent"?: string;
                "allow-ksm"?: boolean;
                "amd-sev"?: string;
                "arch"?: "x86_64" | "aarch64";
                "args"?: string;
                "audio0"?: string;
                "autostart"?: boolean;
                "balloon"?: number;
                "bios"?: "seabios" | "ovmf";
                "boot"?: string;
                "bootdisk"?: string;
                "cdrom"?: string;
                "cicustom"?: string;
                "cipassword"?: string;
                "citype"?: "configdrive2" | "nocloud" | "opennebula";
                "ciupgrade"?: boolean;
                "ciuser"?: string;
                "cores"?: number;
                "cpu"?: string;
                "cpulimit"?: number;
                "cpuunits"?: number;
                "description"?: string;
                "digest": string;
                "efidisk0"?: string;
                "freeze"?: boolean;
                "hookscript"?: string;
                "hostpci[n]"?: string;
                "hotplug"?: string;
                "hugepages"?: "any" | "2" | "1024";
                "ide[n]"?: string;
                "intel-tdx"?: string;
                "ipconfig[n]"?: string;
                "ivshmem"?: string;
                "keephugepages"?: boolean;
                "keyboard"?: "de" | "de-ch" | "da" | "en-gb" | "en-us" | "es" | "fi" | "fr" | "fr-be" | "fr-ca" | "fr-ch" | "hu" | "is" | "it" | "ja" | "lt" | "mk" | "nl" | "no" | "pl" | "pt" | "pt-br" | "sv" | "sl" | "tr";
                "kvm"?: boolean;
                "localtime"?: boolean;
                "lock"?: "backup" | "clone" | "create" | "migrate" | "rollback" | "snapshot" | "snapshot-delete" | "suspending" | "suspended";
                "machine"?: string;
                "memory"?: string;
                "meta"?: string;
                "migrate_downtime"?: number;
                "migrate_speed"?: number;
                "name"?: string;
                "nameserver"?: string;
                "net[n]"?: string;
                "numa"?: boolean;
                "numa[n]"?: string;
                "onboot"?: boolean;
                "ostype"?: "other" | "wxp" | "w2k" | "w2k3" | "w2k8" | "wvista" | "win7" | "win8" | "win10" | "win11" | "l24" | "l26" | "solaris";
                "parallel[n]"?: string;
                "parent"?: string;
                "protection"?: boolean;
                "reboot"?: boolean;
                "rng0"?: string;
                "running-nets-host-mtu"?: string;
                "runningcpu"?: string;
                "runningmachine"?: string;
                "sata[n]"?: string;
                "scsi[n]"?: string;
                "scsihw"?: "lsi" | "lsi53c810" | "virtio-scsi-pci" | "virtio-scsi-single" | "megasas" | "pvscsi";
                "searchdomain"?: string;
                "serial[n]"?: string;
                "shares"?: number;
                "smbios1"?: string;
                "smp"?: number;
                "snaptime"?: number;
                "sockets"?: number;
                "spice_enhancements"?: string;
                "sshkeys"?: string;
                "startdate"?: string;
                "startup"?: string;
                "tablet"?: boolean;
                "tags"?: string;
                "tdf"?: boolean;
                "template"?: boolean;
                "tpmstate0"?: string;
                "unused[n]"?: string;
                "usb[n]"?: string;
                "vcpus"?: number;
                "vga"?: string;
                "virtio[n]"?: string;
                "virtiofs[n]"?: string;
                "vmgenid"?: string;
                "vmstate"?: string;
                "vmstatestorage"?: string;
                "watchdog"?: string
            }
        },
        "POST": {
            parameters: {
                $path: { "node": string; "vmid": number },
                $body: {
                    "acpi"?: boolean;
                    "affinity"?: string;
                    "agent"?: string;
                    "allow-ksm"?: boolean;
                    "amd-sev"?: string;
                    "arch"?: "x86_64" | "aarch64";
                    "args"?: string;
                    "audio0"?: string;
                    "autostart"?: boolean;
                    "background_delay"?: number;
                    "balloon"?: number;
                    "bios"?: "seabios" | "ovmf";
                    "boot"?: string;
                    "bootdisk"?: string;
                    "cdrom"?: string;
                    "cicustom"?: string;
                    "cipassword"?: string;
                    "citype"?: "configdrive2" | "nocloud" | "opennebula";
                    "ciupgrade"?: boolean;
                    "ciuser"?: string;
                    "cores"?: number;
                    "cpu"?: string;
                    "cpulimit"?: number;
                    "cpuunits"?: number;
                    "delete"?: string;
                    "description"?: string;
                    "digest"?: string;
                    "efidisk0"?: string;
                    "force"?: boolean;
                    "freeze"?: boolean;
                    "hookscript"?: string;
                    "hostpci[n]"?: string;
                    "hotplug"?: string;
                    "hugepages"?: "any" | "2" | "1024";
                    "ide[n]"?: string;
                    "import-working-storage"?: string;
                    "intel-tdx"?: string;
                    "ipconfig[n]"?: string;
                    "ivshmem"?: string;
                    "keephugepages"?: boolean;
                    "keyboard"?: "de" | "de-ch" | "da" | "en-gb" | "en-us" | "es" | "fi" | "fr" | "fr-be" | "fr-ca" | "fr-ch" | "hu" | "is" | "it" | "ja" | "lt" | "mk" | "nl" | "no" | "pl" | "pt" | "pt-br" | "sv" | "sl" | "tr";
                    "kvm"?: boolean;
                    "localtime"?: boolean;
                    "lock"?: "backup" | "clone" | "create" | "migrate" | "rollback" | "snapshot" | "snapshot-delete" | "suspending" | "suspended";
                    "machine"?: string;
                    "memory"?: string;
                    "migrate_downtime"?: number;
                    "migrate_speed"?: number;
                    "name"?: string;
                    "nameserver"?: string;
                    "net[n]"?: string;
                    "numa"?: boolean;
                    "numa[n]"?: string;
                    "onboot"?: boolean;
                    "ostype"?: "other" | "wxp" | "w2k" | "w2k3" | "w2k8" | "wvista" | "win7" | "win8" | "win10" | "win11" | "l24" | "l26" | "solaris";
                    "parallel[n]"?: string;
                    "protection"?: boolean;
                    "reboot"?: boolean;
                    "revert"?: string;
                    "rng0"?: string;
                    "sata[n]"?: string;
                    "scsi[n]"?: string;
                    "scsihw"?: "lsi" | "lsi53c810" | "virtio-scsi-pci" | "virtio-scsi-single" | "megasas" | "pvscsi";
                    "searchdomain"?: string;
                    "serial[n]"?: string;
                    "shares"?: number;
                    "skiplock"?: boolean;
                    "smbios1"?: string;
                    "smp"?: number;
                    "sockets"?: number;
                    "spice_enhancements"?: string;
                    "sshkeys"?: string;
                    "startdate"?: string;
                    "startup"?: string;
                    "tablet"?: boolean;
                    "tags"?: string;
                    "tdf"?: boolean;
                    "template"?: boolean;
                    "tpmstate0"?: string;
                    "unused[n]"?: string;
                    "usb[n]"?: string;
                    "vcpus"?: number;
                    "vga"?: string;
                    "virtio[n]"?: string;
                    "virtiofs[n]"?: string;
                    "vmgenid"?: string;
                    "vmstatestorage"?: string;
                    "watchdog"?: string
                },
            }
            return: string
        },
        "PUT": {
            parameters: {
                $path: { "node": string; "vmid": number },
                $body: {
                    "acpi"?: boolean;
                    "affinity"?: string;
                    "agent"?: string;
                    "allow-ksm"?: boolean;
                    "amd-sev"?: string;
                    "arch"?: "x86_64" | "aarch64";
                    "args"?: string;
                    "audio0"?: string;
                    "autostart"?: boolean;
                    "balloon"?: number;
                    "bios"?: "seabios" | "ovmf";
                    "boot"?: string;
                    "bootdisk"?: string;
                    "cdrom"?: string;
                    "cicustom"?: string;
                    "cipassword"?: string;
                    "citype"?: "configdrive2" | "nocloud" | "opennebula";
                    "ciupgrade"?: boolean;
                    "ciuser"?: string;
                    "cores"?: number;
                    "cpu"?: string;
                    "cpulimit"?: number;
                    "cpuunits"?: number;
                    "delete"?: string;
                    "description"?: string;
                    "digest"?: string;
                    "efidisk0"?: string;
                    "force"?: boolean;
                    "freeze"?: boolean;
                    "hookscript"?: string;
                    "hostpci[n]"?: string;
                    "hotplug"?: string;
                    "hugepages"?: "any" | "2" | "1024";
                    "ide[n]"?: string;
                    "intel-tdx"?: string;
                    "ipconfig[n]"?: string;
                    "ivshmem"?: string;
                    "keephugepages"?: boolean;
                    "keyboard"?: "de" | "de-ch" | "da" | "en-gb" | "en-us" | "es" | "fi" | "fr" | "fr-be" | "fr-ca" | "fr-ch" | "hu" | "is" | "it" | "ja" | "lt" | "mk" | "nl" | "no" | "pl" | "pt" | "pt-br" | "sv" | "sl" | "tr";
                    "kvm"?: boolean;
                    "localtime"?: boolean;
                    "lock"?: "backup" | "clone" | "create" | "migrate" | "rollback" | "snapshot" | "snapshot-delete" | "suspending" | "suspended";
                    "machine"?: string;
                    "memory"?: string;
                    "migrate_downtime"?: number;
                    "migrate_speed"?: number;
                    "name"?: string;
                    "nameserver"?: string;
                    "net[n]"?: string;
                    "numa"?: boolean;
                    "numa[n]"?: string;
                    "onboot"?: boolean;
                    "ostype"?: "other" | "wxp" | "w2k" | "w2k3" | "w2k8" | "wvista" | "win7" | "win8" | "win10" | "win11" | "l24" | "l26" | "solaris";
                    "parallel[n]"?: string;
                    "protection"?: boolean;
                    "reboot"?: boolean;
                    "revert"?: string;
                    "rng0"?: string;
                    "sata[n]"?: string;
                    "scsi[n]"?: string;
                    "scsihw"?: "lsi" | "lsi53c810" | "virtio-scsi-pci" | "virtio-scsi-single" | "megasas" | "pvscsi";
                    "searchdomain"?: string;
                    "serial[n]"?: string;
                    "shares"?: number;
                    "skiplock"?: boolean;
                    "smbios1"?: string;
                    "smp"?: number;
                    "sockets"?: number;
                    "spice_enhancements"?: string;
                    "sshkeys"?: string;
                    "startdate"?: string;
                    "startup"?: string;
                    "tablet"?: boolean;
                    "tags"?: string;
                    "tdf"?: boolean;
                    "template"?: boolean;
                    "tpmstate0"?: string;
                    "unused[n]"?: string;
                    "usb[n]"?: string;
                    "vcpus"?: number;
                    "vga"?: string;
                    "virtio[n]"?: string;
                    "virtiofs[n]"?: string;
                    "vmgenid"?: string;
                    "vmstatestorage"?: string;
                    "watchdog"?: string
                },
            }
            return: unknown
        }
    },
    "/nodes/{node}/qemu/{vmid}/dbus-vmstate": {
        "POST": {
            parameters: {
                $path: { "node": string; "vmid": number },
                $body: { "action": "start" | "stop" },
            }
            return: unknown
        }
    },
    "/nodes/{node}/qemu/{vmid}/feature": {
        "GET": {
            parameters: {
                $path: { "node": string; "vmid": number },
                $query?: { "feature": "snapshot" | "clone" | "copy"; "snapname"?: string },
            }
            return: { "hasFeature": boolean; "nodes": string[] }
        }
    },
    "/nodes/{node}/qemu/{vmid}/firewall": {
        "GET": {
            parameters: {
                $path: { "node": string; "vmid": number },
            }
            return: Record<string, unknown>[]
        }
    },
    "/nodes/{node}/qemu/{vmid}/firewall/aliases": {
        "GET": {
            parameters: {
                $path: { "node": string; "vmid": number },
            }
            return: { "cidr": string; "comment"?: string; "digest": string; "name": string }[]
        },
        "POST": {
            parameters: {
                $path: { "node": string; "vmid": number },
                $body: { "cidr": string; "comment"?: string; "name": string },
            }
            return: unknown
        }
    },
    "/nodes/{node}/qemu/{vmid}/firewall/aliases/{name}": {
        "DELETE": {
            parameters: {
                $path: { "node": string; "vmid": number; "name": string },
                $query?: { "digest"?: string },
            }
            return: unknown
        },
        "GET": {
            parameters: {
                $path: { "node": string; "vmid": number; "name": string },
            }
            return: Record<string, unknown>
        },
        "PUT": {
            parameters: {
                $path: { "node": string; "vmid": number; "name": string },
                $body: { "cidr": string; "comment"?: string; "digest"?: string; "rename"?: string },
            }
            return: unknown
        }
    },
    "/nodes/{node}/qemu/{vmid}/firewall/ipset": {
        "GET": {
            parameters: {
                $path: { "node": string; "vmid": number },
            }
            return: { "comment"?: string; "digest": string; "name": string }[]
        },
        "POST": {
            parameters: {
                $path: { "node": string; "vmid": number },
                $body: { "comment"?: string; "digest"?: string; "name": string; "rename"?: string },
            }
            return: unknown
        }
    },
    "/nodes/{node}/qemu/{vmid}/firewall/ipset/{name}": {
        "DELETE": {
            parameters: {
                $path: { "node": string; "vmid": number; "name": string },
                $query?: { "force"?: boolean },
            }
            return: unknown
        },
        "GET": {
            parameters: {
                $path: { "node": string; "vmid": number; "name": string },
            }
            return: { "cidr": string; "comment"?: string; "digest": string; "nomatch"?: boolean }[]
        },
        "POST": {
            parameters: {
                $path: { "node": string; "vmid": number; "name": string },
                $body: { "cidr": string; "comment"?: string; "nomatch"?: boolean },
            }
            return: unknown
        }
    },
    "/nodes/{node}/qemu/{vmid}/firewall/ipset/{name}/{cidr}": {
        "DELETE": {
            parameters: {
                $path: { "node": string; "vmid": number; "name": string; "cidr": string },
                $query?: { "digest"?: string },
            }
            return: unknown
        },
        "GET": {
            parameters: {
                $path: { "node": string; "vmid": number; "name": string; "cidr": string },
            }
            return: Record<string, unknown>
        },
        "PUT": {
            parameters: {
                $path: { "node": string; "vmid": number; "name": string; "cidr": string },
                $body: { "comment"?: string; "digest"?: string; "nomatch"?: boolean },
            }
            return: unknown
        }
    },
    "/nodes/{node}/qemu/{vmid}/firewall/log": {
        "GET": {
            parameters: {
                $path: { "node": string; "vmid": number },
                $query?: { "limit"?: number; "since"?: number; "start"?: number; "until"?: number },
            }
            return: { "n": number; "t": string }[]
        }
    },
    "/nodes/{node}/qemu/{vmid}/firewall/options": {
        "GET": {
            parameters: {
                $path: { "node": string; "vmid": number },
            }
            return: {
                "dhcp"?: boolean;
                "enable"?: boolean;
                "ipfilter"?: boolean;
                "log_level_in"?: "emerg" | "alert" | "crit" | "err" | "warning" | "notice" | "info" | "debug" | "nolog";
                "log_level_out"?: "emerg" | "alert" | "crit" | "err" | "warning" | "notice" | "info" | "debug" | "nolog";
                "macfilter"?: boolean;
                "ndp"?: boolean;
                "policy_in"?: "ACCEPT" | "REJECT" | "DROP";
                "policy_out"?: "ACCEPT" | "REJECT" | "DROP";
                "radv"?: boolean
            }
        },
        "PUT": {
            parameters: {
                $path: { "node": string; "vmid": number },
                $body: {
                    "delete"?: string;
                    "dhcp"?: boolean;
                    "digest"?: string;
                    "enable"?: boolean;
                    "ipfilter"?: boolean;
                    "log_level_in"?: "emerg" | "alert" | "crit" | "err" | "warning" | "notice" | "info" | "debug" | "nolog";
                    "log_level_out"?: "emerg" | "alert" | "crit" | "err" | "warning" | "notice" | "info" | "debug" | "nolog";
                    "macfilter"?: boolean;
                    "ndp"?: boolean;
                    "policy_in"?: "ACCEPT" | "REJECT" | "DROP";
                    "policy_out"?: "ACCEPT" | "REJECT" | "DROP";
                    "radv"?: boolean
                },
            }
            return: unknown
        }
    },
    "/nodes/{node}/qemu/{vmid}/firewall/refs": {
        "GET": {
            parameters: {
                $path: { "node": string; "vmid": number },
                $query?: { "type"?: "alias" | "ipset" },
            }
            return: { "comment"?: string; "name": string; "ref": string; "scope": string; "type": "alias" | "ipset" }[]
        }
    },
    "/nodes/{node}/qemu/{vmid}/firewall/rules": {
        "GET": {
            parameters: {
                $path: { "node": string; "vmid": number },
            }
            return: {
                "action": string;
                "comment"?: string;
                "dest"?: string;
                "dport"?: string;
                "enable"?: number;
                "icmp-type"?: string;
                "iface"?: string;
                "ipversion"?: number;
                "log"?: "emerg" | "alert" | "crit" | "err" | "warning" | "notice" | "info" | "debug" | "nolog";
                "macro"?: string;
                "pos": number;
                "proto"?: string;
                "source"?: string;
                "sport"?: string;
                "type": string
            }[]
        },
        "POST": {
            parameters: {
                $path: { "node": string; "vmid": number },
                $body: {
                    "action": string;
                    "comment"?: string;
                    "dest"?: string;
                    "digest"?: string;
                    "dport"?: string;
                    "enable"?: number;
                    "icmp-type"?: string;
                    "iface"?: string;
                    "log"?: "emerg" | "alert" | "crit" | "err" | "warning" | "notice" | "info" | "debug" | "nolog";
                    "macro"?: string;
                    "pos"?: number;
                    "proto"?: string;
                    "source"?: string;
                    "sport"?: string;
                    "type": "in" | "out" | "forward" | "group"
                },
            }
            return: unknown
        }
    },
    "/nodes/{node}/qemu/{vmid}/firewall/rules/{pos}": {
        "DELETE": {
            parameters: {
                $path: { "node": string; "vmid": number; "pos": number },
                $query?: { "digest"?: string },
            }
            return: unknown
        },
        "GET": {
            parameters: {
                $path: { "node": string; "vmid": number; "pos": number },
            }
            return: {
                "action": string;
                "comment"?: string;
                "dest"?: string;
                "dport"?: string;
                "enable"?: number;
                "icmp-type"?: string;
                "iface"?: string;
                "ipversion"?: number;
                "log"?: "emerg" | "alert" | "crit" | "err" | "warning" | "notice" | "info" | "debug" | "nolog";
                "macro"?: string;
                "pos": number;
                "proto"?: string;
                "source"?: string;
                "sport"?: string;
                "type": string
            }
        },
        "PUT": {
            parameters: {
                $path: { "node": string; "vmid": number; "pos": number },
                $body: {
                    "action"?: string;
                    "comment"?: string;
                    "delete"?: string;
                    "dest"?: string;
                    "digest"?: string;
                    "dport"?: string;
                    "enable"?: number;
                    "icmp-type"?: string;
                    "iface"?: string;
                    "log"?: "emerg" | "alert" | "crit" | "err" | "warning" | "notice" | "info" | "debug" | "nolog";
                    "macro"?: string;
                    "moveto"?: number;
                    "proto"?: string;
                    "source"?: string;
                    "sport"?: string;
                    "type"?: "in" | "out" | "forward" | "group"
                },
            }
            return: unknown
        }
    },
    "/nodes/{node}/qemu/{vmid}/migrate": {
        "GET": {
            parameters: {
                $path: { "node": string; "vmid": number },
                $query?: { "target"?: string },
            }
            return: {
                "allowed_nodes"?: string[];
                "dependent-ha-resources"?: string[];
                "has-dbus-vmstate": boolean;
                "local_disks": { "cdrom": boolean; "is_unused": boolean; "size": number; "volid": string }[];
                "local_resources": string[];
                "mapped-resource-info": Record<string, unknown>;
                "mapped-resources": string[];
                "not_allowed_nodes"?: {
                    "blocking-ha-resources"?: { "cause": "resource-affinity"; "sid": string }[];
                    "unavailable_storages"?: string[]
                };
                "running": boolean
            }
        },
        "POST": {
            parameters: {
                $path: { "node": string; "vmid": number },
                $body: {
                    "bwlimit"?: number;
                    "force"?: boolean;
                    "migration_network"?: string;
                    "migration_type"?: "secure" | "insecure";
                    "online"?: boolean;
                    "target": string;
                    "targetstorage"?: string;
                    "with-conntrack-state"?: boolean;
                    "with-local-disks"?: boolean
                },
            }
            return: string
        }
    },
    "/nodes/{node}/qemu/{vmid}/monitor": {
        "POST": {
            parameters: {
                $path: { "node": string; "vmid": number },
                $body: { "command": string },
            }
            return: string
        }
    },
    "/nodes/{node}/qemu/{vmid}/move_disk": {
        "POST": {
            parameters: {
                $path: { "node": string; "vmid": number },
                $body: {
                    "bwlimit"?: number;
                    "delete"?: boolean;
                    "digest"?: string;
                    "disk": "ide0" | "ide1" | "ide2" | "ide3" | "scsi0" | "scsi1" | "scsi2" | "scsi3" | "scsi4" | "scsi5" | "scsi6" | "scsi7" | "scsi8" | "scsi9" | "scsi10" | "scsi11" | "scsi12" | "scsi13" | "scsi14" | "scsi15" | "scsi16" | "scsi17" | "scsi18" | "scsi19" | "scsi20" | "scsi21" | "scsi22" | "scsi23" | "scsi24" | "scsi25" | "scsi26" | "scsi27" | "scsi28" | "scsi29" | "scsi30" | "virtio0" | "virtio1" | "virtio2" | "virtio3" | "virtio4" | "virtio5" | "virtio6" | "virtio7" | "virtio8" | "virtio9" | "virtio10" | "virtio11" | "virtio12" | "virtio13" | "virtio14" | "virtio15" | "sata0" | "sata1" | "sata2" | "sata3" | "sata4" | "sata5" | "efidisk0" | "tpmstate0" | "unused0" | "unused1" | "unused2" | "unused3" | "unused4" | "unused5" | "unused6" | "unused7" | "unused8" | "unused9" | "unused10" | "unused11" | "unused12" | "unused13" | "unused14" | "unused15" | "unused16" | "unused17" | "unused18" | "unused19" | "unused20" | "unused21" | "unused22" | "unused23" | "unused24" | "unused25" | "unused26" | "unused27" | "unused28" | "unused29" | "unused30" | "unused31" | "unused32" | "unused33" | "unused34" | "unused35" | "unused36" | "unused37" | "unused38" | "unused39" | "unused40" | "unused41" | "unused42" | "unused43" | "unused44" | "unused45" | "unused46" | "unused47" | "unused48" | "unused49" | "unused50" | "unused51" | "unused52" | "unused53" | "unused54" | "unused55" | "unused56" | "unused57" | "unused58" | "unused59" | "unused60" | "unused61" | "unused62" | "unused63" | "unused64" | "unused65" | "unused66" | "unused67" | "unused68" | "unused69" | "unused70" | "unused71" | "unused72" | "unused73" | "unused74" | "unused75" | "unused76" | "unused77" | "unused78" | "unused79" | "unused80" | "unused81" | "unused82" | "unused83" | "unused84" | "unused85" | "unused86" | "unused87" | "unused88" | "unused89" | "unused90" | "unused91" | "unused92" | "unused93" | "unused94" | "unused95" | "unused96" | "unused97" | "unused98" | "unused99" | "unused100" | "unused101" | "unused102" | "unused103" | "unused104" | "unused105" | "unused106" | "unused107" | "unused108" | "unused109" | "unused110" | "unused111" | "unused112" | "unused113" | "unused114" | "unused115" | "unused116" | "unused117" | "unused118" | "unused119" | "unused120" | "unused121" | "unused122" | "unused123" | "unused124" | "unused125" | "unused126" | "unused127" | "unused128" | "unused129" | "unused130" | "unused131" | "unused132" | "unused133" | "unused134" | "unused135" | "unused136" | "unused137" | "unused138" | "unused139" | "unused140" | "unused141" | "unused142" | "unused143" | "unused144" | "unused145" | "unused146" | "unused147" | "unused148" | "unused149" | "unused150" | "unused151" | "unused152" | "unused153" | "unused154" | "unused155" | "unused156" | "unused157" | "unused158" | "unused159" | "unused160" | "unused161" | "unused162" | "unused163" | "unused164" | "unused165" | "unused166" | "unused167" | "unused168" | "unused169" | "unused170" | "unused171" | "unused172" | "unused173" | "unused174" | "unused175" | "unused176" | "unused177" | "unused178" | "unused179" | "unused180" | "unused181" | "unused182" | "unused183" | "unused184" | "unused185" | "unused186" | "unused187" | "unused188" | "unused189" | "unused190" | "unused191" | "unused192" | "unused193" | "unused194" | "unused195" | "unused196" | "unused197" | "unused198" | "unused199" | "unused200" | "unused201" | "unused202" | "unused203" | "unused204" | "unused205" | "unused206" | "unused207" | "unused208" | "unused209" | "unused210" | "unused211" | "unused212" | "unused213" | "unused214" | "unused215" | "unused216" | "unused217" | "unused218" | "unused219" | "unused220" | "unused221" | "unused222" | "unused223" | "unused224" | "unused225" | "unused226" | "unused227" | "unused228" | "unused229" | "unused230" | "unused231" | "unused232" | "unused233" | "unused234" | "unused235" | "unused236" | "unused237" | "unused238" | "unused239" | "unused240" | "unused241" | "unused242" | "unused243" | "unused244" | "unused245" | "unused246" | "unused247" | "unused248" | "unused249" | "unused250" | "unused251" | "unused252" | "unused253" | "unused254" | "unused255";
                    "format"?: "raw" | "qcow2" | "vmdk";
                    "storage"?: string;
                    "target-digest"?: string;
                    "target-disk"?: "ide0" | "ide1" | "ide2" | "ide3" | "scsi0" | "scsi1" | "scsi2" | "scsi3" | "scsi4" | "scsi5" | "scsi6" | "scsi7" | "scsi8" | "scsi9" | "scsi10" | "scsi11" | "scsi12" | "scsi13" | "scsi14" | "scsi15" | "scsi16" | "scsi17" | "scsi18" | "scsi19" | "scsi20" | "scsi21" | "scsi22" | "scsi23" | "scsi24" | "scsi25" | "scsi26" | "scsi27" | "scsi28" | "scsi29" | "scsi30" | "virtio0" | "virtio1" | "virtio2" | "virtio3" | "virtio4" | "virtio5" | "virtio6" | "virtio7" | "virtio8" | "virtio9" | "virtio10" | "virtio11" | "virtio12" | "virtio13" | "virtio14" | "virtio15" | "sata0" | "sata1" | "sata2" | "sata3" | "sata4" | "sata5" | "efidisk0" | "tpmstate0" | "unused0" | "unused1" | "unused2" | "unused3" | "unused4" | "unused5" | "unused6" | "unused7" | "unused8" | "unused9" | "unused10" | "unused11" | "unused12" | "unused13" | "unused14" | "unused15" | "unused16" | "unused17" | "unused18" | "unused19" | "unused20" | "unused21" | "unused22" | "unused23" | "unused24" | "unused25" | "unused26" | "unused27" | "unused28" | "unused29" | "unused30" | "unused31" | "unused32" | "unused33" | "unused34" | "unused35" | "unused36" | "unused37" | "unused38" | "unused39" | "unused40" | "unused41" | "unused42" | "unused43" | "unused44" | "unused45" | "unused46" | "unused47" | "unused48" | "unused49" | "unused50" | "unused51" | "unused52" | "unused53" | "unused54" | "unused55" | "unused56" | "unused57" | "unused58" | "unused59" | "unused60" | "unused61" | "unused62" | "unused63" | "unused64" | "unused65" | "unused66" | "unused67" | "unused68" | "unused69" | "unused70" | "unused71" | "unused72" | "unused73" | "unused74" | "unused75" | "unused76" | "unused77" | "unused78" | "unused79" | "unused80" | "unused81" | "unused82" | "unused83" | "unused84" | "unused85" | "unused86" | "unused87" | "unused88" | "unused89" | "unused90" | "unused91" | "unused92" | "unused93" | "unused94" | "unused95" | "unused96" | "unused97" | "unused98" | "unused99" | "unused100" | "unused101" | "unused102" | "unused103" | "unused104" | "unused105" | "unused106" | "unused107" | "unused108" | "unused109" | "unused110" | "unused111" | "unused112" | "unused113" | "unused114" | "unused115" | "unused116" | "unused117" | "unused118" | "unused119" | "unused120" | "unused121" | "unused122" | "unused123" | "unused124" | "unused125" | "unused126" | "unused127" | "unused128" | "unused129" | "unused130" | "unused131" | "unused132" | "unused133" | "unused134" | "unused135" | "unused136" | "unused137" | "unused138" | "unused139" | "unused140" | "unused141" | "unused142" | "unused143" | "unused144" | "unused145" | "unused146" | "unused147" | "unused148" | "unused149" | "unused150" | "unused151" | "unused152" | "unused153" | "unused154" | "unused155" | "unused156" | "unused157" | "unused158" | "unused159" | "unused160" | "unused161" | "unused162" | "unused163" | "unused164" | "unused165" | "unused166" | "unused167" | "unused168" | "unused169" | "unused170" | "unused171" | "unused172" | "unused173" | "unused174" | "unused175" | "unused176" | "unused177" | "unused178" | "unused179" | "unused180" | "unused181" | "unused182" | "unused183" | "unused184" | "unused185" | "unused186" | "unused187" | "unused188" | "unused189" | "unused190" | "unused191" | "unused192" | "unused193" | "unused194" | "unused195" | "unused196" | "unused197" | "unused198" | "unused199" | "unused200" | "unused201" | "unused202" | "unused203" | "unused204" | "unused205" | "unused206" | "unused207" | "unused208" | "unused209" | "unused210" | "unused211" | "unused212" | "unused213" | "unused214" | "unused215" | "unused216" | "unused217" | "unused218" | "unused219" | "unused220" | "unused221" | "unused222" | "unused223" | "unused224" | "unused225" | "unused226" | "unused227" | "unused228" | "unused229" | "unused230" | "unused231" | "unused232" | "unused233" | "unused234" | "unused235" | "unused236" | "unused237" | "unused238" | "unused239" | "unused240" | "unused241" | "unused242" | "unused243" | "unused244" | "unused245" | "unused246" | "unused247" | "unused248" | "unused249" | "unused250" | "unused251" | "unused252" | "unused253" | "unused254" | "unused255";
                    "target-vmid"?: number
                },
            }
            return: string
        }
    },
    "/nodes/{node}/qemu/{vmid}/mtunnel": {
        "POST": {
            parameters: {
                $path: { "node": string; "vmid": number },
                $body: { "bridges"?: string; "storages"?: string },
            }
            return: { "socket": string; "ticket": string; "upid": string }
        }
    },
    "/nodes/{node}/qemu/{vmid}/mtunnelwebsocket": {
        "GET": {
            parameters: {
                $path: { "node": string; "vmid": number },
                $query?: { "socket": string; "ticket": string },
            }
            return: { "port"?: string; "socket"?: string }
        }
    },
    "/nodes/{node}/qemu/{vmid}/pending": {
        "GET": {
            parameters: {
                $path: { "node": string; "vmid": number },
            }
            return: { "delete"?: number; "key": string; "pending"?: string; "value"?: string }[]
        }
    },
    "/nodes/{node}/qemu/{vmid}/remote_migrate": {
        "POST": {
            parameters: {
                $path: { "node": string; "vmid": number },
                $body: {
                    "bwlimit"?: number;
                    "delete"?: boolean;
                    "online"?: boolean;
                    "target-bridge": string;
                    "target-endpoint": string;
                    "target-storage": string;
                    "target-vmid"?: number
                },
            }
            return: string
        }
    },
    "/nodes/{node}/qemu/{vmid}/resize": {
        "PUT": {
            parameters: {
                $path: { "node": string; "vmid": number },
                $body: {
                    "digest"?: string;
                    "disk": "ide0" | "ide1" | "ide2" | "ide3" | "scsi0" | "scsi1" | "scsi2" | "scsi3" | "scsi4" | "scsi5" | "scsi6" | "scsi7" | "scsi8" | "scsi9" | "scsi10" | "scsi11" | "scsi12" | "scsi13" | "scsi14" | "scsi15" | "scsi16" | "scsi17" | "scsi18" | "scsi19" | "scsi20" | "scsi21" | "scsi22" | "scsi23" | "scsi24" | "scsi25" | "scsi26" | "scsi27" | "scsi28" | "scsi29" | "scsi30" | "virtio0" | "virtio1" | "virtio2" | "virtio3" | "virtio4" | "virtio5" | "virtio6" | "virtio7" | "virtio8" | "virtio9" | "virtio10" | "virtio11" | "virtio12" | "virtio13" | "virtio14" | "virtio15" | "sata0" | "sata1" | "sata2" | "sata3" | "sata4" | "sata5" | "efidisk0" | "tpmstate0";
                    "size": string;
                    "skiplock"?: boolean
                },
            }
            return: string
        }
    },
    "/nodes/{node}/qemu/{vmid}/rrd": {
        "GET": {
            parameters: {
                $path: { "node": string; "vmid": number },
                $query?: {
                    "cf"?: "AVERAGE" | "MAX";
                    "ds": string;
                    "timeframe": "hour" | "day" | "week" | "month" | "year"
                },
            }
            return: { "filename": string }
        }
    },
    "/nodes/{node}/qemu/{vmid}/rrddata": {
        "GET": {
            parameters: {
                $path: { "node": string; "vmid": number },
                $query?: { "cf"?: "AVERAGE" | "MAX"; "timeframe": "hour" | "day" | "week" | "month" | "year" },
            }
            return: Record<string, unknown>[]
        }
    },
    "/nodes/{node}/qemu/{vmid}/sendkey": {
        "PUT": {
            parameters: {
                $path: { "node": string; "vmid": number },
                $body: { "key": string; "skiplock"?: boolean },
            }
            return: unknown
        }
    },
    "/nodes/{node}/qemu/{vmid}/snapshot": {
        "GET": {
            parameters: {
                $path: { "node": string; "vmid": number },
            }
            return: {
                "description": string;
                "name": string;
                "parent"?: string;
                "snaptime"?: number;
                "vmstate"?: boolean
            }[]
        },
        "POST": {
            parameters: {
                $path: { "node": string; "vmid": number },
                $body: { "description"?: string; "snapname": string; "vmstate"?: boolean },
            }
            return: string
        }
    },
    "/nodes/{node}/qemu/{vmid}/snapshot/{snapname}": {
        "DELETE": {
            parameters: {
                $path: { "node": string; "vmid": number; "snapname": string },
                $query?: { "force"?: boolean },
            }
            return: string
        },
        "GET": {
            parameters: {
                $path: { "node": string; "vmid": number; "snapname": string },
            }
            return: Record<string, unknown>[]
        }
    },
    "/nodes/{node}/qemu/{vmid}/snapshot/{snapname}/config": {
        "GET": {
            parameters: {
                $path: { "node": string; "vmid": number; "snapname": string },
            }
            return: Record<string, unknown>
        },
        "PUT": {
            parameters: {
                $path: { "node": string; "vmid": number; "snapname": string },
                $body: { "description"?: string },
            }
            return: unknown
        }
    },
    "/nodes/{node}/qemu/{vmid}/snapshot/{snapname}/rollback": {
        "POST": {
            parameters: {
                $path: { "node": string; "vmid": number; "snapname": string },
                $body: { "start"?: boolean },
            }
            return: string
        }
    },
    "/nodes/{node}/qemu/{vmid}/spiceproxy": {
        "POST": {
            parameters: {
                $path: { "node": string; "vmid": number },
                $body: { "proxy"?: string },
            }
            return: { "host": string; "password": string; "proxy": string; "tls-port": number; "type": string }
        }
    },
    "/nodes/{node}/qemu/{vmid}/status": {
        "GET": {
            parameters: {
                $path: { "node": string; "vmid": number },
            }
            return: { "subdir": string }[]
        }
    },
    "/nodes/{node}/qemu/{vmid}/status/current": {
        "GET": {
            parameters: {
                $path: { "node": string; "vmid": number },
            }
            return: {
                "agent"?: boolean;
                "clipboard"?: "vnc";
                "cpu"?: number;
                "cpus"?: number;
                "diskread"?: number;
                "diskwrite"?: number;
                "ha": Record<string, unknown>;
                "lock"?: string;
                "maxdisk"?: number;
                "maxmem"?: number;
                "mem"?: number;
                "memhost"?: number;
                "name"?: string;
                "netin"?: number;
                "netout"?: number;
                "pid"?: number;
                "pressurecpufull"?: number;
                "pressurecpusome"?: number;
                "pressureiofull"?: number;
                "pressureiosome"?: number;
                "pressurememoryfull"?: number;
                "pressurememorysome"?: number;
                "qmpstatus"?: string;
                "running-machine"?: string;
                "running-qemu"?: string;
                "serial"?: boolean;
                "spice"?: boolean;
                "status": "stopped" | "running";
                "tags"?: string;
                "template"?: boolean;
                "uptime"?: number;
                "vmid": number
            }
        }
    },
    "/nodes/{node}/qemu/{vmid}/status/reboot": {
        "POST": {
            parameters: {
                $path: { "node": string; "vmid": number },
                $body: { "timeout"?: number },
            }
            return: string
        }
    },
    "/nodes/{node}/qemu/{vmid}/status/reset": {
        "POST": {
            parameters: {
                $path: { "node": string; "vmid": number },
                $body: { "skiplock"?: boolean },
            }
            return: string
        }
    },
    "/nodes/{node}/qemu/{vmid}/status/resume": {
        "POST": {
            parameters: {
                $path: { "node": string; "vmid": number },
                $body: { "nocheck"?: boolean; "skiplock"?: boolean },
            }
            return: string
        }
    },
    "/nodes/{node}/qemu/{vmid}/status/shutdown": {
        "POST": {
            parameters: {
                $path: { "node": string; "vmid": number },
                $body: { "forceStop"?: boolean; "keepActive"?: boolean; "skiplock"?: boolean; "timeout"?: number },
            }
            return: string
        }
    },
    "/nodes/{node}/qemu/{vmid}/status/start": {
        "POST": {
            parameters: {
                $path: { "node": string; "vmid": number },
                $body: {
                    "force-cpu"?: string;
                    "machine"?: string;
                    "migratedfrom"?: string;
                    "migration_network"?: string;
                    "migration_type"?: "secure" | "insecure";
                    "nets-host-mtu"?: string;
                    "skiplock"?: boolean;
                    "stateuri"?: string;
                    "targetstorage"?: string;
                    "timeout"?: number;
                    "with-conntrack-state"?: boolean
                },
            }
            return: string
        }
    },
    "/nodes/{node}/qemu/{vmid}/status/stop": {
        "POST": {
            parameters: {
                $path: { "node": string; "vmid": number },
                $body: {
                    "keepActive"?: boolean;
                    "migratedfrom"?: string;
                    "overrule-shutdown"?: boolean;
                    "skiplock"?: boolean;
                    "timeout"?: number
                },
            }
            return: string
        }
    },
    "/nodes/{node}/qemu/{vmid}/status/suspend": {
        "POST": {
            parameters: {
                $path: { "node": string; "vmid": number },
                $body: { "skiplock"?: boolean; "statestorage"?: string; "todisk"?: boolean },
            }
            return: string
        }
    },
    "/nodes/{node}/qemu/{vmid}/template": {
        "POST": {
            parameters: {
                $path: { "node": string; "vmid": number },
                $body: {
                    "disk"?: "ide0" | "ide1" | "ide2" | "ide3" | "scsi0" | "scsi1" | "scsi2" | "scsi3" | "scsi4" | "scsi5" | "scsi6" | "scsi7" | "scsi8" | "scsi9" | "scsi10" | "scsi11" | "scsi12" | "scsi13" | "scsi14" | "scsi15" | "scsi16" | "scsi17" | "scsi18" | "scsi19" | "scsi20" | "scsi21" | "scsi22" | "scsi23" | "scsi24" | "scsi25" | "scsi26" | "scsi27" | "scsi28" | "scsi29" | "scsi30" | "virtio0" | "virtio1" | "virtio2" | "virtio3" | "virtio4" | "virtio5" | "virtio6" | "virtio7" | "virtio8" | "virtio9" | "virtio10" | "virtio11" | "virtio12" | "virtio13" | "virtio14" | "virtio15" | "sata0" | "sata1" | "sata2" | "sata3" | "sata4" | "sata5" | "efidisk0" | "tpmstate0"
                },
            }
            return: string
        }
    },
    "/nodes/{node}/qemu/{vmid}/termproxy": {
        "POST": {
            parameters: {
                $path: { "node": string; "vmid": number },
                $body: { "serial"?: "serial0" | "serial1" | "serial2" | "serial3" },
            }
            return: { "port": number; "ticket": string; "upid": string; "user": string }
        }
    },
    "/nodes/{node}/qemu/{vmid}/unlink": {
        "PUT": {
            parameters: {
                $path: { "node": string; "vmid": number },
                $body: { "force"?: boolean; "idlist": string },
            }
            return: unknown
        }
    },
    "/nodes/{node}/qemu/{vmid}/vncproxy": {
        "POST": {
            parameters: {
                $path: { "node": string; "vmid": number },
                $body: { "generate-password"?: boolean; "websocket"?: boolean },
            }
            return: {
                "cert": string;
                "password"?: string;
                "port": number;
                "ticket": string;
                "upid": string;
                "user": string
            }
        }
    },
    "/nodes/{node}/qemu/{vmid}/vncwebsocket": {
        "GET": {
            parameters: {
                $path: { "node": string; "vmid": number },
                $query?: { "port": number; "vncticket": string },
            }
            return: { "port": string }
        }
    },
    "/nodes/{node}/query-oci-repo-tags": {
        "GET": {
            parameters: {
                $path: { "node": string },
                $query?: { "reference": string },
            }
            return: string[]
        }
    },
    "/nodes/{node}/query-url-metadata": {
        "GET": {
            parameters: {
                $path: { "node": string },
                $query?: { "url": string; "verify-certificates"?: boolean },
            }
            return: { "filename"?: string; "mimetype"?: string; "size"?: number }
        }
    },
    "/nodes/{node}/replication": {
        "GET": {
            parameters: {
                $path: { "node": string },
                $query?: { "guest"?: number },
            }
            return: { "id": string }[]
        }
    },
    "/nodes/{node}/replication/{id}": {
        "GET": {
            parameters: {
                $path: { "node": string; "id": string },
            }
            return: Record<string, unknown>[]
        }
    },
    "/nodes/{node}/replication/{id}/log": {
        "GET": {
            parameters: {
                $path: { "node": string; "id": string },
                $query?: { "limit"?: number; "start"?: number },
            }
            return: { "n": number; "t": string }[]
        }
    },
    "/nodes/{node}/replication/{id}/schedule_now": {
        "POST": {
            parameters: {
                $path: { "node": string; "id": string },
            }
            return: string
        }
    },
    "/nodes/{node}/replication/{id}/status": {
        "GET": {
            parameters: {
                $path: { "node": string; "id": string },
            }
            return: Record<string, unknown>
        }
    },
    "/nodes/{node}/report": {
        "GET": {
            parameters: {
                $path: { "node": string },
            }
            return: string
        }
    },
    "/nodes/{node}/rrd": {
        "GET": {
            parameters: {
                $path: { "node": string },
                $query?: {
                    "cf"?: "AVERAGE" | "MAX";
                    "ds": string;
                    "timeframe": "hour" | "day" | "week" | "month" | "year" | "decade"
                },
            }
            return: { "filename": string }
        }
    },
    "/nodes/{node}/rrddata": {
        "GET": {
            parameters: {
                $path: { "node": string },
                $query?: {
                    "cf"?: "AVERAGE" | "MAX";
                    "timeframe": "hour" | "day" | "week" | "month" | "year" | "decade"
                },
            }
            return: Record<string, unknown>[]
        }
    },
    "/nodes/{node}/scan": {
        "GET": {
            parameters: {
                $path: { "node": string },
            }
            return: { "method": string }[]
        }
    },
    "/nodes/{node}/scan/cifs": {
        "GET": {
            parameters: {
                $path: { "node": string },
                $query?: { "domain"?: string; "password"?: string; "server": string; "username"?: string },
            }
            return: { "description": string; "share": string }[]
        }
    },
    "/nodes/{node}/scan/iscsi": {
        "GET": {
            parameters: {
                $path: { "node": string },
                $query?: { "portal": string },
            }
            return: { "portal": string; "target": string }[]
        }
    },
    "/nodes/{node}/scan/lvm": {
        "GET": {
            parameters: {
                $path: { "node": string },
            }
            return: { "vg": string }[]
        }
    },
    "/nodes/{node}/scan/lvmthin": {
        "GET": {
            parameters: {
                $path: { "node": string },
                $query?: { "vg": string },
            }
            return: { "lv": string }[]
        }
    },
    "/nodes/{node}/scan/nfs": {
        "GET": {
            parameters: {
                $path: { "node": string },
                $query?: { "server": string },
            }
            return: { "options": string; "path": string }[]
        }
    },
    "/nodes/{node}/scan/pbs": {
        "GET": {
            parameters: {
                $path: { "node": string },
                $query?: {
                    "fingerprint"?: string;
                    "password": string;
                    "port"?: number;
                    "server": string;
                    "username": string
                },
            }
            return: { "comment"?: string; "store": string }[]
        }
    },
    "/nodes/{node}/scan/zfs": {
        "GET": {
            parameters: {
                $path: { "node": string },
            }
            return: { "pool": string }[]
        }
    },
    "/nodes/{node}/sdn": {
        "GET": {
            parameters: {
                $path: { "node": string },
            }
            return: Record<string, unknown>[]
        }
    },
    "/nodes/{node}/sdn/fabrics/{fabric}": {
        "GET": {
            parameters: {
                $path: { "node": string; "fabric": string },
            }
            return: { "subdir": string }[]
        }
    },
    "/nodes/{node}/sdn/fabrics/{fabric}/interfaces": {
        "GET": {
            parameters: {
                $path: { "node": string; "fabric": string },
            }
            return: { "name": string; "state": string; "type": string }[]
        }
    },
    "/nodes/{node}/sdn/fabrics/{fabric}/neighbors": {
        "GET": {
            parameters: {
                $path: { "node": string; "fabric": string },
            }
            return: { "neighbor": string; "status": string; "uptime": string }[]
        }
    },
    "/nodes/{node}/sdn/fabrics/{fabric}/routes": {
        "GET": {
            parameters: {
                $path: { "node": string; "fabric": string },
            }
            return: { "route": string; "via": string[] }[]
        }
    },
    "/nodes/{node}/sdn/vnets/{vnet}": {
        "GET": {
            parameters: {
                $path: { "node": string; "vnet": string },
            }
            return: { "subdir": string }[]
        }
    },
    "/nodes/{node}/sdn/vnets/{vnet}/mac-vrf": {
        "GET": {
            parameters: {
                $path: { "node": string; "vnet": string },
            }
            return: { "ip": string; "mac": string; "nexthop": string }[]
        }
    },
    "/nodes/{node}/sdn/zones": {
        "GET": {
            parameters: {
                $path: { "node": string },
            }
            return: { "status": "available" | "pending" | "error"; "zone": string }[]
        }
    },
    "/nodes/{node}/sdn/zones/{zone}": {
        "GET": {
            parameters: {
                $path: { "node": string; "zone": string },
            }
            return: { "subdir": string }[]
        }
    },
    "/nodes/{node}/sdn/zones/{zone}/bridges": {
        "GET": {
            parameters: {
                $path: { "node": string; "zone": string },
            }
            return: {
                "name": string;
                "ports": {
                    "index"?: string;
                    "name": string;
                    "primary_vlan"?: number;
                    "vlans"?: string[];
                    "vmid"?: number
                }[];
                "vlan_filtering": string
            }[]
        }
    },
    "/nodes/{node}/sdn/zones/{zone}/content": {
        "GET": {
            parameters: {
                $path: { "node": string; "zone": string },
            }
            return: { "status"?: string; "statusmsg"?: string; "vnet": string }[]
        }
    },
    "/nodes/{node}/sdn/zones/{zone}/ip-vrf": {
        "GET": {
            parameters: {
                $path: { "node": string; "zone": string },
            }
            return: { "ip": string; "metric": number; "nexthops": string[]; "protocol": string }[]
        }
    },
    "/nodes/{node}/services": {
        "GET": {
            parameters: {
                $path: { "node": string },
            }
            return: {
                "active-state": "active" | "inactive" | "failed" | "activating" | "deactivating" | "maintenance" | "reloading" | "refreshing" | "unknown";
                "desc": string;
                "name": string;
                "service": string;
                "state": "dead" | "condition" | "start-pre" | "start" | "start-post" | "running" | "exited" | "reload" | "reload-signal" | "reload-notify" | "mounting" | "stop" | "stop-watchdog" | "stop-sigterm" | "stop-sigkill" | "stop-post" | "final-watchdog" | "final-sigterm" | "final-sigkill" | "failed" | "dead-before-auto-restart" | "failed-before-auto-restart" | "dead-resources-pinned" | "auto-restart" | "auto-restart-queued" | "cleaning" | "unknown";
                "unit-state": "enabled" | "enabled-runtime" | "linked" | "linked-runtime" | "alias" | "masked" | "masked-runtime" | "static" | "disabled" | "indirect" | "generated" | "transient" | "bad" | "not-found" | "unknown"
            }[]
        }
    },
    "/nodes/{node}/services/{service}": {
        "GET": {
            parameters: {
                $path: {
                    "node": string;
                    "service": Service
                },
            }
            return: { "subdir": string }[]
        }
    },
    "/nodes/{node}/services/{service}/reload": {
        "POST": {
            parameters: {
                $path: {
                    "node": string;
                    "service": Service
                },
            }
            return: string
        }
    },
    "/nodes/{node}/services/{service}/restart": {
        "POST": {
            parameters: {
                $path: {
                    "node": string;
                    "service": Service
                },
            }
            return: string
        }
    },
    "/nodes/{node}/services/{service}/start": {
        "POST": {
            parameters: {
                $path: {
                    "node": string;
                    "service": Service
                },
            }
            return: string
        }
    },
    "/nodes/{node}/services/{service}/state": {
        "GET": {
            parameters: {
                $path: {
                    "node": string;
                    "service": Service
                },
            }
            return: {
                "active-state": "active" | "inactive" | "failed" | "activating" | "deactivating" | "maintenance" | "reloading" | "refreshing" | "unknown";
                "desc": string;
                "name": string;
                "service": string;
                "state": "dead" | "condition" | "start-pre" | "start" | "start-post" | "running" | "exited" | "reload" | "reload-signal" | "reload-notify" | "mounting" | "stop" | "stop-watchdog" | "stop-sigterm" | "stop-sigkill" | "stop-post" | "final-watchdog" | "final-sigterm" | "final-sigkill" | "failed" | "dead-before-auto-restart" | "failed-before-auto-restart" | "dead-resources-pinned" | "auto-restart" | "auto-restart-queued" | "cleaning" | "unknown";
                "unit-state": "enabled" | "enabled-runtime" | "linked" | "linked-runtime" | "alias" | "masked" | "masked-runtime" | "static" | "disabled" | "indirect" | "generated" | "transient" | "bad" | "not-found" | "unknown"
            }
        }
    },
    "/nodes/{node}/services/{service}/stop": {
        "POST": {
            parameters: {
                $path: {
                    "node": string;
                    "service": Service
                },
            }
            return: string
        }
    },
    "/nodes/{node}/spiceshell": {
        "POST": {
            parameters: {
                $path: { "node": string },
                $body: { "cmd"?: "ceph_install" | "login" | "upgrade"; "cmd-opts"?: string; "proxy"?: string },
            }
            return: { "host": string; "password": string; "proxy": string; "tls-port": number; "type": string }
        }
    },
    "/nodes/{node}/startall": {
        "POST": {
            parameters: {
                $path: { "node": string },
                $body: { "force"?: boolean; "vms"?: string },
            }
            return: string
        }
    },
    "/nodes/{node}/status": {
        "GET": {
            parameters: {
                $path: { "node": string },
            }
            return: {
                "boot-info": { "mode": "efi" | "legacy-bios"; "secureboot"?: boolean };
                "cpu": number;
                "cpuinfo": { "cores": number; "cpus": number; "model": string; "sockets": number };
                "current-kernel": { "machine": string; "release": string; "sysname": string; "version": string };
                "loadavg": string[];
                "memory": { "available": number; "free": number; "total": number; "used": number };
                "pveversion": string;
                "rootfs": { "avail": number; "free": number; "total": number; "used": number }
            }
        },
        "POST": {
            parameters: {
                $path: { "node": string },
                $body: { "command": "reboot" | "shutdown" },
            }
            return: unknown
        }
    },
    "/nodes/{node}/stopall": {
        "POST": {
            parameters: {
                $path: { "node": string },
                $body: { "force-stop"?: boolean; "timeout"?: number; "vms"?: string },
            }
            return: string
        }
    },
    "/nodes/{node}/storage": {
        "GET": {
            parameters: {
                $path: { "node": string },
                $query?: {
                    "content"?: string;
                    "enabled"?: boolean;
                    "format"?: boolean;
                    "storage"?: string;
                    "target"?: string
                },
            }
            return: {
                "active"?: boolean;
                "avail"?: number;
                "content": string;
                "enabled"?: boolean;
                "formats"?: {
                    "default": "qcow2" | "raw" | "subvol" | "vmdk";
                    "supported": "qcow2" | "raw" | "subvol" | "vmdk"[]
                };
                "select_existing"?: boolean;
                "shared"?: boolean;
                "storage": string;
                "total"?: number;
                "type": string;
                "used"?: number;
                "used_fraction"?: number
            }[]
        }
    },
    "/nodes/{node}/storage/{storage}": {
        "GET": {
            parameters: {
                $path: { "node": string; "storage": string },
            }
            return: { "subdir": string }[]
        }
    },
    "/nodes/{node}/storage/{storage}/content": {
        "GET": {
            parameters: {
                $path: { "node": string; "storage": string },
                $query?: { "content"?: string; "vmid"?: number },
            }
            return: {
                "ctime"?: number;
                "encrypted"?: string;
                "format": string;
                "notes"?: string;
                "parent"?: string;
                "protected"?: boolean;
                "size": number;
                "used"?: number;
                "verification"?: { "state": string; "upid": string };
                "vmid"?: number;
                "volid": string
            }[]
        },
        "POST": {
            parameters: {
                $path: { "node": string; "storage": string },
                $body: {
                    "filename": string;
                    "format"?: "raw" | "qcow2" | "subvol" | "vmdk";
                    "size": string;
                    "vmid": number
                },
            }
            return: string
        }
    },
    "/nodes/{node}/storage/{storage}/content/{volume}": {
        "DELETE": {
            parameters: {
                $path: { "node": string; "storage": string; "volume": string },
                $query?: { "delay"?: number },
            }
            return: string
        },
        "GET": {
            parameters: {
                $path: { "node": string; "storage": string; "volume": string },
            }
            return: {
                "format": string;
                "notes"?: string;
                "path": string;
                "protected"?: boolean;
                "size": number;
                "used": number
            }
        },
        "POST": {
            parameters: {
                $path: { "node": string; "storage": string; "volume": string },
                $body: { "target": string; "target_node"?: string },
            }
            return: string
        },
        "PUT": {
            parameters: {
                $path: { "node": string; "storage": string; "volume": string },
                $body: { "notes"?: string; "protected"?: boolean },
            }
            return: unknown
        }
    },
    "/nodes/{node}/storage/{storage}/download-url": {
        "POST": {
            parameters: {
                $path: { "node": string; "storage": string },
                $body: {
                    "checksum"?: string;
                    "checksum-algorithm"?: "md5" | "sha1" | "sha224" | "sha256" | "sha384" | "sha512";
                    "compression"?: string;
                    "content": "iso" | "vztmpl" | "import";
                    "filename": string;
                    "url": string;
                    "verify-certificates"?: boolean
                },
            }
            return: string
        }
    },
    "/nodes/{node}/storage/{storage}/file-restore/download": {
        "GET": {
            parameters: {
                $path: { "node": string; "storage": string },
                $query?: { "filepath": string; "tar"?: boolean; "volume": string },
            }
            return: unknown
        }
    },
    "/nodes/{node}/storage/{storage}/file-restore/list": {
        "GET": {
            parameters: {
                $path: { "node": string; "storage": string },
                $query?: { "filepath": string; "volume": string },
            }
            return: {
                "filepath": string;
                "leaf": boolean;
                "mtime"?: number;
                "size"?: number;
                "text": string;
                "type": string
            }[]
        }
    },
    "/nodes/{node}/storage/{storage}/import-metadata": {
        "GET": {
            parameters: {
                $path: { "node": string; "storage": string },
                $query?: { "volume": string },
            }
            return: {
                "create-args": Record<string, unknown>;
                "disks"?: Record<string, unknown>;
                "net"?: Record<string, unknown>;
                "source": "esxi";
                "type": "vm";
                "warnings"?: {
                    "key"?: string;
                    "type": "cdrom-image-ignored" | "efi-state-lost" | "guest-is-running" | "nvme-unsupported" | "ova-needs-extracting" | "ovmf-with-lsi-unsupported" | "serial-port-socket-only";
                    "value"?: string
                }[]
            }
        }
    },
    "/nodes/{node}/storage/{storage}/oci-registry-pull": {
        "POST": {
            parameters: {
                $path: { "node": string; "storage": string },
                $body: { "filename"?: string; "reference": string },
            }
            return: string
        }
    },
    "/nodes/{node}/storage/{storage}/prunebackups": {
        "DELETE": {
            parameters: {
                $path: { "node": string; "storage": string },
                $query?: { "prune-backups"?: string; "type"?: "qemu" | "lxc"; "vmid"?: number },
            }
            return: string
        },
        "GET": {
            parameters: {
                $path: { "node": string; "storage": string },
                $query?: { "prune-backups"?: string; "type"?: "qemu" | "lxc"; "vmid"?: number },
            }
            return: {
                "ctime": number;
                "mark": "keep" | "remove" | "protected" | "renamed";
                "type": string;
                "vmid"?: number;
                "volid": string
            }[]
        }
    },
    "/nodes/{node}/storage/{storage}/rrd": {
        "GET": {
            parameters: {
                $path: { "node": string; "storage": string },
                $query?: {
                    "cf"?: "AVERAGE" | "MAX";
                    "ds": string;
                    "timeframe": "hour" | "day" | "week" | "month" | "year"
                },
            }
            return: { "filename": string }
        }
    },
    "/nodes/{node}/storage/{storage}/rrddata": {
        "GET": {
            parameters: {
                $path: { "node": string; "storage": string },
                $query?: { "cf"?: "AVERAGE" | "MAX"; "timeframe": "hour" | "day" | "week" | "month" | "year" },
            }
            return: Record<string, unknown>[]
        }
    },
    "/nodes/{node}/storage/{storage}/status": {
        "GET": {
            parameters: {
                $path: { "node": string; "storage": string },
            }
            return: {
                "active"?: boolean;
                "avail"?: number;
                "content": string;
                "enabled"?: boolean;
                "shared"?: boolean;
                "total"?: number;
                "type": string;
                "used"?: number
            }
        }
    },
    "/nodes/{node}/storage/{storage}/upload": {
        "POST": {
            parameters: {
                $path: { "node": string; "storage": string },
                $body: {
                    "checksum"?: string;
                    "checksum-algorithm"?: "md5" | "sha1" | "sha224" | "sha256" | "sha384" | "sha512";
                    "content": "iso" | "vztmpl" | "import";
                    "filename": string;
                    "tmpfilename"?: string
                },
            }
            return: string
        }
    },
    "/nodes/{node}/subscription": {
        "DELETE": {
            parameters: {
                $path: { "node": string },
            }
            return: unknown
        },
        "GET": {
            parameters: {
                $path: { "node": string },
            }
            return: {
                "checktime"?: number;
                "key"?: string;
                "level"?: string;
                "message"?: string;
                "nextduedate"?: string;
                "productname"?: string;
                "regdate"?: string;
                "serverid"?: string;
                "signature"?: string;
                "sockets"?: number;
                "status": "new" | "notfound" | "active" | "invalid" | "expired" | "suspended";
                "url"?: string
            }
        },
        "POST": {
            parameters: {
                $path: { "node": string },
                $body: { "force"?: boolean },
            }
            return: unknown
        },
        "PUT": {
            parameters: {
                $path: { "node": string },
                $body: { "key": string },
            }
            return: unknown
        }
    },
    "/nodes/{node}/suspendall": {
        "POST": {
            parameters: {
                $path: { "node": string },
                $body: { "vms"?: string },
            }
            return: string
        }
    },
    "/nodes/{node}/syslog": {
        "GET": {
            parameters: {
                $path: { "node": string },
                $query?: { "limit"?: number; "service"?: string; "since"?: string; "start"?: number; "until"?: string },
            }
            return: { "n": number; "t": string }[]
        }
    },
    "/nodes/{node}/tasks": {
        "GET": {
            parameters: {
                $path: { "node": string },
                $query?: {
                    "errors"?: boolean;
                    "limit"?: number;
                    "since"?: number;
                    "source"?: "archive" | "active" | "all";
                    "start"?: number;
                    "statusfilter"?: string;
                    "typefilter"?: string;
                    "until"?: number;
                    "userfilter"?: string;
                    "vmid"?: number
                },
            }
            return: {
                "endtime"?: number;
                "id": string;
                "node": string;
                "pid": number;
                "pstart": number;
                "starttime": number;
                "status"?: string;
                "type": string;
                "upid": string;
                "user": string
            }[]
        }
    },
    "/nodes/{node}/tasks/{upid}": {
        "DELETE": {
            parameters: {
                $path: { "node": string; "upid": string },
            }
            return: unknown
        },
        "GET": {
            parameters: {
                $path: { "node": string; "upid": string },
            }
            return: Record<string, unknown>[]
        }
    },
    "/nodes/{node}/tasks/{upid}/log": {
        "GET": {
            parameters: {
                $path: { "node": string; "upid": string },
                $query?: { "download"?: boolean; "limit"?: number; "start"?: number },
            }
            return: { "n": number; "t": string }[]
        }
    },
    "/nodes/{node}/tasks/{upid}/status": {
        "GET": {
            parameters: {
                $path: { "node": string; "upid": string },
            }
            return: {
                "exitstatus"?: string;
                "id": string;
                "node": string;
                "pid": number;
                "pstart": number;
                "starttime": number;
                "status": "running" | "stopped";
                "type": string;
                "upid": string;
                "user": string
            }
        }
    },
    "/nodes/{node}/termproxy": {
        "POST": {
            parameters: {
                $path: { "node": string },
                $body: { "cmd"?: "ceph_install" | "login" | "upgrade"; "cmd-opts"?: string },
            }
            return: { "port": number; "ticket": string; "upid": string; "user": string }
        }
    },
    "/nodes/{node}/time": {
        "GET": {
            parameters: {
                $path: { "node": string },
            }
            return: { "localtime": number; "time": number; "timezone": string }
        },
        "PUT": {
            parameters: {
                $path: { "node": string },
                $body: { "timezone": string },
            }
            return: unknown
        }
    },
    "/nodes/{node}/version": {
        "GET": {
            parameters: {
                $path: { "node": string },
            }
            return: { "release": string; "repoid": string; "version": string }
        }
    },
    "/nodes/{node}/vncshell": {
        "POST": {
            parameters: {
                $path: { "node": string },
                $body: {
                    "cmd"?: "ceph_install" | "login" | "upgrade";
                    "cmd-opts"?: string;
                    "height"?: number;
                    "websocket"?: boolean;
                    "width"?: number
                },
            }
            return: { "cert": string; "port": number; "ticket": string; "upid": string; "user": string }
        }
    },
    "/nodes/{node}/vncwebsocket": {
        "GET": {
            parameters: {
                $path: { "node": string },
                $query?: { "port": number; "vncticket": string },
            }
            return: { "port": string }
        }
    },
    "/nodes/{node}/vzdump": {
        "POST": {
            parameters: {
                $path: { "node": string },
                $body: {
                    "all"?: boolean;
                    "bwlimit"?: number;
                    "compress"?: "0" | "1" | "gzip" | "lzo" | "zstd";
                    "dumpdir"?: string;
                    "exclude"?: string;
                    "exclude-path"?: string[];
                    "fleecing"?: string;
                    "ionice"?: number;
                    "job-id"?: string;
                    "lockwait"?: number;
                    "mailnotification"?: "always" | "failure";
                    "mailto"?: string;
                    "maxfiles"?: number;
                    "mode"?: "snapshot" | "suspend" | "stop";
                    "notes-template"?: string;
                    "notification-mode"?: "auto" | "legacy-sendmail" | "notification-system";
                    "pbs-change-detection-mode"?: "legacy" | "data" | "metadata";
                    "performance"?: string;
                    "pigz"?: number;
                    "pool"?: string;
                    "protected"?: boolean;
                    "prune-backups"?: string;
                    "quiet"?: boolean;
                    "remove"?: boolean;
                    "script"?: string;
                    "stdexcludes"?: boolean;
                    "stdout"?: boolean;
                    "stop"?: boolean;
                    "stopwait"?: number;
                    "storage"?: string;
                    "tmpdir"?: string;
                    "vmid"?: string;
                    "zstd"?: number
                },
            }
            return: string
        }
    },
    "/nodes/{node}/vzdump/defaults": {
        "GET": {
            parameters: {
                $path: { "node": string },
                $query?: { "storage"?: string },
            }
            return: {
                "all"?: boolean;
                "bwlimit"?: number;
                "compress"?: "0" | "1" | "gzip" | "lzo" | "zstd";
                "dumpdir"?: string;
                "exclude"?: string;
                "exclude-path"?: string[];
                "fleecing"?: string;
                "ionice"?: number;
                "lockwait"?: number;
                "mailnotification"?: "always" | "failure";
                "mailto"?: string;
                "maxfiles"?: number;
                "mode"?: "snapshot" | "suspend" | "stop";
                "node"?: string;
                "notes-template"?: string;
                "notification-mode"?: "auto" | "legacy-sendmail" | "notification-system";
                "pbs-change-detection-mode"?: "legacy" | "data" | "metadata";
                "performance"?: string;
                "pigz"?: number;
                "pool"?: string;
                "protected"?: boolean;
                "prune-backups"?: string;
                "quiet"?: boolean;
                "remove"?: boolean;
                "script"?: string;
                "stdexcludes"?: boolean;
                "stop"?: boolean;
                "stopwait"?: number;
                "storage"?: string;
                "tmpdir"?: string;
                "vmid"?: string;
                "zstd"?: number
            }
        }
    },
    "/nodes/{node}/vzdump/extractconfig": {
        "GET": {
            parameters: {
                $path: { "node": string },
                $query?: { "volume": string },
            }
            return: string
        }
    },
    "/nodes/{node}/wakeonlan": {
        "POST": {
            parameters: {
                $path: { "node": string },
            }
            return: string
        }
    },
}
                 * Parameters:
                 * - `node` (path, required, string): The cluster node name.
                 * - `notify` (body, optional, boolean): Send notification about new packages.
                 * - `quiet` (body, optional, boolean): Only produces output suitable for logging, omitting progress indicators.
                 */
                update_database: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/apt/update"]["POST"]['parameters']>>) => client.request("/nodes/{node}/apt/update", "POST", {
                    ...((args[0]) as any),
                    $path: {node}
                }),
            },
            /**
             * Get package information for important Proxmox packages.
             * @endpoint GET /nodes/{node}/apt/versions
             * @allowToken 1
             * @permissions {"check": ["perm", "/nodes/{node}", ["Sys.Audit"]]}
             *
             * Parameters:
             * - `node` (path, required, string): The cluster node name.
             */
            versions: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/apt/versions"]["GET"]['parameters']>>) => client.request("/nodes/{node}/apt/versions", "GET", {
                ...((args[0]) as any),
                $path: {node}
            }),
        },
        capabilities: {
            /**
             * Node capabilities index.
             * @endpoint GET /nodes/{node}/capabilities
             * @allowToken 1
             * @permissions {"user": "all"}
             *
             * Parameters:
             * - `node` (path, required, string): The cluster node name.
             */
            index: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/capabilities"]["GET"]['parameters']>>) => client.request("/nodes/{node}/capabilities", "GET", {
                ...((args[0]) as any),
                $path: {node}
            }),
            qemu: {
                /**
                 * QEMU capabilities index.
                 * @endpoint GET /nodes/{node}/capabilities/qemu
                 * @allowToken 1
                 * @permissions {"user": "all"}
                 *
                 * Parameters:
                 * - `node` (path, required, string): The cluster node name.
                 */
                qemu_caps_index: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/capabilities/qemu"]["GET"]['parameters']>>) => client.request("/nodes/{node}/capabilities/qemu", "GET", {
                    ...((args[0]) as any),
                    $path: {node}
                }),
                /**
                 * List all custom and default CPU models.
                 * @endpoint GET /nodes/{node}/capabilities/qemu/cpu
                 * @allowToken 1
                 * @permissions {"description": "Only returns custom models when the current user has Sys.Audit on /nodes.", "user": "all"}
                 *
                 * Parameters:
                 * - `node` (path, required, string): The cluster node name.
                 */
                cpu: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/capabilities/qemu/cpu"]["GET"]['parameters']>>) => client.request("/nodes/{node}/capabilities/qemu/cpu", "GET", {
                    ...((args[0]) as any),
                    $path: {node}
                }),

                /**
                 * List of available VM-specific CPU flags.
                 * @endpoint GET /nodes/{node}/capabilities/qemu/cpu-flags
                 * @allowToken 1
                 * @permissions {"user": "all"}
                 *
                 * Parameters:
                 * - `node` (path, required, string): The cluster node name.
                 */
                cpu_flags: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/capabilities/qemu/cpu-flags"]["GET"]['parameters']>>) => client.request("/nodes/{node}/capabilities/qemu/cpu-flags", "GET", {
                    ...((args[0]) as any),
                    $path: {node}
                }),
                /**
                 * Get available QEMU/KVM machine types.
                 * @endpoint GET /nodes/{node}/capabilities/qemu/machines
                 * @allowToken 1
                 * @permissions {"user": "all"}
                 *
                 * Parameters:
                 * - `node` (path, required, string): The cluster node name.
                 */
                machines: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/capabilities/qemu/machines"]["GET"]['parameters']>>) => client.request("/nodes/{node}/capabilities/qemu/machines", "GET", {
                    ...((args[0]) as any),
                    $path: {node}
                }),
                /**
                 * Get node-specific QEMU migration capabilities of the node. Requires the 'Sys.Audit' permission on '/nodes/<node>'.
                 * @endpoint GET /nodes/{node}/capabilities/qemu/migration
                 * @allowToken 1
                 * @permissions {"check": ["perm", "/nodes/{node}", ["Sys.Audit"]]}
                 *
                 * Parameters:
                 * - `node` (path, required, string): The cluster node name.
                 */
                migration: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/capabilities/qemu/migration"]["GET"]['parameters']>>) => client.request("/nodes/{node}/capabilities/qemu/migration", "GET", {
                    ...((args[0]) as any),
                    $path: {node}
                }),
            }
        },
        ceph: {
            /**
             * Directory index.
             * @endpoint GET /nodes/{node}/ceph
             * @allowToken 1
             * @permissions {"check": ["perm", "/", ["Sys.Audit", "Datastore.Audit"], "any", 1]}
             *
             * Parameters:
             * - `node` (path, required, string): The cluster node name.
             */
            index: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/ceph"]["GET"]['parameters']>>) => client.request("/nodes/{node}/ceph", "GET", {
                ...((args[0]) as any),
                $path: {node}
            }),
            cfg: {
                /**
                 * Directory index.
                 * @endpoint GET /nodes/{node}/ceph/cfg
                 * @allowToken 1
                 * @permissions {"user": "all"}
                 *
                 * Parameters:
                 * - `node` (path, required, string): The cluster node name.
                 */
                index: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/ceph/cfg"]["GET"]['parameters']>>) => client.request("/nodes/{node}/ceph/cfg", "GET", {
                    ...((args[0]) as any),
                    $path: {node}
                }),
                /**
                 * Get the Ceph configuration database.
                 * @endpoint GET /nodes/{node}/ceph/cfg/db
                 * @allowToken 1
                 * @permissions {"check": ["perm", "/", ["Sys.Audit", "Datastore.Audit"], "any", 1]}
                 *
                 * Parameters:
                 * - `node` (path, required, string): The cluster node name.
                 */
                db: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/ceph/cfg/db"]["GET"]['parameters']>>) => client.request("/nodes/{node}/ceph/cfg/db", "GET", {
                    ...((args[0]) as any),
                    $path: {node}
                }),
                /**
                 * Get the Ceph configuration file.
                 * @endpoint GET /nodes/{node}/ceph/cfg/raw
                 * @allowToken 1
                 * @permissions {"check": ["perm", "/", ["Sys.Audit", "Datastore.Audit"], "any", 1]}
                 *
                 * Parameters:
                 * - `node` (path, required, string): The cluster node name.
                 */
                raw: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/ceph/cfg/raw"]["GET"]['parameters']>>) => client.request("/nodes/{node}/ceph/cfg/raw", "GET", {
                    ...((args[0]) as any),
                    $path: {node}
                }),
                /**
                 * Get configured values from either the config file or config DB.
                 * @endpoint GET /nodes/{node}/ceph/cfg/value
                 * @allowToken 1
                 * @permissions {"check": ["perm", "/", ["Sys.Audit"]]}
                 *
                 * Parameters:
                 * - `config-keys` (query, required, string): List of <section>:<config key> items.
                 * - `node` (path, required, string): The cluster node name.
                 */
                value: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/ceph/cfg/value"]["GET"]['parameters']>>) => client.request("/nodes/{node}/ceph/cfg/value", "GET", {
                    ...((args[0]) as any),
                    $path: {node}
                }),

            },
            /**
             * Heuristical check if it is safe to perform an action.
             * @endpoint GET /nodes/{node}/ceph/cmd-safety
             * @allowToken 1
             * @permissions {"check": ["perm", "/", ["Sys.Audit"]]}
             *
             * Parameters:
             * - `action` (query, required, "stop" | "destroy"): Action to check
             * - `id` (query, required, string): ID of the service
             * - `node` (path, required, string): The cluster node name.
             * - `service` (query, required, "osd" | "mon" | "mds"): Service type
             */
            cmd_safety: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/ceph/cmd-safety"]["GET"]['parameters']>>) => client.request("/nodes/{node}/ceph/cmd-safety", "GET", {
                ...((args[0]) as any),
                $path: {node}
            }),
            /**
             * Get OSD crush map
             * @endpoint GET /nodes/{node}/ceph/crush
             * @allowToken 1
             * @permissions {"check": ["perm", "/", ["Sys.Audit", "Datastore.Audit"], "any", 1]}
             *
             * Parameters:
             * - `node` (path, required, string): The cluster node name.
             */
            crush: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/ceph/crush"]["GET"]['parameters']>>) => client.request("/nodes/{node}/ceph/crush", "GET", {
                ...((args[0]) as any),
                $path: {node}
            }),
            fs: {
                /**
                 * Directory index.
                 * @endpoint GET /nodes/{node}/ceph/fs
                 * @allowToken 1
                 * @permissions {"check": ["perm", "/", ["Sys.Audit", "Datastore.Audit"], "any", 1]}
                 *
                 * Parameters:
                 * - `node` (path, required, string): The cluster node name.
                 */
                index: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/ceph/fs"]["GET"]['parameters']>>) => client.request("/nodes/{node}/ceph/fs", "GET", {
                    ...((args[0]) as any),
                    $path: {node}
                }),
                name: (name: string) => ({
                    /**
                     * Create a Ceph filesystem
                     * @endpoint POST /nodes/{node}/ceph/fs/{name}
                     * @allowToken 1
                     * @permissions {"check": ["perm", "/", ["Sys.Modify"]]}
                     *
                     * Parameters:
                     * - `add-storage` (body, optional, boolean): Configure the created CephFS as storage for this cluster.
                     * - `name` (path, optional, string): The ceph filesystem name.
                     * - `node` (path, required, string): The cluster node name.
                     * - `pg_num` (body, optional, number): Number of placement groups for the backing data pool. The metadata pool will use a quarter of client.
                     */
                    createfs: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/ceph/fs/{name}"]["POST"]['parameters']>>) => client.request("/nodes/{node}/ceph/fs/{name}", "POST", {
                        ...((args[0]) as any),
                        $path: {node, name}
                    }),
                })
            },
            /**
             * Create initial ceph default configuration and setup symlinks.
             * @endpoint POST /nodes/{node}/ceph/init
             * @allowToken 1
             * @permissions {"check": ["perm", "/", ["Sys.Modify"]]}
             *
             * Parameters:
             * - `cluster-network` (body, optional, string): Declare a separate cluster network, OSDs will routeheartbeat, object replication and recovery traffic over it
             * - `disable_cephx` (body, optional, boolean): Disable cephx authentication.

             WARNING: cephx is a security feature protecting against man-in-the-middle attacks. Only consider disabling cephx if your network is private!
             * - `min_size` (body, optional, number): Minimum number of available replicas per object to allow I/O
             * - `network` (body, optional, string): Use specific network for all ceph related traffic
             * - `node` (path, required, string): The cluster node name.
             * - `pg_bits` (body, optional, number): Placement group bits, used to specify the default number of placement groups.

             Depreacted. This setting was deprecated in recent Ceph versions.
             * - `size` (body, optional, number): Targeted number of replicas per object
             */
            init: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/ceph/init"]["POST"]['parameters']>>) => client.request("/nodes/{node}/ceph/init", "POST", {
                ...((args[0]) as any),
                $path: {node}
            }),
            /**
             * Read ceph log
             * @endpoint GET /nodes/{node}/ceph/log
             * @allowToken 1
             * @permissions {"check": ["perm", "/nodes/{node}", ["Sys.Syslog"]]}
             *
             * Parameters:
             * - `limit` (query, optional, number)
             * - `node` (path, required, string): The cluster node name.
             * - `start` (query, optional, number)
             */
            log: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/ceph/log"]["GET"]['parameters']>>) => client.request("/nodes/{node}/ceph/log", "GET", {
                ...((args[0]) as any),
                $path: {node}
            }),
            mds: {
                /**
                 * MDS directory index.
                 * @endpoint GET /nodes/{node}/ceph/mds
                 * @allowToken 1
                 * @permissions {"check": ["perm", "/", ["Sys.Audit", "Datastore.Audit"], "any", 1]}
                 *
                 * Parameters:
                 * - `node` (path, required, string): The cluster node name.
                 */
                index: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/ceph/mds"]["GET"]['parameters']>>) => client.request("/nodes/{node}/ceph/mds", "GET", {
                    ...((args[0]) as any),
                    $path: {node}
                }),
                name: (name: string) => ({
                    /**
                     * Destroy Ceph Metadata Server
                     * @endpoint DELETE /nodes/{node}/ceph/mds/{name}
                     * @allowToken 1
                     * @permissions {"check": ["perm", "/", ["Sys.Modify"]]}
                     *
                     * Parameters:
                     * - `name` (path, required, string): The name (ID) of the mds
                     * - `node` (path, required, string): The cluster node name.
                     */
                    destroy: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/ceph/mds/{name}"]["DELETE"]['parameters']>>) => client.request("/nodes/{node}/ceph/mds/{name}", "DELETE", {
                        ...((args[0]) as any),
                        $path: {node, name}
                    }),
                    /**
                     * Create Ceph Metadata Server (MDS)
                     * @endpoint POST /nodes/{node}/ceph/mds/{name}
                     * @allowToken 1
                     * @permissions {"check": ["perm", "/", ["Sys.Modify"]]}
                     *
                     * Parameters:
                     * - `hotstandby` (body, optional, boolean): Determines whether a ceph-mds daemon should poll and replay the log of an active MDS. Faster switch on MDS failure, but needs more idle resources.
                     * - `name` (path, optional, string): The ID for the mds, when omitted the same as the nodename
                     * - `node` (path, required, string): The cluster node name.
                     */
                    create: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/ceph/mds/{name}"]["POST"]['parameters']>>) => client.request("/nodes/{node}/ceph/mds/{name}", "POST", {
                        ...((args[0]) as any),
                        $path: {node, name}
                    }),
                })
            },
            mgr: {
                /**
                 * MGR directory index.
                 * @endpoint GET /nodes/{node}/ceph/mgr
                 * @allowToken 1
                 * @permissions {"check": ["perm", "/", ["Sys.Audit", "Datastore.Audit"], "any", 1]}
                 *
                 * Parameters:
                 * - `node` (path, required, string): The cluster node name.
                 */
                index: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/ceph/mgr"]["GET"]['parameters']>>) => client.request("/nodes/{node}/ceph/mgr", "GET", {
                    ...((args[0]) as any),
                    $path: {node}
                }),
                id: (id: string) => ({
                    /**
                     * Destroy Ceph Manager.
                     * @endpoint DELETE /nodes/{node}/ceph/mgr/{id}
                     * @allowToken 1
                     * @permissions {"check": ["perm", "/", ["Sys.Modify"]]}
                     *
                     * Parameters:
                     * - `id` (path, required, string): The ID of the manager
                     * - `node` (path, required, string): The cluster node name.
                     */
                    destroy: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/ceph/mgr/{id}"]["DELETE"]['parameters']>>) => client.request("/nodes/{node}/ceph/mgr/{id}", "DELETE", {
                        ...((args[0]) as any),
                        $path: {node, id}
                    }),
                    /**
                     * Create Ceph Manager
                     * @endpoint POST /nodes/{node}/ceph/mgr/{id}
                     * @allowToken 1
                     * @permissions {"check": ["perm", "/", ["Sys.Modify"]]}
                     *
                     * Parameters:
                     * - `id` (path, optional, string): The ID for the manager, when omitted the same as the nodename
                     * - `node` (path, required, string): The cluster node name.
                     */
                    create: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/ceph/mgr/{id}"]["POST"]['parameters']>>) => client.request("/nodes/{node}/ceph/mgr/{id}", "POST", {
                        ...((args[0]) as any),
                        $path: {node, id}
                    }),
                })
            },
            mon: {
                /**
                 * Get Ceph monitor list.
                 * @endpoint GET /nodes/{node}/ceph/mon
                 * @allowToken 1
                 * @permissions {"check": ["perm", "/", ["Sys.Audit", "Datastore.Audit"], "any", 1]}
                 *
                 * Parameters:
                 * - `node` (path, required, string): The cluster node name.
                 */
                list: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/ceph/mon"]["GET"]['parameters']>>) => client.request("/nodes/{node}/ceph/mon", "GET", {
                    ...((args[0]) as any),
                    $path: {node}
                }),
                id: (monid: string) => ({
                    /**
                     * Destroy Ceph Monitor and Manager.
                     * @endpoint DELETE /nodes/{node}/ceph/mon/{monid}
                     * @allowToken 1
                     * @permissions {"check": ["perm", "/", ["Sys.Modify"]]}
                     *
                     * Parameters:
                     * - `monid` (path, required, string): Monitor ID
                     * - `node` (path, required, string): The cluster node name.
                     */
                    destroy: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/ceph/mon/{monid}"]["DELETE"]['parameters']>>) => client.request("/nodes/{node}/ceph/mon/{monid}", "DELETE", {
                        ...((args[0]) as any),
                        $path: {node, monid}
                    }),
                    /**
                     * Create Ceph Monitor and Manager
                     * @endpoint POST /nodes/{node}/ceph/mon/{monid}
                     * @allowToken 1
                     * @permissions {"check": ["perm", "/", ["Sys.Modify"]]}
                     *
                     * Parameters:
                     * - `mon-address` (body, optional, string): Overwrites autodetected monitor IP address(es). Must be in the public network(s) of Ceph.
                     * - `monid` (path, optional, string): The ID for the monitor, when omitted the same as the nodename
                     * - `node` (path, required, string): The cluster node name.
                     */
                    create: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/ceph/mon/{monid}"]["POST"]['parameters']>>) => client.request("/nodes/{node}/ceph/mon/{monid}", "POST", {
                        ...((args[0]) as any),
                        $path: {node, monid}
                    }),
                })
            },
            osd: {
                /**
                 * Get Ceph osd list/tree.
                 * @endpoint GET /nodes/{node}/ceph/osd
                 * @allowToken 1
                 * @permissions {"check": ["perm", "/", ["Sys.Audit", "Datastore.Audit"], "any", 1]}
                 *
                 * Parameters:
                 * - `node` (path, required, string): The cluster node name.
                 */
                index: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/ceph/osd"]["GET"]['parameters']>>) => client.request("/nodes/{node}/ceph/osd", "GET", {
                    ...((args[0]) as any),
                    $path: {node}
                }),
                /**
                 * Create OSD
                 * @endpoint POST /nodes/{node}/ceph/osd
                 * @allowToken 1
                 *
                 * Parameters:
                 * - `crush-device-class` (body, optional, string): Set the device class of the OSD in crush.
                 * - `db_dev` (body, optional, string): Block device name for block.db.
                 * - `db_dev_size` (body, optional, number): Size in GiB for block.db.
                 * - `dev` (body, required, string): Block device name.
                 * - `encrypted` (body, optional, boolean): Enables encryption of the OSD.
                 * - `node` (path, required, string): The cluster node name.
                 * - `osds-per-device` (body, optional, number): OSD services per physical device. Only useful for fast NVMe devices"
                 ." to utilize their performance better.
                 * - `wal_dev` (body, optional, string): Block device name for block.wal.
                 * - `wal_dev_size` (body, optional, number): Size in GiB for block.wal.
                 */
                create: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/ceph/osd"]["POST"]['parameters']>>) => client.request("/nodes/{node}/ceph/osd", "POST", {
                    ...((args[0]) as any),
                    $path: {node}
                }),
                id: (osdid: number) => ({
                    /**
                     * Destroy OSD
                     * @endpoint DELETE /nodes/{node}/ceph/osd/{osdid}
                     * @allowToken 1
                     *
                     * Parameters:
                     * - `cleanup` (query, optional, boolean): If set, we remove partition table entries.
                     * - `node` (path, required, string): The cluster node name.
                     * - `osdid` (path, required, number): OSD ID
                     */
                    destroy: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/ceph/osd/{osdid}"]["DELETE"]['parameters']>>) => client.request("/nodes/{node}/ceph/osd/{osdid}", "DELETE", {
                        ...((args[0]) as any),
                        $path: {node, osdid}
                    }),
                    /**
                     * OSD index.
                     * @endpoint GET /nodes/{node}/ceph/osd/{osdid}
                     * @allowToken 1
                     * @permissions {"user": "all"}
                     *
                     * Parameters:
                     * - `node` (path, required, string): The cluster node name.
                     * - `osdid` (path, required, number): OSD ID
                     */
                    get: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/ceph/osd/{osdid}"]["GET"]['parameters']>>) => client.request("/nodes/{node}/ceph/osd/{osdid}", "GET", {
                        ...((args[0]) as any),
                        $path: {node, osdid}
                    }),
                    /**
                     * ceph osd in
                     * @endpoint POST /nodes/{node}/ceph/osd/{osdid}/in
                     * @allowToken 1
                     * @permissions {"check": ["perm", "/", ["Sys.Modify"]]}
                     *
                     * Parameters:
                     * - `node` (path, required, string): The cluster node name.
                     * - `osdid` (path, required, number): OSD ID
                     */
                    in: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/ceph/osd/{osdid}/in"]["POST"]['parameters']>>) => client.request("/nodes/{node}/ceph/osd/{osdid}/in", "POST", {
                        ...((args[0]) as any),
                        $path: {node, osdid}
                    }),
                    /**
                     * Get OSD volume details
                     * @endpoint GET /nodes/{node}/ceph/osd/{osdid}/lv-info
                     * @allowToken 1
                     * @permissions {"check": ["perm", "/", ["Sys.Audit"], "any", 1]}
                     *
                     * Parameters:
                     * - `node` (path, required, string): The cluster node name.
                     * - `osdid` (path, required, number): OSD ID
                     * - `type` (query, optional, "block" | "db" | "wal"): OSD device type
                     */
                    lv_info: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/ceph/osd/{osdid}/lv-info"]["GET"]['parameters']>>) => client.request("/nodes/{node}/ceph/osd/{osdid}/lv-info", "GET", {
                        ...((args[0]) as any),
                        $path: {node, osdid}
                    }),
                    /**
                     * Get OSD details
                     * @endpoint GET /nodes/{node}/ceph/osd/{osdid}/metadata
                     * @allowToken 1
                     * @permissions {"check": ["perm", "/", ["Sys.Audit"], "any", 1]}
                     *
                     * Parameters:
                     * - `node` (path, required, string): The cluster node name.
                     * - `osdid` (path, required, number): OSD ID
                     */
                    metadata: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/ceph/osd/{osdid}/metadata"]["GET"]['parameters']>>) => client.request("/nodes/{node}/ceph/osd/{osdid}/metadata", "GET", {
                        ...((args[0]) as any),
                        $path: {node, osdid}
                    }),

                    /**
                     * ceph osd out
                     * @endpoint POST /nodes/{node}/ceph/osd/{osdid}/out
                     * @allowToken 1
                     * @permissions {"check": ["perm", "/", ["Sys.Modify"]]}
                     *
                     * Parameters:
                     * - `node` (path, required, string): The cluster node name.
                     * - `osdid` (path, required, number): OSD ID
                     */
                    out: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/ceph/osd/{osdid}/out"]["POST"]['parameters']>>) => client.request("/nodes/{node}/ceph/osd/{osdid}/out", "POST", {
                        ...((args[0]) as any),
                        $path: {node, osdid}
                    }),
                    /**
                     * Instruct the OSD to scrub.
                     * @endpoint POST /nodes/{node}/ceph/osd/{osdid}/scrub
                     * @allowToken 1
                     * @permissions {"check": ["perm", "/", ["Sys.Modify"]]}
                     *
                     * Parameters:
                     * - `deep` (body, optional, boolean): If set, instructs a deep scrub instead of a normal one.
                     * - `node` (path, required, string): The cluster node name.
                     * - `osdid` (path, required, number): OSD ID
                     */
                    scrub: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/ceph/osd/{osdid}/scrub"]["POST"]['parameters']>>) => client.request("/nodes/{node}/ceph/osd/{osdid}/scrub", "POST", {
                        ...((args[0]) as any),
                        $path: {node, osdid}
                    }),
                })
            },
            pool: {
                /**
                 * List all pools and their settings (which are settable by the POST/PUT endpoints).
                 * @endpoint GET /nodes/{node}/ceph/pool
                 * @allowToken 1
                 * @permissions {"check": ["perm", "/", ["Sys.Audit", "Datastore.Audit"], "any", 1]}
                 *
                 * Parameters:
                 * - `node` (path, required, string): The cluster node name.
                 */
                list: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/ceph/pool"]["GET"]['parameters']>>) => client.request("/nodes/{node}/ceph/pool", "GET", {
                    ...((args[0]) as any),
                    $path: {node}
                }),
                /**
                 /**
                 * Create Ceph pool
                 * @endpoint POST /nodes/{node}/ceph/pool
                 * @allowToken 1
                 * @permissions {"check": ["perm", "/", ["Sys.Modify"]]}
                 *
                 * Parameters:
                 * - `add_storages` (body, optional, boolean): Configure VM and CT storage using the new pool.
                 * - `application` (body, optional, "rbd" | "cephfs" | "rgw"): The application of the pool.
                 * - `crush_rule` (body, optional, string): The rule to use for mapping object placement in the cluster.
                 * - `erasure-coding` (body, optional, string): Create an erasure coded pool for RBD with an accompaning replicated pool for metadata storage. With EC, the common ceph options 'size', 'min_size' and 'crush_rule' parameters will be applied to the metadata pool.
                 * - `min_size` (body, optional, number): Minimum number of replicas per object
                 * - `name` (body, required, string): The name of the pool. It must be unique.
                 * - `node` (path, required, string): The cluster node name.
                 * - `pg_autoscale_mode` (body, optional, "on" | "off" | "warn"): The automatic PG scaling mode of the pool.
                 * - `pg_num` (body, optional, number): Number of placement groups.
                 * - `pg_num_min` (body, optional, number): Minimal number of placement groups.
                 * - `size` (body, optional, number): Number of replicas per object
                 * - `target_size` (body, optional, string): The estimated target size of the pool for the PG autoscaler.
                 * - `target_size_ratio` (body, optional, number): The estimated target ratio of the pool for the PG autoscaler.
                 */
                create: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/ceph/pool"]["POST"]['parameters']>>) => client.request("/nodes/{node}/ceph/pool", "POST", {
                    ...((args[0]) as any),
                    $path: {node}
                }),
                name: (name: string) => ({
                    /**
                     * Destroy pool
                     * @endpoint DELETE /nodes/{node}/ceph/pool/{name}
                     * @allowToken 1
                     * @permissions {"check": ["perm", "/", ["Sys.Modify"]]}
                     *
                     * Parameters:
                     * - `force` (query, optional, boolean): If true, destroys pool even if in use
                     * - `name` (path, required, string): The name of the pool. It must be unique.
                     * - `node` (path, required, string): The cluster node name.
                     * - `remove_ecprofile` (query, optional, boolean): Remove the erasure code profile. Defaults to true, if applicable.
                     * - `remove_storages` (query, optional, boolean): Remove all pveceph-managed storages configured for this pool
                     */
                    destroy: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/ceph/pool/{name}"]["DELETE"]['parameters']>>) => client.request("/nodes/{node}/ceph/pool/{name}", "DELETE", {
                        ...((args[0]) as any),
                        $path: {node, name}
                    }),
                    /**
                     * Pool index.
                     * @endpoint GET /nodes/{node}/ceph/pool/{name}
                     * @allowToken 1
                     * @permissions {"check": ["perm", "/", ["Sys.Audit", "Datastore.Audit"], "any", 1]}
                     *
                     * Parameters:
                     * - `name` (path, required, string): The name of the pool.
                     * - `node` (path, required, string): The cluster node name.
                     */
                    get: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/ceph/pool/{name}"]["GET"]['parameters']>>) => client.request("/nodes/{node}/ceph/pool/{name}", "GET", {
                        ...((args[0]) as any),
                        $path: {node, name}
                    }),
                    /**
                     * Change POOL settings
                     * @endpoint PUT /nodes/{node}/ceph/pool/{name}
                     * @allowToken 1
                     * @permissions {"check": ["perm", "/", ["Sys.Modify"]]}
                     *
                     * Parameters:
                     * - `application` (body, optional, "rbd" | "cephfs" | "rgw"): The application of the pool.
                     * - `crush_rule` (body, optional, string): The rule to use for mapping object placement in the cluster.
                     * - `min_size` (body, optional, number): Minimum number of replicas per object
                     * - `name` (path, required, string): The name of the pool. It must be unique.
                     * - `node` (path, required, string): The cluster node name.
                     * - `pg_autoscale_mode` (body, optional, "on" | "off" | "warn"): The automatic PG scaling mode of the pool.
                     * - `pg_num` (body, optional, number): Number of placement groups.
                     * - `pg_num_min` (body, optional, number): Minimal number of placement groups.
                     * - `size` (body, optional, number): Number of replicas per object
                     * - `target_size` (body, optional, string): The estimated target size of the pool for the PG autoscaler.
                     * - `target_size_ratio` (body, optional, number): The estimated target ratio of the pool for the PG autoscaler.
                     */
                    update: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/ceph/pool/{name}"]["PUT"]['parameters']>>) => client.request("/nodes/{node}/ceph/pool/{name}", "PUT", {
                        ...((args[0]) as any),
                        $path: {node, name}
                    }),
                    /**
                     * Show the current pool status.
                     * @endpoint GET /nodes/{node}/ceph/pool/{name}/status
                     * @allowToken 1
                     * @permissions {"check": ["perm", "/", ["Sys.Audit", "Datastore.Audit"], "any", 1]}
                     *
                     * Parameters:
                     * - `name` (path, required, string): The name of the pool. It must be unique.
                     * - `node` (path, required, string): The cluster node name.
                     * - `verbose` (query, optional, boolean): If enabled, will display additional data(eg. statistics).
                     */
                    status: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/ceph/pool/{name}/status"]["GET"]['parameters']>>) => client.request("/nodes/{node}/ceph/pool/{name}/status", "GET", {
                        ...((args[0]) as any),
                        $path: {node, name}
                    }),
                })
            },
            /**
             * Restart ceph services.
             * @endpoint POST /nodes/{node}/ceph/restart
             * @allowToken 1
             * @permissions {"check": ["perm", "/", ["Sys.Modify"]]}
             *
             * Parameters:
             * - `node` (path, required, string): The cluster node name.
             * - `service` (body, optional, string): Ceph service name.
             */
            restart: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/ceph/restart"]["POST"]['parameters']>>) => client.request("/nodes/{node}/ceph/restart", "POST", {
                ...((args[0]) as any),
                $path: {node}
            }),
            /**
             * List ceph rules.
             * @endpoint GET /nodes/{node}/ceph/rules
             * @allowToken 1
             * @permissions {"check": ["perm", "/", ["Sys.Audit", "Datastore.Audit"], "any", 1]}
             *
             * Parameters:
             * - `node` (path, required, string): The cluster node name.
             */
            rules: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/ceph/rules"]["GET"]['parameters']>>) => client.request("/nodes/{node}/ceph/rules", "GET", {
                ...((args[0]) as any),
                $path: {node}
            }),
            /**
             * Start ceph services.
             * @endpoint POST /nodes/{node}/ceph/start
             * @allowToken 1
             * @permissions {"check": ["perm", "/", ["Sys.Modify"]]}
             *
             * Parameters:
             * - `node` (path, required, string): The cluster node name.
             * - `service` (body, optional, string): Ceph service name.
             */
            start: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/ceph/start"]["POST"]['parameters']>>) => client.request("/nodes/{node}/ceph/start", "POST", {
                ...((args[0]) as any),
                $path: {node}
            }),
            /**
             * Get ceph status.
             * @endpoint GET /nodes/{node}/ceph/status
             * @allowToken 1
             * @permissions {"check": ["perm", "/", ["Sys.Audit", "Datastore.Audit"], "any", 1]}
             *
             * Parameters:
             * - `node` (path, required, string): The cluster node name.
             */
            status: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/ceph/status"]["GET"]['parameters']>>) => client.request("/nodes/{node}/ceph/status", "GET", {
                ...((args[0]) as any),
                $path: {node}
            }),
            /**
             * Stop ceph services.
             * @endpoint POST /nodes/{node}/ceph/stop
             * @allowToken 1
             * @permissions {"check": ["perm", "/", ["Sys.Modify"]]}
             *
             * Parameters:
             * - `node` (path, required, string): The cluster node name.
             * - `service` (body, optional, string): Ceph service name.
             */
            stop: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/ceph/stop"]["POST"]['parameters']>>) => client.request("/nodes/{node}/ceph/stop", "POST", {
                ...((args[0]) as any),
                $path: {node}
            }),
        },
        certificates: {
            /**
             * Node index.
             * @endpoint GET /nodes/{node}/certificates
             * @allowToken 1
             * @permissions {"user": "all"}
             *
             * Parameters:
             * - `node` (path, required, string): The cluster node name.
             */
            index: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/certificates"]["GET"]['parameters']>>) => client.request("/nodes/{node}/certificates", "GET", {
                ...((args[0]) as any),
                $path: {node}
            }),
            acme: {
                /**
                 * ACME index.
                 * @endpoint GET /nodes/{node}/certificates/acme
                 * @allowToken 1
                 * @permissions {"user": "all"}
                 *
                 * Parameters:
                 * - `node` (path, required, string): The cluster node name.
                 */
                index: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/certificates/acme"]["GET"]['parameters']>>) => client.request("/nodes/{node}/certificates/acme", "GET", {
                    ...((args[0]) as any),
                    $path: {node}
                }),
                certificate: {
                    /**
                     * Revoke existing certificate from CA.
                     * @endpoint DELETE /nodes/{node}/certificates/acme/certificate
                     * @allowToken 1
                     * @permissions {"check": ["perm", "/nodes/{node}", ["Sys.Modify"]]}
                     *
                     * Parameters:
                     * - `node` (path, required, string): The cluster node name.
                     */
                    revoke_certificate: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/certificates/acme/certificate"]["DELETE"]['parameters']>>) => client.request("/nodes/{node}/certificates/acme/certificate", "DELETE", {
                        ...((args[0]) as any),
                        $path: {node}
                    }),
                    /**
                     * Order a new certificate from ACME-compatible CA.
                     * @endpoint POST /nodes/{node}/certificates/acme/certificate
                     * @allowToken 1
                     * @permissions {"check": ["perm", "/nodes/{node}", ["Sys.Modify"]]}
                     *
                     * Parameters:
                     * - `force` (body, optional, boolean): Overwrite existing custom certificate.
                     * - `node` (path, required, string): The cluster node name.
                     */
                    new_certificate: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/certificates/acme/certificate"]["POST"]['parameters']>>) => client.request("/nodes/{node}/certificates/acme/certificate", "POST", {
                        ...((args[0]) as any),
                        $path: {node}
                    }),
                    /**
                     * Renew existing certificate from CA.
                     * @endpoint PUT /nodes/{node}/certificates/acme/certificate
                     * @allowToken 1
                     * @permissions {"check": ["perm", "/nodes/{node}", ["Sys.Modify"]]}
                     *
                     * Parameters:
                     * - `force` (body, optional, boolean): Force renewal even if expiry is more than 30 days away.
                     * - `node` (path, required, string): The cluster node name.
                     */
                    renew_certificate: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/certificates/acme/certificate"]["PUT"]['parameters']>>) => client.request("/nodes/{node}/certificates/acme/certificate", "PUT", {
                        ...((args[0]) as any),
                        $path: {node}
                    }),
                }
            },
            custom: {
                /**
                 * DELETE custom certificate chain and key.
                 * @endpoint DELETE /nodes/{node}/certificates/custom
                 * @allowToken 1
                 * @permissions {"check": ["perm", "/nodes/{node}", ["Sys.Modify"]]}
                 *
                 * Parameters:
                 * - `node` (path, required, string): The cluster node name.
                 * - `restart` (query, optional, boolean): Restart pveproxy.
                 */
                remove_custom_cert: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/certificates/custom"]["DELETE"]['parameters']>>) => client.request("/nodes/{node}/certificates/custom", "DELETE", {
                    ...((args[0]) as any),
                    $path: {node}
                }),
                /**
                 * Upload or update custom certificate chain and key.
                 * @endpoint POST /nodes/{node}/certificates/custom
                 * @allowToken 1
                 * @permissions {"check": ["perm", "/nodes/{node}", ["Sys.Modify"]]}
                 *
                 * Parameters:
                 * - `certificates` (body, required, string): PEM encoded certificate (chain).
                 * - `force` (body, optional, boolean): Overwrite existing custom or ACME certificate files.
                 * - `key` (body, optional, string): PEM encoded private key.
                 * - `node` (path, required, string): The cluster node name.
                 * - `restart` (body, optional, boolean): Restart pveproxy.
                 */
                upload_custom_cert: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/certificates/custom"]["POST"]['parameters']>>) => client.request("/nodes/{node}/certificates/custom", "POST", {
                    ...((args[0]) as any),
                    $path: {node}
                }),
            },
            info: {
                /**
                 * Get information about node's certificates.
                 * @endpoint GET /nodes/{node}/certificates/info
                 * @allowToken 1
                 * @permissions {"user": "all"}
                 *
                 * Parameters:
                 * - `node` (path, required, string): The cluster node name.
                 */
                info: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/certificates/info"]["GET"]['parameters']>>) => client.request("/nodes/{node}/certificates/info", "GET", {
                    ...((args[0]) as any),
                    $path: {node}
                }),
            }
        },
        config: {
            /**
             * Get node configuration options.
             * @endpoint GET /nodes/{node}/config
             * @allowToken 1
             * @permissions {"check": ["perm", "/", ["Sys.Audit"]]}
             *
             * Parameters:
             * - `node` (path, required, string): The cluster node name.
             * - `property` (query, optional, "acme" | "acmedomain0" | "acmedomain1" | "acmedomain2" | "acmedomain3" | "acmedomain4" | "acmedomain5" | "ballooning-target" | "description" | "startall-onboot-delay" | "wakeonlan"): Return only a specific property from the node configuration.
             */
            get_config: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/config"]["GET"]['parameters']>>) => client.request("/nodes/{node}/config", "GET", {
                ...((args[0]) as any),
                $path: {node}
            }),
            /**
             * Set node configuration options.
             * @endpoint PUT /nodes/{node}/config
             * @allowToken 1
             * @permissions {"check": ["perm", "/", ["Sys.Modify"]]}
             *
             * Parameters:
             * - `acme` (body, optional, string): Node specific ACME settings.
             * - `acmedomain[n]` (body, optional, string): ACME domain and validation plugin
             * - `ballooning-target` (body, optional, number): RAM usage target for ballooning (in percent of total memory)
             * - `delete` (body, optional, string): A list of settings you want to delete.
             * - `description` (body, optional, string): Description for the Node. Shown in the web-interface node notes panel. This is saved as comment inside the configuration file.
             * - `digest` (body, optional, string): Prevent changes if current configuration file has different SHA1 digest. This can be used to prevent concurrent modifications.
             * - `node` (path, required, string): The cluster node name.
             * - `startall-onboot-delay` (body, optional, number): Initial delay in seconds, before starting all the Virtual Guests with on-boot enabled.
             * - `wakeonlan` (body, optional, string): Node specific wake on LAN settings.
             */
            set_options: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/config"]["PUT"]['parameters']>>) => client.request("/nodes/{node}/config", "PUT", {
                ...((args[0]) as any),
                $path: {node}
            }),
        },
        lxc: {
            /**
             * LXC container index (per node).
             * @endpoint GET /nodes/{node}/lxc
             * @allowToken 1
             * @permissions {"description": "Only list CTs where you have VM.Audit permission on /vms/<vmid>.", "user": "all"}
             *
             * Parameters:
             * - `node` (path, required, string): The cluster node name.
             */
            list: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/lxc"]["GET"]['parameters']>>) => client.request("/nodes/{node}/lxc", "GET", {
                ...((args[0]) as any),
                $path: {node}
            }),
            /**
             * Create or restore a container.
             * @endpoint POST /nodes/{node}/lxc
             * @allowToken 1
             * @permissions {"description": "You need 'VM.Allocate' permission on /vms/{vmid} or on the VM pool /pool/{pool}. For restore, it is enough if the user has 'VM.Backup' permission and the VM already exists. You also need 'Datastore.AllocateSpace' permissions on the storage. For privileged containers, 'Sys.Modify' permissions on '/' are required.", "user": "all"}
             *
             * Parameters:
             * - `node` (path, required, string): The cluster node name.
             * - `vmid` (body, required, number): The (unique) ID of the VM.
             */
            create: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/lxc"]["POST"]['parameters']>>) => client.request("/nodes/{node}/lxc", "POST", {
                ...((args[0]) as any),
                $path: {node}
            }),
            /**
             * Create or restore a container.
             * @endpoint POST /nodes/{node}/lxc
             * @allowToken 1
             * @permissions {"description": "You need 'VM.Allocate' permission on /vms/{vmid} or on the VM pool /pool/{pool}. For restore, it is enough if the user has 'VM.Backup' permission and the VM already exists. You also need 'Datastore.AllocateSpace' permissions on the storage. For privileged containers, 'Sys.Modify' permissions on '/' are required.", "user": "all"}
             *
             * Parameters:
             * - `node` (path, required, string): The cluster node name.
             * - `vmid` (body, required, number): The (unique) ID of the VM.
             */
            crate: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/lxc"]["POST"]['parameters']>>) => client.request("/nodes/{node}/lxc", "POST", {
                ...((args[0]) as any),
                $path: {node}
            }),
            /**
             * Access a container by VMID.
             *
             * Parameters:
             * - `vmid` (path-like, required, number | string): The (unique) ID of the VM.
             */
            id: (vmid: number | string) => ({
                /**
                 * Destroy the container (also delete all used files).
                 * @endpoint DELETE /nodes/{node}/lxc/{vmid}
                 * @allowToken 1
                 * @permissions {"check": ["perm", "/vms/{vmid}", ["VM.Allocate"]]}
                 *
                 * Parameters:
                 * - `node` (path, required, string): The cluster node name.
                 * - `vmid` (path, required, number): The (unique) ID of the VM.
                 */
                destroy: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/lxc/{vmid}"]["DELETE"]['parameters']>>) => client.request("/nodes/{node}/lxc/{vmid}", "DELETE", {
                    ...((args[0]) as any),
                    $path: {node, vmid: parseInt(vmid.toString())}
                }),
                /**
                 * Directory index.
                 * @endpoint GET /nodes/{node}/lxc/{vmid}
                 * @allowToken 1
                 * @permissions {"user": "all"}
                 *
                 * Parameters:
                 * - `node` (path, required, string): The cluster node name.
                 * - `vmid` (path, required, number): The (unique) ID of the VM.
                 */
                diridx: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/lxc/{vmid}"]["GET"]['parameters']>>) => client.request("/nodes/{node}/lxc/{vmid}", "GET", {
                    ...((args[0]) as any),
                    $path: {node, vmid: parseInt(vmid.toString())}
                }),
                /**
                 * Create a container clone/copy.
                 * @endpoint POST /nodes/{node}/lxc/{vmid}/clone
                 * @allowToken 1
                 * @permissions {"check": ["and", ["perm", "/vms/{vmid}", ["VM.Clone"]], ["or", ["perm", "/vms/{newid}", ["VM.Allocate"]], ["perm", "/pool/{pool}", ["VM.Allocate"], "require_param", "pool"]]]}
                 *
                 * Parameters:
                 * - `node` (path, required, string): The cluster node name.
                 * - `vmid` (path, required, number): The (unique) ID of the VM.
                 */
                clone: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/lxc/{vmid}/clone"]["POST"]['parameters']>>) => client.request("/nodes/{node}/lxc/{vmid}/clone", "POST", {
                    ...((args[0]) as any),
                    $path: {node, vmid: parseInt(vmid.toString())}
                }),
                config: {
                    /**
                     * Get container configuration.
                     * @endpoint GET /nodes/{node}/lxc/{vmid}/config
                     * @allowToken 1
                     * @permissions {"check": ["perm", "/vms/{vmid}", ["VM.Audit"]]}
                     *
                     * Parameters:
                     * - `node` (path, required, string): The cluster node name.
                     * - `vmid` (path, required, number): The (unique) ID of the VM.
                     */
                    get: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/lxc/{vmid}/config"]["GET"]['parameters']>>) => client.request("/nodes/{node}/lxc/{vmid}/config", "GET", {
                        ...((args[0]) as any),
                        $path: {node, vmid: parseInt(vmid.toString())}
                    }),
                    /**
                     * Set container options.
                     * @endpoint PUT /nodes/{node}/lxc/{vmid}/config
                     * @allowToken 1
                     * @permissions {"check": ["perm", "/vms/{vmid}", ["VM.Config.Disk", "VM.Config.CPU", "VM.Config.Memory", "VM.Config.Network", "VM.Config.Options"], "any", 1]}
                     *
                     * Parameters:
                     * - `node` (path, required, string): The cluster node name.
                     * - `vmid` (path, required, number): The (unique) ID of the VM.
                     */
                    update: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/lxc/{vmid}/config"]["PUT"]['parameters']>>) => client.request("/nodes/{node}/lxc/{vmid}/config", "PUT", {
                        ...((args[0]) as any),
                        $path: {node, vmid: parseInt(vmid.toString())}
                    }),
                },
                /**
                 * Get IP addresses of the specified container interface.
                 * @endpoint GET /nodes/{node}/lxc/{vmid}/interfaces
                 * @allowToken 1
                 * @permissions {"check": ["perm", "/vms/{vmid}", ["VM.Audit"]]}
                 *
                 * Parameters:
                 * - `node` (path, required, string): The cluster node name.
                 * - `vmid` (path, required, number): The (unique) ID of the VM.
                 */
                interfaces: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/lxc/{vmid}/interfaces"]["GET"]['parameters']>>) => client.request("/nodes/{node}/lxc/{vmid}/interfaces", "GET", {
                    ...((args[0]) as any),
                    $path: {node, vmid: parseInt(vmid.toString())}
                }),
                status: {
                    /**
                     * Directory index.
                     * @endpoint GET /nodes/{node}/lxc/{vmid}/status
                     * @allowToken 1
                     * @permissions {"user": "all"}
                     *
                     * Parameters:
                     * - `node` (path, required, string): The cluster node name.
                     * - `vmid` (path, required, number): The (unique) ID of the VM.
                     */
                    get: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/lxc/{vmid}/status"]["GET"]['parameters']>>) => client.request("/nodes/{node}/lxc/{vmid}/status", "GET", {
                        ...((args[0]) as any),
                        $path: {node, vmid: parseInt(vmid.toString())}
                    }),
                    /**
                     * Get virtual machine status.
                     * @endpoint GET /nodes/{node}/lxc/{vmid}/status/current
                     * @allowToken 1
                     * @permissions {"check": ["perm", "/vms/{vmid}", ["VM.Audit"]]}
                     *
                     * Parameters:
                     * - `node` (path, required, string): The cluster node name.
                     * - `vmid` (path, required, number): The (unique) ID of the VM.
                     */
                    current: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/lxc/{vmid}/status/current"]["GET"]['parameters']>>) => client.request("/nodes/{node}/lxc/{vmid}/status/current", "GET", {
                        ...((args[0]) as any),
                        $path: {node, vmid: parseInt(vmid.toString())}
                    }),
                    /**
                     * Reboot the container.
                     * @endpoint POST /nodes/{node}/lxc/{vmid}/status/reboot
                     * @allowToken 1
                     * @permissions {"check": ["perm", "/vms/{vmid}", ["VM.PowerMgmt"]]}
                     *
                     * Parameters:
                     * - `node` (path, required, string): The cluster node name.
                     * - `vmid` (path, required, number): The (unique) ID of the VM.
                     */
                    reboot: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/lxc/{vmid}/status/reboot"]["POST"]['parameters']>>) => client.request("/nodes/{node}/lxc/{vmid}/status/reboot", "POST", {
                        ...((args[0]) as any),
                        $path: {node, vmid: parseInt(vmid.toString())}
                    }),
                    /**
                     * Resume the container.
                     * @endpoint POST /nodes/{node}/lxc/{vmid}/status/resume
                     * @allowToken 1
                     * @permissions {"check": ["perm", "/vms/{vmid}", ["VM.PowerMgmt"]]}
                     *
                     * Parameters:
                     * - `node` (path, required, string): The cluster node name.
                     * - `vmid` (path, required, number): The (unique) ID of the VM.
                     */
                    resume: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/lxc/{vmid}/status/resume"]["POST"]['parameters']>>) => client.request("/nodes/{node}/lxc/{vmid}/status/resume", "POST", {
                        ...((args[0]) as any),
                        $path: {node, vmid: parseInt(vmid.toString())}
                    }),
                    /**
                     * Shutdown the container.
                     * @endpoint POST /nodes/{node}/lxc/{vmid}/status/shutdown
                     * @allowToken 1
                     * @permissions {"check": ["perm", "/vms/{vmid}", ["VM.PowerMgmt"]]}
                     *
                     * Parameters:
                     * - `node` (path, required, string): The cluster node name.
                     * - `vmid` (path, required, number): The (unique) ID of the VM.
                     */
                    shutdown: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/lxc/{vmid}/status/shutdown"]["POST"]['parameters']>>) => client.request("/nodes/{node}/lxc/{vmid}/status/shutdown", "POST", {
                        ...((args[0]) as any),
                        $path: {node, vmid: parseInt(vmid.toString())}
                    }),
                    /**
                     * Start the container.
                     * @endpoint POST /nodes/{node}/lxc/{vmid}/status/start
                     * @allowToken 1
                     * @permissions {"check": ["perm", "/vms/{vmid}", ["VM.PowerMgmt"]]}
                     *
                     * Parameters:
                     * - `node` (path, required, string): The cluster node name.
                     * - `vmid` (path, required, number): The (unique) ID of the VM.
                     */
                    start: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/lxc/{vmid}/status/start"]["POST"]['parameters']>>) => client.request("/nodes/{node}/lxc/{vmid}/status/start", "POST", {
                        ...((args[0]) as any),
                        $path: {node, vmid: parseInt(vmid.toString())}
                    }),
                    /**
                     * Stop the container.
                     * @endpoint POST /nodes/{node}/lxc/{vmid}/status/stop
                     * @allowToken 1
                     * @permissions {"check": ["perm", "/vms/{vmid}", ["VM.PowerMgmt"]]}
                     *
                     * Parameters:
                     * - `node` (path, required, string): The cluster node name.
                     * - `vmid` (path, required, number): The (unique) ID of the VM.
                     */
                    stop: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/lxc/{vmid}/status/stop"]["POST"]['parameters']>>) => client.request("/nodes/{node}/lxc/{vmid}/status/stop", "POST", {
                        ...((args[0]) as any),
                        $path: {node, vmid: parseInt(vmid.toString())}
                    }),
                    /**
                     * Suspend the container.
                     * @endpoint POST /nodes/{node}/lxc/{vmid}/status/suspend
                     * @allowToken 1
                     * @permissions {"check": ["perm", "/vms/{vmid}", ["VM.PowerMgmt"]]}
                     *
                     * Parameters:
                     * - `node` (path, required, string): The cluster node name.
                     * - `vmid` (path, required, number): The (unique) ID of the VM.
                     */
                    suspend: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/lxc/{vmid}/status/suspend"]["POST"]['parameters']>>) => client.request("/nodes/{node}/lxc/{vmid}/status/suspend", "POST", {
                        ...((args[0]) as any),
                        $path: {node, vmid: parseInt(vmid.toString())}
                    }),
                },
                /**
                 * Creates a TCP proxy connection.
                 * @endpoint POST /nodes/{node}/lxc/{vmid}/termproxy
                 * @allowToken 1
                 * @permissions {"check": ["perm", "/vms/{vmid}", ["VM.Console"]]}
                 *
                 * Parameters:
                 * - `node` (path, required, string): The cluster node name.
                 * - `vmid` (path, required, number): The (unique) ID of the VM.
                 */
                termproxy: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/lxc/{vmid}/termproxy"]["POST"]['parameters']>>) => client.request("/nodes/{node}/lxc/{vmid}/termproxy", "POST", {
                    ...((args[0]) as any),
                    $path: {node, vmid: parseInt(vmid.toString())}
                }),
                /**
                 * Creates a TCP VNC proxy connection.
                 * @endpoint POST /nodes/{node}/lxc/{vmid}/vncproxy
                 * @allowToken 1
                 * @permissions {"check": ["perm", "/vms/{vmid}", ["VM.Console"]]}
                 *
                 * Parameters:
                 * - `node` (path, required, string): The cluster node name.
                 * - `vmid` (path, required, number): The (unique) ID of the VM.
                 */
                vncproxy: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/lxc/{vmid}/vncproxy"]["POST"]['parameters']>>) => client.request("/nodes/{node}/lxc/{vmid}/vncproxy", "POST", {
                    ...((args[0]) as any),
                    $path: {node, vmid: parseInt(vmid.toString())}
                }),
                /**
                 * Opens a websocket for VNC traffic.
                 * @endpoint GET /nodes/{node}/lxc/{vmid}/vncwebsocket
                 * @allowToken 1
                 * @permissions {"check": ["perm", "/vms/{vmid}", ["VM.Console"]], "description": "You also need to pass a valid ticket (vncticket)."}
                 *
                 * Parameters:
                 * - `node` (path, required, string): The cluster node name.
                 * - `vmid` (path, required, number): The (unique) ID of the VM.
                 */
                vncwebsocket: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/lxc/{vmid}/vncwebsocket"]["GET"]['parameters']>>) => client.request("/nodes/{node}/lxc/{vmid}/vncwebsocket", "GET", {
                    ...((args[0]) as any),
                    $path: {node, vmid: parseInt(vmid.toString())}
                }),
            }),
        },
        qemu: {
            /**
             * Virtual machine index (per node).
             * @endpoint GET /nodes/{node}/qemu
             * @allowToken 1
             * @permissions {"description": "Only list VMs where you have VM.Audit permissions on /vms/<vmid>.", "user": "all"}
             *
             * Parameters:
             * - `full` (query, optional, boolean): Determine the full status of active VMs.
             * - `node` (path, required, string): The cluster node name.
             */
            list: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/qemu"]["GET"]['parameters']>>) => client.request("/nodes/{node}/qemu", "GET", {
                ...((args[0]) as any),
                $path: {node}
            }),
            /**
             * Create or restore a virtual machine.
             * @endpoint POST /nodes/{node}/qemu
             * @allowToken 1
             * @permissions {"description": "You need 'VM.Allocate' permissions on /vms/{vmid} or on the VM pool /pool/{pool}. For restore (option 'archive'), it is enough if the user has 'VM.Backup' permission and the VM already exists. If you create disks you need 'Datastore.AllocateSpace' on any used storage.If you use a bridge/vlan, you need 'SDN.Use' on any used bridge/vlan.", "user": "all"}
             *
             * Parameters:
             * - `node` (path, required, string): The cluster node name.
             * - `vmid` (body, required, number): The (unique) ID of the VM.
             */
            create: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/qemu"]["POST"]['parameters']>>) => client.request("/nodes/{node}/qemu", "POST", {
                ...((args[0]) as any),
                $path: {node}
            }),
            /**
             * Create or restore a virtual machine.
             * @endpoint POST /nodes/{node}/qemu
             * @allowToken 1
             * @permissions {"description": "You need 'VM.Allocate' permissions on /vms/{vmid} or on the VM pool /pool/{pool}. For restore (option 'archive'), it is enough if the user has 'VM.Backup' permission and the VM already exists. If you create disks you need 'Datastore.AllocateSpace' on any used storage.If you use a bridge/vlan, you need 'SDN.Use' on any used bridge/vlan.", "user": "all"}
             *
             * Parameters:
             * - `node` (path, required, string): The cluster node name.
             * - `vmid` (body, required, number): The (unique) ID of the VM.
             */
            create_vm: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/qemu"]["POST"]['parameters']>>) => client.request("/nodes/{node}/qemu", "POST", {
                ...((args[0]) as any),
                $path: {node}
            }),
            /**
             * Access a virtual machine by VMID.
             *
             * Parameters:
             * - `vmid` (path-like, required, number | string): The (unique) ID of the VM.
             */
            vmid: (vmid: string | number) => ({
                /**
                 * Destroy the VM and all used/owned volumes.
                 * @endpoint DELETE /nodes/{node}/qemu/{vmid}
                 * @allowToken 1
                 * @permissions {"check": ["perm", "/vms/{vmid}", ["VM.Allocate"]]}
                 *
                 * Parameters:
                 * - `node` (path, required, string): The cluster node name.
                 * - `vmid` (path, required, number): The (unique) ID of the VM.
                 */
                destroy: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/qemu/{vmid}"]["DELETE"]['parameters']>>) => client.request("/nodes/{node}/qemu/{vmid}", "DELETE", {
                    ...((args[0]) as any),
                    $path: {node, vmid: parseInt(vmid.toString())}
                }),
                /**
                 * Directory index.
                 * @endpoint GET /nodes/{node}/qemu/{vmid}
                 * @allowToken 1
                 * @permissions {"user": "all"}
                 *
                 * Parameters:
                 * - `node` (path, required, string): The cluster node name.
                 * - `vmid` (path, required, number): The (unique) ID of the VM.
                 */
                diridx: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/qemu/{vmid}"]["GET"]['parameters']>>) => client.request("/nodes/{node}/qemu/{vmid}", "GET", {
                    ...((args[0]) as any),
                    $path: {node, vmid: parseInt(vmid.toString())}
                }),
                agent: {
                    /**
                     * QEMU Guest Agent command index.
                     * @endpoint GET /nodes/{node}/qemu/{vmid}/agent
                     * @allowToken 1
                     * @permissions {"user": "all"}
                     *
                     * Parameters:
                     * - `node` (path, required, string): The cluster node name.
                     * - `vmid` (path, required, number): The (unique) ID of the VM.
                     */
                    index: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/qemu/{vmid}/agent"]["GET"]['parameters']>>) => client.request("/nodes/{node}/qemu/{vmid}/agent", "GET", {
                        ...((args[0]) as any),
                        $path: {node, vmid: parseInt(vmid.toString())}
                    }),
                },
                /**
                 * Create a full copy or linked clone of a virtual machine.
                 * @endpoint POST /nodes/{node}/qemu/{vmid}/clone
                 * @allowToken 1
                 * @permissions {"check": ["and", ["perm", "/vms/{vmid}", ["VM.Clone"]], ["or", ["perm", "/vms/{newid}", ["VM.Allocate"]], ["perm", "/pool/{pool}", ["VM.Allocate"], "require_param", "pool"]]]}
                 *
                 * Parameters:
                 * - `node` (path, required, string): The cluster node name.
                 * - `vmid` (path, required, number): The (unique) ID of the VM.
                 */
                clone: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/qemu/{vmid}/clone"]["POST"]['parameters']>>) => client.request("/nodes/{node}/qemu/{vmid}/clone", "POST", {
                    ...((args[0]) as any),
                    $path: {node, vmid: parseInt(vmid.toString())}
                }),
                config: {
                    /**
                     * Get virtual machine configuration.
                     * @endpoint GET /nodes/{node}/qemu/{vmid}/config
                     * @allowToken 1
                     * @permissions {"check": ["perm", "/vms/{vmid}", ["VM.Audit"]]}
                     *
                     * Parameters:
                     * - `node` (path, required, string): The cluster node name.
                     * - `vmid` (path, required, number): The (unique) ID of the VM.
                     */
                    get: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/qemu/{vmid}/config"]["GET"]['parameters']>>) => client.request("/nodes/{node}/qemu/{vmid}/config", "GET", {
                        ...((args[0]) as any),
                        $path: {node, vmid: parseInt(vmid.toString())}
                    }),
                    /**
                     * Set virtual machine options asynchronously.
                     * @endpoint POST /nodes/{node}/qemu/{vmid}/config
                     * @allowToken 1
                     * @permissions {"check": ["perm", "/vms/{vmid}", ["VM.Config.Disk", "VM.Config.CDROM", "VM.Config.CPU", "VM.Config.Memory", "VM.Config.Network", "VM.Config.HWType", "VM.Config.Options", "VM.Config.Cloudinit"], "any", 1]}
                     *
                     * Parameters:
                     * - `node` (path, required, string): The cluster node name.
                     * - `vmid` (path, required, number): The (unique) ID of the VM.
                     */
                    update_async: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/qemu/{vmid}/config"]["POST"]['parameters']>>) => client.request("/nodes/{node}/qemu/{vmid}/config", "POST", {
                        ...((args[0]) as any),
                        $path: {node, vmid: parseInt(vmid.toString())}
                    }),
                    /**
                     * Set virtual machine options synchronously.
                     * @endpoint PUT /nodes/{node}/qemu/{vmid}/config
                     * @allowToken 1
                     * @permissions {"check": ["perm", "/vms/{vmid}", ["VM.Config.Disk", "VM.Config.CDROM", "VM.Config.CPU", "VM.Config.Memory", "VM.Config.Network", "VM.Config.HWType", "VM.Config.Options", "VM.Config.Cloudinit"], "any", 1]}
                     *
                     * Parameters:
                     * - `node` (path, required, string): The cluster node name.
                     * - `vmid` (path, required, number): The (unique) ID of the VM.
                     */
                    update: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/qemu/{vmid}/config"]["PUT"]['parameters']>>) => client.request("/nodes/{node}/qemu/{vmid}/config", "PUT", {
                        ...((args[0]) as any),
                        $path: {node, vmid: parseInt(vmid.toString())}
                    }),
                },
                status: {
                    /**
                     * Directory index.
                     * @endpoint GET /nodes/{node}/qemu/{vmid}/status
                     * @allowToken 1
                     * @permissions {"user": "all"}
                     *
                     * Parameters:
                     * - `node` (path, required, string): The cluster node name.
                     * - `vmid` (path, required, number): The (unique) ID of the VM.
                     */
                    get: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/qemu/{vmid}/status"]["GET"]['parameters']>>) => client.request("/nodes/{node}/qemu/{vmid}/status", "GET", {
                        ...((args[0]) as any),
                        $path: {node, vmid: parseInt(vmid.toString())}
                    }),
                    /**
                     * Get virtual machine status.
                     * @endpoint GET /nodes/{node}/qemu/{vmid}/status/current
                     * @allowToken 1
                     * @permissions {"check": ["perm", "/vms/{vmid}", ["VM.Audit"]]}
                     *
                     * Parameters:
                     * - `node` (path, required, string): The cluster node name.
                     * - `vmid` (path, required, number): The (unique) ID of the VM.
                     */
                    current: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/qemu/{vmid}/status/current"]["GET"]['parameters']>>) => client.request("/nodes/{node}/qemu/{vmid}/status/current", "GET", {
                        ...((args[0]) as any),
                        $path: {node, vmid: parseInt(vmid.toString())}
                    }),
                    /**
                     * Reboot virtual machine.
                     * @endpoint POST /nodes/{node}/qemu/{vmid}/status/reboot
                     * @allowToken 1
                     * @permissions {"check": ["perm", "/vms/{vmid}", ["VM.PowerMgmt"]]}
                     *
                     * Parameters:
                     * - `node` (path, required, string): The cluster node name.
                     * - `vmid` (path, required, number): The (unique) ID of the VM.
                     */
                    reboot: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/qemu/{vmid}/status/reboot"]["POST"]['parameters']>>) => client.request("/nodes/{node}/qemu/{vmid}/status/reboot", "POST", {
                        ...((args[0]) as any),
                        $path: {node, vmid: parseInt(vmid.toString())}
                    }),
                    /**
                     * Reset virtual machine.
                     * @endpoint POST /nodes/{node}/qemu/{vmid}/status/reset
                     * @allowToken 1
                     * @permissions {"check": ["perm", "/vms/{vmid}", ["VM.PowerMgmt"]]}
                     *
                     * Parameters:
                     * - `node` (path, required, string): The cluster node name.
                     * - `vmid` (path, required, number): The (unique) ID of the VM.
                     */
                    reset: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/qemu/{vmid}/status/reset"]["POST"]['parameters']>>) => client.request("/nodes/{node}/qemu/{vmid}/status/reset", "POST", {
                        ...((args[0]) as any),
                        $path: {node, vmid: parseInt(vmid.toString())}
                    }),
                    /**
                     * Resume virtual machine.
                     * @endpoint POST /nodes/{node}/qemu/{vmid}/status/resume
                     * @allowToken 1
                     * @permissions {"check": ["perm", "/vms/{vmid}", ["VM.PowerMgmt"]]}
                     *
                     * Parameters:
                     * - `node` (path, required, string): The cluster node name.
                     * - `vmid` (path, required, number): The (unique) ID of the VM.
                     */
                    resume: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/qemu/{vmid}/status/resume"]["POST"]['parameters']>>) => client.request("/nodes/{node}/qemu/{vmid}/status/resume", "POST", {
                        ...((args[0]) as any),
                        $path: {node, vmid: parseInt(vmid.toString())}
                    }),
                    /**
                     * Shutdown virtual machine.
                     * @endpoint POST /nodes/{node}/qemu/{vmid}/status/shutdown
                     * @allowToken 1
                     * @permissions {"check": ["perm", "/vms/{vmid}", ["VM.PowerMgmt"]]}
                     *
                     * Parameters:
                     * - `node` (path, required, string): The cluster node name.
                     * - `vmid` (path, required, number): The (unique) ID of the VM.
                     */
                    shutdown: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/qemu/{vmid}/status/shutdown"]["POST"]['parameters']>>) => client.request("/nodes/{node}/qemu/{vmid}/status/shutdown", "POST", {
                        ...((args[0]) as any),
                        $path: {node, vmid: parseInt(vmid.toString())}
                    }),
                    /**
                     * Start virtual machine.
                     * @endpoint POST /nodes/{node}/qemu/{vmid}/status/start
                     * @allowToken 1
                     * @permissions {"check": ["perm", "/vms/{vmid}", ["VM.PowerMgmt"]]}
                     *
                     * Parameters:
                     * - `node` (path, required, string): The cluster node name.
                     * - `vmid` (path, required, number): The (unique) ID of the VM.
                     */
                    start: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/qemu/{vmid}/status/start"]["POST"]['parameters']>>) => client.request("/nodes/{node}/qemu/{vmid}/status/start", "POST", {
                        ...((args[0]) as any),
                        $path: {node, vmid: parseInt(vmid.toString())}
                    }),
                    /**
                     * Stop virtual machine.
                     * @endpoint POST /nodes/{node}/qemu/{vmid}/status/stop
                     * @allowToken 1
                     * @permissions {"check": ["perm", "/vms/{vmid}", ["VM.PowerMgmt"]]}
                     *
                     * Parameters:
                     * - `node` (path, required, string): The cluster node name.
                     * - `vmid` (path, required, number): The (unique) ID of the VM.
                     */
                    stop: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/qemu/{vmid}/status/stop"]["POST"]['parameters']>>) => client.request("/nodes/{node}/qemu/{vmid}/status/stop", "POST", {
                        ...((args[0]) as any),
                        $path: {node, vmid: parseInt(vmid.toString())}
                    }),
                    /**
                     * Suspend virtual machine.
                     * @endpoint POST /nodes/{node}/qemu/{vmid}/status/suspend
                     * @allowToken 1
                     * @permissions {"check": ["perm", "/vms/{vmid}", ["VM.PowerMgmt"]]}
                     *
                     * Parameters:
                     * - `node` (path, required, string): The cluster node name.
                     * - `vmid` (path, required, number): The (unique) ID of the VM.
                     */
                    suspend: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/qemu/{vmid}/status/suspend"]["POST"]['parameters']>>) => client.request("/nodes/{node}/qemu/{vmid}/status/suspend", "POST", {
                        ...((args[0]) as any),
                        $path: {node, vmid: parseInt(vmid.toString())}
                    }),
                },
                /**
                 * Creates a TCP proxy connection.
                 * @endpoint POST /nodes/{node}/qemu/{vmid}/termproxy
                 * @allowToken 1
                 * @permissions {"check": ["perm", "/vms/{vmid}", ["VM.Console"]]}
                 *
                 * Parameters:
                 * - `node` (path, required, string): The cluster node name.
                 * - `vmid` (path, required, number): The (unique) ID of the VM.
                 */
                termproxy: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/qemu/{vmid}/termproxy"]["POST"]['parameters']>>) => client.request("/nodes/{node}/qemu/{vmid}/termproxy", "POST", {
                    ...((args[0]) as any),
                    $path: {node, vmid: parseInt(vmid.toString())}
                }),
                /**
                 * Creates a TCP VNC proxy connection.
                 * @endpoint POST /nodes/{node}/qemu/{vmid}/vncproxy
                 * @allowToken 1
                 * @permissions {"check": ["perm", "/vms/{vmid}", ["VM.Console"]]}
                 *
                 * Parameters:
                 * - `node` (path, required, string): The cluster node name.
                 * - `vmid` (path, required, number): The (unique) ID of the VM.
                 */
                vncproxy: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/qemu/{vmid}/vncproxy"]["POST"]['parameters']>>) => client.request("/nodes/{node}/qemu/{vmid}/vncproxy", "POST", {
                    ...((args[0]) as any),
                    $path: {node, vmid: parseInt(vmid.toString())}
                }),
                /**
                 * Opens a websocket for VNC traffic.
                 * @endpoint GET /nodes/{node}/qemu/{vmid}/vncwebsocket
                 * @allowToken 1
                 * @permissions {"check": ["perm", "/vms/{vmid}", ["VM.Console"]], "description": "You also need to pass a valid ticket (vncticket)."}
                 *
                 * Parameters:
                 * - `node` (path, required, string): The cluster node name.
                 * - `vmid` (path, required, number): The (unique) ID of the VM.
                 */
                vncwebsocket: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/qemu/{vmid}/vncwebsocket"]["GET"]['parameters']>>) => client.request("/nodes/{node}/qemu/{vmid}/vncwebsocket", "GET", {
                    ...((args[0]) as any),
                    $path: {node, vmid: parseInt(vmid.toString())}
                }),
            }),
        },
        disks: {
            /**
             * Node index.
             * @endpoint GET /nodes/{node}/disks
             * @allowToken 1
             * @permissions {"user": "all"}
             *
             * Parameters:
             * - `node` (path, required, string): The cluster node name.
             */
            index: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/disks"]["GET"]['parameters']>>) => client.request("/nodes/{node}/disks", "GET", {
                ...((args[0]) as any),
                $path: {node}
            }),
            directory: {
                /**
                 * PVE Managed Directory storages.
                 * @endpoint GET /nodes/{node}/disks/directory
                 * @allowToken 1
                 * @permissions {"check": ["perm", "/", ["Sys.Audit"]]}
                 *
                 * Parameters:
                 * - `node` (path, required, string): The cluster node name.
                 */
                index: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/disks/directory"]["GET"]['parameters']>>) => client.request("/nodes/{node}/disks/directory", "GET", {
                    ...((args[0]) as any),
                    $path: {node}
                }),
                /**
                 * Create a Filesystem on an unused disk. Will be mounted under '/mnt/pve/NAME'.
                 * @endpoint POST /nodes/{node}/disks/directory
                 * @allowToken 1
                 * @permissions {"check": ["perm", "/", ["Sys.Modify"]], "description": "Requires additionally 'Datastore.Allocate' on /storage when setting 'add_storage'"}
                 *
                 * Parameters:
                 * - `add_storage` (body, optional, boolean): Configure storage using the directory.
                 * - `device` (body, required, string): The block device you want to create the filesystem on.
                 * - `filesystem` (body, optional, "ext4" | "xfs"): The desired filesystem.
                 * - `name` (body, required, string): The storage identifier.
                 * - `node` (path, required, string): The cluster node name.
                 */
                create: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/disks/directory"]["POST"]['parameters']>>) => client.request("/nodes/{node}/disks/directory", "POST", {
                    ...((args[0]) as any),
                    $path: {node}
                }),
                name: (name: string) => ({
                    /**
                     * Unmounts the storage and removes the mount unit.
                     * @endpoint DELETE /nodes/{node}/disks/directory/{name}
                     * @allowToken 1
                     * @permissions {"check": ["perm", "/", ["Sys.Modify"]], "description": "Requires additionally 'Datastore.Allocate' on /storage when setting 'cleanup-config'"}
                     *
                     * Parameters:
                     * - `cleanup-config` (query, optional, boolean): Marks associated storage(s) as not available on this node anymore or removes them from the configuration (if configured for this node only).
                     * - `cleanup-disks` (query, optional, boolean): Also wipe disk so it can be repurposed afterwards.
                     * - `name` (path, required, string): The storage identifier.
                     * - `node` (path, required, string): The cluster node name.
                     */
                    delete: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/disks/directory/{name}"]["DELETE"]['parameters']>>) => client.request("/nodes/{node}/disks/directory/{name}", "DELETE", {
                        ...((args[0]) as any),
                        $path: {node, name}
                    })
                })
            },
            /**
             * Initialize Disk with GPT
             * @endpoint POST /nodes/{node}/disks/initgpt
             * @allowToken 1
             * @permissions {"check": ["perm", "/", ["Sys.Modify"]]}
             *
             * Parameters:
             * - `disk` (body, required, string): Block device name
             * - `node` (path, required, string): The cluster node name.
             * - `uuid` (body, optional, string): UUID for the GPT table
             */
            initgpt: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/disks/initgpt"]["POST"]['parameters']>>) => client.request("/nodes/{node}/disks/initgpt", "POST", {
                ...((args[0]) as any),
                $path: {node}
            }),
            /**
             * List local disks.
             * @endpoint GET /nodes/{node}/disks/list
             * @allowToken 1
             * @permissions {"check": ["or", ["perm", "/", ["Sys.Audit"]], ["perm", "/nodes/{node}", ["Sys.Audit"]]]}
             *
             * Parameters:
             * - `include-partitions` (query, optional, boolean): Also include partitions.
             * - `node` (path, required, string): The cluster node name.
             * - `skipsmart` (query, optional, boolean): Skip smart checks.
             * - `type` (query, optional, "unused" | "journal_disks"): Only list specific types of disks.
             */
            list: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/disks/list"]["GET"]['parameters']>>) => client.request("/nodes/{node}/disks/list", "GET", {
                ...((args[0]) as any),
                $path: {node}
            }),
            lvm: {
                /**
                 * List LVM Volume Groups
                 * @endpoint GET /nodes/{node}/disks/lvm
                 * @allowToken 1
                 * @permissions {"check": ["perm", "/", ["Sys.Audit"]]}
                 *
                 * Parameters:
                 * - `node` (path, required, string): The cluster node name.
                 */
                index: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/disks/lvm"]["GET"]['parameters']>>) => client.request("/nodes/{node}/disks/lvm", "GET", {
                    ...((args[0]) as any),
                    $path: {node}
                }),
                /**
                 * Create an LVM Volume Group
                 * @endpoint POST /nodes/{node}/disks/lvm
                 * @allowToken 1
                 * @permissions {"check": ["perm", "/", ["Sys.Modify"]], "description": "Requires additionally 'Datastore.Allocate' on /storage when setting 'add_storage'"}
                 *
                 * Parameters:
                 * - `add_storage` (body, optional, boolean): Configure storage using the Volume Group
                 * - `device` (body, required, string): The block device you want to create the volume group on
                 * - `name` (body, required, string): The storage identifier.
                 * - `node` (path, required, string): The cluster node name.
                 */
                create: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/disks/lvm"]["POST"]['parameters']>>) => client.request("/nodes/{node}/disks/lvm", "POST", {
                    ...((args[0]) as any),
                    $path: {node}
                }),
                name: (name: string) => ({
                    /**
                     * Remove an LVM Volume Group.
                     * @endpoint DELETE /nodes/{node}/disks/lvm/{name}
                     * @allowToken 1
                     * @permissions {"check": ["perm", "/", ["Sys.Modify"]], "description": "Requires additionally 'Datastore.Allocate' on /storage when setting 'cleanup-config'"}
                     *
                     * Parameters:
                     * - `cleanup-config` (query, optional, boolean): Marks associated storage(s) as not available on this node anymore or removes them from the configuration (if configured for this node only).
                     * - `cleanup-disks` (query, optional, boolean): Also wipe disks so they can be repurposed afterwards.
                     * - `name` (path, required, string): The storage identifier.
                     * - `node` (path, required, string): The cluster node name.
                     */
                    delete: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/disks/lvm/{name}"]["DELETE"]['parameters']>>) => client.request("/nodes/{node}/disks/lvm/{name}", "DELETE", {
                        ...((args[0]) as any),
                        $path: {node, name}
                    }),
                }),
                lvmthin: {
                    /**
                     * List LVM thinpools
                     * @endpoint GET /nodes/{node}/disks/lvmthin
                     * @allowToken 1
                     * @permissions {"check": ["perm", "/", ["Sys.Audit"]]}
                     *
                     * Parameters:
                     * - `node` (path, required, string): The cluster node name.
                     */
                    index: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/disks/lvmthin"]["GET"]['parameters']>>) => client.request("/nodes/{node}/disks/lvmthin", "GET", {
                        ...((args[0]) as any),
                        $path: {node}
                    }),
                    /**
                     * Create an LVM thinpool
                     * @endpoint POST /nodes/{node}/disks/lvmthin
                     * @allowToken 1
                     * @permissions {"check": ["perm", "/", ["Sys.Modify"]], "description": "Requires additionally 'Datastore.Allocate' on /storage when setting 'add_storage'"}
                     *
                     * Parameters:
                     * - `add_storage` (body, optional, boolean): Configure storage using the thinpool.
                     * - `device` (body, required, string): The block device you want to create the thinpool on.
                     * - `name` (body, required, string): The storage identifier.
                     * - `node` (path, required, string): The cluster node name.
                     */
                    create: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/disks/lvmthin"]["POST"]['parameters']>>) => client.request("/nodes/{node}/disks/lvmthin", "POST", {
                        ...((args[0]) as any),
                        $path: {node}
                    }),
                    name: (name: string) => ({
                        /**
                         * Remove an LVM thin pool.
                         * @endpoint DELETE /nodes/{node}/disks/lvmthin/{name}
                         * @allowToken 1
                         * @permissions {"check": ["perm", "/", ["Sys.Modify"]], "description": "Requires additionally 'Datastore.Allocate' on /storage when setting 'cleanup-config'"}
                         *
                         * Parameters:
                         * - `cleanup-config` (query, optional, boolean): Marks associated storage(s) as not available on this node anymore or removes them from the configuration (if configured for this node only).
                         * - `cleanup-disks` (query, optional, boolean): Also wipe disks so they can be repurposed afterwards.
                         * - `name` (path, required, string): The storage identifier.
                         * - `node` (path, required, string): The cluster node name.
                         * - `volume-group` (query, required, string): The storage identifier.
                         */
                        delete_: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/disks/lvmthin/{name}"]["DELETE"]['parameters']>>) => client.request("/nodes/{node}/disks/lvmthin/{name}", "DELETE", {
                            ...((args[0]) as any),
                            $path: {node, name}
                        }),
                    })
                },
                /**
                 * Get SMART Health of a disk.
                 * @endpoint GET /nodes/{node}/disks/smart
                 * @allowToken 1
                 * @permissions {"check": ["perm", "/", ["Sys.Audit"]]}
                 *
                 * Parameters:
                 * - `disk` (query, required, string): Block device name
                 * - `healthonly` (query, optional, boolean): If true returns only the health status
                 * - `node` (path, required, string): The cluster node name.
                 */
                smart: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/disks/smart"]["GET"]['parameters']>>) => client.request("/nodes/{node}/disks/smart", "GET", {
                    ...((args[0]) as any),
                    $path: {node}
                }),
                /**
                 * Wipe a disk or partition.
                 * @endpoint PUT /nodes/{node}/disks/wipedisk
                 * @allowToken 1
                 *
                 * Parameters:
                 * - `disk` (body, required, string): Block device name
                 * - `node` (path, required, string): The cluster node name.
                 */
                wipedisk: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/disks/wipedisk"]["PUT"]['parameters']>>) => client.request("/nodes/{node}/disks/wipedisk", "PUT", {
                    ...((args[0]) as any),
                    $path: {node}
                }),
                zfs: {
                    /**
                     * List Zpools.
                     * @endpoint GET /nodes/{node}/disks/zfs
                     * @allowToken 1
                     * @permissions {"check": ["perm", "/", ["Sys.Audit"]]}
                     *
                     * Parameters:
                     * - `node` (path, required, string): The cluster node name.
                     */
                    index: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/disks/zfs"]["GET"]['parameters']>>) => client.request("/nodes/{node}/disks/zfs", "GET", {
                        ...((args[0]) as any),
                        $path: {node}
                    }),
                    /**
                     * Create a ZFS pool.
                     * @endpoint POST /nodes/{node}/disks/zfs
                     * @allowToken 1
                     * @permissions {"check": ["perm", "/", ["Sys.Modify"]], "description": "Requires additionally 'Datastore.Allocate' on /storage when setting 'add_storage'"}
                     *
                     * Parameters:
                     * - `add_storage` (body, optional, boolean): Configure storage using the zpool.
                     * - `ashift` (body, optional, number): Pool sector size exponent.
                     * - `compression` (body, optional, "on" | "off" | "gzip" | "lz4" | "lzjb" | "zle" | "zstd"): The compression algorithm to use.
                     * - `devices` (body, required, string): The block devices you want to create the zpool on.
                     * - `draid-config` (body, optional, string)
                     * - `name` (body, required, string): The storage identifier.
                     * - `node` (path, required, string): The cluster node name.
                     * - `raidlevel` (body, required, "single" | "mirror" | "raid10" | "raidz" | "raidz2" | "raidz3" | "draid" | "draid2" | "draid3"): The RAID level to use.
                     */
                    create: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/disks/zfs"]["POST"]['parameters']>>) => client.request("/nodes/{node}/disks/zfs", "POST", {
                        ...((args[0]) as any),
                        $path: {node}
                    }),
                    name: (name: string) => ({
                        /**
                         * Destroy a ZFS pool.
                         * @endpoint DELETE /nodes/{node}/disks/zfs/{name}
                         * @allowToken 1
                         * @permissions {"check": ["perm", "/", ["Sys.Modify"]], "description": "Requires additionally 'Datastore.Allocate' on /storage when setting 'cleanup-config'"}
                         *
                         * Parameters:
                         * - `cleanup-config` (query, optional, boolean): Marks associated storage(s) as not available on this node anymore or removes them from the configuration (if configured for this node only).
                         * - `cleanup-disks` (query, optional, boolean): Also wipe disks so they can be repurposed afterwards.
                         * - `name` (path, required, string): The storage identifier.
                         * - `node` (path, required, string): The cluster node name.
                         */
                        delete: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/disks/zfs/{name}"]["DELETE"]['parameters']>>) => client.request("/nodes/{node}/disks/zfs/{name}", "DELETE", {
                            ...((args[0]) as any),
                            $path: {node, name}
                        }),
                        /**
                         * Get details about a zpool.
                         * @endpoint GET /nodes/{node}/disks/zfs/{name}
                         * @allowToken 1
                         * @permissions {"check": ["perm", "/", ["Sys.Audit"]]}
                         *
                         * Parameters:
                         * - `name` (path, required, string): The storage identifier.
                         * - `node` (path, required, string): The cluster node name.
                         */
                        get: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/disks/zfs/{name}"]["GET"]['parameters']>>) => client.request("/nodes/{node}/disks/zfs/{name}", "GET", {
                            ...((args[0]) as any),
                            $path: {node, name}
                        }),
                    })
                }
            },
            dns: {
                /**
                 * Read DNS settings.
                 * @endpoint GET /nodes/{node}/dns
                 * @allowToken 1
                 * @permissions {"check": ["perm", "/nodes/{node}", ["Sys.Audit"]]}
                 *
                 * Parameters:
                 * - `node` (path, required, string): The cluster node name.
                 */
                get: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/dns"]["GET"]['parameters']>>) => client.request("/nodes/{node}/dns", "GET", {
                    ...((args[0]) as any),
                    $path: {node}
                }),
                /**
                 * Write DNS settings.
                 * @endpoint PUT /nodes/{node}/dns
                 * @allowToken 1
                 * @permissions {"check": ["perm", "/nodes/{node}", ["Sys.Modify"]]}
                 *
                 * Parameters:
                 * - `dns1` (body, optional, string): First name server IP address.
                 * - `dns2` (body, optional, string): Second name server IP address.
                 * - `dns3` (body, optional, string): Third name server IP address.
                 * - `node` (path, required, string): The cluster node name.
                 * - `search` (body, required, string): Search domain for host-name lookup.
                 */
                update: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/dns"]["PUT"]['parameters']>>) => client.request("/nodes/{node}/dns", "PUT", {
                    ...((args[0]) as any),
                    $path: {node}
                }),
            },
            /**
             * Execute multiple commands in order, root only.
             * @endpoint POST /nodes/{node}/execute
             * @allowToken 1
             *
             * Parameters:
             * - `commands` (body, required, string): JSON encoded array of commands.
             * - `node` (path, required, string): The cluster node name.
             */
            execute: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/execute"]["POST"]['parameters']>>) => client.request("/nodes/{node}/execute", "POST", {
                ...((args[0]) as any),
                $path: {node}
            }),
            firewall: {
                /**
                 * Directory index.
                 * @endpoint GET /nodes/{node}/firewall
                 * @allowToken 1
                 * @permissions {"user": "all"}
                 *
                 * Parameters:
                 * - `node` (path, required, string): The cluster node name.
                 */
                index: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/firewall"]["GET"]['parameters']>>) => client.request("/nodes/{node}/firewall", "GET", {
                    ...((args[0]) as any),
                    $path: {node}
                }),
                /**
                 * Read firewall log
                 * @endpoint GET /nodes/{node}/firewall/log
                 * @allowToken 1
                 * @permissions {"check": ["perm", "/nodes/{node}", ["Sys.Syslog"]]}
                 *
                 * Parameters:
                 * - `limit` (query, optional, number)
                 * - `node` (path, required, string): The cluster node name.
                 * - `since` (query, optional, number): Display log since this UNIX epoch.
                 * - `start` (query, optional, number)
                 * - `until` (query, optional, number): Display log until this UNIX epoch.
                 */
                log: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/firewall/log"]["GET"]['parameters']>>) => client.request("/nodes/{node}/firewall/log", "GET", {
                    ...((args[0]) as any),
                    $path: {node}
                }),
                options: {
                    /**
                     * Get host firewall options.
                     * @endpoint GET /nodes/{node}/firewall/options
                     * @allowToken 1
                     * @permissions {"check": ["perm", "/nodes/{node}", ["Sys.Audit"]]}
                     *
                     * Parameters:
                     * - `node` (path, required, string): The cluster node name.
                     */
                    get: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/firewall/options"]["GET"]['parameters']>>) => client.request("/nodes/{node}/firewall/options", "GET", {
                        ...((args[0]) as any),
                        $path: {node}
                    }),
                    /**
                     * Set Firewall options.
                     * @endpoint PUT /nodes/{node}/firewall/options
                     * @allowToken 1
                     * @permissions {"check": ["perm", "/nodes/{node}", ["Sys.Modify"]]}
                     *
                     * Parameters:
                     * - `delete` (body, optional, string): A list of settings you want to delete.
                     * - `digest` (body, optional, string): Prevent changes if current configuration file has a different digest. This can be used to prevent concurrent modifications.
                     * - `enable` (body, optional, boolean): Enable host firewall rules.
                     * - `log_level_forward` (body, optional, "emerg" | "alert" | "crit" | "err" | "warning" | "notice" | "info" | "debug" | "nolog"): Log level for forwarded traffic.
                     * - `log_level_in` (body, optional, "emerg" | "alert" | "crit" | "err" | "warning" | "notice" | "info" | "debug" | "nolog"): Log level for incoming traffic.
                     * - `log_level_out` (body, optional, "emerg" | "alert" | "crit" | "err" | "warning" | "notice" | "info" | "debug" | "nolog"): Log level for outgoing traffic.
                     * - `log_nf_conntrack` (body, optional, boolean): Enable logging of conntrack information.
                     * - `ndp` (body, optional, boolean): Enable NDP (Neighbor Discovery Protocol).
                     * - `nf_conntrack_allow_invalid` (body, optional, boolean): Allow invalid packets on connection tracking.
                     * - `nf_conntrack_helpers` (body, optional, string): Enable conntrack helpers for specific protocols. Supported protocols: amanda, ftp, irc, netbios-ns, pptp, sane, sip, snmp, tftp
                     * - `nf_conntrack_max` (body, optional, number): Maximum number of tracked connections.
                     * - `nf_conntrack_tcp_timeout_established` (body, optional, number): Conntrack established timeout.
                     * - `nf_conntrack_tcp_timeout_syn_recv` (body, optional, number): Conntrack syn recv timeout.
                     * - `nftables` (body, optional, boolean): Enable nftables based firewall (tech preview)
                     * - `node` (path, required, string): The cluster node name.
                     * - `nosmurfs` (body, optional, boolean): Enable SMURFS filter.
                     * - `protection_synflood` (body, optional, boolean): Enable synflood protection
                     * - `protection_synflood_burst` (body, optional, number): Synflood protection rate burst by ip src.
                     * - `protection_synflood_rate` (body, optional, number): Synflood protection rate syn/sec by ip src.
                     * - `smurf_log_level` (body, optional, "emerg" | "alert" | "crit" | "err" | "warning" | "notice" | "info" | "debug" | "nolog"): Log level for SMURFS filter.
                     * - `tcp_flags_log_level` (body, optional, "emerg" | "alert" | "crit" | "err" | "warning" | "notice" | "info" | "debug" | "nolog"): Log level for illegal tcp flags filter.
                     * - `tcpflags` (body, optional, boolean): Filter illegal combinations of TCP flags.
                     */
                    set: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/firewall/options"]["PUT"]['parameters']>>) => client.request("/nodes/{node}/firewall/options", "PUT", {
                        ...((args[0]) as any),
                        $path: {node}
                    }),
                },
                rules: {
                    /**
                     * List rules.
                     * @endpoint GET /nodes/{node}/firewall/rules
                     * @allowToken 1
                     * @permissions {"check": ["perm", "/nodes/{node}", ["Sys.Audit"]]}
                     *
                     * Parameters:
                     * - `node` (path, required, string): The cluster node name.
                     */
                    list: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/firewall/rules"]["GET"]['parameters']>>) => client.request("/nodes/{node}/firewall/rules", "GET", {
                        ...((args[0]) as any),
                        $path: {node}
                    }),
                    /**
                     * Create new rule.
                     * @endpoint POST /nodes/{node}/firewall/rules
                     * @allowToken 1
                     * @permissions {"check": ["perm", "/nodes/{node}", ["Sys.Modify"]]}
                     *
                     * Parameters:
                     * - `action` (body, required, string): Rule action ('ACCEPT', 'DROP', 'REJECT') or security group name.
                     * - `comment` (body, optional, string): Descriptive comment.
                     * - `dest` (body, optional, string): Restrict packet destination address. This can refer to a single IP address, an IP set ('+ipsetname') or an IP alias definition. You can also specify an address range like '20.34.101.207-201.3.9.99', or a list of IP addresses and networks (entries are separated by comma). Please do not mix IPv4 and IPv6 addresses inside such lists.
                     * - `digest` (body, optional, string): Prevent changes if current configuration file has a different digest. This can be used to prevent concurrent modifications.
                     * - `dport` (body, optional, string): Restrict TCP/UDP destination port. You can use service names or simple numbers (0-65535), as defined in '/etc/services'. Port ranges can be specified with '\d+:\d+', for example '80:85', and you can use comma separated list to match several ports or ranges.
                     * - `enable` (body, optional, number): Flag to enable/disable a rule.
                     * - `icmp-type` (body, optional, string): Specify icmp-type. Only valid if proto equals 'icmp' or 'icmpv6'/'ipv6-icmp'.
                     * - `iface` (body, optional, string): Network interface name. You have to use network configuration key names for VMs and containers ('net\d+'). Host related rules can use arbitrary strings.
                     * - `log` (body, optional, "emerg" | "alert" | "crit" | "err" | "warning" | "notice" | "info" | "debug" | "nolog"): Log level for firewall rule.
                     * - `macro` (body, optional, string): Use predefined standard macro.
                     * - `node` (path, required, string): The cluster node name.
                     * - `pos` (body, optional, number): Update rule at position <pos>.
                     * - `proto` (body, optional, string): IP protocol. You can use protocol names ('tcp'/'udp') or simple numbers, as defined in '/etc/protocols'.
                     * - `source` (body, optional, string): Restrict packet source address. This can refer to a single IP address, an IP set ('+ipsetname') or an IP alias definition. You can also specify an address range like '20.34.101.207-201.3.9.99', or a list of IP addresses and networks (entries are separated by comma). Please do not mix IPv4 and IPv6 addresses inside such lists.
                     * - `sport` (body, optional, string): Restrict TCP/UDP source port. You can use service names or simple numbers (0-65535), as defined in '/etc/services'. Port ranges can be specified with '\d+:\d+', for example '80:85', and you can use comma separated list to match several ports or ranges.
                     * - `type` (body, required, "in" | "out" | "forward" | "group"): Rule type.
                     */
                    create: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/firewall/rules"]["POST"]['parameters']>>) => client.request("/nodes/{node}/firewall/rules", "POST", {
                        ...((args[0]) as any),
                        $path: {node}
                    }),
                    pos: (pos: number) => ({
                        /**
                         * Delete rule.
                         * @endpoint DELETE /nodes/{node}/firewall/rules/{pos}
                         * @allowToken 1
                         * @permissions {"check": ["perm", "/nodes/{node}", ["Sys.Modify"]]}
                         *
                         * Parameters:
                         * - `digest` (query, optional, string): Prevent changes if current configuration file has a different digest. This can be used to prevent concurrent modifications.
                         * - `node` (path, required, string): The cluster node name.
                         * - `pos` (path, optional, number): Update rule at position <pos>.
                         */
                        delete: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/firewall/rules/{pos}"]["DELETE"]['parameters']>>) => client.request("/nodes/{node}/firewall/rules/{pos}", "DELETE", {
                            ...((args[0]) as any),
                            $path: {node, pos}
                        }),
                        /**
                         * Get single rule data.
                         * @endpoint GET /nodes/{node}/firewall/rules/{pos}
                         * @allowToken 1
                         * @permissions {"check": ["perm", "/nodes/{node}", ["Sys.Audit"]]}
                         *
                         * Parameters:
                         * - `node` (path, required, string): The cluster node name.
                         * - `pos` (path, optional, number): Update rule at position <pos>.
                         */
                        get: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/firewall/rules/{pos}"]["GET"]['parameters']>>) => client.request("/nodes/{node}/firewall/rules/{pos}", "GET", {
                            ...((args[0]) as any),
                            $path: {node, pos}
                        }),
                        /**
                         * Modify rule data.
                         * @endpoint PUT /nodes/{node}/firewall/rules/{pos}
                         * @allowToken 1
                         * @permissions {"check": ["perm", "/nodes/{node}", ["Sys.Modify"]]}
                         *
                         * Parameters:
                         * - `action` (body, optional, string): Rule action ('ACCEPT', 'DROP', 'REJECT') or security group name.
                         * - `comment` (body, optional, string): Descriptive comment.
                         * - `delete` (body, optional, string): A list of settings you want to delete.
                         * - `dest` (body, optional, string): Restrict packet destination address. This can refer to a single IP address, an IP set ('+ipsetname') or an IP alias definition. You can also specify an address range like '20.34.101.207-201.3.9.99', or a list of IP addresses and networks (entries are separated by comma). Please do not mix IPv4 and IPv6 addresses inside such lists.
                         * - `digest` (body, optional, string): Prevent changes if current configuration file has a different digest. This can be used to prevent concurrent modifications.
                         * - `dport` (body, optional, string): Restrict TCP/UDP destination port. You can use service names or simple numbers (0-65535), as defined in '/etc/services'. Port ranges can be specified with '\d+:\d+', for example '80:85', and you can use comma separated list to match several ports or ranges.
                         * - `enable` (body, optional, number): Flag to enable/disable a rule.
                         * - `icmp-type` (body, optional, string): Specify icmp-type. Only valid if proto equals 'icmp' or 'icmpv6'/'ipv6-icmp'.
                         * - `iface` (body, optional, string): Network interface name. You have to use network configuration key names for VMs and containers ('net\d+'). Host related rules can use arbitrary strings.
                         * - `log` (body, optional, "emerg" | "alert" | "crit" | "err" | "warning" | "notice" | "info" | "debug" | "nolog"): Log level for firewall rule.
                         * - `macro` (body, optional, string): Use predefined standard macro.
                         * - `moveto` (body, optional, number): Move rule to new position <moveto>. Other arguments are ignored.
                         * - `node` (path, required, string): The cluster node name.
                         * - `pos` (path, optional, number): Update rule at position <pos>.
                         * - `proto` (body, optional, string): IP protocol. You can use protocol names ('tcp'/'udp') or simple numbers, as defined in '/etc/protocols'.
                         * - `source` (body, optional, string): Restrict packet source address. This can refer to a single IP address, an IP set ('+ipsetname') or an IP alias definition. You can also specify an address range like '20.34.101.207-201.3.9.99', or a list of IP addresses and networks (entries are separated by comma). Please do not mix IPv4 and IPv6 addresses inside such lists.
                         * - `sport` (body, optional, string): Restrict TCP/UDP source port. You can use service names or simple numbers (0-65535), as defined in '/etc/services'. Port ranges can be specified with '\d+:\d+', for example '80:85', and you can use comma separated list to match several ports or ranges.
                         * - `type` (body, optional, "in" | "out" | "forward" | "group"): Rule type.
                         */
                        update: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/firewall/rules/{pos}"]["PUT"]['parameters']>>) => client.request("/nodes/{node}/firewall/rules/{pos}", "PUT", {
                            ...((args[0]) as any),
                            $path: {node, pos}
                        }),
                    })
                }
            },
            hardware: {
                /**
                 * Index of hardware types
                 * @endpoint GET /nodes/{node}/hardware
                 * @allowToken 1
                 * @permissions {"user": "all"}
                 *
                 * Parameters:
                 * - `node` (path, required, string): The cluster node name.
                 */
                index: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/hardware"]["GET"]['parameters']>>) => client.request("/nodes/{node}/hardware", "GET", {
                    ...((args[0]) as any),
                    $path: {node}
                }),
                pci: {
                    /**
                     * List local PCI devices.
                     * @endpoint GET /nodes/{node}/hardware/pci
                     * @allowToken 1
                     * @permissions {"check": ["perm", "/", ["Sys.Audit", "Sys.Modify"], "any", 1]}
                     *
                     * Parameters:
                     * - `node` (path, required, string): The cluster node name.
                     * - `pci-class-blacklist` (query, optional, string): A list of blacklisted PCI classes, which will not be returned. Following are filtered by default: Memory Controller (05), Bridge (06) and Processor (0b).
                     * - `verbose` (query, optional, boolean): If disabled, does only print the PCI IDs. Otherwise, additional information like vendor and device will be returned.
                     */
                    pci_scan: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/hardware/pci"]["GET"]['parameters']>>) => client.request("/nodes/{node}/hardware/pci", "GET", {
                        ...((args[0]) as any),
                        $path: {node}
                    }),
                    pci_id_or_mapping: (pci_id_or_mapping: string) => ({
                        /**
                         * Index of available pci methods
                         * @endpoint GET /nodes/{node}/hardware/pci/{pci-id-or-mapping}
                         * @allowToken 1
                         * @permissions {"user": "all"}
                         *
                         * Parameters:
                         * - `node` (path, required, string): The cluster node name.
                         * - `pci-id-or-mapping` (path, required, string)
                         */
                        pci_index: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/hardware/pci/{pci-id-or-mapping}"]["GET"]['parameters']>>) => client.request("/nodes/{node}/hardware/pci/{pci-id-or-mapping}", "GET", {
                            ...((args[0]) as any),
                            $path: {node, 'pci-id-or-mapping': pci_id_or_mapping}
                        }),
                        /**
                         * List mediated device types for given PCI device.
                         * @endpoint GET /nodes/{node}/hardware/pci/{pci-id-or-mapping}/mdev
                         * @allowToken 1
                         * @permissions {"check": ["perm", "/", ["Sys.Audit", "Sys.Modify"], "any", 1]}
                         *
                         * Parameters:
                         * - `node` (path, required, string): The cluster node name.
                         * - `pci-id-or-mapping` (path, required, string): The PCI ID or mapping to list the mdev types for.
                         */
                        mdev: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/hardware/pci/{pci-id-or-mapping}/mdev"]["GET"]['parameters']>>) => client.request("/nodes/{node}/hardware/pci/{pci-id-or-mapping}/mdev", "GET", {
                            ...((args[0]) as any),
                            $path: {node, 'pci-id-or-mapping': pci_id_or_mapping}
                        }),

                    })
                },
                /**
                 * List local USB devices.
                 * @endpoint GET /nodes/{node}/hardware/usb
                 * @allowToken 1
                 * @permissions {"check": ["perm", "/", ["Sys.Modify"]]}
                 *
                 * Parameters:
                 * - `node` (path, required, string): The cluster node name.
                 */
                usb: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/hardware/usb"]["GET"]['parameters']>>) => client.request("/nodes/{node}/hardware/usb", "GET", {
                    ...((args[0]) as any),
                    $path: {node}
                }),
            },
            hosts: {
                /**
                 * Get the content of /etc/hosts.
                 * @endpoint GET /nodes/{node}/hosts
                 * @allowToken 1
                 * @permissions {"check": ["perm", "/", ["Sys.Audit"]]}
                 *
                 * Parameters:
                 * - `node` (path, required, string): The cluster node name.
                 */
                list: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/hosts"]["GET"]['parameters']>>) => client.request("/nodes/{node}/hosts", "GET", {
                    ...((args[0]) as any),
                    $path: {node}
                }),
                /**
                 * Write /etc/hosts.
                 * @endpoint POST /nodes/{node}/hosts
                 * @allowToken 1
                 * @permissions {"check": ["perm", "/nodes/{node}", ["Sys.Modify"]]}
                 *
                 * Parameters:
                 * - `data` (body, required, string): The target content of /etc/hosts.
                 * - `digest` (body, optional, string): Prevent changes if current configuration file has a different digest. This can be used to prevent concurrent modifications.
                 * - `node` (path, required, string): The cluster node name.
                 */
                write: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/hosts"]["POST"]['parameters']>>) => client.request("/nodes/{node}/hosts", "POST", {
                    ...((args[0]) as any),
                    $path: {node}
                }),
            },
            /**
             * Read Journal
             * @endpoint GET /nodes/{node}/journal
             * @allowToken 1
             * @permissions {"check": ["perm", "/nodes/{node}", ["Sys.Syslog"]]}
             *
             * Parameters:
             * - `endcursor` (query, optional, string): End before the given Cursor. Conflicts with 'until'
             * - `lastentries` (query, optional, number): Limit to the last X lines. Conflicts with a range.
             * - `node` (path, required, string): The cluster node name.
             * - `since` (query, optional, number): Display all log since this UNIX epoch. Conflicts with 'startcursor'.
             * - `startcursor` (query, optional, string): Start after the given Cursor. Conflicts with 'since'
             * - `until` (query, optional, number): Display all log until this UNIX epoch. Conflicts with 'endcursor'.
             */
            journal: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/journal"]["GET"]['parameters']>>) => client.request("/nodes/{node}/journal", "GET", {
                ...((args[0]) as any),
                $path: {node}
            }),
            lxc: {
                /**
                 * LXC container index (per node).
                 * @endpoint GET /nodes/{node}/lxc
                 * @allowToken 1
                 * @permissions {"description": "Only list CTs where you have VM.Audit permission on /vms/<vmid>.", "user": "all"}
                 *
                 * Parameters:
                 * - `node` (path, required, string): The cluster node name.
                 */
                list: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/lxc"]["GET"]['parameters']>>) => client.request("/nodes/{node}/lxc", "GET", {
                    ...((args[0]) as any),
                    $path: {node}
                }),
                /**
                 * Create or restore a container.
                 * @endpoint POST /nodes/{node}/lxc
                 * @allowToken 1
                 * @permissions {"description": "You need 'VM.Allocate' permission on /vms/{vmid} or on the VM pool /pool/{pool}. For restore, it is enough if the user has 'VM.Backup' permission and the VM already exists. You also need 'Datastore.AllocateSpace' permissions on the storage. For privileged containers, 'Sys.Modify' permissions on '/' are required.", "user": "all"}
                 *
                 * Parameters:
                 * - `arch` (body, optional, "amd64" | "i386" | "arm64" | "armhf" | "riscv32" | "riscv64"): OS architecture type.
                 * - `bwlimit` (body, optional, number): Override I/O bandwidth limit (in KiB/s).
                 * - `cmode` (body, optional, "shell" | "console" | "tty"): Console mode. By default, the console command tries to open a connection to one of the available tty devices. By setting cmode to 'console' it tries to attach to /dev/console instead. If you set cmode to 'shell', it simply invokes a shell inside the container (no login).
                 * - `console` (body, optional, boolean): Attach a console device (/dev/console) to the container.
                 * - `cores` (body, optional, number): The number of cores assigned to the container. A container can use all available cores by default.
                 * - `cpulimit` (body, optional, number): Limit of CPU usage.

                 NOTE: If the computer has 2 CPUs, it has a total of '2' CPU time. Value '0' indicates no CPU limit.
                 * - `cpuunits` (body, optional, number): CPU weight for a container, will be clamped to [1, 10000] in cgroup v2.
                 * - `debug` (body, optional, boolean): Try to be more verbose. For now this only enables debug log-level on start.
                 * - `description` (body, optional, string): Description for the Container. Shown in the web-interface CT's summary. This is saved as comment inside the configuration file.
                 * - `dev[n]` (body, optional, string): Device to pass through to the container
                 * - `entrypoint` (body, optional, string): Command to run as init, optionally with arguments; may start with an absolute path, relative path, or a binary in $PATH.
                 * - `env` (body, optional, string): The container runtime environment as NUL-separated list. Replaces any lxc.environment.runtime entries in the config.
                 * - `features` (body, optional, string): Allow containers access to advanced features.
                 * - `force` (body, optional, boolean): Allow to overwrite existing container.
                 * - `ha-managed` (body, optional, boolean): Add the CT as a HA resource after it was created.
                 * - `hookscript` (body, optional, string): Script that will be executed during various steps in the containers lifetime.
                 * - `hostname` (body, optional, string): Set a host name for the container.
                 * - `ignore-unpack-errors` (body, optional, boolean): Ignore errors when extracting the template.
                 * - `lock` (body, optional, "backup" | "create" | "destroyed" | "disk" | "fstrim" | "migrate" | "mounted" | "rollback" | "snapshot" | "snapshot-delete"): Lock/unlock the container.
                 * - `memory` (body, optional, number): Amount of RAM for the container in MB.
                 * - `mp[n]` (body, optional, string): Use volume as container mount point. Use the special syntax STORAGE_ID:SIZE_IN_GiB to allocate a new volume.
                 * - `nameserver` (body, optional, string): Sets DNS server IP address for a container. Create will automatically use the setting from the host if you neither set searchdomain nor nameserver.
                 * - `net[n]` (body, optional, string): Specifies network interfaces for the container.
                 * - `node` (path, required, string): The cluster node name.
                 * - `onboot` (body, optional, boolean): Specifies whether a container will be started during system bootup.
                 * - `ostemplate` (body, required, string): The OS template or backup file.
                 * - `ostype` (body, optional, "debian" | "devuan" | "ubuntu" | "centos" | "fedora" | "opensuse" | "archlinux" | "alpine" | "gentoo" | "nixos" | "unmanaged"): OS type. This is used to setup configuration inside the container, and corresponds to lxc setup scripts in /usr/share/lxc/config/<ostype>.common.conf. Value 'unmanaged' can be used to skip and OS specific setup.
                 * - `password` (body, optional, string): Sets root password inside container.
                 * - `pool` (body, optional, string): Add the VM to the specified pool.
                 * - `protection` (body, optional, boolean): Sets the protection flag of the container. This will prevent the CT or CT's disk remove/update operation.
                 * - `restore` (body, optional, boolean): Mark this as restore task.
                 * - `rootfs` (body, optional, string): Use volume as container root.
                 * - `searchdomain` (body, optional, string): Sets DNS search domains for a container. Create will automatically use the setting from the host if you neither set searchdomain nor nameserver.
                 * - `ssh-public-keys` (body, optional, string): Setup public SSH keys (one key per line, OpenSSH format).
                 * - `start` (body, optional, boolean): Start the CT after its creation finished successfully.
                 * - `startup` (body, optional, string): Startup and shutdown behavior. Order is a non-negative number defining the general startup order. Shutdown in done with reverse ordering. Additionally you can set the 'up' or 'down' delay in seconds, which specifies a delay to wait before the next VM is started or stopped.
                 * - `storage` (body, optional, string): Default Storage.
                 * - `swap` (body, optional, number): Amount of SWAP for the container in MB.
                 * - `tags` (body, optional, string): Tags of the Container. This is only meta information.
                 * - `template` (body, optional, boolean): Enable/disable Template.
                 * - `timezone` (body, optional, string): Time zone to use in the container. If option isn't set, then nothing will be done. Can be set to 'host' to match the host time zone, or an arbitrary time zone option from /usr/share/zoneinfo/zone.tab
                 * - `tty` (body, optional, number): Specify the number of tty available to the container
                 * - `unique` (body, optional, boolean): Assign a unique random ethernet address.
                 * - `unprivileged` (body, optional, boolean): Makes the container run as unprivileged user. For creation, the default is 1. For restore, the default is the value from the backup. (Should not be modified manually.)
                 * - `unused[n]` (body, optional, string): Reference to unused volumes. This is used internally, and should not be modified manually.
                 * - `vmid` (body, required, number): The (unique) ID of the VM.
                 */
                create: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/lxc"]["POST"]['parameters']>>) => client.request("/nodes/{node}/lxc", "POST", {
                    ...((args[0]) as any),
                    $path: {node}
                }),
                crate: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/lxc"]["POST"]['parameters']>>) => client.request("/nodes/{node}/lxc", "POST", {
                    ...((args[0]) as any),
                    $path: {node}
                }),
                id: (vmid: number | string) => ({
                    /**
                     * Destroy the container (also delete all uses files).
                     * @endpoint DELETE /nodes/{node}/lxc/{vmid}
                     * @allowToken 1
                     * @permissions {"check": ["perm", "/vms/{vmid}", ["VM.Allocate"]]}
                     *
                     * Parameters:
                     * - `destroy-unreferenced-disks` (query, optional, boolean): If set, destroy additionally all disks with the VMID from all enabled storages which are not referenced in the config.
                     * - `force` (query, optional, boolean): Force destroy, even if running.
                     * - `node` (path, required, string): The cluster node name.
                     * - `purge` (query, optional, boolean): Remove container from all related configurations. For example, backup jobs, replication jobs or HA. Related ACLs and Firewall entries will *always* be removed.
                     * - `vmid` (path, required, number): The (unique) ID of the VM.
                     */
                    destroy: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/lxc/{vmid}"]["DELETE"]['parameters']>>) => client.request("/nodes/{node}/lxc/{vmid}", "DELETE", {
                        ...((args[0]) as any),
                        $path: {node, vmid: parseInt(vmid.toString())}
                    }),
                    /**
                     * Directory index
                     * @endpoint GET /nodes/{node}/lxc/{vmid}
                     * @allowToken 1
                     * @permissions {"user": "all"}
                     *
                     * Parameters:
                     * - `node` (path, required, string): The cluster node name.
                     * - `vmid` (path, required, number): The (unique) ID of the VM.
                     */
                    diridx: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/lxc/{vmid}"]["GET"]['parameters']>>) => client.request("/nodes/{node}/lxc/{vmid}", "GET", {
                        ...((args[0]) as any),
                        $path: {node, vmid: parseInt(vmid.toString())}
                    }),
                    /**
                     * Create a container clone/copy
                     * @endpoint POST /nodes/{node}/lxc/{vmid}/clone
                     * @allowToken 1
                     * @permissions {"check": ["and", ["perm", "/vms/{vmid}", ["VM.Clone"]], ["or", ["perm", "/vms/{newid}", ["VM.Allocate"]], ["perm", "/pool/{pool}", ["VM.Allocate"], "require_param", "pool"]]], "description": "You need 'VM.Clone' permissions on /vms/{vmid}, and 'VM.Allocate' permissions on /vms/{newid} (or on the VM pool /pool/{pool}). You also need 'Datastore.AllocateSpace' on any used storage, and 'SDN.Use' on any bridge."}
                     *
                     * Parameters:
                     * - `bwlimit` (body, optional, number): Override I/O bandwidth limit (in KiB/s).
                     * - `description` (body, optional, string): Description for the new CT.
                     * - `full` (body, optional, boolean): Create a full copy of all disks. This is always done when you clone a normal CT. For CT templates, we try to create a linked clone by default.
                     * - `hostname` (body, optional, string): Set a hostname for the new CT.
                     * - `newid` (body, required, number): VMID for the clone.
                     * - `node` (path, required, string): The cluster node name.
                     * - `pool` (body, optional, string): Add the new CT to the specified pool.
                     * - `snapname` (body, optional, string): The name of the snapshot.
                     * - `storage` (body, optional, string): Target storage for full clone.
                     * - `target` (body, optional, string): Target node. Only allowed if the original VM is on shared storage.
                     * - `vmid` (path, required, number): The (unique) ID of the VM.
                     */
                    clone: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/lxc/{vmid}/clone"]["POST"]['parameters']>>) => client.request("/nodes/{node}/lxc/{vmid}/clone", "POST", {
                        ...((args[0]) as any),
                        $path: {node, vmid: parseInt(vmid.toString())}
                    }),
                    config: {
                        /**
                         * Get container configuration.
                         * @endpoint GET /nodes/{node}/lxc/{vmid}/config
                         * @allowToken 1
                         * @permissions {"check": ["perm", "/vms/{vmid}", ["VM.Audit"]]}
                         *
                         * Parameters:
                         * - `current` (query, optional, boolean): Get current values (instead of pending values).
                         * - `node` (path, required, string): The cluster node name.
                         * - `snapshot` (query, optional, string): Fetch config values from given snapshot.
                         * - `vmid` (path, required, number): The (unique) ID of the VM.
                         */
                        get: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/lxc/{vmid}/config"]["GET"]['parameters']>>) => client.request("/nodes/{node}/lxc/{vmid}/config", "GET", {
                            ...((args[0]) as any),
                            $path: {node, vmid: parseInt(vmid.toString())}
                        }),
                        /**
                         * Set container options.
                         * @endpoint PUT /nodes/{node}/lxc/{vmid}/config
                         * @allowToken 1
                         * @permissions {"check": ["perm", "/vms/{vmid}", ["VM.Config.Disk", "VM.Config.CPU", "VM.Config.Memory", "VM.Config.Network", "VM.Config.Options"], "any", 1], "description": "non-volume mount points in rootfs and mp[n] are restricted to root@pam"}
                         *
                         * Parameters:
                         * - `arch` (body, optional, "amd64" | "i386" | "arm64" | "armhf" | "riscv32" | "riscv64"): OS architecture type.
                         * - `cmode` (body, optional, "shell" | "console" | "tty"): Console mode. By default, the console command tries to open a connection to one of the available tty devices. By setting cmode to 'console' it tries to attach to /dev/console instead. If you set cmode to 'shell', it simply invokes a shell inside the container (no login).
                         * - `console` (body, optional, boolean): Attach a console device (/dev/console) to the container.
                         * - `cores` (body, optional, number): The number of cores assigned to the container. A container can use all available cores by default.
                         * - `cpulimit` (body, optional, number): Limit of CPU usage.

                         NOTE: If the computer has 2 CPUs, it has a total of '2' CPU time. Value '0' indicates no CPU limit.
                         * - `cpuunits` (body, optional, number): CPU weight for a container, will be clamped to [1, 10000] in cgroup v2.
                         * - `debug` (body, optional, boolean): Try to be more verbose. For now this only enables debug log-level on start.
                         * - `delete` (body, optional, string): A list of settings you want to delete.
                         * - `description` (body, optional, string): Description for the Container. Shown in the web-interface CT's summary. This is saved as comment inside the configuration file.
                         * - `dev[n]` (body, optional, string): Device to pass through to the container
                         * - `digest` (body, optional, string): Prevent changes if current configuration file has different SHA1 digest. This can be used to prevent concurrent modifications.
                         * - `entrypoint` (body, optional, string): Command to run as init, optionally with arguments; may start with an absolute path, relative path, or a binary in $PATH.
                         * - `env` (body, optional, string): The container runtime environment as NUL-separated list. Replaces any lxc.environment.runtime entries in the config.
                         * - `features` (body, optional, string): Allow containers access to advanced features.
                         * - `hookscript` (body, optional, string): Script that will be executed during various steps in the containers lifetime.
                         * - `hostname` (body, optional, string): Set a host name for the container.
                         * - `lock` (body, optional, "backup" | "create" | "destroyed" | "disk" | "fstrim" | "migrate" | "mounted" | "rollback" | "snapshot" | "snapshot-delete"): Lock/unlock the container.
                         * - `memory` (body, optional, number): Amount of RAM for the container in MB.
                         * - `mp[n]` (body, optional, string): Use volume as container mount point. Use the special syntax STORAGE_ID:SIZE_IN_GiB to allocate a new volume.
                         * - `nameserver` (body, optional, string): Sets DNS server IP address for a container. Create will automatically use the setting from the host if you neither set searchdomain nor nameserver.
                         * - `net[n]` (body, optional, string): Specifies network interfaces for the container.
                         * - `node` (path, required, string): The cluster node name.
                         * - `onboot` (body, optional, boolean): Specifies whether a container will be started during system bootup.
                         * - `ostype` (body, optional, "debian" | "devuan" | "ubuntu" | "centos" | "fedora" | "opensuse" | "archlinux" | "alpine" | "gentoo" | "nixos" | "unmanaged"): OS type. This is used to setup configuration inside the container, and corresponds to lxc setup scripts in /usr/share/lxc/config/<ostype>.common.conf. Value 'unmanaged' can be used to skip and OS specific setup.
                         * - `protection` (body, optional, boolean): Sets the protection flag of the container. This will prevent the CT or CT's disk remove/update operation.
                         * - `revert` (body, optional, string): Revert a pending change.
                         * - `rootfs` (body, optional, string): Use volume as container root.
                         * - `searchdomain` (body, optional, string): Sets DNS search domains for a container. Create will automatically use the setting from the host if you neither set searchdomain nor nameserver.
                         * - `startup` (body, optional, string): Startup and shutdown behavior. Order is a non-negative number defining the general startup order. Shutdown in done with reverse ordering. Additionally you can set the 'up' or 'down' delay in seconds, which specifies a delay to wait before the next VM is started or stopped.
                         * - `swap` (body, optional, number): Amount of SWAP for the container in MB.
                         * - `tags` (body, optional, string): Tags of the Container. This is only meta information.
                         * - `template` (body, optional, boolean): Enable/disable Template.
                         * - `timezone` (body, optional, string): Time zone to use in the container. If option isn't set, then nothing will be done. Can be set to 'host' to match the host time zone, or an arbitrary time zone option from /usr/share/zoneinfo/zone.tab
                         * - `tty` (body, optional, number): Specify the number of tty available to the container
                         * - `unprivileged` (body, optional, boolean): Makes the container run as unprivileged user. For creation, the default is 1. For restore, the default is the value from the backup. (Should not be modified manually.)
                         * - `unused[n]` (body, optional, string): Reference to unused volumes. This is used internally, and should not be modified manually.
                         * - `vmid` (path, required, number): The (unique) ID of the VM.
                         */
                        update: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/lxc/{vmid}/config"]["PUT"]['parameters']>>) => client.request("/nodes/{node}/lxc/{vmid}/config", "PUT", {
                            ...((args[0]) as any),
                            $path: {node, vmid: parseInt(vmid.toString())}
                        }),
                    },
                    /**
                     * Check if feature for virtual machine is available.
                     * @endpoint GET /nodes/{node}/lxc/{vmid}/feature
                     * @allowToken 1
                     * @permissions {"check": ["perm", "/vms/{vmid}", ["VM.Audit"]]}
                     *
                     * Parameters:
                     * - `feature` (query, required, "snapshot" | "clone" | "copy"): Feature to check.
                     * - `node` (path, required, string): The cluster node name.
                     * - `snapname` (query, optional, string): The name of the snapshot.
                     * - `vmid` (path, required, number): The (unique) ID of the VM.
                     */
                    feature: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/lxc/{vmid}/feature"]["GET"]['parameters']>>) => client.request("/nodes/{node}/lxc/{vmid}/feature", "GET", {
                        ...((args[0]) as any),
                        $path: {node, vmid: parseInt(vmid.toString())}
                    }),
                    firewall: {
                        /**
                         * Directory index.
                         * @endpoint GET /nodes/{node}/lxc/{vmid}/firewall
                         * @allowToken 1
                         * @permissions {"user": "all"}
                         *
                         * Parameters:
                         * - `node` (path, required, string): The cluster node name.
                         * - `vmid` (path, required, number): The (unique) ID of the VM.
                         */
                        index: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/lxc/{vmid}/firewall"]["GET"]['parameters']>>) => client.request("/nodes/{node}/lxc/{vmid}/firewall", "GET", {
                            ...((args[0]) as any),
                            $path: {node, vmid: parseInt(vmid.toString())}
                        }),
                        aliases: {
                            /**
                             * List aliases
                             * @endpoint GET /nodes/{node}/lxc/{vmid}/firewall/aliases
                             * @allowToken 1
                             * @permissions {"check": ["perm", "/vms/{vmid}", ["VM.Audit"]]}
                             *
                             * Parameters:
                             * - `node` (path, required, string): The cluster node name.
                             * - `vmid` (path, required, number): The (unique) ID of the VM.
                             */
                            list: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/lxc/{vmid}/firewall/aliases"]["GET"]['parameters']>>) => client.request("/nodes/{node}/lxc/{vmid}/firewall/aliases", "GET", {
                                ...((args[0]) as any),
                                $path: {node, vmid: parseInt(vmid.toString())}
                            }),
                            /**
                             * Create IP or Network Alias.
                             * @endpoint POST /nodes/{node}/lxc/{vmid}/firewall/aliases
                             * @allowToken 1
                             * @permissions {"check": ["perm", "/vms/{vmid}", ["VM.Config.Network"]]}
                             *
                             * Parameters:
                             * - `cidr` (body, required, string): Network/IP specification in CIDR format.
                             * - `comment` (body, optional, string)
                             * - `name` (body, required, string): Alias name.
                             * - `node` (path, required, string): The cluster node name.
                             * - `vmid` (path, required, number): The (unique) ID of the VM.
                             */
                            create: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/lxc/{vmid}/firewall/aliases"]["POST"]['parameters']>>) => client.request("/nodes/{node}/lxc/{vmid}/firewall/aliases", "POST", {
                                ...((args[0]) as any),
                                $path: {node, vmid: parseInt(vmid.toString())}
                            }),
                            alias: (name: string) => ({
                                /**
                                 * Remove IP or Network alias.
                                 * @endpoint DELETE /nodes/{node}/lxc/{vmid}/firewall/aliases/{name}
                                 * @allowToken 1
                                 * @permissions {"check": ["perm", "/vms/{vmid}", ["VM.Config.Network"]]}
                                 *
                                 * Parameters:
                                 * - `digest` (query, optional, string): Prevent changes if current configuration file has a different digest. This can be used to prevent concurrent modifications.
                                 * - `name` (path, required, string): Alias name.
                                 * - `node` (path, required, string): The cluster node name.
                                 * - `vmid` (path, required, number): The (unique) ID of the VM.
                                 */
                                remove: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/lxc/{vmid}/firewall/aliases/{name}"]["DELETE"]['parameters']>>) => client.request("/nodes/{node}/lxc/{vmid}/firewall/aliases/{name}", "DELETE", {
                                    ...((args[0]) as any),
                                    $path: {node, vmid: parseInt(vmid.toString()), name}
                                }),
                                /**
                                 * Read alias.
                                 * @endpoint GET /nodes/{node}/lxc/{vmid}/firewall/aliases/{name}
                                 * @allowToken 1
                                 * @permissions {"check": ["perm", "/vms/{vmid}", ["VM.Audit"]]}
                                 *
                                 * Parameters:
                                 * - `name` (path, required, string): Alias name.
                                 * - `node` (path, required, string): The cluster node name.
                                 * - `vmid` (path, required, number): The (unique) ID of the VM.
                                 */
                                get: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/lxc/{vmid}/firewall/aliases/{name}"]["GET"]['parameters']>>) => client.request("/nodes/{node}/lxc/{vmid}/firewall/aliases/{name}", "GET", {
                                    ...((args[0]) as any),
                                    $path: {node, vmid: parseInt(vmid.toString()), name}
                                }),
                                /**
                                 * Update IP or Network alias.
                                 * @endpoint PUT /nodes/{node}/lxc/{vmid}/firewall/aliases/{name}
                                 * @allowToken 1
                                 * @permissions {"check": ["perm", "/vms/{vmid}", ["VM.Config.Network"]]}
                                 *
                                 * Parameters:
                                 * - `cidr` (body, required, string): Network/IP specification in CIDR format.
                                 * - `comment` (body, optional, string)
                                 * - `digest` (body, optional, string): Prevent changes if current configuration file has a different digest. This can be used to prevent concurrent modifications.
                                 * - `name` (path, required, string): Alias name.
                                 * - `node` (path, required, string): The cluster node name.
                                 * - `rename` (body, optional, string): Rename an existing alias.
                                 * - `vmid` (path, required, number): The (unique) ID of the VM.
                                 */
                                update: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/lxc/{vmid}/firewall/aliases/{name}"]["PUT"]['parameters']>>) => client.request("/nodes/{node}/lxc/{vmid}/firewall/aliases/{name}", "PUT", {
                                    ...((args[0]) as any),
                                    $path: {node, vmid: parseInt(vmid.toString()), name}
                                }),
                            })
                        },
                        ipset: {
                            /**
                             * List IPSets
                             * @endpoint GET /nodes/{node}/lxc/{vmid}/firewall/ipset
                             * @allowToken 1
                             * @permissions {"check": ["perm", "/vms/{vmid}", ["VM.Audit"]]}
                             *
                             * Parameters:
                             * - `node` (path, required, string): The cluster node name.
                             * - `vmid` (path, required, number): The (unique) ID of the VM.
                             */
                            index: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/lxc/{vmid}/firewall/ipset"]["GET"]['parameters']>>) => client.request("/nodes/{node}/lxc/{vmid}/firewall/ipset", "GET", {
                                ...((args[0]) as any),
                                $path: {node, vmid: parseInt(vmid.toString())}
                            }),
                            /**
                             * Create new IPSet
                             * @endpoint POST /nodes/{node}/lxc/{vmid}/firewall/ipset
                             * @allowToken 1
                             * @permissions {"check": ["perm", "/vms/{vmid}", ["VM.Config.Network"]]}
                             *
                             * Parameters:
                             * - `comment` (body, optional, string)
                             * - `digest` (body, optional, string): Prevent changes if current configuration file has a different digest. This can be used to prevent concurrent modifications.
                             * - `name` (body, required, string): IP set name.
                             * - `node` (path, required, string): The cluster node name.
                             * - `rename` (body, optional, string): Rename an existing IPSet. You can set 'rename' to the same value as 'name' to update the 'comment' of an existing IPSet.
                             * - `vmid` (path, required, number): The (unique) ID of the VM.
                             */
                            create: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/lxc/{vmid}/firewall/ipset"]["POST"]['parameters']>>) => client.request("/nodes/{node}/lxc/{vmid}/firewall/ipset", "POST", {
                                ...((args[0]) as any),
                                $path: {node, vmid: parseInt(vmid.toString())}
                            }),
                            name: (name: string) => ({
                                /**
                                 * Delete IPSet
                                 * @endpoint DELETE /nodes/{node}/lxc/{vmid}/firewall/ipset/{name}
                                 * @allowToken 1
                                 * @permissions {"check": ["perm", "/vms/{vmid}", ["VM.Config.Network"]]}
                                 *
                                 * Parameters:
                                 * - `force` (query, optional, boolean): Delete all members of the IPSet, if there are any.
                                 * - `name` (path, required, string): IP set name.
                                 * - `node` (path, required, string): The cluster node name.
                                 * - `vmid` (path, required, number): The (unique) ID of the VM.
                                 */
                                delete: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/lxc/{vmid}/firewall/ipset/{name}"]["DELETE"]['parameters']>>) => client.request("/nodes/{node}/lxc/{vmid}/firewall/ipset/{name}", "DELETE", {
                                    ...((args[0]) as any),
                                    $path: {node, vmid: parseInt(vmid.toString()), name}
                                }),
                                /**
                                 * List IPSet content
                                 * @endpoint GET /nodes/{node}/lxc/{vmid}/firewall/ipset/{name}
                                 * @allowToken 1
                                 * @permissions {"check": ["perm", "/vms/{vmid}", ["VM.Audit"]]}
                                 *
                                 * Parameters:
                                 * - `name` (path, required, string): IP set name.
                                 * - `node` (path, required, string): The cluster node name.
                                 * - `vmid` (path, required, number): The (unique) ID of the VM.
                                 */
                                get: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/lxc/{vmid}/firewall/ipset/{name}"]["GET"]['parameters']>>) => client.request("/nodes/{node}/lxc/{vmid}/firewall/ipset/{name}", "GET", {
                                    ...((args[0]) as any),
                                    $path: {node, vmid: parseInt(vmid.toString()), name}
                                }),
                                /**
                                 * Add IP or Network to IPSet.
                                 * @endpoint POST /nodes/{node}/lxc/{vmid}/firewall/ipset/{name}
                                 * @allowToken 1
                                 * @permissions {"check": ["perm", "/vms/{vmid}", ["VM.Config.Network"]]}
                                 *
                                 * Parameters:
                                 * - `cidr` (body, required, string): Network/IP specification in CIDR format.
                                 * - `comment` (body, optional, string)
                                 * - `name` (path, required, string): IP set name.
                                 * - `node` (path, required, string): The cluster node name.
                                 * - `nomatch` (body, optional, boolean)
                                 * - `vmid` (path, required, number): The (unique) ID of the VM.
                                 */
                                create_ip: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/lxc/{vmid}/firewall/ipset/{name}"]["POST"]['parameters']>>) => client.request("/nodes/{node}/lxc/{vmid}/firewall/ipset/{name}", "POST", {
                                    ...((args[0]) as any),
                                    $path: {node, vmid: parseInt(vmid.toString()), name}
                                }),
                                ip: (cidr: string) => ({
                                    /**
                                     * Remove IP or Network from IPSet.
                                     * @endpoint DELETE /nodes/{node}/lxc/{vmid}/firewall/ipset/{name}/{cidr}
                                     * @allowToken 1
                                     * @permissions {"check": ["perm", "/vms/{vmid}", ["VM.Config.Network"]]}
                                     *
                                     * Parameters:
                                     * - `cidr` (path, required, string): Network/IP specification in CIDR format.
                                     * - `digest` (query, optional, string): Prevent changes if current configuration file has a different digest. This can be used to prevent concurrent modifications.
                                     * - `name` (path, required, string): IP set name.
                                     * - `node` (path, required, string): The cluster node name.
                                     * - `vmid` (path, required, number): The (unique) ID of the VM.
                                     */
                                    remove: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/lxc/{vmid}/firewall/ipset/{name}/{cidr}"]["DELETE"]['parameters']>>) => client.request("/nodes/{node}/lxc/{vmid}/firewall/ipset/{name}/{cidr}", "DELETE", {
                                        ...((args[0]) as any),
                                        $path: {node, vmid: parseInt(vmid.toString()), cidr, name}
                                    }),
                                    /**
                                     * Read IP or Network settings from IPSet.
                                     * @endpoint GET /nodes/{node}/lxc/{vmid}/firewall/ipset/{name}/{cidr}
                                     * @allowToken 1
                                     * @permissions {"check": ["perm", "/vms/{vmid}", ["VM.Audit"]]}
                                     *
                                     * Parameters:
                                     * - `cidr` (path, required, string): Network/IP specification in CIDR format.
                                     * - `name` (path, required, string): IP set name.
                                     * - `node` (path, required, string): The cluster node name.
                                     * - `vmid` (path, required, number): The (unique) ID of the VM.
                                     */
                                    read_ip: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/lxc/{vmid}/firewall/ipset/{name}/{cidr}"]["GET"]['parameters']>>) => client.request("/nodes/{node}/lxc/{vmid}/firewall/ipset/{name}/{cidr}", "GET", {
                                        ...((args[0]) as any),
                                        $path: {node, vmid: parseInt(vmid.toString()), cidr, name}
                                    }),
                                    /**
                                     * Update IP or Network settings
                                     * @endpoint PUT /nodes/{node}/lxc/{vmid}/firewall/ipset/{name}/{cidr}
                                     * @allowToken 1
                                     * @permissions {"check": ["perm", "/vms/{vmid}", ["VM.Config.Network"]]}
                                     *
                                     * Parameters:
                                     * - `cidr` (path, required, string): Network/IP specification in CIDR format.
                                     * - `comment` (body, optional, string)
                                     * - `digest` (body, optional, string): Prevent changes if current configuration file has a different digest. This can be used to prevent concurrent modifications.
                                     * - `name` (path, required, string): IP set name.
                                     * - `node` (path, required, string): The cluster node name.
                                     * - `nomatch` (body, optional, boolean)
                                     * - `vmid` (path, required, number): The (unique) ID of the VM.
                                     */
                                    update_ip: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/lxc/{vmid}/firewall/ipset/{name}/{cidr}"]["PUT"]['parameters']>>) => client.request("/nodes/{node}/lxc/{vmid}/firewall/ipset/{name}/{cidr}", "PUT", {
                                        ...((args[0]) as any),
                                        $path: {node, vmid: parseInt(vmid.toString()), cidr, name}
                                    }),
                                })
                            })
                        },
                        /**
                         * Read firewall log
                         * @endpoint GET /nodes/{node}/lxc/{vmid}/firewall/log
                         * @allowToken 1
                         * @permissions {"check": ["perm", "/vms/{vmid}", ["VM.Console"]]}
                         *
                         * Parameters:
                         * - `limit` (query, optional, number)
                         * - `node` (path, required, string): The cluster node name.
                         * - `since` (query, optional, number): Display log since this UNIX epoch.
                         * - `start` (query, optional, number)
                         * - `until` (query, optional, number): Display log until this UNIX epoch.
                         * - `vmid` (path, required, number): The (unique) ID of the VM.
                         */
                        log: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/lxc/{vmid}/firewall/log"]["GET"]['parameters']>>) => client.request("/nodes/{node}/lxc/{vmid}/firewall/log", "GET", {
                            ...((args[0]) as any),
                            $path: {node, vmid: parseInt(vmid.toString())}
                        }),
                        options: {
                            /**
                             * Get VM firewall options.
                             * @endpoint GET /nodes/{node}/lxc/{vmid}/firewall/options
                             * @allowToken 1
                             * @permissions {"check": ["perm", "/vms/{vmid}", ["VM.Audit"]]}
                             *
                             * Parameters:
                             * - `node` (path, required, string): The cluster node name.
                             * - `vmid` (path, required, number): The (unique) ID of the VM.
                             */
                            get: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/lxc/{vmid}/firewall/options"]["GET"]['parameters']>>) => client.request("/nodes/{node}/lxc/{vmid}/firewall/options", "GET", {
                                ...((args[0]) as any),
                                $path: {node, vmid: parseInt(vmid.toString())}
                            }),
                            /**
                             * Set Firewall options.
                             * @endpoint PUT /nodes/{node}/lxc/{vmid}/firewall/options
                             * @allowToken 1
                             * @permissions {"check": ["perm", "/vms/{vmid}", ["VM.Config.Network"]]}
                             *
                             * Parameters:
                             * - `delete` (body, optional, string): A list of settings you want to delete.
                             * - `dhcp` (body, optional, boolean): Enable DHCP.
                             * - `digest` (body, optional, string): Prevent changes if current configuration file has a different digest. This can be used to prevent concurrent modifications.
                             * - `enable` (body, optional, boolean): Enable/disable firewall rules.
                             * - `ipfilter` (body, optional, boolean): Enable default IP filters. This is equivalent to adding an empty ipfilter-net<id> ipset for every interface. Such ipsets implicitly contain sane default restrictions such as restricting IPv6 link local addresses to the one derived from the interface's MAC address. For containers the configured IP addresses will be implicitly added.
                             * - `log_level_in` (body, optional, "emerg" | "alert" | "crit" | "err" | "warning" | "notice" | "info" | "debug" | "nolog"): Log level for incoming traffic.
                             * - `log_level_out` (body, optional, "emerg" | "alert" | "crit" | "err" | "warning" | "notice" | "info" | "debug" | "nolog"): Log level for outgoing traffic.
                             * - `macfilter` (body, optional, boolean): Enable/disable MAC address filter.
                             * - `ndp` (body, optional, boolean): Enable NDP (Neighbor Discovery Protocol).
                             * - `node` (path, required, string): The cluster node name.
                             * - `policy_in` (body, optional, "ACCEPT" | "REJECT" | "DROP"): Input policy.
                             * - `policy_out` (body, optional, "ACCEPT" | "REJECT" | "DROP"): Output policy.
                             * - `radv` (body, optional, boolean): Allow sending Router Advertisement.
                             * - `vmid` (path, required, number): The (unique) ID of the VM.
                             */
                            set: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/lxc/{vmid}/firewall/options"]["PUT"]['parameters']>>) => client.request("/nodes/{node}/lxc/{vmid}/firewall/options", "PUT", {
                                ...((args[0]) as any),
                                $path: {node, vmid: parseInt(vmid.toString())}
                            }),
                        },
                        /**
                         * Lists possible IPSet/Alias reference which are allowed in source/dest properties.
                         * @endpoint GET /nodes/{node}/lxc/{vmid}/firewall/refs
                         * @allowToken 1
                         * @permissions {"check": ["perm", "/vms/{vmid}", ["VM.Audit"]]}
                         *
                         * Parameters:
                         * - `node` (path, required, string): The cluster node name.
                         * - `type` (query, optional, "alias" | "ipset"): Only list references of specified type.
                         * - `vmid` (path, required, number): The (unique) ID of the VM.
                         */
                        refs: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/lxc/{vmid}/firewall/refs"]["GET"]['parameters']>>) => client.request("/nodes/{node}/lxc/{vmid}/firewall/refs", "GET", {
                            ...((args[0]) as any),
                            $path: {node, vmid: parseInt(vmid.toString())}
                        }),
                        rules: {
                            /**
                             * List rules.
                             * @endpoint GET /nodes/{node}/lxc/{vmid}/firewall/rules
                             * @allowToken 1
                             * @permissions {"check": ["perm", "/vms/{vmid}", ["VM.Audit"]]}
                             *
                             * Parameters:
                             * - `node` (path, required, string): The cluster node name.
                             * - `vmid` (path, required, number): The (unique) ID of the VM.
                             */
                            list: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/lxc/{vmid}/firewall/rules"]["GET"]['parameters']>>) => client.request("/nodes/{node}/lxc/{vmid}/firewall/rules", "GET", {
                                ...((args[0]) as any),
                                $path: {node, vmid: parseInt(vmid.toString())}
                            }),
                            /**
                             * Create new rule.
                             * @endpoint POST /nodes/{node}/lxc/{vmid}/firewall/rules
                             * @allowToken 1
                             * @permissions {"check": ["perm", "/vms/{vmid}", ["VM.Config.Network"]]}
                             *
                             * Parameters:
                             * - `action` (body, required, string): Rule action ('ACCEPT', 'DROP', 'REJECT') or security group name.
                             * - `comment` (body, optional, string): Descriptive comment.
                             * - `dest` (body, optional, string): Restrict packet destination address. This can refer to a single IP address, an IP set ('+ipsetname') or an IP alias definition. You can also specify an address range like '20.34.101.207-201.3.9.99', or a list of IP addresses and networks (entries are separated by comma). Please do not mix IPv4 and IPv6 addresses inside such lists.
                             * - `digest` (body, optional, string): Prevent changes if current configuration file has a different digest. This can be used to prevent concurrent modifications.
                             * - `dport` (body, optional, string): Restrict TCP/UDP destination port. You can use service names or simple numbers (0-65535), as defined in '/etc/services'. Port ranges can be specified with '\d+:\d+', for example '80:85', and you can use comma separated list to match several ports or ranges.
                             * - `enable` (body, optional, number): Flag to enable/disable a rule.
                             * - `icmp-type` (body, optional, string): Specify icmp-type. Only valid if proto equals 'icmp' or 'icmpv6'/'ipv6-icmp'.
                             * - `iface` (body, optional, string): Network interface name. You have to use network configuration key names for VMs and containers ('net\d+'). Host related rules can use arbitrary strings.
                             * - `log` (body, optional, "emerg" | "alert" | "crit" | "err" | "warning" | "notice" | "info" | "debug" | "nolog"): Log level for firewall rule.
                             * - `macro` (body, optional, string): Use predefined standard macro.
                             * - `node` (path, required, string): The cluster node name.
                             * - `pos` (body, optional, number): Update rule at position <pos>.
                             * - `proto` (body, optional, string): IP protocol. You can use protocol names ('tcp'/'udp') or simple numbers, as defined in '/etc/protocols'.
                             * - `source` (body, optional, string): Restrict packet source address. This can refer to a single IP address, an IP set ('+ipsetname') or an IP alias definition. You can also specify an address range like '20.34.101.207-201.3.9.99', or a list of IP addresses and networks (entries are separated by comma). Please do not mix IPv4 and IPv6 addresses inside such lists.
                             * - `sport` (body, optional, string): Restrict TCP/UDP source port. You can use service names or simple numbers (0-65535), as defined in '/etc/services'. Port ranges can be specified with '\d+:\d+', for example '80:85', and you can use comma separated list to match several ports or ranges.
                             * - `type` (body, required, "in" | "out" | "forward" | "group"): Rule type.
                             * - `vmid` (path, required, number): The (unique) ID of the VM.
                             */
                            create_rule: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/lxc/{vmid}/firewall/rules"]["POST"]['parameters']>>) => client.request("/nodes/{node}/lxc/{vmid}/firewall/rules", "POST", {
                                ...((args[0]) as any),
                                $path: {node, vmid: parseInt(vmid.toString())}
                            }),
                            pos: (pos: number) => ({
                                /**
                                 * Delete rule.
                                 * @endpoint DELETE /nodes/{node}/lxc/{vmid}/firewall/rules/{pos}
                                 * @allowToken 1
                                 * @permissions {"check": ["perm", "/vms/{vmid}", ["VM.Config.Network"]]}
                                 *
                                 * Parameters:
                                 * - `digest` (query, optional, string): Prevent changes if current configuration file has a different digest. This can be used to prevent concurrent modifications.
                                 * - `node` (path, required, string): The cluster node name.
                                 * - `pos` (path, optional, number): Update rule at position <pos>.
                                 * - `vmid` (path, required, number): The (unique) ID of the VM.
                                 */
                                delete: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/lxc/{vmid}/firewall/rules/{pos}"]["DELETE"]['parameters']>>) => client.request("/nodes/{node}/lxc/{vmid}/firewall/rules/{pos}", "DELETE", {
                                    ...((args[0]) as any),
                                    $path: {node, vmid: parseInt(vmid.toString()), pos}
                                }),
                                /**
                                 * Get single rule data.
                                 * @endpoint GET /nodes/{node}/lxc/{vmid}/firewall/rules/{pos}
                                 * @allowToken 1
                                 * @permissions {"check": ["perm", "/vms/{vmid}", ["VM.Audit"]]}
                                 *
                                 * Parameters:
                                 * - `node` (path, required, string): The cluster node name.
                                 * - `pos` (path, optional, number): Update rule at position <pos>.
                                 * - `vmid` (path, required, number): The (unique) ID of the VM.
                                 */
                                get: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/lxc/{vmid}/firewall/rules/{pos}"]["GET"]['parameters']>>) => client.request("/nodes/{node}/lxc/{vmid}/firewall/rules/{pos}", "GET", {
                                    ...((args[0]) as any),
                                    $path: {node, vmid: parseInt(vmid.toString()), pos}
                                }),
                                /**
                                 * Modify rule data.
                                 * @endpoint PUT /nodes/{node}/lxc/{vmid}/firewall/rules/{pos}
                                 * @allowToken 1
                                 * @permissions {"check": ["perm", "/vms/{vmid}", ["VM.Config.Network"]]}
                                 *
                                 * Parameters:
                                 * - `action` (body, optional, string): Rule action ('ACCEPT', 'DROP', 'REJECT') or security group name.
                                 * - `comment` (body, optional, string): Descriptive comment.
                                 * - `delete` (body, optional, string): A list of settings you want to delete.
                                 * - `dest` (body, optional, string): Restrict packet destination address. This can refer to a single IP address, an IP set ('+ipsetname') or an IP alias definition. You can also specify an address range like '20.34.101.207-201.3.9.99', or a list of IP addresses and networks (entries are separated by comma). Please do not mix IPv4 and IPv6 addresses inside such lists.
                                 * - `digest` (body, optional, string): Prevent changes if current configuration file has a different digest. This can be used to prevent concurrent modifications.
                                 * - `dport` (body, optional, string): Restrict TCP/UDP destination port. You can use service names or simple numbers (0-65535), as defined in '/etc/services'. Port ranges can be specified with '\d+:\d+', for example '80:85', and you can use comma separated list to match several ports or ranges.
                                 * - `enable` (body, optional, number): Flag to enable/disable a rule.
                                 * - `icmp-type` (body, optional, string): Specify icmp-type. Only valid if proto equals 'icmp' or 'icmpv6'/'ipv6-icmp'.
                                 * - `iface` (body, optional, string): Network interface name. You have to use network configuration key names for VMs and containers ('net\d+'). Host related rules can use arbitrary strings.
                                 * - `log` (body, optional, "emerg" | "alert" | "crit" | "err" | "warning" | "notice" | "info" | "debug" | "nolog"): Log level for firewall rule.
                                 * - `macro` (body, optional, string): Use predefined standard macro.
                                 * - `moveto` (body, optional, number): Move rule to new position <moveto>. Other arguments are ignored.
                                 * - `node` (path, required, string): The cluster node name.
                                 * - `pos` (path, optional, number): Update rule at position <pos>.
                                 * - `proto` (body, optional, string): IP protocol. You can use protocol names ('tcp'/'udp') or simple numbers, as defined in '/etc/protocols'.
                                 * - `source` (body, optional, string): Restrict packet source address. This can refer to a single IP address, an IP set ('+ipsetname') or an IP alias definition. You can also specify an address range like '20.34.101.207-201.3.9.99', or a list of IP addresses and networks (entries are separated by comma). Please do not mix IPv4 and IPv6 addresses inside such lists.
                                 * - `sport` (body, optional, string): Restrict TCP/UDP source port. You can use service names or simple numbers (0-65535), as defined in '/etc/services'. Port ranges can be specified with '\d+:\d+', for example '80:85', and you can use comma separated list to match several ports or ranges.
                                 * - `type` (body, optional, "in" | "out" | "forward" | "group"): Rule type.
                                 * - `vmid` (path, required, number): The (unique) ID of the VM.
                                 */
                                update: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/lxc/{vmid}/firewall/rules/{pos}"]["PUT"]['parameters']>>) => client.request("/nodes/{node}/lxc/{vmid}/firewall/rules/{pos}", "PUT", {
                                    ...((args[0]) as any),
                                    $path: {node, vmid: parseInt(vmid.toString()), pos}
                                }),
                            })
                        }
                    },
                    /**
                     * Get IP addresses of the specified container interface.
                     * @endpoint GET /nodes/{node}/lxc/{vmid}/interfaces
                     * @allowToken 1
                     * @permissions {"check": ["perm", "/vms/{vmid}", ["VM.Audit"]]}
                     *
                     * Parameters:
                     * - `node` (path, required, string): The cluster node name.
                     * - `vmid` (path, required, number): The (unique) ID of the VM.
                     */
                    interfaces: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/lxc/{vmid}/interfaces"]["GET"]['parameters']>>) => client.request("/nodes/{node}/lxc/{vmid}/interfaces", "GET", {
                        ...((args[0]) as any),
                        $path: {node, vmid: parseInt(vmid.toString())}
                    }),
                    migrate: {
                        /**
                         * Get preconditions for migration.
                         * @endpoint GET /nodes/{node}/lxc/{vmid}/migrate
                         * @allowToken 1
                         * @permissions {"check": ["perm", "/vms/{vmid}", ["VM.Migrate"]]}
                         *
                         * Parameters:
                         * - `node` (path, required, string): The cluster node name.
                         * - `target` (query, optional, string): Target node.
                         * - `vmid` (path, required, number): The (unique) ID of the VM.
                         */
                        preconditions: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/lxc/{vmid}/migrate"]["GET"]['parameters']>>) => client.request("/nodes/{node}/lxc/{vmid}/migrate", "GET", {
                            ...((args[0]) as any),
                            $path: {node, vmid: parseInt(vmid.toString())}
                        }),
                        /**
                         * Migrate the container to another node. Creates a new migration task.
                         * @endpoint POST /nodes/{node}/lxc/{vmid}/migrate
                         * @allowToken 1
                         * @permissions {"check": ["perm", "/vms/{vmid}", ["VM.Migrate"]]}
                         *
                         * Parameters:
                         * - `bwlimit` (body, optional, number): Override I/O bandwidth limit (in KiB/s).
                         * - `node` (path, required, string): The cluster node name.
                         * - `online` (body, optional, boolean): Use online/live migration.
                         * - `restart` (body, optional, boolean): Use restart migration
                         * - `target` (body, required, string): Target node.
                         * - `target-storage` (body, optional, string): Mapping from source to target storages. Providing only a single storage ID maps all source storages to that storage. Providing the special value '1' will map each source storage to itself.
                         * - `timeout` (body, optional, number): Timeout in seconds for shutdown for restart migration
                         * - `vmid` (path, required, number): The (unique) ID of the VM.
                         */
                        migrate_vm: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/lxc/{vmid}/migrate"]["POST"]['parameters']>>) => client.request("/nodes/{node}/lxc/{vmid}/migrate", "POST", {
                            ...((args[0]) as any),
                            $path: {node, vmid: parseInt(vmid.toString())}
                        }),
                    },
                    /**
                     * Move a rootfs-/mp-volume to a different storage or to a different container.
                     * @endpoint POST /nodes/{node}/lxc/{vmid}/move_volume
                     * @allowToken 1
                     * @permissions {"check": ["perm", "/vms/{vmid}", ["VM.Config.Disk"]], "description": "You need 'VM.Config.Disk' permissions on /vms/{vmid}, and 'Datastore.AllocateSpace' permissions on the storage. To move a volume to another container, you need the permissions on the target container as well."}
                     *
                     * Parameters:
                     * - `bwlimit` (body, optional, number): Override I/O bandwidth limit (in KiB/s).
                     * - `delete` (body, optional, boolean): Delete the original volume after successful copy. By default the original is kept as an unused volume entry.
                     * - `digest` (body, optional, string): Prevent changes if current configuration file has different SHA1 " .
                     "digest. This can be used to prevent concurrent modifications.
                     * - `node` (path, required, string): The cluster node name.
                     * - `storage` (body, optional, string): Target Storage.
                     * - `target-digest` (body, optional, string): Prevent changes if current configuration file of the target " .
                     "container has a different SHA1 digest. This can be used to prevent " .
                     "concurrent modifications.
                     * - `target-vmid` (body, optional, number): The (unique) ID of the VM.
                     * - `target-volume` (body, optional, "rootfs" | "mp0" | "mp1" | "mp2" | "mp3" | "mp4" | "mp5" | "mp6" | "mp7" | "mp8" | "mp9" | "mp10" | "mp11" | "mp12" | "mp13" | "mp14" | "mp15" | "mp16" | "mp17" | "mp18" | "mp19" | "mp20" | "mp21" | "mp22" | "mp23" | "mp24" | "mp25" | "mp26" | "mp27" | "mp28" | "mp29" | "mp30" | "mp31" | "mp32" | "mp33" | "mp34" | "mp35" | "mp36" | "mp37" | "mp38" | "mp39" | "mp40" | "mp41" | "mp42" | "mp43" | "mp44" | "mp45" | "mp46" | "mp47" | "mp48" | "mp49" | "mp50" | "mp51" | "mp52" | "mp53" | "mp54" | "mp55" | "mp56" | "mp57" | "mp58" | "mp59" | "mp60" | "mp61" | "mp62" | "mp63" | "mp64" | "mp65" | "mp66" | "mp67" | "mp68" | "mp69" | "mp70" | "mp71" | "mp72" | "mp73" | "mp74" | "mp75" | "mp76" | "mp77" | "mp78" | "mp79" | "mp80" | "mp81" | "mp82" | "mp83" | "mp84" | "mp85" | "mp86" | "mp87" | "mp88" | "mp89" | "mp90" | "mp91" | "mp92" | "mp93" | "mp94" | "mp95" | "mp96" | "mp97" | "mp98" | "mp99" | "mp100" | "mp101" | "mp102" | "mp103" | "mp104" | "mp105" | "mp106" | "mp107" | "mp108" | "mp109" | "mp110" | "mp111" | "mp112" | "mp113" | "mp114" | "mp115" | "mp116" | "mp117" | "mp118" | "mp119" | "mp120" | "mp121" | "mp122" | "mp123" | "mp124" | "mp125" | "mp126" | "mp127" | "mp128" | "mp129" | "mp130" | "mp131" | "mp132" | "mp133" | "mp134" | "mp135" | "mp136" | "mp137" | "mp138" | "mp139" | "mp140" | "mp141" | "mp142" | "mp143" | "mp144" | "mp145" | "mp146" | "mp147" | "mp148" | "mp149" | "mp150" | "mp151" | "mp152" | "mp153" | "mp154" | "mp155" | "mp156" | "mp157" | "mp158" | "mp159" | "mp160" | "mp161" | "mp162" | "mp163" | "mp164" | "mp165" | "mp166" | "mp167" | "mp168" | "mp169" | "mp170" | "mp171" | "mp172" | "mp173" | "mp174" | "mp175" | "mp176" | "mp177" | "mp178" | "mp179" | "mp180" | "mp181" | "mp182" | "mp183" | "mp184" | "mp185" | "mp186" | "mp187" | "mp188" | "mp189" | "mp190" | "mp191" | "mp192" | "mp193" | "mp194" | "mp195" | "mp196" | "mp197" | "mp198" | "mp199" | "mp200" | "mp201" | "mp202" | "mp203" | "mp204" | "mp205" | "mp206" | "mp207" | "mp208" | "mp209" | "mp210" | "mp211" | "mp212" | "mp213" | "mp214" | "mp215" | "mp216" | "mp217" | "mp218" | "mp219" | "mp220" | "mp221" | "mp222" | "mp223" | "mp224" | "mp225" | "mp226" | "mp227" | "mp228" | "mp229" | "mp230" | "mp231" | "mp232" | "mp233" | "mp234" | "mp235" | "mp236" | "mp237" | "mp238" | "mp239" | "mp240" | "mp241" | "mp242" | "mp243" | "mp244" | "mp245" | "mp246" | "mp247" | "mp248" | "mp249" | "mp250" | "mp251" | "mp252" | "mp253" | "mp254" | "mp255" | "unused0" | "unused1" | "unused2" | "unused3" | "unused4" | "unused5" | "unused6" | "unused7" | "unused8" | "unused9" | "unused10" | "unused11" | "unused12" | "unused13" | "unused14" | "unused15" | "unused16" | "unused17" | "unused18" | "unused19" | "unused20" | "unused21" | "unused22" | "unused23" | "unused24" | "unused25" | "unused26" | "unused27" | "unused28" | "unused29" | "unused30" | "unused31" | "unused32" | "unused33" | "unused34" | "unused35" | "unused36" | "unused37" | "unused38" | "unused39" | "unused40" | "unused41" | "unused42" | "unused43" | "unused44" | "unused45" | "unused46" | "unused47" | "unused48" | "unused49" | "unused50" | "unused51" | "unused52" | "unused53" | "unused54" | "unused55" | "unused56" | "unused57" | "unused58" | "unused59" | "unused60" | "unused61" | "unused62" | "unused63" | "unused64" | "unused65" | "unused66" | "unused67" | "unused68" | "unused69" | "unused70" | "unused71" | "unused72" | "unused73" | "unused74" | "unused75" | "unused76" | "unused77" | "unused78" | "unused79" | "unused80" | "unused81" | "unused82" | "unused83" | "unused84" | "unused85" | "unused86" | "unused87" | "unused88" | "unused89" | "unused90" | "unused91" | "unused92" | "unused93" | "unused94" | "unused95" | "unused96" | "unused97" | "unused98" | "unused99" | "unused100" | "unused101" | "unused102" | "unused103" | "unused104" | "unused105" | "unused106" | "unused107" | "unused108" | "unused109" | "unused110" | "unused111" | "unused112" | "unused113" | "unused114" | "unused115" | "unused116" | "unused117" | "unused118" | "unused119" | "unused120" | "unused121" | "unused122" | "unused123" | "unused124" | "unused125" | "unused126" | "unused127" | "unused128" | "unused129" | "unused130" | "unused131" | "unused132" | "unused133" | "unused134" | "unused135" | "unused136" | "unused137" | "unused138" | "unused139" | "unused140" | "unused141" | "unused142" | "unused143" | "unused144" | "unused145" | "unused146" | "unused147" | "unused148" | "unused149" | "unused150" | "unused151" | "unused152" | "unused153" | "unused154" | "unused155" | "unused156" | "unused157" | "unused158" | "unused159" | "unused160" | "unused161" | "unused162" | "unused163" | "unused164" | "unused165" | "unused166" | "unused167" | "unused168" | "unused169" | "unused170" | "unused171" | "unused172" | "unused173" | "unused174" | "unused175" | "unused176" | "unused177" | "unused178" | "unused179" | "unused180" | "unused181" | "unused182" | "unused183" | "unused184" | "unused185" | "unused186" | "unused187" | "unused188" | "unused189" | "unused190" | "unused191" | "unused192" | "unused193" | "unused194" | "unused195" | "unused196" | "unused197" | "unused198" | "unused199" | "unused200" | "unused201" | "unused202" | "unused203" | "unused204" | "unused205" | "unused206" | "unused207" | "unused208" | "unused209" | "unused210" | "unused211" | "unused212" | "unused213" | "unused214" | "unused215" | "unused216" | "unused217" | "unused218" | "unused219" | "unused220" | "unused221" | "unused222" | "unused223" | "unused224" | "unused225" | "unused226" | "unused227" | "unused228" | "unused229" | "unused230" | "unused231" | "unused232" | "unused233" | "unused234" | "unused235" | "unused236" | "unused237" | "unused238" | "unused239" | "unused240" | "unused241" | "unused242" | "unused243" | "unused244" | "unused245" | "unused246" | "unused247" | "unused248" | "unused249" | "unused250" | "unused251" | "unused252" | "unused253" | "unused254" | "unused255"): The config key the volume will be moved to. Default is the source volume key.
                     * - `vmid` (path, required, number): The (unique) ID of the VM.
                     * - `volume` (body, required, "rootfs" | "mp0" | "mp1" | "mp2" | "mp3" | "mp4" | "mp5" | "mp6" | "mp7" | "mp8" | "mp9" | "mp10" | "mp11" | "mp12" | "mp13" | "mp14" | "mp15" | "mp16" | "mp17" | "mp18" | "mp19" | "mp20" | "mp21" | "mp22" | "mp23" | "mp24" | "mp25" | "mp26" | "mp27" | "mp28" | "mp29" | "mp30" | "mp31" | "mp32" | "mp33" | "mp34" | "mp35" | "mp36" | "mp37" | "mp38" | "mp39" | "mp40" | "mp41" | "mp42" | "mp43" | "mp44" | "mp45" | "mp46" | "mp47" | "mp48" | "mp49" | "mp50" | "mp51" | "mp52" | "mp53" | "mp54" | "mp55" | "mp56" | "mp57" | "mp58" | "mp59" | "mp60" | "mp61" | "mp62" | "mp63" | "mp64" | "mp65" | "mp66" | "mp67" | "mp68" | "mp69" | "mp70" | "mp71" | "mp72" | "mp73" | "mp74" | "mp75" | "mp76" | "mp77" | "mp78" | "mp79" | "mp80" | "mp81" | "mp82" | "mp83" | "mp84" | "mp85" | "mp86" | "mp87" | "mp88" | "mp89" | "mp90" | "mp91" | "mp92" | "mp93" | "mp94" | "mp95" | "mp96" | "mp97" | "mp98" | "mp99" | "mp100" | "mp101" | "mp102" | "mp103" | "mp104" | "mp105" | "mp106" | "mp107" | "mp108" | "mp109" | "mp110" | "mp111" | "mp112" | "mp113" | "mp114" | "mp115" | "mp116" | "mp117" | "mp118" | "mp119" | "mp120" | "mp121" | "mp122" | "mp123" | "mp124" | "mp125" | "mp126" | "mp127" | "mp128" | "mp129" | "mp130" | "mp131" | "mp132" | "mp133" | "mp134" | "mp135" | "mp136" | "mp137" | "mp138" | "mp139" | "mp140" | "mp141" | "mp142" | "mp143" | "mp144" | "mp145" | "mp146" | "mp147" | "mp148" | "mp149" | "mp150" | "mp151" | "mp152" | "mp153" | "mp154" | "mp155" | "mp156" | "mp157" | "mp158" | "mp159" | "mp160" | "mp161" | "mp162" | "mp163" | "mp164" | "mp165" | "mp166" | "mp167" | "mp168" | "mp169" | "mp170" | "mp171" | "mp172" | "mp173" | "mp174" | "mp175" | "mp176" | "mp177" | "mp178" | "mp179" | "mp180" | "mp181" | "mp182" | "mp183" | "mp184" | "mp185" | "mp186" | "mp187" | "mp188" | "mp189" | "mp190" | "mp191" | "mp192" | "mp193" | "mp194" | "mp195" | "mp196" | "mp197" | "mp198" | "mp199" | "mp200" | "mp201" | "mp202" | "mp203" | "mp204" | "mp205" | "mp206" | "mp207" | "mp208" | "mp209" | "mp210" | "mp211" | "mp212" | "mp213" | "mp214" | "mp215" | "mp216" | "mp217" | "mp218" | "mp219" | "mp220" | "mp221" | "mp222" | "mp223" | "mp224" | "mp225" | "mp226" | "mp227" | "mp228" | "mp229" | "mp230" | "mp231" | "mp232" | "mp233" | "mp234" | "mp235" | "mp236" | "mp237" | "mp238" | "mp239" | "mp240" | "mp241" | "mp242" | "mp243" | "mp244" | "mp245" | "mp246" | "mp247" | "mp248" | "mp249" | "mp250" | "mp251" | "mp252" | "mp253" | "mp254" | "mp255" | "unused0" | "unused1" | "unused2" | "unused3" | "unused4" | "unused5" | "unused6" | "unused7" | "unused8" | "unused9" | "unused10" | "unused11" | "unused12" | "unused13" | "unused14" | "unused15" | "unused16" | "unused17" | "unused18" | "unused19" | "unused20" | "unused21" | "unused22" | "unused23" | "unused24" | "unused25" | "unused26" | "unused27" | "unused28" | "unused29" | "unused30" | "unused31" | "unused32" | "unused33" | "unused34" | "unused35" | "unused36" | "unused37" | "unused38" | "unused39" | "unused40" | "unused41" | "unused42" | "unused43" | "unused44" | "unused45" | "unused46" | "unused47" | "unused48" | "unused49" | "unused50" | "unused51" | "unused52" | "unused53" | "unused54" | "unused55" | "unused56" | "unused57" | "unused58" | "unused59" | "unused60" | "unused61" | "unused62" | "unused63" | "unused64" | "unused65" | "unused66" | "unused67" | "unused68" | "unused69" | "unused70" | "unused71" | "unused72" | "unused73" | "unused74" | "unused75" | "unused76" | "unused77" | "unused78" | "unused79" | "unused80" | "unused81" | "unused82" | "unused83" | "unused84" | "unused85" | "unused86" | "unused87" | "unused88" | "unused89" | "unused90" | "unused91" | "unused92" | "unused93" | "unused94" | "unused95" | "unused96" | "unused97" | "unused98" | "unused99" | "unused100" | "unused101" | "unused102" | "unused103" | "unused104" | "unused105" | "unused106" | "unused107" | "unused108" | "unused109" | "unused110" | "unused111" | "unused112" | "unused113" | "unused114" | "unused115" | "unused116" | "unused117" | "unused118" | "unused119" | "unused120" | "unused121" | "unused122" | "unused123" | "unused124" | "unused125" | "unused126" | "unused127" | "unused128" | "unused129" | "unused130" | "unused131" | "unused132" | "unused133" | "unused134" | "unused135" | "unused136" | "unused137" | "unused138" | "unused139" | "unused140" | "unused141" | "unused142" | "unused143" | "unused144" | "unused145" | "unused146" | "unused147" | "unused148" | "unused149" | "unused150" | "unused151" | "unused152" | "unused153" | "unused154" | "unused155" | "unused156" | "unused157" | "unused158" | "unused159" | "unused160" | "unused161" | "unused162" | "unused163" | "unused164" | "unused165" | "unused166" | "unused167" | "unused168" | "unused169" | "unused170" | "unused171" | "unused172" | "unused173" | "unused174" | "unused175" | "unused176" | "unused177" | "unused178" | "unused179" | "unused180" | "unused181" | "unused182" | "unused183" | "unused184" | "unused185" | "unused186" | "unused187" | "unused188" | "unused189" | "unused190" | "unused191" | "unused192" | "unused193" | "unused194" | "unused195" | "unused196" | "unused197" | "unused198" | "unused199" | "unused200" | "unused201" | "unused202" | "unused203" | "unused204" | "unused205" | "unused206" | "unused207" | "unused208" | "unused209" | "unused210" | "unused211" | "unused212" | "unused213" | "unused214" | "unused215" | "unused216" | "unused217" | "unused218" | "unused219" | "unused220" | "unused221" | "unused222" | "unused223" | "unused224" | "unused225" | "unused226" | "unused227" | "unused228" | "unused229" | "unused230" | "unused231" | "unused232" | "unused233" | "unused234" | "unused235" | "unused236" | "unused237" | "unused238" | "unused239" | "unused240" | "unused241" | "unused242" | "unused243" | "unused244" | "unused245" | "unused246" | "unused247" | "unused248" | "unused249" | "unused250" | "unused251" | "unused252" | "unused253" | "unused254" | "unused255"): Volume which will be moved.
                     */
                    move_volume: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/lxc/{vmid}/move_volume"]["POST"]['parameters']>>) => client.request("/nodes/{node}/lxc/{vmid}/move_volume", "POST", {
                        ...((args[0]) as any),
                        $path: {node, vmid: parseInt(vmid.toString())}
                    }),
                    /**
                     * Migration tunnel endpoint - only for internal use by CT migration.
                     * @endpoint POST /nodes/{node}/lxc/{vmid}/mtunnel
                     * @allowToken 1
                     * @permissions {"check": ["and", ["perm", "/vms/{vmid}", ["VM.Allocate"]], ["perm", "/", ["Sys.Incoming"]]], "description": "You need 'VM.Allocate' permissions on '/vms/{vmid}' and Sys.Incoming on '/'. Further permission checks happen during the actual migration."}
                     *
                     * Parameters:
                     * - `bridges` (body, optional, string): List of network bridges to check availability. Will be checked again for actually used bridges during migration.
                     * - `node` (path, required, string): The cluster node name.
                     * - `storages` (body, optional, string): List of storages to check permission and availability. Will be checked again for all actually used storages during migration.
                     * - `vmid` (path, required, number): The (unique) ID of the VM.
                     */
                    mtunnel: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/lxc/{vmid}/mtunnel"]["POST"]['parameters']>>) => client.request("/nodes/{node}/lxc/{vmid}/mtunnel", "POST", {
                        ...((args[0]) as any),
                        $path: {node, vmid: parseInt(vmid.toString())}
                    }),
                    /**
                     * Migration tunnel endpoint for websocket upgrade - only for internal use by VM migration.
                     * @endpoint GET /nodes/{node}/lxc/{vmid}/mtunnelwebsocket
                     * @allowToken 1
                     * @permissions {"description": "You need to pass a ticket valid for the selected socket. Tickets can be created via the mtunnel API call, which will check permissions accordingly.", "user": "all"}
                     *
                     * Parameters:
                     * - `node` (path, required, string): The cluster node name.
                     * - `socket` (query, required, string): unix socket to forward to
                     * - `ticket` (query, required, string): ticket return by initial 'mtunnel' API call, or retrieved via 'ticket' tunnel command
                     * - `vmid` (path, required, number): The (unique) ID of the VM.
                     */
                    mtunnelwebsocket: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/lxc/{vmid}/mtunnelwebsocket"]["GET"]['parameters']>>) => client.request("/nodes/{node}/lxc/{vmid}/mtunnelwebsocket", "GET", {
                        ...((args[0]) as any),
                        $path: {node, vmid: parseInt(vmid.toString())}
                    }),
                    /**
                     * Get container configuration, including pending changes.
                     * @endpoint GET /nodes/{node}/lxc/{vmid}/pending
                     * @allowToken 1
                     * @permissions {"check": ["perm", "/vms/{vmid}", ["VM.Audit"]]}
                     *
                     * Parameters:
                     * - `node` (path, required, string): The cluster node name.
                     * - `vmid` (path, required, number): The (unique) ID of the VM.
                     */
                    pending: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/lxc/{vmid}/pending"]["GET"]['parameters']>>) => client.request("/nodes/{node}/lxc/{vmid}/pending", "GET", {
                        ...((args[0]) as any),
                        $path: {node, vmid: parseInt(vmid.toString())}
                    }),
                    /**
                     * Migrate the container to another cluster. Creates a new migration task. EXPERIMENTAL feature!
                     * @endpoint POST /nodes/{node}/lxc/{vmid}/remote_migrate
                     * @allowToken 1
                     * @permissions {"check": ["perm", "/vms/{vmid}", ["VM.Migrate"]]}
                     *
                     * Parameters:
                     * - `bwlimit` (body, optional, number): Override I/O bandwidth limit (in KiB/s).
                     * - `delete` (body, optional, boolean): Delete the original CT and related data after successful migration. By default the original CT is kept on the source cluster in a stopped state.
                     * - `node` (path, required, string): The cluster node name.
                     * - `online` (body, optional, boolean): Use online/live migration.
                     * - `restart` (body, optional, boolean): Use restart migration
                     * - `target-bridge` (body, required, string): Mapping from source to target bridges. Providing only a single bridge ID maps all source bridges to that bridge. Providing the special value '1' will map each source bridge to itself.
                     * - `target-endpoint` (body, required, string): Remote target endpoint
                     * - `target-storage` (body, required, string): Mapping from source to target storages. Providing only a single storage ID maps all source storages to that storage. Providing the special value '1' will map each source storage to itself.
                     * - `target-vmid` (body, optional, number): The (unique) ID of the VM.
                     * - `timeout` (body, optional, number): Timeout in seconds for shutdown for restart migration
                     * - `vmid` (path, required, number): The (unique) ID of the VM.
                     */
                    remote_migrate: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/lxc/{vmid}/remote_migrate"]["POST"]['parameters']>>) => client.request("/nodes/{node}/lxc/{vmid}/remote_migrate", "POST", {
                        ...((args[0]) as any),
                        $path: {node, vmid: parseInt(vmid.toString())}
                    }),
                    /**
                     * Resize a container mount point.
                     * @endpoint PUT /nodes/{node}/lxc/{vmid}/resize
                     * @allowToken 1
                     * @permissions {"check": ["perm", "/vms/{vmid}", ["VM.Config.Disk"], "any", 1]}
                     *
                     * Parameters:
                     * - `digest` (body, optional, string): Prevent changes if current configuration file has different SHA1 digest. This can be used to prevent concurrent modifications.
                     * - `disk` (body, required, "rootfs" | "mp0" | "mp1" | "mp2" | "mp3" | "mp4" | "mp5" | "mp6" | "mp7" | "mp8" | "mp9" | "mp10" | "mp11" | "mp12" | "mp13" | "mp14" | "mp15" | "mp16" | "mp17" | "mp18" | "mp19" | "mp20" | "mp21" | "mp22" | "mp23" | "mp24" | "mp25" | "mp26" | "mp27" | "mp28" | "mp29" | "mp30" | "mp31" | "mp32" | "mp33" | "mp34" | "mp35" | "mp36" | "mp37" | "mp38" | "mp39" | "mp40" | "mp41" | "mp42" | "mp43" | "mp44" | "mp45" | "mp46" | "mp47" | "mp48" | "mp49" | "mp50" | "mp51" | "mp52" | "mp53" | "mp54" | "mp55" | "mp56" | "mp57" | "mp58" | "mp59" | "mp60" | "mp61" | "mp62" | "mp63" | "mp64" | "mp65" | "mp66" | "mp67" | "mp68" | "mp69" | "mp70" | "mp71" | "mp72" | "mp73" | "mp74" | "mp75" | "mp76" | "mp77" | "mp78" | "mp79" | "mp80" | "mp81" | "mp82" | "mp83" | "mp84" | "mp85" | "mp86" | "mp87" | "mp88" | "mp89" | "mp90" | "mp91" | "mp92" | "mp93" | "mp94" | "mp95" | "mp96" | "mp97" | "mp98" | "mp99" | "mp100" | "mp101" | "mp102" | "mp103" | "mp104" | "mp105" | "mp106" | "mp107" | "mp108" | "mp109" | "mp110" | "mp111" | "mp112" | "mp113" | "mp114" | "mp115" | "mp116" | "mp117" | "mp118" | "mp119" | "mp120" | "mp121" | "mp122" | "mp123" | "mp124" | "mp125" | "mp126" | "mp127" | "mp128" | "mp129" | "mp130" | "mp131" | "mp132" | "mp133" | "mp134" | "mp135" | "mp136" | "mp137" | "mp138" | "mp139" | "mp140" | "mp141" | "mp142" | "mp143" | "mp144" | "mp145" | "mp146" | "mp147" | "mp148" | "mp149" | "mp150" | "mp151" | "mp152" | "mp153" | "mp154" | "mp155" | "mp156" | "mp157" | "mp158" | "mp159" | "mp160" | "mp161" | "mp162" | "mp163" | "mp164" | "mp165" | "mp166" | "mp167" | "mp168" | "mp169" | "mp170" | "mp171" | "mp172" | "mp173" | "mp174" | "mp175" | "mp176" | "mp177" | "mp178" | "mp179" | "mp180" | "mp181" | "mp182" | "mp183" | "mp184" | "mp185" | "mp186" | "mp187" | "mp188" | "mp189" | "mp190" | "mp191" | "mp192" | "mp193" | "mp194" | "mp195" | "mp196" | "mp197" | "mp198" | "mp199" | "mp200" | "mp201" | "mp202" | "mp203" | "mp204" | "mp205" | "mp206" | "mp207" | "mp208" | "mp209" | "mp210" | "mp211" | "mp212" | "mp213" | "mp214" | "mp215" | "mp216" | "mp217" | "mp218" | "mp219" | "mp220" | "mp221" | "mp222" | "mp223" | "mp224" | "mp225" | "mp226" | "mp227" | "mp228" | "mp229" | "mp230" | "mp231" | "mp232" | "mp233" | "mp234" | "mp235" | "mp236" | "mp237" | "mp238" | "mp239" | "mp240" | "mp241" | "mp242" | "mp243" | "mp244" | "mp245" | "mp246" | "mp247" | "mp248" | "mp249" | "mp250" | "mp251" | "mp252" | "mp253" | "mp254" | "mp255"): The disk you want to resize.
                     * - `node` (path, required, string): The cluster node name.
                     * - `size` (body, required, string): The new size. With the '+' sign the value is added to the actual size of the volume and without it, the value is taken as an absolute one. Shrinking disk size is not supported.
                     * - `vmid` (path, required, number): The (unique) ID of the VM.
                     */
                    resize: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/lxc/{vmid}/resize"]["PUT"]['parameters']>>) => client.request("/nodes/{node}/lxc/{vmid}/resize", "PUT", {
                        ...((args[0]) as any),
                        $path: {node, vmid: parseInt(vmid.toString())}
                    }),
                    /**
                     * Read VM RRD statistics (returns PNG)
                     * @endpoint GET /nodes/{node}/lxc/{vmid}/rrd
                     * @allowToken 1
                     * @permissions {"check": ["perm", "/vms/{vmid}", ["VM.Audit"]]}
                     *
                     * Parameters:
                     * - `cf` (query, optional, "AVERAGE" | "MAX"): The RRD consolidation function
                     * - `ds` (query, required, string): The list of datasources you want to display.
                     * - `node` (path, required, string): The cluster node name.
                     * - `timeframe` (query, required, "hour" | "day" | "week" | "month" | "year"): Specify the time frame you are interested in.
                     * - `vmid` (path, required, number): The (unique) ID of the VM.
                     */
                    rrd: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/lxc/{vmid}/rrd"]["GET"]['parameters']>>) => client.request("/nodes/{node}/lxc/{vmid}/rrd", "GET", {
                        ...((args[0]) as any),
                        $path: {node, vmid: parseInt(vmid.toString())}
                    }),
                    /**
                     * Read VM RRD statistics
                     * @endpoint GET /nodes/{node}/lxc/{vmid}/rrddata
                     * @allowToken 1
                     * @permissions {"check": ["perm", "/vms/{vmid}", ["VM.Audit"]]}
                     *
                     * Parameters:
                     * - `cf` (query, optional, "AVERAGE" | "MAX"): The RRD consolidation function
                     * - `node` (path, required, string): The cluster node name.
                     * - `timeframe` (query, required, "hour" | "day" | "week" | "month" | "year"): Specify the time frame you are interested in.
                     * - `vmid` (path, required, number): The (unique) ID of the VM.
                     */
                    rrddata: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/lxc/{vmid}/rrddata"]["GET"]['parameters']>>) => client.request("/nodes/{node}/lxc/{vmid}/rrddata", "GET", {
                        ...((args[0]) as any),
                        $path: {node, vmid: parseInt(vmid.toString())}
                    }),
                    snapshot: {
                        /**
                         * List all snapshots.
                         * @endpoint GET /nodes/{node}/lxc/{vmid}/snapshot
                         * @allowToken 1
                         * @permissions {"check": ["perm", "/vms/{vmid}", ["VM.Audit"]]}
                         *
                         * Parameters:
                         * - `node` (path, required, string): The cluster node name.
                         * - `vmid` (path, required, number): The (unique) ID of the VM.
                         */
                        list: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/lxc/{vmid}/snapshot"]["GET"]['parameters']>>) => client.request("/nodes/{node}/lxc/{vmid}/snapshot", "GET", {
                            ...((args[0]) as any),
                            $path: {node, vmid: parseInt(vmid.toString())}
                        }),
                        /**
                         * Snapshot a container.
                         * @endpoint POST /nodes/{node}/lxc/{vmid}/snapshot
                         * @allowToken 1
                         * @permissions {"check": ["perm", "/vms/{vmid}", ["VM.Snapshot"]]}
                         *
                         * Parameters:
                         * - `description` (body, optional, string): A textual description or comment.
                         * - `node` (path, required, string): The cluster node name.
                         * - `snapname` (body, required, string): The name of the snapshot.
                         * - `vmid` (path, required, number): The (unique) ID of the VM.
                         */
                        create: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/lxc/{vmid}/snapshot"]["POST"]['parameters']>>) => client.request("/nodes/{node}/lxc/{vmid}/snapshot", "POST", {
                            ...((args[0]) as any),
                            $path: {node, vmid: parseInt(vmid.toString())}
                        }),
                        name: (snapname: string) => ({
                            /**
                             * Delete a LXC snapshot.
                             * @endpoint DELETE /nodes/{node}/lxc/{vmid}/snapshot/{snapname}
                             * @allowToken 1
                             * @permissions {"check": ["perm", "/vms/{vmid}", ["VM.Snapshot"]]}
                             *
                             * Parameters:
                             * - `force` (query, optional, boolean): For removal from config file, even if removing disk snapshots fails.
                             * - `node` (path, required, string): The cluster node name.
                             * - `snapname` (path, required, string): The name of the snapshot.
                             * - `vmid` (path, required, number): The (unique) ID of the VM.
                             */
                            delete: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/lxc/{vmid}/snapshot/{snapname}"]["DELETE"]['parameters']>>) => client.request("/nodes/{node}/lxc/{vmid}/snapshot/{snapname}", "DELETE", {
                                ...((args[0]) as any),
                                $path: {node, vmid: parseInt(vmid.toString()), snapname}
                            }),
                            /**
                             * @endpoint GET /nodes/{node}/lxc/{vmid}/snapshot/{snapname}
                             * @allowToken 1
                             * @permissions {"user": "all"}
                             *
                             * Parameters:
                             * - `node` (path, required, string): The cluster node name.
                             * - `snapname` (path, required, string): The name of the snapshot.
                             * - `vmid` (path, required, number): The (unique) ID of the VM.
                             */
                            get: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/lxc/{vmid}/snapshot/{snapname}"]["GET"]['parameters']>>) => client.request("/nodes/{node}/lxc/{vmid}/snapshot/{snapname}", "GET", {
                                ...((args[0]) as any),
                                $path: {node, vmid: parseInt(vmid.toString()), snapname}
                            }),
                            config: {
                                /**
                                 * Get snapshot configuration
                                 * @endpoint GET /nodes/{node}/lxc/{vmid}/snapshot/{snapname}/config
                                 * @allowToken 1
                                 * @permissions {"check": ["perm", "/vms/{vmid}", ["VM.Snapshot", "VM.Snapshot.Rollback", "VM.Audit"], "any", 1]}
                                 *
                                 * Parameters:
                                 * - `node` (path, required, string): The cluster node name.
                                 * - `snapname` (path, required, string): The name of the snapshot.
                                 * - `vmid` (path, required, number): The (unique) ID of the VM.
                                 */
                                get: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/lxc/{vmid}/snapshot/{snapname}/config"]["GET"]['parameters']>>) => client.request("/nodes/{node}/lxc/{vmid}/snapshot/{snapname}/config", "GET", {
                                    ...((args[0]) as any),
                                    $path: {node, vmid: parseInt(vmid.toString()), snapname}
                                }),
                                /**
                                 * Update snapshot metadata.
                                 * @endpoint PUT /nodes/{node}/lxc/{vmid}/snapshot/{snapname}/config
                                 * @allowToken 1
                                 * @permissions {"check": ["perm", "/vms/{vmid}", ["VM.Snapshot"]]}
                                 *
                                 * Parameters:
                                 * - `description` (body, optional, string): A textual description or comment.
                                 * - `node` (path, required, string): The cluster node name.
                                 * - `snapname` (path, required, string): The name of the snapshot.
                                 * - `vmid` (path, required, number): The (unique) ID of the VM.
                                 */
                                update: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/lxc/{vmid}/snapshot/{snapname}/config"]["PUT"]['parameters']>>) => client.request("/nodes/{node}/lxc/{vmid}/snapshot/{snapname}/config", "PUT", {
                                    ...((args[0]) as any),
                                    $path: {node, vmid: parseInt(vmid.toString()), snapname}
                                }),
                            },
                            /**
                             * Rollback LXC state to specified snapshot.
                             * @endpoint POST /nodes/{node}/lxc/{vmid}/snapshot/{snapname}/rollback
                             * @allowToken 1
                             * @permissions {"check": ["perm", "/vms/{vmid}", ["VM.Snapshot", "VM.Snapshot.Rollback"], "any", 1]}
                             *
                             * Parameters:
                             * - `node` (path, required, string): The cluster node name.
                             * - `snapname` (path, required, string): The name of the snapshot.
                             * - `start` (body, optional, boolean): Whether the container should get started after rolling back successfully
                             * - `vmid` (path, required, number): The (unique) ID of the VM.
                             */
                            rollback: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/lxc/{vmid}/snapshot/{snapname}/rollback"]["POST"]['parameters']>>) => client.request("/nodes/{node}/lxc/{vmid}/snapshot/{snapname}/rollback", "POST", {
                                ...((args[0]) as any),
                                $path: {node, vmid: parseInt(vmid.toString()), snapname}
                            }),
                        })
                    },
                    /**
                     * Returns a SPICE configuration to connect to the CT.
                     * @endpoint POST /nodes/{node}/lxc/{vmid}/spiceproxy
                     * @allowToken 1
                     * @permissions {"check": ["perm", "/vms/{vmid}", ["VM.Console"]]}
                     *
                     * Parameters:
                     * - `node` (path, required, string): The cluster node name.
                     * - `proxy` (body, optional, string): SPICE proxy server. This can be used by the client to specify the proxy server. All nodes in a cluster runs 'spiceproxy', so it is up to the client to choose one. By default, we return the node where the VM is currently running. As reasonable setting is to use same node you use to connect to the API (This is window.location.hostname for the JS GUI).
                     * - `vmid` (path, required, number): The (unique) ID of the VM.
                     */
                    spiceproxy: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/lxc/{vmid}/spiceproxy"]["POST"]['parameters']>>) => client.request("/nodes/{node}/lxc/{vmid}/spiceproxy", "POST", {
                        ...((args[0]) as any),
                        $path: {node, vmid: parseInt(vmid.toString())}
                    }),
                    status: {
                        /**
                         * Directory index
                         * @endpoint GET /nodes/{node}/lxc/{vmid}/status
                         * @allowToken 1
                         * @permissions {"user": "all"}
                         *
                         * Parameters:
                         * - `node` (path, required, string): The cluster node name.
                         * - `vmid` (path, required, number): The (unique) ID of the VM.
                         */
                        get: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/lxc/{vmid}/status"]["GET"]['parameters']>>) => client.request("/nodes/{node}/lxc/{vmid}/status", "GET", {
                            ...((args[0]) as any),
                            $path: {node, vmid: parseInt(vmid.toString())}
                        }),
                        /**
                         * Get virtual machine status.
                         * @endpoint GET /nodes/{node}/lxc/{vmid}/status/current
                         * @allowToken 1
                         * @permissions {"check": ["perm", "/vms/{vmid}", ["VM.Audit"]]}
                         *
                         * Parameters:
                         * - `node` (path, required, string): The cluster node name.
                         * - `vmid` (path, required, number): The (unique) ID of the VM.
                         */
                        current: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/lxc/{vmid}/status/current"]["GET"]['parameters']>>) => client.request("/nodes/{node}/lxc/{vmid}/status/current", "GET", {
                            ...((args[0]) as any),
                            $path: {node, vmid: parseInt(vmid.toString())}
                        }),
                        /**
                         * Reboot the container by shutting it down, and starting it again. Applies pending changes.
                         * @endpoint POST /nodes/{node}/lxc/{vmid}/status/reboot
                         * @allowToken 1
                         * @permissions {"check": ["perm", "/vms/{vmid}", ["VM.PowerMgmt"]]}
                         *
                         * Parameters:
                         * - `node` (path, required, string): The cluster node name.
                         * - `timeout` (body, optional, number): Wait maximal timeout seconds for the shutdown.
                         * - `vmid` (path, required, number): The (unique) ID of the VM.
                         */
                        reboot: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/lxc/{vmid}/status/reboot"]["POST"]['parameters']>>) => client.request("/nodes/{node}/lxc/{vmid}/status/reboot", "POST", {
                            ...((args[0]) as any),
                            $path: {node, vmid: parseInt(vmid.toString())}
                        }),
                        /**
                         * Resume the container.
                         * @endpoint POST /nodes/{node}/lxc/{vmid}/status/resume
                         * @allowToken 1
                         * @permissions {"check": ["perm", "/vms/{vmid}", ["VM.PowerMgmt"]]}
                         *
                         * Parameters:
                         * - `node` (path, required, string): The cluster node name.
                         * - `vmid` (path, required, number): The (unique) ID of the VM.
                         */
                        resume: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/lxc/{vmid}/status/resume"]["POST"]['parameters']>>) => client.request("/nodes/{node}/lxc/{vmid}/status/resume", "POST", {
                            ...((args[0]) as any),
                            $path: {node, vmid: parseInt(vmid.toString())}
                        }),
                        /**
                         * Shutdown the container. This will trigger a clean shutdown of the container, see lxc-stop(1) for details.
                         * @endpoint POST /nodes/{node}/lxc/{vmid}/status/shutdown
                         * @allowToken 1
                         * @permissions {"check": ["perm", "/vms/{vmid}", ["VM.PowerMgmt"]]}
                         *
                         * Parameters:
                         * - `forceStop` (body, optional, boolean): Make sure the Container stops.
                         * - `node` (path, required, string): The cluster node name.
                         * - `timeout` (body, optional, number): Wait maximal timeout seconds.
                         * - `vmid` (path, required, number): The (unique) ID of the VM.
                         */
                        shutdown: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/lxc/{vmid}/status/shutdown"]["POST"]['parameters']>>) => client.request("/nodes/{node}/lxc/{vmid}/status/shutdown", "POST", {
                            ...((args[0]) as any),
                            $path: {node, vmid: parseInt(vmid.toString())}
                        }),
                        /**
                         * Start the container.
                         * @endpoint POST /nodes/{node}/lxc/{vmid}/status/start
                         * @allowToken 1
                         * @permissions {"check": ["perm", "/vms/{vmid}", ["VM.PowerMgmt"]]}
                         *
                         * Parameters:
                         * - `debug` (body, optional, boolean): If set, enables very verbose debug log-level on start.
                         * - `node` (path, required, string): The cluster node name.
                         * - `skiplock` (body, optional, boolean): Ignore locks - only root is allowed to use this option.
                         * - `vmid` (path, required, number): The (unique) ID of the VM.
                         */
                        start: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/lxc/{vmid}/status/start"]["POST"]['parameters']>>) => client.request("/nodes/{node}/lxc/{vmid}/status/start", "POST", {
                            ...((args[0]) as any),
                            $path: {node, vmid: parseInt(vmid.toString())}
                        }),
                        /**
                         * Stop the container. This will abruptly stop all processes running in the container.
                         * @endpoint POST /nodes/{node}/lxc/{vmid}/status/stop
                         * @allowToken 1
                         * @permissions {"check": ["perm", "/vms/{vmid}", ["VM.PowerMgmt"]]}
                         *
                         * Parameters:
                         * - `node` (path, required, string): The cluster node name.
                         * - `overrule-shutdown` (body, optional, boolean): Try to abort active 'vzshutdown' tasks before stopping.
                         * - `skiplock` (body, optional, boolean): Ignore locks - only root is allowed to use this option.
                         * - `vmid` (path, required, number): The (unique) ID of the VM.
                         */
                        stop: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/lxc/{vmid}/status/stop"]["POST"]['parameters']>>) => client.request("/nodes/{node}/lxc/{vmid}/status/stop", "POST", {
                            ...((args[0]) as any),
                            $path: {node, vmid: parseInt(vmid.toString())}
                        }),
                        /**
                         * Suspend the container. This is experimental.
                         * @endpoint POST /nodes/{node}/lxc/{vmid}/status/suspend
                         * @allowToken 1
                         * @permissions {"check": ["perm", "/vms/{vmid}", ["VM.PowerMgmt"]]}
                         *
                         * Parameters:
                         * - `node` (path, required, string): The cluster node name.
                         * - `vmid` (path, required, number): The (unique) ID of the VM.
                         */
                        suspend: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/lxc/{vmid}/status/suspend"]["POST"]['parameters']>>) => client.request("/nodes/{node}/lxc/{vmid}/status/suspend", "POST", {
                            ...((args[0]) as any),
                            $path: {node, vmid: parseInt(vmid.toString())}
                        }),
                    },
                    /**
                     * Create a Template.
                     * @endpoint POST /nodes/{node}/lxc/{vmid}/template
                     * @allowToken 1
                     * @permissions {"check": ["perm", "/vms/{vmid}", ["VM.Allocate"]], "description": "You need 'VM.Allocate' permissions on /vms/{vmid}"}
                     *
                     * Parameters:
                     * - `node` (path, required, string): The cluster node name.
                     * - `vmid` (path, required, number): The (unique) ID of the VM.
                     */
                    template: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/lxc/{vmid}/template"]["POST"]['parameters']>>) => client.request("/nodes/{node}/lxc/{vmid}/template", "POST", {
                        ...((args[0]) as any),
                        $path: {node, vmid: parseInt(vmid.toString())}
                    }),
                    /**
                     * Creates a TCP proxy connection.
                     * @endpoint POST /nodes/{node}/lxc/{vmid}/termproxy
                     * @allowToken 1
                     * @permissions {"check": ["perm", "/vms/{vmid}", ["VM.Console"]]}
                     *
                     * Parameters:
                     * - `node` (path, required, string): The cluster node name.
                     * - `vmid` (path, required, number): The (unique) ID of the VM.
                     */
                    termproxy: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/lxc/{vmid}/termproxy"]["POST"]['parameters']>>) => client.request("/nodes/{node}/lxc/{vmid}/termproxy", "POST", {
                        ...((args[0]) as any),
                        $path: {node, vmid: parseInt(vmid.toString())}
                    }),
                    /**
                     * Creates a TCP VNC proxy connections.
                     * @endpoint POST /nodes/{node}/lxc/{vmid}/vncproxy
                     * @allowToken 1
                     * @permissions {"check": ["perm", "/vms/{vmid}", ["VM.Console"]]}
                     *
                     * Parameters:
                     * - `height` (body, optional, number): sets the height of the console in pixels.
                     * - `node` (path, required, string): The cluster node name.
                     * - `vmid` (path, required, number): The (unique) ID of the VM.
                     * - `websocket` (body, optional, boolean): use websocket instead of standard VNC.
                     * - `width` (body, optional, number): sets the width of the console in pixels.
                     */
                    vncproxy: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/lxc/{vmid}/vncproxy"]["POST"]['parameters']>>) => client.request("/nodes/{node}/lxc/{vmid}/vncproxy", "POST", {
                        ...((args[0]) as any),
                        $path: {node, vmid: parseInt(vmid.toString())}
                    }),
                    /**
                     * Opens a websocket for VNC traffic.
                     * @endpoint GET /nodes/{node}/lxc/{vmid}/vncwebsocket
                     * @allowToken 1
                     * @permissions {"check": ["perm", "/vms/{vmid}", ["VM.Console"]], "description": "You also need to pass a valid ticket (vncticket)."}
                     *
                     * Parameters:
                     * - `node` (path, required, string): The cluster node name.
                     * - `port` (query, required, number): Port number returned by previous vncproxy call.
                     * - `vmid` (path, required, number): The (unique) ID of the VM.
                     * - `vncticket` (query, required, string): Ticket from previous call to vncproxy.
                     */
                    vncwebsocket: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/lxc/{vmid}/vncwebsocket"]["GET"]['parameters']>>) => client.request("/nodes/{node}/lxc/{vmid}/vncwebsocket", "GET", {
                        ...((args[0]) as any),
                        $path: {node, vmid: parseInt(vmid.toString())}
                    }),
                })
            },
            /**
             * Migrate all VMs and Containers.
             * @endpoint POST /nodes/{node}/migrateall
             * @allowToken 1
             * @permissions {"description": "The 'VM.Migrate' permission is required on '/' or on '/vms/<ID>' for each ID passed via the 'vms' parameter.", "user": "all"}
             *
             * Parameters:
             * - `maxworkers` (body, optional, number): Maximal number of parallel migration job. If not set, uses'max_workers' from datacenter.cfg. One of both must be set!
             * - `node` (path, required, string): The cluster node name.
             * - `target` (body, required, string): Target node.
             * - `vms` (body, optional, string): Only consider Guests with these IDs.
             * - `with-local-disks` (body, optional, boolean): Enable live storage migration for local disk
             */
            migrate_all: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/migrateall"]["POST"]['parameters']>>) => client.request("/nodes/{node}/migrateall", "POST", {
                ...((args[0]) as any),
                $path: {node}
            }),
            /**
             * Read tap/vm network device interface counters
             * @endpoint GET /nodes/{node}/netstat
             * @allowToken 1
             * @permissions {"check": ["perm", "/nodes/{node}", ["Sys.Audit"]]}
             *
             * Parameters:
             * - `node` (path, required, string): The cluster node name.
             */
            netstat: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/netstat"]["GET"]['parameters']>>) => client.request("/nodes/{node}/netstat", "GET", {
                ...((args[0]) as any),
                $path: {node}
            }),
            network: {
                /**
                 * Revert network configuration changes.
                 * @endpoint DELETE /nodes/{node}/network
                 * @allowToken 1
                 * @permissions {"check": ["perm", "/nodes/{node}", ["Sys.Modify"]]}
                 *
                 * Parameters:
                 * - `node` (path, required, string): The cluster node name.
                 */
                revert_changes: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/network"]["DELETE"]['parameters']>>) => client.request("/nodes/{node}/network", "DELETE", {
                    ...((args[0]) as any),
                    $path: {node}
                }),
                /**
                 * List available networks
                 * @endpoint GET /nodes/{node}/network
                 * @allowToken 1
                 * @permissions {"user": "all"}
                 *
                 * Parameters:
                 * - `node` (path, required, string): The cluster node name.
                 * - `type` (query, optional, "bridge" | "bond" | "eth" | "alias" | "vlan" | "fabric" | "OVSBridge" | "OVSBond" | "OVSPort" | "OVSIntPort" | "vnet" | "any_bridge" | "any_local_bridge" | "include_sdn"): Only list specific interface types.
                 */
                index: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/network"]["GET"]['parameters']>>) => client.request("/nodes/{node}/network", "GET", {
                    ...((args[0]) as any),
                    $path: {node}
                }),
                /**
                 * Create network device configuration
                 * @endpoint POST /nodes/{node}/network
                 * @allowToken 1
                 * @permissions {"check": ["perm", "/nodes/{node}", ["Sys.Modify"]]}
                 *
                 * Parameters:
                 * - `address` (body, optional, string): IP address.
                 * - `address6` (body, optional, string): IP address.
                 * - `autostart` (body, optional, boolean): Automatically start interface on boot.
                 * - `bond-primary` (body, optional, string): Specify the primary interface for active-backup bond.
                 * - `bond_mode` (body, optional, "balance-rr" | "active-backup" | "balance-xor" | "broadcast" | "802.3ad" | "balance-tlb" | "balance-alb" | "balance-slb" | "lacp-balance-slb" | "lacp-balance-tcp"): Bonding mode.
                 * - `bond_xmit_hash_policy` (body, optional, "layer2" | "layer2+3" | "layer3+4"): Selects the transmit hash policy to use for slave selection in balance-xor and 802.3ad modes.
                 * - `bridge_ports` (body, optional, string): Specify the interfaces you want to add to your bridge.
                 * - `bridge_vids` (body, optional, string): Specify the allowed VLANs. For example: '2 4 100-200'. Only used if the bridge is VLAN aware.
                 * - `bridge_vlan_aware` (body, optional, boolean): Enable bridge vlan support.
                 * - `cidr` (body, optional, string): IPv4 CIDR.
                 * - `cidr6` (body, optional, string): IPv6 CIDR.
                 * - `comments` (body, optional, string): Comments
                 * - `comments6` (body, optional, string): Comments
                 * - `gateway` (body, optional, string): Default gateway address.
                 * - `gateway6` (body, optional, string): Default ipv6 gateway address.
                 * - `iface` (body, required, string): Network interface name.
                 * - `mtu` (body, optional, number): MTU.
                 * - `netmask` (body, optional, string): Network mask.
                 * - `netmask6` (body, optional, number): Network mask.
                 * - `node` (path, required, string): The cluster node name.
                 * - `ovs_bonds` (body, optional, string): Specify the interfaces used by the bonding device.
                 * - `ovs_bridge` (body, optional, string): The OVS bridge associated with a OVS port. This is required when you create an OVS port.
                 * - `ovs_options` (body, optional, string): OVS interface options.
                 * - `ovs_ports` (body, optional, string): Specify the interfaces you want to add to your bridge.
                 * - `ovs_tag` (body, optional, number): Specify a VLan tag (used by OVSPort, OVSIntPort, OVSBond)
                 * - `slaves` (body, optional, string): Specify the interfaces used by the bonding device.
                 * - `type` (body, required, "bridge" | "bond" | "eth" | "alias" | "vlan" | "fabric" | "OVSBridge" | "OVSBond" | "OVSPort" | "OVSIntPort" | "vnet" | "unknown"): Network interface type
                 * - `vlan-id` (body, optional, number): vlan-id for a custom named vlan interface (ifupdown2 only).
                 * - `vlan-raw-device` (body, optional, string): Specify the raw interface for the vlan interface.
                 */
                create: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/network"]["POST"]['parameters']>>) => client.request("/nodes/{node}/network", "POST", {
                    ...((args[0]) as any),
                    $path: {node}
                }),
                /**
                 * Reload network configuration
                 * @endpoint PUT /nodes/{node}/network
                 * @allowToken 1
                 * @permissions {"check": ["perm", "/nodes/{node}", ["Sys.Modify"]]}
                 *
                 * Parameters:
                 * - `node` (path, required, string): The cluster node name.
                 * - `regenerate-frr` (body, optional, boolean): Whether FRR config generation should get skipped or not.
                 */
                reload_config: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/network"]["PUT"]['parameters']>>) => client.request("/nodes/{node}/network", "PUT", {
                    ...((args[0]) as any),
                    $path: {node}
                }),
                iface: (iface: string) => ({
                    /**
                     * Delete network device configuration
                     * @endpoint DELETE /nodes/{node}/network/{iface}
                     * @allowToken 1
                     * @permissions {"check": ["perm", "/nodes/{node}", ["Sys.Modify"]]}
                     *
                     * Parameters:
                     * - `iface` (path, required, string): Network interface name.
                     * - `node` (path, required, string): The cluster node name.
                     */
                    delete: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/network/{iface}"]["DELETE"]['parameters']>>) => client.request("/nodes/{node}/network/{iface}", "DELETE", {
                        ...((args[0]) as any),
                        $path: {node, iface}
                    }),
                    /**
                     * Read network device configuration
                     * @endpoint GET /nodes/{node}/network/{iface}
                     * @allowToken 1
                     * @permissions {"check": ["perm", "/nodes/{node}", ["Sys.Audit"]]}
                     *
                     * Parameters:
                     * - `iface` (path, required, string): Network interface name.
                     * - `node` (path, required, string): The cluster node name.
                     */
                    network_config: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/network/{iface}"]["GET"]['parameters']>>) => client.request("/nodes/{node}/network/{iface}", "GET", {
                        ...((args[0]) as any),
                        $path: {node, iface}
                    }),
                    /**
                     * Update network device configuration
                     * @endpoint PUT /nodes/{node}/network/{iface}
                     * @allowToken 1
                     * @permissions {"check": ["perm", "/nodes/{node}", ["Sys.Modify"]]}
                     *
                     * Parameters:
                     * - `address` (body, optional, string): IP address.
                     * - `address6` (body, optional, string): IP address.
                     * - `autostart` (body, optional, boolean): Automatically start interface on boot.
                     * - `bond-primary` (body, optional, string): Specify the primary interface for active-backup bond.
                     * - `bond_mode` (body, optional, "balance-rr" | "active-backup" | "balance-xor" | "broadcast" | "802.3ad" | "balance-tlb" | "balance-alb" | "balance-slb" | "lacp-balance-slb" | "lacp-balance-tcp"): Bonding mode.
                     * - `bond_xmit_hash_policy` (body, optional, "layer2" | "layer2+3" | "layer3+4"): Selects the transmit hash policy to use for slave selection in balance-xor and 802.3ad modes.
                     * - `bridge_ports` (body, optional, string): Specify the interfaces you want to add to your bridge.
                     * - `bridge_vids` (body, optional, string): Specify the allowed VLANs. For example: '2 4 100-200'. Only used if the bridge is VLAN aware.
                     * - `bridge_vlan_aware` (body, optional, boolean): Enable bridge vlan support.
                     * - `cidr` (body, optional, string): IPv4 CIDR.
                     * - `cidr6` (body, optional, string): IPv6 CIDR.
                     * - `comments` (body, optional, string): Comments
                     * - `comments6` (body, optional, string): Comments
                     * - `delete` (body, optional, string): A list of settings you want to delete.
                     * - `gateway` (body, optional, string): Default gateway address.
                     * - `gateway6` (body, optional, string): Default ipv6 gateway address.
                     * - `iface` (path, required, string): Network interface name.
                     * - `mtu` (body, optional, number): MTU.
                     * - `netmask` (body, optional, string): Network mask.
                     * - `netmask6` (body, optional, number): Network mask.
                     * - `node` (path, required, string): The cluster node name.
                     * - `ovs_bonds` (body, optional, string): Specify the interfaces used by the bonding device.
                     * - `ovs_bridge` (body, optional, string): The OVS bridge associated with a OVS port. This is required when you create an OVS port.
                     * - `ovs_options` (body, optional, string): OVS interface options.
                     * - `ovs_ports` (body, optional, string): Specify the interfaces you want to add to your bridge.
                     * - `ovs_tag` (body, optional, number): Specify a VLan tag (used by OVSPort, OVSIntPort, OVSBond)
                     * - `slaves` (body, optional, string): Specify the interfaces used by the bonding device.
                     * - `type` (body, required, "bridge" | "bond" | "eth" | "alias" | "vlan" | "fabric" | "OVSBridge" | "OVSBond" | "OVSPort" | "OVSIntPort" | "vnet" | "unknown"): Network interface type
                     * - `vlan-id` (body, optional, number): vlan-id for a custom named vlan interface (ifupdown2 only).
                     * - `vlan-raw-device` (body, optional, string): Specify the raw interface for the vlan interface.
                     */
                    update: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/network/{iface}"]["PUT"]['parameters']>>) => client.request("/nodes/{node}/network/{iface}", "PUT", {
                        ...((args[0]) as any),
                        $path: {node, iface}
                    }),
                })
            },
            qemu: {
                /**
                 * Virtual machine index (per node).
                 * @endpoint GET /nodes/{node}/qemu
                 * @allowToken 1
                 * @permissions {"description": "Only list VMs where you have VM.Audit permissions on /vms/<vmid>.", "user": "all"}
                 *
                 * Parameters:
                 * - `full` (query, optional, boolean): Determine the full status of active VMs.
                 * - `node` (path, required, string): The cluster node name.
                 */
                list: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/qemu"]["GET"]['parameters']>>) => client.request("/nodes/{node}/qemu", "GET", {
                    ...((args[0]) as any),
                    $path: {node}
                }),
                /**
                 * Create or restore a virtual machine.
                 * @endpoint POST /nodes/{node}/qemu
                 * @allowToken 1
                 * @permissions {"description": "You need 'VM.Allocate' permissions on /vms/{vmid} or on the VM pool /pool/{pool}. For restore (option 'archive'), it is enough if the user has 'VM.Backup' permission and the VM already exists. If you create disks you need 'Datastore.AllocateSpace' on any used storage.If you use a bridge/vlan, you need 'SDN.Use' on any used bridge/vlan.", "user": "all"}
                 *
                 * Parameters:
                 * - `acpi` (body, optional, boolean): Enable/disable ACPI.
                 * - `affinity` (body, optional, string): List of host cores used to execute guest processes, for example: 0,5,8-11
                 * - `agent` (body, optional, string): Enable/disable communication with the QEMU Guest Agent and its properties.
                 * - `allow-ksm` (body, optional, boolean): Allow memory pages of this guest to be merged via KSM (Kernel Samepage Merging).
                 * - `amd-sev` (body, optional, string): Secure Encrypted Virtualization (SEV) features by AMD CPUs
                 * - `arch` (body, optional, "x86_64" | "aarch64"): Virtual processor architecture. Defaults to the host.
                 * - `archive` (body, optional, string): The backup archive. Either the file system path to a .tar or .vma file (use '-' to pipe data from stdin) or a proxmox storage backup volume identifier.
                 * - `args` (body, optional, string): Arbitrary arguments passed to kvm.
                 * - `audio0` (body, optional, string): Configure a audio device, useful in combination with QXL/Spice.
                 * - `autostart` (body, optional, boolean): Automatic restart after crash (currently ignored).
                 * - `balloon` (body, optional, number): Amount of target RAM for the VM in MiB. Using zero disables the ballon driver.
                 * - `bios` (body, optional, "seabios" | "ovmf"): Select BIOS implementation.
                 * - `boot` (body, optional, string): Specify guest boot order. Use the 'order=' sub-property as usage with no key or 'legacy=' is deprecated.
                 * - `bootdisk` (body, optional, string): Enable booting from specified disk. Deprecated: Use 'boot: order=foo;bar' instead.
                 * - `bwlimit` (body, optional, number): Override I/O bandwidth limit (in KiB/s).
                 * - `cdrom` (body, optional, string): This is an alias for option -ide2
                 * - `cicustom` (body, optional, string): cloud-init: Specify custom files to replace the automatically generated ones at start.
                 * - `cipassword` (body, optional, string): cloud-init: Password to assign the user. Using this is generally not recommended. Use ssh keys instead. Also note that older cloud-init versions do not support hashed passwords.
                 * - `citype` (body, optional, "configdrive2" | "nocloud" | "opennebula"): Specifies the cloud-init configuration format. The default depends on the configured operating system type (`ostype`. We use the `nocloud` format for Linux, and `configdrive2` for windows.
                 * - `ciupgrade` (body, optional, boolean): cloud-init: do an automatic package upgrade after the first boot.
                 * - `ciuser` (body, optional, string): cloud-init: User name to change ssh keys and password for instead of the image's configured default user.
                 * - `cores` (body, optional, number): The number of cores per socket.
                 * - `cpu` (body, optional, string): Emulated CPU type.
                 * - `cpulimit` (body, optional, number): Limit of CPU usage.
                 * - `cpuunits` (body, optional, number): CPU weight for a VM, will be clamped to [1, 10000] in cgroup v2.
                 * - `description` (body, optional, string): Description for the VM. Shown in the web-interface VM's summary. This is saved as comment inside the configuration file.
                 * - `efidisk0` (body, optional, string): Configure a disk for storing EFI vars. Use the special syntax STORAGE_ID:SIZE_IN_GiB to allocate a new volume. Note that SIZE_IN_GiB is ignored here and that the default EFI vars are copied to the volume instead. Use STORAGE_ID:0 and the 'import-from' parameter to import from an existing volume.
                 * - `force` (body, optional, boolean): Allow to overwrite existing VM.
                 * - `freeze` (body, optional, boolean): Freeze CPU at startup (use 'c' monitor command to start execution).
                 * - `ha-managed` (body, optional, boolean): Add the VM as a HA resource after it was created.
                 * - `hookscript` (body, optional, string): Script that will be executed during various steps in the vms lifetime.
                 * - `hostpci[n]` (body, optional, string): Map host PCI devices into guest.
                 * - `hotplug` (body, optional, string): Selectively enable hotplug features. This is a comma separated list of hotplug features: 'network', 'disk', 'cpu', 'memory', 'usb' and 'cloudinit'. Use '0' to disable hotplug completely. Using '1' as value is an alias for the default `network,disk,usb`. USB hotplugging is possible for guests with machine version >= 7.1 and ostype l26 or windows > 7.
                 * - `hugepages` (body, optional, "any" | "2" | "1024"): Enables hugepages memory.

                 Sets the size of hugepages in MiB. If the value is set to 'any' then 1 GiB hugepages will be used if possible, otherwise the size will fall back to 2 MiB.
                 * - `ide[n]` (body, optional, string): Use volume as IDE hard disk or CD-ROM (n is 0 to 3). Use the special syntax STORAGE_ID:SIZE_IN_GiB to allocate a new volume. Use STORAGE_ID:0 and the 'import-from' parameter to import from an existing volume.
                 * - `import-working-storage` (body, optional, string): A file-based storage with 'images' content-type enabled, which is used as an intermediary extraction storage during import. Defaults to the source storage.
                 * - `intel-tdx` (body, optional, string): Trusted Domain Extension (TDX) features by Intel CPUs
                 * - `ipconfig[n]` (body, optional, string): cloud-init: Specify IP addresses and gateways for the corresponding interface.

                 IP addresses use CIDR notation, gateways are optional but need an IP of the same type specified.

                 The special string 'dhcp' can be used for IP addresses to use DHCP, in which case no explicit
                 gateway should be provided.
                 For IPv6 the special string 'auto' can be used to use stateless autoconfiguration. This requires
                 cloud-init 19.4 or newer.

                 If cloud-init is enabled and neither an IPv4 nor an IPv6 address is specified, it defaults to using
                 dhcp on IPv4.
                 * - `ivshmem` (body, optional, string): Inter-VM shared memory. Useful for direct communication between VMs, or to the host.
                 * - `keephugepages` (body, optional, boolean): Use together with hugepages. If enabled, hugepages will not not be deleted after VM shutdown and can be used for subsequent starts.
                 * - `keyboard` (body, optional, "de" | "de-ch" | "da" | "en-gb" | "en-us" | "es" | "fi" | "fr" | "fr-be" | "fr-ca" | "fr-ch" | "hu" | "is" | "it" | "ja" | "lt" | "mk" | "nl" | "no" | "pl" | "pt" | "pt-br" | "sv" | "sl" | "tr"): Keyboard layout for VNC server. This option is generally not required and is often better handled from within the guest OS.
                 * - `kvm` (body, optional, boolean): Enable/disable KVM hardware virtualization.
                 * - `live-restore` (body, optional, boolean): Start the VM immediately while importing or restoring in the background.
                 * - `localtime` (body, optional, boolean): Set the real time clock (RTC) to local time. This is enabled by default if the `ostype` indicates a Microsoft Windows OS.
                 * - `lock` (body, optional, "backup" | "clone" | "create" | "migrate" | "rollback" | "snapshot" | "snapshot-delete" | "suspending" | "suspended"): Lock/unlock the VM.
                 * - `machine` (body, optional, string): Specify the QEMU machine.
                 * - `memory` (body, optional, string): Memory properties.
                 * - `migrate_downtime` (body, optional, number): Set maximum tolerated downtime (in seconds) for migrations. Should the migration not be able to converge in the very end, because too much newly dirtied RAM needs to be transferred, the limit will be increased automatically step-by-step until migration can converge.
                 * - `migrate_speed` (body, optional, number): Set maximum speed (in MB/s) for migrations. Value 0 is no limit.
                 * - `name` (body, optional, string): Set a name for the VM. Only used on the configuration web interface.
                 * - `nameserver` (body, optional, string): cloud-init: Sets DNS server IP address for a container. Create will automatically use the setting from the host if neither searchdomain nor nameserver are set.
                 * - `net[n]` (body, optional, string): Specify network devices.
                 * - `node` (path, required, string): The cluster node name.
                 * - `numa` (body, optional, boolean): Enable/disable NUMA.
                 * - `numa[n]` (body, optional, string): NUMA topology.
                 * - `onboot` (body, optional, boolean): Specifies whether a VM will be started during system bootup.
                 * - `ostype` (body, optional, "other" | "wxp" | "w2k" | "w2k3" | "w2k8" | "wvista" | "win7" | "win8" | "win10" | "win11" | "l24" | "l26" | "solaris"): Specify guest operating system.
                 * - `parallel[n]` (body, optional, string): Map host parallel devices (n is 0 to 2).
                 * - `pool` (body, optional, string): Add the VM to the specified pool.
                 * - `protection` (body, optional, boolean): Sets the protection flag of the VM. This will disable the remove VM and remove disk operations.
                 * - `reboot` (body, optional, boolean): Allow reboot. If set to '0' the VM exit on reboot.
                 * - `rng0` (body, optional, string): Configure a VirtIO-based Random Number Generator.
                 * - `sata[n]` (body, optional, string): Use volume as SATA hard disk or CD-ROM (n is 0 to 5). Use the special syntax STORAGE_ID:SIZE_IN_GiB to allocate a new volume. Use STORAGE_ID:0 and the 'import-from' parameter to import from an existing volume.
                 * - `scsi[n]` (body, optional, string): Use volume as SCSI hard disk or CD-ROM (n is 0 to 30). Use the special syntax STORAGE_ID:SIZE_IN_GiB to allocate a new volume. Use STORAGE_ID:0 and the 'import-from' parameter to import from an existing volume.
                 * - `scsihw` (body, optional, "lsi" | "lsi53c810" | "virtio-scsi-pci" | "virtio-scsi-single" | "megasas" | "pvscsi"): SCSI controller model
                 * - `searchdomain` (body, optional, string): cloud-init: Sets DNS search domains for a container. Create will automatically use the setting from the host if neither searchdomain nor nameserver are set.
                 * - `serial[n]` (body, optional, string): Create a serial device inside the VM (n is 0 to 3)
                 * - `shares` (body, optional, number): Amount of memory shares for auto-ballooning. The larger the number is, the more memory this VM gets. Number is relative to weights of all other running VMs. Using zero disables auto-ballooning. Auto-ballooning is done by pvestatd.
                 * - `smbios1` (body, optional, string): Specify SMBIOS type 1 fields.
                 * - `smp` (body, optional, number): The number of CPUs. Please use option -sockets instead.
                 * - `sockets` (body, optional, number): The number of CPU sockets.
                 * - `spice_enhancements` (body, optional, string): Configure additional enhancements for SPICE.
                 * - `sshkeys` (body, optional, string): cloud-init: Setup public SSH keys (one key per line, OpenSSH format).
                 * - `start` (body, optional, boolean): Start VM after it was created successfully.
                 * - `startdate` (body, optional, string): Set the initial date of the real time clock. Valid format for date are:'now' or '2006-06-17T16:01:21' or '2006-06-17'.
                 * - `startup` (body, optional, string): Startup and shutdown behavior. Order is a non-negative number defining the general startup order. Shutdown in done with reverse ordering. Additionally you can set the 'up' or 'down' delay in seconds, which specifies a delay to wait before the next VM is started or stopped.
                 * - `storage` (body, optional, string): Default storage.
                 * - `tablet` (body, optional, boolean): Enable/disable the USB tablet device.
                 * - `tags` (body, optional, string): Tags of the VM. This is only meta information.
                 * - `tdf` (body, optional, boolean): Enable/disable time drift fix.
                 * - `template` (body, optional, boolean): Enable/disable Template.
                 * - `tpmstate0` (body, optional, string): Configure a Disk for storing TPM state. The format is fixed to 'raw'. Use the special syntax STORAGE_ID:SIZE_IN_GiB to allocate a new volume. Note that SIZE_IN_GiB is ignored here and 4 MiB will be used instead. Use STORAGE_ID:0 and the 'import-from' parameter to import from an existing volume.
                 * - `unique` (body, optional, boolean): Assign a unique random ethernet address.
                 * - `unused[n]` (body, optional, string): Reference to unused volumes. This is used internally, and should not be modified manually.
                 * - `usb[n]` (body, optional, string): Configure an USB device (n is 0 to 4, for machine version >= 7.1 and ostype l26 or windows > 7, n can be up to 14).
                 * - `vcpus` (body, optional, number): Number of hotplugged vcpus.
                 * - `vga` (body, optional, string): Configure the VGA hardware.
                 * - `virtio[n]` (body, optional, string): Use volume as VIRTIO hard disk (n is 0 to 15). Use the special syntax STORAGE_ID:SIZE_IN_GiB to allocate a new volume. Use STORAGE_ID:0 and the 'import-from' parameter to import from an existing volume.
                 * - `virtiofs[n]` (body, optional, string): Configuration for sharing a directory between host and guest using Virtio-fs.
                 * - `vmgenid` (body, optional, string): Set VM Generation ID. Use '1' to autogenerate on create or update, pass '0' to disable explicitly.
                 * - `vmid` (body, required, number): The (unique) ID of the VM.
                 * - `vmstatestorage` (body, optional, string): Default storage for VM state volumes/files.
                 * - `watchdog` (body, optional, string): Create a virtual hardware watchdog device.
                 */
                create: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/qemu"]["POST"]['parameters']>>) => client.request("/nodes/{node}/qemu", "POST", {
                    ...((args[0]) as any),
                    $path: {node}
                }),
                create_vm: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/qemu"]["POST"]['parameters']>>) => client.request("/nodes/{node}/qemu", "POST", {
                    ...((args[0]) as any),
                    $path: {node}
                }),
                vmid: (vmid: string | number) => ({
                    /**
                     * Destroy the VM and  all used/owned volumes. Removes any VM specific permissions and firewall rules
                     * @endpoint DELETE /nodes/{node}/qemu/{vmid}
                     * @allowToken 1
                     * @permissions {"check": ["perm", "/vms/{vmid}", ["VM.Allocate"]]}
                     *
                     * Parameters:
                     * - `destroy-unreferenced-disks` (query, optional, boolean): If set, destroy additionally all disks not referenced in the config but with a matching VMID from all enabled storages.
                     * - `node` (path, required, string): The cluster node name.
                     * - `purge` (query, optional, boolean): Remove VMID from configurations, like backup & replication jobs and HA.
                     * - `skiplock` (query, optional, boolean): Ignore locks - only root is allowed to use this option.
                     * - `vmid` (path, required, number): The (unique) ID of the VM.
                     */
                    destroy: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/qemu/{vmid}"]["DELETE"]['parameters']>>) => client.request("/nodes/{node}/qemu/{vmid}", "DELETE", {
                        ...((args[0]) as any),
                        $path: {node, vmid: parseInt(vmid.toString())}
                    }),
                    /**
                     * Directory index
                     * @endpoint GET /nodes/{node}/qemu/{vmid}
                     * @allowToken 1
                     * @permissions {"user": "all"}
                     *
                     * Parameters:
                     * - `node` (path, required, string): The cluster node name.
                     * - `vmid` (path, required, number): The (unique) ID of the VM.
                     */
                    diridx: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/qemu/{vmid}"]["GET"]['parameters']>>) => client.request("/nodes/{node}/qemu/{vmid}", "GET", {
                        ...((args[0]) as any),
                        $path: {node, vmid: parseInt(vmid.toString())}
                    }),
                    agent: {
                        /**
                         * QEMU Guest Agent command index.
                         * @endpoint GET /nodes/{node}/qemu/{vmid}/agent
                         * @allowToken 1
                         * @permissions {"user": "all"}
                         *
                         * Parameters:
                         * - `node` (path, required, string): The cluster node name.
                         * - `vmid` (path, required, number): The (unique) ID of the VM.
                         */
                        index: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/qemu/{vmid}/agent"]["GET"]['parameters']>>) => client.request("/nodes/{node}/qemu/{vmid}/agent", "GET", {
                            ...((args[0]) as any),
                            $path: {node, vmid: parseInt(vmid.toString())}
                        }),
                        /**
                         * Execute QEMU Guest Agent commands.
                         * @endpoint POST /nodes/{node}/qemu/{vmid}/agent
                         * @allowToken 1
                         * @permissions {"check": ["perm", "/vms/{vmid}", ["VM.GuestAgent.Unrestricted", "VM.GuestAgent.Unrestricted"], "any", 1]}
                         *
                         * Parameters:
                         * - `command` (body, required, "fsfreeze-freeze" | "fsfreeze-status" | "fsfreeze-thaw" | "fstrim" | "get-fsinfo" | "get-host-name" | "get-memory-block-info" | "get-memory-blocks" | "get-osinfo" | "get-time" | "get-timezone" | "get-users" | "get-vcpus" | "info" | "network-get-interfaces" | "ping" | "shutdown" | "suspend-disk" | "suspend-hybrid" | "suspend-ram"): The QGA command.
                         * - `node` (path, required, string): The cluster node name.
                         * - `vmid` (path, required, number): The (unique) ID of the VM.
                         */
                        agent: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/qemu/{vmid}/agent"]["POST"]['parameters']>>) => client.request("/nodes/{node}/qemu/{vmid}/agent", "POST", {
                            ...((args[0]) as any),
                            $path: {node, vmid: parseInt(vmid.toString())}
                        }),
                        exec: {
                            /**
                             * Executes the given command in the vm via the guest-agent and returns an object with the pid.
                             * @endpoint POST /nodes/{node}/qemu/{vmid}/agent/exec
                             * @allowToken 1
                             * @permissions {"check": ["perm", "/vms/{vmid}", ["VM.GuestAgent.Unrestricted"]]}
                             *
                             * Parameters:
                             * - `command` (body, required, string[]>): The command as a list of program + arguments.
                             * - `input-data` (body, optional, string): Data to pass as 'input-data' to the guest. Usually treated as STDIN to 'command'.
                             * - `node` (path, required, string): The cluster node name.
                             * - `vmid` (path, required, number): The (unique) ID of the VM.
                             */
                            exec: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/qemu/{vmid}/agent/exec"]["POST"]['parameters']>>) => client.request("/nodes/{node}/qemu/{vmid}/agent/exec", "POST", {
                                ...((args[0]) as any),
                                $path: {node, vmid: parseInt(vmid.toString())}
                            }),
                        },

                        /**
                         * Gets the status of the given pid started by the guest-agent
                         * @endpoint GET /nodes/{node}/qemu/{vmid}/agent/exec-status
                         * @allowToken 1
                         * @permissions {"check": ["perm", "/vms/{vmid}", ["VM.GuestAgent.Unrestricted"]]}
                         *
                         * Parameters:
                         * - `node` (path, required, string): The cluster node name.
                         * - `pid` (query, required, number): The PID to query
                         * - `vmid` (path, required, number): The (unique) ID of the VM.
                         */
                        exec_status: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/qemu/{vmid}/agent/exec-status"]["GET"]['parameters']>>) => client.request("/nodes/{node}/qemu/{vmid}/agent/exec-status", "GET", {
                            ...((args[0]) as any),
                            $path: {node, vmid: parseInt(vmid.toString())}
                        }),
                        /**
                         * Reads the given file via guest agent. Is limited to 16777216 bytes.
                         * @endpoint GET /nodes/{node}/qemu/{vmid}/agent/file-read
                         * @allowToken 1
                         * @permissions {"check": ["perm", "/vms/{vmid}", ["VM.GuestAgent.FileRead", "VM.GuestAgent.Unrestricted"], "any", 1]}
                         *
                         * Parameters:
                         * - `file` (query, required, string): The path to the file
                         * - `node` (path, required, string): The cluster node name.
                         * - `vmid` (path, required, number): The (unique) ID of the VM.
                         */
                        file_read: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/qemu/{vmid}/agent/file-read"]["GET"]['parameters']>>) => client.request("/nodes/{node}/qemu/{vmid}/agent/file-read", "GET", {
                            ...((args[0]) as any),
                            $path: {node, vmid: parseInt(vmid.toString())}
                        }),
                        /**
                         * Writes the given file via guest agent.
                         * @endpoint POST /nodes/{node}/qemu/{vmid}/agent/file-write
                         * @allowToken 1
                         * @permissions {"check": ["perm", "/vms/{vmid}", ["VM.GuestAgent.FileWrite", "VM.GuestAgent.Unrestricted"], "any", 1]}
                         *
                         * Parameters:
                         * - `content` (body, required, string): The content to write into the file.
                         * - `encode` (body, optional, boolean): If set, the content will be encoded as base64 (required by QEMU).Otherwise the content needs to be encoded beforehand - defaults to true.
                         * - `file` (body, required, string): The path to the file.
                         * - `node` (path, required, string): The cluster node name.
                         * - `vmid` (path, required, number): The (unique) ID of the VM.
                         */
                        file_write: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/qemu/{vmid}/agent/file-write"]["POST"]['parameters']>>) => client.request("/nodes/{node}/qemu/{vmid}/agent/file-write", "POST", {
                            ...((args[0]) as any),
                            $path: {node, vmid: parseInt(vmid.toString())}
                        }),

                        /**
                         * Execute fsfreeze-freeze.
                         * @endpoint POST /nodes/{node}/qemu/{vmid}/agent/fsfreeze-freeze
                         * @allowToken 1
                         * @permissions {"check": ["perm", "/vms/{vmid}", ["VM.GuestAgent.FileSystemMgmt", "VM.GuestAgent.Unrestricted"], "any", 1]}
                         *
                         * Parameters:
                         * - `node` (path, required, string): The cluster node name.
                         * - `vmid` (path, required, number): The (unique) ID of the VM.
                         */
                        fsfreeze_freeze: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/qemu/{vmid}/agent/fsfreeze-freeze"]["POST"]['parameters']>>) => client.request("/nodes/{node}/qemu/{vmid}/agent/fsfreeze-freeze", "POST", {
                            ...((args[0]) as any),
                            $path: {node, vmid: parseInt(vmid.toString())}
                        }),
                        /**
                         * Execute fsfreeze-status.
                         * @endpoint POST /nodes/{node}/qemu/{vmid}/agent/fsfreeze-status
                         * @allowToken 1
                         * @permissions {"check": ["perm", "/vms/{vmid}", ["VM.GuestAgent.Audit", "VM.GuestAgent.FileSystemMgmt", "VM.GuestAgent.Unrestricted"], "any", 1]}
                         *
                         * Parameters:
                         * - `node` (path, required, string): The cluster node name.
                         * - `vmid` (path, required, number): The (unique) ID of the VM.
                         */
                        fsfreeze_status: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/qemu/{vmid}/agent/fsfreeze-status"]["POST"]['parameters']>>) => client.request("/nodes/{node}/qemu/{vmid}/agent/fsfreeze-status", "POST", {
                            ...((args[0]) as any),
                            $path: {node, vmid: parseInt(vmid.toString())}
                        }),
                        /**
                         * Execute fsfreeze-thaw.
                         * @endpoint POST /nodes/{node}/qemu/{vmid}/agent/fsfreeze-thaw
                         * @allowToken 1
                         * @permissions {"check": ["perm", "/vms/{vmid}", ["VM.GuestAgent.FileSystemMgmt", "VM.GuestAgent.Unrestricted"], "any", 1]}
                         *
                         * Parameters:
                         * - `node` (path, required, string): The cluster node name.
                         * - `vmid` (path, required, number): The (unique) ID of the VM.
                         */
                        fsfreeze_thaw: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/qemu/{vmid}/agent/fsfreeze-thaw"]["POST"]['parameters']>>) => client.request("/nodes/{node}/qemu/{vmid}/agent/fsfreeze-thaw", "POST", {
                            ...((args[0]) as any),
                            $path: {node, vmid: parseInt(vmid.toString())}
                        }),
                        /**
                         * Execute fstrim.
                         * @endpoint POST /nodes/{node}/qemu/{vmid}/agent/fstrim
                         * @allowToken 1
                         * @permissions {"check": ["perm", "/vms/{vmid}", ["VM.GuestAgent.FileSystemMgmt", "VM.GuestAgent.Unrestricted"], "any", 1]}
                         *
                         * Parameters:
                         * - `node` (path, required, string): The cluster node name.
                         * - `vmid` (path, required, number): The (unique) ID of the VM.
                         */
                        fstrim: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/qemu/{vmid}/agent/fstrim"]["POST"]['parameters']>>) => client.request("/nodes/{node}/qemu/{vmid}/agent/fstrim", "POST", {
                            ...((args[0]) as any),
                            $path: {node, vmid: parseInt(vmid.toString())}
                        }),
                        /**
                         * Execute get-fsinfo.
                         * @endpoint GET /nodes/{node}/qemu/{vmid}/agent/get-fsinfo
                         * @allowToken 1
                         * @permissions {"check": ["perm", "/vms/{vmid}", ["VM.GuestAgent.Audit", "VM.GuestAgent.Unrestricted"], "any", 1]}
                         *
                         * Parameters:
                         * - `node` (path, required, string): The cluster node name.
                         * - `vmid` (path, required, number): The (unique) ID of the VM.
                         */
                        get_fsinfo: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/qemu/{vmid}/agent/get-fsinfo"]["GET"]['parameters']>>) => client.request("/nodes/{node}/qemu/{vmid}/agent/get-fsinfo", "GET", {
                            ...((args[0]) as any),
                            $path: {node, vmid: parseInt(vmid.toString())}
                        }),

                        /**
                         * Execute get-host-name.
                         * @endpoint GET /nodes/{node}/qemu/{vmid}/agent/get-host-name
                         * @allowToken 1
                         * @permissions {"check": ["perm", "/vms/{vmid}", ["VM.GuestAgent.Audit", "VM.GuestAgent.Unrestricted"], "any", 1]}
                         *
                         * Parameters:
                         * - `node` (path, required, string): The cluster node name.
                         * - `vmid` (path, required, number): The (unique) ID of the VM.
                         */
                        get_host_name: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/qemu/{vmid}/agent/get-host-name"]["GET"]['parameters']>>) => client.request("/nodes/{node}/qemu/{vmid}/agent/get-host-name", "GET", {
                            ...((args[0]) as any),
                            $path: {node, vmid: parseInt(vmid.toString())}
                        }),
                        /**
                         * Execute get-memory-block-info.
                         * @endpoint GET /nodes/{node}/qemu/{vmid}/agent/get-memory-block-info
                         * @allowToken 1
                         * @permissions {"check": ["perm", "/vms/{vmid}", ["VM.GuestAgent.Audit", "VM.GuestAgent.Unrestricted"], "any", 1]}
                         *
                         * Parameters:
                         * - `node` (path, required, string): The cluster node name.
                         * - `vmid` (path, required, number): The (unique) ID of the VM.
                         */
                        get_memory_block_info: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/qemu/{vmid}/agent/get-memory-block-info"]["GET"]['parameters']>>) => client.request("/nodes/{node}/qemu/{vmid}/agent/get-memory-block-info", "GET", {
                            ...((args[0]) as any),
                            $path: {node, vmid: parseInt(vmid.toString())}
                        }),
                        /**
                         * Execute get-memory-blocks.
                         * @endpoint GET /nodes/{node}/qemu/{vmid}/agent/get-memory-blocks
                         * @allowToken 1
                         * @permissions {"check": ["perm", "/vms/{vmid}", ["VM.GuestAgent.Audit", "VM.GuestAgent.Unrestricted"], "any", 1]}
                         *
                         * Parameters:
                         * - `node` (path, required, string): The cluster node name.
                         * - `vmid` (path, required, number): The (unique) ID of the VM.
                         */
                        get_memory_blocks: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/qemu/{vmid}/agent/get-memory-blocks"]["GET"]['parameters']>>) => client.request("/nodes/{node}/qemu/{vmid}/agent/get-memory-blocks", "GET", {
                            ...((args[0]) as any),
                            $path: {node, vmid: parseInt(vmid.toString())}
                        }),
                        /**
                         * Execute get-osinfo.
                         * @endpoint GET /nodes/{node}/qemu/{vmid}/agent/get-osinfo
                         * @allowToken 1
                         * @permissions {"check": ["perm", "/vms/{vmid}", ["VM.GuestAgent.Audit", "VM.GuestAgent.Unrestricted"], "any", 1]}
                         *
                         * Parameters:
                         * - `node` (path, required, string): The cluster node name.
                         * - `vmid` (path, required, number): The (unique) ID of the VM.
                         */
                        get_osinfo: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/qemu/{vmid}/agent/get-osinfo"]["GET"]['parameters']>>) => client.request("/nodes/{node}/qemu/{vmid}/agent/get-osinfo", "GET", {
                            ...((args[0]) as any),
                            $path: {node, vmid: parseInt(vmid.toString())}
                        }),
                        /**
                         * Execute get-time.
                         * @endpoint GET /nodes/{node}/qemu/{vmid}/agent/get-time
                         * @allowToken 1
                         * @permissions {"check": ["perm", "/vms/{vmid}", ["VM.GuestAgent.Audit", "VM.GuestAgent.Unrestricted"], "any", 1]}
                         *
                         * Parameters:
                         * - `node` (path, required, string): The cluster node name.
                         * - `vmid` (path, required, number): The (unique) ID of the VM.
                         */
                        get_time: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/qemu/{vmid}/agent/get-time"]["GET"]['parameters']>>) => client.request("/nodes/{node}/qemu/{vmid}/agent/get-time", "GET", {
                            ...((args[0]) as any),
                            $path: {node, vmid: parseInt(vmid.toString())}
                        }),

                        /**
                         * Execute get-timezone.
                         * @endpoint GET /nodes/{node}/qemu/{vmid}/agent/get-timezone
                         * @allowToken 1
                         * @permissions {"check": ["perm", "/vms/{vmid}", ["VM.GuestAgent.Audit", "VM.GuestAgent.Unrestricted"], "any", 1]}
                         *
                         * Parameters:
                         * - `node` (path, required, string): The cluster node name.
                         * - `vmid` (path, required, number): The (unique) ID of the VM.
                         */
                        get_timezone: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/qemu/{vmid}/agent/get-timezone"]["GET"]['parameters']>>) => client.request("/nodes/{node}/qemu/{vmid}/agent/get-timezone", "GET", {
                            ...((args[0]) as any),
                            $path: {node, vmid: parseInt(vmid.toString())}
                        }),
                        /**
                         * Execute get-users.
                         * @endpoint GET /nodes/{node}/qemu/{vmid}/agent/get-users
                         * @allowToken 1
                         * @permissions {"check": ["perm", "/vms/{vmid}", ["VM.GuestAgent.Audit", "VM.GuestAgent.Unrestricted"], "any", 1]}
                         *
                         * Parameters:
                         * - `node` (path, required, string): The cluster node name.
                         * - `vmid` (path, required, number): The (unique) ID of the VM.
                         */
                        get_users: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/qemu/{vmid}/agent/get-users"]["GET"]['parameters']>>) => client.request("/nodes/{node}/qemu/{vmid}/agent/get-users", "GET", {
                            ...((args[0]) as any),
                            $path: {node, vmid: parseInt(vmid.toString())}
                        }),
                        /**
                         * Execute get-vcpus.
                         * @endpoint GET /nodes/{node}/qemu/{vmid}/agent/get-vcpus
                         * @allowToken 1
                         * @permissions {"check": ["perm", "/vms/{vmid}", ["VM.GuestAgent.Audit", "VM.GuestAgent.Unrestricted"], "any", 1]}
                         *
                         * Parameters:
                         * - `node` (path, required, string): The cluster node name.
                         * - `vmid` (path, required, number): The (unique) ID of the VM.
                         */
                        get_vcpus: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/qemu/{vmid}/agent/get-vcpus"]["GET"]['parameters']>>) => client.request("/nodes/{node}/qemu/{vmid}/agent/get-vcpus", "GET", {
                            ...((args[0]) as any),
                            $path: {node, vmid: parseInt(vmid.toString())}
                        }),
                        /**
                         * Execute info.
                         * @endpoint GET /nodes/{node}/qemu/{vmid}/agent/info
                         * @allowToken 1
                         * @permissions {"check": ["perm", "/vms/{vmid}", ["VM.GuestAgent.Audit", "VM.GuestAgent.Unrestricted"], "any", 1]}
                         *
                         * Parameters:
                         * - `node` (path, required, string): The cluster node name.
                         * - `vmid` (path, required, number): The (unique) ID of the VM.
                         */
                        info: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/qemu/{vmid}/agent/info"]["GET"]['parameters']>>) => client.request("/nodes/{node}/qemu/{vmid}/agent/info", "GET", {
                            ...((args[0]) as any),
                            $path: {node, vmid: parseInt(vmid.toString())}
                        }),
                        /**
                         * Execute network-get-interfaces.
                         * @endpoint GET /nodes/{node}/qemu/{vmid}/agent/network-get-interfaces
                         * @allowToken 1
                         * @permissions {"check": ["perm", "/vms/{vmid}", ["VM.GuestAgent.Audit", "VM.GuestAgent.Unrestricted"], "any", 1]}
                         *
                         * Parameters:
                         * - `node` (path, required, string): The cluster node name.
                         * - `vmid` (path, required, number): The (unique) ID of the VM.
                         */
                        network_get_interfaces: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/qemu/{vmid}/agent/network-get-interfaces"]["GET"]['parameters']>>) => client.request("/nodes/{node}/qemu/{vmid}/agent/network-get-interfaces", "GET", {
                            ...((args[0]) as any),
                            $path: {node, vmid: parseInt(vmid.toString())}
                        }),
                        /**
                         * Execute ping.
                         * @endpoint POST /nodes/{node}/qemu/{vmid}/agent/ping
                         * @allowToken 1
                         * @permissions {"check": ["perm", "/vms/{vmid}", ["VM.GuestAgent.Audit", "VM.GuestAgent.Unrestricted"], "any", 1]}
                         *
                         * Parameters:
                         * - `node` (path, required, string): The cluster node name.
                         * - `vmid` (path, required, number): The (unique) ID of the VM.
                         */
                        ping: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/qemu/{vmid}/agent/ping"]["POST"]['parameters']>>) => client.request("/nodes/{node}/qemu/{vmid}/agent/ping", "POST", {
                            ...((args[0]) as any),
                            $path: {node, vmid: parseInt(vmid.toString())}
                        }),
                        /**
                         * Sets the password for the given user to the given password
                         * @endpoint POST /nodes/{node}/qemu/{vmid}/agent/set-user-password
                         * @allowToken 1
                         * @permissions {"check": ["perm", "/vms/{vmid}", ["VM.GuestAgent.Unrestricted"]]}
                         *
                         * Parameters:
                         * - `crypted` (body, optional, boolean): set to 1 if the password has already been passed through crypt()
                         * - `node` (path, required, string): The cluster node name.
                         * - `password` (body, required, string): The new password.
                         * - `username` (body, required, string): The user to set the password for.
                         * - `vmid` (path, required, number): The (unique) ID of the VM.
                         */
                        set_user_password: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/qemu/{vmid}/agent/set-user-password"]["POST"]['parameters']>>) => client.request("/nodes/{node}/qemu/{vmid}/agent/set-user-password", "POST", {
                            ...((args[0]) as any),
                            $path: {node, vmid: parseInt(vmid.toString())}
                        }),
                        /**
                         * Execute shutdown.
                         * @endpoint POST /nodes/{node}/qemu/{vmid}/agent/shutdown
                         * @allowToken 1
                         * @permissions {"check": ["perm", "/vms/{vmid}", ["VM.PowerMgmt", "VM.GuestAgent.Unrestricted"], "any", 1]}
                         *
                         * Parameters:
                         * - `node` (path, required, string): The cluster node name.
                         * - `vmid` (path, required, number): The (unique) ID of the VM.
                         */
                        shutdown: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/qemu/{vmid}/agent/shutdown"]["POST"]['parameters']>>) => client.request("/nodes/{node}/qemu/{vmid}/agent/shutdown", "POST", {
                            ...((args[0]) as any),
                            $path: {node, vmid: parseInt(vmid.toString())}
                        }),
                        /**
                         * Execute suspend-disk.
                         * @endpoint POST /nodes/{node}/qemu/{vmid}/agent/suspend-disk
                         * @allowToken 1
                         * @permissions {"check": ["perm", "/vms/{vmid}", ["VM.PowerMgmt", "VM.GuestAgent.Unrestricted"], "any", 1]}
                         *
                         * Parameters:
                         * - `node` (path, required, string): The cluster node name.
                         * - `vmid` (path, required, number): The (unique) ID of the VM.
                         */
                        suspend_disk: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/qemu/{vmid}/agent/suspend-disk"]["POST"]['parameters']>>) => client.request("/nodes/{node}/qemu/{vmid}/agent/suspend-disk", "POST", {
                            ...((args[0]) as any),
                            $path: {node, vmid: parseInt(vmid.toString())}
                        }),
                        /**
                         * Execute suspend-hybrid.
                         * @endpoint POST /nodes/{node}/qemu/{vmid}/agent/suspend-hybrid
                         * @allowToken 1
                         * @permissions {"check": ["perm", "/vms/{vmid}", ["VM.PowerMgmt", "VM.GuestAgent.Unrestricted"], "any", 1]}
                         *
                         * Parameters:
                         * - `node` (path, required, string): The cluster node name.
                         * - `vmid` (path, required, number): The (unique) ID of the VM.
                         */
                        suspend_hybrid: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/qemu/{vmid}/agent/suspend-hybrid"]["POST"]['parameters']>>) => client.request("/nodes/{node}/qemu/{vmid}/agent/suspend-hybrid", "POST", {
                            ...((args[0]) as any),
                            $path: {node, vmid: parseInt(vmid.toString())}
                        }),
                        /**
                         * Execute suspend-ram.
                         * @endpoint POST /nodes/{node}/qemu/{vmid}/agent/suspend-ram
                         * @allowToken 1
                         * @permissions {"check": ["perm", "/vms/{vmid}", ["VM.PowerMgmt", "VM.GuestAgent.Unrestricted"], "any", 1]}
                         *
                         * Parameters:
                         * - `node` (path, required, string): The cluster node name.
                         * - `vmid` (path, required, number): The (unique) ID of the VM.
                         */
                        suspend_ram: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/qemu/{vmid}/agent/suspend-ram"]["POST"]['parameters']>>) => client.request("/nodes/{node}/qemu/{vmid}/agent/suspend-ram", "POST", {
                            ...((args[0]) as any),
                            $path: {node, vmid: parseInt(vmid.toString())}
                        }),

                    },
                    /**
                     * Create a copy of virtual machine/template.
                     * @endpoint POST /nodes/{node}/qemu/{vmid}/clone
                     * @allowToken 1
                     * @permissions {"check": ["and", ["perm", "/vms/{vmid}", ["VM.Clone"]], ["or", ["perm", "/vms/{newid}", ["VM.Allocate"]], ["perm", "/pool/{pool}", ["VM.Allocate"], "require_param", "pool"]]], "description": "You need 'VM.Clone' permissions on /vms/{vmid}, and 'VM.Allocate' permissions on /vms/{newid} (or on the VM pool /pool/{pool}). You also need 'Datastore.AllocateSpace' on any used storage and 'SDN.Use' on any used bridge/vnet"}
                     *
                     * Parameters:
                     * - `bwlimit` (body, optional, number): Override I/O bandwidth limit (in KiB/s).
                     * - `description` (body, optional, string): Description for the new VM.
                     * - `format` (body, optional, "raw" | "qcow2" | "vmdk"): Target format for file storage. Only valid for full clone.
                     * - `full` (body, optional, boolean): Create a full copy of all disks. This is always done when you clone a normal VM. For VM templates, we try to create a linked clone by default.
                     * - `name` (body, optional, string): Set a name for the new VM.
                     * - `newid` (body, required, number): VMID for the clone.
                     * - `node` (path, required, string): The cluster node name.
                     * - `pool` (body, optional, string): Add the new VM to the specified pool.
                     * - `snapname` (body, optional, string): The name of the snapshot.
                     * - `storage` (body, optional, string): Target storage for full clone.
                     * - `target` (body, optional, string): Target node. Only allowed if the original VM is on shared storage.
                     * - `vmid` (path, required, number): The (unique) ID of the VM.
                     */
                    clone: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/qemu/{vmid}/clone"]["POST"]['parameters']>>) => client.request("/nodes/{node}/qemu/{vmid}/clone", "POST", {
                        ...((args[0]) as any),
                        $path: {node, vmid: parseInt(vmid.toString())}
                    }),
                    cloudinit: {
                        /**
                         * Get the cloudinit configuration with both current and pending values.
                         * @endpoint GET /nodes/{node}/qemu/{vmid}/cloudinit
                         * @allowToken 1
                         * @permissions {"check": ["perm", "/vms/{vmid}", ["VM.Audit"]]}
                         *
                         * Parameters:
                         * - `node` (path, required, string): The cluster node name.
                         * - `vmid` (path, required, number): The (unique) ID of the VM.
                         */
                        pending: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/qemu/{vmid}/cloudinit"]["GET"]['parameters']>>) => client.request("/nodes/{node}/qemu/{vmid}/cloudinit", "GET", {
                            ...((args[0]) as any),
                            $path: {node, vmid: parseInt(vmid.toString())}
                        }),
                        /**
                         * Regenerate and change cloudinit config drive.
                         * @endpoint PUT /nodes/{node}/qemu/{vmid}/cloudinit
                         * @allowToken 1
                         * @permissions {"check": ["perm", "/vms/{vmid}", ["VM.Config.Cloudinit"]]}
                         *
                         * Parameters:
                         * - `node` (path, required, string): The cluster node name.
                         * - `vmid` (path, required, number): The (unique) ID of the VM.
                         */
                        update: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/qemu/{vmid}/cloudinit"]["PUT"]['parameters']>>) => client.request("/nodes/{node}/qemu/{vmid}/cloudinit", "PUT", {
                            ...((args[0]) as any),
                            $path: {node, vmid: parseInt(vmid.toString())}
                        }),
                        /**
                         * Get automatically generated cloudinit config.
                         * @endpoint GET /nodes/{node}/qemu/{vmid}/cloudinit/dump
                         * @allowToken 1
                         * @permissions {"check": ["perm", "/vms/{vmid}", ["VM.Audit"]]}
                         *
                         * Parameters:
                         * - `node` (path, required, string): The cluster node name.
                         * - `type` (query, required, "user" | "network" | "meta"): Config type.
                         * - `vmid` (path, required, number): The (unique) ID of the VM.
                         */
                        dump: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/qemu/{vmid}/cloudinit/dump"]["GET"]['parameters']>>) => client.request("/nodes/{node}/qemu/{vmid}/cloudinit/dump", "GET", {
                            ...((args[0]) as any),
                            $path: {node, vmid: parseInt(vmid.toString())}
                        }),
                    },
                    config: {
                        /**
                         * Get the virtual machine configuration with pending configuration changes applied. Set the 'current' parameter to get the current configuration instead.
                         * @endpoint GET /nodes/{node}/qemu/{vmid}/config
                         * @allowToken 1
                         * @permissions {"check": ["perm", "/vms/{vmid}", ["VM.Audit"]]}
                         *
                         * Parameters:
                         * - `current` (query, optional, boolean): Get current values (instead of pending values).
                         * - `node` (path, required, string): The cluster node name.
                         * - `snapshot` (query, optional, string): Fetch config values from given snapshot.
                         * - `vmid` (path, required, number): The (unique) ID of the VM.
                         */
                        get: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/qemu/{vmid}/config"]["GET"]['parameters']>>) => client.request("/nodes/{node}/qemu/{vmid}/config", "GET", {
                            ...((args[0]) as any),
                            $path: {node, vmid: parseInt(vmid.toString())}
                        }),
                        /**
                         * Set virtual machine options (asynchronous API).
                         * @endpoint POST /nodes/{node}/qemu/{vmid}/config
                         * @allowToken 1
                         * @permissions {"check": ["perm", "/vms/{vmid}", ["VM.Config.Disk", "VM.Config.CDROM", "VM.Config.CPU", "VM.Config.Memory", "VM.Config.Network", "VM.Config.HWType", "VM.Config.Options", "VM.Config.Cloudinit"], "any", 1]}
                         *
                         * Parameters:
                         * - `acpi` (body, optional, boolean): Enable/disable ACPI.
                         * - `affinity` (body, optional, string): List of host cores used to execute guest processes, for example: 0,5,8-11
                         * - `agent` (body, optional, string): Enable/disable communication with the QEMU Guest Agent and its properties.
                         * - `allow-ksm` (body, optional, boolean): Allow memory pages of this guest to be merged via KSM (Kernel Samepage Merging).
                         * - `amd-sev` (body, optional, string): Secure Encrypted Virtualization (SEV) features by AMD CPUs
                         * - `arch` (body, optional, "x86_64" | "aarch64"): Virtual processor architecture. Defaults to the host.
                         * - `args` (body, optional, string): Arbitrary arguments passed to kvm.
                         * - `audio0` (body, optional, string): Configure a audio device, useful in combination with QXL/Spice.
                         * - `autostart` (body, optional, boolean): Automatic restart after crash (currently ignored).
                         * - `background_delay` (body, optional, number): Time to wait for the task to finish. We return 'null' if the task finish within that time.
                         * - `balloon` (body, optional, number): Amount of target RAM for the VM in MiB. Using zero disables the ballon driver.
                         * - `bios` (body, optional, "seabios" | "ovmf"): Select BIOS implementation.
                         * - `boot` (body, optional, string): Specify guest boot order. Use the 'order=' sub-property as usage with no key or 'legacy=' is deprecated.
                         * - `bootdisk` (body, optional, string): Enable booting from specified disk. Deprecated: Use 'boot: order=foo;bar' instead.
                         * - `cdrom` (body, optional, string): This is an alias for option -ide2
                         * - `cicustom` (body, optional, string): cloud-init: Specify custom files to replace the automatically generated ones at start.
                         * - `cipassword` (body, optional, string): cloud-init: Password to assign the user. Using this is generally not recommended. Use ssh keys instead. Also note that older cloud-init versions do not support hashed passwords.
                         * - `citype` (body, optional, "configdrive2" | "nocloud" | "opennebula"): Specifies the cloud-init configuration format. The default depends on the configured operating system type (`ostype`. We use the `nocloud` format for Linux, and `configdrive2` for windows.
                         * - `ciupgrade` (body, optional, boolean): cloud-init: do an automatic package upgrade after the first boot.
                         * - `ciuser` (body, optional, string): cloud-init: User name to change ssh keys and password for instead of the image's configured default user.
                         * - `cores` (body, optional, number): The number of cores per socket.
                         * - `cpu` (body, optional, string): Emulated CPU type.
                         * - `cpulimit` (body, optional, number): Limit of CPU usage.
                         * - `cpuunits` (body, optional, number): CPU weight for a VM, will be clamped to [1, 10000] in cgroup v2.
                         * - `delete` (body, optional, string): A list of settings you want to delete.
                         * - `description` (body, optional, string): Description for the VM. Shown in the web-interface VM's summary. This is saved as comment inside the configuration file.
                         * - `digest` (body, optional, string): Prevent changes if current configuration file has different SHA1 digest. This can be used to prevent concurrent modifications.
                         * - `efidisk0` (body, optional, string): Configure a disk for storing EFI vars. Use the special syntax STORAGE_ID:SIZE_IN_GiB to allocate a new volume. Note that SIZE_IN_GiB is ignored here and that the default EFI vars are copied to the volume instead. Use STORAGE_ID:0 and the 'import-from' parameter to import from an existing volume.
                         * - `force` (body, optional, boolean): Force physical removal. Without this, we simple remove the disk from the config file and create an additional configuration entry called 'unused[n]', which contains the volume ID. Unlink of unused[n] always cause physical removal.
                         * - `freeze` (body, optional, boolean): Freeze CPU at startup (use 'c' monitor command to start execution).
                         * - `hookscript` (body, optional, string): Script that will be executed during various steps in the vms lifetime.
                         * - `hostpci[n]` (body, optional, string): Map host PCI devices into guest.
                         * - `hotplug` (body, optional, string): Selectively enable hotplug features. This is a comma separated list of hotplug features: 'network', 'disk', 'cpu', 'memory', 'usb' and 'cloudinit'. Use '0' to disable hotplug completely. Using '1' as value is an alias for the default `network,disk,usb`. USB hotplugging is possible for guests with machine version >= 7.1 and ostype l26 or windows > 7.
                         * - `hugepages` (body, optional, "any" | "2" | "1024"): Enables hugepages memory.

                         Sets the size of hugepages in MiB. If the value is set to 'any' then 1 GiB hugepages will be used if possible, otherwise the size will fall back to 2 MiB.
                         * - `ide[n]` (body, optional, string): Use volume as IDE hard disk or CD-ROM (n is 0 to 3). Use the special syntax STORAGE_ID:SIZE_IN_GiB to allocate a new volume. Use STORAGE_ID:0 and the 'import-from' parameter to import from an existing volume.
                         * - `import-working-storage` (body, optional, string): A file-based storage with 'images' content-type enabled, which is used as an intermediary extraction storage during import. Defaults to the source storage.
                         * - `intel-tdx` (body, optional, string): Trusted Domain Extension (TDX) features by Intel CPUs
                         * - `ipconfig[n]` (body, optional, string): cloud-init: Specify IP addresses and gateways for the corresponding interface.

                         IP addresses use CIDR notation, gateways are optional but need an IP of the same type specified.

                         The special string 'dhcp' can be used for IP addresses to use DHCP, in which case no explicit
                         gateway should be provided.
                         For IPv6 the special string 'auto' can be used to use stateless autoconfiguration. This requires
                         cloud-init 19.4 or newer.

                         If cloud-init is enabled and neither an IPv4 nor an IPv6 address is specified, it defaults to using
                         dhcp on IPv4.
                         * - `ivshmem` (body, optional, string): Inter-VM shared memory. Useful for direct communication between VMs, or to the host.
                         * - `keephugepages` (body, optional, boolean): Use together with hugepages. If enabled, hugepages will not not be deleted after VM shutdown and can be used for subsequent starts.
                         * - `keyboard` (body, optional, "de" | "de-ch" | "da" | "en-gb" | "en-us" | "es" | "fi" | "fr" | "fr-be" | "fr-ca" | "fr-ch" | "hu" | "is" | "it" | "ja" | "lt" | "mk" | "nl" | "no" | "pl" | "pt" | "pt-br" | "sv" | "sl" | "tr"): Keyboard layout for VNC server. This option is generally not required and is often better handled from within the guest OS.
                         * - `kvm` (body, optional, boolean): Enable/disable KVM hardware virtualization.
                         * - `localtime` (body, optional, boolean): Set the real time clock (RTC) to local time. This is enabled by default if the `ostype` indicates a Microsoft Windows OS.
                         * - `lock` (body, optional, "backup" | "clone" | "create" | "migrate" | "rollback" | "snapshot" | "snapshot-delete" | "suspending" | "suspended"): Lock/unlock the VM.
                         * - `machine` (body, optional, string): Specify the QEMU machine.
                         * - `memory` (body, optional, string): Memory properties.
                         * - `migrate_downtime` (body, optional, number): Set maximum tolerated downtime (in seconds) for migrations. Should the migration not be able to converge in the very end, because too much newly dirtied RAM needs to be transferred, the limit will be increased automatically step-by-step until migration can converge.
                         * - `migrate_speed` (body, optional, number): Set maximum speed (in MB/s) for migrations. Value 0 is no limit.
                         * - `name` (body, optional, string): Set a name for the VM. Only used on the configuration web interface.
                         * - `nameserver` (body, optional, string): cloud-init: Sets DNS server IP address for a container. Create will automatically use the setting from the host if neither searchdomain nor nameserver are set.
                         * - `net[n]` (body, optional, string): Specify network devices.
                         * - `node` (path, required, string): The cluster node name.
                         * - `numa` (body, optional, boolean): Enable/disable NUMA.
                         * - `numa[n]` (body, optional, string): NUMA topology.
                         * - `onboot` (body, optional, boolean): Specifies whether a VM will be started during system bootup.
                         * - `ostype` (body, optional, "other" | "wxp" | "w2k" | "w2k3" | "w2k8" | "wvista" | "win7" | "win8" | "win10" | "win11" | "l24" | "l26" | "solaris"): Specify guest operating system.
                         * - `parallel[n]` (body, optional, string): Map host parallel devices (n is 0 to 2).
                         * - `protection` (body, optional, boolean): Sets the protection flag of the VM. This will disable the remove VM and remove disk operations.
                         * - `reboot` (body, optional, boolean): Allow reboot. If set to '0' the VM exit on reboot.
                         * - `revert` (body, optional, string): Revert a pending change.
                         * - `rng0` (body, optional, string): Configure a VirtIO-based Random Number Generator.
                         * - `sata[n]` (body, optional, string): Use volume as SATA hard disk or CD-ROM (n is 0 to 5). Use the special syntax STORAGE_ID:SIZE_IN_GiB to allocate a new volume. Use STORAGE_ID:0 and the 'import-from' parameter to import from an existing volume.
                         * - `scsi[n]` (body, optional, string): Use volume as SCSI hard disk or CD-ROM (n is 0 to 30). Use the special syntax STORAGE_ID:SIZE_IN_GiB to allocate a new volume. Use STORAGE_ID:0 and the 'import-from' parameter to import from an existing volume.
                         * - `scsihw` (body, optional, "lsi" | "lsi53c810" | "virtio-scsi-pci" | "virtio-scsi-single" | "megasas" | "pvscsi"): SCSI controller model
                         * - `searchdomain` (body, optional, string): cloud-init: Sets DNS search domains for a container. Create will automatically use the setting from the host if neither searchdomain nor nameserver are set.
                         * - `serial[n]` (body, optional, string): Create a serial device inside the VM (n is 0 to 3)
                         * - `shares` (body, optional, number): Amount of memory shares for auto-ballooning. The larger the number is, the more memory this VM gets. Number is relative to weights of all other running VMs. Using zero disables auto-ballooning. Auto-ballooning is done by pvestatd.
                         * - `skiplock` (body, optional, boolean): Ignore locks - only root is allowed to use this option.
                         * - `smbios1` (body, optional, string): Specify SMBIOS type 1 fields.
                         * - `smp` (body, optional, number): The number of CPUs. Please use option -sockets instead.
                         * - `sockets` (body, optional, number): The number of CPU sockets.
                         * - `spice_enhancements` (body, optional, string): Configure additional enhancements for SPICE.
                         * - `sshkeys` (body, optional, string): cloud-init: Setup public SSH keys (one key per line, OpenSSH format).
                         * - `startdate` (body, optional, string): Set the initial date of the real time clock. Valid format for date are:'now' or '2006-06-17T16:01:21' or '2006-06-17'.
                         * - `startup` (body, optional, string): Startup and shutdown behavior. Order is a non-negative number defining the general startup order. Shutdown in done with reverse ordering. Additionally you can set the 'up' or 'down' delay in seconds, which specifies a delay to wait before the next VM is started or stopped.
                         * - `tablet` (body, optional, boolean): Enable/disable the USB tablet device.
                         * - `tags` (body, optional, string): Tags of the VM. This is only meta information.
                         * - `tdf` (body, optional, boolean): Enable/disable time drift fix.
                         * - `template` (body, optional, boolean): Enable/disable Template.
                         * - `tpmstate0` (body, optional, string): Configure a Disk for storing TPM state. The format is fixed to 'raw'. Use the special syntax STORAGE_ID:SIZE_IN_GiB to allocate a new volume. Note that SIZE_IN_GiB is ignored here and 4 MiB will be used instead. Use STORAGE_ID:0 and the 'import-from' parameter to import from an existing volume.
                         * - `unused[n]` (body, optional, string): Reference to unused volumes. This is used internally, and should not be modified manually.
                         * - `usb[n]` (body, optional, string): Configure an USB device (n is 0 to 4, for machine version >= 7.1 and ostype l26 or windows > 7, n can be up to 14).
                         * - `vcpus` (body, optional, number): Number of hotplugged vcpus.
                         * - `vga` (body, optional, string): Configure the VGA hardware.
                         * - `virtio[n]` (body, optional, string): Use volume as VIRTIO hard disk (n is 0 to 15). Use the special syntax STORAGE_ID:SIZE_IN_GiB to allocate a new volume. Use STORAGE_ID:0 and the 'import-from' parameter to import from an existing volume.
                         * - `virtiofs[n]` (body, optional, string): Configuration for sharing a directory between host and guest using Virtio-fs.
                         * - `vmgenid` (body, optional, string): Set VM Generation ID. Use '1' to autogenerate on create or update, pass '0' to disable explicitly.
                         * - `vmid` (path, required, number): The (unique) ID of the VM.
                         * - `vmstatestorage` (body, optional, string): Default storage for VM state volumes/files.
                         * - `watchdog` (body, optional, string): Create a virtual hardware watchdog device.
                         */
                        update_async: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/qemu/{vmid}/config"]["POST"]['parameters']>>) => client.request("/nodes/{node}/qemu/{vmid}/config", "POST", {
                            ...((args[0]) as any),
                            $path: {node, vmid: parseInt(vmid.toString())}
                        }),
                        /**
                         * Set virtual machine options (synchronous API) - You should consider using the POST method instead for any actions involving hotplug or storage allocation.
                         * @endpoint PUT /nodes/{node}/qemu/{vmid}/config
                         * @allowToken 1
                         * @permissions {"check": ["perm", "/vms/{vmid}", ["VM.Config.Disk", "VM.Config.CDROM", "VM.Config.CPU", "VM.Config.Memory", "VM.Config.Network", "VM.Config.HWType", "VM.Config.Options", "VM.Config.Cloudinit"], "any", 1]}
                         *
                         * Parameters:
                         * - `acpi` (body, optional, boolean): Enable/disable ACPI.
                         * - `affinity` (body, optional, string): List of host cores used to execute guest processes, for example: 0,5,8-11
                         * - `agent` (body, optional, string): Enable/disable communication with the QEMU Guest Agent and its properties.
                         * - `allow-ksm` (body, optional, boolean): Allow memory pages of this guest to be merged via KSM (Kernel Samepage Merging).
                         * - `amd-sev` (body, optional, string): Secure Encrypted Virtualization (SEV) features by AMD CPUs
                         * - `arch` (body, optional, "x86_64" | "aarch64"): Virtual processor architecture. Defaults to the host.
                         * - `args` (body, optional, string): Arbitrary arguments passed to kvm.
                         * - `audio0` (body, optional, string): Configure a audio device, useful in combination with QXL/Spice.
                         * - `autostart` (body, optional, boolean): Automatic restart after crash (currently ignored).
                         * - `balloon` (body, optional, number): Amount of target RAM for the VM in MiB. Using zero disables the ballon driver.
                         * - `bios` (body, optional, "seabios" | "ovmf"): Select BIOS implementation.
                         * - `boot` (body, optional, string): Specify guest boot order. Use the 'order=' sub-property as usage with no key or 'legacy=' is deprecated.
                         * - `bootdisk` (body, optional, string): Enable booting from specified disk. Deprecated: Use 'boot: order=foo;bar' instead.
                         * - `cdrom` (body, optional, string): This is an alias for option -ide2
                         * - `cicustom` (body, optional, string): cloud-init: Specify custom files to replace the automatically generated ones at start.
                         * - `cipassword` (body, optional, string): cloud-init: Password to assign the user. Using this is generally not recommended. Use ssh keys instead. Also note that older cloud-init versions do not support hashed passwords.
                         * - `citype` (body, optional, "configdrive2" | "nocloud" | "opennebula"): Specifies the cloud-init configuration format. The default depends on the configured operating system type (`ostype`. We use the `nocloud` format for Linux, and `configdrive2` for windows.
                         * - `ciupgrade` (body, optional, boolean): cloud-init: do an automatic package upgrade after the first boot.
                         * - `ciuser` (body, optional, string): cloud-init: User name to change ssh keys and password for instead of the image's configured default user.
                         * - `cores` (body, optional, number): The number of cores per socket.
                         * - `cpu` (body, optional, string): Emulated CPU type.
                         * - `cpulimit` (body, optional, number): Limit of CPU usage.
                         * - `cpuunits` (body, optional, number): CPU weight for a VM, will be clamped to [1, 10000] in cgroup v2.
                         * - `delete` (body, optional, string): A list of settings you want to delete.
                         * - `description` (body, optional, string): Description for the VM. Shown in the web-interface VM's summary. This is saved as comment inside the configuration file.
                         * - `digest` (body, optional, string): Prevent changes if current configuration file has different SHA1 digest. This can be used to prevent concurrent modifications.
                         * - `efidisk0` (body, optional, string): Configure a disk for storing EFI vars. Use the special syntax STORAGE_ID:SIZE_IN_GiB to allocate a new volume. Note that SIZE_IN_GiB is ignored here and that the default EFI vars are copied to the volume instead. Use STORAGE_ID:0 and the 'import-from' parameter to import from an existing volume.
                         * - `force` (body, optional, boolean): Force physical removal. Without this, we simple remove the disk from the config file and create an additional configuration entry called 'unused[n]', which contains the volume ID. Unlink of unused[n] always cause physical removal.
                         * - `freeze` (body, optional, boolean): Freeze CPU at startup (use 'c' monitor command to start execution).
                         * - `hookscript` (body, optional, string): Script that will be executed during various steps in the vms lifetime.
                         * - `hostpci[n]` (body, optional, string): Map host PCI devices into guest.
                         * - `hotplug` (body, optional, string): Selectively enable hotplug features. This is a comma separated list of hotplug features: 'network', 'disk', 'cpu', 'memory', 'usb' and 'cloudinit'. Use '0' to disable hotplug completely. Using '1' as value is an alias for the default `network,disk,usb`. USB hotplugging is possible for guests with machine version >= 7.1 and ostype l26 or windows > 7.
                         * - `hugepages` (body, optional, "any" | "2" | "1024"): Enables hugepages memory.

                         Sets the size of hugepages in MiB. If the value is set to 'any' then 1 GiB hugepages will be used if possible, otherwise the size will fall back to 2 MiB.
                         * - `ide[n]` (body, optional, string): Use volume as IDE hard disk or CD-ROM (n is 0 to 3). Use the special syntax STORAGE_ID:SIZE_IN_GiB to allocate a new volume. Use STORAGE_ID:0 and the 'import-from' parameter to import from an existing volume.
                         * - `intel-tdx` (body, optional, string): Trusted Domain Extension (TDX) features by Intel CPUs
                         * - `ipconfig[n]` (body, optional, string): cloud-init: Specify IP addresses and gateways for the corresponding interface.

                         IP addresses use CIDR notation, gateways are optional but need an IP of the same type specified.

                         The special string 'dhcp' can be used for IP addresses to use DHCP, in which case no explicit
                         gateway should be provided.
                         For IPv6 the special string 'auto' can be used to use stateless autoconfiguration. This requires
                         cloud-init 19.4 or newer.

                         If cloud-init is enabled and neither an IPv4 nor an IPv6 address is specified, it defaults to using
                         dhcp on IPv4.
                         * - `ivshmem` (body, optional, string): Inter-VM shared memory. Useful for direct communication between VMs, or to the host.
                         * - `keephugepages` (body, optional, boolean): Use together with hugepages. If enabled, hugepages will not not be deleted after VM shutdown and can be used for subsequent starts.
                         * - `keyboard` (body, optional, "de" | "de-ch" | "da" | "en-gb" | "en-us" | "es" | "fi" | "fr" | "fr-be" | "fr-ca" | "fr-ch" | "hu" | "is" | "it" | "ja" | "lt" | "mk" | "nl" | "no" | "pl" | "pt" | "pt-br" | "sv" | "sl" | "tr"): Keyboard layout for VNC server. This option is generally not required and is often better handled from within the guest OS.
                         * - `kvm` (body, optional, boolean): Enable/disable KVM hardware virtualization.
                         * - `localtime` (body, optional, boolean): Set the real time clock (RTC) to local time. This is enabled by default if the `ostype` indicates a Microsoft Windows OS.
                         * - `lock` (body, optional, "backup" | "clone" | "create" | "migrate" | "rollback" | "snapshot" | "snapshot-delete" | "suspending" | "suspended"): Lock/unlock the VM.
                         * - `machine` (body, optional, string): Specify the QEMU machine.
                         * - `memory` (body, optional, string): Memory properties.
                         * - `migrate_downtime` (body, optional, number): Set maximum tolerated downtime (in seconds) for migrations. Should the migration not be able to converge in the very end, because too much newly dirtied RAM needs to be transferred, the limit will be increased automatically step-by-step until migration can converge.
                         * - `migrate_speed` (body, optional, number): Set maximum speed (in MB/s) for migrations. Value 0 is no limit.
                         * - `name` (body, optional, string): Set a name for the VM. Only used on the configuration web interface.
                         * - `nameserver` (body, optional, string): cloud-init: Sets DNS server IP address for a container. Create will automatically use the setting from the host if neither searchdomain nor nameserver are set.
                         * - `net[n]` (body, optional, string): Specify network devices.
                         * - `node` (path, required, string): The cluster node name.
                         * - `numa` (body, optional, boolean): Enable/disable NUMA.
                         * - `numa[n]` (body, optional, string): NUMA topology.
                         * - `onboot` (body, optional, boolean): Specifies whether a VM will be started during system bootup.
                         * - `ostype` (body, optional, "other" | "wxp" | "w2k" | "w2k3" | "w2k8" | "wvista" | "win7" | "win8" | "win10" | "win11" | "l24" | "l26" | "solaris"): Specify guest operating system.
                         * - `parallel[n]` (body, optional, string): Map host parallel devices (n is 0 to 2).
                         * - `protection` (body, optional, boolean): Sets the protection flag of the VM. This will disable the remove VM and remove disk operations.
                         * - `reboot` (body, optional, boolean): Allow reboot. If set to '0' the VM exit on reboot.
                         * - `revert` (body, optional, string): Revert a pending change.
                         * - `rng0` (body, optional, string): Configure a VirtIO-based Random Number Generator.
                         * - `sata[n]` (body, optional, string): Use volume as SATA hard disk or CD-ROM (n is 0 to 5). Use the special syntax STORAGE_ID:SIZE_IN_GiB to allocate a new volume. Use STORAGE_ID:0 and the 'import-from' parameter to import from an existing volume.
                         * - `scsi[n]` (body, optional, string): Use volume as SCSI hard disk or CD-ROM (n is 0 to 30). Use the special syntax STORAGE_ID:SIZE_IN_GiB to allocate a new volume. Use STORAGE_ID:0 and the 'import-from' parameter to import from an existing volume.
                         * - `scsihw` (body, optional, "lsi" | "lsi53c810" | "virtio-scsi-pci" | "virtio-scsi-single" | "megasas" | "pvscsi"): SCSI controller model
                         * - `searchdomain` (body, optional, string): cloud-init: Sets DNS search domains for a container. Create will automatically use the setting from the host if neither searchdomain nor nameserver are set.
                         * - `serial[n]` (body, optional, string): Create a serial device inside the VM (n is 0 to 3)
                         * - `shares` (body, optional, number): Amount of memory shares for auto-ballooning. The larger the number is, the more memory this VM gets. Number is relative to weights of all other running VMs. Using zero disables auto-ballooning. Auto-ballooning is done by pvestatd.
                         * - `skiplock` (body, optional, boolean): Ignore locks - only root is allowed to use this option.
                         * - `smbios1` (body, optional, string): Specify SMBIOS type 1 fields.
                         * - `smp` (body, optional, number): The number of CPUs. Please use option -sockets instead.
                         * - `sockets` (body, optional, number): The number of CPU sockets.
                         * - `spice_enhancements` (body, optional, string): Configure additional enhancements for SPICE.
                         * - `sshkeys` (body, optional, string): cloud-init: Setup public SSH keys (one key per line, OpenSSH format).
                         * - `startdate` (body, optional, string): Set the initial date of the real time clock. Valid format for date are:'now' or '2006-06-17T16:01:21' or '2006-06-17'.
                         * - `startup` (body, optional, string): Startup and shutdown behavior. Order is a non-negative number defining the general startup order. Shutdown in done with reverse ordering. Additionally you can set the 'up' or 'down' delay in seconds, which specifies a delay to wait before the next VM is started or stopped.
                         * - `tablet` (body, optional, boolean): Enable/disable the USB tablet device.
                         * - `tags` (body, optional, string): Tags of the VM. This is only meta information.
                         * - `tdf` (body, optional, boolean): Enable/disable time drift fix.
                         * - `template` (body, optional, boolean): Enable/disable Template.
                         * - `tpmstate0` (body, optional, string): Configure a Disk for storing TPM state. The format is fixed to 'raw'. Use the special syntax STORAGE_ID:SIZE_IN_GiB to allocate a new volume. Note that SIZE_IN_GiB is ignored here and 4 MiB will be used instead. Use STORAGE_ID:0 and the 'import-from' parameter to import from an existing volume.
                         * - `unused[n]` (body, optional, string): Reference to unused volumes. This is used internally, and should not be modified manually.
                         * - `usb[n]` (body, optional, string): Configure an USB device (n is 0 to 4, for machine version >= 7.1 and ostype l26 or windows > 7, n can be up to 14).
                         * - `vcpus` (body, optional, number): Number of hotplugged vcpus.
                         * - `vga` (body, optional, string): Configure the VGA hardware.
                         * - `virtio[n]` (body, optional, string): Use volume as VIRTIO hard disk (n is 0 to 15). Use the special syntax STORAGE_ID:SIZE_IN_GiB to allocate a new volume. Use STORAGE_ID:0 and the 'import-from' parameter to import from an existing volume.
                         * - `virtiofs[n]` (body, optional, string): Configuration for sharing a directory between host and guest using Virtio-fs.
                         * - `vmgenid` (body, optional, string): Set VM Generation ID. Use '1' to autogenerate on create or update, pass '0' to disable explicitly.
                         * - `vmid` (path, required, number): The (unique) ID of the VM.
                         * - `vmstatestorage` (body, optional, string): Default storage for VM state volumes/files.
                         * - `watchdog` (body, optional, string): Create a virtual hardware watchdog device.
                         */
                        update_sync: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/qemu/{vmid}/config"]["PUT"]['parameters']>>) => client.request("/nodes/{node}/qemu/{vmid}/config", "PUT", {
                            ...((args[0]) as any),
                            $path: {node, vmid: parseInt(vmid.toString())}
                        }),
                    },
                    /**
                     * Control the dbus-vmstate helper for a given running VM.
                     * @endpoint POST /nodes/{node}/qemu/{vmid}/dbus-vmstate
                     * @allowToken 1
                     * @permissions {"check": ["perm", "/vms/{vmid}", ["VM.Migrate"]]}
                     *
                     * Parameters:
                     * - `action` (body, required, "start" | "stop"): Action to perform on the DBus VMState helper.
                     * - `node` (path, required, string): The cluster node name.
                     * - `vmid` (path, required, number): The (unique) ID of the VM.
                     */
                    dbus_vmstate: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/qemu/{vmid}/dbus-vmstate"]["POST"]['parameters']>>) => client.request("/nodes/{node}/qemu/{vmid}/dbus-vmstate", "POST", {
                        ...((args[0]) as any),
                        $path: {node, vmid: parseInt(vmid.toString())}
                    }),
                    /**
                     * Check if feature for virtual machine is available.
                     * @endpoint GET /nodes/{node}/qemu/{vmid}/feature
                     * @allowToken 1
                     * @permissions {"check": ["perm", "/vms/{vmid}", ["VM.Audit"]]}
                     *
                     * Parameters:
                     * - `feature` (query, required, "snapshot" | "clone" | "copy"): Feature to check.
                     * - `node` (path, required, string): The cluster node name.
                     * - `snapname` (query, optional, string): The name of the snapshot.
                     * - `vmid` (path, required, number): The (unique) ID of the VM.
                     */
                    feature: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/qemu/{vmid}/feature"]["GET"]['parameters']>>) => client.request("/nodes/{node}/qemu/{vmid}/feature", "GET", {
                        ...((args[0]) as any),
                        $path: {node, vmid: parseInt(vmid.toString())}
                    }),
                    firewall: {
                        /**
                         * Directory index.
                         * @endpoint GET /nodes/{node}/qemu/{vmid}/firewall
                         * @allowToken 1
                         * @permissions {"user": "all"}
                         *
                         * Parameters:
                         * - `node` (path, required, string): The cluster node name.
                         * - `vmid` (path, required, number): The (unique) ID of the VM.
                         */
                        index: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/qemu/{vmid}/firewall"]["GET"]['parameters']>>) => client.request("/nodes/{node}/qemu/{vmid}/firewall", "GET", {
                            ...((args[0]) as any),
                            $path: {node, vmid: parseInt(vmid.toString())}
                        }),
                        aliases: {
                            /**
                             * List aliases
                             * @endpoint GET /nodes/{node}/qemu/{vmid}/firewall/aliases
                             * @allowToken 1
                             * @permissions {"check": ["perm", "/vms/{vmid}", ["VM.Audit"]]}
                             *
                             * Parameters:
                             * - `node` (path, required, string): The cluster node name.
                             * - `vmid` (path, required, number): The (unique) ID of the VM.
                             */
                            list: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/qemu/{vmid}/firewall/aliases"]["GET"]['parameters']>>) => client.request("/nodes/{node}/qemu/{vmid}/firewall/aliases", "GET", {
                                ...((args[0]) as any),
                                $path: {node, vmid: parseInt(vmid.toString())}
                            }),
                            /**
                             * Create IP or Network Alias.
                             * @endpoint POST /nodes/{node}/qemu/{vmid}/firewall/aliases
                             * @allowToken 1
                             * @permissions {"check": ["perm", "/vms/{vmid}", ["VM.Config.Network"]]}
                             *
                             * Parameters:
                             * - `cidr` (body, required, string): Network/IP specification in CIDR format.
                             * - `comment` (body, optional, string)
                             * - `name` (body, required, string): Alias name.
                             * - `node` (path, required, string): The cluster node name.
                             * - `vmid` (path, required, number): The (unique) ID of the VM.
                             */
                            create: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/qemu/{vmid}/firewall/aliases"]["POST"]['parameters']>>) => client.request("/nodes/{node}/qemu/{vmid}/firewall/aliases", "POST", {
                                ...((args[0]) as any),
                                $path: {node, vmid: parseInt(vmid.toString())}
                            }),
                            alias: (name: string) => ({
                                /**
                                 * Remove IP or Network alias.
                                 * @endpoint DELETE /nodes/{node}/qemu/{vmid}/firewall/aliases/{name}
                                 * @allowToken 1
                                 * @permissions {"check": ["perm", "/vms/{vmid}", ["VM.Config.Network"]]}
                                 *
                                 * Parameters:
                                 * - `digest` (query, optional, string): Prevent changes if current configuration file has a different digest. This can be used to prevent concurrent modifications.
                                 * - `name` (path, required, string): Alias name.
                                 * - `node` (path, required, string): The cluster node name.
                                 * - `vmid` (path, required, number): The (unique) ID of the VM.
                                 */
                                remove: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/qemu/{vmid}/firewall/aliases/{name}"]["DELETE"]['parameters']>>) => client.request("/nodes/{node}/qemu/{vmid}/firewall/aliases/{name}", "DELETE", {
                                    ...((args[0]) as any),
                                    $path: {node, vmid: parseInt(vmid.toString()), name}
                                }),
                                /**
                                 * Read alias.
                                 * @endpoint GET /nodes/{node}/qemu/{vmid}/firewall/aliases/{name}
                                 * @allowToken 1
                                 * @permissions {"check": ["perm", "/vms/{vmid}", ["VM.Audit"]]}
                                 *
                                 * Parameters:
                                 * - `name` (path, required, string): Alias name.
                                 * - `node` (path, required, string): The cluster node name.
                                 * - `vmid` (path, required, number): The (unique) ID of the VM.
                                 */
                                read: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/qemu/{vmid}/firewall/aliases/{name}"]["GET"]['parameters']>>) => client.request("/nodes/{node}/qemu/{vmid}/firewall/aliases/{name}", "GET", {
                                    ...((args[0]) as any),
                                    $path: {node, vmid: parseInt(vmid.toString()), name}
                                }),
                                /**
                                 * Update IP or Network alias.
                                 * @endpoint PUT /nodes/{node}/qemu/{vmid}/firewall/aliases/{name}
                                 * @allowToken 1
                                 * @permissions {"check": ["perm", "/vms/{vmid}", ["VM.Config.Network"]]}
                                 *
                                 * Parameters:
                                 * - `cidr` (body, required, string): Network/IP specification in CIDR format.
                                 * - `comment` (body, optional, string)
                                 * - `digest` (body, optional, string): Prevent changes if current configuration file has a different digest. This can be used to prevent concurrent modifications.
                                 * - `name` (path, required, string): Alias name.
                                 * - `node` (path, required, string): The cluster node name.
                                 * - `rename` (body, optional, string): Rename an existing alias.
                                 * - `vmid` (path, required, number): The (unique) ID of the VM.
                                 */
                                update: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/qemu/{vmid}/firewall/aliases/{name}"]["PUT"]['parameters']>>) => client.request("/nodes/{node}/qemu/{vmid}/firewall/aliases/{name}", "PUT", {
                                    ...((args[0]) as any),
                                    $path: {node, vmid: parseInt(vmid.toString()), name}
                                }),
                            })
                        },
                        ipset: {
                            /**
                             * List IPSets
                             * @endpoint GET /nodes/{node}/qemu/{vmid}/firewall/ipset
                             * @allowToken 1
                             * @permissions {"check": ["perm", "/vms/{vmid}", ["VM.Audit"]]}
                             *
                             * Parameters:
                             * - `node` (path, required, string): The cluster node name.
                             * - `vmid` (path, required, number): The (unique) ID of the VM.
                             */
                            list: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/qemu/{vmid}/firewall/ipset"]["GET"]['parameters']>>) => client.request("/nodes/{node}/qemu/{vmid}/firewall/ipset", "GET", {
                                ...((args[0]) as any),
                                $path: {node, vmid: parseInt(vmid.toString())}
                            }),
                            /**
                             * Create new IPSet
                             * @endpoint POST /nodes/{node}/qemu/{vmid}/firewall/ipset
                             * @allowToken 1
                             * @permissions {"check": ["perm", "/vms/{vmid}", ["VM.Config.Network"]]}
                             *
                             * Parameters:
                             * - `comment` (body, optional, string)
                             * - `digest` (body, optional, string): Prevent changes if current configuration file has a different digest. This can be used to prevent concurrent modifications.
                             * - `name` (body, required, string): IP set name.
                             * - `node` (path, required, string): The cluster node name.
                             * - `rename` (body, optional, string): Rename an existing IPSet. You can set 'rename' to the same value as 'name' to update the 'comment' of an existing IPSet.
                             * - `vmid` (path, required, number): The (unique) ID of the VM.
                             */
                            create: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/qemu/{vmid}/firewall/ipset"]["POST"]['parameters']>>) => client.request("/nodes/{node}/qemu/{vmid}/firewall/ipset", "POST", {
                                ...((args[0]) as any),
                                $path: {node, vmid: parseInt(vmid.toString())}
                            }),
                            name: (name: string) => ({
                                /**
                                 * Delete IPSet
                                 * @endpoint DELETE /nodes/{node}/qemu/{vmid}/firewall/ipset/{name}
                                 * @allowToken 1
                                 * @permissions {"check": ["perm", "/vms/{vmid}", ["VM.Config.Network"]]}
                                 *
                                 * Parameters:
                                 * - `force` (query, optional, boolean): Delete all members of the IPSet, if there are any.
                                 * - `name` (path, required, string): IP set name.
                                 * - `node` (path, required, string): The cluster node name.
                                 * - `vmid` (path, required, number): The (unique) ID of the VM.
                                 */
                                delete: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/qemu/{vmid}/firewall/ipset/{name}"]["DELETE"]['parameters']>>) => client.request("/nodes/{node}/qemu/{vmid}/firewall/ipset/{name}", "DELETE", {
                                    ...((args[0]) as any),
                                    $path: {node, vmid: parseInt(vmid.toString()), name}

                                }),
                                /**
                                 * List IPSet content
                                 * @endpoint GET /nodes/{node}/qemu/{vmid}/firewall/ipset/{name}
                                 * @allowToken 1
                                 * @permissions {"check": ["perm", "/vms/{vmid}", ["VM.Audit"]]}
                                 *
                                 * Parameters:
                                 * - `name` (path, required, string): IP set name.
                                 * - `node` (path, required, string): The cluster node name.
                                 * - `vmid` (path, required, number): The (unique) ID of the VM.
                                 */
                                get: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/qemu/{vmid}/firewall/ipset/{name}"]["GET"]['parameters']>>) => client.request("/nodes/{node}/qemu/{vmid}/firewall/ipset/{name}", "GET", {
                                    ...((args[0]) as any),
                                    $path: {node, vmid: parseInt(vmid.toString()), name}
                                }),
                                /**
                                 * Add IP or Network to IPSet.
                                 * @endpoint POST /nodes/{node}/qemu/{vmid}/firewall/ipset/{name}
                                 * @allowToken 1
                                 * @permissions {"check": ["perm", "/vms/{vmid}", ["VM.Config.Network"]]}
                                 *
                                 * Parameters:
                                 * - `cidr` (body, required, string): Network/IP specification in CIDR format.
                                 * - `comment` (body, optional, string)
                                 * - `name` (path, required, string): IP set name.
                                 * - `node` (path, required, string): The cluster node name.
                                 * - `nomatch` (body, optional, boolean)
                                 * - `vmid` (path, required, number): The (unique) ID of the VM.
                                 */
                                create_ip: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/qemu/{vmid}/firewall/ipset/{name}"]["POST"]['parameters']>>) => client.request("/nodes/{node}/qemu/{vmid}/firewall/ipset/{name}", "POST", {
                                    ...((args[0]) as any),
                                    $path: {node, vmid: parseInt(vmid.toString()), name}
                                }),
                                ip: (cidr: string) => ({
                                    /**
                                     * Remove IP or Network from IPSet.
                                     * @endpoint DELETE /nodes/{node}/qemu/{vmid}/firewall/ipset/{name}/{cidr}
                                     * @allowToken 1
                                     * @permissions {"check": ["perm", "/vms/{vmid}", ["VM.Config.Network"]]}
                                     *
                                     * Parameters:
                                     * - `cidr` (path, required, string): Network/IP specification in CIDR format.
                                     * - `digest` (query, optional, string): Prevent changes if current configuration file has a different digest. This can be used to prevent concurrent modifications.
                                     * - `name` (path, required, string): IP set name.
                                     * - `node` (path, required, string): The cluster node name.
                                     * - `vmid` (path, required, number): The (unique) ID of the VM.
                                     */
                                    remove: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/qemu/{vmid}/firewall/ipset/{name}/{cidr}"]["DELETE"]['parameters']>>) => client.request("/nodes/{node}/qemu/{vmid}/firewall/ipset/{name}/{cidr}", "DELETE", {
                                        ...((args[0]) as any),
                                        $path: {node, name, cidr, vmid: parseInt(vmid.toString())}
                                    }),
                                    /**
                                     * Read IP or Network settings from IPSet.
                                     * @endpoint GET /nodes/{node}/qemu/{vmid}/firewall/ipset/{name}/{cidr}
                                     * @allowToken 1
                                     * @permissions {"check": ["perm", "/vms/{vmid}", ["VM.Audit"]]}
                                     *
                                     * Parameters:
                                     * - `cidr` (path, required, string): Network/IP specification in CIDR format.
                                     * - `name` (path, required, string): IP set name.
                                     * - `node` (path, required, string): The cluster node name.
                                     * - `vmid` (path, required, number): The (unique) ID of the VM.
                                     */
                                    read: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/qemu/{vmid}/firewall/ipset/{name}/{cidr}"]["GET"]['parameters']>>) => client.request("/nodes/{node}/qemu/{vmid}/firewall/ipset/{name}/{cidr}", "GET", {
                                        ...((args[0]) as any),
                                        $path: {node, name, cidr, vmid: parseInt(vmid.toString())}
                                    }),
                                    /**
                                     * Update IP or Network settings
                                     * @endpoint PUT /nodes/{node}/qemu/{vmid}/firewall/ipset/{name}/{cidr}
                                     * @allowToken 1
                                     * @permissions {"check": ["perm", "/vms/{vmid}", ["VM.Config.Network"]]}
                                     *
                                     * Parameters:
                                     * - `cidr` (path, required, string): Network/IP specification in CIDR format.
                                     * - `comment` (body, optional, string)
                                     * - `digest` (body, optional, string): Prevent changes if current configuration file has a different digest. This can be used to prevent concurrent modifications.
                                     * - `name` (path, required, string): IP set name.
                                     * - `node` (path, required, string): The cluster node name.
                                     * - `nomatch` (body, optional, boolean)
                                     * - `vmid` (path, required, number): The (unique) ID of the VM.
                                     */
                                    update: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/qemu/{vmid}/firewall/ipset/{name}/{cidr}"]["PUT"]['parameters']>>) => client.request("/nodes/{node}/qemu/{vmid}/firewall/ipset/{name}/{cidr}", "PUT", {
                                        ...((args[0]) as any),
                                        $path: {node, name, cidr, vmid: parseInt(vmid.toString())}
                                    }),
                                })
                            })
                        },
                        /**
                         * Read firewall log
                         * @endpoint GET /nodes/{node}/qemu/{vmid}/firewall/log
                         * @allowToken 1
                         * @permissions {"check": ["perm", "/vms/{vmid}", ["VM.Console"]]}
                         *
                         * Parameters:
                         * - `limit` (query, optional, number)
                         * - `node` (path, required, string): The cluster node name.
                         * - `since` (query, optional, number): Display log since this UNIX epoch.
                         * - `start` (query, optional, number)
                         * - `until` (query, optional, number): Display log until this UNIX epoch.
                         * - `vmid` (path, required, number): The (unique) ID of the VM.
                         */
                        log: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/qemu/{vmid}/firewall/log"]["GET"]['parameters']>>) => client.request("/nodes/{node}/qemu/{vmid}/firewall/log", "GET", {
                            ...((args[0]) as any),
                            $path: {node, vmid: parseInt(vmid.toString())}
                        }),
                        options: {
                            /**
                             * Get VM firewall options.
                             * @endpoint GET /nodes/{node}/qemu/{vmid}/firewall/options
                             * @allowToken 1
                             * @permissions {"check": ["perm", "/vms/{vmid}", ["VM.Audit"]]}
                             *
                             * Parameters:
                             * - `node` (path, required, string): The cluster node name.
                             * - `vmid` (path, required, number): The (unique) ID of the VM.
                             */
                            get: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/qemu/{vmid}/firewall/options"]["GET"]['parameters']>>) => client.request("/nodes/{node}/qemu/{vmid}/firewall/options", "GET", {
                                ...((args[0]) as any),
                                $path: {node, vmid: parseInt(vmid.toString())}
                            }),
                            /**
                             * Set Firewall options.
                             * @endpoint PUT /nodes/{node}/qemu/{vmid}/firewall/options
                             * @allowToken 1
                             * @permissions {"check": ["perm", "/vms/{vmid}", ["VM.Config.Network"]]}
                             *
                             * Parameters:
                             * - `delete` (body, optional, string): A list of settings you want to delete.
                             * - `dhcp` (body, optional, boolean): Enable DHCP.
                             * - `digest` (body, optional, string): Prevent changes if current configuration file has a different digest. This can be used to prevent concurrent modifications.
                             * - `enable` (body, optional, boolean): Enable/disable firewall rules.
                             * - `ipfilter` (body, optional, boolean): Enable default IP filters. This is equivalent to adding an empty ipfilter-net<id> ipset for every interface. Such ipsets implicitly contain sane default restrictions such as restricting IPv6 link local addresses to the one derived from the interface's MAC address. For containers the configured IP addresses will be implicitly added.
                             * - `log_level_in` (body, optional, "emerg" | "alert" | "crit" | "err" | "warning" | "notice" | "info" | "debug" | "nolog"): Log level for incoming traffic.
                             * - `log_level_out` (body, optional, "emerg" | "alert" | "crit" | "err" | "warning" | "notice" | "info" | "debug" | "nolog"): Log level for outgoing traffic.
                             * - `macfilter` (body, optional, boolean): Enable/disable MAC address filter.
                             * - `ndp` (body, optional, boolean): Enable NDP (Neighbor Discovery Protocol).
                             * - `node` (path, required, string): The cluster node name.
                             * - `policy_in` (body, optional, "ACCEPT" | "REJECT" | "DROP"): Input policy.
                             * - `policy_out` (body, optional, "ACCEPT" | "REJECT" | "DROP"): Output policy.
                             * - `radv` (body, optional, boolean): Allow sending Router Advertisement.
                             * - `vmid` (path, required, number): The (unique) ID of the VM.
                             */
                            set: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/qemu/{vmid}/firewall/options"]["PUT"]['parameters']>>) => client.request("/nodes/{node}/qemu/{vmid}/firewall/options", "PUT", {
                                ...((args[0]) as any),
                                $path: {node, vmid: parseInt(vmid.toString())}
                            }),
                        },
                        /**
                         * Lists possible IPSet/Alias reference which are allowed in source/dest properties.
                         * @endpoint GET /nodes/{node}/qemu/{vmid}/firewall/refs
                         * @allowToken 1
                         * @permissions {"check": ["perm", "/vms/{vmid}", ["VM.Audit"]]}
                         *
                         * Parameters:
                         * - `node` (path, required, string): The cluster node name.
                         * - `type` (query, optional, "alias" | "ipset"): Only list references of specified type.
                         * - `vmid` (path, required, number): The (unique) ID of the VM.
                         */
                        refs: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/qemu/{vmid}/firewall/refs"]["GET"]['parameters']>>) => client.request("/nodes/{node}/qemu/{vmid}/firewall/refs", "GET", {
                            ...((args[0]) as any),
                            $path: {node, vmid: parseInt(vmid.toString())}
                        }),
                        rules: {
                            /**
                             * List rules.
                             * @endpoint GET /nodes/{node}/qemu/{vmid}/firewall/rules
                             * @allowToken 1
                             * @permissions {"check": ["perm", "/vms/{vmid}", ["VM.Audit"]]}
                             *
                             * Parameters:
                             * - `node` (path, required, string): The cluster node name.
                             * - `vmid` (path, required, number): The (unique) ID of the VM.
                             */
                            list: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/qemu/{vmid}/firewall/rules"]["GET"]['parameters']>>) => client.request("/nodes/{node}/qemu/{vmid}/firewall/rules", "GET", {
                                ...((args[0]) as any),
                                $path: {node, vmid: parseInt(vmid.toString())}
                            }),
                            /**
                             * Create new rule.
                             * @endpoint POST /nodes/{node}/qemu/{vmid}/firewall/rules
                             * @allowToken 1
                             * @permissions {"check": ["perm", "/vms/{vmid}", ["VM.Config.Network"]]}
                             *
                             * Parameters:
                             * - `action` (body, required, string): Rule action ('ACCEPT', 'DROP', 'REJECT') or security group name.
                             * - `comment` (body, optional, string): Descriptive comment.
                             * - `dest` (body, optional, string): Restrict packet destination address. This can refer to a single IP address, an IP set ('+ipsetname') or an IP alias definition. You can also specify an address range like '20.34.101.207-201.3.9.99', or a list of IP addresses and networks (entries are separated by comma). Please do not mix IPv4 and IPv6 addresses inside such lists.
                             * - `digest` (body, optional, string): Prevent changes if current configuration file has a different digest. This can be used to prevent concurrent modifications.
                             * - `dport` (body, optional, string): Restrict TCP/UDP destination port. You can use service names or simple numbers (0-65535), as defined in '/etc/services'. Port ranges can be specified with '\d+:\d+', for example '80:85', and you can use comma separated list to match several ports or ranges.
                             * - `enable` (body, optional, number): Flag to enable/disable a rule.
                             * - `icmp-type` (body, optional, string): Specify icmp-type. Only valid if proto equals 'icmp' or 'icmpv6'/'ipv6-icmp'.
                             * - `iface` (body, optional, string): Network interface name. You have to use network configuration key names for VMs and containers ('net\d+'). Host related rules can use arbitrary strings.
                             * - `log` (body, optional, "emerg" | "alert" | "crit" | "err" | "warning" | "notice" | "info" | "debug" | "nolog"): Log level for firewall rule.
                             * - `macro` (body, optional, string): Use predefined standard macro.
                             * - `node` (path, required, string): The cluster node name.
                             * - `pos` (body, optional, number): Update rule at position <pos>.
                             * - `proto` (body, optional, string): IP protocol. You can use protocol names ('tcp'/'udp') or simple numbers, as defined in '/etc/protocols'.
                             * - `source` (body, optional, string): Restrict packet source address. This can refer to a single IP address, an IP set ('+ipsetname') or an IP alias definition. You can also specify an address range like '20.34.101.207-201.3.9.99', or a list of IP addresses and networks (entries are separated by comma). Please do not mix IPv4 and IPv6 addresses inside such lists.
                             * - `sport` (body, optional, string): Restrict TCP/UDP source port. You can use service names or simple numbers (0-65535), as defined in '/etc/services'. Port ranges can be specified with '\d+:\d+', for example '80:85', and you can use comma separated list to match several ports or ranges.
                             * - `type` (body, required, "in" | "out" | "forward" | "group"): Rule type.
                             * - `vmid` (path, required, number): The (unique) ID of the VM.
                             */
                            create_rule: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/qemu/{vmid}/firewall/rules"]["POST"]['parameters']>>) => client.request("/nodes/{node}/qemu/{vmid}/firewall/rules", "POST", {
                                ...((args[0]) as any),
                                $path: {node, vmid: parseInt(vmid.toString())}
                            }),
                            rule: (pos: number) => ({
                                /**
                                 * Delete rule.
                                 * @endpoint DELETE /nodes/{node}/qemu/{vmid}/firewall/rules/{pos}
                                 * @allowToken 1
                                 * @permissions {"check": ["perm", "/vms/{vmid}", ["VM.Config.Network"]]}
                                 *
                                 * Parameters:
                                 * - `digest` (query, optional, string): Prevent changes if current configuration file has a different digest. This can be used to prevent concurrent modifications.
                                 * - `node` (path, required, string): The cluster node name.
                                 * - `pos` (path, optional, number): Update rule at position <pos>.
                                 * - `vmid` (path, required, number): The (unique) ID of the VM.
                                 */
                                delete: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/qemu/{vmid}/firewall/rules/{pos}"]["DELETE"]['parameters']>>) => client.request("/nodes/{node}/qemu/{vmid}/firewall/rules/{pos}", "DELETE", {
                                    ...((args[0]) as any),
                                    $path: {node, vmid: parseInt(vmid.toString()), pos}
                                }),
                                /**
                                 * Get single rule data.
                                 * @endpoint GET /nodes/{node}/qemu/{vmid}/firewall/rules/{pos}
                                 * @allowToken 1
                                 * @permissions {"check": ["perm", "/vms/{vmid}", ["VM.Audit"]]}
                                 *
                                 * Parameters:
                                 * - `node` (path, required, string): The cluster node name.
                                 * - `pos` (path, optional, number): Update rule at position <pos>.
                                 * - `vmid` (path, required, number): The (unique) ID of the VM.
                                 */
                                get: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/qemu/{vmid}/firewall/rules/{pos}"]["GET"]['parameters']>>) => client.request("/nodes/{node}/qemu/{vmid}/firewall/rules/{pos}", "GET", {
                                    ...((args[0]) as any),
                                    $path: {node, vmid: parseInt(vmid.toString()), pos}
                                }),
                                /**
                                 * Modify rule data.
                                 * @endpoint PUT /nodes/{node}/qemu/{vmid}/firewall/rules/{pos}
                                 * @allowToken 1
                                 * @permissions {"check": ["perm", "/vms/{vmid}", ["VM.Config.Network"]]}
                                 *
                                 * Parameters:
                                 * - `action` (body, optional, string): Rule action ('ACCEPT', 'DROP', 'REJECT') or security group name.
                                 * - `comment` (body, optional, string): Descriptive comment.
                                 * - `delete` (body, optional, string): A list of settings you want to delete.
                                 * - `dest` (body, optional, string): Restrict packet destination address. This can refer to a single IP address, an IP set ('+ipsetname') or an IP alias definition. You can also specify an address range like '20.34.101.207-201.3.9.99', or a list of IP addresses and networks (entries are separated by comma). Please do not mix IPv4 and IPv6 addresses inside such lists.
                                 * - `digest` (body, optional, string): Prevent changes if current configuration file has a different digest. This can be used to prevent concurrent modifications.
                                 * - `dport` (body, optional, string): Restrict TCP/UDP destination port. You can use service names or simple numbers (0-65535), as defined in '/etc/services'. Port ranges can be specified with '\d+:\d+', for example '80:85', and you can use comma separated list to match several ports or ranges.
                                 * - `enable` (body, optional, number): Flag to enable/disable a rule.
                                 * - `icmp-type` (body, optional, string): Specify icmp-type. Only valid if proto equals 'icmp' or 'icmpv6'/'ipv6-icmp'.
                                 * - `iface` (body, optional, string): Network interface name. You have to use network configuration key names for VMs and containers ('net\d+'). Host related rules can use arbitrary strings.
                                 * - `log` (body, optional, "emerg" | "alert" | "crit" | "err" | "warning" | "notice" | "info" | "debug" | "nolog"): Log level for firewall rule.
                                 * - `macro` (body, optional, string): Use predefined standard macro.
                                 * - `moveto` (body, optional, number): Move rule to new position <moveto>. Other arguments are ignored.
                                 * - `node` (path, required, string): The cluster node name.
                                 * - `pos` (path, optional, number): Update rule at position <pos>.
                                 * - `proto` (body, optional, string): IP protocol. You can use protocol names ('tcp'/'udp') or simple numbers, as defined in '/etc/protocols'.
                                 * - `source` (body, optional, string): Restrict packet source address. This can refer to a single IP address, an IP set ('+ipsetname') or an IP alias definition. You can also specify an address range like '20.34.101.207-201.3.9.99', or a list of IP addresses and networks (entries are separated by comma). Please do not mix IPv4 and IPv6 addresses inside such lists.
                                 * - `sport` (body, optional, string): Restrict TCP/UDP source port. You can use service names or simple numbers (0-65535), as defined in '/etc/services'. Port ranges can be specified with '\d+:\d+', for example '80:85', and you can use comma separated list to match several ports or ranges.
                                 * - `type` (body, optional, "in" | "out" | "forward" | "group"): Rule type.
                                 * - `vmid` (path, required, number): The (unique) ID of the VM.
                                 */
                                update: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/qemu/{vmid}/firewall/rules/{pos}"]["PUT"]['parameters']>>) => client.request("/nodes/{node}/qemu/{vmid}/firewall/rules/{pos}", "PUT", {
                                    ...((args[0]) as any),
                                    $path: {node, vmid: parseInt(vmid.toString()), pos}
                                }),
                            })
                        }
                    },
                    migrate: {
                        /**
                         * Get preconditions for migration.
                         * @endpoint GET /nodes/{node}/qemu/{vmid}/migrate
                         * @allowToken 1
                         * @permissions {"check": ["perm", "/vms/{vmid}", ["VM.Migrate"]]}
                         *
                         * Parameters:
                         * - `node` (path, required, string): The cluster node name.
                         * - `target` (query, optional, string): Target node.
                         * - `vmid` (path, required, number): The (unique) ID of the VM.
                         */
                        migrate_vm_precondition: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/qemu/{vmid}/migrate"]["GET"]['parameters']>>) => client.request("/nodes/{node}/qemu/{vmid}/migrate", "GET", {
                            ...((args[0]) as any),
                            $path: {node, vmid: parseInt(vmid.toString())}
                        }),
                        /**
                         * Migrate virtual machine. Creates a new migration task.
                         * @endpoint POST /nodes/{node}/qemu/{vmid}/migrate
                         * @allowToken 1
                         * @permissions {"check": ["perm", "/vms/{vmid}", ["VM.Migrate"]]}
                         *
                         * Parameters:
                         * - `bwlimit` (body, optional, number): Override I/O bandwidth limit (in KiB/s).
                         * - `force` (body, optional, boolean): Allow to migrate VMs which use local devices. Only root may use this option.
                         * - `migration_network` (body, optional, string): CIDR of the (sub) network that is used for migration.
                         * - `migration_type` (body, optional, "secure" | "insecure"): Migration traffic is encrypted using an SSH tunnel by default. On secure, completely private networks this can be disabled to increase performance.
                         * - `node` (path, required, string): The cluster node name.
                         * - `online` (body, optional, boolean): Use online/live migration if VM is running. Ignored if VM is stopped.
                         * - `target` (body, required, string): Target node.
                         * - `targetstorage` (body, optional, string): Mapping from source to target storages. Providing only a single storage ID maps all source storages to that storage. Providing the special value '1' will map each source storage to itself.
                         * - `vmid` (path, required, number): The (unique) ID of the VM.
                         * - `with-conntrack-state` (body, optional, boolean): Whether to migrate conntrack entries for running VMs.
                         * - `with-local-disks` (body, optional, boolean): Enable live storage migration for local disk
                         */
                        migrate_vm: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/qemu/{vmid}/migrate"]["POST"]['parameters']>>) => client.request("/nodes/{node}/qemu/{vmid}/migrate", "POST", {
                            ...((args[0]) as any),
                            $path: {node, vmid: parseInt(vmid.toString())}
                        }),
                    },
                    /**
                     * Execute QEMU monitor commands.
                     * @endpoint POST /nodes/{node}/qemu/{vmid}/monitor
                     * @allowToken 1
                     * @permissions {"check": ["perm", "/vms/{vmid}", ["Sys.Audit", "Sys.Modify"], "any", 1], "description": "The following commands do not require any additional privilege: ?, help, info\n\nThe following commands require 'Sys.Modify': announce_self, backup_cancel, balloon, block_job_cancel, block_job_complete, block_job_pause, block_job_resume, block_job_set_speed, block_resize, block_set_io_throttle, boot_set, c, calc_dirty_rate, cancel_vcpu_dirty_limit, chardev-send-break, closefd, commit, cont, cpu, delvm, eject, exit_preconfig, expire_password, getfd, gpa2hpa, gpa2hva, gva2gpa, i, loadvm, log, migrate_cancel, migrate_continue, migrate_pause, migrate_set_capability, migrate_set_parameter, migrate_start_postcopy, mouse_button, mouse_move, mouse_set, one-insn-per-tb, p, print, q, qemu-io, qom-get, qom-list, quit, replay_break, replay_delete_break, replay_seek, ringbuf_read, ringbuf_write, s, savevm, sendkey, set_link, set_password, set_vcpu_dirty_limit, snapshot_blkdev_internal, snapshot_delete_blkdev_internal, stop, stopcapture, sum, sync-profile, system_powerdown, system_reset, system_wakeup, trace-event, x, x_colo_lost_heartbeat, xp\n\nThe following commands are root-only: backup, block_stream, change, chardev-add, chardev-change, chardev-remove, client_migrate_info, device_add, device_del, drive_add, drive_backup, drive_del, drive_mirror, dump-guest-memory, dumpdtb, gdbserver, hostfwd_add, hostfwd_remove, logfile, mce, memsave, migrate, migrate_incoming, migrate_recover, nbd_server_add, nbd_server_remove, nbd_server_start, nbd_server_stop, netdev_add, netdev_del, nmi, o, object_add, object_del, pcie_aer_inject_error, pmemsave, qom-set, savevm-end, savevm-start, screendump, snapshot_blkdev, watchdog_action, wavcapture, xen-event-inject, xen-event-list\n"}
                     *
                     * Parameters:
                     * - `command` (body, required, string): The monitor command.
                     * - `node` (path, required, string): The cluster node name.
                     * - `vmid` (path, required, number): The (unique) ID of the VM.
                     */
                    monitor: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/qemu/{vmid}/monitor"]["POST"]['parameters']>>) => client.request("/nodes/{node}/qemu/{vmid}/monitor", "POST", {
                        ...((args[0]) as any),
                        $path: {node, vmid: parseInt(vmid.toString())}
                    }),

                    /**
                     * Move volume to different storage or to a different VM.
                     * @endpoint POST /nodes/{node}/qemu/{vmid}/move_disk
                     * @allowToken 1
                     * @permissions {"check": ["perm", "/vms/{vmid}", ["VM.Config.Disk"]], "description": "You need 'VM.Config.Disk' permissions on /vms/{vmid}, and 'Datastore.AllocateSpace' permissions on the storage. To move a disk to another VM, you need the permissions on the target VM as well."}
                     *
                     * Parameters:
                     * - `bwlimit` (body, optional, number): Override I/O bandwidth limit (in KiB/s).
                     * - `delete` (body, optional, boolean): Delete the original disk after successful copy. By default the original disk is kept as unused disk.
                     * - `digest` (body, optional, string): Prevent changes if current configuration file has different SHA1 digest. This can be used to prevent concurrent modifications.
                     * - `disk` (body, required, "ide0" | "ide1" | "ide2" | "ide3" | "scsi0" | "scsi1" | "scsi2" | "scsi3" | "scsi4" | "scsi5" | "scsi6" | "scsi7" | "scsi8" | "scsi9" | "scsi10" | "scsi11" | "scsi12" | "scsi13" | "scsi14" | "scsi15" | "scsi16" | "scsi17" | "scsi18" | "scsi19" | "scsi20" | "scsi21" | "scsi22" | "scsi23" | "scsi24" | "scsi25" | "scsi26" | "scsi27" | "scsi28" | "scsi29" | "scsi30" | "virtio0" | "virtio1" | "virtio2" | "virtio3" | "virtio4" | "virtio5" | "virtio6" | "virtio7" | "virtio8" | "virtio9" | "virtio10" | "virtio11" | "virtio12" | "virtio13" | "virtio14" | "virtio15" | "sata0" | "sata1" | "sata2" | "sata3" | "sata4" | "sata5" | "efidisk0" | "tpmstate0" | "unused0" | "unused1" | "unused2" | "unused3" | "unused4" | "unused5" | "unused6" | "unused7" | "unused8" | "unused9" | "unused10" | "unused11" | "unused12" | "unused13" | "unused14" | "unused15" | "unused16" | "unused17" | "unused18" | "unused19" | "unused20" | "unused21" | "unused22" | "unused23" | "unused24" | "unused25" | "unused26" | "unused27" | "unused28" | "unused29" | "unused30" | "unused31" | "unused32" | "unused33" | "unused34" | "unused35" | "unused36" | "unused37" | "unused38" | "unused39" | "unused40" | "unused41" | "unused42" | "unused43" | "unused44" | "unused45" | "unused46" | "unused47" | "unused48" | "unused49" | "unused50" | "unused51" | "unused52" | "unused53" | "unused54" | "unused55" | "unused56" | "unused57" | "unused58" | "unused59" | "unused60" | "unused61" | "unused62" | "unused63" | "unused64" | "unused65" | "unused66" | "unused67" | "unused68" | "unused69" | "unused70" | "unused71" | "unused72" | "unused73" | "unused74" | "unused75" | "unused76" | "unused77" | "unused78" | "unused79" | "unused80" | "unused81" | "unused82" | "unused83" | "unused84" | "unused85" | "unused86" | "unused87" | "unused88" | "unused89" | "unused90" | "unused91" | "unused92" | "unused93" | "unused94" | "unused95" | "unused96" | "unused97" | "unused98" | "unused99" | "unused100" | "unused101" | "unused102" | "unused103" | "unused104" | "unused105" | "unused106" | "unused107" | "unused108" | "unused109" | "unused110" | "unused111" | "unused112" | "unused113" | "unused114" | "unused115" | "unused116" | "unused117" | "unused118" | "unused119" | "unused120" | "unused121" | "unused122" | "unused123" | "unused124" | "unused125" | "unused126" | "unused127" | "unused128" | "unused129" | "unused130" | "unused131" | "unused132" | "unused133" | "unused134" | "unused135" | "unused136" | "unused137" | "unused138" | "unused139" | "unused140" | "unused141" | "unused142" | "unused143" | "unused144" | "unused145" | "unused146" | "unused147" | "unused148" | "unused149" | "unused150" | "unused151" | "unused152" | "unused153" | "unused154" | "unused155" | "unused156" | "unused157" | "unused158" | "unused159" | "unused160" | "unused161" | "unused162" | "unused163" | "unused164" | "unused165" | "unused166" | "unused167" | "unused168" | "unused169" | "unused170" | "unused171" | "unused172" | "unused173" | "unused174" | "unused175" | "unused176" | "unused177" | "unused178" | "unused179" | "unused180" | "unused181" | "unused182" | "unused183" | "unused184" | "unused185" | "unused186" | "unused187" | "unused188" | "unused189" | "unused190" | "unused191" | "unused192" | "unused193" | "unused194" | "unused195" | "unused196" | "unused197" | "unused198" | "unused199" | "unused200" | "unused201" | "unused202" | "unused203" | "unused204" | "unused205" | "unused206" | "unused207" | "unused208" | "unused209" | "unused210" | "unused211" | "unused212" | "unused213" | "unused214" | "unused215" | "unused216" | "unused217" | "unused218" | "unused219" | "unused220" | "unused221" | "unused222" | "unused223" | "unused224" | "unused225" | "unused226" | "unused227" | "unused228" | "unused229" | "unused230" | "unused231" | "unused232" | "unused233" | "unused234" | "unused235" | "unused236" | "unused237" | "unused238" | "unused239" | "unused240" | "unused241" | "unused242" | "unused243" | "unused244" | "unused245" | "unused246" | "unused247" | "unused248" | "unused249" | "unused250" | "unused251" | "unused252" | "unused253" | "unused254" | "unused255"): The disk you want to move.
                     * - `format` (body, optional, "raw" | "qcow2" | "vmdk"): Target Format.
                     * - `node` (path, required, string): The cluster node name.
                     * - `storage` (body, optional, string): Target storage.
                     * - `target-digest` (body, optional, string): Prevent changes if the current config file of the target VM has a different SHA1 digest. This can be used to detect concurrent modifications.
                     * - `target-disk` (body, optional, "ide0" | "ide1" | "ide2" | "ide3" | "scsi0" | "scsi1" | "scsi2" | "scsi3" | "scsi4" | "scsi5" | "scsi6" | "scsi7" | "scsi8" | "scsi9" | "scsi10" | "scsi11" | "scsi12" | "scsi13" | "scsi14" | "scsi15" | "scsi16" | "scsi17" | "scsi18" | "scsi19" | "scsi20" | "scsi21" | "scsi22" | "scsi23" | "scsi24" | "scsi25" | "scsi26" | "scsi27" | "scsi28" | "scsi29" | "scsi30" | "virtio0" | "virtio1" | "virtio2" | "virtio3" | "virtio4" | "virtio5" | "virtio6" | "virtio7" | "virtio8" | "virtio9" | "virtio10" | "virtio11" | "virtio12" | "virtio13" | "virtio14" | "virtio15" | "sata0" | "sata1" | "sata2" | "sata3" | "sata4" | "sata5" | "efidisk0" | "tpmstate0" | "unused0" | "unused1" | "unused2" | "unused3" | "unused4" | "unused5" | "unused6" | "unused7" | "unused8" | "unused9" | "unused10" | "unused11" | "unused12" | "unused13" | "unused14" | "unused15" | "unused16" | "unused17" | "unused18" | "unused19" | "unused20" | "unused21" | "unused22" | "unused23" | "unused24" | "unused25" | "unused26" | "unused27" | "unused28" | "unused29" | "unused30" | "unused31" | "unused32" | "unused33" | "unused34" | "unused35" | "unused36" | "unused37" | "unused38" | "unused39" | "unused40" | "unused41" | "unused42" | "unused43" | "unused44" | "unused45" | "unused46" | "unused47" | "unused48" | "unused49" | "unused50" | "unused51" | "unused52" | "unused53" | "unused54" | "unused55" | "unused56" | "unused57" | "unused58" | "unused59" | "unused60" | "unused61" | "unused62" | "unused63" | "unused64" | "unused65" | "unused66" | "unused67" | "unused68" | "unused69" | "unused70" | "unused71" | "unused72" | "unused73" | "unused74" | "unused75" | "unused76" | "unused77" | "unused78" | "unused79" | "unused80" | "unused81" | "unused82" | "unused83" | "unused84" | "unused85" | "unused86" | "unused87" | "unused88" | "unused89" | "unused90" | "unused91" | "unused92" | "unused93" | "unused94" | "unused95" | "unused96" | "unused97" | "unused98" | "unused99" | "unused100" | "unused101" | "unused102" | "unused103" | "unused104" | "unused105" | "unused106" | "unused107" | "unused108" | "unused109" | "unused110" | "unused111" | "unused112" | "unused113" | "unused114" | "unused115" | "unused116" | "unused117" | "unused118" | "unused119" | "unused120" | "unused121" | "unused122" | "unused123" | "unused124" | "unused125" | "unused126" | "unused127" | "unused128" | "unused129" | "unused130" | "unused131" | "unused132" | "unused133" | "unused134" | "unused135" | "unused136" | "unused137" | "unused138" | "unused139" | "unused140" | "unused141" | "unused142" | "unused143" | "unused144" | "unused145" | "unused146" | "unused147" | "unused148" | "unused149" | "unused150" | "unused151" | "unused152" | "unused153" | "unused154" | "unused155" | "unused156" | "unused157" | "unused158" | "unused159" | "unused160" | "unused161" | "unused162" | "unused163" | "unused164" | "unused165" | "unused166" | "unused167" | "unused168" | "unused169" | "unused170" | "unused171" | "unused172" | "unused173" | "unused174" | "unused175" | "unused176" | "unused177" | "unused178" | "unused179" | "unused180" | "unused181" | "unused182" | "unused183" | "unused184" | "unused185" | "unused186" | "unused187" | "unused188" | "unused189" | "unused190" | "unused191" | "unused192" | "unused193" | "unused194" | "unused195" | "unused196" | "unused197" | "unused198" | "unused199" | "unused200" | "unused201" | "unused202" | "unused203" | "unused204" | "unused205" | "unused206" | "unused207" | "unused208" | "unused209" | "unused210" | "unused211" | "unused212" | "unused213" | "unused214" | "unused215" | "unused216" | "unused217" | "unused218" | "unused219" | "unused220" | "unused221" | "unused222" | "unused223" | "unused224" | "unused225" | "unused226" | "unused227" | "unused228" | "unused229" | "unused230" | "unused231" | "unused232" | "unused233" | "unused234" | "unused235" | "unused236" | "unused237" | "unused238" | "unused239" | "unused240" | "unused241" | "unused242" | "unused243" | "unused244" | "unused245" | "unused246" | "unused247" | "unused248" | "unused249" | "unused250" | "unused251" | "unused252" | "unused253" | "unused254" | "unused255"): The config key the disk will be moved to on the target VM (for example, ide0 or scsi1). Default is the source disk key.
                     * - `target-vmid` (body, optional, number): The (unique) ID of the VM.
                     * - `vmid` (path, required, number): The (unique) ID of the VM.
                     */
                    move_disk: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/qemu/{vmid}/move_disk"]["POST"]['parameters']>>) => client.request("/nodes/{node}/qemu/{vmid}/move_disk", "POST", {
                        ...((args[0]) as any),
                        $path: {node, vmid: parseInt(vmid.toString())}
                    }),
                    /**
                     * Migration tunnel endpoint - only for internal use by VM migration.
                     * @endpoint POST /nodes/{node}/qemu/{vmid}/mtunnel
                     * @allowToken 1
                     * @permissions {"check": ["and", ["perm", "/vms/{vmid}", ["VM.Allocate"]], ["perm", "/", ["Sys.Incoming"]]], "description": "You need 'VM.Allocate' permissions on '/vms/{vmid}' and Sys.Incoming on '/'. Further permission checks happen during the actual migration."}
                     *
                     * Parameters:
                     * - `bridges` (body, optional, string): List of network bridges to check availability. Will be checked again for actually used bridges during migration.
                     * - `node` (path, required, string): The cluster node name.
                     * - `storages` (body, optional, string): List of storages to check permission and availability. Will be checked again for all actually used storages during migration.
                     * - `vmid` (path, required, number): The (unique) ID of the VM.
                     */
                    mtunnel: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/qemu/{vmid}/mtunnel"]["POST"]['parameters']>>) => client.request("/nodes/{node}/qemu/{vmid}/mtunnel", "POST", {
                        ...((args[0]) as any),
                        $path: {node, vmid: parseInt(vmid.toString())}
                    }),
                    /**
                     * Migration tunnel endpoint for websocket upgrade - only for internal use by VM migration.
                     * @endpoint GET /nodes/{node}/qemu/{vmid}/mtunnelwebsocket
                     * @allowToken 1
                     * @permissions {"description": "You need to pass a ticket valid for the selected socket. Tickets can be created via the mtunnel API call, which will check permissions accordingly.", "user": "all"}
                     *
                     * Parameters:
                     * - `node` (path, required, string): The cluster node name.
                     * - `socket` (query, required, string): unix socket to forward to
                     * - `ticket` (query, required, string): ticket return by initial 'mtunnel' API call, or retrieved via 'ticket' tunnel command
                     * - `vmid` (path, required, number): The (unique) ID of the VM.
                     */
                    mtunnelwebsocket: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/qemu/{vmid}/mtunnelwebsocket"]["GET"]['parameters']>>) => client.request("/nodes/{node}/qemu/{vmid}/mtunnelwebsocket", "GET", {
                        ...((args[0]) as any),
                        $path: {node, vmid: parseInt(vmid.toString())}
                    }),
                    /**
                     * Get the virtual machine configuration with both current and pending values.
                     * @endpoint GET /nodes/{node}/qemu/{vmid}/pending
                     * @allowToken 1
                     * @permissions {"check": ["perm", "/vms/{vmid}", ["VM.Audit"]]}
                     *
                     * Parameters:
                     * - `node` (path, required, string): The cluster node name.
                     * - `vmid` (path, required, number): The (unique) ID of the VM.
                     */
                    pending: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/qemu/{vmid}/pending"]["GET"]['parameters']>>) => client.request("/nodes/{node}/qemu/{vmid}/pending", "GET", {
                        ...((args[0]) as any),
                        $path: {node, vmid: parseInt(vmid.toString())}
                    }),
                    /**
                     * Migrate virtual machine to a remote cluster. Creates a new migration task. EXPERIMENTAL feature!
                     * @endpoint POST /nodes/{node}/qemu/{vmid}/remote_migrate
                     * @allowToken 1
                     * @permissions {"check": ["perm", "/vms/{vmid}", ["VM.Migrate"]]}
                     *
                     * Parameters:
                     * - `bwlimit` (body, optional, number): Override I/O bandwidth limit (in KiB/s).
                     * - `delete` (body, optional, boolean): Delete the original VM and related data after successful migration. By default the original VM is kept on the source cluster in a stopped state.
                     * - `node` (path, required, string): The cluster node name.
                     * - `online` (body, optional, boolean): Use online/live migration if VM is running. Ignored if VM is stopped.
                     * - `target-bridge` (body, required, string): Mapping from source to target bridges. Providing only a single bridge ID maps all source bridges to that bridge. Providing the special value '1' will map each source bridge to itself.
                     * - `target-endpoint` (body, required, string): Remote target endpoint
                     * - `target-storage` (body, required, string): Mapping from source to target storages. Providing only a single storage ID maps all source storages to that storage. Providing the special value '1' will map each source storage to itself.
                     * - `target-vmid` (body, optional, number): The (unique) ID of the VM.
                     * - `vmid` (path, required, number): The (unique) ID of the VM.
                     */
                    remote_migrate: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/qemu/{vmid}/remote_migrate"]["POST"]['parameters']>>) => client.request("/nodes/{node}/qemu/{vmid}/remote_migrate", "POST", {
                        ...((args[0]) as any),
                        $path: {node, vmid: parseInt(vmid.toString())}
                    }),
                    /**
                     * Extend volume size.
                     * @endpoint PUT /nodes/{node}/qemu/{vmid}/resize
                     * @allowToken 1
                     * @permissions {"check": ["perm", "/vms/{vmid}", ["VM.Config.Disk"]]}
                     *
                     * Parameters:
                     * - `digest` (body, optional, string): Prevent changes if current configuration file has different SHA1 digest. This can be used to prevent concurrent modifications.
                     * - `disk` (body, required, "ide0" | "ide1" | "ide2" | "ide3" | "scsi0" | "scsi1" | "scsi2" | "scsi3" | "scsi4" | "scsi5" | "scsi6" | "scsi7" | "scsi8" | "scsi9" | "scsi10" | "scsi11" | "scsi12" | "scsi13" | "scsi14" | "scsi15" | "scsi16" | "scsi17" | "scsi18" | "scsi19" | "scsi20" | "scsi21" | "scsi22" | "scsi23" | "scsi24" | "scsi25" | "scsi26" | "scsi27" | "scsi28" | "scsi29" | "scsi30" | "virtio0" | "virtio1" | "virtio2" | "virtio3" | "virtio4" | "virtio5" | "virtio6" | "virtio7" | "virtio8" | "virtio9" | "virtio10" | "virtio11" | "virtio12" | "virtio13" | "virtio14" | "virtio15" | "sata0" | "sata1" | "sata2" | "sata3" | "sata4" | "sata5" | "efidisk0" | "tpmstate0"): The disk you want to resize.
                     * - `node` (path, required, string): The cluster node name.
                     * - `size` (body, required, string): The new size. With the `+` sign the value is added to the actual size of the volume and without it, the value is taken as an absolute one. Shrinking disk size is not supported.
                     * - `skiplock` (body, optional, boolean): Ignore locks - only root is allowed to use this option.
                     * - `vmid` (path, required, number): The (unique) ID of the VM.
                     */
                    resize: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/qemu/{vmid}/resize"]["PUT"]['parameters']>>) => client.request("/nodes/{node}/qemu/{vmid}/resize", "PUT", {
                        ...((args[0]) as any),
                        $path: {node, vmid: parseInt(vmid.toString())}
                    }),
                    /**
                     * Read VM RRD statistics (returns PNG)
                     * @endpoint GET /nodes/{node}/qemu/{vmid}/rrd
                     * @allowToken 1
                     * @permissions {"check": ["perm", "/vms/{vmid}", ["VM.Audit"]]}
                     *
                     * Parameters:
                     * - `cf` (query, optional, "AVERAGE" | "MAX"): The RRD consolidation function
                     * - `ds` (query, required, string): The list of datasources you want to display.
                     * - `node` (path, required, string): The cluster node name.
                     * - `timeframe` (query, required, "hour" | "day" | "week" | "month" | "year"): Specify the time frame you are interested in.
                     * - `vmid` (path, required, number): The (unique) ID of the VM.
                     */
                    rrd: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/qemu/{vmid}/rrd"]["GET"]['parameters']>>) => client.request("/nodes/{node}/qemu/{vmid}/rrd", "GET", {
                        ...((args[0]) as any),
                        $path: {node, vmid: parseInt(vmid.toString())}
                    }),
                    /**
                     * Read VM RRD statistics
                     * @endpoint GET /nodes/{node}/qemu/{vmid}/rrddata
                     * @allowToken 1
                     * @permissions {"check": ["perm", "/vms/{vmid}", ["VM.Audit"]]}
                     *
                     * Parameters:
                     * - `cf` (query, optional, "AVERAGE" | "MAX"): The RRD consolidation function
                     * - `node` (path, required, string): The cluster node name.
                     * - `timeframe` (query, required, "hour" | "day" | "week" | "month" | "year"): Specify the time frame you are interested in.
                     * - `vmid` (path, required, number): The (unique) ID of the VM.
                     */
                    rrddata: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/qemu/{vmid}/rrddata"]["GET"]['parameters']>>) => client.request("/nodes/{node}/qemu/{vmid}/rrddata", "GET", {
                        ...((args[0]) as any),
                        $path: {node, vmid: parseInt(vmid.toString())}
                    }),
                    /**
                     * Send key event to virtual machine.
                     * @endpoint PUT /nodes/{node}/qemu/{vmid}/sendkey
                     * @allowToken 1
                     * @permissions {"check": ["perm", "/vms/{vmid}", ["VM.Console"]]}
                     *
                     * Parameters:
                     * - `key` (body, required, string): The key (qemu monitor encoding).
                     * - `node` (path, required, string): The cluster node name.
                     * - `skiplock` (body, optional, boolean): Ignore locks - only root is allowed to use this option.
                     * - `vmid` (path, required, number): The (unique) ID of the VM.
                     */
                    sendkey: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/qemu/{vmid}/sendkey"]["PUT"]['parameters']>>) => client.request("/nodes/{node}/qemu/{vmid}/sendkey", "PUT", {
                        ...((args[0]) as any),
                        $path: {node, vmid: parseInt(vmid.toString())}
                    }),

                    snapshot: {
                        /**
                         * List all snapshots.
                         * @endpoint GET /nodes/{node}/qemu/{vmid}/snapshot
                         * @allowToken 1
                         * @permissions {"check": ["perm", "/vms/{vmid}", ["VM.Audit"]]}
                         *
                         * Parameters:
                         * - `node` (path, required, string): The cluster node name.
                         * - `vmid` (path, required, number): The (unique) ID of the VM.
                         */
                        list: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/qemu/{vmid}/snapshot"]["GET"]['parameters']>>) => client.request("/nodes/{node}/qemu/{vmid}/snapshot", "GET", {
                            ...((args[0]) as any),
                            $path: {node, vmid: parseInt(vmid.toString())}
                        }),
                        /**
                         * Snapshot a VM.
                         * @endpoint POST /nodes/{node}/qemu/{vmid}/snapshot
                         * @allowToken 1
                         * @permissions {"check": ["perm", "/vms/{vmid}", ["VM.Snapshot"]]}
                         *
                         * Parameters:
                         * - `description` (body, optional, string): A textual description or comment.
                         * - `node` (path, required, string): The cluster node name.
                         * - `snapname` (body, required, string): The name of the snapshot.
                         * - `vmid` (path, required, number): The (unique) ID of the VM.
                         * - `vmstate` (body, optional, boolean): Save the vmstate
                         */
                        create: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/qemu/{vmid}/snapshot"]["POST"]['parameters']>>) => client.request("/nodes/{node}/qemu/{vmid}/snapshot", "POST", {
                            ...((args[0]) as any),
                            $path: {node, vmid: parseInt(vmid.toString())}
                        }),
                        snapname: (snapname: string) => ({
                            /**
                             * Delete a VM snapshot.
                             * @endpoint DELETE /nodes/{node}/qemu/{vmid}/snapshot/{snapname}
                             * @allowToken 1
                             * @permissions {"check": ["perm", "/vms/{vmid}", ["VM.Snapshot"]]}
                             *
                             * Parameters:
                             * - `force` (query, optional, boolean): For removal from config file, even if removing disk snapshots fails.
                             * - `node` (path, required, string): The cluster node name.
                             * - `snapname` (path, required, string): The name of the snapshot.
                             * - `vmid` (path, required, number): The (unique) ID of the VM.
                             */
                            delete: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/qemu/{vmid}/snapshot/{snapname}"]["DELETE"]['parameters']>>) => client.request("/nodes/{node}/qemu/{vmid}/snapshot/{snapname}", "DELETE", {
                                ...((args[0]) as any),
                                $path: {node, vmid: parseInt(vmid.toString()), snapname}
                            }),
                            /**
                             * @endpoint GET /nodes/{node}/qemu/{vmid}/snapshot/{snapname}
                             * @allowToken 1
                             * @permissions {"user": "all"}
                             *
                             * Parameters:
                             * - `node` (path, required, string): The cluster node name.
                             * - `snapname` (path, required, string): The name of the snapshot.
                             * - `vmid` (path, required, number): The (unique) ID of the VM.
                             */
                            get: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/qemu/{vmid}/snapshot/{snapname}"]["GET"]['parameters']>>) => client.request("/nodes/{node}/qemu/{vmid}/snapshot/{snapname}", "GET", {
                                ...((args[0]) as any),
                                $path: {node, vmid: parseInt(vmid.toString()), snapname}
                            }),
                            config: {
                                /**
                                 * Get snapshot configuration
                                 * @endpoint GET /nodes/{node}/qemu/{vmid}/snapshot/{snapname}/config
                                 * @allowToken 1
                                 * @permissions {"check": ["perm", "/vms/{vmid}", ["VM.Snapshot", "VM.Snapshot.Rollback", "VM.Audit"], "any", 1]}
                                 *
                                 * Parameters:
                                 * - `node` (path, required, string): The cluster node name.
                                 * - `snapname` (path, required, string): The name of the snapshot.
                                 * - `vmid` (path, required, number): The (unique) ID of the VM.
                                 */
                                get: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/qemu/{vmid}/snapshot/{snapname}/config"]["GET"]['parameters']>>) => client.request("/nodes/{node}/qemu/{vmid}/snapshot/{snapname}/config", "GET", {
                                    ...((args[0]) as any),
                                    $path: {node, vmid: parseInt(vmid.toString()), snapname}
                                }),
                                /**
                                 * Update snapshot metadata.
                                 * @endpoint PUT /nodes/{node}/qemu/{vmid}/snapshot/{snapname}/config
                                 * @allowToken 1
                                 * @permissions {"check": ["perm", "/vms/{vmid}", ["VM.Snapshot"]]}
                                 *
                                 * Parameters:
                                 * - `description` (body, optional, string): A textual description or comment.
                                 * - `node` (path, required, string): The cluster node name.
                                 * - `snapname` (path, required, string): The name of the snapshot.
                                 * - `vmid` (path, required, number): The (unique) ID of the VM.
                                 */
                                update: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/qemu/{vmid}/snapshot/{snapname}/config"]["PUT"]['parameters']>>) => client.request("/nodes/{node}/qemu/{vmid}/snapshot/{snapname}/config", "PUT", {
                                    ...((args[0]) as any),
                                    $path: {node, vmid: parseInt(vmid.toString()), snapname}
                                }),
                            },
                            /**
                             * Rollback VM state to specified snapshot.
                             * @endpoint POST /nodes/{node}/qemu/{vmid}/snapshot/{snapname}/rollback
                             * @allowToken 1
                             * @permissions {"check": ["perm", "/vms/{vmid}", ["VM.Snapshot", "VM.Snapshot.Rollback"], "any", 1]}
                             *
                             * Parameters:
                             * - `node` (path, required, string): The cluster node name.
                             * - `snapname` (path, required, string): The name of the snapshot.
                             * - `start` (body, optional, boolean): Whether the VM should get started after rolling back successfully. (Note: VMs will be automatically started if the snapshot includes RAM.)
                             * - `vmid` (path, required, number): The (unique) ID of the VM.
                             */
                            rollback: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/qemu/{vmid}/snapshot/{snapname}/rollback"]["POST"]['parameters']>>) => client.request("/nodes/{node}/qemu/{vmid}/snapshot/{snapname}/rollback", "POST", {
                                ...((args[0]) as any),
                                $path: {node, vmid: parseInt(vmid.toString()), snapname}
                            }),
                        })
                    },
                    /**
                     * Returns a SPICE configuration to connect to the VM.
                     * @endpoint POST /nodes/{node}/qemu/{vmid}/spiceproxy
                     * @allowToken 1
                     * @permissions {"check": ["perm", "/vms/{vmid}", ["VM.Console"]]}
                     *
                     * Parameters:
                     * - `node` (path, required, string): The cluster node name.
                     * - `proxy` (body, optional, string): SPICE proxy server. This can be used by the client to specify the proxy server. All nodes in a cluster runs 'spiceproxy', so it is up to the client to choose one. By default, we return the node where the VM is currently running. As reasonable setting is to use same node you use to connect to the API (This is window.location.hostname for the JS GUI).
                     * - `vmid` (path, required, number): The (unique) ID of the VM.
                     */
                    spiceproxy: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/qemu/{vmid}/spiceproxy"]["POST"]['parameters']>>) => client.request("/nodes/{node}/qemu/{vmid}/spiceproxy", "POST", {
                        ...((args[0]) as any),
                        $path: {node, vmid: parseInt(vmid.toString())}
                    }),
                    status: {
                        /**
                         * Directory index
                         * @endpoint GET /nodes/{node}/qemu/{vmid}/status
                         * @allowToken 1
                         * @permissions {"user": "all"}
                         *
                         * Parameters:
                         * - `node` (path, required, string): The cluster node name.
                         * - `vmid` (path, required, number): The (unique) ID of the VM.
                         */
                        get: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/qemu/{vmid}/status"]["GET"]['parameters']>>) => client.request("/nodes/{node}/qemu/{vmid}/status", "GET", {
                            ...((args[0]) as any),
                            $path: {node, vmid: parseInt(vmid.toString())}
                        }),

                        /**
                         * Get virtual machine status.
                         * @endpoint GET /nodes/{node}/qemu/{vmid}/status/current
                         * @allowToken 1
                         * @permissions {"check": ["perm", "/vms/{vmid}", ["VM.Audit"]]}
                         *
                         * Parameters:
                         * - `node` (path, required, string): The cluster node name.
                         * - `vmid` (path, required, number): The (unique) ID of the VM.
                         */
                        current: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/qemu/{vmid}/status/current"]["GET"]['parameters']>>) => client.request("/nodes/{node}/qemu/{vmid}/status/current", "GET", {
                            ...((args[0]) as any),
                            $path: {node, vmid: parseInt(vmid.toString())}
                        }),

                        /**
                         * Reboot the VM by shutting it down, and starting it again. Applies pending changes.
                         * @endpoint POST /nodes/{node}/qemu/{vmid}/status/reboot
                         * @allowToken 1
                         * @permissions {"check": ["perm", "/vms/{vmid}", ["VM.PowerMgmt"]]}
                         *
                         * Parameters:
                         * - `node` (path, required, string): The cluster node name.
                         * - `timeout` (body, optional, number): Wait maximal timeout seconds for the shutdown.
                         * - `vmid` (path, required, number): The (unique) ID of the VM.
                         */
                        reboot: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/qemu/{vmid}/status/reboot"]["POST"]['parameters']>>) => client.request("/nodes/{node}/qemu/{vmid}/status/reboot", "POST", {
                            ...((args[0]) as any),
                            $path: {node, vmid: parseInt(vmid.toString())}
                        }),
                        /**
                         * Reset virtual machine.
                         * @endpoint POST /nodes/{node}/qemu/{vmid}/status/reset
                         * @allowToken 1
                         * @permissions {"check": ["perm", "/vms/{vmid}", ["VM.PowerMgmt"]]}
                         *
                         * Parameters:
                         * - `node` (path, required, string): The cluster node name.
                         * - `skiplock` (body, optional, boolean): Ignore locks - only root is allowed to use this option.
                         * - `vmid` (path, required, number): The (unique) ID of the VM.
                         */
                        reset: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/qemu/{vmid}/status/reset"]["POST"]['parameters']>>) => client.request("/nodes/{node}/qemu/{vmid}/status/reset", "POST", {
                            ...((args[0]) as any),
                            $path: {node, vmid: parseInt(vmid.toString())}
                        }),
                        /**
                         * Resume virtual machine.
                         * @endpoint POST /nodes/{node}/qemu/{vmid}/status/resume
                         * @allowToken 1
                         * @permissions {"check": ["perm", "/vms/{vmid}", ["VM.PowerMgmt"]]}
                         *
                         * Parameters:
                         * - `nocheck` (body, optional, boolean)
                         * - `node` (path, required, string): The cluster node name.
                         * - `skiplock` (body, optional, boolean): Ignore locks - only root is allowed to use this option.
                         * - `vmid` (path, required, number): The (unique) ID of the VM.
                         */
                        resume: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/qemu/{vmid}/status/resume"]["POST"]['parameters']>>) => client.request("/nodes/{node}/qemu/{vmid}/status/resume", "POST", {
                            ...((args[0]) as any),
                            $path: {node, vmid: parseInt(vmid.toString())}
                        }),
                        /**
                         * Shutdown virtual machine. This is similar to pressing the power button on a physical machine. This will send an ACPI event for the guest OS, which should then proceed to a clean shutdown.
                         * @endpoint POST /nodes/{node}/qemu/{vmid}/status/shutdown
                         * @allowToken 1
                         * @permissions {"check": ["perm", "/vms/{vmid}", ["VM.PowerMgmt"]]}
                         *
                         * Parameters:
                         * - `forceStop` (body, optional, boolean): Make sure the VM stops.
                         * - `keepActive` (body, optional, boolean): Do not deactivate storage volumes.
                         * - `node` (path, required, string): The cluster node name.
                         * - `skiplock` (body, optional, boolean): Ignore locks - only root is allowed to use this option.
                         * - `timeout` (body, optional, number): Wait maximal timeout seconds.
                         * - `vmid` (path, required, number): The (unique) ID of the VM.
                         */
                        shutdown: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/qemu/{vmid}/status/shutdown"]["POST"]['parameters']>>) => client.request("/nodes/{node}/qemu/{vmid}/status/shutdown", "POST", {
                            ...((args[0]) as any),
                            $path: {node, vmid: parseInt(vmid.toString())}
                        }),
                        /**
                         * Start virtual machine.
                         * @endpoint POST /nodes/{node}/qemu/{vmid}/status/start
                         * @allowToken 1
                         * @permissions {"check": ["perm", "/vms/{vmid}", ["VM.PowerMgmt"]]}
                         *
                         * Parameters:
                         * - `force-cpu` (body, optional, string): Override QEMU's -cpu argument with the given string.
                         * - `machine` (body, optional, string): Specify the QEMU machine.
                         * - `migratedfrom` (body, optional, string): The cluster node name.
                         * - `migration_network` (body, optional, string): CIDR of the (sub) network that is used for migration.
                         * - `migration_type` (body, optional, "secure" | "insecure"): Migration traffic is encrypted using an SSH tunnel by default. On secure, completely private networks this can be disabled to increase performance.
                         * - `nets-host-mtu` (body, optional, string): Used for migration compat. List of VirtIO network devices and their effective host_mtu setting according to the QEMU object model on the source side of the migration. A value of 0 means that the host_mtu parameter is to be avoided for the corresponding device.
                         * - `node` (path, required, string): The cluster node name.
                         * - `skiplock` (body, optional, boolean): Ignore locks - only root is allowed to use this option.
                         * - `stateuri` (body, optional, string): Some command save/restore state from this location.
                         * - `targetstorage` (body, optional, string): Mapping from source to target storages. Providing only a single storage ID maps all source storages to that storage. Providing the special value '1' will map each source storage to itself.
                         * - `timeout` (body, optional, number): Wait maximal timeout seconds.
                         * - `vmid` (path, required, number): The (unique) ID of the VM.
                         * - `with-conntrack-state` (body, optional, boolean): Whether to migrate conntrack entries for running VMs.
                         */
                        start: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/qemu/{vmid}/status/start"]["POST"]['parameters']>>) => client.request("/nodes/{node}/qemu/{vmid}/status/start", "POST", {
                            ...((args[0]) as any),
                            $path: {node, vmid: parseInt(vmid.toString())}
                        }),

                        /**
                         * Stop virtual machine. The qemu process will exit immediately. This is akin to pulling the power plug of a running computer and may damage the VM data.
                         * @endpoint POST /nodes/{node}/qemu/{vmid}/status/stop
                         * @allowToken 1
                         * @permissions {"check": ["perm", "/vms/{vmid}", ["VM.PowerMgmt"]]}
                         *
                         * Parameters:
                         * - `keepActive` (body, optional, boolean): Do not deactivate storage volumes.
                         * - `migratedfrom` (body, optional, string): The cluster node name.
                         * - `node` (path, required, string): The cluster node name.
                         * - `overrule-shutdown` (body, optional, boolean): Try to abort active 'qmshutdown' tasks before stopping.
                         * - `skiplock` (body, optional, boolean): Ignore locks - only root is allowed to use this option.
                         * - `timeout` (body, optional, number): Wait maximal timeout seconds.
                         * - `vmid` (path, required, number): The (unique) ID of the VM.
                         */
                        stop: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/qemu/{vmid}/status/stop"]["POST"]['parameters']>>) => client.request("/nodes/{node}/qemu/{vmid}/status/stop", "POST", {
                            ...((args[0]) as any),
                            $path: {node, vmid: parseInt(vmid.toString())}
                        }),
                        /**
                         * Suspend virtual machine.
                         * @endpoint POST /nodes/{node}/qemu/{vmid}/status/suspend
                         * @allowToken 1
                         * @permissions {"check": ["perm", "/vms/{vmid}", ["VM.PowerMgmt"]], "description": "You need 'VM.PowerMgmt' on /vms/{vmid}, and if you have set 'todisk', you need also 'VM.Config.Disk' on /vms/{vmid} and 'Datastore.AllocateSpace' on the storage for the vmstate."}
                         *
                         * Parameters:
                         * - `node` (path, required, string): The cluster node name.
                         * - `skiplock` (body, optional, boolean): Ignore locks - only root is allowed to use this option.
                         * - `statestorage` (body, optional, string): The storage for the VM state
                         * - `todisk` (body, optional, boolean): If set, suspends the VM to disk. Will be resumed on next VM start.
                         * - `vmid` (path, required, number): The (unique) ID of the VM.
                         */
                        suspend: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/qemu/{vmid}/status/suspend"]["POST"]['parameters']>>) => client.request("/nodes/{node}/qemu/{vmid}/status/suspend", "POST", {
                            ...((args[0]) as any),
                            $path: {node, vmid: parseInt(vmid.toString())}
                        }),
                    },
                    /**
                     * Create a Template.
                     * @endpoint POST /nodes/{node}/qemu/{vmid}/template
                     * @allowToken 1
                     * @permissions {"check": ["perm", "/vms/{vmid}", ["VM.Allocate"]], "description": "You need 'VM.Allocate' permissions on /vms/{vmid}"}
                     *
                     * Parameters:
                     * - `disk` (body, optional, "ide0" | "ide1" | "ide2" | "ide3" | "scsi0" | "scsi1" | "scsi2" | "scsi3" | "scsi4" | "scsi5" | "scsi6" | "scsi7" | "scsi8" | "scsi9" | "scsi10" | "scsi11" | "scsi12" | "scsi13" | "scsi14" | "scsi15" | "scsi16" | "scsi17" | "scsi18" | "scsi19" | "scsi20" | "scsi21" | "scsi22" | "scsi23" | "scsi24" | "scsi25" | "scsi26" | "scsi27" | "scsi28" | "scsi29" | "scsi30" | "virtio0" | "virtio1" | "virtio2" | "virtio3" | "virtio4" | "virtio5" | "virtio6" | "virtio7" | "virtio8" | "virtio9" | "virtio10" | "virtio11" | "virtio12" | "virtio13" | "virtio14" | "virtio15" | "sata0" | "sata1" | "sata2" | "sata3" | "sata4" | "sata5" | "efidisk0" | "tpmstate0"): If you want to convert only 1 disk to base image.
                     * - `node` (path, required, string): The cluster node name.
                     * - `vmid` (path, required, number): The (unique) ID of the VM.
                     */
                    template: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/qemu/{vmid}/template"]["POST"]['parameters']>>) => client.request("/nodes/{node}/qemu/{vmid}/template", "POST", {
                        ...((args[0]) as any),
                        $path: {node, vmid: parseInt(vmid.toString())}
                    }),

                    /**
                     * Creates a TCP proxy connections.
                     * @endpoint POST /nodes/{node}/qemu/{vmid}/termproxy
                     * @allowToken 1
                     * @permissions {"check": ["perm", "/vms/{vmid}", ["VM.Console"]]}
                     *
                     * Parameters:
                     * - `node` (path, required, string): The cluster node name.
                     * - `serial` (body, optional, "serial0" | "serial1" | "serial2" | "serial3"): opens a serial terminal (defaults to display)
                     * - `vmid` (path, required, number): The (unique) ID of the VM.
                     */
                    termproxy: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/qemu/{vmid}/termproxy"]["POST"]['parameters']>>) => client.request("/nodes/{node}/qemu/{vmid}/termproxy", "POST", {
                        ...((args[0]) as any),
                        $path: {node, vmid: parseInt(vmid.toString())}
                    }),
                    /**
                     * Unlink/delete disk images.
                     * @endpoint PUT /nodes/{node}/qemu/{vmid}/unlink
                     * @allowToken 1
                     * @permissions {"check": ["perm", "/vms/{vmid}", ["VM.Config.Disk"]]}
                     *
                     * Parameters:
                     * - `force` (body, optional, boolean): Force physical removal. Without this, we simple remove the disk from the config file and create an additional configuration entry called 'unused[n]', which contains the volume ID. Unlink of unused[n] always cause physical removal.
                     * - `idlist` (body, required, string): A list of disk IDs you want to delete.
                     * - `node` (path, required, string): The cluster node name.
                     * - `vmid` (path, required, number): The (unique) ID of the VM.
                     */
                    unlink: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/qemu/{vmid}/unlink"]["PUT"]['parameters']>>) => client.request("/nodes/{node}/qemu/{vmid}/unlink", "PUT", {
                        ...((args[0]) as any),
                        $path: {node, vmid: parseInt(vmid.toString())}
                    }),
                    /**
                     * Creates a TCP VNC proxy connections.
                     * @endpoint POST /nodes/{node}/qemu/{vmid}/vncproxy
                     * @allowToken 1
                     * @permissions {"check": ["perm", "/vms/{vmid}", ["VM.Console"]]}
                     *
                     * Parameters:
                     * - `generate-password` (body, optional, boolean): Generates a random password to be used as ticket instead of the API ticket.
                     * - `node` (path, required, string): The cluster node name.
                     * - `vmid` (path, required, number): The (unique) ID of the VM.
                     * - `websocket` (body, optional, boolean): Prepare for websocket upgrade (only required when using serial terminal, otherwise upgrade is always possible).
                     */
                    vncproxy: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/qemu/{vmid}/vncproxy"]["POST"]['parameters']>>) => client.request("/nodes/{node}/qemu/{vmid}/vncproxy", "POST", {
                        ...((args[0]) as any),
                        $path: {node, vmid: parseInt(vmid.toString())}
                    }),
                    /**
                     * Opens a websocket for VNC traffic.
                     * @endpoint GET /nodes/{node}/qemu/{vmid}/vncwebsocket
                     * @allowToken 1
                     * @permissions {"check": ["perm", "/vms/{vmid}", ["VM.Console"]], "description": "You also need to pass a valid ticket (vncticket)."}
                     *
                     * Parameters:
                     * - `node` (path, required, string): The cluster node name.
                     * - `port` (query, required, number): Port number returned by previous vncproxy call.
                     * - `vmid` (path, required, number): The (unique) ID of the VM.
                     * - `vncticket` (query, required, string): Ticket from previous call to vncproxy.
                     */
                    vncwebsocket: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/qemu/{vmid}/vncwebsocket"]["GET"]['parameters']>>) => client.request("/nodes/{node}/qemu/{vmid}/vncwebsocket", "GET", {
                        ...((args[0]) as any),
                        $path: {node, vmid: parseInt(vmid.toString())}
                    }),
                })
            },
            /**
             * List all tags for an OCI repository reference.
             * @endpoint GET /nodes/{node}/query-oci-repo-tags
             * @allowToken 1
             * @permissions {"check": ["perm", "/nodes/{node}", ["Sys.AccessNetwork"]]}
             *
             * Parameters:
             * - `node` (path, required, string): The cluster node name.
             * - `reference` (query, required, string): The reference to the repository to query tags from.
             */
            query_oci_repo_tags: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/query-oci-repo-tags"]["GET"]['parameters']>>) => client.request("/nodes/{node}/query-oci-repo-tags", "GET", {
                ...((args[0]) as any),
                $path: {node}
            }),
            /**
             * Query metadata of an URL: file size, file name and mime type.
             * @endpoint GET /nodes/{node}/query-url-metadata
             * @allowToken 1
             * @permissions {"check": ["or", ["perm", "/", ["Sys.Audit", "Sys.Modify"]], ["perm", "/nodes/{node}", ["Sys.AccessNetwork"]]]}
             *
             * Parameters:
             * - `node` (path, required, string): The cluster node name.
             * - `url` (query, required, string): The URL to query the metadata from.
             * - `verify-certificates` (query, optional, boolean): If false, no SSL/TLS certificates will be verified.
             */
            query_url_metadata: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/query-url-metadata"]["GET"]['parameters']>>) => client.request("/nodes/{node}/query-url-metadata", "GET", {
                ...((args[0]) as any),
                $path: {node}
            }),
            replication: {
                /**
                 * List status of all replication jobs on this node.
                 * @endpoint GET /nodes/{node}/replication
                 * @allowToken 1
                 * @permissions {"description": "Requires the VM.Audit permission on /vms/<vmid>.", "user": "all"}
                 *
                 * Parameters:
                 * - `guest` (query, optional, number): Only list replication jobs for this guest.
                 * - `node` (path, required, string): The cluster node name.
                 */
                status: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/replication"]["GET"]['parameters']>>) => client.request("/nodes/{node}/replication", "GET", {
                    ...((args[0]) as any),
                    $path: {node}
                }),
                id: (id: string) => ({
                    /**
                     * Directory index.
                     * @endpoint GET /nodes/{node}/replication/{id}
                     * @allowToken 1
                     * @permissions {"user": "all"}
                     *
                     * Parameters:
                     * - `id` (path, required, string): Replication Job ID. The ID is composed of a Guest ID and a job number, separated by a hyphen, i.e. '<GUEST>-<JOBNUM>'.
                     * - `node` (path, required, string): The cluster node name.
                     */
                    get: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/replication/{id}"]["GET"]['parameters']>>) => client.request("/nodes/{node}/replication/{id}", "GET", {
                        ...((args[0]) as any),
                        $path: {node, id}
                    }),
                    /**
                     * Read replication job log.
                     * @endpoint GET /nodes/{node}/replication/{id}/log
                     * @allowToken 1
                     * @permissions {"description": "Requires the VM.Audit permission on /vms/<vmid>, or 'Sys.Audit' on '/nodes/<node>'", "user": "all"}
                     *
                     * Parameters:
                     * - `id` (path, required, string): Replication Job ID. The ID is composed of a Guest ID and a job number, separated by a hyphen, i.e. '<GUEST>-<JOBNUM>'.
                     * - `limit` (query, optional, number)
                     * - `node` (path, required, string): The cluster node name.
                     * - `start` (query, optional, number)
                     */
                    log: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/replication/{id}/log"]["GET"]['parameters']>>) => client.request("/nodes/{node}/replication/{id}/log", "GET", {
                        ...((args[0]) as any),
                        $path: {node, id}
                    }),
                    /**
                     * Schedule replication job to start as soon as possible.
                     * @endpoint POST /nodes/{node}/replication/{id}/schedule_now
                     * @allowToken 1
                     * @permissions {"description": "Requires the VM.Replicate permission on /vms/<vmid>.", "user": "all"}
                     *
                     * Parameters:
                     * - `id` (path, required, string): Replication Job ID. The ID is composed of a Guest ID and a job number, separated by a hyphen, i.e. '<GUEST>-<JOBNUM>'.
                     * - `node` (path, required, string): The cluster node name.
                     */
                    schedule_now: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/replication/{id}/schedule_now"]["POST"]['parameters']>>) => client.request("/nodes/{node}/replication/{id}/schedule_now", "POST", {
                        ...((args[0]) as any),
                        $path: {node, id}
                    }),
                    /**
                     * Get replication job status.
                     * @endpoint GET /nodes/{node}/replication/{id}/status
                     * @allowToken 1
                     * @permissions {"description": "Requires the VM.Audit permission on /vms/<vmid>.", "user": "all"}
                     *
                     * Parameters:
                     * - `id` (path, required, string): Replication Job ID. The ID is composed of a Guest ID and a job number, separated by a hyphen, i.e. '<GUEST>-<JOBNUM>'.
                     * - `node` (path, required, string): The cluster node name.
                     */
                    status: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/replication/{id}/status"]["GET"]['parameters']>>) => client.request("/nodes/{node}/replication/{id}/status", "GET", {
                        ...((args[0]) as any),
                        $path: {node, id}
                    }),
                })
            },
            /**
             * Gather various systems information about a node
             * @endpoint GET /nodes/{node}/report
             * @allowToken 1
             * @permissions {"check": ["perm", "/nodes/{node}", ["Sys.Audit"]]}
             *
             * Parameters:
             * - `node` (path, required, string): The cluster node name.
             */
            report: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/report"]["GET"]['parameters']>>) => client.request("/nodes/{node}/report", "GET", {
                ...((args[0]) as any),
                $path: {node}
            }),
            /**
             * Read node RRD statistics (returns PNG)
             * @endpoint GET /nodes/{node}/rrd
             * @allowToken 1
             * @permissions {"check": ["perm", "/nodes/{node}", ["Sys.Audit"]]}
             *
             * Parameters:
             * - `cf` (query, optional, "AVERAGE" | "MAX"): The RRD consolidation function
             * - `ds` (query, required, string): The list of datasources you want to display.
             * - `node` (path, required, string): The cluster node name.
             * - `timeframe` (query, required, "hour" | "day" | "week" | "month" | "year" | "decade"): Specify the time frame you are interested in.
             */
            rrd: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/rrd"]["GET"]['parameters']>>) => client.request("/nodes/{node}/rrd", "GET", {
                ...((args[0]) as any),
                $path: {node}
            }),
            /**
             * Read node RRD statistics
             * @endpoint GET /nodes/{node}/rrddata
             * @allowToken 1
             * @permissions {"check": ["perm", "/nodes/{node}", ["Sys.Audit"]]}
             *
             * Parameters:
             * - `cf` (query, optional, "AVERAGE" | "MAX"): The RRD consolidation function
             * - `node` (path, required, string): The cluster node name.
             * - `timeframe` (query, required, "hour" | "day" | "week" | "month" | "year" | "decade"): Specify the time frame you are interested in.
             */
            rrddata: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/rrddata"]["GET"]['parameters']>>) => client.request("/nodes/{node}/rrddata", "GET", {
                ...((args[0]) as any),
                $path: {node}
            }),
            scan: {
                /**
                 * Index of available scan methods
                 * @endpoint GET /nodes/{node}/scan
                 * @allowToken 1
                 * @permissions {"user": "all"}
                 *
                 * Parameters:
                 * - `node` (path, required, string): The cluster node name.
                 */
                index: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/scan"]["GET"]['parameters']>>) => client.request("/nodes/{node}/scan", "GET", {
                    ...((args[0]) as any),
                    $path: {node}
                }),
                /**
                 * Scan remote CIFS server.
                 * @endpoint GET /nodes/{node}/scan/cifs
                 * @allowToken 1
                 * @permissions {"check": ["perm", "/storage", ["Datastore.Allocate"]]}
                 *
                 * Parameters:
                 * - `domain` (query, optional, string): SMB domain (Workgroup).
                 * - `node` (path, required, string): The cluster node name.
                 * - `password` (query, optional, string): User password.
                 * - `server` (query, required, string): The server address (name or IP).
                 * - `username` (query, optional, string): User name.
                 */
                cifs: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/scan/cifs"]["GET"]['parameters']>>) => client.request("/nodes/{node}/scan/cifs", "GET", {
                    ...((args[0]) as any),
                    $path: {node}
                }),
                /**
                 * Scan remote iSCSI server.
                 * @endpoint GET /nodes/{node}/scan/iscsi
                 * @allowToken 1
                 * @permissions {"check": ["perm", "/storage", ["Datastore.Allocate"]]}
                 *
                 * Parameters:
                 * - `node` (path, required, string): The cluster node name.
                 * - `portal` (query, required, string): The iSCSI portal (IP or DNS name with optional port).
                 */
                iscsi: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/scan/iscsi"]["GET"]['parameters']>>) => client.request("/nodes/{node}/scan/iscsi", "GET", {
                    ...((args[0]) as any),
                    $path: {node}
                }),
                /**
                 * List local LVM volume groups.
                 * @endpoint GET /nodes/{node}/scan/lvm
                 * @allowToken 1
                 * @permissions {"check": ["perm", "/storage", ["Datastore.Allocate"]]}
                 *
                 * Parameters:
                 * - `node` (path, required, string): The cluster node name.
                 */
                lvm: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/scan/lvm"]["GET"]['parameters']>>) => client.request("/nodes/{node}/scan/lvm", "GET", {
                    ...((args[0]) as any),
                    $path: {node}
                }),
                /**
                 * List local LVM Thin Pools.
                 * @endpoint GET /nodes/{node}/scan/lvmthin
                 * @allowToken 1
                 * @permissions {"check": ["perm", "/storage", ["Datastore.Allocate"]]}
                 *
                 * Parameters:
                 * - `node` (path, required, string): The cluster node name.
                 * - `vg` (query, required, string)
                 */
                lvmthin: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/scan/lvmthin"]["GET"]['parameters']>>) => client.request("/nodes/{node}/scan/lvmthin", "GET", {
                    ...((args[0]) as any),
                    $path: {node}
                }),
                /**
                 * Scan remote NFS server.
                 * @endpoint GET /nodes/{node}/scan/nfs
                 * @allowToken 1
                 * @permissions {"check": ["perm", "/storage", ["Datastore.Allocate"]]}
                 *
                 * Parameters:
                 * - `node` (path, required, string): The cluster node name.
                 * - `server` (query, required, string): The server address (name or IP).
                 */
                nfs: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/scan/nfs"]["GET"]['parameters']>>) => client.request("/nodes/{node}/scan/nfs", "GET", {
                    ...((args[0]) as any),
                    $path: {node}
                }),
                /**
                 * Scan remote Proxmox Backup Server.
                 * @endpoint GET /nodes/{node}/scan/pbs
                 * @allowToken 1
                 * @permissions {"check": ["perm", "/storage", ["Datastore.Allocate"]]}
                 *
                 * Parameters:
                 * - `fingerprint` (query, optional, string): Certificate SHA 256 fingerprint.
                 * - `node` (path, required, string): The cluster node name.
                 * - `password` (query, required, string): User password or API token secret.
                 * - `port` (query, optional, number): Optional port.
                 * - `server` (query, required, string): The server address (name or IP).
                 * - `username` (query, required, string): User-name or API token-ID.
                 */
                pbs: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/scan/pbs"]["GET"]['parameters']>>) => client.request("/nodes/{node}/scan/pbs", "GET", {
                    ...((args[0]) as any),
                    $path: {node}
                }),
                /**
                 * Scan zfs pool list on local node.
                 * @endpoint GET /nodes/{node}/scan/zfs
                 * @allowToken 1
                 * @permissions {"check": ["perm", "/storage", ["Datastore.Allocate"]]}
                 *
                 * Parameters:
                 * - `node` (path, required, string): The cluster node name.
                 */
                zfs: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/scan/zfs"]["GET"]['parameters']>>) => client.request("/nodes/{node}/scan/zfs", "GET", {
                    ...((args[0]) as any),
                    $path: {node}
                }),
            },
            sdn: {
                /**
                 * SDN index.
                 * @endpoint GET /nodes/{node}/sdn
                 * @allowToken 1
                 * @permissions {"user": "all"}
                 *
                 * Parameters:
                 * - `node` (path, required, string): The cluster node name.
                 */
                index: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/sdn"]["GET"]['parameters']>>) => client.request("/nodes/{node}/sdn", "GET", {
                    ...((args[0]) as any),
                    $path: {node}
                }),
                fabrics: {
                    fabric: (fabric: string) => ({
                        /**
                         * Directory index for SDN fabric status.
                         * @endpoint GET /nodes/{node}/sdn/fabrics/{fabric}
                         * @allowToken 1
                         * @permissions {"check": ["perm", "/sdn/fabrics/{fabric}", ["SDN.Audit"]]}
                         *
                         * Parameters:
                         * - `fabric` (path, required, string): Identifier for SDN fabrics
                         * - `node` (path, required, string): The cluster node name.
                         */
                        index: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/sdn/fabrics/{fabric}"]["GET"]['parameters']>>) => client.request("/nodes/{node}/sdn/fabrics/{fabric}", "GET", {
                            ...((args[0]) as any),
                            $path: {node, fabric}
                        }),
                        /**
                         * Get all interfaces for a fabric.
                         * @endpoint GET /nodes/{node}/sdn/fabrics/{fabric}/interfaces
                         * @allowToken 1
                         * @permissions {"check": ["perm", "/sdn/fabrics/{fabric}", ["SDN.Audit"]]}
                         *
                         * Parameters:
                         * - `fabric` (path, required, string): Identifier for SDN fabrics
                         * - `node` (path, required, string): The cluster node name.
                         */
                        interfaces: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/sdn/fabrics/{fabric}/interfaces"]["GET"]['parameters']>>) => client.request("/nodes/{node}/sdn/fabrics/{fabric}/interfaces", "GET", {
                            ...((args[0]) as any),
                            $path: {node, fabric}
                        }),
                        /**
                         * Get all neighbors for a fabric.
                         * @endpoint GET /nodes/{node}/sdn/fabrics/{fabric}/neighbors
                         * @allowToken 1
                         * @permissions {"check": ["perm", "/sdn/fabrics/{fabric}", ["SDN.Audit"]]}
                         *
                         * Parameters:
                         * - `fabric` (path, required, string): Identifier for SDN fabrics
                         * - `node` (path, required, string): The cluster node name.
                         */
                        neighbors: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/sdn/fabrics/{fabric}/neighbors"]["GET"]['parameters']>>) => client.request("/nodes/{node}/sdn/fabrics/{fabric}/neighbors", "GET", {
                            ...((args[0]) as any),
                            $path: {node, fabric}
                        }),
                        /**
                         * Get all routes for a fabric.
                         * @endpoint GET /nodes/{node}/sdn/fabrics/{fabric}/routes
                         * @allowToken 1
                         * @permissions {"check": ["perm", "/sdn/fabrics/{fabric}", ["SDN.Audit"]]}
                         *
                         * Parameters:
                         * - `fabric` (path, required, string): Identifier for SDN fabrics
                         * - `node` (path, required, string): The cluster node name.
                         */
                        routes: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/sdn/fabrics/{fabric}/routes"]["GET"]['parameters']>>) => client.request("/nodes/{node}/sdn/fabrics/{fabric}/routes", "GET", {
                            ...((args[0]) as any),
                            $path: {node, fabric}
                        }),

                    })
                },
                vnets: {
                    vnet: (vnet: string) => ({
                        /**
                         * @endpoint GET /nodes/{node}/sdn/vnets/{vnet}
                         * @allowToken 1
                         * @permissions {"description": "Require 'SDN.Audit' permissions on '/sdn/zones/<zone>/<vnet>'", "user": "all"}
                         *
                         * Parameters:
                         * - `node` (path, required, string): The cluster node name.
                         * - `vnet` (path, required, string): The SDN vnet object identifier.
                         */
                        get: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/sdn/vnets/{vnet}"]["GET"]['parameters']>>) => client.request("/nodes/{node}/sdn/vnets/{vnet}", "GET", {
                            ...((args[0]) as any),
                            $path: {node, vnet}
                        }),
                        /**
                         * Get the MAC VRF for a VNet in an EVPN zone.
                         * @endpoint GET /nodes/{node}/sdn/vnets/{vnet}/mac-vrf
                         * @allowToken 1
                         * @permissions {"description": "Require 'SDN.Audit' permissions on '/sdn/zones/<zone>/<vnet>'", "user": "all"}
                         *
                         * Parameters:
                         * - `node` (path, required, string): The cluster node name.
                         * - `vnet` (path, required, string): The SDN vnet object identifier.
                         */
                        mac_vrf: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/sdn/vnets/{vnet}/mac-vrf"]["GET"]['parameters']>>) => client.request("/nodes/{node}/sdn/vnets/{vnet}/mac-vrf", "GET", {
                            ...((args[0]) as any),
                            $path: {node, vnet}
                        }),
                    })
                },
                zones: {
                    /**
                     * Get status for all zones.
                     * @endpoint GET /nodes/{node}/sdn/zones
                     * @allowToken 1
                     * @permissions {"description": "Only list entries where you have 'SDN.Audit'", "user": "all"}
                     *
                     * Parameters:
                     * - `node` (path, required, string): The cluster node name.
                     */
                    index: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/sdn/zones"]["GET"]['parameters']>>) => client.request("/nodes/{node}/sdn/zones", "GET", {
                        ...((args[0]) as any),
                        $path: {node}
                    }),
                    zone: (zone: string) => ({
                        /**
                         * Directory index for SDN zone status.
                         * @endpoint GET /nodes/{node}/sdn/zones/{zone}
                         * @allowToken 1
                         * @permissions {"check": ["perm", "/sdn/zones/{zone}", ["SDN.Audit"]]}
                         *
                         * Parameters:
                         * - `node` (path, required, string): The cluster node name.
                         * - `zone` (path, required, string): The SDN zone object identifier.
                         */
                        index: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/sdn/zones/{zone}"]["GET"]['parameters']>>) => client.request("/nodes/{node}/sdn/zones/{zone}", "GET", {
                            ...((args[0]) as any),
                            $path: {node, zone}
                        }),
                        /**
                         * Get a list of all bridges (vnets) that are part of a zone, as well as the ports that are members of that bridge.
                         * @endpoint GET /nodes/{node}/sdn/zones/{zone}/bridges
                         * @allowToken 1
                         * @permissions {"check": ["perm", "/sdn/zones/{zone}", ["SDN.Audit"]]}
                         *
                         * Parameters:
                         * - `node` (path, required, string): The cluster node name.
                         * - `zone` (path, required, string): zone name or "localnetwork"
                         */
                        bridges: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/sdn/zones/{zone}/bridges"]["GET"]['parameters']>>) => client.request("/nodes/{node}/sdn/zones/{zone}/bridges", "GET", {
                            ...((args[0]) as any),
                            $path: {node, zone}
                        }),
                        /**
                         * List zone content.
                         * @endpoint GET /nodes/{node}/sdn/zones/{zone}/content
                         * @allowToken 1
                         * @permissions {"check": ["perm", "/sdn/zones/{zone}", ["SDN.Audit"]]}
                         *
                         * Parameters:
                         * - `node` (path, required, string): The cluster node name.
                         * - `zone` (path, required, string): The SDN zone object identifier.
                         */
                        content: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/sdn/zones/{zone}/content"]["GET"]['parameters']>>) => client.request("/nodes/{node}/sdn/zones/{zone}/content", "GET", {
                            ...((args[0]) as any),
                            $path: {node, zone}
                        }),
                        /**
                         * Get the IP VRF of an EVPN zone.
                         * @endpoint GET /nodes/{node}/sdn/zones/{zone}/ip-vrf
                         * @allowToken 1
                         * @permissions {"check": ["perm", "/sdn/zones/{zone}", ["SDN.Audit"]]}
                         *
                         * Parameters:
                         * - `node` (path, required, string): The cluster node name.
                         * - `zone` (path, required, string): Name of an EVPN zone.
                         */
                        ip_vrf: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/sdn/zones/{zone}/ip-vrf"]["GET"]['parameters']>>) => client.request("/nodes/{node}/sdn/zones/{zone}/ip-vrf", "GET", {
                            ...((args[0]) as any),
                            $path: {node, zone}
                        }),
                    })
                }
            },
            services: {
                /**
                 * Service list.
                 * @endpoint GET /nodes/{node}/services
                 * @allowToken 1
                 * @permissions {"check": ["perm", "/nodes/{node}", ["Sys.Audit"]]}
                 *
                 * Parameters:
                 * - `node` (path, required, string): The cluster node name.
                 */
                index: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/services"]["GET"]['parameters']>>) => client.request("/nodes/{node}/services", "GET", {
                    ...((args[0]) as any),
                    $path: {node}
                }),
                service: (service: Service) => ({
                    /**
                     * Directory index
                     * @endpoint GET /nodes/{node}/services/{service}
                     * @allowToken 1
                     * @permissions {"check": ["perm", "/nodes/{node}", ["Sys.Audit"]]}
                     *
                     * Parameters:
                     * - `node` (path, required, string): The cluster node name.
                     * - `service` (path, required, Services): Service ID
                     */
                    index: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/services/{service}"]["GET"]['parameters']>>) => client.request("/nodes/{node}/services/{service}", "GET", {
                        ...((args[0]) as any),
                        $path: {node, service}
                    }),
                    /**
                     * Reload service. Falls back to restart if service cannot be reloaded.
                     * @endpoint POST /nodes/{node}/services/{service}/reload
                     * @allowToken 1
                     * @permissions {"check": ["perm", "/nodes/{node}", ["Sys.Modify"]]}
                     *
                     * Parameters:
                     * - `node` (path, required, string): The cluster node name.
                     * - `service` (path, required, Services): Service ID
                     */
                    reload: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/services/{service}/reload"]["POST"]['parameters']>>) => client.request("/nodes/{node}/services/{service}/reload", "POST", {
                        ...((args[0]) as any),
                        $path: {node, service}
                    }),
                    /**
                     * Hard restart service. Use reload if you want to reduce interruptions.
                     * @endpoint POST /nodes/{node}/services/{service}/restart
                     * @allowToken 1
                     * @permissions {"check": ["perm", "/nodes/{node}", ["Sys.Modify"]]}
                     *
                     * Parameters:
                     * - `node` (path, required, string): The cluster node name.
                     * - `service` (path, required, Services): Service ID
                     */
                    restart: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/services/{service}/restart"]["POST"]['parameters']>>) => client.request("/nodes/{node}/services/{service}/restart", "POST", {
                        ...((args[0]) as any),
                        $path: {node, service}
                    }),
                    /**
                     * Start service.
                     * @endpoint POST /nodes/{node}/services/{service}/start
                     * @allowToken 1
                     * @permissions {"check": ["perm", "/nodes/{node}", ["Sys.Modify"]]}
                     *
                     * Parameters:
                     * - `node` (path, required, string): The cluster node name.
                     * - `service` (path, required, Services): Service ID
                     */
                    start: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/services/{service}/start"]["POST"]['parameters']>>) => client.request("/nodes/{node}/services/{service}/start", "POST", {
                        ...((args[0]) as any),
                        $path: {node, service}
                    }),
                    /**
                     * Read service properties
                     * @endpoint GET /nodes/{node}/services/{service}/state
                     * @allowToken 1
                     * @permissions {"check": ["perm", "/nodes/{node}", ["Sys.Audit"]]}
                     *
                     * Parameters:
                     * - `node` (path, required, string): The cluster node name.
                     * - `service` (path, required, Services): Service ID
                     */
                    state: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/services/{service}/state"]["GET"]['parameters']>>) => client.request("/nodes/{node}/services/{service}/state", "GET", {
                        ...((args[0]) as any),
                        $path: {node, service}
                    }),
                    /**
                     * Stop service.
                     * @endpoint POST /nodes/{node}/services/{service}/stop
                     * @allowToken 1
                     * @permissions {"check": ["perm", "/nodes/{node}", ["Sys.Modify"]]}
                     *
                     * Parameters:
                     * - `node` (path, required, string): The cluster node name.
                     * - `service` (path, required, Services): Service ID
                     */
                    stop: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/services/{service}/stop"]["POST"]['parameters']>>) => client.request("/nodes/{node}/services/{service}/stop", "POST", {
                        ...((args[0]) as any),
                        $path: {node, service}
                    }),
                })
            },
            /**
             * Creates a SPICE shell.
             * @endpoint POST /nodes/{node}/spiceshell
             * @allowToken 1
             * @permissions {"check": ["perm", "/nodes/{node}", ["Sys.Console"]]}
             *
             * Parameters:
             * - `cmd` (body, optional, "ceph_install" | "login" | "upgrade"): Run specific command or default to login (requires 'root@pam')
             * - `cmd-opts` (body, optional, string): Add parameters to a command. Encoded as null terminated strings.
             * - `node` (path, required, string): The cluster node name.
             * - `proxy` (body, optional, string): SPICE proxy server. This can be used by the client to specify the proxy server. All nodes in a cluster runs 'spiceproxy', so it is up to the client to choose one. By default, we return the node where the VM is currently running. As reasonable setting is to use same node you use to connect to the API (This is window.location.hostname for the JS GUI).
             */
            spiceshell: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/spiceshell"]["POST"]['parameters']>>) => client.request("/nodes/{node}/spiceshell", "POST", {
                ...((args[0]) as any),
                $path: {node}
            }),
            /**
             * Start all VMs and containers located on this node (by default only those with onboot=1).
             * @endpoint POST /nodes/{node}/startall
             * @allowToken 1
             * @permissions {"description": "The 'VM.PowerMgmt' permission is required on '/' or on '/vms/<ID>' for each ID passed via the 'vms' parameter.", "user": "all"}
             *
             * Parameters:
             * - `force` (body, optional, boolean): Issue start command even if virtual guest have 'onboot' not set or set to off.
             * - `node` (path, required, string): The cluster node name.
             * - `vms` (body, optional, string): Only consider guests from this comma separated list of VMIDs.
             */
            startall: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/startall"]["POST"]['parameters']>>) => client.request("/nodes/{node}/startall", "POST", {
                ...((args[0]) as any),
                $path: {node}
            }),
            status: {
                /**
                 * Read node status
                 * @endpoint GET /nodes/{node}/status
                 * @allowToken 1
                 * @permissions {"check": ["perm", "/nodes/{node}", ["Sys.Audit"]]}
                 *
                 * Parameters:
                 * - `node` (path, required, string): The cluster node name.
                 */
                get: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/status"]["GET"]['parameters']>>) => client.request("/nodes/{node}/status", "GET", {
                    ...((args[0]) as any),
                    $path: {node}
                }),
                /**
                 * Reboot or shutdown a node.
                 * @endpoint POST /nodes/{node}/status
                 * @allowToken 1
                 * @permissions {"check": ["perm", "/nodes/{node}", ["Sys.PowerMgmt"]]}
                 *
                 * Parameters:
                 * - `command` (body, required, "reboot" | "shutdown"): Specify the command.
                 * - `node` (path, required, string): The cluster node name.
                 */
                node_cmd: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/status"]["POST"]['parameters']>>) => client.request("/nodes/{node}/status", "POST", {
                    ...((args[0]) as any),
                    $path: {node}
                }),
            },
            /**
             * Stop all VMs and Containers.
             * @endpoint POST /nodes/{node}/stopall
             * @allowToken 1
             * @permissions {"description": "The 'VM.PowerMgmt' permission is required on '/' or on '/vms/<ID>' for each ID passed via the 'vms' parameter.", "user": "all"}
             *
             * Parameters:
             * - `force-stop` (body, optional, boolean): Force a hard-stop after the timeout.
             * - `node` (path, required, string): The cluster node name.
             * - `timeout` (body, optional, number): Timeout for each guest shutdown task. Depending on `force-stop`, the shutdown gets then simply aborted or a hard-stop is forced.
             * - `vms` (body, optional, string): Only consider Guests with these IDs.
             */
            stop_all: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/stopall"]["POST"]['parameters']>>) => client.request("/nodes/{node}/stopall", "POST", {
                ...((args[0]) as any),
                $path: {node}
            }),
            storage: {
                /**
                 * Get status for all datastores.
                 * @endpoint GET /nodes/{node}/storage
                 * @allowToken 1
                 * @permissions {"description": "Only list entries where you have 'Datastore.Audit' or 'Datastore.AllocateSpace' permissions on '/storage/<storage>'", "user": "all"}
                 *
                 * Parameters:
                 * - `content` (query, optional, string): Only list stores which support this content type.
                 * - `enabled` (query, optional, boolean): Only list stores which are enabled (not disabled in config).
                 * - `format` (query, optional, boolean): Include information about formats
                 * - `node` (path, required, string): The cluster node name.
                 * - `storage` (query, optional, string): Only list status for  specified storage
                 * - `target` (query, optional, string): If target is different to 'node', we only lists shared storages which content is accessible on this 'node' and the specified 'target' node.
                 */
                index: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/storage"]["GET"]['parameters']>>) => client.request("/nodes/{node}/storage", "GET", {
                    ...((args[0]) as any),
                    $path: {node}
                }),
                storage: (storage: string) => ({
                    /**
                     * @endpoint GET /nodes/{node}/storage/{storage}
                     * @allowToken 1
                     * @permissions {"check": ["perm", "/storage/{storage}", ["Datastore.Audit", "Datastore.AllocateSpace"], "any", 1]}
                     *
                     * Parameters:
                     * - `node` (path, required, string): The cluster node name.
                     * - `storage` (path, required, string): The storage identifier.
                     */
                    index: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/storage/{storage}"]["GET"]['parameters']>>) => client.request("/nodes/{node}/storage/{storage}", "GET", {
                        ...((args[0]) as any),
                        $path: {node, storage}
                    }),
                    content: {
                        /**
                         * List storage content.
                         * @endpoint GET /nodes/{node}/storage/{storage}/content
                         * @allowToken 1
                         * @permissions {"check": ["perm", "/storage/{storage}", ["Datastore.Audit", "Datastore.AllocateSpace"], "any", 1]}
                         *
                         * Parameters:
                         * - `content` (query, optional, string): Only list content of this type.
                         * - `node` (path, required, string): The cluster node name.
                         * - `storage` (path, required, string): The storage identifier.
                         * - `vmid` (query, optional, number): Only list images for this VM
                         */
                        list: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/storage/{storage}/content"]["GET"]['parameters']>>) => client.request("/nodes/{node}/storage/{storage}/content", "GET", {
                            ...((args[0]) as any),
                            $path: {node, storage}
                        }),
                        /**
                         * Allocate disk images.
                         * @endpoint POST /nodes/{node}/storage/{storage}/content
                         * @allowToken 1
                         * @permissions {"check": ["perm", "/storage/{storage}", ["Datastore.AllocateSpace"]]}
                         *
                         * Parameters:
                         * - `filename` (body, required, string): The name of the file to create.
                         * - `format` (body, optional, "raw" | "qcow2" | "subvol" | "vmdk"): Format of the image.
                         * - `node` (path, required, string): The cluster node name.
                         * - `size` (body, required, string): Size in kilobyte (1024 bytes). Optional suffixes 'M' (megabyte, 1024K) and 'G' (gigabyte, 1024M)
                         * - `storage` (path, required, string): The storage identifier.
                         * - `vmid` (body, required, number): Specify owner VM
                         */
                        create: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/storage/{storage}/content"]["POST"]['parameters']>>) => client.request("/nodes/{node}/storage/{storage}/content", "POST", {
                            ...((args[0]) as any),
                            $path: {node, storage}
                        }),
                        volume: (volume: string) => ({
                            /**
                             * Delete volume
                             * @endpoint DELETE /nodes/{node}/storage/{storage}/content/{volume}
                             * @allowToken 1
                             * @permissions {"description": "You need 'Datastore.Allocate' privilege on the storage (or 'Datastore.AllocateSpace' for backup volumes if you have VM.Backup privilege on the VM).", "user": "all"}
                             *
                             * Parameters:
                             * - `delay` (query, optional, number): Time to wait for the task to finish. We return 'null' if the task finish within that time.
                             * - `node` (path, required, string): The cluster node name.
                             * - `storage` (path, optional, string): The storage identifier.
                             * - `volume` (path, required, string): Volume identifier
                             */
                            delete: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/storage/{storage}/content/{volume}"]["DELETE"]['parameters']>>) => client.request("/nodes/{node}/storage/{storage}/content/{volume}", "DELETE", {
                                ...((args[0]) as any),
                                $path: {node, storage, volume}
                            }),
                            /**
                             * Get volume attributes
                             * @endpoint GET /nodes/{node}/storage/{storage}/content/{volume}
                             * @allowToken 1
                             * @permissions {"description": "You need read access for the volume.", "user": "all"}
                             *
                             * Parameters:
                             * - `node` (path, required, string): The cluster node name.
                             * - `storage` (path, optional, string): The storage identifier.
                             * - `volume` (path, required, string): Volume identifier
                             */
                            info: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/storage/{storage}/content/{volume}"]["GET"]['parameters']>>) => client.request("/nodes/{node}/storage/{storage}/content/{volume}", "GET", {
                                ...((args[0]) as any),
                                $path: {node, storage, volume}
                            }),
                            /**
                             * Copy a volume. This is experimental code - do not use.
                             * @endpoint POST /nodes/{node}/storage/{storage}/content/{volume}
                             * @allowToken 1
                             *
                             * Parameters:
                             * - `node` (path, required, string): The cluster node name.
                             * - `storage` (path, optional, string): The storage identifier.
                             * - `target` (body, required, string): Target volume identifier
                             * - `target_node` (body, optional, string): Target node. Default is local node.
                             * - `volume` (path, required, string): Source volume identifier
                             */
                            copy: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/storage/{storage}/content/{volume}"]["POST"]['parameters']>>) => client.request("/nodes/{node}/storage/{storage}/content/{volume}", "POST", {
                                ...((args[0]) as any),
                                $path: {node, storage, volume}
                            }),
                            /**
                             * Update volume attributes
                             * @endpoint PUT /nodes/{node}/storage/{storage}/content/{volume}
                             * @allowToken 1
                             * @permissions {"description": "You need read access for the volume.", "user": "all"}
                             *
                             * Parameters:
                             * - `node` (path, required, string): The cluster node name.
                             * - `notes` (body, optional, string): The new notes.
                             * - `protected` (body, optional, boolean): Protection status. Currently only supported for backups.
                             * - `storage` (path, optional, string): The storage identifier.
                             * - `volume` (path, required, string): Volume identifier
                             */
                            update: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/storage/{storage}/content/{volume}"]["PUT"]['parameters']>>) => client.request("/nodes/{node}/storage/{storage}/content/{volume}", "PUT", {
                                ...((args[0]) as any),
                                $path: {node, storage, volume}
                            }),
                        })
                    },
                    /**
                     * Download templates, ISO images, OVAs and VM images by using an URL.
                     * @endpoint POST /nodes/{node}/storage/{storage}/download-url
                     * @allowToken 1
                     * @permissions {"check": ["and", ["perm", "/storage/{storage}", ["Datastore.AllocateTemplate"]], ["or", ["perm", "/", ["Sys.Audit", "Sys.Modify"]], ["perm", "/nodes/{node}", ["Sys.AccessNetwork"]]]], "description": "Requires allocation access on the storage and as this allows one to probe the (local!) host network indirectly it also requires one of Sys.Modify on / (for backwards compatibility) or the newer Sys.AccessNetwork privilege on the node."}
                     *
                     * Parameters:
                     * - `checksum` (body, optional, string): The expected checksum of the file.
                     * - `checksum-algorithm` (body, optional, "md5" | "sha1" | "sha224" | "sha256" | "sha384" | "sha512"): The algorithm to calculate the checksum of the file.
                     * - `compression` (body, optional, string): Decompress the downloaded file using the specified compression algorithm.
                     * - `content` (body, required, "iso" | "vztmpl" | "import"): Content type.
                     * - `filename` (body, required, string): The name of the file to create. Caution: This will be normalized!
                     * - `node` (path, required, string): The cluster node name.
                     * - `storage` (path, required, string): The storage identifier.
                     * - `url` (body, required, string): The URL to download the file from.
                     * - `verify-certificates` (body, optional, boolean): If false, no SSL/TLS certificates will be verified.
                     */
                    download_url: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/storage/{storage}/download-url"]["POST"]['parameters']>>) => client.request("/nodes/{node}/storage/{storage}/download-url", "POST", {
                        ...((args[0]) as any),
                        $path: {node, storage}
                    }),
                    file_restore: {
                        /**
                         * Extract a file or directory (as zip archive) from a PBS backup.
                         * @endpoint GET /nodes/{node}/storage/{storage}/file-restore/download
                         * @allowToken 1
                         * @permissions {"description": "You need read access for the volume.", "user": "all"}
                         *
                         * Parameters:
                         * - `filepath` (query, required, string): base64-path to the directory or file to download.
                         * - `node` (path, required, string): The cluster node name.
                         * - `storage` (path, required, string): The storage identifier.
                         * - `tar` (query, optional, boolean): Download dirs as 'tar.zst' instead of 'zip'.
                         * - `volume` (query, required, string): Backup volume ID or name. Currently only PBS snapshots are supported.
                         */
                        download: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/storage/{storage}/file-restore/download"]["GET"]['parameters']>>) => client.request("/nodes/{node}/storage/{storage}/file-restore/download", "GET", {
                            ...((args[0]) as any),
                            $path: {node, storage}
                        }),
                        /**
                         * List files and directories for single file restore under the given path.
                         * @endpoint GET /nodes/{node}/storage/{storage}/file-restore/list
                         * @allowToken 1
                         * @permissions {"description": "You need read access for the volume.", "user": "all"}
                         *
                         * Parameters:
                         * - `filepath` (query, required, string): base64-path to the directory or file being listed, or "/".
                         * - `node` (path, required, string): The cluster node name.
                         * - `storage` (path, required, string): The storage identifier.
                         * - `volume` (query, required, string): Backup volume ID or name. Currently only PBS snapshots are supported.
                         */
                        list: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/storage/{storage}/file-restore/list"]["GET"]['parameters']>>) => client.request("/nodes/{node}/storage/{storage}/file-restore/list", "GET", {
                            ...((args[0]) as any),
                            $path: {node, storage}
                        }),
                    },
                    /**
                     * Get the base parameters for creating a guest which imports data from a foreign importable guest, like an ESXi VM
                     * @endpoint GET /nodes/{node}/storage/{storage}/import-metadata
                     * @allowToken 1
                     * @permissions {"description": "You need read access for the volume.", "user": "all"}
                     *
                     * Parameters:
                     * - `node` (path, required, string): The cluster node name.
                     * - `storage` (path, required, string): The storage identifier.
                     * - `volume` (query, required, string): Volume identifier for the guest archive/entry.
                     */
                    import_metadata: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/storage/{storage}/import-metadata"]["GET"]['parameters']>>) => client.request("/nodes/{node}/storage/{storage}/import-metadata", "GET", {
                        ...((args[0]) as any),
                        $path: {node, storage}
                    }),
                    /**
                     * Pull an OCI image from a registry.
                     * @endpoint POST /nodes/{node}/storage/{storage}/oci-registry-pull
                     * @allowToken 1
                     * @permissions {"check": ["and", ["perm", "/storage/{storage}", ["Datastore.AllocateTemplate"]], ["perm", "/nodes/{node}", ["Sys.AccessNetwork"]]]}
                     *
                     * Parameters:
                     * - `filename` (body, optional, string): Custom destination file name of the OCI image. Caution: This will be normalized!
                     * - `node` (path, required, string): The cluster node name.
                     * - `reference` (body, required, string): The reference to the OCI image to download.
                     * - `storage` (path, required, string): The storage identifier.
                     */
                    oci_registry_pull: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/storage/{storage}/oci-registry-pull"]["POST"]['parameters']>>) => client.request("/nodes/{node}/storage/{storage}/oci-registry-pull", "POST", {
                        ...((args[0]) as any),
                        $path: {node, storage}
                    }),
                    prunebackups: {
                        /**
                         * Prune backups. Only those using the standard naming scheme are considered.
                         * @endpoint DELETE /nodes/{node}/storage/{storage}/prunebackups
                         * @allowToken 1
                         * @permissions {"description": "You need the 'Datastore.Allocate' privilege on the storage (or if a VM ID is specified, 'Datastore.AllocateSpace' and 'VM.Backup' for the VM).", "user": "all"}
                         *
                         * Parameters:
                         * - `node` (path, required, string): The cluster node name.
                         * - `prune-backups` (query, optional, string): Use these retention options instead of those from the storage configuration.
                         * - `storage` (path, required, string): The storage identifier.
                         * - `type` (query, optional, "qemu" | "lxc"): Either 'qemu' or 'lxc'. Only consider backups for guests of this type.
                         * - `vmid` (query, optional, number): Only prune backups for this VM.
                         */
                        delete: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/storage/{storage}/prunebackups"]["DELETE"]['parameters']>>) => client.request("/nodes/{node}/storage/{storage}/prunebackups", "DELETE", {
                            ...((args[0]) as any),
                            $path: {node, storage}
                        }),
                        /**
                         * Get prune information for backups. NOTE: this is only a preview and might not be what a subsequent prune call does if backups are removed/added in the meantime.
                         * @endpoint GET /nodes/{node}/storage/{storage}/prunebackups
                         * @allowToken 1
                         * @permissions {"check": ["perm", "/storage/{storage}", ["Datastore.Audit", "Datastore.AllocateSpace"], "any", 1]}
                         *
                         * Parameters:
                         * - `node` (path, required, string): The cluster node name.
                         * - `prune-backups` (query, optional, string): Use these retention options instead of those from the storage configuration.
                         * - `storage` (path, required, string): The storage identifier.
                         * - `type` (query, optional, "qemu" | "lxc"): Either 'qemu' or 'lxc'. Only consider backups for guests of this type.
                         * - `vmid` (query, optional, number): Only consider backups for this guest.
                         */
                        dryrun: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/storage/{storage}/prunebackups"]["GET"]['parameters']>>) => client.request("/nodes/{node}/storage/{storage}/prunebackups", "GET", {
                            ...((args[0]) as any),
                            $path: {node, storage}
                        }),
                    },
                    /**
                     * Read storage RRD statistics (returns PNG).
                     * @endpoint GET /nodes/{node}/storage/{storage}/rrd
                     * @allowToken 1
                     * @permissions {"check": ["perm", "/storage/{storage}", ["Datastore.Audit", "Datastore.AllocateSpace"], "any", 1]}
                     *
                     * Parameters:
                     * - `cf` (query, optional, "AVERAGE" | "MAX"): The RRD consolidation function
                     * - `ds` (query, required, string): The list of datasources you want to display.
                     * - `node` (path, required, string): The cluster node name.
                     * - `storage` (path, required, string): The storage identifier.
                     * - `timeframe` (query, required, "hour" | "day" | "week" | "month" | "year"): Specify the time frame you are interested in.
                     */
                    rrd: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/storage/{storage}/rrd"]["GET"]['parameters']>>) => client.request("/nodes/{node}/storage/{storage}/rrd", "GET", {
                        ...((args[0]) as any),
                        $path: {node, storage}
                    }),
                    /**
                     * Read storage RRD statistics.
                     * @endpoint GET /nodes/{node}/storage/{storage}/rrddata
                     * @allowToken 1
                     * @permissions {"check": ["perm", "/storage/{storage}", ["Datastore.Audit", "Datastore.AllocateSpace"], "any", 1]}
                     *
                     * Parameters:
                     * - `cf` (query, optional, "AVERAGE" | "MAX"): The RRD consolidation function
                     * - `node` (path, required, string): The cluster node name.
                     * - `storage` (path, required, string): The storage identifier.
                     * - `timeframe` (query, required, "hour" | "day" | "week" | "month" | "year"): Specify the time frame you are interested in.
                     */
                    rrddata: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/storage/{storage}/rrddata"]["GET"]['parameters']>>) => client.request("/nodes/{node}/storage/{storage}/rrddata", "GET", {
                        ...((args[0]) as any),
                        $path: {node, storage}
                    }),
                    /**
                     * Read storage status.
                     * @endpoint GET /nodes/{node}/storage/{storage}/status
                     * @allowToken 1
                     * @permissions {"check": ["perm", "/storage/{storage}", ["Datastore.Audit", "Datastore.AllocateSpace"], "any", 1]}
                     *
                     * Parameters:
                     * - `node` (path, required, string): The cluster node name.
                     * - `storage` (path, required, string): The storage identifier.
                     */
                    status: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/storage/{storage}/status"]["GET"]['parameters']>>) => client.request("/nodes/{node}/storage/{storage}/status", "GET", {
                        ...((args[0]) as any),
                        $path: {node, storage}
                    }),
                    /**
                     * Upload templates, ISO images, OVAs and VM images.
                     * @endpoint POST /nodes/{node}/storage/{storage}/upload
                     * @allowToken 1
                     * @permissions {"check": ["perm", "/storage/{storage}", ["Datastore.AllocateTemplate"]]}
                     *
                     * Parameters:
                     * - `checksum` (body, optional, string): The expected checksum of the file.
                     * - `checksum-algorithm` (body, optional, "md5" | "sha1" | "sha224" | "sha256" | "sha384" | "sha512"): The algorithm to calculate the checksum of the file.
                     * - `content` (body, required, "iso" | "vztmpl" | "import"): Content type.
                     * - `filename` (body, required, string): The name of the file to create. Caution: This will be normalized!
                     * - `node` (path, required, string): The cluster node name.
                     * - `storage` (path, required, string): The storage identifier.
                     * - `tmpfilename` (body, optional, string): The source file name. This parameter is usually set by the REST handler. You can only overwrite it when connecting to the trusted port on localhost.
                     */
                    upload: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/storage/{storage}/upload"]["POST"]['parameters']>>) => client.request("/nodes/{node}/storage/{storage}/upload", "POST", {
                        ...((args[0]) as any),
                        $path: {node, storage}
                    }),
                })
            },
            subscription: {
                /**
                 * Delete subscription key of this node.
                 * @endpoint DELETE /nodes/{node}/subscription
                 * @allowToken 1
                 * @permissions {"check": ["perm", "/nodes/{node}", ["Sys.Modify"]]}
                 *
                 * Parameters:
                 * - `node` (path, required, string): The cluster node name.
                 */
                delete: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/subscription"]["DELETE"]['parameters']>>) => client.request("/nodes/{node}/subscription", "DELETE", {
                    ...((args[0]) as any),
                    $path: {node}
                }),
                /**
                 * Read subscription info.
                 * @endpoint GET /nodes/{node}/subscription
                 * @allowToken 1
                 * @permissions {"user": "all"}
                 *
                 * Parameters:
                 * - `node` (path, required, string): The cluster node name.
                 */
                get: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/subscription"]["GET"]['parameters']>>) => client.request("/nodes/{node}/subscription", "GET", {
                    ...((args[0]) as any),
                    $path: {node}
                }),
                /**
                 * Update subscription info.
                 * @endpoint POST /nodes/{node}/subscription
                 * @allowToken 1
                 * @permissions {"check": ["perm", "/nodes/{node}", ["Sys.Modify"]]}
                 *
                 * Parameters:
                 * - `force` (body, optional, boolean): Always connect to server, even if local cache is still valid.
                 * - `node` (path, required, string): The cluster node name.
                 */
                update: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/subscription"]["POST"]['parameters']>>) => client.request("/nodes/{node}/subscription", "POST", {
                    ...((args[0]) as any),
                    $path: {node}
                }),
                /**
                 * Set subscription key.
                 * @endpoint PUT /nodes/{node}/subscription
                 * @allowToken 1
                 * @permissions {"check": ["perm", "/nodes/{node}", ["Sys.Modify"]]}
                 *
                 * Parameters:
                 * - `key` (body, required, string): Proxmox VE subscription key
                 * - `node` (path, required, string): The cluster node name.
                 */
                set: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/subscription"]["PUT"]['parameters']>>) => client.request("/nodes/{node}/subscription", "PUT", {
                    ...((args[0]) as any),
                    $path: {node}
                }),
            },
            /**
             * Suspend all VMs.
             * @endpoint POST /nodes/{node}/suspendall
             * @allowToken 1
             * @permissions {"description": "The 'VM.PowerMgmt' permission is required on '/' or on '/vms/<ID>' for each ID passed via the 'vms' parameter. Additionally, you need 'VM.Config.Disk' on the '/vms/{vmid}' path and 'Datastore.AllocateSpace' for the configured state-storage(s)", "user": "all"}
             *
             * Parameters:
             * - `node` (path, required, string): The cluster node name.
             * - `vms` (body, optional, string): Only consider Guests with these IDs.
             */
            suspend_all: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/suspendall"]["POST"]['parameters']>>) => client.request("/nodes/{node}/suspendall", "POST", {
                ...((args[0]) as any),
                $path: {node}
            }),
            /**
             * Read system log
             * @endpoint GET /nodes/{node}/syslog
             * @allowToken 1
             * @permissions {"check": ["perm", "/nodes/{node}", ["Sys.Syslog"]]}
             *
             * Parameters:
             * - `limit` (query, optional, number)
             * - `node` (path, required, string): The cluster node name.
             * - `service` (query, optional, string): Service ID
             * - `since` (query, optional, string): Display all log since this date-time string.
             * - `start` (query, optional, number)
             * - `until` (query, optional, string): Display all log until this date-time string.
             */
            syslog: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/syslog"]["GET"]['parameters']>>) => client.request("/nodes/{node}/syslog", "GET", {
                ...((args[0]) as any),
                $path: {node}
            }),
            tasks: {
                /**
                 * Read task list for one node (finished tasks).
                 * @endpoint GET /nodes/{node}/tasks
                 * @allowToken 1
                 * @permissions {"description": "List task associated with the current user, or all task the user has 'Sys.Audit' permissions on /nodes/<node> (the <node> the task runs on).", "user": "all"}
                 *
                 * Parameters:
                 * - `errors` (query, optional, boolean): Only list tasks with a status of ERROR.
                 * - `limit` (query, optional, number): Only list this number of tasks.
                 * - `node` (path, required, string): The cluster node name.
                 * - `since` (query, optional, number): Only list tasks since this UNIX epoch.
                 * - `source` (query, optional, "archive" | "active" | "all"): List archived, active or all tasks.
                 * - `start` (query, optional, number): List tasks beginning from this offset.
                 * - `statusfilter` (query, optional, string): List of Task States that should be returned.
                 * - `typefilter` (query, optional, string): Only list tasks of this type (e.g., vzstart, vzdump).
                 * - `until` (query, optional, number): Only list tasks until this UNIX epoch.
                 * - `userfilter` (query, optional, string): Only list tasks from this user.
                 * - `vmid` (query, optional, number): Only list tasks for this VM.
                 */
                list: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/tasks"]["GET"]['parameters']>>) => client.request("/nodes/{node}/tasks", "GET", {
                    ...((args[0]) as any),
                    $path: {node}
                }),
                task: (upid: string) => ({
                    /**
                     * Stop a task.
                     * @endpoint DELETE /nodes/{node}/tasks/{upid}
                     * @allowToken 1
                     * @permissions {"description": "The user needs 'Sys.Modify' permissions on '/nodes/<node>' if they aren't the owner of the task.", "user": "all"}
                     *
                     * Parameters:
                     * - `node` (path, required, string): The cluster node name.
                     * - `upid` (path, required, string)
                     */
                    stop: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/tasks/{upid}"]["DELETE"]['parameters']>>) => client.request("/nodes/{node}/tasks/{upid}", "DELETE", {
                        ...((args[0]) as any),
                        $path: {node, upid}
                    }),
                    /**
                     * @endpoint GET /nodes/{node}/tasks/{upid}
                     * @allowToken 1
                     * @permissions {"user": "all"}
                     *
                     * Parameters:
                     * - `node` (path, required, string): The cluster node name.
                     * - `upid` (path, required, string)
                     */
                    get: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/tasks/{upid}"]["GET"]['parameters']>>) => client.request("/nodes/{node}/tasks/{upid}", "GET", {
                        ...((args[0]) as any),
                        $path: {node, upid}
                    }),
                    /**
                     * Read task log.
                     * @endpoint GET /nodes/{node}/tasks/{upid}/log
                     * @allowToken 1
                     * @permissions {"description": "The user needs 'Sys.Audit' permissions on '/nodes/<node>' if they aren't the owner of the task.", "user": "all"}
                     *
                     * Parameters:
                     * - `download` (query, optional, boolean): Whether the tasklog file should be downloaded. This parameter can't be used in conjunction with other parameters
                     * - `limit` (query, optional, number): The number of lines to read from the tasklog.
                     * - `node` (path, required, string): The cluster node name.
                     * - `start` (query, optional, number): Start at this line when reading the tasklog
                     * - `upid` (path, required, string): The task's unique ID.
                     */
                    log: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/tasks/{upid}/log"]["GET"]['parameters']>>) => client.request("/nodes/{node}/tasks/{upid}/log", "GET", {
                        ...((args[0]) as any),
                        $path: {node, upid}
                    }),
                    /**
                     * Read task status.
                     * @endpoint GET /nodes/{node}/tasks/{upid}/status
                     * @allowToken 1
                     * @permissions {"description": "The user needs 'Sys.Audit' permissions on '/nodes/<node>' if they are not the owner of the task.", "user": "all"}
                     *
                     * Parameters:
                     * - `node` (path, required, string): The cluster node name.
                     * - `upid` (path, required, string): The task's unique ID.
                     */
                    status: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/tasks/{upid}/status"]["GET"]['parameters']>>) => client.request("/nodes/{node}/tasks/{upid}/status", "GET", {
                        ...((args[0]) as any),
                        $path: {node, upid}
                    }),
                })
            },
            /**
             * Creates a VNC Shell proxy.
             * @endpoint POST /nodes/{node}/termproxy
             * @allowToken 1
             * @permissions {"check": ["perm", "/nodes/{node}", ["Sys.Console"]]}
             *
             * Parameters:
             * - `cmd` (body, optional, "ceph_install" | "login" | "upgrade"): Run specific command or default to login (requires 'root@pam')
             * - `cmd-opts` (body, optional, string): Add parameters to a command. Encoded as null terminated strings.
             * - `node` (path, required, string): The cluster node name.
             */
            termproxy: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/termproxy"]["POST"]['parameters']>>) => client.request("/nodes/{node}/termproxy", "POST", {
                ...((args[0]) as any),
                $path: {node}
            }),
            time: {
                /**
                 * Read server time and time zone settings.
                 * @endpoint GET /nodes/{node}/time
                 * @allowToken 1
                 * @permissions {"check": ["perm", "/nodes/{node}", ["Sys.Audit"]]}
                 *
                 * Parameters:
                 * - `node` (path, required, string): The cluster node name.
                 */
                get: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/time"]["GET"]['parameters']>>) => client.request("/nodes/{node}/time", "GET", {
                    ...((args[0]) as any),
                    $path: {node}
                }),
                /**
                 * Set time zone.
                 * @endpoint PUT /nodes/{node}/time
                 * @allowToken 1
                 * @permissions {"check": ["perm", "/nodes/{node}", ["Sys.Modify"]]}
                 *
                 * Parameters:
                 * - `node` (path, required, string): The cluster node name.
                 * - `timezone` (body, required, string): Time zone. The file '/usr/share/zoneinfo/zone.tab' contains the list of valid names.
                 */
                set_timezone: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/time"]["PUT"]['parameters']>>) => client.request("/nodes/{node}/time", "PUT", {
                    ...((args[0]) as any),
                    $path: {node}
                }),
            },
            /**
             * API version details
             * @endpoint GET /nodes/{node}/version
             * @allowToken 1
             * @permissions {"user": "all"}
             *
             * Parameters:
             * - `node` (path, required, string): The cluster node name.
             */
            version: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/version"]["GET"]['parameters']>>) => client.request("/nodes/{node}/version", "GET", {
                ...((args[0]) as any),
                $path: {node}
            }),
            /**
             * Creates a VNC Shell proxy.
             * @endpoint POST /nodes/{node}/vncshell
             * @allowToken 1
             * @permissions {"check": ["perm", "/nodes/{node}", ["Sys.Console"]]}
             *
             * Parameters:
             * - `cmd` (body, optional, "ceph_install" | "login" | "upgrade"): Run specific command or default to login (requires 'root@pam')
             * - `cmd-opts` (body, optional, string): Add parameters to a command. Encoded as null terminated strings.
             * - `height` (body, optional, number): sets the height of the console in pixels.
             * - `node` (path, required, string): The cluster node name.
             * - `websocket` (body, optional, boolean): use websocket instead of standard vnc.
             * - `width` (body, optional, number): sets the width of the console in pixels.
             */
            vncshell: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/vncshell"]["POST"]['parameters']>>) => client.request("/nodes/{node}/vncshell", "POST", {
                ...((args[0]) as any),
                $path: {node}
            }),
            /**
             * Opens a websocket for VNC traffic.
             * @endpoint GET /nodes/{node}/vncwebsocket
             * @allowToken 1
             * @permissions {"check": ["perm", "/nodes/{node}", ["Sys.Console"]], "description": "You also need to pass a valid ticket (vncticket)."}
             *
             * Parameters:
             * - `node` (path, required, string): The cluster node name.
             * - `port` (query, required, number): Port number returned by previous vncproxy call.
             * - `vncticket` (query, required, string): Ticket from previous call to vncproxy.
             */
            vncwebsocket: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/vncwebsocket"]["GET"]['parameters']>>) => client.request("/nodes/{node}/vncwebsocket", "GET", {
                ...((args[0]) as any),
                $path: {node}
            }),
            vzdump: {
                /**
                 * Create backup.
                 * @endpoint POST /nodes/{node}/vzdump
                 * @allowToken 1
                 * @permissions {"description": "The user needs 'VM.Backup' permissions on any VM, and 'Datastore.AllocateSpace' on the backup storage (and fleecing storage when fleecing is used). The 'tmpdir', 'dumpdir', 'script' and 'job-id' parameters are restricted to the 'root@pam' user. The 'prune-backups' setting requires 'Datastore.Allocate' on the backup storage. The 'bwlimit', 'performance' and 'ionice' parameters require 'Sys.Modify' on '/'.", "user": "all"}
                 *
                 * Parameters:
                 * - `all` (body, optional, boolean): Backup all known guest systems on this host.
                 * - `bwlimit` (body, optional, number): Limit I/O bandwidth (in KiB/s).
                 * - `compress` (body, optional, "0" | "1" | "gzip" | "lzo" | "zstd"): Compress dump file.
                 * - `dumpdir` (body, optional, string): Store resulting files to specified directory.
                 * - `exclude` (body, optional, string): Exclude specified guest systems (assumes --all)
                 * - `exclude-path` (body, optional, string[]>): Exclude certain files/directories (shell globs). Paths starting with '/' are anchored to the container's root, other paths match relative to each subdirectory.
                 * - `fleecing` (body, optional, string): Options for backup fleecing (VM only).
                 * - `ionice` (body, optional, number): Set IO priority when using the BFQ scheduler. For snapshot and suspend mode backups of VMs, this only affects the compressor. A value of 8 means the idle priority is used, otherwise the best-effort priority is used with the specified value.
                 * - `job-id` (body, optional, string): The ID of the backup job. If set, the 'backup-job' metadata field of the backup notification will be set to this value. Only root@pam can set this parameter.
                 * - `lockwait` (body, optional, number): Maximal time to wait for the global lock (minutes).
                 * - `mailnotification` (body, optional, "always" | "failure"): Deprecated: use notification targets/matchers instead. Specify when to send a notification mail
                 * - `mailto` (body, optional, string): Deprecated: Use notification targets/matchers instead. Comma-separated list of email addresses or users that should receive email notifications.
                 * - `maxfiles` (body, optional, number): Deprecated: use 'prune-backups' instead. Maximal number of backup files per guest system.
                 * - `mode` (body, optional, "snapshot" | "suspend" | "stop"): Backup mode.
                 * - `node` (path, optional, string): Only run if executed on this node.
                 * - `notes-template` (body, optional, string): Template string for generating notes for the backup(s). It can contain variables which will be replaced by their values. Currently supported are {{cluster}}, {{guestname}}, {{node}}, and {{vmid}}, but more might be added in the future. Needs to be a single line, newline and backslash need to be escaped as '\n' and '\\' respectively.
                 * - `notification-mode` (body, optional, "auto" | "legacy-sendmail" | "notification-system"): Determine which notification system to use. If set to 'legacy-sendmail', vzdump will consider the mailto/mailnotification parameters and send emails to the specified address(es) via the 'sendmail' command. If set to 'notification-system', a notification will be sent via PVE's notification system, and the mailto and mailnotification will be ignored. If set to 'auto' (default setting), an email will be sent if mailto is set, and the notification system will be used if not.
                 * - `pbs-change-detection-mode` (body, optional, "legacy" | "data" | "metadata"): PBS mode used to detect file changes and switch encoding format for container backups.
                 * - `performance` (body, optional, string): Other performance-related settings.
                 * - `pigz` (body, optional, number): Use pigz instead of gzip when N>0. N=1 uses half of cores, N>1 uses N as thread count.
                 * - `pool` (body, optional, string): Backup all known guest systems included in the specified pool.
                 * - `protected` (body, optional, boolean): If true, mark backup(s) as protected.
                 * - `prune-backups` (body, optional, string): Use these retention options instead of those from the storage configuration.
                 * - `quiet` (body, optional, boolean): Be quiet.
                 * - `remove` (body, optional, boolean): Prune older backups according to 'prune-backups'.
                 * - `script` (body, optional, string): Use specified hook script.
                 * - `stdexcludes` (body, optional, boolean): Exclude temporary files and logs.
                 * - `stdout` (body, optional, boolean): Write tar to stdout, not to a file.
                 * - `stop` (body, optional, boolean): Stop running backup jobs on this host.
                 * - `stopwait` (body, optional, number): Maximal time to wait until a guest system is stopped (minutes).
                 * - `storage` (body, optional, string): Store resulting file to this storage.
                 * - `tmpdir` (body, optional, string): Store temporary files to specified directory.
                 * - `vmid` (body, optional, string): The ID of the guest system you want to backup.
                 * - `zstd` (body, optional, number): Zstd threads. N=0 uses half of the available cores, if N is set to a value bigger than 0, N is used as thread count.
                 */
                create: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/vzdump"]["POST"]['parameters']>>) => client.request("/nodes/{node}/vzdump", "POST", {
                    ...((args[0]) as any),
                    $path: {node}
                }),
                /**
                 * Get the currently configured vzdump defaults.
                 * @endpoint GET /nodes/{node}/vzdump/defaults
                 * @allowToken 1
                 * @permissions {"description": "The user needs 'Datastore.Audit' or 'Datastore.AllocateSpace' permissions for the specified storage (or default storage if none specified). Some properties are only returned when the user has 'Sys.Audit' permissions for the node.", "user": "all"}
                 *
                 * Parameters:
                 * - `node` (path, required, string): The cluster node name.
                 * - `storage` (query, optional, string): The storage identifier.
                 */
                defaults: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/vzdump/defaults"]["GET"]['parameters']>>) => client.request("/nodes/{node}/vzdump/defaults", "GET", {
                    ...((args[0]) as any),
                    $path: {node}
                }),
                /**
                 * Extract configuration from vzdump backup archive.
                 * @endpoint GET /nodes/{node}/vzdump/extractconfig
                 * @allowToken 1
                 * @permissions {"description": "The user needs 'VM.Backup' permissions on the backed up guest ID, and 'Datastore.AllocateSpace' on the backup storage.", "user": "all"}
                 *
                 * Parameters:
                 * - `node` (path, required, string): The cluster node name.
                 * - `volume` (query, required, string): Volume identifier
                 */
                extract_config: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/vzdump/extractconfig"]["GET"]['parameters']>>) => client.request("/nodes/{node}/vzdump/extractconfig", "GET", {
                    ...((args[0]) as any),
                    $path: {node}
                }),
            },
            /**
             * Try to wake a node via 'wake on LAN' network packet.
             * @endpoint POST /nodes/{node}/wakeonlan
             * @allowToken 1
             * @permissions {"check": ["perm", "/nodes/{node}", ["Sys.PowerMgmt"]]}
             *
             * Parameters:
             * - `node` (path, required, string): target node for wake on LAN packet
             */
            wakeonlan: (...args: ArgsTuple<PathContext<NodesAPI["/nodes/{node}/wakeonlan"]["POST"]['parameters']>>) => client.request("/nodes/{node}/wakeonlan", "POST", {
                ...((args[0]) as any),
                $path: {node}
            }),
        },
        //TODO: LXC en Qemu hier toevoegen.
    })
}) as const
