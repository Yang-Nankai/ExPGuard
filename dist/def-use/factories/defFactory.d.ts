import { Node } from "acorn";
import { FlowNode } from "../../flownode/flownode";
import Def, { BuiltInFunctionDef, FunctionDef, ImplicitDef, LiteralDef, ObjectDef, PromiseDef, UndefinedDef, UnknownDef } from "../types/def";
import { BuiltInSemanticExec } from "../builtins/builtinSemantics/index";
import PageScope from "../../scope/pageScope";
/**
 * Factory for creating specific Def subclasses.
 */
export declare class DefFactory {
    create<T extends Def>(def: T): T;
    /**
     * Rebase a Def onto a new FlowNode.
     * Keeps semantic identity but changes control-flow origin.
     */
    static rebase<T extends Def>(def: T, newFlowNode: FlowNode): T;
    /**
     * Create unknown definition
     */
    createUnknownDef(from: FlowNode): UnknownDef;
    /**
     * Create undefined definition
     */
    createUndefinedDef(from: FlowNode): UndefinedDef;
    /**
     * Create literal definition
     */
    createLiteralDef(from: FlowNode, value: string | number | boolean | null): LiteralDef;
    /**
     * Create implicit definition
     */
    createImplicitDef(from: FlowNode, defs?: Iterable<Def>): ImplicitDef;
    /**
     * Create object definition
     */
    createObjectDef(from: FlowNode, proto?: Def | null): ObjectDef;
    /**
     * Create function definition
     */
    createFunctionDef(from: FlowNode, functionNode: Node | null, isConstructable?: boolean): FunctionDef;
    /**
     * Built-in function definition
     */
    createBuiltInFunctionDef(from: FlowNode, name: string, semanticExec?: BuiltInSemanticExec | null): BuiltInFunctionDef;
    /**
     * Promise definition
     */
    createPromiseDef(fromNode: FlowNode, resolvedDef?: Def | null): PromiseDef;
    /**
     * Global Definition
     */
    createGlobalDef(from: FlowNode, scope: PageScope): ObjectDef;
    /**
     * Create a concrete Array object instance.
     * Note: elements are assigned as numeric string keys.
     */
    static createArrayInstanceDef(from: FlowNode, astNode: Node, elements?: Def[]): ObjectDef;
    /**
     * Create a concrete Uint8Array object instance.
     */
    static createUint8ArrayInstanceDef(from: FlowNode, astNode: Node, args?: Def[]): ObjectDef;
    /**
     * Create a concrete URLSearchParams object instance.
     */
    static createURLSearchParamsInstanceDef(from: FlowNode, astNode: Node, args?: Def[]): ObjectDef;
    /**
     * Create an instance ObjectDef when `new classA(...)` is encountered.
     * This simulates JavaScript runtime behavior where `new` returns an object.
     */
    static createClassInstanceDef(constructor: Def | null, cfgNode: FlowNode, astNode: Node, argsDef?: Def[]): ObjectDef;
}
/** Singleton instance */
export declare const defFactory: DefFactory;
