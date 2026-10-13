# CoCo taint report (ExPGuard-aligned)

- Status: `success`
- Findings: `3`
- Duration: `1.981s`
- Statement coverage: `0.00%`
- Peak RSS: `160.008 MiB`

## Flows

### 1. STORAGE_POSOING

`WINDOW_MESSAGE_EVENT` → `CHROME_SYNC_STORAGE`

- Source: contentScript.bundle.js:1
- Sink: contentScript.bundle.js:1
- Evidence: CoCo legacy taint trace

### 2. DATA_LEAK

`STORAGE_ALL_ITEMS` → `WINDOW_POSTMESSAGE`

- Source: crx_headers/cs_header.js:142
- Sink: contentScript.bundle.js:1
- Evidence: CoCo legacy taint trace

### 3. DATA_LEAK

`STORAGE_ALL_ITEMS` → `WINDOW_POSTMESSAGE`

- Source: crx_headers/cs_header.js:142
- Sink: crx_headers/cs_header.js:142
- Evidence: CoCo legacy taint trace
