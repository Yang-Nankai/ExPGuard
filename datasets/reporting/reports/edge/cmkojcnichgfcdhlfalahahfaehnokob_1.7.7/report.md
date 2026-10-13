# Security Vulnerability Report: Critical Privilege Escalation in Web Assist

## Summary

We are writing on behalf of a security research team from Nankai University and the University of Liverpool. Our Ground Truth review identified **2 Flow(s)** in **Web Assist** (edge, extension ID `cmkojcnichgfcdhlfalahahfaehnokob`, version `1.7.7`).
The recorded issue type(s): **Privilege Escalation**.

## Affected Extension Details

- Name: Web Assist
- Platform: edge
- Extension ID: `cmkojcnichgfcdhlfalahahfaehnokob`
- Dataset version: `1.7.7`
- Store version at review: `1.7.7`
- Users: 1043
- Analysis tools: ExPGuard

## Findings

### Finding 1: Privilege Escalation

The Ground Truth record traces Input reaching the recorded source from `DOCUMENT_TITLE` (document.title) in background.min at L20:C2469 -> L20:C2537 to the privileged sink `CHROME_BOOKMARK_CREATE_INFO` in background.min at L20:C2469 -> L20:C2537. The source scope is in the recorded source context. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-41c05aa437d9bb59`
- Severity recorded by the analysis: **LOW**
- Source: `DOCUMENT_TITLE` (document.title) in background.min at L20:C2469 -> L20:C2537
- Sink: `CHROME_BOOKMARK_CREATE_INFO` in background.min at L20:C2469 -> L20:C2537
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (UNKNOWN); sink grants capability beyond the source origin

#### Analysis and validation

- Static (ExPGuard): verdict `UNCERTAIN`, confidence 0; report `extensions/cmkojcnichgfcdhlfalahahfaehnokob_1.7.7/static/static_report.json`.
- Dynamic (ExPGuard): `CONFIRMED` (basis `runtime_reproduced`; evidence stage `MARKER_REACHED`); runtime reproduction recorded; report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\edge\extensions\cmkojcnichgfcdhlfalahahfaehnokob_1.7.7\dynamic\dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `1.7.7` in a disposable edge profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```text
Deliver the benign marker EXPGuard_test_marker through the source shown in
the finding, then observe whether it reaches the privileged sink.
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/edge/flow-verification-results-no-duplicate.json`; static report `extensions/cmkojcnichgfcdhlfalahahfaehnokob_1.7.7/static/static_report.json`; dynamic report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\edge\extensions\cmkojcnichgfcdhlfalahahfaehnokob_1.7.7\dynamic\dynamic_report.json`.

### Finding 2: Privilege Escalation

The Ground Truth record traces Input reaching the recorded source from `DOCUMENT_TITLE` (document.title) in assets/web_assist/js/webassistbundled.min at L1:C194129 -> L1:C194148 to the privileged sink `CHROME_BOOKMARK_CREATE_INFO` in background.min at L20:C2469 -> L20:C2537. The source scope is on pages matching `https://*/*`. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-430671c6cab6e0db`
- Severity recorded by the analysis: **CRITICAL**
- Source: `DOCUMENT_TITLE` (document.title) in assets/web_assist/js/webassistbundled.min at L1:C194129 -> L1:C194148
- Sink: `CHROME_BOOKMARK_CREATE_INFO` in background.min at L20:C2469 -> L20:C2537
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Analysis and validation

- Dynamic (ExPGuard): `CONFIRMED` (basis `runtime_reproduced`; evidence stage `MARKER_REACHED`); runtime reproduction recorded; report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\edge\extensions\cmkojcnichgfcdhlfalahahfaehnokob_1.7.7\dynamic\dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `1.7.7` in a disposable edge profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```text
Deliver the benign marker EXPGuard_test_marker through the source shown in
the finding, then observe whether it reaches the privileged sink.
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/edge/flow-verification-results-no-duplicate.json`; static report `not recorded`; dynamic report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\edge\extensions\cmkojcnichgfcdhlfalahahfaehnokob_1.7.7\dynamic\dynamic_report.json`.


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
