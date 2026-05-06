"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const scope_1 = __importDefault(require("./scope"));
/**
 * Extension Scope
 */
class ExtensionScope extends scope_1.default {
    constructor() {
        super(null, scope_1.default.NAME_EXTENSION, scope_1.default.TYPE_EXTENSION, null);
    }
}
exports.default = ExtensionScope;
