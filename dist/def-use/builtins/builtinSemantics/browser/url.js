"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
/**
 * ======================================================
 * URL.prototype.constructor(href)
 * ======================================================
 */
index_1.BuiltInSemantics.register("URL.prototype.constructor", (args, callNode, astNode, thisDef) => {
    const [href] = args;
    const urlObj = index_1.Def.isObjectDef(thisDef)
        ? thisDef
        : index_1.defFactory.createObjectDef(callNode);
    if (href) {
        urlObj.setProperty("href", href);
        // href → url
        index_1.taintManager.propagateTaint(href, urlObj, astNode, "INITIAL", "URL.constructor");
    }
    // create searchParams
    const searchParams = index_1.DefFactory.createURLSearchParamsInstanceDef(callNode, astNode, []);
    // two-way binding
    searchParams.__urlOwner = urlObj;
    urlObj.setProperty("searchParams", searchParams);
    return urlObj;
});
/**
 * ======================================================
 * URLSearchParams.prototype.constructor()
 * ======================================================
 */
index_1.BuiltInSemantics.register("URLSearchParams.prototype.constructor", (_args, _callNode, _astNode, thisDef) => {
    return thisDef;
});
/**
 * ======================================================
 * URLSearchParams.prototype.append(name, value)
 * ======================================================
 */
index_1.BuiltInSemantics.register("URLSearchParams.prototype.append", (args, _callNode, astNode, thisDef) => {
    const [, value] = args;
    if (!thisDef || !value)
        return undefined;
    // value → searchParams
    index_1.taintManager.propagateTaint(value, thisDef, astNode, "RETURN", "URLSearchParams.append");
    // searchParams → URL
    const owner = thisDef.__urlOwner;
    if (owner) {
        index_1.taintManager.propagateTaint(thisDef, owner, astNode, "MUTATE", "URLSearchParams.append->URL");
        const href = owner.lookupProperty("href");
        if (href) {
            index_1.taintManager.propagateTaint(thisDef, href, astNode, "MUTATE", "URL.searchParams->href");
        }
    }
    return undefined;
});
/**
 * ======================================================
 * URLSearchParams.prototype.toString()
 * ======================================================
 */
index_1.BuiltInSemantics.register("URLSearchParams.prototype.toString", (_args, callNode, astNode, thisDef) => {
    const str = index_1.defFactory.createUnknownDef(callNode);
    index_1.taintManager.propagateTaint(thisDef, str, astNode, "RETURN", "URLSearchParams.toString");
    return str;
});
