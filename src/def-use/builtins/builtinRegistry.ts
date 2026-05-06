// builtinRegistry.ts

import { FlowNode } from "../../flownode/flownode";
import { flownodeFactory } from "../../flownode/flownodeFactory";
import { taintManager as tm } from "../../taint";
import { defFactory } from "../factories/defFactory";
import Def, { FunctionDef, ObjectDef } from "../types/def";
import BUILTINS from "./builtins";
// import { BuiltInSemantics } from "./builtinSemantics";
import { BuiltInSemantics } from "./builtinSemantics/index";

import {
  BuiltinProps,
  ConstructorSchema,
  FunctionSchema,
  ObjectSchema,
  AttributeSchema,
} from "./builtinTypes";

/**
 * ======================================================
 * Built-in Registry
 * Build all JS built-in semantic objects from schema
 * ======================================================
 */
export class BuiltInRegistry {
  private static initialized = false;

  /** Root FlowNode that owns all built-in definitions */
  static rootNode: FlowNode = flownodeFactory.createBuiltInNode();

  /** globalName / alias -> Def */
  static registry = new Map<string, Def>();

  /** prototypeName -> ObjectDef */
  static prototypes = new Map<string, ObjectDef>();

  /* ======================================================
   * Initialization
   * ====================================================== */

  /**
   * Initialize all built-in definitions.
   * This method is idempotent.
   */
  static initialize() {
    if (this.initialized) return;

    this.createPrototypes();
    this.createConstructors();
    this.createObjects();
    this.createStandaloneFunctions();
    this.wireConstructorProtoChain();
    this.wirePrototypeProtoChain();
    this.exposePrototypes();

    this.initialized = true;
  }

  /**
   * Register taint sources for attributes declared in schema.
   * Only object-type builtins are scanned.
   */
  static registerAttributeSources() {
    for (const schema of BUILTINS) {
      if (schema.type !== "object") continue;

      const objDef = this.registry.get(schema.name);
      if (!Def.isObjectDef(objDef)) continue;

      const props = schema.props ?? {};
      this.walkAttributeSchemas(objDef, props);
    }
  }

  /**
   * Recursively walk attribute schemas and register taint sources.
   */
  private static walkAttributeSchemas(owner: ObjectDef, props: BuiltinProps) {
    for (const [propName, desc] of Object.entries(props)) {
      if (desc.type === "attribute") {
        if (!desc.sourceType) continue;

        const attr = owner.lookupProperty(propName);
        if (!attr) continue;

        tm.createTaintSource(attr, desc.sourceType, null, false, desc.name);
        continue;
      }

      if (desc.type === "object") {
        const child = owner.lookupProperty(propName);
        if (Def.isObjectDef(child)) {
          this.walkAttributeSchemas(child, desc.props ?? {});
        }
      }
    }
  }

  /* ======================================================
   * Step 1: Create prototype objects
   * ====================================================== */

  /**
   * Pre-create all prototype objects for constructors.
   */
  private static createPrototypes() {
    for (const schema of BUILTINS) {
      if (schema.type !== "constructor") continue;

      if (!this.prototypes.has(schema.prototypeName)) {
        const proto = defFactory.createObjectDef(this.rootNode);
        this.prototypes.set(schema.prototypeName, proto);
      }
    }
  }

  /* ======================================================
   * Step 2: Create constructors
   * ====================================================== */

  /**
   * Create constructor functions and attach:
   * - static methods to constructor
   * - prototype methods to its prototype object
   */
  private static createConstructors() {
    for (const schema of BUILTINS) {
      if (schema.type !== "constructor") continue;

      const ctorSchema = schema as ConstructorSchema;

      const ctor = defFactory.createFunctionDef(this.rootNode, null);
      const proto = this.prototypes.get(ctorSchema.prototypeName)!;

      ctor.prototypeObject = proto;

      // static methods
      this.attachObjectProps(ctor, ctorSchema.staticMethods);

      // prototype methods
      this.attachObjectProps(proto, ctorSchema.prototypeMethods);

      this.registry.set(ctorSchema.name, ctor);
      if (ctorSchema.alias) {
        this.registry.set(ctorSchema.alias, ctor);
      }
    }
  }

  /* ======================================================
   * Step 3: Create plain objects
   * ====================================================== */

  /**
   * Create non-constructor built-in objects.
   */
  private static createObjects() {
    for (const schema of BUILTINS) {
      if (schema.type !== "object") continue;

      const objSchema = schema as ObjectSchema;
      const obj = defFactory.createObjectDef(this.rootNode);

      this.attachObjectProps(obj, objSchema.props);

      this.registry.set(objSchema.name, obj);
      if (objSchema.alias) {
        this.registry.set(objSchema.alias, obj);
      }
    }
  }

  /* ======================================================
   * Step 4: Create standalone functions
   * ====================================================== */

  /**
   * Create global standalone functions (e.g., parseInt).
   */
  private static createStandaloneFunctions() {
    for (const schema of BUILTINS) {
      if (schema.type !== "function") continue;

      const fnSchema = schema as FunctionSchema;

      const fn = defFactory.createBuiltInFunctionDef(
        this.rootNode,
        fnSchema.name,
      );

      if (fnSchema.effect) {
        fn.semanticExec = BuiltInSemantics.get(fnSchema.effect);
      }

      this.attachObjectProps(fn, fnSchema.props);

      this.registry.set(fnSchema.name, fn);
      if (fnSchema.alias) {
        this.registry.set(fnSchema.alias, fn);
      }
    }
  }

  /* ======================================================
   * Step 5: Wire constructor __proto__ chain
   * ====================================================== */

  /**
   * Set constructor inheritance:
   * ChildConstructor.__proto__ -> Parent.prototype
   */
  private static wireConstructorProtoChain() {
    for (const schema of BUILTINS) {
      if (schema.type !== "constructor") continue;

      const ctorSchema = schema as ConstructorSchema;
      if (!ctorSchema.proto) continue;

      const ctor = this.registry.get(ctorSchema.name);
      const parent = this.registry.get(ctorSchema.proto);

      if (Def.isFunctionDef(ctor) && Def.isFunctionDef(parent)) {
        ctor.proto = parent.prototypeObject ?? null;
      }
    }
  }

  /* ======================================================
  * Step 5.5: Wire prototype inheritance chain
  * ====================================================== */

  /**
   * Set prototype inheritance:
   * Child.prototype.__proto__ -> Parent.prototype
   */
  private static wirePrototypeProtoChain() {
    for (const schema of BUILTINS) {
      if (schema.type !== "constructor") continue;

      const ctorSchema = schema as ConstructorSchema;
      if (!ctorSchema.prototypeProto) continue;

      const proto = this.prototypes.get(ctorSchema.prototypeName);
      const parentProto = this.prototypes.get(ctorSchema.prototypeProto);

      if (proto && parentProto) {
        proto.proto = parentProto;
      }
    }
  }

  /* ======================================================
   * Step 6: Expose prototype objects
   * ====================================================== */

  /**
   * Expose prototype objects into registry (e.g., Array.prototype).
   */
  private static exposePrototypes() {
    for (const [name, proto] of this.prototypes) {
      this.registry.set(name, proto);
    }
  }

  /* ======================================================
   * Helpers
   * ====================================================== */

  /**
   * Attach properties (object / function / attribute)
   * to a target ObjectDef recursively.
   */
  private static attachObjectProps(
    target: ObjectDef,
    props: BuiltinProps = {},
  ) {
    for (const [name, desc] of Object.entries(props)) {
      switch (desc.type) {
        case "object": {
          const child = defFactory.createObjectDef(this.rootNode);
          this.attachObjectProps(child, desc.props);
          target.setProperty(name, child);
          break;
        }

        case "function": {
          target.setProperty(name, this.createBuiltinFunction(desc));
          break;
        }

        case "attribute": {
          this.attachAttribute(target, name, desc);
          break;
        }
      }
    }
  }

  /**
   * Attach literal attribute property to target.
   */
  private static attachAttribute(
    target: ObjectDef,
    propName: string,
    desc: AttributeSchema,
  ) {
    const attr = defFactory.createLiteralDef(this.rootNode, desc.name);
    target.setProperty(propName, attr);
  }

  /**
   * Create a built-in function with optional semantic effect.
   */
  private static createBuiltinFunction(desc: FunctionSchema): FunctionDef {
    const fn = defFactory.createBuiltInFunctionDef(this.rootNode, desc.name);

    if (desc.effect) {
      fn.semanticExec = BuiltInSemantics.get(desc.effect);
    }

    this.attachObjectProps(fn, desc.props);
    return fn;
  }

  /* ======================================================
   * Public APIs
   * ====================================================== */

  /** Get built-in definition by name or alias */
  static get(name: string): Def | undefined {
    return this.registry.get(name);
  }

  /** Get prototype object by constructor name */
  static getPrototype(name: string): ObjectDef | null {
    return this.prototypes.get(`${name}.prototype`) ?? null;
  }

  /** Shortcut getters for common prototypes */
  static getObjectPrototype(): ObjectDef | null {
    return this.getPrototype("Object");
  }

  static getFunctionPrototype(): ObjectDef | null {
    return this.getPrototype("Function");
  }

  static getArrayPrototype(): ObjectDef | null {
    return this.getPrototype("Array");
  }

  static getStringPrototype(): ObjectDef | null {
    return this.getPrototype("String");
  }

  static getPromisePrototype(): ObjectDef | null {
    return this.getPrototype("Promise");
  }

  /** Get constructor by name */
  static getConstructor(name: string): FunctionDef | null {
    const ctor = this.registry.get(name);
    return Def.isFunctionDef(ctor) ? ctor : null;
  }

  static getArrayConstructor(): FunctionDef | null {
    const ctor = this.registry.get("Array");
    return Def.isFunctionDef(ctor) ? ctor : null;
  }

  static getUnit8ArrayConstructor(): FunctionDef | null {
    const ctor = this.registry.get("Uint8Array");
    return Def.isFunctionDef(ctor) ? ctor : null;
  }

  static getPromiseConstructor(): FunctionDef | null {
    const ctor = this.registry.get("Promise");
    return Def.isFunctionDef(ctor) ? ctor : null;
  }

  /** Get global chrome object definition */
  static getChromeObject(): ObjectDef | null {
    const obj = this.registry.get("chrome");
    return Def.isObjectDef(obj) ? obj : null;
  }
}