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

describe("Sensitive data exfiltration (DATA_LEAK via network)", () => {
  jest.setTimeout(60_000);

  afterAll(() => {
    taintRuleEngine.loadDefaults();
  });

  it("history → fetch body is reported as DATA_LEAK", async () => {
    const flows = await analyzeFixture("sensitive_exfil_history");
    const leak = flows.find(
      (f) =>
        f.sourceType === "CHROME_HISTORY_INFO" &&
        f.sinkType === "FETCH_BODY" &&
        f.flowType === "DATA_LEAK",
    );
    expect(leak).toBeTruthy();
  });

  it("cookie → fetch body is reported as DATA_LEAK and tagged with the domain", async () => {
    const flows = await analyzeFixture("sensitive_exfil_cookie_body");
    const cookieBodyLeaks = flows.filter(
      (f) =>
        f.sourceType === "CHROME_COOKIES_INFO" &&
        f.sinkType === "FETCH_BODY" &&
        f.flowType === "DATA_LEAK",
    );
    expect(cookieBodyLeaks.length).toBeGreaterThan(0);
    // Source domain tagging: cookies.getAll({domain:"facebook.com"}).
    const tagged = cookieBodyLeaks.some((f) =>
      (f.sourceRemark ?? "").includes("facebook.com"),
    );
    expect(tagged).toBe(true);
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

  it("cookie → axios data (body) is reported as DATA_LEAK", async () => {
    const flows = await analyzeFixture("sensitive_exfil_axios_body");
    const leak = flows.find(
      (f) =>
        f.sourceType === "CHROME_COOKIES_INFO" &&
        f.sinkType === "AXIOS_DATA" &&
        f.flowType === "DATA_LEAK",
    );
    expect(leak).toBeTruthy();
  });

  it("cookie → axios headers is suppressed (header suppression spans axios)", async () => {
    const flows = await analyzeFixture("sensitive_exfil_axios_header");
    const leak = flows.find(
      (f) =>
        f.sourceType === "CHROME_COOKIES_INFO" && f.flowType === "DATA_LEAK",
    );
    expect(leak).toBeUndefined();
  });

  it("cookie → XHR send body is reported (body leak, not a header)", async () => {
    const flows = await analyzeFixture("sensitive_exfil_xhr_body");
    const leak = flows.find(
      (f) =>
        f.sourceType === "CHROME_COOKIES_INFO" &&
        f.sinkType === "XML_HTTP_REQUEST_SEND" &&
        f.flowType === "DATA_LEAK",
    );
    expect(leak).toBeTruthy();
  });

  it("cookie → fetch URL (query string) is reported (URL leak, not a header)", async () => {
    const flows = await analyzeFixture("sensitive_exfil_cookie_url");
    const leak = flows.find(
      (f) =>
        f.sourceType === "CHROME_COOKIES_INFO" &&
        f.sinkType === "FETCH_RESOURCE" &&
        f.flowType === "DATA_LEAK",
    );
    expect(leak).toBeTruthy();
  });

  it("identity auth token → fetch body is reported and tagged", async () => {
    const flows = await analyzeFixture("sensitive_exfil_identity_token");
    const leaks = flows.filter(
      (f) =>
        f.sourceType === "CHROME_IDENTITY_TOKEN" &&
        f.sinkType === "FETCH_BODY" &&
        f.flowType === "DATA_LEAK",
    );
    expect(leaks.length).toBeGreaterThan(0);
    const tagged = leaks.some((f) =>
      (f.sourceRemark ?? "").includes("identity.authToken"),
    );
    expect(tagged).toBe(true);
  });

  it("system.cpu fingerprint → fetch body is reported as DATA_LEAK and tagged", async () => {
    const flows = await analyzeFixture("sensitive_exfil_system_cpu");
    const leaks = flows.filter(
      (f) =>
        f.sourceType === "CHROME_SYSTEM_CPU" &&
        f.sinkType === "FETCH_BODY" &&
        f.flowType === "DATA_LEAK",
    );
    expect(leaks.length).toBeGreaterThan(0);
    expect(leaks.some((f) => (f.sourceRemark ?? "").includes("system.cpu"))).toBe(
      true,
    );
  });
});
