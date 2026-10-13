# Source-level Taint Flow — foccddlibbeccjiobcnakipdpkjiijjp 4.23.0

- Source type: CRX
- Files with issues: 3 / 4
- Distinct taint flows: 3  (collapsed from 3 raw issue entries)
- Sinkless sources skipped: 6 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — WINDOW_MESSAGE_EVENT (window.addEventListener(message))

- **Source**: `WINDOW_MESSAGE_EVENT` — `content` L73:C6 -> L73:C21  `if (»event.data.type« === 'cpftConfigChange' && event.data.changes) {`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (storage.fuzzy.settings) — `content` L75:C4 -> L77:C6 (spans to L77)  `»chrome.storage.local.set(event.data.changes, () => {«`
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (27 raw steps → 2 distinct lines):
   1. L73 `if (»event.data.type === 'cpftConfigChange' && event.data.changes«) {`  · ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right
   2. L75 `chrome.storage.local.set(»event.data.changes«, () => {`  · ELEMENT:member-element

---

## Flow #2 — DOCUMENT_LOCATION (location.pathname)

- **Source**: `DOCUMENT_LOCATION` — `script` L8133:C6 -> L8133:C34  `if (»location.pathname.startsWith«('/i/oauth2/authorize') ||`
- **Sink(s)**:
  - `FETCH_RESOURCE` ([Unknown URL]) — `script` L2824:C25 -> L2837:C5 (spans to L2837)  `let response = await »fetch(«`  (url-control=PARTIAL)
- **Sanitized**: NO
- **Frame**: `MAIN_script`

- **Propagation** (47374 raw steps → 116 distinct lines):
   1. L8133 (→L8135) `if (»location.pathname.startsWith('/i/oauth2/authorize') ||«`  · ELEMENT:member-element, RETURN:fallback-return, ASSIGN:logical-left, ASSIGN:logical-right
   2. L8134 `»location.pathname.startsWith('/oauth/authorize')« ||`  · ELEMENT:member-element, RETURN:fallback-return
   3. L6986 `»location.pathname« != '/i/tweetdeck') {`  · ASSIGN:binary-left
   4. L6983 (→L6986) `»  if (config.redirectToTwitter &&«`  · ASSIGN:logical-right
   5. L6676 `»log('title changed', {title, path: location.pathname})«`  · ELEMENT:object.setProperty
   6. L4127 `if (»config.disableHomeTimeline && location.pathname == PagePaths.HOME«) {`  · ASSIGN:binary-left, ASSIGN:logical-right
   7. L6704 `else if (»mobile && location.pathname == '/i/premium_sign_up'«) {`  · ASSIGN:binary-left, ASSIGN:logical-right
   8. L6709 `else if (»desktop && location.pathname == '/settings' && currentPath != '/settings'«) {`  · ASSIGN:binary-left, ASSIGN:logical-right, ASSIGN:logical-left, ASSIGN:identifier
   9. L6713 `else if (»desktop && location.pathname.match(/^\/messages(?:\/home)?$/) && !currentPath.match(/^\/messages(?:\/home)?$/)«) {`  · ELEMENT:member-element, RETURN:fallback-return, ASSIGN:logical-right, ASSIGN:logical-left, ASSIGN:identifier, ASSIGN:unary
  10. L6717 `else if (»desktop && location.pathname == '/i/chat' && currentPath != '/i/chat'«) {`  · ASSIGN:binary-left, ASSIGN:logical-right, ASSIGN:logical-left, ASSIGN:identifier
  11. L6721 `else if (»location.pathname.startsWith(PagePaths.BOOKMARKS) && !currentPath.startsWith(PagePaths.BOOKMARKS)«) {`  · ELEMENT:member-element, RETURN:fallback-return, ASSIGN:logical-left, ASSIGN:identifier, ASSIGN:unary, ASSIGN:logical-right
  12. L6740 (→L6754) `»location.pathname == PagePaths.TIMELINE_SETTINGS ||«`  · ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right
  13. L6748 `»location.pathname« == ModalPaths.COMPOSE_MESSAGE ||`  · ASSIGN:binary-left
  14. L6752 `»location.pathname« == ModalPaths.COMPOSE_TWEET ||`  · ASSIGN:binary-left
  15. L6738 (→L6755) `»  let hasDesktopModalBeenOpenedOrClosed = desktop && («`  · ASSIGN:logical-right
  16. L6759 `»currentPath == '/i/premium_sign_up' && location.pathname == PagePaths.HOME«`  · ASSIGN:binary-left, ASSIGN:logical-right, ASSIGN:identifier, ASSIGN:logical-left
  17. L6757 (→L6760) `»  let hasDesktopInitialModalBeenClosed = desktop && («`  · ASSIGN:logical-right
  18. L6762 `if (»newPage == currentPage && !hasDesktopInitialModalBeenClosed«) {`  · ASSIGN:identifier, ASSIGN:unary, ASSIGN:logical-right
  19. L6781 `if (»currentPath == PagePaths.SEARCH && location.pathname == PagePaths.SEARCH«) {`  · ASSIGN:binary-left, ASSIGN:logical-right, ASSIGN:identifier, ASSIGN:logical-left
  20. L6795 (→L6797) `»hasDesktopModalBeenOpenedOrClosed ||«`  · ASSIGN:identifier, ASSIGN:logical-left
  21. L6788 (→L6798) `»  if (desktop && currentPage == separatedTweetsTimelineTitle &&«`  · ASSIGN:logical-right
  22. L6809 (→L6814) `if (»location.pathname == PagePaths.HOME &&«`  · ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right
  23. L2578 `return »currentPath« == PagePaths.HOME`  · ASSIGN:identifier, ASSIGN:binary-left
  24. L6810 `»currentPath« != PagePaths.HOME &&`  · ASSIGN:identifier, ASSIGN:binary-left
  25. L2521 `return »currentPath.startsWith(PagePaths.BOOKMARKS)«`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  26. L2533 `return URL_COMMUNITY_RE.test(»currentPath«)`  · ASSIGN:identifier
  27. L2529 `return URL_COMMUNITIES_RE.test(»currentPath«)`  · ASSIGN:identifier
  28. L2549 `return »currentPath == '/explore' || currentPath.startsWith('/explore/')«`  · ASSIGN:identifier, ASSIGN:binary-left, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:logical-left, ASSIGN:logical-right
  29. L2541 `return URL_DISCOVER_COMMUNITIES_RE.test(»currentPath«)`  · ASSIGN:identifier
  30. L2621 `return »isOnExplorePage() || isOnDiscoverCommunitiesPage()«`  · ASSIGN:logical-left
  31. L2570 `return URL_LIST_RE.test(»currentPath«)`  · ASSIGN:identifier
  32. L2590 `return »currentPath.startsWith('/notifications')«`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  33. L2598 `let profilePathUsername = »currentPath.match(URL_PROFILE_RE)?.[1]«`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  34. L2599 `if (»!profilePathUsername«) return false`  · ASSIGN:identifier, ASSIGN:unary
  35. L2601 `return currentPage.toLowerCase().includes(»`${ltr ? '@' : ''}${profilePathUsername.toLowerCase()}${!ltr ? '@' : ''}`«)`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:template-literal
  36. L2553 `return URL_PROFILE_FOLLOWS_RE.test(»currentPath«)`  · ASSIGN:identifier
  37. L2605 `return »currentPath.match(URL_TWEET_INTERACTIONS_RE)?.[1]« == 'quotes'`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:binary-left
  38. L2561 `return URL_TWEET_RE.test(»currentPath«)`  · ASSIGN:identifier
  39. L2609 `return »currentPath.startsWith('/search') || currentPath.startsWith('/hashtag/')«`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:logical-left, ASSIGN:logical-right
  40. L2617 `return »currentPath.startsWith('/settings')«`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  41. L2586 `return »currentPath.startsWith(PagePaths.COMPOSE_TWEET)«`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  42. L6885 `$body.classList.toggle('ComposeTweetPage', »mobile && isOnComposeTweetPage()«)`  · ASSIGN:logical-right
  43. L2525 `return »currentPath.startsWith('/i/chat')«`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  44. L6890 `if (»!isOnChatPage() && !isOnGrokPage() && !isOnMessagesPage() && !isOnSettingsPage()«) {`  · ASSIGN:unary, ASSIGN:logical-left, ASSIGN:logical-right
  45. L2557 `return »currentPath.startsWith('/i/grok')«`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  46. L2582 `return »currentPath.startsWith('/messages')«`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  47. L6908 `if (»config.twitterBlueChecks != 'ignore' && (isOnSearchPage() || isOnExplorePage())«) {`  · ASSIGN:logical-left, ASSIGN:logical-right
  48. L5764 `else if (»isOnNotificationsPage() && $parent.getAttribute('role') == 'link'«) {`  · ASSIGN:logical-left
  49. L7954 `let tab = »currentPath.match(URL_PROFILE_RE)?.[2] || 'tweets'«`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:logical-left
  50. L7955 `log(»`on ${tab} tab`«)`  · ASSIGN:identifier, ASSIGN:template-literal
  51. L7957 `checkSocialContext: »tab == 'tweets' || tab == 'with_replies'«,`  · ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right
  52. L7956 (→L7959) `»  observeTimeline(currentPage, {«`  · ELEMENT:object.setProperty
  53. L7958 `isUserTimeline: »tab« == 'affiliates'`  · ASSIGN:identifier, ASSIGN:binary-left
  54. L3762 `»isTabbed = false«,`  · ELEMENT:destructure-property[isTabbed]
  55. L3763 `»onTabChanged = null«,`  · ELEMENT:destructure-property[onTabChanged]
  56. L3764 `»onTimelineAppeared = null«,`  · ELEMENT:destructure-property[onTimelineAppeared]
  57. L3765 `»tabbedTimelineContainerSelector = null«,`  · ELEMENT:destructure-property[tabbedTimelineContainerSelector]
  58. L3766 `»timelineSelector = Selectors.TIMELINE«,`  · ELEMENT:destructure-property[timelineSelector]
  59. L3769 `let $timeline = await getElement(»timelineSelector«, {`  · ASSIGN:identifier
  60. L2749 `warn(»`stopped waiting for ${name || selector} after ${reason}`«)`  · ASSIGN:identifier, ASSIGN:logical-right, ASSIGN:template-literal
  61. L3787 `»onTimelineAppeared?.()«`  · ASSIGN:identifier, RETURN:fallback-return
  62. L3788 `if (»isTabbed«) {`  · ASSIGN:identifier
  63. L3840 `if (»isTabbed && tabbedTimelineContainerSelector«) {`  · ASSIGN:identifier, ASSIGN:logical-left, ASSIGN:logical-right
  64. L3841 `let $tabbedTimelineContainer = document.querySelector(»tabbedTimelineContainerSelector«)`  · ASSIGN:identifier
  65. L7467 `if (»config.hideVerifiedNotificationsTab && currentPath.endsWith('/verified_followers')«) {`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:logical-right
  66. L7468 `History_replace?.(»currentPath.replace«(/verified_followers$/, 'followers'))`  · ASSIGN:identifier, ELEMENT:member-element-container
  67. L6970 `else if (URL_MEDIAVIEWER_RE.test(»currentPath«)) {`  · ASSIGN:identifier
  68. L6973 `else if (»currentPath.startsWith(PagePaths.PROFILE_SETTINGS)«) {`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  69. L6934 `else if (URL_TWEET_INTERACTIONS_RE.test(»currentPath«)) {`  · ASSIGN:identifier
  70. L2574 `return URL_LISTS_RE.test(»currentPath«)`  · ASSIGN:identifier
  71. L2537 `return URL_COMMUNITY_MEMBERS_RE.test(»currentPath«)`  · ASSIGN:identifier
  72. L2545 `return »currentPath« == PagePaths.DISPLAY_SETTINGS`  · ASSIGN:identifier, ASSIGN:binary-left
  73. L2517 `return »currentPath« == PagePaths.ACCESSIBILITY_SETTINGS`  · ASSIGN:identifier, ASSIGN:binary-left
  74. L6958 `else if (»isOnDisplaySettingsPage() || isOnAccessibilitySettingsPage()«) {`  · ASSIGN:logical-left, ASSIGN:logical-right
  75. L2594 `return »currentPath.startsWith('/i/premium_sign_up')«`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  76. L6742 `»currentPath« == PagePaths.TIMELINE_SETTINGS ||`  · ASSIGN:identifier, ASSIGN:binary-left
  77. L6746 `URL_MEDIA_RE.test(»currentPath«) ||`  · ASSIGN:identifier
  78. L6750 `»currentPath« == ModalPaths.COMPOSE_MESSAGE ||`  · ASSIGN:identifier, ASSIGN:binary-left
  79. L6754 `»currentPath« == ModalPaths.COMPOSE_TWEET`  · ASSIGN:identifier, ASSIGN:binary-left
  80. L2566 `return »screenName != null && screenName == currentPath.match(URL_TWEET_BASE_RE)?.[1]«`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:binary-right, ASSIGN:logical-right
  81. L3031 `return () => path != »currentPath«`  · ASSIGN:identifier, ASSIGN:binary-right
  82. L7385 `let focusedTweetUrlMatch = »location.pathname.match(URL_TWEET_BASE_RE)«`  · ELEMENT:member-element, RETURN:fallback-return
  83. L7386 `let screenName = »focusedTweetUrlMatch?.[1]«`  · ASSIGN:identifier, ELEMENT:member-element
  84. L7387 `let tweetId = »focusedTweetUrlMatch?.[2]«`  · ASSIGN:identifier, ELEMENT:member-element
  85. L7388 `let tweetInfo = getTweetInfo(»tweetId«)`  · ASSIGN:identifier
  86. L2888 `let tweetInfo = tweetEntities[»tweetId«]`  · ASSIGN:identifier
  87. L2894 `warn('tweet entities not found', »tweetId«)`  · ASSIGN:identifier
  88. L2890 `warn('tweet info not found', »tweetId«)`  · ASSIGN:identifier
  89. L7397 `addAccountLocationToFocusedTweet($permalinkBar, »screenName«)`  · ASSIGN:identifier
  90. L3949 `if (»!screenName«) return`  · ASSIGN:identifier, ASSIGN:unary
  91. L3950 `let accountLocation = await getAccountLocation(»screenName«)`  · ASSIGN:identifier
  92. L2822 `if (!accountLocationCache.has(»screenName«)) {`  · ASSIGN:identifier
  93. L2849 `return accountLocationCache.get(»screenName«)`  · ASSIGN:identifier
  94. L2825 `»`/i/api/graphql/XRqGa7EeokUU5kppkh13EA/AboutAccountQuery?variables=${encodeURIComponent(JSON.stringify({screenName}))}`«,`  · ASSIGN:identifier, RETURN:json.stringify, RETURN:encodeURIComponent, ASSIGN:template-literal
  95. L2824 (→L2837) `»    let response = await fetch(«`  · ELEMENT:object.setProperty
  96. L2846 `error(response.status, 'response getting account location for', »screenName«)`  · ASSIGN:identifier
  97. L2841 `accountLocationCache.set(»screenName«, body.data?.user_result_by_screen_name?.result?.about_profile)`  · ASSIGN:identifier
  98. L7406 `»restoreTweetInteractionsLinks({$actionBar, $focusedTweet, tweetInfo, isOwnTweet})«`  · ASSIGN:identifier, ELEMENT:object.setProperty
  99. L7049 `(»config.restoreOtherInteractionLinks && (tweetInfo.retweet_count > 0 || isOwnTweet && tweetInfo.favorite_count > 0)«)`  · ASSIGN:identifier, ASSIGN:logical-left, ASSIGN:logical-right
  100. L7048 (→L7049) `»    (config.restoreQuoteTweetsLink && tweetInfo.quote_count > 0) ||«`  · ASSIGN:logical-right
  101. L7052 `if (»!shouldDisplayLinks || $existingLinks«) {`  · ASSIGN:identifier, ASSIGN:unary, ASSIGN:logical-left
  102. L7053 `if (»!shouldDisplayLinks«) $existingLinks?.remove()`  · ASSIGN:identifier, ASSIGN:unary
  103. L7057 `let tweetLink = »location.pathname.match(URL_TWEET_BASE_RE)?.[0]«`  · ELEMENT:member-element, RETURN:fallback-return
  104. L7061 (→L7066) `${tweetInfo.quote_count > 0 ? `<a id="cpftQuoteTweetsLink" class="quoteTweets" href="${»tweetLink}/quotes" dir="auto" role="link">«`  · ASSIGN:identifier, ASSIGN:template-literal, ASSIGN:conditional-consequent
  105. L7067 (→L7072) `${tweetInfo.retweet_count > 0 ? `<a id="cpftRetweetsLink" data-tab="2" href="${»tweetLink}/retweets" dir="auto" role="link">«`  · ASSIGN:identifier, ASSIGN:template-literal, ASSIGN:conditional-consequent
  106. L7073 (→L7078) `${isOwnTweet && tweetInfo.favorite_count > 0 ? `<a id="cpftLikesLink" data-tab="3" href="${»tweetLink}/likes" dir="auto" role="link">«`  · ASSIGN:identifier, ASSIGN:template-literal, ASSIGN:conditional-consequent
  107. L7058 (→L7081) `»  $actionBar.insertAdjacentHTML('beforebegin', `«`  · ASSIGN:template-literal
  108. L7431 `if (»isOwnTweet«) {`  · ASSIGN:identifier
  109. L5792 `if (»desktop && config.hideTwitterBlueUpsells && location.pathname === '/i/premium_sign_up'«) {`  · ASSIGN:binary-left, ASSIGN:logical-right
  110. L5810 `if (»desktop && config.hideEditImage && location.pathname == PagePaths.PROFILE_SETTINGS«) {`  · ASSIGN:binary-left, ASSIGN:logical-right
  111. L5817 (→L5820) `»  if (isOnHomeTimelinePage() &&«`  · ASSIGN:logical-left
  112. L5876 `»location.pathname.startsWith(ModalPaths.COMPOSE_TWEET)«) {`  · ELEMENT:member-element, RETURN:fallback-return
  113. L5875 (→L5876) `»  if (desktop && !isDesktopComposeTweetModalOpen &&«`  · ASSIGN:logical-right
  114. L5899 `»currentPath != location.pathname«) {`  · ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:binary-right
  115. L5897 (→L5899) `»  if (desktop && !isDesktopMediaModalOpen &&«`  · ASSIGN:logical-right
  116. L5890 `if (»config.replaceLogo && isOnHomeTimelinePage()«) {`  · ASSIGN:logical-right

---

## Flow #3 — DOCUMENT_COOKIE (document.cookie)

- **Source**: `DOCUMENT_COOKIE` — `script` L2823:C20 -> L2823:C41  `let csrfToken = »document.cookie.split«('; ').find(c => c.startsWith('ct0='))?.split('=')[1]`
- **Sink(s)**:
  - `FETCH_HEADERS` ([Unknown URL]) — `script` L2824:C25 -> L2837:C5 (spans to L2837)  `let response = await »fetch(«`
- **Sanitized**: NO
- **Frame**: `MAIN_script`

- **Propagation** (287 raw steps → 3 distinct lines):
   1. L2823 `let »csrfToken = document.cookie.split('; ').find(c => c.startsWith('ct0='))?.split('=')[1]«`  · ELEMENT:member-element-container, ELEMENT:string.split, ELEMENT:object.setProperty, ELEMENT:array.find, ELEMENT:member-element, RETURN:fallback-return
   2. L2834 `»...(csrfToken && {'x-csrf-token': csrfToken})«,`  · ASSIGN:identifier, ASSIGN:logical-left, COPY:object-spread
   3. L2824 (→L2837) `»    let response = await fetch(«`  · ELEMENT:object.setProperty

---
