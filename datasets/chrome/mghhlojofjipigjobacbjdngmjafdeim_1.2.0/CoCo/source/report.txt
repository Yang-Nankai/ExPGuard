# CoCo taint report (ExPGuard-aligned)

- Status: `success`
- Findings: `1`
- Duration: `29.328s`
- Statement coverage: `25.00%`
- Peak RSS: `300.891 MiB`

## Flows

### 1. PRIVILEGE_ESCALATION

`TARGET_CUSTOM_EVENT` → `CHROME_ACTION_BADGE_OPTIONS`

- Source: content_script.js:151
- Sink: background.js:9
- Evidence: CoCo legacy taint trace
