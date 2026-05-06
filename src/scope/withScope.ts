import { Node } from "acorn";
import Scope from "./scope";
import { astValidator } from "../ast/astValidator";
import { Errors } from "../utils/errorCode";

/**
 * TODO: Dynamic feature, need deep processing later
 * WithScope
 */
class WithScope extends Scope {

  private static numOfWiths: number = 0;

  constructor(ast: Node | null, parent: Scope | null) {
    const index = WithScope.numOfWiths++;
    const name = Scope.NAME_WITH_PREFIX + "_" + index;
    super(ast, name, Scope.TYPE_WITH, parent);
  }

  /**
   * Validate the value of an WithScope
   * @param ast An AST node of this scope
   * @param [parent] Parent of the scope
   * @param [msg] Custom error message
   */
  static validate(ast: Node, parent?: any, msg?: string) {
    if (!astValidator.isWithStatement(ast) || !Scope.isValidParent(parent)) {
      Errors.ValidatorError(msg || "Invalid value for an WithScope");
    }
  }
}

export default WithScope;
