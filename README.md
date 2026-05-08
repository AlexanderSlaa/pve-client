# pve-client

[![npm version](https://img.shields.io/npm/v/pve-client)](https://www.npmjs.com/package/pve-client)
[![GitHub repo](https://img.shields.io/badge/GitHub-AlexanderSlaa%2Fpve--client-181717?logo=github)](https://github.com/AlexanderSlaa/pve-client)
[![License](https://img.shields.io/github/license/AlexanderSlaa/pve-client)](LICENSE)
[![Tests](https://github.com/AlexanderSlaa/pve-client/actions/workflows/test.yml/badge.svg)](https://github.com/AlexanderSlaa/pve-client/actions/workflows/test.yml)
[![Coverage](https://github.com/AlexanderSlaa/pve-client/actions/workflows/codecov-coverage.yml/badge.svg)](https://github.com/AlexanderSlaa/pve-client/actions/workflows/codecov-coverage.yml)
[![codecov](https://codecov.io/gh/AlexanderSlaa/pve-client/graph/badge.svg)](https://codecov.io/gh/AlexanderSlaa/pve-client)

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

```bash
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
const vms = await client.api.nodes.get("pve").qemu.list();
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

## Terminal

`pve-client` provides helpers for opening interactive terminals to VMs and containers via WebSocket.

### Terminal Architecture

Terminals use Proxmox's WebSocket-based VNC protocol. The helper manages:

- **Ticket creation**: Gets a session token from Proxmox
- **WebSocket connection**: Proxmox terminal protocol (`0:length:data` for input, etc.)
- **Reconnection**: Automatic reconnect with configurable backoff
- **Escape sequence parsing** (optional): Use `TerminalRenderer` to parse VT100/xterm sequences

### Using TerminalRenderer (Browser UIs)

For web-based terminals, the `TerminalRenderer` class parses escape sequences and maintains a terminal buffer:

```ts
import { Client, Terminal, TerminalRenderer } from "pve-client";

const client = new Client({
  baseUrl: "https://pve.example.com:8006",
  apiToken: "...",
});

const terminal = new Terminal(100, client);
const renderer = new TerminalRenderer(80, 24); // width x height

// Subscribe to render events to update UI
renderer.on("render", (state) => {
  // state.state.screen is the parsed 2D character buffer
  // state.dimensions contains {columns, rows}
  updateTerminalUI(state);
});

const session = await terminal.open({ renderer });

// Terminal resize (e.g., from window resize listener)
session.emit("resize", newCols, newRows);

// Send keyboard input to VM
session.write("ls -la\n");

// Handle session state changes
session.on("state", (newState, prevState) => {
  console.log("state:", newState, "prev:", prevState);
});
```

`TerminalRenderer` uses [terminal.js](https://github.com/Gottox/terminal.js) (Gottox) for VT100/xterm compliance and exposes:

- `.write(data)` — Feed raw terminal data (called automatically by the session)
- `.resize(cols, rows)` — Resize the terminal
- `.getState()` — Get current terminal state synchronously
- `.clear()` — Clear the buffer
- `render` event — Emitted after each write with updated state

### Terminal Example (Local TTY)

For Node.js environments, open a terminal and pipe to local `stdin/stdout`:

```bash
npm run example/terminal -- 100
```

Or set `PVE_VMID` in `.env` and run without CLI args:

```bash
npm run example/terminal
```

Example `.env` (username/password required for terminal helper):

```bash
PVE_BASE_URL=https://pve.example.com:8006
PVE_USERNAME=root
PVE_PASSWORD=your-password
PVE_REALM=pam
PVE_VMID=100
```

Controls:

- `Ctrl-]` disconnects from the local bridge.
- Terminal resize is forwarded automatically.

## Live Tasks Example

There is also a terminal example that continuously displays cluster tasks:

```bash
npm run example/tasks
```

Optional `.env` values:

```bash
# required
PVE_BASE_URL=https://pve.example.com:8006

# auth: use token OR username/password
PVE_API_TOKEN=PVEAPIToken=root@pam!tokenid=secret
# or:
PVE_USERNAME=root
PVE_PASSWORD=your-password
PVE_REALM=pam

# optional polling interval (default 2000)
PVE_TASKS_POLL_INTERVAL_MS=2000
```

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
npm run test:coverage
npm run example/auth
npm run example/terminal -- 100
npm run example/tasks
```

## Testing

This project uses Vitest in a Node environment.

- `npm test` runs all tests
- `npm run test:coverage` runs tests and generates coverage reports (`text`, `json`, `html`)

Current high-value suites cover:

- `Client` authentication, request handling, events, and task polling
- `native_fetch` request construction, header/body behavior, and abort handling
- `TimerPulledEventEmitter` polling, filtering, dedupe, and error flows

## Changelog

### [1.2.0] - 2026-05-07

#### Fixed
- Corrected README example for path-based endpoints — replaced invalid `.status.get()` call with valid `nodes.get(node).qemu.list()` usage

### [1.1.0] - 2026-04-09

#### Added
- LXC and QEMU methods on node (`nodes.get(node).qemu`, `nodes.get(node).lxc`)

### [1.0.0] - 2026-02-25

- Initial release

## License

Apache-2.0
