# Security Vulnerability Report: Critical Unauthorized Tab/Window Control in OCR - Image Reader

## Summary

We are writing on behalf of a security research team from Nankai University and the University of Liverpool. Our Ground Truth review identified **1 Flow(s)** in **OCR - Image Reader** (firefox, extension ID `{e4c6eef1-8b3b-4daa-8757-707702e7528d}`, version `0.5.2`).
The recorded issue type(s): **Unauthorized Tab/Window Control**.

The store currently reports version `0.5.3`. The update revalidation is summarized per tool below. This report covers only the original Flow(s); newly introduced Flow(s) are out of scope. Any mixed result, tool failure, or incomplete automated run is called out explicitly and should not be read as a final remediation determination.

## Affected Extension Details

- Name: OCR - Image Reader
- Platform: firefox
- Extension ID: `{e4c6eef1-8b3b-4daa-8757-707702e7528d}`
- Dataset version: `0.5.2`
- Store version at review: `0.5.3`
- Users: 8258
- Analysis tools: ExPGuard

## Findings

### Finding 1: Unauthorized Tab or Window Manipulation

The Ground Truth record traces A page or sender able to reach the recorded message/event source from `CHROME_ONCONNECTEXTERNAL_ONMESSAGE` (chrome.runtime.onConnectExternal.addListener[onMessage]) in worker at L349:C16 -> L349:C23 to the privileged sink `CHROME_WINDOWS_CREATE_OPTIONS` in worker at L188:C20 -> L193:C4. The source scope is in the recorded source context. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-2ade91d8b85a56c0`
- Severity recorded by the analysis: **CRITICAL**
- Source: `CHROME_ONCONNECTEXTERNAL_ONMESSAGE` (chrome.runtime.onConnectExternal.addListener[onMessage]) in worker at L349:C16 -> L349:C23
- Sink: `CHROME_WINDOWS_CREATE_OPTIONS` in worker at L188:C20 -> L193:C4
- Tools reporting this Flow: ExPGuard

**Source code anchor (excerpt):**

```javascript
> {
    console.log(request);

    if (request.
```

**Sink code anchor (excerpt):**

```javascript
  const win = await chrome.windows.create({
    url: '/data/blank/index.html?' + args.toString(),
    width: 600,
    height: 600,
    type: 'popup'
  });
  internals.set(wi
```

- Privilege boundary recorded: `True` (EXTERNALLY_CONNECTABLE); sink grants capability beyond the source origin

#### Updated-version tool result

- ExPGuard: `still_detected`; original source `CHROME_ONCONNECTEXTERNAL_ONMESSAGE` → sink `CHROME_WINDOWS_CREATE_OPTIONS`; candidate matches: 1

#### Analysis and validation

- Static (ExPGuard): verdict `TRUE_POSITIVE`, confidence 0.6; report `extensions/{e4c6eef1-8b3b-4daa-8757-707702e7528d}_0.5.2/static/static_report.json`.
- Dynamic (ExPGuard): `DEFERRED_COMPANION_EXTENSION`; this result does not independently confirm execution at the sink; report `extensions/{e4c6eef1-8b3b-4daa-8757-707702e7528d}_0.5.2/dynamic/dynamic_report.json`.
- Manual review: Ground Truth records `TP` — the dataset records manual confirmation that this Flow is reachable and produces its associated privileged effect.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `0.5.2` in a disposable firefox profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```javascript
const port = browser.runtime.connect("{e4c6eef1-8b3b-4daa-8757-707702e7528d}", {
  name: "expguard"
});
port.onMessage.addListener(message => console.log("OCR message:", message));
port.postMessage({
  cmd: "request-ocr",
  proceed: true,
  selector: false,
  title: "EXPAGENT_OCR_TITLE",
  message: "EXPAGENT_OCR_MESSAGE"
});
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/firefox/flow-verification-results-no-duplicate.json`; static report `extensions/{e4c6eef1-8b3b-4daa-8757-707702e7528d}_0.5.2/static/static_report.json`; dynamic report `extensions/{e4c6eef1-8b3b-4daa-8757-707702e7528d}_0.5.2/dynamic/dynamic_report.json`.


## Recommendations

1. Validate tab/window IDs and navigation targets, and require a user gesture for externally initiated changes.
2. Reduce host permissions and sensitive API access to the smallest scope required by the feature.

## Impact

The demonstrated impact is limited to the operation described in each finding and the extension's granted permissions. The evidence above distinguishes the recorded static path from any runtime result; it does not imply unrelated account compromise, data theft, or malware installation.

## Disclosure Status

- Report class: `updated_still_detected`
- This report covers only the listed Ground Truth Flow(s). Newly introduced Flow(s) are outside scope.
- Contact discovery: `missing` (No reliable public email found)

Please contact us so that we can coordinate remediation and retest the affected Flow(s).

Regards,
Xin Yang
Nankai University / University of Liverpool
