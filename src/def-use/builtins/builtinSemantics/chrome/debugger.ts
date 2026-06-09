import {
  BuiltInSemantics,
  Def,
  defFactory,
  interAnalyzer,
  taintManager,
} from "../index";

// --------------------- chrome.debugger.sendCommand -------------------
// chrome.debugger.sendCommand(target, method, commandParams?, callback?)
//
// The Chrome DevTools Protocol exposes code-execution methods — most notably
// `Runtime.evaluate` / `Runtime.callFunctionOn` (run an arbitrary expression in
// the page) and `Page.navigate` / `Page.addScriptToEvaluateOnNewDocument`.
// Attacker-controlled data flowing into the command params is a privileged
// code-injection surface that bypasses the page CSP. We treat the relevant
// fields of commandParams as a CHROME_DEBUGGER_COMMAND (code-execution) sink.
const CODE_PARAM_KEYS = [
  "expression", // Runtime.evaluate
  "functionDeclaration", // Runtime.callFunctionOn
  "source", // Page.addScriptToEvaluateOnNewDocument
  "scriptSource", // Debugger.setScriptSource
  "url", // Page.navigate
];

BuiltInSemantics.register(
  "chrome.debugger.sendCommand",
  (args, callNode, astNode) => {
    interAnalyzer.setCurrentSideEffects();

    const params = args[2];

    if (Def.isObjectDef(params)) {
      let matchedField = false;
      for (const key of CODE_PARAM_KEYS) {
        const valueDef = params.lookupProperty(key);
        if (valueDef) {
          matchedField = true;
          taintManager.checkSink(
            valueDef,
            "CHROME_DEBUGGER_COMMAND",
            astNode,
            key,
          );
        }
      }
      // If we couldn't pick out a known code field but the params object is
      // itself tainted, flag the whole object so we don't silently miss it.
      if (!matchedField && params.isTainted) {
        taintManager.checkSink(
          params,
          "CHROME_DEBUGGER_COMMAND",
          astNode,
          "commandParams",
        );
      }
    } else if (params?.isTainted) {
      taintManager.checkSink(
        params,
        "CHROME_DEBUGGER_COMMAND",
        astNode,
        "commandParams",
      );
    }

    // Callback style: (result) => ...  — result is server-controlled response.
    const callback = args[3];
    if (Def.isFunctionDef(callback)) {
      const resultDef = defFactory.createUnknownDef(callNode);
      interAnalyzer.analyze(callNode, callback, [resultDef], null, astNode);
      return defFactory.createUndefinedDef(callNode);
    }

    return defFactory.createPromiseDef(callNode);
  },
);
