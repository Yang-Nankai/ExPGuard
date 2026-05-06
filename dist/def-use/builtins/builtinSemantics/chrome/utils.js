"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createChromeBuiltinSemantics = createChromeBuiltinSemantics;
exports.createChromeEventListenerSemantics = createChromeEventListenerSemantics;
const index_1 = require("../index");
/**
 * Helper: common chrome api builtin semantics handler
 */
function createChromeBuiltinSemantics({ apiName, callbackIndex, sourceType, createReturnDef, sinkArgs = [], }) {
    index_1.BuiltInSemantics.register(apiName, (args, callNode, astNode, _thisDef) => {
        // Always mark side effect
        index_1.interAnalyzer.setCurrentSideEffects();
        // ---- handle sinkArgs ----
        for (const { index, sinkType, remark } of sinkArgs) {
            if (args[index]) {
                index_1.taintManager.checkSink(args[index], sinkType, astNode, remark);
            }
        }
        // ---------- callback-style ----------
        if (callbackIndex !== undefined &&
            args.length > callbackIndex &&
            index_1.Def.isFunctionDef(args[callbackIndex])) {
            const callbackFunc = args[callbackIndex];
            // If it's source-style, pass the source def to the callback.
            let callbackArgDef = null;
            if (sourceType && createReturnDef) {
                callbackArgDef = createReturnDef(callNode, astNode);
                if (callbackArgDef) {
                    index_1.taintManager.createTaintSource(callbackArgDef, sourceType, astNode);
                }
            }
            index_1.interAnalyzer.analyze(callNode, callbackFunc, callbackArgDef ? [callbackArgDef] : [], null, astNode);
            return index_1.defFactory.createUndefinedDef(callNode);
        }
        // ---------- promise-style ----------
        if (sourceType && createReturnDef) {
            const retPromise = index_1.defFactory.createPromiseDef(callNode);
            const retDef = createReturnDef(callNode, astNode);
            index_1.taintManager.createTaintSource(retDef, sourceType, astNode);
            retPromise.resolve(retDef);
            return retPromise;
        }
        // action-style: just return promise<void>
        return index_1.defFactory.createPromiseDef(callNode);
    });
}
function createChromeEventListenerSemantics({ apiName, sourceIndexes = [], sourceType, paramDefs, }) {
    const sourceIndexSet = new Set(sourceIndexes);
    index_1.BuiltInSemantics.register(apiName, (args, callNode, astNode) => {
        // chrome.xxx.addListener(cb)
        if (args.length === 0 || !index_1.Def.isFunctionDef(args[0])) {
            return index_1.defFactory.createUndefinedDef(callNode);
        }
        const callbackFunc = args[0];
        const callbackArgs = paramDefs.map((factory, index) => {
            const def = factory(callNode);
            if (sourceIndexSet.has(index)) {
                index_1.taintManager.createTaintSource(def, sourceType, astNode);
            }
            return def;
        });
        index_1.interAnalyzer.analyze(callNode, callbackFunc, callbackArgs, null, astNode);
        return index_1.defFactory.createUndefinedDef(callNode);
    });
}
