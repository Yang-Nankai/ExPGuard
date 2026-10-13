"""Package all 337 Ground Truth extension instances in the repository dataset layout.

Copies extension source and per-tool scan evidence from the Top5000 corpus. CRX/XPI
packages and duplicate unpacked trees are excluded; unusually large individual
source assets are listed with hashes in each extension's provenance metadata.
"""

from __future__ import annotations

import argparse
import collections
import hashlib
import json
import shutil
import struct
import zipfile
from io import BytesIO
from pathlib import Path, PurePosixPath
from typing import Any


TOOL_DIRS = {"ExPGuard": "ExPGuard-Opti", "CoCo": "CoCo", "DoubleX": "DoubleX"}
REPORTS = ("flow-verification-results.json", "flow-verification-results-no-duplicate.json")
MAX_TRACKED_FILE = 95_000_000  # GitHub rejects individual files at 100 MB.


def read_json(path: Path) -> Any:
    return json.loads(path.read_text(encoding="utf-8-sig"))


def write_json(path: Path, value: Any) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    tmp = path.with_name(path.name + ".tmp")
    tmp.write_text(json.dumps(value, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    tmp.replace(path)


def sha256(path: Path) -> str:
    hasher = hashlib.sha256()
    with path.open("rb") as stream:
        for block in iter(lambda: stream.read(1024 * 1024), b""):
            hasher.update(block)
    return hasher.hexdigest()


def extension_key(extension: dict[str, Any]) -> str:
    return f"{extension['extension_id']}_{extension['version']}"


def validated_unpack(root: Path, extension: dict[str, Any]) -> Path | None:
    expected_version = str(extension["version"])
    for tool_dir in TOOL_DIRS.values():
        base = root / tool_dir / extension["platform"] / "extensions" / extension_key(extension)
        candidate = base / "unpacked"
        manifest_path = candidate / "manifest.json"
        if manifest_path.is_file():
            try:
                manifest = read_json(manifest_path)
            except (OSError, ValueError):
                continue
            if str(manifest.get("version")) == expected_version:
                return candidate
    return None


def archive_payload(path: Path) -> bytes:
    data = path.read_bytes()
    if data[:4] != b"Cr24":
        return data
    if len(data) < 12:
        raise ValueError("Truncated CRX header")
    version = struct.unpack_from("<I", data, 4)[0]
    if version == 2:
        public_key_length, signature_length = struct.unpack_from("<II", data, 8)
        offset = 16 + public_key_length + signature_length
    elif version == 3:
        header_length = struct.unpack_from("<I", data, 8)[0]
        offset = 12 + header_length
    else:
        raise ValueError(f"Unsupported CRX format version {version}")
    if offset >= len(data):
        raise ValueError("CRX header extends beyond file length")
    return data[offset:]


def extract_from_crx(root: Path, extension: dict[str, Any], target: Path) -> bool:
    stem = extension_key(extension)
    candidates = []
    for tool_dir in TOOL_DIRS.values():
        crx_root = root / tool_dir / extension["platform"] / "extensions" / stem / "crx"
        if crx_root.is_dir():
            candidates.extend(path for path in crx_root.rglob("*") if path.is_file() and path.suffix.lower() in {".crx", ".xpi", ".zip"})
    for package in candidates:
        try:
            payload = archive_payload(package)
            with zipfile.ZipFile(BytesIO(payload)) as zf:
                manifest_info = next((item for item in zf.infolist() if PurePosixPath(item.filename).as_posix() == "manifest.json"), None)
                if not manifest_info:
                    continue
                manifest = json.loads(zf.read(manifest_info).decode("utf-8-sig"))
                if str(manifest.get("version")) != str(extension["version"]):
                    continue
                for item in zf.infolist():
                    relative = PurePosixPath(item.filename)
                    if relative.is_absolute() or ".." in relative.parts:
                        raise ValueError(f"Unsafe archive path in {package.name}")
                    destination = target.joinpath(*relative.parts)
                    if item.is_dir():
                        destination.mkdir(parents=True, exist_ok=True)
                    else:
                        destination.parent.mkdir(parents=True, exist_ok=True)
                        destination.write_bytes(zf.read(item))
                return True
        except (OSError, ValueError, zipfile.BadZipFile, json.JSONDecodeError):
            continue
    return False


def copy_file(source: Path, destination: Path, conflicts: list[str]) -> None:
    destination.parent.mkdir(parents=True, exist_ok=True)
    if destination.exists():
        if source.is_file() and sha256(source) == sha256(destination):
            return
        conflicts.append(str(destination))
        return
    shutil.copy2(source, destination)


def tree_would_conflict(source: Path, destination: Path) -> bool:
    if not destination.exists():
        return False
    for path in source.rglob("*"):
        if path.is_symlink() or not path.is_file():
            continue
        relative = path.relative_to(source)
        if relative.parts and relative.parts[0] in {"unpacked", "crx"}:
            continue
        target = destination / relative
        if target.is_file() and sha256(path) != sha256(target):
            return True
    return False


def copy_tree(source: Path, destination: Path, exclusions: list[dict[str, Any]], conflicts: list[str], prefix: str) -> None:
    for path in source.rglob("*"):
        relative = path.relative_to(source)
        if path.is_symlink():
            continue
        target = destination / relative
        if path.is_dir():
            target.mkdir(parents=True, exist_ok=True)
            continue
        if path.stat().st_size > MAX_TRACKED_FILE:
            exclusions.append({"path": f"{prefix}/{relative.as_posix()}", "size_bytes": path.stat().st_size, "sha256": sha256(path), "reason": "single_file_exceeds_github_100mb_limit"})
            continue
        copy_file(path, target, conflicts)


def load_reports(top5000: Path) -> dict[tuple[str, str, str], dict[str, Any]]:
    reports: dict[tuple[str, str, str], dict[str, Any]] = {}
    for tool, folder in TOOL_DIRS.items():
        for platform in ("chrome", "edge", "firefox"):
            for filename in REPORTS:
                path = top5000 / folder / platform / filename
                reports[(tool, platform, filename)] = read_json(path) if path.is_file() else {"extensions": []}
    return reports


def get_tool_record(data: dict[str, Any], extension: dict[str, Any]) -> dict[str, Any] | None:
    for record in data.get("extensions", []):
        if record.get("extension_id") == extension.get("extension_id") and str(record.get("version")) == str(extension.get("version")):
            return record
    return None


def build_extension(root: Path, top5000: Path, reports: dict, extension: dict[str, Any], dry_run: bool) -> dict[str, Any]:
    platform, stem = extension["platform"], extension_key(extension)
    destination = root / "datasets" / platform / stem
    flow_ids = [flow.get("ground_truth_flow_id") for flow in extension.get("flows", [])]
    tools_matched = sorted({tool for flow in extension.get("flows", []) for tool in flow.get("matched_tools", [])})
    summary: dict[str, Any] = {
        "platform": platform, "extension_id": extension["extension_id"], "version": extension["version"],
        "name": extension.get("name"), "lifecycle_status": (extension.get("latest_version_check") or {}).get("status"),
        "flow_count": len(flow_ids), "tool_count": len(tools_matched), "tools": tools_matched,
        "path": str(destination), "source_status": "pending", "copied_report_files": 0,
    }
    if dry_run:
        unpacked = validated_unpack(top5000, extension)
        summary["source_status"] = "available" if unpacked else "crx_fallback_required"
        return summary
    destination.mkdir(parents=True, exist_ok=True)
    exclusions: list[dict[str, Any]] = []
    conflicts: list[str] = []
    source_root = destination / "source"
    existing_manifest = source_root / "manifest.json"
    if existing_manifest.is_file():
        manifest = read_json(existing_manifest)
        if str(manifest.get("version")) != str(extension["version"]):
            raise ValueError(f"Existing source version conflicts with Ground Truth for {stem}")
        summary["source_status"] = "existing_source_validated"
    else:
        unpacked = validated_unpack(top5000, extension)
        if unpacked:
            copy_tree(unpacked, source_root, exclusions, conflicts, "source")
            summary["source_status"] = "copied_unpacked_source"
        elif extract_from_crx(top5000, extension, source_root):
            summary["source_status"] = "extracted_matching_crx_or_xpi"
        else:
            summary["source_status"] = "missing_source"

    per_tool: dict[str, Any] = {}
    for tool, tool_folder in TOOL_DIRS.items():
        upstream = top5000 / tool_folder / platform / "extensions" / stem
        tool_dest = destination / tool
        # The repository already contains hand-curated paper examples for a
        # small number of extensions. Preserve them verbatim and package the
        # full raw Top5000 scan beside them when the bytes differ.
        if upstream.is_dir() and tree_would_conflict(upstream, tool_dest):
            tool_dest = tool_dest / "top5000-snapshot"
        record = get_tool_record(reports[(tool, platform, REPORTS[1])], extension)
        raw_paths: dict[str, str | None] = {}
        if upstream.is_dir():
            tool_dest.mkdir(parents=True, exist_ok=True)
            for child in upstream.iterdir():
                if child.name in {"unpacked", "crx"}:
                    continue
                target = tool_dest / child.name
                if child.is_dir():
                    copy_tree(child, target, exclusions, conflicts, f"{tool}/{child.name}")
                elif child.is_file() and child.stat().st_size <= MAX_TRACKED_FILE:
                    copy_file(child, target, conflicts)
                elif child.is_file():
                    exclusions.append({"path": f"{tool}/{child.name}", "size_bytes": child.stat().st_size, "sha256": sha256(child), "reason": "single_file_exceeds_github_100mb_limit"})
        for filename in REPORTS:
            report_record = get_tool_record(reports[(tool, platform, filename)], extension)
            raw_paths[filename] = None
            if report_record:
                packaged = {"metadata": {"project": tool, "browser": platform, "scope": "single Ground Truth extension; original tool labels and indices retained", "generated_from": f"Top5000/{tool_folder}/{platform}/{filename}"}, "extensions": [report_record]}
                path = tool_dest / filename
                if path.is_file():
                    try:
                        existing = read_json(path)
                    except (OSError, ValueError):
                        existing = None
                    if existing != packaged:
                        # Preserve the earlier paper-subset file while ensuring
                        # the exact Top5000 row is separately available.
                        path = tool_dest / ("top5000-" + filename)
                write_json(path, packaged)
                raw_paths[filename] = str(path.relative_to(root / "datasets").as_posix())
                summary["copied_report_files"] += 1
        per_tool[tool] = {
            "reference_directory_present": upstream.is_dir(),
            "reference_scan_record_present": record is not None,
            "matched_ground_truth_flows": [flow.get("ground_truth_flow_id") for flow in extension.get("flows", []) if tool in flow.get("matched_tools", [])],
            "per_extension_report_paths": raw_paths,
            "tool_artifact_directory": str(tool_dest.relative_to(root / "datasets").as_posix()) if upstream.is_dir() else None,
        }
    flows_path = destination / "ground-truth-flows.json"
    flow_payload = {"schema_version": "expguard-ground-truth-flows/v1", "platform": platform,
                    "extension_id": extension["extension_id"], "version": extension["version"],
                    "flows": extension.get("flows", [])}
    if flows_path.is_file():
        if read_json(flows_path) != flow_payload:
            conflicts.append(str(flows_path))
    else:
        write_json(flows_path, flow_payload)
    info = {
        "schema_version": "expguard-ground-truth-extension/v1",
        "platform": platform,
        "extension_id": extension["extension_id"],
        "name": extension.get("name"),
        "ground_truth_version": extension["version"],
        "manifest_version": (extension.get("latest_version_check") or {}).get("manifest_version"),
        "lifecycle_status": (extension.get("latest_version_check") or {}).get("status"),
        "latest_store_version_at_review": (extension.get("latest_version_check") or {}).get("version"),
        "latest_version_checked_at_utc": (extension.get("latest_version_check") or {}).get("checked_at_utc"),
        "ground_truth_flow_count": len(flow_ids),
        "ground_truth_flow_ids": flow_ids,
        "matched_tools": tools_matched,
        "source_directory": "source" if summary["source_status"] != "missing_source" else None,
        "source_manifest_sha256": sha256(existing_manifest) if existing_manifest.is_file() else sha256(source_root / "manifest.json") if (source_root / "manifest.json").is_file() else None,
        "ground_truth_flows_file": "ground-truth-flows.json",
        "tool_evidence": per_tool,
        "oversized_assets_excluded": exclusions,
        "email_status": "see datasets/reporting/reporting-ledger.json",
        "git_upload_status": "tracked by repository commit; see datasets/reporting/reporting-ledger.json",
    }
    write_json(destination / "ground-truth-metadata.json", info)
    if conflicts:
        raise ValueError(f"Existing file conflicts while archiving {stem}: " + ", ".join(conflicts[:5]))
    return summary


def main() -> int:
    root = Path(__file__).resolve().parents[1]
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--dataset", type=Path, default=root / "datasets" / "ground-truth-dataset-780.json")
    parser.add_argument("--top5000", type=Path, default=root.parent / "ExPGuard-Data" / "Top5000")
    parser.add_argument("--limit", type=int)
    parser.add_argument("--dry-run", action="store_true")
    args = parser.parse_args()
    data = read_json(args.dataset)
    extensions = data.get("extensions", [])
    if len(extensions) != 337 or sum(len(extension.get("flows", [])) for extension in extensions) != 780:
        raise ValueError("Ground Truth input does not match the expected 337 extensions / 780 Flows")
    reports = load_reports(args.top5000.resolve())
    selected = extensions[:args.limit] if args.limit else extensions
    results = []
    for index, extension in enumerate(selected, 1):
        results.append(build_extension(root, args.top5000.resolve(), reports, extension, args.dry_run))
        if index % 20 == 0 or index == len(selected):
            print(json.dumps({"processed": index, "total": len(selected), "dry_run": args.dry_run}, ensure_ascii=False), flush=True)
    counts = collections.Counter(item["lifecycle_status"] for item in results)
    source_counts = collections.Counter(item["source_status"] for item in results)
    output = {"schema_version": "expguard-ground-truth-archive/v1", "source_dataset": str(args.dataset),
              "extension_count": len(results), "flow_count": sum(item["flow_count"] for item in results),
              "lifecycle_counts": counts, "source_counts": source_counts,
              "oversized_assets_excluded": sum(len(item.get("oversized_assets_excluded", [])) for item in results)}
    print(json.dumps(output, ensure_ascii=False, indent=2))
    if not args.dry_run:
        write_json(root / "datasets" / "ground-truth-archive-manifest.json", {**output, "extensions": results})
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
