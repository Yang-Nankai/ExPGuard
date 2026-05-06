"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const var_1 = __importDefault(require("./var"));
/*
 * Model for variable and the corresponding usage
 */
class VarUse {
    constructor(variable, usage) {
        VarUse.validate(variable, usage);
        this._var = variable;
        this._use = usage;
    }
    static isVarDef(obj) {
        return obj instanceof VarUse;
    }
    static validate(variable, usage, msg) {
        var_1.default.validateType(variable, msg || 'Invalid Var for a VarDef');
    }
    get var() {
        return this._var;
    }
    get use() {
        return this._use;
    }
    toString() {
        return '(' + this._var + ',' + JSON.stringify(this._use) + ')';
    }
}
exports.default = VarUse;
