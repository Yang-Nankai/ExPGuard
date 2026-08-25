
import {
  BuiltInSemantics,
  Def,
  interAnalyzer,
  taintManager,
  FlowNode,
  Node
} from "../index";
import {
  isDefinitelyCallableTimerHandler,
  isLexicalFunctionSelfReference,
} from "./codeExecution";


/**
 * ======================================================
 * ===================== Timers =========================
 * ======================================================
 */

function handleTimerCallback(args: Def[], callNode: FlowNode, astNode: Node) {
  const [callback, delay, ...callbackArgs] = args;

  if (Def.isFunctionDef(callback)) {
    interAnalyzer.analyze(callNode, callback, callbackArgs, null, astNode);
  } else if (
    isDefinitelyCallableTimerHandler(callback) ||
    isLexicalFunctionSelfReference(callNode, astNode)
  ) {
    // Callback form, not the legacy setTimeout("code") form.  For an
    // ImplicitDef the function body was already reached through its normal
    // declaration/call graph; the important part here is that no code-string
    // sink is emitted.
    return;
  } else {
    // Unknown/mixed handlers may still be attacker-controlled code strings;
    // retain the previous conservative sink behaviour for them.
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
