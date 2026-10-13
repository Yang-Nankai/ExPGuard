# CoCo taint report (ExPGuard-aligned)

- Status: `failed`
- Findings: `1`
- Duration: `21.467s`
- Statement coverage: `n/a`
- Peak RSS: `207.348 MiB`

## Flows

### 1. STORAGE_POSOING

`WINDOW_MESSAGE_EVENT` → `CHROME_LOCAL_STORAGE`

- Source: content-script.js:1
- Sink: content-script.js:1
- Evidence: CoCo legacy taint trace
