"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UndefinedDef = exports.LiteralDef = exports.UnknownDef = exports.GlobalDef = exports.PromiseDef = exports.ImplicitDef = exports.BuiltInFunctionDef = exports.FunctionDef = exports.ObjectDef = void 0;
const flownode_1 = require("../../flownode/flownode");
const astValidator_1 = require("../../ast/astValidator");
const set_1 = __importDefault(require("../../utils/set"));
const builtinRegistry_1 = require("../builtins/builtinRegistry");
const defFactory_1 = require("../factories/defFactory");
const errorCode_1 = require("../../utils/errorCode");
const taint_1 = require("../../taint");
const uuid_1 = require("../../utils/uuid");
const utils_1 = require("../utils/utils");
/**
 * Helper: brief key for nested structures
 */
function defKeyBrief(def) {
    if (!def)
        return "null";
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
class Def {
    constructor(fromNode, type) {
        // Only record whether this Def is tainted
        this._tainted = false;
        // semantic version
        this._version = 0;
        // Def.validateType(fromNode, type);
        this._fromNode = fromNode;
        this._type = type;
        this.uniqueId = uuid_1.defGenerator.nextId();
    }
    /** Static type check helpers */
    static isObjectDef(def) {
        return def instanceof ObjectDef;
    }
    static isFunctionDef(def) {
        return def instanceof FunctionDef;
    }
    static isUnknownDef(def) {
        return def instanceof UnknownDef;
    }
    static isLiteralDef(def) {
        return def instanceof LiteralDef;
    }
    static isUndefinedDef(def) {
        return def instanceof UndefinedDef;
    }
    static isImplicitDef(def) {
        return def instanceof ImplicitDef;
    }
    static isBuiltInFunctionDef(def) {
        return def instanceof BuiltInFunctionDef;
    }
    static isPromiseDef(def) {
        return def instanceof PromiseDef;
    }
    /** Validation */
    static isDef(def) {
        return def instanceof Def;
    }
    static isFlowNode(node) {
        return flownode_1.FlowNode.isFlowNode(node);
    }
    static isValidType(type) {
        return typeof type === "string";
    }
    static validateType(from, type, msg) {
        if (!Def.isFlowNode(from) || !Def.isValidType(type)) {
            errorCode_1.Errors.ValidatorError(msg || "Invalid Def initialization arguments");
        }
    }
    /** creation node */
    get fromNode() {
        return this._fromNode;
    }
    /** ast node */
    get astNode() {
        return this._fromNode.astNode;
    }
    /** value type */
    get type() {
        return this._type;
    }
    /** semantic version */
    get version() {
        return this._version;
    }
    bumpVersion() {
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
class ObjectDef extends Def {
    constructor(fromNode, proto) {
        super(fromNode, "object");
        this._props = new Map();
        this._proto = null;
        // defaults to global Object.prototype, null for explicit null (e.g.,
        // Object.create(null)), otherwise Registry.ObjectProto for undefined.
        this._proto = proto !== null && proto !== void 0 ? proto : builtinRegistry_1.BuiltInRegistry.getObjectPrototype();
    }
    setProperty(name, def) {
        const old = this._props.get(name);
        if (old === def)
            return;
        if (def.isTainted) {
            taint_1.taintManager.propagateTaint(def, this, this.astNode, "ELEMENT", "object.setProperty");
        }
        this._props.set(name, def);
        this.bumpVersion();
    }
    getProperty(name) {
        var _a;
        return (_a = this._props.get(name)) !== null && _a !== void 0 ? _a : null;
    }
    /**
     * Dynamic property write: obj[x]
     */
    setUnknown(def) {
        this.setProperty("unknown", def);
    }
    /**
     * Dynamic property read
     */
    getUnknown() {
        var _a;
        return (_a = this.getProperty("unknown")) !== null && _a !== void 0 ? _a : null;
    }
    /**
     * JavaScript-style property lookup with prototype chain.
     */
    lookupProperty(name) {
        let cur = this;
        const visited = new set_1.default();
        while (cur && cur instanceof ObjectDef) {
            if (visited.has(cur))
                break;
            visited.add(cur);
            const own = cur.getProperty(name);
            if (own)
                return own;
            cur = cur.proto;
        }
        return null;
    }
    cloneShallow(node) {
        return this;
    }
    cloneDeep(node, visited = new Map()) {
        if (visited.has(this)) {
            return visited.get(this);
        }
        const obj = new ObjectDef(node);
        visited.set(this, obj);
        if (this._proto) {
            obj._proto = this._proto.cloneDeep(node, visited);
        }
        for (const [k, v] of this._props) {
            obj._props.set(k, v.cloneDeep(node, visited));
        }
        if (this.isTainted) {
            taint_1.taintManager.propagateTaint(this, obj, this.astNode, "COPY", "object.cloneDeep");
        }
        return obj;
    }
    get key() {
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
    set proto(p) {
        if (this._proto === p)
            return;
        this._proto = p;
        this.bumpVersion();
    }
    get values() {
        return this._props.values();
    }
    get propsLength() {
        return this._props.size.toString();
    }
}
exports.ObjectDef = ObjectDef;
/** ----------------------------------------
 * FunctionDef
 * ---------------------------------------- */
class FunctionDef extends ObjectDef {
    constructor(fromNode, functionNode, isConstructable = true) {
        // fix: every function default extends from Funciton.prototype
        super(fromNode, builtinRegistry_1.BuiltInRegistry.getFunctionPrototype());
        this._type = "function";
        if (functionNode) {
            astValidator_1.astValidator.validateFunctionScopeNode(functionNode);
        }
        this._functionNode = functionNode;
        // Class methods/ arrow functions do not have a `prototype` object.
        if (isConstructable) {
            this._prototypeObject = new ObjectDef(fromNode, builtinRegistry_1.BuiltInRegistry.getObjectPrototype());
            // `prototype.constructor` refers back to itself, which carries the risk of a retain cycle.
            // This needs to be considered during serialization, but is necessary at runtime.
            this._prototypeObject.setProperty("constructor", this);
            this.setProperty("prototype", this._prototypeObject);
        }
    }
    cloneShallow() {
        return this;
    }
    cloneDeep() {
        return this;
    }
    setProperty(name, def) {
        super.setProperty(name, def);
        // Keep runtime semantics for `Fn.prototype = obj` in sync with instance creation.
        if (name !== "prototype")
            return;
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
    get key() {
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
        return this._prototypeObject;
    }
    set prototypeObject(p) {
        if (this._prototypeObject === p)
            return;
        this._prototypeObject = p;
    }
    get functionId() {
        var _a, _b;
        return `${(_a = this.functionNode) === null || _a === void 0 ? void 0 : _a._id}:${(_b = this.functionNode) === null || _b === void 0 ? void 0 : _b.range}`;
    }
    getConstructor() {
        var _a;
        return ((_a = this._prototypeObject) === null || _a === void 0 ? void 0 : _a.props.get("constructor")) || null;
    }
}
exports.FunctionDef = FunctionDef;
/** ----------------------------------------
 * BuiltInFunctionDef
 * ---------------------------------------- */
class BuiltInFunctionDef extends FunctionDef {
    constructor(fromNode, name, semanticExec) {
        super(fromNode, null, true);
        // The "return value definition" of built-in functions is used in
        // static analysis to construct more accurate results.
        this._semanticExec = null;
        this._thisDef = null;
        this._name = name;
        this._type = "builtInFunction";
        this._semanticExec = semanticExec !== null && semanticExec !== void 0 ? semanticExec : null;
    }
    returnDef(args, callNode, astNode, thisDef) {
        var _a;
        const result = (_a = this._semanticExec) === null || _a === void 0 ? void 0 : _a.call(this, args, callNode, astNode, thisDef !== null && thisDef !== void 0 ? thisDef : this._thisDef);
        return result !== null && result !== void 0 ? result : defFactory_1.defFactory.createUndefinedDef(callNode);
    }
    cloneShallow() {
        return this;
    }
    cloneDeep() {
        return this;
    }
    get key() {
        return ["builtin-fn", this._name].join("|");
    }
    get semanticExec() {
        return this._semanticExec;
    }
    set semanticExec(exec) {
        if (this._semanticExec === exec)
            return;
        this._semanticExec = exec;
    }
    get name() {
        return this._name;
    }
    // Explicitly set thisDef
    set thisDef(thisDef) {
        if (this._thisDef === thisDef)
            return;
        this._thisDef = thisDef;
        this.bumpVersion();
    }
}
exports.BuiltInFunctionDef = BuiltInFunctionDef;
/** ----------------------------------------
 * ImplicitDef: Represents a bounded set of possible runtime values.
 * ---------------------------------------- */
class ImplicitDef extends Def {
    constructor(fromNode, defs) {
        super(fromNode, "implicit");
        this._defs = new set_1.default();
        if (defs) {
            for (const d of defs) {
                this.add(d);
            }
        }
    }
    /**
     * add new runtime value (UnknownDef not allowed)
     */
    add(def) {
        const defs = this.flatten(def);
        let changed = false;
        for (const d of defs) {
            if (!this._defs.has(d) && !Def.isUnknownDef(d)) {
                this._defs.add(d);
                changed = true;
            }
            // TODO: Should consider in later
            if (d.isTainted) {
                taint_1.taintManager.propagateTaint(d, this, this.astNode, "ELEMENT", "implicit.add");
            }
        }
        // enforce max set size
        if (this._defs.size > ImplicitDef.MAX_SET_SIZE) {
            this.widen();
            return;
        }
        if (changed)
            this.bumpVersion();
    }
    /**
     * flatten nested ImplicitDefs into array
     */
    flatten(def) {
        if (Def.isImplicitDef(def)) {
            return [...def.defs];
        }
        return [def];
    }
    /**
     * union with another ImplicitDef
     */
    union(other) {
        for (const d of other.defs) {
            this.add(d);
        }
    }
    /**
     * widen: replace with UnknownDef when too many
     */
    widen() {
        this._defs.clear();
        const unknown = defFactory_1.defFactory.createUnknownDef(this.fromNode);
        this._defs.add(unknown);
        this.bumpVersion();
    }
    cloneShallow(node) {
        if (this._defs.size === 0) {
            return new UndefinedDef(node);
        }
        if (this._defs.size === 1) {
            return [...this._defs][0];
        }
        return this;
    }
    cloneDeep(node, visited = new Map()) {
        const copy = new ImplicitDef(node);
        for (const d of this._defs) {
            copy.add(d.cloneDeep(node, visited));
        }
        if (this.isTainted) {
            taint_1.taintManager.propagateTaint(this, copy, this.astNode, "COPY", "implicit.cloneDeep");
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
    map(fn, node) {
        const result = new ImplicitDef(node);
        for (const d of this._defs) {
            const r = fn(d);
            if (r)
                result.add(r);
        }
        return result;
    }
    /**
     * iterate over contained defs
     */
    forEach(fn) {
        this._defs.forEach(fn);
    }
    /**
     * getters
     */
    get defs() {
        return this._defs;
    }
    get size() {
        return this._defs.size;
    }
}
exports.ImplicitDef = ImplicitDef;
ImplicitDef.MAX_SET_SIZE = 32;
/**
 * ----------------------------------------
 * PromiseDef
 *
 * TODO: Just for simple use, can be redefined by objectDef
 * ----------------------------------------
 */
class PromiseDef extends ObjectDef {
    constructor(fromNode, initialResolved) {
        // Promises inherit from Promise.prototype by default.
        super(fromNode, builtinRegistry_1.BuiltInRegistry.getPromisePrototype());
        // Def set separately for Promise
        this._resolvedDef = null;
        this._type = "promise";
        if (initialResolved) {
            this._resolvedDef = initialResolved;
        }
    }
    resolve(value) {
        if (this._resolvedDef === value)
            return;
        this._resolvedDef = value;
        this.bumpVersion();
    }
    get resolvedDef() {
        return this._resolvedDef;
    }
    cloneShallow() {
        return this;
    }
    cloneDeep() {
        return this;
    }
    get key() {
        const resolvedSig = this._resolvedDef
            ? defKeyBrief(this._resolvedDef)
            : "pending";
        return ["promise", `resolved:${resolvedSig}`].join("|");
    }
}
exports.PromiseDef = PromiseDef;
/**
 * ----------------------------------------
 * GlobalDef
 * ----------------------------------------
 *
 * Singleton representing the JavaScript global object (globalThis)
 */
class GlobalDef extends ObjectDef {
    constructor(fromNode, scope) {
        super(fromNode);
        this.scope = scope;
    }
    cloneShallow() {
        return this;
    }
    cloneDeep() {
        return this;
    }
    /**
     * Override property assignment semantics
     */
    setProperty(name, def) {
        const globalVar = this.scope.addGlobalVariable(name);
        if (globalVar)
            (0, utils_1.setReachingDef)(globalVar, def);
    }
    /**
     * Override property lookup semantics
     */
    lookupProperty(name) {
        return (0, utils_1.lookupMatchingDef)(name, this.scope);
    }
    get key() {
        return "global-object";
    }
}
exports.GlobalDef = GlobalDef;
/** ----------------------------------------
 * UnknownDef
 * ---------------------------------------- */
class UnknownDef extends Def {
    constructor(fromNode) {
        super(fromNode, "unknown");
    }
    cloneShallow(node) {
        return new UnknownDef(node);
    }
    cloneDeep(node) {
        return new UnknownDef(node);
    }
    get key() {
        return "unknown";
    }
}
exports.UnknownDef = UnknownDef;
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
class LiteralDef extends ObjectDef {
    constructor(fromNode, value) {
        // literals inherit from String.prototype (boxing semantics)
        super(fromNode, builtinRegistry_1.BuiltInRegistry.getStringPrototype());
        this._type = "literal";
        this._value = value;
    }
    get value() {
        return this._value;
    }
    set value(v) {
        if (this._value === v)
            return;
        this._value = v;
        this.bumpVersion();
    }
    cloneShallow(node) {
        return new LiteralDef(node, this._value);
    }
    cloneDeep(node) {
        return new LiteralDef(node, this._value);
    }
    get key() {
        return ["literal", this._value].join("|");
    }
}
exports.LiteralDef = LiteralDef;
/** ----------------------------------------
 * UndefinedDef
 * ---------------------------------------- */
class UndefinedDef extends Def {
    constructor(fromNode) {
        super(fromNode, "undefined");
    }
    cloneShallow(node) {
        return new UndefinedDef(node);
    }
    cloneDeep(node) {
        return new UndefinedDef(node);
    }
    get key() {
        return "undefined";
    }
}
exports.UndefinedDef = UndefinedDef;
exports.default = Def;
