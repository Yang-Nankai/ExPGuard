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

  it("frame_sensitive_ui: ignores popup input but preserves content-script input", async () => {
    const flows = await analyzeFixture("frame_sensitive_ui");
    const bookmarkFlows = flows.filter(
      (f) =>
        f.sourceType === "ELEMENT_VALUE" &&
        f.sinkType === "CHROME_BOOKMARK_CREATE_INFO",
    );

    // The real page-controlled source stays detectable.
    expect(bookmarkFlows.some((f) => f.sourceFile === "content")).toBe(true);
    // The extension popup's own <input>.value must no longer become a web
    // attacker source merely because it is sent via runtime.onMessage.
    expect(bookmarkFlows.some((f) => f.sourceFile === "popup")).toBe(false);
  });

  it("shared_popup_background_input: does not promote a shared Popup input to BG web taint", async () => {
    const flows = await analyzeFixture("shared_popup_background_input");
    expect(flows.some((f) => f.sourceType === "ELEMENT_VALUE")).toBe(false);
  });

  it("injected_extension_ui: ignores a literal extension form but keeps a page field", async () => {
    const flows = await analyzeFixture("injected_extension_ui");
    const tabFlows = flows.filter(
      (f) =>
        f.sourceType === "ELEMENT_VALUE" &&
        f.sinkType === "CHROME_TABS_CREATE_OPTIONS",
    );

    // The source remark is intentionally not exposed in FlowLite: exactly one
    // content-script tab flow must remain, from page-owned-url.
    expect(tabFlows).toHaveLength(1);
    expect(tabFlows[0].sourceFile).toBe("content");
  });

  it("document_title_write_artifact: does not treat a document.title assignment as a read source", async () => {
    const flows = await analyzeFixture("document_title_write_artifact");
    expect(
      flows.some(
        (f) =>
          f.sourceType === "DOCUMENT_TITLE" &&
          f.sinkType === "CHROME_SYNC_STORAGE",
      ),
    ).toBe(false);
  });

  it("document_title_precision: preserves title storage but isolates sibling fields and array length", async () => {
    const flows = await analyzeFixture("document_title_precision");

    // This is a real source-to-storage path and must remain visible.
    expect(
      flows.some(
        (f) =>
          f.sourceType === "DOCUMENT_TITLE" &&
          f.sinkType === "CHROME_LOCAL_STORAGE",
      ),
    ).toBe(true);

    // `steps.length` and a safe sibling `payload.url` must not inherit title
    // taint merely because they share a containing object/array.
    expect(
      flows.some(
        (f) =>
          f.sourceType === "DOCUMENT_TITLE" &&
          ["CHROME_ACTION_BADGE_OPTIONS", "CHROME_TABS_CREATE_OPTIONS"].includes(
            f.sinkType,
          ),
      ),
    ).toBe(false);
  });

  it("numeric_value_safety: keeps alarms but drops number-to-code/HTML false positives", async () => {
    const flows = await analyzeFixture("numeric_value_safety");

    // parseInt() produces a number (or NaN), which cannot become source text
    // for eval or markup for jQuery.html.
    expect(
      flows.some((f) =>
        ["EVAL", "JQUERY_ELEMENT_HTML_SET"].includes(f.sinkType),
      ),
    ).toBe(false);

    // The same numeric value still controls a privileged scheduling API and
    // must remain visible. Alarm configuration is not treated as a code sink.
    expect(
      flows.some((f) => f.sinkType === "CHROME_ALARMS_CREATE_OPTIONS"),
    ).toBe(true);
  });

  it("numeric_display_storage: suppresses fixed status/count/date HTML but keeps raw text", async () => {
    const flows = await analyzeFixture("numeric_display_storage");
    const domFlows = flows.filter((f) => f.sinkType === "DOM_INNER_HTML");

    // A cross-context storage value that is only fixed text plus a task count,
    // and a popup template containing toFixed/count/date values, cannot inject
    // page markup. The raw sibling must still remain a DOM-XSS finding.
    expect(domFlows).toHaveLength(1);
    expect(domFlows[0].sourceType).toBe("ELEMENT_TEXT_CONTENT");
  });

  it("i18n_placeholder_localization: suppresses only extension __MSG_*__ self-localization", async () => {
    const flows = await analyzeFixture("i18n_placeholder_localization");
    expect(
      flows.some(
        (f) =>
          f.sourceType === "ELEMENT_INNER_HTML" &&
          f.sinkType === "DOM_INNER_HTML",
      ),
    ).toBe(false);

    const suppressed = taintManager.getPrivilegeSuppressedFlows();
    expect(
      suppressed.some((f) =>
        f.reason.includes("extension i18n self-localization"),
      ),
    ).toBe(true);
  });

  it("i18n_placeholder_content_script: never suppresses a web-document rewrite", async () => {
    const flows = await analyzeFixture("i18n_placeholder_content_script");
    // The generic privilege gate already suppresses same-frame content-script
    // DOM writes because the page has the same DOM authority. The important
    // regression is that the *i18n* exception did not claim this path.
    expect(
      flows.some((f) => f.sinkType === "DOM_INNER_HTML"),
    ).toBe(false);
    expect(
      taintManager
        .getPrivilegeSuppressedFlows()
        .some((f) => f.reason.includes("extension i18n self-localization")),
    ).toBe(false);
  });

  it("presentation_only_sinks: suppresses text/value but keeps Action display flows", async () => {
    const flows = await analyzeFixture("presentation_only_sinks");
    const suppressedSinks = new Set([
      "JQUERY_ELEMENT_VAL_SET",
      "JQUERY_ELEMENT_TEXT_SET",
    ]);
    const actionSinks = new Set([
      "CHROME_ACTION_BADGE_OPTIONS",
      "CHROME_ACTION_TITLE_OPTIONS",
    ]);

    expect(flows.some((f) => suppressedSinks.has(f.sinkType))).toBe(false);
    for (const sinkType of actionSinks) {
      expect(flows.some((f) => f.sinkType === sinkType)).toBe(true);
    }

    // Text/value paths are retained as audited privilege-gate suppressions
    // rather than silently disappearing from the analyzer's accounting.
    const suppressed = taintManager.getPrivilegeSuppressedFlows();
    for (const sinkType of suppressedSinks) {
      expect(suppressed.some((f) => f.sinkType === sinkType)).toBe(true);
    }
  });

  it("timer_callback_semantics: only string-code timer/eval paths are reported", async () => {
    const flows = await analyzeFixture("timer_callback_semantics");
    const timeEval = flows.filter(
      (f) =>
        f.sourceType === "WINDOW_MESSAGE_EVENT" && f.sinkType === "TIME_EVAL",
    );
    const evalFlows = flows.filter(
      (f) => f.sourceType === "WINDOW_MESSAGE_EVENT" && f.sinkType === "EVAL",
    );

    // One real setTimeout and one real setInterval remain; the named-function
    // self-callbacks must not be misclassified as string timers.
    expect(timeEval).toHaveLength(2);
    expect(evalFlows).toHaveLength(1);
  });

  it("jquery_vendor_boundary: skips vendor internals but preserves a user event TP", async () => {
    const flows = await analyzeFixture("jquery_vendor_boundary");

    // The minified/vendor helper must not manufacture a CustomEvent -> HTML
    // path from jQuery's own implementation.
    expect(
      flows.some(
        (f) =>
          f.sourceFile === "jquery.min" &&
          f.sourceType === "WINDOW_CUSTOM_EVENT" &&
          f.sinkType === "DOM_INNER_HTML",
      ),
    ).toBe(false);

    // The event callback belongs to extension code and uses a genuine
    // page-element source, so its privileged flow must be retained.
    expect(
      flows.some(
        (f) =>
          f.sourceFile === "content" &&
          f.sourceType === "ELEMENT_VALUE" &&
          f.sinkType === "CHROME_BOOKMARK_CREATE_INFO",
      ),
    ).toBe(true);
  });
});
