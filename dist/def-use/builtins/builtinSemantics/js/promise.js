"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
// --------------------- executor.resolve-------------------
index_1.BuiltInSemantics.register("executor.resolve", (args, _callNode, _astNode, thisDef) => {
    const [value] = args;
    if (value && index_1.Def.isPromiseDef(thisDef)) {
        // Resolve the promise with the first argument
        thisDef.resolve(value);
    }
    return undefined;
});
// --------------------- Promise.prototype.then-------------------
index_1.BuiltInSemantics.register("Promise.prototype.then", (args, callNode, astNode, thisDef) => {
    var _a;
    const [onFulfilled] = args;
    // Create a new Promise to return
    const newPromise = index_1.defFactory.createPromiseDef(callNode);
    if (!index_1.Def.isPromiseDef(thisDef))
        return newPromise;
    // If a fulfillment callback is provided
    if (index_1.Def.isFunctionDef(onFulfilled)) {
        const fulfillArg = (_a = thisDef.resolvedDef) !== null && _a !== void 0 ? _a : index_1.defFactory.createUndefinedDef(callNode);
        // Track callback execution
        index_1.interAnalyzer.analyze(callNode, onFulfilled, [fulfillArg], thisDef, astNode);
        // Set new promise's resolved value
        newPromise.resolve(fulfillArg);
    }
    return newPromise;
});
// --------------------- Promise.prototype.constructor -------------------
index_1.BuiltInSemantics.register("Promise.prototype.constructor", (args, callNode, astNode, thisDef) => {
    const newObj = index_1.Def.isPromiseDef(thisDef)
        ? thisDef
        : index_1.defFactory.createPromiseDef(callNode);
    // Initialize promise value
    newObj.resolve(index_1.defFactory.createUndefinedDef(callNode));
    if (!index_1.Def.isFunctionDef(args[0]))
        return newObj;
    const executorFunc = args[0];
    // Create a built-in resolve function bound to this Promise
    const resolveFunc = index_1.defFactory.createBuiltInFunctionDef(callNode, "executor.resolve");
    resolveFunc.semanticExec = index_1.BuiltInSemantics.get("executor.resolve");
    resolveFunc.thisDef = newObj;
    // Track executor invocation
    index_1.interAnalyzer.analyze(callNode, executorFunc, [resolveFunc], newObj, astNode);
    return newObj;
});
// --------------------- Promise.resolve-------------------
index_1.BuiltInSemantics.register("Promise.resolve", (args, callNode) => {
    const [value] = args;
    // If wrong call
    if (!value)
        return index_1.defFactory.createUndefinedDef(callNode);
    // If argument is already a PromiseDef, return it directly
    if (index_1.Def.isPromiseDef(value))
        return value;
    // Otherwise, wrap value in a new Promise
    return index_1.defFactory.createPromiseDef(callNode, value);
});
// --------------------- Promise.all-------------------
index_1.BuiltInSemantics.register("Promise.all", (args, callNode, astNode, _thisDef) => {
    var _a;
    const [iterable] = args;
    // Must be array-like
    if (!iterable || !index_1.Def.isObjectDef(iterable)) {
        return index_1.defFactory.createUnknownDef(callNode);
    }
    const arrayObj = iterable;
    const resolvedValues = [];
    const undefinedDef = index_1.defFactory.createUndefinedDef(callNode);
    for (const [, value] of arrayObj.props) {
        // Non-Promise element fails modeling
        if (!index_1.Def.isPromiseDef(value))
            return undefinedDef;
        resolvedValues.push((_a = value.resolvedDef) !== null && _a !== void 0 ? _a : undefinedDef);
    }
    // Create array of resolved values and wrap in new Promise
    const resultArray = index_1.DefFactory.createArrayInstanceDef(callNode, astNode, resolvedValues);
    return index_1.defFactory.createPromiseDef(callNode, resultArray);
});
