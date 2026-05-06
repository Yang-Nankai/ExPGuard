import { Node } from "acorn";
import Scope from "./scope";
/**
 * TODO: Dynamic feature, need deep processing later
 * WithScope
 */
declare class WithScope extends Scope {
    private static numOfWiths;
    constructor(ast: Node | null, parent: Scope | null);
    /**
     * Validate the value of an WithScope
     * @param ast An AST node of this scope
     * @param [parent] Parent of the scope
     * @param [msg] Custom error message
     */
    static validate(ast: Node, parent?: any, msg?: string): void;
}
export default WithScope;
