import { evaluatePrivilegeDelta } from "../../src/taint/privilege";
import { ScriptFrameFamily } from "../../src/extension/extensionScript";

function verdict(input: {
  sourceType: string;
  sinkType: string;
  sourceFrame: string;
  sinkFrame: string;
  sourceFrameFamily: ScriptFrameFamily;
  sinkFrameFamily: ScriptFrameFamily;
  flowType?: string;
  pageContextFiltering?: boolean;
}) {
  return evaluatePrivilegeDelta({
    sourceType: input.sourceType as any,
    sinkType: input.sinkType as any,
    sourceFrame: input.sourceFrame,
    sinkFrame: input.sinkFrame,
    sourceFrameFamily: input.sourceFrameFamily,
    sinkFrameFamily: input.sinkFrameFamily,
    flowType: (input.flowType ?? "DOM_XSS") as any,
    pageContextFiltering: input.pageContextFiltering,
  });
}

describe("page-context privilege precision", () => {
  it("suppresses same-document HTML self-rewrites in extension-owned pages", () => {
    const bg = verdict({
      sourceType: "ELEMENT_INNER_HTML",
      sinkType: "DOM_INNER_HTML",
      sourceFrame: "BG_1",
      sinkFrame: "BG_1",
      sourceFrameFamily: "BG",
      sinkFrameFamily: "BG",
    });
    const popup = verdict({
      sourceType: "JQUERY_ELEMENT_HTML",
      sinkType: "JQUERY_ELEMENT_HTML_SET",
      sourceFrame: "POPUP_1",
      sinkFrame: "POPUP_1",
      sourceFrameFamily: "EX",
      sinkFrameFamily: "EX",
    });

    expect(bg.crosses).toBe(false);
    expect(popup.crosses).toBe(false);
  });

  it("suppresses page-equivalent operations in the same MAIN world", () => {
    const evalFlow = verdict({
      sourceType: "WINDOW_MESSAGE_EVENT",
      sinkType: "NEW_FUNCTION",
      sourceFrame: "CS_2",
      sinkFrame: "CS_2",
      sourceFrameFamily: "MAIN",
      sinkFrameFamily: "MAIN",
      flowType: "CODE_INJECTION",
    });
    const fetchFlow = verdict({
      sourceType: "WINDOW_MESSAGE_EVENT",
      sinkType: "FETCH_BODY",
      sourceFrame: "CS_2",
      sinkFrame: "CS_2",
      sourceFrameFamily: "MAIN",
      sinkFrameFamily: "MAIN",
      flowType: "REQUEST_FORGERY",
    });

    expect(evalFlow.crosses).toBe(false);
    expect(fetchFlow.crosses).toBe(false);
  });

  it("does not suppress isolated content-script code execution", () => {
    const result = verdict({
      sourceType: "WINDOW_MESSAGE_EVENT",
      sinkType: "NEW_FUNCTION",
      sourceFrame: "CS_2",
      sinkFrame: "CS_2",
      sourceFrameFamily: "CS",
      sinkFrameFamily: "CS",
      flowType: "CODE_INJECTION",
    });

    expect(result.crosses).toBe(true);
  });

  it("does not suppress external input reaching storage in an extension UI", () => {
    const result = verdict({
      sourceType: "CHROME_ONMESSAGEEXTERNAL_MESSAGE",
      sinkType: "CHROME_SYNC_STORAGE",
      sourceFrame: "OPTIONS_1",
      sinkFrame: "OPTIONS_1",
      sourceFrameFamily: "EX",
      sinkFrameFamily: "EX",
      flowType: "STORAGE_POSOING",
    });

    expect(result.crosses).toBe(true);
  });

  it("is reversible through pageContextFiltering", () => {
    const result = verdict({
      sourceType: "ELEMENT_INNER_HTML",
      sinkType: "DOM_INNER_HTML",
      sourceFrame: "OPTIONS_1",
      sinkFrame: "OPTIONS_1",
      sourceFrameFamily: "EX",
      sinkFrameFamily: "EX",
      pageContextFiltering: false,
    });

    expect(result.crosses).toBe(true);
  });
});
