import {
  BuiltInSemantics,
  defFactory,
  literalOuter,
  interAnalyzer,
  taintManager,
} from "../index";
import {
  isDefinitelyNonStringForEval,
  isLexicalFunctionSelfReference,
} from "./codeExecution";

// --------------------- decodeURI-------------------
BuiltInSemantics.register("decodeURI", (args, callNode, astNode) => {
  const [input] = args;
  const resDef = defFactory.createUnknownDef(callNode);
  // Taint propagation
  taintManager.propagateTaint(input, resDef, astNode, "RETURN", "decodeURI");

  return resDef;
});

// --------------------- encodeURI-------------------
BuiltInSemantics.register("encodeURI", (args, callNode, astNode) => {
  const [input] = args;
  const resDef = defFactory.createUnknownDef(callNode);
  // Taint propagation
  taintManager.propagateTaint(input, resDef, astNode, "RETURN", "encodeURI");

  return resDef;
});

// --------------------- decodeURIComponent-------------------
BuiltInSemantics.register("decodeURIComponent", (args, callNode, astNode) => {
  const [input] = args;
  const resDef = defFactory.createUnknownDef(callNode);
  // Taint propagation
  taintManager.propagateTaint(
    input,
    resDef,
    astNode,
    "RETURN",
    "decodeURIComponent",
  );

  return resDef;
});

// --------------------- encodeURIComponent-------------------
BuiltInSemantics.register("encodeURIComponent", (args, callNode, astNode) => {
  const [input] = args;
  const resDef = defFactory.createUnknownDef(callNode);
  // Taint propagation
  taintManager.propagateTaint(
    input,
    resDef,
    astNode,
    "RETURN",
    "encodeURIComponent",
  );

  return resDef;
});

// --------------------- eval-------------------
BuiltInSemantics.register("eval", (args, callNode, astNode) => {
  interAnalyzer.setCurrentSideEffects(); // side effect

  const [codeDef] = args;
  // Per ECMAScript, eval(nonString) returns its argument without parsing or
  // executing it.  In particular, a function callback is not dynamic code.
  // Unknown values stay conservative so existing attacker-controlled string
  // flows retain their detection coverage.
  if (
    !isDefinitelyNonStringForEval(codeDef) &&
    !isLexicalFunctionSelfReference(callNode, astNode)
  ) {
    taintManager.checkSink(codeDef, "EVAL", astNode);
  }
  return undefined;
});

// --------------------- atob-------------------
BuiltInSemantics.register("atob", (args, callNode, astNode) => {
  const [input] = args;
  const resDef = defFactory.createUnknownDef(callNode);
  // [Taint propagation]
  taintManager.propagateTaint(input, resDef, astNode, "RETURN", "atob");

  return resDef;
});

// --------------------- btoa-------------------
BuiltInSemantics.register("btoa", (args, callNode, astNode) => {
  const [input] = args;
  const resDef = defFactory.createUnknownDef(callNode);
  // Taint propagation
  taintManager.propagateTaint(input, resDef, astNode, "RETURN", "btoa");

  return resDef;
});

// ======================================================
// Numeric / string casts
// ----------------------------------------------------------
// All of these are *taint-preserving* unary transforms — the result is a new
// scalar value derived from the argument. We deliberately do NOT model their
// concrete value, but retain the guaranteed primitive kind. This lets string
// interpretation sinks distinguish `eval(parseInt(input))` from an actual
// code string without losing the same taint at non-code sinks such as
// chrome.alarms.create.
// ======================================================
const SCALAR_CAST_KINDS = {
  parseInt: "number",
  parseFloat: "number",
  isNaN: "boolean",
  isFinite: "boolean",
} as const;

for (const [fnName, primitiveKind] of Object.entries(SCALAR_CAST_KINDS)) {
  BuiltInSemantics.register(fnName, (args, callNode, astNode) => {
    const resDef = defFactory.createPrimitiveDef(callNode, primitiveKind);
    // Propagate taint from EVERY arg — `parseInt(s, radix)` taints the result
    // if either argument is tainted (radix is unusual but possible).
    for (const arg of args) {
      if (arg) {
        taintManager.propagateTaint(arg, resDef, astNode, "RETURN", fnName);
      }
    }
    return resDef;
  });
}


