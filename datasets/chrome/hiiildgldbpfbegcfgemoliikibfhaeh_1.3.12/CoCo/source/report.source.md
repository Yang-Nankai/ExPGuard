# CoCo taint report (ExPGuard-aligned)

- Status: `timeout`
- Findings: `2`
- Duration: `131.779s`
- Statement coverage: `8.37%`
- Peak RSS: `802.562 MiB`

## Flows

### 1. DATA_LEAK

`STORAGE_ALL_ITEMS` → `CHROME_RUNTIME_ONMESSAGEEXTERNAL_SENDRESPONSE`

- Source: crx_headers/bg_header.js:475
- Sink: crx_headers/bg_header.js:475
- Evidence: CoCo legacy taint trace

### 2. STORAGE_POSOING

`CHROME_ONMESSAGEEXTERNAL_MESSAGE` → `CHROME_SYNC_STORAGE`

- Source: background.js:2
- Sink: background.js:2
- Evidence: CoCo legacy taint trace
