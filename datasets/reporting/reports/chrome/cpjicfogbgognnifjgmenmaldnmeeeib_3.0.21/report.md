# Security Vulnerability Report: Medium Extension Storage Poisoning in Gaea Extension

## Summary

We are writing on behalf of a security research team from Nankai University and the University of Liverpool. Our Ground Truth review identified **4 Flow(s)** in **Gaea Extension** (chrome, extension ID `cpjicfogbgognnifjgmenmaldnmeeeib`, version `3.0.21`).
The recorded issue type(s): **Extension Storage Poisoning**.

## Affected Extension Details

- Name: Gaea Extension
- Platform: chrome
- Extension ID: `cpjicfogbgognnifjgmenmaldnmeeeib`
- Dataset version: `3.0.21`
- Store version at review: `3.0.21`
- Users: 30000
- Analysis tools: ExPGuard

## Findings

### Finding 1: Storage Poisoning

The Ground Truth record traces A page or sender able to reach the recorded message/event source from `WINDOW_CUSTOM_EVENT` (From storage.local.set('gaea_plugin_token') in background) in content_scripts at L38:C0 -> L96:C2 to the privileged sink `CHROME_LOCAL_STORAGE` (gaea_plugin_token) in background at L107:C10 -> L107:C57. The source scope is on pages matching `https://api.aigaea.net/*, https://app.aigaea.net/*`. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-02d73e61e655dfaa`
- Severity recorded by the analysis: **MEDIUM**
- Source: `WINDOW_CUSTOM_EVENT` (From storage.local.set('gaea_plugin_token') in background) in content_scripts at L38:C0 -> L96:C2
- Sink: `CHROME_LOCAL_STORAGE` (gaea_plugin_token) in background at L107:C10 -> L107:C57
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Analysis and validation

- Static (ExPGuard): verdict `TRUE_POSITIVE`, confidence 0.6; report `extensions/cpjicfogbgognnifjgmenmaldnmeeeib_3.0.21/static/static_report.json`.
- Dynamic (ExPGuard): `CONFIRMED` (basis `runtime_reproduced`; evidence stage `MARKER_REACHED`); runtime reproduction recorded; report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\chrome\extensions\cpjicfogbgognnifjgmenmaldnmeeeib_3.0.21\dynamic\dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `3.0.21` in a disposable chrome profile.
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

- ExPGuard: source report `ExPGuard-Opti/chrome/flow-verification-results-no-duplicate.json`; static report `extensions/cpjicfogbgognnifjgmenmaldnmeeeib_3.0.21/static/static_report.json`; dynamic report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\chrome\extensions\cpjicfogbgognnifjgmenmaldnmeeeib_3.0.21\dynamic\dynamic_report.json`.

### Finding 2: Storage Poisoning

The Ground Truth record traces A page or sender able to reach the recorded message/event source from `WINDOW_CUSTOM_EVENT` (window.addEventListener(requestPluginVersion)) in content_scripts at L41:C6 -> L41:C18 to the privileged sink `CHROME_LOCAL_STORAGE` (gaea_plugin_status) in background at L49:C10 -> L49:C89. The source scope is on pages matching `https://api.aigaea.net/*, https://app.aigaea.net/*`. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-6fc4c9d12e8f3db7`
- Severity recorded by the analysis: **MEDIUM**
- Source: `WINDOW_CUSTOM_EVENT` (window.addEventListener(requestPluginVersion)) in content_scripts at L41:C6 -> L41:C18
- Sink: `CHROME_LOCAL_STORAGE` (gaea_plugin_status) in background at L49:C10 -> L49:C89
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Analysis and validation

- Dynamic (ExPGuard): `CONFIRMED` (basis `runtime_reproduced`; evidence stage `MARKER_REACHED`); runtime reproduction recorded; report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\chrome\extensions\cpjicfogbgognnifjgmenmaldnmeeeib_3.0.21\dynamic\dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `3.0.21` in a disposable chrome profile.
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

- ExPGuard: source report `ExPGuard-Opti/chrome/flow-verification-results-no-duplicate.json`; static report `not recorded`; dynamic report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\chrome\extensions\cpjicfogbgognnifjgmenmaldnmeeeib_3.0.21\dynamic\dynamic_report.json`.

### Finding 3: Storage Poisoning

The Ground Truth record traces A page or sender able to reach the recorded message/event source from `WINDOW_CUSTOM_EVENT` (From storage.local.set('gaea_plugin_status') in background) in content_scripts at L38:C0 -> L96:C2 to the privileged sink `CHROME_LOCAL_STORAGE` (gaea_plugin_status) in background at L103:C10 -> L103:C58. The source scope is on pages matching `https://api.aigaea.net/*, https://app.aigaea.net/*`. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-72b8f92762c90699`
- Severity recorded by the analysis: **MEDIUM**
- Source: `WINDOW_CUSTOM_EVENT` (From storage.local.set('gaea_plugin_status') in background) in content_scripts at L38:C0 -> L96:C2
- Sink: `CHROME_LOCAL_STORAGE` (gaea_plugin_status) in background at L103:C10 -> L103:C58
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Analysis and validation

- Static (ExPGuard): verdict `TRUE_POSITIVE`, confidence 0.6; report `extensions/cpjicfogbgognnifjgmenmaldnmeeeib_3.0.21/static/static_report.json`.
- Dynamic (ExPGuard): `CONFIRMED` (basis `runtime_reproduced`; evidence stage `MARKER_REACHED`); runtime reproduction recorded; report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\chrome\extensions\cpjicfogbgognnifjgmenmaldnmeeeib_3.0.21\dynamic\dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `3.0.21` in a disposable chrome profile.
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

- ExPGuard: source report `ExPGuard-Opti/chrome/flow-verification-results-no-duplicate.json`; static report `extensions/cpjicfogbgognnifjgmenmaldnmeeeib_3.0.21/static/static_report.json`; dynamic report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\chrome\extensions\cpjicfogbgognnifjgmenmaldnmeeeib_3.0.21\dynamic\dynamic_report.json`.

### Finding 4: Storage Poisoning

The Ground Truth record traces A page or sender able to reach the recorded message/event source from `WINDOW_CUSTOM_EVENT` (window.addEventListener(requestPluginVersion)) in content_scripts at L41:C6 -> L41:C18 to the privileged sink `CHROME_LOCAL_STORAGE` (gaea_plugin_token) in background at L45:C10 -> L45:C68. The source scope is on pages matching `https://api.aigaea.net/*, https://app.aigaea.net/*`. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-8c2f98171fe707ad`
- Severity recorded by the analysis: **MEDIUM**
- Source: `WINDOW_CUSTOM_EVENT` (window.addEventListener(requestPluginVersion)) in content_scripts at L41:C6 -> L41:C18
- Sink: `CHROME_LOCAL_STORAGE` (gaea_plugin_token) in background at L45:C10 -> L45:C68
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Analysis and validation

- Dynamic (ExPGuard): `CONFIRMED` (basis `runtime_reproduced`; evidence stage `MARKER_REACHED`); runtime reproduction recorded; report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\chrome\extensions\cpjicfogbgognnifjgmenmaldnmeeeib_3.0.21\dynamic\dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `3.0.21` in a disposable chrome profile.
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

- ExPGuard: source report `ExPGuard-Opti/chrome/flow-verification-results-no-duplicate.json`; static report `not recorded`; dynamic report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\chrome\extensions\cpjicfogbgognnifjgmenmaldnmeeeib_3.0.21\dynamic\dynamic_report.json`.


## Recommendations

1. Do not let page-controlled cookies or DOM values select extension-owned storage values; validate the expected value and keep credentials in extension-owned UI/state.
2. Treat storage writes as privileged state changes: use an allowlisted schema, reject attacker-controlled keys, and avoid merging untrusted objects into extension state.
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
