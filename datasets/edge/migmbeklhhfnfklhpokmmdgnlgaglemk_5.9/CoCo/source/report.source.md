# CoCo taint report (ExPGuard-aligned)

- Status: `success`
- Findings: `2`
- Duration: `8.195s`
- Statement coverage: `33.02%`
- Peak RSS: `231.605 MiB`

## Flows

### 1. PRIVILEGE_ESCALATION

`CHROME_ONMESSAGEEXTERNAL_MESSAGE` → `CHROME_WINDOWS_CREATE_OPTIONS`

- Source: eventPage.js:112
- Sink: eventPage.js:127
- Evidence: CoCo legacy taint trace

### 2. STORAGE_POSOING

`CHROME_ONMESSAGEEXTERNAL_MESSAGE` → `CHROME_LOCAL_STORAGE`

- Source: eventPage.js:112
- Sink: eventPage.js:135
- Evidence: CoCo legacy taint trace
