"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.shouldIncludeScriptInPolicy = shouldIncludeScriptInPolicy;
exports.shouldFilterSourceByFrame = shouldFilterSourceByFrame;
exports.classifySource = classifySource;
exports.classifySink = classifySink;
exports.getFlowType = getFlowType;
const taint_1 = require("../constants/taint");
const config_1 = __importDefault(require("../config"));
const scriptUsageTracker_1 = require("../extension/scriptUsageTracker");
/* ================= Script Filter ================= */
function shouldIncludeScriptInPolicy(scriptKey) {
    if (!config_1.default.filterUnusedRuntimeScripts)
        return true;
    return scriptUsageTracker_1.scriptUsageTracker.isScriptUsed(scriptKey);
}
function shouldFilterSourceByFrame(source, sourceFrame, sink, sinkFrame) {
    const sourceFamily = scriptUsageTracker_1.scriptUsageTracker.getFrameFamily(sourceFrame);
    const sinkFamily = scriptUsageTracker_1.scriptUsageTracker.getFrameFamily(sinkFrame);
    if (taint_1.WEB_EVENT_SOURCES.includes(source)) {
        if (sourceFamily === "BG") {
            return true;
        }
        else if (sourceFamily === "CS" &&
            sinkFamily === "CS" &&
            taint_1.WEB_STORAGE_SINKS.includes(sink)) {
            return true;
        }
    }
    return sourceFamily === "BG" && taint_1.WEB_EVENT_SOURCES.includes(source);
}
/* ================= Classification ================= */
function classifySource(source) {
    if (taint_1.ATTACKER_SOURCES.includes(source))
        return "ATTACKER_INPUT";
    if (taint_1.SENSITIVE_SOURCES.includes(source))
        return "SENSITIVE_DATA";
    if (taint_1.SYSTEM_SOURCES.includes(source))
        return "SYSTEM_INFO";
    if (taint_1.NETWORK_SOURCES.includes(source))
        return "NETWORK_RESPONSE";
    if (taint_1.DOCUMENT_SOURCES.includes(source))
        return "WEB_CONTENT";
    if (taint_1.STORAGE_SOURCES.includes(source))
        return "STORAGE_DATA";
    return "UNKNOWN_SOURCE";
}
function classifySink(sink) {
    if (taint_1.CODE_SINKS.includes(sink))
        return "CODE_EXECUTION";
    if (taint_1.NETWORK_SINKS.includes(sink))
        return "NETWORK_SEND";
    if (taint_1.MESSAGE_SINKS.includes(sink))
        return "MESSAGE_RESPONSE";
    if (taint_1.DOM_SINKS.includes(sink))
        return "DOM_WRITE";
    if (taint_1.STORAGE_SINKS.includes(sink))
        return "STORAGE_WRITE";
    if (taint_1.PRIVILEGED_SINKS.includes(sink))
        return "PRIVILEGED_OPERATION";
    return "UNKNOWN_SINK";
}
/* ================= Core Flow Logic ================= */
function getFlowType(source, sink) {
    if (isNativeOutputSource(source))
        return null;
    if (isNativeOutputSink(sink))
        return null;
    const srcCap = classifySource(source);
    const sinkCap = classifySink(sink);
    switch (srcCap) {
        /* ===== ATTACKER INPUT ===== */
        case "ATTACKER_INPUT":
            if (sinkCap === "PRIVILEGED_OPERATION")
                return "PRIVILEGE_ESCALATION";
            if (sinkCap === "STORAGE_WRITE")
                return "STORAGE_POSOING";
            if (sinkCap === "NETWORK_SEND")
                return "REQUEST_FORGERY";
            if (sinkCap === "CODE_EXECUTION")
                return "CODE_INJECTION";
            if (sinkCap === "MESSAGE_RESPONSE" &&
                filterMessageTaint(source, sink))
                return "PRIVILEGE_ESCALATION";
            break;
        /* ===== SENSITIVE DATA ===== */
        case "SENSITIVE_DATA":
            if (sinkCap === "MESSAGE_RESPONSE" &&
                shouldReportDataLeakSource(source))
                return "DATA_LEAK";
            break;
        /* ===== SYSTEM INFO (Fingerprint → DATA_LEAK) ===== */
        case "SYSTEM_INFO":
            if (sinkCap === "MESSAGE_RESPONSE" &&
                shouldReportDataLeakSource(source))
                return "DATA_LEAK";
            break;
        /* ===== NETWORK RESPONSE ===== */
        case "NETWORK_RESPONSE":
            if (sinkCap === "CODE_EXECUTION")
                return "CODE_INJECTION";
            if (sinkCap === "PRIVILEGED_OPERATION")
                return "PRIVILEGE_ESCALATION";
            if (sinkCap === "STORAGE_WRITE")
                return "STORAGE_POSOING";
            break;
        /* ===== WEB CONTENT ===== */
        case "WEB_CONTENT":
            if (sinkCap === "CODE_EXECUTION")
                return "CODE_INJECTION";
            // if (sinkCap === "STORAGE_WRITE") return "STORAGE_POSOING";
            if (sinkCap === "PRIVILEGED_OPERATION")
                return "PRIVILEGE_ESCALATION";
            break;
        /* ===== STORAGE DATA ===== */
        case "STORAGE_DATA":
            if (sinkCap === "MESSAGE_RESPONSE" &&
                shouldReportDataLeakSource(source))
                return "DATA_LEAK";
            break;
    }
    return null;
}
function shouldReportDataLeakSource(source) {
    if (source === "SCREEN_INFO")
        return false;
    // Keep compatibility with current enum typo NAVIGAROR_GEOLOCATION.
    if (source.startsWith("NAVIGATOR_") || source.startsWith("NAVIGAROR_")) {
        return false;
    }
    return true;
}
/* ================= Native Filter ================= */
function isNativeOutputSink(sink) {
    return (sink === "CHROME_RUNTIME_SENDNATIVEMESSAGE_EXTERNAL" ||
        sink === "CHROME_RUNTIME_ONCONNECTNATIVE_POSTMESSAGE");
}
function isNativeOutputSource(source) {
    return (source === "CHROME_CONNECTNATIVE_ONMESSAGE" ||
        source === "CHROME_SENDNATIVEMESSAGE_EXTERNAL_RESPONSE");
}
/* ================= FP Reduction ================= */
function filterMessageTaint(source, sink) {
    const safePairs = [
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
    return !safePairs.some(([safeSrc, safeSink]) => source === safeSrc && sink === safeSink);
}
