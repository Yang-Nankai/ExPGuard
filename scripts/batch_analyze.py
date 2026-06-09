#!/usr/bin/env python3
"""Batch-analyze many Chrome extensions with ExPGuard.

Each extension is analyzed in its **own** ``node dist/main.js analyze``
subprocess. Process isolation is the whole point: ExPGuard keeps ~30 module-
level analysis singletons (taint manager, scope controller, factories, …), and
running several extensions in one Node process would leak taint ids / scope
trees across them. A fresh OS process starts with pristine module state, so no
in-process reset is needed and results can never cross-contaminate.

A thread pool (default size = CPU count) drives the subprocesses concurrently.
After each extension finishes we read its retained ``summary.json`` to tally
findings; a ``batch-summary.json`` is written at the end and — if a webhook is
configured — Feishu progress/summary cards are pushed live.

Input forms (auto-detected from --input):
  * A .json manifest:  {"extensions": [{"type": "DIR|CRX|WEB",
      "input": "<path|url>", "id"?: "...", "version"?: "..."}, ...]}
    (a bare top-level array of those items is also accepted)
  * A directory: each immediate child that is an unpacked extension (has a
    manifest.json) or a *.crx file becomes one job.

Usage:
  python3 scripts/batch_analyze.py --input <manifest.json|dir> [--out DIR]
      [--jobs N] [--html] [--taint-rules PATH]
      [--feishu-webhook URL] [--feishu-secret SECRET] [--progress-every N]
"""

from __future__ import annotations

import argparse
import json
import os
import re
import subprocess
import sys
import threading
import time
from concurrent.futures import ThreadPoolExecutor, as_completed
from dataclasses import dataclass, field
from pathlib import Path
from typing import Any, Dict, List, Optional

# scripts/ is a sibling of dist/ — make the local module importable when this
# file is run directly (python3 scripts/batch_analyze.py).
sys.path.insert(0, str(Path(__file__).resolve().parent))
from feishu import (  # noqa: E402
    FeishuNotifier,
    build_progress_card,
    build_summary_card,
)

REPO_ROOT = Path(__file__).resolve().parent.parent
DEFAULT_MAIN_JS = REPO_ROOT / "dist" / "main.js"
_VALID_TYPES = {"CRX", "DIR", "WEB", "XPI"}


@dataclass
class BatchJob:
    source_type: str  # "CRX" | "DIR" | "WEB"
    input: str
    extension_id: Optional[str] = None
    extension_version: Optional[str] = None


@dataclass
class JobResult:
    job: BatchJob
    output_dir: str
    status: str = "error"  # "success" | "error"
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
# Job discovery (mirrors the old resolveJobs()).
# --------------------------------------------------------------------------

def _coerce_type(raw: Any) -> str:
    up = str(raw or "").upper()
    return up if up in _VALID_TYPES else "DIR"


def _job_from_manifest_item(item: Any) -> Optional[BatchJob]:
    if not isinstance(item, dict):
        return None
    src = item.get("input") or item.get("path") or item.get("url")
    if not isinstance(src, str) or not src:
        return None
    return BatchJob(
        source_type=_coerce_type(item.get("type") or item.get("sourceType")),
        input=src,
        extension_id=item.get("id") or item.get("extensionId"),
        extension_version=item.get("version") or item.get("extensionVersion"),
    )


def _jobs_from_directory(directory: Path) -> List[BatchJob]:
    jobs: List[BatchJob] = []
    try:
        entries = sorted(directory.iterdir(), key=lambda p: p.name)
    except OSError as err:
        print(f"[BATCH] Cannot read input directory {directory}: {err}", file=sys.stderr)
        return jobs
    for entry in entries:
        if entry.is_dir():
            if (entry / "manifest.json").exists():
                jobs.append(BatchJob(source_type="DIR", input=str(entry)))
            else:
                # Nested layouts (e.g. the Firefox corpus stores each add-on as
                # {id}/{version}/{id}.{version}.xpi). Pick up any .xpi/.crx
                # packages found underneath.
                for pkg in sorted(entry.rglob("*")):
                    if not pkg.is_file():
                        continue
                    suffix = pkg.suffix.lower()
                    if suffix == ".xpi":
                        jobs.append(BatchJob(source_type="XPI", input=str(pkg)))
                    elif suffix == ".crx":
                        jobs.append(BatchJob(source_type="CRX", input=str(pkg)))
        elif entry.is_file() and entry.suffix.lower() == ".crx":
            jobs.append(BatchJob(source_type="CRX", input=str(entry)))
        elif entry.is_file() and entry.suffix.lower() == ".xpi":
            jobs.append(BatchJob(source_type="XPI", input=str(entry)))
    return jobs


def resolve_jobs(input_path: str) -> List[BatchJob]:
    p = Path(input_path)
    if p.is_dir():
        return _jobs_from_directory(p)
    parsed = json.loads(p.read_text(encoding="utf-8"))
    if isinstance(parsed, list):
        items = parsed
    elif isinstance(parsed, dict) and isinstance(parsed.get("extensions"), list):
        items = parsed["extensions"]
    else:
        items = []
    return [j for j in (_job_from_manifest_item(it) for it in items) if j is not None]


def slug_for(job: BatchJob, index: int) -> str:
    base = job.extension_id or re.sub(r"\.(crx|xpi|zip)$", "", Path(job.input).name, flags=re.I) or "ext"
    safe = re.sub(r"[^a-zA-Z0-9._-]", "_", base)[:64]
    return f"{index + 1:03d}_{safe}"


# --------------------------------------------------------------------------
# Subprocess execution.
# --------------------------------------------------------------------------

def _run_one(
    job: BatchJob,
    index: int,
    out_root: Path,
    main_js: Path,
    node_bin: str,
    html: bool,
    taint_rules: Optional[str],
    per_job_timeout: Optional[float],
) -> JobResult:
    """Analyze a single extension in its own node subprocess."""
    job_out = out_root / slug_for(job, index)
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
            timeout=per_job_timeout,
        )
        if proc.returncode != 0:
            proc_failed = True
            tail = (proc.stdout or "").strip().splitlines()[-5:]
            err_msg = f"node exited {proc.returncode}: " + " / ".join(tail)
    except subprocess.TimeoutExpired:
        proc_failed = True
        err_msg = f"timed out after {per_job_timeout}s"
    except Exception as err:  # noqa: BLE001
        proc_failed = True
        err_msg = str(err)

    duration_ms = (time.monotonic() - started) * 1000.0

    # The analyzer always retains summary.json. Read it for the authoritative
    # findings/coverage; fall back to the subprocess exit status if it's missing.
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
        except Exception as err:  # noqa: BLE001
            result.status = "error"
            result.error_type = "BatchSummaryParse"
            result.error_message = str(err)
    else:
        result.status = "error"
        result.error_type = "BatchCrash"
        result.error_message = err_msg or "no summary.json produced"

    # A non-zero node exit overrides an optimistic summary.
    if proc_failed and result.status != "error":
        result.status = "error"
        result.error_type = result.error_type or "NodeNonZeroExit"
        result.error_message = result.error_message or err_msg

    return result


# --------------------------------------------------------------------------
# Orchestration.
# --------------------------------------------------------------------------

def run_batch(args: argparse.Namespace) -> int:
    main_js = Path(args.main_js).resolve()
    if not main_js.exists():
        print(
            f"[BATCH] {main_js} not found — build first with `npm run build` "
            f"(or `npx tsc`).",
            file=sys.stderr,
        )
        return 2

    jobs = resolve_jobs(args.input)
    if not jobs:
        print(f"[BATCH] No extensions found at {args.input}", file=sys.stderr)
        return 0

    out_root = Path(args.out).resolve()
    out_root.mkdir(parents=True, exist_ok=True)

    workers = args.jobs if args.jobs and args.jobs > 0 else (os.cpu_count() or 4)
    workers = min(workers, len(jobs))
    progress_every = max(1, args.progress_every)

    webhook = args.feishu_webhook or os.environ.get("EPG_FEISHU_WEBHOOK")
    secret = args.feishu_secret or os.environ.get("EPG_FEISHU_SECRET")
    notifier = FeishuNotifier(webhook=webhook, secret=secret)

    started_at_ms = time.time() * 1000.0
    print(f"[BATCH] Starting batch of {len(jobs)} extension(s) with {workers} worker(s)")
    if notifier.enabled:
        notifier.send_card(
            build_progress_card(
                total=len(jobs), completed=0, findings=0, errors=0,
                started_at_ms=started_at_ms, now_ms=time.time() * 1000.0,
                current=jobs[0].extension_id or jobs[0].input,
            )
        )

    results: List[JobResult] = []
    findings = 0
    errors = 0
    completed = 0
    lock = threading.Lock()

    with ThreadPoolExecutor(max_workers=workers) as pool:
        future_to_job = {
            pool.submit(
                _run_one, job, i, out_root, main_js, args.node,
                args.html, args.taint_rules, args.timeout,
            ): job
            for i, job in enumerate(jobs)
        }
        for future in as_completed(future_to_job):
            res = future.result()
            with lock:
                results.append(res)
                findings += res.findings
                if res.status == "error":
                    errors += 1
                completed += 1
                label = res.job.extension_id or res.job.input
                icon = "⚠️" if res.status == "error" else ("🔴" if res.findings else "🟢")
                print(
                    f"[BATCH] {completed}/{len(jobs)} {icon} {label} "
                    f"({res.findings} finding(s), {res.duration_ms / 1000:.1f}s)"
                )
                if notifier.enabled and (completed % progress_every == 0 or completed == len(jobs)):
                    notifier.send_card(
                        build_progress_card(
                            total=len(jobs), completed=completed,
                            findings=findings, errors=errors,
                            started_at_ms=started_at_ms,
                            now_ms=time.time() * 1000.0,
                            current=None,
                        )
                    )

    ended_at_ms = time.time() * 1000.0

    # Stable order in the summary file: by the original job index.
    index_of = {id(j): i for i, j in enumerate(jobs)}
    results.sort(key=lambda r: index_of.get(id(r.job), 0))
    result_dicts = [r.to_dict() for r in results]

    print(
        f"[BATCH] Done. extensions={len(results)} findings={findings} errors={errors} "
        f"time={round((ended_at_ms - started_at_ms) / 1000)}s"
    )

    try:
        (out_root / "batch-summary.json").write_text(
            json.dumps(
                {
                    "total": len(results),
                    "findings": findings,
                    "errors": errors,
                    "startedAtMs": started_at_ms,
                    "endedAtMs": ended_at_ms,
                    "results": result_dicts,
                },
                indent=2,
            ),
            encoding="utf-8",
        )
    except OSError as err:
        print(f"[BATCH] Failed to write batch-summary.json: {err}", file=sys.stderr)

    if notifier.enabled:
        notifier.send_card(build_summary_card(result_dicts, started_at_ms, ended_at_ms))

    # Non-zero exit if any extension errored, so CI can gate on it.
    return 1 if errors > 0 else 0


def build_arg_parser() -> argparse.ArgumentParser:
    p = argparse.ArgumentParser(
        prog="batch_analyze.py",
        description="Analyze many Chrome extensions with ExPGuard, one isolated "
        "node subprocess per extension, driven by a thread pool.",
    )
    p.add_argument(
        "--input", required=True,
        help="a JSON manifest of extensions, or a directory of unpacked "
        "extensions / *.crx files",
    )
    p.add_argument("--out", default="./results/batch", help="root output directory")
    p.add_argument(
        "--jobs", type=int, default=0,
        help="number of concurrent worker subprocesses (default: CPU count)",
    )
    p.add_argument("--html", action="store_true", help="emit report.html for each extension")
    p.add_argument("--taint-rules", default=None, help="custom taint rule file applied to every extension")
    p.add_argument(
        "--timeout", type=float, default=None,
        help="per-extension timeout in seconds (default: none)",
    )
    p.add_argument("--node", default="node", help="node executable to use")
    p.add_argument(
        "--main-js", default=str(DEFAULT_MAIN_JS),
        help="path to the compiled dist/main.js",
    )
    p.add_argument("--feishu-webhook", default=None, help="Feishu custom-bot webhook URL")
    p.add_argument("--feishu-secret", default=None, help="Feishu custom-bot signing secret")
    p.add_argument(
        "--progress-every", type=int, default=1,
        help="send a Feishu progress card every N completed extensions",
    )
    return p


def main(argv: Optional[List[str]] = None) -> int:
    args = build_arg_parser().parse_args(argv)
    return run_batch(args)


if __name__ == "__main__":
    raise SystemExit(main())
