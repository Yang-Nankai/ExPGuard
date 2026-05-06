"use strict";
/*
 * Simple factory for ScopeTree
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scopeTreeFactory = void 0;
const scopeTree_1 = __importDefault(require("./scopeTree"));
class ScopeTreeFactory {
    /**
     * Create a ScopeTree
     * @returns A ScopeTree
     */
    create(script) {
        return new scopeTree_1.default(script);
    }
}
exports.scopeTreeFactory = new ScopeTreeFactory();
