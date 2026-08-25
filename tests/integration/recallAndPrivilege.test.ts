import path from "path";
import os from "os";
import fs from "fs";
import { epgModelBuilder } from "../../src/epgmodelbuilder";
import { ExtensionSourceType } from "../../src/extension/extensionLoader";
import { taintManager } from "../../src/taint";
import { scopeController } from "../../src/scope/scopeCtrl";
import config from "../../src/config";

/**
 * Regression suite for the recall (P0) and precision (P1) work:
 *
 *  P0-1  taint survives destructuring / spread / Object.assign of an opaque value
 *  P0-2  standard DOM event handlers and never-called callbacks are analyzed
 *  P1-1  findings are gated on whether a privilege boundary is actually crossed
 *  P1-2  loops carry a back edge, so loop-carried dependencies are observable
 *
 * Each case is an end-to-end analysis of a fixture extension, because every one
 * of these behaviours is a property of the whole pipeline (CFG shape -> def-use
 * -> cross-context bridge -> policy), not of any single unit.
 */

const FIXTURES = path.resolve(
  __dirname,
  "..",
  "fixtures",
  "extension_components",
);
const VALID_ID = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";

interface FlowLite {
  flowType: string;
  sourceType: string;
  sinkType: string;
  sourceFile?: string;
  sinkFile?: string;
  sinkRemark?: string;
  privilegeCrossing?: boolean;
  privilegeReason?: string;
}

interface SuppressedLite {
  flowType: string;
  sourceType: string;
  sinkType: string;
  reason: string;
}

interface AnalysisResult {
  flows: FlowLite[];
  suppressed: SuppressedLite[];
}

async function analyzeFixture(name: string): Promise<AnalysisResult> {
  const input = path.join(FIXTURES, name);
  const outDir = fs.mkdtempSync(path.join(os.tmpdir(), `epg-recall-${name}-`));

  taintManager.resetAll();
  scopeController.clear();

  await epgModelBuilder.analyze({
    extensionPath: input,
    extensionType: ExtensionSourceType.DIR,
    outputPath: outDir,
    extensionId: VALID_ID,
    extensionVersion: "1.0",
  });

  const summary = taintManager.getGlobalSummary() as {
    flows: FlowLite[];
    privilegeSuppressed: SuppressedLite[];
  };

  fs.rmSync(outDir, { recursive: true, force: true });

  return {
    flows: summary.flows,
    suppressed: summary.privilegeSuppressed ?? [],
  };
}

/** Count flows whose sink is a bookmark write with the given title marker. */
function bookmarkSinks(flows: FlowLite[]): FlowLite[] {
  return flows.filter((f) => f.sinkType === "CHROME_BOOKMARK_CREATE_INFO");
}

describe("P0-1: opaque containers keep their taint through structural operations", () => {
  jest.setTimeout(120_000);

  /**
   * `const { url } = msg` is the single most common shape in extension message
   * handlers. The pattern handler used to hand the binding a *fresh* untainted
   * UnknownDef whenever it could not resolve a concrete property, which is
   * always the case for an opaque payload.
   */
  it("destructured_message: every destructuring form reaches the privileged sink", async () => {
    const { flows } = await analyzeFixture("destructured_message");
    const priv = bookmarkSinks(flows);

    // Four handlers: object pattern, parameter pattern, nested, array pattern.
    expect(priv.length).toBeGreaterThanOrEqual(4);
    for (const f of priv) {
      expect(f.sourceType).toBe("CHROME_ONMESSAGEEXTERNAL_MESSAGE");
      expect(f.flowType).toBe("PRIVILEGE_ESCALATION");
    }
  });

  /**
   * Spread and Object.assign copy *known* properties; an opaque source has
   * none, so the taint has to ride on the destination container for a later
   * `copy.url` read to recover it.
   */
  it("opaque_spread_merge: spread and Object.assign preserve taint", async () => {
    const { flows } = await analyzeFixture("opaque_spread_merge");
    const priv = bookmarkSinks(flows);

    // Three handlers: bare spread, spread + literal props, Object.assign.
    expect(priv.length).toBeGreaterThanOrEqual(3);
    for (const f of priv) {
      expect(f.sourceType).toBe("CHROME_ONMESSAGEEXTERNAL_MESSAGE");
    }
  });
});

describe("P1-2: loops have back edges and reach a bounded fixpoint", () => {
  jest.setTimeout(120_000);

  /**
   * `prev` lags `cur` by one iteration, so it is only tainted on the second
   * pass. Without back edges the CFG walked the loop body exactly once and
   * reported nothing.
   */
  it("loop_carried_taint: one-iteration-lagged variables reach the sink", async () => {
    const { flows } = await analyzeFixture("loop_carried_taint");
    const priv = bookmarkSinks(flows);

    // Three loop shapes: while + unknown guard, for + constant-true guard,
    // in-body accumulator.
    expect(priv.length).toBeGreaterThanOrEqual(3);
  });

  /**
   * A constant-true loop guard (`i < 3` where `i` starts at 0 and `i++` is not
   * modeled) must not prune the loop-exit edge — doing so makes every statement
   * after the loop unreachable. The `for` case in the fixture places its sink
   * after such a loop, so its presence is the assertion.
   */
  it("loop_carried_taint: code after a constant-true loop guard stays reachable", async () => {
    const { flows } = await analyzeFixture("loop_carried_taint");
    // Titles are literal so they do not appear in the flow record; instead we
    // assert on count, which can only reach 3 if the `for` case survived.
    expect(bookmarkSinks(flows).length).toBeGreaterThanOrEqual(3);
  });

  /**
   * Termination guard. A cyclic CFG with an unbounded worklist never returns;
   * this fixture is analyzed by every other test in this file, so a hang here
   * would surface as a suite timeout rather than a failure — the explicit
   * assertion documents the intent.
   */
  it("analysis terminates on cyclic CFGs", async () => {
    const started = Date.now();
    await analyzeFixture("loop_carried_taint");
    expect(Date.now() - started).toBeLessThan(60_000);
  });
});

describe("P0-2: entry points beyond the top-level script", () => {
  jest.setTimeout(120_000);

  /**
   * `click` / `input` / `submit` handlers used to be skipped wholesale, so
   * anything reachable only through them was invisible. All three flows here
   * cross into the background, where `chrome.bookmarks` is genuinely out of the
   * page's reach — so they survive the privilege gate too.
   */
  it("dom_event_entrypoints: standard DOM handlers are analyzed", async () => {
    const { flows } = await analyzeFixture("dom_event_entrypoints");
    const priv = bookmarkSinks(flows);

    expect(priv.length).toBeGreaterThanOrEqual(1);
    for (const f of priv) {
      // Sources come from the page DOM, sink runs in the background.
      expect(f.sourceType).toMatch(/^ELEMENT_/);
      expect(f.sinkFile).toBe("background");
    }
  });

  /**
   * `document.querySelectorAll(...).forEach(el => el.addEventListener(...))` is
   * how real code registers per-field handlers. Modeling the collection as an
   * array of one summary element is what makes the callback run at all.
   */
  it("dom_event_entrypoints: querySelectorAll registration loops are followed", async () => {
    const { flows } = await analyzeFixture("dom_event_entrypoints");
    const fromValue = flows.filter((f) => f.sourceType === "ELEMENT_VALUE");
    expect(fromValue.length).toBeGreaterThanOrEqual(1);
  });

  /**
   * The sink lives in a function handed only to `MutationObserver`, which is
   * not modeled. Nothing in the modeled call graph reaches it, so only the
   * entry-point sweep can.
   */
  it("callback_entrypoint_sweep: functions reachable only via unmodeled APIs are analyzed", async () => {
    const { flows } = await analyzeFixture("callback_entrypoint_sweep");
    expect(bookmarkSinks(flows).length).toBeGreaterThanOrEqual(1);
  });

  it("the entry-point sweep is enabled by default", () => {
    expect(config.coverageAnalysis).toBe(true);
  });
});

describe("P1-1: privilege-delta gate", () => {
  jest.setTimeout(120_000);

  /**
   * A content script reading a page field and POSTing it from that same content
   * script gains nothing the page did not already have. The flow is real; the
   * finding is not.
   */
  it("privilege_page_equivalent: content-script-local network egress is suppressed", async () => {
    const { flows, suppressed } = await analyzeFixture(
      "privilege_page_equivalent",
    );

    expect(flows.filter((f) => f.sinkType.startsWith("FETCH"))).toHaveLength(0);

    // Suppressed, not silently dropped.
    const hit = suppressed.find((s) => s.sinkType.startsWith("FETCH"));
    expect(hit).toBeTruthy();
    expect(hit!.reason).toMatch(/content\s*script/i);
  });

  /**
   * Storage poisoning only matters if something reads the key back. These two
   * fixtures are byte-for-byte the same attack; the only difference is whether
   * a consumer exists.
   */
  it("privilege_storage_no_consumer: a write-only key is suppressed", async () => {
    const { flows, suppressed } = await analyzeFixture(
      "privilege_storage_no_consumer",
    );

    expect(flows.filter((f) => f.flowType === "STORAGE_POSOING")).toHaveLength(
      0,
    );

    const hit = suppressed.find((s) => s.flowType === "STORAGE_POSOING");
    expect(hit).toBeTruthy();
    expect(hit!.reason).toMatch(/never read back/i);
  });

  it("privilege_storage_with_consumer: the same write is reported when a reader exists", async () => {
    const { flows } = await analyzeFixture("privilege_storage_with_consumer");

    const poisoning = flows.filter((f) => f.flowType === "STORAGE_POSOING");
    expect(poisoning.length).toBeGreaterThanOrEqual(1);
    expect(poisoning[0].privilegeCrossing).toBe(true);
  });

  /**
   * Privileged chrome.* APIs are never page-equivalent, whatever frame they run
   * in — the gate must not touch them.
   */
  it("privileged chrome.* sinks always cross the boundary", async () => {
    const { flows } = await analyzeFixture("destructured_message");
    for (const f of bookmarkSinks(flows)) {
      expect(f.privilegeCrossing).toBe(true);
    }
  });

  it("the privilege-delta gate is enabled by default", () => {
    expect(config.privilegeDeltaFiltering).toBe(true);
  });
});

describe("supporting precision fixes", () => {
  jest.setTimeout(120_000);

  /**
   * A helper with several `return`s used to resolve to whichever one was
   * evaluated last. When that was a literal `false` from a catch arm, the
   * caller's `if (!helper(...)) return;` constant-folded and the analyzer
   * pruned the real code path as dead.
   */
  it("multi_return_guard: a multi-return guard does not prune the caller", async () => {
    const { flows } = await analyzeFixture("multi_return_guard");
    expect(bookmarkSinks(flows).length).toBeGreaterThanOrEqual(1);
  });
});
