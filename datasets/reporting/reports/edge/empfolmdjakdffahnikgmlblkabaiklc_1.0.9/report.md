# Security Vulnerability Report: Critical CSRF via Privileged Network Request, Extension Storage Poisoning, and other reported issues in 快稿助手-批量发布工具

## Summary

We are writing on behalf of a security research team from Nankai University and the University of Liverpool. Our Ground Truth review identified **14 Flow(s)** in **快稿助手-批量发布工具** (edge, extension ID `empfolmdjakdffahnikgmlblkabaiklc`, version `1.0.9`).
The recorded issue type(s): **CSRF via Privileged Network Request; Extension Storage Poisoning; Unauthorized Cookie Modification; Unauthorized Tab/Window Control; Unauthorized Browser Policy Change**.

## Affected Extension Details

- Name: 快稿助手-批量发布工具
- Platform: edge
- Extension ID: `empfolmdjakdffahnikgmlblkabaiklc`
- Dataset version: `1.0.9`
- Store version at review: `1.0.9`
- Users: 472
- Analysis tools: ExPGuard

## Findings

### Finding 1: Cross-Site Request Forgery (CSRF) / Privileged Network Request

A script running on a page matching `<all_urls>` can dispatch the recorded DOM custom event and supply its `detail`. The content script forwards that event data to the extension runtime, and the service worker uses the supplied URL and form data in a privileged POST `fetch`. The report records no origin/authentication check at this bridge. This permits a matching page to initiate the recorded request; it does not by itself establish that third-party credentials are included.

- Ground Truth Flow: `gtf-0e0317a60020e8f0`
- Severity recorded by the analysis: **CRITICAL**
- Source: `TARGET_CUSTOM_EVENT` (target.addEventListener(contentScriptExecuteScriptEndFromPage)) in js/content-script at L253:C19 -> L253:C30
- Sink: `FETCH_RESOURCE` ([Unknown URL]) in js/background at L74:C35 -> L74:C75
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Analysis and validation

- Dynamic (ExPGuard): `SETUP_INCOMPLETE` (basis `non_decisive`; evidence stage `LISTENER_READY`); this result does not independently confirm execution at the sink; report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\edge\extensions\empfolmdjakdffahnikgmlblkabaiklc_1.0.9\dynamic\dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install version `1.0.9` in a disposable edge profile and open any HTTP(S) page covered by the extension content script.
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

- ExPGuard: source report `ExPGuard-Opti/edge/flow-verification-results-no-duplicate.json`; static report `not recorded`; dynamic report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\edge\extensions\empfolmdjakdffahnikgmlblkabaiklc_1.0.9\dynamic\dynamic_report.json`.

### Finding 2: Unauthorized Tab or Window Manipulation

The Ground Truth record traces A page or sender able to reach the recorded message/event source from `TARGET_CUSTOM_EVENT` (target.addEventListener(contentScriptExecuteScriptEndFromPage)) in js/content-script at L253:C19 -> L253:C30 to the privileged sink `CHROME_WINDOWS_CREATE_OPTIONS` in js/background at L807:C12 -> L882:C14. The source scope is on pages matching `<all_urls>`. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-307a9f4d80622f91`
- Severity recorded by the analysis: **CRITICAL**
- Source: `TARGET_CUSTOM_EVENT` (target.addEventListener(contentScriptExecuteScriptEndFromPage)) in js/content-script at L253:C19 -> L253:C30
- Sink: `CHROME_WINDOWS_CREATE_OPTIONS` in js/background at L807:C12 -> L882:C14
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Analysis and validation

- Static (ExPGuard): verdict `FALSE_POSITIVE`, confidence 0.6; report `extensions/empfolmdjakdffahnikgmlblkabaiklc_1.0.9/static/static_report.json`.
- Dynamic (ExPGuard): `TOOL_LIMITATION` (basis `non_decisive`; evidence stage `BLOCKED`); this result does not independently confirm execution at the sink; report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\edge\extensions\empfolmdjakdffahnikgmlblkabaiklc_1.0.9\dynamic\dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `1.0.9` in a disposable edge profile.
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

- ExPGuard: source report `ExPGuard-Opti/edge/flow-verification-results-no-duplicate.json`; static report `extensions/empfolmdjakdffahnikgmlblkabaiklc_1.0.9/static/static_report.json`; dynamic report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\edge\extensions\empfolmdjakdffahnikgmlblkabaiklc_1.0.9\dynamic\dynamic_report.json`.

### Finding 3: Unauthorized Tab or Window Manipulation

The Ground Truth record traces A page or sender able to reach the recorded message/event source from `TARGET_CUSTOM_EVENT` (target.addEventListener(contentScriptExecuteScriptEndFromPage)) in js/content-script at L253:C19 -> L253:C30 to the privileged sink `CHROME_TABS_CREATE_OPTIONS` in js/background at L1041:C12 -> L1051:C13. The source scope is on pages matching `<all_urls>`. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-5adcf5cea50d7813`
- Severity recorded by the analysis: **CRITICAL**
- Source: `TARGET_CUSTOM_EVENT` (target.addEventListener(contentScriptExecuteScriptEndFromPage)) in js/content-script at L253:C19 -> L253:C30
- Sink: `CHROME_TABS_CREATE_OPTIONS` in js/background at L1041:C12 -> L1051:C13
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Analysis and validation

- Dynamic (ExPGuard): `TOOL_LIMITATION` (basis `non_decisive`; evidence stage `BLOCKED`); this result does not independently confirm execution at the sink; report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\edge\extensions\empfolmdjakdffahnikgmlblkabaiklc_1.0.9\dynamic\dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `1.0.9` in a disposable edge profile.
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

- ExPGuard: source report `ExPGuard-Opti/edge/flow-verification-results-no-duplicate.json`; static report `not recorded`; dynamic report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\edge\extensions\empfolmdjakdffahnikgmlblkabaiklc_1.0.9\dynamic\dynamic_report.json`.

### Finding 4: Unauthorized Browser Policy Modification

The Ground Truth record traces A page or sender able to reach the recorded message/event source from `TARGET_CUSTOM_EVENT` (target.addEventListener(contentScriptExecuteScriptEndFromPage)) in js/content-script at L253:C19 -> L253:C30 to the privileged sink `CHROME_DECLARATIVENETREQUEST_RULES` in js/background at L956:C22 -> L969:C17. The source scope is on pages matching `<all_urls>`. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-6c455eb31d3bffe0`
- Severity recorded by the analysis: **CRITICAL**
- Source: `TARGET_CUSTOM_EVENT` (target.addEventListener(contentScriptExecuteScriptEndFromPage)) in js/content-script at L253:C19 -> L253:C30
- Sink: `CHROME_DECLARATIVENETREQUEST_RULES` in js/background at L956:C22 -> L969:C17
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Analysis and validation

- Dynamic (ExPGuard): `TOOL_LIMITATION` (basis `non_decisive`; evidence stage `BLOCKED`); this result does not independently confirm execution at the sink; report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\edge\extensions\empfolmdjakdffahnikgmlblkabaiklc_1.0.9\dynamic\dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `1.0.9` in a disposable edge profile.
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

- ExPGuard: source report `ExPGuard-Opti/edge/flow-verification-results-no-duplicate.json`; static report `not recorded`; dynamic report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\edge\extensions\empfolmdjakdffahnikgmlblkabaiklc_1.0.9\dynamic\dynamic_report.json`.

### Finding 5: Unauthorized Cookie Manipulation

The Ground Truth record traces A page or sender able to reach the recorded message/event source from `TARGET_CUSTOM_EVENT` (target.addEventListener(contentScriptExecuteScriptEndFromPage)) in js/content-script at L253:C19 -> L253:C30 to the privileged sink `CHROME_COOKIES_REMOVE_OPTIONS` in js/background at L534:C16 -> L534:C79. The source scope is on pages matching `<all_urls>`. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-739f4dce36635f82`
- Severity recorded by the analysis: **CRITICAL**
- Source: `TARGET_CUSTOM_EVENT` (target.addEventListener(contentScriptExecuteScriptEndFromPage)) in js/content-script at L253:C19 -> L253:C30
- Sink: `CHROME_COOKIES_REMOVE_OPTIONS` in js/background at L534:C16 -> L534:C79
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Analysis and validation

- Dynamic (ExPGuard): `INCONCLUSIVE_AFTER_DEBUG` (basis `non_decisive`; evidence stage `LISTENER_READY`); the recorded replay did not hit the exact sink; this run is inconclusive and is not a runtime confirmation; report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\edge\extensions\empfolmdjakdffahnikgmlblkabaiklc_1.0.9\dynamic\dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `1.0.9` in a disposable edge profile.
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

- ExPGuard: source report `ExPGuard-Opti/edge/flow-verification-results-no-duplicate.json`; static report `not recorded`; dynamic report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\edge\extensions\empfolmdjakdffahnikgmlblkabaiklc_1.0.9\dynamic\dynamic_report.json`.

### Finding 6: Cross-Site Request Forgery (CSRF) / Privileged Network Request

A script running on a page matching `<all_urls>` can dispatch the recorded DOM custom event and supply its `detail`. The content script forwards that event data to the extension runtime, and the service worker uses the supplied URL and form data in a privileged POST `fetch`. The report records no origin/authentication check at this bridge. This permits a matching page to initiate the recorded request; it does not by itself establish that third-party credentials are included.

- Ground Truth Flow: `gtf-8013868cd8ad406a`
- Severity recorded by the analysis: **CRITICAL**
- Source: `TARGET_CUSTOM_EVENT` (target.addEventListener(contentScriptExecuteScriptEndFromPage)) in js/content-script at L253:C19 -> L253:C30
- Sink: `FETCH_RESOURCE` ([Unknown URL]) in js/background at L680:C12 -> L680:C52
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Analysis and validation

- Dynamic (ExPGuard): `TOOL_LIMITATION` (basis `non_decisive`; evidence stage `BLOCKED`); this result does not independently confirm execution at the sink; report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\edge\extensions\empfolmdjakdffahnikgmlblkabaiklc_1.0.9\dynamic\dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install version `1.0.9` in a disposable edge profile and open any HTTP(S) page covered by the extension content script.
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

- ExPGuard: source report `ExPGuard-Opti/edge/flow-verification-results-no-duplicate.json`; static report `not recorded`; dynamic report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\edge\extensions\empfolmdjakdffahnikgmlblkabaiklc_1.0.9\dynamic\dynamic_report.json`.

### Finding 7: Unauthorized Browser Policy Modification

The Ground Truth record traces A page or sender able to reach the recorded message/event source from `TARGET_CUSTOM_EVENT` (target.addEventListener(contentScriptExecuteScriptEndFromPage)) in js/content-script at L253:C19 -> L253:C30 to the privileged sink `CHROME_DECLARATIVENETREQUEST_RULES` in js/background at L1128:C14 -> L1133:C9. The source scope is on pages matching `<all_urls>`. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-8066482e2e3c8147`
- Severity recorded by the analysis: **CRITICAL**
- Source: `TARGET_CUSTOM_EVENT` (target.addEventListener(contentScriptExecuteScriptEndFromPage)) in js/content-script at L253:C19 -> L253:C30
- Sink: `CHROME_DECLARATIVENETREQUEST_RULES` in js/background at L1128:C14 -> L1133:C9
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Analysis and validation

- Dynamic (ExPGuard): `TOOL_LIMITATION` (basis `non_decisive`; evidence stage `BLOCKED`); this result does not independently confirm execution at the sink; report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\edge\extensions\empfolmdjakdffahnikgmlblkabaiklc_1.0.9\dynamic\dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `1.0.9` in a disposable edge profile.
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

- ExPGuard: source report `ExPGuard-Opti/edge/flow-verification-results-no-duplicate.json`; static report `not recorded`; dynamic report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\edge\extensions\empfolmdjakdffahnikgmlblkabaiklc_1.0.9\dynamic\dynamic_report.json`.

### Finding 8: Unauthorized Tab or Window Manipulation

The Ground Truth record traces A page or sender able to reach the recorded message/event source from `TARGET_CUSTOM_EVENT` (target.addEventListener(contentScriptExecuteScriptEndFromPage)) in js/content-script at L253:C19 -> L253:C30 to the privileged sink `CHROME_TABS_CREATE_OPTIONS` in js/background at L553:C8 -> L559:C10. The source scope is on pages matching `<all_urls>`. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-8fd1a7d9f7b818dd`
- Severity recorded by the analysis: **CRITICAL**
- Source: `TARGET_CUSTOM_EVENT` (target.addEventListener(contentScriptExecuteScriptEndFromPage)) in js/content-script at L253:C19 -> L253:C30
- Sink: `CHROME_TABS_CREATE_OPTIONS` in js/background at L553:C8 -> L559:C10
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Analysis and validation

- Static (ExPGuard): verdict `FALSE_POSITIVE`, confidence 0.6; report `extensions/empfolmdjakdffahnikgmlblkabaiklc_1.0.9/static/static_report.json`.
- Dynamic (ExPGuard): `SINK_NOT_FIRED` (basis `runtime_rebutted`; evidence stage `ENVIRONMENT_READY`); the recorded replay did not establish the complete source-to-sink effect; report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\edge\extensions\empfolmdjakdffahnikgmlblkabaiklc_1.0.9\dynamic\dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `1.0.9` in a disposable edge profile.
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

- ExPGuard: source report `ExPGuard-Opti/edge/flow-verification-results-no-duplicate.json`; static report `extensions/empfolmdjakdffahnikgmlblkabaiklc_1.0.9/static/static_report.json`; dynamic report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\edge\extensions\empfolmdjakdffahnikgmlblkabaiklc_1.0.9\dynamic\dynamic_report.json`.

### Finding 9: Unauthorized Tab or Window Manipulation

The Ground Truth record traces A page or sender able to reach the recorded message/event source from `TARGET_CUSTOM_EVENT` (target.addEventListener(contentScriptExecuteScriptEndFromPage)) in js/content-script at L253:C19 -> L253:C30 to the privileged sink `CHROME_TABS_CREATE_OPTIONS` in js/background at L1066:C12 -> L1078:C13. The source scope is on pages matching `<all_urls>`. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-9bc355a8c404c8a8`
- Severity recorded by the analysis: **CRITICAL**
- Source: `TARGET_CUSTOM_EVENT` (target.addEventListener(contentScriptExecuteScriptEndFromPage)) in js/content-script at L253:C19 -> L253:C30
- Sink: `CHROME_TABS_CREATE_OPTIONS` in js/background at L1066:C12 -> L1078:C13
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Analysis and validation

- Dynamic (ExPGuard): `TOOL_LIMITATION` (basis `non_decisive`; evidence stage `BLOCKED`); this result does not independently confirm execution at the sink; report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\edge\extensions\empfolmdjakdffahnikgmlblkabaiklc_1.0.9\dynamic\dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `1.0.9` in a disposable edge profile.
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

- ExPGuard: source report `ExPGuard-Opti/edge/flow-verification-results-no-duplicate.json`; static report `not recorded`; dynamic report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\edge\extensions\empfolmdjakdffahnikgmlblkabaiklc_1.0.9\dynamic\dynamic_report.json`.

### Finding 10: Unauthorized Tab or Window Manipulation

The Ground Truth record traces A page or sender able to reach the recorded message/event source from `TARGET_CUSTOM_EVENT` (target.addEventListener(contentScriptExecuteScriptEndFromPage)) in js/content-script at L253:C19 -> L253:C30 to the privileged sink `CHROME_TABS_CREATE_OPTIONS` in js/background at L706:C8 -> L769:C10. The source scope is on pages matching `<all_urls>`. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-ada6eae595d83b73`
- Severity recorded by the analysis: **CRITICAL**
- Source: `TARGET_CUSTOM_EVENT` (target.addEventListener(contentScriptExecuteScriptEndFromPage)) in js/content-script at L253:C19 -> L253:C30
- Sink: `CHROME_TABS_CREATE_OPTIONS` in js/background at L706:C8 -> L769:C10
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Analysis and validation

- Dynamic (ExPGuard): `TOOL_LIMITATION` (basis `non_decisive`; evidence stage `BLOCKED`); this result does not independently confirm execution at the sink; report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\edge\extensions\empfolmdjakdffahnikgmlblkabaiklc_1.0.9\dynamic\dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `1.0.9` in a disposable edge profile.
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

- ExPGuard: source report `ExPGuard-Opti/edge/flow-verification-results-no-duplicate.json`; static report `not recorded`; dynamic report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\edge\extensions\empfolmdjakdffahnikgmlblkabaiklc_1.0.9\dynamic\dynamic_report.json`.

### Finding 11: Unauthorized Browser Policy Modification

The Ground Truth record traces A page or sender able to reach the recorded message/event source from `TARGET_CUSTOM_EVENT` (target.addEventListener(contentScriptExecuteScriptEndFromPage)) in js/content-script at L253:C19 -> L253:C30 to the privileged sink `CHROME_DECLARATIVENETREQUEST_RULES` in js/background at L899:C22 -> L931:C17. The source scope is on pages matching `<all_urls>`. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-be110aabaf75ddf3`
- Severity recorded by the analysis: **CRITICAL**
- Source: `TARGET_CUSTOM_EVENT` (target.addEventListener(contentScriptExecuteScriptEndFromPage)) in js/content-script at L253:C19 -> L253:C30
- Sink: `CHROME_DECLARATIVENETREQUEST_RULES` in js/background at L899:C22 -> L931:C17
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Analysis and validation

- Static (ExPGuard): verdict `UNCERTAIN`, confidence 0; report `extensions/empfolmdjakdffahnikgmlblkabaiklc_1.0.9/static/static_report.json`.
- Dynamic (ExPGuard): `SETUP_INCOMPLETE` (basis `non_decisive`; evidence stage `LISTENER_READY`); this result does not independently confirm execution at the sink; report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\edge\extensions\empfolmdjakdffahnikgmlblkabaiklc_1.0.9\dynamic\dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `1.0.9` in a disposable edge profile.
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

- ExPGuard: source report `ExPGuard-Opti/edge/flow-verification-results-no-duplicate.json`; static report `extensions/empfolmdjakdffahnikgmlblkabaiklc_1.0.9/static/static_report.json`; dynamic report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\edge\extensions\empfolmdjakdffahnikgmlblkabaiklc_1.0.9\dynamic\dynamic_report.json`.

### Finding 12: Cross-Site Request Forgery (CSRF) / Privileged Network Request

A script running on a page matching `<all_urls>` can dispatch the recorded DOM custom event and supply its `detail`. The content script forwards that event data to the extension runtime, and the service worker uses the supplied URL and form data in a privileged POST `fetch`. The report records no origin/authentication check at this bridge. This permits a matching page to initiate the recorded request; it does not by itself establish that third-party credentials are included.

- Ground Truth Flow: `gtf-c5b4c2cdea42d183`
- Severity recorded by the analysis: **CRITICAL**
- Source: `TARGET_CUSTOM_EVENT` (target.addEventListener(contentScriptExecuteScriptEndFromPage)) in js/content-script at L253:C19 -> L253:C30
- Sink: `FETCH_RESOURCE` ([Unknown URL]) in js/background at L662:C12 -> L662:C52
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Analysis and validation

- Dynamic (ExPGuard): `SETUP_INCOMPLETE` (basis `non_decisive`; evidence stage `LISTENER_READY`); this result does not independently confirm execution at the sink; report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\edge\extensions\empfolmdjakdffahnikgmlblkabaiklc_1.0.9\dynamic\dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install version `1.0.9` in a disposable edge profile and open any HTTP(S) page covered by the extension content script.
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

- ExPGuard: source report `ExPGuard-Opti/edge/flow-verification-results-no-duplicate.json`; static report `not recorded`; dynamic report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\edge\extensions\empfolmdjakdffahnikgmlblkabaiklc_1.0.9\dynamic\dynamic_report.json`.

### Finding 13: Unauthorized Tab or Window Manipulation

The Ground Truth record traces A page or sender able to reach the recorded message/event source from `TARGET_CUSTOM_EVENT` (target.addEventListener(contentScriptExecuteScriptEndFromPage)) in js/content-script at L253:C19 -> L253:C30 to the privileged sink `CHROME_TABS_CREATE_OPTIONS` in js/background at L1053:C12 -> L1064:C13. The source scope is on pages matching `<all_urls>`. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-e6759f926f783a6e`
- Severity recorded by the analysis: **CRITICAL**
- Source: `TARGET_CUSTOM_EVENT` (target.addEventListener(contentScriptExecuteScriptEndFromPage)) in js/content-script at L253:C19 -> L253:C30
- Sink: `CHROME_TABS_CREATE_OPTIONS` in js/background at L1053:C12 -> L1064:C13
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Analysis and validation

- Dynamic (ExPGuard): `TOOL_LIMITATION` (basis `non_decisive`; evidence stage `BLOCKED`); this result does not independently confirm execution at the sink; report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\edge\extensions\empfolmdjakdffahnikgmlblkabaiklc_1.0.9\dynamic\dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `1.0.9` in a disposable edge profile.
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

- ExPGuard: source report `ExPGuard-Opti/edge/flow-verification-results-no-duplicate.json`; static report `not recorded`; dynamic report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\edge\extensions\empfolmdjakdffahnikgmlblkabaiklc_1.0.9\dynamic\dynamic_report.json`.

### Finding 14: Storage Poisoning

The Ground Truth record traces A page or sender able to reach the recorded message/event source from `TARGET_CUSTOM_EVENT` (target.addEventListener(contentScriptExecuteScriptEndFromPage)) in js/content-script at L253:C19 -> L253:C30 to the privileged sink `CHROME_LOCAL_STORAGE` (unknown) in js/background at L598:C8 -> L609:C9. The source scope is on pages matching `<all_urls>`. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-eae3b13307c5c87a`
- Severity recorded by the analysis: **CRITICAL**
- Source: `TARGET_CUSTOM_EVENT` (target.addEventListener(contentScriptExecuteScriptEndFromPage)) in js/content-script at L253:C19 -> L253:C30
- Sink: `CHROME_LOCAL_STORAGE` (unknown) in js/background at L598:C8 -> L609:C9
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Analysis and validation

- Dynamic (ExPGuard): `INCONCLUSIVE_AFTER_DEBUG` (basis `non_decisive`; evidence stage `LISTENER_READY`); the dynamic run did not establish a decisive runtime result; report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\edge\extensions\empfolmdjakdffahnikgmlblkabaiklc_1.0.9\dynamic\dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `1.0.9` in a disposable edge profile.
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

- ExPGuard: source report `ExPGuard-Opti/edge/flow-verification-results-no-duplicate.json`; static report `not recorded`; dynamic report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\edge\extensions\empfolmdjakdffahnikgmlblkabaiklc_1.0.9\dynamic\dynamic_report.json`.


## Recommendations

1. Authenticate page-to-extension events at the privilege boundary; validate the sender and origin instead of trusting DOM event detail.
2. Validate the request schema and restrict destination URLs, methods, headers, and bodies before issuing privileged network requests.
3. Do not let page-controlled cookies or DOM values select extension-owned storage values; validate the expected value and keep credentials in extension-owned UI/state.
4. Treat storage writes as privileged state changes: use an allowlisted schema, reject attacker-controlled keys, and avoid merging untrusted objects into extension state.
5. Restrict cookie operations to the minimum host and cookie scope, and reject values supplied by untrusted page content.
6. Validate tab/window IDs and navigation targets, and require a user gesture for externally initiated changes.
7. Reduce host permissions and sensitive API access to the smallest scope required by the feature.

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
