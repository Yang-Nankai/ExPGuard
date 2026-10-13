# Security Vulnerability Report: Critical Extension Storage Poisoning in Lingualeo Language Translator

## Summary

We are writing on behalf of a security research team from Nankai University and the University of Liverpool. Our Ground Truth review identified **1 Flow(s)** in **Lingualeo Language Translator** (chrome, extension ID `nglbhlefjhcjockellmeclkcijildjhi`, version `3.1.2`).
The recorded issue type(s): **Extension Storage Poisoning**.

## Affected Extension Details

- Name: Lingualeo Language Translator
- Platform: chrome
- Extension ID: `nglbhlefjhcjockellmeclkcijildjhi`
- Dataset version: `3.1.2`
- Store version at review: `3.1.2`
- Users: 100000
- Analysis tools: ExPGuard

## Findings

### Finding 1: Storage Poisoning

The Ground Truth record traces Input reaching the recorded source from `DOCUMENT_TITLE` (document.title) in content at L94:C153 -> L94:C162 to the privileged sink `CHROME_LOCAL_STORAGE` (pageTitle) in content at L94:C16 -> L94:C164. The source scope is on pages matching `<all_urls>`. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-75281defa736e362`
- Severity recorded by the analysis: **CRITICAL**
- Source: `DOCUMENT_TITLE` (document.title) in content at L94:C153 -> L94:C162
- Sink: `CHROME_LOCAL_STORAGE` (pageTitle) in content at L94:C16 -> L94:C164
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Analysis and validation

- Static (ExPGuard): verdict `TRUE_POSITIVE`, confidence 0.6; report `extensions/nglbhlefjhcjockellmeclkcijildjhi_3.1.2/static/static_report.json`.
- Dynamic (ExPGuard): `CONFIRMED` (basis `runtime_reproduced`; evidence stage `MARKER_REACHED`); runtime reproduction recorded; report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\chrome\extensions\nglbhlefjhcjockellmeclkcijildjhi_3.1.2\dynamic\dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `3.1.2` in a disposable chrome profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```text
Deliver the benign marker EXPGuard_test_marker through the source shown in
the finding, then observe whether it reaches the privileged sink.
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/chrome/flow-verification-results-no-duplicate.json`; static report `extensions/nglbhlefjhcjockellmeclkcijildjhi_3.1.2/static/static_report.json`; dynamic report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\chrome\extensions\nglbhlefjhcjockellmeclkcijildjhi_3.1.2\dynamic\dynamic_report.json`.


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
