import {
  BuiltInSemantics,
  defFactory,
  literalOuter,
  interAnalyzer,
  taintManager,
} from "../index";

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
BuiltInSemantics.register("eval", (args, _callNode, astNode) => {
  interAnalyzer.setCurrentSideEffects(); // side effect

  const [codeDef] = args;
  taintManager.checkSink(codeDef, "EVAL", astNode);
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
// math: `parseInt("0x1f")` could be folded, but the static value is rarely
// needed, while the taint MUST flow or a `parseInt(taintedString)` → eval
// chain becomes invisible.
// ======================================================
const SCALAR_CAST_NAMES = [
  "parseInt",
  "parseFloat",
  "isNaN",
  "isFinite",
] as const;

for (const fnName of SCALAR_CAST_NAMES) {
  BuiltInSemantics.register(fnName, (args, callNode, astNode) => {
    const resDef = defFactory.createUnknownDef(callNode);
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


