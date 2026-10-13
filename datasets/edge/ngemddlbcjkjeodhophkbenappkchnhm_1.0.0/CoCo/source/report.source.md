# CoCo taint report (ExPGuard-aligned)

- Status: `success`
- Findings: `1`
- Duration: `1.780s`
- Statement coverage: `0.00%`
- Peak RSS: `161.199 MiB`

## Flows

### 1. STORAGE_POSOING

`WINDOW_MESSAGE_EVENT` → `CHROME_LOCAL_STORAGE`

- Source: content.js:153
- Sink: content.js:156
- Evidence: CoCo legacy taint trace
