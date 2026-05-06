"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pairFactory = void 0;
const pair_1 = __importDefault(require("../types/pair"));
/**
 * Factory for Pair
 */
class PairFactory {
    create(first, second) {
        return new pair_1.default(first, second);
    }
}
exports.pairFactory = new PairFactory();
