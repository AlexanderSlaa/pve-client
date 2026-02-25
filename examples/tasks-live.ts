import {Agent} from "node:https";
import {Client} from "../src";

function env(name: string): string | undefined {
    const value = process.env[name]?.trim();
    return value && value.length > 0 ? value : undefined;
}

function requireEnv(name: string): string {
    const value = env(name);
    if (!value) throw new Error(`Missing required environment variable: ${name}`);
    return value;
}

const baseUrl = requireEnv("PVE_BASE_URL");
const apiToken = env("PVE_API_TOKEN");

const client = new Client({
    baseUrl,
    ...(apiToken
        ? {apiToken}
        : {
            username: requireEnv("PVE_USERNAME"),
            password: requireEnv("PVE_PASSWORD"),
            realm: env("PVE_REALM") ?? "pam",
        }),
    agent: new Agent({rejectUnauthorized: false}),
});

async function main() {
    console.log("Live Cluster Tasks");
    console.log("Press Ctrl+C to stop.");

    if (!apiToken) await client.login();

    const monitor = client.events.tasks();
    monitor.interval = Number(env("PVE_TASKS_POLL_INTERVAL_MS") ?? 2000);
    monitor.on("error", (error) => {
        console.error(`\n[tasks-live] poll error: ${String(error)}`);
    });

    monitor.on('task', (task) => console.log(task));

    await monitor.pullNow();

    process.on("SIGINT", () => {
        client.events.stopListening();
        console.log("\nStopped.");
        process.exit(0);
    });
}

main().catch((error) => {
    console.error(String(error));
    process.exit(1);
});
