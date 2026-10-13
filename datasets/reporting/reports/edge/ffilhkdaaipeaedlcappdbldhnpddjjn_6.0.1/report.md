# Security Vulnerability Report: Critical Unauthorized Tab/Window Control in OceanHero: Save Our Oceans by Surfing the Web

## Summary

We are writing on behalf of a security research team from Nankai University and the University of Liverpool. Our Ground Truth review identified **1 Flow(s)** in **OceanHero: Save Our Oceans by Surfing the Web** (edge, extension ID `ffilhkdaaipeaedlcappdbldhnpddjjn`, version `6.0.1`).
The recorded issue type(s): **Unauthorized Tab/Window Control**.

## Affected Extension Details

- Name: OceanHero: Save Our Oceans by Surfing the Web
- Platform: edge
- Extension ID: `ffilhkdaaipeaedlcappdbldhnpddjjn`
- Dataset version: `6.0.1`
- Store version at review: `6.0.1`
- Users: 8435
- Analysis tools: DoubleX

## Findings

### Finding 1: Unauthorized Tab or Window Manipulation

The Ground Truth record traces A page or sender able to reach the recorded message/event source from `WINDOW_MESSAGE_EVENT` (DoubleX web-accessible message input) in background.js at L4498 to the privileged sink `CHROME_TABS_CREATE_OPTIONS` (chrome.tabs.create) in background.js at L4620. The source scope is in the recorded source context. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-ce7c7d6ca5dc79a9`
- Severity recorded by the analysis: **CRITICAL**
- Source: `WINDOW_MESSAGE_EVENT` (DoubleX web-accessible message input) in background.js at L4498
- Sink: `CHROME_TABS_CREATE_OPTIONS` (chrome.tabs.create) in background.js at L4620
- Tools reporting this Flow: DoubleX

- Privilege boundary recorded: `True` (None); DoubleX matched external input to a sensitive API parameter.

#### Analysis and validation

- Static (DoubleX): verdict `UNCERTAIN`, confidence 0.3; report `extensions/ffilhkdaaipeaedlcappdbldhnpddjjn_6.0.1/static/static_report.json`.
- Dynamic (DoubleX): `INCONCLUSIVE_AFTER_DEBUG` (evidence stage `ENVIRONMENT_READY`); the dynamic run did not establish a decisive runtime result; report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\round-doublex-edge-unconfirmed-21-r2\dynamic\doublex-edge-r2\summary.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `6.0.1` in a disposable edge profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Use only a harmless marker in a disposable profile.
window.postMessage({ marker: "EXPGuard_test_marker" }, "*");
```

#### Supporting material

- DoubleX: source report `DoubleX/edge/flow-verification-results-no-duplicate.json`; static report `extensions/ffilhkdaaipeaedlcappdbldhnpddjjn_6.0.1/static/static_report.json`; dynamic report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\round-doublex-edge-unconfirmed-21-r2\dynamic\doublex-edge-r2\summary.json`.


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
