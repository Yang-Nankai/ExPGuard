# Security Vulnerability Report: High Extension Storage Poisoning and Unauthorized Tab/Window Control in Scribe: AI Documentation, SOPs & Process Intelligence

## Summary

We are writing on behalf of a security research team from Nankai University and the University of Liverpool. Our Ground Truth review identified **8 Flow(s)** in **Scribe: AI Documentation, SOPs & Process Intelligence** (chrome, extension ID `okfkdaglfjjjfefdcppliegebpoegaii`, version `104.20.0`).
The recorded issue type(s): **Extension Storage Poisoning; Unauthorized Tab/Window Control**.

The store currently reports version `104.32.1`. The update revalidation is summarized per tool below. This report covers only the original Flow(s); newly introduced Flow(s) are out of scope. Any mixed result, tool failure, or incomplete automated run is called out explicitly and should not be read as a final remediation determination.

## Affected Extension Details

- Name: Scribe: AI Documentation, SOPs & Process Intelligence
- Platform: chrome
- Extension ID: `okfkdaglfjjjfefdcppliegebpoegaii`
- Dataset version: `104.20.0`
- Store version at review: `104.32.1`
- Users: 1000000
- Analysis tools: ExPGuard

## Findings

### Finding 1: Storage Poisoning

The Ground Truth record traces An external extension able to message this extension from `CHROME_ONMESSAGEEXTERNAL_MESSAGE` (chrome.runtime.onMessageExternal.addListener[message]) in assets/index.js-Cvbn7zHo at L15:C17778 -> L15:C17779 to the privileged sink `CHROME_LOCAL_STORAGE` (isGuiding) in assets/index.js-Cvbn7zHo at L1:C9064 -> L1:C9114. The source scope is in the recorded source context. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-0f777cb321ad54b1`
- Severity recorded by the analysis: **HIGH**
- Source: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` (chrome.runtime.onMessageExternal.addListener[message]) in assets/index.js-Cvbn7zHo at L15:C17778 -> L15:C17779
- Sink: `CHROME_LOCAL_STORAGE` (isGuiding) in assets/index.js-Cvbn7zHo at L1:C9064 -> L1:C9114
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (EXTERNALLY_CONNECTABLE); sink grants capability beyond the source origin

#### Updated-version tool result

- ExPGuard: `still_detected`; original source `CHROME_ONMESSAGEEXTERNAL_MESSAGE` → sink `CHROME_LOCAL_STORAGE`; candidate matches: 5

#### Analysis and validation

- Dynamic (ExPGuard): `CONFIRMED` (basis `runtime_reproduced`; evidence stage `MARKER_REACHED`); runtime reproduction recorded; report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\chrome\extensions\okfkdaglfjjjfefdcppliegebpoegaii_104.20.0\dynamic\dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `104.20.0` in a disposable chrome profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Use only a harmless marker in a disposable profile.
window.postMessage({ marker: "EXPGuard_test_marker" }, "*");
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/chrome/flow-verification-results-no-duplicate.json`; static report `not recorded`; dynamic report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\chrome\extensions\okfkdaglfjjjfefdcppliegebpoegaii_104.20.0\dynamic\dynamic_report.json`.

### Finding 2: Storage Poisoning

The Ground Truth record traces An external extension able to message this extension from `CHROME_ONMESSAGEEXTERNAL_MESSAGE` (chrome.runtime.onMessageExternal.addListener[message]) in assets/index.js-Cvbn7zHo at L15:C17778 -> L15:C17779 to the privileged sink `CHROME_LOCAL_STORAGE` (isPinExtensionModalVisible) in assets/index.js-Cvbn7zHo at L15:C201844 -> L15:C201910. The source scope is in the recorded source context. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-19019b7cc68fd5e1`
- Severity recorded by the analysis: **HIGH**
- Source: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` (chrome.runtime.onMessageExternal.addListener[message]) in assets/index.js-Cvbn7zHo at L15:C17778 -> L15:C17779
- Sink: `CHROME_LOCAL_STORAGE` (isPinExtensionModalVisible) in assets/index.js-Cvbn7zHo at L15:C201844 -> L15:C201910
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (EXTERNALLY_CONNECTABLE); sink grants capability beyond the source origin

#### Updated-version tool result

- ExPGuard: `still_detected`; original source `CHROME_ONMESSAGEEXTERNAL_MESSAGE` → sink `CHROME_LOCAL_STORAGE`; candidate matches: 5

#### Analysis and validation

- Dynamic (ExPGuard): `CONFIRMED` (basis `runtime_reproduced`; evidence stage `MARKER_REACHED`); runtime reproduction recorded; report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\chrome\extensions\okfkdaglfjjjfefdcppliegebpoegaii_104.20.0\dynamic\dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `104.20.0` in a disposable chrome profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Use only a harmless marker in a disposable profile.
window.postMessage({ marker: "EXPGuard_test_marker" }, "*");
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/chrome/flow-verification-results-no-duplicate.json`; static report `not recorded`; dynamic report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\chrome\extensions\okfkdaglfjjjfefdcppliegebpoegaii_104.20.0\dynamic\dynamic_report.json`.

### Finding 3: Unauthorized Tab or Window Manipulation

The Ground Truth record traces An external extension able to message this extension from `CHROME_ONMESSAGEEXTERNAL_MESSAGE` (chrome.runtime.onMessageExternal.addListener[message]) in assets/index.js-Cvbn7zHo at L15:C17778 -> L15:C17779 to the privileged sink `CHROME_TABS_CREATE_OPTIONS` in assets/index.js-Cvbn7zHo at L1:C6306 -> L1:C6344. The source scope is in the recorded source context. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-1f571ce94df14014`
- Severity recorded by the analysis: **HIGH**
- Source: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` (chrome.runtime.onMessageExternal.addListener[message]) in assets/index.js-Cvbn7zHo at L15:C17778 -> L15:C17779
- Sink: `CHROME_TABS_CREATE_OPTIONS` in assets/index.js-Cvbn7zHo at L1:C6306 -> L1:C6344
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (EXTERNALLY_CONNECTABLE); sink grants capability beyond the source origin

#### Updated-version tool result

- ExPGuard: `still_detected`; original source `CHROME_ONMESSAGEEXTERNAL_MESSAGE` → sink `CHROME_TABS_CREATE_OPTIONS`; candidate matches: 4

#### Analysis and validation

- Dynamic (ExPGuard): `INCONCLUSIVE_AFTER_DEBUG` (basis `inconclusive`; evidence stage `LISTENER_READY`); the dynamic run did not establish a decisive runtime result; report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\chrome\extensions\okfkdaglfjjjfefdcppliegebpoegaii_104.20.0\dynamic\dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `104.20.0` in a disposable chrome profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Use only a harmless marker in a disposable profile.
window.postMessage({ marker: "EXPGuard_test_marker" }, "*");
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/chrome/flow-verification-results-no-duplicate.json`; static report `not recorded`; dynamic report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\chrome\extensions\okfkdaglfjjjfefdcppliegebpoegaii_104.20.0\dynamic\dynamic_report.json`.

### Finding 4: Unauthorized Tab or Window Manipulation

The Ground Truth record traces An external extension able to message this extension from `CHROME_ONMESSAGEEXTERNAL_MESSAGE` (chrome.runtime.onMessageExternal.addListener[message]) in assets/index.js-Cvbn7zHo at L15:C17778 -> L15:C17779 to the privileged sink `CHROME_WINDOWS_CREATE_OPTIONS` in assets/index.js-Cvbn7zHo at L1:C4540 -> L1:C4615. The source scope is in the recorded source context. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-41812ca03c39e266`
- Severity recorded by the analysis: **HIGH**
- Source: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` (chrome.runtime.onMessageExternal.addListener[message]) in assets/index.js-Cvbn7zHo at L15:C17778 -> L15:C17779
- Sink: `CHROME_WINDOWS_CREATE_OPTIONS` in assets/index.js-Cvbn7zHo at L1:C4540 -> L1:C4615
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (EXTERNALLY_CONNECTABLE); sink grants capability beyond the source origin

#### Updated-version tool result

- ExPGuard: `still_detected`; original source `CHROME_ONMESSAGEEXTERNAL_MESSAGE` → sink `CHROME_WINDOWS_CREATE_OPTIONS`; candidate matches: 1

#### Analysis and validation

- Dynamic (ExPGuard): `INCONCLUSIVE_AFTER_DEBUG` (basis `inconclusive`; evidence stage `LISTENER_READY`); the dynamic run did not establish a decisive runtime result; report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\chrome\extensions\okfkdaglfjjjfefdcppliegebpoegaii_104.20.0\dynamic\dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `104.20.0` in a disposable chrome profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Use only a harmless marker in a disposable profile.
window.postMessage({ marker: "EXPGuard_test_marker" }, "*");
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/chrome/flow-verification-results-no-duplicate.json`; static report `not recorded`; dynamic report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\chrome\extensions\okfkdaglfjjjfefdcppliegebpoegaii_104.20.0\dynamic\dynamic_report.json`.

### Finding 5: Unauthorized Tab or Window Manipulation

The Ground Truth record traces An external extension able to message this extension from `CHROME_ONMESSAGEEXTERNAL_MESSAGE` (chrome.runtime.onMessageExternal.addListener[message]) in assets/index.js-Cvbn7zHo at L15:C17778 -> L15:C17779 to the privileged sink `CHROME_TABS_CREATE_OPTIONS` in assets/index.js-Cvbn7zHo at L1:C7566 -> L1:C7616. The source scope is in the recorded source context. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-887316d38fe40f42`
- Severity recorded by the analysis: **HIGH**
- Source: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` (chrome.runtime.onMessageExternal.addListener[message]) in assets/index.js-Cvbn7zHo at L15:C17778 -> L15:C17779
- Sink: `CHROME_TABS_CREATE_OPTIONS` in assets/index.js-Cvbn7zHo at L1:C7566 -> L1:C7616
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (EXTERNALLY_CONNECTABLE); sink grants capability beyond the source origin

#### Updated-version tool result

- ExPGuard: `still_detected`; original source `CHROME_ONMESSAGEEXTERNAL_MESSAGE` → sink `CHROME_TABS_CREATE_OPTIONS`; candidate matches: 4

#### Analysis and validation

- Dynamic (ExPGuard): `INCONCLUSIVE_AFTER_DEBUG` (basis `inconclusive`; evidence stage `LISTENER_READY`); the dynamic run did not establish a decisive runtime result; report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\chrome\extensions\okfkdaglfjjjfefdcppliegebpoegaii_104.20.0\dynamic\dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `104.20.0` in a disposable chrome profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Use only a harmless marker in a disposable profile.
window.postMessage({ marker: "EXPGuard_test_marker" }, "*");
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/chrome/flow-verification-results-no-duplicate.json`; static report `not recorded`; dynamic report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\chrome\extensions\okfkdaglfjjjfefdcppliegebpoegaii_104.20.0\dynamic\dynamic_report.json`.

### Finding 6: Unauthorized Tab or Window Manipulation

The Ground Truth record traces An external extension able to message this extension from `CHROME_ONMESSAGEEXTERNAL_MESSAGE` (chrome.runtime.onMessageExternal.addListener[message]) in assets/index.js-Cvbn7zHo at L15:C17778 -> L15:C17779 to the privileged sink `CHROME_TABS_CREATE_OPTIONS` in assets/index.js-Cvbn7zHo at L15:C199843 -> L15:C199874. The source scope is in the recorded source context. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-d1f418e79393108f`
- Severity recorded by the analysis: **HIGH**
- Source: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` (chrome.runtime.onMessageExternal.addListener[message]) in assets/index.js-Cvbn7zHo at L15:C17778 -> L15:C17779
- Sink: `CHROME_TABS_CREATE_OPTIONS` in assets/index.js-Cvbn7zHo at L15:C199843 -> L15:C199874
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (EXTERNALLY_CONNECTABLE); sink grants capability beyond the source origin

#### Updated-version tool result

- ExPGuard: `still_detected`; original source `CHROME_ONMESSAGEEXTERNAL_MESSAGE` → sink `CHROME_TABS_CREATE_OPTIONS`; candidate matches: 4

#### Analysis and validation

- Dynamic (ExPGuard): `INCONCLUSIVE_AFTER_DEBUG` (basis `inconclusive`; evidence stage `LISTENER_READY`); the dynamic run did not establish a decisive runtime result; report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\chrome\extensions\okfkdaglfjjjfefdcppliegebpoegaii_104.20.0\dynamic\dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `104.20.0` in a disposable chrome profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Use only a harmless marker in a disposable profile.
window.postMessage({ marker: "EXPGuard_test_marker" }, "*");
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/chrome/flow-verification-results-no-duplicate.json`; static report `not recorded`; dynamic report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\chrome\extensions\okfkdaglfjjjfefdcppliegebpoegaii_104.20.0\dynamic\dynamic_report.json`.

### Finding 7: Storage Poisoning

The Ground Truth record traces An external extension able to message this extension from `CHROME_ONMESSAGEEXTERNAL_MESSAGE` (chrome.runtime.onMessageExternal.addListener[message]) in assets/index.js-Cvbn7zHo at L15:C17778 -> L15:C17779 to the privileged sink `CHROME_LOCAL_STORAGE` (liveAction) in assets/index.js-Cvbn7zHo at L1:C8741 -> L1:C8797. The source scope is in the recorded source context. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-eb2192bda6104951`
- Severity recorded by the analysis: **HIGH**
- Source: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` (chrome.runtime.onMessageExternal.addListener[message]) in assets/index.js-Cvbn7zHo at L15:C17778 -> L15:C17779
- Sink: `CHROME_LOCAL_STORAGE` (liveAction) in assets/index.js-Cvbn7zHo at L1:C8741 -> L1:C8797
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (EXTERNALLY_CONNECTABLE); sink grants capability beyond the source origin

#### Updated-version tool result

- ExPGuard: `still_detected`; original source `CHROME_ONMESSAGEEXTERNAL_MESSAGE` → sink `CHROME_LOCAL_STORAGE`; candidate matches: 5

#### Analysis and validation

- Static (ExPGuard): verdict `UNCERTAIN`, confidence 0.3; report `extensions/okfkdaglfjjjfefdcppliegebpoegaii_104.20.0/static/static_report.json`.
- Dynamic (ExPGuard): `EXTERNAL_CONDITION_REQUIRED` (basis `external_condition_required`); a sender-side precondition was recorded; this is not an unconditional runtime reproduction; report `extensions/okfkdaglfjjjfefdcppliegebpoegaii_104.20.0/dynamic/dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `104.20.0` in a disposable chrome profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Use only a harmless marker in a disposable profile.
window.postMessage({ marker: "EXPGuard_test_marker" }, "*");
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/chrome/flow-verification-results-no-duplicate.json`; static report `extensions/okfkdaglfjjjfefdcppliegebpoegaii_104.20.0/static/static_report.json`; dynamic report `extensions/okfkdaglfjjjfefdcppliegebpoegaii_104.20.0/dynamic/dynamic_report.json`.

### Finding 8: Unauthorized Tab or Window Manipulation

The Ground Truth record traces An external extension able to message this extension from `CHROME_ONMESSAGEEXTERNAL_MESSAGE` (chrome.runtime.onMessageExternal.addListener[message]) in assets/index.js-Cvbn7zHo at L15:C17778 -> L15:C17779 to the privileged sink `CHROME_TABS_CREATE_OPTIONS` in assets/index.js-Cvbn7zHo at L15:C188941 -> L15:C188968. The source scope is in the recorded source context. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-f63b3e9bf2930152`
- Severity recorded by the analysis: **HIGH**
- Source: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` (chrome.runtime.onMessageExternal.addListener[message]) in assets/index.js-Cvbn7zHo at L15:C17778 -> L15:C17779
- Sink: `CHROME_TABS_CREATE_OPTIONS` in assets/index.js-Cvbn7zHo at L15:C188941 -> L15:C188968
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (EXTERNALLY_CONNECTABLE); sink grants capability beyond the source origin

#### Updated-version tool result

- ExPGuard: `still_detected`; original source `CHROME_ONMESSAGEEXTERNAL_MESSAGE` → sink `CHROME_TABS_CREATE_OPTIONS`; candidate matches: 4

#### Analysis and validation

- Static (ExPGuard): verdict `UNCERTAIN`, confidence 0.3; report `extensions/okfkdaglfjjjfefdcppliegebpoegaii_104.20.0/static/static_report.json`.
- Dynamic (ExPGuard): `EXTERNAL_CONDITION_REQUIRED` (basis `external_condition_required`); a sender-side precondition was recorded; this is not an unconditional runtime reproduction; report `extensions/okfkdaglfjjjfefdcppliegebpoegaii_104.20.0/dynamic/dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `104.20.0` in a disposable chrome profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Use only a harmless marker in a disposable profile.
window.postMessage({ marker: "EXPGuard_test_marker" }, "*");
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/chrome/flow-verification-results-no-duplicate.json`; static report `extensions/okfkdaglfjjjfefdcppliegebpoegaii_104.20.0/static/static_report.json`; dynamic report `extensions/okfkdaglfjjjfefdcppliegebpoegaii_104.20.0/dynamic/dynamic_report.json`.


## Recommendations

1. Do not let page-controlled cookies or DOM values select extension-owned storage values; validate the expected value and keep credentials in extension-owned UI/state.
2. Treat storage writes as privileged state changes: use an allowlisted schema, reject attacker-controlled keys, and avoid merging untrusted objects into extension state.
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
