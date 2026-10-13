# Security Vulnerability Report: Medium CSRF via Privileged Network Request in DeepShare(DeepSeek对话截图分享)

## Summary

We are writing on behalf of a security research team from Nankai University and the University of Liverpool. Our Ground Truth review identified **1 Flow(s)** in **DeepShare(DeepSeek对话截图分享)** (firefox, extension ID `yurui0216@gmail.com`, version `1.3.0`).
The recorded issue type(s): **CSRF via Privileged Network Request**.

## Affected Extension Details

- Name: DeepShare(DeepSeek对话截图分享)
- Platform: firefox
- Extension ID: `yurui0216@gmail.com`
- Dataset version: `1.3.0`
- Store version at review: `1.3.0`
- Users: 400
- Analysis tools: ExPGuard

## Findings

### Finding 1: Cross-Site Request Forgery (CSRF) / Privileged Network Request

The Ground Truth record traces A page or sender able to reach the recorded message/event source from `TARGET_CUSTOM_EVENT` (target.addEventListener(deepshare:convertToDocx)) in scripts/docxConverter at L12:C24 -> L12:C36 to the privileged sink `FETCH_BODY` ([Unknown URL]) in background at L35:C31 -> L39:C10. The source scope is on pages matching `https://chat.deepseek.com/*`. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-5b61056d5b38ec0a`
- Severity recorded by the analysis: **MEDIUM**
- Source: `TARGET_CUSTOM_EVENT` (target.addEventListener(deepshare:convertToDocx)) in scripts/docxConverter at L12:C24 -> L12:C36
- Sink: `FETCH_BODY` ([Unknown URL]) in background at L35:C31 -> L39:C10
- Tools reporting this Flow: ExPGuard

**Source code anchor (excerpt):**

```javascript
p: 'popup/popup.html?action=apiKeyMissing' });

    
```

**Sink code anchor (excerpt):**

```javascript
st response = await fetch(request.url, {
            method: request.method,
            headers: request.headers,
            body: request.body
        });

        if (!resp
```

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Analysis and validation

- Static (ExPGuard): verdict `TRUE_POSITIVE`, confidence 0.6; report `extensions/yurui0216@gmail.com_1.3.0/static/static_report.json`.
- Dynamic (ExPGuard): `TOOL_LIMITATION`; this result does not independently confirm execution at the sink; report `extensions/yurui0216@gmail.com_1.3.0/dynamic/dynamic_report.json`.
- Manual review: Ground Truth records `TP` — the dataset records manual confirmation that this Flow is reachable and produces its associated privileged effect.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `1.3.0` in a disposable firefox profile.
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

- ExPGuard: source report `ExPGuard-Opti/firefox/flow-verification-results-no-duplicate.json`; static report `extensions/yurui0216@gmail.com_1.3.0/static/static_report.json`; dynamic report `extensions/yurui0216@gmail.com_1.3.0/dynamic/dynamic_report.json`.


## Recommendations

1. Authenticate page-to-extension events at the privilege boundary; validate the sender and origin instead of trusting DOM event detail.
2. Validate the request schema and restrict destination URLs, methods, headers, and bodies before issuing privileged network requests.
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
