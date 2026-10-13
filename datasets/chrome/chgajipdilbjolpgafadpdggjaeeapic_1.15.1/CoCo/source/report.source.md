# CoCo taint report (ExPGuard-aligned)

- Status: `success`
- Findings: `4`
- Duration: `74.381s`
- Statement coverage: `0.00%`
- Peak RSS: `235.855 MiB`

## Flows

### 1. STORAGE_POSOING

`TARGET_CUSTOM_EVENT` → `CHROME_LOCAL_STORAGE`

- Source: extended.js:65
- Sink: extended.js:66
- Evidence: CoCo legacy taint trace

### 2. STORAGE_POSOING

`TARGET_CUSTOM_EVENT` → `CHROME_LOCAL_STORAGE`

- Source: extended.js:65
- Sink: extended.js:68
- Evidence: CoCo legacy taint trace

### 3. STORAGE_POSOING

`TARGET_CUSTOM_EVENT` → `CHROME_LOCAL_STORAGE`

- Source: extended.js:65
- Sink: extended.js:69
- Evidence: CoCo legacy taint trace

### 4. STORAGE_POSOING

`TARGET_CUSTOM_EVENT` → `CHROME_LOCAL_STORAGE`

- Source: extended.js:65
- Sink: extended.js:70
- Evidence: CoCo legacy taint trace
