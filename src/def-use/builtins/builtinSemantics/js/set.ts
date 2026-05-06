import {
  BuiltInSemantics,
  defFactory,
  Def,
  ObjectDef,
  interAnalyzer,
} from "../index";

// --------------------- Set.prototype.constructor-------------------
BuiltInSemantics.register(
  "Set.prototype.constructor",
  (args, callNode, _astNode, thisDef) => {
    const [arrayLike] = args;
    const newObj = Def.isObjectDef(thisDef)
      ? thisDef
      : defFactory.createObjectDef(callNode);

    // If first argument is array-like, add all elements to set
    if (Def.isObjectDef(arrayLike)) {
      for (const [, value] of arrayLike.props) {
        newObj.setProperty(newObj.propsLength, value);
      }
    }

    return newObj;
  },
);

// --------------------- Set.prototype.add-------------------
BuiltInSemantics.register(
  "Set.prototype.add",
  (args, _callNode, _astNode, thisDef) => {
    if (!Def.isObjectDef(thisDef) || args.length < 1) return thisDef;
    const [value] = args;

    thisDef.setProperty(thisDef.propsLength, value);
    return thisDef;
  },
);

// --------------------- Set.prototype.clear-------------------
BuiltInSemantics.register(
  "Set.prototype.clear",
  (_args, _callNode, _astNode, thisDef) => {
    if (!Def.isObjectDef(thisDef)) return undefined;

    const setObj = thisDef as ObjectDef;
    setObj.props.clear();

    return undefined;
  },
);

// --------------------- Set.prototype.union-------------------
BuiltInSemantics.register(
  "Set.prototype.union",
  (args, _callNode, _astNode, thisDef) => {
    if (!Def.isObjectDef(thisDef) || args.length < 1) return thisDef;
    const [otherSet] = args;

    if (Def.isObjectDef(otherSet)) {
      for (const [, value] of otherSet.props) {
        thisDef.setProperty(thisDef.propsLength, value);
      }
    }

    return thisDef;
  },
);

// --------------------- Set.prototype.forEach-------------------
BuiltInSemantics.register(
  "Set.prototype.forEach",
  (args, callNode, astNode, thisDef) => {
    const [callbackFunc] = args;

    if (!Def.isFunctionDef(callbackFunc) || !Def.isObjectDef(thisDef)) {
      return undefined;
    }

    const element = defFactory.createImplicitDef(callNode, thisDef.values);

    // Track callback invocation with element
    interAnalyzer.analyze(callNode, callbackFunc, [element], null, astNode);

    return undefined;
  },
);
