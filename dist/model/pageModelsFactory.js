"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pageModelsFactory = void 0;
const pageModels_1 = __importDefault(require("./pageModels"));
/*
 * Simple factory for PageModels
 */
class PageModelsFactory {
    create(scopeTree) {
        return new pageModels_1.default(scopeTree);
    }
}
exports.pageModelsFactory = new PageModelsFactory();
