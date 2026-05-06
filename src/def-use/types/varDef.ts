import Def from "./def";
import Var from "./var";

/*
 * Model for variable and the corresponding definition
 */
class VarDef {
  private _var: Var;
  private _def: Def;

  constructor(variable: Var, definition: Def) {
    VarDef.validate(variable, definition);
    this._var = variable;
    this._def = definition;
  }

  static isVarDef(obj: any): boolean {
    return obj instanceof VarDef;
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

  set def(definition: Def) {
    VarDef.validate(this._var, definition);
    this._def = definition;
  }

  get key() {
    return `${this._var.name}[${this._def.uniqueId}:${this.def.version}]`
  }

  toString(): string {
    return "(" + this._var + "," + this._def + ")";
  }
}

export default VarDef;

