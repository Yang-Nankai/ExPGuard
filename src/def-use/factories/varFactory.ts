import Scope from '../../scope/scope';
import Var from '../types/var';

/**
 * Factory for Var
 */
class VarFactory {
    /**
     * Factory method for creating a variable
     */
    create(name: string, scope: Scope) {
        return new Var(name, scope);
    }
}

export const varFactory = new VarFactory();
