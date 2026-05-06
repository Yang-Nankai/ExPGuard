"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reachingDefAnalyzer = exports.ReachingDefinitionAnalyzer = void 0;
const flownode_1 = require("../../flownode/flownode");
const scope_1 = __importDefault(require("../../scope/scope"));
const worklist_1 = require("../../utils/worklist");
const generateHandler_1 = require("../handlers/generateHandler");
const pureExpressionHandler_1 = require("../handlers/pureExpressionHandler");
const utils_1 = require("../utils/utils");
/**
 * Reaching Definition Analyzer
 * Performs forward intra/inter-procedural analysis on the CFG.
 */
class ReachingDefinitionAnalyzer {
    doAnalysis(model) {
        if (!(model === null || model === void 0 ? void 0 : model.graph))
            return;
        // mark analysis executed
        model.hasTaintAnalyzed = true;
        (0, worklist_1.worklist)(model.graph, function (queue) {
            if (!this.scope || flownode_1.FlowNode.isEntryType(this))
                return;
            (0, generateHandler_1.computeGenFromAST)(this);
            (0, pureExpressionHandler_1.evaluatePureExpressions)(this);
            const feasible = (0, utils_1.getFeasibleSuccessors)(this);
            if (feasible != null) {
                feasible.forEach((succ) => queue.push(succ));
                // do not push in worklist
                return false;
            }
        }, { direction: "forward" });
        // clear reaching definitions when exiting non-page scope
        const scope = model.mainlyRelatedScope;
        if (scope && !scope_1.default.isPageScope(scope)) {
            scope.resetReachingDefinitions();
        }
    }
}
exports.ReachingDefinitionAnalyzer = ReachingDefinitionAnalyzer;
exports.reachingDefAnalyzer = new ReachingDefinitionAnalyzer();
