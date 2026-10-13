# CoCo taint report (ExPGuard-aligned)

- Status: `success`
- Findings: `1`
- Duration: `2.126s`
- Statement coverage: `0.00%`
- Peak RSS: `203.828 MiB`

## Flows

### 1. STORAGE_POSOING

`WINDOW_MESSAGE_EVENT` → `CHROME_LOCAL_STORAGE`

- Source: js/load.js:1
- Sink: js/load.js:1
- Evidence: CoCo legacy taint trace
