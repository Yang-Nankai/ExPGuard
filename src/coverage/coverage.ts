// coverage.ts
//
// Analysis-coverage metric: how much of the extension's *code* the analyzer
// actually reached. Every CFG-eligible scope (page / function / block / ...)
// owns a control-flow graph whose FlowNodes are flagged `reachable` once the
// reaching-definition worklist proves a feasible path to them
// (see ReachingDefinitionAnalyzer.doAnalysis). A scope that is never entered
// (e.g. an uncalled helper with coverageAnalysis off) leaves all its nodes
// unreachable, so it correctly counts as uncovered.
//
// We measure at two granularities:
//   - node coverage:  reachable real FlowNodes / total real FlowNodes
//   - scope coverage: scopes with hasTaintAnalyzed / total scopes
//
// "Real" excludes synthetic entry/exit nodes and nodes without an AST origin,
// so the denominator tracks executable source constructs rather than CFG
// plumbing.

import ScopeTree from "../scope/scopeTree";
import { FlowNode } from "../flownode/flownode";

export interface ScriptCoverage {
  /** Script key / relative path. */
  file: string;
  /** Primary frame tag (BG_1 / CS_1 / ...) if known. */
  frame?: string;
  totalNodes: number;
  coveredNodes: number;
  /** reachable real nodes / total real nodes, 0..1 (1 when there is no code). */
  nodeCoverage: number;
  totalScopes: number;
  coveredScopes: number;
  /** analyzed scopes / total scopes, 0..1. */
  scopeCoverage: number;
}

export interface CoverageSummary {
  totalNodes: number;
  coveredNodes: number;
  /** Overall reachable real nodes / total real nodes, 0..1. */
  nodeCoverage: number;
  totalScopes: number;
  coveredScopes: number;
  scopeCoverage: number;
  /** Number of scripts that contributed at least one real node. */
  analyzedScripts: number;
  scripts: ScriptCoverage[];
}

/** A FlowNode counts toward coverage only if it maps to real source. */
function isRealNode(node: FlowNode): boolean {
  if (FlowNode.isEntryType(node) || FlowNode.isExitType(node)) return false;
  return !!node.astNode;
}

function ratio(covered: number, total: number): number {
  return total === 0 ? 1 : covered / total;
}

function computeScriptCoverage(tree: ScopeTree): ScriptCoverage {
  let totalNodes = 0;
  let coveredNodes = 0;
  let totalScopes = 0;
  let coveredScopes = 0;

  for (const scope of tree.getCFGEligibleScopes()) {
    if (!scope.graph) continue;
    totalScopes++;
    if (scope.hasTaintAnalyzed) coveredScopes++;

    for (const node of scope.graph.allNodes) {
      if (!isRealNode(node)) continue;
      totalNodes++;
      if (node.reachable) coveredNodes++;
    }
  }

  return {
    file: tree.key,
    frame: tree.script ? primaryFrameOf(tree) : undefined,
    totalNodes,
    coveredNodes,
    nodeCoverage: ratio(coveredNodes, totalNodes),
    totalScopes,
    coveredScopes,
    scopeCoverage: ratio(coveredScopes, totalScopes),
  };
}

// Frame lookup is best-effort; the tracker is the source of truth but importing
// it lazily keeps this module dependency-light and testable in isolation.
function primaryFrameOf(tree: ScopeTree): string | undefined {
  try {
    // Local require avoids a hard cycle and lets unit tests pass plain trees.
    const {
      scriptUsageTracker,
    } = require("../extension/scriptUsageTracker");
    return scriptUsageTracker.getPrimaryFrameByKey?.(tree.key);
  } catch {
    return undefined;
  }
}

/**
 * Compute analysis coverage over every analyzed script's scope tree.
 * Pass `scopeController.pageScopeTrees`.
 */
export function computeCoverage(scopeTrees: ScopeTree[]): CoverageSummary {
  const scripts: ScriptCoverage[] = [];
  let totalNodes = 0;
  let coveredNodes = 0;
  let totalScopes = 0;
  let coveredScopes = 0;
  let analyzedScripts = 0;

  for (const tree of scopeTrees) {
    const sc = computeScriptCoverage(tree);
    scripts.push(sc);
    totalNodes += sc.totalNodes;
    coveredNodes += sc.coveredNodes;
    totalScopes += sc.totalScopes;
    coveredScopes += sc.coveredScopes;
    if (sc.totalNodes > 0) analyzedScripts++;
  }

  // Worst-covered scripts first so the report surfaces blind spots.
  scripts.sort((a, b) => a.nodeCoverage - b.nodeCoverage);

  return {
    totalNodes,
    coveredNodes,
    nodeCoverage: ratio(coveredNodes, totalNodes),
    totalScopes,
    coveredScopes,
    scopeCoverage: ratio(coveredScopes, totalScopes),
    analyzedScripts,
    scripts,
  };
}

/** Format a 0..1 ratio as a percent string with one decimal. */
export function formatCoveragePct(ratio01: number): string {
  return `${(ratio01 * 100).toFixed(1)}%`;
}
