# CoCo taint report (ExPGuard-aligned)

- Status: `success`
- Findings: `1`
- Duration: `6.013s`
- Statement coverage: `10.78%`
- Peak RSS: `215.895 MiB`

## Flows

### 1. DATA_LEAK

`CHROME_IDENTITY_PROFILE` → `CHROME_RUNTIME_ONMESSAGEEXTERNAL_SENDRESPONSE`

- Source: crx_headers/expguard_compat_header.js:83
- Sink: background.js:126
- Evidence: CoCo legacy taint trace
