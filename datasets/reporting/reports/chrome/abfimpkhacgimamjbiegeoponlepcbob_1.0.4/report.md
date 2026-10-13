# Security Vulnerability Report: Critical CSRF via Privileged Network Request and Extension Storage Poisoning in Seedr

## Summary

We are writing on behalf of a security research team from Nankai University and the University of Liverpool. Our Ground Truth review identified **3 Flow(s)** in **Seedr** (chrome, extension ID `abfimpkhacgimamjbiegeoponlepcbob`, version `1.0.4`).
The recorded issue type(s): **CSRF via Privileged Network Request; Extension Storage Poisoning**.

## Affected Extension Details

- Name: Seedr
- Platform: chrome
- Extension ID: `abfimpkhacgimamjbiegeoponlepcbob`
- Dataset version: `1.0.4`
- Store version at review: `1.0.4`
- Users: 60000
- Analysis tools: ExPGuard

## Findings

### Finding 1: Storage Poisoning

The Ground Truth record traces An external extension able to message this extension from `CHROME_ONMESSAGEEXTERNAL_MESSAGE` (chrome.runtime.onMessageExternal.addListener[message]) in background at L593:C26 -> L593:C33 to the privileged sink `CHROME_LOCAL_STORAGE` (access_token) in background at L21:C5 -> L28:C7. The source scope is in the recorded source context. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-8f7796ee3d2e8915`
- Severity recorded by the analysis: **HIGH**
- Source: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` (chrome.runtime.onMessageExternal.addListener[message]) in background at L593:C26 -> L593:C33
- Sink: `CHROME_LOCAL_STORAGE` (access_token) in background at L21:C5 -> L28:C7
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (EXTERNALLY_CONNECTABLE); sink grants capability beyond the source origin

#### Analysis and validation

- Static (ExPGuard): verdict `TRUE_POSITIVE`, confidence 0.6; report `extensions/abfimpkhacgimamjbiegeoponlepcbob_1.0.4/static/static_report.json`.
- Dynamic (ExPGuard): `CONFIRMED` (basis `runtime_reproduced`; evidence stage `MARKER_REACHED`); runtime reproduction recorded; report `extensions/abfimpkhacgimamjbiegeoponlepcbob_1.0.4/dynamic/dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `1.0.4` in a disposable chrome profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Use only a harmless marker in a disposable profile.
window.postMessage({ marker: "EXPGuard_test_marker" }, "*");
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/chrome/flow-verification-results-no-duplicate.json`; static report `extensions/abfimpkhacgimamjbiegeoponlepcbob_1.0.4/static/static_report.json`; dynamic report `extensions/abfimpkhacgimamjbiegeoponlepcbob_1.0.4/dynamic/dynamic_report.json`.

### Finding 2: Cross-Site Request Forgery (CSRF) / Privileged Network Request

The Ground Truth record traces A page or sender able to reach the recorded message/event source from `WINDOW_MESSAGE_EVENT` (window.addEventListener(message)) in content at L215:C9 -> L215:C23 to the privileged sink `FETCH_BODY` (https://www.seedr.cc/api/token) in background at L116:C29 -> L119:C8. The source scope is on pages matching `http://*/*, https://*/*`. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-e97f646c3c64948f`
- Severity recorded by the analysis: **CRITICAL**
- Source: `WINDOW_MESSAGE_EVENT` (window.addEventListener(message)) in content at L215:C9 -> L215:C23
- Sink: `FETCH_BODY` (https://www.seedr.cc/api/token) in background at L116:C29 -> L119:C8
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Analysis and validation

- Static (ExPGuard): verdict `PARTIAL`, confidence 0.7; report `extensions/abfimpkhacgimamjbiegeoponlepcbob_1.0.4/static/static_report.json`.
- Dynamic (ExPGuard): `INCONCLUSIVE_AFTER_DEBUG` (basis `inconclusive`; evidence stage `LISTENER_READY`); the recorded replay did not hit the exact sink; this run is inconclusive and is not a runtime confirmation; report `extensions/abfimpkhacgimamjbiegeoponlepcbob_1.0.4/dynamic/dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `1.0.4` in a disposable chrome profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Use only a harmless marker in a disposable profile.
window.postMessage({ marker: "EXPGuard_test_marker" }, "*");
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/chrome/flow-verification-results-no-duplicate.json`; static report `extensions/abfimpkhacgimamjbiegeoponlepcbob_1.0.4/static/static_report.json`; dynamic report `extensions/abfimpkhacgimamjbiegeoponlepcbob_1.0.4/dynamic/dynamic_report.json`.

### Finding 3: Storage Poisoning

The Ground Truth record traces An external extension able to message this extension from `CHROME_ONMESSAGEEXTERNAL_MESSAGE` (chrome.runtime.onMessageExternal.addListener[message]) in background at L598:C26 -> L598:C33 to the privileged sink `CHROME_LOCAL_STORAGE` (access_token) in background at L21:C5 -> L28:C7. The source scope is in the recorded source context. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-f6333cfb565f3be8`
- Severity recorded by the analysis: **HIGH**
- Source: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` (chrome.runtime.onMessageExternal.addListener[message]) in background at L598:C26 -> L598:C33
- Sink: `CHROME_LOCAL_STORAGE` (access_token) in background at L21:C5 -> L28:C7
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (EXTERNALLY_CONNECTABLE); sink grants capability beyond the source origin

#### Analysis and validation

- Static (ExPGuard): verdict `TRUE_POSITIVE`, confidence 0.6; report `extensions/abfimpkhacgimamjbiegeoponlepcbob_1.0.4/static/static_report.json`.
- Dynamic (ExPGuard): `CONFIRMED` (basis `runtime_reproduced`; evidence stage `MARKER_REACHED`); runtime reproduction recorded; report `extensions/abfimpkhacgimamjbiegeoponlepcbob_1.0.4/dynamic/dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `1.0.4` in a disposable chrome profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Use only a harmless marker in a disposable profile.
window.postMessage({ marker: "EXPGuard_test_marker" }, "*");
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/chrome/flow-verification-results-no-duplicate.json`; static report `extensions/abfimpkhacgimamjbiegeoponlepcbob_1.0.4/static/static_report.json`; dynamic report `extensions/abfimpkhacgimamjbiegeoponlepcbob_1.0.4/dynamic/dynamic_report.json`.


## Recommendations

1. Authenticate page-to-extension events at the privilege boundary; validate the sender and origin instead of trusting DOM event detail.
2. Validate the request schema and restrict destination URLs, methods, headers, and bodies before issuing privileged network requests.
3. Do not let page-controlled cookies or DOM values select extension-owned storage values; validate the expected value and keep credentials in extension-owned UI/state.
4. Treat storage writes as privileged state changes: use an allowlisted schema, reject attacker-controlled keys, and avoid merging untrusted objects into extension state.
5. Reduce host permissions and sensitive API access to the smallest scope required by the feature.

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
