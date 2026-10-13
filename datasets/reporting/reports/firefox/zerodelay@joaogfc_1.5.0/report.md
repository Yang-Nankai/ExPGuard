# Security Vulnerability Report: Medium Extension Storage Poisoning in ZeroDelay

## Summary

We are writing on behalf of a security research team from Nankai University and the University of Liverpool. Our Ground Truth review identified **1 Flow(s)** in **ZeroDelay** (firefox, extension ID `zerodelay@joaogfc`, version `1.5.0`).

The recorded issue type(s): **Extension Storage Poisoning**.

Ground Truth review recorded a storage-poisoning path in this extension where a page-controlled custom event on the YouTube origin reaches extension local storage. Static analysis marks the path TRUE_POSITIVE and manual review confirms it, while the dynamic run was inconclusive after exceeding its budget and provides no runtime confirmation.

## Affected Extension Details

- Name: ZeroDelay
- Platform: firefox
- Extension ID: `zerodelay@joaogfc`
- Dataset version: `1.5.0`
- Store version at review: `1.5.0`
- Users: 1675
- Analysis tools: ExPGuard

## Findings

### Finding 1: Storage Poisoning

A script running on a page matching https://www.youtube.com/* can dispatch the custom event `_live_catch_up_video_meta` with an attacker-controlled `detail.channel_id`; the content-script listener at L143 forwards `e.detail` to `onChannelIdUpdate`, where only a truthiness/liveness check is applied before the value reaches `chrome.storage.local.set` at L443. The privilege boundary is the content-script match on YouTube pages, allowing page-controlled input to alter extension-owned storage state; ExPGuard static analysis records TRUE_POSITIVE (confidence 0.6) and manual review records TP (confidence 0.95), while the dynamic run was INCONCLUSIVE_AFTER_DEBUG and did not reproduce the behavior, so no runtime confirmation is claimed.
- Ground Truth Flow: `gtf-eca35cfbe1d2bab3`
- Severity recorded by the analysis: **MEDIUM**
- Source: `TARGET_CUSTOM_EVENT` (target.addEventListener(_live_catch_up_video_meta)) in content at L143:C94 -> L143:C102
- Sink: `CHROME_LOCAL_STORAGE` (unknown) in content at L443:C37 -> L443:C66
- Tools reporting this Flow: ExPGuard

**Source code anchor (excerpt):**

```javascript
nelIdUpdate(common, e.detail));

        // Turn
```

**Sink code anchor (excerpt):**

```javascript
t.keys(upd).length) chrome.storage.local.set(upd);

    });

}


```

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Analysis and validation

- Static (ExPGuard): verdict `TRUE_POSITIVE`, confidence 0.6; report `extensions/zerodelay@joaogfc_1.5.0/static/static_report.json`.
- Dynamic (ExPGuard): `INCONCLUSIVE_AFTER_DEBUG`; the dynamic agent exceeded its 30-second budget, so this run did not establish a decisive runtime result; report `extensions/zerodelay@joaogfc_1.5.0/dynamic/dynamic_report.json`.
- Manual review: Ground Truth records `TP` — 用户人工判定为 TP：_live_catch_up_video_meta 的 channel_id 写入扩展本地 storage。.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `1.5.0` in a disposable firefox profile.
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

- ExPGuard: source report `ExPGuard-Opti/firefox/flow-verification-results-no-duplicate.json`; static report `extensions/zerodelay@joaogfc_1.5.0/static/static_report.json`; dynamic report `extensions/zerodelay@joaogfc_1.5.0/dynamic/dynamic_report.json`.


## Recommendations

1. Treat page-dispatched custom events such as `_live_catch_up_video_meta` as untrusted input and prevent `detail.channel_id` from directly selecting or constructing extension-owned storage values.
2. Validate `channel_id` against the expected YouTube channel ID format and, where feasible, an allowlist; reject non-conforming values instead of writing them.
3. Write storage updates through a schema that permits only known keys with sanitized values rather than merging arbitrary objects into extension state.
4. Narrow the content-script match pattern from `https://www.youtube.com/*` to the specific YouTube pages the sync feature actually requires.
5. Avoid triggering privileged storage writes from page-originated events; obtain the required metadata through extension-owned logic or a background message validated against extension state.

## Impact

The recorded impact is limited to poisoning extension local storage through a page-controlled event on pages matching https://www.youtube.com/*, which may affect extension behavior or state that relies on the stored channel ID; it does not imply account compromise, data theft, or malware installation.

## Disclosure Status

- Report class: `version_unchanged`
- This report covers only the listed Ground Truth Flow(s). Newly introduced Flow(s) are outside scope.
- Contact discovery: `found` (Mozilla Add-ons API support_email)

Please contact us so that we can coordinate remediation and retest the affected Flow(s).

Regards,
Xin Yang
Nankai University / University of Liverpool
