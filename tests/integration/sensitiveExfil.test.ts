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
  const outDir = fs.mkdtempSync(path.join(os.tmpdir(), `epg-exfil-${name}-`));

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

describe("Restricted DATA_LEAK policy (sensitive sources → webpage messages)", () => {
  jest.setTimeout(60_000);

  afterAll(() => {
    taintRuleEngine.loadDefaults();
  });

  it("history → fetch body is outside the restricted DATA_LEAK policy", async () => {
    const flows = await analyzeFixture("sensitive_exfil_history");
    const leak = flows.find(
      (f) =>
        f.sourceType === "CHROME_HISTORY_INFO" &&
        f.sinkType === "FETCH_BODY" &&
        f.flowType === "DATA_LEAK",
    );
    expect(leak).toBeUndefined();
  });

  it("tab URL source → network body is outside the restricted DATA_LEAK policy", async () => {
    const flows = await analyzeFixture("indexeddb_tab_url_exfil");
    const leak = flows.find(
      (f) =>
        f.sourceType === "CHROME_TABS_ONUPDATED_URL" &&
        f.sinkType === "FETCH_BODY" &&
        f.flowType === "DATA_LEAK",
    );
    expect(leak).toBeUndefined();
  });

  it("tab URL source → Qi IndexedDB cursor → JSON body is outside the restricted policy", async () => {
    const flows = await analyzeFixture("qi_idb_tab_url_exfil");
    expect(flows.some((f) => f.sourceType === "CHROME_TABS_ONUPDATED_URL" && f.sinkType === "FETCH_BODY" && f.flowType === "DATA_LEAK")).toBe(false);
    expect(flows.every((f) => !(f as any).sinkScriptCode)).toBe(true);
  });

  it("cookie → fetch body is outside the restricted DATA_LEAK policy", async () => {
    const flows = await analyzeFixture("sensitive_exfil_cookie_body");
    const cookieBodyLeaks = flows.filter(
      (f) =>
        f.sourceType === "CHROME_COOKIES_INFO" &&
        f.sinkType === "FETCH_BODY" &&
        f.flowType === "DATA_LEAK",
    );
    expect(cookieBodyLeaks).toHaveLength(0);
  });

  it("cookie → fetch Cookie header is suppressed (benign auth)", async () => {
    const flows = await analyzeFixture("sensitive_exfil_cookie_header");
    const leak = flows.find(
      (f) =>
        f.sourceType === "CHROME_COOKIES_INFO" && f.flowType === "DATA_LEAK",
    );
    expect(leak).toBeUndefined();
  });

  it("cookie → XHR setRequestHeader is suppressed across APIs", async () => {
    const flows = await analyzeFixture("sensitive_exfil_xhr_header");
    const leak = flows.find(
      (f) =>
        f.sourceType === "CHROME_COOKIES_INFO" && f.flowType === "DATA_LEAK",
    );
    expect(leak).toBeUndefined();
  });

  it("cookie → axios data (body) is outside the restricted DATA_LEAK policy", async () => {
    const flows = await analyzeFixture("sensitive_exfil_axios_body");
    const leak = flows.find(
      (f) =>
        f.sourceType === "CHROME_COOKIES_INFO" &&
        f.sinkType === "AXIOS_DATA" &&
        f.flowType === "DATA_LEAK",
    );
    expect(leak).toBeUndefined();
  });

  it("cookie → axios headers is suppressed (header suppression spans axios)", async () => {
    const flows = await analyzeFixture("sensitive_exfil_axios_header");
    const leak = flows.find(
      (f) =>
        f.sourceType === "CHROME_COOKIES_INFO" && f.flowType === "DATA_LEAK",
    );
    expect(leak).toBeUndefined();
  });

  it("cookie → XHR send body is outside the restricted DATA_LEAK policy", async () => {
    const flows = await analyzeFixture("sensitive_exfil_xhr_body");
    const leak = flows.find(
      (f) =>
        f.sourceType === "CHROME_COOKIES_INFO" &&
        f.sinkType === "XML_HTTP_REQUEST_SEND" &&
        f.flowType === "DATA_LEAK",
    );
    expect(leak).toBeUndefined();
  });

  it("cookie → fetch URL is outside the restricted DATA_LEAK policy", async () => {
    const flows = await analyzeFixture("sensitive_exfil_cookie_url");
    const leak = flows.find(
      (f) =>
        f.sourceType === "CHROME_COOKIES_INFO" &&
        f.sinkType === "FETCH_RESOURCE" &&
        f.flowType === "DATA_LEAK",
    );
    expect(leak).toBeUndefined();
  });

  it("identity auth token → fetch body is outside the restricted DATA_LEAK policy", async () => {
    const flows = await analyzeFixture("sensitive_exfil_identity_token");
    const leaks = flows.filter(
      (f) =>
        f.sourceType === "CHROME_IDENTITY_TOKEN" &&
        f.sinkType === "FETCH_BODY" &&
        f.flowType === "DATA_LEAK",
    );
    expect(leaks).toHaveLength(0);
  });

  it("pseudo storage returned to the page is outside the restricted policy", async () => {
    const flows = await analyzeFixture("storage_page_egress_exact_key");
    const leak = flows.find(
      (f) =>
        f.sourceType === "PSEUDO_STORAGE" &&
        f.sinkType === "WINDOW_POSTMESSAGE" &&
        f.flowType === "DATA_LEAK" &&
        f.ruleId === "pseudo-storage-page-message-egress",
    );
    expect(leak).toBeUndefined();
  });

  it("ordinary stored UI preferences are not treated as sensitive leaks", async () => {
    const flows = await analyzeFixture("storage_page_egress_preference_key");
    expect(
      flows.some(
        (f) =>
          f.sourceType === "PSEUDO_STORAGE" &&
          f.sinkType === "WINDOW_POSTMESSAGE" &&
          f.flowType === "DATA_LEAK",
      ),
    ).toBe(false);
  });

  it("page-selected storage keys are tracked through their message response", async () => {
    const flows = await analyzeFixture("storage_page_egress_dynamic_key");
    expect(
      flows.some(
        (f) =>
          f.sourceType === "STORAGE_ALL_ITEMS" &&
          f.sinkType === "WINDOW_POSTMESSAGE" &&
          f.flowType === "DATA_LEAK" &&
          f.ruleId === "storage-data-message-egress",
      ),
    ).toBe(true);
  });

  it("pseudo storage external response is outside the restricted policy", async () => {
    const allowedFlows = await analyzeFixture(
      "storage_external_page_egress_allowed",
    );
    expect(
      allowedFlows.some(
        (f) =>
          f.sourceType === "PSEUDO_STORAGE" &&
          f.sinkType === "CHROME_RUNTIME_ONMESSAGEEXTERNAL_SENDRESPONSE" &&
          f.flowType === "DATA_LEAK" &&
          f.ruleId === "pseudo-storage-page-message-egress",
      ),
    ).toBe(false);

    const blockedFlows = await analyzeFixture(
      "storage_external_page_egress_blocked",
    );
    expect(
      blockedFlows.some(
        (f) =>
          f.sourceType === "PSEUDO_STORAGE" &&
          f.sinkType === "CHROME_RUNTIME_ONMESSAGEEXTERNAL_SENDRESPONSE" &&
          f.flowType === "DATA_LEAK",
      ),
    ).toBe(false);
  });

  it("system.cpu → fetch body is outside the restricted DATA_LEAK policy", async () => {
    const flows = await analyzeFixture("sensitive_exfil_system_cpu");
    const leaks = flows.filter(
      (f) =>
        f.sourceType === "CHROME_SYSTEM_CPU" &&
        f.sinkType === "FETCH_BODY" &&
        f.flowType === "DATA_LEAK",
    );
    expect(leaks).toHaveLength(0);
  });
});
