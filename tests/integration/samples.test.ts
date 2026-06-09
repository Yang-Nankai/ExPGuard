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

  it("data_leak: detects at least one source→sink flow", async () => {
    const { hasFlows, flows } = await analyzeSampleDir("data_leak");
    expect(hasFlows).toBe(true);
    expect(flows.length).toBeGreaterThan(0);

    // Every reported flow must be well-formed.
    for (const f of flows) {
      expect(typeof f.flowType).toBe("string");
      expect(f.sourceType).toBeTruthy();
      expect(f.sinkType).toBeTruthy();
    }
  });

  it("privilege_execution: produces flows after the scope-based refactor", async () => {
    const { flows } = await analyzeSampleDir("privilege_execution");
    expect(Array.isArray(flows)).toBe(true);
    // This sample is designed to contain a privilege-escalation style flow.
    expect(flows.length).toBeGreaterThan(0);
  });

  it("re-running an analysis is deterministic for the same input", async () => {
    const first = await analyzeSampleDir("data_leak");
    const second = await analyzeSampleDir("data_leak");
    expect(second.flows.length).toBe(first.flows.length);
  });
});
