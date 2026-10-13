"""Compare each version-changed Ground Truth flow with its original tool's rerun."""

from __future__ import annotations

import argparse
import json
from collections import Counter
from datetime import datetime, timezone
from pathlib import Path
from typing import Any


def utc_now() -> str:
    return datetime.now(timezone.utc).replace(microsecond=0).isoformat().replace("+00:00", "Z")


def atomic_json(path: Path, data: Any) -> None:
    temp = path.with_name(path.name + ".tmp")
    temp.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    temp.replace(path)


def load_json(path: Path) -> Any:
    return json.loads(path.read_text(encoding="utf-8-sig"))


def job_key(platform: str, extension_id: str, version: str, tool: str) -> str:
    import re
    safe = lambda value: re.sub(r"[^A-Za-z0-9._@-]", "_", str(value))
    return "__".join(safe(value) for value in (platform, extension_id, version, tool))


def canonical(value: Any) -> str | None:
    if value is None:
        return None
    return str(value).strip().upper()


def old_type(flow: dict[str, Any], key: str) -> str | None:
    item = flow.get(key) or {}
    return item.get("type") or item.get("kind")


def compact_endpoint(endpoint: dict[str, Any] | None) -> dict[str, Any] | None:
    if not isinstance(endpoint, dict):
        return None
    return {k: endpoint.get(k) for k in ("kind", "type", "remark", "file", "loc", "code") if endpoint.get(k) is not None}


def new_flow_pairs(tool: str, report: dict[str, Any]) -> list[dict[str, Any]]:
    pairs: list[dict[str, Any]] = []
    flows = report.get("flows") or []
    for flow_index, flow in enumerate(flows, start=1):
        if not isinstance(flow, dict):
            continue
        source_obj = flow.get("source") if isinstance(flow.get("source"), dict) else {}
        source_type = source_obj.get("kind") or source_obj.get("type") or flow.get("sourceType")
        sinks = flow.get("sinks") if isinstance(flow.get("sinks"), list) else None
        if sinks is None:
            sink_obj = flow.get("sink") if isinstance(flow.get("sink"), dict) else {}
            sinks = [sink_obj] if sink_obj else [{}]
        for sink_index, sink_obj in enumerate(sinks, start=1):
            if not isinstance(sink_obj, dict):
                sink_obj = {}
            sink_type = sink_obj.get("kind") or sink_obj.get("type") or flow.get("sinkType")
            pairs.append({
                "tool_flow_index": flow_index,
                "sink_index": sink_index,
                "flow_type": flow.get("flowType") or flow.get("flow_type"),
                "source_type": source_type,
                "sink_type": sink_type,
                "source": compact_endpoint(source_obj) or {k: v for k, v in {
                    "type": source_type, "remark": flow.get("sourceRemark"), "file": flow.get("sourceFile"),
                    "loc": flow.get("sourceLoc"), "code": flow.get("sourceCode"),
                }.items() if v is not None},
                "sink": compact_endpoint(sink_obj) or {k: v for k, v in {
                    "type": sink_type, "remark": flow.get("sinkRemark"), "file": flow.get("sinkFile"),
                    "loc": flow.get("sinkLoc"), "code": flow.get("sinkCode"),
                }.items() if v is not None},
                "propagation_step_count": (
                    len((flow.get("propagation") or {}).get("steps", []))
                    if isinstance(flow.get("propagation"), dict) else
                    len(flow.get("flow", [])) if isinstance(flow.get("flow"), list) else None
                ),
            })
    return pairs


def analyze_report(tool: str, original_flow: dict[str, Any], job: dict[str, Any] | None) -> dict[str, Any]:
    baseline = original_flow.get("flow") or {}
    expected_source = old_type(baseline, "source")
    expected_sink = old_type(baseline, "sink")
    common = {
        "tool": tool,
        "original_source_flow_id": original_flow.get("flow_id") or baseline.get("flow_id"),
        "original_source_type": expected_source,
        "original_sink_type": expected_sink,
    }
    if not job:
        return {**common, "outcome": "tool_failure", "run_status": "not_run",
                "reason": "No revalidation job record was produced for this original reporting tool."}
    run_status = job.get("status")
    summary_path = Path(job.get("result_dir", ".")) / "summary.json"
    summary_status = load_json(summary_path).get("status") if summary_path.is_file() else None
    result = {**common, "revalidation_job_key": job.get("job_key"), "run_status": run_status,
              "result_dir": job.get("result_dir"), "report_path": job.get("expected_report"),
              "duration_seconds": job.get("duration_seconds"), "error": job.get("error")}
    result["tool_summary_status"] = summary_status
    if run_status != "completed" or not job.get("report_valid") or summary_status not in {None,"success","completed","ok"}:
        return {**result, "outcome": "tool_failure",
                "reason": "The original tool did not complete successfully with a valid flow report."}

    report_path = Path(job["expected_report"])
    report = load_json(report_path)
    pairs = new_flow_pairs(tool, report)
    exact = [p for p in pairs if canonical(p.get("source_type")) == canonical(expected_source)
             and canonical(p.get("sink_type")) == canonical(expected_sink)]
    same_source = [p for p in pairs if expected_source and canonical(p.get("source_type")) == canonical(expected_source)]
    same_sink = [p for p in pairs if expected_sink and canonical(p.get("sink_type")) == canonical(expected_sink)]
    if exact:
        return {**result, "outcome": "still_detected", "comparison": "exact_source_and_sink_api_types",
                "candidate_match_count": len(exact), "candidate_matches": exact[:20],
                "tool_report_flow_count": len(report.get("flows", [])),
                "source_review_required": True,
                "interpretation": "Tool detection only. Endpoint API categories do not establish the identity or exploitability of the original Flow."}
    return {**result, "outcome": "disappeared", "comparison": "no_exact_source_and_sink_api_pair",
            "candidate_match_count": 0, "same_source_candidates": same_source[:10],
            "same_sink_candidates": same_sink[:10],
            "tool_report_flow_count": len(report.get("flows", [])),
            "source_review_required": True,
            "interpretation": "The original source/sink pair was not reported in the successful rerun; this alone does not prove a security fix."}


def main() -> int:
    root = Path(__file__).resolve().parents[1]
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--dataset", type=Path, default=root / "datasets" / "ground-truth-dataset-780.json")
    parser.add_argument("--jobs", type=Path, default=root / "datasets" / "updates" / "revalidation" / "jobs.json")
    args = parser.parse_args()

    dataset_path = args.dataset.resolve()
    jobs_path = args.jobs.resolve()
    dataset = load_json(dataset_path)
    jobs_data = load_json(jobs_path) if jobs_path.exists() else {"jobs": []}
    jobs = {job.get("job_key"): job for job in jobs_data.get("jobs", [])}
    expected_keys = set()
    for extension in dataset.get("extensions", []):
        check = extension.get("latest_version_check") or {}
        if check.get("status") != "version_changed":
            continue
        for flow in extension.get("flows", []):
            for report in flow.get("reports", []):
                tool = report.get("tool_label") or report.get("tool")
                expected_keys.add(job_key(extension["platform"], extension["extension_id"], str(check.get("version")), tool))
    unfinished = [key for key in sorted(expected_keys)
                  if jobs.get(key, {}).get("status") not in {"completed", "failed", "timeout", "input_validation_failed"}]
    if unfinished:
        print(json.dumps({"error": "Revalidation is incomplete; no dataset changes were written.",
                          "unfinished_jobs": len(unfinished), "examples": unfinished[:10]}, ensure_ascii=False, indent=2))
        return 2
    counts: Counter[str] = Counter()
    tool_counts: Counter[str] = Counter()
    for extension in dataset.get("extensions", []):
        check = extension.get("latest_version_check") or {}
        version_status = check.get("status")
        for ground_truth_flow in extension.get("flows", []):
            if version_status == "same_version":
                assessment = {"status": "version_unchanged", "dataset_version": extension.get("version"),
                              "latest_version": check.get("version"), "tool_assessments": []}
            elif version_status == "delisted":
                assessment = {"status": "extension_delisted", "dataset_version": extension.get("version"),
                              "latest_version": None, "reason": check.get("error"), "tool_assessments": []}
            elif version_status == "version_changed":
                reports = ground_truth_flow.get("reports", [])
                tool_results = []
                for original_report in reports:
                    tool = original_report.get("tool_label") or original_report.get("tool")
                    key = job_key(extension["platform"], extension["extension_id"], str(check.get("version")), tool)
                    result = analyze_report(tool, original_report, jobs.get(key))
                    tool_results.append(result)
                    tool_counts[f"{tool}:{result['outcome']}"] += 1
                outcomes = [item["outcome"] for item in tool_results]
                if not outcomes:
                    flow_status = "tool_failure"
                elif all(value == "still_detected" for value in outcomes):
                    flow_status = "still_detected"
                elif all(value == "disappeared" for value in outcomes):
                    flow_status = "disappeared"
                elif all(value == "tool_failure" for value in outcomes):
                    flow_status = "tool_failure"
                elif "tool_failure" in outcomes and any(value != "tool_failure" for value in outcomes):
                    flow_status = "partial_tool_failure"
                else:
                    flow_status = "mixed_tool_outcome"
                assessment = {"status": flow_status, "dataset_version": extension.get("version"),
                              "latest_version": check.get("version"),
                              "package_path": (check.get("download") or {}).get("path"),
                              "tool_assessments": tool_results}
            else:
                assessment = {"status": "version_lookup_incomplete", "dataset_version": extension.get("version"),
                              "latest_version": None, "reason": check.get("error"), "tool_assessments": []}
            ground_truth_flow["version_update_assessment"] = assessment
            counts[assessment["status"]] += 1

    dataset["update_revalidation"] = {
        "updated_at_utc": utc_now(),
        "method": "For version-changed packages, reran every original reporting tool and compared each Ground Truth flow's original source/sink API pair with that tool's latest-version flow report. Only the original 780 flows were assessed.",
        "resource_limits_per_tool_run": jobs_data.get("limits"),
        "job_record_path": str(jobs_path),
        "flow_counts": dict(sorted(counts.items())),
        "tool_report_counts": dict(sorted(tool_counts.items())),
        "assessment_scope": "Automated tool-report comparison only. Static source review is stored separately. No human review or dynamic exploit reproduction is claimed by this script.",
    }
    atomic_json(dataset_path, dataset)
    print(json.dumps(dataset["update_revalidation"], ensure_ascii=False, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
