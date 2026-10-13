# Security Vulnerability Report: Medium CSRF via Privileged Network Request and Extension Storage Poisoning in 更好的小黑盒

## Summary

We are writing on behalf of a security research team from Nankai University and the University of Liverpool. Our Ground Truth review identified **6 Flow(s)** in **更好的小黑盒** (edge, extension ID `ohjgplijcfdlhdmmdlkigbelaonpdach`, version `1.0.7`).
The recorded issue type(s): **CSRF via Privileged Network Request; Extension Storage Poisoning**.

The store currently reports version `1.2.2`. The update revalidation is summarized per tool below. This report covers only the original Flow(s); newly introduced Flow(s) are out of scope. Any mixed result, tool failure, or incomplete automated run is called out explicitly and should not be read as a final remediation determination.

## Affected Extension Details

- Name: 更好的小黑盒
- Platform: edge
- Extension ID: `ohjgplijcfdlhdmmdlkigbelaonpdach`
- Dataset version: `1.0.7`
- Store version at review: `1.2.2`
- Users: 614
- Analysis tools: ExPGuard

## Findings

### Finding 1: Storage Poisoning

The Ground Truth record traces A page or sender able to reach the recorded message/event source from `WINDOW_CUSTOM_EVENT` (From storage.local.set('better-xiaoheihe-ai-model-cache') in src/background) in src/ai-bridge at L3702:C2 -> L3766:C4 to the privileged sink `CHROME_LOCAL_STORAGE` (better-xiaoheihe-ai-model-cache) in src/background at L370:C6 -> L386:C17. The source scope is on pages matching `https://www.xiaoheihe.cn/*`. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-25d7bff091d2d6a6`
- Severity recorded by the analysis: **MEDIUM**
- Source: `WINDOW_CUSTOM_EVENT` (From storage.local.set('better-xiaoheihe-ai-model-cache') in src/background) in src/ai-bridge at L3702:C2 -> L3766:C4
- Sink: `CHROME_LOCAL_STORAGE` (better-xiaoheihe-ai-model-cache) in src/background at L370:C6 -> L386:C17
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Updated-version tool result

- ExPGuard: `still_detected`; original source `WINDOW_CUSTOM_EVENT` → sink `CHROME_LOCAL_STORAGE`; candidate matches: 2

#### Analysis and validation

- Static (ExPGuard): verdict `TRUE_POSITIVE`, confidence 0.6; report `extensions/ohjgplijcfdlhdmmdlkigbelaonpdach_1.0.7/static/static_report.json`.
- Dynamic (ExPGuard): `INCONCLUSIVE_AFTER_DEBUG` (basis `non_decisive`; evidence stage `LISTENER_READY`); the dynamic run did not establish a decisive runtime result; report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\edge\extensions\ohjgplijcfdlhdmmdlkigbelaonpdach_1.0.7\dynamic\dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `1.0.7` in a disposable edge profile.
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

- ExPGuard: source report `ExPGuard-Opti/edge/flow-verification-results-no-duplicate.json`; static report `extensions/ohjgplijcfdlhdmmdlkigbelaonpdach_1.0.7/static/static_report.json`; dynamic report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\edge\extensions\ohjgplijcfdlhdmmdlkigbelaonpdach_1.0.7\dynamic\dynamic_report.json`.

### Finding 2: Storage Poisoning

The Ground Truth record traces A page or sender able to reach the recorded message/event source from `WINDOW_CUSTOM_EVENT` (window.addEventListener(better-xiaoheihe-ai-settings-save)) in src/ai-bridge at L450:C62 -> L450:C74 to the privileged sink `CHROME_LOCAL_STORAGE` (better-xiaoheihe-ai-settings) in src/ai-bridge at L238:C6 -> L238:C38. The source scope is on pages matching `https://www.xiaoheihe.cn/*`. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-4ff2fb209c9c78a3`
- Severity recorded by the analysis: **MEDIUM**
- Source: `WINDOW_CUSTOM_EVENT` (window.addEventListener(better-xiaoheihe-ai-settings-save)) in src/ai-bridge at L450:C62 -> L450:C74
- Sink: `CHROME_LOCAL_STORAGE` (better-xiaoheihe-ai-settings) in src/ai-bridge at L238:C6 -> L238:C38
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Updated-version tool result

- ExPGuard: `still_detected`; original source `WINDOW_CUSTOM_EVENT` → sink `CHROME_LOCAL_STORAGE`; candidate matches: 2

#### Analysis and validation

- Dynamic (ExPGuard): `CONFIRMED` (basis `runtime_reproduced`; evidence stage `MARKER_REACHED`); runtime reproduction recorded; report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\edge\extensions\ohjgplijcfdlhdmmdlkigbelaonpdach_1.0.7\dynamic\dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `1.0.7` in a disposable edge profile.
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

- ExPGuard: source report `ExPGuard-Opti/edge/flow-verification-results-no-duplicate.json`; static report `not recorded`; dynamic report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\edge\extensions\ohjgplijcfdlhdmmdlkigbelaonpdach_1.0.7\dynamic\dynamic_report.json`.

### Finding 3: Storage Poisoning

The Ground Truth record traces A page or sender able to reach the recorded message/event source from `WINDOW_CUSTOM_EVENT` (From storage.local.set('better-xiaoheihe-ai-settings') in src/ai-bridge) in src/ai-bridge at L450:C62 -> L450:C74 to the privileged sink `CHROME_LOCAL_STORAGE` (better-xiaoheihe-ai-model-cache) in src/background at L370:C6 -> L386:C17. The source scope is on pages matching `https://www.xiaoheihe.cn/*`. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-585648d61ae19069`
- Severity recorded by the analysis: **MEDIUM**
- Source: `WINDOW_CUSTOM_EVENT` (From storage.local.set('better-xiaoheihe-ai-settings') in src/ai-bridge) in src/ai-bridge at L450:C62 -> L450:C74
- Sink: `CHROME_LOCAL_STORAGE` (better-xiaoheihe-ai-model-cache) in src/background at L370:C6 -> L386:C17
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Updated-version tool result

- ExPGuard: `still_detected`; original source `WINDOW_CUSTOM_EVENT` → sink `CHROME_LOCAL_STORAGE`; candidate matches: 2

#### Analysis and validation

- Static (ExPGuard): verdict `TRUE_POSITIVE`, confidence 0.6; report `extensions/ohjgplijcfdlhdmmdlkigbelaonpdach_1.0.7/static/static_report.json`.
- Dynamic (ExPGuard): `INCONCLUSIVE_AFTER_DEBUG` (basis `non_decisive`; evidence stage `SOURCE_REACHED`); the dynamic run did not establish a decisive runtime result; report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\edge\extensions\ohjgplijcfdlhdmmdlkigbelaonpdach_1.0.7\dynamic\dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `1.0.7` in a disposable edge profile.
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

- ExPGuard: source report `ExPGuard-Opti/edge/flow-verification-results-no-duplicate.json`; static report `extensions/ohjgplijcfdlhdmmdlkigbelaonpdach_1.0.7/static/static_report.json`; dynamic report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\edge\extensions\ohjgplijcfdlhdmmdlkigbelaonpdach_1.0.7\dynamic\dynamic_report.json`.

### Finding 4: Storage Poisoning

The Ground Truth record traces A page or sender able to reach the recorded message/event source from `WINDOW_CUSTOM_EVENT` (window.addEventListener(better-xiaoheihe-ai-bot-runtime-request)) in src/ai-bridge at L459:C104 -> L459:C116 to the privileged sink `CHROME_LOCAL_STORAGE` (better-xiaoheihe-ai-model-cache) in src/background at L370:C6 -> L386:C17. The source scope is on pages matching `https://www.xiaoheihe.cn/*`. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-6cec4e5882f2bfbe`
- Severity recorded by the analysis: **MEDIUM**
- Source: `WINDOW_CUSTOM_EVENT` (window.addEventListener(better-xiaoheihe-ai-bot-runtime-request)) in src/ai-bridge at L459:C104 -> L459:C116
- Sink: `CHROME_LOCAL_STORAGE` (better-xiaoheihe-ai-model-cache) in src/background at L370:C6 -> L386:C17
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Updated-version tool result

- ExPGuard: `still_detected`; original source `WINDOW_CUSTOM_EVENT` → sink `CHROME_LOCAL_STORAGE`; candidate matches: 2

#### Analysis and validation

- Static (ExPGuard): verdict `TRUE_POSITIVE`, confidence 0.6; report `extensions/ohjgplijcfdlhdmmdlkigbelaonpdach_1.0.7/static/static_report.json`.
- Dynamic (ExPGuard): `PARTIAL` (basis `non_decisive`; evidence stage `SINK_REACHED`); the recorded replay did not establish the complete source-to-sink effect; report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\edge\extensions\ohjgplijcfdlhdmmdlkigbelaonpdach_1.0.7\dynamic\dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `1.0.7` in a disposable edge profile.
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

- ExPGuard: source report `ExPGuard-Opti/edge/flow-verification-results-no-duplicate.json`; static report `extensions/ohjgplijcfdlhdmmdlkigbelaonpdach_1.0.7/static/static_report.json`; dynamic report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\edge\extensions\ohjgplijcfdlhdmmdlkigbelaonpdach_1.0.7\dynamic\dynamic_report.json`.

### Finding 5: Cross-Site Request Forgery (CSRF) / Privileged Network Request

A script running on a page matching `https://www.xiaoheihe.cn/*` can dispatch the recorded DOM custom event and supply its `detail`. The content script forwards that event data to the extension runtime, and the service worker uses the supplied URL and form data in a privileged POST `fetch`. The report records no origin/authentication check at this bridge. This permits a matching page to initiate the recorded request; it does not by itself establish that third-party credentials are included.

- Ground Truth Flow: `gtf-dbca595b55714403`
- Severity recorded by the analysis: **MEDIUM**
- Source: `WINDOW_CUSTOM_EVENT` (window.addEventListener(better-xiaoheihe-ai-bot-runtime-request)) in src/ai-bridge at L459:C104 -> L459:C116
- Sink: `FETCH_RESOURCE` ([Unknown URL]) in src/background at L781:C27 -> L781:C46
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Updated-version tool result

- ExPGuard: `still_detected`; original source `WINDOW_CUSTOM_EVENT` → sink `FETCH_RESOURCE`; candidate matches: 1

#### Analysis and validation

- Static (ExPGuard): verdict `UNCERTAIN`, confidence 0; report `extensions/ohjgplijcfdlhdmmdlkigbelaonpdach_1.0.7/static/static_report.json`.
- Dynamic (ExPGuard): `CONFIRMED` (basis `runtime_reproduced`; evidence stage `MARKER_REACHED`); runtime reproduction recorded; report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\edge\extensions\ohjgplijcfdlhdmmdlkigbelaonpdach_1.0.7\dynamic\dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install version `1.0.7` in a disposable edge profile and open any HTTP(S) page covered by the extension content script.
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

- ExPGuard: source report `ExPGuard-Opti/edge/flow-verification-results-no-duplicate.json`; static report `extensions/ohjgplijcfdlhdmmdlkigbelaonpdach_1.0.7/static/static_report.json`; dynamic report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\edge\extensions\ohjgplijcfdlhdmmdlkigbelaonpdach_1.0.7\dynamic\dynamic_report.json`.

### Finding 6: Cross-Site Request Forgery (CSRF) / Privileged Network Request

A script running on a page matching `https://www.xiaoheihe.cn/*` can dispatch the recorded DOM custom event and supply its `detail`. The content script forwards that event data to the extension runtime, and the service worker uses the supplied URL and form data in a privileged POST `fetch`. The report records no origin/authentication check at this bridge. This permits a matching page to initiate the recorded request; it does not by itself establish that third-party credentials are included.

- Ground Truth Flow: `gtf-eecd39cbb1dc3d19`
- Severity recorded by the analysis: **MEDIUM**
- Source: `WINDOW_CUSTOM_EVENT` (From storage.local.set('better-xiaoheihe-ai-settings') in src/ai-bridge) in src/ai-bridge at L450:C62 -> L450:C74
- Sink: `FETCH_RESOURCE` ([Unknown URL]) in src/background at L781:C27 -> L781:C46
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Updated-version tool result

- ExPGuard: `still_detected`; original source `WINDOW_CUSTOM_EVENT` → sink `FETCH_RESOURCE`; candidate matches: 1

#### Analysis and validation

- Dynamic (ExPGuard): `CONFIRMED` (basis `runtime_reproduced`; evidence stage `MARKER_REACHED`); runtime reproduction recorded; report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\edge\extensions\ohjgplijcfdlhdmmdlkigbelaonpdach_1.0.7\dynamic\dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install version `1.0.7` in a disposable edge profile and open any HTTP(S) page covered by the extension content script.
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

- ExPGuard: source report `ExPGuard-Opti/edge/flow-verification-results-no-duplicate.json`; static report `not recorded`; dynamic report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\edge\extensions\ohjgplijcfdlhdmmdlkigbelaonpdach_1.0.7\dynamic\dynamic_report.json`.


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
