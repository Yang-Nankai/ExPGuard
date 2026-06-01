import Scope from "../../scope/scope";
import ScopeTree from "../../scope/scopeTree";
/**
 * ImportAnalyzer
 *
 * Resolve imports and bind them into PageScope.imports:
 *   localName -> exported Def
 */
export declare class ImportAnalyzer {
    analyze(scope: Scope, scopeTree: ScopeTree): void;
    private resolveSourcePageContext;
    private isImportScriptsCall;
}
export declare const importAnalyzer: ImportAnalyzer;
