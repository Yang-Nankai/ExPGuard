# Security Vulnerability Report: Medium CSRF via Privileged Network Request and Unauthorized Browser Policy Change in Metastream Remote

## Summary

We are writing on behalf of a security research team from Nankai University and the University of Liverpool. Our Ground Truth review identified **6 Flow(s)** in **Metastream Remote** (chrome, extension ID `fakegmdomhmegokfomgmkbopjibonfcp`, version `2.4.0`).
The recorded issue type(s): **CSRF via Privileged Network Request; Unauthorized Browser Policy Change**.

## Affected Extension Details

- Name: Metastream Remote
- Platform: chrome
- Extension ID: `fakegmdomhmegokfomgmkbopjibonfcp`
- Dataset version: `2.4.0`
- Store version at review: `2.4.0`
- Users: 200000
- Analysis tools: ExPGuard

## Findings

### Finding 1: Unauthorized Browser Policy Modification

The Ground Truth record traces A page or sender able to reach the recorded message/event source from `WINDOW_MESSAGE_EVENT` (window.addEventListener(message)) in app at L60:C73 -> L60:C79 to the privileged sink `CHROME_DECLARATIVENETREQUEST_RULES` in background at L632:C4 -> L648:C6. The source scope is on pages matching `https://app.getmetastream.com/*, *://local.getmetastream.com/*, *://127.0.0.1/*, *://localhost/*`. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-0719d6782437fae8`
- Severity recorded by the analysis: **MEDIUM**
- Source: `WINDOW_MESSAGE_EVENT` (window.addEventListener(message)) in app at L60:C73 -> L60:C79
- Sink: `CHROME_DECLARATIVENETREQUEST_RULES` in background at L632:C4 -> L648:C6
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Analysis and validation

- Dynamic (ExPGuard): `INCONCLUSIVE_AFTER_DEBUG` (basis `inconclusive`; evidence stage `LISTENER_READY`); the dynamic run did not establish a decisive runtime result; report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\chrome\extensions\fakegmdomhmegokfomgmkbopjibonfcp_2.4.0\dynamic\dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `2.4.0` in a disposable chrome profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Use only a harmless marker in a disposable profile.
window.postMessage({ marker: "EXPGuard_test_marker" }, "*");
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/chrome/flow-verification-results-no-duplicate.json`; static report `not recorded`; dynamic report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\chrome\extensions\fakegmdomhmegokfomgmkbopjibonfcp_2.4.0\dynamic\dynamic_report.json`.

### Finding 2: Unauthorized Browser Policy Modification

The Ground Truth record traces An external extension able to message this extension from `CHROME_ONMESSAGEEXTERNAL_MESSAGE` (chrome.runtime.onMessageExternal.addListener[message]) in background at L705:C21 -> L705:C27 to the privileged sink `CHROME_DECLARATIVENETREQUEST_RULES` in background at L632:C4 -> L648:C6. The source scope is in the recorded source context. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-39f50a117691bdde`
- Severity recorded by the analysis: **MEDIUM**
- Source: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` (chrome.runtime.onMessageExternal.addListener[message]) in background at L705:C21 -> L705:C27
- Sink: `CHROME_DECLARATIVENETREQUEST_RULES` in background at L632:C4 -> L648:C6
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (EXTERNALLY_CONNECTABLE); sink grants capability beyond the source origin

#### Analysis and validation

- Static (ExPGuard): verdict `TRUE_POSITIVE`, confidence 0.6; report `extensions/fakegmdomhmegokfomgmkbopjibonfcp_2.4.0/static/static_report.json`.
- Dynamic (ExPGuard): `EXTERNAL_CONDITION_REQUIRED` (basis `external_condition_required`); a sender-side precondition was recorded; this is not an unconditional runtime reproduction; report `extensions/fakegmdomhmegokfomgmkbopjibonfcp_2.4.0/dynamic/dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `2.4.0` in a disposable chrome profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Use only a harmless marker in a disposable profile.
window.postMessage({ marker: "EXPGuard_test_marker" }, "*");
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/chrome/flow-verification-results-no-duplicate.json`; static report `extensions/fakegmdomhmegokfomgmkbopjibonfcp_2.4.0/static/static_report.json`; dynamic report `extensions/fakegmdomhmegokfomgmkbopjibonfcp_2.4.0/dynamic/dynamic_report.json`.

### Finding 3: Unauthorized Browser Policy Modification

The Ground Truth record traces An external extension able to message this extension from `CHROME_ONMESSAGEEXTERNAL_MESSAGE` (chrome.runtime.onMessageExternal.addListener[message]) in background at L705:C21 -> L705:C27 to the privileged sink `CHROME_DECLARATIVENETREQUEST_RULES` in background at L660:C2 -> L663:C4. The source scope is in the recorded source context. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-4055084b2e2af61a`
- Severity recorded by the analysis: **MEDIUM**
- Source: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` (chrome.runtime.onMessageExternal.addListener[message]) in background at L705:C21 -> L705:C27
- Sink: `CHROME_DECLARATIVENETREQUEST_RULES` in background at L660:C2 -> L663:C4
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (EXTERNALLY_CONNECTABLE); sink grants capability beyond the source origin

#### Analysis and validation

- Dynamic (ExPGuard): `CONFIRMED` (basis `runtime_reproduced`; evidence stage `MARKER_REACHED`); runtime reproduction recorded; report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\chrome\extensions\fakegmdomhmegokfomgmkbopjibonfcp_2.4.0\dynamic\dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `2.4.0` in a disposable chrome profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Use only a harmless marker in a disposable profile.
window.postMessage({ marker: "EXPGuard_test_marker" }, "*");
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/chrome/flow-verification-results-no-duplicate.json`; static report `not recorded`; dynamic report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\chrome\extensions\fakegmdomhmegokfomgmkbopjibonfcp_2.4.0\dynamic\dynamic_report.json`.

### Finding 4: Cross-Site Request Forgery (CSRF) / Privileged Network Request

The Ground Truth record traces An external extension able to message this extension from `CHROME_ONMESSAGEEXTERNAL_MESSAGE` (chrome.runtime.onMessageExternal.addListener[message]) in background at L705:C21 -> L705:C27 to the privileged sink `FETCH_RESOURCE` ([Unknown URL]) in background at L653:C34 -> L653:C68. The source scope is in the recorded source context. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-73f9cf8d85880cdd`
- Severity recorded by the analysis: **MEDIUM**
- Source: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` (chrome.runtime.onMessageExternal.addListener[message]) in background at L705:C21 -> L705:C27
- Sink: `FETCH_RESOURCE` ([Unknown URL]) in background at L653:C34 -> L653:C68
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (EXTERNALLY_CONNECTABLE); sink grants capability beyond the source origin

#### Analysis and validation

- Static (ExPGuard): verdict `TRUE_POSITIVE`, confidence 0.6; report `extensions/fakegmdomhmegokfomgmkbopjibonfcp_2.4.0/static/static_report.json`.
- Dynamic (ExPGuard): `EXTERNAL_CONDITION_REQUIRED` (basis `external_condition_required`); a sender-side precondition was recorded; this is not an unconditional runtime reproduction; report `extensions/fakegmdomhmegokfomgmkbopjibonfcp_2.4.0/dynamic/dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `2.4.0` in a disposable chrome profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Use only a harmless marker in a disposable profile.
window.postMessage({ marker: "EXPGuard_test_marker" }, "*");
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/chrome/flow-verification-results-no-duplicate.json`; static report `extensions/fakegmdomhmegokfomgmkbopjibonfcp_2.4.0/static/static_report.json`; dynamic report `extensions/fakegmdomhmegokfomgmkbopjibonfcp_2.4.0/dynamic/dynamic_report.json`.

### Finding 5: Cross-Site Request Forgery (CSRF) / Privileged Network Request

The Ground Truth record traces A page or sender able to reach the recorded message/event source from `WINDOW_MESSAGE_EVENT` (window.addEventListener(message)) in app at L60:C73 -> L60:C79 to the privileged sink `FETCH_RESOURCE` ([Unknown URL]) in background at L653:C34 -> L653:C68. The source scope is on pages matching `https://app.getmetastream.com/*, *://local.getmetastream.com/*, *://127.0.0.1/*, *://localhost/*`. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-95613aa238b36e8a`
- Severity recorded by the analysis: **MEDIUM**
- Source: `WINDOW_MESSAGE_EVENT` (window.addEventListener(message)) in app at L60:C73 -> L60:C79
- Sink: `FETCH_RESOURCE` ([Unknown URL]) in background at L653:C34 -> L653:C68
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Analysis and validation

- Static (ExPGuard): verdict `TRUE_POSITIVE`, confidence 0.6; report `extensions/fakegmdomhmegokfomgmkbopjibonfcp_2.4.0/static/static_report.json`.
- Dynamic (ExPGuard): `INCONCLUSIVE_AFTER_DEBUG` (basis `inconclusive`; evidence stage `LISTENER_READY`); the dynamic run did not establish a decisive runtime result; report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\chrome\extensions\fakegmdomhmegokfomgmkbopjibonfcp_2.4.0\dynamic\dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `2.4.0` in a disposable chrome profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Use only a harmless marker in a disposable profile.
window.postMessage({ marker: "EXPGuard_test_marker" }, "*");
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/chrome/flow-verification-results-no-duplicate.json`; static report `extensions/fakegmdomhmegokfomgmkbopjibonfcp_2.4.0/static/static_report.json`; dynamic report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\chrome\extensions\fakegmdomhmegokfomgmkbopjibonfcp_2.4.0\dynamic\dynamic_report.json`.

### Finding 6: Unauthorized Browser Policy Modification

The Ground Truth record traces A page or sender able to reach the recorded message/event source from `WINDOW_MESSAGE_EVENT` (window.addEventListener(message)) in app at L60:C73 -> L60:C79 to the privileged sink `CHROME_DECLARATIVENETREQUEST_RULES` in background at L660:C2 -> L663:C4. The source scope is on pages matching `https://app.getmetastream.com/*, *://local.getmetastream.com/*, *://127.0.0.1/*, *://localhost/*`. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-a849c2a322911daf`
- Severity recorded by the analysis: **MEDIUM**
- Source: `WINDOW_MESSAGE_EVENT` (window.addEventListener(message)) in app at L60:C73 -> L60:C79
- Sink: `CHROME_DECLARATIVENETREQUEST_RULES` in background at L660:C2 -> L663:C4
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Analysis and validation

- Dynamic (ExPGuard): `INCONCLUSIVE_AFTER_DEBUG` (basis `inconclusive`; evidence stage `LISTENER_READY`); the dynamic run did not establish a decisive runtime result; report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\chrome\extensions\fakegmdomhmegokfomgmkbopjibonfcp_2.4.0\dynamic\dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `2.4.0` in a disposable chrome profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Use only a harmless marker in a disposable profile.
window.postMessage({ marker: "EXPGuard_test_marker" }, "*");
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/chrome/flow-verification-results-no-duplicate.json`; static report `not recorded`; dynamic report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\chrome\extensions\fakegmdomhmegokfomgmkbopjibonfcp_2.4.0\dynamic\dynamic_report.json`.


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
