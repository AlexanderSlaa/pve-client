import {Client} from "../index";
import type {ArgsTuple} from "./index";
import {PathContext} from "./index";

export type StorageAPI = {
    "/storage": {
        "GET": {
            parameters: {
                $query?: {
                    "type"?: "btrfs" | "cephfs" | "cifs" | "dir" | "esxi" | "iscsi" | "iscsidirect" | "lvm" | "lvmthin" | "nfs" | "pbs" | "rbd" | "zfs" | "zfspool"
                },
            }
            return: { "storage": string }[]
        },
        "POST": {
            parameters: {
                $body: {
                    "authsupported"?: string;
                    "base"?: string;
                    "blocksize"?: string;
                    "bwlimit"?: string;
                    "comstar_hg"?: string;
                    "comstar_tg"?: string;
                    "content"?: string;
                    "content-dirs"?: string;
                    "create-base-path"?: boolean;
                    "create-subdirs"?: boolean;
                    "data-pool"?: string;
                    "datastore"?: string;
                    "disable"?: boolean;
                    "domain"?: string;
                    "encryption-key"?: string;
                    "export"?: string;
                    "fingerprint"?: string;
                    "format"?: "raw" | "qcow2" | "subvol" | "vmdk";
                    "fs-name"?: string;
                    "fuse"?: boolean;
                    "is_mountpoint"?: string;
                    "iscsiprovider"?: string;
                    "keyring"?: string;
                    "krbd"?: boolean;
                    "lio_tpg"?: string;
                    "master-pubkey"?: string;
                    "max-protected-backups"?: number;
                    "mkdir"?: boolean;
                    "monhost"?: string;
                    "mountpoint"?: string;
                    "namespace"?: string;
                    "nocow"?: boolean;
                    "nodes"?: string;
                    "nowritecache"?: boolean;
                    "options"?: string;
                    "password"?: string;
                    "path"?: string;
                    "pool"?: string;
                    "port"?: number;
                    "portal"?: string;
                    "preallocation"?: "off" | "metadata" | "falloc" | "full";
                    "prune-backups"?: string;
                    "saferemove"?: boolean;
                    "saferemove-stepsize"?: "1" | "2" | "4" | "8" | "16" | "32";
                    "saferemove_throughput"?: string;
                    "server"?: string;
                    "share"?: string;
                    "shared"?: boolean;
                    "skip-cert-verification"?: boolean;
                    "smbversion"?: "default" | "2.0" | "2.1" | "3" | "3.0" | "3.11";
                    "snapshot-as-volume-chain"?: boolean;
                    "sparse"?: boolean;
                    "storage": string;
                    "subdir"?: string;
                    "tagged_only"?: boolean;
                    "target"?: string;
                    "thinpool"?: string;
                    "type": "btrfs" | "cephfs" | "cifs" | "dir" | "esxi" | "iscsi" | "iscsidirect" | "lvm" | "lvmthin" | "nfs" | "pbs" | "rbd" | "zfs" | "zfspool";
                    "username"?: string;
                    "vgname"?: string;
                    "zfs-base-path"?: string
                },
            }
            return: {
                "config"?: { "encryption-key"?: string };
                "storage": string;
                "type": "btrfs" | "cephfs" | "cifs" | "dir" | "esxi" | "iscsi" | "iscsidirect" | "lvm" | "lvmthin" | "nfs" | "pbs" | "rbd" | "zfs" | "zfspool"
            }
        }
    },
    "/storage/{storage}": {
        "DELETE": {
            parameters: {
                $path: { "storage": string },
            }
            return: unknown
        },
        "GET": {
            parameters: {
                $path: { "storage": string },
            }
            return: Record<string, unknown>
        },
        "PUT": {
            parameters: {
                $path: { "storage": string },
                $body: {
                    "blocksize"?: string;
                    "bwlimit"?: string;
                    "comstar_hg"?: string;
                    "comstar_tg"?: string;
                    "content"?: string;
                    "content-dirs"?: string;
                    "create-base-path"?: boolean;
                    "create-subdirs"?: boolean;
                    "data-pool"?: string;
                    "delete"?: string;
                    "digest"?: string;
                    "disable"?: boolean;
                    "domain"?: string;
                    "encryption-key"?: string;
                    "fingerprint"?: string;
                    "format"?: "raw" | "qcow2" | "subvol" | "vmdk";
                    "fs-name"?: string;
                    "fuse"?: boolean;
                    "is_mountpoint"?: string;
                    "keyring"?: string;
                    "krbd"?: boolean;
                    "lio_tpg"?: string;
                    "master-pubkey"?: string;
                    "max-protected-backups"?: number;
                    "mkdir"?: boolean;
                    "monhost"?: string;
                    "mountpoint"?: string;
                    "namespace"?: string;
                    "nocow"?: boolean;
                    "nodes"?: string;
                    "nowritecache"?: boolean;
                    "options"?: string;
                    "password"?: string;
                    "pool"?: string;
                    "port"?: number;
                    "preallocation"?: "off" | "metadata" | "falloc" | "full";
                    "prune-backups"?: string;
                    "saferemove"?: boolean;
                    "saferemove-stepsize"?: "1" | "2" | "4" | "8" | "16" | "32";
                    "saferemove_throughput"?: string;
                    "server"?: string;
                    "shared"?: boolean;
                    "skip-cert-verification"?: boolean;
                    "smbversion"?: "default" | "2.0" | "2.1" | "3" | "3.0" | "3.11";
                    "snapshot-as-volume-chain"?: boolean;
                    "sparse"?: boolean;
                    "subdir"?: string;
                    "tagged_only"?: boolean;
                    "username"?: string;
                    "zfs-base-path"?: string
                },
            }
            return: {
                "config"?: { "encryption-key"?: string };
                "storage": string;
                "type": "btrfs" | "cephfs" | "cifs" | "dir" | "esxi" | "iscsi" | "iscsidirect" | "lvm" | "lvmthin" | "nfs" | "pbs" | "rbd" | "zfs" | "zfspool"
            }
        }
    },
}


export default (client: Client) => ({
    /**
     * Storage index.
     * @endpoint GET /storage
     * @allowToken 1
     * @permissions {"description": "Only list entries where you have 'Datastore.Audit' or 'Datastore.AllocateSpace' permissions on '/storage/<storage>'", "user": "all"}
     *
     * Parameters:
     * - `type` (query, optional, "btrfs" | "cephfs" | "cifs" | "dir" | "esxi" | "iscsi" | "iscsidirect" | "lvm" | "lvmthin" | "nfs" | "pbs" | "rbd" | "zfs" | "zfspool"): Only list storage of specific type
     */
    index: (...args: ArgsTuple<StorageAPI["/storage"]["GET"]['parameters']>) => client.request("/storage", "GET", (args[0] ?? {}) as StorageAPI["/storage"]["GET"]['parameters']),
    /**
     * Create a new storage.
     * @endpoint POST /storage
     * @allowToken 1
     * @permissions {"check": ["perm", "/storage", ["Datastore.Allocate"]]}
     *
     * Parameters:
     * - `authsupported` (body, optional, string): Authsupported.
     * - `base` (body, optional, string): Base volume. This volume is automatically activated.
     * - `blocksize` (body, optional, string): block size
     * - `bwlimit` (body, optional, string): Set I/O bandwidth limit for various operations (in KiB/s).
     * - `comstar_hg` (body, optional, string): host group for comstar views
     * - `comstar_tg` (body, optional, string): target group for comstar views
     * - `content` (body, optional, string): Allowed content types.

     NOTE: the value 'rootdir' is used for Containers, and value 'images' for VMs.
     * - `content-dirs` (body, optional, string): Overrides for default content type directories.
     * - `create-base-path` (body, optional, boolean): Create the base directory if it doesn't exist.
     * - `create-subdirs` (body, optional, boolean): Populate the directory with the default structure.
     * - `data-pool` (body, optional, string): Data Pool (for erasure coding only)
     * - `datastore` (body, optional, string): Proxmox Backup Server datastore name.
     * - `disable` (body, optional, boolean): Flag to disable the storage.
     * - `domain` (body, optional, string): CIFS domain.
     * - `encryption-key` (body, optional, string): Encryption key. Use 'autogen' to generate one automatically without passphrase.
     * - `export` (body, optional, string): NFS export path.
     * - `fingerprint` (body, optional, string): Certificate SHA 256 fingerprint.
     * - `format` (body, optional, "raw" | "qcow2" | "subvol" | "vmdk"): Default image format.
     * - `fs-name` (body, optional, string): The Ceph filesystem name.
     * - `fuse` (body, optional, boolean): Mount CephFS through FUSE.
     * - `is_mountpoint` (body, optional, string): Assume the given path is an externally managed mountpoint and consider the storage offline if it is not mounted. Using a boolean (yes/no) value serves as a shortcut to using the target path in this field.
     * - `iscsiprovider` (body, optional, string): iscsi provider
     * - `keyring` (body, optional, string): Client keyring contents (for external clusters).
     * - `krbd` (body, optional, boolean): Always access rbd through krbd kernel module.
     * - `lio_tpg` (body, optional, string): target portal group for Linux LIO targets
     * - `master-pubkey` (body, optional, string): Base64-encoded, PEM-formatted public RSA key. Used to encrypt a copy of the encryption-key which will be added to each encrypted backup.
     * - `max-protected-backups` (body, optional, number): Maximal number of protected backups per guest. Use '-1' for unlimited.
     * - `mkdir` (body, optional, boolean): Create the directory if it doesn't exist and populate it with default sub-dirs. NOTE: Deprecated, use the 'create-base-path' and 'create-subdirs' options instead.
     * - `monhost` (body, optional, string): IP addresses of monitors (for external clusters).
     * - `mountpoint` (body, optional, string): mount point
     * - `namespace` (body, optional, string): Namespace.
     * - `nocow` (body, optional, boolean): Set the NOCOW flag on files. Disables data checksumming and causes data errors to be unrecoverable from while allowing direct I/O. Only use this if data does not need to be any more safe than on a single ext4 formatted disk with no underlying raid system.
     * - `nodes` (body, optional, string): List of nodes for which the storage configuration applies.
     * - `nowritecache` (body, optional, boolean): disable write caching on the target
     * - `options` (body, optional, string): NFS/CIFS mount options (see 'man nfs' or 'man mount.cifs')
     * - `password` (body, optional, string): Password for accessing the share/datastore.
     * - `path` (body, optional, string): File system path.
     * - `pool` (body, optional, string): Pool.
     * - `port` (body, optional, number): Use this port to connect to the storage instead of the default one (for example, with PBS or ESXi). For NFS and CIFS, use the 'options' option to configure the port via the mount options.
     * - `portal` (body, optional, string): iSCSI portal (IP or DNS name with optional port).
     * - `preallocation` (body, optional, "off" | "metadata" | "falloc" | "full"): Preallocation mode for raw and qcow2 images. Using 'metadata' on raw images results in preallocation=off.
     * - `prune-backups` (body, optional, string): The retention options with shorter intervals are processed first with --keep-last being the very first one. Each option covers a specific period of time. We say that backups within this period are covered by this option. The next option does not take care of already covered backups and only considers older backups.
     * - `saferemove` (body, optional, boolean): Zero-out data when removing LVs.
     * - `saferemove-stepsize` (body, optional, "1" | "2" | "4" | "8" | "16" | "32"): Wipe step size in MiB. It will be capped to the maximum supported by the storage.
     * - `saferemove_throughput` (body, optional, string): Wipe throughput (cstream -t parameter value).
     * - `server` (body, optional, string): Server IP or DNS name.
     * - `share` (body, optional, string): CIFS share.
     * - `shared` (body, optional, boolean): Indicate that this is a single storage with the same contents on all nodes (or all listed in the 'nodes' option). It will not make the contents of a local storage automatically accessible to other nodes, it just marks an already shared storage as such!
     * - `skip-cert-verification` (body, optional, boolean): Disable TLS certificate verification, only enable on fully trusted networks!
     * - `smbversion` (body, optional, "default" | "2.0" | "2.1" | "3" | "3.0" | "3.11"): SMB protocol version. 'default' if not set, negotiates the highest SMB2+ version supported by both the client and server.
     * - `snapshot-as-volume-chain` (body, optional, boolean): Enable support for creating storage-vendor agnostic snapshot through volume backing-chains.
     * - `sparse` (body, optional, boolean): use sparse volumes
     * - `storage` (body, required, string): The storage identifier.
     * - `subdir` (body, optional, string): Subdir to mount.
     * - `tagged_only` (body, optional, boolean): Only use logical volumes tagged with 'pve-vm-ID'.
     * - `target` (body, optional, string): iSCSI target.
     * - `thinpool` (body, optional, string): LVM thin pool LV name.
     * - `type` (body, required, "btrfs" | "cephfs" | "cifs" | "dir" | "esxi" | "iscsi" | "iscsidirect" | "lvm" | "lvmthin" | "nfs" | "pbs" | "rbd" | "zfs" | "zfspool"): Storage type.
     * - `username` (body, optional, string): RBD Id.
     * - `vgname` (body, optional, string): Volume group name.
     * - `zfs-base-path` (body, optional, string): Base path where to look for the created ZFS block devices. Set automatically during creation if not specified. Usually '/dev/zvol'.
     */
    create: (...args: ArgsTuple<StorageAPI["/storage"]["POST"]['parameters']>) => client.request("/storage", "POST", (args[0] ?? {}) as StorageAPI["/storage"]["POST"]['parameters']),
    storage: (value: string | number) => ({
        /**
         * Delete storage configuration.
         * @endpoint DELETE /storage/{storage}
         * @allowToken 1
         * @permissions {"check": ["perm", "/storage", ["Datastore.Allocate"]]}
         *
         * Parameters:
         * - `storage` (path, required, string): The storage identifier.
         */
        delete_: (...args: ArgsTuple<PathContext<StorageAPI["/storage/{storage}"]["DELETE"]['parameters']>>) => client.request("/storage/{storage}", "DELETE", {
            ...((args[0]) as any),
            $path: {"storage": value.toString()}
        }),
        /**
         * Read storage configuration.
         * @endpoint GET /storage/{storage}
         * @allowToken 1
         * @permissions {"check": ["perm", "/storage/{storage}", ["Datastore.Allocate"]]}
         *
         * Parameters:
         * - `storage` (path, required, string): The storage identifier.
         */
        read: (...args: ArgsTuple<PathContext<StorageAPI["/storage/{storage}"]["GET"]['parameters']>>) => client.request("/storage/{storage}", "GET", {
            ...((args[0]) as any),
            $path: {"storage": value.toString()}
        }),
        /**
         * Update storage configuration.
         * @endpoint PUT /storage/{storage}
         * @allowToken 1
         * @permissions {"check": ["perm", "/storage", ["Datastore.Allocate"]]}
         *
         * Parameters:
         * - `blocksize` (body, optional, string): block size
         * - `bwlimit` (body, optional, string): Set I/O bandwidth limit for various operations (in KiB/s).
         * - `comstar_hg` (body, optional, string): host group for comstar views
         * - `comstar_tg` (body, optional, string): target group for comstar views
         * - `content` (body, optional, string): Allowed content types.

         NOTE: the value 'rootdir' is used for Containers, and value 'images' for VMs.
         * - `content-dirs` (body, optional, string): Overrides for default content type directories.
         * - `create-base-path` (body, optional, boolean): Create the base directory if it doesn't exist.
         * - `create-subdirs` (body, optional, boolean): Populate the directory with the default structure.
         * - `data-pool` (body, optional, string): Data Pool (for erasure coding only)
         * - `delete` (body, optional, string): A list of settings you want to delete.
         * - `digest` (body, optional, string): Prevent changes if current configuration file has a different digest. This can be used to prevent concurrent modifications.
         * - `disable` (body, optional, boolean): Flag to disable the storage.
         * - `domain` (body, optional, string): CIFS domain.
         * - `encryption-key` (body, optional, string): Encryption key. Use 'autogen' to generate one automatically without passphrase.
         * - `fingerprint` (body, optional, string): Certificate SHA 256 fingerprint.
         * - `format` (body, optional, "raw" | "qcow2" | "subvol" | "vmdk"): Default image format.
         * - `fs-name` (body, optional, string): The Ceph filesystem name.
         * - `fuse` (body, optional, boolean): Mount CephFS through FUSE.
         * - `is_mountpoint` (body, optional, string): Assume the given path is an externally managed mountpoint and consider the storage offline if it is not mounted. Using a boolean (yes/no) value serves as a shortcut to using the target path in this field.
         * - `keyring` (body, optional, string): Client keyring contents (for external clusters).
         * - `krbd` (body, optional, boolean): Always access rbd through krbd kernel module.
         * - `lio_tpg` (body, optional, string): target portal group for Linux LIO targets
         * - `master-pubkey` (body, optional, string): Base64-encoded, PEM-formatted public RSA key. Used to encrypt a copy of the encryption-key which will be added to each encrypted backup.
         * - `max-protected-backups` (body, optional, number): Maximal number of protected backups per guest. Use '-1' for unlimited.
         * - `mkdir` (body, optional, boolean): Create the directory if it doesn't exist and populate it with default sub-dirs. NOTE: Deprecated, use the 'create-base-path' and 'create-subdirs' options instead.
         * - `monhost` (body, optional, string): IP addresses of monitors (for external clusters).
         * - `mountpoint` (body, optional, string): mount point
         * - `namespace` (body, optional, string): Namespace.
         * - `nocow` (body, optional, boolean): Set the NOCOW flag on files. Disables data checksumming and causes data errors to be unrecoverable from while allowing direct I/O. Only use this if data does not need to be any more safe than on a single ext4 formatted disk with no underlying raid system.
         * - `nodes` (body, optional, string): List of nodes for which the storage configuration applies.
         * - `nowritecache` (body, optional, boolean): disable write caching on the target
         * - `options` (body, optional, string): NFS/CIFS mount options (see 'man nfs' or 'man mount.cifs')
         * - `password` (body, optional, string): Password for accessing the share/datastore.
         * - `pool` (body, optional, string): Pool.
         * - `port` (body, optional, number): Use this port to connect to the storage instead of the default one (for example, with PBS or ESXi). For NFS and CIFS, use the 'options' option to configure the port via the mount options.
         * - `preallocation` (body, optional, "off" | "metadata" | "falloc" | "full"): Preallocation mode for raw and qcow2 images. Using 'metadata' on raw images results in preallocation=off.
         * - `prune-backups` (body, optional, string): The retention options with shorter intervals are processed first with --keep-last being the very first one. Each option covers a specific period of time. We say that backups within this period are covered by this option. The next option does not take care of already covered backups and only considers older backups.
         * - `saferemove` (body, optional, boolean): Zero-out data when removing LVs.
         * - `saferemove-stepsize` (body, optional, "1" | "2" | "4" | "8" | "16" | "32"): Wipe step size in MiB. It will be capped to the maximum supported by the storage.
         * - `saferemove_throughput` (body, optional, string): Wipe throughput (cstream -t parameter value).
         * - `server` (body, optional, string): Server IP or DNS name.
         * - `shared` (body, optional, boolean): Indicate that this is a single storage with the same contents on all nodes (or all listed in the 'nodes' option). It will not make the contents of a local storage automatically accessible to other nodes, it just marks an already shared storage as such!
         * - `skip-cert-verification` (body, optional, boolean): Disable TLS certificate verification, only enable on fully trusted networks!
         * - `smbversion` (body, optional, "default" | "2.0" | "2.1" | "3" | "3.0" | "3.11"): SMB protocol version. 'default' if not set, negotiates the highest SMB2+ version supported by both the client and server.
         * - `snapshot-as-volume-chain` (body, optional, boolean): Enable support for creating storage-vendor agnostic snapshot through volume backing-chains.
         * - `sparse` (body, optional, boolean): use sparse volumes
         * - `storage` (path, required, string): The storage identifier.
         * - `subdir` (body, optional, string): Subdir to mount.
         * - `tagged_only` (body, optional, boolean): Only use logical volumes tagged with 'pve-vm-ID'.
         * - `username` (body, optional, string): RBD Id.
         * - `zfs-base-path` (body, optional, string): Base path where to look for the created ZFS block devices. Set automatically during creation if not specified. Usually '/dev/zvol'.
         */
        update: (...args: ArgsTuple<PathContext<StorageAPI["/storage/{storage}"]["PUT"]['parameters']>>) => client.request("/storage/{storage}", "PUT", {
            ...((args[0]) as any),
            $path: {"storage": value.toString()}
        })
    })
}) as const
