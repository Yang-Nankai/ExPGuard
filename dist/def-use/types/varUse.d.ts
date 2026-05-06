import { FlowNode } from "../../flownode/flownode";
import Var from "./var";
declare class VarUse {
    private _var;
    private _use;
    constructor(variable: Var, usage: FlowNode);
    static isVarDef(obj: any): boolean;
    static validate(variable: Var, usage: FlowNode, msg?: string): void;
    get var(): Var;
    get use(): FlowNode;
    toString(): string;
}
export default VarUse;
