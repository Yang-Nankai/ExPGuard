"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
/**
 * ======================================================
 * Uint8Array.prototype.constructor(...args)
 *
 * Constructor taints the instance based on input.
 *
 * Examples:
 *   new Uint8Array(buffer)
 *   new Uint8Array(array)
 *   new Uint8Array(length)
 * ======================================================
 */
index_1.BuiltInSemantics.register("Uint8Array.prototype.constructor", (args, _callNode, astNode, thisDef) => {
    if (!thisDef)
        return thisDef;
    // Taint Propagation: Constructor arguments (size, buffer, or array) taint the instance
    for (const arg of args) {
        index_1.taintManager.propagateTaint(arg, thisDef, astNode, "INITIAL", "Uint8Array.constructor");
    }
    return thisDef;
});
/**
 * ======================================================
 * Uint8Array.prototype.toBase64()
 * Uint8Array.prototype.toHex()
 *
 * Returns encoded string representation.
 *
 * Taint flow:
 *   this -> return
 * ======================================================
 */
const toEncodedSemantics = (_args, callNode, astNode, thisDef) => {
    const result = index_1.defFactory.createUnknownDef(callNode);
    index_1.taintManager.propagateTaint(thisDef, result, astNode, "RETURN", "Uint8Array.toBase64/Hex");
    return result;
};
index_1.BuiltInSemantics.register("Uint8Array.prototype.toBase64", toEncodedSemantics);
index_1.BuiltInSemantics.register("Uint8Array.prototype.toHex", toEncodedSemantics);
/**
 * ======================================================
 * Uint8Array.prototype.setFromBase64(str)
 * Uint8Array.prototype.setFromHex(str)
 *
 * Mutates the current buffer.
 *
 * Taint flow:
 *   arg -> this
 * ======================================================
 */
const setFromEncodedSemantics = (args, callNode, astNode, thisDef) => {
    const input = args[0];
    if (!thisDef || !input)
        return thisDef;
    index_1.taintManager.propagateTaint(input, thisDef, astNode, "RETURN", "Uint8Array.setFromBase64/setFromHex");
    return index_1.defFactory.createObjectDef(callNode);
};
index_1.BuiltInSemantics.register("Uint8Array.prototype.setFromBase64", setFromEncodedSemantics);
index_1.BuiltInSemantics.register("Uint8Array.prototype.setFromHex", setFromEncodedSemantics);
/**
 * ======================================================
 * Uint8Array.fromBase64(str)
 * Uint8Array.fromHex(str)
 *
 * Creates new Uint8Array from encoded string.
 *
 * Taint flow:
 *   arg -> return
 * ======================================================
 */
const fromEncodedSemantics = (args, callNode, astNode) => {
    const input = args[0];
    const uint8ArrayDef = index_1.DefFactory.createUint8ArrayInstanceDef(callNode, astNode, [input]);
    index_1.taintManager.propagateTaint(input, uint8ArrayDef, astNode, "RETURN", "Uint8Array.fromBase64/Hex");
    return uint8ArrayDef;
};
index_1.BuiltInSemantics.register("Uint8Array.fromBase64", fromEncodedSemantics);
index_1.BuiltInSemantics.register("Uint8Array.fromHex", fromEncodedSemantics);
