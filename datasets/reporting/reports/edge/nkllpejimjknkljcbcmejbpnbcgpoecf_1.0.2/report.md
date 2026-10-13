# Security Vulnerability Report: Medium CSRF via Privileged Network Request and Unauthorized Browser Policy Change in SyncFun

## Summary

We are writing on behalf of a security research team from Nankai University and the University of Liverpool. Our Ground Truth review identified **3 Flow(s)** in **SyncFun** (edge, extension ID `nkllpejimjknkljcbcmejbpnbcgpoecf`, version `1.0.2`).
The recorded issue type(s): **CSRF via Privileged Network Request; Unauthorized Browser Policy Change**.

The store currently reports version `1.0.3`. The update revalidation is summarized per tool below. This report covers only the original Flow(s); newly introduced Flow(s) are out of scope. Any mixed result, tool failure, or incomplete automated run is called out explicitly and should not be read as a final remediation determination.

## Affected Extension Details

- Name: SyncFun
- Platform: edge
- Extension ID: `nkllpejimjknkljcbcmejbpnbcgpoecf`
- Dataset version: `1.0.2`
- Store version at review: `1.0.3`
- Users: 2049
- Analysis tools: ExPGuard

## Findings

### Finding 1: Cross-Site Request Forgery (CSRF) / Privileged Network Request

The Ground Truth record traces An external extension able to message this extension from `CHROME_ONMESSAGEEXTERNAL_MESSAGE` (chrome.runtime.onMessageExternal.addListener[message]) in assets/background.js-CPhEULRj at L1:C15514 -> L1:C15515 to the privileged sink `FETCH_RESOURCE` ([Unknown URL]) in assets/background.js-CPhEULRj at L1:C15171 -> L1:C15181. The source scope is in the recorded source context. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-5c7d44b093c22758`
- Severity recorded by the analysis: **MEDIUM**
- Source: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` (chrome.runtime.onMessageExternal.addListener[message]) in assets/background.js-CPhEULRj at L1:C15514 -> L1:C15515
- Sink: `FETCH_RESOURCE` ([Unknown URL]) in assets/background.js-CPhEULRj at L1:C15171 -> L1:C15181
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (EXTERNALLY_CONNECTABLE); sink grants capability beyond the source origin

#### Updated-version tool result

- ExPGuard: `still_detected`; original source `CHROME_ONMESSAGEEXTERNAL_MESSAGE` → sink `FETCH_RESOURCE`; candidate matches: 1

#### Analysis and validation

- Static (ExPGuard): verdict `UNCERTAIN`, confidence 0; report `extensions/nkllpejimjknkljcbcmejbpnbcgpoecf_1.0.2/static/static_report.json`.
- Dynamic (ExPGuard): `EXTERNAL_CONDITION_REQUIRED` (basis `external_condition_required`); a sender-side precondition was recorded; this is not an unconditional runtime reproduction; report `extensions/nkllpejimjknkljcbcmejbpnbcgpoecf_1.0.2/dynamic/dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `1.0.2` in a disposable edge profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Use only a harmless marker in a disposable profile.
window.postMessage({ marker: "EXPGuard_test_marker" }, "*");
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/edge/flow-verification-results-no-duplicate.json`; static report `extensions/nkllpejimjknkljcbcmejbpnbcgpoecf_1.0.2/static/static_report.json`; dynamic report `extensions/nkllpejimjknkljcbcmejbpnbcgpoecf_1.0.2/dynamic/dynamic_report.json`.

### Finding 2: Unauthorized Browser Policy Modification

The Ground Truth record traces An external extension able to message this extension from `CHROME_ONMESSAGEEXTERNAL_MESSAGE` (chrome.runtime.onMessageExternal.addListener[message]) in assets/background.js-CPhEULRj at L1:C15514 -> L1:C15515 to the privileged sink `CHROME_DECLARATIVENETREQUEST_RULES` in assets/background.js-CPhEULRj at L1:C8951 -> L1:C9214. The source scope is in the recorded source context. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-61c6a253bd2907c5`
- Severity recorded by the analysis: **MEDIUM**
- Source: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` (chrome.runtime.onMessageExternal.addListener[message]) in assets/background.js-CPhEULRj at L1:C15514 -> L1:C15515
- Sink: `CHROME_DECLARATIVENETREQUEST_RULES` in assets/background.js-CPhEULRj at L1:C8951 -> L1:C9214
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (EXTERNALLY_CONNECTABLE); sink grants capability beyond the source origin

#### Updated-version tool result

- ExPGuard: `still_detected`; original source `CHROME_ONMESSAGEEXTERNAL_MESSAGE` → sink `CHROME_DECLARATIVENETREQUEST_RULES`; candidate matches: 1

#### Analysis and validation

- Dynamic (ExPGuard): `CONFIRMED` (basis `runtime_reproduced`; evidence stage `MARKER_REACHED`); runtime reproduction recorded; report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\edge\extensions\nkllpejimjknkljcbcmejbpnbcgpoecf_1.0.2\dynamic\dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `1.0.2` in a disposable edge profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Use only a harmless marker in a disposable profile.
window.postMessage({ marker: "EXPGuard_test_marker" }, "*");
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/edge/flow-verification-results-no-duplicate.json`; static report `not recorded`; dynamic report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\edge\extensions\nkllpejimjknkljcbcmejbpnbcgpoecf_1.0.2\dynamic\dynamic_report.json`.

### Finding 3: Unauthorized Browser Policy Modification

The Ground Truth record traces An external extension able to message this extension from `CHROME_ONMESSAGEEXTERNAL_MESSAGE` (chrome.runtime.onMessageExternal.addListener[message]) in assets/background.js-CPhEULRj at L1:C15514 -> L1:C15515 to the privileged sink `CHROME_CONTENTSETTINGS_SET` (POPUPS) in assets/background.js-CPhEULRj at L1:C14366 -> L1:C14441. The source scope is in the recorded source context. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-d8a4c190191c1972`
- Severity recorded by the analysis: **MEDIUM**
- Source: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` (chrome.runtime.onMessageExternal.addListener[message]) in assets/background.js-CPhEULRj at L1:C15514 -> L1:C15515
- Sink: `CHROME_CONTENTSETTINGS_SET` (POPUPS) in assets/background.js-CPhEULRj at L1:C14366 -> L1:C14441
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (EXTERNALLY_CONNECTABLE); sink grants capability beyond the source origin

#### Updated-version tool result

- ExPGuard: `still_detected`; original source `CHROME_ONMESSAGEEXTERNAL_MESSAGE` → sink `CHROME_CONTENTSETTINGS_SET`; candidate matches: 1

#### Analysis and validation

- Static (ExPGuard): verdict `TRUE_POSITIVE`, confidence 0.6; report `extensions/nkllpejimjknkljcbcmejbpnbcgpoecf_1.0.2/static/static_report.json`.
- Dynamic (ExPGuard): `EXTERNAL_CONDITION_REQUIRED` (basis `external_condition_required`); a sender-side precondition was recorded; this is not an unconditional runtime reproduction; report `extensions/nkllpejimjknkljcbcmejbpnbcgpoecf_1.0.2/dynamic/dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `1.0.2` in a disposable edge profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Use only a harmless marker in a disposable profile.
window.postMessage({ marker: "EXPGuard_test_marker" }, "*");
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/edge/flow-verification-results-no-duplicate.json`; static report `extensions/nkllpejimjknkljcbcmejbpnbcgpoecf_1.0.2/static/static_report.json`; dynamic report `extensions/nkllpejimjknkljcbcmejbpnbcgpoecf_1.0.2/dynamic/dynamic_report.json`.


## Recommendations

1. Authenticate page-to-extension events at the privilege boundary; validate the sender and origin instead of trusting DOM event detail.
2. Validate the request schema and restrict destination URLs, methods, headers, and bodies before issuing privileged network requests.
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
