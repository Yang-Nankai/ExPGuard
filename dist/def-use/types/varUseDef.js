"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const var_1 = __importDefault(require("./var"));
const def_1 = __importDefault(require("./def"));
/*
 * Model for variable and the corresponding definition
 */
class VarUseDef {
    constructor(variable, usage, definition) {
        VarUseDef.validate(variable, definition);
        this._var = variable;
        this._def = definition;
        this._use = usage;
    }
    static isVarDef(obj) {
        return obj instanceof VarUseDef;
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
    get use() {
        return this._use;
    }
    toString() {
        return ("(" + this._var + "," + JSON.stringify(this._use) + "," + this._def + ")");
    }
}
exports.default = VarUseDef;
