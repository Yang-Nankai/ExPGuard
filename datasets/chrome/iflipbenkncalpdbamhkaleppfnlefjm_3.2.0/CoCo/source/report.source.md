# CoCo taint report (ExPGuard-aligned)

- Status: `success`
- Findings: `1`
- Duration: `13.346s`
- Statement coverage: `13.68%`
- Peak RSS: `238.070 MiB`

## Flows

### 1. PRIVILEGE_ESCALATION

`WINDOW_MESSAGE_EVENT` → `CHROME_NOTIFICATIONS_CREATE_OPTIONS`

- Source: js/content_script.js:1
- Sink: js/background.js:168
- Evidence: CoCo legacy taint trace
