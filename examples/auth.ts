import {Client} from "../src";
import {Agent} from "node:https";

const {api} = await new Client({
    baseUrl: "https://localhost:8006",
    username: 'root',
    password: 'root',
    agent: new Agent({rejectUnauthorized: false}),
}).login()

async function main() {
    const result = await api.cluster.index({})

    const nodes = await api.nodes.list({});

    const node = await api.nodes.get('pve').index({})

    console.log(result);
}

main().catch(console.error);
