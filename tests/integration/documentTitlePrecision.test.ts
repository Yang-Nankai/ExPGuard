import fs from "fs";
import os from "os";
import path from "path";
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

async function analyzeFixture(name: string): Promise<any[]> {
  const outputPath = fs.mkdtempSync(path.join(os.tmpdir(), `epg-title-${name}-`));
  taintManager.resetAll();
  scopeController.clear();
  await epgModelBuilder.analyze({
    extensionPath: path.join(FIXTURES, name),
    extensionType: ExtensionSourceType.DIR,
    outputPath,
    extensionId: "dddddddddddddddddddddddddddddddd",
    extensionVersion: "1.0",
  });
  const flows = (taintManager.getGlobalSummary() as { flows: any[] }).flows;
  fs.rmSync(outputPath, { recursive: true, force: true });
  return flows;
}

describe("Document-title source precision", () => {
  jest.setTimeout(60_000);

  it("retains concrete title storage and excludes sibling fields / array length", async () => {
    const flows = await analyzeFixture("document_title_precision");

    expect(flows).toEqual(
      expect.arrayContaining([
      expect.objectContaining({
        sourceType: "DOCUMENT_TITLE",
        sinkType: "CHROME_LOCAL_STORAGE",
      }),
      ]),
    );

    const titleActionFlows = flows.filter(
      (flow) =>
        flow.sourceType === "DOCUMENT_TITLE" &&
        ["CHROME_ACTION_BADGE_OPTIONS", "CHROME_ACTION_TITLE_OPTIONS"].includes(
          flow.sinkType,
        ),
    );
    // The direct message has one local receiver path and one cross-context
    // path. The two `steps.length` messages above must not add Badge flows.
    expect(titleActionFlows).toHaveLength(2);

    // Retaining field/length precision must not erase the actual array
    // element that is written into extension storage.
    expect(
      flows.filter(
        (flow) =>
          flow.sourceType === "DOCUMENT_TITLE" &&
          flow.sinkType === "CHROME_LOCAL_STORAGE",
      ).length,
    ).toBeGreaterThanOrEqual(2);
  });

  it("keeps opaque JSON container reads conservative", async () => {
    const flows = await analyzeFixture("container_taint_json");
    expect(
      flows.some(
        (flow) =>
          flow.sourceType === "DOCUMENT_URL" &&
          flow.sinkType === "CHROME_BOOKMARK_CREATE_INFO",
      ),
    ).toBe(true);
  });
});
