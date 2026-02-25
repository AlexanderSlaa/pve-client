import {Agent} from "node:https";
import {Client} from "../src";

function requireEnv(name: string): string {
    const value = process.env[name]?.trim();
    if (!value) throw new Error(`Missing required environment variable: ${name}`);
    return value;
}

const client = new Client({
    baseUrl: requireEnv("PVE_BASE_URL"),
    username: requireEnv("PVE_USERNAME"),
    password: requireEnv("PVE_PASSWORD"),
    realm: process.env['PVE_REALM']?.trim() || "pam",
    agent: new Agent({rejectUnauthorized: false}),
});

async function main() {
    const vmid = process.argv[2] ?? process.env.PVE_VMID;
    if (!vmid) throw new Error("Provide VMID as first argument or set PVE_VMID in .env");

    await client.login();

    const terminal = client.helpers.terminal(vmid);
    const info = await terminal.getConnectionInfo();
    const session = await terminal.open({rejectUnauthorized: false});

    const onResize = () => {
        const cols = process.stdout.columns ?? 80;
        const rows = process.stdout.rows ?? 24;
        session.emit("resize", cols, rows);
    };

    const onInput = (chunk: Buffer) => {
        // Ctrl-] exits local bridge.
        if (chunk.length === 1 && chunk[0] === 0x1d) {
            session.close();
            return;
        }
        session.write(chunk.toString("utf8"));
    };

    const cleanup = () => {
        process.stdout.off("resize", onResize);
        process.stdin.off("data", onInput);
        if (process.stdin.isTTY) process.stdin.setRawMode(false);
        process.stdin.pause();
    };

    session.on("ready", () => {
        process.stdout.write(
            `Connected to ${info.type.toUpperCase()} ${info.vmid} on ${info.node}. Press Ctrl-] to exit.\n`
        );
        if (process.stdin.isTTY) process.stdin.setRawMode(true);
        process.stdin.resume();
        process.stdout.on("resize", onResize);
        process.stdin.on("data", onInput);
        onResize();
    });

    session.on("data", (data) => {
        process.stdout.write(data);
    });

    session.on("error", (error) => {
        process.stderr.write(`\nTerminal error: ${String(error)}\n`);
    });

    session.on("close", () => {
        cleanup();
        process.stdout.write("\nTerminal closed.\n");
    });

    process.on("SIGINT", () => {
        session.close();
        cleanup();
        process.exit(130);
    });
}

main().catch((error) => {
    process.stderr.write(`${String(error)}\n`);
    process.exit(1);
});
