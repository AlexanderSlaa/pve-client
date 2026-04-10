/// <reference types="vitest" />
import {builtinModules} from "node:module";
import {defineConfig} from "vite";
import dts from "vite-plugin-dts";
import packageJson from "./package.json";

const externalPackages = new Set([
    ...Object.keys(packageJson.dependencies ?? {}),
    ...Object.keys(packageJson.peerDependencies ?? {}),
]);

const nodeBuiltins = new Set([
    ...builtinModules,
    ...builtinModules.map((mod) => `node:${mod}`),
]);

export default defineConfig({
    build: {
        lib: {
            entry: "src/index.ts",
            formats: ["es", "cjs"],
            fileName: (format) => format === "es" ? "index.es.js" : "index.cjs.js",
        },
        rollupOptions: {
            external: (id) => {
                if (nodeBuiltins.has(id)) return true;
                if (externalPackages.has(id)) return true;
                return [...externalPackages].some((pkg) => id.startsWith(`${pkg}/`));
            },
        },
        sourcemap: true,
        target: "node18",
        emptyOutDir: true,
    },
    plugins: [dts()],
});
