# Security Vulnerability Report: High Unauthorized Tab/Window Control in CSDN·浏览器助手

## Summary

We are writing on behalf of a security research team from Nankai University and the University of Liverpool. Our Ground Truth review identified **1 Flow(s)** in **CSDN·浏览器助手** (edge, extension ID `igbflnhjjpcakhcjakbnbkncjofahlil`, version `3.0.6`).
The recorded issue type(s): **Unauthorized Tab/Window Control**.

## Affected Extension Details

- Name: CSDN·浏览器助手
- Platform: edge
- Extension ID: `igbflnhjjpcakhcjakbnbkncjofahlil`
- Dataset version: `3.0.6`
- Store version at review: `3.0.6`
- Users: 110522
- Analysis tools: ExPGuard

## Findings

### Finding 1: Unauthorized Tab or Window Manipulation

The Ground Truth record traces An external extension able to message this extension from `CHROME_ONMESSAGEEXTERNAL_MESSAGE` (chrome.runtime.onMessageExternal.addListener[message]) in serviceWorker at L1:C90130 -> L1:C90131 to the privileged sink `CHROME_TABS_CREATE_OPTIONS` in serviceWorker at L1:C90211 -> L1:C90274. The source scope is in the recorded source context. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-85469bd0882a8d67`
- Severity recorded by the analysis: **HIGH**
- Source: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` (chrome.runtime.onMessageExternal.addListener[message]) in serviceWorker at L1:C90130 -> L1:C90131
- Sink: `CHROME_TABS_CREATE_OPTIONS` in serviceWorker at L1:C90211 -> L1:C90274
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (EXTERNALLY_CONNECTABLE); sink grants capability beyond the source origin

#### Analysis and validation

- Static (ExPGuard): verdict `UNCERTAIN`, confidence 0.3; report `extensions/igbflnhjjpcakhcjakbnbkncjofahlil_3.0.6/static/static_report.json`.
- Dynamic (ExPGuard): `EXTERNAL_CONDITION_REQUIRED` (basis `external_condition_required`); a sender-side precondition was recorded; this is not an unconditional runtime reproduction; report `extensions/igbflnhjjpcakhcjakbnbkncjofahlil_3.0.6/dynamic/dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `3.0.6` in a disposable edge profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Use only a harmless marker in a disposable profile.
window.postMessage({ marker: "EXPGuard_test_marker" }, "*");
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/edge/flow-verification-results-no-duplicate.json`; static report `extensions/igbflnhjjpcakhcjakbnbkncjofahlil_3.0.6/static/static_report.json`; dynamic report `extensions/igbflnhjjpcakhcjakbnbkncjofahlil_3.0.6/dynamic/dynamic_report.json`.


## Recommendations

1. Validate tab/window IDs and navigation targets, and require a user gesture for externally initiated changes.
2. Reduce host permissions and sensitive API access to the smallest scope required by the feature.

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
