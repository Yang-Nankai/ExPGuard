# CoCo taint report (ExPGuard-aligned)

- Status: `failed`
- Findings: `2`
- Duration: `54.408s`
- Statement coverage: `n/a`
- Peak RSS: `252.871 MiB`

## Flows

### 1. STORAGE_POSOING

`ELEMENT_VALUE` → `CHROME_LOCAL_STORAGE`

- Source: crx_headers/expguard_compat_header.js:33
- Sink: crx_headers/expguard_compat_header.js:33
- Evidence: CoCo legacy taint trace

### 2. STORAGE_POSOING

`ELEMENT_VALUE` → `CHROME_LOCAL_STORAGE`

- Source: crx_headers/expguard_compat_header.js:33
- Sink: js/content_script.js:1
- Evidence: CoCo legacy taint trace
