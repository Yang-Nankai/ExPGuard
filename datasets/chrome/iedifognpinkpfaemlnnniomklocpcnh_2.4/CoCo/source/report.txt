# CoCo taint report (ExPGuard-aligned)

- Status: `success`
- Findings: `2`
- Duration: `151.067s`
- Statement coverage: `25.00%`
- Peak RSS: `244.945 MiB`

## Flows

### 1. REQUEST_FORGERY

`CHROME_ONMESSAGEEXTERNAL_MESSAGE` → `FETCH_RESOURCE`

- Source: js/background.js:1
- Sink: js/background.js:1
- Evidence: CoCo legacy taint trace

### 2. UNKNOWN

`FETCH_RESPONSE` → `CHROME_RUNTIME_ONMESSAGEEXTERNAL_SENDRESPONSE`

- Source: crx_headers/bg_header.js:12
- Sink: crx_headers/bg_header.js:12
- Evidence: CoCo legacy taint trace
