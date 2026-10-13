# Security Vulnerability Report: Critical Extension Storage Poisoning in Safe Browser – Website Filtering Controls

## Summary

We are writing on behalf of a security research team from Nankai University and the University of Liverpool. Our Ground Truth review identified **1 Flow(s)** in **Safe Browser – Website Filtering Controls** (edge, extension ID `bckjehjkancjdhpaiakanfinhlapmnnl`, version `2.1.2`).
The recorded issue type(s): **Extension Storage Poisoning**.

## Affected Extension Details

- Name: Safe Browser – Website Filtering Controls
- Platform: edge
- Extension ID: `bckjehjkancjdhpaiakanfinhlapmnnl`
- Dataset version: `2.1.2`
- Store version at review: `2.1.2`
- Users: 98
- Analysis tools: DoubleX

## Findings

### Finding 1: Storage Poisoning

The Ground Truth record traces A page or sender able to reach the recorded message/event source from `WINDOW_MESSAGE_EVENT` (DoubleX web-accessible message input) in content_scripts.js at L27 to the privileged sink `CHROME_SYNC_STORAGE` (chrome.storage.sync.set) in background.js at L901. The source scope is on pages matching `https://app.kiddoware.com/kw_backend_new/public/kpsb-extension-auth*, https://*.app.kiddoware.com/kw_backend_new/public/kpsb-extension-auth*`. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-fbcb3894f9be5cc1`
- Severity recorded by the analysis: **CRITICAL**
- Source: `WINDOW_MESSAGE_EVENT` (DoubleX web-accessible message input) in content_scripts.js at L27
- Sink: `CHROME_SYNC_STORAGE` (chrome.storage.sync.set) in background.js at L901
- Tools reporting this Flow: DoubleX

- Privilege boundary recorded: `False` (CONTENT_SCRIPT_MATCHES); DoubleX matched external input to a sensitive API parameter.

#### Analysis and validation

- Static (DoubleX): verdict `TRUE_POSITIVE`, confidence 0.6; report `extensions/bckjehjkancjdhpaiakanfinhlapmnnl_2.1.2/static/static_report.json`.
- Dynamic (DoubleX): `PARTIAL` (evidence stage `SINK_REACHED`); the recorded replay did not establish the complete source-to-sink effect; report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\round-doublex-edge-unconfirmed-20-r1\dynamic\doublex-edge-r1\summary.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `2.1.2` in a disposable edge profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Use only a harmless marker in a disposable profile.
window.postMessage({ marker: "EXPGuard_test_marker" }, "*");
```

#### Supporting material

- DoubleX: source report `DoubleX/edge/flow-verification-results-no-duplicate.json`; static report `extensions/bckjehjkancjdhpaiakanfinhlapmnnl_2.1.2/static/static_report.json`; dynamic report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\round-doublex-edge-unconfirmed-20-r1\dynamic\doublex-edge-r1\summary.json`.


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
