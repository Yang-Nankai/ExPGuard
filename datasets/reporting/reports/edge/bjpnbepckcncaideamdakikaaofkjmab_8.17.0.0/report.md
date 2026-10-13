# Security Vulnerability Report: Critical CSRF via Privileged Network Request, Extension Storage Poisoning, and other reported issues in CrankWheel Screen Sharing

## Summary

We are writing on behalf of a security research team from Nankai University and the University of Liverpool. Our Ground Truth review identified **7 Flow(s)** in **CrankWheel Screen Sharing** (edge, extension ID `bjpnbepckcncaideamdakikaaofkjmab`, version `8.17.0.0`).
The recorded issue type(s): **CSRF via Privileged Network Request; Extension Storage Poisoning; Sensitive Data Exposure; Unauthorized Tab/Window Control**.

The store currently reports version `8.22.0.0`. The update revalidation is summarized per tool below. This report covers only the original Flow(s); newly introduced Flow(s) are out of scope. Any mixed result, tool failure, or incomplete automated run is called out explicitly and should not be read as a final remediation determination.

## Affected Extension Details

- Name: CrankWheel Screen Sharing
- Platform: edge
- Extension ID: `bjpnbepckcncaideamdakikaaofkjmab`
- Dataset version: `8.17.0.0`
- Store version at review: `8.22.0.0`
- Users: 14534
- Analysis tools: CoCo, DoubleX, ExPGuard

## Findings

### Finding 1: Cross-Site Request Forgery (CSRF) / Privileged Network Request

The Ground Truth record traces Input reaching the recorded source from `STORAGE_ALL_ITEMS` (CoCo source evidence) in crx_headers/bg_header.js at L498:C1 -> L498:C1 to the privileged sink `FETCH_RESOURCE` (CoCo sink evidence) in gen/ext_bg_module.js at L482:C1 -> L482:C1. The source scope is in the recorded source context. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-0128ba20a1cc61a1`
- Severity recorded by the analysis: **HIGH**
- Source: `STORAGE_ALL_ITEMS` (CoCo source evidence) in crx_headers/bg_header.js at L498:C1 -> L498:C1
- Sink: `FETCH_RESOURCE` (CoCo sink evidence) in gen/ext_bg_module.js at L482:C1 -> L482:C1
- Tools reporting this Flow: CoCo

- Privilege boundary recorded: `True` (None); CoCo reported cross-boundary flow; verify with source

#### Updated-version tool result

- CoCo: `still_detected`; original source `STORAGE_ALL_ITEMS` → sink `FETCH_RESOURCE`; candidate matches: 1

#### Analysis and validation

- Static (CoCo): verdict `TRUE_POSITIVE`, confidence 0.6; report `extensions/bjpnbepckcncaideamdakikaaofkjmab_8.17.0.0/static/static_report.json`.
- Dynamic (CoCo): `NOT_ATTEMPTED` (basis `runtime_or_static_dynamic_evidence`); this result does not independently confirm execution at the sink; report `extensions/bjpnbepckcncaideamdakikaaofkjmab_8.17.0.0/dynamic/dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `8.17.0.0` in a disposable edge profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```text
Deliver the benign marker EXPGuard_test_marker through the source shown in
the finding, then observe whether it reaches the privileged sink.
```

#### Supporting material

- CoCo: source report `CoCo/edge/flow-verification-results-no-duplicate.json`; static report `extensions/bjpnbepckcncaideamdakikaaofkjmab_8.17.0.0/static/static_report.json`; dynamic report `extensions/bjpnbepckcncaideamdakikaaofkjmab_8.17.0.0/dynamic/dynamic_report.json`.

### Finding 2: Storage Poisoning

The Ground Truth record traces An external extension able to message this extension from `CHROME_ONMESSAGEEXTERNAL_MESSAGE` (chrome.runtime.onMessageExternal.addListener[message]) in gen/ext_bg_module at L123:C6 -> L123:C9 to the privileged sink `CHROME_LOCAL_STORAGE` (serverUrl) in gen/ext_bg_module at L59:C2 -> L59:C35. The source scope is in the recorded source context. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-3de0ee3e10d87e8d`
- Severity recorded by the analysis: **CRITICAL**
- Source: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` (chrome.runtime.onMessageExternal.addListener[message]) in gen/ext_bg_module at L123:C6 -> L123:C9
- Sink: `CHROME_LOCAL_STORAGE` (serverUrl) in gen/ext_bg_module at L59:C2 -> L59:C35
- Tools reporting this Flow: ExPGuard, CoCo, DoubleX

- Privilege boundary recorded: `True` (EXTERNALLY_CONNECTABLE); sink grants capability beyond the source origin

#### Updated-version tool result

- ExPGuard: `still_detected`; original source `CHROME_ONMESSAGEEXTERNAL_MESSAGE` → sink `CHROME_LOCAL_STORAGE`; candidate matches: 8
- CoCo: `still_detected`; original source `CHROME_ONMESSAGEEXTERNAL_MESSAGE` → sink `CHROME_LOCAL_STORAGE`; candidate matches: 1
- DoubleX: `still_detected`; original source `WINDOW_MESSAGE_EVENT` → sink `CHROME_LOCAL_STORAGE`; candidate matches: 2

#### Analysis and validation

- Dynamic (ExPGuard): `CONFIRMED` (basis `runtime_reproduced`; evidence stage `MARKER_REACHED`); runtime reproduction recorded; report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\edge\extensions\bjpnbepckcncaideamdakikaaofkjmab_8.17.0.0\dynamic\dynamic_report.json`.
- Static (CoCo): verdict `TRUE_POSITIVE`, confidence 0.6; report `extensions/bjpnbepckcncaideamdakikaaofkjmab_8.17.0.0/static/static_report.json`.
- Dynamic (CoCo): `EXTERNAL_CONDITION_REQUIRED` (basis `external_condition_required`); a sender-side precondition was recorded; this is not an unconditional runtime reproduction; report `extensions/bjpnbepckcncaideamdakikaaofkjmab_8.17.0.0/dynamic/dynamic_report.json`.
- Static (DoubleX): verdict `UNCERTAIN`, confidence 0; report `extensions/bjpnbepckcncaideamdakikaaofkjmab_8.17.0.0/static/static_report.json`.
- Dynamic (DoubleX): `NOT_ATTEMPTED` (basis `runtime_or_static_dynamic_evidence`); this result does not independently confirm execution at the sink; report `extensions/bjpnbepckcncaideamdakikaaofkjmab_8.17.0.0/dynamic/dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `8.17.0.0` in a disposable edge profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Use only a harmless marker in a disposable profile.
window.postMessage({ marker: "EXPGuard_test_marker" }, "*");
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/edge/flow-verification-results-no-duplicate.json`; static report `not recorded`; dynamic report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\edge\extensions\bjpnbepckcncaideamdakikaaofkjmab_8.17.0.0\dynamic\dynamic_report.json`.
- CoCo: source report `CoCo/edge/flow-verification-results-no-duplicate.json`; static report `extensions/bjpnbepckcncaideamdakikaaofkjmab_8.17.0.0/static/static_report.json`; dynamic report `extensions/bjpnbepckcncaideamdakikaaofkjmab_8.17.0.0/dynamic/dynamic_report.json`.
- DoubleX: source report `DoubleX/edge/flow-verification-results-no-duplicate.json`; static report `extensions/bjpnbepckcncaideamdakikaaofkjmab_8.17.0.0/static/static_report.json`; dynamic report `extensions/bjpnbepckcncaideamdakikaaofkjmab_8.17.0.0/dynamic/dynamic_report.json`.

### Finding 3: Storage Poisoning

The Ground Truth record traces An external extension able to message this extension from `CHROME_ONMESSAGEEXTERNAL_MESSAGE` (chrome.runtime.onMessageExternal.addListener[message]) in gen/ext_bg_module at L123:C6 -> L123:C9 to the privileged sink `CHROME_LOCAL_STORAGE` (reloadOnPopupClose) in gen/ext_bg_module at L172:C4 -> L172:C74. The source scope is in the recorded source context. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-614233c124aff37f`
- Severity recorded by the analysis: **HIGH**
- Source: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` (chrome.runtime.onMessageExternal.addListener[message]) in gen/ext_bg_module at L123:C6 -> L123:C9
- Sink: `CHROME_LOCAL_STORAGE` (reloadOnPopupClose) in gen/ext_bg_module at L172:C4 -> L172:C74
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (EXTERNALLY_CONNECTABLE); sink grants capability beyond the source origin

#### Updated-version tool result

- ExPGuard: `still_detected`; original source `CHROME_ONMESSAGEEXTERNAL_MESSAGE` → sink `CHROME_LOCAL_STORAGE`; candidate matches: 8

#### Analysis and validation

- Dynamic (ExPGuard): `CONFIRMED` (basis `runtime_reproduced`; evidence stage `MARKER_REACHED`); runtime reproduction recorded; report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\edge\extensions\bjpnbepckcncaideamdakikaaofkjmab_8.17.0.0\dynamic\dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `8.17.0.0` in a disposable edge profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Use only a harmless marker in a disposable profile.
window.postMessage({ marker: "EXPGuard_test_marker" }, "*");
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/edge/flow-verification-results-no-duplicate.json`; static report `not recorded`; dynamic report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\edge\extensions\bjpnbepckcncaideamdakikaaofkjmab_8.17.0.0\dynamic\dynamic_report.json`.

### Finding 4: Sensitive Data Exposure

The Ground Truth record traces Input reaching the recorded source from `STORAGE_ALL_ITEMS` (CoCo source evidence) in crx_headers/bg_header.js at L498:C1 -> L498:C1 to the privileged sink `CHROME_RUNTIME_ONMESSAGEEXTERNAL_SENDRESPONSE` (CoCo sink evidence) in gen/ext_bg_module.js at L132:C1 -> L132:C1. The source scope is in the recorded source context. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-8125050cd1fe7fd6`
- Severity recorded by the analysis: **HIGH**
- Source: `STORAGE_ALL_ITEMS` (CoCo source evidence) in crx_headers/bg_header.js at L498:C1 -> L498:C1
- Sink: `CHROME_RUNTIME_ONMESSAGEEXTERNAL_SENDRESPONSE` (CoCo sink evidence) in gen/ext_bg_module.js at L132:C1 -> L132:C1
- Tools reporting this Flow: CoCo, DoubleX

- Privilege boundary recorded: `True` (None); CoCo reported cross-boundary flow; verify with source

#### Updated-version tool result

- CoCo: `still_detected`; original source `STORAGE_ALL_ITEMS` → sink `CHROME_RUNTIME_ONMESSAGEEXTERNAL_SENDRESPONSE`; candidate matches: 1
- DoubleX: `still_detected`; original source `STORAGE_ALL_ITEMS` → sink `WINDOW_POSTMESSAGE`; candidate matches: 1

#### Analysis and validation

- Static (CoCo): verdict `TRUE_POSITIVE`, confidence 0.6; report `extensions/bjpnbepckcncaideamdakikaaofkjmab_8.17.0.0/static/static_report.json`.
- Dynamic (CoCo): `NOT_ATTEMPTED` (basis `runtime_or_static_dynamic_evidence`); this result does not independently confirm execution at the sink; report `extensions/bjpnbepckcncaideamdakikaaofkjmab_8.17.0.0/dynamic/dynamic_report.json`.
- Static (DoubleX): verdict `UNCERTAIN`, confidence 0; report `extensions/bjpnbepckcncaideamdakikaaofkjmab_8.17.0.0/static/static_report.json`.
- Dynamic (DoubleX): `SETUP_INCOMPLETE` (evidence stage `LISTENER_READY`); this result does not independently confirm execution at the sink; report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\round-doublex-edge-unconfirmed-20-r1\dynamic\doublex-edge-r1\summary.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `8.17.0.0` in a disposable edge profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```text
Deliver the benign marker EXPGuard_test_marker through the source shown in
the finding, then observe whether it reaches the privileged sink.
```

#### Supporting material

- CoCo: source report `CoCo/edge/flow-verification-results-no-duplicate.json`; static report `extensions/bjpnbepckcncaideamdakikaaofkjmab_8.17.0.0/static/static_report.json`; dynamic report `extensions/bjpnbepckcncaideamdakikaaofkjmab_8.17.0.0/dynamic/dynamic_report.json`.
- DoubleX: source report `DoubleX/edge/flow-verification-results-no-duplicate.json`; static report `extensions/bjpnbepckcncaideamdakikaaofkjmab_8.17.0.0/static/static_report.json`; dynamic report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\round-doublex-edge-unconfirmed-20-r1\dynamic\doublex-edge-r1\summary.json`.

### Finding 5: Unauthorized Tab or Window Manipulation

The Ground Truth record traces An external extension able to message this extension from `CHROME_ONMESSAGEEXTERNAL_MESSAGE` (CoCo source evidence) in gen/ext_bg_module.js at L157:C1 -> L157:C1 to the privileged sink `CHROME_WINDOWS_CREATE_OPTIONS` (CoCo sink evidence) in gen/ext_bg_module.js at L228:C1 -> L228:C1. The source scope is on pages matching `https://*.crankwheel.com/*, https://*.meeting.is/*, http://127.0.0.1/*, http://localhost/*, https://127.0.0.1/*, https://localhost/*`. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-c36d86d084deb480`
- Severity recorded by the analysis: **CRITICAL**
- Source: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` (CoCo source evidence) in gen/ext_bg_module.js at L157:C1 -> L157:C1
- Sink: `CHROME_WINDOWS_CREATE_OPTIONS` (CoCo sink evidence) in gen/ext_bg_module.js at L228:C1 -> L228:C1
- Tools reporting this Flow: CoCo, DoubleX

- Privilege boundary recorded: `True` (EXTERNALLY_CONNECTABLE); CoCo reported cross-boundary flow; verify with source

#### Updated-version tool result

- CoCo: `still_detected`; original source `CHROME_ONMESSAGEEXTERNAL_MESSAGE` → sink `CHROME_WINDOWS_CREATE_OPTIONS`; candidate matches: 1
- DoubleX: `still_detected`; original source `WINDOW_MESSAGE_EVENT` → sink `CHROME_WINDOWS_CREATE_OPTIONS`; candidate matches: 1

#### Analysis and validation

- Static (CoCo): verdict `TRUE_POSITIVE`, confidence 0.6; report `extensions/bjpnbepckcncaideamdakikaaofkjmab_8.17.0.0/static/static_report.json`.
- Dynamic (CoCo): `EXTERNAL_CONDITION_REQUIRED` (basis `external_condition_required`); a sender-side precondition was recorded; this is not an unconditional runtime reproduction; report `extensions/bjpnbepckcncaideamdakikaaofkjmab_8.17.0.0/dynamic/dynamic_report.json`.
- Static (DoubleX): verdict `TRUE_POSITIVE`, confidence 0.6; report `extensions/bjpnbepckcncaideamdakikaaofkjmab_8.17.0.0/static/static_report.json`.
- Dynamic (DoubleX): `INCONCLUSIVE_AFTER_DEBUG` (evidence stage `ENVIRONMENT_READY`); the dynamic run did not establish a decisive runtime result; report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\round-doublex-edge-unconfirmed-20-r1\dynamic\doublex-edge-r1\summary.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `8.17.0.0` in a disposable edge profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Use only a harmless marker in a disposable profile.
window.postMessage({ marker: "EXPGuard_test_marker" }, "*");
```

#### Supporting material

- CoCo: source report `CoCo/edge/flow-verification-results-no-duplicate.json`; static report `extensions/bjpnbepckcncaideamdakikaaofkjmab_8.17.0.0/static/static_report.json`; dynamic report `extensions/bjpnbepckcncaideamdakikaaofkjmab_8.17.0.0/dynamic/dynamic_report.json`.
- DoubleX: source report `DoubleX/edge/flow-verification-results-no-duplicate.json`; static report `extensions/bjpnbepckcncaideamdakikaaofkjmab_8.17.0.0/static/static_report.json`; dynamic report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\round-doublex-edge-unconfirmed-20-r1\dynamic\doublex-edge-r1\summary.json`.

### Finding 6: Cross-Site Request Forgery (CSRF) / Privileged Network Request

The Ground Truth record traces An external extension able to message this extension from `CHROME_ONMESSAGEEXTERNAL_MESSAGE` (From storage.local.set('serverUrl') in gen/ext_bg_module) in gen/ext_bg_module at L123:C6 -> L123:C9 to the privileged sink `FETCH_RESOURCE` ([Unknown URL]) in gen/ext_bg_module at L483:C4 -> L486:C6. The source scope is in the recorded source context. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-e68d7dea5b79ec72`
- Severity recorded by the analysis: **HIGH**
- Source: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` (From storage.local.set('serverUrl') in gen/ext_bg_module) in gen/ext_bg_module at L123:C6 -> L123:C9
- Sink: `FETCH_RESOURCE` ([Unknown URL]) in gen/ext_bg_module at L483:C4 -> L486:C6
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (EXTERNALLY_CONNECTABLE); sink grants capability beyond the source origin

#### Updated-version tool result

- ExPGuard: `still_detected`; original source `CHROME_ONMESSAGEEXTERNAL_MESSAGE` → sink `FETCH_RESOURCE`; candidate matches: 1

#### Analysis and validation

- Static (ExPGuard): verdict `UNCERTAIN`, confidence 0; report `extensions/bjpnbepckcncaideamdakikaaofkjmab_8.17.0.0/static/static_report.json`.
- Dynamic (ExPGuard): `EXTERNAL_CONDITION_REQUIRED` (basis `external_condition_required`); a sender-side precondition was recorded; this is not an unconditional runtime reproduction; report `extensions/bjpnbepckcncaideamdakikaaofkjmab_8.17.0.0/dynamic/dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `8.17.0.0` in a disposable edge profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Use only a harmless marker in a disposable profile.
window.postMessage({ marker: "EXPGuard_test_marker" }, "*");
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/edge/flow-verification-results-no-duplicate.json`; static report `extensions/bjpnbepckcncaideamdakikaaofkjmab_8.17.0.0/static/static_report.json`; dynamic report `extensions/bjpnbepckcncaideamdakikaaofkjmab_8.17.0.0/dynamic/dynamic_report.json`.

### Finding 7: Storage Poisoning

The Ground Truth record traces An external extension able to message this extension from `CHROME_ONMESSAGEEXTERNAL_MESSAGE` (From storage.local.set('serverUrl') in gen/ext_bg_module) in gen/ext_bg_module at L123:C6 -> L123:C9 to the privileged sink `CHROME_LOCAL_STORAGE` (serverUrl) in js/ext_common at L56:C2 -> L56:C35. The source scope is in the recorded source context. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-f22fd2ac54850f56`
- Severity recorded by the analysis: **HIGH**
- Source: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` (From storage.local.set('serverUrl') in gen/ext_bg_module) in gen/ext_bg_module at L123:C6 -> L123:C9
- Sink: `CHROME_LOCAL_STORAGE` (serverUrl) in js/ext_common at L56:C2 -> L56:C35
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (EXTERNALLY_CONNECTABLE); sink grants capability beyond the source origin

#### Updated-version tool result

- ExPGuard: `still_detected`; original source `CHROME_ONMESSAGEEXTERNAL_MESSAGE` → sink `CHROME_LOCAL_STORAGE`; candidate matches: 8

#### Analysis and validation

- Static (ExPGuard): verdict `TRUE_POSITIVE`, confidence 0.6; report `extensions/bjpnbepckcncaideamdakikaaofkjmab_8.17.0.0/static/static_report.json`.
- Dynamic (ExPGuard): `EXTERNAL_CONDITION_REQUIRED` (basis `external_condition_required`); a sender-side precondition was recorded; this is not an unconditional runtime reproduction; report `extensions/bjpnbepckcncaideamdakikaaofkjmab_8.17.0.0/dynamic/dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `8.17.0.0` in a disposable edge profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Use only a harmless marker in a disposable profile.
window.postMessage({ marker: "EXPGuard_test_marker" }, "*");
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/edge/flow-verification-results-no-duplicate.json`; static report `extensions/bjpnbepckcncaideamdakikaaofkjmab_8.17.0.0/static/static_report.json`; dynamic report `extensions/bjpnbepckcncaideamdakikaaofkjmab_8.17.0.0/dynamic/dynamic_report.json`.


## Recommendations

1. Authenticate page-to-extension events at the privilege boundary; validate the sender and origin instead of trusting DOM event detail.
2. Validate the request schema and restrict destination URLs, methods, headers, and bodies before issuing privileged network requests.
3. Do not let page-controlled cookies or DOM values select extension-owned storage values; validate the expected value and keep credentials in extension-owned UI/state.
4. Treat storage writes as privileged state changes: use an allowlisted schema, reject attacker-controlled keys, and avoid merging untrusted objects into extension state.
5. Never return sensitive extension data to an untrusted page or external sender; enforce an explicit origin and sender allowlist.
6. Validate tab/window IDs and navigation targets, and require a user gesture for externally initiated changes.
7. Reduce host permissions and sensitive API access to the smallest scope required by the feature.

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
