# CoCo taint report (ExPGuard-aligned)

- Status: `success`
- Findings: `1`
- Duration: `10.059s`
- Statement coverage: `70.97%`
- Peak RSS: `228.281 MiB`

## Flows

### 1. STORAGE_POSOING

`WINDOW_MESSAGE_EVENT` → `CHROME_SYNC_STORAGE`

- Source: content-script-webapp.js:1
- Sink: background.js:1
- Evidence: CoCo legacy taint trace
