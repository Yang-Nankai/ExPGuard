import Scope from "../scope/scope";
import ScopeTree from "../scope/scopeTree";
import Model from "./model";
/**
 * PageModels: the model of a file or program
 */
declare class PageModels {
    private _pageScopeTree;
    private _intraProceduralModels;
    private _interProceduralModels;
    private _intraPageModels;
    constructor(pageScopeTree: ScopeTree);
    /**
     * Validator for the input value of PageModels
     * @param scopeTree The ScopeTree of a page
     * @param [msg] Custom error message
     * @throws "Invalid value for a PageModels" | Custom error message
     */
    static validate(scopeTree: ScopeTree, msg?: string): void;
    /**
     * Check the model is an intra-procedural model of this PageModels
     * @param model
     * @returns True, if it is; false, otherwise
     */
    hasTheIntraProceduralModel(model: Model): boolean;
    /**
     * Add a model as an intra-procedural model of this PageModels
     * @param model
     */
    addIntraProceduralModel(model: Model): void;
    /**
     * Check the model is an inter-procedural model of this PageModels
     * @param model
     * @returns True, if it is; false, otherwise
     */
    hasTheInterProceduralModel(model: Model): boolean;
    /**
     * Add a model as an inter-procedural model of this PageModels
     * @param model
     */
    addInterProceduralModel(model: Model): void;
    /**
     * Check the model is an intra-page model of this PageModels
     * @param model
     * @returns True, if it is; false, otherwise
     */
    hasTheIntraPageModel(model: Model): boolean;
    /**
     * Add a model as an intra-page model of this PageModels
     * @param model
     */
    addIntraPageModel(model: Model): void;
    /**
     * Get intra-page model by matching its mainly related scope
     * @param scope
     * @returns The matched model, or null if not found
     */
    getIntraPageModelByMainlyRelatedScope(scope: Scope): Model | null;
    /**
     * Get inter-procedural model by matching its mainly related scope
     * @param scope
     * @returns The matched model, or null if not found
     */
    getInterProceduralModelByMainlyRelatedScope(scope: Scope): Model | null;
    /**
     * Get intra-procedural model by matching its mainly related scope
     * @param scope
     * @returns The matched model, or null if not found
     */
    getIntraProceduralModelByMainlyRelatedScope(scope: Scope): Model | null;
    /**
     * Get a model by matching its mainly related scope
     * @param scope
     * @returns The matched model, or null if not found
     */
    getModelByMainlyRelatedScope(scope: Scope): Model | null;
    /**
     * Data Methods
     */
    get intraProceduralModels(): Model[];
    set intraProceduralModels(models: Model[]);
    get interProceduralModels(): Model[];
    set interProceduralModels(models: Model[]);
    get intraPageModels(): Model[];
    set intraPageModels(models: Model[]);
    get pageScopeTree(): ScopeTree;
}
export default PageModels;
