import {
  analyzeFlowConstraintSeverity,
} from "../../src/taint/constraintSeverity";
import { SourceType, SinkType } from "../../src/taint/types";

function classify(
  sourceType: SourceType,
  matches: string[],
  sourceFrame = "CS_1",
  sinkType: SinkType = "EVAL",
) {
  return analyzeFlowConstraintSeverity({
    sourceType,
    sinkType,
    sourceFrame,
    sourceFrameConstraint: { matches },
  });
}

describe("content-script source severity classification", () => {
  it("uses content_scripts.matches for DOM/text sources", () => {
    const result = classify("ELEMENT_TEXT_CONTENT", ["<all_urls>"]);

    expect(result.constraintKind).toBe("CONTENT_SCRIPT_MATCHES");
    expect(result.severity).toBe("CRITICAL");
    expect(result.severityEvidence).toEqual(["<all_urls>"]);
  });

  it("ranks wildcard subdomains and restricted paths correctly", () => {
    const wildcard = classify("DOCUMENT_TITLE", ["https://*.example.com/*"]);
    expect(wildcard.constraintKind).toBe("CONTENT_SCRIPT_MATCHES");
    expect(wildcard.severity).toBe("HIGH");

    const restricted = classify("ELEMENT_VALUE", ["https://www.youtube.com/watch*"]);
    expect(restricted.constraintKind).toBe("CONTENT_SCRIPT_MATCHES");
    expect(restricted.severity).toBe("LOW");
  });

  it("does not treat extension background sources as webpage sources", () => {
    const result = classify(
      "DOCUMENT_TITLE",
      ["<all_urls>"],
      "BG_1",
    );

    expect(result.constraintKind).toBe("UNKNOWN");
    expect(result.severity).toBe("LOW");
  });
});
