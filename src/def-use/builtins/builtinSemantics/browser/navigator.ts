import {
  BuiltInSemantics,
  DefFactory,
  defFactory,
  Def,
  interAnalyzer,
  taintManager,
} from "../index";

/**
 * ======================================================
 * =================== Navigator ========================
 * ======================================================
 */
// --------------------- navigator.geolocation.getCurrentPosition -------------------
BuiltInSemantics.register(
  "navigator.geolocation.getCurrentPosition",
  (args, callNode, astNode, _thisDef) => {
    interAnalyzer.setCurrentSideEffects(); // side effect

    const [successCallback] = args;
    const positionDef = defFactory.createUnknownDef(callNode);
    taintManager.createTaintSource(positionDef, "NAVIGAROR_GEOLOCATION", astNode);

    // Analyze the success callback
    if (Def.isFunctionDef(successCallback)) {
      interAnalyzer.analyze(callNode, successCallback, [positionDef], null, astNode);
    }

    return undefined;
  },
);

// --------------------- navigator.geolocation.watchPosition -------------------
BuiltInSemantics.register(
  "navigator.geolocation.watchPosition",
  (args, callNode, astNode, _thisDef) => {
    interAnalyzer.setCurrentSideEffects(); // side effect

    const [successCallback] = args;
    const positionDef = defFactory.createUnknownDef(callNode);
    taintManager.createTaintSource(positionDef, "NAVIGAROR_GEOLOCATION", astNode);

    // Analyze the success callback
    if (Def.isFunctionDef(successCallback)) {
      interAnalyzer.analyze(callNode, successCallback, [positionDef], null, astNode);
    }

    return undefined;
  },
);

// --------------------- navigator.clipboard.readText -------------------
BuiltInSemantics.register(
  "navigator.clipboard.readText",
  (_args, callNode, astNode, _thisDef) => {
    interAnalyzer.setCurrentSideEffects(); // side effect

    const resDef = defFactory.createUnknownDef(callNode);
    taintManager.createTaintSource(resDef, "NAVIGATOR_CLIPBOARD", astNode);
    return defFactory.createPromiseDef(callNode, resDef);
  },
);

// --------------------- navigator.clipboard.read -------------------
BuiltInSemantics.register(
  "navigator.clipboard.read",
  (_args, callNode, astNode, _thisDef) => {
    interAnalyzer.setCurrentSideEffects(); // side effect
    const textDef = defFactory.createUnknownDef(callNode);
    taintManager.createTaintSource(textDef, "NAVIGATOR_CLIPBOARD", astNode);

    const resDef = DefFactory.createArrayInstanceDef(callNode, astNode, [textDef]);
    return defFactory.createPromiseDef(callNode, resDef);
  },
);

// --------------------- navigator.gpu.requestAdapter -------------------
BuiltInSemantics.register(
  "navigator.gpu.requestAdapter",
  (_args, callNode, astNode, _thisDef) => {
    interAnalyzer.setCurrentSideEffects(); // side effect

    const resDef = defFactory.createObjectDef(callNode);
    taintManager.createTaintSource(resDef, "NAVIGATOR_GPU_ADAPTER", astNode);
    return defFactory.createPromiseDef(callNode, resDef);
  },
);
