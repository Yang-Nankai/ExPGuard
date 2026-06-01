"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = generateDot;
const flownode_1 = require("../flownode/flownode");
const set_1 = __importDefault(require("../utils/set"));
/**
 * Node visual styles in DOT graph
 */
const NODE_STYLES = {
    [flownode_1.FlowNode.ENTRY_NODE_TYPE]: {
        shape: "ellipse",
        style: "filled",
        fillcolor: "#FFF59D",
    },
    [flownode_1.FlowNode.EXIT_NODE_TYPE]: {
        shape: "ellipse",
        style: "filled",
        fillcolor: "#FFF59D",
    },
};
/**
 * Edge visual styles by connection type
 */
const EDGE_STYLES = {
    [flownode_1.FlowNode.EXCEPTION_CONNECTION_TYPE]: 'color="#E57373", style="bold", penwidth=2.2, fontsize=12, fontcolor="#D32F2F", label="exception"',
    [flownode_1.FlowNode.TRUE_BRANCH_CONNECTION_TYPE]: 'color="#43A047", penwidth=1.8, fontsize=12, fontcolor="#2E7D32", label="true"',
    [flownode_1.FlowNode.FALSE_BRANCH_CONNECTION_TYPE]: 'color="#E53935", penwidth=1.8, fontsize=12, fontcolor="#C62828", label="false"',
    [flownode_1.FlowNode.NORMAL_CONNECTION_TYPE]: 'color="#9E9E9E", penwidth=1.5, fontsize=12, fontcolor="#424242"',
};
/**
 * Generate a complete DOT graph for all CFG-bearing scopes in a ScopeTree
 */
function generateDot(scopeTree, options = {}) {
    const output = [];
    output.push(`digraph FullGraph {`);
    output.push(`  rankdir=TB;`);
    output.push(`  ranksep=1.2;`);
    output.push(`  nodesep=0.8;`);
    output.push(`  graph [bgcolor="#FAFAFA", splines=true, overlap=false, layout=dot];`);
    output.push(`  node [fontname="Consolas", fontsize=12, style="rounded,filled", color="#424242", width=1.0, height=0.4];`);
    output.push(`  edge [fontname="Consolas", fontsize=12, fontcolor="#424242", arrowsize=0.8];`);
    const edgeSet = new set_1.default();
    const addEdge = (src, dst, attributes) => {
        edgeSet.add(`${src} -> ${dst} [${attributes}];`);
    };
    const cfgScopes = scopeTree
        .getCFGEligibleScopes()
        .filter((s) => Boolean(s.graph));
    // Map every flow node to its owning scope name (first writer wins)
    const nodeScopeMap = new Map();
    cfgScopes.forEach((scope) => {
        var _a, _b;
        const scopeName = scope.name || "Anonymous Scope";
        (_b = (_a = scope.graph) === null || _a === void 0 ? void 0 : _a.allNodes) === null || _b === void 0 ? void 0 : _b.forEach((node) => {
            if (node.cfgId !== undefined && !nodeScopeMap.has(node.cfgId)) {
                nodeScopeMap.set(node.cfgId, scopeName);
            }
        });
    });
    // Group nodes by scope
    const scopeToNodes = new Map();
    cfgScopes.forEach((scope) => {
        var _a, _b;
        (_b = (_a = scope.graph) === null || _a === void 0 ? void 0 : _a.allNodes) === null || _b === void 0 ? void 0 : _b.forEach((node) => {
            const scopeName = nodeScopeMap.get(node.cfgId) || "Global";
            if (!scopeToNodes.has(scopeName)) {
                scopeToNodes.set(scopeName, []);
            }
            scopeToNodes.get(scopeName).push(node);
        });
    });
    let clusterIndex = 0;
    scopeToNodes.forEach((nodes, scopeName) => {
        const clusterId = clusterIndex++;
        output.push(`  subgraph cluster_${clusterId} {`);
        output.push(`    label="${sanitizeString(scopeName)}";`);
        output.push(`    style="filled,rounded";`);
        output.push(`    color="#E0E0E0";`);
        output.push(`    fillcolor="#F5F5F5";`);
        nodes.forEach((node) => {
            const style = NODE_STYLES[node.type] || {
                shape: "box",
                style: "filled,rounded",
                fillcolor: "#FFFFFF",
            };
            const label = sanitizeString(getNodeLabel(node, options.source));
            output.push(`    n${node.cfgId} [label="${label}", shape="${style.shape}", style="${style.style}", fillcolor="${style.fillcolor}"];`);
        });
        output.push(`  }`);
    });
    // Control-flow edges
    cfgScopes.forEach((scope) => {
        var _a, _b;
        (_b = (_a = scope.graph) === null || _a === void 0 ? void 0 : _a.allNodes) === null || _b === void 0 ? void 0 : _b.forEach((node) => {
            flownode_1.FlowNode.CONNECTION_TYPES.forEach((type) => {
                const target = node.typeTable[type];
                if ((target === null || target === void 0 ? void 0 : target.cfgId) !== undefined) {
                    const attrs = EDGE_STYLES[type] || 'color="#9E9E9E", fontsize=12';
                    addEdge(`n${node.cfgId}`, `n${target.cfgId}`, attrs);
                }
            });
        });
    });
    output.push(...Array.from(edgeSet));
    output.push(`}`);
    return output.join("\n");
}
function getNodeLabel(node, source) {
    var _a, _b;
    if (node.label)
        return node.label;
    if (source && ((_a = node.astNode) === null || _a === void 0 ? void 0 : _a.range)) {
        return extractSourceLabel(node.astNode, source);
    }
    return ((_b = node.astNode) === null || _b === void 0 ? void 0 : _b.type) || "Unnamed";
}
function extractSourceLabel(astNode, source) {
    var _a, _b;
    let [start, end] = astNode.range;
    let suffix = "";
    if (astNode.type === "SwitchCase") {
        const test = astNode.test;
        end = test ? test.range[1] : start;
        suffix = test ? ":" : "default:";
    }
    else if (astNode.type === "ForInStatement") {
        end = astNode.right.range[1];
        suffix = ")";
    }
    else if (astNode.type === "CatchClause") {
        end = ((_b = (_a = astNode.param) === null || _a === void 0 ? void 0 : _a.range) === null || _b === void 0 ? void 0 : _b[1]) || end;
        suffix = ")";
    }
    return sanitizeString(source.slice(start, end) + suffix);
}
function sanitizeString(str) {
    return str
        .replace(/\n/g, "\\n")
        .replace(/\t/g, " ")
        .replace(/"/g, '\\"')
        .replace(/\s+/g, " ")
        .trim();
}
