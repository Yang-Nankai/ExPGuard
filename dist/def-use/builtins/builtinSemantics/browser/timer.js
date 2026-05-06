"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
/**
 * ======================================================
 * ===================== Timers =========================
 * ======================================================
 */
function handleTimerCallback(args, callNode, astNode) {
    const [callback, delay, ...callbackArgs] = args;
    if (index_1.Def.isFunctionDef(callback)) {
        index_1.interAnalyzer.analyze(callNode, callback, callbackArgs, null, astNode);
    }
    else {
        // Like Eval
        index_1.taintManager.checkSink(callback, "TIME_EVAL", astNode);
    }
}
// --------------------- setTimeout -------------------
index_1.BuiltInSemantics.register("setTimeout", (args, callNode, astNode, _thisDef) => {
    handleTimerCallback(args, callNode, astNode);
    return undefined;
});
// --------------------- setInterval -------------------
index_1.BuiltInSemantics.register("setInterval", (args, callNode, astNode, _thisDef) => {
    handleTimerCallback(args, callNode, astNode);
    return undefined;
});
