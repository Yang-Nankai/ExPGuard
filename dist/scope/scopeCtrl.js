"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scopeController = void 0;
const scopeFactory_1 = require("./scopeFactory");
const scopeTreeFactory_1 = require("./scopeTreeFactory");
/**
 * ScopeCtrl
 */
class ScopeCtrl {
    constructor() {
        this._extensionScope = scopeFactory_1.scopeFactory.createExtensionScope();
        this._pageScopeTrees = [];
        this._astList = [];
    }
    /**
     * Add scope tree of a page
     */
    addPageScopeTree(ast, script) {
        const tree = scopeTreeFactory_1.scopeTreeFactory.create(script);
        tree.buildScopeTree(ast);
        this._extensionScope.addChildScope(tree.root);
        this._pageScopeTrees.push(tree);
        this._astList.push(ast);
        return tree;
    }
    /**
     * Get scope tree of a page by script key
     */
    getPageScopeTreeByKey(key) {
        return (this._pageScopeTrees.find((tree) => tree.key === key) ||
            null);
    }
    /**
     * Clear the controller
     */
    clear() {
        this._extensionScope = scopeFactory_1.scopeFactory.createExtensionScope();
        this._pageScopeTrees = [];
        scopeFactory_1.scopeFactory.resetAnonymousFunctionScopeCounter();
        scopeFactory_1.scopeFactory.resetPageScopeCounter();
    }
    /**
     * Data Methods
     */
    get pageScopeTrees() {
        return [...this._pageScopeTrees];
    }
    get extensionScope() {
        return this._extensionScope;
    }
}
exports.scopeController = new ScopeCtrl();
