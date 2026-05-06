"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dupairFactory = void 0;
const duPair_1 = __importDefault(require("../types/duPair"));
class DUPairFactory {
    create(def, use) {
        return new duPair_1.default(def, use);
    }
}
exports.dupairFactory = new DUPairFactory();
