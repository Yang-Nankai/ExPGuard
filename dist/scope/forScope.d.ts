import { Node } from "acorn";
import Scope from "./scope";
/**
 * ForScope
 */
declare class ForScope extends Scope {
    private static numOfFors;
    constructor(ast: Node, parent: Scope | null);
    /**
     * Validate the value of an ForScope
     * @param ast An AST node of this scope
     * @param [parent] Parent of the scope
     * @param [msg] Custom error message
     */
    static validate(ast: Node, parent?: any, msg?: string): void;
}
export default ForScope;
