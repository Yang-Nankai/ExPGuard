(function () {
  const STEAM_STORE_HOSTNAME_FOR_BOOT = 'store.steampowered.com';
  const SVG_NS = 'http://www.w3.org/2000/svg';
  const LOGO_PATH_D =
    'M12.9985 13.1179L8.483 15.6737C8.0746 15.9009 7.61168 16.0133 7.14396 15.9987C6.6762 ' +
    '15.9842 6.22124 15.8434 5.82792 15.5912L1.37261 12.9608C0.955699 12.7133 0.610331 12.3626 ' +
    '0.370107 11.943C0.129884 11.5234 0.00298354 11.049 0.00175154 10.5662L0.00174353 5.41404C' +
    '-0.0154645 4.94904 0.0949715 4.48812 0.321215 4.08076C0.547459 3.67344 0.880963 3.33504 ' +
    '1.28595 3.10189L6.40352 0.205272C6.71092 0.0246085 7.07356 -0.0397715 7.42484 0.0239685C' +
    '7.7762 0.0877124 8.09256 0.275268 8.31604 0.552252C8.42799 0.707608 8.50603 0.884556 ' +
    '8.54512 1.07168C8.58424 1.25881 8.58355 1.452 8.54311 1.63885C8.50262 1.82582 8.42332 ' +
    '2.00222 8.31036 2.15662C8.19728 2.31119 8.05295 2.44053 7.88667 2.53634L3.25828 5.15604C' +
    '3.10155 5.24536 2.97141 5.37432 2.88108 5.52988C2.79078 5.68544 2.74349 5.862 2.74408 ' +
    '6.0416L2.74177 10.0061C2.7419 10.1872 2.78934 10.3652 2.87947 10.5226C2.96957 10.6801 ' +
    '3.09929 10.8115 3.25584 10.9041L6.68532 12.9262C6.84032 13.0184 7.01712 13.0681 7.19776 ' +
    '13.0703C7.3784 13.0725 7.55636 13.0271 7.7136 12.9386L11.142 10.9981C11.2988 10.9088 ' +
    '11.429 10.7798 11.5194 10.6242C11.6098 10.4686 11.6571 10.292 11.6566 10.1124L11.6571 ' +
    '7.13968L8.62628 8.85515C8.32479 9.03063 7.9686 9.0888 7.62651 9.0184C7.2844 8.948 6.98064 ' +
    '8.75408 6.77396 8.47408C6.66204 8.31868 6.58404 8.14176 6.545 7.95464C6.50588 7.76756 ' +
    '6.50664 7.5744 6.54704 7.38756C6.58748 7.20072 6.66676 7.02432 6.77976 6.86976C6.8928 ' +
    '6.7152 7.03708 6.58584 7.20332 6.49L12.3019 3.60412C12.5126 3.4772 12.7536 3.40864 13 ' +
    '3.40548C13.2462 3.40228 13.4889 3.4646 13.7029 3.586C13.9169 3.7074 14.0943 3.88344 ' +
    '14.2169 4.09596C14.3394 4.3084 14.4026 4.54964 14.3999 4.79452L14.3989 10.74C14.3942 ' +
    '11.2233 14.2625 11.697 14.0168 12.1142C13.7712 12.5313 13.4201 12.8773 12.9985 13.1179Z';
  const EXCLUDED_STEAM_PATH_PREFIXES_FOR_BOOT = [
    '/checkout',
    '/cart',
    '/account',
    '/login',
    '/join',
    '/twofactor',
    '/parentalsettings',
    '/wishlist',
  ];

  function shouldSkipSteamPageBeforeImports(locationLike = location) {
    const pathname = typeof locationLike?.pathname === 'string' && locationLike.pathname
      ? locationLike.pathname
      : '/';
    const excluded = EXCLUDED_STEAM_PATH_PREFIXES_FOR_BOOT.some((prefix) => (
      pathname === prefix || pathname.startsWith(`${prefix}/`)
    ));
    return locationLike?.hostname !== STEAM_STORE_HOSTNAME_FOR_BOOT || excluded;
  }

  if (shouldSkipSteamPageBeforeImports()) return;

  (async function () {
    const { initContentScript } = await import(chrome.runtime.getURL('common/initContentScript.js'));
    const { fetchTopupLink } = await import(chrome.runtime.getURL('common/fetchGameData.js'));
    const steam = await import(chrome.runtime.getURL('common/steamGameData.js'));
    const { openGgselLink } = await import(chrome.runtime.getURL('common/openLink.js'));

    const ctx = await initContentScript();
    let settings = ctx.settings;
    const {
      getSettings,
      backgroundFetchJson,
      sendAnalyticsEvent,
      touchMonthlyActive,
      DEFAULT_UTM_SOURCE,
      buildGgselUrl,
    } = ctx;
    if (!settings.apiBase) return;

    const GAME_SELECTORS = [
      'div.game_area_purchase_game:not(.demo_above_purchase) div.game_purchase_action',
      'div.game_purchase_action',
    ];
    const BALANCE_SELECTOR = '#global_actions';
    const OBSERVER_DEBOUNCE_MS = 150;
    const WRAP_ATTR = 'data-ext-ggsel-steam-slot';
    const SETTINGS_KEYS = new Set(['apiBase', 'enable1080p']);

    const LABELS = {
      [steam.STEAM_GAME_BUTTON_VARIANT]: 'Купить ключ',
      [steam.STEAM_BALANCE_BUTTON_VARIANT]: 'Пополнить Steam',
    };
    const FALLBACKS = {
      [steam.STEAM_GAME_BUTTON_VARIANT]: steam.STEAM_GAME_FALLBACK_URL,
      [steam.STEAM_BALANCE_BUTTON_VARIANT]: steam.STEAM_WALLET_FALLBACK_URL,
    };
    const CLASSES = {
      [steam.STEAM_GAME_BUTTON_VARIANT]: 'ext-steam-price-btn',
      [steam.STEAM_BALANCE_BUTTON_VARIANT]: 'ext-steam-topup-btn',
    };
    const LOGO_SIZES = {
      [steam.STEAM_GAME_BUTTON_VARIANT]: { w: 12.76, h: 14.13 },
      [steam.STEAM_BALANCE_BUTTON_VARIANT]: { w: 9.58, h: 10.61 },
    };

    let observer;
    let observerDebounceTimer = null;
    let reqCounter = 0;
    const readyKeys = new Set();

    function invalidateInFlight() {
      reqCounter += 1;
    }

    function removeSlot(slot) {
      document.querySelectorAll(`div[${WRAP_ATTR}="${slot}"]`).forEach((node) => node.remove());
    }

    function removeAllSlots() {
      removeSlot(steam.STEAM_GAME_BUTTON_VARIANT);
      removeSlot(steam.STEAM_BALANCE_BUTTON_VARIANT);
    }

    function buildHref(rawUrl, slot) {
      const fallbackUrl = FALLBACKS[slot];
      const source = steam.isSafeHttpUrl(rawUrl) ? rawUrl : fallbackUrl;
      return steam.buildSteamButtonUrl(source, {
        variant: slot,
        buildGgselUrl,
        utmSource: DEFAULT_UTM_SOURCE,
      }) || steam.buildSteamButtonUrl(fallbackUrl, {
        variant: slot,
        buildGgselUrl,
        utmSource: DEFAULT_UTM_SOURCE,
      }) || fallbackUrl;
    }

    function analyticsProps(slot, btn, context = {}, extra = {}) {
      return {
        button_variant: slot,
        button_text: btn?.dataset?.buttonLabel || LABELS[slot],
        link_url: btn?.dataset?.analyticsLink || btn?.href || undefined,
        utm_source: DEFAULT_UTM_SOURCE,
        source_button: 'steam',
        game_title: context.gameTitle || undefined,
        steam_app_id: context.appId || undefined,
        page_location: steam.sanitizePageLocation(location),
        page_path: location.pathname,
        ...extra,
      };
    }

    function trackReady(slot, btn, context) {
      const key = `${steam.sanitizePageLocation(location)}::${slot}`;
      if (readyKeys.has(key)) return;
      readyKeys.add(key);
      sendAnalyticsEvent('ggsel_button_ready', analyticsProps(slot, btn, context));
    }

    function trackFailed(slot, reason, context, error, btn) {
      sendAnalyticsEvent('ggsel_button_failed', analyticsProps(slot, btn, context, {
        button_failure_reason: reason,
        error_reason: error?.message ? String(error.message).slice(0, 200) : undefined,
      }));
    }

    function ensureWrapper(slot, anchor) {
      const wraps = Array.from(document.querySelectorAll(`div[${WRAP_ATTR}="${slot}"]`));
      const wrap = wraps[0] || document.createElement('div');
      wraps.slice(1).forEach((node) => node.remove());
      wrap.setAttribute(WRAP_ATTR, slot);
      if (wrap.parentElement !== anchor || wrap !== anchor.firstElementChild) {
        anchor.insertBefore(wrap, anchor.firstChild);
      }
      return wrap;
    }

    function ensureButtonHref(btn, slot) {
      const currentHref = btn.getAttribute('href') ? btn.href : '';
      if (steam.isSafeHttpUrl(currentHref)) {
        btn.dataset.analyticsLink = steam.isSafeHttpUrl(btn.dataset.analyticsLink)
          ? btn.dataset.analyticsLink
          : currentHref;
        return;
      }

      const href = buildHref(FALLBACKS[slot], slot);
      btn.href = href;
      btn.dataset.analyticsLink = href;
    }

    function ensureButtonLogo(btn, slot) {
      const className = `${CLASSES[slot]}__logo`;
      let logo = btn.querySelector(`.${className}`);
      if (logo) return logo;

      logo = document.createElement('span');
      logo.className = `${CLASSES[slot]}__logo`;

      const svg = document.createElementNS(SVG_NS, 'svg');
      const size = LOGO_SIZES[slot] || LOGO_SIZES[steam.STEAM_GAME_BUTTON_VARIANT];
      svg.setAttribute('width', String(size.w));
      svg.setAttribute('height', String(size.h));
      svg.setAttribute('viewBox', '0 0 15 16');
      svg.setAttribute('fill', 'none');
      svg.setAttribute('aria-hidden', 'true');
      svg.setAttribute('focusable', 'false');

      const path = document.createElementNS(SVG_NS, 'path');
      path.setAttribute('d', LOGO_PATH_D);
      path.setAttribute('fill', 'currentColor');
      svg.appendChild(path);
      logo.appendChild(svg);
      btn.insertBefore(logo, btn.firstChild);
      return logo;
    }

    function updateButtonLabel(btn, slot, label = LABELS[slot]) {
      const text = btn.querySelector(`.${CLASSES[slot]}__text`) || btn.appendChild(document.createElement('span'));
      text.className = `${CLASSES[slot]}__text`;
      text.textContent = label || LABELS[slot];
      btn.dataset.buttonLabel = text.textContent;
      return text.textContent;
    }

    function makeButton(slot, anchor, context) {
      const wrap = ensureWrapper(slot, anchor);
      let btn = wrap.querySelector(`a.${CLASSES[slot]}`);
      if (!btn) {
        wrap.textContent = '';
        btn = document.createElement('a');
        btn.className = CLASSES[slot];
        btn.target = '_blank';
        btn.rel = 'noopener noreferrer';
        wrap.appendChild(btn);
      }
      ensureButtonLogo(btn, slot);
      updateButtonLabel(btn, slot);
      btn.dataset.buttonVariant = slot;
      btn.dataset.utmSource = DEFAULT_UTM_SOURCE;
      btn.dataset.steamAppId = context.appId || '';
      btn.dataset.gameTitle = context.gameTitle || '';
      ensureButtonHref(btn, slot);

      if (!btn.dataset.analyticsBound) {
        btn.addEventListener('click', (ev) => {
          if (!btn.href) return;
          ev.preventDefault();
          openGgselLink(btn.dataset.analyticsLink || btn.href).catch((error) => {
            console.warn('Failed to open GGSEL link from Steam button', error);
          });
          const clickContext = {
            appId: btn.dataset.steamAppId || undefined,
            gameTitle: btn.dataset.gameTitle || undefined,
          };
          const pageLocation = steam.sanitizePageLocation(location);
          sendAnalyticsEvent('ggsel_button_click', analyticsProps(slot, btn, clickContext));
          touchMonthlyActive('ggsel_button_click', {
            button_variant: slot,
            source_button: 'steam',
            game_title: clickContext.gameTitle || undefined,
            steam_app_id: clickContext.appId || undefined,
            page_location: pageLocation,
          });
        });
        btn.dataset.analyticsBound = '1';
      }
      return btn;
    }

    async function refreshGameButton(btn, context, requestId) {
      try {
        const result = await steam.fetchSteamGameLink(settings.apiBase, backgroundFetchJson, context);
        if (requestId !== reqCounter) return;
        if (!result?.url) {
          trackFailed(steam.STEAM_GAME_BUTTON_VARIANT, 'empty_response', context, null, btn);
          trackReady(steam.STEAM_GAME_BUTTON_VARIANT, btn, context);
          return;
        }
        const href = buildHref(result.url, steam.STEAM_GAME_BUTTON_VARIANT);
        btn.href = href;
        btn.dataset.analyticsLink = href;
        updateButtonLabel(
          btn,
          steam.STEAM_GAME_BUTTON_VARIANT,
          steam.formatSteamPriceText(result.price) || LABELS[steam.STEAM_GAME_BUTTON_VARIANT],
        );
        trackReady(steam.STEAM_GAME_BUTTON_VARIANT, btn, context);
      } catch (error) {
        if (requestId === reqCounter) {
          trackFailed(steam.STEAM_GAME_BUTTON_VARIANT, 'fetch_error', context, error, btn);
          trackReady(steam.STEAM_GAME_BUTTON_VARIANT, btn, context);
        }
      }
    }

    async function refreshBalanceButton(btn, context, requestId) {
      try {
        const rawUrl = await fetchTopupLink(settings.apiBase, backgroundFetchJson);
        if (requestId !== reqCounter) return;
        if (!steam.isSafeHttpUrl(rawUrl)) {
          trackFailed(steam.STEAM_BALANCE_BUTTON_VARIANT, 'empty_response', context, null, btn);
          trackReady(steam.STEAM_BALANCE_BUTTON_VARIANT, btn, context);
          return;
        }
        const href = buildHref(rawUrl, steam.STEAM_BALANCE_BUTTON_VARIANT);
        btn.href = href;
        btn.dataset.analyticsLink = href;
        trackReady(steam.STEAM_BALANCE_BUTTON_VARIANT, btn, context);
      } catch (error) {
        if (requestId === reqCounter) {
          trackFailed(steam.STEAM_BALANCE_BUTTON_VARIANT, 'fetch_error', context, error, btn);
          trackReady(steam.STEAM_BALANCE_BUTTON_VARIANT, btn, context);
        }
      }
    }

    async function updateForPage() {
      const requestId = ++reqCounter;
      if (!settings.apiBase || settings.enable1080p === false || !steam.shouldRunOnSteamPage(location)) {
        removeAllSlots();
        return;
      }

      const context = steam.extractSteamContext(document, location);
      const headerAnchor = document.querySelector(BALANCE_SELECTOR);
      if (headerAnchor) {
        const balanceBtn = makeButton(steam.STEAM_BALANCE_BUTTON_VARIANT, headerAnchor, context);
        refreshBalanceButton(balanceBtn, context, requestId);
      } else {
        removeSlot(steam.STEAM_BALANCE_BUTTON_VARIANT);
      }

      const gameAnchor = steam.queryFirstAvailable(document, GAME_SELECTORS);
      if (gameAnchor && (context.appId || context.gameTitle)) {
        const gameBtn = makeButton(steam.STEAM_GAME_BUTTON_VARIANT, gameAnchor, context);
        refreshGameButton(gameBtn, context, requestId);
      } else {
        removeSlot(steam.STEAM_GAME_BUTTON_VARIANT);
      }
    }

    function scheduleUpdateForPage() {
      if (observerDebounceTimer) return;
      observerDebounceTimer = setTimeout(() => {
        observerDebounceTimer = null;
        updateForPage();
      }, OBSERVER_DEBOUNCE_MS);
    }

    (function patchHistory() {
      const pushState = history.pushState;
      const replaceState = history.replaceState;
      const fire = () => window.dispatchEvent(new Event('locationchange'));
      history.pushState = function (...args) {
        const result = pushState.apply(this, args);
        fire();
        return result;
      };
      history.replaceState = function (...args) {
        const result = replaceState.apply(this, args);
        fire();
        return result;
      };
      window.addEventListener('popstate', fire);
    })();

    window.addEventListener('locationchange', () => {
      invalidateInFlight();
      removeAllSlots();
      readyKeys.clear();
      scheduleUpdateForPage();
    });

    chrome.storage.onChanged.addListener(async (changes, areaName) => {
      if (areaName !== 'sync') return;
      if (!Object.keys(changes).some((key) => SETTINGS_KEYS.has(key))) return;
      invalidateInFlight();
      settings = await getSettings();
      removeAllSlots();
      readyKeys.clear();
      scheduleUpdateForPage();
    });

    function startObserver() {
      if (observer) observer.disconnect();
      if (!document.body) return;
      observer = new MutationObserver((mutations) => {
        if (mutations.some((m) => (
          m.type === 'childList' && (m.addedNodes.length || m.removedNodes.length)
        ))) {
          scheduleUpdateForPage();
        }
      });
      observer.observe(document.body, { childList: true, subtree: true });
    }

    startObserver();
    updateForPage();
  })().catch((error) => {
    console.warn('GGSEL Steam content script failed', error);
  });
})();
