/**
 * TaintRuleEngine — data-driven (source, sink) → FlowType[] resolver.
 *
 * Replaces the hand-written switch in `policy.getFlowType`. The engine loads
 * a default rule set (replicates the original matrix exactly) and lets users
 * layer additional rules via `config.taintRulesPath` or the `--taint-rules`
 * CLI flag. JSON is the primary format; a TS escape hatch is supported too
 * so power users can express predicates without round-tripping through
 * string globs.
 *
 * Resolution model (chosen by the user during design):
 *   "all-match" — a single (source, sink) pair may produce MULTIPLE flow
 *   types. The engine returns every inclusive-rule match minus any matching
 *   suppress rules.
 *
 * The engine is stateful at module-load time: defaults are loaded eagerly
 * from `./rules/default-rules.json` so callers that don't supply a user file
 * still see the original behavior.
 */
import fs from "fs";
import path from "path";
import logger from "../utils/logger";
import { classifySink, classifySource } from "./policy";
import {
  RuleMatch,
  TaintRule,
  TaintRuleSet,
  TaintSuppressRule,
  toArray,
  typePatternMatches,
} from "./ruleTypes";
import { FlowType, SinkType, SourceType } from "./types";

const DEFAULT_RULES_PATH = path.join(__dirname, "rules", "default-rules.json");

export class TaintRuleEngine {
  private rules: TaintRule[] = [];
  private suppress: TaintSuppressRule[] = [];

  // Cheap memoization. The rule set is small and (source, sink) pairs repeat
  // heavily within a single run (every taint sink check goes through here).
  // We invalidate by clearing the map any time the rule set changes.
  private cache = new Map<string, RuleMatch[]>();

  constructor() {
    this.loadDefaults();
  }

  /**
   * Load the bundled default rule set. Always called from the constructor;
   * exposed so tests can reset to the canonical defaults after layering
   * extra rules.
   */
  loadDefaults(): void {
    this.rules = [];
    this.suppress = [];
    this.cache.clear();
    try {
      const set = readRuleSet(DEFAULT_RULES_PATH);
      this.mergeRuleSet(set);
    } catch (err) {
      // The default file ships with the package — if it's missing or malformed
      // the engine should fail loudly. Throwing here would crash every test,
      // so we log and leave the engine empty (no flow types match → no flows).
      logger.error(
        `[TAINT-RULES] Failed to load default rules from ${DEFAULT_RULES_PATH}: ${String(err)}`,
      );
    }
  }

  /**
   * Layer a user-provided rule file on top of the current rule set. Calling
   * this twice with the same file double-adds; callers wanting "replace"
   * semantics should `loadDefaults()` first.
   *
   * Supports two formats:
   *   - `.json`            — TaintRuleSet, parsed as JSON
   *   - `.js` / `.ts` / `.mjs` / `.cjs` — module with default export, a named
   *     export `rules`, or the module value being a TaintRuleSet directly.
   *     This is the "TS escape hatch" — useful when rule authoring needs
   *     comments, computed values, or shared constants.
   */
  loadFromFile(filePath: string): void {
    const set = readRuleSet(filePath);
    this.mergeRuleSet(set);
    logger.info(
      `[TAINT-RULES] Loaded user rules from ${filePath}: +${set.rules.length} rules, +${(set.suppress ?? []).length} suppress entries (total ${this.rules.length}/${this.suppress.length})`,
    );
  }

  /** Replace the current rule set entirely (used by tests). */
  setRuleSet(set: TaintRuleSet): void {
    this.rules = [];
    this.suppress = [];
    this.cache.clear();
    this.mergeRuleSet(set);
  }

  /** Drop all rules (used by tests; the next `loadDefaults` call rehydrates). */
  reset(): void {
    this.rules = [];
    this.suppress = [];
    this.cache.clear();
  }

  /**
   * Number of currently-registered (inclusive, suppress) rules. Used by tests
   * and the diagnostics path; not load-bearing.
   */
  stats(): { rules: number; suppress: number } {
    return { rules: this.rules.length, suppress: this.suppress.length };
  }

  /**
   * Resolve a `(source, sink)` pair to every matching flow type. Returns an
   * empty array when no inclusive rule matches or every match is suppressed.
   * Order of the returned list mirrors the order rules were registered
   * (defaults first, user rules appended).
   */
  matchFlowTypes(source: SourceType, sink: SinkType): RuleMatch[] {
    const key = `${source}\u0000${sink}`;
    const cached = this.cache.get(key);
    if (cached) return cached;

    const ctx = {
      source,
      sink,
      sourceCapability: classifySource(source),
      sinkCapability: classifySink(sink),
    };

    const matches: RuleMatch[] = [];
    for (const rule of this.rules) {
      if (!this.ruleMatches(rule.match, ctx)) continue;
      if (this.isSuppressed(rule.flowType, ctx)) continue;
      matches.push({
        flowType: rule.flowType,
        ruleId: rule.id,
        ruleDescription: rule.description,
      });
    }

    // Dedup by (flowType, ruleId) — two distinct rules emitting the same
    // FlowType for this pair would otherwise inflate the summary. We keep
    // both records so the analyst can see which rule families contributed.
    const seen = new Set<string>();
    const deduped = matches.filter((m) => {
      const k = `${m.flowType}|${m.ruleId}`;
      if (seen.has(k)) return false;
      seen.add(k);
      return true;
    });

    this.cache.set(key, deduped);
    return deduped;
  }

  /**
   * Convenience: just the flow types, no provenance. Mirrors the shape of
   * the old `getFlowType` minus the `| null` (callers should treat an empty
   * array as "no flow").
   */
  getFlowTypes(source: SourceType, sink: SinkType): FlowType[] {
    return this.matchFlowTypes(source, sink).map((m) => m.flowType);
  }

  private isSuppressed(
    flowType: FlowType,
    ctx: MatchContext,
  ): boolean {
    for (const s of this.suppress) {
      if (s.flowType !== undefined && s.flowType !== flowType) continue;
      if (this.ruleMatches(s.match, ctx)) return true;
    }
    return false;
  }

  private ruleMatches(
    match: TaintRule["match"],
    ctx: MatchContext,
  ): boolean {
    const sourceCaps = toArray(match.sourceCapability);
    if (sourceCaps.length && !sourceCaps.includes(ctx.sourceCapability)) {
      return false;
    }
    const sinkCaps = toArray(match.sinkCapability);
    if (sinkCaps.length && !sinkCaps.includes(ctx.sinkCapability)) {
      return false;
    }

    const sourcePatterns = toArray(match.sourceType);
    if (
      sourcePatterns.length &&
      !sourcePatterns.some((p) => typePatternMatches(p, ctx.source))
    ) {
      return false;
    }

    const sinkPatterns = toArray(match.sinkType);
    if (
      sinkPatterns.length &&
      !sinkPatterns.some((p) => typePatternMatches(p, ctx.sink))
    ) {
      return false;
    }

    return true;
  }

  private mergeRuleSet(set: TaintRuleSet): void {
    validateRuleSet(set);
    for (const r of set.rules) this.rules.push(r);
    for (const s of set.suppress ?? []) this.suppress.push(s);
    this.cache.clear();
  }
}

interface MatchContext {
  source: SourceType;
  sink: SinkType;
  sourceCapability: ReturnType<typeof classifySource>;
  sinkCapability: ReturnType<typeof classifySink>;
}

/** Singleton instance. Engine is shallow and cheap to share. */
export const taintRuleEngine = new TaintRuleEngine();

// ---------- file loading helpers ----------

function readRuleSet(filePath: string): TaintRuleSet {
  if (!fs.existsSync(filePath)) {
    throw new Error(`Rule file does not exist: ${filePath}`);
  }

  const ext = path.extname(filePath).toLowerCase();

  if (ext === ".json" || ext === "") {
    const raw = fs.readFileSync(filePath, "utf-8");
    try {
      return raw.trim() ? (JSON.parse(raw) as TaintRuleSet) : { version: 1, rules: [] };
    } catch (err) {
      throw new Error(
        `Rule file is not valid JSON (${filePath}): ${String(err)}`,
      );
    }
  }

  // TS / JS escape hatch. We use `require` rather than dynamic import so we
  // stay on a synchronous code path and so commonJS modules in node_modules
  // (the project's build target) load cleanly. The user file is expected to
  // export either a default value of TaintRuleSet shape, or to set its
  // `module.exports` directly to one.
  try {
    /* eslint-disable @typescript-eslint/no-var-requires */
    const mod = require(filePath);
    const candidate: any =
      mod && typeof mod === "object" && "rules" in mod
        ? mod
        : mod?.default;
    if (!candidate || typeof candidate !== "object") {
      throw new Error(
        `Rule file did not export a TaintRuleSet (expected an object with a 'rules' array)`,
      );
    }
    return candidate as TaintRuleSet;
  } catch (err) {
    throw new Error(`Failed to load TS/JS rule file ${filePath}: ${String(err)}`);
  }
}

function validateRuleSet(set: TaintRuleSet): void {
  if (!set || typeof set !== "object") {
    throw new Error("TaintRuleSet must be an object");
  }
  if (set.version !== 1) {
    throw new Error(
      `Unsupported TaintRuleSet.version: ${(set as any).version} (expected 1)`,
    );
  }
  if (!Array.isArray(set.rules)) {
    throw new Error("TaintRuleSet.rules must be an array");
  }
  for (const r of set.rules) {
    if (!r.id || typeof r.id !== "string") {
      throw new Error(`Rule is missing 'id': ${JSON.stringify(r)}`);
    }
    if (!r.flowType || typeof r.flowType !== "string") {
      throw new Error(`Rule '${r.id}' is missing 'flowType'`);
    }
    if (!r.match || typeof r.match !== "object") {
      throw new Error(`Rule '${r.id}' is missing 'match'`);
    }
    const m = r.match;
    if (
      !m.sourceCapability &&
      !m.sinkCapability &&
      !m.sourceType &&
      !m.sinkType
    ) {
      throw new Error(
        `Rule '${r.id}' has an empty 'match' — inclusive rules must specify at least one matcher field to avoid matching every flow`,
      );
    }
  }
  for (const s of set.suppress ?? []) {
    if (!s.id || typeof s.id !== "string") {
      throw new Error(`Suppress rule is missing 'id': ${JSON.stringify(s)}`);
    }
    if (!s.match || typeof s.match !== "object") {
      throw new Error(`Suppress rule '${s.id}' is missing 'match'`);
    }
    // Suppress rules with an empty match are allowed: they're a blanket
    // suppress for a specific flow type. Disallow only the case where BOTH
    // match is empty AND flowType is absent — that would suppress everything.
    const m = s.match;
    const matchEmpty =
      !m.sourceCapability &&
      !m.sinkCapability &&
      !m.sourceType &&
      !m.sinkType;
    if (matchEmpty && !s.flowType) {
      throw new Error(
        `Suppress rule '${s.id}' has an empty 'match' and no 'flowType' — would suppress every flow`,
      );
    }
  }
}
