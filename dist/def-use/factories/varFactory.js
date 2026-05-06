"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.varFactory = void 0;
const var_1 = __importDefault(require("../types/var"));
/**
 * Factory for Var
 */
class VarFactory {
    /**
     * Factory method for creating a variable
     */
    create(name, scope) {
        return new var_1.default(name, scope);
    }
}
exports.varFactory = new VarFactory();
