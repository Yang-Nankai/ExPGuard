
import {
  BuiltInSemantics,
  Def,
  interAnalyzer,
  taintManager,
  FlowNode,
  Node
} from "../index";


/**
 * ======================================================
 * ===================== Timers =========================
 * ======================================================
 */

function handleTimerCallback(args: Def[], callNode: FlowNode, astNode: Node) {
  const [callback, delay, ...callbackArgs] = args;

  if (Def.isFunctionDef(callback)) {
    interAnalyzer.analyze(callNode, callback, callbackArgs, null, astNode);
  } else {
    // Like Eval
    taintManager.checkSink(callback, "TIME_EVAL", astNode);
  }
}

// --------------------- setTimeout -------------------
BuiltInSemantics.register("setTimeout", (args, callNode, astNode, _thisDef) => {
  handleTimerCallback(args, callNode, astNode);
  return undefined;
});

// --------------------- setInterval -------------------
BuiltInSemantics.register(
  "setInterval",
  (args, callNode, astNode, _thisDef) => {
    handleTimerCallback(args, callNode, astNode);
    return undefined;
  },
);