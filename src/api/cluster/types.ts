// Shared ClusterAPI type for all cluster endpoint factories
import { PathContext } from "../index.js";
import type { ArgsTuple } from "../index.js";
import { Client } from "../../index.js";

// --- BEGIN ClusterAPI type definition ---
// (Copy-paste from cluster.ts, lines 4-3187)

export type ClusterAPI = {
    "/cluster": {
        "GET": {
            parameters: {}
            return: ({ name: string } & Record<string, unknown>)[]
        }
    },
    "/cluster/acme": {
        "GET": {
            parameters: {}
            return: Record<string, unknown>[]
        }
    },
    "/cluster/acme/account": {
        "GET": {
            parameters: {}
            return: Record<string, unknown>[]
        },
        "POST": {
            parameters: {
                $body: {
                    "contact": string;
                    "directory"?: string;
                    "eab-hmac-key"?: string;
                    "eab-kid"?: string;
                    "name"?: string;
                    "tos_url"?: string
                },
            }
            return: string
        }
    },
    "/cluster/acme/account/{name}": {
        "DELETE": {
            parameters: {
                $path: { "name": string },
            }
            return: string
        },
        "GET": {
            parameters: {
                $path: { "name": string },
            }
            return: { "account"?: Record<string, unknown>; "directory"?: string; "location"?: string; "tos"?: string }
        },
        "PUT": {
            parameters: {
                $path: { "name": string },
                $body: { "contact"?: string },
            }
            return: string
        }
    },
    "/cluster/acme/challenge-schema": {
        "GET": {
            parameters: {}
            return: { "id": string; "name": string; "schema": Record<string, unknown>; "type": string }[]
        }
    },
    "/cluster/acme/directories": {
        "GET": {
            parameters: {}
            return: { "name": string; "url": string }[]
        }
    },
    "/cluster/acme/meta": {
        "GET": {
            parameters: {
                $query?: { "directory"?: string },
            }
            return: {
                "caaIdentities"?: string[];
                "externalAccountRequired"?: boolean;
                "termsOfService"?: string;
                "website"?: string
            }
        }
    },
    "/cluster/acme/plugins": {
        "GET": {
            parameters: {
                $query?: { "type"?: "dns" | "standalone" },
            }
            return: {
                "api"?: "1984hosting" | "acmedns" | "acmeproxy" | "active24" | "ad" | "ali" | "alviy" | "anx" | "artfiles" | "arvan" | "aurora" | "autodns" | "aws" | "azion" | "azure" | "beget" | "bookmyname" | "bunny" | "cf" | "clouddns" | "cloudns" | "cn" | "conoha" | "constellix" | "cpanel" | "curanet" | "cyon" | "da" | "ddnss" | "desec" | "df" | "dgon" | "dnsexit" | "dnshome" | "dnsimple" | "dnsservices" | "doapi" | "domeneshop" | "dp" | "dpi" | "dreamhost" | "duckdns" | "durabledns" | "dyn" | "dynu" | "dynv6" | "easydns" | "edgecenter" | "edgedns" | "euserv" | "exoscale" | "fornex" | "freedns" | "freemyip" | "gandi_livedns" | "gcloud" | "gcore" | "gd" | "geoscaling" | "googledomains" | "he" | "he_ddns" | "hetzner" | "hexonet" | "hostingde" | "huaweicloud" | "infoblox" | "infomaniak" | "internetbs" | "inwx" | "ionos" | "ionos_cloud" | "ipv64" | "ispconfig" | "jd" | "joker" | "kappernet" | "kas" | "kinghost" | "knot" | "la" | "leaseweb" | "lexicon" | "limacity" | "linode" | "linode_v4" | "loopia" | "lua" | "maradns" | "me" | "miab" | "mijnhost" | "misaka" | "myapi" | "mydevil" | "mydnsjp" | "mythic_beasts" | "namecheap" | "namecom" | "namesilo" | "nanelo" | "nederhost" | "neodigit" | "netcup" | "netlify" | "nic" | "njalla" | "nm" | "nsd" | "nsone" | "nsupdate" | "nw" | "oci" | "omglol" | "one" | "online" | "openprovider" | "openstack" | "opnsense" | "ovh" | "pdns" | "pleskxml" | "pointhq" | "porkbun" | "rackcorp" | "rackspace" | "rage4" | "rcode0" | "regru" | "scaleway" | "schlundtech" | "selectel" | "selfhost" | "servercow" | "simply" | "technitium" | "tele3" | "tencent" | "timeweb" | "transip" | "udr" | "ultra" | "unoeuro" | "variomedia" | "veesp" | "vercel" | "vscale" | "vultr" | "websupport" | "west_cn" | "world4you" | "yandex360" | "yc" | "zilore" | "zone" | "zoneedit" | "zonomi";
                "data"?: string;
                "digest"?: string;
                "disable"?: boolean;
                "nodes"?: string;
                "plugin": string;
                "type": "dns" | "standalone";
                "validation-delay"?: number
            }[]
        },
        "POST": {
            parameters: {
                $body: {
                    "api"?: "1984hosting" | "acmedns" | "acmeproxy" | "active24" | "ad" | "ali" | "alviy" | "anx" | "artfiles" | "arvan" | "aurora" | "autodns" | "aws" | "azion" | "azure" | "beget" | "bookmyname" | "bunny" | "cf" | "clouddns" | "cloudns" | "cn" | "conoha" | "constellix" | "cpanel" | "curanet" | "cyon" | "da" | "ddnss" | "desec" | "df" | "dgon" | "dnsexit" | "dnshome" | "dnsimple" | "dnsservices" | "doapi" | "domeneshop" | "dp" | "dpi" | "dreamhost" | "duckdns" | "durabledns" | "dyn" | "dynu" | "dynv6" | "easydns" | "edgecenter" | "edgedns" | "euserv" | "exoscale" | "fornex" | "freedns" | "freemyip" | "gandi_livedns" | "gcloud" | "gcore" | "gd" | "geoscaling" | "googledomains" | "he" | "he_ddns" | "hetzner" | "hexonet" | "hostingde" | "huaweicloud" | "infoblox" | "infomaniak" | "internetbs" | "inwx" | "ionos" | "ionos_cloud" | "ipv64" | "ispconfig" | "jd" | "joker" | "kappernet" | "kas" | "kinghost" | "knot" | "la" | "leaseweb" | "lexicon" | "limacity" | "linode" | "linode_v4" | "loopia" | "lua" | "maradns" | "me" | "miab" | "mijnhost" | "misaka" | "myapi" | "mydevil" | "mydnsjp" | "mythic_beasts" | "namecheap" | "namecom" | "namesilo" | "nanelo" | "nederhost" | "neodigit" | "netcup" | "netlify" | "nic" | "njalla" | "nm" | "nsd" | "nsone" | "nsupdate" | "nw" | "oci" | "omglol" | "one" | "online" | "openprovider" | "openstack" | "opnsense" | "ovh" | "pdns" | "pleskxml" | "pointhq" | "porkbun" | "rackcorp" | "rackspace" | "rage4" | "rcode0" | "regru" | "scaleway" | "schlundtech" | "selectel" | "selfhost" | "servercow" | "simply" | "technitium" | "tele3" | "tencent" | "timeweb" | "transip" | "udr" | "ultra" | "unoeuro" | "variomedia" | "veesp" | "vercel" | "vscale" | "vultr" | "websupport" | "west_cn" | "world4you" | "yandex360" | "yc" | "zilore" | "zone" | "zoneedit" | "zonomi";
                    "data"?: string;
                    "disable"?: boolean;
                    "id": string;
                    "nodes"?: string;
                    "type": "dns" | "standalone";
                    "validation-delay"?: number
                },
            }
            return: unknown
        }
    },
    "/cluster/acme/plugins/{id}": {
        "DELETE": {
            parameters: {
                $path: { "id": string },
            }
            return: unknown
        },
        "GET": {
            parameters: {
                $path: { "id": string },
            }
            return: {
                "api"?: "1984hosting" | "acmedns" | "acmeproxy" | "active24" | "ad" | "ali" | "alviy" | "anx" | "artfiles" | "arvan" | "aurora" | "autodns" | "aws" | "azion" | "azure" | "beget" | "bookmyname" | "bunny" | "cf" | "clouddns" | "cloudns" | "cn" | "conoha" | "constellix" | "cpanel" | "curanet" | "cyon" | "da" | "ddnss" | "desec" | "df" | "dgon" | "dnsexit" | "dnshome" | "dnsimple" | "dnsservices" | "doapi" | "domeneshop" | "dp" | "dpi" | "dreamhost" | "duckdns" | "durabledns" | "dyn" | "dynu" | "dynv6" | "easydns" | "edgecenter" | "edgedns" | "euserv" | "exoscale" | "fornex" | "freedns" | "freemyip" | "gandi_livedns" | "gcloud" | "gcore" | "gd" | "geoscaling" | "googledomains" | "he" | "he_ddns" | "hetzner" | "hexonet" | "hostingde" | "huaweicloud" | "infoblox" | "infomaniak" | "internetbs" | "inwx" | "ionos" | "ionos_cloud" | "ipv64" | "ispconfig" | "jd" | "joker" | "kappernet" | "kas" | "kinghost" | "knot" | "la" | "leaseweb" | "lexicon" | "limacity" | "linode" | "linode_v4" | "loopia" | "lua" | "maradns" | "me" | "miab" | "mijnhost" | "misaka" | "myapi" | "mydevil" | "mydnsjp" | "mythic_beasts" | "namecheap" | "namecom" | "namesilo" | "nanelo" | "nederhost" | "neodigit" | "netcup" | "netlify" | "nic" | "njalla" | "nm" | "nsd" | "nsone" | "nsupdate" | "nw" | "oci" | "omglol" | "one" | "online" | "openprovider" | "openstack" | "opnsense" | "ovh" | "pdns" | "pleskxml" | "pointhq" | "porkbun" | "rackcorp" | "rackspace" | "rage4" | "rcode0" | "regru" | "scaleway" | "schlundtech" | "selectel" | "selfhost" | "servercow" | "simply" | "technitium" | "tele3" | "tencent" | "timeweb" | "transip" | "udr" | "ultra" | "unoeuro" | "variomedia" | "veesp" | "vercel" | "vscale" | "vultr" | "websupport" | "west_cn" | "world4you" | "yandex360" | "yc" | "zilore" | "zone" | "zoneedit" | "zonomi";
                "data"?: string;
                "digest"?: string;
                "disable"?: boolean;
                "nodes"?: string;
                "plugin": string;
                "type": "dns" | "standalone";
                "validation-delay"?: number
            }
        },
        "PUT": {
            parameters: {
                $path: { "id": string },
                $body: {
                    "api"?: "1984hosting" | "acmedns" | "acmeproxy" | "active24" | "ad" | "ali" | "alviy" | "anx" | "artfiles" | "arvan" | "aurora" | "autodns" | "aws" | "azion" | "azure" | "beget" | "bookmyname" | "bunny" | "cf" | "clouddns" | "cloudns" | "cn" | "conoha" | "constellix" | "cpanel" | "curanet" | "cyon" | "da" | "ddnss" | "desec" | "df" | "dgon" | "dnsexit" | "dnshome" | "dnsimple" | "dnsservices" | "doapi" | "domeneshop" | "dp" | "dpi" | "dreamhost" | "duckdns" | "durabledns" | "dyn" | "dynu" | "dynv6" | "easydns" | "edgecenter" | "edgedns" | "euserv" | "exoscale" | "fornex" | "freedns" | "freemyip" | "gandi_livedns" | "gcloud" | "gcore" | "gd" | "geoscaling" | "googledomains" | "he" | "he_ddns" | "hetzner" | "hexonet" | "hostingde" | "huaweicloud" | "infoblox" | "infomaniak" | "internetbs" | "inwx" | "ionos" | "ionos_cloud" | "ipv64" | "ispconfig" | "jd" | "joker" | "kappernet" | "kas" | "kinghost" | "knot" | "la" | "leaseweb" | "lexicon" | "limacity" | "linode" | "linode_v4" | "loopia" | "lua" | "maradns" | "me" | "miab" | "mijnhost" | "misaka" | "myapi" | "mydevil" | "mydnsjp" | "mythic_beasts" | "namecheap" | "namecom" | "namesilo" | "nanelo" | "nederhost" | "neodigit" | "netcup" | "netlify" | "nic" | "njalla" | "nm" | "nsd" | "nsone" | "nsupdate" | "nw" | "oci" | "omglol" | "one" | "online" | "openprovider" | "openstack" | "opnsense" | "ovh" | "pdns" | "pleskxml" | "pointhq" | "porkbun" | "rackcorp" | "rackspace" | "rage4" | "rcode0" | "regru" | "scaleway" | "schlundtech" | "selectel" | "selfhost" | "servercow" | "simply" | "technitium" | "tele3" | "tencent" | "timeweb" | "transip" | "udr" | "ultra" | "unoeuro" | "variomedia" | "veesp" | "vercel" | "vscale" | "vultr" | "websupport" | "west_cn" | "world4you" | "yandex360" | "yc" | "zilore" | "zone" | "zoneedit" | "zonomi";
                    "data"?: string;
                    "delete"?: string;
                    "digest"?: string;
                    "disable"?: boolean;
                    "nodes"?: string;
                    "validation-delay"?: number
                },
            }
            return: unknown
        }
    },
    "/cluster/acme/tos": {
        "GET": {
            parameters: {
                $query?: { "directory"?: string },
            }
            return: string
        }
    },
    "/cluster/backup": {
        "GET": {
            parameters: {}
            return: { "id": string }[]
        },
        "POST": {
            parameters: {
                $body: {
                    "all"?: boolean;
                    "bwlimit"?: number;
                    "comment"?: string;
                    "compress"?: "0" | "1" | "gzip" | "lzo" | "zstd";
                    "dow"?: string;
                    "dumpdir"?: string;
                    "enabled"?: boolean;
                    "exclude"?: string;
                    "exclude-path"?: string[];
                    "fleecing"?: string;
                    "id"?: string;
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
                    "repeat-missed"?: boolean;
                    "schedule"?: string;
                    "script"?: string;
                    "starttime"?: string;
                    "stdexcludes"?: boolean;
                    "stop"?: boolean;
                    "stopwait"?: number;
                    "storage"?: string;
                    "tmpdir"?: string;
                    "vmid"?: string;
                    "zstd"?: number
                },
            }
            return: unknown
        }
    },
    "/cluster/backup-info": {
        "GET": {
            parameters: {}
            return: { "subdir": string }[]
        }
    },
    "/cluster/backup-info/not-backed-up": {
        "GET": {
            parameters: {}
            return: { "name"?: string; "type": "qemu" | "lxc"; "vmid": number }[]
        }
    },
    "/cluster/backup/{id}": {
        "DELETE": {
            parameters: {
                $path: { "id": string },
            }
            return: unknown
        },
        "GET": {
            parameters: {
                $path: { "id": string },
            }
            return: Record<string, unknown>
        },
        "PUT": {
            parameters: {
                $path: { "id": string },
                $body: {
                    "all"?: boolean;
                    "bwlimit"?: number;
                    "comment"?: string;
                    "compress"?: "0" | "1" | "gzip" | "lzo" | "zstd";
                    "delete"?: string;
                    "dow"?: string;
                    "dumpdir"?: string;
                    "enabled"?: boolean;
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
                    "repeat-missed"?: boolean;
                    "schedule"?: string;
                    "script"?: string;
                    "starttime"?: string;
                    "stdexcludes"?: boolean;
                    "stop"?: boolean;
                    "stopwait"?: number;
                    "storage"?: string;
                    "tmpdir"?: string;
                    "vmid"?: string;
                    "zstd"?: number
                },
            }
            return: unknown
        }
    },
    "/cluster/backup/{id}/included_volumes": {
        "GET": {
            parameters: {
                $path: { "id": string },
            }
            return: {
                "children": {
                    "children"?: { "id": string; "included": boolean; "name": string; "reason": string }[];
                    "id": number;
                    "name"?: string;
                    "type": "qemu" | "lxc" | "unknown"
                }[]
            }
        }
    },
    "/cluster/bulk-action": {
        "GET": {
            parameters: {}
            return: Record<string, unknown>[]
        }
    },
    "/cluster/bulk-action/guest": {
        "GET": {
            parameters: {}
            return: Record<string, unknown>[]
        }
    },
    "/cluster/bulk-action/guest/migrate": {
        "POST": {
            parameters: {
                $body: {
                    "maxworkers"?: number;
                    "online"?: boolean;
                    "target": string;
                    "vms"?: number[];
                    "with-local-disks"?: boolean
                },
            }
            return: string
        }
    },
    "/cluster/bulk-action/guest/shutdown": {
        "POST": {
            parameters: {
                $body: { "force-stop"?: boolean; "maxworkers"?: number; "timeout"?: number; "vms"?: number[] },
            }
            return: string
        }
    },
    "/cluster/bulk-action/guest/start": {
        "POST": {
            parameters: {
                $body: { "maxworkers"?: number; "timeout"?: number; "vms"?: number[] },
            }
            return: string
        }
    },
    "/cluster/bulk-action/guest/suspend": {
        "POST": {
            parameters: {
                $body: { "maxworkers"?: number; "statestorage"?: string; "to-disk"?: boolean; "vms"?: number[] },
            }
            return: string
        }
    },
    "/cluster/ceph": {
        "GET": {
            parameters: {}
            return: Record<string, unknown>[]
        }
    },
    "/cluster/ceph/flags": {
        "GET": {
            parameters: {}
            return: {
                "description": string;
                "name": "nobackfill" | "nodeep-scrub" | "nodown" | "noin" | "noout" | "norebalance" | "norecover" | "noscrub" | "notieragent" | "noup" | "pause";
                "value": boolean
            }[]
        },
        "PUT": {
            parameters: {
                $body: {
                    "nobackfill"?: boolean;
                    "nodeep-scrub"?: boolean;
                    "nodown"?: boolean;
                    "noin"?: boolean;
                    "noout"?: boolean;
                    "norebalance"?: boolean;
                    "norecover"?: boolean;
                    "noscrub"?: boolean;
                    "notieragent"?: boolean;
                    "noup"?: boolean;
                    "pause"?: boolean
                },
            }
            return: string
        }
    },
    "/cluster/ceph/flags/{flag}": {
        "GET": {
            parameters: {
                $path: {
                    "flag": "nobackfill" | "nodeep-scrub" | "nodown" | "noin" | "noout" | "norebalance" | "norecover" | "noscrub" | "notieragent" | "noup" | "pause"
                },
            }
            return: boolean
        },
        "PUT": {
            parameters: {
                $path: {
                    "flag": "nobackfill" | "nodeep-scrub" | "nodown" | "noin" | "noout" | "norebalance" | "norecover" | "noscrub" | "notieragent" | "noup" | "pause"
                },
                $body: { "value": boolean },
            }
            return: unknown
        }
    },
    "/cluster/ceph/metadata": {
        "GET": {
            parameters: {
                $query?: { "scope"?: "all" | "versions" },
            }
            return: {
                "mds": {
                    "{id}": {
                        "addr": string;
                        "ceph_release": string;
                        "ceph_version": string;
                        "ceph_version_short": string;
                        "hostname": string;
                        "mem_swap_kb": number;
                        "mem_total_kb": number;
                        "name": string
                    }
                };
                "mgr": {
                    "{id}": {
                        "addr": string;
                        "ceph_release": string;
                        "ceph_version": string;
                        "ceph_version_short": string;
                        "hostname": string;
                        "mem_swap_kb": number;
                        "mem_total_kb": number;
                        "name": string
                    }
                };
                "mon": {
                    "{id}": {
                        "addrs": string;
                        "ceph_release": string;
                        "ceph_version": string;
                        "ceph_version_short": string;
                        "hostname": string;
                        "mem_swap_kb": number;
                        "mem_total_kb": number;
                        "name": string
                    }
                };
                "node": { "{node}": { "buildcommit": string; "version": { "parts": unknown[]; "str": string } } };
                "osd": unknown[]
            }
        }
    },
    "/cluster/ceph/status": {
        "GET": {
            parameters: {}
            return: Record<string, unknown>
        }
    },
    "/cluster/config": {
        "GET": {
            parameters: {}
            return: Record<string, unknown>[]
        },
        "POST": {
            parameters: {
                $body: { "clustername": string; "link[n]"?: string; "nodeid"?: number; "votes"?: number },
            }
            return: string
        }
    },
    "/cluster/config/apiversion": {
        "GET": {
            parameters: {}
            return: number
        }
    },
    "/cluster/config/join": {
        "GET": {
            parameters: {
                $query?: { "node"?: string },
            }
            return: {
                "config_digest": string;
                "nodelist": {
                    "name": string;
                    "nodeid"?: number;
                    "pve_addr": string;
                    "pve_fp": string;
                    "quorum_votes": number;
                    "ring0_addr"?: string
                }[];
                "preferred_node": string;
                "totem": Record<string, unknown>
            }
        },
        "POST": {
            parameters: {
                $body: {
                    "fingerprint": string;
                    "force"?: boolean;
                    "hostname": string;
                    "link[n]"?: string;
                    "nodeid"?: number;
                    "password": string;
                    "votes"?: number
                },
            }
            return: string
        }
    },
    "/cluster/config/nodes": {
        "GET": {
            parameters: {}
            return: { "node": string }[]
        }
    },
    "/cluster/config/nodes/{node}": {
        "GET": {
            parameters: {
                $path: { "node": string },
            }
            return: Record<string, unknown>
        },
        "DELETE": {
            parameters: {
                $path: { "node": string },
            }
            return: unknown
        },
        "POST": {
            parameters: {
                $path: { "node": string },
                $body: {
                    "apiversion"?: number;
                    "force"?: boolean;
                    "link[n]"?: string;
                    "new_node_ip"?: string;
                    "nodeid"?: number;
                    "votes"?: number
                },
            }
            return: { "corosync_authkey": string; "corosync_conf": string; "warnings": string[] }
        }
    },
    "/cluster/config/qdevice": {
        "GET": {
            parameters: {}
            return: Record<string, unknown>
        }
    },
    "/cluster/config/totem": {
        "GET": {
            parameters: {}
            return: Record<string, unknown>
        }
    },
    "/cluster/firewall": {
        "GET": {
            parameters: {}
            return: Record<string, unknown>[]
        }
    },
    "/cluster/firewall/aliases": {
        "GET": {
            parameters: {}
            return: { "cidr": string; "comment"?: string; "digest": string; "name": string }[]
        },
        "POST": {
            parameters: {
                $body: { "cidr": string; "comment"?: string; "name": string },
            }
            return: unknown
        }
    },
    "/cluster/firewall/aliases/{name}": {
        "DELETE": {
            parameters: {
                $path: { "name": string },
                $query?: { "digest"?: string },
            }
            return: unknown
        },
        "GET": {
            parameters: {
                $path: { "name": string },
            }
            return: Record<string, unknown>
        },
        "PUT": {
            parameters: {
                $path: { "name": string },
                $body: { "cidr": string; "comment"?: string; "digest"?: string; "rename"?: string },
            }
            return: unknown
        }
    },
    "/cluster/firewall/groups": {
        "GET": {
            parameters: {}
            return: { "comment"?: string; "digest": string; "group": string }[]
        },
        "POST": {
            parameters: {
                $body: { "comment"?: string; "digest"?: string; "group": string; "rename"?: string },
            }
            return: unknown
        }
    },
    "/cluster/firewall/groups/{group}": {
        "DELETE": {
            parameters: {
                $path: { "group": string },
            }
            return: unknown
        },
        "GET": {
            parameters: {
                $path: { "group": string },
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
                $path: { "group": string },
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
    "/cluster/firewall/groups/{group}/{pos}": {
        "DELETE": {
            parameters: {
                $path: { "group": string; "pos": number },
                $query?: { "digest"?: string },
            }
            return: unknown
        },
        "GET": {
            parameters: {
                $path: { "group": string; "pos": number },
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
                $path: { "group": string; "pos": number },
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
    "/cluster/firewall/ipset": {
        "GET": {
            parameters: {}
            return: { "comment"?: string; "digest": string; "name": string }[]
        },
        "POST": {
            parameters: {
                $body: { "comment"?: string; "digest"?: string; "name": string; "rename"?: string },
            }
            return: unknown
        }
    },
    "/cluster/firewall/ipset/{name}": {
        "DELETE": {
            parameters: {
                $path: { "name": string },
                $query?: { "force"?: boolean },
            }
            return: unknown
        },
        "GET": {
            parameters: {
                $path: { "name": string },
            }
            return: { "cidr": string; "comment"?: string; "digest": string; "nomatch"?: boolean }[]
        },
        "POST": {
            parameters: {
                $path: { "name": string },
                $body: { "cidr": string; "comment"?: string; "nomatch"?: boolean },
            }
            return: unknown
        }
    },
    "/cluster/firewall/ipset/{name}/{cidr}": {
        "DELETE": {
            parameters: {
                $path: { "name": string; "cidr": string },
                $query?: { "digest"?: string },
            }
            return: unknown
        },
        "GET": {
            parameters: {
                $path: { "name": string; "cidr": string },
            }
            return: Record<string, unknown>
        },
        "PUT": {
            parameters: {
                $path: { "name": string; "cidr": string },
                $body: { "comment"?: string; "digest"?: string; "nomatch"?: boolean },
            }
            return: unknown
        }
    },
    "/cluster/firewall/macros": {
        "GET": {
            parameters: {}
            return: { "descr": string; "macro": string }[]
        }
    },
    "/cluster/firewall/options": {
        "GET": {
            parameters: {}
            return: {
                "ebtables"?: boolean;
                "enable"?: number;
                "log_ratelimit"?: string;
                "policy_forward"?: "ACCEPT" | "DROP";
                "policy_in"?: "ACCEPT" | "REJECT" | "DROP";
                "policy_out"?: "ACCEPT" | "REJECT" | "DROP"
            }
        },
        "PUT": {
            parameters: {
                $body: {
                    "delete"?: string;
                    "digest"?: string;
                    "ebtables"?: boolean;
                    "enable"?: number;
                    "log_ratelimit"?: string;
                    "policy_forward"?: "ACCEPT" | "DROP";
                    "policy_in"?: "ACCEPT" | "REJECT" | "DROP";
                    "policy_out"?: "ACCEPT" | "REJECT" | "DROP"
                },
            }
            return: unknown
        }
    },
    "/cluster/firewall/refs": {
        "GET": {
            parameters: {
                $query?: { "type"?: "alias" | "ipset" },
            }
            return: { "comment"?: string; "name": string; "ref": string; "scope": string; "type": "alias" | "ipset" }[]
        }
    },
    "/cluster/firewall/rules": {
        "GET": {
            parameters: {}
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
    "/cluster/firewall/rules/{pos}": {
        "DELETE": {
            parameters: {
                $path: { "pos": number },
                $query?: { "digest"?: string },
            }
            return: unknown
        },
        "GET": {
            parameters: {
                $path: { "pos": number },
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
                $path: { "pos": number },
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
    "/cluster/ha": {
        "GET": {
            parameters: {}
            return: { "id": string }[]
        }
    },
    "/cluster/ha/groups": {
        "GET": {
            parameters: {}
            return: { "group": string }[]
        },
        "POST": {
            parameters: {
                $body: {
                    "comment"?: string;
                    "group": string;
                    "nodes": string;
                    "nofailback"?: boolean;
                    "restricted"?: boolean;
                    "type"?: "group"
                },
            }
            return: unknown
        }
    },
    "/cluster/ha/groups/{group}": {
        "DELETE": {
            parameters: {
                $path: { "group": string },
            }
            return: unknown
        },
        "GET": {
            parameters: {
                $path: { "group": string },
            }
            return: unknown
        },
        "PUT": {
            parameters: {
                $path: { "group": string },
                $body: {
                    "comment"?: string;
                    "delete"?: string;
                    "digest"?: string;
                    "nodes"?: string;
                    "nofailback"?: boolean;
                    "restricted"?: boolean
                },
            }
            return: unknown
        }
    },
    "/cluster/ha/resources": {
        "GET": {
            parameters: {
                $query?: { "type"?: "ct" | "vm" },
            }
            return: { "sid": string }[]
        },
        "POST": {
            parameters: {
                $body: {
                    "comment"?: string;
                    "failback"?: boolean;
                    "group"?: string;
                    "max_relocate"?: number;
                    "max_restart"?: number;
                    "sid": string;
                    "state"?: "started" | "stopped" | "enabled" | "disabled" | "ignored";
                    "type"?: "ct" | "vm"
                },
            }
            return: unknown
        }
    },
    "/cluster/ha/resources/{sid}": {
        "DELETE": {
            parameters: {
                $path: { "sid": string },
                $query?: { "purge"?: boolean },
            }
            return: unknown
        },
        "GET": {
            parameters: {
                $path: { "sid": string },
            }
            return: {
                "comment"?: string;
                "digest": string;
                "failback"?: boolean;
                "group"?: string;
                "max_relocate"?: number;
                "max_restart"?: number;
                "sid": string;
                "state"?: "started" | "stopped" | "enabled" | "disabled" | "ignored";
                "type": string
            }
        },
        "PUT": {
            parameters: {
                $path: { "sid": string },
                $body: {
                    "comment"?: string;
                    "delete"?: string;
                    "digest"?: string;
                    "failback"?: boolean;
                    "group"?: string;
                    "max_relocate"?: number;
                    "max_restart"?: number;
                    "state"?: "started" | "stopped" | "enabled" | "disabled" | "ignored"
                },
            }
            return: unknown
        }
    },
    "/cluster/ha/resources/{sid}/migrate": {
        "POST": {
            parameters: {
                $path: { "sid": string },
                $body: { "node": string },
            }
            return: {
                "blocking-resources"?: { "cause": "resource-affinity"; "sid": string }[];
                "comigrated-resources"?: unknown[];
                "requested-node": string;
                "sid": string
            }
        }
    },
    "/cluster/ha/resources/{sid}/relocate": {
        "POST": {
            parameters: {
                $path: { "sid": string },
                $body: { "node": string },
            }
            return: {
                "blocking-resources"?: { "cause": "resource-affinity"; "sid": string }[];
                "comigrated-resources"?: string[];
                "requested-node": string;
                "sid": string
            }
        }
    },
    "/cluster/ha/rules": {
        "GET": {
            parameters: {
                $query?: { "resource"?: string; "type"?: "node-affinity" | "resource-affinity" },
            }
            return: { "rule": string }[]
        },
        "POST": {
            parameters: {
                $body: {
                    "affinity"?: "positive" | "negative";
                    "comment"?: string;
                    "disable"?: boolean;
                    "nodes"?: string;
                    "resources": string;
                    "rule": string;
                    "strict"?: boolean;
                    "type": "node-affinity" | "resource-affinity"
                },
            }
            return: unknown
        }
    },
    "/cluster/ha/rules/{rule}": {
        "DELETE": {
            parameters: {
                $path: { "rule": string },
            }
            return: unknown
        },
        "GET": {
            parameters: {
                $path: { "rule": string },
            }
            return: { "rule": string; "type": "node-affinity" | "resource-affinity" }
        },
        "PUT": {
            parameters: {
                $path: { "rule": string },
                $body: {
                    "affinity"?: "positive" | "negative";
                    "comment"?: string;
                    "delete"?: string;
                    "digest"?: string;
                    "disable"?: boolean;
                    "nodes"?: string;
                    "resources"?: string;
                    "strict"?: boolean;
                    "type": "node-affinity" | "resource-affinity"
                },
            }
            return: unknown
        }
    },
    "/cluster/ha/status": {
        "GET": {
            parameters: {}
            return: Record<string, unknown>[]
        }
    },
    "/cluster/ha/status/current": {
        "GET": {
            parameters: {}
            return: {
                "crm_state"?: string;
                "failback"?: boolean;
                "id": string;
                "max_relocate"?: number;
                "max_restart"?: number;
                "node": string;
                "quorate"?: boolean;
                "request_state"?: string;
                "sid"?: string;
                "state"?: string;
                "status": string;
                "timestamp"?: number;
                "type": "quorum" | "master" | "lrm" | "service"
            }[]
        }
    },
    "/cluster/ha/status/manager_status": {
        "GET": {
            parameters: {}
            return: Record<string, unknown>
        }
    },
    "/cluster/jobs": {
        "GET": {
            parameters: {}
            return: { "subdir": string }[]
        }
    },
    "/cluster/jobs/realm-sync": {
        "GET": {
            parameters: {}
            return: {
                "comment"?: string;
                "enabled": boolean;
                "id": string;
                "last-run"?: number;
                "next-run"?: number;
                "realm": string;
                "remove-vanished"?: string;
                "schedule": string;
                "scope"?: "users" | "groups" | "both"
            }[]
        }
    },
    "/cluster/jobs/realm-sync/{id}": {
        "DELETE": {
            parameters: {
                $path: { "id": string },
            }
            return: unknown
        },
        "GET": {
            parameters: {
                $path: { "id": string },
            }
            return: Record<string, unknown>
        },
        "POST": {
            parameters: {
                $path: { "id": string },
                $body: {
                    "comment"?: string;
                    "enable-new"?: boolean;
                    "enabled"?: boolean;
                    "realm"?: string;
                    "remove-vanished"?: string;
                    "schedule": string;
                    "scope"?: "users" | "groups" | "both"
                },
            }
            return: unknown
        },
        "PUT": {
            parameters: {
                $path: { "id": string },
                $body: {
                    "comment"?: string;
                    "delete"?: string;
                    "enable-new"?: boolean;
                    "enabled"?: boolean;
                    "remove-vanished"?: string;
                    "schedule": string;
                    "scope"?: "users" | "groups" | "both"
                },
            }
            return: unknown
        }
    },
    "/cluster/jobs/schedule-analyze": {
        "GET": {
            parameters: {
                $query?: { "iterations"?: number; "schedule": string; "starttime"?: number },
            }
            return: { "timestamp": number; "utc": string }[]
        }
    },
    "/cluster/log": {
        "GET": {
            parameters: {
                $query?: { "max"?: number },
            }
            return: Record<string, unknown>[]
        }
    },
    "/cluster/mapping": {
        "GET": {
            parameters: {}
            return: Record<string, unknown>[]
        }
    },
    "/cluster/mapping/dir": {
        "GET": {
            parameters: {
                $query?: { "check-node"?: string },
            }
            return: {
                "checks"?: { "message": string; "severity": "warning" | "error" }[];
                "description": string;
                "id": string;
                "map": string[]
            }[]
        },
        "POST": {
            parameters: {
                $body: { "description"?: string; "id": string; "map": string[] },
            }
            return: unknown
        }
    },
    "/cluster/mapping/dir/{id}": {
        "DELETE": {
            parameters: {
                $path: { "id": string },
            }
            return: unknown
        },
        "GET": {
            parameters: {
                $path: { "id": string },
            }
            return: Record<string, unknown>
        },
        "PUT": {
            parameters: {
                $path: { "id": string },
                $body: { "delete"?: string; "description"?: string; "digest"?: string; "map"?: string[] },
            }
            return: unknown
        }
    },
    "/cluster/mapping/pci": {
        "GET": {
            parameters: {
                $query?: { "check-node"?: string },
            }
            return: {
                "checks"?: { "message": string; "severity": "warning" | "error" }[];
                "description": string;
                "id": string;
                "map": string[]
            }[]
        },
        "POST": {
            parameters: {
                $body: {
                    "description"?: string;
                    "id": string;
                    "live-migration-capable"?: boolean;
                    "map": string[];
                    "mdev"?: boolean
                },
            }
            return: unknown
        }
    },
    "/cluster/mapping/pci/{id}": {
        "DELETE": {
            parameters: {
                $path: { "id": string },
            }
            return: unknown
        },
        "GET": {
            parameters: {
                $path: { "id": string },
            }
            return: Record<string, unknown>
        },
        "PUT": {
            parameters: {
                $path: { "id": string },
                $body: {
                    "delete"?: string;
                    "description"?: string;
                    "digest"?: string;
                    "live-migration-capable"?: boolean;
                    "map"?: string[];
                    "mdev"?: boolean
                },
            }
            return: unknown
        }
    },
    "/cluster/mapping/usb": {
        "GET": {
            parameters: {
                $query?: { "check-node"?: string },
            }
            return: { "description": string; "error": unknown; "id": string; "map": string[] }[]
        },
        "POST": {
            parameters: {
                $body: { "description"?: string; "id": string; "map": string[] },
            }
            return: unknown
        }
    },
    "/cluster/mapping/usb/{id}": {
        "DELETE": {
            parameters: {
                $path: { "id": string },
            }
            return: unknown
        },
        "GET": {
            parameters: {
                $path: { "id": string },
            }
            return: Record<string, unknown>
        },
        "PUT": {
            parameters: {
                $path: { "id": string },
                $body: { "delete"?: string; "description"?: string; "digest"?: string; "map": string[] },
            }
            return: unknown
        }
    },
    "/cluster/metrics": {
        "GET": {
            parameters: {}
            return: Record<string, unknown>[]
        }
    },
    "/cluster/metrics/export": {
        "GET": {
            parameters: {
                $query?: { "history"?: boolean; "local-only"?: boolean; "node-list"?: string; "start-time"?: number },
            }
            return: {
                "data": {
                    "id": string;
                    "metric": string;
                    "timestamp": number;
                    "type": "gauge" | "counter" | "derive";
                    "value": number
                }[]
            }
        }
    },
    "/cluster/metrics/server": {
        "GET": {
            parameters: {}
            return: { "disable": boolean; "id": string; "port": number; "server": string; "type": string }[]
        }
    },
    "/cluster/metrics/server/{id}": {
        "DELETE": {
            parameters: {
                $path: { "id": string },
            }
            return: unknown
        },
        "GET": {
            parameters: {
                $path: { "id": string },
            }
            return: Record<string, unknown>
        },
        "POST": {
            parameters: {
                $path: { "id": string },
                $body: {
                    "api-path-prefix"?: string;
                    "bucket"?: string;
                    "disable"?: boolean;
                    "influxdbproto"?: "udp" | "http" | "https";
                    "max-body-size"?: number;
                    "mtu"?: number;
                    "organization"?: string;
                    "otel-compression"?: "none" | "gzip";
                    "otel-headers"?: string;
                    "otel-max-body-size"?: number;
                    "otel-path"?: string;
                    "otel-protocol"?: "http" | "https";
                    "otel-resource-attributes"?: string;
                    "otel-timeout"?: number;
                    "otel-verify-ssl"?: boolean;
                    "path"?: string;
                    "port": number;
                    "proto"?: "udp" | "tcp";
                    "server": string;
                    "timeout"?: number;
                    "token"?: string;
                    "type": "graphite" | "influxdb" | "opentelemetry";
                    "verify-certificate"?: boolean
                },
            }
            return: unknown
        },
        "PUT": {
            parameters: {
                $path: { "id": string },
                $body: {
                    "api-path-prefix"?: string;
                    "bucket"?: string;
                    "delete"?: string;
                    "digest"?: string;
                    "disable"?: boolean;
                    "influxdbproto"?: "udp" | "http" | "https";
                    "max-body-size"?: number;
                    "mtu"?: number;
                    "organization"?: string;
                    "otel-compression"?: "none" | "gzip";
                    "otel-headers"?: string;
                    "otel-max-body-size"?: number;
                    "otel-path"?: string;
                    "otel-protocol"?: "http" | "https";
                    "otel-resource-attributes"?: string;
                    "otel-timeout"?: number;
                    "otel-verify-ssl"?: boolean;
                    "path"?: string;
                    "port": number;
                    "proto"?: "udp" | "tcp";
                    "server": string;
                    "timeout"?: number;
                    "token"?: string;
                    "verify-certificate"?: boolean
                },
            }
            return: unknown
        }
    },
    "/cluster/nextid": {
        "GET": {
            parameters: {
                $query?: { "vmid"?: number },
            }
            return: number
        }
    },
    "/cluster/notifications": {
        "GET": {
            parameters: {}
            return: Record<string, unknown>[]
        }
    },
    "/cluster/notifications/endpoints": {
        "GET": {
            parameters: {}
            return: Record<string, unknown>[]
        }
    },
    "/cluster/notifications/endpoints/gotify": {
        "GET": {
            parameters: {}
            return: {
                "comment"?: string;
                "disable"?: boolean;
                "name": string;
                "origin": "user-created" | "builtin" | "modified-builtin";
                "server": string
            }[]
        },
        "POST": {
            parameters: {
                $body: { "comment"?: string; "disable"?: boolean; "name": string; "server": string; "token": string },
            }
            return: unknown
        }
    },
    "/cluster/notifications/endpoints/gotify/{name}": {
        "DELETE": {
            parameters: {
                $path: { "name": string },
            }
            return: unknown
        },
        "GET": {
            parameters: {
                $path: { "name": string },
            }
            return: { "comment"?: string; "digest"?: string; "disable"?: boolean; "name": string; "server": string }
        },
        "PUT": {
            parameters: {
                $path: { "name": string },
                $body: {
                    "comment"?: string;
                    "delete"?: string[];
                    "digest"?: string;
                    "disable"?: boolean;
                    "server"?: string;
                    "token"?: string
                },
            }
            return: unknown
        }
    },
    "/cluster/notifications/endpoints/sendmail": {
        "GET": {
            parameters: {}
            return: {
                "author"?: string;
                "comment"?: string;
                "disable"?: boolean;
                "from-address"?: string;
                "mailto"?: string[];
                "mailto-user"?: string[];
                "name": string;
                "origin": "user-created" | "builtin" | "modified-builtin"
            }[]
        },
        "POST": {
            parameters: {
                $body: {
                    "author"?: string;
                    "comment"?: string;
                    "disable"?: boolean;
                    "from-address"?: string;
                    "mailto"?: string[];
                    "mailto-user"?: string[];
                    "name": string
                },
            }
            return: unknown
        }
    },
    "/cluster/notifications/endpoints/sendmail/{name}": {
        "DELETE": {
            parameters: {
                $path: { "name": string },
            }
            return: unknown
        },
        "GET": {
            parameters: {
                $path: { "name": string },
            }
            return: {
                "author"?: string;
                "comment"?: string;
                "digest"?: string;
                "disable"?: boolean;
                "from-address"?: string;
                "mailto"?: string[];
                "mailto-user"?: string[];
                "name": string
            }
        },
        "PUT": {
            parameters: {
                $path: { "name": string },
                $body: {
                    "author"?: string;
                    "comment"?: string;
                    "delete"?: string[];
                    "digest"?: string;
                    "disable"?: boolean;
                    "from-address"?: string;
                    "mailto"?: string[];
                    "mailto-user"?: string[]
                },
            }
            return: unknown
        }
    },
    "/cluster/notifications/endpoints/smtp": {
        "GET": {
            parameters: {}
            return: {
                "author"?: string;
                "comment"?: string;
                "disable"?: boolean;
                "from-address": string;
                "mailto"?: string[];
                "mailto-user"?: string[];
                "mode"?: "insecure" | "starttls" | "tls";
                "name": string;
                "origin": "user-created" | "builtin" | "modified-builtin";
                "port"?: number;
                "server": string;
                "username"?: string
            }[]
        },
        "POST": {
            parameters: {
                $body: {
                    "author"?: string;
                    "comment"?: string;
                    "disable"?: boolean;
                    "from-address": string;
                    "mailto"?: string[];
                    "mailto-user"?: string[];
                    "mode"?: "insecure" | "starttls" | "tls";
                    "name": string;
                    "password"?: string;
                    "port"?: number;
                    "server": string;
                    "username"?: string
                },
            }
            return: unknown
        }
    },
    "/cluster/notifications/endpoints/smtp/{name}": {
        "DELETE": {
            parameters: {
                $path: { "name": string },
            }
            return: unknown
        },
        "GET": {
            parameters: {
                $path: { "name": string },
            }
            return: {
                "author"?: string;
                "comment"?: string;
                "digest"?: string;
                "disable"?: boolean;
                "from-address": string;
                "mailto"?: string[];
                "mailto-user"?: string[];
                "mode"?: "insecure" | "starttls" | "tls";
                "name": string;
                "port"?: number;
                "server": string;
                "username"?: string
            }
        },
        "PUT": {
            parameters: {
                $path: { "name": string },
                $body: {
                    "author"?: string;
                    "comment"?: string;
                    "delete"?: string[];
                    "digest"?: string;
                    "disable"?: boolean;
                    "from-address"?: string;
                    "mailto"?: string[];
                    "mailto-user"?: string[];
                    "mode"?: "insecure" | "starttls" | "tls";
                    "password"?: string;
                    "port"?: number;
                    "server"?: string;
                    "username"?: string
                },
            }
            return: unknown
        }
    },
    "/cluster/notifications/endpoints/webhook": {
        "GET": {
            parameters: {}
            return: {
                "body"?: string;
                "comment"?: string;
                "disable"?: boolean;
                "header"?: string[];
                "method": "post" | "put" | "get";
                "name": string;
                "origin": "user-created" | "builtin" | "modified-builtin";
                "secret"?: string[];
                "url": string
            }[]
        },
        "POST": {
            parameters: {
                $body: {
                    "body"?: string;
                    "comment"?: string;
                    "disable"?: boolean;
                    "header"?: string[];
                    "method": "post" | "put" | "get";
                    "name": string;
                    "secret"?: string[];
                    "url": string
                },
            }
            return: unknown
        }
    },
    "/cluster/notifications/endpoints/webhook/{name}": {
        "DELETE": {
            parameters: {
                $path: { "name": string },
            }
            return: unknown
        },
        "GET": {
            parameters: {
                $path: { "name": string },
            }
            return: {
                "body"?: string;
                "comment"?: string;
                "digest"?: string;
                "disable"?: boolean;
                "header"?: string[];
                "method": "post" | "put" | "get";
                "name": string;
                "secret"?: string[];
                "url": string
            }
        },
        "PUT": {
            parameters: {
                $path: { "name": string },
                $body: {
                    "body"?: string;
                    "comment"?: string;
                    "delete"?: string[];
                    "digest"?: string;
                    "disable"?: boolean;
                    "header"?: string[];
                    "method"?: "post" | "put" | "get";
                    "secret"?: string[];
                    "url"?: string
                },
            }
            return: unknown
        }
    },
    "/cluster/notifications/matcher-field-values": {
        "GET": {
            parameters: {}
            return: { "comment"?: string; "field": string; "value": string }[]
        }
    },
    "/cluster/notifications/matcher-fields": {
        "GET": {
            parameters: {}
            return: { "name": string }[]
        }
    },
    "/cluster/notifications/matchers": {
        "GET": {
            parameters: {}
            return: {
                "comment"?: string;
                "disable"?: boolean;
                "invert-match"?: boolean;
                "match-calendar"?: string[];
                "match-field"?: string[];
                "match-severity"?: string[];
                "mode"?: "all" | "any";
                "name": string;
                "origin": "user-created" | "builtin" | "modified-builtin";
                "target"?: string[]
            }[]
        },
        "POST": {
            parameters: {
                $body: {
                    "comment"?: string;
                    "disable"?: boolean;
                    "invert-match"?: boolean;
                    "match-calendar"?: string[];
                    "match-field"?: string[];
                    "match-severity"?: string[];
                    "mode"?: "all" | "any";
                    "name": string;
                    "target"?: string[]
                },
            }
            return: unknown
        }
    },
    "/cluster/notifications/matchers/{name}": {
        "DELETE": {
            parameters: {
                $path: { "name": string },
            }
            return: unknown
        },
        "GET": {
            parameters: {
                $path: { "name": string },
            }
            return: {
                "comment"?: string;
                "digest"?: string;
                "disable"?: boolean;
                "invert-match"?: boolean;
                "match-calendar"?: string[];
                "match-field"?: string[];
                "match-severity"?: string[];
                "mode"?: "all" | "any";
                "name": string;
                "target"?: string[]
            }
        },
        "PUT": {
            parameters: {
                $path: { "name": string },
                $body: {
                    "comment"?: string;
                    "delete"?: string[];
                    "digest"?: string;
                    "disable"?: boolean;
                    "invert-match"?: boolean;
                    "match-calendar"?: string[];
                    "match-field"?: string[];
                    "match-severity"?: string[];
                    "mode"?: "all" | "any";
                    "target"?: string[]
                },
            }
            return: unknown
        }
    },
    "/cluster/notifications/targets": {
        "GET": {
            parameters: {}
            return: {
                "comment"?: string;
                "disable"?: boolean;
                "name": string;
                "origin": "user-created" | "builtin" | "modified-builtin";
                "type": "sendmail" | "gotify" | "smtp" | "webhook"
            }[]
        }
    },
    "/cluster/notifications/targets/{name}/test": {
        "POST": {
            parameters: {
                $path: { "name": string },
            }
            return: unknown
        }
    },
    "/cluster/options": {
        "GET": {
            parameters: {}
            return: Record<string, unknown>
        },
        "PUT": {
            parameters: {
                $body: {
                    "bwlimit"?: string;
                    "consent-text"?: string;
                    "console"?: "applet" | "vv" | "html5" | "xtermjs";
                    "crs"?: string;
                    "delete"?: string;
                    "description"?: string;
                    "email_from"?: string;
                    "fencing"?: "watchdog" | "hardware" | "both";
                    "ha"?: string;
                    "http_proxy"?: string;
                    "keyboard"?: "de" | "de-ch" | "da" | "en-gb" | "en-us" | "es" | "fi" | "fr" | "fr-be" | "fr-ca" | "fr-ch" | "hu" | "is" | "it" | "ja" | "lt" | "mk" | "nl" | "no" | "pl" | "pt" | "pt-br" | "sv" | "sl" | "tr";
                    "language"?: "ar" | "ca" | "da" | "de" | "en" | "es" | "eu" | "fa" | "fr" | "hr" | "he" | "it" | "ja" | "ka" | "kr" | "nb" | "nl" | "nn" | "pl" | "pt_BR" | "ru" | "sl" | "sv" | "tr" | "ukr" | "zh_CN" | "zh_TW";
                    "mac_prefix"?: string;
                    "max_workers"?: number;
                    "migration"?: string;
                    "migration_unsecure"?: boolean;
                    "next-id"?: string;
                    "notify"?: string;
                    "registered-tags"?: string;
                    "replication"?: string;
                    "tag-style"?: string;
                    "u2f"?: string;
                    "user-tag-access"?: string;
                    "webauthn"?: string
                },
            }
            return: unknown
        }
    },
    "/cluster/replication": {
        "GET": {
            parameters: {}
            return: {
                "comment"?: string;
                "disable"?: boolean;
                "guest": number;
                "id": string;
                "jobnum": number;
                "rate"?: number;
                "remove_job"?: "local" | "full";
                "schedule"?: string;
                "source"?: string;
                "target": string;
                "type": "local"
            }[]
        },
        "POST": {
            parameters: {
                $body: {
                    "comment"?: string;
                    "disable"?: boolean;
                    "id": string;
                    "rate"?: number;
                    "remove_job"?: "local" | "full";
                    "schedule"?: string;
                    "source"?: string;
                    "target": string;
                    "type": "local"
                },
            }
            return: unknown
        }
    },
    "/cluster/replication/{id}": {
        "DELETE": {
            parameters: {
                $path: { "id": string },
                $query?: { "force"?: boolean; "keep"?: boolean },
            }
            return: unknown
        },
        "GET": {
            parameters: {
                $path: { "id": string },
            }
            return: {
                "comment"?: string;
                "digest"?: string;
                "disable"?: boolean;
                "guest": number;
                "id": string;
                "jobnum": number;
                "rate"?: number;
                "remove_job"?: "local" | "full";
                "schedule"?: string;
                "source"?: string;
                "target": string;
                "type": "local"
            }
        },
        "PUT": {
            parameters: {
                $path: { "id": string },
                $body: {
                    "comment"?: string;
                    "delete"?: string;
                    "digest"?: string;
                    "disable"?: boolean;
                    "rate"?: number;
                    "remove_job"?: "local" | "full";
                    "schedule"?: string;
                    "source"?: string
                },
            }
            return: unknown
        }
    },
    "/cluster/resources": {
        "GET": {
            parameters: {
                $query?: { "type"?: "vm" | "storage" | "node" | "sdn" },
            }
            return: {
                "cgroup-mode"?: number;
                "content"?: string;
                "cpu"?: number;
                "disk"?: number;
                "diskread"?: number;
                "diskwrite"?: number;
                "hastate"?: string;
                "id": string;
                "level"?: string;
                "lock"?: string;
                "maxcpu"?: number;
                "maxdisk"?: number;
                "maxmem"?: number;
                "mem"?: number;
                "memhost"?: number;
                "name"?: string;
                "netin"?: number;
                "netout"?: number;
                "network"?: string;
                "network-type"?: "fabric" | "zone";
                "node"?: string;
                "plugintype"?: string;
                "pool"?: string;
                "protocol"?: string;
                "sdn"?: string;
                "status"?: string;
                "storage"?: string;
                "tags"?: string;
                "template"?: boolean;
                "type": "node" | "storage" | "pool" | "qemu" | "lxc" | "openvz" | "sdn" | "network";
                "uptime"?: number;
                "vmid"?: number;
                "zone-type"?: string
            }[]
        }
    },
    "/cluster/sdn": {
        "GET": {
            parameters: {}
            return: { "id": string }[]
        },
        "PUT": {
            parameters: {
                $body: { "lock-token"?: string; "release-lock"?: boolean },
            }
            return: string
        }
    },
    "/cluster/sdn/controllers": {
        "GET": {
            parameters: {
                $query?: { "pending"?: boolean; "running"?: boolean; "type"?: "bgp" | "evpn" | "faucet" | "isis" },
            }
            return: {
                "asn"?: number;
                "bgp-multipath-as-relax"?: boolean;
                "controller": string;
                "digest"?: string;
                "ebgp"?: boolean;
                "ebgp-multihop"?: number;
                "isis-domain"?: string;
                "isis-ifaces"?: string;
                "isis-net"?: string;
                "loopback"?: string;
                "node"?: string;
                "peers"?: string;
                "pending"?: {
                    "asn"?: number;
                    "bgp-multipath-as-relax"?: boolean;
                    "ebgp"?: boolean;
                    "ebgp-multihop"?: number;
                    "isis-domain"?: string;
                    "isis-ifaces"?: string;
                    "isis-net"?: string;
                    "loopback"?: string;
                    "node"?: string;
                    "peers"?: string
                };
                "state"?: "new" | "changed" | "deleted";
                "type": "bgp" | "evpn" | "faucet" | "isis"
            }[]
        },
        "POST": {
            parameters: {
                $body: {
                    "asn"?: number;
                    "bgp-multipath-as-path-relax"?: boolean;
                    "controller": string;
                    "ebgp"?: boolean;
                    "ebgp-multihop"?: number;
                    "fabric"?: string;
                    "isis-domain"?: string;
                    "isis-ifaces"?: string;
                    "isis-net"?: string;
                    "lock-token"?: string;
                    "loopback"?: string;
                    "node"?: string;
                    "peers"?: string;
                    "type": "bgp" | "evpn" | "faucet" | "isis"
                },
            }
            return: unknown
        }
    },
    "/cluster/sdn/controllers/{controller}": {
        "DELETE": {
            parameters: {
                $path: { "controller": string },
                $query?: { "lock-token"?: string },
            }
            return: unknown
        },
        "GET": {
            parameters: {
                $path: { "controller": string },
                $query?: { "pending"?: boolean; "running"?: boolean },
            }
            return: {
                "asn"?: number;
                "bgp-multipath-as-relax"?: boolean;
                "controller": string;
                "digest"?: string;
                "ebgp"?: boolean;
                "ebgp-multihop"?: number;
                "isis-domain"?: string;
                "isis-ifaces"?: string;
                "isis-net"?: string;
                "loopback"?: string;
                "node"?: string;
                "peers"?: string;
                "pending"?: {
                    "asn"?: number;
                    "bgp-multipath-as-relax"?: boolean;
                    "ebgp"?: boolean;
                    "ebgp-multihop"?: number;
                    "isis-domain"?: string;
                    "isis-ifaces"?: string;
                    "isis-net"?: string;
                    "loopback"?: string;
                    "node"?: string;
                    "peers"?: string
                };
                "state"?: "new" | "changed" | "deleted";
                "type": "bgp" | "evpn" | "faucet" | "isis"
            }
        },
        "PUT": {
            parameters: {
                $path: { "controller": string },
                $body: {
                    "asn"?: number;
                    "bgp-multipath-as-path-relax"?: boolean;
                    "delete"?: string;
                    "digest"?: string;
                    "ebgp"?: boolean;
                    "ebgp-multihop"?: number;
                    "fabric"?: string;
                    "isis-domain"?: string;
                    "isis-ifaces"?: string;
                    "isis-net"?: string;
                    "lock-token"?: string;
                    "loopback"?: string;
                    "node"?: string;
                    "peers"?: string
                },
            }
            return: unknown
        }
    },
    "/cluster/sdn/dns": {
        "GET": {
            parameters: {
                $query?: { "type"?: "powerdns" },
            }
            return: { "dns": string; "type": string }[]
        },
        "POST": {
            parameters: {
                $body: {
                    "dns": string;
                    "fingerprint"?: string;
                    "key": string;
                    "lock-token"?: string;
                    "reversemaskv6"?: number;
                    "reversev6mask"?: number;
                    "ttl"?: number;
                    "type": "powerdns";
                    "url": string
                },
            }
            return: unknown
        }
    },
    "/cluster/sdn/dns/{dns}": {
        "DELETE": {
            parameters: {
                $path: { "dns": string },
                $query?: { "lock-token"?: string },
            }
            return: unknown
        },
        "GET": {
            parameters: {
                $path: { "dns": string },
            }
            return: Record<string, unknown>
        },
        "PUT": {
            parameters: {
                $path: { "dns": string },
                $body: {
                    "delete"?: string;
                    "digest"?: string;
                    "fingerprint"?: string;
                    "key"?: string;
                    "lock-token"?: string;
                    "reversemaskv6"?: number;
                    "ttl"?: number;
                    "url"?: string
                },
            }
            return: unknown
        }
    },
    "/cluster/sdn/fabrics": {
        "GET": {
            parameters: {}
            return: { "subdir": string }[]
        }
    },
    "/cluster/sdn/fabrics/all": {
        "GET": {
            parameters: {
                $query?: { "pending"?: boolean; "running"?: boolean },
            }
            return: {
                "fabrics": {
                    "area"?: string;
                    "csnp_interval"?: number;
                    "digest"?: string;
                    "hello_interval"?: number;
                    "id": string;
                    "ip6_prefix"?: string;
                    "ip_prefix"?: string;
                    "lock-token"?: string;
                    "protocol": "openfabric" | "ospf"
                }[];
                "nodes": {
                    "digest"?: string;
                    "fabric_id": string;
                    "interfaces": unknown[];
                    "ip"?: string;
                    "ip6"?: string;
                    "lock-token"?: string;
                    "node_id": string;
                    "protocol": "openfabric" | "ospf"
                }[]
            }
        }
    },
    "/cluster/sdn/fabrics/fabric": {
        "GET": {
            parameters: {
                $query?: { "pending"?: boolean; "running"?: boolean },
            }
            return: {
                "area"?: string;
                "csnp_interval"?: number;
                "digest"?: string;
                "hello_interval"?: number;
                "id": string;
                "ip6_prefix"?: string;
                "ip_prefix"?: string;
                "lock-token"?: string;
                "protocol": "openfabric" | "ospf"
            }[]
        },
        "POST": {
            parameters: {
                $body: {
                    "area"?: string;
                    "csnp_interval"?: number;
                    "digest"?: string;
                    "hello_interval"?: number;
                    "id": string;
                    "ip6_prefix"?: string;
                    "ip_prefix"?: string;
                    "lock-token"?: string;
                    "protocol": "openfabric" | "ospf"
                },
            }
            return: unknown
        }
    },
    "/cluster/sdn/fabrics/fabric/{id}": {
        "DELETE": {
            parameters: {
                $path: { "id": string },
            }
            return: unknown
        },
        "GET": {
            parameters: {
                $path: { "id": string },
            }
            return: {
                "area"?: string;
                "csnp_interval"?: number;
                "digest"?: string;
                "hello_interval"?: number;
                "id": string;
                "ip6_prefix"?: string;
                "ip_prefix"?: string;
                "lock-token"?: string;
                "protocol": "openfabric" | "ospf"
            }
        },
        "PUT": {
            parameters: {
                $path: { "id": string },
                $body: {
                    "area"?: string;
                    "csnp_interval"?: number;
                    "delete": unknown[];
                    "digest"?: string;
                    "hello_interval"?: number;
                    "ip6_prefix"?: string;
                    "ip_prefix"?: string;
                    "lock-token"?: string;
                    "protocol": "openfabric" | "ospf"
                },
            }
            return: unknown
        }
    },
    "/cluster/sdn/fabrics/node": {
        "GET": {
            parameters: {
                $query?: { "pending"?: boolean; "running"?: boolean },
            }
            return: {
                "digest"?: string;
                "fabric_id": string;
                "interfaces": unknown[];
                "ip"?: string;
                "ip6"?: string;
                "lock-token"?: string;
                "node_id": string;
                "protocol": "openfabric" | "ospf"
            }[]
        }
    },
    "/cluster/sdn/fabrics/node/{fabric_id}": {
        "GET": {
            parameters: {
                $path: { "fabric_id": string },
                $query?: { "pending"?: boolean; "running"?: boolean },
            }
            return: {
                "digest"?: string;
                "fabric_id": string;
                "interfaces": unknown[];
                "ip"?: string;
                "ip6"?: string;
                "lock-token"?: string;
                "node_id": string;
                "protocol": "openfabric" | "ospf"
            }[]
        },
        "POST": {
            parameters: {
                $path: { "fabric_id": string },
                $body: {
                    "digest"?: string;
                    "interfaces": unknown[];
                    "ip"?: string;
                    "ip6"?: string;
                    "lock-token"?: string;
                    "node_id": string;
                    "protocol": "openfabric" | "ospf"
                },
            }
            return: unknown
        }
    },
    "/cluster/sdn/fabrics/node/{fabric_id}/{node_id}": {
        "DELETE": {
            parameters: {
                $path: { "fabric_id": string; "node_id": string },
            }
            return: unknown
        },
        "GET": {
            parameters: {
                $path: { "fabric_id": string; "node_id": string },
            }
            return: {
                "digest"?: string;
                "fabric_id": string;
                "interfaces": unknown[];
                "ip"?: string;
                "ip6"?: string;
                "lock-token"?: string;
                "node_id": string;
                "protocol": "openfabric" | "ospf"
            }
        },
        "PUT": {
            parameters: {
                $path: { "fabric_id": string; "node_id": string },
                $body: {
                    "delete"?: "interfaces" | "ip" | "ip6"[];
                    "digest"?: string;
                    "interfaces": unknown[];
                    "ip"?: string;
                    "ip6"?: string;
                    "lock-token"?: string;
                    "protocol": "openfabric" | "ospf"
                },
            }
            return: unknown
        }
    },
    "/cluster/sdn/ipams": {
        "GET": {
            parameters: {
                $query?: { "type"?: "netbox" | "phpipam" | "pve" },
            }
            return: { "ipam": string; "type": string }[]
        },
        "POST": {
            parameters: {
                $body: {
                    "fingerprint"?: string;
                    "ipam": string;
                    "lock-token"?: string;
                    "section"?: number;
                    "token"?: string;
                    "type": "netbox" | "phpipam" | "pve";
                    "url"?: string
                },
            }
            return: unknown
        }
    },
    "/cluster/sdn/ipams/{ipam}": {
        "DELETE": {
            parameters: {
                $path: { "ipam": string },
                $query?: { "lock-token"?: string },
            }
            return: unknown
        },
        "GET": {
            parameters: {
                $path: { "ipam": string },
            }
            return: Record<string, unknown>
        },
        "PUT": {
            parameters: {
                $path: { "ipam": string },
                $body: {
                    "delete"?: string;
                    "digest"?: string;
                    "fingerprint"?: string;
                    "lock-token"?: string;
                    "section"?: number;
                    "token"?: string;
                    "url"?: string
                },
            }
            return: unknown
        }
    },
    "/cluster/sdn/ipams/{ipam}/status": {
        "GET": {
            parameters: {
                $path: { "ipam": string },
            }
            return: unknown[]
        }
    },
    "/cluster/sdn/lock": {
        "DELETE": {
            parameters: {
                $query?: { "force"?: boolean; "lock-token"?: string },
            }
            return: unknown
        },
        "POST": {
            parameters: {
                $body: { "allow-pending"?: boolean },
            }
            return: string
        }
    },
    "/cluster/sdn/rollback": {
        "POST": {
            parameters: {
                $body: { "lock-token"?: string; "release-lock"?: boolean },
            }
            return: unknown
        }
    },
    "/cluster/sdn/vnets": {
        "GET": {
            parameters: {
                $query?: { "pending"?: boolean; "running"?: boolean },
            }
            return: {
                "alias"?: string;
                "digest"?: string;
                "isolate-ports"?: boolean;
                "pending"?: {
                    "alias"?: string;
                    "isolate-ports"?: boolean;
                    "tag"?: number;
                    "vlanaware"?: boolean;
                    "zone"?: string
                };
                "state"?: "new" | "changed" | "deleted";
                "tag"?: number;
                "type": "vnet";
                "vlanaware"?: boolean;
                "vnet": string;
                "zone"?: string
            }[]
        },
        "POST": {
            parameters: {
                $body: {
                    "alias"?: string;
                    "isolate-ports"?: boolean;
                    "lock-token"?: string;
                    "tag"?: number;
                    "type"?: "vnet";
                    "vlanaware"?: boolean;
                    "vnet": string;
                    "zone": string
                },
            }
            return: unknown
        }
    },
    "/cluster/sdn/vnets/{vnet}": {
        "DELETE": {
            parameters: {
                $path: { "vnet": string },
                $query?: { "lock-token"?: string },
            }
            return: unknown
        },
        "GET": {
            parameters: {
                $path: { "vnet": string },
                $query?: { "pending"?: boolean; "running"?: boolean },
            }
            return: {
                "alias"?: string;
                "digest"?: string;
                "isolate-ports"?: boolean;
                "pending"?: {
                    "alias"?: string;
                    "isolate-ports"?: boolean;
                    "tag"?: number;
                    "vlanaware"?: boolean;
                    "zone"?: string
                };
                "state"?: "new" | "changed" | "deleted";
                "tag"?: number;
                "type": "vnet";
                "vlanaware"?: boolean;
                "vnet": string;
                "zone"?: string
            }
        },
        "PUT": {
            parameters: {
                $path: { "vnet": string },
                $body: {
                    "alias"?: string;
                    "delete"?: string;
                    "digest"?: string;
                    "isolate-ports"?: boolean;
                    "lock-token"?: string;
                    "tag"?: number;
                    "vlanaware"?: boolean;
                    "zone"?: string
                },
            }
            return: unknown
        }
    },
    "/cluster/sdn/vnets/{vnet}/firewall": {
        "GET": {
            parameters: {
                $path: { "vnet": string },
            }
            return: Record<string, unknown>[]
        }
    },
    "/cluster/sdn/vnets/{vnet}/firewall/options": {
        "GET": {
            parameters: {
                $path: { "vnet": string },
            }
            return: {
                "enable"?: boolean;
                "log_level_forward"?: "emerg" | "alert" | "crit" | "err" | "warning" | "notice" | "info" | "debug" | "nolog";
                "policy_forward"?: "ACCEPT" | "DROP"
            }
        },
        "PUT": {
            parameters: {
                $path: { "vnet": string },
                $body: {
                    "delete"?: string;
                    "digest"?: string;
                    "enable"?: boolean;
                    "log_level_forward"?: "emerg" | "alert" | "crit" | "err" | "warning" | "notice" | "info" | "debug" | "nolog";
                    "policy_forward"?: "ACCEPT" | "DROP"
                },
            }
            return: unknown
        }
    },
    "/cluster/sdn/vnets/{vnet}/firewall/rules": {
        "GET": {
            parameters: {
                $path: { "vnet": string },
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
                $path: { "vnet": string },
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
    "/cluster/sdn/vnets/{vnet}/firewall/rules/{pos}": {
        "DELETE": {
            parameters: {
                $path: { "vnet": string; "pos": number },
                $query?: { "digest"?: string },
            }
            return: unknown
        },
        "GET": {
            parameters: {
                $path: { "vnet": string; "pos": number },
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
                $path: { "vnet": string; "pos": number },
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
    "/cluster/sdn/vnets/{vnet}/ips": {
        "DELETE": {
            parameters: {
                $path: { "vnet": string },
                $query?: { "ip": string; "mac"?: string; "zone": string },
            }
            return: unknown
        },
        "POST": {
            parameters: {
                $path: { "vnet": string },
                $body: { "ip": string; "mac"?: string; "zone": string },
            }
            return: unknown
        },
        "PUT": {
            parameters: {
                $path: { "vnet": string },
                $body: { "ip": string; "mac"?: string; "vmid"?: number; "zone": string },
            }
            return: unknown
        }
    },
    "/cluster/sdn/vnets/{vnet}/subnets": {
        "GET": {
            parameters: {
                $path: { "vnet": string },
                $query?: { "pending"?: boolean; "running"?: boolean },
            }
            return: Record<string, unknown>[]
        },
        "POST": {
            parameters: {
                $path: { "vnet": string },
                $body: {
                    "dhcp-dns-server"?: string;
                    "dhcp-range"?: string[];
                    "dnszoneprefix"?: string;
                    "gateway"?: string;
                    "lock-token"?: string;
                    "snat"?: boolean;
                    "subnet": string;
                    "type": "subnet"
                },
            }
            return: unknown
        }
    },
    "/cluster/sdn/vnets/{vnet}/subnets/{subnet}": {
        "DELETE": {
            parameters: {
                $path: { "vnet": string; "subnet": string },
                $query?: { "lock-token"?: string },
            }
            return: unknown
        },
        "GET": {
            parameters: {
                $path: { "vnet": string; "subnet": string },
                $query?: { "pending"?: boolean; "running"?: boolean },
            }
            return: Record<string, unknown>
        },
        "PUT": {
            parameters: {
                $path: { "vnet": string; "subnet": string },
                $body: {
                    "delete"?: string;
                    "dhcp-dns-server"?: string;
                    "dhcp-range"?: string[];
                    "digest"?: string;
                    "dnszoneprefix"?: string;
                    "gateway"?: string;
                    "lock-token"?: string;
                    "snat"?: boolean
                },
            }
            return: unknown
        }
    },
    "/cluster/sdn/zones": {
        "GET": {
            parameters: {
                $query?: {
                    "pending"?: boolean;
                    "running"?: boolean;
                    "type"?: "evpn" | "faucet" | "qinq" | "simple" | "vlan" | "vxlan"
                },
            }
            return: {
                "advertise-subnets"?: boolean;
                "bridge"?: string;
                "bridge-disable-mac-learning"?: boolean;
                "controller"?: string;
                "dhcp"?: "dnsmasq";
                "digest"?: string;
                "disable-arp-nd-suppression"?: boolean;
                "dns"?: string;
                "dnszone"?: string;
                "exitnodes"?: string;
                "exitnodes-local-routing"?: boolean;
                "exitnodes-primary"?: string;
                "ipam"?: string;
                "mac"?: string;
                "mtu"?: number;
                "nodes"?: string;
                "peers"?: string;
                "pending"?: {
                    "advertise-subnets"?: boolean;
                    "bridge"?: string;
                    "bridge-disable-mac-learning"?: boolean;
                    "controller"?: string;
                    "dhcp"?: "dnsmasq";
                    "disable-arp-nd-suppression"?: boolean;
                    "dns"?: string;
                    "dnszone"?: string;
                    "exitnodes"?: string;
                    "exitnodes-local-routing"?: boolean;
                    "exitnodes-primary"?: string;
                    "ipam"?: string;
                    "mac"?: string;
                    "mtu"?: number;
                    "nodes"?: string;
                    "peers"?: string;
                    "reversedns"?: string;
                    "rt-import"?: string;
                    "tag"?: number;
                    "vlan-protocol"?: "802.1q" | "802.1ad";
                    "vrf-vxlan"?: number;
                    "vxlan-port"?: number
                };
                "reversedns"?: string;
                "rt-import"?: string;
                "state"?: "new" | "changed" | "deleted";
                "tag"?: number;
                "type": "evpn" | "faucet" | "qinq" | "simple" | "vlan" | "vxlan";
                "vlan-protocol"?: "802.1q" | "802.1ad";
                "vrf-vxlan"?: number;
                "vxlan-port"?: number;
                "zone": string
            }[]
        },
        "POST": {
            parameters: {
                $body: {
                    "advertise-subnets"?: boolean;
                    "bridge"?: string;
                    "bridge-disable-mac-learning"?: boolean;
                    "controller"?: string;
                    "dhcp"?: "dnsmasq";
                    "disable-arp-nd-suppression"?: boolean;
                    "dns"?: string;
                    "dnszone"?: string;
                    "dp-id"?: number;
                    "exitnodes"?: string;
                    "exitnodes-local-routing"?: boolean;
                    "exitnodes-primary"?: string;
                    "fabric"?: string;
                    "ipam"?: string;
                    "lock-token"?: string;
                    "mac"?: string;
                    "mtu"?: number;
                    "nodes"?: string;
                    "peers"?: string;
                    "reversedns"?: string;
                    "rt-import"?: string;
                    "tag"?: number;
                    "type": "evpn" | "faucet" | "qinq" | "simple" | "vlan" | "vxlan";
                    "vlan-protocol"?: "802.1q" | "802.1ad";
                    "vrf-vxlan"?: number;
                    "vxlan-port"?: number;
                    "zone": string
                },
            }
            return: unknown
        }
    },
    "/cluster/sdn/zones/{zone}": {
        "DELETE": {
            parameters: {
                $path: { "zone": string },
                $query?: { "lock-token"?: string },
            }
            return: unknown
        },
        "GET": {
            parameters: {
                $path: { "zone": string },
                $query?: { "pending"?: boolean; "running"?: boolean },
            }
            return: {
                "advertise-subnets"?: boolean;
                "bridge"?: string;
                "bridge-disable-mac-learning"?: boolean;
                "controller"?: string;
                "dhcp"?: "dnsmasq";
                "digest"?: string;
                "disable-arp-nd-suppression"?: boolean;
                "dns"?: string;
                "dnszone"?: string;
                "exitnodes"?: string;
                "exitnodes-local-routing"?: boolean;
                "exitnodes-primary"?: string;
                "ipam"?: string;
                "mac"?: string;
                "mtu"?: number;
                "nodes"?: string;
                "peers"?: string;
                "pending"?: {
                    "advertise-subnets"?: boolean;
                    "bridge"?: string;
                    "bridge-disable-mac-learning"?: boolean;
                    "controller"?: string;
                    "dhcp"?: "dnsmasq";
                    "disable-arp-nd-suppression"?: boolean;
                    "dns"?: string;
                    "dnszone"?: string;
                    "exitnodes"?: string;
                    "exitnodes-local-routing"?: boolean;
                    "exitnodes-primary"?: string;
                    "ipam"?: string;
                    "mac"?: string;
                    "mtu"?: number;
                    "nodes"?: string;
                    "peers"?: string;
                    "reversedns"?: string;
                    "rt-import"?: string;
                    "tag"?: number;
                    "vlan-protocol"?: "802.1q" | "802.1ad";
                    "vrf-vxlan"?: number;
                    "vxlan-port"?: number
                };
                "reversedns"?: string;
                "rt-import"?: string;
                "state"?: "new" | "changed" | "deleted";
                "tag"?: number;
                "type": "evpn" | "faucet" | "qinq" | "simple" | "vlan" | "vxlan";
                "vlan-protocol"?: "802.1q" | "802.1ad";
                "vrf-vxlan"?: number;
                "vxlan-port"?: number;
                "zone": string
            }
        },
        "PUT": {
            parameters: {
                $path: { "zone": string },
                $body: {
                    "advertise-subnets"?: boolean;
                    "bridge"?: string;
                    "bridge-disable-mac-learning"?: boolean;
                    "controller"?: string;
                    "delete"?: string;
                    "dhcp"?: "dnsmasq";
                    "digest"?: string;
                    "disable-arp-nd-suppression"?: boolean;
                    "dns"?: string;
                    "dnszone"?: string;
                    "dp-id"?: number;
                    "exitnodes"?: string;
                    "exitnodes-local-routing"?: boolean;
                    "exitnodes-primary"?: string;
                    "fabric"?: string;
                    "ipam"?: string;
                    "lock-token"?: string;
                    "mac"?: string;
                    "mtu"?: number;
                    "nodes"?: string;
                    "peers"?: string;
                    "reversedns"?: string;
                    "rt-import"?: string;
                    "tag"?: number;
                    "vlan-protocol"?: "802.1q" | "802.1ad";
                    "vrf-vxlan"?: number;
                    "vxlan-port"?: number
                },
            }
            return: unknown
        }
    },
    "/cluster/status": {
        "GET": {
            parameters: {}
            return: {
                "id": string;
                "ip"?: string;
                "level"?: string;
                "local"?: boolean;
                "name": string;
                "nodeid"?: number;
                "nodes"?: number;
                "online"?: boolean;
                "quorate"?: boolean;
                "type": "cluster" | "node";
                "version"?: number
            }[]
        }
    },
    "/cluster/tasks": {
        "GET": {
            parameters: {}
            return: {
                upid: string;
                node: string;
                type: string;
                user: string;
                status?: string;
                starttime?: number;
                endtime?: number;
                id: string;
            }[]
        }
    },
}

// --- END ClusterAPI type definition ---
