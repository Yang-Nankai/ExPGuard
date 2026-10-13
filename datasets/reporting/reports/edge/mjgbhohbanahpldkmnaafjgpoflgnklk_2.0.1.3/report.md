# Security Vulnerability Report: High Unauthorized Tab/Window Control in Video Email for Gmail™ by cloudHQ

## Summary

We are writing on behalf of a security research team from Nankai University and the University of Liverpool. Our Ground Truth review identified **1 Flow(s)** in **Video Email for Gmail™ by cloudHQ** (edge, extension ID `mjgbhohbanahpldkmnaafjgpoflgnklk`, version `2.0.1.3`).
The recorded issue type(s): **Unauthorized Tab/Window Control**.

## Affected Extension Details

- Name: Video Email for Gmail™ by cloudHQ
- Platform: edge
- Extension ID: `mjgbhohbanahpldkmnaafjgpoflgnklk`
- Dataset version: `2.0.1.3`
- Store version at review: `2.0.1.3`
- Users: 173
- Analysis tools: ExPGuard

## Findings

### Finding 1: Unauthorized Tab or Window Manipulation

The Ground Truth record traces A page or sender able to reach the recorded message/event source from `CHROME_ONCONNECTEXTERNAL_ONMESSAGE` (chrome.runtime.onConnectExternal.addListener[onMessage]) in background at L2:C265559 -> L2:C265560 to the privileged sink `CHROME_WINDOWS_UPDATE_OPTIONS` in background at L2:C266107 -> L2:C266170. The source scope is in the recorded source context. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-4e0a4ef3c2743678`
- Severity recorded by the analysis: **HIGH**
- Source: `CHROME_ONCONNECTEXTERNAL_ONMESSAGE` (chrome.runtime.onConnectExternal.addListener[onMessage]) in background at L2:C265559 -> L2:C265560
- Sink: `CHROME_WINDOWS_UPDATE_OPTIONS` in background at L2:C266107 -> L2:C266170
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (EXTERNALLY_CONNECTABLE); sink grants capability beyond the source origin

#### Analysis and validation

- Static (ExPGuard): verdict `TRUE_POSITIVE`, confidence 0.6; report `extensions/mjgbhohbanahpldkmnaafjgpoflgnklk_2.0.1.3/static/static_report.json`.
- Dynamic (ExPGuard): `EXTERNAL_CONDITION_REQUIRED` (basis `external_condition_required`); a sender-side precondition was recorded; this is not an unconditional runtime reproduction; report `extensions/mjgbhohbanahpldkmnaafjgpoflgnklk_2.0.1.3/dynamic/dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `2.0.1.3` in a disposable edge profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Use only a harmless marker in a disposable profile.
window.postMessage({ marker: "EXPGuard_test_marker" }, "*");
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/edge/flow-verification-results-no-duplicate.json`; static report `extensions/mjgbhohbanahpldkmnaafjgpoflgnklk_2.0.1.3/static/static_report.json`; dynamic report `extensions/mjgbhohbanahpldkmnaafjgpoflgnklk_2.0.1.3/dynamic/dynamic_report.json`.


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
