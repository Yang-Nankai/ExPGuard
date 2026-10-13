# Security Vulnerability Report: Critical Extension Storage Poisoning in ClearPass Onboard

## Summary

We are writing on behalf of a security research team from Nankai University and the University of Liverpool. Our Ground Truth review identified **1 Flow(s)** in **ClearPass Onboard** (chrome, extension ID `gdkddcndonbadjjminbeeokgcknciebo`, version `6.11.18.2503`).
The recorded issue type(s): **Extension Storage Poisoning**.

## Affected Extension Details

- Name: ClearPass Onboard
- Platform: chrome
- Extension ID: `gdkddcndonbadjjminbeeokgcknciebo`
- Dataset version: `6.11.18.2503`
- Store version at review: `6.11.18.2503`
- Users: 100000
- Analysis tools: DoubleX

## Findings

### Finding 1: Storage Poisoning

The Ground Truth record traces A page or sender able to reach the recorded message/event source from `WINDOW_MESSAGE_EVENT` (DoubleX web-accessible message input) in content_scripts.js at L2 to the privileged sink `CHROME_LOCAL_STORAGE` (chrome.storage.local.set) in background.js at L220. The source scope is on pages matching `*://*/guest/mdps_status.php, *://*/onboard/mdps_status.php`. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-f619271aa1637e0b`
- Severity recorded by the analysis: **CRITICAL**
- Source: `WINDOW_MESSAGE_EVENT` (DoubleX web-accessible message input) in content_scripts.js at L2
- Sink: `CHROME_LOCAL_STORAGE` (chrome.storage.local.set) in background.js at L220
- Tools reporting this Flow: DoubleX

- Privilege boundary recorded: `False` (CONTENT_SCRIPT_MATCHES); DoubleX matched external input to a sensitive API parameter.

#### Analysis and validation

- Static (DoubleX): verdict `FALSE_POSITIVE`, confidence 0.6; report `extensions/gdkddcndonbadjjminbeeokgcknciebo_6.11.18.2503/static/static_report.json`.
- Dynamic (DoubleX): `INCONCLUSIVE_AFTER_DEBUG` (basis `runtime_or_static_dynamic_evidence`); the dynamic agent exceeded its 30-second budget, so this run did not establish a decisive runtime result; report `extensions/gdkddcndonbadjjminbeeokgcknciebo_6.11.18.2503/dynamic/dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `6.11.18.2503` in a disposable chrome profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Use only a harmless marker in a disposable profile.
window.postMessage({ marker: "EXPGuard_test_marker" }, "*");
```

#### Supporting material

- DoubleX: source report `DoubleX/chrome/flow-verification-results-no-duplicate.json`; static report `extensions/gdkddcndonbadjjminbeeokgcknciebo_6.11.18.2503/static/static_report.json`; dynamic report `extensions/gdkddcndonbadjjminbeeokgcknciebo_6.11.18.2503/dynamic/dynamic_report.json`.


## Recommendations

1. Do not let page-controlled cookies or DOM values select extension-owned storage values; validate the expected value and keep credentials in extension-owned UI/state.
2. Treat storage writes as privileged state changes: use an allowlisted schema, reject attacker-controlled keys, and avoid merging untrusted objects into extension state.
3. Reduce host permissions and sensitive API access to the smallest scope required by the feature.

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
