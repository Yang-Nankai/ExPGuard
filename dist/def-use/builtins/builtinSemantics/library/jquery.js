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
 * ======================================================
 * =================== jQuery Element API ===============
 * ======================================================
 */
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
/**
 * jQuery(selector)
 */
index_1.BuiltInSemantics.register("JQuery.fn", (args, callNode) => {
    const resDef = index_1.defFactory.createObjectDef(callNode);
    const selectorDef = args[0];
    const selectorValue = (0, index_1.literalOuter)(selectorDef);
    // bind element methods
    for (const { name, effect } of JQUERY_ELEMENT_METHODS) {
        const fn = index_1.defFactory.createBuiltInFunctionDef(callNode, effect);
        fn.semanticExec = index_1.BuiltInSemantics.get(effect);
        resDef.setProperty(name, fn);
    }
    // attach selector context
    if (selectorValue !== undefined) {
        resDef.setProperty("selector", selectorDef);
    }
    return resDef;
});
/**
 * Register val/text/html semantics
 */
function registerJQueryElementMethod(effect, sourceType, sinkType) {
    index_1.BuiltInSemantics.register(effect, (args, callNode, astNode, thisDef) => {
        if (!index_1.Def.isObjectDef(thisDef)) {
            return index_1.defFactory.createUnknownDef(callNode);
        }
        const selectorDef = thisDef.getProperty("selector");
        const selector = (0, index_1.literalOuter)(selectorDef);
        // ---------------- Getter ----------------
        if (args.length === 0 && selector) {
            const retDef = index_1.defFactory.createUnknownDef(callNode);
            if (selectorDef) {
                index_1.taintManager.createTaintSource(retDef, sourceType, astNode, false, selector);
            }
            return retDef;
        }
        // ---------------- Setter ----------------
        const valueDef = args[0];
        if (selector && valueDef) {
            index_1.taintManager.checkSink(valueDef, sinkType, astNode, selector);
        }
        return thisDef;
    });
}
for (const { effect, source, sink } of JQUERY_ELEMENT_METHODS) {
    registerJQueryElementMethod(effect, source, sink);
}
/**
 * ======================================================
 * ==================== Ajax Helpers ====================
 * ======================================================
 */
function checkAjaxSettings(settings, astNode, urlTaintControl) {
    const urlDef = settings.lookupProperty("url");
    const dataDef = settings.lookupProperty("data");
    if (urlDef) {
        index_1.taintManager.checkSink(urlDef, "JQUERY_SETTINGS_URL", astNode, undefined, urlTaintControl);
    }
    if (dataDef) {
        index_1.taintManager.checkSink(dataDef, "JQUERY_SETTINGS_DATA", astNode);
    }
    return { urlDef, dataDef };
}
/**
 * ======================================================
 * ===================== JQuery.ajax ====================
 * ======================================================
 */
index_1.BuiltInSemantics.register("JQuery.ajax", (args, callNode, astNode) => {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    index_1.interAnalyzer.setCurrentSideEffects();
    if (args.length === 0) {
        return index_1.defFactory.createPromiseDef(callNode);
    }
    let urlDef = null;
    let dataDef = null;
    let successCallback = undefined;
    const first = args[0];
    const firstArgNode = (_a = astNode === null || astNode === void 0 ? void 0 : astNode.arguments) === null || _a === void 0 ? void 0 : _a[0];
    const secondArgNode = (_b = astNode === null || astNode === void 0 ? void 0 : astNode.arguments) === null || _b === void 0 ? void 0 : _b[1];
    // $.ajax(settings)
    if (index_1.Def.isObjectDef(first)) {
        const settings = first;
        const settingsUrlNode = getObjectPropertyValueNode(firstArgNode, "url");
        const result = checkAjaxSettings(settings, astNode, (0, index_1.inferUrlTaintControl)(settingsUrlNode));
        urlDef = result.urlDef;
        dataDef = result.dataDef;
        successCallback =
            (_d = (_c = settings.lookupProperty("success")) !== null && _c !== void 0 ? _c : settings.lookupProperty("done")) !== null && _d !== void 0 ? _d : undefined;
    }
    // $.ajax(url, settings)
    else {
        urlDef = first;
        if (index_1.Def.isObjectDef(args[1])) {
            const settings = args[1];
            const settingsUrlNode = getObjectPropertyValueNode(secondArgNode, "url");
            const result = checkAjaxSettings(settings, astNode, (0, index_1.inferUrlTaintControl)(settingsUrlNode));
            urlDef = (_e = result.urlDef) !== null && _e !== void 0 ? _e : urlDef;
            dataDef = result.dataDef;
            successCallback =
                (_g = (_f = settings.lookupProperty("success")) !== null && _f !== void 0 ? _f : settings.lookupProperty("done")) !== null && _g !== void 0 ? _g : undefined;
        }
    }
    // URL sink
    if (urlDef) {
        let urlControl = (0, index_1.inferUrlTaintControl)(firstArgNode);
        if (index_1.Def.isObjectDef(first)) {
            urlControl = (0, index_1.inferUrlTaintControl)(getObjectPropertyValueNode(firstArgNode, "url"));
        }
        else if (index_1.Def.isObjectDef(args[1])) {
            const urlFromSettings = getObjectPropertyValueNode(secondArgNode, "url");
            urlControl = urlFromSettings
                ? (0, index_1.inferUrlTaintControl)(urlFromSettings)
                : (0, index_1.inferUrlTaintControl)(firstArgNode);
        }
        index_1.taintManager.checkSink(urlDef, "JQUERY_AJAX_URL", astNode, undefined, urlControl);
    }
    // DATA sink
    if (dataDef) {
        const context = urlDef ? (_h = (0, index_1.literalOuter)(urlDef)) !== null && _h !== void 0 ? _h : "[UNKNOWN URL]" : "[NO URL]";
        index_1.taintManager.checkSink(dataDef, "JQUERY_AJAX_DATA", astNode, context);
    }
    /**
     * Model response
     */
    const responseDef = index_1.defFactory.createUnknownDef(callNode);
    index_1.taintManager.createTaintSource(responseDef, "JQUERY_AJAX_RESPONSE", astNode, true);
    // invoke success callback if present
    if (index_1.Def.isFunctionDef(successCallback)) {
        index_1.interAnalyzer.analyze(callNode, successCallback, [responseDef], null, astNode);
    }
    return index_1.defFactory.createPromiseDef(callNode, responseDef);
});
/**
 * ======================================================
 * ===================== JQuery.get =====================
 * ======================================================
 */
index_1.BuiltInSemantics.register("JQuery.get", (args, callNode, astNode) => {
    var _a;
    index_1.interAnalyzer.setCurrentSideEffects();
    const [urlDef, dataDef] = args;
    const urlArgNode = (_a = astNode === null || astNode === void 0 ? void 0 : astNode.arguments) === null || _a === void 0 ? void 0 : _a[0];
    if (urlDef) {
        index_1.taintManager.checkSink(urlDef, "JQUERY_GET_URL", astNode, undefined, (0, index_1.inferUrlTaintControl)(urlArgNode));
    }
    if (dataDef) {
        index_1.taintManager.checkSink(dataDef, "JQUERY_GET_DATA", astNode);
    }
    return index_1.defFactory.createPromiseDef(callNode);
});
/**
 * ======================================================
 * ===================== JQuery.post ====================
 * ======================================================
 */
index_1.BuiltInSemantics.register("JQuery.post", (args, callNode, astNode) => {
    var _a;
    index_1.interAnalyzer.setCurrentSideEffects();
    const [urlDef, dataDef] = args;
    const urlArgNode = (_a = astNode === null || astNode === void 0 ? void 0 : astNode.arguments) === null || _a === void 0 ? void 0 : _a[0];
    if (urlDef) {
        index_1.taintManager.checkSink(urlDef, "JQUERY_POST_URL", astNode, undefined, (0, index_1.inferUrlTaintControl)(urlArgNode));
    }
    if (dataDef) {
        index_1.taintManager.checkSink(dataDef, "JQUERY_POST_DATA", astNode);
    }
    return index_1.defFactory.createPromiseDef(callNode);
});
/**
 * ======================================================
 * ================= JQuery.globalEval ==================
 * ======================================================
 */
index_1.BuiltInSemantics.register("JQuery.globalEval", (args, _callNode, astNode) => {
    index_1.interAnalyzer.setCurrentSideEffects();
    const [codeDef] = args;
    if (codeDef) {
        index_1.taintManager.checkSink(codeDef, "JQUERY_GLOBAL_EVAL", astNode);
    }
    return undefined;
});
