import {
  BuiltInSemantics,
  DefFactory,
  defFactory,
  Def,
  taintManager,
} from "../index";


// --------------------- Blob.prototype.constructor -------------------
BuiltInSemantics.register(
  "Blob.prototype.constructor",
  (args, callNode, _astNode, thisDef) => {
    const newObj = Def.isObjectDef(thisDef)
      ? thisDef
      : defFactory.createObjectDef(callNode);
    const [parts] = args;

    // new Blob(parts)
    if (Def.isObjectDef(parts)) {
      for (const [, value] of parts.props) {
        newObj.setProperty(newObj.propsLength, value);
      }
    }

    return newObj;
  },
);

// --------------------- Blob.prototype.slice -------------------
BuiltInSemantics.register(
  "Blob.prototype.slice",
  (_args, _callNode, _astNode, thisDef) => {
    // Simplified: just return original string
    return thisDef;
  },
);

// --------------------- Blob.prototype.arrayBuffer -------------------
BuiltInSemantics.register(
  "Blob.prototype.arrayBuffer",
  (_args, callNode, astNode, thisDef) => {
    if (!Def.isObjectDef(thisDef)) return undefined;
    const bufferObj = DefFactory.createArrayInstanceDef(callNode, astNode, []);

    for (const [, value] of thisDef.props) {
      bufferObj.setProperty(bufferObj.propsLength, value);
    }

    return bufferObj;
  },
);

// --------------------- Blob.prototype.text -------------------
BuiltInSemantics.register(
  "Blob.prototype.text",
  (_args, callNode, astNode, thisDef) => {
    if (!Def.isObjectDef(thisDef)) return undefined;
    const strObj = defFactory.createUnknownDef(callNode);

    // Taint Propagation: the result should be taint
    taintManager.propagateTaint(thisDef, strObj, astNode, "RETURN", "blob.text");

    return strObj;
  },
);

// --------------------- Blob.prototype.stream -------------------
BuiltInSemantics.register(
  "Blob.prototype.stream",
  (_args, _callNode, _astNode, thisDef) => {
    // Simplified: just return original string
    return thisDef;
  },
);

// --------------------- Blob.prototype.bytes -------------------
BuiltInSemantics.register(
  "Blob.prototype.bytes",
  (_args, _callNode, _astNode, thisDef) => {
    // Simplified: just return original string
    return thisDef;
  },
);