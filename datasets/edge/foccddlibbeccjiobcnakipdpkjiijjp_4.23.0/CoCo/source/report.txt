# CoCo taint report (ExPGuard-aligned)

- Status: `success`
- Findings: `1`
- Duration: `9.150s`
- Statement coverage: `100.00%`
- Peak RSS: `223.090 MiB`

## Flows

### 1. STORAGE_POSOING

`WINDOW_MESSAGE_EVENT` → `CHROME_LOCAL_STORAGE`

- Source: content.js:71
- Sink: content.js:73
- Evidence: CoCo legacy taint trace
