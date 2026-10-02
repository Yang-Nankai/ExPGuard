import {
  ScriptFrameFamily,
  ScriptFrameTag,
} from "../extension/extensionScript";
import { scriptUsageTracker } from "../extension/scriptUsageTracker";
import { classifySink, classifySource } from "./policy";
import { FlowType, SinkType, SourceType } from "./types";
export type TaintProvenance = unknown;

/**
 * Privilege-delta analysis.
 *
 * The rule engine answers "is there a source→sink data flow, and what category
 * is it?". That is necessary but not sufficient to call something a
 * *vulnerability*. A flow only matters when the sink grants the data's origin
 * some capability it did not already have — a privilege boundary has to be
 * crossed.
 *
 * Two patterns dominate the low-value findings on real corpora (measured on a
 * 5,503-extension run: `STORAGE_POSOING` alone was 37% of all reported flows):
 *
 *   1. Page-controlled data flowing to a sink inside a **content script** that
 *      the page itself could have invoked. A content script's `fetch` carries
 *      the page's origin, and a DOM write goes straight back into the page the
 *      data came from. Nothing is gained; this is just an extension reading and
 *      relaying page state.
 *
 *   2. `chrome.storage` writes for a key **nothing ever reads back**. Storage
 *      poisoning is only meaningful if some later decision consumes the
 *      poisoned value.
 *
 * Everything else — any `chrome.*` privileged API, code execution (even in a
 * content script, whose isolated world holds extension privileges), any hop out
 * of the page's reach via messaging or extension storage — is treated as
 * crossing.
 */

export interface PrivilegeVerdict {
  /** True when the sink grants authority the source's origin lacked. */
  crosses: boolean;
  /** Human-readable justification, surfaced in the report. */
  reason: string;
}

const CROSSES: PrivilegeVerdict = {
  crosses: true,
  reason: "sink grants capability beyond the source origin",
};

/**
 * Sink capabilities a web page can already exercise on its own, so reaching
 * them from page-controlled data inside a page-equivalent frame gains nothing.
 *
 * `CODE_EXECUTION` is deliberately absent: `eval` in a content script runs in
 * the isolated world with `chrome.*` access, which the page cannot reach.
 * `STORAGE_WRITE` is absent for the same reason — extension storage is outside
 * the page's reach (web `localStorage` sinks are filtered separately by
 * `shouldFilterSourceByFrame`).
 */
const PAGE_EQUIVALENT_SINK_CAPABILITIES = ["NETWORK_SEND", "DOM_WRITE"];

const EXTENSION_OWNED_FRAME_FAMILIES = new Set<ScriptFrameFamily>([
  "BG",
  "EX",
  "DT",
  "OF",
]);

const HTML_READ_SOURCE_TYPES = new Set<SourceType>([
  "ELEMENT_INNER_HTML",
  "JQUERY_ELEMENT_HTML",
]);

const HTML_WRITE_SINK_TYPES = new Set<SinkType>([
  "DOM_INNER_HTML",
  "JQUERY_ELEMENT_HTML_SET",
]);

/** Storage sink types, mapped to the `chrome.storage` area they write. */
const STORAGE_SINK_AREAS: Partial<Record<SinkType, string>> = {
  CHROME_LOCAL_STORAGE: "local",
  CHROME_SYNC_STORAGE: "sync",
  CHROME_SESSION_STORAGE: "session",
};

export interface PrivilegeDeltaInput {
  sourceType: SourceType;
  sinkType: SinkType;
  /** Provenance of the root source before any transport hop. */
  sourceProvenance?: TaintProvenance;
  sourceFrame: ScriptFrameTag;
  sinkFrame: ScriptFrameTag;
  /** Explicit frame families are preferred to avoid tracker initialization
   *  coupling in direct/offline callers. */
  sourceFrameFamily?: ScriptFrameFamily;
  sinkFrameFamily?: ScriptFrameFamily;
  flowType: FlowType;
  /** Sink `remark`; for storage writes this is the key that was written. */
  sinkRemark?: string;
  /**
   * Does anything in the extension read `(area, key)` back? Injected rather
   * than imported so this module stays free of a cycle back into TaintManager.
   */
  hasStorageConsumer?: (area: string, key: string) => boolean;
  /** Reversible precision switch; defaults to true. */
  pageContextFiltering?: boolean;
}

/**
 * Decide whether a matched flow actually crosses a privilege boundary.
 */
export function evaluatePrivilegeDelta(
  input: PrivilegeDeltaInput,
): PrivilegeVerdict {
  const {
    sourceType,
    sinkType,
    sourceFrame,
    sinkFrame,
    sinkRemark,
    hasStorageConsumer,
    sourceFrameFamily,
    sinkFrameFamily,
    pageContextFiltering = true,
  } = input;

  const sourceCapability = classifySource(sourceType);
  const sinkCapability = classifySink(sinkType);
  const sourceFamily =
    sourceFrameFamily ?? scriptUsageTracker.getFrameFamily(sourceFrame);
  const sinkFamily =
    sinkFrameFamily ?? scriptUsageTracker.getFrameFamily(sinkFrame);

  // ---- Pattern 0: same extension-owned document DOM self-rewrite ----
  // A background page, popup, options page, etc. reading HTML from its own
  // document and writing it back does not gain any authority. This is common
  // in localization, templating and sanitizer helpers.
  if (
    pageContextFiltering &&
    sourceFrame === sinkFrame &&
    EXTENSION_OWNED_FRAME_FAMILIES.has(sourceFamily) &&
    HTML_READ_SOURCE_TYPES.has(sourceType) &&
    HTML_WRITE_SINK_TYPES.has(sinkType)
  ) {
    return {
      crosses: false,
      reason:
        "same extension-owned document reads and rewrites its own DOM; " +
        "no page/extension privilege boundary is crossed",
    };
  }

  // ---- Pattern 0b: MAIN-world page-equivalent execution ----
  // A MAIN-world content script has exactly the page's authority. Eval,
  // network and DOM writes in that same script context are not extension
  // privilege escalation.
  if (
    pageContextFiltering &&
    sourceFrame === sinkFrame &&
    sourceFamily === "MAIN" &&
    sinkFamily === "MAIN" &&
    isWebOriginData(sourceCapability) &&
    (sinkCapability === "NETWORK_SEND" ||
      sinkCapability === "DOM_WRITE" ||
      sinkCapability === "CODE_EXECUTION")
  ) {
    return {
      crosses: false,
      reason:
        "page-controlled data reaches a page-equivalent sink in the same " +
        "MAIN-world script; the page can perform the same action itself",
    };
  }

  // ---- Pattern 1: page-equivalent sink reached from page-controlled data ----
  if (
    isWebOriginData(sourceCapability) &&
    PAGE_EQUIVALENT_SINK_CAPABILITIES.includes(sinkCapability) &&
    isPageEquivalentFrame(sourceFrame, sourceFamily) &&
    isPageEquivalentFrame(sinkFrame, sinkFamily)
  ) {
    return {
      crosses: false,
      reason:
        `page-controlled data reaches ${sinkCapability} inside a content ` +
        `script; the page can perform this itself, so no authority is gained`,
    };
  }

  // ---- Pattern 2: storage write nothing reads back ----
  const area = STORAGE_SINK_AREAS[sinkType];
  if (area && hasStorageConsumer) {
    const key = sinkRemark;

    // A fuzzy write (key not statically known) could land anywhere — keep it.
    if (key && key !== "storage.fuzzy.settings" && !hasStorageConsumer(area, key)) {
      return {
        crosses: false,
        reason:
          `chrome.storage.${area} key "${key}" is written but never read back ` +
          `anywhere in the extension, so the write cannot influence a later decision`,
      };
    }
  }

  return CROSSES;
}

/** Source capabilities whose data originates in the web page. */
function isWebOriginData(capability: string): boolean {
  return capability === "WEB_CONTENT" || capability === "ATTACKER_INPUT";
}

/**
 * A frame whose authority, for network and DOM purposes, is no greater than
 * the web page's. Content scripts qualify; background / offscreen / extension
 * pages do not (they hold the extension's host permissions).
 */
function isPageEquivalentFrame(
  frame: ScriptFrameTag,
  explicitFamily?: ScriptFrameFamily,
): boolean {
  const family =
    explicitFamily ?? scriptUsageTracker.getFrameFamily(frame);
  return family === "CS" || family === "MAIN";
}
