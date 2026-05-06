// analyzers/featureModelAnalyzer.ts
import Model from "../../model/model";
import { modelController } from "../../model/modelCtrl";
import Scope from "../../scope/scope";
import ScopeTree from "../../scope/scopeTree";
import logger from "../../utils/logger";
import { FeatureModelRegistry } from "../features/features";
import { Range } from "../types/range";

class FeatureModelAnalyzer {
  analyze(model: Model, scopeTree: ScopeTree) {
    if (!model?.graph) return;

    const scope = model.mainlyRelatedScope;
    if (!scope || !Scope.isPageScope(scope)) return;

    const ast = scope.ast;
    if (!ast) return;

    const matches = FeatureModelRegistry.matchFunctions(ast);

    for (const { feature, functionNode } of matches) {
      const funcScope = scopeTree.getScopeByRange(
        new Range(functionNode.range),
      );
      if (!funcScope) continue;

      const funcModel =
        modelController.getIntraProceduralModelByMainlyRelatedScopeFromAPageModels(
          scopeTree,
          funcScope,
        );
      if (!funcModel) continue;

      funcModel.featureSemantic = feature;

      // TODO: the code here will be beautified later.
      funcModel.hasTaintAnalyzed = true;
      const children = funcScope.getAllDescendants();
      for (const child of children) {
        const model =
          modelController.getIntraProceduralModelByMainlyRelatedScopeFromAPageModels(
            scopeTree,
            child,
          );
        if (model) model.hasTaintAnalyzed = true;
      }

      logger.info(
        `[FEATURE] bind ${feature.id} -> function @[${functionNode.loc.start.line}:${functionNode.loc.start.column}],[${functionNode.loc.end.line}:${functionNode.loc.end.column}] in scope ${funcScope.toString()}`,
      );
    }
  }
}

export const featureModelAnalyzer = new FeatureModelAnalyzer();
