# Security Vulnerability Report: Medium Unauthorized Cookie Modification in OceanHero: Save Our Oceans by Surfing the Web

## Summary

We are writing on behalf of a security research team from Nankai University and the University of Liverpool. Our Ground Truth review identified **1 Flow(s)** in **OceanHero: Save Our Oceans by Surfing the Web** (firefox, extension ID `extension@oceanhero.today`, version `10.7`).

The recorded issue type(s): **Unauthorized Cookie Modification**.

Ground Truth review of version 10.7 identified one Flow in which an externally connectable message source reaches a privileged cookie-write sink in the background script. The recorded issue is Unauthorized Cookie Modification: an externally delivered message can drive chrome.cookies.set for the shellsCounter cookie without sender validation.

## Affected Extension Details

- Name: OceanHero: Save Our Oceans by Surfing the Web
- Platform: firefox
- Extension ID: `extension@oceanhero.today`
- Dataset version: `10.7`
- Store version at review: `10.7`
- Users: 1558
- Analysis tools: ExPGuard

## Findings

### Finding 1: Unauthorized Cookie Manipulation

The recorded flow runs from chrome.runtime.onMessageExternal.addListener in the background script to chrome.cookies.set({url:"https://oceanhero.today", name:"shellsCounter", ...}). Because the extension declares externally_connectable for https://oceanhero.today/* and the listener performs no sender.id or sender.origin check, a message whose type field is "addShells" and whose amount field is sender-controlled reaches the cookie write; the e.type gate is an attacker-chosen message field rather than a trust anchor. Static analysis recorded TRUE_POSITIVE at confidence 0.6 and manual review recorded TP (confirmed_tp, confidence 0.95), confirming the Flow is reachable and produces its privileged effect. The dynamic run reported EXTERNAL_CONDITION_REQUIRED with reproduced=false because a matching controlled sender page is a precondition, so no unconditional runtime reproduction was recorded; this inconclusive dynamic result does not contradict the static and manual verdicts.
- Ground Truth Flow: `gtf-30d0a40f000a4f09`
- Severity recorded by the analysis: **MEDIUM**
- Source: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` (chrome.runtime.onMessageExternal.addListener[message]) in background at L1:C7234 -> L1:C7235
- Sink: `CHROME_COOKIES_SET_OPTIONS` in background at L1:C7093 -> L1:C7195
- Tools reporting this Flow: ExPGuard

**Source code anchor (excerpt):**

```javascript
xFocus"===e.type?(f=e.payload,r({success:
```

**Sink code anchor (excerpt):**

```javascript
parseInt(t.value):0;chrome.cookies.set({url:"https://oceanhero.today",name:"shellsCounter",value:(r+e.amount).toString()})})),"setNtpSearchBox
```

- Privilege boundary recorded: `True` (EXTERNALLY_CONNECTABLE); sink grants capability beyond the source origin

#### Analysis and validation

- Static (ExPGuard): verdict `TRUE_POSITIVE`, confidence 0.6; report `extensions/extension@oceanhero.today_10.7/static/static_report.json`.
- Dynamic (ExPGuard): `EXTERNAL_CONDITION_REQUIRED`; a sender-side precondition was recorded; this is not an unconditional runtime reproduction; report `extensions/extension@oceanhero.today_10.7/dynamic/dynamic_report.json`.
- Manual review: Ground Truth records `TP` — the dataset records manual confirmation that this Flow is reachable and produces its associated privileged effect.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `10.7` in a disposable firefox profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```javascript
chrome.runtime.sendMessage(
  "extension@oceanhero.today",
  { type: "addShells", amount: 1337 },
  response => console.log("OceanHero response:", response)
);
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/firefox/flow-verification-results-no-duplicate.json`; static report `extensions/extension@oceanhero.today_10.7/static/static_report.json`; dynamic report `extensions/extension@oceanhero.today_10.7/dynamic/dynamic_report.json`.


## Recommendations

1. Validate the external sender before acting on any message: check sender.id/sender.origin against a strict allowlist in the onMessageExternal listener rather than relying on the e.type value as a trust anchor.
2. Treat the amount field as untrusted input: parse it strictly, reject non-integers and out-of-range or negative values, and clamp it before arithmetic and before passing it to chrome.cookies.set.
3. Constrain the cookie write to the minimum required scope (exact url, cookie name, path, and expiry) and avoid writing values derived from page-supplied content.
4. Consider removing externally_connectable exposure for this functionality or moving the shells-counter update to an internal, extension-initiated channel so external pages cannot reach the privileged cookie API.

## Impact

An externally connectable sender page can make the extension's background context write the shellsCounter cookie on oceanhero.today without sender authentication, altering persisted extension state within the scope of that single cookie write; no runtime reproduction, account compromise, or broader data access is claimed.

## Disclosure Status

- Report class: `version_unchanged`
- This report covers only the listed Ground Truth Flow(s). Newly introduced Flow(s) are outside scope.
- Contact discovery: `found` (Mozilla Add-ons API support_email)

Please contact us so that we can coordinate remediation and retest the affected Flow(s).

Regards,
Xin Yang
Nankai University / University of Liverpool
