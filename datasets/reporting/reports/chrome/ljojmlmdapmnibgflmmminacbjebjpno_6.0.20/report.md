# Security Vulnerability Report: Medium Extension Storage Poisoning in Google Meet Enhancement Suite

## Summary

We are writing on behalf of a security research team from Nankai University and the University of Liverpool. Our Ground Truth review identified **2 Flow(s)** in **Google Meet Enhancement Suite** (chrome, extension ID `ljojmlmdapmnibgflmmminacbjebjpno`, version `6.0.20`).
The recorded issue type(s): **Extension Storage Poisoning**.

The store currently reports version `6.0.21`. The update revalidation is summarized per tool below. This report covers only the original Flow(s); newly introduced Flow(s) are out of scope. Any mixed result, tool failure, or incomplete automated run is called out explicitly and should not be read as a final remediation determination.

## Affected Extension Details

- Name: Google Meet Enhancement Suite
- Platform: chrome
- Extension ID: `ljojmlmdapmnibgflmmminacbjebjpno`
- Dataset version: `6.0.20`
- Store version at review: `6.0.21`
- Users: 100000
- Analysis tools: ExPGuard

## Findings

### Finding 1: Storage Poisoning

The Ground Truth record traces Input reaching the recorded source from `DOCUMENT_TITLE` (document.title) in extension at L1:C47458 -> L1:C47472 to the privileged sink `CHROME_LOCAL_STORAGE` (transcript) in extension at L1:C69449 -> L1:C69558. The source scope is on pages matching `*://meet.google.com/*, *://meetenhancementsuite.com/`. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-087fb709d02ff4a1`
- Severity recorded by the analysis: **MEDIUM**
- Source: `DOCUMENT_TITLE` (document.title) in extension at L1:C47458 -> L1:C47472
- Sink: `CHROME_LOCAL_STORAGE` (transcript) in extension at L1:C69449 -> L1:C69558
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Updated-version tool result

- ExPGuard: `still_detected`; original source `DOCUMENT_TITLE` → sink `CHROME_LOCAL_STORAGE`; candidate matches: 1

#### Analysis and validation

- Static (ExPGuard): verdict `TRUE_POSITIVE`, confidence 0.6; report `extensions/ljojmlmdapmnibgflmmminacbjebjpno_6.0.20/static/static_report.json`.
- Dynamic (ExPGuard): `INCONCLUSIVE_AFTER_DEBUG` (basis `non_decisive`; evidence stage `LISTENER_READY`); the recorded replay did not hit the exact sink; this run is inconclusive and is not a runtime confirmation; report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\chrome\extensions\ljojmlmdapmnibgflmmminacbjebjpno_6.0.20\dynamic\dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `6.0.20` in a disposable chrome profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```text
Deliver the benign marker EXPGuard_test_marker through the source shown in
the finding, then observe whether it reaches the privileged sink.
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/chrome/flow-verification-results-no-duplicate.json`; static report `extensions/ljojmlmdapmnibgflmmminacbjebjpno_6.0.20/static/static_report.json`; dynamic report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\chrome\extensions\ljojmlmdapmnibgflmmminacbjebjpno_6.0.20\dynamic\dynamic_report.json`.

### Finding 2: Storage Poisoning

The Ground Truth record traces Input reaching the recorded source from `ELEMENT_TEXT_CONTENT` ([jsname="NeC6gb"]) in extension at L1:C68719 -> L1:C68898 to the privileged sink `CHROME_LOCAL_STORAGE` (transcript) in extension at L1:C69449 -> L1:C69558. The source scope is on pages matching `*://meet.google.com/*, *://meetenhancementsuite.com/`. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-805270787fdd922c`
- Severity recorded by the analysis: **MEDIUM**
- Source: `ELEMENT_TEXT_CONTENT` ([jsname="NeC6gb"]) in extension at L1:C68719 -> L1:C68898
- Sink: `CHROME_LOCAL_STORAGE` (transcript) in extension at L1:C69449 -> L1:C69558
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Updated-version tool result

- ExPGuard: `still_detected`; original source `ELEMENT_TEXT_CONTENT` → sink `CHROME_LOCAL_STORAGE`; candidate matches: 1

#### Analysis and validation

- Dynamic (ExPGuard): `INCONCLUSIVE_AFTER_DEBUG` (basis `non_decisive`; evidence stage `LISTENER_READY`); the recorded replay did not hit the exact sink; this run is inconclusive and is not a runtime confirmation; report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\chrome\extensions\ljojmlmdapmnibgflmmminacbjebjpno_6.0.20\dynamic\dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `6.0.20` in a disposable chrome profile.
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

- ExPGuard: source report `ExPGuard-Opti/chrome/flow-verification-results-no-duplicate.json`; static report `not recorded`; dynamic report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\chrome\extensions\ljojmlmdapmnibgflmmminacbjebjpno_6.0.20\dynamic\dynamic_report.json`.


## Recommendations

1. Do not let page-controlled cookies or DOM values select extension-owned storage values; validate the expected value and keep credentials in extension-owned UI/state.
2. Treat storage writes as privileged state changes: use an allowlisted schema, reject attacker-controlled keys, and avoid merging untrusted objects into extension state.
3. Reduce host permissions and sensitive API access to the smallest scope required by the feature.

## Impact

The demonstrated impact is limited to the operation described in each finding and the extension's granted permissions. The evidence above distinguishes the recorded static path from any runtime result; it does not imply unrelated account compromise, data theft, or malware installation.

## Disclosure Status

- Report class: `updated_still_detected`
- This report covers only the listed Ground Truth Flow(s). Newly introduced Flow(s) are outside scope.
- Contact discovery: `missing` (No reliable public email found)

Please contact us so that we can coordinate remediation and retest the affected Flow(s).

Regards,
Xin Yang
Nankai University / University of Liverpool
