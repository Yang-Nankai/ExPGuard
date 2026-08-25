import ScopeTree from "../../scope/scopeTree";
import Scope from "../../scope/scope";
import { defFactory } from "../factories/defFactory";
import { patternAwareTypeHandler } from "../handlers/patternAwareTypeHandler";
import { reachingDefAnalyzer } from "./reachingDefinitionAnalyzer";
import { fileTimerManager, FileTimer } from "../../utils/fileTimer";
import config from "../../config";
import logger from "../../utils/logger";

/**
 * Entry-point sweep.
 *
 * The main pass is driven by "execute the top-level script": a function body is
 * only analyzed if some modeled semantic actually calls it. That leaves every
 * function reachable *only* through an unmodeled callback — a `MutationObserver`,
 * a library's `.on("submit", fn)`, a hand-rolled dispatch table, a
 * `requestAnimationFrame` — completely unanalyzed. On real minified extension
 * code that is the majority of the file (measured: 13 of 356 function scopes
 * entered on a 240KB script).
 *
 * This sweep re-enters those leftover scopes as standalone entry points.
 *
 * Deliberate design choice: parameters are bound to *untainted* opaque values.
 * Synthesizing attacker-controlled arguments for an arbitrary uncalled helper
 * would invent an attack surface that may not exist and would misattribute the
 * source type. Every flow reported out of this sweep therefore still originates
 * at a genuinely modeled source (`document.cookie`, `chrome.cookies.get`,
 * `element.value`, ...) that the function reads itself — the sweep only supplies
 * reachability, never taint.
 */
export class EntryPointAnalyzer {
  /**
   * Analyze every CFG-eligible scope in `scopeTree` that the main pass left
   * untouched. Returns the number of scopes newly analyzed.
   *
   * The sweep is strictly the lowest-priority phase — it runs last and every
   * finding it can produce is a bonus on top of the main pass. It is also, by
   * far, the most expensive: on a function-dense 240KB script it re-enters
   * ~340 scopes and will happily consume the entire per-file budget (measured:
   * 0.6s -> 60s). So it gets its own deadline, a fraction of the file's
   * budget, and stops there rather than starving the wall clock.
   */
  public sweep(scopeTree: ScopeTree): number {
    const fileTimer = fileTimerManager.getCurrentTimer();
    const budgetMs = this.computeBudgetMs(fileTimer);

    if (budgetMs <= 0) return 0;

    // Run the whole sweep under a *tighter* timer. Checking the deadline
    // between scopes is not enough on its own: `reachingDefAnalyzer.doAnalysis`
    // has no internal clock, and one function that transitively calls a lot can
    // run for tens of seconds. The inter-procedural analyzer does consult the
    // current timer on every call, so swapping the timer is what actually
    // bounds a single expensive scope.
    fileTimerManager.setCurrentTimer(
      fileTimer?.getFilePath() ?? scopeTree.key,
      fileTimer?.getFileSize() ?? 0,
      budgetMs,
    );

    let analyzed = 0;
    let skipped = 0;

    try {
      for (const scope of scopeTree.getCFGEligibleScopes()) {
        if (!scope.graph || scope.hasTaintAnalyzed) continue;

        if (fileTimerManager.checkCurrentTimeout()) {
          // Count what was dropped: a truncated sweep would otherwise read as
          // "fully covered" in the coverage metric.
          skipped++;
          continue;
        }

        try {
          this.bindUnknownParameters(scope);
          reachingDefAnalyzer.doAnalysis(scope);
          analyzed++;
        } catch (err) {
          // A single malformed scope must not abort the sweep for the file.
          logger.debug(
            `[ENTRY-SWEEP] failed on ${scopeTree.key}/${scope.name}: ${String(err)}`,
          );
        }
      }
    } finally {
      fileTimerManager.restoreTimer(fileTimer);
    }

    if (skipped > 0) {
      logger.warn(
        `[ENTRY-SWEEP] ${scopeTree.key}: budget exhausted after ${budgetMs}ms, ` +
          `${analyzed} scope(s) swept, ${skipped} left unanalyzed`,
      );
    }

    return analyzed;
  }

  /**
   * How long the sweep may run: a fraction of the file's own budget, capped by
   * whatever is actually left of it. Falls back to the small-file timeout when
   * no timer is active (unit tests, direct API use).
   */
  private computeBudgetMs(fileTimer: FileTimer | null): number {
    const ratio = config.entrySweepBudgetRatio;

    if (!fileTimer) return config.fileSizeTimeoutMs.small * ratio;

    return Math.min(
      fileTimer.getTimeout() * ratio,
      fileTimer.getRemainingMs(),
    );
  }

  /**
   * Bind each formal parameter to a fresh opaque `Def`.
   *
   * Without this the parameters have no reaching definition at all, so
   * `param.foo` resolves to nothing and the handler body degenerates. An
   * `UnknownDef` gives member reads and calls something coherent to work with
   * while carrying no taint of its own.
   */
  private bindUnknownParameters(scope: Scope): void {
    const entryNode = scope.graph?.entryNode;
    const params: any[] = (scope.ast as any)?.params ?? [];

    if (!entryNode || params.length === 0) return;

    for (const param of params) {
      patternAwareTypeHandler(
        entryNode,
        param,
        defFactory.createUnknownDef(entryNode),
      );
    }
  }
}

export const entryPointAnalyzer = new EntryPointAnalyzer();
