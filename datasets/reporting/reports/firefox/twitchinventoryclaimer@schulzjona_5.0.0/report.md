# Security Vulnerability Report: Critical Privilege Escalation in Twitch Inventory Claimer

## Summary

We are writing on behalf of a security research team from Nankai University and the University of Liverpool. Our Ground Truth review identified **1 Flow(s)** in **Twitch Inventory Claimer** (firefox, extension ID `twitchinventoryclaimer@schulzjona`, version `5.0.0`).
The recorded issue type(s): **Privilege Escalation**.

## Affected Extension Details

- Name: Twitch Inventory Claimer
- Platform: firefox
- Extension ID: `twitchinventoryclaimer@schulzjona`
- Dataset version: `5.0.0`
- Store version at review: `5.0.0`
- Users: 8581
- Analysis tools: DoubleX

## Findings

### Finding 1: Privilege Escalation

The Ground Truth record traces A page or sender able to reach the recorded message/event source from `WINDOW_MESSAGE_EVENT` (DoubleX web-accessible message input) in content_scripts.js at L43 to the privileged sink `CHROME_NOTIFICATIONS_CREATE_OPTIONS` (chrome.notifications.create) in background.js at L137. The source scope is on pages matching `https://www.twitch.tv/*`. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-9ce178a62bfafcbe`
- Severity recorded by the analysis: **CRITICAL**
- Source: `WINDOW_MESSAGE_EVENT` (DoubleX web-accessible message input) in content_scripts.js at L43
- Sink: `CHROME_NOTIFICATIONS_CREATE_OPTIONS` (chrome.notifications.create) in background.js at L137
- Tools reporting this Flow: DoubleX

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); DoubleX matched external input to a sensitive API parameter.

#### Analysis and validation

- Static (DoubleX): verdict `TRUE_POSITIVE`, confidence 0.6; report `extensions/twitchinventoryclaimer@schulzjona_5.0.0/static/static_report.json`.
- Dynamic (DoubleX): `SINK_NOT_FIRED` (basis `runtime_or_static_dynamic_evidence`); the recorded replay did not establish the complete source-to-sink effect; report `extensions/twitchinventoryclaimer@schulzjona_5.0.0/dynamic/dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `5.0.0` in a disposable firefox profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Use only a harmless marker in a disposable profile.
window.postMessage({ marker: "EXPGuard_test_marker" }, "*");
```

#### Supporting material

- DoubleX: source report `DoubleX/firefox/flow-verification-results-no-duplicate.json`; static report `extensions/twitchinventoryclaimer@schulzjona_5.0.0/static/static_report.json`; dynamic report `extensions/twitchinventoryclaimer@schulzjona_5.0.0/dynamic/dynamic_report.json`.


## Recommendations

1. Reduce host permissions and sensitive API access to the smallest scope required by the feature.

## Impact

The demonstrated impact is limited to the operation described in each finding and the extension's granted permissions. The evidence above distinguishes the recorded static path from any runtime result; it does not imply unrelated account compromise, data theft, or malware installation.

## Disclosure Status

- Report class: `version_unchanged`
- This report covers only the listed Ground Truth Flow(s). Newly introduced Flow(s) are outside scope.
- Contact discovery: `missing` (No reliable public email found)

Please contact us so that we can coordinate remediation and retest the affected Flow(s).

Regards,
Xin Yang
Nankai University / University of Liverpool
