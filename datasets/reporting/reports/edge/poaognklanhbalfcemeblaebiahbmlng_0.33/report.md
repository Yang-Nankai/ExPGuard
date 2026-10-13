# Security Vulnerability Report: Critical Extension Storage Poisoning in ZhiNang.ai - AI assistant from anypage

## Summary

We are writing on behalf of a security research team from Nankai University and the University of Liverpool. Our Ground Truth review identified **1 Flow(s)** in **ZhiNang.ai - AI assistant from anypage** (edge, extension ID `poaognklanhbalfcemeblaebiahbmlng`, version `0.33`).
The recorded issue type(s): **Extension Storage Poisoning**.

## Affected Extension Details

- Name: ZhiNang.ai - AI assistant from anypage
- Platform: edge
- Extension ID: `poaognklanhbalfcemeblaebiahbmlng`
- Dataset version: `0.33`
- Store version at review: `0.33`
- Users: 244
- Analysis tools: ExPGuard

## Findings

### Finding 1: Storage Poisoning

The Ground Truth record traces Input reaching the recorded source from `DOCUMENT_COOKIE` (document.cookie) in dist/static/js/content at L2922:C4 -> L2929:C6 to the privileged sink `CHROME_LOCAL_STORAGE` (cookie) in dist/static/js/background at L20:C4 -> L22:C6. The source scope is on pages matching `https://*/*, http://*/*`. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-997153b8ebbb3fa9`
- Severity recorded by the analysis: **CRITICAL**
- Source: `DOCUMENT_COOKIE` (document.cookie) in dist/static/js/content at L2922:C4 -> L2929:C6
- Sink: `CHROME_LOCAL_STORAGE` (cookie) in dist/static/js/background at L20:C4 -> L22:C6
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Analysis and validation

- Static (ExPGuard): verdict `TRUE_POSITIVE`, confidence 0.6; report `extensions/poaognklanhbalfcemeblaebiahbmlng_0.33/static/static_report.json`.
- Dynamic (ExPGuard): `CONFIRMED` (basis `decisive`; evidence stage `MARKER_REACHED`); runtime reproduction recorded; report `D:\Ph0jav7\ExtensionSecurity\ExPGuard\dynamic-batch\after-fixes-edge-r5\summary.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `0.33` in a disposable edge profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Run on a disposable page matching the extension's content-script pattern.
// The value is a harmless test marker, not a real account identifier.
const cookieValue = encodeURIComponent(JSON.stringify({
  distinct_id: "EXPGuard_test_marker"
}));
document.cookie = "<the exact cookie name used by the extension>=" + cookieValue + "; path=/";
// Reload the page or trigger the extension's normal feature flow.
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/edge/flow-verification-results-no-duplicate.json`; static report `extensions/poaognklanhbalfcemeblaebiahbmlng_0.33/static/static_report.json`; dynamic report `D:\Ph0jav7\ExtensionSecurity\ExPGuard\dynamic-batch\after-fixes-edge-r5\summary.json`.


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
