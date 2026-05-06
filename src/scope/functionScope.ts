import { astValidator } from "../ast/astValidator";
import { Node } from "acorn";
import Scope from "./scope";
import { Errors } from "../utils/errorCode";

/**
 * FunctionScope
 */
class FunctionScope extends Scope {
  private static numOfAnonymousFunctions: number = 0;

  constructor(
    ast: Node | null,
    name: string | null,
    isExpressionNameFuncton: boolean = false,
    parent: Scope | null
  ) {
    // assign name if anonymous
    if (!name) {
      const index = FunctionScope.numOfAnonymousFunctions++;
      name = Scope.NAME_ANONYMOUS_FUNCTION_PREFIX + "_" + index;
    }

    super(ast, name, Scope.TYPE_FUNCTION, parent);
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
  static validateFunctionScope(
    ast: Node,
    name: string | null,
    parent?: any,
    msg?: string
  ) {
    // anonymous function
    if (
      astValidator.isFunctionLikeExpression(ast) &&
      Scope.isValidParent(parent)
    ) {
      return;
    }

    // named function
    if (
      astValidator.isFunctionDeclarationNode(ast) &&
      name &&
      this.isValidName(name) &&
      Scope.isValidParent(parent)
    ) {
      return;
    }

    Errors.ValidatorError(msg || "Invalid value for a FunctionScope");
  }

  /**
   * Check the name of a FunctionScope is valid or not
   * @param name Name of the scope
   * @returns True if it's valid false otherwise
   */
  static isValidName(name: string): boolean {
    var normalFunctionNameForamt = /^[_a-zA-Z][_a-zA-Z0-9]*$/i;
    return normalFunctionNameForamt.test(name);
  }
  
}

export default FunctionScope;
