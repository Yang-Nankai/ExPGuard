"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
/**
 * ======================================================
 * Function.prototype.constructor(code)
 * ======================================================
 */
index_1.BuiltInSemantics.register("Function.prototype.constructor", (args, _callNode, astNode, _thisDef) => {
    // NOTE: Creating new Function dynamically is unsafe
    const [codeDef] = args;
    index_1.taintManager.checkSink(codeDef, "NEW_FUNCTION", astNode);
    return undefined;
});
/**
 * ======================================================
 * Function.prototype.call(thisArg, ...args)
 * ======================================================
 */
index_1.BuiltInSemantics.register("Function.prototype.call", (args, callNode, astNode, thisDef) => {
    const [thisArg] = args;
    if (!index_1.Def.isFunctionDef(thisDef) ||
        !index_1.Def.isObjectDef(thisArg) ||
        args.length < 1)
        return undefined;
    // Execute function with remaining arguments
    return index_1.interAnalyzer.analyze(callNode, thisDef, args.slice(1), thisArg, astNode);
});
/**
 * ======================================================
 * Function.prototype.apply(thisArg, argsArray)
 * ======================================================
 */
index_1.BuiltInSemantics.register("Function.prototype.apply", (args, callNode, astNode, thisDef) => {
    const [thisArg, arrayLike] = args;
    if (!index_1.Def.isFunctionDef(thisDef) ||
        !index_1.Def.isObjectDef(thisArg) ||
        args.length < 2)
        return undefined;
    const argsDef = [];
    // apply(thisArg, arrayLike)
    if (index_1.Def.isObjectDef(arrayLike)) {
        for (const prop of arrayLike.props.values()) {
            argsDef.push(prop);
        }
    }
    return index_1.interAnalyzer.analyze(callNode, thisDef, argsDef, thisArg, astNode);
});
/**
 * ======================================================
 * Function.prototype.bind(thisArg, ...args)
 * ======================================================
 */
index_1.BuiltInSemantics.register("Function.prototype.bind", (args, callNode, _astNode, thisDef) => {
    const [thisArg] = args;
    if (!index_1.Def.isFunctionDef(thisDef) || args.length < 1)
        return undefined;
    // Create a new function def that wraps the original
    const boundFuncDef = index_1.defFactory.createFunctionDef(callNode, thisDef.functionNode);
    // Attach hidden thisArg for later CallExpression usage
    boundFuncDef.__thisObject = thisArg;
    return boundFuncDef;
});
