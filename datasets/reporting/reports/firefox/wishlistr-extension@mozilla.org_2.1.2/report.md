# Security Vulnerability Report: High Extension Storage Poisoning in Add to Wishlistr

## Summary

We are writing on behalf of a security research team from Nankai University and the University of Liverpool. Our Ground Truth review identified **1 Flow(s)** in **Add to Wishlistr** (firefox, extension ID `wishlistr-extension@mozilla.org`, version `2.1.2`).
The recorded issue type(s): **Extension Storage Poisoning**.

## Affected Extension Details

- Name: Add to Wishlistr
- Platform: firefox
- Extension ID: `wishlistr-extension@mozilla.org`
- Dataset version: `2.1.2`
- Store version at review: `2.1.2`
- Users: 432
- Analysis tools: ExPGuard

## Findings

### Finding 1: Storage Poisoning

The Ground Truth record traces A page or sender able to reach the recorded message/event source from `WINDOW_MESSAGE_EVENT` (window.addEventListener(message)) in settings-listener at L14:C6 -> L14:C21 to the privileged sink `CHROME_SYNC_STORAGE` (accounts) in background at L153:C2 -> L157:C4. The source scope is on pages matching `https://*.wishlistr.com/home/, https://*.wishlistr.com/your-list/, https://*.wishlistr.com/your-list/settings/`. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-d5b1ef51bb9a6300`
- Severity recorded by the analysis: **HIGH**
- Source: `WINDOW_MESSAGE_EVENT` (window.addEventListener(message)) in settings-listener at L14:C6 -> L14:C21
- Sink: `CHROME_SYNC_STORAGE` (accounts) in background at L153:C2 -> L157:C4
- Tools reporting this Flow: ExPGuard

**Source code anchor (excerpt):**

```javascript
ge.sync) { // Opera does not support sync
  chrome.stor
```

**Sink code anchor (excerpt):**

```javascript
rrentAccount: 0};
  chrome.storage.sync.set(storageData, function() {
    if (callback) {
      callback();
    }
  });
}

function getAcc
```

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Analysis and validation

- Static (ExPGuard): verdict `TRUE_POSITIVE`, confidence 0.6; report `extensions/wishlistr-extension@mozilla.org_2.1.2/static/static_report.json`.
- Dynamic (ExPGuard): `INCONCLUSIVE_AFTER_DEBUG`; the dynamic agent exceeded its 30-second budget, so this run did not establish a decisive runtime result; report `extensions/wishlistr-extension@mozilla.org_2.1.2/dynamic/dynamic_report.json`.
- Manual review: Ground Truth records `TP` — the dataset records manual confirmation that this Flow is reachable and produces its associated privileged effect.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `2.1.2` in a disposable firefox profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Use only a harmless marker in a disposable profile.
window.postMessage({ marker: "EXPGuard_test_marker" }, "*");
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/firefox/flow-verification-results-no-duplicate.json`; static report `extensions/wishlistr-extension@mozilla.org_2.1.2/static/static_report.json`; dynamic report `extensions/wishlistr-extension@mozilla.org_2.1.2/dynamic/dynamic_report.json`.


## Recommendations

1. Do not let page-controlled cookies or DOM values select extension-owned storage values; validate the expected value and keep credentials in extension-owned UI/state.
2. Treat storage writes as privileged state changes: use an allowlisted schema, reject attacker-controlled keys, and avoid merging untrusted objects into extension state.
3. Reduce host permissions and sensitive API access to the smallest scope required by the feature.

## Impact

The demonstrated impact is limited to the operation described in each finding and the extension's granted permissions. The evidence above distinguishes the recorded static path from any runtime result; it does not imply unrelated account compromise, data theft, or malware installation.

## Disclosure Status

- Report class: `version_unchanged`
- This report covers only the listed Ground Truth Flow(s). Newly introduced Flow(s) are outside scope.
- Contact discovery: `found` (Mozilla Add-ons API support_email)

Please contact us so that we can coordinate remediation and retest the affected Flow(s).

Regards,
Xin Yang
Nankai University / University of Liverpool
