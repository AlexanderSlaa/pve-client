/**
 * Reconciles the hand-maintained endpoint type maps with a Proxmox VE API schema.
 *
 * Usage: npx tsx scripts/sync-api-types.ts [path/to/apidoc.js] [--dry]
 *
 * The type files are edited in place with targeted changes only, so hand-written refinements
 * (discriminated unions, named helper types, comments) survive:
 *  - missing endpoints / methods are appended with types generated from the schema
 *  - missing parameters are added; optionality, enums and primitive types are corrected
 *  - `$query` / `$body` are made optional exactly when the schema has no required member
 *  - `unknown` / `Record<string, unknown>` returns are replaced when the schema describes them,
 *    object returns gain missing members and get optionality / enum fixes
 *
 * Unknown extra members are left alone; run `scripts/audit-api.ts` afterwards for a report.
 */
import fs from "node:fs";
import path from "node:path";
import ts from "typescript";
import {isOptional, loadSpec, METHOD_ORDER, objectToTs, propKey, schemaToTs, specTypes, type SpecSchema} from "./lib/spec";

const root = path.resolve(import.meta.dirname, "..");
const specFile = process.argv.slice(2).find((a) => !a.startsWith("--")) ?? path.join(root, "res/apidoc.js");
const dry = process.argv.includes("--dry");
const spec = loadSpec(specFile);

/** Files that hold an endpoint map, and the path prefixes they own (longest prefix wins). */
const TYPE_FILES: Record<string, string[]> = {
    "src/api/access.ts": ["/access"],
    "src/api/cluster/types.ts": ["/cluster"],
    "src/api/nodes/types.ts": ["/nodes"],
    "src/api/pools.ts": ["/pools"],
    "src/api/storage.ts": ["/storage"],
    "src/api/version.ts": ["/version"],
};

const program = ts.createProgram(Object.keys(TYPE_FILES).map((f) => path.join(root, f)), {
    strict: true,
    target: ts.ScriptTarget.ES2020,
    module: ts.ModuleKind.ESNext,
    moduleResolution: ts.ModuleResolutionKind.Bundler,
    skipLibCheck: true,
    noEmit: true,
});
const checker = program.getTypeChecker();

type Edit = { start: number; end: number; text: string };
const log: string[] = [];

const nameOf = (m: ts.TypeElement, sf: ts.SourceFile) =>
    m.name ? (ts.isStringLiteral(m.name) || ts.isIdentifier(m.name) ? m.name.text : m.name.getText(sf)) : "";
const member = (lit: ts.TypeLiteralNode, name: string, sf: ts.SourceFile) =>
    lit.members.find((m): m is ts.PropertySignature => ts.isPropertySignature(m) && nameOf(m, sf) === name);
const unwrap = (n: ts.TypeNode | undefined): ts.TypeNode | undefined => {
    while (n && ts.isParenthesizedTypeNode(n)) n = n.type;
    return n;
};
const lineIndent = (sf: ts.SourceFile, pos: number) => {
    const text = sf.getFullText();
    const ls = text.lastIndexOf("\n", pos - 1) + 1;
    return /^[ \t]*/.exec(text.slice(ls))![0];
};

function isUnknownNode(n: ts.TypeNode) {
    return n.kind === ts.SyntaxKind.UnknownKeyword || n.kind === ts.SyntaxKind.AnyKeyword;
}
function isLooseRecordNode(n: ts.TypeNode, sf: ts.SourceFile) {
    return ts.isTypeReferenceNode(n) && n.getText(sf).replace(/\s/g, "") === "Record<string,unknown>";
}

/** Insert a member into a type literal, keeping its single-/multi-line layout. */
function insertMember(lit: ts.TypeLiteralNode, memberText: string, sf: ts.SourceFile, edits: Edit[]) {
    const text = lit.getText(sf);
    if (!lit.members.length) {
        edits.push({start: lit.getStart(sf), end: lit.getEnd(), text: `{ ${memberText} }`});
        return;
    }
    const last = lit.members[lit.members.length - 1];
    const lastText = last.getText(sf);
    const sep = /[;,]$/.test(lastText) ? "" : ";";
    if (text.includes("\n") && lit.members.length > 1 && sf.getLineAndCharacterOfPosition(lit.members[0].getStart(sf)).line !== sf.getLineAndCharacterOfPosition(lit.getStart(sf)).line) {
        const indent = lineIndent(sf, last.getStart(sf));
        edits.push({start: last.getEnd(), end: last.getEnd(), text: `${sep}\n${indent}${memberText}${sep ? "" : ";"}`});
    } else {
        edits.push({start: last.getEnd(), end: last.getEnd(), text: `${sep} ${memberText}${sep ? "" : ";"}`});
    }
}

function setOptional(prop: ts.PropertySignature, optional: boolean, edits: Edit[]) {
    if (optional && !prop.questionToken) edits.push({start: prop.name.getEnd(), end: prop.name.getEnd(), text: "?"});
    if (!optional && prop.questionToken) edits.push({start: prop.questionToken.getStart(), end: prop.questionToken.getEnd(), text: ""});
}

/** Primitive-level compatibility; enums must match exactly. */
function compatible(node: ts.TypeNode, s: SpecSchema): boolean {
    const types = specTypes(s);
    if (!types.length || types.includes("any")) return true;
    if (isUnknownNode(node)) return true;
    let t = checker.getTypeFromTypeNode(node);
    if (types.length === 1 && types[0] === "null") return (t.flags & (ts.TypeFlags.Null | ts.TypeFlags.Void | ts.TypeFlags.Unknown | ts.TypeFlags.Any)) !== 0;
    t = checker.getNonNullableType(t);
    const parts = t.isUnion() ? t.types : [t];
    const has = (f: ts.TypeFlags) => parts.some((p) => (p.flags & f) !== 0);
    const ok = types.some((ty) => {
        switch (ty) {
            case "boolean": return has(ts.TypeFlags.BooleanLike);
            case "integer":
            case "number": return has(ts.TypeFlags.NumberLike);
            case "string": return has(ts.TypeFlags.StringLike);
            case "array": return parts.some((p) => checker.isArrayType(p) || checker.isTupleType(p));
            case "object": return parts.some((p) => (p.flags & (ts.TypeFlags.Object | ts.TypeFlags.NonPrimitive | ts.TypeFlags.Intersection)) !== 0);
            case "null": return has(ts.TypeFlags.Null);
            default: return true;
        }
    });
    if (!ok) return false;
    if (s.enum && types.length === 1) {
        if (types[0] === "string") {
            const lits = parts.filter((p) => p.isStringLiteral()).map((p) => (p as ts.StringLiteralType).value);
            if (lits.length !== parts.filter((p) => !(p.flags & ts.TypeFlags.Null)).length) return false; // plain string where an enum exists
            return lits.length === s.enum.length && s.enum.every((e) => lits.includes(e));
        }
        if (types[0] === "integer" && s.enum.every((e) => /^-?\d+$/.test(String(e)))) {
            const lits = parts.filter((p) => p.isNumberLiteral()).map((p) => String((p as ts.NumberLiteralType).value));
            if (!lits.length) return false;
            return lits.length === s.enum.length && s.enum.every((e) => lits.includes(String(Number(e))));
        }
    }
    return true;
}

/** Reconciles a type node against a schema, recursing into object literals and arrays. */
function reconcile(node: ts.TypeNode, s: SpecSchema | undefined, sf: ts.SourceFile, edits: Edit[], where: string) {
    if (!s) return;
    const indent = lineIndent(sf, node.getStart(sf));
    const replace = (why: string) => {
        const text = schemaToTs(s, indent);
        if (text === "unknown" || text === node.getText(sf)) return;
        edits.push({start: node.getStart(sf), end: node.getEnd(), text});
        log.push(`${where}: ${why} -> ${text.length > 80 ? text.slice(0, 77) + "..." : text}`);
    };
    const inner = unwrap(node)!;
    const types = specTypes(s);

    if (types.length === 1 && types[0] === "null") {
        if (isUnknownNode(inner)) replace("null return");
        return;
    }
    if (isUnknownNode(inner) || isLooseRecordNode(inner, sf)) {
        const described = s.properties || s.items || s.enum || (types.length && !types.includes("any") && !(types[0] === "object" && !s.properties));
        if (described && !(isLooseRecordNode(inner, sf) && !s.properties)) replace("untyped");
        return;
    }
    if (ts.isTypeLiteralNode(inner) && s.properties && types.every((t) => t === "object")) {
        for (const [k, ps] of Object.entries(s.properties)) {
            const m = member(inner, k, sf);
            if (!m) {
                insertMember(inner, `${propKey(k)}${isOptional(ps) ? "?" : ""}: ${schemaToTs(ps, lineIndent(sf, inner.getStart(sf)) + "    ")}`, sf, edits);
                log.push(`${where}.${k}: added`);
                continue;
            }
            if (!!m.questionToken !== isOptional(ps)) {
                setOptional(m, isOptional(ps), edits);
                log.push(`${where}.${k}: ${isOptional(ps) ? "optional" : "required"}`);
            }
            if (m.type) reconcile(m.type, ps, sf, edits, `${where}.${k}`);
        }
        return;
    }
    if (ts.isArrayTypeNode(inner) && s.items && types.length === 1 && types[0] === "array") {
        reconcile(inner.elementType, s.items, sf, edits, `${where}[]`);
        return;
    }
    if (ts.isTypeReferenceNode(inner) && inner.typeName.getText(sf) === "Array" && inner.typeArguments?.length === 1 && s.items) {
        reconcile(inner.typeArguments[0], s.items, sf, edits, `${where}[]`);
        return;
    }
    // Leave hand-written unions of objects, intersections and named types unless clearly wrong.
    if (ts.isIntersectionTypeNode(inner) || ts.isTypeReferenceNode(inner) && !isLooseRecordNode(inner, sf)) return;
    if (ts.isUnionTypeNode(inner) && inner.types.some((t) => ts.isTypeLiteralNode(unwrap(t)!))) return;
    if (!compatible(inner, s)) replace("type/enum");
}

function paramGroups(p: string, m: string, s: SpecSchema | undefined) {
    const pathParams = [...p.matchAll(/\{([^}]+)\}/g)].map((x) => x[1]);
    const props = Object.entries(s?.properties ?? {}).filter(([k]) => !pathParams.includes(k));
    return {pathParams, props, loc: m === "GET" || m === "DELETE" ? "$query" : "$body"};
}

function renderMethod(p: string, m: string, indent: string): string {
    const info = spec[p][m];
    const {pathParams, props, loc} = paramGroups(p, m, info.parameters);
    const i2 = indent + "    ", i3 = i2 + "    ", i4 = i3 + "    ";
    const lines: string[] = [];
    if (pathParams.length) {
        const pp = info.parameters?.properties ?? {};
        lines.push(`${i4}$path: { ${pathParams.map((k) => `${propKey(k)}: ${pp[k] && specTypes(pp[k]).includes("integer") ? "number" : "string"}`).join("; ")} },`);
    }
    if (props.length) {
        const req = props.some(([, v]) => !isOptional(v));
        lines.push(`${i4}${loc}${req ? "" : "?"}: ${objectToTs({type: "object", properties: Object.fromEntries(props)}, i4)},`);
    }
    return [
        `${i2}${JSON.stringify(m)}: {`,
        lines.length ? `${i3}parameters: {\n${lines.join("\n")}\n${i3}}` : `${i3}parameters: {}`,
        `${i3}return: ${schemaToTs(info.returns, i3)}`,
        `${i2}}`,
    ].join("\n");
}

for (const [file, prefixes] of Object.entries(TYPE_FILES)) {
    const abs = path.join(root, file);
    const sf = program.getSourceFile(abs)!;
    const edits: Edit[] = [];
    let map: ts.TypeLiteralNode | undefined;
    sf.forEachChild((n) => {
        if (ts.isTypeAliasDeclaration(n) && ts.isTypeLiteralNode(n.type) && n.type.members.some((m) => nameOf(m, sf).startsWith("/"))) map = n.type;
    });
    if (!map) throw new Error(`No endpoint map in ${file}`);
    const owned = Object.keys(spec).filter((p) => prefixes.some((pre) => p === pre || p.startsWith(pre + "/")));

    for (const p of owned) {
        const entry = member(map, p, sf);
        if (!entry) {
            // Append after the closest preceding existing path (schema order), else at the end.
            const order = Object.keys(spec);
            let anchor: ts.PropertySignature | undefined;
            for (let i = order.indexOf(p) - 1; i >= 0 && !anchor; i--) anchor = member(map, order[i], sf);
            anchor ??= map.members[map.members.length - 1] as ts.PropertySignature;
            const indent = lineIndent(sf, anchor.getStart(sf));
            const methods = METHOD_ORDER.filter((m) => spec[p][m]);
            const text = `\n${indent}${JSON.stringify(p)}: {\n${methods.map((m) => renderMethod(p, m, indent)).join(",\n")}\n${indent}},`;
            const end = anchor.getEnd();
            const hasComma = sf.getFullText()[end - 1] === "," || sf.getFullText()[end] === ",";
            const at = sf.getFullText()[end] === "," ? end + 1 : end;
            edits.push({start: at, end: at, text: hasComma ? text : "," + text.replace(/,$/, "")});
            log.push(`${p}: added endpoint (${methods.join(", ")})`);
            continue;
        }
        const methodsLit = unwrap(entry.type);
        if (!methodsLit || !ts.isTypeLiteralNode(methodsLit)) continue;
        for (const [m, info] of Object.entries(spec[p])) {
            const mm = member(methodsLit, m, sf);
            if (!mm) {
                const indent = lineIndent(sf, entry.getStart(sf));
                insertMember(methodsLit, renderMethod(p, m, indent).trimStart(), sf, edits);
                log.push(`${m} ${p}: added method`);
                continue;
            }
            const methodLit = unwrap(mm.type);
            if (!methodLit || !ts.isTypeLiteralNode(methodLit)) continue;
            const params = member(methodLit, "parameters", sf);
            const ret = member(methodLit, "return", sf);
            const where = `${m} ${p}`;

            // ---- parameters
            const {props, loc} = paramGroups(p, m, info.parameters);
            const paramsLit = params?.type && unwrap(params.type);
            if (params && paramsLit && ts.isTypeLiteralNode(paramsLit) && !info.parameters?.complex) {
                const group = member(paramsLit, loc, sf);
                const groupLit = group?.type && unwrap(group.type);
                if (props.length && !group) {
                    const indent = lineIndent(sf, params.getStart(sf)) + "    ";
                    const req = props.some(([, v]) => !isOptional(v));
                    const body = `${loc}${req ? "" : "?"}: ${objectToTs({type: "object", properties: Object.fromEntries(props)}, indent)},`;
                    if (paramsLit.members.length) {
                        const last = paramsLit.members[paramsLit.members.length - 1];
                        edits.push({start: last.getEnd(), end: last.getEnd(), text: `${/[;,]$/.test(last.getText(sf)) ? "" : ","}\n${indent}${body}`});
                    } else {
                        edits.push({start: paramsLit.getStart(sf), end: paramsLit.getEnd(), text: `{\n${indent}${body}\n${lineIndent(sf, params.getStart(sf))}}`});
                    }
                    log.push(`${where}: added ${loc}`);
                } else if (group && groupLit && ts.isTypeLiteralNode(groupLit)) {
                    for (const [k, ps] of props) {
                        const pm = member(groupLit, k, sf);
                        if (!pm) {
                            insertMember(groupLit, `${propKey(k)}${isOptional(ps) ? "?" : ""}: ${schemaToTs(ps, lineIndent(sf, groupLit.getStart(sf)) + "    ")}`, sf, edits);
                            log.push(`${where}: ${loc}.${k} added`);
                            continue;
                        }
                        if (!!pm.questionToken !== isOptional(ps)) {
                            setOptional(pm, isOptional(ps), edits);
                            log.push(`${where}: ${loc}.${k} ${isOptional(ps) ? "optional" : "required"}`);
                        }
                        if (pm.type && !compatible(unwrap(pm.type)!, ps) && !ts.isTypeLiteralNode(unwrap(pm.type)!)) {
                            const text = schemaToTs(ps, lineIndent(sf, pm.getStart(sf)));
                            if (text !== "unknown") {
                                edits.push({start: pm.type.getStart(sf), end: pm.type.getEnd(), text});
                                log.push(`${where}: ${loc}.${k} type -> ${text.length > 60 ? text.slice(0, 57) + "..." : text}`);
                            }
                        }
                    }
                }
                if (group) {
                    const wantOptional = !props.some(([, v]) => !isOptional(v));
                    if (props.length && !!group.questionToken !== wantOptional) {
                        setOptional(group, wantOptional, edits);
                        log.push(`${where}: ${loc} ${wantOptional ? "optional" : "required"}`);
                    }
                }
            }

            // ---- return
            if (ret?.type) reconcile(ret.type, info.returns, sf, edits, `${where} return`);
        }
    }

    if (!edits.length) continue;
    edits.sort((a, b) => b.start - a.start || b.end - a.end);
    for (let i = 1; i < edits.length; i++) {
        if (edits[i].end > edits[i - 1].start && edits[i].start !== edits[i - 1].start)
            throw new Error(`Overlapping edits in ${file} at ${edits[i].start}`);
    }
    let text = sf.getFullText();
    for (const e of edits) text = text.slice(0, e.start) + e.text + text.slice(e.end);
    if (!dry) fs.writeFileSync(abs, text);
    console.log(`${file}: ${edits.length} edit(s)`);
}
console.log(log.join("\n"));
