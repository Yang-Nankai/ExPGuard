# Security Vulnerability Report: Critical CSRF via Privileged Network Request in Frame

## Summary

We are writing on behalf of a security research team from Nankai University and the University of Liverpool. Our Ground Truth review identified **1 Flow(s)** in **Frame** (firefox, extension ID `{77691beb-4c53-48de-ab20-6589a537717a}`, version `0.12.1`).
The recorded issue type(s): **CSRF via Privileged Network Request**.

## Affected Extension Details

- Name: Frame
- Platform: firefox
- Extension ID: `{77691beb-4c53-48de-ab20-6589a537717a}`
- Dataset version: `0.12.1`
- Store version at review: `0.12.1`
- Users: 583
- Analysis tools: ExPGuard

## Findings

### Finding 1: Cross-Site Request Forgery (CSRF) / Privileged Network Request

The Ground Truth record traces A page or sender able to reach the recorded message/event source from `WINDOW_MESSAGE_EVENT` (window.addEventListener(message)) in inject at L18:C10 -> L18:C47 to the privileged sink `FETCH_RESOURCE` ([Unknown URL]) in index at L1:C37278 -> L1:C37290. The source scope is on pages matching `file://*/*, http://*/*, https://*/*`. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-6cac8d83cdef705a`
- Severity recorded by the analysis: **CRITICAL**
- Source: `WINDOW_MESSAGE_EVENT` (window.addEventListener(message)) in inject at L18:C10 -> L18:C47
- Sink: `FETCH_RESOURCE` ([Unknown URL]) in index at L1:C37278 -> L1:C37290
- Tools reporting this Flow: ExPGuard

**Source code anchor (excerpt):**

```javascript
connection.once("error",(e=>this.onError(e))),this.connection.once("close",((
```

**Sink code anchor (excerpt):**

```javascript
n;try{const i=await fetch(r.src),s=await i.blob(),o=
```

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Analysis and validation

- Static (ExPGuard): verdict `TRUE_POSITIVE`, confidence 0.6; report `extensions/{77691beb-4c53-48de-ab20-6589a537717a}_0.12.1/static/static_report.json`.
- Dynamic (ExPGuard): `SINK_NOT_FIRED`; the recorded replay did not establish the complete source-to-sink effect; report `extensions/{77691beb-4c53-48de-ab20-6589a537717a}_0.12.1/dynamic/dynamic_report.json`.
- Manual review: Ground Truth records `TP` — the dataset records manual confirmation that this Flow is reachable and produces its associated privileged effect.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `0.12.1` in a disposable firefox profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```javascript
window.postMessage({
  type: "eth:send",
  payload: {
    method: "media_blob",
    src: "http://127.0.0.1:8765/expguard.bin",
    location: "EXPAGENT_FRAME"
  }
}, "*");
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/firefox/flow-verification-results-no-duplicate.json`; static report `extensions/{77691beb-4c53-48de-ab20-6589a537717a}_0.12.1/static/static_report.json`; dynamic report `extensions/{77691beb-4c53-48de-ab20-6589a537717a}_0.12.1/dynamic/dynamic_report.json`.


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
