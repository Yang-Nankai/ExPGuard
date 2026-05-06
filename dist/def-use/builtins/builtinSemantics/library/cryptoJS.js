"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
/**
 * ======================================================
 * ================== CryptoJS Semantics ==================
 * ======================================================
 */
// --------------------- CryptoJS.MD5-------------------
index_1.BuiltInSemantics.register("CryptoJS.MD5", (args, callNode, astNode) => {
    const input = args[0];
    if (input === null || input === void 0 ? void 0 : input.isTainted) {
        index_1.taintManager.applySanitizer(input, "CryptoJS.HASH", astNode);
    }
    return index_1.defFactory.createUnknownDef(callNode);
});
// --------------------- CryptoJS.AES.encrypt-------------------
index_1.BuiltInSemantics.register("CryptoJS.AES.encrypt", (args, callNode, astNode) => {
    const [data, key] = args;
    const cipherDef = index_1.defFactory.createUnknownDef(callNode);
    // [Taint Propagation]
    index_1.taintManager.propagateTaint(data, cipherDef, astNode, "RETURN", "Crypto.AES.encrypt");
    return cipherDef;
});
// --------------------- CryptoJS.AES.decrypt-------------------
index_1.BuiltInSemantics.register("CryptoJS.AES.decrypt", (args, callNode, astNode) => {
    const [cipher, key] = args;
    const dataDef = index_1.defFactory.createUnknownDef(callNode);
    // [Taint Propagation]
    index_1.taintManager.propagateTaint(cipher, dataDef, astNode, "RETURN", "Crypto.AES.decrypt");
    return dataDef;
});
// --------------------- CryptoJS.enc.Hex.stringify-------------------
index_1.BuiltInSemantics.register("CryptoJS.enc.Hex.stringify", (args, callNode, astNode) => {
    const [data] = args;
    const resDef = index_1.defFactory.createUnknownDef(callNode);
    // [Taint Propagation]
    index_1.taintManager.propagateTaint(data, resDef, astNode, "RETURN", "Crypto.enc");
    return resDef;
});
