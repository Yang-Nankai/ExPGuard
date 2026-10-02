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
const VALID_ID = "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb";

interface FlowLite {
  sourceType: string;
  sinkType: string;
  sourceFile?: string;
  sourceFrame?: string;
  sourceProvenance?: string;
  sourceOriginContext?: string;
  sourceOriginFrameFamily?: string;
  messageSender?: string;
  messageSenderFrameFamily?: string;
  messageSenderProvenance?: string;
}

async function analyzeFixture(name: string): Promise<FlowLite[]> {
  const outputPath = fs.mkdtempSync(path.join(os.tmpdir(), `epg-context-${name}-`));
  taintManager.resetAll();
  scopeController.clear();

  await epgModelBuilder.analyze({
    extensionPath: path.join(FIXTURES, name),
    extensionType: ExtensionSourceType.DIR,
    outputPath,
    extensionId: VALID_ID,
    extensionVersion: "1.0",
  });

  const summary = taintManager.getGlobalSummary() as { flows: FlowLite[] };
  fs.rmSync(outputPath, { recursive: true, force: true });
  return summary.flows;
}

describe("Cross-context protocol, property, and storage-key precision", () => {
  jest.setTimeout(60_000);

  it("does not bridge statically disjoint action/type endpoints", async () => {
    const flows = await analyzeFixture("message_action_mismatch");
    expect(flows.some((f) => f.sinkType === "CHROME_TABS_CREATE_OPTIONS")).toBe(false);
  });

  it("does not promote a tainted sibling message property to url", async () => {
    const flows = await analyzeFixture("message_property_isolation");
    expect(flows.some((f) => f.sinkType === "CHROME_TABS_CREATE_OPTIONS")).toBe(false);
  });

  it("keeps a TP when an ImplicitDef has one matching action candidate", async () => {
    const flows = await analyzeFixture("message_implicit_action_tp");
    expect(
      flows.some(
        (f) =>
          f.sourceType === "ELEMENT_VALUE" &&
          f.sinkType === "CHROME_TABS_CREATE_OPTIONS",
      ),
    ).toBe(true);
  });

  it("keeps a TP when an ImplicitDef also contains an opaque action candidate", async () => {
    const flows = await analyzeFixture("message_unknown_action_tp");
    expect(
      flows.some(
        (f) =>
          f.sourceType === "ELEMENT_VALUE" &&
          f.sinkType === "CHROME_TABS_CREATE_OPTIONS",
      ),
    ).toBe(true);
  });

  it("keeps exact storage keys and retains a matching implicit-key TP", async () => {
    const flows = await analyzeFixture("storage_key_property_precision");
    const tabFlows = flows.filter(
      (f) =>
        f.sourceType === "CHROME_ONMESSAGEEXTERNAL_MESSAGE" &&
        f.sinkType === "CHROME_TABS_CREATE_OPTIONS",
    );
    // Only `result.token` from the second get() is a valid flow; result.theme
    // from the first exact-key get() is an unrelated field.
    expect(tabFlows).toHaveLength(1);
  });

  it("does not upgrade Popup runtime messages to web taint, but keeps the Content Script TP", async () => {
    const flows = await analyzeFixture("message_ui_provenance");

    // Popup -> onMessage -> bookmarks must not become a web-input finding.
    expect(
      flows.some(
        (f) =>
          f.sourceType === "ELEMENT_VALUE" &&
          f.sinkType === "CHROME_BOOKMARK_CREATE_INFO",
      ),
    ).toBe(false);
    expect(
      flows.some(
        (f) =>
          f.sourceType === "WINDOW_MESSAGE_EVENT" &&
          f.sinkType === "CHROME_TABS_CREATE_OPTIONS",
      ),
    ).toBe(false);

    // Content Script -> onMessage -> tabs remains a genuine web-to-extension
    // flow.  The report must retain both the root source and actual sender
    // provenance so later relays cannot mislabel it as Popup/Background data.
    const webFlow = flows.find(
      (f) =>
        f.sourceType === "ELEMENT_VALUE" &&
        f.sinkType === "CHROME_TABS_CREATE_OPTIONS",
    );
    expect(webFlow).toMatchObject({
      sourceFile: "content",
      sourceFrame: "CS_1",
      sourceProvenance: "CONTENT_SCRIPT",
      sourceOriginContext: "content",
      sourceOriginFrameFamily: "CS",
      messageSender: "content",
      messageSenderFrameFamily: "CS",
      messageSenderProvenance: "CONTENT_SCRIPT",
    });
  });

  it("keeps a message TP when its value is recovered from web-controlled storage", async () => {
    const flows = await analyzeFixture("message_untrusted_storage");
    const webFlow = flows.find(
      (f) =>
        f.sourceType === "ELEMENT_VALUE" &&
        f.sinkType === "CHROME_TABS_CREATE_OPTIONS",
    );

    expect(webFlow).toMatchObject({
      sourceProvenance: "UNTRUSTED_STORAGE",
      sourceOriginFrameFamily: "CS",
      messageSenderFrameFamily: "EX",
      messageSenderProvenance: "UNTRUSTED_STORAGE",
    });
  });
});
