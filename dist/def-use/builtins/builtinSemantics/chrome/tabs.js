"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
const index_1 = require("../index");
const scriptUsageTracker_1 = require("../../../../extension/scriptUsageTracker");
// --------------------- chrome.tabs -------------------
(0, utils_1.createChromeBuiltinSemantics)({
    apiName: "chrome.tabs.captureVisibleTab",
    callbackIndex: 2,
    sourceType: "CHROME_TABS_CAPUTURE_VISIBLE_TAB",
    createReturnDef: (callNode) => index_1.defFactory.createUnknownDef(callNode),
});
(0, utils_1.createChromeBuiltinSemantics)({
    apiName: "chrome.tabs.detectLanguage",
    callbackIndex: 1,
    sourceType: "CHROME_TABS_DETECT_LANUAGE",
    createReturnDef: (callNode) => index_1.defFactory.createUnknownDef(callNode),
});
(0, utils_1.createChromeBuiltinSemantics)({
    apiName: "chrome.tabs.create",
    sinkArgs: [{ index: 0, sinkType: "CHROME_TABS_CREATE_OPTIONS" }],
    callbackIndex: 1,
});
// --------------------- chrome.tabs.executeScript -------------------
index_1.BuiltInSemantics.register("chrome.tabs.executeScript", (args, callNode, astNode, _thisDef) => {
    var _a;
    index_1.interAnalyzer.setCurrentSideEffects(); // side effect
    if (args.length === 0) {
        return index_1.defFactory.createUndefinedDef(callNode);
    }
    let details;
    let callbackFunc;
    // Possible calling formats:
    // executeScript(details, callback)
    // executeScript(tabId, details, callback)
    if (args.length === 1) {
        details = args[0];
    }
    else if (args.length === 2) {
        if (index_1.Def.isObjectDef(args[0])) {
            details = args[0];
            callbackFunc = args[1];
        }
        else {
            details = args[1];
        }
    }
    else if (args.length >= 3) {
        details = args[1];
        callbackFunc = args[2];
    }
    // -------------------------
    // Sink: details.code
    // Sink: details.file
    // -------------------------
    if (details && index_1.Def.isObjectDef(details)) {
        const codeDef = details.lookupProperty("code");
        const fileDef = details.lookupProperty("file");
        if (index_1.Def.isLiteralDef(fileDef) && typeof fileDef.value === "string") {
            scriptUsageTracker_1.scriptUsageTracker.markReferencedScriptByPathOrUrlByKey((_a = callNode.scopeTree) === null || _a === void 0 ? void 0 : _a.key, fileDef.value);
        }
        if (codeDef) {
            index_1.taintManager.checkSink(codeDef, "CHROME_TABS_EXECUTE", astNode);
        }
    }
    // -------------------------
    // callback-style
    // -------------------------
    if (callbackFunc && index_1.Def.isFunctionDef(callbackFunc)) {
        // Simple: don't care the result
        index_1.interAnalyzer.analyze(callNode, callbackFunc, [], null, astNode);
    }
    return index_1.defFactory.createUndefinedDef(callNode);
});
