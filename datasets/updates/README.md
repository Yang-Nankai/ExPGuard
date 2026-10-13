# Ground-truth update audit

This directory contains the reproducible audit artifacts for the 337 extension
instances and 780 deduplicated confirmed Flows in
`../ground-truth-dataset-780.json`.

## Files

- `lookups/<platform>/` stores the store lookup response for every instance.
- `<platform>/<id>_<version>/` stores every downloaded newer CRX/XPI, its
  unpacked source, SHA-256 metadata, and revalidation attempts.
- `baseline/` contains a clean extraction of each original-version package used
  for source comparison. It avoids the instrumented `unpacked` directories in
  the original reports.
- `revalidation/jobs.json` is the resumable 170-task ledger. Each task reruns
  every tool that originally reported a Flow for the updated extension.
- `revalidation/source-review-evidence.json` contains the old/new source,
  manifest, hash, candidate-path, and tool-report evidence for the 322
  version-changed original Flows.

The dataset's `version_update_assessment` is an automated tool-report comparison.
Its `source_review` record is conservative static evidence review; it does not
claim that a missing tool report proves that a vulnerability was fixed.

## Reproduce or resume

```powershell
python scripts/extspider_by_id.py --platform chrome --id EXTENSION_ID
python scripts/extspider_by_id.py --platform firefox --id ADDON_ID --download --download-dir datasets/updates
python scripts/refresh_ground_truth_versions.py
python scripts/run_update_revalidation.py
python scripts/normalize_revalidation_jobs.py
python scripts/build_update_review_evidence.py
python scripts/rank_update_flow_candidates.py
python scripts/assess_updated_flows.py
python scripts/attach_update_source_review.py
```

The crawler uses `http://127.0.0.1:7897`. Revalidation runs use a 6 GiB
process-tree memory limit and a 600-second wall-clock limit per tool task.
