# Security Vulnerability Report: Critical Unauthorized Cookie Modification and Unauthorized Tab/Window Control in OceanHero: Save Our Oceans with Every New Tab

## Summary

We are writing on behalf of a security research team from Nankai University and the University of Liverpool. Our Ground Truth review identified **2 Flow(s)** in **OceanHero: Save Our Oceans with Every New Tab** (chrome, extension ID `cdbccfkcpkmimlajcjpodelocoeifjhp`, version `8.7`).
The recorded issue type(s): **Unauthorized Cookie Modification; Unauthorized Tab/Window Control**.

The store currently reports version `10.7`. The update revalidation is summarized per tool below. This report covers only the original Flow(s); newly introduced Flow(s) are out of scope. Any mixed result, tool failure, or incomplete automated run is called out explicitly and should not be read as a final remediation determination.

## Affected Extension Details

- Name: OceanHero: Save Our Oceans with Every New Tab
- Platform: chrome
- Extension ID: `cdbccfkcpkmimlajcjpodelocoeifjhp`
- Dataset version: `8.7`
- Store version at review: `10.7`
- Users: 70000
- Analysis tools: DoubleX, ExPGuard

## Findings

### Finding 1: Unauthorized Cookie Manipulation

The Ground Truth record traces An external extension able to message this extension from `CHROME_ONMESSAGEEXTERNAL_MESSAGE` (chrome.runtime.onMessageExternal.addListener[message]) in background at L1:C85860 -> L1:C85861 to the privileged sink `CHROME_COOKIES_SET_OPTIONS` in background at L1:C85719 -> L1:C85821. The source scope is in the recorded source context. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-ae3e3a4afc3d3310`
- Severity recorded by the analysis: **CRITICAL**
- Source: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` (chrome.runtime.onMessageExternal.addListener[message]) in background at L1:C85860 -> L1:C85861
- Sink: `CHROME_COOKIES_SET_OPTIONS` in background at L1:C85719 -> L1:C85821
- Tools reporting this Flow: ExPGuard, DoubleX

- Privilege boundary recorded: `True` (EXTERNALLY_CONNECTABLE); sink grants capability beyond the source origin

#### Updated-version tool result

- ExPGuard: `still_detected`; original source `CHROME_ONMESSAGEEXTERNAL_MESSAGE` → sink `CHROME_COOKIES_SET_OPTIONS`; candidate matches: 1
- DoubleX: `still_detected`; original source `WINDOW_MESSAGE_EVENT` → sink `CHROME_COOKIES_SET_OPTIONS`; candidate matches: 1

#### Analysis and validation

- Static (ExPGuard): verdict `FALSE_POSITIVE`, confidence 0.6; report `extensions/cdbccfkcpkmimlajcjpodelocoeifjhp_8.7/static/static_report.json`.
- Dynamic (ExPGuard): `EXTERNAL_CONDITION_REQUIRED` (basis `external_condition_required`); a sender-side precondition was recorded; this is not an unconditional runtime reproduction; report `extensions/cdbccfkcpkmimlajcjpodelocoeifjhp_8.7/dynamic/dynamic_report.json`.
- Static (DoubleX): verdict `UNCERTAIN`, confidence 0.3; report `extensions/cdbccfkcpkmimlajcjpodelocoeifjhp_8.7/static/static_report.json`.
- Dynamic (DoubleX): `EXTERNAL_CONDITION_REQUIRED` (basis `external_condition_required`); a sender-side precondition was recorded; this is not an unconditional runtime reproduction; report `extensions/cdbccfkcpkmimlajcjpodelocoeifjhp_8.7/dynamic/dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `8.7` in a disposable chrome profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Use only a harmless marker in a disposable profile.
window.postMessage({ marker: "EXPGuard_test_marker" }, "*");
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/chrome/flow-verification-results-no-duplicate.json`; static report `extensions/cdbccfkcpkmimlajcjpodelocoeifjhp_8.7/static/static_report.json`; dynamic report `extensions/cdbccfkcpkmimlajcjpodelocoeifjhp_8.7/dynamic/dynamic_report.json`.
- DoubleX: source report `DoubleX/chrome/flow-verification-results-no-duplicate.json`; static report `extensions/cdbccfkcpkmimlajcjpodelocoeifjhp_8.7/static/static_report.json`; dynamic report `extensions/cdbccfkcpkmimlajcjpodelocoeifjhp_8.7/dynamic/dynamic_report.json`.

### Finding 2: Unauthorized Tab or Window Manipulation

The Ground Truth record traces A page or sender able to reach the recorded message/event source from `WINDOW_MESSAGE_EVENT` (DoubleX web-accessible message input) in background.js at L4499 to the privileged sink `CHROME_TABS_CREATE_OPTIONS` (chrome.tabs.create) in background.js at L4707. The source scope is in the recorded source context. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-f51e3f36c30744c4`
- Severity recorded by the analysis: **CRITICAL**
- Source: `WINDOW_MESSAGE_EVENT` (DoubleX web-accessible message input) in background.js at L4499
- Sink: `CHROME_TABS_CREATE_OPTIONS` (chrome.tabs.create) in background.js at L4707
- Tools reporting this Flow: DoubleX

- Privilege boundary recorded: `True` (None); DoubleX matched external input to a sensitive API parameter.

#### Updated-version tool result

- DoubleX: `still_detected`; original source `WINDOW_MESSAGE_EVENT` → sink `CHROME_TABS_CREATE_OPTIONS`; candidate matches: 1

#### Analysis and validation

- Static (DoubleX): verdict `UNCERTAIN`, confidence 0.3; report `extensions/cdbccfkcpkmimlajcjpodelocoeifjhp_8.7/static/static_report.json`.
- Dynamic (DoubleX): `INCONCLUSIVE_AFTER_DEBUG` (basis `runtime_or_static_dynamic_evidence`); the dynamic run did not establish a decisive runtime result; report `extensions/cdbccfkcpkmimlajcjpodelocoeifjhp_8.7/dynamic/dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `8.7` in a disposable chrome profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Use only a harmless marker in a disposable profile.
window.postMessage({ marker: "EXPGuard_test_marker" }, "*");
```

#### Supporting material

- DoubleX: source report `DoubleX/chrome/flow-verification-results-no-duplicate.json`; static report `extensions/cdbccfkcpkmimlajcjpodelocoeifjhp_8.7/static/static_report.json`; dynamic report `extensions/cdbccfkcpkmimlajcjpodelocoeifjhp_8.7/dynamic/dynamic_report.json`.


## Recommendations

1. Restrict cookie operations to the minimum host and cookie scope, and reject values supplied by untrusted page content.
2. Validate tab/window IDs and navigation targets, and require a user gesture for externally initiated changes.
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
