// Channel-stats button + popover: appears between our Steam-topup button and
// Twitch's native follow-button on streamer channel pages.
//
// Architecture — mirrors twitch.content.js (the proven Steam-button pattern):
//   * Button visibility is decoupled from data. As long as we're on a channel
//     page with the action row in DOM, the button is inserted. Data loads in
//     the background. Earlier versions gated insertion on dataCache, which
//     made the button silently disappear when GQL was slow, errored, or
//     returned no videos — every flake symptom the operator hit.
//   * Single updateForPage() called from every signal (initial load, SPA-nav,
//     MutationObserver hit, follow-click, settings change, watchdog tick).
//     Idempotent — if the button is already in the right container, no-op.
//   * Channel-video fetch is single-flight + storage-cached (24h via
//     common/stats/twitchGql.js) so repeated triggers don't stampede.
//   * Popover handles three data states: loading (in-flight), empty (channel
//     has no VODs), error (GQL failed) — each with appropriate UI.
//
// SPA navigation hook: we cannot intercept history.pushState from an isolated
// content script (Twitch dispatches it in MAIN world). Two complementary
// signals catch URL changes:
//   (1) MutationObserver — fires URL check on every DOM mutation
//   (2) lightweight setInterval(1.5s) watchdog — cheap fallback for SPA-nav
//       that doesn't add/remove DOM nodes our observer cares about
//
// Gated by settings.enable1080p — same toggle as the rest of the extension.

(async function () {
  let initContentScript, gql, heatmap, games;
  try {
    ({ initContentScript } = await import(chrome.runtime.getURL('common/initContentScript.js')));
    gql = await import(chrome.runtime.getURL('common/stats/twitchGql.js'));
    heatmap = await import(chrome.runtime.getURL('common/stats/heatmapRenderer.js'));
    games = await import(chrome.runtime.getURL('common/stats/gamesRenderer.js'));
  } catch (err) {
    console.error('[ggsel-stats] failed to load modules', err);
    return;
  }

  let ctx;
  try {
    ctx = await initContentScript();
  } catch (err) {
    console.error('[ggsel-stats] initContentScript failed', err);
    return;
  }
  let settings = ctx.settings;
  const { getSettings, sendAnalyticsEvent } = ctx;

  const BTN_ID = 'ggsel-stats-btn';
  const POPOVER_ID = 'ggsel-stats-popover';
  const FOLLOW_BUTTON_SELECTOR = "button[data-a-target='follow-button']";
  const UNFOLLOW_BUTTON_SELECTOR = "button[data-a-target='unfollow-button']";
  const MINI_CONTAINER_SELECTOR = 'div.Layout-sc-1xcs6mc-0.dCFkna';
  const BIG_CONTAINER_SELECTOR = 'div.Layout-sc-1xcs6mc-0.hxpxxi';
  const STEAM_WRAP_SELECTOR = 'div[data-ext-ggsel="1"]';
  const SETTINGS_KEYS = new Set(['apiBase', 'enable1080p']);
  const OBSERVER_DEBOUNCE_MS = 150;
  const POPOVER_MARGIN = 8;
  const WATCHDOG_INTERVAL_MS = 1500;

  const CALENDAR_SVG = `
    <svg class="ggsel-stats-btn-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <rect x="3" y="4" width="18" height="18" rx="2.5"/>
      <line x1="16" y1="2" x2="16" y2="6"/>
      <line x1="8" y1="2" x2="8" y2="6"/>
      <line x1="3" y1="10" x2="21" y2="10"/>
    </svg>
  `.trim();

  // --- State ---
  // currentChannel tracks the channel we *think* we're on. Updated by URL
  // check in updateForPage; consulted by ensureData() to guard against
  // late-arriving fetches for a previous channel (staleness via initGen).
  let currentChannel = null;
  let initGen = 0;
  // dataCache shapes: null (not yet loaded) | { matrix, games, summary } | { empty: true }
  let dataCache = null;
  // Single-flight: while a fetch is in flight, ensureData returns the same
  // promise. Cleared on resolve/reject in a finally.
  let dataFetchInFlight = null;
  // Last fetch error (kept around so popover can show a retry UI).
  let dataFetchError = null;
  let activeTab = 'schedule';
  let observerDebounceTimer = null;
  let observer = null;

  const SKIP_PATHS = new Set(['directory', 'downloads', 'jobs', 'p', 'settings',
    'subscriptions', 'inventory', 'wallet', 'drops', 'friends', 'moderator', 'u', 'videos', 'clip']);

  function getChannelFromURL() {
    try {
      const segments = location.pathname.split('/').filter(Boolean);
      if (segments.length === 0) return null;
      const candidate = segments[0].toLowerCase();
      if (SKIP_PATHS.has(candidate)) return null;
      if (!/^[a-z0-9_]+$/.test(candidate)) return null;
      return candidate;
    } catch (_) {
      return null;
    }
  }

  // Detect Twitch theme by reading body background luminance. The .tw-root--theme-light
  // class is unreliable — child stacking contexts can hide it; Twitch has renamed it
  // before. Luminance > 128 → light theme. Falls back to dark on any read failure.
  function isLightTheme() {
    try {
      const bg = getComputedStyle(document.body).backgroundColor;
      const m = bg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
      if (!m) return false;
      const lum = 0.299 * (+m[1]) + 0.587 * (+m[2]) + 0.114 * (+m[3]);
      return lum > 128;
    } catch (_) {
      return false;
    }
  }

  function findFollowEl() {
    return document.querySelector(FOLLOW_BUTTON_SELECTOR)
      || document.querySelector(UNFOLLOW_BUTTON_SELECTOR);
  }

  // Mirrors getContainer() in twitch.content.js — same multi-fallback approach
  // so the stats button lands in the exact same row as the Steam-topup button.
  // dCFkna = mini row (when following). hxpxxi = wide row (when not following).
  function getContainer() {
    const unfollowBtn = document.querySelector(UNFOLLOW_BUTTON_SELECTOR);
    if (unfollowBtn) {
      return (
        unfollowBtn.closest(MINI_CONTAINER_SELECTOR)
        || unfollowBtn.closest('div.Layout-sc-1xcs6mc-0')
        || document.querySelector(MINI_CONTAINER_SELECTOR)
      );
    }
    const followBtn = document.querySelector(FOLLOW_BUTTON_SELECTOR);
    if (followBtn) {
      return (
        followBtn.closest(BIG_CONTAINER_SELECTOR)
        || followBtn.closest('div.Layout-sc-1xcs6mc-0')
        || document.querySelector(BIG_CONTAINER_SELECTOR)
      );
    }
    return document.querySelector(MINI_CONTAINER_SELECTOR)
      || document.querySelector(BIG_CONTAINER_SELECTOR)
      || null;
  }

  function createButton() {
    const btn = document.createElement('button');
    btn.id = BTN_ID;
    btn.className = 'ggsel-stats-btn';
    if (isLightTheme()) btn.classList.add('ggsel-stats-btn--light');
    btn.type = 'button';
    btn.title = 'Статистика стримера: расписание и игры';
    btn.setAttribute('aria-label', 'Статистика стримера');
    btn.innerHTML = CALENDAR_SVG;
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      togglePopover();
    });
    return btn;
  }

  function applyThemeToButton() {
    const btn = document.getElementById(BTN_ID);
    if (!btn) return;
    const light = isLightTheme();
    btn.classList.toggle('ggsel-stats-btn--light', light);
    // Override Twitch's inline-`!important` row background on light theme.
    // Inline `!important` wins over any external CSS, so the only way to
    // neutralize it is to write a stronger inline value of our own.
    const host = btn.parentElement;
    if (host) {
      if (light) {
        host.style.setProperty('background-color', 'transparent', 'important');
      } else {
        host.style.removeProperty('background-color');
      }
    }
  }

  function removeAll() {
    document.getElementById(BTN_ID)?.remove();
    closePopover();
  }

  function closePopover() {
    document.getElementById(POPOVER_ID)?.remove();
    document.removeEventListener('click', onOutsideClick, true);
    document.removeEventListener('keydown', onKeydown);
    window.removeEventListener('resize', positionPopover);
    window.removeEventListener('scroll', positionPopover, true);
  }

  function onOutsideClick(e) {
    const popover = document.getElementById(POPOVER_ID);
    const btn = document.getElementById(BTN_ID);
    if (!popover) return;
    if (popover.contains(e.target) || btn?.contains(e.target)) return;
    closePopover();
  }

  function onKeydown(e) {
    if (e.key === 'Escape') closePopover();
  }

  function trackOpen() {
    try {
      sendAnalyticsEvent?.('ggsel_stats_open', {
        channel_name: currentChannel || undefined,
        page_location: location.href.split('#')[0],
      });
    } catch (_) {
      // analytics is best-effort
    }
  }

  function togglePopover() {
    if (document.getElementById(POPOVER_ID)) {
      closePopover();
      return;
    }
    openPopover();
  }

  function openPopover() {
    trackOpen();

    const popover = document.createElement('div');
    popover.id = POPOVER_ID;
    popover.className = 'ggsel-stats-popover';
    popover.setAttribute('role', 'dialog');
    if (isLightTheme()) popover.classList.add('ggsel-stats-popover--light');

    const header = document.createElement('div');
    header.className = 'ggsel-stats-popover-header';

    const seg = document.createElement('div');
    seg.className = 'ggsel-stats-segmented';
    seg.setAttribute('role', 'tablist');
    seg.appendChild(makeTab('schedule', 'Расписание'));
    seg.appendChild(makeTab('games', 'История игр'));
    header.appendChild(seg);

    const closeBtn = document.createElement('button');
    closeBtn.className = 'ggsel-stats-popover-close';
    closeBtn.type = 'button';
    closeBtn.setAttribute('aria-label', 'Закрыть');
    closeBtn.textContent = '✕';
    closeBtn.addEventListener('click', closePopover);
    header.appendChild(closeBtn);
    popover.appendChild(header);

    const body = document.createElement('div');
    body.className = 'ggsel-stats-popover-body';
    popover.appendChild(body);

    const footer = document.createElement('div');
    footer.className = 'ggsel-stats-popover-footer';
    footer.textContent = 'По данным последних 100 трансляций Twitch';
    popover.appendChild(footer);

    document.body.appendChild(popover);
    renderActiveTab(body);
    positionPopover();

    // If we don't have data yet, kick off a fetch and re-render when it lands.
    // The popover stays open through this — the user sees a loader → either
    // real content or a friendly empty/error message.
    if (!dataCache && currentChannel) {
      ensureData(currentChannel)
        .catch(() => { /* error is surfaced via dataFetchError; renderActiveTab handles it */ })
        .finally(() => {
          const stillOpen = document.getElementById(POPOVER_ID);
          if (!stillOpen) return;
          const bodyEl = stillOpen.querySelector('.ggsel-stats-popover-body');
          if (bodyEl) renderActiveTab(bodyEl);
        });
    }

    setTimeout(() => {
      document.addEventListener('click', onOutsideClick, true);
    }, 0);
    document.addEventListener('keydown', onKeydown);
    window.addEventListener('resize', positionPopover);
    window.addEventListener('scroll', positionPopover, true);
  }

  function makeTab(tabId, label) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'ggsel-stats-segmented-btn';
    btn.dataset.tab = tabId;
    btn.textContent = label;
    btn.setAttribute('role', 'tab');
    if (activeTab === tabId) btn.classList.add('is-active');
    btn.addEventListener('click', () => {
      activeTab = tabId;
      const popover = document.getElementById(POPOVER_ID);
      if (!popover) return;
      popover.querySelectorAll('.ggsel-stats-segmented-btn').forEach((b) => {
        b.classList.toggle('is-active', b.dataset.tab === tabId);
      });
      const body = popover.querySelector('.ggsel-stats-popover-body');
      if (body) renderActiveTab(body);
    });
    return btn;
  }

  // Renders one of four states inside the popover body:
  //   1) loading — data fetch in flight, no cache yet
  //   2) error — last fetch failed, with a "Retry" button
  //   3) empty — channel has no VODs (legitimate result, not an error)
  //   4) data — render the active tab against dataCache
  function renderActiveTab(bodyEl) {
    bodyEl.innerHTML = '';
    const theme = isLightTheme() ? 'light' : 'dark';

    // State 1: loading
    if (!dataCache && dataFetchInFlight) {
      const loader = document.createElement('div');
      loader.className = 'ggsel-stats-popover-status';
      loader.textContent = 'Загрузка данных…';
      bodyEl.appendChild(loader);
      return;
    }

    // State 2: error with retry
    if (!dataCache && dataFetchError) {
      const err = document.createElement('div');
      err.className = 'ggsel-stats-popover-status';
      err.textContent = 'Не удалось загрузить статистику.';
      const retry = document.createElement('button');
      retry.type = 'button';
      retry.className = 'ggsel-stats-popover-retry';
      retry.textContent = 'Попробовать снова';
      retry.addEventListener('click', () => {
        dataFetchError = null;
        if (currentChannel) {
          ensureData(currentChannel)
            .catch(() => {})
            .finally(() => {
              const stillOpen = document.getElementById(POPOVER_ID);
              const body = stillOpen?.querySelector('.ggsel-stats-popover-body');
              if (body) renderActiveTab(body);
            });
          // Re-render immediately to show the loader.
          renderActiveTab(bodyEl);
        }
      });
      err.appendChild(document.createElement('br'));
      err.appendChild(retry);
      bodyEl.appendChild(err);
      return;
    }

    // State 3: empty (channel has no VODs)
    if (dataCache && dataCache.empty) {
      const empty = document.createElement('div');
      empty.className = 'ggsel-stats-popover-status';
      empty.textContent = 'У этого канала пока нет записей трансляций.';
      bodyEl.appendChild(empty);
      return;
    }

    // State 4: actual data
    if (dataCache) {
      if (activeTab === 'schedule') {
        bodyEl.appendChild(heatmap.render(dataCache.matrix, dataCache.summary, { theme }));
      } else {
        bodyEl.appendChild(games.render(dataCache.games));
      }
      return;
    }

    // Fallback: no data and no in-flight request → show generic loader.
    // This branch shouldn't be reached in normal flow (openPopover kicks off
    // a fetch when dataCache is null), but it's a safety net.
    const fallback = document.createElement('div');
    fallback.className = 'ggsel-stats-popover-status';
    fallback.textContent = 'Загрузка…';
    bodyEl.appendChild(fallback);
  }

  function positionPopover() {
    const popover = document.getElementById(POPOVER_ID);
    const btn = document.getElementById(BTN_ID);
    if (!popover || !btn) return;
    const rect = btn.getBoundingClientRect();
    const popRect = popover.getBoundingClientRect();
    const viewportW = window.innerWidth;
    const viewportH = window.innerHeight;

    let top = rect.bottom + POPOVER_MARGIN;
    let left = rect.left;
    if (left + popRect.width > viewportW - POPOVER_MARGIN) {
      left = Math.max(POPOVER_MARGIN, rect.right - popRect.width);
    }
    if (left < POPOVER_MARGIN) left = POPOVER_MARGIN;
    if (top + popRect.height > viewportH - POPOVER_MARGIN && rect.top - popRect.height - POPOVER_MARGIN > 0) {
      top = rect.top - popRect.height - POPOVER_MARGIN;
    }
    popover.style.top = `${Math.round(top)}px`;
    popover.style.left = `${Math.round(left)}px`;
  }

  // Mirrors twitch.content.js ensureButtonDynamic: idempotent — if the button
  // is already in the right container, refresh theme; otherwise insert (or
  // move) it. Anchor priorities:
  //   1) After our Steam-topup wrap (so order is [Steam] [Stats] [Follow])
  //   2) Before the follow/unfollow wrap (resolving up to direct child of row)
  //   3) Append at end
  function insertButton() {
    const row = getContainer();
    if (!row) return;

    let btn = document.getElementById(BTN_ID);
    if (btn && btn.parentElement === row) {
      applyThemeToButton();
      return;
    }
    if (btn) btn.remove();
    btn = createButton();

    const steamWrap = row.querySelector(STEAM_WRAP_SELECTOR);
    if (steamWrap && steamWrap.parentElement === row) {
      row.insertBefore(btn, steamWrap.nextSibling);
    } else {
      const follow = findFollowEl();
      let anchor = follow;
      while (anchor && anchor.parentElement !== row) anchor = anchor.parentElement;
      if (anchor) {
        row.insertBefore(btn, anchor);
      } else {
        row.appendChild(btn);
      }
    }
    applyThemeToButton();
  }

  // Single-flight wrapper around the GQL fetch. Returns the same promise for
  // concurrent callers. Staleness check via initGen: if the channel changed
  // mid-fetch, the result is discarded.
  async function ensureData(channel) {
    if (dataCache && currentChannel === channel) return dataCache;
    if (dataFetchInFlight) return dataFetchInFlight;

    const myGen = ++initGen;
    dataFetchInFlight = (async () => {
      try {
        const videos = await gql.getChannelVideos(channel);
        if (myGen !== initGen) return null; // channel changed during fetch
        if (!videos || videos.length === 0) {
          dataCache = { empty: true };
        } else {
          dataCache = {
            videos,
            matrix: heatmap.buildMatrix(videos),
            games: gql.aggregateGames(videos),
            summary: gql.aggregateSummary(videos),
          };
        }
        dataFetchError = null;
        return dataCache;
      } catch (err) {
        if (myGen !== initGen) return null;
        console.warn('[ggsel-stats] channel-videos fetch failed', err);
        dataFetchError = err;
        dataCache = null;
        return null;
      } finally {
        dataFetchInFlight = null;
      }
    })();
    return dataFetchInFlight;
  }

  // The Steam-pattern entry point. Idempotent, called from every signal.
  // Responsibilities:
  //   1. Detect channel from URL; if it changed, reset cache/state.
  //   2. Bail (and remove button) when not on a channel page or settings off.
  //   3. Insert (or re-position) the button if the action row is in DOM.
  //   4. Kick off a background data fetch if we don't have data yet.
  // Note: button visibility is intentionally NOT gated on dataCache — Steam
  // pattern. The popover handles loading/empty/error states when opened.
  function updateForPage() {
    if (!settings.enable1080p) {
      removeAll();
      return;
    }
    const channel = getChannelFromURL();
    if (!channel) {
      removeAll();
      currentChannel = null;
      dataCache = null;
      dataFetchError = null;
      return;
    }
    if (channel !== currentChannel) {
      currentChannel = channel;
      dataCache = null;
      dataFetchError = null;
      activeTab = 'schedule';
      initGen++; // invalidate any in-flight fetch for the previous channel
    }
    if (!getContainer()) return; // observer / watchdog will retry
    insertButton();
    // Best-effort background fetch. Errors are surfaced through dataFetchError
    // → popover renders a retry UI. Button stays visible regardless.
    if (!dataCache && !dataFetchInFlight) {
      ensureData(channel).catch(() => { /* surfaced in popover */ });
    }
  }

  function scheduleUpdateForPage() {
    if (observerDebounceTimer) return;
    observerDebounceTimer = setTimeout(() => {
      observerDebounceTimer = null;
      updateForPage();
    }, OBSERVER_DEBOUNCE_MS);
  }

  function startObserver() {
    if (observer) observer.disconnect();
    observer = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (m.type !== 'childList') continue;
        const hit = [...m.addedNodes].some((node) => {
          if (node.nodeType !== 1) return false;
          return node.matches?.(FOLLOW_BUTTON_SELECTOR)
            || node.querySelector?.(FOLLOW_BUTTON_SELECTOR)
            || node.matches?.(UNFOLLOW_BUTTON_SELECTOR)
            || node.querySelector?.(UNFOLLOW_BUTTON_SELECTOR)
            || node.matches?.(STEAM_WRAP_SELECTOR)
            || node.querySelector?.(STEAM_WRAP_SELECTOR);
        });
        if (hit) {
          scheduleUpdateForPage();
          break;
        }
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }

  // Twitch re-renders the action row on every follow/unfollow click. Without
  // this listener the stats button silently disappears after the user toggles
  // follow. Same recovery trick twitch.content.js uses for the Steam wrap.
  function startFollowClickListener() {
    document.addEventListener('click', (ev) => {
      const el = ev.target;
      if (!el || !el.closest) return;
      if (el.closest(FOLLOW_BUTTON_SELECTOR) || el.closest(UNFOLLOW_BUTTON_SELECTOR)) {
        setTimeout(() => scheduleUpdateForPage(), 300);
      }
    }, true);
  }

  // Watchdog covers:
  //   (a) initial bootstrap on channel deep-link before observer attaches
  //   (b) SPA-navigations that didn't trigger our observer in time
  //   (c) Twitch theme toggle (we refresh --light modifier here)
  // Cost: one URL read + one ID lookup per tick. Real work only fires on change.
  function startWatchdog() {
    setInterval(() => {
      applyThemeToButton();
      updateForPage();
    }, WATCHDOG_INTERVAL_MS);
  }

  window.addEventListener('locationchange', updateForPage);
  window.addEventListener('popstate', updateForPage);

  chrome.storage.onChanged.addListener(async (changes, areaName) => {
    if (areaName !== 'sync') return;
    const touches = Object.keys(changes).some((k) => SETTINGS_KEYS.has(k));
    if (!touches) return;
    settings = await getSettings();
    updateForPage();
  });

  // Initial bootstrap — single entry point, same as Steam-button.
  updateForPage();
  startObserver();
  startWatchdog();
  startFollowClickListener();
})();
