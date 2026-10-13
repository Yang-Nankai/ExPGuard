"""Check the latest store version for every extension in the ground-truth JSON.

This uses the ID-based crawler extracted to extspider_by_id.py. Only packages
whose store version differs from the ground-truth version are downloaded.
Every lookup is written to datasets/updates/lookups and copied into the source
dataset so the refresh can be resumed after interruptions.
"""

from __future__ import annotations

import argparse
import hashlib
import json
import re
import sys
import time
import zipfile
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

from extspider_by_id import DETAIL_LOOKUP, LookupNotFound, archive_extension


def utc_now() -> str:
    return datetime.now(timezone.utc).replace(microsecond=0).isoformat().replace("+00:00", "Z")


def atomic_write_json(path: Path, value: Any) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    temp = path.with_name(path.name + ".tmp")
    temp.write_text(json.dumps(value, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    temp.replace(path)


def safe_name(value: str) -> str:
    return re.sub(r"[^A-Za-z0-9._@-]", "_", value)


def sha256_file(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as stream:
        for chunk in iter(lambda: stream.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def read_archive_manifest(path: Path) -> dict[str, Any] | None:
    try:
        raw = path.read_bytes()
        if raw[:4] == b"Cr24":
            if len(raw) < 12:
                return None
            version = int.from_bytes(raw[4:8], "little")
            if version == 2:
                if len(raw) < 16:
                    return None
                public_key_length = int.from_bytes(raw[8:12], "little")
                signature_length = int.from_bytes(raw[12:16], "little")
                offset = 16 + public_key_length + signature_length
            else:
                header_length = int.from_bytes(raw[8:12], "little")
                offset = 12 + header_length
            raw = raw[offset:]
        import io
        with zipfile.ZipFile(io.BytesIO(raw)) as archive:
            return json.loads(archive.read("manifest.json").decode("utf-8-sig"))
    except (OSError, ValueError, KeyError, zipfile.BadZipFile):
        return None


def main() -> int:
    project_root = Path(__file__).resolve().parents[1]
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--dataset", type=Path, default=project_root / "datasets" / "ground-truth-dataset-780.json")
    parser.add_argument("--updates-dir", type=Path, default=project_root / "datasets" / "updates")
    parser.add_argument("--retry-errors", action="store_true", help="retry previous lookup errors; other records are reused")
    parser.add_argument("--limit", type=int, help="optional small batch for a dry run")
    args = parser.parse_args()

    dataset_path = args.dataset.resolve()
    updates_dir = args.updates_dir.resolve()
    dataset = json.loads(dataset_path.read_text(encoding="utf-8-sig"))
    started = utc_now()
    counts = {key: 0 for key in ("same_version", "version_changed", "delisted", "lookup_failed", "download_failed")}
    processed = 0

    extensions = sorted(
        dataset["extensions"],
        key=lambda item: (item["platform"], item["extension_id"], str(item["version"])),
    )
    if args.limit is not None:
        extensions = extensions[:args.limit]

    for index, extension in enumerate(extensions, start=1):
        platform = extension["platform"]
        extension_id = extension["extension_id"]
        current_version = str(extension["version"])
        state = extension.get("latest_version_check") or {}
        if state.get("status") in {"same_version", "version_changed", "delisted"}:
            # Keep successful results stable across interrupted/resumed runs.
            continue
        if state.get("status") == "lookup_failed" and not args.retry_errors:
            counts["lookup_failed"] += 1
            continue

        processed += 1
        result_base = {
            "checked_at_utc": utc_now(),
            "platform": platform,
            "extension_id": extension_id,
            "dataset_version": current_version,
            "proxy": "http://127.0.0.1:7897",
        }
        try:
            detail = DETAIL_LOOKUP[platform](extension_id)
            store_version = str(detail["version"])
            if store_version == current_version:
                status = "same_version"
            else:
                status = "version_changed"
            detail["queried_at_utc"] = result_base["checked_at_utc"]
            detail["proxy"] = result_base["proxy"]
            detail["dataset_version"] = current_version
            detail["version_matches_dataset"] = status == "same_version"
            if status == "version_changed":
                try:
                    detail = archive_extension(detail, updates_dir)
                    package_path = Path(detail["download"]["path"])
                    manifest = read_archive_manifest(package_path)
                    detail["download"]["sha256"] = sha256_file(package_path)
                    detail["download"]["manifest_version"] = manifest.get("manifest_version") if manifest else None
                    detail["download"]["manifest_package_version"] = manifest.get("version") if manifest else None
                    detail["download"]["archive_manifest_version_matches_store"] = (
                        str(manifest.get("version")) == store_version if manifest else None
                    )
                except Exception as exc:
                    detail["download"] = {
                        "status": "failed",
                        "error": f"{type(exc).__name__}: {exc}",
                    }
                    counts["download_failed"] += 1
            record = {**result_base, **detail, "status": status}
            if status == "same_version":
                counts["same_version"] += 1
            else:
                counts["version_changed"] += 1
        except LookupNotFound as exc:
            status = "delisted"
            record = {**result_base, "status": "delisted", "error": str(exc)}
            counts["delisted"] += 1
        except Exception as exc:
            status = "lookup_failed"
            record = {**result_base, "status": "lookup_failed", "error": f"{type(exc).__name__}: {exc}"}
            counts["lookup_failed"] += 1

        extension["latest_version_check"] = record
        lookup_path = updates_dir / "lookups" / platform / f"{safe_name(extension_id)}_{safe_name(current_version)}.json"
        atomic_write_json(lookup_path, record)
        record["lookup_record_path"] = str(lookup_path.resolve())
        extension["latest_version_check"] = record
        dataset["version_refresh"] = {
            "started_at_utc": started,
            "updated_at_utc": utc_now(),
            "proxy": "http://127.0.0.1:7897",
            "processed_this_run": processed,
            "lookup_counts_this_run": dict(counts),
            "total_extensions": len(dataset["extensions"]),
            "complete": all(
                (ext.get("latest_version_check") or {}).get("status") in {"same_version", "version_changed", "delisted"}
                for ext in dataset["extensions"]
            ),
        }
        atomic_write_json(dataset_path, dataset)

        if status == "version_changed":
            download_status = (record.get("download") or {}).get("status")
            print(
                f"[{index}/{len(extensions)}] UPDATED {platform} {extension_id} "
                f"{current_version} -> {record['version']} download={download_status}",
                flush=True,
            )
        elif status == "delisted":
            print(f"[{index}/{len(extensions)}] DELISTED {platform} {extension_id}@{current_version}", flush=True)
        elif status == "lookup_failed":
            print(f"[{index}/{len(extensions)}] ERROR {platform} {extension_id}: {record['error']}", flush=True)
        elif index % 20 == 0:
            print(f"[{index}/{len(extensions)}] checked; {counts}", flush=True)

    dataset["version_refresh"] = {
        "started_at_utc": started,
        "updated_at_utc": utc_now(),
        "proxy": "http://127.0.0.1:7897",
        "processed_this_run": processed,
        "lookup_counts_this_run": dict(counts),
        "total_extensions": len(dataset["extensions"]),
        "complete": all(
            (ext.get("latest_version_check") or {}).get("status") in {"same_version", "version_changed", "delisted"}
            for ext in dataset["extensions"]
        ),
    }
    atomic_write_json(dataset_path, dataset)
    print(json.dumps(dataset["version_refresh"], ensure_ascii=False, indent=2))
    return 0 if dataset["version_refresh"]["complete"] else 1


if __name__ == "__main__":
    sys.path.insert(0, str(Path(__file__).resolve().parent))
    sys.exit(main())
