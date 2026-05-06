"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
// --------------------- Set.prototype.constructor-------------------
index_1.BuiltInSemantics.register("Set.prototype.constructor", (args, callNode, _astNode, thisDef) => {
    const [arrayLike] = args;
    const newObj = index_1.Def.isObjectDef(thisDef)
        ? thisDef
        : index_1.defFactory.createObjectDef(callNode);
    // If first argument is array-like, add all elements to set
    if (index_1.Def.isObjectDef(arrayLike)) {
        for (const [, value] of arrayLike.props) {
            newObj.setProperty(newObj.propsLength, value);
        }
    }
    return newObj;
});
// --------------------- Set.prototype.add-------------------
index_1.BuiltInSemantics.register("Set.prototype.add", (args, _callNode, _astNode, thisDef) => {
    if (!index_1.Def.isObjectDef(thisDef) || args.length < 1)
        return thisDef;
    const [value] = args;
    thisDef.setProperty(thisDef.propsLength, value);
    return thisDef;
});
// --------------------- Set.prototype.clear-------------------
index_1.BuiltInSemantics.register("Set.prototype.clear", (_args, _callNode, _astNode, thisDef) => {
    if (!index_1.Def.isObjectDef(thisDef))
        return undefined;
    const setObj = thisDef;
    setObj.props.clear();
    return undefined;
});
// --------------------- Set.prototype.union-------------------
index_1.BuiltInSemantics.register("Set.prototype.union", (args, _callNode, _astNode, thisDef) => {
    if (!index_1.Def.isObjectDef(thisDef) || args.length < 1)
        return thisDef;
    const [otherSet] = args;
    if (index_1.Def.isObjectDef(otherSet)) {
        for (const [, value] of otherSet.props) {
            thisDef.setProperty(thisDef.propsLength, value);
        }
    }
    return thisDef;
});
// --------------------- Set.prototype.forEach-------------------
index_1.BuiltInSemantics.register("Set.prototype.forEach", (args, callNode, astNode, thisDef) => {
    const [callbackFunc] = args;
    if (!index_1.Def.isFunctionDef(callbackFunc) || !index_1.Def.isObjectDef(thisDef)) {
        return undefined;
    }
    const element = index_1.defFactory.createImplicitDef(callNode, thisDef.values);
    // Track callback invocation with element
    index_1.interAnalyzer.analyze(callNode, callbackFunc, [element], null, astNode);
    return undefined;
});
