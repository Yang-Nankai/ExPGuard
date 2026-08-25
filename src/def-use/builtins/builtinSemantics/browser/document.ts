import {
  BuiltInSemantics,
  DefFactory,
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
 * Create a modeled DOM element object.
 *
 * Exported so event modeling can reuse it for `event.target` — an event's
 * target is a page-controlled element and must expose the same
 * `ELEMENT_VALUE` / `ELEMENT_INNER_HTML` sources as an element obtained via
 * `document.getElementById`.
 */
export function createElementDef(callNode: any, astNode: any, selector?: string) {
  const elementDef = defFactory.createObjectDef(callNode);

  /** Bind a registered semantic onto the element as a callable property. */
  const attachMethod = (propName: string, effect: string) => {
    const fn = defFactory.createBuiltInFunctionDef(callNode, effect);
    fn.semanticExec = BuiltInSemantics.get(effect);
    elementDef.setProperty(propName, fn);
  };

  attachMethod("addEventListener", "target.addEventListener");

  // DOM traversal from an element. Handler code almost never starts from
  // `document` — it starts from `event.target` and walks:
  //   const form = passwordField.closest("form");
  //   const user = form.querySelector('input[type="email"]');
  // Without these the walk dead-ends and the field values downstream are never
  // recognised as `ELEMENT_VALUE` sources. Each returns a *fresh* element def,
  // built lazily at call time, so there is no eager recursion.
  attachMethod("querySelector", "document.querySelector");
  attachMethod("closest", "document.querySelector");
  attachMethod("querySelectorAll", "document.querySelectorAll");
  attachMethod("getElementsByTagName", "document.querySelectorAll");
  attachMethod("getElementsByClassName", "document.querySelectorAll");

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

// --------------------- document.querySelectorAll -------------------
// Also backs getElementsByClassName / getElementsByTagName / getElementsByName.
//
// Returns a one-element array whose single member is a *summary* element
// standing for every node the selector matches. That is what makes the
// ubiquitous registration idiom analyzable:
//
//   document.querySelectorAll("input").forEach(el =>
//     el.addEventListener("input", () => send(el.value)));
//
// Without it the collection is opaque, `.forEach` never fires, and neither the
// listener nor anything it reaches is ever analyzed.
BuiltInSemantics.register(
  "document.querySelectorAll",
  (args, callNode, astNode) => {
    interAnalyzer.setCurrentSideEffects();

    const selector = literalOuter(args[0]);
    const summaryElement = createElementDef(callNode, astNode, selector);

    return DefFactory.createArrayInstanceDef(callNode, astNode, [
      summaryElement,
    ]);
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
