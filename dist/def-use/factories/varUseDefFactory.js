"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.varUseDefFactory = void 0;
const varUseDef_1 = __importDefault(require("../types/varUseDef"));
/**
 * VarUseDefFactory
 */
class VarUseDefFactory {
    /**
     * Factory method to create a VarUse with a Var and a Use
     */
    create(variable, usage, definition) {
        return new varUseDef_1.default(variable, usage, definition);
    }
    /**
     * Factory method to create a VarUseDef from a VarUse and a Def
     */
    createFromVarUse(varUse, definition) {
        return new varUseDef_1.default(varUse.var, varUse.use, definition);
    }
}
exports.varUseDefFactory = new VarUseDefFactory();
