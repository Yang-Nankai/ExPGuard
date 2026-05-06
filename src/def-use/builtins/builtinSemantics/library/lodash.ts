import {
  BuiltInSemantics,
  defFactory,
  literalOuter,
  Def,
  ObjectDef,
  taintManager,
} from "../index";

/**
 * ======================================================
 * ================== Lodash Semantics ==================
 * ======================================================
 */
// --------------------- lodash.map -------------------
BuiltInSemantics.register(
  "lodash.map",
  (_args, _callNode, _astNode, thisDef) => {
    // simplified return original array
    return thisDef;
  },
);

// --------------------- lodash.filter -------------------
BuiltInSemantics.register(
  "lodash.filter",
  (_args, _callNode, _astNode, thisDef) => {
    // simplified return original array
    return thisDef;
  },
);

// --------------------- lodash.get -------------------
BuiltInSemantics.register("lodash.get", (args, callNode, astNode) => {
  const [object, path, defaultValue] = args;

  // Only handle object + literal string path
  const pathValue = literalOuter(path);
  if (!Def.isObjectDef(object) || typeof pathValue !== "string") {
    return defFactory.createUnknownDef(callNode);
  }

  const segments = pathValue.split(".");
  if (segments.length === 0) {
    return defFactory.createUnknownDef(callNode);
  }

  let current: Def | null = object;

  // Traverse object properties according to path segments
  for (const key of segments) {
    if (!Def.isObjectDef(current)) {
      current = null;
      break;
    }

    const next = current.getProperty(key);
    if (!next) {
      current = null;
      break;
    }

    current = next;
  }

  // Fallback behavior: defaultValue > unknown
  const resultDef =
    current ?? defaultValue ?? defFactory.createUnknownDef(callNode);

  // [Taint Propagation]
  // lodash.get propagates taint from the source object to the result
  taintManager.propagateTaint(object, resultDef, astNode, "ELEMENT", "lodash.get");

  return resultDef;
});

// --------------------- lodash.set -------------------
BuiltInSemantics.register("lodash.set", (args, callNode, astNode) => {
  if (args.length < 3) {
    // lodash.set returns the original object even on invalid input
    return args[0] ?? defFactory.createUnknownDef(callNode);
  }

  const [object, path, value] = args;

  // Only attempt precise modeling when object is ObjectDef
  // and path is a literal string
  if (
    Def.isObjectDef(object) &&
    Def.isLiteralDef(path) &&
    typeof path.value === "string"
  ) {
    const segments = path.value.split(".");
    let current: ObjectDef = object;

    // Ensure all intermediate objects exist
    for (let i = 0; i < segments.length - 1; i++) {
      const key = segments[i];
      let next = current.getProperty(key);

      if (!Def.isObjectDef(next)) {
        next = defFactory.createObjectDef(callNode);
        current.setProperty(key, next!);
      }

      current = next as ObjectDef;
    }

    // Set final property
    const finalKey = segments[segments.length - 1];
    current.setProperty(finalKey, value);
  }

  // [Taint Propagation] If assigned value is tainted, the target object becomes tainted
  if (Def.isObjectDef(object) && value?.isTainted) {
    taintManager.propagateTaint(value, object, astNode, "MUTATE", "lodash.set");
  }

  return object;
});

// --------------------- lodash.clone -------------------
BuiltInSemantics.register(
  "lodash.clone",
  (args, callNode) => {
    if (args.length === 0) return defFactory.createUnknownDef(callNode);

    const value = args[0];
    // Shallow clone: create a new Def instance
    return value.cloneShallow(callNode);
  },
);

// --------------------- _.cloneDeep -------------------
BuiltInSemantics.register(
  "lodash.cloneDeep",
  (args, callNode) => {
    if (args.length === 0) return defFactory.createUnknownDef(callNode);

    const value = args[0];
    // Deep clone semantics are approximated here.
    return value.cloneDeep(callNode);
  },
);

// --------------------- lodash.assign-------------------
BuiltInSemantics.register("lodash.assign", (args) => {
  const [target, ...sources] = args;
  if (!Def.isObjectDef(target)) return target;

  for (const source of sources) {
    if (!Def.isObjectDef(source)) continue;

    for (const [k, v] of source.props) {
      target.setProperty(k, v);
    }
  }
  return target;
});

// --------------------- lodash.debounce-------------------
BuiltInSemantics.register(
  "lodash.debounce",
  (args, callNode) => {
    if (args.length < 2) return defFactory.createUnknownDef(callNode);

    const [func, wait] = args;
    if (!Def.isFunctionDef(func)) return defFactory.createUnknownDef(callNode);
    const debouncedFunc = defFactory.createFunctionDef(
      callNode,
      func.functionNode,
    );

    return debouncedFunc;
  },
);

// --------------------- lodash.once-------------------
BuiltInSemantics.register("lodash.once", (args, callNode) => {
  if (args.length < 1) return defFactory.createUnknownDef(callNode);

  const [func] = args;
  if (!Def.isFunctionDef(func)) return defFactory.createUnknownDef(callNode);
  const onceFunc = defFactory.createFunctionDef(callNode, func.functionNode);

  return onceFunc;
});