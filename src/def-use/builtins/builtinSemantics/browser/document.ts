import {
  BuiltInSemantics,
  defFactory,
  literalOuter,
  interAnalyzer,
  taintManager,
} from "../index";

/**
 * ======================================================
 * ==================== Location ========================
 * ======================================================
 */

// --------------------- location.toString -------------------
BuiltInSemantics.register("location.toString", (_args, callNode, astNode) => {
  const resDef = defFactory.createUnknownDef(callNode);

  taintManager.createTaintSource(resDef, "DOCUMENT_LOCATION", astNode);

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
] as const;

/**
 * Create a modeled DOM element object
 */
function createElementDef(callNode: any, astNode: any, selector?: string) {
  const elementDef = defFactory.createObjectDef(callNode);

  // addEventListener
  const listener = defFactory.createBuiltInFunctionDef(
    callNode,
    "target.addEventListener"
  );
  listener.semanticExec = BuiltInSemantics.get("target.addEventListener");
  elementDef.setProperty("addEventListener", listener);

  for (const { name, source } of ELEMENT_PROPERTIES) {
    const propDef = defFactory.createUnknownDef(callNode);

    elementDef.setProperty(name, propDef);

    taintManager.createTaintSource(propDef, source, astNode, false, selector);
  }

  return elementDef;
}

// --------------------- document.getElementById -------------------
BuiltInSemantics.register(
  "document.getElementById",
  (args, callNode, astNode) => {
    interAnalyzer.setCurrentSideEffects();

    const id = literalOuter(args[0]);

    return createElementDef(callNode, astNode, id);
  },
);

// --------------------- document.querySelector -------------------
BuiltInSemantics.register(
  "document.querySelector",
  (args, callNode, astNode) => {
    interAnalyzer.setCurrentSideEffects();

    const selector = literalOuter(args[0]);

    return createElementDef(callNode, astNode, selector);
  },
);

/**
 * ======================================================
 * ================= Document.write =====================
 * ======================================================
 */

BuiltInSemantics.register("document.write", (args, _callNode, astNode) => {
  interAnalyzer.setCurrentSideEffects();

  const [contentDef] = args;

  if (contentDef) {
    taintManager.checkSink(contentDef, "DOCUMENT_WRITE", astNode);
  }

  return undefined;
});

/**
 * ======================================================
 * ================= document.execCommand ===============
 * ======================================================
 */

BuiltInSemantics.register(
  "document.execCommand",
  (args, _callNode, astNode) => {
    interAnalyzer.setCurrentSideEffects();

    const [, , valueDef] = args;

    if (valueDef) {
      taintManager.checkSink(valueDef, "DOCUMENT_EXECCOMMAND", astNode);
    }

    return undefined;
  },
);
