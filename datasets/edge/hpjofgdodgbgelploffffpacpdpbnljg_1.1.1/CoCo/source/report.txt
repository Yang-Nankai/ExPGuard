# CoCo taint report (ExPGuard-aligned)

- Status: `success`
- Findings: `2`
- Duration: `4.293s`
- Statement coverage: `30.77%`
- Peak RSS: `220.512 MiB`

## Flows

### 1. STORAGE_POSOING

`CHROME_ONMESSAGEEXTERNAL_MESSAGE` → `CHROME_LOCAL_STORAGE`

- Source: js/background.js:110
- Sink: js/background.js:110
- Evidence: CoCo legacy taint trace

### 2. PRIVILEGE_ESCALATION

`CHROME_ONMESSAGEEXTERNAL_MESSAGE` → `CHROME_TABS_CREATE_OPTIONS`

- Source: js/background.js:110
- Sink: js/background.js:70
- Evidence: CoCo legacy taint trace
