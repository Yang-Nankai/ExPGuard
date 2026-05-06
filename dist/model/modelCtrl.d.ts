import Scope from "../scope/scope";
import ScopeTree from "../scope/scopeTree";
import Model from "./model";
import PageModels from "./pageModels";
/**
 * ModelCtrl
 */
declare class ModelCtrl {
    private _collectionOfPageModels;
    private _interPageModel;
    constructor();
    /**
     * Check if there is a PageModels of corresponding ScopeTree
     */
    hasPageModels(scopeTree: ScopeTree): boolean;
    /**
     * Get a PageModels by corresponding ScopeTree
     */
    getPageModels(scopeTree: ScopeTree): PageModels | null;
    /**
     * Create and add a PageModels
     */
    addPageModels(scopeTree: ScopeTree): void;
    /**
     * Get intra-page model from a PageModels
     */
    getIntraPageModelByMainlyRelatedScopeFromAPageModels(pageScopeTree: ScopeTree, scope: Scope): Model | null;
    /**
     * Get inter-procedural model from a PageModels
     */
    getInterProceduralModelByMainlyRelatedScopeFromAPageModels(pageScopeTree: ScopeTree, scope: Scope): Model | null;
    /**
     * Get intra-procedural model from a PageModels
     */
    getIntraProceduralModelByMainlyRelatedScopeFromAPageModels(pageScopeTree: ScopeTree, scope: Scope): Model | null;
    /**
     * Get a model by its mainly related scope from a PageModels
     */
    getModelByMainlyRelatedScopeFromAPageModels(pageScopeTree: ScopeTree, scope: Scope): Model | null;
    /**
     * Initialize PageModels for each page
     */
    initializePageModels(): void;
    /**
     * Add an intra-procedural model to a page
     */
    addIntraProceduralModelToAPage(pageScopeTree: ScopeTree, model: Model): void;
    /**
     * Add an inter-procedural model to a page
     */
    addInterProceduralModelToAPage(pageScopeTree: ScopeTree, model: Model): void;
    /**
     * Add an intra-page model to a page
     */
    addIntraPageModelToAPage(pageScopeTree: ScopeTree, model: Model): void;
    /**
     * Clear model collection
     */
    clear(): void;
    /**
     * Data Methods
     */
    get interPageModel(): Model | null;
    set interPageModel(model: Model | null);
    get collectionOfPageModels(): Map<ScopeTree, PageModels>;
}
export declare const modelController: ModelCtrl;
export {};
