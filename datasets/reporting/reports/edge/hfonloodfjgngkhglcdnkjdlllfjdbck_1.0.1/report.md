# Security Vulnerability Report: Critical Arbitrary File Download in INSSAVE - Save Instagram & Fb story

## Summary

We are writing on behalf of a security research team from Nankai University and the University of Liverpool. Our Ground Truth review identified **1 Flow(s)** in **INSSAVE - Save Instagram & Fb story** (edge, extension ID `hfonloodfjgngkhglcdnkjdlllfjdbck`, version `1.0.1`).
The recorded issue type(s): **Arbitrary File Download**.

## Affected Extension Details

- Name: INSSAVE - Save Instagram & Fb story
- Platform: edge
- Extension ID: `hfonloodfjgngkhglcdnkjdlllfjdbck`
- Dataset version: `1.0.1`
- Store version at review: `1.0.1`
- Users: 1264
- Analysis tools: ExPGuard

## Findings

### Finding 1: Arbitrary File Download

The Ground Truth record traces A page or sender able to reach the recorded message/event source from `WINDOW_MESSAGE_EVENT` (window.addEventListener(message)) in js/in at L1:C501 -> L1:C2866 to the privileged sink `CHROME_DOWNLOADS_OPTIONS` in js/bg at L1:C102400 -> L1:C102489. The source scope is on pages matching `<all_urls>`. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-29769da44dd2b6b6`
- Severity recorded by the analysis: **CRITICAL**
- Source: `WINDOW_MESSAGE_EVENT` (window.addEventListener(message)) in js/in at L1:C501 -> L1:C2866
- Sink: `CHROME_DOWNLOADS_OPTIONS` in js/bg at L1:C102400 -> L1:C102489
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Analysis and validation

- Static (ExPGuard): verdict `TRUE_POSITIVE`, confidence 0.6; report `extensions/hfonloodfjgngkhglcdnkjdlllfjdbck_1.0.1/static/static_report.json`.
- Dynamic (ExPGuard): `CONFIRMED` (basis `runtime_reproduced`; evidence stage `MARKER_REACHED`); runtime reproduction recorded; report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\edge\extensions\hfonloodfjgngkhglcdnkjdlllfjdbck_1.0.1\dynamic\dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `1.0.1` in a disposable edge profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Use only a harmless marker in a disposable profile.
window.postMessage({ marker: "EXPGuard_test_marker" }, "*");
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/edge/flow-verification-results-no-duplicate.json`; static report `extensions/hfonloodfjgngkhglcdnkjdlllfjdbck_1.0.1/static/static_report.json`; dynamic report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\edge\extensions\hfonloodfjgngkhglcdnkjdlllfjdbck_1.0.1\dynamic\dynamic_report.json`.


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
