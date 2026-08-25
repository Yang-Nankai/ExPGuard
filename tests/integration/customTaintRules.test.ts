import fs from "fs";
import os from "os";
import path from "path";
import { epgModelBuilder } from "../../src/epgmodelbuilder";
import { ExtensionSourceType } from "../../src/extension/extensionLoader";
import { taintManager } from "../../src/taint";
import { taintRuleEngine } from "../../src/taint/ruleEngine";
import { scopeController } from "../../src/scope/scopeCtrl";

const REPO_ROOT = path.resolve(__dirname, "..", "..");
const FIXTURES_DIR = path.join(
  REPO_ROOT,
  "tests",
  "fixtures",
  "extension_components",
);
const VALID_ID = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";

interface FlowLite {
  flowType: string;
  sourceType: string;
  sinkType: string;
  ruleId?: string;
  ruleDescription?: string;
}

async function analyze(
  fixture: string,
  rulesPath?: string,
): Promise<FlowLite[]> {
  const input = path.join(FIXTURES_DIR, fixture);
  const outDir = fs.mkdtempSync(path.join(os.tmpdir(), `epg-rule-${fixture}-`));

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

  it("default rules: cookies → fetch body IS now reported as DATA_LEAK", async () => {
    const flows = await analyze("sensitive_exfil_cookie_body");
    const cookieFetchLeak = flows.find(
      (f) =>
        f.sourceType === "CHROME_COOKIES_INFO" &&
        (f.sinkType === "FETCH_BODY" ||
          f.sinkType === "FETCH_RESOURCE" ||
          f.sinkType === "FETCH_OPTIONS") &&
        f.flowType === "DATA_LEAK",
    );
    expect(cookieFetchLeak).toBeTruthy();
    expect(cookieFetchLeak!.ruleId).toBe("sensitive-data-network-send");
  });

  it("custom suppress rule can turn the sensitive-data-network-send flow off", async () => {
    const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "epg-custom-rules-"));
    const rulesPath = path.join(tmp, "rules.json");
    fs.writeFileSync(
      rulesPath,
      JSON.stringify({
        version: 1,
        rules: [],
        suppress: [
          {
            id: "user-suppress-cookie-network",
            description: "This deployment treats cookies → network as benign.",
            flowType: "DATA_LEAK",
            match: {
              sourceType: "CHROME_COOKIES_INFO",
              sinkCapability: "NETWORK_SEND",
            },
          },
        ],
      }),
      "utf-8",
    );

    const flows = await analyze("sensitive_exfil_cookie_body", rulesPath);

    // The cookie → fetch flow is now suppressed by the user rule.
    const cookieFetchLeak = flows.find(
      (f) =>
        f.sourceType === "CHROME_COOKIES_INFO" &&
        f.flowType === "DATA_LEAK" &&
        (f.sinkType === "FETCH_BODY" ||
          f.sinkType === "FETCH_RESOURCE" ||
          f.sinkType === "FETCH_OPTIONS"),
    );
    expect(cookieFetchLeak).toBeUndefined();

    fs.rmSync(tmp, { recursive: true, force: true });
  });

  afterAll(() => {
    // Restore the engine for any later test files in the same Jest worker.
    taintRuleEngine.loadDefaults();
  });
});
