import { FlowNode } from "../../flownode/flownode";
import Def, { FunctionDef, ObjectDef } from "../types/def";
/**
 * ======================================================
 * Built-in Registry
 * Build all JS built-in semantic objects from schema
 * ======================================================
 */
export declare class BuiltInRegistry {
    private static initialized;
    /** Root FlowNode that owns all built-in definitions */
    static rootNode: FlowNode;
    /** globalName / alias -> Def */
    static registry: Map<string, Def>;
    /** prototypeName -> ObjectDef */
    static prototypes: Map<string, ObjectDef>;
    /**
     * Initialize all built-in definitions.
     * This method is idempotent.
     */
    static initialize(): void;
    /**
     * Register taint sources for attributes declared in schema.
     * Only object-type builtins are scanned.
     */
    static registerAttributeSources(): void;
    /**
     * Recursively walk attribute schemas and register taint sources.
     */
    private static walkAttributeSchemas;
    /**
     * Pre-create all prototype objects for constructors.
     */
    private static createPrototypes;
    /**
     * Create constructor functions and attach:
     * - static methods to constructor
     * - prototype methods to its prototype object
     */
    private static createConstructors;
    /**
     * Create non-constructor built-in objects.
     */
    private static createObjects;
    /**
     * Create global standalone functions (e.g., parseInt).
     */
    private static createStandaloneFunctions;
    /**
     * Set constructor inheritance:
     * ChildConstructor.__proto__ -> Parent.prototype
     */
    private static wireConstructorProtoChain;
    /**
     * Set prototype inheritance:
     * Child.prototype.__proto__ -> Parent.prototype
     */
    private static wirePrototypeProtoChain;
    /**
     * Expose prototype objects into registry (e.g., Array.prototype).
     */
    private static exposePrototypes;
    /**
     * Attach properties (object / function / attribute)
     * to a target ObjectDef recursively.
     */
    private static attachObjectProps;
    /**
     * Attach literal attribute property to target.
     */
    private static attachAttribute;
    /**
     * Create a built-in function with optional semantic effect.
     */
    private static createBuiltinFunction;
    /** Get built-in definition by name or alias */
    static get(name: string): Def | undefined;
    /** Get prototype object by constructor name */
    static getPrototype(name: string): ObjectDef | null;
    /** Shortcut getters for common prototypes */
    static getObjectPrototype(): ObjectDef | null;
    static getFunctionPrototype(): ObjectDef | null;
    static getArrayPrototype(): ObjectDef | null;
    static getStringPrototype(): ObjectDef | null;
    static getPromisePrototype(): ObjectDef | null;
    /** Get constructor by name */
    static getConstructor(name: string): FunctionDef | null;
    static getArrayConstructor(): FunctionDef | null;
    static getUnit8ArrayConstructor(): FunctionDef | null;
    static getPromiseConstructor(): FunctionDef | null;
    /** Get global chrome object definition */
    static getChromeObject(): ObjectDef | null;
}
