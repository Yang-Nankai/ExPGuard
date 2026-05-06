import { Node } from "acorn";
import Scope from "./scope";
/**
 * ClassScope
 */
declare class ClassScope extends Scope {
    private static numOfAnonymousClasses;
    constructor(ast: Node | null, name: string, parent: Scope | null);
    /**
     * Check the name of a ClassScope is valid or not
     * @param name Name of the scope
     * @returns True if it's valid false otherwise
     */
    static isValidName(name: string): boolean;
    /**
     * Validate the value for a ClassScope is valid or not
     * @param ast An AST node
     * @param name Name of the scope
     * @param [parent] Parent scope
     * @param [msg] Custom error message
     * @throws  "Invalid value for a ClassScope" | Custom error message
     */
    static validateClassScope(ast: Node, name: string, parent?: any, msg?: string): void;
}
export default ClassScope;
