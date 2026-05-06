"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.modelBuilder = void 0;
const cfgBuilder_1 = require("../cfg/cfgBuilder");
const scope_1 = __importDefault(require("../scope/scope"));
const scopeCtrl_1 = require("../scope/scopeCtrl");
const modelFactory_1 = require("./modelFactory");
const modelCtrl_1 = require("./modelCtrl");
const cfgValidator_1 = require("../cfg/cfgValidator");
const logger_1 = __importDefault(require("../utils/logger"));
// export const ChromeAPIMethodsHandle: Map<string, any> = new Map();
// export const ChromeAPIEventsHandle: Map<string, any> = new Map();
/**
 * ModelBuilder
 */
class ModelBuilder {
    /**
     * Set the scope of graph nodes
     */
    static setScopeOfGraphNodes(graph, scopeTree, currentScope) {
        graph.allNodes.forEach((node) => {
            var _a;
            const range = (_a = node.astNode) === null || _a === void 0 ? void 0 : _a.range;
            if (range) {
                node.scope = scopeTree.getNodeScopeByRangeOptimized(range);
            }
            else {
                node.scope = currentScope;
            }
            node.scopeTree = scopeTree;
        });
    }
    /**
     * Produce collection of Model for intra-procedural
     */
    buildIntraProceduralModels() {
        scopeCtrl_1.scopeController.pageScopeTrees.forEach((scopeTree) => {
            this.buildIntraProceduralModelsForAPage(scopeTree);
        });
    }
    /**
     * Produce collection of Model for intra-procedural of a page
     */
    buildIntraProceduralModelsForAPage(scopeTree) {
        scopeTree.scopes.forEach((scope) => {
            if (!scope_1.default.isCFGEligibleScope(scope))
                return;
            const model = modelFactory_1.modelFactory.create();
            this.buildCFGForScope(scope, scopeTree, model);
            model.addRelatedScope(scope);
            modelCtrl_1.modelController.addIntraProceduralModelToAPage(scopeTree, model);
        });
    }
    /**
     * Build CFG for the scope
     */
    buildCFGForScope(scope, scopeTree, model) {
        try {
            const astNode = scope.ast;
            model.graph = this.buildCFGFromScope(scope, astNode);
            if (!model.graph || !cfgValidator_1.cfgValidator.isValidCFG(model.graph)) {
                logger_1.default.warn(`Invalid CFG for scope: ${scope.name}`);
                // console.log(model.graph);
                model.graph = null;
                return;
            }
            // Binding graph nodes to scope
            ModelBuilder.setScopeOfGraphNodes(model.graph, scopeTree, scope);
        }
        catch (error) {
            logger_1.default.error(`Failed to build CFG for scope "${scope.name}": ${String(error)}`);
            model.graph = null;
        }
    }
    /**
     * Choose CFG build methods through scope type
     */
    buildCFGFromScope(scope, node) {
        if (scope_1.default.isFunctionScope(scope)) {
            // IF function socpe, use node.body
            return cfgBuilder_1.cfgBuilder.getCFG(node.body);
        }
        // Page scope or other top scope use the node
        return cfgBuilder_1.cfgBuilder.getCFG(node);
    }
}
exports.modelBuilder = new ModelBuilder();
