"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
/**
 * ======================================================
 * =================== Navigator ========================
 * ======================================================
 */
// --------------------- navigator.geolocation.getCurrentPosition -------------------
index_1.BuiltInSemantics.register("navigator.geolocation.getCurrentPosition", (args, callNode, astNode, _thisDef) => {
    index_1.interAnalyzer.setCurrentSideEffects(); // side effect
    const [successCallback] = args;
    const positionDef = index_1.defFactory.createUnknownDef(callNode);
    index_1.taintManager.createTaintSource(positionDef, "NAVIGAROR_GEOLOCATION", astNode);
    // Analyze the success callback
    if (index_1.Def.isFunctionDef(successCallback)) {
        index_1.interAnalyzer.analyze(callNode, successCallback, [positionDef], null, astNode);
    }
    return undefined;
});
// --------------------- navigator.geolocation.watchPosition -------------------
index_1.BuiltInSemantics.register("navigator.geolocation.watchPosition", (args, callNode, astNode, _thisDef) => {
    index_1.interAnalyzer.setCurrentSideEffects(); // side effect
    const [successCallback] = args;
    const positionDef = index_1.defFactory.createUnknownDef(callNode);
    index_1.taintManager.createTaintSource(positionDef, "NAVIGAROR_GEOLOCATION", astNode);
    // Analyze the success callback
    if (index_1.Def.isFunctionDef(successCallback)) {
        index_1.interAnalyzer.analyze(callNode, successCallback, [positionDef], null, astNode);
    }
    return undefined;
});
// --------------------- navigator.clipboard.readText -------------------
index_1.BuiltInSemantics.register("navigator.clipboard.readText", (_args, callNode, astNode, _thisDef) => {
    index_1.interAnalyzer.setCurrentSideEffects(); // side effect
    const resDef = index_1.defFactory.createUnknownDef(callNode);
    index_1.taintManager.createTaintSource(resDef, "NAVIGATOR_CLIPBOARD", astNode);
    return index_1.defFactory.createPromiseDef(callNode, resDef);
});
// --------------------- navigator.clipboard.read -------------------
index_1.BuiltInSemantics.register("navigator.clipboard.read", (_args, callNode, astNode, _thisDef) => {
    index_1.interAnalyzer.setCurrentSideEffects(); // side effect
    const textDef = index_1.defFactory.createUnknownDef(callNode);
    index_1.taintManager.createTaintSource(textDef, "NAVIGATOR_CLIPBOARD", astNode);
    const resDef = index_1.DefFactory.createArrayInstanceDef(callNode, astNode, [textDef]);
    return index_1.defFactory.createPromiseDef(callNode, resDef);
});
// --------------------- navigator.gpu.requestAdapter -------------------
index_1.BuiltInSemantics.register("navigator.gpu.requestAdapter", (_args, callNode, astNode, _thisDef) => {
    index_1.interAnalyzer.setCurrentSideEffects(); // side effect
    const resDef = index_1.defFactory.createObjectDef(callNode);
    index_1.taintManager.createTaintSource(resDef, "NAVIGATOR_GPU_ADAPTER", astNode);
    return index_1.defFactory.createPromiseDef(callNode, resDef);
});
