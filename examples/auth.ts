import {Client} from "../src";

const client = new Client({baseUrl: "https://145.24.223.1:8006", username: 'root', password: 'testing'})

async function main() {
    client.api.access.acl.read({})
}

main().catch(console.error);
