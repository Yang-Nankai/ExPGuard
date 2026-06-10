#!/usr/bin/env python3
"""Batch-analyze browser extensions with ExPGuard.

Each extension is analyzed in its own Node subprocess — process isolation
prevents taint state from leaking across extensions.

A thread pool drives the subprocesses concurrently. After all extensions
finish, a batch-summary.json and batch-statistics.json are written; if any
extension had findings, a batch-report.html is also generated.

Input forms (selected by --mode):
  * directory: scan for *.crx (chrome) or *.xpi (firefox) files whose name
    starts with the extension ID.
  * jsonl: each line is {"id": "...", "version"?: "...", "path": "..."}.

Usage:
  python3 scripts/batch_analyze.py \
      --input <dir|file.jsonl> --mode <directory|jsonl> \
      --platform <chrome|firefox> [--out DIR] [--jobs N] \
      [--html] [--taint-rules PATH] [--timeout SECONDS]
"""

from __future__ import annotations

import argparse
import json
import os
import re
import subprocess
import sys
import time
from concurrent.futures import ThreadPoolExecutor, as_completed
from dataclasses import dataclass, field
from pathlib import Path
from typing import Any, Dict, List, Optional


REPO_ROOT = Path(__file__).resolve().parent.parent
DEFAULT_MAIN_JS = REPO_ROOT / "dist" / "main.js"


@dataclass
class BatchJob:
    source_type: str  # "CRX" | "DIR" | "XPI"
    input: str
    extension_id: Optional[str] = None
    extension_version: Optional[str] = None
    platform: str = "chrome"


@dataclass
class JobResult:
    job: BatchJob
    output_dir: str
    status: str = "error"
    duration_ms: float = 0.0
    total_files: int = 0
    findings: int = 0
    flow_type_counts: Dict[str, int] = field(default_factory=dict)
    node_coverage: Optional[float] = None
    scope_coverage: Optional[float] = None
    error_type: Optional[str] = None
    error_message: Optional[str] = None

    def to_dict(self) -> Dict[str, Any]:
        return {
            "extensionId": self.job.extension_id,
            "extensionVersion": self.job.extension_version,
            "sourceType": self.job.source_type,
            "input": self.job.input,
            "outputDir": self.output_dir,
            "status": self.status,
            "durationMs": self.duration_ms,
            "totalFiles": self.total_files,
            "findings": self.findings,
            "flowTypeCounts": self.flow_type_counts,
            "nodeCoverage": self.node_coverage,
            "scopeCoverage": self.scope_coverage,
            "errorType": self.error_type,
            "errorMessage": self.error_message,
        }


# --------------------------------------------------------------------------
# Job discovery
# --------------------------------------------------------------------------

def resolve_jobs_from_directory(directory: Path, platform: str) -> List[BatchJob]:
    """Scan directory for extension packages matching the platform."""
    jobs: List[BatchJob] = []
    ext_suffix = ".crx" if platform == "chrome" else ".xpi"
    source_type = "CRX" if platform == "chrome" else "XPI"

    try:
        entries = sorted(directory.iterdir(), key=lambda p: p.name)
    except OSError as err:
        print(f"[BATCH] Cannot read directory {directory}: {err}", file=sys.stderr)
        return jobs

    for entry in entries:
        if not entry.is_file():
            continue
        if entry.suffix.lower() != ext_suffix:
            continue

        basename = entry.stem
        match = re.match(r"^([^_]+)(?:_(.+))?$", basename)
        if match:
            jobs.append(BatchJob(
                source_type=source_type,
                input=str(entry),
                extension_id=match.group(1),
                extension_version=match.group(2),
                platform=platform,
            ))

    return jobs


def resolve_jobs_from_jsonl(jsonl_path: Path, platform: str) -> List[BatchJob]:
    """Read jobs from a JSONL file."""
    jobs: List[BatchJob] = []

    try:
        content = jsonl_path.read_text(encoding="utf-8")
    except OSError as err:
        print(f"[BATCH] Cannot read JSONL file {jsonl_path}: {err}", file=sys.stderr)
        return jobs

    for lineno, line in enumerate(content.splitlines(), 1):
        line = line.strip()
        if not line:
            continue
        try:
            entry = json.loads(line)
        except json.JSONDecodeError as err:
            print(f"[BATCH] Skipping line {lineno}: invalid JSON: {err}", file=sys.stderr)
            continue

        ext_id = entry.get("id")
        ext_path = entry.get("path")
        if not ext_id or not ext_path:
            print(f"[BATCH] Skipping line {lineno}: missing 'id' or 'path'", file=sys.stderr)
            continue

        if not Path(ext_path).exists():
            print(f"[BATCH] Skipping line {lineno}: path not found: {ext_path}", file=sys.stderr)
            continue

        suffix = Path(ext_path).suffix.lower()
        if suffix == ".xpi":
            source_type = "XPI"
        elif suffix == ".crx":
            source_type = "CRX"
        elif Path(ext_path).is_dir():
            source_type = "DIR"
        else:
            print(f"[BATCH] Skipping line {lineno}: unsupported file type: {suffix}", file=sys.stderr)
            continue

        jobs.append(BatchJob(
            source_type=source_type,
            input=ext_path,
            extension_id=ext_id,
            extension_version=entry.get("version"),
            platform=platform,
        ))

    return jobs


def resolve_jobs(input_path: str, mode: str, platform: str) -> List[BatchJob]:
    p = Path(input_path)
    if mode == "directory":
        return resolve_jobs_from_directory(p, platform)
    else:
        return resolve_jobs_from_jsonl(p, platform)


# --------------------------------------------------------------------------
# Subprocess execution
# --------------------------------------------------------------------------

def run_one(
    job: BatchJob,
    out_root: Path,
    main_js: Path,
    node_bin: str,
    html: bool,
    taint_rules: Optional[str],
    timeout: Optional[float],
) -> JobResult:
    """Analyze a single extension in its own isolated Node subprocess."""
    slug = job.extension_id or re.sub(r"\.(crx|xpi|zip)$", "", Path(job.input).name, flags=re.I) or "ext"
    slug = re.sub(r"[^a-zA-Z0-9._@-]", "_", slug)[:80]
    job_out = out_root / slug
    job_out.mkdir(parents=True, exist_ok=True)

    cmd = [
        node_bin,
        str(main_js),
        "analyze",
        "--type", job.source_type,
        "--input", job.input,
        "--out", str(job_out),
    ]
    if job.extension_id:
        cmd += ["--id", job.extension_id]
    if taint_rules:
        cmd += ["--taint-rules", taint_rules]
    if html:
        cmd += ["--html"]

    started = time.monotonic()
    proc_failed = False
    err_msg: Optional[str] = None

    try:
        proc = subprocess.run(
            cmd,
            cwd=str(REPO_ROOT),
            stdout=subprocess.PIPE,
            stderr=subprocess.STDOUT,
            text=True,
            timeout=timeout,
        )
        if proc.returncode != 0:
            proc_failed = True
            tail = (proc.stdout or "").strip().splitlines()[-5:]
            err_msg = f"node exited {proc.returncode}: " + " / ".join(tail)
    except subprocess.TimeoutExpired:
        proc_failed = True
        err_msg = f"timed out after {timeout}s"
    except Exception as err:
        proc_failed = True
        err_msg = str(err)

    duration_ms = (time.monotonic() - started) * 1000.0

    result = JobResult(job=job, output_dir=str(job_out), duration_ms=duration_ms)
    summary_path = job_out / "summary.json"

    if summary_path.exists():
        try:
            data = json.loads(summary_path.read_text(encoding="utf-8"))
            flows = data.get("flows") or []
            counts: Dict[str, int] = {}
            for f in flows:
                ft = f.get("flowType", "UNKNOWN")
                counts[ft] = counts.get(ft, 0) + 1

            cov = data.get("coverage") or {}
            result.status = data.get("status", "error")
            result.total_files = int(data.get("totalFiles") or 0)
            result.findings = len(flows)
            result.flow_type_counts = counts
            result.node_coverage = cov.get("nodeCoverage")
            result.scope_coverage = cov.get("scopeCoverage")
            result.error_type = data.get("errorType")
            result.error_message = data.get("errorMessage")
        except Exception as err:
            result.status = "error"
            result.error_type = "BatchSummaryParse"
            result.error_message = str(err)
    else:
        result.status = "error"
        result.error_type = "BatchCrash"
        result.error_message = err_msg or "no summary.json produced"

    if proc_failed and result.status != "error":
        result.status = "error"
        result.error_type = result.error_type or "NodeNonZeroExit"
        result.error_message = result.error_message or err_msg

    return result


# --------------------------------------------------------------------------
# Statistics & HTML report
# --------------------------------------------------------------------------

def generate_statistics(results: List[JobResult]) -> Dict[str, Any]:
    total_findings = sum(r.findings for r in results)
    total_errors = sum(1 for r in results if r.status == "error")
    total_duration = sum(r.duration_ms for r in results)

    taint_map: Dict[str, Dict] = {}
    for r in results:
        for flow_type, count in r.flow_type_counts.items():
            if flow_type not in taint_map:
                taint_map[flow_type] = {"type": flow_type, "count": 0, "extensions": []}
            taint_map[flow_type]["count"] += count
            taint_map[flow_type]["extensions"].append({
                "id": r.job.extension_id or "unknown",
                "version": r.job.extension_version,
                "findings": count,
            })

    taint_types = sorted(taint_map.values(), key=lambda x: x["count"], reverse=True)

    extensions_with_reports = [
        {
            "extensionId": r.job.extension_id or "unknown",
            "extensionVersion": r.job.extension_version,
            "findings": r.findings,
            "flowTypes": r.flow_type_counts,
            "outputDir": r.output_dir,
            "durationMs": r.duration_ms,
        }
        for r in results if r.findings > 0
    ]

    errors = [
        {
            "extensionId": r.job.extension_id or "unknown",
            "extensionVersion": r.job.extension_version,
            "errorType": r.error_type or "Unknown",
            "errorMessage": r.error_message or "",
            "outputDir": r.output_dir,
        }
        for r in results if r.status == "error"
    ]

    return {
        "summary": {
            "totalExtensions": len(results),
            "extensionsWithFindings": len(extensions_with_reports),
            "extensionsWithErrors": total_errors,
            "totalFindings": total_findings,
            "totalDurationMs": total_duration,
            "avgDurationMs": total_duration / len(results) if results else 0,
        },
        "taintTypes": taint_types,
        "extensionsWithReports": extensions_with_reports,
        "errors": errors,
    }


def generate_html_report(stats: Dict[str, Any]) -> str:
    s = stats["summary"]
    taint_types = stats["taintTypes"]
    extensions = stats["extensionsWithReports"]
    errors = stats["errors"]

    def esc(text: str) -> str:
        return text.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")

    rows_taint = ""
    max_count = taint_types[0]["count"] if taint_types else 1
    for tt in taint_types:
        pct = (tt["count"] / max_count) * 100
        rows_taint += (
            f'<tr><td><code>{esc(tt["type"])}</code></td>'
            f'<td><strong>{tt["count"]}</strong></td>'
            f'<td><div style="background:#e9ecef;height:20px;border-radius:4px;overflow:hidden">'
            f'<div style="background:linear-gradient(90deg,#667eea,#764ba2);height:100%;width:{pct}%"></div>'
            f'</div></td><td>{len(tt["extensions"])}</td></tr>\n'
        )

    rows_ext = ""
    for ext in extensions:
        ft_str = ", ".join(f"{k}: {v}" for k, v in ext["flowTypes"].items())
        rows_ext += (
            f'<tr><td><code>{esc(ext["extensionId"])}</code></td>'
            f'<td>{ext.get("extensionVersion") or "N/A"}</td>'
            f'<td><strong>{ext["findings"]}</strong></td>'
            f'<td><small>{esc(ft_str)}</small></td>'
            f'<td>{ext["durationMs"]/1000:.1f}s</td></tr>\n'
        )

    rows_err = ""
    for err in errors:
        rows_err += (
            f'<tr><td><code>{esc(err["extensionId"])}</code></td>'
            f'<td>{err.get("extensionVersion") or "N/A"}</td>'
            f'<td>{esc(err["errorType"])}</td>'
            f'<td style="font-size:12px;word-break:break-word">{esc(err["errorMessage"][:200])}</td></tr>\n'
        )

    return f"""<!DOCTYPE html>
<html><head><meta charset="utf-8"><title>ExPGuard Batch Report</title>
<style>
body{{font-family:system-ui;margin:0;background:#f5f5f5}}
.wrap{{max-width:1200px;margin:0 auto;background:#fff;box-shadow:0 2px 8px rgba(0,0,0,.1)}}
header{{background:linear-gradient(135deg,#667eea,#764ba2);color:#fff;padding:30px 40px}}
header h1{{margin:0 0 8px}} header p{{margin:0;opacity:.9}}
.content{{padding:30px 40px}}
.cards{{display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:16px;margin-bottom:32px}}
.card{{background:#f8f9fa;border-radius:8px;padding:16px;border-left:4px solid #667eea}}
.card h4{{margin:0 0 6px;font-size:12px;text-transform:uppercase;color:#666}}
.card .val{{font-size:28px;font-weight:bold}}
table{{width:100%;border-collapse:collapse;margin-bottom:32px}}
th{{background:#667eea;color:#fff;padding:10px 14px;text-align:left;font-size:12px;text-transform:uppercase}}
td{{padding:10px 14px;border-bottom:1px solid #eee}}
h2{{border-bottom:2px solid #667eea;padding-bottom:8px}}
</style></head><body><div class="wrap">
<header><h1>ExPGuard Batch Report</h1><p>Automated security analysis of browser extensions</p></header>
<div class="content">
<div class="cards">
  <div class="card"><h4>Extensions</h4><div class="val">{s['totalExtensions']}</div></div>
  <div class="card"><h4>With Findings</h4><div class="val">{s['extensionsWithFindings']}</div></div>
  <div class="card"><h4>Errors</h4><div class="val">{s['extensionsWithErrors']}</div></div>
  <div class="card"><h4>Total Findings</h4><div class="val">{s['totalFindings']}</div></div>
  <div class="card"><h4>Duration</h4><div class="val">{s['totalDurationMs']/1000:.1f}s</div></div>
</div>
{'<h2>Taint Type Distribution</h2><table><tr><th>Type</th><th>Count</th><th>Distribution</th><th>Extensions</th></tr>' + rows_taint + '</table>' if taint_types else ''}
{'<h2>Extensions with Findings</h2><table><tr><th>ID</th><th>Version</th><th>Findings</th><th>Flow Types</th><th>Duration</th></tr>' + rows_ext + '</table>' if extensions else ''}
{'<h2>Errors</h2><table><tr><th>ID</th><th>Version</th><th>Type</th><th>Message</th></tr>' + rows_err + '</table>' if errors else ''}
</div></div></body></html>"""


# --------------------------------------------------------------------------
# Main orchestration
# --------------------------------------------------------------------------

def run_batch(args: argparse.Namespace) -> int:
    main_js = Path(args.main_js).resolve()
    if not main_js.exists():
        print(f"[BATCH] {main_js} not found — run `npm run build` first.", file=sys.stderr)
        return 2

    jobs = resolve_jobs(args.input, args.mode, args.platform)
    if not jobs:
        print(f"[BATCH] No extensions found at {args.input}", file=sys.stderr)
        return 0

    out_root = Path(args.out).resolve()
    out_root.mkdir(parents=True, exist_ok=True)

    workers = args.jobs if args.jobs and args.jobs > 0 else (os.cpu_count() or 4)
    workers = min(workers, len(jobs))

    print(f"[BATCH] Starting analysis of {len(jobs)} extension(s) with {workers} worker(s)")

    results: List[JobResult] = []
    completed = 0

    with ThreadPoolExecutor(max_workers=workers) as pool:
        future_to_job = {
            pool.submit(
                run_one, job, out_root, main_js, args.node,
                args.html, args.taint_rules, args.timeout,
            ): job
            for job in jobs
        }
        for future in as_completed(future_to_job):
            res = future.result()
            results.append(res)
            completed += 1

            label = res.job.extension_id or Path(res.job.input).name
            icon = "⚠️" if res.status == "error" else ("\U0001f534" if res.findings else "\U0001f7e2")
            print(
                f"[BATCH] {completed}/{len(jobs)} {icon} {label} "
                f"({res.findings} finding(s), {res.duration_ms / 1000:.1f}s)"
            )

    total_findings = sum(r.findings for r in results)
    total_errors = sum(1 for r in results if r.status == "error")

    print(
        f"[BATCH] Done. extensions={len(results)} findings={total_findings} "
        f"errors={total_errors}"
    )

    # Write batch-summary.json
    result_dicts = [r.to_dict() for r in results]
    summary = {
        "total": len(results),
        "findings": total_findings,
        "errors": total_errors,
        "results": result_dicts,
    }
    (out_root / "batch-summary.json").write_text(
        json.dumps(summary, indent=2, ensure_ascii=False), encoding="utf-8"
    )

    # Write batch-statistics.json
    stats = generate_statistics(results)
    (out_root / "batch-statistics.json").write_text(
        json.dumps(stats, indent=2, ensure_ascii=False), encoding="utf-8"
    )

    # Write batch-report.html
    html = generate_html_report(stats)
    (out_root / "batch-report.html").write_text(html, encoding="utf-8")

    print(f"[BATCH] Reports written to {out_root}")

    return 1 if total_errors > 0 else 0


def build_arg_parser() -> argparse.ArgumentParser:
    p = argparse.ArgumentParser(
        prog="batch_analyze.py",
        description="Batch-analyze browser extensions with ExPGuard. "
        "Each extension runs in an isolated Node subprocess.",
    )
    p.add_argument("--input", required=True, help="Directory of extensions or a JSONL manifest file")
    p.add_argument("--mode", required=True, choices=["directory", "jsonl"], help="Input mode")
    p.add_argument("--platform", required=True, choices=["chrome", "firefox"], help="Target platform")
    p.add_argument("--out", default="./results/batch", help="Root output directory (default: ./results/batch)")
    p.add_argument("--jobs", type=int, default=0, help="Number of concurrent workers (default: CPU count)")
    p.add_argument("--html", action="store_true", help="Generate report.html for each extension")
    p.add_argument("--taint-rules", default=None, help="Custom taint rule file for all extensions")
    p.add_argument("--timeout", type=float, default=None, help="Per-extension timeout in seconds")
    p.add_argument("--node", default="node", help="Node executable (default: node)")
    p.add_argument("--main-js", default=str(DEFAULT_MAIN_JS), help="Path to compiled dist/main.js")
    return p


def main(argv: Optional[List[str]] = None) -> int:
    args = build_arg_parser().parse_args(argv)
    return run_batch(args)


if __name__ == "__main__":
    raise SystemExit(main())
