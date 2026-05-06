"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuiltInSemantics = void 0;
const logger_1 = __importDefault(require("../../../utils/logger"));
class BuiltInSemantics {
    static register(name, fn) {
        if (this.registry.has(name)) {
            throw new Error(`Built-in semantic already registered: ${name}`);
        }
        this.registry.set(name, fn);
    }
    static get(name) {
        const builtin = this.registry.get(name);
        if (!builtin) {
            logger_1.default.warn(`[BUILTIN] Can't find the builtInSemantic ${name}.`);
        }
        return builtin !== null && builtin !== void 0 ? builtin : null;
    }
}
exports.BuiltInSemantics = BuiltInSemantics;
BuiltInSemantics.registry = new Map();
