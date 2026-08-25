import { requestForgerySuppressionReason } from "../../src/taint/privilege";

const base = {
  flowType: "REQUEST_FORGERY" as const,
  sourceType: "ELEMENT_VALUE" as const,
  sinkType: "FETCH_RESOURCE" as const,
};

describe("REQUEST_FORGERY precision gate", () => {
  it("suppresses auth metadata sent to a fixed endpoint", () => {
    expect(
      requestForgerySuppressionReason({
        ...base,
        sourceProvenance: "UNTRUSTED_STORAGE",
        sourceRemark: "paddleEmail",
        sinkCode: "fetch('https://example.test/subscription-status?email=' + paddleEmail)",
      }),
    ).toMatch(/fixed endpoint/i);
  });

  it("suppresses token/header flows that do not control the URL", () => {
    expect(
      requestForgerySuppressionReason({
        ...base,
        sourceProvenance: "UNTRUSTED_STORAGE",
        sourceRemark: "supabaseAccessToken",
        sinkType: "FETCH_HEADERS",
      }),
    ).toMatch(/headers/i);
  });

  it("suppresses API-key validation against fixed Google Static Maps", () => {
    expect(
      requestForgerySuppressionReason({
        ...base,
        sourceType: "WINDOW_MESSAGE_EVENT",
        sourceProvenance: "EXTERNAL_MESSAGE",
        sinkCode:
          "fetch('https://maps.googleapis.com/maps/api/staticmap?key=' + candidate)",
      }),
    ).toMatch(/Google validation endpoint/i);
  });

  it("suppresses captured import data posted to the fixed ingestion API", () => {
    expect(
      requestForgerySuppressionReason({
        ...base,
        sourceProvenance: "EXTERNAL_MESSAGE",
        sourceRemark: "bankBlob",
        sinkType: "FETCH_BODY",
        sinkCode: "fetch('/api/intake-pdf', { method: 'POST', body: bankBlob })",
      }),
    ).toMatch(/fixed local ingestion API/i);
  });

  it("resolves a sink-referenced variable assigned to the fixed ingestion API", () => {
    expect(
      requestForgerySuppressionReason({
        ...base,
        sourceProvenance: "EXTERNAL_MESSAGE",
        sourceRemark: "capturedBankBlob",
        sinkType: "FETCH_BODY",
        sinkCode: "fetch(localUrl, { body: capturedBankBlob })",
        sinkScriptCode:
          "const localUrl = '/api/intake-pdf'; fetch(localUrl, { body: capturedBankBlob });",
      }),
    ).toMatch(/fixed local ingestion API/i);
  });

  it("suppresses opt-in diagnostics sent to the fixed bank-diagnostic API", () => {
    expect(
      requestForgerySuppressionReason({
        ...base,
        sourceProvenance: "CONTENT_SCRIPT",
        sourceRemark: "window.addEventListener(message)",
        sinkType: "FETCH_BODY",
        sinkCode: "fetch(DIAG_ENDPOINT, { body: JSON.stringify(payload) })",
        sinkScriptCode:
          'const DIAG_ENDPOINT = "https://api.example.test/api/bank-diagnostic";',
      }),
    ).toMatch(/bank-diagnostic endpoint/i);
  });

  it("keeps full URL control reportable", () => {
    expect(
      requestForgerySuppressionReason({
        ...base,
        sourceProvenance: "EXTERNAL_MESSAGE",
        sourceRemark: "request.url",
        sinkUrlTaintControl: "FULL",
      }),
    ).toBeUndefined();
  });

  it("keeps complete fetch options reportable", () => {
    expect(
      requestForgerySuppressionReason({
        ...base,
        sinkType: "FETCH_OPTIONS",
        sourceProvenance: "UNTRUSTED_STORAGE",
        sourceRemark: "options",
        sinkCode: "fetch(url, options)",
      }),
    ).toBeUndefined();
  });

  it("suppresses a malformed network tag attached to a non-network AST snippet", () => {
    expect(
      requestForgerySuppressionReason({
        ...base,
        sourceProvenance: "UNTRUSTED_STORAGE",
        sourceRemark: "paddleEmail",
        sinkRemark: "[Unknown URL]",
        sinkCode: "input.addEventListener('input', handler)",
      }),
    ).toMatch(/not consistent with a network invocation/i);
  });

  it("keeps URL-bearing sources and dynamic endpoints reportable", () => {
    expect(
      requestForgerySuppressionReason({
        ...base,
        sourceProvenance: "UNTRUSTED_STORAGE",
        sourceRemark: "serviceUrl",
        sinkCode: "fetch(serviceUrl)",
      }),
    ).toBeUndefined();
    expect(
      requestForgerySuppressionReason({
        ...base,
        sourceType: "WINDOW_CUSTOM_EVENT",
        sourceProvenance: "EXTERNAL_MESSAGE",
        sourceRemark: "apiUrl",
        sinkType: "FETCH_BODY",
        sinkCode: "fetch(apiUrl, { body: payload })",
      }),
    ).toBeUndefined();
  });
});
