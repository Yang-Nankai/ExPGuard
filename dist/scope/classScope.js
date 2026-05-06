"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const astValidator_1 = require("../ast/astValidator");
const scope_1 = __importDefault(require("./scope"));
const errorCode_1 = require("../utils/errorCode");
/**
 * ClassScope
 */
class ClassScope extends scope_1.default {
    constructor(ast, name, parent) {
        // assign name if anonymous
        if (!name) {
            const index = ClassScope.numOfAnonymousClasses++;
            name = scope_1.default.NAME_ANONYMOUS_CLASS_PREFIX + "_" + index;
        }
        super(ast, name, scope_1.default.TYPE_CLASS, parent);
    }
    /**
     * Check the name of a ClassScope is valid or not
     * @param name Name of the scope
     * @returns True if it's valid false otherwise
     */
    static isValidName(name) {
        var normalClassNameForamt = /^[_a-zA-Z][_a-zA-Z0-9]*$/i;
        return normalClassNameForamt.test(name);
    }
    /**
     * Validate the value for a ClassScope is valid or not
     * @param ast An AST node
     * @param name Name of the scope
     * @param [parent] Parent scope
     * @param [msg] Custom error message
     * @throws  "Invalid value for a ClassScope" | Custom error message
     */
    static validateClassScope(ast, name, parent, msg) {
        if (!astValidator_1.astValidator.isClassNode(ast) ||
            !this.isValidName(name) ||
            !scope_1.default.isValidParent(parent)) {
            errorCode_1.Errors.ValidatorError(msg || 'Invalid value for a ClassScope');
        }
    }
}
ClassScope.numOfAnonymousClasses = 0;
exports.default = ClassScope;
