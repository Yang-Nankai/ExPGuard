import {
  buildProgressCard,
  buildSummaryCard,
  BatchProgress,
} from "../../src/notify/feishuCards";
import type { RunResult } from "../../src/run";
import { ExtensionSourceType } from "../../src/extension/extensionLoader";

function mkResult(over: Partial<RunResult>): RunResult {
  return {
    sourceType: ExtensionSourceType.DIR,
    input: "ext",
    outputDir: "/tmp/out",
    status: "success",
    durationMs: 100,
    totalFiles: 1,
    findings: 0,
    flowTypeCounts: {},
    ...over,
  };
}

describe("Feishu card builders", () => {
  it("progress card encodes a bar, counts, and current target", () => {
    const p: BatchProgress = {
      total: 4,
      completed: 2,
      current: "ext-c",
      findings: 3,
      errors: 0,
      startedAtMs: 0,
      nowMs: 5000,
    };
    const card = buildProgressCard(p) as any;
    const text = JSON.stringify(card);
    expect(card.header.title.content).toContain("running");
    expect(text).toContain("2/4");
    expect(text).toContain("50%");
    expect(text).toContain("ext-c");
    expect(text).toContain("3"); // findings
    // No errors → orange because findings>0.
    expect(card.header.template).toBe("orange");
  });

  it("progress card is green when clean, red when errors present", () => {
    const clean = buildProgressCard({
      total: 2,
      completed: 1,
      findings: 0,
      errors: 0,
      startedAtMs: 0,
      nowMs: 1000,
    }) as any;
    expect(clean.header.template).toBe("green");

    const failing = buildProgressCard({
      total: 2,
      completed: 1,
      findings: 5,
      errors: 1,
      startedAtMs: 0,
      nowMs: 1000,
    }) as any;
    expect(failing.header.template).toBe("red");
  });

  it("summary card aggregates findings, errors and flow types", () => {
    const results: RunResult[] = [
      mkResult({
        extensionId: "clean-ext",
        findings: 0,
        nodeCoverage: 0.9,
      }),
      mkResult({
        extensionId: "leaky-ext",
        findings: 2,
        flowTypeCounts: { DATA_LEAK: 2 },
        nodeCoverage: 0.7,
      }),
      mkResult({
        extensionId: "broken-ext",
        status: "error",
        errorType: "ParserError",
      }),
    ];
    const card = buildSummaryCard(results, 0, 12_000) as any;
    const text = JSON.stringify(card);

    expect(card.header.title.content).toContain("done");
    // Errors present → red theme.
    expect(card.header.template).toBe("red");
    expect(text).toContain("DATA_LEAK");
    expect(text).toContain("clean-ext");
    expect(text).toContain("leaky-ext");
    expect(text).toContain("broken-ext");
    // Coverage percent surfaced.
    expect(text).toContain("90%");
  });

  it("summary card escapes markdown control chars in names", () => {
    const card = buildSummaryCard(
      [mkResult({ extensionId: "a*b_c`d" })],
      0,
      1000,
    ) as any;
    const text = JSON.stringify(card);
    // Raw unescaped sequence must not appear.
    expect(text).not.toContain("a*b_c`d");
  });
});
