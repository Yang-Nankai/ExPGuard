import Scope from "../scope/scope";
import ScopeTree from "../scope/scopeTree";
import { CFGResult } from "../cfg/cfgResult";
/**
 * ModelBuilder
 */
declare class ModelBuilder {
    /**
     * Set the scope of graph nodes
     */
    static setScopeOfGraphNodes(graph: CFGResult, scopeTree: ScopeTree, currentScope: Scope): void;
    /**
     * Produce collection of Model for intra-procedural
     */
    buildIntraProceduralModels(): void;
    /**
     * Produce collection of Model for intra-procedural of a page
     */
    buildIntraProceduralModelsForAPage(scopeTree: ScopeTree): void;
    /**
     * Build CFG for the scope
     */
    private buildCFGForScope;
    /**
     * Choose CFG build methods through scope type
     */
    private buildCFGFromScope;
}
export declare const modelBuilder: ModelBuilder;
export {};
