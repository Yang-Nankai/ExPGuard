# Initial subset of the manually validated reference dataset

This directory packages five confirmed Manifest V3 Chrome extension instances
selected from the current Top5000 reference reports. It is an initial subset,
not the complete reference set described in the paper (337 platform-specific
extension instances and 780 confirmed flows). Candidates must have at least
one nonduplicate `TP` in a paper class. Existing TP/FP/duplicate labels and
verification-source distinctions are preserved; an ExPAgent verdict is not
relabeled as a human verdict. No new adjudication was performed by the exporter.

The requested version is preferred. The author approved substituting an
available, confirmed Top5000 version of the same ID. Two substitutions are
therefore explicit in `manifest.json` and `selection-audit.json`.

| Extension ID | Packaged version | Requested version | Confirmed paper classes |
| --- | --- | --- | --- |
| `ekmeppjgajofkpiofbebgcbohbmfldaf` | 2.0.14 | 2.0.14 | Privilege Execution |
| `gmmkjpcadciiokjpikmkkmapphbmdjok` | **1.3** | 1.2 | Request Forgery |
| `inehghpkjjjdgpnagcbogckbonilnidc` | 8.0.8 | 8.0.8 | Storage Poisoning, Request Forgery, Data Leak |
| `ogdlpmhglpejoiomcodnpjnfgcpmgale` | **3.7.9** | 3.5.2 | Storage Poisoning |
| `lhannfkhjdhmibllojbbdjdbpegidojj` | 1.5.2 | 1.5.2 | Storage Poisoning, Privilege Execution, Data Leak |

ExPGuard-Opti has 16 nonduplicate TP reports across these instances. DoubleX
has 2 TP reports plus 1 FP report; its TP reports overlap the same selected
extensions. Counts across tools are not independent vulnerabilities.

## Layout

```text
manually-validated/
  manifest.json                         # membership, versions, classes, availability
  selection-audit.json                  # decisions for all 12 requested IDs
  catalog-selected.json                 # original matching catalog records
  checksums.json                        # SHA-256 for every exported file
  extensions/chrome/<id>_<version>/
    unpacked/                           # original extension source directory
    metadata.json
    reports/{DoubleX,CoCo,ExPGuard-Opti}/
      availability.json                 # present/missing, never a fabricated verdict
      source/                           # original scan output, where available
      static/static_report.json         # original adjudication report, where available
      dynamic/dynamic_report.json       # original adjudication report, where available
      flow-verification-results.json
      flow-verification-results-no-duplicate.json
  reports/{DoubleX,CoCo,ExPGuard-Opti}/{chrome,edge,firefox}/
    flow-verification-results.json
    flow-verification-results-no-duplicate.json
```

Each included extension has a folder for all three tools. The supplied
Top5000 files contain no CoCo record/source report for these five instances;
DoubleX reports exist only for Degreed and Custom Cursor. Missing folders
contain availability metadata. Empty platform aggregate subsets mean that
none of these selected records appears in that report, not that a tool
successfully scanned an extension and found nothing. The initial subset
contains only Chrome instances; no Edge/Firefox counterpart is inferred.

Original report paths and flow indices are retained as provenance and can
point to files outside this package. The package includes the existing
top-level static/dynamic JSON reports, not browser profiles or all runtime
evidence files. Source-file bytes are copied unchanged from `unpacked/`;
metadata helpers such as `.epg-inline` may be present if supplied upstream.
The source report folders are preserved, including their original raw
findings. Only membership requires an in-scope TP; a bundled raw report may
also contain excluded classes or false positives.

## Excluded candidates

- `lghkdmpjndggpffgahogcopicpednbgm` 2.4.4: the sole in-scope report is manually
  labeled FP; it has no qualifying confirmed vulnerability.
- `cplhlgabfijoiabgkigdafklbhhdkahj`: no entry for this ID in the current
  Top5000 reference reports or supplied Top10000 catalog.
- `bnompdfnhdbgdaoanapncknhmckenfog`, `aicmkgpgakddgnaphhhpliifpcfhicfo`,
  `fjnbnpbmkenffdnngjfgmeleoegfcffe`, `amfojhdiedpdnlijjbhjnhokbnohfdfb`,
  `ljmaegmnepbgjekghdfkgegbckolmcok`: no qualifying TP entry in the current
  reference reports, regardless of historical cases or catalog availability.
  This absence is not a claim that the extensions are safe.

## Rebuild and verify

```sh
python scripts/build_paper_dataset.py --verify
python scripts/build_paper_dataset.py --top5000 /path/to/Top5000 --catalog /path/to/top10000_extensions_by_platform_20260812_manifest_repaired.csv --allow-verified-version --output /path/to/new-dataset
```

The exporter refuses to overwrite an existing destination. Verification
checks every packaged file hash, rejects unindexed files, validates MV3 and
versions, and requires a qualifying confirmed record for every member.

Third-party extension source files retain their original copyright and
licensing terms. ExPGuard's project license does not relicense those files.
