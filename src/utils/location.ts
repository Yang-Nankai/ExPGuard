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
export function formatLocation(node: any): string {
  // If node is null/undefined OR does not contain location info,
  // return a fallback string to avoid runtime errors.
  if (!node || !node.loc) return "[unknown_loc]";

  // Destructure start and end positions from node.loc
  const { start, end } = node.loc;

  // Format the location in a readable form:
  // L<start.line>:C<start.column> -> L<end.line>:C<end.column>
  return `L${start.line}:C${start.column} -> L${end.line}:C${end.column}`;
}