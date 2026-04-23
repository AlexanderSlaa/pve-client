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

// TODO: Move the full NodesAPI type definition here from nodes.ts
export type NodesAPI = {};
