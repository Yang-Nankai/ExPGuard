"""Attach evidence-assisted static review records to updated Ground Truth Flows.

The review is deliberately conservative: a source Flow is called likely unchanged
only when the original/new local context supports a unique candidate. Missing or
ambiguous evidence remains inconclusive; a tool's lack of a report is not treated
as proof that the vulnerability disappeared.
"""
from __future__ import annotations

import json
from collections import Counter
from datetime import datetime, timezone
from pathlib import Path


def now():
    return datetime.now(timezone.utc).replace(microsecond=0).isoformat().replace("+00:00", "Z")


def review_report(report: dict) -> dict:
    run = report.get("run_status")
    candidates = report.get("candidate_pairs") or []
    if run in {"timeout", "failed", "running", "not_run", "input_validation_failed"}:
        return {
            "status": "not_reviewable_tool_failure",
            "basis": "The reporting tool did not produce a completed report that can identify the original Flow.",
            "candidate_count": len(candidates),
        }
    if not candidates:
        return {
            "status": "inconclusive_no_matching_candidate",
            "basis": "No same-source/sink candidate was available in the successful new report; source absence is not proof of a fix.",
            "candidate_count": 0,
        }
    top = (candidates[0].get("identity_evidence") or {})
    second = (candidates[1].get("identity_evidence") or {}) if len(candidates) > 1 else {}
    score = float(top.get("ranking_score") or 0)
    second_score = float(second.get("ranking_score") or 0)
    src = float(top.get("actual_source_context_similarity") or 0)
    sink = float(top.get("actual_sink_context_similarity") or 0)
    old = report.get("old_report_pair") or {}
    source_ev = report.get("source_evidence") or {}
    sink_ev = report.get("sink_evidence") or {}
    local_context = source_ev.get("original_local_context_found_exactly_in_new_file") and sink_ev.get("original_local_context_found_exactly_in_new_file")
    unique = len(candidates) == 1 or score - second_score >= 0.10
    strong = score >= 0.80 and src >= 0.80 and sink >= 0.80 and unique
    if strong or (local_context and unique and score >= 0.70):
        return {
            "status": "likely_unchanged",
            "basis": "The original source/sink context is present in the updated source or has a unique high-scoring same-path candidate.",
            "candidate_count": len(candidates),
            "top_candidate": {"tool_flow_index": candidates[0].get("tool_flow_index"), "sink_index": candidates[0].get("sink_index")},
            "identity_evidence": top,
        }
    return {
        "status": "inconclusive_ambiguous_candidates",
        "basis": "Same API categories occur in multiple paths or source context similarity is insufficient for a unique identity decision.",
        "candidate_count": len(candidates),
        "top_candidate": {"tool_flow_index": candidates[0].get("tool_flow_index"), "sink_index": candidates[0].get("sink_index")},
        "identity_evidence": top,
    }


def main():
    root = Path(__file__).resolve().parents[1]
    dataset_path = root / "datasets/ground-truth-dataset-780.json"
    evidence_path = root / "datasets/updates/revalidation/source-review-evidence.json"
    dataset = json.loads(dataset_path.read_text(encoding="utf-8-sig"))
    evidence = json.loads(evidence_path.read_text(encoding="utf-8-sig"))
    by_identity = {(e["platform"], e["extension_id"], e["version"]): e for e in evidence["extensions"]}
    counts = Counter()
    report_count = 0
    flow_count = 0
    for extension in dataset["extensions"]:
        check = extension.get("latest_version_check") or {}
        if check.get("status") != "version_changed":
            continue
        entry = by_identity.get((extension["platform"], extension["extension_id"], extension["version"]))
        if not entry:
            continue
        by_flow = {f["ground_truth_flow_id"]: f for f in entry["flows"]}
        for flow in extension["flows"]:
            evidence_flow = by_flow.get(flow["ground_truth_flow_id"])
            reviews = []
            for item in (evidence_flow or {}).get("tool_reports", []):
                review = review_report(item)
                review.update({"tool": item.get("tool"), "original_flow_id": item.get("original_flow_id"),
                               "reviewed_at_utc": now(),
                               "reviewer": "Codex evidence-assisted static source review"})
                reviews.append(review)
                counts[review["status"]] += 1
            if not reviews:
                continue
            flow_count += 1
            report_count += len(reviews)
            statuses = [r["status"] for r in reviews]
            if all(s == "likely_unchanged" for s in statuses):
                overall = "likely_unchanged"
            elif all(s == "not_reviewable_tool_failure" for s in statuses):
                overall = "not_reviewable_tool_failure"
            elif all(s.startswith("inconclusive") for s in statuses):
                overall = "inconclusive"
            else:
                overall = "mixed_or_inconclusive"
            flow["source_review"] = {
                "status": overall,
                "scope": "Only this original Ground Truth Flow; newly discovered Flows are ignored.",
                "tool_reviews": reviews,
                "limitations": "Static source evidence review; no claim of dynamic exploit reproduction or independent human laboratory reproduction.",
            }
    dataset["source_review"] = {
        "updated_at_utc": now(),
        "scope": "322 version-changed original Flows only",
        "method": "Evidence-assisted comparison of original and downloaded updated source, manifest security fields, and same-tool candidate paths. Ambiguous and missing evidence remains inconclusive.",
        "flow_count": flow_count,
        "tool_report_count": report_count,
        "status_counts": dict(sorted(counts.items())),
        "limitations": "This is a conservative static review record. Tool disappearance is not automatically labeled a vulnerability fix; dynamic reproduction remains separate.",
    }
    temp = dataset_path.with_name(dataset_path.name + ".tmp")
    temp.write_text(json.dumps(dataset, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    temp.replace(dataset_path)
    print(json.dumps(dataset["source_review"], ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
