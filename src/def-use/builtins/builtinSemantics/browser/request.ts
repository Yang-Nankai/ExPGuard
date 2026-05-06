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
  if (initDef) {
    taintManager.checkSink(initDef, "FETCH_OPTIONS", astNode, url);
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