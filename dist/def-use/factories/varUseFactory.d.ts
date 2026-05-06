import { FlowNode } from "../../flownode/flownode";
import Var from "../types/var";
import VarUse from "../types/varUse";
/**
 * VarUseFactory
 */
declare class VarUseFactory {
    /**
     * Factory method to create a VarUse with a Var and a Use
     */
    create(variable: Var, usage: FlowNode): VarUse;
}
export declare const varUseFactory: VarUseFactory;
export {};
