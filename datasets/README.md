# Manual Verification Dataset

`manual_verification_dataset.json` is the consolidated Ground Truth index for 337 platform-specific browser extension instances. It contains 780 de-duplicated true-positive Flows and the false-positive reports used to calculate the analyzer comparison totals. Each Flow records its verdict, source and sink, structural properties, and reporting tools.

The dataset is organized by `chrome/`, `edge/`, and `firefox/`. Their extension-instance counts are 215, 81, and 41. Every extension directory has four directories: `Source/`, `ExPGuard/`, `CoCo/`, and `DoubleX/`. `Source/` contains the unpacked extension. Each tool directory contains that tool's available scan outputs. `extension_ground_truth.json` consolidates per-extension scan status, existing report paths, tool Flow records, and the verified Ground Truth Flows.

The current retained scan outputs are `summary.json` and `report.flows.json` where produced, plus ExPGuard's `analysis.log`. Tool output files removed during dataset cleanup are stored in the backup directory outside this repository. The manual index does not duplicate references to removed intermediate verification reports.

## Paper alignment

The consolidated index matches the paper's headline results: 780 unique confirmed Flows affecting 337 extension instances; 674, 73, and 138 true-positive tool reports; and 240, 95, and 166 false-positive tool reports for ExPGuard, CoCo, and DoubleX. It also matches the reported 558 candidate extensions and the per-platform extension counts.

There is one source-manifest exception to the paper's MV3-only sampling description: the Firefox instance `Calendar_Planner___Custom_Web_Search_irJnvrJAAx@calendatplanner.co` version `1.0.0.4` has a Manifest V2 source. The other 336 instances are Manifest V3. The source manifest and catalog metadata both identify this instance as MV2; the dataset preserves that fact.

## Extension directory layout

- `Source/`: the unpacked extension source tree.
- `ExPGuard/`: ExPGuard scan outputs, when available.
- `CoCo/`: CoCo scan outputs, when available.
- `DoubleX/`: DoubleX scan outputs, when available.

Every tool directory exists for every extension, including extensions for which that tool produced no report. Per-extension verification and de-duplication details live in `extension_ground_truth.json`; the analyzer-level TP and FP reference data live in `manual_verification_dataset.json`.

Use the extension directory and `extension_ground_truth.json` as the canonical platform, catalog ID, and version identity. Some preserved tool summaries contain analyzer-specific or adapter-derived `extensionId` and `browser` values, so those fields alone are not a reliable cross-tool join key.
