import { Node } from "acorn";
import Scope from "./scope";
import { astValidator } from "../ast/astValidator";
import { Errors } from "../utils/errorCode";

/**
 * CatchScope
 */
class CatchScope extends Scope {
  private static numOfCatchs: number = 0;

  constructor(ast: Node | null, parent: Scope | null) {
    const index = CatchScope.numOfCatchs++;
    const name = Scope.NAME_CATCH_PREFIX + "_" + index;
    super(ast, name, Scope.TYPE_CATCH, parent);
  }

  /**
   * Validate the value of an CatchScope
   * @param ast An AST node of this scope
   * @param [parent] Parent of the scope
   * @param [msg] Custom error message
   */
  static validate(ast: Node, parent?: any, msg?: string) {
    if (!astValidator.isCatchClauseNode(ast) || !Scope.isValidParent(parent)) {
      Errors.ValidatorError(msg || "Invalid value for an CatchScope");
    }
  }
}

export default CatchScope;
