import fs from "fs";
import os from "os";
import path from "path";
import { epgModelBuilder } from "../../src/epgmodelbuilder";
import { ExtensionSourceType } from "../../src/extension/extensionLoader";
import { taintManager } from "../../src/taint";
import { taintRuleEngine } from "../../src/taint/ruleEngine";
import { scopeController } from "../../src/scope/scopeCtrl";

const REPO_ROOT = path.resolve(__dirname, "..", "..");
const SAMPLES_DIR = path.join(REPO_ROOT, "samples");
const VALID_ID = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";

interface FlowLite {
  flowType: string;
  sourceType: string;
  sinkType: string;
  ruleId?: string;
  ruleDescription?: string;
}

async function analyze(
  sample: string,
  rulesPath?: string,
): Promise<FlowLite[]> {
  const input = path.join(SAMPLES_DIR, sample);
  const outDir = fs.mkdtempSync(path.join(os.tmpdir(), `epg-rule-${sample}-`));

  taintManager.resetAll();
  scopeController.clear();
  // Each test wants a clean rule set — start from the bundled defaults.
  taintRuleEngine.loadDefaults();
  if (rulesPath) {
    taintRuleEngine.loadFromFile(rulesPath);
  }

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
  return summary.flows;
}

describe("Custom taint rule end-to-end", () => {
  jest.setTimeout(60_000);

  it("default rules: cookies → fetch is NOT reported as DATA_LEAK", async () => {
    const flows = await analyze("data_leak");
    const cookieFetchLeak = flows.find(
      (f) =>
        f.sourceType === "CHROME_COOKIES_INFO" &&
        (f.sinkType === "FETCH_RESOURCE" || f.sinkType === "FETCH_OPTIONS") &&
        f.flowType === "DATA_LEAK",
    );
    expect(cookieFetchLeak).toBeUndefined();
  });

  it("custom rule: cookies → fetch surfaces as DATA_LEAK without losing other flows", async () => {
    const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "epg-custom-rules-"));
    const rulesPath = path.join(tmp, "rules.json");
    fs.writeFileSync(
      rulesPath,
      JSON.stringify({
        version: 1,
        rules: [
          {
            id: "sensitive-data-network-send",
            description: "Cookies / bookmarks / history exfiltrated via network",
            flowType: "DATA_LEAK",
            match: {
              sourceCapability: "SENSITIVE_DATA",
              sinkCapability: "NETWORK_SEND",
            },
          },
        ],
      }),
      "utf-8",
    );

    const flows = await analyze("data_leak", rulesPath);

    const cookieFetchLeak = flows.find(
      (f) =>
        f.sourceType === "CHROME_COOKIES_INFO" &&
        (f.sinkType === "FETCH_RESOURCE" || f.sinkType === "FETCH_OPTIONS") &&
        f.flowType === "DATA_LEAK",
    );
    expect(cookieFetchLeak).toBeTruthy();
    expect(cookieFetchLeak!.ruleId).toBe("sensitive-data-network-send");

    // Pre-existing flows are still there (the rule is additive, not replacing).
    const externalLeak = flows.find(
      (f) =>
        f.flowType === "DATA_LEAK" &&
        f.sinkType === "CHROME_RUNTIME_ONMESSAGEEXTERNAL_SENDRESPONSE",
    );
    expect(externalLeak).toBeTruthy();

    fs.rmSync(tmp, { recursive: true, force: true });
  });

  afterAll(() => {
    // Restore the engine for any later test files in the same Jest worker.
    taintRuleEngine.loadDefaults();
  });
});
