(async function () {
  const { initContentScript } = await import(chrome.runtime.getURL('common/initContentScript.js'));
  const { fetchTopupLink } = await import(chrome.runtime.getURL('common/fetchGameData.js'));
  const { fetchSteamGameLink } = await import(chrome.runtime.getURL('common/steamGameData.js'));
  const { openGgselLink } = await import(chrome.runtime.getURL('common/openLink.js'));
  const twitchGame = await import(chrome.runtime.getURL('common/twitchGameButton.js'));
  const ctx = await initContentScript();
  let settings = ctx.settings;
  const { getSettings, backgroundFetchJson, sendAnalyticsEvent, touchMonthlyActive, createUsageTracker, recoverOrphanedUsageSession, DEFAULT_UTM_SOURCE, buildGgselUrl } = ctx;
  const {
    TWITCH_GAME_BUTTON_VARIANT,
    TWITCH_GAME_LOOKUP_FALLBACK_MS,
    TWITCH_TOPUP_BUTTON_VARIANT,
    buildTwitchGameButtonUrl,
    buildTwitchTopupButtonUrl,
    createTwitchGameButtonFlow,
    getEligibleTwitchGameTitle,
    makeTwitchButtonKey,
    normalizeTwitchGameTitle,
    sanitizeTwitchPageLocation,
    shouldSkipTwitchButtonReconcile,
  } = twitchGame;
  if (!settings.apiBase) return;

  // If a previous tab crashed mid-session, finalize that session before
  // starting a fresh tracker. Fire-and-forget — the new tracker doesn't
  // need to wait for this to complete.
  try { recoverOrphanedUsageSession?.(); } catch (_) { /* best effort */ }

  // Mini controls container (visible when following)
  const MINI_CONTAINER_SELECTOR = 'div.Layout-sc-1xcs6mc-0.dCFkna';
  // Wide follow container (visible when not following)
  const BIG_CONTAINER_SELECTOR = 'div.Layout-sc-1xcs6mc-0.hxpxxi';
  // Follow/unfollow buttons
  const FOLLOW_BUTTON_SELECTOR = "button[data-a-target='follow-button']";
  const UNFOLLOW_BUTTON_SELECTOR = "button[data-a-target='unfollow-button']";
  const FOLLOW_BTN_SELECTOR = MINI_CONTAINER_SELECTOR;
  const WRAP_ATTR = 'data-ext-ggsel';
  const ACTIONS_CONTAINER_ATTR = 'data-ext-ggsel-actions';
  const TOPUP_BUTTON_LABEL = 'Пополнить Steam';
  const STREAM_GAME_LINK_SELECTOR = 'a[data-a-target="stream-game-link"]';
  // Settings live in chrome.storage.sync; analytics buffer / usage tracker
  // live in chrome.storage.local and are written many times per second across
  // all tabs. Without this filter, every analytics push remounts the button
  // in every Twitch tab — quadratic CPU growth per extra tab.
  const SETTINGS_KEYS = new Set(['apiBase', 'enable1080p']);
  // MutationObserver fires hundreds of times per second on Twitch SPA. Even
  // with the early-bail in updateForPage, querying the DOM that often costs
  // CPU and the cost compounds across tabs. 150ms coalesces bursts without
  // visibly delaying the button (Twitch's own follow-button takes longer).
  const OBSERVER_DEBOUNCE_MS = 150;
  const LOGO_SVG = `<svg class="ggsel-twitch-btn__logo" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><circle class="ggsel-twitch-btn__circle" cx="10" cy="10" r="10"/><path class="ggsel-twitch-btn__path" d="M14.6979 14.3404L11.0395 16.4038C10.7086 16.5872 10.3336 16.6779 9.95465 16.6662C9.57568 16.6544 9.20708 16.5407 8.88841 16.3372L5.27879 14.2137C4.94101 14.0138 4.6612 13.7307 4.46657 13.392C4.27195 13.0532 4.16913 12.6703 4.16814 12.2805L4.16813 8.1212C4.15419 7.74581 4.24366 7.37371 4.42696 7.04485C4.61026 6.71603 4.88046 6.44284 5.20858 6.25462L9.35476 3.9162C9.60381 3.77035 9.89761 3.71838 10.1822 3.76984C10.4669 3.8213 10.7232 3.97271 10.9043 4.19632C10.995 4.32173 11.0582 4.46458 11.0899 4.61565C11.1215 4.76671 11.121 4.92268 11.0882 5.07352C11.0554 5.22446 10.9912 5.36686 10.8997 5.49151C10.808 5.61629 10.6911 5.72071 10.5564 5.79806L6.80653 7.91292C6.67955 7.98502 6.57411 8.08913 6.50093 8.21472C6.42777 8.3403 6.38946 8.48283 6.38994 8.62782L6.38807 11.8283C6.38817 11.9746 6.4266 12.1183 6.49963 12.2453C6.57263 12.3724 6.67772 12.4785 6.80455 12.5533L9.58307 14.1857C9.70865 14.2601 9.85189 14.3002 9.99824 14.302C10.1446 14.3038 10.2888 14.2671 10.4162 14.1957L13.1938 12.6291C13.3208 12.557 13.4263 12.4529 13.4995 12.3273C13.5728 12.2017 13.6111 12.0592 13.6107 11.9141L13.6111 9.51429L11.1556 10.8992C10.9114 11.0409 10.6228 11.0878 10.3456 11.031C10.0684 10.9741 9.82233 10.8176 9.65488 10.5915C9.56421 10.4661 9.50101 10.3233 9.46938 10.1722C9.43769 10.0212 9.4383 9.86524 9.47104 9.71441C9.5038 9.56357 9.56803 9.42117 9.65958 9.29639C9.75117 9.17162 9.86806 9.06718 10.0027 8.98981L14.1336 6.66007C14.3043 6.5576 14.4995 6.50226 14.6991 6.4997C14.8986 6.49712 15.0952 6.54743 15.2686 6.64544C15.442 6.74344 15.5857 6.88556 15.685 7.05712C15.7843 7.22863 15.8355 7.42338 15.8333 7.62107L15.8325 12.4208C15.8287 12.811 15.722 13.1934 15.5229 13.5302C15.3239 13.8669 15.0395 14.1462 14.6979 14.3404Z"/></svg>`;

  let reqCounter = 0;
  let observer;
  let lastVisitLocation = null;
  let lastButtonKey = null;
  let lastReconcileKey = null;
  let currentFlow = null;

  // Stream session tracker per spec section 6.2: fires _start after >5s on
  // a channel page, _end on navigation/visibility-hidden/beforeunload.
  let activeStreamSession = null;
  let streamSessionStartTimer = null;
  const STREAM_SESSION_MIN_MS = 5000;

  function generateLocalId() {
    if (globalThis.crypto && typeof globalThis.crypto.randomUUID === 'function') {
      return globalThis.crypto.randomUUID();
    }
    return 'ssn-' + Math.random().toString(16).slice(2) + Date.now().toString(16);
  }

  function invalidateInFlight() {
    reqCounter += 1;
    if (currentFlow) currentFlow.stop();
    currentFlow = null;
    lastReconcileKey = null;
  }

  const usageTracker = createUsageTracker
    ? createUsageTracker({
        source: 'twitch',
        initialEnabled: settings.enable1080p !== false,
        initialContext: buildUsageContext(),
      })
    : null;

  if (usageTracker) {
    usageTracker.notifyContextChange(buildUsageContext(), 'init_context');
    usageTracker.notifyVisibilityChange(!document.hidden, 'init_visibility');
    const handleVisibilityChange = () => {
      usageTracker.notifyVisibilityChange(!document.hidden, 'visibility_change');
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('pagehide', () => usageTracker.flush('pagehide'));
    window.addEventListener('beforeunload', () => usageTracker.flush('beforeunload'));
  }

  function getChannelName() {
    try {
      const segments = location.pathname.split('/').filter(Boolean);
      if (segments.length === 0) return null;
      const channelCandidate = segments[0];
      const blocked = ['directory', 'downloads', 'jobs', 'p', 'settings'];
      if (blocked.includes(channelCandidate.toLowerCase())) return null;
      return channelCandidate;
    } catch (_) {
      return null;
    }
  }

  // Game title scraped from the Twitch channel page DOM. The element appears
  // after the player loads and updates if the streamer changes game mid-stream
  // — we read it lazily, so each call returns the freshest value available.
  // Returns null when not on a channel page or when Twitch hasn't rendered
  // the game link yet (early page load).
  function getGameTitle() {
    try {
      const link = document.querySelector(STREAM_GAME_LINK_SELECTOR);
      const title = normalizeTwitchGameTitle(link?.textContent || '');
      return title || null;
    } catch (_) {
      return null;
    }
  }

  function getSafePageLocation() {
    return sanitizeTwitchPageLocation(location);
  }

  function ensureButtonContent(btn) {
    if (!btn) return null;
    let span = btn.querySelector('span.ggsel-twitch-btn__text');
    if (!span) {
      btn.innerHTML = LOGO_SVG + '<span class="ggsel-twitch-btn__text"></span>';
      span = btn.querySelector('span.ggsel-twitch-btn__text');
    }
    return span;
  }

  function buildUsageContext() {
    try {
      const pageUrl = getSafePageLocation();
      const channelName = getChannelName();
      const gameTitle = getGameTitle();
      return {
        usage_domain: 'twitch',
        page_location: pageUrl,
        page_path: location.pathname,
        channel_name: channelName || undefined,
        game_title: gameTitle || undefined,
        quality_enabled: settings.enable1080p !== false,
      };
    } catch (_) {
      return { usage_domain: 'twitch' };
    }
  }

  function trackVisit(reason) {
    try {
      const pageUrl = getSafePageLocation();
      usageTracker?.notifyContextChange(buildUsageContext(), reason || 'visit');
      if (pageUrl === lastVisitLocation) return;
      lastVisitLocation = pageUrl;
      const channelName = getChannelName();
      sendAnalyticsEvent('twitch_visit', {
        visit_reason: reason,
        channel_name: channelName || undefined,
        page_location: pageUrl,
        page_path: location.pathname,
      });
      touchMonthlyActive('twitch_visit', {
        visit_reason: reason,
        channel_name: channelName || undefined,
      });
      maybeStartStreamSession(channelName, reason);
    } catch (error) {
      console.warn('Failed to track visit', error);
    }
  }

  function maybeStartStreamSession(channelName, reason) {
    // Switch / leave channel → end the current session before starting a new one
    if (activeStreamSession && activeStreamSession.channelName !== channelName) {
      endStreamSession('navigate');
    }
    if (streamSessionStartTimer) {
      clearTimeout(streamSessionStartTimer);
      streamSessionStartTimer = null;
    }
    if (!channelName) return;
    if (activeStreamSession && activeStreamSession.channelName === channelName) return;
    streamSessionStartTimer = setTimeout(() => {
      streamSessionStartTimer = null;
      // Re-check the channel hasn't changed during the wait.
      if (getChannelName() !== channelName) return;
      const gameTitle = getGameTitle();
      activeStreamSession = {
        sessionId: generateLocalId(),
        startedAt: Date.now(),
        channelName,
        gameTitle,
      };
      sendAnalyticsEvent('stream_session_start', {
        stream_session_id: activeStreamSession.sessionId,
        channel_name: channelName,
        game_title: gameTitle || undefined,
        visit_reason: reason || 'load',
        page_location: getSafePageLocation(),
        page_path: location.pathname,
      });
    }, STREAM_SESSION_MIN_MS);
  }

  function endStreamSession(endReason) {
    if (!activeStreamSession) return;
    const { sessionId, startedAt, channelName, gameTitle } = activeStreamSession;
    activeStreamSession = null;
    const durationMs = Date.now() - startedAt;
    // Re-read game_title at session end — streamer may have switched games.
    // Fall back to the value captured at start so we always have something.
    const finalGameTitle = getGameTitle() || gameTitle || null;
    sendAnalyticsEvent('stream_session_end', {
      stream_session_id: sessionId,
      channel_name: channelName,
      game_title: finalGameTitle || undefined,
      duration_ms: durationMs,
      duration_sec: Math.round(durationMs / 1000),
      end_reason: endReason || 'unknown',
    });
  }

  // Wire end-of-session triggers (close / navigate / hidden tab).
  window.addEventListener('beforeunload', () => endStreamSession('close'));
  window.addEventListener('pagehide', () => endStreamSession('close'));
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) endStreamSession('idle');
  });

  function trackButtonReady({ label, variant, link, utmSource }) {
    try {
      const pageUrl = getSafePageLocation();
      const key = [pageUrl, variant || '', link || ''].join('::');
      if (key === lastButtonKey) return;
      lastButtonKey = key;
      const channelName = getChannelName();
      const gameTitle = getGameTitle();
      sendAnalyticsEvent('ggsel_button_ready', {
        button_text: label,
        button_variant: variant,
        link_url: link || undefined,
        utm_source: utmSource || undefined,
        source_button: 'twitch',
        channel_name: channelName || undefined,
        game_title: gameTitle || undefined,
        page_location: pageUrl,
        page_path: location.pathname,
      });
    } catch (error) {
      console.warn('Failed to track button readiness', error);
    }
  }

  function trackButtonFailed({ variant, reason, error, errorReason }) {
    try {
      sendAnalyticsEvent('ggsel_button_failed', {
        button_variant: variant,
        button_failure_reason: reason,
        error_reason: errorReason || (error?.message ? String(error.message).slice(0, 200) : undefined),
        source_button: 'twitch',
        channel_name: getChannelName() || undefined,
        game_title: getGameTitle() || undefined,
        page_location: getSafePageLocation(),
        page_path: location.pathname,
      });
    } catch (_) {
      // best effort analytics
    }
  }

  // ---------- helpers ----------

  function getContainer() {
    const unfollowBtn = document.querySelector(UNFOLLOW_BUTTON_SELECTOR);
    if (unfollowBtn) {
      return (
        unfollowBtn.closest(MINI_CONTAINER_SELECTOR) ||
        unfollowBtn.closest('div.Layout-sc-1xcs6mc-0') ||
        document.querySelector(MINI_CONTAINER_SELECTOR)
      );
    }
    const followBtn = document.querySelector(FOLLOW_BUTTON_SELECTOR);
    if (followBtn) {
      return (
        followBtn.closest(BIG_CONTAINER_SELECTOR) ||
        followBtn.closest('div.Layout-sc-1xcs6mc-0') ||
        document.querySelector(BIG_CONTAINER_SELECTOR)
      );
    }
    return document.querySelector(MINI_CONTAINER_SELECTOR) || null;
  }

  async function fetchSteamTopupLink(requestId) {
    try {
      const url = await fetchTopupLink(settings.apiBase, backgroundFetchJson);
      if (!url) {
        if (requestId === reqCounter) {
          trackButtonFailed({ variant: TWITCH_TOPUP_BUTTON_VARIANT, reason: 'empty_response' });
        }
        return null;
      }
      return url;
    } catch (e) {
      console.error('Failed to fetch topup link', e);
      if (requestId === reqCounter) {
        trackButtonFailed({ variant: TWITCH_TOPUP_BUTTON_VARIANT, reason: 'fetch_error', error: e });
      }
      return null;
    }
  }

  function removeButton(container) {
    const wraps = Array.from(document.querySelectorAll('div[' + WRAP_ATTR + '="1"]'));
    wraps.forEach(w => w.remove());
    Array.from(document.querySelectorAll('div[' + ACTIONS_CONTAINER_ATTR + '="1"]'))
      .forEach(el => el.removeAttribute(ACTIONS_CONTAINER_ATTR));
  }
  
  function ensureButtonDynamic(container) {
    container.setAttribute(ACTIONS_CONTAINER_ATTR, '1');
    const allWraps = Array.from(document.querySelectorAll('div[' + WRAP_ATTR + '="1"]'));
    let wrap = allWraps[0] || null;
    if (allWraps.length > 1) allWraps.slice(1).forEach(w => w.remove());

    let btn;
    if (!wrap) {
      wrap = document.createElement('div');
      wrap.setAttribute(WRAP_ATTR, '1');
      btn = document.createElement('a');
      btn.className = 'ggsel-twitch-btn';
      btn.innerHTML = LOGO_SVG + '<span class="ggsel-twitch-btn__text"></span>';
      btn.target = '_blank';
      btn.rel = 'noopener noreferrer';
      wrap.appendChild(btn);
    } else {
      btn = wrap.querySelector('a.ggsel-twitch-btn') || (() => {
        const b = document.createElement('a');
        b.className = 'ggsel-twitch-btn';
        b.innerHTML = LOGO_SVG + '<span class="ggsel-twitch-btn__text"></span>';
        b.target = '_blank';
        b.rel = 'noopener noreferrer';
        wrap.appendChild(b);
        return b;
      })();
    }

    if (!btn.dataset.analyticsBound) {
      btn.addEventListener('click', (ev) => {
        if (btn.dataset.buttonState === 'loading' || !btn.href) return;
        ev.preventDefault();
        openGgselLink(btn.dataset.analyticsLink || btn.href).catch((error) => {
          console.warn('Failed to open GGSEL link from Twitch button', error);
        });
        const channelName = getChannelName();
        const gameTitle = getGameTitle();
        sendAnalyticsEvent('ggsel_button_click', {
          button_variant: btn.dataset.buttonVariant || undefined,
          button_text: btn.dataset.buttonLabel || undefined,
          link_url: btn.dataset.analyticsLink || btn.href || undefined,
          utm_source: btn.dataset.utmSource || undefined,
          source_button: 'twitch',
          channel_name: channelName || undefined,
          game_title: gameTitle || undefined,
          page_location: getSafePageLocation(),
          page_path: location.pathname,
        });
        touchMonthlyActive('ggsel_button_click', {
          button_variant: btn.dataset.buttonVariant || undefined,
          channel_name: channelName || undefined,
          game_title: gameTitle || undefined,
        });
      });
      btn.dataset.analyticsBound = '1';
    }

    if (wrap.parentElement !== container) {
      container.insertBefore(wrap, container.firstChild);
    } else if (wrap !== container.firstElementChild) {
      container.insertBefore(wrap, container.firstChild);
    }

    return { wrap, btn };
  }

  function setButtonLoading(btn) {
    const textSpan = ensureButtonContent(btn);
    if (textSpan) textSpan.textContent = '';
    btn.classList.add('ggsel-twitch-btn--loading');
    btn.dataset.buttonState = 'loading';
    delete btn.dataset.buttonLabel;
    delete btn.dataset.buttonVariant;
    delete btn.dataset.utmSource;
    delete btn.dataset.pageUrl;
    delete btn.dataset.analyticsLink;
    btn.setAttribute('aria-busy', 'true');
    btn.setAttribute('aria-disabled', 'true');
    btn.tabIndex = -1;
    btn.removeAttribute('href');
    btn.removeAttribute('target');
    btn.removeAttribute('rel');
  }

  function setButtonReady(btn, { label, variant, href, pageLocation }) {
    const textSpan = ensureButtonContent(btn);
    if (textSpan) textSpan.textContent = label;
    btn.classList.remove('ggsel-twitch-btn--loading');
    btn.dataset.buttonState = variant === TWITCH_GAME_BUTTON_VARIANT ? 'game_price' : 'topup';
    btn.dataset.buttonLabel = label;
    btn.dataset.buttonVariant = variant;
    btn.dataset.utmSource = DEFAULT_UTM_SOURCE;
    btn.dataset.pageUrl = pageLocation;
    try { btn.href = new URL(href, location.href).toString(); } catch { btn.href = href; }
    btn.dataset.analyticsLink = btn.href;
    btn.removeAttribute('aria-busy');
    btn.removeAttribute('aria-disabled');
    btn.tabIndex = 0;
    btn.target = '_blank';
    btn.rel = 'noopener noreferrer';
  }

  async function updateForPage() {
    const container = getContainer();
    if (!container) return;

    const pageLocation = getSafePageLocation();
    const enabled = settings.enable1080p !== false;
    const rawGameTitle = getGameTitle();
    const eligibleGameTitle = getEligibleTwitchGameTitle(rawGameTitle);
    const reconcileKey = makeTwitchButtonKey({
      pageLocation,
      gameTitle: eligibleGameTitle || rawGameTitle || '',
      enabled,
    });

    if (!enabled) {
      invalidateInFlight();
      removeButton(container);
      usageTracker?.notifyContextChange(buildUsageContext(), 'quality_disabled');
      return;
    }

    const existingWrap = document.querySelector('div[' + WRAP_ATTR + '="1"]');
    const already = existingWrap?.querySelector('a.ggsel-twitch-btn') || null;
    if (shouldSkipTwitchButtonReconcile({
      lastKey: lastReconcileKey,
      nextKey: reconcileKey,
      hasButtonInContainer: Boolean(already && existingWrap?.parentElement === container),
    })) return;

    const myReq = ++reqCounter;
    if (currentFlow) currentFlow.stop();
    currentFlow = null;
    lastReconcileKey = reconcileKey;

    currentFlow = createTwitchGameButtonFlow({
      pageLocation,
      pagePath: location.pathname,
      rawGameTitle,
      enabled,
      getTopupUrl: () => fetchSteamTopupLink(myReq),
      getGameLink: (gameTitle) => fetchSteamGameLink(settings.apiBase, backgroundFetchJson, { gameTitle }),
      buildTopupUrl: (rawUrl) => buildTwitchTopupButtonUrl(rawUrl, {
        buildGgselUrl,
        utmSource: DEFAULT_UTM_SOURCE,
      }),
      buildGameUrl: (rawUrl) => buildTwitchGameButtonUrl(rawUrl, {
        buildGgselUrl,
        utmSource: DEFAULT_UTM_SOURCE,
      }),
      render: (payload) => {
        if (myReq !== reqCounter) return;
        const { btn } = ensureButtonDynamic(container);
        if (payload.state === 'loading') {
          setButtonLoading(btn);
          return;
        }
        const label = payload.label || TOPUP_BUTTON_LABEL;
        const variant = payload.variant || TWITCH_TOPUP_BUTTON_VARIANT;
        const href = payload.href;
        if (!href) {
          removeButton(container);
          return;
        }
        setButtonReady(btn, { label, variant, href, pageLocation });
        trackButtonReady({
          label,
          variant,
          link: btn.href,
          utmSource: DEFAULT_UTM_SOURCE,
        });
        usageTracker?.notifyContextChange(buildUsageContext(), 'button_ready');
      },
      trackFailed: ({
        button_variant,
        button_failure_reason,
        error,
        error_reason,
      }) => {
        if (myReq !== reqCounter) return;
        trackButtonFailed({
          variant: button_variant,
          reason: button_failure_reason,
          error,
          errorReason: error_reason,
        });
      },
      setTimer: setTimeout,
      clearTimer: clearTimeout,
      fallbackMs: TWITCH_GAME_LOOKUP_FALLBACK_MS,
    });
  }

  // ---------- observe container/category appearance ----------
  let observerDebounceTimer = null;
  function scheduleUpdateForPage() {
    if (observerDebounceTimer) return;
    observerDebounceTimer = setTimeout(() => {
      observerDebounceTimer = null;
      updateForPage();
    }, OBSERVER_DEBOUNCE_MS);
  }

  function mutationTouchesGameLink(node) {
    if (!node || node.nodeType !== 1) return false;
    return node.matches?.(STREAM_GAME_LINK_SELECTOR) ||
           node.querySelector?.(STREAM_GAME_LINK_SELECTOR) ||
           node.closest?.(STREAM_GAME_LINK_SELECTOR);
  }

  function startObserver() {
    if (observer) observer.disconnect();
    observer = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (m.type === 'characterData') {
          if (m.target?.parentElement?.closest?.(STREAM_GAME_LINK_SELECTOR)) {
            scheduleUpdateForPage();
            break;
          }
          continue;
        }
        if (m.type !== 'childList') continue;
        if (mutationTouchesGameLink(m.target)) {
          scheduleUpdateForPage();
          break;
        }
        const hit = [...m.addedNodes].some(node => {
          if (node.nodeType !== 1) return false;
          return node.matches?.(FOLLOW_BTN_SELECTOR) ||
                 node.querySelector?.(FOLLOW_BTN_SELECTOR) ||
                 node.matches?.(FOLLOW_BUTTON_SELECTOR) ||
                 node.querySelector?.(FOLLOW_BUTTON_SELECTOR) ||
                 node.matches?.(UNFOLLOW_BUTTON_SELECTOR) ||
                 node.querySelector?.(UNFOLLOW_BUTTON_SELECTOR) ||
                 node.matches?.(STREAM_GAME_LINK_SELECTOR) ||
                 node.querySelector?.(STREAM_GAME_LINK_SELECTOR) ||
                 node.closest?.(STREAM_GAME_LINK_SELECTOR);
        });
        if (hit) {
          scheduleUpdateForPage();
          break;
        }
      }
    });
    observer.observe(document.body, { childList: true, characterData: true, subtree: true });
  }

  // ---------- react on SPA navigation ----------
  (function () {
    const ps = history.pushState;
    const rs = history.replaceState;
    const fire = () => window.dispatchEvent(new Event('locationchange'));
    history.pushState = function (...args) { const r = ps.apply(this, args); fire(); return r; };
    history.replaceState = function (...args) { const r = rs.apply(this, args); fire(); return r; };
    window.addEventListener('popstate', fire);
  })();
  window.addEventListener('locationchange', () => {
    invalidateInFlight();
    trackVisit('spa_navigation');
    const container = getContainer();
    if (container) removeButton(container);
    updateForPage();
  });

  chrome.storage.onChanged.addListener(async (changes, areaName) => {
    // Ignore writes to storage.local / storage.session — those carry analytics
    // buffer and usage tracker state, not user settings, and fire dozens of
    // times per second across every Twitch tab.
    if (areaName !== 'sync') return;
    const touchesSettings = Object.keys(changes).some(key => SETTINGS_KEYS.has(key));
    if (!touchesSettings) return;
    settings = await getSettings();
    invalidateInFlight();
    const container = getContainer();
    if (container) removeButton(container);
    usageTracker?.notifyEnabledChange(settings.enable1080p !== false, 'settings_change');
    usageTracker?.notifyContextChange(buildUsageContext(), 'settings_change');
    updateForPage();
  });

  // React to follow/unfollow button clicks to reposition/move our button promptly
  document.addEventListener('click', (ev) => {
    const el = ev.target;
    if (!el || !el.closest) return;
    if (el.closest(FOLLOW_BUTTON_SELECTOR) || el.closest(UNFOLLOW_BUTTON_SELECTOR)) {
      setTimeout(() => updateForPage(), 300);
    }
  }, true);


  trackVisit('initial_load');
  startObserver();
  updateForPage();

  // ---------- add brand badge to quality menu ----------
  (function () {
    const RADIO_SELECTOR = "div[data-a-target='player-settings-menu'] div[role='menuitemradio'] label.ScRadioLabel-sc-1pxozg3-0";
    const BADGE_CLASS = 'ext-quality-badge';
    const LOGO_SVG = `
<svg width="60" height="16" viewBox="0 0 60 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.9985 13.1179L8.483 15.6737C8.0746 15.9009 7.61168 16.0133 7.14396 15.9987C6.6762 15.9842 6.22124 15.8434 5.82792 15.5912L1.37261 12.9608C0.955699 12.7133 0.610331 12.3626 0.370107 11.943C0.129884 11.5234 0.00298354 11.049 0.00175154 10.5662L0.00174353 5.41404C-0.0154645 4.94904 0.0949715 4.48812 0.321215 4.08076C0.547459 3.67344 0.880963 3.33504 1.28595 3.10189L6.40352 0.205272C6.71092 0.0246085 7.07356 -0.0397715 7.42484 0.0239685C7.7762 0.0877124 8.09256 0.275268 8.31604 0.552252C8.42799 0.707608 8.50603 0.884556 8.54512 1.07168C8.58424 1.25881 8.58355 1.452 8.54311 1.63885C8.50262 1.82582 8.42332 2.00222 8.31036 2.15662C8.19728 2.31119 8.05295 2.44053 7.88667 2.53634L3.25828 5.15604C3.10155 5.24536 2.97141 5.37432 2.88108 5.52988C2.79078 5.68544 2.74349 5.862 2.74408 6.0416L2.74177 10.0061C2.7419 10.1872 2.78934 10.3652 2.87947 10.5226C2.96957 10.6801 3.09929 10.8115 3.25584 10.9041L6.68532 12.9262C6.84032 13.0184 7.01712 13.0681 7.19776 13.0703C7.3784 13.0725 7.55636 13.0271 7.7136 12.9386L11.142 10.9981C11.2988 10.9088 11.429 10.7798 11.5194 10.6242C11.6098 10.4686 11.6571 10.292 11.6566 10.1124L11.6571 7.13968L8.62628 8.85515C8.32479 9.03063 7.9686 9.0888 7.62651 9.0184C7.2844 8.948 6.98064 8.75408 6.77396 8.47408C6.66204 8.31868 6.58404 8.14176 6.545 7.95464C6.50588 7.76756 6.50664 7.5744 6.54704 7.38756C6.58748 7.20072 6.66676 7.02432 6.77976 6.86976C6.8928 6.7152 7.03708 6.58584 7.20332 6.49L12.3019 3.60412C12.5126 3.4772 12.7536 3.40864 13 3.40548C13.2462 3.40228 13.4889 3.4646 13.7029 3.586C13.9169 3.7074 14.0943 3.88344 14.2169 4.09596C14.3394 4.3084 14.4026 4.54964 14.3999 4.79452L14.3989 10.74C14.3942 11.2233 14.2625 11.697 14.0168 12.1142C13.7712 12.5313 13.4201 12.8773 12.9985 13.1179Z" fill="#47D651"/>
<path d="M24.32 9.92637V8.68477L24.4096 8.37757V6.58557L24.32 6.31677V4.46077H26.9312V9.82397C26.9312 10.72 26.7221 11.488 26.304 12.128C25.8858 12.768 25.3013 13.2544 24.5504 13.5872C23.808 13.92 22.929 14.0864 21.9136 14.0864C21.2394 14.0864 20.6122 13.9968 20.032 13.8176C19.4602 13.6469 18.8885 13.3909 18.3168 13.0496V11.0784C18.8458 11.4709 19.4005 11.7525 19.9808 11.9232C20.5696 12.1024 21.1584 12.192 21.7472 12.192C22.5834 12.192 23.2192 12.0128 23.6544 11.6544C24.0981 11.296 24.32 10.72 24.32 9.92637ZM21.184 11.0016C20.4928 11.0016 19.8784 10.8608 19.3408 10.5792C18.8032 10.2976 18.3765 9.90504 18.0608 9.40157C17.7536 8.88957 17.6 8.2965 17.6 7.62237C17.6 6.9397 17.7536 6.34664 18.0608 5.84317C18.3765 5.33971 18.8032 4.94717 19.3408 4.66557C19.8784 4.38397 20.4928 4.24317 21.184 4.24317C21.696 4.24317 22.1653 4.32424 22.592 4.48637C23.0186 4.63997 23.3984 4.84904 23.7312 5.11357C24.064 5.36957 24.3413 5.65117 24.5632 5.95837C24.7936 6.25704 24.9685 6.55571 25.088 6.85437C25.2074 7.15304 25.2672 7.41757 25.2672 7.64797C25.2672 7.9637 25.1733 8.31357 24.9856 8.69757C24.8064 9.08157 24.5418 9.4485 24.192 9.79837C23.8421 10.1482 23.4112 10.4384 22.8992 10.6688C22.3957 10.8906 21.824 11.0016 21.184 11.0016ZM22.0672 9.22237C22.5706 9.22237 23.0186 9.0901 23.4112 8.82557C23.8037 8.56104 24.1365 8.15997 24.4096 7.62237C24.128 7.07624 23.7909 6.67517 23.3984 6.41917C23.0058 6.15464 22.5621 6.02237 22.0672 6.02237C21.6917 6.02237 21.3632 6.08637 21.0816 6.21437C20.8085 6.34237 20.5994 6.53011 20.4544 6.77757C20.3093 7.0165 20.2368 7.2981 20.2368 7.62237C20.2368 7.9381 20.3093 8.2197 20.4544 8.46717C20.5994 8.7061 20.8085 8.89384 21.0816 9.03037C21.3546 9.15837 21.6832 9.22237 22.0672 9.22237Z" fill="white"/>
<path d="M34.4765 9.92637V8.68477L34.5661 8.37757V6.58557L34.4765 6.31677V4.46077H37.0877V9.82397C37.0877 10.72 36.8786 11.488 36.4605 12.128C36.0423 12.768 35.4578 13.2544 34.7069 13.5872C33.9645 13.92 33.0855 14.0864 32.0701 14.0864C31.3959 14.0864 30.7687 13.9968 30.1885 13.8176C29.6167 13.6469 29.045 13.3909 28.4733 13.0496V11.0784C29.0023 11.4709 29.557 11.7525 30.1373 11.9232C30.7261 12.1024 31.3149 12.192 31.9037 12.192C32.7399 12.192 33.3757 12.0128 33.8109 11.6544C34.2546 11.296 34.4765 10.72 34.4765 9.92637ZM31.3405 11.0016C30.6493 11.0016 30.0349 10.8608 29.4973 10.5792C28.9597 10.2976 28.533 9.90504 28.2173 9.40157C27.9101 8.88957 27.7565 8.2965 27.7565 7.62237C27.7565 6.9397 27.9101 6.34664 28.2173 5.84317C28.533 5.33971 28.9597 4.94717 29.4973 4.66557C30.0349 4.38397 30.6493 4.24317 31.3405 4.24317C31.8525 4.24317 32.3218 4.32424 32.7485 4.48637C33.1751 4.63997 33.5549 4.84904 33.8877 5.11357C34.2205 5.36957 34.4978 5.65117 34.7197 5.95837C34.9501 6.25704 35.125 6.55571 35.2445 6.85437C35.3639 7.15304 35.4237 7.41757 35.4237 7.64797C35.4237 7.9637 35.3298 8.31357 35.1421 8.69757C34.9629 9.08157 34.6983 9.4485 34.3485 9.79837C33.9986 10.1482 33.5677 10.4384 33.0557 10.6688C32.5522 10.8906 31.9805 11.0016 31.3405 11.0016ZM32.2237 9.22237C32.7271 9.22237 33.1751 9.0901 33.5677 8.82557C33.9602 8.56104 34.293 8.15997 34.5661 7.62237C34.2845 7.07624 33.9474 6.67517 33.5549 6.41917C33.1623 6.15464 32.7186 6.02237 32.2237 6.02237C31.8482 6.02237 31.5197 6.08637 31.2381 6.21437C30.965 6.34237 30.7559 6.53011 30.6109 6.77757C30.4658 7.0165 30.3933 7.2981 30.3933 7.62237C30.3933 7.9381 30.4658 8.2197 30.6109 8.46717C30.7559 8.7061 30.965 8.89384 31.2381 9.03037C31.5111 9.15837 31.8397 9.22237 32.2237 9.22237Z" fill="white"/>
<path d="M46.9754 9.38877C46.9754 9.95197 46.8047 10.4256 46.4634 10.8096C46.122 11.1936 45.6356 11.4837 45.0042 11.68C44.3727 11.8762 43.6132 11.9744 42.7258 11.9744C41.8127 11.9744 41.0106 11.8634 40.3194 11.6416C39.6367 11.4197 39.1034 11.1082 38.7194 10.7072C38.3354 10.3061 38.1306 9.84104 38.105 9.31197H40.7546C40.8143 9.50824 40.9295 9.6789 41.1002 9.82397C41.2794 9.9605 41.514 10.0672 41.8042 10.144C42.0943 10.2122 42.4399 10.2464 42.841 10.2464C43.3615 10.2464 43.754 10.1952 44.0186 10.0928C44.2916 9.99037 44.4282 9.83677 44.4282 9.63197C44.4282 9.46984 44.3258 9.35037 44.121 9.27357C43.9162 9.18824 43.5663 9.12424 43.0714 9.08157L41.7786 8.97917C40.9167 8.91944 40.2298 8.79144 39.7178 8.59517C39.2143 8.39037 38.8516 8.1301 38.6298 7.81437C38.4079 7.4901 38.297 7.12317 38.297 6.71357C38.297 6.15891 38.4676 5.70237 38.809 5.34397C39.1588 4.97704 39.641 4.70397 40.2554 4.52477C40.8783 4.33704 41.6036 4.24317 42.4314 4.24317C43.2506 4.24317 43.9802 4.34984 44.6202 4.56317C45.2602 4.77651 45.7722 5.07517 46.1562 5.45917C46.5402 5.83464 46.762 6.27837 46.8218 6.79037H44.1722C44.1295 6.62824 44.0356 6.48317 43.8906 6.35517C43.7455 6.21864 43.545 6.10771 43.289 6.02237C43.033 5.93704 42.7044 5.89437 42.3034 5.89437C41.834 5.89437 41.4756 5.94557 41.2282 6.04797C40.9892 6.15037 40.8698 6.29544 40.8698 6.48317C40.8698 6.62824 40.9423 6.74344 41.0874 6.82877C41.241 6.9141 41.5226 6.97384 41.9322 7.00797L43.6346 7.13597C44.4794 7.18717 45.145 7.3109 45.6314 7.50717C46.1178 7.6949 46.4634 7.94664 46.6682 8.26237C46.873 8.5781 46.9754 8.95357 46.9754 9.38877Z" fill="white"/>
<path d="M52.2368 11.9744C51.3493 11.9744 50.5557 11.8122 49.856 11.488C49.1648 11.1637 48.6186 10.7114 48.2176 10.1312C47.8165 9.54237 47.616 8.8597 47.616 8.08317C47.616 7.3237 47.808 6.65811 48.192 6.08637C48.576 5.50611 49.1008 5.05384 49.7664 4.72957C50.4405 4.40531 51.2 4.24317 52.0448 4.24317C52.9237 4.24317 53.6704 4.43517 54.2848 4.81917C54.9077 5.19464 55.3856 5.72797 55.7184 6.41917C56.0597 7.11037 56.2304 7.9253 56.2304 8.86397H49.728V7.28957H54.7584L53.9008 7.83997C53.8666 7.4645 53.7728 7.14877 53.6192 6.89277C53.4656 6.62824 53.2608 6.4277 53.0048 6.29117C52.7573 6.15464 52.4586 6.08637 52.1088 6.08637C51.7248 6.08637 51.3962 6.16317 51.1232 6.31677C50.8501 6.47037 50.6368 6.6837 50.4832 6.95677C50.3296 7.2213 50.2528 7.53277 50.2528 7.89117C50.2528 8.35197 50.3552 8.7445 50.56 9.06877C50.7733 9.3845 51.0805 9.6277 51.4816 9.79837C51.8912 9.96904 52.3904 10.0544 52.9792 10.0544C53.5168 10.0544 54.0501 9.9861 54.5792 9.84957C55.1168 9.7045 55.6032 9.50397 56.0384 9.24797V10.912C55.5349 11.2533 54.9589 11.5178 54.3104 11.7056C53.6704 11.8848 52.9792 11.9744 52.2368 11.9744Z" fill="white"/>
<path d="M57.3488 1.91357H59.9728V11.7696H57.3488V1.91357Z" fill="white"/>
</svg>`;

    const style = document.createElement('style');
    style.textContent = `
      .tw-radio {
        display: flex !important;
        flex-direction: column !important;
        align-items: flex-start !important;
        gap: 2px;
      }

      .${BADGE_CLASS} {
        padding-left: 24px !important;
      }

      .${BADGE_CLASS}::before {
        content: 'с помощью ';
        color: white;
        font-weight: normal;
        text-transform: none;
      }
    `;
    document.head.appendChild(style);

    function applyBadge() {
      const labels = Array.from(document.querySelectorAll(RADIO_SELECTOR)).filter(el => {
        const m = (el.textContent || '').match(/(\d{3,4})p/i);
        return m && parseInt(m[1], 10) >= 1080;
      });

      labels.forEach(label => {
        if (label.nextElementSibling?.classList.contains(BADGE_CLASS)) return;
        const badge = document.createElement('span');
        badge.className = BADGE_CLASS;
        badge.innerHTML = LOGO_SVG;
        label.parentNode?.insertBefore(badge, label.nextSibling);
      });
    }

    applyBadge();
    // The quality menu only exists in the DOM while the player-settings popover
    // is open — closed 99% of the viewing session. Without this early bail,
    // every chat message and Twitch SPA mutation (~20-30/sec on busy channels)
    // would wake the observer and run the heavy 3-segment querySelectorAll
    // inside applyBadge, burning ~25-75ms CPU per second per tab for no
    // visible work. document.querySelector with a single attribute selector
    // is O(1) via the browser's optimized lookup, so the check is cheap.
    const QUALITY_MENU_SELECTOR = "div[data-a-target='player-settings-menu']";
    let badgeDebounce = null;
    const badgeObserver = new MutationObserver(() => {
      if (badgeDebounce) return;
      if (!document.querySelector(QUALITY_MENU_SELECTOR)) return;
      badgeDebounce = setTimeout(() => { badgeDebounce = null; applyBadge(); }, 200);
    });
    badgeObserver.observe(document.body, { childList: true, subtree: true });
  })();
})();
