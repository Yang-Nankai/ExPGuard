import ScopeTree from "../scope/scopeTree";
declare class DefUseAnalyzer {
    buildInterProceduralModelsPDG(scopeTree: ScopeTree): void;
}
export declare const defuseAnalyzer: DefUseAnalyzer;
export {};
