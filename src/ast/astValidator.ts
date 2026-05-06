import {
  ArrowFunctionExpression,
  BlockStatement,
  CatchClause,
  ClassExpression,
  ForStatement,
  FunctionDeclaration,
  FunctionExpression,
  Node,
  Program,
  SwitchStatement,
  WithStatement,
} from "acorn";
import { Errors } from "../utils/errorCode";

/**
 * ASTValidator class to validate
 * Use:
 *  const astValidator = new ASTValidator();
 *  const isValid = astValidator.check(node, options);
 */
class ASTValidator {
  /**
   * Default option object for AST parser
   */
  private static readonly DEFAULT_OPTION_OBJECT = {
    range: true,
    loc: true,
  };

  /**
   * Check the range property of an AST node
   */
  checkRangeProperty(node: Node): boolean {
    return (
      !!node.range &&
      Array.isArray(node.range) &&
      node.range.length === 2 &&
      typeof node.range[0] === "number" &&
      typeof node.range[1] === "number"
    );
  }

  /**
   * Check the loc property of an AST nodee
   */
  checkLocProperty(node: Node): boolean {
    return (
      !!node.loc &&
      typeof node.loc === "object" &&
      !!node.loc.start &&
      !!node.loc.end &&
      typeof node.loc.start.line === "number" &&
      typeof node.loc.start.column === "number" &&
      typeof node.loc.end.line === "number" &&
      typeof node.loc.end.column === "number"
    );
  }

  /**
   * Check if the given node is a valid AST node
   */
  check(
    node: Node | null,
    options: Partial<typeof ASTValidator.DEFAULT_OPTION_OBJECT> = {},
  ): boolean {
    const opt = { ...ASTValidator.DEFAULT_OPTION_OBJECT, ...options };
    return (
      !!node &&
      !!node.type &&
      (!opt.range || this.checkRangeProperty(node)) &&
      (!opt.loc || this.checkLocProperty(node))
    );
  }

  /**
   * Validate if the object is an AST node
   */
  validate(
    node: Node | null,
    options?: Partial<typeof ASTValidator.DEFAULT_OPTION_OBJECT>,
    msg?: string,
  ): void {
    if (!this.check(node, options)) {
      Errors.ValidatorError(msg || "Not an AST node");
    }
  }

  /**
   * Check if the AST node is the root of a page
   */
  isProgramNode(node: Node): node is Program {
    return this.check(node) && node.type === "Program";
  }

  /**
   * Check if the AST node is a named function
   */
  isFunctionDeclarationNode(node: Node): node is FunctionDeclaration {
    return this.check(node) && node.type === "FunctionDeclaration";
  }

  /**
   * Check if the AST node is a function expression
   */
  isFunctionExpressionNode(node: Node): node is FunctionExpression {
    return this.check(node) && node.type === "FunctionExpression";
  }

  /**
   * Check if the AST node is a arrow function expression
   */
  isArrowFunctionExpressionNode(node: Node): node is ArrowFunctionExpression {
    return this.check(node) && node.type === "ArrowFunctionExpression";
  }

  /**
   * Check if the AST node is a function scope node
   */
  isFunctionScopeNode(node: Node): boolean {
    return (
      this.check(node) &&
      [
        "FunctionExpression",
        "ArrowFunctionExpression",
        "FunctionDeclaration",
      ].includes(node.type)
    );
  }

  /**
   * Check if the AST node is an anonymous function
   */
  isFunctionLikeExpression(node: Node): boolean {
    return (
      this.check(node) &&
      ["FunctionExpression", "ArrowFunctionExpression"].includes(node.type)
    );
  }

  /**
   * Check if the AST node is an catch clause
   */
  isCatchClauseNode(node: Node): node is CatchClause {
    return this.check(node) && node.type === "CatchClause";
  }

  /**
   * Check if the AST node is an with statment
   */
  isWithStatement(node: Node): node is WithStatement {
    return this.check(node) && node.type === "WithStatement";
  }

  /**
   * Check if the AST node is an switch statment
   */
  isSwitchStatement(node: Node): node is SwitchStatement {
    return this.check(node) && node.type === "SwitchStatement";
  }

  /**
   * Check if the AST node is an for statment
   */
  isForStatement(node: Node): node is ForStatement {
    return (
      this.check(node) &&
      ["ForStatement", "ForInStatement", "ForOfStatement"].includes(node.type)
    );
  }

  /**
   * Check if the AST node is an block statment
   */
  isBlockStatement(node: Node): node is BlockStatement {
    return this.check(node) && node.type === "BlockStatement";
  }

  /**
   * Check if the AST node is an class statment
   */
  isClassNode(node: Node): boolean {
    return (
      this.check(node) &&
      ["ClassDeclaration", "ClassExpression"].includes(node.type)
    );
  }

  /**
   * Check if the AST node is an class expression statment
   */
  isClassExpressionNode(node: Node): node is ClassExpression {
    return this.check(node) && node.type === "ClassExpression";
  }

  /**
   * Validate if the node is an AST of a page scope
   */
  validateProgramNode(node: Node, msg?: string): void {
    if (!this.isProgramNode(node)) {
      Errors.ValidatorError(msg || "Not an AST of a page scope");
    }
  }

  /**
   * Validate if the node is an AST of a func scope
   */
  validateFunctionScopeNode(node: Node, msg?: string): void {
    if (!this.isFunctionScopeNode(node)) {
      Errors.ValidatorError(msg || "Not an AST of a function scope");
    }
  }

  /**
   * Validate if the node is an AST of a function scope
   */
  validateFunctionDeclarationNode(node: Node, msg?: string): void {
    if (!this.isFunctionDeclarationNode(node)) {
      Errors.ValidatorError(msg || "Not an AST of a function scope");
    }
  }

  /**
   * Validate if the node is an AST of an anonymous function scope
   */
  validateAnonymousFunctionNode(node: Node, msg?: string): void {
    if (!this.isArrowFunctionExpressionNode(node)) {
      Errors.ValidatorError(msg || "Not an AST of an anonymous function scope");
    }
  }
}

export const astValidator = new ASTValidator();
