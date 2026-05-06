"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
/**
 * ======================================================
 * ================== BASE64 Semantics ==================
 * ======================================================
 */
// --------------------- base64.encode -------------------
index_1.BuiltInSemantics.register("base64.encode", (args, callNode, astNode) => {
    if (args.length !== 1)
        return undefined;
    const input = args[0];
    const resDef = index_1.defFactory.createUnknownDef(callNode);
    // Taint propagation
    index_1.taintManager.propagateTaint(input, resDef, astNode, "RETURN", "base64.encode");
    return resDef;
});
// --------------------- base64.decode-------------------
index_1.BuiltInSemantics.register("base64.decode", (args, callNode, astNode) => {
    if (args.length !== 1)
        return undefined;
    const input = args[0];
    const resDef = index_1.defFactory.createUnknownDef(callNode);
    // Taint propagation
    index_1.taintManager.propagateTaint(input, resDef, astNode, "RETURN", "base64.decode");
    return resDef;
});
