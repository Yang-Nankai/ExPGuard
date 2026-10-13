# CoCo taint report (ExPGuard-aligned)

- Status: `success`
- Findings: `1`
- Duration: `2.749s`
- Statement coverage: `0.00%`
- Peak RSS: `207.949 MiB`

## Flows

### 1. STORAGE_POSOING

`CHROME_ONMESSAGEEXTERNAL_MESSAGE` → `CHROME_LOCAL_STORAGE`

- Source: background.js:1
- Sink: background.js:1
- Evidence: CoCo legacy taint trace
