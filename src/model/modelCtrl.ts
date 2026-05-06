import Scope from "../scope/scope";
import { scopeController } from "../scope/scopeCtrl";
import ScopeTree from "../scope/scopeTree";
import Model from "./model";
import PageModels from "./pageModels";
import { pageModelsFactory } from "./pageModelsFactory";


/**
 * ModelCtrl
 */
class ModelCtrl {
    private _collectionOfPageModels: Map<ScopeTree, PageModels>;
    private _interPageModel: Model | null;

    constructor() {
        this._collectionOfPageModels = new Map();
        this._interPageModel = null;
    }

    /**
     * Check if there is a PageModels of corresponding ScopeTree
     */
    hasPageModels(scopeTree: ScopeTree): boolean {
        return this._collectionOfPageModels.has(scopeTree);
    }

    /**
     * Get a PageModels by corresponding ScopeTree
     */
    getPageModels(scopeTree: ScopeTree) {
        return this._collectionOfPageModels.get(scopeTree) || null;
    }

    /**
     * Create and add a PageModels
     */
    addPageModels(scopeTree: ScopeTree) {
        if (!this.hasPageModels(scopeTree)) {
            const pageModels = pageModelsFactory.create(scopeTree);
            this._collectionOfPageModels.set(scopeTree, pageModels);
        }
    }

    /**
     * Get intra-page model from a PageModels
     */
    getIntraPageModelByMainlyRelatedScopeFromAPageModels(pageScopeTree: ScopeTree, scope: Scope): Model | null {
        const pageModels = this.getPageModels(pageScopeTree);
        return pageModels ? pageModels.getIntraPageModelByMainlyRelatedScope(scope) : null;
    }

    /**
     * Get inter-procedural model from a PageModels
     */
    getInterProceduralModelByMainlyRelatedScopeFromAPageModels(pageScopeTree: ScopeTree, scope: Scope): Model | null {
        const pageModels = this.getPageModels(pageScopeTree);
        return pageModels ? pageModels.getInterProceduralModelByMainlyRelatedScope(scope) : null;
    }

    /**
     * Get intra-procedural model from a PageModels
     */
    getIntraProceduralModelByMainlyRelatedScopeFromAPageModels(pageScopeTree: ScopeTree, scope: Scope): Model | null {
        const pageModels = this.getPageModels(pageScopeTree);
        return pageModels ? pageModels.getIntraProceduralModelByMainlyRelatedScope(scope) : null;
    }

    /**
     * Get a model by its mainly related scope from a PageModels
     */
    getModelByMainlyRelatedScopeFromAPageModels(pageScopeTree: ScopeTree, scope: Scope): Model | null {
        return this.getIntraPageModelByMainlyRelatedScopeFromAPageModels(pageScopeTree, scope) ||
               this.getInterProceduralModelByMainlyRelatedScopeFromAPageModels(pageScopeTree, scope) ||
               this.getIntraProceduralModelByMainlyRelatedScopeFromAPageModels(pageScopeTree, scope) ||
               null;
    }

    /**
     * Initialize PageModels for each page
     */
    initializePageModels() {
        let theModelCtrl = this;
        scopeController.pageScopeTrees.forEach((pageScopeTree) => {
            theModelCtrl.addPageModels(pageScopeTree);
        });
    }

    /**
     * Add an intra-procedural model to a page
     */
    addIntraProceduralModelToAPage(pageScopeTree: ScopeTree, model: Model) {
        const pageModels = this.getPageModels(pageScopeTree);
        if (pageModels) {
            pageModels.addIntraProceduralModel(model);
        }
    }

    /**
     * Add an inter-procedural model to a page
     */
    addInterProceduralModelToAPage(pageScopeTree: ScopeTree, model: Model) {
        const pageModels = this.getPageModels(pageScopeTree);
        if (!!pageModels) {
            pageModels.addInterProceduralModel(model);
        }
    }

    /**
     * Add an intra-page model to a page
     */
    addIntraPageModelToAPage(pageScopeTree: ScopeTree, model: Model) {
        const pageModels = this.getPageModels(pageScopeTree);
        if (!!pageModels) {
            pageModels.addIntraPageModel(model);
        }
    }

    /**
     * Clear model collection
     */
    clear() {
        this._interPageModel = null;
        this._collectionOfPageModels = new Map();
    }


    /**
     * Data Methods
     */
    get interPageModel() {
        return this._interPageModel;
    }

    set interPageModel(model) {
        if (Model.isModel(model)) {
            this._interPageModel = model;
        }
    }

    get collectionOfPageModels() {
        return new Map(this._collectionOfPageModels);
    }

}

export const modelController = new ModelCtrl();