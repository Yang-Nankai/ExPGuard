# CoCo taint report (ExPGuard-aligned)

- Status: `success`
- Findings: `1`
- Duration: `7.054s`
- Statement coverage: `71.05%`
- Peak RSS: `280.211 MiB`

## Flows

### 1. STORAGE_POSOING

`TARGET_CUSTOM_EVENT` → `CHROME_SYNC_STORAGE`

- Source: login.js:1
- Sink: login.js:1
- Evidence: CoCo legacy taint trace
