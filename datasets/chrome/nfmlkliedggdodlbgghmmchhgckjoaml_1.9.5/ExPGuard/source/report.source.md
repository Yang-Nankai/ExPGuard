# Source-level Taint Flow — nfmlkliedggdodlbgghmmchhgckjoaml 1.9.5

- Source type: CRX
- Files with issues: 10 / 17
- Distinct taint flows: 3  (collapsed from 14 raw issue entries)
- Sinkless sources skipped: 28 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — WINDOW_MESSAGE_EVENT (window.addEventListener(message))

- **Source**: `WINDOW_MESSAGE_EVENT` — `opt/yt_autocomment` L754:C30 -> L754:C45  `if (event.data && »event.data.type« === 'blockify-promo-result') {`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (promo_commented_videos) — `opt/yt_autocomment` L337:C12 -> L340:C14 (spans to L340)  `»chrome.storage.local.set({«`
- **Sanitized**: NO
- **Frame**: `CS_2`

- **Propagation** (40 raw steps → 8 distinct lines):
   1. L754 `if (»event.data && event.data.type === 'blockify-promo-result'«) {`  · ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right
   2. L755 `if (»event.data.success«) {`  · ELEMENT:member-element
   3. L756 `saveCommentedVideo(»event.data.videoId«);`  · ELEMENT:member-element
   4. L332 `commentedVideos.push(»videoId«);`  · ASSIGN:identifier
   5. L331 `let »commentedVideos = result.promo_commented_videos || []«;`  · ELEMENT:object.setProperty
   6. L334 `if (»commentedVideos.length« > 100) {`  · ELEMENT:member.length, ASSIGN:binary-left
   7. L335 `commentedVideos = »commentedVideos.slice«(-100);`  · ELEMENT:member-element-container
   8. L337 (→L340) `»            chrome.storage.local.set({«`  · ELEMENT:object.setProperty

---

## Flow #2 — WINDOW_MESSAGE_EVENT (From storage.local.set('promo_commented_videos') in opt/yt_autocomment)  ·  12× duplicate paths collapsed

- **Source**: `WINDOW_MESSAGE_EVENT` — `opt/yt_autocomment` L754:C30 -> L754:C45  `if (event.data && »event.data.type« === 'blockify-promo-result') {`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (promo_commented_videos) — `opt/yt_autocomment` L337:C12 -> L340:C14 (spans to L340)  `»chrome.storage.local.set({«`
- **Sanitized**: NO
- **Frame**: `CS_2`

- **Propagation** (59 raw steps → 10 distinct lines):
   1. L754 `if (»event.data && event.data.type === 'blockify-promo-result'«) {`  · ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right
   2. L755 `if (»event.data.success«) {`  · ELEMENT:member-element
   3. L756 `saveCommentedVideo(»event.data.videoId«);`  · ELEMENT:member-element
   4. L332 `»commentedVideos.push(videoId)«;`  · ASSIGN:identifier, ELEMENT:member-element-container, ELEMENT:member-element, RETURN:fallback-return
   5. L331 `let »commentedVideos = result.promo_commented_videos || []«;`  · ELEMENT:object.setProperty, ASSIGN:logical-left
   6. L334 `if (»commentedVideos.length« > 100) {`  · ELEMENT:member.length, ASSIGN:binary-left
   7. L335 `commentedVideos = »commentedVideos.slice(-100)«;`  · ELEMENT:member-element-container, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:identifier
   8. L337 (→L340) `»            chrome.storage.local.set({«`  · ELEMENT:object.setProperty
   9. L330 (→L341) `»        chrome.storage.local.get(['promo_commented_videos'], function (result) {«`  · STORAGE:STORAGE_FLOW[area: local, key: promo_commented_videos, sender: opt/yt_autocomment, receiver: opt/yt_autocomment]
  10. L338 `'promo_commented_videos': »commentedVideos«,`  · ASSIGN:identifier

---

## Flow #3 — WINDOW_MESSAGE_EVENT (window.addEventListener(message))

- **Source**: `WINDOW_MESSAGE_EVENT` — `twitch_utils` L464:C24 -> L464:C38  `if (»event.data.key« == 'FetchRequest') {`
- **Sink(s)**:
  - `WINDOW_POSTMESSAGE` ([UNKNOWN ORIGIN]) — `twitch_utils` L2584:C12 -> L2584:C56  `»worker.postMessage({key: key, value: value})«;`
  - `WINDOW_POSTMESSAGE` ([UNKNOWN ORIGIN]) — `twitch_utils` L467:C24 -> L470:C26 (spans to L470)  `»this.postMessage({«`
- **Sanitized**: NO
- **Frame**: `MAIN_twitch_utils`

- **Propagation** (405 raw steps → 36 distinct lines):
   1. L464 `if (»event.data.key« == 'FetchRequest') {`  · ELEMENT:member-element, ASSIGN:binary-left
   2. L465 `const fetchRequest = »event.data.value«;`  · ELEMENT:member-element
   3. L466 `const responseData = await handleWorkerFetchRequest(»fetchRequest«);`  · ASSIGN:identifier
   4. L2599 (→L2602) `const response = await window.realFetch(»fetchRequest.url, {«`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:object.setProperty
   5. L2600 `»...fetchRequest.options«,`  · ASSIGN:identifier, ELEMENT:member-element, COPY:object-spread
   6. L2633 `if (»url.includes('gql')«) {`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
   7. L2634 `let deviceId = »init.headers['X-Device-Id']«;`  · ELEMENT:member-element
   8. L2684 `if (»url.includes('edge.ads.twitch.tv')«) {`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
   9. L2636 `deviceId = »init.headers['Device-ID']«;`  · ELEMENT:member-element
  10. L2638 `if (»typeof deviceId === 'string' && GQLDeviceID != deviceId«) {`  · ASSIGN:identifier, ASSIGN:binary-right, ASSIGN:logical-right, ASSIGN:binary-left
  11. L2639 `GQLDeviceID = »deviceId«;`  · ASSIGN:identifier
  12. L2642 `if (»typeof init.headers['Client-Version'] === 'string' && init.headers['Client-Version'] !== ClientVersion«) {`  · ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:logical-right
  13. L2640 `postTwitchWorkerMessage('UpdateDeviceId', »GQLDeviceID«);`  · ASSIGN:identifier
  14. L2584 `»worker.postMessage({key: key, value: value})«;`  · ASSIGN:identifier, ELEMENT:object.setProperty
  15. L2643 `postTwitchWorkerMessage('UpdateClientVersion', ClientVersion = »init.headers['Client-Version']«);`  · ELEMENT:member-element
  16. L2645 `if (»typeof init.headers['Client-Session-Id'] === 'string' && init.headers['Client-Session-Id'] !== ClientSession«) {`  · ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:logical-right
  17. L2646 `postTwitchWorkerMessage('UpdateClientSession', ClientSession = »init.headers['Client-Session-Id']«);`  · ELEMENT:member-element
  18. L2648 `if (»typeof init.headers['Client-Integrity'] === 'string' && init.headers['Client-Integrity'] !== ClientIntegrityHeader«) {`  · ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:logical-right
  19. L2649 `postTwitchWorkerMessage('UpdateClientIntegrityHeader', ClientIntegrityHeader = »init.headers['Client-Integrity']«);`  · ELEMENT:member-element
  20. L2651 `if (»typeof init.headers['Authorization'] === 'string' && init.headers['Authorization'] !== AuthorizationHeader«) {`  · ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:logical-right
  21. L2652 `postTwitchWorkerMessage('UpdateAuthorizationHeader', AuthorizationHeader = »init.headers['Authorization']«);`  · ELEMENT:member-element
  22. L2654 `if (»!hasLoggedHeaders && GQLDeviceID && AuthorizationHeader«) {`  · ASSIGN:identifier, ASSIGN:logical-right, ASSIGN:logical-left
  23. L2659 `if (»init && typeof init.body === 'string' && init.body.includes('PlaybackAccessToken') && init.body.includes('picture-by-picture')«) {`  · ASSIGN:logical-left, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:logical-right, ELEMENT:member-element-container
  24. L2662 `if (»ForceAccessTokenPlayerType && typeof init.body === 'string' && init.body.includes('PlaybackAccessToken')«) {`  · ELEMENT:member-element-container, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:logical-right
  25. L2664 `const newBody = »JSON.parse(init.body)«;`  · ELEMENT:member-element-container, RETURN:json.parse
  26. L2673 `if (»newBody?.variables?.playerType && newBody?.variables?.playerType !== ForceAccessTokenPlayerType«) {`  · ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right
  27. L2666 `for (let i = 0; i < »newBody.length«; i++) {`  · ELEMENT:member.length, ASSIGN:binary-right
  28. L2674 `replacedPlayerType = »newBody.variables.playerType«;`  · ELEMENT:member-element
  29. L2667 `if (»newBody[i]?.variables?.playerType && newBody[i]?.variables?.playerType !== ForceAccessTokenPlayerType«) {`  · ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right, ELEMENT:member-element-container
  30. L2678 `if (»replacedPlayerType«) {`  · ASSIGN:identifier
  31. L2668 `replacedPlayerType = »newBody[i].variables.playerType«;`  · ELEMENT:member-element, ELEMENT:member-element-container
  32. L2679 `console.log(»`[AD DEBUG] Replaced '${replacedPlayerType}' player type with '${ForceAccessTokenPlayerType}' player type`«);`  · ASSIGN:identifier, ASSIGN:template-literal
  33. L2680 `init.body = »JSON.stringify(newBody)«;`  · RETURN:json.stringify
  34. L2606 `id: »fetchRequest.id«,`  · ASSIGN:identifier, ELEMENT:member-element
  35. L2605 (→L2615) `»            const responseObject = {«`  · ELEMENT:object.setProperty
  36. L467 (→L470) `»                        this.postMessage({«`  · ELEMENT:object.setProperty

---
