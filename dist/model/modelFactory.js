"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.modelFactory = void 0;
const model_1 = __importDefault(require("./model"));
/**
 * ModelFactory
 */
class ModelFactory {
    create() {
        return new model_1.default();
    }
}
exports.modelFactory = new ModelFactory();
