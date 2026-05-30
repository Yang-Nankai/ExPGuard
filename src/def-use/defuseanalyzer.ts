import { builtInAnalyzer } from "./analyzers/builtinAnalyzer";
import { functionDeclarationAnalyzer } from "./analyzers/functionDeclarationAnalyzer";
import { reachingDefAnalyzer } from "./analyzers/reachingDefinitionAnalyzer";
import ScopeTree from "../scope/scopeTree";
import { importAnalyzer } from "./analyzers/importAnalyzer";
import { Errors } from "../utils/errorCode";
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

    // Root scope & CFG
    const rootScope = scopeTree.root;
    if (!rootScope) {
      throw Errors.DFGError("ScopeTree root is null");
    }

    if (!rootScope.graph) {
      throw Errors.DFGError("No main page CFG");
    }

    // Import & feature phase
    // NOTE: feature analysis depends on import result
    if (shouldAnalyze) {
      importAnalyzer.analyze(rootScope, scopeTree);
      featureModelAnalyzer.analyze(rootScope, scopeTree);
    }

    // Pre-scan: built-in & function declarations
    for (const scope of scopeTree.getCFGEligibleScopes()) {
      builtInAnalyzer.analyze(scope);
      functionDeclarationAnalyzer.analyze(scope);
    }

    if (shouldAnalyze) {
      // Inter reaching-definition (root)
      reachingDefAnalyzer.doAnalysis(rootScope);

      // Coverage phase
      if (config.coverageAnalysis) {
        for (const scope of scopeTree.getCFGEligibleScopes()) {
          if (!scope.graph || scope.hasTaintAnalyzed) continue;
          reachingDefAnalyzer.doAnalysis(scope);
        }
      }
    }

    // Export phase
    exportAnalyzer.analyze(rootScope, scopeTree);
  }
}

export const defuseAnalyzer = new DefUseAnalyzer();
