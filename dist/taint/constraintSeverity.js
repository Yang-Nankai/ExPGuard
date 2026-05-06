"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.analyzeFlowConstraintSeverity = analyzeFlowConstraintSeverity;
const scriptUsageTracker_1 = require("../extension/scriptUsageTracker");
const WEB_ATTACK_SOURCES = [
    "WINDOW_MESSAGE_EVENT",
    "WINDOW_CUSTOM_EVENT",
    "TARGET_CUSTOM_EVENT",
];
const EXTERNAL_MESSAGE_SOURCES = [
    "CHROME_SENDMESSAGE_EXTERNAL_RESPONSE",
    "CHROME_CONNECT_ONMESSAGE_EXTERANL",
    "CHROME_ONMESSAGEEXTERNAL_MESSAGE",
    "CHROME_ONCONNECTEXTERNAL_ONMESSAGE",
];
const EXTERNAL_MESSAGE_SINKS = [
    "CHROME_RUNTIME_SENDMESSAGE_EXTERNAL",
    "CHROME_RUNTIME_CONNECT_POSTMESSAGE_EXTERNAL",
    "CHROME_RUNTIME_ONMESSAGEEXTERNAL_SENDRESPONSE",
    "CHROME_RUNTIME_ONCONNECTEXTERNAL_POSTMESSAGE",
];
const RANK_TO_LEVEL = {
    0: "LOW",
    1: "LOW",
    2: "MEDIUM",
    3: "HIGH",
    4: "CRITICAL",
};
function maxSeverity(items) {
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
        if (item.rank > best.rank)
            best = item;
    }
    return best;
}
function parseMatchPattern(pattern) {
    if (!pattern || pattern === "<all_urls>") {
        return null;
    }
    const m = pattern.match(/^([^:]+):\/\/([^/]*)(\/.*)?$/);
    if (!m)
        return null;
    return {
        scheme: m[1] || "",
        host: m[2] || "",
        path: m[3] || "/",
    };
}
function isLoopbackHost(host) {
    const cleanHost = host.replace(/:\*$/, "").replace(/:\d+$/, "").toLowerCase();
    return (cleanHost === "localhost" ||
        cleanHost === "127.0.0.1" ||
        cleanHost === "0.0.0.0" ||
        cleanHost === "[::1]");
}
function shouldIgnorePattern(pattern) {
    if (!pattern)
        return true;
    if (pattern === "<all_urls>")
        return false;
    const parsed = parseMatchPattern(pattern);
    if (!parsed)
        return false;
    if (parsed.scheme === "file")
        return true;
    if (isLoopbackHost(parsed.host))
        return true;
    return false;
}
function getPatternSeverity(pattern) {
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
function evaluateMatches(matches) {
    const valid = (matches !== null && matches !== void 0 ? matches : []).filter((m) => !shouldIgnorePattern(m));
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
function evaluateIds(ids, externallyConnectableDeclared) {
    const list = ids !== null && ids !== void 0 ? ids : [];
    if (!externallyConnectableDeclared) {
        return {
            rank: 4,
            level: "CRITICAL",
            reason: "`externally_connectable` is not declared, allowing connections from any extension by default.",
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
function isExternalAttackSurface(sourceType, sinkType) {
    return (EXTERNAL_MESSAGE_SOURCES.includes(sourceType) ||
        EXTERNAL_MESSAGE_SINKS.includes(sinkType));
}
function isContentScriptWebAttackSurface(sourceType, sourceFrame) {
    return WEB_ATTACK_SOURCES.includes(sourceType) && sourceFrame.startsWith("CS_");
}
function analyzeFlowConstraintSeverity(input) {
    const { sourceType, sinkType, sourceFrame, sourceFrameConstraint } = input;
    if (isExternalAttackSurface(sourceType, sinkType)) {
        const ec = scriptUsageTracker_1.scriptUsageTracker.getExternallyConnectableConfig();
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
        const best = evaluateMatches(sourceFrameConstraint === null || sourceFrameConstraint === void 0 ? void 0 : sourceFrameConstraint.matches);
        return {
            constraintKind: "CONTENT_SCRIPT_MATCHES",
            severity: best.level,
            severityReason: best.reason,
            severityEvidence: best.evidence,
        };
    }
    return {
        constraintKind: "UNKNOWN",
        severity: RANK_TO_LEVEL[1],
        severityReason: "Unable to locate content_scripts or externally_connectable constraints.",
        severityEvidence: [],
    };
}
