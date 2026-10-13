# Security Vulnerability Report: High CSRF via Privileged Network Request and Extension Storage Poisoning in Check US Visa Slots - USVisaScheduling

## Summary

We are writing on behalf of a security research team from Nankai University and the University of Liverpool. Our Ground Truth review identified **5 Flow(s)** in **Check US Visa Slots - USVisaScheduling** (chrome, extension ID `beepaenfejnphdgnkmccjcfiieihhogl`, version `4.7.3`).
The recorded issue type(s): **CSRF via Privileged Network Request; Extension Storage Poisoning**.

## Affected Extension Details

- Name: Check US Visa Slots - USVisaScheduling
- Platform: chrome
- Extension ID: `beepaenfejnphdgnkmccjcfiieihhogl`
- Dataset version: `4.7.3`
- Store version at review: `4.7.3`
- Users: 80000
- Analysis tools: ExPGuard

## Findings

### Finding 1: Storage Poisoning

The Ground Truth record traces An external extension able to message this extension from `CHROME_ONMESSAGEEXTERNAL_MESSAGE` (From storage.local.set('apiKey') in js/sw) in js/sw at L1:C675 -> L1:C676 to the privileged sink `CHROME_LOCAL_STORAGE` (apiKey) in js/content at L1:C1005 -> L1:C1096. The source scope is in the recorded source context. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-0bffe21216d31ca9`
- Severity recorded by the analysis: **HIGH**
- Source: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` (From storage.local.set('apiKey') in js/sw) in js/sw at L1:C675 -> L1:C676
- Sink: `CHROME_LOCAL_STORAGE` (apiKey) in js/content at L1:C1005 -> L1:C1096
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (EXTERNALLY_CONNECTABLE); sink grants capability beyond the source origin

#### Analysis and validation

- Static (ExPGuard): verdict `TRUE_POSITIVE`, confidence 0.6; report `extensions/beepaenfejnphdgnkmccjcfiieihhogl_4.7.3/static/static_report.json`.
- Dynamic (ExPGuard): `TOOL_LIMITATION` (basis `inconclusive`; evidence stage `LISTENER_READY`); this result does not independently confirm execution at the sink; report `extensions/beepaenfejnphdgnkmccjcfiieihhogl_4.7.3/dynamic/dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `4.7.3` in a disposable chrome profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Use only a harmless marker in a disposable profile.
window.postMessage({ marker: "EXPGuard_test_marker" }, "*");
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/chrome/flow-verification-results-no-duplicate.json`; static report `extensions/beepaenfejnphdgnkmccjcfiieihhogl_4.7.3/static/static_report.json`; dynamic report `extensions/beepaenfejnphdgnkmccjcfiieihhogl_4.7.3/dynamic/dynamic_report.json`.

### Finding 2: Cross-Site Request Forgery (CSRF) / Privileged Network Request

The Ground Truth record traces An external extension able to message this extension from `CHROME_ONMESSAGEEXTERNAL_MESSAGE` (From storage.local.set('apiKey') in js/sw) in js/sw at L1:C675 -> L1:C676 to the privileged sink `FETCH_HEADERS` (https://app.checkvisaslots.com/push/v5) in js/sw at L1:C3133 -> L1:C3185. The source scope is in the recorded source context. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-31db47817106a33f`
- Severity recorded by the analysis: **HIGH**
- Source: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` (From storage.local.set('apiKey') in js/sw) in js/sw at L1:C675 -> L1:C676
- Sink: `FETCH_HEADERS` (https://app.checkvisaslots.com/push/v5) in js/sw at L1:C3133 -> L1:C3185
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (EXTERNALLY_CONNECTABLE); sink grants capability beyond the source origin

#### Analysis and validation

- Static (ExPGuard): verdict `TRUE_POSITIVE`, confidence 0.6; report `extensions/beepaenfejnphdgnkmccjcfiieihhogl_4.7.3/static/static_report.json`.
- Dynamic (ExPGuard): `DEFERRED_COMPANION_EXTENSION` (basis `inconclusive`; evidence stage `ENVIRONMENT_READY`); this result does not independently confirm execution at the sink; report `extensions/beepaenfejnphdgnkmccjcfiieihhogl_4.7.3/dynamic/dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `4.7.3` in a disposable chrome profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Use only a harmless marker in a disposable profile.
window.postMessage({ marker: "EXPGuard_test_marker" }, "*");
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/chrome/flow-verification-results-no-duplicate.json`; static report `extensions/beepaenfejnphdgnkmccjcfiieihhogl_4.7.3/static/static_report.json`; dynamic report `extensions/beepaenfejnphdgnkmccjcfiieihhogl_4.7.3/dynamic/dynamic_report.json`.

### Finding 3: Storage Poisoning

The Ground Truth record traces An external extension able to message this extension from `CHROME_ONMESSAGEEXTERNAL_MESSAGE` (chrome.runtime.onMessageExternal.addListener[message]) in js/sw at L1:C675 -> L1:C676 to the privileged sink `CHROME_LOCAL_STORAGE` (apiKey) in js/sw at L1:C772 -> L1:C815. The source scope is in the recorded source context. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-93aa9a21920d39ea`
- Severity recorded by the analysis: **HIGH**
- Source: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` (chrome.runtime.onMessageExternal.addListener[message]) in js/sw at L1:C675 -> L1:C676
- Sink: `CHROME_LOCAL_STORAGE` (apiKey) in js/sw at L1:C772 -> L1:C815
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (EXTERNALLY_CONNECTABLE); sink grants capability beyond the source origin

#### Analysis and validation

- Static (ExPGuard): verdict `TRUE_POSITIVE`, confidence 0.6; report `extensions/beepaenfejnphdgnkmccjcfiieihhogl_4.7.3/static/static_report.json`.
- Dynamic (ExPGuard): `INCONCLUSIVE_AFTER_DEBUG` (basis `inconclusive`; evidence stage `LISTENER_READY`); the dynamic run did not establish a decisive runtime result; report `extensions/beepaenfejnphdgnkmccjcfiieihhogl_4.7.3/dynamic/dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `4.7.3` in a disposable chrome profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Use only a harmless marker in a disposable profile.
window.postMessage({ marker: "EXPGuard_test_marker" }, "*");
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/chrome/flow-verification-results-no-duplicate.json`; static report `extensions/beepaenfejnphdgnkmccjcfiieihhogl_4.7.3/static/static_report.json`; dynamic report `extensions/beepaenfejnphdgnkmccjcfiieihhogl_4.7.3/dynamic/dynamic_report.json`.

### Finding 4: Cross-Site Request Forgery (CSRF) / Privileged Network Request

The Ground Truth record traces An external extension able to message this extension from `CHROME_ONMESSAGEEXTERNAL_MESSAGE` (From storage.local.set('apiKey') in js/sw) in js/sw at L1:C675 -> L1:C676 to the privileged sink `FETCH_HEADERS` (https://app.checkvisaslots.com/slots/v3) in js/popup at L1:C10039 -> L1:C10089. The source scope is in the recorded source context. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-94deb20ff4ae35e3`
- Severity recorded by the analysis: **HIGH**
- Source: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` (From storage.local.set('apiKey') in js/sw) in js/sw at L1:C675 -> L1:C676
- Sink: `FETCH_HEADERS` (https://app.checkvisaslots.com/slots/v3) in js/popup at L1:C10039 -> L1:C10089
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (EXTERNALLY_CONNECTABLE); sink grants capability beyond the source origin

#### Analysis and validation

- Static (ExPGuard): verdict `TRUE_POSITIVE`, confidence 0.6; report `extensions/beepaenfejnphdgnkmccjcfiieihhogl_4.7.3/static/static_report.json`.
- Dynamic (ExPGuard): `DEFERRED_COMPANION_EXTENSION` (basis `inconclusive`; evidence stage `ENVIRONMENT_READY`); this result does not independently confirm execution at the sink; report `extensions/beepaenfejnphdgnkmccjcfiieihhogl_4.7.3/dynamic/dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `4.7.3` in a disposable chrome profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Use only a harmless marker in a disposable profile.
window.postMessage({ marker: "EXPGuard_test_marker" }, "*");
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/chrome/flow-verification-results-no-duplicate.json`; static report `extensions/beepaenfejnphdgnkmccjcfiieihhogl_4.7.3/static/static_report.json`; dynamic report `extensions/beepaenfejnphdgnkmccjcfiieihhogl_4.7.3/dynamic/dynamic_report.json`.

### Finding 5: Cross-Site Request Forgery (CSRF) / Privileged Network Request

The Ground Truth record traces A page or sender able to reach the recorded message/event source from `WINDOW_CUSTOM_EVENT` (window.addEventListener(vSCP)) in js/content at L1:C7042 -> L1:C7050 to the privileged sink `FETCH_BODY` (https://app.checkvisaslots.com/push/v5) in js/sw at L1:C3133 -> L1:C3185. The source scope is on pages matching `https://*.usvisascheduling.com/*/*, https://atlasauth.b2clogin.com/*`. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-fa445a2803f3c975`
- Severity recorded by the analysis: **HIGH**
- Source: `WINDOW_CUSTOM_EVENT` (window.addEventListener(vSCP)) in js/content at L1:C7042 -> L1:C7050
- Sink: `FETCH_BODY` (https://app.checkvisaslots.com/push/v5) in js/sw at L1:C3133 -> L1:C3185
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Analysis and validation

- Static (ExPGuard): verdict `TRUE_POSITIVE`, confidence 0.6; report `extensions/beepaenfejnphdgnkmccjcfiieihhogl_4.7.3/static/static_report.json`.
- Dynamic (ExPGuard): `TOOL_LIMITATION` (basis `inconclusive`; evidence stage `BLOCKED`); this result does not independently confirm execution at the sink; report `extensions/beepaenfejnphdgnkmccjcfiieihhogl_4.7.3/dynamic/dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `4.7.3` in a disposable chrome profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Replace EVENT_NAME and the documented field names with the handler's
// public event contract. Do not use real URLs, tokens, or credentials.
document.dispatchEvent(new CustomEvent("EVENT_NAME", {
  detail: { marker: "EXPGuard_test_marker" }
}));
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/chrome/flow-verification-results-no-duplicate.json`; static report `extensions/beepaenfejnphdgnkmccjcfiieihhogl_4.7.3/static/static_report.json`; dynamic report `extensions/beepaenfejnphdgnkmccjcfiieihhogl_4.7.3/dynamic/dynamic_report.json`.


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
