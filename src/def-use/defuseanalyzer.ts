import { modelController } from "../model/modelCtrl";
import { builtInAnalyzer } from "./analyzers/builtinAnalyzer";
import { functionDeclarationAnalyzer } from "./analyzers/functionDeclarationAnalyzer";
import { reachingDefAnalyzer } from "./analyzers/reachingDefinitionAnalyzer";
import ScopeTree from "../scope/scopeTree";
import { importAnalyzer } from "./analyzers/importAnalyzer";
import { Errors } from "../utils/errorCode";
import Scope from "../scope/scope";
import Model from "../model/model";
import { exportAnalyzer } from "./analyzers/exportAnalyzer";
import { interAnalyzer } from "./analyzers/interProceduralAnalyzer";
import { featureModelAnalyzer } from "./analyzers/featureAnalyzer";
import { detectLibraryByFilename } from "../constants/library";
import config from "../config";

// File Level Analyzer
class DefUseAnalyzer {
  buildInterProceduralModelsPDG(scopeTree: ScopeTree): void {
    const scriptKey = scopeTree.script?.key;
    const libRule = scriptKey ? detectLibraryByFilename(scriptKey) : null;
    const isLibrary = Boolean(libRule);
    const shouldAnalyze = !isLibrary || !libRule?.ignore;

    // Clear Environment
    interAnalyzer.reset();

    // Root scope & model
    const rootScope = scopeTree.root;
    if (!rootScope) {
      throw Errors.DFGError("ScopeTree root is null");
    }

    const rootModel =
      modelController.getIntraProceduralModelByMainlyRelatedScopeFromAPageModels(
        scopeTree,
        rootScope,
      );

    if (!rootModel?.graph) {
      throw Errors.DFGError("No main page model");
    }

    // Import & feature phase
    // NOTE: feature analysis depends on import result
    if (shouldAnalyze) {
      importAnalyzer.analyze(rootModel, scopeTree);
      featureModelAnalyzer.analyze(rootModel, scopeTree);
    }

    // Pre-scan: built-in & function declarations
    const modelCache = new Map<Scope, Model>();

    for (const scope of scopeTree.getCFGEligibleScopes()) {
      const model = this.getOrCreateModel(scopeTree, scope, modelCache);
      if (!model) continue;

      builtInAnalyzer.analyze(model);
      functionDeclarationAnalyzer.analyze(model);
    }

    if (shouldAnalyze) {
      // Inter reaching-definition (root)
      reachingDefAnalyzer.doAnalysis(rootModel);

      // Coverage phase
      if (config.coverageAnalysis) {
        const pageModels = modelController.getPageModels(scopeTree);
        for (const model of pageModels?.intraProceduralModels ?? []) {
          if (!model || model.hasTaintAnalyzed) continue;
          reachingDefAnalyzer.doAnalysis(model);
        }
      }
    }

    // Export phase
    exportAnalyzer.analyze(rootModel, scopeTree);
  }

  private getOrCreateModel(
    scopeTree: ScopeTree,
    scope: Scope,
    cache: Map<Scope, Model>,
  ): Model | null {
    if (cache.has(scope)) return cache.get(scope)!;

    const model =
      modelController.getIntraProceduralModelByMainlyRelatedScopeFromAPageModels(
        scopeTree,
        scope,
      );

    if (model) cache.set(scope, model);

    return model;
  }
}

export const defuseAnalyzer = new DefUseAnalyzer();
