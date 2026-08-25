import Scope from "../../src/scope/scope";
import { Range } from "../../src/def-use/types/range";
import { buildScopeTreeFor } from "../helpers/buildScopeTree";

// Note: test inputs are deliberately padded with extra statements so the
// top-level Program range never coincides with a single function's range
// (which would otherwise trigger a benign range-collision in the registry).

describe("ScopeTree: structural correctness", () => {
  it("creates a single PageScope as root and registers it", () => {
    const tree = buildScopeTreeFor("var x = 1; var y = 2;");
    expect(tree.root).not.toBeNull();
    expect(Scope.isPageScope(tree.root!)).toBe(true);
    expect(tree.scopes).toContain(tree.root);
  });

  it("creates one function scope per declared function", () => {
    const tree = buildScopeTreeFor(`
      var pad = 0;
      function foo() {}
      const bar = function () {};
      const baz = () => {};
    `);
    expect(tree.getFunctionScopes().length).toBe(3);
  });

  it("looks up a scope by exact range", () => {
    const tree = buildScopeTreeFor(`var pad = 0; function foo() { return 1; }`);
    const fn = tree.getFunctionScopes()[0];
    const found = tree.getScopeByRange(fn.range!);
    expect(found).toBe(fn);
  });

  it("getCFGEligibleScopes returns page + function scopes only", () => {
    const tree = buildScopeTreeFor(`
      var pad = 0;
      function foo() {
        { let a = 1; }
      }
    `);
    const eligible = tree.getCFGEligibleScopes();
    eligible.forEach((s) => {
      expect(Scope.isCFGEligibleScope(s)).toBe(true);
    });
    // Block scope must be excluded
    const blocks = tree.scopes.filter((s) => s.type === Scope.TYPE_BLOCK);
    blocks.forEach((s) => expect(eligible).not.toContain(s));
  });

  it("isRelatedToTheScope works by Scope reference and range", () => {
    const tree = buildScopeTreeFor("var pad = 0; function bar(){ return pad; }");
    const fn = tree.getFunctionScopes()[0];
    expect(tree.isRelatedToTheScope(fn)).toBe(true);
    expect(tree.isRelatedToTheScope(fn.range!)).toBe(true);
    expect(tree.isRelatedToTheScope("does-not-exist")).toBe(false);
  });
});

describe("ScopeTree: CFG construction (replaces ModelBuilder)", () => {
  it("attaches CFGs to every CFG-eligible scope", () => {
    const tree = buildScopeTreeFor(`
      var pad = 0;
      function f(x) { return x; }
      f(1);
    `);
    for (const s of tree.getCFGEligibleScopes()) {
      expect(s.graph).not.toBeNull();
      expect(s.graph!.entryNode).toBeDefined();
      expect(s.graph!.exitNode).toBeDefined();
    }
  });

  it("binds every flow node back to its owning scope and tree", () => {
    const tree = buildScopeTreeFor(`
      var pad = 0;
      function fn(a) {
        return a + 1;
      }
    `);
    for (const s of tree.getCFGEligibleScopes()) {
      const graph = s.graph!;
      for (const node of graph.allNodes) {
        expect(node.scopeTree).toBe(tree);
        expect(node.scope).toBeDefined();
      }
    }
  });

  it("builds a CFG for block-bodied arrow functions", () => {
    const tree = buildScopeTreeFor(`
      var pad = 0;
      const sum = (a, b) => { return a + b; };
    `);
    const fnScopes = tree.getFunctionScopes();
    expect(fnScopes.length).toBe(1);
    expect(fnScopes[0].graph).not.toBeNull();
  });

  it("getNodeScopeByRangeOptimized returns the innermost containing scope", () => {
    const tree = buildScopeTreeFor(`
      function outer() {
        function inner() {
          var x = 1;
        }
      }
    `);
    const inner = tree
      .getFunctionScopes()
      .find((s) => s.toString().includes(".inner"))!;
    expect(inner).toBeDefined();

    // Pick a small range strictly inside `inner`.
    const innerRange = inner.range!;
    const innerInside = new Range([innerRange.start + 5, innerRange.end - 1]);
    const lookup = tree.getNodeScopeByRangeOptimized(innerInside);
    expect(lookup).toBe(inner);
  });
});
