"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.astValidator = void 0;
const errorCode_1 = require("../utils/errorCode");
/**
 * ASTValidator class to validate
 * Use:
 *  const astValidator = new ASTValidator();
 *  const isValid = astValidator.check(node, options);
 */
class ASTValidator {
    /**
     * Check the range property of an AST node
     */
    checkRangeProperty(node) {
        return (!!node.range &&
            Array.isArray(node.range) &&
            node.range.length === 2 &&
            typeof node.range[0] === "number" &&
            typeof node.range[1] === "number");
    }
    /**
     * Check the loc property of an AST nodee
     */
    checkLocProperty(node) {
        return (!!node.loc &&
            typeof node.loc === "object" &&
            !!node.loc.start &&
            !!node.loc.end &&
            typeof node.loc.start.line === "number" &&
            typeof node.loc.start.column === "number" &&
            typeof node.loc.end.line === "number" &&
            typeof node.loc.end.column === "number");
    }
    /**
     * Check if the given node is a valid AST node
     */
    check(node, options = {}) {
        const opt = Object.assign(Object.assign({}, ASTValidator.DEFAULT_OPTION_OBJECT), options);
        return (!!node &&
            !!node.type &&
            (!opt.range || this.checkRangeProperty(node)) &&
            (!opt.loc || this.checkLocProperty(node)));
    }
    /**
     * Validate if the object is an AST node
     */
    validate(node, options, msg) {
        if (!this.check(node, options)) {
            errorCode_1.Errors.ValidatorError(msg || "Not an AST node");
        }
    }
    /**
     * Check if the AST node is the root of a page
     */
    isProgramNode(node) {
        return this.check(node) && node.type === "Program";
    }
    /**
     * Check if the AST node is a named function
     */
    isFunctionDeclarationNode(node) {
        return this.check(node) && node.type === "FunctionDeclaration";
    }
    /**
     * Check if the AST node is a function expression
     */
    isFunctionExpressionNode(node) {
        return this.check(node) && node.type === "FunctionExpression";
    }
    /**
     * Check if the AST node is a arrow function expression
     */
    isArrowFunctionExpressionNode(node) {
        return this.check(node) && node.type === "ArrowFunctionExpression";
    }
    /**
     * Check if the AST node is a function scope node
     */
    isFunctionScopeNode(node) {
        return (this.check(node) &&
            [
                "FunctionExpression",
                "ArrowFunctionExpression",
                "FunctionDeclaration",
            ].includes(node.type));
    }
    /**
     * Check if the AST node is an anonymous function
     */
    isFunctionLikeExpression(node) {
        return (this.check(node) &&
            ["FunctionExpression", "ArrowFunctionExpression"].includes(node.type));
    }
    /**
     * Check if the AST node is an catch clause
     */
    isCatchClauseNode(node) {
        return this.check(node) && node.type === "CatchClause";
    }
    /**
     * Check if the AST node is an with statment
     */
    isWithStatement(node) {
        return this.check(node) && node.type === "WithStatement";
    }
    /**
     * Check if the AST node is an switch statment
     */
    isSwitchStatement(node) {
        return this.check(node) && node.type === "SwitchStatement";
    }
    /**
     * Check if the AST node is an for statment
     */
    isForStatement(node) {
        return (this.check(node) &&
            ["ForStatement", "ForInStatement", "ForOfStatement"].includes(node.type));
    }
    /**
     * Check if the AST node is an block statment
     */
    isBlockStatement(node) {
        return this.check(node) && node.type === "BlockStatement";
    }
    /**
     * Check if the AST node is an class statment
     */
    isClassNode(node) {
        return (this.check(node) &&
            ["ClassDeclaration", "ClassExpression"].includes(node.type));
    }
    /**
     * Check if the AST node is an class expression statment
     */
    isClassExpressionNode(node) {
        return this.check(node) && node.type === "ClassExpression";
    }
    /**
     * Validate if the node is an AST of a page scope
     */
    validateProgramNode(node, msg) {
        if (!this.isProgramNode(node)) {
            errorCode_1.Errors.ValidatorError(msg || "Not an AST of a page scope");
        }
    }
    /**
     * Validate if the node is an AST of a func scope
     */
    validateFunctionScopeNode(node, msg) {
        if (!this.isFunctionScopeNode(node)) {
            errorCode_1.Errors.ValidatorError(msg || "Not an AST of a function scope");
        }
    }
    /**
     * Validate if the node is an AST of a function scope
     */
    validateFunctionDeclarationNode(node, msg) {
        if (!this.isFunctionDeclarationNode(node)) {
            errorCode_1.Errors.ValidatorError(msg || "Not an AST of a function scope");
        }
    }
    /**
     * Validate if the node is an AST of an anonymous function scope
     */
    validateAnonymousFunctionNode(node, msg) {
        if (!this.isArrowFunctionExpressionNode(node)) {
            errorCode_1.Errors.ValidatorError(msg || "Not an AST of an anonymous function scope");
        }
    }
}
/**
 * Default option object for AST parser
 */
ASTValidator.DEFAULT_OPTION_OBJECT = {
    range: true,
    loc: true,
};
exports.astValidator = new ASTValidator();
