import ScopeTree from "../scope/scopeTree";
declare class DefUseAnalyzer {
    buildInterProceduralModelsPDG(scopeTree: ScopeTree): void;
    private getOrCreateModel;
}
export declare const defuseAnalyzer: DefUseAnalyzer;
export {};
