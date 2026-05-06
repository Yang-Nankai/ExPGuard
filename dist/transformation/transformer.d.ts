import { Node } from "acorn";
/**
 * Run optimization/mangling passes on the AST and write the output script
 */
export declare const optimizeAST: (ast: Node) => Node;
/**
 * Convert AST to code string
 */
export declare const astToString: (ast: Node) => string;
