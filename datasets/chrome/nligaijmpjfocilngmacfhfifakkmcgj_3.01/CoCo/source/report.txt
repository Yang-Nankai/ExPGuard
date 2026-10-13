# CoCo taint report (ExPGuard-aligned)

- Status: `success`
- Findings: `3`
- Duration: `3.271s`
- Statement coverage: `16.28%`
- Peak RSS: `198.605 MiB`

## Flows

### 1. REQUEST_FORGERY

`CHROME_ONMESSAGEEXTERNAL_MESSAGE` → `XML_HTTP_REQUEST_OPEN`

- Source: background.js:24
- Sink: background.js:106
- Evidence: CoCo legacy taint trace

### 2. REQUEST_FORGERY

`CHROME_ONMESSAGEEXTERNAL_MESSAGE` → `XML_HTTP_REQUEST_SEND`

- Source: background.js:24
- Sink: background.js:130
- Evidence: CoCo legacy taint trace

### 3. UNKNOWN

`XML_HTTP_RESPONSE` → `CHROME_RUNTIME_ONMESSAGEEXTERNAL_SENDRESPONSE`

- Source: crx_headers/bg_header.js:79
- Sink: background.js:122
- Evidence: CoCo legacy taint trace
