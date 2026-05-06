import { Node } from "acorn";
import Scope from "./scope";
/**
 * CatchScope
 */
declare class CatchScope extends Scope {
    private static numOfCatchs;
    constructor(ast: Node | null, parent: Scope | null);
    /**
     * Validate the value of an CatchScope
     * @param ast An AST node of this scope
     * @param [parent] Parent of the scope
     * @param [msg] Custom error message
     */
    static validate(ast: Node, parent?: any, msg?: string): void;
}
export default CatchScope;
