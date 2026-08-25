import { Node } from "acorn";
import { FlowNode } from "../../flownode/flownode";
import { astValidator } from "../../ast/astValidator";
import Set from "../../utils/set";
import { BuiltInSemanticExec } from "../builtins/builtinSemantics/index";
import { BuiltInRegistry } from "../builtins/builtinRegistry";
import { defFactory } from "../factories/defFactory";
import { Errors } from "../../utils/errorCode";
import { taintManager as tm } from "../../taint";
import { defGenerator } from "../../utils/uuid";
import PageScope from "../../scope/pageScope";
import { lookupMatchingDef, setReachingDef } from "../utils/utils";

export type LiteralValue = string | number | boolean | null;

export type DefType =
  | "object"
  | "function"
  | "unknown"
  | "literal" // boolean / number / string / bigint / null
  | "undefined"
  | "builtInFunction"
  | "promise"
  | "implicit"
  | "pseudo";

/**
 * Helper: brief key for nested structures
 */
function defKeyBrief(def: Def | null): string {
  if (!def) return "null";
  return `${def.type}:${def.version}:${Number(def.isTainted)}`;
}

/**
 * ========================================
 * Base Def
 * ========================================
 *
 * Represents an abstract runtime value in the
 * static analysis engine.
 *
 * Each Def contains:
 *
 * - unique id
 * - semantic version
 * - taint flag
 * - creation FlowNode
 *
 * Subclasses represent specific value types.
 */
abstract class Def {
  readonly uniqueId: number;

  protected _type: DefType;
  protected _fromNode: FlowNode;

  // Only record whether this Def is tainted
  protected _tainted: boolean = false;

  // semantic version
  protected _version: number = 0;

  /**
   * True when this value crossed a browser storage serialization boundary.
   * Storage cannot preserve user-defined methods.  This lets a subsequent
   * successful numeric formatter call retain the JavaScript runtime fact that
   * its receiver was a number, without treating arbitrary storage text as
   * safe for HTML/code sinks.
   */
  protected _storageSerialized = false;

  constructor(fromNode: FlowNode, type: DefType) {
    // Def.validateType(fromNode, type);
    this._fromNode = fromNode;
    this._type = type;
    this.uniqueId = defGenerator.nextId();
  }

  /** Static type check helpers */
  static isObjectDef(def: unknown): def is ObjectDef {
    return def instanceof ObjectDef;
  }
  static isFunctionDef(def: unknown): def is FunctionDef {
    return def instanceof FunctionDef;
  }
  static isUnknownDef(def: unknown): def is UnknownDef {
    return def instanceof UnknownDef;
  }
  static isPrimitiveDef(def: unknown): def is PrimitiveDef {
    return def instanceof PrimitiveDef;
  }
  static isStringSafeDef(def: unknown): def is StringSafeDef {
    return def instanceof StringSafeDef;
  }
  static isLiteralDef(def: unknown): def is LiteralDef {
    return def instanceof LiteralDef;
  }
  static isUndefinedDef(def: unknown): def is UndefinedDef {
    return def instanceof UndefinedDef;
  }
  static isImplicitDef(def: unknown): def is ImplicitDef {
    return def instanceof ImplicitDef;
  }
  static isBuiltInFunctionDef(def: unknown): def is BuiltInFunctionDef {
    return def instanceof BuiltInFunctionDef;
  }
  static isPromiseDef(def: unknown): def is PromiseDef {
    return def instanceof PromiseDef;
  }

  /** Validation */
  static isDef(def: unknown): def is Def {
    return def instanceof Def;
  }
  static isFlowNode(node: unknown): node is FlowNode {
    return FlowNode.isFlowNode(node);
  }
  static isValidType(type: unknown): type is DefType {
    return typeof type === "string";
  }

  static validateType(from: unknown, type: unknown, msg?: string): void {
    if (!Def.isFlowNode(from) || !Def.isValidType(type)) {
      Errors.ValidatorError(msg || "Invalid Def initialization arguments");
    }
  }

  /** creation node */
  get fromNode() {
    return this._fromNode;
  }

  /** ast node */
  get astNode() {
    return this._fromNode.astNode!;
  }

  /** value type */
  get type() {
    return this._type;
  }

  /** semantic version */
  get version(): number {
    return this._version;
  }

  protected bumpVersion() {
    this._version++;
  }

  /** taint flag */
  get isTainted() {
    return this._tainted;
  }

  markTaintedFlag() {
    this._tainted = true;
  }

  clearTaintFlag() {
    this._tainted = false;
  }

  markStorageSerialized() {
    this._storageSerialized = true;
  }

  get isStorageSerialized(): boolean {
    return this._storageSerialized;
  }

  /**
   * Shallow clone.
   *
   * Internal references are reused.
   */
  abstract cloneShallow(node: FlowNode): Def;

  /**
   * Deep clone.
   *
   * Nested structures are recursively cloned.
   * A visited map is required to prevent cycles.
   */
  abstract cloneDeep(node: FlowNode, visited?: Map<Def, Def>): Def;

  /**
   * Semantic key used for reaching-definition
   * deduplication.
   */
  abstract get key(): string;

  toString() {
    return `${this.uniqueId}:${this._type}@${this._fromNode}`;
  }
}

/**
 * ========================================
 * ObjectDef
 * ========================================
 *
 * Represents a JavaScript heap object.
 */
export class ObjectDef extends Def {
  protected _props: Map<string, Def> = new Map();
  protected _proto: Def | null = null;
  /** True only for instances created through the Array constructor/factory. */
  protected _isArrayLike = false;
  /** Separate summary for array elements; never aliases `.length` metadata. */
  protected _arrayElementSummary: Def | null = null;

  /**
   * True when this container itself was derived from an opaque value (for
   * example JSON.parse(x), an unresolved spread, or an externally supplied
   * object).  This is deliberately distinct from ordinary property taint:
   * `{ title: tainted }` must not make `obj.url` or `obj.length` tainted,
   * whereas `JSON.parse(tainted).url` must remain conservative.
   */
  protected _hasOpaqueContainerTaint = false;

  constructor(fromNode: FlowNode, proto?: Def | null) {
    super(fromNode, "object");

    // defaults to global Object.prototype, null for explicit null (e.g.,
    // Object.create(null)), otherwise Registry.ObjectProto for undefined.
    this._proto = proto ?? BuiltInRegistry.getObjectPrototype();
  }

  setProperty(
    name: string,
    def: Def,
    propagateContainerTaint = true,
    markAsArrayElement = false,
  ) {
    const old = this._props.get(name);
    if (old === def) return;

    if (propagateContainerTaint && def.isTainted) {
      tm.propagateTaint(
        def,
        this,
        this.astNode,
        "ELEMENT",
        "object.setProperty",
      );
    }

    this._props.set(name, def);
    if (markAsArrayElement) this.addArrayElement(def);
    this.bumpVersion();
  }

  getProperty(name: string): Def | null {
    return this._props.get(name) ?? null;
  }

  markOpaqueContainerTaint() {
    this._hasOpaqueContainerTaint = true;
  }

  get hasOpaqueContainerTaint(): boolean {
    return this._hasOpaqueContainerTaint;
  }

  markArrayLike() {
    this._isArrayLike = true;
  }

  get isArrayLike(): boolean {
    return this._isArrayLike;
  }

  addArrayElement(def: Def) {
    const previous = this._arrayElementSummary;
    if (!previous) {
      this._arrayElementSummary = def;
      return;
    }
    if (previous === def) return;
    this._arrayElementSummary = defFactory.createImplicitDef(this.fromNode, [
      previous,
      def,
    ]);
  }

  get arrayElementSummary(): Def | null {
    return this._arrayElementSummary;
  }

  /** Whether a known own field, rather than an opaque whole-object value, is tainted. */
  get hasTaintedOwnProperty(): boolean {
    for (const value of this._props.values()) {
      if (value.isTainted) return true;
    }
    return false;
  }

  /**
   * Dynamic property write: obj[x]
   */
  setUnknown(def: Def) {
    this.setProperty("unknown", def);
  }

  /**
   * Dynamic property read
   */
  getUnknown(): Def | null {
    return this.getProperty("unknown") ?? null;
  }

  /**
   * JavaScript-style property lookup with prototype chain.
   */
  lookupProperty(name: string): Def | null {
    let cur: Def | null = this;
    const visited = new Set<Def>();

    while (cur && cur instanceof ObjectDef) {
      if (visited.has(cur)) break;

      visited.add(cur);

      const own = cur.getProperty(name);
      if (own) return own;

      cur = cur.proto;
    }

    return null;
  }

  cloneShallow(node: FlowNode): ObjectDef {
    return this;
  }

  cloneDeep(node: FlowNode, visited = new Map()): ObjectDef {
    if (visited.has(this)) {
      return visited.get(this) as ObjectDef;
    }

    const obj = new ObjectDef(node);
    visited.set(this, obj);

    obj._hasOpaqueContainerTaint = this._hasOpaqueContainerTaint;
    obj._storageSerialized = this._storageSerialized;
    obj._isArrayLike = this._isArrayLike;
    obj._arrayElementSummary = this._arrayElementSummary
      ? this._arrayElementSummary.cloneDeep(node, visited)
      : null;

    if (this._proto) {
      obj._proto = this._proto.cloneDeep(node, visited);
    }

    for (const [k, v] of this._props) {
      obj._props.set(k, v.cloneDeep(node, visited));
    }

    if (this.isTainted) {
      tm.propagateTaint(this, obj, this.astNode, "COPY", "object.cloneDeep");
    }

    return obj;
  }

  get key(): string {
    const propsSig = [...this._props.entries()]
      .map(([name, def]) => `${name}:${defKeyBrief(def)}`)
      .sort()
      .join(",");

    const protoSig = this._proto ? this._proto.type : "null";

    return ["object", `props{${propsSig}}`, `proto:${protoSig}`].join("|");
  }

  get props() {
    return this._props;
  }

  get proto() {
    return this._proto;
  }

  set proto(p: Def | null) {
    if (this._proto === p) return;
    this._proto = p;
    this.bumpVersion();
  }

  get values() {
    return this._props.values();
  }

  get propsLength(): string {
    return this._props.size.toString();
  }
}

/** ----------------------------------------
 * FunctionDef
 * ---------------------------------------- */
export class FunctionDef extends ObjectDef {
  private _functionNode: Node | null;
  private _prototypeObject?: ObjectDef; // for 'prototype' property (constructor)

  constructor(
    fromNode: FlowNode,
    functionNode: Node | null,
    isConstructable: boolean = true,
  ) {
    // fix: every function default extends from Funciton.prototype
    super(fromNode, BuiltInRegistry.getFunctionPrototype());
    this._type = "function";

    if (functionNode) {
      astValidator.validateFunctionScopeNode(functionNode);
    }

    this._functionNode = functionNode;

    // Class methods/ arrow functions do not have a `prototype` object.
    if (isConstructable) {
      this._prototypeObject = new ObjectDef(
        fromNode,
        BuiltInRegistry.getObjectPrototype(),
      );
      // `prototype.constructor` refers back to itself, which carries the risk of a retain cycle.
      // This needs to be considered during serialization, but is necessary at runtime.
      this._prototypeObject.setProperty("constructor", this);
      this.setProperty("prototype", this._prototypeObject);
    }
  }

  cloneShallow(): FunctionDef {
    return this;
  }

  cloneDeep(): FunctionDef {
    return this;
  }

  override setProperty(name: string, def: Def) {
    super.setProperty(name, def);

    // Keep runtime semantics for `Fn.prototype = obj` in sync with instance creation.
    if (name !== "prototype") return;

    if (Def.isObjectDef(def)) {
      this._prototypeObject = def;
      if (!def.getProperty("constructor")) {
        def.setProperty("constructor", this);
      }
      return;
    }

    // Non-object prototype assignment means `new` should fall back to Object.prototype.
    this._prototypeObject = undefined;
  }

  get key(): string {
    const fnId = this.functionNode
      ? `${this.functionNode.type}@${this.functionNode.range}`
      : "native";

    const protoSig = this.proto ? this.proto.type : "null";

    return ["function", fnId, `proto:${protoSig}`].join("|");
  }

  get functionNode() {
    return this._functionNode;
  }

  get prototypeObject() {
    return this._prototypeObject!;
  }

  set prototypeObject(p: ObjectDef) {
    if (this._prototypeObject === p) return;
    this._prototypeObject = p;
  }

  get functionId() {
    return `${this.functionNode?._id}:${this.functionNode?.range}`;
  }

  getConstructor() {
    return this._prototypeObject?.props.get("constructor") || null;
  }
}

/** ----------------------------------------
 * BuiltInFunctionDef
 * ---------------------------------------- */
export class BuiltInFunctionDef extends FunctionDef {
  private _name: string;
  // The "return value definition" of built-in functions is used in
  // static analysis to construct more accurate results.
  private _semanticExec: BuiltInSemanticExec | null = null;
  private _thisDef: Def | null = null;

  constructor(
    fromNode: FlowNode,
    name: string,
    semanticExec?: BuiltInSemanticExec | null,
  ) {
    super(fromNode, null, true);

    this._name = name;
    this._type = "builtInFunction";
    this._semanticExec = semanticExec ?? null;
  }

  returnDef(
    args: Def[],
    callNode: FlowNode,
    astNode: Node,
    thisDef: Def | null,
  ): Def {
    const result = this._semanticExec?.(
      args,
      callNode,
      astNode,
      thisDef ?? this._thisDef,
    );
    return result ?? defFactory.createUndefinedDef(callNode);
  }

  cloneShallow(): BuiltInFunctionDef {
    return this;
  }

  cloneDeep(): BuiltInFunctionDef {
    return this;
  }

  get key(): string {
    return ["builtin-fn", this._name].join("|");
  }

  get semanticExec() {
    return this._semanticExec;
  }
  set semanticExec(exec: BuiltInSemanticExec | null) {
    if (this._semanticExec === exec) return;
    this._semanticExec = exec;
  }

  get name() {
    return this._name;
  }

  // Explicitly set thisDef
  set thisDef(thisDef: Def) {
    if (this._thisDef === thisDef) return;
    this._thisDef = thisDef;
    this.bumpVersion();
  }
}

/** ----------------------------------------
 * ImplicitDef: Represents a bounded set of possible runtime values.
 * ---------------------------------------- */
export class ImplicitDef extends Def {
  private static readonly MAX_SET_SIZE = 32;

  protected _defs: Set<Def> = new Set();

  constructor(fromNode: FlowNode, defs?: Iterable<Def>) {
    super(fromNode, "implicit");

    if (defs) {
      for (const d of defs) {
        this.add(d);
      }
    }
  }

  /**
   * add new runtime value (UnknownDef not allowed)
   */
  add(def: Def): void {
    const defs = this.flatten(def);
    let changed = false;

    for (const d of defs) {
      if (!this._defs.has(d) && !Def.isUnknownDef(d)) {
        this._defs.add(d);
        changed = true;
      }

      // TODO: Should consider in later
      if (d.isTainted) {
        tm.propagateTaint(d, this, this.astNode, "ELEMENT", "implicit.add");
      }
    }

    // enforce max set size
    if (this._defs.size > ImplicitDef.MAX_SET_SIZE) {
      this.widen();
      return;
    }

    if (changed) this.bumpVersion();
  }

  /**
   * flatten nested ImplicitDefs into array
   */
  private flatten(def: Def): Def[] {
    if (Def.isImplicitDef(def)) {
      return [...def.defs];
    }
    return [def];
  }

  /**
   * union with another ImplicitDef
   */
  union(other: ImplicitDef): void {
    for (const d of other.defs) {
      this.add(d);
    }
  }

  /**
   * widen: replace with UnknownDef when too many
   */
  private widen(): void {
    this._defs.clear();
    const unknown = defFactory.createUnknownDef(this.fromNode);
    this._defs.add(unknown);
    this.bumpVersion();
  }

  cloneShallow(node: FlowNode): Def {
    if (this._defs.size === 0) {
      return new UndefinedDef(node);
    }

    if (this._defs.size === 1) {
      return [...this._defs][0];
    }

    return this;
  }

  cloneDeep(node: FlowNode, visited = new Map()): Def {
    const copy = new ImplicitDef(node);

    for (const d of this._defs) {
      copy.add(d.cloneDeep(node, visited));
    }

    if (this.isTainted) {
      tm.propagateTaint(this, copy, this.astNode, "COPY", "implicit.cloneDeep");
    }

    return copy;
  }

  get key() {
    const sig = [...this._defs]
      .map((d) => `${d.type}:${d.version}`)
      .sort()
      .join(",");

    return `implicit|{${sig}}`;
  }

  /**
   * map operation: applies a function to all defs
   * returns a new ImplicitDef
   */
  map(fn: (def: Def) => Def | null, node: FlowNode): ImplicitDef {
    const result = new ImplicitDef(node);
    for (const d of this._defs) {
      const r = fn(d);
      if (r) result.add(r);
    }
    return result;
  }

  /**
   * iterate over contained defs
   */
  forEach(fn: (def: Def) => void): void {
    this._defs.forEach(fn);
  }

  /**
   * getters
   */
  get defs(): Set<Def> {
    return this._defs;
  }

  get size(): number {
    return this._defs.size;
  }
}

/**
 * ----------------------------------------
 * PromiseDef
 * 
 * TODO: Just for simple use, can be redefined by objectDef
 * ----------------------------------------
 */
export class PromiseDef extends ObjectDef {
  // Def set separately for Promise
  private _resolvedDef: Def | null = null;

  constructor(fromNode: FlowNode, initialResolved?: Def | null) {
    // Promises inherit from Promise.prototype by default.
    super(fromNode, BuiltInRegistry.getPromisePrototype());

    this._type = "promise";

    if (initialResolved) {
      this._resolvedDef = initialResolved;
    }
  }

  resolve(value: Def) {
    if (this._resolvedDef === value) return;
    this._resolvedDef = value;
    this.bumpVersion();
  }

  get resolvedDef(): Def | null {
    return this._resolvedDef;
  }

  cloneShallow(): PromiseDef {
    return this;
  }

  cloneDeep(): PromiseDef {
    return this;
  }

  get key(): string {
    const resolvedSig = this._resolvedDef
      ? defKeyBrief(this._resolvedDef)
      : "pending";

    return ["promise", `resolved:${resolvedSig}`].join("|");
  }
}

/**
 * ----------------------------------------
 * GlobalDef
 * ----------------------------------------
 *
 * Singleton representing the JavaScript global object (globalThis)
 */
export class GlobalDef extends ObjectDef {
  private scope: PageScope;

  constructor(fromNode: FlowNode, scope: PageScope) {
    super(fromNode);
    this.scope = scope;
  }

  cloneShallow(): GlobalDef {
    return this;
  }

  cloneDeep(): GlobalDef {
    return this;
  }

  /**
   * Override property assignment semantics
   */
  override setProperty(name: string, def: Def) {
    const globalVar = this.scope.addGlobalVariable(name);
    if (globalVar) setReachingDef(globalVar, def);
  }

  /**
   * Override property lookup semantics
   */
  override lookupProperty(name: string): Def | null {
    return lookupMatchingDef(name, this.scope);
  }

  get key(): string {
    return "global-object";
  }
}

/** ----------------------------------------
 * UnknownDef
 * ---------------------------------------- */
export class UnknownDef extends Def {
  constructor(fromNode: FlowNode) {
    super(fromNode, "unknown");
  }

  cloneShallow(node: FlowNode) {
    return new UnknownDef(node);
  }

  cloneDeep(node: FlowNode) {
    return new UnknownDef(node);
  }

  get key(): string {
    return "unknown";
  }
}

/**
 * An opaque value with a known primitive runtime kind.
 *
 * This differs from a LiteralDef: the concrete value is not known and taint
 * must still propagate.  It records only a type fact supplied by language
 * semantics, such as `parseInt` always producing a number (or NaN) and
 * `isFinite` always producing a boolean.
 */
export class PrimitiveDef extends UnknownDef {
  readonly primitiveKind: "number" | "boolean";

  constructor(fromNode: FlowNode, primitiveKind: "number" | "boolean") {
    super(fromNode);
    this.primitiveKind = primitiveKind;
  }

  override cloneShallow(node: FlowNode): PrimitiveDef {
    return new PrimitiveDef(node, this.primitiveKind);
  }

  override cloneDeep(node: FlowNode): PrimitiveDef {
    return new PrimitiveDef(node, this.primitiveKind);
  }

  override get key(): string {
    return `primitive:${this.primitiveKind}`;
  }
}

/**
 * A string that may carry taint but whose dynamic pieces are all known to be
 * non-string primitives. It is used for template/formatting output such as
 * `<span>${number.toFixed(2)}</span>`: the extension's static markup remains
 * trusted and attacker data cannot contribute HTML or JavaScript syntax.
 */
export class StringSafeDef extends UnknownDef {
  override cloneShallow(node: FlowNode): StringSafeDef {
    return new StringSafeDef(node);
  }

  override cloneDeep(node: FlowNode): StringSafeDef {
    return new StringSafeDef(node);
  }

  override get key(): string {
    return "string-safe";
  }
}

/**
 * True only when JavaScript cannot parse the value as source text.  Unknown
 * values intentionally remain false.  The fact is used only for sinks that
 * interpret a string as code/HTML; it must never de-taint a value globally,
 * because the same numeric value can still control an Alarm or another
 * privileged configuration API.
 */
export function isDefinitelyNonStringValue(value: Def | undefined): boolean {
  if (!value) return false;
  if (Def.isFunctionDef(value) || Def.isPrimitiveDef(value)) return true;

  if (Def.isLiteralDef(value)) {
    return typeof value.value !== "string";
  }

  if (Def.isImplicitDef(value) && value.size > 0) {
    for (const candidate of value.defs) {
      if (!isDefinitelyNonStringValue(candidate)) return false;
    }
    return true;
  }

  return false;
}

/**
 * True when tainted data cannot influence the grammar of a code/HTML sink.
 * A StringSafeDef may itself be a string, but all tainted interpolations are
 * non-string primitive values and any markup around them is extension-static.
 */
export function isSafeForStringInterpretation(value: Def | undefined): boolean {
  if (!value) return false;
  if (Def.isStringSafeDef(value) || isDefinitelyNonStringValue(value)) {
    return true;
  }

  // Literal strings originate in the extension source and have no dynamic
  // attacker-controlled syntax. (A tainted literal is represented by another
  // Def in this analysis, not by mutating the source literal.)
  if (Def.isLiteralDef(value)) return true;

  if (Def.isImplicitDef(value) && value.size > 0) {
    for (const candidate of value.defs) {
      if (!isSafeForStringInterpretation(candidate)) return false;
    }
    return true;
  }

  return false;
}

/** ----------------------------------------
 * LiteralDef
 * ---------------------------------------- */
// export class LiteralDef extends Def {
//   private readonly _value: string | number | boolean | null;

//   constructor(fromNode: FlowNode, value: string | number | boolean | null) {
//     super(fromNode, "literal");
//     this._value = value;
//   }

//   get value() {
//     return this._value;
//   }

//   cloneShallow(node: FlowNode) {
//     return new LiteralDef(node, this._value);
//   }

//   cloneDeep(node: FlowNode) {
//     return new LiteralDef(node, this._value);
//   }

//   get key(): string {
//     return ["literal", this._value].join("|");
//   }
// }

export class LiteralDef extends ObjectDef {
  private _value: LiteralValue;

  constructor(fromNode: FlowNode, value: LiteralValue) {

    // literals inherit from String.prototype (boxing semantics)
    super(fromNode, BuiltInRegistry.getStringPrototype());

    this._type = "literal";
    this._value = value;
  }

  get value() {
    return this._value;
  }

  set value(v: LiteralValue) {
    if (this._value === v) return;    
    this._value = v;
    this.bumpVersion();
  }

  cloneShallow(node: FlowNode) {
    return new LiteralDef(node, this._value);
  }

  cloneDeep(node: FlowNode) {
    return new LiteralDef(node, this._value);
  }

  get key(): string {
    return ["literal", this._value].join("|");
  }
}

/** ----------------------------------------
 * UndefinedDef
 * ---------------------------------------- */
export class UndefinedDef extends Def {
  constructor(fromNode: FlowNode) {
    super(fromNode, "undefined");
  }

  cloneShallow(node: FlowNode) {
    return new UndefinedDef(node);
  }

  cloneDeep(node: FlowNode) {
    return new UndefinedDef(node);
  }

  get key(): string {
    return "undefined";
  }
}

export default Def;
