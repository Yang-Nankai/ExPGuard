"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.featureModelAnalyzer = void 0;
const modelCtrl_1 = require("../../model/modelCtrl");
const scope_1 = __importDefault(require("../../scope/scope"));
const logger_1 = __importDefault(require("../../utils/logger"));
const features_1 = require("../features/features");
const range_1 = require("../types/range");
class FeatureModelAnalyzer {
    analyze(model, scopeTree) {
        if (!(model === null || model === void 0 ? void 0 : model.graph))
            return;
        const scope = model.mainlyRelatedScope;
        if (!scope || !scope_1.default.isPageScope(scope))
            return;
        const ast = scope.ast;
        if (!ast)
            return;
        const matches = features_1.FeatureModelRegistry.matchFunctions(ast);
        for (const { feature, functionNode } of matches) {
            const funcScope = scopeTree.getScopeByRange(new range_1.Range(functionNode.range));
            if (!funcScope)
                continue;
            const funcModel = modelCtrl_1.modelController.getIntraProceduralModelByMainlyRelatedScopeFromAPageModels(scopeTree, funcScope);
            if (!funcModel)
                continue;
            funcModel.featureSemantic = feature;
            // TODO: the code here will be beautified later.
            funcModel.hasTaintAnalyzed = true;
            const children = funcScope.getAllDescendants();
            for (const child of children) {
                const model = modelCtrl_1.modelController.getIntraProceduralModelByMainlyRelatedScopeFromAPageModels(scopeTree, child);
                if (model)
                    model.hasTaintAnalyzed = true;
            }
            logger_1.default.info(`[FEATURE] bind ${feature.id} -> function @[${functionNode.loc.start.line}:${functionNode.loc.start.column}],[${functionNode.loc.end.line}:${functionNode.loc.end.column}] in scope ${funcScope.toString()}`);
        }
    }
}
exports.featureModelAnalyzer = new FeatureModelAnalyzer();
