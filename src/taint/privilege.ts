import { ScriptFrameTag } from "../extension/extensionScript";
import { scriptUsageTracker } from "../extension/scriptUsageTracker";
import { isExternalConnectableHostRestricted } from "./constraintSeverity";
import { classifySink, classifySource } from "./policy";
import {
  FlowType,
  SinkType,
  SourceType,
  UrlTaintControl,
} from "./types";
import type { TaintProvenance as TaintProvenanceType } from "./types";

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
 * Source types that represent *incoming* external connections — i.e. messages
 * or ports initiated by a web page or another extension toward this extension.
 * The `externally_connectable` manifest key and sender-identity guards apply
 * exclusively to these sources (not to outgoing `sendMessage` responses or
 * native-messaging replies).
 */
const INCOMING_EXTERNAL_SOURCES: ReadonlySet<SourceType> = new Set([
  "CHROME_ONMESSAGEEXTERNAL_MESSAGE",
  "CHROME_ONCONNECTEXTERNAL_ONMESSAGE",
  "CHROME_CONNECT_ONMESSAGE_EXTERANL", // note: intentional typo from codebase
]);

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

/** Storage sink types, mapped to the `chrome.storage` area they write. */
const STORAGE_SINK_AREAS: Partial<Record<SinkType, string>> = {
  CHROME_LOCAL_STORAGE: "local",
  CHROME_SYNC_STORAGE: "sync",
  CHROME_SESSION_STORAGE: "session",
};

/**
 * These jQuery APIs only render/update DOM text or form values. Their input
 * is not parsed as HTML/code. Keep the matched flow in `privilegeSuppressed`
 * for audit rather than emit a vulnerability finding.
 *
 * Chrome Action Badge/Title are intentionally absent even though they are
 * presentation APIs: the reporting policy treats page-controlled extension UI
 * state as a vulnerability Flow, as requested by the analysis workflow.
 * Alarm APIs are likewise absent because a page-controlled interval/name can
 * alter privileged extension behaviour (e.g. resource exhaustion or a
 * sensitive periodic task), despite not being a code-execution sink.
 */
const PRESENTATION_ONLY_SINKS: ReadonlySet<SinkType> = new Set([
  "JQUERY_ELEMENT_VAL_SET",
  "JQUERY_ELEMENT_TEXT_SET",
]);

/**
 * Request-forgery precision helpers.
 *
 * A network sink is not automatically a request-forgery vulnerability merely
 * because a tainted value is present somewhere in the request.  In
 * particular, auth tokens, e-mail addresses, client ids and API keys commonly
 * flow into a fixed first-party endpoint.  Those values may be security
 * relevant for a DATA_LEAK review, but they do not give the attacker control
 * of the request target.  Keep URL-bearing and full-options flows untouched.
 */
const REQUEST_NETWORK_SINKS: ReadonlySet<SinkType> = new Set([
  "FETCH_RESOURCE",
  "FETCH_OPTIONS",
  "FETCH_BODY",
  "FETCH_HEADERS",
  "JQUERY_AJAX_URL",
  "JQUERY_AJAX_DATA",
  "JQUERY_AJAX_SETTINGS_URL",
  "JQUERY_AJAX_SETTINGS_DATA",
  "JQUERY_GET_URL",
  "JQUERY_GET_DATA",
  "JQUERY_POST_URL",
  "JQUERY_POST_DATA",
  "JQUERY_SETTINGS_URL",
  "JQUERY_SETTINGS_DATA",
  "XML_HTTP_REQUEST_OPEN",
  "XML_HTTP_REQUEST_SEND",
  "XML_HTTP_REQUEST_SETHEADER",
  "AXIOS_URL",
  "AXIOS_DATA",
  "AXIOS_HEADERS",
  "WEBSOCKET_URL",
  "WEBSOCKET_DATA",
]);

const URL_BEARING_SOURCE_RE =
  /(?:\b|_)(?:url|uri|endpoint|host|origin|serviceurl|baseurl|apiurl|targeturl|downloadurl|source_url|request_url|initurl|signurl|prescriptionpdf)(?:\b|_)/i;
const AUTH_OR_METADATA_SOURCE_RE =
  /(?:token|auth|authorization|email|clientid|client_id|uuid|paddle|supabase|bhl_)/i;

/** Fixed validation/business endpoints whose request target is not tainted. */
const FIXED_VALIDATION_ENDPOINT_RE =
  /(?:maps\.googleapis\.com\/maps\/api\/staticmap|\/api\/articles(?:\b|[?"'`])|subscription-status|auth\/v1\/(?:user|token)|trigger-(?:disney|netflix)-player|(?:examroom|provexam)\.(?:ai|com)|\/api\/(?:intake-from-extension|intake-pdf|import-from-extension|bank-diagnostic))/i;

function isWebOrExternalProvenance(
  provenance?: TaintProvenanceType,
): boolean {
  return (
    provenance === "UNTRUSTED_STORAGE" ||
    provenance === "EXTERNAL_MESSAGE"
  );
}

function isUrlBearingSourceEvidence(text: string): boolean {
  return URL_BEARING_SOURCE_RE.test(text);
}

function isAuthOrMetadataOnlySource(text: string): boolean {
  return (
    AUTH_OR_METADATA_SOURCE_RE.test(text) &&
    !isUrlBearingSourceEvidence(text)
  );
}

function sinkContainsEndpoint(
  endpointPattern: RegExp,
  sinkRemark?: string,
  sinkCode?: string,
  sinkScriptCode?: string,
): boolean {
  // `sinkScriptCode` is the complete file and may contain an unrelated URL.
  // Do not let that URL turn a dynamic sink into a fixed-endpoint finding;
  // endpoint evidence must occur in the sink remark or the sink AST snippet.
  const text = [sinkRemark, sinkCode]
    .filter(Boolean)
    .join(" ");

  // Only recognized validation/import business endpoints count as fixed here.
  // A generic literal URL is intentionally not enough: a fixed wallet/RPC or
  // social API can still be a meaningful request-forgery/transaction sink.
  if (endpointPattern.test(text)) return true;

  // Some extensions assign a fixed local endpoint to a variable (`localUrl`)
  // and pass that variable to fetch. Resolve only identifiers used by this
  // sink and only direct literal assignments; this avoids treating an
  // unrelated URL elsewhere in the file as evidence for a dynamic sink.
  if (!sinkCode || !sinkScriptCode) return false;
  const identifiers = new Set(
    (sinkCode.match(/\b[A-Za-z_$][\w$]*\b/g) ?? []).filter(
      (name) => !/^(fetch|url|body|method|headers|const|let|var)$/i.test(name),
    ),
  );
  for (const name of identifiers) {
    const assignment = new RegExp(
      `(?:const|let|var)\\s+${name.replace(/[.*+?^${}()|[\\]\\]/g, "\\$&")}\\s*=\\s*[\\\"'\\\`]([^\\\"'\\\`]+)[\\\"'\\\`]`,
      "i",
    );
    const match = assignment.exec(sinkScriptCode);
    if (match && endpointPattern.test(match[1])) return true;
  }
  return false;
}

function hasFixedEndpointEvidence(
  sinkRemark?: string,
  sinkCode?: string,
  sinkScriptCode?: string,
): boolean {
  return sinkContainsEndpoint(
    FIXED_VALIDATION_ENDPOINT_RE,
    sinkRemark,
    sinkCode,
    sinkScriptCode,
  );
}

function networkSinkSnippetLooksConsistent(
  sinkType: SinkType,
  sinkCode?: string,
): boolean {
  if (!sinkCode) return true;
  const code = sinkCode.toLowerCase();
  if (
    ["FETCH_RESOURCE", "FETCH_OPTIONS", "FETCH_BODY", "FETCH_HEADERS"].includes(
      sinkType,
    )
  ) {
    return /\bfetch\s*\(/.test(code);
  }
  if (sinkType.startsWith("XML_HTTP_REQUEST_")) return /xmlhttprequest|\.open\s*\(|\.send\s*\(/.test(code);
  if (sinkType.startsWith("AXIOS_")) return /axios|\.request\s*\(|\.get\s*\(|\.post\s*\(/.test(code);
  if (sinkType.startsWith("JQUERY_")) return /\$\s*\(|ajax|\.get\s*\(|\.post\s*\(/.test(code);
  if (sinkType.startsWith("WEBSOCKET_")) return /websocket|\.send\s*\(/.test(code);
  return true;
}

export interface RequestForgeryPrecisionInput {
  flowType: FlowType;
  sourceType: SourceType;
  sourceProvenance?: TaintProvenanceType;
  sourceRemark?: string;
  sinkType: SinkType;
  sinkRemark?: string;
  sinkUrlTaintControl?: UrlTaintControl;
  sinkCode?: string;
  sinkScriptCode?: string;
}

/**
 * Return a suppression reason for a high-confidence REQUEST_FORGERY false
 * positive, or undefined when the flow must remain reportable.
 *
 * This gate is deliberately narrow:
 *  - FULL URL control and FETCH_OPTIONS are never suppressed;
 *  - URL-bearing keys (serviceUrl/apiUrl/downloadUrl/...) are never treated as
 *    auth-only metadata;
 *  - content-script body flows remain reportable except for the two explicit
 *    fixed validation/import endpoints above.
 */
export function requestForgerySuppressionReason(
  input: RequestForgeryPrecisionInput,
): string | undefined {
  if (input.flowType !== "REQUEST_FORGERY") return undefined;
  if (!REQUEST_NETWORK_SINKS.has(input.sinkType)) return undefined;

  // A full URL or an opaque complete options object is the canonical RF/SSRF
  // shape. Never suppress these, regardless of endpoint text.
  if (
    input.sinkUrlTaintControl === "FULL" ||
    input.sinkType === "FETCH_OPTIONS"
  ) {
    return undefined;
  }

  // A copied/owner-mismatched AST can occasionally attach a network sink tag
  // to an unrelated UI expression. When the URL is unknown and the sink
  // snippet contains no network invocation, keep it in the suppression audit
  // rather than emit a malformed REQUEST_FORGERY finding. A real sink retains
  // its call expression and therefore remains unaffected.
  if (
    (input.sinkRemark === "[Unknown URL]" || !input.sinkRemark) &&
    input.sinkCode &&
    /addEventListener|textContent|setSelectionRange|formatKeyInput|input\.value/i.test(
      input.sinkCode,
    ) &&
    !networkSinkSnippetLooksConsistent(input.sinkType, input.sinkCode)
  ) {
    return "REQUEST_FORGERY suppressed: sink metadata is not consistent with a network invocation"
  }

  const sourceEvidence = `${input.sourceRemark ?? ""} ${input.sourceType}`;
  const fixedEndpoint = hasFixedEndpointEvidence(
    input.sinkRemark,
    input.sinkCode,
    input.sinkScriptCode,
  );

  // Auth/header metadata does not forge a request target. This handles token,
  // e-mail and client-id values sent as headers or fixed-endpoint parameters,
  // while preserving serviceUrl/baseUrl/apiUrl and similar URL-bearing keys.
  if (
    isWebOrExternalProvenance(input.sourceProvenance) &&
    isAuthOrMetadataOnlySource(sourceEvidence) &&
    (input.sinkType === "FETCH_HEADERS" || fixedEndpoint)
  ) {
    return fixedEndpoint
      ? "REQUEST_FORGERY suppressed: auth/metadata value reaches a fixed endpoint; URL target is not attacker-controlled"
      : "REQUEST_FORGERY suppressed: auth/metadata value reaches request headers without controlling the URL"
  }

  // The following are intentionally endpoint-specific because they are common
  // extension workflows, not generic allowlists:
  //   * API-key validation against Google Static Maps;
  //   * bank/blob imports into the user's local app.
  // A future arbitrary URL or full-options path does not match this carve-out.
  if (
    fixedEndpoint &&
    sinkContainsEndpoint(
      /maps\.googleapis\.com\/maps\/api\/staticmap/i,
      input.sinkRemark,
      input.sinkCode,
      input.sinkScriptCode,
    ) &&
    input.sourceType === "WINDOW_MESSAGE_EVENT" &&
    input.sinkType === "FETCH_RESOURCE"
  ) {
    return "REQUEST_FORGERY suppressed: page content is used only as an API-key candidate for a fixed Google validation endpoint"
  }

  if (
    fixedEndpoint &&
    sinkContainsEndpoint(
      /\/api\/(?:intake-from-extension|intake-pdf|import-from-extension)/i,
      input.sinkRemark,
      input.sinkCode,
      input.sinkScriptCode,
    ) &&
    input.sinkType === "FETCH_BODY"
  ) {
    return "REQUEST_FORGERY suppressed: captured bank/import payload is POSTed to the extension's fixed local ingestion API"
  }

  if (
    fixedEndpoint &&
    sinkContainsEndpoint(
      /\/api\/bank-diagnostic/i,
      input.sinkRemark,
      input.sinkCode,
      input.sinkScriptCode,
    ) &&
    input.sinkType === "FETCH_BODY"
  ) {
    return "REQUEST_FORGERY suppressed: opt-in diagnostic payload reaches a fixed bank-diagnostic endpoint"
  }

  return undefined;
}

export interface PrivilegeDeltaInput {
  sourceType: SourceType;
  sinkType: SinkType;
  /** Provenance of the root source before any transport hop. */
  sourceProvenance?: TaintProvenanceType;
  sourceFrame: ScriptFrameTag;
  sinkFrame: ScriptFrameTag;
  flowType: FlowType;
  /** Sink `remark`; for storage writes this is the key that was written. */
  sinkRemark?: string;
  /**
   * Source `remark` string set when the taint source was created. For
   * `onMessageExternal` handlers with a detected sender equality guard this
   * will contain the `|sender-guarded` marker (P1).
   */
  sourceRemark?: string;
  /** URL control and source snippets used by the RF precision gate. */
  sinkUrlTaintControl?: UrlTaintControl;
  sinkCode?: string;
  sinkScriptCode?: string;
  /**
   * Does anything in the extension read `(area, key)` back? Injected rather
   * than imported so this module stays free of a cycle back into TaintManager.
   */
  hasStorageConsumer?: (area: string, key: string) => boolean;
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
    sourceRemark,
    sinkUrlTaintControl,
    sinkCode,
    sinkScriptCode,
    hasStorageConsumer,
  } = input;

  const sourceCapability = classifySource(sourceType);
  const sinkCapability = classifySink(sinkType);

  const requestForgeryReason = requestForgerySuppressionReason({
    flowType: input.flowType,
    sourceType,
    sourceProvenance: input.sourceProvenance,
    sourceRemark,
    sinkType,
    sinkRemark,
    sinkUrlTaintControl,
    sinkCode,
    sinkScriptCode,
  });
  if (requestForgeryReason) {
    return { crosses: false, reason: requestForgeryReason };
  }

  // ---- Pattern 0: presentation-only output ----
  if (PRESENTATION_ONLY_SINKS.has(sinkType)) {
    return {
      crosses: false,
      reason:
        `${sinkType} only updates an extension-owned text/value surface and ` +
        "does not parse HTML/code or grant a browser capability",
    };
  }

  // ---- Pattern 1: DOM input read inside the extension's own privileged UI ----
  // `WEB_CONTENT` sources (element .value / .textContent / innerHTML / document.*)
  // are only attacker-controllable when the DOM they are read from is a *web
  // page* — i.e. a content script (`CS`). When the same read happens in an
  // extension-privileged UI page (popup / options / side_panel / devtools /
  // offscreen — families `EX` / `DT` / `OF`, all `chrome-extension://` origins),
  // the value is the user's own input into the extension's trusted UI, not an
  // attacker surface. Flagging those inflates false positives massively (bulk
  // "popup form field -> chrome.storage.local.set" findings). Such a source is
  // not attacker-controlled, so no privilege boundary is crossed.
  if (
    sourceCapability === "WEB_CONTENT" &&
    isExtensionUiFrame(sourceFrame) &&
    // An extension-page URL can still carry attacker-controlled query or
    // fragment data when the page is opened/navigated by an extension flow.
    // Keep document.URL -> HTML/code sinks visible; form/text reads remain
    // trusted UI input and continue to use the precision suppression below.
    !(
      sourceType === "DOCUMENT_URL" &&
      (sinkCapability === "DOM_WRITE" || sinkCapability === "CODE_EXECUTION")
    )
  ) {
    return {
      crosses: false,
      reason:
        `web-content source read inside an extension-privileged UI frame ` +
        `(${scriptUsageTracker.getFrameFamily(sourceFrame)}: popup/options/` +
        `devtools/offscreen); the value is the user's own input into the ` +
        `extension's trusted UI, not attacker-controllable`,
    };
  }

  // ---- Pattern 2: page-world code execution without privilege gain ----
  // A script injected into the tab's MAIN world has no extension privilege.
  // Its `new Function`/`eval` is equivalent to ordinary page JavaScript and
  // must not be reported unless the value crosses back into CS/BG/EX. The
  // check is deliberately limited to MAIN -> MAIN code execution; isolated
  // content-script code execution (the historical TP case) is unchanged.
  if (
    isWebOriginData(sourceCapability) &&
    sinkCapability === "CODE_EXECUTION" &&
    isMainWorldFrame(sourceFrame) &&
    isMainWorldFrame(sinkFrame)
  ) {
    return {
      crosses: false,
      reason:
        "page-world script executes attacker-controlled code in the same " +
        "page world; no extension privilege boundary is crossed",
    };
  }

  // ---- Pattern 3: page-equivalent sink reached from page-controlled data ----
  if (
    isWebOriginData(sourceCapability) &&
    PAGE_EQUIVALENT_SINK_CAPABILITIES.includes(sinkCapability) &&
    isPageEquivalentFrame(sourceFrame) &&
    isPageEquivalentFrame(sinkFrame)
  ) {
    return {
      crosses: false,
      reason:
        `page-controlled data reaches ${sinkCapability} inside a content ` +
        `script; the page can perform this itself, so no authority is gained`,
    };
  }

  // ---- Pattern 3: storage write nothing reads back ----
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

  // ---- Pattern 5: incoming external source with sender guard ----
  // This pattern only applies to sources that represent *incoming* external
  // connections (web pages or other extensions → this extension).
  //
  // REMOVED Pattern 3 (P0#2 - specific EC host suppression): While
  // `externally_connectable.matches: ["https://specific-site.com/*"]` restricts
  // the attack surface, it does NOT eliminate exploitability. An attacker can:
  // 1. Find/exploit XSS on specific-site.com
  // 2. Execute malicious JS that sends crafted messages to the extension
  // This is a real attack path (XSS-via-trusted-domain) and should remain
  // reported. Only sender.id guards (extension-to-extension trust) or explicit
  // sender.origin/url equality checks in the handler body neutralize the flow.
  if (INCOMING_EXTERNAL_SOURCES.has(sourceType)) {
    // ---- Pattern 5 (P1#1): sender identity equality guard in listener body ----
    // When the onMessageExternal handler verifies sender.id / sender.origin /
    // sender.url with a strict equality check against a non-empty literal, the
    // message is only processed for a specific, trusted sender.  The guard
    // marker is injected into the source remark by the builtin semantic.
    if (sourceRemark?.includes("|sender-guarded")) {
      return {
        crosses: false,
        reason:
          "onMessageExternal handler contains a strict sender identity guard " +
          "(sender.id / sender.origin / sender.url === <literal>); only a " +
          "specific, trusted sender can supply data to this flow",
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
function isPageEquivalentFrame(frame: ScriptFrameTag): boolean {
  const family = scriptUsageTracker.getFrameFamily(frame);
  return family === "CS" || family === "MAIN";
}

function isMainWorldFrame(frame: ScriptFrameTag): boolean {
  return scriptUsageTracker.getFrameFamily(frame) === "MAIN";
}

/**
 * An extension-privileged UI page whose DOM is a trusted `chrome-extension://`
 * surface, not a web page: popup / options / side_panel / devtools / offscreen
 * (families `EX` / `DT` / `OF`). A DOM value read here is the user's own input,
 * never attacker-controlled.
 */
function isExtensionUiFrame(frame: ScriptFrameTag): boolean {
  const family = scriptUsageTracker.getFrameFamily(frame);
  return family === "EX" || family === "DT" || family === "OF";
}
