/**
 * User-configurable taint rule schema.
 *
 * The pre-rule-engine `getFlowType` baked a hand-written switch over source /
 * sink capability into the policy module. That worked for the privilege-
 * escalation focus the project started with, but adding e.g. "cookies → fetch
 * body = SENSITIVE_DATA_EGRESS" required a code change. The rule engine moves
 * that decision out into data, so an analyst can encode new flow categories
 * in a JSON file (or a TS module for power users) without touching the engine.
 */
import { FlowType, SinkCapability, SinkType, SourceCapability, SourceType } from "./types";

/**
 * One rule. A flow `(source, sink)` "matches" a rule when every populated
 * matcher field accepts it. A rule with no matcher fields matches everything —
 * useful for a "catch-all suppress" but never for an inclusive rule, so
 * `validateRule` rejects fully-empty includes.
 *
 * Matching semantics (all populated fields are AND'd):
 *  - `sourceCapability` / `sinkCapability`: capability bucket (ATTACKER_INPUT,
 *    PRIVILEGED_OPERATION, ...). Accept a single value or an array.
 *  - `sourceType` / `sinkType`: exact-string match against the SourceType /
 *    SinkType enum, OR a glob pattern containing `*` (e.g. `"NAVIGATOR_*"`).
 *    Accept a single value or an array (any-of).
 *
 * `flowType` is required on inclusive rules. Suppress rules don't emit a
 * flow type — they just block whatever inclusive rule above matched.
 */
export interface TaintRuleMatch {
  sourceCapability?: SourceCapability | SourceCapability[];
  sinkCapability?: SinkCapability | SinkCapability[];
  sourceType?: string | string[];
  sinkType?: string | string[];
}

export interface TaintRule {
  /** Stable id for diagnostics, dedup, and overriding via custom rule files. */
  id: string;
  /** Human-readable description. Echoed in `summary.json` under `ruleDescription`. */
  description?: string;
  /** Required for inclusive rules. */
  flowType: FlowType;
  /** Matching predicate. All populated fields are AND'd. */
  match: TaintRuleMatch;
}

/**
 * Suppress rule. Same matching shape, no `flowType`. When a suppress rule
 * matches a `(source, sink, flowType)` tuple, that emission is dropped.
 *
 * `flowType` here is optional: when present, the suppress only applies to
 * that specific flow type; when absent, it suppresses *every* flow type for
 * the matched pair. The latter mirrors the old `isNativeOutputSource` /
 * `isNativeOutputSink` blanket filters.
 */
export interface TaintSuppressRule {
  id: string;
  description?: string;
  flowType?: FlowType;
  match: TaintRuleMatch;
}

/**
 * The shape of the JSON/TS rule file the engine consumes.
 *
 * `version` is reserved for future schema migrations and currently must be 1.
 */
export interface TaintRuleSet {
  version: 1;
  rules: TaintRule[];
  suppress?: TaintSuppressRule[];
}

/**
 * Result returned by `TaintRuleEngine.matchFlowTypes`. The engine keeps
 * provenance so the report layer can show which rule fired (and the analyst
 * can audit / disable specific rules later).
 */
export interface RuleMatch {
  flowType: FlowType;
  ruleId: string;
  ruleDescription?: string;
}

/**
 * Helper: a SourceType/SinkType pattern can be either a literal type name or
 * a glob with `*`. We expose the matcher so users writing the TS escape
 * hatch can call it directly without depending on engine internals.
 */
export function typePatternMatches(pattern: string, value: string): boolean {
  if (pattern === value) return true;
  if (!pattern.includes("*")) return false;

  // Convert glob to a regex. `*` becomes `.*`, every other character is escaped.
  // We intentionally do not support `?` or character classes — keeping the
  // surface tiny avoids surprises and keeps user-facing diagnostics simple.
  const escaped = pattern.replace(/[.+^${}()|[\]\\]/g, "\\$&");
  const rx = "^" + escaped.replace(/\*/g, ".*") + "$";
  return new RegExp(rx).test(value);
}

/**
 * Convert a single-or-array config field into a plain array.
 * Used by the matcher so rule authors can write `sourceType: "X"` or
 * `sourceType: ["X", "Y"]` interchangeably.
 */
export function toArray<T>(v: T | T[] | undefined): T[] {
  if (v === undefined) return [];
  return Array.isArray(v) ? v : [v];
}
