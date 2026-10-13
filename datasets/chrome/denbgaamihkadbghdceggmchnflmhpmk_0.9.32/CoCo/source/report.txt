# CoCo taint report (ExPGuard-aligned)

- Status: `success`
- Findings: `1`
- Duration: `3.241s`
- Statement coverage: `0.00%`
- Peak RSS: `209.281 MiB`

## Flows

### 1. STORAGE_POSOING

`TARGET_CUSTOM_EVENT` → `CHROME_LOCAL_STORAGE`

- Source: contentScriptProxy.js:47
- Sink: contentScriptProxy.js:49
- Evidence: CoCo legacy taint trace
