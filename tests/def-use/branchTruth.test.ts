import { buildScopeTreeFor } from "../helpers/buildScopeTree";
import {
  evaluateBranchTruth,
  getFeasibleSuccessors,
} from "../../src/def-use/utils/utils";
import { FlowNode } from "../../src/flownode/flownode";

/**
 * Pull the test-expression FlowNode out of the page-scope CFG. The cfg is
 * built per-statement; the first FlowNode whose AST is an `IfStatement`
 * (or whose immediate AST parent is one) carries the test predicate.
 */
function getIfTestNode(sourceCode: string): FlowNode {
  const tree = buildScopeTreeFor(sourceCode);
  const cfg = tree.root!.graph!;
  for (const node of cfg.allNodes) {
    const parent: any = (node as any).parent;
    if (parent?.type === "IfStatement" && parent.test === node.astNode) {
      return node;
    }
  }
  throw new Error("If-test node not found in fixture CFG");
}

describe("evaluateBranchTruth — constant folding and short-circuit", () => {
  it("folds literal === literal in if-tests", () => {
    const node = getIfTestNode(`
      if ("foo" === "foo") {
        var a = 1;
      }
    `);
    expect(evaluateBranchTruth(node, node.astNode)).toBe("TRUE");
  });

  it("folds literal !== literal in if-tests", () => {
    const node = getIfTestNode(`
      if (1 !== 1) {
        var a = 2;
      }
    `);
    expect(evaluateBranchTruth(node, node.astNode)).toBe("FALSE");
  });

  it("folds `!literal` recursively", () => {
    const node = getIfTestNode(`
      if (!"") {
        var a = 1;
      }
    `);
    // `!""` is TRUE — '' is falsy.
    expect(evaluateBranchTruth(node, node.astNode)).toBe("TRUE");
  });

  it("short-circuits `false && X`", () => {
    const node = getIfTestNode(`
      if (false && unknown) {
        var a = 1;
      }
    `);
    expect(evaluateBranchTruth(node, node.astNode)).toBe("FALSE");
  });

  it("short-circuits `true || X`", () => {
    const node = getIfTestNode(`
      if (true || unknown) {
        var a = 1;
      }
    `);
    expect(evaluateBranchTruth(node, node.astNode)).toBe("TRUE");
  });

  it("gives up on truly dynamic predicates", () => {
    const node = getIfTestNode(`
      if (unknown) {
        var a = 1;
      }
    `);
    expect(evaluateBranchTruth(node, node.astNode)).toBe("UNKNOWN");
  });
});

describe("getFeasibleSuccessors — branch pruning", () => {
  it("prunes the alternate branch when the if-test folds to TRUE", () => {
    const node = getIfTestNode(`
      if (1 === 1) {
        var a = 1;
      } else {
        var b = 2;
      }
    `);
    const feasible = getFeasibleSuccessors(node);
    expect(feasible).not.toBeNull();
    expect(feasible!.length).toBe(1);
    expect(feasible![0]).toBe(node.true);
  });

  it("prunes the consequent branch when the if-test folds to FALSE", () => {
    const node = getIfTestNode(`
      if (1 === 2) {
        var a = 1;
      } else {
        var b = 2;
      }
    `);
    const feasible = getFeasibleSuccessors(node);
    expect(feasible).not.toBeNull();
    expect(feasible!.length).toBe(1);
    expect(feasible![0]).toBe(node.false);
  });

  it("returns null (no static pruning) when test is dynamic", () => {
    const node = getIfTestNode(`
      if (unknown) {
        var a = 1;
      } else {
        var b = 2;
      }
    `);
    expect(getFeasibleSuccessors(node)).toBeNull();
  });
});
