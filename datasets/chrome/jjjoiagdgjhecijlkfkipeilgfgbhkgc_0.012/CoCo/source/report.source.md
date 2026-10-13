# CoCo taint report (ExPGuard-aligned)

- Status: `success`
- Findings: `7`
- Duration: `3.790s`
- Statement coverage: `0.00%`
- Peak RSS: `199.043 MiB`

## Flows

### 1. DATA_LEAK

`STORAGE_ALL_ITEMS` → `CHROME_RUNTIME_ONMESSAGEEXTERNAL_SENDRESPONSE`

- Source: crx_headers/bg_header.js:499
- Sink: crx_headers/bg_header.js:499
- Evidence: CoCo legacy taint trace

### 2. DATA_LEAK

`STORAGE_ALL_ITEMS` → `CHROME_RUNTIME_ONMESSAGEEXTERNAL_SENDRESPONSE`

- Source: crx_headers/bg_header.js:498
- Sink: crx_headers/bg_header.js:498
- Evidence: CoCo legacy taint trace

### 3. STORAGE_POSOING

`CHROME_ONMESSAGEEXTERNAL_MESSAGE` → `CHROME_LOCAL_STORAGE`

- Source: background.js:43
- Sink: background.js:9
- Evidence: CoCo legacy taint trace

### 4. STORAGE_POSOING

`CHROME_ONMESSAGEEXTERNAL_MESSAGE` → `CHROME_LOCAL_STORAGE`

- Source: background.js:43
- Sink: background.js:44
- Evidence: CoCo legacy taint trace

### 5. STORAGE_POSOING

`CHROME_ONMESSAGEEXTERNAL_MESSAGE` → `CHROME_LOCAL_STORAGE`

- Source: background.js:117
- Sink: background.js:9
- Evidence: CoCo legacy taint trace

### 6. STORAGE_POSOING

`CHROME_ONMESSAGEEXTERNAL_MESSAGE` → `CHROME_LOCAL_STORAGE`

- Source: background.js:117
- Sink: background.js:118
- Evidence: CoCo legacy taint trace

### 7. UNKNOWN

`UNKNOWN_SOURCE` → `CHROME_LOCAL_STORAGE`

- Source: unknown:?
- Sink: unknown:?
- Evidence: CoCo sink hit without a serializable source trace
