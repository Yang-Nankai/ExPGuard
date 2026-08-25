import { builtInAnalyzer } from "./analyzers/builtinAnalyzer";
import { functionDeclarationAnalyzer } from "./analyzers/functionDeclarationAnalyzer";
import { reachingDefAnalyzer } from "./analyzers/reachingDefinitionAnalyzer";
import ScopeTree from "../scope/scopeTree";
import { importAnalyzer } from "./analyzers/importAnalyzer";
import { Errors } from "../utils/errorCode";
import { exportAnalyzer } from "./analyzers/exportAnalyzer";
import { interAnalyzer } from "./analyzers/interProceduralAnalyzer";
import { featureModelAnalyzer } from "./analyzers/featureAnalyzer";
import { entryPointAnalyzer } from "./analyzers/entryPointAnalyzer";
import { detectLibraryByContent, detectLibraryByFilename } from "../constants/library";
import config from "../config";
import logger from "../utils/logger";

// File Level Analyzer
class DefUseAnalyzer {
  buildInterProceduralModelsPDG(scopeTree: ScopeTree): void {
    const scriptKey = scopeTree.script?.key;

    // Identify third-party libraries: first by filename, then (for bundled /
    // inlined frameworks that filename can't reveal) by content signature.
    let libRule = scriptKey ? detectLibraryByFilename(scriptKey) : null;
    if (!libRule) {
      const code = scopeTree.script?.getCode?.();
      if (code) libRule = detectLibraryByContent(code);
    }

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

    // Import & feature phase. Module resolution is an independent capability
    // so ablation can leave ordinary function/callback analysis intact.
    // NOTE: feature analysis depends on import result.
    if (shouldAnalyze) {
      if (config.enableModuleResolution) {
        importAnalyzer.analyze(rootScope, scopeTree);
      }
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

      // Entry-point sweep: re-enter functions the root pass never reached
      // (callbacks handed to unmodeled APIs, dispatch tables, ...).
      if (config.coverageAnalysis) {
        const swept = entryPointAnalyzer.sweep(scopeTree);
        if (swept > 0) {
          logger.debug(
            `[ENTRY-SWEEP] ${scopeTree.key}: analyzed ${swept} previously unreached scope(s)`,
          );
        }
      }
    }

    // Export phase: disable it together with imports so no module binding can
    // be materialized in the no-module-resolution ablation.
    if (config.enableModuleResolution) {
      exportAnalyzer.analyze(rootScope, scopeTree);
    }
  }
}

export const defuseAnalyzer = new DefUseAnalyzer();
