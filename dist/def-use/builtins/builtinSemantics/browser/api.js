"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
// --------------------- decodeURI-------------------
index_1.BuiltInSemantics.register("decodeURI", (args, callNode, astNode) => {
    const [input] = args;
    const resDef = index_1.defFactory.createUnknownDef(callNode);
    // Taint propagation
    index_1.taintManager.propagateTaint(input, resDef, astNode, "RETURN", "decodeURI");
    return resDef;
});
// --------------------- encodeURI-------------------
index_1.BuiltInSemantics.register("encodeURI", (args, callNode, astNode) => {
    const [input] = args;
    const resDef = index_1.defFactory.createUnknownDef(callNode);
    // Taint propagation
    index_1.taintManager.propagateTaint(input, resDef, astNode, "RETURN", "encodeURI");
    return resDef;
});
// --------------------- decodeURIComponent-------------------
index_1.BuiltInSemantics.register("decodeURIComponent", (args, callNode, astNode) => {
    const [input] = args;
    const resDef = index_1.defFactory.createUnknownDef(callNode);
    // Taint propagation
    index_1.taintManager.propagateTaint(input, resDef, astNode, "RETURN", "decodeURIComponent");
    return resDef;
});
// --------------------- encodeURIComponent-------------------
index_1.BuiltInSemantics.register("encodeURIComponent", (args, callNode, astNode) => {
    const [input] = args;
    const resDef = index_1.defFactory.createUnknownDef(callNode);
    // Taint propagation
    index_1.taintManager.propagateTaint(input, resDef, astNode, "RETURN", "encodeURIComponent");
    return resDef;
});
// --------------------- eval-------------------
index_1.BuiltInSemantics.register("eval", (args, _callNode, astNode) => {
    index_1.interAnalyzer.setCurrentSideEffects(); // side effect
    const [codeDef] = args;
    index_1.taintManager.checkSink(codeDef, "EVAL", astNode);
    return undefined;
});
// --------------------- atob-------------------
index_1.BuiltInSemantics.register("atob", (args, callNode, astNode) => {
    const [input] = args;
    const resDef = index_1.defFactory.createUnknownDef(callNode);
    // [Taint propagation]
    index_1.taintManager.propagateTaint(input, resDef, astNode, "RETURN", "atob");
    return resDef;
});
// --------------------- btoa-------------------
index_1.BuiltInSemantics.register("btoa", (args, callNode, astNode) => {
    const [input] = args;
    const resDef = index_1.defFactory.createUnknownDef(callNode);
    // Taint propagation
    index_1.taintManager.propagateTaint(input, resDef, astNode, "RETURN", "btoa");
    return resDef;
});
