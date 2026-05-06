"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
// --------------------- Blob.prototype.constructor -------------------
index_1.BuiltInSemantics.register("Blob.prototype.constructor", (args, callNode, _astNode, thisDef) => {
    const newObj = index_1.Def.isObjectDef(thisDef)
        ? thisDef
        : index_1.defFactory.createObjectDef(callNode);
    const [parts] = args;
    // new Blob(parts)
    if (index_1.Def.isObjectDef(parts)) {
        for (const [, value] of parts.props) {
            newObj.setProperty(newObj.propsLength, value);
        }
    }
    return newObj;
});
// --------------------- Blob.prototype.slice -------------------
index_1.BuiltInSemantics.register("Blob.prototype.slice", (_args, _callNode, _astNode, thisDef) => {
    // Simplified: just return original string
    return thisDef;
});
// --------------------- Blob.prototype.arrayBuffer -------------------
index_1.BuiltInSemantics.register("Blob.prototype.arrayBuffer", (_args, callNode, astNode, thisDef) => {
    if (!index_1.Def.isObjectDef(thisDef))
        return undefined;
    const bufferObj = index_1.DefFactory.createArrayInstanceDef(callNode, astNode, []);
    for (const [, value] of thisDef.props) {
        bufferObj.setProperty(bufferObj.propsLength, value);
    }
    return bufferObj;
});
// --------------------- Blob.prototype.text -------------------
index_1.BuiltInSemantics.register("Blob.prototype.text", (_args, callNode, astNode, thisDef) => {
    if (!index_1.Def.isObjectDef(thisDef))
        return undefined;
    const strObj = index_1.defFactory.createUnknownDef(callNode);
    // Taint Propagation: the result should be taint
    index_1.taintManager.propagateTaint(thisDef, strObj, astNode, "RETURN", "blob.text");
    return strObj;
});
// --------------------- Blob.prototype.stream -------------------
index_1.BuiltInSemantics.register("Blob.prototype.stream", (_args, _callNode, _astNode, thisDef) => {
    // Simplified: just return original string
    return thisDef;
});
// --------------------- Blob.prototype.bytes -------------------
index_1.BuiltInSemantics.register("Blob.prototype.bytes", (_args, _callNode, _astNode, thisDef) => {
    // Simplified: just return original string
    return thisDef;
});
