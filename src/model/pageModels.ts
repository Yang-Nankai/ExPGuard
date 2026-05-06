import Scope from "../scope/scope";
import ScopeTree from "../scope/scopeTree";
import Model from "./model";


/**
 * PageModels: the model of a file or program
 */
class PageModels {
    private _pageScopeTree: ScopeTree;
    private _intraProceduralModels: Model[];
    private _interProceduralModels: Model[];
    private _intraPageModels: Model[];

    constructor(pageScopeTree: ScopeTree){
        this._pageScopeTree = pageScopeTree;
        this._intraProceduralModels = [];
        this._interProceduralModels = [];
        this._intraPageModels = [];
    }

    /**
     * Validator for the input value of PageModels
     * @param scopeTree The ScopeTree of a page
     * @param [msg] Custom error message
     * @throws "Invalid value for a PageModels" | Custom error message
     */
    static validate(scopeTree: ScopeTree, msg?: string) {
        if (!ScopeTree.isScopeTree(scopeTree)) {
            throw new Error(msg || 'Invalid value for a PageModels');
        }
    }

    /**
     * Check the model is an intra-procedural model of this PageModels
     * @param model
     * @returns True, if it is; false, otherwise
     */
    hasTheIntraProceduralModel(model: Model): boolean {
        return this._intraProceduralModels.indexOf(model) !== -1;
    }

    /**
     * Add a model as an intra-procedural model of this PageModels
     * @param model
     */
    addIntraProceduralModel(model: Model) {
        if (Model.isModel(model) && !this.hasTheIntraProceduralModel(model)) {
            this._intraProceduralModels.push(model);
        }
    }

    /**
     * Check the model is an inter-procedural model of this PageModels
     * @param model
     * @returns True, if it is; false, otherwise
     */
    hasTheInterProceduralModel(model: Model): boolean {
        return this._interProceduralModels.indexOf(model) !== -1;
    }

    /**
     * Add a model as an inter-procedural model of this PageModels
     * @param model
     */
    addInterProceduralModel(model: Model) {
        if (Model.isModel(model) && !this.hasTheInterProceduralModel(model)) {
            this._interProceduralModels.push(model);
        }
    }

    /**
     * Check the model is an intra-page model of this PageModels
     * @param model
     * @returns True, if it is; false, otherwise
     */
    hasTheIntraPageModel(model: Model): boolean {
        return this._intraPageModels.indexOf(model) !== -1;
    }

    /**
     * Add a model as an intra-page model of this PageModels
     * @param model
     */
    addIntraPageModel(model: Model) {
        if (Model.isModel(model) && !this.hasTheIntraPageModel(model)) {
            this._intraPageModels.push(model);
        }
    }

    /**
     * Get intra-page model by matching its mainly related scope
     * @param scope
     * @returns The matched model, or null if not found
     */
    getIntraPageModelByMainlyRelatedScope(scope: Scope): Model | null {
        return this._intraPageModels.find(item => item.isMainlyRelatedToTheScope(scope)) || null;
    }

    /**
     * Get inter-procedural model by matching its mainly related scope
     * @param scope
     * @returns The matched model, or null if not found
     */
    getInterProceduralModelByMainlyRelatedScope(scope: Scope): Model | null {
        return this._interProceduralModels.find(item => item.isMainlyRelatedToTheScope(scope)) || null;
    }

    /**
     * Get intra-procedural model by matching its mainly related scope
     * @param scope
     * @returns The matched model, or null if not found
     */
    getIntraProceduralModelByMainlyRelatedScope(scope: Scope): Model | null {
        return this._intraProceduralModels.find(item => item.isMainlyRelatedToTheScope(scope)) || null;
    }

    /**
     * Get a model by matching its mainly related scope
     * @param scope
     * @returns The matched model, or null if not found
     */
    getModelByMainlyRelatedScope(scope: Scope): Model | null {
        return (
            this.getIntraPageModelByMainlyRelatedScope(scope) ||
            this.getInterProceduralModelByMainlyRelatedScope(scope) ||
            this.getIntraProceduralModelByMainlyRelatedScope(scope) ||
            null
        );
    }


    /**
     * Data Methods
     */
    get intraProceduralModels(): Model[] {
        return [...this._intraProceduralModels];
    }

    set intraProceduralModels(models: Model[]) {
        if (Array.isArray(models) && models.every(Model.isModel)) {
            this._intraProceduralModels = [...models];
        }
    }

    get interProceduralModels(): Model[] {
        return [...this._interProceduralModels];
    }

    set interProceduralModels(models: Model[]) {
        if (Array.isArray(models) && models.every(Model.isModel)) {
            this._interProceduralModels = [...models];
        }
    }

    get intraPageModels(): Model[] {
        return [...this._intraPageModels];
    }

    set intraPageModels(models: Model[]) {
        if (Array.isArray(models) && models.every(Model.isModel)) {
            this._intraPageModels = [...models];
        }
    }

    get pageScopeTree(): ScopeTree {
        return this._pageScopeTree;
    }
}

export default PageModels;