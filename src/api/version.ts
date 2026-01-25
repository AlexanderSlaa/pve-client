import {Client} from "../index";

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
    version: (args: VersionAPI["/version"]["GET"]['parameters']) => client.request("/version", "GET", args)
}) as const
