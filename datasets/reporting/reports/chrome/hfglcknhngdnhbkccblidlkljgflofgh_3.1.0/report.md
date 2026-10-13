# Security Vulnerability Report: High Extension Storage Poisoning in Lightning Extension

## Summary

We are writing on behalf of a security research team from Nankai University and the University of Liverpool. Our Ground Truth review identified **4 Flow(s)** in **Lightning Extension** (chrome, extension ID `hfglcknhngdnhbkccblidlkljgflofgh`, version `3.1.0`).
The recorded issue type(s): **Extension Storage Poisoning**.

## Affected Extension Details

- Name: Lightning Extension
- Platform: chrome
- Extension ID: `hfglcknhngdnhbkccblidlkljgflofgh`
- Dataset version: `3.1.0`
- Store version at review: `3.1.0`
- Users: 200000
- Analysis tools: ExPGuard

## Findings

### Finding 1: Storage Poisoning

The Ground Truth record traces A page or sender able to reach the recorded message/event source from `WINDOW_CUSTOM_EVENT` (window.addEventListener(savePluginMetrics)) in content at L1:C10470 -> L1:C10478 to the privileged sink `CHROME_LOCAL_STORAGE` (plugin-metrics) in content at L1:C10638 -> L1:C10665. The source scope is on pages matching `https://*.force.com/*, https://*.salesforce.com/*, https://*.visualforce.com/*`. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-01c3dbd024924ea7`
- Severity recorded by the analysis: **HIGH**
- Source: `WINDOW_CUSTOM_EVENT` (window.addEventListener(savePluginMetrics)) in content at L1:C10470 -> L1:C10478
- Sink: `CHROME_LOCAL_STORAGE` (plugin-metrics) in content at L1:C10638 -> L1:C10665
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Analysis and validation

- Dynamic (ExPGuard): `CONFIRMED` (basis `runtime_reproduced`; evidence stage `MARKER_REACHED`); runtime reproduction recorded; report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\chrome\extensions\hfglcknhngdnhbkccblidlkljgflofgh_3.1.0\dynamic\dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `3.1.0` in a disposable chrome profile.
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

- ExPGuard: source report `ExPGuard-Opti/chrome/flow-verification-results-no-duplicate.json`; static report `not recorded`; dynamic report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\chrome\extensions\hfglcknhngdnhbkccblidlkljgflofgh_3.1.0\dynamic\dynamic_report.json`.

### Finding 2: Storage Poisoning

The Ground Truth record traces A page or sender able to reach the recorded message/event source from `WINDOW_CUSTOM_EVENT` (From storage.local.set('plugin-metrics') in content) in content at L1:C10470 -> L1:C10478 to the privileged sink `CHROME_LOCAL_STORAGE` (plugin-metrics) in background at L1:C754 -> L1:C787. The source scope is on pages matching `https://*.force.com/*, https://*.salesforce.com/*, https://*.visualforce.com/*`. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-306126afb8b2ddb0`
- Severity recorded by the analysis: **HIGH**
- Source: `WINDOW_CUSTOM_EVENT` (From storage.local.set('plugin-metrics') in content) in content at L1:C10470 -> L1:C10478
- Sink: `CHROME_LOCAL_STORAGE` (plugin-metrics) in background at L1:C754 -> L1:C787
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Analysis and validation

- Static (ExPGuard): verdict `UNCERTAIN`, confidence 0.3; report `extensions/hfglcknhngdnhbkccblidlkljgflofgh_3.1.0/static/static_report.json`.
- Dynamic (ExPGuard): `INCONCLUSIVE_AFTER_DEBUG` (basis `inconclusive`; evidence stage `SOURCE_REACHED`); the dynamic run did not establish a decisive runtime result; report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\chrome\extensions\hfglcknhngdnhbkccblidlkljgflofgh_3.1.0\dynamic\dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `3.1.0` in a disposable chrome profile.
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

- ExPGuard: source report `ExPGuard-Opti/chrome/flow-verification-results-no-duplicate.json`; static report `extensions/hfglcknhngdnhbkccblidlkljgflofgh_3.1.0/static/static_report.json`; dynamic report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\chrome\extensions\hfglcknhngdnhbkccblidlkljgflofgh_3.1.0\dynamic\dynamic_report.json`.

### Finding 3: Storage Poisoning

The Ground Truth record traces A page or sender able to reach the recorded message/event source from `WINDOW_CUSTOM_EVENT` (From storage.local.set('labs-sessions') in content) in content at L1:C11056 -> L1:C11064 to the privileged sink `CHROME_LOCAL_STORAGE` (labs-sessions) in content at L1:C7318 -> L1:C7351. The source scope is on pages matching `https://*.force.com/*, https://*.salesforce.com/*, https://*.visualforce.com/*`. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-34c36ece867cdbe5`
- Severity recorded by the analysis: **HIGH**
- Source: `WINDOW_CUSTOM_EVENT` (From storage.local.set('labs-sessions') in content) in content at L1:C11056 -> L1:C11064
- Sink: `CHROME_LOCAL_STORAGE` (labs-sessions) in content at L1:C7318 -> L1:C7351
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Analysis and validation

- Static (ExPGuard): verdict `TRUE_POSITIVE`, confidence 0.6; report `extensions/hfglcknhngdnhbkccblidlkljgflofgh_3.1.0/static/static_report.json`.
- Dynamic (ExPGuard): `CONFIRMED` (basis `runtime_sink_evidence`; evidence stage `SINK_REACHED`); runtime reproduction recorded; report `extensions/hfglcknhngdnhbkccblidlkljgflofgh_3.1.0/dynamic/dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `3.1.0` in a disposable chrome profile.
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

- ExPGuard: source report `ExPGuard-Opti/chrome/flow-verification-results-no-duplicate.json`; static report `extensions/hfglcknhngdnhbkccblidlkljgflofgh_3.1.0/static/static_report.json`; dynamic report `extensions/hfglcknhngdnhbkccblidlkljgflofgh_3.1.0/dynamic/dynamic_report.json`.

### Finding 4: Storage Poisoning

The Ground Truth record traces A page or sender able to reach the recorded message/event source from `WINDOW_CUSTOM_EVENT` (window.addEventListener(labsPermCheck)) in content at L1:C11056 -> L1:C11064 to the privileged sink `CHROME_LOCAL_STORAGE` (labs-sessions) in content at L1:C6998 -> L1:C7031. The source scope is on pages matching `https://*.force.com/*, https://*.salesforce.com/*, https://*.visualforce.com/*`. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-fb8a180e71fc06fd`
- Severity recorded by the analysis: **HIGH**
- Source: `WINDOW_CUSTOM_EVENT` (window.addEventListener(labsPermCheck)) in content at L1:C11056 -> L1:C11064
- Sink: `CHROME_LOCAL_STORAGE` (labs-sessions) in content at L1:C6998 -> L1:C7031
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Analysis and validation

- Dynamic (ExPGuard): `CONFIRMED` (basis `runtime_reproduced`; evidence stage `MARKER_REACHED`); runtime reproduction recorded; report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\chrome\extensions\hfglcknhngdnhbkccblidlkljgflofgh_3.1.0\dynamic\dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `3.1.0` in a disposable chrome profile.
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

- ExPGuard: source report `ExPGuard-Opti/chrome/flow-verification-results-no-duplicate.json`; static report `not recorded`; dynamic report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\chrome\extensions\hfglcknhngdnhbkccblidlkljgflofgh_3.1.0\dynamic\dynamic_report.json`.


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
