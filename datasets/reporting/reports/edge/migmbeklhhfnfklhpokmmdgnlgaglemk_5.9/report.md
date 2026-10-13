# Security Vulnerability Report: Critical Extension Storage Poisoning and Unauthorized Tab/Window Control in Emoji Keyboard

## Summary

We are writing on behalf of a security research team from Nankai University and the University of Liverpool. Our Ground Truth review identified **2 Flow(s)** in **Emoji Keyboard** (edge, extension ID `migmbeklhhfnfklhpokmmdgnlgaglemk`, version `5.9`).
The recorded issue type(s): **Extension Storage Poisoning; Unauthorized Tab/Window Control**.

The store currently reports version `6.0`. The update revalidation is summarized per tool below. This report covers only the original Flow(s); newly introduced Flow(s) are out of scope. Any mixed result, tool failure, or incomplete automated run is called out explicitly and should not be read as a final remediation determination.

## Affected Extension Details

- Name: Emoji Keyboard
- Platform: edge
- Extension ID: `migmbeklhhfnfklhpokmmdgnlgaglemk`
- Dataset version: `5.9`
- Store version at review: `6.0`
- Users: 32991
- Analysis tools: CoCo, DoubleX

## Findings

### Finding 1: Storage Poisoning

The Ground Truth record traces An external extension able to message this extension from `CHROME_ONMESSAGEEXTERNAL_MESSAGE` (CoCo source evidence) in eventPage.js at L112:C1 -> L112:C1 to the privileged sink `CHROME_LOCAL_STORAGE` (CoCo sink evidence) in eventPage.js at L135:C1 -> L135:C1. The source scope is in the recorded source context. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-0fe2d1a7f8b49f2a`
- Severity recorded by the analysis: **CRITICAL**
- Source: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` (CoCo source evidence) in eventPage.js at L112:C1 -> L112:C1
- Sink: `CHROME_LOCAL_STORAGE` (CoCo sink evidence) in eventPage.js at L135:C1 -> L135:C1
- Tools reporting this Flow: CoCo, DoubleX

- Privilege boundary recorded: `True` (EXTERNALLY_CONNECTABLE); CoCo reported cross-boundary flow; verify with source

#### Updated-version tool result

- CoCo: `still_detected`; original source `CHROME_ONMESSAGEEXTERNAL_MESSAGE` → sink `CHROME_LOCAL_STORAGE`; candidate matches: 1
- DoubleX: `still_detected`; original source `WINDOW_MESSAGE_EVENT` → sink `CHROME_LOCAL_STORAGE`; candidate matches: 1

#### Analysis and validation

- Static (CoCo): verdict `TRUE_POSITIVE`, confidence 0.6; report `extensions/migmbeklhhfnfklhpokmmdgnlgaglemk_5.9/static/static_report.json`.
- Dynamic (CoCo): `NOT_ATTEMPTED` (basis `runtime_or_static_dynamic_evidence`); this result does not independently confirm execution at the sink; report `extensions/migmbeklhhfnfklhpokmmdgnlgaglemk_5.9/dynamic/dynamic_report.json`.
- Static (DoubleX): verdict `FALSE_POSITIVE`, confidence 0.6; report `extensions/migmbeklhhfnfklhpokmmdgnlgaglemk_5.9/static/static_report.json`.
- Dynamic (DoubleX): `SINK_NOT_FIRED` (evidence stage `ENVIRONMENT_READY`); the recorded replay did not establish the complete source-to-sink effect; report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\round-doublex-edge-unconfirmed-21-r2\dynamic\doublex-edge-r2\summary.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `5.9` in a disposable edge profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Use only a harmless marker in a disposable profile.
window.postMessage({ marker: "EXPGuard_test_marker" }, "*");
```

#### Supporting material

- CoCo: source report `CoCo/edge/flow-verification-results-no-duplicate.json`; static report `extensions/migmbeklhhfnfklhpokmmdgnlgaglemk_5.9/static/static_report.json`; dynamic report `extensions/migmbeklhhfnfklhpokmmdgnlgaglemk_5.9/dynamic/dynamic_report.json`.
- DoubleX: source report `DoubleX/edge/flow-verification-results-no-duplicate.json`; static report `extensions/migmbeklhhfnfklhpokmmdgnlgaglemk_5.9/static/static_report.json`; dynamic report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\round-doublex-edge-unconfirmed-21-r2\dynamic\doublex-edge-r2\summary.json`.

### Finding 2: Unauthorized Tab or Window Manipulation

The Ground Truth record traces An external extension able to message this extension from `CHROME_ONMESSAGEEXTERNAL_MESSAGE` (CoCo source evidence) in eventPage.js at L112:C1 -> L112:C1 to the privileged sink `CHROME_WINDOWS_CREATE_OPTIONS` (CoCo sink evidence) in eventPage.js at L127:C1 -> L127:C1. The source scope is in the recorded source context. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-c18dad173fc5042e`
- Severity recorded by the analysis: **CRITICAL**
- Source: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` (CoCo source evidence) in eventPage.js at L112:C1 -> L112:C1
- Sink: `CHROME_WINDOWS_CREATE_OPTIONS` (CoCo sink evidence) in eventPage.js at L127:C1 -> L127:C1
- Tools reporting this Flow: CoCo

- Privilege boundary recorded: `True` (EXTERNALLY_CONNECTABLE); CoCo reported cross-boundary flow; verify with source

#### Updated-version tool result

- CoCo: `still_detected`; original source `CHROME_ONMESSAGEEXTERNAL_MESSAGE` → sink `CHROME_WINDOWS_CREATE_OPTIONS`; candidate matches: 1

#### Analysis and validation

- Static (CoCo): verdict `TRUE_POSITIVE`, confidence 0.6; report `extensions/migmbeklhhfnfklhpokmmdgnlgaglemk_5.9/static/static_report.json`.
- Dynamic (CoCo): `NOT_ATTEMPTED` (basis `runtime_or_static_dynamic_evidence`); this result does not independently confirm execution at the sink; report `extensions/migmbeklhhfnfklhpokmmdgnlgaglemk_5.9/dynamic/dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `5.9` in a disposable edge profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Use only a harmless marker in a disposable profile.
window.postMessage({ marker: "EXPGuard_test_marker" }, "*");
```

#### Supporting material

- CoCo: source report `CoCo/edge/flow-verification-results-no-duplicate.json`; static report `extensions/migmbeklhhfnfklhpokmmdgnlgaglemk_5.9/static/static_report.json`; dynamic report `extensions/migmbeklhhfnfklhpokmmdgnlgaglemk_5.9/dynamic/dynamic_report.json`.


## Recommendations

1. Do not let page-controlled cookies or DOM values select extension-owned storage values; validate the expected value and keep credentials in extension-owned UI/state.
2. Treat storage writes as privileged state changes: use an allowlisted schema, reject attacker-controlled keys, and avoid merging untrusted objects into extension state.
3. Validate tab/window IDs and navigation targets, and require a user gesture for externally initiated changes.
4. Reduce host permissions and sensitive API access to the smallest scope required by the feature.

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
