# Security Vulnerability Report: Critical Extension Storage Poisoning and Sensitive Data Exposure in Speech Recognition Anywhere

## Summary

We are writing on behalf of a security research team from Nankai University and the University of Liverpool. Our Ground Truth review identified **6 Flow(s)** in **Speech Recognition Anywhere** (chrome, extension ID `kdnnmhpmcakdilnofmllgcigkibjonof`, version `1.7.41`).
The recorded issue type(s): **Extension Storage Poisoning; Sensitive Data Exposure**.

The store currently reports version `1.7.42`. The update revalidation is summarized per tool below. This report covers only the original Flow(s); newly introduced Flow(s) are out of scope. Any mixed result, tool failure, or incomplete automated run is called out explicitly and should not be read as a final remediation determination.

## Affected Extension Details

- Name: Speech Recognition Anywhere
- Platform: chrome
- Extension ID: `kdnnmhpmcakdilnofmllgcigkibjonof`
- Dataset version: `1.7.41`
- Store version at review: `1.7.42`
- Users: 30000
- Analysis tools: DoubleX, ExPGuard

## Findings

### Finding 1: Storage Poisoning

The Ground Truth record traces A page or sender able to reach the recorded message/event source from `WINDOW_CUSTOM_EVENT` (window.addEventListener(paddle)) in storage at L168:C5 -> L168:C13 to the privileged sink `CHROME_LOCAL_STORAGE` (settings) in storage at L228:C4 -> L237:C6. The source scope is on pages matching `<all_urls>`. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-1fc60970e827c079`
- Severity recorded by the analysis: **CRITICAL**
- Source: `WINDOW_CUSTOM_EVENT` (window.addEventListener(paddle)) in storage at L168:C5 -> L168:C13
- Sink: `CHROME_LOCAL_STORAGE` (settings) in storage at L228:C4 -> L237:C6
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Updated-version tool result

- ExPGuard: `still_detected`; original source `WINDOW_CUSTOM_EVENT` → sink `CHROME_LOCAL_STORAGE`; candidate matches: 8

#### Analysis and validation

- Dynamic (ExPGuard): `PARTIAL` (basis `non_decisive`; evidence stage `SINK_REACHED`); the recorded replay did not establish the complete source-to-sink effect; report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\chrome\extensions\kdnnmhpmcakdilnofmllgcigkibjonof_1.7.41\dynamic\dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `1.7.41` in a disposable chrome profile.
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

- ExPGuard: source report `ExPGuard-Opti/chrome/flow-verification-results-no-duplicate.json`; static report `not recorded`; dynamic report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\chrome\extensions\kdnnmhpmcakdilnofmllgcigkibjonof_1.7.41\dynamic\dynamic_report.json`.

### Finding 2: Storage Poisoning

The Ground Truth record traces A page or sender able to reach the recorded message/event source from `WINDOW_CUSTOM_EVENT` (window.addEventListener(lemon)) in storage at L209:C5 -> L209:C13 to the privileged sink `CHROME_LOCAL_STORAGE` (order_id) in storage at L228:C4 -> L237:C6. The source scope is on pages matching `<all_urls>`. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-2d77fd1bd0c452c6`
- Severity recorded by the analysis: **CRITICAL**
- Source: `WINDOW_CUSTOM_EVENT` (window.addEventListener(lemon)) in storage at L209:C5 -> L209:C13
- Sink: `CHROME_LOCAL_STORAGE` (order_id) in storage at L228:C4 -> L237:C6
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Updated-version tool result

- ExPGuard: `still_detected`; original source `WINDOW_CUSTOM_EVENT` → sink `CHROME_LOCAL_STORAGE`; candidate matches: 8

#### Analysis and validation

- Dynamic (ExPGuard): `PARTIAL` (basis `non_decisive`; evidence stage `SINK_REACHED`); the recorded replay did not establish the complete source-to-sink effect; report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\chrome\extensions\kdnnmhpmcakdilnofmllgcigkibjonof_1.7.41\dynamic\dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `1.7.41` in a disposable chrome profile.
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

- ExPGuard: source report `ExPGuard-Opti/chrome/flow-verification-results-no-duplicate.json`; static report `not recorded`; dynamic report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\chrome\extensions\kdnnmhpmcakdilnofmllgcigkibjonof_1.7.41\dynamic\dynamic_report.json`.

### Finding 3: Sensitive Data Exposure

The Ground Truth record traces Input reaching the recorded source from `CHROME_IDENTITY_PROFILE` (identity.profileUserInfo) in background at L463:C17 -> L463:C25 to the privileged sink `CHROME_RUNTIME_ONMESSAGEEXTERNAL_SENDRESPONSE` (chrome.runtime.onMessageExternal.addListener[sendResponse]) in background at L465:C5 -> L465:C23. The source scope is in the recorded source context. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-3e3e6ab825f89c39`
- Severity recorded by the analysis: **HIGH**
- Source: `CHROME_IDENTITY_PROFILE` (identity.profileUserInfo) in background at L463:C17 -> L463:C25
- Sink: `CHROME_RUNTIME_ONMESSAGEEXTERNAL_SENDRESPONSE` (chrome.runtime.onMessageExternal.addListener[sendResponse]) in background at L465:C5 -> L465:C23
- Tools reporting this Flow: ExPGuard, DoubleX

- Privilege boundary recorded: `True` (EXTERNALLY_CONNECTABLE); sink grants capability beyond the source origin

#### Updated-version tool result

- ExPGuard: `still_detected`; original source `CHROME_IDENTITY_PROFILE` → sink `CHROME_RUNTIME_ONMESSAGEEXTERNAL_SENDRESPONSE`; candidate matches: 1
- DoubleX: `still_detected`; original source `CHROME_IDENTITY_PROFILE` → sink `WINDOW_POSTMESSAGE`; candidate matches: 1

#### Analysis and validation

- Dynamic (ExPGuard): `INCONCLUSIVE_AFTER_DEBUG` (basis `inconclusive`; evidence stage `LISTENER_READY`); the dynamic run did not establish a decisive runtime result; report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\chrome\extensions\kdnnmhpmcakdilnofmllgcigkibjonof_1.7.41\dynamic\dynamic_report.json`.
- Static (DoubleX): verdict `FALSE_POSITIVE`, confidence 0.6; report `extensions/kdnnmhpmcakdilnofmllgcigkibjonof_1.7.41/static/static_report.json`.
- Dynamic (DoubleX): `SINK_NOT_FIRED` (basis `runtime_or_static_dynamic_evidence`); the recorded replay did not establish the complete source-to-sink effect; report `extensions/kdnnmhpmcakdilnofmllgcigkibjonof_1.7.41/dynamic/dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `1.7.41` in a disposable chrome profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```text
Deliver the benign marker EXPGuard_test_marker through the source shown in
the finding, then observe whether it reaches the privileged sink.
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/chrome/flow-verification-results-no-duplicate.json`; static report `not recorded`; dynamic report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\chrome\extensions\kdnnmhpmcakdilnofmllgcigkibjonof_1.7.41\dynamic\dynamic_report.json`.
- DoubleX: source report `DoubleX/chrome/flow-verification-results-no-duplicate.json`; static report `extensions/kdnnmhpmcakdilnofmllgcigkibjonof_1.7.41/static/static_report.json`; dynamic report `extensions/kdnnmhpmcakdilnofmllgcigkibjonof_1.7.41/dynamic/dynamic_report.json`.

### Finding 4: Storage Poisoning

The Ground Truth record traces A page or sender able to reach the recorded message/event source from `WINDOW_CUSTOM_EVENT` (window.addEventListener(lemon)) in storage at L209:C5 -> L209:C13 to the privileged sink `CHROME_LOCAL_STORAGE` (settings) in content at L90:C1 -> L100:C3. The source scope is on pages matching `<all_urls>`. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-6ab40833bdfd3046`
- Severity recorded by the analysis: **CRITICAL**
- Source: `WINDOW_CUSTOM_EVENT` (window.addEventListener(lemon)) in storage at L209:C5 -> L209:C13
- Sink: `CHROME_LOCAL_STORAGE` (settings) in content at L90:C1 -> L100:C3
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Updated-version tool result

- ExPGuard: `still_detected`; original source `WINDOW_CUSTOM_EVENT` → sink `CHROME_LOCAL_STORAGE`; candidate matches: 8

#### Analysis and validation

- Dynamic (ExPGuard): `PARTIAL` (basis `non_decisive`; evidence stage `SINK_REACHED`); the recorded replay did not establish the complete source-to-sink effect; report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\chrome\extensions\kdnnmhpmcakdilnofmllgcigkibjonof_1.7.41\dynamic\dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `1.7.41` in a disposable chrome profile.
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

- ExPGuard: source report `ExPGuard-Opti/chrome/flow-verification-results-no-duplicate.json`; static report `not recorded`; dynamic report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\chrome\extensions\kdnnmhpmcakdilnofmllgcigkibjonof_1.7.41\dynamic\dynamic_report.json`.

### Finding 5: Storage Poisoning

The Ground Truth record traces A page or sender able to reach the recorded message/event source from `WINDOW_CUSTOM_EVENT` (window.addEventListener(paddle)) in storage at L168:C5 -> L168:C13 to the privileged sink `CHROME_LOCAL_STORAGE` (settings) in content at L90:C1 -> L100:C3. The source scope is on pages matching `<all_urls>`. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-7eaefd88d9457a60`
- Severity recorded by the analysis: **CRITICAL**
- Source: `WINDOW_CUSTOM_EVENT` (window.addEventListener(paddle)) in storage at L168:C5 -> L168:C13
- Sink: `CHROME_LOCAL_STORAGE` (settings) in content at L90:C1 -> L100:C3
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Updated-version tool result

- ExPGuard: `still_detected`; original source `WINDOW_CUSTOM_EVENT` → sink `CHROME_LOCAL_STORAGE`; candidate matches: 8

#### Analysis and validation

- Static (ExPGuard): verdict `TRUE_POSITIVE`, confidence 0.6; report `extensions/kdnnmhpmcakdilnofmllgcigkibjonof_1.7.41/static/static_report.json`.
- Dynamic (ExPGuard): `PARTIAL` (basis `non_decisive`; evidence stage `SINK_REACHED`); the recorded replay did not establish the complete source-to-sink effect; report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\chrome\extensions\kdnnmhpmcakdilnofmllgcigkibjonof_1.7.41\dynamic\dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `1.7.41` in a disposable chrome profile.
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

- ExPGuard: source report `ExPGuard-Opti/chrome/flow-verification-results-no-duplicate.json`; static report `extensions/kdnnmhpmcakdilnofmllgcigkibjonof_1.7.41/static/static_report.json`; dynamic report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\chrome\extensions\kdnnmhpmcakdilnofmllgcigkibjonof_1.7.41\dynamic\dynamic_report.json`.

### Finding 6: Storage Poisoning

The Ground Truth record traces A page or sender able to reach the recorded message/event source from `WINDOW_CUSTOM_EVENT` (window.addEventListener(paddle)) in storage at L168:C5 -> L168:C13 to the privileged sink `CHROME_LOCAL_STORAGE` (order_id) in storage at L186:C4 -> L195:C6. The source scope is on pages matching `<all_urls>`. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-a4cb26c7ce5b120e`
- Severity recorded by the analysis: **CRITICAL**
- Source: `WINDOW_CUSTOM_EVENT` (window.addEventListener(paddle)) in storage at L168:C5 -> L168:C13
- Sink: `CHROME_LOCAL_STORAGE` (order_id) in storage at L186:C4 -> L195:C6
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Updated-version tool result

- ExPGuard: `still_detected`; original source `WINDOW_CUSTOM_EVENT` → sink `CHROME_LOCAL_STORAGE`; candidate matches: 8

#### Analysis and validation

- Dynamic (ExPGuard): `PARTIAL` (basis `non_decisive`; evidence stage `SINK_REACHED`); the recorded replay did not establish the complete source-to-sink effect; report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\chrome\extensions\kdnnmhpmcakdilnofmllgcigkibjonof_1.7.41\dynamic\dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `1.7.41` in a disposable chrome profile.
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

- ExPGuard: source report `ExPGuard-Opti/chrome/flow-verification-results-no-duplicate.json`; static report `not recorded`; dynamic report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\chrome\extensions\kdnnmhpmcakdilnofmllgcigkibjonof_1.7.41\dynamic\dynamic_report.json`.


## Recommendations

1. Do not let page-controlled cookies or DOM values select extension-owned storage values; validate the expected value and keep credentials in extension-owned UI/state.
2. Treat storage writes as privileged state changes: use an allowlisted schema, reject attacker-controlled keys, and avoid merging untrusted objects into extension state.
3. Never return sensitive extension data to an untrusted page or external sender; enforce an explicit origin and sender allowlist.
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
