import path from "path";
import os from "os";
import fs from "fs";
import { epgModelBuilder } from "../../src/epgmodelbuilder";
import { ExtensionSourceType } from "../../src/extension/extensionLoader";
import { taintManager } from "../../src/taint";
import { scopeController } from "../../src/scope/scopeCtrl";

const REPO_ROOT = path.resolve(__dirname, "..", "..");
const SAMPLES_DIR = path.join(REPO_ROOT, "samples");
const VALID_ID = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";

interface FlowLite {
  flowType: string;
  sourceType: string;
  sinkType: string;
}

async function analyzeSampleDir(sample: string): Promise<{
  hasFlows: boolean;
  flows: FlowLite[];
}> {
  const input = path.join(SAMPLES_DIR, sample);
  const outDir = fs.mkdtempSync(path.join(os.tmpdir(), `epg-${sample}-`));

  // Reset global singletons so each test starts clean.
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
    hasFlows: boolean;
    flows: FlowLite[];
  };

  fs.rmSync(outDir, { recursive: true, force: true });
  return summary;
}

describe("End-to-end taint detection over bundled samples", () => {
  // The whole pipeline is fairly heavy, so give each sample room.
  jest.setTimeout(60_000);

  it.each([
    ["privilege_execution", "PRIVILEGE_ESCALATION"],
    ["storage_poisoning", "STORAGE_POSOING"],
    ["dom_xss", "DOM_XSS"],
    ["request_forgery", "REQUEST_FORGERY"],
  ])("%s: reports the expected paper vulnerability class", async (sample, flowType) => {
    const { hasFlows, flows } = await analyzeSampleDir(sample);
    expect(hasFlows).toBe(true);
    expect(flows.some((flow) => flow.flowType === flowType)).toBe(true);

    for (const flow of flows) {
      expect(flow.flowType).toBeTruthy();
      expect(flow.sourceType).toBeTruthy();
      expect(flow.sinkType).toBeTruthy();
    }
  });

  it("storage resolution is idempotent across report consumers", async () => {
    const input = path.join(SAMPLES_DIR, "storage_poisoning");
    const outDir = fs.mkdtempSync(path.join(os.tmpdir(), "epg-storage-idempotent-"));

    taintManager.resetAll();
    scopeController.clear();

    try {
      await epgModelBuilder.analyze({
        extensionPath: input,
        extensionType: ExtensionSourceType.DIR,
        outputPath: outDir,
        extensionId: VALID_ID,
        extensionVersion: "1.0",
      });

      const shape = (reports: any[]) =>
        reports.map((report) => ({
          filename: report.filename,
          issues: report.totalIssues,
          pathSteps: report.issues.reduce(
            (total: number, issue: any) => total + issue.flowMeta.totalSteps,
            0,
          ),
        }));

      const first = shape(
        taintManager.generateGlobalReport({ includeCode: false, dedupSources: true }),
      );
      const second = shape(
        taintManager.generateGlobalReport({ includeCode: false, dedupSources: true }),
      );

      expect(second).toEqual(first);
    } finally {
      fs.rmSync(outDir, { recursive: true, force: true });
    }
  });

  it("re-running an analysis is deterministic for the same input", async () => {
    const first = await analyzeSampleDir("request_forgery");
    const second = await analyzeSampleDir("request_forgery");
    expect(second.flows.length).toBe(first.flows.length);
  });
});
