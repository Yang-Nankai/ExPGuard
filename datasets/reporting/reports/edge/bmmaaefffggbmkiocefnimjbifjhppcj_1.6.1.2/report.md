# Security Vulnerability Report: High CSRF via Privileged Network Request and Unauthorized Tab/Window Control in 云神价-购物点点

## Summary

We are writing on behalf of a security research team from Nankai University and the University of Liverpool. Our Ground Truth review identified **13 Flow(s)** in **云神价-购物点点** (edge, extension ID `bmmaaefffggbmkiocefnimjbifjhppcj`, version `1.6.1.2`).
The recorded issue type(s): **CSRF via Privileged Network Request; Unauthorized Tab/Window Control**.

The store currently reports version `1.6.2.0`. The update revalidation is summarized per tool below. This report covers only the original Flow(s); newly introduced Flow(s) are out of scope. Any mixed result, tool failure, or incomplete automated run is called out explicitly and should not be read as a final remediation determination.

## Affected Extension Details

- Name: 云神价-购物点点
- Platform: edge
- Extension ID: `bmmaaefffggbmkiocefnimjbifjhppcj`
- Dataset version: `1.6.1.2`
- Store version at review: `1.6.2.0`
- Users: 3051
- Analysis tools: ExPGuard

## Findings

### Finding 1: Cross-Site Request Forgery (CSRF) / Privileged Network Request

A script running on a page matching `*://item.jd.com/*, *://ic-item.jd.com/*, *://npcitem.jd.hk/*, *://item.jingdonghealth.cn/*, *://search.jd.com/*, *://list.jd.com/*, *://list.jd.hk/*, *://*.jd.com/list*, *://order.jd.com/*` can dispatch the recorded DOM custom event and supply its `detail`. The content script forwards that event data to the extension runtime, and the service worker uses the supplied URL and form data in a privileged POST `fetch`. The report records no origin/authentication check at this bridge. This permits a matching page to initiate the recorded request; it does not by itself establish that third-party credentials are included.

- Ground Truth Flow: `gtf-0a64c989d9019b94`
- Severity recorded by the analysis: **HIGH**
- Source: `WINDOW_CUSTOM_EVENT` (window.addEventListener(jd_item_res)) in js/shops/jd at L287:C450 -> L287:C458
- Sink: `FETCH_RESOURCE` ([Unknown URL]) in js/background at L16:C183 -> L16:C395
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Updated-version tool result

- ExPGuard: `still_detected`; original source `WINDOW_CUSTOM_EVENT` → sink `FETCH_RESOURCE`; candidate matches: 11

#### Analysis and validation

- Dynamic (ExPGuard): `INCONCLUSIVE_AFTER_DEBUG` (basis `non_decisive`; evidence stage `LISTENER_READY`); the dynamic run did not establish a decisive runtime result; report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\edge\extensions\bmmaaefffggbmkiocefnimjbifjhppcj_1.6.1.2\dynamic\dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install version `1.6.1.2` in a disposable edge profile and open any HTTP(S) page covered by the extension content script.
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

- ExPGuard: source report `ExPGuard-Opti/edge/flow-verification-results-no-duplicate.json`; static report `not recorded`; dynamic report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\edge\extensions\bmmaaefffggbmkiocefnimjbifjhppcj_1.6.1.2\dynamic\dynamic_report.json`.

### Finding 2: Unauthorized Tab or Window Manipulation

The Ground Truth record traces A page or sender able to reach the recorded message/event source from `WINDOW_CUSTOM_EVENT` (window.addEventListener(jd_item_ic_res)) in js/shops/jd at L289:C107 -> L289:C115 to the privileged sink `CHROME_TABS_CREATE_OPTIONS` in js/background at L17:C324 -> L17:C355. The source scope is on pages matching `*://item.jd.com/*, *://ic-item.jd.com/*, *://npcitem.jd.hk/*, *://item.jingdonghealth.cn/*, *://search.jd.com/*, *://list.jd.com/*, *://list.jd.hk/*, *://*.jd.com/list*, *://order.jd.com/*`. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-0f28b6c17700e3cd`
- Severity recorded by the analysis: **HIGH**
- Source: `WINDOW_CUSTOM_EVENT` (window.addEventListener(jd_item_ic_res)) in js/shops/jd at L289:C107 -> L289:C115
- Sink: `CHROME_TABS_CREATE_OPTIONS` in js/background at L17:C324 -> L17:C355
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Updated-version tool result

- ExPGuard: `still_detected`; original source `WINDOW_CUSTOM_EVENT` → sink `CHROME_TABS_CREATE_OPTIONS`; candidate matches: 1

#### Analysis and validation

- Dynamic (ExPGuard): `PARTIAL` (basis `non_decisive`; evidence stage `SINK_REACHED`); the recorded replay did not establish the complete source-to-sink effect; report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\edge\extensions\bmmaaefffggbmkiocefnimjbifjhppcj_1.6.1.2\dynamic\dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `1.6.1.2` in a disposable edge profile.
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

- ExPGuard: source report `ExPGuard-Opti/edge/flow-verification-results-no-duplicate.json`; static report `not recorded`; dynamic report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\edge\extensions\bmmaaefffggbmkiocefnimjbifjhppcj_1.6.1.2\dynamic\dynamic_report.json`.

### Finding 3: Cross-Site Request Forgery (CSRF) / Privileged Network Request

A script running on a page matching `*://item.jd.com/*, *://ic-item.jd.com/*, *://npcitem.jd.hk/*, *://item.jingdonghealth.cn/*, *://search.jd.com/*, *://list.jd.com/*, *://list.jd.hk/*, *://*.jd.com/list*, *://order.jd.com/*` can dispatch the recorded DOM custom event and supply its `detail`. The content script forwards that event data to the extension runtime, and the service worker uses the supplied URL and form data in a privileged POST `fetch`. The report records no origin/authentication check at this bridge. This permits a matching page to initiate the recorded request; it does not by itself establish that third-party credentials are included.

- Ground Truth Flow: `gtf-1447f608e3bfd17d`
- Severity recorded by the analysis: **HIGH**
- Source: `WINDOW_CUSTOM_EVENT` (window.addEventListener(jd_item_ic_res)) in js/shops/jd at L289:C107 -> L289:C115
- Sink: `FETCH_RESOURCE` ([Unknown URL]) in js/background at L33:C33 -> L33:C247
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Updated-version tool result

- ExPGuard: `still_detected`; original source `WINDOW_CUSTOM_EVENT` → sink `FETCH_RESOURCE`; candidate matches: 11

#### Analysis and validation

- Dynamic (ExPGuard): `INCONCLUSIVE_AFTER_DEBUG` (basis `non_decisive`; evidence stage `LISTENER_READY`); the dynamic run did not establish a decisive runtime result; report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\edge\extensions\bmmaaefffggbmkiocefnimjbifjhppcj_1.6.1.2\dynamic\dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install version `1.6.1.2` in a disposable edge profile and open any HTTP(S) page covered by the extension content script.
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

- ExPGuard: source report `ExPGuard-Opti/edge/flow-verification-results-no-duplicate.json`; static report `not recorded`; dynamic report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\edge\extensions\bmmaaefffggbmkiocefnimjbifjhppcj_1.6.1.2\dynamic\dynamic_report.json`.

### Finding 4: Cross-Site Request Forgery (CSRF) / Privileged Network Request

A script running on a page matching `*://item.jd.com/*, *://ic-item.jd.com/*, *://npcitem.jd.hk/*, *://item.jingdonghealth.cn/*, *://search.jd.com/*, *://list.jd.com/*, *://list.jd.hk/*, *://*.jd.com/list*, *://order.jd.com/*` can dispatch the recorded DOM custom event and supply its `detail`. The content script forwards that event data to the extension runtime, and the service worker uses the supplied URL and form data in a privileged POST `fetch`. The report records no origin/authentication check at this bridge. This permits a matching page to initiate the recorded request; it does not by itself establish that third-party credentials are included.

- Ground Truth Flow: `gtf-3212dd25287c682b`
- Severity recorded by the analysis: **HIGH**
- Source: `WINDOW_CUSTOM_EVENT` (window.addEventListener(jd_item_ic_res)) in js/shops/jd at L289:C107 -> L289:C115
- Sink: `FETCH_RESOURCE` ([Unknown URL]) in js/background at L16:C183 -> L16:C395
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Updated-version tool result

- ExPGuard: `still_detected`; original source `WINDOW_CUSTOM_EVENT` → sink `FETCH_RESOURCE`; candidate matches: 11

#### Analysis and validation

- Dynamic (ExPGuard): `INCONCLUSIVE_AFTER_DEBUG` (basis `non_decisive`; evidence stage `LISTENER_READY`); the dynamic run did not establish a decisive runtime result; report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\edge\extensions\bmmaaefffggbmkiocefnimjbifjhppcj_1.6.1.2\dynamic\dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install version `1.6.1.2` in a disposable edge profile and open any HTTP(S) page covered by the extension content script.
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

- ExPGuard: source report `ExPGuard-Opti/edge/flow-verification-results-no-duplicate.json`; static report `not recorded`; dynamic report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\edge\extensions\bmmaaefffggbmkiocefnimjbifjhppcj_1.6.1.2\dynamic\dynamic_report.json`.

### Finding 5: Cross-Site Request Forgery (CSRF) / Privileged Network Request

A script running on a page matching `*://item.jd.com/*, *://ic-item.jd.com/*, *://npcitem.jd.hk/*, *://item.jingdonghealth.cn/*, *://search.jd.com/*, *://list.jd.com/*, *://list.jd.hk/*, *://*.jd.com/list*, *://order.jd.com/*` can dispatch the recorded DOM custom event and supply its `detail`. The content script forwards that event data to the extension runtime, and the service worker uses the supplied URL and form data in a privileged POST `fetch`. The report records no origin/authentication check at this bridge. This permits a matching page to initiate the recorded request; it does not by itself establish that third-party credentials are included.

- Ground Truth Flow: `gtf-43077b5c98a31614`
- Severity recorded by the analysis: **HIGH**
- Source: `WINDOW_CUSTOM_EVENT` (window.addEventListener(jd_item_ic_res)) in js/shops/jd at L289:C107 -> L289:C115
- Sink: `FETCH_RESOURCE` ([Unknown URL]) in js/background at L18:C372 -> L19:C23
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Updated-version tool result

- ExPGuard: `still_detected`; original source `WINDOW_CUSTOM_EVENT` → sink `FETCH_RESOURCE`; candidate matches: 11

#### Analysis and validation

- Dynamic (ExPGuard): `INCONCLUSIVE_AFTER_DEBUG` (basis `non_decisive`; evidence stage `LISTENER_READY`); the dynamic run did not establish a decisive runtime result; report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\edge\extensions\bmmaaefffggbmkiocefnimjbifjhppcj_1.6.1.2\dynamic\dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install version `1.6.1.2` in a disposable edge profile and open any HTTP(S) page covered by the extension content script.
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

- ExPGuard: source report `ExPGuard-Opti/edge/flow-verification-results-no-duplicate.json`; static report `not recorded`; dynamic report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\edge\extensions\bmmaaefffggbmkiocefnimjbifjhppcj_1.6.1.2\dynamic\dynamic_report.json`.

### Finding 6: Cross-Site Request Forgery (CSRF) / Privileged Network Request

A script running on a page matching `*://item.jd.com/*, *://ic-item.jd.com/*, *://npcitem.jd.hk/*, *://item.jingdonghealth.cn/*, *://search.jd.com/*, *://list.jd.com/*, *://list.jd.hk/*, *://*.jd.com/list*, *://order.jd.com/*` can dispatch the recorded DOM custom event and supply its `detail`. The content script forwards that event data to the extension runtime, and the service worker uses the supplied URL and form data in a privileged POST `fetch`. The report records no origin/authentication check at this bridge. This permits a matching page to initiate the recorded request; it does not by itself establish that third-party credentials are included.

- Ground Truth Flow: `gtf-4536af1053072fa7`
- Severity recorded by the analysis: **HIGH**
- Source: `WINDOW_CUSTOM_EVENT` (window.addEventListener(jd_item_res)) in js/shops/jd at L287:C450 -> L287:C458
- Sink: `FETCH_RESOURCE` ([Unknown URL]) in js/background at L25:C197 -> L25:C245
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Updated-version tool result

- ExPGuard: `still_detected`; original source `WINDOW_CUSTOM_EVENT` → sink `FETCH_RESOURCE`; candidate matches: 11

#### Analysis and validation

- Static (ExPGuard): verdict `FALSE_POSITIVE`, confidence 0.6; report `extensions/bmmaaefffggbmkiocefnimjbifjhppcj_1.6.1.2/static/static_report.json`.
- Dynamic (ExPGuard): `INCONCLUSIVE_AFTER_DEBUG` (basis `non_decisive`; evidence stage `LISTENER_READY`); the dynamic run did not establish a decisive runtime result; report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\edge\extensions\bmmaaefffggbmkiocefnimjbifjhppcj_1.6.1.2\dynamic\dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install version `1.6.1.2` in a disposable edge profile and open any HTTP(S) page covered by the extension content script.
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

- ExPGuard: source report `ExPGuard-Opti/edge/flow-verification-results-no-duplicate.json`; static report `extensions/bmmaaefffggbmkiocefnimjbifjhppcj_1.6.1.2/static/static_report.json`; dynamic report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\edge\extensions\bmmaaefffggbmkiocefnimjbifjhppcj_1.6.1.2\dynamic\dynamic_report.json`.

### Finding 7: Cross-Site Request Forgery (CSRF) / Privileged Network Request

A script running on a page matching `*://item.jd.com/*, *://ic-item.jd.com/*, *://npcitem.jd.hk/*, *://item.jingdonghealth.cn/*, *://search.jd.com/*, *://list.jd.com/*, *://list.jd.hk/*, *://*.jd.com/list*, *://order.jd.com/*` can dispatch the recorded DOM custom event and supply its `detail`. The content script forwards that event data to the extension runtime, and the service worker uses the supplied URL and form data in a privileged POST `fetch`. The report records no origin/authentication check at this bridge. This permits a matching page to initiate the recorded request; it does not by itself establish that third-party credentials are included.

- Ground Truth Flow: `gtf-479d443f66d4b676`
- Severity recorded by the analysis: **HIGH**
- Source: `WINDOW_CUSTOM_EVENT` (window.addEventListener(jd_item_ic_res)) in js/shops/jd at L289:C107 -> L289:C115
- Sink: `FETCH_RESOURCE` ([Unknown URL]) in js/background at L25:C197 -> L25:C245
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Updated-version tool result

- ExPGuard: `still_detected`; original source `WINDOW_CUSTOM_EVENT` → sink `FETCH_RESOURCE`; candidate matches: 11

#### Analysis and validation

- Dynamic (ExPGuard): `INCONCLUSIVE_AFTER_DEBUG` (basis `non_decisive`; evidence stage `LISTENER_READY`); the dynamic run did not establish a decisive runtime result; report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\edge\extensions\bmmaaefffggbmkiocefnimjbifjhppcj_1.6.1.2\dynamic\dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install version `1.6.1.2` in a disposable edge profile and open any HTTP(S) page covered by the extension content script.
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

- ExPGuard: source report `ExPGuard-Opti/edge/flow-verification-results-no-duplicate.json`; static report `not recorded`; dynamic report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\edge\extensions\bmmaaefffggbmkiocefnimjbifjhppcj_1.6.1.2\dynamic\dynamic_report.json`.

### Finding 8: Cross-Site Request Forgery (CSRF) / Privileged Network Request

A script running on a page matching `*://item.jd.com/*, *://ic-item.jd.com/*, *://npcitem.jd.hk/*, *://item.jingdonghealth.cn/*, *://search.jd.com/*, *://list.jd.com/*, *://list.jd.hk/*, *://*.jd.com/list*, *://order.jd.com/*` can dispatch the recorded DOM custom event and supply its `detail`. The content script forwards that event data to the extension runtime, and the service worker uses the supplied URL and form data in a privileged POST `fetch`. The report records no origin/authentication check at this bridge. This permits a matching page to initiate the recorded request; it does not by itself establish that third-party credentials are included.

- Ground Truth Flow: `gtf-4e18dc2792e94163`
- Severity recorded by the analysis: **HIGH**
- Source: `WINDOW_CUSTOM_EVENT` (window.addEventListener(jd_item_ic_res)) in js/shops/jd at L289:C107 -> L289:C115
- Sink: `FETCH_RESOURCE` ([Unknown URL]) in js/background at L19:C170 -> L19:C345
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Updated-version tool result

- ExPGuard: `still_detected`; original source `WINDOW_CUSTOM_EVENT` → sink `FETCH_RESOURCE`; candidate matches: 11

#### Analysis and validation

- Dynamic (ExPGuard): `INCONCLUSIVE_AFTER_DEBUG` (basis `non_decisive`; evidence stage `LISTENER_READY`); the dynamic run did not establish a decisive runtime result; report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\edge\extensions\bmmaaefffggbmkiocefnimjbifjhppcj_1.6.1.2\dynamic\dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install version `1.6.1.2` in a disposable edge profile and open any HTTP(S) page covered by the extension content script.
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

- ExPGuard: source report `ExPGuard-Opti/edge/flow-verification-results-no-duplicate.json`; static report `not recorded`; dynamic report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\edge\extensions\bmmaaefffggbmkiocefnimjbifjhppcj_1.6.1.2\dynamic\dynamic_report.json`.

### Finding 9: Unauthorized Tab or Window Manipulation

The Ground Truth record traces A page or sender able to reach the recorded message/event source from `WINDOW_CUSTOM_EVENT` (window.addEventListener(jd_item_ic_res)) in js/shops/jd at L289:C107 -> L289:C115 to the privileged sink `CHROME_WINDOWS_CREATE_OPTIONS` in js/background at L26:C289 -> L26:C463. The source scope is on pages matching `*://item.jd.com/*, *://ic-item.jd.com/*, *://npcitem.jd.hk/*, *://item.jingdonghealth.cn/*, *://search.jd.com/*, *://list.jd.com/*, *://list.jd.hk/*, *://*.jd.com/list*, *://order.jd.com/*`. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-69bed103574edb4f`
- Severity recorded by the analysis: **HIGH**
- Source: `WINDOW_CUSTOM_EVENT` (window.addEventListener(jd_item_ic_res)) in js/shops/jd at L289:C107 -> L289:C115
- Sink: `CHROME_WINDOWS_CREATE_OPTIONS` in js/background at L26:C289 -> L26:C463
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Updated-version tool result

- ExPGuard: `still_detected`; original source `WINDOW_CUSTOM_EVENT` → sink `CHROME_WINDOWS_CREATE_OPTIONS`; candidate matches: 1

#### Analysis and validation

- Static (ExPGuard): verdict `FALSE_POSITIVE`, confidence 0.6; report `extensions/bmmaaefffggbmkiocefnimjbifjhppcj_1.6.1.2/static/static_report.json`.
- Dynamic (ExPGuard): `PARTIAL` (basis `non_decisive`; evidence stage `SINK_REACHED`); the recorded replay did not establish the complete source-to-sink effect; report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\edge\extensions\bmmaaefffggbmkiocefnimjbifjhppcj_1.6.1.2\dynamic\dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `1.6.1.2` in a disposable edge profile.
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

- ExPGuard: source report `ExPGuard-Opti/edge/flow-verification-results-no-duplicate.json`; static report `extensions/bmmaaefffggbmkiocefnimjbifjhppcj_1.6.1.2/static/static_report.json`; dynamic report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\edge\extensions\bmmaaefffggbmkiocefnimjbifjhppcj_1.6.1.2\dynamic\dynamic_report.json`.

### Finding 10: Cross-Site Request Forgery (CSRF) / Privileged Network Request

A script running on a page matching `*://item.jd.com/*, *://ic-item.jd.com/*, *://npcitem.jd.hk/*, *://item.jingdonghealth.cn/*, *://search.jd.com/*, *://list.jd.com/*, *://list.jd.hk/*, *://*.jd.com/list*, *://order.jd.com/*` can dispatch the recorded DOM custom event and supply its `detail`. The content script forwards that event data to the extension runtime, and the service worker uses the supplied URL and form data in a privileged POST `fetch`. The report records no origin/authentication check at this bridge. This permits a matching page to initiate the recorded request; it does not by itself establish that third-party credentials are included.

- Ground Truth Flow: `gtf-6acbc6e4723f7cbb`
- Severity recorded by the analysis: **HIGH**
- Source: `WINDOW_CUSTOM_EVENT` (window.addEventListener(jd_item_ic_res)) in js/shops/jd at L289:C107 -> L289:C115
- Sink: `FETCH_RESOURCE` ([Unknown URL]) in js/background at L27:C411 -> L27:C459
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Updated-version tool result

- ExPGuard: `still_detected`; original source `WINDOW_CUSTOM_EVENT` → sink `FETCH_RESOURCE`; candidate matches: 11

#### Analysis and validation

- Dynamic (ExPGuard): `INCONCLUSIVE_AFTER_DEBUG` (basis `non_decisive`; evidence stage `LISTENER_READY`); the dynamic run did not establish a decisive runtime result; report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\edge\extensions\bmmaaefffggbmkiocefnimjbifjhppcj_1.6.1.2\dynamic\dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install version `1.6.1.2` in a disposable edge profile and open any HTTP(S) page covered by the extension content script.
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

- ExPGuard: source report `ExPGuard-Opti/edge/flow-verification-results-no-duplicate.json`; static report `not recorded`; dynamic report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\edge\extensions\bmmaaefffggbmkiocefnimjbifjhppcj_1.6.1.2\dynamic\dynamic_report.json`.

### Finding 11: Cross-Site Request Forgery (CSRF) / Privileged Network Request

A script running on a page matching `*://item.jd.com/*, *://ic-item.jd.com/*, *://npcitem.jd.hk/*, *://item.jingdonghealth.cn/*, *://search.jd.com/*, *://list.jd.com/*, *://list.jd.hk/*, *://*.jd.com/list*, *://order.jd.com/*` can dispatch the recorded DOM custom event and supply its `detail`. The content script forwards that event data to the extension runtime, and the service worker uses the supplied URL and form data in a privileged POST `fetch`. The report records no origin/authentication check at this bridge. This permits a matching page to initiate the recorded request; it does not by itself establish that third-party credentials are included.

- Ground Truth Flow: `gtf-721db87f2f74790f`
- Severity recorded by the analysis: **HIGH**
- Source: `WINDOW_CUSTOM_EVENT` (window.addEventListener(<dynamic>)) in js/shops/jd at L233:C58 -> L233:C66
- Sink: `FETCH_RESOURCE` ([Unknown URL]) in js/background at L25:C197 -> L25:C245
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Updated-version tool result

- ExPGuard: `still_detected`; original source `WINDOW_CUSTOM_EVENT` → sink `FETCH_RESOURCE`; candidate matches: 11

#### Analysis and validation

- Dynamic (ExPGuard): `INCONCLUSIVE_AFTER_DEBUG` (basis `non_decisive`; evidence stage `LISTENER_READY`); the dynamic run did not establish a decisive runtime result; report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\edge\extensions\bmmaaefffggbmkiocefnimjbifjhppcj_1.6.1.2\dynamic\dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install version `1.6.1.2` in a disposable edge profile and open any HTTP(S) page covered by the extension content script.
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

- ExPGuard: source report `ExPGuard-Opti/edge/flow-verification-results-no-duplicate.json`; static report `not recorded`; dynamic report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\edge\extensions\bmmaaefffggbmkiocefnimjbifjhppcj_1.6.1.2\dynamic\dynamic_report.json`.

### Finding 12: Cross-Site Request Forgery (CSRF) / Privileged Network Request

A script running on a page matching `*://item.jd.com/*, *://ic-item.jd.com/*, *://npcitem.jd.hk/*, *://item.jingdonghealth.cn/*, *://search.jd.com/*, *://list.jd.com/*, *://list.jd.hk/*, *://*.jd.com/list*, *://order.jd.com/*` can dispatch the recorded DOM custom event and supply its `detail`. The content script forwards that event data to the extension runtime, and the service worker uses the supplied URL and form data in a privileged POST `fetch`. The report records no origin/authentication check at this bridge. This permits a matching page to initiate the recorded request; it does not by itself establish that third-party credentials are included.

- Ground Truth Flow: `gtf-eac88503349ad99e`
- Severity recorded by the analysis: **HIGH**
- Source: `WINDOW_CUSTOM_EVENT` (window.addEventListener(jd_item_ic_res)) in js/shops/jd at L289:C107 -> L289:C115
- Sink: `FETCH_RESOURCE` ([Unknown URL]) in js/background at L20:C148 -> L20:C324
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Updated-version tool result

- ExPGuard: `still_detected`; original source `WINDOW_CUSTOM_EVENT` → sink `FETCH_RESOURCE`; candidate matches: 11

#### Analysis and validation

- Dynamic (ExPGuard): `INCONCLUSIVE_AFTER_DEBUG` (basis `non_decisive`; evidence stage `LISTENER_READY`); the dynamic run did not establish a decisive runtime result; report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\edge\extensions\bmmaaefffggbmkiocefnimjbifjhppcj_1.6.1.2\dynamic\dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install version `1.6.1.2` in a disposable edge profile and open any HTTP(S) page covered by the extension content script.
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

- ExPGuard: source report `ExPGuard-Opti/edge/flow-verification-results-no-duplicate.json`; static report `not recorded`; dynamic report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\edge\extensions\bmmaaefffggbmkiocefnimjbifjhppcj_1.6.1.2\dynamic\dynamic_report.json`.

### Finding 13: Cross-Site Request Forgery (CSRF) / Privileged Network Request

A script running on a page matching `*://item.jd.com/*, *://ic-item.jd.com/*, *://npcitem.jd.hk/*, *://item.jingdonghealth.cn/*, *://search.jd.com/*, *://list.jd.com/*, *://list.jd.hk/*, *://*.jd.com/list*, *://order.jd.com/*` can dispatch the recorded DOM custom event and supply its `detail`. The content script forwards that event data to the extension runtime, and the service worker uses the supplied URL and form data in a privileged POST `fetch`. The report records no origin/authentication check at this bridge. This permits a matching page to initiate the recorded request; it does not by itself establish that third-party credentials are included.

- Ground Truth Flow: `gtf-fe08b17a9cc3f632`
- Severity recorded by the analysis: **HIGH**
- Source: `WINDOW_CUSTOM_EVENT` (window.addEventListener(jd_item_res)) in js/shops/jd at L287:C450 -> L287:C458
- Sink: `FETCH_RESOURCE` ([Unknown URL]) in js/background at L27:C411 -> L27:C459
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Updated-version tool result

- ExPGuard: `still_detected`; original source `WINDOW_CUSTOM_EVENT` → sink `FETCH_RESOURCE`; candidate matches: 11

#### Analysis and validation

- Dynamic (ExPGuard): `INCONCLUSIVE_AFTER_DEBUG` (basis `non_decisive`; evidence stage `LISTENER_READY`); the dynamic run did not establish a decisive runtime result; report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\edge\extensions\bmmaaefffggbmkiocefnimjbifjhppcj_1.6.1.2\dynamic\dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install version `1.6.1.2` in a disposable edge profile and open any HTTP(S) page covered by the extension content script.
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

- ExPGuard: source report `ExPGuard-Opti/edge/flow-verification-results-no-duplicate.json`; static report `not recorded`; dynamic report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\edge\extensions\bmmaaefffggbmkiocefnimjbifjhppcj_1.6.1.2\dynamic\dynamic_report.json`.


## Recommendations

1. Authenticate page-to-extension events at the privilege boundary; validate the sender and origin instead of trusting DOM event detail.
2. Validate the request schema and restrict destination URLs, methods, headers, and bodies before issuing privileged network requests.
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
