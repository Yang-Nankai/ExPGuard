import { Node, RestElement } from "acorn";
import * as walk from "acorn-walk";

/**
 * Utility function: get the last element of an array or null.
 */
function getLast<T>(xs: T[]): T | null {
  return xs.length > 0 ? xs[xs.length - 1] : null;
}

/**
 * PatternVisitor is designed to walk through destructuring patterns
 * and collect information about declared identifiers, rest elements,
 * assignments, and right-hand-side nodes.
 *
 * It mimics the behavior of esrecurse-based visitor but uses acorn-walk.
 */
export class PatternVisitor {
  private rootPattern: Node;
  private callback: (
    pattern: Node,
    info: { topLevel: boolean; rest: boolean; assignments: Node[] }
  ) => void;
  private assignments: Node[] = [];
  private rightHandNodes: Node[] = [];
  private restElements: RestElement[] = [];

  constructor(
    rootPattern: Node,
    callback: (
      pattern: Node,
      info: { topLevel: boolean; rest: boolean; assignments: Node[] }
    ) => void
  ) {
    this.rootPattern = rootPattern;
    this.callback = callback;
  }

  /**
   * Determine whether a node is a destructuring pattern.
   */
  static isPattern(node: Node): boolean {
    const type = node.type;
    return (
      type === "Identifier" ||
      type === "ObjectPattern" ||
      type === "ArrayPattern" ||
      type === "SpreadElement" ||
      type === "RestElement" ||
      type === "AssignmentPattern"
    );
  }

  /**
   * Begin traversing the given node.
   */
  visit(node: Node | null): void {
    if (!node) return;

    const handlers: walk.RecursiveVisitors<any> = {
      Identifier: (pattern: any, state, c) => {
        const lastRestElement = getLast(this.restElements);
        this.callback(pattern, {
          topLevel: pattern === this.rootPattern,
          rest: lastRestElement != null && lastRestElement.argument === pattern,
          assignments: [...this.assignments],
        });
      },

      Property: (property: any, state, c) => {
        if (property.computed) {
          this.rightHandNodes.push(property.key);
        }

        c(property.value, state);
      },

      ArrayPattern: (pattern: any, state, c) => {
        for (const element of pattern.elements) {
          if (element) c(element, state);
        }
      },

      ObjectPattern: (pattern: any, state, c) => {
        for (const prop of pattern.properties) {
          if (!prop) continue;
          // prop.type may be "Property" or "RestElement"
          c(prop, state);
        }
      },

      AssignmentPattern: (pattern: any, state, c) => {
        this.assignments.push(pattern);
        c(pattern.left, state);
        this.rightHandNodes.push(pattern.right);
        this.assignments.pop();
      },

      RestElement: (pattern: any, state, c) => {
        this.restElements.push(pattern);
        c(pattern.argument, state);
        this.restElements.pop();
      },

      MemberExpression: (node: any, state, c) => {
        if (node.computed) {
          this.rightHandNodes.push(node.property);
        }
        this.rightHandNodes.push(node.object);
      },

      SpreadElement: (node: any, state, c) => {
        c(node.argument, state);
      },

      ArrayExpression: (node: any, state, c) => {
        for (const elem of node.elements) {
          if (elem) c(elem, state);
        }
      },

      AssignmentExpression: (node: any, state, c) => {
        this.assignments.push(node);
        c(node.left, state);
        this.rightHandNodes.push(node.right);
        this.assignments.pop();
      },

      CallExpression: (node: any, state, c) => {
        node.arguments.forEach((arg: Node) => this.rightHandNodes.push(arg));
        c(node.callee, state);
      },
    };

    walk.recursive(node, null, handlers);
  }

  /**
   * Get all collected right-hand-side nodes (e.g. default values, RHS of assignment).
   */
  getRightHandNodes(): Node[] {
    return this.rightHandNodes;
  }
}

/**
 * Recursively extract variable names from a pattern.
 */
export function extractPatternNames(node: any): string[] {
  const names: string[] = [];

  if (!node) return names;

  if (PatternVisitor.isPattern(node)) {
    const visitor = new PatternVisitor(node, (pattern: any) => {
      if (pattern.name) names.push(pattern.name);
    });
    visitor.visit(node);
  }

  return names;
}
