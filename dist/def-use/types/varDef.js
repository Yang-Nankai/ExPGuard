"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const def_1 = __importDefault(require("./def"));
const var_1 = __importDefault(require("./var"));
/*
 * Model for variable and the corresponding definition
 */
class VarDef {
    constructor(variable, definition) {
        VarDef.validate(variable, definition);
        this._var = variable;
        this._def = definition;
    }
    static isVarDef(obj) {
        return obj instanceof VarDef;
    }
    static validate(variable, definition, msg) {
        var_1.default.validateType(variable, msg || "Invalid Var for a VarDef");
        def_1.default.validateType(definition.fromNode, definition.type, msg || "Invalid Def for a VarDef");
    }
    get var() {
        return this._var;
    }
    get def() {
        return this._def;
    }
    set def(definition) {
        VarDef.validate(this._var, definition);
        this._def = definition;
    }
    get key() {
        return `${this._var.name}[${this._def.uniqueId}:${this.def.version}]`;
    }
    toString() {
        return "(" + this._var + "," + this._def + ")";
    }
}
exports.default = VarDef;
