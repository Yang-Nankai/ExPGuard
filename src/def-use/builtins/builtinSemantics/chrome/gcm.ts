import {
  BuiltInSemantics,
  Def,
  interAnalyzer,
  taintManager,
} from "../index";

// --------------------- chrome.gcm -------------------
BuiltInSemantics.register(
  "chrome.gcm.send",
  (args, callNode, astNode, _thisDef) => {
    interAnalyzer.setCurrentSideEffects(); // side effect

    const [message, callbackFunc] = args;
    taintManager.checkSink(message, "CHROME_GCM_SEND", astNode);

    // Handle the callback
    if (Def.isFunctionDef(callbackFunc)) {
      interAnalyzer.analyze(callNode, callbackFunc, [], null, astNode);
    }

    return undefined;
  },
);