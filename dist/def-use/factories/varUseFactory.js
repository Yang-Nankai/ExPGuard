"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.varUseFactory = void 0;
const varUse_1 = __importDefault(require("../types/varUse"));
/**
 * VarUseFactory
 */
class VarUseFactory {
    /**
     * Factory method to create a VarUse with a Var and a Use
     */
    create(variable, usage) {
        return new varUse_1.default(variable, usage);
    }
}
exports.varUseFactory = new VarUseFactory();
