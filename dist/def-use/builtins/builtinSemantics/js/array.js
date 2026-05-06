"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
/**
 * ======================================================
 * Array.prototype.constructor(element0, element1, … elementN)
 * Array.prototype.constructor(arrayLength)
 * ======================================================
 */
index_1.BuiltInSemantics.register("Array.prototype.constructor", (args, callNode, astNode, thisDef) => {
    const array = index_1.Def.isObjectDef(thisDef)
        ? thisDef
        : index_1.DefFactory.createArrayInstanceDef(callNode, astNode);
    // Assign arguments as array elements
    if (index_1.Def.isLiteralDef(args[0]) && typeof args[0].value === "number") {
        return thisDef;
    }
    for (const arg of args) {
        array.setProperty(array.propsLength, arg);
    }
});
// --------------------- Array.prototype.at-------------------
index_1.BuiltInSemantics.register("Array.prototype.at", (args, callNode, _astNode, thisDef) => {
    const [index] = args;
    let element;
    if (!index_1.Def.isObjectDef(thisDef) || args.length < 1) {
        return index_1.defFactory.createUnknownDef(callNode);
    }
    if (index_1.Def.isLiteralDef(index)) {
        element = thisDef.getProperty(String(index.value));
    }
    element = index_1.defFactory.createImplicitDef(callNode, thisDef.values);
    return element !== null && element !== void 0 ? element : index_1.defFactory.createUnknownDef(callNode);
    // const element = defFactory.createUnknownDef(callNode);
    // if (!thisDef || !Def.isObjectDef(thisDef) || args.length < 1)
    //   return element;
    // [Taint Propagation] array elements need has the taint
    // taintManager.propagateTaint(thisDef, element, astNode, "ELEMENT", "array.at");
    // TODO: need to care about the returnDef(plan ImplictDef).
    // return element;
});
/**
 * ======================================================
 * Array.prototype.concat(...items)
 * Returns a NEW array consisting of the elements in the object on which it is called.
 * ======================================================
 */
index_1.BuiltInSemantics.register("Array.prototype.concat", (args, callNode, astNode, thisDef) => {
    const array = index_1.Def.isObjectDef(thisDef)
        ? thisDef
        : index_1.DefFactory.createArrayInstanceDef(callNode, astNode);
    // Merge all array arguments
    for (const arg of args) {
        if (!index_1.Def.isObjectDef(arg))
            continue;
        for (const e of arg.values) {
            array.setProperty(array.propsLength, e);
        }
    }
    return array;
});
/**
 * ======================================================
 * Array.prototype.fill(value)
 * ======================================================
 */
index_1.BuiltInSemantics.register("Array.prototype.fill", (args, _callNode, astNode, thisDef) => {
    const value = args[0];
    if (!index_1.Def.isObjectDef(thisDef) || !value)
        return thisDef;
    // fallback: set the last value
    thisDef.setProperty(thisDef.propsLength, value);
    index_1.taintManager.propagateTaint(value, thisDef, astNode, "MUTATE", "array.fill");
    return thisDef;
});
/**
 * ======================================================
 * Array.prototype.filter(callback)
 * ======================================================
 */
index_1.BuiltInSemantics.register("Array.prototype.filter", (_args, _callNode, _astNode, thisDef) => {
    // simplified return original array
    return thisDef;
});
/**
 * ======================================================
 * Array.prototype.find(callback)
 * ======================================================
 */
index_1.BuiltInSemantics.register("Array.prototype.find", (_args, callNode, astNode, thisDef) => {
    // NOTE: do not handle callbackFn
    const element = index_1.defFactory.createUnknownDef(callNode);
    if (!index_1.Def.isObjectDef(thisDef))
        return element;
    // Taint Propagation: element need has the taint
    index_1.taintManager.propagateTaint(thisDef, element, astNode, "ELEMENT", "array.find");
    return element;
});
/**
 * ======================================================
 * Array.prototype.forEach(callback)
 * ======================================================
 */
index_1.BuiltInSemantics.register("Array.prototype.forEach", (args, callNode, astNode, thisDef) => {
    // NOTE: handle callbackFn
    const callback = args[0];
    if (!index_1.Def.isFunctionDef(callback) || !index_1.Def.isObjectDef(thisDef)) {
        return undefined;
    }
    const element = index_1.defFactory.createImplicitDef(callNode, thisDef.values);
    // Track callback invocation with the element
    index_1.interAnalyzer.analyze(callNode, args[0], [element], null, astNode);
    return undefined;
});
/**
 * ======================================================
 * Array.prototype.map(callback)
 * ======================================================
 */
index_1.BuiltInSemantics.register("Array.prototype.map", (_args, _callNode, _astNode, thisDef) => {
    // simplified return original array
    return thisDef;
});
/**
 * ======================================================
 * Array.prototype.pop()
 * ======================================================
 */
index_1.BuiltInSemantics.register("Array.prototype.pop", (_args, callNode, astNode, thisDef) => {
    if (!index_1.Def.isObjectDef(thisDef))
        return index_1.defFactory.createUnknownDef(callNode);
    const element = index_1.defFactory.createUnknownDef(callNode);
    // Taint Propagation: element need has the taint
    index_1.taintManager.propagateTaint(thisDef, element, astNode, "ELEMENT", "array.pop");
    return element;
});
/**
 * ======================================================
 * Array.prototype.push(...items)
 * ======================================================
 */
index_1.BuiltInSemantics.register("Array.prototype.push", (args, callNode, _astNode, thisDef) => {
    if (!index_1.Def.isObjectDef(thisDef))
        return thisDef;
    for (const arg of args) {
        thisDef.setProperty(thisDef.propsLength, arg);
    }
    return index_1.defFactory.createLiteralDef(callNode, thisDef.propsLength);
});
/**
 * ======================================================
 * Array.prototype.reduce(callback)
 * ======================================================
 */
index_1.BuiltInSemantics.register("Array.prototype.reduce", (_args, callNode, astNode, thisDef) => {
    const result = index_1.defFactory.createUnknownDef(callNode);
    // Taint Propagation: element need has the taint
    index_1.taintManager.propagateTaint(thisDef, result, astNode, "ELEMENT", "array.reduce");
    return result;
});
/**
 * ======================================================
 * Array.prototype.reverse()
 * ======================================================
 */
index_1.BuiltInSemantics.register("Array.prototype.reverse", (_args, _callNode, _astNode, thisDef) => {
    // Simplified: just return original array
    return thisDef;
});
/**
 * ======================================================
 * Array.prototype.shift()
 * ======================================================
 */
index_1.BuiltInSemantics.register("Array.prototype.shift", (_args, callNode, astNode, thisDef) => {
    if (!index_1.Def.isObjectDef(thisDef))
        return index_1.defFactory.createUnknownDef(callNode);
    const element = index_1.defFactory.createUnknownDef(callNode);
    // Taint Propagation: element need has the taint
    index_1.taintManager.propagateTaint(thisDef, element, astNode, "ELEMENT", "array.shift");
    return element;
});
/**
 * ======================================================
 * Array.prototype.unshift(...items)
 * ======================================================
 */
index_1.BuiltInSemantics.register("Array.prototype.unshift", (args, callNode, _astNode, thisDef) => {
    if (!index_1.Def.isObjectDef(thisDef))
        return thisDef;
    for (const arg of args) {
        thisDef.setProperty(thisDef.propsLength, arg);
    }
    return index_1.defFactory.createLiteralDef(callNode, thisDef.propsLength);
});
/**
 * ======================================================
 * Array.prototype.sort(compareFn)
 * ======================================================
 */
index_1.BuiltInSemantics.register("Array.prototype.sort", (_args, _callNode, _astNode, thisDef) => {
    // Simplified: just return original array
    return thisDef;
});
/**
 * ======================================================
 * Array.prototype.toString()
 * ======================================================
 */
index_1.BuiltInSemantics.register("Array.prototype.toString", (_args, callNode, astNode, thisDef) => {
    const str = index_1.defFactory.createUnknownDef(callNode);
    // Taint Propagation: toString need contain the taint
    index_1.taintManager.propagateTaint(thisDef, str, astNode, "RETURN", "array.toString");
    return str;
});
/**
 * ======================================================
 * Array.prototype.join(separator)
 * ======================================================
 */
index_1.BuiltInSemantics.register("Array.prototype.join", (_args, callNode, astNode, thisDef) => {
    const str = index_1.defFactory.createUnknownDef(callNode);
    // Taint Propagation: join result need contain the taint
    index_1.taintManager.propagateTaint(thisDef, str, astNode, "RETURN", "array.join");
    return str;
});
/**
 * ======================================================
 * Array.prototype.slice(start, end)
 * ======================================================
 */
index_1.BuiltInSemantics.register("Array.prototype.slice", (_args, _callNode, _astNode, thisDef) => {
    // Simplified: return the original array
    return thisDef;
});
/**
 * ======================================================
 * Array.prototype.splice(...)
 * ======================================================
 */
index_1.BuiltInSemantics.register("Array.prototype.splice", (_args, _callNode, _astNode, thisDef) => {
    // Simplified: return the original array
    return thisDef;
});
// --------------------- Array.prototype.set-------------------
// BuiltInSemantics.register(
//   "Array.prototype.set",
//   (args, _callNode, astNode, thisDef) => {
//     // set for TypedArray
//     const [source /*, offset */] = args;
//     if (!Def.isObjectDef(thisDef)) return undefined;
//     // Set property
//     thisDef.setProperty(thisDef.propsLength, source);
//     return undefined;
//   },
// );
/**
 * ======================================================
 * Array.from(source, mapFn?, thisArg?)
 * Creates a new Array instance from an array-like or iterable object.
 * ======================================================
 */
index_1.BuiltInSemantics.register("Array.from", (args, callNode, astNode) => {
    const [source] = args;
    const elements = index_1.Def.isObjectDef(source) ? [...source.values] : [];
    const newArray = index_1.DefFactory.createArrayInstanceDef(callNode, astNode, elements);
    return newArray;
});
/**
 * ======================================================
 * Array.of(...items)
 * ======================================================
 */
index_1.BuiltInSemantics.register("Array.of", (args, callNode, astNode) => {
    return index_1.DefFactory.createArrayInstanceDef(callNode, astNode, [...args]);
});
