"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const astValidator_1 = require("../ast/astValidator");
const scope_1 = __importDefault(require("./scope"));
const errorCode_1 = require("../utils/errorCode");
/**
 * BlockScope
 */
class BlockScope extends scope_1.default {
    constructor(ast, parent) {
        const index = BlockScope.numOfBlockScopes++;
        const name = scope_1.default.NAME_BLOCK_PREFIX + '_' + index;
        super(ast, name, scope_1.default.TYPE_BLOCK, parent);
        this._index = index;
    }
    /**
     * Reset the counter of AnonymousFunctionScope
     */
    static resetCounter() {
        this.numOfBlockScopes = 0;
    }
    /**
     * Get the counter of BlockScope
     */
    static getCounter() {
        return this.numOfBlockScopes;
    }
    /**
     * Validate the value of an BlockScope
     * @param ast An AST node of this scope
     * @param [parent] Parent of the scope
     * @param [msg] Custom error message
     */
    static validate(ast, parent, msg) {
        if (!astValidator_1.astValidator.isBlockStatement(ast) ||
            !scope_1.default.isValidParent(parent)) {
            errorCode_1.Errors.ValidatorError(msg || 'Invalid value for an AnonymousFunctionScope');
        }
    }
    get index() {
        return this._index;
    }
}
BlockScope.numOfBlockScopes = 0;
exports.default = BlockScope;
