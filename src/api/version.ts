import {Client} from "../index";
import type {ArgsTuple} from "./index";

export type VersionAPI = {
    "/version": {
        "GET": {
            parameters: {}
            return: {
                "console"?: "applet" | "vv" | "html5" | "xtermjs";
                "release": string;
                "repoid": string;
                "version": string
            }
        }
    }
}

export default (client: Client) => ({
    /**
     * API version details, including some parts of the global datacenter config.
     * @endpoint GET /version
     * @allowToken 1
     * @permissions {"user": "all"}
     */
    version: (...args: ArgsTuple<VersionAPI["/version"]["GET"]['parameters']>) => client.request("/version", "GET", (args[0] ?? {}) as VersionAPI["/version"]["GET"]['parameters'])
}) as const
