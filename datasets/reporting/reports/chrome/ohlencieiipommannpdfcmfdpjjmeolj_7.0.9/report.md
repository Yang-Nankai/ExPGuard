# Security Vulnerability Report: Critical CSRF via Privileged Network Request and Extension Storage Poisoning in PrintFriendly: Reader Mode, PDF Editor, Save as PDF & Screenshot

## Summary

We are writing on behalf of a security research team from Nankai University and the University of Liverpool. Our Ground Truth review identified **2 Flow(s)** in **PrintFriendly: Reader Mode, PDF Editor, Save as PDF & Screenshot** (chrome, extension ID `ohlencieiipommannpdfcmfdpjjmeolj`, version `7.0.9`).
The recorded issue type(s): **CSRF via Privileged Network Request; Extension Storage Poisoning**.

The store currently reports version `7.3.1`. The update revalidation is summarized per tool below. This report covers only the original Flow(s); newly introduced Flow(s) are out of scope. Any mixed result, tool failure, or incomplete automated run is called out explicitly and should not be read as a final remediation determination.

## Affected Extension Details

- Name: PrintFriendly: Reader Mode, PDF Editor, Save as PDF & Screenshot
- Platform: chrome
- Extension ID: `ohlencieiipommannpdfcmfdpjjmeolj`
- Dataset version: `7.0.9`
- Store version at review: `7.3.1`
- Users: 1000000
- Analysis tools: DoubleX, ExPGuard

## Findings

### Finding 1: Storage Poisoning

The Ground Truth record traces A page or sender able to reach the recorded message/event source from `WINDOW_MESSAGE_EVENT` (DoubleX web-accessible message input) in background.js at L6849 to the privileged sink `CHROME_LOCAL_STORAGE` (chrome.storage.local.set) in background.js at L6827. The source scope is in the recorded source context. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-4873ca7d7af2f571`
- Severity recorded by the analysis: **CRITICAL**
- Source: `WINDOW_MESSAGE_EVENT` (DoubleX web-accessible message input) in background.js at L6849
- Sink: `CHROME_LOCAL_STORAGE` (chrome.storage.local.set) in background.js at L6827
- Tools reporting this Flow: DoubleX

- Privilege boundary recorded: `False` (None); DoubleX matched external input to a sensitive API parameter.

#### Updated-version tool result

- DoubleX: `still_detected`; original source `WINDOW_MESSAGE_EVENT` → sink `CHROME_LOCAL_STORAGE`; candidate matches: 1

#### Analysis and validation

- Static (DoubleX): verdict `UNCERTAIN`, confidence 0.3; report `extensions/ohlencieiipommannpdfcmfdpjjmeolj_7.0.9/static/static_report.json`.
- Dynamic (DoubleX): `TOOL_LIMITATION` (basis `runtime_or_static_dynamic_evidence`); this result does not independently confirm execution at the sink; report `extensions/ohlencieiipommannpdfcmfdpjjmeolj_7.0.9/dynamic/dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `7.0.9` in a disposable chrome profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Use only a harmless marker in a disposable profile.
window.postMessage({ marker: "EXPGuard_test_marker" }, "*");
```

#### Supporting material

- DoubleX: source report `DoubleX/chrome/flow-verification-results-no-duplicate.json`; static report `extensions/ohlencieiipommannpdfcmfdpjjmeolj_7.0.9/static/static_report.json`; dynamic report `extensions/ohlencieiipommannpdfcmfdpjjmeolj_7.0.9/dynamic/dynamic_report.json`.

### Finding 2: Cross-Site Request Forgery (CSRF) / Privileged Network Request

The Ground Truth record traces An external extension able to message this extension from `CHROME_ONMESSAGEEXTERNAL_MESSAGE` (chrome.runtime.onMessageExternal.addListener[message]) in background at L1:C2037242 -> L1:C2037243 to the privileged sink `FETCH_HEADERS` (https://www.printfriendly.com/api/v4/user/profile) in background at L1:C2036036 -> L1:C2036143. The source scope is in the recorded source context. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-b91b90cc1c468432`
- Severity recorded by the analysis: **HIGH**
- Source: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` (chrome.runtime.onMessageExternal.addListener[message]) in background at L1:C2037242 -> L1:C2037243
- Sink: `FETCH_HEADERS` (https://www.printfriendly.com/api/v4/user/profile) in background at L1:C2036036 -> L1:C2036143
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (EXTERNALLY_CONNECTABLE); sink grants capability beyond the source origin

#### Updated-version tool result

- ExPGuard: `still_detected`; original source `CHROME_ONMESSAGEEXTERNAL_MESSAGE` → sink `FETCH_HEADERS`; candidate matches: 1

#### Analysis and validation

- Static (ExPGuard): verdict `TRUE_POSITIVE`, confidence 0.6; report `extensions/ohlencieiipommannpdfcmfdpjjmeolj_7.0.9/static/static_report.json`.
- Dynamic: no structured dynamic-verification result is attached to this Flow in the Ground Truth dataset.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `7.0.9` in a disposable chrome profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Use only a harmless marker in a disposable profile.
window.postMessage({ marker: "EXPGuard_test_marker" }, "*");
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/chrome/flow-verification-results-no-duplicate.json`; static report `extensions/ohlencieiipommannpdfcmfdpjjmeolj_7.0.9/static/static_report.json`; dynamic report `not recorded`.


## Recommendations

1. Authenticate page-to-extension events at the privilege boundary; validate the sender and origin instead of trusting DOM event detail.
2. Validate the request schema and restrict destination URLs, methods, headers, and bodies before issuing privileged network requests.
3. Do not let page-controlled cookies or DOM values select extension-owned storage values; validate the expected value and keep credentials in extension-owned UI/state.
4. Treat storage writes as privileged state changes: use an allowlisted schema, reject attacker-controlled keys, and avoid merging untrusted objects into extension state.
5. Reduce host permissions and sensitive API access to the smallest scope required by the feature.

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
