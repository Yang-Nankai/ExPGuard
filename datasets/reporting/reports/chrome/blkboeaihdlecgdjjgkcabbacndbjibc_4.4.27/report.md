# Security Vulnerability Report: Medium CSRF via Privileged Network Request in Docusign eSignature for Chrome

## Summary

We are writing on behalf of a security research team from Nankai University and the University of Liverpool. Our Ground Truth review identified **1 Flow(s)** in **Docusign eSignature for Chrome** (chrome, extension ID `blkboeaihdlecgdjjgkcabbacndbjibc`, version `4.4.27`).
The recorded issue type(s): **CSRF via Privileged Network Request**.

## Affected Extension Details

- Name: Docusign eSignature for Chrome
- Platform: chrome
- Extension ID: `blkboeaihdlecgdjjgkcabbacndbjibc`
- Dataset version: `4.4.27`
- Store version at review: `4.4.27`
- Users: 300000
- Analysis tools: ExPGuard

## Findings

### Finding 1: Cross-Site Request Forgery (CSRF) / Privileged Network Request

The Ground Truth record traces A page or sender able to reach the recorded message/event source from `WINDOW_MESSAGE_EVENT` (window.addEventListener(message)) in scripts/shell at L1:C1130 -> L1:C1144 to the privileged sink `FETCH_BODY` ([Unknown URL]) in scripts/background at L1:C2247 -> L1:C2401. The source scope is on pages matching `https://www.dropbox.com/*`. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-5a192a0bb2d1d67b`
- Severity recorded by the analysis: **MEDIUM**
- Source: `WINDOW_MESSAGE_EVENT` (window.addEventListener(message)) in scripts/shell at L1:C1130 -> L1:C1144
- Sink: `FETCH_BODY` ([Unknown URL]) in scripts/background at L1:C2247 -> L1:C2401
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Analysis and validation

- Static (ExPGuard): verdict `TRUE_POSITIVE`, confidence 0.6; report `extensions/blkboeaihdlecgdjjgkcabbacndbjibc_4.4.27/static/static_report.json`.
- Dynamic (ExPGuard): `TOOL_LIMITATION` (basis `non_decisive`; evidence stage `ENVIRONMENT_READY`); this result does not independently confirm execution at the sink; report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\chrome\extensions\blkboeaihdlecgdjjgkcabbacndbjibc_4.4.27\dynamic\dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `4.4.27` in a disposable chrome profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Use only a harmless marker in a disposable profile.
window.postMessage({ marker: "EXPGuard_test_marker" }, "*");
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/chrome/flow-verification-results-no-duplicate.json`; static report `extensions/blkboeaihdlecgdjjgkcabbacndbjibc_4.4.27/static/static_report.json`; dynamic report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\chrome\extensions\blkboeaihdlecgdjjgkcabbacndbjibc_4.4.27\dynamic\dynamic_report.json`.


## Recommendations

1. Authenticate page-to-extension events at the privilege boundary; validate the sender and origin instead of trusting DOM event detail.
2. Validate the request schema and restrict destination URLs, methods, headers, and bodies before issuing privileged network requests.
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
