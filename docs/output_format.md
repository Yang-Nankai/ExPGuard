# Output format

ExPGuard writes analysis artifacts to the directory passed with `--out`.
With the default configuration, a successful run retains:

```text
<out>/
├── analysis.log
├── manifest.json
├── report.flows.json
├── report.source.md
└── summary.json
```

Passing `--html` also retains a self-contained `report.html`. The analyzer uses
an `unpacked/` working directory while loading the extension; the default
retention policy removes that directory after reporting.

## `summary.json`

`summary.json` is the primary machine-readable result. Its top-level fields
include run metadata, file and coverage statistics, detected flows, suppressed
flows, and aggregate counters. Important fields are:

| Field | Meaning |
| --- | --- |
| `extensionId`, `extensionVersion` | Identity metadata supplied by the CLI or derived from the package. |
| `sourceType` | `CRX`, `DIR`, `WEB`, or `XPI`. |
| `status`, `duration` | Run status and elapsed time. |
| `files`, `totalFiles`, `totalSize` | Analyzed script inventory and size totals. |
| `coverage` | Covered/total CFG nodes and scopes plus analyzed-script count. |
| `analysisConfiguration` | Runtime ablation switches recorded for reproducibility. |
| `hasFlows`, `flowCount`, `flows` | Classified source-to-sink findings. |
| `privilegeSuppressed` | Candidate flows removed by privilege-delta filtering, with reasons. |

Each item in `flows` identifies the vulnerability classification and its source,
sink, rule, severity, constraints, and propagation evidence. Core fields include
`flowType`, `sourceType`, `sinkType`, `ruleId`, `severity`, `source`, `sink`, and
`propagationPath`. Consumers should tolerate additional fields in future
versions.

## Source-level reports

- `report.flows.json` is the machine-oriented source report. It resolves each
  finding and propagation step to extension source locations.
- `report.source.md` presents the same findings in a compact human-readable
  form suitable for review or downstream LLM processing.
- `report.html`, when requested, combines extension metadata, a file tree,
  findings, code snippets, and propagation timelines in one portable file.

The configured `reportFormat` controls whether the JSON report, Markdown report,
or both are emitted. The repository default is `both`.

## Other artifacts

- `analysis.log` records loader, modeling, analysis, coverage, reporting, and
  cleanup events.
- `manifest.json` is copied from the unpacked extension before the temporary
  directory is removed.

## Retention

`config.artifactRetentionPolicy` controls whether temporary analysis artifacts
remain after a run:

- `none` removes `unpacked/` after moving its manifest to the output directory.
- `keep_if_sink` keeps temporary artifacts when the analysis reached a sink.
- `all` keeps all generated artifacts.

Files named in `config.alwaysRetainedArtifacts` are report artifacts intended
for downstream processing. The checked-in defaults retain the log, both
source-level reports, and `summary.json`.
