import path from "path";
import os from "os";
import fs from "fs";
import { epgModelBuilder } from "../../src/epgmodelbuilder";
import { ExtensionSourceType } from "../../src/extension/extensionLoader";
import { taintManager } from "../../src/taint";
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
  sourceFile?: string;
  sinkFile?: string;
}

async function analyzeFixture(name: string): Promise<FlowLite[]> {
  const input = path.join(FIXTURES, name);
  const outDir = fs.mkdtempSync(path.join(os.tmpdir(), `epg-fw-${name}-`));

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
  return summary.flows;
}

describe("Framework sink modeling: React / Vue / Angular", () => {
  jest.setTimeout(60_000);

  it("react_dangerous_html: document.URL → dangerouslySetInnerHTML is DOM_XSS", async () => {
    const flows = await analyzeFixture("react_dangerous_html");
    const xss = flows.find(
      (f) =>
        f.sourceType === "DOCUMENT_URL" &&
        f.sinkType === "REACT_DANGEROUS_HTML",
    );
    expect(xss).toBeTruthy();
    expect(xss?.flowType).toBe("DOM_XSS");
  });

  it("vue_v_html: document.URL → Vue template injection is DOM_XSS", async () => {
    const flows = await analyzeFixture("vue_v_html");
    const xss = flows.find(
      (f) => f.sourceType === "DOCUMENT_URL" && f.sinkType === "VUE_V_HTML",
    );
    expect(xss).toBeTruthy();
    expect(xss?.flowType).toBe("DOM_XSS");
  });

  it("angular_bypass_security: document.URL → $sce.trustAsHtml is DOM_XSS", async () => {
    const flows = await analyzeFixture("angular_bypass_security");
    const xss = flows.find(
      (f) =>
        f.sourceType === "DOCUMENT_URL" &&
        f.sinkType === "ANGULAR_BYPASS_SECURITY",
    );
    expect(xss).toBeTruthy();
    expect(xss?.flowType).toBe("DOM_XSS");
  });
});
