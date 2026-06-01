import fs from "fs";
import os from "os";
import path from "path";
import { TaintRuleEngine } from "../../src/taint/ruleEngine";
import { typePatternMatches } from "../../src/taint/ruleTypes";

describe("typePatternMatches", () => {
  it("matches literals exactly", () => {
    expect(typePatternMatches("DOCUMENT_URL", "DOCUMENT_URL")).toBe(true);
    expect(typePatternMatches("DOCUMENT_URL", "DOCUMENT_TITLE")).toBe(false);
  });

  it("matches single-segment globs", () => {
    expect(typePatternMatches("NAVIGATOR_*", "NAVIGATOR_LANGUAGE")).toBe(true);
    expect(typePatternMatches("NAVIGATOR_*", "NAVIGAROR_GEOLOCATION")).toBe(false);
    expect(typePatternMatches("*_STORAGE", "CHROME_SYNC_STORAGE")).toBe(true);
    expect(typePatternMatches("*_STORAGE", "STORAGE_ALL_ITEMS")).toBe(false);
  });

  it("escapes regex metacharacters", () => {
    // `+` should not be treated as a regex quantifier.
    expect(typePatternMatches("FOO+BAR", "FOO+BAR")).toBe(true);
    expect(typePatternMatches("FOO+BAR", "FOOBAR")).toBe(false);
  });
});

describe("TaintRuleEngine", () => {
  it("loads the bundled default rules at construction", () => {
    const engine = new TaintRuleEngine();
    const { rules, suppress } = engine.stats();
    expect(rules).toBeGreaterThan(0);
    expect(suppress).toBeGreaterThan(0);
  });

  it("default matrix: ATTACKER_INPUT × PRIVILEGED_OPERATION → PRIVILEGE_ESCALATION", () => {
    const engine = new TaintRuleEngine();
    const matches = engine.getFlowTypes(
      "WINDOW_MESSAGE_EVENT",
      "CHROME_BOOKMARK_CREATE_INFO",
    );
    expect(matches).toContain("PRIVILEGE_ESCALATION");
  });

  it("default matrix: NETWORK_RESPONSE × CODE_EXECUTION → CODE_INJECTION", () => {
    const engine = new TaintRuleEngine();
    expect(engine.getFlowTypes("FETCH_RESPONSE", "EVAL")).toEqual([
      "CODE_INJECTION",
    ]);
  });

  it("default matrix: WEB_CONTENT × STORAGE_WRITE → (no flow)", () => {
    // Original policy.ts deliberately left this commented out.
    const engine = new TaintRuleEngine();
    expect(engine.getFlowTypes("DOCUMENT_URL", "CHROME_LOCAL_STORAGE")).toEqual([]);
  });

  it("navigator.* sources are suppressed for DATA_LEAK only", () => {
    const engine = new TaintRuleEngine();
    // SYSTEM_INFO → MESSAGE_RESPONSE would emit DATA_LEAK, but the suppress
    // rule strips it. No other rule promotes navigator -> message, so result
    // is empty.
    expect(
      engine.getFlowTypes(
        "NAVIGATOR_USER_AGENT",
        "CHROME_RUNTIME_ONMESSAGEEXTERNAL_SENDRESPONSE",
      ),
    ).toEqual([]);

    // Same source, but a code-injection sink — no DATA_LEAK rule applies and
    // no other rule fires either, so still empty.
    expect(engine.getFlowTypes("NAVIGATOR_USER_AGENT", "EVAL")).toEqual([]);
  });

  it("native message endpoints are suppressed across the board", () => {
    const engine = new TaintRuleEngine();
    expect(
      engine.getFlowTypes(
        "CHROME_CONNECTNATIVE_ONMESSAGE",
        "CHROME_BOOKMARK_CREATE_INFO",
      ),
    ).toEqual([]);
    expect(
      engine.getFlowTypes(
        "WINDOW_MESSAGE_EVENT",
        "CHROME_RUNTIME_SENDNATIVEMESSAGE_EXTERNAL",
      ),
    ).toEqual([]);
  });

  it("safe message pairs (WINDOW_MESSAGE → WINDOW_POSTMESSAGE) are suppressed", () => {
    const engine = new TaintRuleEngine();
    expect(
      engine.getFlowTypes("WINDOW_MESSAGE_EVENT", "WINDOW_POSTMESSAGE"),
    ).toEqual([]);
  });

  it("user rules can add a brand new FlowType without disturbing defaults", () => {
    const engine = new TaintRuleEngine();
    engine.setRuleSet({
      version: 1,
      rules: [
        {
          id: "cookies-to-fetch-body-leak",
          flowType: "DATA_LEAK",
          match: {
            sourceCapability: "SENSITIVE_DATA",
            sinkType: ["FETCH_RESOURCE", "FETCH_OPTIONS"],
          },
        },
      ],
    });
    expect(engine.getFlowTypes("CHROME_COOKIES_INFO", "FETCH_RESOURCE")).toEqual([
      "DATA_LEAK",
    ]);
    // setRuleSet replaces — defaults are gone now.
    expect(engine.getFlowTypes("WINDOW_MESSAGE_EVENT", "EVAL")).toEqual([]);
  });

  it("loadFromFile layers a user rule on top of the defaults (all-match)", () => {
    const engine = new TaintRuleEngine();
    const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "epg-rule-test-"));
    const file = path.join(tmp, "extra.json");
    fs.writeFileSync(
      file,
      JSON.stringify({
        version: 1,
        rules: [
          {
            id: "cookies-to-fetch-body",
            description: "Cookies leaving via fetch body",
            flowType: "DATA_LEAK",
            match: {
              sourceCapability: "SENSITIVE_DATA",
              sinkType: ["FETCH_RESOURCE", "FETCH_OPTIONS"],
            },
          },
        ],
      }),
      "utf-8",
    );

    engine.loadFromFile(file);

    // The default REQUEST_FORGERY rule no longer fires because the source is
    // SENSITIVE_DATA (cookies), not ATTACKER_INPUT — but our user rule
    // contributes DATA_LEAK. Confirm both:
    const cookieFlow = engine.matchFlowTypes(
      "CHROME_COOKIES_INFO",
      "FETCH_RESOURCE",
    );
    expect(cookieFlow.map((m) => m.flowType)).toContain("DATA_LEAK");
    expect(cookieFlow[0].ruleId).toBe("cookies-to-fetch-body");
    expect(cookieFlow[0].ruleDescription).toBe("Cookies leaving via fetch body");

    // Defaults still work too.
    expect(
      engine.getFlowTypes("WINDOW_MESSAGE_EVENT", "CHROME_BOOKMARK_CREATE_INFO"),
    ).toContain("PRIVILEGE_ESCALATION");

    fs.rmSync(tmp, { recursive: true, force: true });
  });

  it("a single (source, sink) pair can match multiple inclusive rules (all-match)", () => {
    const engine = new TaintRuleEngine();
    engine.setRuleSet({
      version: 1,
      rules: [
        {
          id: "attacker-input-network-send",
          flowType: "REQUEST_FORGERY",
          match: {
            sourceCapability: "ATTACKER_INPUT",
            sinkCapability: "NETWORK_SEND",
          },
        },
        {
          id: "attacker-input-fetch-resource-secondary",
          flowType: "CODE_INJECTION",
          match: { sinkType: "FETCH_RESOURCE" },
        },
      ],
    });

    const flows = engine.getFlowTypes("WINDOW_MESSAGE_EVENT", "FETCH_RESOURCE");
    expect(flows).toEqual(
      expect.arrayContaining(["REQUEST_FORGERY", "CODE_INJECTION"]),
    );
    expect(flows).toHaveLength(2);
  });

  it("a suppress rule scoped to a flowType only removes that flowType", () => {
    const engine = new TaintRuleEngine();
    engine.setRuleSet({
      version: 1,
      rules: [
        {
          id: "rule-a",
          flowType: "PRIVILEGE_ESCALATION",
          match: { sourceType: "X_SOURCE", sinkType: "Y_SINK" },
        },
        {
          id: "rule-b",
          flowType: "DATA_LEAK",
          match: { sourceType: "X_SOURCE", sinkType: "Y_SINK" },
        },
      ],
      suppress: [
        {
          id: "suppress-leak-only",
          flowType: "DATA_LEAK",
          match: { sourceType: "X_SOURCE" },
        },
      ],
    });
    expect(
      engine.getFlowTypes("X_SOURCE" as any, "Y_SINK" as any),
    ).toEqual(["PRIVILEGE_ESCALATION"]);
  });

  it("rejects rule sets with empty inclusive matchers (would match every flow)", () => {
    const engine = new TaintRuleEngine();
    expect(() =>
      engine.setRuleSet({
        version: 1,
        rules: [{ id: "bad", flowType: "DATA_LEAK", match: {} }],
      }),
    ).toThrow(/empty 'match'/);
  });

  it("rejects unsupported schema versions", () => {
    const engine = new TaintRuleEngine();
    expect(() =>
      engine.setRuleSet({ version: 2 as any, rules: [] }),
    ).toThrow(/version/);
  });

  it("loadFromFile throws if the file is missing", () => {
    const engine = new TaintRuleEngine();
    expect(() => engine.loadFromFile("/no/such/file.json")).toThrow(
      /does not exist/,
    );
  });

  it("loadFromFile accepts a .js escape-hatch module", () => {
    const engine = new TaintRuleEngine();
    const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "epg-rule-ts-"));
    const file = path.join(tmp, "rules.js");
    fs.writeFileSync(
      file,
      `module.exports = {
        version: 1,
        rules: [
          {
            id: "js-rule",
            flowType: "DATA_LEAK",
            match: { sourceCapability: "SENSITIVE_DATA", sinkType: "FETCH_RESOURCE" },
          },
        ],
      };`,
      "utf-8",
    );

    engine.loadFromFile(file);
    expect(engine.getFlowTypes("CHROME_COOKIES_INFO", "FETCH_RESOURCE")).toContain(
      "DATA_LEAK",
    );

    fs.rmSync(tmp, { recursive: true, force: true });
  });
});
