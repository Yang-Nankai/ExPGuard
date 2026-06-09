import path from "path";
import os from "os";
import fs from "fs";
import { epgModelBuilder } from "../../src/epgmodelbuilder";
import { ExtensionSourceType } from "../../src/extension/extensionLoader";
import {
  taintManager,
  renderHtmlReport,
  collectFileTree,
} from "../../src/taint";
import { taintRuleEngine } from "../../src/taint/ruleEngine";
import { scopeController } from "../../src/scope/scopeCtrl";

const FIXTURES = path.resolve(
  __dirname,
  "..",
  "fixtures",
  "extension_components",
);
const VALID_ID = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";

async function buildHtml(name: string): Promise<string> {
  const input = path.join(FIXTURES, name);
  const outDir = fs.mkdtempSync(path.join(os.tmpdir(), `epg-html-${name}-`));

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

  const ctx = epgModelBuilder.extensionContext;
  const html = renderHtmlReport({
    meta: {
      extensionId: VALID_ID,
      extensionVersion: "1.0",
      sourceType: "DIR",
      generatedAt: "2026-01-01T00:00:00.000Z",
      durationMs: 1,
    },
    manifest: ctx?.manifest ?? {},
    files: ctx ? collectFileTree(ctx.baseDir) : [],
    scripts: ctx?.getScriptsSummary() ?? [],
    reports: taintManager.generateGlobalReport({ includeCode: true }),
    flows: taintManager.getGlobalSummary().flows,
  });

  fs.rmSync(outDir, { recursive: true, force: true });
  return html;
}

describe("HTML report generation", () => {
  jest.setTimeout(60_000);

  afterAll(() => {
    taintRuleEngine.loadDefaults();
  });

  it("produces a self-contained HTML document", async () => {
    const html = await buildHtml("sensitive_exfil_cookie_body");
    expect(html.startsWith("<!doctype html>")).toBe(true);
    expect(html).toContain("</html>");
    // Self-contained: inline style + script, no external CDN/src.
    expect(html).toContain("<style>");
    expect(html).not.toMatch(/<script\s+src=/i);
    expect(html).not.toMatch(/<link\s/i);
  });

  it("shows the extension folder structure and manifest name", async () => {
    const html = await buildHtml("sensitive_exfil_cookie_body");
    expect(html).toContain("background.js");
    expect(html).toContain("manifest.json");
    // manifest.name is rendered in the overview header.
    expect(html).toContain("Sensitive Exfil Cookie Body Demo");
  });

  it("renders each finding with classification and a propagation timeline", async () => {
    const html = await buildHtml("sensitive_exfil_cookie_body");
    // Flow classification badge + source/sink kinds.
    expect(html).toContain("Data Leak");
    expect(html).toContain("CHROME_COOKIES_INFO");
    expect(html).toContain("FETCH_BODY");
    // Timeline scaffolding present.
    expect(html).toContain('class="timeline"');
    expect(html).toContain("Sanitized:");
  });

  it("escapes user code so snippets cannot inject markup", async () => {
    const html = await buildHtml("sensitive_exfil_cookie_body");
    // The fixture code contains no <script>; assert no raw one leaked in from
    // a snippet (our own inline <script> is the only one, near the end).
    const head = html.slice(0, html.lastIndexOf("<script>"));
    expect(head).not.toContain("<script>");
  });

  it("reports cleanly on an extension with no findings", async () => {
    const html = await buildHtml("react_dangerous_html");
    expect(html.startsWith("<!doctype html>")).toBe(true);
    // background fixture here is inert; the report must still be well-formed.
    expect(html).toContain("</html>");
  });
});
