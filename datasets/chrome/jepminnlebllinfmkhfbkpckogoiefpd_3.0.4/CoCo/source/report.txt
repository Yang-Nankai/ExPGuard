# CoCo taint report (ExPGuard-aligned)

- Status: `success`
- Findings: `1`
- Duration: `35.269s`
- Statement coverage: `74.43%`
- Peak RSS: `246.750 MiB`

## Flows

### 1. STORAGE_POSOING

`WINDOW_CUSTOM_EVENT` → `CHROME_LOCAL_STORAGE`

- Source: content.js:4
- Sink: content.js:4
- Evidence: CoCo legacy taint trace
