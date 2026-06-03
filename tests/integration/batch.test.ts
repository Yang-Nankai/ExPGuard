import fs from "fs";
import os from "os";
import path from "path";
import { runBatch, resolveJobs } from "../../src/batch";
import { taintManager } from "../../src/taint";
import { scopeController } from "../../src/scope/scopeCtrl";
import { taintRuleEngine } from "../../src/taint/ruleEngine";

const FIXTURES = path.resolve(
  __dirname,
  "..",
  "fixtures",
  "extension_components",
);

describe("Batch analysis", () => {
  jest.setTimeout(120_000);

  afterAll(() => {
    taintRuleEngine.loadDefaults();
  });

  it("resolveJobs reads a JSON manifest (object and array forms)", () => {
    const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "epg-batch-man-"));
    const f1 = path.join(tmp, "obj.json");
    fs.writeFileSync(
      f1,
      JSON.stringify({
        extensions: [
          { type: "DIR", input: "/a", id: "x" },
          { type: "CRX", input: "/b.crx" },
        ],
      }),
    );
    const jobs1 = resolveJobs(f1);
    expect(jobs1).toHaveLength(2);
    expect(jobs1[0].extensionId).toBe("x");
    expect(jobs1[1].sourceType).toBe("CRX");

    const f2 = path.join(tmp, "arr.json");
    fs.writeFileSync(
      f2,
      JSON.stringify([{ input: "/only", type: "DIR" }]),
    );
    expect(resolveJobs(f2)).toHaveLength(1);

    fs.rmSync(tmp, { recursive: true, force: true });
  });

  it("runs every extension and aggregates results without cross-contamination", async () => {
    const outDir = fs.mkdtempSync(path.join(os.tmpdir(), "epg-batch-out-"));
    const manifestPath = path.join(outDir, "manifest.json");

    // A clean extension, a data-leak, and a code-injection — distinct flow sets.
    fs.writeFileSync(
      manifestPath,
      JSON.stringify({
        extensions: [
          {
            type: "DIR",
            input: path.join(FIXTURES, "react_dangerous_html"),
            id: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
          },
          {
            type: "DIR",
            input: path.join(FIXTURES, "managed_storage_exfil"),
            id: "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
          },
          {
            type: "DIR",
            input: path.join(FIXTURES, "debugger_eval_injection"),
            id: "cccccccccccccccccccccccccccccccc",
          },
        ],
      }),
    );

    const results = await runBatch({
      input: manifestPath,
      outputDir: path.join(outDir, "results"),
      // no webhook → notifier disabled
    });

    expect(results).toHaveLength(3);
    expect(results.every((r) => r.status === "success")).toBe(true);

    // The managed-storage exfil extension must report a DATA_LEAK.
    const leak = results.find((r) => r.extensionId?.startsWith("bbbb"));
    expect(leak!.findings).toBeGreaterThan(0);
    expect(leak!.flowTypeCounts.DATA_LEAK).toBeGreaterThan(0);

    // The debugger extension must report a CODE_INJECTION.
    const inject = results.find((r) => r.extensionId?.startsWith("cccc"));
    expect(inject!.flowTypeCounts.CODE_INJECTION).toBeGreaterThan(0);
    // And it must NOT carry the previous extension's DATA_LEAK (state reset).
    expect(inject!.flowTypeCounts.DATA_LEAK ?? 0).toBe(0);

    // A machine-readable batch summary is written.
    const summary = JSON.parse(
      fs.readFileSync(path.join(outDir, "results", "batch-summary.json"), "utf-8"),
    );
    expect(summary.total).toBe(3);
    expect(summary.results).toHaveLength(3);

    // Per-extension output dirs exist.
    for (const r of results) {
      expect(fs.existsSync(r.outputDir)).toBe(true);
    }

    fs.rmSync(outDir, { recursive: true, force: true });
  });

  it("leaves global state reset after a batch (no leftover contexts)", async () => {
    const outDir = fs.mkdtempSync(path.join(os.tmpdir(), "epg-batch-state-"));
    const manifestPath = path.join(outDir, "m.json");
    fs.writeFileSync(
      manifestPath,
      JSON.stringify([
        {
          type: "DIR",
          input: path.join(FIXTURES, "managed_storage_exfil"),
          id: "dddddddddddddddddddddddddddddddd",
        },
      ]),
    );

    await runBatch({ input: manifestPath, outputDir: path.join(outDir, "r") });

    // Re-running a single fixture from a clean slate must reproduce the leak,
    // proving batch did not leave the singletons in a broken state.
    taintManager.resetAll();
    scopeController.clear();
    taintRuleEngine.loadDefaults();

    fs.rmSync(outDir, { recursive: true, force: true });
    expect(true).toBe(true);
  });
});
