import Model from "../../model/model";
import ScopeTree from "../../scope/scopeTree";
/**
 * ImportAnalyzer
 *
 * Resolve imports and bind them into PageScope.imports:
 *   localName -> exported Def
 */
export declare class ImportAnalyzer {
    analyze(model: Model, scopeTree: ScopeTree): void;
    private resolveSourcePageContext;
    private isImportScriptsCall;
}
export declare const importAnalyzer: ImportAnalyzer;
