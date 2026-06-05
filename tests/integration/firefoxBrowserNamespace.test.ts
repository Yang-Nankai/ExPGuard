import path from "path";
import os from "os";
import fs from "fs";
import { epgModelBuilder } from "../../src/epgmodelbuilder";
import { ExtensionSourceType } from "../../src/extension/extensionLoader";
import { taintManager } from "../../src/taint";
import { taintRuleEngine } from "../../src/taint/ruleEngine";
import { scopeController } from "../../src/scope/scopeCtrl";

const FIXTURES = path.resolve(
  __dirname,
  "..",
  "fixtures",
  "extension_components",
);

// A Firefox extension ID (GUID style) — exercises the relaxed ID validation
// that accepts Firefox IDs in addition to the Chrome [a-p]{32} format.
const FIREFOX_ID = "{11111111-1111-1111-1111-111111111111}";

interface FlowLite {
  flowType: string;
  sourceType: string;
  sinkType: string;
}

async function analyzeFixture(
  name: string,
  extensionId: string,
): Promise<FlowLite[]> {
  const input = path.join(FIXTURES, name);
  const outDir = fs.mkdtempSync(path.join(os.tmpdir(), `epg-ffns-${name}-`));

  taintManager.resetAll();
  scopeController.clear();
  taintRuleEngine.loadDefaults();

  await epgModelBuilder.analyze({
    extensionPath: input,
    extensionType: ExtensionSourceType.DIR,
    outputPath: outDir,
    extensionId,
    extensionVersion: "1.0",
  });

  const summary = taintManager.getGlobalSummary() as {
    hasFlows: boolean;
    flows: FlowLite[];
  };

  fs.rmSync(outDir, { recursive: true, force: true });
  return summary.flows;
}

describe("Firefox browser.* namespace support", () => {
  jest.setTimeout(60_000);

  afterAll(() => {
    taintRuleEngine.loadDefaults();
  });

  it("browser.cookies.getAll → fetch body is a DATA_LEAK (browser.* aliased to chrome.*)", async () => {
    const flows = await analyzeFixture("firefox_browser_ns", FIREFOX_ID);
    const leak = flows.find(
      (f) =>
        f.sourceType === "CHROME_COOKIES_INFO" &&
        f.sinkType === "FETCH_BODY" &&
        f.flowType === "DATA_LEAK",
    );
    // If browser.* were not modeled, the source would fall back to UnknownDef
    // and taint would be dropped — no flow at all.
    expect(leak).toBeTruthy();
  });

  it("accepts a Firefox GUID extension ID without throwing", async () => {
    // The analysis above already runs through ExtensionContext's ID assertion
    // with a Firefox GUID; reaching here (flows array populated) proves the
    // relaxed validation path works.
    const flows = await analyzeFixture("firefox_browser_ns", FIREFOX_ID);
    expect(Array.isArray(flows)).toBe(true);
  });
});
