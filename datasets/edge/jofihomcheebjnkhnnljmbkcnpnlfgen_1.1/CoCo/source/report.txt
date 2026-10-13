# CoCo taint report (ExPGuard-aligned)

- Status: `success`
- Findings: `1`
- Duration: `4.809s`
- Statement coverage: `0.00%`
- Peak RSS: `222.852 MiB`

## Flows

### 1. STORAGE_POSOING

`DOCUMENT_TITLE` → `CHROME_LOCAL_STORAGE`

- Source: crx_headers/expguard_compat_header.js:41
- Sink: crx_headers/expguard_compat_header.js:41
- Evidence: CoCo legacy taint trace
