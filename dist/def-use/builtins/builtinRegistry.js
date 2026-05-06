"use strict";
// builtinRegistry.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuiltInRegistry = void 0;
const flownodeFactory_1 = require("../../flownode/flownodeFactory");
const taint_1 = require("../../taint");
const defFactory_1 = require("../factories/defFactory");
const def_1 = __importDefault(require("../types/def"));
const builtins_1 = __importDefault(require("./builtins"));
// import { BuiltInSemantics } from "./builtinSemantics";
const index_1 = require("./builtinSemantics/index");
/**
 * ======================================================
 * Built-in Registry
 * Build all JS built-in semantic objects from schema
 * ======================================================
 */
class BuiltInRegistry {
    /* ======================================================
     * Initialization
     * ====================================================== */
    /**
     * Initialize all built-in definitions.
     * This method is idempotent.
     */
    static initialize() {
        if (this.initialized)
            return;
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
        var _a;
        for (const schema of builtins_1.default) {
            if (schema.type !== "object")
                continue;
            const objDef = this.registry.get(schema.name);
            if (!def_1.default.isObjectDef(objDef))
                continue;
            const props = (_a = schema.props) !== null && _a !== void 0 ? _a : {};
            this.walkAttributeSchemas(objDef, props);
        }
    }
    /**
     * Recursively walk attribute schemas and register taint sources.
     */
    static walkAttributeSchemas(owner, props) {
        var _a;
        for (const [propName, desc] of Object.entries(props)) {
            if (desc.type === "attribute") {
                if (!desc.sourceType)
                    continue;
                const attr = owner.lookupProperty(propName);
                if (!attr)
                    continue;
                taint_1.taintManager.createTaintSource(attr, desc.sourceType, null, false, desc.name);
                continue;
            }
            if (desc.type === "object") {
                const child = owner.lookupProperty(propName);
                if (def_1.default.isObjectDef(child)) {
                    this.walkAttributeSchemas(child, (_a = desc.props) !== null && _a !== void 0 ? _a : {});
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
    static createPrototypes() {
        for (const schema of builtins_1.default) {
            if (schema.type !== "constructor")
                continue;
            if (!this.prototypes.has(schema.prototypeName)) {
                const proto = defFactory_1.defFactory.createObjectDef(this.rootNode);
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
    static createConstructors() {
        for (const schema of builtins_1.default) {
            if (schema.type !== "constructor")
                continue;
            const ctorSchema = schema;
            const ctor = defFactory_1.defFactory.createFunctionDef(this.rootNode, null);
            const proto = this.prototypes.get(ctorSchema.prototypeName);
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
    static createObjects() {
        for (const schema of builtins_1.default) {
            if (schema.type !== "object")
                continue;
            const objSchema = schema;
            const obj = defFactory_1.defFactory.createObjectDef(this.rootNode);
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
    static createStandaloneFunctions() {
        for (const schema of builtins_1.default) {
            if (schema.type !== "function")
                continue;
            const fnSchema = schema;
            const fn = defFactory_1.defFactory.createBuiltInFunctionDef(this.rootNode, fnSchema.name);
            if (fnSchema.effect) {
                fn.semanticExec = index_1.BuiltInSemantics.get(fnSchema.effect);
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
    static wireConstructorProtoChain() {
        var _a;
        for (const schema of builtins_1.default) {
            if (schema.type !== "constructor")
                continue;
            const ctorSchema = schema;
            if (!ctorSchema.proto)
                continue;
            const ctor = this.registry.get(ctorSchema.name);
            const parent = this.registry.get(ctorSchema.proto);
            if (def_1.default.isFunctionDef(ctor) && def_1.default.isFunctionDef(parent)) {
                ctor.proto = (_a = parent.prototypeObject) !== null && _a !== void 0 ? _a : null;
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
    static wirePrototypeProtoChain() {
        for (const schema of builtins_1.default) {
            if (schema.type !== "constructor")
                continue;
            const ctorSchema = schema;
            if (!ctorSchema.prototypeProto)
                continue;
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
    static exposePrototypes() {
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
    static attachObjectProps(target, props = {}) {
        for (const [name, desc] of Object.entries(props)) {
            switch (desc.type) {
                case "object": {
                    const child = defFactory_1.defFactory.createObjectDef(this.rootNode);
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
    static attachAttribute(target, propName, desc) {
        const attr = defFactory_1.defFactory.createLiteralDef(this.rootNode, desc.name);
        target.setProperty(propName, attr);
    }
    /**
     * Create a built-in function with optional semantic effect.
     */
    static createBuiltinFunction(desc) {
        const fn = defFactory_1.defFactory.createBuiltInFunctionDef(this.rootNode, desc.name);
        if (desc.effect) {
            fn.semanticExec = index_1.BuiltInSemantics.get(desc.effect);
        }
        this.attachObjectProps(fn, desc.props);
        return fn;
    }
    /* ======================================================
     * Public APIs
     * ====================================================== */
    /** Get built-in definition by name or alias */
    static get(name) {
        return this.registry.get(name);
    }
    /** Get prototype object by constructor name */
    static getPrototype(name) {
        var _a;
        return (_a = this.prototypes.get(`${name}.prototype`)) !== null && _a !== void 0 ? _a : null;
    }
    /** Shortcut getters for common prototypes */
    static getObjectPrototype() {
        return this.getPrototype("Object");
    }
    static getFunctionPrototype() {
        return this.getPrototype("Function");
    }
    static getArrayPrototype() {
        return this.getPrototype("Array");
    }
    static getStringPrototype() {
        return this.getPrototype("String");
    }
    static getPromisePrototype() {
        return this.getPrototype("Promise");
    }
    /** Get constructor by name */
    static getConstructor(name) {
        const ctor = this.registry.get(name);
        return def_1.default.isFunctionDef(ctor) ? ctor : null;
    }
    static getArrayConstructor() {
        const ctor = this.registry.get("Array");
        return def_1.default.isFunctionDef(ctor) ? ctor : null;
    }
    static getUnit8ArrayConstructor() {
        const ctor = this.registry.get("Uint8Array");
        return def_1.default.isFunctionDef(ctor) ? ctor : null;
    }
    static getPromiseConstructor() {
        const ctor = this.registry.get("Promise");
        return def_1.default.isFunctionDef(ctor) ? ctor : null;
    }
    /** Get global chrome object definition */
    static getChromeObject() {
        const obj = this.registry.get("chrome");
        return def_1.default.isObjectDef(obj) ? obj : null;
    }
}
exports.BuiltInRegistry = BuiltInRegistry;
BuiltInRegistry.initialized = false;
/** Root FlowNode that owns all built-in definitions */
BuiltInRegistry.rootNode = flownodeFactory_1.flownodeFactory.createBuiltInNode();
/** globalName / alias -> Def */
BuiltInRegistry.registry = new Map();
/** prototypeName -> ObjectDef */
BuiltInRegistry.prototypes = new Map();
