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
  const outDir = fs.mkdtempSync(path.join(os.tmpdir(), `epg-precision-${name}-`));

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

describe("Precision improvements: path sensitivity & taint propagation", () => {
  jest.setTimeout(60_000);

  /**
   * Without path sensitivity the previous analyzer would still propagate
   * `document.URL` into `payload` through the dead `if (1 === 2)` branch.
   * After the upgrade, the constant-false predicate prunes the branch and
   * no flow should be emitted.
   */
  it("path_dead_branch: produces no flows when the tainted assignment is in a dead branch", async () => {
    const flows = await analyzeFixture("path_dead_branch");
    const privEsc = flows.find(
      (f) =>
        f.sourceType === "DOCUMENT_URL" &&
        f.sinkType === "CHROME_BOOKMARK_CREATE_INFO",
    );
    expect(privEsc).toBeUndefined();
  });

  /**
   * After `JSON.parse(taintedString)`, reading `.url` on the parsed object
   * should still carry the taint (container-taint propagation). This was
   * the most common false-negative pattern before the fix.
   */
  it("container_taint_json: detects taint through a JSON.parse + property read", async () => {
    const flows = await analyzeFixture("container_taint_json");
    const privEsc = flows.find(
      (f) =>
        f.sourceType === "DOCUMENT_URL" &&
        f.sinkType === "CHROME_BOOKMARK_CREATE_INFO",
    );
    expect(privEsc).toBeTruthy();
  });

  /**
   * `parseInt(taintedString, 10)` was previously modeled as an untainted
   * unknown. With taint-preserving scalar casts the downstream privileged
   * sink should now be flagged.
   */
  it("scalar_cast_parseint: parseInt preserves taint through the cast", async () => {
    const flows = await analyzeFixture("scalar_cast_parseint");
    const privEsc = flows.find(
      (f) =>
        f.sourceType === "DOCUMENT_URL" &&
        f.sinkType === "CHROME_BOOKMARK_CREATE_INFO",
    );
    expect(privEsc).toBeTruthy();
  });
});
