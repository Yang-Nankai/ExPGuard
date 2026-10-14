/**
 * YouTube Ad Blocker — Page-Level Interceptor
 * Injected into the page context to intercept YouTube's player APIs.
 */

(() => {
    'use strict';

    const _jsonParse = JSON.parse;

    // ── Ad Keys to Strip ──────────────────────────────────────────────────
    const AD_KEYS = new Set([
        'adPlacements',
        'playerAds',
        'adSlots',
        'adBreakParams',
        'adBreakHeartbeatParams',
        'adPlaybackContext',
        // Newer (2024+) ad-serving fields seen in player responses
        'adServingData',
        'adContentLength',
        'adPlacementOverlayData',
        'serverStitchedAdsConfig',
    ]);
    const AD_CONFIG_KEYS = new Set([
        'adRequestConfig',
        'frescoPingConfig',
        'daiConfig',
    ]);

    // ── Deep Recursive Strip ──────────────────────────────────────────────
    // Traverses the entire object tree (up to a safe depth) and removes
    // ad-related keys wherever they appear — not just at the top level.
    function stripAdsDeep(obj, depth) {
        if (!obj || typeof obj !== 'object' || depth > 12) return false;

        let stripped = false;

        // Strip ad keys at this level
        for (const key of AD_KEYS) {
            if (key in obj) {
                if (Array.isArray(obj[key])) {
                    obj[key] = [];
                } else {
                    delete obj[key];
                }
                stripped = true;
            }
        }

        // Strip ad config from playerConfig at this level
        if (obj.playerConfig) {
            for (const key of AD_CONFIG_KEYS) {
                if (obj.playerConfig[key]) {
                    delete obj.playerConfig[key];
                    stripped = true;
                }
            }
        }

        // Recurse into child objects/arrays
        const keys = Array.isArray(obj) ? obj : Object.values(obj);
        for (const val of keys) {
            if (val && typeof val === 'object') {
                if (stripAdsDeep(val, depth + 1)) stripped = true;
            }
        }

        return stripped;
    }

    function stripAds(obj) {
        const stripped = stripAdsDeep(obj, 0);
        if (stripped) {
            try {
                window.dispatchEvent(new CustomEvent('yt-ad-blocker-intercepted'));
            } catch { }
        }
        return stripped;
    }

    // ── Helper: detect a player response object ───────────────────────────
    function isPlayerResponse(obj) {
        return obj && typeof obj === 'object' &&
            (obj.videoDetails || obj.streamingData || obj.playabilityStatus);
    }

    const PLAYER_RESPONSE_KEYS = [
        'bootstrapPlayerResponse',
        'playerResponse',
        'player_response',
        'raw_player_response',
    ];

    function parseJsonObjectMaybe(value) {
        if (typeof value !== 'string') return null;
        const trimmed = value.trim();
        if (!trimmed || (trimmed[0] !== '{' && trimmed[0] !== '[')) return null;

        try {
            const parsed = _jsonParse(trimmed);
            return parsed && typeof parsed === 'object' ? parsed : null;
        } catch {
            return null;
        }
    }

    function sanitizePlayerResponseValue(value) {
        if (!value) return { value, stripped: false };

        if (typeof value === 'string') {
            const parsed = parseJsonObjectMaybe(value);
            if (!parsed) return { value, stripped: false };

            const stripped = stripAds(parsed);
            return {
                value: stripped ? JSON.stringify(parsed) : value,
                stripped,
            };
        }

        if (typeof value === 'object') {
            return { value, stripped: stripAds(value) };
        }

        return { value, stripped: false };
    }

    function sanitizePlayerBootstrap(target) {
        if (!target || typeof target !== 'object') return false;

        let stripped = false;
        const containers = [target, target.config, target.config?.args];

        for (const container of containers) {
            if (!container || typeof container !== 'object') continue;

            for (const key of PLAYER_RESPONSE_KEYS) {
                if (!(key in container)) continue;
                const result = sanitizePlayerResponseValue(container[key]);
                if (!result.stripped) continue;

                if (result.value !== container[key]) {
                    container[key] = result.value;
                }
                stripped = true;
            }
        }

        return stripped;
    }

    function stripAutoplayOverlayAds(obj) {
        const autoplayRenderer =
            obj?.playerOverlays?.playerOverlayRenderer?.autoplay?.playerOverlayAutoplayRenderer;
        if (!autoplayRenderer?.adPlacements) return false;

        autoplayRenderer.adPlacements = [];
        try {
            window.dispatchEvent(new CustomEvent('yt-ad-blocker-intercepted'));
        } catch { }
        return true;
    }

    function sanitizeKnownPlayerData(obj) {
        if (!obj || typeof obj !== 'object') return false;

        let stripped = false;
        stripped = sanitizePlayerBootstrap(obj) || stripped;
        stripped = stripAutoplayOverlayAds(obj) || stripped;

        if (isPlayerResponse(obj)) {
            stripped = stripAds(obj) || stripped;
        }
        if (obj.playerResponse && typeof obj.playerResponse === 'object') {
            stripped = stripAds(obj.playerResponse) || stripped;
        }
        if (obj.response?.playerResponse && typeof obj.response.playerResponse === 'object') {
            stripped = stripAds(obj.response.playerResponse) || stripped;
        }
        if (obj.data?.playerResponse && typeof obj.data.playerResponse === 'object') {
            stripped = stripAds(obj.data.playerResponse) || stripped;
        }
        if (obj.contents?.twoColumnWatchNextResults?.playerResponse) {
            stripped = stripAds(obj.contents.twoColumnWatchNextResults.playerResponse) || stripped;
        }

        return stripped;
    }

    function hookJsonParse() {
        if (JSON.parse.__abHooked) return;

        const wrappedParse = function (...args) {
            const result = _jsonParse.apply(this, args);
            try {
                sanitizeKnownPlayerData(result);
            } catch { }
            return result;
        };

        try {
            Object.defineProperty(wrappedParse, '__abHooked', { value: true });
        } catch { }

        JSON.parse = wrappedParse;
    }

    let lastMediaEventKey = '';
    let lastMediaEventAt = 0;

    function parseUrlMaybe(url) {
        if (typeof url !== 'string' || !url) return null;
        try {
            return new URL(url, location.href);
        } catch {
            return null;
        }
    }

    function getMediaRequestMeta(url) {
        const parsed = parseUrlMaybe(url);
        if (!parsed) return null;

        const isYouTubeMedia =
            /(^|\.)googlevideo\.com$/i.test(parsed.hostname) &&
            parsed.pathname.includes('/videoplayback');
        if (!isYouTubeMedia) return null;

        return {
            url: parsed.toString(),
            cpn: parsed.searchParams.get('cpn') || '',
            id: parsed.searchParams.get('id') || '',
            ctier: parsed.searchParams.get('ctier') || '',
            isAd:
                parsed.searchParams.get('ctier') === 'L' ||
                parsed.searchParams.has('oad') ||
                parsed.searchParams.has('adformat'),
        };
    }

    function dispatchMediaRequestSignal(url) {
        const meta = getMediaRequestMeta(url);
        if (!meta) return null;

        const key = [
            meta.isAd ? 'ad' : 'content',
            meta.cpn,
            meta.id,
            meta.ctier,
        ].join(':');
        const now = Date.now();

        if (key === lastMediaEventKey && now - lastMediaEventAt < 250) {
            return meta;
        }

        lastMediaEventKey = key;
        lastMediaEventAt = now;

        try {
            window.dispatchEvent(new CustomEvent('yt-ad-blocker-media-request', {
                detail: meta,
            }));
        } catch { }

        return meta;
    }

    function hookObjectProperty(target, name, transform) {
        if (!target || typeof target !== 'object') return;

        const apply = (value) => {
            const next = transform(value);
            return next === undefined ? value : next;
        };

        let stored = target[name];
        try {
            Object.defineProperty(target, name, {
                configurable: true,
                get() { return stored; },
                set(value) { stored = apply(value); },
            });
        } catch {
            stored = apply(stored);
            return;
        }

        stored = apply(stored);
    }

    function hookYtplayerArgs(args) {
        if (!args || typeof args !== 'object' || args.__abHookedArgs) return;
        args.__abHookedArgs = true;

        for (const key of ['raw_player_response', 'player_response', 'playerResponse']) {
            hookObjectProperty(args, key, (value) => sanitizePlayerResponseValue(value).value);
        }

        sanitizePlayerBootstrap(args);
    }

    function hookYtplayerObject(target) {
        if (!target || typeof target !== 'object' || target.__abHookedYtplayer) return;
        target.__abHookedYtplayer = true;

        hookObjectProperty(target, 'bootstrapPlayerResponse', (value) => sanitizePlayerResponseValue(value).value);
        hookObjectProperty(target, 'playerResponse', (value) => sanitizePlayerResponseValue(value).value);
        hookObjectProperty(target, 'player_response', (value) => sanitizePlayerResponseValue(value).value);
        hookObjectProperty(target, 'config', (value) => {
            sanitizePlayerBootstrap(value);
            if (value?.args) hookYtplayerArgs(value.args);
            return value;
        });

        if (target.config?.args) hookYtplayerArgs(target.config.args);
        sanitizePlayerBootstrap(target);
    }

    function hookYtplayer() {
        const process = (value) => {
            hookYtplayerObject(value);
            sanitizePlayerBootstrap(value);
            return value;
        };

        let stored = window.ytplayer;
        try {
            Object.defineProperty(window, 'ytplayer', {
                configurable: true,
                get() { return stored; },
                set(value) { stored = process(value); },
            });
        } catch { /* property may already be non-configurable */ }

        stored = process(stored);
    }

    // ── 1) Property Hooks ─────────────────────────────────────────────────
    // Intercepts assignments to known globals that carry the player response.
    function hookGlobalProperty(name) {
        let stored = window[name];
        try {
            Object.defineProperty(window, name, {
                configurable: true,
                get() { return stored; },
                set(value) {
                    if (value && typeof value === 'object') {
                        stripAds(value);
                        if (value.playerResponse) stripAds(value.playerResponse);
                    }
                    stored = value;
                },
            });
        } catch { /* property may already be non-configurable */ }

        // If the value was already set before our hook ran
        if (stored && typeof stored === 'object') {
            stripAds(stored);
            if (stored.playerResponse) stripAds(stored.playerResponse);
        }
    }

    // ytInitialData contains the entire page layout: sidebar recommendations,
    // navigation endpoints, comment sections, etc.  Running stripAdsDeep() on
    // the whole tree corrupts YouTube's Polymer data-model — in particular it
    // deletes keys like adSlots that the sidebar renderer depends on for click
    // handling.  Only strip from embedded playerResponse sub-objects (matching
    // what the fetch interceptor does for /youtubei/v1/next).
    function hookPageData(name) {
        let stored = window[name];
        const process = (obj) => {
            if (!obj || typeof obj !== 'object') return;
            if (obj.playerResponse) stripAds(obj.playerResponse);
            if (obj.contents?.twoColumnWatchNextResults?.playerResponse) {
                stripAds(obj.contents.twoColumnWatchNextResults.playerResponse);
            }
        };
        try {
            Object.defineProperty(window, name, {
                configurable: true,
                get() { return stored; },
                set(value) { process(value); stored = value; },
            });
        } catch { /* property may already be non-configurable */ }
        process(stored);
    }

    hookGlobalProperty('ytInitialPlayerResponse');
    hookPageData('ytInitialData');
    hookYtplayer();
    hookJsonParse();

    // ── 2) ytcfg Interception ─────────────────────────────────────────────
    // YouTube 2025+ delivers the player response via ytcfg.set() from inline
    // scripts, often without ever setting window.ytInitialPlayerResponse.
    function hookYtcfg() {
        const ytcfg = window.ytcfg;
        if (!ytcfg || ytcfg.__abHooked) return;
        ytcfg.__abHooked = true;

        if (typeof ytcfg.set === 'function') {
            const origSet = ytcfg.set;
            ytcfg.set = function (...args) {
                // ytcfg.set({key: value, ...}) or ytcfg.set(key, value)
                if (args.length >= 1 && args[0] && typeof args[0] === 'object') {
                    for (const val of Object.values(args[0])) {
                        if (isPlayerResponse(val)) stripAds(val);
                    }
                }
                if (args.length >= 2 && isPlayerResponse(args[1])) {
                    stripAds(args[1]);
                }
                return origSet.apply(this, args);
            };
        }

        if (typeof ytcfg.get === 'function') {
            const origGet = ytcfg.get;
            ytcfg.get = function (...args) {
                const result = origGet.apply(this, args);
                if (isPlayerResponse(result)) stripAds(result);
                return result;
            };
        }
    }

    // ytcfg may not exist yet — intercept its creation
    if (window.ytcfg) {
        hookYtcfg();
    } else {
        let _ytcfg;
        try {
            Object.defineProperty(window, 'ytcfg', {
                configurable: true,
                get() { return _ytcfg; },
                set(value) {
                    _ytcfg = value;
                    if (value) hookYtcfg();
                },
            });
        } catch {
            // Fallback: poll for ytcfg (e.g. if property already existed)
            const poll = setInterval(() => {
                if (window.ytcfg) { clearInterval(poll); hookYtcfg(); }
            }, 50);
            setTimeout(() => clearInterval(poll), 30000);
        }
    }

    // ── 3) Ad Tracking URL Detection ──────────────────────────────────────
    function isAdTrackingUrl(url) {
        if (typeof url !== 'string') return false;
        // /api/stats/watchtime with el=adunit — ad watchtime heartbeat
        if (url.includes('/api/stats/watchtime') && url.includes('el=adunit')) return true;
        // /api/stats/watchtime with adformat= (non-empty) — ad watchtime variant
        if (url.includes('/api/stats/watchtime') && /adformat=\d/.test(url)) return true;
        // /api/stats/qoe with adformat= (non-empty) — ad QoE tracking
        if (url.includes('/api/stats/qoe') && /adformat=\d/.test(url)) return true;
        // /api/stats/ads — ad statistics
        if (url.includes('/api/stats/ads')) return true;
        // /youtubei/v1/player/ad_break — ad break signaling
        if (url.includes('/youtubei/v1/player/ad_break')) return true;
        return false;
    }

    // Identifies googlevideo.com /videoplayback requests that carry ad
    // markers. HAR confirmed ctier=L is the high-confidence pre-roll marker;
    // oad/adformat appear on legacy / IMA-served creatives.
    function isAdVideoUrl(url) {
        if (typeof url !== 'string' || !url) return false;
        if (!url.includes('googlevideo.com') || !url.includes('/videoplayback')) return false;
        const parsed = parseUrlMaybe(url);
        if (!parsed) return false;
        return parsed.searchParams.get('ctier') === 'L' ||
            parsed.searchParams.has('oad') ||
            parsed.searchParams.has('adformat');
    }

    function notifyAdBlocked() {
        try {
            window.dispatchEvent(new CustomEvent('yt-ad-blocker-intercepted'));
        } catch { }
    }

    // ── 4) Fetch Interceptor ──────────────────────────────────────────────
    // Returns a NEW Response with stripped body so that reading via .text(),
    // .json(), .body, or .arrayBuffer() all receive the cleaned data.
    const _fetch = window.fetch;
    window.fetch = async function (...args) {
        const url = (typeof args[0] === 'string' ? args[0] : args[0]?.url) || '';
        dispatchMediaRequestSignal(url);

        // Block ad tracking requests outright
        if (isAdTrackingUrl(url)) {
            return new Response('', { status: 204, statusText: 'No Content' });
        }

        // Block ad video segments (ctier=L pre-rolls, oad/adformat creatives).
        // Returning 204 makes MSE see zero payload; YouTube's ad scheduler
        // treats the segment as failed and skips to the content stream.
        if (isAdVideoUrl(url)) {
            notifyAdBlocked();
            return new Response('', { status: 204, statusText: 'No Content' });
        }

        const response = await _fetch.apply(this, args);

        const isPlayerEndpoint =
            url.includes('/youtubei/v1/player') ||
            url.includes('/get_video_info');
        const isWatchDataEndpoint =
            url.includes('/youtubei/v1/next') ||
            url.includes('/youtubei/v1/browse') ||
            url.includes('/youtubei/v1/reel/');

        if (isPlayerEndpoint || isWatchDataEndpoint) {
            const clone = response.clone();
            try {
                const text = await clone.text();
                const data = JSON.parse(text);

                if (isPlayerEndpoint) stripAds(data);
                if (data.playerResponse) stripAds(data.playerResponse);
                if (data.contents?.twoColumnWatchNextResults?.playerResponse) {
                    stripAds(data.contents.twoColumnWatchNextResults.playerResponse);
                }

                // Strip content-encoding/content-length so the browser does not
                // try to re-decompress the already-decoded text body.
                const headers = new Headers();
                for (const [k, v] of response.headers) {
                    const lower = k.toLowerCase();
                    if (lower === 'content-encoding' || lower === 'content-length') continue;
                    headers.set(k, v);
                }

                const newResponse = new Response(JSON.stringify(data), {
                    status: response.status,
                    statusText: response.statusText,
                    headers,
                });
                Object.defineProperty(newResponse, 'url', { value: response.url });
                Object.defineProperty(newResponse, 'redirected', { value: response.redirected });
                return newResponse;
            } catch {
                // Not JSON or parse error — return the untouched original
                return response;
            }
        }

        return response;
    };

    // ── 5) XMLHttpRequest Interceptor ─────────────────────────────────────
    const _xhrOpen = XMLHttpRequest.prototype.open;
    const _xhrSend = XMLHttpRequest.prototype.send;

    XMLHttpRequest.prototype.open = function (method, url, ...rest) {
        this._abUrl = (typeof url === 'string' ? url : url?.toString()) || '';
        this._abIsAdVideo = isAdVideoUrl(this._abUrl);
        this._abBlocked = isAdTrackingUrl(this._abUrl) || this._abIsAdVideo;
        dispatchMediaRequestSignal(this._abUrl);
        return _xhrOpen.call(this, method, url, ...rest);
    };

    XMLHttpRequest.prototype.send = function (...args) {
        // Silently swallow ad tracking + ad video XHRs
        if (this._abBlocked) {
            if (this._abIsAdVideo) notifyAdBlocked();
            Object.defineProperty(this, 'status', { value: 204, configurable: true });
            Object.defineProperty(this, 'readyState', { value: 4, configurable: true });
            Object.defineProperty(this, 'responseText', { value: '', configurable: true });
            Object.defineProperty(this, 'response', { value: '', configurable: true });
            try { this.dispatchEvent(new Event('readystatechange')); } catch { }
            try { this.dispatchEvent(new Event('load')); } catch { }
            return;
        }

        if (this._abUrl &&
            (this._abUrl.includes('/youtubei/v1/player') ||
                this._abUrl.includes('/get_video_info'))) {

            this.addEventListener('readystatechange', function () {
                if (this.readyState === 4 && this.status === 200) {
                    try {
                        const data = JSON.parse(this.responseText);
                        stripAds(data);
                        const stripped = JSON.stringify(data);
                        Object.defineProperty(this, 'responseText', {
                            value: stripped, configurable: true,
                        });
                        Object.defineProperty(this, 'response', {
                            value: this.responseType === 'json' ? data : stripped,
                            configurable: true,
                        });
                    } catch { }
                }
            });
        }
        return _xhrSend.apply(this, args);
    };

    // ── 6) Periodic Safety Net ────────────────────────────────────────────
    // Re-checks globals every 500ms for the first 30 seconds in case
    // YouTube overwrites our property hooks or sets data after the fact.
    let safetyCount = 0;
    const safetyNet = setInterval(() => {
        if (++safetyCount > 60) { clearInterval(safetyNet); return; }
        try {
            const pr = window.ytInitialPlayerResponse;
            if (pr && typeof pr === 'object') stripAds(pr);
        } catch { }
        try {
            // Only strip from embedded playerResponse — do NOT recurse the
            // whole ytInitialData tree (breaks sidebar click handling).
            const id = window.ytInitialData;
            if (id?.playerResponse) stripAds(id.playerResponse);
            if (id?.contents?.twoColumnWatchNextResults?.playerResponse) {
                stripAds(id.contents.twoColumnWatchNextResults.playerResponse);
            }
        } catch { }
        try {
            sanitizePlayerBootstrap(window.ytplayer);
            hookYtplayer();
        } catch { }
        hookJsonParse();
        // Re-hook ytcfg in case YouTube created it late or replaced it
        hookYtcfg();
    }, 500);

    // NOTE:
    // Do not override Object.defineProperty globally.
    // It affects unrelated YouTube internals and can break player controls.

})();
