"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.featureModelAnalyzer = void 0;
// analyzers/featureModelAnalyzer.ts
const scope_1 = __importDefault(require("../../scope/scope"));
const logger_1 = __importDefault(require("../../utils/logger"));
const features_1 = require("../features/features");
const range_1 = require("../types/range");
class FeatureModelAnalyzer {
    analyze(scope, scopeTree) {
        if (!(scope === null || scope === void 0 ? void 0 : scope.graph))
            return;
        if (!scope_1.default.isPageScope(scope))
            return;
        const ast = scope.ast;
        if (!ast)
            return;
        const matches = features_1.FeatureModelRegistry.matchFunctions(ast);
        for (const { feature, functionNode } of matches) {
            const funcScope = scopeTree.getScopeByRange(new range_1.Range(functionNode.range));
            if (!funcScope)
                continue;
            funcScope.featureSemantic = feature;
            // Mark the function and everything inside it as already taint-analyzed,
            // since the feature semantic replaces the body's CFG walk.
            funcScope.hasTaintAnalyzed = true;
            for (const child of funcScope.getAllDescendants()) {
                child.hasTaintAnalyzed = true;
            }
            logger_1.default.info(`[FEATURE] bind ${feature.id} -> function @[${functionNode.loc.start.line}:${functionNode.loc.start.column}],[${functionNode.loc.end.line}:${functionNode.loc.end.column}] in scope ${funcScope.toString()}`);
        }
    }
}
exports.featureModelAnalyzer = new FeatureModelAnalyzer();
