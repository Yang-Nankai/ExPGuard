# CoCo taint report (ExPGuard-aligned)

- Status: `success`
- Findings: `1`
- Duration: `8.041s`
- Statement coverage: `19.75%`
- Peak RSS: `269.090 MiB`

## Flows

### 1. STORAGE_POSOING

`CHROME_ONMESSAGEEXTERNAL_MESSAGE` → `CHROME_LOCAL_STORAGE`

- Source: background.bundle.js:2
- Sink: background.bundle.js:2
- Evidence: CoCo legacy taint trace
