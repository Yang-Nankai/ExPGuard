# Security Vulnerability Report: Critical Extension Storage Poisoning in Twitter UI - Control Panel For Twitter

## Summary

We are writing on behalf of a security research team from Nankai University and the University of Liverpool. Our Ground Truth review identified **1 Flow(s)** in **Twitter UI - Control Panel For Twitter** (edge, extension ID `ngemddlbcjkjeodhophkbenappkchnhm`, version `1.0.0`).
The recorded issue type(s): **Extension Storage Poisoning**.

## Affected Extension Details

- Name: Twitter UI - Control Panel For Twitter
- Platform: edge
- Extension ID: `ngemddlbcjkjeodhophkbenappkchnhm`
- Dataset version: `1.0.0`
- Store version at review: `1.0.0`
- Users: 588
- Analysis tools: CoCo, DoubleX, ExPGuard

## Findings

### Finding 1: Storage Poisoning

The Ground Truth record traces A page or sender able to reach the recorded message/event source from `WINDOW_MESSAGE_EVENT` (window.addEventListener(message)) in content at L155:C34 -> L155:C45 to the privileged sink `CHROME_LOCAL_STORAGE` (storage.fuzzy.settings) in content at L158:C12 -> L160:C14. The source scope is on pages matching `https://twitter.com/*, https://mobile.twitter.com/*`. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-878b6bd59cdd2392`
- Severity recorded by the analysis: **CRITICAL**
- Source: `WINDOW_MESSAGE_EVENT` (window.addEventListener(message)) in content at L155:C34 -> L155:C45
- Sink: `CHROME_LOCAL_STORAGE` (storage.fuzzy.settings) in content at L158:C12 -> L160:C14
- Tools reporting this Flow: ExPGuard, CoCo, DoubleX

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Analysis and validation

- Static (ExPGuard): verdict `TRUE_POSITIVE`, confidence 0.6; report `extensions/ngemddlbcjkjeodhophkbenappkchnhm_1.0.0/static/static_report.json`.
- Dynamic (ExPGuard): `CONFIRMED` (basis `runtime_reproduced`; evidence stage `MARKER_REACHED`); runtime reproduction recorded; report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\edge\extensions\ngemddlbcjkjeodhophkbenappkchnhm_1.0.0\dynamic\dynamic_report.json`.
- Static (CoCo): verdict `TRUE_POSITIVE`, confidence 0.6; report `extensions/ngemddlbcjkjeodhophkbenappkchnhm_1.0.0/static/static_report.json`.
- Dynamic (CoCo): `INCONCLUSIVE_AFTER_DEBUG` (basis `runtime_or_static_dynamic_evidence`); the dynamic agent exceeded its 30-second budget, so this run did not establish a decisive runtime result; report `extensions/ngemddlbcjkjeodhophkbenappkchnhm_1.0.0/dynamic/dynamic_report.json`.
- Static (DoubleX): verdict `TRUE_POSITIVE`, confidence 0.6; report `extensions/ngemddlbcjkjeodhophkbenappkchnhm_1.0.0/static/static_report.json`.
- Dynamic (DoubleX): `INCONCLUSIVE_AFTER_DEBUG` (basis `runtime_or_static_dynamic_evidence`); the dynamic agent exceeded its 30-second budget, so this run did not establish a decisive runtime result; report `extensions/ngemddlbcjkjeodhophkbenappkchnhm_1.0.0/dynamic/dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `1.0.0` in a disposable edge profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Use only a harmless marker in a disposable profile.
window.postMessage({ marker: "EXPGuard_test_marker" }, "*");
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/edge/flow-verification-results-no-duplicate.json`; static report `extensions/ngemddlbcjkjeodhophkbenappkchnhm_1.0.0/static/static_report.json`; dynamic report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\edge\extensions\ngemddlbcjkjeodhophkbenappkchnhm_1.0.0\dynamic\dynamic_report.json`.
- CoCo: source report `CoCo/edge/flow-verification-results-no-duplicate.json`; static report `extensions/ngemddlbcjkjeodhophkbenappkchnhm_1.0.0/static/static_report.json`; dynamic report `extensions/ngemddlbcjkjeodhophkbenappkchnhm_1.0.0/dynamic/dynamic_report.json`.
- DoubleX: source report `DoubleX/edge/flow-verification-results-no-duplicate.json`; static report `extensions/ngemddlbcjkjeodhophkbenappkchnhm_1.0.0/static/static_report.json`; dynamic report `extensions/ngemddlbcjkjeodhophkbenappkchnhm_1.0.0/dynamic/dynamic_report.json`.


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
