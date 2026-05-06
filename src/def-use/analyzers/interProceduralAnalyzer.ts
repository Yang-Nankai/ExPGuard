import { Node } from "acorn";
import { FlowNode } from "../../flownode/flownode";
import Def, { ImplicitDef } from "../types/def";
import { FunctionCallCache } from "../utils/functionCallCache";
import { FunctionCallItem } from "../utils/functionCallItem";
import { FunctionCallStack } from "../utils/functionCallStack";
import { defFactory } from "../factories/defFactory";
import { Range } from "../types/range";
import { modelController } from "../../model/modelCtrl";
import { reachingDefAnalyzer } from "./reachingDefinitionAnalyzer";
import Scope from "../../scope/scope";
import { patternAwareTypeHandler } from "../handlers/patternAwareTypeHandler";
import { Errors } from "../../utils/errorCode";
import logger from "../../utils/logger";
import { taintManager as tm } from "../../taint";
import config from "../../config";
import { fileTimerManager } from "../../utils/fileTimer";

/**
 * Function call (inter-procedural) analyzer
 */
export class InterProceduralAnalyzer {
  private callStack = new FunctionCallStack();
  private callCache = new FunctionCallCache(config.functionCallCacheSize ?? 4196);

  /**
   * Analyze a function call with inter-procedural analysis
   * Optimized with smart caching and side-effect detection
   * 
   * analyze()
   *  ├─ builtin → return
   *  ├─ function
   *  │   ├─ stack / cache / recursion
   *  │   ├─ invokeCalleeModel()
   *  │   │    ├─ feature semantic
   *  │   │    └─ cfg model
   *  │   ├─ side effect mark
   *  │   └─ return
   *  └─ fallback unknown
   */
  public analyze(
    caller: FlowNode,
    callee: Def,
    argDefs: Def[],
    thisDef: Def | null,
    astNode: Node
  ): Def {
    if (fileTimerManager.checkCurrentTimeout()) {
      return defFactory.createUnknownDef(caller);
    }

    // If implicit set, need analyze every element
    if (Def.isImplicitDef(callee)) {
      const combinedResults = new ImplicitDef(caller);

      callee.forEach((singleCallee) => {
        const result = this.analyze(caller, singleCallee, argDefs, thisDef, astNode);
        combinedResults.add(result);
      })

      return combinedResults.cloneShallow(caller);
    }

    // If builtin function, directly call it
    if (Def.isBuiltInFunctionDef(callee)) {
      return callee.returnDef(argDefs, caller, astNode, thisDef);
    }

    // User-defined function
    if (Def.isFunctionDef(callee)) {
      // Call depth limiting
      if (this.callStack.isMaxDepth()) {
        return defFactory.createUnknownDef(caller);
      }

      const frame = new FunctionCallItem(caller, callee, argDefs, thisDef);

      // If cached, return cached result
      // const cached = this.callCache.get(frame);
      // if (cached) return cached;

      // Recursion and reentrancy Detection
      if (this.callStack.isReentrant(frame)) {
        return defFactory.createUnknownDef(caller);
      }

      this.callStack.push(frame);
      try {
        this.analyzeUserDefinedFunction(frame);
        // if (!frame.hasSideEffects) this.setFunctionCallCache(frame);
        return this.getCurrentReturnDef();
      } finally {
        this.callStack.pop();
      }
    }

    // Fallback to unknown def
    const returnDef = defFactory.createUnknownDef(caller);
    if (callee.isTainted) tm.propagateTaint(callee, returnDef, astNode, "RETURN", "fallback-return");
    return returnDef;
  }

  /**
   * Analyze a user-defined function via inter-procedural analysis.
   */
  private analyzeUserDefinedFunction(frame: FunctionCallItem): void {
    const { caller, callee, argDefs, thisDef } = frame;

    // side effect, args/this must not exist taint
    const argTainted = argDefs.every((def) => def.isTainted);
    if (argTainted && thisDef?.isTainted) {
      frame.markHasSideEffects();
    }

    if (!callee.functionNode || !caller.scopeTree) {
      logger.debug("callee.functionNode or caller.scopeTree is null");
      return;
    }

    const calleeScope = callee.fromNode.scopeTree?.getScopeByRange(
      new Range(callee.functionNode.range)
    );

    if (!callee.fromNode.scopeTree || !calleeScope) {
      logger.debug("callee.scope or callee.scopeTree is null");
      return;
    }

    const calleeModel =
      modelController.getIntraProceduralModelByMainlyRelatedScopeFromAPageModels(
        callee.fromNode.scopeTree,
        calleeScope
      );
    
    if (calleeModel?.featureSemantic) {
      const returnDef = calleeModel.featureSemantic.exec(argDefs, caller, thisDef) ?? defFactory.createUndefinedDef(caller);
      this.setCurrentReturnDef(returnDef);
      if (calleeModel.featureSemantic.hasSideEffect) this.setCurrentSideEffects();
      return;
    }

    if (!calleeModel?.graph?.entryNode) return;

    const entryNode = calleeModel.graph.entryNode;
    this.bindFunctionParameters(entryNode, calleeScope, argDefs);

    /** ---- side effect snapshot (before) ---- */
    const beforeSnapshot = this.calcSideEffectSnapshot(calleeScope);

    reachingDefAnalyzer.doAnalysis(calleeModel);

    /** ---- side effect snapshot (after) ---- */
    const afterSnapshot = this.calcSideEffectSnapshot(calleeScope);

    if (beforeSnapshot !== afterSnapshot) {
      this.setCurrentSideEffects();
    }
  }

  /**
   * Bind actual arguments to formal parameters using pattern-aware logic.
   */
  private bindFunctionParameters(
    entryNode: FlowNode,
    scope: Scope,
    argDefs: Def[]
  ) {
    const fnAst: any = scope.ast;

    fnAst?.params?.forEach((param: any, index: number) => {
      patternAwareTypeHandler(entryNode, param, argDefs[index]);
    });
  }

  /**
   * Cache function call result if appropriate
   */
  private setFunctionCallCache(frame: FunctionCallItem) {
    if (!frame || !frame.returnDef) return;
    this.callCache.set(frame, frame.returnDef);
  }

  /**
   * Mark current call frame as having side effects
   */
  setCurrentSideEffects() {
    // Mark all frames in call stack that could be affected
    for (const item of this.callStack.list()) {
      item.markHasSideEffects();
    }
  }

  /**
   * Set return definition for current call frame
   */
  setCurrentReturnDef(returnDef: Def) {
    const frame = this.callStack.peek();
    if (frame) frame.returnDef = returnDef;
  }

  /**
   * Get return definition for current call frame
   */
  getCurrentReturnDef(): Def {
    const frame = this.callStack.peek();
    if (frame) return frame.returnDef;
    else throw Errors.DFGError("Call Stack should has the frame.");
  }

  /**
   * Get this definition for current call frame
   */
  getCurrentThisDef(): Def | null {
    const frame = this.callStack.peek();
    return frame?.thisDef ?? null;
  }

  /**
   * Get current call frame
   */
  getCurrentFrame(): FunctionCallItem | null {
    return this.callStack.peek() ?? null;
  }

  /**
   * Get cache statistics
   */
  getCacheReport() {
    return this.callCache.getStats();
  }

  /**
   * Reset call cache and call stack
   */
  reset() {
    this.callCache.clear();
    this.callStack.clear();
  }

  /**
   * Calculate a stable snapshot hash for side-effect detection.
   */
  private calcSideEffectSnapshot(calleeScope: Scope): number {
    const PRIME1 = 1315423911;
    const PRIME2 = 2654435761;
    const MOD = 2 ** 53 - 1;

    let hash = 0;

    const mix = (def: Def) => {
      hash = ((hash) ^ (def.version * PRIME2)) % MOD;
    };

    /** outer scopes */
    let scope: Scope | null = calleeScope.parent;
    while (scope) {
      scope.reachIns.forEach((def) => {
        mix(def);
      });
      scope = scope.parent;
    }

    return hash;
  }
}

export const interAnalyzer = new InterProceduralAnalyzer();
