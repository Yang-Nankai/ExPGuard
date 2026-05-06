import Scope from '../../scope/scope';
import Var from '../types/var';
/**
 * Factory for Var
 */
declare class VarFactory {
    /**
     * Factory method for creating a variable
     */
    create(name: string, scope: Scope): Var;
}
export declare const varFactory: VarFactory;
export {};
