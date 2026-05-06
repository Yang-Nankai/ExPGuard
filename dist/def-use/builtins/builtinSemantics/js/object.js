"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.copyEnumerableProps = copyEnumerableProps;
const index_1 = require("../index");
/**
 * Helper: copy enumerable properties (shallow copy)
 */
function copyEnumerableProps(target, source, astNode, label) {
    for (const [k, v] of source.props) {
        target.setProperty(k, v);
    }
    // Taint propagation (source -> target)
    index_1.taintManager.propagateTaint(source, target, astNode, "COPY", label);
}
/**
 * ======================================================
 * Object.assign(target, ...sources)
 * ======================================================
 */
index_1.BuiltInSemantics.register("Object.assign", (args, callNode, astNode) => {
    const [target, ...sources] = args;
    if (!index_1.Def.isObjectDef(target)) {
        return index_1.defFactory.createUnknownDef(callNode);
    }
    for (const source of sources) {
        if (!index_1.Def.isObjectDef(source))
            continue;
        copyEnumerableProps(target, source, astNode, "object.assign");
    }
    return target;
});
/**
 * ======================================================
 * Object.create(proto)
 * ======================================================
 *
 * NOTE:
 *  - Do NOT propagate taint here.
 *  - Taint should flow during property lookup via prototype chain.
 */
index_1.BuiltInSemantics.register("Object.create", (args, callNode) => {
    const proto = index_1.Def.isObjectDef(args[0]) ? args[0] : null;
    const newObj = index_1.defFactory.createObjectDef(callNode, proto);
    return newObj;
});
/**
 * ======================================================
 * Object.defineProperty(obj, prop, descriptor)
 * ======================================================
 *
 * Sound modeling:
 *  - descriptor is meta object
 *  - Only descriptor.value affects data flow
 */
index_1.BuiltInSemantics.register("Object.defineProperty", (args) => {
    var _a;
    const [target, propNameDef, descriptor] = args;
    if (!index_1.Def.isObjectDef(target) ||
        !index_1.Def.isLiteralDef(propNameDef) ||
        !index_1.Def.isObjectDef(descriptor)) {
        return target;
    }
    // Attempt to resolve property name
    const propName = (_a = propNameDef === null || propNameDef === void 0 ? void 0 : propNameDef.value) !== null && _a !== void 0 ? _a : null;
    const valueDef = descriptor.getProperty("value");
    if (propName !== null && valueDef) {
        // Property set and taint propagation
        target.setProperty(String(propName), valueDef);
    }
    return target;
});
/**
 * ======================================================
 * Object.defineProperties(obj, descriptors)
 * ======================================================
 *
 * descriptors = {
 *   a: { value: ... },
 *   b: { value: ... }
 * }
 */
index_1.BuiltInSemantics.register("Object.defineProperties", (args) => {
    const [target, descriptors] = args;
    if (!index_1.Def.isObjectDef(target) || !index_1.Def.isObjectDef(descriptors)) {
        return target;
    }
    for (const [propName, descObj] of descriptors.props) {
        if (!index_1.Def.isObjectDef(descObj))
            continue;
        const valueDef = descObj.getProperty("value");
        if (valueDef) {
            target.setProperty(propName, valueDef);
        }
    }
    return target;
});
/**
 * ======================================================
 * Object.entries(obj)
 * ======================================================
 *
 * Returns:
 *  [ [key, value], ... ]
 */
index_1.BuiltInSemantics.register("Object.entries", (args, callNode, astNode) => {
    const [obj] = args;
    if (!index_1.Def.isObjectDef(obj)) {
        return index_1.defFactory.createUnknownDef(callNode);
    }
    const entryDefs = [];
    for (const [k, v] of obj.props) {
        const keyDef = index_1.defFactory.createLiteralDef(callNode, k);
        const pair = index_1.DefFactory.createArrayInstanceDef(callNode, astNode, [
            keyDef,
            v,
        ]);
        entryDefs.push(pair);
    }
    return index_1.DefFactory.createArrayInstanceDef(callNode, astNode, entryDefs);
});
/**
 * ======================================================
 * Object.values(obj)
 * ======================================================
 */
index_1.BuiltInSemantics.register("Object.values", (args, callNode, astNode) => {
    const [obj] = args;
    if (!index_1.Def.isObjectDef(obj)) {
        return index_1.defFactory.createUnknownDef(callNode);
    }
    const values = [...obj.props.values()];
    const result = index_1.DefFactory.createArrayInstanceDef(callNode, astNode, values);
    return result;
});
/**
 * ======================================================
 * Object.keys(obj)
 * ======================================================
 */
index_1.BuiltInSemantics.register("Object.keys", (args, callNode, astNode) => {
    const [obj] = args;
    if (!index_1.Def.isObjectDef(obj)) {
        // If the obj is tainted
        // const element = defFactory.createUnknownDef(callNode);
        // if (obj.isTainted) {
        //   taintManager.createTaintSource(element, "AXIOS_GET_RESPONSE", astNode, false, "object.keys");
        //   return DefFactory.createArrayInstanceDef(callNode, astNode, [element]);
        // }
        return index_1.defFactory.createUnknownDef(callNode);
    }
    const keys = [...obj.props.keys()].map((k) => index_1.defFactory.createLiteralDef(callNode, k));
    const result = index_1.DefFactory.createArrayInstanceDef(callNode, astNode, keys);
    return result;
});
/**
 * ======================================================
 * Object.getPrototypeOf(obj)
 * ======================================================
 */
index_1.BuiltInSemantics.register("Object.getPrototypeOf", (args, callNode) => {
    var _a;
    const [obj] = args;
    if (!index_1.Def.isObjectDef(obj)) {
        return index_1.defFactory.createUnknownDef(callNode);
    }
    return (_a = obj.proto) !== null && _a !== void 0 ? _a : null;
});
/**
 * ======================================================
 * Object.setPrototypeOf(obj, proto)
 * ======================================================
 */
index_1.BuiltInSemantics.register("Object.setPrototypeOf", (args, callNode) => {
    const [obj, protoCandidate] = args;
    if (!index_1.Def.isObjectDef(obj)) {
        return index_1.defFactory.createUnknownDef(callNode);
    }
    obj.proto = index_1.Def.isObjectDef(protoCandidate) ? protoCandidate : null;
    return obj;
});
