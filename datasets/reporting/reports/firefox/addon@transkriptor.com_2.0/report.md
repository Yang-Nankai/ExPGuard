# Security Vulnerability Report: Medium Extension Storage Poisoning in Transkriptor: Transcribe Audio to Text

## Summary

We are writing on behalf of a security research team from Nankai University and the University of Liverpool. Our Ground Truth review identified **1 Flow(s)** in **Transkriptor: Transcribe Audio to Text** (firefox, extension ID `addon@transkriptor.com`, version `2.0`).

The recorded issue type(s): **Extension Storage Poisoning**.

We reviewed this Firefox extension and identified a storage poisoning Flow where an externally connectable message is written into privileged local storage. The recorded dynamic run required an external sender precondition and did not reproduce the flow, while manual Ground Truth and static analysis flag it as a true positive.

## Affected Extension Details

- Name: Transkriptor: Transcribe Audio to Text
- Platform: firefox
- Extension ID: `addon@transkriptor.com`
- Dataset version: `2.0`
- Store version at review: `2.0`
- Users: 940
- Analysis tools: ExPGuard

## Findings

### Finding 1: Storage Poisoning

Ground Truth Flow gtf-f8fb57c21e645a6a starts at chrome.runtime.onMessageExternal.addListener[message] in background at L6:C5 -> L6:C12, where request.action == "loginUser" is attacker-satisfiable, and reaches chrome.storage.local.set({ userData: { uid, language, email } }) at background L11:C4 -> L15:C6. The externally_connectable host restriction narrows senders to the declared origins, but no sender.id allowlist, sender.origin equality check, or field validation is present, so the recorded issue is that externally supplied uid, email, and language values can be written into extension-owned storage. Manual validation records TP (confirmed_tp, confidence 0.95); static ExPGuard reports TRUE_POSITIVE with confidence 0.6; the dynamic run is EXTERNAL_CONDITION_REQUIRED with reproduced=false, meaning a sender-side precondition is required and the flow was not unconditionally reproduced at runtime. This dynamic outcome does not by itself disprove the statically and manually confirmed flow.
- Ground Truth Flow: `gtf-f8fb57c21e645a6a`
- Severity recorded by the analysis: **MEDIUM**
- Source: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` (chrome.runtime.onMessageExternal.addListener[message]) in background at L6:C5 -> L6:C12
- Sink: `CHROME_LOCAL_STORAGE` (userData) in background at L11:C4 -> L15:C6
- Tools reporting this Flow: ExPGuard

**Source code anchor (excerpt):**

```javascript
endResponse) {
  if(request.action == "loginUse
```

**Sink code anchor (excerpt):**

```javascript
equest.language
    chrome.storage.local.set({ userData: { uid, language, email } }, function() {
      console.log(uid, email, language)
      console.log("Custom value has been stored.")
      sendResponse({ success: true, message: "Successfully saved user login" })
    })
    return true
  }
```

- Privilege boundary recorded: `True` (EXTERNALLY_CONNECTABLE); sink grants capability beyond the source origin

#### Analysis and validation

- Static (ExPGuard): verdict `TRUE_POSITIVE`, confidence 0.6; report `extensions/addon@transkriptor.com_2.0/static/static_report.json`.
- Dynamic (ExPGuard): `EXTERNAL_CONDITION_REQUIRED`; a sender-side precondition was recorded; this is not an unconditional runtime reproduction; report `extensions/addon@transkriptor.com_2.0/dynamic/dynamic_report.json`.
- Manual review: Ground Truth records `TP` — the dataset records manual confirmation that this Flow is reachable and produces its associated privileged effect.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `2.0` in a disposable firefox profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Use only a harmless marker in a disposable profile.
window.postMessage({ marker: "EXPGuard_test_marker" }, "*");
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/firefox/flow-verification-results-no-duplicate.json`; static report `extensions/addon@transkriptor.com_2.0/static/static_report.json`; dynamic report `extensions/addon@transkriptor.com_2.0/dynamic/dynamic_report.json`.


## Recommendations

1. In the chrome.runtime.onMessageExternal listener, validate sender identity before processing: compare sender.id against the expected extension ID(s) and sender.origin against an exact allowlist, rather than relying only on externally_connectable host patterns.
2. Enforce a strict message schema: require request.action to be exactly "loginUser", validate uid, email, and language as expected strings with expected formats, and reject unexpected fields or missing required fields.
3. Do not persist attacker-controlled values directly into privileged extension storage; only write server-validated session data obtained through authenticated backend calls, not from the external message payload.
4. Treat chrome.storage.local writes as sensitive state changes: use a namespaced, allowlisted schema and avoid merging untrusted objects into extension-owned state such as userData.

## Impact

An attacker able to send messages from one of the externally_connectable origins, or to inject script into one, could write attacker-supplied uid, email, and language values into extension storage, potentially altering the extension's stored userData; the recorded evidence does not demonstrate account takeover, data theft, or malware installation.

## Disclosure Status

- Report class: `version_unchanged`
- This report covers only the listed Ground Truth Flow(s). Newly introduced Flow(s) are outside scope.
- Contact discovery: `found` (Mozilla Add-ons API support_email)

Please contact us so that we can coordinate remediation and retest the affected Flow(s).

Regards,
Xin Yang
Nankai University / University of Liverpool
