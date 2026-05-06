"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAstDot = generateAstDot;
const INTERNAL_KEYS = new Set([
    "start",
    "end",
    "range",
    "loc",
    "cfg",
    "parent",
]);
function generateAstDot(ast, options = {}) {
    var _a, _b;
    const graphName = (_a = options.graphName) !== null && _a !== void 0 ? _a : "AST";
    const maxLabelLength = (_b = options.maxLabelLength) !== null && _b !== void 0 ? _b : 80;
    const lines = [];
    const nodes = [];
    const edges = [];
    const visited = new Set();
    let nodeCounter = 0;
    const walk = (current) => {
        const currentId = `a${nodeCounter++}`;
        const currentLabel = truncateLabel(buildNodeLabel(current), maxLabelLength);
        nodes.push({ id: currentId, label: sanitize(currentLabel) });
        visited.add(current);
        for (const key of Object.keys(current)) {
            if (INTERNAL_KEYS.has(key)) {
                continue;
            }
            const value = current[key];
            if (isAstNode(value) && !visited.has(value)) {
                const childId = walk(value);
                edges.push({ from: currentId, to: childId, label: sanitize(key) });
                continue;
            }
            if (Array.isArray(value)) {
                value.forEach((item, index) => {
                    if (isAstNode(item) && !visited.has(item)) {
                        const childId = walk(item);
                        edges.push({
                            from: currentId,
                            to: childId,
                            label: sanitize(`${key}[${index}]`),
                        });
                    }
                });
            }
        }
        return currentId;
    };
    walk(ast);
    lines.push(`digraph ${sanitize(graphName)} {`);
    lines.push("  rankdir=TB;");
    lines.push('  graph [bgcolor="#FAFAFA", splines=true, overlap=false, layout=dot];');
    lines.push('  node [shape=box, style="rounded,filled", fillcolor="#FFFDE7", color="#546E7A", fontname="Consolas", fontsize=11];');
    lines.push('  edge [color="#78909C", fontname="Consolas", fontsize=10, arrowsize=0.7];');
    nodes.forEach((node) => {
        lines.push(`  ${node.id} [label="${node.label}"];`);
    });
    edges.forEach((edge) => {
        lines.push(`  ${edge.from} -> ${edge.to} [label="${edge.label}", fontcolor="#37474F"];`);
    });
    lines.push("}");
    return lines.join("\n");
}
function isAstNode(value) {
    return Boolean(value && typeof value === "object" && "type" in value);
}
function buildNodeLabel(node) {
    const withName = node;
    if (typeof withName.name === "string") {
        return `${node.type}\\nname: ${withName.name}`;
    }
    if (typeof withName.operator === "string") {
        return `${node.type}\\nop: ${withName.operator}`;
    }
    if (typeof withName.kind === "string") {
        return `${node.type}\\nkind: ${withName.kind}`;
    }
    if (withName.value !== undefined && withName.value !== null) {
        return `${node.type}\\nvalue: ${String(withName.value)}`;
    }
    return node.type;
}
function truncateLabel(label, maxLength) {
    if (label.length <= maxLength) {
        return label;
    }
    return `${label.slice(0, maxLength - 3)}...`;
}
function sanitize(text) {
    return text
        .replace(/\\/g, "\\\\")
        .replace(/\n/g, "\\n")
        .replace(/"/g, '\\"');
}
