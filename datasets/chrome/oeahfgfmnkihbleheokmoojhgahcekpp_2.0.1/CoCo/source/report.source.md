# CoCo taint report (ExPGuard-aligned)

- Status: `success`
- Findings: `9`
- Duration: `13.755s`
- Statement coverage: `75.73%`
- Peak RSS: `217.133 MiB`

## Flows

### 1. DATA_LEAK

`STORAGE_ALL_ITEMS` → `FETCH_RESOURCE`

- Source: crx_headers/bg_header.js:498
- Sink: service_worker.js:195
- Evidence: CoCo legacy taint trace

### 2. DATA_LEAK

`STORAGE_ALL_ITEMS` → `FETCH_RESOURCE`

- Source: crx_headers/bg_header.js:498
- Sink: service_worker.js:30
- Evidence: CoCo legacy taint trace

### 3. REQUEST_FORGERY

`FETCH_RESPONSE` → `FETCH_RESOURCE`

- Source: crx_headers/bg_header.js:12
- Sink: service_worker.js:30
- Evidence: CoCo legacy taint trace

### 4. REQUEST_FORGERY

`CHROME_ONMESSAGEEXTERNAL_MESSAGE` → `FETCH_RESOURCE`

- Source: service_worker.js:94
- Sink: service_worker.js:30
- Evidence: CoCo legacy taint trace

### 5. REQUEST_FORGERY

`CHROME_ONMESSAGEEXTERNAL_MESSAGE` → `FETCH_RESOURCE`

- Source: service_worker.js:96
- Sink: service_worker.js:30
- Evidence: CoCo legacy taint trace

### 6. REQUEST_FORGERY

`CHROME_ONMESSAGEEXTERNAL_MESSAGE` → `FETCH_RESOURCE`

- Source: service_worker.js:94
- Sink: service_worker.js:94
- Evidence: CoCo legacy taint trace

### 7. REQUEST_FORGERY

`FETCH_RESPONSE` → `FETCH_RESOURCE`

- Source: crx_headers/bg_header.js:12
- Sink: service_worker.js:151
- Evidence: CoCo legacy taint trace

### 8. REQUEST_FORGERY

`CHROME_ONMESSAGEEXTERNAL_MESSAGE` → `FETCH_RESOURCE`

- Source: service_worker.js:96
- Sink: service_worker.js:151
- Evidence: CoCo legacy taint trace

### 9. DATA_LEAK

`STORAGE_ALL_ITEMS` → `FETCH_RESOURCE`

- Source: crx_headers/bg_header.js:498
- Sink: service_worker.js:151
- Evidence: CoCo legacy taint trace
