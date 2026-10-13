# Ground Truth Dataset (337 extensions / 780 Flows)

`ground-truth-dataset-780.json` is the canonical index for the manually
confirmed Ground Truth: 337 extension instances and 780 de-duplicated Flows.
The archive is split by browser under `chrome/`, `edge/`, and `firefox/`.
Each instance directory contains `ground-truth-metadata.json`,
`ground-truth-flows.json`, and the available per-tool static, dynamic, and
verification evidence.

The release keeps scan reports and metadata in Git. Raw CRX/XPI packages and
unpacked extension trees remain in the local archive because package files are
ignored by the repository and the complete unpacked corpus is several
gigabytes. `ground-truth-archive-manifest.json` records the source status and
the original archive paths. The reporting bundle under `reporting/` contains
the generated disclosure reports, developer-contact provenance, and the
email/Git maintenance ledger. `updates/` is a local revalidation workspace;
its compact JSON lookups and revalidation summaries are safe to publish, while
downloaded update packages and unpacked trees are retained locally.

The maintenance ledger records the current email state. Sending remains
explicitly recipient-selected by `scripts/send_security_reports.py`; it has a
two-message safety cap unless `--allow-bulk` is supplied.
