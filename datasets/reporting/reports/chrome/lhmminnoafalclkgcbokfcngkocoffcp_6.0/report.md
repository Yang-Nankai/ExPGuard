# Security Vulnerability Report: Critical Extension Storage Poisoning and Sensitive Data Exposure in Flow3

## Summary

We are writing on behalf of a security research team from Nankai University and the University of Liverpool. Our Ground Truth review identified **2 Flow(s)** in **Flow3** (chrome, extension ID `lhmminnoafalclkgcbokfcngkocoffcp`, version `6.0`).
The recorded issue type(s): **Extension Storage Poisoning; Sensitive Data Exposure**.

## Affected Extension Details

- Name: Flow3
- Platform: chrome
- Extension ID: `lhmminnoafalclkgcbokfcngkocoffcp`
- Dataset version: `6.0`
- Store version at review: `6.0`
- Users: 30000
- Analysis tools: DoubleX, ExPGuard

## Findings

### Finding 1: Storage Poisoning

The Ground Truth record traces A page or sender able to reach the recorded message/event source from `WINDOW_MESSAGE_EVENT` (window.addEventListener(message)) in content at L2:C34 -> L2:C49 to the privileged sink `CHROME_LOCAL_STORAGE` (access_token) in background at L50:C4 -> L62:C5. The source scope is on pages matching `https://flow-dashboard-lac.vercel.app/*, https://app.flow3.tech/*, http://localhost:3000/*, https://localhost:3000/*`. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-430cf586d0b81867`
- Severity recorded by the analysis: **CRITICAL**
- Source: `WINDOW_MESSAGE_EVENT` (window.addEventListener(message)) in content at L2:C34 -> L2:C49
- Sink: `CHROME_LOCAL_STORAGE` (access_token) in background at L50:C4 -> L62:C5
- Tools reporting this Flow: ExPGuard, DoubleX

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Analysis and validation

- Static (ExPGuard): verdict `TRUE_POSITIVE`, confidence 0.6; report `extensions/lhmminnoafalclkgcbokfcngkocoffcp_6.0/static/static_report.json`.
- Dynamic (ExPGuard): `CONFIRMED` (basis `runtime_reproduced`); runtime reproduction recorded; report `extensions/lhmminnoafalclkgcbokfcngkocoffcp_6.0/dynamic/dynamic_report.json`.
- Static (DoubleX): verdict `TRUE_POSITIVE`, confidence 0.6; report `extensions/lhmminnoafalclkgcbokfcngkocoffcp_6.0/static/static_report.json`.
- Dynamic (DoubleX): `INCONCLUSIVE_AFTER_DEBUG` (basis `runtime_or_static_dynamic_evidence`); the dynamic agent exceeded its 30-second budget, so this run did not establish a decisive runtime result; report `extensions/lhmminnoafalclkgcbokfcngkocoffcp_6.0/dynamic/dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `6.0` in a disposable chrome profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Use only a harmless marker in a disposable profile.
window.postMessage({ marker: "EXPGuard_test_marker" }, "*");
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/chrome/flow-verification-results-no-duplicate.json`; static report `extensions/lhmminnoafalclkgcbokfcngkocoffcp_6.0/static/static_report.json`; dynamic report `extensions/lhmminnoafalclkgcbokfcngkocoffcp_6.0/dynamic/dynamic_report.json`.
- DoubleX: source report `DoubleX/chrome/flow-verification-results-no-duplicate.json`; static report `extensions/lhmminnoafalclkgcbokfcngkocoffcp_6.0/static/static_report.json`; dynamic report `extensions/lhmminnoafalclkgcbokfcngkocoffcp_6.0/dynamic/dynamic_report.json`.

### Finding 2: Sensitive Data Exposure

The Ground Truth record traces Input reaching the recorded source from `STORAGE_ALL_ITEMS` (chrome.storage.local.get) in background.js at L10 to the privileged sink `WINDOW_POSTMESSAGE` ({
							type: "RESPONSE_FULL_TOKEN",
							payload: response
						}) in content_scripts.js at L14. The source scope is in the recorded source context. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-e6adf0e9c1fe01db`
- Severity recorded by the analysis: **HIGH**
- Source: `STORAGE_ALL_ITEMS` (chrome.storage.local.get) in background.js at L10
- Sink: `WINDOW_POSTMESSAGE` ({
							type: "RESPONSE_FULL_TOKEN",
							payload: response
						}) in content_scripts.js at L14
- Tools reporting this Flow: DoubleX

- Privilege boundary recorded: `True` (None); Sensitive extension data is returned to a web-accessible channel.

#### Analysis and validation

- Static (DoubleX): verdict `UNCERTAIN`, confidence 0; report `extensions/lhmminnoafalclkgcbokfcngkocoffcp_6.0/static/static_report.json`.
- Dynamic (DoubleX): `INCONCLUSIVE_AFTER_DEBUG` (basis `runtime_or_static_dynamic_evidence`); the dynamic run did not establish a decisive runtime result; report `extensions/lhmminnoafalclkgcbokfcngkocoffcp_6.0/dynamic/dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `6.0` in a disposable chrome profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```text
Deliver the benign marker EXPGuard_test_marker through the source shown in
the finding, then observe whether it reaches the privileged sink.
```

#### Supporting material

- DoubleX: source report `DoubleX/chrome/flow-verification-results-no-duplicate.json`; static report `extensions/lhmminnoafalclkgcbokfcngkocoffcp_6.0/static/static_report.json`; dynamic report `extensions/lhmminnoafalclkgcbokfcngkocoffcp_6.0/dynamic/dynamic_report.json`.


## Recommendations

1. Do not let page-controlled cookies or DOM values select extension-owned storage values; validate the expected value and keep credentials in extension-owned UI/state.
2. Treat storage writes as privileged state changes: use an allowlisted schema, reject attacker-controlled keys, and avoid merging untrusted objects into extension state.
3. Never return sensitive extension data to an untrusted page or external sender; enforce an explicit origin and sender allowlist.
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
