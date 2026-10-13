# Security Vulnerability Report: Low Sensitive Data Exposure in InsertLearning

## Summary

We are writing on behalf of a security research team from Nankai University and the University of Liverpool. Our Ground Truth review identified **1 Flow(s)** in **InsertLearning** (chrome, extension ID `dehajjkfchegiinhcmoclkfbnmpgcahj`, version `2.2.0`).
The recorded issue type(s): **Sensitive Data Exposure**.

## Affected Extension Details

- Name: InsertLearning
- Platform: chrome
- Extension ID: `dehajjkfchegiinhcmoclkfbnmpgcahj`
- Dataset version: `2.2.0`
- Store version at review: `2.2.0`
- Users: 800000
- Analysis tools: ExPGuard

## Findings

### Finding 1: Sensitive Data Exposure

The Ground Truth record traces Input reaching the recorded source from `CHROME_IDENTITY_TOKEN` (identity.authToken) in version at L78:C4 -> L97:C6 to the privileged sink `WINDOW_POSTMESSAGE` (location.origin) in version at L96:C8 -> L96:C48. The source scope is on pages matching `https://docentedu.com/*, https://insertlearning.com/*, https://www.okeebo.com/*`. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-d211b8afd24a15fe`
- Severity recorded by the analysis: **LOW**
- Source: `CHROME_IDENTITY_TOKEN` (identity.authToken) in version at L78:C4 -> L97:C6
- Sink: `WINDOW_POSTMESSAGE` (location.origin) in version at L96:C8 -> L96:C48
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (UNKNOWN); sink grants capability beyond the source origin

#### Analysis and validation

- Dynamic (ExPGuard): `CONFIRMED` (basis `runtime_reproduced`; evidence stage `MARKER_REACHED`); runtime reproduction recorded; report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\chrome\extensions\dehajjkfchegiinhcmoclkfbnmpgcahj_2.2.0\dynamic\dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `2.2.0` in a disposable chrome profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```text
Deliver the benign marker EXPGuard_test_marker through the source shown in
the finding, then observe whether it reaches the privileged sink.
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/chrome/flow-verification-results-no-duplicate.json`; static report `not recorded`; dynamic report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\chrome\extensions\dehajjkfchegiinhcmoclkfbnmpgcahj_2.2.0\dynamic\dynamic_report.json`.


## Recommendations

1. Never return sensitive extension data to an untrusted page or external sender; enforce an explicit origin and sender allowlist.
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
