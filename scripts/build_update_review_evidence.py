"""Prepare original/new source evidence for reviewing only the 780 baseline Flows.

This script extracts evidence and writes no vulnerability verdicts. Code equality
and API-category matches are evidence for an analyst, not a security judgment.
"""
from __future__ import annotations

import argparse
import hashlib
import json
import re
from functools import lru_cache
from pathlib import Path

from assess_updated_flows import job_key, load_json, new_flow_pairs
from run_update_revalidation import unpack_package, read_package_manifest, safe_name


@lru_cache(maxsize=1024)
def read_text(path: str) -> str:
    return Path(path).read_text(encoding="utf-8-sig", errors="replace")


def find_script(root: Path, file: str | None) -> Path | None:
    if not file:
        return None
    file = file.replace("\\", "/").split("?")[0].lstrip("/")
    while file.startswith("../"):
        file = file[3:]
    trials = [root / file, root / (file + ".js"), root / (file + ".mjs")]
    for trial in trials:
        if trial.is_file():
            return trial
    basename = Path(file).name
    names = {basename, basename + ".js", basename + ".mjs"}
    candidates = [p for p in root.rglob("*") if p.is_file() and p.name in names
                  and "opgen_generated_files" not in p.parts]
    if len(candidates) == 1:
        return candidates[0]
    return None


def snippet_at(path: Path | None, loc: str | None, radius: int = 260) -> str | None:
    if not path or not loc:
        return None
    match = re.search(r"L(\d+)(?::C(\d+))?", loc)
    if not match:
        return None
    text = read_text(str(path))
    lines = text.splitlines(keepends=True)
    line = int(match.group(1)) - 1
    col = int(match.group(2) or 1) - 1
    if line >= len(lines):
        return None
    pos = sum(len(s) for s in lines[:line]) + col
    return text[max(0, pos - radius):min(len(text), pos + radius)]


def endpoint_pairs(report: dict) -> list[dict]:
    return new_flow_pairs("baseline", report)


def choose_old_pair(report: dict, baseline: dict) -> dict | None:
    pairs = endpoint_pairs(report)
    source, sink = baseline.get("source", {}), baseline.get("sink", {})
    pairs = [p for p in pairs if p.get("source_type") == source.get("type") and p.get("sink_type") == sink.get("type")]
    if not pairs:
        return None
    def score(p):
        total = 0
        for key, old in (("source", source), ("sink", sink)):
            for prop, weight in (("loc", 8), ("file", 4), ("remark", 6)):
                if old.get(prop) is not None and old.get(prop) == (p.get(key) or {}).get(prop):
                    total += weight
        return total
    return max(pairs, key=score)


def marked_code(value: str | None) -> str | None:
    if not value:
        return None
    marks = re.findall("»(.*?)«", value, re.S)
    if marks:
        return marks[0]
    return value if len(value) < 400 and "<pdg_js." not in value else None


def endpoint_evidence(endpoint: dict, original: dict, old_root: Path, new_root: Path) -> dict:
    old_path = find_script(old_root, original.get("file") or endpoint.get("file"))
    new_path = find_script(new_root, original.get("file") or endpoint.get("file"))
    result = {"original_file": str(old_path) if old_path else None,
              "new_file": str(new_path) if new_path else None,
              "original_report_code": endpoint.get("code"),
              "original_loc": original.get("loc"),
              "original_source_excerpt": snippet_at(old_path, original.get("loc"))}
    if old_path and new_path:
        a, b = old_path.read_bytes(), new_path.read_bytes()
        result.update({"original_sha256": hashlib.sha256(a).hexdigest(),
                       "new_sha256": hashlib.sha256(b).hexdigest(),
                       "entire_file_identical": a == b})
        excerpt = result.get("original_source_excerpt")
        new_text = read_text(str(new_path))
        result["original_local_context_found_exactly_in_new_file"] = bool(excerpt and excerpt in new_text)
    code = marked_code(endpoint.get("code"))
    result["original_marked_expression"] = code
    if new_path and code and len(code) >= 8:
        text = read_text(str(new_path))
        pos = text.find(code)
        result["expression_found_in_new_file"] = pos >= 0
        if pos >= 0:
            result["new_source_excerpt"] = text[max(0,pos-260):pos+len(code)+260]
            result["expression_occurrence_count"] = text.count(code)
            # A generic API call can occur many times. Keep all nearby contexts
            # instead of presenting its first occurrence as the original Flow.
            positions = [m.start() for m in re.finditer(re.escape(code), text)][:25]
            result["new_expression_contexts"] = [
                {"offset": p, "excerpt": text[max(0,p-180):p+len(code)+180]}
                for p in positions
            ]
    return result


def manifest_security(manifest: dict) -> dict:
    fields = ("manifest_version", "permissions", "optional_permissions", "host_permissions",
              "optional_host_permissions", "externally_connectable", "content_scripts", "background",
              "web_accessible_resources", "content_security_policy")
    return {field: manifest.get(field) for field in fields}


def main() -> int:
    root = Path(__file__).resolve().parents[1]
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--dataset", type=Path, default=root/"datasets/ground-truth-dataset-780.json")
    parser.add_argument("--source-root", type=Path, default=root.parent/"ExPGuard-Data/Top5000")
    parser.add_argument("--out", type=Path, default=root/"datasets/updates/revalidation/source-review-evidence.json")
    args = parser.parse_args()
    dataset = load_json(args.dataset)
    jobs = load_json(root/"datasets/updates/revalidation/jobs.json")
    by_key = {job["job_key"]: job for job in jobs["jobs"]}
    cache = {}
    baseline_roots = {}
    extensions = []
    for extension in dataset["extensions"]:
        check = extension["latest_version_check"]
        if check["status"] != "version_changed":
            continue
        new_root = Path(check["download"]["path"]).parent/"unpacked"
        entry = {key:extension.get(key) for key in ("platform","extension_id","version","name")}
        entry.update({"new_version": check["version"], "flows": []})
        new_manifest = load_json(new_root/"manifest.json") if (new_root/"manifest.json").exists() else {}
        for flow in extension["flows"]:
            flow_entry = {"ground_truth_flow_id": flow["ground_truth_flow_id"], "tool_reports": []}
            for record in flow["reports"]:
                baseline = record["flow"]
                old_ext = args.source_root/record["tool"]/extension["platform"]/"extensions"/(extension["extension_id"]+"_"+extension["version"])
                identity = (extension["platform"],extension["extension_id"],extension["version"])
                if identity not in baseline_roots:
                    directories = [old_ext] + [args.source_root/t/extension["platform"]/"extensions"/(extension["extension_id"]+"_"+extension["version"])
                                              for t in ("ExPGuard-Opti","CoCo","DoubleX")]
                    packages = [p for directory in directories for folder in ("crx","source/extension")
                                for p in (directory/folder).glob("*") if p.suffix.lower() in (".crx",".xpi")]
                    baseline_root, baseline_archive = old_ext/"unpacked", None
                    for package in packages:
                        try:
                            if str(read_package_manifest(package).get("version"))!=extension["version"]:
                                continue
                            target = root/"datasets/updates/baseline"/extension["platform"]/(safe_name(extension["extension_id"])+"_"+safe_name(extension["version"]))
                            unpack_package(package,target)
                            baseline_root, baseline_archive = target, package
                            break
                        except Exception:
                            continue
                    baseline_roots[identity] = (baseline_root,baseline_archive)
                baseline_root,baseline_archive = baseline_roots[identity]
                report_path = old_ext/"source/report.flows.json"
                if str(report_path) not in cache:
                    cache[str(report_path)] = load_json(report_path) if report_path.exists() else {"flows":[]}
                pair = choose_old_pair(cache[str(report_path)], baseline) or {}
                for endpoint_name in ("source", "sink"):
                    old_endpoint = pair.get(endpoint_name) or {}
                    old_endpoint["actual_source_excerpt"] = snippet_at(
                        find_script(baseline_root, old_endpoint.get("file")), old_endpoint.get("loc"))
                key = job_key(extension["platform"], extension["extension_id"], check["version"], record["tool_label"])
                job = by_key.get(key, {})
                new_report = load_json(Path(job["expected_report"])) if job.get("report_valid") and Path(job["expected_report"]).exists() else {"flows":[]}
                candidates = [p for p in new_flow_pairs(record["tool_label"],new_report)
                              if p["source_type"] == baseline["source"]["type"] and p["sink_type"] == baseline["sink"]["type"]]
                for candidate in candidates:
                    for endpoint_name in ("source", "sink"):
                        endpoint = candidate.get(endpoint_name) or {}
                        endpoint["actual_source_excerpt"] = snippet_at(
                            find_script(new_root, endpoint.get("file")), endpoint.get("loc"))
                        old_endpoint = pair.get(endpoint_name) or {}
                        if "actual_source_excerpt" not in old_endpoint:
                            old_endpoint["actual_source_excerpt"] = snippet_at(
                                find_script(baseline_root, old_endpoint.get("file")), old_endpoint.get("loc"))
                manifest_path = next((p for p in [baseline_root/"manifest.json"] + [old_ext/p for p in ("unpacked/manifest.json","crx/manifest.json","source/manifest.json")]
                                      if p.exists()), None)
                old_manifest = load_json(manifest_path) if manifest_path else {}
                old_security, new_security = manifest_security(old_manifest), manifest_security(new_manifest)
                report_entry = {"tool":record["tool_label"], "original_flow_id":record["flow_id"],
                                "run_status":job.get("status","not_run"), "source_type":baseline["source"]["type"],
                                "sink_type":baseline["sink"]["type"],"sink_remark":baseline["sink"].get("remark"),
                                "original_report_path":str(report_path), "new_report_path":job.get("expected_report"),
                                "original_report_exists": report_path.is_file(),
                                "new_report_exists": bool(job.get("expected_report") and Path(job["expected_report"]).is_file()),
                                "old_report_pair":pair, "candidate_pairs":candidates,
                                "baseline_source_root":str(baseline_root),"baseline_archive":str(baseline_archive) if baseline_archive else None,
                                "original_manifest_path":str(manifest_path) if manifest_path else None,
                                "original_security_manifest":old_security,"new_security_manifest":new_security,
                                "source_evidence":endpoint_evidence(pair.get("source") or {},baseline["source"],baseline_root,new_root),
                                "sink_evidence":endpoint_evidence(pair.get("sink") or {},baseline["sink"],baseline_root,new_root),
                                "security_manifest_changes":{k:{"old":old_security[k],"new":new_security[k]} for k in old_security if old_security[k]!=new_security[k]},
                                "original_verification_reasoning":(baseline.get("static") or {}).get("reasoning"),
                                "original_dynamic_reasoning":(baseline.get("dynamic_detail") or {}).get("reasoning")}
                flow_entry["tool_reports"].append(report_entry)
            entry["flows"].append(flow_entry)
        extensions.append(entry)
    args.out.parent.mkdir(parents=True,exist_ok=True)
    args.out.write_text(json.dumps({"schema_version":1,"evidence_only":True,"extensions":extensions},ensure_ascii=False,indent=2),encoding="utf-8")
    print(f"Evidence prepared for {len(extensions)} extensions and {sum(len(e['flows']) for e in extensions)} original flows: {args.out}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
