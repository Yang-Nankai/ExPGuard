# Security Vulnerability Report: Critical Unauthorized Cookie Modification and Unauthorized Tab/Window Control in OceanHero: Save Our Oceans by Surfing the Web

## Summary

We are writing on behalf of a security research team from Nankai University and the University of Liverpool. Our Ground Truth review identified **2 Flow(s)** in **OceanHero: Save Our Oceans by Surfing the Web** (chrome, extension ID `ijpgjiobapjdadigoagamcmhmdfdggmg`, version `10.7`).
The recorded issue type(s): **Unauthorized Cookie Modification; Unauthorized Tab/Window Control**.

## Affected Extension Details

- Name: OceanHero: Save Our Oceans by Surfing the Web
- Platform: chrome
- Extension ID: `ijpgjiobapjdadigoagamcmhmdfdggmg`
- Dataset version: `10.7`
- Store version at review: `10.7`
- Users: 600000
- Analysis tools: DoubleX, ExPGuard

## Findings

### Finding 1: Unauthorized Cookie Manipulation

The Ground Truth record traces An external extension able to message this extension from `CHROME_ONMESSAGEEXTERNAL_MESSAGE` (chrome.runtime.onMessageExternal.addListener[message]) in background at L1:C7234 -> L1:C7235 to the privileged sink `CHROME_COOKIES_SET_OPTIONS` in background at L1:C7093 -> L1:C7195. The source scope is in the recorded source context. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-7de7f3663ca0f652`
- Severity recorded by the analysis: **CRITICAL**
- Source: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` (chrome.runtime.onMessageExternal.addListener[message]) in background at L1:C7234 -> L1:C7235
- Sink: `CHROME_COOKIES_SET_OPTIONS` in background at L1:C7093 -> L1:C7195
- Tools reporting this Flow: ExPGuard, DoubleX

- Privilege boundary recorded: `True` (EXTERNALLY_CONNECTABLE); sink grants capability beyond the source origin

#### Analysis and validation

- Static (ExPGuard): verdict `TRUE_POSITIVE`, confidence 0.6; report `extensions/ijpgjiobapjdadigoagamcmhmdfdggmg_10.7/static/static_report.json`.
- Dynamic (ExPGuard): `CONFIRMED` (basis `runtime_sink_evidence`; evidence stage `SINK_REACHED`); runtime reproduction recorded; report `extensions/ijpgjiobapjdadigoagamcmhmdfdggmg_10.7/dynamic/dynamic_report.json`.
- Static (DoubleX): verdict `UNCERTAIN`, confidence 0.3; report `extensions/ijpgjiobapjdadigoagamcmhmdfdggmg_10.7/static/static_report.json`.
- Dynamic (DoubleX): `TOOL_LIMITATION` (basis `runtime_or_static_dynamic_evidence`); this result does not independently confirm execution at the sink; report `extensions/ijpgjiobapjdadigoagamcmhmdfdggmg_10.7/dynamic/dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `10.7` in a disposable chrome profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Use only a harmless marker in a disposable profile.
window.postMessage({ marker: "EXPGuard_test_marker" }, "*");
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/chrome/flow-verification-results-no-duplicate.json`; static report `extensions/ijpgjiobapjdadigoagamcmhmdfdggmg_10.7/static/static_report.json`; dynamic report `extensions/ijpgjiobapjdadigoagamcmhmdfdggmg_10.7/dynamic/dynamic_report.json`.
- DoubleX: source report `DoubleX/chrome/flow-verification-results-no-duplicate.json`; static report `extensions/ijpgjiobapjdadigoagamcmhmdfdggmg_10.7/static/static_report.json`; dynamic report `extensions/ijpgjiobapjdadigoagamcmhmdfdggmg_10.7/dynamic/dynamic_report.json`.

### Finding 2: Unauthorized Tab or Window Manipulation

The Ground Truth record traces A page or sender able to reach the recorded message/event source from `WINDOW_MESSAGE_EVENT` (DoubleX web-accessible message input) in background.js at L348 to the privileged sink `CHROME_TABS_CREATE_OPTIONS` (chrome.tabs.create) in background.js at L533. The source scope is in the recorded source context. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-e5652f18361ced27`
- Severity recorded by the analysis: **CRITICAL**
- Source: `WINDOW_MESSAGE_EVENT` (DoubleX web-accessible message input) in background.js at L348
- Sink: `CHROME_TABS_CREATE_OPTIONS` (chrome.tabs.create) in background.js at L533
- Tools reporting this Flow: DoubleX

- Privilege boundary recorded: `True` (None); DoubleX matched external input to a sensitive API parameter.

#### Analysis and validation

- Static (DoubleX): verdict `UNCERTAIN`, confidence 0; report `extensions/ijpgjiobapjdadigoagamcmhmdfdggmg_10.7/static/static_report.json`.
- Dynamic (DoubleX): `INCONCLUSIVE_AFTER_DEBUG` (basis `runtime_or_static_dynamic_evidence`); the dynamic run did not establish a decisive runtime result; report `extensions/ijpgjiobapjdadigoagamcmhmdfdggmg_10.7/dynamic/dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `10.7` in a disposable chrome profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Use only a harmless marker in a disposable profile.
window.postMessage({ marker: "EXPGuard_test_marker" }, "*");
```

#### Supporting material

- DoubleX: source report `DoubleX/chrome/flow-verification-results-no-duplicate.json`; static report `extensions/ijpgjiobapjdadigoagamcmhmdfdggmg_10.7/static/static_report.json`; dynamic report `extensions/ijpgjiobapjdadigoagamcmhmdfdggmg_10.7/dynamic/dynamic_report.json`.


## Recommendations

1. Restrict cookie operations to the minimum host and cookie scope, and reject values supplied by untrusted page content.
2. Validate tab/window IDs and navigation targets, and require a user gesture for externally initiated changes.
3. Reduce host permissions and sensitive API access to the smallest scope required by the feature.

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
