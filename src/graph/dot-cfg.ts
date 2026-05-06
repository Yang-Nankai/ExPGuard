import { ConnectionType, FlowNode } from "../flownode/flownode";
import Model from "../model/model";
import PageModels from "../model/pageModels";

export interface CfgDotOptions {
  graphName?: string;
  source?: string;
  includeLineCol?: boolean;
}

const NODE_STYLES: Record<string, { shape: string; fillcolor: string }> = {
  [FlowNode.ENTRY_NODE_TYPE]: { shape: "ellipse", fillcolor: "#FFF9C4" },
  [FlowNode.EXIT_NODE_TYPE]: { shape: "ellipse", fillcolor: "#FFE0B2" },
  [FlowNode.NORMAL_NODE_TYPE]: { shape: "box", fillcolor: "#E3F2FD" },
  [FlowNode.BRANCH_NODE_TYPE]: { shape: "diamond", fillcolor: "#FFECB3" },
  [FlowNode.BUILTIN_NODE_TYPE]: { shape: "box", fillcolor: "#D7CCC8" },
};

const EDGE_STYLES: Record<ConnectionType, string> = {
  [FlowNode.NORMAL_CONNECTION_TYPE]:
    'color="#90A4AE", penwidth=1.5, fontcolor="#455A64", label="normal"',
  [FlowNode.TRUE_BRANCH_CONNECTION_TYPE]:
    'color="#43A047", penwidth=1.8, fontcolor="#2E7D32", label="true"',
  [FlowNode.FALSE_BRANCH_CONNECTION_TYPE]:
    'color="#E53935", penwidth=1.8, fontcolor="#B71C1C", label="false"',
  [FlowNode.EXCEPTION_CONNECTION_TYPE]:
    'color="#8E24AA", style="bold", penwidth=2.0, fontcolor="#6A1B9A", label="exception"',
};

export function generateCfgDot(pageModels: PageModels, options: CfgDotOptions = {}): string {
  const lines: string[] = [];
  const graphName = options.graphName ?? "CFG";
  const includeLineCol = options.includeLineCol ?? true;

  lines.push(`digraph ${sanitize(graphName)} {`);
  lines.push("  rankdir=TB;");
  lines.push("  nodesep=0.6;");
  lines.push("  ranksep=0.9;");
  lines.push(
    '  graph [bgcolor="#FAFAFA", splines=true, overlap=false, layout=dot];',
  );
  lines.push(
    '  node [style="rounded,filled", color="#455A64", fontname="Consolas", fontsize=11];',
  );
  lines.push(
    '  edge [fontname="Consolas", fontsize=10, arrowsize=0.75, color="#78909C"];',
  );

  const models = getAllModels(pageModels);
  const nodes = collectAllNodes(models).sort(
    (a, b) => (a.cfgId ?? Number.MAX_SAFE_INTEGER) - (b.cfgId ?? Number.MAX_SAFE_INTEGER),
  );

  nodes.forEach((node) => {
    const style = NODE_STYLES[node.type] ?? {
      shape: "box",
      fillcolor: "#FFFFFF",
    };

    const label = getNodeLabel(node, options.source, includeLineCol);
    const nodeId = getNodeId(node);

    lines.push(
      `  ${nodeId} [label="${sanitize(label)}", shape="${style.shape}", fillcolor="${style.fillcolor}"];`,
    );
  });

  const edgeSet = new Set<string>();

  nodes.forEach((node) => {
    const fromId = getNodeId(node);

    FlowNode.CONNECTION_TYPES.forEach((connectionType) => {
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

function getNodeId(node: FlowNode): string {
  return `n${node.cfgId ?? "unknown"}`;
}

function getAllModels(pageModels: PageModels): Model[] {
  return [
    ...pageModels.intraProceduralModels,
    ...pageModels.interProceduralModels,
  ];
}

function collectAllNodes(models: Model[]): FlowNode[] {
  const nodeMap = new Map<number | string, FlowNode>();

  models.forEach((model) => {
    model.graph?.allNodes.forEach((node) => {
      const key = node.cfgId ?? `unknown-${node.type}-${node.line ?? -1}-${node.col ?? -1}`;
      if (!nodeMap.has(key)) {
        nodeMap.set(key, node);
      }
    });
  });

  return Array.from(nodeMap.values());
}

function getNodeLabel(node: FlowNode, _source?: string, includeLineCol = true): string {
  const parts: string[] = [];

  const baseLabel =
    node.astNode?.type ||
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

function sanitize(text: string): string {
  return text
    .replace(/\\/g, "\\\\")
    .replace(/\n/g, "\\n")
    .replace(/"/g, '\\"')
    .replace(/\s+/g, " ")
    .trim();
}
