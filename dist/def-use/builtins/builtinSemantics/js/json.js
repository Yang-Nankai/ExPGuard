"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
// --------------------- JSON.stringify -------------------
index_1.BuiltInSemantics.register("JSON.stringify", (args, callNode, astNode) => {
    const [value] = args;
    const resultDef = index_1.defFactory.createLiteralDef(callNode, "JSON.stringify.pseudo");
    // Taint Propagation: the result string should be taint
    index_1.taintManager.propagateTaint(value, resultDef, astNode, "RETURN", "json.stringify");
    return resultDef;
});
// --------------------- JSON.parse-------------------
index_1.BuiltInSemantics.register("JSON.parse", (args, callNode, astNode) => {
    const [text] = args;
    const obj = index_1.defFactory.createObjectDef(callNode);
    // Taint propagation: the parse result should be taint
    index_1.taintManager.propagateTaint(text, obj, astNode, "RETURN", "json.parse");
    return obj;
});
