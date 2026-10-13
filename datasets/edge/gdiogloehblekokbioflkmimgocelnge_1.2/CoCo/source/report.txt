# CoCo taint report (ExPGuard-aligned)

- Status: `success`
- Findings: `1`
- Duration: `6.134s`
- Statement coverage: `26.09%`
- Peak RSS: `226.121 MiB`

## Flows

### 1. STORAGE_POSOING

`DOCUMENT_TITLE` → `CHROME_SESSION_STORAGE`

- Source: crx_headers/expguard_compat_header.js:41
- Sink: crx_headers/expguard_compat_header.js:41
- Evidence: CoCo legacy taint trace
