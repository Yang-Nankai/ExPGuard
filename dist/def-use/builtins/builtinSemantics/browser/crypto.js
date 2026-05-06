"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
/**
 * ======================================================
 * ================== WebCrypto Semantics ==================
 * ======================================================
 */
// --------------------- crypto.subtle.digest -------------------
index_1.BuiltInSemantics.register("crypto.subtle.digest", (args, callNode, astNode) => {
    const [algorithm, data] = args;
    const hashDef = index_1.defFactory.createUnknownDef(callNode);
    // [Sanitization]
    if (data === null || data === void 0 ? void 0 : data.isTainted) {
        index_1.taintManager.applySanitizer(data, "WebCrypto.hash", astNode);
    }
    return hashDef;
});
// --------------------- crypto.subtle.encrypt -------------------
index_1.BuiltInSemantics.register("crypto.subtle.encrypt", (args, callNode, astNode) => {
    const [algorithm, key, data] = args;
    const cipherDef = index_1.defFactory.createUnknownDef(callNode);
    // Taint Propagation
    index_1.taintManager.propagateTaint(data, cipherDef, astNode, "RETURN", "WebCrypto.encrypt");
    return cipherDef;
});
// --------------------- crypto.subtle.decrypt -------------------
index_1.BuiltInSemantics.register("crypto.subtle.decrypt", (args, callNode, astNode) => {
    const [algorithm, key, cipher] = args;
    const dataDef = index_1.defFactory.createUnknownDef(callNode);
    // Taint Propagation
    index_1.taintManager.propagateTaint(cipher, dataDef, astNode, "RETURN", "WebCrypto.decrypt");
    return dataDef;
});
// --------------------- crypto.subtle.sign -------------------
index_1.BuiltInSemantics.register("crypto.subtle.sign", (args, callNode, astNode) => {
    const [algorithm, key, data] = args;
    const sigDef = index_1.defFactory.createUnknownDef(callNode);
    // Sanitization
    if (data === null || data === void 0 ? void 0 : data.isTainted) {
        index_1.taintManager.applySanitizer(data, "WebCrypto.sign", astNode);
    }
    return sigDef;
});
