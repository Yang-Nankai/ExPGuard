import {
  BuiltInSemantics,
  DefFactory,
  defFactory,
  Def,
  interAnalyzer,
  taintManager
} from "../index";



/**
 * ======================================================
 * Array.prototype.constructor(element0, element1, … elementN)
 * Array.prototype.constructor(arrayLength)
 * ======================================================
 */
BuiltInSemantics.register(
  "Array.prototype.constructor",
  (args, callNode, astNode, thisDef) => {
    const array = Def.isObjectDef(thisDef)
      ? thisDef
      : DefFactory.createArrayInstanceDef(callNode, astNode);


    // Assign arguments as array elements
    if (Def.isLiteralDef(args[0]) && typeof args[0].value === "number") {
      return thisDef;
    }

    for (const arg of args) {
      array.setProperty(array.propsLength, arg, true, true);
    }
  },
);

// --------------------- Array.prototype.at-------------------
BuiltInSemantics.register(
  "Array.prototype.at",
  (args, callNode, _astNode, thisDef) => {
    const [index] = args;
    let element: Def | null;

    if (!Def.isObjectDef(thisDef) || args.length < 1) {
      return defFactory.createUnknownDef(callNode);
    }

    if (Def.isLiteralDef(index)) {
      element = thisDef.getProperty(String(index.value));
    }

    element = defFactory.createImplicitDef(callNode, thisDef.values);
    return element ?? defFactory.createUnknownDef(callNode);

    // const element = defFactory.createUnknownDef(callNode);
    // if (!thisDef || !Def.isObjectDef(thisDef) || args.length < 1)
    //   return element;

    // [Taint Propagation] array elements need has the taint
    // taintManager.propagateTaint(thisDef, element, astNode, "ELEMENT", "array.at");

    // TODO: need to care about the returnDef(plan ImplictDef).
    // return element;
  },
);

/**
 * ======================================================
 * Array.prototype.concat(...items)
 *
 * Returns a NEW array consisting of the elements in the object on which it
 * is called, followed by each item argument. The previous implementation
 * mutated `thisDef` in place — that's wrong (callers can keep using the
 * original array unchanged) and it also lost taint that lived only on the
 * `args` items but not on `thisDef`.
 * ======================================================
 */
BuiltInSemantics.register(
  "Array.prototype.concat",
  (args, callNode, astNode, thisDef) => {
    const result = DefFactory.createArrayInstanceDef(callNode, astNode);

    // Copy elements from `this`.
    if (Def.isObjectDef(thisDef)) {
      for (const e of thisDef.values) {
        result.setProperty(result.propsLength, e, true, true);
      }
      if (thisDef.arrayElementSummary) {
        result.addArrayElement(thisDef.arrayElementSummary);
      }
      // Propagate container taint from the receiver array to the new array.
      taintManager.propagateTaint(thisDef, result, astNode, "COPY", "array.concat");
    }

    // Merge all array arguments (or push scalar args verbatim).
    for (const arg of args) {
      if (Def.isObjectDef(arg)) {
        for (const e of arg.values) {
          result.setProperty(result.propsLength, e, true, true);
        }
        if (arg.arrayElementSummary) {
          result.addArrayElement(arg.arrayElementSummary);
        }
        taintManager.propagateTaint(arg, result, astNode, "COPY", "array.concat.arg");
      } else if (arg) {
        result.setProperty(result.propsLength, arg, true, true);
        taintManager.propagateTaint(arg, result, astNode, "ELEMENT", "array.concat.scalar");
      }
    }

    return result;
  },
);


/**
 * ======================================================
 * Array.prototype.fill(value)
 * ======================================================
 */
BuiltInSemantics.register(
  "Array.prototype.fill",
  (args, _callNode, astNode, thisDef) => {
    const value = args[0];

    if (!Def.isObjectDef(thisDef) || !value) return thisDef;

    // fallback: set the last value
    thisDef.setProperty(thisDef.propsLength, value, true, true);

    taintManager.propagateTaint(
      value,
      thisDef,
      astNode,
      "MUTATE",
      "array.fill",
    );

    return thisDef;
  },
);


/**
 * ======================================================
 * Array.prototype.filter(callback)
 * ======================================================
 */
BuiltInSemantics.register(
  "Array.prototype.filter",
  (_args, _callNode, _astNode, thisDef) => {
    // simplified return original array
    return thisDef;
  },
);


/**
 * ======================================================
 * Array.prototype.find(callback)
 * ======================================================
 */
BuiltInSemantics.register(
  "Array.prototype.find",
  (_args, callNode, astNode, thisDef) => {
    // NOTE: do not handle callbackFn
    const element = defFactory.createUnknownDef(callNode);

    if (!Def.isObjectDef(thisDef)) return element;

    // Taint Propagation: element need has the taint
    taintManager.propagateTaint(thisDef, element, astNode, "ELEMENT", "array.find");

    return element;
  },
);

/**
 * ======================================================
 * Array.prototype.forEach(callback)
 * ======================================================
 */
BuiltInSemantics.register(
  "Array.prototype.forEach",
  (args, callNode, astNode, thisDef) => {
    // NOTE: handle callbackFn
    const callback = args[0];

    if (!Def.isFunctionDef(callback) || !Def.isObjectDef(thisDef)) {
      return undefined;
    }

    const element = defFactory.createImplicitDef(callNode, thisDef.values);

    // Track callback invocation with the element
    interAnalyzer.analyze(callNode, args[0], [element], null, astNode);

    return undefined;
  },
);

/**
 * ======================================================
 * Array.prototype.map(callback)
 * ======================================================
 */
BuiltInSemantics.register(
  "Array.prototype.map",
  (_args, _callNode, _astNode, thisDef) => {
    // simplified return original array
    return thisDef;
  },
);


/**
 * ======================================================
 * Array.prototype.pop()
 * ======================================================
 */
BuiltInSemantics.register(
  "Array.prototype.pop",
  (_args, callNode, astNode, thisDef) => {
    if (!Def.isObjectDef(thisDef)) return defFactory.createUnknownDef(callNode);

    const element = defFactory.createUnknownDef(callNode);

    // Taint Propagation: element need has the taint
    taintManager.propagateTaint(thisDef, element, astNode, "ELEMENT", "array.pop");

    return element;
  },
);


/**
 * ======================================================
 * Array.prototype.push(...items)
 * ======================================================
 */
BuiltInSemantics.register(
  "Array.prototype.push",
  (args, callNode, _astNode, thisDef) => {
    if (!Def.isObjectDef(thisDef)) return thisDef;

    for (const arg of args) {
      thisDef.setProperty(thisDef.propsLength, arg, true, true);
    }

    return defFactory.createLiteralDef(callNode, thisDef.propsLength);
  },
);


/**
 * ======================================================
 * Array.prototype.reduce(callback)
 * ======================================================
 */
BuiltInSemantics.register(
  "Array.prototype.reduce",
  (_args, callNode, astNode, thisDef) => {
    const result = defFactory.createUnknownDef(callNode);

    // Taint Propagation: element need has the taint
    taintManager.propagateTaint(thisDef, result, astNode, "ELEMENT", "array.reduce");

    return result;
  },
);

/**
 * ======================================================
 * Array.prototype.reverse()
 * ======================================================
 */
BuiltInSemantics.register(
  "Array.prototype.reverse",
  (_args, _callNode, _astNode, thisDef) => {
    // Simplified: just return original array
    return thisDef;
  },
);

/**
 * ======================================================
 * Array.prototype.shift()
 * ======================================================
 */
BuiltInSemantics.register(
  "Array.prototype.shift",
  (_args, callNode, astNode, thisDef) => {
    if (!Def.isObjectDef(thisDef)) return defFactory.createUnknownDef(callNode);

    const element = defFactory.createUnknownDef(callNode);

    // Taint Propagation: element need has the taint
    taintManager.propagateTaint(thisDef, element, astNode, "ELEMENT", "array.shift");

    return element;
  },
);

/**
 * ======================================================
 * Array.prototype.unshift(...items)
 * ======================================================
 */
BuiltInSemantics.register(
  "Array.prototype.unshift",
  (args, callNode, _astNode, thisDef) => {
    if (!Def.isObjectDef(thisDef)) return thisDef;

    for (const arg of args) {
      thisDef.setProperty(thisDef.propsLength, arg, true, true);
    }

    return defFactory.createLiteralDef(callNode, thisDef.propsLength);
  },
);

/**
 * ======================================================
 * Array.prototype.sort(compareFn)
 * ======================================================
 */
BuiltInSemantics.register(
  "Array.prototype.sort",
  (_args, _callNode, _astNode, thisDef) => {
    // Simplified: just return original array
    return thisDef;
  },
);

/**
 * ======================================================
 * Array.prototype.toString()
 * ======================================================
 */
BuiltInSemantics.register(
  "Array.prototype.toString",
  (_args, callNode, astNode, thisDef) => {
    const str = defFactory.createUnknownDef(callNode);

    // Taint Propagation: toString need contain the taint
    taintManager.propagateTaint(thisDef, str, astNode, "RETURN", "array.toString");

    return str;
  },
);

/**
 * ======================================================
 * Array.prototype.join(separator)
 * ======================================================
 */
BuiltInSemantics.register(
  "Array.prototype.join",
  (_args, callNode, astNode, thisDef) => {
    const str = defFactory.createUnknownDef(callNode);

    // Taint Propagation: join result need contain the taint
    taintManager.propagateTaint(thisDef, str, astNode, "RETURN", "array.join");

    return str;
  },
);

/**
 * ======================================================
 * Array.prototype.slice(start, end)
 * ======================================================
 */
BuiltInSemantics.register(
  "Array.prototype.slice",
  (_args, _callNode, _astNode, thisDef) => {
    // Simplified: return the original array
    return thisDef;
  },
);

/**
 * ======================================================
 * Array.prototype.splice(...)
 * ======================================================
 */
BuiltInSemantics.register(
  "Array.prototype.splice",
  (_args, _callNode, _astNode, thisDef) => {
    // Simplified: return the original array
    return thisDef;
  },
);

// --------------------- Array.prototype.set-------------------
// BuiltInSemantics.register(
//   "Array.prototype.set",
//   (args, _callNode, astNode, thisDef) => {
//     // set for TypedArray
//     const [source /*, offset */] = args;

//     if (!Def.isObjectDef(thisDef)) return undefined;

//     // Set property
//     thisDef.setProperty(thisDef.propsLength, source);

//     return undefined;
//   },
// );


/**
 * ======================================================
 * Array.from(source, mapFn?, thisArg?)
 * Creates a new Array instance from an array-like or iterable object.
 * ======================================================
 */
BuiltInSemantics.register("Array.from", (args, callNode, astNode) => {
  const [source] = args;
  const elements = Def.isObjectDef(source) ? [...source.values] : [];

  const newArray = DefFactory.createArrayInstanceDef(
    callNode,
    astNode,
    elements,
  );

  return newArray;
});

/**
 * ======================================================
 * Array.of(...items)
 * ======================================================
 */
BuiltInSemantics.register("Array.of", (args, callNode, astNode) => {
  return DefFactory.createArrayInstanceDef(callNode, astNode, [...args]);
});
