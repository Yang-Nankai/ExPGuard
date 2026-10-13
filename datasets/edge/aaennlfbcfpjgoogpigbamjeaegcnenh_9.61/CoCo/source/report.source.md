# CoCo taint report (ExPGuard-aligned)

- Status: `success`
- Findings: `1`
- Duration: `18.875s`
- Statement coverage: `6.00%`
- Peak RSS: `258.270 MiB`

## Flows

### 1. DATA_LEAK

`CHROME_TABS_CAPUTURE_VISIBLE_TAB` → `CHROME_RUNTIME_ONMESSAGEEXTERNAL_SENDRESPONSE`

- Source: crx_headers/expguard_compat_header.js:69
- Sink: crx_headers/expguard_compat_header.js:69
- Evidence: CoCo legacy taint trace
