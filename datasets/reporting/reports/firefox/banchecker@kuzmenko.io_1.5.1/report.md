# Security Vulnerability Report: Low Extension Storage Poisoning in Ban Checker for Steam

## Summary

We are writing on behalf of a security research team from Nankai University and the University of Liverpool. Our Ground Truth review identified **2 Flow(s)** in **Ban Checker for Steam** (firefox, extension ID `banchecker@kuzmenko.io`, version `1.5.1`).
The recorded issue type(s): **Extension Storage Poisoning**.

The store currently reports version `1.5.2`. The update revalidation is summarized per tool below. This report covers only the original Flow(s); newly introduced Flow(s) are out of scope. Any mixed result, tool failure, or incomplete automated run is called out explicitly and should not be read as a final remediation determination.

## Affected Extension Details

- Name: Ban Checker for Steam
- Platform: firefox
- Extension ID: `banchecker@kuzmenko.io`
- Dataset version: `1.5.1`
- Store version at review: `1.5.2`
- Users: 2739
- Analysis tools: ExPGuard

## Findings

### Finding 1: Storage Poisoning

The Ground Truth record traces Input reaching the recorded source from `ELEMENT_VALUE` (customapikey) in options at L3:C56 -> L3:C68 to the privileged sink `CHROME_SYNC_STORAGE` (customapikey) in options at L5:C4 -> L19:C6. The source scope is on pages matching `*://steamcommunity.com/id/*/friends*, *://steamcommunity.com/profiles/*/friends*, *://steamcommunity.com/id/*/following*, *://steamcommunity.com/profiles/*/following*, *://steamcommunity.com/id/*/groups*, *://steamcommunity.com/profiles/*/groups*`. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-0f8e9324051a39cd`
- Severity recorded by the analysis: **LOW**
- Source: `ELEMENT_VALUE` (customapikey) in options at L3:C56 -> L3:C68
- Sink: `CHROME_SYNC_STORAGE` (customapikey) in options at L5:C4 -> L19:C6
- Tools reporting this Flow: ExPGuard

**Source code anchor (excerpt):**

```javascript
Custom').checked && customapikey != '') {
    //use 
```

**Sink code anchor (excerpt):**

```javascript
/use custom key
    chrome.storage.sync.set({ customapikey: customapikey }, function () {
      chrome.storage.sync.set(
        {
          greentext: !document.getElementById('chkGreentext').checked,
          showcommunitybans: document.getElementById('chkCommunityBans').checked
        },
        function () {
          var status = document.getElementById('statusSaved');
          status.style.visibility = 'visible';
          setTimeout(function () {
            status.style.visibility = 'hidden';
          }, 750);
        }
      );
    });
  } else if (
    
```

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Updated-version tool result

- ExPGuard: `still_detected`; original source `ELEMENT_VALUE` → sink `CHROME_SYNC_STORAGE`; candidate matches: 2

#### Analysis and validation

- Dynamic: no structured dynamic-verification result is attached to this Flow in the Ground Truth dataset.
- Manual review: Ground Truth records `TP` — the dataset records manual confirmation that this Flow is reachable and produces its associated privileged effect.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `1.5.1` in a disposable firefox profile.
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

- ExPGuard: source report `ExPGuard-Opti/firefox/flow-verification-results-no-duplicate.json`; static report `not recorded`; dynamic report `not recorded`.

### Finding 2: Storage Poisoning

The Ground Truth record traces Input reaching the recorded source from `ELEMENT_VALUE` (customapikey) in gcpd730 at L3:C56 -> L3:C68 to the privileged sink `CHROME_SYNC_STORAGE` (customapikey) in gcpd730 at L5:C4 -> L19:C6. The source scope is on pages matching `*://steamcommunity.com/id/*/gcpd/730*tab=matchhistorycompetitive, *://steamcommunity.com/profiles/*/gcpd/730*tab=matchhistorycompetitive, *://steamcommunity.com/id/*/gcpd/730*tab=matchhistorypremier, *://steamcommunity.com/profiles/*/gcpd/730*tab=matchhistorypremier, *://steamcommunity.com/id/*/gcpd/730*tab=matchhistorycompetitivepermap, *://steamcommunity.com/profiles/*/gcpd/730*tab=matchhistorycompetitivepermap, *://steamcommunity.com/id/*/gcpd/730*tab=matchhistorywingman, *://steamcommunity.com/profiles/*/gcpd/730*tab=matchhistorywingman, *://steamcommunity.com/id/*/gcpd/730*tab=matchhistoryscrimmage, *://steamcommunity.com/profiles/*/gcpd/730*tab=matchhistoryscrimmage, *://steamcommunity.com/id/*/gcpd/730*tab=matchhistoryophydra, *://steamcommunity.com/profiles/*/gcpd/730*tab=matchhistoryophydra, *://steamcommunity.com/id/*/gcpd/730*tab=playerreports, *://steamcommunity.com/profiles/*/gcpd/730*tab=playerreports, *://steamcommunity.com/id/*/gcpd/730*tab=playercommends, *://steamcommunity.com/profiles/*/gcpd/730*tab=playercommends`. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-1f1d6b88c09ccfb0`
- Severity recorded by the analysis: **LOW**
- Source: `ELEMENT_VALUE` (customapikey) in gcpd730 at L3:C56 -> L3:C68
- Sink: `CHROME_SYNC_STORAGE` (customapikey) in gcpd730 at L5:C4 -> L19:C6
- Tools reporting this Flow: ExPGuard

**Source code anchor (excerpt):**

```javascript
tries = 3;

let loadingWholeHistoryCounter = 0;
let 
```

**Sink code anchor (excerpt):**

```javascript

let loadingWholeHistory = false;

let providedCustomAPIKey = false;
let apikey = '';

let showCommunityBans = true;
chrome.storage.sync.get(['showcommunitybans'], data => {
  if (typeof data['showcommunitybans'] == 'undefined') {
    chrome.storage.sync.set({
      showcommunitybans: true
    });
  } else {
    showCommunityBans = data['showcommunitybans'];
  }
});

const banStats = {
  vacBans: 0,
  gameBans: 0,
  communityBans: 0,
  recentBans: 0
};

const funStats = {
  numberOfMatches: 0,
  totalKills: 0,
  totalAssists: 0,
  totalDeaths: 0,
  totalWins: 0,
  to
```

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Updated-version tool result

- ExPGuard: `still_detected`; original source `ELEMENT_VALUE` → sink `CHROME_SYNC_STORAGE`; candidate matches: 2

#### Analysis and validation

- Static (ExPGuard): verdict `UNCERTAIN`, confidence 0.3; report `extensions/banchecker@kuzmenko.io_1.5.1/static/static_report.json`.
- Dynamic (ExPGuard): `CONFIRMED`; runtime reproduction recorded; report `extensions/banchecker@kuzmenko.io_1.5.1/dynamic/dynamic_report.json`.
- Manual review: Ground Truth records `TP` — the dataset records manual confirmation that this Flow is reachable and produces its associated privileged effect.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `1.5.1` in a disposable firefox profile.
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

- ExPGuard: source report `ExPGuard-Opti/firefox/flow-verification-results-no-duplicate.json`; static report `extensions/banchecker@kuzmenko.io_1.5.1/static/static_report.json`; dynamic report `extensions/banchecker@kuzmenko.io_1.5.1/dynamic/dynamic_report.json`.


## Recommendations

1. Do not let page-controlled cookies or DOM values select extension-owned storage values; validate the expected value and keep credentials in extension-owned UI/state.
2. Treat storage writes as privileged state changes: use an allowlisted schema, reject attacker-controlled keys, and avoid merging untrusted objects into extension state.
3. Reduce host permissions and sensitive API access to the smallest scope required by the feature.

## Impact

The demonstrated impact is limited to the operation described in each finding and the extension's granted permissions. The evidence above distinguishes the recorded static path from any runtime result; it does not imply unrelated account compromise, data theft, or malware installation.

## Disclosure Status

- Report class: `updated_still_detected`
- This report covers only the listed Ground Truth Flow(s). Newly introduced Flow(s) are outside scope.
- Contact discovery: `found` (Mozilla Add-ons API support_email)

Please contact us so that we can coordinate remediation and retest the affected Flow(s).

Regards,
Xin Yang
Nankai University / University of Liverpool
