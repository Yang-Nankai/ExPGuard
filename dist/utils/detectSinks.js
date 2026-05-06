"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.detectSinks = detectSinks;
const location_1 = require("./location");
/**
 * Built-in rules for network requests and sensitive APIs
 */
const networkAndSensitiveRules = [
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
    { type: "NewExpression", callee: "Function" }, // new Function(...)
    { type: "CallExpression", callee: "setTimeout" }, // string-based code execution
    { type: "CallExpression", callee: "setInterval" }, // string-based code execution
    { type: "CallExpression", callee: "execScript" }, // IE-specific
    { type: "CallExpression", callee: "exec" }, // child_process.exec
    { type: "CallExpression", callee: "spawn" }, // child_process.spawn
    { type: "CallExpression", callee: "fork" }, // child_process.fork
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
function detectSinks(ast, rules = networkAndSensitiveRules) {
    const results = [];
    function traverse(node) {
        if (!node)
            return;
        if (node.type === "CallExpression" || node.type === "NewExpression") {
            rules.forEach((rule) => {
                if (node.type !== rule.type)
                    return;
                /* ---------- Simple callee: Identifier ---------- */
                if (!rule.callee.includes(".")) {
                    if (node.callee.type === "Identifier" &&
                        node.callee.name === rule.callee) {
                        results.push({
                            type: node.type,
                            callee: rule.callee,
                            loc: (0, location_1.formatLocation)(node),
                        });
                    }
                    return;
                }
                /* ---------- MemberExpression callee ---------- */
                const [objectName, propertyName] = rule.callee.split(".");
                if (node.callee.type === "MemberExpression") {
                    const { object, property } = node.callee;
                    if (object.type === "Identifier" &&
                        object.name === objectName &&
                        property.type === "Identifier" &&
                        property.name === propertyName) {
                        results.push({
                            type: node.type,
                            callee: rule.callee,
                            loc: (0, location_1.formatLocation)(node),
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
            }
            else if (child && typeof child.type === "string") {
                traverse(child);
            }
        }
    }
    traverse(ast);
    return results;
}
