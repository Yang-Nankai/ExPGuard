import { BuiltInSemantics, defFactory, taintManager } from "../index";

/**
 * ======================================================
 * ================== CryptoJS Semantics ==================
 * ======================================================
 */
// --------------------- CryptoJS.MD5-------------------
BuiltInSemantics.register("CryptoJS.MD5", (args, callNode, astNode) => {
  const input = args[0];
  if (input?.isTainted) {
    taintManager.applySanitizer(input, "CryptoJS.HASH", astNode);
  }

  return defFactory.createUnknownDef(callNode);
});

// --------------------- CryptoJS.AES.encrypt-------------------
BuiltInSemantics.register("CryptoJS.AES.encrypt", (args, callNode, astNode) => {
  const [data, key] = args;
  const cipherDef = defFactory.createUnknownDef(callNode);

  // [Taint Propagation]
  taintManager.propagateTaint(
    data,
    cipherDef,
    astNode,
    "RETURN",
    "Crypto.AES.encrypt",
  );

  return cipherDef;
});

// --------------------- CryptoJS.AES.decrypt-------------------
BuiltInSemantics.register("CryptoJS.AES.decrypt", (args, callNode, astNode) => {
  const [cipher, key] = args;
  const dataDef = defFactory.createUnknownDef(callNode);

  // [Taint Propagation]
  taintManager.propagateTaint(
    cipher,
    dataDef,
    astNode,
    "RETURN",
    "Crypto.AES.decrypt",
  );

  return dataDef;
});

// --------------------- CryptoJS.enc.Hex.stringify-------------------
BuiltInSemantics.register(
  "CryptoJS.enc.Hex.stringify",
  (args, callNode, astNode) => {
    const [data] = args;
    const resDef = defFactory.createUnknownDef(callNode);

    // [Taint Propagation]
    taintManager.propagateTaint(data, resDef, astNode, "RETURN", "Crypto.enc");

    return resDef;
  },
);
