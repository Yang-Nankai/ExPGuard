"""Run the original reporting tool(s) against every downloaded newer package.

Each (extension version, tool) run is isolated, resumable, and persisted under
datasets/updates/<platform>/<id>_<version>/revalidation/<tool>/.
On Windows, a Job Object enforces a 6 GiB aggregate memory cap over the process
and its descendants; the wrapper enforces a 600 second wall-clock limit.
"""

from __future__ import annotations

import argparse
import ctypes
import hashlib
import json
import os
import re
import shutil
import struct
import subprocess
import sys
import time
import zipfile
from ctypes import wintypes
from datetime import datetime, timezone
from pathlib import Path
from typing import Any


MAX_MEMORY_BYTES = 6 * 1024**3
TIMEOUT_SECONDS = 600
TOOLS = ("ExPGuard", "CoCo", "DoubleX")


def utc_now() -> str:
    return datetime.now(timezone.utc).replace(microsecond=0).isoformat().replace("+00:00", "Z")


def atomic_json(path: Path, data: Any) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    temp = path.with_name(path.name + ".tmp")
    temp.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    temp.replace(path)


def safe_name(value: str) -> str:
    return re.sub(r"[^A-Za-z0-9._@-]", "_", str(value))


def sha256_file(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as stream:
        for chunk in iter(lambda: stream.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def archive_payload_offset(path: Path) -> int:
    with path.open("rb") as stream:
        header = stream.read(16)
    if header[:4] != b"Cr24":
        return 0
    if len(header) < 12:
        raise ValueError("truncated CRX header")
    crx_version = struct.unpack_from("<I", header, 4)[0]
    if crx_version == 2:
        if len(header) < 16:
            raise ValueError("truncated CRX v2 header")
        public_key_len, signature_len = struct.unpack_from("<II", header, 8)
        return 16 + public_key_len + signature_len
    if crx_version == 3:
        header_len = struct.unpack_from("<I", header, 8)[0]
        return 12 + header_len
    raise ValueError(f"unsupported CRX format version {crx_version}")


def read_package_manifest(package: Path) -> dict[str, Any]:
    import io

    raw = package.read_bytes()
    raw = raw[archive_payload_offset(package):]
    with zipfile.ZipFile(io.BytesIO(raw)) as archive:
        return json.loads(archive.read("manifest.json").decode("utf-8-sig"))


def unpack_package(package: Path, destination: Path) -> None:
    import io

    if destination.exists() and (destination / "manifest.json").is_file():
        return
    destination.mkdir(parents=True, exist_ok=True)
    raw = package.read_bytes()
    raw = raw[archive_payload_offset(package):]
    root = destination.resolve()
    with zipfile.ZipFile(io.BytesIO(raw)) as archive:
        for member in archive.infolist():
            target = (destination / member.filename).resolve()
            if target != root and root not in target.parents:
                raise ValueError(f"archive member escapes extraction directory: {member.filename}")
        archive.extractall(destination)


def source_report_tools(extension: dict[str, Any]) -> list[str]:
    result: set[str] = set()
    for flow in extension.get("flows", []):
        for report in flow.get("reports", []):
            label = report.get("tool_label") or report.get("tool")
            if label in TOOLS:
                result.add(label)
    return [tool for tool in TOOLS if tool in result]


def build_tasks(dataset: dict[str, Any], updates_dir: Path) -> list[dict[str, Any]]:
    tasks: list[dict[str, Any]] = []
    for extension in dataset.get("extensions", []):
        check = extension.get("latest_version_check") or {}
        if check.get("status") != "version_changed":
            continue
        download = check.get("download") or {}
        if download.get("status") != "downloaded":
            continue
        package = Path(download.get("path", ""))
        if not package.is_absolute():
            package = updates_dir / package
        for tool in source_report_tools(extension):
            flow_ids = []
            for flow in extension.get("flows", []):
                ids = [
                    report.get("flow_id") or (report.get("flow") or {}).get("flow_id")
                    for report in flow.get("reports", [])
                    if (report.get("tool_label") or report.get("tool")) == tool
                ]
                flow_ids.append({"ground_truth_flow_id": flow.get("ground_truth_flow_id"), "source_flow_ids": [x for x in ids if x]})
            tasks.append({
                "platform": extension["platform"],
                "extension_id": extension["extension_id"],
                "dataset_version": str(extension["version"]),
                "latest_version": str(check.get("version")),
                "tool": tool,
                "package_path": str(package.resolve()),
                "package_sha256": download.get("sha256"),
                "ground_truth_flow_count": len(extension.get("flows", [])),
                "ground_truth_flows": flow_ids,
            })
    tasks.sort(key=lambda item: (item["platform"], item["extension_id"], item["tool"]))
    return tasks


def _windows_job_memory_limit() -> tuple[Any, Any]:
    """Create a Job Object handle configured for 6 GiB and kill-on-close."""
    if os.name != "nt":
        raise RuntimeError("The required process-tree memory cap is implemented for Windows only")

    class IoCounters(ctypes.Structure):
        _fields_ = [(name, ctypes.c_uint64) for name in (
            "ReadOperationCount", "WriteOperationCount", "OtherOperationCount",
            "ReadTransferCount", "WriteTransferCount", "OtherTransferCount",
        )]

    class BasicLimitInformation(ctypes.Structure):
        _fields_ = [
            ("PerProcessUserTimeLimit", ctypes.c_longlong),
            ("PerJobUserTimeLimit", ctypes.c_longlong),
            ("LimitFlags", wintypes.DWORD),
            ("MinimumWorkingSetSize", ctypes.c_size_t),
            ("MaximumWorkingSetSize", ctypes.c_size_t),
            ("ActiveProcessLimit", wintypes.DWORD),
            ("Affinity", ctypes.c_size_t),
            ("PriorityClass", wintypes.DWORD),
            ("SchedulingClass", wintypes.DWORD),
        ]

    class ExtendedLimitInformation(ctypes.Structure):
        _fields_ = [
            ("BasicLimitInformation", BasicLimitInformation),
            ("IoInfo", IoCounters),
            ("ProcessMemoryLimit", ctypes.c_size_t),
            ("JobMemoryLimit", ctypes.c_size_t),
            ("PeakProcessMemoryUsed", ctypes.c_size_t),
            ("PeakJobMemoryUsed", ctypes.c_size_t),
        ]

    kernel32 = ctypes.WinDLL("kernel32", use_last_error=True)
    kernel32.CreateJobObjectW.argtypes = [ctypes.c_void_p, wintypes.LPCWSTR]
    kernel32.CreateJobObjectW.restype = wintypes.HANDLE
    kernel32.SetInformationJobObject.argtypes = [wintypes.HANDLE, ctypes.c_int, ctypes.c_void_p, wintypes.DWORD]
    kernel32.SetInformationJobObject.restype = wintypes.BOOL
    kernel32.AssignProcessToJobObject.argtypes = [wintypes.HANDLE, wintypes.HANDLE]
    kernel32.AssignProcessToJobObject.restype = wintypes.BOOL
    kernel32.ResumeThread.argtypes = [wintypes.HANDLE]
    kernel32.ResumeThread.restype = wintypes.DWORD
    kernel32.TerminateJobObject.argtypes = [wintypes.HANDLE, wintypes.UINT]
    kernel32.TerminateJobObject.restype = wintypes.BOOL
    kernel32.CloseHandle.argtypes = [wintypes.HANDLE]
    kernel32.CloseHandle.restype = wintypes.BOOL
    job = kernel32.CreateJobObjectW(None, None)
    if not job:
        raise ctypes.WinError(ctypes.get_last_error())
    info = ExtendedLimitInformation()
    # JOB_OBJECT_LIMIT_JOB_MEMORY | JOB_OBJECT_LIMIT_KILL_ON_JOB_CLOSE
    info.BasicLimitInformation.LimitFlags = 0x00000200 | 0x00002000
    info.JobMemoryLimit = MAX_MEMORY_BYTES
    if not kernel32.SetInformationJobObject(job, 9, ctypes.byref(info), ctypes.sizeof(info)):
        error = ctypes.get_last_error()
        kernel32.CloseHandle(job)
        raise ctypes.WinError(error)
    return kernel32, job


def run_capped(command: list[str], cwd: Path, stdout_path: Path, stderr_path: Path) -> dict[str, Any]:
    kernel32, job = _windows_job_memory_limit()
    process: subprocess.Popen[bytes] | None = None
    started = time.monotonic()
    try:
        with stdout_path.open("wb") as stdout_stream, stderr_path.open("wb") as stderr_stream:
            process = subprocess.Popen(
                command,
                cwd=str(cwd),
                stdin=subprocess.DEVNULL,
                stdout=stdout_stream,
                stderr=stderr_stream,
                creationflags=0x00000004 | 0x08000000,  # CREATE_SUSPENDED | CREATE_NO_WINDOW
            )
            if not kernel32.AssignProcessToJobObject(job, wintypes.HANDLE(process._handle)):
                error = ctypes.get_last_error()
                process.kill()
                process.wait()
                raise ctypes.WinError(error)
            ntdll = ctypes.WinDLL("ntdll", use_last_error=True)
            ntdll.NtResumeProcess.argtypes = [wintypes.HANDLE]
            ntdll.NtResumeProcess.restype = ctypes.c_long
            resume_status = ntdll.NtResumeProcess(wintypes.HANDLE(process._handle))
            if resume_status != 0:
                kernel32.TerminateJobObject(job, 1)
                process.wait()
                raise OSError(f"NtResumeProcess failed with NTSTATUS 0x{resume_status & 0xffffffff:08x}")
            try:
                return_code = process.wait(timeout=TIMEOUT_SECONDS)
                status = "completed" if return_code == 0 else "failed"
            except subprocess.TimeoutExpired:
                kernel32.TerminateJobObject(job, 124)
                process.wait(timeout=30)
                return_code = process.returncode
                status = "timeout"
    finally:
        kernel32.CloseHandle(job)
    return {
        "status": status,
        "return_code": return_code,
        "duration_seconds": round(time.monotonic() - started, 3),
        "memory_limit_bytes": MAX_MEMORY_BYTES,
        "timeout_seconds": TIMEOUT_SECONDS,
        "memory_limit_enforcement": "Windows Job Object (process tree)",
    }


def tool_command(tool: str, package: Path, platform: str, extension_id: str, version: str,
                 output_dir: Path, unpacked_dir: Path, temp_dir: Path,
                 expguard_root: Path, coco_root: Path, doublex_root: Path) -> tuple[list[str], Path, Path | None]:
    python = sys.executable
    if tool == "ExPGuard":
        package_type = "XPI" if package.suffix.lower() == ".xpi" else "CRX"
        return (["node", str(expguard_root / "dist" / "main.js"), "analyze", "--type", package_type,
                 "--input", str(package), "--out", str(output_dir), "--id", extension_id,
                 "--extension-version", version], expguard_root, output_dir / "report.flows.json")
    if tool == "CoCo":
        return ([python, str(coco_root / "coco_analyze.py"), "--input", str(unpacked_dir),
                 "--out", str(output_dir), "--timeout-seconds", str(TIMEOUT_SECONDS)],
                coco_root, output_dir / "report.flows.json")
    if tool == "DoubleX":
        return ([python, str(doublex_root / "src" / "analyze_crx.py"), "--crx", str(package),
                 "--out", str(output_dir), "--tmp", str(temp_dir)],
                doublex_root, output_dir / "report.flows.json")
    raise ValueError(f"unknown tool: {tool}")


def main() -> int:
    root = Path(__file__).resolve().parents[1]
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--dataset", type=Path, default=root / "datasets" / "ground-truth-dataset-780.json")
    parser.add_argument("--updates-dir", type=Path, default=root / "datasets" / "updates")
    parser.add_argument("--limit", type=int, help="run only the first N jobs")
    parser.add_argument("--retry-failed", action="store_true")
    args = parser.parse_args()

    dataset_path = args.dataset.resolve()
    updates_dir = args.updates_dir.resolve()
    expguard_root = root
    coco_root = root.parent / "ExPGuard-Ablation" / "CoCo"
    doublex_root = root.parent / "ExPGuard-Ablation" / "DoubleX"
    jobs_path = updates_dir / "revalidation" / "jobs.json"
    dataset = json.loads(dataset_path.read_text(encoding="utf-8-sig"))
    tasks = build_tasks(dataset, updates_dir)
    if args.limit is not None:
        tasks = tasks[:args.limit]

    state = {"schema_version": 1, "started_at_utc": utc_now(), "updated_at_utc": utc_now(),
             "limits": {"memory_bytes_per_tool_process_tree": MAX_MEMORY_BYTES,
                        "timeout_seconds_per_job": TIMEOUT_SECONDS}, "jobs": []}
    if jobs_path.exists():
        previous = json.loads(jobs_path.read_text(encoding="utf-8-sig"))
        state["jobs"] = previous.get("jobs", [])
        state["started_at_utc"] = previous.get("started_at_utc", state["started_at_utc"])
    by_key = {j.get("job_key"): j for j in state["jobs"]}

    for task_index, task in enumerate(tasks, start=1):
        key = "__".join(safe_name(task[k]) for k in ("platform", "extension_id", "latest_version", "tool"))
        previous = by_key.get(key)
        if previous and previous.get("status") in {"completed", "failed", "timeout", "input_validation_failed"} and not (args.retry_failed and previous.get("status") != "completed"):
            continue
        package = Path(task["package_path"])
        result_root = (updates_dir / task["platform"] / f"{safe_name(task['extension_id'])}_{safe_name(task['latest_version'])}" /
                       "revalidation" / task["tool"])
        attempt = int((previous or {}).get("attempt", 0)) + 1
        output_dir = result_root / f"attempt-{attempt:02d}"
        if output_dir.exists() and any(output_dir.iterdir()):
            attempt += 1
            output_dir = result_root / f"attempt-{attempt:02d}"
        result_root.mkdir(parents=True, exist_ok=True)
        log_dir = result_root / "logs"
        log_dir.mkdir(parents=True, exist_ok=True)
        unpacked_dir = (updates_dir / task["platform"] / f"{safe_name(task['extension_id'])}_{safe_name(task['latest_version'])}" /
                        "unpacked")
        temp_dir = result_root / f"tmp-attempt-{attempt:02d}"
        temp_dir.mkdir(parents=True, exist_ok=True)

        history = list((previous or {}).get("attempt_history", []))
        if previous:
            history.append({k: previous[k] for k in (
                "attempt", "status", "started_at_utc", "finished_at_utc", "duration_seconds", "error", "result_dir"
            ) if k in previous})
        job = {**task, "job_key": key, "attempt": attempt, "attempt_history": history, "status": "running",
               "started_at_utc": utc_now(), "result_dir": str(output_dir.resolve())}
        by_key[key] = job
        state["jobs"] = [by_key[k] for k in sorted(by_key)]
        state["updated_at_utc"] = utc_now()
        atomic_json(jobs_path, state)
        print(f"[{task_index}/{len(tasks)}] START {task['tool']} {task['platform']} {task['extension_id']} {task['latest_version']}", flush=True)

        try:
            if not package.is_file():
                raise FileNotFoundError(f"downloaded package missing: {package}")
            package_manifest = read_package_manifest(package)
            manifest_version = str(package_manifest.get("version", ""))
            if task.get("package_sha256") and sha256_file(package) != task["package_sha256"]:
                raise ValueError("downloaded package SHA-256 changed since lookup record")
            unpack_package(package, unpacked_dir)
            command, cwd, expected_report = tool_command(
                task["tool"], package, task["platform"], task["extension_id"], task["latest_version"],
                output_dir, unpacked_dir, temp_dir, expguard_root, coco_root, doublex_root,
            )
            result = run_capped(command, cwd, log_dir / f"attempt-{attempt:02d}.stdout.log",
                                log_dir / f"attempt-{attempt:02d}.stderr.log")
            report_valid = False
            report_error = None
            if expected_report and expected_report.is_file():
                try:
                    report = json.loads(expected_report.read_text(encoding="utf-8-sig"))
                    report_valid = isinstance(report, dict) and isinstance(report.get("flows"), list)
                    if not report_valid:
                        report_error = "report.flows.json missing a flows array"
                except Exception as exc:
                    report_error = f"{type(exc).__name__}: {exc}"
            result["command"] = command
            result["working_directory"] = str(cwd)
            result["expected_report"] = str(expected_report) if expected_report else None
            result["report_valid"] = report_valid
            summary_path = output_dir / "summary.json"
            if summary_path.is_file():
                tool_summary = json.loads(summary_path.read_text(encoding="utf-8-sig"))
                result["tool_summary_status"] = tool_summary.get("status")
                result["tool_summary_path"] = str(summary_path)
                if result["status"] == "completed" and tool_summary.get("status") not in {"success", "completed", "ok"}:
                    result["status"] = "failed"
                    result["error"] = f"Tool summary status was {tool_summary.get('status')!r}; analysis did not fully succeed."
            if report_error:
                result["report_error"] = report_error
            if result["status"] == "completed" and not report_valid:
                result["status"] = "failed"
                result["error"] = "tool exited successfully but emitted no valid report"
            job.update(result)
            job["package_manifest_version"] = manifest_version
            job["package_manifest_mv"] = package_manifest.get("manifest_version")
            job["package_manifest_version_matches_store_label"] = manifest_version == task["latest_version"]
            job["package_version_name"] = package_manifest.get("version_name")
            job["package_version_or_name_matches_store_label"] = task["latest_version"] in {
                manifest_version, str(package_manifest.get("version_name", ""))
            }
            if manifest_version != task["latest_version"]:
                job["package_version_note"] = (
                    "The store's displayed version label differs from manifest.json; the downloaded archive "
                    "was fetched from the store update URL for this exact extension ID and its SHA-256 was verified."
                )
            job["finished_at_utc"] = utc_now()
        except Exception as exc:
            job.update({"status": "input_validation_failed", "error": f"{type(exc).__name__}: {exc}",
                        "finished_at_utc": utc_now(), "memory_limit_bytes": MAX_MEMORY_BYTES,
                        "timeout_seconds": TIMEOUT_SECONDS})
        by_key[key] = job
        state["jobs"] = [by_key[k] for k in sorted(by_key)]
        state["updated_at_utc"] = utc_now()
        atomic_json(jobs_path, state)
        print(f"[{task_index}/{len(tasks)}] {job['status'].upper()} {task['tool']} {task['extension_id']} "
              f"{job.get('duration_seconds', 0)}s", flush=True)

    state["updated_at_utc"] = utc_now()
    state["complete"] = all(
        by_key.get("__".join(safe_name(task[k]) for k in ("platform", "extension_id", "latest_version", "tool")), {}).get("status")
        in {"completed", "failed", "timeout", "input_validation_failed"}
        for task in build_tasks(dataset, updates_dir)
    )
    state["job_counts"] = {}
    for job in state["jobs"]:
        state["job_counts"][job.get("status", "unknown")] = state["job_counts"].get(job.get("status", "unknown"), 0) + 1
    atomic_json(jobs_path, state)
    print(json.dumps({k: state[k] for k in ("complete", "job_counts", "updated_at_utc")}, ensure_ascii=False, indent=2))
    return 0 if state["complete"] else 1


if __name__ == "__main__":
    raise SystemExit(main())
