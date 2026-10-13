# Security Vulnerability Report: Medium Extension Storage Poisoning in Google Apps Script GitHub Assistant

## Summary

We are writing on behalf of a security research team from Nankai University and the University of Liverpool. Our Ground Truth review identified **2 Flow(s)** in **Google Apps Script GitHub Assistant** (chrome, extension ID `lfjcgcmkmjjlieihflfhjopckgpelofo`, version `5.1.0`).
The recorded issue type(s): **Extension Storage Poisoning**.

## Affected Extension Details

- Name: Google Apps Script GitHub Assistant
- Platform: chrome
- Extension ID: `lfjcgcmkmjjlieihflfhjopckgpelofo`
- Dataset version: `5.1.0`
- Store version at review: `5.1.0`
- Users: 30000
- Analysis tools: ExPGuard

## Findings

### Finding 1: Storage Poisoning

The Ground Truth record traces Input reaching the recorded source from `JQUERY_ELEMENT_TEXT` (#selected-suffix) in src/gas-hub at L271:C10 -> L275:C5 to the privileged sink `CHROME_SYNC_STORAGE` (bindConfig) in src/gas-hub at L278:C6 -> L280:C8. The source scope is on pages matching `https://script.google.com/*`. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-3f2dc4a57c613129`
- Severity recorded by the analysis: **MEDIUM**
- Source: `JQUERY_ELEMENT_TEXT` (#selected-suffix) in src/gas-hub at L271:C10 -> L275:C5
- Sink: `CHROME_SYNC_STORAGE` (bindConfig) in src/gas-hub at L278:C6 -> L280:C8
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Analysis and validation

- Dynamic (ExPGuard): `PARTIAL` (basis `non_decisive`; evidence stage `SINK_REACHED`); the recorded replay did not establish the complete source-to-sink effect; report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\chrome\extensions\lfjcgcmkmjjlieihflfhjopckgpelofo_5.1.0\dynamic\dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `5.1.0` in a disposable chrome profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
const input = document.getElementById("access_key") || document.querySelector("input");
if (input) {
  input.value = "EXPGuard_test_marker";
  input.dispatchEvent(new Event("input", { bubbles: true }));
}
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/chrome/flow-verification-results-no-duplicate.json`; static report `not recorded`; dynamic report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\chrome\extensions\lfjcgcmkmjjlieihflfhjopckgpelofo_5.1.0\dynamic\dynamic_report.json`.

### Finding 2: Storage Poisoning

The Ground Truth record traces Input reaching the recorded source from `JQUERY_ELEMENT_VAL` (#ignore-pattern) in src/gas-hub at L274:C21 -> L274:C53 to the privileged sink `CHROME_SYNC_STORAGE` (bindConfig) in src/gas-hub at L278:C6 -> L280:C8. The source scope is on pages matching `https://script.google.com/*`. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-ef18f2e8eda4fdff`
- Severity recorded by the analysis: **MEDIUM**
- Source: `JQUERY_ELEMENT_VAL` (#ignore-pattern) in src/gas-hub at L274:C21 -> L274:C53
- Sink: `CHROME_SYNC_STORAGE` (bindConfig) in src/gas-hub at L278:C6 -> L280:C8
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Analysis and validation

- Static (ExPGuard): verdict `TRUE_POSITIVE`, confidence 0.6; report `extensions/lfjcgcmkmjjlieihflfhjopckgpelofo_5.1.0/static/static_report.json`.
- Dynamic (ExPGuard): `PARTIAL` (basis `non_decisive`; evidence stage `SINK_REACHED`); the recorded replay did not establish the complete source-to-sink effect; report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\chrome\extensions\lfjcgcmkmjjlieihflfhjopckgpelofo_5.1.0\dynamic\dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `5.1.0` in a disposable chrome profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
const input = document.getElementById("access_key") || document.querySelector("input");
if (input) {
  input.value = "EXPGuard_test_marker";
  input.dispatchEvent(new Event("input", { bubbles: true }));
}
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/chrome/flow-verification-results-no-duplicate.json`; static report `extensions/lfjcgcmkmjjlieihflfhjopckgpelofo_5.1.0/static/static_report.json`; dynamic report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\chrome\extensions\lfjcgcmkmjjlieihflfhjopckgpelofo_5.1.0\dynamic\dynamic_report.json`.


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
