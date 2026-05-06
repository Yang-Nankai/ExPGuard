import { Node } from "acorn";
import { FlowNode } from "../../flownode/flownode";
import Def, {
  BuiltInFunctionDef,
  FunctionDef,
  GlobalDef,
  ImplicitDef,
  LiteralDef,
  ObjectDef,
  PromiseDef,
  UndefinedDef,
  UnknownDef,
} from "../types/def";
import { BuiltInRegistry } from "../builtins/builtinRegistry";
import { BuiltInSemanticExec } from "../builtins/builtinSemantics/index";
import logger from "../../utils/logger";
import { Errors } from "../../utils/errorCode";
import { interAnalyzer } from "../analyzers/interProceduralAnalyzer";
import PageScope from "../../scope/pageScope";

/**
 * Factory for creating specific Def subclasses.
 */
export class DefFactory {
  create<T extends Def>(def: T): T {
    return def;
  }

  /**
   * Rebase a Def onto a new FlowNode.
   * Keeps semantic identity but changes control-flow origin.
   */
  static rebase<T extends Def>(def: T, newFlowNode: FlowNode): T {
    if (!Def.isDef(def)) {
      Errors.DFGError(`rebase(): not a Def (${typeof def})`);
    }
    return def.cloneShallow(newFlowNode) as T;
  }

  /**
   * Create unknown definition
   */
  createUnknownDef(from: FlowNode): UnknownDef {
    return new UnknownDef(from);
  }

  /**
   * Create undefined definition
   */
  createUndefinedDef(from: FlowNode): UndefinedDef {
    return new UndefinedDef(from);
  }

  /**
   * Create literal definition
   */
  createLiteralDef(
    from: FlowNode,
    value: string | number | boolean | null,
  ): LiteralDef {
    return new LiteralDef(from, value);
  }

  /**
   * Create implicit definition
   */
  createImplicitDef(from: FlowNode, defs?: Iterable<Def>): ImplicitDef {
    return new ImplicitDef(from, defs);
  }

  /**
   * Create object definition
   */
  createObjectDef(from: FlowNode, proto: Def | null = null): ObjectDef {
    return new ObjectDef(from, proto);
  }

  /**
   * Create function definition
   */
  createFunctionDef(
    from: FlowNode,
    functionNode: Node | null,
    isConstructable = true,
  ) {
    return new FunctionDef(from, functionNode, isConstructable);
  }

  /**
   * Built-in function definition
   */
  createBuiltInFunctionDef(
    from: FlowNode,
    name: string,
    semanticExec: BuiltInSemanticExec | null = null,
  ): BuiltInFunctionDef {
    return new BuiltInFunctionDef(from, name, semanticExec);
  }

  /**
   * Promise definition
   */
  createPromiseDef(fromNode: FlowNode, resolvedDef?: Def | null): PromiseDef {
    return new PromiseDef(fromNode, resolvedDef);
  }

  /**
   * Global Definition
   */
  createGlobalDef(from: FlowNode, scope: PageScope): ObjectDef {
    return new GlobalDef(from, scope);
  }

  /**
   * Create a concrete Array object instance.
   * Note: elements are assigned as numeric string keys.
   */
  static createArrayInstanceDef(
    from: FlowNode,
    astNode: Node,
    elements: Def[] = [],
  ): ObjectDef {
    // create Array instance from createClassInstanceDef
    const arrayCtor = BuiltInRegistry.getArrayConstructor() ?? null;
    const arrInstance = this.createClassInstanceDef(
      arrayCtor,
      from,
      astNode,
      elements,
    );

    return arrInstance;
  }

  /**
   * Create a concrete Uint8Array object instance.
   */
  static createUint8ArrayInstanceDef(
    from: FlowNode,
    astNode: Node,
    args: Def[] = [],
  ): ObjectDef {
    const uint8ArrayCtor = BuiltInRegistry.getUnit8ArrayConstructor();
    const uint8ArrayInstance = this.createClassInstanceDef(
      uint8ArrayCtor,
      from,
      astNode,
      args,
    );

    return uint8ArrayInstance;
  }

  /**
   * Create a concrete URLSearchParams object instance.
   */
  static createURLSearchParamsInstanceDef(
    from: FlowNode,
    astNode: Node,
    args: Def[] = [],
  ): ObjectDef {
    const spCtor = BuiltInRegistry.getConstructor("URLSearchParams");
    const searchParamsInstance = this.createClassInstanceDef(
      spCtor,
      from,
      astNode,
      args,
    );

    return searchParamsInstance;
  }

  /**
   * Create an instance ObjectDef when `new classA(...)` is encountered.
   * This simulates JavaScript runtime behavior where `new` returns an object.
   */
  static createClassInstanceDef(
    constructor: Def | null,
    cfgNode: FlowNode,
    astNode: Node,
    argsDef: Def[] = [],
  ): ObjectDef {
    // Distinguishing PromiseDef
    // TODO: Here need to validate, more complex examples
    const isPromise = constructor === BuiltInRegistry.getPromiseConstructor();
    const instance: ObjectDef = isPromise
      ? new PromiseDef(cfgNode)
      : new ObjectDef(cfgNode);

    if (!Def.isFunctionDef(constructor)) {
      logger.error(
        `createClassInstanceDef(): constructor is not a FunctionDef (${typeof constructor})`,
      );
      return instance;
    }

    const ctor = constructor as FunctionDef;
    const ctorFn = ctor.getConstructor();

    // Set proto
    instance.proto =
      ctor.prototypeObject ?? BuiltInRegistry.getObjectPrototype();

    if (!Def.isFunctionDef(ctorFn)) return instance;
    interAnalyzer.analyze(cfgNode, ctorFn, argsDef, instance, astNode);

    return instance;
  }
}

/** Singleton instance */
export const defFactory = new DefFactory();
