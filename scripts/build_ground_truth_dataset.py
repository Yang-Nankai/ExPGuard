"""Build the cross-tool, adjudicated Top5000 ground-truth flow dataset.

The cross-tool grouping and reviewed exceptions mirror
ExPGuard-Data/Paper/proposals/rq2_flow_venn_proposed.py. Original per-tool
flow objects are retained verbatim in the JSON output for traceability.
"""

from __future__ import annotations

import argparse
import csv
import hashlib
import itertools
import json
from collections import Counter, defaultdict
from pathlib import Path
from typing import Any


TOOLS = ("ExPGuard-Opti", "CoCo", "DoubleX")
TOOL_LABELS = {"ExPGuard-Opti": "ExPGuard", "CoCo": "CoCo", "DoubleX": "DoubleX"}
PLATFORMS = ("chrome", "edge", "firefox")

# A few baselines call an extension response WINDOW_POSTMESSAGE while
# ExPGuard or CoCo call the same operation onMessageExternal.sendResponse.
RESPONSE_SITE_ALIASES = {
    ("chrome", "adkbpbalabenjlfngiefoifoebjpbjjl"),
    ("chrome", "ahknjhlmgkmlnjeaklpgllgmbjhdfgej"),
    ("chrome", "denohmphfiepkgihlobkpmkbdhgmjigf"),
    ("chrome", "dooinopjfnhlmmdkdepajfipfhlcmjgp"),
    ("chrome", "ifompgilpgnbnopfpfdjcmmpgkgckabi"),
    ("chrome", "jjjoiagdgjhecijlkfkipeilgfgbhkgc"),
    ("chrome", "jkmpbdjckkgdaopigpfkahgomgcojlpg"),
    ("chrome", "kdnnmhpmcakdilnofmllgcigkibjonof"),
    ("chrome", "nhcdofaefcpfaoefffopanopapnekhca"),
    ("chrome", "pmeccjlemeohcobimhbphjnlokdmiilo"),
    ("edge", "bjpnbepckcncaideamdakikaaofkjmab"),
}

# These share a coarse source/sink category but are deliberately not merged.
NON_MATCHES = {
    ("TP", "chrome", "bnofologaglcigfnbljobhnglbaicmci", "page", "CHROME_LOCAL_STORAGE"),
    ("FP", "chrome", "gakmegiabfkcldknhpamdcflkofdpljk", "CHROME_BOOKMARK_INFO",
     "CHROME_RUNTIME_ONMESSAGEEXTERNAL_SENDRESPONSE"),
    ("FP", "chrome", "gakmegiabfkcldknhpamdcflkofdpljk", "CHROME_HISTORY_INFO",
     "CHROME_RUNTIME_ONMESSAGEEXTERNAL_SENDRESPONSE"),
    ("FP", "chrome", "bbeaicapbccfllodepmimpkgecanonai", "storage", "WINDOW_POSTMESSAGE"),
}

REGION_LABELS = {
    1: "ExPGuard only", 2: "CoCo only", 4: "DoubleX only",
    3: "ExPGuard + CoCo", 5: "ExPGuard + DoubleX",
    6: "CoCo + DoubleX", 7: "all three",
}


def source_family(flow: dict[str, Any]) -> str:
    source = flow["source"]
    kind = source["type"]
    frame = source.get("origin_frame_family") or source.get("frame") or ""
    if kind == "WINDOW_MESSAGE_EVENT":
        return "external" if str(frame).startswith("BG") else "page"
    if kind in ("CHROME_ONMESSAGEEXTERNAL_MESSAGE", "CHROME_ONCONNECTEXTERNAL_ONMESSAGE"):
        return "external"
    if kind in ("WINDOW_CUSTOM_EVENT", "TARGET_CUSTOM_EVENT"):
        return "custom"
    if kind == "STORAGE_ALL_ITEMS":
        return "storage"
    return kind


def sink_family(platform: str, extension_id: str, flow: dict[str, Any]) -> str:
    kind = flow["sink"]["type"]
    if ((platform, extension_id) in RESPONSE_SITE_ALIASES
            and source_family(flow) in {"storage", "CHROME_IDENTITY_PROFILE"}
            and kind in {"CHROME_RUNTIME_ONMESSAGEEXTERNAL_SENDRESPONSE", "WINDOW_POSTMESSAGE"}):
        return "response"
    return kind


def read_json(path: Path) -> Any:
    return json.loads(path.read_text(encoding="utf-8-sig"))


def report_sort_key(record: dict[str, Any]) -> tuple[Any, ...]:
    flow = record["flow"]
    return (flow.get("flow_index", -1), flow.get("flow_id", ""))


def explicit_pair_links(records: list[dict[str, Any]]) -> set[frozenset[str]]:
    ids = {record["flow"]["flow_id"] for record in records}
    links: set[frozenset[str]] = set()
    for record in records:
        target = (record["flow"].get("reused_from") or {}).get("flow_id")
        if target in ids and target != record["flow"]["flow_id"]:
            links.add(frozenset((record["flow"]["flow_id"], target)))
    return links


def preferred_combination(
    choices: list[list[dict[str, Any]]], links: set[frozenset[str]],
) -> tuple[dict[str, Any], ...]:
    """Choose the most explicitly linked available combination, stably."""
    combinations = itertools.product(*choices)
    best: tuple[dict[str, Any], ...] | None = None
    best_score = -1
    for combination in combinations:
        ids = [record["flow"]["flow_id"] for record in combination]
        score = sum(frozenset((a, b)) in links
                    for a, b in itertools.combinations(ids, 2))
        key = tuple((record["tool_index"], *report_sort_key(record)) for record in combination)
        best_key = (tuple((r["tool_index"], *report_sort_key(r)) for r in best)
                    if best is not None else None)
        if score > best_score or (score == best_score and (best_key is None or key < best_key)):
            best, best_score = combination, score
    assert best is not None
    return best


def allocate_group(key: tuple[Any, ...], grouped: dict[str, list[dict[str, Any]]]) -> list[dict[str, Any]]:
    """Allocate reports one-to-one using the proposed paper Venn ordering."""
    verdict, platform, extension_id, _version, source, sink = key
    lists = [sorted(grouped.get(tool, []), key=report_sort_key) for tool in TOOLS]
    counts = [len(items) for items in lists]
    links = explicit_pair_links([record for items in lists for record in items])
    clusters: list[list[dict[str, Any]]] = []

    if (verdict, platform, extension_id, source, sink) in NON_MATCHES:
        return [[record] for items in lists for record in items]

    # Match triples first, preferring explicit reused_from relationships.
    triple_count = min(counts)
    for _ in range(triple_count):
        selected = preferred_combination(lists, links)
        clusters.append(list(selected))
        for index, record in enumerate(selected):
            lists[index].remove(record)

    # Then allocate pairwise groups in exactly the figure's order.
    for first, second in ((0, 1), (0, 2), (1, 2)):
        shared = min(len(lists[first]), len(lists[second]))
        for _ in range(shared):
            selected = preferred_combination([lists[first], lists[second]], links)
            clusters.append(list(selected))
            lists[first].remove(selected[0])
            lists[second].remove(selected[1])

    clusters.extend([[record] for items in lists for record in items])
    return clusters


def catalog_value(row: dict[str, str]) -> dict[str, Any]:
    result: dict[str, Any] = {}
    for field in ("rank", "manifest_version", "user_count", "rating_count"):
        value = row.get(field, "")
        if value:
            try:
                result[field] = int(value)
            except ValueError:
                result[field] = value
    if row.get("rating_average"):
        try:
            result["rating_average"] = float(row["rating_average"])
        except ValueError:
            result["rating_average"] = row["rating_average"]
    for field in ("name", "developer_name", "manifest_source"):
        if row.get(field):
            result[field] = row[field]
    return result


def build(top5000: Path, manifest_path: Path, output: Path) -> dict[str, Any]:
    if output.exists():
        raise SystemExit(f"Refusing to overwrite existing dataset: {output}")

    records_by_key: dict[tuple[Any, ...], dict[str, list[dict[str, Any]]]] = defaultdict(
        lambda: {tool: [] for tool in TOOLS}
    )
    extension_metadata: dict[tuple[str, str, str], dict[str, dict[str, Any]]] = defaultdict(dict)
    extension_tp_tools: dict[tuple[str, str, str], set[str]] = defaultdict(set)
    source_counts: Counter[str] = Counter()
    all_tp_by_id: dict[str, dict[str, Any]] = {}
    report_inputs = []

    for tool_index, tool in enumerate(TOOLS):
        for platform in PLATFORMS:
            relative_path = Path(tool) / platform / "flow-verification-results-no-duplicate.json"
            path = top5000 / relative_path
            doc = read_json(path)
            report_inputs.append(relative_path.as_posix())
            for extension in doc["extensions"]:
                ext_key = (platform, extension["extension_id"], str(extension["version"]))
                extension_metadata[ext_key][tool] = {
                    field: extension.get(field)
                    for field in ("name", "rank", "manifest_version", "manifest_version_source",
                                  "extension_directory", "flow_count", "on_disk")
                    if field in extension
                }
                for flow in extension["flows"]:
                    verdict = flow.get("verification")
                    if verdict not in {"TP", "FP"}:
                        raise ValueError(f"Unexpected verdict {verdict!r} in {path}")
                    if verdict != "TP":
                        continue
                    flow_id = flow["flow_id"]
                    if flow_id in all_tp_by_id:
                        raise ValueError(f"Duplicate TP flow_id across reports: {flow_id}")
                    record = {
                        "tool": tool,
                        "tool_label": TOOL_LABELS[tool],
                        "tool_index": tool_index,
                        "platform": platform,
                        "extension": extension,
                        "flow": flow,
                        "source_report": relative_path.as_posix(),
                    }
                    all_tp_by_id[flow_id] = record
                    source_counts[tool] += 1
                    extension_tp_tools[ext_key].add(tool)
                    key = (
                        verdict, platform, extension["extension_id"], str(extension["version"]),
                        source_family(flow), sink_family(platform, extension["extension_id"], flow),
                    )
                    records_by_key[key][tool].append(record)

    with manifest_path.open(encoding="utf-8-sig", newline="") as stream:
        catalog_rows = list(csv.DictReader(stream))
    catalog: dict[tuple[str, str, str], dict[str, Any]] = {}
    for row in catalog_rows:
        key = (row["platform"], row["extension_id"], row["version"])
        if key in catalog:
            raise ValueError(f"Duplicate extension key in manifest catalog: {key}")
        catalog[key] = catalog_value(row)

    flows_by_extension: dict[tuple[str, str, str], list[dict[str, Any]]] = defaultdict(list)
    region_counts: Counter[int] = Counter()
    honored_reuse: set[frozenset[str]] = set()
    unhonored_reuse: list[dict[str, Any]] = []
    group_count = len(records_by_key)

    for key in sorted(records_by_key):
        _, platform, extension_id, version, source, sink = key
        grouped = records_by_key[key]
        is_exception = (key[0], platform, extension_id, source, sink) in NON_MATCHES
        for members in allocate_group(key, grouped):
            members = sorted(members, key=lambda r: r["tool_index"])
            mask = sum(1 << record["tool_index"] for record in members)
            region_counts[mask] += 1
            member_ids = {record["flow"]["flow_id"] for record in members}
            member_links = explicit_pair_links(members)
            honored_reuse.update(member_links)
            digest = hashlib.sha256("\n".join(sorted(member_ids)).encode("utf-8")).hexdigest()[:16]
            if is_exception:
                match_basis = "reviewed_non_match_exception"
            elif len(members) == 1:
                match_basis = "single_tool_report"
            elif member_links:
                match_basis = "explicit_reuse_and_normalized_signature"
            else:
                match_basis = "normalized_signature_one_to_one"
            flows_by_extension[(platform, extension_id, version)].append({
                "ground_truth_flow_id": f"gtf-{digest}",
                "verification": "TP",
                "source_family": source,
                "sink_family": sink,
                "matched_tools": [record["tool_label"] for record in members],
                "match_region": REGION_LABELS[mask],
                "match_basis": match_basis,
                "reports": [
                    {
                        "tool": record["tool"],
                        "tool_label": record["tool_label"],
                        "source_report": record["source_report"],
                        "flow_id": record["flow"]["flow_id"],
                        "flow": record["flow"],
                    }
                    for record in members
                ],
            })

    # Check which explicit cross-tool references were kept within a canonical item.
    tp_ids = set(all_tp_by_id)
    for flow_id, record in all_tp_by_id.items():
        reference = record["flow"].get("reused_from") or {}
        target_id = reference.get("flow_id")
        if not target_id or target_id not in tp_ids or target_id == flow_id:
            continue
        target = all_tp_by_id[target_id]
        if target["tool"] == record["tool"]:
            reason = "same_tool_reference_cannot_be_cross_tool_match"
        else:
            record_key = (
                "TP", record["platform"], record["extension"]["extension_id"],
                str(record["extension"]["version"]), source_family(record["flow"]),
                sink_family(record["platform"], record["extension"]["extension_id"], record["flow"]),
            )
            target_key = (
                "TP", target["platform"], target["extension"]["extension_id"],
                str(target["extension"]["version"]), source_family(target["flow"]),
                sink_family(target["platform"], target["extension"]["extension_id"], target["flow"]),
            )
            reason = "different_normalized_group" if record_key != target_key else "not_in_same_allocated_item"
        pair = frozenset((flow_id, target_id))
        if pair not in honored_reuse and pair not in {frozenset((y, x)) for x, y in honored_reuse}:
            unhonored_reuse.append({"flow_id": flow_id, "target_flow_id": target_id, "reason": reason})

    extensions = []
    for ext_key in sorted(flows_by_extension):
        platform, extension_id, version = ext_key
        report_metadata = extension_metadata[ext_key]
        cat = catalog.get(ext_key)
        representative = next(iter(report_metadata.values()), {})
        reported_manifest_versions = {
            value.get("manifest_version") for value in report_metadata.values()
            if value.get("manifest_version") is not None
        }
        if len(reported_manifest_versions) > 1:
            raise ValueError(f"Conflicting report manifest versions for {ext_key}: {reported_manifest_versions}")
        report_manifest_version = next(iter(reported_manifest_versions), None)
        flows = sorted(flows_by_extension[ext_key], key=lambda item: item["ground_truth_flow_id"])
        metadata_issues = []
        catalog_manifest_version = (cat or {}).get("manifest_version")
        if report_manifest_version is None and catalog_manifest_version is not None:
            metadata_issues.append("No manifest_version is recorded in the flow reports; catalog value is shown separately.")
        elif (report_manifest_version is not None and catalog_manifest_version is not None
              and report_manifest_version != catalog_manifest_version):
            metadata_issues.append("Flow-report and catalog manifest_version values differ.")
        extensions.append({
            "platform": platform,
            "extension_id": extension_id,
            "version": version,
            "name": (cat or {}).get("name") or representative.get("name"),
            "rank": (cat or {}).get("rank", representative.get("rank")),
            "manifest_version": report_manifest_version,
            "catalog_manifest_version": catalog_manifest_version,
            "catalog_metadata": cat,
            "reported_metadata_by_tool": report_metadata,
            "tools_with_tp_reports": [tool for tool in TOOLS if tool in extension_tp_tools[ext_key]],
            "metadata_issues": metadata_issues,
            "flow_count": len(flows),
            "flows": flows,
        })

    all_flow_ids = [flow["ground_truth_flow_id"] for extension in extensions for flow in extension["flows"]]
    raw_report_count = sum(source_counts.values())
    unique_extensions = len(extensions)
    unique_flow_count = len(all_flow_ids)
    if len(set(all_flow_ids)) != unique_flow_count:
        raise ValueError("Generated canonical flow IDs are not unique")
    if unique_extensions != 337 or unique_flow_count != 780:
        raise ValueError(f"Expected 337 extensions / 780 flows; got {unique_extensions} / {unique_flow_count}")
    if raw_report_count != 885:
        raise ValueError(f"Expected 885 source TP reports; got {raw_report_count}")
    expected_regions = {1: 591, 2: 34, 3: 17, 4: 59, 5: 57, 6: 13, 7: 9}
    if dict(region_counts) != expected_regions:
        raise ValueError(f"Venn regions differ from paper-generation logic: {dict(region_counts)}")
    if sum(extension["flow_count"] for extension in extensions) != unique_flow_count:
        raise ValueError("Extension flow counts do not add up to the dataset total")
    if any(flow["verification"] != "TP" for ext in extensions for flow in ext["flows"]):
        raise ValueError("Non-TP flow found in the output")

    dataset = {
        "schema_version": "expguard-ground-truth/v1",
        "title": "ExPGuard Top5000 cross-tool ground-truth flows",
        "description": (
            "Adjudicated true-positive flows from ExPGuard-Opti, CoCo, and DoubleX "
            "on Chrome, Edge, and Firefox, merged across tools into unique flow items."
        ),
        "data_quality_notes": [
            "One Firefox extension instance has no manifest_version value in the flow reports; the supplied Top10000 catalog lists that instance as MV2. It is retained to preserve the paper's 337-extension / 780-flow ground-truth totals."
        ],
        "scope": {
            "tools": list(TOOL_LABELS.values()),
            "platforms": list(PLATFORMS),
            "included_verdict": "TP",
            "extension_identity": "platform + extension_id + version",
            "cross_tool_flow_identity": "platform + extension_id + version + normalized source family + normalized sink family; reports allocated one-to-one",
        },
        "matching_method": {
            "source_reports": report_inputs,
            "source_file": "flow-verification-results-no-duplicate.json",
            "source_family_normalization": (
                "Mirrors rq2_flow_venn_proposed.py: normalize window-message sources by frame family; "
                "external messaging, custom events, and storage-all-items use reviewed families."
            ),
            "sink_normalization": "Reviewed response-site aliases from rq2_flow_venn_proposed.py are applied.",
            "allocation": (
                "Within the same platform, extension, version, verdict, source family, and sink family: "
                "allocate triples first, then ExPGuard+CoCo, ExPGuard+DoubleX, CoCo+DoubleX, then single-tool reports. "
                "Explicit reused_from links are preferred when selecting reports for a shared item."
            ),
            "reviewed_non_matches": [
                {"verdict": v, "platform": p, "extension_id": eid, "source_family": src, "sink_family": dst}
                for v, p, eid, src, dst in sorted(NON_MATCHES)
            ],
            "note": (
                "Each reports[] entry retains the original flow-verification record without field-level edits. "
                "The source verification label is preserved as the ground-truth verdict."
            ),
        },
        "summary": {
            "extension_count": unique_extensions,
            "unique_flow_count": unique_flow_count,
            "source_tp_report_count": raw_report_count,
            "source_tp_reports_by_tool": {
                TOOL_LABELS[tool]: source_counts[tool] for tool in TOOLS
            },
            "extensions_by_platform": dict(sorted(Counter(ext["platform"] for ext in extensions).items())),
            "flows_by_platform": {
                platform: sum(ext["flow_count"] for ext in extensions if ext["platform"] == platform)
                for platform in PLATFORMS
            },
            "flows_by_tool_region": {
                REGION_LABELS[mask]: count for mask, count in sorted(region_counts.items())
            },
            "explicit_reuse_links_not_used_as_cluster_edges": len(unhonored_reuse),
        },
        "extensions": extensions,
        "matching_audit": {
            "explicit_reuse_links_not_used": unhonored_reuse,
            "normalized_group_count": group_count,
        },
    }

    output.parent.mkdir(parents=True, exist_ok=True)
    output.write_text(json.dumps(dataset, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    return dataset


def main() -> None:
    default_project = Path(__file__).resolve().parents[1]
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--top5000", type=Path,
        default=default_project.parent / "ExPGuard-Data" / "Top5000",
    )
    parser.add_argument(
        "--manifest", type=Path,
        default=default_project.parent / "ExPGuard-Ablation" /
        "top10000_extensions_by_platform_20260812_manifest_repaired.csv",
    )
    parser.add_argument(
        "--output", type=Path,
        default=default_project / "datasets" / "ground-truth-dataset-780.json",
    )
    args = parser.parse_args()
    dataset = build(args.top5000.resolve(), args.manifest.resolve(), args.output.resolve())
    print(json.dumps(dataset["summary"], ensure_ascii=False, indent=2))
    print(f"Wrote {args.output.resolve()}")


if __name__ == "__main__":
    main()
