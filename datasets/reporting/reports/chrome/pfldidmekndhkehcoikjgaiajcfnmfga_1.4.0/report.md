# Security Vulnerability Report: Critical Extension Storage Poisoning in ReciMe Extension

## Summary

We are writing on behalf of a security research team from Nankai University and the University of Liverpool. Our Ground Truth review identified **1 Flow(s)** in **ReciMe Extension** (chrome, extension ID `pfldidmekndhkehcoikjgaiajcfnmfga`, version `1.4.0`).
The recorded issue type(s): **Extension Storage Poisoning**.

## Affected Extension Details

- Name: ReciMe Extension
- Platform: chrome
- Extension ID: `pfldidmekndhkehcoikjgaiajcfnmfga`
- Dataset version: `1.4.0`
- Store version at review: `1.4.0`
- Users: 20000
- Analysis tools: CoCo, DoubleX, ExPGuard

## Findings

### Finding 1: Storage Poisoning

The Ground Truth record traces An external extension able to message this extension from `CHROME_ONMESSAGEEXTERNAL_MESSAGE` (chrome.runtime.onMessageExternal.addListener[message]) in background at L1:C312 -> L1:C313 to the privileged sink `CHROME_LOCAL_STORAGE` (userId) in background at L1:C534 -> L1:C647. The source scope is in the recorded source context. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-b30cadcc4dfce1ad`
- Severity recorded by the analysis: **CRITICAL**
- Source: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` (chrome.runtime.onMessageExternal.addListener[message]) in background at L1:C312 -> L1:C313
- Sink: `CHROME_LOCAL_STORAGE` (userId) in background at L1:C534 -> L1:C647
- Tools reporting this Flow: ExPGuard, CoCo, DoubleX

- Privilege boundary recorded: `True` (EXTERNALLY_CONNECTABLE); sink grants capability beyond the source origin

#### Analysis and validation

- Static (ExPGuard): verdict `TRUE_POSITIVE`, confidence 0.6; report `extensions/pfldidmekndhkehcoikjgaiajcfnmfga_1.4.0/static/static_report.json`.
- Dynamic (ExPGuard): `EXTERNAL_CONDITION_REQUIRED` (basis `external_condition_required`); a sender-side precondition was recorded; this is not an unconditional runtime reproduction; report `extensions/pfldidmekndhkehcoikjgaiajcfnmfga_1.4.0/dynamic/dynamic_report.json`.
- Static (CoCo): verdict `TRUE_POSITIVE`, confidence 0.6; report `extensions/pfldidmekndhkehcoikjgaiajcfnmfga_1.4.0/static/static_report.json`.
- Dynamic (CoCo): `EXTERNAL_CONDITION_REQUIRED` (basis `external_condition_required`); a sender-side precondition was recorded; this is not an unconditional runtime reproduction; report `extensions/pfldidmekndhkehcoikjgaiajcfnmfga_1.4.0/dynamic/dynamic_report.json`.
- Static (DoubleX): verdict `TRUE_POSITIVE`, confidence 0.6; report `extensions/pfldidmekndhkehcoikjgaiajcfnmfga_1.4.0/static/static_report.json`.
- Dynamic (DoubleX): `EXTERNAL_CONDITION_REQUIRED` (basis `external_condition_required`); a sender-side precondition was recorded; this is not an unconditional runtime reproduction; report `extensions/pfldidmekndhkehcoikjgaiajcfnmfga_1.4.0/dynamic/dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `1.4.0` in a disposable chrome profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Use only a harmless marker in a disposable profile.
window.postMessage({ marker: "EXPGuard_test_marker" }, "*");
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/chrome/flow-verification-results-no-duplicate.json`; static report `extensions/pfldidmekndhkehcoikjgaiajcfnmfga_1.4.0/static/static_report.json`; dynamic report `extensions/pfldidmekndhkehcoikjgaiajcfnmfga_1.4.0/dynamic/dynamic_report.json`.
- CoCo: source report `CoCo/chrome/flow-verification-results-no-duplicate.json`; static report `extensions/pfldidmekndhkehcoikjgaiajcfnmfga_1.4.0/static/static_report.json`; dynamic report `extensions/pfldidmekndhkehcoikjgaiajcfnmfga_1.4.0/dynamic/dynamic_report.json`.
- DoubleX: source report `DoubleX/chrome/flow-verification-results-no-duplicate.json`; static report `extensions/pfldidmekndhkehcoikjgaiajcfnmfga_1.4.0/static/static_report.json`; dynamic report `extensions/pfldidmekndhkehcoikjgaiajcfnmfga_1.4.0/dynamic/dynamic_report.json`.


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
