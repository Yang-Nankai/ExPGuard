# CoCo taint report (ExPGuard-aligned)

- Status: `failed`
- Findings: `1`
- Duration: `18.814s`
- Statement coverage: `n/a`
- Peak RSS: `244.520 MiB`

## Flows

### 1. STORAGE_POSOING

`ELEMENT_TEXT_CONTENT` → `CHROME_LOCAL_STORAGE`

- Source: crx_headers/jquery_header.js:27
- Sink: js/main.js:247
- Evidence: CoCo legacy taint trace
