# Security Vulnerability Report: Critical CSRF via Privileged Network Request, Extension Storage Poisoning, and other reported issues in Requestly: Intercept & Modify HTTP Requests

## Summary

We are writing on behalf of a security research team from Nankai University and the University of Liverpool. Our Ground Truth review identified **12 Flow(s)** in **Requestly: Intercept & Modify HTTP Requests** (chrome, extension ID `mdnleldcmiljblolnjhpnblkcekpdkpa`, version `26.6.10`).
The recorded issue type(s): **CSRF via Privileged Network Request; Extension Storage Poisoning; Unauthorized Tab/Window Control; Unauthorized Browser Policy Change; Privilege Escalation**.

The store currently reports version `26.9.29`. The update revalidation is summarized per tool below. This report covers only the original Flow(s); newly introduced Flow(s) are out of scope. Any mixed result, tool failure, or incomplete automated run is called out explicitly and should not be read as a final remediation determination.

## Affected Extension Details

- Name: Requestly: Intercept & Modify HTTP Requests
- Platform: chrome
- Extension ID: `mdnleldcmiljblolnjhpnblkcekpdkpa`
- Dataset version: `26.6.10`
- Store version at review: `26.9.29`
- Users: 300000
- Analysis tools: DoubleX, ExPGuard

## Findings

### Finding 1: Unauthorized Tab or Window Manipulation

The Ground Truth record traces An external extension able to message this extension from `CHROME_ONMESSAGEEXTERNAL_MESSAGE` (chrome.runtime.onMessageExternal.addListener[message]) in serviceWorker at L1:C43978 -> L1:C43979 to the privileged sink `CHROME_TABS_CREATE_OPTIONS` in serviceWorker at L1:C41221 -> L1:C42511. The source scope is in the recorded source context. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-008a0204a861ef86`
- Severity recorded by the analysis: **CRITICAL**
- Source: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` (chrome.runtime.onMessageExternal.addListener[message]) in serviceWorker at L1:C43978 -> L1:C43979
- Sink: `CHROME_TABS_CREATE_OPTIONS` in serviceWorker at L1:C41221 -> L1:C42511
- Tools reporting this Flow: ExPGuard, DoubleX

- Privilege boundary recorded: `True` (EXTERNALLY_CONNECTABLE); sink grants capability beyond the source origin

#### Updated-version tool result

- ExPGuard: `disappeared`; original source `CHROME_ONMESSAGEEXTERNAL_MESSAGE` → sink `CHROME_TABS_CREATE_OPTIONS`; candidate matches: 0
- DoubleX: `still_detected`; original source `WINDOW_MESSAGE_EVENT` → sink `CHROME_TABS_CREATE_OPTIONS`; candidate matches: 7

#### Analysis and validation

- Dynamic (ExPGuard): `TOOL_LIMITATION` (basis `inconclusive`; evidence stage `BLOCKED`); this result does not independently confirm execution at the sink; report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\chrome\extensions\mdnleldcmiljblolnjhpnblkcekpdkpa_26.6.10\dynamic\dynamic_report.json`.
- Static (DoubleX): verdict `UNCERTAIN`, confidence 0.3; report `extensions/mdnleldcmiljblolnjhpnblkcekpdkpa_26.6.10/static/static_report.json`.
- Dynamic (DoubleX): `SINK_NOT_FIRED` (basis `runtime_or_static_dynamic_evidence`); the recorded replay did not establish the complete source-to-sink effect; report `extensions/mdnleldcmiljblolnjhpnblkcekpdkpa_26.6.10/dynamic/dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `26.6.10` in a disposable chrome profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Use only a harmless marker in a disposable profile.
window.postMessage({ marker: "EXPGuard_test_marker" }, "*");
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/chrome/flow-verification-results-no-duplicate.json`; static report `not recorded`; dynamic report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\chrome\extensions\mdnleldcmiljblolnjhpnblkcekpdkpa_26.6.10\dynamic\dynamic_report.json`.
- DoubleX: source report `DoubleX/chrome/flow-verification-results-no-duplicate.json`; static report `extensions/mdnleldcmiljblolnjhpnblkcekpdkpa_26.6.10/static/static_report.json`; dynamic report `extensions/mdnleldcmiljblolnjhpnblkcekpdkpa_26.6.10/dynamic/dynamic_report.json`.

### Finding 2: Unauthorized Tab or Window Manipulation

The Ground Truth record traces A page or sender able to reach the recorded message/event source from `WINDOW_MESSAGE_EVENT` (window.addEventListener(message)) in app.cs at L1:C7673 -> L1:C7787 to the privileged sink `CHROME_TABS_CREATE_OPTIONS` in serviceWorker at L1:C19119 -> L1:C19179. The source scope is on pages matching `https://app.requestly.io/*, https://app.requestly.com/*, https://requestly.com/*`. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-13dd889f7def644a`
- Severity recorded by the analysis: **MEDIUM**
- Source: `WINDOW_MESSAGE_EVENT` (window.addEventListener(message)) in app.cs at L1:C7673 -> L1:C7787
- Sink: `CHROME_TABS_CREATE_OPTIONS` in serviceWorker at L1:C19119 -> L1:C19179
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Updated-version tool result

- ExPGuard: `still_detected`; original source `WINDOW_MESSAGE_EVENT` → sink `CHROME_TABS_CREATE_OPTIONS`; candidate matches: 4

#### Analysis and validation

- Dynamic (ExPGuard): `INCONCLUSIVE_AFTER_DEBUG` (basis `inconclusive`; evidence stage `LISTENER_READY`); the dynamic run did not establish a decisive runtime result; report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\chrome\extensions\mdnleldcmiljblolnjhpnblkcekpdkpa_26.6.10\dynamic\dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `26.6.10` in a disposable chrome profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Use only a harmless marker in a disposable profile.
window.postMessage({ marker: "EXPGuard_test_marker" }, "*");
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/chrome/flow-verification-results-no-duplicate.json`; static report `not recorded`; dynamic report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\chrome\extensions\mdnleldcmiljblolnjhpnblkcekpdkpa_26.6.10\dynamic\dynamic_report.json`.

### Finding 3: Unauthorized Browser Policy Modification

The Ground Truth record traces A page or sender able to reach the recorded message/event source from `WINDOW_MESSAGE_EVENT` (window.addEventListener(message)) in app.cs at L1:C7673 -> L1:C7787 to the privileged sink `CHROME_DECLARATIVENETREQUEST_RULES` in serviceWorker at L1:C25693 -> L1:C25782. The source scope is on pages matching `https://app.requestly.io/*, https://app.requestly.com/*, https://requestly.com/*`. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-1c1d8c12aa172eaa`
- Severity recorded by the analysis: **MEDIUM**
- Source: `WINDOW_MESSAGE_EVENT` (window.addEventListener(message)) in app.cs at L1:C7673 -> L1:C7787
- Sink: `CHROME_DECLARATIVENETREQUEST_RULES` in serviceWorker at L1:C25693 -> L1:C25782
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Updated-version tool result

- ExPGuard: `still_detected`; original source `WINDOW_MESSAGE_EVENT` → sink `CHROME_DECLARATIVENETREQUEST_RULES`; candidate matches: 1

#### Analysis and validation

- Static (ExPGuard): verdict `UNCERTAIN`, confidence 0.3; report `extensions/mdnleldcmiljblolnjhpnblkcekpdkpa_26.6.10/static/static_report.json`.
- Dynamic (ExPGuard): `INCONCLUSIVE_AFTER_DEBUG` (basis `inconclusive`; evidence stage `LISTENER_READY`); the dynamic run did not establish a decisive runtime result; report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\chrome\extensions\mdnleldcmiljblolnjhpnblkcekpdkpa_26.6.10\dynamic\dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `26.6.10` in a disposable chrome profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Use only a harmless marker in a disposable profile.
window.postMessage({ marker: "EXPGuard_test_marker" }, "*");
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/chrome/flow-verification-results-no-duplicate.json`; static report `extensions/mdnleldcmiljblolnjhpnblkcekpdkpa_26.6.10/static/static_report.json`; dynamic report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\chrome\extensions\mdnleldcmiljblolnjhpnblkcekpdkpa_26.6.10\dynamic\dynamic_report.json`.

### Finding 4: Storage Poisoning

The Ground Truth record traces A page or sender able to reach the recorded message/event source from `WINDOW_MESSAGE_EVENT` (window.addEventListener(message)) in app.cs at L1:C7673 -> L1:C7787 to the privileged sink `CHROME_LOCAL_STORAGE` (storage.fuzzy.settings) in app.cs at L1:C2554 -> L1:C2578. The source scope is on pages matching `https://app.requestly.io/*, https://app.requestly.com/*, https://requestly.com/*`. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-233178cbf2a7a97e`
- Severity recorded by the analysis: **CRITICAL**
- Source: `WINDOW_MESSAGE_EVENT` (window.addEventListener(message)) in app.cs at L1:C7673 -> L1:C7787
- Sink: `CHROME_LOCAL_STORAGE` (storage.fuzzy.settings) in app.cs at L1:C2554 -> L1:C2578
- Tools reporting this Flow: ExPGuard, DoubleX

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Updated-version tool result

- ExPGuard: `still_detected`; original source `WINDOW_MESSAGE_EVENT` → sink `CHROME_LOCAL_STORAGE`; candidate matches: 5
- DoubleX: `still_detected`; original source `WINDOW_MESSAGE_EVENT` → sink `CHROME_LOCAL_STORAGE`; candidate matches: 2

#### Analysis and validation

- Static (ExPGuard): verdict `TRUE_POSITIVE`, confidence 0.6; report `extensions/mdnleldcmiljblolnjhpnblkcekpdkpa_26.6.10/static/static_report.json`.
- Dynamic (ExPGuard): `INCONCLUSIVE_AFTER_DEBUG` (basis `inconclusive`; evidence stage `LISTENER_READY`); the dynamic run did not establish a decisive runtime result; report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\chrome\extensions\mdnleldcmiljblolnjhpnblkcekpdkpa_26.6.10\dynamic\dynamic_report.json`.
- Static (DoubleX): verdict `UNCERTAIN`, confidence 0; report `extensions/mdnleldcmiljblolnjhpnblkcekpdkpa_26.6.10/static/static_report.json`.
- Dynamic (DoubleX): `SINK_NOT_FIRED` (basis `runtime_or_static_dynamic_evidence`); the recorded replay did not establish the complete source-to-sink effect; report `extensions/mdnleldcmiljblolnjhpnblkcekpdkpa_26.6.10/dynamic/dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `26.6.10` in a disposable chrome profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Use only a harmless marker in a disposable profile.
window.postMessage({ marker: "EXPGuard_test_marker" }, "*");
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/chrome/flow-verification-results-no-duplicate.json`; static report `extensions/mdnleldcmiljblolnjhpnblkcekpdkpa_26.6.10/static/static_report.json`; dynamic report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\chrome\extensions\mdnleldcmiljblolnjhpnblkcekpdkpa_26.6.10\dynamic\dynamic_report.json`.
- DoubleX: source report `DoubleX/chrome/flow-verification-results-no-duplicate.json`; static report `extensions/mdnleldcmiljblolnjhpnblkcekpdkpa_26.6.10/static/static_report.json`; dynamic report `extensions/mdnleldcmiljblolnjhpnblkcekpdkpa_26.6.10/dynamic/dynamic_report.json`.

### Finding 5: Storage Poisoning

The Ground Truth record traces A page or sender able to reach the recorded message/event source from `WINDOW_MESSAGE_EVENT` (From storage.local.set('testReports') in serviceWorker) in app.cs at L1:C44514 -> L1:C49506 to the privileged sink `CHROME_LOCAL_STORAGE` (testReports) in serviceWorker at L1:C5787 -> L1:C5812. The source scope is on pages matching `https://app.requestly.io/*, https://app.requestly.com/*, https://requestly.com/*`. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-298e57375b1d04fe`
- Severity recorded by the analysis: **MEDIUM**
- Source: `WINDOW_MESSAGE_EVENT` (From storage.local.set('testReports') in serviceWorker) in app.cs at L1:C44514 -> L1:C49506
- Sink: `CHROME_LOCAL_STORAGE` (testReports) in serviceWorker at L1:C5787 -> L1:C5812
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Updated-version tool result

- ExPGuard: `still_detected`; original source `WINDOW_MESSAGE_EVENT` → sink `CHROME_LOCAL_STORAGE`; candidate matches: 5

#### Analysis and validation

- Dynamic (ExPGuard): `TOOL_LIMITATION` (basis `inconclusive`; evidence stage `BLOCKED`); this result does not independently confirm execution at the sink; report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\chrome\extensions\mdnleldcmiljblolnjhpnblkcekpdkpa_26.6.10\dynamic\dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `26.6.10` in a disposable chrome profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Use only a harmless marker in a disposable profile.
window.postMessage({ marker: "EXPGuard_test_marker" }, "*");
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/chrome/flow-verification-results-no-duplicate.json`; static report `not recorded`; dynamic report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\chrome\extensions\mdnleldcmiljblolnjhpnblkcekpdkpa_26.6.10\dynamic\dynamic_report.json`.

### Finding 6: Unauthorized Tab or Window Manipulation

The Ground Truth record traces A page or sender able to reach the recorded message/event source from `WINDOW_MESSAGE_EVENT` (window.addEventListener(message)) in app.cs at L1:C7673 -> L1:C7787 to the privileged sink `CHROME_TABS_CREATE_OPTIONS` in serviceWorker at L1:C46554 -> L1:C46662. The source scope is on pages matching `https://app.requestly.io/*, https://app.requestly.com/*, https://requestly.com/*`. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-94ddd32e46e8a273`
- Severity recorded by the analysis: **CRITICAL**
- Source: `WINDOW_MESSAGE_EVENT` (window.addEventListener(message)) in app.cs at L1:C7673 -> L1:C7787
- Sink: `CHROME_TABS_CREATE_OPTIONS` in serviceWorker at L1:C46554 -> L1:C46662
- Tools reporting this Flow: ExPGuard, DoubleX

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Updated-version tool result

- ExPGuard: `still_detected`; original source `WINDOW_MESSAGE_EVENT` → sink `CHROME_TABS_CREATE_OPTIONS`; candidate matches: 4
- DoubleX: `still_detected`; original source `WINDOW_MESSAGE_EVENT` → sink `CHROME_TABS_CREATE_OPTIONS`; candidate matches: 7

#### Analysis and validation

- Static (ExPGuard): verdict `TRUE_POSITIVE`, confidence 0.6; report `extensions/mdnleldcmiljblolnjhpnblkcekpdkpa_26.6.10/static/static_report.json`.
- Dynamic (ExPGuard): `INCONCLUSIVE_AFTER_DEBUG` (basis `inconclusive`; evidence stage `LISTENER_READY`); the dynamic run did not establish a decisive runtime result; report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\chrome\extensions\mdnleldcmiljblolnjhpnblkcekpdkpa_26.6.10\dynamic\dynamic_report.json`.
- Static (DoubleX): verdict `UNCERTAIN`, confidence 0; report `extensions/mdnleldcmiljblolnjhpnblkcekpdkpa_26.6.10/static/static_report.json`.
- Dynamic (DoubleX): `SINK_NOT_FIRED` (basis `runtime_or_static_dynamic_evidence`); the recorded replay did not establish the complete source-to-sink effect; report `extensions/mdnleldcmiljblolnjhpnblkcekpdkpa_26.6.10/dynamic/dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `26.6.10` in a disposable chrome profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Use only a harmless marker in a disposable profile.
window.postMessage({ marker: "EXPGuard_test_marker" }, "*");
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/chrome/flow-verification-results-no-duplicate.json`; static report `extensions/mdnleldcmiljblolnjhpnblkcekpdkpa_26.6.10/static/static_report.json`; dynamic report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\chrome\extensions\mdnleldcmiljblolnjhpnblkcekpdkpa_26.6.10\dynamic\dynamic_report.json`.
- DoubleX: source report `DoubleX/chrome/flow-verification-results-no-duplicate.json`; static report `extensions/mdnleldcmiljblolnjhpnblkcekpdkpa_26.6.10/static/static_report.json`; dynamic report `extensions/mdnleldcmiljblolnjhpnblkcekpdkpa_26.6.10/dynamic/dynamic_report.json`.

### Finding 7: Privilege Escalation

The Ground Truth record traces An external extension able to message this extension from `CHROME_ONMESSAGEEXTERNAL_MESSAGE` (chrome.runtime.onMessageExternal.addListener[message]) in serviceWorker at L1:C43978 -> L1:C43979 to the privileged sink `CHROME_BROWSINGDATA_REMOVE` (remove) in serviceWorker at L1:C41890 -> L1:C41933. The source scope is in the recorded source context. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-9809596d2808da5d`
- Severity recorded by the analysis: **HIGH**
- Source: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` (chrome.runtime.onMessageExternal.addListener[message]) in serviceWorker at L1:C43978 -> L1:C43979
- Sink: `CHROME_BROWSINGDATA_REMOVE` (remove) in serviceWorker at L1:C41890 -> L1:C41933
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (EXTERNALLY_CONNECTABLE); sink grants capability beyond the source origin

#### Updated-version tool result

- ExPGuard: `still_detected`; original source `CHROME_ONMESSAGEEXTERNAL_MESSAGE` → sink `CHROME_BROWSINGDATA_REMOVE`; candidate matches: 1

#### Analysis and validation

- Static (ExPGuard): verdict `TRUE_POSITIVE`, confidence 0.6; report `extensions/mdnleldcmiljblolnjhpnblkcekpdkpa_26.6.10/static/static_report.json`.
- Dynamic (ExPGuard): `EXTERNAL_CONDITION_REQUIRED` (basis `external_condition_required`); a sender-side precondition was recorded; this is not an unconditional runtime reproduction; report `extensions/mdnleldcmiljblolnjhpnblkcekpdkpa_26.6.10/dynamic/dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `26.6.10` in a disposable chrome profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Use only a harmless marker in a disposable profile.
window.postMessage({ marker: "EXPGuard_test_marker" }, "*");
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/chrome/flow-verification-results-no-duplicate.json`; static report `extensions/mdnleldcmiljblolnjhpnblkcekpdkpa_26.6.10/static/static_report.json`; dynamic report `extensions/mdnleldcmiljblolnjhpnblkcekpdkpa_26.6.10/dynamic/dynamic_report.json`.

### Finding 8: Storage Poisoning

The Ground Truth record traces A page or sender able to reach the recorded message/event source from `WINDOW_MESSAGE_EVENT` (From storage.local.set('unknown') in serviceWorker) in app.cs at L1:C44514 -> L1:C49506 to the privileged sink `CHROME_LOCAL_STORAGE` (unknown) in app.cs at L1:C2554 -> L1:C2578. The source scope is on pages matching `https://app.requestly.io/*, https://app.requestly.com/*, https://requestly.com/*`. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-a6a2c521d8156713`
- Severity recorded by the analysis: **MEDIUM**
- Source: `WINDOW_MESSAGE_EVENT` (From storage.local.set('unknown') in serviceWorker) in app.cs at L1:C44514 -> L1:C49506
- Sink: `CHROME_LOCAL_STORAGE` (unknown) in app.cs at L1:C2554 -> L1:C2578
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Updated-version tool result

- ExPGuard: `still_detected`; original source `WINDOW_MESSAGE_EVENT` → sink `CHROME_LOCAL_STORAGE`; candidate matches: 5

#### Analysis and validation

- Dynamic (ExPGuard): `INCONCLUSIVE_AFTER_DEBUG` (basis `inconclusive`; evidence stage `LISTENER_READY`); the dynamic run did not establish a decisive runtime result; report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\chrome\extensions\mdnleldcmiljblolnjhpnblkcekpdkpa_26.6.10\dynamic\dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `26.6.10` in a disposable chrome profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Use only a harmless marker in a disposable profile.
window.postMessage({ marker: "EXPGuard_test_marker" }, "*");
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/chrome/flow-verification-results-no-duplicate.json`; static report `not recorded`; dynamic report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\chrome\extensions\mdnleldcmiljblolnjhpnblkcekpdkpa_26.6.10\dynamic\dynamic_report.json`.

### Finding 9: Cross-Site Request Forgery (CSRF) / Privileged Network Request

The Ground Truth record traces A page or sender able to reach the recorded message/event source from `WINDOW_MESSAGE_EVENT` (window.addEventListener(message)) in app.cs at L1:C7673 -> L1:C7787 to the privileged sink `FETCH_RESOURCE` ([Unknown URL]) in serviceWorker at L1:C22675 -> L1:C22761. The source scope is on pages matching `https://app.requestly.io/*, https://app.requestly.com/*, https://requestly.com/*`. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-aaa148f6fd3b652f`
- Severity recorded by the analysis: **HIGH**
- Source: `WINDOW_MESSAGE_EVENT` (window.addEventListener(message)) in app.cs at L1:C7673 -> L1:C7787
- Sink: `FETCH_RESOURCE` ([Unknown URL]) in serviceWorker at L1:C22675 -> L1:C22761
- Tools reporting this Flow: ExPGuard, DoubleX

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Updated-version tool result

- ExPGuard: `still_detected`; original source `WINDOW_MESSAGE_EVENT` → sink `FETCH_RESOURCE`; candidate matches: 1
- DoubleX: `still_detected`; original source `WINDOW_MESSAGE_EVENT` → sink `FETCH_RESOURCE`; candidate matches: 1

#### Analysis and validation

- Dynamic (ExPGuard): `TOOL_LIMITATION` (basis `inconclusive`; evidence stage `BLOCKED`); this result does not independently confirm execution at the sink; report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\chrome\extensions\mdnleldcmiljblolnjhpnblkcekpdkpa_26.6.10\dynamic\dynamic_report.json`.
- Static (DoubleX): verdict `UNCERTAIN`, confidence 0; report `extensions/mdnleldcmiljblolnjhpnblkcekpdkpa_26.6.10/static/static_report.json`.
- Dynamic (DoubleX): `PARTIAL` (basis `runtime_or_static_dynamic_evidence`); the recorded replay did not establish the complete source-to-sink effect; report `extensions/mdnleldcmiljblolnjhpnblkcekpdkpa_26.6.10/dynamic/dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `26.6.10` in a disposable chrome profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Use only a harmless marker in a disposable profile.
window.postMessage({ marker: "EXPGuard_test_marker" }, "*");
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/chrome/flow-verification-results-no-duplicate.json`; static report `not recorded`; dynamic report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\chrome\extensions\mdnleldcmiljblolnjhpnblkcekpdkpa_26.6.10\dynamic\dynamic_report.json`.
- DoubleX: source report `DoubleX/chrome/flow-verification-results-no-duplicate.json`; static report `extensions/mdnleldcmiljblolnjhpnblkcekpdkpa_26.6.10/static/static_report.json`; dynamic report `extensions/mdnleldcmiljblolnjhpnblkcekpdkpa_26.6.10/dynamic/dynamic_report.json`.

### Finding 10: Unauthorized Tab or Window Manipulation

The Ground Truth record traces A page or sender able to reach the recorded message/event source from `WINDOW_MESSAGE_EVENT` (window.addEventListener(message)) in app.cs at L1:C7673 -> L1:C7787 to the privileged sink `CHROME_TABS_CREATE_OPTIONS` in serviceWorker at L1:C48382 -> L1:C48624. The source scope is on pages matching `https://app.requestly.io/*, https://app.requestly.com/*, https://requestly.com/*`. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-bba1541bfc8c9fb5`
- Severity recorded by the analysis: **MEDIUM**
- Source: `WINDOW_MESSAGE_EVENT` (window.addEventListener(message)) in app.cs at L1:C7673 -> L1:C7787
- Sink: `CHROME_TABS_CREATE_OPTIONS` in serviceWorker at L1:C48382 -> L1:C48624
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Updated-version tool result

- ExPGuard: `still_detected`; original source `WINDOW_MESSAGE_EVENT` → sink `CHROME_TABS_CREATE_OPTIONS`; candidate matches: 4

#### Analysis and validation

- Dynamic (ExPGuard): `TOOL_LIMITATION` (basis `inconclusive`; evidence stage `BLOCKED`); this result does not independently confirm execution at the sink; report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\chrome\extensions\mdnleldcmiljblolnjhpnblkcekpdkpa_26.6.10\dynamic\dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `26.6.10` in a disposable chrome profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Use only a harmless marker in a disposable profile.
window.postMessage({ marker: "EXPGuard_test_marker" }, "*");
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/chrome/flow-verification-results-no-duplicate.json`; static report `not recorded`; dynamic report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\chrome\extensions\mdnleldcmiljblolnjhpnblkcekpdkpa_26.6.10\dynamic\dynamic_report.json`.

### Finding 11: Unauthorized Tab or Window Manipulation

The Ground Truth record traces A page or sender able to reach the recorded message/event source from `WINDOW_MESSAGE_EVENT` (window.addEventListener(message)) in app.cs at L1:C7673 -> L1:C7787 to the privileged sink `CHROME_TABS_CREATE_OPTIONS` in serviceWorker at L1:C10229 -> L1:C10280. The source scope is on pages matching `https://app.requestly.io/*, https://app.requestly.com/*, https://requestly.com/*`. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-f0c4b85559b7adf1`
- Severity recorded by the analysis: **MEDIUM**
- Source: `WINDOW_MESSAGE_EVENT` (window.addEventListener(message)) in app.cs at L1:C7673 -> L1:C7787
- Sink: `CHROME_TABS_CREATE_OPTIONS` in serviceWorker at L1:C10229 -> L1:C10280
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Updated-version tool result

- ExPGuard: `still_detected`; original source `WINDOW_MESSAGE_EVENT` → sink `CHROME_TABS_CREATE_OPTIONS`; candidate matches: 4

#### Analysis and validation

- Dynamic (ExPGuard): `TOOL_LIMITATION` (basis `inconclusive`; evidence stage `BLOCKED`); this result does not independently confirm execution at the sink; report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\chrome\extensions\mdnleldcmiljblolnjhpnblkcekpdkpa_26.6.10\dynamic\dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `26.6.10` in a disposable chrome profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Use only a harmless marker in a disposable profile.
window.postMessage({ marker: "EXPGuard_test_marker" }, "*");
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/chrome/flow-verification-results-no-duplicate.json`; static report `not recorded`; dynamic report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\chrome\extensions\mdnleldcmiljblolnjhpnblkcekpdkpa_26.6.10\dynamic\dynamic_report.json`.

### Finding 12: Storage Poisoning

The Ground Truth record traces A page or sender able to reach the recorded message/event source from `WINDOW_MESSAGE_EVENT` (window.addEventListener(message)) in app.cs at L1:C7673 -> L1:C7787 to the privileged sink `CHROME_LOCAL_STORAGE` (unknown) in serviceWorker at L1:C5787 -> L1:C5812. The source scope is on pages matching `https://app.requestly.io/*, https://app.requestly.com/*, https://requestly.com/*`. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-f8af492e6a6f3489`
- Severity recorded by the analysis: **MEDIUM**
- Source: `WINDOW_MESSAGE_EVENT` (window.addEventListener(message)) in app.cs at L1:C7673 -> L1:C7787
- Sink: `CHROME_LOCAL_STORAGE` (unknown) in serviceWorker at L1:C5787 -> L1:C5812
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Updated-version tool result

- ExPGuard: `still_detected`; original source `WINDOW_MESSAGE_EVENT` → sink `CHROME_LOCAL_STORAGE`; candidate matches: 5

#### Analysis and validation

- Dynamic (ExPGuard): `TOOL_LIMITATION` (basis `inconclusive`; evidence stage `BLOCKED`); this result does not independently confirm execution at the sink; report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\chrome\extensions\mdnleldcmiljblolnjhpnblkcekpdkpa_26.6.10\dynamic\dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `26.6.10` in a disposable chrome profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Use only a harmless marker in a disposable profile.
window.postMessage({ marker: "EXPGuard_test_marker" }, "*");
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/chrome/flow-verification-results-no-duplicate.json`; static report `not recorded`; dynamic report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\chrome\extensions\mdnleldcmiljblolnjhpnblkcekpdkpa_26.6.10\dynamic\dynamic_report.json`.


## Recommendations

1. Authenticate page-to-extension events at the privilege boundary; validate the sender and origin instead of trusting DOM event detail.
2. Validate the request schema and restrict destination URLs, methods, headers, and bodies before issuing privileged network requests.
3. Do not let page-controlled cookies or DOM values select extension-owned storage values; validate the expected value and keep credentials in extension-owned UI/state.
4. Treat storage writes as privileged state changes: use an allowlisted schema, reject attacker-controlled keys, and avoid merging untrusted objects into extension state.
5. Validate tab/window IDs and navigation targets, and require a user gesture for externally initiated changes.
6. Reduce host permissions and sensitive API access to the smallest scope required by the feature.

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
