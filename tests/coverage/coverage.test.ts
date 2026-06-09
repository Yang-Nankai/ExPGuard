import path from "path";
import os from "os";
import fs from "fs";
import { epgModelBuilder } from "../../src/epgmodelbuilder";
import { ExtensionSourceType } from "../../src/extension/extensionLoader";
import { taintManager } from "../../src/taint";
import { taintRuleEngine } from "../../src/taint/ruleEngine";
import { scopeController } from "../../src/scope/scopeCtrl";
import {
  computeCoverage,
  formatCoveragePct,
} from "../../src/coverage/coverage";

const FIXTURES = path.resolve(
  __dirname,
  "..",
  "fixtures",
  "extension_components",
);
const VALID_ID = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";

async function analyzeAndCover(name: string) {
  const input = path.join(FIXTURES, name);
  const outDir = fs.mkdtempSync(path.join(os.tmpdir(), `epg-cov-${name}-`));

  taintManager.resetAll();
  scopeController.clear();
  taintRuleEngine.loadDefaults();

  await epgModelBuilder.analyze({
    extensionPath: input,
    extensionType: ExtensionSourceType.DIR,
    outputPath: outDir,
    extensionId: VALID_ID,
    extensionVersion: "1.0",
  });

  const coverage = computeCoverage(scopeController.pageScopeTrees);
  fs.rmSync(outDir, { recursive: true, force: true });
  return coverage;
}

describe("Analysis coverage module", () => {
  jest.setTimeout(60_000);

  afterAll(() => {
    taintRuleEngine.loadDefaults();
  });

  it("formatCoveragePct renders a percent with one decimal", () => {
    expect(formatCoveragePct(0)).toBe("0.0%");
    expect(formatCoveragePct(1)).toBe("100.0%");
    expect(formatCoveragePct(0.5)).toBe("50.0%");
  });

  it("computeCoverage on no scope trees is well-formed and 100% (vacuous)", () => {
    const cov = computeCoverage([]);
    expect(cov.totalNodes).toBe(0);
    expect(cov.coveredNodes).toBe(0);
    expect(cov.nodeCoverage).toBe(1);
    expect(cov.analyzedScripts).toBe(0);
    expect(cov.scripts).toEqual([]);
  });

  it("reports real coverage for an analyzed extension", async () => {
    const cov = await analyzeAndCover("managed_storage_exfil");

    // There is real code, so the denominator is positive.
    expect(cov.totalNodes).toBeGreaterThan(0);
    expect(cov.analyzedScripts).toBeGreaterThan(0);

    // Ratios are bounded [0,1].
    expect(cov.nodeCoverage).toBeGreaterThanOrEqual(0);
    expect(cov.nodeCoverage).toBeLessThanOrEqual(1);
    expect(cov.scopeCoverage).toBeGreaterThanOrEqual(0);
    expect(cov.scopeCoverage).toBeLessThanOrEqual(1);

    // The reachable count never exceeds the total.
    expect(cov.coveredNodes).toBeLessThanOrEqual(cov.totalNodes);

    // The straight-line background.js body is on the analyzed path, so some
    // nodes must be covered (coverage is not zero for executed top-level code).
    expect(cov.coveredNodes).toBeGreaterThan(0);

    // Per-script entries are present and internally consistent.
    const bg = cov.scripts.find((s) => s.file.includes("background"));
    expect(bg).toBeTruthy();
    expect(bg!.coveredNodes).toBeLessThanOrEqual(bg!.totalNodes);
  });
});
