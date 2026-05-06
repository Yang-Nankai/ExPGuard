import Model from "../../model/model";
import ScopeTree from "../../scope/scopeTree";
/**
 * ExportAnalyzer
 */
export declare class ExportAnalyzer {
    analyze(model: Model, scopeTree: ScopeTree): void;
    private getSpecifierName;
}
export declare const exportAnalyzer: ExportAnalyzer;
