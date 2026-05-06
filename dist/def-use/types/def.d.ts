import { Node } from "acorn";
import { FlowNode } from "../../flownode/flownode";
import Set from "../../utils/set";
import { BuiltInSemanticExec } from "../builtins/builtinSemantics/index";
import PageScope from "../../scope/pageScope";
export type LiteralValue = string | number | boolean | null;
export type DefType = "object" | "function" | "unknown" | "literal" | "undefined" | "builtInFunction" | "promise" | "implicit" | "pseudo";
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
declare abstract class Def {
    readonly uniqueId: number;
    protected _type: DefType;
    protected _fromNode: FlowNode;
    protected _tainted: boolean;
    protected _version: number;
    constructor(fromNode: FlowNode, type: DefType);
    /** Static type check helpers */
    static isObjectDef(def: unknown): def is ObjectDef;
    static isFunctionDef(def: unknown): def is FunctionDef;
    static isUnknownDef(def: unknown): def is UnknownDef;
    static isLiteralDef(def: unknown): def is LiteralDef;
    static isUndefinedDef(def: unknown): def is UndefinedDef;
    static isImplicitDef(def: unknown): def is ImplicitDef;
    static isBuiltInFunctionDef(def: unknown): def is BuiltInFunctionDef;
    static isPromiseDef(def: unknown): def is PromiseDef;
    /** Validation */
    static isDef(def: unknown): def is Def;
    static isFlowNode(node: unknown): node is FlowNode;
    static isValidType(type: unknown): type is DefType;
    static validateType(from: unknown, type: unknown, msg?: string): void;
    /** creation node */
    get fromNode(): FlowNode;
    /** ast node */
    get astNode(): Node;
    /** value type */
    get type(): DefType;
    /** semantic version */
    get version(): number;
    protected bumpVersion(): void;
    /** taint flag */
    get isTainted(): boolean;
    markTaintedFlag(): void;
    clearTaintFlag(): void;
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
    toString(): string;
}
/**
 * ========================================
 * ObjectDef
 * ========================================
 *
 * Represents a JavaScript heap object.
 */
export declare class ObjectDef extends Def {
    protected _props: Map<string, Def>;
    protected _proto: Def | null;
    constructor(fromNode: FlowNode, proto?: Def | null);
    setProperty(name: string, def: Def): void;
    getProperty(name: string): Def | null;
    /**
     * Dynamic property write: obj[x]
     */
    setUnknown(def: Def): void;
    /**
     * Dynamic property read
     */
    getUnknown(): Def | null;
    /**
     * JavaScript-style property lookup with prototype chain.
     */
    lookupProperty(name: string): Def | null;
    cloneShallow(node: FlowNode): ObjectDef;
    cloneDeep(node: FlowNode, visited?: Map<any, any>): ObjectDef;
    get key(): string;
    get props(): Map<string, Def>;
    get proto(): Def | null;
    set proto(p: Def | null);
    get values(): MapIterator<Def>;
    get propsLength(): string;
}
/** ----------------------------------------
 * FunctionDef
 * ---------------------------------------- */
export declare class FunctionDef extends ObjectDef {
    private _functionNode;
    private _prototypeObject?;
    constructor(fromNode: FlowNode, functionNode: Node | null, isConstructable?: boolean);
    cloneShallow(): FunctionDef;
    cloneDeep(): FunctionDef;
    setProperty(name: string, def: Def): void;
    get key(): string;
    get functionNode(): Node | null;
    get prototypeObject(): ObjectDef;
    set prototypeObject(p: ObjectDef);
    get functionId(): string;
    getConstructor(): Def | null;
}
/** ----------------------------------------
 * BuiltInFunctionDef
 * ---------------------------------------- */
export declare class BuiltInFunctionDef extends FunctionDef {
    private _name;
    private _semanticExec;
    private _thisDef;
    constructor(fromNode: FlowNode, name: string, semanticExec?: BuiltInSemanticExec | null);
    returnDef(args: Def[], callNode: FlowNode, astNode: Node, thisDef: Def | null): Def;
    cloneShallow(): BuiltInFunctionDef;
    cloneDeep(): BuiltInFunctionDef;
    get key(): string;
    get semanticExec(): BuiltInSemanticExec | null;
    set semanticExec(exec: BuiltInSemanticExec | null);
    get name(): string;
    set thisDef(thisDef: Def);
}
/** ----------------------------------------
 * ImplicitDef: Represents a bounded set of possible runtime values.
 * ---------------------------------------- */
export declare class ImplicitDef extends Def {
    private static readonly MAX_SET_SIZE;
    protected _defs: Set<Def>;
    constructor(fromNode: FlowNode, defs?: Iterable<Def>);
    /**
     * add new runtime value (UnknownDef not allowed)
     */
    add(def: Def): void;
    /**
     * flatten nested ImplicitDefs into array
     */
    private flatten;
    /**
     * union with another ImplicitDef
     */
    union(other: ImplicitDef): void;
    /**
     * widen: replace with UnknownDef when too many
     */
    private widen;
    cloneShallow(node: FlowNode): Def;
    cloneDeep(node: FlowNode, visited?: Map<any, any>): Def;
    get key(): string;
    /**
     * map operation: applies a function to all defs
     * returns a new ImplicitDef
     */
    map(fn: (def: Def) => Def | null, node: FlowNode): ImplicitDef;
    /**
     * iterate over contained defs
     */
    forEach(fn: (def: Def) => void): void;
    /**
     * getters
     */
    get defs(): Set<Def>;
    get size(): number;
}
/**
 * ----------------------------------------
 * PromiseDef
 *
 * TODO: Just for simple use, can be redefined by objectDef
 * ----------------------------------------
 */
export declare class PromiseDef extends ObjectDef {
    private _resolvedDef;
    constructor(fromNode: FlowNode, initialResolved?: Def | null);
    resolve(value: Def): void;
    get resolvedDef(): Def | null;
    cloneShallow(): PromiseDef;
    cloneDeep(): PromiseDef;
    get key(): string;
}
/**
 * ----------------------------------------
 * GlobalDef
 * ----------------------------------------
 *
 * Singleton representing the JavaScript global object (globalThis)
 */
export declare class GlobalDef extends ObjectDef {
    private scope;
    constructor(fromNode: FlowNode, scope: PageScope);
    cloneShallow(): GlobalDef;
    cloneDeep(): GlobalDef;
    /**
     * Override property assignment semantics
     */
    setProperty(name: string, def: Def): void;
    /**
     * Override property lookup semantics
     */
    lookupProperty(name: string): Def | null;
    get key(): string;
}
/** ----------------------------------------
 * UnknownDef
 * ---------------------------------------- */
export declare class UnknownDef extends Def {
    constructor(fromNode: FlowNode);
    cloneShallow(node: FlowNode): UnknownDef;
    cloneDeep(node: FlowNode): UnknownDef;
    get key(): string;
}
/** ----------------------------------------
 * LiteralDef
 * ---------------------------------------- */
export declare class LiteralDef extends ObjectDef {
    private _value;
    constructor(fromNode: FlowNode, value: LiteralValue);
    get value(): LiteralValue;
    set value(v: LiteralValue);
    cloneShallow(node: FlowNode): LiteralDef;
    cloneDeep(node: FlowNode): LiteralDef;
    get key(): string;
}
/** ----------------------------------------
 * UndefinedDef
 * ---------------------------------------- */
export declare class UndefinedDef extends Def {
    constructor(fromNode: FlowNode);
    cloneShallow(node: FlowNode): UndefinedDef;
    cloneDeep(node: FlowNode): UndefinedDef;
    get key(): string;
}
export default Def;
