# CoCo taint report (ExPGuard-aligned)

- Status: `success`
- Findings: `1`
- Duration: `3.407s`
- Statement coverage: `0.00%`
- Peak RSS: `206.055 MiB`

## Flows

### 1. STORAGE_POSOING

`WINDOW_MESSAGE_EVENT` → `CHROME_LOCAL_STORAGE`

- Source: content.js:3
- Sink: content.js:4
- Evidence: CoCo legacy taint trace
