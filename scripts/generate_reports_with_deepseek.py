"""Generate disclosure-report narrative with the configured DeepSeek model.

The model writes only the report's short narrative sections. Extension identity,
Flow IDs, tool/static/dynamic/manual evidence, reproduction steps, code anchors,
and PoCs remain in the locally generated factual report and are not rewritten.
API credentials are read from the ExPAgent .env file and are never persisted.
"""

from __future__ import annotations

import argparse
import concurrent.futures
import hashlib
import json
import os
import re
import sys
import time
import uuid
from datetime import datetime, timezone
from pathlib import Path
from typing import Any
from urllib.parse import urlparse

import requests

import build_reporting_artifacts as report_builder


EXAMPLE_PATH = Path(r"D:\Ph0jav7\ExtensionSecurity\Report-Example.md")
ENV_PATH = Path(r"D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\.env")
LEDGER_RELATIVE = Path("datasets/reporting/reporting-ledger.json")

SYSTEM_PROMPT = """You are a careful browser-extension vulnerability disclosure report writing agent.
Use only the supplied reference report, factual baseline report, and structured evidence. Return one JSON object with exactly these keys: summary (string), findings (array of objects with flow_id and description strings), recommendations (array of strings), impact (string).

Write concise, professional English suitable for an extension developer. The report header already contains the extension name, ID, version, severity, and Flow count; do not repeat those fields or add user counts/statistics. The summary should be 1–2 sentences, at most 500 characters. Preserve the vulnerability's actual scope and preconditions. Do not invent attack prerequisites, APIs, affected users, severity, credentials, data access, account takeover, malware delivery, or exploit impact. Do not claim dynamic/runtime confirmation unless the evidence says outcome CONFIRMED and reproduced=true. A manual Ground Truth verdict and a dynamic verdict are separate facts. Do not claim that a failed or inconclusive dynamic run disproves a statically or manually confirmed Flow. Use the Flow IDs exactly as supplied. Describe only the listed original Flows; newly introduced Flows are out of scope. Keep each finding description to one paragraph and recommendations actionable and specific. Do not rewrite proof-of-concept code, reproduction steps, severity, or tool outcomes: those are preserved by the report generator. The impact should be one calibrated sentence of at most 450 characters. Return valid JSON only, without Markdown fences or extra commentary."""


def now() -> str:
    return datetime.now(timezone.utc).replace(microsecond=0).isoformat().replace("+00:00", "Z")


def digest(text: str) -> str:
    return hashlib.sha256(text.encode("utf-8")).hexdigest()


def read_json(path: Path) -> Any:
    return json.loads(path.read_text(encoding="utf-8-sig"))


def write_json(path: Path, value: Any) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    tmp = path.with_name(path.name + ".tmp")
    tmp.write_text(json.dumps(value, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    tmp.replace(path)


def read_env(path: Path) -> dict[str, str]:
    values: dict[str, str] = {}
    for line in path.read_text(encoding="utf-8-sig").splitlines():
        line = line.strip()
        if not line or line.startswith("#"):
            continue
        if line.startswith("export "):
            line = line[7:].lstrip()
        if "=" not in line:
            continue
        key, value = line.split("=", 1)
        value = value.strip()
        if len(value) >= 2 and value[0] == value[-1] and value[0] in "\"'":
            value = value[1:-1]
        values[key.strip()] = value
    return values


def setting(env: dict[str, str], name: str, *aliases: str, default: str = "") -> str:
    for key in (name, *aliases):
        value = env.get(key)
        if value:
            return value
    for key in (name, *aliases):
        value = os.getenv(key)
        if value:
            return value
    return default


def selected_cases(dataset: dict[str, Any], args: argparse.Namespace, root: Path) -> list[dict[str, Any]]:
    wanted = set(args.extension_id or [])
    cases: list[dict[str, Any]] = []
    for ext in dataset.get("extensions", []):
        include, report_class = report_builder.include_extension(ext, include_updated=True)
        if not include or (args.same_version_only and report_class != "version_unchanged"):
            continue
        flows = [
            flow for flow in ext.get("flows", [])
            if report_class != "updated_still_detected"
            or (flow.get("version_update_assessment") or {}).get("status")
            in {"still_detected", "mixed_tool_outcome", "partial_tool_failure"}
        ]
        if not flows:
            continue
        if wanted and ext.get("extension_id") not in wanted:
            continue
        key = f"{ext['platform']}/{report_builder.safe(ext['extension_id'])}_{report_builder.safe(ext['version'])}"
        report_path = root / "datasets" / "reporting" / "reports" / ext["platform"] / f"{report_builder.safe(ext['extension_id'])}_{report_builder.safe(ext['version'])}" / "report.md"
        agent_path = report_path.with_name("agent-generation.json")
        cases.append({"extension": ext, "flows": flows, "report_class": report_class, "key": key,
                      "report_path": report_path, "agent_path": agent_path})
    if wanted:
        found = {case["extension"]["extension_id"] for case in cases}
        absent = wanted - found
        if absent:
            raise ValueError("Requested extension ID(s) have no eligible report: " + ", ".join(sorted(absent)))
    return cases


def compact_packet(case: dict[str, Any], baseline: str) -> dict[str, Any]:
    ext, flows = case["extension"], case["flows"]
    compact_flows = []
    for flow in flows:
        representative = report_builder.representative_flow(flow)
        source = representative.get("source") or {}
        sink = representative.get("sink") or {}
        report_evidence = []
        for report in flow.get("reports", []):
            record = report.get("flow") if isinstance(report.get("flow"), dict) else {}
            static = record.get("static") or report.get("static") or {}
            dynamic = record.get("dynamic_detail") or report.get("dynamic_detail") or {}
            item: dict[str, Any] = {"tool": report.get("tool_label") or report.get("tool")}
            if static:
                item["static"] = {k: static.get(k) for k in ("verdict", "confidence", "report_disposition", "path") if static.get(k) is not None}
                if static.get("reasoning"):
                    item["static_reasoning_excerpt"] = str(static["reasoning"])[:1100]
            if dynamic:
                item["dynamic"] = {k: dynamic.get(k) for k in ("outcome", "final_verdict", "reproduced", "basis", "evidence_stage", "path") if dynamic.get(k) is not None}
                if dynamic.get("reasoning"):
                    item["dynamic_reasoning_excerpt"] = str(dynamic["reasoning"])[:450]
            report_evidence.append(item)
        manual = report_builder.manual_validation_for(flow)
        assessment = flow.get("version_update_assessment") or {}
        compact_flows.append({
            "flow_id": flow.get("ground_truth_flow_id"),
            "vulnerability_type": report_builder.vulnerability_label(flow),
            "severity": report_builder.severity_for(flow),
            "source_family": flow.get("source_family"),
            "sink_family": flow.get("sink_family"),
            "source": {k: source.get(k) for k in ("type", "kind", "remark", "file", "loc", "constraint", "code_preview") if source.get(k) is not None},
            "sink": {k: sink.get(k) for k in ("type", "kind", "remark", "file", "loc", "code_preview") if sink.get(k) is not None},
            "matched_tools": flow.get("matched_tools", []),
            "analysis_evidence": report_evidence,
            "manual_validation": {k: manual.get(k) for k in ("verdict", "status", "confidence", "vulnerability_summary") if manual.get(k) is not None},
            "updated_version_assessment": {k: assessment.get(k) for k in ("status", "tool_assessments") if assessment.get(k) is not None},
        })
    metadata_path = case["report_path"].with_name("metadata.json")
    metadata = read_json(metadata_path) if metadata_path.is_file() else {}
    return {
        "extension": {k: ext.get(k) for k in ("name", "platform", "extension_id", "version", "rank", "catalog_metadata", "latest_version_check") if ext.get(k) is not None},
        "report_class": case["report_class"],
        "report_subject": metadata.get("subject"),
        "flow_count": len(flows),
        "flows": compact_flows,
        "existing_factual_report": baseline,
    }


def parse_json_response(content: str) -> dict[str, Any]:
    text = content.strip()
    match = re.fullmatch(r"```(?:json)?\s*(.*?)\s*```", text, flags=re.S | re.I)
    if match:
        text = match.group(1)
    if not text.startswith("{"):
        start, end = text.find("{"), text.rfind("}")
        if start >= 0 and end > start:
            text = text[start:end + 1]
    value = json.loads(text)
    if not isinstance(value, dict):
        raise ValueError("DeepSeek response was not a JSON object")
    return value


def validate_narrative(value: dict[str, Any], flows: list[dict[str, Any]]) -> dict[str, Any]:
    if set(value) != {"summary", "findings", "recommendations", "impact"}:
        raise ValueError("DeepSeek response did not match the expected JSON schema")
    if not isinstance(value["summary"], str) or not value["summary"].strip() or len(value["summary"]) > 700:
        raise ValueError("DeepSeek summary was empty or too long")
    if not isinstance(value["impact"], str) or not value["impact"].strip() or len(value["impact"]) > 650:
        raise ValueError("DeepSeek impact was empty or too long")
    recs = value["recommendations"]
    if not isinstance(recs, list) or not 1 <= len(recs) <= 6 or any(not isinstance(x, str) or not x.strip() or len(x) > 350 for x in recs):
        raise ValueError("DeepSeek recommendations did not match the expected schema")
    expected_ids = {flow.get("ground_truth_flow_id") for flow in flows}
    generated = value["findings"]
    if not isinstance(generated, list) or len(generated) != len(expected_ids):
        raise ValueError("DeepSeek omitted or added a finding")
    mapped = {}
    for finding in generated:
        if not isinstance(finding, dict) or set(finding) != {"flow_id", "description"}:
            raise ValueError("DeepSeek finding did not match the expected schema")
        flow_id, description = finding["flow_id"], finding["description"]
        if flow_id not in expected_ids or flow_id in mapped:
            raise ValueError("DeepSeek changed, duplicated, or added a Flow ID")
        if not isinstance(description, str) or not description.strip() or "\n" in description.strip() or len(description) > 1000:
            raise ValueError("DeepSeek finding description was empty, multi-paragraph, or too long")
        mapped[flow_id] = description.strip()
    if set(mapped) != expected_ids:
        raise ValueError("DeepSeek finding IDs did not match the Ground Truth Flow IDs")
    return {"summary": value["summary"].strip(), "findings": mapped,
            "recommendations": [item.strip() for item in recs], "impact": value["impact"].strip()}


def update_report(baseline: str, case: dict[str, Any], narrative: dict[str, Any]) -> str:
    ext, flows = case["extension"], case["flows"]
    name = ext.get("name") or ext["extension_id"]
    labels = report_builder.vulnerability_types(flows)
    intro = (
        "We are writing on behalf of a security research team from Nankai University and the University of Liverpool. "
        f"Our Ground Truth review identified **{len(flows)} Flow(s)** in **{name}** "
        f"({ext['platform']}, extension ID `{ext['extension_id']}`, version `{ext['version']}`).\n\n"
        f"The recorded issue type(s): **{'; '.join(report_builder.SUBJECT_LABELS.get(x, x) for x in labels)}**.\n\n"
        f"{narrative['summary']}"
    )
    old_summary = re.search(r"(?ms)^## Summary\s*\n\n(.*?)(?=^## )", baseline)
    if old_summary:
        update_note = next((line for line in old_summary.group(1).splitlines() if line.startswith("The store currently reports version")), None)
        if update_note:
            intro += "\n\n" + update_note
        baseline = baseline[:old_summary.start(1)] + intro + "\n\n" + baseline[old_summary.end(1):]
    for index, flow in enumerate(flows, 1):
        flow_id = flow.get("ground_truth_flow_id")
        pattern = re.compile(rf"(?ms)(^### Finding {index}: [^\n]+\n\n)(.*?)(?=\n- Ground Truth Flow: `{re.escape(str(flow_id))}`)")
        match = pattern.search(baseline)
        if not match:
            raise ValueError(f"Could not locate the baseline section for {flow_id}")
        baseline = baseline[:match.start(2)] + narrative["findings"][flow_id] + baseline[match.end(2):]
    recs = "\n".join(f"{i}. {text}" for i, text in enumerate(narrative["recommendations"], 1))
    rec_pattern = re.compile(r"(?ms)(^## Recommendations\s*\n\n).*?(?=^## )")
    baseline, rec_count = rec_pattern.subn(lambda m: m.group(1) + recs + "\n\n", baseline, count=1)
    if rec_count != 1:
        raise ValueError("Could not replace the Recommendations section")
    impact_pattern = re.compile(r"(?ms)(^## Impact\s*\n\n).*?(?=^## )")
    baseline, impact_count = impact_pattern.subn(lambda m: m.group(1) + narrative["impact"] + "\n\n", baseline, count=1)
    if impact_count != 1:
        raise ValueError("Could not replace the Impact section")
    if "Xin Yang" not in baseline or report_builder.subject_for(ext, flows) not in baseline.splitlines()[0]:
        raise ValueError("Report title or English signature was lost during composition")
    for flow in flows:
        if flow.get("ground_truth_flow_id") not in baseline:
            raise ValueError("A Ground Truth Flow ID was lost during composition")
        if "INCONCLUSIVE_AFTER_DEBUG" in json.dumps(flow, ensure_ascii=False) and "INCONCLUSIVE_AFTER_DEBUG" not in baseline:
            raise ValueError("An inconclusive dynamic outcome was omitted")
    return baseline


def make_user_prompt(packet: dict[str, Any], example: str) -> str:
    return (
        "Write only the four narrative fields in the required JSON schema. The Report-Example below sets structure and tone, "
        "but any incident details in it belong to another extension and must not be copied. The factual baseline report and "
        "structured Flow evidence below describe this extension and are authoritative. Preserve all stated limits.\n\n"
        "REPORT EXAMPLE (style reference only):\n" + example[:7000] +
        "\n\nSTRUCTURED FACTS AND CURRENT REPORT:\n" + json.dumps(packet, ensure_ascii=False, separators=(",", ":"))
    )


def request_narrative(case: dict[str, Any], env: dict[str, str], example: str, session_id: str) -> tuple[dict[str, Any], str]:
    api_key = setting(env, "DEEPSEEK_API_KEY")
    base_url = setting(env, "DEEPSEEK_BASE_URL", "DEEPSEEK_API_BASE", default="https://api.deepseek.com/v1").rstrip("/")
    model = setting(env, "DEEPSEEK_MODEL", default="deepseek-chat")
    timeout = int(setting(env, "EXPAGENT_LLM_TIMEOUT", default="180"))
    max_retries = max(0, int(setting(env, "EXPAGENT_LLM_MAX_RETRIES", default="2")))
    if not api_key:
        raise ValueError("DeepSeek API key was not configured in the specified .env file")
    endpoint = base_url if base_url.endswith("/chat/completions") else base_url + "/chat/completions"
    parsed = urlparse(base_url)
    headers = {"Authorization": f"Bearer {api_key}", "Content-Type": "application/json"}
    host = (parsed.hostname or "").lower()
    if (host == "opencode.ai" or host.endswith(".opencode.ai")) and parsed.path.rstrip("/").startswith("/zen/go"):
        headers.update({"x-opencode-session": session_id, "User-Agent": "ExPGuard-ReportAgent/1.0"})
    baseline = case["report_path"].read_text(encoding="utf-8")
    packet = compact_packet(case, baseline)
    body = {"model": model, "temperature": 0, "max_tokens": 2500,
            "messages": [{"role": "system", "content": SYSTEM_PROMPT},
                         {"role": "user", "content": make_user_prompt(packet, example)}]}
    trust_env = setting(env, "EXPAGENT_DISABLE_PROXY", default="false").lower() not in {"1", "true", "yes", "on"}
    last_status = None
    for attempt in range(max_retries + 1):
        try:
            with requests.Session() as session:
                session.trust_env = trust_env
                response = session.post(endpoint, headers=headers, json=body, timeout=(20, timeout))
            if response.status_code == 429 or response.status_code >= 500:
                last_status = f"HTTP {response.status_code}"
                if attempt < max_retries:
                    retry_after = response.headers.get("Retry-After")
                    try:
                        delay = min(60, max(1, int(retry_after))) if retry_after else min(30, 2 ** attempt)
                    except ValueError:
                        delay = min(30, 2 ** attempt)
                    time.sleep(delay)
                    continue
            response.raise_for_status()
            payload = response.json()
            content = payload["choices"][0]["message"]["content"]
            if isinstance(content, list):
                content = "".join(item.get("text", "") for item in content if isinstance(item, dict))
            value = parse_json_response(str(content))
            validated = validate_narrative(value, case["flows"])
            return validated, model
        except (requests.RequestException, KeyError, IndexError, TypeError, ValueError, json.JSONDecodeError) as exc:
            # Avoid printing response text or request details: gateways may echo prompts.
            if isinstance(exc, requests.HTTPError) and exc.response is not None:
                last_status = f"HTTP {exc.response.status_code}"
            elif isinstance(exc, requests.RequestException):
                last_status = type(exc).__name__
            else:
                last_status = type(exc).__name__
            if attempt < max_retries:
                time.sleep(min(30, 2 ** attempt))
    raise RuntimeError(f"DeepSeek request or local validation failed ({last_status or 'unknown error'})")


def process_case(case: dict[str, Any], env: dict[str, str], example: str, session_id: str, dry_run: bool) -> dict[str, Any]:
    baseline = case["report_path"].read_text(encoding="utf-8")
    if dry_run:
        packet = compact_packet(case, baseline)
        return {"key": case["key"], "status": "dry_run", "prompt_chars": len(make_user_prompt(packet, example))}
    narrative, model = request_narrative(case, env, example, session_id)
    result = update_report(baseline, case, narrative)
    case["report_path"].write_text(result, encoding="utf-8")
    provenance = {"schema_version": "1.0", "provider": "deepseek-compatible", "model": model,
                  "generated_at_utc": now(), "report_sha256": digest(result), "input_sha256": digest(baseline),
                  "flow_ids": [f.get("ground_truth_flow_id") for f in case["flows"]],
                  "narrative": narrative}
    write_json(case["agent_path"], provenance)
    return {"key": case["key"], "status": "generated", "flow_count": len(case["flows"]), "report_chars": len(result)}


def update_ledger(root: Path, completed: list[dict[str, Any]]) -> None:
    if not completed:
        return
    path = root / LEDGER_RELATIVE
    data = read_json(path)
    by_key = {entry.get("key"): entry for entry in data.get("entries", [])}
    for result in completed:
        entry = by_key.get(result["key"])
        if not entry:
            continue
        entry["report_revision"] = int(entry.get("report_revision", 1)) + 1
        entry["report_generator"] = "DeepSeek ExPGuard Report Agent"
        entry["report_generated_at_utc"] = now()
        if entry.get("email_status") == "sent":
            entry["previous_email_status"] = "sent"
            entry["previous_email_message_id"] = entry.get("email_message_id") or entry.get("previous_email_message_id")
            entry["email_status"] = "pending_revised"
            entry["needs_resend"] = True
    write_json(path, data)


def main() -> int:
    root = Path(__file__).resolve().parents[1]
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--dataset", type=Path, default=root / "datasets" / "ground-truth-dataset-780.json")
    parser.add_argument("--env-file", type=Path, default=ENV_PATH)
    parser.add_argument("--example", type=Path, default=EXAMPLE_PATH)
    parser.add_argument("--extension-id", action="append", help="Limit to this ID; repeat to select multiple.")
    parser.add_argument("--limit", type=int)
    parser.add_argument("--concurrency", type=int, default=2)
    parser.add_argument("--same-version-only", action="store_true")
    parser.add_argument("--include-sent", action="store_true", help="Regenerate reports already sent by email.")
    parser.add_argument("--force", action="store_true", help="Regenerate even when agent-generation.json exists.")
    parser.add_argument("--dry-run", action="store_true")
    args = parser.parse_args()
    if args.concurrency < 1 or (args.limit is not None and args.limit < 1):
        parser.error("--concurrency and --limit must be positive")
    if not args.env_file.is_file() or not args.example.is_file():
        parser.error("DeepSeek .env or Report-Example.md is missing")
    env = read_env(args.env_file)
    if not args.dry_run and not setting(env, "DEEPSEEK_API_KEY"):
        parser.error("DEEPSEEK_API_KEY was not found in the configured .env file")
    dataset = read_json(args.dataset)
    cases = selected_cases(dataset, args, root)
    ledger = read_json(root / LEDGER_RELATIVE)
    statuses = {e.get("key"): e for e in ledger.get("entries", [])}
    filtered = []
    for case in cases:
        entry = statuses.get(case["key"], {})
        if entry.get("email_status") == "sent" and not args.include_sent:
            continue
        if case["agent_path"].is_file() and not args.force:
            continue
        if not case["report_path"].is_file():
            raise FileNotFoundError(f"Factual baseline report is missing: {case['report_path']}")
        filtered.append(case)
    cases = filtered[:args.limit] if args.limit else filtered
    if args.extension_id and not cases:
        parser.error("Selected IDs are already generated, sent, or outside the requested scope; use --force or --include-sent as applicable")
    example = args.example.read_text(encoding="utf-8")
    print(json.dumps({"selected": len(cases), "same_version_only": args.same_version_only,
                      "model": setting(env, "DEEPSEEK_MODEL", default="deepseek-chat"),
                      "dry_run": args.dry_run}, ensure_ascii=False))
    if args.dry_run:
        for case in cases:
            result = process_case(case, env, example, "dry-run", True)
            print(json.dumps(result, ensure_ascii=False))
        return 0
    session_id = os.getenv("EXPAGENT_OPENCODE_SESSION") or uuid.uuid4().hex
    done: list[dict[str, Any]] = []
    failures: list[dict[str, str]] = []
    with concurrent.futures.ThreadPoolExecutor(max_workers=args.concurrency) as pool:
        futures = {pool.submit(process_case, case, env, example, session_id, False): case for case in cases}
        for future in concurrent.futures.as_completed(futures):
            case = futures[future]
            try:
                result = future.result()
                done.append(result)
                print(json.dumps(result, ensure_ascii=False), flush=True)
            except Exception as exc:
                failure = {"key": case["key"], "error": str(exc)}
                failures.append(failure)
                print(json.dumps({"status": "failed", **failure}, ensure_ascii=False), file=sys.stderr, flush=True)
    update_ledger(root, done)
    print(json.dumps({"generated": len(done), "failed": len(failures), "ledger_updated": bool(done)}, ensure_ascii=False))
    return 2 if failures else 0


if __name__ == "__main__":
    raise SystemExit(main())
