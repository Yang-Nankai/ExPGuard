# Security Vulnerability Report: Critical CSRF via Privileged Network Request, Extension Storage Poisoning, and other reported issues in AdsMeta — Facebook Ads Manager

## Summary

We are writing on behalf of a security research team from Nankai University and the University of Liverpool. Our Ground Truth review identified **6 Flow(s)** in **AdsMeta — Facebook Ads Manager** (chrome, extension ID `ookgnahfklmejhicejjbfjifppjbfnlk`, version `5.3.3`).
The recorded issue type(s): **CSRF via Privileged Network Request; Extension Storage Poisoning; Sensitive Data Exposure**.

The store currently reports version `5.3.24`. The update revalidation is summarized per tool below. This report covers only the original Flow(s); newly introduced Flow(s) are out of scope. Any mixed result, tool failure, or incomplete automated run is called out explicitly and should not be read as a final remediation determination.

## Affected Extension Details

- Name: AdsMeta — Facebook Ads Manager
- Platform: chrome
- Extension ID: `ookgnahfklmejhicejjbfjifppjbfnlk`
- Dataset version: `5.3.3`
- Store version at review: `5.3.24`
- Users: 30000
- Analysis tools: DoubleX, ExPGuard

## Findings

### Finding 1: Sensitive Data Exposure

The Ground Truth record traces Input reaching the recorded source from `STORAGE_ALL_ITEMS` (chrome.storage.local.get) in background.js at L717 to the privileged sink `WINDOW_POSTMESSAGE` (res && res.error) || chrome.runtime.lastError?.message || 'tab_fetch_failed'
				}));
			} catch () in background.js at L724. The source scope is in the recorded source context. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-0dbd161c0e5ec13d`
- Severity recorded by the analysis: **HIGH**
- Source: `STORAGE_ALL_ITEMS` (chrome.storage.local.get) in background.js at L717
- Sink: `WINDOW_POSTMESSAGE` (res && res.error) || chrome.runtime.lastError?.message || 'tab_fetch_failed'
				}));
			} catch () in background.js at L724
- Tools reporting this Flow: DoubleX

- Privilege boundary recorded: `True` (None); Sensitive extension data is returned to a web-accessible channel.

#### Updated-version tool result

- DoubleX: `still_detected`; original source `STORAGE_ALL_ITEMS` → sink `WINDOW_POSTMESSAGE`; candidate matches: 6

#### Analysis and validation

- Static (DoubleX): verdict `UNCERTAIN`, confidence 0; report `extensions/ookgnahfklmejhicejjbfjifppjbfnlk_5.3.3/static/static_report.json`.
- Dynamic (DoubleX): `SINK_NOT_FIRED` (basis `runtime_or_static_dynamic_evidence`); the recorded replay did not establish the complete source-to-sink effect; report `extensions/ookgnahfklmejhicejjbfjifppjbfnlk_5.3.3/dynamic/dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `5.3.3` in a disposable chrome profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```text
Deliver the benign marker EXPGuard_test_marker through the source shown in
the finding, then observe whether it reaches the privileged sink.
```

#### Supporting material

- DoubleX: source report `DoubleX/chrome/flow-verification-results-no-duplicate.json`; static report `extensions/ookgnahfklmejhicejjbfjifppjbfnlk_5.3.3/static/static_report.json`; dynamic report `extensions/ookgnahfklmejhicejjbfjifppjbfnlk_5.3.3/dynamic/dynamic_report.json`.

### Finding 2: Storage Poisoning

The Ground Truth record traces A page or sender able to reach the recorded message/event source from `WINDOW_MESSAGE_EVENT` (window.addEventListener(message)) in content at L162:C6 -> L162:C13 to the privileged sink `CHROME_SESSION_STORAGE` (fb_token) in content at L154:C14 -> L154:C46. The source scope is on pages matching `https://www.facebook.com/*, https://business.facebook.com/*, https://adsmanager.facebook.com/*`. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-3dc88b8cde5397ee`
- Severity recorded by the analysis: **MEDIUM**
- Source: `WINDOW_MESSAGE_EVENT` (window.addEventListener(message)) in content at L162:C6 -> L162:C13
- Sink: `CHROME_SESSION_STORAGE` (fb_token) in content at L154:C14 -> L154:C46
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Updated-version tool result

- ExPGuard: `still_detected`; original source `WINDOW_MESSAGE_EVENT` → sink `CHROME_SESSION_STORAGE`; candidate matches: 2

#### Analysis and validation

- Static (ExPGuard): verdict `TRUE_POSITIVE`, confidence 0.6; report `extensions/ookgnahfklmejhicejjbfjifppjbfnlk_5.3.3/static/static_report.json`.
- Dynamic (ExPGuard): `PARTIAL` (basis `non_decisive`; evidence stage `SINK_REACHED`); the recorded replay did not establish the complete source-to-sink effect; report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\chrome\extensions\ookgnahfklmejhicejjbfjifppjbfnlk_5.3.3\dynamic\dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `5.3.3` in a disposable chrome profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Use only a harmless marker in a disposable profile.
window.postMessage({ marker: "EXPGuard_test_marker" }, "*");
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/chrome/flow-verification-results-no-duplicate.json`; static report `extensions/ookgnahfklmejhicejjbfjifppjbfnlk_5.3.3/static/static_report.json`; dynamic report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\chrome\extensions\ookgnahfklmejhicejjbfjifppjbfnlk_5.3.3\dynamic\dynamic_report.json`.

### Finding 3: Storage Poisoning

The Ground Truth record traces An external extension able to message this extension from `CHROME_ONMESSAGEEXTERNAL_MESSAGE` (chrome.runtime.onMessageExternal.addListener[message]) in background at L413:C6 -> L413:C13 to the privileged sink `CHROME_SESSION_STORAGE` (smeta_jwt) in background at L7:C39 -> L7:C94. The source scope is in the recorded source context. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-60a03fe1538337db`
- Severity recorded by the analysis: **CRITICAL**
- Source: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` (chrome.runtime.onMessageExternal.addListener[message]) in background at L413:C6 -> L413:C13
- Sink: `CHROME_SESSION_STORAGE` (smeta_jwt) in background at L7:C39 -> L7:C94
- Tools reporting this Flow: ExPGuard, DoubleX

- Privilege boundary recorded: `True` (EXTERNALLY_CONNECTABLE); sink grants capability beyond the source origin

#### Updated-version tool result

- ExPGuard: `still_detected`; original source `CHROME_ONMESSAGEEXTERNAL_MESSAGE` → sink `CHROME_SESSION_STORAGE`; candidate matches: 6
- DoubleX: `still_detected`; original source `WINDOW_MESSAGE_EVENT` → sink `CHROME_SESSION_STORAGE`; candidate matches: 9

#### Analysis and validation

- Static (ExPGuard): verdict `TRUE_POSITIVE`, confidence 0.6; report `extensions/ookgnahfklmejhicejjbfjifppjbfnlk_5.3.3/static/static_report.json`.
- Dynamic (ExPGuard): `EXTERNAL_CONDITION_REQUIRED` (basis `external_condition_required`); a sender-side precondition was recorded; this is not an unconditional runtime reproduction; report `extensions/ookgnahfklmejhicejjbfjifppjbfnlk_5.3.3/dynamic/dynamic_report.json`.
- Static (DoubleX): verdict `UNCERTAIN`, confidence 0; report `extensions/ookgnahfklmejhicejjbfjifppjbfnlk_5.3.3/static/static_report.json`.
- Dynamic (DoubleX): `SINK_NOT_FIRED` (basis `runtime_or_static_dynamic_evidence`); the recorded replay did not establish the complete source-to-sink effect; report `extensions/ookgnahfklmejhicejjbfjifppjbfnlk_5.3.3/dynamic/dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `5.3.3` in a disposable chrome profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Use only a harmless marker in a disposable profile.
window.postMessage({ marker: "EXPGuard_test_marker" }, "*");
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/chrome/flow-verification-results-no-duplicate.json`; static report `extensions/ookgnahfklmejhicejjbfjifppjbfnlk_5.3.3/static/static_report.json`; dynamic report `extensions/ookgnahfklmejhicejjbfjifppjbfnlk_5.3.3/dynamic/dynamic_report.json`.
- DoubleX: source report `DoubleX/chrome/flow-verification-results-no-duplicate.json`; static report `extensions/ookgnahfklmejhicejjbfjifppjbfnlk_5.3.3/static/static_report.json`; dynamic report `extensions/ookgnahfklmejhicejjbfjifppjbfnlk_5.3.3/dynamic/dynamic_report.json`.

### Finding 4: Storage Poisoning

The Ground Truth record traces A page or sender able to reach the recorded message/event source from `WINDOW_MESSAGE_EVENT` (DoubleX web-accessible message input) in background.js at L608 to the privileged sink `CHROME_LOCAL_STORAGE` (chrome.storage.local.set) in background.js at L223. The source scope is in the recorded source context. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-6729344c1d1c6ede`
- Severity recorded by the analysis: **CRITICAL**
- Source: `WINDOW_MESSAGE_EVENT` (DoubleX web-accessible message input) in background.js at L608
- Sink: `CHROME_LOCAL_STORAGE` (chrome.storage.local.set) in background.js at L223
- Tools reporting this Flow: DoubleX

- Privilege boundary recorded: `False` (None); DoubleX matched external input to a sensitive API parameter.

#### Updated-version tool result

- DoubleX: `still_detected`; original source `WINDOW_MESSAGE_EVENT` → sink `CHROME_LOCAL_STORAGE`; candidate matches: 6

#### Analysis and validation

- Static (DoubleX): verdict `UNCERTAIN`, confidence 0; report `extensions/ookgnahfklmejhicejjbfjifppjbfnlk_5.3.3/static/static_report.json`.
- Dynamic (DoubleX): `INCONCLUSIVE_AFTER_DEBUG` (basis `runtime_or_static_dynamic_evidence`); the dynamic run did not establish a decisive runtime result; report `extensions/ookgnahfklmejhicejjbfjifppjbfnlk_5.3.3/dynamic/dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `5.3.3` in a disposable chrome profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Use only a harmless marker in a disposable profile.
window.postMessage({ marker: "EXPGuard_test_marker" }, "*");
```

#### Supporting material

- DoubleX: source report `DoubleX/chrome/flow-verification-results-no-duplicate.json`; static report `extensions/ookgnahfklmejhicejjbfjifppjbfnlk_5.3.3/static/static_report.json`; dynamic report `extensions/ookgnahfklmejhicejjbfjifppjbfnlk_5.3.3/dynamic/dynamic_report.json`.

### Finding 5: Storage Poisoning

The Ground Truth record traces A page or sender able to reach the recorded message/event source from `WINDOW_MESSAGE_EVENT` (window.addEventListener(message)) in content at L162:C6 -> L162:C13 to the privileged sink `CHROME_LOCAL_STORAGE` (fb_token) in content at L171:C10 -> L171:C82. The source scope is on pages matching `https://www.facebook.com/*, https://business.facebook.com/*, https://adsmanager.facebook.com/*`. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-840b32469ba36ca2`
- Severity recorded by the analysis: **MEDIUM**
- Source: `WINDOW_MESSAGE_EVENT` (window.addEventListener(message)) in content at L162:C6 -> L162:C13
- Sink: `CHROME_LOCAL_STORAGE` (fb_token) in content at L171:C10 -> L171:C82
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Updated-version tool result

- ExPGuard: `still_detected`; original source `WINDOW_MESSAGE_EVENT` → sink `CHROME_LOCAL_STORAGE`; candidate matches: 1

#### Analysis and validation

- Static (ExPGuard): verdict `TRUE_POSITIVE`, confidence 0.6; report `extensions/ookgnahfklmejhicejjbfjifppjbfnlk_5.3.3/static/static_report.json`.
- Dynamic (ExPGuard): `INCONCLUSIVE_AFTER_DEBUG` (basis `non_decisive`; evidence stage `LISTENER_READY`); the dynamic run did not establish a decisive runtime result; report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\chrome\extensions\ookgnahfklmejhicejjbfjifppjbfnlk_5.3.3\dynamic\dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `5.3.3` in a disposable chrome profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Use only a harmless marker in a disposable profile.
window.postMessage({ marker: "EXPGuard_test_marker" }, "*");
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/chrome/flow-verification-results-no-duplicate.json`; static report `extensions/ookgnahfklmejhicejjbfjifppjbfnlk_5.3.3/static/static_report.json`; dynamic report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\chrome\extensions\ookgnahfklmejhicejjbfjifppjbfnlk_5.3.3\dynamic\dynamic_report.json`.

### Finding 6: Cross-Site Request Forgery (CSRF) / Privileged Network Request

The Ground Truth record traces An external extension able to message this extension from `CHROME_ONMESSAGEEXTERNAL_MESSAGE` (chrome.runtime.onMessageExternal.addListener[message]) in background at L413:C6 -> L413:C13 to the privileged sink `FETCH_RESOURCE` ([Unknown URL]) in background at L515:C24 -> L515:C88. The source scope is in the recorded source context. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-c66d2216f151476c`
- Severity recorded by the analysis: **HIGH**
- Source: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` (chrome.runtime.onMessageExternal.addListener[message]) in background at L413:C6 -> L413:C13
- Sink: `FETCH_RESOURCE` ([Unknown URL]) in background at L515:C24 -> L515:C88
- Tools reporting this Flow: ExPGuard, DoubleX

- Privilege boundary recorded: `True` (EXTERNALLY_CONNECTABLE); sink grants capability beyond the source origin

#### Updated-version tool result

- ExPGuard: `disappeared`; original source `CHROME_ONMESSAGEEXTERNAL_MESSAGE` → sink `FETCH_RESOURCE`; candidate matches: 0
- DoubleX: `still_detected`; original source `WINDOW_MESSAGE_EVENT` → sink `FETCH_RESOURCE`; candidate matches: 7

#### Analysis and validation

- Dynamic (ExPGuard): `CONFIRMED` (basis `runtime_reproduced`; evidence stage `MARKER_REACHED`); runtime reproduction recorded; report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\chrome\extensions\ookgnahfklmejhicejjbfjifppjbfnlk_5.3.3\dynamic\dynamic_report.json`.
- Static (DoubleX): verdict `UNCERTAIN`, confidence 0; report `extensions/ookgnahfklmejhicejjbfjifppjbfnlk_5.3.3/static/static_report.json`.
- Dynamic (DoubleX): `SINK_NOT_FIRED` (basis `runtime_or_static_dynamic_evidence`); the recorded replay did not establish the complete source-to-sink effect; report `extensions/ookgnahfklmejhicejjbfjifppjbfnlk_5.3.3/dynamic/dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `5.3.3` in a disposable chrome profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Use only a harmless marker in a disposable profile.
window.postMessage({ marker: "EXPGuard_test_marker" }, "*");
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/chrome/flow-verification-results-no-duplicate.json`; static report `not recorded`; dynamic report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\chrome\extensions\ookgnahfklmejhicejjbfjifppjbfnlk_5.3.3\dynamic\dynamic_report.json`.
- DoubleX: source report `DoubleX/chrome/flow-verification-results-no-duplicate.json`; static report `extensions/ookgnahfklmejhicejjbfjifppjbfnlk_5.3.3/static/static_report.json`; dynamic report `extensions/ookgnahfklmejhicejjbfjifppjbfnlk_5.3.3/dynamic/dynamic_report.json`.


## Recommendations

1. Authenticate page-to-extension events at the privilege boundary; validate the sender and origin instead of trusting DOM event detail.
2. Validate the request schema and restrict destination URLs, methods, headers, and bodies before issuing privileged network requests.
3. Do not let page-controlled cookies or DOM values select extension-owned storage values; validate the expected value and keep credentials in extension-owned UI/state.
4. Treat storage writes as privileged state changes: use an allowlisted schema, reject attacker-controlled keys, and avoid merging untrusted objects into extension state.
5. Never return sensitive extension data to an untrusted page or external sender; enforce an explicit origin and sender allowlist.
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
