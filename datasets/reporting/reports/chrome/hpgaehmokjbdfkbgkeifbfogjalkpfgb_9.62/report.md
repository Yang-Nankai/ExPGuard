# Security Vulnerability Report: Critical Extension Storage Poisoning and Sensitive Data Exposure in NTL MOD for Slither.io

## Summary

We are writing on behalf of a security research team from Nankai University and the University of Liverpool. Our Ground Truth review identified **2 Flow(s)** in **NTL MOD for Slither.io** (chrome, extension ID `hpgaehmokjbdfkbgkeifbfogjalkpfgb`, version `9.62`).
The recorded issue type(s): **Extension Storage Poisoning; Sensitive Data Exposure**.

The store currently reports version `9.68`. The update revalidation is summarized per tool below. This report covers only the original Flow(s); newly introduced Flow(s) are out of scope. Any mixed result, tool failure, or incomplete automated run is called out explicitly and should not be read as a final remediation determination.

## Affected Extension Details

- Name: NTL MOD for Slither.io
- Platform: chrome
- Extension ID: `hpgaehmokjbdfkbgkeifbfogjalkpfgb`
- Dataset version: `9.62`
- Store version at review: `9.68`
- Users: 60000
- Analysis tools: DoubleX

## Findings

### Finding 1: Sensitive Data Exposure

The Ground Truth record traces Input reaching the recorded source from `STORAGE_ALL_ITEMS` (chrome.storage.local.get) in background.js at L150 to the privileged sink `WINDOW_POSTMESSAGE` ({
							ok: true,
							data: r || {}
						}) in background.js at L158. The source scope is in the recorded source context. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-65d5921e8551701a`
- Severity recorded by the analysis: **HIGH**
- Source: `STORAGE_ALL_ITEMS` (chrome.storage.local.get) in background.js at L150
- Sink: `WINDOW_POSTMESSAGE` ({
							ok: true,
							data: r || {}
						}) in background.js at L158
- Tools reporting this Flow: DoubleX

- Privilege boundary recorded: `True` (None); Sensitive extension data is returned to a web-accessible channel.

#### Updated-version tool result

- DoubleX: `still_detected`; original source `STORAGE_ALL_ITEMS` → sink `WINDOW_POSTMESSAGE`; candidate matches: 1

#### Analysis and validation

- Static (DoubleX): verdict `UNCERTAIN`, confidence 0; report `extensions/hpgaehmokjbdfkbgkeifbfogjalkpfgb_9.62/static/static_report.json`.
- Dynamic (DoubleX): `INCONCLUSIVE_AFTER_DEBUG` (basis `runtime_or_static_dynamic_evidence`); the dynamic run did not establish a decisive runtime result; report `extensions/hpgaehmokjbdfkbgkeifbfogjalkpfgb_9.62/dynamic/dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `9.62` in a disposable chrome profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```text
Deliver the benign marker EXPGuard_test_marker through the source shown in
the finding, then observe whether it reaches the privileged sink.
```

#### Supporting material

- DoubleX: source report `DoubleX/chrome/flow-verification-results-no-duplicate.json`; static report `extensions/hpgaehmokjbdfkbgkeifbfogjalkpfgb_9.62/static/static_report.json`; dynamic report `extensions/hpgaehmokjbdfkbgkeifbfogjalkpfgb_9.62/dynamic/dynamic_report.json`.

### Finding 2: Storage Poisoning

The Ground Truth record traces A page or sender able to reach the recorded message/event source from `WINDOW_MESSAGE_EVENT` (DoubleX web-accessible message input) in background.js at L56 to the privileged sink `CHROME_LOCAL_STORAGE` (chrome.storage.local.set) in background.js at L166. The source scope is in the recorded source context. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-d44311057403c367`
- Severity recorded by the analysis: **CRITICAL**
- Source: `WINDOW_MESSAGE_EVENT` (DoubleX web-accessible message input) in background.js at L56
- Sink: `CHROME_LOCAL_STORAGE` (chrome.storage.local.set) in background.js at L166
- Tools reporting this Flow: DoubleX

- Privilege boundary recorded: `False` (None); DoubleX matched external input to a sensitive API parameter.

#### Updated-version tool result

- DoubleX: `still_detected`; original source `WINDOW_MESSAGE_EVENT` → sink `CHROME_LOCAL_STORAGE`; candidate matches: 1

#### Analysis and validation

- Static (DoubleX): verdict `TRUE_POSITIVE`, confidence 0.6; report `extensions/hpgaehmokjbdfkbgkeifbfogjalkpfgb_9.62/static/static_report.json`.
- Dynamic (DoubleX): `INCONCLUSIVE_AFTER_DEBUG` (basis `runtime_or_static_dynamic_evidence`); the dynamic agent exceeded its 30-second budget, so this run did not establish a decisive runtime result; report `extensions/hpgaehmokjbdfkbgkeifbfogjalkpfgb_9.62/dynamic/dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `9.62` in a disposable chrome profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Use only a harmless marker in a disposable profile.
window.postMessage({ marker: "EXPGuard_test_marker" }, "*");
```

#### Supporting material

- DoubleX: source report `DoubleX/chrome/flow-verification-results-no-duplicate.json`; static report `extensions/hpgaehmokjbdfkbgkeifbfogjalkpfgb_9.62/static/static_report.json`; dynamic report `extensions/hpgaehmokjbdfkbgkeifbfogjalkpfgb_9.62/dynamic/dynamic_report.json`.


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
