/**
 * Very simple walker for estree AST
 * Reference: https://github.com/Swatinem/walkes
 */

import { Node } from "acorn";
import * as walk from "acorn-walk";

// ================================
// walkes and checkProps
// ================================

export type RecurseFunction = (node: Node) => void;
export type WalkerFunction = (
  node: Node,
  recurse: RecurseFunction,
  stop: () => never
) => any;
type FunctionTable = Record<string, WalkerFunction>;

/**
 * Walkes the AST and applies the function from the function table to each node.
 * @param astNode astNode to walk
 * @param functionTable function table to apply to each node
 * @param offset offset to limit the recursion to a specific range
 * @returns returns the result of the function applied to the node
 */
function walkes(
  astNode: Node,
  functionTable: FunctionTable,
  offset?: number
): any {
  function stop(): never {
    throw stop;
  }

  const recurse = (astNode: Node): any => {
    if (!astNode || typeof astNode !== "object" || !astNode.type) {
      return astNode;
    }

    // Range-based recursion: only recurse when the astNode is in range
    if (
      offset !== undefined &&
      astNode.range &&
      Array.isArray(astNode.range) &&
      (astNode.range[0] > offset || astNode.range[1] < offset)
    ) {
      return astNode;
    }

    const fn: WalkerFunction =
      functionTable[astNode.type] || functionTable.default || checkProps;
    return fn(astNode, recurse, stop);
  };

  let ret;
  try {
    ret = recurse(astNode);
  } catch (e) {
    if (e !== stop) {
      throw e;
    }
  }
  return ret;
}

/**
 * Checks the properties of the AST node and applies the recursive function to each property.
 * @param node The AST node to check
 * @param recurse recursive function to apply to each property of the node
 * @returns record of the properties of the node
 */
function checkProps(
  node: Node,
  recurse: (node: Node) => any
): Record<string, any> {
  const mapped: Record<string, any> = {};
  Object.keys(node).forEach((key) => {
    if (Object.prototype.hasOwnProperty.call(node, key)) {
      const prop = (node as any)[key];
      mapped[key] = Array.isArray(prop) ? prop.map(recurse) : recurse(prop);
    }
  });
  return mapped;
}

walkes.checkProps = checkProps;

// ================================
// acorn-walk wrappers
// ================================

/**
 * Traverse AST using acorn-walk.simple
 *
 * @param ast - The AST root node
 * @param visitors - An object where keys are node types and values are visitor functions
 * @param state - Optional shared state object passed during traversal
 */
export function traverseSimple(
  ast: Node,
  visitors: Record<string, (node: Node, state?: any) => void>,
  state: any = {}
): void {
  walk.simple(ast, visitors, walk.base, state);
}

/**
 * Traverse AST using acorn-walk.ancestor, allowing access to ancestor nodes.
 *
 * @param ast - The AST root node
 * @param visitors - An object mapping node types to visitor functions
 *                   The visitor receives (node, state, ancestors)
 * @param state - Optional state object
 */
export function traverseAncestor(
  ast: Node,
  visitors: Record<
    string,
    (node: Node, state?: any, ancestors?: Node[]) => void
  >,
  state: any = {}
): void {
  walk.ancestor(ast, visitors, walk.base, state);
}

/**
 * Traverse AST using acorn-walk.full, calling a single callback for every node.
 *
 * @param ast - The AST root node
 * @param callback - A callback executed for every node (node, state, type)
 * @param state - Optional state object
 */
export function traverseFull(
  ast: Node,
  callback: (node: Node, state?: any, type?: string) => void,
  state: any = {}
): void {
  walk.full(ast, callback, walk.base, state);
}

/**
 * Traverse AST using acorn-walk.fullAncestor, where callback gets ancestor array.
 *
 * @param ast - The AST root node
 * @param callback - Function receiving (node, state, ancestors)
 * @param state - Optional shared state object
 */
export function traverseFullAncestor(
  ast: Node,
  callback: (node: Node, state?: any, ancestors?: Node[]) => void,
  state: any = {}
): void {
  walk.fullAncestor(ast, callback, walk.base, state);
}

/**
 * Traverse AST using acorn-walk.recursive, calling a recursive callback for every node.
 *
 * @param ast - The AST root node
 * @param functions - A callback executed for every node (node, state, type)
 * @param state - Optional state object
 */
export function traverseRecursive(
  ast: Node,
  functions: (node: Node, state?: any, type?: string) => void,
  state: any = {}
): void {
  walk.recursive(ast, functions, walk.base, state);
}

// default export of walkes
export default walkes;
