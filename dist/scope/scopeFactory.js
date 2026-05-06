"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scopeFactory = void 0;
const pageScope_1 = __importDefault(require("./pageScope"));
const extensionScope_1 = __importDefault(require("./extensionScope"));
const functionScope_1 = __importDefault(require("./functionScope"));
const catchScope_1 = __importDefault(require("./catchScope"));
const switchScope_1 = __importDefault(require("./switchScope"));
const withScope_1 = __importDefault(require("./withScope"));
const blockScope_1 = __importDefault(require("./blockScope"));
const forScope_1 = __importDefault(require("./forScope"));
const classScope_1 = __importDefault(require("./classScope"));
/**
 * Simple factory for the Scope class
 */
class ScopeFactory {
    /**
     * Reset the counter of number of anonymous function Scope
     */
    resetAnonymousFunctionScopeCounter() {
        functionScope_1.default.resetAnonymousCounter();
    }
    /**
     * Reset the counter of number of page scopes
     */
    resetPageScopeCounter() {
        pageScope_1.default.resetCounter();
    }
    /**
     * Factory method for page scopes
     */
    createPageScope(ast, parent) {
        return new pageScope_1.default(ast, parent !== null && parent !== void 0 ? parent : null);
    }
    /**
     * Factory method for the extension scope
     */
    createExtensionScope() {
        return new extensionScope_1.default();
    }
    /**
     * Factory method for function scopes
     */
    createFunctionScope(ast, funName, isExpressionNameFuncton, parent) {
        return new functionScope_1.default(ast, funName, isExpressionNameFuncton, parent !== null && parent !== void 0 ? parent : null);
    }
    /**
     * Factory method for catch scopes
     */
    createCatchScope(ast, parent) {
        return new catchScope_1.default(ast, parent !== null && parent !== void 0 ? parent : null);
    }
    /**
     * Factory method for switch scopes
     */
    createSwitchScope(ast, parent) {
        return new switchScope_1.default(ast, parent !== null && parent !== void 0 ? parent : null);
    }
    /**
     * Factory method for with scopes
     */
    createWithScope(ast, parent) {
        return new withScope_1.default(ast, parent !== null && parent !== void 0 ? parent : null);
    }
    /**
     * Factory method for block scopes
     */
    createBlockScope(ast, parent) {
        return new blockScope_1.default(ast, parent !== null && parent !== void 0 ? parent : null);
    }
    /**
     * Factory method for for scopes
     */
    createForScope(ast, parent) {
        return new forScope_1.default(ast, parent !== null && parent !== void 0 ? parent : null);
    }
    /**
     * Factory method for class scopes
     */
    createClassScope(ast, className, parent) {
        return new classScope_1.default(ast, className, parent !== null && parent !== void 0 ? parent : null);
    }
}
exports.scopeFactory = new ScopeFactory();
