# CoCo taint report (ExPGuard-aligned)

- Status: `success`
- Findings: `2`
- Duration: `1.011s`
- Statement coverage: `0.00%`
- Peak RSS: `155.852 MiB`

## Flows

### 1. STORAGE_POSOING

`WINDOW_MESSAGE_EVENT` → `CHROME_SYNC_STORAGE`

- Source: js/dvo_msg_listeners.js:2
- Sink: js/dvo_msg_listeners.js:9
- Evidence: CoCo legacy taint trace

### 2. STORAGE_POSOING

`WINDOW_MESSAGE_EVENT` → `CHROME_SYNC_STORAGE`

- Source: js/dvo_msg_listeners.js:2
- Sink: js/dvo_msg_listeners.js:10
- Evidence: CoCo legacy taint trace
