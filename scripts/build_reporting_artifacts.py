"""Build auditable vulnerability reports and reporting manifests.

The script consumes the curated 337-extension Ground Truth file.  It writes
compact reports and indexes; it does not copy large CRX/XPI or unpacked trees.
All local evidence is referenced by path and by the source file/line recorded
in the Ground Truth data.
"""

from __future__ import annotations

import argparse
import json
import os
import re
from collections import Counter
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

import requests

EMAIL_RE = re.compile(r"[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}", re.I)
PROXY = "http://127.0.0.1:7897"
PROXIES = {"http": PROXY, "https": PROXY}
UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/131 Safari/537.36"


def now() -> str:
    return datetime.now(timezone.utc).replace(microsecond=0).isoformat().replace("+00:00", "Z")


def load(path: Path) -> Any:
    return json.loads(path.read_text(encoding="utf-8-sig"))


def write_json(path: Path, value: Any) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    tmp = path.with_name(path.name + ".tmp")
    tmp.write_text(json.dumps(value, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    tmp.replace(path)


def safe(value: str) -> str:
    return re.sub(r"[^A-Za-z0-9._@-]", "_", str(value))


def first_email(value: Any) -> str | None:
    if isinstance(value, str):
        hit = EMAIL_RE.search(value)
        return hit.group(0) if hit else None
    if isinstance(value, dict):
        for v in value.values():
            hit = first_email(v)
            if hit:
                return hit
    if isinstance(value, list):
        for v in value:
            hit = first_email(v)
            if hit:
                return hit
    return None


def firefox_contact(extension_id: str) -> dict[str, Any]:
    url = f"https://addons.mozilla.org/api/v5/addons/addon/{requests.utils.quote(extension_id, safe='')}/?lang=en-US"
    try:
        r = requests.get(url, headers={"User-Agent": UA}, proxies=PROXIES, timeout=(20, 60))
        r.raise_for_status()
        record = r.json()
        email = first_email(record.get("support_email"))
        if not email:
            email = first_email(record.get("guid"))
        urls = []
        for key in ("homepage", "support_url"):
            val = record.get(key)
            if isinstance(val, dict):
                val = val.get("url") or val
            if isinstance(val, dict):
                val = next(iter(val.values()), None)
            if isinstance(val, str):
                urls.append(val)
        return {
            "status": "found" if email else "missing",
            "email": email.lower() if email else None,
            "source": "Mozilla Add-ons API support_email" if email else "Mozilla Add-ons API",
            "contact_urls": urls,
            "store_url": record.get("url"),
        }
    except Exception as exc:  # contact discovery must not stop report generation
        return {"status": "lookup_failed", "email": None, "source": "Mozilla Add-ons API", "error": str(exc)}


def source_dirs(root: Path, extension: dict[str, Any]) -> list[Path]:
    result: list[Path] = []
    top = root / "ExPGuard-Data" / "Top5000"
    for report in extension.get("flows", [{}])[0].get("reports", []) if extension.get("flows") else []:
        tool = report.get("tool") or report.get("tool_label")
        if not tool:
            continue
        for candidate in (top / tool / extension["platform"] / "extensions", top / tool / extension["platform"]):
            if not candidate.is_dir():
                continue
            prefix = f"{extension['extension_id']}_{extension['version']}"
            result.extend(p for p in candidate.glob(prefix) if p.is_dir())
    return list(dict.fromkeys(result))


def contact_for(root: Path, extension: dict[str, Any], fetch_firefox: bool) -> dict[str, Any]:
    eid = extension["extension_id"]
    if extension["platform"] == "firefox" and fetch_firefox:
        result = firefox_contact(eid)
        if result.get("email"):
            return result
    direct = first_email(eid)
    if direct:
        return {"status": "found", "email": direct.lower(), "source": "extension identifier"}
    hits: list[str] = []
    paths: list[str] = []
    # Do not recursively scan unpacked extension trees here: a single MV3
    # extension can contain tens of thousands of files.  Contact extraction
    # is limited to small, conventional metadata files at the source root.
    for d in source_dirs(root, extension):
        candidates = []
        for name in ("manifest.json", "README", "README.md", "package.json", "metadata.json"):
            candidate = d / name
            if candidate.is_file():
                candidates.append(candidate)
        for path in candidates:
            if path.stat().st_size > 2_000_000:
                continue
            try:
                text = path.read_text(encoding="utf-8", errors="ignore")
            except OSError:
                continue
            for hit in EMAIL_RE.findall(text):
                if hit.lower() not in {x.lower() for x in hits}:
                    hits.append(hit)
                    paths.append(str(path))
    if hits:
        return {"status": "found", "email": hits[0].lower(), "source": "extension source/manifest", "evidence_path": paths[0]}
    return {"status": "missing", "email": None, "source": "No reliable public email found"}


def endpoint(flow: dict[str, Any], key: str) -> dict[str, Any]:
    item = flow.get("flow", {}).get(key) if isinstance(flow.get("flow"), dict) else None
    if not isinstance(item, dict):
        # Ground Truth entries wrap the original tool flow in reports[].flow.
        for report in flow.get("reports", []):
            candidate = report.get("flow", {}).get(key) if isinstance(report.get("flow"), dict) else None
            if isinstance(candidate, dict):
                item = candidate
                break
    if not isinstance(item, dict):
        item = {}
    return {k: item.get(k) for k in ("type", "kind", "remark", "file", "loc", "url_taint_control", "code_preview") if item.get(k) is not None}


def all_assessments(flow: dict[str, Any]) -> list[dict[str, Any]]:
    return list((flow.get("version_update_assessment") or {}).get("tool_assessments") or [])


def include_extension(ext: dict[str, Any], include_updated: bool) -> tuple[bool, str]:
    status = (ext.get("latest_version_check") or {}).get("status")
    if status == "same_version":
        return True, "version_unchanged"
    if status != "version_changed" or not include_updated:
        return False, "excluded"
    usable = []
    for flow in ext.get("flows", []):
        assessment = (flow.get("version_update_assessment") or {}).get("status")
        if assessment in {"still_detected", "mixed_tool_outcome", "partial_tool_failure"}:
            usable.append(flow)
    return bool(usable), "updated_still_detected" if usable else "excluded"


def severity_for(flow: dict[str, Any]) -> str:
    values = []
    for report in flow.get("reports", []):
        f = report.get("flow") or {}
        if f.get("severity"):
            values.append(str(f["severity"]).upper())
    order = {"CRITICAL": 4, "HIGH": 3, "MEDIUM": 2, "LOW": 1}
    return max(values, key=lambda x: order.get(x, 0), default="HIGH")


SUBJECT_LABELS = {
    "Arbitrary File Download": "Arbitrary File Download",
    "Cross-Site Request Forgery (CSRF) / Privileged Network Request": "CSRF via Privileged Network Request",
    "Storage Poisoning": "Extension Storage Poisoning",
    "Telemetry Identity Injection via Extension Storage": "Telemetry Identity Injection",
    "Untrusted Access-Key Injection into Extension Storage": "Page-Controlled Access-Key Injection",
    "Sensitive Data Exposure": "Sensitive Data Exposure",
    "Unauthorized Cookie Manipulation": "Unauthorized Cookie Modification",
    "Unauthorized Tab or Window Manipulation": "Unauthorized Tab/Window Control",
    "Unauthorized Browser Policy Modification": "Unauthorized Browser Policy Change",
    "Unauthorized Extension State Modification": "Unauthorized Extension State Change",
    "Privilege Escalation": "Privilege Escalation",
}


def representative_flow(flow: dict[str, Any]) -> dict[str, Any]:
    for report in flow.get("reports", []):
        candidate = report.get("flow")
        if isinstance(candidate, dict):
            return candidate
    return flow.get("flow") if isinstance(flow.get("flow"), dict) else {}


def manual_validation_for(flow: dict[str, Any]) -> dict[str, Any]:
    for report in flow.get("reports", []):
        record = report.get("flow") if isinstance(report.get("flow"), dict) else {}
        item = record.get("manual_validation") or report.get("manual_validation")
        if isinstance(item, dict) and item:
            return item
    item = representative_flow(flow).get("manual_validation")
    return item if isinstance(item, dict) else {}


def vulnerability_label(flow: dict[str, Any]) -> str:
    record = representative_flow(flow)
    flow_type = str(record.get("flow_type") or "").upper()
    sink_type = str((record.get("sink") or {}).get("type") or "").upper()
    source_remark = str((record.get("source") or {}).get("remark") or "").lower()
    sink_remark = str((record.get("sink") or {}).get("remark") or "").lower()
    if "access_key" in source_remark or "accesskey" in sink_remark:
        return "Untrusted Access-Key Injection into Extension Storage"
    if "posthog_distinct_id" in sink_remark:
        return "Telemetry Identity Injection via Extension Storage"
    if flow_type in {"STORAGE_POSOING", "STORAGE_POISONING"} or "STORAGE" in sink_type:
        return "Storage Poisoning"
    if flow_type == "REQUEST_FORGERY" or sink_type in {"FETCH_RESOURCE", "FETCH_BODY", "FETCH_HEADERS", "WEBSOCKET_URL", "WEBSOCKET_DATA", "XML_HTTP_REQUEST_OPEN", "XML_HTTP_REQUEST_SEND"}:
        return "Cross-Site Request Forgery (CSRF) / Privileged Network Request"
    if flow_type == "DATA_LEAK":
        return "Sensitive Data Exposure"
    if sink_type in {"CHROME_DOWNLOADS_OPTIONS"}:
        return "Arbitrary File Download"
    if sink_type in {"CHROME_COOKIES_SET_OPTIONS", "CHROME_COOKIES_REMOVE_OPTIONS"}:
        return "Unauthorized Cookie Manipulation"
    if sink_type in {"CHROME_TABS_CREATE_OPTIONS", "CHROME_TABS_UPDATE_OPTIONS", "CHROME_WINDOWS_CREATE_OPTIONS", "CHROME_WINDOWS_UPDATE_OPTIONS"}:
        return "Unauthorized Tab or Window Manipulation"
    if sink_type in {"CHROME_DECLARATIVENETREQUEST_RULES", "CHROME_CONTENTSETTINGS_SET"}:
        return "Unauthorized Browser Policy Modification"
    if sink_type in {"CHROME_MANAGEMENT_SETENABLED_ID"}:
        return "Unauthorized Extension State Modification"
    return "Privilege Escalation"


def vulnerability_types(flows: list[dict[str, Any]]) -> list[str]:
    order = [
        "Arbitrary File Download", "Cross-Site Request Forgery (CSRF) / Privileged Network Request",
        "Storage Poisoning", "Telemetry Identity Injection via Extension Storage",
        "Untrusted Access-Key Injection into Extension Storage", "Sensitive Data Exposure", "Unauthorized Cookie Manipulation",
        "Unauthorized Tab or Window Manipulation", "Unauthorized Browser Policy Modification",
        "Unauthorized Extension State Modification", "Privilege Escalation",
    ]
    found = {vulnerability_label(flow) for flow in flows}
    return [item for item in order if item in found]


def endpoint_text(item: dict[str, Any]) -> str:
    kind = item.get("type") or item.get("kind") or "unknown API"
    detail = item.get("remark") or ""
    location = f" in {item['file']} at {item['loc']}" if item.get("file") and item.get("loc") else ""
    return f"`{kind}`{(' (' + detail + ')') if detail else ''}{location}"


def poc_for(flow: dict[str, Any]) -> str:
    record = representative_flow(flow)
    manual = manual_validation_for(flow)
    payloads = manual.get("payloads") if isinstance(manual, dict) else None
    if isinstance(payloads, list):
        for payload in payloads:
            if isinstance(payload, dict) and payload.get("code"):
                language = payload.get("language") or "js"
                return f"```{language}\n{payload['code'].strip()}\n```"
    source = endpoint(flow, "source")
    source_type = str(source.get("type") or source.get("kind") or "").upper()
    if "MESSAGE" in source_type or "POSTMESSAGE" in source_type:
        return """```js
// Use only a harmless marker in a disposable profile.
window.postMessage({ marker: "EXPGuard_test_marker" }, "*");
```"""
    if "CUSTOM_EVENT" in source_type or source_type == "CUSTOM_EVENT":
        return """```js
// Replace EVENT_NAME and the documented field names with the handler's
// public event contract. Do not use real URLs, tokens, or credentials.
document.dispatchEvent(new CustomEvent("EVENT_NAME", {
  detail: { marker: "EXPGuard_test_marker" }
}));
```"""
    if "ONMESSAGEEXTERNAL" in source_type or "EXTERNAL_MESSAGE" in source_type:
        return """```js
// From a disposable companion extension only; use a harmless marker.
chrome.runtime.sendMessage("TARGET_EXTENSION_ID", {
  marker: "EXPGuard_test_marker"
});
```"""
    if "COOKIE" in source_type:
        reasoning = str((record.get("static") or {}).get("reasoning") or "")
        cookie_match = re.search(r"[\"`]([^\"`\n]+)[\"`]\s*!==\s*M\.slice", reasoning)
        cookie_name = cookie_match.group(1) if cookie_match else "<the exact cookie name used by the extension>"
        return """```js
// Run on a disposable page matching the extension's content-script pattern.
// The value is a harmless test marker, not a real account identifier.
const cookieValue = encodeURIComponent(JSON.stringify({
  distinct_id: "EXPGuard_test_marker"
}));
document.cookie = "COOKIE_NAME=" + cookieValue + "; path=/";
// Reload the page or trigger the extension's normal feature flow.
```""".replace("COOKIE_NAME", cookie_name)
    if "ELEMENT" in source_type or "VALUE" in source_type:
        source_remark = str(source.get("remark") or "").lower()
        if "access_key" in source_remark or "accesskey" in source_remark:
            return """```js
// Run on a page matching the extension's content-script URL pattern.
// This is a harmless marker, not a real access key.
const input = document.createElement("input");
input.id = "access_key";
input.value = "EXPGuard_test_marker";
document.body.appendChild(input);
```"""
        return """```js
const input = document.getElementById("access_key") || document.querySelector("input");
if (input) {
  input.value = "EXPGuard_test_marker";
  input.dispatchEvent(new Event("input", { bubbles: true }));
}
```"""
    return """```text
Deliver the benign marker EXPGuard_test_marker through the source shown in
the finding, then observe whether it reaches the privileged sink.
```"""


def recommendations_for(labels: list[str]) -> list[str]:
    recommendations = []
    if "Cross-Site Request Forgery (CSRF) / Privileged Network Request" in labels:
        recommendations.extend([
            "Authenticate page-to-extension events at the privilege boundary; validate the sender and origin instead of trusting DOM event detail.",
            "Validate the request schema and restrict destination URLs, methods, headers, and bodies before issuing privileged network requests.",
        ])
    if any(label in labels for label in ("Storage Poisoning", "Telemetry Identity Injection via Extension Storage", "Untrusted Access-Key Injection into Extension Storage")):
        recommendations.append("Do not let page-controlled cookies or DOM values select extension-owned storage values; validate the expected value and keep credentials in extension-owned UI/state.")
    if "Storage Poisoning" in labels:
        recommendations.append("Treat storage writes as privileged state changes: use an allowlisted schema, reject attacker-controlled keys, and avoid merging untrusted objects into extension state.")
    if "Telemetry Identity Injection via Extension Storage" in labels:
        recommendations.append("Generate or retrieve the analytics identifier in extension-owned state; do not use a page-set cookie as the authority for the extension's telemetry identity.")
    if "Sensitive Data Exposure" in labels:
        recommendations.append("Never return sensitive extension data to an untrusted page or external sender; enforce an explicit origin and sender allowlist.")
    if "Arbitrary File Download" in labels:
        recommendations.append("Restrict download URLs and filenames, and require a visible user gesture before starting downloads.")
    if "Unauthorized Cookie Manipulation" in labels:
        recommendations.append("Restrict cookie operations to the minimum host and cookie scope, and reject values supplied by untrusted page content.")
    if any("Tab or Window" in label for label in labels):
        recommendations.append("Validate tab/window IDs and navigation targets, and require a user gesture for externally initiated changes.")
    recommendations.append("Reduce host permissions and sensitive API access to the smallest scope required by the feature.")
    return list(dict.fromkeys(recommendations))


def subject_for(ext: dict[str, Any], flows: list[dict[str, Any]]) -> str:
    labels = vulnerability_types(flows)
    if len(labels) == 1:
        phrase = SUBJECT_LABELS.get(labels[0], labels[0])
    elif len(labels) == 2:
        phrase = f"{SUBJECT_LABELS.get(labels[0], labels[0])} and {SUBJECT_LABELS.get(labels[1], labels[1])}"
    else:
        phrase = ", ".join(SUBJECT_LABELS.get(x, x) for x in labels[:2]) + ", and other reported issues"
    severity_order = {"CRITICAL": 4, "HIGH": 3, "MEDIUM": 2, "LOW": 1}
    severity = max((severity_for(flow) for flow in flows), key=lambda value: severity_order.get(value, 0), default="HIGH")
    return f"Security Vulnerability Report: {severity.title()} {phrase} in {ext.get('name') or ext['extension_id']}"


def constraint_matches(source: dict[str, Any]) -> list[str]:
    constraint = source.get("constraint") or {}
    matches = constraint.get("matches") if isinstance(constraint, dict) else None
    if not matches:
        for frame in source.get("frames", []):
            item = frame.get("constraint") or {}
            matches = item.get("matches") if isinstance(item, dict) else None
            if matches:
                break
    return [str(x) for x in matches or []]


def finding_description(flow: dict[str, Any]) -> str:
    record = representative_flow(flow)
    source = endpoint(flow, "source")
    sink = endpoint(flow, "sink")
    source_type = str(source.get("type") or source.get("kind") or "").upper()
    sink_type = str(sink.get("type") or sink.get("kind") or "").upper()
    sink_remark = str(sink.get("remark") or "")
    matches = constraint_matches(record.get("source") or {})
    scope = f"on pages matching `{', '.join(matches)}`" if matches else "in the recorded source context"
    if "DOCUMENT_COOKIE" in source_type and "LOCAL_STORAGE" in sink_type and "posthog" in sink_remark.lower():
        reasoning = str((record.get("static") or {}).get("reasoning") or "")
        cookie = re.search(r'"([^"\n]+)"\s*!==\s*M\.slice', reasoning)
        cookie_text = f"the `{cookie.group(1)}` cookie" if cookie else "a page-controlled cookie"
        return (f"The content script {scope} reads {cookie_text}, parses its JSON `distinct_id`, and writes that value to "
                "`chrome.storage.local` as `posthog_distinct_id`. A page that can set the cookie can therefore choose the "
                "extension's telemetry identity. This demonstrates telemetry identity/state injection; the recorded Flow "
                "does not by itself show account access or account takeover.")
    if "ELEMENT_VALUE" in source_type and "STORAGE" in sink_type and "accesskey" in sink_remark.lower():
        return (f"The content script {scope} reads the value of the page DOM element `#access_key` and stores it as "
                "`accessKey` in `chrome.storage.sync`. A page script can create or change that element before the extension "
                "reads it, so page-controlled data enters extension-managed credential/configuration state. This Flow "
                "establishes storage injection; it does not establish that a real credential was disclosed or used.")
    if "CUSTOM_EVENT" in source_type and sink_type == "FETCH_RESOURCE":
        page_scope = f"matching `{', '.join(matches)}`" if matches else "covered by the extension's content script"
        return (f"A script running on a page {page_scope} can dispatch the recorded DOM custom event and supply its `detail`. "
                "The content script forwards that event data to the extension runtime, and the service worker uses the "
                "supplied URL and form data in a privileged POST `fetch`. The report records no origin/authentication "
                "check at this bridge. This permits a matching page to initiate the recorded request; it does not by "
                "itself establish that third-party credentials are included.")
    if "ONMESSAGEEXTERNAL" in source_type or "EXTERNAL_MESSAGE" in source_type:
        actor = "An external extension able to message this extension"
    elif "MESSAGE" in source_type or "POSTMESSAGE" in source_type or "CUSTOM_EVENT" in source_type:
        actor = "A page or sender able to reach the recorded message/event source"
    else:
        actor = "Input reaching the recorded source"
    return (f"The Ground Truth record traces {actor} from {endpoint_text(source)} to the privileged sink "
            f"{endpoint_text(sink)}. The source scope is {scope}. The reported issue is that this data reaches the "
            "extension capability at the sink; the concrete effect is limited to the operation shown by that API and "
            "the extension's runtime permissions.")


def analysis_evidence(flow: dict[str, Any]) -> list[str]:
    lines: list[str] = []
    dynamic_record_found = False
    for report in flow.get("reports", []):
        label = report.get("tool_label") or report.get("tool") or "Analysis tool"
        record = report.get("flow") if isinstance(report.get("flow"), dict) else {}
        static = record.get("static") or report.get("static") or {}
        dynamic = record.get("dynamic_detail") or report.get("dynamic_detail") or {}
        if static:
            verdict = static.get("verdict")
            conf = static.get("confidence")
            result = f"verdict `{verdict}`" if verdict else "recorded this source-to-sink path"
            if conf is not None:
                result += f", confidence {conf}"
            lines.append(f"- Static ({label}): {result}; report `{static.get('path', 'not recorded')}`.")
        if dynamic:
            dynamic_record_found = True
            outcome = str(dynamic.get("outcome") or "UNKNOWN")
            basis = dynamic.get("basis")
            stage = dynamic.get("evidence_stage")
            reasoning = str(dynamic.get("reasoning") or "").lower()
            details = []
            if basis:
                details.append(f"basis `{basis}`")
            if stage:
                details.append(f"evidence stage `{stage}`")
            if outcome == "CONFIRMED" and dynamic.get("reproduced"):
                note = "runtime reproduction recorded"
            elif outcome == "EXTERNAL_CONDITION_REQUIRED":
                note = "a sender-side precondition was recorded; this is not an unconditional runtime reproduction"
            elif outcome == "INCONCLUSIVE_AFTER_DEBUG":
                note = "the dynamic run did not establish a decisive runtime result"
                if "exceeded its 30s budget" in reasoning or "exceeded its 30s" in reasoning or "exceeded its 30-second" in reasoning:
                    note = "the dynamic agent exceeded its 30-second budget, so this run did not establish a decisive runtime result"
                elif "sink" in reasoning and ("not hit" in reasoning or "did not" in reasoning):
                    note = "the recorded replay did not hit the exact sink; this run is inconclusive and is not a runtime confirmation"
            elif outcome in {"TOOL_LIMITATION", "SETUP_INCOMPLETE", "ERROR", "NOT_ATTEMPTED", "DEFERRED_COMPANION_EXTENSION", "PRECONDITION_UNMET"}:
                note = "this result does not independently confirm execution at the sink"
            elif outcome in {"SINK_NOT_FIRED", "NOT_REPRODUCED", "PARTIAL"}:
                note = "the recorded replay did not establish the complete source-to-sink effect"
            else:
                note = "see the recorded dynamic result"
            suffix = f" ({'; '.join(details)})" if details else ""
            lines.append(f"- Dynamic ({label}): `{outcome}`{suffix}; {note}; report `{dynamic.get('path', 'not recorded')}`.")
    if not dynamic_record_found:
        lines.append("- Dynamic: no structured dynamic-verification result is attached to this Flow in the Ground Truth dataset.")
    manual = representative_flow(flow).get("manual_validation") or {}
    if isinstance(manual, dict) and manual:
        verdict = manual.get("verdict") or manual.get("status") or "recorded"
        result = manual.get("result") if isinstance(manual.get("result"), dict) else {}
        observed = result.get("observed_effect")
        if observed == "用户人工验证确认该 Flow 可达并产生对应特权效果。":
            observed = "the dataset records manual confirmation that this Flow is reachable and produces its associated privileged effect"
        lines.append(f"- Manual review: Ground Truth records `{verdict}`" + (f" — {observed}" if observed else "") + ".")
    else:
        lines.append("- Manual review: no structured manual-validation record is present for this Flow in the dataset.")
    return lines


def reproduction_steps(ext: dict[str, Any], flow: dict[str, Any]) -> list[str]:
    record = representative_flow(flow)
    source = endpoint(flow, "source")
    source_type = str(source.get("type") or source.get("kind") or "").upper()
    sink = endpoint(flow, "sink")
    sink_remark = str(sink.get("remark") or "")
    matches = constraint_matches(record.get("source") or {})
    scope = f"a disposable page matching `{', '.join(matches)}`" if matches else f"a disposable page in the affected {ext['platform']} profile"
    if "DOCUMENT_COOKIE" in source_type and "posthog" in sink_remark.lower():
        return [
            f"Install version `{ext['version']}` and open {scope}.",
            "Set the named PostHog cookie to a URL-encoded JSON value containing only `distinct_id: \"EXPGuard_test_marker\"` (use the payload below).",
            "Reload the page or wait for the content script's normal polling interval, then inspect extension local storage for `posthog_distinct_id`.",
        ]
    if "ELEMENT_VALUE" in source_type and "accesskey" in sink_remark.lower():
        return [
            f"Install version `{ext['version']}` and open {scope}.",
            "Before the content script reads the page, add the `#access_key` input with the benign marker shown below.",
            "Inspect extension sync storage for `accessKey`; the stored value should match the page-controlled marker.",
        ]
    if "CUSTOM_EVENT" in source_type and str(sink.get("type") or "").upper() == "FETCH_RESOURCE":
        return [
            f"Install version `{ext['version']}` in a disposable {ext['platform']} profile and open any HTTP(S) page covered by the extension content script.",
            "Start a local test server bound only to `127.0.0.1` that records POST requests, then run the payload below in that page's console.",
            "Verify whether the local server receives the marker POST; do not substitute a third-party or internal-network URL.",
        ]
    return [
        f"Install and enable version `{ext['version']}` in a disposable {ext['platform']} profile.",
        "Deliver the harmless marker through the source described below.",
        "Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.",
    ]


def render_report(ext: dict[str, Any], flows: list[dict[str, Any]], report_class: str, contact: dict[str, Any]) -> str:
    check = ext.get("latest_version_check") or {}
    updated = check.get("status") == "version_changed"
    labels = vulnerability_types(flows)
    title = subject_for(ext, flows)
    lines = [
        f"# {title}", "",
        "## Summary", "",
        f"We are writing on behalf of a security research team from Nankai University and the University of Liverpool. "
        f"Our Ground Truth review identified **{len(flows)} Flow(s)** in **{ext.get('name') or ext['extension_id']}** "
        f"({ext['platform']}, extension ID `{ext['extension_id']}`, version `{ext['version']}`).",
        f"The recorded issue type(s): **{'; '.join(SUBJECT_LABELS.get(x, x) for x in labels)}**.",
    ]
    if updated:
        lines += ["", f"The store currently reports version `{check.get('version')}`. The update revalidation is summarized per tool below. This report covers only the original Flow(s); newly introduced Flow(s) are out of scope. Any mixed result, tool failure, or incomplete automated run is called out explicitly and should not be read as a final remediation determination."]
    lines += ["", "## Affected Extension Details", "", f"- Name: {ext.get('name') or 'unknown'}", f"- Platform: {ext['platform']}", f"- Extension ID: `{ext['extension_id']}`", f"- Dataset version: `{ext['version']}`", f"- Store version at review: `{check.get('version') or ext['version']}`", f"- Users: {((ext.get('catalog_metadata') or {}).get('user_count') or 'not recorded')}", f"- Analysis tools: {', '.join(sorted(set(t for f in flows for t in f.get('matched_tools', [])))) or 'see evidence below'}", ""]
    lines += ["## Findings", ""]
    for index, flow in enumerate(flows, 1):
        src, sink = endpoint(flow, "source"), endpoint(flow, "sink")
        label = vulnerability_label(flow)
        lines += [f"### Finding {index}: {label}", "", finding_description(flow), "", f"- Ground Truth Flow: `{flow.get('ground_truth_flow_id')}`", f"- Severity recorded by the analysis: **{severity_for(flow)}**", f"- Source: {endpoint_text(src)}", f"- Sink: {endpoint_text(sink)}", f"- Tools reporting this Flow: {', '.join(flow.get('matched_tools') or []) or 'not recorded'}"]
        for heading, endpoint_record in (("Source code anchor", src), ("Sink code anchor", sink)):
            preview = endpoint_record.get("code_preview")
            if preview:
                excerpt = str(preview).replace(">>>", "").replace("<<<", "")
                lines += ["", f"**{heading} (excerpt):**", "", "```javascript", excerpt, "```"]
        structural = representative_flow(flow).get("structural") or (flow.get("reports") or [{}])[0].get("flow", {}).get("structural") or {}
        if structural:
            lines += ["", f"- Privilege boundary recorded: `{structural.get('privilege_crossing')}` ({structural.get('constraint_kind')}); {structural.get('privilege_reason') or 'the sink grants a capability beyond the source origin.'}"]
        assessments = all_assessments(flow)
        if assessments:
            lines += ["", "#### Updated-version tool result", ""]
            for assessment in assessments:
                lines.append(f"- {assessment.get('tool')}: `{assessment.get('outcome')}`; original source `{assessment.get('original_source_type')}` → sink `{assessment.get('original_sink_type')}`; candidate matches: {assessment.get('candidate_match_count', 0)}")
        lines += ["", "#### Analysis and validation", "", *analysis_evidence(flow), "", "#### Steps to reproduce", "", "Use a disposable profile and a benign marker. Do not use real credentials or personal data.", ""]
        lines.extend(f"{step_no}. {step}" for step_no, step in enumerate(reproduction_steps(ext, flow), 1))
        lines += ["", "#### Proof-of-concept payload", "", poc_for(flow), "", "#### Supporting material", ""]
        for report in flow.get("reports", []):
            record = report.get("flow") if isinstance(report.get("flow"), dict) else {}
            lines.append(f"- {report.get('tool_label') or report.get('tool')}: source report `{report.get('source_report')}`; static report `{(record.get('static') or {}).get('path', 'not recorded')}`; dynamic report `{(record.get('dynamic_detail') or {}).get('path', 'not recorded')}`.")
        lines.append("")
    lines += ["", "## Recommendations", ""]
    for i, recommendation in enumerate(recommendations_for(labels), 1):
        lines.append(f"{i}. {recommendation}")
    impact = "The demonstrated impact is limited to the operation described in each finding and the extension's granted permissions. The evidence above distinguishes the recorded static path from any runtime result; it does not imply unrelated account compromise, data theft, or malware installation."
    lines += ["", "## Impact", "", impact]
    lines += ["", "## Disclosure Status", "", f"- Report class: `{report_class}`", "- This report covers only the listed Ground Truth Flow(s). Newly introduced Flow(s) are outside scope.", f"- Contact discovery: `{contact.get('status')}` ({contact.get('source')})", "", "Please contact us so that we can coordinate remediation and retest the affected Flow(s).", "", "Regards,", "Xin Yang", "Nankai University / University of Liverpool", ""]
    return "\n".join(lines)


def main() -> int:
    root = Path(__file__).resolve().parents[1]
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--dataset", type=Path, default=root / "datasets" / "ground-truth-dataset-780.json")
    parser.add_argument("--output", type=Path, default=root / "datasets" / "reporting")
    parser.add_argument("--no-firefox-contact-lookup", action="store_true")
    args = parser.parse_args()
    dataset_path = args.dataset.resolve()
    out = args.output.resolve()
    dataset = load(dataset_path)
    repo_root = root.parent
    already_path = repo_root / "already.txt"
    already: set[tuple[str, str]] = set()
    if already_path.exists():
        for line in already_path.read_text(encoding="utf-8", errors="ignore").splitlines():
            parts = line.split()
            if len(parts) >= 2:
                already.add((parts[0].strip(), parts[1].strip()))
    reports_root = out / "reports"
    contacts: dict[str, Any] = {}
    ledger: list[dict[str, Any]] = []
    archive: list[dict[str, Any]] = []
    counts: Counter[str] = Counter()
    previous_ledger: dict[str, dict[str, Any]] = {}
    previous_ledger_path = out / "reporting-ledger.json"
    if previous_ledger_path.exists():
        try:
            previous_ledger = {item.get("key"): item for item in load(previous_ledger_path).get("entries", []) if item.get("key")}
        except (OSError, ValueError, TypeError):
            previous_ledger = {}
    for ext in dataset.get("extensions", []):
        status = (ext.get("latest_version_check") or {}).get("status")
        check = ext.get("latest_version_check") or {}
        # Keep an auditable compact archive index for delisted extensions and old versions.
        if status in {"delisted", "version_changed"}:
            archive.append({"platform": ext["platform"], "extension_id": ext["extension_id"], "version": ext["version"], "name": ext.get("name"), "lifecycle": "delisted" if status == "delisted" else "old_version", "source_roots": [str(p) for p in source_dirs(repo_root, ext)], "baseline_path": str(root / "datasets" / "updates" / "baseline" / ext["platform"] / f"{safe(ext['extension_id'])}_{safe(ext['version'])}") if status == "version_changed" else None, "flow_ids": [f.get("ground_truth_flow_id") for f in ext.get("flows", [])], "source_reports": sorted({r.get("source_report") for f in ext.get("flows", []) for r in f.get("reports", []) if r.get("source_report")})})
        include, report_class = include_extension(ext, include_updated=True)
        if not include:
            continue
        flows = []
        for flow in ext.get("flows", []):
            if status == "version_changed" and (flow.get("version_update_assessment") or {}).get("status") not in {"still_detected", "mixed_tool_outcome", "partial_tool_failure"}:
                continue
            flows.append(flow)
        if not flows:
            continue
        key = f"{ext['platform']}/{safe(ext['extension_id'])}_{safe(ext['version'])}"
        prior = previous_ledger.get(key)
        if prior and prior.get("developer_email") and prior.get("contact_status") == "found":
            contact = {"status": "found", "email": prior["developer_email"], "source": prior.get("developer_email_source") or "previous reporting ledger"}
        else:
            contact = contact_for(repo_root, ext, not args.no_firefox_contact_lookup)
        contacts[key] = {**contact, "platform": ext["platform"], "extension_id": ext["extension_id"], "version": ext["version"], "name": ext.get("name"), "store_version": check.get("version")}
        report_dir = reports_root / ext["platform"] / f"{safe(ext['extension_id'])}_{safe(ext['version'])}"
        report_dir.mkdir(parents=True, exist_ok=True)
        report_path = report_dir / "report.md"
        report_path.write_text(render_report(ext, flows, report_class, contact), encoding="utf-8")
        labels = vulnerability_types(flows)
        metadata = {"schema_version": "1.0", "generated_at_utc": now(), "platform": ext["platform"], "extension_id": ext["extension_id"], "version": ext["version"], "name": ext.get("name"), "report_class": report_class, "flow_count": len(flows), "flow_ids": [f.get("ground_truth_flow_id") for f in flows], "vulnerability_types": labels, "subject": subject_for(ext, flows), "matched_tools": sorted({t for f in flows for t in f.get("matched_tools", [])}), "contact_key": key, "contact": contact, "report_path": str(report_path), "already_disclosed": (ext["extension_id"], ext["version"]) in already, "email_eligible": contact.get("status") == "found" and (ext["extension_id"], ext["version"]) not in already, "source_evidence": sorted({p for f in flows for r in f.get("reports", []) for p in [r.get("source_report"), (r.get("static") or {}).get("path"), (r.get("dynamic_detail") or {}).get("path")] if p})}
        write_json(report_dir / "metadata.json", metadata)
        entry = {"key": key, "platform": ext["platform"], "extension_id": ext["extension_id"], "version": ext["version"], "name": ext.get("name"), "report_path": str(report_path), "report_generated": True, "report_class": report_class, "flow_count": len(flows), "vulnerability_types": labels, "subject": subject_for(ext, flows), "contact_status": contact.get("status"), "developer_email": contact.get("email"), "developer_email_source": contact.get("source"), "already_disclosed": metadata["already_disclosed"], "email_status": "already_disclosed" if metadata["already_disclosed"] else ("pending" if metadata["email_eligible"] else "missing_contact"), "email_message_id": None, "git_status": "pending", "git_commit": None, "email_body_inline": True, "report_revision": 1, "needs_resend": False}
        if prior:
            prior_status = prior.get("email_status")
            for field in ("email_message_id", "email_sent_at_utc", "smtp_host", "smtp_port", "email_error", "git_status", "git_commit", "email_revision", "previous_email_message_id", "previous_email_status"):
                if field in prior:
                    entry[field] = prior[field]
            entry["report_revision"] = int(prior.get("report_revision", 1)) + 1
            has_sent_record = bool(prior.get("email_sent_at_utc") or prior.get("email_message_id") or prior.get("previous_email_message_id"))
            if prior_status in {"sent", "pending_revised"} or has_sent_record:
                entry["previous_email_status"] = "sent"
                entry["previous_email_message_id"] = prior.get("email_message_id") or prior.get("previous_email_message_id")
                entry["email_status"] = "already_disclosed" if entry["already_disclosed"] else "pending_revised"
                entry["needs_resend"] = not entry["already_disclosed"]
            elif prior_status == "pending":
                entry["email_status"] = "pending"
            elif prior_status == "already_disclosed":
                entry["email_status"] = "already_disclosed"
            elif prior_status:
                entry["email_status"] = prior_status
        ledger.append(entry)
        counts[report_class] += 1
    write_json(out / "developer-contacts.json", {"generated_at_utc": now(), "proxy": PROXY, "contacts": contacts})
    write_json(out / "reporting-ledger.json", {"schema_version": "1.1", "generated_at_utc": now(), "fixed_cc": "wanpeng.li@liverpool.ac.uk", "sender": "Xin Yang <2120240775@mail.nankai.edu.cn>", "entries": ledger})
    write_json(out / "archive-index.json", {"schema_version": "1.0", "generated_at_utc": now(), "description": "Compact index for delisted extensions and old versions; source trees remain in the original dataset roots.", "entries": archive})
    (out / "README.md").write_text("""# Ground Truth reporting artifacts\n\nThis directory contains generated Markdown reports for all 161 same-version extension instances and updated-version Flows whose original source/sink pair was detected again by the revalidation run. `developer-contacts.json` records only public or directly encoded contacts. `reporting-ledger.json` is the send/Git audit ledger. `archive-index.json` records the 45 delisted instances and 131 old versions without duplicating large CRX/XPI or unpacked trees.\n\nUpdated-version entries with mixed tool outcomes or tool failures are clearly qualified in the report and require human review. New Flows in updated versions are out of scope.\n""", encoding="utf-8")
    print(json.dumps({"reports": len(ledger), "counts": counts, "archive_entries": len(archive), "contacts_found": sum(v.get("status") == "found" for v in contacts.values()), "output": str(out)}, ensure_ascii=False, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
