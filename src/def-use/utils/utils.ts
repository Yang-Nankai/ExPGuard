import { FlowNode } from "../../flownode/flownode";
import Scope from "../../scope/scope";
import { defFactory } from "../factories/defFactory";
import { expressionTypeHandler } from "../handlers/expressionTypeHandler";
import Def from "../types/def";
import Var from "../types/var";

const EXTENSION_ID_REGEX = /^[a-p]{32}$/;
export type BranchTruth = "TRUE" | "FALSE" | "UNKNOWN";

/**
 * Resolve property name from a node if possible. (soundness)
 * Handles:
 *   - a.b
 *   - a["b"] or a[1]
 *   - a[e] where e resolves to a LiteralDef
 */
export function resolvePropName(
  cfgNode: FlowNode,
  node: any,
  computed: boolean,
): string | null {
  if (!node) return null;

  if (!computed && isSimpleValueNode(node)) {
    // a.b or { a: 1 }
    return extractSimpleValue(node);
  }

  if (computed) {
    if (node.type === "Literal") {
      // a["b"] or a[1] or { ["a"]: 1 }
      return extractSimpleValue(node);
    } else {
      const def = expressionTypeHandler(cfgNode, node);
      if (def && Def.isLiteralDef(def)) {
        return String(def.value);
      }
    }
  }

  return null;
}

/**
 * Check whether a node is a simple value node: Literal or Identifier.
 */
export function isSimpleValueNode(node: any): boolean {
  if (!node || !node.type) return false;
  return node.type === "Literal" || node.type === "Identifier";
}

/**
 * Extract the value from a simple value node (Literal or Identifier).
 * Returns null if not a simple value node.
 */
export function extractSimpleValue(node: any): any {
  if (!node || !node.type) return null;

  switch (node.type) {
    case "Literal":
      return String(node.value);
    case "Identifier":
      return node.name;
    default:
      return null;
  }
}

/**
 * Lookup the first VarDef for a given variable in a specific scope.
 */
export function lookupMatchingDef(
  variableName: string,
  scope: Scope | null,
): Def | null {
  if (!scope) return null;

  const reachInDef = scope.reachIns.get(variableName);
  if (reachInDef) return reachInDef;

  let currentScope: Scope | null = scope.parent;
  while (currentScope) {
    const reachInDef = currentScope.lastReachIns.get(variableName);
    if (reachInDef) return reachInDef;
    currentScope = currentScope.parent;
  }

  return null;
}

/**
 * Simple util to set the reaching definition for a variable in a scope.
 */
export function setReachingDef(variable: Var, definition: Def) {
  if (!variable.scope) return;
  variable.scope.setReachingDefinition(variable.name, definition);
}

/**
 * Resolve `propName` on an objectDef (safely look up the
 * property on an object Def).
 */
function resolveMember(objectDef: Def | null, propName: string) {
  if (Def.isObjectDef(objectDef)) {
    const lookup = objectDef.lookupProperty(propName);
    return lookup ?? null;
  }
  return null;
}

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
export function performMemberLookup(
  cfgNode: FlowNode,
  objectDef: Def,
  propName: string | null,
  propDef: Def | null,
  node: any,
): Def | null {
  // ------------------------------------------------------------
  // A. Known property access (e.g., obj.foo)
  // ------------------------------------------------------------
  if (propName) {
    return resolveMember(objectDef, propName);
  }

  // If this is not a computed property access, no further resolution is possible.
  if (!node.computed || !propDef) {
    return null;
  }

  // ------------------------------------------------------------
  // B. Implicit property set
  // Example: obj[index] where index ∈ { "a", "b", "c" }
  // ------------------------------------------------------------
  if (Def.isImplicitDef(propDef)) {
    const results = defFactory.createImplicitDef(cfgNode);

    propDef.forEach((candidate) => {
      // Only literal values can be used as valid property names
      if (!Def.isLiteralDef(candidate)) return;

      const value = resolveMember(objectDef, String(candidate.value));
      if (value) {
        results.add(value);
      }
    });

    return results;
  }

  // ------------------------------------------------------------
  // C. Fully unknown property access
  // Example: obj[x] where x is completely unknown
  // ------------------------------------------------------------
  if (Def.isUnknownDef(propDef)) {
    const allValues = getAllPossibleValues(objectDef);
    return defFactory.createImplicitDef(cfgNode, allValues);
  }

  return null;
}

/**
 * Collect all possible values stored inside an object/array definition.
 *
 * This is used when the property name is completely unknown and the
 * analysis must conservatively assume any property could be accessed.
 */
function getAllPossibleValues(objectDef: Def): Def[] {
  if (!Def.isObjectDef(objectDef)) {
    return [];
  }

  // ObjectDef internally stores property values
  return Array.from(objectDef.values);
}

/**
 * Evaluate the truthiness of a Def or an expression.
 * Returns true if the expression/def is definitely truthy, false otherwise.
 */
export function evaluateDefTruth(def: Def | null): BranchTruth {
  if (!def) return "UNKNOWN";

  if (Def.isLiteralDef(def)) return !!def.value ? "TRUE" : "FALSE";
  if (Def.isObjectDef(def)) return "TRUE"; // conservatively assume objects are truthy
  if (Def.isUndefinedDef(def)) return "FALSE"; // undefined is falsy

  return "UNKNOWN"; // unknown defs treated as unknown
}

/**
 * Evaluate the truthiness of an expression in the context of a FlowNode.
 */
export function evaluateBranchTruth(cfgNode: FlowNode, expr: any): BranchTruth {
  const def = expressionTypeHandler(cfgNode, expr);
  return evaluateDefTruth(def);
}

/**
 * Get feasible successor nodes for a branch node based on AST and analysis.
 */
export function getFeasibleSuccessors(node: FlowNode): FlowNode[] | null {
  const ast: any = node.astNode;
  if (!ast) return null;

  const parent: any = node.parent;

  if (
    parent &&
    ["IfStatement", "ConditionalExpression"].includes(parent.type) &&
    parent.test === ast
  ) {
    const t = evaluateBranchTruth(node, ast);
    if (t === "TRUE" && node.true) return [node.true];
    if (t === "FALSE" && node.false) return [node.false];
    return null;
  }

  if (ast.type === "SwitchCase" && ast.test) {
    const switchNode: any = parent;
    if (!switchNode || switchNode.type !== "SwitchStatement") return null;

    const disc = expressionTypeHandler(node, switchNode.discriminant);
    const test = expressionTypeHandler(node, ast.test);

    if (Def.isLiteralDef(disc) && Def.isLiteralDef(test)) {
      if (disc.value === test.value && node.true) return [node.true];
      if (disc.value !== test.value && node.false) return [node.false];
    }

    return null;
  }

  return null;
}
