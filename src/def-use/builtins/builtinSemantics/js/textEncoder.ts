import {
  BuiltInSemantics,
  DefFactory,
  taintManager,
} from "../index";

/**
 * ======================================================
 * TextEncoder.prototype.encode(input)
 * Returns a new Uint8Array containing the encoded text.
 * ======================================================
 */
BuiltInSemantics.register(
  "TextEncoder.prototype.encode",
  (args, callNode, astNode) => {
    const input = args[0];

    // Create a new instance definition for the result
    const uint8ArrayDef = DefFactory.createUint8ArrayInstanceDef(
      callNode,
      astNode,
      [input],
    );

    // Taint Propagation: The resulting buffer is tainted by the input string
    taintManager.propagateTaint(
      input,
      uint8ArrayDef,
      astNode,
      "RETURN",
      "TextEncoder.encode",
    );

    return uint8ArrayDef;
  },
);
