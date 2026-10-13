# Security Vulnerability Report: Critical Privilege Escalation in Co:Writer

## Summary

We are writing on behalf of a security research team from Nankai University and the University of Liverpool. Our Ground Truth review identified **1 Flow(s)** in **Co:Writer** (chrome, extension ID `ifajfiofeifbbhbionejdliodenmecna`, version `5.0.10.844`).
The recorded issue type(s): **Privilege Escalation**.

## Affected Extension Details

- Name: Co:Writer
- Platform: chrome
- Extension ID: `ifajfiofeifbbhbionejdliodenmecna`
- Dataset version: `5.0.10.844`
- Store version at review: `5.0.10.844`
- Users: 2000000
- Analysis tools: ExPGuard

## Findings

### Finding 1: Privilege Escalation

The Ground Truth record traces A page or sender able to reach the recorded message/event source from `CHROME_ONCONNECTEXTERNAL_ONMESSAGE` (chrome.runtime.onConnectExternal.addListener[onMessage]) in Common/core-libs at L6:C6858 -> L6:C6859 to the privileged sink `WINDOW_POSTMESSAGE` ([UNKNOWN ORIGIN]) in Common/core-libs at L6:C7024 -> L6:C7077. The source scope is on pages matching `<all_urls>`. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-068266212b43d2b6`
- Severity recorded by the analysis: **CRITICAL**
- Source: `CHROME_ONCONNECTEXTERNAL_ONMESSAGE` (chrome.runtime.onConnectExternal.addListener[onMessage]) in Common/core-libs at L6:C6858 -> L6:C6859
- Sink: `WINDOW_POSTMESSAGE` ([UNKNOWN ORIGIN]) in Common/core-libs at L6:C7024 -> L6:C7077
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (EXTERNALLY_CONNECTABLE); sink grants capability beyond the source origin

#### Analysis and validation

- Static (ExPGuard): verdict `PARTIAL`, confidence 0.6; report `extensions/ifajfiofeifbbhbionejdliodenmecna_5.0.10.844/static/static_report.json`.
- Dynamic: no structured dynamic-verification result is attached to this Flow in the Ground Truth dataset.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `5.0.10.844` in a disposable chrome profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Use only a harmless marker in a disposable profile.
window.postMessage({ marker: "EXPGuard_test_marker" }, "*");
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/chrome/flow-verification-results-no-duplicate.json`; static report `extensions/ifajfiofeifbbhbionejdliodenmecna_5.0.10.844/static/static_report.json`; dynamic report `not recorded`.


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
