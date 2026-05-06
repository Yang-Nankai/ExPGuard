import { Node } from "acorn";
import Scope from "./scope";
import { astValidator } from "../ast/astValidator";
import { Errors } from "../utils/errorCode";

/**
 * SwitchScope
 */
class SwitchScope extends Scope {

  private static numOfSwitchs: number = 0;

  constructor(ast: Node | null, parent: Scope | null) {
    const index = SwitchScope.numOfSwitchs++;
    const name = Scope.NAME_SWITCH_PREFIX + "_" + index;
    super(ast, name, Scope.TYPE_SWITCH, parent);
  }

  /**
   * Validate the value of an SwitchScope
   * @param ast An AST node of this scope
   * @param [parent] Parent of the scope
   * @param [msg] Custom error message
   */
  static validate(ast: Node, parent?: any, msg?: string) {
    if (!astValidator.isSwitchStatement(ast) || !Scope.isValidParent(parent)) {
      Errors.ValidatorError(msg || "Invalid value for an WithScope");
    }
  }
}

export default SwitchScope;
