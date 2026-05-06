import Model from "../../model/model";
export declare class ParamAnalyzer {
    analyze(model: Model): void;
    /**
     * Extract parameter variable definitions for a function scope.
     */
    private buildParamVarDefs;
}
export declare const paramAnalyzer: ParamAnalyzer;
