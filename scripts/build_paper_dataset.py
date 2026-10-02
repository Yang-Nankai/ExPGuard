"""Export the requested, confirmed subset of the paper's Top5000 reference set.

Existing output is never overwritten. Reports and labels are copied, not rerun
or re-adjudicated. Run --verify to check every packaged file against its hash.
"""
import argparse
import collections
import csv
import hashlib
import json
from pathlib import Path
import shutil

REQUESTED = {
    "ekmeppjgajofkpiofbebgcbohbmfldaf": "2.0.14",
    "gmmkjpcadciiokjpikmkkmapphbmdjok": "1.2",
    "cplhlgabfijoiabgkigdafklbhhdkahj": "1.0.165",
    "bnompdfnhdbgdaoanapncknhmckenfog": "5.0.53",
    "inehghpkjjjdgpnagcbogckbonilnidc": "8.0.8",
    "ogdlpmhglpejoiomcodnpjnfgcpmgale": "3.5.2",
    "aicmkgpgakddgnaphhhpliifpcfhicfo": "3.2.1",
    "lhannfkhjdhmibllojbbdjdbpegidojj": "1.5.2",
    "fjnbnpbmkenffdnngjfgmeleoegfcffe": "3.4.14",
    "amfojhdiedpdnlijjbhjnhokbnohfdfb": "7.1.36",
    "ljmaegmnepbgjekghdfkgegbckolmcok": "8.14.0.0",
    "lghkdmpjndggpffgahogcopicpednbgm": "2.4.4",
}
TOOLS = ("DoubleX", "CoCo", "ExPGuard-Opti")
PLATFORMS = ("chrome", "edge", "firefox")
TYPES = {
    "PRIVILEGE_ESCALATION": "Privilege Execution",
    "STORAGE_POSOING": "Storage Poisoning",  # Existing ExPGuard spelling.
    "STORAGE_POISONING": "Storage Poisoning",
    "REQUEST_FORGERY": "Request Forgery",
    "DATA_LEAK": "Data Leak",
}
REPORTS = ("flow-verification-results.json", "flow-verification-results-no-duplicate.json")


def read(path):
    return json.loads(path.read_text(encoding="utf-8-sig"))


def write(path, obj):
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(obj, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")


def sha(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def qualifying(entry):
    return [f for f in entry["flows"] if f["verification"] == "TP"
            and not f.get("is_duplicate") and f["flow_type"] in TYPES]


def build(args):
    root, out = args.top5000.resolve(), args.output.resolve()
    if out.exists():
        raise SystemExit(f"Refusing to overwrite existing dataset: {out}")
    reports = {(t, p, r): read(root / t / p / r)
               for t in TOOLS for p in PLATFORMS for r in REPORTS}
    with args.catalog.open(encoding="utf-8-sig", newline="") as handle:
        catalog = [row for row in csv.DictReader(handle) if row["extension_id"] in REQUESTED]
    selected, decisions = [], []
    for ext_id, requested_version in REQUESTED.items():
        candidates = collections.defaultdict(list)
        for (tool, platform, report), data in reports.items():
            if report != REPORTS[1]:
                continue
            for entry in data["extensions"]:
                if entry["extension_id"] == ext_id:
                    candidates[(platform, entry["version"])].append((tool, entry))
        eligible = [(key, entries) for key, entries in candidates.items()
                    if any(qualifying(e) for _, e in entries)
                    and all(e.get("manifest_version") == 3 for _, e in entries)]
        exact = [(key, entries) for key, entries in eligible if key[1] == requested_version]
        chosen = exact or (eligible if args.allow_verified_version else [])
        decision = {"extension_id": ext_id, "requested_version": requested_version,
                    "catalog_versions": [{k: row[k] for k in ("platform", "version", "manifest_version", "rank", "name")}
                                         for row in catalog if row["extension_id"] == ext_id],
                    "reported_versions": [{"platform": key[0], "version": key[1],
                                           "confirmed_paper_flows": sum(len(qualifying(e)) for _, e in entries),
                                           "labels": dict(collections.Counter(f["verification"] for _, e in entries for f in e["flows"]))}
                                          for key, entries in candidates.items()]}
        if not chosen:
            decision.update(included=False, reason="No eligible confirmed MV3 flow in the current reference reports" if not eligible
                            else "Eligible version differs from the requested version")
        else:
            decision.update(included=True, selected_versions=[{"platform": k[0], "version": k[1]} for k, _ in chosen])
            for (platform, version), entries in chosen:
                key = f"{ext_id}_{version}"
                source_tool = next((t for t, e in entries if qualifying(e) and (root / t / platform / "extensions" / key / "unpacked" / "manifest.json").is_file()), None)
                if source_tool is None:
                    raise ValueError(f"Confirmed extension has no source package: {key}")
                src = root / source_tool / platform / "extensions" / key / "unpacked"
                manifest = read(src / "manifest.json")
                if manifest["version"] != version or manifest["manifest_version"] != 3:
                    raise ValueError(f"Manifest mismatch: {src}")
                dest = out / "extensions" / platform / key
                shutil.copytree(src, dest / "unpacked")
                item = {"extension_id": ext_id, "platform": platform, "version": version,
                        "requested_version": requested_version, "name": entries[0][1].get("name"),
                        "source_tool": source_tool, "source_path": src.relative_to(root).as_posix(),
                        "manifest_sha256": sha(src / "manifest.json"),
                        "confirmed_types": sorted({TYPES[f["flow_type"]] for _, e in entries for f in qualifying(e)}),
                        "tools": {}}
                for tool in TOOLS:
                    tool_dir = dest / "reports" / tool
                    upstream = root / tool / platform / "extensions" / key
                    entry = next((e for t, e in entries if t == tool), None)
                    availability = {"tool": tool, "platform": platform, "extension_id": ext_id, "version": version,
                                    "reference_entry_present": entry is not None,
                                    "source_report_present": (upstream / "source").is_dir(),
                                    "status": "present" if entry else "not_present_in_current_reference",
                                    "note": "Missing entry is not a negative scan result; no report or zero-flow verdict is fabricated."}
                    write(tool_dir / "availability.json", availability)
                    if (upstream / "source").is_dir():
                        shutil.copytree(upstream / "source", tool_dir / "source")
                    # Preserve adjudication reports, without copying browser profiles or transcripts.
                    for phase in ("static", "dynamic"):
                        report = upstream / phase / f"{phase}_report.json"
                        if report.is_file():
                            (tool_dir / phase).mkdir(parents=True, exist_ok=True)
                            shutil.copy2(report, tool_dir / phase / report.name)
                    for report in REPORTS:
                        record = next((e for e in reports[tool, platform, report]["extensions"]
                                       if e["extension_id"] == ext_id and e["version"] == version), None)
                        if record:
                            write(tool_dir / report, {"metadata": {"project": tool, "browser": platform,
                                  "scope": "single extension subset; original labels and flow indices retained"},
                                  "extensions": [record]})
                    item["tools"][tool] = {**availability,
                        "confirmed_flow_ids": [f["flow_id"] for f in qualifying(entry)] if entry else []}
                write(dest / "metadata.json", item)
                selected.append(item)
        decisions.append(decision)
    selected_keys = {(e["platform"], e["extension_id"], e["version"]) for e in selected}
    for (tool, platform, name), data in reports.items():
        entries = [e for e in data["extensions"] if (platform, e["extension_id"], e["version"]) in selected_keys]
        flows = [f for e in entries for f in e["flows"]]
        write(out / "reports" / tool / platform / name, {"metadata": {
            "project": tool, "browser": platform, "scope": "requested confirmed extension subset",
            "upstream_report": f"{tool}/{platform}/{name}", "upstream_sha256": sha(root / tool / platform / name),
            "extension_count": len(entries), "flow_count": len(flows),
            "labels": dict(collections.Counter(f["verification"] for f in flows)),
            "empty_subset_meaning": "No selected extension record in this upstream report; not a negative scan result."},
            "extensions": entries})
    write(out / "manifest.json", {"schema_version": "expguard-paper-subset/v1", "scope": "Initial subset, not the complete 337-extension/780-flow reference set",
          "selection": "Current Top5000 reports, MV3, at least one nonduplicate TP in a paper class; alternate verified version allowed only when requested version is ineligible",
          "allow_verified_version": args.allow_verified_version, "extension_count": len(selected), "extensions": selected})
    write(out / "selection-audit.json", decisions)
    write(out / "catalog-selected.json", [row for row in catalog if (row["platform"], row["extension_id"], row["version"]) in selected_keys])
    checksums = {p.relative_to(out).as_posix(): sha(p) for p in sorted(out.rglob("*")) if p.is_file()}
    write(out / "checksums.json", checksums)
    print(f"Exported {len(selected)} extension instances, {len(checksums)} files to {out}")


def verify(out):
    checksums = read(out / "checksums.json")
    for name, expected in checksums.items():
        path = out / name
        if not path.is_file() or sha(path) != expected:
            raise ValueError(f"Dataset integrity failure: {name}")
    actual = {p.relative_to(out).as_posix() for p in out.rglob("*") if p.is_file()}
    if actual != set(checksums) | {"checksums.json"}:
        raise ValueError("Dataset contains files absent from checksums.json")
    manifest = read(out / "manifest.json")
    for e in manifest["extensions"]:
        src = out / "extensions" / e["platform"] / f"{e['extension_id']}_{e['version']}" / "unpacked"
        m = read(src / "manifest.json")
        assert m["version"] == e["version"] and m["manifest_version"] == 3
        assert any(t["confirmed_flow_ids"] for t in e["tools"].values())
    print(f"Verified {len(checksums)} file hashes and {len(manifest['extensions'])} MV3/TP records")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--top5000", type=Path)
    parser.add_argument("--catalog", type=Path)
    parser.add_argument("--output", type=Path, default=Path("datasets/manually-validated"))
    parser.add_argument("--allow-verified-version", action="store_true")
    parser.add_argument("--verify", action="store_true")
    args = parser.parse_args()
    if args.verify:
        verify(args.output)
    elif args.top5000 and args.catalog:
        build(args)
    else:
        parser.error("--top5000 and --catalog are required to build")
