import Var from "./var";
import Def from "./def";
import { FlowNode } from "../../flownode/flownode";
declare class VarUseDef {
    private _var;
    private _use;
    private _def;
    constructor(variable: Var, usage: FlowNode, definition: Def);
    static isVarDef(obj: any): boolean;
    static validate(variable: Var, definition: Def, msg?: string): void;
    get var(): Var;
    get def(): Def;
    get use(): FlowNode;
    toString(): string;
}
export default VarUseDef;
