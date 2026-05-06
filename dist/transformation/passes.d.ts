/**
 * Preprocess JavaScript Code and Transform
 */
/**
 * A function that takes an AST node (any) and returns a transformed AST node.
 */
export type PassFunction = (node: any) => any;
/**
 * create and return a group of ESMangle pipelines
 */
export declare function createPipeline(): PassFunction[][];
