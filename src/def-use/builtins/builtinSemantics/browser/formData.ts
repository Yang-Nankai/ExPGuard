import {
  BuiltInSemantics,
  DefFactory,
  defFactory,
  literalOuter,
  Def,
  taintManager,
} from "../index";

// --------------------- FormData.prototype.constructor -------------------
BuiltInSemantics.register(
  "FormData.prototype.constructor",
  (args, callNode, _astNode, thisDef) => {
    const fdObj = Def.isObjectDef(thisDef)
      ? thisDef
      : defFactory.createObjectDef(callNode);
    const [formArg] = args;

    // new FormData(formElement)
    // Conservative: treat form as taint source container
    if (formArg) {
      fdObj.setProperty(fdObj.propsLength, formArg);
    }

    return fdObj;
  },
);

// --------------------- FormData.prototype.append -------------------
BuiltInSemantics.register(
  "FormData.prototype.append",
  (args, _callNode, _astNode, thisDef) => {
    if (!Def.isObjectDef(thisDef) || args.length < 2) return undefined;
    const [nameDef, valueDef] = args;
    const name = literalOuter(nameDef);

    thisDef.setProperty(name ?? thisDef.propsLength, valueDef);
    return thisDef;
  },
);

// --------------------- FormData.prototype.set -------------------
BuiltInSemantics.register(
  "FormData.prototype.set",
  (args, _callNode, _astNode, thisDef) => {
    if (!Def.isObjectDef(thisDef) || args.length < 2) return undefined;
    const [nameDef, valueDef] = args;
    const name = literalOuter(nameDef);

    thisDef.setProperty(name ?? thisDef.propsLength, valueDef);
    return thisDef;
  },
);

// --------------------- FormData.prototype.get -------------------
BuiltInSemantics.register(
  "FormData.prototype.get",
  (args, callNode, astNode, thisDef) => {
    let value: Def = defFactory.createUnknownDef(callNode);
    if (!Def.isObjectDef(thisDef) || args.length < 1) return value;
    const [nameDef] = args;
    const name = literalOuter(nameDef);

    if (name) {
      value = thisDef.lookupProperty(name) ?? value;
    }

    // taint Propagation: get result should be taint
    taintManager.propagateTaint(thisDef, value, astNode, "RETURN", "formdata.get");

    return value;
  },
);

// --------------------- FormData.prototype.getAll -------------------
BuiltInSemantics.register(
  "FormData.prototype.getAll",
  (args, callNode, astNode, thisDef) => {
    let value: Def = defFactory.createUnknownDef(callNode);
    if (Def.isObjectDef(thisDef) && args.length > 0) {
      const [nameDef] = args;
      const name = literalOuter(nameDef);

      if (name) {
        value = thisDef.lookupProperty(name) ?? value;
      }
    }

    const values = DefFactory.createArrayInstanceDef(callNode, astNode, [
      value,
    ]);
    // taint Propagation: getAll result should be taint
    taintManager.propagateTaint(thisDef, values, astNode, "RETURN", "formdata.getAll");

    return values;
  },
);
