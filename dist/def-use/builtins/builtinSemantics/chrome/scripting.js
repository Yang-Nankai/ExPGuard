"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
const scriptUsageTracker_1 = require("../../../../extension/scriptUsageTracker");
// --------------------- chrome.scripting.executeScript -------------------
index_1.BuiltInSemantics.register("chrome.scripting.executeScript", (args, callNode, astNode, _thisDef) => {
    var _a, _b;
    index_1.interAnalyzer.setCurrentSideEffects(); // side effect
    const options = args[0];
    if (index_1.Def.isObjectDef(options)) {
        const funcDef = options.lookupProperty("func");
        const argsDef = options.lookupProperty("args");
        const filesDef = options.lookupProperty("files");
        const fileDef = options.lookupProperty("file");
        if (index_1.Def.isObjectDef(filesDef)) {
            for (const item of filesDef.values) {
                if (index_1.Def.isLiteralDef(item) && typeof item.value === "string") {
                    scriptUsageTracker_1.scriptUsageTracker.markReferencedScriptByPathOrUrlByKey((_a = callNode.scopeTree) === null || _a === void 0 ? void 0 : _a.key, item.value);
                }
            }
        }
        if (index_1.Def.isLiteralDef(fileDef) && typeof fileDef.value === "string") {
            scriptUsageTracker_1.scriptUsageTracker.markReferencedScriptByPathOrUrlByKey((_b = callNode.scopeTree) === null || _b === void 0 ? void 0 : _b.key, fileDef.value);
        }
        if (index_1.Def.isFunctionDef(funcDef)) {
            const argDefs = index_1.Def.isObjectDef(argsDef) ? [...argsDef.values] : [];
            index_1.interAnalyzer.analyze(callNode, funcDef, argDefs, null, astNode);
        }
        return index_1.defFactory.createPromiseDef(callNode);
    }
});
