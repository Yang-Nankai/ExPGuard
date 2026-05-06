"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvePropName = resolvePropName;
exports.isSimpleValueNode = isSimpleValueNode;
exports.extractSimpleValue = extractSimpleValue;
exports.lookupMatchingDef = lookupMatchingDef;
exports.setReachingDef = setReachingDef;
exports.performMemberLookup = performMemberLookup;
exports.evaluateDefTruth = evaluateDefTruth;
exports.evaluateBranchTruth = evaluateBranchTruth;
exports.getFeasibleSuccessors = getFeasibleSuccessors;
const defFactory_1 = require("../factories/defFactory");
const expressionTypeHandler_1 = require("../handlers/expressionTypeHandler");
const def_1 = __importDefault(require("../types/def"));
const EXTENSION_ID_REGEX = /^[a-p]{32}$/;
/**
 * Resolve property name from a node if possible. (soundness)
 * Handles:
 *   - a.b
 *   - a["b"] or a[1]
 *   - a[e] where e resolves to a LiteralDef
 */
function resolvePropName(cfgNode, node, computed) {
    if (!node)
        return null;
    if (!computed && isSimpleValueNode(node)) {
        // a.b or { a: 1 }
        return extractSimpleValue(node);
    }
    if (computed) {
        if (node.type === "Literal") {
            // a["b"] or a[1] or { ["a"]: 1 }
            return extractSimpleValue(node);
        }
        else {
            const def = (0, expressionTypeHandler_1.expressionTypeHandler)(cfgNode, node);
            if (def && def_1.default.isLiteralDef(def)) {
                return String(def.value);
            }
        }
    }
    return null;
}
/**
 * Check whether a node is a simple value node: Literal or Identifier.
 */
function isSimpleValueNode(node) {
    if (!node || !node.type)
        return false;
    return node.type === "Literal" || node.type === "Identifier";
}
/**
 * Extract the value from a simple value node (Literal or Identifier).
 * Returns null if not a simple value node.
 */
function extractSimpleValue(node) {
    if (!node || !node.type)
        return null;
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
function lookupMatchingDef(variableName, scope) {
    if (!scope)
        return null;
    const reachInDef = scope.reachIns.get(variableName);
    if (reachInDef)
        return reachInDef;
    let currentScope = scope.parent;
    while (currentScope) {
        const reachInDef = currentScope.lastReachIns.get(variableName);
        if (reachInDef)
            return reachInDef;
        currentScope = currentScope.parent;
    }
    return null;
}
/**
 * Simple util to set the reaching definition for a variable in a scope.
 */
function setReachingDef(variable, definition) {
    if (!variable.scope)
        return;
    variable.scope.setReachingDefinition(variable.name, definition);
}
/**
 * Resolve `propName` on an objectDef (safely look up the
 * property on an object Def).
 */
function resolveMember(objectDef, propName) {
    if (def_1.default.isObjectDef(objectDef)) {
        const lookup = objectDef.lookupProperty(propName);
        return lookup !== null && lookup !== void 0 ? lookup : null;
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
function performMemberLookup(cfgNode, objectDef, propName, propDef, node) {
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
    if (def_1.default.isImplicitDef(propDef)) {
        const results = defFactory_1.defFactory.createImplicitDef(cfgNode);
        propDef.forEach((candidate) => {
            // Only literal values can be used as valid property names
            if (!def_1.default.isLiteralDef(candidate))
                return;
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
    if (def_1.default.isUnknownDef(propDef)) {
        const allValues = getAllPossibleValues(objectDef);
        return defFactory_1.defFactory.createImplicitDef(cfgNode, allValues);
    }
    return null;
}
/**
 * Collect all possible values stored inside an object/array definition.
 *
 * This is used when the property name is completely unknown and the
 * analysis must conservatively assume any property could be accessed.
 */
function getAllPossibleValues(objectDef) {
    if (!def_1.default.isObjectDef(objectDef)) {
        return [];
    }
    // ObjectDef internally stores property values
    return Array.from(objectDef.values);
}
/**
 * Evaluate the truthiness of a Def or an expression.
 * Returns true if the expression/def is definitely truthy, false otherwise.
 */
function evaluateDefTruth(def) {
    if (!def)
        return "UNKNOWN";
    if (def_1.default.isLiteralDef(def))
        return !!def.value ? "TRUE" : "FALSE";
    if (def_1.default.isObjectDef(def))
        return "TRUE"; // conservatively assume objects are truthy
    if (def_1.default.isUndefinedDef(def))
        return "FALSE"; // undefined is falsy
    return "UNKNOWN"; // unknown defs treated as unknown
}
/**
 * Evaluate the truthiness of an expression in the context of a FlowNode.
 */
function evaluateBranchTruth(cfgNode, expr) {
    const def = (0, expressionTypeHandler_1.expressionTypeHandler)(cfgNode, expr);
    return evaluateDefTruth(def);
}
/**
 * Get feasible successor nodes for a branch node based on AST and analysis.
 */
function getFeasibleSuccessors(node) {
    const ast = node.astNode;
    if (!ast)
        return null;
    const parent = node.parent;
    if (parent &&
        ["IfStatement", "ConditionalExpression"].includes(parent.type) &&
        parent.test === ast) {
        const t = evaluateBranchTruth(node, ast);
        if (t === "TRUE" && node.true)
            return [node.true];
        if (t === "FALSE" && node.false)
            return [node.false];
        return null;
    }
    if (ast.type === "SwitchCase" && ast.test) {
        const switchNode = parent;
        if (!switchNode || switchNode.type !== "SwitchStatement")
            return null;
        const disc = (0, expressionTypeHandler_1.expressionTypeHandler)(node, switchNode.discriminant);
        const test = (0, expressionTypeHandler_1.expressionTypeHandler)(node, ast.test);
        if (def_1.default.isLiteralDef(disc) && def_1.default.isLiteralDef(test)) {
            if (disc.value === test.value && node.true)
                return [node.true];
            if (disc.value !== test.value && node.false)
                return [node.false];
        }
        return null;
    }
    return null;
}
