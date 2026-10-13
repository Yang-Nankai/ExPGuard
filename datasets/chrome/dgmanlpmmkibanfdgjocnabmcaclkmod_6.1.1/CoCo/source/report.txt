# CoCo taint report (ExPGuard-aligned)

- Status: `success`
- Findings: `1`
- Duration: `38.382s`
- Statement coverage: `50.33%`
- Peak RSS: `215.719 MiB`

## Flows

### 1. STORAGE_POSOING

`WINDOW_MESSAGE_EVENT` → `CHROME_SYNC_STORAGE`

- Source: messager.js:7
- Sink: messager.js:10
- Evidence: CoCo legacy taint trace
