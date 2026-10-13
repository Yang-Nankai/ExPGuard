# Security Vulnerability Report: High Extension Storage Poisoning in Washbaidu

## Summary

We are writing on behalf of a security research team from Nankai University and the University of Liverpool. Our Ground Truth review identified **1 Flow(s)** in **Washbaidu** (edge, extension ID `keleecjcfmdfipfcjlfjghkdedjkpnln`, version `2.0.0`).
The recorded issue type(s): **Extension Storage Poisoning**.

## Affected Extension Details

- Name: Washbaidu
- Platform: edge
- Extension ID: `keleecjcfmdfipfcjlfjghkdedjkpnln`
- Dataset version: `2.0.0`
- Store version at review: `2.0.0`
- Users: 7456
- Analysis tools: ExPGuard

## Findings

### Finding 1: Storage Poisoning

The Ground Truth record traces An external extension able to message this extension from `CHROME_ONMESSAGEEXTERNAL_MESSAGE` (chrome.runtime.onMessageExternal.addListener[message]) in background at L276:C67 -> L276:C74 to the privileged sink `CHROME_LOCAL_STORAGE` (themeTemplate) in background at L298:C10 -> L298:C66. The source scope is in the recorded source context. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-2f46d923bdf2cea6`
- Severity recorded by the analysis: **HIGH**
- Source: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` (chrome.runtime.onMessageExternal.addListener[message]) in background at L276:C67 -> L276:C74
- Sink: `CHROME_LOCAL_STORAGE` (themeTemplate) in background at L298:C10 -> L298:C66
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (EXTERNALLY_CONNECTABLE); sink grants capability beyond the source origin

#### Analysis and validation

- Static (ExPGuard): verdict `TRUE_POSITIVE`, confidence 0.6; report `extensions/keleecjcfmdfipfcjlfjghkdedjkpnln_2.0.0/static/static_report.json`.
- Dynamic (ExPGuard): `TOOL_LIMITATION` (basis `non_decisive`; evidence stage `BLOCKED`); this result does not independently confirm execution at the sink; report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\edge\extensions\keleecjcfmdfipfcjlfjghkdedjkpnln_2.0.0\dynamic\dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `2.0.0` in a disposable edge profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Use only a harmless marker in a disposable profile.
window.postMessage({ marker: "EXPGuard_test_marker" }, "*");
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/edge/flow-verification-results-no-duplicate.json`; static report `extensions/keleecjcfmdfipfcjlfjghkdedjkpnln_2.0.0/static/static_report.json`; dynamic report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\edge\extensions\keleecjcfmdfipfcjlfjghkdedjkpnln_2.0.0\dynamic\dynamic_report.json`.


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
