# PxMxTerminal — Design Reasoning

## Problem

The terminal button in the Proxmox playground page (`PxMxWorkloadControls.svelte`) links to `/proxmox/terminal?vmid=...&node=...&type=...`. That route did not exist, so clicking the button returned a 404.

## Goal

Create a working `/proxmox/terminal` page that opens an interactive terminal (xterm.js) connected to the selected VM or LXC container via the Proxmox VNC websocket protocol.

---

## Architecture

### Why a WebSocket proxy on the SvelteKit server?

The Proxmox API websocket endpoint (`/nodes/{node}/{type}/{vmid}/vncwebsocket`) requires:

1. A **session cookie** (`PVEAuthCookie`) or **Authorization header** — only available server-side because the playground uses env vars for credentials.
2. A **termproxy ticket** obtained from a prior POST to `/nodes/{node}/{type}/{vmid}/termproxy`.

The browser cannot talk directly to Proxmox because:
- Credentials are server-only env vars.
- Proxmox is often on a private network not reachable from the browser.
- TLS cert validation is frequently skipped (`PVE_INSECURE_TLS=true`).

**Solution:** A Vite plugin intercepts HTTP upgrade requests on the dev server.

```
Browser  <--WS-->  Vite dev server (/proxmox/terminal/ws)  <--WS-->  Proxmox vncwebsocket
```

---

## Implementation (as built)

### Approach: Vite plugin, not hooks.server.ts

`hooks.server.ts` was considered but a **Vite plugin** using `configureServer` is simpler and more self-contained for dev. It hooks into `server.httpServer`'s `upgrade` event — the same underlying mechanism — without needing to create an extra file and without coupling to SvelteKit's request lifecycle.

The plugin lives entirely in `vite.config.ts`.

### pve-client Terminal Helper Integration

As of May 2026, `pve-client` provides:

- **`Terminal` class** — Manages tickets, connection info, and WebSocket setup
- **`TerminalSession`** — Manages connection lifecycle with automatic reconnect
- **`TerminalRenderer`** — New: Parses VT100/xterm escape sequences using [terminal.js](https://github.com/Gottox/terminal.js) (Gottox)

The helper can be used with or without a renderer:

```ts
const terminal = new Terminal(vmid, client);

// Browser app with renderer (parses escape sequences)
const renderer = new TerminalRenderer(80, 24);
renderer.on("render", (state) => {
  // Update UI with state.state.screen
});
const session = await terminal.open({ renderer });

// Or: Node.js CLI with TTY piping (no renderer needed)
const session = await terminal.open({ pipeTo: stdioAdapter });
```

**Previous limitation**: The helper required username/password auth and would throw if an API token was used. This constraint may still apply depending on the version; check the pve-client docs.
Additionally, `Terminal.open()` calls `client.sessionCookie()` which returns `undefined` for API token clients, causing a second throw.

**Workaround:** Call `client.request()` directly for the termproxy ticket (this works with both auth methods), then construct the `vncwebsocket` URL manually using `client.url()`. Use `client.sessionCookie()` or `client.tokenAuthorizationHeader()` (both are public methods) to set the correct WebSocket auth header.

### Browser ↔ proxy framing (simplified layer over Proxmox protocol)

The Vite plugin translates a simple browser protocol into the Proxmox framing internally:

| Browser→Proxy | Meaning |
|---|---|
| Text `R:{cols}:{rows}` | Terminal resize |
| Any other text | Stdin data |
| (binary not expected) | — |

| Proxy→Browser | Meaning |
|---|---|
| Binary frame | Raw terminal output (stdout) |

The Proxmox framing (`0:{len}:{data}`, `1:{cols}:{rows}:`, auth handshake, keepalive `2`) is handled entirely server-side.

### xterm.js

Used `@xterm/xterm` (v5, scoped packages) and `@xterm/addon-fit` — installed as `devDependencies`. Dynamically imported in `onMount` so they are never included in SSR bundles. `FitAddon` handles resizing xterm to fill its container; a `window resize` listener triggers `fit()` and sends a resize frame to the proxy.

---

## File layout (as built)

```
playground/
  vite.config.ts                           ← proxmoxTerminalPlugin() added here
  src/
    routes/
      proxmox/
        terminal/
          +page.server.ts                  ← validates vmid/node/type query params
          +page.svelte                     ← xterm.js UI, connects to /proxmox/terminal/ws
```

No `hooks.server.ts` or `ws/+server.ts` were needed.

---

## Dependencies added

```json
"@xterm/xterm": "devDependency",
"@xterm/addon-fit": "devDependency",
"@types/ws": "devDependency"
```

`ws` itself was already present transitively via `pve-client`.

---

## Security considerations

- `vmid` is validated as a positive integer; `node` and `type` are validated as non-empty strings with `type` restricted to `vm | container`.
- All Proxmox credentials remain server-side only; the browser never sees them.
- The WS upgrade handler only activates for the exact path `/proxmox/terminal/ws`.

---

## Resolved questions

1. **Adapter**: The Vite plugin approach only works in dev (Vite server). Production deployment to Node would need either `hooks.server.ts` with the Node adapter, or a separate WebSocket service. Cloudflare/Vercel adapters cannot support this pattern.
2. **xterm version**: Used `@xterm/xterm` v5 (scoped package). Import path is `@xterm/xterm` and `@xterm/addon-fit`; CSS is at `@xterm/xterm/css/xterm.css`.
3. **Authentication flow**: Resolved — API token clients use `Authorization: PVEAPIToken=...` header on the Proxmox WS connection; username/password clients use `Cookie: PVEAuthCookie=...` after `login()`. Both paths handled in the plugin.
