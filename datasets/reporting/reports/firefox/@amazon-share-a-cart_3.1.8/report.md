# Security Vulnerability Report: High CSRF via Privileged Network Request and Unauthorized Tab/Window Control in Share-A-Cart for Amazon

## Summary

We are writing on behalf of a security research team from Nankai University and the University of Liverpool. Our Ground Truth review identified **2 Flow(s)** in **Share-A-Cart for Amazon** (firefox, extension ID `@amazon-share-a-cart`, version `3.1.8`).
The recorded issue type(s): **CSRF via Privileged Network Request; Unauthorized Tab/Window Control**.

## Affected Extension Details

- Name: Share-A-Cart for Amazon
- Platform: firefox
- Extension ID: `@amazon-share-a-cart`
- Dataset version: `3.1.8`
- Store version at review: `3.1.8`
- Users: 439
- Analysis tools: ExPGuard

## Findings

### Finding 1: Unauthorized Tab or Window Manipulation

The Ground Truth record traces A page or sender able to reach the recorded message/event source from `WINDOW_MESSAGE_EVENT` (window.addEventListener(message)) in js/sac at L1:C526 -> L1:C551 to the privileged sink `CHROME_TABS_CREATE_OPTIONS` in js/background at L2:C1407500 -> L2:C1407566. The source scope is on pages matching `https://*.share-a-cart.com/*`. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-2c5beb5dd4431367`
- Severity recorded by the analysis: **HIGH**
- Source: `WINDOW_MESSAGE_EVENT` (window.addEventListener(message)) in js/sac at L1:C526 -> L1:C551
- Sink: `CHROME_TABS_CREATE_OPTIONS` in js/background at L2:C1407500 -> L2:C1407566
- Tools reporting this Flow: ExPGuard

**Source code anchor (excerpt):**

```javascript
unction i(e,t,n){return t&&r(e.prototype,t),n&&r(e,n),Object.defi
```

**Sink code anchor (excerpt):**

```javascript
",vendor:y.id}})})):chrome.tabs.create({url:`${u.site}/receive/${t}?source=${p||""}`}).then(async e=>{awai
```

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Analysis and validation

- Dynamic: no structured dynamic-verification result is attached to this Flow in the Ground Truth dataset.
- Manual review: Ground Truth records `TP` — the dataset records manual confirmation that this Flow is reachable and produces its associated privileged effect.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `3.1.8` in a disposable firefox profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Use only a harmless marker in a disposable profile.
window.postMessage({ marker: "EXPGuard_test_marker" }, "*");
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/firefox/flow-verification-results-no-duplicate.json`; static report `not recorded`; dynamic report `not recorded`.

### Finding 2: Cross-Site Request Forgery (CSRF) / Privileged Network Request

The Ground Truth record traces A page or sender able to reach the recorded message/event source from `WINDOW_MESSAGE_EVENT` (window.addEventListener(message)) in js/sac at L1:C526 -> L1:C551 to the privileged sink `FETCH_RESOURCE` ([Unknown URL]) in js/background at L2:C1406971 -> L2:C1407012. The source scope is on pages matching `https://*.share-a-cart.com/*`. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-b90b1290eb3af111`
- Severity recorded by the analysis: **HIGH**
- Source: `WINDOW_MESSAGE_EVENT` (window.addEventListener(message)) in js/sac at L1:C526 -> L1:C551
- Sink: `FETCH_RESOURCE` ([Unknown URL]) in js/background at L2:C1406971 -> L2:C1407012
- Tools reporting this Flow: ExPGuard

**Source code anchor (excerpt):**

```javascript
unction i(e,t,n){return t&&r(e.prototype,t),n&&r(e,n),Object.defi
```

**Sink code anchor (excerpt):**

```javascript
/(GET|SHARE)\//,""),fetch(r.A.data.get+encodeURIComponent(t)).then(e=>e.json()).t
```

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Analysis and validation

- Static (ExPGuard): verdict `TRUE_POSITIVE`, confidence 0.6; report `extensions/@amazon-share-a-cart_3.1.8/static/static_report.json`.
- Dynamic (ExPGuard): `SINK_NOT_FIRED`; the recorded replay did not establish the complete source-to-sink effect; report `extensions/@amazon-share-a-cart_3.1.8/dynamic/dynamic_report.json`.
- Manual review: Ground Truth records `TP` — the dataset records manual confirmation that this Flow is reachable and produces its associated privileged effect.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `3.1.8` in a disposable firefox profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Use only a harmless marker in a disposable profile.
window.postMessage({ marker: "EXPGuard_test_marker" }, "*");
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/firefox/flow-verification-results-no-duplicate.json`; static report `extensions/@amazon-share-a-cart_3.1.8/static/static_report.json`; dynamic report `extensions/@amazon-share-a-cart_3.1.8/dynamic/dynamic_report.json`.


## Recommendations

1. Authenticate page-to-extension events at the privilege boundary; validate the sender and origin instead of trusting DOM event detail.
2. Validate the request schema and restrict destination URLs, methods, headers, and bodies before issuing privileged network requests.
3. Validate tab/window IDs and navigation targets, and require a user gesture for externally initiated changes.
4. Reduce host permissions and sensitive API access to the smallest scope required by the feature.

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
