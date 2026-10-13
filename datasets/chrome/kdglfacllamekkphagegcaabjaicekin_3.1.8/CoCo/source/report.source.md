# CoCo taint report (ExPGuard-aligned)

- Status: `success`
- Findings: `6`
- Duration: `16.671s`
- Statement coverage: `5.63%`
- Peak RSS: `342.867 MiB`

## Flows

### 1. STORAGE_POSOING

`CHROME_ONMESSAGEEXTERNAL_MESSAGE` → `CHROME_SYNC_STORAGE`

- Source: background.js:34
- Sink: background.js:34
- Evidence: CoCo legacy taint trace

### 2. DATA_LEAK

`STORAGE_ALL_ITEMS` → `CHROME_RUNTIME_ONMESSAGEEXTERNAL_SENDRESPONSE`

- Source: crx_headers/bg_header.js:474
- Sink: background.js:279
- Evidence: CoCo legacy taint trace

### 3. REQUEST_FORGERY

`CHROME_ONMESSAGEEXTERNAL_MESSAGE` → `WEBSOCKET_URL`

- Source: background.js:34
- Sink: background.js:598
- Evidence: CoCo legacy taint trace

### 4. DATA_LEAK

`CHROME_COOKIES_INFO` → `CHROME_RUNTIME_ONMESSAGEEXTERNAL_SENDRESPONSE`

- Source: background.js:279
- Sink: background.js:279
- Evidence: CoCo legacy taint trace

### 5. DATA_LEAK

`CHROME_COOKIES_INFO` → `CHROME_RUNTIME_ONMESSAGEEXTERNAL_SENDRESPONSE`

- Source: unknown:?
- Sink: unknown:?
- Evidence: CoCo legacy taint trace

### 6. DATA_LEAK

`CHROME_COOKIES_INFO` → `CHROME_RUNTIME_ONMESSAGEEXTERNAL_SENDRESPONSE`

- Source: background.js:284
- Sink: background.js:284
- Evidence: CoCo legacy taint trace
