import {
  BuiltInSemantics,
  defFactory,
  literalOuter,
  inferUrlTaintControl,
  Def,
  ObjectDef,
  interAnalyzer,
  taintManager,
  SinkType,
  SourceType,
} from "../index";
import { analyzeDomEventHandler } from "../browser/event";

function getObjectPropertyValueNode(objExpr: any, propName: string): any | undefined {
  if (!objExpr || objExpr.type !== "ObjectExpression") return undefined;

  for (const prop of objExpr.properties || []) {
    if (!prop || prop.type !== "Property") continue;

    const key = prop.key;
    if (!key) continue;

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
] as const;

/**
 * Event registration functions are an API boundary: their implementation
 * belongs to jQuery and is skipped, while the extension-supplied callback is
 * still analyzed with the same DOM-event model as addEventListener.
 */
const JQUERY_EVENT_METHODS = ["on", "one", "bind", "delegate"] as const;

/**
 * jQuery(selector)
 */
BuiltInSemantics.register("JQuery.fn", (args, callNode) => {
  const resDef = defFactory.createObjectDef(callNode);

  const selectorDef = args[0];
  const selectorValue = literalOuter(selectorDef);

  // bind element methods
  for (const { name, effect } of JQUERY_ELEMENT_METHODS) {
    const fn = defFactory.createBuiltInFunctionDef(callNode, effect);
    fn.semanticExec = BuiltInSemantics.get(effect);
    resDef.setProperty(name, fn);
  }

  for (const name of JQUERY_EVENT_METHODS) {
    const effect = `JQuery.fn.${name}`;
    const fn = defFactory.createBuiltInFunctionDef(callNode, effect);
    fn.semanticExec = BuiltInSemantics.get(effect);
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
function registerJQueryElementMethod(
  effect: string,
  sourceType: SourceType,
  sinkType: SinkType,
) {
  BuiltInSemantics.register(effect, (args, callNode, astNode, thisDef) => {
    if (!Def.isObjectDef(thisDef)) {
      return defFactory.createUnknownDef(callNode);
    }

    const selectorDef = thisDef.getProperty("selector");
    const selector = literalOuter(selectorDef);

    // ---------------- Getter ----------------
    if (args.length === 0 && selector) {
      const retDef = defFactory.createUnknownDef(callNode);

      if (selectorDef) {
        taintManager.createTaintSource(
          retDef,
          sourceType,
          astNode,
          false,
          selector,
        );
      }

      return retDef;
    }

    // ---------------- Setter ----------------
    const valueDef = args[0];

    if (selector && valueDef) {
      taintManager.checkSink(valueDef, sinkType, astNode, selector);
    }

    return thisDef;
  });
}

for (const { effect, source, sink } of JQUERY_ELEMENT_METHODS) {
  registerJQueryElementMethod(effect, source, sink);
}

function getJQueryEventNames(eventDef: Def | undefined): Array<string | null> {
  const rawName = literalOuter(eventDef);
  if (typeof rawName !== "string") return [null];

  // jQuery accepts space-separated event names and event namespaces such as
  // `click.audit`.  The namespace changes registration semantics but not the
  // payload shape of the underlying DOM event.
  const names = rawName
    .split(/\s+/)
    .map((name) => name.split(".")[0].toLowerCase())
    .filter(Boolean);

  return names.length > 0 ? Array.from(new Set(names)) : [null];
}

for (const method of JQUERY_EVENT_METHODS) {
  BuiltInSemantics.register(`JQuery.fn.${method}`, (args, callNode, astNode, thisDef) => {
    // All supported jQuery registration forms put the event name first except
    // delegate(selector, eventName, handler).  The handler is the final
    // argument for each form, including optional selector/data overloads.
    const eventDef = method === "delegate" ? args[1] : args[0];
    const callback = args[args.length - 1];

    for (const eventName of getJQueryEventNames(eventDef)) {
      analyzeDomEventHandler(eventName, callback, callNode, astNode, false);
    }

    // Event methods are chainable.  Returning the receiver preserves the
    // summary boundary without propagating jQuery's internal temporaries.
    return thisDef ?? defFactory.createUnknownDef(callNode);
  });
}

/**
 * ======================================================
 * ==================== Ajax Helpers ====================
 * ======================================================
 */

function checkAjaxSettings(
  settings: ObjectDef,
  astNode: any,
  urlTaintControl?: "FULL" | "PARTIAL",
) {
  const urlDef = settings.lookupProperty("url");
  const dataDef = settings.lookupProperty("data");

  if (urlDef) {
    taintManager.checkSink(
      urlDef,
      "JQUERY_SETTINGS_URL",
      astNode,
      undefined,
      urlTaintControl,
    );
  }

  if (dataDef) {
    taintManager.checkSink(dataDef, "JQUERY_SETTINGS_DATA", astNode);
  }

  return { urlDef, dataDef };
}

/**
 * ======================================================
 * ===================== JQuery.ajax ====================
 * ======================================================
 */

BuiltInSemantics.register("JQuery.ajax", (args, callNode, astNode) => {
  interAnalyzer.setCurrentSideEffects();

  if (args.length === 0) {
    return defFactory.createPromiseDef(callNode);
  }

  let urlDef: Def | null = null;
  let dataDef: Def | null = null;
  let successCallback: Def | undefined = undefined;

  const first = args[0];
  const firstArgNode = (astNode as any)?.arguments?.[0];
  const secondArgNode = (astNode as any)?.arguments?.[1];

  // $.ajax(settings)
  if (Def.isObjectDef(first)) {
    const settings = first as ObjectDef;
    const settingsUrlNode = getObjectPropertyValueNode(firstArgNode, "url");

    const result = checkAjaxSettings(
      settings,
      astNode,
      inferUrlTaintControl(settingsUrlNode),
    );
    urlDef = result.urlDef;
    dataDef = result.dataDef;

    successCallback =
      settings.lookupProperty("success") ??
      settings.lookupProperty("done") ??
      undefined;
  }

  // $.ajax(url, settings)
  else {
    urlDef = first;

    if (Def.isObjectDef(args[1])) {
      const settings = args[1] as ObjectDef;
      const settingsUrlNode = getObjectPropertyValueNode(secondArgNode, "url");

      const result = checkAjaxSettings(
        settings,
        astNode,
        inferUrlTaintControl(settingsUrlNode),
      );

      urlDef = result.urlDef ?? urlDef;
      dataDef = result.dataDef;

      successCallback =
        settings.lookupProperty("success") ??
        settings.lookupProperty("done") ??
        undefined;
    }
  }

  // URL sink
  if (urlDef) {
    let urlControl: "FULL" | "PARTIAL" = inferUrlTaintControl(firstArgNode);
    if (Def.isObjectDef(first)) {
      urlControl = inferUrlTaintControl(
        getObjectPropertyValueNode(firstArgNode, "url"),
      );
    } else if (Def.isObjectDef(args[1])) {
      const urlFromSettings = getObjectPropertyValueNode(secondArgNode, "url");
      urlControl = urlFromSettings
        ? inferUrlTaintControl(urlFromSettings)
        : inferUrlTaintControl(firstArgNode);
    }

    taintManager.checkSink(
      urlDef,
      "JQUERY_AJAX_URL",
      astNode,
      undefined,
      urlControl,
    );
  }

  // DATA sink
  if (dataDef) {
    const context =
      urlDef ? literalOuter(urlDef) ?? "[UNKNOWN URL]" : "[NO URL]";

    taintManager.checkSink(dataDef, "JQUERY_AJAX_DATA", astNode, context);
  }

  /**
   * Model response
   */
  const responseDef = defFactory.createUnknownDef(callNode);

  taintManager.createTaintSource(
    responseDef,
    "JQUERY_AJAX_RESPONSE",
    astNode,
    true,
  );

  // invoke success callback if present
  if (Def.isFunctionDef(successCallback)) {
    interAnalyzer.analyze(
      callNode,
      successCallback,
      [responseDef],
      null,
      astNode,
    );
  }

  return defFactory.createPromiseDef(callNode, responseDef);
});

/**
 * ======================================================
 * ===================== JQuery.get =====================
 * ======================================================
 */

BuiltInSemantics.register("JQuery.get", (args, callNode, astNode) => {
  interAnalyzer.setCurrentSideEffects();

  const [urlDef, dataDef] = args;
  const urlArgNode = (astNode as any)?.arguments?.[0];

  if (urlDef) {
    taintManager.checkSink(
      urlDef,
      "JQUERY_GET_URL",
      astNode,
      undefined,
      inferUrlTaintControl(urlArgNode),
    );
  }

  if (dataDef) {
    taintManager.checkSink(dataDef, "JQUERY_GET_DATA", astNode);
  }

  return defFactory.createPromiseDef(callNode);
});

/**
 * ======================================================
 * ===================== JQuery.post ====================
 * ======================================================
 */

BuiltInSemantics.register("JQuery.post", (args, callNode, astNode) => {
  interAnalyzer.setCurrentSideEffects();

  const [urlDef, dataDef] = args;
  const urlArgNode = (astNode as any)?.arguments?.[0];

  if (urlDef) {
    taintManager.checkSink(
      urlDef,
      "JQUERY_POST_URL",
      astNode,
      undefined,
      inferUrlTaintControl(urlArgNode),
    );
  }

  if (dataDef) {
    taintManager.checkSink(dataDef, "JQUERY_POST_DATA", astNode);
  }

  return defFactory.createPromiseDef(callNode);
});

/**
 * ======================================================
 * ================= JQuery.globalEval ==================
 * ======================================================
 */

BuiltInSemantics.register(
  "JQuery.globalEval",
  (args, _callNode, astNode) => {
    interAnalyzer.setCurrentSideEffects();

    const [codeDef] = args;

    if (codeDef) {
      taintManager.checkSink(codeDef, "JQUERY_GLOBAL_EVAL", astNode);
    }

    return undefined;
  },
);
