import {
  BuiltInSemantics,
  interAnalyzer,
  taintManager,
} from "../index";

/**
 * ======================================================
 * ================ Web Storage Semantics ===============
 * ======================================================
 */

/**
 * Handle storage.setItem(key, value)
 */
function handleStorageSet(
  keyDef: any,
  valueDef: any,
  keySink: any,
  valueSink: any,
  astNode: any,
) {
  if (keyDef) {
    taintManager.checkSink(keyDef, keySink, astNode);
  }

  if (valueDef) {
    taintManager.checkSink(valueDef, valueSink, astNode);
  }
}

/**
 * --------------------- localStorage.setItem -------------------
 */
BuiltInSemantics.register(
  "localStorage.setItem",
  (args, _callNode, astNode) => {
    interAnalyzer.setCurrentSideEffects();

    const [keyDef, valueDef] = args;

    // TODO: 这里 handle storage 之后是否还能被 sink 识别到？
    handleStorageSet(
      keyDef,
      valueDef,
      "WEB_LOCAL_STORAGE_SET_KEY",
      "WEB_LOCAL_STORAGE_SET_VALUE",
      astNode,
    );

    return undefined;
  },
);

/**
 * --------------------- localStorage.removeItem -------------------
 */
BuiltInSemantics.register(
  "localStorage.removeItem",
  (args, _callNode, astNode) => {
    interAnalyzer.setCurrentSideEffects();

    const [keyDef] = args;

    if (keyDef) {
      taintManager.checkSink(
        keyDef,
        "WEB_LOCAL_STORAGE_REMOVE",
        astNode,
      );
    }

    return undefined;
  },
);

/**
 * --------------------- sessionStorage.setItem -------------------
 */
BuiltInSemantics.register(
  "sessionStorage.setItem",
  (args, _callNode, astNode) => {
    interAnalyzer.setCurrentSideEffects();

    const [keyDef, valueDef] = args;

    handleStorageSet(
      keyDef,
      valueDef,
      "WEB_SESSION_STORAGE_SET_KEY",
      "WEB_SESSION_STORAGE_SET_VALUE",
      astNode,
    );

    return undefined;
  },
);

/**
 * --------------------- sessionStorage.removeItem -------------------
 */
BuiltInSemantics.register(
  "sessionStorage.removeItem",
  (args, _callNode, astNode) => {
    interAnalyzer.setCurrentSideEffects();

    const [keyDef] = args;

    if (keyDef) {
      taintManager.checkSink(
        keyDef,
        "WEB_SESSION_STORAGE_REMOVE",
        astNode,
      );
    }

    return undefined;
  },
);
