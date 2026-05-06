import { astValidator } from "../ast/astValidator";
import { Node } from "acorn";
import Scope from "./scope";
import { Errors } from "../utils/errorCode";

/**
 * BlockScope
 */
class BlockScope extends Scope {
    private static numOfBlockScopes: number = 0;
    private _index: number;

    constructor(ast: Node | null, parent: Scope | null) {
        const index = BlockScope.numOfBlockScopes++;
        const name = Scope.NAME_BLOCK_PREFIX + '_' + index;
        super(ast, name, Scope.TYPE_BLOCK, parent);

        this._index = index;
    }

    /**
     * Reset the counter of AnonymousFunctionScope
     */
    static resetCounter() {
        this.numOfBlockScopes = 0;
    }

    /**
     * Get the counter of BlockScope
     */
    static getCounter(): number {
        return this.numOfBlockScopes;
    }

    /**
     * Validate the value of an BlockScope
     * @param ast An AST node of this scope
     * @param [parent] Parent of the scope
     * @param [msg] Custom error message
     */
    static validate(ast: Node, parent?: any, msg?: string) {
        if (!astValidator.isBlockStatement(ast) ||
            !Scope.isValidParent(parent)) {
            Errors.ValidatorError(msg || 'Invalid value for an AnonymousFunctionScope');
        }
    }

    get index(): number {
        return this._index;
    }
}

export default BlockScope;