"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
// --------------------- chrome.gcm -------------------
index_1.BuiltInSemantics.register("chrome.gcm.send", (args, callNode, astNode, _thisDef) => {
    index_1.interAnalyzer.setCurrentSideEffects(); // side effect
    const [message, callbackFunc] = args;
    index_1.taintManager.checkSink(message, "CHROME_GCM_SEND", astNode);
    // Handle the callback
    if (index_1.Def.isFunctionDef(callbackFunc)) {
        index_1.interAnalyzer.analyze(callNode, callbackFunc, [], null, astNode);
    }
    return undefined;
});
