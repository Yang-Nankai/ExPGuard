// analyzers/featureModelAnalyzer.ts
import Scope from "../../scope/scope";
import ScopeTree from "../../scope/scopeTree";
import logger from "../../utils/logger";
import { FeatureModelRegistry } from "../features/features";
import { Range } from "../types/range";

class FeatureModelAnalyzer {
  analyze(scope: Scope, scopeTree: ScopeTree) {
    if (!scope?.graph) return;
    if (!Scope.isPageScope(scope)) return;

    const ast = scope.ast;
    if (!ast) return;

    const matches = FeatureModelRegistry.matchFunctions(ast);

    for (const { feature, functionNode } of matches) {
      const funcScope = scopeTree.getScopeByRange(
        new Range(functionNode.range),
      );
      if (!funcScope) continue;

      funcScope.featureSemantic = feature;

      // Mark the function and everything inside it as already taint-analyzed,
      // since the feature semantic replaces the body's CFG walk.
      funcScope.hasTaintAnalyzed = true;
      for (const child of funcScope.getAllDescendants()) {
        child.hasTaintAnalyzed = true;
      }

      logger.info(
        `[FEATURE] bind ${feature.id} -> function @[${functionNode.loc.start.line}:${functionNode.loc.start.column}],[${functionNode.loc.end.line}:${functionNode.loc.end.column}] in scope ${funcScope.toString()}`,
      );
    }
  }
}

export const featureModelAnalyzer = new FeatureModelAnalyzer();
