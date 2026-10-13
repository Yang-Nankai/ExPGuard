# Security Vulnerability Report: Critical Privilege Escalation in SpotiAds - Ads remover for Spotify™

## Summary

We are writing on behalf of a security research team from Nankai University and the University of Liverpool. Our Ground Truth review identified **1 Flow(s)** in **SpotiAds - Ads remover for Spotify™** (chrome, extension ID `mghhlojofjipigjobacbjdngmjafdeim`, version `1.2.0`).
The recorded issue type(s): **Privilege Escalation**.

The store currently reports version `1.2.5`. The update revalidation is summarized per tool below. This report covers only the original Flow(s); newly introduced Flow(s) are out of scope. Any mixed result, tool failure, or incomplete automated run is called out explicitly and should not be read as a final remediation determination.

## Affected Extension Details

- Name: SpotiAds - Ads remover for Spotify™
- Platform: chrome
- Extension ID: `mghhlojofjipigjobacbjdngmjafdeim`
- Dataset version: `1.2.0`
- Store version at review: `1.2.5`
- Users: 80000
- Analysis tools: CoCo, ExPGuard

## Findings

### Finding 1: Privilege Escalation

The Ground Truth record traces A page or sender able to reach the recorded message/event source from `TARGET_CUSTOM_EVENT` (target.addEventListener(updateCounter)) in content_script at L154:C34 -> L154:C42 to the privileged sink `CHROME_ACTION_BADGE_OPTIONS` in background at L9:C3 -> L9:C75. The source scope is on pages matching `https://open.spotify.com/*`. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-66eaf48d13217ecf`
- Severity recorded by the analysis: **CRITICAL**
- Source: `TARGET_CUSTOM_EVENT` (target.addEventListener(updateCounter)) in content_script at L154:C34 -> L154:C42
- Sink: `CHROME_ACTION_BADGE_OPTIONS` in background at L9:C3 -> L9:C75
- Tools reporting this Flow: ExPGuard, CoCo

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Updated-version tool result

- ExPGuard: `still_detected`; original source `TARGET_CUSTOM_EVENT` → sink `CHROME_ACTION_BADGE_OPTIONS`; candidate matches: 1
- CoCo: `disappeared`; original source `TARGET_CUSTOM_EVENT` → sink `CHROME_ACTION_BADGE_OPTIONS`; candidate matches: 0

#### Analysis and validation

- Static (ExPGuard): verdict `FALSE_POSITIVE`, confidence 0.6; report `extensions/mghhlojofjipigjobacbjdngmjafdeim_1.2.0/static/static_report.json`.
- Dynamic (ExPGuard): `INCONCLUSIVE_AFTER_DEBUG` (basis `inconclusive`); the dynamic run did not establish a decisive runtime result; report `extensions/mghhlojofjipigjobacbjdngmjafdeim_1.2.0/dynamic/dynamic_report.json`.
- Static (CoCo): verdict `TRUE_POSITIVE`, confidence 0.6; report `extensions/mghhlojofjipigjobacbjdngmjafdeim_1.2.0/static/static_report.json`.
- Dynamic (CoCo): `INCONCLUSIVE_AFTER_DEBUG` (basis `runtime_or_static_dynamic_evidence`); the dynamic agent exceeded its 30-second budget, so this run did not establish a decisive runtime result; report `extensions/mghhlojofjipigjobacbjdngmjafdeim_1.2.0/dynamic/dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `1.2.0` in a disposable chrome profile.
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

- ExPGuard: source report `ExPGuard-Opti/chrome/flow-verification-results-no-duplicate.json`; static report `extensions/mghhlojofjipigjobacbjdngmjafdeim_1.2.0/static/static_report.json`; dynamic report `extensions/mghhlojofjipigjobacbjdngmjafdeim_1.2.0/dynamic/dynamic_report.json`.
- CoCo: source report `CoCo/chrome/flow-verification-results-no-duplicate.json`; static report `extensions/mghhlojofjipigjobacbjdngmjafdeim_1.2.0/static/static_report.json`; dynamic report `extensions/mghhlojofjipigjobacbjdngmjafdeim_1.2.0/dynamic/dynamic_report.json`.


## Recommendations

1. Reduce host permissions and sensitive API access to the smallest scope required by the feature.

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
