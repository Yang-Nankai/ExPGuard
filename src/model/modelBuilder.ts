import { cfgBuilder } from "../cfg/cfgBuilder";
import Scope from "../scope/scope";
import { scopeController } from "../scope/scopeCtrl";
import { modelFactory } from "./modelFactory";
import { modelController } from "./modelCtrl";
import Model from "./model";
import { cfgValidator } from "../cfg/cfgValidator";
import ScopeTree from "../scope/scopeTree";
import { CFGResult } from "../cfg/cfgResult";
import logger from "../utils/logger";

// export const ChromeAPIMethodsHandle: Map<string, any> = new Map();
// export const ChromeAPIEventsHandle: Map<string, any> = new Map();

/**
 * ModelBuilder
 */
class ModelBuilder {
  /**
   * Set the scope of graph nodes
   */
  static setScopeOfGraphNodes(
    graph: CFGResult,
    scopeTree: ScopeTree,
    currentScope: Scope
  ) {
    graph.allNodes.forEach((node) => {
      const range = node.astNode?.range;
      if (range) {
        node.scope = scopeTree.getNodeScopeByRangeOptimized(range);
      } else {
        node.scope = currentScope;
      }
      node.scopeTree = scopeTree;
    });
  }

  /**
   * Produce collection of Model for intra-procedural
   */
  buildIntraProceduralModels() {
    scopeController.pageScopeTrees.forEach((scopeTree) => {
      this.buildIntraProceduralModelsForAPage(scopeTree);
    });
  }

  /**
   * Produce collection of Model for intra-procedural of a page
   */
  buildIntraProceduralModelsForAPage(scopeTree: ScopeTree) {
    scopeTree.scopes.forEach((scope) => {
      if (!Scope.isCFGEligibleScope(scope)) return;

      const model = modelFactory.create();
      this.buildCFGForScope(scope, scopeTree, model);

      model.addRelatedScope(scope);
      modelController.addIntraProceduralModelToAPage(scopeTree, model);
    });
  }


  /**
   * Build CFG for the scope
   */
  private buildCFGForScope(scope: Scope, scopeTree: ScopeTree, model: Model) {
    try {
      const astNode = scope.ast as any;

      model.graph = this.buildCFGFromScope(scope, astNode);
      if (!model.graph || !cfgValidator.isValidCFG(model.graph)) {
        logger.warn(`Invalid CFG for scope: ${scope.name}`);
        // console.log(model.graph);
        model.graph = null;
        return;
      }

      // Binding graph nodes to scope
      ModelBuilder.setScopeOfGraphNodes(model.graph, scopeTree, scope);
    } catch (error) {
      logger.error(
        `Failed to build CFG for scope "${scope.name}": ${String(error)}`
      );
      model.graph = null;
    }
  }

  /**
   * Choose CFG build methods through scope type
   */
  private buildCFGFromScope(scope: Scope, node: any) {
    if (Scope.isFunctionScope(scope)) {
      // IF function socpe, use node.body
      return cfgBuilder.getCFG(node.body);
    }

    // Page scope or other top scope use the node
    return cfgBuilder.getCFG(node);
  }
}

export const modelBuilder = new ModelBuilder();
