import {
  BuiltInSemantics,
  defFactory,
  Def,
} from "../index";

/**
 * ======================================================
 * Map.prototype.constructor(iterable)
 * ======================================================
 */
BuiltInSemantics.register(
  "Map.prototype.constructor",
  (args, callNode, _astNode, thisDef) => {
    const [arrayLike] = args; // Expect array-like of [key, value] pairs
    const newDef = Def.isObjectDef(thisDef)
      ? thisDef
      : defFactory.createObjectDef(callNode);

    // If first argument exists and is an ObjectDef
    if (Def.isObjectDef(arrayLike)) {
      for (const entry of arrayLike.props.values()) {
        // Each entry should be array-like with 2 elements: [key, value]
        if (Def.isObjectDef(entry)) {
          const key = entry.props.get("0");
          const value = entry.props.get("1");

          // Only support string keys for simplicity
          if (Def.isLiteralDef(key) && value) {
            newDef.setProperty(String(key.value), value);
          }
        }
      }
    }

    return thisDef;
  },
);

/**
 * ======================================================
 * Map.prototype.set(key, value)
 * ======================================================
 */
BuiltInSemantics.register(
  "Map.prototype.set",
  (args, _callNode, _astNode, thisDef) => {
    const [key, value] = args;
    if (!Def.isObjectDef(thisDef) || args.length < 2) return undefined;

    // Only support string keys for simplicity
    if (Def.isLiteralDef(key) && typeof key.value === "string") {
      // Set property
      thisDef.setProperty(key.value, value);
    }

    return undefined;
  },
);

/**
 * ======================================================
 * Map.prototype.get(key)
 * ======================================================
 */
BuiltInSemantics.register(
  "Map.prototype.get",
  (args, callNode, _astNode, thisDef) => {
    const [key] = args;
    const fallbackElement = defFactory.createUnknownDef(callNode);
    if (!Def.isObjectDef(thisDef) || args.length < 1) return fallbackElement;

    if (!Def.isLiteralDef(key) || typeof key.value !== "string")
      return fallbackElement;

    const result = thisDef.lookupProperty(key.value);
    if (result) return result;

    // Return unknown def if key not found
    return fallbackElement;
  },
);

/**
 * ======================================================
 * Map.prototype.clear()
 * ======================================================
 */
BuiltInSemantics.register(
  "Map.prototype.clear",
  (_args, _callNode, _astNode, thisDef) => {
    if (Def.isObjectDef(thisDef)) {
      // Clear all propertiesa
      thisDef.props.clear();
    }
    return undefined;
  },
);