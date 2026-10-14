/**
 * Twitch Ad Blocker — Content Script
 *
 * Strategy:
 * LAYER 1 — twitch-inject.js strips ad segments from HLS playlists before
 *            the player loads them (handles mid-roll video ads).
 * LAYER 2 — CSS hides all known ad overlay elements immediately.
 * LAYER 3 — MutationObserver removes ad DOM nodes and counts blocked ads.
 * LAYER 4 — 500 ms poller mutes the video when a video ad slips through
 *            layers 1–3, and restores volume when the ad ends.
 *            Also detects Twitch's low-quality "purple screen" replacement
 *            stream used when SSAI delivers ads without HLS markers.
 */

(() => {
    'use strict';

    let isEnabled = true;
    let cssInjected = false;
    let observer = null;
    let pollInterval = null;
    let mutedForAd = false;
    let preAdVolume = 1;
    // Tracks the highest video width seen on this page to detect sudden
    // quality drops caused by Twitch's replacement "purple screen" stream.
    let lastVideoWidth = 0;

    // Ad-break recovery: when the HLS filter strips an ad-only playlist the IVS
    // player gets empty responses for ~15 s and may declare the stream offline.
    // We track when the break should end and attempt recovery once it does.
    let adBreakEndTime = 0;
    let adBreakPoller = null;

    // ─── Selectors ────────────────────────────────────────────────────────
    // Elements to hide via CSS and remove via MutationObserver
    const AD_SELECTORS = [
        // Precise data-attribute selectors — safe, never match layout elements.
        '[data-test-selector="ad-banner-default-text"]',
        '[data-test-selector="ad-banner-default"]',
        '.tw-absolute-center[data-test-selector="ad-banner-default-text"]',
        '[data-a-target="video-ad-label"]',
        '[data-test-selector="ad-choice-icon"]',
        '[data-a-target="ad-choice-icon"]',
        '[data-a-target="ad-countdown"]',
        '[data-test-selector="subscribe-to-remove-ads"]',
        '[data-test-selector="subscribe-to-remove-ads-text"]',
        '[data-test-selector="interstitial-ad"]',
        '[data-a-target="ad-skippable-overlay"]',
        '[data-a-target="video-ad-skip-button"]',
        '[data-a-target="player-overlay-ad-notice"]',
        '[data-a-target="ad-overlay"]',
        '[data-a-target="ad-banner"]',
        '[data-a-target="player-controls-ad-info"]',
        // Specific class selectors — unique to ad UI, not reused by layout.
        '.player-ad-notice',
        '.player-controls-ad-notify',
        '.tw-interstitial-ad',
        '.video-ad-label',
        '.video-player-ad-label',
        // NOTE: The following broad selectors are intentionally excluded because
        // they match Twitch styled-components layout containers whose generated
        // class accidentally contains the substring, breaking the player flex
        // layout (player renders at half width):
        //   .ad-banner, [class*="ad-banner"], [class*="ad-notice"],
        //   [class*="AdBannerPresentation"], [class*="VideoAdLabel"]
    ];
    const AD_SELECTOR_COMBINED = AD_SELECTORS.join(', ');

    // Subset used to detect whether a video ad is actively playing
    const AD_PLAYING_SELECTORS = [
        '[data-test-selector="ad-banner-default-text"]',
        '[data-test-selector="ad-banner-default"]',
        '[data-a-target="video-ad-label"]',
        '[data-a-target="ad-countdown"]',
        '.player-ad-notice',
        '.video-ad-label',
        '[data-a-target="player-overlay-ad-notice"]',
    ];

    // ─── Init ─────────────────────────────────────────────────────────────
    async function init() {
        try {
            const response = await chrome.runtime.sendMessage({ type: 'GET_STATE' });
            isEnabled = response?.enabled !== false;
        } catch {
            isEnabled = true;
        }

        if (isEnabled) enable();

        chrome.runtime.onMessage.addListener((msg) => {
            if (msg.type === 'STATE_CHANGED') {
                isEnabled = msg.enabled;
                isEnabled ? enable() : disable();
            }
        });

        // Count ads removed by the HLS interceptor in twitch-inject.js.
        // adBreakDuration > 0 means a full ad-only playlist was stripped — schedule
        // recovery in case the player stalls waiting for the live stream to return.
        window.addEventListener('twitch-ad-blocker-intercepted', (e) => {
            if (isEnabled) {
                reportBlocked(e.detail?.count || 1);
                const dur = e.detail?.adBreakDuration;
                if (dur > 0) handleAdBreak(dur);
            }
        });
    }

    function enable() {
        injectCSS();
        startObserver();
        startPoller();
    }

    function disable() {
        if (observer) { observer.disconnect(); observer = null; }
        if (pollInterval) { clearInterval(pollInterval); pollInterval = null; }
        if (adBreakPoller) { clearInterval(adBreakPoller); adBreakPoller = null; }
        if (mutedForAd) restoreVolume();
    }

    // ─── CSS Injection ────────────────────────────────────────────────────
    function injectCSS() {
        if (cssInjected) return;
        const container = document.head || document.documentElement;
        if (!container) return;

        const style = document.createElement('style');
        // Only use display:none — do NOT set width:0/height:0.
        // If display:none loses a specificity race, width:0/height:0 leave the
        // element in the layout flow at zero size, which breaks the player's
        // flex layout and causes it to render at half width.
        style.textContent = `
            ${AD_SELECTOR_COMBINED} {
                display: none !important;
                visibility: hidden !important;
                pointer-events: none !important;
            }
        `;
        container.appendChild(style);
        cssInjected = true;
    }

    // ─── LAYER 3: MutationObserver ────────────────────────────────────────
    function startObserver() {
        if (observer) return;

        if (!document.body) {
            requestAnimationFrame(startObserver);
            return;
        }

        observer = new MutationObserver(() => {
            if (!isEnabled) return;
            let newAds = 0;
            document.querySelectorAll(AD_SELECTOR_COMBINED).forEach(el => {
                if (el.dataset.twAdblocked) return;
                el.dataset.twAdblocked = 'true';
                newAds++;
            });
            if (newAds > 0) reportBlocked(newAds);
        });

        observer.observe(document.body, { childList: true, subtree: true });
    }

    // ─── LAYER 4: Video Muting Fallback ──────────────────────────────────
    function isVideoAdPlaying() {
        // Only treat ad as playing if the indicator element is actually visible.
        // Our CSS hides known ad elements with display:none — hidden elements
        // have offsetParent===null. If our CSS fired successfully the element
        // exists in the DOM but is invisible, so we must not mute live audio.
        return AD_PLAYING_SELECTORS.some(sel => {
            const el = document.querySelector(sel);
            return el !== null && el.offsetParent !== null;
        });
    }

    /**
     * Detects Twitch's "purple screen" / low-quality replacement stream.
     *
     * When Twitch's server-side ad insertion (SSAI) delivers an ad without
     * SCTE-35 markers, it sometimes substitutes the normal stream with a
     * very-low-resolution placeholder (typically 284×160). We detect this by
     * comparing the current videoWidth against the highest quality seen so far
     * on this page, ignoring cases where the user has always been on low quality.
     */
    function isLowQualityPlaceholder() {
        const video = document.querySelector('video');
        if (!video || video.paused || video.readyState < 2 || video.videoWidth === 0) return false;

        const w = video.videoWidth;
        // Update the running maximum (quality can legitimately increase over time).
        if (w > lastVideoWidth) { lastVideoWidth = w; return false; }

        // Only flag as a placeholder if we have previously seen a decent-quality
        // stream (>= 640px wide) AND the current width is very low (< 300px).
        // This avoids false positives when the user has manually set quality to 160p.
        return lastVideoWidth >= 640 && w < 300;
    }

    function muteForAd() {
        if (mutedForAd) return;
        const video = document.querySelector('video');
        if (!video) return;
        preAdVolume = video.volume;
        mutedForAd = true;
        video.muted = true;
        video.volume = 0;
    }

    function restoreVolume() {
        const video = document.querySelector('video');
        mutedForAd = false;
        if (!video) return;
        video.muted = false;
        video.volume = preAdVolume || 1;
    }

    function startPoller() {
        if (pollInterval) return;
        pollInterval = setInterval(() => {
            if (!isEnabled) return;
            if (isVideoAdPlaying() || isLowQualityPlaceholder()) {
                muteForAd();
            } else if (mutedForAd) {
                restoreVolume();
            }
        }, 500);
    }

    // ─── Ad-Break Recovery ────────────────────────────────────────────────
    //
    // When the HLS filter strips all segments from an ad-only playlist, the IVS
    // player gets empty responses for the duration of the ad (~15 s). During this
    // window the video buffer drains and Twitch's UI may show "stream offline."
    // Once the ad break is over the server returns live segments and IVS should
    // recover automatically — but if the player or Twitch's JS declared the
    // stream offline first we need to nudge it back.
    function handleAdBreak(durationSecs) {
        if (!isEnabled || durationSecs <= 0) return;
        if (adBreakPoller) return; // already watching this break

        adBreakEndTime = Date.now() + durationSecs * 1000;
        const adBreakStartTime = Date.now();
        let lastCurrentTime = -1;
        let stalledTicks = 0;

        // Poll every second. Recovery fires either when the break expires or
        // when the player stalls mid-break — whichever comes first.
        adBreakPoller = setInterval(() => {
            const now = Date.now();

            // Give up 6 seconds after the break was supposed to end.
            if (now > adBreakEndTime + 6000) {
                clearInterval(adBreakPoller);
                adBreakPoller = null;
                return;
            }

            const video = document.querySelector('video');
            if (!video) return;

            // Stream recovered naturally — stop monitoring.
            if (!video.paused && video.readyState >= 3) {
                clearInterval(adBreakPoller);
                adBreakPoller = null;
                stalledTicks = 0;
                return;
            }

            // Detect stall: currentTime not advancing while not deliberately
            // paused. This fires when the live-segment buffer drains after the
            // filter strips all content from the rolling all-ad playlist window
            // (typically ~20 s into a 30 s ad break). IVS declares the stream
            // offline after ~18 s of empty playlist polls — so we must act here,
            // not wait for adBreakEndTime.
            const ct = video.currentTime;
            if (!video.paused && ct === lastCurrentTime) {
                stalledTicks++;
            } else {
                stalledTicks = 0;
            }
            lastCurrentTime = ct;

            const secsElapsed = (now - adBreakStartTime) / 1000;
            // playerStalled: currentTime frozen for ≥3 s, or buffer gone.
            const playerStalled = stalledTicks >= 3 || video.readyState < 2;

            // Act if the break is over OR the player stalled at least 8 s in.
            // The 8 s guard prevents false triggers during normal initial buffering.
            if (now >= adBreakEndTime || (secsElapsed >= 8 && playerStalled)) {
                attemptStreamRecovery(video);
            }
        }, 1000);
    }

    function attemptStreamRecovery(video) {
        // 1. Resume a paused video element.
        if (video && video.paused) video.play().catch(() => {});

        // 2. Click Twitch's "Try Again" / replay button if visible.
        const retrySelectors = [
            '[data-a-target="player-replay-button"]',
            '[data-a-target="player-seek-button"]',
            '[data-test-selector="player-replay__button"]',
            '[class*="replay-button"]',
        ];
        for (const sel of retrySelectors) {
            const btn = document.querySelector(sel);
            if (btn) { btn.click(); return; }
        }

        // 3. Last resort: reload the page only if the video element has truly
        //    lost its source (HAVE_NOTHING or NETWORK_NO_SOURCE).
        if (video && (video.readyState === 0 || video.networkState === 3)) {
            setTimeout(() => {
                const v = document.querySelector('video');
                if (v && (v.paused || v.readyState < 2)) location.reload();
            }, 3000);
        }
    }

    // ─── Stats Reporting ──────────────────────────────────────────────────
    function reportBlocked(count) {
        try {
            chrome.runtime.sendMessage({ type: 'AD_BLOCKED', count });
        } catch { }
    }

    // ─── Bootstrap ────────────────────────────────────────────────────────
    init();

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            if (isEnabled) startObserver();
        });
    }

})();
