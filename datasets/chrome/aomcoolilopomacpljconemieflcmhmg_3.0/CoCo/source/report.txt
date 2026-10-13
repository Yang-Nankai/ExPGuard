# CoCo taint report (ExPGuard-aligned)

- Status: `success`
- Findings: `1`
- Duration: `14.073s`
- Statement coverage: `25.00%`
- Peak RSS: `214.844 MiB`

## Flows

### 1. DATA_LEAK

`STORAGE_ALL_ITEMS` → `FETCH_RESOURCE`

- Source: crx_headers/bg_header.js:498
- Sink: background.js:435
- Evidence: CoCo legacy taint trace
