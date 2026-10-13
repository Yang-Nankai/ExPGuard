# CoCo taint report (ExPGuard-aligned)

- Status: `success`
- Findings: `2`
- Duration: `30.232s`
- Statement coverage: `46.03%`
- Peak RSS: `243.902 MiB`

## Flows

### 1. STORAGE_POSOING

`WINDOW_MESSAGE_EVENT` → `CHROME_LOCAL_STORAGE`

- Source: scripts/storage.js:32
- Sink: scripts/storage.js:96
- Evidence: CoCo legacy taint trace

### 2. STORAGE_POSOING

`WINDOW_MESSAGE_EVENT` → `CHROME_LOCAL_STORAGE`

- Source: scripts/storage.js:32
- Sink: scripts/storage.js:44
- Evidence: CoCo legacy taint trace
