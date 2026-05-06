import { FlowNode } from "../../flownode/flownode";
import Def from "../types/def";
import Var from "../types/var";
import VarUse from "../types/varUse";
import VarUseDef from "../types/varUseDef";
/**
 * VarUseDefFactory
 */
declare class VarUseDefFactory {
    /**
     * Factory method to create a VarUse with a Var and a Use
     */
    create(variable: Var, usage: FlowNode, definition: Def): VarUseDef;
    /**
     * Factory method to create a VarUseDef from a VarUse and a Def
     */
    createFromVarUse(varUse: VarUse, definition: Def): VarUseDef;
}
export declare const varUseDefFactory: VarUseDefFactory;
export {};
