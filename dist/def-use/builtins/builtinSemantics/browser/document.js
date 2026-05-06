"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
/**
 * ======================================================
 * ==================== Location ========================
 * ======================================================
 */
// --------------------- location.toString -------------------
index_1.BuiltInSemantics.register("location.toString", (_args, callNode, astNode) => {
    const resDef = index_1.defFactory.createUnknownDef(callNode);
    index_1.taintManager.createTaintSource(resDef, "DOCUMENT_LOCATION", astNode);
    return resDef;
});
/**
 * ======================================================
 * ===================== Document =======================
 * ======================================================
 */
const ELEMENT_PROPERTIES = [
    {
        name: "textContent",
        source: "ELEMENT_TEXT_CONTENT",
    },
    {
        name: "innerHTML",
        source: "ELEMENT_INNER_HTML",
        sink: "DOCUMENT_HTML_SET",
    },
    {
        name: "outerHTML",
        source: "ELEMENT_OUTER_HTML",
    },
    {
        name: "value",
        source: "ELEMENT_VALUE",
    },
];
/**
 * Create a modeled DOM element object
 */
function createElementDef(callNode, astNode, selector) {
    const elementDef = index_1.defFactory.createObjectDef(callNode);
    // addEventListener
    const listener = index_1.defFactory.createBuiltInFunctionDef(callNode, "target.addEventListener");
    listener.semanticExec = index_1.BuiltInSemantics.get("target.addEventListener");
    elementDef.setProperty("addEventListener", listener);
    for (const { name, source } of ELEMENT_PROPERTIES) {
        const propDef = index_1.defFactory.createUnknownDef(callNode);
        elementDef.setProperty(name, propDef);
        index_1.taintManager.createTaintSource(propDef, source, astNode, false, selector);
    }
    return elementDef;
}
// --------------------- document.getElementById -------------------
index_1.BuiltInSemantics.register("document.getElementById", (args, callNode, astNode) => {
    index_1.interAnalyzer.setCurrentSideEffects();
    const id = (0, index_1.literalOuter)(args[0]);
    return createElementDef(callNode, astNode, id);
});
// --------------------- document.querySelector -------------------
index_1.BuiltInSemantics.register("document.querySelector", (args, callNode, astNode) => {
    index_1.interAnalyzer.setCurrentSideEffects();
    const selector = (0, index_1.literalOuter)(args[0]);
    return createElementDef(callNode, astNode, selector);
});
/**
 * ======================================================
 * ================= Document.write =====================
 * ======================================================
 */
index_1.BuiltInSemantics.register("document.write", (args, _callNode, astNode) => {
    index_1.interAnalyzer.setCurrentSideEffects();
    const [contentDef] = args;
    if (contentDef) {
        index_1.taintManager.checkSink(contentDef, "DOCUMENT_WRITE", astNode);
    }
    return undefined;
});
/**
 * ======================================================
 * ================= document.execCommand ===============
 * ======================================================
 */
index_1.BuiltInSemantics.register("document.execCommand", (args, _callNode, astNode) => {
    index_1.interAnalyzer.setCurrentSideEffects();
    const [, , valueDef] = args;
    if (valueDef) {
        index_1.taintManager.checkSink(valueDef, "DOCUMENT_EXECCOMMAND", astNode);
    }
    return undefined;
});
