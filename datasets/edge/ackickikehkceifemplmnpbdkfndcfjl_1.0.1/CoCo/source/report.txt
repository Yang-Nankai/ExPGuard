# CoCo taint report (ExPGuard-aligned)

- Status: `success`
- Findings: `1`
- Duration: `7.207s`
- Statement coverage: `25.37%`
- Peak RSS: `208.320 MiB`

## Flows

### 1. PRIVILEGE_ESCALATION

`TARGET_CUSTOM_EVENT` → `CHROME_TABS_CREATE_OPTIONS`

- Source: scripts/chrome/content-scripts.js:1
- Sink: scripts/chrome/service-worker.js:17
- Evidence: CoCo legacy taint trace
