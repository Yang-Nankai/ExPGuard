# Security Vulnerability Report: Critical Extension Storage Poisoning and Sensitive Data Exposure in 多多对账-拼多多订单、账单分析工具

## Summary

We are writing on behalf of a security research team from Nankai University and the University of Liverpool. Our Ground Truth review identified **2 Flow(s)** in **多多对账-拼多多订单、账单分析工具** (edge, extension ID `adiibejjcageoiipfmjafdlfhppedlbj`, version `1.0.4`).
The recorded issue type(s): **Extension Storage Poisoning; Sensitive Data Exposure**.

## Affected Extension Details

- Name: 多多对账-拼多多订单、账单分析工具
- Platform: edge
- Extension ID: `adiibejjcageoiipfmjafdlfhppedlbj`
- Dataset version: `1.0.4`
- Store version at review: `1.0.4`
- Users: 1191
- Analysis tools: CoCo, ExPGuard

## Findings

### Finding 1: Sensitive Data Exposure

The Ground Truth record traces Input reaching the recorded source from `STORAGE_ALL_ITEMS` (CoCo source evidence) in crx_headers/bg_header.js at L498:C1 -> L498:C1 to the privileged sink `CHROME_RUNTIME_ONMESSAGEEXTERNAL_SENDRESPONSE` (CoCo sink evidence) in background.js at L21:C1 -> L21:C1. The source scope is in the recorded source context. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-10df2febc8c684fb`
- Severity recorded by the analysis: **HIGH**
- Source: `STORAGE_ALL_ITEMS` (CoCo source evidence) in crx_headers/bg_header.js at L498:C1 -> L498:C1
- Sink: `CHROME_RUNTIME_ONMESSAGEEXTERNAL_SENDRESPONSE` (CoCo sink evidence) in background.js at L21:C1 -> L21:C1
- Tools reporting this Flow: CoCo

- Privilege boundary recorded: `True` (None); CoCo reported cross-boundary flow; verify with source

#### Analysis and validation

- Static (CoCo): verdict `TRUE_POSITIVE`, confidence 0.6; report `extensions/adiibejjcageoiipfmjafdlfhppedlbj_1.0.4/static/static_report.json`.
- Dynamic (CoCo): `NOT_ATTEMPTED` (basis `runtime_or_static_dynamic_evidence`); this result does not independently confirm execution at the sink; report `extensions/adiibejjcageoiipfmjafdlfhppedlbj_1.0.4/dynamic/dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `1.0.4` in a disposable edge profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```text
Deliver the benign marker EXPGuard_test_marker through the source shown in
the finding, then observe whether it reaches the privileged sink.
```

#### Supporting material

- CoCo: source report `CoCo/edge/flow-verification-results-no-duplicate.json`; static report `extensions/adiibejjcageoiipfmjafdlfhppedlbj_1.0.4/static/static_report.json`; dynamic report `extensions/adiibejjcageoiipfmjafdlfhppedlbj_1.0.4/dynamic/dynamic_report.json`.

### Finding 2: Storage Poisoning

The Ground Truth record traces An external extension able to message this extension from `CHROME_ONMESSAGEEXTERNAL_MESSAGE` (chrome.runtime.onMessageExternal.addListener[message]) in background at L106:C16 -> L106:C23 to the privileged sink `CHROME_LOCAL_STORAGE` (email) in background at L122:C8 -> L124:C10. The source scope is in the recorded source context. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-811294fbbafa42c0`
- Severity recorded by the analysis: **CRITICAL**
- Source: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` (chrome.runtime.onMessageExternal.addListener[message]) in background at L106:C16 -> L106:C23
- Sink: `CHROME_LOCAL_STORAGE` (email) in background at L122:C8 -> L124:C10
- Tools reporting this Flow: ExPGuard, CoCo

- Privilege boundary recorded: `True` (EXTERNALLY_CONNECTABLE); sink grants capability beyond the source origin

#### Analysis and validation

- Static (ExPGuard): verdict `TRUE_POSITIVE`, confidence 0.6; report `extensions/adiibejjcageoiipfmjafdlfhppedlbj_1.0.4/static/static_report.json`.
- Dynamic (ExPGuard): `CONFIRMED` (basis `runtime_reproduced`; evidence stage `MARKER_REACHED`); runtime reproduction recorded; report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\edge\extensions\adiibejjcageoiipfmjafdlfhppedlbj_1.0.4\dynamic\dynamic_report.json`.
- Static (CoCo): verdict `TRUE_POSITIVE`, confidence 0.6; report `extensions/adiibejjcageoiipfmjafdlfhppedlbj_1.0.4/static/static_report.json`.
- Dynamic (CoCo): `EXTERNAL_CONDITION_REQUIRED` (basis `external_condition_required`); a sender-side precondition was recorded; this is not an unconditional runtime reproduction; report `extensions/adiibejjcageoiipfmjafdlfhppedlbj_1.0.4/dynamic/dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `1.0.4` in a disposable edge profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Use only a harmless marker in a disposable profile.
window.postMessage({ marker: "EXPGuard_test_marker" }, "*");
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/edge/flow-verification-results-no-duplicate.json`; static report `extensions/adiibejjcageoiipfmjafdlfhppedlbj_1.0.4/static/static_report.json`; dynamic report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\edge\extensions\adiibejjcageoiipfmjafdlfhppedlbj_1.0.4\dynamic\dynamic_report.json`.
- CoCo: source report `CoCo/edge/flow-verification-results-no-duplicate.json`; static report `extensions/adiibejjcageoiipfmjafdlfhppedlbj_1.0.4/static/static_report.json`; dynamic report `extensions/adiibejjcageoiipfmjafdlfhppedlbj_1.0.4/dynamic/dynamic_report.json`.


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
