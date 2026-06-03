import {
  BuiltInRegistry,
  BuiltInSemantics,
  Def,
  defFactory,
  DefFactory,
  FlowNode,
  interAnalyzer,
  Node,
  ObjectDef,
  taintManager,
} from "../index";

/**
 * Register chrome.storage.[area].set semantics.
 */
function registerStorageSet(area: "local" | "sync" | "session") {
  const sinkTypeMap = {
    local: "CHROME_LOCAL_STORAGE",
    sync: "CHROME_SYNC_STORAGE",
    session: "CHROME_SESSION_STORAGE",
  } as const;

  const sinkType = sinkTypeMap[area];

  BuiltInSemantics.register(
    `chrome.storage.${area}.set`,
    (args, callNode, astNode, _thisDef) => {
      // Mark this call as having side effects
      interAnalyzer.setCurrentSideEffects();

      const [items, callbackFunc] = args;

      /**
       * Only object form is supported by Chrome API:
       * chrome.storage.xxx.set({ key: value })
       */
      if (Def.isObjectDef(items)) {
        for (const [key, value] of items.props) {
          // record storage set
          taintManager.recordStorageSet(area, key, value, astNode);

          // Treat storage write as a sink
          // If value is tainted → this is a sensitive flow
          taintManager.checkSink(value, sinkType, astNode, key);
        }
      }

      // Handle fuzzy / non-object case
      else if (items?.isTainted) {
        taintManager.checkSink(items, sinkType, astNode, "storage.fuzzy.settings");
      }

      // Callback style
      if (Def.isFunctionDef(callbackFunc)) {
        interAnalyzer.analyze(callNode, callbackFunc, [], null, astNode);
      }

      return undefined;
    },
  );
}

// Register storage set semantics
registerStorageSet("local");
registerStorageSet("sync");
registerStorageSet("session");

// --------------------- chrome.storage.[area].get helper ---------------------
/**
 * Resolve values from the simulated storage model based on different key types.
 */
function resolveStorageValue(
  area: "local" | "sync" | "session",
  keyDef: Def | undefined,
  callNode: FlowNode,
  astNode: Node,
): ObjectDef {
  const result = defFactory.createObjectDef(callNode);
  if (!keyDef) return result;

  /**
   * Read a single key from storage and attach it to result.
   * Also propagates taint if the stored value is tainted.
   */
  const attachStoredValue = (key: string) => {
    const stored = defFactory.createUnknownDef(callNode);
    taintManager.recordStorageGet(area, key, stored, astNode);

    result.setProperty(key, stored);
  };

  // Case 0: null / undefined / no argument
  if (
    !keyDef ||
    (Def.isLiteralDef(keyDef) &&
      (keyDef.value === null || keyDef.value === undefined))
  ) {
    // If get the all items, then set a taint
    taintManager.createTaintSource(
      result,
      "STORAGE_ALL_ITEMS",
      astNode,
      false,
      `storage.all.items[${area}]`,
    );
    return result;
  }

  //  Case 1: Literal key
  if (Def.isLiteralDef(keyDef)) {
    attachStoredValue(String(keyDef.value));
    return result;
  }

  // Case 2: Array of keys
  if (
    Def.isObjectDef(keyDef) &&
    keyDef.proto === BuiltInRegistry.getArrayPrototype()
  ) {
    for (const element of keyDef.values) {
      if (Def.isLiteralDef(element)) {
        attachStoredValue(String(element.value));
      }
    }
    return result;
  }

  // Case 3: Object with default values
  if (Def.isObjectDef(keyDef)) {
    for (const [propName] of keyDef.props) {
      attachStoredValue(String(propName));
    }
    return result;
  }

  // Unknown key type
  return result;
}

/**
 * Register chrome.storage.[area].get semantics.
 */
function registerStorageGet(area: "local" | "sync" | "session") {
  BuiltInSemantics.register(
    `chrome.storage.${area}.get`,
    (args, callNode, astNode) => {
      interAnalyzer.setCurrentSideEffects();

      const [keys, callback] = args;

      const result = resolveStorageValue(area, keys, callNode, astNode);

      // Callback style
      if (Def.isFunctionDef(callback)) {
        interAnalyzer.analyze(callNode, callback, [result], null, astNode);
        return undefined;
      }

      // Promise style
      return defFactory.createPromiseDef(callNode, result);
    },
  );
}

// --------------------- Register storage areas ---------------------

registerStorageGet("local");
registerStorageGet("sync");
registerStorageGet("session");

// --------------------- chrome.storage.managed.get ---------------------
// `managed` is read-only enterprise-policy data. Unlike local/sync/session it
// is not an extension-controlled Set↔Get bridge — it is a sensitive *source*
// (high-integrity, admin-provisioned). Model get() as minting a
// CHROME_MANAGED_STORAGE taint source rather than a storage round-trip.
BuiltInSemantics.register(
  "chrome.storage.managed.get",
  (args, callNode, astNode) => {
    interAnalyzer.setCurrentSideEffects();

    const [, callback] = args;
    const result = defFactory.createObjectDef(callNode);

    taintManager.createTaintSource(
      result,
      "CHROME_MANAGED_STORAGE",
      astNode,
      false,
      "storage.managed",
    );

    // Callback style
    if (Def.isFunctionDef(callback)) {
      interAnalyzer.analyze(callNode, callback, [result], null, astNode);
      return undefined;
    }

    // Promise style
    return defFactory.createPromiseDef(callNode, result);
  },
);
