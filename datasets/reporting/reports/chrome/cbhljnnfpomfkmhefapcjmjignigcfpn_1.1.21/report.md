# Security Vulnerability Report: Critical Arbitrary File Download in SuperCopy Pro- Allow Right Click and Copy

## Summary

We are writing on behalf of a security research team from Nankai University and the University of Liverpool. Our Ground Truth review identified **1 Flow(s)** in **SuperCopy Pro- Allow Right Click and Copy** (chrome, extension ID `cbhljnnfpomfkmhefapcjmjignigcfpn`, version `1.1.21`).
The recorded issue type(s): **Arbitrary File Download**.

## Affected Extension Details

- Name: SuperCopy Pro- Allow Right Click and Copy
- Platform: chrome
- Extension ID: `cbhljnnfpomfkmhefapcjmjignigcfpn`
- Dataset version: `1.1.21`
- Store version at review: `1.1.21`
- Users: 40000
- Analysis tools: DoubleX, ExPGuard

## Findings

### Finding 1: Arbitrary File Download

The Ground Truth record traces A page or sender able to reach the recorded message/event source from `WINDOW_MESSAGE_EVENT` (window.addEventListener(message)) in content at L1:C4279 -> L1:C4290 to the privileged sink `CHROME_DOWNLOADS_OPTIONS` in background at L1:C14619 -> L1:C14696. The source scope is on pages matching `https://*/*, http://*/*, file://*/*`. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-35c7f49a4a2e84d9`
- Severity recorded by the analysis: **CRITICAL**
- Source: `WINDOW_MESSAGE_EVENT` (window.addEventListener(message)) in content at L1:C4279 -> L1:C4290
- Sink: `CHROME_DOWNLOADS_OPTIONS` in background at L1:C14619 -> L1:C14696
- Tools reporting this Flow: ExPGuard, DoubleX

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Analysis and validation

- Static (ExPGuard): verdict `UNCERTAIN`, confidence 0.3; report `extensions/cbhljnnfpomfkmhefapcjmjignigcfpn_1.1.21/static/static_report.json`.
- Dynamic (ExPGuard): `INCONCLUSIVE_AFTER_DEBUG` (basis `non_decisive`; evidence stage `LISTENER_READY`); the dynamic run did not establish a decisive runtime result; report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\chrome\extensions\cbhljnnfpomfkmhefapcjmjignigcfpn_1.1.21\dynamic\dynamic_report.json`.
- Static (DoubleX): verdict `TRUE_POSITIVE`, confidence 0.6; report `extensions/cbhljnnfpomfkmhefapcjmjignigcfpn_1.1.21/static/static_report.json`.
- Dynamic (DoubleX): `INCONCLUSIVE_AFTER_DEBUG` (basis `runtime_or_static_dynamic_evidence`); the dynamic run did not establish a decisive runtime result; report `extensions/cbhljnnfpomfkmhefapcjmjignigcfpn_1.1.21/dynamic/dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `1.1.21` in a disposable chrome profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Use only a harmless marker in a disposable profile.
window.postMessage({ marker: "EXPGuard_test_marker" }, "*");
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/chrome/flow-verification-results-no-duplicate.json`; static report `extensions/cbhljnnfpomfkmhefapcjmjignigcfpn_1.1.21/static/static_report.json`; dynamic report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\chrome\extensions\cbhljnnfpomfkmhefapcjmjignigcfpn_1.1.21\dynamic\dynamic_report.json`.
- DoubleX: source report `DoubleX/chrome/flow-verification-results-no-duplicate.json`; static report `extensions/cbhljnnfpomfkmhefapcjmjignigcfpn_1.1.21/static/static_report.json`; dynamic report `extensions/cbhljnnfpomfkmhefapcjmjignigcfpn_1.1.21/dynamic/dynamic_report.json`.


## Recommendations

1. Restrict download URLs and filenames, and require a visible user gesture before starting downloads.
2. Reduce host permissions and sensitive API access to the smallest scope required by the feature.

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
