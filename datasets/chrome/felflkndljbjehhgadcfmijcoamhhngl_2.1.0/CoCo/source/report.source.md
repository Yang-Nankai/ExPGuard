# CoCo taint report (ExPGuard-aligned)

- Status: `success`
- Findings: `1`
- Duration: `5.306s`
- Statement coverage: `32.35%`
- Peak RSS: `240.082 MiB`

## Flows

### 1. STORAGE_POSOING

`CHROME_ONMESSAGEEXTERNAL_MESSAGE` → `CHROME_LOCAL_STORAGE`

- Source: background.js:835
- Sink: background.js:835
- Evidence: CoCo legacy taint trace
