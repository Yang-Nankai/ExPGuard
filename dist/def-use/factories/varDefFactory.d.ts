import Def from "../types/def";
import Var from "../types/var";
import VarDef from "../types/varDef";
/**
 * VarDefFactory
 */
declare class VarDefFactory {
    /**
     * Factory method to create a VarDef with a Var and a Def
     * @param variable
     * @param definition
     * @returns var-def
     */
    create(variable: Var, definition: Def): VarDef;
}
export declare const varDefFactory: VarDefFactory;
export {};
