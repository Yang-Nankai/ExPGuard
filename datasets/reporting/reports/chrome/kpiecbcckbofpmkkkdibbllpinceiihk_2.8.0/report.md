# Security Vulnerability Report: High CSRF via Privileged Network Request and Unauthorized Tab/Window Control in DotVPN: Fast & Private VPN

## Summary

We are writing on behalf of a security research team from Nankai University and the University of Liverpool. Our Ground Truth review identified **10 Flow(s)** in **DotVPN: Fast & Private VPN** (chrome, extension ID `kpiecbcckbofpmkkkdibbllpinceiihk`, version `2.8.0`).
The recorded issue type(s): **CSRF via Privileged Network Request; Unauthorized Tab/Window Control**.

The store currently reports version `2.8.12`. The update revalidation is summarized per tool below. This report covers only the original Flow(s); newly introduced Flow(s) are out of scope. Any mixed result, tool failure, or incomplete automated run is called out explicitly and should not be read as a final remediation determination.

## Affected Extension Details

- Name: DotVPN: Fast & Private VPN
- Platform: chrome
- Extension ID: `kpiecbcckbofpmkkkdibbllpinceiihk`
- Dataset version: `2.8.0`
- Store version at review: `2.8.12`
- Users: 400000
- Analysis tools: ExPGuard

## Findings

### Finding 1: Cross-Site Request Forgery (CSRF) / Privileged Network Request

The Ground Truth record traces An external extension able to message this extension from `CHROME_ONMESSAGEEXTERNAL_MESSAGE` (From storage.local.set('token') in js/worker) in js/worker at L1:C129552 -> L1:C129553 to the privileged sink `FETCH_BODY` ([Unknown URL]) in popup/js/bridge at L1:C128011 -> L1:C128205. The source scope is in the recorded source context. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-00d6ae97368cadf7`
- Severity recorded by the analysis: **HIGH**
- Source: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` (From storage.local.set('token') in js/worker) in js/worker at L1:C129552 -> L1:C129553
- Sink: `FETCH_BODY` ([Unknown URL]) in popup/js/bridge at L1:C128011 -> L1:C128205
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (EXTERNALLY_CONNECTABLE); sink grants capability beyond the source origin

#### Updated-version tool result

- ExPGuard: `still_detected`; original source `CHROME_ONMESSAGEEXTERNAL_MESSAGE` → sink `FETCH_BODY`; candidate matches: 9

#### Analysis and validation

- Dynamic (ExPGuard): `INCONCLUSIVE_AFTER_DEBUG` (basis `inconclusive`; evidence stage `LISTENER_READY`); the dynamic run did not establish a decisive runtime result; report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\chrome\extensions\kpiecbcckbofpmkkkdibbllpinceiihk_2.8.0\dynamic\dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `2.8.0` in a disposable chrome profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Use only a harmless marker in a disposable profile.
window.postMessage({ marker: "EXPGuard_test_marker" }, "*");
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/chrome/flow-verification-results-no-duplicate.json`; static report `not recorded`; dynamic report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\chrome\extensions\kpiecbcckbofpmkkkdibbllpinceiihk_2.8.0\dynamic\dynamic_report.json`.

### Finding 2: Cross-Site Request Forgery (CSRF) / Privileged Network Request

The Ground Truth record traces An external extension able to message this extension from `CHROME_ONMESSAGEEXTERNAL_MESSAGE` (From storage.local.set('token') in js/worker) in js/worker at L1:C129552 -> L1:C129553 to the privileged sink `FETCH_BODY` ([Unknown URL]) in popup/js/bridge at L1:C127267 -> L1:C127491. The source scope is in the recorded source context. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-1b006dcf8160ed1c`
- Severity recorded by the analysis: **HIGH**
- Source: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` (From storage.local.set('token') in js/worker) in js/worker at L1:C129552 -> L1:C129553
- Sink: `FETCH_BODY` ([Unknown URL]) in popup/js/bridge at L1:C127267 -> L1:C127491
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (EXTERNALLY_CONNECTABLE); sink grants capability beyond the source origin

#### Updated-version tool result

- ExPGuard: `still_detected`; original source `CHROME_ONMESSAGEEXTERNAL_MESSAGE` → sink `FETCH_BODY`; candidate matches: 9

#### Analysis and validation

- Static (ExPGuard): verdict `TRUE_POSITIVE`, confidence 0.6; report `extensions/kpiecbcckbofpmkkkdibbllpinceiihk_2.8.0/static/static_report.json`.
- Dynamic (ExPGuard): `EXTERNAL_CONDITION_REQUIRED` (basis `external_condition_required`); a sender-side precondition was recorded; this is not an unconditional runtime reproduction; report `extensions/kpiecbcckbofpmkkkdibbllpinceiihk_2.8.0/dynamic/dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `2.8.0` in a disposable chrome profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Use only a harmless marker in a disposable profile.
window.postMessage({ marker: "EXPGuard_test_marker" }, "*");
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/chrome/flow-verification-results-no-duplicate.json`; static report `extensions/kpiecbcckbofpmkkkdibbllpinceiihk_2.8.0/static/static_report.json`; dynamic report `extensions/kpiecbcckbofpmkkkdibbllpinceiihk_2.8.0/dynamic/dynamic_report.json`.

### Finding 3: Cross-Site Request Forgery (CSRF) / Privileged Network Request

The Ground Truth record traces An external extension able to message this extension from `CHROME_ONMESSAGEEXTERNAL_MESSAGE` (From storage.local.set('token') in js/worker) in js/worker at L1:C129552 -> L1:C129553 to the privileged sink `FETCH_BODY` ([Unknown URL]) in popup/js/bridge at L1:C131237 -> L1:C131380. The source scope is in the recorded source context. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-301a09fa93280c2f`
- Severity recorded by the analysis: **HIGH**
- Source: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` (From storage.local.set('token') in js/worker) in js/worker at L1:C129552 -> L1:C129553
- Sink: `FETCH_BODY` ([Unknown URL]) in popup/js/bridge at L1:C131237 -> L1:C131380
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (EXTERNALLY_CONNECTABLE); sink grants capability beyond the source origin

#### Updated-version tool result

- ExPGuard: `still_detected`; original source `CHROME_ONMESSAGEEXTERNAL_MESSAGE` → sink `FETCH_BODY`; candidate matches: 9

#### Analysis and validation

- Dynamic (ExPGuard): `INCONCLUSIVE_AFTER_DEBUG` (basis `inconclusive`; evidence stage `LISTENER_READY`); the dynamic run did not establish a decisive runtime result; report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\chrome\extensions\kpiecbcckbofpmkkkdibbllpinceiihk_2.8.0\dynamic\dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `2.8.0` in a disposable chrome profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Use only a harmless marker in a disposable profile.
window.postMessage({ marker: "EXPGuard_test_marker" }, "*");
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/chrome/flow-verification-results-no-duplicate.json`; static report `not recorded`; dynamic report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\chrome\extensions\kpiecbcckbofpmkkkdibbllpinceiihk_2.8.0\dynamic\dynamic_report.json`.

### Finding 4: Cross-Site Request Forgery (CSRF) / Privileged Network Request

The Ground Truth record traces An external extension able to message this extension from `CHROME_ONMESSAGEEXTERNAL_MESSAGE` (From storage.local.set('token') in js/worker) in js/worker at L1:C129552 -> L1:C129553 to the privileged sink `FETCH_BODY` ([Unknown URL]) in js/worker at L1:C122585 -> L1:C122779. The source scope is in the recorded source context. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-474ff2235bcbc327`
- Severity recorded by the analysis: **HIGH**
- Source: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` (From storage.local.set('token') in js/worker) in js/worker at L1:C129552 -> L1:C129553
- Sink: `FETCH_BODY` ([Unknown URL]) in js/worker at L1:C122585 -> L1:C122779
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (EXTERNALLY_CONNECTABLE); sink grants capability beyond the source origin

#### Updated-version tool result

- ExPGuard: `still_detected`; original source `CHROME_ONMESSAGEEXTERNAL_MESSAGE` → sink `FETCH_BODY`; candidate matches: 9

#### Analysis and validation

- Dynamic (ExPGuard): `INCONCLUSIVE_AFTER_DEBUG` (basis `inconclusive`; evidence stage `LISTENER_READY`); the dynamic run did not establish a decisive runtime result; report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\chrome\extensions\kpiecbcckbofpmkkkdibbllpinceiihk_2.8.0\dynamic\dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `2.8.0` in a disposable chrome profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Use only a harmless marker in a disposable profile.
window.postMessage({ marker: "EXPGuard_test_marker" }, "*");
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/chrome/flow-verification-results-no-duplicate.json`; static report `not recorded`; dynamic report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\chrome\extensions\kpiecbcckbofpmkkkdibbllpinceiihk_2.8.0\dynamic\dynamic_report.json`.

### Finding 5: Cross-Site Request Forgery (CSRF) / Privileged Network Request

The Ground Truth record traces An external extension able to message this extension from `CHROME_ONMESSAGEEXTERNAL_MESSAGE` (From storage.local.set('token') in js/worker) in js/worker at L1:C129552 -> L1:C129553 to the privileged sink `FETCH_BODY` ([Unknown URL]) in js/worker at L1:C121841 -> L1:C122065. The source scope is in the recorded source context. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-5a25679291d93a0c`
- Severity recorded by the analysis: **HIGH**
- Source: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` (From storage.local.set('token') in js/worker) in js/worker at L1:C129552 -> L1:C129553
- Sink: `FETCH_BODY` ([Unknown URL]) in js/worker at L1:C121841 -> L1:C122065
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (EXTERNALLY_CONNECTABLE); sink grants capability beyond the source origin

#### Updated-version tool result

- ExPGuard: `still_detected`; original source `CHROME_ONMESSAGEEXTERNAL_MESSAGE` → sink `FETCH_BODY`; candidate matches: 9

#### Analysis and validation

- Static (ExPGuard): verdict `TRUE_POSITIVE`, confidence 0.6; report `extensions/kpiecbcckbofpmkkkdibbllpinceiihk_2.8.0/static/static_report.json`.
- Dynamic (ExPGuard): `EXTERNAL_CONDITION_REQUIRED` (basis `external_condition_required`); a sender-side precondition was recorded; this is not an unconditional runtime reproduction; report `extensions/kpiecbcckbofpmkkkdibbllpinceiihk_2.8.0/dynamic/dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `2.8.0` in a disposable chrome profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Use only a harmless marker in a disposable profile.
window.postMessage({ marker: "EXPGuard_test_marker" }, "*");
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/chrome/flow-verification-results-no-duplicate.json`; static report `extensions/kpiecbcckbofpmkkkdibbllpinceiihk_2.8.0/static/static_report.json`; dynamic report `extensions/kpiecbcckbofpmkkkdibbllpinceiihk_2.8.0/dynamic/dynamic_report.json`.

### Finding 6: Cross-Site Request Forgery (CSRF) / Privileged Network Request

The Ground Truth record traces An external extension able to message this extension from `CHROME_ONMESSAGEEXTERNAL_MESSAGE` (From storage.local.set('token') in js/worker) in js/worker at L1:C129552 -> L1:C129553 to the privileged sink `FETCH_BODY` ([Unknown URL]) in popup/js/bridge at L1:C145921 -> L1:C146060. The source scope is in the recorded source context. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-5a8cbecfc8edb531`
- Severity recorded by the analysis: **HIGH**
- Source: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` (From storage.local.set('token') in js/worker) in js/worker at L1:C129552 -> L1:C129553
- Sink: `FETCH_BODY` ([Unknown URL]) in popup/js/bridge at L1:C145921 -> L1:C146060
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (EXTERNALLY_CONNECTABLE); sink grants capability beyond the source origin

#### Updated-version tool result

- ExPGuard: `still_detected`; original source `CHROME_ONMESSAGEEXTERNAL_MESSAGE` → sink `FETCH_BODY`; candidate matches: 9

#### Analysis and validation

- Dynamic (ExPGuard): `INCONCLUSIVE_AFTER_DEBUG` (basis `inconclusive`; evidence stage `LISTENER_READY`); the dynamic run did not establish a decisive runtime result; report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\chrome\extensions\kpiecbcckbofpmkkkdibbllpinceiihk_2.8.0\dynamic\dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `2.8.0` in a disposable chrome profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Use only a harmless marker in a disposable profile.
window.postMessage({ marker: "EXPGuard_test_marker" }, "*");
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/chrome/flow-verification-results-no-duplicate.json`; static report `not recorded`; dynamic report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\chrome\extensions\kpiecbcckbofpmkkkdibbllpinceiihk_2.8.0\dynamic\dynamic_report.json`.

### Finding 7: Cross-Site Request Forgery (CSRF) / Privileged Network Request

The Ground Truth record traces An external extension able to message this extension from `CHROME_ONMESSAGEEXTERNAL_MESSAGE` (From storage.local.set('token') in js/worker) in js/worker at L1:C129552 -> L1:C129553 to the privileged sink `FETCH_BODY` ([Unknown URL]) in js/worker at L1:C125811 -> L1:C125954. The source scope is in the recorded source context. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-88e7c39b38991b84`
- Severity recorded by the analysis: **HIGH**
- Source: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` (From storage.local.set('token') in js/worker) in js/worker at L1:C129552 -> L1:C129553
- Sink: `FETCH_BODY` ([Unknown URL]) in js/worker at L1:C125811 -> L1:C125954
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (EXTERNALLY_CONNECTABLE); sink grants capability beyond the source origin

#### Updated-version tool result

- ExPGuard: `still_detected`; original source `CHROME_ONMESSAGEEXTERNAL_MESSAGE` → sink `FETCH_BODY`; candidate matches: 9

#### Analysis and validation

- Dynamic (ExPGuard): `INCONCLUSIVE_AFTER_DEBUG` (basis `inconclusive`; evidence stage `LISTENER_READY`); the dynamic run did not establish a decisive runtime result; report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\chrome\extensions\kpiecbcckbofpmkkkdibbllpinceiihk_2.8.0\dynamic\dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `2.8.0` in a disposable chrome profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Use only a harmless marker in a disposable profile.
window.postMessage({ marker: "EXPGuard_test_marker" }, "*");
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/chrome/flow-verification-results-no-duplicate.json`; static report `not recorded`; dynamic report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\chrome\extensions\kpiecbcckbofpmkkkdibbllpinceiihk_2.8.0\dynamic\dynamic_report.json`.

### Finding 8: Cross-Site Request Forgery (CSRF) / Privileged Network Request

The Ground Truth record traces An external extension able to message this extension from `CHROME_ONMESSAGEEXTERNAL_MESSAGE` (From storage.local.set('token') in js/worker) in js/worker at L1:C129552 -> L1:C129553 to the privileged sink `FETCH_BODY` ([Unknown URL]) in js/worker at L1:C126195 -> L1:C126381. The source scope is in the recorded source context. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-ab5bcea592702cbb`
- Severity recorded by the analysis: **HIGH**
- Source: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` (From storage.local.set('token') in js/worker) in js/worker at L1:C129552 -> L1:C129553
- Sink: `FETCH_BODY` ([Unknown URL]) in js/worker at L1:C126195 -> L1:C126381
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (EXTERNALLY_CONNECTABLE); sink grants capability beyond the source origin

#### Updated-version tool result

- ExPGuard: `still_detected`; original source `CHROME_ONMESSAGEEXTERNAL_MESSAGE` → sink `FETCH_BODY`; candidate matches: 9

#### Analysis and validation

- Dynamic (ExPGuard): `INCONCLUSIVE_AFTER_DEBUG` (basis `inconclusive`; evidence stage `LISTENER_READY`); the dynamic run did not establish a decisive runtime result; report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\chrome\extensions\kpiecbcckbofpmkkkdibbllpinceiihk_2.8.0\dynamic\dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `2.8.0` in a disposable chrome profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Use only a harmless marker in a disposable profile.
window.postMessage({ marker: "EXPGuard_test_marker" }, "*");
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/chrome/flow-verification-results-no-duplicate.json`; static report `not recorded`; dynamic report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\chrome\extensions\kpiecbcckbofpmkkkdibbllpinceiihk_2.8.0\dynamic\dynamic_report.json`.

### Finding 9: Cross-Site Request Forgery (CSRF) / Privileged Network Request

The Ground Truth record traces An external extension able to message this extension from `CHROME_ONMESSAGEEXTERNAL_MESSAGE` (From storage.local.set('token') in js/worker) in js/worker at L1:C129552 -> L1:C129553 to the privileged sink `FETCH_BODY` ([Unknown URL]) in popup/js/bridge at L1:C131621 -> L1:C131807. The source scope is in the recorded source context. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-d52721cf95862feb`
- Severity recorded by the analysis: **HIGH**
- Source: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` (From storage.local.set('token') in js/worker) in js/worker at L1:C129552 -> L1:C129553
- Sink: `FETCH_BODY` ([Unknown URL]) in popup/js/bridge at L1:C131621 -> L1:C131807
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (EXTERNALLY_CONNECTABLE); sink grants capability beyond the source origin

#### Updated-version tool result

- ExPGuard: `still_detected`; original source `CHROME_ONMESSAGEEXTERNAL_MESSAGE` → sink `FETCH_BODY`; candidate matches: 9

#### Analysis and validation

- Dynamic (ExPGuard): `INCONCLUSIVE_AFTER_DEBUG` (basis `inconclusive`; evidence stage `LISTENER_READY`); the dynamic run did not establish a decisive runtime result; report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\chrome\extensions\kpiecbcckbofpmkkkdibbllpinceiihk_2.8.0\dynamic\dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `2.8.0` in a disposable chrome profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Use only a harmless marker in a disposable profile.
window.postMessage({ marker: "EXPGuard_test_marker" }, "*");
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/chrome/flow-verification-results-no-duplicate.json`; static report `not recorded`; dynamic report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\chrome\extensions\kpiecbcckbofpmkkkdibbllpinceiihk_2.8.0\dynamic\dynamic_report.json`.

### Finding 10: Unauthorized Tab or Window Manipulation

The Ground Truth record traces An external extension able to message this extension from `CHROME_ONMESSAGEEXTERNAL_MESSAGE` (From storage.local.set('token') in js/worker) in js/worker at L1:C129552 -> L1:C129553 to the privileged sink `CHROME_TABS_CREATE_OPTIONS` in popup/js/bridge at L1:C144158 -> L1:C144185. The source scope is in the recorded source context. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-f81e5312a7b084a4`
- Severity recorded by the analysis: **HIGH**
- Source: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` (From storage.local.set('token') in js/worker) in js/worker at L1:C129552 -> L1:C129553
- Sink: `CHROME_TABS_CREATE_OPTIONS` in popup/js/bridge at L1:C144158 -> L1:C144185
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (EXTERNALLY_CONNECTABLE); sink grants capability beyond the source origin

#### Updated-version tool result

- ExPGuard: `still_detected`; original source `CHROME_ONMESSAGEEXTERNAL_MESSAGE` → sink `CHROME_TABS_CREATE_OPTIONS`; candidate matches: 1

#### Analysis and validation

- Dynamic (ExPGuard): `INCONCLUSIVE_AFTER_DEBUG` (basis `inconclusive`; evidence stage `LISTENER_READY`); the dynamic run did not establish a decisive runtime result; report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\chrome\extensions\kpiecbcckbofpmkkkdibbllpinceiihk_2.8.0\dynamic\dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `2.8.0` in a disposable chrome profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Use only a harmless marker in a disposable profile.
window.postMessage({ marker: "EXPGuard_test_marker" }, "*");
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/chrome/flow-verification-results-no-duplicate.json`; static report `not recorded`; dynamic report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\chrome\extensions\kpiecbcckbofpmkkkdibbllpinceiihk_2.8.0\dynamic\dynamic_report.json`.


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
