"""Normalize terminal revalidation statuses using each tool's summary.json."""
from __future__ import annotations

import json
from datetime import datetime, timezone
from pathlib import Path


def now():
    return datetime.now(timezone.utc).replace(microsecond=0).isoformat().replace("+00:00", "Z")


def main():
    root = Path(__file__).resolve().parents[1]
    path = root / "datasets/updates/revalidation/jobs.json"
    data = json.loads(path.read_text(encoding="utf-8-sig"))
    changed = []
    accepted = {"success", "completed", "ok"}
    for job in data.get("jobs", []):
        if job.get("status") != "completed":
            continue
        result_dir = Path(job.get("result_dir", ""))
        summary_path = result_dir / "summary.json"
        if not summary_path.is_file():
            continue
        try:
            summary = json.loads(summary_path.read_text(encoding="utf-8-sig"))
        except Exception as exc:
            job["status"] = "failed"
            job["error"] = f"summary.json could not be parsed: {type(exc).__name__}: {exc}"
            changed.append(job.get("job_key"))
            continue
        status = summary.get("status")
        job["tool_summary_status"] = status
        job["tool_summary_path"] = str(summary_path.resolve())
        if status not in accepted:
            job["status"] = "failed"
            job["error"] = f"Tool summary status was {status!r}; analysis did not fully succeed."
            job["normalized_from_status"] = "completed"
            changed.append(job.get("job_key"))
    data["updated_at_utc"] = now()
    data["job_counts"] = {}
    for job in data.get("jobs", []):
        data["job_counts"][job.get("status", "unknown")] = data["job_counts"].get(job.get("status", "unknown"), 0) + 1
    data["complete"] = all(j.get("status") in {"completed", "failed", "timeout", "input_validation_failed"} for j in data.get("jobs", []))
    temp = path.with_name(path.name + ".tmp")
    temp.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    temp.replace(path)
    print(json.dumps({"normalized": changed, "complete": data["complete"], "job_counts": data["job_counts"]}, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
