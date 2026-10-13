# Security Vulnerability Report: Critical Extension Storage Poisoning in Cook'n Recipe Capture Plugin

## Summary

We are writing on behalf of a security research team from Nankai University and the University of Liverpool. Our Ground Truth review identified **1 Flow(s)** in **Cook'n Recipe Capture Plugin** (firefox, extension ID `{86c3f94c-b19b-42b2-8663-8abd8c6754f3}`, version `11.4`).
The recorded issue type(s): **Extension Storage Poisoning**.

## Affected Extension Details

- Name: Cook'n Recipe Capture Plugin
- Platform: firefox
- Extension ID: `{86c3f94c-b19b-42b2-8663-8abd8c6754f3}`
- Dataset version: `11.4`
- Store version at review: `11.4`
- Users: 518
- Analysis tools: CoCo

## Findings

### Finding 1: Storage Poisoning

The Ground Truth record traces A page or sender able to reach the recorded message/event source from `WINDOW_MESSAGE_EVENT` to the privileged sink `CHROME_SYNC_STORAGE`. The source scope is in the recorded source context. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-a2e8ae6d35ff0b21`
- Severity recorded by the analysis: **CRITICAL**
- Source: `WINDOW_MESSAGE_EVENT`
- Sink: `CHROME_SYNC_STORAGE`
- Tools reporting this Flow: CoCo

- Privilege boundary recorded: `False` (None); the sink grants a capability beyond the source origin.

#### Analysis and validation

- Static (CoCo): verdict `TRUE_POSITIVE`, confidence 0.6; report `extensions/{86c3f94c-b19b-42b2-8663-8abd8c6754f3}_11.4/static/static_report.json`.
- Dynamic (CoCo): `INCONCLUSIVE_AFTER_DEBUG` (basis `runtime_or_static_dynamic_evidence`); the dynamic agent exceeded its 30-second budget, so this run did not establish a decisive runtime result; report `extensions/{86c3f94c-b19b-42b2-8663-8abd8c6754f3}_11.4/dynamic/dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `11.4` in a disposable firefox profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Use only a harmless marker in a disposable profile.
window.postMessage({ marker: "EXPGuard_test_marker" }, "*");
```

#### Supporting material

- CoCo: source report `CoCo/firefox/flow-verification-results-no-duplicate.json`; static report `extensions/{86c3f94c-b19b-42b2-8663-8abd8c6754f3}_11.4/static/static_report.json`; dynamic report `extensions/{86c3f94c-b19b-42b2-8663-8abd8c6754f3}_11.4/dynamic/dynamic_report.json`.


## Recommendations

1. Do not let page-controlled cookies or DOM values select extension-owned storage values; validate the expected value and keep credentials in extension-owned UI/state.
2. Treat storage writes as privileged state changes: use an allowlisted schema, reject attacker-controlled keys, and avoid merging untrusted objects into extension state.
3. Reduce host permissions and sensitive API access to the smallest scope required by the feature.

## Impact

The demonstrated impact is limited to the operation described in each finding and the extension's granted permissions. The evidence above distinguishes the recorded static path from any runtime result; it does not imply unrelated account compromise, data theft, or malware installation.

## Disclosure Status

- Report class: `version_unchanged`
- This report covers only the listed Ground Truth Flow(s). Newly introduced Flow(s) are outside scope.
- Contact discovery: `found` (Mozilla Add-ons API support_email)

Please contact us so that we can coordinate remediation and retest the affected Flow(s).

Regards,
Xin Yang
Nankai University / University of Liverpool
