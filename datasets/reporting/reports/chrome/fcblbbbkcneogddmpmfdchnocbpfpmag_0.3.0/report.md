# Security Vulnerability Report: Critical Extension Storage Poisoning and Privilege Escalation in Caffeine - Keep Awake

## Summary

We are writing on behalf of a security research team from Nankai University and the University of Liverpool. Our Ground Truth review identified **2 Flow(s)** in **Caffeine - Keep Awake** (chrome, extension ID `fcblbbbkcneogddmpmfdchnocbpfpmag`, version `0.3.0`).
The recorded issue type(s): **Extension Storage Poisoning; Privilege Escalation**.

The store currently reports version `0.3.1`. The update revalidation is summarized per tool below. This report covers only the original Flow(s); newly introduced Flow(s) are out of scope. Any mixed result, tool failure, or incomplete automated run is called out explicitly and should not be read as a final remediation determination.

## Affected Extension Details

- Name: Caffeine - Keep Awake
- Platform: chrome
- Extension ID: `fcblbbbkcneogddmpmfdchnocbpfpmag`
- Dataset version: `0.3.0`
- Store version at review: `0.3.1`
- Users: 60000
- Analysis tools: ExPGuard

## Findings

### Finding 1: Privilege Escalation

The Ground Truth record traces A page or sender able to reach the recorded message/event source from `CHROME_ONCONNECTEXTERNAL_ONMESSAGE` (From storage.local.set('level') in worker) in worker at L144:C8 -> L144:C15 to the privileged sink `CHROME_ACTION_TITLE_OPTIONS` in worker at L62:C6 -> L64:C8. The source scope is in the recorded source context. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-10534f705c2559db`
- Severity recorded by the analysis: **CRITICAL**
- Source: `CHROME_ONCONNECTEXTERNAL_ONMESSAGE` (From storage.local.set('level') in worker) in worker at L144:C8 -> L144:C15
- Sink: `CHROME_ACTION_TITLE_OPTIONS` in worker at L62:C6 -> L64:C8
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (EXTERNALLY_CONNECTABLE); sink grants capability beyond the source origin

#### Updated-version tool result

- ExPGuard: `still_detected`; original source `CHROME_ONCONNECTEXTERNAL_ONMESSAGE` → sink `CHROME_ACTION_TITLE_OPTIONS`; candidate matches: 1

#### Analysis and validation

- Dynamic (ExPGuard): `CONFIRMED` (basis `runtime_reproduced`; evidence stage `MARKER_REACHED`); runtime reproduction recorded; report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\chrome\extensions\fcblbbbkcneogddmpmfdchnocbpfpmag_0.3.0\dynamic\dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `0.3.0` in a disposable chrome profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Use only a harmless marker in a disposable profile.
window.postMessage({ marker: "EXPGuard_test_marker" }, "*");
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/chrome/flow-verification-results-no-duplicate.json`; static report `not recorded`; dynamic report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\chrome\extensions\fcblbbbkcneogddmpmfdchnocbpfpmag_0.3.0\dynamic\dynamic_report.json`.

### Finding 2: Storage Poisoning

The Ground Truth record traces A page or sender able to reach the recorded message/event source from `CHROME_ONCONNECTEXTERNAL_ONMESSAGE` (chrome.runtime.onConnectExternal.addListener[onMessage]) in worker at L144:C8 -> L144:C15 to the privileged sink `CHROME_LOCAL_STORAGE` (level) in worker at L176:C6 -> L179:C8. The source scope is in the recorded source context. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-ea9018c356103f78`
- Severity recorded by the analysis: **CRITICAL**
- Source: `CHROME_ONCONNECTEXTERNAL_ONMESSAGE` (chrome.runtime.onConnectExternal.addListener[onMessage]) in worker at L144:C8 -> L144:C15
- Sink: `CHROME_LOCAL_STORAGE` (level) in worker at L176:C6 -> L179:C8
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (EXTERNALLY_CONNECTABLE); sink grants capability beyond the source origin

#### Updated-version tool result

- ExPGuard: `still_detected`; original source `CHROME_ONCONNECTEXTERNAL_ONMESSAGE` → sink `CHROME_LOCAL_STORAGE`; candidate matches: 2

#### Analysis and validation

- Static (ExPGuard): verdict `TRUE_POSITIVE`, confidence 0.6; report `extensions/fcblbbbkcneogddmpmfdchnocbpfpmag_0.3.0/static/static_report.json`.
- Dynamic (ExPGuard): `CONFIRMED` (basis `runtime_reproduced`; evidence stage `MARKER_REACHED`); runtime reproduction recorded; report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\chrome\extensions\fcblbbbkcneogddmpmfdchnocbpfpmag_0.3.0\dynamic\dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `0.3.0` in a disposable chrome profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Use only a harmless marker in a disposable profile.
window.postMessage({ marker: "EXPGuard_test_marker" }, "*");
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/chrome/flow-verification-results-no-duplicate.json`; static report `extensions/fcblbbbkcneogddmpmfdchnocbpfpmag_0.3.0/static/static_report.json`; dynamic report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\chrome\extensions\fcblbbbkcneogddmpmfdchnocbpfpmag_0.3.0\dynamic\dynamic_report.json`.


## Recommendations

1. Do not let page-controlled cookies or DOM values select extension-owned storage values; validate the expected value and keep credentials in extension-owned UI/state.
2. Treat storage writes as privileged state changes: use an allowlisted schema, reject attacker-controlled keys, and avoid merging untrusted objects into extension state.
3. Reduce host permissions and sensitive API access to the smallest scope required by the feature.

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
