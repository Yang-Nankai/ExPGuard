import {
  BuiltInSemantics,
  defFactory,
  Def,
  interAnalyzer,
  taintManager
} from "../index";

/**
 * ======================================================
 * Function constructor: new Function(...args, body)
 * ======================================================
 */
BuiltInSemantics.register(
  "Function",
  (args, _callNode, astNode, _thisDef) => {
    // new Function(arg1, arg2, ..., body)
    // The last argument is the function body (code to execute)
    if (args.length > 0) {
      const bodyDef = args[args.length - 1];
      taintManager.checkSink(bodyDef, "NEW_FUNCTION", astNode);
    }
    return undefined;
  },
);

/**
 * ======================================================
 * Function.prototype.constructor(code)
 * ======================================================
 */
BuiltInSemantics.register(
  "Function.prototype.constructor",
  (args, _callNode, astNode, _thisDef) => {
    // NOTE: Creating new Function dynamically is unsafe
    if (args.length > 0) {
      const bodyDef = args[args.length - 1];
      taintManager.checkSink(bodyDef, "NEW_FUNCTION", astNode);
    }
    return undefined;
  },
);

/**
 * ======================================================
 * Function.prototype.call(thisArg, ...args)
 * ======================================================
 */
BuiltInSemantics.register(
  "Function.prototype.call",
  (args, callNode, astNode, thisDef) => {
    const [thisArg] = args;
    if (
      !Def.isFunctionDef(thisDef) ||
      !Def.isObjectDef(thisArg) ||
      args.length < 1
    )
      return undefined;

    // Execute function with remaining arguments
    return interAnalyzer.analyze(callNode, thisDef, args.slice(1), thisArg, astNode);
  },
);

/**
 * ======================================================
 * Function.prototype.apply(thisArg, argsArray)
 * ======================================================
 */
BuiltInSemantics.register(
  "Function.prototype.apply",
  (args, callNode, astNode, thisDef) => {
    const [thisArg, arrayLike] = args;
    if (
      !Def.isFunctionDef(thisDef) ||
      !Def.isObjectDef(thisArg) ||
      args.length < 2
    )
      return undefined;

    const argsDef: Def[] = [];

    // apply(thisArg, arrayLike)
    if (Def.isObjectDef(arrayLike)) {
      for (const prop of arrayLike.props.values()) {
        argsDef.push(prop);
      }
    }

    return interAnalyzer.analyze(callNode, thisDef, argsDef, thisArg, astNode);
  },
);

/**
 * ======================================================
 * Function.prototype.bind(thisArg, ...args)
 * ======================================================
 */
BuiltInSemantics.register(
  "Function.prototype.bind",
  (args, callNode, _astNode, thisDef) => {
    const [thisArg] = args;
    if (!Def.isFunctionDef(thisDef) || args.length < 1) return undefined;

    // Create a new function def that wraps the original
    const boundFuncDef = defFactory.createFunctionDef(
      callNode,
      thisDef.functionNode,
    );

    // Attach hidden thisArg for later CallExpression usage
    (boundFuncDef as any).__thisObject = thisArg;

    return boundFuncDef;
  },
);
