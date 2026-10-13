# CoCo taint report (ExPGuard-aligned)

- Status: `failed`
- Findings: `4`
- Duration: `18.044s`
- Statement coverage: `n/a`
- Peak RSS: `227.812 MiB`

## Flows

### 1. STORAGE_POSOING

`WINDOW_MESSAGE_EVENT` → `CHROME_LOCAL_STORAGE`

- Source: js/content-script.js:70
- Sink: js/content-script.js:94
- Evidence: CoCo legacy taint trace

### 2. STORAGE_POSOING

`WINDOW_MESSAGE_EVENT` → `CHROME_LOCAL_STORAGE`

- Source: js/content-script.js:70
- Sink: js/content-script.js:110
- Evidence: CoCo legacy taint trace

### 3. STORAGE_POSOING

`WINDOW_MESSAGE_EVENT` → `CHROME_LOCAL_STORAGE`

- Source: js/content-script.js:70
- Sink: js/content-script.js:111
- Evidence: CoCo legacy taint trace

### 4. DATA_LEAK

`STORAGE_ALL_ITEMS` → `WINDOW_POSTMESSAGE`

- Source: crx_headers/cs_header.js:165
- Sink: js/content-script.js:135
- Evidence: CoCo legacy taint trace
