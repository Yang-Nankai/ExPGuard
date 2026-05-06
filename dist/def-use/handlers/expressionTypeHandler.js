"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.expressionTypeHandler = expressionTypeHandler;
const taint_1 = require("../../taint");
const interProceduralAnalyzer_1 = require("../analyzers/interProceduralAnalyzer");
const defFactory_1 = require("../factories/defFactory");
const def_1 = __importDefault(require("../types/def"));
const utils_1 = require("../utils/utils");
const classTypeHandler_1 = require("./classTypeHandler");
function expressionTypeHandler(cfgNode, node) {
    if (!node)
        return defFactory_1.defFactory.createUndefinedDef(cfgNode);
    const scope = cfgNode.scope;
    // Dispatcher Map
    const handlers = {
        Literal: () => defFactory_1.defFactory.createLiteralDef(cfgNode, node.value),
        Identifier: () => handleIdentifier(cfgNode, node, scope),
        ObjectExpression: () => handleObjectExpression(cfgNode, node),
        ArrayExpression: () => handleArrayExpression(cfgNode, node),
        FunctionExpression: () => defFactory_1.defFactory.createFunctionDef(cfgNode, node),
        UnaryExpression: () => handleUnary(cfgNode, node, ["+", "-", "!"]),
        UpdateExpression: () => handleUpdateExpression(cfgNode, node),
        BinaryExpression: () => handleBinary(cfgNode, node),
        // Only consider right hand expression
        AssignmentExpression: () => expressionTypeHandler(cfgNode, node.right),
        LogicalExpression: () => handleLogical(cfgNode, node),
        MemberExpression: () => handleMemberExpression(cfgNode, node),
        ConditionalExpression: () => handleConditional(cfgNode, node),
        CallExpression: () => handleCallExpression(cfgNode, node),
        NewExpression: () => handleNewExpression(cfgNode, node),
        ArrowFunctionExpression: () => defFactory_1.defFactory.createFunctionDef(cfgNode, node, false),
        TemplateLiteral: () => handleTemplateLiteral(cfgNode, node),
        ClassExpression: () => (0, classTypeHandler_1.classTypeHandler)(cfgNode, node),
        AwaitExpression: () => handleAwait(cfgNode, node),
        ChainExpression: () => handleChainExpression(cfgNode, node),
        ThisExpression: () => handleThisExpression(cfgNode),
        SequenceExpression: () => handleSequenceExpression(cfgNode, node),
        // YieldExpression: todo
        // TaggedTemplateExpression: not consider
        // MetaProperty: not consider
        // ImportExpression: handle in import analyzer
        // ParenthesizedExpression: not consider
    };
    const handler = handlers[node.type];
    if (handler)
        return handler();
    // default: cannot recognize
    return defFactory_1.defFactory.createUndefinedDef(cfgNode);
}
//===============Helpers====================
/**
 * Get the current valid `this`. Returns null if unavailable,
 * which represents `globalThis`.
 */
function getCurrentThisDef() {
    try {
        const t = interProceduralAnalyzer_1.interAnalyzer.getCurrentThisDef();
        return t !== null && t !== void 0 ? t : null;
    }
    catch (e) {
        return null;
    }
}
//===============Handlers====================
function handleIdentifier(cfgNode, node, scope) {
    // Find the variable definition from reach-ins
    const definedDef = (0, utils_1.lookupMatchingDef)(node.name, scope);
    if (definedDef) {
        const rebased = defFactory_1.DefFactory.rebase(definedDef, cfgNode);
        // TODO: Later will optimize here
        taint_1.taintManager.propagateTaint(definedDef, rebased, node, "ASSIGN", "identifier");
        return rebased;
    }
    return defFactory_1.defFactory.createUnknownDef(cfgNode);
}
function handleObjectExpression(cfgNode, node) {
    // Map to store property name → Def
    const objectDef = defFactory_1.defFactory.createObjectDef(cfgNode);
    // const props = new Map<string, any>();
    const properties = node.properties || [];
    for (const property of properties) {
        if (!property)
            continue;
        if (property.type === "SpreadElement") {
            // handle spread element
            const spreadDef = expressionTypeHandler(cfgNode, property.argument);
            if (def_1.default.isObjectDef(spreadDef)) {
                for (const [k, v] of spreadDef.props) {
                    // props.set(k, v);
                    objectDef.setProperty(k, v);
                }
            }
            // Unknown, not set
        }
        else {
            // handle normal property
            const propName = (0, utils_1.resolvePropName)(cfgNode, property.key, property.computed);
            const valueDef = expressionTypeHandler(cfgNode, property.value);
            if (propName !== null) {
                // props.set(propName, valueDef);
                objectDef.setProperty(propName, valueDef);
            }
            else {
                // fallback, handle {[key], value} where key is unknown
                objectDef.setUnknown(valueDef);
            }
        }
    }
    return objectDef;
}
function handleArrayExpression(cfgNode, node) {
    const elements = node.elements || [];
    const argsDef = [];
    for (const elem of elements) {
        if (!elem)
            continue; // Skip null or empty elements
        if (elem.type === "SpreadElement") {
            // Handle spread elements: [...arr]
            const spreadDef = expressionTypeHandler(cfgNode, elem.argument);
            if (def_1.default.isObjectDef(spreadDef)) {
                // If it's an object (like array), push all its properties
                for (const [, v] of spreadDef.props) {
                    argsDef.push(v);
                }
            }
            else {
                // Unknown type, push a generic unknown definition
                argsDef.push(defFactory_1.defFactory.createUnknownDef(cfgNode));
            }
        }
        else {
            // Handle normal elements
            argsDef.push(expressionTypeHandler(cfgNode, elem));
        }
    }
    return defFactory_1.DefFactory.createArrayInstanceDef(cfgNode, node, argsDef);
}
function handleNewExpression(cfgNode, node) {
    const argsDef = [];
    for (const arg of node.arguments || []) {
        if (arg.type === "SpreadElement") {
            const spreadDef = expressionTypeHandler(cfgNode, arg.argument);
            argsDef.push(...expandSpreadArgument(cfgNode, spreadDef));
        }
        else {
            argsDef.push(expressionTypeHandler(cfgNode, arg));
        }
    }
    const calleeDef = expressionTypeHandler(cfgNode, node.callee);
    // Determine if calleeDef is a function (didn't consider arrow function or other)
    if (def_1.default.isFunctionDef(calleeDef)) {
        return defFactory_1.DefFactory.createClassInstanceDef(calleeDef, cfgNode, node, argsDef);
    }
    // default return objectDef
    return defFactory_1.defFactory.createObjectDef(cfgNode);
}
function handleUnary(cfgNode, node, allowedOps) {
    const { operator, argument } = node;
    // Fast fail
    if (!allowedOps.includes(operator)) {
        return defFactory_1.defFactory.createUnknownDef(cfgNode);
    }
    const argDef = expressionTypeHandler(cfgNode, argument);
    if (!argDef) {
        return defFactory_1.defFactory.createUnknownDef(cfgNode);
    }
    const rebased = defFactory_1.DefFactory.rebase(argDef, cfgNode);
    taint_1.taintManager.propagateTaint(argDef, rebased, node, "ASSIGN", "unary");
    // Only handle literal values
    if (!def_1.default.isLiteralDef(rebased) || rebased.value === null) {
        return rebased;
    }
    const unaryOps = {
        "+": (v) => +v,
        "-": (v) => -v,
        "!": (v) => !v,
    };
    const handler = unaryOps[operator];
    if (handler) {
        rebased.value = handler(rebased.value);
    }
    return rebased;
}
function handleUpdateExpression(cfgNode, node) {
    const argDef = expressionTypeHandler(cfgNode, node.argument);
    if (argDef) {
        const rebased = defFactory_1.DefFactory.rebase(argDef, cfgNode);
        taint_1.taintManager.propagateTaint(argDef, rebased, node, "ASSIGN", "update");
        return rebased;
    }
    return defFactory_1.defFactory.createUnknownDef(cfgNode);
}
function handleLogical(cfgNode, node) {
    const { operator, left, right } = node;
    const leftDef = expressionTypeHandler(cfgNode, left);
    const rightDef = expressionTypeHandler(cfgNode, right);
    let resultDef;
    if (def_1.default.isObjectDef(leftDef)) {
        const lTruth = (0, utils_1.evaluateDefTruth)(leftDef);
        switch (operator) {
            case "&&":
                if (lTruth === "TRUE") {
                    resultDef = defFactory_1.DefFactory.rebase(rightDef, cfgNode);
                }
                else if (lTruth === "FALSE") {
                    resultDef = defFactory_1.DefFactory.rebase(leftDef, cfgNode);
                }
                break;
            case "||":
            case "??": // fallback
                if (lTruth === "FALSE") {
                    resultDef = defFactory_1.DefFactory.rebase(rightDef, cfgNode);
                }
                else if (lTruth === "TRUE") {
                    resultDef = defFactory_1.DefFactory.rebase(leftDef, cfgNode);
                }
        }
    }
    resultDef = resultDef !== null && resultDef !== void 0 ? resultDef : defFactory_1.defFactory.createUnknownDef(cfgNode);
    // Taint propagation
    taint_1.taintManager.propagateTaint(leftDef, resultDef, node, "ASSIGN", "logical-left");
    taint_1.taintManager.propagateTaint(rightDef, resultDef, node, "ASSIGN", "logical-right");
    return resultDef;
}
function handleTemplateLiteral(cfgNode, node) {
    // Initialize the concatenation result and taint state
    let resultValue = "";
    let isAllLiteral = true;
    const components = [];
    // Interleave quasis and expressions according to JS semantics
    const quasis = node.quasis || [];
    const expressions = node.expressions || [];
    for (let i = 0; i < quasis.length; i++) {
        // Handle static text part (TemplateElement)
        const cooked = quasis[i].value.cooked;
        if (resultValue !== null) {
            resultValue += cooked;
        }
        // Handle interpolated expression part (Expression)
        if (i < expressions.length) {
            const expr = expressions[i];
            const eDef = expressionTypeHandler(cfgNode, expr);
            components.push(eDef); // Used later for taint propagation
            // Try to resolve the interpolated value as a literal
            if (isAllLiteral && def_1.default.isLiteralDef(eDef)) {
                resultValue = resultValue + String(eDef.value);
            }
            else {
                // Once any part is not a Literal, the whole cannot be reconstructed as a LiteralDef
                isAllLiteral = false;
                resultValue = null;
            }
        }
    }
    // Create the corresponding Def depending on whether all parts are literals
    let finalDef;
    if (isAllLiteral && resultValue !== null) {
        finalDef = defFactory_1.defFactory.createLiteralDef(cfgNode, resultValue);
    }
    else {
        // If the string cannot be fully reconstructed, create an UnknownDef
        finalDef = defFactory_1.defFactory.createUnknownDef(cfgNode);
    }
    // [Taint Propagation] if any expression in the template is tainted, the result is tainted
    for (const eDef of components) {
        taint_1.taintManager.propagateTaint(eDef, finalDef, node, "ASSIGN", "template-literal");
    }
    return finalDef;
}
function handleConditional(cfgNode, node) {
    const consDef = expressionTypeHandler(cfgNode, node.consequent);
    const altDef = expressionTypeHandler(cfgNode, node.alternate);
    // TODO: Later will be set ImplictDef, now set as consequent
    // const condDef = defFactory.createUnknownDef(cfgNode);
    const condDef = def_1.default.isUnknownDef(consDef) ? altDef : consDef;
    taint_1.taintManager.propagateTaint(consDef, condDef, node.consequent, "ASSIGN", "conditional-consequent");
    taint_1.taintManager.propagateTaint(altDef, condDef, node.alternate, "ASSIGN", "conditional-alternate");
    return condDef;
}
function handleBinary(cfgNode, node) {
    // Only handle common binary operators
    const BINARY_OPERATORS = new Set([
        "==",
        "!=",
        "===",
        "!==",
        "<",
        "<=",
        ">",
        ">=",
        "+",
        "-",
        "*",
        "/",
        "%",
        "|",
        "&",
    ]);
    const BINARY_OPS_MAP = {
        "+": (a, b) => typeof a === "string" || typeof b === "string"
            ? String(a) + String(b)
            : a + b,
        "-": (a, b) => a - b,
        "*": (a, b) => a * b,
        "/": (a, b) => a / b,
        "%": (a, b) => a % b,
        "==": (a, b) => a == b,
        "!=": (a, b) => a != b,
        "===": (a, b) => a === b,
        "!==": (a, b) => a !== b,
        "<": (a, b) => a < b,
        "<=": (a, b) => a <= b,
        ">": (a, b) => a > b,
        ">=": (a, b) => a >= b,
        "|": (a, b) => a | b,
        "&": (a, b) => a & b,
    };
    if (!BINARY_OPERATORS.has(node.operator)) {
        return defFactory_1.defFactory.createUnknownDef(cfgNode);
    }
    const leftDef = expressionTypeHandler(cfgNode, node.left);
    const rightDef = expressionTypeHandler(cfgNode, node.right);
    if (!def_1.default.isLiteralDef(leftDef) || !def_1.default.isLiteralDef(rightDef)) {
        const unknown = defFactory_1.defFactory.createUnknownDef(cfgNode);
        taint_1.taintManager.propagateTaint(leftDef, unknown, node.left, "ASSIGN", "binary-left");
        taint_1.taintManager.propagateTaint(rightDef, unknown, node.right, "ASSIGN", "binary-right");
        return unknown;
    }
    const l = leftDef.value;
    const r = rightDef.value;
    let out;
    try {
        const fn = BINARY_OPS_MAP[node.operator];
        const computed = fn ? fn(l, r) : null;
        if (["string", "number", "boolean"].includes(typeof computed) || computed === null) {
            out = defFactory_1.defFactory.createLiteralDef(cfgNode, computed);
        }
        else {
            out = defFactory_1.defFactory.createUnknownDef(cfgNode);
        }
    }
    catch (_a) {
        out = defFactory_1.defFactory.createUnknownDef(cfgNode);
    }
    taint_1.taintManager.propagateTaint(leftDef, out, node.left, "ASSIGN", "binary-left");
    taint_1.taintManager.propagateTaint(rightDef, out, node.right, "ASSIGN", "binary-right");
    return out;
}
function handleAwait(cfgNode, node) {
    const argumentDef = expressionTypeHandler(cfgNode, node.argument);
    if (def_1.default.isPromiseDef(argumentDef)) {
        // If it is a PromiseDef, return resolvedDef (if it exists) or unknown.
        return argumentDef.resolvedDef || defFactory_1.defFactory.createUnknownDef(cfgNode);
    }
    return argumentDef || defFactory_1.defFactory.createUnknownDef(cfgNode);
}
function handleCallExpression(cfgNode, node) {
    var _a;
    const funcDef = expressionTypeHandler(cfgNode, node.callee);
    const argDefs = [];
    for (const arg of node.arguments || []) {
        if (!arg)
            continue;
        if (arg.type === "SpreadElement") {
            const spreadDef = expressionTypeHandler(cfgNode, arg.argument);
            const expanded = expandSpreadArgument(cfgNode, spreadDef);
            for (const d of expanded) {
                argDefs.push(d);
            }
        }
        else {
            argDefs.push(expressionTypeHandler(cfgNode, arg));
        }
    }
    // Derivate thisDef
    const thisDef = (_a = funcDef === null || funcDef === void 0 ? void 0 : funcDef.__thisObject) !== null && _a !== void 0 ? _a : getCurrentThisDef();
    // User-defined function, handle in inter-procedural
    return interProceduralAnalyzer_1.interAnalyzer.analyze(cfgNode, funcDef, argDefs, thisDef, node);
}
function handleChainExpression(cfgNode, node) {
    if (!node.expression)
        return defFactory_1.defFactory.createUndefinedDef(cfgNode);
    // Directly delegate the processing of the internal expression to expressionTypeHandler.
    return expressionTypeHandler(cfgNode, node.expression);
}
function handleMemberExpression(cfgNode, node) {
    var _a;
    // Resolve object definition via expressionTypeHandler
    const objectDef = expressionTypeHandler(cfgNode, node.object);
    // handle computed property
    const propDef = node.computed
        ? expressionTypeHandler(cfgNode, node.property)
        : null;
    const propName = (0, utils_1.resolvePropName)(cfgNode, node.property, node.computed);
    let resultDef = null;
    // Propagation Rules: If the object itself is ImplicitDef,
    // then perform a property lookup on each element in the collection.
    if (def_1.default.isImplicitDef(objectDef)) {
        resultDef = objectDef.map((innerDef) => {
            return (0, utils_1.performMemberLookup)(cfgNode, innerDef, propName, propDef, node);
        }, cfgNode);
    }
    else {
        // Generation Rules
        resultDef = (0, utils_1.performMemberLookup)(cfgNode, objectDef, propName, propDef, node);
        // Heuristic fallback:
        // For patterns like `window.X.method(...)` where `X` temporarily resolves
        // to a constructor function during callback modeling, also try
        // constructor.prototype.method.
        if (!resultDef && propName && def_1.default.isFunctionDef(objectDef)) {
            const protoMethod = (_a = objectDef.prototypeObject) === null || _a === void 0 ? void 0 : _a.lookupProperty(propName);
            if (protoMethod) {
                resultDef = protoMethod;
            }
        }
    }
    // Lazy fallback: create UnknownDef only if nothing is resolved
    if (!resultDef) {
        resultDef = defFactory_1.defFactory.createUnknownDef(cfgNode);
        // [NEW ADD] Taint Propagation
        if (objectDef.isTainted)
            taint_1.taintManager.propagateTaint(objectDef, resultDef, node, "ELEMENT", "member-element");
    }
    /**
     * Attach hidden this-binding for CallExpression:
     *   a.b()  → this === a
     */
    resultDef.__thisObject = objectDef;
    return resultDef;
}
function handleThisExpression(cfgNode) {
    var _a, _b;
    const thisDef = getCurrentThisDef();
    const globalDef = defFactory_1.defFactory.createGlobalDef(cfgNode, (_a = cfgNode.scopeTree) === null || _a === void 0 ? void 0 : _a.root);
    // If `this` cannot be resolved, treat it as globalThis (unknown)
    return (_b = thisDef !== null && thisDef !== void 0 ? thisDef : globalDef) !== null && _b !== void 0 ? _b : defFactory_1.defFactory.createUnknownDef(cfgNode);
}
function handleSequenceExpression(cfgNode, node) {
    let eDef = null;
    for (const expr of node.expressions) {
        eDef = expressionTypeHandler(cfgNode, expr);
    }
    return eDef !== null && eDef !== void 0 ? eDef : defFactory_1.defFactory.createUnknownDef(cfgNode);
}
function expandSpreadArgument(cfgNode, spreadDef) {
    // Array / TypedArray / Array-like object
    if (def_1.default.isObjectDef(spreadDef)) {
        const result = [];
        for (const [, v] of spreadDef.props) {
            result.push(v);
        }
        return result.length ? result : [spreadDef];
    }
    return [spreadDef];
}
