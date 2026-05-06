"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useFactory = void 0;
const use_1 = __importDefault(require("../types/use"));
/**
 * Factory for Use
 */
class UseFactory {
    /**
     * General factory method of Use objects
     */
    create(from, range) {
        return new use_1.default(from, range);
    }
}
;
exports.useFactory = new UseFactory();
