# CoCo taint report (ExPGuard-aligned)

- Status: `success`
- Findings: `3`
- Duration: `3.722s`
- Statement coverage: `65.00%`
- Peak RSS: `206.867 MiB`

## Flows

### 1. STORAGE_POSOING

`CHROME_ONMESSAGEEXTERNAL_MESSAGE` → `CHROME_LOCAL_STORAGE`

- Source: js/background.js:6
- Sink: js/background.js:6
- Evidence: CoCo legacy taint trace

### 2. PRIVILEGE_ESCALATION

`FETCH_RESPONSE` → `CHROME_DECLARATIVENETREQUEST_RULES`

- Source: crx_headers/bg_header.js:12
- Sink: crx_headers/bg_header.js:12
- Evidence: CoCo legacy taint trace

### 3. PRIVILEGE_ESCALATION

`CHROME_ONMESSAGEEXTERNAL_MESSAGE` → `CHROME_DECLARATIVENETREQUEST_RULES`

- Source: js/background.js:6
- Sink: js/background.js:6
- Evidence: CoCo legacy taint trace
