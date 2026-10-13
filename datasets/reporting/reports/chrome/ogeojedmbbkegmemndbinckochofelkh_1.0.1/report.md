# Security Vulnerability Report: Critical Extension Storage Poisoning and Unauthorized Browser Policy Change in After Dark Mode

## Summary

We are writing on behalf of a security research team from Nankai University and the University of Liverpool. Our Ground Truth review identified **2 Flow(s)** in **After Dark Mode** (chrome, extension ID `ogeojedmbbkegmemndbinckochofelkh`, version `1.0.1`).
The recorded issue type(s): **Extension Storage Poisoning; Unauthorized Browser Policy Change**.

## Affected Extension Details

- Name: After Dark Mode
- Platform: chrome
- Extension ID: `ogeojedmbbkegmemndbinckochofelkh`
- Dataset version: `1.0.1`
- Store version at review: `1.0.1`
- Users: 100000
- Analysis tools: CoCo, DoubleX

## Findings

### Finding 1: Unauthorized Browser Policy Modification

The Ground Truth record traces Input reaching the recorded source from `FETCH_RESPONSE` (CoCo source evidence) in crx_headers/bg_header.js at L12:C1 -> L12:C1 to the privileged sink `CHROME_DECLARATIVENETREQUEST_RULES` (CoCo sink evidence) in crx_headers/bg_header.js at L12:C1 -> L12:C1. The source scope is in the recorded source context. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-8117e6d90921d96d`
- Severity recorded by the analysis: **CRITICAL**
- Source: `FETCH_RESPONSE` (CoCo source evidence) in crx_headers/bg_header.js at L12:C1 -> L12:C1
- Sink: `CHROME_DECLARATIVENETREQUEST_RULES` (CoCo sink evidence) in crx_headers/bg_header.js at L12:C1 -> L12:C1
- Tools reporting this Flow: CoCo

- Privilege boundary recorded: `True` (None); CoCo reported cross-boundary flow; verify with source

#### Analysis and validation

- Static (CoCo): verdict `TRUE_POSITIVE`, confidence 0.6; report `extensions/ogeojedmbbkegmemndbinckochofelkh_1.0.1/static/static_report.json`.
- Dynamic (CoCo): `INCONCLUSIVE_AFTER_DEBUG` (basis `runtime_or_static_dynamic_evidence`); the dynamic agent exceeded its 30-second budget, so this run did not establish a decisive runtime result; report `extensions/ogeojedmbbkegmemndbinckochofelkh_1.0.1/dynamic/dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `1.0.1` in a disposable chrome profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```text
Deliver the benign marker EXPGuard_test_marker through the source shown in
the finding, then observe whether it reaches the privileged sink.
```

#### Supporting material

- CoCo: source report `CoCo/chrome/flow-verification-results-no-duplicate.json`; static report `extensions/ogeojedmbbkegmemndbinckochofelkh_1.0.1/static/static_report.json`; dynamic report `extensions/ogeojedmbbkegmemndbinckochofelkh_1.0.1/dynamic/dynamic_report.json`.

### Finding 2: Storage Poisoning

The Ground Truth record traces An external extension able to message this extension from `CHROME_ONMESSAGEEXTERNAL_MESSAGE` (CoCo source evidence) in js/background.js at L6:C1 -> L6:C1 to the privileged sink `CHROME_LOCAL_STORAGE` (CoCo sink evidence) in js/background.js at L6:C1 -> L6:C1. The source scope is on pages matching `*://afterdarkmode.com/*, http://127.0.0.1/*, http://localhost/*, https://127.0.0.1/*, https://localhost/*`. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-8a3f66caca48d9dd`
- Severity recorded by the analysis: **CRITICAL**
- Source: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` (CoCo source evidence) in js/background.js at L6:C1 -> L6:C1
- Sink: `CHROME_LOCAL_STORAGE` (CoCo sink evidence) in js/background.js at L6:C1 -> L6:C1
- Tools reporting this Flow: CoCo, DoubleX

- Privilege boundary recorded: `True` (EXTERNALLY_CONNECTABLE); CoCo reported cross-boundary flow; verify with source

#### Analysis and validation

- Static (CoCo): verdict `TRUE_POSITIVE`, confidence 0.6; report `extensions/ogeojedmbbkegmemndbinckochofelkh_1.0.1/static/static_report.json`.
- Dynamic (CoCo): `EXTERNAL_CONDITION_REQUIRED` (basis `external_condition_required`); a sender-side precondition was recorded; this is not an unconditional runtime reproduction; report `extensions/ogeojedmbbkegmemndbinckochofelkh_1.0.1/dynamic/dynamic_report.json`.
- Static (DoubleX): verdict `TRUE_POSITIVE`, confidence 0.6; report `extensions/ogeojedmbbkegmemndbinckochofelkh_1.0.1/static/static_report.json`.
- Dynamic (DoubleX): `EXTERNAL_CONDITION_REQUIRED` (basis `external_condition_required`); a sender-side precondition was recorded; this is not an unconditional runtime reproduction; report `extensions/ogeojedmbbkegmemndbinckochofelkh_1.0.1/dynamic/dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `1.0.1` in a disposable chrome profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Use only a harmless marker in a disposable profile.
window.postMessage({ marker: "EXPGuard_test_marker" }, "*");
```

#### Supporting material

- CoCo: source report `CoCo/chrome/flow-verification-results-no-duplicate.json`; static report `extensions/ogeojedmbbkegmemndbinckochofelkh_1.0.1/static/static_report.json`; dynamic report `extensions/ogeojedmbbkegmemndbinckochofelkh_1.0.1/dynamic/dynamic_report.json`.
- DoubleX: source report `DoubleX/chrome/flow-verification-results-no-duplicate.json`; static report `extensions/ogeojedmbbkegmemndbinckochofelkh_1.0.1/static/static_report.json`; dynamic report `extensions/ogeojedmbbkegmemndbinckochofelkh_1.0.1/dynamic/dynamic_report.json`.


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
