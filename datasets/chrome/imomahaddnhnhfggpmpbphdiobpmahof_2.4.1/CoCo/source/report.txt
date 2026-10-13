# CoCo taint report (ExPGuard-aligned)

- Status: `success`
- Findings: `5`
- Duration: `6.686s`
- Statement coverage: `29.17%`
- Peak RSS: `214.402 MiB`

## Flows

### 1. REQUEST_FORGERY

`CHROME_ONMESSAGEEXTERNAL_MESSAGE` → `FETCH_RESOURCE`

- Source: resources/js/background.js:32
- Sink: resources/js/background.js:15
- Evidence: CoCo legacy taint trace

### 2. STORAGE_POSOING

`CHROME_ONMESSAGEEXTERNAL_MESSAGE` → `CHROME_LOCAL_STORAGE`

- Source: resources/js/background.js:32
- Sink: resources/js/background.js:32
- Evidence: CoCo legacy taint trace

### 3. STORAGE_POSOING

`CHROME_ONMESSAGEEXTERNAL_MESSAGE` → `CHROME_LOCAL_STORAGE`

- Source: unknown:?
- Sink: unknown:?
- Evidence: CoCo legacy taint trace

### 4. STORAGE_POSOING

`CHROME_ONMESSAGEEXTERNAL_MESSAGE` → `CHROME_LOCAL_STORAGE`

- Source: resources/js/background.js:32
- Sink: resources/js/background.js:14
- Evidence: CoCo legacy taint trace

### 5. STORAGE_POSOING

`CHROME_ONMESSAGEEXTERNAL_MESSAGE` → `CHROME_LOCAL_STORAGE`

- Source: resources/js/background.js:26
- Sink: resources/js/background.js:26
- Evidence: CoCo legacy taint trace
