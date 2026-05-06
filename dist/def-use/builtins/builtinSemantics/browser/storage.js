"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
/**
 * ======================================================
 * ================ Web Storage Semantics ===============
 * ======================================================
 */
/**
 * Handle storage.setItem(key, value)
 */
function handleStorageSet(keyDef, valueDef, keySink, valueSink, astNode) {
    if (keyDef) {
        index_1.taintManager.checkSink(keyDef, keySink, astNode);
    }
    if (valueDef) {
        index_1.taintManager.checkSink(valueDef, valueSink, astNode);
    }
}
/**
 * --------------------- localStorage.setItem -------------------
 */
index_1.BuiltInSemantics.register("localStorage.setItem", (args, _callNode, astNode) => {
    index_1.interAnalyzer.setCurrentSideEffects();
    const [keyDef, valueDef] = args;
    // TODO: 这里 handle storage 之后是否还能被 sink 识别到？
    handleStorageSet(keyDef, valueDef, "WEB_LOCAL_STORAGE_SET_KEY", "WEB_LOCAL_STORAGE_SET_VALUE", astNode);
    return undefined;
});
/**
 * --------------------- localStorage.removeItem -------------------
 */
index_1.BuiltInSemantics.register("localStorage.removeItem", (args, _callNode, astNode) => {
    index_1.interAnalyzer.setCurrentSideEffects();
    const [keyDef] = args;
    if (keyDef) {
        index_1.taintManager.checkSink(keyDef, "WEB_LOCAL_STORAGE_REMOVE", astNode);
    }
    return undefined;
});
/**
 * --------------------- sessionStorage.setItem -------------------
 */
index_1.BuiltInSemantics.register("sessionStorage.setItem", (args, _callNode, astNode) => {
    index_1.interAnalyzer.setCurrentSideEffects();
    const [keyDef, valueDef] = args;
    handleStorageSet(keyDef, valueDef, "WEB_SESSION_STORAGE_SET_KEY", "WEB_SESSION_STORAGE_SET_VALUE", astNode);
    return undefined;
});
/**
 * --------------------- sessionStorage.removeItem -------------------
 */
index_1.BuiltInSemantics.register("sessionStorage.removeItem", (args, _callNode, astNode) => {
    index_1.interAnalyzer.setCurrentSideEffects();
    const [keyDef] = args;
    if (keyDef) {
        index_1.taintManager.checkSink(keyDef, "WEB_SESSION_STORAGE_REMOVE", astNode);
    }
    return undefined;
});
