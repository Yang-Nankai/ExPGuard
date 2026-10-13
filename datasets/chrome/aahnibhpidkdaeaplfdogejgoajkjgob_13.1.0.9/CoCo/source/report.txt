# CoCo taint report (ExPGuard-aligned)

- Status: `failed`
- Findings: `4`
- Duration: `13.336s`
- Statement coverage: `n/a`
- Peak RSS: `224.238 MiB`

## Flows

### 1. DATA_LEAK

`STORAGE_ALL_ITEMS` → `FETCH_RESOURCE`

- Source: crx_headers/bg_header.js:498
- Sink: background.js:30
- Evidence: CoCo legacy taint trace

### 2. DATA_LEAK

`STORAGE_ALL_ITEMS` → `FETCH_RESOURCE`

- Source: crx_headers/bg_header.js:498
- Sink: background.js:99
- Evidence: CoCo legacy taint trace

### 3. REQUEST_FORGERY

`CHROME_ONMESSAGEEXTERNAL_MESSAGE` → `FETCH_RESOURCE`

- Source: background.js:215
- Sink: background.js:99
- Evidence: CoCo legacy taint trace

### 4. REQUEST_FORGERY

`CHROME_ONMESSAGEEXTERNAL_MESSAGE` → `FETCH_RESOURCE`

- Source: background.js:217
- Sink: background.js:99
- Evidence: CoCo legacy taint trace
