"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
/**
 * ======================================================
 * ================== Lodash Semantics ==================
 * ======================================================
 */
// --------------------- lodash.map -------------------
index_1.BuiltInSemantics.register("lodash.map", (_args, _callNode, _astNode, thisDef) => {
    // simplified return original array
    return thisDef;
});
// --------------------- lodash.filter -------------------
index_1.BuiltInSemantics.register("lodash.filter", (_args, _callNode, _astNode, thisDef) => {
    // simplified return original array
    return thisDef;
});
// --------------------- lodash.get -------------------
index_1.BuiltInSemantics.register("lodash.get", (args, callNode, astNode) => {
    var _a;
    const [object, path, defaultValue] = args;
    // Only handle object + literal string path
    const pathValue = (0, index_1.literalOuter)(path);
    if (!index_1.Def.isObjectDef(object) || typeof pathValue !== "string") {
        return index_1.defFactory.createUnknownDef(callNode);
    }
    const segments = pathValue.split(".");
    if (segments.length === 0) {
        return index_1.defFactory.createUnknownDef(callNode);
    }
    let current = object;
    // Traverse object properties according to path segments
    for (const key of segments) {
        if (!index_1.Def.isObjectDef(current)) {
            current = null;
            break;
        }
        const next = current.getProperty(key);
        if (!next) {
            current = null;
            break;
        }
        current = next;
    }
    // Fallback behavior: defaultValue > unknown
    const resultDef = (_a = current !== null && current !== void 0 ? current : defaultValue) !== null && _a !== void 0 ? _a : index_1.defFactory.createUnknownDef(callNode);
    // [Taint Propagation]
    // lodash.get propagates taint from the source object to the result
    index_1.taintManager.propagateTaint(object, resultDef, astNode, "ELEMENT", "lodash.get");
    return resultDef;
});
// --------------------- lodash.set -------------------
index_1.BuiltInSemantics.register("lodash.set", (args, callNode, astNode) => {
    var _a;
    if (args.length < 3) {
        // lodash.set returns the original object even on invalid input
        return (_a = args[0]) !== null && _a !== void 0 ? _a : index_1.defFactory.createUnknownDef(callNode);
    }
    const [object, path, value] = args;
    // Only attempt precise modeling when object is ObjectDef
    // and path is a literal string
    if (index_1.Def.isObjectDef(object) &&
        index_1.Def.isLiteralDef(path) &&
        typeof path.value === "string") {
        const segments = path.value.split(".");
        let current = object;
        // Ensure all intermediate objects exist
        for (let i = 0; i < segments.length - 1; i++) {
            const key = segments[i];
            let next = current.getProperty(key);
            if (!index_1.Def.isObjectDef(next)) {
                next = index_1.defFactory.createObjectDef(callNode);
                current.setProperty(key, next);
            }
            current = next;
        }
        // Set final property
        const finalKey = segments[segments.length - 1];
        current.setProperty(finalKey, value);
    }
    // [Taint Propagation] If assigned value is tainted, the target object becomes tainted
    if (index_1.Def.isObjectDef(object) && (value === null || value === void 0 ? void 0 : value.isTainted)) {
        index_1.taintManager.propagateTaint(value, object, astNode, "MUTATE", "lodash.set");
    }
    return object;
});
// --------------------- lodash.clone -------------------
index_1.BuiltInSemantics.register("lodash.clone", (args, callNode) => {
    if (args.length === 0)
        return index_1.defFactory.createUnknownDef(callNode);
    const value = args[0];
    // Shallow clone: create a new Def instance
    return value.cloneShallow(callNode);
});
// --------------------- _.cloneDeep -------------------
index_1.BuiltInSemantics.register("lodash.cloneDeep", (args, callNode) => {
    if (args.length === 0)
        return index_1.defFactory.createUnknownDef(callNode);
    const value = args[0];
    // Deep clone semantics are approximated here.
    return value.cloneDeep(callNode);
});
// --------------------- lodash.assign-------------------
index_1.BuiltInSemantics.register("lodash.assign", (args) => {
    const [target, ...sources] = args;
    if (!index_1.Def.isObjectDef(target))
        return target;
    for (const source of sources) {
        if (!index_1.Def.isObjectDef(source))
            continue;
        for (const [k, v] of source.props) {
            target.setProperty(k, v);
        }
    }
    return target;
});
// --------------------- lodash.debounce-------------------
index_1.BuiltInSemantics.register("lodash.debounce", (args, callNode) => {
    if (args.length < 2)
        return index_1.defFactory.createUnknownDef(callNode);
    const [func, wait] = args;
    if (!index_1.Def.isFunctionDef(func))
        return index_1.defFactory.createUnknownDef(callNode);
    const debouncedFunc = index_1.defFactory.createFunctionDef(callNode, func.functionNode);
    return debouncedFunc;
});
// --------------------- lodash.once-------------------
index_1.BuiltInSemantics.register("lodash.once", (args, callNode) => {
    if (args.length < 1)
        return index_1.defFactory.createUnknownDef(callNode);
    const [func] = args;
    if (!index_1.Def.isFunctionDef(func))
        return index_1.defFactory.createUnknownDef(callNode);
    const onceFunc = index_1.defFactory.createFunctionDef(callNode, func.functionNode);
    return onceFunc;
});
