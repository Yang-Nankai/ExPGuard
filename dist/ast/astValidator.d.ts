import { ArrowFunctionExpression, BlockStatement, CatchClause, ClassExpression, ForStatement, FunctionDeclaration, FunctionExpression, Node, Program, SwitchStatement, WithStatement } from "acorn";
/**
 * ASTValidator class to validate
 * Use:
 *  const astValidator = new ASTValidator();
 *  const isValid = astValidator.check(node, options);
 */
declare class ASTValidator {
    /**
     * Default option object for AST parser
     */
    private static readonly DEFAULT_OPTION_OBJECT;
    /**
     * Check the range property of an AST node
     */
    checkRangeProperty(node: Node): boolean;
    /**
     * Check the loc property of an AST nodee
     */
    checkLocProperty(node: Node): boolean;
    /**
     * Check if the given node is a valid AST node
     */
    check(node: Node | null, options?: Partial<typeof ASTValidator.DEFAULT_OPTION_OBJECT>): boolean;
    /**
     * Validate if the object is an AST node
     */
    validate(node: Node | null, options?: Partial<typeof ASTValidator.DEFAULT_OPTION_OBJECT>, msg?: string): void;
    /**
     * Check if the AST node is the root of a page
     */
    isProgramNode(node: Node): node is Program;
    /**
     * Check if the AST node is a named function
     */
    isFunctionDeclarationNode(node: Node): node is FunctionDeclaration;
    /**
     * Check if the AST node is a function expression
     */
    isFunctionExpressionNode(node: Node): node is FunctionExpression;
    /**
     * Check if the AST node is a arrow function expression
     */
    isArrowFunctionExpressionNode(node: Node): node is ArrowFunctionExpression;
    /**
     * Check if the AST node is a function scope node
     */
    isFunctionScopeNode(node: Node): boolean;
    /**
     * Check if the AST node is an anonymous function
     */
    isFunctionLikeExpression(node: Node): boolean;
    /**
     * Check if the AST node is an catch clause
     */
    isCatchClauseNode(node: Node): node is CatchClause;
    /**
     * Check if the AST node is an with statment
     */
    isWithStatement(node: Node): node is WithStatement;
    /**
     * Check if the AST node is an switch statment
     */
    isSwitchStatement(node: Node): node is SwitchStatement;
    /**
     * Check if the AST node is an for statment
     */
    isForStatement(node: Node): node is ForStatement;
    /**
     * Check if the AST node is an block statment
     */
    isBlockStatement(node: Node): node is BlockStatement;
    /**
     * Check if the AST node is an class statment
     */
    isClassNode(node: Node): boolean;
    /**
     * Check if the AST node is an class expression statment
     */
    isClassExpressionNode(node: Node): node is ClassExpression;
    /**
     * Validate if the node is an AST of a page scope
     */
    validateProgramNode(node: Node, msg?: string): void;
    /**
     * Validate if the node is an AST of a func scope
     */
    validateFunctionScopeNode(node: Node, msg?: string): void;
    /**
     * Validate if the node is an AST of a function scope
     */
    validateFunctionDeclarationNode(node: Node, msg?: string): void;
    /**
     * Validate if the node is an AST of an anonymous function scope
     */
    validateAnonymousFunctionNode(node: Node, msg?: string): void;
}
export declare const astValidator: ASTValidator;
export {};
