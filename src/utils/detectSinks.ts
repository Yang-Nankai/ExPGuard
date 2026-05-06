import { Node } from "acorn";
import { formatLocation } from "./location";

/**
 * Network API detection rule
 *
 * type:
 *   - CallExpression
 *   - NewExpression
 *
 * callee:
 *   Supports plain identifiers or member expressions, e.g.
 *   - 'fetch'
 *   - 'XMLHttpRequest'
 *   - 'axios.get'
 *   - '$.ajax'
 */
interface NetworkApiRule {
  type: "CallExpression" | "NewExpression";
  callee: string;
}

/**
 * Detected network or sensitive call information
 */
export interface NetworkCallInfo {
  type: "CallExpression" | "NewExpression";
  callee: string;
  loc?: string;
}

/**
 * Built-in rules for network requests and sensitive APIs
 */
const networkAndSensitiveRules: NetworkApiRule[] = [
  /* ---------- Browser Network Requests ---------- */
  { type: "CallExpression", callee: "fetch" },
  { type: "NewExpression", callee: "XMLHttpRequest" },
  { type: "CallExpression", callee: "$.get" },
  { type: "CallExpression", callee: "$.post" },
  { type: "CallExpression", callee: "$.ajax" },
  { type: "CallExpression", callee: "axios.get" },
  { type: "CallExpression", callee: "axios.post" },
  { type: "CallExpression", callee: "axios.put" },
  { type: "CallExpression", callee: "axios.delete" },
  { type: "CallExpression", callee: "axios.patch" },
  { type: "CallExpression", callee: "navigator.sendBeacon" },

  /* ---------- Node.js Network Requests ---------- */
  { type: "CallExpression", callee: "http.request" },
  { type: "CallExpression", callee: "https.request" },
  { type: "CallExpression", callee: "got" },
  { type: "CallExpression", callee: "superagent.get" },
  { type: "CallExpression", callee: "superagent.post" },

  /* ---------- WebSocket ---------- */
  { type: "NewExpression", callee: "WebSocket" },

  /* ---------- Server-Sent Events ---------- */
  { type: "NewExpression", callee: "EventSource" },

  /* ---------- Common Sensitive APIs ---------- */
  { type: "CallExpression", callee: "eval" },
  { type: "NewExpression", callee: "Function" },     // new Function(...)
  { type: "CallExpression", callee: "setTimeout" },  // string-based code execution
  { type: "CallExpression", callee: "setInterval" }, // string-based code execution
  { type: "CallExpression", callee: "execScript" },  // IE-specific
  { type: "CallExpression", callee: "exec" },        // child_process.exec
  { type: "CallExpression", callee: "spawn" },       // child_process.spawn
  { type: "CallExpression", callee: "fork" },        // child_process.fork

  /* ---------- Chrome Extension APIs ---------- */
  { type: "CallExpression", callee: "chrome.runtime.sendMessage" },
  { type: "CallExpression", callee: "chrome.runtime.onMessage.addListener" },
];

/**
 * Generic detector for network requests and sensitive sinks
 *
 * @param ast   JavaScript AST root node
 * @param rules Detection rules (defaults to built-in rules)
 * @returns     List of detected call information
 */
export function detectSinks(
  ast: Node,
  rules: NetworkApiRule[] = networkAndSensitiveRules,
): NetworkCallInfo[] {
  const results: NetworkCallInfo[] = [];

  function traverse(node: any): void {
    if (!node) return;

    if (node.type === "CallExpression" || node.type === "NewExpression") {
      rules.forEach((rule) => {
        if (node.type !== rule.type) return;

        /* ---------- Simple callee: Identifier ---------- */
        if (!rule.callee.includes(".")) {
          if (
            node.callee.type === "Identifier" &&
            node.callee.name === rule.callee
          ) {
            results.push({
              type: node.type,
              callee: rule.callee,
              loc: formatLocation(node),
            });
          }
          return;
        }

        /* ---------- MemberExpression callee ---------- */
        const [objectName, propertyName] = rule.callee.split(".");
        if (node.callee.type === "MemberExpression") {
          const { object, property } = node.callee;

          if (
            object.type === "Identifier" &&
            object.name === objectName &&
            property.type === "Identifier" &&
            property.name === propertyName
          ) {
            results.push({
              type: node.type,
              callee: rule.callee,
              loc: formatLocation(node),
            });
          }
        }
      });
    }

    /* ---------- Recursively traverse child nodes ---------- */
    for (const key in node) {
      const child = node[key];
      if (Array.isArray(child)) {
        child.forEach(traverse);
      } else if (child && typeof child.type === "string") {
        traverse(child);
      }
    }
  }

  traverse(ast);
  return results;
}
