# Security Vulnerability Report: Low Extension Storage Poisoning in Ban Checker for Steam

## Summary

We are writing on behalf of a security research team from Nankai University and the University of Liverpool. Our Ground Truth review identified **1 Flow(s)** in **Ban Checker for Steam** (edge, extension ID `jpfpinbbmcpbnnohhdhpibfpfoikgjjf`, version `1.4.0`).
The recorded issue type(s): **Extension Storage Poisoning**.

## Affected Extension Details

- Name: Ban Checker for Steam
- Platform: edge
- Extension ID: `jpfpinbbmcpbnnohhdhpibfpfoikgjjf`
- Dataset version: `1.4.0`
- Store version at review: `1.4.0`
- Users: 12281
- Analysis tools: ExPGuard

## Findings

### Finding 1: Storage Poisoning

The Ground Truth record traces Input reaching the recorded source from `ELEMENT_VALUE` (customapikey) in gcpd730 at L3:C56 -> L3:C68 to the privileged sink `CHROME_SYNC_STORAGE` (customapikey) in gcpd730 at L5:C4 -> L16:C6. The source scope is on pages matching `*://steamcommunity.com/id/*/gcpd/730*tab=matchhistorycompetitive, *://steamcommunity.com/profiles/*/gcpd/730*tab=matchhistorycompetitive, *://steamcommunity.com/id/*/gcpd/730*tab=matchhistorypremier, *://steamcommunity.com/profiles/*/gcpd/730*tab=matchhistorypremier, *://steamcommunity.com/id/*/gcpd/730*tab=matchhistorycompetitivepermap, *://steamcommunity.com/profiles/*/gcpd/730*tab=matchhistorycompetitivepermap, *://steamcommunity.com/id/*/gcpd/730*tab=matchhistorywingman, *://steamcommunity.com/profiles/*/gcpd/730*tab=matchhistorywingman, *://steamcommunity.com/id/*/gcpd/730*tab=matchhistoryscrimmage, *://steamcommunity.com/profiles/*/gcpd/730*tab=matchhistoryscrimmage, *://steamcommunity.com/id/*/gcpd/730*tab=matchhistoryophydra, *://steamcommunity.com/profiles/*/gcpd/730*tab=matchhistoryophydra, *://steamcommunity.com/id/*/gcpd/730*tab=playerreports, *://steamcommunity.com/profiles/*/gcpd/730*tab=playerreports, *://steamcommunity.com/id/*/gcpd/730*tab=playercommends, *://steamcommunity.com/profiles/*/gcpd/730*tab=playercommends`. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-9817b79954bd0ddd`
- Severity recorded by the analysis: **LOW**
- Source: `ELEMENT_VALUE` (customapikey) in gcpd730 at L3:C56 -> L3:C68
- Sink: `CHROME_SYNC_STORAGE` (customapikey) in gcpd730 at L5:C4 -> L16:C6
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Analysis and validation

- Static (ExPGuard): verdict `TRUE_POSITIVE`, confidence 0.6; report `extensions/jpfpinbbmcpbnnohhdhpibfpfoikgjjf_1.4.0/static/static_report.json`.
- Dynamic (ExPGuard): `CONFIRMED` (basis `runtime_reproduced`); runtime reproduction recorded; report `extensions/jpfpinbbmcpbnnohhdhpibfpfoikgjjf_1.4.0/dynamic/dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `1.4.0` in a disposable edge profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
const input = document.getElementById("access_key") || document.querySelector("input");
if (input) {
  input.value = "EXPGuard_test_marker";
  input.dispatchEvent(new Event("input", { bubbles: true }));
}
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/edge/flow-verification-results-no-duplicate.json`; static report `extensions/jpfpinbbmcpbnnohhdhpibfpfoikgjjf_1.4.0/static/static_report.json`; dynamic report `extensions/jpfpinbbmcpbnnohhdhpibfpfoikgjjf_1.4.0/dynamic/dynamic_report.json`.


## Recommendations

1. Do not let page-controlled cookies or DOM values select extension-owned storage values; validate the expected value and keep credentials in extension-owned UI/state.
2. Treat storage writes as privileged state changes: use an allowlisted schema, reject attacker-controlled keys, and avoid merging untrusted objects into extension state.
3. Reduce host permissions and sensitive API access to the smallest scope required by the feature.

## Impact

The demonstrated impact is limited to the operation described in each finding and the extension's granted permissions. The evidence above distinguishes the recorded static path from any runtime result; it does not imply unrelated account compromise, data theft, or malware installation.

## Disclosure Status

- Report class: `version_unchanged`
- This report covers only the listed Ground Truth Flow(s). Newly introduced Flow(s) are outside scope.
- Contact discovery: `missing` (No reliable public email found)

Please contact us so that we can coordinate remediation and retest the affected Flow(s).

Regards,
Xin Yang
Nankai University / University of Liverpool
