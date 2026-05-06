
import {
  BuiltInSemantics,
  defFactory,
  taintManager
} from "../index";

/**
 * ======================================================
 * ================== WebCrypto Semantics ==================
 * ======================================================
 */
// --------------------- crypto.subtle.digest -------------------
BuiltInSemantics.register("crypto.subtle.digest", (args, callNode, astNode) => {
  const [algorithm, data] = args;
  const hashDef = defFactory.createUnknownDef(callNode);

  // [Sanitization]
  if (data?.isTainted) {
    taintManager.applySanitizer(data, "WebCrypto.hash", astNode);
  }

  return hashDef;
});

// --------------------- crypto.subtle.encrypt -------------------
BuiltInSemantics.register(
  "crypto.subtle.encrypt",
  (args, callNode, astNode) => {
    const [algorithm, key, data] = args;
    const cipherDef = defFactory.createUnknownDef(callNode);

    // Taint Propagation
    taintManager.propagateTaint(data, cipherDef, astNode, "RETURN", "WebCrypto.encrypt");

    return cipherDef;
  },
);

// --------------------- crypto.subtle.decrypt -------------------
BuiltInSemantics.register(
  "crypto.subtle.decrypt",
  (args, callNode, astNode) => {
    const [algorithm, key, cipher] = args;
    const dataDef = defFactory.createUnknownDef(callNode);

    // Taint Propagation
    taintManager.propagateTaint(cipher, dataDef, astNode, "RETURN", "WebCrypto.decrypt");

    return dataDef;
  },
);

// --------------------- crypto.subtle.sign -------------------
BuiltInSemantics.register("crypto.subtle.sign", (args, callNode, astNode) => {
  const [algorithm, key, data] = args;
  const sigDef = defFactory.createUnknownDef(callNode);

  // Sanitization
  if (data?.isTainted) {
    taintManager.applySanitizer(data, "WebCrypto.sign", astNode);
  }

  return sigDef;
});
