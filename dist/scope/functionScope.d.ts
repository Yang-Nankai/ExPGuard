import { Node } from "acorn";
import Scope from "./scope";
/**
 * FunctionScope
 */
declare class FunctionScope extends Scope {
    private static numOfAnonymousFunctions;
    constructor(ast: Node | null, name: string | null, isExpressionNameFuncton: boolean | undefined, parent: Scope | null);
    /**
     * Reset the counter of anonymous functions
     */
    static resetAnonymousCounter(): void;
    /**
     * Validate the value for a FunctionScope is valid or not
     */
    static validateFunctionScope(ast: Node, name: string | null, parent?: any, msg?: string): void;
    /**
     * Check the name of a FunctionScope is valid or not
     * @param name Name of the scope
     * @returns True if it's valid false otherwise
     */
    static isValidName(name: string): boolean;
}
export default FunctionScope;
