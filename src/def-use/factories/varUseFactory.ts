import { FlowNode } from "../../flownode/flownode";
import Var from "../types/var";
import VarUse from "../types/varUse";



/**
 * VarUseFactory
 */
class VarUseFactory {
    /**
     * Factory method to create a VarUse with a Var and a Use
     */
    create(variable: Var, usage: FlowNode) {
        return new VarUse(variable, usage);
    }
}

export const varUseFactory = new VarUseFactory();