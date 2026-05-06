"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
/**
 * ======================================================
 * TextEncoder.prototype.encode(input)
 * Returns a new Uint8Array containing the encoded text.
 * ======================================================
 */
index_1.BuiltInSemantics.register("TextEncoder.prototype.encode", (args, callNode, astNode) => {
    const input = args[0];
    // Create a new instance definition for the result
    const uint8ArrayDef = index_1.DefFactory.createUint8ArrayInstanceDef(callNode, astNode, [input]);
    // Taint Propagation: The resulting buffer is tainted by the input string
    index_1.taintManager.propagateTaint(input, uint8ArrayDef, astNode, "RETURN", "TextEncoder.encode");
    return uint8ArrayDef;
});
