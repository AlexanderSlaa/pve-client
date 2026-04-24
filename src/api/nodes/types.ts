// Shared types for nodes endpoint group modules

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

// Full NodesAPI type definition moved from nodes.ts
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
};
