import {
  ATTACKER_SOURCES,
  CODE_SINKS,
  DOCUMENT_SOURCES,
  DOM_SINKS,
  MESSAGE_SINKS,
  NETWORK_SINKS,
  NETWORK_SOURCES,
  PRIVILEGED_SINKS,
  SENSITIVE_SOURCES,
  STORAGE_SINKS,
  STORAGE_SOURCES,
  SYSTEM_SOURCES,
  WEB_EVENT_SOURCES,
  WEB_STORAGE_SINKS,
} from "../constants/taint";

import {
  FlowType,
  SinkCapability,
  SinkType,
  SourceCapability,
  SourceType,
} from "./types";

import config from "../config";
import { scriptUsageTracker } from "../extension/scriptUsageTracker";
import { ScriptFrameTag } from "../extension/extensionScript";
import { taintRuleEngine } from "./ruleEngine";
import { RuleMatch } from "./ruleTypes";

/* ================= Script Filter ================= */

export function shouldIncludeScriptInPolicy(scriptKey: string): boolean {
  if (!config.filterUnusedRuntimeScripts) return true;
  return scriptUsageTracker.isScriptUsed(scriptKey);
}

/**
 * Frame-feasibility filter — orthogonal to the rule engine. Even if a rule
 * matches a (source, sink) pair, the analyzer may know the source can't
 * physically fire in the source frame (e.g. window message events in a
 * background service worker). Returning `true` here drops the flow.
 */
export function shouldFilterSourceByFrame(
  source: SourceType,
  sourceFrame: ScriptFrameTag,
  sink: SinkType,
  sinkFrame: ScriptFrameTag,
  sourceFrameTags: ScriptFrameTag[] = [],
): boolean {
  const sourceFamily = scriptUsageTracker.getFrameFamily(sourceFrame);
  const sinkFamily = scriptUsageTracker.getFrameFamily(sinkFrame);
  const sourceFamilies = new Set(
    [sourceFrame, ...sourceFrameTags].map((tag) =>
      scriptUsageTracker.getFrameFamily(tag),
    ),
  );

  /**
   * DOM reads in an extension-owned document are not web attacker input.  This
   * applies to form controls as well as to static markup used by a popup's
   * localization/rendering code. The caller preserves the root frame across
   * runtime/storage relays, so a real content-script or external-message source
   * is never hidden by this rule.
   */
  const isExtensionOwnedDomSource = [
    "ELEMENT_VALUE",
    "JQUERY_ELEMENT_VAL",
    "ELEMENT_TEXT_CONTENT",
    "JQUERY_ELEMENT_TEXT",
    "ELEMENT_INNER_HTML",
    "JQUERY_ELEMENT_HTML",
    "ELEMENT_OUTER_HTML",
  ].includes(source);
  // A script can be referenced by both the background and popup. Reporting
  // chooses BG first, but `document.getElementById(...).value` executes only
  // in its extension-owned page instance. Suppress it when the script is
  // shared exclusively by BG/EX frames; retain the flow if CS is also a
  // possible execution frame so real page-DOM sources remain detectable.
  const sharedUiAndBackgroundOnly =
    sourceFamily === "BG" &&
    (sourceFamilies.has("EX") ||
      sourceFamilies.has("DT") ||
      sourceFamilies.has("OF")) &&
    !sourceFamilies.has("CS");
  if (
    isExtensionOwnedDomSource &&
    (sourceFamily === "EX" ||
      sourceFamily === "DT" ||
      sourceFamily === "OF" ||
      sharedUiAndBackgroundOnly)
  ) {
    return true;
  }

  if (WEB_EVENT_SOURCES.includes(source)) {
    // Background service workers and offscreen documents have no `window`
    // event loop — any `window.addEventListener("message", ...)` registered
    // there can never fire. Drop those flows as infeasible.
    if (sourceFamily === "BG" || sourceFamily === "OF") {
      return true;
    }
    if (
      sourceFamily === "CS" &&
      sinkFamily === "CS" &&
      WEB_STORAGE_SINKS.includes(sink)
    ) {
      return true;
    }
  }

  return false;
}

/* ================= Classification ================= */

export function classifySource(source: SourceType): SourceCapability {
  if (ATTACKER_SOURCES.includes(source)) return "ATTACKER_INPUT";
  if (SENSITIVE_SOURCES.includes(source)) return "SENSITIVE_DATA";
  if (SYSTEM_SOURCES.includes(source)) return "SYSTEM_INFO";
  if (NETWORK_SOURCES.includes(source)) return "NETWORK_RESPONSE";
  if (DOCUMENT_SOURCES.includes(source)) return "WEB_CONTENT";
  if (STORAGE_SOURCES.includes(source)) return "STORAGE_DATA";
  return "UNKNOWN_SOURCE";
}

export function classifySink(sink: SinkType): SinkCapability {
  if (CODE_SINKS.includes(sink)) return "CODE_EXECUTION";
  if (NETWORK_SINKS.includes(sink)) return "NETWORK_SEND";
  if (MESSAGE_SINKS.includes(sink)) return "MESSAGE_RESPONSE";
  if (DOM_SINKS.includes(sink)) return "DOM_WRITE";
  if (STORAGE_SINKS.includes(sink)) return "STORAGE_WRITE";
  if (PRIVILEGED_SINKS.includes(sink)) return "PRIVILEGED_OPERATION";
  return "UNKNOWN_SINK";
}

/**
 * Sinks that parse/coerce their input as code or HTML.  This deliberately
 * excludes configuration APIs such as chrome.alarms.create: a number cannot
 * inject JavaScript/markup, but it can still change an alarm schedule and is
 * therefore security-relevant.
 */
export function isStringInterpretingSink(sink: SinkType): boolean {
  return CODE_SINKS.includes(sink) || DOM_SINKS.includes(sink);
}

/* ================= Core Flow Logic ================= */

/**
 * Resolve a (source, sink) pair through the rule engine. Returns every
 * matching FlowType minus any suppressed by the loaded rule set.
 *
 * The default rule set (src/taint/rules/default-rules.json) reproduces the
 * original hand-written matrix exactly; user-supplied rule files (loaded via
 * `config.taintRulesPath` / `--taint-rules`) can add or refine categories
 * (e.g. classify cookies → fetch body as DATA_LEAK while still flagging
 * REQUEST_FORGERY for the same pair).
 */
export function getFlowTypes(source: SourceType, sink: SinkType): FlowType[] {
  return taintRuleEngine.getFlowTypes(source, sink);
}

/** Like `getFlowTypes` but keeps the rule provenance for reporting. */
export function getFlowMatches(source: SourceType, sink: SinkType): RuleMatch[] {
  return taintRuleEngine.matchFlowTypes(source, sink);
}

/**
 * @deprecated Use `getFlowTypes` (all-match) or `getFlowMatches` (with rule
 * provenance). Kept for any out-of-tree callers that still expect a single
 * FlowType; returns the first match or null.
 */
export function getFlowType(
  source: SourceType,
  sink: SinkType,
): FlowType | null {
  const matches = taintRuleEngine.getFlowTypes(source, sink);
  return matches.length > 0 ? matches[0] : null;
}
