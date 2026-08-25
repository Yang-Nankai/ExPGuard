import { FlowNode } from "../../flownode/flownode";
import { defFactory } from "../factories/defFactory";
import Def, { FunctionDef } from "../types/def";

export class FunctionCallItem {
  readonly caller: FlowNode;
  readonly callee: FunctionDef;
  readonly argDefs: Def[];
  readonly thisDef: Def | null;

  private _returnDef: Def | null = null;
  private _hasSideEffects = false;
  private _key?: string;

  /**
   * Return values recorded for this call, keyed by the `ReturnStatement` that
   * produced them.
   *
   * Keying by site rather than appending is what keeps the union precise: the
   * same `return` may be evaluated more than once per call (the GEN pass and
   * the pure-expression pass both visit it, and a return inside a loop body is
   * re-visited once per unroll). Those repeats must overwrite, not accumulate.
   */
  private _returnDefsBySite: Map<object, Def> = new Map();
  /** Returns recorded without a site (e.g. a feature-model summary). */
  private _returnDefFallback: Def | null = null;

  constructor(
    caller: FlowNode,
    callee: FunctionDef,
    argDefs: Def[],
    thisDef: Def | null = null
  ) {
    this.caller = caller;
    this.callee = callee;
    this.argDefs = argDefs;
    this.thisDef = thisDef;
  }

  set returnDef(def: Def | null) {
    this._returnDef = def;
  }

  get returnDef(): Def {
    return (
      this._returnDef ??
      defFactory.createUndefinedDef(this.caller)
    );
  }

  /**
   * Record one `return` of this call and recompute the call's return value.
   *
   * A function with several `return`s used to keep only the last one
   * evaluated. For the extremely common
   *
   * ```js
   * function isTarget(url) {
   *   try { return DOMAINS.some(d => host.includes(d)); }
   *   catch { return false; }
   * }
   * ```
   *
   * that meant the call resolved to the literal `false` from the catch arm, so
   * `if (!isTarget(u)) return;` constant-folded to TRUE and the analyzer pruned
   * the entire caller as dead code. Unioning the returns yields an
   * `ImplicitDef`, which `evaluateDefTruth` reports as UNKNOWN — no pruning,
   * and taint from any arm still flows to the caller.
   */
  recordReturnDef(def: Def, site?: object): void {
    if (site) {
      this._returnDefsBySite.set(site, def);
    } else {
      this._returnDefFallback = def;
    }

    this._returnDef = this.combineReturnDefs();
  }

  /** Single return → that Def verbatim; several → their union. */
  private combineReturnDefs(): Def | null {
    const candidates = [...this._returnDefsBySite.values()];
    if (this._returnDefFallback) candidates.push(this._returnDefFallback);

    if (candidates.length === 0) return null;
    // Preserve exact literals (and their constant-folding power) whenever the
    // function has exactly one return site.
    if (candidates.length === 1) return candidates[0];

    return defFactory.createImplicitDef(this.caller, candidates);
  }

  markHasSideEffects(): void {
    this._hasSideEffects = true;
  }

  get hasSideEffects(): boolean {
    return this._hasSideEffects;
  }

  get key(): string {
    if (!this._key) {
      this._key =
        this.callee.key +
        "|" +
        this.argDefs.map((d) => d.key).join(",") +
        "|this=" +
        (this.thisDef?.key ?? "null");
    }
    return this._key;
  }
}
