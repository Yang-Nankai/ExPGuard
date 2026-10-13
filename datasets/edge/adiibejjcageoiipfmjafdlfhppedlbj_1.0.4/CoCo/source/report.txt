# CoCo taint report (ExPGuard-aligned)

- Status: `success`
- Findings: `4`
- Duration: `9.968s`
- Statement coverage: `77.50%`
- Peak RSS: `221.602 MiB`

## Flows

### 1. DATA_LEAK

`CHROME_DOWNLOADS_SEARCH` → `FETCH_RESOURCE`

- Source: crx_headers/bg_header.js:550
- Sink: background.js:60
- Evidence: CoCo legacy taint trace

### 2. DATA_LEAK

`CHROME_DOWNLOADS_SEARCH` → `FETCH_RESOURCE`

- Source: crx_headers/bg_header.js:550
- Sink: background.js:67
- Evidence: CoCo legacy taint trace

### 3. DATA_LEAK

`STORAGE_ALL_ITEMS` → `CHROME_RUNTIME_ONMESSAGEEXTERNAL_SENDRESPONSE`

- Source: crx_headers/bg_header.js:498
- Sink: background.js:21
- Evidence: CoCo legacy taint trace

### 4. STORAGE_POSOING

`CHROME_ONMESSAGEEXTERNAL_MESSAGE` → `CHROME_LOCAL_STORAGE`

- Source: background.js:122
- Sink: background.js:122
- Evidence: CoCo legacy taint trace
