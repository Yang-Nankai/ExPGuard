# Security Vulnerability Report: Critical Unauthorized Browser Policy Change in Capturables - All You Need Is Capture

## Summary

We are writing on behalf of a security research team from Nankai University and the University of Liverpool. Our Ground Truth review identified **1 Flow(s)** in **Capturables - All You Need Is Capture** (chrome, extension ID `efgcpheifanopniaglaoeeecglncljkf`, version `1.2.8`).
The recorded issue type(s): **Unauthorized Browser Policy Change**.

## Affected Extension Details

- Name: Capturables - All You Need Is Capture
- Platform: chrome
- Extension ID: `efgcpheifanopniaglaoeeecglncljkf`
- Dataset version: `1.2.8`
- Store version at review: `1.2.8`
- Users: 50000
- Analysis tools: ExPGuard

## Findings

### Finding 1: Unauthorized Browser Policy Modification

The Ground Truth record traces Input reaching the recorded source from `DOCUMENT_TITLE` (document.title) in js/content at L1213:C12 -> L1216:C15 to the privileged sink `CHROME_DECLARATIVENETREQUEST_RULES` in bg at L2312:C22 -> L2335:C18. The source scope is on pages matching `<all_urls>`. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-3d8f9b8e81b74bf5`
- Severity recorded by the analysis: **CRITICAL**
- Source: `DOCUMENT_TITLE` (document.title) in js/content at L1213:C12 -> L1216:C15
- Sink: `CHROME_DECLARATIVENETREQUEST_RULES` in bg at L2312:C22 -> L2335:C18
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Analysis and validation

- Static (ExPGuard): verdict `TRUE_POSITIVE`, confidence 0.6; report `extensions/efgcpheifanopniaglaoeeecglncljkf_1.2.8/static/static_report.json`.
- Dynamic (ExPGuard): `CONFIRMED` (basis `runtime_reproduced`; evidence stage `MARKER_REACHED`); runtime reproduction recorded; report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\chrome\extensions\efgcpheifanopniaglaoeeecglncljkf_1.2.8\dynamic\dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `1.2.8` in a disposable chrome profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```text
Deliver the benign marker EXPGuard_test_marker through the source shown in
the finding, then observe whether it reaches the privileged sink.
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/chrome/flow-verification-results-no-duplicate.json`; static report `extensions/efgcpheifanopniaglaoeeecglncljkf_1.2.8/static/static_report.json`; dynamic report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\chrome\extensions\efgcpheifanopniaglaoeeecglncljkf_1.2.8\dynamic\dynamic_report.json`.


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
