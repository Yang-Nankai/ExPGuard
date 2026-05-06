import { FlowNode } from "../../flownode/flownode";
import Scope from "../../scope/scope";
import { taintManager as tm } from "../../taint";
import { interAnalyzer } from "../analyzers/interProceduralAnalyzer";
import { DefFactory, defFactory } from "../factories/defFactory";
import Def from "../types/def";
import {
  evaluateDefTruth,
  lookupMatchingDef,
  performMemberLookup,
  resolvePropName,
} from "../utils/utils";
import { classTypeHandler } from "./classTypeHandler";

export function expressionTypeHandler(cfgNode: FlowNode, node: any): Def {
  if (!node) return defFactory.createUndefinedDef(cfgNode);

  const scope = cfgNode.scope!;

  // Dispatcher Map
  const handlers: Record<string, () => any> = {
    Literal: () => defFactory.createLiteralDef(cfgNode, node.value),
    Identifier: () => handleIdentifier(cfgNode, node, scope),
    ObjectExpression: () => handleObjectExpression(cfgNode, node),
    ArrayExpression: () => handleArrayExpression(cfgNode, node),
    FunctionExpression: () => defFactory.createFunctionDef(cfgNode, node),
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
    ArrowFunctionExpression: () =>
      defFactory.createFunctionDef(cfgNode, node, false),
    TemplateLiteral: () => handleTemplateLiteral(cfgNode, node),
    ClassExpression: () => classTypeHandler(cfgNode, node),
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
  if (handler) return handler();

  // default: cannot recognize
  return defFactory.createUndefinedDef(cfgNode);
}

//===============Helpers====================

/**
 * Get the current valid `this`. Returns null if unavailable,
 * which represents `globalThis`.
 */
function getCurrentThisDef(): Def | null {
  try {
    const t = interAnalyzer.getCurrentThisDef();
    return t ?? null;
  } catch (e) {
    return null;
  }
}

//===============Handlers====================
function handleIdentifier(cfgNode: FlowNode, node: any, scope: Scope) {
  // Find the variable definition from reach-ins
  const definedDef = lookupMatchingDef(node.name, scope);
  if (definedDef) {
    const rebased = DefFactory.rebase(definedDef, cfgNode);
    // TODO: Later will optimize here
    tm.propagateTaint(definedDef, rebased, node, "ASSIGN", "identifier");
    return rebased;
  }
  return defFactory.createUnknownDef(cfgNode);
}

function handleObjectExpression(cfgNode: FlowNode, node: any) {
  // Map to store property name → Def
  const objectDef = defFactory.createObjectDef(cfgNode);
  // const props = new Map<string, any>();
  const properties = node.properties || [];

  for (const property of properties) {
    if (!property) continue;

    if (property.type === "SpreadElement") {
      // handle spread element
      const spreadDef = expressionTypeHandler(cfgNode, property.argument);

      if (Def.isObjectDef(spreadDef)) {
        for (const [k, v] of spreadDef.props) {
          // props.set(k, v);
          objectDef.setProperty(k, v);
        }
      }
      // Unknown, not set
    } else {
      // handle normal property
      const propName = resolvePropName(
        cfgNode,
        property.key,
        property.computed,
      );
      const valueDef = expressionTypeHandler(cfgNode, property.value);
      if (propName !== null) {
        // props.set(propName, valueDef);
        objectDef.setProperty(propName, valueDef);
      } else {
        // fallback, handle {[key], value} where key is unknown
        objectDef.setUnknown(valueDef);
      }
    }
  }

  return objectDef;
}

function handleArrayExpression(cfgNode: FlowNode, node: any) {
  const elements = node.elements || [];
  const argsDef: Def[] = [];

  for (const elem of elements) {
    if (!elem) continue; // Skip null or empty elements

    if (elem.type === "SpreadElement") {
      // Handle spread elements: [...arr]
      const spreadDef = expressionTypeHandler(cfgNode, elem.argument);

      if (Def.isObjectDef(spreadDef)) {
        // If it's an object (like array), push all its properties
        for (const [, v] of spreadDef.props) {
          argsDef.push(v);
        }
      } else {
        // Unknown type, push a generic unknown definition
        argsDef.push(defFactory.createUnknownDef(cfgNode));
      }
    } else {
      // Handle normal elements
      argsDef.push(expressionTypeHandler(cfgNode, elem));
    }
  }

  return DefFactory.createArrayInstanceDef(cfgNode, node, argsDef);
}

function handleNewExpression(cfgNode: FlowNode, node: any) {
  const argsDef: Def[] = [];
  for (const arg of node.arguments || []) {
    if (arg.type === "SpreadElement") {
      const spreadDef = expressionTypeHandler(cfgNode, arg.argument);
      argsDef.push(...expandSpreadArgument(cfgNode, spreadDef));
    } else {
      argsDef.push(expressionTypeHandler(cfgNode, arg));
    }
  }

  const calleeDef = expressionTypeHandler(cfgNode, node.callee);

  // Determine if calleeDef is a function (didn't consider arrow function or other)
  if (Def.isFunctionDef(calleeDef)) {
    return DefFactory.createClassInstanceDef(calleeDef, cfgNode, node, argsDef);
  }

  // default return objectDef
  return defFactory.createObjectDef(cfgNode);
}

function handleUnary(cfgNode: FlowNode, node: any, allowedOps: string[]) {
  const { operator, argument } = node;

  // Fast fail
  if (!allowedOps.includes(operator)) {
    return defFactory.createUnknownDef(cfgNode);
  }

  const argDef = expressionTypeHandler(cfgNode, argument);
  if (!argDef) {
    return defFactory.createUnknownDef(cfgNode);
  }

  const rebased = DefFactory.rebase(argDef, cfgNode);

  tm.propagateTaint(argDef, rebased, node, "ASSIGN", "unary");

  // Only handle literal values
  if (!Def.isLiteralDef(rebased) || rebased.value === null) {
    return rebased;
  }

  const unaryOps: Record<string, (v: any) => any> = {
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

function handleUpdateExpression(cfgNode: FlowNode, node: any) {
  const argDef = expressionTypeHandler(cfgNode, node.argument);
  if (argDef) {
    const rebased = DefFactory.rebase(argDef, cfgNode);
    tm.propagateTaint(argDef, rebased, node, "ASSIGN", "update");
    return rebased;
  }
  return defFactory.createUnknownDef(cfgNode);
}

function handleLogical(cfgNode: FlowNode, node: any) {
  const { operator, left, right } = node;

  const leftDef = expressionTypeHandler(cfgNode, left);
  const rightDef = expressionTypeHandler(cfgNode, right);

  let resultDef: Def | undefined;

  if (Def.isObjectDef(leftDef)) {
    const lTruth = evaluateDefTruth(leftDef);
    switch (operator) {
      case "&&":
        if (lTruth === "TRUE") {
          resultDef = DefFactory.rebase(rightDef, cfgNode);
        }
        else if (lTruth === "FALSE") {
          resultDef = DefFactory.rebase(leftDef, cfgNode);
        }
        break;
      case "||":
      case "??": // fallback
        if (lTruth === "FALSE") {
          resultDef = DefFactory.rebase(rightDef, cfgNode);
        }
        else if (lTruth === "TRUE") {
          resultDef = DefFactory.rebase(leftDef, cfgNode);
        }
    }
  }

  resultDef = resultDef ?? defFactory.createUnknownDef(cfgNode);

  // Taint propagation
  tm.propagateTaint(leftDef, resultDef, node, "ASSIGN", "logical-left");
  tm.propagateTaint(rightDef, resultDef, node, "ASSIGN", "logical-right");

  return resultDef;
}

function handleTemplateLiteral(cfgNode: FlowNode, node: any) {
  // Initialize the concatenation result and taint state
  let resultValue: string | null = "";
  let isAllLiteral = true;
  const components: Def[] = [];

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
      if (isAllLiteral && Def.isLiteralDef(eDef)) {
        resultValue = resultValue! + String(eDef.value);
      } else {
        // Once any part is not a Literal, the whole cannot be reconstructed as a LiteralDef
        isAllLiteral = false;
        resultValue = null;
      }
    }
  }

  // Create the corresponding Def depending on whether all parts are literals
  let finalDef: Def;
  if (isAllLiteral && resultValue !== null) {
    finalDef = defFactory.createLiteralDef(cfgNode, resultValue);
  } else {
    // If the string cannot be fully reconstructed, create an UnknownDef
    finalDef = defFactory.createUnknownDef(cfgNode);
  }

  // [Taint Propagation] if any expression in the template is tainted, the result is tainted
  for (const eDef of components) {
    tm.propagateTaint(eDef, finalDef, node, "ASSIGN", "template-literal");
  }

  return finalDef;
}

function handleConditional(cfgNode: FlowNode, node: any) {
  const consDef = expressionTypeHandler(cfgNode, node.consequent);
  const altDef = expressionTypeHandler(cfgNode, node.alternate);
  // TODO: Later will be set ImplictDef, now set as consequent
  // const condDef = defFactory.createUnknownDef(cfgNode);
  const condDef = Def.isUnknownDef(consDef) ? altDef : consDef;

  tm.propagateTaint(
    consDef,
    condDef,
    node.consequent,
    "ASSIGN",
    "conditional-consequent",
  );
  tm.propagateTaint(
    altDef,
    condDef,
    node.alternate,
    "ASSIGN",
    "conditional-alternate",
  );
  return condDef;
}

function handleBinary(cfgNode: FlowNode, node: any) {
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

  const BINARY_OPS_MAP: Record<string, (a: any, b: any) => any> = {
    "+": (a, b) =>
      typeof a === "string" || typeof b === "string"
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
    return defFactory.createUnknownDef(cfgNode);
  }

  const leftDef = expressionTypeHandler(cfgNode, node.left);
  const rightDef = expressionTypeHandler(cfgNode, node.right);

  if (!Def.isLiteralDef(leftDef) || !Def.isLiteralDef(rightDef)) {
    const unknown = defFactory.createUnknownDef(cfgNode);
    tm.propagateTaint(leftDef, unknown, node.left, "ASSIGN", "binary-left");
    tm.propagateTaint(rightDef, unknown, node.right, "ASSIGN", "binary-right");
    return unknown;
  }

  const l = leftDef.value;
  const r = rightDef.value;
  let out: Def;

  try {
    const fn = BINARY_OPS_MAP[node.operator];
    const computed = fn ? fn(l, r) : null;

    if (["string", "number", "boolean"].includes(typeof computed) || computed === null) {
      out = defFactory.createLiteralDef(cfgNode, computed);
    } else {
      out = defFactory.createUnknownDef(cfgNode);
    }
  } catch {
    out = defFactory.createUnknownDef(cfgNode);
  }

  tm.propagateTaint(leftDef, out, node.left, "ASSIGN", "binary-left");
  tm.propagateTaint(rightDef, out, node.right, "ASSIGN", "binary-right");

  return out;
}

function handleAwait(cfgNode: FlowNode, node: any) {
  const argumentDef = expressionTypeHandler(cfgNode, node.argument);

  if (Def.isPromiseDef(argumentDef)) {
    // If it is a PromiseDef, return resolvedDef (if it exists) or unknown.
    return argumentDef.resolvedDef || defFactory.createUnknownDef(cfgNode);
  }

  return argumentDef || defFactory.createUnknownDef(cfgNode);
}

function handleCallExpression(cfgNode: FlowNode, node: any) {
  const funcDef = expressionTypeHandler(cfgNode, node.callee);

  const argDefs: Def[] = [];

  for (const arg of node.arguments || []) {
    if (!arg) continue;

    if (arg.type === "SpreadElement") {
      const spreadDef = expressionTypeHandler(cfgNode, arg.argument);

      const expanded = expandSpreadArgument(cfgNode, spreadDef);

      for (const d of expanded) {
        argDefs.push(d);
      }
    } else {
      argDefs.push(expressionTypeHandler(cfgNode, arg));
    }
  }

  // Derivate thisDef
  const thisDef = (funcDef as any)?.__thisObject ?? getCurrentThisDef();

  // User-defined function, handle in inter-procedural
  return interAnalyzer.analyze(cfgNode, funcDef, argDefs, thisDef, node);
}

function handleChainExpression(cfgNode: FlowNode, node: any) {
  if (!node.expression) return defFactory.createUndefinedDef(cfgNode);

  // Directly delegate the processing of the internal expression to expressionTypeHandler.
  return expressionTypeHandler(cfgNode, node.expression);
}

function handleMemberExpression(cfgNode: FlowNode, node: any) {
  // Resolve object definition via expressionTypeHandler
  const objectDef = expressionTypeHandler(cfgNode, node.object);

  // handle computed property
  const propDef = node.computed
    ? expressionTypeHandler(cfgNode, node.property)
    : null;
  const propName = resolvePropName(cfgNode, node.property, node.computed);

  let resultDef: Def | null = null;

  // Propagation Rules: If the object itself is ImplicitDef,
  // then perform a property lookup on each element in the collection.
  if (Def.isImplicitDef(objectDef)) {
    resultDef = objectDef.map((innerDef) => {
      return performMemberLookup(cfgNode, innerDef, propName, propDef, node);
    }, cfgNode);
  } else {
    // Generation Rules
    resultDef = performMemberLookup(
      cfgNode,
      objectDef,
      propName,
      propDef,
      node,
    );

    // Heuristic fallback:
    // For patterns like `window.X.method(...)` where `X` temporarily resolves
    // to a constructor function during callback modeling, also try
    // constructor.prototype.method.
    if (!resultDef && propName && Def.isFunctionDef(objectDef)) {
      const protoMethod = objectDef.prototypeObject?.lookupProperty(propName);
      if (protoMethod) {
        resultDef = protoMethod;
      }
    }
  }

  // Lazy fallback: create UnknownDef only if nothing is resolved
  if (!resultDef) {
    resultDef = defFactory.createUnknownDef(cfgNode);
    // [NEW ADD] Taint Propagation
    if (objectDef.isTainted)
      tm.propagateTaint(
        objectDef,
        resultDef,
        node,
        "ELEMENT",
        "member-element",
      );
  }

  /**
   * Attach hidden this-binding for CallExpression:
   *   a.b()  → this === a
   */
  (resultDef as any).__thisObject = objectDef;

  return resultDef;
}

function handleThisExpression(cfgNode: FlowNode): Def {
  const thisDef = getCurrentThisDef();
  const globalDef = defFactory.createGlobalDef(
    cfgNode,
    cfgNode.scopeTree?.root!,
  );

  // If `this` cannot be resolved, treat it as globalThis (unknown)
  return thisDef ?? globalDef ?? defFactory.createUnknownDef(cfgNode);
}

function handleSequenceExpression(cfgNode: FlowNode, node: any): Def {
  let eDef: Def | null = null;
  for (const expr of node.expressions) {
    eDef = expressionTypeHandler(cfgNode, expr);
  }

  return eDef ?? defFactory.createUnknownDef(cfgNode);
}

function expandSpreadArgument(cfgNode: FlowNode, spreadDef: Def): Def[] {
  // Array / TypedArray / Array-like object
  if (Def.isObjectDef(spreadDef)) {
    const result: Def[] = [];

    for (const [, v] of spreadDef.props) {
      result.push(v);
    }

    return result.length ? result : [spreadDef];
  }

  return [spreadDef];
}
