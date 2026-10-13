# Security Vulnerability Report: Critical Extension Storage Poisoning in Video Speed Controller

## Summary

We are writing on behalf of a security research team from Nankai University and the University of Liverpool. Our Ground Truth review identified **1 Flow(s)** in **Video Speed Controller** (firefox, extension ID `{2971e636-064f-4b47-9338-a9b64e6b037e}`, version `0.9.5`).
The recorded issue type(s): **Extension Storage Poisoning**.

## Affected Extension Details

- Name: Video Speed Controller
- Platform: firefox
- Extension ID: `{2971e636-064f-4b47-9338-a9b64e6b037e}`
- Dataset version: `0.9.5`
- Store version at review: `0.9.5`
- Users: 651
- Analysis tools: ExPGuard

## Findings

### Finding 1: Storage Poisoning

The Ground Truth record traces A page or sender able to reach the recorded message/event source from `WINDOW_MESSAGE_EVENT` (window.addEventListener(message)) in content at L20:C38 -> L20:C56 to the privileged sink `CHROME_SYNC_STORAGE` (storage.fuzzy.settings) in content at L26:C10 -> L26:C39. The source scope is on pages matching `http://*/*, https://*/*, file:///*`. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-a3c68cd97971c3c9`
- Severity recorded by the analysis: **CRITICAL**
- Source: `WINDOW_MESSAGE_EVENT` (window.addEventListener(message)) in content at L20:C38 -> L20:C56
- Sink: `CHROME_SYNC_STORAGE` (storage.fuzzy.settings) in content at L26:C10 -> L26:C39
- Tools reporting this Flow: ExPGuard

**Source code anchor (excerpt):**

```javascript
urce !== window || !event.data?.source?.startsWith("vsc-")
```

**Sink code anchor (excerpt):**

```javascript
pdate") {
          chrome.storage.sync.set(data);
        } else if 
```

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Analysis and validation

- Static (ExPGuard): verdict `TRUE_POSITIVE`, confidence 0.6; report `extensions/{2971e636-064f-4b47-9338-a9b64e6b037e}_0.9.5/static/static_report.json`.
- Dynamic (ExPGuard): `INCONCLUSIVE_AFTER_DEBUG`; the dynamic agent exceeded its 30-second budget, so this run did not establish a decisive runtime result; report `extensions/{2971e636-064f-4b47-9338-a9b64e6b037e}_0.9.5/dynamic/dynamic_report.json`.
- Manual review: Ground Truth records `TP` — the dataset records manual confirmation that this Flow is reachable and produces its associated privileged effect.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `0.9.5` in a disposable firefox profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Use only a harmless marker in a disposable profile.
window.postMessage({ marker: "EXPGuard_test_marker" }, "*");
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/firefox/flow-verification-results-no-duplicate.json`; static report `extensions/{2971e636-064f-4b47-9338-a9b64e6b037e}_0.9.5/static/static_report.json`; dynamic report `extensions/{2971e636-064f-4b47-9338-a9b64e6b037e}_0.9.5/dynamic/dynamic_report.json`.


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
