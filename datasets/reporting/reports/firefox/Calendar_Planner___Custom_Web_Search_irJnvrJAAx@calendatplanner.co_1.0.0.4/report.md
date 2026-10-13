# Security Vulnerability Report: Critical Extension Storage Poisoning in Calendar Planner & Custom Web Search

## Summary

We are writing on behalf of a security research team from Nankai University and the University of Liverpool. Our Ground Truth review identified **1 Flow(s)** in **Calendar Planner & Custom Web Search** (firefox, extension ID `Calendar_Planner___Custom_Web_Search_irJnvrJAAx@calendatplanner.co`, version `1.0.0.4`).
The recorded issue type(s): **Extension Storage Poisoning**.

## Affected Extension Details

- Name: Calendar Planner & Custom Web Search
- Platform: firefox
- Extension ID: `Calendar_Planner___Custom_Web_Search_irJnvrJAAx@calendatplanner.co`
- Dataset version: `1.0.0.4`
- Store version at review: `1.0.0.4`
- Users: 5830
- Analysis tools: CoCo

## Findings

### Finding 1: Storage Poisoning

The Ground Truth record traces A page or sender able to reach the recorded message/event source from `TARGET_CUSTOM_EVENT` to the privileged sink `CHROME_LOCAL_STORAGE`. The source scope is in the recorded source context. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-3bc9a166a8a99ba5`
- Severity recorded by the analysis: **CRITICAL**
- Source: `TARGET_CUSTOM_EVENT`
- Sink: `CHROME_LOCAL_STORAGE`
- Tools reporting this Flow: CoCo

- Privilege boundary recorded: `False` (None); the sink grants a capability beyond the source origin.

#### Analysis and validation

- Dynamic: no structured dynamic-verification result is attached to this Flow in the Ground Truth dataset.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `1.0.0.4` in a disposable firefox profile.
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

- CoCo: source report `CoCo/firefox/flow-verification-results-no-duplicate.json`; static report `not recorded`; dynamic report `not recorded`.


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
