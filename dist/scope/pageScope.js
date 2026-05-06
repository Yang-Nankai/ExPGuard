"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const scope_1 = __importDefault(require("./scope"));
const astValidator_1 = require("../ast/astValidator");
const errorCode_1 = require("../utils/errorCode");
const builtIn_1 = require("../constants/builtIn");
/**
 * PageScope
 */
class PageScope extends scope_1.default {
    constructor(ast, parent) {
        const index = PageScope.numOfPageScopes++;
        const name = scope_1.default.NAME_PAGE_PREFIX + "_" + index;
        super(ast, name, scope_1.default.TYPE_PAGE, parent);
        this._index = index;
        this._imports = new Map();
        this._exports = new Map();
    }
    static resetCounter() {
        this.numOfPageScopes = 0;
    }
    static getCounter() {
        return this.numOfPageScopes;
    }
    static validate(ast, msg) {
        if (!astValidator_1.astValidator.isProgramNode(ast)) {
            errorCode_1.Errors.ValidatorError(msg || "Invalid value for a PageScope");
        }
    }
    /**
     * Add an imported binding:
     *   import { a as b } -> name = b, def = Def(a)
     */
    addImport(name, def) {
        // TODO: 后续在 ScopeTree 中去实现加入或许，这里也可以
        this.addLocalVariable(name);
        this._imports.set(name, def);
        // [REACHINS]
        this.setReachingDefinition(name, def, true);
        return true;
    }
    /**
     * Add multiple imported bindings
     */
    addImports(entries) {
        for (const [name, def] of entries) {
            this.addImport(name, def);
        }
    }
    /**
     * Export a binding from this page scope
     *   export { a as b } -> name = b, def = Def(a)
     */
    addExport(name, def) {
        this._exports.set(name, def);
        return true;
    }
    addExports(entries) {
        for (const [name, def] of entries) {
            this.addExport(name, def);
        }
    }
    get index() {
        return this._index;
    }
    get imports() {
        return this._imports;
    }
    get exports() {
        return this._exports;
    }
    get builtInObjects() {
        return builtIn_1.PAGE_BUILTINS;
    }
}
PageScope.numOfPageScopes = 0;
exports.default = PageScope;
