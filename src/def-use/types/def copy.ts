// import { Node } from "acorn";
// import { FlowNode } from "../../flownode/flownode";
// import { astValidator } from "../../ast/astValidator";
// import Set from "../../utils/set";
// import { BuiltInSemanticExec } from "../builtins/builtinSemantics/index";
// import { BuiltInRegistry } from "../builtins/builtinRegistry";
// import { defFactory } from "../factories/defFactory";
// import { Errors } from "../../utils/errorCode";
// import { taintManager } from "../../taint";
// import { defGenerator } from "../../utils/uuid";
// import PageScope from "../../scope/pageScope";
// import { lookupMatchingDef, setReachingDef } from "../utils/utils";

// function defKeyBrief(def: Def | null): string {
//   if (!def) return "null";
//   return `${def.type}:${def.version}:${def.isTainted ? 1 : 0}`;
// }

// export type DefType =
//   | "object"
//   | "function"
//   | "unknown"
//   | "literal" // boolean / number / string / bigint / null
//   | "undefined"
//   | "builtInFunction"
//   | "promise"
//   | "implicit";

// /** ----------------------------------------
//  * Base Def
//  * ---------------------------------------- */
// abstract class Def {
//   readonly uniqueId: number;

//   protected _fromNode: FlowNode;
//   protected _type: DefType;
//   // Only record whether this Def is tainted
//   protected _tainted: boolean = false;

//   // semantic version
//   protected _version: number = 0;

//   constructor(fromNode: FlowNode, type: DefType) {
//     Def.validateType(fromNode, type);
//     this._fromNode = fromNode;
//     this._type = type;

//     // Assign global unique ID
//     this.uniqueId = defGenerator.nextId();
//   }

//   /** Static type check helpers */
//   static isObjectDef(def: unknown): def is ObjectDef {
//     return def instanceof ObjectDef;
//   }
//   static isFunctionDef(def: unknown): def is FunctionDef {
//     return def instanceof FunctionDef;
//   }
//   static isUnknownDef(def: unknown): def is UnknownDef {
//     return def instanceof UnknownDef;
//   }
//   static isLiteralDef(def: unknown): def is LiteralDef {
//     return def instanceof LiteralDef;
//   }
//   static isUndefinedDef(def: unknown): def is UndefinedDef {
//     return def instanceof UndefinedDef;
//   }
//   static isImplicitDef(def: unknown): def is ImplicitDef {
//     return def instanceof ImplicitDef;
//   }
//   static isBuiltInFunctionDef(def: unknown): def is BuiltInFunctionDef {
//     return def instanceof BuiltInFunctionDef;
//   }
//   static isPromiseDef(def: unknown): def is PromiseDef {
//     return def instanceof PromiseDef;
//   }

//   /** ----- Validation ----- */
//   static isDef(def: unknown): def is Def {
//     return def instanceof Def;
//   }
//   static isFlowNode(node: unknown): node is FlowNode {
//     return FlowNode.isFlowNode(node);
//   }
//   static isValidType(type: unknown): type is DefType {
//     return typeof type === "string";
//   }

//   static validateType(from: unknown, type: unknown, msg?: string): void {
//     if (!Def.isFlowNode(from) || !Def.isValidType(type)) {
//       Errors.ValidatorError(msg || "Invalid Def initialization arguments");
//     }
//   }

//   get fromNode() {
//     return this._fromNode;
//   }
//   get type() {
//     return this._type;
//   }

//   /**
//    * Subclasses must implement, clone themselves on the new FlowNode.
//    */
//   abstract cloneWithFlowNode(newFlowNode: FlowNode): Def;

//   /**
//    * Subclasses must implement, verify whether they are approximately equal
//    */
//   abstract get key(): string;

//   toString() {
//     return `${this.uniqueId}:${this._type}@${this._fromNode}`;
//   }

//   toJSON(): Record<string, unknown> {
//     return {
//       id: this.uniqueId,
//       type: this._type,
//       fromNode: this._fromNode.toJSON(),
//       tainted: this._tainted,
//     };
//   }

//   /** ---------------- version ---------------- */

//   get version(): number {
//     return this._version;
//   }

//   /** bump when semantic state changes */
//   protected bumpVersion() {
//     this._version++;
//   }

//   markTaintedFlag() {
//     if (this._tainted) return;
//     this._tainted = true;
//   }

//   clearTaintFlag() {
//     if (!this._tainted) return;
//     this._tainted = false;
//   }

//   get isTainted(): boolean {
//     return this._tainted;
//   }
// }

// /** ----------------------------------------
//  * ObjectDef
//  * ---------------------------------------- */
// export class ObjectDef extends Def {
//   protected _props: Map<string, Def>;
//   protected _proto: Def | null = null;

//   constructor(
//     fromNode: FlowNode,
//     props?: Map<string, Def>,
//     proto?: Def | null,
//   ) {
//     super(fromNode, "object");
//     this._props = props ?? new Map();

//     // defaults to global Object.prototype, null for explicit null (e.g.,
//     // Object.create(null)), otherwise Registry.ObjectProto for undefined.
//     this._proto =
//       proto !== undefined
//         ? proto
//         : BuiltInRegistry.getObjectPrototype() || null;
//   }

//   cloneWithFlowNode(): ObjectDef {
//     return this;
//   }

//   setPropertyByName(name: string, def: Def) {
//     const old = this._props.get(name);
//     if (old === def) return;

//     if (def.isTainted) {
//       // TODO: 后续这里要优化掉，不能在这里传播，移出去要，后续可以增加一个判断其属性是否受污染的
//       // 如果取element的时候也需要判断其属性是否收到污染
//       taintManager.propagateTaint(
//         def,
//         this,
//         this.fromNode.astNode!,
//         "ELEMENT",
//         "object.setPropertyByName",
//       );
//     }

//     this._props.set(name, def);
//     this.bumpVersion();
//   }

//   getPropertyByName(name: string): Def | null {
//     return this._props.get(name) ?? null;
//   }

//   /** JS-style property lookup with prototype chain */
//   lookupProperty(name: string): Def | null {
//     let current: Def | null = this;
//     const visited = new Set<Def>();

//     while (current && current instanceof ObjectDef) {
//       if (visited.has(current)) {
//         // console.warn("Detected proto cycle in lookupProperty");
//         break;
//       }
//       visited.add(current);

//       const own = current.getPropertyByName(name);
//       if (own) return own;

//       current = current.proto;
//     }
//     return null;
//   }

//   get key(): string {
//     const propsSig = [...this._props.entries()]
//       .map(([name, def]) => `${name}:${defKeyBrief(def)}`)
//       .sort()
//       .join(",");

//     const protoSig = this._proto ? this._proto.type : "null";

//     return ["object", `props{${propsSig}}`, `proto:${protoSig}`].join("|");
//   }

//   get propsLength(): string {
//     return this._props.size.toString();
//   }

//   get props() {
//     return this._props;
//   }

//   get proto() {
//     return this._proto;
//   }

//   set proto(p: Def | null) {
//     if (this._proto === p) return;
//     this._proto = p;
//     this.bumpVersion();
//   }

//   get values() {
//     return this._props.values();
//   }
// }

// /** ----------------------------------------
//  * FunctionDef
//  * ---------------------------------------- */
// export class FunctionDef extends ObjectDef {
//   private _functionNode: Node | null;
//   private _prototypeObject?: ObjectDef; // for 'prototype' property (constructor)

//   constructor(
//     fromNode: FlowNode,
//     functionNode: Node | null,
//     isConstructable: boolean = true,
//   ) {
//     // fix: every function default extends from Funciton.prototype
//     super(fromNode, undefined, BuiltInRegistry.getFunctionPrototype());
//     this._type = "function";

//     if (functionNode) {
//       astValidator.validateFunctionScopeNode(functionNode);
//     }

//     this._functionNode = functionNode;

//     // Class methods/ arrow functions do not have a `prototype` object.
//     if (isConstructable) {
//       this._prototypeObject = new ObjectDef(
//         fromNode,
//         new Map(),
//         BuiltInRegistry.getObjectPrototype(),
//       );
//       // `prototype.constructor` refers back to itself, which carries the risk of a retain cycle.
//       // This needs to be considered during serialization, but is necessary at runtime.
//       this._prototypeObject.setPropertyByName("constructor", this);
//       this.setPropertyByName("prototype", this._prototypeObject);
//     }
//   }

//   cloneWithFlowNode(): FunctionDef {
//     return this;
//   }

//   get key(): string {
//     const fnId = this.functionNode
//       ? `${this.functionNode.type}@${this.functionNode.range}`
//       : "native";

//     const protoSig = this.proto ? this.proto.type : "null";

//     return ["function", fnId, `proto:${protoSig}`].join("|");
//   }

//   get functionNode() {
//     return this._functionNode;
//   }

//   get prototypeObject() {
//     return this._prototypeObject!;
//   }

//   set prototypeObject(p: ObjectDef) {
//     if (this._prototypeObject === p) return;
//     this._prototypeObject = p;
//   }

//   get functionId() {
//     return `${this.functionNode?._id}:${this.functionNode?.range}`;
//   }

//   getConstructor() {
//     return this._prototypeObject?.props.get("constructor") || null;
//   }
// }

// /** ----------------------------------------
//  * UnknownDef
//  * ---------------------------------------- */
// export class UnknownDef extends Def {
//   constructor(fromNode: FlowNode) {
//     super(fromNode, "unknown");
//   }

//   cloneWithFlowNode(newNode: FlowNode) {
//     return new UnknownDef(newNode);
//   }

//   get key(): string {
//     return "unknown";
//   }

//   toJSON() {
//     return {
//       type: this._type,
//       fromNode: this._fromNode.toJSON(),
//       tainted: this._tainted,
//     };
//   }
// }

// /** ----------------------------------------
//  * LiteralDef
//  * ---------------------------------------- */
// export class LiteralDef extends Def {
//   private readonly _value: string | number | boolean | null;
//   constructor(fromNode: FlowNode, value: string | number | boolean | null) {
//     super(fromNode, "literal");
//     this._value = value;
//   }

//   get value() {
//     return this._value;
//   }

//   cloneWithFlowNode(newNode: FlowNode) {
//     return new LiteralDef(newNode, this._value);
//   }

//   get key(): string {
//     return ["literal", this._value].join("|");
//   }

//   toJSON() {
//     return {
//       type: this._type,
//       value: this._value,
//       fromNode: this._fromNode.toJSON(),
//       tainted: this._tainted,
//     };
//   }
// }

// /** ----------------------------------------
//  * UndefinedDef
//  * ---------------------------------------- */
// export class UndefinedDef extends Def {
//   constructor(fromNode: FlowNode) {
//     super(fromNode, "undefined");
//   }

//   cloneWithFlowNode(newFlowNode: FlowNode) {
//     return new UndefinedDef(newFlowNode);
//   }

//   get key(): string {
//     return "undefined";
//   }
// }

// /** ----------------------------------------
//  * BuiltInFunctionDef
//  * ---------------------------------------- */
// export class BuiltInFunctionDef extends FunctionDef {
//   private _name: string;
//   // The "return value definition" of built-in functions is used in
//   // static analysis to construct more accurate results.
//   private _semanticExec: BuiltInSemanticExec | null = null;
//   private _thisDef: Def | null = null;

//   constructor(
//     fromNode: FlowNode,
//     name: string,
//     semanticExec?: BuiltInSemanticExec | null,
//   ) {
//     super(fromNode, null, true);

//     this._name = name;
//     this._type = "builtInFunction";
//     this._semanticExec = semanticExec ?? null;
//   }

//   returnDef(
//     args: Def[],
//     callNode: FlowNode,
//     astNode: Node,
//     thisDef: Def | null,
//   ): Def {
//     const result = this._semanticExec?.(
//       args,
//       callNode,
//       astNode,
//       thisDef ?? this._thisDef,
//     );
//     return result ?? defFactory.createUndefinedDef(callNode);
//   }

//   cloneWithFlowNode(): BuiltInFunctionDef {
//     return this;
//   }

//   get key(): string {
//     return ["builtin-fn", this._name].join("|");
//   }

//   toJSON() {
//     return {
//       type: this._type,
//       fromNode: this.fromNode.toJSON(),
//       semanticExec: this._semanticExec ?? null,
//     };
//   }

//   get semanticExec() {
//     return this._semanticExec;
//   }
//   set semanticExec(exec: BuiltInSemanticExec | null) {
//     if (this._semanticExec === exec) return;
//     this._semanticExec = exec;
//   }

//   get name() {
//     return this._name;
//   }

//   // Explicitly set thisDef
//   set thisDef(thisDef: Def) {
//     if (this._thisDef === thisDef) return;
//     this._thisDef = thisDef;
//     this.bumpVersion();
//   }
// }

// /** ----------------------------------------
//  * ImplicitDef: Represents a bounded set of possible runtime values.
//  * ---------------------------------------- */
// export class ImplicitDef extends Def {
//   private static readonly MAX_SET_SIZE = 32;

//   protected _defs: Set<Def>;

//   constructor(fromNode: FlowNode, defs?: Iterable<Def>) {
//     super(fromNode, "implicit");
//     this._defs = new Set();

//     if (defs) {
//       for (const d of defs) {
//         this.add(d);
//       }
//     }
//   }

//   /** ----------------------------------------
//    * clone with a new flow node
//    * ---------------------------------------- */
//   cloneWithFlowNode(newFlowNode: FlowNode): Def {
//     const defsArray = [...this._defs];

//     if (defsArray.length === 0 ){
//       return new UndefinedDef(newFlowNode);
//     }

//     if (defsArray.length === 1) {
//       // If only one def, consider returning it directly
//       return defsArray[0];
//     }

//     // TODO: Implement deep vs shallow copy logic
//     return this;
//   }

//   /** ----------------------------------------
//    * unique key for reaching-def deduplication
//    * ---------------------------------------- */
//   get key(): string {
//     // Sorting keys ensures consistent dedup across different orderings
//     const sig = [...this._defs].map(defKeyBrief).sort().join(",");
//     return `implicit|{${sig}}`;
//   }

//   /** ----------------------------------------
//    * flatten nested ImplicitDefs into array
//    * ---------------------------------------- */
//   private flatten(def: Def): Def[] {
//     if (Def.isImplicitDef(def)) {
//       return [...def.defs];
//     }
//     return [def];
//   }

//   /** ----------------------------------------
//    * add new runtime value (UnknownDef not allowed)
//    * ---------------------------------------- */
//   add(def: Def): void {
//     const defs = this.flatten(def);
//     let changed = false;

//     for (const d of defs) {
//       if (!this._defs.has(d) && !Def.isUnknownDef(d)) {
//         this._defs.add(d);
//         changed = true;
//       }
//     }

//     // enforce max set size
//     if (this._defs.size > ImplicitDef.MAX_SET_SIZE) {
//       this.widen();
//       return;
//     }

//     if (changed) this.bumpVersion();
//   }

//   /** ----------------------------------------
//    * union with another ImplicitDef
//    * ---------------------------------------- */
//   union(other: ImplicitDef): void {
//     for (const d of other.defs) {
//       this.add(d);
//     }
//   }

//   /** ----------------------------------------
//    * widen: replace with UnknownDef when too many
//    * ---------------------------------------- */
//   private widen(): void {
//     this._defs.clear();
//     const unknown = defFactory.createUnknownDef(this.fromNode);
//     this._defs.add(unknown);
//     this.bumpVersion();
//   }

//   /** ----------------------------------------
//    * map operation: applies a function to all defs
//    * returns a new ImplicitDef
//    * ---------------------------------------- */
//   map(fn: (def: Def) => Def | null, node: FlowNode): ImplicitDef {
//     const result = new ImplicitDef(node);
//     for (const d of this._defs) {
//       const r = fn(d);
//       if (r) result.add(r);
//     }
//     return result;
//   }

//   /** ----------------------------------------
//    * iterate over contained defs
//    * ---------------------------------------- */
//   forEach(fn: (def: Def) => void): void {
//     this._defs.forEach(fn);
//   }

//   /** ----------------------------------------
//    * getters
//    * ---------------------------------------- */
//   get defs(): Set<Def> {
//     return this._defs;
//   }

//   get size(): number {
//     return this._defs.size;
//   }

//   /** ----------------------------------------
//    * serialization
//    * ---------------------------------------- */
//   toJSON() {
//     return {
//       type: "implicit",
//       fromNode: this.fromNode.toJSON(),
//       defs: [...this._defs].map((d) => d.uniqueId),
//       tainted: this._tainted,
//     };
//   }
// }

// export class PromiseDef extends ObjectDef {
//   // Def set separately for Promise
//   private _resolvedDef: Def | null = null;

//   constructor(fromNode: FlowNode, initialResolved?: Def | null) {
//     // Promises inherit from Promise.prototype by default.
//     super(fromNode, undefined, BuiltInRegistry.getPromisePrototype());

//     this._type = "promise";

//     if (initialResolved) {
//       this._resolvedDef = initialResolved;
//     }
//   }

//   resolve(value: Def) {
//     if (this._resolvedDef === value) return;
//     this._resolvedDef = value;
//     this.bumpVersion();
//   }

//   get resolvedDef(): Def | null {
//     return this._resolvedDef;
//   }

//   cloneWithFlowNode(): PromiseDef {
//     return this;
//   }

//   get key(): string {
//     const resolvedSig = this._resolvedDef
//       ? defKeyBrief(this._resolvedDef)
//       : "pending";

//     return ["promise", `resolved:${resolvedSig}`].join("|");
//   }
// }

// /**
//  * GlobalDef
//  * Singleton representing the JavaScript global object (globalThis)
//  */
// export class GlobalDef extends ObjectDef {
//   private scope: PageScope;

//   constructor(fromNode: FlowNode, scope: PageScope) {
//     super(fromNode);
//     this.scope = scope;
//   }

//   /**
//    * Global identity is constant - always returns the same instance
//    */
//   cloneWithFlowNode(): this {
//     return this;
//   }

//   /**
//    * Override property assignment semantics
//    */
//   override setPropertyByName(name: string, def: Def) {
//     const globalVar = this.scope.addGlobalVariable(name);
//     if (globalVar) setReachingDef(globalVar, def);
//   }

//   /**
//    * Override property lookup semantics
//    */
//   override lookupProperty(name: string): Def | null {
//     return lookupMatchingDef(name, this.scope);
//   }

//   /** Constant key representing global identity */
//   get key(): string {
//     return "global-object";
//   }
// }

// export default Def;
