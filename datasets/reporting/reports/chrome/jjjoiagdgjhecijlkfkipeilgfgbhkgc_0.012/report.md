# Security Vulnerability Report: Critical Extension Storage Poisoning and Sensitive Data Exposure in Orbital Daggers

## Summary

We are writing on behalf of a security research team from Nankai University and the University of Liverpool. Our Ground Truth review identified **2 Flow(s)** in **Orbital Daggers** (chrome, extension ID `jjjoiagdgjhecijlkfkipeilgfgbhkgc`, version `0.012`).
The recorded issue type(s): **Extension Storage Poisoning; Sensitive Data Exposure**.

## Affected Extension Details

- Name: Orbital Daggers
- Platform: chrome
- Extension ID: `jjjoiagdgjhecijlkfkipeilgfgbhkgc`
- Dataset version: `0.012`
- Store version at review: `0.012`
- Users: 60000
- Analysis tools: CoCo, DoubleX, ExPGuard

## Findings

### Finding 1: Sensitive Data Exposure

The Ground Truth record traces Input reaching the recorded source from `STORAGE_ALL_ITEMS` (storage.dynamic.items[local]) in background at L38:C12 -> L38:C31 to the privileged sink `CHROME_RUNTIME_ONMESSAGEEXTERNAL_SENDRESPONSE` (chrome.runtime.onMessageExternal.addListener[sendResponse]) in background at L38:C12 -> L38:C31. The source scope is in the recorded source context. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-07567f86a1e51c73`
- Severity recorded by the analysis: **HIGH**
- Source: `STORAGE_ALL_ITEMS` (storage.dynamic.items[local]) in background at L38:C12 -> L38:C31
- Sink: `CHROME_RUNTIME_ONMESSAGEEXTERNAL_SENDRESPONSE` (chrome.runtime.onMessageExternal.addListener[sendResponse]) in background at L38:C12 -> L38:C31
- Tools reporting this Flow: ExPGuard, DoubleX

- Privilege boundary recorded: `True` (EXTERNALLY_CONNECTABLE); sink grants capability beyond the source origin

#### Analysis and validation

- Dynamic (ExPGuard): `INCONCLUSIVE_AFTER_DEBUG` (basis `inconclusive`; evidence stage `ENVIRONMENT_READY`); the dynamic run did not establish a decisive runtime result; report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\chrome\extensions\jjjoiagdgjhecijlkfkipeilgfgbhkgc_0.012\dynamic\dynamic_report.json`.
- Static (DoubleX): verdict `TRUE_POSITIVE`, confidence 0.6; report `extensions/jjjoiagdgjhecijlkfkipeilgfgbhkgc_0.012/static/static_report.json`.
- Dynamic (DoubleX): `INCONCLUSIVE_AFTER_DEBUG` (basis `runtime_or_static_dynamic_evidence`); the dynamic agent exceeded its 30-second budget, so this run did not establish a decisive runtime result; report `extensions/jjjoiagdgjhecijlkfkipeilgfgbhkgc_0.012/dynamic/dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `0.012` in a disposable chrome profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```text
Deliver the benign marker EXPGuard_test_marker through the source shown in
the finding, then observe whether it reaches the privileged sink.
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/chrome/flow-verification-results-no-duplicate.json`; static report `not recorded`; dynamic report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\chrome\extensions\jjjoiagdgjhecijlkfkipeilgfgbhkgc_0.012\dynamic\dynamic_report.json`.
- DoubleX: source report `DoubleX/chrome/flow-verification-results-no-duplicate.json`; static report `extensions/jjjoiagdgjhecijlkfkipeilgfgbhkgc_0.012/static/static_report.json`; dynamic report `extensions/jjjoiagdgjhecijlkfkipeilgfgbhkgc_0.012/dynamic/dynamic_report.json`.

### Finding 2: Storage Poisoning

The Ground Truth record traces An external extension able to message this extension from `CHROME_ONMESSAGEEXTERNAL_MESSAGE` (chrome.runtime.onMessageExternal.addListener[message]) in background at L29:C8 -> L29:C15 to the privileged sink `CHROME_LOCAL_STORAGE` (unknown) in background at L49:C8 -> L49:C37. The source scope is in the recorded source context. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-33eaa561e267781c`
- Severity recorded by the analysis: **CRITICAL**
- Source: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` (chrome.runtime.onMessageExternal.addListener[message]) in background at L29:C8 -> L29:C15
- Sink: `CHROME_LOCAL_STORAGE` (unknown) in background at L49:C8 -> L49:C37
- Tools reporting this Flow: ExPGuard, CoCo

- Privilege boundary recorded: `True` (EXTERNALLY_CONNECTABLE); sink grants capability beyond the source origin

#### Analysis and validation

- Static (ExPGuard): verdict `TRUE_POSITIVE`, confidence 0.6; report `extensions/jjjoiagdgjhecijlkfkipeilgfgbhkgc_0.012/static/static_report.json`.
- Dynamic (ExPGuard): `ERROR` (basis `inconclusive`); this result does not independently confirm execution at the sink; report `extensions/jjjoiagdgjhecijlkfkipeilgfgbhkgc_0.012/dynamic/dynamic_report.json`.
- Static (CoCo): verdict `TRUE_POSITIVE`, confidence 0.6; report `extensions/jjjoiagdgjhecijlkfkipeilgfgbhkgc_0.012/static/static_report.json`.
- Dynamic (CoCo): `EXTERNAL_CONDITION_REQUIRED` (basis `external_condition_required`); a sender-side precondition was recorded; this is not an unconditional runtime reproduction; report `extensions/jjjoiagdgjhecijlkfkipeilgfgbhkgc_0.012/dynamic/dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `0.012` in a disposable chrome profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Use only a harmless marker in a disposable profile.
window.postMessage({ marker: "EXPGuard_test_marker" }, "*");
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/chrome/flow-verification-results-no-duplicate.json`; static report `extensions/jjjoiagdgjhecijlkfkipeilgfgbhkgc_0.012/static/static_report.json`; dynamic report `extensions/jjjoiagdgjhecijlkfkipeilgfgbhkgc_0.012/dynamic/dynamic_report.json`.
- CoCo: source report `CoCo/chrome/flow-verification-results-no-duplicate.json`; static report `extensions/jjjoiagdgjhecijlkfkipeilgfgbhkgc_0.012/static/static_report.json`; dynamic report `extensions/jjjoiagdgjhecijlkfkipeilgfgbhkgc_0.012/dynamic/dynamic_report.json`.


## Recommendations

1. Do not let page-controlled cookies or DOM values select extension-owned storage values; validate the expected value and keep credentials in extension-owned UI/state.
2. Treat storage writes as privileged state changes: use an allowlisted schema, reject attacker-controlled keys, and avoid merging untrusted objects into extension state.
3. Never return sensitive extension data to an untrusted page or external sender; enforce an explicit origin and sender allowlist.
4. Reduce host permissions and sensitive API access to the smallest scope required by the feature.

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
