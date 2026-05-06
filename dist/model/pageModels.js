"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const scopeTree_1 = __importDefault(require("../scope/scopeTree"));
const model_1 = __importDefault(require("./model"));
/**
 * PageModels: the model of a file or program
 */
class PageModels {
    constructor(pageScopeTree) {
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
    static validate(scopeTree, msg) {
        if (!scopeTree_1.default.isScopeTree(scopeTree)) {
            throw new Error(msg || 'Invalid value for a PageModels');
        }
    }
    /**
     * Check the model is an intra-procedural model of this PageModels
     * @param model
     * @returns True, if it is; false, otherwise
     */
    hasTheIntraProceduralModel(model) {
        return this._intraProceduralModels.indexOf(model) !== -1;
    }
    /**
     * Add a model as an intra-procedural model of this PageModels
     * @param model
     */
    addIntraProceduralModel(model) {
        if (model_1.default.isModel(model) && !this.hasTheIntraProceduralModel(model)) {
            this._intraProceduralModels.push(model);
        }
    }
    /**
     * Check the model is an inter-procedural model of this PageModels
     * @param model
     * @returns True, if it is; false, otherwise
     */
    hasTheInterProceduralModel(model) {
        return this._interProceduralModels.indexOf(model) !== -1;
    }
    /**
     * Add a model as an inter-procedural model of this PageModels
     * @param model
     */
    addInterProceduralModel(model) {
        if (model_1.default.isModel(model) && !this.hasTheInterProceduralModel(model)) {
            this._interProceduralModels.push(model);
        }
    }
    /**
     * Check the model is an intra-page model of this PageModels
     * @param model
     * @returns True, if it is; false, otherwise
     */
    hasTheIntraPageModel(model) {
        return this._intraPageModels.indexOf(model) !== -1;
    }
    /**
     * Add a model as an intra-page model of this PageModels
     * @param model
     */
    addIntraPageModel(model) {
        if (model_1.default.isModel(model) && !this.hasTheIntraPageModel(model)) {
            this._intraPageModels.push(model);
        }
    }
    /**
     * Get intra-page model by matching its mainly related scope
     * @param scope
     * @returns The matched model, or null if not found
     */
    getIntraPageModelByMainlyRelatedScope(scope) {
        return this._intraPageModels.find(item => item.isMainlyRelatedToTheScope(scope)) || null;
    }
    /**
     * Get inter-procedural model by matching its mainly related scope
     * @param scope
     * @returns The matched model, or null if not found
     */
    getInterProceduralModelByMainlyRelatedScope(scope) {
        return this._interProceduralModels.find(item => item.isMainlyRelatedToTheScope(scope)) || null;
    }
    /**
     * Get intra-procedural model by matching its mainly related scope
     * @param scope
     * @returns The matched model, or null if not found
     */
    getIntraProceduralModelByMainlyRelatedScope(scope) {
        return this._intraProceduralModels.find(item => item.isMainlyRelatedToTheScope(scope)) || null;
    }
    /**
     * Get a model by matching its mainly related scope
     * @param scope
     * @returns The matched model, or null if not found
     */
    getModelByMainlyRelatedScope(scope) {
        return (this.getIntraPageModelByMainlyRelatedScope(scope) ||
            this.getInterProceduralModelByMainlyRelatedScope(scope) ||
            this.getIntraProceduralModelByMainlyRelatedScope(scope) ||
            null);
    }
    /**
     * Data Methods
     */
    get intraProceduralModels() {
        return [...this._intraProceduralModels];
    }
    set intraProceduralModels(models) {
        if (Array.isArray(models) && models.every(model_1.default.isModel)) {
            this._intraProceduralModels = [...models];
        }
    }
    get interProceduralModels() {
        return [...this._interProceduralModels];
    }
    set interProceduralModels(models) {
        if (Array.isArray(models) && models.every(model_1.default.isModel)) {
            this._interProceduralModels = [...models];
        }
    }
    get intraPageModels() {
        return [...this._intraPageModels];
    }
    set intraPageModels(models) {
        if (Array.isArray(models) && models.every(model_1.default.isModel)) {
            this._intraPageModels = [...models];
        }
    }
    get pageScopeTree() {
        return this._pageScopeTree;
    }
}
exports.default = PageModels;
