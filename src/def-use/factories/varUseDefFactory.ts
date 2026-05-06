
import { FlowNode } from "../../flownode/flownode";
import Def from "../types/def";
import Var from "../types/var";
import VarUse from "../types/varUse";
import VarUseDef from "../types/varUseDef";


/**
 * VarUseDefFactory
 */
class VarUseDefFactory {
    /**
     * Factory method to create a VarUse with a Var and a Use
     */
    create(variable: Var, usage: FlowNode, definition: Def) {
        return new VarUseDef(variable, usage, definition);
    }

    /**
     * Factory method to create a VarUseDef from a VarUse and a Def
     */
    createFromVarUse(varUse: VarUse, definition: Def) {
        return new VarUseDef(varUse.var, varUse.use, definition);
    }

}

export const varUseDefFactory = new VarUseDefFactory();