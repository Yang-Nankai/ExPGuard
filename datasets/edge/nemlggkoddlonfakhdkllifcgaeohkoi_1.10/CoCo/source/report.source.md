# CoCo taint report (ExPGuard-aligned)

- Status: `success`
- Findings: `9`
- Duration: `14.090s`
- Statement coverage: `73.98%`
- Peak RSS: `218.441 MiB`

## Flows

### 1. DATA_LEAK

`STORAGE_ALL_ITEMS` → `FETCH_RESOURCE`

- Source: crx_headers/bg_header.js:498
- Sink: service_worker.js:230
- Evidence: CoCo legacy taint trace

### 2. DATA_LEAK

`STORAGE_ALL_ITEMS` → `FETCH_RESOURCE`

- Source: crx_headers/bg_header.js:498
- Sink: service_worker.js:29
- Evidence: CoCo legacy taint trace

### 3. REQUEST_FORGERY

`FETCH_RESPONSE` → `FETCH_RESOURCE`

- Source: crx_headers/bg_header.js:12
- Sink: service_worker.js:29
- Evidence: CoCo legacy taint trace

### 4. REQUEST_FORGERY

`CHROME_ONMESSAGEEXTERNAL_MESSAGE` → `FETCH_RESOURCE`

- Source: service_worker.js:129
- Sink: service_worker.js:29
- Evidence: CoCo legacy taint trace

### 5. REQUEST_FORGERY

`CHROME_ONMESSAGEEXTERNAL_MESSAGE` → `FETCH_RESOURCE`

- Source: service_worker.js:131
- Sink: service_worker.js:29
- Evidence: CoCo legacy taint trace

### 6. REQUEST_FORGERY

`CHROME_ONMESSAGEEXTERNAL_MESSAGE` → `FETCH_RESOURCE`

- Source: service_worker.js:129
- Sink: service_worker.js:129
- Evidence: CoCo legacy taint trace

### 7. DATA_LEAK

`STORAGE_ALL_ITEMS` → `FETCH_RESOURCE`

- Source: crx_headers/bg_header.js:498
- Sink: service_worker.js:186
- Evidence: CoCo legacy taint trace

### 8. REQUEST_FORGERY

`FETCH_RESPONSE` → `FETCH_RESOURCE`

- Source: crx_headers/bg_header.js:12
- Sink: service_worker.js:186
- Evidence: CoCo legacy taint trace

### 9. REQUEST_FORGERY

`CHROME_ONMESSAGEEXTERNAL_MESSAGE` → `FETCH_RESOURCE`

- Source: service_worker.js:131
- Sink: service_worker.js:186
- Evidence: CoCo legacy taint trace
