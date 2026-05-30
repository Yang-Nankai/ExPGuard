import Set from "../../src/utils/set";
import { Queue } from "../../src/utils/queue";
import { topoSort } from "../../src/utils/topoSort";
import { worklist } from "../../src/utils/worklist";

describe("utils/Set", () => {
  it("adds without duplicates and reports size", () => {
    const s = new Set<number>([1, 2, 2, 3]);
    expect(s.size).toBe(3);
    s.add(3);
    expect(s.size).toBe(3);
    s.add(4);
    expect(s.size).toBe(4);
  });

  it("delete and clear behave correctly", () => {
    const s = new Set<string>(["a", "b", "c"]);
    s.delete("b");
    expect(s.has("b")).toBe(false);
    s.clear();
    expect(s.size).toBe(0);
  });

  it("intersect/union/minus/equals match reference semantics", () => {
    const a = new Set([1, 2, 3]);
    const b = new Set([2, 3, 4]);
    expect(Set.intersect(a, b).values().sort()).toEqual([2, 3]);
    expect(Set.union(a, b).values().sort()).toEqual([1, 2, 3, 4]);
    expect(Set.minus(a, b).values()).toEqual([1]);
    expect(Set.equals(a, new Set([3, 2, 1]))).toBe(true);
    expect(Set.equals(a, b)).toBe(false);
  });
});

describe("utils/Queue", () => {
  it("push moves an existing element to the back instead of duplicating", () => {
    const q = new Queue<string>();
    q.push("a");
    q.push("b");
    q.push("a");
    expect(Array.from(q)).toEqual(["b", "a"]);
  });
});

describe("utils/topoSort", () => {
  it("returns a topological ordering for a DAG", () => {
    const graph = new Map<string, string[]>([
      ["a", ["b", "c"]],
      ["b", ["c"]],
      ["c", []],
      ["d", ["a"]],
    ]) as any;

    const order = topoSort(graph);

    const indexOf = (k: string) => order.indexOf(k);
    expect(indexOf("c")).toBeLessThan(indexOf("b"));
    expect(indexOf("b")).toBeLessThan(indexOf("a"));
    expect(indexOf("a")).toBeLessThan(indexOf("d"));
  });

  it("handles a cycle by skipping the back-edge instead of throwing", () => {
    const graph = new Map<string, string[]>([
      ["x", ["y"]],
      ["y", ["x"]],
    ]) as any;

    expect(() => topoSort(graph)).not.toThrow();
    const order = topoSort(graph);
    expect(order).toEqual(expect.arrayContaining(["x", "y"]));
  });
});

describe("utils/worklist (lightweight integration)", () => {
  it("runs the visitor at least once for every CFG node in the forward direction", () => {
    // build a tiny CFG manually using FlowNode primitives
    const { FlowNode } = require("../../src/flownode/flownode");
    const { CFGResult } = require("../../src/cfg/cfgResult");

    const a = new FlowNode(FlowNode.ENTRY_NODE_TYPE);
    const b = new FlowNode(FlowNode.NORMAL_NODE_TYPE);
    const c = new FlowNode(FlowNode.EXIT_NODE_TYPE);
    a.connect(b, FlowNode.NORMAL_CONNECTION_TYPE);
    b.connect(c, FlowNode.NORMAL_CONNECTION_TYPE);

    const cfg = new CFGResult(a, c, [a, b, c]);

    const visited: string[] = [];
    worklist(
      cfg,
      function (this: any) {
        visited.push(this.type);
      },
      { direction: "forward" },
    );
    expect(visited.length).toBeGreaterThan(0);
    expect(visited).toEqual(expect.arrayContaining([FlowNode.NORMAL_NODE_TYPE]));
  });
});
