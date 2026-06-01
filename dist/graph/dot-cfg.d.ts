import ScopeTree from "../scope/scopeTree";
export interface CfgDotOptions {
    graphName?: string;
    source?: string;
    includeLineCol?: boolean;
}
export declare function generateCfgDot(scopeTree: ScopeTree, options?: CfgDotOptions): string;
