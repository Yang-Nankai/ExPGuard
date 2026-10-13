# Security Vulnerability Report: Critical CSRF via Privileged Network Request and Extension Storage Poisoning in 来搜

## Summary

We are writing on behalf of a security research team from Nankai University and the University of Liverpool. Our Ground Truth review identified **2 Flow(s)** in **来搜** (chrome, extension ID `kdglfacllamekkphagegcaabjaicekin`, version `3.1.8`).
The recorded issue type(s): **CSRF via Privileged Network Request; Extension Storage Poisoning**.

The store currently reports version `3.2.0`. The update revalidation is summarized per tool below. This report covers only the original Flow(s); newly introduced Flow(s) are out of scope. Any mixed result, tool failure, or incomplete automated run is called out explicitly and should not be read as a final remediation determination.

## Affected Extension Details

- Name: 来搜
- Platform: chrome
- Extension ID: `kdglfacllamekkphagegcaabjaicekin`
- Dataset version: `3.1.8`
- Store version at review: `3.2.0`
- Users: 50000
- Analysis tools: CoCo, ExPGuard

## Findings

### Finding 1: Storage Poisoning

The Ground Truth record traces An external extension able to message this extension from `CHROME_ONMESSAGEEXTERNAL_MESSAGE` (chrome.runtime.onMessageExternal.addListener[message]) in background at L16:C63 -> L16:C70 to the privileged sink `CHROME_SYNC_STORAGE` (qiuqiToken) in background at L34:C8 -> L34:C84. The source scope is in the recorded source context. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-b8aac0202a3876b9`
- Severity recorded by the analysis: **CRITICAL**
- Source: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` (chrome.runtime.onMessageExternal.addListener[message]) in background at L16:C63 -> L16:C70
- Sink: `CHROME_SYNC_STORAGE` (qiuqiToken) in background at L34:C8 -> L34:C84
- Tools reporting this Flow: ExPGuard, CoCo

- Privilege boundary recorded: `True` (EXTERNALLY_CONNECTABLE); sink grants capability beyond the source origin

#### Updated-version tool result

- ExPGuard: `tool_failure`; original source `CHROME_ONMESSAGEEXTERNAL_MESSAGE` → sink `CHROME_SYNC_STORAGE`; candidate matches: 0
- CoCo: `disappeared`; original source `CHROME_ONMESSAGEEXTERNAL_MESSAGE` → sink `CHROME_SYNC_STORAGE`; candidate matches: 0

#### Analysis and validation

- Static (ExPGuard): verdict `TRUE_POSITIVE`, confidence 0.6; report `extensions/kdglfacllamekkphagegcaabjaicekin_3.1.8/static/static_report.json`.
- Dynamic (ExPGuard): `CONFIRMED` (basis `runtime_reproduced`; evidence stage `MARKER_REACHED`); runtime reproduction recorded; report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\chrome\extensions\kdglfacllamekkphagegcaabjaicekin_3.1.8\dynamic\dynamic_report.json`.
- Static (CoCo): verdict `TRUE_POSITIVE`, confidence 0.6; report `extensions/kdglfacllamekkphagegcaabjaicekin_3.1.8/static/static_report.json`.
- Dynamic (CoCo): `EXTERNAL_CONDITION_REQUIRED` (basis `external_condition_required`); a sender-side precondition was recorded; this is not an unconditional runtime reproduction; report `extensions/kdglfacllamekkphagegcaabjaicekin_3.1.8/dynamic/dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `3.1.8` in a disposable chrome profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Use only a harmless marker in a disposable profile.
window.postMessage({ marker: "EXPGuard_test_marker" }, "*");
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/chrome/flow-verification-results-no-duplicate.json`; static report `extensions/kdglfacllamekkphagegcaabjaicekin_3.1.8/static/static_report.json`; dynamic report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\chrome\extensions\kdglfacllamekkphagegcaabjaicekin_3.1.8\dynamic\dynamic_report.json`.
- CoCo: source report `CoCo/chrome/flow-verification-results-no-duplicate.json`; static report `extensions/kdglfacllamekkphagegcaabjaicekin_3.1.8/static/static_report.json`; dynamic report `extensions/kdglfacllamekkphagegcaabjaicekin_3.1.8/dynamic/dynamic_report.json`.

### Finding 2: Cross-Site Request Forgery (CSRF) / Privileged Network Request

The Ground Truth record traces An external extension able to message this extension from `CHROME_ONMESSAGEEXTERNAL_MESSAGE` (From storage.sync.set('qiuqiData') in background) in background at L16:C63 -> L16:C70 to the privileged sink `WEBSOCKET_URL` in background at L598:C14 -> L598:C76. The source scope is in the recorded source context. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-c8879699a9c9d911`
- Severity recorded by the analysis: **CRITICAL**
- Source: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` (From storage.sync.set('qiuqiData') in background) in background at L16:C63 -> L16:C70
- Sink: `WEBSOCKET_URL` in background at L598:C14 -> L598:C76
- Tools reporting this Flow: ExPGuard, CoCo

- Privilege boundary recorded: `True` (EXTERNALLY_CONNECTABLE); sink grants capability beyond the source origin

#### Updated-version tool result

- ExPGuard: `tool_failure`; original source `CHROME_ONMESSAGEEXTERNAL_MESSAGE` → sink `WEBSOCKET_URL`; candidate matches: 0
- CoCo: `disappeared`; original source `CHROME_ONMESSAGEEXTERNAL_MESSAGE` → sink `WEBSOCKET_URL`; candidate matches: 0

#### Analysis and validation

- Static (ExPGuard): verdict `TRUE_POSITIVE`, confidence 0.6; report `extensions/kdglfacllamekkphagegcaabjaicekin_3.1.8/static/static_report.json`.
- Dynamic (ExPGuard): `PARTIAL` (basis `non_decisive`; evidence stage `SINK_REACHED`); the recorded replay did not establish the complete source-to-sink effect; report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\chrome\extensions\kdglfacllamekkphagegcaabjaicekin_3.1.8\dynamic\dynamic_report.json`.
- Static (CoCo): verdict `PARTIAL`, confidence 0.6; report `extensions/kdglfacllamekkphagegcaabjaicekin_3.1.8/static/static_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `3.1.8` in a disposable chrome profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Use only a harmless marker in a disposable profile.
window.postMessage({ marker: "EXPGuard_test_marker" }, "*");
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/chrome/flow-verification-results-no-duplicate.json`; static report `extensions/kdglfacllamekkphagegcaabjaicekin_3.1.8/static/static_report.json`; dynamic report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\chrome\extensions\kdglfacllamekkphagegcaabjaicekin_3.1.8\dynamic\dynamic_report.json`.
- CoCo: source report `CoCo/chrome/flow-verification-results-no-duplicate.json`; static report `extensions/kdglfacllamekkphagegcaabjaicekin_3.1.8/static/static_report.json`; dynamic report `not recorded`.


## Recommendations

1. Authenticate page-to-extension events at the privilege boundary; validate the sender and origin instead of trusting DOM event detail.
2. Validate the request schema and restrict destination URLs, methods, headers, and bodies before issuing privileged network requests.
3. Do not let page-controlled cookies or DOM values select extension-owned storage values; validate the expected value and keep credentials in extension-owned UI/state.
4. Treat storage writes as privileged state changes: use an allowlisted schema, reject attacker-controlled keys, and avoid merging untrusted objects into extension state.
5. Reduce host permissions and sensitive API access to the smallest scope required by the feature.

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
