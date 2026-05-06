/**
 * Very simple walker for estree AST
 * Reference: https://github.com/Swatinem/walkes
 */
import { Node } from "acorn";
export type RecurseFunction = (node: Node) => void;
export type WalkerFunction = (node: Node, recurse: RecurseFunction, stop: () => never) => any;
type FunctionTable = Record<string, WalkerFunction>;
/**
 * Walkes the AST and applies the function from the function table to each node.
 * @param astNode astNode to walk
 * @param functionTable function table to apply to each node
 * @param offset offset to limit the recursion to a specific range
 * @returns returns the result of the function applied to the node
 */
declare function walkes(astNode: Node, functionTable: FunctionTable, offset?: number): any;
declare namespace walkes {
    var checkProps: (node: Node, recurse: (node: Node) => any) => Record<string, any>;
}
/**
 * Traverse AST using acorn-walk.simple
 *
 * @param ast - The AST root node
 * @param visitors - An object where keys are node types and values are visitor functions
 * @param state - Optional shared state object passed during traversal
 */
export declare function traverseSimple(ast: Node, visitors: Record<string, (node: Node, state?: any) => void>, state?: any): void;
/**
 * Traverse AST using acorn-walk.ancestor, allowing access to ancestor nodes.
 *
 * @param ast - The AST root node
 * @param visitors - An object mapping node types to visitor functions
 *                   The visitor receives (node, state, ancestors)
 * @param state - Optional state object
 */
export declare function traverseAncestor(ast: Node, visitors: Record<string, (node: Node, state?: any, ancestors?: Node[]) => void>, state?: any): void;
/**
 * Traverse AST using acorn-walk.full, calling a single callback for every node.
 *
 * @param ast - The AST root node
 * @param callback - A callback executed for every node (node, state, type)
 * @param state - Optional state object
 */
export declare function traverseFull(ast: Node, callback: (node: Node, state?: any, type?: string) => void, state?: any): void;
/**
 * Traverse AST using acorn-walk.fullAncestor, where callback gets ancestor array.
 *
 * @param ast - The AST root node
 * @param callback - Function receiving (node, state, ancestors)
 * @param state - Optional shared state object
 */
export declare function traverseFullAncestor(ast: Node, callback: (node: Node, state?: any, ancestors?: Node[]) => void, state?: any): void;
/**
 * Traverse AST using acorn-walk.recursive, calling a recursive callback for every node.
 *
 * @param ast - The AST root node
 * @param functions - A callback executed for every node (node, state, type)
 * @param state - Optional state object
 */
export declare function traverseRecursive(ast: Node, functions: (node: Node, state?: any, type?: string) => void, state?: any): void;
export default walkes;
