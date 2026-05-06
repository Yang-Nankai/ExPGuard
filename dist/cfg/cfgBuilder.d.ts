import { CFGResult } from "./cfgResult";
import { Node } from "acorn";
/**
 * CFG Builder
 */
declare class CFGBuilder {
    /**
     * Build CFG from AST with location information
     */
    getCFG(ast: Node | null): CFGResult;
}
export declare const cfgBuilder: CFGBuilder;
export {};
