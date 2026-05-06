import {
  BuiltInSemantics,
  DefFactory,
  defFactory,
  Def,
  FunctionDef,
  ObjectDef,
  interAnalyzer,
} from "../index";

// --------------------- executor.resolve-------------------
BuiltInSemantics.register(
  "executor.resolve",
  (args, _callNode, _astNode, thisDef) => {
    const [value] = args;

    if (value && Def.isPromiseDef(thisDef)) {
      // Resolve the promise with the first argument
      thisDef.resolve(value);
    }

    return undefined;
  },
);

// --------------------- Promise.prototype.then-------------------
BuiltInSemantics.register(
  "Promise.prototype.then",
  (args, callNode, astNode, thisDef) => {
    const [onFulfilled] = args;
    // Create a new Promise to return
    const newPromise = defFactory.createPromiseDef(callNode);

    if (!Def.isPromiseDef(thisDef)) return newPromise;

    // If a fulfillment callback is provided
    if (Def.isFunctionDef(onFulfilled)) {
      const fulfillArg =
        thisDef.resolvedDef ?? defFactory.createUndefinedDef(callNode);

      // Track callback execution
      interAnalyzer.analyze(callNode, onFulfilled, [fulfillArg], thisDef, astNode);

      // Set new promise's resolved value
      newPromise.resolve(fulfillArg);
    }

    return newPromise;
  },
);

// --------------------- Promise.prototype.constructor -------------------
BuiltInSemantics.register(
  "Promise.prototype.constructor",
  (args, callNode, astNode, thisDef) => {
    const newObj = Def.isPromiseDef(thisDef)
      ? thisDef
      : defFactory.createPromiseDef(callNode);

    // Initialize promise value
    newObj.resolve(defFactory.createUndefinedDef(callNode));

    if (!Def.isFunctionDef(args[0])) return newObj;

    const executorFunc = args[0] as FunctionDef;

    // Create a built-in resolve function bound to this Promise
    const resolveFunc = defFactory.createBuiltInFunctionDef(
      callNode,
      "executor.resolve",
    );
    resolveFunc.semanticExec = BuiltInSemantics.get("executor.resolve");
    resolveFunc.thisDef = newObj;

    // Track executor invocation
    interAnalyzer.analyze(callNode, executorFunc, [resolveFunc], newObj, astNode);

    return newObj;
  },
);

// --------------------- Promise.resolve-------------------
BuiltInSemantics.register("Promise.resolve", (args, callNode) => {
  const [value] = args;

  // If wrong call
  if (!value) return defFactory.createUndefinedDef(callNode);

  // If argument is already a PromiseDef, return it directly
  if (Def.isPromiseDef(value)) return value;

  // Otherwise, wrap value in a new Promise
  return defFactory.createPromiseDef(callNode, value);
});

// --------------------- Promise.all-------------------
BuiltInSemantics.register(
  "Promise.all",
  (args, callNode, astNode, _thisDef) => {
    const [iterable] = args;

    // Must be array-like
    if (!iterable || !Def.isObjectDef(iterable)) {
      return defFactory.createUnknownDef(callNode);
    }

    const arrayObj = iterable as ObjectDef;
    const resolvedValues: Def[] = [];
    const undefinedDef = defFactory.createUndefinedDef(callNode);

    for (const [, value] of arrayObj.props) {
      // Non-Promise element fails modeling
      if (!Def.isPromiseDef(value)) return undefinedDef;

      resolvedValues.push(value.resolvedDef ?? undefinedDef);
    }

    // Create array of resolved values and wrap in new Promise
    const resultArray = DefFactory.createArrayInstanceDef(
      callNode,
      astNode,
      resolvedValues,
    );
    return defFactory.createPromiseDef(callNode, resultArray);
  },
);