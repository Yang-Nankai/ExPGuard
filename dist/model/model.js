"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cfgValidator_1 = require("../cfg/cfgValidator");
const scope_1 = __importDefault(require("../scope/scope"));
const duPair_1 = __importDefault(require("../def-use/types/duPair"));
const def_1 = __importDefault(require("../def-use/types/def"));
/*
 * Model: the Program node and every function is a model
 */
class Model {
    constructor() {
        this._mainlyRelatedScope = null;
        this._graph = null;
        this._returnDef = null;
        this._hasTaintAnalyzed = false;
        this._relatedScopes = [];
        this._dupairs = new Map();
    }
    /**
     * Check for the object is an Model
     * @param {Object} obj An object to be checked
     * @returns {boolean} True, if it is; false, otherwise
     */
    static isModel(obj) {
        return obj instanceof Model;
    }
    /**
     * Check for the scope is related
     * @param {Scope} scope A Scope to be checked
     * @returns {boolean}
     */
    isRelatedToTheScope(scope) {
        return this._relatedScopes.indexOf(scope) !== -1;
    }
    /**
     * Check the scope is mainly related, which means this model is derive from the scope's intra-procedural model
     * @param {Scope} scope A Scope to be checked
     * @returns {boolean} True, if it is; false, otherwise
     */
    isMainlyRelatedToTheScope(scope) {
        return this._mainlyRelatedScope === scope;
    }
    /**
     * Add a related scope
     * @param {Scope} scope Related scope
     */
    addRelatedScope(scope) {
        if (scope_1.default.isScope(scope) && !this.isRelatedToTheScope(scope)) {
            if (this._relatedScopes.length === 0) {
                this._mainlyRelatedScope = scope;
            }
            this._relatedScopes.push(scope);
        }
    }
    /**
     * Check for DUPair has found
     * @param {DUPair} dupair
     * @returns {boolean} True, if found; false, otherwise
     */
    hasDUPair(dupair) {
        if (!duPair_1.default.isDUPair(dupair))
            return false;
        for (const pairs of this._dupairs.values()) {
            for (const pair of pairs) {
                if (pair.def === dupair.def && pair.use === dupair.use) {
                    return true;
                }
            }
        }
        return false;
    }
    /**
     * Data Methods
     */
    get graph() {
        return this._graph ? this._graph : null;
    }
    set graph(graph) {
        if (graph && cfgValidator_1.cfgValidator.isValidCFG(graph)) {
            this._graph = graph;
        }
    }
    get relatedScopes() {
        return [...this._relatedScopes];
    }
    set relatedScopes(scopes) {
        if (Array.isArray(scopes)) {
            this._relatedScopes = [...scopes];
        }
    }
    get dupairs() {
        return new Map(this._dupairs);
    }
    set dupairs(dupairs) {
        if (dupairs instanceof Map) {
            this._dupairs = new Map(dupairs);
        }
    }
    get mainlyRelatedScope() {
        return this._mainlyRelatedScope;
    }
    set mainlyRelatedScope(scope) {
        if (scope_1.default.isScope(scope)) {
            this._mainlyRelatedScope = scope;
        }
    }
    get returnDef() {
        return this._returnDef;
    }
    set returnDef(def) {
        if (def_1.default.isDef(def)) {
            this._returnDef = def;
        }
    }
    set hasTaintAnalyzed(p) {
        this._hasTaintAnalyzed = p;
    }
    get hasTaintAnalyzed() {
        return this._hasTaintAnalyzed;
    }
    isFeatureModel() {
        return !!this.featureSemantic;
    }
}
exports.default = Model;
