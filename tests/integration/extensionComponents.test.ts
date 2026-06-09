import path from "path";
import os from "os";
import fs from "fs";
import { epgModelBuilder } from "../../src/epgmodelbuilder";
import { ExtensionSourceType } from "../../src/extension/extensionLoader";
import { taintManager } from "../../src/taint";
import { scopeController } from "../../src/scope/scopeCtrl";
import { componentRegistry } from "../../src/extension/extensionComponent";
import { scriptUsageTracker } from "../../src/extension/scriptUsageTracker";

const FIXTURES = path.resolve(__dirname, "..", "fixtures", "extension_components");
const VALID_ID = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";

async function analyzeFixture(name: string) {
  const input = path.join(FIXTURES, name);
  const outDir = fs.mkdtempSync(path.join(os.tmpdir(), `epg-cmp-${name}-`));

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
    flows: any[];
  };

  // Snapshot the live state we want to assert against, then nuke the tmp dir.
  const components = componentRegistry.all().map((c) => ({
    id: c.id,
    type: c.type,
    htmlPath: c.htmlPath,
    scriptPaths: c.scriptPaths,
    frameTag: c.frameTag,
    permissionsContext: c.permissionsContext,
    manifestSource: c.manifestSource,
    mv: c.mv,
    discovery: c.discovery,
  }));

  fs.rmSync(outDir, { recursive: true, force: true });
  return { summary, components };
}

describe("Extension component discovery — end-to-end", () => {
  jest.setTimeout(60_000);

  it("popup_privilege: discovers the popup component and finds a privilege flow", async () => {
    const { summary, components } = await analyzeFixture("popup_privilege");

    const popup = components.find((c) => c.type === "popup");
    expect(popup).toBeTruthy();
    expect(popup!.htmlPath).toBe("popup.html");
    expect(popup!.scriptPaths).toEqual(["popup"]);
    expect(popup!.frameTag).toMatch(/^POPUP_/);
    expect(popup!.permissionsContext).toBe("extension");
    expect(popup!.mv).toBe(3);
    expect(popup!.discovery).toBe("manifest");

    const bg = components.find((c) => c.type === "background");
    expect(bg).toBeTruthy();

    // A flow from popup → background bookmark sink should be reported.
    const privFlow = summary.flows.find(
      (f) =>
        f.sinkType === "CHROME_BOOKMARK_CREATE_INFO" &&
        (f.sourceFile === "popup" || f.sinkFile === "background"),
    );
    expect(privFlow).toBeTruthy();
  });

  it("options_storage: discovers options_ui.page and registers the options page scripts", async () => {
    const { components, summary } = await analyzeFixture("options_storage");
    const options = components.find((c) => c.type === "options");
    expect(options).toBeTruthy();
    expect(options!.manifestSource).toBe("options_ui.page");
    expect(options!.scriptPaths).toEqual(["options"]);

    // The window message handler stores e.data into chrome.storage.sync —
    // should fire a STORAGE_WRITE sink.
    const storageWrite = summary.flows.find(
      (f) => f.sinkType === "CHROME_SYNC_STORAGE",
    );
    expect(storageWrite).toBeTruthy();
  });

  it("sidepanel_dom_xss: discovers side_panel.default_path and reports eval as code-injection", async () => {
    const { components, summary } = await analyzeFixture("sidepanel_dom_xss");
    const sp = components.find((c) => c.type === "side_panel");
    expect(sp).toBeTruthy();
    expect(sp!.frameTag).toMatch(/^SIDEPANEL_/);

    const evalFlow = summary.flows.find((f) => f.sinkType === "EVAL");
    expect(evalFlow).toBeTruthy();
  });

  it("devtools_panel_relay: registers devtools and devtools_panel runtime-static", async () => {
    const { components, summary } = await analyzeFixture("devtools_panel_relay");
    const devtools = components.find((c) => c.type === "devtools");
    const panel = components.find((c) => c.type === "devtools_panel");

    expect(devtools).toBeTruthy();
    expect(devtools!.manifestSource).toBe("devtools_page");

    expect(panel).toBeTruthy();
    expect(panel!.discovery).toBe("runtime-static");
    expect(panel!.manifestSource).toBe("runtime:chrome.devtools.panels.create");
    expect(panel!.htmlPath).toBe("panel.html");
    expect(panel!.scriptPaths).toEqual(["panel"]);

    // Code-injection from panel → background should land.
    const ci = summary.flows.find((f) => f.sinkType === "NEW_FUNCTION");
    expect(ci).toBeTruthy();
  });

  it("offscreen_relay: discovers offscreen via chrome.offscreen.createDocument", async () => {
    const { components } = await analyzeFixture("offscreen_relay");
    const off = components.find((c) => c.type === "offscreen");
    expect(off).toBeTruthy();
    expect(off!.discovery).toBe("runtime-static");
    expect(off!.manifestSource).toBe("runtime:chrome.offscreen.createDocument");
    expect(off!.scriptPaths).toEqual(["offscreen"]);
    expect(off!.frameTag).toMatch(/^OFFSCREEN_/);

    // Frame family for offscreen should be OF, not BG / CS.
    const family = scriptUsageTracker.getPrimaryFrameFamilyByKey("offscreen");
    expect(family).toBe("OF");
  });

  it("override_newtab: chrome_url_overrides.newtab → override_page component", async () => {
    const { components } = await analyzeFixture("override_newtab");
    const ov = components.find((c) => c.type === "override_page");
    expect(ov).toBeTruthy();
    expect(ov!.manifestSource).toBe("chrome_url_overrides.newtab");
    expect(ov!.scriptPaths).toEqual(["newtab"]);
  });

  it("mv2_popup: discovers browser_action.default_popup in an MV2 manifest", async () => {
    const { components } = await analyzeFixture("mv2_popup");
    const popup = components.find((c) => c.type === "popup");
    expect(popup).toBeTruthy();
    expect(popup!.mv).toBe(2);
    expect(popup!.manifestSource).toBe("browser_action.default_popup");
  });

  it("inline_popup: inline <script> blocks are materialized and analyzed", async () => {
    const { components, summary } = await analyzeFixture("inline_popup");
    const popup = components.find((c) => c.type === "popup");
    expect(popup).toBeTruthy();
    // Inline materialization lives under .epg-inline/<safe>.inline-0
    expect(popup!.scriptPaths.length).toBe(1);
    expect(popup!.scriptPaths[0]).toMatch(/\.epg-inline\//);

    // The inline body forwards data into chrome.bookmarks.create via background.
    const bookmark = summary.flows.find(
      (f) => f.sinkType === "CHROME_BOOKMARK_CREATE_INFO",
    );
    expect(bookmark).toBeTruthy();
  });
});
