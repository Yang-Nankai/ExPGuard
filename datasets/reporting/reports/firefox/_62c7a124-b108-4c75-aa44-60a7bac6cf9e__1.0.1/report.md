# Security Vulnerability Report: Medium Unauthorized Tab/Window Control in Netflix Party

## Summary

We are writing on behalf of a security research team from Nankai University and the University of Liverpool. Our Ground Truth review identified **1 Flow(s)** in **Netflix Party** (firefox, extension ID `{62c7a124-b108-4c75-aa44-60a7bac6cf9e}`, version `1.0.1`).
The recorded issue type(s): **Unauthorized Tab/Window Control**.

## Affected Extension Details

- Name: Netflix Party
- Platform: firefox
- Extension ID: `{62c7a124-b108-4c75-aa44-60a7bac6cf9e}`
- Dataset version: `1.0.1`
- Store version at review: `1.0.1`
- Users: 2826
- Analysis tools: ExPGuard

## Findings

### Finding 1: Unauthorized Tab or Window Manipulation

The Ground Truth record traces A page or sender able to reach the recorded message/event source from `WINDOW_CUSTOM_EVENT` (window.addEventListener(PassToBackground)) in content/index at L1:C1568 -> L1:C7970 to the privileged sink `CHROME_TABS_CREATE_OPTIONS` in background at L1:C2516 -> L1:C2726. The source scope is on pages matching `https://www.netflix.com/*, http://www.netflix.com/*`. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-48af02534b5613a3`
- Severity recorded by the analysis: **MEDIUM**
- Source: `WINDOW_CUSTOM_EVENT` (window.addEventListener(PassToBackground)) in content/index at L1:C1568 -> L1:C7970
- Sink: `CHROME_TABS_CREATE_OPTIONS` in background at L1:C2516 -> L1:C2726
- Tools reporting this Flow: ExPGuard

**Sink code anchor (excerpt):**

```javascript
igin,"/"):i.homeAff;chrome.tabs.create({url:d,pinned:!0,active:!1,index:0},(function(e){chrome.tabs.onUpdated.addListener((function(t,o){"complete"===o.status&&t===e.id&&setTimeout((function(){chrome.tabs.remove(e.id)}),3e3)}))}))}}catch(e){}else"rem
```

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Analysis and validation

- Static (ExPGuard): verdict `TRUE_POSITIVE`, confidence 0.6; report `extensions/{62c7a124-b108-4c75-aa44-60a7bac6cf9e}_1.0.1/static/static_report.json`.
- Dynamic (ExPGuard): `SINK_NOT_FIRED`; the recorded replay did not establish the complete source-to-sink effect; report `extensions/{62c7a124-b108-4c75-aa44-60a7bac6cf9e}_1.0.1/dynamic/dynamic_report.json`.
- Manual review: Ground Truth records `TP` — the dataset records manual confirmation that this Flow is reachable and produces its associated privileged effect.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `1.0.1` in a disposable firefox profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```javascript
const event = new CustomEvent("PassToBackground");
event.detail = {
  extensionId: "e175530852fd42fbb",
  action: "openTab",
  store: {
    type: "other",
    sources: ["http://127.0.0.1:8765/expguard"],
    clicked: true
  }
};
window.dispatchEvent(event);
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/firefox/flow-verification-results-no-duplicate.json`; static report `extensions/{62c7a124-b108-4c75-aa44-60a7bac6cf9e}_1.0.1/static/static_report.json`; dynamic report `extensions/{62c7a124-b108-4c75-aa44-60a7bac6cf9e}_1.0.1/dynamic/dynamic_report.json`.


## Recommendations

1. Validate tab/window IDs and navigation targets, and require a user gesture for externally initiated changes.
2. Reduce host permissions and sensitive API access to the smallest scope required by the feature.

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
