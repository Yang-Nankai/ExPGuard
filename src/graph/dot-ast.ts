import { Node } from "acorn";

export interface AstDotOptions {
  graphName?: string;
  maxLabelLength?: number;
}

interface AstVisualNode {
  id: string;
  label: string;
}

interface AstVisualEdge {
  from: string;
  to: string;
  label: string;
}

const INTERNAL_KEYS = new Set([
  "start",
  "end",
  "range",
  "loc",
  "cfg",
  "parent",
]);

export function generateAstDot(ast: Node, options: AstDotOptions = {}): string {
  const graphName = options.graphName ?? "AST";
  const maxLabelLength = options.maxLabelLength ?? 80;

  const lines: string[] = [];
  const nodes: AstVisualNode[] = [];
  const edges: AstVisualEdge[] = [];
  const visited = new Set<object>();

  let nodeCounter = 0;

  const walk = (current: Node): string => {
    const currentId = `a${nodeCounter++}`;
    const currentLabel = truncateLabel(buildNodeLabel(current), maxLabelLength);

    nodes.push({ id: currentId, label: sanitize(currentLabel) });
    visited.add(current);

    for (const key of Object.keys(current)) {
      if (INTERNAL_KEYS.has(key)) {
        continue;
      }

      const value = (current as unknown as Record<string, unknown>)[key];

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
  lines.push(
    '  graph [bgcolor="#FAFAFA", splines=true, overlap=false, layout=dot];',
  );
  lines.push(
    '  node [shape=box, style="rounded,filled", fillcolor="#FFFDE7", color="#546E7A", fontname="Consolas", fontsize=11];',
  );
  lines.push(
    '  edge [color="#78909C", fontname="Consolas", fontsize=10, arrowsize=0.7];',
  );

  nodes.forEach((node) => {
    lines.push(`  ${node.id} [label="${node.label}"];`);
  });

  edges.forEach((edge) => {
    lines.push(
      `  ${edge.from} -> ${edge.to} [label="${edge.label}", fontcolor="#37474F"];`,
    );
  });

  lines.push("}");
  return lines.join("\n");
}

function isAstNode(value: unknown): value is Node {
  return Boolean(
    value && typeof value === "object" && "type" in (value as Record<string, unknown>),
  );
}

function buildNodeLabel(node: Node): string {
  const withName = node as Node & { name?: string; kind?: string; operator?: string; value?: unknown };

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

function truncateLabel(label: string, maxLength: number): string {
  if (label.length <= maxLength) {
    return label;
  }
  return `${label.slice(0, maxLength - 3)}...`;
}

function sanitize(text: string): string {
  return text
    .replace(/\\/g, "\\\\")
    .replace(/\n/g, "\\n")
    .replace(/"/g, '\\"');
}
