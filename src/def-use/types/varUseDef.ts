import Var from "./var";
import Def from "./def";
import { FlowNode } from "../../flownode/flownode";
/*
 * Model for variable and the corresponding definition
 */
class VarUseDef {
  private _var: Var;
  private _use: FlowNode;
  private _def: Def;

  constructor(variable: Var, usage: FlowNode, definition: Def) {
    VarUseDef.validate(variable, definition);

    this._var = variable;
    this._def = definition;
    this._use = usage;
  }

  static isVarDef(obj: any): boolean {
    return obj instanceof VarUseDef;
  }

  static validate(variable: Var, definition: Def, msg?: string) {
    Var.validateType(variable, msg || "Invalid Var for a VarDef");
    Def.validateType(
      definition.fromNode,
      definition.type,
      msg || "Invalid Def for a VarDef"
    );
  }

  get var() {
    return this._var;
  }

  get def() {
    return this._def;
  }

  get use() {
    return this._use;
  }

  toString(): string {
    return (
      "(" + this._var + "," + JSON.stringify(this._use) + "," + this._def + ")"
    );
  }
}

export default VarUseDef;
