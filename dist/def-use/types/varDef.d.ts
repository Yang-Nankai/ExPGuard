import Def from "./def";
import Var from "./var";
declare class VarDef {
    private _var;
    private _def;
    constructor(variable: Var, definition: Def);
    static isVarDef(obj: any): boolean;
    static validate(variable: Var, definition: Def, msg?: string): void;
    get var(): Var;
    get def(): Def;
    set def(definition: Def);
    get key(): string;
    toString(): string;
}
export default VarDef;
