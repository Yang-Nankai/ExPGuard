"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.literalOuter = literalOuter;
exports.literalExtensionId = literalExtensionId;
exports.createArrayInstanceTaint = createArrayInstanceTaint;
exports.inferUrlTaintControl = inferUrlTaintControl;
const def_1 = __importDefault(require("../../types/def"));
const taint_1 = require("../../../taint");
const defFactory_1 = require("../../factories/defFactory");
const epgmodelbuilder_1 = require("../../../epgmodelbuilder");
const EXTENSION_ID_REGEX = /^[a-p]{32}$/;
/**
 * Get the outer value of a literal def.
 */
function literalOuter(def) {
    var _a;
    return def_1.default.isLiteralDef(def) ? (_a = def.value) === null || _a === void 0 ? void 0 : _a.toString() : undefined;
}
/**
 * Get the right extension id from a literal def
 */
function literalExtensionId(extensionId) {
    var _a;
    if (!def_1.default.isLiteralDef(extensionId)) {
        return "UNKNOWN_EXTENSION_ID";
    }
    const value = (_a = extensionId.value) === null || _a === void 0 ? void 0 : _a.toString().trim();
    if (!value)
        return undefined;
    // FIX: fix the chrome.runtime.id point to self
    if (value === "chrome.runtime.id")
        return undefined;
    // FIX: fix the id === extension id point to self
    if (value === epgmodelbuilder_1.epgModelBuilder.getExtensionId())
        return undefined;
    return EXTENSION_ID_REGEX.test(value) ? value : "INVALID_EXTENSION_ID";
}
function createArrayInstanceTaint(callNode, astNode, sourceType) {
    const element = defFactory_1.defFactory.createUnknownDef(callNode);
    taint_1.taintManager.createTaintSource(element, sourceType, astNode);
    return defFactory_1.DefFactory.createArrayInstanceDef(callNode, astNode, [element]);
}
function hasStaticUrlFragment(urlArgNode) {
    if (!urlArgNode)
        return false;
    if (urlArgNode.type === "TemplateLiteral") {
        return (urlArgNode.quasis || []).some((q) => { var _a; return typeof ((_a = q === null || q === void 0 ? void 0 : q.value) === null || _a === void 0 ? void 0 : _a.cooked) === "string" && q.value.cooked.length > 0; });
    }
    if (urlArgNode.type === "BinaryExpression" && urlArgNode.operator === "+") {
        const left = urlArgNode.left;
        const right = urlArgNode.right;
        const leftIsStaticLiteral = (left === null || left === void 0 ? void 0 : left.type) === "Literal" && typeof left.value === "string" && left.value.length > 0;
        const rightIsStaticLiteral = (right === null || right === void 0 ? void 0 : right.type) === "Literal" && typeof right.value === "string" && right.value.length > 0;
        return leftIsStaticLiteral || rightIsStaticLiteral || hasStaticUrlFragment(left) || hasStaticUrlFragment(right);
    }
    return false;
}
/**
 * Infer whether taint can fully control URL or only partially control it.
 */
function inferUrlTaintControl(urlArgNode) {
    return hasStaticUrlFragment(urlArgNode) ? "PARTIAL" : "FULL";
}
