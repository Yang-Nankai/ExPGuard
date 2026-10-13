# Security Vulnerability Report: Critical Extension Storage Poisoning and Sensitive Data Exposure in Group Contact Extractor for WA

## Summary

We are writing on behalf of a security research team from Nankai University and the University of Liverpool. Our Ground Truth review identified **2 Flow(s)** in **Group Contact Extractor for WA** (chrome, extension ID `hboaocjifmkibpeajkgaliiaaiodikon`, version `2.0.8`).
The recorded issue type(s): **Extension Storage Poisoning; Sensitive Data Exposure**.

The store currently reports version `2.0.12`. The update revalidation is summarized per tool below. This report covers only the original Flow(s); newly introduced Flow(s) are out of scope. Any mixed result, tool failure, or incomplete automated run is called out explicitly and should not be read as a final remediation determination.

## Affected Extension Details

- Name: Group Contact Extractor for WA
- Platform: chrome
- Extension ID: `hboaocjifmkibpeajkgaliiaaiodikon`
- Dataset version: `2.0.8`
- Store version at review: `2.0.12`
- Users: 40000
- Analysis tools: CoCo, DoubleX, ExPGuard

## Findings

### Finding 1: Sensitive Data Exposure

The Ground Truth record traces Input reaching the recorded source from `STORAGE_ALL_ITEMS` (chrome.storage.local.get) in content_scripts.js at L98 to the privileged sink `WINDOW_POSTMESSAGE` ({
					groupsInfoTwo: !0,
					num: e.userNumber
				}) in content_scripts.js at L99. The source scope is on pages matching `<all_urls>`. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-16c1e78166344a65`
- Severity recorded by the analysis: **HIGH**
- Source: `STORAGE_ALL_ITEMS` (chrome.storage.local.get) in content_scripts.js at L98
- Sink: `WINDOW_POSTMESSAGE` ({
					groupsInfoTwo: !0,
					num: e.userNumber
				}) in content_scripts.js at L99
- Tools reporting this Flow: DoubleX

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); Sensitive extension data is returned to a web-accessible channel.

#### Updated-version tool result

- DoubleX: `still_detected`; original source `STORAGE_ALL_ITEMS` → sink `WINDOW_POSTMESSAGE`; candidate matches: 1

#### Analysis and validation

- Static (DoubleX): verdict `UNCERTAIN`, confidence 0; report `extensions/hboaocjifmkibpeajkgaliiaaiodikon_2.0.8/static/static_report.json`.
- Dynamic (DoubleX): `CONFIRMED` (basis `runtime_or_static_dynamic_evidence`); runtime reproduction recorded; report `extensions/hboaocjifmkibpeajkgaliiaaiodikon_2.0.8/dynamic/dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `2.0.8` in a disposable chrome profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```text
Deliver the benign marker EXPGuard_test_marker through the source shown in
the finding, then observe whether it reaches the privileged sink.
```

#### Supporting material

- DoubleX: source report `DoubleX/chrome/flow-verification-results-no-duplicate.json`; static report `extensions/hboaocjifmkibpeajkgaliiaaiodikon_2.0.8/static/static_report.json`; dynamic report `extensions/hboaocjifmkibpeajkgaliiaaiodikon_2.0.8/dynamic/dynamic_report.json`.

### Finding 2: Storage Poisoning

The Ground Truth record traces A page or sender able to reach the recorded message/event source from `WINDOW_MESSAGE_EVENT` (window.addEventListener(message)) in content-script at L1:C3086 -> L1:C3111 to the privileged sink `CHROME_LOCAL_STORAGE` (businessFlag) in content-script at L1:C3113 -> L1:C3246. The source scope is on pages matching `https://*.whatsapp.com/*, http://*.whatsapp.com/*`. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-4244ce6cbeba577e`
- Severity recorded by the analysis: **CRITICAL**
- Source: `WINDOW_MESSAGE_EVENT` (window.addEventListener(message)) in content-script at L1:C3086 -> L1:C3111
- Sink: `CHROME_LOCAL_STORAGE` (businessFlag) in content-script at L1:C3113 -> L1:C3246
- Tools reporting this Flow: ExPGuard, CoCo, DoubleX

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Updated-version tool result

- ExPGuard: `still_detected`; original source `WINDOW_MESSAGE_EVENT` → sink `CHROME_LOCAL_STORAGE`; candidate matches: 5
- CoCo: `tool_failure`; original source `WINDOW_MESSAGE_EVENT` → sink `CHROME_LOCAL_STORAGE`; candidate matches: 0
- DoubleX: `still_detected`; original source `WINDOW_MESSAGE_EVENT` → sink `CHROME_LOCAL_STORAGE`; candidate matches: 5

#### Analysis and validation

- Static (ExPGuard): verdict `TRUE_POSITIVE`, confidence 0.6; report `extensions/hboaocjifmkibpeajkgaliiaaiodikon_2.0.8/static/static_report.json`.
- Dynamic (ExPGuard): `CONFIRMED` (basis `runtime_reproduced`); runtime reproduction recorded; report `extensions/hboaocjifmkibpeajkgaliiaaiodikon_2.0.8/dynamic/dynamic_report.json`.
- Static (CoCo): verdict `TRUE_POSITIVE`, confidence 0.6; report `extensions/hboaocjifmkibpeajkgaliiaaiodikon_2.0.8/static/static_report.json`.
- Dynamic (CoCo): `CONFIRMED` (basis `runtime_or_static_dynamic_evidence`); runtime reproduction recorded; report `extensions/hboaocjifmkibpeajkgaliiaaiodikon_2.0.8/dynamic/dynamic_report.json`.
- Static (DoubleX): verdict `TRUE_POSITIVE`, confidence 0.6; report `extensions/hboaocjifmkibpeajkgaliiaaiodikon_2.0.8/static/static_report.json`.
- Dynamic (DoubleX): `INCONCLUSIVE_AFTER_DEBUG` (basis `runtime_or_static_dynamic_evidence`); the dynamic agent exceeded its 30-second budget, so this run did not establish a decisive runtime result; report `extensions/hboaocjifmkibpeajkgaliiaaiodikon_2.0.8/dynamic/dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `2.0.8` in a disposable chrome profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Use only a harmless marker in a disposable profile.
window.postMessage({ marker: "EXPGuard_test_marker" }, "*");
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/chrome/flow-verification-results-no-duplicate.json`; static report `extensions/hboaocjifmkibpeajkgaliiaaiodikon_2.0.8/static/static_report.json`; dynamic report `extensions/hboaocjifmkibpeajkgaliiaaiodikon_2.0.8/dynamic/dynamic_report.json`.
- CoCo: source report `CoCo/chrome/flow-verification-results-no-duplicate.json`; static report `extensions/hboaocjifmkibpeajkgaliiaaiodikon_2.0.8/static/static_report.json`; dynamic report `extensions/hboaocjifmkibpeajkgaliiaaiodikon_2.0.8/dynamic/dynamic_report.json`.
- DoubleX: source report `DoubleX/chrome/flow-verification-results-no-duplicate.json`; static report `extensions/hboaocjifmkibpeajkgaliiaaiodikon_2.0.8/static/static_report.json`; dynamic report `extensions/hboaocjifmkibpeajkgaliiaaiodikon_2.0.8/dynamic/dynamic_report.json`.


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
