import {
  detectLibraryByFilename,
  detectLibraryByContent,
} from "../../src/constants/library";

/**
 * Library identification must be case-insensitive, robust to dist/min/version
 * markers, and — crucially — must NOT misclassify user business files that
 * merely start with a framework name (those would be wrongly `ignore`d).
 */
describe("detectLibraryByFilename", () => {
  it("matches regardless of case", () => {
    expect(detectLibraryByFilename("jQuery")?.name).toBe("jQuery");
    expect(detectLibraryByFilename("vendor/React.production.min")?.name).toBe(
      "React",
    );
    expect(detectLibraryByFilename("libs/Vue")?.name).toBe("Vue");
  });

  it("matches dist/min/version variants", () => {
    expect(detectLibraryByFilename("jquery-3.6.0.min")).toBeTruthy();
    expect(detectLibraryByFilename("jquery-3.6.0.min")?.ignore).toBe(true);
    expect(detectLibraryByFilename("vue.runtime.global")).toBeTruthy();
    expect(detectLibraryByFilename("react-18.2.0")).toBeTruthy();
  });

  it("matches chartjs in both `chart.js` and `chartjs` spellings", () => {
    expect(detectLibraryByFilename("chart.js")?.name).toBe("ChartJS");
    expect(detectLibraryByFilename("chartjs")?.name).toBe("ChartJS");
    expect(detectLibraryByFilename("chart.min")?.name).toBe("ChartJS");
  });

  it("does NOT misclassify user files that share a framework prefix", () => {
    expect(detectLibraryByFilename("react-myhelper")).toBeNull();
    expect(detectLibraryByFilename("vue-mywidget")).toBeNull();
    expect(detectLibraryByFilename("src/chart-utils")).toBeNull();
    expect(detectLibraryByFilename("angular-form-helper")).toBeNull();
  });

  it("tags modeled frameworks with their model", () => {
    expect(detectLibraryByFilename("react")?.model).toBe("react");
    expect(detectLibraryByFilename("vue")?.model).toBe("vue");
    expect(detectLibraryByFilename("angular")?.model).toBe("angular");
  });
});

describe("detectLibraryByContent", () => {
  it("detects React from internal bundle signatures", () => {
    const code = "var x=1; ...e.__reactInternalInstance$abc=...; ...";
    expect(detectLibraryByContent(code)?.model).toBe("react");
  });

  it("detects Vue from internal bundle signatures", () => {
    const code = "/* bundle */ window.__VUE_DEVTOOLS_GLOBAL_HOOK__ = {};";
    expect(detectLibraryByContent(code)?.model).toBe("vue");
  });

  it("detects Angular from internal bundle signatures", () => {
    const code = "platformBrowserDynamic().bootstrapModule(AppModule);";
    expect(detectLibraryByContent(code)?.model).toBe("angular");
  });

  it("detects a banner-identified jQuery distribution, including jq.min", () => {
    const code = "/*! jQuery v3.7.1 | (c) OpenJS Foundation */!function(){}";
    const detected = detectLibraryByContent(code);
    expect(detected?.name).toBe("jQuery");
    expect(detected?.ignore).toBe(true);
  });

  it("does NOT flag user code that merely calls a framework's public API", () => {
    // A user file that uses React must still be analyzed, not skipped.
    expect(
      detectLibraryByContent("const el = React.createElement('div', null);"),
    ).toBeNull();
    expect(detectLibraryByContent("Vue.compile(tpl);")).toBeNull();
    expect(detectLibraryByContent("$sce.trustAsHtml(x);")).toBeNull();
    expect(detectLibraryByContent("jQuery.fn.on.call(node, 'click', cb);")).toBeNull();
  });

  it("returns null for ordinary code", () => {
    expect(detectLibraryByContent("const a = 1; console.log(a);")).toBeNull();
    expect(detectLibraryByContent("")).toBeNull();
  });
});
