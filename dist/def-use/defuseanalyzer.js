"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.defuseAnalyzer = void 0;
const modelCtrl_1 = require("../model/modelCtrl");
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
        var _a, _b;
        const scriptKey = (_a = scopeTree.script) === null || _a === void 0 ? void 0 : _a.key;
        const libRule = scriptKey ? (0, library_1.detectLibraryByFilename)(scriptKey) : null;
        const isLibrary = Boolean(libRule);
        const shouldAnalyze = !isLibrary || !(libRule === null || libRule === void 0 ? void 0 : libRule.ignore);
        // Clear Environment
        interProceduralAnalyzer_1.interAnalyzer.reset();
        // Root scope & model
        const rootScope = scopeTree.root;
        if (!rootScope) {
            throw errorCode_1.Errors.DFGError("ScopeTree root is null");
        }
        const rootModel = modelCtrl_1.modelController.getIntraProceduralModelByMainlyRelatedScopeFromAPageModels(scopeTree, rootScope);
        if (!(rootModel === null || rootModel === void 0 ? void 0 : rootModel.graph)) {
            throw errorCode_1.Errors.DFGError("No main page model");
        }
        // Import & feature phase
        // NOTE: feature analysis depends on import result
        if (shouldAnalyze) {
            importAnalyzer_1.importAnalyzer.analyze(rootModel, scopeTree);
            featureAnalyzer_1.featureModelAnalyzer.analyze(rootModel, scopeTree);
        }
        // Pre-scan: built-in & function declarations
        const modelCache = new Map();
        for (const scope of scopeTree.getCFGEligibleScopes()) {
            const model = this.getOrCreateModel(scopeTree, scope, modelCache);
            if (!model)
                continue;
            builtinAnalyzer_1.builtInAnalyzer.analyze(model);
            functionDeclarationAnalyzer_1.functionDeclarationAnalyzer.analyze(model);
        }
        if (shouldAnalyze) {
            // Inter reaching-definition (root)
            reachingDefinitionAnalyzer_1.reachingDefAnalyzer.doAnalysis(rootModel);
            // Coverage phase
            if (config_1.default.coverageAnalysis) {
                const pageModels = modelCtrl_1.modelController.getPageModels(scopeTree);
                for (const model of (_b = pageModels === null || pageModels === void 0 ? void 0 : pageModels.intraProceduralModels) !== null && _b !== void 0 ? _b : []) {
                    if (!model || model.hasTaintAnalyzed)
                        continue;
                    reachingDefinitionAnalyzer_1.reachingDefAnalyzer.doAnalysis(model);
                }
            }
        }
        // Export phase
        exportAnalyzer_1.exportAnalyzer.analyze(rootModel, scopeTree);
    }
    getOrCreateModel(scopeTree, scope, cache) {
        if (cache.has(scope))
            return cache.get(scope);
        const model = modelCtrl_1.modelController.getIntraProceduralModelByMainlyRelatedScopeFromAPageModels(scopeTree, scope);
        if (model)
            cache.set(scope, model);
        return model;
    }
}
exports.defuseAnalyzer = new DefUseAnalyzer();
