import Model from "../../model/model";
import ScopeTree from "../../scope/scopeTree";
declare class FeatureModelAnalyzer {
    analyze(model: Model, scopeTree: ScopeTree): void;
}
export declare const featureModelAnalyzer: FeatureModelAnalyzer;
export {};
