import ScopeTree from "../scope/scopeTree";
export interface DotOptions {
    counter?: number;
    source?: string;
}
/**
 * Generate a complete DOT graph for all CFG-bearing scopes in a ScopeTree
 */
export default function generateDot(scopeTree: ScopeTree, options?: DotOptions): string;
