/**
 * YouTube Ad Blocker — Content Script
 * 
 * Strategy:
 * LAYER 1 — Inject page-level script to intercept YouTube's player config
 *           and strip ad data BEFORE the player processes it. This prevents
 *           ads from loading entirely = no black screen.
 * LAYER 2 — MutationObserver + DOM cleanup as fallback for any ads that
 *           slip through (banners, overlays, feed ads).
 * LAYER 3 — Rapid skip button clicker + video.currentTime jump for any
 *           video ads that still manage to load.
 */

(() => {
    'use strict';

    let isEnabled = true;
    let lastAdSkipTime = 0;
    let lastNavigationTime = 0;
    const SKIP_INTERVAL_MS = 200; // Fast fallback; main detection is via MutationObserver
    const OBSERVER_THROTTLE_MS = 100;

    // ─── Per-Ad Skip State ──────────────────────────────────────────────
    // Prevents race conditions where forceSkipAd() is called after the ad
    // ends but before the ad-showing class is removed, causing the REAL
    // video to be jumped to the end or played at 100× speed.
    let adSkipState = {
        skipping: false,      // true while we are actively skipping an ad
        jumpedAt: 0,          // timestamp of last currentTime jump
        reported: false,      // true once we've reported this ad as blocked
        jumpComplete: false,  // true after we've jumped to end — blocks re-entry
        muted: false,         // true while we have muted the video for an ad
        preMuted: false,      // muted state before ad (to restore correctly)
    };

    // ─── Selectors ───────────────────────────────────────────────────────
    const AD_SELECTORS = [
        '.ytp-ad-overlay-container',
        '.ytp-ad-overlay-slot',
        '.ytp-ad-text-overlay',
        '.ytp-ad-image-overlay',
        '#player-ads',
        '#masthead-ad',
        '#merch-shelf',
        'ytd-promoted-sparkles-web-renderer',
        'ytd-promoted-sparkles-text-search-renderer',
        'ytd-display-ad-renderer',
        'ytd-statement-banner-renderer',
        'ytd-in-feed-ad-layout-renderer',
        'ytd-ad-slot-renderer',
        'ytd-banner-promo-renderer',
        'ytd-video-masthead-ad-v3-renderer',
        'ytd-primetime-promo-renderer',
        '.ytd-promoted-video-renderer',
        'ytd-companion-slot-renderer',
        'ytd-action-companion-ad-renderer',
        '#offer-module',
        'ytd-engagement-panel-section-list-renderer[target-id="engagement-panel-ads"]',
        // Newer ad formats
        'ytd-shorts-promo-renderer',
        'ytd-rich-shelf-renderer[is-ads]',
        'ytd-player-legacy-desktop-watch-ads-renderer',
        'yt-about-this-ad-renderer',
        // Anti-adblock enforcement overlay
        'ytd-enforcement-message-view-model',
    ];

    const SKIP_BUTTON_SELECTORS = [
        '.ytp-ad-skip-button',
        '.ytp-ad-skip-button-modern',
        '.ytp-ad-skip-button-modern button',
        '.ytp-skip-ad-button',
        'button.ytp-ad-skip-button',
        'button.ytp-ad-skip-button-modern',
        '.ytp-ad-skip-button-container button',
        'button[id^="skip-button"]',
        '[id^="skip-button:"]',
        '.ytp-ad-skip-button-slot button',
        '.ytp-ad-skip-button-slot',
    ];

    const PLAYER_AD_UI_SELECTORS = [
        '.ytp-ad-player-overlay',
        '.ytp-ad-player-overlay-layout',
        '.ytp-ad-player-overlay-instream-info',
        '.ytp-ad-player-overlay-skip-or-preview',
        '.ytp-ad-text',
        '.ytp-ad-message-container',
        '.ytp-ad-preview-container',
        '.ytp-ad-preview-text',
        '.ytp-ad-simple-ad-badge',
        '.ytp-ad-duration-remaining',
        '.ytp-ad-badge',
        '.ytp-ad-visit-advertiser-button',
        '.ytp-ad-module',
    ];

    // Precomputed combined selector — single querySelectorAll instead of 22 separate calls
    const AD_SELECTOR_COMBINED = AD_SELECTORS.join(', ') +
        ', .ytp-ad-badge, .ytp-ad-visit-advertiser-button';

    // ─── Init ────────────────────────────────────────────────────────────
    init();

    async function init() {
        try {
            const response = await chrome.runtime.sendMessage({ type: 'GET_STATE' });
            isEnabled = response?.enabled !== false;
        } catch {
            isEnabled = true;
        }

        if (!isEnabled) return;

        observeDOM();
        startAdSkipper();
        hideAdsCSS();
        interceptPlayerAds();
        startScrollLockWatcher();
        startAutoplayWatcher();

        // Listen for ad interceptions from the page-level script
        window.addEventListener('yt-ad-blocker-intercepted', () => {
            if (isEnabled) reportBlocked(1);
        });
        window.addEventListener('yt-ad-blocker-media-request', (event) => {
            if (!isEnabled) return;
            updateNetworkMediaState(event.detail);
            handleVideoAd();
        });

        // Track navigations to clean up state
        document.addEventListener('yt-navigate-finish', () => {
            console.log('[AdSkipper] Navigation finished. Resetting state.');
            adShowingStartTime = 0;
            resetLikelyAdMediaState();
            resetNetworkMediaState();
            adSkipState.skipping = false;
            adSkipState.reported = false;
            adSkipState.jumpComplete = false;
        });

        chrome.runtime.onMessage.addListener((msg) => {
            if (msg.type === 'STATE_CHANGED') {
                isEnabled = msg.enabled;
                if (!isEnabled) {
                    stopObserving();
                } else {
                    observeDOM();
                    startAdSkipper();
                }
            }
        });
    }

    // ─── LAYER 2: MutationObserver for DOM ad elements ───────────────────
    let observer = null;
    let observerTimeout = null;

    function observeDOM() {
        if (observer) return;

        observer = new MutationObserver(() => {
            if (observerTimeout) return;
            observerTimeout = setTimeout(() => {
                observerTimeout = null;
                if (isEnabled) {
                    removeAdElements();
                    handleVideoAd();
                }
            }, OBSERVER_THROTTLE_MS);
        });

        observer.observe(document.documentElement, {
            childList: true,
            subtree: true,
        });

        removeAdElements();
    }

    function stopObserving() {
        if (observer) {
            observer.disconnect();
            observer = null;
        }
        if (observerTimeout) {
            clearTimeout(observerTimeout);
            observerTimeout = null;
        }
    }

    function removeAdElements() {
        let blockedCount = 0;

        document.querySelectorAll(AD_SELECTOR_COMBINED).forEach((el) => {
            if (el.dataset.adblocked) return;
            el.dataset.adblocked = 'true';
            el.style.setProperty('display', 'none', 'important');
            el.style.setProperty('height', '0', 'important');
            el.style.setProperty('overflow', 'hidden', 'important');
            blockedCount++;
        });

        unlockScroll();

        if (blockedCount > 0) {
            reportBlocked(blockedCount);
        }
    }

    // ─── Scroll Lock Fix ─────────────────────────────────────────────────
    function unlockScroll() {
        const enforcementMessage = document.querySelector('ytd-enforcement-message-view-model');
        if (!enforcementMessage) return;

        const dialog = enforcementMessage.closest('tp-yt-paper-dialog');
        if (dialog) {
            try { dialog.remove(); } catch { }
        }
        try { enforcementMessage.remove(); } catch { }

        // Only remove backdrops when enforcement dialog is present — YouTube uses
        // tp-yt-iron-overlay-backdrop for other UI (comments panel etc.) and we
        // must not touch those.
        document.querySelectorAll('tp-yt-iron-overlay-backdrop').forEach((el) => {
            try { el.remove(); } catch { }
        });

        [document.body, document.documentElement, document.querySelector('ytd-app')].forEach((el) => {
            if (!el) return;
            el.style.removeProperty('overflow');
            el.style.removeProperty('position');
            el.style.removeProperty('top');
            el.style.removeProperty('width');
            el.style.removeProperty('touch-action');
        });
    }

    let scrollLockWatcher = null;
    function startScrollLockWatcher() {
        if (scrollLockWatcher) return;

        const attachWatcher = () => {
            const targets = [
                document.documentElement,
                document.body,
                document.querySelector('ytd-app'),
            ].filter(Boolean);

            if (targets.length === 0) return;

            scrollLockWatcher = new MutationObserver(() => unlockScroll());
            targets.forEach((el) => {
                scrollLockWatcher.observe(el, { attributes: true, attributeFilter: ['style', 'class'] });
            });
            scrollLockWatcher.observe(document.documentElement, { childList: true, subtree: true });
            unlockScroll();
        };

        if (document.body) {
            attachWatcher();
        } else {
            document.addEventListener('DOMContentLoaded', attachWatcher, { once: true });
        }
    }

    // ─── Auto-play Recovery Watcher ──────────────────────────────────────
    let autoplayWatcherInstalled = false;
    function startAutoplayWatcher() {
        if (autoplayWatcherInstalled) return;
        autoplayWatcherInstalled = true;

        // When YouTube blocks an ad, it sometimes forcefully pauses the player right
        // after it loads. We watch for this and force it back to playing.
        document.addEventListener('yt-navigate-finish', () => {
            const player = document.querySelector('.html5-video-player');
            if (!player) return;
            const video = player.querySelector('video');
            if (!video) return;

            // Only try to auto-resume during the first few seconds of a new video
            const checkAndPlay = () => {
                if (!isEnabled) return;
                if (video.currentTime < 2 && video.paused && !player.classList.contains('ad-showing')) {
                    try {
                        video.play();
                    } catch (e) { }
                }
            };

            setTimeout(checkAndPlay, 500);
            setTimeout(checkAndPlay, 1500);
        });
    }

    let adShowingStartTime = 0;
    let mediaAdStartTime = 0;
    let lastLikelyAdRequestKey = '';
    let networkMediaState = {
        active: false,
        cpn: '',
        id: '',
        url: '',
        startedAt: 0,
        lastSeenAt: 0,
        isAd: false,
    };

    // ─── Multi-Signal Ad Verification ────────────────────────────────────
    function isElementVisible(el) {
        if (!el) return false;
        // Check that the element is actually rendered and visible, not just
        // present in the DOM (YouTube keeps structural ad containers around
        // permanently with display:none or zero size).
        if (el.offsetHeight === 0 && el.offsetWidth === 0) return false;
        const style = getComputedStyle(el);
        return style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0';
    }

    // Sustained-presence threshold for destructive actions (jump to end).
    // YouTube briefly flashes ad-showing during SPA navigation (~50-100ms)
    // when inject.js strips ad data. 150ms safely filters those out.
    const AD_CONFIRM_MS = 150;

    function resetLikelyAdMediaState() {
        mediaAdStartTime = 0;
        lastLikelyAdRequestKey = '';
    }

    function resetNetworkMediaState() {
        networkMediaState = {
            active: false,
            cpn: '',
            id: '',
            url: '',
            startedAt: 0,
            lastSeenAt: 0,
            isAd: false,
        };
    }

    function updateNetworkMediaState(detail) {
        if (!detail || typeof detail !== 'object') return;

        const now = Date.now();
        const cpn = detail.cpn || '';
        const id = detail.id || '';
        const url = detail.url || '';

        if (detail.isAd) {
            const isSameSignal =
                networkMediaState.active &&
                networkMediaState.isAd &&
                networkMediaState.cpn === cpn &&
                networkMediaState.id === id;

            if (!isSameSignal) {
                networkMediaState.startedAt = now;
            }

            networkMediaState.active = true;
            networkMediaState.isAd = true;
            networkMediaState.cpn = cpn;
            networkMediaState.id = id;
            networkMediaState.url = url;
            networkMediaState.lastSeenAt = now;
            return;
        }

        // Any non-ad videoplayback request means the player has switched to
        // the actual content stream, so stale ad-media state can be dropped.
        resetNetworkMediaState();
    }

    function getNetworkAdMediaState(player) {
        if (!networkMediaState.active || !networkMediaState.isAd) {
            return { matched: false, confirmed: false, safeToJump: false };
        }

        if (Date.now() - networkMediaState.lastSeenAt > 120000) {
            resetNetworkMediaState();
            return { matched: false, confirmed: false, safeToJump: false };
        }

        const video = player?.querySelector('video');
        const dur = video?.duration;
        const safeToJump = !!dur && !isNaN(dur) && isFinite(dur) && dur > 0 && dur <= 120;

        return {
            matched: true,
            confirmed: Date.now() - networkMediaState.startedAt >= AD_CONFIRM_MS,
            safeToJump,
        };
    }

    // HAR analysis showed that ad media requests consistently carry ctier=L
    // (and sometimes oad/adformat), while normal content videoplayback URLs
    // do not. Use that as a high-confidence fallback when ad-showing is late
    // or never appears.
    function getLikelyAdMediaState(player) {
        const networkState = getNetworkAdMediaState(player);
        if (networkState.matched) return networkState;

        const video = player?.querySelector('video');
        if (!video) {
            resetLikelyAdMediaState();
            return { matched: false, confirmed: false, safeToJump: false };
        }

        const src = video.currentSrc || video.src;
        if (!src) {
            resetLikelyAdMediaState();
            return { matched: false, confirmed: false, safeToJump: false };
        }

        let url;
        try {
            url = new URL(src);
        } catch {
            resetLikelyAdMediaState();
            return { matched: false, confirmed: false, safeToJump: false };
        }

        const isYouTubeMedia =
            /(^|\.)googlevideo\.com$/i.test(url.hostname) &&
            url.pathname.includes('/videoplayback');
        const hasAdParams =
            url.searchParams.get('ctier') === 'L' ||
            url.searchParams.has('oad') ||
            url.searchParams.has('adformat');

        if (!isYouTubeMedia || !hasAdParams) {
            resetLikelyAdMediaState();
            return { matched: false, confirmed: false, safeToJump: false };
        }

        const dur = video.duration;
        const durationLooksAd = !Number.isFinite(dur) || dur <= 120;
        if (!durationLooksAd) {
            resetLikelyAdMediaState();
            return { matched: false, confirmed: false, safeToJump: false };
        }

        const requestKey = [
            url.searchParams.get('cpn') || '',
            url.searchParams.get('id') || '',
            url.searchParams.get('ctier') || '',
            url.searchParams.get('oad') || '',
            url.searchParams.get('adformat') || '',
        ].join(':');

        if (requestKey !== lastLikelyAdRequestKey) {
            lastLikelyAdRequestKey = requestKey;
            mediaAdStartTime = Date.now();
        }

        return {
            matched: true,
            confirmed: Date.now() - mediaAdStartTime >= AD_CONFIRM_MS,
            safeToJump: !!dur && !isNaN(dur) && isFinite(dur) && dur > 0 && dur <= 120,
        };
    }

    function hasPlayerAdUi(player) {
        return PLAYER_AD_UI_SELECTORS.some((sel) => !!player.querySelector(sel));
    }

    function isConfirmedAd(player) {
        // 1) Primary signal — the ad-showing / ad-interrupting class
        const isAdClass = player.classList.contains('ad-showing') ||
                          player.classList.contains('ad-interrupting');

        // 2) Skip buttons are a 100% guarantee — instant confirm
        for (const sel of SKIP_BUTTON_SELECTORS) {
            const btn = document.querySelector(sel);
            if (btn && isElementVisible(btn)) {
                if (adShowingStartTime === 0) adShowingStartTime = Date.now();
                return true;
            }
        }

        const mediaState = getLikelyAdMediaState(player);
        if (mediaState.confirmed && (hasPlayerAdUi(player) || mediaState.safeToJump)) {
            return true;
        }

        // Without the ad-showing class we never confirm
        if (!isAdClass) {
            adShowingStartTime = 0;
            return false;
        }

        // Record when ad-showing first appeared
        if (adShowingStartTime === 0) {
            adShowingStartTime = Date.now();
        }

        // Confirmed after AD_CONFIRM_MS sustained presence
        return (Date.now() - adShowingStartTime >= AD_CONFIRM_MS);
    }

    // ─── Ad Progress Bar Hiding ─────────────────────────────────────────
    // Hides all yellow ad-related progress / chrome elements via inline
    // styles (beats any CSS specificity). Restores when ad ends.
    const AD_PROGRESS_SELECTORS = [
        '.ytp-play-progress',
        '.ytp-scrubber-container',
        '.ytp-progress-bar-container',
        '.ytp-chrome-bottom',
        '.ytp-ad-persistent-progress-bar-container',
        '.ytp-progress-list',
    ];

    function hideAdProgressBar(player, hide) {
        for (const sel of AD_PROGRESS_SELECTORS) {
            const el = player.querySelector(sel);
            if (!el) continue;
            if (hide) {
                el.style.setProperty('opacity', '0', 'important');
                el.style.setProperty('visibility', 'hidden', 'important');
            } else {
                el.style.removeProperty('opacity');
                el.style.removeProperty('visibility');
            }
        }
    }

    // ─── LAYER 3: Fallback Video Ad Skip ─────────────────────────────────
    function handleVideoAd() {
        const player = document.querySelector('.html5-video-player');
        if (!player) return;

        // Try to skip UI button first (always safe)
        clickSkipButton();

        if (isConfirmedAd(player)) {
            forceSkipAd(player);
        }
    }

    function forceSkipAd(player) {
        if (adSkipState.jumpComplete) return;

        clickSkipButton();

        const hasAdClass = player.classList.contains('ad-showing') ||
            player.classList.contains('ad-interrupting');
        const mediaState = getLikelyAdMediaState(player);
        const hasMediaFallback =
            mediaState.confirmed && (hasPlayerAdUi(player) || mediaState.safeToJump);

        // Primary path is still ad-showing/ad-interrupting, but allow a safe
        // fallback when the media URL itself already matches the ad request.
        if (!hasAdClass && !hasMediaFallback) {
            return;
        }

        const video = player.querySelector('video');
        if (video) {
            const dur = video.duration;
            const isDurationSafe = dur && !isNaN(dur) && isFinite(dur) && dur > 0 && dur <= 120;

            if (isDurationSafe) {
                // Ensure muted (observer does it at 0ms, but belt-and-suspenders)
                video.muted = true;
                video.volume = 0;

                // Speed up + jump to end in one shot
                try { video.playbackRate = 16; } catch { }
                video.currentTime = dur;
                adSkipState.jumpComplete = true;
                adSkipState.jumpedAt = Date.now();
            }
        }

        if (!adSkipState.reported) {
            adSkipState.reported = true;
            adSkipState.skipping = true;
            reportBlocked(1);
        }
    }

    function clickSkipButton() {
        for (const selector of SKIP_BUTTON_SELECTORS) {
            const btn = document.querySelector(selector);
            if (btn) {
                console.log(`[AdSkipper] Found skip button (${selector}). Attempting click.`);
                // Use native .click() — synthetic dispatchEvent has isTrusted:false
                // which YouTube's newer skip buttons ignore.
                try { btn.click(); } catch (e) { console.error('[AdSkipper] Click throw:', e); }
                return true;
            }
        }
        return false;
    }

    let skipperInterval = null;

    function startAdSkipper() {
        if (skipperInterval) return;

        skipperInterval = setInterval(() => {
            if (!isEnabled) {
                clearInterval(skipperInterval);
                skipperInterval = null;
                return;
            }
            handleVideoAd();
        }, SKIP_INTERVAL_MS);
    }

    // ─── Player Interception (instant reaction to class changes) ─────────
    function interceptPlayerAds() {
        const applyOverrides = () => {
            const player = document.querySelector('.html5-video-player');
            // Guard: only attach once per player element instance.
            // YouTube SPA reuses the same .html5-video-player node across navigations,
            // so without this check every yt-navigate-finish would stack a new observer.
            if (!player || player._adBlockObserving) return;
            player._adBlockObserving = true;

            let confirmTimer = null;

            // Reacts to ad-showing class changes on the player.
            // Strategy: IMMEDIATELY mute + hide (CSS handles hiding),
            // then confirm and jump to end after AD_CONFIRM_MS.
            const playerObserver = new MutationObserver(() => {
                if (!isEnabled) return;

                const isAdClass = player.classList.contains('ad-showing') ||
                                  player.classList.contains('ad-interrupting');

                if (isAdClass) {
                    // ── INSTANT (0ms) ── safe & reversible ──────────
                    const video = player.querySelector('video');
                    if (video && !adSkipState.muted) {
                        adSkipState.preMuted = video.muted;
                        video.muted = true;
                        video.volume = 0;
                        adSkipState.muted = true;
                    }
                    // Hide yellow ad progress bar & bottom chrome via inline
                    // styles — CSS alone can't beat YouTube's inline specificity.
                    hideAdProgressBar(player, true);
                    clickSkipButton();

                    // Record the start time for the sustained check
                    if (adShowingStartTime === 0) {
                        adShowingStartTime = Date.now();
                    }

                    // ── CONFIRMED (AD_CONFIRM_MS) ── destructive ────
                    if (isConfirmedAd(player)) {
                        forceSkipAd(player);
                    } else if (!confirmTimer) {
                        // Schedule a check once the threshold is reached
                        confirmTimer = setTimeout(() => {
                            confirmTimer = null;
                            if (isConfirmedAd(player)) {
                                forceSkipAd(player);
                            }
                        }, AD_CONFIRM_MS + 10);
                    }
                } else {
                    // ── AD ENDED or false positive ──────────────────
                    if (confirmTimer) { clearTimeout(confirmTimer); confirmTimer = null; }
                    adShowingStartTime = 0;
                    resetLikelyAdMediaState();
                    hideAdProgressBar(player, false);

                    const video = player.querySelector('video');
                    if (video) {
                        if (video.playbackRate > 8) video.playbackRate = 1;
                        // Restore muted state to what it was before the ad
                        if (adSkipState.muted) {
                            video.muted = adSkipState.preMuted || false;
                            adSkipState.muted = false;
                        }
                    }
                    adSkipState.skipping = false;
                    adSkipState.reported = false;
                    adSkipState.jumpComplete = false;
                }
            });

            playerObserver.observe(player, {
                attributes: true,
                attributeFilter: ['class'],
            });

            // ─── SSAI Ad UI Observer ──────────────────────────────────
            // Observes the video-ads container directly for Server-Side injected UI
            const observeAdUIContainers = () => {
                if (!isEnabled) return;
                const containers = player.querySelectorAll('.video-ads, .ytp-ad-module, .ytd-player-legacy-desktop-watch-ads-renderer');
                containers.forEach(container => {
                    if (container._uiObserving) return;
                    container._uiObserving = true;
                    console.log('[AdSkipper] Attached observer to SSAI container.');
                    
                    const uiObserver = new MutationObserver(() => {
                        if (!isEnabled) return;
                        // Only click skip buttons here (safe). The main player class
                        // observer handles forceSkipAd — calling it from SSAI container
                        // mutations was a source of false positives.
                        clickSkipButton();
                    });
                    uiObserver.observe(container, { childList: true, subtree: true });
                });
            };
            observeAdUIContainers();
            // Fallback interval to attach to late-injected containers
            let uiCheckInterval = setInterval(observeAdUIContainers, 2000);

            // Video event hooks
            const hookVideo = () => {
                const video = player.querySelector('video');
                if (!video || video._adBlockHooked) return;
                video._adBlockHooked = true;

                // We NO LONGER check/skip on video events (loadedmetadata, playing, etc.)
                // These events fire exactly when the ad->content transition happens,
                // which is the #1 cause of the content video being misidentified and skipped.
                // We rely on the MutationObserver for class changes and the 500ms timeupdate.
                
                // We only use these events as a safe point to restore video state
                // if it got stuck in fast speed
                const restoreState = () => {
                    const isAdConfirmed = isConfirmedAd(player);
                    if (video.playbackRate > 8 && !isAdConfirmed) {
                        video.playbackRate = 1;
                    }
                    if (!isAdConfirmed) {
                        if (adSkipState.muted) {
                            video.muted = adSkipState.preMuted || false;
                            adSkipState.muted = false;
                        }
                        adSkipState.skipping = false;
                        adSkipState.reported = false;
                        adSkipState.jumpComplete = false;
                    }
                };

                video.addEventListener('loadedmetadata', restoreState, true);
                video.addEventListener('playing', restoreState, true);

                // timeupdate fires 4-30x/sec — throttle to avoid flooding forceSkipAd
                let lastTimeUpdate = 0;
                video.addEventListener('timeupdate', () => {
                    if (!isEnabled) return;
                    
                    // Try skip button frequently (zero risk)
                    const now = Date.now();
                    if (now - lastTimeUpdate < 200) return;
                    
                    lastTimeUpdate = now;
                    clickSkipButton();
                    
                    if (isConfirmedAd(player)) {
                        forceSkipAd(player);
                    }
                }, true);
            };

            hookVideo();

            const container = player.querySelector('.html5-video-container');
            if (container) {
                new MutationObserver(() => hookVideo()).observe(container, { childList: true });
            }

            // Initial check
            if (player.classList.contains('ad-showing') || player.classList.contains('ad-interrupting')) {
                forceSkipAd(player);
            }
        };

        if (document.querySelector('.html5-video-player')) {
            applyOverrides();
        } else {
            const waitObserver = new MutationObserver(() => {
                if (document.querySelector('.html5-video-player')) {
                    waitObserver.disconnect();
                    applyOverrides();
                }
            });
            waitObserver.observe(document.documentElement, { childList: true, subtree: true });
        }

        document.addEventListener('yt-navigate-finish', () => {
            setTimeout(() => {
                applyOverrides();
                removeAdElements(); // clean up any ad elements rendered on the new page
            }, 100);
        });
    }

    // ─── CSS Injection ───────────────────────────────────────────────────
    function hideAdsCSS() {
        const style = document.createElement('style');
        style.id = 'yt-ad-blocker-css';
        style.textContent = `
      /* Feed / sidebar / search ad renderers — display:none is sufficient.
         Do NOT add pointer-events:none here — YouTube can reuse or nest
         these renderer elements inside the recommendations sidebar, and
         pointer-events:none inherits to children, breaking video links. */
      #player-ads,
      #masthead-ad,
      #merch-shelf,
      #offer-module,
      ytd-promoted-sparkles-web-renderer,
      ytd-display-ad-renderer,
      ytd-ad-slot-renderer,
      ytd-in-feed-ad-layout-renderer,
      ytd-banner-promo-renderer,
      ytd-video-masthead-ad-v3-renderer,
      ytd-primetime-promo-renderer,
      ytd-companion-slot-renderer,
      ytd-action-companion-ad-renderer,
      ytd-statement-banner-renderer,
      ytd-promoted-sparkles-text-search-renderer,
      .ytd-promoted-video-renderer,
      ytd-engagement-panel-section-list-renderer[target-id="engagement-panel-ads"],
      .ytp-ad-badge,
      .ytp-ad-visit-advertiser-button,
      .ytp-ad-progress-list {
        display: none !important;
        height: 0 !important;
        overflow: hidden !important;
      }

      /* Player overlay elements — these float on top of the video and
         need pointer-events:none so clicks pass through to the player. */
      .ytp-ad-overlay-container,
      .ytp-ad-overlay-slot,
      .ytp-ad-text-overlay,
      .ytp-ad-image-overlay,
      .ytp-ad-player-overlay,
      .ytp-ad-player-overlay-layout,
      .ytp-ad-player-overlay-instream-info,
      .ytp-ad-player-overlay-skip-or-preview,
      .ytp-ad-text,
      .ytp-ad-preview-container,
      .ytp-ad-message-container,
      .ytp-ad-persistent-progress-bar-container,
      .ytp-ad-overlay-ad-info-button-container,
      .ytp-ad-simple-ad-badge,
      .ytp-ad-duration-remaining,
      .ytp-ad-preview-text {
        display: none !important;
        height: 0 !important;
        opacity: 0 !important;
        pointer-events: none !important;
        overflow: hidden !important;
      }

      /* Instantly hide ad video — pure CSS, zero JS delay.
         The browser applies this the same frame ad-showing is added. */
      .html5-video-player.ad-showing video,
      .html5-video-player.ad-interrupting video {
        opacity: 0 !important;
      }

      /* Hide yellow ad progress bar during ad skip.
         YouTube changes .ytp-play-progress from red to yellow during ads. */
      .html5-video-player.ad-showing .ytp-play-progress,
      .html5-video-player.ad-interrupting .ytp-play-progress {
        background: transparent !important;
        opacity: 0 !important;
      }
      .html5-video-player.ad-showing .ytp-scrubber-container,
      .html5-video-player.ad-interrupting .ytp-scrubber-container,
      .html5-video-player.ad-showing .ytp-progress-bar-container,
      .html5-video-player.ad-interrupting .ytp-progress-bar-container,
      .html5-video-player.ad-showing .ytp-chrome-bottom,
      .html5-video-player.ad-interrupting .ytp-chrome-bottom {
        opacity: 0 !important;
      }

      /* Hide loading spinner during ad transitions */
      .ad-showing .ytp-spinner,
      .ad-showing .ytp-spinner-container {
        display: none !important;
      }

      /* Anti-adblock enforcement overlay */
      ytd-enforcement-message-view-model {
        display: none !important;
      }
    `;
        (document.head || document.documentElement).appendChild(style);
    }

    // ─── Stats Reporting ─────────────────────────────────────────────────
    function reportBlocked(count) {
        try {
            chrome.runtime.sendMessage({ type: 'AD_BLOCKED', count });
        } catch { }
    }
})();
