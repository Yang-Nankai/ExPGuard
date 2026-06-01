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

/* ================= Script Filter ================= */

export function shouldIncludeScriptInPolicy(scriptKey: string): boolean {
  if (!config.filterUnusedRuntimeScripts) return true;
  return scriptUsageTracker.isScriptUsed(scriptKey);
}

export function shouldFilterSourceByFrame(
  source: SourceType,
  sourceFrame: ScriptFrameTag,
  sink: SinkType,
  sinkFrame: ScriptFrameTag
): boolean {
  const sourceFamily = scriptUsageTracker.getFrameFamily(sourceFrame);
  const sinkFamily = scriptUsageTracker.getFrameFamily(sinkFrame);

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

/* ================= Core Flow Logic ================= */

export function getFlowType(
  source: SourceType,
  sink: SinkType,
): FlowType | null {
  if (isNativeOutputSource(source)) return null;
  if (isNativeOutputSink(sink)) return null;

  const srcCap = classifySource(source);
  const sinkCap = classifySink(sink);

  switch (srcCap) {
    /* ===== ATTACKER INPUT ===== */

    case "ATTACKER_INPUT":
      if (sinkCap === "PRIVILEGED_OPERATION") return "PRIVILEGE_ESCALATION";

      if (sinkCap === "STORAGE_WRITE") return "STORAGE_POSOING";

      if (sinkCap === "NETWORK_SEND") return "REQUEST_FORGERY";

      if (sinkCap === "CODE_EXECUTION") return "CODE_INJECTION";

      if (
        sinkCap === "MESSAGE_RESPONSE" &&
        filterMessageTaint(source, sink)
      )
        return "PRIVILEGE_ESCALATION";

      break;

    /* ===== SENSITIVE DATA ===== */

    case "SENSITIVE_DATA":
      if (
        sinkCap === "MESSAGE_RESPONSE" &&
        shouldReportDataLeakSource(source)
      )
        return "DATA_LEAK";
      break;

    /* ===== SYSTEM INFO (Fingerprint → DATA_LEAK) ===== */

    case "SYSTEM_INFO":
      if (
        sinkCap === "MESSAGE_RESPONSE" &&
        shouldReportDataLeakSource(source)
      )
        return "DATA_LEAK";
      break;

    /* ===== NETWORK RESPONSE ===== */

    case "NETWORK_RESPONSE":
      if (sinkCap === "CODE_EXECUTION") return "CODE_INJECTION";

      if (sinkCap === "PRIVILEGED_OPERATION")
        return "PRIVILEGE_ESCALATION";

      if (sinkCap === "STORAGE_WRITE") return "STORAGE_POSOING";

      break;

    /* ===== WEB CONTENT ===== */

    case "WEB_CONTENT":
      if (sinkCap === "CODE_EXECUTION") return "CODE_INJECTION";
      // if (sinkCap === "STORAGE_WRITE") return "STORAGE_POSOING";
      if (sinkCap === "PRIVILEGED_OPERATION") return "PRIVILEGE_ESCALATION";

      break;

    /* ===== STORAGE DATA ===== */

    case "STORAGE_DATA":
      if (
        sinkCap === "MESSAGE_RESPONSE" &&
        shouldReportDataLeakSource(source)
      )
        return "DATA_LEAK";
      break;
  }

  return null;
}

function shouldReportDataLeakSource(source: SourceType): boolean {
  if (source === "SCREEN_INFO") return false;

  // Keep compatibility with current enum typo NAVIGAROR_GEOLOCATION.
  if (source.startsWith("NAVIGATOR_") || source.startsWith("NAVIGAROR_")) {
    return false;
  }

  return true;
}

/* ================= Native Filter ================= */

function isNativeOutputSink(sink: SinkType): boolean {
  return (
    sink === "CHROME_RUNTIME_SENDNATIVEMESSAGE_EXTERNAL" ||
    sink === "CHROME_RUNTIME_ONCONNECTNATIVE_POSTMESSAGE"
  );
}

function isNativeOutputSource(source: SourceType): boolean {
  return (
    source === "CHROME_CONNECTNATIVE_ONMESSAGE" ||
    source === "CHROME_SENDNATIVEMESSAGE_EXTERNAL_RESPONSE"
  );
}

/* ================= FP Reduction ================= */

function filterMessageTaint(source: SourceType, sink: SinkType): boolean {
  const safePairs: [SourceType, SinkType][] = [
    // ==========================================
    // 1. Window & DOM Level
    // ==========================================
    ["WINDOW_MESSAGE_EVENT", "WINDOW_POSTMESSAGE"],
    ["WINDOW_CUSTOM_EVENT", "WINDOW_POSTMESSAGE"],
    ["TARGET_CUSTOM_EVENT", "WINDOW_POSTMESSAGE"],

    // ==========================================
    // 2. Extension External
    // ==========================================
    ["WINDOW_MESSAGE_EVENT", "CHROME_RUNTIME_SENDMESSAGE_EXTERNAL"],
    ["WINDOW_CUSTOM_EVENT", "CHROME_RUNTIME_ONMESSAGEEXTERNAL_SENDRESPONSE"],
    ["CHROME_ONMESSAGEEXTERNAL_MESSAGE", "CHROME_RUNTIME_ONMESSAGEEXTERNAL_SENDRESPONSE"],
    ["CHROME_ONMESSAGEEXTERNAL_MESSAGE", "CHROME_RUNTIME_SENDMESSAGE_EXTERNAL"],
    ["CHROME_ONMESSAGEEXTERNAL_MESSAGE", "CHROME_RUNTIME_ONCONNECTEXTERNAL_POSTMESSAGE"],
    ["CHROME_ONMESSAGEEXTERNAL_MESSAGE", "WINDOW_POSTMESSAGE"],
    ["CHROME_ONCONNECTEXTERNAL_ONMESSAGE", "CHROME_RUNTIME_ONCONNECTEXTERNAL_POSTMESSAGE"],
    ["CHROME_SENDMESSAGE_EXTERNAL_RESPONSE", "CHROME_RUNTIME_SENDMESSAGE_EXTERNAL"],

    // ==========================================
    // 3. Extension Native
    // ==========================================
    ["CHROME_SENDNATIVEMESSAGE_EXTERNAL_RESPONSE", "CHROME_RUNTIME_SENDNATIVEMESSAGE_EXTERNAL"],
    ["CHROME_CONNECTNATIVE_ONMESSAGE", "CHROME_RUNTIME_ONCONNECTNATIVE_POSTMESSAGE"],
  ];

  return !safePairs.some(
    ([safeSrc, safeSink]) => source === safeSrc && sink === safeSink
  );
}