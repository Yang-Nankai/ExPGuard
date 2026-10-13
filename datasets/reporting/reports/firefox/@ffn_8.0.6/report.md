# Security Vulnerability Report: Critical Extension Storage Poisoning and Sensitive Data Exposure in Fonts Ninja

## Summary

We are writing on behalf of a security research team from Nankai University and the University of Liverpool. Our Ground Truth review identified **2 Flow(s)** in **Fonts Ninja** (firefox, extension ID `@ffn`, version `8.0.6`).
The recorded issue type(s): **Extension Storage Poisoning; Sensitive Data Exposure**.

The store currently reports version `9.0.2`. The update revalidation is summarized per tool below. This report covers only the original Flow(s); newly introduced Flow(s) are out of scope. Any mixed result, tool failure, or incomplete automated run is called out explicitly and should not be read as a final remediation determination.

## Affected Extension Details

- Name: Fonts Ninja
- Platform: firefox
- Extension ID: `@ffn`
- Dataset version: `8.0.6`
- Store version at review: `9.0.2`
- Users: 9716
- Analysis tools: CoCo, DoubleX

## Findings

### Finding 1: Sensitive Data Exposure

The Ground Truth record traces Input reaching the recorded source from `STORAGE_ALL_ITEMS` to the privileged sink `WINDOW_POSTMESSAGE`. The source scope is in the recorded source context. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-09ef38eec85f8098`
- Severity recorded by the analysis: **HIGH**
- Source: `STORAGE_ALL_ITEMS`
- Sink: `WINDOW_POSTMESSAGE`
- Tools reporting this Flow: CoCo, DoubleX

- Privilege boundary recorded: `False` (None); the sink grants a capability beyond the source origin.

#### Updated-version tool result

- CoCo: `disappeared`; original source `STORAGE_ALL_ITEMS` → sink `WINDOW_POSTMESSAGE`; candidate matches: 0
- DoubleX: `tool_failure`; original source `STORAGE_ALL_ITEMS` → sink `WINDOW_POSTMESSAGE`; candidate matches: 0

#### Analysis and validation

- Static (CoCo): verdict `TRUE_POSITIVE`, confidence 0.6; report `extensions/@ffn_8.0.6/static/static_report.json`.
- Dynamic (CoCo): `INCONCLUSIVE_AFTER_DEBUG` (basis `runtime_or_static_dynamic_evidence`); the dynamic run did not establish a decisive runtime result; report `extensions/@ffn_8.0.6/dynamic/dynamic_report.json`.
- Static (DoubleX): verdict `UNCERTAIN`, confidence 0; report `extensions/@ffn_8.0.6/static/static_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `8.0.6` in a disposable firefox profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```text
Deliver the benign marker EXPGuard_test_marker through the source shown in
the finding, then observe whether it reaches the privileged sink.
```

#### Supporting material

- CoCo: source report `CoCo/firefox/flow-verification-results-no-duplicate.json`; static report `extensions/@ffn_8.0.6/static/static_report.json`; dynamic report `extensions/@ffn_8.0.6/dynamic/dynamic_report.json`.
- DoubleX: source report `DoubleX/firefox/flow-verification-results-no-duplicate.json`; static report `extensions/@ffn_8.0.6/static/static_report.json`; dynamic report `not recorded`.

### Finding 2: Storage Poisoning

The Ground Truth record traces A page or sender able to reach the recorded message/event source from `WINDOW_MESSAGE_EVENT` to the privileged sink `CHROME_SYNC_STORAGE`. The source scope is in the recorded source context. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-5cd772cf44634ba7`
- Severity recorded by the analysis: **CRITICAL**
- Source: `WINDOW_MESSAGE_EVENT`
- Sink: `CHROME_SYNC_STORAGE`
- Tools reporting this Flow: CoCo, DoubleX

- Privilege boundary recorded: `False` (None); the sink grants a capability beyond the source origin.

#### Updated-version tool result

- CoCo: `disappeared`; original source `WINDOW_MESSAGE_EVENT` → sink `CHROME_SYNC_STORAGE`; candidate matches: 0
- DoubleX: `tool_failure`; original source `WINDOW_MESSAGE_EVENT` → sink `CHROME_SYNC_STORAGE`; candidate matches: 0

#### Analysis and validation

- Static (CoCo): verdict `UNCERTAIN`, confidence 0; report `extensions/@ffn_8.0.6/static/static_report.json`.
- Dynamic (CoCo): `INCONCLUSIVE_AFTER_DEBUG` (basis `runtime_or_static_dynamic_evidence`); the dynamic agent exceeded its 30-second budget, so this run did not establish a decisive runtime result; report `extensions/@ffn_8.0.6/dynamic/dynamic_report.json`.
- Static (DoubleX): verdict `TRUE_POSITIVE`, confidence 0.6; report `extensions/@ffn_8.0.6/static/static_report.json`.
- Dynamic (DoubleX): `INCONCLUSIVE_AFTER_DEBUG` (basis `runtime_or_static_dynamic_evidence`); the dynamic agent exceeded its 30-second budget, so this run did not establish a decisive runtime result; report `extensions/@ffn_8.0.6/dynamic/dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `8.0.6` in a disposable firefox profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Use only a harmless marker in a disposable profile.
window.postMessage({ marker: "EXPGuard_test_marker" }, "*");
```

#### Supporting material

- CoCo: source report `CoCo/firefox/flow-verification-results-no-duplicate.json`; static report `extensions/@ffn_8.0.6/static/static_report.json`; dynamic report `extensions/@ffn_8.0.6/dynamic/dynamic_report.json`.
- DoubleX: source report `DoubleX/firefox/flow-verification-results-no-duplicate.json`; static report `extensions/@ffn_8.0.6/static/static_report.json`; dynamic report `extensions/@ffn_8.0.6/dynamic/dynamic_report.json`.


## Recommendations

1. Do not let page-controlled cookies or DOM values select extension-owned storage values; validate the expected value and keep credentials in extension-owned UI/state.
2. Treat storage writes as privileged state changes: use an allowlisted schema, reject attacker-controlled keys, and avoid merging untrusted objects into extension state.
3. Never return sensitive extension data to an untrusted page or external sender; enforce an explicit origin and sender allowlist.
4. Reduce host permissions and sensitive API access to the smallest scope required by the feature.

## Impact

The demonstrated impact is limited to the operation described in each finding and the extension's granted permissions. The evidence above distinguishes the recorded static path from any runtime result; it does not imply unrelated account compromise, data theft, or malware installation.

## Disclosure Status

- Report class: `updated_still_detected`
- This report covers only the listed Ground Truth Flow(s). Newly introduced Flow(s) are outside scope.
- Contact discovery: `found` (Mozilla Add-ons API support_email)

Please contact us so that we can coordinate remediation and retest the affected Flow(s).

Regards,
Xin Yang
Nankai University / University of Liverpool
