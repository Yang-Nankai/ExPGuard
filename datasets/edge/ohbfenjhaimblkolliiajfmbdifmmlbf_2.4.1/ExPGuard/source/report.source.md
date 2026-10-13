# Source-level Taint Flow — ohbfenjhaimblkolliiajfmbdifmmlbf 2.4.1

- Source type: CRX
- Files with issues: 5 / 6
- Distinct taint flows: 4  (collapsed from 7 raw issue entries)
- Sinkless sources skipped: 15 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — WINDOW_MESSAGE_EVENT (window.addEventListener(message))

- **Source**: `WINDOW_MESSAGE_EVENT` — `content` L4:C51 -> L4:C62  `e.source===window&&"DISCORD_TOKEN_EXTRACTED_EXT"===»e.data.type«&&e.data.token&&sendToken(e.data.token)});let e=null,o=0`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (discordToken) — `content` L1:C72 -> L1:C114  `function sendToken(e){e&&(console.log("[Discord Exporter] Token found"),»chrome.storage.local.set({discordToken:e})«,`
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (11 raw steps → 3 distinct lines):
   1. L4 `»e.source===window&&"DISCORD_TOKEN_EXTRACTED_EXT"===e.data.type&&e.data.token&&sendToken(e.data.token«)});let e=null,o=0`  · ELEMENT:member-element, ASSIGN:binary-right, ASSIGN:logical-right, ASSIGN:logical-left
   2. L1 `function sendToken(e){e&&(console.log("[Discord Exporter] Token found"),»chrome.storage.local.set({discordToken:e})«,`  · ASSIGN:identifier, ELEMENT:object.setProperty
   3. L2 `»chrome.runtime.sendMessage({type:"TOKEN_FOUND",token:e})«)}console.log("[Discord Exporter] Content script loaded"),`  · ASSIGN:identifier, ELEMENT:object.setProperty

---

## Flow #2 — WINDOW_MESSAGE_EVENT (window.addEventListener(message))

- **Source**: `WINDOW_MESSAGE_EVENT` — `background/service-worker` L42:C55 -> L71:C18 (spans to L71)  `console.error("[Service Worker] Cleanup error:",e)}}}),»chrome.runtime.onMessage.addListener((e,r,a)=>{«`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (discordToken) — `background/service-worker` L68:C37 -> L68:C85  `})),"TOKEN_FOUND"===e.type){e.token&&»chrome.storage.local.set({discordToken:e.token})«;let t=r&&r.tab?r.tab.url:null`
  - `FETCH_HEADERS` ([Unknown URL]) — `background/service-worker` L28:C10 -> L28:C86  `},c=await »fetch(`https://discord.com/api/v9/guilds/${n}?with_counts=true`,{headers:i})«;let l=null;if(c.ok){`
  - `FETCH_HEADERS` ([Unknown URL]) — `background/service-worker` L31:C14 -> L31:C75  `const e=await »fetch(`https://discord.com/api/v9/channels/${r}`,{headers:i})«;if(e.ok){const t=await e.json();d={id:t.id,`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (12 raw steps → 5 distinct lines):
   1. L42 (→L71) `»console.error("[Service Worker] Cleanup error:",e)}}}),chrome.runtime.onMessage.addListener((e,r,a)=>{«`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.sender.message[content->background/service-worker]`
   2. L68 `})),"TOKEN_FOUND"===e.type){e.token&&»chrome.storage.local.set({discordToken:e.token})«;let t=r&&r.tab?r.tab.url:null`  · ELEMENT:object.setProperty
   3. L27 (→L28) `;const a=await chrome.storage.local.get(["discordToken"]),s=»t||a.discordToken;if(!s)return;const i={Authorization:s«`  · ASSIGN:identifier, ASSIGN:logical-left, ASSIGN:unary, ELEMENT:object.setProperty
   4. L28 `},»c=await fetch(`https://discord.com/api/v9/guilds/${n}?with_counts=true`,{headers:i})«;let l=null;if(c.ok){`  · ELEMENT:object.setProperty
   5. L31 `const »e=await fetch(`https://discord.com/api/v9/channels/${r}`,{headers:i})«;if(e.ok){const t=await e.json();d={id:t.id,`  · ELEMENT:object.setProperty

---

## Flow #3 — WINDOW_MESSAGE_EVENT (From storage.local.set('discordToken') in content)  ·  2× duplicate paths collapsed

- **Source**: `WINDOW_MESSAGE_EVENT` — `background/service-worker` L4:C51 -> L4:C62  `}),chrome.sidePanel&&chrome.sidePanel.setPanelBehav»ior&&chrome«.sidePanel.setPanelBehavior({openPanelOnActionClick:!0`
- **Sink(s)**:
  - `FETCH_HEADERS` ([Unknown URL]) — `background/service-worker` L28:C10 -> L28:C86  `},c=await »fetch(`https://discord.com/api/v9/guilds/${n}?with_counts=true`,{headers:i})«;let l=null;if(c.ok){`
  - `FETCH_HEADERS` ([Unknown URL]) — `background/service-worker` L31:C14 -> L31:C75  `const e=await »fetch(`https://discord.com/api/v9/channels/${r}`,{headers:i})«;if(e.ok){const t=await e.json();d={id:t.id,`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (30 raw steps → 6 distinct lines):
   1. L4 `»}),chrome.sidePanel&&chrome.sidePanel.setPanelBehavior&&chrome.sidePanel.setPanelBehavior({openPanel«OnActionClick:!0`  · ELEMENT:member-element, ASSIGN:binary-right, ASSIGN:logical-right, ASSIGN:logical-left
   2. L1 _(in `content`)_ `function sendToken(e){e&&(console.log("[Discord Exporter] Token found"),»chrome.storage.local.set({discordToken:e})«,`  · ASSIGN:identifier, ELEMENT:object.setProperty
   3. L2 `»;e.startBackground(),e.onPaid.addListener(e=>{console.lo«g("[Service Worker] User paid!",e),chrome.runtime.sendMessage({`  · ASSIGN:identifier, ELEMENT:object.setProperty
   4. L27 (→L28) `;const a=await »chrome.storage.local.get(["discordToken"]),s=t||a.discordToken;if(!s)return;const i={Authorization:s«`  · STORAGE:STORAGE_FLOW[area: local, key: discordToken, sender: content, receiver: background/service-worker], ASSIGN:logical-right, ASSIGN:identifier, ASSIGN:unary, ELEMENT:object.setProperty
   5. L28 `},»c=await fetch(`https://discord.com/api/v9/guilds/${n}?with_counts=true`,{headers:i})«;let l=null;if(c.ok){`  · ELEMENT:object.setProperty
   6. L31 `const »e=await fetch(`https://discord.com/api/v9/channels/${r}`,{headers:i})«;if(e.ok){const t=await e.json();d={id:t.id,`  · ELEMENT:object.setProperty

---

## Flow #4 — WINDOW_MESSAGE_EVENT (From storage.local.set('discordToken') in background/service-worker)  ·  3× duplicate paths collapsed

- **Source**: `WINDOW_MESSAGE_EVENT` — `background/service-worker` L42:C55 -> L71:C18 (spans to L71)  `console.error("[Service Worker] Cleanup error:",e)}}}),»chrome.runtime.onMessage.addListener((e,r,a)=>{«`
- **Sink(s)**:
  - `FETCH_HEADERS` ([Unknown URL]) — `background/service-worker` L28:C10 -> L28:C86  `},c=await »fetch(`https://discord.com/api/v9/guilds/${n}?with_counts=true`,{headers:i})«;let l=null;if(c.ok){`
  - `FETCH_HEADERS` ([Unknown URL]) — `background/service-worker` L31:C14 -> L31:C75  `const e=await »fetch(`https://discord.com/api/v9/channels/${r}`,{headers:i})«;if(e.ok){const t=await e.json();d={id:t.id,`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (23 raw steps → 5 distinct lines):
   1. L42 (→L71) `»console.error("[Service Worker] Cleanup error:",e)}}}),chrome.runtime.onMessage.addListener((e,r,a)=>{«`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.sender.message[content->background/service-worker]`
   2. L68 `})),"TOKEN_FOUND"===e.type){e.token&&»chrome.storage.local.set({discordToken:e.token})«;let t=r&&r.tab?r.tab.url:null`  · ELEMENT:object.setProperty
   3. L27 (→L28) `;const a=await »chrome.storage.local.get(["discordToken"]),s=t||a.discordToken;if(!s)return;const i={Authorization:s«`  · ASSIGN:identifier, ASSIGN:logical-left, ASSIGN:unary, ELEMENT:object.setProperty, STORAGE:STORAGE_FLOW[area: local, key: discordToken, sender: background/service-worker, receiver: background/service-worker], ASSIGN:logical-right
   4. L28 `},»c=await fetch(`https://discord.com/api/v9/guilds/${n}?with_counts=true`,{headers:i})«;let l=null;if(c.ok){`  · ELEMENT:object.setProperty
   5. L31 `const »e=await fetch(`https://discord.com/api/v9/channels/${r}`,{headers:i})«;if(e.ok){const t=await e.json();d={id:t.id,`  · ELEMENT:object.setProperty

---
