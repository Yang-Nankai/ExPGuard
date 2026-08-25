import { FlowNode } from "../../flownode/flownode";
import Scope from "../../scope/scope";
import { taintManager as tm } from "../../taint";
import { interAnalyzer } from "../analyzers/interProceduralAnalyzer";
import { DefFactory, defFactory } from "../factories/defFactory";
import { BuiltInRegistry } from "../builtins/builtinRegistry";
import Def, { isSafeForStringInterpretation } from "../types/def";
import {
  evaluateDefTruth,
  lookupMatchingDef,
  performMemberLookup,
  resolvePropName,
} from "../utils/utils";
/**
 * Link a value that is structurally derived from `container` (a spread
 * element, a destructured binding, ...) to the container in the taint DAG.
 *
 * Intentionally inlined rather than imported from a shared module: this file
 * sits early in the builtin-registry initialization order, and adding an
 * import edge to a module that pulls in `../../taint` reorders module
 * evaluation enough that `BuiltInRegistry`'s Array constructor is not yet
 * registered when array instances are built here. No-ops on untainted
 * containers, so it adds no false-positive surface.
 */
/**
 * An object/array-like value with real structure to offer — as opposed to a
 * boxed literal (`LiteralDef extends ObjectDef`) or `undefined`.
 */
function isContainerDef(def: Def | null): def is Def {
  return (
    Def.isObjectDef(def) &&
    !Def.isLiteralDef(def) &&
    !Def.isUndefinedDef(def)
  );
}

function propagateContainerTaint(
  container: Def | null,
  derived: Def | null,
  astNode: any,
  kind: Parameters<typeof tm.propagateTaint>[3],
  remark: string,
): void {
  if (!container || !derived) return;
  if (!container.isTainted) return;
  if (container.uniqueId === derived.uniqueId) return;

  tm.propagateTaint(container, derived, astNode, kind, remark);
}
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

      // Whether or not the spread source resolved to concrete properties, the
      // result object now *contains* it. Marking the container tainted lets
      // `handleMemberExpression`'s container-taint fallback recover the flow
      // for `{ ...msg }.url`, which no property copy can model when `msg` is
      // an opaque UnknownDef.
      propagateContainerTaint(
        spreadDef,
        objectDef,
        property,
        "COPY",
        "object-spread",
      );
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
        // Opaque spread source (`[...msg.list]`): the synthesized element
        // stands for every member, so it inherits the container's taint.
        const element = defFactory.createUnknownDef(cfgNode);
        propagateContainerTaint(
          spreadDef,
          element,
          elem,
          "ELEMENT",
          "array-spread",
        );
        argsDef.push(element);
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

  // A Date converts its input to a time value.  Preserve taint on the Date
  // instance so non-string/configuration uses remain auditable, while the
  // Date formatting methods below can mark their grammar-safe output.
  if (node.callee?.type === "Identifier" && node.callee.name === "Date") {
    const instance = DefFactory.createClassInstanceDef(
      BuiltInRegistry.getConstructor("Date"), cfgNode, node, argsDef,
    );
    for (const arg of argsDef) {
      tm.propagateTaint(arg, instance, node, "RETURN", "Date.constructor");
    }
    return instance;
  }

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

  // Undecidable short-circuit against a *structural* default — the
  // `x || []` / `x || {}` defaulting idiom:
  //
  //   const list = result.harvested || [];
  //   list.push(secret);
  //   chrome.storage.local.set({ harvested: list });
  //
  // Collapsing this to an opaque UnknownDef meant `.push` no longer resolved
  // to `Array.prototype.push`, so everything accumulated into the list became
  // invisible. Adopting the structural operand keeps the container analyzable;
  // taint from the other operand is still attached below, so nothing is lost.
  //
  // Restricted to a genuine *container* on the right. Note `LiteralDef extends
  // ObjectDef` (literals are boxed), so `Def.isObjectDef` alone is not the
  // right test: for a scalar default like `event.data.method || 0` the opaque
  // result is the more useful answer, because it keeps `arr[selector]` widening
  // to *every* element instead of narrowing to index 0 — which is exactly what
  // exposes indirect-dispatch sinks.
  if (!resultDef && isContainerDef(rightDef)) {
    resultDef = DefFactory.rebase(rightDef, cfgNode);
  }

  // `safeFormatted || "fallback"` / `safeFormatted ?? "fallback"` is
  // still a syntax-safe string. This matters for localized fixed status
  // tables such as `queuedMsg[lang] || queuedMsg.ko`: the selected template
  // contains only extension-authored text and numeric counts. Unknown/raw
  // operands deliberately do not qualify, so this cannot hide a message or
  // page string merely because a literal fallback exists.
  if (
    !resultDef &&
    (operator === "||" || operator === "??") &&
    isSafeForStringInterpretation(leftDef) &&
    isSafeForStringInterpretation(rightDef)
  ) {
    resultDef = defFactory.createStringSafeDef(cfgNode);
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
    // The static template text is extension-authored. If every interpolation
    // is a number/boolean or another syntax-safe formatted value, the result
    // can be rendered as HTML/text but cannot contain attacker-supplied
    // markup or code grammar. Keep its taint for non-string sinks (Alarm,
    // storage, privileged APIs) while suppressing only code/HTML findings.
    finalDef = components.every((def) => isSafeForStringInterpretation(def))
      ? defFactory.createStringSafeDef(cfgNode)
      : defFactory.createUnknownDef(cfgNode);
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
  // `typeof value === "number" ? value : 0` is a real type sanitizer, not
  // just a branch.  If the fallback is numeric too, the result can never
  // carry HTML/code syntax even when `value` originally came from a page or
  // storage.  Keep its taint; sink-specific policy decides where it matters.
  const condDef =
    isNumberTypeGuardFor(node.test, node.consequent) && isNumericDef(altDef)
      ? defFactory.createPrimitiveDef(cfgNode, "number")
      : Def.isUnknownDef(consDef) ? altDef : consDef;

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

function isNumericDef(def: Def): boolean {
  return (
    (Def.isPrimitiveDef(def) && def.primitiveKind === "number") ||
    (Def.isLiteralDef(def) && typeof def.value === "number")
  );
}

function isNumberTypeGuardFor(test: any, consequent: any): boolean {
  if (!test || test.type !== "BinaryExpression") return false;
  if (!["===", "=="].includes(test.operator)) return false;

  const isNumberLiteral = (node: any) =>
    node?.type === "Literal" && node.value === "number";
  const typeofOperand = (node: any) =>
    node?.type === "UnaryExpression" && node.operator === "typeof"
      ? node.argument
      : null;
  const guarded = isNumberLiteral(test.right)
    ? typeofOperand(test.left)
    : isNumberLiteral(test.left)
      ? typeofOperand(test.right)
      : null;
  return !!guarded && sameReferenceExpression(guarded, consequent);
}

function sameReferenceExpression(a: any, b: any): boolean {
  if (!a || !b || a.type !== b.type) return false;
  if (a.type === "Identifier") return a.name === b.name;
  if (a.type !== "MemberExpression" || a.computed !== b.computed) return false;
  if (!sameReferenceExpression(a.object, b.object)) return false;
  if (!a.computed) return a.property?.name === b.property?.name;
  if (a.property?.type === "Literal" && b.property?.type === "Literal") {
    return a.property.value === b.property.value;
  }
  return false;
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
    const numericOperators = new Set(["-", "*", "/", "%", "|", "&"]);
    const booleanOperators = new Set(["==", "!=", "===", "!==", "<", "<=", ">", ">="]);
    const isNumber = (def: Def) =>
      (Def.isPrimitiveDef(def) && def.primitiveKind === "number") ||
      (Def.isLiteralDef(def) && typeof def.value === "number");

    // Arithmetic always performs numeric coercion. Preserve this type fact so
    // chains such as parseFloat(x) / 100 and Math.pow(...) do not become an
    // opaque string-capable value before an HTML/code sink.
    const result = booleanOperators.has(node.operator)
      ? defFactory.createPrimitiveDef(cfgNode, "boolean")
      : numericOperators.has(node.operator) ||
          (node.operator === "+" && isNumber(leftDef) && isNumber(rightDef))
        ? defFactory.createPrimitiveDef(cfgNode, "number")
        : node.operator === "+" &&
            isSafeForStringInterpretation(leftDef) &&
            isSafeForStringInterpretation(rightDef)
          ? defFactory.createStringSafeDef(cfgNode)
        : defFactory.createUnknownDef(cfgNode);
    tm.propagateTaint(leftDef, result, node.left, "ASSIGN", "binary-left");
    tm.propagateTaint(rightDef, result, node.right, "ASSIGN", "binary-right");
    return result;
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
  const knownPrimitiveResult = handleKnownPrimitiveCall(cfgNode, node);
  if (knownPrimitiveResult) return knownPrimitiveResult;

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

/**
 * Small, sound type summaries for common numeric formatting expressions.
 * They preserve taint but carry the type fact necessary to distinguish
 * numeric display formatting from string injection. No Alarm/storage sink is
 * filtered here; that decision remains sink-specific in TaintManager.
 */
function handleKnownPrimitiveCall(cfgNode: FlowNode, node: any): Def | null {
  const callee = node?.callee;
  if (!callee || callee.type !== "MemberExpression" || callee.computed) {
    return null;
  }

  const property = callee.property?.name;
  if (!property) return null;

  const object = callee.object;
  if (
    object?.type === "Identifier" &&
    object.name === "Math" &&
    ["abs", "ceil", "floor", "max", "min", "pow", "round", "trunc"].includes(property)
  ) {
    const argDefs = (node.arguments || []).map((arg: any) =>
      expressionTypeHandler(cfgNode, arg),
    );
    const result = defFactory.createPrimitiveDef(cfgNode, "number");
    for (const arg of argDefs) {
      tm.propagateTaint(arg, result, node, "RETURN", `Math.${property}`);
    }
    return result;
  }

  if (["toFixed", "toPrecision", "toExponential"].includes(property)) {
    const receiver = expressionTypeHandler(cfgNode, object);
    if (
      (Def.isPrimitiveDef(receiver) && receiver.primitiveKind === "number") ||
      receiver.isStorageSerialized
    ) {
      const result = defFactory.createStringSafeDef(cfgNode);
      tm.propagateTaint(receiver, result, node, "RETURN", `Number.${property}`);
      return result;
    }
  }

  // Transforming a syntax-safe formatted string cannot introduce attacker
  // markup. This is intentionally narrow: `raw.replace(...)` stays unknown
  // and tainted, while `count.toFixed(2).replace('.', ',')` preserves the
  // safe string grammar established by the numeric formatter.
  if (["replace", "replaceAll"].includes(property)) {
    const receiver = expressionTypeHandler(cfgNode, object);
    if (Def.isStringSafeDef(receiver)) {
      const result = defFactory.createStringSafeDef(cfgNode);
      tm.propagateTaint(receiver, result, node, "RETURN", `String.${property}`);
      return result;
    }
  }

  // `number.toString()` yields text, but its grammar is limited to the
  // numeric representation.  Retain the taint for configuration/storage
  // sinks while recording that it cannot carry arbitrary title/code text.
  if (property === "toString") {
    const receiver = expressionTypeHandler(cfgNode, object);
    if (Def.isPrimitiveDef(receiver)) {
      const result = defFactory.createStringSafeDef(cfgNode);
      tm.propagateTaint(receiver, result, node, "RETURN", "Primitive.toString");
      return result;
    }
  }

  return null;
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

  // JavaScript always exposes `.length` as a number.  Preserve taint for
  // configuration sinks (an attacker-controlled *number* can still matter
  // there), while carrying the type fact so textual Action Badge/Title sinks
  // do not mistake a title-bearing array's cardinality for title text.  This
  // also covers an array reloaded from chrome.storage, whose structural Array
  // type is intentionally opaque at the read site.
  if (propName === "length") {
    const result = defFactory.createPrimitiveDef(cfgNode, "number");
    tm.propagateTaint(objectDef, result, node, "ELEMENT", "member.length");
    return result;
  }

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

  // An array index selects an element summary, while `.length` remains clean
  // metadata even if one or more elements contain page-derived values.
  if (
    !resultDef &&
    Def.isObjectDef(objectDef) &&
    objectDef.isArrayLike &&
    propName !== null &&
    /^(?:0|[1-9]\d*)$/.test(propName)
  ) {
    resultDef = objectDef.arrayElementSummary;
  }

  // A container made solely by *known* tainted fields must remain field
  // sensitive.  For example, `{ title: document.title, count: 0 }.count` and
  // `[{ title: document.title }].length` cannot carry title text.  Opaque
  // containers (JSON.parse, unknown spread/message payload) deliberately keep
  // the old conservative fallback, preserving real dynamic-property TPs.
  const shouldUseContainerFallback =
    !Def.isObjectDef(objectDef) ||
    !propName ||
    objectDef.hasOpaqueContainerTaint ||
    !objectDef.hasTaintedOwnProperty ||
    // An unresolved index can select a summarized element. Unlike `.length`,
    // this is not sibling metadata and remains conservative.
    (Def.isObjectDef(objectDef) &&
      objectDef.isArrayLike &&
      /^(?:0|[1-9]\d*)$/.test(propName));

  // Lazy fallback: create UnknownDef only if nothing is resolved
  if (!resultDef) {
    resultDef = defFactory.createUnknownDef(cfgNode);
    // [NEW ADD] Taint Propagation
    if (objectDef.isTainted && shouldUseContainerFallback)
      tm.propagateTaint(
        objectDef,
        resultDef,
        node,
        "ELEMENT",
        "member-element",
      );
  } else if (
    objectDef.isTainted &&
    shouldUseContainerFallback &&
    objectDef.uniqueId !== resultDef.uniqueId
  ) {
    // Container taint: if the *container* is tainted (e.g. an object built
    // out of a tainted JSON.parse result, or a tainted array), reading any
    // property of it must carry the container's taint forward. Without this
    // step, a downstream sink on `obj.field` after `obj = JSON.parse(x)`
    // would be missed because `field` was sealed as a fresh UnknownDef
    // during parse and never linked back to `x`.
    tm.propagateTaint(
      objectDef,
      resultDef,
      node,
      "ELEMENT",
      "member-element-container",
    );
  }

  if (objectDef.isStorageSerialized) resultDef.markStorageSerialized();


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
