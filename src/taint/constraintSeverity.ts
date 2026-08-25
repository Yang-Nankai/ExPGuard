import { SourceType, SinkType } from "./types";
import { FrameConstraint, scriptUsageTracker } from "../extension/scriptUsageTracker";

type ConstraintKind =
  | "EXTERNALLY_CONNECTABLE"
  | "CONTENT_SCRIPT_MATCHES"
  // Source originates from an extension UI surface (popup, options, side panel,
  // devtools, override pages, offscreen). These pages do not have
  // content_scripts.matches — their attack surface is governed by who can open
  // them (the user, in most cases) and what messages they accept.
  | "EXTENSION_UI_PAGE"
  | "UNKNOWN";

export type SeverityLevel = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";

interface SeverityResult {
  rank: number;
  level: SeverityLevel;
  reason: string;
  evidence: string[];
}

export interface FlowConstraintSeverity {
  constraintKind: ConstraintKind;
  severity: SeverityLevel;
  severityReason: string;
  severityEvidence: string[];
}

const WEB_ATTACK_SOURCES: SourceType[] = [
  "WINDOW_MESSAGE_EVENT",
  "WINDOW_CUSTOM_EVENT",
  "TARGET_CUSTOM_EVENT",
];

/**
 * Sources whose values are read from the webpage/DOM by a content script.
 * These were previously omitted, so a CS_1 flow such as
 * `ELEMENT_TEXT_CONTENT -> eval` fell through to UNKNOWN/LOW even when the
 * manifest supplied precise content_scripts.matches constraints.
 */
const CONTENT_SCRIPT_WEB_SOURCES: SourceType[] = [
  "DOCUMENT_LOCATION",
  "DOCUMENT_COOKIE",
  "DOCUMENT_URL",
  "DOCUMENT_TITLE",
  "SCREEN_INFO",
  "ELEMENT_TEXT_CONTENT",
  "ELEMENT_INNER_HTML",
  "ELEMENT_OUTER_HTML",
  "ELEMENT_VALUE",
  "JQUERY_ELEMENT_VAL",
  "JQUERY_ELEMENT_TEXT",
  "JQUERY_ELEMENT_HTML",
];

const EXTERNAL_MESSAGE_SOURCES: SourceType[] = [
  "CHROME_SENDMESSAGE_EXTERNAL_RESPONSE",
  "CHROME_CONNECT_ONMESSAGE_EXTERANL",
  "CHROME_ONMESSAGEEXTERNAL_MESSAGE",
  "CHROME_ONCONNECTEXTERNAL_ONMESSAGE",
];

const EXTERNAL_MESSAGE_SINKS: SinkType[] = [
  "CHROME_RUNTIME_SENDMESSAGE_EXTERNAL",
  "CHROME_RUNTIME_CONNECT_POSTMESSAGE_EXTERNAL",
  "CHROME_RUNTIME_ONMESSAGEEXTERNAL_SENDRESPONSE",
  "CHROME_RUNTIME_ONCONNECTEXTERNAL_POSTMESSAGE",
];

const RANK_TO_LEVEL: Record<number, SeverityLevel> = {
  0: "LOW",
  1: "LOW",
  2: "MEDIUM",
  3: "HIGH",
  4: "CRITICAL",
};

function maxSeverity(items: SeverityResult[]): SeverityResult {
  if (items.length === 0) {
    return {
      rank: 0,
      level: "LOW",
      reason: "No available constraint information.",
      evidence: [],
    };
  }

  let best = items[0];
  for (const item of items) {
    if (item.rank > best.rank) best = item;
  }
  return best;
}

function parseMatchPattern(pattern: string): {
  scheme: string;
  host: string;
  path: string;
} | null {
  if (!pattern || pattern === "<all_urls>") {
    return null;
  }

  const m = pattern.match(/^([^:]+):\/\/([^/]*)(\/.*)?$/);
  if (!m) return null;

  return {
    scheme: m[1] || "",
    host: m[2] || "",
    path: m[3] || "/",
  };
}

export function isLoopbackHost(host: string): boolean {
  const cleanHost = host.replace(/:\*$/, "").replace(/:\d+$/, "").toLowerCase();
  return (
    cleanHost === "localhost" ||
    cleanHost === "127.0.0.1" ||
    cleanHost === "0.0.0.0" ||
    cleanHost === "[::1]"
  );
}

function shouldIgnorePattern(pattern: string): boolean {
  if (!pattern) return true;
  if (pattern === "<all_urls>") return false;

  const parsed = parseMatchPattern(pattern);
  if (!parsed) return false;

  if (parsed.scheme === "file") return true;
  if (isLoopbackHost(parsed.host)) return true;

  return false;
}

function getPatternSeverity(pattern: string): SeverityResult {
  if (pattern === "<all_urls>") {
    return {
      rank: 4,
      level: "CRITICAL",
      reason: "`<all_urls>` allows any webpage to trigger the extension.",
      evidence: [pattern],
    };
  }

  const parsed = parseMatchPattern(pattern);
  if (!parsed) {
    return {
      rank: 1,
      level: "LOW",
      reason: "Unparsable match pattern; conservatively treated as low risk.",
      evidence: [pattern],
    };
  }

  const host = parsed.host;
  const path = parsed.path || "/";

  if (host === "*") {
    return {
      rank: 4,
      level: "CRITICAL",
      reason: "Wildcard host `*` allows coverage of arbitrary domains.",
      evidence: [pattern],
    };
  }

  if (host.startsWith("*.")) {
    return {
      rank: 3,
      level: "HIGH",
      reason: "Wildcard subdomain matching is allowed.",
      evidence: [pattern],
    };
  }

  if (path === "/*" || path === "/" || path === "*") {
    return {
      rank: 2,
      level: "MEDIUM",
      reason: "Host is restricted, but path is wildcarded.",
      evidence: [pattern],
    };
  }

  return {
    rank: 1,
    level: "LOW",
    reason: "Applies only to specific URL paths.",
    evidence: [pattern],
  };
}

function evaluateMatches(matches: string[] | undefined): SeverityResult {
  const valid = (matches ?? []).filter((m) => !shouldIgnorePattern(m));

  if (valid.length === 0) {
    return {
      rank: 0,
      level: "LOW",
      reason: "No effective web match constraints (localhost and file ignored), low exposure to public web.",
      evidence: [],
    };
  }

  const ranked = valid.map((m) => getPatternSeverity(m));
  return maxSeverity(ranked);
}

/**
 * Returns true when every non-loopback, non-file `externally_connectable`
 * match pattern names a specific host — no `<all_urls>`, no bare `*` host,
 * no `*.domain` subdomain wildcard. Loopback origins (localhost, 127.0.0.1,
 * etc.) are counted as restricted per user requirement.
 *
 * An empty (or all-ignored) matches list also returns true: no web attacker
 * can reach the extension through web origins.
 */
export function isExternalConnectableHostRestricted(
  matches: string[] | undefined,
): boolean {
  const relevant = (matches ?? []).filter((m) => !shouldIgnorePattern(m));
  return relevant.every((m) => {
    if (m === "<all_urls>") return false;
    const parsed = parseMatchPattern(m);
    if (!parsed) return true; // unparsable → conservatively treat as restricted
    return parsed.host !== "*" && !parsed.host.startsWith("*.");
  });
}

function evaluateIds(
  ids: string[] | undefined,
  externallyConnectableDeclared: boolean,
): SeverityResult {
  const list = ids ?? [];

  if (!externallyConnectableDeclared) {
    // Without an `externally_connectable` declaration, Chrome allows ANY
    // extension to invoke onMessageExternal by default — this holds for both
    // MV2 and MV3.  (Web-page access is a separate matter: it requires an
    // explicit `matches` list regardless of manifest version; evaluateMatches
    // handles that path and already returns LOW when matches is absent.)
    return {
      rank: 4,
      level: "CRITICAL",
      reason:
        "`externally_connectable` is not declared; any external extension " +
        "can connect by default (MV2 and MV3 behave identically here).",
      evidence: ["externally_connectable: <missing>"],
    };
  }

  if (list.includes("*")) {
    return {
      rank: 4,
      level: "CRITICAL",
      reason: "`externally_connectable.ids` contains `*`, allowing any extension to connect.",
      evidence: ["*"],
    };
  }

  if (list.length > 0) {
    return {
      rank: 1,
      level: "LOW",
      reason: "Only specific extension IDs are allowed.",
      evidence: list,
    };
  }

  return {
    rank: 0,
    level: "LOW",
    reason: "No extension IDs are allowed to connect.",
    evidence: [],
  };
}

function isExternalAttackSurface(sourceType: SourceType, sinkType: SinkType): boolean {
  return (
    EXTERNAL_MESSAGE_SOURCES.includes(sourceType) ||
    EXTERNAL_MESSAGE_SINKS.includes(sinkType)
  );
}

function isContentScriptWebAttackSurface(
  sourceType: SourceType,
  sourceFrame: string,
): boolean {
  return (
    (sourceFrame.startsWith("CS_") ||
      scriptUsageTracker.getFrameFamily(sourceFrame) === "MAIN") &&
    (WEB_ATTACK_SOURCES.includes(sourceType) ||
      CONTENT_SCRIPT_WEB_SOURCES.includes(sourceType))
  );
}

function isExtensionUiWebAttackSurface(
  sourceType: SourceType,
  sourceFrame: string,
): boolean {
  if (!WEB_ATTACK_SOURCES.includes(sourceType)) return false;
  const family = scriptUsageTracker.getFrameFamily(sourceFrame);
  return family === "EX" || family === "DT" || family === "OF";
}

export function analyzeFlowConstraintSeverity(input: {
  sourceType: SourceType;
  sinkType: SinkType;
  sourceFrame: string;
  sourceFrameConstraint?: FrameConstraint;
}): FlowConstraintSeverity {
  const { sourceType, sinkType, sourceFrame, sourceFrameConstraint } = input;

  if (isExternalAttackSurface(sourceType, sinkType)) {
    const ec = scriptUsageTracker.getExternallyConnectableConfig();
    const byMatches = evaluateMatches(ec.matches);
    const byIds = evaluateIds(ec.ids, ec.declared);
    const best = maxSeverity([byMatches, byIds]);

    return {
      constraintKind: "EXTERNALLY_CONNECTABLE",
      severity: best.level,
      severityReason: best.reason,
      severityEvidence: best.evidence,
    };
  }

  if (isContentScriptWebAttackSurface(sourceType, sourceFrame)) {
    // P0#4: fall back to tracker when caller did not supply the constraint
    // (avoids silent LOW severity when the manifest entry is simply not wired up)
    const constraint =
      sourceFrameConstraint ?? scriptUsageTracker.getFrameConstraint(sourceFrame);
    const best = evaluateMatches(constraint?.matches);

    return {
      constraintKind: "CONTENT_SCRIPT_MATCHES",
      severity: best.level,
      severityReason: best.reason,
      severityEvidence: best.evidence,
    };
  }

  if (isExtensionUiWebAttackSurface(sourceType, sourceFrame)) {
    // Popups / options / side panels / devtools / offscreen documents accept
    // postMessage / custom events too, but they have no manifest-level URL
    // constraint to evaluate. Mark them MEDIUM by default: they are reachable
    // only from inside the extension permissions context (high impact if
    // exploitable), but the actor must already control a posted message in
    // that context (which usually requires another foothold).
    return {
      constraintKind: "EXTENSION_UI_PAGE",
      severity: "MEDIUM",
      severityReason:
        "Source originates from an extension UI surface (popup/options/side_panel/devtools/offscreen); no manifest URL constraint applies.",
      severityEvidence: [sourceFrame],
    };
  }

  return {
    constraintKind: "UNKNOWN",
    severity: RANK_TO_LEVEL[1],
    severityReason: "Unable to locate content_scripts or externally_connectable constraints.",
    severityEvidence: [],
  };
}
