# CoCo taint report (ExPGuard-aligned)

- Status: `success`
- Findings: `3`
- Duration: `10.167s`
- Statement coverage: `46.51%`
- Peak RSS: `269.586 MiB`

## Flows

### 1. STORAGE_POSOING

`WINDOW_MESSAGE_EVENT` → `CHROME_LOCAL_STORAGE`

- Source: content.min.js:1
- Sink: content.min.js:1
- Evidence: CoCo legacy taint trace

### 2. DATA_LEAK

`STORAGE_ALL_ITEMS` → `WINDOW_POSTMESSAGE`

- Source: crx_headers/cs_header.js:165
- Sink: content.min.js:1
- Evidence: CoCo legacy taint trace

### 3. DATA_LEAK

`STORAGE_ALL_ITEMS` → `WINDOW_POSTMESSAGE`

- Source: crx_headers/cs_header.js:165
- Sink: external.min.js:1
- Evidence: CoCo legacy taint trace
