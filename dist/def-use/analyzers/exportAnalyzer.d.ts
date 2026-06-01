import Scope from "../../scope/scope";
import ScopeTree from "../../scope/scopeTree";
/**
 * ExportAnalyzer
 */
export declare class ExportAnalyzer {
    analyze(scope: Scope, scopeTree: ScopeTree): void;
    private getSpecifierName;
}
export declare const exportAnalyzer: ExportAnalyzer;
