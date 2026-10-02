import { parser } from "../../src/ast/jsParser";
import { cfgBuilder } from "../../src/cfg/cfgBuilder";
import { FlowNode } from "../../src/flownode/flownode";
import {
  worklist,
  DEFAULT_MAX_NODE_VISITS,
} from "../../src/utils/worklist";

/**
 * Structural guarantees the taint engine depends on.
 *
 * These are unit-level on purpose. The loop back edge and the worklist's visit
 * budget are a *pair*: the CFG is cyclic only because the worklist terminates
 * on cycles, and the worklist's budget only earns its keep because the CFG has
 * cycles. Breaking either half alone reintroduces a bug that is very hard to
 * spot from end-to-end results — a missing back edge silently degrades every
 * loop to one iteration, and a missing budget hangs the analyzer.
 */

function buildCFG(code: string) {
  return cfgBuilder.getCFG(parser.parseAST(code));
}

/** Source text behind a FlowNode, whitespace-collapsed, for readable asserts. */
function label(node: FlowNode, code: string): string {
  const range = (node.astNode as any)?.range;
  if (!range) return node.type;
  return code.slice(range[0], range[1]).replace(/\s+/g, " ");
}

function findNode(cfg: any, code: string, text: string): FlowNode {
  const hit = cfg.allNodes.find((n: FlowNode) => label(n, code) === text);
  if (!hit) {
    throw new Error(
      `no FlowNode for ${JSON.stringify(text)}; have: ` +
        cfg.allNodes.map((n: FlowNode) => label(n, code)).join(" | "),
    );
  }
  return hit;
}

function successorsOf(cfg: any, code: string, text: string): string[] {
  return findNode(cfg, code, text).next.map((n: FlowNode) => label(n, code));
}

describe("CFG loop back edges", () => {
  it("while: the body's last statement returns to the test", () => {
    const code = `var i = 0; while (i < n) { acc = acc + i; i = i + 1; } sink(acc);`;
    const cfg = buildCFG(code);

    expect(successorsOf(cfg, code, "i = i + 1")).toEqual(["i < n"]);
    // ...and the test still has a live exit edge.
    expect(successorsOf(cfg, code, "i < n")).toEqual([
      "acc = acc + i",
      "sink(acc)",
    ]);
  });

  it("for: body -> update -> test, with the exit edge intact", () => {
    const code = `for (var i = 0; i < 3; i++) { acc = acc + i; } sink(acc);`;
    const cfg = buildCFG(code);

    expect(successorsOf(cfg, code, "acc = acc + i")).toEqual(["i++"]);
    expect(successorsOf(cfg, code, "i++")).toEqual(["i < 3"]);
    expect(successorsOf(cfg, code, "i < 3")).toEqual([
      "acc = acc + i",
      "sink(acc)",
    ]);
  });

  it("do-while: the test loops back into the body", () => {
    const code = `do { acc = acc + 1; } while (acc < 3); sink(acc);`;
    const cfg = buildCFG(code);

    expect(successorsOf(cfg, code, "acc < 3")).toEqual([
      "acc = acc + 1",
      "sink(acc)",
    ]);
  });

  it("for-of: the body returns to the loop node", () => {
    const code = `for (const x of list) { acc = x; } sink(acc);`;
    const cfg = buildCFG(code);

    expect(successorsOf(cfg, code, "acc = x")).toEqual([
      "for (const x of list) { acc = x; }",
    ]);
  });

  it("continue re-enters the loop instead of leaving it", () => {
    const code = `for (const x of list) { if (!x) continue; acc = x; } sink(acc);`;
    const cfg = buildCFG(code);

    // The `!x` test's true edge is the continue target — the loop node — not
    // the statement after the loop.
    expect(successorsOf(cfg, code, "!x")).toEqual([
      "for (const x of list) { if (!x) continue; acc = x; }",
      "acc = x",
    ]);
  });

  it("break still leaves the loop", () => {
    const code = `for (;;) { acc = 1; break; } sink(acc);`;
    const cfg = buildCFG(code);

    expect(successorsOf(cfg, code, "acc = 1")).toEqual(["sink(acc)"]);
  });

  it("the loop CFG really is cyclic", () => {
    const code = `while (i < n) { i = i + 1; }`;
    const cfg = buildCFG(code);

    const test = findNode(cfg, code, "i < n");
    const body = findNode(cfg, code, "i = i + 1");

    expect(test.next).toContain(body);
    expect(body.next).toContain(test);
  });
});

describe("worklist visit budget", () => {
  it("terminates on a cyclic CFG", () => {
    const code = `while (i < n) { i = i + 1; }`;
    const cfg = buildCFG(code);

    let visits = 0;
    worklist(cfg, function () {
      visits++;
      // A runaway loop would blow past any sane bound long before the test
      // times out; fail fast and loudly instead.
      if (visits > 10_000) throw new Error("worklist did not terminate");
    });

    expect(visits).toBeGreaterThan(0);
    expect(visits).toBeLessThanOrEqual(10_000);
  });

  it("processes each node at most maxNodeVisits times", () => {
    const code = `while (i < n) { i = i + 1; }`;
    const cfg = buildCFG(code);

    const perNode = new Map<FlowNode, number>();
    worklist(cfg, function (this: FlowNode) {
      perNode.set(this, (perNode.get(this) ?? 0) + 1);
    });

    for (const count of perNode.values()) {
      expect(count).toBeLessThanOrEqual(DEFAULT_MAX_NODE_VISITS);
    }
  });

  it("unrolls a loop body more than once — enough for loop-carried state", () => {
    const code = `while (i < n) { i = i + 1; }`;
    const cfg = buildCFG(code);

    const perNode = new Map<string, number>();
    worklist(cfg, function (this: FlowNode) {
      const key = label(this, code);
      perNode.set(key, (perNode.get(key) ?? 0) + 1);
    });

    // Two passes is the minimum that makes `prev = cur; cur = tainted`
    // observable; the default budget allows three.
    expect(perNode.get("i = i + 1") ?? 0).toBeGreaterThanOrEqual(2);
  });

  it("honours an explicit maxNodeVisits override", () => {
    const code = `while (i < n) { i = i + 1; }`;
    const cfg = buildCFG(code);

    const perNode = new Map<FlowNode, number>();
    worklist(
      cfg,
      function (this: FlowNode) {
        perNode.set(this, (perNode.get(this) ?? 0) + 1);
      },
      { maxNodeVisits: 1 },
    );

    for (const count of perNode.values()) {
      expect(count).toBeLessThanOrEqual(1);
    }
  });

  it("passes the visit index to the transfer function", () => {
    const code = `while (i < n) { i = i + 1; }`;
    const cfg = buildCFG(code);

    const seen: number[] = [];
    worklist(cfg, function (this: FlowNode, _queue, ctx) {
      if (label(this, code) === "i = i + 1") seen.push(ctx.visit);
    });

    // Strictly increasing 1..N, never repeating a visit index.
    expect(seen).toEqual(seen.map((_, idx) => idx + 1));
    expect(seen.length).toBeGreaterThanOrEqual(2);
  });
});
