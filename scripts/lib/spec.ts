/**
 * Helpers for reading the Proxmox VE API schema (`apidoc.js`, shipped by the pve-docs package and
 * served at https://pve.proxmox.com/pve-docs/api-viewer/apidoc.js).
 */
import fs from "node:fs";

export type SpecSchema = {
    type?: string | string[];
    optional?: 0 | 1 | "0" | "1";
    enum?: string[];
    properties?: Record<string, SpecSchema>;
    items?: SpecSchema;
    default?: unknown;
    format?: unknown;
    additionalProperties?: unknown;
    oneOf?: SpecSchema[];
    allOf?: SpecSchema[];
    /** Set by `normalize` when the schema was merged from oneOf/allOf variants. */
    complex?: boolean;
};
export type SpecMethod = { parameters?: SpecSchema; returns?: SpecSchema };
export type Spec = Record<string, Record<string, SpecMethod>>;

export const METHOD_ORDER = ["GET", "POST", "PUT", "DELETE"] as const;

/** Loads `apidoc.js` and flattens the endpoint tree into `{ [path]: { [method]: info } }`. */
export function loadSpec(file: string): Spec {
    const src = fs.readFileSync(file, "utf8");
    const start = src.indexOf("[");
    const end = src.indexOf("\nlet method2cmd");
    const tree = JSON.parse(src.slice(start, end < 0 ? undefined : end).trim().replace(/;\s*$/, ""));
    const out: Spec = {};
    const walk = (nodes: any[]) => {
        for (const n of nodes) {
            if (n.info) {
                out[n.path] = {};
                for (const [m, info] of Object.entries<any>(n.info)) {
                    out[n.path][m] = {
                        parameters: info.parameters ? normalize(info.parameters) : undefined,
                        returns: info.returns ? normalize(info.returns) : undefined,
                    };
                }
            }
            if (n.children) walk(n.children);
        }
    };
    walk(tree);
    return out;
}

export const isOptional = (s: SpecSchema) => s.optional === 1 || s.optional === "1";

export const specTypes = (s: SpecSchema): string[] =>
    Array.isArray(s.type) ? s.type : s.type ? [s.type] : [];

/**
 * Merges `oneOf` / `allOf` variants into a single schema so it can be compared property by
 * property: properties become the union of all variants (optional unless required everywhere),
 * enums are merged, and `complex` marks the result as an approximation.
 */
export function normalize(s: SpecSchema): SpecSchema {
    if (!s || typeof s !== "object") return s;
    let out: SpecSchema = {...s};
    const variants = [...(s.allOf ?? []), ...(s.oneOf ?? [])];
    if (variants.length) {
        const normalized = variants.map(normalize);
        const merged: SpecSchema = {...s, complex: true};
        delete merged.oneOf;
        delete merged.allOf;
        const types = new Set([...specTypes(s), ...normalized.flatMap(specTypes)]);
        if (types.size) merged.type = types.size === 1 ? [...types][0] : [...types];
        if (normalized.some(isOptional)) merged.optional = 1;
        const enums = normalized.filter((v) => v.enum);
        if (enums.length && enums.length === normalized.length) merged.enum = [...new Set(enums.flatMap((v) => v.enum!))];
        const items = normalized.filter((v) => v.items).map((v) => v.items!);
        if (items.length) merged.items = items.length === 1 ? items[0] : normalize({oneOf: items});
        const withProps = normalized.filter((v) => v.properties);
        if (withProps.length) {
            const props: Record<string, SpecSchema> = {...(s.properties ?? {})};
            const oneOfCount = (s.oneOf ?? []).length;
            for (const v of withProps) {
                for (const [k, p] of Object.entries(v.properties!)) {
                    const prev = props[k];
                    props[k] = prev ? normalize({oneOf: [prev, p]}) : p;
                }
            }
            // A property that does not appear in every oneOf variant is optional overall.
            if (oneOfCount) {
                const oneOfVariants = (s.oneOf ?? []).map(normalize);
                for (const k of Object.keys(props)) {
                    if (oneOfVariants.some((v) => v.properties && !(k in v.properties)) && !(s.allOf ?? []).some((a) => a.properties && k in a.properties))
                        props[k] = {...props[k], optional: 1};
                }
            }
            merged.properties = props;
        }
        out = merged;
    }
    if (out.properties) out.properties = Object.fromEntries(Object.entries(out.properties).map(([k, v]) => [k, normalize(v)]));
    if (out.items) out.items = normalize(out.items);
    return out;
}

export const propKey = (k: string) => JSON.stringify(k);

/**
 * Renders a TypeScript type for a schema, following the style of the hand-maintained type files:
 * quoted keys, `?` for optional members, `;` separators, and multi-line objects once they get long.
 */
export function schemaToTs(s: SpecSchema | undefined, indent = "", width = 110): string {
    if (!s) return "unknown";
    const types = specTypes(s);
    if (types.length > 1) {
        const parts = [...new Set(types.map((t) => schemaToTs({...s, type: t}, indent, width)))];
        return parts.join(" | ");
    }
    switch (types[0]) {
        case "null":
            return "null";
        case "boolean":
            return "boolean";
        case "integer":
        case "number":
            return s.enum?.length && s.enum.every((e) => /^-?\d+(\.\d+)?$/.test(String(e)))
                ? s.enum.map((e) => String(Number(e))).join(" | ")
                : "number";
        case "string":
            return s.enum?.length ? s.enum.map((e) => JSON.stringify(e)).join(" | ") : "string";
        case "array": {
            if (!s.items) return "unknown[]";
            const inner = schemaToTs(s.items, indent, width);
            return /[|&]/.test(inner) && !inner.startsWith("{") ? `(${inner})[]` : `${inner}[]`;
        }
        case "object":
            return objectToTs(s, indent, width);
        default:
            if (s.properties) return objectToTs(s, indent, width);
            return "unknown";
    }
}

export function objectToTs(s: SpecSchema, indent = "", width = 110): string {
    const entries = Object.entries(s.properties ?? {}).sort(([a], [b]) => a.localeCompare(b));
    if (!entries.length) return "Record<string, unknown>";
    const inner = indent + "    ";
    const members = entries.map(([k, v]) => `${propKey(k)}${isOptional(v) ? "?" : ""}: ${schemaToTs(v, inner, width)}`);
    const oneLine = `{ ${members.join("; ")} }`;
    if (oneLine.length + indent.length <= width && !oneLine.includes("\n")) return oneLine;
    return `{\n${members.map((m) => inner + m).join(";\n")}\n${indent}}`;
}
