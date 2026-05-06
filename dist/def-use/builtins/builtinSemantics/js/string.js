"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
/**
 * ======================================================
 * String.fromCharCode(...codes)
 * ======================================================
 */
index_1.BuiltInSemantics.register("String.fromCharCode", (args, callNode, astNode) => {
    const resDef = index_1.defFactory.createUnknownDef(callNode);
    // Taint Propagation
    for (const arg of args) {
        index_1.taintManager.propagateTaint(arg, resDef, astNode, "RETURN", "string.fromCharCode");
    }
    return resDef;
});
/**
 * ======================================================
 * String.prototype.concat(...strings)
 * ======================================================
 */
index_1.BuiltInSemantics.register("String.prototype.concat", (args, callNode, astNode, thisDef) => {
    if (!thisDef)
        return index_1.defFactory.createUnknownDef(callNode);
    // Taint Propagation
    for (const arg of args) {
        index_1.taintManager.propagateTaint(arg, thisDef, astNode, "RETURN", "string.concat");
    }
    return thisDef;
});
/**
 * ======================================================
 * String.prototype.normalize(form?)
 * ======================================================
 */
index_1.BuiltInSemantics.register("String.prototype.normalize", (_args, _callNode, _astNode, thisDef) => {
    // Simplified: just return original string
    return thisDef;
});
/**
 * ======================================================
 * String.prototype.repeat(count)
 * ======================================================
 */
index_1.BuiltInSemantics.register("String.prototype.repeat", (_args, _callNode, _astNode, thisDef) => {
    // Simplified: just return original string
    return thisDef;
});
/**
 * ======================================================
 * String.prototype.replace(searchValue, replaceValue)
 * ======================================================
 */
index_1.BuiltInSemantics.register("String.prototype.replace", (args, _callNode, astNode, thisDef) => {
    const [pattern, replacement] = args;
    index_1.taintManager.propagateTaint(replacement, thisDef, astNode, "MUTATE", "string.replace");
    return thisDef;
});
/**
 * ======================================================
 * String.prototype.replaceAll(searchValue, replaceValue)
 * ======================================================
 */
index_1.BuiltInSemantics.register("String.prototype.replaceAll", (args, _callNode, astNode, thisDef) => {
    const [pattern, replacement] = args;
    index_1.taintManager.propagateTaint(replacement, thisDef, astNode, "MUTATE", "string.replace");
    return thisDef;
});
/**
 * ======================================================
 * String.prototype.slice(start?, end?)
 * ======================================================
 */
index_1.BuiltInSemantics.register("String.prototype.slice", (_args, _callNode, _astNode, thisDef) => {
    // Simplified: just return original string
    return thisDef;
});
/**
 * ======================================================
 * String.prototype.split(separator?, limit?)
 * ======================================================
 */
index_1.BuiltInSemantics.register("String.prototype.split", (_args, callNode, astNode, thisDef) => {
    const element = index_1.defFactory.createUnknownDef(callNode);
    // Taint Propagation
    index_1.taintManager.propagateTaint(thisDef, element, astNode, "ELEMENT", "string.split");
    return index_1.DefFactory.createArrayInstanceDef(callNode, astNode, [element]);
});
/**
 * ======================================================
 * String.prototype.substring(start, end?)
 * ======================================================
 */
index_1.BuiltInSemantics.register("String.prototype.substring", (_args, _callNode, _astNode, thisDef) => {
    // Simplified: just return original string
    return thisDef;
});
/**
 * ======================================================
 * String.prototype.trim()
 * ======================================================
 */
index_1.BuiltInSemantics.register("String.prototype.trim", (_args, _callNode, _astNode, thisDef) => {
    // Simplified: just return original string
    return thisDef;
});
/**
 * ======================================================
 * String.prototype.trimEnd()
 * ======================================================
 */
index_1.BuiltInSemantics.register("String.prototype.trimEnd", (_args, _callNode, _astNode, thisDef) => {
    // Simplified: just return original string
    return thisDef;
});
/**
 * ======================================================
 * String.prototype.trimStart()
 * ======================================================
 */
index_1.BuiltInSemantics.register("String.prototype.trimStart", (_args, _callNode, _astNode, thisDef) => {
    // Simplified: just return original string
    return thisDef;
});
