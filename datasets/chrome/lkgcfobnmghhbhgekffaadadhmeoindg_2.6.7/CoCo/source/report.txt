# CoCo taint report (ExPGuard-aligned)

- Status: `success`
- Findings: `2`
- Duration: `1.389s`
- Statement coverage: `0.00%`
- Peak RSS: `152.898 MiB`

## Flows

### 1. DATA_LEAK

`STORAGE_ALL_ITEMS` → `WINDOW_POSTMESSAGE`

- Source: crx_headers/cs_header.js:165
- Sink: crx_headers/cs_header.js:165
- Evidence: CoCo legacy taint trace

### 2. DATA_LEAK

`STORAGE_ALL_ITEMS` → `WINDOW_POSTMESSAGE`

- Source: crx_headers/cs_header.js:166
- Sink: crx_headers/cs_header.js:166
- Evidence: CoCo legacy taint trace
