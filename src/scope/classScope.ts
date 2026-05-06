import { astValidator } from "../ast/astValidator";
import { Node } from "acorn";
import Scope from "./scope";
import { Errors } from "../utils/errorCode";


/**
 * ClassScope
 */
class ClassScope extends Scope {

    private static numOfAnonymousClasses: number = 0;

    constructor(ast: Node | null, name: string, parent: Scope | null) {
        // assign name if anonymous
        if (!name) {
            const index = ClassScope.numOfAnonymousClasses++;
            name = Scope.NAME_ANONYMOUS_CLASS_PREFIX + "_" + index;
        }

        super(ast, name, Scope.TYPE_CLASS, parent);
    }

    /**
     * Check the name of a ClassScope is valid or not
     * @param name Name of the scope
     * @returns True if it's valid false otherwise
     */
    static isValidName(name: string): boolean {
        var normalClassNameForamt = /^[_a-zA-Z][_a-zA-Z0-9]*$/i;
        return normalClassNameForamt.test(name);
    }

    /**
     * Validate the value for a ClassScope is valid or not
     * @param ast An AST node
     * @param name Name of the scope
     * @param [parent] Parent scope
     * @param [msg] Custom error message
     * @throws  "Invalid value for a ClassScope" | Custom error message
     */
    static validateClassScope(ast: Node, name: string, parent?: any, msg?: string) {
        if (!astValidator.isClassNode(ast) ||
            !this.isValidName(name) ||
            !Scope.isValidParent(parent)) {
            Errors.ValidatorError(msg || 'Invalid value for a ClassScope');
        }
    }
}

export default ClassScope;