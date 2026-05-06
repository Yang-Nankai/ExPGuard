import { Options, Program } from "acorn";
/**
 * JSParser is responsible for parsing JavaScript code into an ESTree-compatible AST.
 */
export declare class JSParser {
    /**
     * Parse JavaScript code into an AST.
     *
     * Strategy:
     * 1. acorn (module)
     * 2. acorn (script) if module fails
     * 3. acorn-loose as a final fallback
     */
    parseAST(code: string, options?: Options): Program;
}
export declare const parser: JSParser;
