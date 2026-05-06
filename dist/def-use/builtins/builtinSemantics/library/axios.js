"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
function getObjectPropertyValueNode(objExpr, propName) {
    if (!objExpr || objExpr.type !== "ObjectExpression")
        return undefined;
    for (const prop of objExpr.properties || []) {
        if (!prop || prop.type !== "Property")
            continue;
        const key = prop.key;
        if (!key)
            continue;
        if (!prop.computed && key.type === "Identifier" && key.name === propName) {
            return prop.value;
        }
        if (key.type === "Literal" && key.value === propName) {
            return prop.value;
        }
    }
    return undefined;
}
/**
 * Check structured sinks (object / form data / headers).
 */
function checkStructuredSink(valueDef, sinkTag, astNode, remark) {
    if (!valueDef)
        return;
    // Direct taint
    if (valueDef.isTainted) {
        index_1.taintManager.checkSink(valueDef, sinkTag, astNode, remark);
        return;
    }
    // Traverse object properties
    if (index_1.Def.isObjectDef(valueDef)) {
        for (const [, value] of valueDef.props) {
            index_1.taintManager.checkSink(value, sinkTag, astNode, remark);
        }
    }
}
/**
 * Inspect axios config object
 *
 * axios({
 *   url,
 *   data,
 *   headers
 * })
 */
function checkAxiosConfig(configDef, astNode, urlTaintControl) {
    const urlDef = configDef.lookupProperty("url");
    const dataDef = configDef.lookupProperty("data");
    const headersDef = configDef.lookupProperty("headers");
    if (urlDef) {
        index_1.taintManager.checkSink(urlDef, "AXIOS_URL", astNode, undefined, urlTaintControl);
    }
    if (dataDef) {
        checkStructuredSink(dataDef, "AXIOS_DATA", astNode);
    }
    if (headersDef) {
        checkStructuredSink(headersDef, "AXIOS_HEADERS", astNode);
    }
}
/**
 * ======================================================
 * ================== Axios Semantics ===================
 * ======================================================
 */
// --------------------- axios.get -------------------
index_1.BuiltInSemantics.register("axios.get", (args, callNode, astNode) => {
    var _a, _b;
    index_1.interAnalyzer.setCurrentSideEffects();
    const [urlDef, configDef] = args;
    const urlArgNode = (_a = astNode === null || astNode === void 0 ? void 0 : astNode.arguments) === null || _a === void 0 ? void 0 : _a[0];
    const configUrlArgNode = getObjectPropertyValueNode((_b = astNode === null || astNode === void 0 ? void 0 : astNode.arguments) === null || _b === void 0 ? void 0 : _b[1], "url");
    if (urlDef) {
        index_1.taintManager.checkSink(urlDef, "AXIOS_URL", astNode, undefined, (0, index_1.inferUrlTaintControl)(urlArgNode));
    }
    if (configDef && index_1.Def.isObjectDef(configDef)) {
        checkAxiosConfig(configDef, astNode, (0, index_1.inferUrlTaintControl)(configUrlArgNode));
    }
    // Create response taint
    const responseDef = index_1.defFactory.createUnknownDef(callNode);
    index_1.taintManager.createTaintSource(responseDef, "AXIOS_GET_RESPONSE", astNode, true);
    return index_1.defFactory.createPromiseDef(callNode, responseDef);
});
// --------------------- axios.post -------------------
index_1.BuiltInSemantics.register("axios.post", (args, callNode, astNode) => {
    var _a, _b;
    index_1.interAnalyzer.setCurrentSideEffects();
    const [urlDef, dataDef, configDef] = args;
    const urlArgNode = (_a = astNode === null || astNode === void 0 ? void 0 : astNode.arguments) === null || _a === void 0 ? void 0 : _a[0];
    const configUrlArgNode = getObjectPropertyValueNode((_b = astNode === null || astNode === void 0 ? void 0 : astNode.arguments) === null || _b === void 0 ? void 0 : _b[2], "url");
    if (urlDef) {
        index_1.taintManager.checkSink(urlDef, "AXIOS_URL", astNode, undefined, (0, index_1.inferUrlTaintControl)(urlArgNode));
    }
    if (dataDef) {
        checkStructuredSink(dataDef, "AXIOS_DATA", astNode);
    }
    if (configDef && index_1.Def.isObjectDef(configDef)) {
        checkAxiosConfig(configDef, astNode, (0, index_1.inferUrlTaintControl)(configUrlArgNode));
    }
    // Create response taint
    const responseDef = index_1.defFactory.createUnknownDef(callNode);
    index_1.taintManager.createTaintSource(responseDef, "AXIOS_POST_RESPONSE", astNode, true);
    return index_1.defFactory.createPromiseDef(callNode, responseDef);
});
// --------------------- axios.request -------------------
index_1.BuiltInSemantics.register("axios.request", (args, callNode, astNode) => {
    var _a;
    index_1.interAnalyzer.setCurrentSideEffects();
    const [configDef] = args;
    const configArgNode = (_a = astNode === null || astNode === void 0 ? void 0 : astNode.arguments) === null || _a === void 0 ? void 0 : _a[0];
    const urlArgNode = getObjectPropertyValueNode(configArgNode, "url");
    if (configDef && index_1.Def.isObjectDef(configDef)) {
        checkAxiosConfig(configDef, astNode, (0, index_1.inferUrlTaintControl)(urlArgNode));
    }
    const responseDef = index_1.defFactory.createUnknownDef(callNode);
    index_1.taintManager.createTaintSource(responseDef, "AXIOS_REQUEST_RESPONSE", astNode, true);
    return index_1.defFactory.createPromiseDef(callNode, responseDef);
});
// --------------------- axios(...) -------------------
index_1.BuiltInSemantics.register("axios.fn", (args, callNode, astNode) => {
    var _a;
    index_1.interAnalyzer.setCurrentSideEffects();
    const [configDef] = args;
    const configArgNode = (_a = astNode === null || astNode === void 0 ? void 0 : astNode.arguments) === null || _a === void 0 ? void 0 : _a[0];
    const urlArgNode = getObjectPropertyValueNode(configArgNode, "url");
    if (configDef && index_1.Def.isObjectDef(configDef)) {
        checkAxiosConfig(configDef, astNode, (0, index_1.inferUrlTaintControl)(urlArgNode));
    }
    const responseDef = index_1.defFactory.createUnknownDef(callNode);
    index_1.taintManager.createTaintSource(responseDef, "AXIOS_RESPONSE", astNode, true);
    return index_1.defFactory.createPromiseDef(callNode, responseDef);
});
// --------------------- axios.create -------------------
index_1.BuiltInSemantics.register("axios.create", (args, callNode) => {
    const axiosInstance = index_1.defFactory.createObjectDef(callNode);
    const methods = ["request", "get", "post"];
    for (const method of methods) {
        const methodFunc = index_1.defFactory.createBuiltInFunctionDef(callNode, `axios.${method}`);
        methodFunc.semanticExec = index_1.BuiltInSemantics.get(`axios.${method}`);
        axiosInstance.setProperty(method, methodFunc);
    }
    return axiosInstance;
});
