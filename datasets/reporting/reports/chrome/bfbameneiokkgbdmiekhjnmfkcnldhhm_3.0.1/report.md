# Security Vulnerability Report: Critical Privilege Escalation in Web Developer

## Summary

We are writing on behalf of a security research team from Nankai University and the University of Liverpool. Our Ground Truth review identified **1 Flow(s)** in **Web Developer** (chrome, extension ID `bfbameneiokkgbdmiekhjnmfkcnldhhm`, version `3.0.1`).
The recorded issue type(s): **Privilege Escalation**.

## Affected Extension Details

- Name: Web Developer
- Platform: chrome
- Extension ID: `bfbameneiokkgbdmiekhjnmfkcnldhhm`
- Dataset version: `3.0.1`
- Store version at review: `3.0.1`
- Users: 1000000
- Analysis tools: ExPGuard

## Findings

### Finding 1: Privilege Escalation

The Ground Truth record traces Input reaching the recorded source from `DOCUMENT_URL` (document.documentURI) in content/content at L1421:C6 -> L1421:C29 to the privileged sink `CHROME_HISTORY_ADD_URL` in overlay/js/overlay at L2287:C2 -> L2287:C38. The source scope is on pages matching `<all_urls>`. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-851b4be4e5471f84`
- Severity recorded by the analysis: **CRITICAL**
- Source: `DOCUMENT_URL` (document.documentURI) in content/content at L1421:C6 -> L1421:C29
- Sink: `CHROME_HISTORY_ADD_URL` in overlay/js/overlay at L2287:C2 -> L2287:C38
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Analysis and validation

- Static (ExPGuard): verdict `TRUE_POSITIVE`, confidence 0.6; report `extensions/bfbameneiokkgbdmiekhjnmfkcnldhhm_3.0.1/static/static_report.json`.
- Dynamic (ExPGuard): `NOT_REPRODUCED` (basis `runtime_not_reproduced`; evidence stage `ENVIRONMENT_READY`); the recorded replay did not establish the complete source-to-sink effect; report `extensions/bfbameneiokkgbdmiekhjnmfkcnldhhm_3.0.1/dynamic/dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `3.0.1` in a disposable chrome profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```text
Deliver the benign marker EXPGuard_test_marker through the source shown in
the finding, then observe whether it reaches the privileged sink.
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/chrome/flow-verification-results-no-duplicate.json`; static report `extensions/bfbameneiokkgbdmiekhjnmfkcnldhhm_3.0.1/static/static_report.json`; dynamic report `extensions/bfbameneiokkgbdmiekhjnmfkcnldhhm_3.0.1/dynamic/dynamic_report.json`.


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
