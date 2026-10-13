"""Join the 337-instance Ground Truth archive, report, email, and Git status."""

from __future__ import annotations

import argparse
import json
import re
from collections import Counter
from datetime import datetime, timezone
from pathlib import Path
from typing import Any


def read(path: Path) -> Any:
    return json.loads(path.read_text(encoding="utf-8-sig"))


def write(path: Path, value: Any) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    temp = path.with_name(path.name + ".tmp")
    temp.write_text(json.dumps(value, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    temp.replace(path)


def safe(value: str) -> str:
    return re.sub(r"[^A-Za-z0-9._@-]", "_", str(value))


def main() -> int:
    root = Path(__file__).resolve().parents[1]
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--dataset", type=Path, default=root / "datasets" / "ground-truth-dataset-780.json")
    parser.add_argument("--reporting-ledger", type=Path, default=root / "datasets" / "reporting" / "reporting-ledger.json")
    parser.add_argument("--output", type=Path, default=root / "datasets" / "ground-truth-maintenance-ledger.json")
    parser.add_argument("--git-status", default="pending_push", choices=["pending_push", "pushed"])
    parser.add_argument("--git-commit", default=None)
    args = parser.parse_args()
    dataset = read(args.dataset)
    reporting = read(args.reporting_ledger)
    reports = {item.get("key"): item for item in reporting.get("entries", [])}
    entries: list[dict[str, Any]] = []
    for extension in dataset.get("extensions", []):
        platform = extension["platform"]
        extension_id = extension["extension_id"]
        version = str(extension["version"])
        safe_id = safe(extension_id)
        safe_version = safe(version)
        key = f"{platform}/{safe_id}_{safe_version}"
        latest = extension.get("latest_version_check") or {}
        report = reports.get(key)
        report_path = report.get("report_path") if report else None
        metadata_path = Path(report_path).with_name("metadata.json") if report_path else None
        report_meta = read(metadata_path) if metadata_path and metadata_path.is_file() else {}
        covered_flow_ids = set(report_meta.get("flow_ids") or [])
        report_class = report.get("report_class") if report else None
        if report:
            email_status = report.get("email_status", "pending")
        elif latest.get("status") == "delisted":
            email_status = "not_applicable_delisted"
        elif latest.get("status") == "version_changed":
            email_status = "not_reported_current_flow_not_detected"
        else:
            email_status = "not_report_generated"
        archived_dir = root / "datasets" / platform / f"{extension_id}_{version}"
        flow_entries = []
        for flow in extension.get("flows", []):
            flow_id = flow.get("ground_truth_flow_id")
            if flow_id in covered_flow_ids:
                flow_email = email_status
            elif latest.get("status") == "version_changed":
                flow_email = "not_sent_flow_not_detected_in_latest_version"
            elif latest.get("status") == "delisted":
                flow_email = "not_applicable_delisted"
            else:
                flow_email = email_status
            flow_entries.append({
                "flow_id": flow_id,
                "source_family": flow.get("source_family"),
                "sink_family": flow.get("sink_family"),
                "matched_tools": flow.get("matched_tools", []),
                "included_in_report": flow_id in covered_flow_ids,
                "email_status": flow_email,
                "git_upload_status": args.git_status,
            })
        entries.append({
            "key": key,
            "platform": platform,
            "extension_id": extension_id,
            "name": extension.get("name"),
            "ground_truth_version": version,
            "latest_store_version": latest.get("version"),
            "lifecycle_status": latest.get("status"),
            "flow_count": len(flow_entries),
            "report_class": report_class,
            "report_generated": bool(report_path and Path(report_path).is_file()),
            "report_path": report_path,
            "report_generator": report.get("report_generator") if report else None,
            "contact": {"status": report.get("contact_status"), "email": report.get("developer_email"), "source": report.get("developer_email_source")} if report else None,
            "email_status": email_status,
            "email_sent_at_utc": report.get("email_sent_at_utc") if report else None,
            "email_message_id": report.get("email_message_id") if report else None,
            "email_revision": report.get("email_revision") if report else None,
            "git_upload_status": args.git_status,
            "git_commit": args.git_commit,
            "dataset_directory": str(archived_dir),
            "dataset_metadata_present": (archived_dir / "ground-truth-metadata.json").is_file(),
            "flows": flow_entries,
        })
    counts = Counter(entry["lifecycle_status"] for entry in entries)
    email_counts = Counter(entry["email_status"] for entry in entries)
    result = {
        "schema_version": "expguard-ground-truth-maintenance/v1",
        "generated_at_utc": datetime.now(timezone.utc).replace(microsecond=0).isoformat().replace("+00:00", "Z"),
        "scope": {"extension_instances": len(entries), "deduplicated_flows": sum(entry["flow_count"] for entry in entries), "lifecycle_counts": dict(counts)},
        "email_status_counts": dict(email_counts),
        "git_upload_status": args.git_status,
        "git_commit": args.git_commit,
        "entries": entries,
    }
    write(args.output, result)
    print(json.dumps({"output": str(args.output), "extension_instances": len(entries), "flows": result["scope"]["deduplicated_flows"], "lifecycle_counts": dict(counts), "email_status_counts": dict(email_counts), "git_upload_status": args.git_status}, ensure_ascii=False, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
