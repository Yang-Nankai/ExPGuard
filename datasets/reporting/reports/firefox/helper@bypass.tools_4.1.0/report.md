# Security Vulnerability Report: High CSRF via Privileged Network Request in Bypass Tools

## Summary

We are writing on behalf of a security research team from Nankai University and the University of Liverpool. Our Ground Truth review identified **2 Flow(s)** in **Bypass Tools** (firefox, extension ID `helper@bypass.tools`, version `4.1.0`).
The recorded issue type(s): **CSRF via Privileged Network Request**.

The store currently reports version `5.0.16`. The update revalidation is summarized per tool below. This report covers only the original Flow(s); newly introduced Flow(s) are out of scope. Any mixed result, tool failure, or incomplete automated run is called out explicitly and should not be read as a final remediation determination.

## Affected Extension Details

- Name: Bypass Tools
- Platform: firefox
- Extension ID: `helper@bypass.tools`
- Dataset version: `4.1.0`
- Store version at review: `5.0.16`
- Users: 1667
- Analysis tools: ExPGuard

## Findings

### Finding 1: Cross-Site Request Forgery (CSRF) / Privileged Network Request

A script running on a page matching `*://linkvertise.com/*, *://loot-link.com/*, *://loot-links.com/*, *://lootdest.com/*, *://lootdest.org/*, *://lootlinks.co/*, *://lootlinks.com/*, *://daughablelea.com/*, *://tonordersitye.com/*, *://cuty.io/*, *://www.cuty.io/*, *://work.ink/*, *://cety.app/*, *://www.cety.app/*, *://lockr.so/*, *://mega-guy.com/*, *://best-links.org/*, *://megaspremium.com/*, *://direct-links.net/*, *://risquemega.com/*, *://onlyfriends.club/*, *://onepiecered.co/*, *://multileaks.com/*, *://luvsquad-links.com/*, *://luvsquad-links.cmo/*, *://free-leaks.com/*, *://goldmega.online/*, *://realiukzemydre.com/*, *://kmendation.com/*, *://onlyshare.info/*, *://leakplugs.com/*, *://nswfbox.com/*, *://eofmukindwo.com/*, *://op-packs.com/*, *://thedetective.online/*, *://forlinkmeg.com/*, *://thegoatpack.org/*, *://of-leaks.xyz/*, *://links.spacebin.in/*, *://supermeg.com/*, *://onlyfanessereloaded.com/*, *://fanzleaks.com/*, *://cemendemons.com/*, *://premiummegaz.com/*, *://thepremium.online/*, *://pasteebins.com/*, *://baddiezcentral.com/*, *://megazone.website/*, *://leak-pragmatic.com/*, *://megadumpz.com/*, *://thhaven.net/*, *://meg4fans.com/*, *://depravityweb.co/*, *://discordlink.cc/*, *://megashub.co/*, *://streamergirls.org/*, *://your-leaks.com/*, *://onlylinksmegas.xyz/*, *://pypy.spacebin.in/*, *://pypy.in/*, *://beast.net.in/*, *://hook.beast.net.in/*, *://all-fans.online/*, *://fansmega.com/*, *://worldpacks.co/*, *://night-hub.online/*, *://dailyofleaks.com/*, *://pkofs.com/*, *://offree90.com/*, *://megadropz.com/*, *://onlyfunlink.com/*, *://direct-links.org/*, *://leaks4you.com/*, *://onlylinksmegas.com/*, *://direct-link.net/*, *://downbadleaks.com/*, *://onlyfanscloud.com/*, *://missleakz.com/*, *://leakszone.online/*, *://links-loot.com/*, *://holyfanslinks.com/*, *://utopianleaks.com/*, *://megavip.store/*, *://drlinker.com/*, *://baddiesheaven.com/*, *://of4lm-links.com/*, *://holedonly.store/*, *://free-content.pro/*, *://milky-center.com/*, *://megaofs.com/*, *://bleleadersto.com/*, *://link-target.org/*, *://mymegalinks.com/*, *://heroslut.com/*, *://vip-linknetwork.com/*, *://birdbiss.com/*, *://loot-labs.com/*, *://lootlabs.com/*, *://links.lootlabs.gg/*, *://lootboost.net/*, *://link-hub.net/*, *://locconnect.com/*, *://premiumstashdrop.com/*, *://lootdest.info/*, *://of-area.com/*, *://link-target.net/*, *://megalnk.com/*, *://lootlink.org/*, *://nsfwcherry.com/*, *://cherrypacks.online/*, *://hotstars-leaks.com/*, *://onlymega.co/*, *://hanimeturks.com/*, *://dailyleakz.com/*, *://content-hub.club/*, *://dailyadultmegas.com/*, *://oui-chu.com/*, *://megalinks.one/*, *://starleakz.com/*, *://babeslink.click/*, *://ofgirls3x.com/*, *://pnp-drops.me/*, *://nsfw-paradise.club/*, *://key-access.co/*, *://leaksmix.com/*, *://sensual-leaks.com/*, *://ofhub-leaks.com/*, *://onlyforfan.online/*, *://sweetjuice-mega.com/*, *://crip-hub.com/*, *://leaksfreeday.com/*, *://thotshaven.online/*, *://mega-leaked.com/*, *://beautifulgirls.social/*, *://tavernleaks.com/*, *://nudeleaksteenz.com/*, *://slutywet.com/*, *://leakutopia.site/*, *://secret-packs.com/*, *://attiktok22.com/*, *://pancakes-leaks.com/*, *://diamond-leaks.com/*, *://lewd-leaks.com/*, *://ftbleaks.net/*, *://thepytheaven.org/*, *://of-region.online/*, *://admiregirls-byme.com/*, *://mzehoney12.com/*, *://herplace.online/*, *://megaplugleaks.com/*, *://of-kingdom.com/*, *://onlyfansmegafolder.com/*, *://adfoc.us/*, *://boost.ink/*, *://mboost.me/*, *://bst.gg/*, *://booo.st/*, *://mendationforc.info/*, *://paster.so/*, *://paster.gg/*, *://rekonise.com/*, *://social-unlock.com/*, *://www.social-unlock.com/*, *://socialwolvez.com/*, *://sub2get.com/*, *://www.sub2get.com/*, *://sub2unlock.com/*, *://sub2unlock.io/*, *://sub2unlock.net/*, *://sub2unlock.online/*, *://sub2unlock.top/*, *://sub4unlock.pro/*, *://sub4unlock.com/*, *://sub4unlock.io/*, *://subfinal.com/*, *://unlocknow.net/*, *://v.gd/*, *://workink.net/*, *://r.work.ink/*, *://workink.one/*, *://workink.me/*, *://ytsubme.com/*, *://www.ytsubme.com/*, *://esohasl.net/*, *://rbscripts.net/*, *://rinku.pro/*, *://link.rbscripts.net/*, *://bypass.tools/*, *://*.linkvertise.lol/*, *://localhost/*, *://127.0.0.1/*` can dispatch the recorded DOM custom event and supply its `detail`. The content script forwards that event data to the extension runtime, and the service worker uses the supplied URL and form data in a privileged POST `fetch`. The report records no origin/authentication check at this bridge. This permits a matching page to initiate the recorded request; it does not by itself establish that third-party credentials are included.

- Ground Truth Flow: `gtf-d58501d41133b0ae`
- Severity recorded by the analysis: **HIGH**
- Source: `WINDOW_CUSTOM_EVENT` (window.addEventListener(BypassTools_GM_XHR)) in proxy at L71:C20 -> L71:C28
- Sink: `FETCH_RESOURCE` ([Unknown URL]) in background at L53:C31 -> L58:C10
- Tools reporting this Flow: ExPGuard

**Source code anchor (excerpt):**

```javascript
.then(sendResponse);
        return true;
    }

```

**Sink code anchor (excerpt):**

```javascript
st response = await fetch(request.url, {
            method: request.method || 'GET',
            headers: request.headers || {},
            body: request.data || null,
            signal: _bgAbort.signal
        });
        clearTimeo
```

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Updated-version tool result

- ExPGuard: `still_detected`; original source `WINDOW_CUSTOM_EVENT` → sink `FETCH_RESOURCE`; candidate matches: 1

#### Analysis and validation

- Static (ExPGuard): verdict `TRUE_POSITIVE`, confidence 0.6; report `extensions/helper@bypass.tools_4.1.0/static/static_report.json`.
- Dynamic (ExPGuard): `CONFIRMED`; runtime reproduction recorded; report `extensions/helper@bypass.tools_4.1.0/dynamic/dynamic_report.json`.
- Manual review: Ground Truth records `TP` — the dataset records manual confirmation that this Flow is reachable and produces its associated privileged effect.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install version `4.1.0` in a disposable firefox profile and open any HTTP(S) page covered by the extension content script.
2. Start a local test server bound only to `127.0.0.1` that records POST requests, then run the payload below in that page's console.
3. Verify whether the local server receives the marker POST; do not substitute a third-party or internal-network URL.

#### Proof-of-concept payload

```js
// Replace EVENT_NAME and the documented field names with the handler's
// public event contract. Do not use real URLs, tokens, or credentials.
document.dispatchEvent(new CustomEvent("EVENT_NAME", {
  detail: { marker: "EXPGuard_test_marker" }
}));
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/firefox/flow-verification-results-no-duplicate.json`; static report `extensions/helper@bypass.tools_4.1.0/static/static_report.json`; dynamic report `extensions/helper@bypass.tools_4.1.0/dynamic/dynamic_report.json`.

### Finding 2: Cross-Site Request Forgery (CSRF) / Privileged Network Request

The Ground Truth record traces A page or sender able to reach the recorded message/event source from `WINDOW_MESSAGE_EVENT` (window.addEventListener(message)) in proxy at L52:C22 -> L52:C37 to the privileged sink `FETCH_RESOURCE` ([Unknown URL]) in background at L53:C31 -> L58:C10. The source scope is on pages matching `*://linkvertise.com/*, *://loot-link.com/*, *://loot-links.com/*, *://lootdest.com/*, *://lootdest.org/*, *://lootlinks.co/*, *://lootlinks.com/*, *://daughablelea.com/*, *://tonordersitye.com/*, *://cuty.io/*, *://www.cuty.io/*, *://work.ink/*, *://cety.app/*, *://www.cety.app/*, *://lockr.so/*, *://mega-guy.com/*, *://best-links.org/*, *://megaspremium.com/*, *://direct-links.net/*, *://risquemega.com/*, *://onlyfriends.club/*, *://onepiecered.co/*, *://multileaks.com/*, *://luvsquad-links.com/*, *://luvsquad-links.cmo/*, *://free-leaks.com/*, *://goldmega.online/*, *://realiukzemydre.com/*, *://kmendation.com/*, *://onlyshare.info/*, *://leakplugs.com/*, *://nswfbox.com/*, *://eofmukindwo.com/*, *://op-packs.com/*, *://thedetective.online/*, *://forlinkmeg.com/*, *://thegoatpack.org/*, *://of-leaks.xyz/*, *://links.spacebin.in/*, *://supermeg.com/*, *://onlyfanessereloaded.com/*, *://fanzleaks.com/*, *://cemendemons.com/*, *://premiummegaz.com/*, *://thepremium.online/*, *://pasteebins.com/*, *://baddiezcentral.com/*, *://megazone.website/*, *://leak-pragmatic.com/*, *://megadumpz.com/*, *://thhaven.net/*, *://meg4fans.com/*, *://depravityweb.co/*, *://discordlink.cc/*, *://megashub.co/*, *://streamergirls.org/*, *://your-leaks.com/*, *://onlylinksmegas.xyz/*, *://pypy.spacebin.in/*, *://pypy.in/*, *://beast.net.in/*, *://hook.beast.net.in/*, *://all-fans.online/*, *://fansmega.com/*, *://worldpacks.co/*, *://night-hub.online/*, *://dailyofleaks.com/*, *://pkofs.com/*, *://offree90.com/*, *://megadropz.com/*, *://onlyfunlink.com/*, *://direct-links.org/*, *://leaks4you.com/*, *://onlylinksmegas.com/*, *://direct-link.net/*, *://downbadleaks.com/*, *://onlyfanscloud.com/*, *://missleakz.com/*, *://leakszone.online/*, *://links-loot.com/*, *://holyfanslinks.com/*, *://utopianleaks.com/*, *://megavip.store/*, *://drlinker.com/*, *://baddiesheaven.com/*, *://of4lm-links.com/*, *://holedonly.store/*, *://free-content.pro/*, *://milky-center.com/*, *://megaofs.com/*, *://bleleadersto.com/*, *://link-target.org/*, *://mymegalinks.com/*, *://heroslut.com/*, *://vip-linknetwork.com/*, *://birdbiss.com/*, *://loot-labs.com/*, *://lootlabs.com/*, *://links.lootlabs.gg/*, *://lootboost.net/*, *://link-hub.net/*, *://locconnect.com/*, *://premiumstashdrop.com/*, *://lootdest.info/*, *://of-area.com/*, *://link-target.net/*, *://megalnk.com/*, *://lootlink.org/*, *://nsfwcherry.com/*, *://cherrypacks.online/*, *://hotstars-leaks.com/*, *://onlymega.co/*, *://hanimeturks.com/*, *://dailyleakz.com/*, *://content-hub.club/*, *://dailyadultmegas.com/*, *://oui-chu.com/*, *://megalinks.one/*, *://starleakz.com/*, *://babeslink.click/*, *://ofgirls3x.com/*, *://pnp-drops.me/*, *://nsfw-paradise.club/*, *://key-access.co/*, *://leaksmix.com/*, *://sensual-leaks.com/*, *://ofhub-leaks.com/*, *://onlyforfan.online/*, *://sweetjuice-mega.com/*, *://crip-hub.com/*, *://leaksfreeday.com/*, *://thotshaven.online/*, *://mega-leaked.com/*, *://beautifulgirls.social/*, *://tavernleaks.com/*, *://nudeleaksteenz.com/*, *://slutywet.com/*, *://leakutopia.site/*, *://secret-packs.com/*, *://attiktok22.com/*, *://pancakes-leaks.com/*, *://diamond-leaks.com/*, *://lewd-leaks.com/*, *://ftbleaks.net/*, *://thepytheaven.org/*, *://of-region.online/*, *://admiregirls-byme.com/*, *://mzehoney12.com/*, *://herplace.online/*, *://megaplugleaks.com/*, *://of-kingdom.com/*, *://onlyfansmegafolder.com/*, *://adfoc.us/*, *://boost.ink/*, *://mboost.me/*, *://bst.gg/*, *://booo.st/*, *://mendationforc.info/*, *://paster.so/*, *://paster.gg/*, *://rekonise.com/*, *://social-unlock.com/*, *://www.social-unlock.com/*, *://socialwolvez.com/*, *://sub2get.com/*, *://www.sub2get.com/*, *://sub2unlock.com/*, *://sub2unlock.io/*, *://sub2unlock.net/*, *://sub2unlock.online/*, *://sub2unlock.top/*, *://sub4unlock.pro/*, *://sub4unlock.com/*, *://sub4unlock.io/*, *://subfinal.com/*, *://unlocknow.net/*, *://v.gd/*, *://workink.net/*, *://r.work.ink/*, *://workink.one/*, *://workink.me/*, *://ytsubme.com/*, *://www.ytsubme.com/*, *://esohasl.net/*, *://rbscripts.net/*, *://rinku.pro/*, *://link.rbscripts.net/*, *://bypass.tools/*, *://*.linkvertise.lol/*, *://localhost/*, *://127.0.0.1/*`. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-e80defa6cde20e4b`
- Severity recorded by the analysis: **HIGH**
- Source: `WINDOW_MESSAGE_EVENT` (window.addEventListener(message)) in proxy at L52:C22 -> L52:C37
- Sink: `FETCH_RESOURCE` ([Unknown URL]) in background at L53:C31 -> L58:C10
- Tools reporting this Flow: ExPGuard

**Source code anchor (excerpt):**

```javascript
  navLocks.set(tabId, {
            stayUrl: request.st
```

**Sink code anchor (excerpt):**

```javascript
st response = await fetch(request.url, {
            method: request.method || 'GET',
            headers: request.headers || {},
            body: request.data || null,
            signal: _bgAbort.signal
        });
        clearTimeo
```

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Updated-version tool result

- ExPGuard: `still_detected`; original source `WINDOW_MESSAGE_EVENT` → sink `FETCH_RESOURCE`; candidate matches: 1

#### Analysis and validation

- Dynamic: no structured dynamic-verification result is attached to this Flow in the Ground Truth dataset.
- Manual review: Ground Truth records `TP` — the dataset records manual confirmation that this Flow is reachable and produces its associated privileged effect.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `4.1.0` in a disposable firefox profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Use only a harmless marker in a disposable profile.
window.postMessage({ marker: "EXPGuard_test_marker" }, "*");
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/firefox/flow-verification-results-no-duplicate.json`; static report `not recorded`; dynamic report `not recorded`.


## Recommendations

1. Authenticate page-to-extension events at the privilege boundary; validate the sender and origin instead of trusting DOM event detail.
2. Validate the request schema and restrict destination URLs, methods, headers, and bodies before issuing privileged network requests.
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
