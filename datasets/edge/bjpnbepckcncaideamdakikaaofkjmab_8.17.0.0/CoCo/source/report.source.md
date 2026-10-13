# CoCo taint report (ExPGuard-aligned)

- Status: `success`
- Findings: `8`
- Duration: `176.623s`
- Statement coverage: `63.20%`
- Peak RSS: `216.781 MiB`

## Flows

### 1. DATA_LEAK

`STORAGE_ALL_ITEMS` → `FETCH_RESOURCE`

- Source: crx_headers/bg_header.js:498
- Sink: gen/ext_bg_module.js:482
- Evidence: CoCo legacy taint trace

### 2. DATA_LEAK

`STORAGE_ALL_ITEMS` → `CHROME_RUNTIME_ONMESSAGEEXTERNAL_SENDRESPONSE`

- Source: crx_headers/bg_header.js:498
- Sink: gen/ext_bg_module.js:132
- Evidence: CoCo legacy taint trace

### 3. STORAGE_POSOING

`CHROME_ONMESSAGEEXTERNAL_MESSAGE` → `CHROME_LOCAL_STORAGE`

- Source: gen/ext_bg_module.js:142
- Sink: gen/ext_bg_module.js:142
- Evidence: CoCo legacy taint trace

### 4. STORAGE_POSOING

`CHROME_ONMESSAGEEXTERNAL_MESSAGE` → `CHROME_LOCAL_STORAGE`

- Source: gen/ext_bg_module.js:145
- Sink: gen/ext_bg_module.js:145
- Evidence: CoCo legacy taint trace

### 5. STORAGE_POSOING

`CHROME_ONMESSAGEEXTERNAL_MESSAGE` → `CHROME_LOCAL_STORAGE`

- Source: gen/ext_bg_module.js:151
- Sink: gen/ext_bg_module.js:151
- Evidence: CoCo legacy taint trace

### 6. PRIVILEGE_ESCALATION

`CHROME_ONMESSAGEEXTERNAL_MESSAGE` → `CHROME_WINDOWS_CREATE_OPTIONS`

- Source: gen/ext_bg_module.js:157
- Sink: gen/ext_bg_module.js:228
- Evidence: CoCo legacy taint trace

### 7. STORAGE_POSOING

`CHROME_ONMESSAGEEXTERNAL_MESSAGE` → `CHROME_LOCAL_STORAGE`

- Source: gen/ext_bg_module.js:172
- Sink: gen/ext_bg_module.js:172
- Evidence: CoCo legacy taint trace

### 8. UNKNOWN

`UNKNOWN_SOURCE` → `CHROME_LOCAL_STORAGE`

- Source: unknown:?
- Sink: unknown:?
- Evidence: CoCo sink hit without a serializable source trace
