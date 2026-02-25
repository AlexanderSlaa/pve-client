import { PathContext } from ".";
import type {ArgsTuple} from "./index";
import {Client} from "../index";

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

export default (client: Client) => ({
    /**
     * Cluster index.
     * @endpoint GET /cluster
     * @allowToken 1
     * @permissions {"user": "all"}
     */
    index: (...args: ArgsTuple<ClusterAPI["/cluster"]["GET"]['parameters']>) => client.request("/cluster", "GET", (args[0] ?? {}) as ClusterAPI["/cluster"]["GET"]['parameters']),
    acme: {
        /**
         * ACMEAccount index.
         * @endpoint GET /cluster/acme
         * @allowToken 1
         * @permissions {"user": "all"}
         */
        index: (...args: ArgsTuple<ClusterAPI["/cluster/acme"]["GET"]['parameters']>) => client.request("/cluster/acme", "GET", (args[0] ?? {}) as ClusterAPI["/cluster/acme"]["GET"]['parameters']),
        account: {
            /**
             * ACMEAccount index.
             * @endpoint GET /cluster/acme/account
             * @allowToken 1
             * @permissions {"user": "all"}
             */
            index: (...args: ArgsTuple<ClusterAPI["/cluster/acme/account"]["GET"]['parameters']>) => client.request("/cluster/acme/account", "GET", (args[0] ?? {}) as ClusterAPI["/cluster/acme/account"]["GET"]['parameters']),
            /**
             * Register a new ACME account with CA.
             * @endpoint POST /cluster/acme/account
             * @allowToken 1
             *
             * Parameters:
             * - `contact` (body, required, string): Contact email addresses.
             * - `directory` (body, optional, string): URL of ACME CA directory endpoint.
             * - `eab-hmac-key` (body, optional, string): HMAC key for External Account Binding.
             * - `eab-kid` (body, optional, string): Key Identifier for External Account Binding.
             * - `name` (body, optional, string): ACME account config file name.
             * - `tos_url` (body, optional, string): URL of CA TermsOfService - setting this indicates agreement.
             */
            register_account: (...args: ArgsTuple<ClusterAPI["/cluster/acme/account"]["POST"]['parameters']>) => client.request("/cluster/acme/account", "POST", (args[0] ?? {}) as ClusterAPI["/cluster/acme/account"]["POST"]['parameters']),
            name: (value: string) => ({
                /**
                 * Deactivate existing ACME account at CA.
                 * @endpoint DELETE /cluster/acme/account/{name}
                 * @allowToken 1
                 *
                 * Parameters:
                 * - `name` (path, optional, string): ACME account config file name.
                 */
                deactivate: (...args: ArgsTuple<PathContext<ClusterAPI["/cluster/acme/account/{name}"]["DELETE"]['parameters']>>) => client.request("/cluster/acme/account/{name}", "DELETE", {
                    ...((args[0]) as any),
                    $path: {"name": value}
                }),
                /**
                 * Return existing ACME account information.
                 * @endpoint GET /cluster/acme/account/{name}
                 * @allowToken 1
                 *
                 * Parameters:
                 * - `name` (path, optional, string): ACME account config file name.
                 */
                get: (...args: ArgsTuple<PathContext<ClusterAPI["/cluster/acme/account/{name}"]["GET"]['parameters']>>) => client.request("/cluster/acme/account/{name}", "GET", {
                    ...((args[0]) as any),
                    $path: {"name": value}
                }),
                /**
                 * Update existing ACME account information with CA. Note: not specifying any new account information triggers a refresh.
                 * @endpoint PUT /cluster/acme/account/{name}
                 * @allowToken 1
                 *
                 * Parameters:
                 * - `contact` (body, optional, string): Contact email addresses.
                 * - `name` (path, optional, string): ACME account config file name.
                 */
                update: (...args: ArgsTuple<PathContext<ClusterAPI["/cluster/acme/account/{name}"]["PUT"]['parameters']>>) => client.request("/cluster/acme/account/{name}", "PUT", {
                    ...((args[0]) as any),
                    $path: {"name": value}
                })
            })
        },
        /**
         * Get schema of ACME challenge types.
         * @endpoint GET /cluster/acme/challenge-schema
         * @allowToken 1
         * @permissions {"user": "all"}
         */
        challenges_chema: (...args: ArgsTuple<ClusterAPI["/cluster/acme/challenge-schema"]["GET"]['parameters']>) => client.request("/cluster/acme/challenge-schema", "GET", (args[0] ?? {}) as ClusterAPI["/cluster/acme/challenge-schema"]["GET"]['parameters']),
        /**
         * Get named known ACME directory endpoints.
         * @endpoint GET /cluster/acme/directories
         * @allowToken 1
         * @permissions {"user": "all"}
         */
        directories: (...args: ArgsTuple<ClusterAPI["/cluster/acme/directories"]["GET"]['parameters']>) => client.request("/cluster/acme/directories", "GET", (args[0] ?? {}) as ClusterAPI["/cluster/acme/directories"]["GET"]['parameters']),
        /**
         * Retrieve ACME Directory Meta Information
         * @endpoint GET /cluster/acme/meta
         * @allowToken 1
         * @permissions {"check": ["perm", "/nodes/{node}", ["Sys.Audit"]]}
         *
         * Parameters:
         * - `directory` (query, optional, string): URL of ACME CA directory endpoint.
         */
        meta: (...args: ArgsTuple<ClusterAPI["/cluster/acme/meta"]["GET"]['parameters']>) => client.request("/cluster/acme/meta", "GET", (args[0] ?? {}) as ClusterAPI["/cluster/acme/meta"]["GET"]['parameters']),
        plugins: {
            /**
             * ACME plugin index.
             * @endpoint GET /cluster/acme/plugins
             * @allowToken 1
             * @permissions {"check": ["perm", "/", ["Sys.Modify"]]}
             *
             * Parameters:
             * - `type` (query, optional, "dns" | "standalone"): Only list ACME plugins of a specific type
             */
            index: (...args: ArgsTuple<ClusterAPI["/cluster/acme/plugins"]["GET"]['parameters']>) => client.request("/cluster/acme/plugins", "GET", (args[0] ?? {}) as ClusterAPI["/cluster/acme/plugins"]["GET"]['parameters']),
            /**
             * Add ACME plugin configuration.
             * @endpoint POST /cluster/acme/plugins
             * @allowToken 1
             * @permissions {"check": ["perm", "/", ["Sys.Modify"]]}
             *
             * Parameters:
             * - `api` (body, optional, "1984hosting" | "acmedns" | "acmeproxy" | "active24" | "ad" | "ali" | "alviy" | "anx" | "artfiles" | "arvan" | "aurora" | "autodns" | "aws" | "azion" | "azure" | "beget" | "bookmyname" | "bunny" | "cf" | "clouddns" | "cloudns" | "cn" | "conoha" | "constellix" | "cpanel" | "curanet" | "cyon" | "da" | "ddnss" | "desec" | "df" | "dgon" | "dnsexit" | "dnshome" | "dnsimple" | "dnsservices" | "doapi" | "domeneshop" | "dp" | "dpi" | "dreamhost" | "duckdns" | "durabledns" | "dyn" | "dynu" | "dynv6" | "easydns" | "edgecenter" | "edgedns" | "euserv" | "exoscale" | "fornex" | "freedns" | "freemyip" | "gandi_livedns" | "gcloud" | "gcore" | "gd" | "geoscaling" | "googledomains" | "he" | "he_ddns" | "hetzner" | "hexonet" | "hostingde" | "huaweicloud" | "infoblox" | "infomaniak" | "internetbs" | "inwx" | "ionos" | "ionos_cloud" | "ipv64" | "ispconfig" | "jd" | "joker" | "kappernet" | "kas" | "kinghost" | "knot" | "la" | "leaseweb" | "lexicon" | "limacity" | "linode" | "linode_v4" | "loopia" | "lua" | "maradns" | "me" | "miab" | "mijnhost" | "misaka" | "myapi" | "mydevil" | "mydnsjp" | "mythic_beasts" | "namecheap" | "namecom" | "namesilo" | "nanelo" | "nederhost" | "neodigit" | "netcup" | "netlify" | "nic" | "njalla" | "nm" | "nsd" | "nsone" | "nsupdate" | "nw" | "oci" | "omglol" | "one" | "online" | "openprovider" | "openstack" | "opnsense" | "ovh" | "pdns" | "pleskxml" | "pointhq" | "porkbun" | "rackcorp" | "rackspace" | "rage4" | "rcode0" | "regru" | "scaleway" | "schlundtech" | "selectel" | "selfhost" | "servercow" | "simply" | "technitium" | "tele3" | "tencent" | "timeweb" | "transip" | "udr" | "ultra" | "unoeuro" | "variomedia" | "veesp" | "vercel" | "vscale" | "vultr" | "websupport" | "west_cn" | "world4you" | "yandex360" | "yc" | "zilore" | "zone" | "zoneedit" | "zonomi"): API plugin name
             * - `data` (body, optional, string): DNS plugin data. (base64 encoded)
             * - `disable` (body, optional, boolean): Flag to disable the config.
             * - `id` (body, required, string): ACME Plugin ID name
             * - `nodes` (body, optional, string): List of cluster node names.
             * - `type` (body, required, "dns" | "standalone"): ACME challenge type.
             * - `validation-delay` (body, optional, number): Extra delay in seconds to wait before requesting validation. Allows to cope with a long TTL of DNS records.
             */
            add: (...args: ArgsTuple<ClusterAPI["/cluster/acme/plugins"]["POST"]['parameters']>) => client.request("/cluster/acme/plugins", "POST", (args[0] ?? {}) as ClusterAPI["/cluster/acme/plugins"]["POST"]['parameters']),
            id: (value: string | number) => ({
                /**
                 * Delete ACME plugin configuration.
                 * @endpoint DELETE /cluster/acme/plugins/{id}
                 * @allowToken 1
                 * @permissions {"check": ["perm", "/", ["Sys.Modify"]]}
                 *
                 * Parameters:
                 * - `id` (path, required, string): Unique identifier for ACME plugin instance.
                 */
                delete: (...args: ArgsTuple<PathContext<ClusterAPI["/cluster/acme/plugins/{id}"]["DELETE"]['parameters']>>) => client.request("/cluster/acme/plugins/{id}", "DELETE", {
                    ...((args[0]) as any),
                    $path: {"id": value.toString()}
                }),
                /**
                 * Get ACME plugin configuration.
                 * @endpoint GET /cluster/acme/plugins/{id}
                 * @allowToken 1
                 * @permissions {"check": ["perm", "/", ["Sys.Modify"]]}
                 *
                 * Parameters:
                 * - `id` (path, required, string): Unique identifier for ACME plugin instance.
                 */
                get_config: (...args: ArgsTuple<PathContext<ClusterAPI["/cluster/acme/plugins/{id}"]["GET"]['parameters']>>) => client.request("/cluster/acme/plugins/{id}", "GET", {
                    ...((args[0]) as any),
                    $path: {"id": value.toString()}
                }),
                /**
                 * Update ACME plugin configuration.
                 * @endpoint PUT /cluster/acme/plugins/{id}
                 * @allowToken 1
                 * @permissions {"check": ["perm", "/", ["Sys.Modify"]]}
                 *
                 * Parameters:
                 * - `api` (body, optional, "1984hosting" | "acmedns" | "acmeproxy" | "active24" | "ad" | "ali" | "alviy" | "anx" | "artfiles" | "arvan" | "aurora" | "autodns" | "aws" | "azion" | "azure" | "beget" | "bookmyname" | "bunny" | "cf" | "clouddns" | "cloudns" | "cn" | "conoha" | "constellix" | "cpanel" | "curanet" | "cyon" | "da" | "ddnss" | "desec" | "df" | "dgon" | "dnsexit" | "dnshome" | "dnsimple" | "dnsservices" | "doapi" | "domeneshop" | "dp" | "dpi" | "dreamhost" | "duckdns" | "durabledns" | "dyn" | "dynu" | "dynv6" | "easydns" | "edgecenter" | "edgedns" | "euserv" | "exoscale" | "fornex" | "freedns" | "freemyip" | "gandi_livedns" | "gcloud" | "gcore" | "gd" | "geoscaling" | "googledomains" | "he" | "he_ddns" | "hetzner" | "hexonet" | "hostingde" | "huaweicloud" | "infoblox" | "infomaniak" | "internetbs" | "inwx" | "ionos" | "ionos_cloud" | "ipv64" | "ispconfig" | "jd" | "joker" | "kappernet" | "kas" | "kinghost" | "knot" | "la" | "leaseweb" | "lexicon" | "limacity" | "linode" | "linode_v4" | "loopia" | "lua" | "maradns" | "me" | "miab" | "mijnhost" | "misaka" | "myapi" | "mydevil" | "mydnsjp" | "mythic_beasts" | "namecheap" | "namecom" | "namesilo" | "nanelo" | "nederhost" | "neodigit" | "netcup" | "netlify" | "nic" | "njalla" | "nm" | "nsd" | "nsone" | "nsupdate" | "nw" | "oci" | "omglol" | "one" | "online" | "openprovider" | "openstack" | "opnsense" | "ovh" | "pdns" | "pleskxml" | "pointhq" | "porkbun" | "rackcorp" | "rackspace" | "rage4" | "rcode0" | "regru" | "scaleway" | "schlundtech" | "selectel" | "selfhost" | "servercow" | "simply" | "technitium" | "tele3" | "tencent" | "timeweb" | "transip" | "udr" | "ultra" | "unoeuro" | "variomedia" | "veesp" | "vercel" | "vscale" | "vultr" | "websupport" | "west_cn" | "world4you" | "yandex360" | "yc" | "zilore" | "zone" | "zoneedit" | "zonomi"): API plugin name
                 * - `data` (body, optional, string): DNS plugin data. (base64 encoded)
                 * - `delete` (body, optional, string): A list of settings you want to delete.
                 * - `digest` (body, optional, string): Prevent changes if current configuration file has a different digest. This can be used to prevent concurrent modifications.
                 * - `disable` (body, optional, boolean): Flag to disable the config.
                 * - `id` (path, required, string): ACME Plugin ID name
                 * - `nodes` (body, optional, string): List of cluster node names.
                 * - `validation-delay` (body, optional, number): Extra delay in seconds to wait before requesting validation. Allows to cope with a long TTL of DNS records.
                 */
                update: (...args: ArgsTuple<PathContext<ClusterAPI["/cluster/acme/plugins/{id}"]["PUT"]['parameters']>>) => client.request("/cluster/acme/plugins/{id}", "PUT", {
                    ...((args[0]) as any),
                    $path: {"id": value.toString()}
                }),
            })
        },
        /**
         * Retrieve ACME TermsOfService URL from CA. Deprecated, please use /cluster/acme/meta.
         * @endpoint GET /cluster/acme/tos
         * @allowToken 1
         * @permissions {"user": "all"}
         *
         * Parameters:
         * - `directory` (query, optional, string): URL of ACME CA directory endpoint.
         */
        tos: (...args: ArgsTuple<ClusterAPI["/cluster/acme/tos"]["GET"]['parameters']>) => client.request("/cluster/acme/tos", "GET", (args[0] ?? {}) as ClusterAPI["/cluster/acme/tos"]["GET"]['parameters'])

    },
    backup: {
        /**
         * List vzdump backup schedule.
         * @endpoint GET /cluster/backup
         * @allowToken 1
         * @permissions {"check": ["perm", "/", ["Sys.Audit"]]}
         */
        index: (...args: ArgsTuple<ClusterAPI["/cluster/backup"]["GET"]['parameters']>) => client.request("/cluster/backup", "GET", (args[0] ?? {}) as ClusterAPI["/cluster/backup"]["GET"]['parameters']),
        /**
         * Create new vzdump backup job.
         * @endpoint POST /cluster/backup
         * @allowToken 1
         * @permissions {"check": ["perm", "/", ["Sys.Modify"]], "description": "The 'tmpdir', 'dumpdir' and 'script' parameters are additionally restricted to the 'root@pam' user."}
         *
         * Parameters:
         * - `all` (body, optional, boolean): Backup all known guest systems on this host.
         * - `bwlimit` (body, optional, number): Limit I/O bandwidth (in KiB/s).
         * - `comment` (body, optional, string): Description for the Job.
         * - `compress` (body, optional, "0" | "1" | "gzip" | "lzo" | "zstd"): Compress dump file.
         * - `dow` (body, optional, string): Day of week selection.
         * - `dumpdir` (body, optional, string): Store resulting files to specified directory.
         * - `enabled` (body, optional, boolean): Enable or disable the job.
         * - `exclude` (body, optional, string): Exclude specified guest systems (assumes --all)
         * - `exclude-path` (body, optional, string[]): Exclude certain files/directories (shell globs). Paths starting with '/' are anchored to the container's root, other paths match relative to each subdirectory.
         * - `fleecing` (body, optional, string): Options for backup fleecing (VM only).
         * - `id` (body, optional, string): Job ID (will be autogenerated).
         * - `ionice` (body, optional, number): Set IO priority when using the BFQ scheduler. For snapshot and suspend mode backups of VMs, this only affects the compressor. A value of 8 means the idle priority is used, otherwise the best-effort priority is used with the specified value.
         * - `lockwait` (body, optional, number): Maximal time to wait for the global lock (minutes).
         * - `mailnotification` (body, optional, "always" | "failure"): Deprecated: use notification targets/matchers instead. Specify when to send a notification mail
         * - `mailto` (body, optional, string): Deprecated: Use notification targets/matchers instead. Comma-separated list of email addresses or users that should receive email notifications.
         * - `maxfiles` (body, optional, number): Deprecated: use 'prune-backups' instead. Maximal number of backup files per guest system.
         * - `mode` (body, optional, "snapshot" | "suspend" | "stop"): Backup mode.
         * - `node` (body, optional, string): Only run if executed on this node.
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
         * - `repeat-missed` (body, optional, boolean): If true, the job will be run as soon as possible if it was missed while the scheduler was not running.
         * - `schedule` (body, optional, string): Backup schedule. The format is a subset of `systemd` calendar events.
         * - `script` (body, optional, string): Use specified hook script.
         * - `starttime` (body, optional, string): Job Start time.
         * - `stdexcludes` (body, optional, boolean): Exclude temporary files and logs.
         * - `stop` (body, optional, boolean): Stop running backup jobs on this host.
         * - `stopwait` (body, optional, number): Maximal time to wait until a guest system is stopped (minutes).
         * - `storage` (body, optional, string): Store resulting file to this storage.
         * - `tmpdir` (body, optional, string): Store temporary files to specified directory.
         * - `vmid` (body, optional, string): The ID of the guest system you want to backup.
         * - `zstd` (body, optional, number): Zstd threads. N=0 uses half of the available cores, if N is set to a value bigger than 0, N is used as thread count.
         */
        create_job: (...args: ArgsTuple<ClusterAPI["/cluster/backup"]["POST"]['parameters']>) => client.request("/cluster/backup", "POST", (args[0] ?? {}) as ClusterAPI["/cluster/backup"]["POST"]['parameters']),
        job: (value: string | number) => ({
            /**
             * Delete vzdump backup job definition.
             * @endpoint DELETE /cluster/backup/{id}
             * @allowToken 1
             * @permissions {"check": ["perm", "/", ["Sys.Modify"]]}
             *
             * Parameters:
             * - `id` (path, required, string): The job ID.
             */
            delete: (...args: ArgsTuple<PathContext<ClusterAPI["/cluster/backup/{id}"]["DELETE"]['parameters']>>) => client.request("/cluster/backup/{id}", "DELETE", {
                ...((args[0]) as any),
                $path: {"id": value.toString()}
            }),
            /**
             * Read vzdump backup job definition.
             * @endpoint GET /cluster/backup/{id}
             * @allowToken 1
             * @permissions {"check": ["perm", "/", ["Sys.Audit"]]}
             *
             * Parameters:
             * - `id` (path, required, string): The job ID.
             */
            read: (...args: ArgsTuple<PathContext<ClusterAPI["/cluster/backup/{id}"]["GET"]['parameters']>>) => client.request("/cluster/backup/{id}", "GET", {
                ...((args[0]) as any),
                $path: {"id": value.toString()}
            }),
            /**
             * Update vzdump backup job definition.
             * @endpoint PUT /cluster/backup/{id}
             * @allowToken 1
             * @permissions {"check": ["perm", "/", ["Sys.Modify"]], "description": "The 'tmpdir', 'dumpdir' and 'script' parameters are additionally restricted to the 'root@pam' user."}
             *
             * Parameters:
             * - `all` (body, optional, boolean): Backup all known guest systems on this host.
             * - `bwlimit` (body, optional, number): Limit I/O bandwidth (in KiB/s).
             * - `comment` (body, optional, string): Description for the Job.
             * - `compress` (body, optional, "0" | "1" | "gzip" | "lzo" | "zstd"): Compress dump file.
             * - `delete` (body, optional, string): A list of settings you want to delete.
             * - `dow` (body, optional, string): Day of week selection.
             * - `dumpdir` (body, optional, string): Store resulting files to specified directory.
             * - `enabled` (body, optional, boolean): Enable or disable the job.
             * - `exclude` (body, optional, string): Exclude specified guest systems (assumes --all)
             * - `exclude-path` (body, optional, string[]): Exclude certain files/directories (shell globs). Paths starting with '/' are anchored to the container's root, other paths match relative to each subdirectory.
             * - `fleecing` (body, optional, string): Options for backup fleecing (VM only).
             * - `id` (path, required, string): The job ID.
             * - `ionice` (body, optional, number): Set IO priority when using the BFQ scheduler. For snapshot and suspend mode backups of VMs, this only affects the compressor. A value of 8 means the idle priority is used, otherwise the best-effort priority is used with the specified value.
             * - `lockwait` (body, optional, number): Maximal time to wait for the global lock (minutes).
             * - `mailnotification` (body, optional, "always" | "failure"): Deprecated: use notification targets/matchers instead. Specify when to send a notification mail
             * - `mailto` (body, optional, string): Deprecated: Use notification targets/matchers instead. Comma-separated list of email addresses or users that should receive email notifications.
             * - `maxfiles` (body, optional, number): Deprecated: use 'prune-backups' instead. Maximal number of backup files per guest system.
             * - `mode` (body, optional, "snapshot" | "suspend" | "stop"): Backup mode.
             * - `node` (body, optional, string): Only run if executed on this node.
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
             * - `repeat-missed` (body, optional, boolean): If true, the job will be run as soon as possible if it was missed while the scheduler was not running.
             * - `schedule` (body, optional, string): Backup schedule. The format is a subset of `systemd` calendar events.
             * - `script` (body, optional, string): Use specified hook script.
             * - `starttime` (body, optional, string): Job Start time.
             * - `stdexcludes` (body, optional, boolean): Exclude temporary files and logs.
             * - `stop` (body, optional, boolean): Stop running backup jobs on this host.
             * - `stopwait` (body, optional, number): Maximal time to wait until a guest system is stopped (minutes).
             * - `storage` (body, optional, string): Store resulting file to this storage.
             * - `tmpdir` (body, optional, string): Store temporary files to specified directory.
             * - `vmid` (body, optional, string): The ID of the guest system you want to backup.
             * - `zstd` (body, optional, number): Zstd threads. N=0 uses half of the available cores, if N is set to a value bigger than 0, N is used as thread count.
             */
            update: (...args: ArgsTuple<PathContext<ClusterAPI["/cluster/backup/{id}"]["PUT"]['parameters']>>) => client.request("/cluster/backup/{id}", "PUT", {
                ...((args[0]) as any),
                $path: {"id": value.toString()}
            }),
            /**
             * Returns included guests and the backup status of their disks. Optimized to be used in ExtJS tree views.
             * @endpoint GET /cluster/backup/{id}/included_volumes
             * @allowToken 1
             * @permissions {"check": ["perm", "/", ["Sys.Audit"]]}
             *
             * Parameters:
             * - `id` (path, required, string): The job ID.
             */
            included_volumes: (...args: ArgsTuple<PathContext<ClusterAPI["/cluster/backup/{id}/included_volumes"]["GET"]['parameters']>>) => client.request("/cluster/backup/{id}/included_volumes", "GET", {
                ...((args[0]) as any),
                $path: {"id": value.toString()}
            }),
        })
    },
    backup_info: {
        /**
         * Index for backup info related endpoints
         * @endpoint GET /cluster/backup-info
         * @allowToken 1
         */
        index: (...args: ArgsTuple<ClusterAPI["/cluster/backup-info"]["GET"]['parameters']>) => client.request("/cluster/backup-info", "GET", (args[0] ?? {}) as ClusterAPI["/cluster/backup-info"]["GET"]['parameters']),
        not_backed_up: {
            /**
             * Shows all guests which are not covered by any backup job.
             * @endpoint GET /cluster/backup-info/not-backed-up
             * @allowToken 1
             * @permissions {"check": ["perm", "/", ["Sys.Audit"]]}
             */
            get_guests_not_in_backup: (...args: ArgsTuple<ClusterAPI["/cluster/backup-info/not-backed-up"]["GET"]['parameters']>) => client.request("/cluster/backup-info/not-backed-up", "GET", (args[0] ?? {}) as ClusterAPI["/cluster/backup-info/not-backed-up"]["GET"]['parameters'])
        }
    },
    bulk_action: {
        /**
         * List resource types.
         * @endpoint GET /cluster/bulk-action
         * @allowToken 1
         * @permissions {"user": "all"}
         */
        index: (...args: ArgsTuple<ClusterAPI["/cluster/bulk-action"]["GET"]['parameters']>) => client.request("/cluster/bulk-action", "GET", (args[0] ?? {}) as ClusterAPI["/cluster/bulk-action"]["GET"]['parameters']),
        guest: {
            /**
             * Bulk action index.
             * @endpoint GET /cluster/bulk-action/guest
             * @allowToken 1
             * @permissions {"user": "all"}
             */
            index: (...args: ArgsTuple<ClusterAPI["/cluster/bulk-action/guest"]["GET"]['parameters']>) => client.request("/cluster/bulk-action/guest", "GET", (args[0] ?? {}) as ClusterAPI["/cluster/bulk-action/guest"]["GET"]['parameters']),
            /**
             * Bulk migrate all guests on the cluster.
             * @endpoint POST /cluster/bulk-action/guest/migrate
             * @allowToken 1
             * @permissions {"description": "The 'VM.Migrate' permission is required on '/' or on '/vms/<ID>' for each ID passed via the 'vms' parameter.", "user": "all"}
             *
             * Parameters:
             * - `maxworkers` (body, optional, number): How many parallel tasks at maximum should be started.
             * - `online` (body, optional, boolean): Enable live migration for VMs and restart migration for CTs.
             * - `target` (body, required, string): Target node.
             * - `vms` (body, optional, number[]): Only consider guests from this list of VMIDs.
             * - `with-local-disks` (body, optional, boolean): Enable live storage migration for local disk
             */
            migrate: (...args: ArgsTuple<ClusterAPI["/cluster/bulk-action/guest/migrate"]["POST"]['parameters']>) => client.request("/cluster/bulk-action/guest/migrate", "POST", (args[0] ?? {}) as ClusterAPI["/cluster/bulk-action/guest/migrate"]["POST"]['parameters']),
            /**
             * Bulk shutdown all guests on the cluster.
             * @endpoint POST /cluster/bulk-action/guest/shutdown
             * @allowToken 1
             * @permissions {"description": "The 'VM.PowerMgmt' permission is required on '/' or on '/vms/<ID>' for each ID passed via the 'vms' parameter.", "user": "all"}
             *
             * Parameters:
             * - `force-stop` (body, optional, boolean): Makes sure the Guest stops after the timeout.
             * - `maxworkers` (body, optional, number): How many parallel tasks at maximum should be started.
             * - `timeout` (body, optional, number): Default shutdown timeout in seconds if none is configured for the guest.
             * - `vms` (body, optional, number[]): Only consider guests from this list of VMIDs.
             */
            shutdown: (...args: ArgsTuple<ClusterAPI["/cluster/bulk-action/guest/shutdown"]["POST"]['parameters']>) => client.request("/cluster/bulk-action/guest/shutdown", "POST", (args[0] ?? {}) as ClusterAPI["/cluster/bulk-action/guest/shutdown"]["POST"]['parameters']),
            /**
             * Bulk start or resume all guests on the cluster.
             * @endpoint POST /cluster/bulk-action/guest/start
             * @allowToken 1
             * @permissions {"description": "The 'VM.PowerMgmt' permission is required on '/' or on '/vms/<ID>' for each ID passed via the 'vms' parameter.", "user": "all"}
             *
             * Parameters:
             * - `maxworkers` (body, optional, number): How many parallel tasks at maximum should be started.
             * - `timeout` (body, optional, number): Default start timeout in seconds. Only valid for VMs. (default depends on the guest configuration).
             * - `vms` (body, optional, number[]): Only consider guests from this list of VMIDs.
             */
            start: (...args: ArgsTuple<ClusterAPI["/cluster/bulk-action/guest/start"]["POST"]['parameters']>) => client.request("/cluster/bulk-action/guest/start", "POST", (args[0] ?? {}) as ClusterAPI["/cluster/bulk-action/guest/start"]["POST"]['parameters']),
            /**
             * Bulk suspend all guests on the cluster.
             * @endpoint POST /cluster/bulk-action/guest/suspend
             * @allowToken 1
             * @permissions {"description": "The 'VM.PowerMgmt' permission is required on '/' or on '/vms/<ID>' for each ID passed via the 'vms' parameter. Additionally, you need 'VM.Config.Disk' on the '/vms/{vmid}' path and 'Datastore.AllocateSpace' for the configured state-storage(s)", "user": "all"}
             *
             * Parameters:
             * - `maxworkers` (body, optional, number): How many parallel tasks at maximum should be started.
             * - `statestorage` (body, optional, string): The storage for the VM state.
             * - `to-disk` (body, optional, boolean): If set, suspends the guests to disk. Will be resumed on next start.
             * - `vms` (body, optional, number[]): Only consider guests from this list of VMIDs.
             */
            suspend: (...args: ArgsTuple<ClusterAPI["/cluster/bulk-action/guest/suspend"]["POST"]['parameters']>) => client.request("/cluster/bulk-action/guest/suspend", "POST", (args[0] ?? {}) as ClusterAPI["/cluster/bulk-action/guest/suspend"]["POST"]['parameters'])
        }
    },
    ceph: {
        /**
         * Cluster ceph index.
         * @endpoint GET /cluster/ceph
         * @allowToken 1
         * @permissions {"user": "all"}
         */
        index: (...args: ArgsTuple<ClusterAPI["/cluster/ceph"]["GET"]['parameters']>) => client.request("/cluster/ceph", "GET", (args[0] ?? {}) as ClusterAPI["/cluster/ceph"]["GET"]['parameters']),
        flags: {
            /**
             * get the status of all ceph flags
             * @endpoint GET /cluster/ceph/flags
             * @allowToken 1
             * @permissions {"check": ["perm", "/", ["Sys.Audit"]]}
             */
            get_all: (...args: ArgsTuple<ClusterAPI["/cluster/ceph/flags"]["GET"]['parameters']>) => client.request("/cluster/ceph/flags", "GET", (args[0] ?? {}) as ClusterAPI["/cluster/ceph/flags"]["GET"]['parameters']),
            /**
             * Set/Unset multiple ceph flags at once.
             * @endpoint PUT /cluster/ceph/flags
             * @allowToken 1
             * @permissions {"check": ["perm", "/", ["Sys.Modify"]]}
             *
             * Parameters:
             * - `nobackfill` (body, optional, boolean): Backfilling of PGs is suspended.
             * - `nodeep-scrub` (body, optional, boolean): Deep Scrubbing is disabled.
             * - `nodown` (body, optional, boolean): OSD failure reports are being ignored, such that the monitors will not mark OSDs down.
             * - `noin` (body, optional, boolean): OSDs that were previously marked out will not be marked back in when they start.
             * - `noout` (body, optional, boolean): OSDs will not automatically be marked out after the configured interval.
             * - `norebalance` (body, optional, boolean): Rebalancing of PGs is suspended.
             * - `norecover` (body, optional, boolean): Recovery of PGs is suspended.
             * - `noscrub` (body, optional, boolean): Scrubbing is disabled.
             * - `notieragent` (body, optional, boolean): Cache tiering activity is suspended.
             * - `noup` (body, optional, boolean): OSDs are not allowed to start.
             * - `pause` (body, optional, boolean): Pauses read and writes.
             */
            set: (...args: ArgsTuple<ClusterAPI["/cluster/ceph/flags"]["PUT"]['parameters']>) => client.request("/cluster/ceph/flags", "PUT", (args[0] ?? {}) as ClusterAPI["/cluster/ceph/flags"]["PUT"]['parameters']),
            flag: (value: ClusterAPI["/cluster/ceph/flags/{flag}"]['GET']['parameters']['$path']['flag']) => ({
                /**
                 * Get the status of a specific ceph flag.
                 * @endpoint GET /cluster/ceph/flags/{flag}
                 * @allowToken 1
                 * @permissions {"check": ["perm", "/", ["Sys.Audit"]]}
                 *
                 * Parameters:
                 * - `flag` (path, required, "nobackfill" | "nodeep-scrub" | "nodown" | "noin" | "noout" | "norebalance" | "norecover" | "noscrub" | "notieragent" | "noup" | "pause"): The name of the flag name to get.
                 */
                get: (...args: ArgsTuple<PathContext<ClusterAPI["/cluster/ceph/flags/{flag}"]["GET"]['parameters']>>) => client.request("/cluster/ceph/flags/{flag}", "GET", {
                    ...((args[0]) as any),
                    $path: {"flag": value}
                }),
                /**
                 * Set or clear (unset) a specific ceph flag
                 * @endpoint PUT /cluster/ceph/flags/{flag}
                 * @allowToken 1
                 * @permissions {"check": ["perm", "/", ["Sys.Modify"]]}
                 *
                 * Parameters:
                 * - `flag` (path, required, "nobackfill" | "nodeep-scrub" | "nodown" | "noin" | "noout" | "norebalance" | "norecover" | "noscrub" | "notieragent" | "noup" | "pause"): The ceph flag to update
                 * - `value` (body, required, boolean): The new value of the flag
                 */
                update: (...args: ArgsTuple<PathContext<ClusterAPI["/cluster/ceph/flags/{flag}"]["PUT"]['parameters']>>) => client.request("/cluster/ceph/flags/{flag}", "PUT", {
                    ...((args[0]) as any),
                    $path: {"flag": value}
                }),
            })
        },
        /**
         * Get ceph metadata.
         * @endpoint GET /cluster/ceph/metadata
         * @allowToken 1
         * @permissions {"check": ["perm", "/", ["Sys.Audit", "Datastore.Audit"], "any", 1]}
         *
         * Parameters:
         * - `scope` (query, optional, "all" | "versions")
         */
        metadata: (...args: ArgsTuple<ClusterAPI["/cluster/ceph/metadata"]["GET"]['parameters']>) => client.request("/cluster/ceph/metadata", "GET", (args[0] ?? {}) as ClusterAPI["/cluster/ceph/metadata"]["GET"]['parameters']),
        /**
         * Get ceph status.
         * @endpoint GET /cluster/ceph/status
         * @allowToken 1
         * @permissions {"check": ["perm", "/", ["Sys.Audit", "Datastore.Audit"], "any", 1]}
         */
        status: (...args: ArgsTuple<ClusterAPI["/cluster/ceph/status"]["GET"]['parameters']>) => client.request("/cluster/ceph/status", "GET", (args[0] ?? {}) as ClusterAPI["/cluster/ceph/status"]["GET"]['parameters'])
    },
    config: {
        /**
         * Directory index.
         * @endpoint GET /cluster/config
         * @allowToken 1
         * @permissions {"check": ["perm", "/", ["Sys.Audit"]]}
         */
        index: (...args: ArgsTuple<ClusterAPI["/cluster/config"]["GET"]['parameters']>) => client.request("/cluster/config", "GET", (args[0] ?? {}) as ClusterAPI["/cluster/config"]["GET"]['parameters']),
        /**
         * Generate new cluster configuration. If no links given, default to local IP address as link0.
         * @endpoint POST /cluster/config
         * @allowToken 1
         *
         * Parameters:
         * - `clustername` (body, required, string): The name of the cluster.
         * - `link[n]` (body, optional, string): Address and priority information of a single corosync link. (up to 8 links supported; link0..link7)
         * - `nodeid` (body, optional, number): Node id for this node.
         * - `votes` (body, optional, number): Number of votes for this node.
         */
        create: (...args: ArgsTuple<ClusterAPI["/cluster/config"]["POST"]['parameters']>) => client.request("/cluster/config", "POST", (args[0] ?? {}) as ClusterAPI["/cluster/config"]["POST"]['parameters']),
        apiversion: {
            /**
             * Return the version of the cluster join API available on this node.
             * @endpoint GET /cluster/config/apiversion
             * @allowToken 1
             * @permissions {"check": ["perm", "/", ["Sys.Audit"]]}
             */
            join_api_version: (...args: ArgsTuple<ClusterAPI["/cluster/config/apiversion"]["GET"]['parameters']>) => client.request("/cluster/config/apiversion", "GET", (args[0] ?? {}) as ClusterAPI["/cluster/config/apiversion"]["GET"]['parameters'])
        },
        join: {
            /**
             * Get information needed to join this cluster over the connected node.
             * @endpoint GET /cluster/config/join
             * @allowToken 1
             * @permissions {"check": ["perm", "/", ["Sys.Audit"]]}
             *
             * Parameters:
             * - `node` (query, optional, string): The node for which the joinee gets the nodeinfo.
             */
            info: (...args: ArgsTuple<ClusterAPI["/cluster/config/join"]["GET"]['parameters']>) => client.request("/cluster/config/join", "GET", (args[0] ?? {}) as ClusterAPI["/cluster/config/join"]["GET"]['parameters']),
            /**
             * Joins this node into an existing cluster. If no links are given, default to IP resolved by node's hostname on single link (fallback fails for clusters with multiple links).
             * @endpoint POST /cluster/config/join
             * @allowToken 1
             *
             * Parameters:
             * - `fingerprint` (body, required, string): Certificate SHA 256 fingerprint.
             * - `force` (body, optional, boolean): Do not throw error if node already exists.
             * - `hostname` (body, required, string): Hostname (or IP) of an existing cluster member.
             * - `link[n]` (body, optional, string): Address and priority information of a single corosync link. (up to 8 links supported; link0..link7)
             * - `nodeid` (body, optional, number): Node id for this node.
             * - `password` (body, required, string): Superuser (root) password of peer node.
             * - `votes` (body, optional, number): Number of votes for this node
             */
            join: (...args: ArgsTuple<ClusterAPI["/cluster/config/join"]["POST"]['parameters']>) => client.request("/cluster/config/join", "POST", (args[0] ?? {}) as ClusterAPI["/cluster/config/join"]["POST"]['parameters'])
        },
        nodes: {
            /**
             * Corosync node list.
             * @endpoint GET /cluster/config/nodes
             * @allowToken 1
             * @permissions {"check": ["perm", "/", ["Sys.Audit"]]}
             */
            nodes: (...args: ArgsTuple<ClusterAPI["/cluster/config/nodes"]["GET"]['parameters']>) => client.request("/cluster/config/nodes", "GET", (args[0] ?? {}) as ClusterAPI["/cluster/config/nodes"]["GET"]['parameters']),
            node: (value: string | number) => ({
                /**
                 * Removes a node from the cluster configuration.
                 * @endpoint DELETE /cluster/config/nodes/{node}
                 * @allowToken 1
                 *
                 * Parameters:
                 * - `node` (path, required, string): The cluster node name.
                 */
                delete: (...args: ArgsTuple<PathContext<ClusterAPI["/cluster/config/nodes/{node}"]["DELETE"]['parameters']>>) => client.request("/cluster/config/nodes/{node}", "DELETE", {
                    ...((args[0]) as any),
                    $path: {"node": value.toString()}
                }),
                /**
                 * Adds a node to the cluster configuration. This call is for internal use.
                 * @endpoint POST /cluster/config/nodes/{node}
                 * @allowToken 1
                 *
                 * Parameters:
                 * - `apiversion` (body, optional, number): The JOIN_API_VERSION of the new node.
                 * - `force` (body, optional, boolean): Do not throw error if node already exists.
                 * - `link[n]` (body, optional, string): Address and priority information of a single corosync link. (up to 8 links supported; link0..link7)
                 * - `new_node_ip` (body, optional, string): IP Address of node to add. Used as fallback if no links are given.
                 * - `node` (path, required, string): The cluster node name.
                 * - `nodeid` (body, optional, number): Node id for this node.
                 * - `votes` (body, optional, number): Number of votes for this node
                 */
                add: (...args: ArgsTuple<PathContext<ClusterAPI["/cluster/config/nodes/{node}"]["POST"]['parameters']>>) => client.request("/cluster/config/nodes/{node}", "POST", {
                    ...((args[0]) as any),
                    $path: {node: value.toString()}
                })
            })
        },
        qdevice: {
            /**
             * Get QDevice status
             * @endpoint GET /cluster/config/qdevice
             * @allowToken 1
             * @permissions {"check": ["perm", "/", ["Sys.Audit"]]}
             */
            status: (...args: ArgsTuple<ClusterAPI["/cluster/config/qdevice"]["GET"]['parameters']>) => client.request("/cluster/config/qdevice", "GET", (args[0] ?? {}) as ClusterAPI["/cluster/config/qdevice"]["GET"]['parameters'])
        },
        /**
         * Get corosync totem protocol settings.
         * @endpoint GET /cluster/config/totem
         * @allowToken 1
         * @permissions {"check": ["perm", "/", ["Sys.Audit"]]}
         */
        totem: (...args: ArgsTuple<ClusterAPI["/cluster/config/totem"]["GET"]['parameters']>) => client.request("/cluster/config/totem", "GET", (args[0] ?? {}) as ClusterAPI["/cluster/config/totem"]["GET"]['parameters'])
    },
    firewall: {
        /**
         * Directory index.
         * @endpoint GET /cluster/firewall
         * @allowToken 1
         * @permissions {"user": "all"}
         */
        index: (...args: ArgsTuple<ClusterAPI["/cluster/firewall"]["GET"]['parameters']>) => client.request("/cluster/firewall", "GET", (args[0] ?? {}) as ClusterAPI["/cluster/firewall"]["GET"]['parameters']),
        aliases: {
            /**
             * List aliases
             * @endpoint GET /cluster/firewall/aliases
             * @allowToken 1
             * @permissions {"check": ["perm", "/", ["Sys.Audit"]]}
             */
            get_aliases: (...args: ArgsTuple<ClusterAPI["/cluster/firewall/aliases"]["GET"]['parameters']>) => client.request("/cluster/firewall/aliases", "GET", (args[0] ?? {}) as ClusterAPI["/cluster/firewall/aliases"]["GET"]['parameters']),
            /**
             * Create IP or Network Alias.
             * @endpoint POST /cluster/firewall/aliases
             * @allowToken 1
             * @permissions {"check": ["perm", "/", ["Sys.Modify"]]}
             *
             * Parameters:
             * - `cidr` (body, required, string): Network/IP specification in CIDR format.
             * - `comment` (body, optional, string)
             * - `name` (body, required, string): Alias name.
             */
            create_alias: (...args: ArgsTuple<ClusterAPI["/cluster/firewall/aliases"]["POST"]['parameters']>) => client.request("/cluster/firewall/aliases", "POST", (args[0] ?? {}) as ClusterAPI["/cluster/firewall/aliases"]["POST"]['parameters']),
            name: (value: string) => ({
                /**
                 * Remove IP or Network alias.
                 * @endpoint DELETE /cluster/firewall/aliases/{name}
                 * @allowToken 1
                 * @permissions {"check": ["perm", "/", ["Sys.Modify"]]}
                 *
                 * Parameters:
                 * - `digest` (query, optional, string): Prevent changes if current configuration file has a different digest. This can be used to prevent concurrent modifications.
                 * - `name` (path, required, string): Alias name.
                 */
                remove_alias: (...args: ArgsTuple<PathContext<ClusterAPI["/cluster/firewall/aliases/{name}"]["DELETE"]['parameters']>>) => client.request("/cluster/firewall/aliases/{name}", "DELETE", {
                    ...((args[0]) as any),
                    $path: {name: value}
                }),
                /**
                 * Read alias.
                 * @endpoint GET /cluster/firewall/aliases/{name}
                 * @allowToken 1
                 * @permissions {"check": ["perm", "/", ["Sys.Audit"]]}
                 *
                 * Parameters:
                 * - `name` (path, required, string): Alias name.
                 */
                read_alias: (...args: ArgsTuple<PathContext<ClusterAPI["/cluster/firewall/aliases/{name}"]["GET"]['parameters']>>) => client.request("/cluster/firewall/aliases/{name}", "GET", {
                    ...((args[0]) as any),
                    $path: {name: value}
                }),
                /**
                 * Update IP or Network alias.
                 * @endpoint PUT /cluster/firewall/aliases/{name}
                 * @allowToken 1
                 * @permissions {"check": ["perm", "/", ["Sys.Modify"]]}
                 *
                 * Parameters:
                 * - `cidr` (body, required, string): Network/IP specification in CIDR format.
                 * - `comment` (body, optional, string)
                 * - `digest` (body, optional, string): Prevent changes if current configuration file has a different digest. This can be used to prevent concurrent modifications.
                 * - `name` (path, required, string): Alias name.
                 * - `rename` (body, optional, string): Rename an existing alias.
                 */
                update_alias: (...args: ArgsTuple<PathContext<ClusterAPI["/cluster/firewall/aliases/{name}"]["PUT"]['parameters']>>) => client.request("/cluster/firewall/aliases/{name}", "PUT", {
                    ...((args[0]) as any),
                    $path: {name: value}
                }),
            })
        },
        groups: {
            /**
             * List security groups.
             * @endpoint GET /cluster/firewall/groups
             * @allowToken 1
             * @permissions {"user": "all"}
             */
            list_security_groups: (...args: ArgsTuple<ClusterAPI["/cluster/firewall/groups"]["GET"]['parameters']>) => client.request("/cluster/firewall/groups", "GET", (args[0] ?? {}) as ClusterAPI["/cluster/firewall/groups"]["GET"]['parameters']),
            /**
             * Create new security group.
             * @endpoint POST /cluster/firewall/groups
             * @allowToken 1
             * @permissions {"check": ["perm", "/", ["Sys.Modify"]]}
             *
             * Parameters:
             * - `comment` (body, optional, string)
             * - `digest` (body, optional, string): Prevent changes if current configuration file has a different digest. This can be used to prevent concurrent modifications.
             * - `group` (body, required, string): Security Group name.
             * - `rename` (body, optional, string): Rename/update an existing security group. You can set 'rename' to the same value as 'name' to update the 'comment' of an existing group.
             */
            create_security_group: (...args: ArgsTuple<ClusterAPI["/cluster/firewall/groups"]["POST"]['parameters']>) => client.request("/cluster/firewall/groups", "POST", (args[0] ?? {}) as ClusterAPI["/cluster/firewall/groups"]["POST"]['parameters']),
            group: (group: string) => ({
                /**
                 * Delete security group.
                 * @endpoint DELETE /cluster/firewall/groups/{group}
                 * @allowToken 1
                 * @permissions {"check": ["perm", "/", ["Sys.Modify"]]}
                 *
                 * Parameters:
                 * - `group` (path, required, string): Security Group name.
                 */
                delete_security_group: (...args: ArgsTuple<PathContext<ClusterAPI["/cluster/firewall/groups/{group}"]["DELETE"]['parameters']>>) => client.request("/cluster/firewall/groups/{group}", "DELETE", {
                    ...((args[0]) as any),
                    $path: {group}
                }),
                /**
                 * List rules.
                 * @endpoint GET /cluster/firewall/groups/{group}
                 * @allowToken 1
                 * @permissions {"check": ["perm", "/", ["Sys.Audit"]]}
                 *
                 * Parameters:
                 * - `group` (path, required, string): Security Group name.
                 */
                get_rules: (...args: ArgsTuple<PathContext<ClusterAPI["/cluster/firewall/groups/{group}"]["GET"]['parameters']>>) => client.request("/cluster/firewall/groups/{group}", "GET", {
                    ...((args[0]) as any),
                    $path: {group}
                }),
                /**
                 * Create new rule.
                 * @endpoint POST /cluster/firewall/groups/{group}
                 * @allowToken 1
                 * @permissions {"check": ["perm", "/", ["Sys.Modify"]]}
                 *
                 * Parameters:
                 * - `action` (body, required, string): Rule action ('ACCEPT', 'DROP', 'REJECT') or security group name.
                 * - `comment` (body, optional, string): Descriptive comment.
                 * - `dest` (body, optional, string): Restrict packet destination address. This can refer to a single IP address, an IP set ('+ipsetname') or an IP alias definition. You can also specify an address range like '20.34.101.207-201.3.9.99', or a list of IP addresses and networks (entries are separated by comma). Please do not mix IPv4 and IPv6 addresses inside such lists.
                 * - `digest` (body, optional, string): Prevent changes if current configuration file has a different digest. This can be used to prevent concurrent modifications.
                 * - `dport` (body, optional, string): Restrict TCP/UDP destination port. You can use service names or simple numbers (0-65535), as defined in '/etc/services'. Port ranges can be specified with '\d+:\d+', for example '80:85', and you can use comma separated list to match several ports or ranges.
                 * - `enable` (body, optional, number): Flag to enable/disable a rule.
                 * - `group` (path, required, string): Security Group name.
                 * - `icmp-type` (body, optional, string): Specify icmp-type. Only valid if proto equals 'icmp' or 'icmpv6'/'ipv6-icmp'.
                 * - `iface` (body, optional, string): Network interface name. You have to use network configuration key names for VMs and containers ('net\d+'). Host related rules can use arbitrary strings.
                 * - `log` (body, optional, "emerg" | "alert" | "crit" | "err" | "warning" | "notice" | "info" | "debug" | "nolog"): Log level for firewall rule.
                 * - `macro` (body, optional, string): Use predefined standard macro.
                 * - `pos` (body, optional, number): Update rule at position <pos>.
                 * - `proto` (body, optional, string): IP protocol. You can use protocol names ('tcp'/'udp') or simple numbers, as defined in '/etc/protocols'.
                 * - `source` (body, optional, string): Restrict packet source address. This can refer to a single IP address, an IP set ('+ipsetname') or an IP alias definition. You can also specify an address range like '20.34.101.207-201.3.9.99', or a list of IP addresses and networks (entries are separated by comma). Please do not mix IPv4 and IPv6 addresses inside such lists.
                 * - `sport` (body, optional, string): Restrict TCP/UDP source port. You can use service names or simple numbers (0-65535), as defined in '/etc/services'. Port ranges can be specified with '\d+:\d+', for example '80:85', and you can use comma separated list to match several ports or ranges.
                 * - `type` (body, required, "in" | "out" | "forward" | "group"): Rule type.
                 */
                create_rule: (...args: ArgsTuple<PathContext<ClusterAPI["/cluster/firewall/groups/{group}"]["POST"]['parameters']>>) => client.request("/cluster/firewall/groups/{group}", "POST", {
                    ...((args[0]) as any),
                    $path: {group}
                }),
                pos: (value: number) => ({
                    /**
                     * Delete rule.
                     * @endpoint DELETE /cluster/firewall/groups/{group}/{pos}
                     * @allowToken 1
                     * @permissions {"check": ["perm", "/", ["Sys.Modify"]]}
                     *
                     * Parameters:
                     * - `digest` (query, optional, string): Prevent changes if current configuration file has a different digest. This can be used to prevent concurrent modifications.
                     * - `group` (path, required, string): Security Group name.
                     * - `pos` (path, optional, number): Update rule at position <pos>.
                     */
                    delete_rule: (...args: ArgsTuple<PathContext<ClusterAPI["/cluster/firewall/groups/{group}/{pos}"]["DELETE"]['parameters']>>) => client.request("/cluster/firewall/groups/{group}/{pos}", "DELETE", {
                        ...((args[0]) as any),
                        $path: {group, pos: value}
                    }),
                    /**
                     * Get single rule data.
                     * @endpoint GET /cluster/firewall/groups/{group}/{pos}
                     * @allowToken 1
                     * @permissions {"check": ["perm", "/", ["Sys.Audit"]]}
                     *
                     * Parameters:
                     * - `group` (path, required, string): Security Group name.
                     * - `pos` (path, optional, number): Update rule at position <pos>.
                     */
                    get_rule: (...args: ArgsTuple<PathContext<ClusterAPI["/cluster/firewall/groups/{group}/{pos}"]["GET"]['parameters']>>) => client.request("/cluster/firewall/groups/{group}/{pos}", "GET", {
                        ...((args[0]) as any),
                        $path: {group, pos: value}
                    }),
                    /**
                     * Modify rule data.
                     * @endpoint PUT /cluster/firewall/groups/{group}/{pos}
                     * @allowToken 1
                     * @permissions {"check": ["perm", "/", ["Sys.Modify"]]}
                     *
                     * Parameters:
                     * - `action` (body, optional, string): Rule action ('ACCEPT', 'DROP', 'REJECT') or security group name.
                     * - `comment` (body, optional, string): Descriptive comment.
                     * - `delete` (body, optional, string): A list of settings you want to delete.
                     * - `dest` (body, optional, string): Restrict packet destination address. This can refer to a single IP address, an IP set ('+ipsetname') or an IP alias definition. You can also specify an address range like '20.34.101.207-201.3.9.99', or a list of IP addresses and networks (entries are separated by comma). Please do not mix IPv4 and IPv6 addresses inside such lists.
                     * - `digest` (body, optional, string): Prevent changes if current configuration file has a different digest. This can be used to prevent concurrent modifications.
                     * - `dport` (body, optional, string): Restrict TCP/UDP destination port. You can use service names or simple numbers (0-65535), as defined in '/etc/services'. Port ranges can be specified with '\d+:\d+', for example '80:85', and you can use comma separated list to match several ports or ranges.
                     * - `enable` (body, optional, number): Flag to enable/disable a rule.
                     * - `group` (path, required, string): Security Group name.
                     * - `icmp-type` (body, optional, string): Specify icmp-type. Only valid if proto equals 'icmp' or 'icmpv6'/'ipv6-icmp'.
                     * - `iface` (body, optional, string): Network interface name. You have to use network configuration key names for VMs and containers ('net\d+'). Host related rules can use arbitrary strings.
                     * - `log` (body, optional, "emerg" | "alert" | "crit" | "err" | "warning" | "notice" | "info" | "debug" | "nolog"): Log level for firewall rule.
                     * - `macro` (body, optional, string): Use predefined standard macro.
                     * - `moveto` (body, optional, number): Move rule to new position <moveto>. Other arguments are ignored.
                     * - `pos` (path, optional, number): Update rule at position <pos>.
                     * - `proto` (body, optional, string): IP protocol. You can use protocol names ('tcp'/'udp') or simple numbers, as defined in '/etc/protocols'.
                     * - `source` (body, optional, string): Restrict packet source address. This can refer to a single IP address, an IP set ('+ipsetname') or an IP alias definition. You can also specify an address range like '20.34.101.207-201.3.9.99', or a list of IP addresses and networks (entries are separated by comma). Please do not mix IPv4 and IPv6 addresses inside such lists.
                     * - `sport` (body, optional, string): Restrict TCP/UDP source port. You can use service names or simple numbers (0-65535), as defined in '/etc/services'. Port ranges can be specified with '\d+:\d+', for example '80:85', and you can use comma separated list to match several ports or ranges.
                     * - `type` (body, optional, "in" | "out" | "forward" | "group"): Rule type.
                     */
                    update_rule: (...args: ArgsTuple<PathContext<ClusterAPI["/cluster/firewall/groups/{group}/{pos}"]["PUT"]['parameters']>>) => client.request("/cluster/firewall/groups/{group}/{pos}", "PUT", {
                        ...((args[0]) as any),
                        $path: {group, pos: value}
                    }),
                })
            })
        },
        ipset: {
            /**
             * List IPSets
             * @endpoint GET /cluster/firewall/ipset
             * @allowToken 1
             * @permissions {"check": ["perm", "/", ["Sys.Audit"]]}
             */
            index: (...args: ArgsTuple<ClusterAPI["/cluster/firewall/ipset"]["GET"]['parameters']>) => client.request("/cluster/firewall/ipset", "GET", (args[0] ?? {}) as ClusterAPI["/cluster/firewall/ipset"]["GET"]['parameters']),
            /**
             * Create new IPSet
             * @endpoint POST /cluster/firewall/ipset
             * @allowToken 1
             * @permissions {"check": ["perm", "/", ["Sys.Modify"]]}
             *
             * Parameters:
             * - `comment` (body, optional, string)
             * - `digest` (body, optional, string): Prevent changes if current configuration file has a different digest. This can be used to prevent concurrent modifications.
             * - `name` (body, required, string): IP set name.
             * - `rename` (body, optional, string): Rename an existing IPSet. You can set 'rename' to the same value as 'name' to update the 'comment' of an existing IPSet.
             */
            create: (...args: ArgsTuple<ClusterAPI["/cluster/firewall/ipset"]["POST"]['parameters']>) => client.request("/cluster/firewall/ipset", "POST", (args[0] ?? {}) as ClusterAPI["/cluster/firewall/ipset"]["POST"]['parameters']),
            name: (name: string) => ({
                /**
                 * Delete IPSet
                 * @endpoint DELETE /cluster/firewall/ipset/{name}
                 * @allowToken 1
                 * @permissions {"check": ["perm", "/", ["Sys.Modify"]]}
                 *
                 * Parameters:
                 * - `force` (query, optional, boolean): Delete all members of the IPSet, if there are any.
                 * - `name` (path, required, string): IP set name.
                 */
                delete: (...args: ArgsTuple<PathContext<ClusterAPI["/cluster/firewall/ipset/{name}"]["DELETE"]['parameters']>>) => client.request("/cluster/firewall/ipset/{name}", "DELETE", {
                    ...((args[0]) as any),
                    $path: {name}
                }),
                /**
                 * List IPSet content
                 * @endpoint GET /cluster/firewall/ipset/{name}
                 * @allowToken 1
                 * @permissions {"check": ["perm", "/", ["Sys.Audit"]]}
                 *
                 * Parameters:
                 * - `name` (path, required, string): IP set name.
                 */
                get: (...args: ArgsTuple<PathContext<ClusterAPI["/cluster/firewall/ipset/{name}"]["GET"]['parameters']>>) => client.request("/cluster/firewall/ipset/{name}", "GET", {
                    ...((args[0]) as any),
                    $path: {name}
                }),
                /**
                 * Add IP or Network to IPSet.
                 * @endpoint POST /cluster/firewall/ipset/{name}
                 * @allowToken 1
                 * @permissions {"check": ["perm", "/", ["Sys.Modify"]]}
                 *
                 * Parameters:
                 * - `cidr` (body, required, string): Network/IP specification in CIDR format.
                 * - `comment` (body, optional, string)
                 * - `name` (path, required, string): IP set name.
                 * - `nomatch` (body, optional, boolean)
                 */
                create_ip: (...args: ArgsTuple<PathContext<ClusterAPI["/cluster/firewall/ipset/{name}"]["POST"]['parameters']>>) => client.request("/cluster/firewall/ipset/{name}", "POST", {
                    ...((args[0]) as any),
                    $path: {name}
                }),
                cidr: (cidr: string) => ({
                    /**
                     * Remove IP or Network from IPSet.
                     * @endpoint DELETE /cluster/firewall/ipset/{name}/{cidr}
                     * @allowToken 1
                     * @permissions {"check": ["perm", "/", ["Sys.Modify"]]}
                     *
                     * Parameters:
                     * - `cidr` (path, required, string): Network/IP specification in CIDR format.
                     * - `digest` (query, optional, string): Prevent changes if current configuration file has a different digest. This can be used to prevent concurrent modifications.
                     * - `name` (path, required, string): IP set name.
                     */
                    remove_ip: (...args: ArgsTuple<PathContext<ClusterAPI["/cluster/firewall/ipset/{name}/{cidr}"]["DELETE"]['parameters']>>) => client.request("/cluster/firewall/ipset/{name}/{cidr}", "DELETE", {
                        ...((args[0]) as any),
                        $path: {name, cidr}
                    }),
                    /**
                     * Read IP or Network settings from IPSet.
                     * @endpoint GET /cluster/firewall/ipset/{name}/{cidr}
                     * @allowToken 1
                     * @permissions {"check": ["perm", "/", ["Sys.Audit"]]}
                     *
                     * Parameters:
                     * - `cidr` (path, required, string): Network/IP specification in CIDR format.
                     * - `name` (path, required, string): IP set name.
                     */
                    read_ip: (...args: ArgsTuple<PathContext<ClusterAPI["/cluster/firewall/ipset/{name}/{cidr}"]["GET"]['parameters']>>) => client.request("/cluster/firewall/ipset/{name}/{cidr}", "GET", {
                        ...((args[0]) as any),
                        $path: {name, cidr}
                    }),
                    /**
                     * Update IP or Network settings
                     * @endpoint PUT /cluster/firewall/ipset/{name}/{cidr}
                     * @allowToken 1
                     * @permissions {"check": ["perm", "/", ["Sys.Modify"]]}
                     *
                     * Parameters:
                     * - `cidr` (path, required, string): Network/IP specification in CIDR format.
                     * - `comment` (body, optional, string)
                     * - `digest` (body, optional, string): Prevent changes if current configuration file has a different digest. This can be used to prevent concurrent modifications.
                     * - `name` (path, required, string): IP set name.
                     * - `nomatch` (body, optional, boolean)
                     */
                    update_ip: (...args: ArgsTuple<PathContext<ClusterAPI["/cluster/firewall/ipset/{name}/{cidr}"]["PUT"]['parameters']>>) => client.request("/cluster/firewall/ipset/{name}/{cidr}", "PUT", {
                        ...((args[0]) as any),
                        $path: {name, cidr}
                    }),
                })
            })
        },
        /**
         * List available macros
         * @endpoint GET /cluster/firewall/macros
         * @allowToken 1
         * @permissions {"user": "all"}
         */
        macros: (...args: ArgsTuple<ClusterAPI["/cluster/firewall/macros"]["GET"]['parameters']>) => client.request("/cluster/firewall/macros", "GET", (args[0] ?? {}) as ClusterAPI["/cluster/firewall/macros"]["GET"]['parameters']),
        options: {
            /**
             * Get Firewall options.
             * @endpoint GET /cluster/firewall/options
             * @allowToken 1
             * @permissions {"check": ["perm", "/", ["Sys.Audit"]]}
             */
            get: (...args: ArgsTuple<ClusterAPI["/cluster/firewall/options"]["GET"]['parameters']>) => client.request("/cluster/firewall/options", "GET", (args[0] ?? {}) as ClusterAPI["/cluster/firewall/options"]["GET"]['parameters']),
            /**
             * Set Firewall options.
             * @endpoint PUT /cluster/firewall/options
             * @allowToken 1
             * @permissions {"check": ["perm", "/", ["Sys.Modify"]]}
             *
             * Parameters:
             * - `delete` (body, optional, string): A list of settings you want to delete.
             * - `digest` (body, optional, string): Prevent changes if current configuration file has a different digest. This can be used to prevent concurrent modifications.
             * - `ebtables` (body, optional, boolean): Enable ebtables rules cluster wide.
             * - `enable` (body, optional, number): Enable or disable the firewall cluster wide.
             * - `log_ratelimit` (body, optional, string): Log ratelimiting settings
             * - `policy_forward` (body, optional, "ACCEPT" | "DROP"): Forward policy.
             * - `policy_in` (body, optional, "ACCEPT" | "REJECT" | "DROP"): Input policy.
             * - `policy_out` (body, optional, "ACCEPT" | "REJECT" | "DROP"): Output policy.
             */
            set: (...args: ArgsTuple<ClusterAPI["/cluster/firewall/options"]["PUT"]['parameters']>) => client.request("/cluster/firewall/options", "PUT", (args[0] ?? {}) as ClusterAPI["/cluster/firewall/options"]["PUT"]['parameters'])
        },
        /**
         * Lists possible IPSet/Alias reference which are allowed in source/dest properties.
         * @endpoint GET /cluster/firewall/refs
         * @allowToken 1
         * @permissions {"check": ["perm", "/", ["Sys.Audit"]]}
         *
         * Parameters:
         * - `type` (query, optional, "alias" | "ipset"): Only list references of specified type.
         */
        refs: (...args: ArgsTuple<ClusterAPI["/cluster/firewall/refs"]["GET"]['parameters']>) => client.request("/cluster/firewall/refs", "GET", (args[0] ?? {}) as ClusterAPI["/cluster/firewall/refs"]["GET"]['parameters']),
        rules: {
            /**
             * List rules.
             * @endpoint GET /cluster/firewall/rules
             * @allowToken 1
             * @permissions {"check": ["perm", "/", ["Sys.Audit"]]}
             */
            get: (...args: ArgsTuple<ClusterAPI["/cluster/firewall/rules"]["GET"]['parameters']>) => client.request("/cluster/firewall/rules", "GET", (args[0] ?? {}) as ClusterAPI["/cluster/firewall/rules"]["GET"]['parameters']),
            /**
             * Create new rule.
             * @endpoint POST /cluster/firewall/rules
             * @allowToken 1
             * @permissions {"check": ["perm", "/", ["Sys.Modify"]]}
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
             * - `pos` (body, optional, number): Update rule at position <pos>.
             * - `proto` (body, optional, string): IP protocol. You can use protocol names ('tcp'/'udp') or simple numbers, as defined in '/etc/protocols'.
             * - `source` (body, optional, string): Restrict packet source address. This can refer to a single IP address, an IP set ('+ipsetname') or an IP alias definition. You can also specify an address range like '20.34.101.207-201.3.9.99', or a list of IP addresses and networks (entries are separated by comma). Please do not mix IPv4 and IPv6 addresses inside such lists.
             * - `sport` (body, optional, string): Restrict TCP/UDP source port. You can use service names or simple numbers (0-65535), as defined in '/etc/services'. Port ranges can be specified with '\d+:\d+', for example '80:85', and you can use comma separated list to match several ports or ranges.
             * - `type` (body, required, "in" | "out" | "forward" | "group"): Rule type.
             */
            create: (...args: ArgsTuple<ClusterAPI["/cluster/firewall/rules"]["POST"]['parameters']>) => client.request("/cluster/firewall/rules", "POST", (args[0] ?? {}) as ClusterAPI["/cluster/firewall/rules"]["POST"]['parameters']),
            pos: (value: number) => ({
                /**
                 * Delete rule.
                 * @endpoint DELETE /cluster/firewall/rules/{pos}
                 * @allowToken 1
                 * @permissions {"check": ["perm", "/", ["Sys.Modify"]]}
                 *
                 * Parameters:
                 * - `digest` (query, optional, string): Prevent changes if current configuration file has a different digest. This can be used to prevent concurrent modifications.
                 * - `pos` (path, optional, number): Update rule at position <pos>.
                 */
                delete: (...args: ArgsTuple<PathContext<ClusterAPI["/cluster/firewall/rules/{pos}"]["DELETE"]['parameters']>>) => client.request("/cluster/firewall/rules/{pos}", "DELETE", {
                    ...((args[0]) as any),
                    $path: {pos: value}
                }),
                /**
                 * Get single rule data.
                 * @endpoint GET /cluster/firewall/rules/{pos}
                 * @allowToken 1
                 * @permissions {"check": ["perm", "/", ["Sys.Audit"]]}
                 *
                 * Parameters:
                 * - `pos` (path, optional, number): Update rule at position <pos>.
                 */
                get: (...args: ArgsTuple<PathContext<ClusterAPI["/cluster/firewall/rules/{pos}"]["GET"]['parameters']>>) => client.request("/cluster/firewall/rules/{pos}", "GET", {
                    ...((args[0]) as any),
                    $path: {pos: value}
                }),
                /**
                 * Modify rule data.
                 * @endpoint PUT /cluster/firewall/rules/{pos}
                 * @allowToken 1
                 * @permissions {"check": ["perm", "/", ["Sys.Modify"]]}
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
                 * - `pos` (path, optional, number): Update rule at position <pos>.
                 * - `proto` (body, optional, string): IP protocol. You can use protocol names ('tcp'/'udp') or simple numbers, as defined in '/etc/protocols'.
                 * - `source` (body, optional, string): Restrict packet source address. This can refer to a single IP address, an IP set ('+ipsetname') or an IP alias definition. You can also specify an address range like '20.34.101.207-201.3.9.99', or a list of IP addresses and networks (entries are separated by comma). Please do not mix IPv4 and IPv6 addresses inside such lists.
                 * - `sport` (body, optional, string): Restrict TCP/UDP source port. You can use service names or simple numbers (0-65535), as defined in '/etc/services'. Port ranges can be specified with '\d+:\d+', for example '80:85', and you can use comma separated list to match several ports or ranges.
                 * - `type` (body, optional, "in" | "out" | "forward" | "group"): Rule type.
                 */
                update: (...args: ArgsTuple<PathContext<ClusterAPI["/cluster/firewall/rules/{pos}"]["PUT"]['parameters']>>) => client.request("/cluster/firewall/rules/{pos}", "PUT", {
                    ...((args[0]) as any),
                    $path: {pos: value}
                }),
            })
        }
    },
    ha: {
        /**
         * Directory index.
         * @endpoint GET /cluster/ha
         * @allowToken 1
         * @permissions {"check": ["perm", "/", ["Sys.Audit"]]}
         */
        index: (...args: ArgsTuple<ClusterAPI["/cluster/ha"]["GET"]['parameters']>) => client.request("/cluster/ha", "GET", (args[0] ?? {}) as ClusterAPI["/cluster/ha"]["GET"]['parameters']),
        groups: {
            /**
             * Get HA groups. (deprecated in favor of HA rules)
             * @endpoint GET /cluster/ha/groups
             * @allowToken 1
             * @permissions {"check": ["perm", "/", ["Sys.Audit"]]}
             */
            index: (...args: ArgsTuple<ClusterAPI["/cluster/ha/groups"]["GET"]['parameters']>) => client.request("/cluster/ha/groups", "GET", (args[0] ?? {}) as ClusterAPI["/cluster/ha/groups"]["GET"]['parameters']),
            /**
             * Create a new HA group. (deprecated in favor of HA rules)
             * @endpoint POST /cluster/ha/groups
             * @allowToken 1
             * @permissions {"check": ["perm", "/", ["Sys.Console"]]}
             *
             * Parameters:
             * - `comment` (body, optional, string): Description.
             * - `group` (body, required, string): The HA group identifier.
             * - `nodes` (body, required, string): List of cluster node names with optional priority.
             * - `nofailback` (body, optional, boolean): The CRM tries to run services on the node with the highest priority. If a node with higher priority comes online, the CRM migrates the service to that node. Enabling nofailback prevents that behavior.
             * - `restricted` (body, optional, boolean): Resources bound to restricted groups may only run on nodes defined by the group.
             * - `type` (body, optional, "group"): Group type.
             */
            create: (...args: ArgsTuple<ClusterAPI["/cluster/ha/groups"]["POST"]['parameters']>) => client.request("/cluster/ha/groups", "POST", (args[0] ?? {}) as ClusterAPI["/cluster/ha/groups"]["POST"]['parameters']),
            group: (group: string) => ({
                /**
                 * Delete ha group configuration. (deprecated in favor of HA rules)
                 * @endpoint DELETE /cluster/ha/groups/{group}
                 * @allowToken 1
                 * @permissions {"check": ["perm", "/", ["Sys.Console"]]}
                 *
                 * Parameters:
                 * - `group` (path, required, string): The HA group identifier.
                 */
                delete: (...args: ArgsTuple<PathContext<ClusterAPI["/cluster/ha/groups/{group}"]["DELETE"]['parameters']>>) => client.request("/cluster/ha/groups/{group}", "DELETE", {
                    ...((args[0]) as any),
                    $path: {group}
                }),
                /**
                 * Read ha group configuration. (deprecated in favor of HA rules)
                 * @endpoint GET /cluster/ha/groups/{group}
                 * @allowToken 1
                 * @permissions {"check": ["perm", "/", ["Sys.Audit"]]}
                 *
                 * Parameters:
                 * - `group` (path, required, string): The HA group identifier.
                 */
                read: (...args: ArgsTuple<PathContext<ClusterAPI["/cluster/ha/groups/{group}"]["GET"]['parameters']>>) => client.request("/cluster/ha/groups/{group}", "GET", {
                    ...((args[0]) as any),
                    $path: {group}
                }),
                /**
                 * Update ha group configuration. (deprecated in favor of HA rules)
                 * @endpoint PUT /cluster/ha/groups/{group}
                 * @allowToken 1
                 * @permissions {"check": ["perm", "/", ["Sys.Console"]]}
                 *
                 * Parameters:
                 * - `comment` (body, optional, string): Description.
                 * - `delete` (body, optional, string): A list of settings you want to delete.
                 * - `digest` (body, optional, string): Prevent changes if current configuration file has a different digest. This can be used to prevent concurrent modifications.
                 * - `group` (path, required, string): The HA group identifier.
                 * - `nodes` (body, optional, string): List of cluster node names with optional priority.
                 * - `nofailback` (body, optional, boolean): The CRM tries to run services on the node with the highest priority. If a node with higher priority comes online, the CRM migrates the service to that node. Enabling nofailback prevents that behavior.
                 * - `restricted` (body, optional, boolean): Resources bound to restricted groups may only run on nodes defined by the group.
                 */
                update: (...args: ArgsTuple<PathContext<ClusterAPI["/cluster/ha/groups/{group}"]["PUT"]['parameters']>>) => client.request("/cluster/ha/groups/{group}", "PUT", {
                    ...((args[0]) as any),
                    $path: {group}
                }),
            })
        },
        resources: {
            /**
             * List HA resources.
             * @endpoint GET /cluster/ha/resources
             * @allowToken 1
             * @permissions {"check": ["perm", "/", ["Sys.Audit"]]}
             *
             * Parameters:
             * - `type` (query, optional, "ct" | "vm"): Only list resources of specific type
             */
            index: (...args: ArgsTuple<ClusterAPI["/cluster/ha/resources"]["GET"]['parameters']>) => client.request("/cluster/ha/resources", "GET", (args[0] ?? {}) as ClusterAPI["/cluster/ha/resources"]["GET"]['parameters']),
            /**
             * Create a new HA resource.
             * @endpoint POST /cluster/ha/resources
             * @allowToken 1
             * @permissions {"check": ["perm", "/", ["Sys.Console"]]}
             *
             * Parameters:
             * - `comment` (body, optional, string): Description.
             * - `failback` (body, optional, boolean): Automatically migrate HA resource to the node with the highest priority according to their node affinity  rules, if a node with a higher priority than the current node comes online.
             * - `group` (body, optional, string): The HA group identifier.
             * - `max_relocate` (body, optional, number): Maximal number of service relocate tries when a service failes to start.
             * - `max_restart` (body, optional, number): Maximal number of tries to restart the service on a node after its start failed.
             * - `sid` (body, required, string): HA resource ID. This consists of a resource type followed by a resource specific name, separated with colon (example: vm:100 / ct:100). For virtual machines and containers, you can simply use the VM or CT id as a shortcut (example: 100).
             * - `state` (body, optional, "started" | "stopped" | "enabled" | "disabled" | "ignored"): Requested resource state.
             * - `type` (body, optional, "ct" | "vm"): Resource type.
             */
            create: (...args: ArgsTuple<ClusterAPI["/cluster/ha/resources"]["POST"]['parameters']>) => client.request("/cluster/ha/resources", "POST", (args[0] ?? {}) as ClusterAPI["/cluster/ha/resources"]["POST"]['parameters']),
            sid: (sid: string) => ({
                /**
                 * Delete resource configuration.
                 * @endpoint DELETE /cluster/ha/resources/{sid}
                 * @allowToken 1
                 * @permissions {"check": ["perm", "/", ["Sys.Console"]]}
                 *
                 * Parameters:
                 * - `purge` (query, optional, boolean): Remove this resource from rules that reference it, deleting the rule if this resource is the only resource in the rule
                 * - `sid` (path, required, string): HA resource ID. This consists of a resource type followed by a resource specific name, separated with colon (example: vm:100 / ct:100). For virtual machines and containers, you can simply use the VM or CT id as a shortcut (example: 100).
                 */
                delete: (...args: ArgsTuple<PathContext<ClusterAPI["/cluster/ha/resources/{sid}"]["DELETE"]['parameters']>>) => client.request("/cluster/ha/resources/{sid}", "DELETE", {
                    ...((args[0]) as any),
                    $path: {sid}
                }),
                /**
                 * Read resource configuration.
                 * @endpoint GET /cluster/ha/resources/{sid}
                 * @allowToken 1
                 * @permissions {"check": ["perm", "/", ["Sys.Audit"]]}
                 *
                 * Parameters:
                 * - `sid` (path, required, string): HA resource ID. This consists of a resource type followed by a resource specific name, separated with colon (example: vm:100 / ct:100). For virtual machines and containers, you can simply use the VM or CT id as a shortcut (example: 100).
                 */
                read: (...args: ArgsTuple<PathContext<ClusterAPI["/cluster/ha/resources/{sid}"]["GET"]['parameters']>>) => client.request("/cluster/ha/resources/{sid}", "GET", {
                    ...((args[0]) as any),
                    $path: {sid}
                }),
                /**
                 * Update resource configuration.
                 * @endpoint PUT /cluster/ha/resources/{sid}
                 * @allowToken 1
                 * @permissions {"check": ["perm", "/", ["Sys.Console"]]}
                 *
                 * Parameters:
                 * - `comment` (body, optional, string): Description.
                 * - `delete` (body, optional, string): A list of settings you want to delete.
                 * - `digest` (body, optional, string): Prevent changes if current configuration file has a different digest. This can be used to prevent concurrent modifications.
                 * - `failback` (body, optional, boolean): Automatically migrate HA resource to the node with the highest priority according to their node affinity  rules, if a node with a higher priority than the current node comes online.
                 * - `group` (body, optional, string): The HA group identifier.
                 * - `max_relocate` (body, optional, number): Maximal number of service relocate tries when a service failes to start.
                 * - `max_restart` (body, optional, number): Maximal number of tries to restart the service on a node after its start failed.
                 * - `sid` (path, required, string): HA resource ID. This consists of a resource type followed by a resource specific name, separated with colon (example: vm:100 / ct:100). For virtual machines and containers, you can simply use the VM or CT id as a shortcut (example: 100).
                 * - `state` (body, optional, "started" | "stopped" | "enabled" | "disabled" | "ignored"): Requested resource state.
                 */
                update: (...args: ArgsTuple<PathContext<ClusterAPI["/cluster/ha/resources/{sid}"]["PUT"]['parameters']>>) => client.request("/cluster/ha/resources/{sid}", "PUT", {
                    ...((args[0]) as any),
                    $path: {sid}
                }),
                /**
                 * Request resource migration (online) to another node.
                 * @endpoint POST /cluster/ha/resources/{sid}/migrate
                 * @allowToken 1
                 * @permissions {"check": ["perm", "/", ["Sys.Console"]]}
                 *
                 * Parameters:
                 * - `node` (body, required, string): Target node.
                 * - `sid` (path, required, string): HA resource ID. This consists of a resource type followed by a resource specific name, separated with colon (example: vm:100 / ct:100). For virtual machines and containers, you can simply use the VM or CT id as a shortcut (example: 100).
                 */
                migrate: (...args: ArgsTuple<PathContext<ClusterAPI["/cluster/ha/resources/{sid}/migrate"]["POST"]['parameters']>>) => client.request("/cluster/ha/resources/{sid}/migrate", "POST", {
                    ...((args[0]) as any),
                    $path: {sid}
                }),
                /**
                 * Request resource relocatzion to another node. This stops the service on the old node, and restarts it on the target node.
                 * @endpoint POST /cluster/ha/resources/{sid}/relocate
                 * @allowToken 1
                 * @permissions {"check": ["perm", "/", ["Sys.Console"]]}
                 *
                 * Parameters:
                 * - `node` (body, required, string): Target node.
                 * - `sid` (path, required, string): HA resource ID. This consists of a resource type followed by a resource specific name, separated with colon (example: vm:100 / ct:100). For virtual machines and containers, you can simply use the VM or CT id as a shortcut (example: 100).
                 */
                relocate: (...args: ArgsTuple<PathContext<ClusterAPI["/cluster/ha/resources/{sid}/relocate"]["POST"]['parameters']>>) => client.request("/cluster/ha/resources/{sid}/relocate", "POST", {
                    ...((args[0]) as any),
                    $path: {sid}
                }),
            })
        },
        rules: {
            /**
             * Get HA rules.
             * @endpoint GET /cluster/ha/rules
             * @allowToken 1
             * @permissions {"check": ["perm", "/", ["Sys.Audit"]]}
             *
             * Parameters:
             * - `resource` (query, optional, string): Limit the returned list to rules affecting the specified resource.
             * - `type` (query, optional, "node-affinity" | "resource-affinity"): Limit the returned list to the specified rule type.
             */
            index: (...args: ArgsTuple<ClusterAPI["/cluster/ha/rules"]["GET"]['parameters']>) => client.request("/cluster/ha/rules", "GET", (args[0] ?? {}) as ClusterAPI["/cluster/ha/rules"]["GET"]['parameters']),
            /**
             * Create HA rule.
             * @endpoint POST /cluster/ha/rules
             * @allowToken 1
             * @permissions {"check": ["perm", "/", ["Sys.Console"]]}
             *
             * Parameters:
             * - `affinity` (body, optional, "positive" | "negative"): Describes whether the HA resources are supposed to be kept on the same node ('positive'), or are supposed to be kept on separate nodes ('negative').
             * - `comment` (body, optional, string): HA rule description.
             * - `disable` (body, optional, boolean): Whether the HA rule is disabled.
             * - `nodes` (body, optional, string): List of cluster node names with optional priority.
             * - `resources` (body, required, string): List of HA resource IDs. This consists of a list of resource types followed by a resource specific name separated with a colon (example: vm:100,ct:101).
             * - `rule` (body, required, string): HA rule identifier.
             * - `strict` (body, optional, boolean): Describes whether the node affinity rule is strict or non-strict.
             * - `type` (body, required, "node-affinity" | "resource-affinity"): HA rule type.
             */
            create_rule: (...args: ArgsTuple<ClusterAPI["/cluster/ha/rules"]["POST"]['parameters']>) => client.request("/cluster/ha/rules", "POST", (args[0] ?? {}) as ClusterAPI["/cluster/ha/rules"]["POST"]['parameters']),
            rule: (rule: string) => ({
                /**
                 * Delete HA rule.
                 * @endpoint DELETE /cluster/ha/rules/{rule}
                 * @allowToken 1
                 * @permissions {"check": ["perm", "/", ["Sys.Console"]]}
                 *
                 * Parameters:
                 * - `rule` (path, required, string): HA rule identifier.
                 */
                delete: (...args: ArgsTuple<PathContext<ClusterAPI["/cluster/ha/rules/{rule}"]["DELETE"]['parameters']>>) => client.request("/cluster/ha/rules/{rule}", "DELETE", {
                    ...((args[0]) as any),
                    $path: {rule}
                }),
                /**
                 * Read HA rule.
                 * @endpoint GET /cluster/ha/rules/{rule}
                 * @allowToken 1
                 * @permissions {"check": ["perm", "/", ["Sys.Audit"]]}
                 *
                 * Parameters:
                 * - `rule` (path, required, string): HA rule identifier.
                 */
                read: (...args: ArgsTuple<PathContext<ClusterAPI["/cluster/ha/rules/{rule}"]["GET"]['parameters']>>) => client.request("/cluster/ha/rules/{rule}", "GET", {
                    ...((args[0]) as any),
                    $path: {rule}
                }),
                /**
                 * Update HA rule.
                 * @endpoint PUT /cluster/ha/rules/{rule}
                 * @allowToken 1
                 * @permissions {"check": ["perm", "/", ["Sys.Console"]]}
                 *
                 * Parameters:
                 * - `affinity` (body, optional, "positive" | "negative"): Describes whether the HA resources are supposed to be kept on the same node ('positive'), or are supposed to be kept on separate nodes ('negative').
                 * - `comment` (body, optional, string): HA rule description.
                 * - `delete` (body, optional, string): A list of settings you want to delete.
                 * - `digest` (body, optional, string): Prevent changes if current configuration file has a different digest. This can be used to prevent concurrent modifications.
                 * - `disable` (body, optional, boolean): Whether the HA rule is disabled.
                 * - `nodes` (body, optional, string): List of cluster node names with optional priority.
                 * - `resources` (body, optional, string): List of HA resource IDs. This consists of a list of resource types followed by a resource specific name separated with a colon (example: vm:100,ct:101).
                 * - `rule` (path, required, string): HA rule identifier.
                 * - `strict` (body, optional, boolean): Describes whether the node affinity rule is strict or non-strict.
                 * - `type` (body, required, "node-affinity" | "resource-affinity"): HA rule type.
                 */
                update: (...args: ArgsTuple<PathContext<ClusterAPI["/cluster/ha/rules/{rule}"]["PUT"]['parameters']>>) => client.request("/cluster/ha/rules/{rule}", "PUT", {
                    ...((args[0]) as any),
                    $path: {rule}
                }),
            })
        },
        status: {
            /**
             * Directory index.
             * @endpoint GET /cluster/ha/status
             * @allowToken 1
             * @permissions {"user": "all"}
             */
            index: (...args: ArgsTuple<ClusterAPI["/cluster/ha/status"]["GET"]['parameters']>) => client.request("/cluster/ha/status", "GET", (args[0] ?? {}) as ClusterAPI["/cluster/ha/status"]["GET"]['parameters']),
            /**
             * Get HA manger status.
             * @endpoint GET /cluster/ha/status/current
             * @allowToken 1
             * @permissions {"check": ["perm", "/", ["Sys.Audit"]]}
             */
            current: (...args: ArgsTuple<ClusterAPI["/cluster/ha/status/current"]["GET"]['parameters']>) => client.request("/cluster/ha/status/current", "GET", (args[0] ?? {}) as ClusterAPI["/cluster/ha/status/current"]["GET"]['parameters']),
            /**
             * Get full HA manger status, including LRM status.
             * @endpoint GET /cluster/ha/status/manager_status
             * @allowToken 1
             * @permissions {"check": ["perm", "/", ["Sys.Audit"]]}
             */
            manager_status: (...args: ArgsTuple<ClusterAPI["/cluster/ha/status/manager_status"]["GET"]['parameters']>) => client.request("/cluster/ha/status/manager_status", "GET", (args[0] ?? {}) as ClusterAPI["/cluster/ha/status/manager_status"]["GET"]['parameters'])
        }
    },
    jobs: {
        /**
         * Index for jobs related endpoints.
         * @endpoint GET /cluster/jobs
         * @allowToken 1
         * @permissions {"user": "all"}
         */
        index: (...args: ArgsTuple<ClusterAPI["/cluster/jobs"]["GET"]['parameters']>) => client.request("/cluster/jobs", "GET", (args[0] ?? {}) as ClusterAPI["/cluster/jobs"]["GET"]['parameters']),
        realm_sync: {
            /**
             * List configured realm-sync-jobs.
             * @endpoint GET /cluster/jobs/realm-sync
             * @allowToken 1
             * @permissions {"check": ["perm", "/", ["Sys.Audit"]]}
             */
            index: (...args: ArgsTuple<ClusterAPI["/cluster/jobs/realm-sync"]["GET"]['parameters']>) => client.request("/cluster/jobs/realm-sync", "GET", (args[0] ?? {}) as ClusterAPI["/cluster/jobs/realm-sync"]["GET"]['parameters']),
            job: (id: string) => ({
                /**
                 * Delete realm-sync job definition.
                 * @endpoint DELETE /cluster/jobs/realm-sync/{id}
                 * @allowToken 1
                 * @permissions {"check": ["perm", "/", ["Sys.Modify"]]}
                 *
                 * Parameters:
                 * - `id` (path, required, string)
                 */
                delete: (...args: ArgsTuple<PathContext<ClusterAPI["/cluster/jobs/realm-sync/{id}"]["DELETE"]['parameters']>>) => client.request("/cluster/jobs/realm-sync/{id}", "DELETE", {
                    ...((args[0]) as any),
                    $path: {id}
                }),
                /**
                 * Read realm-sync job definition.
                 * @endpoint GET /cluster/jobs/realm-sync/{id}
                 * @allowToken 1
                 * @permissions {"check": ["perm", "/", ["Sys.Audit"]]}
                 *
                 * Parameters:
                 * - `id` (path, required, string)
                 */
                read: (...args: ArgsTuple<PathContext<ClusterAPI["/cluster/jobs/realm-sync/{id}"]["GET"]['parameters']>>) => client.request("/cluster/jobs/realm-sync/{id}", "GET", {
                    ...((args[0]) as any),
                    $path: {id}
                }),
                /**
                 * Create new realm-sync job.
                 * @endpoint POST /cluster/jobs/realm-sync/{id}
                 * @allowToken 1
                 * @permissions {"check": ["and", ["perm", "/access/realm/{realm}", ["Realm.AllocateUser"]], ["perm", "/access/groups", ["User.Modify"]]], "description": "'Realm.AllocateUser' on '/access/realm/<realm>' and 'User.Modify' permissions to '/access/groups/'."}
                 *
                 * Parameters:
                 * - `comment` (body, optional, string): Description for the Job.
                 * - `enable-new` (body, optional, boolean): Enable newly synced users immediately.
                 * - `enabled` (body, optional, boolean): Determines if the job is enabled.
                 * - `id` (path, required, string): The ID of the job.
                 * - `realm` (body, optional, string): Authentication domain ID
                 * - `remove-vanished` (body, optional, string): A semicolon-separated list of things to remove when they or the user vanishes during a sync. The following values are possible: 'entry' removes the user/group when not returned from the sync. 'properties' removes the set properties on existing user/group that do not appear in the source (even custom ones). 'acl' removes acls when the user/group is not returned from the sync. Instead of a list it also can be 'none' (the default).
                 * - `schedule` (body, required, string): Backup schedule. The format is a subset of `systemd` calendar events.
                 * - `scope` (body, optional, "users" | "groups" | "both"): Select what to sync.
                 */
                create: (...args: ArgsTuple<PathContext<ClusterAPI["/cluster/jobs/realm-sync/{id}"]["POST"]['parameters']>>) => client.request("/cluster/jobs/realm-sync/{id}", "POST", {
                    ...((args[0]) as any),
                    $path: {id}
                }),
                /**
                 * Update realm-sync job definition.
                 * @endpoint PUT /cluster/jobs/realm-sync/{id}
                 * @allowToken 1
                 * @permissions {"check": ["and", ["perm", "/access/realm/{realm}", ["Realm.AllocateUser"]], ["perm", "/access/groups", ["User.Modify"]]], "description": "'Realm.AllocateUser' on '/access/realm/<realm>' and 'User.Modify' permissions to '/access/groups/'."}
                 *
                 * Parameters:
                 * - `comment` (body, optional, string): Description for the Job.
                 * - `delete` (body, optional, string): A list of settings you want to delete.
                 * - `enable-new` (body, optional, boolean): Enable newly synced users immediately.
                 * - `enabled` (body, optional, boolean): Determines if the job is enabled.
                 * - `id` (path, required, string): The ID of the job.
                 * - `remove-vanished` (body, optional, string): A semicolon-separated list of things to remove when they or the user vanishes during a sync. The following values are possible: 'entry' removes the user/group when not returned from the sync. 'properties' removes the set properties on existing user/group that do not appear in the source (even custom ones). 'acl' removes acls when the user/group is not returned from the sync. Instead of a list it also can be 'none' (the default).
                 * - `schedule` (body, required, string): Backup schedule. The format is a subset of `systemd` calendar events.
                 * - `scope` (body, optional, "users" | "groups" | "both"): Select what to sync.
                 */
                update: (...args: ArgsTuple<PathContext<ClusterAPI["/cluster/jobs/realm-sync/{id}"]["PUT"]['parameters']>>) => client.request("/cluster/jobs/realm-sync/{id}", "PUT", {
                    ...((args[0]) as any),
                    $path: {id}
                }),
            })
        },
        /**
         * Returns a list of future schedule runtimes.
         * @endpoint GET /cluster/jobs/schedule-analyze
         * @allowToken 1
         * @permissions {"user": "all"}
         *
         * Parameters:
         * - `iterations` (query, optional, number): Number of event-iteration to simulate and return.
         * - `schedule` (query, required, string): Job schedule. The format is a subset of `systemd` calendar events.
         * - `starttime` (query, optional, number): UNIX timestamp to start the calculation from. Defaults to the current time.
         */
        schedule_analyze: (...args: ArgsTuple<ClusterAPI["/cluster/jobs/schedule-analyze"]["GET"]['parameters']>) => client.request("/cluster/jobs/schedule-analyze", "GET", (args[0] ?? {}) as ClusterAPI["/cluster/jobs/schedule-analyze"]["GET"]['parameters'])
    },
    /**
     * Read cluster log
     * @endpoint GET /cluster/log
     * @allowToken 1
     * @permissions {"description": "The user needs 'Sys.Syslog' on '/' in order to get all logs.", "user": "all"}
     *
     * Parameters:
     * - `max` (query, optional, number): Maximum number of entries.
     */
    log: (...args: ArgsTuple<ClusterAPI["/cluster/log"]["GET"]['parameters']>) => client.request("/cluster/log", "GET", (args[0] ?? {}) as ClusterAPI["/cluster/log"]["GET"]['parameters']),
    mapping: {
        /**
         * List resource types.
         * @endpoint GET /cluster/mapping
         * @allowToken 1
         * @permissions {"user": "all"}
         */
        index: (...args: ArgsTuple<ClusterAPI["/cluster/mapping"]["GET"]['parameters']>) => client.request("/cluster/mapping", "GET", (args[0] ?? {}) as ClusterAPI["/cluster/mapping"]["GET"]['parameters']),
        dir: {
            /**
             * List directory mapping
             * @endpoint GET /cluster/mapping/dir
             * @allowToken 1
             * @permissions {"description": "Only lists entries where you have 'Mapping.Modify', 'Mapping.Use' or 'Mapping.Audit' permissions on '/mapping/dir/<id>'.", "user": "all"}
             *
             * Parameters:
             * - `check-node` (query, optional, string): If given, checks the configurations on the given node for correctness, and adds relevant diagnostics for the directory to the response.
             */
            index: (...args: ArgsTuple<ClusterAPI["/cluster/mapping/dir"]["GET"]['parameters']>) => client.request("/cluster/mapping/dir", "GET", (args[0] ?? {}) as ClusterAPI["/cluster/mapping/dir"]["GET"]['parameters']),
            /**
             * Create a new directory mapping.
             * @endpoint POST /cluster/mapping/dir
             * @allowToken 1
             * @permissions {"check": ["perm", "/mapping/dir", ["Mapping.Modify"]]}
             *
             * Parameters:
             * - `description` (body, optional, string): Description of the directory mapping
             * - `id` (body, required, string): The ID of the directory mapping
             * - `map` (body, required, string[]): A list of maps for the cluster nodes.
             */
            create: (...args: ArgsTuple<ClusterAPI["/cluster/mapping/dir"]["POST"]['parameters']>) => client.request("/cluster/mapping/dir", "POST", (args[0] ?? {}) as ClusterAPI["/cluster/mapping/dir"]["POST"]['parameters']),
            id: (id: string) => ({
                /**
                 * Remove directory mapping.
                 * @endpoint DELETE /cluster/mapping/dir/{id}
                 * @allowToken 1
                 * @permissions {"check": ["perm", "/mapping/dir", ["Mapping.Modify"]]}
                 *
                 * Parameters:
                 * - `id` (path, required, string)
                 */
                delete: (...args: ArgsTuple<PathContext<ClusterAPI["/cluster/mapping/dir/{id}"]["DELETE"]['parameters']>>) => client.request("/cluster/mapping/dir/{id}", "DELETE", {
                    ...((args[0]) as any),
                    $path: {id}
                }),
                /**
                 * Get directory mapping.
                 * @endpoint GET /cluster/mapping/dir/{id}
                 * @allowToken 1
                 * @permissions {"check": ["or", ["perm", "/mapping/dir/{id}", ["Mapping.Use"]], ["perm", "/mapping/dir/{id}", ["Mapping.Modify"]], ["perm", "/mapping/dir/{id}", ["Mapping.Audit"]]]}
                 *
                 * Parameters:
                 * - `id` (path, required, string)
                 */
                get: (...args: ArgsTuple<PathContext<ClusterAPI["/cluster/mapping/dir/{id}"]["GET"]['parameters']>>) => client.request("/cluster/mapping/dir/{id}", "GET", {
                    ...((args[0]) as any),
                    $path: {id}
                }),
                /**
                 * Update a directory mapping.
                 * @endpoint PUT /cluster/mapping/dir/{id}
                 * @allowToken 1
                 * @permissions {"check": ["perm", "/mapping/dir/{id}", ["Mapping.Modify"]]}
                 *
                 * Parameters:
                 * - `delete` (body, optional, string): A list of settings you want to delete.
                 * - `description` (body, optional, string): Description of the directory mapping
                 * - `digest` (body, optional, string): Prevent changes if current configuration file has a different digest. This can be used to prevent concurrent modifications.
                 * - `id` (path, required, string): The ID of the directory mapping
                 * - `map` (body, optional, string[]): A list of maps for the cluster nodes.
                 */
                update: (...args: ArgsTuple<PathContext<ClusterAPI["/cluster/mapping/dir/{id}"]["PUT"]['parameters']>>) => client.request("/cluster/mapping/dir/{id}", "PUT", {
                    ...((args[0]) as any),
                    $path: {id}
                }),
            })
        },
        pci: {
            /**
             * List PCI Hardware Mapping
             * @endpoint GET /cluster/mapping/pci
             * @allowToken 1
             * @permissions {"description": "Only lists entries where you have 'Mapping.Modify', 'Mapping.Use' or 'Mapping.Audit' permissions on '/mapping/pci/<id>'.", "user": "all"}
             *
             * Parameters:
             * - `check-node` (query, optional, string): If given, checks the configurations on the given node for correctness, and adds relevant diagnostics for the devices to the response.
             */
            index: (...args: ArgsTuple<ClusterAPI["/cluster/mapping/pci"]["GET"]['parameters']>) => client.request("/cluster/mapping/pci", "GET", (args[0] ?? {}) as ClusterAPI["/cluster/mapping/pci"]["GET"]['parameters']),
            /**
             * Create a new hardware mapping.
             * @endpoint POST /cluster/mapping/pci
             * @allowToken 1
             * @permissions {"check": ["perm", "/mapping/pci", ["Mapping.Modify"]]}
             *
             * Parameters:
             * - `description` (body, optional, string): Description of the logical PCI device.
             * - `id` (body, required, string): The ID of the logical PCI mapping.
             * - `live-migration-capable` (body, optional, boolean): Marks the device(s) as being able to be live-migrated (Experimental). This needs hardware and driver support to work.
             * - `map` (body, required, string[]): A list of maps for the cluster nodes.
             * - `mdev` (body, optional, boolean): Marks the device(s) as being capable of providing mediated devices.
             */
            create: (...args: ArgsTuple<ClusterAPI["/cluster/mapping/pci"]["POST"]['parameters']>) => client.request("/cluster/mapping/pci", "POST", (args[0] ?? {}) as ClusterAPI["/cluster/mapping/pci"]["POST"]['parameters']),
            id: (id: string) => ({
                /**
                 * Remove Hardware Mapping.
                 * @endpoint DELETE /cluster/mapping/pci/{id}
                 * @allowToken 1
                 * @permissions {"check": ["perm", "/mapping/pci", ["Mapping.Modify"]]}
                 *
                 * Parameters:
                 * - `id` (path, required, string)
                 */
                delete: (...args: ArgsTuple<PathContext<ClusterAPI["/cluster/mapping/pci/{id}"]["DELETE"]['parameters']>>) => client.request("/cluster/mapping/pci/{id}", "DELETE", {
                    ...((args[0]) as any),
                    $path: {id}
                }),
                /**
                 * Get PCI Mapping.
                 * @endpoint GET /cluster/mapping/pci/{id}
                 * @allowToken 1
                 * @permissions {"check": ["or", ["perm", "/mapping/pci/{id}", ["Mapping.Use"]], ["perm", "/mapping/pci/{id}", ["Mapping.Modify"]], ["perm", "/mapping/pci/{id}", ["Mapping.Audit"]]]}
                 *
                 * Parameters:
                 * - `id` (path, required, string)
                 */
                get: (...args: ArgsTuple<PathContext<ClusterAPI["/cluster/mapping/pci/{id}"]["GET"]['parameters']>>) => client.request("/cluster/mapping/pci/{id}", "GET", {
                    ...((args[0]) as any),
                    $path: {id}
                }),
                /**
                 * Update a hardware mapping.
                 * @endpoint PUT /cluster/mapping/pci/{id}
                 * @allowToken 1
                 * @permissions {"check": ["perm", "/mapping/pci/{id}", ["Mapping.Modify"]]}
                 *
                 * Parameters:
                 * - `delete` (body, optional, string): A list of settings you want to delete.
                 * - `description` (body, optional, string): Description of the logical PCI device.
                 * - `digest` (body, optional, string): Prevent changes if current configuration file has a different digest. This can be used to prevent concurrent modifications.
                 * - `id` (path, required, string): The ID of the logical PCI mapping.
                 * - `live-migration-capable` (body, optional, boolean): Marks the device(s) as being able to be live-migrated (Experimental). This needs hardware and driver support to work.
                 * - `map` (body, optional, string[]): A list of maps for the cluster nodes.
                 * - `mdev` (body, optional, boolean): Marks the device(s) as being capable of providing mediated devices.
                 */
                update: (...args: ArgsTuple<PathContext<ClusterAPI["/cluster/mapping/pci/{id}"]["PUT"]['parameters']>>) => client.request("/cluster/mapping/pci/{id}", "PUT", {
                    ...((args[0]) as any),
                    $path: {id}
                }),
            })
        },
        usb: {
            /**
             * List USB Hardware Mappings
             * @endpoint GET /cluster/mapping/usb
             * @allowToken 1
             * @permissions {"description": "Only lists entries where you have 'Mapping.Modify', 'Mapping.Use' or 'Mapping.Audit' permissions on '/mapping/usb/<id>'.", "user": "all"}
             *
             * Parameters:
             * - `check-node` (query, optional, string): If given, checks the configurations on the given node for correctness, and adds relevant errors to the devices.
             */
            index: (...args: ArgsTuple<ClusterAPI["/cluster/mapping/usb"]["GET"]['parameters']>) => client.request("/cluster/mapping/usb", "GET", (args[0] ?? {}) as ClusterAPI["/cluster/mapping/usb"]["GET"]['parameters']),
            /**
             * Create a new hardware mapping.
             * @endpoint POST /cluster/mapping/usb
             * @allowToken 1
             * @permissions {"check": ["perm", "/mapping/usb", ["Mapping.Modify"]]}
             *
             * Parameters:
             * - `description` (body, optional, string): Description of the logical USB device.
             * - `id` (body, required, string): The ID of the logical USB mapping.
             * - `map` (body, required, string[]): A list of maps for the cluster nodes.
             */
            create: (...args: ArgsTuple<ClusterAPI["/cluster/mapping/usb"]["POST"]['parameters']>) => client.request("/cluster/mapping/usb", "POST", (args[0] ?? {}) as ClusterAPI["/cluster/mapping/usb"]["POST"]['parameters']),
            id: (id: string) => ({
                /**
                 * Remove Hardware Mapping.
                 * @endpoint DELETE /cluster/mapping/usb/{id}
                 * @allowToken 1
                 * @permissions {"check": ["perm", "/mapping/usb", ["Mapping.Modify"]]}
                 *
                 * Parameters:
                 * - `id` (path, required, string)
                 */
                delete: (...args: ArgsTuple<PathContext<ClusterAPI["/cluster/mapping/usb/{id}"]["DELETE"]['parameters']>>) => client.request("/cluster/mapping/usb/{id}", "DELETE", {
                    ...((args[0]) as any),
                    $path: {id}
                }),
                /**
                 * Get USB Mapping.
                 * @endpoint GET /cluster/mapping/usb/{id}
                 * @allowToken 1
                 * @permissions {"check": ["or", ["perm", "/mapping/usb/{id}", ["Mapping.Audit"]], ["perm", "/mapping/usb/{id}", ["Mapping.Use"]], ["perm", "/mapping/usb/{id}", ["Mapping.Modify"]]]}
                 *
                 * Parameters:
                 * - `id` (path, required, string)
                 */
                get: (...args: ArgsTuple<PathContext<ClusterAPI["/cluster/mapping/usb/{id}"]["GET"]['parameters']>>) => client.request("/cluster/mapping/usb/{id}", "GET", {
                    ...((args[0]) as any),
                    $path: {id}
                }),
                /**
                 * Update a hardware mapping.
                 * @endpoint PUT /cluster/mapping/usb/{id}
                 * @allowToken 1
                 * @permissions {"check": ["perm", "/mapping/usb/{id}", ["Mapping.Modify"]]}
                 *
                 * Parameters:
                 * - `delete` (body, optional, string): A list of settings you want to delete.
                 * - `description` (body, optional, string): Description of the logical USB device.
                 * - `digest` (body, optional, string): Prevent changes if current configuration file has a different digest. This can be used to prevent concurrent modifications.
                 * - `id` (path, required, string): The ID of the logical USB mapping.
                 * - `map` (body, required, string[]): A list of maps for the cluster nodes.
                 */
                update: (...args: ArgsTuple<PathContext<ClusterAPI["/cluster/mapping/usb/{id}"]["PUT"]['parameters']>>) => client.request("/cluster/mapping/usb/{id}", "PUT", {
                    ...((args[0]) as any),
                    $path: {id}
                }),
            })
        }
    },
    metrics: {
        /**
         * Metrics index.
         * @endpoint GET /cluster/metrics
         * @allowToken 1
         * @permissions {"user": "all"}
         */
        index: (...args: ArgsTuple<ClusterAPI["/cluster/metrics"]["GET"]['parameters']>) => client.request("/cluster/metrics", "GET", (args[0] ?? {}) as ClusterAPI["/cluster/metrics"]["GET"]['parameters']),
        /**
         * Retrieve metrics of the cluster.
         * @endpoint GET /cluster/metrics/export
         * @allowToken 1
         * @permissions {"check": ["perm", "/", ["Sys.Audit"]]}
         *
         * Parameters:
         * - `history` (query, optional, boolean): Also return historic values. Returns full available metric history unless `start-time` is also set
         * - `local-only` (query, optional, boolean): Only return metrics for the current node instead of the whole cluster
         * - `node-list` (query, optional, string): Only return metrics from nodes passed as comma-separated list
         * - `start-time` (query, optional, number): Only include metrics with a timestamp > start-time.
         */
        export: (...args: ArgsTuple<ClusterAPI["/cluster/metrics/export"]["GET"]['parameters']>) => client.request("/cluster/metrics/export", "GET", (args[0] ?? {}) as ClusterAPI["/cluster/metrics/export"]["GET"]['parameters']),
        server: {
            /**
             * List configured metric servers.
             * @endpoint GET /cluster/metrics/server
             * @allowToken 1
             * @permissions {"check": ["perm", "/", ["Sys.Audit"]]}
             */
            index: (...args: ArgsTuple<ClusterAPI["/cluster/metrics/server"]["GET"]['parameters']>) => client.request("/cluster/metrics/server", "GET", (args[0] ?? {}) as ClusterAPI["/cluster/metrics/server"]["GET"]['parameters']),
            id: (id: string) => ({
                /**
                 * Remove Metric server.
                 * @endpoint DELETE /cluster/metrics/server/{id}
                 * @allowToken 1
                 * @permissions {"check": ["perm", "/", ["Sys.Modify"]]}
                 *
                 * Parameters:
                 * - `id` (path, required, string)
                 */
                delete: (...args: ArgsTuple<PathContext<ClusterAPI["/cluster/metrics/server/{id}"]["DELETE"]['parameters']>>) => client.request("/cluster/metrics/server/{id}", "DELETE", {
                    ...((args[0]) as any),
                    $path: {id}
                }),
                /**
                 * Read metric server configuration.
                 * @endpoint GET /cluster/metrics/server/{id}
                 * @allowToken 1
                 * @permissions {"check": ["perm", "/", ["Sys.Audit"]]}
                 *
                 * Parameters:
                 * - `id` (path, required, string)
                 */
                read: (...args: ArgsTuple<PathContext<ClusterAPI["/cluster/metrics/server/{id}"]["GET"]['parameters']>>) => client.request("/cluster/metrics/server/{id}", "GET", {
                    ...((args[0]) as any),
                    $path: {id}
                }),
                /**
                 * Create a new external metric server config
                 * @endpoint POST /cluster/metrics/server/{id}
                 * @allowToken 1
                 * @permissions {"check": ["perm", "/", ["Sys.Modify"]]}
                 *
                 * Parameters:
                 * - `api-path-prefix` (body, optional, string): An API path prefix inserted between '<host>:<port>/' and '/api2/'. Can be useful if the InfluxDB service runs behind a reverse proxy.
                 * - `bucket` (body, optional, string): The InfluxDB bucket/db. Only necessary when using the http v2 api.
                 * - `disable` (body, optional, boolean): Flag to disable the plugin.
                 * - `id` (path, required, string): The ID of the entry.
                 * - `influxdbproto` (body, optional, "udp" | "http" | "https")
                 * - `max-body-size` (body, optional, number): InfluxDB max-body-size in bytes. Requests are batched up to this size.
                 * - `mtu` (body, optional, number): MTU for metrics transmission over UDP
                 * - `organization` (body, optional, string): The InfluxDB organization. Only necessary when using the http v2 api. Has no meaning when using v2 compatibility api.
                 * - `otel-compression` (body, optional, "none" | "gzip"): Compression algorithm for requests
                 * - `otel-headers` (body, optional, string): Custom HTTP headers (JSON format, base64 encoded)
                 * - `otel-max-body-size` (body, optional, number): Maximum request body size in bytes
                 * - `otel-path` (body, optional, string): OTLP endpoint path
                 * - `otel-protocol` (body, optional, "http" | "https"): HTTP protocol
                 * - `otel-resource-attributes` (body, optional, string): Additional resource attributes as JSON, base64 encoded
                 * - `otel-timeout` (body, optional, number): HTTP request timeout in seconds
                 * - `otel-verify-ssl` (body, optional, boolean): Verify SSL certificates
                 * - `path` (body, optional, string): root graphite path (ex: proxmox.mycluster.mykey)
                 * - `port` (body, required, number): server network port
                 * - `proto` (body, optional, "udp" | "tcp"): Protocol to send graphite data. TCP or UDP (default)
                 * - `server` (body, required, string): server dns name or IP address
                 * - `timeout` (body, optional, number): graphite TCP socket timeout (default=1)
                 * - `token` (body, optional, string): The InfluxDB access token. Only necessary when using the http v2 api. If the v2 compatibility api is used, use 'user:password' instead.
                 * - `type` (body, required, "graphite" | "influxdb" | "opentelemetry"): Plugin type.
                 * - `verify-certificate` (body, optional, boolean): Set to 0 to disable certificate verification for https endpoints.
                 */
                create: (...args: ArgsTuple<PathContext<ClusterAPI["/cluster/metrics/server/{id}"]["POST"]['parameters']>>) => client.request("/cluster/metrics/server/{id}", "POST", {
                    ...((args[0]) as any),
                    $path: {id}
                }),
                /**
                 * Update metric server configuration.
                 * @endpoint PUT /cluster/metrics/server/{id}
                 * @allowToken 1
                 * @permissions {"check": ["perm", "/", ["Sys.Modify"]]}
                 *
                 * Parameters:
                 * - `api-path-prefix` (body, optional, string): An API path prefix inserted between '<host>:<port>/' and '/api2/'. Can be useful if the InfluxDB service runs behind a reverse proxy.
                 * - `bucket` (body, optional, string): The InfluxDB bucket/db. Only necessary when using the http v2 api.
                 * - `delete` (body, optional, string): A list of settings you want to delete.
                 * - `digest` (body, optional, string): Prevent changes if current configuration file has a different digest. This can be used to prevent concurrent modifications.
                 * - `disable` (body, optional, boolean): Flag to disable the plugin.
                 * - `id` (path, required, string): The ID of the entry.
                 * - `influxdbproto` (body, optional, "udp" | "http" | "https")
                 * - `max-body-size` (body, optional, number): InfluxDB max-body-size in bytes. Requests are batched up to this size.
                 * - `mtu` (body, optional, number): MTU for metrics transmission over UDP
                 * - `organization` (body, optional, string): The InfluxDB organization. Only necessary when using the http v2 api. Has no meaning when using v2 compatibility api.
                 * - `otel-compression` (body, optional, "none" | "gzip"): Compression algorithm for requests
                 * - `otel-headers` (body, optional, string): Custom HTTP headers (JSON format, base64 encoded)
                 * - `otel-max-body-size` (body, optional, number): Maximum request body size in bytes
                 * - `otel-path` (body, optional, string): OTLP endpoint path
                 * - `otel-protocol` (body, optional, "http" | "https"): HTTP protocol
                 * - `otel-resource-attributes` (body, optional, string): Additional resource attributes as JSON, base64 encoded
                 * - `otel-timeout` (body, optional, number): HTTP request timeout in seconds
                 * - `otel-verify-ssl` (body, optional, boolean): Verify SSL certificates
                 * - `path` (body, optional, string): root graphite path (ex: proxmox.mycluster.mykey)
                 * - `port` (body, required, number): server network port
                 * - `proto` (body, optional, "udp" | "tcp"): Protocol to send graphite data. TCP or UDP (default)
                 * - `server` (body, required, string): server dns name or IP address
                 * - `timeout` (body, optional, number): graphite TCP socket timeout (default=1)
                 * - `token` (body, optional, string): The InfluxDB access token. Only necessary when using the http v2 api. If the v2 compatibility api is used, use 'user:password' instead.
                 * - `verify-certificate` (body, optional, boolean): Set to 0 to disable certificate verification for https endpoints.
                 */
                update: (...args: ArgsTuple<PathContext<ClusterAPI["/cluster/metrics/server/{id}"]["PUT"]['parameters']>>) => client.request("/cluster/metrics/server/{id}", "PUT", {
                    ...((args[0]) as any),
                    $path: {id}
                }),
            })
        }
    },
    /**
     * Get next free VMID. Pass a VMID to assert that its free (at time of check).
     * @endpoint GET /cluster/nextid
     * @allowToken 1
     * @permissions {"user": "all"}
     *
     * Parameters:
     * - `vmid` (query, optional, number): The (unique) ID of the VM.
     */
    nextid: (...args: ArgsTuple<ClusterAPI["/cluster/nextid"]["GET"]['parameters']>) => client.request("/cluster/nextid", "GET", (args[0] ?? {}) as ClusterAPI["/cluster/nextid"]["GET"]['parameters']),
    notifications: {
        /**
         * Index for notification-related API endpoints.
         * @endpoint GET /cluster/notifications
         * @allowToken 1
         * @permissions {"user": "all"}
         */
        index: (...args: ArgsTuple<ClusterAPI["/cluster/notifications"]["GET"]['parameters']>) => client.request("/cluster/notifications", "GET", (args[0] ?? {}) as ClusterAPI["/cluster/notifications"]["GET"]['parameters']),
        endpoints: {
            /**
             * Index for all available endpoint types.
             * @endpoint GET /cluster/notifications/endpoints
             * @allowToken 1
             * @permissions {"user": "all"}
             */
            index: (...args: ArgsTuple<ClusterAPI["/cluster/notifications/endpoints"]["GET"]['parameters']>) => client.request("/cluster/notifications/endpoints", "GET", (args[0] ?? {}) as ClusterAPI["/cluster/notifications/endpoints"]["GET"]['parameters']),
            gotify: {
                /**
                 * Returns a list of all gotify endpoints
                 * @endpoint GET /cluster/notifications/endpoints/gotify
                 * @allowToken 1
                 * @permissions {"check": ["perm", "/mapping/notifications", ["Mapping.Audit"]]}
                 */
                get_endpoints: (...args: ArgsTuple<ClusterAPI["/cluster/notifications/endpoints/gotify"]["GET"]['parameters']>) => client.request("/cluster/notifications/endpoints/gotify", "GET", (args[0] ?? {}) as ClusterAPI["/cluster/notifications/endpoints/gotify"]["GET"]['parameters']),
                /**
                 * Create a new gotify endpoint
                 * @endpoint POST /cluster/notifications/endpoints/gotify
                 * @allowToken 1
                 * @permissions {"check": ["and", ["perm", "/mapping/notifications", ["Mapping.Modify"]], ["or", ["perm", "/", ["Sys.Audit", "Sys.Modify"]], ["perm", "/", ["Sys.AccessNetwork"]]]]}
                 *
                 * Parameters:
                 * - `comment` (body, optional, string): Comment
                 * - `disable` (body, optional, boolean): Disable this target
                 * - `name` (body, required, string): The name of the endpoint.
                 * - `server` (body, required, string): Server URL
                 * - `token` (body, required, string): Secret token
                 */
                create_endpoint: (...args: ArgsTuple<ClusterAPI["/cluster/notifications/endpoints/gotify"]["POST"]['parameters']>) => client.request("/cluster/notifications/endpoints/gotify", "POST", (args[0] ?? {}) as ClusterAPI["/cluster/notifications/endpoints/gotify"]["POST"]['parameters']),
                endpoint: (name: string) => ({
                    /**
                     * Remove gotify endpoint
                     * @endpoint DELETE /cluster/notifications/endpoints/gotify/{name}
                     * @allowToken 1
                     * @permissions {"check": ["perm", "/mapping/notifications", ["Mapping.Modify"]]}
                     *
                     * Parameters:
                     * - `name` (path, required, string)
                     */
                    delete: (...args: ArgsTuple<PathContext<ClusterAPI["/cluster/notifications/endpoints/gotify/{name}"]["DELETE"]['parameters']>>) => client.request("/cluster/notifications/endpoints/gotify/{name}", "DELETE", {
                        ...((args[0]) as any),
                        $path: {name}
                    }),
                    /**
                     * Return a specific gotify endpoint
                     * @endpoint GET /cluster/notifications/endpoints/gotify/{name}
                     * @allowToken 1
                     * @permissions {"check": ["or", ["perm", "/mapping/notifications", ["Mapping.Modify"]], ["perm", "/mapping/notifications", ["Mapping.Audit"]]]}
                     *
                     * Parameters:
                     * - `name` (path, required, string): Name of the endpoint.
                     */
                    get: (...args: ArgsTuple<PathContext<ClusterAPI["/cluster/notifications/endpoints/gotify/{name}"]["GET"]['parameters']>>) => client.request("/cluster/notifications/endpoints/gotify/{name}", "GET", {
                        ...((args[0]) as any),
                        $path: {name}
                    }),
                    /**
                     * Update existing gotify endpoint
                     * @endpoint PUT /cluster/notifications/endpoints/gotify/{name}
                     * @allowToken 1
                     * @permissions {"check": ["and", ["perm", "/mapping/notifications", ["Mapping.Modify"]], ["or", ["perm", "/", ["Sys.Audit", "Sys.Modify"]], ["perm", "/", ["Sys.AccessNetwork"]]]]}
                     *
                     * Parameters:
                     * - `comment` (body, optional, string): Comment
                     * - `delete` (body, optional, string[]): A list of settings you want to delete.
                     * - `digest` (body, optional, string): Prevent changes if current configuration file has a different digest. This can be used to prevent concurrent modifications.
                     * - `disable` (body, optional, boolean): Disable this target
                     * - `name` (path, required, string): The name of the endpoint.
                     * - `server` (body, optional, string): Server URL
                     * - `token` (body, optional, string): Secret token
                     */
                    update: (...args: ArgsTuple<PathContext<ClusterAPI["/cluster/notifications/endpoints/gotify/{name}"]["PUT"]['parameters']>>) => client.request("/cluster/notifications/endpoints/gotify/{name}", "PUT", {
                        ...((args[0]) as any),
                        $path: {name}
                    })
                })
            },
            sendmail: {
                /**
                 * Returns a list of all sendmail endpoints
                 * @endpoint GET /cluster/notifications/endpoints/sendmail
                 * @allowToken 1
                 * @permissions {"check": ["or", ["perm", "/mapping/notifications", ["Mapping.Modify"]], ["perm", "/mapping/notifications", ["Mapping.Audit"]]]}
                 */
                get_endpoints: (...args: ArgsTuple<ClusterAPI["/cluster/notifications/endpoints/sendmail"]["GET"]['parameters']>) => client.request("/cluster/notifications/endpoints/sendmail", "GET", (args[0] ?? {}) as ClusterAPI["/cluster/notifications/endpoints/sendmail"]["GET"]['parameters']),
                /**
                 * Create a new sendmail endpoint
                 * @endpoint POST /cluster/notifications/endpoints/sendmail
                 * @allowToken 1
                 * @permissions {"check": ["and", ["perm", "/mapping/notifications", ["Mapping.Modify"]], ["or", ["perm", "/", ["Sys.Audit", "Sys.Modify"]], ["perm", "/", ["Sys.AccessNetwork"]]]]}
                 *
                 * Parameters:
                 * - `author` (body, optional, string): Author of the mail
                 * - `comment` (body, optional, string): Comment
                 * - `disable` (body, optional, boolean): Disable this target
                 * - `from-address` (body, optional, string): `From` address for the mail
                 * - `mailto` (body, optional, string[]): List of email recipients
                 * - `mailto-user` (body, optional, string[]): List of users
                 * - `name` (body, required, string): The name of the endpoint.
                 */
                create_sendmail_endpoint: (...args: ArgsTuple<ClusterAPI["/cluster/notifications/endpoints/sendmail"]["POST"]['parameters']>) => client.request("/cluster/notifications/endpoints/sendmail", "POST", (args[0] ?? {}) as ClusterAPI["/cluster/notifications/endpoints/sendmail"]["POST"]['parameters']),
                endpoint: (name: string) => ({
                    /**
                     * Remove sendmail endpoint
                     * @endpoint DELETE /cluster/notifications/endpoints/sendmail/{name}
                     * @allowToken 1
                     * @permissions {"check": ["perm", "/mapping/notifications", ["Mapping.Modify"]]}
                     *
                     * Parameters:
                     * - `name` (path, required, string)
                     */
                    delete: (...args: ArgsTuple<PathContext<ClusterAPI["/cluster/notifications/endpoints/sendmail/{name}"]["DELETE"]['parameters']>>) => client.request("/cluster/notifications/endpoints/sendmail/{name}", "DELETE", {
                        ...((args[0]) as any),
                        $path: {name}
                    }),
                    /**
                     * Return a specific sendmail endpoint
                     * @endpoint GET /cluster/notifications/endpoints/sendmail/{name}
                     * @allowToken 1
                     * @permissions {"check": ["or", ["perm", "/mapping/notifications", ["Mapping.Modify"]], ["perm", "/mapping/notifications", ["Mapping.Audit"]]]}
                     *
                     * Parameters:
                     * - `name` (path, required, string)
                     */
                    get: (...args: ArgsTuple<PathContext<ClusterAPI["/cluster/notifications/endpoints/sendmail/{name}"]["GET"]['parameters']>>) => client.request("/cluster/notifications/endpoints/sendmail/{name}", "GET", {
                        ...((args[0]) as any),
                        $path: {name}
                    }),
                    /**
                     * Update existing sendmail endpoint
                     * @endpoint PUT /cluster/notifications/endpoints/sendmail/{name}
                     * @allowToken 1
                     * @permissions {"check": ["and", ["perm", "/mapping/notifications", ["Mapping.Modify"]], ["or", ["perm", "/", ["Sys.Audit", "Sys.Modify"]], ["perm", "/", ["Sys.AccessNetwork"]]]]}
                     *
                     * Parameters:
                     * - `author` (body, optional, string): Author of the mail
                     * - `comment` (body, optional, string): Comment
                     * - `delete` (body, optional, string[]): A list of settings you want to delete.
                     * - `digest` (body, optional, string): Prevent changes if current configuration file has a different digest. This can be used to prevent concurrent modifications.
                     * - `disable` (body, optional, boolean): Disable this target
                     * - `from-address` (body, optional, string): `From` address for the mail
                     * - `mailto` (body, optional, string[]): List of email recipients
                     * - `mailto-user` (body, optional, string[]): List of users
                     * - `name` (path, required, string): The name of the endpoint.
                     */
                    update: (...args: ArgsTuple<PathContext<ClusterAPI["/cluster/notifications/endpoints/sendmail/{name}"]["PUT"]['parameters']>>) => client.request("/cluster/notifications/endpoints/sendmail/{name}", "PUT", {
                        ...((args[0]) as any),
                        $path: {name}
                    }),
                })
            },
            smtp: {
                /**
                 * Returns a list of all smtp endpoints
                 * @endpoint GET /cluster/notifications/endpoints/smtp
                 * @allowToken 1
                 * @permissions {"check": ["or", ["perm", "/mapping/notifications", ["Mapping.Modify"]], ["perm", "/mapping/notifications", ["Mapping.Audit"]]]}
                 */
                get_endpoints: (...args: ArgsTuple<ClusterAPI["/cluster/notifications/endpoints/smtp"]["GET"]['parameters']>) => client.request("/cluster/notifications/endpoints/smtp", "GET", (args[0] ?? {}) as ClusterAPI["/cluster/notifications/endpoints/smtp"]["GET"]['parameters']),
                /**
                 * Create a new smtp endpoint
                 * @endpoint POST /cluster/notifications/endpoints/smtp
                 * @allowToken 1
                 * @permissions {"check": ["and", ["perm", "/mapping/notifications", ["Mapping.Modify"]], ["or", ["perm", "/", ["Sys.Audit", "Sys.Modify"]], ["perm", "/", ["Sys.AccessNetwork"]]]]}
                 *
                 * Parameters:
                 * - `author` (body, optional, string): Author of the mail. Defaults to 'Proxmox VE'.
                 * - `comment` (body, optional, string): Comment
                 * - `disable` (body, optional, boolean): Disable this target
                 * - `from-address` (body, required, string): `From` address for the mail
                 * - `mailto` (body, optional, string[]): List of email recipients
                 * - `mailto-user` (body, optional, string[]): List of users
                 * - `mode` (body, optional, "insecure" | "starttls" | "tls"): Determine which encryption method shall be used for the connection.
                 * - `name` (body, required, string): The name of the endpoint.
                 * - `password` (body, optional, string): Password for SMTP authentication
                 * - `port` (body, optional, number): The port to be used. Defaults to 465 for TLS based connections, 587 for STARTTLS based connections and port 25 for insecure plain-text connections.
                 * - `server` (body, required, string): The address of the SMTP server.
                 * - `username` (body, optional, string): Username for SMTP authentication
                 */
                create_endpoint: (...args: ArgsTuple<ClusterAPI["/cluster/notifications/endpoints/smtp"]["POST"]['parameters']>) => client.request("/cluster/notifications/endpoints/smtp", "POST", (args[0] ?? {}) as ClusterAPI["/cluster/notifications/endpoints/smtp"]["POST"]['parameters']),
                endpoint: (name: string) => ({
                    /**
                     * Remove smtp endpoint
                     * @endpoint DELETE /cluster/notifications/endpoints/smtp/{name}
                     * @allowToken 1
                     * @permissions {"check": ["perm", "/mapping/notifications", ["Mapping.Modify"]]}
                     *
                     * Parameters:
                     * - `name` (path, required, string)
                     */
                    delete: (...args: ArgsTuple<PathContext<ClusterAPI["/cluster/notifications/endpoints/smtp/{name}"]["DELETE"]['parameters']>>) => client.request("/cluster/notifications/endpoints/smtp/{name}", "DELETE", {
                        ...((args[0]) as any),
                        $path: {name}
                    }),
                    /**
                     * Return a specific smtp endpoint
                     * @endpoint GET /cluster/notifications/endpoints/smtp/{name}
                     * @allowToken 1
                     * @permissions {"check": ["or", ["perm", "/mapping/notifications", ["Mapping.Modify"]], ["perm", "/mapping/notifications", ["Mapping.Audit"]]]}
                     *
                     * Parameters:
                     * - `name` (path, required, string)
                     */
                    get: (...args: ArgsTuple<PathContext<ClusterAPI["/cluster/notifications/endpoints/smtp/{name}"]["GET"]['parameters']>>) => client.request("/cluster/notifications/endpoints/smtp/{name}", "GET", {
                        ...((args[0]) as any),
                        $path: {name}
                    }),
                    /**
                     * Update existing smtp endpoint
                     * @endpoint PUT /cluster/notifications/endpoints/smtp/{name}
                     * @allowToken 1
                     * @permissions {"check": ["and", ["perm", "/mapping/notifications", ["Mapping.Modify"]], ["or", ["perm", "/", ["Sys.Audit", "Sys.Modify"]], ["perm", "/", ["Sys.AccessNetwork"]]]]}
                     *
                     * Parameters:
                     * - `author` (body, optional, string): Author of the mail. Defaults to 'Proxmox VE'.
                     * - `comment` (body, optional, string): Comment
                     * - `delete` (body, optional, string[]): A list of settings you want to delete.
                     * - `digest` (body, optional, string): Prevent changes if current configuration file has a different digest. This can be used to prevent concurrent modifications.
                     * - `disable` (body, optional, boolean): Disable this target
                     * - `from-address` (body, optional, string): `From` address for the mail
                     * - `mailto` (body, optional, string[]): List of email recipients
                     * - `mailto-user` (body, optional, string[]): List of users
                     * - `mode` (body, optional, "insecure" | "starttls" | "tls"): Determine which encryption method shall be used for the connection.
                     * - `name` (path, required, string): The name of the endpoint.
                     * - `password` (body, optional, string): Password for SMTP authentication
                     * - `port` (body, optional, number): The port to be used. Defaults to 465 for TLS based connections, 587 for STARTTLS based connections and port 25 for insecure plain-text connections.
                     * - `server` (body, optional, string): The address of the SMTP server.
                     * - `username` (body, optional, string): Username for SMTP authentication
                     */
                    update: (...args: ArgsTuple<PathContext<ClusterAPI["/cluster/notifications/endpoints/smtp/{name}"]["PUT"]['parameters']>>) => client.request("/cluster/notifications/endpoints/smtp/{name}", "PUT", {
                        ...((args[0]) as any),
                        $path: {name}
                    }),
                })
            },
            webhook: {
                /**
                 * Returns a list of all webhook endpoints
                 * @endpoint GET /cluster/notifications/endpoints/webhook
                 * @allowToken 1
                 * @permissions {"check": ["perm", "/mapping/notifications", ["Mapping.Audit"]]}
                 */
                index: (...args: ArgsTuple<ClusterAPI["/cluster/notifications/endpoints/webhook"]["GET"]['parameters']>) => client.request("/cluster/notifications/endpoints/webhook", "GET", (args[0] ?? {}) as ClusterAPI["/cluster/notifications/endpoints/webhook"]["GET"]['parameters']),
                /**
                 * Create a new webhook endpoint
                 * @endpoint POST /cluster/notifications/endpoints/webhook
                 * @allowToken 1
                 * @permissions {"check": ["and", ["perm", "/mapping/notifications", ["Mapping.Modify"]], ["or", ["perm", "/", ["Sys.Audit", "Sys.Modify"]], ["perm", "/", ["Sys.AccessNetwork"]]]]}
                 *
                 * Parameters:
                 * - `body` (body, optional, string): HTTP body, base64 encoded
                 * - `comment` (body, optional, string): Comment
                 * - `disable` (body, optional, boolean): Disable this target
                 * - `header` (body, optional, string[]): HTTP headers to set. These have to be formatted as a property string in the format name=<name>,value=<base64 of value>
                 * - `method` (body, required, "post" | "put" | "get"): HTTP method
                 * - `name` (body, required, string): The name of the endpoint.
                 * - `secret` (body, optional, string[]): Secrets to set. These have to be formatted as a property string in the format name=<name>,value=<base64 of value>
                 * - `url` (body, required, string): Server URL
                 */
                create: (...args: ArgsTuple<ClusterAPI["/cluster/notifications/endpoints/webhook"]["POST"]['parameters']>) => client.request("/cluster/notifications/endpoints/webhook", "POST", (args[0] ?? {}) as ClusterAPI["/cluster/notifications/endpoints/webhook"]["POST"]['parameters']),
                endpoint: (name: string) => ({
                    /**
                     * Remove webhook endpoint
                     * @endpoint DELETE /cluster/notifications/endpoints/webhook/{name}
                     * @allowToken 1
                     * @permissions {"check": ["perm", "/mapping/notifications", ["Mapping.Modify"]]}
                     *
                     * Parameters:
                     * - `name` (path, required, string)
                     */
                    delete: (...args: ArgsTuple<PathContext<ClusterAPI["/cluster/notifications/endpoints/webhook/{name}"]["DELETE"]['parameters']>>) => client.request("/cluster/notifications/endpoints/webhook/{name}", "DELETE", {
                        ...((args[0]) as any),
                        $path: {name}
                    }),
                    /**
                     * Return a specific webhook endpoint
                     * @endpoint GET /cluster/notifications/endpoints/webhook/{name}
                     * @allowToken 1
                     * @permissions {"check": ["or", ["perm", "/mapping/notifications", ["Mapping.Modify"]], ["perm", "/mapping/notifications", ["Mapping.Audit"]]]}
                     *
                     * Parameters:
                     * - `name` (path, required, string): Name of the endpoint.
                     */
                    get: (...args: ArgsTuple<PathContext<ClusterAPI["/cluster/notifications/endpoints/webhook/{name}"]["GET"]['parameters']>>) => client.request("/cluster/notifications/endpoints/webhook/{name}", "GET", {
                        ...((args[0]) as any),
                        $path: {name}
                    }),
                    /**
                     * Update existing webhook endpoint
                     * @endpoint PUT /cluster/notifications/endpoints/webhook/{name}
                     * @allowToken 1
                     * @permissions {"check": ["and", ["perm", "/mapping/notifications", ["Mapping.Modify"]], ["or", ["perm", "/", ["Sys.Audit", "Sys.Modify"]], ["perm", "/", ["Sys.AccessNetwork"]]]]}
                     *
                     * Parameters:
                     * - `body` (body, optional, string): HTTP body, base64 encoded
                     * - `comment` (body, optional, string): Comment
                     * - `delete` (body, optional, string[]): A list of settings you want to delete.
                     * - `digest` (body, optional, string): Prevent changes if current configuration file has a different digest. This can be used to prevent concurrent modifications.
                     * - `disable` (body, optional, boolean): Disable this target
                     * - `header` (body, optional, string[]): HTTP headers to set. These have to be formatted as a property string in the format name=<name>,value=<base64 of value>
                     * - `method` (body, optional, "post" | "put" | "get"): HTTP method
                     * - `name` (path, required, string): The name of the endpoint.
                     * - `secret` (body, optional, string[]): Secrets to set. These have to be formatted as a property string in the format name=<name>,value=<base64 of value>
                     * - `url` (body, optional, string): Server URL
                     */
                    update: (...args: ArgsTuple<PathContext<ClusterAPI["/cluster/notifications/endpoints/webhook/{name}"]["PUT"]['parameters']>>) => client.request("/cluster/notifications/endpoints/webhook/{name}", "PUT", {
                        ...((args[0]) as any),
                        $path: {name}
                    }),
                })
            }
        },
        /**
         * Returns known notification metadata fields and their known values
         * @endpoint GET /cluster/notifications/matcher-field-values
         * @allowToken 1
         * @permissions {"check": ["or", ["perm", "/mapping/notifications", ["Mapping.Modify"]], ["perm", "/mapping/notifications", ["Mapping.Audit"]]]}
         */
        matcher_field_values: (...args: ArgsTuple<ClusterAPI["/cluster/notifications/matcher-field-values"]["GET"]['parameters']>) => client.request("/cluster/notifications/matcher-field-values", "GET", (args[0] ?? {}) as ClusterAPI["/cluster/notifications/matcher-field-values"]["GET"]['parameters']),
        /**
         * Returns known notification metadata fields
         * @endpoint GET /cluster/notifications/matcher-fields
         * @allowToken 1
         * @permissions {"check": ["or", ["perm", "/mapping/notifications", ["Mapping.Modify"]], ["perm", "/mapping/notifications", ["Mapping.Audit"]]]}
         */
        matcher_fields: (...args: ArgsTuple<ClusterAPI["/cluster/notifications/matcher-fields"]["GET"]['parameters']>) => client.request("/cluster/notifications/matcher-fields", "GET", (args[0] ?? {}) as ClusterAPI["/cluster/notifications/matcher-fields"]["GET"]['parameters']),
        matchers: {
            /**
             * Returns a list of all matchers
             * @endpoint GET /cluster/notifications/matchers
             * @allowToken 1
             * @permissions {"check": ["or", ["perm", "/mapping/notifications", ["Mapping.Modify"]], ["perm", "/mapping/notifications", ["Mapping.Audit"]], ["perm", "/mapping/notifications", ["Mapping.Use"]]]}
             */
            index: (...args: ArgsTuple<ClusterAPI["/cluster/notifications/matchers"]["GET"]['parameters']>) => client.request("/cluster/notifications/matchers", "GET", (args[0] ?? {}) as ClusterAPI["/cluster/notifications/matchers"]["GET"]['parameters']),
            /**
             * Create a new matcher
             * @endpoint POST /cluster/notifications/matchers
             * @allowToken 1
             * @permissions {"check": ["perm", "/mapping/notifications", ["Mapping.Modify"]]}
             *
             * Parameters:
             * - `comment` (body, optional, string): Comment
             * - `disable` (body, optional, boolean): Disable this matcher
             * - `invert-match` (body, optional, boolean): Invert match of the whole matcher
             * - `match-calendar` (body, optional, string[]): Match notification timestamp
             * - `match-field` (body, optional, string[]): Metadata fields to match (regex or exact match). Must be in the form (regex|exact):<field>=<value>
             * - `match-severity` (body, optional, string[]): Notification severities to match
             * - `mode` (body, optional, "all" | "any"): Choose between 'all' and 'any' for when multiple properties are specified
             * - `name` (body, required, string): Name of the matcher.
             * - `target` (body, optional, string[]): Targets to notify on match
             */
            create: (...args: ArgsTuple<ClusterAPI["/cluster/notifications/matchers"]["POST"]['parameters']>) => client.request("/cluster/notifications/matchers", "POST", (args[0] ?? {}) as ClusterAPI["/cluster/notifications/matchers"]["POST"]['parameters']),
            matcher: (name: string) => ({
                /**
                 * Remove matcher
                 * @endpoint DELETE /cluster/notifications/matchers/{name}
                 * @allowToken 1
                 * @permissions {"check": ["perm", "/mapping/notifications", ["Mapping.Modify"]]}
                 *
                 * Parameters:
                 * - `name` (path, required, string)
                 */
                delete: (...args: ArgsTuple<PathContext<ClusterAPI["/cluster/notifications/matchers/{name}"]["DELETE"]['parameters']>>) => client.request("/cluster/notifications/matchers/{name}", "DELETE", {
                    ...((args[0]) as any),
                    $path: {name}
                }),
                /**
                 * Return a specific matcher
                 * @endpoint GET /cluster/notifications/matchers/{name}
                 * @allowToken 1
                 * @permissions {"check": ["or", ["perm", "/mapping/notifications", ["Mapping.Modify"]], ["perm", "/mapping/notifications", ["Mapping.Audit"]]]}
                 *
                 * Parameters:
                 * - `name` (path, required, string)
                 */
                get: (...args: ArgsTuple<PathContext<ClusterAPI["/cluster/notifications/matchers/{name}"]["GET"]['parameters']>>) => client.request("/cluster/notifications/matchers/{name}", "GET", {
                    ...((args[0]) as any),
                    $path: {name}
                }),
                /**
                 * Update existing matcher
                 * @endpoint PUT /cluster/notifications/matchers/{name}
                 * @allowToken 1
                 * @permissions {"check": ["perm", "/mapping/notifications", ["Mapping.Modify"]]}
                 *
                 * Parameters:
                 * - `comment` (body, optional, string): Comment
                 * - `delete` (body, optional, string[]): A list of settings you want to delete.
                 * - `digest` (body, optional, string): Prevent changes if current configuration file has a different digest. This can be used to prevent concurrent modifications.
                 * - `disable` (body, optional, boolean): Disable this matcher
                 * - `invert-match` (body, optional, boolean): Invert match of the whole matcher
                 * - `match-calendar` (body, optional, string[]): Match notification timestamp
                 * - `match-field` (body, optional, string[]): Metadata fields to match (regex or exact match). Must be in the form (regex|exact):<field>=<value>
                 * - `match-severity` (body, optional, string[]): Notification severities to match
                 * - `mode` (body, optional, "all" | "any"): Choose between 'all' and 'any' for when multiple properties are specified
                 * - `name` (path, required, string): Name of the matcher.
                 * - `target` (body, optional, string[]): Targets to notify on match
                 */
                update: (...args: ArgsTuple<PathContext<ClusterAPI["/cluster/notifications/matchers/{name}"]["PUT"]['parameters']>>) => client.request("/cluster/notifications/matchers/{name}", "PUT", {
                    ...((args[0]) as any),
                    $path: {name}
                }),
            })
        },
        targets: {
            /**
             * Returns a list of all entities that can be used as notification targets.
             * @endpoint GET /cluster/notifications/targets
             * @allowToken 1
             * @permissions {"check": ["or", ["perm", "/mapping/notifications", ["Mapping.Modify"]], ["perm", "/mapping/notifications", ["Mapping.Audit"]], ["perm", "/mapping/notifications", ["Mapping.Use"]]]}
             */
            get_all_targets: (...args: ArgsTuple<ClusterAPI["/cluster/notifications/targets"]["GET"]['parameters']>) => client.request("/cluster/notifications/targets", "GET", (args[0] ?? {}) as ClusterAPI["/cluster/notifications/targets"]["GET"]['parameters']),
            name: (name: string) => ({
                test: {
                    /**
                     * Send a test notification to a provided target.
                     * @endpoint POST /cluster/notifications/targets/{name}/test
                     * @allowToken 1
                     * @permissions {"check": ["or", ["perm", "/mapping/notifications", ["Mapping.Modify"]], ["perm", "/mapping/notifications", ["Mapping.Audit"]], ["perm", "/mapping/notifications", ["Mapping.Use"]]]}
                     *
                     * Parameters:
                     * - `name` (path, required, string): Name of the target.
                     */
                    test_target: (...args: ArgsTuple<PathContext<ClusterAPI["/cluster/notifications/targets/{name}/test"]["POST"]['parameters']>>) => client.request("/cluster/notifications/targets/{name}/test", "POST", {
                        ...((args[0]) as any),
                        $path: {name}
                    }),
                }
            })
        }
    },
    options: {
        /**
         * Get datacenter options. Without 'Sys.Audit' on '/' not all options are returned.
         * @endpoint GET /cluster/options
         * @allowToken 1
         * @permissions {"check": ["perm", "/", ["Sys.Audit"]], "user": "all"}
         */
        get_options: (...args: ArgsTuple<ClusterAPI["/cluster/options"]["GET"]['parameters']>) => client.request("/cluster/options", "GET", (args[0] ?? {}) as ClusterAPI["/cluster/options"]["GET"]['parameters']),
        /**
         * Set datacenter options.
         * @endpoint PUT /cluster/options
         * @allowToken 1
         * @permissions {"check": ["perm", "/", ["Sys.Modify"]]}
         *
         * Parameters:
         * - `bwlimit` (body, optional, string): Set I/O bandwidth limit for various operations (in KiB/s).
         * - `consent-text` (body, optional, string): Consent text that is displayed before logging in.
         * - `console` (body, optional, "applet" | "vv" | "html5" | "xtermjs"): Select the default Console viewer. You can either use the builtin java applet (VNC; deprecated and maps to html5), an external virt-viewer comtatible application (SPICE), an HTML5 based vnc viewer (noVNC), or an HTML5 based console client (xtermjs). If the selected viewer is not available (e.g. SPICE not activated for the VM), the fallback is noVNC.
         * - `crs` (body, optional, string): Cluster resource scheduling settings.
         * - `delete` (body, optional, string): A list of settings you want to delete.
         * - `description` (body, optional, string): Datacenter description. Shown in the web-interface datacenter notes panel. This is saved as comment inside the configuration file.
         * - `email_from` (body, optional, string): Specify email address to send notification from (default is root@$hostname)
         * - `fencing` (body, optional, "watchdog" | "hardware" | "both"): Set the fencing mode of the HA cluster. Hardware mode needs a valid configuration of fence devices in /etc/pve/ha/fence.cfg. With both all two modes are used.

         WARNING: 'hardware' and 'both' are EXPERIMENTAL & WIP
         * - `ha` (body, optional, string): Cluster wide HA settings.
         * - `http_proxy` (body, optional, string): Specify external http proxy which is used for downloads (example: 'http://username:password@host:port/')
         * - `keyboard` (body, optional, "de" | "de-ch" | "da" | "en-gb" | "en-us" | "es" | "fi" | "fr" | "fr-be" | "fr-ca" | "fr-ch" | "hu" | "is" | "it" | "ja" | "lt" | "mk" | "nl" | "no" | "pl" | "pt" | "pt-br" | "sv" | "sl" | "tr"): Default keybord layout for vnc server.
         * - `language` (body, optional, "ar" | "ca" | "da" | "de" | "en" | "es" | "eu" | "fa" | "fr" | "hr" | "he" | "it" | "ja" | "ka" | "kr" | "nb" | "nl" | "nn" | "pl" | "pt_BR" | "ru" | "sl" | "sv" | "tr" | "ukr" | "zh_CN" | "zh_TW"): Default GUI language.
         * - `mac_prefix` (body, optional, string): Prefix for the auto-generated MAC addresses of virtual guests. The default 'BC:24:11' is the OUI assigned by the IEEE to Proxmox Server Solutions GmbH for a 24-bit large MAC block. You're allowed to use this in local networks, i.e., those not directly reachable by the public (e.g., in a LAN or behind NAT).
         * - `max_workers` (body, optional, number): Defines how many workers (per node) are maximal started  on actions like 'stopall VMs' or task from the ha-manager.
         * - `migration` (body, optional, string): For cluster wide migration settings.
         * - `migration_unsecure` (body, optional, boolean): Migration is secure using SSH tunnel by default. For secure private networks you can disable it to speed up migration. Deprecated, use the 'migration' property instead!
         * - `next-id` (body, optional, string): Control the range for the free VMID auto-selection pool.
         * - `notify` (body, optional, string): Cluster-wide notification settings.
         * - `registered-tags` (body, optional, string): A list of tags that require a `Sys.Modify` on '/' to set and delete. Tags set here that are also in 'user-tag-access' also require `Sys.Modify`.
         * - `replication` (body, optional, string): For cluster wide replication settings.
         * - `tag-style` (body, optional, string): Tag style options.
         * - `u2f` (body, optional, string): u2f
         * - `user-tag-access` (body, optional, string): Privilege options for user-settable tags
         * - `webauthn` (body, optional, string): webauthn configuration
         */
        set_options: (...args: ArgsTuple<ClusterAPI["/cluster/options"]["PUT"]['parameters']>) => client.request("/cluster/options", "PUT", (args[0] ?? {}) as ClusterAPI["/cluster/options"]["PUT"]['parameters'])
    },
    replication: {
        /**
         * List replication jobs.
         * @endpoint GET /cluster/replication
         * @allowToken 1
         * @permissions {"description": "Will only return replication jobs for which the calling user has VM.Audit permission on /vms/<vmid>.", "user": "all"}
         */
        index: (...args: ArgsTuple<ClusterAPI["/cluster/replication"]["GET"]['parameters']>) => client.request("/cluster/replication", "GET", (args[0] ?? {}) as ClusterAPI["/cluster/replication"]["GET"]['parameters']),
        /**
         * Create a new replication job
         * @endpoint POST /cluster/replication
         * @allowToken 1
         * @permissions {"description": "Requires the VM.Replicate permission on /vms/<vmid>.", "user": "all"}
         *
         * Parameters:
         * - `comment` (body, optional, string): Description.
         * - `disable` (body, optional, boolean): Flag to disable/deactivate the entry.
         * - `id` (body, required, string): Replication Job ID. The ID is composed of a Guest ID and a job number, separated by a hyphen, i.e. '<GUEST>-<JOBNUM>'.
         * - `rate` (body, optional, number): Rate limit in mbps (megabytes per second) as floating point number.
         * - `remove_job` (body, optional, "local" | "full"): Mark the replication job for removal. The job will remove all local replication snapshots. When set to 'full', it also tries to remove replicated volumes on the target. The job then removes itself from the configuration file.
         * - `schedule` (body, optional, string): Storage replication schedule. The format is a subset of `systemd` calendar events.
         * - `source` (body, optional, string): For internal use, to detect if the guest was stolen.
         * - `target` (body, required, string): Target node.
         * - `type` (body, required, "local"): Section type.
         */
        create: (...args: ArgsTuple<ClusterAPI["/cluster/replication"]["POST"]['parameters']>) => client.request("/cluster/replication", "POST", (args[0] ?? {}) as ClusterAPI["/cluster/replication"]["POST"]['parameters']),
        id: (id: string) => ({
            /**
             * Mark replication job for removal.
             * @endpoint DELETE /cluster/replication/{id}
             * @allowToken 1
             * @permissions {"description": "Requires the VM.Replicate permission on /vms/<vmid>.", "user": "all"}
             *
             * Parameters:
             * - `force` (query, optional, boolean): Will remove the jobconfig entry, but will not cleanup.
             * - `id` (path, required, string): Replication Job ID. The ID is composed of a Guest ID and a job number, separated by a hyphen, i.e. '<GUEST>-<JOBNUM>'.
             * - `keep` (query, optional, boolean): Keep replicated data at target (do not remove).
             */
            delete_: (...args: ArgsTuple<PathContext<ClusterAPI["/cluster/replication/{id}"]["DELETE"]['parameters']>>) => client.request("/cluster/replication/{id}", "DELETE", {
                ...((args[0]) as any),
                $path: {id}
            }),
            /**
             * Read replication job configuration.
             * @endpoint GET /cluster/replication/{id}
             * @allowToken 1
             * @permissions {"description": "Requires the VM.Audit permission on /vms/<vmid>.", "user": "all"}
             *
             * Parameters:
             * - `id` (path, required, string): Replication Job ID. The ID is composed of a Guest ID and a job number, separated by a hyphen, i.e. '<GUEST>-<JOBNUM>'.
             */
            read: (...args: ArgsTuple<PathContext<ClusterAPI["/cluster/replication/{id}"]["GET"]['parameters']>>) => client.request("/cluster/replication/{id}", "GET", {
                ...((args[0]) as any),
                $path: {id}
            }),
            /**
             * Update replication job configuration.
             * @endpoint PUT /cluster/replication/{id}
             * @allowToken 1
             * @permissions {"description": "Requires the VM.Replicate permission on /vms/<vmid>.", "user": "all"}
             *
             * Parameters:
             * - `comment` (body, optional, string): Description.
             * - `delete` (body, optional, string): A list of settings you want to delete.
             * - `digest` (body, optional, string): Prevent changes if current configuration file has a different digest. This can be used to prevent concurrent modifications.
             * - `disable` (body, optional, boolean): Flag to disable/deactivate the entry.
             * - `id` (path, required, string): Replication Job ID. The ID is composed of a Guest ID and a job number, separated by a hyphen, i.e. '<GUEST>-<JOBNUM>'.
             * - `rate` (body, optional, number): Rate limit in mbps (megabytes per second) as floating point number.
             * - `remove_job` (body, optional, "local" | "full"): Mark the replication job for removal. The job will remove all local replication snapshots. When set to 'full', it also tries to remove replicated volumes on the target. The job then removes itself from the configuration file.
             * - `schedule` (body, optional, string): Storage replication schedule. The format is a subset of `systemd` calendar events.
             * - `source` (body, optional, string): For internal use, to detect if the guest was stolen.
             */
            update: (...args: ArgsTuple<PathContext<ClusterAPI["/cluster/replication/{id}"]["PUT"]['parameters']>>) => client.request("/cluster/replication/{id}", "PUT", {
                ...((args[0]) as any),
                $path: {id}
            }),
        })
    },
    resources: {
        /**
         * Resources index (cluster wide).
         * @endpoint GET /cluster/resources
         * @allowToken 1
         * @permissions {"user": "all"}
         *
         * Parameters:
         * - `type` (query, optional, "vm" | "storage" | "node" | "sdn"): Resource type.
         */
        resources: (...args: ArgsTuple<ClusterAPI["/cluster/resources"]["GET"]['parameters']>) => client.request("/cluster/resources", "GET", (args[0] ?? {}) as ClusterAPI["/cluster/resources"]["GET"]['parameters'])
    },
    sdn: {
        /**
         * Directory index.
         * @endpoint GET /cluster/sdn
         * @allowToken 1
         * @permissions {"check": ["perm", "/sdn", ["SDN.Audit"]]}
         */
        index: (...args: ArgsTuple<ClusterAPI["/cluster/sdn"]["GET"]['parameters']>) => client.request("/cluster/sdn", "GET", (args[0] ?? {}) as ClusterAPI["/cluster/sdn"]["GET"]['parameters']),
        /**
         * Apply sdn controller changes && reload.
         * @endpoint PUT /cluster/sdn
         * @allowToken 1
         * @permissions {"check": ["perm", "/sdn", ["SDN.Allocate"]]}
         *
         * Parameters:
         * - `lock-token` (body, optional, string): the token for unlocking the global SDN configuration
         * - `release-lock` (body, optional, boolean): When lock-token has been provided and configuration successfully commited, release the lock automatically afterwards
         */
        reload: (...args: ArgsTuple<ClusterAPI["/cluster/sdn"]["PUT"]['parameters']>) => client.request("/cluster/sdn", "PUT", (args[0] ?? {}) as ClusterAPI["/cluster/sdn"]["PUT"]['parameters']),
        controllers: {
            /**
             * SDN controllers index.
             * @endpoint GET /cluster/sdn/controllers
             * @allowToken 1
             * @permissions {"description": "Only list entries where you have 'SDN.Audit' or 'SDN.Allocate' permissions on '/sdn/controllers/<controller>'", "user": "all"}
             *
             * Parameters:
             * - `pending` (query, optional, boolean): Display pending config.
             * - `running` (query, optional, boolean): Display running config.
             * - `type` (query, optional, "bgp" | "evpn" | "faucet" | "isis"): Only list sdn controllers of specific type
             */
            index: (...args: ArgsTuple<ClusterAPI["/cluster/sdn/controllers"]["GET"]['parameters']>) => client.request("/cluster/sdn/controllers", "GET", (args[0] ?? {}) as ClusterAPI["/cluster/sdn/controllers"]["GET"]['parameters']),
            /**
             * Create a new sdn controller object.
             * @endpoint POST /cluster/sdn/controllers
             * @allowToken 1
             * @permissions {"check": ["perm", "/sdn/controllers", ["SDN.Allocate"]]}
             *
             * Parameters:
             * - `asn` (body, optional, number): autonomous system number
             * - `bgp-multipath-as-path-relax` (body, optional, boolean): Consider different AS paths of equal length for multipath computation.
             * - `controller` (body, required, string): The SDN controller object identifier.
             * - `ebgp` (body, optional, boolean): Enable eBGP (remote-as external).
             * - `ebgp-multihop` (body, optional, number): Set maximum amount of hops for eBGP peers.
             * - `fabric` (body, optional, string): SDN fabric to use as underlay for this EVPN controller.
             * - `isis-domain` (body, optional, string): Name of the IS-IS domain.
             * - `isis-ifaces` (body, optional, string): Comma-separated list of interfaces where IS-IS should be active.
             * - `isis-net` (body, optional, string): Network Entity title for this node in the IS-IS network.
             * - `lock-token` (body, optional, string): the token for unlocking the global SDN configuration
             * - `loopback` (body, optional, string): Name of the loopback/dummy interface that provides the Router-IP.
             * - `node` (body, optional, string): The cluster node name.
             * - `peers` (body, optional, string): peers address list.
             * - `type` (body, required, "bgp" | "evpn" | "faucet" | "isis"): Plugin type.
             */
            create: (...args: ArgsTuple<ClusterAPI["/cluster/sdn/controllers"]["POST"]['parameters']>) => client.request("/cluster/sdn/controllers", "POST", (args[0] ?? {}) as ClusterAPI["/cluster/sdn/controllers"]["POST"]['parameters']),
            controller: (controller: string) => ({
                /**
                 * Delete sdn controller object configuration.
                 * @endpoint DELETE /cluster/sdn/controllers/{controller}
                 * @allowToken 1
                 * @permissions {"check": ["perm", "/sdn/controllers", ["SDN.Allocate"]]}
                 *
                 * Parameters:
                 * - `controller` (path, required, string): The SDN controller object identifier.
                 * - `lock-token` (query, optional, string): the token for unlocking the global SDN configuration
                 */
                delete_: (...args: ArgsTuple<PathContext<ClusterAPI["/cluster/sdn/controllers/{controller}"]["DELETE"]['parameters']>>) => client.request("/cluster/sdn/controllers/{controller}", "DELETE", {
                    ...((args[0]) as any),
                    $path: {controller}
                }),
                /**
                 * Read sdn controller configuration.
                 * @endpoint GET /cluster/sdn/controllers/{controller}
                 * @allowToken 1
                 * @permissions {"check": ["perm", "/sdn/controllers/{controller}", ["SDN.Allocate"]]}
                 *
                 * Parameters:
                 * - `controller` (path, required, string): The SDN controller object identifier.
                 * - `pending` (query, optional, boolean): Display pending config.
                 * - `running` (query, optional, boolean): Display running config.
                 */
                read: (...args: ArgsTuple<PathContext<ClusterAPI["/cluster/sdn/controllers/{controller}"]["GET"]['parameters']>>) => client.request("/cluster/sdn/controllers/{controller}", "GET", {
                    ...((args[0]) as any),
                    $path: {controller}
                }),
                /**
                 * Update sdn controller object configuration.
                 * @endpoint PUT /cluster/sdn/controllers/{controller}
                 * @allowToken 1
                 * @permissions {"check": ["perm", "/sdn/controllers", ["SDN.Allocate"]]}
                 *
                 * Parameters:
                 * - `asn` (body, optional, number): autonomous system number
                 * - `bgp-multipath-as-path-relax` (body, optional, boolean): Consider different AS paths of equal length for multipath computation.
                 * - `controller` (path, required, string): The SDN controller object identifier.
                 * - `delete` (body, optional, string): A list of settings you want to delete.
                 * - `digest` (body, optional, string): Prevent changes if current configuration file has a different digest. This can be used to prevent concurrent modifications.
                 * - `ebgp` (body, optional, boolean): Enable eBGP (remote-as external).
                 * - `ebgp-multihop` (body, optional, number): Set maximum amount of hops for eBGP peers.
                 * - `fabric` (body, optional, string): SDN fabric to use as underlay for this EVPN controller.
                 * - `isis-domain` (body, optional, string): Name of the IS-IS domain.
                 * - `isis-ifaces` (body, optional, string): Comma-separated list of interfaces where IS-IS should be active.
                 * - `isis-net` (body, optional, string): Network Entity title for this node in the IS-IS network.
                 * - `lock-token` (body, optional, string): the token for unlocking the global SDN configuration
                 * - `loopback` (body, optional, string): Name of the loopback/dummy interface that provides the Router-IP.
                 * - `node` (body, optional, string): The cluster node name.
                 * - `peers` (body, optional, string): peers address list.
                 */
                update: (...args: ArgsTuple<PathContext<ClusterAPI["/cluster/sdn/controllers/{controller}"]["PUT"]['parameters']>>) => client.request("/cluster/sdn/controllers/{controller}", "PUT", {
                    ...((args[0]) as any),
                    $path: {controller}
                }),
            })
        },
        dns: {
            /**
             * SDN dns index.
             * @endpoint GET /cluster/sdn/dns
             * @allowToken 1
             * @permissions {"description": "Only list entries where you have 'SDN.Audit' or 'SDN.Allocate' permissions on '/sdn/dns/<dns>'", "user": "all"}
             *
             * Parameters:
             * - `type` (query, optional, "powerdns"): Only list sdn dns of specific type
             */
            index: (...args: ArgsTuple<ClusterAPI["/cluster/sdn/dns"]["GET"]['parameters']>) => client.request("/cluster/sdn/dns", "GET", (args[0] ?? {}) as ClusterAPI["/cluster/sdn/dns"]["GET"]['parameters']),
            /**
             * Create a new sdn dns object.
             * @endpoint POST /cluster/sdn/dns
             * @allowToken 1
             * @permissions {"check": ["perm", "/sdn/dns", ["SDN.Allocate"]]}
             *
             * Parameters:
             * - `dns` (body, required, string): The SDN dns object identifier.
             * - `fingerprint` (body, optional, string): Certificate SHA 256 fingerprint.
             * - `key` (body, required, string)
             * - `lock-token` (body, optional, string): the token for unlocking the global SDN configuration
             * - `reversemaskv6` (body, optional, number)
             * - `reversev6mask` (body, optional, number)
             * - `ttl` (body, optional, number)
             * - `type` (body, required, "powerdns"): Plugin type.
             * - `url` (body, required, string)
             */
            create: (...args: ArgsTuple<ClusterAPI["/cluster/sdn/dns"]["POST"]['parameters']>) => client.request("/cluster/sdn/dns", "POST", (args[0] ?? {}) as ClusterAPI["/cluster/sdn/dns"]["POST"]['parameters']),
            dns: (dns: string) => ({
                /**
                 * Delete sdn dns object configuration.
                 * @endpoint DELETE /cluster/sdn/dns/{dns}
                 * @allowToken 1
                 * @permissions {"check": ["perm", "/sdn/dns", ["SDN.Allocate"]]}
                 *
                 * Parameters:
                 * - `dns` (path, required, string): The SDN dns object identifier.
                 * - `lock-token` (query, optional, string): the token for unlocking the global SDN configuration
                 */
                delete_: (...args: ArgsTuple<PathContext<ClusterAPI["/cluster/sdn/dns/{dns}"]["DELETE"]['parameters']>>) => client.request("/cluster/sdn/dns/{dns}", "DELETE", {
                    ...((args[0]) as any),
                    $path: {dns}
                }),
                /**
                 * Read sdn dns configuration.
                 * @endpoint GET /cluster/sdn/dns/{dns}
                 * @allowToken 1
                 * @permissions {"check": ["perm", "/sdn/dns/{dns}", ["SDN.Allocate"]]}
                 *
                 * Parameters:
                 * - `dns` (path, required, string): The SDN dns object identifier.
                 */
                read: (...args: ArgsTuple<PathContext<ClusterAPI["/cluster/sdn/dns/{dns}"]["GET"]['parameters']>>) => client.request("/cluster/sdn/dns/{dns}", "GET", {
                    ...((args[0]) as any),
                    $path: {dns}
                }),
                /**
                 * Update sdn dns object configuration.
                 * @endpoint PUT /cluster/sdn/dns/{dns}
                 * @allowToken 1
                 * @permissions {"check": ["perm", "/sdn/dns", ["SDN.Allocate"]]}
                 *
                 * Parameters:
                 * - `delete` (body, optional, string): A list of settings you want to delete.
                 * - `digest` (body, optional, string): Prevent changes if current configuration file has a different digest. This can be used to prevent concurrent modifications.
                 * - `dns` (path, required, string): The SDN dns object identifier.
                 * - `fingerprint` (body, optional, string): Certificate SHA 256 fingerprint.
                 * - `key` (body, optional, string)
                 * - `lock-token` (body, optional, string): the token for unlocking the global SDN configuration
                 * - `reversemaskv6` (body, optional, number)
                 * - `ttl` (body, optional, number)
                 * - `url` (body, optional, string)
                 */
                update: (...args: ArgsTuple<PathContext<ClusterAPI["/cluster/sdn/dns/{dns}"]["PUT"]['parameters']>>) => client.request("/cluster/sdn/dns/{dns}", "PUT", {
                    ...((args[0]) as any),
                    $path: {dns}
                }),
            })
        },
        fabrics: {
            /**
             * SDN Fabrics Index
             * @endpoint GET /cluster/sdn/fabrics
             * @allowToken 1
             * @permissions {"check": ["perm", "/sdn/fabrics", ["SDN.Audit"]]}
             */
            index: (...args: ArgsTuple<ClusterAPI["/cluster/sdn/fabrics"]["GET"]['parameters']>) => client.request("/cluster/sdn/fabrics", "GET", (args[0] ?? {}) as ClusterAPI["/cluster/sdn/fabrics"]["GET"]['parameters']),
            /**
             * SDN Fabrics Index
             * @endpoint GET /cluster/sdn/fabrics/all
             * @allowToken 1
             * @permissions {"description": "Only list fabrics where you have 'SDN.Audit' or 'SDN.Allocate' permissions on\n'/sdn/fabrics/<fabric>', only list nodes where you have 'Sys.Audit' or 'Sys.Modify' on /nodes/<node_id>", "user": "all"}
             *
             * Parameters:
             * - `pending` (query, optional, boolean): Display pending config.
             * - `running` (query, optional, boolean): Display running config.
             */
            all: (...args: ArgsTuple<ClusterAPI["/cluster/sdn/fabrics/all"]["GET"]['parameters']>) => client.request("/cluster/sdn/fabrics/all", "GET", (args[0] ?? {}) as ClusterAPI["/cluster/sdn/fabrics/all"]["GET"]['parameters']),
            fabric: {
                /**
                 * SDN Fabrics Index
                 * @endpoint GET /cluster/sdn/fabrics/fabric
                 * @allowToken 1
                 * @permissions {"description": "Only list entries where you have 'SDN.Audit' or 'SDN.Allocate' permissions on '/sdn/fabrics/<fabric>'", "user": "all"}
                 *
                 * Parameters:
                 * - `pending` (query, optional, boolean): Display pending config.
                 * - `running` (query, optional, boolean): Display running config.
                 */
                index: (...args: ArgsTuple<ClusterAPI["/cluster/sdn/fabrics/fabric"]["GET"]['parameters']>) => client.request("/cluster/sdn/fabrics/fabric", "GET", (args[0] ?? {}) as ClusterAPI["/cluster/sdn/fabrics/fabric"]["GET"]['parameters']),
                /**
                 * Add a fabric
                 * @endpoint POST /cluster/sdn/fabrics/fabric
                 * @allowToken 1
                 * @permissions {"check": ["perm", "/sdn/fabrics", ["SDN.Allocate"]]}
                 *
                 * Parameters:
                 * - `area` (body, optional, string): OSPF area. Either a IPv4 address or a 32-bit number. Gets validated in rust.
                 * - `csnp_interval` (body, optional, number): The csnp_interval property for Openfabric
                 * - `digest` (body, optional, string): Prevent changes if current configuration file has a different digest. This can be used to prevent concurrent modifications.
                 * - `hello_interval` (body, optional, number): The hello_interval property for Openfabric
                 * - `id` (body, required, string): Identifier for SDN fabrics
                 * - `ip6_prefix` (body, optional, string): The IP prefix for Node IPs
                 * - `ip_prefix` (body, optional, string): The IP prefix for Node IPs
                 * - `lock-token` (body, optional, string): the token for unlocking the global SDN configuration
                 * - `protocol` (body, required, "openfabric" | "ospf"): Type of configuration entry in an SDN Fabric section config
                 */
                add_fabric: (...args: ArgsTuple<ClusterAPI["/cluster/sdn/fabrics/fabric"]["POST"]['parameters']>) => client.request("/cluster/sdn/fabrics/fabric", "POST", (args[0] ?? {}) as ClusterAPI["/cluster/sdn/fabrics/fabric"]["POST"]['parameters']),
                id: (id: string) => ({
                    /**
                     * Add a fabric
                     * @endpoint DELETE /cluster/sdn/fabrics/fabric/{id}
                     * @allowToken 1
                     * @permissions {"check": ["perm", "/sdn/fabrics/{id}", ["SDN.Allocate"]]}
                     *
                     * Parameters:
                     * - `id` (path, required, string): Identifier for SDN fabrics
                     */
                    delete: (...args: ArgsTuple<PathContext<ClusterAPI["/cluster/sdn/fabrics/fabric/{id}"]["DELETE"]['parameters']>>) => client.request("/cluster/sdn/fabrics/fabric/{id}", "DELETE", {
                        ...((args[0]) as any),
                        $path: {id}
                    }),
                    /**
                     * Update a fabric
                     * @endpoint GET /cluster/sdn/fabrics/fabric/{id}
                     * @allowToken 1
                     * @permissions {"check": ["perm", "/sdn/fabrics/{id}", ["SDN.Audit", "SDN.Allocate"], "any", 1]}
                     *
                     * Parameters:
                     * - `id` (path, required, string): Identifier for SDN fabrics
                     */
                    get: (...args: ArgsTuple<PathContext<ClusterAPI["/cluster/sdn/fabrics/fabric/{id}"]["GET"]['parameters']>>) => client.request("/cluster/sdn/fabrics/fabric/{id}", "GET", {
                        ...((args[0]) as any),
                        $path: {id}
                    }),
                    /**
                     * Update a fabric
                     * @endpoint PUT /cluster/sdn/fabrics/fabric/{id}
                     * @allowToken 1
                     * @permissions {"check": ["perm", "/sdn/fabrics/{id}", ["SDN.Allocate"]]}
                     *
                     * Parameters:
                     * - `area` (body, optional, string): OSPF area. Either a IPv4 address or a 32-bit number. Gets validated in rust.
                     * - `csnp_interval` (body, optional, number): The csnp_interval property for Openfabric
                     * - `delete` (body, required, unknown[])
                     * - `digest` (body, optional, string): Prevent changes if current configuration file has a different digest. This can be used to prevent concurrent modifications.
                     * - `hello_interval` (body, optional, number): The hello_interval property for Openfabric
                     * - `id` (path, required, string): Identifier for SDN fabrics
                     * - `ip6_prefix` (body, optional, string): The IP prefix for Node IPs
                     * - `ip_prefix` (body, optional, string): The IP prefix for Node IPs
                     * - `lock-token` (body, optional, string): the token for unlocking the global SDN configuration
                     * - `protocol` (body, required, "openfabric" | "ospf"): Type of configuration entry in an SDN Fabric section config
                     */
                    update: (...args: ArgsTuple<PathContext<ClusterAPI["/cluster/sdn/fabrics/fabric/{id}"]["PUT"]['parameters']>>) => client.request("/cluster/sdn/fabrics/fabric/{id}", "PUT", {
                        ...((args[0]) as any),
                        $path: {id}
                    }),
                })
            },
            node: {
                /**
                 * SDN Fabrics Index
                 * @endpoint GET /cluster/sdn/fabrics/node
                 * @allowToken 1
                 * @permissions {"description": "Only list nodes where you have 'SDN.Audit' or 'SDN.Allocate' permissions on\n'/sdn/fabrics/<fabric>' and 'Sys.Audit' or 'Sys.Modify' on /nodes/<node_id>", "user": "all"}
                 *
                 * Parameters:
                 * - `pending` (query, optional, boolean): Display pending config.
                 * - `running` (query, optional, boolean): Display running config.
                 */
                list_nodes: (...args: ArgsTuple<ClusterAPI["/cluster/sdn/fabrics/node"]["GET"]['parameters']>) => client.request("/cluster/sdn/fabrics/node", "GET", (args[0] ?? {}) as ClusterAPI["/cluster/sdn/fabrics/node"]["GET"]['parameters']),
                fabric_id: (fabric_id: string) => ({
                    /**
                     * SDN Fabrics Index
                     * @endpoint GET /cluster/sdn/fabrics/node/{fabric_id}
                     * @allowToken 1
                     * @permissions {"check": ["perm", "/sdn/fabrics/{fabric_id}", ["SDN.Audit"]], "description": "Only returns nodes where you have 'Sys.Audit' or 'Sys.Modify' permissions."}
                     *
                     * Parameters:
                     * - `fabric_id` (path, required, string): Identifier for SDN fabrics
                     * - `pending` (query, optional, boolean): Display pending config.
                     * - `running` (query, optional, boolean): Display running config.
                     */
                    list_nodes_fabric: (...args: ArgsTuple<PathContext<ClusterAPI["/cluster/sdn/fabrics/node/{fabric_id}"]["GET"]['parameters']>>) => client.request("/cluster/sdn/fabrics/node/{fabric_id}", "GET", {
                        ...((args[0]) as any),
                        $path: {fabric_id}
                    }),
                    /**
                     * Add a node
                     * @endpoint POST /cluster/sdn/fabrics/node/{fabric_id}
                     * @allowToken 1
                     * @permissions {"check": ["and", ["perm", "/sdn/fabrics/{fabric_id}", ["SDN.Allocate"]], ["perm", "/nodes/{node_id}", ["Sys.Modify"]]]}
                     *
                     * Parameters:
                     * - `digest` (body, optional, string): Prevent changes if current configuration file has a different digest. This can be used to prevent concurrent modifications.
                     * - `fabric_id` (path, required, string): Identifier for SDN fabrics
                     * - `interfaces` (body, required, unknown[])
                     * - `ip` (body, optional, string): IPv4 address for this node
                     * - `ip6` (body, optional, string): IPv6 address for this node
                     * - `lock-token` (body, optional, string): the token for unlocking the global SDN configuration
                     * - `node_id` (body, required, string): Identifier for nodes in an SDN fabric
                     * - `protocol` (body, required, "openfabric" | "ospf"): Type of configuration entry in an SDN Fabric section config
                     */
                    add_node: (...args: ArgsTuple<PathContext<ClusterAPI["/cluster/sdn/fabrics/node/{fabric_id}"]["POST"]['parameters']>>) => client.request("/cluster/sdn/fabrics/node/{fabric_id}", "POST", {
                        ...((args[0]) as any),
                        $path: {fabric_id}
                    }),
                    node: (node_id: string) => ({
                        /**
                         * Add a node
                         * @endpoint DELETE /cluster/sdn/fabrics/node/{fabric_id}/{node_id}
                         * @allowToken 1
                         * @permissions {"check": ["and", ["perm", "/sdn/fabrics/{fabric_id}", ["SDN.Allocate"]], ["perm", "/nodes/{node_id}", ["Sys.Modify"]]]}
                         *
                         * Parameters:
                         * - `fabric_id` (path, required, string): Identifier for SDN fabrics
                         * - `node_id` (path, required, string): Identifier for nodes in an SDN fabric
                         */
                        delete: (...args: ArgsTuple<PathContext<ClusterAPI["/cluster/sdn/fabrics/node/{fabric_id}/{node_id}"]["DELETE"]['parameters']>>) => client.request("/cluster/sdn/fabrics/node/{fabric_id}/{node_id}", "DELETE", {
                            ...((args[0]) as any),
                            $path: {
                                node_id,
                                fabric_id
                            }
                        }),
                        /**
                         * Get a node
                         * @endpoint GET /cluster/sdn/fabrics/node/{fabric_id}/{node_id}
                         * @allowToken 1
                         * @permissions {"check": ["and", ["perm", "/sdn/fabrics/{fabric_id}", ["SDN.Audit", "SDN.Allocate"], "any", 1], ["perm", "/nodes/{node_id}", ["Sys.Audit", "Sys.Modify"], "any", 1]]}
                         *
                         * Parameters:
                         * - `fabric_id` (path, required, string): Identifier for SDN fabrics
                         * - `node_id` (path, required, string): Identifier for nodes in an SDN fabric
                         */
                        get: (...args: ArgsTuple<PathContext<ClusterAPI["/cluster/sdn/fabrics/node/{fabric_id}/{node_id}"]["GET"]['parameters']>>) => client.request("/cluster/sdn/fabrics/node/{fabric_id}/{node_id}", "GET", {
                            ...((args[0]) as any),
                            $path: {
                                node_id,
                                fabric_id
                            }
                        }),
                        /**
                         * Update a node
                         * @endpoint PUT /cluster/sdn/fabrics/node/{fabric_id}/{node_id}
                         * @allowToken 1
                         * @permissions {"check": ["and", ["perm", "/sdn/fabrics/{fabric_id}", ["SDN.Allocate"]], ["perm", "/nodes/{node_id}", ["Sys.Modify"]]]}
                         *
                         * Parameters:
                         * - `delete` (body, optional, "interfaces" | "ip" | "ip6"[])
                         * - `digest` (body, optional, string): Prevent changes if current configuration file has a different digest. This can be used to prevent concurrent modifications.
                         * - `fabric_id` (path, required, string): Identifier for SDN fabrics
                         * - `interfaces` (body, required, unknown[])
                         * - `ip` (body, optional, string): IPv4 address for this node
                         * - `ip6` (body, optional, string): IPv6 address for this node
                         * - `lock-token` (body, optional, string): the token for unlocking the global SDN configuration
                         * - `node_id` (path, required, string): Identifier for nodes in an SDN fabric
                         * - `protocol` (body, required, "openfabric" | "ospf"): Type of configuration entry in an SDN Fabric section config
                         */
                        update: (...args: ArgsTuple<PathContext<ClusterAPI["/cluster/sdn/fabrics/node/{fabric_id}/{node_id}"]["PUT"]['parameters']>>) => client.request("/cluster/sdn/fabrics/node/{fabric_id}/{node_id}", "PUT", {
                            ...((args[0]) as any),
                            $path: {
                                node_id,
                                fabric_id
                            }
                        }),
                    })
                })
            }
        },
        ipams: {
            /**
             * SDN ipams index.
             * @endpoint GET /cluster/sdn/ipams
             * @allowToken 1
             * @permissions {"description": "Only list entries where you have 'SDN.Audit' or 'SDN.Allocate' permissions on '/sdn/ipams/<ipam>'", "user": "all"}
             *
             * Parameters:
             * - `type` (query, optional, "netbox" | "phpipam" | "pve"): Only list sdn ipams of specific type
             */
            index: (...args: ArgsTuple<ClusterAPI["/cluster/sdn/ipams"]["GET"]['parameters']>) => client.request("/cluster/sdn/ipams", "GET", (args[0] ?? {}) as ClusterAPI["/cluster/sdn/ipams"]["GET"]['parameters']),
            /**
             * Create a new sdn ipam object.
             * @endpoint POST /cluster/sdn/ipams
             * @allowToken 1
             * @permissions {"check": ["perm", "/sdn/ipams", ["SDN.Allocate"]]}
             *
             * Parameters:
             * - `fingerprint` (body, optional, string): Certificate SHA 256 fingerprint.
             * - `ipam` (body, required, string): The SDN ipam object identifier.
             * - `lock-token` (body, optional, string): the token for unlocking the global SDN configuration
             * - `section` (body, optional, number)
             * - `token` (body, optional, string)
             * - `type` (body, required, "netbox" | "phpipam" | "pve"): Plugin type.
             * - `url` (body, optional, string)
             */
            create: (...args: ArgsTuple<ClusterAPI["/cluster/sdn/ipams"]["POST"]['parameters']>) => client.request("/cluster/sdn/ipams", "POST", (args[0] ?? {}) as ClusterAPI["/cluster/sdn/ipams"]["POST"]['parameters']),
            ipam: (ipam: string) => ({
                /**
                 * Delete sdn ipam object configuration.
                 * @endpoint DELETE /cluster/sdn/ipams/{ipam}
                 * @allowToken 1
                 * @permissions {"check": ["perm", "/sdn/ipams", ["SDN.Allocate"]]}
                 *
                 * Parameters:
                 * - `ipam` (path, required, string): The SDN ipam object identifier.
                 * - `lock-token` (query, optional, string): the token for unlocking the global SDN configuration
                 */
                delete: (...args: ArgsTuple<PathContext<ClusterAPI["/cluster/sdn/ipams/{ipam}"]["DELETE"]['parameters']>>) => client.request("/cluster/sdn/ipams/{ipam}", "DELETE", {
                    ...((args[0]) as any),
                    $path: {ipam}
                }),
                /**
                 * Read sdn ipam configuration.
                 * @endpoint GET /cluster/sdn/ipams/{ipam}
                 * @allowToken 1
                 * @permissions {"check": ["perm", "/sdn/ipams/{ipam}", ["SDN.Allocate"]]}
                 *
                 * Parameters:
                 * - `ipam` (path, required, string): The SDN ipam object identifier.
                 */
                read: (...args: ArgsTuple<PathContext<ClusterAPI["/cluster/sdn/ipams/{ipam}"]["GET"]['parameters']>>) => client.request("/cluster/sdn/ipams/{ipam}", "GET", {
                    ...((args[0]) as any),
                    $path: {ipam}
                }),
                /**
                 * Update sdn ipam object configuration.
                 * @endpoint PUT /cluster/sdn/ipams/{ipam}
                 * @allowToken 1
                 * @permissions {"check": ["perm", "/sdn/ipams", ["SDN.Allocate"]]}
                 *
                 * Parameters:
                 * - `delete` (body, optional, string): A list of settings you want to delete.
                 * - `digest` (body, optional, string): Prevent changes if current configuration file has a different digest. This can be used to prevent concurrent modifications.
                 * - `fingerprint` (body, optional, string): Certificate SHA 256 fingerprint.
                 * - `ipam` (path, required, string): The SDN ipam object identifier.
                 * - `lock-token` (body, optional, string): the token for unlocking the global SDN configuration
                 * - `section` (body, optional, number)
                 * - `token` (body, optional, string)
                 * - `url` (body, optional, string)
                 */
                update: (...args: ArgsTuple<PathContext<ClusterAPI["/cluster/sdn/ipams/{ipam}"]["PUT"]['parameters']>>) => client.request("/cluster/sdn/ipams/{ipam}", "PUT", {
                    ...((args[0]) as any),
                    $path: {ipam}
                }),
                /**
                 * List PVE IPAM Entries
                 * @endpoint GET /cluster/sdn/ipams/{ipam}/status
                 * @allowToken 1
                 * @permissions {"description": "Only list entries where you have 'SDN.Audit' or 'SDN.Allocate' permissions on '/sdn/zones/<zone>/<vnet>'", "user": "all"}
                 *
                 * Parameters:
                 * - `ipam` (path, required, string): The SDN ipam object identifier.
                 */
                status: (...args: ArgsTuple<PathContext<ClusterAPI["/cluster/sdn/ipams/{ipam}/status"]["GET"]['parameters']>>) => client.request("/cluster/sdn/ipams/{ipam}/status", "GET", {
                    ...((args[0]) as any),
                    $path: {ipam}
                }),
            })
        },
        lock: {
            /**
             * Release global lock for SDN configuration
             * @endpoint DELETE /cluster/sdn/lock
             * @allowToken 1
             * @permissions {"check": ["perm", "/sdn", ["SDN.Allocate"]]}
             *
             * Parameters:
             * - `force` (query, optional, boolean): if true, allow releasing lock without providing the token
             * - `lock-token` (query, optional, string): the token for unlocking the global SDN configuration
             */
            release_lock: (...args: ArgsTuple<ClusterAPI["/cluster/sdn/lock"]["DELETE"]['parameters']>) => client.request("/cluster/sdn/lock", "DELETE", (args[0] ?? {}) as ClusterAPI["/cluster/sdn/lock"]["DELETE"]['parameters']),
            /**
             * Acquire global lock for SDN configuration
             * @endpoint POST /cluster/sdn/lock
             * @allowToken 1
             * @permissions {"check": ["perm", "/sdn", ["SDN.Allocate"]]}
             *
             * Parameters:
             * - `allow-pending` (body, optional, boolean): if true, allow acquiring lock even though there are pending changes
             */
            lock: (...args: ArgsTuple<ClusterAPI["/cluster/sdn/lock"]["POST"]['parameters']>) => client.request("/cluster/sdn/lock", "POST", (args[0] ?? {}) as ClusterAPI["/cluster/sdn/lock"]["POST"]['parameters'])
        },
        rollback: {
            /**
             * Rollback pending changes to SDN configuration
             * @endpoint POST /cluster/sdn/rollback
             * @allowToken 1
             * @permissions {"check": ["perm", "/sdn", ["SDN.Allocate"]]}
             *
             * Parameters:
             * - `lock-token` (body, optional, string): the token for unlocking the global SDN configuration
             * - `release-lock` (body, optional, boolean): When lock-token has been provided and configuration successfully rollbacked, release the lock automatically afterwards
             */
            rollback: (...args: ArgsTuple<ClusterAPI["/cluster/sdn/rollback"]["POST"]['parameters']>) => client.request("/cluster/sdn/rollback", "POST", (args[0] ?? {}) as ClusterAPI["/cluster/sdn/rollback"]["POST"]['parameters'])
        },
        vnets: {
            /**
             * SDN vnets index.
             * @endpoint GET /cluster/sdn/vnets
             * @allowToken 1
             * @permissions {"description": "Only list entries where you have 'SDN.Audit' or 'SDN.Allocate' permissions on '/sdn/zones/<zone>/<vnet>'", "user": "all"}
             *
             * Parameters:
             * - `pending` (query, optional, boolean): Display pending config.
             * - `running` (query, optional, boolean): Display running config.
             */
            index: (...args: ArgsTuple<ClusterAPI["/cluster/sdn/vnets"]["GET"]['parameters']>) => client.request("/cluster/sdn/vnets", "GET", (args[0] ?? {}) as ClusterAPI["/cluster/sdn/vnets"]["GET"]['parameters']),
            /**
             * Create a new sdn vnet object.
             * @endpoint POST /cluster/sdn/vnets
             * @allowToken 1
             * @permissions {"check": ["perm", "/sdn/zones/{zone}", ["SDN.Allocate"]]}
             *
             * Parameters:
             * - `alias` (body, optional, string): Alias name of the VNet.
             * - `isolate-ports` (body, optional, boolean): If true, sets the isolated property for all interfaces on the bridge of this VNet.
             * - `lock-token` (body, optional, string): the token for unlocking the global SDN configuration
             * - `tag` (body, optional, number): VLAN Tag (for VLAN or QinQ zones) or VXLAN VNI (for VXLAN or EVPN zones).
             * - `type` (body, optional, "vnet"): Type of the VNet.
             * - `vlanaware` (body, optional, boolean): Allow VLANs to pass through this vnet.
             * - `vnet` (body, required, string): The SDN vnet object identifier.
             * - `zone` (body, required, string): Name of the zone this VNet belongs to.
             */
            create: (...args: ArgsTuple<ClusterAPI["/cluster/sdn/vnets"]["POST"]['parameters']>) => client.request("/cluster/sdn/vnets", "POST", (args[0] ?? {}) as ClusterAPI["/cluster/sdn/vnets"]["POST"]['parameters']),
            vnet: (vnet: string) => ({
                /**
                 * Delete sdn vnet object configuration.
                 * @endpoint DELETE /cluster/sdn/vnets/{vnet}
                 * @allowToken 1
                 * @permissions {"description": "Require 'SDN.Allocate' permission on '/sdn/zones/<zone>/<vnet>'", "user": "all"}
                 *
                 * Parameters:
                 * - `lock-token` (query, optional, string): the token for unlocking the global SDN configuration
                 * - `vnet` (path, required, string): The SDN vnet object identifier.
                 */
                delete: (...args: ArgsTuple<PathContext<ClusterAPI["/cluster/sdn/vnets/{vnet}"]["DELETE"]['parameters']>>) => client.request("/cluster/sdn/vnets/{vnet}", "DELETE", {
                    ...((args[0]) as any),
                    $path: {vnet}
                }),
                /**
                 * Read sdn vnet configuration.
                 * @endpoint GET /cluster/sdn/vnets/{vnet}
                 * @allowToken 1
                 * @permissions {"description": "Require 'SDN.Audit' or 'SDN.Allocate' permissions on '/sdn/zones/<zone>/<vnet>'", "user": "all"}
                 *
                 * Parameters:
                 * - `pending` (query, optional, boolean): Display pending config.
                 * - `running` (query, optional, boolean): Display running config.
                 * - `vnet` (path, required, string): The SDN vnet object identifier.
                 */
                read: (...args: ArgsTuple<PathContext<ClusterAPI["/cluster/sdn/vnets/{vnet}"]["GET"]['parameters']>>) => client.request("/cluster/sdn/vnets/{vnet}", "GET", {
                    ...((args[0]) as any),
                    $path: {vnet}
                }),
                /**
                 * Update sdn vnet object configuration.
                 * @endpoint PUT /cluster/sdn/vnets/{vnet}
                 * @allowToken 1
                 * @permissions {"description": "Require 'SDN.Allocate' permission on '/sdn/zones/<zone>/<vnet>'", "user": "all"}
                 *
                 * Parameters:
                 * - `alias` (body, optional, string): Alias name of the VNet.
                 * - `delete` (body, optional, string): A list of settings you want to delete.
                 * - `digest` (body, optional, string): Prevent changes if current configuration file has a different digest. This can be used to prevent concurrent modifications.
                 * - `isolate-ports` (body, optional, boolean): If true, sets the isolated property for all interfaces on the bridge of this VNet.
                 * - `lock-token` (body, optional, string): the token for unlocking the global SDN configuration
                 * - `tag` (body, optional, number): VLAN Tag (for VLAN or QinQ zones) or VXLAN VNI (for VXLAN or EVPN zones).
                 * - `vlanaware` (body, optional, boolean): Allow VLANs to pass through this vnet.
                 * - `vnet` (path, required, string): The SDN vnet object identifier.
                 * - `zone` (body, optional, string): Name of the zone this VNet belongs to.
                 */
                update: (...args: ArgsTuple<PathContext<ClusterAPI["/cluster/sdn/vnets/{vnet}"]["PUT"]['parameters']>>) => client.request("/cluster/sdn/vnets/{vnet}", "PUT", {
                    ...((args[0]) as any),
                    $path: {vnet}
                }),
                firewall: {
                    /**
                     * Directory index.
                     * @endpoint GET /cluster/sdn/vnets/{vnet}/firewall
                     * @allowToken 1
                     *
                     * Parameters:
                     * - `vnet` (path, required, string): The SDN vnet object identifier.
                     */
                    index: (...args: ArgsTuple<PathContext<ClusterAPI["/cluster/sdn/vnets/{vnet}/firewall"]["GET"]['parameters']>>) => client.request("/cluster/sdn/vnets/{vnet}/firewall", "GET", {
                        ...((args[0]) as any),
                        $path: {vnet}
                    }),
                    options: {
                        /**
                         * Get vnet firewall options.
                         * @endpoint GET /cluster/sdn/vnets/{vnet}/firewall/options
                         * @allowToken 1
                         * @permissions {"description": "Needs SDN.Audit or SDN.Allocate permissions on '/sdn/zones/<zone>/<vnet>'", "user": "all"}
                         *
                         * Parameters:
                         * - `vnet` (path, required, string): The SDN vnet object identifier.
                         */
                        get: (...args: ArgsTuple<PathContext<ClusterAPI["/cluster/sdn/vnets/{vnet}/firewall/options"]["GET"]['parameters']>>) => client.request("/cluster/sdn/vnets/{vnet}/firewall/options", "GET", {
                            ...((args[0]) as any),
                            $path: {vnet}
                        }),
                        /**
                         * Set Firewall options.
                         * @endpoint PUT /cluster/sdn/vnets/{vnet}/firewall/options
                         * @allowToken 1
                         * @permissions {"description": "Needs SDN.Allocate permissions on '/sdn/zones/<zone>/<vnet>'", "user": "all"}
                         *
                         * Parameters:
                         * - `delete` (body, optional, string): A list of settings you want to delete.
                         * - `digest` (body, optional, string): Prevent changes if current configuration file has a different digest. This can be used to prevent concurrent modifications.
                         * - `enable` (body, optional, boolean): Enable/disable firewall rules.
                         * - `log_level_forward` (body, optional, "emerg" | "alert" | "crit" | "err" | "warning" | "notice" | "info" | "debug" | "nolog"): Log level for forwarded traffic.
                         * - `policy_forward` (body, optional, "ACCEPT" | "DROP"): Forward policy.
                         * - `vnet` (path, required, string): The SDN vnet object identifier.
                         */
                        set: (...args: ArgsTuple<PathContext<ClusterAPI["/cluster/sdn/vnets/{vnet}/firewall/options"]["PUT"]['parameters']>>) => client.request("/cluster/sdn/vnets/{vnet}/firewall/options", "PUT", {
                            ...((args[0]) as any),
                            $path: {vnet}
                        }),
                    },
                    rules: {
                        /**
                         * List rules.
                         * @endpoint GET /cluster/sdn/vnets/{vnet}/firewall/rules
                         * @allowToken 1
                         * @permissions {"description": "Needs SDN.Audit or SDN.Allocate permissions on '/sdn/zones/<zone>/<vnet>'", "user": "all"}
                         *
                         * Parameters:
                         * - `vnet` (path, required, string): The SDN vnet object identifier.
                         */
                        list: (...args: ArgsTuple<PathContext<ClusterAPI["/cluster/sdn/vnets/{vnet}/firewall/rules"]["GET"]['parameters']>>) => client.request("/cluster/sdn/vnets/{vnet}/firewall/rules", "GET", {
                            ...((args[0]) as any),
                            $path: {vnet}
                        }),
                        /**
                         * Create new rule.
                         * @endpoint POST /cluster/sdn/vnets/{vnet}/firewall/rules
                         * @allowToken 1
                         * @permissions {"description": "Needs SDN.Allocate permissions on '/sdn/zones/<zone>/<vnet>'", "user": "all"}
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
                         * - `pos` (body, optional, number): Update rule at position <pos>.
                         * - `proto` (body, optional, string): IP protocol. You can use protocol names ('tcp'/'udp') or simple numbers, as defined in '/etc/protocols'.
                         * - `source` (body, optional, string): Restrict packet source address. This can refer to a single IP address, an IP set ('+ipsetname') or an IP alias definition. You can also specify an address range like '20.34.101.207-201.3.9.99', or a list of IP addresses and networks (entries are separated by comma). Please do not mix IPv4 and IPv6 addresses inside such lists.
                         * - `sport` (body, optional, string): Restrict TCP/UDP source port. You can use service names or simple numbers (0-65535), as defined in '/etc/services'. Port ranges can be specified with '\d+:\d+', for example '80:85', and you can use comma separated list to match several ports or ranges.
                         * - `type` (body, required, "in" | "out" | "forward" | "group"): Rule type.
                         * - `vnet` (path, required, string): The SDN vnet object identifier.
                         */
                        create: (...args: ArgsTuple<PathContext<ClusterAPI["/cluster/sdn/vnets/{vnet}/firewall/rules"]["POST"]['parameters']>>) => client.request("/cluster/sdn/vnets/{vnet}/firewall/rules", "POST", {
                            ...((args[0]) as any),
                            $path: {vnet}
                        }),
                        rule: (pos: number) => ({
                            /**
                             * Delete rule.
                             * @endpoint DELETE /cluster/sdn/vnets/{vnet}/firewall/rules/{pos}
                             * @allowToken 1
                             * @permissions {"description": "Needs SDN.Allocate permissions on '/sdn/zones/<zone>/<vnet>'", "user": "all"}
                             *
                             * Parameters:
                             * - `digest` (query, optional, string): Prevent changes if current configuration file has a different digest. This can be used to prevent concurrent modifications.
                             * - `pos` (path, optional, number): Update rule at position <pos>.
                             * - `vnet` (path, required, string): The SDN vnet object identifier.
                             */
                            delete: (...args: ArgsTuple<PathContext<ClusterAPI["/cluster/sdn/vnets/{vnet}/firewall/rules/{pos}"]["DELETE"]['parameters']>>) => client.request("/cluster/sdn/vnets/{vnet}/firewall/rules/{pos}", "DELETE", {
                                ...((args[0]) as any),
                                $path: {vnet, pos}
                            }),
                            /**
                             * Get single rule data.
                             * @endpoint GET /cluster/sdn/vnets/{vnet}/firewall/rules/{pos}
                             * @allowToken 1
                             * @permissions {"description": "Needs SDN.Audit or SDN.Allocate permissions on '/sdn/zones/<zone>/<vnet>'", "user": "all"}
                             *
                             * Parameters:
                             * - `pos` (path, optional, number): Update rule at position <pos>.
                             * - `vnet` (path, required, string): The SDN vnet object identifier.
                             */
                            get: (...args: ArgsTuple<PathContext<ClusterAPI["/cluster/sdn/vnets/{vnet}/firewall/rules/{pos}"]["GET"]['parameters']>>) => client.request("/cluster/sdn/vnets/{vnet}/firewall/rules/{pos}", "GET", {
                                ...((args[0]) as any),
                                $path: {vnet, pos}
                            }),
                            /**
                             * Modify rule data.
                             * @endpoint PUT /cluster/sdn/vnets/{vnet}/firewall/rules/{pos}
                             * @allowToken 1
                             * @permissions {"description": "Needs SDN.Allocate permissions on '/sdn/zones/<zone>/<vnet>'", "user": "all"}
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
                             * - `pos` (path, optional, number): Update rule at position <pos>.
                             * - `proto` (body, optional, string): IP protocol. You can use protocol names ('tcp'/'udp') or simple numbers, as defined in '/etc/protocols'.
                             * - `source` (body, optional, string): Restrict packet source address. This can refer to a single IP address, an IP set ('+ipsetname') or an IP alias definition. You can also specify an address range like '20.34.101.207-201.3.9.99', or a list of IP addresses and networks (entries are separated by comma). Please do not mix IPv4 and IPv6 addresses inside such lists.
                             * - `sport` (body, optional, string): Restrict TCP/UDP source port. You can use service names or simple numbers (0-65535), as defined in '/etc/services'. Port ranges can be specified with '\d+:\d+', for example '80:85', and you can use comma separated list to match several ports or ranges.
                             * - `type` (body, optional, "in" | "out" | "forward" | "group"): Rule type.
                             * - `vnet` (path, required, string): The SDN vnet object identifier.
                             */
                            update: (...args: ArgsTuple<PathContext<ClusterAPI["/cluster/sdn/vnets/{vnet}/firewall/rules/{pos}"]["PUT"]['parameters']>>) => client.request("/cluster/sdn/vnets/{vnet}/firewall/rules/{pos}", "PUT", {
                                ...((args[0]) as any),
                                $path: {vnet, pos}
                            }),
                        })
                    }
                },
                ips: {
                    /**
                     * Delete IP Mappings in a VNet
                     * @endpoint DELETE /cluster/sdn/vnets/{vnet}/ips
                     * @allowToken 1
                     * @permissions {"check": ["perm", "/sdn/zones/{zone}/{vnet}", ["SDN.Allocate"]]}
                     *
                     * Parameters:
                     * - `ip` (query, required, string): The IP address to delete
                     * - `mac` (query, optional, string): Unicast MAC address.
                     * - `vnet` (path, required, string): The SDN vnet object identifier.
                     * - `zone` (query, required, string): The SDN zone object identifier.
                     */
                    delete: (...args: ArgsTuple<PathContext<ClusterAPI["/cluster/sdn/vnets/{vnet}/ips"]["DELETE"]['parameters']>>) => client.request("/cluster/sdn/vnets/{vnet}/ips", "DELETE", {
                        ...((args[0]) as any),
                        $path: {vnet}
                    }),
                    /**
                     * Create IP Mapping in a VNet
                     * @endpoint POST /cluster/sdn/vnets/{vnet}/ips
                     * @allowToken 1
                     * @permissions {"check": ["perm", "/sdn/zones/{zone}/{vnet}", ["SDN.Allocate"]]}
                     *
                     * Parameters:
                     * - `ip` (body, required, string): The IP address to associate with the given MAC address
                     * - `mac` (body, optional, string): Unicast MAC address.
                     * - `vnet` (path, required, string): The SDN vnet object identifier.
                     * - `zone` (body, required, string): The SDN zone object identifier.
                     */
                    create: (...args: ArgsTuple<PathContext<ClusterAPI["/cluster/sdn/vnets/{vnet}/ips"]["POST"]['parameters']>>) => client.request("/cluster/sdn/vnets/{vnet}/ips", "POST", {
                        ...((args[0]) as any),
                        $path: {vnet}
                    }),
                    /**
                     * Update IP Mapping in a VNet
                     * @endpoint PUT /cluster/sdn/vnets/{vnet}/ips
                     * @allowToken 1
                     * @permissions {"check": ["perm", "/sdn/zones/{zone}/{vnet}", ["SDN.Allocate"]]}
                     *
                     * Parameters:
                     * - `ip` (body, required, string): The IP address to associate with the given MAC address
                     * - `mac` (body, optional, string): Unicast MAC address.
                     * - `vmid` (body, optional, number): The (unique) ID of the VM.
                     * - `vnet` (path, required, string): The SDN vnet object identifier.
                     * - `zone` (body, required, string): The SDN zone object identifier.
                     */
                    update: (...args: ArgsTuple<PathContext<ClusterAPI["/cluster/sdn/vnets/{vnet}/ips"]["PUT"]['parameters']>>) => client.request("/cluster/sdn/vnets/{vnet}/ips", "PUT", {
                        ...((args[0]) as any),
                        $path: {vnet}
                    }),
                },
                subnets: {
                    /**
                     * SDN subnets index.
                     * @endpoint GET /cluster/sdn/vnets/{vnet}/subnets
                     * @allowToken 1
                     * @permissions {"description": "Only list entries where you have 'SDN.Audit' or 'SDN.Allocate' permissions on '/sdn/zones/<zone>/<vnet>'", "user": "all"}
                     *
                     * Parameters:
                     * - `pending` (query, optional, boolean): Display pending config.
                     * - `running` (query, optional, boolean): Display running config.
                     * - `vnet` (path, required, string): The SDN vnet object identifier.
                     */
                    index: (...args: ArgsTuple<PathContext<ClusterAPI["/cluster/sdn/vnets/{vnet}/subnets"]["GET"]['parameters']>>) => client.request("/cluster/sdn/vnets/{vnet}/subnets", "GET", {
                        ...((args[0]) as any),
                        $path: {vnet}
                    }),
                    /**
                     * Create a new sdn subnet object.
                     * @endpoint POST /cluster/sdn/vnets/{vnet}/subnets
                     * @allowToken 1
                     * @permissions {"description": "Require 'SDN.Allocate' permission on '/sdn/zones/<zone>/<vnet>'", "user": "all"}
                     *
                     * Parameters:
                     * - `dhcp-dns-server` (body, optional, string): IP address for the DNS server
                     * - `dhcp-range` (body, optional, string[]): A list of DHCP ranges for this subnet
                     * - `dnszoneprefix` (body, optional, string): dns domain zone prefix  ex: 'adm' -> <hostname>.adm.mydomain.com
                     * - `gateway` (body, optional, string): Subnet Gateway: Will be assign on vnet for layer3 zones
                     * - `lock-token` (body, optional, string): the token for unlocking the global SDN configuration
                     * - `snat` (body, optional, boolean): enable masquerade for this subnet if pve-firewall
                     * - `subnet` (body, required, string): The SDN subnet object identifier.
                     * - `type` (body, required, "subnet")
                     * - `vnet` (path, required, string): associated vnet
                     */
                    create: (...args: ArgsTuple<PathContext<ClusterAPI["/cluster/sdn/vnets/{vnet}/subnets"]["POST"]['parameters']>>) => client.request("/cluster/sdn/vnets/{vnet}/subnets", "POST", {
                        ...((args[0]) as any),
                        $path: {vnet}
                    }),
                    subnet: (subnet: string) => ({
                        /**
                         * Delete sdn subnet object configuration.
                         * @endpoint DELETE /cluster/sdn/vnets/{vnet}/subnets/{subnet}
                         * @allowToken 1
                         * @permissions {"description": "Require 'SDN.Allocate' permission on '/sdn/zones/<zone>/<vnet>'", "user": "all"}
                         *
                         * Parameters:
                         * - `lock-token` (query, optional, string): the token for unlocking the global SDN configuration
                         * - `subnet` (path, required, string): The SDN subnet object identifier.
                         * - `vnet` (path, required, string): The SDN vnet object identifier.
                         */
                        delete: (...args: ArgsTuple<PathContext<ClusterAPI["/cluster/sdn/vnets/{vnet}/subnets/{subnet}"]["DELETE"]['parameters']>>) => client.request("/cluster/sdn/vnets/{vnet}/subnets/{subnet}", "DELETE", {
                            ...((args[0]) as any),
                            $path: {vnet, subnet}
                        }),
                        /**
                         * Read sdn subnet configuration.
                         * @endpoint GET /cluster/sdn/vnets/{vnet}/subnets/{subnet}
                         * @allowToken 1
                         * @permissions {"description": "Require 'SDN.Audit' or 'SDN.Allocate' permissions on '/sdn/zones/<zone>/<vnet>'", "user": "all"}
                         *
                         * Parameters:
                         * - `pending` (query, optional, boolean): Display pending config.
                         * - `running` (query, optional, boolean): Display running config.
                         * - `subnet` (path, required, string): The SDN subnet object identifier.
                         * - `vnet` (path, required, string): The SDN vnet object identifier.
                         */
                        read: (...args: ArgsTuple<PathContext<ClusterAPI["/cluster/sdn/vnets/{vnet}/subnets/{subnet}"]["GET"]['parameters']>>) => client.request("/cluster/sdn/vnets/{vnet}/subnets/{subnet}", "GET", {
                            ...((args[0]) as any),
                            $path: {vnet, subnet}
                        }),
                        /**
                         * Update sdn subnet object configuration.
                         * @endpoint PUT /cluster/sdn/vnets/{vnet}/subnets/{subnet}
                         * @allowToken 1
                         * @permissions {"description": "Require 'SDN.Allocate' permission on '/sdn/zones/<zone>/<vnet>'", "user": "all"}
                         *
                         * Parameters:
                         * - `delete` (body, optional, string): A list of settings you want to delete.
                         * - `dhcp-dns-server` (body, optional, string): IP address for the DNS server
                         * - `dhcp-range` (body, optional, string[]): A list of DHCP ranges for this subnet
                         * - `digest` (body, optional, string): Prevent changes if current configuration file has a different digest. This can be used to prevent concurrent modifications.
                         * - `dnszoneprefix` (body, optional, string): dns domain zone prefix  ex: 'adm' -> <hostname>.adm.mydomain.com
                         * - `gateway` (body, optional, string): Subnet Gateway: Will be assign on vnet for layer3 zones
                         * - `lock-token` (body, optional, string): the token for unlocking the global SDN configuration
                         * - `snat` (body, optional, boolean): enable masquerade for this subnet if pve-firewall
                         * - `subnet` (path, required, string): The SDN subnet object identifier.
                         * - `vnet` (path, optional, string): associated vnet
                         */
                        update: (...args: ArgsTuple<PathContext<ClusterAPI["/cluster/sdn/vnets/{vnet}/subnets/{subnet}"]["PUT"]['parameters']>>) => client.request("/cluster/sdn/vnets/{vnet}/subnets/{subnet}", "PUT", {
                            ...((args[0]) as any),
                            $path: {vnet, subnet}
                        }),
                    })
                }
            })
        },
        zones: {
            /**
             * SDN zones index.
             * @endpoint GET /cluster/sdn/zones
             * @allowToken 1
             * @permissions {"description": "Only list entries where you have 'SDN.Audit' or 'SDN.Allocate' permissions on '/sdn/zones/<zone>'", "user": "all"}
             *
             * Parameters:
             * - `pending` (query, optional, boolean): Display pending config.
             * - `running` (query, optional, boolean): Display running config.
             * - `type` (query, optional, "evpn" | "faucet" | "qinq" | "simple" | "vlan" | "vxlan"): Only list SDN zones of specific type
             */
            index: (...args: ArgsTuple<ClusterAPI["/cluster/sdn/zones"]["GET"]['parameters']>) => client.request("/cluster/sdn/zones", "GET", (args[0] ?? {}) as ClusterAPI["/cluster/sdn/zones"]["GET"]['parameters']),
            /**
             * Create a new sdn zone object.
             * @endpoint POST /cluster/sdn/zones
             * @allowToken 1
             * @permissions {"check": ["perm", "/sdn/zones", ["SDN.Allocate"]]}
             *
             * Parameters:
             * - `advertise-subnets` (body, optional, boolean): Advertise IP prefixes (Type-5 routes) instead of MAC/IP pairs (Type-2 routes).
             * - `bridge` (body, optional, string): The bridge for which VLANs should be managed.
             * - `bridge-disable-mac-learning` (body, optional, boolean): Disable auto mac learning.
             * - `controller` (body, optional, string): Controller for this zone.
             * - `dhcp` (body, optional, "dnsmasq"): Type of the DHCP backend for this zone
             * - `disable-arp-nd-suppression` (body, optional, boolean): Suppress IPv4 ARP && IPv6 Neighbour Discovery messages.
             * - `dns` (body, optional, string): dns api server
             * - `dnszone` (body, optional, string): dns domain zone  ex: mydomain.com
             * - `dp-id` (body, optional, number): Faucet dataplane id
             * - `exitnodes` (body, optional, string): List of cluster node names.
             * - `exitnodes-local-routing` (body, optional, boolean): Allow exitnodes to connect to EVPN guests.
             * - `exitnodes-primary` (body, optional, string): Force traffic through this exitnode first.
             * - `fabric` (body, optional, string): SDN fabric to use as underlay for this VXLAN zone.
             * - `ipam` (body, optional, string): use a specific ipam
             * - `lock-token` (body, optional, string): the token for unlocking the global SDN configuration
             * - `mac` (body, optional, string): Anycast logical router mac address.
             * - `mtu` (body, optional, number): MTU of the zone, will be used for the created VNet bridges.
             * - `nodes` (body, optional, string): List of cluster node names.
             * - `peers` (body, optional, string): Comma-separated list of peers, that are part of the VXLAN zone. Usually the IPs of the nodes.
             * - `reversedns` (body, optional, string): reverse dns api server
             * - `rt-import` (body, optional, string): List of Route Targets that should be imported into the VRF of the zone.
             * - `tag` (body, optional, number): Service-VLAN Tag (outer VLAN)
             * - `type` (body, required, "evpn" | "faucet" | "qinq" | "simple" | "vlan" | "vxlan"): Plugin type.
             * - `vlan-protocol` (body, optional, "802.1q" | "802.1ad"): Which VLAN protocol should be used for the creation of the QinQ zone.
             * - `vrf-vxlan` (body, optional, number): VNI for the zone VRF.
             * - `vxlan-port` (body, optional, number): UDP port that should be used for the VXLAN tunnel (default 4789).
             * - `zone` (body, required, string): The SDN zone object identifier.
             */
            create: (...args: ArgsTuple<ClusterAPI["/cluster/sdn/zones"]["POST"]['parameters']>) => client.request("/cluster/sdn/zones", "POST", (args[0] ?? {}) as ClusterAPI["/cluster/sdn/zones"]["POST"]['parameters']),
            zone: (zone: string) => ({
                /**
                 * Delete sdn zone object configuration.
                 * @endpoint DELETE /cluster/sdn/zones/{zone}
                 * @allowToken 1
                 * @permissions {"check": ["perm", "/sdn/zones/{zone}", ["SDN.Allocate"]]}
                 *
                 * Parameters:
                 * - `lock-token` (query, optional, string): the token for unlocking the global SDN configuration
                 * - `zone` (path, required, string): The SDN zone object identifier.
                 */
                delete_: (...args: ArgsTuple<PathContext<ClusterAPI["/cluster/sdn/zones/{zone}"]["DELETE"]['parameters']>>) => client.request("/cluster/sdn/zones/{zone}", "DELETE", {
                    ...((args[0]) as any),
                    $path: {zone}
                }),
                /**
                 * Read sdn zone configuration.
                 * @endpoint GET /cluster/sdn/zones/{zone}
                 * @allowToken 1
                 * @permissions {"check": ["perm", "/sdn/zones/{zone}", ["SDN.Allocate"]]}
                 *
                 * Parameters:
                 * - `pending` (query, optional, boolean): Display pending config.
                 * - `running` (query, optional, boolean): Display running config.
                 * - `zone` (path, required, string): The SDN zone object identifier.
                 */
                read: (...args: ArgsTuple<PathContext<ClusterAPI["/cluster/sdn/zones/{zone}"]["GET"]['parameters']>>) => client.request("/cluster/sdn/zones/{zone}", "GET", {
                    ...((args[0]) as any),
                    $path: {zone}
                }),
                /**
                 * Update sdn zone object configuration.
                 * @endpoint PUT /cluster/sdn/zones/{zone}
                 * @allowToken 1
                 * @permissions {"check": ["perm", "/sdn/zones/{zone}", ["SDN.Allocate"]]}
                 *
                 * Parameters:
                 * - `advertise-subnets` (body, optional, boolean): Advertise IP prefixes (Type-5 routes) instead of MAC/IP pairs (Type-2 routes).
                 * - `bridge` (body, optional, string): The bridge for which VLANs should be managed.
                 * - `bridge-disable-mac-learning` (body, optional, boolean): Disable auto mac learning.
                 * - `controller` (body, optional, string): Controller for this zone.
                 * - `delete` (body, optional, string): A list of settings you want to delete.
                 * - `dhcp` (body, optional, "dnsmasq"): Type of the DHCP backend for this zone
                 * - `digest` (body, optional, string): Prevent changes if current configuration file has a different digest. This can be used to prevent concurrent modifications.
                 * - `disable-arp-nd-suppression` (body, optional, boolean): Suppress IPv4 ARP && IPv6 Neighbour Discovery messages.
                 * - `dns` (body, optional, string): dns api server
                 * - `dnszone` (body, optional, string): dns domain zone  ex: mydomain.com
                 * - `dp-id` (body, optional, number): Faucet dataplane id
                 * - `exitnodes` (body, optional, string): List of cluster node names.
                 * - `exitnodes-local-routing` (body, optional, boolean): Allow exitnodes to connect to EVPN guests.
                 * - `exitnodes-primary` (body, optional, string): Force traffic through this exitnode first.
                 * - `fabric` (body, optional, string): SDN fabric to use as underlay for this VXLAN zone.
                 * - `ipam` (body, optional, string): use a specific ipam
                 * - `lock-token` (body, optional, string): the token for unlocking the global SDN configuration
                 * - `mac` (body, optional, string): Anycast logical router mac address.
                 * - `mtu` (body, optional, number): MTU of the zone, will be used for the created VNet bridges.
                 * - `nodes` (body, optional, string): List of cluster node names.
                 * - `peers` (body, optional, string): Comma-separated list of peers, that are part of the VXLAN zone. Usually the IPs of the nodes.
                 * - `reversedns` (body, optional, string): reverse dns api server
                 * - `rt-import` (body, optional, string): List of Route Targets that should be imported into the VRF of the zone.
                 * - `tag` (body, optional, number): Service-VLAN Tag (outer VLAN)
                 * - `vlan-protocol` (body, optional, "802.1q" | "802.1ad"): Which VLAN protocol should be used for the creation of the QinQ zone.
                 * - `vrf-vxlan` (body, optional, number): VNI for the zone VRF.
                 * - `vxlan-port` (body, optional, number): UDP port that should be used for the VXLAN tunnel (default 4789).
                 * - `zone` (path, required, string): The SDN zone object identifier.
                 */
                update: (...args: ArgsTuple<PathContext<ClusterAPI["/cluster/sdn/zones/{zone}"]["PUT"]['parameters']>>) => client.request("/cluster/sdn/zones/{zone}", "PUT", {
                    ...((args[0]) as any),
                    $path: {zone}
                }),
            })
        }
    },
    /**
     * Get cluster status information.
     * @endpoint GET /cluster/status
     * @allowToken 1
     * @permissions {"check": ["perm", "/", ["Sys.Audit"]]}
     */
    status: (...args: ArgsTuple<ClusterAPI["/cluster/status"]["GET"]['parameters']>) => client.request("/cluster/status", "GET", (args[0] ?? {}) as ClusterAPI["/cluster/status"]["GET"]['parameters']),
    /**
     * List recent tasks (cluster wide).
     * @endpoint GET /cluster/tasks
     * @allowToken 1
     * @permissions {"user": "all"}
     */
    tasks: (...args: ArgsTuple<ClusterAPI["/cluster/tasks"]["GET"]['parameters']>) => client.request("/cluster/tasks", "GET", (args[0] ?? {}) as ClusterAPI["/cluster/tasks"]["GET"]['parameters'])
}) as const
