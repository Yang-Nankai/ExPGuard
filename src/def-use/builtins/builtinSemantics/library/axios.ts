import {
  BuiltInSemantics,
  defFactory,
  Def,
  ObjectDef,
  inferUrlTaintControl,
  interAnalyzer,
  taintManager,
  SinkType,
  Node,
} from "../index";

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
 * Check structured sinks (object / form data / headers).
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
 * Inspect axios config object
 *
 * axios({
 *   url,
 *   data,
 *   headers
 * })
 */
function checkAxiosConfig(
  configDef: ObjectDef,
  astNode: Node,
  urlTaintControl?: "FULL" | "PARTIAL",
) {
  const urlDef = configDef.lookupProperty("url");
  const dataDef = configDef.lookupProperty("data");
  const headersDef = configDef.lookupProperty("headers");

  if (urlDef) {
    taintManager.checkSink(
      urlDef,
      "AXIOS_URL",
      astNode,
      undefined,
      urlTaintControl,
    );
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
BuiltInSemantics.register("axios.get", (args, callNode, astNode) => {
  interAnalyzer.setCurrentSideEffects();

  const [urlDef, configDef] = args;
  const urlArgNode = (astNode as any)?.arguments?.[0];
  const configUrlArgNode = getObjectPropertyValueNode(
    (astNode as any)?.arguments?.[1],
    "url",
  );

  if (urlDef) {
    taintManager.checkSink(
      urlDef,
      "AXIOS_URL",
      astNode,
      undefined,
      inferUrlTaintControl(urlArgNode),
    );
  }

  if (configDef && Def.isObjectDef(configDef)) {
    checkAxiosConfig(configDef, astNode, inferUrlTaintControl(configUrlArgNode));
  }

  // Create response taint
  const responseDef = defFactory.createUnknownDef(callNode);
  taintManager.createTaintSource(
    responseDef,
    "AXIOS_GET_RESPONSE",
    astNode,
    true,
  );

  return defFactory.createPromiseDef(callNode, responseDef);
});

// --------------------- axios.post -------------------
BuiltInSemantics.register("axios.post", (args, callNode, astNode) => {
  interAnalyzer.setCurrentSideEffects();

  const [urlDef, dataDef, configDef] = args;
  const urlArgNode = (astNode as any)?.arguments?.[0];
  const configUrlArgNode = getObjectPropertyValueNode(
    (astNode as any)?.arguments?.[2],
    "url",
  );

  if (urlDef) {
    taintManager.checkSink(
      urlDef,
      "AXIOS_URL",
      astNode,
      undefined,
      inferUrlTaintControl(urlArgNode),
    );
  }

  if (dataDef) {
    checkStructuredSink(dataDef, "AXIOS_DATA", astNode);
  }

  if (configDef && Def.isObjectDef(configDef)) {
    checkAxiosConfig(configDef, astNode, inferUrlTaintControl(configUrlArgNode));
  }

  // Create response taint
  const responseDef = defFactory.createUnknownDef(callNode);
  taintManager.createTaintSource(
    responseDef,
    "AXIOS_POST_RESPONSE",
    astNode,
    true,
  );

  return defFactory.createPromiseDef(callNode, responseDef);
});

// --------------------- axios.request -------------------
BuiltInSemantics.register("axios.request", (args, callNode, astNode) => {
  interAnalyzer.setCurrentSideEffects();

  const [configDef] = args;
  const configArgNode = (astNode as any)?.arguments?.[0];
  const urlArgNode = getObjectPropertyValueNode(configArgNode, "url");

  if (configDef && Def.isObjectDef(configDef)) {
    checkAxiosConfig(configDef, astNode, inferUrlTaintControl(urlArgNode));
  }

  const responseDef = defFactory.createUnknownDef(callNode);
  taintManager.createTaintSource(responseDef, "AXIOS_REQUEST_RESPONSE", astNode, true);

  return defFactory.createPromiseDef(callNode, responseDef);
});

// --------------------- axios(...) -------------------
BuiltInSemantics.register("axios.fn", (args, callNode, astNode) => {
  interAnalyzer.setCurrentSideEffects();

  const [configDef] = args;
  const configArgNode = (astNode as any)?.arguments?.[0];
  const urlArgNode = getObjectPropertyValueNode(configArgNode, "url");

  if (configDef && Def.isObjectDef(configDef)) {
    checkAxiosConfig(configDef, astNode, inferUrlTaintControl(urlArgNode));
  }

  const responseDef = defFactory.createUnknownDef(callNode);
  taintManager.createTaintSource(
    responseDef,
    "AXIOS_RESPONSE",
    astNode,
    true
  );

  return defFactory.createPromiseDef(callNode, responseDef);
});

// --------------------- axios.create -------------------
BuiltInSemantics.register("axios.create", (args, callNode) => {
  const axiosInstance = defFactory.createObjectDef(callNode);

  const methods = ["request", "get", "post"];

  for (const method of methods) {
    const methodFunc = defFactory.createBuiltInFunctionDef(
      callNode,
      `axios.${method}`,
    );

    methodFunc.semanticExec = BuiltInSemantics.get(`axios.${method}`);

    axiosInstance.setProperty(method, methodFunc);
  }

  return axiosInstance;
});
