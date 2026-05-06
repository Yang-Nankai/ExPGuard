"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
/**
 * Check structured data sinks.
 *
 * Supports objects such as:
 *  - FormData
 *  - URLSearchParams
 *  - Headers
 *  - Plain objects
 */
function checkStructuredSink(valueDef, sinkTag, astNode, remark) {
    if (!valueDef)
        return;
    // Direct taint
    if (valueDef.isTainted) {
        index_1.taintManager.checkSink(valueDef, sinkTag, astNode, remark);
        return;
    }
    // Traverse object properties
    if (index_1.Def.isObjectDef(valueDef)) {
        for (const [, value] of valueDef.props) {
            index_1.taintManager.checkSink(value, sinkTag, astNode, remark);
        }
    }
}
/**
 * ======================================================
 * ======================= fetch ========================
 * ======================================================
 */
index_1.BuiltInSemantics.register("fetch", (args, callNode, astNode) => {
    var _a, _b;
    // Network request → side-effect
    index_1.interAnalyzer.setCurrentSideEffects();
    const [urlDef, initDef] = args;
    const urlArgNode = (_a = astNode === null || astNode === void 0 ? void 0 : astNode.arguments) === null || _a === void 0 ? void 0 : _a[0];
    const url = (_b = (0, index_1.literalOuter)(urlDef)) !== null && _b !== void 0 ? _b : "[Unknown URL]";
    // fetch(url)
    if (urlDef) {
        index_1.taintManager.checkSink(urlDef, "FETCH_RESOURCE", astNode, url, (0, index_1.inferUrlTaintControl)(urlArgNode));
    }
    // fetch(url, init)
    if (initDef) {
        index_1.taintManager.checkSink(initDef, "FETCH_OPTIONS", astNode, url);
    }
    // Create response taint
    const responseDef = index_1.defFactory.createUnknownDef(callNode);
    index_1.taintManager.createTaintSource(responseDef, "FETCH_RESPONSE", astNode, true);
    // If caller passes a .then callback, propagate taint
    // This is a simplified model: we don't inspect actual promise chains
    return index_1.defFactory.createPromiseDef(callNode, responseDef);
});
/**
 * ======================================================
 * ===================== WebSocket ======================
 * ======================================================
 */
// --------------------- WebSocket constructor -------------------
index_1.BuiltInSemantics.register("WebSocket.prototype.constructor", (args, callNode, astNode) => {
    var _a;
    const [urlDef] = args;
    const urlArgNode = (_a = astNode === null || astNode === void 0 ? void 0 : astNode.arguments) === null || _a === void 0 ? void 0 : _a[0];
    if (urlDef) {
        index_1.taintManager.checkSink(urlDef, "WEBSOCKET_URL", astNode, undefined, (0, index_1.inferUrlTaintControl)(urlArgNode));
    }
    // returns WebSocket object
    return index_1.defFactory.createObjectDef(callNode);
});
// --------------------- WebSocket.prototype.send -------------------
index_1.BuiltInSemantics.register("WebSocket.prototype.send", (args, _callNode, astNode, _thisDef) => {
    const [bodyDef] = args;
    checkStructuredSink(bodyDef, "WEBSOCKET_DATA", astNode);
    return undefined;
});
/**
 * ======================================================
 * ================= XMLHttpRequest =====================
 * ======================================================
 */
// --------------------- XMLHttpRequest.prototype.open -------------------
index_1.BuiltInSemantics.register("XMLHttpRequest.prototype.open", (args, _callNode, astNode) => {
    var _a;
    index_1.interAnalyzer.setCurrentSideEffects();
    // xhr.open(method, url)
    const [, urlDef] = args;
    const urlArgNode = (_a = astNode === null || astNode === void 0 ? void 0 : astNode.arguments) === null || _a === void 0 ? void 0 : _a[1];
    if (urlDef) {
        index_1.taintManager.checkSink(urlDef, "XML_HTTP_REQUEST_OPEN", astNode, undefined, (0, index_1.inferUrlTaintControl)(urlArgNode));
    }
    return undefined;
});
// --------------------- XMLHttpRequest.prototype.send -------------------
index_1.BuiltInSemantics.register("XMLHttpRequest.prototype.send", (args, callNode, astNode) => {
    const [bodyDef] = args;
    checkStructuredSink(bodyDef, "XML_HTTP_REQUEST_SEND", astNode);
    // Create response taint
    const responseDef = index_1.defFactory.createUnknownDef(callNode);
    index_1.taintManager.createTaintSource(responseDef, "XML_HTTP_RESPONSE", astNode, true);
    // If xhr.onload is defined, propagate response taint
    // Here we just model the response object; actual callback analysis is interAnalyzer responsibility
    return responseDef; // return as placeholder, similar to JQUERY_AJAX_RESPONSE
});
