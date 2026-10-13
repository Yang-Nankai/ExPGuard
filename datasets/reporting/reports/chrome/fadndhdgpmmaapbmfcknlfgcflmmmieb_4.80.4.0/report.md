# Security Vulnerability Report: High Privilege Escalation in FrankerFaceZ

## Summary

We are writing on behalf of a security research team from Nankai University and the University of Liverpool. Our Ground Truth review identified **1 Flow(s)** in **FrankerFaceZ** (chrome, extension ID `fadndhdgpmmaapbmfcknlfgcflmmmieb`, version `4.80.4.0`).
The recorded issue type(s): **Privilege Escalation**.

The store currently reports version `4.82.0.31`. The update revalidation is summarized per tool below. This report covers only the original Flow(s); newly introduced Flow(s) are out of scope. Any mixed result, tool failure, or incomplete automated run is called out explicitly and should not be read as a final remediation determination.

## Affected Extension Details

- Name: FrankerFaceZ
- Platform: chrome
- Extension ID: `fadndhdgpmmaapbmfcknlfgcflmmmieb`
- Dataset version: `4.80.4.0`
- Store version at review: `4.82.0.31`
- Users: 1000000
- Analysis tools: ExPGuard

## Findings

### Finding 1: Privilege Escalation

The Ground Truth record traces A page or sender able to reach the recorded message/event source from `CHROME_ONCONNECTEXTERNAL_ONMESSAGE` (chrome.runtime.onConnectExternal.addListener[onMessage]) in web/script.min at L1:C657 -> L1:C755 to the privileged sink `WINDOW_POSTMESSAGE` (location.origin) in web/script.min at L1:C685 -> L1:C753. The source scope is on pages matching `*://*.twitch.tv/*`. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-e862c1b7818d25a1`
- Severity recorded by the analysis: **HIGH**
- Source: `CHROME_ONCONNECTEXTERNAL_ONMESSAGE` (chrome.runtime.onConnectExternal.addListener[onMessage]) in web/script.min at L1:C657 -> L1:C755
- Sink: `WINDOW_POSTMESSAGE` (location.origin) in web/script.min at L1:C685 -> L1:C753
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (EXTERNALLY_CONNECTABLE); sink grants capability beyond the source origin

#### Updated-version tool result

- ExPGuard: `still_detected`; original source `CHROME_ONCONNECTEXTERNAL_ONMESSAGE` → sink `WINDOW_POSTMESSAGE`; candidate matches: 1

#### Analysis and validation

- Static (ExPGuard): verdict `FALSE_POSITIVE`, confidence 0.6; report `extensions/fadndhdgpmmaapbmfcknlfgcflmmmieb_4.80.4.0/static/static_report.json`.
- Dynamic: no structured dynamic-verification result is attached to this Flow in the Ground Truth dataset.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `4.80.4.0` in a disposable chrome profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Use only a harmless marker in a disposable profile.
window.postMessage({ marker: "EXPGuard_test_marker" }, "*");
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/chrome/flow-verification-results-no-duplicate.json`; static report `extensions/fadndhdgpmmaapbmfcknlfgcflmmmieb_4.80.4.0/static/static_report.json`; dynamic report `not recorded`.


## Recommendations

1. Reduce host permissions and sensitive API access to the smallest scope required by the feature.

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
