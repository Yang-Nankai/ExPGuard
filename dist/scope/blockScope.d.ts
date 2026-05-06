import { Node } from "acorn";
import Scope from "./scope";
/**
 * BlockScope
 */
declare class BlockScope extends Scope {
    private static numOfBlockScopes;
    private _index;
    constructor(ast: Node | null, parent: Scope | null);
    /**
     * Reset the counter of AnonymousFunctionScope
     */
    static resetCounter(): void;
    /**
     * Get the counter of BlockScope
     */
    static getCounter(): number;
    /**
     * Validate the value of an BlockScope
     * @param ast An AST node of this scope
     * @param [parent] Parent of the scope
     * @param [msg] Custom error message
     */
    static validate(ast: Node, parent?: any, msg?: string): void;
    get index(): number;
}
export default BlockScope;
