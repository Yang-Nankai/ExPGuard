import { FlowNode } from "../../flownode/flownode";
import Var from "./var";
/*
 * Model for variable and the corresponding usage
 */
class VarUse {
    private _var: Var;
    private _use: FlowNode;

    constructor(variable: Var, usage: FlowNode) {

        VarUse.validate(variable, usage);

        this._var = variable;
        this._use = usage;
    }

    static isVarDef(obj: any): boolean {
        return obj instanceof VarUse;
    }

    static validate(variable: Var, usage: FlowNode, msg?: string) {
        Var.validateType(variable, msg || 'Invalid Var for a VarDef');
    }


    get var() {
        return this._var;
    }

    get use() {
        return this._use;
    }

    toString(): string {
        return '(' + this._var + ',' + JSON.stringify(this._use) + ')';
    }

}

export default VarUse;