import fs from "fs";
import os from "os";
import path from "path";
import { extractScriptsFromHtml } from "../../src/extension/htmlScriptExtractor";

function makeTmp(): string {
  return fs.mkdtempSync(path.join(os.tmpdir(), "epg-html-extract-"));
}

function writeFile(rel: string, body: string, root: string): string {
  const abs = path.join(root, rel);
  fs.mkdirSync(path.dirname(abs), { recursive: true });
  fs.writeFileSync(abs, body, "utf-8");
  return abs;
}

describe("HTML script extractor", () => {
  let tmp: string;
  beforeEach(() => {
    tmp = makeTmp();
  });
  afterEach(() => {
    fs.rmSync(tmp, { recursive: true, force: true });
  });

  it("extracts external scripts referenced via relative src", () => {
    writeFile("scripts/main.js", "console.log('hi');", tmp);
    const html = writeFile(
      "popup.html",
      `<!doctype html><html><body><script src="./scripts/main.js"></script></body></html>`,
      tmp,
    );

    const out = extractScriptsFromHtml(html, tmp);
    expect(out).toHaveLength(1);
    expect(out[0].kind).toBe("external");
    expect(out[0].scriptKey).toBe("scripts/main");
  });

  it("supports module scripts and absolute /-rooted paths", () => {
    writeFile("vendor/util.js", "export const x = 1;", tmp);
    const html = writeFile(
      "ui/popup.html",
      `<!doctype html><script type="module" src="/vendor/util.js"></script>`,
      tmp,
    );

    const out = extractScriptsFromHtml(html, tmp);
    expect(out).toHaveLength(1);
    expect(out[0].scriptKey).toBe("vendor/util");
    expect(out[0].scriptType).toBe("module");
  });

  it("materializes inline scripts as virtual .js files under .epg-inline", () => {
    const html = writeFile(
      "popup.html",
      `<!doctype html>
       <script>
         document.title = "hi";
       </script>`,
      tmp,
    );

    const out = extractScriptsFromHtml(html, tmp);
    expect(out).toHaveLength(1);
    expect(out[0].kind).toBe("inline");
    // Virtual file lives under .epg-inline/
    expect(out[0].absPath).toContain(`${path.sep}.epg-inline${path.sep}`);
    expect(fs.existsSync(out[0].absPath)).toBe(true);
    const body = fs.readFileSync(out[0].absPath, "utf-8");
    expect(body).toContain("// [epg-virtual-inline]");
    expect(body).toContain('document.title = "hi"');
  });

  it("skips external URLs (http / data / chrome-extension)", () => {
    const html = writeFile(
      "popup.html",
      `<!doctype html>
       <script src="https://cdn.example/x.js"></script>
       <script src="data:text/javascript,alert(1)"></script>
       <script src="chrome-extension://abc/lib.js"></script>`,
      tmp,
    );

    expect(extractScriptsFromHtml(html, tmp)).toEqual([]);
  });

  it("warns and skips missing src targets, dedupes repeated scripts", () => {
    writeFile("ok.js", "//", tmp);
    const html = writeFile(
      "popup.html",
      `<script src="ok.js"></script>
       <script src="ok.js"></script>
       <script src="missing.js"></script>`,
      tmp,
    );

    const out = extractScriptsFromHtml(html, tmp);
    expect(out.map((x) => x.scriptKey)).toEqual(["ok"]);
  });

  it("respects inlineMode=skip", () => {
    const html = writeFile(
      "popup.html",
      `<!doctype html><script>console.log(1);</script>`,
      tmp,
    );

    const out = extractScriptsFromHtml(html, tmp, { inlineMode: "skip" });
    expect(out).toEqual([]);
  });

  it("returns [] on missing or unreadable HTML", () => {
    const fake = path.join(tmp, "ghost.html");
    expect(extractScriptsFromHtml(fake, tmp)).toEqual([]);
  });
});
