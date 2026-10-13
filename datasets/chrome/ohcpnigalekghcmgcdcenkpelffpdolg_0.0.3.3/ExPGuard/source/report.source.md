# Source-level Taint Flow — ohcpnigalekghcmgcdcenkpelffpdolg 0.0.3.3

- Source type: CRX
- Files with issues: 8 / 12
- Distinct taint flows: 6  (collapsed from 7 raw issue entries)
- Sinkless sources skipped: 21 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — CHROME_ONMESSAGEEXTERNAL_MESSAGE (chrome.runtime.onMessageExternal.addListener[message])

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` — `background` L89:C16 -> L89:C23  `var extTabId = »request«.active_tab;`
- **Sink(s)**:
  - `FETCH_RESOURCE` ([Unknown URL]) — `background` L363:C3 -> L363:C79  `»fetch('https://vidsbee.com/ColorPick/Daily/vcolors.php?colorhex='+curentHex)«`  (url-control=PARTIAL)
  - `CHROME_RUNTIME_SENDMESSAGE_EXTERNAL` (0) — `background` L386:C2 -> L386:C99  `»chrome.tabs.sendMessage(tabid,{hexValueWasSelected:curentHex.toLowerCase()},function(response){})«;`
  - `CHROME_SYNC_STORAGE` (syncColorHistory) — `background` L27:C1 -> L35:C3 (spans to L35)  `/»/	for(var i in pAdvOptions){«`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (97 raw steps → 21 distinct lines):
   1. L89 `var extTabId = »request.active_tab«;`  · ASSIGN:identifier, ELEMENT:member-element
   2. L90 `var extWinId = »request.active_window«;`  · ASSIGN:identifier, ELEMENT:member-element
   3. L93 `if(»request.movePixel«){`  · ASSIGN:identifier, ELEMENT:member-element
   4. L94 `»chrome.tabs.sendMessage(extTabId, {movePixel:true,_x:request.x,_y:request.y,tabi:extTabId}, function(r) {})«;`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:object.setProperty
   5. L96 `}else if(»request.getActivatedStatusFromBg«){`  · ASSIGN:identifier, ELEMENT:member-element
   6. L98 (→L105) `chrome.tabs.sendMessage(»extTabId, {getActivatedStatus:true, tab:extTabId, win:extWinId}, function(tab_response) {«`  · ASSIGN:identifier, ELEMENT:object.setProperty
   7. L107 `}else if(»request.bulkAppendHistories«){`  · ASSIGN:identifier, ELEMENT:member-element
   8. L111 `}else if(»request.getAllHistories«){`  · ASSIGN:identifier, ELEMENT:member-element
   9. L113 `}else if(»request.historyPush && request.hex && request.rgb && request.hsv« ){`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left, ASSIGN:logical-right
  10. L114 `»processSetColor({setColor:true,hex:request.hex,rgb:request.rgb,hsv:request.hsv})«;`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:object.setProperty
  11. L360 `if( lastHex != »curentHex« ){`  · ASSIGN:identifier, ASSIGN:binary-right
  12. L385 `if( »curentHex« ){`  · ASSIGN:identifier
  13. L363 `fetch('https://vidsbee.com/ColorPick/Daily/vcolors.php?colorhex='+»curentHex«)`  · ASSIGN:identifier, ASSIGN:binary-right
  14. L386 `»chrome.tabs.sendMessage(tabid,{hexValueWasSelected:curentHex.toLowerCase()},function(response){})«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return, ELEMENT:object.setProperty
  15. L379 `loadedOptions.syncColorHistory=»(loadedOptions.syncColorHistory||'')+"#"+curentHex«;`  · ASSIGN:identifier, ASSIGN:binary-right, ASSIGN:logical-left, ASSIGN:binary-left
  16. L6 `//va»r localStorage = {«}; // TBD< this is no longer hte real localStorage :/ so this does NOT sync anything wiht options.html etc`  · ELEMENT:object.setProperty
  17. L349 (→L355) `»	chromeStorageSaveALocalStor({syncColorHistory: loadedOptions.syncColorHistory}, function saved_prefs_hista(){«`  · ELEMENT:object.setProperty
  18. L352 (→L354) `»		chrome.runtime.sendMessage({historypush: loadedOptions.syncColorHistory}, function(response) {«`  · ELEMENT:object.setProperty
  19. L388 `lastLastHex=»lastHex;lastHex=curentHex«;`  · ASSIGN:identifier
  20. L116 `}else if(»request.goToOrVisitTab«){`  · ASSIGN:identifier, ELEMENT:member-element
  21. L117 `goToOrOpenTab(»request.goToOrVisitTab«);`  · ASSIGN:identifier, ELEMENT:member-element

---

## Flow #2 — CHROME_TABS_CAPUTURE_VISIBLE_TAB

- **Source**: `CHROME_TABS_CAPUTURE_VISIBLE_TAB` — `popup` L478:C24 -> L478:C31  `tabScreenshotRecieved(»dataUrl«, {setTabImage:tabid})`
- **Sink(s)**:
  - `CHROME_SYNC_STORAGE` (unknown) — `popup` L27:C1 -> L35:C3 (spans to L35)  `»ev = ev || event;«`
- **Sanitized**: NO
- **Frame**: `POPUP_1`

- **Propagation** (1449 raw steps → 9 distinct lines):
   1. L478 `tabScreenshotRecieved(»dataUrl«, {setTabImage:tabid})`  · ASSIGN:identifier
   2. L484 `setPreviewSRC(»dataUri«,true);`  · ASSIGN:identifier
   3. L40 `if( »screenshotAlternativeRecieved && duri.indexOf('img/error') > 0« ){`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:binary-left, ASSIGN:logical-right
   4. L70 `im.src=»duri«;`  · ASSIGN:identifier
   5. L35 `var »im=new Image()«;`  · ELEMENT:object.setProperty
   6. L491 `localStorage.lastImageSnap=»dataUri«; // our new tab will delete this entry`  · ASSIGN:identifier
   7. L49 _(in `Cr`)_ `»  {'events': Cr«.events(`  · ELEMENT:member-element-container
   8. L47 `do»cument.ge«tElementById('alt-snap-mode-link').remove();`  · ELEMENT:object.setProperty
   9. L52 _(in `options_prefs`)_ `//pAdvOption»s["customCalibr«ation"]={def:false,ind:0,name:'Enable the defunct calibration link above.'};`  · ELEMENT:member-element-container

---

## Flow #3 — STORAGE_ALL_ITEMS (storage.all.items[sync])

- **Source**: `STORAGE_ALL_ITEMS` — `options` L112:C6 -> L112:C11  `if(ty»peof(«localStorage["usageStatistics"])=='undefined')localStorage["usageStatistics"]=false;`
- **Sink(s)**:
  - `CHROME_SYNC_STORAGE` (unknown) — `options` L27:C1 -> L35:C3 (spans to L35)  `»        targ=targ.parentNode;«`
- **Sanitized**: NO
- **Frame**: `OPTIONS_1`

- **Propagation** (1128 raw steps → 11 distinct lines):
   1. L112 `if(ty»peof(«localStorage["usageStatistics"])=='undefined')localStorage["usageStatistics"]=false;`  · ITERATE:loop.iteration
   2. L113 `if(localStorag»e["usageStatistics"]=='true' && !nav«igator.doNotTrack){`  · ASSIGN:identifier
   3. L114 `if(localStorag»e.removeIte«m)localStorage.removeItem("feedbackOptOut");`  · ASSIGN:identifier, ELEMENT:member-element
   4. L169 _(in `options_prefs`)_ `»results[i] = (!obj[i] || isNaN(obj[i] - 0)) ? pOptions[i].def : obj[i] - 0«;`  · ELEMENT:member-element-container, ASSIGN:binary-left, ASSIGN:conditional-alternate, ELEMENT:implicit.add
   5. L6 _(in `colorpick.user`)_ `»swp: 'box-shadow 0«.5s ease-out, top 0.25s ease-out, left 0.25s ease-out',`  · ELEMENT:object.setProperty
   6. L171 _(in `options_prefs`)_ `»results[i] = ((obj[i])?obj[i]:((obj[i]==='' && !pOptions[i].ifEmptyReset)?obj[i]:pOptions[i].def))«;`  · ELEMENT:member-element-container, ASSIGN:conditional-alternate, ELEMENT:implicit.add
   7. L191 `»document.getElementById(i).value = ((localStorage[i] || localStorage[i] === '')?localStorage[i]:pOptions[i].def)«;`  · ELEMENT:implicit.add, ELEMENT:member-element-container, ELEMENT:object.setProperty
   8. L198 `»document.getElementById(i).value = ((localStorage[i] || localStorage[i] === '')?localStorage[i]:pAdvOptions[i].def)«;`  · ELEMENT:implicit.add, ELEMENT:member-element-container, ELEMENT:object.setProperty
   9. L49 `updateSwatc»hSelectionMargi«ns(null);`  · ELEMENT:member-element-container
  10. L47 `arr».src='img«/expanded.png';`  · ELEMENT:object.setProperty
  11. L52 `function sho»w_next_sibling(«n){`  · ELEMENT:member-element-container

---

## Flow #4 — ?  ·  2× duplicate paths collapsed

- **Source**: `?` — _(unresolved)_
- **Sink(s)**:
  - `CHROME_SYNC_STORAGE` (unknown) — `options` L27:C1 -> L35:C3 (spans to L35)  `»        targ=targ.parentNode;«`
- **Sanitized**: NO
- **Frame**: `OPTIONS_1`

- **Propagation** (549 raw steps → 8 distinct lines):
   1. L49 `updateSwatc»hSelectionMargi«ns(null);`  · ELEMENT:member-element-container
   2. L47 `arr».src='img«/expanded.png';`  · ELEMENT:object.setProperty
   3. L52 `function sho»w_next_sibling(«n){`  · ELEMENT:member-element-container
   4. L169 _(in `options_prefs`)_ `results[i] = (!obj[i] || isNaN(obj[i] - 0)) ? pOptions[i].def : »obj[i] - 0«;`  · ELEMENT:member-element-container, ASSIGN:binary-left, ASSIGN:conditional-alternate
   5. L6 _(in `colorpick.user`)_ `»swp: 'box-shadow 0«.5s ease-out, top 0.25s ease-out, left 0.25s ease-out',`  · ELEMENT:object.setProperty
   6. L171 _(in `options_prefs`)_ `results[i] = ((obj[i])?»obj[i]:((obj[i]==='' && !pOptions[i].ifEmptyReset)?obj[i]:pOptions[i].def«));`  · ELEMENT:member-element-container, ASSIGN:conditional-alternate
   7. L191 `»document.getElementById(i).value = ((localStorage[i] || localStorage[i] === '')?localStorage[i]:pOptions[i].def)«;`  · ELEMENT:member-element-container, ELEMENT:object.setProperty
   8. L198 `»document.getElementById(i).value = ((localStorage[i] || localStorage[i] === '')?localStorage[i]:pAdvOptions[i].def)«;`  · ELEMENT:member-element-container, ELEMENT:object.setProperty

---

## Flow #5 — ELEMENT_VALUE (palette-gen-mode)

- **Source**: `ELEMENT_VALUE` — `options` L920:C35 -> L920:C47  `localStorage['lastPalleteMode'] = »palette_mode«;`
- **Sink(s)**:
  - `CHROME_SYNC_STORAGE` (unknown) — `options` L27:C1 -> L35:C3 (spans to L35)  `»        targ=targ.parentNode;«`
- **Sanitized**: NO
- **Frame**: `OPTIONS_1`

- **Propagation** (310 raw steps → 9 distinct lines):
   1. L920 `localStorage['lastPalleteMode'] = »palette_mode«;`  · ASSIGN:identifier
   2. L712 `if( »selectedValue« == paletteKey ){`  · ASSIGN:identifier, ASSIGN:binary-left
   3. L944 `if( paletteGenData.Modes[»palette_mode«] ){`  · ASSIGN:identifier
   4. L955 `console.error("paletteGenData.Modes", »palette_mode«, "Was UNDEFINED!");`  · ASSIGN:identifier
   5. L947 `for( var r=0,rl=paletteGenData.Modes[»palette_mode«].results.length; r<rl; r++){`  · ASSIGN:identifier
   6. L948 `var result = paletteGenData.Modes[»palette_mode«].results[r];`  · ASSIGN:identifier
   7. L49 `updateSwatc»hSelectionMargi«ns(null);`  · ELEMENT:member-element-container
   8. L47 `arr».src='img«/expanded.png';`  · ELEMENT:object.setProperty
   9. L52 `function sho»w_next_sibling(«n){`  · ELEMENT:member-element-container

---

## Flow #6 — ELEMENT_VALUE (palette-gen-tone)

- **Source**: `ELEMENT_VALUE` — `options` L921:C35 -> L921:C47  `localStorage['lastPalleteTone'] = »palette_tone«;`
- **Sink(s)**:
  - `CHROME_SYNC_STORAGE` (unknown) — `options` L27:C1 -> L35:C3 (spans to L35)  `»        targ=targ.parentNode;«`
- **Sanitized**: NO
- **Frame**: `OPTIONS_1`

- **Propagation** (300 raw steps → 9 distinct lines):
   1. L921 `localStorage['lastPalleteTone'] = »palette_tone«;`  · ASSIGN:identifier
   2. L712 `if( »selectedValue« == paletteKey ){`  · ASSIGN:identifier, ASSIGN:binary-left
   3. L932 `if( paletteGenData.Tones[»palette_tone«] ){`  · ASSIGN:identifier
   4. L933 `toneList = paletteGenData.Tones[»palette_tone«].results;`  · ASSIGN:identifier
   5. L941 `console.error("paletteGenData.Tones", »palette_tone«, "Was UNDEFINED!");`  · ASSIGN:identifier
   6. L945 `var toneList = paletteGenData.Tones[»palette_tone«].results;`  · ASSIGN:identifier
   7. L49 `updateSwatc»hSelectionMargi«ns(null);`  · ELEMENT:member-element-container
   8. L47 `arr».src='img«/expanded.png';`  · ELEMENT:object.setProperty
   9. L52 `function sho»w_next_sibling(«n){`  · ELEMENT:member-element-container

---
