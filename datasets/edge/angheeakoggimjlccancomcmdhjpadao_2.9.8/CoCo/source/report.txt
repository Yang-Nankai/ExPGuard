# CoCo taint report (ExPGuard-aligned)

- Status: `success`
- Findings: `3`
- Duration: `1.694s`
- Statement coverage: `0.00%`
- Peak RSS: `201.496 MiB`

## Flows

### 1. DATA_LEAK

`STORAGE_ALL_ITEMS` → `CHROME_RUNTIME_ONMESSAGEEXTERNAL_SENDRESPONSE`

- Source: crx_headers/bg_header.js:498
- Sink: crx_headers/bg_header.js:498
- Evidence: CoCo legacy taint trace

### 2. DATA_LEAK

`STORAGE_ALL_ITEMS` → `CHROME_RUNTIME_ONMESSAGEEXTERNAL_SENDRESPONSE`

- Source: crx_headers/bg_header.js:499
- Sink: crx_headers/bg_header.js:499
- Evidence: CoCo legacy taint trace

### 3. STORAGE_POSOING

`CHROME_ONMESSAGEEXTERNAL_MESSAGE` → `CHROME_LOCAL_STORAGE`

- Source: background.js:1
- Sink: background.js:1
- Evidence: CoCo legacy taint trace
