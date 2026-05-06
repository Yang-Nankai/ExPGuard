import { Node } from "acorn";
import { FlowNode } from "../../flownode/flownode";
import Def from "../types/def";
import { FunctionCallItem } from "../utils/functionCallItem";
/**
 * Function call (inter-procedural) analyzer
 */
export declare class InterProceduralAnalyzer {
    private callStack;
    private callCache;
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
    analyze(caller: FlowNode, callee: Def, argDefs: Def[], thisDef: Def | null, astNode: Node): Def;
    /**
     * Analyze a user-defined function via inter-procedural analysis.
     */
    private analyzeUserDefinedFunction;
    /**
     * Bind actual arguments to formal parameters using pattern-aware logic.
     */
    private bindFunctionParameters;
    /**
     * Cache function call result if appropriate
     */
    private setFunctionCallCache;
    /**
     * Mark current call frame as having side effects
     */
    setCurrentSideEffects(): void;
    /**
     * Set return definition for current call frame
     */
    setCurrentReturnDef(returnDef: Def): void;
    /**
     * Get return definition for current call frame
     */
    getCurrentReturnDef(): Def;
    /**
     * Get this definition for current call frame
     */
    getCurrentThisDef(): Def | null;
    /**
     * Get current call frame
     */
    getCurrentFrame(): FunctionCallItem | null;
    /**
     * Get cache statistics
     */
    getCacheReport(): {
        totalCalls: number;
        hits: number;
        misses: number;
        evictions: number;
        hitRate: number;
        cacheSize: number;
        maxEntries: number;
    };
    /**
     * Reset call cache and call stack
     */
    reset(): void;
    /**
     * Calculate a stable snapshot hash for side-effect detection.
     */
    private calcSideEffectSnapshot;
}
export declare const interAnalyzer: InterProceduralAnalyzer;
