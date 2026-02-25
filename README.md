# pve-client

TypeScript-first API client for Proxmox VE.

It provides a typed API surface generated from the Proxmox spec, so endpoint paths, query/body fields, and return types are available through autocomplete.

## Features

- Typed endpoint methods for Proxmox VE APIs
- Token auth and username/password login flow
- Automatic path/query/body handling
- Proxmox-style response unwrapping (`{ data: ... } -> data`)
- Works with Node.js fetch and supports custom HTTPS agents

## Installation

```bash
npm install pve-client
```

## Quick Start

### Token Authentication (recommended)

```ts
import { Client } from "pve-client";
import { Agent } from "node:https";

const client = new Client({
  baseUrl: "https://pve.example.com:8006",
  apiToken: "PVEAPIToken=root@pam!mytoken=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  // only needed for self-signed certs
  agent: new Agent({ rejectUnauthorized: false }),
});

const nodes = await client.api.nodes.list();
console.log(nodes);
```

### Username/Password Authentication

```ts
import { Client } from "pve-client";
import { Agent } from "node:https";

const client = new Client({
  baseUrl: "https://pve.example.com:8006",
  username: "root",
  password: "your-password",
  realm: "pam", // optional, defaults to "pam"
  agent: new Agent({ rejectUnauthorized: false }),
});

await client.login();
const nodes = await client.api.nodes.list();
console.log(nodes);
```

## Using `.env`

```env
PVE_BASE_URL=https://pve.example.com:8006
PVE_API_TOKEN=PVEAPIToken=root@pam!mytoken=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
```

```ts
import "dotenv/config";
import { Client } from "pve-client";

const client = new Client({
  baseUrl: process.env.PVE_BASE_URL!,
  apiToken: process.env.PVE_API_TOKEN!,
});

const nodes = await client.api.nodes.list();
console.log(nodes);
```

## Common Calls

### Get cluster overview and nodes

```ts
const cluster = await client.api.cluster.index();
const nodes = await client.api.nodes.list();
```

### Path-based endpoints

```ts
const nodeStatus = await client.api.nodes.get("pve").status.get();
```

### Endpoints with optional parameters

```ts
// no params required
const version = await client.api.version.version();

// optional query/body can still be passed
const pools = await client.api.pools.index({
  $query: { type: "qemu" },
});
```

## Request Argument Shape

Methods accept an object with optional special fields depending on endpoint:

- `$path`: path parameters (usually handled by path helper methods like `.get("node")`)
- `$query`: query string parameters
- `$body`: request body (sent as `application/x-www-form-urlencoded`)
- `$headers`: additional request headers

Example:

```ts
await client.api.access.permissions({
  $query: { path: "/", userid: "root@pam" },
});
```

## Authentication Notes

- `apiToken` accepts either:
  - full: `PVEAPIToken=user@realm!token=secret`
  - shorthand: `user@realm!token=secret`
- For username/password auth, call `await client.login()` before other API calls.
- For self-signed certificates, pass a custom `https.Agent` with `rejectUnauthorized: false`.
- Some Proxmox functionalities are only accessible with username/password ticket auth (session + CSRF) and are not available to API tokens, even if token permissions are broad.

## Terminal Example (Local TTY)

There is a runnable example that opens a VM terminal and binds it to your local terminal (`stdin/stdout`):

```bash
npm run example/terminal -- 100
```

Or set `PVE_VMID` in `.env` and run without CLI args:

```bash
npm run example/terminal
```

Example `.env` (username/password required for terminal helper):

```env
PVE_BASE_URL=https://pve.example.com:8006
PVE_USERNAME=root
PVE_PASSWORD=your-password
PVE_REALM=pam
PVE_VMID=100
```

Controls:

- `Ctrl-]` disconnects from the local bridge.
- Terminal resize is forwarded automatically.

## Error Handling

Non-2xx responses throw an `Error` including status and response text:

```ts
try {
  await client.api.nodes.list();
} catch (error) {
  console.error(error);
}
```

## Development

```bash
npm run build
npm test
npm run example/auth
npm run example/terminal -- 100
```

## License

Apache-2.0
