import {Client} from "../src";
import {Agent} from "node:https";

const {api} = await new Client({
    baseUrl: process.env['SECRET_PVE_HOST']!,
    apiToken: process.env['SECRET_PVE_TOKEN']!,
    agent: new Agent({rejectUnauthorized: false}),
})

async function main() {
    const result = await api.cluster.index()

    const nodes = await api.nodes.list();

    const node = await api.nodes.get('pve').index()

    console.log(nodes);
}

main().catch(console.error);
