# Security Vulnerability Report: Critical CSRF via Privileged Network Request in Scam Blocker

## Summary

We are writing on behalf of a security research team from Nankai University and the University of Liverpool. Our Ground Truth review identified **1 Flow(s)** in **Scam Blocker** (firefox, extension ID `scamblocker_extensiondevelopers@pcmatic.com`, version `1.20`).
The recorded issue type(s): **CSRF via Privileged Network Request**.

## Affected Extension Details

- Name: Scam Blocker
- Platform: firefox
- Extension ID: `scamblocker_extensiondevelopers@pcmatic.com`
- Dataset version: `1.20`
- Store version at review: `1.20`
- Users: 1391
- Analysis tools: ExPGuard

## Findings

### Finding 1: Cross-Site Request Forgery (CSRF) / Privileged Network Request

A script running on a page matching `http://*/*, https://*/*` can dispatch the recorded DOM custom event and supply its `detail`. The content script forwards that event data to the extension runtime, and the service worker uses the supplied URL and form data in a privileged POST `fetch`. The report records no origin/authentication check at this bridge. This permits a matching page to initiate the recorded request; it does not by itself establish that third-party credentials are included.

- Ground Truth Flow: `gtf-2b4c53cd99ee2474`
- Severity recorded by the analysis: **CRITICAL**
- Source: `TARGET_CUSTOM_EVENT` (target.addEventListener(contentEvent)) in override at L18:C5 -> L18:C17
- Sink: `FETCH_RESOURCE` ([Unknown URL]) in service-worker at L20:C31 -> L26:C11
- Tools reporting this Flow: ExPGuard

**Source code anchor (excerpt):**

```javascript
nse(message);
       } catch(error) {
        messag
```

**Sink code anchor (excerpt):**

```javascript
st response = await fetch(message.url, {
         method: 'POST',
         headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: body
         });
         const dat
```

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Analysis and validation

- Static (ExPGuard): verdict `TRUE_POSITIVE`, confidence 0.6; report `extensions/scamblocker_extensiondevelopers@pcmatic.com_1.20/static/static_report.json`.
- Dynamic (ExPGuard): `INCONCLUSIVE_AFTER_DEBUG`; the dynamic agent exceeded its 30-second budget, so this run did not establish a decisive runtime result; report `extensions/scamblocker_extensiondevelopers@pcmatic.com_1.20/dynamic/dynamic_report.json`.
- Manual review: Ground Truth records `TP` — the dataset records manual confirmation that this Flow is reachable and produces its associated privileged effect.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install version `1.20` in a disposable firefox profile and open any HTTP(S) page covered by the extension content script.
2. Start a local test server bound only to `127.0.0.1` that records POST requests, then run the payload below in that page's console.
3. Verify whether the local server receives the marker POST; do not substitute a third-party or internal-network URL.

#### Proof-of-concept payload

```javascript
document.dispatchEvent(new CustomEvent("contentEvent", {
  detail: {
    type: "serviceworker",
    callingFunc: "isMalicious",
    url: "http://127.0.0.1:8765/expguard",
    form: { marker: "EXPAGENT_SCAMBLOCKER" }
  }
}));
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/firefox/flow-verification-results-no-duplicate.json`; static report `extensions/scamblocker_extensiondevelopers@pcmatic.com_1.20/static/static_report.json`; dynamic report `extensions/scamblocker_extensiondevelopers@pcmatic.com_1.20/dynamic/dynamic_report.json`.


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
