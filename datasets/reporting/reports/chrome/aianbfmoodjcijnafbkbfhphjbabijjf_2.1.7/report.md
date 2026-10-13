# Security Vulnerability Report: Critical CSRF via Privileged Network Request and Extension Storage Poisoning in Steamlvlup Card Factory

## Summary

We are writing on behalf of a security research team from Nankai University and the University of Liverpool. Our Ground Truth review identified **2 Flow(s)** in **Steamlvlup Card Factory** (chrome, extension ID `aianbfmoodjcijnafbkbfhphjbabijjf`, version `2.1.7`).
The recorded issue type(s): **CSRF via Privileged Network Request; Extension Storage Poisoning**.

## Affected Extension Details

- Name: Steamlvlup Card Factory
- Platform: chrome
- Extension ID: `aianbfmoodjcijnafbkbfhphjbabijjf`
- Dataset version: `2.1.7`
- Store version at review: `2.1.7`
- Users: 50000
- Analysis tools: DoubleX, ExPGuard

## Findings

### Finding 1: Storage Poisoning

The Ground Truth record traces An external extension able to message this extension from `CHROME_ONMESSAGEEXTERNAL_MESSAGE` (chrome.runtime.onMessageExternal.addListener[message]) in script/background at L1:C1740 -> L1:C1741 to the privileged sink `CHROME_LOCAL_STORAGE` (queryResult) in script/background at L1:C1768 -> L1:C1814. The source scope is in the recorded source context. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-b0e10da3cc5cf9a3`
- Severity recorded by the analysis: **CRITICAL**
- Source: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` (chrome.runtime.onMessageExternal.addListener[message]) in script/background at L1:C1740 -> L1:C1741
- Sink: `CHROME_LOCAL_STORAGE` (queryResult) in script/background at L1:C1768 -> L1:C1814
- Tools reporting this Flow: ExPGuard, DoubleX

- Privilege boundary recorded: `True` (EXTERNALLY_CONNECTABLE); sink grants capability beyond the source origin

#### Analysis and validation

- Static (ExPGuard): verdict `TRUE_POSITIVE`, confidence 0.6; report `extensions/aianbfmoodjcijnafbkbfhphjbabijjf_2.1.7/static/static_report.json`.
- Dynamic (ExPGuard): `CONFIRMED` (basis `runtime_reproduced`; evidence stage `MARKER_REACHED`); runtime reproduction recorded; report `extensions/aianbfmoodjcijnafbkbfhphjbabijjf_2.1.7/dynamic/dynamic_report.json`.
- Static (DoubleX): verdict `TRUE_POSITIVE`, confidence 0.6; report `extensions/aianbfmoodjcijnafbkbfhphjbabijjf_2.1.7/static/static_report.json`.
- Dynamic (DoubleX): `EXTERNAL_CONDITION_REQUIRED` (basis `external_condition_required`); a sender-side precondition was recorded; this is not an unconditional runtime reproduction; report `extensions/aianbfmoodjcijnafbkbfhphjbabijjf_2.1.7/dynamic/dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `2.1.7` in a disposable chrome profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Use only a harmless marker in a disposable profile.
window.postMessage({ marker: "EXPGuard_test_marker" }, "*");
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/chrome/flow-verification-results-no-duplicate.json`; static report `extensions/aianbfmoodjcijnafbkbfhphjbabijjf_2.1.7/static/static_report.json`; dynamic report `extensions/aianbfmoodjcijnafbkbfhphjbabijjf_2.1.7/dynamic/dynamic_report.json`.
- DoubleX: source report `DoubleX/chrome/flow-verification-results-no-duplicate.json`; static report `extensions/aianbfmoodjcijnafbkbfhphjbabijjf_2.1.7/static/static_report.json`; dynamic report `extensions/aianbfmoodjcijnafbkbfhphjbabijjf_2.1.7/dynamic/dynamic_report.json`.

### Finding 2: Cross-Site Request Forgery (CSRF) / Privileged Network Request

The Ground Truth record traces An external extension able to message this extension from `CHROME_ONMESSAGEEXTERNAL_MESSAGE` (chrome.runtime.onMessageExternal.addListener[message]) in script/background at L1:C1740 -> L1:C1741 to the privileged sink `FETCH_BODY` (https://extension.steamlvlup.com/api/steamsocket) in script/background at L1:C2508 -> L1:C2679. The source scope is in the recorded source context. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-f417695acb841b55`
- Severity recorded by the analysis: **MEDIUM**
- Source: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` (chrome.runtime.onMessageExternal.addListener[message]) in script/background at L1:C1740 -> L1:C1741
- Sink: `FETCH_BODY` (https://extension.steamlvlup.com/api/steamsocket) in script/background at L1:C2508 -> L1:C2679
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (EXTERNALLY_CONNECTABLE); sink grants capability beyond the source origin

#### Analysis and validation

- Static (ExPGuard): verdict `TRUE_POSITIVE`, confidence 0.6; report `extensions/aianbfmoodjcijnafbkbfhphjbabijjf_2.1.7/static/static_report.json`.
- Dynamic (ExPGuard): `CONFIRMED` (basis `runtime_reproduced`; evidence stage `MARKER_REACHED`); runtime reproduction recorded; report `extensions/aianbfmoodjcijnafbkbfhphjbabijjf_2.1.7/dynamic/dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `2.1.7` in a disposable chrome profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Use only a harmless marker in a disposable profile.
window.postMessage({ marker: "EXPGuard_test_marker" }, "*");
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/chrome/flow-verification-results-no-duplicate.json`; static report `extensions/aianbfmoodjcijnafbkbfhphjbabijjf_2.1.7/static/static_report.json`; dynamic report `extensions/aianbfmoodjcijnafbkbfhphjbabijjf_2.1.7/dynamic/dynamic_report.json`.


## Recommendations

1. Authenticate page-to-extension events at the privilege boundary; validate the sender and origin instead of trusting DOM event detail.
2. Validate the request schema and restrict destination URLs, methods, headers, and bodies before issuing privileged network requests.
3. Do not let page-controlled cookies or DOM values select extension-owned storage values; validate the expected value and keep credentials in extension-owned UI/state.
4. Treat storage writes as privileged state changes: use an allowlisted schema, reject attacker-controlled keys, and avoid merging untrusted objects into extension state.
5. Reduce host permissions and sensitive API access to the smallest scope required by the feature.

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
