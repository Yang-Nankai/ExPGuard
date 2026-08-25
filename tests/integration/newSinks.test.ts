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
const VALID_ID = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";

interface FlowLite {
  flowType: string;
  sourceType: string;
  sinkType: string;
  sourceRemark?: string;
  ruleId?: string;
}

async function analyzeFixture(name: string): Promise<FlowLite[]> {
  const input = path.join(FIXTURES, name);
  const outDir = fs.mkdtempSync(path.join(os.tmpdir(), `epg-newsink-${name}-`));

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

  const summary = taintManager.getGlobalSummary() as {
    hasFlows: boolean;
    flows: FlowLite[];
  };

  fs.rmSync(outDir, { recursive: true, force: true });
  return summary.flows;
}

describe("High-value source/sink coverage (#8)", () => {
  jest.setTimeout(60_000);

  afterAll(() => {
    taintRuleEngine.loadDefaults();
  });

  it("debugger Runtime.evaluate is a CODE_INJECTION sink", async () => {
    const flows = await analyzeFixture("debugger_eval_injection");
    const hit = flows.find(
      (f) =>
        f.sinkType === "CHROME_DEBUGGER_COMMAND" &&
        f.flowType === "CODE_INJECTION",
    );
    expect(hit).toBeTruthy();
  });

  it("declarativeNetRequest.updateDynamicRules is a PRIVILEGE_ESCALATION sink", async () => {
    const flows = await analyzeFixture("dnr_rule_hijack");
    const hit = flows.find(
      (f) =>
        f.sinkType === "CHROME_DECLARATIVENETREQUEST_RULES" &&
        f.flowType === "PRIVILEGE_ESCALATION",
    );
    expect(hit).toBeTruthy();
  });

  it("Worker URL and WebAssembly.instantiate are CODE_INJECTION sinks", async () => {
    const flows = await analyzeFixture("wasm_worker_codeexec");
    const worker = flows.find(
      (f) => f.sinkType === "WORKER_URL" && f.flowType === "CODE_INJECTION",
    );
    const wasm = flows.find(
      (f) =>
        f.sinkType === "WASM_INSTANTIATE" && f.flowType === "CODE_INJECTION",
    );
    expect(worker).toBeTruthy();
    expect(wasm).toBeTruthy();
  });

  it("chrome.storage.managed is a SENSITIVE_DATA source → DATA_LEAK via network", async () => {
    const flows = await analyzeFixture("managed_storage_exfil");
    const hit = flows.find(
      (f) =>
        f.sourceType === "CHROME_MANAGED_STORAGE" &&
        f.sinkType === "FETCH_BODY" &&
        f.flowType === "DATA_LEAK",
    );
    expect(hit).toBeTruthy();
    expect((hit?.sourceRemark ?? "").includes("storage.managed")).toBe(true);
  });
});
