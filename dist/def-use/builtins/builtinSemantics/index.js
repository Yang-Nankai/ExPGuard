"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlowNode = exports.BuiltInRegistry = exports.taintManager = exports.interAnalyzer = exports.ObjectDef = exports.FunctionDef = exports.Def = exports.defFactory = exports.DefFactory = exports.inferUrlTaintControl = exports.literalExtensionId = exports.literalOuter = void 0;
// barrel export
__exportStar(require("./semantics"), exports);
var utils_1 = require("./utils");
Object.defineProperty(exports, "literalOuter", { enumerable: true, get: function () { return utils_1.literalOuter; } });
Object.defineProperty(exports, "literalExtensionId", { enumerable: true, get: function () { return utils_1.literalExtensionId; } });
Object.defineProperty(exports, "inferUrlTaintControl", { enumerable: true, get: function () { return utils_1.inferUrlTaintControl; } });
var defFactory_1 = require("../../factories/defFactory");
Object.defineProperty(exports, "DefFactory", { enumerable: true, get: function () { return defFactory_1.DefFactory; } });
Object.defineProperty(exports, "defFactory", { enumerable: true, get: function () { return defFactory_1.defFactory; } });
var def_1 = require("../../types/def");
Object.defineProperty(exports, "Def", { enumerable: true, get: function () { return __importDefault(def_1).default; } });
Object.defineProperty(exports, "FunctionDef", { enumerable: true, get: function () { return def_1.FunctionDef; } });
Object.defineProperty(exports, "ObjectDef", { enumerable: true, get: function () { return def_1.ObjectDef; } });
var interProceduralAnalyzer_1 = require("../../analyzers/interProceduralAnalyzer");
Object.defineProperty(exports, "interAnalyzer", { enumerable: true, get: function () { return interProceduralAnalyzer_1.interAnalyzer; } });
var taint_1 = require("../../../taint");
Object.defineProperty(exports, "taintManager", { enumerable: true, get: function () { return taint_1.taintManager; } });
var builtinRegistry_1 = require("../builtinRegistry");
Object.defineProperty(exports, "BuiltInRegistry", { enumerable: true, get: function () { return builtinRegistry_1.BuiltInRegistry; } });
var flownode_1 = require("../../../flownode/flownode");
Object.defineProperty(exports, "FlowNode", { enumerable: true, get: function () { return flownode_1.FlowNode; } });
require("./loader");
