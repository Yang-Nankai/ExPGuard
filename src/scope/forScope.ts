import { Node } from "acorn";
import Scope from "./scope";
import { astValidator } from "../ast/astValidator";
import { Errors } from "../utils/errorCode";

/**
 * ForScope
 */
class ForScope extends Scope {

  private static numOfFors: number = 0;

  constructor(ast: Node, parent: Scope | null) {
    const index = ForScope.numOfFors++;
    const name = Scope.NAME_FOR_PREFIX + '_' + index;
    super(ast, name, Scope.TYPE_FOR, parent);
  }

  /**
   * Validate the value of an ForScope
   * @param ast An AST node of this scope
   * @param [parent] Parent of the scope
   * @param [msg] Custom error message
   */
  static validate(ast: Node, parent?: any, msg?: string) {
    if (!astValidator.isForStatement(ast) || !Scope.isValidParent(parent)) {
      Errors.ValidatorError(msg || "Invalid value for an ForScope");
    }
  }
}

export default ForScope;
