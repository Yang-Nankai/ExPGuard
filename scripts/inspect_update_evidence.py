"""Print a bounded original/new-source review docket for an analyst."""
import argparse
import json
from pathlib import Path

from build_update_review_evidence import marked_code


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--start", type=int, default=0)
    parser.add_argument("--end", type=int, default=10)
    parser.add_argument("--flow", help="print only one Ground Truth Flow")
    parser.add_argument("--context", type=int, default=400)
    parser.add_argument("--compact", action="store_true")
    args = parser.parse_args()
    root = Path(__file__).resolve().parents[1]
    data = json.loads((root / "datasets/updates/revalidation/source-review-evidence.json").read_text(encoding="utf-8"))
    for i, extension in enumerate(data["extensions"]):
        if not args.flow and not args.start <= i < args.end:
            continue
        entries = [f for f in extension["flows"] if not args.flow or f["ground_truth_flow_id"] == args.flow]
        if not entries:
            continue
        print("\nEXT", i, extension["platform"], extension["extension_id"], extension["name"], extension["version"], "->", extension["new_version"])
        for flow in entries:
            print("FLOW", flow["ground_truth_flow_id"])
            for report in flow["tool_reports"]:
                print("REPORT", report["tool"], report["run_status"], report["source_type"], "->", report["sink_type"], "remark", report["sink_remark"], "candidates", len(report["candidate_pairs"]))
                print("MANIFEST CHANGES", list(report["security_manifest_changes"]))
                if args.compact:
                    old = report["old_report_pair"]
                    for key in ("source", "sink"):
                        ev = report[key + "_evidence"]
                        ep = old.get(key) or {}
                        code = marked_code(ep.get("code")) or ep.get("code") or ""
                        print(key, ep.get("file"), ep.get("remark"), "identical/context", ev.get("entire_file_identical"), ev.get("original_local_context_found_exactly_in_new_file"), "OLD", code[:180])
                    for candidate in report["candidate_pairs"][:1]:
                        ident = candidate.get("identity_evidence") or {}
                        print("CANDIDATE", candidate["tool_flow_index"], candidate["sink_index"],
                              "actual src/sink", ident.get("actual_source_context_similarity"),
                              ident.get("actual_sink_context_similarity"), "remarks", ident.get("source_remark_match"),
                              ident.get("specific_sink_remark_match"))
                        for key in ("source", "sink"):
                            ep = candidate.get(key) or {}
                            print(key, ep.get("file"), ep.get("remark"), (marked_code(ep.get("code")) or ep.get("code") or "")[:180])
                    if not report["candidate_pairs"]:
                        print("OLD SOURCE", (report["source_evidence"].get("original_source_excerpt") or "")[:180])
                        print("NEW SOURCE", (report["source_evidence"].get("new_source_excerpt") or "")[:180])
                    continue
                for key in ("source", "sink"):
                    ev = report[key + "_evidence"]
                    print(key, "FILE", ev.get("original_file"), "IDENTICAL", ev.get("entire_file_identical"), "LOCAL IDENTICAL", ev.get("original_local_context_found_exactly_in_new_file"), "EXPRESSION", ev.get("original_marked_expression"))
                    print("OLD", (ev.get("original_source_excerpt") or "")[:args.context])
                    print("NEW", (ev.get("new_source_excerpt") or "")[:args.context])
                for candidate in report["candidate_pairs"][:2]:
                    print("CANDIDATE", candidate["tool_flow_index"], candidate["sink_index"], candidate.get("identity_evidence"))
                    for key in ("source", "sink"):
                        ep = candidate.get(key) or {}
                        print(key, ep.get("file"), ep.get("loc"), ep.get("remark"), marked_code(ep.get("code")) or (ep.get("code") or "")[:args.context])


if __name__ == "__main__":
    main()
