import Scope from "../../scope/scope";
/**
 * Reaching Definition Analyzer
 * Performs forward intra/inter-procedural analysis on the CFG.
 */
export declare class ReachingDefinitionAnalyzer {
    doAnalysis(scope: Scope): void;
}
export declare const reachingDefAnalyzer: ReachingDefinitionAnalyzer;
