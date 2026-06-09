import Scope from "../../src/scope/scope";
import { buildScopeTreeFor } from "../helpers/buildScopeTree";

describe("Scope: CFG / feature / taint state attached directly to scope", () => {
  it("attaches a CFG to every CFG-eligible scope after buildIntraProceduralCFGs", () => {
    const tree = buildScopeTreeFor(`
      function outer(x) {
        function inner(y) {
          return y + 1;
        }
        return inner(x);
      }
      outer(2);
    `);

    const cfgScopes = tree.getCFGEligibleScopes();
    expect(cfgScopes.length).toBeGreaterThanOrEqual(3); // page + outer + inner

    for (const scope of cfgScopes) {
      expect(scope.graph).not.toBeNull();
      expect(scope.graph!.allNodes.length).toBeGreaterThan(0);
    }
  });

  it("does not attach CFGs to non-CFG-eligible scopes (block / for / etc.)", () => {
    const tree = buildScopeTreeFor(`
      {
        let a = 1;
        for (let i = 0; i < 3; i++) {
          a += i;
        }
      }
    `);

    const nonEligible = tree.scopes.filter(
      (s) => !Scope.isCFGEligibleScope(s),
    );
    expect(nonEligible.length).toBeGreaterThan(0);
    nonEligible.forEach((s) => {
      expect(s.graph).toBeNull();
    });
  });

  it("validates CFG before assigning it (drops invalid graphs)", () => {
    const tree = buildScopeTreeFor("var x = 1;");
    const root = tree.root!;

    // Unknown shape should be rejected by cfgValidator and ignored.
    const previous = root.graph;
    (root as any).graph = { not: "a CFG" };
    expect(root.graph).toBe(previous);

    // Explicit null clears.
    root.graph = null;
    expect(root.graph).toBeNull();
  });

  it("hasTaintAnalyzed defaults to false and is settable", () => {
    const tree = buildScopeTreeFor("var x = 1;");
    const root = tree.root!;
    expect(root.hasTaintAnalyzed).toBe(false);
    root.hasTaintAnalyzed = true;
    expect(root.hasTaintAnalyzed).toBe(true);
  });

  it("featureSemantic / isFeatureModel reflect external assignments", () => {
    const tree = buildScopeTreeFor("function fn() {}");
    const fnScope = tree.getFunctionScopes()[0];
    expect(fnScope).toBeDefined();
    expect(fnScope.isFeatureModel()).toBe(false);

    fnScope.featureSemantic = {
      id: "test.feature",
      hasSideEffect: false,
      exec: () => null,
    } as any;

    expect(fnScope.isFeatureModel()).toBe(true);
    expect(fnScope.featureSemantic?.id).toBe("test.feature");
  });
});

describe("Scope: descendants and lookups", () => {
  it("getAllDescendants returns every nested scope (DFS)", () => {
    const tree = buildScopeTreeFor(`
      function a() {
        function b() {
          function c() {}
        }
      }
    `);

    const root = tree.root!;
    const names = root.getAllDescendants().map((s) => s.toString());
    // we expect at least three descendant function scopes plus other intermediate scopes
    const fnNames = names.filter((n) => n.includes(".a") || n.includes(".b") || n.includes(".c"));
    expect(fnNames.length).toBeGreaterThanOrEqual(3);
  });

  it("isDescendantOf walks the scope chain correctly", () => {
    const tree = buildScopeTreeFor(`
      function a() { function b() {} }
    `);
    const fnScopes = tree.getFunctionScopes();
    expect(fnScopes.length).toBe(2);
    const [a, b] = fnScopes;
    expect(b.isDescendantOf(a)).toBe(true);
    expect(a.isDescendantOf(b)).toBe(false);
    expect(a.isDescendantOf(tree.root)).toBe(true);
  });
});
