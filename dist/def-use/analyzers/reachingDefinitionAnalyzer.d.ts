import Model from "../../model/model";
/**
 * Reaching Definition Analyzer
 * Performs forward intra/inter-procedural analysis on the CFG.
 */
export declare class ReachingDefinitionAnalyzer {
    doAnalysis(model: Model): void;
}
export declare const reachingDefAnalyzer: ReachingDefinitionAnalyzer;
