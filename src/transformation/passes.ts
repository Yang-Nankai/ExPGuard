/**
 * Preprocess JavaScript Code and Transform
 */

// @ts-ignore
import pass from './esmangle/lib/pass';

/**
 * A function that takes an AST node (any) and returns a transformed AST node.
 */
export type PassFunction = (node: any) => any;

/**
 * create and return a group of ESMangle pipelines
 */
export function createPipeline(): PassFunction[][] {
  const modules: string[] = [

    /** nums.map(n => n * 2) --> nums.map(n => { return n * 2; }) */
    'pass/arrow-function-block',

    /** (a, (b, c), d) --> (a, b, c, d) */
    'pass/reduce-sequence-expression',

    /**  a = (b++, c++, d++) --> b++, c++, a = d++ */
    'pass/flatten-assignment-sequence',

    /** removes EmptyStatement nodes */
    'pass/remove-empty-statement',

    /** removes useless BlockStatement and flatten + minimize the subtree */
    // 'pass/remove-wasted-blocks',

  ];

  const pipeline: PassFunction[][] = [
    modules.map((m) => pass.require(m))
  ];

  return pipeline;
}
