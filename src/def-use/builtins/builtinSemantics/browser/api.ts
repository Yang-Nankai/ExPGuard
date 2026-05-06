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

