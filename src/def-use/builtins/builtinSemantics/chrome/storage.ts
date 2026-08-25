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
    // Retain only producer-proven primitive/syntax-safe field kinds.  Unknown
    // fields still use the old opaque model, so page strings remain tainted
    // when read back through extension storage.
    const stored = taintManager.getStorageReadShape(area, key, callNode)
      ?? defFactory.createUnknownDef(callNode);
    stored.markStorageSerialized();
    taintManager.recordStorageGet(area, key, stored, astNode);

    // A specific storage read taints that property, not the complete result
    // map.  Otherwise `get(["token", "theme"])` makes `result.theme`
    // inherit `token`'s taint through generic container propagation.
    result.setProperty(key, stored, false);
  };

  // Case 0: null / undefined / no argument
  if (
    !keyDef ||
    (Def.isLiteralDef(keyDef) &&
      (keyDef.value === null || keyDef.value === undefined))
  ) {
    // `get(null)` reads every key in the area — a consumer for all of them.
    taintManager.recordStorageWildcardRead(area);

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

  // A bounded ImplicitDef represents concrete alternatives (for example
  // `keys[index]` where `keys` is ["token", "theme"]). Model every literal
  // alternative precisely; retain a wildcard only for genuinely unresolved
  // alternatives, never for the known ones.
  if (Def.isImplicitDef(keyDef)) {
    let hasUnknownAlternative = false;
    for (const candidate of keyDef.defs) {
      if (Def.isLiteralDef(candidate)) {
        attachStoredValue(String(candidate.value));
      } else {
        hasUnknownAlternative = true;
      }
    }
    if (hasUnknownAlternative) taintManager.recordStorageWildcardRead(area);
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

  // Generic wrappers such as `getStorage(keys)` often lose the caller's
  // literal-array shape during inter-procedural modeling. Keep shapes for
  // known literal producer keys while retaining the wildcard below for every
  // unresolved key, so raw storage text remains conservative.
  for (const [key, stored] of taintManager.getKnownStorageReadShapes(area, callNode)) {
    taintManager.recordStorageGet(area, key, stored, astNode);
    result.setProperty(key, stored, false);
  }

  // Unknown key type — the call could read anything in the area, so it counts
  // as a consumer for every key (conservative; see `hasStorageConsumer`).
  taintManager.recordStorageWildcardRead(area);
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

// --------------------- chrome.storage.onChanged.addListener ---------------------
// An onChanged listener observes writes to every key in every area, so it is a
// wildcard consumer. Modeling it also gets the listener body analyzed, which is
// a common place for "act on freshly poisoned config" logic.
BuiltInSemantics.register(
  "chrome.storage.onChanged.addListener",
  (args, callNode, astNode) => {
    interAnalyzer.setCurrentSideEffects();
    taintManager.recordStorageWildcardRead("*");

    const [callback] = args;
    if (!Def.isFunctionDef(callback)) return defFactory.createUndefinedDef(callNode);

    // (changes, areaName). `changes` values originate from storage; the
    // storage round-trip resolution owns that taint, so pass opaque values
    // here and let this call contribute reachability only.
    const changes = defFactory.createObjectDef(callNode);
    const areaName = defFactory.createUnknownDef(callNode);

    interAnalyzer.analyze(callNode, callback, [changes, areaName], null, astNode);

    return defFactory.createUndefinedDef(callNode);
  },
);

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
