import {
  BuiltInSemantics,
  defFactory,
  taintManager
} from "../index";


// --------------------- JSON.stringify -------------------
BuiltInSemantics.register("JSON.stringify", (args, callNode, astNode) => {
  const [value] = args;

  const resultDef = defFactory.createLiteralDef(
    callNode,
    "JSON.stringify.pseudo",
  );

  // Taint Propagation: the result string should be taint
  taintManager.propagateTaint(value, resultDef, astNode, "RETURN", "json.stringify");

  return resultDef;
});

// --------------------- JSON.parse-------------------
BuiltInSemantics.register("JSON.parse", (args, callNode, astNode) => {
  const [text] = args;
  const obj = defFactory.createObjectDef(callNode);

  // Taint propagation: the parse result should be taint
  taintManager.propagateTaint(text, obj, astNode, "RETURN", "json.parse");

  return obj;
});
