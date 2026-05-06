"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const astValidator_1 = require("../ast/astValidator");
const scope_1 = __importDefault(require("./scope"));
const errorCode_1 = require("../utils/errorCode");
/**
 * FunctionScope
 */
class FunctionScope extends scope_1.default {
    constructor(ast, name, isExpressionNameFuncton = false, parent) {
        // assign name if anonymous
        if (!name) {
            const index = FunctionScope.numOfAnonymousFunctions++;
            name = scope_1.default.NAME_ANONYMOUS_FUNCTION_PREFIX + "_" + index;
        }
        super(ast, name, scope_1.default.TYPE_FUNCTION, parent);
        this._isFunctionExpressionNameScope = isExpressionNameFuncton;
    }
    /**
     * Reset the counter of anonymous functions
     */
    static resetAnonymousCounter() {
        this.numOfAnonymousFunctions = 0;
    }
    /**
     * Validate the value for a FunctionScope is valid or not
     */
    static validateFunctionScope(ast, name, parent, msg) {
        // anonymous function
        if (astValidator_1.astValidator.isFunctionLikeExpression(ast) &&
            scope_1.default.isValidParent(parent)) {
            return;
        }
        // named function
        if (astValidator_1.astValidator.isFunctionDeclarationNode(ast) &&
            name &&
            this.isValidName(name) &&
            scope_1.default.isValidParent(parent)) {
            return;
        }
        errorCode_1.Errors.ValidatorError(msg || "Invalid value for a FunctionScope");
    }
    /**
     * Check the name of a FunctionScope is valid or not
     * @param name Name of the scope
     * @returns True if it's valid false otherwise
     */
    static isValidName(name) {
        var normalFunctionNameForamt = /^[_a-zA-Z][_a-zA-Z0-9]*$/i;
        return normalFunctionNameForamt.test(name);
    }
}
FunctionScope.numOfAnonymousFunctions = 0;
exports.default = FunctionScope;
