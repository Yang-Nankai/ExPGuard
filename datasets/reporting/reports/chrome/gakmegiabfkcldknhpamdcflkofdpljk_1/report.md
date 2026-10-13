# Security Vulnerability Report: Critical Unauthorized Tab/Window Control in Satellite Earth Maps

## Summary

We are writing on behalf of a security research team from Nankai University and the University of Liverpool. Our Ground Truth review identified **3 Flow(s)** in **Satellite Earth Maps** (chrome, extension ID `gakmegiabfkcldknhpamdcflkofdpljk`, version `1`).
The recorded issue type(s): **Unauthorized Tab/Window Control**.

## Affected Extension Details

- Name: Satellite Earth Maps
- Platform: chrome
- Extension ID: `gakmegiabfkcldknhpamdcflkofdpljk`
- Dataset version: `1`
- Store version at review: `1`
- Users: 40000
- Analysis tools: CoCo, ExPGuard

## Findings

### Finding 1: Unauthorized Tab or Window Manipulation

The Ground Truth record traces An external extension able to message this extension from `CHROME_ONMESSAGEEXTERNAL_MESSAGE` (chrome.runtime.onMessageExternal.addListener[message]) in js/background at L104:C13 -> L104:C20 to the privileged sink `CHROME_WINDOWS_CREATE_OPTIONS` in js/background at L129:C12 -> L132:C14. The source scope is in the recorded source context. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-632c468b5c32b659`
- Severity recorded by the analysis: **CRITICAL**
- Source: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` (chrome.runtime.onMessageExternal.addListener[message]) in js/background at L104:C13 -> L104:C20
- Sink: `CHROME_WINDOWS_CREATE_OPTIONS` in js/background at L129:C12 -> L132:C14
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (EXTERNALLY_CONNECTABLE); sink grants capability beyond the source origin

#### Analysis and validation

- Static (ExPGuard): verdict `TRUE_POSITIVE`, confidence 0.6; report `extensions/gakmegiabfkcldknhpamdcflkofdpljk_1/static/static_report.json`.
- Dynamic (ExPGuard): `PARTIAL` (basis `non_decisive`; evidence stage `SINK_REACHED`); the recorded replay did not establish the complete source-to-sink effect; report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\chrome\extensions\gakmegiabfkcldknhpamdcflkofdpljk_1\dynamic\dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `1` in a disposable chrome profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Use only a harmless marker in a disposable profile.
window.postMessage({ marker: "EXPGuard_test_marker" }, "*");
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/chrome/flow-verification-results-no-duplicate.json`; static report `extensions/gakmegiabfkcldknhpamdcflkofdpljk_1/static/static_report.json`; dynamic report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\chrome\extensions\gakmegiabfkcldknhpamdcflkofdpljk_1\dynamic\dynamic_report.json`.

### Finding 2: Unauthorized Tab or Window Manipulation

The Ground Truth record traces An external extension able to message this extension from `CHROME_ONMESSAGEEXTERNAL_MESSAGE` (chrome.runtime.onMessageExternal.addListener[message]) in js/background at L104:C13 -> L104:C20 to the privileged sink `CHROME_WINDOWS_CREATE_OPTIONS` in js/background at L135:C12 -> L139:C14. The source scope is in the recorded source context. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-6e438bd8521bd113`
- Severity recorded by the analysis: **CRITICAL**
- Source: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` (chrome.runtime.onMessageExternal.addListener[message]) in js/background at L104:C13 -> L104:C20
- Sink: `CHROME_WINDOWS_CREATE_OPTIONS` in js/background at L135:C12 -> L139:C14
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (EXTERNALLY_CONNECTABLE); sink grants capability beyond the source origin

#### Analysis and validation

- Dynamic (ExPGuard): `PARTIAL` (basis `non_decisive`; evidence stage `SINK_REACHED`); the recorded replay did not establish the complete source-to-sink effect; report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\chrome\extensions\gakmegiabfkcldknhpamdcflkofdpljk_1\dynamic\dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `1` in a disposable chrome profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Use only a harmless marker in a disposable profile.
window.postMessage({ marker: "EXPGuard_test_marker" }, "*");
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/chrome/flow-verification-results-no-duplicate.json`; static report `not recorded`; dynamic report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\chrome\extensions\gakmegiabfkcldknhpamdcflkofdpljk_1\dynamic\dynamic_report.json`.

### Finding 3: Unauthorized Tab or Window Manipulation

The Ground Truth record traces An external extension able to message this extension from `CHROME_ONMESSAGEEXTERNAL_MESSAGE` (chrome.runtime.onMessageExternal.addListener[message]) in js/background at L104:C13 -> L104:C20 to the privileged sink `CHROME_TABS_CREATE_OPTIONS` in js/background at L124:C12 -> L126:C14. The source scope is in the recorded source context. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-ebe6fad51475ec7b`
- Severity recorded by the analysis: **CRITICAL**
- Source: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` (chrome.runtime.onMessageExternal.addListener[message]) in js/background at L104:C13 -> L104:C20
- Sink: `CHROME_TABS_CREATE_OPTIONS` in js/background at L124:C12 -> L126:C14
- Tools reporting this Flow: ExPGuard, CoCo

- Privilege boundary recorded: `True` (EXTERNALLY_CONNECTABLE); sink grants capability beyond the source origin

#### Analysis and validation

- Dynamic (ExPGuard): `PARTIAL` (basis `non_decisive`; evidence stage `SINK_REACHED`); the recorded replay did not establish the complete source-to-sink effect; report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\chrome\extensions\gakmegiabfkcldknhpamdcflkofdpljk_1\dynamic\dynamic_report.json`.
- Static (CoCo): verdict `TRUE_POSITIVE`, confidence 0.6; report `extensions/gakmegiabfkcldknhpamdcflkofdpljk_1/static/static_report.json`.
- Dynamic (CoCo): `NOT_ATTEMPTED` (basis `runtime_or_static_dynamic_evidence`); this result does not independently confirm execution at the sink; report `extensions/gakmegiabfkcldknhpamdcflkofdpljk_1/dynamic/dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `1` in a disposable chrome profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Use only a harmless marker in a disposable profile.
window.postMessage({ marker: "EXPGuard_test_marker" }, "*");
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/chrome/flow-verification-results-no-duplicate.json`; static report `not recorded`; dynamic report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\chrome\extensions\gakmegiabfkcldknhpamdcflkofdpljk_1\dynamic\dynamic_report.json`.
- CoCo: source report `CoCo/chrome/flow-verification-results-no-duplicate.json`; static report `extensions/gakmegiabfkcldknhpamdcflkofdpljk_1/static/static_report.json`; dynamic report `extensions/gakmegiabfkcldknhpamdcflkofdpljk_1/dynamic/dynamic_report.json`.


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
