<div align="center">

<img src="https://www.proxmox.com/images/proxmox/Proxmox_logo_standard_hex_400px.png" alt="Proxmox" width="180" />

# pve-client

**Full-coverage TypeScript client for the Proxmox VE REST API**

[![npm version](https://img.shields.io/npm/v/pve-client?style=flat-square&color=CB3837&logo=npm)](https://www.npmjs.com/package/pve-client)
[![JSR](https://img.shields.io/badge/JSR-%40sourceregistry%2Fproxmox-F7DF1E?style=flat-square&logo=deno)](https://jsr.io/@sourceregistry/proxmox)
[![License](https://img.shields.io/github/license/AlexanderSlaa/pve-client?style=flat-square)](LICENSE)
[![Tests](https://github.com/AlexanderSlaa/pve-client/actions/workflows/test.yml/badge.svg?style=flat-square)](https://github.com/AlexanderSlaa/pve-client/actions/workflows/test.yml)
[![codecov](https://codecov.io/gh/AlexanderSlaa/pve-client/graph/badge.svg?style=flat-square)](https://codecov.io/gh/AlexanderSlaa/pve-client)
[![Node.js](https://img.shields.io/node/v/pve-client?style=flat-square&logo=node.js)](https://nodejs.org)

[**Docs**](https://alexanderslaa.github.io/pve-client/) · [**npm**](https://www.npmjs.com/package/pve-client) · [**JSR**](https://jsr.io/@sourceregistry/proxmox) · [**Issues**](https://github.com/AlexanderSlaa/pve-client/issues) · [**Discussions**](https://github.com/AlexanderSlaa/pve-client/discussions)

</div>

---

`pve-client` is a **TypeScript-first** API client covering all **675 endpoints** of the official Proxmox VE REST API — typed end-to-end so your editor knows every path, parameter, and return shape. No hand-rolled fetch calls, no guessing field names.

```ts
import { Client } from "pve-client";

const client = new Client({ baseUrl: "https://pve.example.com:8006", apiToken: "..." });

const nodes = await client.api.nodes.list();
//    ^? { node: string; status: "online" | "offline" | ...; ... }[]
```

---

## Contents

- [Features](#features)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [Authentication](#authentication)
- [API Modules](#api-modules)
- [Common Patterns](#common-patterns)
- [Task Monitoring](#task-monitoring)
- [Live Events](#live-events)
- [Error Handling](#error-handling)
- [Examples](#examples)
- [Contributing](#contributing)
- [License](#license)

---

## Features

| | |
|---|---|
| **675 typed endpoints** | Every Proxmox VE API path — `GET`, `POST`, `PUT`, `DELETE` — is typed with parameter and return types generated from the official spec |
| **Two auth methods** | API token (recommended) or username/password ticket flow |
| **Autocomplete everywhere** | Path params, query strings, body fields, and return shapes all resolve in your IDE |
| **Response unwrapping** | Proxmox wraps responses in `{ data: ... }` — this client strips it automatically |
| **Task polling** | Built-in `client.task.listen()` and `client.task.wait()` for async Proxmox tasks |
| **Live resource events** | Subscribe to cluster resource and task streams via `client.events` |
| **ESM + CJS** | Dual-format build works in any modern Node.js project |
| **Node.js ≥ 18** | Uses native `fetch`; bring your own HTTPS agent for self-signed certs |

---

## Installation

```bash
# npm
npm install pve-client

# yarn
yarn add pve-client

# pnpm
pnpm add pve-client
```

**JSR** (Deno / JSR-compatible runtimes):

```bash
deno add @sourceregistry/proxmox
# or
npx jsr add @sourceregistry/proxmox
```

---

## Quick Start

```ts
import { Client } from "pve-client";
import { Agent } from "node:https";

const client = new Client({
  baseUrl: "https://pve.example.com:8006",
  apiToken: "PVEAPIToken=root@pam!mytoken=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",

  // required only for self-signed certificates
  agent: new Agent({ rejectUnauthorized: false }),
});

// list nodes
const nodes = await client.api.nodes.list();

// get cluster status
const status = await client.api.cluster.status();

// get VMs on a node
const vms = await client.api.nodes.get("pve").qemu.list();
```

---

## Authentication

### API Token *(recommended)*

Create a token in the Proxmox web UI under **Datacenter → Permissions → API Tokens**, then:

```ts
const client = new Client({
  baseUrl: "https://pve.example.com:8006",
  apiToken: "PVEAPIToken=root@pam!mytoken=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  // shorthand also works:
  // apiToken: "root@pam!mytoken=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
});
```

### Username / Password

```ts
const client = new Client({
  baseUrl: "https://pve.example.com:8006",
  username: "root",
  password: "your-password",
  realm: "pam", // defaults to "pam"
});

await client.login(); // exchanges credentials for a ticket + CSRF token
```

> **Note:** Some Proxmox operations (VM console, terminal access) require ticket-based auth and are unavailable to API tokens regardless of permissions.

### Using `.env`

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
```

---

## API Modules

The client exposes all 675 Proxmox endpoints through six typed modules:

| Module | Path prefix | Covers |
|---|---|---|
| `client.api.access` | `/access` | Users, groups, roles, ACLs, domains, TFA, tickets |
| `client.api.cluster` | `/cluster` | Cluster config, HA, replication, firewall, SDN, backup, ACME, resources |
| `client.api.nodes` | `/nodes` | Node management, VMs (QEMU), containers (LXC), storage, networking, tasks |
| `client.api.pools` | `/pools` | Resource pool management |
| `client.api.storage` | `/storage` | Storage configuration |
| `client.api.version` | `/version` | API version info |

### Request argument shape

Every method accepts an object with the following optional keys:

| Key | Used for |
|---|---|
| `$path` | URL path parameters — usually pre-bound by helper methods like `.get("node")` |
| `$query` | Query string parameters (GET / DELETE) |
| `$body` | Request body (POST / PUT — sent as `application/x-www-form-urlencoded`) |
| `$headers` | Extra request headers |

```ts
// explicit path/query/body example
await client.api.access.permissions({
  $query: { path: "/vms/100", userid: "root@pam" },
});

await client.request("/nodes/{node}/qemu", "POST", {
  $path: { node: "pve" },
  $body: { vmid: 101, memory: 2048, cores: 2, name: "my-vm" },
});
```

---

## Common Patterns

### List all nodes and their status

```ts
const nodes = await client.api.nodes.list();

for (const node of nodes) {
  console.log(`${node.node}: ${node.status} (${node.uptime}s uptime)`);
}
```

### Work with VMs on a node

```ts
const node = client.api.nodes.get("pve");

// list VMs
const vms = await node.qemu.list();

// start a VM
await node.qemu.vmid(100).status.start();

// stop a VM
await node.qemu.vmid(100).status.stop();

// clone a VM
await node.qemu.vmid(100).clone({ $body: { newid: 200, name: "clone-vm" } });
```

### Work with LXC containers

```ts
const node = client.api.nodes.get("pve");

const containers = await node.lxc.list();
await node.lxc.id(200).status.start();
await node.lxc.id(200).config.get();
```

### Node storage and LXC templates

```ts
const storage = client.api.nodes.get("pve").storage;

// list available LXC templates
const templates = await storage.get("local").content.list({
  $query: { content: "vztmpl" },
});
```

### Cluster resources

```ts
// all VMs across the cluster
const vms = await client.api.cluster.resources({
  $query: { type: "vm" },
});
```

---

## Task Monitoring

Proxmox operations return a UPID (task ID). Use `client.task` to track completion:

### Wait for a task to finish

```ts
const upid = await client.request("/nodes/{node}/qemu/{vmid}/status/start", "POST", {
  $path: { node: "pve", vmid: 100 },
});

const logs = await client.task.wait(upid, (update) => {
  console.log(`[${update.status}]`, update.logs.at(-1));
});

console.log("Task completed:", logs);
```

### Subscribe to task updates

```ts
const sub = client.task.listen(upid, async (update) => {
  if (update.status === "stopped") console.log("Done:", update.logs);
  if (update.status === "failed")  console.error("Failed:", update.logs);
}, 1000 /* poll interval ms */);

// cancel early if needed
sub.stop();
```

---

## Live Events

`client.events` provides live-polling streams for cluster state:

### Watch cluster resources

```ts
const monitor = client.events.resources();

monitor.on("qemu/100", (resource) => {
  console.log("VM 100 updated:", resource.status);
});

monitor.start(5000); // poll every 5 seconds
```

### Watch cluster tasks

```ts
const tasks = client.events.tasks();

tasks.on("task", (task) => {
  console.log("New task:", task.type, task.status);
});

tasks.start(3000);
```

### Stop all monitors

```ts
client.events.stopListening();
```

---

## Error Handling

Non-2xx responses throw an `Error` with the HTTP status and response body:

```ts
try {
  await client.api.nodes.list();
} catch (err) {
  // err.message: "HTTP 401 Unauthorized: ..."
  console.error(err);
}
```

---

## Examples

Runnable examples live in the [`examples/`](examples/) directory. Copy `.env.example` to `.env` and fill in your cluster details.

### Auth check

```bash
npm run example/auth
```

### Terminal — attach to a VM console

```bash
npm run example/terminal -- 100
# or set PVE_VMID in .env and omit the argument
npm run example/terminal
```

Requires username/password auth. Press `Ctrl-]` to disconnect.

### Live task feed

```bash
npm run example/tasks
```

**`.env` reference:**

```env
# required
PVE_BASE_URL=https://pve.example.com:8006

# token auth (recommended)
PVE_API_TOKEN=PVEAPIToken=root@pam!tokenid=secret

# OR username/password (required for terminal)
PVE_USERNAME=root
PVE_PASSWORD=your-password
PVE_REALM=pam

# optional
PVE_VMID=100
PVE_TASKS_POLL_INTERVAL_MS=2000
```

---

## Development

```bash
git clone https://github.com/AlexanderSlaa/pve-client.git
cd pve-client
npm install

npm run build           # compile TypeScript + Vite bundle
npm test                # run tests (Vitest)
npm run test:coverage   # run tests with coverage report
npm run docs:build      # generate TypeDoc HTML docs
```

Test suites cover `Client` authentication, request handling, event polling, task monitoring, and `TimerPulledEventEmitter` internals.

---

## Contributing

Contributions are welcome! Here is how you can help:

- **Bug reports** — open an [issue](https://github.com/AlexanderSlaa/pve-client/issues) with a minimal reproduction
- **Feature requests** — start a [discussion](https://github.com/AlexanderSlaa/pve-client/discussions) before opening a PR
- **Pull requests** — fork, branch off `main`, make your change, open a PR

### Guidelines

- Keep commits in [Conventional Commits](https://www.conventionalcommits.org/) format (`feat:`, `fix:`, `refactor:`, etc.) — releases are automated via semantic-release
- All new API surface needs a corresponding type in `src/api/`
- Run `npm test` and `npm run build` before opening a PR
- Factory files export a single `export default function` — one thing per file

### Reporting Proxmox API gaps

The type definitions are generated from the official Proxmox spec in `res/apidoc.js`. If you find a missing or incorrect endpoint, open an issue referencing the Proxmox API path and the expected parameters/return shape.

---

## License

[Apache-2.0](LICENSE) © [Alexander Slaa](https://github.com/AlexanderSlaa)
