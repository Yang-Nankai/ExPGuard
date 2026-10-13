# Security Vulnerability Report: Critical Privilege Escalation in Word Editor Online

## Summary

We are writing on behalf of a security research team from Nankai University and the University of Liverpool. Our Ground Truth review identified **1 Flow(s)** in **Word Editor Online** (chrome, extension ID `iflipbenkncalpdbamhkaleppfnlefjm`, version `3.2.0`).
The recorded issue type(s): **Privilege Escalation**.

## Affected Extension Details

- Name: Word Editor Online
- Platform: chrome
- Extension ID: `iflipbenkncalpdbamhkaleppfnlefjm`
- Dataset version: `3.2.0`
- Store version at review: `3.2.0`
- Users: 30000
- Analysis tools: CoCo, DoubleX, ExPGuard

## Findings

### Finding 1: Privilege Escalation

The Ground Truth record traces A page or sender able to reach the recorded message/event source from `WINDOW_MESSAGE_EVENT` (window.addEventListener(message)) in js/content_script at L17:C0 -> L210:C2 to the privileged sink `CHROME_NOTIFICATIONS_CREATE_OPTIONS` in js/background at L166:C48 -> L171:C50. The source scope is on pages matching `*://*.qwerpdf.com/*`. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-36554fd0c9043f0a`
- Severity recorded by the analysis: **CRITICAL**
- Source: `WINDOW_MESSAGE_EVENT` (window.addEventListener(message)) in js/content_script at L17:C0 -> L210:C2
- Sink: `CHROME_NOTIFICATIONS_CREATE_OPTIONS` in js/background at L166:C48 -> L171:C50
- Tools reporting this Flow: ExPGuard, CoCo, DoubleX

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Analysis and validation

- Static (ExPGuard): verdict `TRUE_POSITIVE`, confidence 0.6; report `extensions/iflipbenkncalpdbamhkaleppfnlefjm_3.2.0/static/static_report.json`.
- Dynamic (ExPGuard): `INCONCLUSIVE_AFTER_DEBUG` (basis `non_decisive`; evidence stage `LISTENER_READY`); the dynamic run did not establish a decisive runtime result; report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\chrome\extensions\iflipbenkncalpdbamhkaleppfnlefjm_3.2.0\dynamic\dynamic_report.json`.
- Static (CoCo): verdict `FALSE_POSITIVE`, confidence 0.96; report `extensions/iflipbenkncalpdbamhkaleppfnlefjm_3.2.0/static/static_report.json`.
- Dynamic (CoCo): `TOOL_LIMITATION` (basis `runtime_or_static_dynamic_evidence`); this result does not independently confirm execution at the sink; report `extensions/iflipbenkncalpdbamhkaleppfnlefjm_3.2.0/dynamic/dynamic_report.json`.
- Static (DoubleX): verdict `TRUE_POSITIVE`, confidence 0.6; report `extensions/iflipbenkncalpdbamhkaleppfnlefjm_3.2.0/static/static_report.json`.
- Dynamic (DoubleX): `INCONCLUSIVE_AFTER_DEBUG` (basis `runtime_or_static_dynamic_evidence`); the dynamic agent exceeded its 30-second budget, so this run did not establish a decisive runtime result; report `extensions/iflipbenkncalpdbamhkaleppfnlefjm_3.2.0/dynamic/dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `3.2.0` in a disposable chrome profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Use only a harmless marker in a disposable profile.
window.postMessage({ marker: "EXPGuard_test_marker" }, "*");
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/chrome/flow-verification-results-no-duplicate.json`; static report `extensions/iflipbenkncalpdbamhkaleppfnlefjm_3.2.0/static/static_report.json`; dynamic report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\chrome\extensions\iflipbenkncalpdbamhkaleppfnlefjm_3.2.0\dynamic\dynamic_report.json`.
- CoCo: source report `CoCo/chrome/flow-verification-results-no-duplicate.json`; static report `extensions/iflipbenkncalpdbamhkaleppfnlefjm_3.2.0/static/static_report.json`; dynamic report `extensions/iflipbenkncalpdbamhkaleppfnlefjm_3.2.0/dynamic/dynamic_report.json`.
- DoubleX: source report `DoubleX/chrome/flow-verification-results-no-duplicate.json`; static report `extensions/iflipbenkncalpdbamhkaleppfnlefjm_3.2.0/static/static_report.json`; dynamic report `extensions/iflipbenkncalpdbamhkaleppfnlefjm_3.2.0/dynamic/dynamic_report.json`.


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
