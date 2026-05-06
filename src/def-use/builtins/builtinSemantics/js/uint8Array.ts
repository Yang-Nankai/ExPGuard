import {
  BuiltInSemantics,
  BuiltInSemanticExec,
  DefFactory,
  defFactory,
  taintManager,
  BuiltInRegistry,
} from "../index";

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
BuiltInSemantics.register(
  "Uint8Array.prototype.constructor",
  (args, _callNode, astNode, thisDef) => {
    if (!thisDef) return thisDef;

    // Taint Propagation: Constructor arguments (size, buffer, or array) taint the instance
    for (const arg of args) {
      taintManager.propagateTaint(
        arg,
        thisDef,
        astNode,
        "INITIAL",
        "Uint8Array.constructor",
      );
    }

    return thisDef;
  },
);

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
const toEncodedSemantics: BuiltInSemanticExec = (
  _args,
  callNode,
  astNode,
  thisDef,
) => {
  const result = defFactory.createUnknownDef(callNode);

  taintManager.propagateTaint(
    thisDef,
    result,
    astNode,
    "RETURN",
    "Uint8Array.toBase64/Hex",
  );

  return result;
};

BuiltInSemantics.register("Uint8Array.prototype.toBase64", toEncodedSemantics);

BuiltInSemantics.register("Uint8Array.prototype.toHex", toEncodedSemantics);

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
const setFromEncodedSemantics: BuiltInSemanticExec = (
  args,
  callNode,
  astNode,
  thisDef,
) => {
  const input = args[0];
  if (!thisDef || !input) return thisDef;

  taintManager.propagateTaint(
    input,
    thisDef,
    astNode,
    "RETURN",
    "Uint8Array.setFromBase64/setFromHex",
  );

  return defFactory.createObjectDef(callNode);
};

BuiltInSemantics.register(
  "Uint8Array.prototype.setFromBase64",
  setFromEncodedSemantics,
);
BuiltInSemantics.register(
  "Uint8Array.prototype.setFromHex",
  setFromEncodedSemantics,
);

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
const fromEncodedSemantics: BuiltInSemanticExec = (args, callNode, astNode) => {
  const input = args[0];

  const uint8ArrayDef = DefFactory.createUint8ArrayInstanceDef(
    callNode,
    astNode,
    [input],
  );

  taintManager.propagateTaint(
    input,
    uint8ArrayDef,
    astNode,
    "RETURN",
    "Uint8Array.fromBase64/Hex",
  );

  return uint8ArrayDef;
};

BuiltInSemantics.register("Uint8Array.fromBase64", fromEncodedSemantics);
BuiltInSemantics.register("Uint8Array.fromHex", fromEncodedSemantics);
