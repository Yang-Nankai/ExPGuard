import {
  BuiltInSemantics,
  defFactory,
  literalOuter,
  inferUrlTaintControl,
  Def,
  interAnalyzer,
  taintManager,
  SinkType,
  Node,
} from "../index";


/**
 * Check structured data sinks.
 *
 * Supports objects such as:
 *  - FormData
 *  - URLSearchParams
 *  - Headers
 *  - Plain objects
 */
function checkStructuredSink(
  valueDef: Def | undefined,
  sinkTag: SinkType,
  astNode: Node,
  remark?: string,
) {
  if (!valueDef) return;

  // Direct taint
  if (valueDef.isTainted) {
    taintManager.checkSink(valueDef, sinkTag, astNode, remark);
    return;
  }

  // Traverse object properties
  if (Def.isObjectDef(valueDef)) {
    for (const [, value] of valueDef.props) {
      taintManager.checkSink(value, sinkTag, astNode, remark);
    }
  }
}


/**
 * ======================================================
 * ======================= fetch ========================
 * ======================================================
 */
BuiltInSemantics.register("fetch", (args, callNode, astNode) => {
  // Network request → side-effect
  interAnalyzer.setCurrentSideEffects();

  const [urlDef, initDef] = args;
  const urlArgNode = (astNode as any)?.arguments?.[0];
  const url = literalOuter(urlDef) ?? "[Unknown URL]";

  // fetch(url)
  if (urlDef) {
    taintManager.checkSink(
      urlDef,
      "FETCH_RESOURCE",
      astNode,
      url,
      inferUrlTaintControl(urlArgNode),
    );
  }

  // fetch(url, init)
  //
  // Split the init object so a tainted *body* (exfiltration) is reported
  // separately from a tainted *header* (often benign auth — a cookie sent as
  // the Cookie header). The rule engine suppresses SENSITIVE_DATA → headers
  // for DATA_LEAK while still flagging body/URL leaks.
  if (initDef) {
    if (Def.isObjectDef(initDef)) {
      const headersDef = initDef.lookupProperty("headers");
      if (headersDef) {
        checkStructuredSink(headersDef, "FETCH_HEADERS", astNode, url);
      }
      for (const [key, value] of initDef.props) {
        if (key === "headers") continue;
        checkStructuredSink(value, "FETCH_BODY", astNode, url);
      }
    } else {
      // init isn't a literal object we can introspect — fall back to the
      // coarse single-sink behavior.
      taintManager.checkSink(initDef, "FETCH_OPTIONS", astNode, url);
    }
  }

  // Create response taint
  const responseDef = defFactory.createUnknownDef(callNode);
  taintManager.createTaintSource(
    responseDef,
    "FETCH_RESPONSE",
    astNode,
    true
  );

  // If caller passes a .then callback, propagate taint
  // This is a simplified model: we don't inspect actual promise chains
  return defFactory.createPromiseDef(callNode, responseDef);
});


/**
 * ======================================================
 * ===================== WebSocket ======================
 * ======================================================
 */

// --------------------- WebSocket constructor -------------------
BuiltInSemantics.register(
  "WebSocket.prototype.constructor",
  (args, callNode, astNode) => {
    const [urlDef] = args;
    const urlArgNode = (astNode as any)?.arguments?.[0];

    if (urlDef) {
      taintManager.checkSink(
        urlDef,
        "WEBSOCKET_URL",
        astNode,
        undefined,
        inferUrlTaintControl(urlArgNode),
      );
    }

    // returns WebSocket object
    return defFactory.createObjectDef(callNode);
  },
);

// --------------------- WebSocket.prototype.send -------------------
BuiltInSemantics.register(
  "WebSocket.prototype.send",
  (args, _callNode, astNode, _thisDef) => {
    const [bodyDef] = args;
    checkStructuredSink(bodyDef, "WEBSOCKET_DATA", astNode);
    return undefined;
  },
);

/**
 * ======================================================
 * ================= XMLHttpRequest =====================
 * ======================================================
 */

// --------------------- XMLHttpRequest.prototype.open -------------------
BuiltInSemantics.register(
  "XMLHttpRequest.prototype.open",
  (args, _callNode, astNode) => {
    interAnalyzer.setCurrentSideEffects();

    // xhr.open(method, url)
    const [, urlDef] = args;
    const urlArgNode = (astNode as any)?.arguments?.[1];

    if (urlDef) {
      taintManager.checkSink(
        urlDef,
        "XML_HTTP_REQUEST_OPEN",
        astNode,
        undefined,
        inferUrlTaintControl(urlArgNode),
      );
    }

    return undefined;
  },
);


// --------------------- XMLHttpRequest.prototype.setRequestHeader -------------------
BuiltInSemantics.register(
  "XMLHttpRequest.prototype.setRequestHeader",
  (args, _callNode, astNode) => {
    // xhr.setRequestHeader(name, value) — value is the header content.
    const [, valueDef] = args;

    if (valueDef) {
      taintManager.checkSink(valueDef, "XML_HTTP_REQUEST_SETHEADER", astNode);
    }

    return undefined;
  },
);


// --------------------- XMLHttpRequest.prototype.send -------------------
BuiltInSemantics.register(
  "XMLHttpRequest.prototype.send",
  (args, callNode, astNode) => {
    const [bodyDef] = args;

    checkStructuredSink(bodyDef, "XML_HTTP_REQUEST_SEND", astNode);

    // Create response taint
    const responseDef = defFactory.createUnknownDef(callNode);
    taintManager.createTaintSource(
      responseDef,
      "XML_HTTP_RESPONSE",
      astNode,
      true
    );

    // If xhr.onload is defined, propagate response taint
    // Here we just model the response object; actual callback analysis is interAnalyzer responsibility

    return responseDef; // return as placeholder, similar to JQUERY_AJAX_RESPONSE
  }
);