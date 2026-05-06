"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const scope_1 = __importDefault(require("./scope"));
const astValidator_1 = require("../ast/astValidator");
const errorCode_1 = require("../utils/errorCode");
/**
 * TODO: Dynamic feature, need deep processing later
 * WithScope
 */
class WithScope extends scope_1.default {
    constructor(ast, parent) {
        const index = WithScope.numOfWiths++;
        const name = scope_1.default.NAME_WITH_PREFIX + "_" + index;
        super(ast, name, scope_1.default.TYPE_WITH, parent);
    }
    /**
     * Validate the value of an WithScope
     * @param ast An AST node of this scope
     * @param [parent] Parent of the scope
     * @param [msg] Custom error message
     */
    static validate(ast, parent, msg) {
        if (!astValidator_1.astValidator.isWithStatement(ast) || !scope_1.default.isValidParent(parent)) {
            errorCode_1.Errors.ValidatorError(msg || "Invalid value for an WithScope");
        }
    }
}
WithScope.numOfWiths = 0;
exports.default = WithScope;
