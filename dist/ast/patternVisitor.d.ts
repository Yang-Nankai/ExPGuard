import { Node } from "acorn";
/**
 * PatternVisitor is designed to walk through destructuring patterns
 * and collect information about declared identifiers, rest elements,
 * assignments, and right-hand-side nodes.
 *
 * It mimics the behavior of esrecurse-based visitor but uses acorn-walk.
 */
export declare class PatternVisitor {
    private rootPattern;
    private callback;
    private assignments;
    private rightHandNodes;
    private restElements;
    constructor(rootPattern: Node, callback: (pattern: Node, info: {
        topLevel: boolean;
        rest: boolean;
        assignments: Node[];
    }) => void);
    /**
     * Determine whether a node is a destructuring pattern.
     */
    static isPattern(node: Node): boolean;
    /**
     * Begin traversing the given node.
     */
    visit(node: Node | null): void;
    /**
     * Get all collected right-hand-side nodes (e.g. default values, RHS of assignment).
     */
    getRightHandNodes(): Node[];
}
/**
 * Recursively extract variable names from a pattern.
 */
export declare function extractPatternNames(node: any): string[];
