import { Node } from "acorn";
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
 * Generic detector for network requests and sensitive sinks
 *
 * @param ast   JavaScript AST root node
 * @param rules Detection rules (defaults to built-in rules)
 * @returns     List of detected call information
 */
export declare function detectSinks(ast: Node, rules?: NetworkApiRule[]): NetworkCallInfo[];
export {};
