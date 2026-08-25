import walkes, { RecurseFunction } from "../ast/walkes";
import Def from "../def-use/types/def";
import { defFactory } from "../def-use/factories/defFactory";
import { FlowNode } from "../flownode/flownode";
import { scriptUsageTracker } from "../extension/scriptUsageTracker";
import {
  MessageDispatchKey,
  MessageProtocol,
  MessageValueCandidates,
} from "./types";

const DISPATCH_KEYS: MessageDispatchKey[] = ["action", "type"];

function emptyProtocol(contextFilename: string): MessageProtocol {
  return {
    frameFamily: scriptUsageTracker.getPrimaryFrameFamilyByKey(contextFilename),
    dispatch: {},
  };
}

function mergeCandidates(
  target: MessageValueCandidates | undefined,
  incoming: MessageValueCandidates,
): MessageValueCandidates {
  return {
    values: Array.from(new Set([...(target?.values ?? []), ...incoming.values])),
    hasUnknown: Boolean(target?.hasUnknown || incoming.hasUnknown),
  };
}

function literalCandidates(def: Def | null | undefined): MessageValueCandidates {
  if (!def) return { values: [], hasUnknown: true };

  if (Def.isLiteralDef(def)) {
    return { values: [String(def.value)], hasUnknown: false };
  }

  if (Def.isImplicitDef(def)) {
    let result: MessageValueCandidates = { values: [], hasUnknown: false };
    for (const candidate of def.defs) {
      result = mergeCandidates(result, literalCandidates(candidate));
    }
    // An empty implicit set is indistinguishable from an unresolved value.
    return result.values.length || result.hasUnknown
      ? result
      : { values: [], hasUnknown: true };
  }

  return { values: [], hasUnknown: true };
}

/** Recover action/type alternatives from an outgoing message object. */
export function getSenderMessageProtocol(
  message: Def,
  contextFilename: string,
): MessageProtocol {
  const protocol = emptyProtocol(contextFilename);
  let hasUnknownMessageAlternative = false;

  const visit = (candidate: Def | null | undefined) => {
    if (Def.isImplicitDef(candidate)) {
      for (const inner of candidate.defs) visit(inner);
      return;
    }

    // A widened/opaque alternative may be an object with any action/type.
    // It must keep every otherwise-known candidate matchable rather than
    // letting a sibling literal incorrectly prove an impossible bridge.
    if (!Def.isObjectDef(candidate)) {
      if (Def.isUnknownDef(candidate)) hasUnknownMessageAlternative = true;
      return;
    }
    for (const key of DISPATCH_KEYS) {
      const value = candidate.lookupProperty(key);
      if (value) {
        protocol.dispatch[key] = mergeCandidates(
          protocol.dispatch[key],
          literalCandidates(value),
        );
      }
      // A dynamic write such as `msg[field] = value` could be `action` or
      // `type`; retain it as an unknown alternative for both dispatch keys.
      if (candidate.getUnknown()) hasUnknownMessageAlternative = true;
    }
  };

  visit(message);
  if (hasUnknownMessageAlternative) {
    for (const key of DISPATCH_KEYS) {
      const existing = protocol.dispatch[key];
      if (existing) existing.hasUnknown = true;
    }
  }
  return protocol;
}

function memberDispatchKey(node: any, messageNames: Set<string>): MessageDispatchKey | null {
  let expr = node;
  while (expr?.type === "ChainExpression") expr = expr.expression;
  if (expr?.type !== "MemberExpression") return null;

  const object = expr.object;
  if (object?.type !== "Identifier" || !messageNames.has(object.name)) return null;

  const property = expr.computed
    ? expr.property?.type === "Literal"
      ? String(expr.property.value)
      : null
    : expr.property?.type === "Identifier"
      ? expr.property.name
      : null;

  return property === "action" || property === "type" ? property : null;
}

function literalFromNode(node: any): string | null {
  return node?.type === "Literal" ? String(node.value) : null;
}

function collectMessageParameterNames(functionNode: any): Set<string> {
  const names = new Set<string>();
  const param = functionNode?.params?.[0];
  if (!param) return names;

  if (param.type === "Identifier") {
    names.add(param.name);
    return names;
  }

  // Support `({ type, action }) => ...` without treating arbitrary local
  // identifiers as protocol fields. The local name is recorded only when it
  // is declared from one of the two dispatch properties.
  if (param.type === "ObjectPattern") {
    for (const property of param.properties ?? []) {
      const key = property?.key?.type === "Identifier"
        ? property.key.name
        : property?.key?.type === "Literal"
          ? String(property.key.value)
          : null;
      if (
        (key === "action" || key === "type") &&
        property?.value?.type === "Identifier"
      ) {
        names.add(`${key}:${property.value.name}`);
      }
    }
  }
  return names;
}

function identifierDispatchKey(node: any, names: Set<string>): MessageDispatchKey | null {
  if (node?.type !== "Identifier") return null;
  for (const key of DISPATCH_KEYS) {
    if (names.has(`${key}:${node.name}`)) return key;
  }
  return null;
}

/**
 * Collect positive literal dispatch guards in the listener callback. These
 * constraints are used only for an impossible-set check; no absent/dynamic
 * guard turns into a rejection, which keeps unknown protocols conservative.
 */
export function getReceiverMessageProtocol(
  callback: Def,
  contextFilename: string,
): MessageProtocol {
  const protocol = emptyProtocol(contextFilename);
  if (!Def.isFunctionDef(callback) || !callback.functionNode) return protocol;

  const names = collectMessageParameterNames(callback.functionNode as any);
  const note = (key: MessageDispatchKey | null, value: string | null) => {
    if (!key || value === null) return;
    protocol.dispatch[key] = mergeCandidates(protocol.dispatch[key], {
      values: [value],
      hasUnknown: false,
    });
  };

  const dispatchKey = (node: any) =>
    memberDispatchKey(node, names) ?? identifierDispatchKey(node, names);

  const visitor = {
    // Nested callbacks receive their own message/value namespaces; their
    // comparisons must not constrain this listener's transport endpoint.
    FunctionDeclaration: () => {},
    FunctionExpression: () => {},
    ArrowFunctionExpression: () => {},
    BinaryExpression: (node: any, recurse: RecurseFunction) => {
      if (node.operator === "===" || node.operator === "==") {
        note(dispatchKey(node.left), literalFromNode(node.right));
        note(dispatchKey(node.right), literalFromNode(node.left));
      }
      recurse(node.left);
      recurse(node.right);
    },
    SwitchStatement: (node: any, recurse: RecurseFunction) => {
      const key = dispatchKey(node.discriminant);
      if (key) {
        for (const item of node.cases ?? []) {
          note(key, literalFromNode(item.test));
        }
      }
      walkes.checkProps(node, recurse);
    },
    default: (node: any, recurse: RecurseFunction) => walkes.checkProps(node, recurse),
  };

  // Start at the body rather than the callback itself so its own function node
  // is traversed while nested function declarations remain excluded.
  const body = (callback.functionNode as any).body;
  if (body) walkes(body, visitor);
  return protocol;
}

/**
 * There is no edge only when a shared dispatch field is fully known on both
 * sides and its candidate sets are disjoint. An ImplicitDef with any unknown
 * candidate stays matchable, satisfying the conservative dynamic-value rule.
 */
export function messageProtocolsMayMatch(
  sender?: MessageProtocol,
  receiver?: MessageProtocol,
): boolean {
  if (!sender || !receiver) return true;

  for (const key of DISPATCH_KEYS) {
    const sent = sender.dispatch[key];
    const accepted = receiver.dispatch[key];
    if (!sent || !accepted) continue;
    if (sent.hasUnknown || accepted.hasUnknown) continue;

    const overlaps = sent.values.some((value) => accepted.values.includes(value));
    if (!overlaps) return false;
  }

  return true;
}

/**
 * Object literals tainted through known fields are delivered as a structural
 * projection. Keeping the fields but not tainting the container prevents a
 * tainted `message.draft` from becoming a taint on unrelated `message.url`.
 * Opaque/unknown object shapes are deliberately passed through unchanged.
 */
export function projectMessageForReceiver(message: Def, callNode: FlowNode): Def {
  return projectKnownTaintFields(message, callNode, new Map());
}

/**
 * Copy a structurally-known message object without re-tainting its parent
 * container.  The old one-level projection handled `{ title, url }`, but
 * still allowed `{ payload: { title, url } }` to turn `payload.url` tainted
 * because the nested payload container carried title's taint.  Recursing only
 * through known, non-opaque objects preserves property precision while
 * retaining unknown/dynamic message shapes conservatively.
 */
function projectKnownTaintFields(
  value: Def,
  callNode: FlowNode,
  seen: Map<Def, Def>,
): Def {
  if (
    !Def.isObjectDef(value) ||
    !value.isTainted ||
    value.getUnknown() ||
    value.hasOpaqueContainerTaint
  ) {
    return value;
  }

  if (!value.hasTaintedOwnProperty) return value;
  const cached = seen.get(value);
  if (cached) return cached;

  const projected = defFactory.createObjectDef(callNode, value.proto);
  seen.set(value, projected);
  for (const [key, child] of value.props) {
    projected.setProperty(
      key,
      projectKnownTaintFields(child, callNode, seen),
      false,
    );
  }
  return projected;
}
