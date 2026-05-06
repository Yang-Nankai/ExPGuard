"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.varDefFactory = void 0;
const varDef_1 = __importDefault(require("../types/varDef"));
/**
 * VarDefFactory
 */
class VarDefFactory {
    /**
     * Factory method to create a VarDef with a Var and a Def
     * @param variable
     * @param definition
     * @returns var-def
     */
    create(variable, definition) {
        return new varDef_1.default(variable, definition);
    }
}
exports.varDefFactory = new VarDefFactory();
