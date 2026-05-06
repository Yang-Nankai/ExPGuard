"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.modelController = void 0;
const scopeCtrl_1 = require("../scope/scopeCtrl");
const model_1 = __importDefault(require("./model"));
const pageModelsFactory_1 = require("./pageModelsFactory");
/**
 * ModelCtrl
 */
class ModelCtrl {
    constructor() {
        this._collectionOfPageModels = new Map();
        this._interPageModel = null;
    }
    /**
     * Check if there is a PageModels of corresponding ScopeTree
     */
    hasPageModels(scopeTree) {
        return this._collectionOfPageModels.has(scopeTree);
    }
    /**
     * Get a PageModels by corresponding ScopeTree
     */
    getPageModels(scopeTree) {
        return this._collectionOfPageModels.get(scopeTree) || null;
    }
    /**
     * Create and add a PageModels
     */
    addPageModels(scopeTree) {
        if (!this.hasPageModels(scopeTree)) {
            const pageModels = pageModelsFactory_1.pageModelsFactory.create(scopeTree);
            this._collectionOfPageModels.set(scopeTree, pageModels);
        }
    }
    /**
     * Get intra-page model from a PageModels
     */
    getIntraPageModelByMainlyRelatedScopeFromAPageModels(pageScopeTree, scope) {
        const pageModels = this.getPageModels(pageScopeTree);
        return pageModels ? pageModels.getIntraPageModelByMainlyRelatedScope(scope) : null;
    }
    /**
     * Get inter-procedural model from a PageModels
     */
    getInterProceduralModelByMainlyRelatedScopeFromAPageModels(pageScopeTree, scope) {
        const pageModels = this.getPageModels(pageScopeTree);
        return pageModels ? pageModels.getInterProceduralModelByMainlyRelatedScope(scope) : null;
    }
    /**
     * Get intra-procedural model from a PageModels
     */
    getIntraProceduralModelByMainlyRelatedScopeFromAPageModels(pageScopeTree, scope) {
        const pageModels = this.getPageModels(pageScopeTree);
        return pageModels ? pageModels.getIntraProceduralModelByMainlyRelatedScope(scope) : null;
    }
    /**
     * Get a model by its mainly related scope from a PageModels
     */
    getModelByMainlyRelatedScopeFromAPageModels(pageScopeTree, scope) {
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
        scopeCtrl_1.scopeController.pageScopeTrees.forEach((pageScopeTree) => {
            theModelCtrl.addPageModels(pageScopeTree);
        });
    }
    /**
     * Add an intra-procedural model to a page
     */
    addIntraProceduralModelToAPage(pageScopeTree, model) {
        const pageModels = this.getPageModels(pageScopeTree);
        if (pageModels) {
            pageModels.addIntraProceduralModel(model);
        }
    }
    /**
     * Add an inter-procedural model to a page
     */
    addInterProceduralModelToAPage(pageScopeTree, model) {
        const pageModels = this.getPageModels(pageScopeTree);
        if (!!pageModels) {
            pageModels.addInterProceduralModel(model);
        }
    }
    /**
     * Add an intra-page model to a page
     */
    addIntraPageModelToAPage(pageScopeTree, model) {
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
        if (model_1.default.isModel(model)) {
            this._interPageModel = model;
        }
    }
    get collectionOfPageModels() {
        return new Map(this._collectionOfPageModels);
    }
}
exports.modelController = new ModelCtrl();
