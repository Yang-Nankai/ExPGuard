# Security Vulnerability Report: Medium Extension Storage Poisoning and Unauthorized Tab/Window Control in Multiselect for YouTube™

## Summary

We are writing on behalf of a security research team from Nankai University and the University of Liverpool. Our Ground Truth review identified **2 Flow(s)** in **Multiselect for YouTube™** (chrome, extension ID `gpgbiinpmelaihndlegbgfkmnpofgfei`, version `3.7`).
The recorded issue type(s): **Extension Storage Poisoning; Unauthorized Tab/Window Control**.

## Affected Extension Details

- Name: Multiselect for YouTube™
- Platform: chrome
- Extension ID: `gpgbiinpmelaihndlegbgfkmnpofgfei`
- Dataset version: `3.7`
- Store version at review: `3.7`
- Users: 60000
- Analysis tools: ExPGuard

## Findings

### Finding 1: Storage Poisoning

The Ground Truth record traces A page or sender able to reach the recorded message/event source from `WINDOW_CUSTOM_EVENT` (window.addEventListener(msfy-inner-message)) in js/content at L1:C626 -> L1:C634 to the privileged sink `CHROME_LOCAL_STORAGE` (unknown) in js/content at L1:C777 -> L1:C805. The source scope is on pages matching `https://www.youtube.com/*`. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-73395913dd2df3fc`
- Severity recorded by the analysis: **MEDIUM**
- Source: `WINDOW_CUSTOM_EVENT` (window.addEventListener(msfy-inner-message)) in js/content at L1:C626 -> L1:C634
- Sink: `CHROME_LOCAL_STORAGE` (unknown) in js/content at L1:C777 -> L1:C805
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Analysis and validation

- Static (ExPGuard): verdict `TRUE_POSITIVE`, confidence 0.6; report `extensions/gpgbiinpmelaihndlegbgfkmnpofgfei_3.7/static/static_report.json`.
- Dynamic (ExPGuard): `INCONCLUSIVE_AFTER_DEBUG` (basis `non_decisive`; evidence stage `BLOCKED`); the dynamic run did not establish a decisive runtime result; report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\chrome\extensions\gpgbiinpmelaihndlegbgfkmnpofgfei_3.7\dynamic\dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `3.7` in a disposable chrome profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Replace EVENT_NAME and the documented field names with the handler's
// public event contract. Do not use real URLs, tokens, or credentials.
document.dispatchEvent(new CustomEvent("EVENT_NAME", {
  detail: { marker: "EXPGuard_test_marker" }
}));
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/chrome/flow-verification-results-no-duplicate.json`; static report `extensions/gpgbiinpmelaihndlegbgfkmnpofgfei_3.7/static/static_report.json`; dynamic report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\chrome\extensions\gpgbiinpmelaihndlegbgfkmnpofgfei_3.7\dynamic\dynamic_report.json`.

### Finding 2: Unauthorized Tab or Window Manipulation

The Ground Truth record traces A page or sender able to reach the recorded message/event source from `WINDOW_CUSTOM_EVENT` (window.addEventListener(msfy-inner-message)) in js/content at L1:C626 -> L1:C634 to the privileged sink `CHROME_TABS_CREATE_OPTIONS` in background at L1:C408 -> L1:C440. The source scope is on pages matching `https://www.youtube.com/*`. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-9dd487955bddedda`
- Severity recorded by the analysis: **MEDIUM**
- Source: `WINDOW_CUSTOM_EVENT` (window.addEventListener(msfy-inner-message)) in js/content at L1:C626 -> L1:C634
- Sink: `CHROME_TABS_CREATE_OPTIONS` in background at L1:C408 -> L1:C440
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Analysis and validation

- Dynamic (ExPGuard): `INCONCLUSIVE_AFTER_DEBUG` (basis `non_decisive`; evidence stage `ENVIRONMENT_READY`); the dynamic run did not establish a decisive runtime result; report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\chrome\extensions\gpgbiinpmelaihndlegbgfkmnpofgfei_3.7\dynamic\dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `3.7` in a disposable chrome profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Replace EVENT_NAME and the documented field names with the handler's
// public event contract. Do not use real URLs, tokens, or credentials.
document.dispatchEvent(new CustomEvent("EVENT_NAME", {
  detail: { marker: "EXPGuard_test_marker" }
}));
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/chrome/flow-verification-results-no-duplicate.json`; static report `not recorded`; dynamic report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\chrome\extensions\gpgbiinpmelaihndlegbgfkmnpofgfei_3.7\dynamic\dynamic_report.json`.


## Recommendations

1. Do not let page-controlled cookies or DOM values select extension-owned storage values; validate the expected value and keep credentials in extension-owned UI/state.
2. Treat storage writes as privileged state changes: use an allowlisted schema, reject attacker-controlled keys, and avoid merging untrusted objects into extension state.
3. Validate tab/window IDs and navigation targets, and require a user gesture for externally initiated changes.
4. Reduce host permissions and sensitive API access to the smallest scope required by the feature.

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
