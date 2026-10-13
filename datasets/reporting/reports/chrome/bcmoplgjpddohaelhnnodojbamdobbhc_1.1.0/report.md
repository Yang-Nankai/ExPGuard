# Security Vulnerability Report: High CSRF via Privileged Network Request, Extension Storage Poisoning, and other reported issues in YouTube To Transcript: AI Summarizer & Chat

## Summary

We are writing on behalf of a security research team from Nankai University and the University of Liverpool. Our Ground Truth review identified **3 Flow(s)** in **YouTube To Transcript: AI Summarizer & Chat** (chrome, extension ID `bcmoplgjpddohaelhnnodojbamdobbhc`, version `1.1.0`).
The recorded issue type(s): **CSRF via Privileged Network Request; Extension Storage Poisoning; Sensitive Data Exposure**.

## Affected Extension Details

- Name: YouTube To Transcript: AI Summarizer & Chat
- Platform: chrome
- Extension ID: `bcmoplgjpddohaelhnnodojbamdobbhc`
- Dataset version: `1.1.0`
- Store version at review: `1.1.0`
- Users: 60000
- Analysis tools: CoCo, ExPGuard

## Findings

### Finding 1: Sensitive Data Exposure

The Ground Truth record traces Input reaching the recorded source from `STORAGE_ALL_ITEMS` (CoCo source evidence) in crx_headers/cs_header.js at L165:C1 -> L165:C1 to the privileged sink `WINDOW_POSTMESSAGE` (CoCo sink evidence) in extension-content.js at L1:C1 -> L1:C1. The source scope is in the recorded source context. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-52ba98049fe277e6`
- Severity recorded by the analysis: **HIGH**
- Source: `STORAGE_ALL_ITEMS` (CoCo source evidence) in crx_headers/cs_header.js at L165:C1 -> L165:C1
- Sink: `WINDOW_POSTMESSAGE` (CoCo sink evidence) in extension-content.js at L1:C1 -> L1:C1
- Tools reporting this Flow: CoCo

- Privilege boundary recorded: `True` (None); CoCo reported cross-boundary flow; verify with source

#### Analysis and validation

- Static (CoCo): verdict `TRUE_POSITIVE`, confidence 0.96; report `extensions/bcmoplgjpddohaelhnnodojbamdobbhc_1.1.0/static/static_report.json`.
- Dynamic (CoCo): `INCONCLUSIVE_AFTER_DEBUG` (basis `runtime_or_static_dynamic_evidence`); the dynamic run did not establish a decisive runtime result; report `extensions/bcmoplgjpddohaelhnnodojbamdobbhc_1.1.0/dynamic/dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `1.1.0` in a disposable chrome profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```text
Deliver the benign marker EXPGuard_test_marker through the source shown in
the finding, then observe whether it reaches the privileged sink.
```

#### Supporting material

- CoCo: source report `CoCo/chrome/flow-verification-results-no-duplicate.json`; static report `extensions/bcmoplgjpddohaelhnnodojbamdobbhc_1.1.0/static/static_report.json`; dynamic report `extensions/bcmoplgjpddohaelhnnodojbamdobbhc_1.1.0/dynamic/dynamic_report.json`.

### Finding 2: Cross-Site Request Forgery (CSRF) / Privileged Network Request

The Ground Truth record traces A page or sender able to reach the recorded message/event source from `WINDOW_MESSAGE_EVENT` (window.addEventListener(message)) in extension-content at L1:C202 -> L1:C213 to the privileged sink `FETCH_HEADERS` in background at L1:C40966 -> L1:C41117. The source scope is on pages matching `https://youtubetotranscript.com/*`. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-bc01860c30d300b3`
- Severity recorded by the analysis: **MEDIUM**
- Source: `WINDOW_MESSAGE_EVENT` (window.addEventListener(message)) in extension-content at L1:C202 -> L1:C213
- Sink: `FETCH_HEADERS` in background at L1:C40966 -> L1:C41117
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Analysis and validation

- Static (ExPGuard): verdict `FALSE_POSITIVE`, confidence 0.6; report `extensions/bcmoplgjpddohaelhnnodojbamdobbhc_1.1.0/static/static_report.json`.
- Dynamic (ExPGuard): `INCONCLUSIVE_AFTER_DEBUG` (basis `non_decisive`; evidence stage `LISTENER_READY`); the dynamic run did not establish a decisive runtime result; report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\chrome\extensions\bcmoplgjpddohaelhnnodojbamdobbhc_1.1.0\dynamic\dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `1.1.0` in a disposable chrome profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Use only a harmless marker in a disposable profile.
window.postMessage({ marker: "EXPGuard_test_marker" }, "*");
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/chrome/flow-verification-results-no-duplicate.json`; static report `extensions/bcmoplgjpddohaelhnnodojbamdobbhc_1.1.0/static/static_report.json`; dynamic report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\chrome\extensions\bcmoplgjpddohaelhnnodojbamdobbhc_1.1.0\dynamic\dynamic_report.json`.

### Finding 3: Storage Poisoning

The Ground Truth record traces A page or sender able to reach the recorded message/event source from `WINDOW_MESSAGE_EVENT` (window.addEventListener(message)) in extension-content at L1:C202 -> L1:C213 to the privileged sink `CHROME_LOCAL_STORAGE` (token) in extension-content at L1:C620 -> L1:C881. The source scope is on pages matching `https://youtubetotranscript.com/*`. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-f6ea37e92c0a7ba1`
- Severity recorded by the analysis: **MEDIUM**
- Source: `WINDOW_MESSAGE_EVENT` (window.addEventListener(message)) in extension-content at L1:C202 -> L1:C213
- Sink: `CHROME_LOCAL_STORAGE` (token) in extension-content at L1:C620 -> L1:C881
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Analysis and validation

- Static (ExPGuard): verdict `TRUE_POSITIVE`, confidence 0.6; report `extensions/bcmoplgjpddohaelhnnodojbamdobbhc_1.1.0/static/static_report.json`.
- Dynamic (ExPGuard): `INCONCLUSIVE_AFTER_DEBUG` (basis `non_decisive`; evidence stage `LISTENER_READY`); the dynamic run did not establish a decisive runtime result; report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\chrome\extensions\bcmoplgjpddohaelhnnodojbamdobbhc_1.1.0\dynamic\dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `1.1.0` in a disposable chrome profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Use only a harmless marker in a disposable profile.
window.postMessage({ marker: "EXPGuard_test_marker" }, "*");
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/chrome/flow-verification-results-no-duplicate.json`; static report `extensions/bcmoplgjpddohaelhnnodojbamdobbhc_1.1.0/static/static_report.json`; dynamic report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\chrome\extensions\bcmoplgjpddohaelhnnodojbamdobbhc_1.1.0\dynamic\dynamic_report.json`.


## Recommendations

1. Authenticate page-to-extension events at the privilege boundary; validate the sender and origin instead of trusting DOM event detail.
2. Validate the request schema and restrict destination URLs, methods, headers, and bodies before issuing privileged network requests.
3. Do not let page-controlled cookies or DOM values select extension-owned storage values; validate the expected value and keep credentials in extension-owned UI/state.
4. Treat storage writes as privileged state changes: use an allowlisted schema, reject attacker-controlled keys, and avoid merging untrusted objects into extension state.
5. Never return sensitive extension data to an untrusted page or external sender; enforce an explicit origin and sender allowlist.
6. Reduce host permissions and sensitive API access to the smallest scope required by the feature.

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
