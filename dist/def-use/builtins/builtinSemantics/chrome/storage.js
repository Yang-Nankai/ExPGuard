"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
/**
 * Register chrome.storage.[area].set semantics.
 */
function registerStorageSet(area) {
    const sinkTypeMap = {
        local: "CHROME_LOCAL_STORAGE",
        sync: "CHROME_SYNC_STORAGE",
        session: "CHROME_SESSION_STORAGE",
    };
    const sinkType = sinkTypeMap[area];
    index_1.BuiltInSemantics.register(`chrome.storage.${area}.set`, (args, callNode, astNode, _thisDef) => {
        // Mark this call as having side effects
        index_1.interAnalyzer.setCurrentSideEffects();
        const [items, callbackFunc] = args;
        /**
         * Only object form is supported by Chrome API:
         * chrome.storage.xxx.set({ key: value })
         */
        if (index_1.Def.isObjectDef(items)) {
            for (const [key, value] of items.props) {
                // record storage set
                index_1.taintManager.recordStorageSet(area, key, value, astNode);
                // Treat storage write as a sink
                // If value is tainted → this is a sensitive flow
                index_1.taintManager.checkSink(value, sinkType, astNode, key);
            }
        }
        // Handle fuzzy / non-object case
        else if (items === null || items === void 0 ? void 0 : items.isTainted) {
            index_1.taintManager.checkSink(items, sinkType, astNode, "storage.fuzzy.settings");
        }
        // Callback style
        if (index_1.Def.isFunctionDef(callbackFunc)) {
            index_1.interAnalyzer.analyze(callNode, callbackFunc, [], null, astNode);
        }
        return undefined;
    });
}
// Register storage set semantics
registerStorageSet("local");
registerStorageSet("sync");
registerStorageSet("session");
// --------------------- chrome.storage.[area].get helper ---------------------
/**
 * Resolve values from the simulated storage model based on different key types.
 */
function resolveStorageValue(area, keyDef, callNode, astNode) {
    const result = index_1.defFactory.createObjectDef(callNode);
    if (!keyDef)
        return result;
    /**
     * Read a single key from storage and attach it to result.
     * Also propagates taint if the stored value is tainted.
     */
    const attachStoredValue = (key) => {
        const stored = index_1.defFactory.createUnknownDef(callNode);
        index_1.taintManager.recordStorageGet(area, key, stored, astNode);
        result.setProperty(key, stored);
    };
    // Case 0: null / undefined / no argument
    if (!keyDef ||
        (index_1.Def.isLiteralDef(keyDef) &&
            (keyDef.value === null || keyDef.value === undefined))) {
        // If get the all items, then set a taint
        index_1.taintManager.createTaintSource(result, "STORAGE_ALL_ITEMS", astNode, false, `storage.all.items[${area}]`);
        return result;
    }
    //  Case 1: Literal key
    if (index_1.Def.isLiteralDef(keyDef)) {
        attachStoredValue(String(keyDef.value));
        return result;
    }
    // Case 2: Array of keys
    if (index_1.Def.isObjectDef(keyDef) &&
        keyDef.proto === index_1.BuiltInRegistry.getArrayPrototype()) {
        for (const element of keyDef.values) {
            if (index_1.Def.isLiteralDef(element)) {
                attachStoredValue(String(element.value));
            }
        }
        return result;
    }
    // Case 3: Object with default values
    if (index_1.Def.isObjectDef(keyDef)) {
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
function registerStorageGet(area) {
    index_1.BuiltInSemantics.register(`chrome.storage.${area}.get`, (args, callNode, astNode) => {
        index_1.interAnalyzer.setCurrentSideEffects();
        const [keys, callback] = args;
        const result = resolveStorageValue(area, keys, callNode, astNode);
        // Callback style
        if (index_1.Def.isFunctionDef(callback)) {
            index_1.interAnalyzer.analyze(callNode, callback, [result], null, astNode);
            return undefined;
        }
        // Promise style
        return index_1.defFactory.createPromiseDef(callNode, result);
    });
}
// --------------------- Register storage areas ---------------------
registerStorageGet("local");
registerStorageGet("sync");
registerStorageGet("session");
