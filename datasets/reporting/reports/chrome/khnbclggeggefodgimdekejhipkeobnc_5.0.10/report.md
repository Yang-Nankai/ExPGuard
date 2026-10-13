# Security Vulnerability Report: High Unauthorized Tab/Window Control in lemlist

## Summary

We are writing on behalf of a security research team from Nankai University and the University of Liverpool. Our Ground Truth review identified **1 Flow(s)** in **lemlist** (chrome, extension ID `khnbclggeggefodgimdekejhipkeobnc`, version `5.0.10`).
The recorded issue type(s): **Unauthorized Tab/Window Control**.

The store currently reports version `5.0.21`. The update revalidation is summarized per tool below. This report covers only the original Flow(s); newly introduced Flow(s) are out of scope. Any mixed result, tool failure, or incomplete automated run is called out explicitly and should not be read as a final remediation determination.

## Affected Extension Details

- Name: lemlist
- Platform: chrome
- Extension ID: `khnbclggeggefodgimdekejhipkeobnc`
- Dataset version: `5.0.10`
- Store version at review: `5.0.21`
- Users: 80000
- Analysis tools: ExPGuard

## Findings

### Finding 1: Unauthorized Tab or Window Manipulation

The Ground Truth record traces An external extension able to message this extension from `CHROME_ONMESSAGEEXTERNAL_MESSAGE` (chrome.runtime.onMessageExternal.addListener[message]) in assets/background-DncCHPoW at L1:C14038 -> L1:C14039 to the privileged sink `CHROME_TABS_CREATE_OPTIONS` in assets/background-DncCHPoW at L1:C14253 -> L1:C14301. The source scope is in the recorded source context. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-091d41a5cab81a5a`
- Severity recorded by the analysis: **HIGH**
- Source: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` (chrome.runtime.onMessageExternal.addListener[message]) in assets/background-DncCHPoW at L1:C14038 -> L1:C14039
- Sink: `CHROME_TABS_CREATE_OPTIONS` in assets/background-DncCHPoW at L1:C14253 -> L1:C14301
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (EXTERNALLY_CONNECTABLE); sink grants capability beyond the source origin

#### Updated-version tool result

- ExPGuard: `still_detected`; original source `CHROME_ONMESSAGEEXTERNAL_MESSAGE` → sink `CHROME_TABS_CREATE_OPTIONS`; candidate matches: 1

#### Analysis and validation

- Static (ExPGuard): verdict `TRUE_POSITIVE`, confidence 0.6; report `extensions/khnbclggeggefodgimdekejhipkeobnc_5.0.10/static/static_report.json`.
- Dynamic (ExPGuard): `EXTERNAL_CONDITION_REQUIRED` (basis `external_condition_required`); a sender-side precondition was recorded; this is not an unconditional runtime reproduction; report `extensions/khnbclggeggefodgimdekejhipkeobnc_5.0.10/dynamic/dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `5.0.10` in a disposable chrome profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Use only a harmless marker in a disposable profile.
window.postMessage({ marker: "EXPGuard_test_marker" }, "*");
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/chrome/flow-verification-results-no-duplicate.json`; static report `extensions/khnbclggeggefodgimdekejhipkeobnc_5.0.10/static/static_report.json`; dynamic report `extensions/khnbclggeggefodgimdekejhipkeobnc_5.0.10/dynamic/dynamic_report.json`.


## Recommendations

1. Validate tab/window IDs and navigation targets, and require a user gesture for externally initiated changes.
2. Reduce host permissions and sensitive API access to the smallest scope required by the feature.

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
