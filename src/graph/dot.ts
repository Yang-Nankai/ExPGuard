import { BaseNode, CatchClause, ForInStatement, SwitchCase } from "estree";
import { ConnectionType, FlowNode } from "../flownode/flownode";
import ScopeTree from "../scope/scopeTree";
import Scope from "../scope/scope";
import Set from "../utils/set";

export interface DotOptions {
  counter?: number;
  source?: string;
}

/**
 * Node visual styles in DOT graph
 */
const NODE_STYLES: Record<
  string,
  { shape: string; style: string; fillcolor: string }
> = {
  [FlowNode.ENTRY_NODE_TYPE]: {
    shape: "ellipse",
    style: "filled",
    fillcolor: "#FFF59D",
  },
  [FlowNode.EXIT_NODE_TYPE]: {
    shape: "ellipse",
    style: "filled",
    fillcolor: "#FFF59D",
  },
};

/**
 * Edge visual styles by connection type
 */
const EDGE_STYLES: Record<ConnectionType, string> = {
  [FlowNode.EXCEPTION_CONNECTION_TYPE]:
    'color="#E57373", style="bold", penwidth=2.2, fontsize=12, fontcolor="#D32F2F", label="exception"',

  [FlowNode.TRUE_BRANCH_CONNECTION_TYPE]:
    'color="#43A047", penwidth=1.8, fontsize=12, fontcolor="#2E7D32", label="true"',

  [FlowNode.FALSE_BRANCH_CONNECTION_TYPE]:
    'color="#E53935", penwidth=1.8, fontsize=12, fontcolor="#C62828", label="false"',

  [FlowNode.NORMAL_CONNECTION_TYPE]:
    'color="#9E9E9E", penwidth=1.5, fontsize=12, fontcolor="#424242"',
};

/**
 * Generate a complete DOT graph for all CFG-bearing scopes in a ScopeTree
 */
export default function generateDot(
  scopeTree: ScopeTree,
  options: DotOptions = {},
): string {
  const output: string[] = [];

  output.push(`digraph FullGraph {`);
  output.push(`  rankdir=TB;`);
  output.push(`  ranksep=1.2;`);
  output.push(`  nodesep=0.8;`);
  output.push(
    `  graph [bgcolor="#FAFAFA", splines=true, overlap=false, layout=dot];`,
  );
  output.push(
    `  node [fontname="Consolas", fontsize=12, style="rounded,filled", color="#424242", width=1.0, height=0.4];`,
  );
  output.push(
    `  edge [fontname="Consolas", fontsize=12, fontcolor="#424242", arrowsize=0.8];`,
  );

  const edgeSet = new Set<string>();

  const addEdge = (src: string, dst: string, attributes: string) => {
    edgeSet.add(`${src} -> ${dst} [${attributes}];`);
  };

  const cfgScopes = scopeTree
    .getCFGEligibleScopes()
    .filter((s) => Boolean(s.graph));

  // Map every flow node to its owning scope name (first writer wins)
  const nodeScopeMap = new Map<number, string>();
  cfgScopes.forEach((scope) => {
    const scopeName = scope.name || "Anonymous Scope";
    scope.graph?.allNodes?.forEach((node) => {
      if (node.cfgId !== undefined && !nodeScopeMap.has(node.cfgId)) {
        nodeScopeMap.set(node.cfgId, scopeName);
      }
    });
  });

  // Group nodes by scope
  const scopeToNodes = new Map<string, FlowNode[]>();
  cfgScopes.forEach((scope) => {
    scope.graph?.allNodes?.forEach((node) => {
      const scopeName = nodeScopeMap.get(node.cfgId!) || "Global";
      if (!scopeToNodes.has(scopeName)) {
        scopeToNodes.set(scopeName, []);
      }
      scopeToNodes.get(scopeName)!.push(node);
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
      const style =
        NODE_STYLES[node.type] || {
          shape: "box",
          style: "filled,rounded",
          fillcolor: "#FFFFFF",
        };

      const label = sanitizeString(getNodeLabel(node, options.source));

      output.push(
        `    n${node.cfgId} [label="${label}", shape="${style.shape}", style="${style.style}", fillcolor="${style.fillcolor}"];`,
      );
    });

    output.push(`  }`);
  });

  // Control-flow edges
  cfgScopes.forEach((scope) => {
    scope.graph?.allNodes?.forEach((node: FlowNode) => {
      FlowNode.CONNECTION_TYPES.forEach((type) => {
        const target = node.typeTable[type];
        if (target?.cfgId !== undefined) {
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

function getNodeLabel(node: FlowNode, source?: string): string {
  if (node.label) return node.label;
  if (source && node.astNode?.range) {
    return extractSourceLabel(node.astNode, source);
  }
  return node.astNode?.type || "Unnamed";
}

function extractSourceLabel(astNode: BaseNode, source: string): string {
  let [start, end] = astNode.range!;
  let suffix = "";

  if (astNode.type === "SwitchCase") {
    const test = (astNode as SwitchCase).test;
    end = test ? test.range![1] : start;
    suffix = test ? ":" : "default:";
  } else if (astNode.type === "ForInStatement") {
    end = (astNode as ForInStatement).right.range![1];
    suffix = ")";
  } else if (astNode.type === "CatchClause") {
    end = (astNode as CatchClause).param?.range?.[1] || end;
    suffix = ")";
  }

  return sanitizeString(source.slice(start, end) + suffix);
}

function sanitizeString(str: string): string {
  return str
    .replace(/\n/g, "\\n")
    .replace(/\t/g, " ")
    .replace(/"/g, '\\"')
    .replace(/\s+/g, " ")
    .trim();
}
