"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuiltInSemantics = void 0;
const taint_1 = require("../../taint");
const defFactory_1 = require("../factories/defFactory");
const def_1 = __importDefault(require("../types/def"));
const interProceduralAnalyzer_1 = require("../analyzers/interProceduralAnalyzer");
const utils_1 = require("../utils/utils");
const builtinRegistry_1 = require("./builtinRegistry");
const logger_1 = __importDefault(require("../../utils/logger"));
class BuiltInSemantics {
    static register(name, fn) {
        this.registry.set(name, fn);
    }
    static get(name) {
        var _a;
        return (_a = this.registry.get(name)) !== null && _a !== void 0 ? _a : null;
    }
}
exports.BuiltInSemantics = BuiltInSemantics;
BuiltInSemantics.registry = new Map();
/**
 * ======================================================
 * ================== Object Semantics ==================
 * ======================================================
 */
// --------------------- Object.assign-------------------
BuiltInSemantics.register("Object.assign", (args) => {
    const [target, ...sources] = args;
    if (!def_1.default.isObjectDef(target) || args.length < 1)
        return target;
    for (const source of sources) {
        if (!def_1.default.isObjectDef(source))
            continue;
        for (const [k, v] of source.props) {
            target.setPropertyByName(k, v);
        }
    }
    return target;
});
// --------------------- Object.create-------------------
BuiltInSemantics.register("Object.create", (args, callNode, astNode) => {
    const proto = def_1.default.isObjectDef(args[0]) ? args[0] : null;
    const newObj = defFactory_1.defFactory.createObjectDef(callNode, new Map(), proto);
    // [Taint Propagation] new obj will be tained by proto
    taint_1.taintManager.propagateTaint(proto, newObj, astNode, "INITIAL", "object.create");
    return newObj;
});
// --------------------- Object.defineProperties-------------------
BuiltInSemantics.register("Object.defineProperties", (args) => {
    const [target, ...sources] = args;
    if (!def_1.default.isObjectDef(target) || args.length < 1)
        return target;
    for (const source of sources) {
        if (!def_1.default.isObjectDef(source))
            continue;
        for (const [k, v] of source.props) {
            target.setPropertyByName(k, v);
        }
    }
    return target;
});
// --------------------- Object.defineProperty-------------------
BuiltInSemantics.register("Object.defineProperty", (args) => {
    const [target, descriptor] = args;
    if (!def_1.default.isObjectDef(target) ||
        !def_1.default.isObjectDef(descriptor) ||
        args.length < 2)
        return target;
    for (const [k, v] of descriptor.props) {
        target.setPropertyByName(k, v);
    }
    return target;
});
// --------------------- Object.entries-------------------
BuiltInSemantics.register("Object.entries", (args, callNode, astNode) => {
    const [obj] = args;
    if (!def_1.default.isObjectDef(obj) || args.length < 1)
        return defFactory_1.defFactory.createUnknownDef(callNode);
    return defFactory_1.DefFactory.createArrayInstanceDef(callNode, astNode, [
        ...obj.props.values(),
    ]);
});
// --------------------- Object.values-------------------
BuiltInSemantics.register("Object.values", (args, callNode, astNode) => {
    const [obj] = args;
    if (!def_1.default.isObjectDef(obj) || args.length < 1)
        return defFactory_1.defFactory.createUnknownDef(callNode);
    return defFactory_1.DefFactory.createArrayInstanceDef(callNode, astNode, [
        ...obj.props.values(),
    ]);
});
// --------------------- Object.getPrototypeOf-------------------
BuiltInSemantics.register("Object.getPrototypeOf", (args) => {
    var _a;
    const [obj] = args;
    if (!def_1.default.isObjectDef(obj) || args.length < 1)
        return null;
    // Return prototype if exists, otherwise null
    return (_a = obj.proto) !== null && _a !== void 0 ? _a : null;
});
// --------------------- Object.setPrototypeOf -------------------
BuiltInSemantics.register("Object.setPrototypeOf", (args) => {
    const [obj, protoCandidate] = args;
    // Only valid if obj is ObjectDef
    if (!def_1.default.isObjectDef(obj) || args.length < 2)
        return null;
    // Only allow ObjectDef as prototype, otherwise set null
    obj.proto = def_1.default.isObjectDef(protoCandidate) ? protoCandidate : null;
    return obj;
});
/**
 * ======================================================
 * ================== TextEncoder Semantics ==================
 * ======================================================
 */
// --------------------- TextEncoder.prototype.encode -------------------
BuiltInSemantics.register("TextEncoder.prototype.encode", (args, callNode, astNode, thisDef) => {
    const input = args[0];
    // Get Uint8Array constructor
    const uint8ArrayCtor = builtinRegistry_1.BuiltInRegistry.getUnit8ArrayConstructor();
    const uint8ArrayDef = defFactory_1.DefFactory.createClassInstanceDef(uint8ArrayCtor, callNode, astNode, [input]);
    // [Taint Propagation] new obj will be tained by input
    if (input) {
        taint_1.taintManager.propagateTaint(input, uint8ArrayDef, astNode, "RETURN", "TextEncoder.encode");
    }
    return uint8ArrayDef;
});
/**
 * ======================================================
 * ================== Unit8Array Semantics ==================
 * ======================================================
 */
// --------------------- Uint8Array.prototype.constructor -------------------
BuiltInSemantics.register("Uint8Array.prototype.constructor", (args, callNode, astNode, thisDef) => {
    // [Taint Propagation] constructor args taint the instance
    for (const arg of args) {
        taint_1.taintManager.propagateTaint(arg, thisDef, astNode, "INITIAL", "Uint8Array.constructor");
    }
    return thisDef;
});
// --------------------- Uint8Array.fromBase64 -------------------
BuiltInSemantics.register("Uint8Array.fromBase64", (args, callNode, astNode) => {
    const input = args[0];
    const uint8ArrayCtor = builtinRegistry_1.BuiltInRegistry.getUnit8ArrayConstructor();
    const instance = defFactory_1.DefFactory.createClassInstanceDef(uint8ArrayCtor, callNode, astNode, args);
    if (input) {
        taint_1.taintManager.propagateTaint(input, instance, astNode, "RETURN", "Uint8Array.fromBase64/fromHex");
    }
    return instance;
});
// --------------------- Uint8Array.prototype.setFromBase64 -------------------
BuiltInSemantics.register("Uint8Array.prototype.setFromBase64", (args, callNode, astNode, thisDef) => {
    const input = args[0];
    if (!thisDef || !input)
        return thisDef;
    // [Taint Propagation] input taints thisDef
    taint_1.taintManager.propagateTaint(input, thisDef, astNode, "RETURN", "Uint8Array.setFromBase64/setFromHex");
    return thisDef;
});
// --------------------- Uint8Array.prototype.toBase64 -------------------
BuiltInSemantics.register("Uint8Array.prototype.toBase64", (args, callNode, astNode, thisDef) => {
    const result = defFactory_1.defFactory.createUnknownDef(callNode);
    if (thisDef) {
        // [Taint Propagation]
        taint_1.taintManager.propagateTaint(thisDef, result, astNode, "RETURN", "Uint8Array.toBase64/toHex");
    }
    return result;
});
/**
 * ======================================================
 * ================== Array Semantics ==================
 * ======================================================
 */
// --------------------- Array.from-------------------
BuiltInSemantics.register("Array.from", (args, callNode, astNode) => {
    const [source] = args;
    if (!def_1.default.isObjectDef(source) || args.length < 1)
        return source;
    const array = defFactory_1.DefFactory.createArrayInstanceDef(callNode, astNode, [
        ...source.props.values(),
    ]);
    return array;
});
// --------------------- Array.of-------------------
BuiltInSemantics.register("Array.of", (args, callNode, astNode) => {
    return defFactory_1.DefFactory.createArrayInstanceDef(callNode, astNode, [...args]);
});
// --------------------- Array.prototype.constructor-------------------
BuiltInSemantics.register("Array.prototype.constructor", (args, callNode, _astNode, thisDef) => {
    if (!def_1.default.isObjectDef(thisDef))
        return defFactory_1.defFactory.createObjectDef(callNode);
    // Assign arguments as array elements
    for (const arg of args) {
        thisDef.setPropertyByName(thisDef.propsLength, arg);
    }
});
// --------------------- Array.prototype.at-------------------
BuiltInSemantics.register("Array.prototype.at", (args, callNode, astNode, thisDef) => {
    const [index] = args;
    const element = defFactory_1.defFactory.createUnknownDef(callNode);
    if (!thisDef || !def_1.default.isObjectDef(thisDef) || args.length < 1)
        return element;
    // [Taint Propagation] array elements need has the taint
    taint_1.taintManager.propagateTaint(thisDef, element, astNode, "ELEMENT", "array.at");
    // TODO: need to care about the returnDef(plan ImplictDef).
    return element;
});
// --------------------- Array.prototype.concat-------------------
BuiltInSemantics.register("Array.prototype.concat", (args, callNode, astNode, thisDef) => {
    const newArray = defFactory_1.DefFactory.createArrayInstanceDef(callNode, astNode);
    if (!def_1.default.isObjectDef(thisDef))
        return newArray;
    // Merge all array arguments
    for (const arg of args) {
        if (!def_1.default.isObjectDef(arg))
            continue;
        for (const element of arg.props.values()) {
            newArray.setPropertyByName(newArray.propsLength, element);
        }
    }
    return newArray;
});
// --------------------- Array.prototype.fill-------------------
BuiltInSemantics.register("Array.prototype.fill", (_args, _callNode, _astNode, thisDef) => {
    // Simplified: just return original array
    return thisDef;
});
// --------------------- Array.prototype.filter-------------------
BuiltInSemantics.register("Array.prototype.filter", (_args, _callNode, _astNode, thisDef) => {
    // Simplified: return the original array
    return thisDef;
});
// --------------------- Array.prototype.find-------------------
BuiltInSemantics.register("Array.prototype.find", (_args, callNode, astNode, thisDef) => {
    // NOTE: do not handle callbackFn
    const element = defFactory_1.defFactory.createUnknownDef(callNode);
    if (!def_1.default.isObjectDef(thisDef))
        return element;
    // [Taint Propagation] element need has the taint
    taint_1.taintManager.propagateTaint(thisDef, element, astNode, "ELEMENT", "array.find");
    return element;
});
// --------------------- Array.prototype.forEach-------------------
BuiltInSemantics.register("Array.prototype.forEach", (args, callNode, astNode, thisDef) => {
    // NOTE: handle callbackFn
    if (!def_1.default.isFunctionDef(args[0]))
        return undefined;
    const element = defFactory_1.defFactory.createUnknownDef(callNode);
    taint_1.taintManager.propagateTaint(thisDef, element, astNode, "ELEMENT", "array.foreach");
    // Track callback invocation with the element
    interProceduralAnalyzer_1.interAnalyzer.analyze(callNode, args[0], [element], null, astNode);
    return undefined;
});
// --------------------- Array.prototype.map-------------------
BuiltInSemantics.register("Array.prototype.map", (_args, _callNode, _astNode, thisDef) => {
    // simplified return original array
    return thisDef;
});
// --------------------- Array.prototype.pop-------------------
BuiltInSemantics.register("Array.prototype.pop", (_args, callNode, astNode, thisDef) => {
    if (!def_1.default.isObjectDef(thisDef))
        return defFactory_1.defFactory.createUnknownDef(callNode);
    const element = defFactory_1.defFactory.createUnknownDef(callNode);
    // [Taint Propagation] element need has the taint
    taint_1.taintManager.propagateTaint(thisDef, element, astNode, "ELEMENT", "array.pop");
    return element;
});
// --------------------- Array.prototype.push-------------------
BuiltInSemantics.register("Array.prototype.push", (args, _callNode, _astNode, thisDef) => {
    if (!def_1.default.isObjectDef(thisDef))
        return thisDef;
    for (const arg of args) {
        thisDef.setPropertyByName(thisDef.propsLength, arg);
    }
    return thisDef;
});
// --------------------- Array.prototype.reduce-------------------
BuiltInSemantics.register("Array.prototype.reduce", (_args, callNode, astNode, thisDef) => {
    const result = defFactory_1.defFactory.createUnknownDef(callNode);
    // [Taint Propagation] element need has the taint
    taint_1.taintManager.propagateTaint(thisDef, result, astNode, "ELEMENT", "array.reduce");
    return result;
});
// --------------------- Array.prototype.reverse-------------------
BuiltInSemantics.register("Array.prototype.reverse", (_args, _callNode, _astNode, thisDef) => {
    // Simplified: just return original array
    return thisDef;
});
// --------------------- Array.prototype.shift-------------------
BuiltInSemantics.register("Array.prototype.shift", (_args, callNode, astNode, thisDef) => {
    if (!def_1.default.isObjectDef(thisDef))
        return defFactory_1.defFactory.createUnknownDef(callNode);
    const element = defFactory_1.defFactory.createUnknownDef(callNode);
    // [Taint Propagation] element need has the taint
    taint_1.taintManager.propagateTaint(thisDef, element, astNode, "ELEMENT", "array-shift");
    return element;
});
// --------------------- Array.prototype.unshift-------------------
BuiltInSemantics.register("Array.prototype.unshift", (args, _callNode, _astNode, thisDef) => {
    if (!def_1.default.isObjectDef(thisDef))
        return thisDef;
    for (const arg of args) {
        thisDef.setPropertyByName(thisDef.propsLength, arg);
    }
    return thisDef;
});
// --------------------- Array.prototype.sort-------------------
BuiltInSemantics.register("Array.prototype.sort", (_args, _callNode, _astNode, thisDef) => {
    // Simplified: just return original array
    return thisDef;
});
// --------------------- Array.prototype.toString-------------------
BuiltInSemantics.register("Array.prototype.toString", (_args, callNode, astNode, thisDef) => {
    const str = defFactory_1.defFactory.createUnknownDef(callNode);
    // [Taint Propagation] toString need contain the taint
    taint_1.taintManager.propagateTaint(thisDef, str, astNode, "RETURN", "array.toString");
    return str;
});
// --------------------- Array.prototype.join-------------------
BuiltInSemantics.register("Array.prototype.join", (_args, callNode, astNode, thisDef) => {
    const str = defFactory_1.defFactory.createUnknownDef(callNode);
    // [Taint Propagation] join result need contain the taint
    taint_1.taintManager.propagateTaint(thisDef, str, astNode, "RETURN", "array.join");
    return str;
});
// --------------------- Array.prototype.slice-------------------
BuiltInSemantics.register("Array.prototype.slice", (_args, _callNode, _astNode, thisDef) => {
    // Simplified: return the original array
    return thisDef;
});
// --------------------- Array.prototype.splice-------------------
BuiltInSemantics.register("Array.prototype.splice", (_args, _callNode, _astNode, thisDef) => {
    // Simplified: return the original array
    return thisDef;
});
// --------------------- Array.prototype.set-------------------
BuiltInSemantics.register("Array.prototype.set", (args, _callNode, astNode, thisDef) => {
    // set for TypedArray
    const [source /*, offset */] = args;
    if (!def_1.default.isObjectDef(thisDef))
        return undefined;
    // Set property
    thisDef.setPropertyByName(thisDef.propsLength, source);
    return undefined;
});
/**
 * ======================================================
 * ================== Function Semantics ==================
 * ======================================================
 */
// --------------------- Function.prototype.constructor-------------------
BuiltInSemantics.register("Function.prototype.constructor", (args, _callNode, astNode, _thisDef) => {
    // NOTE: Creating new Function dynamically is unsafe
    const [codeDef] = args;
    taint_1.taintManager.checkSink(codeDef, "NEW_FUNCTION", astNode);
    return undefined;
});
// --------------------- Function.prototype.call-------------------
BuiltInSemantics.register("Function.prototype.call", (args, callNode, astNode, thisDef) => {
    const [thisArg] = args;
    if (!def_1.default.isFunctionDef(thisDef) ||
        !def_1.default.isObjectDef(thisArg) ||
        args.length < 1)
        return undefined;
    // Execute function with remaining arguments
    return interProceduralAnalyzer_1.interAnalyzer.analyze(callNode, thisDef, args.slice(1), thisArg, astNode);
});
// --------------------- Function.prototype.apply-------------------
BuiltInSemantics.register("Function.prototype.apply", (args, callNode, astNode, thisDef) => {
    const [thisArg, arrayLike] = args;
    if (!def_1.default.isFunctionDef(thisDef) ||
        !def_1.default.isObjectDef(thisArg) ||
        args.length < 2)
        return undefined;
    const argsDef = [];
    // apply(thisArg, arrayLike)
    if (def_1.default.isObjectDef(arrayLike)) {
        for (const prop of arrayLike.props.values()) {
            argsDef.push(prop);
        }
    }
    return interProceduralAnalyzer_1.interAnalyzer.analyze(callNode, thisDef, argsDef, thisArg, astNode);
});
// --------------------- Function.prototype.bind-------------------
BuiltInSemantics.register("Function.prototype.bind", (args, callNode, _astNode, thisDef) => {
    const [thisArg] = args;
    if (!def_1.default.isFunctionDef(thisDef) || args.length < 1)
        return undefined;
    // Create a new function def that wraps the original
    const boundFuncDef = defFactory_1.defFactory.createFunctionDef(callNode, thisDef.functionNode);
    // Attach hidden thisArg for later CallExpression usage
    boundFuncDef.__thisObject = thisArg;
    return boundFuncDef;
});
/**
 * ======================================================
 * ================== JSON Semantics ==================
 * ======================================================
 */
// --------------------- JSON.stringify -------------------
BuiltInSemantics.register("JSON.stringify", (args, callNode, astNode) => {
    const [value] = args;
    const resultDef = defFactory_1.defFactory.createLiteralDef(callNode, "JSON.stringify.pseudo");
    // [Taint Propagation] the result string should be taint
    taint_1.taintManager.propagateTaint(value, resultDef, astNode, "RETURN", "json.stringify");
    return resultDef;
});
// --------------------- JSON.parse-------------------
BuiltInSemantics.register("JSON.parse", (args, callNode, astNode) => {
    const [text] = args;
    const obj = defFactory_1.defFactory.createObjectDef(callNode);
    // [Taint propagation] the parse result should be taint
    taint_1.taintManager.propagateTaint(text, obj, astNode, "RETURN", "json.parse");
    return obj;
});
/**
 * ======================================================
 * ==================== Map Semantics ===================
 * ======================================================
 */
// --------------------- Map.prototype.constructor-------------------
BuiltInSemantics.register("Map.prototype.constructor", (args, callNode, _astNode, thisDef) => {
    const [arrayLike] = args; // Expect array-like of [key, value] pairs
    const newDef = def_1.default.isObjectDef(thisDef)
        ? thisDef
        : defFactory_1.defFactory.createObjectDef(callNode);
    // If first argument exists and is an ObjectDef
    if (def_1.default.isObjectDef(arrayLike)) {
        for (const entry of arrayLike.props.values()) {
            // Each entry should be array-like with 2 elements: [key, value]
            if (def_1.default.isObjectDef(entry)) {
                const key = entry.props.get("0");
                const value = entry.props.get("1");
                // Only support string keys for simplicity
                if (def_1.default.isLiteralDef(key) && value) {
                    newDef.setPropertyByName(String(key.value), value);
                }
            }
        }
    }
    return thisDef;
});
// --------------------- Map.prototype.set -------------------
BuiltInSemantics.register("Map.prototype.set", (args, _callNode, _astNode, thisDef) => {
    const [key, value] = args;
    if (!def_1.default.isObjectDef(thisDef) || args.length < 2)
        return undefined;
    // Only support string keys for simplicity
    if (def_1.default.isLiteralDef(key) && typeof key.value === "string") {
        // Set property
        thisDef.setPropertyByName(key.value, value);
    }
    return undefined;
});
// --------------------- Map.prototype.get -------------------
BuiltInSemantics.register("Map.prototype.get", (args, callNode, _astNode, thisDef) => {
    const [key] = args;
    const fallbackElement = defFactory_1.defFactory.createUnknownDef(callNode);
    if (!def_1.default.isObjectDef(thisDef) || args.length < 1)
        return fallbackElement;
    if (!def_1.default.isLiteralDef(key) || typeof key.value !== "string")
        return fallbackElement;
    const result = thisDef.lookupProperty(key.value);
    if (result)
        return result;
    // Return unknown def if key not found
    return fallbackElement;
});
// --------------------- Map.prototype.clear -------------------
BuiltInSemantics.register("Map.prototype.clear", (_args, _callNode, _astNode, thisDef) => {
    if (def_1.default.isObjectDef(thisDef)) {
        // Clear all properties
        thisDef.props.clear();
    }
    return undefined;
});
/**
 * ======================================================
 * ==================== URL Semantics ===================
 * ======================================================
 */
// --------------------- URL.prototype.constructor-------------------
BuiltInSemantics.register("URL.prototype.constructor", (args, callNode, astNode, thisDef) => {
    const [href] = args;
    const urlObj = def_1.default.isObjectDef(thisDef)
        ? thisDef
        : defFactory_1.defFactory.createObjectDef(callNode);
    if (href) {
        urlObj.setPropertyByName("href", href);
        // href → url
        taint_1.taintManager.propagateTaint(href, urlObj, astNode, "INITIAL", "URL.constructor");
    }
    // create searchParams
    const spCtor = builtinRegistry_1.BuiltInRegistry.getConstructor("URLSearchParams");
    const searchParams = defFactory_1.DefFactory.createClassInstanceDef(spCtor, callNode, astNode, []);
    // two-way binding
    searchParams.__urlOwner = urlObj;
    urlObj.setPropertyByName("searchParams", searchParams);
    return urlObj;
});
/**
 * ======================================================
 * ==================== URLSearchParams Semantics ===================
 * ======================================================
 */
// --------------------- URLSearchParams.prototype.constructor-------------------
BuiltInSemantics.register("URLSearchParams.prototype.constructor", (_args, _callNode, _astNode, thisDef) => {
    return thisDef;
});
// --------------------- URLSearchParams.prototype.append-------------------
BuiltInSemantics.register("URLSearchParams.prototype.append", (args, _callNode, astNode, thisDef) => {
    const [, value] = args;
    if (!thisDef || !value)
        return undefined;
    // value → searchParams
    taint_1.taintManager.propagateTaint(value, thisDef, astNode, "RETURN", "URLSearchParams.append");
    // searchParams → URL
    const owner = thisDef.__urlOwner;
    if (owner) {
        taint_1.taintManager.propagateTaint(thisDef, owner, astNode, "MUTATE", "URLSearchParams.append->URL");
        const href = owner.lookupProperty("href");
        if (href) {
            taint_1.taintManager.propagateTaint(thisDef, href, astNode, "MUTATE", "URL.searchParams->href");
        }
    }
    return undefined;
});
// --------------------- URLSearchParams.prototype.toString-------------------
BuiltInSemantics.register("URLSearchParams.prototype.toString", (_args, callNode, astNode, thisDef) => {
    const str = defFactory_1.defFactory.createUnknownDef(callNode);
    if (thisDef) {
        taint_1.taintManager.propagateTaint(thisDef, str, astNode, "RETURN", "URLSearchParams.toString");
    }
    return str;
});
/**
 * ======================================================
 * ================== Promise Semantics =================
 * ======================================================
 */
// --------------------- executor.resolve-------------------
BuiltInSemantics.register("executor.resolve", (args, _callNode, _astNode, thisDef) => {
    const [value] = args;
    if (value && def_1.default.isPromiseDef(thisDef)) {
        // Resolve the promise with the first argument
        thisDef.resolve(value);
    }
    return undefined;
});
// --------------------- Promise.prototype.then-------------------
BuiltInSemantics.register("Promise.prototype.then", (args, callNode, astNode, thisDef) => {
    var _a;
    const [onFulfilled] = args;
    // Create a new Promise to return
    const newPromise = defFactory_1.defFactory.createPromiseDef(callNode);
    if (!def_1.default.isPromiseDef(thisDef))
        return newPromise;
    // If a fulfillment callback is provided
    if (def_1.default.isFunctionDef(onFulfilled)) {
        const fulfillArg = (_a = thisDef.resolvedDef) !== null && _a !== void 0 ? _a : defFactory_1.defFactory.createUndefinedDef(callNode);
        // Track callback execution
        interProceduralAnalyzer_1.interAnalyzer.analyze(callNode, onFulfilled, [fulfillArg], thisDef, astNode);
        // Set new promise's resolved value
        newPromise.resolve(fulfillArg);
    }
    return newPromise;
});
// --------------------- Promise.prototype.constructor -------------------
BuiltInSemantics.register("Promise.prototype.constructor", (args, callNode, astNode, thisDef) => {
    const newObj = def_1.default.isPromiseDef(thisDef)
        ? thisDef
        : defFactory_1.defFactory.createPromiseDef(callNode);
    // Initialize promise value
    newObj.resolve(defFactory_1.defFactory.createUndefinedDef(callNode));
    if (!def_1.default.isFunctionDef(args[0]))
        return newObj;
    const executorFunc = args[0];
    // Create a built-in resolve function bound to this Promise
    const resolveFunc = defFactory_1.defFactory.createBuiltInFunctionDef(callNode, "executor.resolve");
    resolveFunc.semanticExec = BuiltInSemantics.get("executor.resolve");
    resolveFunc.thisDef = newObj;
    // Track executor invocation
    interProceduralAnalyzer_1.interAnalyzer.analyze(callNode, executorFunc, [resolveFunc], newObj, astNode);
    return newObj;
});
// --------------------- Promise.resolve-------------------
BuiltInSemantics.register("Promise.resolve", (args, callNode) => {
    const [value] = args;
    // If wrong call
    if (!value)
        return defFactory_1.defFactory.createUndefinedDef(callNode);
    // If argument is already a PromiseDef, return it directly
    if (def_1.default.isPromiseDef(value))
        return value;
    // Otherwise, wrap value in a new Promise
    return defFactory_1.defFactory.createPromiseDef(callNode, value);
});
// --------------------- Promise.all-------------------
BuiltInSemantics.register("Promise.all", (args, callNode, astNode, _thisDef) => {
    var _a;
    const [iterable] = args;
    // Must be array-like
    if (!iterable || !def_1.default.isObjectDef(iterable)) {
        return defFactory_1.defFactory.createUnknownDef(callNode);
    }
    const arrayObj = iterable;
    const resolvedValues = [];
    const undefinedDef = defFactory_1.defFactory.createUndefinedDef(callNode);
    for (const [, value] of arrayObj.props) {
        // Non-Promise element fails modeling
        if (!def_1.default.isPromiseDef(value))
            return undefinedDef;
        resolvedValues.push((_a = value.resolvedDef) !== null && _a !== void 0 ? _a : undefinedDef);
    }
    // Create array of resolved values and wrap in new Promise
    const resultArray = defFactory_1.DefFactory.createArrayInstanceDef(callNode, astNode, resolvedValues);
    return defFactory_1.defFactory.createPromiseDef(callNode, resultArray);
});
/**
 * ======================================================
 * ==================== Set Semantics ===================
 * ======================================================
 */
// --------------------- Set.prototype.constructor-------------------
BuiltInSemantics.register("Set.prototype.constructor", (args, callNode, _astNode, thisDef) => {
    const [arrayLike] = args;
    const newObj = def_1.default.isObjectDef(thisDef)
        ? thisDef
        : defFactory_1.defFactory.createObjectDef(callNode);
    // If first argument is array-like, add all elements to set
    if (def_1.default.isObjectDef(arrayLike)) {
        for (const [, value] of arrayLike.props) {
            newObj.setPropertyByName(newObj.propsLength, value);
        }
    }
    return newObj;
});
// --------------------- Set.prototype.add-------------------
BuiltInSemantics.register("Set.prototype.add", (args, _callNode, _astNode, thisDef) => {
    if (!def_1.default.isObjectDef(thisDef) || args.length < 1)
        return thisDef;
    const [value] = args;
    thisDef.setPropertyByName(thisDef.propsLength, value);
    return thisDef;
});
// --------------------- Set.prototype.clear-------------------
BuiltInSemantics.register("Set.prototype.clear", (_args, _callNode, _astNode, thisDef) => {
    if (!def_1.default.isObjectDef(thisDef))
        return undefined;
    const setObj = thisDef;
    setObj.props.clear();
    return undefined;
});
// --------------------- Set.prototype.union-------------------
BuiltInSemantics.register("Set.prototype.union", (args, _callNode, _astNode, thisDef) => {
    if (!def_1.default.isObjectDef(thisDef) || args.length < 1)
        return thisDef;
    const [otherSet] = args;
    if (def_1.default.isObjectDef(otherSet)) {
        for (const [, value] of otherSet.props) {
            thisDef.setPropertyByName(thisDef.propsLength, value);
        }
    }
    return thisDef;
});
// --------------------- Set.prototype.forEach-------------------
BuiltInSemantics.register("Set.prototype.forEach", (args, callNode, astNode, thisDef) => {
    const [callbackFunc] = args;
    if (!def_1.default.isFunctionDef(callbackFunc))
        return undefined;
    const element = defFactory_1.defFactory.createUnknownDef(callNode);
    // [Taint Propagation] element should be taint
    taint_1.taintManager.propagateTaint(thisDef, element, astNode, "ELEMENT", "set.foreach");
    // Track callback invocation with element
    interProceduralAnalyzer_1.interAnalyzer.analyze(callNode, callbackFunc, [element], null, astNode);
    return undefined;
});
/**
 * ======================================================
 * ==================== Blob Semantics ===================
 * ======================================================
 */
// --------------------- Blob.prototype.constructor -------------------
BuiltInSemantics.register("Blob.prototype.constructor", (args, callNode, _astNode, thisDef) => {
    const newObj = def_1.default.isObjectDef(thisDef)
        ? thisDef
        : defFactory_1.defFactory.createObjectDef(callNode);
    const [parts] = args;
    // new Blob(parts)
    if (def_1.default.isObjectDef(parts)) {
        for (const [, value] of parts.props) {
            newObj.setPropertyByName(newObj.propsLength, value);
        }
    }
    return newObj;
});
// --------------------- Blob.prototype.slice -------------------
BuiltInSemantics.register("Blob.prototype.slice", (_args, _callNode, _astNode, thisDef) => {
    // Simplified: just return original string
    return thisDef;
});
// --------------------- Blob.prototype.arrayBuffer -------------------
BuiltInSemantics.register("Blob.prototype.arrayBuffer", (_args, callNode, astNode, thisDef) => {
    if (!def_1.default.isObjectDef(thisDef))
        return undefined;
    const bufferObj = defFactory_1.DefFactory.createArrayInstanceDef(callNode, astNode, []);
    for (const [, value] of thisDef.props) {
        bufferObj.setPropertyByName(bufferObj.propsLength, value);
    }
    return bufferObj;
});
// --------------------- Blob.prototype.text -------------------
BuiltInSemantics.register("Blob.prototype.text", (_args, callNode, astNode, thisDef) => {
    if (!def_1.default.isObjectDef(thisDef))
        return undefined;
    const strObj = defFactory_1.defFactory.createUnknownDef(callNode);
    // [Taint Propagation] the result should be taint
    taint_1.taintManager.propagateTaint(thisDef, strObj, astNode, "RETURN", "blob.text");
    return strObj;
});
// --------------------- Blob.prototype.stream -------------------
BuiltInSemantics.register("Blob.prototype.stream", (_args, _callNode, _astNode, thisDef) => {
    // Simplified: just return original string
    return thisDef;
});
// --------------------- Blob.prototype.bytes -------------------
BuiltInSemantics.register("Blob.prototype.bytes", (_args, _callNode, _astNode, thisDef) => {
    // Simplified: just return original string
    return thisDef;
});
/**
 * ======================================================
 * =================== FormData Semantics =================
 * ======================================================
 */
// --------------------- FormData.prototype.constructor -------------------
BuiltInSemantics.register("FormData.prototype.constructor", (args, callNode, _astNode, thisDef) => {
    const fdObj = def_1.default.isObjectDef(thisDef)
        ? thisDef
        : defFactory_1.defFactory.createObjectDef(callNode);
    const [formArg] = args;
    // new FormData(formElement)
    // Conservative: treat form as taint source container
    if (formArg) {
        fdObj.setPropertyByName(fdObj.propsLength, formArg);
    }
    return fdObj;
});
// --------------------- FormData.prototype.append -------------------
BuiltInSemantics.register("FormData.prototype.append", (args, _callNode, _astNode, thisDef) => {
    if (!def_1.default.isObjectDef(thisDef) || args.length < 2)
        return undefined;
    const [nameDef, valueDef] = args;
    const name = (0, utils_1.literalOuter)(nameDef);
    thisDef.setPropertyByName(name !== null && name !== void 0 ? name : thisDef.propsLength, valueDef);
    return thisDef;
});
// --------------------- FormData.prototype.set -------------------
BuiltInSemantics.register("FormData.prototype.set", (args, _callNode, _astNode, thisDef) => {
    if (!def_1.default.isObjectDef(thisDef) || args.length < 2)
        return undefined;
    const [nameDef, valueDef] = args;
    const name = (0, utils_1.literalOuter)(nameDef);
    thisDef.setPropertyByName(name !== null && name !== void 0 ? name : thisDef.propsLength, valueDef);
    return thisDef;
});
// --------------------- FormData.prototype.get -------------------
BuiltInSemantics.register("FormData.prototype.get", (args, callNode, astNode, thisDef) => {
    var _a;
    let value = defFactory_1.defFactory.createUnknownDef(callNode);
    if (!def_1.default.isObjectDef(thisDef) || args.length < 1)
        return value;
    const [nameDef] = args;
    const name = (0, utils_1.literalOuter)(nameDef);
    if (name) {
        value = (_a = thisDef.lookupProperty(name)) !== null && _a !== void 0 ? _a : value;
    }
    // [taint Propagation] get result should be taint
    taint_1.taintManager.propagateTaint(thisDef, value, astNode, "RETURN", "formdata.get");
    return value;
});
// --------------------- FormData.prototype.getAll -------------------
BuiltInSemantics.register("FormData.prototype.getAll", (args, callNode, astNode, thisDef) => {
    var _a;
    let value = defFactory_1.defFactory.createUnknownDef(callNode);
    if (def_1.default.isObjectDef(thisDef) && args.length > 0) {
        const [nameDef] = args;
        const name = (0, utils_1.literalOuter)(nameDef);
        if (name) {
            value = (_a = thisDef.lookupProperty(name)) !== null && _a !== void 0 ? _a : value;
        }
    }
    const values = defFactory_1.DefFactory.createArrayInstanceDef(callNode, astNode, [
        value,
    ]);
    // [taint Propagation] getAll result should be taint
    taint_1.taintManager.propagateTaint(thisDef, values, astNode, "RETURN", "formdata.getAll");
    return values;
});
/**
 * ======================================================
 * =================== String Semantics =================
 * ======================================================
 */
// --------------------- String.fromCharCode -------------------
BuiltInSemantics.register("String.fromCharCode", (args, callNode, astNode, thisDef) => {
    const resDef = defFactory_1.defFactory.createUnknownDef(callNode);
    // [Taint Propagation]
    for (const arg of args) {
        taint_1.taintManager.propagateTaint(arg, resDef, astNode, "RETURN", "string.fromCharCode");
    }
    return resDef;
});
// --------------------- String.prototype.concat -------------------
BuiltInSemantics.register("String.prototype.concat", (args, callNode, astNode, thisDef) => {
    if (!thisDef)
        return defFactory_1.defFactory.createUnknownDef(callNode);
    // [Taint Propagation]
    for (const arg of args) {
        taint_1.taintManager.propagateTaint(arg, thisDef, astNode, "RETURN", "string.concat");
    }
    return thisDef;
});
// --------------------- String.prototype.normalize -------------------
BuiltInSemantics.register("String.prototype.normalize", (_args, _callNode, _astNode, thisDef) => {
    // Simplified: just return original string
    return thisDef;
});
// --------------------- String.prototype.repeat-------------------
BuiltInSemantics.register("String.prototype.repeat", (_args, _callNode, _astNode, thisDef) => {
    // Simplified: just return original string
    return thisDef;
});
// --------------------- String.prototype.replace-------------------
BuiltInSemantics.register("String.prototype.replace", (_args, _callNode, _astNode, thisDef) => {
    // Simplified: just return original string
    return thisDef;
});
// --------------------- String.prototype.replaceAll-------------------
BuiltInSemantics.register("String.prototype.replaceAll", (_args, _callNode, _astNode, thisDef) => {
    // Simplified: just return original string
    return thisDef;
});
// --------------------- String.prototype.slice-------------------
BuiltInSemantics.register("String.prototype.slice", (_args, _callNode, _astNode, thisDef) => {
    // Simplified: just return original string
    return thisDef;
});
// --------------------- String.prototype.split-------------------
BuiltInSemantics.register("String.prototype.split", (_args, callNode, astNode, thisDef) => {
    const element = defFactory_1.defFactory.createUnknownDef(callNode);
    // [Taint Propagation]
    taint_1.taintManager.propagateTaint(thisDef, element, astNode, "ELEMENT", "string.split");
    return defFactory_1.DefFactory.createArrayInstanceDef(callNode, astNode, [element]);
});
// --------------------- String.prototype.substring-------------------
BuiltInSemantics.register("String.prototype.substring", (_args, _callNode, _astNode, thisDef) => {
    // Simplified: just return original string
    return thisDef;
});
// --------------------- String.prototype.trim-------------------
BuiltInSemantics.register("String.prototype.trim", (_args, _callNode, _astNode, thisDef) => {
    // Simplified: just return original string
    return thisDef;
});
// --------------------- String.prototype.trimEnd-------------------
BuiltInSemantics.register("String.prototype.trimEnd", (_args, _callNode, _astNode, thisDef) => {
    // Simplified: just return original string
    return thisDef;
});
// --------------------- String.prototype.trimStart-------------------
BuiltInSemantics.register("String.prototype.trimStart", (_args, _callNode, _astNode, thisDef) => {
    // Simplified: just return original string
    return thisDef;
});
/**
 * ======================================================
 * ================ Web Storage Semantics ===============
 * ======================================================
 */
// --------------------- localStorage.setItem-------------------
BuiltInSemantics.register("localStorage.setItem", (args, _callNode, astNode, _thisDef) => {
    if (args.length === 2) {
        interProceduralAnalyzer_1.interAnalyzer.setCurrentSideEffects(); // side effect
        const keyValue = args[1];
        taint_1.taintManager.checkSink(keyValue, "WEB_LOCAL_STORAGE", astNode);
    }
    return undefined;
});
// --------------------- sessionStorage-------------------
BuiltInSemantics.register("sessionStorage.setItem", (args, _callNode, astNode, _thisDef) => {
    if (args.length === 2) {
        interProceduralAnalyzer_1.interAnalyzer.setCurrentSideEffects(); // side effect
        const keyValue = args[1];
        taint_1.taintManager.checkSink(keyValue, "WEB_SESSION_STORAGE", astNode);
    }
    return undefined;
});
function createChromeApiSemantics({ apiName, callbackIndex, sourceType, createReturnDef, }) {
    BuiltInSemantics.register(apiName, (args, callNode, astNode, _thisDef) => {
        const createDef = () => {
            const def = createReturnDef(callNode, astNode);
            interProceduralAnalyzer_1.interAnalyzer.setCurrentSideEffects(); // side effect
            taint_1.taintManager.createTaintSource(def, sourceType, astNode);
            return def;
        };
        // ---------- callback-style ----------
        if (callbackIndex !== undefined &&
            args.length > callbackIndex &&
            def_1.default.isFunctionDef(args[callbackIndex])) {
            const callbackFunc = args[callbackIndex];
            const retDef = createDef();
            interProceduralAnalyzer_1.interAnalyzer.analyze(callNode, callbackFunc, [retDef], null, astNode);
            return defFactory_1.defFactory.createUndefinedDef(callNode);
        }
        // ---------- promise-style ----------
        const retPromise = defFactory_1.defFactory.createPromiseDef(callNode);
        const retDef = createDef();
        retPromise.resolve(retDef);
        return retPromise;
    });
}
// --------------------- chrome.bookmarks-------------------
function createBookmarkArrayDef(callNode, astNode) {
    return defFactory_1.DefFactory.createArrayInstanceDef(callNode, astNode, []);
}
["get", "getChildren", "getRecent", "getSubTree", "search"].forEach((name) => createChromeApiSemantics({
    apiName: `chrome.bookmarks.${name}`,
    callbackIndex: 1,
    sourceType: "CHROME_BOOKMARK_INFO",
    createReturnDef: createBookmarkArrayDef,
}));
createChromeApiSemantics({
    apiName: "chrome.bookmarks.getTree",
    callbackIndex: 0,
    sourceType: "CHROME_BOOKMARK_INFO",
    createReturnDef: createBookmarkArrayDef,
});
// --------------------- chrome.cookies -------------------
createChromeApiSemantics({
    apiName: "chrome.cookies.getAll",
    callbackIndex: 1,
    sourceType: "CHROME_COOKIES_INFO",
    createReturnDef: (callNode, astNode) => defFactory_1.DefFactory.createArrayInstanceDef(callNode, astNode, []),
});
createChromeApiSemantics({
    apiName: "chrome.cookies.get",
    callbackIndex: 1,
    sourceType: "CHROME_COOKIES_INFO",
    createReturnDef: (callNode) => defFactory_1.defFactory.createUnknownDef(callNode),
});
// --------------------- chrome.downloads -------------------
createChromeApiSemantics({
    apiName: "chrome.downloads.search",
    callbackIndex: 1,
    sourceType: "CHROME_DOWNLOADS_SEARCH",
    createReturnDef: (callNode, astNode) => defFactory_1.DefFactory.createArrayInstanceDef(callNode, astNode, []),
});
// --------------------- chrome.history -------------------
createChromeApiSemantics({
    apiName: "chrome.history.search",
    callbackIndex: 1,
    sourceType: "CHROME_HISTORY_INFO",
    createReturnDef: (callNode, astNode) => defFactory_1.DefFactory.createArrayInstanceDef(callNode, astNode, []),
});
createChromeApiSemantics({
    apiName: "chrome.history.getVisits",
    callbackIndex: 0,
    sourceType: "CHROME_HISTORY_INFO",
    createReturnDef: (callNode, astNode) => defFactory_1.DefFactory.createArrayInstanceDef(callNode, astNode, []),
});
// --------------------- chrome.readingList -------------------
createChromeApiSemantics({
    apiName: "chrome.readingList.query",
    callbackIndex: 1,
    sourceType: "CHROME_READINGLIST_INFO",
    createReturnDef: (callNode, astNode) => defFactory_1.DefFactory.createArrayInstanceDef(callNode, astNode, []),
});
// --------------------- chrome.management -------------------
createChromeApiSemantics({
    apiName: "chrome.management.get",
    callbackIndex: 1,
    sourceType: "CHROME_MANAGEMENT_INFO",
    createReturnDef: (callNode) => defFactory_1.defFactory.createUnknownDef(callNode),
});
createChromeApiSemantics({
    apiName: "chrome.management.getAll",
    callbackIndex: 1,
    sourceType: "CHROME_MANAGEMENT_INFO",
    createReturnDef: (callNode, astNode) => defFactory_1.DefFactory.createArrayInstanceDef(callNode, astNode, []),
});
// --------------------- chrome.pageCapture -------------------
createChromeApiSemantics({
    apiName: "chrome.pageCapture.saveAsMHTML",
    callbackIndex: 1,
    sourceType: "CHROME_PAGECAPTURE_MHTML",
    createReturnDef: (callNode) => defFactory_1.defFactory.createUnknownDef(callNode),
});
// --------------------- chrome.system -------------------
createChromeApiSemantics({
    apiName: "chrome.system.cpu.getInfo",
    callbackIndex: 0,
    sourceType: "CHROME_SYSTEM_CPU",
    createReturnDef: (callNode) => defFactory_1.defFactory.createUnknownDef(callNode),
});
createChromeApiSemantics({
    apiName: "chrome.system.display.getDisplayLayout",
    callbackIndex: 0,
    sourceType: "CHROME_SYSTEM_DISPLAY_LAYOUT",
    createReturnDef: (callNode, astNode) => defFactory_1.DefFactory.createArrayInstanceDef(callNode, astNode, []),
});
createChromeApiSemantics({
    apiName: "chrome.system.display.getInfo",
    callbackIndex: 1,
    sourceType: "CHROME_SYSTEM_DISPLAY",
    createReturnDef: (callNode, astNode) => defFactory_1.DefFactory.createArrayInstanceDef(callNode, astNode, []),
});
createChromeApiSemantics({
    apiName: "chrome.system.memory.getInfo",
    callbackIndex: 0,
    sourceType: "CHROME_SYSTEM_MEMORY",
    createReturnDef: (callNode) => defFactory_1.defFactory.createUnknownDef(callNode),
});
createChromeApiSemantics({
    apiName: "chrome.system.storage.getInfo",
    callbackIndex: 0,
    sourceType: "CHROME_SYSTEM_STORAGE",
    createReturnDef: (callNode, astNode) => defFactory_1.DefFactory.createArrayInstanceDef(callNode, astNode, []),
});
// --------------------- chrome.tabs -------------------
createChromeApiSemantics({
    apiName: "chrome.tabs.captureVisibleTab",
    callbackIndex: 2,
    sourceType: "CHROME_TABS_CAPUTURE_VISIBLE_TAB",
    createReturnDef: (callNode) => defFactory_1.defFactory.createUnknownDef(callNode),
});
createChromeApiSemantics({
    apiName: "chrome.tabs.detectLanguage",
    callbackIndex: 1,
    sourceType: "CHROME_TABS_DETECT_LANUAGE",
    createReturnDef: (callNode) => defFactory_1.defFactory.createUnknownDef(callNode),
});
// --------------------- chrome.gcm -------------------
BuiltInSemantics.register("chrome.gcm.send", (args, callNode, astNode, _thisDef) => {
    interProceduralAnalyzer_1.interAnalyzer.setCurrentSideEffects(); // side effect
    const [message, callbackFunc] = args;
    taint_1.taintManager.checkSink(message, "CHROME_GCM_SEND", astNode);
    // Handle the callback
    if (def_1.default.isFunctionDef(callbackFunc)) {
        interProceduralAnalyzer_1.interAnalyzer.analyze(callNode, callbackFunc, [], null, astNode);
    }
    return undefined;
});
// --------------------- chrome.topSites -------------------
createChromeApiSemantics({
    apiName: "chrome.topSites.get",
    callbackIndex: 1,
    sourceType: "CHROME_TOPSITES_INFO",
    createReturnDef: (callNode, astNode) => defFactory_1.DefFactory.createArrayInstanceDef(callNode, astNode, []),
});
// --------------------- chrome.identity -------------------
createChromeApiSemantics({
    apiName: "chrome.identity.getAuthToken",
    callbackIndex: 1,
    sourceType: "CHROME_IDENTITY_TOKEN",
    createReturnDef: (callNode) => defFactory_1.defFactory.createUnknownDef(callNode),
});
createChromeApiSemantics({
    apiName: "chrome.identity.getProfileUserInfo",
    callbackIndex: 1,
    sourceType: "CHROME_IDENTITY_PROFILE",
    createReturnDef: (callNode) => defFactory_1.defFactory.createUnknownDef(callNode),
});
/**
 * Register chrome.storage.[area].set semantics.
 */
function registerStorageSet(area) {
    const sinkKindMap = {
        local: "CHROME_LOCAL_STORAGE",
        sync: "CHROME_SYNC_STORAGE",
        session: "CHROME_SESSION_STORAGE",
    };
    const sinkKind = sinkKindMap[area];
    BuiltInSemantics.register(`chrome.storage.${area}.set`, (args, callNode, astNode, _thisDef) => {
        // Mark this call as having side effects
        interProceduralAnalyzer_1.interAnalyzer.setCurrentSideEffects();
        const [items, callbackFunc] = args;
        /**
         * Only object form is supported by Chrome API:
         * chrome.storage.xxx.set({ key: value })
         */
        if (def_1.default.isObjectDef(items)) {
            for (const [key, value] of items.props) {
                // record storage set
                taint_1.taintManager.recordStorageSet(area, key, value, astNode);
                // Treat storage write as a sink
                // If value is tainted → this is a sensitive flow
                taint_1.taintManager.checkSink(value, sinkKind, astNode, key);
            }
        }
        // Callback style
        if (def_1.default.isFunctionDef(callbackFunc)) {
            interProceduralAnalyzer_1.interAnalyzer.analyze(callNode, callbackFunc, [], null, astNode);
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
function resolveStorageValue(area, keyDef, callNode, astNdoe) {
    const result = defFactory_1.defFactory.createObjectDef(callNode);
    if (!keyDef)
        return result;
    /**
     * Read a single key from storage and attach it to result.
     * Also propagates taint if the stored value is tainted.
     */
    const attachStoredValue = (key) => {
        const stored = defFactory_1.defFactory.createUnknownDef(callNode);
        taint_1.taintManager.recordStorageGet(area, key, stored, astNdoe);
        result.setPropertyByName(key, stored);
    };
    // Case 0: null / undefined / no argument
    if (!keyDef ||
        (def_1.default.isLiteralDef(keyDef) &&
            (keyDef.value === null || keyDef.value === undefined))) {
        // If get the all items, then set a taint
        taint_1.taintManager.createTaintSource(result, "STORAGE_ALL_ITEMS", astNdoe, false, `storage.all.items[${area}]`);
        return result;
    }
    //  Case 1: Literal key 
    if (def_1.default.isLiteralDef(keyDef)) {
        attachStoredValue(String(keyDef.value));
        return result;
    }
    // Case 2: Array of keys 
    if (def_1.default.isObjectDef(keyDef) &&
        keyDef.proto === builtinRegistry_1.BuiltInRegistry.getArrayPrototype()) {
        for (const element of keyDef.values) {
            if (def_1.default.isLiteralDef(element)) {
                attachStoredValue(String(element.value));
            }
        }
        return result;
    }
    // Case 3: Object with default values
    if (def_1.default.isObjectDef(keyDef)) {
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
    BuiltInSemantics.register(`chrome.storage.${area}.get`, (args, callNode, astNode) => {
        interProceduralAnalyzer_1.interAnalyzer.setCurrentSideEffects();
        const [keys, callback] = args;
        const result = resolveStorageValue(area, keys, callNode, astNode);
        // Callback style
        if (def_1.default.isFunctionDef(callback)) {
            interProceduralAnalyzer_1.interAnalyzer.analyze(callNode, callback, [result], null, astNode);
            return undefined;
        }
        // Promise style
        return defFactory_1.defFactory.createPromiseDef(callNode, result);
    });
}
// --------------------- Register storage areas ---------------------
registerStorageGet("local");
registerStorageGet("sync");
registerStorageGet("session");
// --------------------- chrome.scripting.executeScript -------------------
BuiltInSemantics.register("chrome.scripting.executeScript", (args, callNode, astNode, _thisDef) => {
    interProceduralAnalyzer_1.interAnalyzer.setCurrentSideEffects(); // side effect
    const options = args[0];
    if (def_1.default.isObjectDef(options)) {
        const funcDef = options.lookupProperty("func");
        const argsDef = options.lookupProperty("args");
        if (def_1.default.isFunctionDef(funcDef)) {
            const argDefs = def_1.default.isObjectDef(argsDef) ? [...argsDef.values] : [];
            interProceduralAnalyzer_1.interAnalyzer.analyze(callNode, funcDef, argDefs, null, astNode);
        }
        return defFactory_1.defFactory.createPromiseDef(callNode);
    }
});
// --------------------- chrome.tabs.executeScript -------------------
BuiltInSemantics.register("chrome.tabs.executeScript", (args, callNode, astNode, _thisDef) => {
    interProceduralAnalyzer_1.interAnalyzer.setCurrentSideEffects(); // side effect
    if (args.length === 0) {
        return defFactory_1.defFactory.createUndefinedDef(callNode);
    }
    let details;
    let callbackFunc;
    // Possible calling formats:
    // executeScript(details, callback)
    // executeScript(tabId, details, callback)
    if (args.length === 1) {
        details = args[0];
    }
    else if (args.length === 2) {
        if (def_1.default.isObjectDef(args[0])) {
            details = args[0];
            callbackFunc = args[1];
        }
        else {
            details = args[1];
        }
    }
    else if (args.length >= 3) {
        details = args[1];
        callbackFunc = args[2];
    }
    // -------------------------
    // Sink: details.code
    // Sink: details.file
    // -------------------------
    if (details && def_1.default.isObjectDef(details)) {
        const codeDef = details.lookupProperty("code");
        // const fileDef = details.lookupProperty("file");
        if (codeDef) {
            taint_1.taintManager.checkSink(codeDef, "CHROME_TABS_EXECUTE", astNode);
        }
    }
    // -------------------------
    // callback-style
    // -------------------------
    if (callbackFunc && def_1.default.isFunctionDef(callbackFunc)) {
        // Simple: don't care the result
        interProceduralAnalyzer_1.interAnalyzer.analyze(callNode, callbackFunc, [], null, astNode);
    }
    return defFactory_1.defFactory.createUndefinedDef(callNode);
});
/**
 * ======================================================
 * ============ Chrome Event Listener Semantics =========
 * ======================================================
 */
function createChromeEventListenerSemantics({ apiName, sourceIndexes = [], sourceType, paramDefs, }) {
    const sourceIndexSet = new Set(sourceIndexes);
    BuiltInSemantics.register(apiName, (args, callNode, astNode) => {
        // chrome.xxx.addListener(cb)
        if (args.length === 0 || !def_1.default.isFunctionDef(args[0])) {
            return defFactory_1.defFactory.createUndefinedDef(callNode);
        }
        const callbackFunc = args[0];
        const callbackArgs = paramDefs.map((factory, index) => {
            const def = factory(callNode);
            if (sourceIndexSet.has(index)) {
                taint_1.taintManager.createTaintSource(def, sourceType, astNode);
            }
            return def;
        });
        interProceduralAnalyzer_1.interAnalyzer.analyze(callNode, callbackFunc, callbackArgs, null, astNode);
        return defFactory_1.defFactory.createUndefinedDef(callNode);
    });
}
// ------------------------chrome.bookmarks.onCreated.addListener-----------------
createChromeEventListenerSemantics({
    apiName: "chrome.bookmarks.onCreated.addListener",
    sourceIndexes: [1],
    sourceType: "CHROME_BOOKMARKS_ONCREATED",
    paramDefs: [
        (callNode) => defFactory_1.defFactory.createLiteralDef(callNode, "BOOKMARK_ID"), // id
        (callNode) => defFactory_1.defFactory.createUnknownDef(callNode), // bookmark
    ],
});
// ----------------------  chrome.cookies.onChanged.addListener
createChromeEventListenerSemantics({
    apiName: "chrome.cookies.onChanged.addListener",
    sourceIndexes: [0],
    sourceType: "CHROME_COOKIES_ONCHANGED",
    paramDefs: [
        (callNode) => defFactory_1.defFactory.createUnknownDef(callNode), // changeInfo
    ],
});
// ----------------------- chrome.downloads.onChanged.addListener
createChromeEventListenerSemantics({
    apiName: "chrome.downloads.onChanged.addListener",
    sourceIndexes: [0],
    sourceType: "CHROME_DOWNLOADS_ONCHANGED",
    paramDefs: [
        (callNode) => defFactory_1.defFactory.createUnknownDef(callNode), // delta
    ],
});
// ------------------------ chrome.downloads.onCreated.addListener
createChromeEventListenerSemantics({
    apiName: "chrome.downloads.onCreated.addListener",
    sourceIndexes: [0],
    sourceType: "CHROME_DOWNLOADS_ONCREATED",
    paramDefs: [
        (callNode) => defFactory_1.defFactory.createUnknownDef(callNode), // delta
    ],
});
// ------------------------ chrome.history.onVisited.addListener
createChromeEventListenerSemantics({
    apiName: "chrome.history.onVisited.addListener",
    sourceIndexes: [0],
    sourceType: "CHROME_HISTORY_ONVISITED",
    paramDefs: [
        (callNode) => defFactory_1.defFactory.createUnknownDef(callNode), // delta
    ],
});
// ------------------------ chrome.downloads.download
BuiltInSemantics.register("chrome.downloads.download", (args, callNode, astNode, _thisDef) => {
    interProceduralAnalyzer_1.interAnalyzer.setCurrentSideEffects(); // side effect
    const options = args[0];
    if (def_1.default.isObjectDef(options)) {
        const urlDef = options.lookupProperty("url");
        taint_1.taintManager.checkSink(urlDef, "CHROME_DOWNLOADS_URL", astNode);
        return defFactory_1.defFactory.createPromiseDef(callNode);
    }
});
// --------------------- runtime.sendMessage -------------------
function recordSendMessageTaint(message, astNode, callNode, outer) {
    var _a;
    // Try to obtain the actual source type of the message
    const contextFile = (_a = callNode.scopeTree) === null || _a === void 0 ? void 0 : _a.key;
    if (!message || !message.isTainted || !contextFile)
        return undefined;
    const channel = outer
        ? "runtime.single.external.sender.message"
        : "runtime.single.sender.message";
    taint_1.taintManager.addPseudoTaintSender(Object.assign({ taintDef: message, astNode, contextFilename: contextFile, channel: channel }, (outer ? { outer } : {})));
}
// --------------------- runtime.sendResponse -------------------
function createResponsePromise(callNode, astNode, outer) {
    var _a;
    interProceduralAnalyzer_1.interAnalyzer.setCurrentSideEffects(); // side effect
    const retDef = defFactory_1.defFactory.createUnknownDef(callNode);
    const promise = defFactory_1.defFactory.createPromiseDef(callNode, retDef);
    const taintId = taint_1.taintManager.createTaintSource(retDef, "PSEUDO_MESSAGE", astNode, true);
    taint_1.taintManager.addPseudoTaintReceiver(Object.assign({ taintId,
        astNode, contextFilename: (_a = callNode.scopeTree) === null || _a === void 0 ? void 0 : _a.key, channel: "runtime.single.response.message", targetDef: retDef }, (outer ? { outer } : {})));
    return promise;
}
BuiltInSemantics.register("runtime.sendResponse", (args, callNode, astNode) => {
    var _a;
    const [response] = args;
    if (!(response === null || response === void 0 ? void 0 : response.isTainted))
        return;
    taint_1.taintManager.addPseudoTaintSender({
        taintDef: response,
        astNode,
        contextFilename: (_a = callNode.scopeTree) === null || _a === void 0 ? void 0 : _a.key,
        channel: "runtime.single.response.message",
    });
    return undefined;
});
function createSendMessageHandler(config) {
    return (args, callNode, astNode) => {
        var _a;
        const paramCount = args.length;
        if (paramCount === 0)
            return defFactory_1.defFactory.createUndefinedDef(callNode);
        const lastArgIsFunction = paramCount > 0 && def_1.default.isFunctionDef(args[paramCount - 1]);
        const contextFilename = (_a = callNode.scopeTree) === null || _a === void 0 ? void 0 : _a.key;
        if (!contextFilename) {
            console.warn(`Missing context filename for ${config.apiName}`, callNode);
            return defFactory_1.defFactory.createUndefinedDef(callNode);
        }
        const parseArgs = () => {
            let firstArg, message, callback;
            let hasFirstArg = false;
            if (lastArgIsFunction) {
                callback = args[paramCount - 1];
                switch (paramCount) {
                    case 1:
                        logger_1.default.warn(`Invalid ${config.apiName} call: only callback provided`);
                        return { message: undefined, callback };
                    case 2:
                        message = args[0];
                        break;
                    case 3:
                        hasFirstArg = true;
                        firstArg = config.parseFirstArg(args[0]);
                        message = args[1];
                        break;
                    case 4:
                        hasFirstArg = true;
                        firstArg = def_1.default.isLiteralDef(args[0])
                            ? config.parseFirstArg(args[0])
                            : undefined;
                        message = args[1];
                        break;
                }
            }
            else {
                switch (paramCount) {
                    case 1:
                        message = args[0];
                        break;
                    case 2:
                    case 3:
                        hasFirstArg = true;
                        firstArg =
                            paramCount === 3
                                ? def_1.default.isLiteralDef(args[0])
                                    ? config.parseFirstArg(args[0])
                                    : undefined
                                : config.parseFirstArg(args[0]);
                        message = args[1];
                        break;
                }
            }
            return { hasFirstArg, firstArg, message, callback };
        };
        const { hasFirstArg, firstArg, message, callback } = parseArgs();
        if (message === undefined) {
            logger_1.default.warn(`${config.apiName} called without message argument`, callNode);
            return defFactory_1.defFactory.createUndefinedDef(callNode);
        }
        recordSendMessageTaint(message, astNode, callNode, firstArg);
        if (callback && def_1.default.isFunctionDef(callback)) {
            const responseDef = defFactory_1.defFactory.createUnknownDef(callNode);
            const taintId = taint_1.taintManager.createTaintSource(responseDef, "PSEUDO_MESSAGE", astNode, true);
            const channel = config.hasExternalChannel && firstArg
                ? `runtime.single.external.response.message`
                : `runtime.single.response.message`;
            taint_1.taintManager.addPseudoTaintReceiver(Object.assign({ taintId,
                astNode,
                contextFilename,
                channel, targetDef: responseDef }, (firstArg ? { outer: firstArg } : {})));
            interProceduralAnalyzer_1.interAnalyzer.analyze(callNode, callback, [responseDef], null, astNode);
            return defFactory_1.defFactory.createUndefinedDef(callNode);
        }
        return createResponsePromise(callNode, astNode, firstArg);
    };
}
// --------------------- chrome.runtime.sendMessage -------------------
BuiltInSemantics.register("chrome.runtime.sendMessage", createSendMessageHandler({
    apiName: "chrome.runtime.sendMessage",
    parseFirstArg: utils_1.literalExtensionId,
    hasExternalChannel: true,
}));
// --------------------- chrome.tabs.sendMessage -------------------
BuiltInSemantics.register("chrome.tabs.sendMessage", createSendMessageHandler({
    apiName: "chrome.tabs.sendMessage",
    parseFirstArg: utils_1.literalOuter,
    hasExternalChannel: false,
}));
// --------------------- chrome.runtime.onMessage.addListener -------------------
BuiltInSemantics.register("chrome.runtime.onMessage.addListener", (args, callNode, astNode) => {
    var _a;
    interProceduralAnalyzer_1.interAnalyzer.setCurrentSideEffects(); // side effect
    const callbackFunc = args[0];
    if (!def_1.default.isFunctionDef(callbackFunc))
        return;
    const message = defFactory_1.defFactory.createUnknownDef(callNode);
    const sender = defFactory_1.defFactory.createUnknownDef(callNode);
    const sendResponse = defFactory_1.defFactory.createBuiltInFunctionDef(callNode, "runtime.sendResponse");
    sendResponse.semanticExec = BuiltInSemantics.get("runtime.sendResponse");
    const taintId = taint_1.taintManager.createTaintSource(message, "PSEUDO_MESSAGE", astNode, true);
    taint_1.taintManager.addPseudoTaintReceiver({
        taintId,
        astNode,
        contextFilename: (_a = callNode.scopeTree) === null || _a === void 0 ? void 0 : _a.key,
        channel: "runtime.single.sender.message",
        targetDef: message,
    });
    interProceduralAnalyzer_1.interAnalyzer.analyze(callNode, callbackFunc, [message, sender, sendResponse], null, astNode);
    return undefined;
});
// --------------------- runtime.port.postMessage -------------------
BuiltInSemantics.register("runtime.port.postMessage", (args, callNode, astNode, thisDef) => {
    var _a, _b;
    interProceduralAnalyzer_1.interAnalyzer.setCurrentSideEffects(); // side effect
    const message = args[0];
    if (!(message === null || message === void 0 ? void 0 : message.isTainted))
        return undefined;
    const contextFile = (_a = callNode.scopeTree) === null || _a === void 0 ? void 0 : _a.key;
    if (!contextFile)
        return undefined;
    const outer = thisDef === null || thisDef === void 0 ? void 0 : thisDef.__outer;
    const channel = outer
        ? "runtime.connect.external.sender.message"
        : "runtime.connect.sender.message";
    taint_1.taintManager.addPseudoTaintSender(Object.assign({ taintDef: message, astNode, contextFilename: (_b = callNode.scopeTree) === null || _b === void 0 ? void 0 : _b.key, channel: channel }, (outer ? { outer } : {})));
    return undefined;
});
// --------------------- runtime.port.onMessage.addListener -------------------
BuiltInSemantics.register("runtime.port.onMessage.addListener", (args, callNode, astNode, thisDef) => {
    var _a;
    interProceduralAnalyzer_1.interAnalyzer.setCurrentSideEffects(); // side effect
    const callback = args[0];
    const contextFile = (_a = callNode.scopeTree) === null || _a === void 0 ? void 0 : _a.key;
    if (!def_1.default.isFunctionDef(callback) || !contextFile)
        return undefined;
    const message = defFactory_1.defFactory.createUnknownDef(callNode);
    const taintId = taint_1.taintManager.createTaintSource(message, "PSEUDO_MESSAGE", astNode, true);
    const outer = thisDef === null || thisDef === void 0 ? void 0 : thisDef.__outer;
    const channel = outer
        ? "runtime.connect.external.sender.message"
        : "runtime.connect.sender.message";
    taint_1.taintManager.addPseudoTaintReceiver(Object.assign({ taintId,
        astNode, contextFilename: contextFile, channel: channel, targetDef: message }, (outer ? { outer } : {})));
    interProceduralAnalyzer_1.interAnalyzer.analyze(callNode, callback, [message], null, astNode);
    return undefined;
});
// --------------------- chrome.runtime.connect -------------------
BuiltInSemantics.register("chrome.runtime.connect", (args, callNode, _astNode) => {
    // chrome.runtime.connect(extensionId?: string, connectInfo?: object): Port
    const extensionId = def_1.default.isLiteralDef(args[0])
        ? (0, utils_1.literalExtensionId)(args[0])
        : undefined;
    // do not consider port name
    const port = defFactory_1.defFactory.createObjectDef(callNode);
    port.__outer = extensionId;
    // postMessage semantic
    const postMessage = defFactory_1.defFactory.createBuiltInFunctionDef(callNode, "runtime.port.postMessage");
    postMessage.semanticExec = BuiltInSemantics.get("runtime.port.postMessage");
    // onMessage  semantic
    const onMessage = defFactory_1.defFactory.createObjectDef(callNode);
    onMessage.__outer = extensionId;
    const addListener = defFactory_1.defFactory.createBuiltInFunctionDef(callNode, "runtime.port.onMessage.addListener");
    addListener.semanticExec = BuiltInSemantics.get("runtime.port.onMessage.addListener");
    onMessage.setPropertyByName("addListener", addListener);
    port.setPropertyByName("postMessage", postMessage);
    port.setPropertyByName("onMessage", onMessage);
    return port;
});
// --------------------- chrome.runtime.onConnect.addListener -------------------
BuiltInSemantics.register("chrome.runtime.onConnect.addListener", (args, callNode, astNode) => {
    interProceduralAnalyzer_1.interAnalyzer.setCurrentSideEffects(); // side effect
    const callback = args[0];
    if (!def_1.default.isFunctionDef(callback))
        return undefined;
    // do not consider portName
    const port = defFactory_1.defFactory.createObjectDef(callNode);
    // postMessage semantic
    const postMessage = defFactory_1.defFactory.createBuiltInFunctionDef(callNode, "runtime.port.postMessage");
    postMessage.semanticExec = BuiltInSemantics.get("runtime.port.postMessage");
    // onMessage.addListener semantic
    const onMessage = defFactory_1.defFactory.createObjectDef(callNode);
    const addListener = defFactory_1.defFactory.createBuiltInFunctionDef(callNode, "runtime.port.onMessage.addListener");
    addListener.semanticExec = BuiltInSemantics.get("runtime.port.onMessage.addListener");
    onMessage.setPropertyByName("addListener", addListener);
    port.setPropertyByName("postMessage", postMessage);
    port.setPropertyByName("onMessage", onMessage);
    interProceduralAnalyzer_1.interAnalyzer.analyze(callNode, callback, [port], null, astNode);
    return undefined;
});
// --------------------- runtime.sendResponse.external -------------------
BuiltInSemantics.register("runtime.sendResponse.external", (args, callNode, astNode) => {
    var _a;
    const response = args[0];
    if (!(response === null || response === void 0 ? void 0 : response.isTainted))
        return;
    taint_1.taintManager.addPseudoTaintSender({
        taintDef: response,
        astNode,
        contextFilename: (_a = callNode.scopeTree) === null || _a === void 0 ? void 0 : _a.key,
        channel: "runtime.single.external.response.message",
        outer: "RUNTIME-SINGLE-EXTERNAL-SENDRESPONSE",
    });
    return undefined;
});
// --------------------- chrome.runtime.onMessageExternal.addListener -------------------
BuiltInSemantics.register("chrome.runtime.onMessageExternal.addListener", (args, callNode, astNode) => {
    var _a;
    interProceduralAnalyzer_1.interAnalyzer.setCurrentSideEffects(); // side effect
    const callback = args[0];
    if (!def_1.default.isFunctionDef(callback))
        return undefined;
    const message = defFactory_1.defFactory.createUnknownDef(callNode);
    const sender = defFactory_1.defFactory.createUnknownDef(callNode);
    // sendResponse semantic
    const sendResponse = defFactory_1.defFactory.createBuiltInFunctionDef(callNode, "runtime.sendResponse.external");
    sendResponse.semanticExec = BuiltInSemantics.get("runtime.sendResponse.external");
    // Pseudo taint source
    const taintId = taint_1.taintManager.createTaintSource(message, "CHROME_MESSAGE_EXTERNAL", astNode, true);
    taint_1.taintManager.addPseudoTaintReceiver({
        taintId,
        astNode,
        contextFilename: (_a = callNode.scopeTree) === null || _a === void 0 ? void 0 : _a.key,
        channel: "runtime.single.external.sender.message",
        targetDef: message,
        outer: "RUNTIME-SINGLE-EXTERANL-ONMESSAGEEXTERNAL",
    });
    interProceduralAnalyzer_1.interAnalyzer.analyze(callNode, callback, [message, sender, sendResponse], null, astNode);
    return undefined;
});
// --------------------- runtime.port.external.postMessage -------------------
BuiltInSemantics.register("runtime.port.external.postMessage", (args, callNode, astNode, _thisDef) => {
    var _a;
    const message = args[0];
    const contextFile = (_a = callNode.scopeTree) === null || _a === void 0 ? void 0 : _a.key;
    if (!message || !message.isTainted || !contextFile)
        return undefined;
    taint_1.taintManager.addPseudoTaintSender({
        taintDef: message,
        astNode,
        contextFilename: contextFile,
        channel: "runtime.connect.external.sender.message",
        outer: "RUNTIME-CONNECT-EXTERANL-POSTMESSAGE",
    });
    return undefined;
});
// --------------------- runtime.port.onMessage.addListener -------------------
BuiltInSemantics.register("runtime.port.external.onMessage.addListener", (args, callNode, astNode, thisDef) => {
    var _a;
    interProceduralAnalyzer_1.interAnalyzer.setCurrentSideEffects(); // side effect
    const callback = args[0];
    const contextFile = (_a = callNode.scopeTree) === null || _a === void 0 ? void 0 : _a.key;
    if (!def_1.default.isFunctionDef(callback) || !contextFile)
        return undefined;
    const message = defFactory_1.defFactory.createUnknownDef(callNode);
    const taintId = taint_1.taintManager.createTaintSource(message, "CHROME_CONNECT_EXTERNAL", astNode, true);
    taint_1.taintManager.addPseudoTaintReceiver({
        taintId,
        astNode,
        contextFilename: contextFile,
        channel: "runtime.connect.external.sender.message",
        targetDef: message,
        outer: "RUNTIME-CONNECT-EXTERNAL-ONMESSAGE",
    });
    interProceduralAnalyzer_1.interAnalyzer.analyze(callNode, callback, [message], null, astNode);
    return undefined;
});
// --------------------- chrome.runtime.onConnectExternal.addListener -------------------
BuiltInSemantics.register("chrome.runtime.onConnectExternal.addListener", (args, callNode, astNode) => {
    interProceduralAnalyzer_1.interAnalyzer.setCurrentSideEffects(); // side effect
    const callback = args[0];
    if (!def_1.default.isFunctionDef(callback))
        return;
    // do not consider portName
    const port = defFactory_1.defFactory.createObjectDef(callNode);
    // port.postMessage semantic
    const postMessage = defFactory_1.defFactory.createBuiltInFunctionDef(callNode, "runtime.port.external.postMessage");
    postMessage.semanticExec = BuiltInSemantics.get("runtime.port.external.postMessage");
    // port.onMessage.addListener semantic
    const onMessage = defFactory_1.defFactory.createObjectDef(callNode);
    const addListener = defFactory_1.defFactory.createBuiltInFunctionDef(callNode, "runtime.port.external.onMessage.addListener");
    addListener.semanticExec = BuiltInSemantics.get("runtime.port.external.onMessage.addListener");
    onMessage.setPropertyByName("addListener", addListener);
    port.setPropertyByName("postMessage", postMessage);
    port.setPropertyByName("onMessage", onMessage);
    interProceduralAnalyzer_1.interAnalyzer.analyze(callNode, callback, [port], null, astNode);
    return undefined;
});
/**
 * ======================================================
 * ============== Built Function Semantics ==============
 * ======================================================
 */
// --------------------- decodeURI-------------------
BuiltInSemantics.register("decodeURI", (args, callNode, astNode) => {
    const [input] = args;
    const resDef = defFactory_1.defFactory.createUnknownDef(callNode);
    // [Taint propagation]
    taint_1.taintManager.propagateTaint(input, resDef, astNode, "RETURN", "decodeURI");
    return resDef;
});
// --------------------- encodeURI-------------------
BuiltInSemantics.register("encodeURI", (args, callNode, astNode) => {
    const [input] = args;
    const resDef = defFactory_1.defFactory.createUnknownDef(callNode);
    // [Taint propagation]
    taint_1.taintManager.propagateTaint(input, resDef, astNode, "RETURN", "encodeURI");
    return resDef;
});
// --------------------- decodeURIComponent-------------------
BuiltInSemantics.register("decodeURIComponent", (args, callNode, astNode) => {
    const [input] = args;
    const resDef = defFactory_1.defFactory.createUnknownDef(callNode);
    // [Taint propagation]
    taint_1.taintManager.propagateTaint(input, resDef, astNode, "RETURN", "decodeURIComponent");
    return resDef;
});
// --------------------- encodeURIComponent-------------------
BuiltInSemantics.register("encodeURIComponent", (args, callNode, astNode) => {
    const [input] = args;
    const resDef = defFactory_1.defFactory.createUnknownDef(callNode);
    // [Taint propagation]
    taint_1.taintManager.propagateTaint(input, resDef, astNode, "RETURN", "encodeURIComponent");
    return resDef;
});
// --------------------- eval-------------------
BuiltInSemantics.register("eval", (args, callNode, astNode, thisDef) => {
    interProceduralAnalyzer_1.interAnalyzer.setCurrentSideEffects(); // side effect
    const [codeDef] = args;
    taint_1.taintManager.checkSink(codeDef, "EVAL", astNode);
    return undefined;
});
// --------------------- fetch-------------------
function checkStructuredSink(valueDef, sinkTag, astNode, remark) {
    // Direct taint
    if (valueDef === null || valueDef === void 0 ? void 0 : valueDef.isTainted) {
        taint_1.taintManager.checkSink(valueDef, sinkTag, astNode, remark);
        return;
    }
    // Object-like structure:
    // FormData / URLSearchParams / Headers / plain object
    if (def_1.default.isObjectDef(valueDef)) {
        for (const [, value] of valueDef.props) {
            taint_1.taintManager.checkSink(value, sinkTag, astNode, remark);
            return;
        }
    }
}
function checkFetchInit(initDef, astNode, remark) {
    const bodyDef = initDef.lookupProperty("body");
    const headersDef = initDef.lookupProperty("headers");
    if (bodyDef) {
        checkStructuredSink(bodyDef, "FETCH_BODY", astNode, remark);
    }
    if (headersDef) {
        checkStructuredSink(headersDef, "FETCH_HEADERS", astNode, remark);
    }
}
BuiltInSemantics.register("fetch", (args, callNode, astNode, _thisDef) => {
    var _a;
    // fetch is always side-effectful (network I/O)
    interProceduralAnalyzer_1.interAnalyzer.setCurrentSideEffects();
    const [urlDef, initDef] = args;
    const url = (_a = (0, utils_1.literalOuter)(urlDef)) !== null && _a !== void 0 ? _a : "[Unparseable URL]";
    // fetch(url)
    if (urlDef) {
        taint_1.taintManager.checkSink(urlDef, "FETCH_URL", astNode, url);
    }
    // fetch(url, init)
    if (initDef && def_1.default.isObjectDef(initDef)) {
        checkFetchInit(initDef, astNode, url);
    }
    // fetch returns Promise<Response>
    return defFactory_1.defFactory.createPromiseDef(callNode);
});
// --------------------- atob-------------------
BuiltInSemantics.register("atob", (args, callNode, astNode) => {
    const [input] = args;
    const resDef = defFactory_1.defFactory.createUnknownDef(callNode);
    // [Taint propagation]
    taint_1.taintManager.propagateTaint(input, resDef, astNode, "RETURN", "atob");
    return resDef;
});
// --------------------- btoa-------------------
BuiltInSemantics.register("btoa", (args, callNode, astNode) => {
    const [input] = args;
    const resDef = defFactory_1.defFactory.createUnknownDef(callNode);
    // [Taint propagation]
    taint_1.taintManager.propagateTaint(input, resDef, astNode, "RETURN", "btoa");
    return resDef;
});
// --------------------- window.postMessage -------------------
BuiltInSemantics.register("postMessage", (args, callNode, astNode) => {
    var _a, _b;
    const message = args[0];
    const targetOrigin = args[1];
    const outer = (_a = (0, utils_1.literalOuter)(targetOrigin)) !== null && _a !== void 0 ? _a : "UNKNOWN_ORIGIN";
    if (!(message === null || message === void 0 ? void 0 : message.isTainted))
        return;
    taint_1.taintManager.addPseudoTaintSender(Object.assign({ taintDef: message, astNode, contextFilename: (_b = callNode.scopeTree) === null || _b === void 0 ? void 0 : _b.key, channel: "window.sender.message" }, (targetOrigin && outer ? { outer } : {})));
    return undefined;
});
// --------------------- window.addEventListener("message", callback) -------------------
BuiltInSemantics.register("addEventListener", (args, callNode, astNode) => {
    var _a;
    const [eventType, callback] = args;
    if (!def_1.default.isLiteralDef(eventType) || eventType.value !== "message")
        return;
    if (!def_1.default.isFunctionDef(callback))
        return;
    interProceduralAnalyzer_1.interAnalyzer.setCurrentSideEffects();
    // event
    const event = defFactory_1.defFactory.createObjectDef(callNode);
    const data = defFactory_1.defFactory.createUnknownDef(callNode);
    const origin = defFactory_1.defFactory.createUnknownDef(callNode);
    event.setPropertyByName("data", data);
    event.setPropertyByName("origin", origin);
    const taintId = taint_1.taintManager.createTaintSource(data, "WINDOW_MESSAGE_EVENT", astNode, true);
    taint_1.taintManager.addPseudoTaintReceiver({
        taintId,
        astNode,
        contextFilename: (_a = callNode.scopeTree) === null || _a === void 0 ? void 0 : _a.key,
        channel: "window.sender.message",
        targetDef: data,
        outer: "WINDOW-ONMESSAGE",
    });
    interProceduralAnalyzer_1.interAnalyzer.analyze(callNode, callback, [event], null, astNode);
    return undefined;
});
/**
 * ======================================================
 * ===================== Timers =========================
 * ======================================================
 */
function handleTimerCallback(args, callNode, astNode) {
    const [callback, delay, ...callbackArgs] = args;
    if (def_1.default.isFunctionDef(callback)) {
        interProceduralAnalyzer_1.interAnalyzer.analyze(callNode, callback, callbackArgs, null, astNode);
    }
    else {
        // Like Eval
        taint_1.taintManager.checkSink(callback, "TIME_EVAL", astNode);
    }
}
// --------------------- setTimeout -------------------
BuiltInSemantics.register("setTimeout", (args, callNode, astNode, _thisDef) => {
    handleTimerCallback(args, callNode, astNode);
    return undefined;
});
// --------------------- setInterval -------------------
BuiltInSemantics.register("setInterval", (args, callNode, astNode, _thisDef) => {
    handleTimerCallback(args, callNode, astNode);
    return undefined;
});
/**
 * ======================================================
 * ================= XMLHttpRequest =====================
 * ======================================================
 */
// --------------------- XMLHttpRequest.prototype.open -------------------
BuiltInSemantics.register("XMLHttpRequest.prototype.open", (args, callNode, _astNode, _thisDef) => {
    interProceduralAnalyzer_1.interAnalyzer.setCurrentSideEffects(); // side effect
    // xhr.open(method, url, ...)
    const [_, urlDef] = args;
    taint_1.taintManager.checkSink(urlDef, "XML_HTTP_REQUEST_OPEN", callNode.astNode);
    return undefined;
});
// --------------------- XMLHttpRequest.prototype.send -------------------
BuiltInSemantics.register("XMLHttpRequest.prototype.send", (args, _callNode, astNode, _thisDef) => {
    const [bodyDef] = args;
    checkStructuredSink(bodyDef, "XML_HTTP_REQUEST_SEND", astNode);
    return undefined;
});
/**
 * ======================================================
 * =================== WebSocket ========================
 * ======================================================
 */
// --------------------- WebSocket.prototype.send -------------------
BuiltInSemantics.register("WebSocket.prototype.send", (args, _callNode, astNode, _thisDef) => {
    const [bodyDef] = args;
    checkStructuredSink(bodyDef, "WEBSOCKET_SEND", astNode);
    return undefined;
});
/**
 * ======================================================
 * =================== Navigator ========================
 * ======================================================
 */
// --------------------- navigator.geolocation.getCurrentPosition -------------------
BuiltInSemantics.register("navigator.geolocation.getCurrentPosition", (args, callNode, astNode, _thisDef) => {
    interProceduralAnalyzer_1.interAnalyzer.setCurrentSideEffects(); // side effect
    const [successCallback] = args;
    const positionDef = defFactory_1.defFactory.createUnknownDef(callNode);
    taint_1.taintManager.createTaintSource(positionDef, "NAVIGAROR_GEOLOCATION", astNode);
    // Analyze the success callback
    if (def_1.default.isFunctionDef(successCallback)) {
        interProceduralAnalyzer_1.interAnalyzer.analyze(callNode, successCallback, [positionDef], null, astNode);
    }
    return undefined;
});
// --------------------- navigator.geolocation.watchPosition -------------------
BuiltInSemantics.register("navigator.geolocation.watchPosition", (args, callNode, astNode, _thisDef) => {
    interProceduralAnalyzer_1.interAnalyzer.setCurrentSideEffects(); // side effect
    const [successCallback] = args;
    const positionDef = defFactory_1.defFactory.createUnknownDef(callNode);
    taint_1.taintManager.createTaintSource(positionDef, "NAVIGAROR_GEOLOCATION", astNode);
    // Analyze the success callback
    if (def_1.default.isFunctionDef(successCallback)) {
        interProceduralAnalyzer_1.interAnalyzer.analyze(callNode, successCallback, [positionDef], null, astNode);
    }
    return undefined;
});
// --------------------- navigator.clipboard.readText -------------------
BuiltInSemantics.register("navigator.clipboard.readText", (_args, callNode, astNode, _thisDef) => {
    interProceduralAnalyzer_1.interAnalyzer.setCurrentSideEffects(); // side effect
    const resDef = defFactory_1.defFactory.createUnknownDef(callNode);
    taint_1.taintManager.createTaintSource(resDef, "NAVIGATOR_CLIPBOARD", astNode);
    return defFactory_1.defFactory.createPromiseDef(callNode, resDef);
});
// --------------------- navigator.clipboard.read -------------------
BuiltInSemantics.register("navigator.clipboard.read", (_args, callNode, astNode, _thisDef) => {
    interProceduralAnalyzer_1.interAnalyzer.setCurrentSideEffects(); // side effect
    const resDef = defFactory_1.DefFactory.createArrayInstanceDef(callNode, astNode, []);
    taint_1.taintManager.createTaintSource(resDef, "NAVIGATOR_CLIPBOARD", astNode);
    return defFactory_1.defFactory.createPromiseDef(callNode, resDef);
});
// --------------------- navigator.gpu.requestAdapter -------------------
BuiltInSemantics.register("navigator.gpu.requestAdapter", (_args, callNode, astNode, _thisDef) => {
    interProceduralAnalyzer_1.interAnalyzer.setCurrentSideEffects(); // side effect
    const resDef = defFactory_1.defFactory.createObjectDef(callNode);
    taint_1.taintManager.createTaintSource(resDef, "NAVIGATOR_GPU_ADAPTER", astNode);
    return defFactory_1.defFactory.createPromiseDef(callNode, resDef);
});
/**
 * ======================================================
 * =================== Location ========================
 * ======================================================
 */
// --------------------- location.toString -------------------
BuiltInSemantics.register("location.toString", (_args, callNode, astNode) => {
    const resDef = defFactory_1.defFactory.createUnknownDef(callNode);
    taint_1.taintManager.createTaintSource(resDef, "DOCUMENT_LOCATION", astNode);
    return resDef;
});
/**
 * ======================================================
 * =================== Document ========================
 * ======================================================
 */
// --------------------- document.getElementById -------------------
const ELEMENT_TEXT_PROPERTIES = [
    { name: "textContent", source: "ELEMENT_TEXT_CONTENT" },
    { name: "innerHTML", source: "ELEMENT_INNER_HTML" },
    { name: "outerHTML", source: "ELEMENT_OUTER_HTML" },
];
BuiltInSemantics.register("document.getElementById", (args, callNode, astNode, _thisDef) => {
    // DOM read is observable
    interProceduralAnalyzer_1.interAnalyzer.setCurrentSideEffects();
    const id = (0, utils_1.literalOuter)(args[0]);
    const elementDef = defFactory_1.defFactory.createObjectDef(callNode);
    for (const { name, source } of ELEMENT_TEXT_PROPERTIES) {
        const propDef = defFactory_1.defFactory.createUnknownDef(callNode);
        elementDef.setPropertyByName(name, propDef);
        taint_1.taintManager.createTaintSource(propDef, source, astNode, false, id);
    }
    return elementDef;
});
// --------------------- document.querySelector -------------------
BuiltInSemantics.register("document.querySelector", (args, callNode, astNode, _thisDef) => {
    // DOM read is observable
    interProceduralAnalyzer_1.interAnalyzer.setCurrentSideEffects();
    const path = (0, utils_1.literalOuter)(args[0]);
    const elementDef = defFactory_1.defFactory.createObjectDef(callNode);
    for (const { name, source } of ELEMENT_TEXT_PROPERTIES) {
        const propDef = defFactory_1.defFactory.createUnknownDef(callNode);
        elementDef.setPropertyByName(name, propDef);
        taint_1.taintManager.createTaintSource(propDef, source, astNode, false, path);
    }
    return elementDef;
});
/**
 * ======================================================
 * =================== JS Libary ========================
 * ======================================================
 */
// --------------------- JQuery.fn -------------------
const JQUERY_ELEMENT_METHODS = [
    {
        name: "val",
        effect: "JQuery.fn.val",
        source: "JQUERY_ELEMENT_VAL",
        sink: "JQUERY_ELEMENT_VAL_SET",
    },
    {
        name: "text",
        effect: "JQuery.fn.text",
        source: "JQUERY_ELEMENT_TEXT",
        sink: "JQUERY_ELEMENT_TEXT_SET",
    },
    {
        name: "html",
        effect: "JQuery.fn.html",
        source: "JQUERY_ELEMENT_HTML",
        sink: "JQUERY_ELEMENT_HTML_SET",
    },
];
BuiltInSemantics.register("JQuery.fn", (args, callNode) => {
    const resDef = defFactory_1.defFactory.createObjectDef(callNode);
    const path = args[0];
    const pathValue = (0, utils_1.literalOuter)(path);
    // bind methods
    for (const { name, effect } of JQUERY_ELEMENT_METHODS) {
        const func = defFactory_1.defFactory.createBuiltInFunctionDef(callNode, effect);
        func.semanticExec = BuiltInSemantics.get(effect);
        resDef.setPropertyByName(name, func);
    }
    // attach selector context
    if (pathValue !== undefined) {
        resDef.setPropertyByName("path", path);
    }
    return resDef;
});
// --------------------- JQuery.fn.val/text/html -------------------
function registerJQueryElementMethod(effect, sourceKind, sinkKind) {
    BuiltInSemantics.register(effect, (args, callNode, astNode, thisDef) => {
        if (!def_1.default.isObjectDef(thisDef)) {
            return defFactory_1.defFactory.createUnknownDef(callNode);
        }
        const pathDef = thisDef.getPropertyByName("path");
        const pathValue = (0, utils_1.literalOuter)(pathDef);
        // ---------------- Getter ----------------
        if (args.length === 0 && pathValue) {
            const retDef = defFactory_1.defFactory.createUnknownDef(callNode);
            if (pathDef) {
                taint_1.taintManager.createTaintSource(retDef, sourceKind, astNode, false, pathValue);
            }
            return retDef;
        }
        // ---------------- Setter ----------------
        const value = args[0];
        if (pathValue && value) {
            taint_1.taintManager.checkSink(value, sinkKind, astNode, pathValue);
        }
        return thisDef;
    });
}
for (const { effect, source, sink } of JQUERY_ELEMENT_METHODS) {
    registerJQueryElementMethod(effect, source, sink);
}
// --------------------- JQuery.ajax -------------------
BuiltInSemantics.register("JQuery.ajax", (args, callNode, astNode, thisDef) => {
    var _a;
    interProceduralAnalyzer_1.interAnalyzer.setCurrentSideEffects(); // mark side effects
    const options = args[0];
    if (!def_1.default.isObjectDef(options))
        return;
    const urlDef = options.lookupProperty("url");
    const dataDef = options.lookupProperty("data");
    // URL sink
    if (urlDef) {
        taint_1.taintManager.checkSink(urlDef, "JQUERY_AJAX_URL", astNode);
    }
    // DATA sink
    if (dataDef) {
        const url = urlDef ? (_a = (0, utils_1.literalOuter)(urlDef)) !== null && _a !== void 0 ? _a : "[Unparseable URL]" : "[NO URL]";
        taint_1.taintManager.checkSink(dataDef, "JQUERY_AJAX_DATA", astNode, url);
    }
    // do not handle callback
    return undefined;
});
// --------------------- JQuery.get -------------------
BuiltInSemantics.register("JQuery.get", (args, callNode, astNode, thisDef) => {
    if (args.length < 1)
        return defFactory_1.defFactory.createUnknownDef(callNode);
    interProceduralAnalyzer_1.interAnalyzer.setCurrentSideEffects(); // side effect
    const url = args[0];
    const data = args[1];
    // URL
    taint_1.taintManager.checkSink(url, "JQUERY_GET_URL", astNode);
    // DATA
    taint_1.taintManager.checkSink(data, "JQUERY_GET_DATA", astNode);
    return defFactory_1.defFactory.createPromiseDef(callNode);
});
// --------------------- JQuery.post -------------------
BuiltInSemantics.register("JQuery.post", (args, callNode, astNode, thisDef) => {
    if (args.length < 1)
        return defFactory_1.defFactory.createUnknownDef(callNode);
    interProceduralAnalyzer_1.interAnalyzer.setCurrentSideEffects(); // side effect
    const url = args[0];
    const data = args[1];
    // URL
    taint_1.taintManager.checkSink(url, "JQUERY_POST_URL", astNode);
    // DATA
    taint_1.taintManager.checkSink(data, "JQUERY_POST_DATA", astNode);
    return defFactory_1.defFactory.createPromiseDef(callNode);
});
// --------------------- JQuery.globalEval -------------------
BuiltInSemantics.register("JQuery.globalEval", (args, _callNode, astNode, _thisDef) => {
    interProceduralAnalyzer_1.interAnalyzer.setCurrentSideEffects(); // side effect
    const [codeDef] = args;
    taint_1.taintManager.checkSink(codeDef, "JQUERY_GLOBAL_EVAL", astNode);
    return undefined;
});
/**
 * ======================================================
 * ================== Lodash Semantics ==================
 * ======================================================
 */
// --------------------- lodash.map -------------------
BuiltInSemantics.register("lodash.map", (_args, _callNode, _astNode, thisDef) => {
    // simplified return original array
    return thisDef;
});
// --------------------- lodash.filter -------------------
BuiltInSemantics.register("lodash.filter", (_args, _callNode, _astNode, thisDef) => {
    // simplified return original array
    return thisDef;
});
// --------------------- lodash.get -------------------
BuiltInSemantics.register("lodash.get", (args, callNode, astNode) => {
    var _a;
    const [object, path, defaultValue] = args;
    // Only handle object + literal string path
    const pathValue = (0, utils_1.literalOuter)(path);
    if (!def_1.default.isObjectDef(object) || typeof pathValue !== "string") {
        return defFactory_1.defFactory.createUnknownDef(callNode);
    }
    const segments = pathValue.split(".");
    if (segments.length === 0) {
        return defFactory_1.defFactory.createUnknownDef(callNode);
    }
    let current = object;
    // Traverse object properties according to path segments
    for (const key of segments) {
        if (!def_1.default.isObjectDef(current)) {
            current = null;
            break;
        }
        const next = current.getPropertyByName(key);
        if (!next) {
            current = null;
            break;
        }
        current = next;
    }
    // Fallback behavior: defaultValue > unknown
    const resultDef = (_a = current !== null && current !== void 0 ? current : defaultValue) !== null && _a !== void 0 ? _a : defFactory_1.defFactory.createUnknownDef(callNode);
    // [Taint Propagation]
    // lodash.get propagates taint from the source object to the result
    taint_1.taintManager.propagateTaint(object, resultDef, astNode, "ELEMENT", "lodash.get");
    return resultDef;
});
// --------------------- lodash.set -------------------
BuiltInSemantics.register("lodash.set", (args, callNode, astNode) => {
    var _a;
    if (args.length < 3) {
        // lodash.set returns the original object even on invalid input
        return (_a = args[0]) !== null && _a !== void 0 ? _a : defFactory_1.defFactory.createUnknownDef(callNode);
    }
    const [object, path, value] = args;
    // Only attempt precise modeling when object is ObjectDef
    // and path is a literal string
    if (def_1.default.isObjectDef(object) &&
        def_1.default.isLiteralDef(path) &&
        typeof path.value === "string") {
        const segments = path.value.split(".");
        let current = object;
        // Ensure all intermediate objects exist
        for (let i = 0; i < segments.length - 1; i++) {
            const key = segments[i];
            let next = current.getPropertyByName(key);
            if (!def_1.default.isObjectDef(next)) {
                next = defFactory_1.defFactory.createObjectDef(callNode);
                current.setPropertyByName(key, next);
            }
            current = next;
        }
        // Set final property
        const finalKey = segments[segments.length - 1];
        current.setPropertyByName(finalKey, value);
    }
    // [Taint Propagation] If assigned value is tainted, the target object becomes tainted
    if (def_1.default.isObjectDef(object) && (value === null || value === void 0 ? void 0 : value.isTainted)) {
        taint_1.taintManager.propagateTaint(value, object, astNode, "ASSIGN", "lodash.set");
    }
    return object;
});
// --------------------- lodash.clone -------------------
BuiltInSemantics.register("lodash.clone", (args, callNode, astNdoe, thisDef) => {
    if (args.length === 0)
        return defFactory_1.defFactory.createUnknownDef(callNode);
    const value = args[0];
    // Shallow clone: create a new Def instance
    return value.cloneWithFlowNode(callNode);
});
// --------------------- _.cloneDeep -------------------
BuiltInSemantics.register("lodash.cloneDeep", (args, callNode, astNode, thisDef) => {
    if (args.length === 0)
        return defFactory_1.defFactory.createUnknownDef(callNode);
    const value = args[0];
    // Deep clone semantics are approximated here.
    return value.cloneWithFlowNode(callNode);
});
// --------------------- lodash.assign-------------------
BuiltInSemantics.register("lodash.assign", (args) => {
    const [target, ...sources] = args;
    if (!def_1.default.isObjectDef(target))
        return target;
    for (const source of sources) {
        if (!def_1.default.isObjectDef(source))
            continue;
        for (const [k, v] of source.props) {
            target.setPropertyByName(k, v);
        }
    }
    return target;
});
// --------------------- lodash.debounce-------------------
BuiltInSemantics.register("lodash.debounce", (args, callNode, astNode, thisDef) => {
    if (args.length < 2)
        return defFactory_1.defFactory.createUnknownDef(callNode);
    const [func, wait] = args;
    if (!def_1.default.isFunctionDef(func))
        return defFactory_1.defFactory.createUnknownDef(callNode);
    const debouncedFunc = defFactory_1.defFactory.createFunctionDef(callNode, func.functionNode);
    return debouncedFunc;
});
// --------------------- lodash.once-------------------
BuiltInSemantics.register("lodash.once", (args, callNode, astNode, thisDef) => {
    if (args.length < 1)
        return defFactory_1.defFactory.createUnknownDef(callNode);
    const [func] = args;
    if (!def_1.default.isFunctionDef(func))
        return defFactory_1.defFactory.createUnknownDef(callNode);
    const onceFunc = defFactory_1.defFactory.createFunctionDef(callNode, func.functionNode);
    return onceFunc;
});
/**
 * ======================================================
 * ================== Axios Semantics ==================
 * ======================================================
 */
// --------------------- axios.get-------------------
BuiltInSemantics.register("axios.get", (args, callNode, astNode, thisDef) => {
    interProceduralAnalyzer_1.interAnalyzer.setCurrentSideEffects(); // side effects
    const [url, config] = args;
    if (url) {
        checkStructuredSink(config, "AXIOS_GET_URL", astNode);
    }
    if (config) {
        checkStructuredSink(config, "AXIOS_GET_CONFIG", astNode);
    }
    return defFactory_1.defFactory.createPromiseDef(callNode);
});
// --------------------- axios.post-------------------
BuiltInSemantics.register("axios.post", (args, callNode, astNode, thisDef) => {
    interProceduralAnalyzer_1.interAnalyzer.setCurrentSideEffects(); // side effects
    const [url, data, config] = args;
    if (url) {
        checkStructuredSink(data, "AXIOS_POST_URL", astNode);
    }
    if (data) {
        checkStructuredSink(data, "AXIOS_POST_DATA", astNode);
    }
    if (config) {
        checkStructuredSink(config, "AXIOS_POST_CONFIG", astNode);
    }
    return defFactory_1.defFactory.createPromiseDef(callNode);
});
// --------------------- axios.request-------------------
BuiltInSemantics.register("axios.request", (args, callNode, astNode, thisDef) => {
    interProceduralAnalyzer_1.interAnalyzer.setCurrentSideEffects(); // side effects
    const [config] = args;
    if (config) {
        checkStructuredSink(config, "AXIOS_REQUEST_CONFIG", astNode);
    }
    return defFactory_1.defFactory.createPromiseDef(callNode);
});
// --------------------- axios.create -------------------
BuiltInSemantics.register("axios.create", (args, callNode, astNode, thisDef) => {
    interProceduralAnalyzer_1.interAnalyzer.setCurrentSideEffects(); // side effects
    const [config] = args;
    const axiosInstance = defFactory_1.defFactory.createObjectDef(callNode);
    // add prototype methods
    const methods = ["request", "get", "post"];
    methods.forEach((method) => {
        const methodFunc = defFactory_1.defFactory.createBuiltInFunctionDef(callNode, `axios.${method}`);
        methodFunc.semanticExec = BuiltInSemantics.get(`axios.${method}`);
        axiosInstance.setPropertyByName(method, methodFunc);
    });
    return defFactory_1.defFactory.createPromiseDef(callNode);
});
// --------------------- axios.fn -------------------
BuiltInSemantics.register("axios.fn", (args, callNode, astNode, thisDef) => {
    interProceduralAnalyzer_1.interAnalyzer.setCurrentSideEffects(); // side effects
    const [config] = args;
    if (config) {
        checkStructuredSink(config, "AXIOS_EFFECT_CONFIG", astNode);
    }
    return defFactory_1.defFactory.createPromiseDef(callNode);
});
/**
 * ======================================================
 * ================== BASE64 Semantics ==================
 * ======================================================
 */
// --------------------- base64.encode -------------------
BuiltInSemantics.register("base64.encode", (args, callNode, astNode) => {
    if (args.length !== 1)
        return undefined;
    const input = args[0];
    const resDef = defFactory_1.defFactory.createUnknownDef(callNode);
    // [Taint propagation]
    taint_1.taintManager.propagateTaint(input, resDef, astNode, "RETURN", "base64.encode");
    return resDef;
});
// --------------------- base64.decode-------------------
BuiltInSemantics.register("base64.decode", (args, callNode, astNode) => {
    if (args.length !== 1)
        return undefined;
    const input = args[0];
    const resDef = defFactory_1.defFactory.createUnknownDef(callNode);
    // [Taint propagation]
    taint_1.taintManager.propagateTaint(input, resDef, astNode, "RETURN", "base64.decode");
    return resDef;
});
/**
 * ======================================================
 * ================== CryptoJS Semantics ==================
 * ======================================================
 */
// --------------------- CryptoJS.MD5-------------------
BuiltInSemantics.register("CryptoJS.MD5", (args, callNode, astNode) => {
    const input = args[0];
    if (input === null || input === void 0 ? void 0 : input.isTainted) {
        taint_1.taintManager.applySanitizer(input, "CryptoJS.HASH", astNode);
    }
    return defFactory_1.defFactory.createUnknownDef(callNode);
});
// --------------------- CryptoJS.AES.encrypt-------------------
BuiltInSemantics.register("CryptoJS.AES.encrypt", (args, callNode, astNode) => {
    const [data, key] = args;
    const cipherDef = defFactory_1.defFactory.createUnknownDef(callNode);
    // [Taint Propagation]
    taint_1.taintManager.propagateTaint(data, cipherDef, astNode, "RETURN", "Crypto.AES.encrypt");
    return cipherDef;
});
// --------------------- CryptoJS.AES.decrypt-------------------
BuiltInSemantics.register("CryptoJS.AES.decrypt", (args, callNode, astNode) => {
    const [cipher, key] = args;
    const dataDef = defFactory_1.defFactory.createUnknownDef(callNode);
    // [Taint Propagation]
    taint_1.taintManager.propagateTaint(cipher, dataDef, astNode, "RETURN", "Crypto.AES.decrypt");
    return dataDef;
});
// --------------------- CryptoJS.enc.Hex.stringify-------------------
BuiltInSemantics.register("CryptoJS.enc.Hex.stringify", (args, callNode, astNode) => {
    const [data] = args;
    const resDef = defFactory_1.defFactory.createUnknownDef(callNode);
    // [Taint Propagation]
    taint_1.taintManager.propagateTaint(data, resDef, astNode, "RETURN", "Crypto.enc");
    return resDef;
});
/**
 * ======================================================
 * ================== WebCrypto Semantics ==================
 * ======================================================
 */
// --------------------- crypto.subtle.digest -------------------
BuiltInSemantics.register("crypto.subtle.digest", (args, callNode, astNode) => {
    const [algorithm, data] = args;
    const hashDef = defFactory_1.defFactory.createUnknownDef(callNode);
    // [Sanitization]
    if (data === null || data === void 0 ? void 0 : data.isTainted) {
        taint_1.taintManager.applySanitizer(data, "WebCrypto.hash", astNode);
    }
    return hashDef;
});
// --------------------- crypto.subtle.encrypt -------------------
BuiltInSemantics.register("crypto.subtle.encrypt", (args, callNode, astNode) => {
    const [algorithm, key, data] = args;
    const cipherDef = defFactory_1.defFactory.createUnknownDef(callNode);
    // [Taint Propagation]
    taint_1.taintManager.propagateTaint(data, cipherDef, astNode, "RETURN", "WebCrypto.encrypt");
    return cipherDef;
});
// --------------------- crypto.subtle.decrypt -------------------
BuiltInSemantics.register("crypto.subtle.decrypt", (args, callNode, astNode) => {
    const [algorithm, key, cipher] = args;
    const dataDef = defFactory_1.defFactory.createUnknownDef(callNode);
    // [Taint Propagation]
    taint_1.taintManager.propagateTaint(cipher, dataDef, astNode, "RETURN", "WebCrypto.decrypt");
    return dataDef;
});
// --------------------- crypto.subtle.sign -------------------
BuiltInSemantics.register("crypto.subtle.sign", (args, callNode, astNode) => {
    const [algorithm, key, data] = args;
    const sigDef = defFactory_1.defFactory.createUnknownDef(callNode);
    // [Sanitization]
    if (data === null || data === void 0 ? void 0 : data.isTainted) {
        taint_1.taintManager.applySanitizer(data, "WebCrypto.sign", astNode);
    }
    return sigDef;
});
