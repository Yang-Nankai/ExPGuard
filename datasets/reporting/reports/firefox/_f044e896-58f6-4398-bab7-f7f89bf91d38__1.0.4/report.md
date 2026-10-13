# Security Vulnerability Report: Critical Extension Storage Poisoning in Seedr

## Summary

We are writing on behalf of a security research team from Nankai University and the University of Liverpool. Our Ground Truth review identified **2 Flow(s)** in **Seedr** (firefox, extension ID `{f044e896-58f6-4398-bab7-f7f89bf91d38}`, version `1.0.4`).
The recorded issue type(s): **Extension Storage Poisoning**.

## Affected Extension Details

- Name: Seedr
- Platform: firefox
- Extension ID: `{f044e896-58f6-4398-bab7-f7f89bf91d38}`
- Dataset version: `1.0.4`
- Store version at review: `1.0.4`
- Users: 976
- Analysis tools: ExPGuard

## Findings

### Finding 1: Storage Poisoning

The Ground Truth record traces An external extension able to message this extension from `CHROME_ONMESSAGEEXTERNAL_MESSAGE` (chrome.runtime.onMessageExternal.addListener[message]) in background at L593:C26 -> L593:C33 to the privileged sink `CHROME_LOCAL_STORAGE` (access_token) in background at L21:C5 -> L28:C7. The source scope is in the recorded source context. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-bccc0ffd32f0a680`
- Severity recorded by the analysis: **CRITICAL**
- Source: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` (chrome.runtime.onMessageExternal.addListener[message]) in background at L593:C26 -> L593:C33
- Sink: `CHROME_LOCAL_STORAGE` (access_token) in background at L21:C5 -> L28:C7
- Tools reporting this Flow: ExPGuard

**Source code anchor (excerpt):**

```javascript
  external_listener(request, sender, sendRespon
```

**Sink code anchor (excerpt):**

```javascript
Interval(() => {
        chrome.runtime.sendMessage({type: 'keep_alive'});
        keepAlive()
    }, 1000 * 25);
}
function stopKeepAlive() {
    clearInterval(keepAliveInstance);
}

// Listener for download events
const download_listener = async (item, suggest) => {
   
```

- Privilege boundary recorded: `True` (EXTERNALLY_CONNECTABLE); sink grants capability beyond the source origin

#### Analysis and validation

- Dynamic: no structured dynamic-verification result is attached to this Flow in the Ground Truth dataset.
- Manual review: Ground Truth records `TP` — the dataset records manual confirmation that this Flow is reachable and produces its associated privileged effect.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `1.0.4` in a disposable firefox profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```javascript
await send("{f044e896-58f6-4398-bab7-f7f89bf91d38}", {
  func: "login",
  username: "EXPAGENT_USER",
  access_token: "EXPAGENT_ACCESS",
  refresh_token: "EXPAGENT_REFRESH"
});
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/firefox/flow-verification-results-no-duplicate.json`; static report `not recorded`; dynamic report `not recorded`.

### Finding 2: Storage Poisoning

The Ground Truth record traces An external extension able to message this extension from `CHROME_ONMESSAGEEXTERNAL_MESSAGE` (chrome.runtime.onMessageExternal.addListener[message]) in background at L598:C26 -> L598:C33 to the privileged sink `CHROME_LOCAL_STORAGE` (access_token) in background at L21:C5 -> L28:C7. The source scope is in the recorded source context. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-fd6a307c094b0487`
- Severity recorded by the analysis: **CRITICAL**
- Source: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` (chrome.runtime.onMessageExternal.addListener[message]) in background at L598:C26 -> L598:C33
- Sink: `CHROME_LOCAL_STORAGE` (access_token) in background at L21:C5 -> L28:C7
- Tools reporting this Flow: ExPGuard

**Source code anchor (excerpt):**

```javascript
  external_listener(request, sender, sendRespon
```

**Sink code anchor (excerpt):**

```javascript
Interval(() => {
        chrome.runtime.sendMessage({type: 'keep_alive'});
        keepAlive()
    }, 1000 * 25);
}
function stopKeepAlive() {
    clearInterval(keepAliveInstance);
}

// Listener for download events
const download_listener = async (item, suggest) => {
   
```

- Privilege boundary recorded: `True` (EXTERNALLY_CONNECTABLE); sink grants capability beyond the source origin

#### Analysis and validation

- Dynamic: no structured dynamic-verification result is attached to this Flow in the Ground Truth dataset.
- Manual review: Ground Truth records `TP` — the dataset records manual confirmation that this Flow is reachable and produces its associated privileged effect.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `1.0.4` in a disposable firefox profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```javascript
await send("{f044e896-58f6-4398-bab7-f7f89bf91d38}", { action: "EXPAGENT_TRIGGER", marker: "EXPAGENT_7_F005" });
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/firefox/flow-verification-results-no-duplicate.json`; static report `not recorded`; dynamic report `not recorded`.


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
