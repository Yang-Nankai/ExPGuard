/**
 * Format the source code location of an AST node into a readable string.
 *
 * Expected node.loc structure (ESTree-like):
 * {
 *   start: { line: number, column: number },
 *   end:   { line: number, column: number }
 * }
 *
 * @param node - The AST node that may contain location information.
 * @returns A formatted string like:
 *          "L1:C0 -> L1:C10"
 *          or "[unknown_loc]" if location info is missing.
 */
export declare function formatLocation(node: any): string;
