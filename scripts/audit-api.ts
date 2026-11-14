/**
 * Audits the typed API surface (`API` in src/api/index.ts) and the route wrappers against a
 * Proxmox VE API schema (`apidoc.js` from the pve-docs package / pve.proxmox.com api-viewer).
 *
 * Usage: npx tsx scripts/audit-api.ts [path/to/apidoc.js] [--json]
 *
 * Reports missing/extra endpoints and methods, parameter location, optionality, type and enum
 * mismatches, return shapes that are untyped or differ from the schema, and endpoints that have
 * no wrapper in `client.api`.
 */
import fs from "node:fs";
import path from "node:path";
import ts from "typescript";

import {isOptional as specOptional, loadSpec, specTypes, type SpecSchema} from "./lib/spec";

const root = path.resolve(import.meta.dirname, "..");
const specFile = process.argv.slice(2).find((a) => !a.startsWith("--")) ?? path.join(root, "res/apidoc.js");
const asJson = process.argv.includes("--json");

const spec = loadSpec(specFile);
const program = ts.createProgram([path.join(root, "src/index.ts")], {
    strict: true,
    target: ts.ScriptTarget.ES2020,
    module: ts.ModuleKind.ESNext,
    moduleResolution: ts.ModuleResolutionKind.Bundler,
    skipLibCheck: true,
    noEmit: true,
});
const checker = program.getTypeChecker();
const apiFile = program.getSourceFile(path.join(root, "src/api/index.ts"))!;
const apiAlias = apiFile.statements.find(
    (s): s is ts.TypeAliasDeclaration => ts.isTypeAliasDeclaration(s) && s.name.text === "API",
)!;
const apiType = checker.getTypeAtLocation(apiAlias.name);

/**
 * Return members that Proxmox really sends but the schema does not declare. Keep them typed;
 * the audit only reports extras that are not listed here.
 */
const KNOWN_EXTRA_RETURN_PROPS: Record<string, string[]> = {
    // The task list schema only declares `upid`; the endpoint returns the full task record.
    "GET /cluster/tasks": ["return[].node", "return[].type", "return[].user", "return[].status", "return[].starttime", "return[].endtime", "return[].id"],
    // Protocol specific node properties of the merged fabric view.
    "GET /cluster/sdn/fabrics/all": ["return.nodes[].persistent_keepalive", "return.nodes[].redistribute", "return.nodes[].route_filter"],
};

type Issue = { path: string; method?: string; kind: string; detail: string };
const issues: Issue[] = [];
const report = (kind: string, p: string, method: string | undefined, detail: string) =>
    issues.push({path: p, method, kind, detail});

const prop = (t: ts.Type, name: string): ts.Type | undefined => {
    const s = t.getProperty(name);
    return s ? checker.getTypeOfSymbol(s) : undefined;
};
const nonNullable = (t: ts.Type) => checker.getNonNullableType(t);
const str = (t: ts.Type) => checker.typeToString(t, undefined, ts.TypeFormatFlags.NoTruncation);
const isOptional = (s: ts.Symbol) => (s.flags & ts.SymbolFlags.Optional) !== 0;

const isUnknownish = (t: ts.Type) => (t.flags & (ts.TypeFlags.Unknown | ts.TypeFlags.Any)) !== 0;
const isLooseRecord = (t: ts.Type) =>
    !!checker.getIndexInfoOfType(t, ts.IndexKind.String) && t.getProperties().length === 0;

/** Does TS type `t` reasonably represent spec schema `s`? Returns a reason when not. */
function typeMismatch(t: ts.Type, s: SpecSchema): string | undefined {
    if (specTypes(s).length === 1 && specTypes(s)[0] === "null") {
        return (t.flags & (ts.TypeFlags.Null | ts.TypeFlags.Void | ts.TypeFlags.Undefined | ts.TypeFlags.Unknown | ts.TypeFlags.Any)) !== 0
            ? undefined
            : `expected null, got ${str(t)}`;
    }
    t = nonNullable(t);
    if (isUnknownish(t)) return undefined;
    const parts = t.isUnion() ? t.types : [t];
    const has = (f: ts.TypeFlags) => parts.some((p) => (p.flags & f) !== 0);
    const types = specTypes(s);
    if (types.length === 0) return undefined;
    const ok = types.some((ty) => {
        switch (ty) {
            case "boolean":
                return has(ts.TypeFlags.BooleanLike);
            case "integer":
            case "number":
                return has(ts.TypeFlags.NumberLike);
            case "string":
                return has(ts.TypeFlags.StringLike);
            case "array":
                return parts.some((p) => checker.isArrayType(p) || checker.isTupleType(p));
            case "object":
                return parts.some((p) => (p.flags & ts.TypeFlags.Object) !== 0 || (p.flags & ts.TypeFlags.NonPrimitive) !== 0 || (p.flags & ts.TypeFlags.Intersection) !== 0);
            case "null":
                return has(ts.TypeFlags.Null) || has(ts.TypeFlags.Void) || has(ts.TypeFlags.Undefined);
            default:
                return true;
        }
    });
    if (!ok) return `expected ${types.join("|")}, got ${str(t)}`;
    if (s.enum && types.includes("string")) {
        const literals = parts.filter((p) => p.isStringLiteral()).map((p) => (p as ts.StringLiteralType).value);
        if (literals.length === 0) return `enum not typed (${s.enum.join("|")}), got ${str(t)}`;
        const missing = s.enum.filter((e) => !literals.includes(e));
        const extra = literals.filter((l) => !s.enum!.includes(l));
        if (missing.length || extra.length)
            return `enum differs: missing [${missing.join(", ")}] extra [${extra.join(", ")}]`;
    }
    return undefined;
}

/** Compare an object schema's properties with a TS object type. */
function compareObject(t: ts.Type, s: SpecSchema, where: string, p: string, m: string, kind: string, deep = true) {
    const props = s.properties ?? {};
    t = nonNullable(t);
    if (isUnknownish(t) || isLooseRecord(t)) {
        if (Object.keys(props).length) report(`${kind}-untyped`, p, m, `${where}: ${str(t)} but schema has [${Object.keys(props).join(", ")}]`);
        return;
    }
    for (const [name, ps] of Object.entries(props)) {
        const sym = t.getProperty(name);
        if (!sym) {
            report(`${kind}-missing-prop`, p, m, `${where}.${name} (${specTypes(ps).join("|")}${specOptional(ps) ? ", optional" : ""})`);
            continue;
        }
        const optSpec = specOptional(ps);
        if (optSpec !== isOptional(sym)) report(`${kind}-optionality`, p, m, `${where}.${name}: schema ${optSpec ? "optional" : "required"}`);
        const pt = checker.getTypeOfSymbol(sym);
        const mm = typeMismatch(pt, ps);
        if (mm) report(`${kind}-type`, p, m, `${where}.${name}: ${mm}`);
        if (deep) compareNested(pt, ps, `${where}.${name}`, p, m, kind);
    }
    if (Object.keys(props).length && !s.additionalProperties) {
        for (const sym of t.getProperties()) {
            if (!(sym.name in props) && !KNOWN_EXTRA_RETURN_PROPS[`${m} ${p}`]?.includes(`${where}.${sym.name}`))
                report(`${kind}-extra-prop`, p, m, `${where}.${sym.name}`);
        }
    }
}

function compareNested(t: ts.Type, s: SpecSchema, where: string, p: string, m: string, kind: string) {
    t = nonNullable(t);
    const types = specTypes(s);
    if (types.includes("object") && s.properties) {
        const objPart = (t.isUnion() ? t.types : [t]).find((x) => (x.flags & ts.TypeFlags.Object) !== 0 && !checker.isArrayType(x)) ?? t;
        compareObject(objPart, s, where, p, m, kind);
    } else if (types.includes("array") && s.items) {
        const arr = (t.isUnion() ? t.types : [t]).find((x) => checker.isArrayType(x));
        if (!arr) {
            if (!isUnknownish(t)) report(`${kind}-type`, p, m, `${where}: expected array, got ${str(t)}`);
            else if (s.items.properties) report(`${kind}-untyped`, p, m, `${where}: ${str(t)} but schema has array of [${Object.keys(s.items.properties).join(", ")}]`);
            return;
        }
        const item = checker.getTypeArguments(arr as ts.TypeReference)[0];
        const mm = typeMismatch(item, s.items);
        if (mm) report(`${kind}-type`, p, m, `${where}[]: ${mm}`);
        compareNested(item, s.items, `${where}[]`, p, m, kind);
    }
}

// ---------- endpoints / methods / parameters ----------
const tsPaths = new Map(apiType.getProperties().map((s) => [s.name, checker.getTypeOfSymbol(s)]));

for (const p of Object.keys(spec)) {
    if (!tsPaths.has(p)) {
        report("endpoint-missing", p, undefined, Object.keys(spec[p]).join(","));
    }
}
for (const p of tsPaths.keys()) {
    if (!spec[p]) report("endpoint-extra", p, undefined, "not in schema");
}

for (const [p, methods] of Object.entries(spec)) {
    const pt = tsPaths.get(p);
    if (!pt) continue;
    for (const m of pt.getProperties().map((s) => s.name)) {
        if (!methods[m]) report("method-extra", p, m, "not in schema");
    }
    for (const [m, info] of Object.entries(methods)) {
        const mt = prop(pt, m);
        if (!mt) {
            report("method-missing", p, m, "");
            continue;
        }
        const params = prop(mt, "parameters");
        const ret = prop(mt, "return");
        if (!params || !ret) {
            report("method-shape", p, m, "missing parameters/return");
            continue;
        }
        const pathParams = [...p.matchAll(/\{([^}]+)\}/g)].map((x) => x[1]);
        const loc = m === "GET" || m === "DELETE" ? "$query" : "$body";
        const specProps = info.parameters?.properties ?? {};
        const groups: Record<string, ts.Type | undefined> = {
            $path: params.getProperty("$path") ? nonNullable(prop(params, "$path")!) : undefined,
            $query: params.getProperty("$query") ? nonNullable(prop(params, "$query")!) : undefined,
            $body: params.getProperty("$body") ? nonNullable(prop(params, "$body")!) : undefined,
        };
        const seen = new Set<string>(pathParams);
        // oneOf/allOf parameter schemas are typed by hand as discriminated unions; only check presence.
        const complexParams = !!info.parameters?.complex;
        for (const [name, ps] of Object.entries(specProps)) {
            if (complexParams) {
                seen.add(name);
                continue;
            }
            const want = pathParams.includes(name) ? "$path" : loc;
            const found = (["$path", "$query", "$body"] as const).find((g) => groups[g]?.getProperty(name));
            seen.add(name);
            if (!found) {
                report("param-missing", p, m, `${want}.${name} (${specTypes(ps).join("|")}${ps.enum ? " enum" : ""}${specOptional(ps) ? ", optional" : ""})`);
                continue;
            }
            if (found !== want) report("param-location", p, m, `${name}: in ${found}, expected ${want}`);
            const sym = groups[found]!.getProperty(name)!;
            const optSpec = specOptional(ps) && want !== "$path";
            if (optSpec !== isOptional(sym)) report("param-optionality", p, m, `${found}.${name}: schema ${optSpec ? "optional" : "required"}`);
            const t = checker.getTypeOfSymbol(sym);
            const mm = typeMismatch(t, ps);
            if (mm) report("param-type", p, m, `${found}.${name}: ${mm}`);
        }
        for (const g of ["$path", "$query", "$body"] as const) {
            const gt = groups[g];
            if (!gt || isLooseRecord(gt) || isUnknownish(gt) || complexParams) continue;
            for (const s of gt.getProperties()) if (!seen.has(s.name)) report("param-extra", p, m, `${g}.${s.name}`);
        }
        // required group but all-optional contents or vice versa
        for (const g of ["$query", "$body"] as const) {
            const sym = params.getProperty(g);
            if (!sym || !groups[g]) continue;
            const anyRequired = groups[g]!.getProperties().some((s) => !isOptional(s));
            if (anyRequired === isOptional(sym)) report("param-group-optionality", p, m, `${g} is ${isOptional(sym) ? "optional" : "required"} but ${anyRequired ? "has" : "has no"} required fields`);
        }

        // returns
        const rs = info.returns ?? {};
        const mm = typeMismatch(ret, rs);
        if (mm) report("return-type", p, m, mm);
        compareNested(ret, rs, "return", p, m, "return");
        if (isUnknownish(ret) && specTypes(rs).length === 1 && specTypes(rs)[0] === "null")
            report("return-null-untyped", p, m, `return is ${str(ret)}, schema returns null`);
        if (isUnknownish(ret) && specTypes(rs).some((x) => x !== "null" && x !== "any") && !rs.properties && !rs.items?.properties)
            report("return-unknown", p, m, `return is ${str(ret)}, schema type ${specTypes(rs).join("|")}${rs.items ? " of " + specTypes(rs.items).join("|") : ""}`);
    }
}

// ---------- wrappers ----------
const wrapperSrc = new Map<string, Set<string>>();
const walkDir = (dir: string) => {
    for (const f of fs.readdirSync(dir, {withFileTypes: true})) {
        const fp = path.join(dir, f.name);
        if (f.isDirectory()) walkDir(fp);
        else if (fp.endsWith(".ts") && !fp.endsWith(".test.ts") && !fp.endsWith("types.ts")) {
            const src = fs.readFileSync(fp, "utf8");
            for (const mm of src.matchAll(/(?:request|\br)\(\s*(?:<[^>]*>)?\s*["'`]([^"'`]+)["'`]\s*,\s*["'`](GET|POST|PUT|DELETE|PATCH)["'`]/g)) {
                if (!wrapperSrc.has(mm[1])) wrapperSrc.set(mm[1], new Set());
                wrapperSrc.get(mm[1])!.add(mm[2]);
            }
        }
    }
};
walkDir(path.join(root, "src/api"));
for (const [p, methods] of Object.entries(spec)) {
    for (const m of Object.keys(methods)) {
        if (!wrapperSrc.get(p)?.has(m)) report("wrapper-missing", p, m, "");
    }
}

// Wrappers whose arrow function forwards no caller arguments although the endpoint takes
// parameters besides the path ones, or whose arguments are typed loosely.
for (const sf of program.getSourceFiles()) {
    const file = path.relative(root, sf.fileName).replace(/\\/g, "/");
    if (!file.startsWith("src/api/") || file.endsWith("types.ts")) continue;
    const visit = (node: ts.Node) => {
        if (ts.isCallExpression(node) && node.arguments.length >= 2) {
            const callee = node.expression.getText(sf);
            const [pa, ma] = node.arguments;
            if ((callee === "r" || callee.endsWith("request")) && ts.isStringLiteralLike(pa) && ts.isStringLiteralLike(ma)) {
                const p = pa.text, m = ma.text;
                let fn: ts.Node | undefined = node.parent;
                while (fn && !ts.isArrowFunction(fn) && !ts.isFunctionExpression(fn) && !ts.isMethodDeclaration(fn)) fn = fn.parent;
                const info = spec[p]?.[m];
                if (fn && info && (ts.isArrowFunction(fn) || ts.isFunctionExpression(fn) || ts.isMethodDeclaration(fn))) {
                    const pathParams = [...p.matchAll(/\{([^}]+)\}/g)].map((x) => x[1]);
                    const extra = Object.keys(info.parameters?.properties ?? {}).filter((k) => !pathParams.includes(k));
                    const pathNames = new Set(pathParams.map((x) => x.replace(/[^A-Za-z0-9_]/g, "")));
                    const forwards = fn.parameters.some((prm) => prm.dotDotDotToken || !pathNames.has(prm.name.getText(sf).replace(/[^A-Za-z0-9_]/g, "")) && !/^(node|vmid|id|name|pciId|storage|volume|realm|userid|tokenid)$/.test(prm.name.getText(sf)));
                    const line = sf.getLineAndCharacterOfPosition(node.getStart(sf)).line + 1;
                    if (extra.length && !forwards) report("wrapper-drops-params", p, m, `${file}:${line} ignores [${extra.join(", ")}]`);
                }
            }
        }
        ts.forEachChild(node, visit);
    };
    visit(sf);
    const text = sf.getFullText();
    for (const mm of text.matchAll(/\(args\??: (?:A|any)\)/g)) {
        const line = sf.getLineAndCharacterOfPosition(mm.index!).line + 1;
        report("wrapper-loose-args", file, undefined, `line ${line}: ${mm[0]}`);
    }
}

// ---------- output ----------
if (asJson) {
    console.log(JSON.stringify(issues, null, 2));
} else {
    const byKind = new Map<string, Issue[]>();
    for (const i of issues) {
        if (!byKind.has(i.kind)) byKind.set(i.kind, []);
        byKind.get(i.kind)!.push(i);
    }
    for (const [kind, list] of [...byKind].sort()) {
        console.log(`\n## ${kind} (${list.length})`);
        for (const i of list) console.log(`  ${i.method ?? ""} ${i.path}  ${i.detail}`.trimEnd());
    }
    console.log(`\n${issues.length} issue(s) across ${Object.keys(spec).length} schema paths.`);
}
process.exitCode = issues.length ? 1 : 0;
