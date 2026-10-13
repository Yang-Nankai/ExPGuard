# CoCo taint report (ExPGuard-aligned)

- Status: `failed`
- Findings: `1`
- Duration: `11.896s`
- Statement coverage: `n/a`
- Peak RSS: `242.469 MiB`

## Flows

### 1. DATA_LEAK

`STORAGE_ALL_ITEMS` → `WINDOW_POSTMESSAGE`

- Source: crx_headers/cs_header.js:165
- Sink: content.js:1
- Evidence: CoCo legacy taint trace
