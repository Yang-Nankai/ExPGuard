# CoCo taint report (ExPGuard-aligned)

- Status: `success`
- Findings: `1`
- Duration: `3.178s`
- Statement coverage: `0.00%`
- Peak RSS: `211.047 MiB`

## Flows

### 1. STORAGE_POSOING

`WINDOW_CUSTOM_EVENT` → `CHROME_SYNC_STORAGE`

- Source: setup.js:74
- Sink: setup.js:76
- Evidence: CoCo legacy taint trace
