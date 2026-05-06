import { FlowNode } from "../../flownode/flownode";
import VarUse from "../types/varUse";
import Set from "../../utils/set";
export declare function computeUseFromAST(cfgNode: FlowNode): {
    cuse: Set<VarUse>;
    puse: Set<VarUse>;
};
