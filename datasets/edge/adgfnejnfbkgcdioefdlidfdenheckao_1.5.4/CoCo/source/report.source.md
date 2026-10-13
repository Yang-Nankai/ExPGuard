# CoCo taint report (ExPGuard-aligned)

- Status: `success`
- Findings: `1`
- Duration: `143.555s`
- Statement coverage: `30.22%`
- Peak RSS: `240.547 MiB`

## Flows

### 1. STORAGE_POSOING

`WINDOW_MESSAGE_EVENT` → `CHROME_LOCAL_STORAGE`

- Source: content.js:245
- Sink: content.js:247
- Evidence: CoCo legacy taint trace
