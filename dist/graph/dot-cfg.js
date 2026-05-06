"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateCfgDot = generateCfgDot;
const flownode_1 = require("../flownode/flownode");
const NODE_STYLES = {
    [flownode_1.FlowNode.ENTRY_NODE_TYPE]: { shape: "ellipse", fillcolor: "#FFF9C4" },
    [flownode_1.FlowNode.EXIT_NODE_TYPE]: { shape: "ellipse", fillcolor: "#FFE0B2" },
    [flownode_1.FlowNode.NORMAL_NODE_TYPE]: { shape: "box", fillcolor: "#E3F2FD" },
    [flownode_1.FlowNode.BRANCH_NODE_TYPE]: { shape: "diamond", fillcolor: "#FFECB3" },
    [flownode_1.FlowNode.BUILTIN_NODE_TYPE]: { shape: "box", fillcolor: "#D7CCC8" },
};
const EDGE_STYLES = {
    [flownode_1.FlowNode.NORMAL_CONNECTION_TYPE]: 'color="#90A4AE", penwidth=1.5, fontcolor="#455A64", label="normal"',
    [flownode_1.FlowNode.TRUE_BRANCH_CONNECTION_TYPE]: 'color="#43A047", penwidth=1.8, fontcolor="#2E7D32", label="true"',
    [flownode_1.FlowNode.FALSE_BRANCH_CONNECTION_TYPE]: 'color="#E53935", penwidth=1.8, fontcolor="#B71C1C", label="false"',
    [flownode_1.FlowNode.EXCEPTION_CONNECTION_TYPE]: 'color="#8E24AA", style="bold", penwidth=2.0, fontcolor="#6A1B9A", label="exception"',
};
function generateCfgDot(pageModels, options = {}) {
    var _a, _b;
    const lines = [];
    const graphName = (_a = options.graphName) !== null && _a !== void 0 ? _a : "CFG";
    const includeLineCol = (_b = options.includeLineCol) !== null && _b !== void 0 ? _b : true;
    lines.push(`digraph ${sanitize(graphName)} {`);
    lines.push("  rankdir=TB;");
    lines.push("  nodesep=0.6;");
    lines.push("  ranksep=0.9;");
    lines.push('  graph [bgcolor="#FAFAFA", splines=true, overlap=false, layout=dot];');
    lines.push('  node [style="rounded,filled", color="#455A64", fontname="Consolas", fontsize=11];');
    lines.push('  edge [fontname="Consolas", fontsize=10, arrowsize=0.75, color="#78909C"];');
    const models = getAllModels(pageModels);
    const nodes = collectAllNodes(models).sort((a, b) => { var _a, _b; return ((_a = a.cfgId) !== null && _a !== void 0 ? _a : Number.MAX_SAFE_INTEGER) - ((_b = b.cfgId) !== null && _b !== void 0 ? _b : Number.MAX_SAFE_INTEGER); });
    nodes.forEach((node) => {
        var _a;
        const style = (_a = NODE_STYLES[node.type]) !== null && _a !== void 0 ? _a : {
            shape: "box",
            fillcolor: "#FFFFFF",
        };
        const label = getNodeLabel(node, options.source, includeLineCol);
        const nodeId = getNodeId(node);
        lines.push(`  ${nodeId} [label="${sanitize(label)}", shape="${style.shape}", fillcolor="${style.fillcolor}"];`);
    });
    const edgeSet = new Set();
    nodes.forEach((node) => {
        const fromId = getNodeId(node);
        flownode_1.FlowNode.CONNECTION_TYPES.forEach((connectionType) => {
            const target = node.typeTable[connectionType];
            if (!target) {
                return;
            }
            const toId = getNodeId(target);
            const style = EDGE_STYLES[connectionType];
            edgeSet.add(`  ${fromId} -> ${toId} [${style}];`);
        });
    });
    lines.push(...edgeSet);
    lines.push("}");
    return lines.join("\n");
}
function getNodeId(node) {
    var _a;
    return `n${(_a = node.cfgId) !== null && _a !== void 0 ? _a : "unknown"}`;
}
function getAllModels(pageModels) {
    return [
        ...pageModels.intraProceduralModels,
        ...pageModels.interProceduralModels,
    ];
}
function collectAllNodes(models) {
    const nodeMap = new Map();
    models.forEach((model) => {
        var _a;
        (_a = model.graph) === null || _a === void 0 ? void 0 : _a.allNodes.forEach((node) => {
            var _a, _b, _c;
            const key = (_a = node.cfgId) !== null && _a !== void 0 ? _a : `unknown-${node.type}-${(_b = node.line) !== null && _b !== void 0 ? _b : -1}-${(_c = node.col) !== null && _c !== void 0 ? _c : -1}`;
            if (!nodeMap.has(key)) {
                nodeMap.set(key, node);
            }
        });
    });
    return Array.from(nodeMap.values());
}
function getNodeLabel(node, _source, includeLineCol = true) {
    var _a;
    const parts = [];
    const baseLabel = ((_a = node.astNode) === null || _a === void 0 ? void 0 : _a.type) ||
        node.label ||
        node.type ||
        "unknown";
    parts.push(baseLabel);
    if (includeLineCol && node.line !== undefined && node.col !== undefined) {
        parts.push(`@${node.line}:${node.col}`);
    }
    if (node.cfgId !== undefined) {
        parts.push(`#${node.cfgId}`);
    }
    return parts.join("\\n");
}
function sanitize(text) {
    return text
        .replace(/\\/g, "\\\\")
        .replace(/\n/g, "\\n")
        .replace(/"/g, '\\"')
        .replace(/\s+/g, " ")
        .trim();
}
