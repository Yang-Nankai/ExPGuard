# Security Vulnerability Report: Critical CSRF via Privileged Network Request and Unauthorized Tab/Window Control in L.O.C

## Summary

We are writing on behalf of a security research team from Nankai University and the University of Liverpool. Our Ground Truth review identified **5 Flow(s)** in **L.O.C** (chrome, extension ID `eojdckfcadamkapabechhbnkleligand`, version `40.5`).
The recorded issue type(s): **CSRF via Privileged Network Request; Unauthorized Tab/Window Control**.

## Affected Extension Details

- Name: L.O.C
- Platform: chrome
- Extension ID: `eojdckfcadamkapabechhbnkleligand`
- Dataset version: `40.5`
- Store version at review: `40.5`
- Users: 300000
- Analysis tools: DoubleX, ExPGuard

## Findings

### Finding 1: Cross-Site Request Forgery (CSRF) / Privileged Network Request

The Ground Truth record traces An external extension able to message this extension from `CHROME_ONMESSAGEEXTERNAL_MESSAGE` (chrome.runtime.onMessageExternal.addListener[message]) in background.min at L1:C1972 -> L1:C1973 to the privileged sink `FETCH_RESOURCE` ([Unknown URL]) in background.min at L1:C3361 -> L1:C3451. The source scope is in the recorded source context. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-01cac3f3b6f30348`
- Severity recorded by the analysis: **MEDIUM**
- Source: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` (chrome.runtime.onMessageExternal.addListener[message]) in background.min at L1:C1972 -> L1:C1973
- Sink: `FETCH_RESOURCE` ([Unknown URL]) in background.min at L1:C3361 -> L1:C3451
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (EXTERNALLY_CONNECTABLE); sink grants capability beyond the source origin

#### Analysis and validation

- Dynamic (ExPGuard): `PARTIAL` (basis `inconclusive`; evidence stage `SINK_REACHED`); the recorded replay did not establish the complete source-to-sink effect; report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\chrome\extensions\eojdckfcadamkapabechhbnkleligand_40.5\dynamic\dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `40.5` in a disposable chrome profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Use only a harmless marker in a disposable profile.
window.postMessage({ marker: "EXPGuard_test_marker" }, "*");
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/chrome/flow-verification-results-no-duplicate.json`; static report `not recorded`; dynamic report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\chrome\extensions\eojdckfcadamkapabechhbnkleligand_40.5\dynamic\dynamic_report.json`.

### Finding 2: Cross-Site Request Forgery (CSRF) / Privileged Network Request

The Ground Truth record traces An external extension able to message this extension from `CHROME_ONMESSAGEEXTERNAL_MESSAGE` (chrome.runtime.onMessageExternal.addListener[message]) in background.min at L1:C1972 -> L1:C1973 to the privileged sink `FETCH_RESOURCE` ([Unknown URL]) in background.min at L1:C3654 -> L1:C3718. The source scope is in the recorded source context. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-75db8bb86f0a1d5c`
- Severity recorded by the analysis: **MEDIUM**
- Source: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` (chrome.runtime.onMessageExternal.addListener[message]) in background.min at L1:C1972 -> L1:C1973
- Sink: `FETCH_RESOURCE` ([Unknown URL]) in background.min at L1:C3654 -> L1:C3718
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (EXTERNALLY_CONNECTABLE); sink grants capability beyond the source origin

#### Analysis and validation

- Dynamic (ExPGuard): `PARTIAL` (basis `inconclusive`; evidence stage `SINK_REACHED`); the recorded replay did not establish the complete source-to-sink effect; report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\chrome\extensions\eojdckfcadamkapabechhbnkleligand_40.5\dynamic\dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `40.5` in a disposable chrome profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Use only a harmless marker in a disposable profile.
window.postMessage({ marker: "EXPGuard_test_marker" }, "*");
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/chrome/flow-verification-results-no-duplicate.json`; static report `not recorded`; dynamic report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\chrome\extensions\eojdckfcadamkapabechhbnkleligand_40.5\dynamic\dynamic_report.json`.

### Finding 3: Cross-Site Request Forgery (CSRF) / Privileged Network Request

The Ground Truth record traces An external extension able to message this extension from `CHROME_ONMESSAGEEXTERNAL_MESSAGE` (chrome.runtime.onMessageExternal.addListener[message]) in background.min at L1:C1972 -> L1:C1973 to the privileged sink `FETCH_RESOURCE` ([Unknown URL]) in background.min at L1:C4015 -> L1:C4034. The source scope is in the recorded source context. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-8184c8a6423837b7`
- Severity recorded by the analysis: **MEDIUM**
- Source: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` (chrome.runtime.onMessageExternal.addListener[message]) in background.min at L1:C1972 -> L1:C1973
- Sink: `FETCH_RESOURCE` ([Unknown URL]) in background.min at L1:C4015 -> L1:C4034
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (EXTERNALLY_CONNECTABLE); sink grants capability beyond the source origin

#### Analysis and validation

- Dynamic (ExPGuard): `PARTIAL` (basis `inconclusive`; evidence stage `SINK_REACHED`); the recorded replay did not establish the complete source-to-sink effect; report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\chrome\extensions\eojdckfcadamkapabechhbnkleligand_40.5\dynamic\dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `40.5` in a disposable chrome profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Use only a harmless marker in a disposable profile.
window.postMessage({ marker: "EXPGuard_test_marker" }, "*");
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/chrome/flow-verification-results-no-duplicate.json`; static report `not recorded`; dynamic report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\chrome\extensions\eojdckfcadamkapabechhbnkleligand_40.5\dynamic\dynamic_report.json`.

### Finding 4: Cross-Site Request Forgery (CSRF) / Privileged Network Request

The Ground Truth record traces An external extension able to message this extension from `CHROME_ONMESSAGEEXTERNAL_MESSAGE` (chrome.runtime.onMessageExternal.addListener[message]) in background.min at L1:C1972 -> L1:C1973 to the privileged sink `FETCH_RESOURCE` ([Unknown URL]) in background.min at L1:C2832 -> L1:C2986. The source scope is in the recorded source context. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-a261f6f560dc4e40`
- Severity recorded by the analysis: **MEDIUM**
- Source: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` (chrome.runtime.onMessageExternal.addListener[message]) in background.min at L1:C1972 -> L1:C1973
- Sink: `FETCH_RESOURCE` ([Unknown URL]) in background.min at L1:C2832 -> L1:C2986
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (EXTERNALLY_CONNECTABLE); sink grants capability beyond the source origin

#### Analysis and validation

- Static (ExPGuard): verdict `TRUE_POSITIVE`, confidence 0.6; report `extensions/eojdckfcadamkapabechhbnkleligand_40.5/static/static_report.json`.
- Dynamic (ExPGuard): `EXTERNAL_CONDITION_REQUIRED` (basis `external_condition_required`); a sender-side precondition was recorded; this is not an unconditional runtime reproduction; report `extensions/eojdckfcadamkapabechhbnkleligand_40.5/dynamic/dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `40.5` in a disposable chrome profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Use only a harmless marker in a disposable profile.
window.postMessage({ marker: "EXPGuard_test_marker" }, "*");
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/chrome/flow-verification-results-no-duplicate.json`; static report `extensions/eojdckfcadamkapabechhbnkleligand_40.5/static/static_report.json`; dynamic report `extensions/eojdckfcadamkapabechhbnkleligand_40.5/dynamic/dynamic_report.json`.

### Finding 5: Unauthorized Tab or Window Manipulation

The Ground Truth record traces An external extension able to message this extension from `CHROME_ONMESSAGEEXTERNAL_MESSAGE` (chrome.runtime.onMessageExternal.addListener[message]) in background.min at L1:C1972 -> L1:C1973 to the privileged sink `CHROME_TABS_CREATE_OPTIONS` in background.min at L1:C2183 -> L1:C2214. The source scope is in the recorded source context. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-ec36a3ece620700c`
- Severity recorded by the analysis: **CRITICAL**
- Source: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` (chrome.runtime.onMessageExternal.addListener[message]) in background.min at L1:C1972 -> L1:C1973
- Sink: `CHROME_TABS_CREATE_OPTIONS` in background.min at L1:C2183 -> L1:C2214
- Tools reporting this Flow: ExPGuard, DoubleX

- Privilege boundary recorded: `True` (EXTERNALLY_CONNECTABLE); sink grants capability beyond the source origin

#### Analysis and validation

- Dynamic (ExPGuard): `PARTIAL` (basis `inconclusive`; evidence stage `SINK_REACHED`); the recorded replay did not establish the complete source-to-sink effect; report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\chrome\extensions\eojdckfcadamkapabechhbnkleligand_40.5\dynamic\dynamic_report.json`.
- Static (DoubleX): verdict `TRUE_POSITIVE`, confidence 0.6; report `extensions/eojdckfcadamkapabechhbnkleligand_40.5/static/static_report.json`.
- Dynamic (DoubleX): `EXTERNAL_CONDITION_REQUIRED` (basis `external_condition_required`); a sender-side precondition was recorded; this is not an unconditional runtime reproduction; report `extensions/eojdckfcadamkapabechhbnkleligand_40.5/dynamic/dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `40.5` in a disposable chrome profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Use only a harmless marker in a disposable profile.
window.postMessage({ marker: "EXPGuard_test_marker" }, "*");
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/chrome/flow-verification-results-no-duplicate.json`; static report `not recorded`; dynamic report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\chrome\extensions\eojdckfcadamkapabechhbnkleligand_40.5\dynamic\dynamic_report.json`.
- DoubleX: source report `DoubleX/chrome/flow-verification-results-no-duplicate.json`; static report `extensions/eojdckfcadamkapabechhbnkleligand_40.5/static/static_report.json`; dynamic report `extensions/eojdckfcadamkapabechhbnkleligand_40.5/dynamic/dynamic_report.json`.


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
