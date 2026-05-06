import {
  BuiltInSemantics,
  DefFactory,
  defFactory,
  taintManager
} from "../index";

/**
 * ======================================================
 * String.fromCharCode(...codes)
 * ======================================================
 */
BuiltInSemantics.register(
  "String.fromCharCode",
  (args, callNode, astNode) => {
    const resDef = defFactory.createUnknownDef(callNode);

    // Taint Propagation
    for (const arg of args) {
      taintManager.propagateTaint(arg, resDef, astNode, "RETURN", "string.fromCharCode");
    }

    return resDef;
  },
);


/**
 * ======================================================
 * String.prototype.concat(...strings)
 * ======================================================
 */
BuiltInSemantics.register(
  "String.prototype.concat",
  (args, callNode, astNode, thisDef) => {
    if (!thisDef) return defFactory.createUnknownDef(callNode);

    // Taint Propagation
    for (const arg of args) {
      taintManager.propagateTaint(arg, thisDef, astNode, "RETURN", "string.concat");
    }

    return thisDef;
  },
);


/**
 * ======================================================
 * String.prototype.normalize(form?)
 * ======================================================
 */
BuiltInSemantics.register(
  "String.prototype.normalize",
  (_args, _callNode, _astNode, thisDef) => {
    // Simplified: just return original string
    return thisDef;
  },
);


/**
 * ======================================================
 * String.prototype.repeat(count)
 * ======================================================
 */
BuiltInSemantics.register(
  "String.prototype.repeat",
  (_args, _callNode, _astNode, thisDef) => {
    // Simplified: just return original string
    return thisDef;
  },
);


/**
 * ======================================================
 * String.prototype.replace(searchValue, replaceValue)
 * ======================================================
 */
BuiltInSemantics.register(
  "String.prototype.replace",
  (args, _callNode, astNode, thisDef) => {
    const [pattern, replacement] = args;
    taintManager.propagateTaint(replacement, thisDef, astNode, "MUTATE", "string.replace");
    return thisDef;
  },
);


/**
 * ======================================================
 * String.prototype.replaceAll(searchValue, replaceValue)
 * ======================================================
 */
BuiltInSemantics.register(
  "String.prototype.replaceAll",
  (args, _callNode, astNode, thisDef) => {
    const [pattern, replacement] = args;
    taintManager.propagateTaint(replacement, thisDef, astNode, "MUTATE", "string.replace");
    return thisDef;
  },
);


/**
 * ======================================================
 * String.prototype.slice(start?, end?)
 * ======================================================
 */
BuiltInSemantics.register(
  "String.prototype.slice",
  (_args, _callNode, _astNode, thisDef) => {
    // Simplified: just return original string
    return thisDef;
  },
);


/**
 * ======================================================
 * String.prototype.split(separator?, limit?)
 * ======================================================
 */
BuiltInSemantics.register(
  "String.prototype.split",
  (_args, callNode, astNode, thisDef) => {
    const element = defFactory.createUnknownDef(callNode);

    // Taint Propagation
    taintManager.propagateTaint(thisDef, element, astNode, "ELEMENT", "string.split");

    return DefFactory.createArrayInstanceDef(callNode, astNode, [element]);
  },
);


/**
 * ======================================================
 * String.prototype.substring(start, end?)
 * ======================================================
 */
BuiltInSemantics.register(
  "String.prototype.substring",
  (_args, _callNode, _astNode, thisDef) => {
    // Simplified: just return original string
    return thisDef;
  },
);


/**
 * ======================================================
 * String.prototype.trim()
 * ======================================================
 */
BuiltInSemantics.register(
  "String.prototype.trim",
  (_args, _callNode, _astNode, thisDef) => {
    // Simplified: just return original string
    return thisDef;
  },
);


/**
 * ======================================================
 * String.prototype.trimEnd()
 * ======================================================
 */
BuiltInSemantics.register(
  "String.prototype.trimEnd",
  (_args, _callNode, _astNode, thisDef) => {
    // Simplified: just return original string
    return thisDef;
  },
);


/**
 * ======================================================
 * String.prototype.trimStart()
 * ======================================================
 */
BuiltInSemantics.register(
  "String.prototype.trimStart",
  (_args, _callNode, _astNode, thisDef) => {
    // Simplified: just return original string
    return thisDef;
  },
);