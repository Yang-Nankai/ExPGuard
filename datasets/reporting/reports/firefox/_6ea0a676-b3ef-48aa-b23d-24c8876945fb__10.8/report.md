# Security Vulnerability Report: Medium Extension Storage Poisoning in Watch2Gether

## Summary

We are writing on behalf of a security research team from Nankai University and the University of Liverpool. Our Ground Truth review identified **2 Flow(s)** in **Watch2Gether** (firefox, extension ID `{6ea0a676-b3ef-48aa-b23d-24c8876945fb}`, version `10.8`).
The recorded issue type(s): **Extension Storage Poisoning**.

## Affected Extension Details

- Name: Watch2Gether
- Platform: firefox
- Extension ID: `{6ea0a676-b3ef-48aa-b23d-24c8876945fb}`
- Dataset version: `10.8`
- Store version at review: `10.8`
- Users: 55505
- Analysis tools: ExPGuard

## Findings

### Finding 1: Storage Poisoning

The Ground Truth record traces A page or sender able to reach the recorded message/event source from `WINDOW_MESSAGE_EVENT` (window.addEventListener(message)) in content_w2g.530d247b at L166:C27 -> L166:C50 to the privileged sink `CHROME_SESSION_STORAGE` (db) in sw.98b6defa at L209:C16 -> L211:C18. The source scope is on pages matching `https://stage.watch2gether.com/rooms/*, https://w2g.tv/*, https://rooms.w2g.tv/*, https://stage-rooms.w2g.tv/*, https://stage.w2g.tv/*, https://staging.w2g.tv/*`. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-e2bf8afadd5131ae`
- Severity recorded by the analysis: **MEDIUM**
- Source: `WINDOW_MESSAGE_EVENT` (window.addEventListener(message)) in content_w2g.530d247b at L166:C27 -> L166:C50
- Sink: `CHROME_SESSION_STORAGE` (db) in sw.98b6defa at L209:C16 -> L211:C18
- Tools reporting this Flow: ExPGuard

**Source code anchor (excerpt):**

```javascript
s
    var mainExports = newRequire(mainEntry);

    // CommonJS
```

**Sink code anchor (excerpt):**

```javascript
 };
                chrome.storage.session.set({
                    db: db
                }).then(function() {
 
```

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Analysis and validation

- Static (ExPGuard): verdict `TRUE_POSITIVE`, confidence 0.6; report `extensions/{6ea0a676-b3ef-48aa-b23d-24c8876945fb}_10.8/static/static_report.json`.
- Dynamic (ExPGuard): `INCONCLUSIVE_AFTER_DEBUG`; the dynamic agent exceeded its 30-second budget, so this run did not establish a decisive runtime result; report `extensions/{6ea0a676-b3ef-48aa-b23d-24c8876945fb}_10.8/dynamic/dynamic_report.json`.
- Manual review: Ground Truth records `TP` — 用户验证为 TP：openSite 成功后确实写入 chrome.storage.session.db。.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `10.8` in a disposable firefox profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Use only a harmless marker in a disposable profile.
window.postMessage({ marker: "EXPGuard_test_marker" }, "*");
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/firefox/flow-verification-results-no-duplicate.json`; static report `extensions/{6ea0a676-b3ef-48aa-b23d-24c8876945fb}_10.8/static/static_report.json`; dynamic report `extensions/{6ea0a676-b3ef-48aa-b23d-24c8876945fb}_10.8/dynamic/dynamic_report.json`.

### Finding 2: Storage Poisoning

The Ground Truth record traces A page or sender able to reach the recorded message/event source from `WINDOW_MESSAGE_EVENT` (From storage.session.set('db') in sw.98b6defa) in content_w2g.530d247b at L190:C0 -> L278:C2 to the privileged sink `CHROME_SESSION_STORAGE` (db) in sw.98b6defa at L209:C16 -> L211:C18. The source scope is on pages matching `https://stage.watch2gether.com/rooms/*, https://w2g.tv/*, https://rooms.w2g.tv/*, https://stage-rooms.w2g.tv/*, https://stage.w2g.tv/*, https://staging.w2g.tv/*`. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-e42fc2b042f03566`
- Severity recorded by the analysis: **MEDIUM**
- Source: `WINDOW_MESSAGE_EVENT` (From storage.session.set('db') in sw.98b6defa) in content_w2g.530d247b at L190:C0 -> L278:C2
- Sink: `CHROME_SESSION_STORAGE` (db) in sw.98b6defa at L209:C16 -> L211:C18
- Tools reporting this Flow: ExPGuard

**Source code anchor (excerpt):**

```javascript
olve();
    });
});
chrome.runtime.onMessage.addListener(function(msg, sender) {
    db_promise.then(function() {
        if (sender.url.match(allowed_hosts)) {
            if (msg.openSite) chrome.windows.create({
                left: 10,
                top: 10,
                width: 1024,
                height: 680,
                type: navigator.userAgent.toLowerCase().indexOf('firefox') > -1 || navigator.userAgent.indexOf("OPR") > -1 ? "normal" : "popup",
                url: msg.openSite.url
            }).then(function(w) {
                db[sender.tab.id] = {
                    type: "window",
                    stab: w.tabs[w.tabs.length - 1].id,
                    tframe: null,
                    vframe: null,
                    vidscore: 0,
                    syncurl: msg.openSite.url
                };
                chrome.storage.session.set({
                    db: db
                }).then(function() {
                    chrome.tabs.sendMessage(sender.tab.id, {
                        "windowOpened": true
                    }, {
                        frameId: 0
                    });
                });
            });
            if (db[sender.tab.id]) {
                if (db[sender.tab.id].type === "window") {
                    if (msg.closeSite) _closeWindow(sender.tab.id);
                    else if (msg.focusSite) chrome.tabs.get(db[sender.tab.id].stab).then(function(tab) {
                        chrome.windows.update(tab.windowId, {
                            focused: true
                        });
                    });
                }
                if (msg.urlok) {
                    msg.urlok.syncurl = db[sender.tab.id].syncurl;
                    chrome.tabs.sendMessage(db[sender.tab.id].stab, msg);
                } else if (db[sender.tab.id].vframe !== null) chrome.tabs.sendMessage(db[sender.tab.id].stab, msg, {
                    frameId: db[sender.tab.id].vframe
                });
            }
        } else if (sender.tab) {
            let m = _getKeyByTab(sender.tab.id);
            if (m) {
                if (msg.newurl && sender.frameId === db[m].tframe) chrome.tabs.get(sender.tab.id).then(function(controlledTab) {
                    chrome.tabs.sendMessage(m, {
                        "content_loaded": {
                            url: msg.newurl.url,
                            title: msg.newurl.title,
                            thumb: controlledTab.favIconUrl && controlledTab...
```

**Sink code anchor (excerpt):**

```javascript
 };
                chrome.storage.session.set({
                    db: db
                }).then(function() {
 
```

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Analysis and validation

- Static (ExPGuard): verdict `TRUE_POSITIVE`, confidence 0.6; report `extensions/{6ea0a676-b3ef-48aa-b23d-24c8876945fb}_10.8/static/static_report.json`.
- Dynamic (ExPGuard): `INCONCLUSIVE_AFTER_DEBUG`; the dynamic agent exceeded its 30-second budget, so this run did not establish a decisive runtime result; report `extensions/{6ea0a676-b3ef-48aa-b23d-24c8876945fb}_10.8/dynamic/dynamic_report.json`.
- Manual review: Ground Truth records `TP` — 用户验证为 TP：建立 openSite 映射后，后续 branch 确实更新 session db。.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `10.8` in a disposable firefox profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Use only a harmless marker in a disposable profile.
window.postMessage({ marker: "EXPGuard_test_marker" }, "*");
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/firefox/flow-verification-results-no-duplicate.json`; static report `extensions/{6ea0a676-b3ef-48aa-b23d-24c8876945fb}_10.8/static/static_report.json`; dynamic report `extensions/{6ea0a676-b3ef-48aa-b23d-24c8876945fb}_10.8/dynamic/dynamic_report.json`.


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
