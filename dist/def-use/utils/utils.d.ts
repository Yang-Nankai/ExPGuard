import { FlowNode } from "../../flownode/flownode";
import Scope from "../../scope/scope";
import Def from "../types/def";
import Var from "../types/var";
export type BranchTruth = "TRUE" | "FALSE" | "UNKNOWN";
/**
 * Resolve property name from a node if possible. (soundness)
 * Handles:
 *   - a.b
 *   - a["b"] or a[1]
 *   - a[e] where e resolves to a LiteralDef
 */
export declare function resolvePropName(cfgNode: FlowNode, node: any, computed: boolean): string | null;
/**
 * Check whether a node is a simple value node: Literal or Identifier.
 */
export declare function isSimpleValueNode(node: any): boolean;
/**
 * Extract the value from a simple value node (Literal or Identifier).
 * Returns null if not a simple value node.
 */
export declare function extractSimpleValue(node: any): any;
/**
 * Lookup the first VarDef for a given variable in a specific scope.
 */
export declare function lookupMatchingDef(variableName: string, scope: Scope | null): Def | null;
/**
 * Simple util to set the reaching definition for a variable in a scope.
 */
export declare function setReachingDef(variable: Var, definition: Def): void;
/**
 * Internal helper that performs the actual member lookup logic.
 *
 * This function resolves `object[prop]` access under different
 * static-analysis scenarios:
 *
 * 1. Known property name (e.g., obj.foo)
 * 2. Implicit property set (e.g., obj[index] where index ∈ {a,b,c})
 * 3. Unknown property (e.g., obj[x] where x is unknown)
 */
export declare function performMemberLookup(cfgNode: FlowNode, objectDef: Def, propName: string | null, propDef: Def | null, node: any): Def | null;
/**
 * Evaluate the truthiness of a Def or an expression.
 * Returns true if the expression/def is definitely truthy, false otherwise.
 */
export declare function evaluateDefTruth(def: Def | null): BranchTruth;
/**
 * Evaluate the truthiness of an expression in the context of a FlowNode.
 */
export declare function evaluateBranchTruth(cfgNode: FlowNode, expr: any): BranchTruth;
/**
 * Get feasible successor nodes for a branch node based on AST and analysis.
 */
export declare function getFeasibleSuccessors(node: FlowNode): FlowNode[] | null;
