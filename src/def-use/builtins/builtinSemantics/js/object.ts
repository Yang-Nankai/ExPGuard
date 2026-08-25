import {
  BuiltInSemantics,
  DefFactory,
  defFactory,
  Def,
  ObjectDef,
  taintManager,
  Node,
} from "../index";

/**
 * Helper: copy enumerable properties (shallow copy)
 */
export function copyEnumerableProps(
  target: ObjectDef,
  source: ObjectDef,
  astNode: Node,
  label: string,
) {
  for (const [k, v] of source.props) {
    target.setProperty(k, v);
  }

  // Taint propagation (source -> target)
  taintManager.propagateTaint(source, target, astNode, "COPY", label);
}

/**
 * ======================================================
 * Object.assign(target, ...sources)
 * ======================================================
 */
BuiltInSemantics.register("Object.assign", (args, callNode, astNode) => {
  const [target, ...sources] = args;

  if (!Def.isObjectDef(target)) {
    return defFactory.createUnknownDef(callNode);
  }

  for (const source of sources) {
    if (!Def.isObjectDef(source)) {
      // Opaque source (typically a message payload). No properties to copy,
      // but the target now aggregates it — keep the taint on the container so
      // later `target.field` reads recover the flow.
      taintManager.propagateTaint(
        source,
        target,
        astNode,
        "COPY",
        "object.assign-opaque",
      );
      continue;
    }
    copyEnumerableProps(target, source, astNode, "object.assign");
  }

  return target;
});

/**
 * ======================================================
 * Object.create(proto)
 * ======================================================
 *
 * NOTE:
 *  - Do NOT propagate taint here.
 *  - Taint should flow during property lookup via prototype chain.
 */
BuiltInSemantics.register("Object.create", (args, callNode) => {
  const proto = Def.isObjectDef(args[0]) ? args[0] : null;

  const newObj = defFactory.createObjectDef(callNode, proto);

  return newObj;
});

/**
 * ======================================================
 * Object.defineProperty(obj, prop, descriptor)
 * ======================================================
 *
 * Sound modeling:
 *  - descriptor is meta object
 *  - Only descriptor.value affects data flow
 */
BuiltInSemantics.register("Object.defineProperty", (args) => {
  const [target, propNameDef, descriptor] = args;

  if (
    !Def.isObjectDef(target) ||
    !Def.isLiteralDef(propNameDef) ||
    !Def.isObjectDef(descriptor)
  ) {
    return target;
  }

  // Attempt to resolve property name
  const propName = propNameDef?.value ?? null;

  const valueDef = descriptor.getProperty("value");

  if (propName !== null && valueDef) {
    // Property set and taint propagation
    target.setProperty(String(propName), valueDef);
  }

  return target;
});

/**
 * ======================================================
 * Object.defineProperties(obj, descriptors)
 * ======================================================
 *
 * descriptors = {
 *   a: { value: ... },
 *   b: { value: ... }
 * }
 */
BuiltInSemantics.register("Object.defineProperties", (args) => {
  const [target, descriptors] = args;

  if (!Def.isObjectDef(target) || !Def.isObjectDef(descriptors)) {
    return target;
  }

  for (const [propName, descObj] of descriptors.props) {
    if (!Def.isObjectDef(descObj)) continue;

    const valueDef = descObj.getProperty("value");

    if (valueDef) {
      target.setProperty(propName, valueDef);
    }
  }

  return target;
});

/**
 * ======================================================
 * Object.entries(obj)
 * ======================================================
 *
 * Returns:
 *  [ [key, value], ... ]
 */
BuiltInSemantics.register("Object.entries", (args, callNode, astNode) => {
  const [obj] = args;

  if (!Def.isObjectDef(obj)) {
    return defFactory.createUnknownDef(callNode);
  }

  const entryDefs: any[] = [];

  for (const [k, v] of obj.props) {
    const keyDef = defFactory.createLiteralDef(callNode, k);

    const pair = DefFactory.createArrayInstanceDef(callNode, astNode, [
      keyDef,
      v,
    ]);

    entryDefs.push(pair);
  }

  return DefFactory.createArrayInstanceDef(callNode, astNode, entryDefs);
});

/**
 * ======================================================
 * Object.values(obj)
 * ======================================================
 */
BuiltInSemantics.register("Object.values", (args, callNode, astNode) => {
  const [obj] = args;

  if (!Def.isObjectDef(obj)) {
    return defFactory.createUnknownDef(callNode);
  }

  const values = [...obj.props.values()];
  const result = DefFactory.createArrayInstanceDef(callNode, astNode, values);

  return result;
});

/**
 * ======================================================
 * Object.keys(obj)
 * ======================================================
 */
BuiltInSemantics.register("Object.keys", (args, callNode, astNode) => {
  const [obj] = args;

  if (!Def.isObjectDef(obj)) {
    // If the obj is tainted
    // const element = defFactory.createUnknownDef(callNode);
    // if (obj.isTainted) {
    //   taintManager.createTaintSource(element, "AXIOS_GET_RESPONSE", astNode, false, "object.keys");
    //   return DefFactory.createArrayInstanceDef(callNode, astNode, [element]);
    // }

    return defFactory.createUnknownDef(callNode);
  }

  const keys = [...obj.props.keys()].map((k) => defFactory.createLiteralDef(callNode, k));
  const result = DefFactory.createArrayInstanceDef(callNode, astNode, keys);

  return result;
});

/**
 * ======================================================
 * Object.getPrototypeOf(obj)
 * ======================================================
 */
BuiltInSemantics.register("Object.getPrototypeOf", (args, callNode) => {
  const [obj] = args;

  if (!Def.isObjectDef(obj)) {
    return defFactory.createUnknownDef(callNode);
  }

  return obj.proto ?? null;
});

/**
 * ======================================================
 * Object.setPrototypeOf(obj, proto)
 * ======================================================
 */
BuiltInSemantics.register("Object.setPrototypeOf", (args, callNode) => {
  const [obj, protoCandidate] = args;

  if (!Def.isObjectDef(obj)) {
    return defFactory.createUnknownDef(callNode);
  }

  obj.proto = Def.isObjectDef(protoCandidate) ? protoCandidate : null;

  return obj;
});
