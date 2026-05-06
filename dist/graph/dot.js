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
 * Generate a complete DOT graph for all page models
 */
function generateDot(pageModels, options = {}) {
    const output = [];
    /* ================= Graph Header ================= */
    output.push(`digraph FullGraph {`);
    output.push(`  rankdir=TB;`);
    output.push(`  ranksep=1.2;`);
    output.push(`  nodesep=0.8;`);
    output.push(`  graph [bgcolor="#FAFAFA", splines=true, overlap=false, layout=dot];`);
    output.push(`  node [fontname="Consolas", fontsize=12, style="rounded,filled", color="#424242", width=1.0, height=0.4];`);
    output.push(`  edge [fontname="Consolas", fontsize=12, fontcolor="#424242", arrowsize=0.8];`);
    /* ================= Edge Deduplication ================= */
    const edgeSet = new set_1.default();
    const addEdge = (src, dst, attributes) => {
        edgeSet.add(`${src} -> ${dst} [${attributes}];`);
    };
    /* ================= Node → Scope Mapping ================= */
    const nodeScopeMap = new Map();
    pageModels.intraProceduralModels.forEach((model) => {
        var _a, _b, _c;
        const scopeName = ((_a = model.mainlyRelatedScope) === null || _a === void 0 ? void 0 : _a.name) || "Anonymous Scope";
        (_c = (_b = model.graph) === null || _b === void 0 ? void 0 : _b.allNodes) === null || _c === void 0 ? void 0 : _c.forEach((node) => {
            nodeScopeMap.set(node.cfgId, scopeName);
        });
    });
    pageModels.interProceduralModels.forEach((model) => {
        var _a, _b, _c;
        const scopeName = ((_a = model.mainlyRelatedScope) === null || _a === void 0 ? void 0 : _a.name) || "Anonymous Scope";
        (_c = (_b = model.graph) === null || _b === void 0 ? void 0 : _b.allNodes) === null || _c === void 0 ? void 0 : _c.forEach((node) => {
            if (!nodeScopeMap.has(node.cfgId)) {
                nodeScopeMap.set(node.cfgId, scopeName);
            }
        });
    });
    /* ================= Group Nodes by Scope ================= */
    const scopeToNodes = new Map();
    const allNodes = [];
    pageModels.intraProceduralModels.forEach((model) => {
        var _a;
        ((_a = model.graph) === null || _a === void 0 ? void 0 : _a.allNodes) && allNodes.push(...model.graph.allNodes);
    });
    pageModels.interProceduralModels.forEach((model) => {
        var _a;
        ((_a = model.graph) === null || _a === void 0 ? void 0 : _a.allNodes) && allNodes.push(...model.graph.allNodes);
    });
    allNodes.forEach((node) => {
        const scopeName = nodeScopeMap.get(node.cfgId) || "Global";
        if (!scopeToNodes.has(scopeName)) {
            scopeToNodes.set(scopeName, []);
        }
        scopeToNodes.get(scopeName).push(node);
    });
    /* ================= Generate Subgraphs ================= */
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
    /* ================= Control Flow Edges ================= */
    const processModelEdges = (model) => {
        var _a, _b;
        (_b = (_a = model.graph) === null || _a === void 0 ? void 0 : _a.allNodes) === null || _b === void 0 ? void 0 : _b.forEach((node) => {
            flownode_1.FlowNode.CONNECTION_TYPES.forEach((type) => {
                const targets = node.typeTable[type]
                    ? [node.typeTable[type]]
                    : [];
                targets.forEach((target) => {
                    if ((target === null || target === void 0 ? void 0 : target.cfgId) !== undefined) {
                        const attrs = EDGE_STYLES[type] ||
                            'color="#9E9E9E", fontsize=12';
                        addEdge(`n${node.cfgId}`, `n${target.cfgId}`, attrs);
                    }
                });
            });
        });
    };
    pageModels.intraProceduralModels.forEach(processModelEdges);
    pageModels.interProceduralModels.forEach(processModelEdges);
    /* ================= Def-Use Data Flow Edges ================= */
    const addDUEdges = (dupairsMap) => {
        dupairsMap.forEach((pairs, variable) => {
            pairs.values().forEach((pair) => {
                var _a, _b;
                if (((_a = pair.first) === null || _a === void 0 ? void 0 : _a.cfgId) !== undefined &&
                    ((_b = pair.second) === null || _b === void 0 ? void 0 : _b.cfgId) !== undefined) {
                    addEdge(`n${pair.first.cfgId}`, `n${pair.second.cfgId}`, `color="#43A047", style="dashed", penwidth=1.5, fontsize=12, fontcolor="#1B5E20", label="DU: ${sanitizeString(variable.name)}"`);
                }
            });
        });
    };
    pageModels.intraProceduralModels.forEach((m) => addDUEdges(m.dupairs));
    pageModels.interProceduralModels.forEach((m) => addDUEdges(m.dupairs));
    /* ================= Final Output ================= */
    output.push(...Array.from(edgeSet));
    output.push(`}`);
    return output.join("\n");
}
/* ================= Utility Functions ================= */
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
