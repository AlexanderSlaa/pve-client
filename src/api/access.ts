import {Client} from "../index";
import {PathContext} from "./";

export type AccessAPI = {
    "/access": {
        "GET": {
            parameters: {}
            return: { "subdir": string }[]
        }
    },
    "/access/acl": {
        "GET": {
            parameters: {}
            return: {
                "path": string;
                "propagate"?: boolean;
                "roleid": string;
                "type": "user" | "group" | "token";
                "ugid": string
            }[]
        },
        "PUT": {
            parameters: {
                $body: {
                    "delete"?: boolean;
                    "groups"?: string;
                    "path": string;
                    "propagate"?: boolean;
                    "roles": string;
                    "tokens"?: string;
                    "users"?: string
                },
            }
            return: unknown
        }
    },
    "/access/domains": {
        "GET": {
            parameters: {}
            return: { "comment"?: string; "realm": string; "tfa"?: "yubico" | "oath"; "type": string }[]
        },
        "POST": {
            parameters: {
                $body: {
                    "acr-values"?: string;
                    "autocreate"?: boolean;
                    "base_dn"?: string;
                    "bind_dn"?: string;
                    "capath"?: string;
                    "case-sensitive"?: boolean;
                    "cert"?: string;
                    "certkey"?: string;
                    "check-connection"?: boolean;
                    "client-id"?: string;
                    "client-key"?: string;
                    "comment"?: string;
                    "default"?: boolean;
                    "domain"?: string;
                    "filter"?: string;
                    "group_classes"?: string;
                    "group_dn"?: string;
                    "group_filter"?: string;
                    "group_name_attr"?: string;
                    "groups-autocreate"?: boolean;
                    "groups-claim"?: string;
                    "groups-overwrite"?: boolean;
                    "issuer-url"?: string;
                    "mode"?: "ldap" | "ldaps" | "ldap+starttls";
                    "password"?: string;
                    "port"?: number;
                    "prompt"?: string;
                    "query-userinfo"?: boolean;
                    "realm": string;
                    "scopes"?: string;
                    "secure"?: boolean;
                    "server1"?: string;
                    "server2"?: string;
                    "sslversion"?: "tlsv1" | "tlsv1_1" | "tlsv1_2" | "tlsv1_3";
                    "sync-defaults-options"?: string;
                    "sync_attributes"?: string;
                    "tfa"?: string;
                    "type": "ad" | "ldap" | "openid" | "pam" | "pve";
                    "user_attr"?: string;
                    "user_classes"?: string;
                    "username-claim"?: string;
                    "verify"?: boolean
                },
            }
            return: unknown
        }
    },
    "/access/domains/{realm}": {
        "DELETE": {
            parameters: {
                $path: { "realm": string },
            }
            return: unknown
        },
        "GET": {
            parameters: {
                $path: { "realm": string },
            }
            return: unknown
        },
        "PUT": {
            parameters: {
                $path: { "realm": string },
                $body: {
                    "acr-values"?: string;
                    "autocreate"?: boolean;
                    "base_dn"?: string;
                    "bind_dn"?: string;
                    "capath"?: string;
                    "case-sensitive"?: boolean;
                    "cert"?: string;
                    "certkey"?: string;
                    "check-connection"?: boolean;
                    "client-id"?: string;
                    "client-key"?: string;
                    "comment"?: string;
                    "default"?: boolean;
                    "delete"?: string;
                    "digest"?: string;
                    "domain"?: string;
                    "filter"?: string;
                    "group_classes"?: string;
                    "group_dn"?: string;
                    "group_filter"?: string;
                    "group_name_attr"?: string;
                    "groups-autocreate"?: boolean;
                    "groups-claim"?: string;
                    "groups-overwrite"?: boolean;
                    "issuer-url"?: string;
                    "mode"?: "ldap" | "ldaps" | "ldap+starttls";
                    "password"?: string;
                    "port"?: number;
                    "prompt"?: string;
                    "query-userinfo"?: boolean;
                    "scopes"?: string;
                    "secure"?: boolean;
                    "server1"?: string;
                    "server2"?: string;
                    "sslversion"?: "tlsv1" | "tlsv1_1" | "tlsv1_2" | "tlsv1_3";
                    "sync-defaults-options"?: string;
                    "sync_attributes"?: string;
                    "tfa"?: string;
                    "user_attr"?: string;
                    "user_classes"?: string;
                    "verify"?: boolean
                },
            }
            return: unknown
        }
    },
    "/access/domains/{realm}/sync": {
        "POST": {
            parameters: {
                $path: { "realm": string },
                $body: {
                    "dry-run"?: boolean;
                    "enable-new"?: boolean;
                    "full"?: boolean;
                    "purge"?: boolean;
                    "remove-vanished"?: string;
                    "scope"?: "users" | "groups" | "both"
                },
            }
            return: string
        }
    },
    "/access/groups": {
        "GET": {
            parameters: {}
            return: { "comment"?: string; "groupid": string; "users"?: string }[]
        },
        "POST": {
            parameters: {
                $body: { "comment"?: string; "groupid": string },
            }
            return: unknown
        }
    },
    "/access/groups/{groupid}": {
        "DELETE": {
            parameters: {
                $path: { "groupid": string },
            }
            return: unknown
        },
        "GET": {
            parameters: {
                $path: { "groupid": string },
            }
            return: { "comment"?: string; "members": string[] }
        },
        "PUT": {
            parameters: {
                $path: { "groupid": string },
                $body: { "comment"?: string },
            }
            return: unknown
        }
    },
    "/access/openid": {
        "GET": {
            parameters: {}
            return: { "subdir": string }[]
        }
    },
    "/access/openid/auth-url": {
        "POST": {
            parameters: {
                $body: { "realm": string; "redirect-url": string },
            }
            return: string
        }
    },
    "/access/openid/login": {
        "POST": {
            parameters: {
                $body: { "code": string; "redirect-url": string; "state": string },
            }
            return: {
                "CSRFPreventionToken": string;
                "cap": Record<string, unknown>;
                "clustername"?: string;
                "ticket": string;
                "username": string
            }
        }
    },
    "/access/password": {
        "PUT": {
            parameters: {
                $body: { "confirmation-password"?: string; "password": string; "userid": string },
            }
            return: unknown
        }
    },
    "/access/permissions": {
        "GET": {
            parameters: {
                $query?: { "path"?: string; "userid"?: string },
            }
            return: Record<string, unknown>
        }
    },
    "/access/roles": {
        "GET": {
            parameters: {}
            return: { "privs"?: string; "roleid": string; "special"?: boolean }[]
        },
        "POST": {
            parameters: {
                $body: { "privs"?: string; "roleid": string },
            }
            return: unknown
        }
    },
    "/access/roles/{roleid}": {
        "DELETE": {
            parameters: {
                $path: { "roleid": string },
            }
            return: unknown
        },
        "GET": {
            parameters: {
                $path: { "roleid": string },
            }
            return: {
                "Datastore.Allocate"?: boolean;
                "Datastore.AllocateSpace"?: boolean;
                "Datastore.AllocateTemplate"?: boolean;
                "Datastore.Audit"?: boolean;
                "Group.Allocate"?: boolean;
                "Mapping.Audit"?: boolean;
                "Mapping.Modify"?: boolean;
                "Mapping.Use"?: boolean;
                "Permissions.Modify"?: boolean;
                "Pool.Allocate"?: boolean;
                "Pool.Audit"?: boolean;
                "Realm.Allocate"?: boolean;
                "Realm.AllocateUser"?: boolean;
                "SDN.Allocate"?: boolean;
                "SDN.Audit"?: boolean;
                "SDN.Use"?: boolean;
                "Sys.AccessNetwork"?: boolean;
                "Sys.Audit"?: boolean;
                "Sys.Console"?: boolean;
                "Sys.Incoming"?: boolean;
                "Sys.Modify"?: boolean;
                "Sys.PowerMgmt"?: boolean;
                "Sys.Syslog"?: boolean;
                "User.Modify"?: boolean;
                "VM.Allocate"?: boolean;
                "VM.Audit"?: boolean;
                "VM.Backup"?: boolean;
                "VM.Clone"?: boolean;
                "VM.Config.CDROM"?: boolean;
                "VM.Config.CPU"?: boolean;
                "VM.Config.Cloudinit"?: boolean;
                "VM.Config.Disk"?: boolean;
                "VM.Config.HWType"?: boolean;
                "VM.Config.Memory"?: boolean;
                "VM.Config.Network"?: boolean;
                "VM.Config.Options"?: boolean;
                "VM.Console"?: boolean;
                "VM.GuestAgent.Audit"?: boolean;
                "VM.GuestAgent.FileRead"?: boolean;
                "VM.GuestAgent.FileSystemMgmt"?: boolean;
                "VM.GuestAgent.FileWrite"?: boolean;
                "VM.GuestAgent.Unrestricted"?: boolean;
                "VM.Migrate"?: boolean;
                "VM.PowerMgmt"?: boolean;
                "VM.Replicate"?: boolean;
                "VM.Snapshot"?: boolean;
                "VM.Snapshot.Rollback"?: boolean
            }
        },
        "PUT": {
            parameters: {
                $path: { "roleid": string },
                $body: { "append"?: boolean; "privs"?: string },
            }
            return: unknown
        }
    },
    "/access/tfa": {
        "GET": {
            parameters: {}
            return: {
                "entries": {
                    "created": number;
                    "description": string;
                    "enable"?: boolean;
                    "id": string;
                    "type": "totp" | "u2f" | "webauthn" | "recovery" | "yubico"
                }[];
                "tfa-locked-until"?: number;
                "totp-locked"?: boolean;
                "userid": string
            }[]
        }
    },
    "/access/tfa/{userid}": {
        "GET": {
            parameters: {
                $path: { "userid": string },
            }
            return: {
                "created": number;
                "description": string;
                "enable"?: boolean;
                "id": string;
                "type": "totp" | "u2f" | "webauthn" | "recovery" | "yubico"
            }[]
        },
        "POST": {
            parameters: {
                $path: { "userid": string },
                $body: {
                    "challenge"?: string;
                    "description"?: string;
                    "password"?: string;
                    "totp"?: string;
                    "type": "totp" | "u2f" | "webauthn" | "recovery" | "yubico";
                    "value"?: string
                },
            }
            return: { "challenge"?: string; "id": string; "recovery"?: string[] }
        }
    },
    "/access/tfa/{userid}/{id}": {
        "DELETE": {
            parameters: {
                $path: { "userid": string; "id": string },
                $query?: { "password"?: string },
            }
            return: unknown
        },
        "GET": {
            parameters: {
                $path: { "userid": string; "id": string },
            }
            return: {
                "created": number;
                "description": string;
                "enable"?: boolean;
                "id": string;
                "type": "totp" | "u2f" | "webauthn" | "recovery" | "yubico"
            }
        },
        "PUT": {
            parameters: {
                $path: { "userid": string; "id": string },
                $body: { "description"?: string; "enable"?: boolean; "password"?: string },
            }
            return: unknown
        }
    },
    "/access/ticket": {
        "GET": {
            parameters: {}
            return: unknown
        },
        "POST": {
            parameters: {
                $body: {
                    "new-format"?: boolean;
                    "otp"?: string;
                    "password": string;
                    "path"?: string;
                    "privs"?: string;
                    "realm"?: string;
                    "tfa-challenge"?: string;
                    "username": string
                },
            }
            return: { "CSRFPreventionToken"?: string; "clustername"?: string; "ticket"?: string; "username": string }
        }
    },
    "/access/users": {
        "GET": {
            parameters: {
                $query?: { "enabled"?: boolean; "full"?: boolean },
            }
            return: {
                "comment"?: string;
                "email"?: string;
                "enable"?: boolean;
                "expire"?: number;
                "firstname"?: string;
                "groups"?: string;
                "keys"?: string;
                "lastname"?: string;
                "realm-type"?: string;
                "tfa-locked-until"?: number;
                "tokens"?: { "comment"?: string; "expire"?: number; "privsep"?: boolean; "tokenid": string }[];
                "totp-locked"?: boolean;
                "userid": string
            }[]
        },
        "POST": {
            parameters: {
                $body: {
                    "comment"?: string;
                    "email"?: string;
                    "enable"?: boolean;
                    "expire"?: number;
                    "firstname"?: string;
                    "groups"?: string;
                    "keys"?: string;
                    "lastname"?: string;
                    "password"?: string;
                    "userid": string
                },
            }
            return: unknown
        }
    },
    "/access/users/{userid}": {
        "DELETE": {
            parameters: {
                $path: { "userid": string },
            }
            return: unknown
        },
        "GET": {
            parameters: {
                $path: { "userid": string },
            }
            return: {
                "comment"?: string;
                "email"?: string;
                "enable"?: boolean;
                "expire"?: number;
                "firstname"?: string;
                "groups"?: string[];
                "keys"?: string;
                "lastname"?: string;
                "tokens"?: Record<string, { "comment"?: string; "expire"?: number; "privsep"?: boolean }>
            }
        },
        "PUT": {
            parameters: {
                $path: { "userid": string },
                $body: {
                    "append"?: boolean;
                    "comment"?: string;
                    "email"?: string;
                    "enable"?: boolean;
                    "expire"?: number;
                    "firstname"?: string;
                    "groups"?: string;
                    "keys"?: string;
                    "lastname"?: string
                },
            }
            return: unknown
        }
    },
    "/access/users/{userid}/tfa": {
        "GET": {
            parameters: {
                $path: { "userid": string },
                $query?: { "multiple"?: boolean },
            }
            return: {
                "realm"?: "oath" | "yubico";
                "types"?: "totp" | "u2f" | "yubico" | "webauthn" | "recovedry"[];
                "user"?: "oath" | "u2f"
            }
        }
    },
    "/access/users/{userid}/token": {
        "GET": {
            parameters: {
                $path: { "userid": string },
            }
            return: { "comment"?: string; "expire"?: number; "privsep"?: boolean; "tokenid": string }[]
        }
    },
    "/access/users/{userid}/token/{tokenid}": {
        "DELETE": {
            parameters: {
                $path: { "userid": string; "tokenid": string },
            }
            return: unknown
        },
        "GET": {
            parameters: {
                $path: { "userid": string; "tokenid": string },
            }
            return: { "comment"?: string; "expire"?: number; "privsep"?: boolean }
        },
        "POST": {
            parameters: {
                $path: { "userid": string; "tokenid": string },
                $body: { "comment"?: string; "expire"?: number; "privsep"?: boolean },
            }
            return: {
                "full-tokenid": string;
                "info": { "comment"?: string; "expire"?: number; "privsep"?: boolean };
                "value": string
            }
        },
        "PUT": {
            parameters: {
                $path: { "userid": string; "tokenid": string },
                $body: { "comment"?: string; "delete"?: string; "expire"?: number; "privsep"?: boolean },
            }
            return: { "comment"?: string; "expire"?: number; "privsep"?: boolean }
        }
    },
    "/access/users/{userid}/unlock-tfa": {
        "PUT": {
            parameters: {
                $path: { "userid": string },
            }
            return: boolean
        }
    },
    "/access/vncticket": {
        "POST": {
            parameters: {
                $body: { "authid": string; "path": string; "privs": string; "vncticket": string },
            }
            return: unknown
        }
    },
}

export default (client: Client) => ({
    /**
     * Directory index.
     * @endpoint GET /access
     * @allowToken 1
     * @permissions {"user": "all"}
     */
    index: (args: AccessAPI["/access"]["GET"]['parameters']) => client.request("/access", "GET", args),
    acl: {
        /**
         * Get Access Control List (ACLs).
         * @endpoint GET /access/acl
         * @allowToken 1
         * @permissions {"description": "The returned list is restricted to objects where you have rights to modify permissions.", "user": "all"}
         */
        read: (args: AccessAPI["/access/acl"]["GET"]['parameters']) => client.request("/access/acl", "GET", args),
        /**
         * Update Access Control List (add or remove permissions).
         * @endpoint PUT /access/acl
         * @allowToken 1
         * @permissions {"check": ["perm-modify", "{path}"]}
         *
         * Parameters:
         * - `delete` (body, optional, boolean): Remove permissions (instead of adding it).
         * - `groups` (body, optional, string): List of groups.
         * - `path` (body, required, string): Access control path
         * - `propagate` (body, optional, boolean): Allow to propagate (inherit) permissions.
         * - `roles` (body, required, string): List of roles.
         * - `tokens` (body, optional, string): List of API tokens.
         * - `users` (body, optional, string): List of users.
         */
        update: (args: AccessAPI["/access/acl"]["PUT"]['parameters']) => client.request("/access/acl", "PUT", args)
    },
    domains: {
        /**
         * Authentication domain index.
         * @endpoint GET /access/domains
         * @allowToken 1
         * @permissions {"description": "Anyone can access that, because we need that list for the login box (before the user is authenticated).", "user": "world"}
         */
        index: (args: AccessAPI["/access/domains"]["GET"]['parameters']) => client.request("/access/domains", "GET", args),
        /**
         * Add an authentication server.
         * @endpoint POST /access/domains
         * @allowToken 1
         * @permissions {"check": ["perm", "/access/realm", ["Realm.Allocate"]]}
         *
         * Parameters:
         * - `acr-values` (body, optional, string): Specifies the Authentication Context Class Reference values that theAuthorization Server is being requested to use for the Auth Request.
         * - `autocreate` (body, optional, boolean): Automatically create users if they do not exist.
         * - `base_dn` (body, optional, string): LDAP base domain name
         * - `bind_dn` (body, optional, string): LDAP bind domain name
         * - `capath` (body, optional, string): Path to the CA certificate store
         * - `case-sensitive` (body, optional, boolean): username is case-sensitive
         * - `cert` (body, optional, string): Path to the client certificate
         * - `certkey` (body, optional, string): Path to the client certificate key
         * - `check-connection` (body, optional, boolean): Check bind connection to the server.
         * - `client-id` (body, optional, string): OpenID Client ID
         * - `client-key` (body, optional, string): OpenID Client Key
         * - `comment` (body, optional, string): Description.
         * - `default` (body, optional, boolean): Use this as default realm
         * - `domain` (body, optional, string): AD domain name
         * - `filter` (body, optional, string): LDAP filter for user sync.
         * - `group_classes` (body, optional, string): The objectclasses for groups.
         * - `group_dn` (body, optional, string): LDAP base domain name for group sync. If not set, the base_dn will be used.
         * - `group_filter` (body, optional, string): LDAP filter for group sync.
         * - `group_name_attr` (body, optional, string): LDAP attribute representing a groups name. If not set or found, the first value of the DN will be used as name.
         * - `groups-autocreate` (body, optional, boolean): Automatically create groups if they do not exist.
         * - `groups-claim` (body, optional, string): OpenID claim used to retrieve groups with.
         * - `groups-overwrite` (body, optional, boolean): All groups will be overwritten for the user on login.
         * - `issuer-url` (body, optional, string): OpenID Issuer Url
         * - `mode` (body, optional, "ldap" | "ldaps" | "ldap+starttls"): LDAP protocol mode.
         * - `password` (body, optional, string): LDAP bind password. Will be stored in '/etc/pve/priv/realm/<REALM>.pw'.
         * - `port` (body, optional, number): Server port.
         * - `prompt` (body, optional, string): Specifies whether the Authorization Server prompts the End-User for reauthentication and consent.
         * - `query-userinfo` (body, optional, boolean): Enables querying the userinfo endpoint for claims values.
         * - `realm` (body, required, string): Authentication domain ID
         * - `scopes` (body, optional, string): Specifies the scopes (user details) that should be authorized and returned, for example 'email' or 'profile'.
         * - `secure` (body, optional, boolean): Use secure LDAPS protocol. DEPRECATED: use 'mode' instead.
         * - `server1` (body, optional, string): Server IP address (or DNS name)
         * - `server2` (body, optional, string): Fallback Server IP address (or DNS name)
         * - `sslversion` (body, optional, "tlsv1" | "tlsv1_1" | "tlsv1_2" | "tlsv1_3"): LDAPS TLS/SSL version. It's not recommended to use version older than 1.2!
         * - `sync-defaults-options` (body, optional, string): The default options for behavior of synchronizations.
         * - `sync_attributes` (body, optional, string): Comma separated list of key=value pairs for specifying which LDAP attributes map to which PVE user field. For example, to map the LDAP attribute 'mail' to PVEs 'email', write  'email=mail'. By default, each PVE user field is represented  by an LDAP attribute of the same name.
         * - `tfa` (body, optional, string): Use Two-factor authentication.
         * - `type` (body, required, "ad" | "ldap" | "openid" | "pam" | "pve"): Realm type.
         * - `user_attr` (body, optional, string): LDAP user attribute name
         * - `user_classes` (body, optional, string): The objectclasses for users.
         * - `username-claim` (body, optional, string): OpenID claim used to generate the unique username.
         * - `verify` (body, optional, boolean): Verify the server's SSL certificate
         */
        create: (args: AccessAPI["/access/domains"]["POST"]['parameters']) => client.request("/access/domains", "POST", args),
        realm: (value: string) => ({
            /**
             * Delete an authentication server.
             * @endpoint DELETE /access/domains/{realm}
             * @allowToken 1
             * @permissions {"check": ["perm", "/access/realm", ["Realm.Allocate"]]}
             *
             * Parameters:
             * - `realm` (path, required, string): Authentication domain ID
             */
            delete: (args: PathContext<AccessAPI["/access/domains/{realm}"]["DELETE"]['parameters']>) => client.request("/access/domains/{realm}", "DELETE", {
                ...args,
                $path: {realm: value}
            }),
            /**
             * Get auth server configuration.
             * @endpoint GET /access/domains/{realm}
             * @allowToken 1
             * @permissions {"check": ["perm", "/access/realm", ["Realm.Allocate", "Sys.Audit"], "any", 1]}
             *
             * Parameters:
             * - `realm` (path, required, string): Authentication domain ID
             */
            read: (args: PathContext<AccessAPI["/access/domains/{realm}"]["GET"]['parameters']>) => client.request("/access/domains/{realm}", "GET", {
                ...args,
                $path: {realm: value}
            }),
            /**
             * Update authentication server settings.
             * @endpoint PUT /access/domains/{realm}
             * @allowToken 1
             * @permissions {"check": ["perm", "/access/realm", ["Realm.Allocate"]]}
             *
             * Parameters:
             * - `acr-values` (body, optional, string): Specifies the Authentication Context Class Reference values that theAuthorization Server is being requested to use for the Auth Request.
             * - `autocreate` (body, optional, boolean): Automatically create users if they do not exist.
             * - `base_dn` (body, optional, string): LDAP base domain name
             * - `bind_dn` (body, optional, string): LDAP bind domain name
             * - `capath` (body, optional, string): Path to the CA certificate store
             * - `case-sensitive` (body, optional, boolean): username is case-sensitive
             * - `cert` (body, optional, string): Path to the client certificate
             * - `certkey` (body, optional, string): Path to the client certificate key
             * - `check-connection` (body, optional, boolean): Check bind connection to the server.
             * - `client-id` (body, optional, string): OpenID Client ID
             * - `client-key` (body, optional, string): OpenID Client Key
             * - `comment` (body, optional, string): Description.
             * - `default` (body, optional, boolean): Use this as default realm
             * - `delete` (body, optional, string): A list of settings you want to delete.
             * - `digest` (body, optional, string): Prevent changes if current configuration file has a different digest. This can be used to prevent concurrent modifications.
             * - `domain` (body, optional, string): AD domain name
             * - `filter` (body, optional, string): LDAP filter for user sync.
             * - `group_classes` (body, optional, string): The objectclasses for groups.
             * - `group_dn` (body, optional, string): LDAP base domain name for group sync. If not set, the base_dn will be used.
             * - `group_filter` (body, optional, string): LDAP filter for group sync.
             * - `group_name_attr` (body, optional, string): LDAP attribute representing a groups name. If not set or found, the first value of the DN will be used as name.
             * - `groups-autocreate` (body, optional, boolean): Automatically create groups if they do not exist.
             * - `groups-claim` (body, optional, string): OpenID claim used to retrieve groups with.
             * - `groups-overwrite` (body, optional, boolean): All groups will be overwritten for the user on login.
             * - `issuer-url` (body, optional, string): OpenID Issuer Url
             * - `mode` (body, optional, "ldap" | "ldaps" | "ldap+starttls"): LDAP protocol mode.
             * - `password` (body, optional, string): LDAP bind password. Will be stored in '/etc/pve/priv/realm/<REALM>.pw'.
             * - `port` (body, optional, number): Server port.
             * - `prompt` (body, optional, string): Specifies whether the Authorization Server prompts the End-User for reauthentication and consent.
             * - `query-userinfo` (body, optional, boolean): Enables querying the userinfo endpoint for claims values.
             * - `realm` (path, required, string): Authentication domain ID
             * - `scopes` (body, optional, string): Specifies the scopes (user details) that should be authorized and returned, for example 'email' or 'profile'.
             * - `secure` (body, optional, boolean): Use secure LDAPS protocol. DEPRECATED: use 'mode' instead.
             * - `server1` (body, optional, string): Server IP address (or DNS name)
             * - `server2` (body, optional, string): Fallback Server IP address (or DNS name)
             * - `sslversion` (body, optional, "tlsv1" | "tlsv1_1" | "tlsv1_2" | "tlsv1_3"): LDAPS TLS/SSL version. It's not recommended to use version older than 1.2!
             * - `sync-defaults-options` (body, optional, string): The default options for behavior of synchronizations.
             * - `sync_attributes` (body, optional, string): Comma separated list of key=value pairs for specifying which LDAP attributes map to which PVE user field. For example, to map the LDAP attribute 'mail' to PVEs 'email', write  'email=mail'. By default, each PVE user field is represented  by an LDAP attribute of the same name.
             * - `tfa` (body, optional, string): Use Two-factor authentication.
             * - `user_attr` (body, optional, string): LDAP user attribute name
             * - `user_classes` (body, optional, string): The objectclasses for users.
             * - `verify` (body, optional, boolean): Verify the server's SSL certificate
             */
            update: (args: PathContext<AccessAPI["/access/domains/{realm}"]["PUT"]['parameters']>) => client.request("/access/domains/{realm}", "PUT", {
                ...args,
                $path: {realm: value}
            }),
            /**
             * Syncs users and/or groups from the configured LDAP to user.cfg. NOTE: Synced groups will have the name 'name-$realm', so make sure those groups do not exist to prevent overwriting.
             * @endpoint POST /access/domains/{realm}/sync
             * @allowToken 1
             * @permissions {"check": ["and", ["perm", "/access/realm/{realm}", ["Realm.AllocateUser"]], ["perm", "/access/groups", ["User.Modify"]]], "description": "'Realm.AllocateUser' on '/access/realm/<realm>' and  'User.Modify' permissions to '/access/groups/'."}
             *
             * Parameters:
             * - `dry-run` (body, optional, boolean): If set, does not write anything.
             * - `enable-new` (body, optional, boolean): Enable newly synced users immediately.
             * - `full` (body, optional, boolean): DEPRECATED: use 'remove-vanished' instead. If set, uses the LDAP Directory as source of truth, deleting users or groups not returned from the sync and removing all locally modified properties of synced users. If not set, only syncs information which is present in the synced data, and does not delete or modify anything else.
             * - `purge` (body, optional, boolean): DEPRECATED: use 'remove-vanished' instead. Remove ACLs for users or groups which were removed from the config during a sync.
             * - `realm` (path, required, string): Authentication domain ID
             * - `remove-vanished` (body, optional, string): A semicolon-separated list of things to remove when they or the user vanishes during a sync. The following values are possible: 'entry' removes the user/group when not returned from the sync. 'properties' removes the set properties on existing user/group that do not appear in the source (even custom ones). 'acl' removes acls when the user/group is not returned from the sync. Instead of a list it also can be 'none' (the default).
             * - `scope` (body, optional, "users" | "groups" | "both"): Select what to sync.
             */
            sync: (args: PathContext<AccessAPI["/access/domains/{realm}/sync"]["POST"]['parameters']>) => client.request("/access/domains/{realm}/sync", "POST", {
                ...args,
                $path: {realm: value}
            })
        }) as const
    },
    groups: {
        /**
         * Group index.
         * @endpoint GET /access/groups
         * @allowToken 1
         * @permissions {"description": "The returned list is restricted to groups where you have 'User.Modify', 'Sys.Audit'  or 'Group.Allocate' permissions on /access/groups/<group>.", "user": "all"}
         */
        index: (args: AccessAPI["/access/groups"]["GET"]['parameters']) => client.request("/access/groups", "GET", args),
        /**
         * Create new group.
         * @endpoint POST /access/groups
         * @allowToken 1
         * @permissions {"check": ["perm", "/access/groups", ["Group.Allocate"]]}
         *
         * Parameters:
         * - `comment` (body, optional, string)
         * - `groupid` (body, required, string)
         */
        create_group: (args: AccessAPI["/access/groups"]["POST"]['parameters']) => client.request("/access/groups", "POST", args),
        id: (value: string | number) => ({
            /**
             * Delete group.
             * @endpoint DELETE /access/groups/{groupid}
             * @allowToken 1
             * @permissions {"check": ["perm", "/access/groups", ["Group.Allocate"]]}
             *
             * Parameters:
             * - `groupid` (path, required, string)
             */
            delete: (args: PathContext<AccessAPI["/access/groups/{groupid}"]["DELETE"]['parameters']>) => client.request("/access/groups/{groupid}", "DELETE", {
                ...args,
                $path: {groupid: value.toString()}
            }),
            /**
             * Get group configuration.
             * @endpoint GET /access/groups/{groupid}
             * @allowToken 1
             * @permissions {"check": ["perm", "/access/groups", ["Sys.Audit", "Group.Allocate"], "any", 1]}
             *
             * Parameters:
             * - `groupid` (path, required, string)
             */
            read: (args: PathContext<AccessAPI["/access/groups/{groupid}"]["GET"]['parameters']>) => client.request("/access/groups/{groupid}", "GET", {
                ...args,
                $path: {groupid: value.toString()}
            }),
            /**
             * Update group data.
             * @endpoint PUT /access/groups/{groupid}
             * @allowToken 1
             * @permissions {"check": ["perm", "/access/groups", ["Group.Allocate"]]}
             *
             * Parameters:
             * - `comment` (body, optional, string)
             * - `groupid` (path, required, string)
             */
            update: (args: PathContext<AccessAPI["/access/groups/{groupid}"]["PUT"]['parameters']>) => client.request("/access/groups/{groupid}", "PUT", {
                ...args,
                $path: {groupid: value.toString()}
            })
        })
    },
    openid: {
        /**
         * Directory index.
         * @endpoint GET /access/openid
         * @allowToken 1
         * @permissions {"user": "all"}
         */
        index: (args: AccessAPI["/access/openid"]["GET"]['parameters']) => client.request("/access/openid", "GET", args),
        /**
         * Get the OpenId Authorization Url for the specified realm.
         * @endpoint POST /access/openid/auth-url
         * @allowToken 1
         * @permissions {"user": "world"}
         *
         * Parameters:
         * - `realm` (body, required, string): Authentication domain ID
         * - `redirect-url` (body, required, string): Redirection Url. The client should set this to the used server url (location.origin).
         */
        auth_url: (args: AccessAPI["/access/openid/auth-url"]["POST"]['parameters']) => client.request("/access/openid/auth-url", "POST", args),
        /**
         * Verify OpenID authorization code and create a ticket.
         * @endpoint POST /access/openid/login
         * @allowToken 1
         * @permissions {"user": "world"}
         *
         * Parameters:
         * - `code` (body, required, string): OpenId authorization code.
         * - `redirect-url` (body, required, string): Redirection Url. The client should set this to the used server url (location.origin).
         * - `state` (body, required, string): OpenId state.
         */
        login: (args: AccessAPI["/access/openid/login"]["POST"]['parameters']) => client.request("/access/openid/login", "POST", args)
    },
    password: {
        /**
         * Change user password.
         * @endpoint PUT /access/password
         * @allowToken 0
         * @permissions {"check": ["or", ["userid-param", "self"], ["and", ["userid-param", "Realm.AllocateUser"], ["userid-group", ["User.Modify"]]]], "description": "Each user is allowed to change their own password. A user can change the password of another user if they have 'Realm.AllocateUser' (on the realm of user <userid>) and 'User.Modify' permission on /access/groups/<group> on a group where user <userid> is member of. For the PAM realm, a password change does not take  effect cluster-wide, but only applies to the local node."}
         *
         * Parameters:
         * - `confirmation-password` (body, optional, string): The current password of the user performing the change.
         * - `password` (body, required, string): The new password.
         * - `userid` (body, required, string): Full User ID, in the `name@realm` format.
         */
        change_password: (args: AccessAPI["/access/password"]["PUT"]['parameters']) => client.request("/access/password", "PUT", args)
    },
    /**
     * Retrieve effective permissions of given user/token.
     * @endpoint GET /access/permissions
     * @allowToken 1
     * @permissions {"description": "Each user/token is allowed to dump their own permissions (or that of owned tokens). A user can dump the permissions of another user or their tokens if they have 'Sys.Audit' permission on /access.", "user": "all"}
     *
     * Parameters:
     * - `path` (query, optional, string): Only dump this specific path, not the whole tree.
     * - `userid` (query, optional, string): User ID or full API token ID
     */
    permissions: (args: AccessAPI["/access/permissions"]["GET"]['parameters']) => client.request("/access/permissions", "GET", args),
    roles: {
        /**
         * Role index.
         * @endpoint GET /access/roles
         * @allowToken 1
         * @permissions {"user": "all"}
         */
        index: (args: AccessAPI["/access/roles"]["GET"]['parameters']) => client.request("/access/roles", "GET", args),
        /**
         * Create new role.
         * @endpoint POST /access/roles
         * @allowToken 1
         * @permissions {"check": ["perm", "/access", ["Sys.Modify"]]}
         *
         * Parameters:
         * - `privs` (body, optional, string)
         * - `roleid` (body, required, string)
         */
        create_role: (args: AccessAPI["/access/roles"]["POST"]['parameters']) => client.request("/access/roles", "POST", args),
        role: (value: string | number) => ({
            /**
             * Delete role.
             * @endpoint DELETE /access/roles/{roleid}
             * @allowToken 1
             * @permissions {"check": ["perm", "/access", ["Sys.Modify"]]}
             *
             * Parameters:
             * - `roleid` (path, required, string)
             */
            delete: (args: PathContext<AccessAPI["/access/roles/{roleid}"]["DELETE"]['parameters']>) => client.request("/access/roles/{roleid}", "DELETE", {
                ...args,
                $path: {"roleid": value.toString()}
            }),
            /**
             * Get role configuration.
             * @endpoint GET /access/roles/{roleid}
             * @allowToken 1
             * @permissions {"user": "all"}
             *
             * Parameters:
             * - `roleid` (path, required, string)
             */
            read: (args: PathContext<AccessAPI["/access/roles/{roleid}"]["GET"]['parameters']>) => client.request("/access/roles/{roleid}", "GET", {
                ...args,
                $path: {"roleid": value.toString()}
            }),
            /**
             * Update an existing role.
             * @endpoint PUT /access/roles/{roleid}
             * @allowToken 1
             * @permissions {"check": ["perm", "/access", ["Sys.Modify"]]}
             *
             * Parameters:
             * - `append` (body, optional, boolean)
             * - `privs` (body, optional, string)
             * - `roleid` (path, required, string)
             */
            update: (args: PathContext<AccessAPI["/access/roles/{roleid}"]["PUT"]['parameters']>) => client.request("/access/roles/{roleid}", "PUT", {
                ...args,
                $path: {"roleid": value.toString()}
            })
        })
    },
    tfa: {
        /**
         * List TFA configurations of users.
         * @endpoint GET /access/tfa
         * @allowToken 1
         * @permissions {"description": "Returns all or just the logged-in user, depending on privileges.", "user": "all"}
         */
        list: (args: AccessAPI["/access/tfa"]["GET"]['parameters']) => client.request("/access/tfa", "GET", args),
        user: (userid: string | number) => ({
            /**
             * List TFA configurations of users.
             * @endpoint GET /access/tfa/{userid}
             * @allowToken 1
             * @permissions {"check": ["or", ["userid-param", "self"], ["userid-group", ["User.Modify", "Sys.Audit"]]]}
             *
             * Parameters:
             * - `userid` (path, required, string): Full User ID, in the `name@realm` format.
             */
            list_user_tfa: (args: PathContext<AccessAPI["/access/tfa/{userid}"]["GET"]['parameters']>) => client.request("/access/tfa/{userid}", "GET", {
                ...args,
                $path: {"userid": userid.toString()}
            }),
            /**
             * Add a TFA entry for a user.
             * @endpoint POST /access/tfa/{userid}
             * @allowToken 0
             * @permissions {"check": ["or", ["userid-param", "self"], ["userid-group", ["User.Modify"]]]}
             *
             * Parameters:
             * - `challenge` (body, optional, string): When responding to a u2f challenge: the original challenge string
             * - `description` (body, optional, string): A description to distinguish multiple entries from one another
             * - `password` (body, optional, string): The current password of the user performing the change.
             * - `totp` (body, optional, string): A totp URI.
             * - `type` (body, required, "totp" | "u2f" | "webauthn" | "recovery" | "yubico"): TFA Entry Type.
             * - `userid` (path, required, string): Full User ID, in the `name@realm` format.
             * - `value` (body, optional, string): The current value for the provided totp URI, or a Webauthn/U2F challenge response
             */
            add_tfa_entry: (args: PathContext<AccessAPI["/access/tfa/{userid}"]["POST"]['parameters']>) => client.request("/access/tfa/{userid}", "POST", {
                ...args,
                $path: {"userid": userid.toString()}
            }),
            id: (value: string | number) => ({
                /**
                 * Delete a TFA entry by ID.
                 * @endpoint DELETE /access/tfa/{userid}/{id}
                 * @allowToken 0
                 * @permissions {"check": ["or", ["userid-param", "self"], ["userid-group", ["User.Modify"]]]}
                 *
                 * Parameters:
                 * - `id` (path, required, string): A TFA entry id.
                 * - `password` (query, optional, string): The current password of the user performing the change.
                 * - `userid` (path, required, string): Full User ID, in the `name@realm` format.
                 */
                delete: (args: PathContext<AccessAPI["/access/tfa/{userid}/{id}"]["DELETE"]['parameters']>) => client.request("/access/tfa/{userid}/{id}", "DELETE", {
                    ...args,
                    $path: {"id": value.toString(), userid: userid.toString()}
                }),
                /**
                 * Fetch a requested TFA entry if present.
                 * @endpoint GET /access/tfa/{userid}/{id}
                 * @allowToken 1
                 * @permissions {"check": ["or", ["userid-param", "self"], ["userid-group", ["User.Modify", "Sys.Audit"]]]}
                 *
                 * Parameters:
                 * - `id` (path, required, string): A TFA entry id.
                 * - `userid` (path, required, string): Full User ID, in the `name@realm` format.
                 */
                get: (args: PathContext<AccessAPI["/access/tfa/{userid}/{id}"]["GET"]['parameters']>) => client.request("/access/tfa/{userid}/{id}", "GET", {
                    ...args,
                    $path: {"id": value.toString(), userid: userid.toString()}
                }),
                /**
                 * Add a TFA entry for a user.
                 * @endpoint PUT /access/tfa/{userid}/{id}
                 * @allowToken 0
                 * @permissions {"check": ["or", ["userid-param", "self"], ["userid-group", ["User.Modify"]]]}
                 *
                 * Parameters:
                 * - `description` (body, optional, string): A description to distinguish multiple entries from one another
                 * - `enable` (body, optional, boolean): Whether the entry should be enabled for login.
                 * - `id` (path, required, string): A TFA entry id.
                 * - `password` (body, optional, string): The current password of the user performing the change.
                 * - `userid` (path, required, string): Full User ID, in the `name@realm` format.
                 */
                update: (args: PathContext<AccessAPI["/access/tfa/{userid}/{id}"]["PUT"]['parameters']>) => client.request("/access/tfa/{userid}/{id}", "PUT", {
                    ...args,
                    $path: {"id": value.toString(), userid: userid.toString()}
                })
            })
        })
    },
    ticket: {
        /**
         * Dummy. Useful for formatters which want to provide a login page.
         * @endpoint GET /access/ticket
         * @allowToken 1
         * @permissions {"user": "world"}
         */
        get: (args: AccessAPI["/access/ticket"]["GET"]['parameters']) => client.request("/access/ticket", "GET", args),
        /**
         * Create or verify authentication ticket.
         * @endpoint POST /access/ticket
         * @allowToken 0
         * @permissions {"description": "You need to pass valid credientials.", "user": "world"}
         *
         * Parameters:
         * - `new-format` (body, optional, boolean): This parameter is now ignored and assumed to be 1.
         * - `otp` (body, optional, string): One-time password for Two-factor authentication.
         * - `password` (body, required, string): The secret password. This can also be a valid ticket.
         * - `path` (body, optional, string): Verify ticket, and check if user have access 'privs' on 'path'
         * - `privs` (body, optional, string): Verify ticket, and check if user have access 'privs' on 'path'
         * - `realm` (body, optional, string): You can optionally pass the realm using this parameter. Normally the realm is simply added to the username <username>@<realm>.
         * - `tfa-challenge` (body, optional, string): The signed TFA challenge string the user wants to respond to.
         * - `username` (body, required, string): User name
         */
        create: (args: AccessAPI["/access/ticket"]["POST"]['parameters']) => client.request("/access/ticket", "POST", args)
    },
    users: {
        /**
         * User index.
         * @endpoint GET /access/users
         * @allowToken 1
         * @permissions {"description": "The returned list is restricted to users where you have 'User.Modify' or 'Sys.Audit' permissions on '/access/groups' or on a group the user belongs too. But it always includes the current (authenticated) user.", "user": "all"}
         *
         * Parameters:
         * - `enabled` (query, optional, boolean): Optional filter for enable property.
         * - `full` (query, optional, boolean): Include group and token information.
         */
        index: (args: AccessAPI["/access/users"]["GET"]['parameters']) => client.request("/access/users", "GET", args),
        /**
         * Create new user.
         * @endpoint POST /access/users
         * @allowToken 1
         * @permissions {"check": ["and", ["userid-param", "Realm.AllocateUser"], ["userid-group", ["User.Modify"], "groups_param", "create"]], "description": "You need 'Realm.AllocateUser' on '/access/realm/<realm>' on the realm of user <userid>, and 'User.Modify' permissions to '/access/groups/<group>' for any group specified (or 'User.Modify' on '/access/groups' if you pass no groups."}
         *
         * Parameters:
         * - `comment` (body, optional, string)
         * - `email` (body, optional, string)
         * - `enable` (body, optional, boolean): Enable the account (default). You can set this to '0' to disable the account
         * - `expire` (body, optional, number): Account expiration date (seconds since epoch). '0' means no expiration date.
         * - `firstname` (body, optional, string)
         * - `groups` (body, optional, string)
         * - `keys` (body, optional, string): Keys for two factor auth (yubico).
         * - `lastname` (body, optional, string)
         * - `password` (body, optional, string): Initial password.
         * - `userid` (body, required, string): Full User ID, in the `name@realm` format.
         */
        create: (args: AccessAPI["/access/users"]["POST"]['parameters']) => client.request("/access/users", "POST", args),
        user: (user_id: string | number) => ({
            /**
             * Delete user.
             * @endpoint DELETE /access/users/{userid}
             * @allowToken 1
             * @permissions {"check": ["and", ["userid-param", "Realm.AllocateUser"], ["userid-group", ["User.Modify"]]]}
             *
             * Parameters:
             * - `userid` (path, required, string): Full User ID, in the `name@realm` format.
             */
            delete: (args: PathContext<AccessAPI["/access/users/{userid}"]["DELETE"]['parameters']>) => client.request("/access/users/{userid}", "DELETE", {
                ...args,
                $path: {"userid": user_id.toString()}
            }),
            /**
             * Get user configuration.
             * @endpoint GET /access/users/{userid}
             * @allowToken 1
             * @permissions {"check": ["userid-group", ["User.Modify", "Sys.Audit"]]}
             *
             * Parameters:
             * - `userid` (path, required, string): Full User ID, in the `name@realm` format.
             */
            read: (args: PathContext<AccessAPI["/access/users/{userid}"]["GET"]['parameters']>) => client.request("/access/users/{userid}", "GET", {
                ...args,
                $path: {"userid": user_id.toString()}
            }),
            /**
             * Update user configuration.
             * @endpoint PUT /access/users/{userid}
             * @allowToken 1
             * @permissions {"check": ["userid-group", ["User.Modify"], "groups_param", "update"]}
             *
             * Parameters:
             * - `append` (body, optional, boolean)
             * - `comment` (body, optional, string)
             * - `email` (body, optional, string)
             * - `enable` (body, optional, boolean): Enable the account (default). You can set this to '0' to disable the account
             * - `expire` (body, optional, number): Account expiration date (seconds since epoch). '0' means no expiration date.
             * - `firstname` (body, optional, string)
             * - `groups` (body, optional, string)
             * - `keys` (body, optional, string): Keys for two factor auth (yubico).
             * - `lastname` (body, optional, string)
             * - `userid` (path, required, string): Full User ID, in the `name@realm` format.
             */
            update: (args: PathContext<AccessAPI["/access/users/{userid}"]["PUT"]['parameters']>) => client.request("/access/users/{userid}", "PUT", {
                ...args,
                $path: {"userid": user_id.toString()}
            }),
            tfa: {
                /**
                 * Get user TFA types (Personal and Realm).
                 * @endpoint GET /access/users/{userid}/tfa
                 * @allowToken 1
                 * @permissions {"check": ["or", ["userid-param", "self"], ["userid-group", ["User.Modify", "Sys.Audit"]]]}
                 *
                 * Parameters:
                 * - `multiple` (query, optional, boolean): Request all entries as an array.
                 * - `userid` (path, required, string): Full User ID, in the `name@realm` format.
                 */
                read_user_tfa_type: (args: PathContext<AccessAPI["/access/users/{userid}/tfa"]["GET"]['parameters']>) => client.request("/access/users/{userid}/tfa", "GET", {
                    ...args,
                    $path: {"userid": user_id.toString()}
                })
            },
            token: {
                /**
                 * Get user API tokens.
                 * @endpoint GET /access/users/{userid}/token
                 * @allowToken 1
                 * @permissions {"check": ["or", ["userid-param", "self"], ["userid-group", ["User.Modify"]]]}
                 *
                 * Parameters:
                 * - `userid` (path, required, string): Full User ID, in the `name@realm` format.
                 */
                token_index: (args: AccessAPI["/access/users/{userid}/token"]["GET"]['parameters']) => client.request("/access/users/{userid}/token", "GET", args),
                id: (value: string | number) => ({
                    /**
                     * Remove API token for a specific user.
                     * @endpoint DELETE /access/users/{userid}/token/{tokenid}
                     * @allowToken 1
                     * @permissions {"check": ["or", ["userid-param", "self"], ["userid-group", ["User.Modify"]]]}
                     *
                     * Parameters:
                     * - `tokenid` (path, required, string): User-specific token identifier.
                     * - `userid` (path, required, string): Full User ID, in the `name@realm` format.
                     */
                    remove: (args: PathContext<AccessAPI["/access/users/{userid}/token/{tokenid}"]["DELETE"]['parameters']>) => client.request("/access/users/{userid}/token/{tokenid}", "DELETE", {
                        ...args,
                        $path: {"tokenid": value.toString(), userid: user_id.toString()}
                    }),
                    /**
                     * Get specific API token information.
                     * @endpoint GET /access/users/{userid}/token/{tokenid}
                     * @allowToken 1
                     * @permissions {"check": ["or", ["userid-param", "self"], ["userid-group", ["User.Modify"]]]}
                     *
                     * Parameters:
                     * - `tokenid` (path, required, string): User-specific token identifier.
                     * - `userid` (path, required, string): Full User ID, in the `name@realm` format.
                     */
                    read: (args: PathContext<AccessAPI["/access/users/{userid}/token/{tokenid}"]["GET"]['parameters']>) => client.request("/access/users/{userid}/token/{tokenid}", "GET", {
                        ...args,
                        $path: {"tokenid": value.toString(), userid: user_id.toString()}
                    }),
                    /**
                     * Generate a new API token for a specific user. NOTE: returns API token value, which needs to be stored as it cannot be retrieved afterwards!
                     * @endpoint POST /access/users/{userid}/token/{tokenid}
                     * @allowToken 1
                     * @permissions {"check": ["or", ["userid-param", "self"], ["userid-group", ["User.Modify"]]]}
                     *
                     * Parameters:
                     * - `comment` (body, optional, string)
                     * - `expire` (body, optional, number): API token expiration date (seconds since epoch). '0' means no expiration date.
                     * - `privsep` (body, optional, boolean): Restrict API token privileges with separate ACLs (default), or give full privileges of corresponding user.
                     * - `tokenid` (path, required, string): User-specific token identifier.
                     * - `userid` (path, required, string): Full User ID, in the `name@realm` format.
                     */
                    generate: (args: PathContext<AccessAPI["/access/users/{userid}/token/{tokenid}"]["POST"]['parameters']>) => client.request("/access/users/{userid}/token/{tokenid}", "POST", {
                        ...args,
                        $path: {"tokenid": value.toString(), userid: user_id.toString()}
                    }),
                    /**
                     * Update API token for a specific user.
                     * @endpoint PUT /access/users/{userid}/token/{tokenid}
                     * @allowToken 1
                     * @permissions {"check": ["or", ["userid-param", "self"], ["userid-group", ["User.Modify"]]]}
                     *
                     * Parameters:
                     * - `comment` (body, optional, string)
                     * - `delete` (body, optional, string): A list of settings you want to delete.
                     * - `expire` (body, optional, number): API token expiration date (seconds since epoch). '0' means no expiration date.
                     * - `privsep` (body, optional, boolean): Restrict API token privileges with separate ACLs (default), or give full privileges of corresponding user.
                     * - `tokenid` (path, required, string): User-specific token identifier.
                     * - `userid` (path, required, string): Full User ID, in the `name@realm` format.
                     */
                    update_info: (args: PathContext<AccessAPI["/access/users/{userid}/token/{tokenid}"]["PUT"]['parameters']>) => client.request("/access/users/{userid}/token/{tokenid}", "PUT", {
                        ...args,
                        $path: {"tokenid": value.toString(), userid: user_id.toString()}
                    }),
                })
            },
            /**
             * Unlock a user's TFA authentication.
             * @endpoint PUT /access/users/{userid}/unlock-tfa
             * @allowToken 1
             * @permissions {"check": ["userid-group", ["User.Modify"]]}
             *
             * Parameters:
             * - `userid` (path, required, string): Full User ID, in the `name@realm` format.
             */
            unlock_tfa: (args: PathContext<AccessAPI["/access/users/{userid}/unlock-tfa"]["PUT"]['parameters']>) => client.request("/access/users/{userid}/unlock-tfa", "PUT", {
                ...args,
                $path: {userid: user_id.toString()}
            }),
        })
    },
    vncticket: {
        /**
         * verify VNC authentication ticket.
         * @endpoint POST /access/vncticket
         * @allowToken 1
         * @permissions {"description": "You need to pass valid credientials.", "user": "world"}
         *
         * Parameters:
         * - `authid` (body, required, string): UserId or token
         * - `path` (body, required, string): Verify ticket, and check if user have access 'privs' on 'path'
         * - `privs` (body, required, string): Verify ticket, and check if user have access 'privs' on 'path'
         * - `vncticket` (body, required, string): The VNC ticket.
         */
        verify_vnc_ticket: (args: AccessAPI["/access/vncticket"]["POST"]['parameters']) => client.request("/access/vncticket", "POST", args)
    }
}) as const;
