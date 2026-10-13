# CoCo taint report (ExPGuard-aligned)

- Status: `success`
- Findings: `1`
- Duration: `49.968s`
- Statement coverage: `36.29%`
- Peak RSS: `252.281 MiB`

## Flows

### 1. STORAGE_POSOING

`TARGET_CUSTOM_EVENT` → `CHROME_LOCAL_STORAGE`

- Source: contentScript.js:74
- Sink: distJs/helper.js:101
- Evidence: CoCo legacy taint trace
