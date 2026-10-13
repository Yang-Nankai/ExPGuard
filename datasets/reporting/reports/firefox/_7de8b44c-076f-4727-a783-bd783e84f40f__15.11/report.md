# Security Vulnerability Report: Critical Extension Storage Poisoning and Sensitive Data Exposure in Youtube Bilingual Subtitles

## Summary

We are writing on behalf of a security research team from Nankai University and the University of Liverpool. Our Ground Truth review identified **2 Flow(s)** in **Youtube Bilingual Subtitles** (firefox, extension ID `{7de8b44c-076f-4727-a783-bd783e84f40f}`, version `15.11`).
The recorded issue type(s): **Extension Storage Poisoning; Sensitive Data Exposure**.

The store currently reports version `15.31`. The update revalidation is summarized per tool below. This report covers only the original Flow(s); newly introduced Flow(s) are out of scope. Any mixed result, tool failure, or incomplete automated run is called out explicitly and should not be read as a final remediation determination.

## Affected Extension Details

- Name: Youtube Bilingual Subtitles
- Platform: firefox
- Extension ID: `{7de8b44c-076f-4727-a783-bd783e84f40f}`
- Dataset version: `15.11`
- Store version at review: `15.31`
- Users: 640
- Analysis tools: DoubleX

## Findings

### Finding 1: Sensitive Data Exposure

The Ground Truth record traces Input reaching the recorded source from `STORAGE_ALL_ITEMS` (chrome.storage.sync.get) in content_scripts.js at L2438 to the privileged sink `WINDOW_POSTMESSAGE` (age":
						chrome.storage.sync.get(m, e => {
							window.postMessage({
								direction: ) in content_scripts.js at L2439. The source scope is on pages matching `https://*.youtube.com/*, https://*.netflixsubs.app/login*, https://*.netflixsubs.app/v2/auth/patreon/callback*`. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-7383fca78793b067`
- Severity recorded by the analysis: **HIGH**
- Source: `STORAGE_ALL_ITEMS` (chrome.storage.sync.get) in content_scripts.js at L2438
- Sink: `WINDOW_POSTMESSAGE` (age":
						chrome.storage.sync.get(m, e => {
							window.postMessage({
								direction: ) in content_scripts.js at L2439
- Tools reporting this Flow: DoubleX

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); Sensitive extension data is returned to a web-accessible channel.

#### Updated-version tool result

- DoubleX: `still_detected`; original source `STORAGE_ALL_ITEMS` → sink `WINDOW_POSTMESSAGE`; candidate matches: 6

#### Analysis and validation

- Static (DoubleX): verdict `UNCERTAIN`, confidence 0; report `extensions/{7de8b44c-076f-4727-a783-bd783e84f40f}_15.11/static/static_report.json`.
- Dynamic: no structured dynamic-verification result is attached to this Flow in the Ground Truth dataset.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `15.11` in a disposable firefox profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```text
Deliver the benign marker EXPGuard_test_marker through the source shown in
the finding, then observe whether it reaches the privileged sink.
```

#### Supporting material

- DoubleX: source report `DoubleX/firefox/flow-verification-results-no-duplicate.json`; static report `extensions/{7de8b44c-076f-4727-a783-bd783e84f40f}_15.11/static/static_report.json`; dynamic report `not recorded`.

### Finding 2: Storage Poisoning

The Ground Truth record traces A page or sender able to reach the recorded message/event source from `WINDOW_MESSAGE_EVENT` (DoubleX web-accessible message input) in content_scripts.js at L325 to the privileged sink `CHROME_SYNC_STORAGE` (chrome.storage.sync.set) in content_scripts.js at L2540. The source scope is on pages matching `https://*.youtube.com/*, https://*.netflixsubs.app/login*, https://*.netflixsubs.app/v2/auth/patreon/callback*`. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-db489051202d9119`
- Severity recorded by the analysis: **CRITICAL**
- Source: `WINDOW_MESSAGE_EVENT` (DoubleX web-accessible message input) in content_scripts.js at L325
- Sink: `CHROME_SYNC_STORAGE` (chrome.storage.sync.set) in content_scripts.js at L2540
- Tools reporting this Flow: DoubleX

- Privilege boundary recorded: `False` (CONTENT_SCRIPT_MATCHES); DoubleX matched external input to a sensitive API parameter.

#### Updated-version tool result

- DoubleX: `still_detected`; original source `WINDOW_MESSAGE_EVENT` → sink `CHROME_SYNC_STORAGE`; candidate matches: 1

#### Analysis and validation

- Static (DoubleX): verdict `UNCERTAIN`, confidence 0.3; report `extensions/{7de8b44c-076f-4727-a783-bd783e84f40f}_15.11/static/static_report.json`.
- Dynamic (DoubleX): `SINK_NOT_FIRED` (basis `runtime_or_static_dynamic_evidence`); the recorded replay did not establish the complete source-to-sink effect; report `extensions/{7de8b44c-076f-4727-a783-bd783e84f40f}_15.11/dynamic/dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `15.11` in a disposable firefox profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Use only a harmless marker in a disposable profile.
window.postMessage({ marker: "EXPGuard_test_marker" }, "*");
```

#### Supporting material

- DoubleX: source report `DoubleX/firefox/flow-verification-results-no-duplicate.json`; static report `extensions/{7de8b44c-076f-4727-a783-bd783e84f40f}_15.11/static/static_report.json`; dynamic report `extensions/{7de8b44c-076f-4727-a783-bd783e84f40f}_15.11/dynamic/dynamic_report.json`.


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
- Contact discovery: `found` (Mozilla Add-ons API support_email)

Please contact us so that we can coordinate remediation and retest the affected Flow(s).

Regards,
Xin Yang
Nankai University / University of Liverpool
