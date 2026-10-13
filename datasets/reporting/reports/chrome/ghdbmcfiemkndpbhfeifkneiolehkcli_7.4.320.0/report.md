# Security Vulnerability Report: Critical CSRF via Privileged Network Request and Unauthorized Tab/Window Control in FUJIFILM Synapse Extension

## Summary

We are writing on behalf of a security research team from Nankai University and the University of Liverpool. Our Ground Truth review identified **10 Flow(s)** in **FUJIFILM Synapse Extension** (chrome, extension ID `ghdbmcfiemkndpbhfeifkneiolehkcli`, version `7.4.320.0`).
The recorded issue type(s): **CSRF via Privileged Network Request; Unauthorized Tab/Window Control**.

## Affected Extension Details

- Name: FUJIFILM Synapse Extension
- Platform: chrome
- Extension ID: `ghdbmcfiemkndpbhfeifkneiolehkcli`
- Dataset version: `7.4.320.0`
- Store version at review: `7.4.320.0`
- Users: 3000000
- Analysis tools: ExPGuard

## Findings

### Finding 1: Unauthorized Tab or Window Manipulation

The Ground Truth record traces A page or sender able to reach the recorded message/event source from `TARGET_CUSTOM_EVENT` (target.addEventListener(windowManagerEventEx)) in csNativeMessage at L55:C0 -> L63:C6 to the privileged sink `CHROME_WINDOWS_CREATE_OPTIONS` in bsWindowManagement at L242:C12 -> L250:C14. The source scope is on pages matching `*://*/*SynapseSignOn/sts/login*, *://*/ImageViewer*, *://*/*PowerJacket*, *://*/WorkflowUI*, *://*/*Client.Web*, *://*/Synapse/WebQuery*, *://*/*ThinkLogChatUI*, *://*/*WebQueryAPI*`. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-3283ad0676167714`
- Severity recorded by the analysis: **CRITICAL**
- Source: `TARGET_CUSTOM_EVENT` (target.addEventListener(windowManagerEventEx)) in csNativeMessage at L55:C0 -> L63:C6
- Sink: `CHROME_WINDOWS_CREATE_OPTIONS` in bsWindowManagement at L242:C12 -> L250:C14
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Analysis and validation

- Static (ExPGuard): verdict `TRUE_POSITIVE`, confidence 0.6; report `extensions/ghdbmcfiemkndpbhfeifkneiolehkcli_7.4.320.0/static/static_report.json`.
- Dynamic: no structured dynamic-verification result is attached to this Flow in the Ground Truth dataset.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `7.4.320.0` in a disposable chrome profile.
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

- ExPGuard: source report `ExPGuard-Opti/chrome/flow-verification-results-no-duplicate.json`; static report `extensions/ghdbmcfiemkndpbhfeifkneiolehkcli_7.4.320.0/static/static_report.json`; dynamic report `not recorded`.

### Finding 2: Unauthorized Tab or Window Manipulation

The Ground Truth record traces A page or sender able to reach the recorded message/event source from `TARGET_CUSTOM_EVENT` (target.addEventListener(windowManagerEventEx)) in csNativeMessage at L55:C0 -> L63:C6 to the privileged sink `CHROME_WINDOWS_UPDATE_OPTIONS` in bsWindowManagement at L799:C12 -> L805:C14. The source scope is on pages matching `*://*/*SynapseSignOn/sts/login*, *://*/ImageViewer*, *://*/*PowerJacket*, *://*/WorkflowUI*, *://*/*Client.Web*, *://*/Synapse/WebQuery*, *://*/*ThinkLogChatUI*, *://*/*WebQueryAPI*`. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-48283186d000bedb`
- Severity recorded by the analysis: **CRITICAL**
- Source: `TARGET_CUSTOM_EVENT` (target.addEventListener(windowManagerEventEx)) in csNativeMessage at L55:C0 -> L63:C6
- Sink: `CHROME_WINDOWS_UPDATE_OPTIONS` in bsWindowManagement at L799:C12 -> L805:C14
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Analysis and validation

- Dynamic (ExPGuard): `CONFIRMED` (basis `runtime_reproduced`; evidence stage `MARKER_REACHED`); runtime reproduction recorded; report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\chrome\extensions\ghdbmcfiemkndpbhfeifkneiolehkcli_7.4.320.0\dynamic\dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `7.4.320.0` in a disposable chrome profile.
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

- ExPGuard: source report `ExPGuard-Opti/chrome/flow-verification-results-no-duplicate.json`; static report `not recorded`; dynamic report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\chrome\extensions\ghdbmcfiemkndpbhfeifkneiolehkcli_7.4.320.0\dynamic\dynamic_report.json`.

### Finding 3: Unauthorized Tab or Window Manipulation

The Ground Truth record traces A page or sender able to reach the recorded message/event source from `TARGET_CUSTOM_EVENT` (target.addEventListener(windowManagerEventEx)) in csNativeMessage at L55:C0 -> L63:C6 to the privileged sink `CHROME_WINDOWS_UPDATE_OPTIONS` in bsWindowManagement at L837:C12 -> L837:C55. The source scope is on pages matching `*://*/*SynapseSignOn/sts/login*, *://*/ImageViewer*, *://*/*PowerJacket*, *://*/WorkflowUI*, *://*/*Client.Web*, *://*/Synapse/WebQuery*, *://*/*ThinkLogChatUI*, *://*/*WebQueryAPI*`. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-5c5375c3fbb03f81`
- Severity recorded by the analysis: **CRITICAL**
- Source: `TARGET_CUSTOM_EVENT` (target.addEventListener(windowManagerEventEx)) in csNativeMessage at L55:C0 -> L63:C6
- Sink: `CHROME_WINDOWS_UPDATE_OPTIONS` in bsWindowManagement at L837:C12 -> L837:C55
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Analysis and validation

- Dynamic (ExPGuard): `CONFIRMED` (basis `runtime_reproduced`; evidence stage `MARKER_REACHED`); runtime reproduction recorded; report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\chrome\extensions\ghdbmcfiemkndpbhfeifkneiolehkcli_7.4.320.0\dynamic\dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `7.4.320.0` in a disposable chrome profile.
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

- ExPGuard: source report `ExPGuard-Opti/chrome/flow-verification-results-no-duplicate.json`; static report `not recorded`; dynamic report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\chrome\extensions\ghdbmcfiemkndpbhfeifkneiolehkcli_7.4.320.0\dynamic\dynamic_report.json`.

### Finding 4: Unauthorized Tab or Window Manipulation

The Ground Truth record traces A page or sender able to reach the recorded message/event source from `TARGET_CUSTOM_EVENT` (target.addEventListener(windowManagerEventEx)) in csNativeMessage at L55:C0 -> L63:C6 to the privileged sink `CHROME_WINDOWS_CREATE_OPTIONS` in bsWindowManagement at L350:C8 -> L358:C10. The source scope is on pages matching `*://*/*SynapseSignOn/sts/login*, *://*/ImageViewer*, *://*/*PowerJacket*, *://*/WorkflowUI*, *://*/*Client.Web*, *://*/Synapse/WebQuery*, *://*/*ThinkLogChatUI*, *://*/*WebQueryAPI*`. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-7684b90e9a17110c`
- Severity recorded by the analysis: **CRITICAL**
- Source: `TARGET_CUSTOM_EVENT` (target.addEventListener(windowManagerEventEx)) in csNativeMessage at L55:C0 -> L63:C6
- Sink: `CHROME_WINDOWS_CREATE_OPTIONS` in bsWindowManagement at L350:C8 -> L358:C10
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Analysis and validation

- Dynamic (ExPGuard): `CONFIRMED` (basis `runtime_reproduced`; evidence stage `MARKER_REACHED`); runtime reproduction recorded; report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\chrome\extensions\ghdbmcfiemkndpbhfeifkneiolehkcli_7.4.320.0\dynamic\dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `7.4.320.0` in a disposable chrome profile.
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

- ExPGuard: source report `ExPGuard-Opti/chrome/flow-verification-results-no-duplicate.json`; static report `not recorded`; dynamic report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\chrome\extensions\ghdbmcfiemkndpbhfeifkneiolehkcli_7.4.320.0\dynamic\dynamic_report.json`.

### Finding 5: Unauthorized Tab or Window Manipulation

The Ground Truth record traces A page or sender able to reach the recorded message/event source from `TARGET_CUSTOM_EVENT` (target.addEventListener(windowManagerEventEx)) in csNativeMessage at L55:C0 -> L63:C6 to the privileged sink `CHROME_WINDOWS_UPDATE_OPTIONS` in bsWindowManagement at L885:C16 -> L891:C18. The source scope is on pages matching `*://*/*SynapseSignOn/sts/login*, *://*/ImageViewer*, *://*/*PowerJacket*, *://*/WorkflowUI*, *://*/*Client.Web*, *://*/Synapse/WebQuery*, *://*/*ThinkLogChatUI*, *://*/*WebQueryAPI*`. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-7c7e5b3f361b6cc7`
- Severity recorded by the analysis: **CRITICAL**
- Source: `TARGET_CUSTOM_EVENT` (target.addEventListener(windowManagerEventEx)) in csNativeMessage at L55:C0 -> L63:C6
- Sink: `CHROME_WINDOWS_UPDATE_OPTIONS` in bsWindowManagement at L885:C16 -> L891:C18
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Analysis and validation

- Dynamic (ExPGuard): `CONFIRMED` (basis `runtime_reproduced`; evidence stage `MARKER_REACHED`); runtime reproduction recorded; report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\chrome\extensions\ghdbmcfiemkndpbhfeifkneiolehkcli_7.4.320.0\dynamic\dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `7.4.320.0` in a disposable chrome profile.
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

- ExPGuard: source report `ExPGuard-Opti/chrome/flow-verification-results-no-duplicate.json`; static report `not recorded`; dynamic report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\chrome\extensions\ghdbmcfiemkndpbhfeifkneiolehkcli_7.4.320.0\dynamic\dynamic_report.json`.

### Finding 6: Cross-Site Request Forgery (CSRF) / Privileged Network Request

A script running on a page matching `*://*/*SynapseSignOn/sts/login*, *://*/ImageViewer*, *://*/*PowerJacket*, *://*/WorkflowUI*, *://*/*Client.Web*, *://*/Synapse/WebQuery*, *://*/*ThinkLogChatUI*, *://*/*WebQueryAPI*` can dispatch the recorded DOM custom event and supply its `detail`. The content script forwards that event data to the extension runtime, and the service worker uses the supplied URL and form data in a privileged POST `fetch`. The report records no origin/authentication check at this bridge. This permits a matching page to initiate the recorded request; it does not by itself establish that third-party credentials are included.

- Ground Truth Flow: `gtf-a3f1c79ded4c706b`
- Severity recorded by the analysis: **CRITICAL**
- Source: `TARGET_CUSTOM_EVENT` (target.addEventListener(windowManagerEventEx)) in csNativeMessage at L55:C0 -> L63:C6
- Sink: `FETCH_RESOURCE` ([Unknown URL]) in bsWindowManagement at L550:C31 -> L557:C14
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Analysis and validation

- Static (ExPGuard): verdict `TRUE_POSITIVE`, confidence 0.6; report `extensions/ghdbmcfiemkndpbhfeifkneiolehkcli_7.4.320.0/static/static_report.json`.
- Dynamic (ExPGuard): `INCONCLUSIVE_AFTER_DEBUG` (basis `inconclusive`); the dynamic agent exceeded its 30-second budget, so this run did not establish a decisive runtime result; report `extensions/ghdbmcfiemkndpbhfeifkneiolehkcli_7.4.320.0/dynamic/dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install version `7.4.320.0` in a disposable chrome profile and open any HTTP(S) page covered by the extension content script.
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

- ExPGuard: source report `ExPGuard-Opti/chrome/flow-verification-results-no-duplicate.json`; static report `extensions/ghdbmcfiemkndpbhfeifkneiolehkcli_7.4.320.0/static/static_report.json`; dynamic report `extensions/ghdbmcfiemkndpbhfeifkneiolehkcli_7.4.320.0/dynamic/dynamic_report.json`.

### Finding 7: Unauthorized Tab or Window Manipulation

The Ground Truth record traces A page or sender able to reach the recorded message/event source from `TARGET_CUSTOM_EVENT` (target.addEventListener(windowManagerEventEx)) in csNativeMessage at L55:C0 -> L63:C6 to the privileged sink `CHROME_WINDOWS_UPDATE_OPTIONS` in bsWindowManagement at L253:C20 -> L258:C22. The source scope is on pages matching `*://*/*SynapseSignOn/sts/login*, *://*/ImageViewer*, *://*/*PowerJacket*, *://*/WorkflowUI*, *://*/*Client.Web*, *://*/Synapse/WebQuery*, *://*/*ThinkLogChatUI*, *://*/*WebQueryAPI*`. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-af245713e99be975`
- Severity recorded by the analysis: **CRITICAL**
- Source: `TARGET_CUSTOM_EVENT` (target.addEventListener(windowManagerEventEx)) in csNativeMessage at L55:C0 -> L63:C6
- Sink: `CHROME_WINDOWS_UPDATE_OPTIONS` in bsWindowManagement at L253:C20 -> L258:C22
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Analysis and validation

- Dynamic (ExPGuard): `CONFIRMED` (basis `runtime_reproduced`; evidence stage `MARKER_REACHED`); runtime reproduction recorded; report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\chrome\extensions\ghdbmcfiemkndpbhfeifkneiolehkcli_7.4.320.0\dynamic\dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `7.4.320.0` in a disposable chrome profile.
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

- ExPGuard: source report `ExPGuard-Opti/chrome/flow-verification-results-no-duplicate.json`; static report `not recorded`; dynamic report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\chrome\extensions\ghdbmcfiemkndpbhfeifkneiolehkcli_7.4.320.0\dynamic\dynamic_report.json`.

### Finding 8: Unauthorized Tab or Window Manipulation

The Ground Truth record traces A page or sender able to reach the recorded message/event source from `TARGET_CUSTOM_EVENT` (target.addEventListener(windowManagerEventEx)) in csNativeMessage at L55:C0 -> L63:C6 to the privileged sink `CHROME_TABS_CREATE_OPTIONS` in bsWindowManagement at L283:C8 -> L286:C10. The source scope is on pages matching `*://*/*SynapseSignOn/sts/login*, *://*/ImageViewer*, *://*/*PowerJacket*, *://*/WorkflowUI*, *://*/*Client.Web*, *://*/Synapse/WebQuery*, *://*/*ThinkLogChatUI*, *://*/*WebQueryAPI*`. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-b91b77cb654d8656`
- Severity recorded by the analysis: **CRITICAL**
- Source: `TARGET_CUSTOM_EVENT` (target.addEventListener(windowManagerEventEx)) in csNativeMessage at L55:C0 -> L63:C6
- Sink: `CHROME_TABS_CREATE_OPTIONS` in bsWindowManagement at L283:C8 -> L286:C10
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Analysis and validation

- Static (ExPGuard): verdict `TRUE_POSITIVE`, confidence 0.6; report `extensions/ghdbmcfiemkndpbhfeifkneiolehkcli_7.4.320.0/static/static_report.json`.
- Dynamic (ExPGuard): `TOOL_LIMITATION` (basis `inconclusive`); this result does not independently confirm execution at the sink; report `extensions/ghdbmcfiemkndpbhfeifkneiolehkcli_7.4.320.0/dynamic/dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `7.4.320.0` in a disposable chrome profile.
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

- ExPGuard: source report `ExPGuard-Opti/chrome/flow-verification-results-no-duplicate.json`; static report `extensions/ghdbmcfiemkndpbhfeifkneiolehkcli_7.4.320.0/static/static_report.json`; dynamic report `extensions/ghdbmcfiemkndpbhfeifkneiolehkcli_7.4.320.0/dynamic/dynamic_report.json`.

### Finding 9: Unauthorized Tab or Window Manipulation

The Ground Truth record traces A page or sender able to reach the recorded message/event source from `TARGET_CUSTOM_EVENT` (target.addEventListener(windowManagerEventEx)) in csNativeMessage at L55:C0 -> L63:C6 to the privileged sink `CHROME_WINDOWS_CREATE_OPTIONS` in bsWindowManagement at L389:C12 -> L397:C14. The source scope is on pages matching `*://*/*SynapseSignOn/sts/login*, *://*/ImageViewer*, *://*/*PowerJacket*, *://*/WorkflowUI*, *://*/*Client.Web*, *://*/Synapse/WebQuery*, *://*/*ThinkLogChatUI*, *://*/*WebQueryAPI*`. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-bbdae8aa68cf099f`
- Severity recorded by the analysis: **CRITICAL**
- Source: `TARGET_CUSTOM_EVENT` (target.addEventListener(windowManagerEventEx)) in csNativeMessage at L55:C0 -> L63:C6
- Sink: `CHROME_WINDOWS_CREATE_OPTIONS` in bsWindowManagement at L389:C12 -> L397:C14
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Analysis and validation

- Dynamic (ExPGuard): `CONFIRMED` (basis `runtime_reproduced`; evidence stage `MARKER_REACHED`); runtime reproduction recorded; report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\chrome\extensions\ghdbmcfiemkndpbhfeifkneiolehkcli_7.4.320.0\dynamic\dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `7.4.320.0` in a disposable chrome profile.
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

- ExPGuard: source report `ExPGuard-Opti/chrome/flow-verification-results-no-duplicate.json`; static report `not recorded`; dynamic report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\chrome\extensions\ghdbmcfiemkndpbhfeifkneiolehkcli_7.4.320.0\dynamic\dynamic_report.json`.

### Finding 10: Unauthorized Tab or Window Manipulation

The Ground Truth record traces A page or sender able to reach the recorded message/event source from `TARGET_CUSTOM_EVENT` (target.addEventListener(windowManagerEventEx)) in csNativeMessage at L55:C0 -> L63:C6 to the privileged sink `CHROME_WINDOWS_UPDATE_OPTIONS` in bsWindowManagement at L759:C4 -> L765:C6. The source scope is on pages matching `*://*/*SynapseSignOn/sts/login*, *://*/ImageViewer*, *://*/*PowerJacket*, *://*/WorkflowUI*, *://*/*Client.Web*, *://*/Synapse/WebQuery*, *://*/*ThinkLogChatUI*, *://*/*WebQueryAPI*`. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-f668d85dc56cc675`
- Severity recorded by the analysis: **CRITICAL**
- Source: `TARGET_CUSTOM_EVENT` (target.addEventListener(windowManagerEventEx)) in csNativeMessage at L55:C0 -> L63:C6
- Sink: `CHROME_WINDOWS_UPDATE_OPTIONS` in bsWindowManagement at L759:C4 -> L765:C6
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Analysis and validation

- Dynamic (ExPGuard): `CONFIRMED` (basis `runtime_reproduced`; evidence stage `MARKER_REACHED`); runtime reproduction recorded; report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\chrome\extensions\ghdbmcfiemkndpbhfeifkneiolehkcli_7.4.320.0\dynamic\dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `7.4.320.0` in a disposable chrome profile.
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

- ExPGuard: source report `ExPGuard-Opti/chrome/flow-verification-results-no-duplicate.json`; static report `not recorded`; dynamic report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\chrome\extensions\ghdbmcfiemkndpbhfeifkneiolehkcli_7.4.320.0\dynamic\dynamic_report.json`.


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
