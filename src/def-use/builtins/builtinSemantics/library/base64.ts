import { BuiltInSemantics, defFactory, taintManager } from "../index";

/**
 * ======================================================
 * ================== BASE64 Semantics ==================
 * ======================================================
 */
// --------------------- base64.encode -------------------
BuiltInSemantics.register("base64.encode", (args, callNode, astNode) => {
  if (args.length !== 1) return undefined;

  const input = args[0];
  const resDef = defFactory.createUnknownDef(callNode);
  // Taint propagation
  taintManager.propagateTaint(
    input,
    resDef,
    astNode,
    "RETURN",
    "base64.encode",
  );

  return resDef;
});

// --------------------- base64.decode-------------------
BuiltInSemantics.register("base64.decode", (args, callNode, astNode) => {
  if (args.length !== 1) return undefined;

  const input = args[0];
  const resDef = defFactory.createUnknownDef(callNode);
  // Taint propagation
  taintManager.propagateTaint(
    input,
    resDef,
    astNode,
    "RETURN",
    "base64.decode",
  );

  return resDef;
});
