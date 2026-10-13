# CoCo taint report (ExPGuard-aligned)

- Status: `failed`
- Findings: `2`
- Duration: `4.591s`
- Statement coverage: `n/a`
- Peak RSS: `160.152 MiB`

## Flows

### 1. STORAGE_POSOING

`TARGET_CUSTOM_EVENT` → `CHROME_LOCAL_STORAGE`

- Source: content-script.js:49
- Sink: content-script.js:51
- Evidence: CoCo legacy taint trace

### 2. STORAGE_POSOING

`TARGET_CUSTOM_EVENT` → `CHROME_LOCAL_STORAGE`

- Source: content-script.js:56
- Sink: content-script.js:57
- Evidence: CoCo legacy taint trace
