import { Node } from "acorn";
import Scope from "./scope";
/**
 * SwitchScope
 */
declare class SwitchScope extends Scope {
    private static numOfSwitchs;
    constructor(ast: Node | null, parent: Scope | null);
    /**
     * Validate the value of an SwitchScope
     * @param ast An AST node of this scope
     * @param [parent] Parent of the scope
     * @param [msg] Custom error message
     */
    static validate(ast: Node, parent?: any, msg?: string): void;
}
export default SwitchScope;
