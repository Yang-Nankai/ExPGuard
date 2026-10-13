# Security Vulnerability Report: Critical Extension Storage Poisoning in SuperNova SWF Enabler

## Summary

We are writing on behalf of a security research team from Nankai University and the University of Liverpool. Our Ground Truth review identified **3 Flow(s)** in **SuperNova SWF Enabler** (chrome, extension ID `mhmphnocemakkjdampibehejoaleebpo`, version `0.93`).
The recorded issue type(s): **Extension Storage Poisoning**.

## Affected Extension Details

- Name: SuperNova SWF Enabler
- Platform: chrome
- Extension ID: `mhmphnocemakkjdampibehejoaleebpo`
- Dataset version: `0.93`
- Store version at review: `0.93`
- Users: 500000
- Analysis tools: ExPGuard

## Findings

### Finding 1: Storage Poisoning

The Ground Truth record traces A page or sender able to reach the recorded message/event source from `WINDOW_CUSTOM_EVENT` (window.addEventListener(supernova-message)) in scripts/content at L264:C7 -> L264:C13 to the privileged sink `CHROME_LOCAL_STORAGE` (playedgames) in scripts/content at L37:C12 -> L43:C14. The source scope is on pages matching `https://*/*, http://*/*`. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-43aa3fe19c0266dc`
- Severity recorded by the analysis: **CRITICAL**
- Source: `WINDOW_CUSTOM_EVENT` (window.addEventListener(supernova-message)) in scripts/content at L264:C7 -> L264:C13
- Sink: `CHROME_LOCAL_STORAGE` (playedgames) in scripts/content at L37:C12 -> L43:C14
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Analysis and validation

- Dynamic: no structured dynamic-verification result is attached to this Flow in the Ground Truth dataset.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `0.93` in a disposable chrome profile.
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

- ExPGuard: source report `ExPGuard-Opti/chrome/flow-verification-results-no-duplicate.json`; static report `not recorded`; dynamic report `not recorded`.

### Finding 2: Storage Poisoning

The Ground Truth record traces A page or sender able to reach the recorded message/event source from `WINDOW_CUSTOM_EVENT` (From storage.local.set('playedgames') in scripts/content) in scripts/content at L264:C7 -> L264:C13 to the privileged sink `CHROME_LOCAL_STORAGE` (playedgames) in background at L49:C12 -> L55:C14. The source scope is on pages matching `https://*/*, http://*/*`. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-50c505e25efcc4d3`
- Severity recorded by the analysis: **CRITICAL**
- Source: `WINDOW_CUSTOM_EVENT` (From storage.local.set('playedgames') in scripts/content) in scripts/content at L264:C7 -> L264:C13
- Sink: `CHROME_LOCAL_STORAGE` (playedgames) in background at L49:C12 -> L55:C14
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Analysis and validation

- Static (ExPGuard): verdict `TRUE_POSITIVE`, confidence 0.6; report `extensions/mhmphnocemakkjdampibehejoaleebpo_0.93/static/static_report.json`.
- Dynamic (ExPGuard): `EXTERNAL_CONDITION_REQUIRED` (basis `external_condition_required`); a sender-side precondition was recorded; this is not an unconditional runtime reproduction; report `extensions/mhmphnocemakkjdampibehejoaleebpo_0.93/dynamic/dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `0.93` in a disposable chrome profile.
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

- ExPGuard: source report `ExPGuard-Opti/chrome/flow-verification-results-no-duplicate.json`; static report `extensions/mhmphnocemakkjdampibehejoaleebpo_0.93/static/static_report.json`; dynamic report `extensions/mhmphnocemakkjdampibehejoaleebpo_0.93/dynamic/dynamic_report.json`.

### Finding 3: Storage Poisoning

The Ground Truth record traces A page or sender able to reach the recorded message/event source from `WINDOW_CUSTOM_EVENT` (window.addEventListener(supernova-message)) in scripts/content at L264:C7 -> L264:C13 to the privileged sink `CHROME_SYNC_STORAGE` (playedgames) in scripts/content at L39:C16 -> L42:C18. The source scope is on pages matching `https://*/*, http://*/*`. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-a1b6724f30e1e0f0`
- Severity recorded by the analysis: **CRITICAL**
- Source: `WINDOW_CUSTOM_EVENT` (window.addEventListener(supernova-message)) in scripts/content at L264:C7 -> L264:C13
- Sink: `CHROME_SYNC_STORAGE` (playedgames) in scripts/content at L39:C16 -> L42:C18
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Analysis and validation

- Static (ExPGuard): verdict `TRUE_POSITIVE`, confidence 0.6; report `extensions/mhmphnocemakkjdampibehejoaleebpo_0.93/static/static_report.json`.
- Dynamic (ExPGuard): `CONFIRMED` (basis `runtime_reproduced`); runtime reproduction recorded; report `extensions/mhmphnocemakkjdampibehejoaleebpo_0.93/dynamic/dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `0.93` in a disposable chrome profile.
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

- ExPGuard: source report `ExPGuard-Opti/chrome/flow-verification-results-no-duplicate.json`; static report `extensions/mhmphnocemakkjdampibehejoaleebpo_0.93/static/static_report.json`; dynamic report `extensions/mhmphnocemakkjdampibehejoaleebpo_0.93/dynamic/dynamic_report.json`.


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
