# Security Vulnerability Report: Critical CSRF via Privileged Network Request in Pricedog - Amazon Price tracker & Cosmetic ingredients checker

## Summary

We are writing on behalf of a security research team from Nankai University and the University of Liverpool. Our Ground Truth review identified **3 Flow(s)** in **Pricedog - Amazon Price tracker & Cosmetic ingredients checker** (edge, extension ID `bkailheklfplleadbokdamfddbenifpf`, version `1.1.0`).
The recorded issue type(s): **CSRF via Privileged Network Request**.

## Affected Extension Details

- Name: Pricedog - Amazon Price tracker & Cosmetic ingredients checker
- Platform: edge
- Extension ID: `bkailheklfplleadbokdamfddbenifpf`
- Dataset version: `1.1.0`
- Store version at review: `1.1.0`
- Users: 182
- Analysis tools: ExPGuard

## Findings

### Finding 1: Cross-Site Request Forgery (CSRF) / Privileged Network Request

A script running on a page matching `<all_urls>` can dispatch the recorded DOM custom event and supply its `detail`. The content script forwards that event data to the extension runtime, and the service worker uses the supplied URL and form data in a privileged POST `fetch`. The report records no origin/authentication check at this bridge. This permits a matching page to initiate the recorded request; it does not by itself establish that third-party credentials are included.

- Ground Truth Flow: `gtf-70b801115e4e8890`
- Severity recorded by the analysis: **CRITICAL**
- Source: `TARGET_CUSTOM_EVENT` (target.addEventListener(PriceDogExt)) in contentLoader at L1:C819 -> L1:C827
- Sink: `FETCH_RESOURCE` ([Unknown URL]) in background at L1:C63260 -> L1:C63377
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Analysis and validation

- Dynamic (ExPGuard): `CONFIRMED` (basis `decisive`; evidence stage `MARKER_REACHED`); runtime reproduction recorded; report `D:\Ph0jav7\ExtensionSecurity\ExPGuard\dynamic-batch\after-fixes-edge-r5\summary.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install version `1.1.0` in a disposable edge profile and open any HTTP(S) page covered by the extension content script.
2. Start a local test server bound only to `127.0.0.1` that records POST requests, then run the payload below in that page's console.
3. Verify whether the local server receives the marker POST; do not substitute a third-party or internal-network URL.

#### Proof-of-concept payload

```js
// Replace EVENT_NAME and the documented field names with the handler's
// public event contract. Do not use real URLs, tokens, or credentials.
document.dispatchEvent(new CustomEvent("EVENT_NAME", {
  detail: { marker: "EXPGuard_test_marker" }
}));
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/edge/flow-verification-results-no-duplicate.json`; static report `not recorded`; dynamic report `D:\Ph0jav7\ExtensionSecurity\ExPGuard\dynamic-batch\after-fixes-edge-r5\summary.json`.

### Finding 2: Cross-Site Request Forgery (CSRF) / Privileged Network Request

A script running on a page matching `<all_urls>` can dispatch the recorded DOM custom event and supply its `detail`. The content script forwards that event data to the extension runtime, and the service worker uses the supplied URL and form data in a privileged POST `fetch`. The report records no origin/authentication check at this bridge. This permits a matching page to initiate the recorded request; it does not by itself establish that third-party credentials are included.

- Ground Truth Flow: `gtf-83b5e1526803067a`
- Severity recorded by the analysis: **CRITICAL**
- Source: `TARGET_CUSTOM_EVENT` (target.addEventListener(PriceDogExt)) in contentLoader at L1:C819 -> L1:C827
- Sink: `FETCH_RESOURCE` ([Unknown URL]) in background at L1:C64348 -> L1:C64383
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Analysis and validation

- Dynamic (ExPGuard): `CONFIRMED` (basis `decisive`; evidence stage `MARKER_REACHED`); runtime reproduction recorded; report `D:\Ph0jav7\ExtensionSecurity\ExPGuard\dynamic-batch\after-fixes-edge-r5\summary.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install version `1.1.0` in a disposable edge profile and open any HTTP(S) page covered by the extension content script.
2. Start a local test server bound only to `127.0.0.1` that records POST requests, then run the payload below in that page's console.
3. Verify whether the local server receives the marker POST; do not substitute a third-party or internal-network URL.

#### Proof-of-concept payload

```js
// Replace EVENT_NAME and the documented field names with the handler's
// public event contract. Do not use real URLs, tokens, or credentials.
document.dispatchEvent(new CustomEvent("EVENT_NAME", {
  detail: { marker: "EXPGuard_test_marker" }
}));
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/edge/flow-verification-results-no-duplicate.json`; static report `not recorded`; dynamic report `D:\Ph0jav7\ExtensionSecurity\ExPGuard\dynamic-batch\after-fixes-edge-r5\summary.json`.

### Finding 3: Cross-Site Request Forgery (CSRF) / Privileged Network Request

A script running on a page matching `<all_urls>` can dispatch the recorded DOM custom event and supply its `detail`. The content script forwards that event data to the extension runtime, and the service worker uses the supplied URL and form data in a privileged POST `fetch`. The report records no origin/authentication check at this bridge. This permits a matching page to initiate the recorded request; it does not by itself establish that third-party credentials are included.

- Ground Truth Flow: `gtf-94641a3ddf21ce8d`
- Severity recorded by the analysis: **CRITICAL**
- Source: `TARGET_CUSTOM_EVENT` (target.addEventListener(PriceDogExt)) in contentLoader at L1:C819 -> L1:C827
- Sink: `FETCH_RESOURCE` ([Unknown URL]) in background at L1:C61968 -> L1:C62052
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Analysis and validation

- Dynamic (ExPGuard): `CONFIRMED` (basis `decisive`; evidence stage `MARKER_REACHED`); runtime reproduction recorded; report `D:\Ph0jav7\ExtensionSecurity\ExPGuard\dynamic-batch\after-fixes-edge-r5\summary.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install version `1.1.0` in a disposable edge profile and open any HTTP(S) page covered by the extension content script.
2. Start a local test server bound only to `127.0.0.1` that records POST requests, then run the payload below in that page's console.
3. Verify whether the local server receives the marker POST; do not substitute a third-party or internal-network URL.

#### Proof-of-concept payload

```js
// Replace EVENT_NAME and the documented field names with the handler's
// public event contract. Do not use real URLs, tokens, or credentials.
document.dispatchEvent(new CustomEvent("EVENT_NAME", {
  detail: { marker: "EXPGuard_test_marker" }
}));
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/edge/flow-verification-results-no-duplicate.json`; static report `not recorded`; dynamic report `D:\Ph0jav7\ExtensionSecurity\ExPGuard\dynamic-batch\after-fixes-edge-r5\summary.json`.


## Recommendations

1. Authenticate page-to-extension events at the privilege boundary; validate the sender and origin instead of trusting DOM event detail.
2. Validate the request schema and restrict destination URLs, methods, headers, and bodies before issuing privileged network requests.
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
