# CoCo taint report (ExPGuard-aligned)

- Status: `success`
- Findings: `2`
- Duration: `2.701s`
- Statement coverage: `30.00%`
- Peak RSS: `218.293 MiB`

## Flows

### 1. PRIVILEGE_ESCALATION

`TARGET_CUSTOM_EVENT` → `CHROME_DOWNLOADS_OPTIONS`

- Source: content.js:15
- Sink: content.js:17
- Evidence: CoCo legacy taint trace

### 2. PRIVILEGE_ESCALATION

`TARGET_CUSTOM_EVENT` → `CHROME_DOWNLOADS_OPTIONS`

- Source: content.js:15
- Sink: background.js:13
- Evidence: CoCo legacy taint trace
