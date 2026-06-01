"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.defuseAnalyzer = void 0;
const builtinAnalyzer_1 = require("./analyzers/builtinAnalyzer");
const functionDeclarationAnalyzer_1 = require("./analyzers/functionDeclarationAnalyzer");
const reachingDefinitionAnalyzer_1 = require("./analyzers/reachingDefinitionAnalyzer");
const importAnalyzer_1 = require("./analyzers/importAnalyzer");
const errorCode_1 = require("../utils/errorCode");
const exportAnalyzer_1 = require("./analyzers/exportAnalyzer");
const interProceduralAnalyzer_1 = require("./analyzers/interProceduralAnalyzer");
const featureAnalyzer_1 = require("./analyzers/featureAnalyzer");
const library_1 = require("../constants/library");
const config_1 = __importDefault(require("../config"));
// File Level Analyzer
class DefUseAnalyzer {
    buildInterProceduralModelsPDG(scopeTree) {
        var _a;
        const scriptKey = (_a = scopeTree.script) === null || _a === void 0 ? void 0 : _a.key;
        const libRule = scriptKey ? (0, library_1.detectLibraryByFilename)(scriptKey) : null;
        const isLibrary = Boolean(libRule);
        const shouldAnalyze = !isLibrary || !(libRule === null || libRule === void 0 ? void 0 : libRule.ignore);
        // Clear Environment
        interProceduralAnalyzer_1.interAnalyzer.reset();
        // Root scope & CFG
        const rootScope = scopeTree.root;
        if (!rootScope) {
            throw errorCode_1.Errors.DFGError("ScopeTree root is null");
        }
        if (!rootScope.graph) {
            throw errorCode_1.Errors.DFGError("No main page CFG");
        }
        // Import & feature phase
        // NOTE: feature analysis depends on import result
        if (shouldAnalyze) {
            importAnalyzer_1.importAnalyzer.analyze(rootScope, scopeTree);
            featureAnalyzer_1.featureModelAnalyzer.analyze(rootScope, scopeTree);
        }
        // Pre-scan: built-in & function declarations
        for (const scope of scopeTree.getCFGEligibleScopes()) {
            builtinAnalyzer_1.builtInAnalyzer.analyze(scope);
            functionDeclarationAnalyzer_1.functionDeclarationAnalyzer.analyze(scope);
        }
        if (shouldAnalyze) {
            // Inter reaching-definition (root)
            reachingDefinitionAnalyzer_1.reachingDefAnalyzer.doAnalysis(rootScope);
            // Coverage phase
            if (config_1.default.coverageAnalysis) {
                for (const scope of scopeTree.getCFGEligibleScopes()) {
                    if (!scope.graph || scope.hasTaintAnalyzed)
                        continue;
                    reachingDefinitionAnalyzer_1.reachingDefAnalyzer.doAnalysis(scope);
                }
            }
        }
        // Export phase
        exportAnalyzer_1.exportAnalyzer.analyze(rootScope, scopeTree);
    }
}
exports.defuseAnalyzer = new DefUseAnalyzer();
