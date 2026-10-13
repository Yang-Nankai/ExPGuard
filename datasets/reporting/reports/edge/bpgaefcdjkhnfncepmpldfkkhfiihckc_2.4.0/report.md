# Security Vulnerability Report: Critical CSRF via Privileged Network Request and Extension Storage Poisoning in Skins for YouTube player

## Summary

We are writing on behalf of a security research team from Nankai University and the University of Liverpool. Our Ground Truth review identified **3 Flow(s)** in **Skins for YouTube player** (edge, extension ID `bpgaefcdjkhnfncepmpldfkkhfiihckc`, version `2.4.0`).
The recorded issue type(s): **CSRF via Privileged Network Request; Extension Storage Poisoning**.

The store currently reports version `2.6.5`. The update revalidation is summarized per tool below. This report covers only the original Flow(s); newly introduced Flow(s) are out of scope. Any mixed result, tool failure, or incomplete automated run is called out explicitly and should not be read as a final remediation determination.

## Affected Extension Details

- Name: Skins for YouTube player
- Platform: edge
- Extension ID: `bpgaefcdjkhnfncepmpldfkkhfiihckc`
- Dataset version: `2.4.0`
- Store version at review: `2.6.5`
- Users: 208
- Analysis tools: CoCo, ExPGuard

## Findings

### Finding 1: Cross-Site Request Forgery (CSRF) / Privileged Network Request

The Ground Truth record traces An external extension able to message this extension from `CHROME_ONMESSAGEEXTERNAL_MESSAGE` (chrome.runtime.onMessageExternal.addListener[message]) in resources/js/background at L26:C16 -> L26:C23 to the privileged sink `FETCH_RESOURCE` ([Unknown URL]) in resources/js/background at L5:C18 -> L5:C49. The source scope is in the recorded source context. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-09473b00ea49ff04`
- Severity recorded by the analysis: **HIGH**
- Source: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` (chrome.runtime.onMessageExternal.addListener[message]) in resources/js/background at L26:C16 -> L26:C23
- Sink: `FETCH_RESOURCE` ([Unknown URL]) in resources/js/background at L5:C18 -> L5:C49
- Tools reporting this Flow: ExPGuard, CoCo

- Privilege boundary recorded: `True` (EXTERNALLY_CONNECTABLE); sink grants capability beyond the source origin

#### Updated-version tool result

- ExPGuard: `disappeared`; original source `CHROME_ONMESSAGEEXTERNAL_MESSAGE` → sink `FETCH_RESOURCE`; candidate matches: 0
- CoCo: `still_detected`; original source `CHROME_ONMESSAGEEXTERNAL_MESSAGE` → sink `FETCH_RESOURCE`; candidate matches: 1

#### Analysis and validation

- Static (ExPGuard): verdict `TRUE_POSITIVE`, confidence 0.6; report `extensions/bpgaefcdjkhnfncepmpldfkkhfiihckc_2.4.0/static/static_report.json`.
- Dynamic (ExPGuard): `EXTERNAL_CONDITION_REQUIRED` (basis `external_condition_required`); a sender-side precondition was recorded; this is not an unconditional runtime reproduction; report `extensions/bpgaefcdjkhnfncepmpldfkkhfiihckc_2.4.0/dynamic/dynamic_report.json`.
- Static (CoCo): verdict `TRUE_POSITIVE`, confidence 0.6; report `extensions/bpgaefcdjkhnfncepmpldfkkhfiihckc_2.4.0/static/static_report.json`.
- Dynamic (CoCo): `EXTERNAL_CONDITION_REQUIRED` (basis `external_condition_required`); a sender-side precondition was recorded; this is not an unconditional runtime reproduction; report `extensions/bpgaefcdjkhnfncepmpldfkkhfiihckc_2.4.0/dynamic/dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `2.4.0` in a disposable edge profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Use only a harmless marker in a disposable profile.
window.postMessage({ marker: "EXPGuard_test_marker" }, "*");
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/edge/flow-verification-results-no-duplicate.json`; static report `extensions/bpgaefcdjkhnfncepmpldfkkhfiihckc_2.4.0/static/static_report.json`; dynamic report `extensions/bpgaefcdjkhnfncepmpldfkkhfiihckc_2.4.0/dynamic/dynamic_report.json`.
- CoCo: source report `CoCo/edge/flow-verification-results-no-duplicate.json`; static report `extensions/bpgaefcdjkhnfncepmpldfkkhfiihckc_2.4.0/static/static_report.json`; dynamic report `extensions/bpgaefcdjkhnfncepmpldfkkhfiihckc_2.4.0/dynamic/dynamic_report.json`.

### Finding 2: Storage Poisoning

The Ground Truth record traces An external extension able to message this extension from `CHROME_ONMESSAGEEXTERNAL_MESSAGE` (CoCo source evidence) to the privileged sink `CHROME_LOCAL_STORAGE` (CoCo sink evidence). The source scope is on pages matching `*://*.youtube-skins.com/*, http://127.0.0.1/*, http://localhost/*, https://127.0.0.1/*, https://localhost/*`. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-47a1896c6c221a28`
- Severity recorded by the analysis: **CRITICAL**
- Source: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` (CoCo source evidence)
- Sink: `CHROME_LOCAL_STORAGE` (CoCo sink evidence)
- Tools reporting this Flow: CoCo

- Privilege boundary recorded: `True` (EXTERNALLY_CONNECTABLE); CoCo reported cross-boundary flow; verify with source

#### Updated-version tool result

- CoCo: `still_detected`; original source `CHROME_ONMESSAGEEXTERNAL_MESSAGE` → sink `CHROME_LOCAL_STORAGE`; candidate matches: 1

#### Analysis and validation

- Static (CoCo): verdict `TRUE_POSITIVE`, confidence 0.6; report `extensions/bpgaefcdjkhnfncepmpldfkkhfiihckc_2.4.0/static/static_report.json`.
- Dynamic (CoCo): `EXTERNAL_CONDITION_REQUIRED` (basis `external_condition_required`); a sender-side precondition was recorded; this is not an unconditional runtime reproduction; report `extensions/bpgaefcdjkhnfncepmpldfkkhfiihckc_2.4.0/dynamic/dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `2.4.0` in a disposable edge profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Use only a harmless marker in a disposable profile.
window.postMessage({ marker: "EXPGuard_test_marker" }, "*");
```

#### Supporting material

- CoCo: source report `CoCo/edge/flow-verification-results-no-duplicate.json`; static report `extensions/bpgaefcdjkhnfncepmpldfkkhfiihckc_2.4.0/static/static_report.json`; dynamic report `extensions/bpgaefcdjkhnfncepmpldfkkhfiihckc_2.4.0/dynamic/dynamic_report.json`.

### Finding 3: Storage Poisoning

The Ground Truth record traces An external extension able to message this extension from `CHROME_ONMESSAGEEXTERNAL_MESSAGE` (CoCo source evidence) in resources/js/background.js at L26:C1 -> L26:C1 to the privileged sink `CHROME_LOCAL_STORAGE` (CoCo sink evidence) in resources/js/background.js at L26:C1 -> L26:C1. The source scope is on pages matching `*://*.youtube-skins.com/*, http://127.0.0.1/*, http://localhost/*, https://127.0.0.1/*, https://localhost/*`. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-c43bf4999d6be652`
- Severity recorded by the analysis: **CRITICAL**
- Source: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` (CoCo source evidence) in resources/js/background.js at L26:C1 -> L26:C1
- Sink: `CHROME_LOCAL_STORAGE` (CoCo sink evidence) in resources/js/background.js at L26:C1 -> L26:C1
- Tools reporting this Flow: CoCo

- Privilege boundary recorded: `True` (EXTERNALLY_CONNECTABLE); CoCo reported cross-boundary flow; verify with source

#### Updated-version tool result

- CoCo: `still_detected`; original source `CHROME_ONMESSAGEEXTERNAL_MESSAGE` → sink `CHROME_LOCAL_STORAGE`; candidate matches: 1

#### Analysis and validation

- Static (CoCo): verdict `TRUE_POSITIVE`, confidence 0.6; report `extensions/bpgaefcdjkhnfncepmpldfkkhfiihckc_2.4.0/static/static_report.json`.
- Dynamic (CoCo): `EXTERNAL_CONDITION_REQUIRED` (basis `external_condition_required`); a sender-side precondition was recorded; this is not an unconditional runtime reproduction; report `extensions/bpgaefcdjkhnfncepmpldfkkhfiihckc_2.4.0/dynamic/dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `2.4.0` in a disposable edge profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Use only a harmless marker in a disposable profile.
window.postMessage({ marker: "EXPGuard_test_marker" }, "*");
```

#### Supporting material

- CoCo: source report `CoCo/edge/flow-verification-results-no-duplicate.json`; static report `extensions/bpgaefcdjkhnfncepmpldfkkhfiihckc_2.4.0/static/static_report.json`; dynamic report `extensions/bpgaefcdjkhnfncepmpldfkkhfiihckc_2.4.0/dynamic/dynamic_report.json`.


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
