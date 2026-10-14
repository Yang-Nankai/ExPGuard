/**
 * Twitch Ad Blocker — Page-Level Interceptor
 *
 * Strategy: intercept HLS playlist (M3U8) requests before the player processes
 * them and strip ad segments. Twitch embeds ads into the stream via HLS
 * discontinuities annotated with SCTE-35 / CUE-OUT markers.
 *
 * Typical structure of a Twitch ad break in a playlist:
 *
 *   #EXT-X-DISCONTINUITY            ← opening boundary
 *   #EXT-OATCLS-SCTE35:...          ← ad marker  (key signal)
 *   #EXT-X-CUE-OUT:30               ← ad duration hint
 *   #EXT-X-DATERANGE:CLASS="twitch-stitched-ad",...
 *   #EXTINF:2.0,
 *   https://ad-cdn.example.com/ad1.ts
 *   ...more ad segments...
 *   #EXT-X-DISCONTINUITY            ← closing boundary
 *   #EXT-X-CUE-IN
 *   #EXTINF:2.0,
 *   https://video-edge.twitch.tv/real-segment.ts  ← content resumes
 */

(() => {
    // Strings that mark a block of HLS segments as an ad.
    // IMPORTANT: Keep in sync with the identical copy in twitch-worker-proxy.js
    const AD_MARKERS = [
        '#EXT-OATCLS-SCTE35',
        '#EXT-X-OATCLS-SCTE35',    // X- prefix variant used by some CDNs
        '#EXT-X-CUE-OUT',
        '#EXT-X-SCTE35',
        'stitched-ad',              // matches CLASS="twitch-stitched-ad" in DATERANGE
        'tw-stitched-ad',           // additional variant
        'ID="stitched-ad"',         // newer DATERANGE match
        'X-TV-TWITCH-AD',
        'client-ad-barrier',
        'ad_pod',                   // Amazon VAST / IVS ad pod marker
        '#EXT-X-ASSET:CAID',        // Amazon IVS channel asset ID (ad delivery)
        'live-ad',                  // sometimes used in EXTINF/URI
        'CLASS="twitch-maf-ad"',    // newer DATERANGE match
        'maf-ad',                   // newer DATERANGE ID match
        'twitch-maf-ad',            // another variant
        // Twitch 2025-2026 stitched ad markers seen in IVS playlists
        'FAS|TWITCH',
        '_Creative',
        'twitch-ad-quartile',
        'X-TV-TWITCH-AD-QUARTILE',
        'twitch-stitched-ad',
        'X-TV-TWITCH-STREAM-SOURCE="FAS|',
        // Amazon IVS ad creative ID in EXTINF (e.g. #EXTINF:2.002,Amazon|592...)
        'Amazon|',
        // Ad trigger DATERANGE (CLASS="twitch-trigger", X-TV-TWITCH-TRIGGER-URL).
        // IVS fires this event → Twitch JS sends ad beacons and may block the stream
        // when quartile events never arrive (because we stripped those DATERANGEs).
        'X-TV-TWITCH-TRIGGER-URL',
        'twitch-trigger',
    ];

    // Known ad CDN domains present in SSAI segment URLs (no SCTE-35 markers).
    // Segment lines containing these strings are dropped individually.
    const AD_SEGMENT_DOMAINS = [
        'aax.amazon-adsystem.com',
        's.amazon-adsystem.com',
        'mads.amazon-adsystem.com',
        'video-ads.twitch.tv',
        'aax-us-',
        'aax-eu-',
        'aax-fe-',
        'amazonadvertising.com',
        'adnxs.com',
        'googlesyndication.com',
        'doubleclick.net',
    ];
    function hasAdMarker(line) {
        return AD_MARKERS.some(m => line.includes(m));
    }

    function isAdSegmentUrl(url) {
        return AD_SEGMENT_DOMAINS.some(d => url.includes(d));
    }

    /**
     * Filters ad segments from an HLS M3U8 playlist.
     *
     * @param {string} text  Raw M3U8 text
     * @param {string} baseUrl Optional URL to resolve relative paths
     * @returns {{ filtered: string, adsRemoved: number }}
     */
    function filterM3U8(text, baseUrl) {
        const lines = text.split('\n');
        const out = [];
        let i = 0;
        let adsRemoved = 0;
        let dropNextSegmentUrl = false;
        // Tracks whether ad content was dropped in the current playlist window
        // (via EXTINF or DATERANGE ad markers). Used to suppress the closing
        // #EXT-X-DISCONTINUITY + #EXT-X-CUE-IN when the opening DISC has
        // already rolled off the rolling window (mid-window ad context).
        let adContentDropped = false;
        // Duration of the current ad break extracted from the twitch-stitched-ad
        // DATERANGE tag (DURATION=N.NNN). Forwarded to the content script so it
        // can schedule post-ad stream recovery if the player stalls.
        let adBreakDuration = 0;
        // Set to true when a twitch-stitched-ad DATERANGE is encountered before a
        // DISCONTINUITY. Allows the DISC handler to classify the DISC as an ad
        // opener even when the following block contains only #EXT-X-TWITCH-PREFETCH
        // tags (opaque CDN URLs with no recognisable ad markers). This happens in
        // the first playlist poll of an ad break: the ad EXTINF entries have not yet
        // entered the rolling window, but PREFETCH hints for the first two ad segments
        // are already present and will be downloaded by IVS if not suppressed.
        let sawAdDaterange = false;

        while (i < lines.length) {
            const line = lines[i];
            const trimmed = line.trim();

            if (dropNextSegmentUrl && trimmed !== '' && !trimmed.startsWith('#')) {
                dropNextSegmentUrl = false;
                i++;
                continue;
            }

            if (trimmed === '#EXT-X-DISCONTINUITY') {
                // Safety: clear the pending URL-drop flag so a live URL after
                // the DISC is never accidentally swallowed.
                dropNextSegmentUrl = false;

                let j = i + 1;
                let isAdBlock = false;
                let foundExtinfAfterDisc = false;
                while (j < lines.length && lines[j].trim() !== '#EXT-X-DISCONTINUITY') {
                    if (hasAdMarker(lines[j])) { isAdBlock = true; break; }
                    if (lines[j].trim().startsWith('#EXTINF')) foundExtinfAfterDisc = true;
                    j++;
                }
                // Fallback for the first playlist poll of an ad break: the
                // twitch-stitched-ad DATERANGE was already seen (sawAdDaterange) but
                // the DISC lookahead found no annotated EXTINFs — only opaque
                // #EXT-X-TWITCH-PREFETCH tags for the first 1-2 ad segments. Treat
                // the DISC as an ad opener so those PREFETCH URLs are consumed before
                // IVS can download and render the ad content.
                // Guard: require !foundExtinfAfterDisc to avoid misfiring on the
                // closing DISC (ad→live boundary) which always has live EXTINFs after it.
                if (!isAdBlock && sawAdDaterange && !foundExtinfAfterDisc) {
                    isAdBlock = true;
                }

                if (isAdBlock) {
                    // Consume the opening DISCONTINUITY silently — never emit it.
                    // When the ad block straddles the rolling-window boundary (no
                    // closing DISC in this playlist), emitting a dangling DISC
                    // leaves the IVS player waiting for a segment that never
                    // arrives, causing a stall.
                    i++;
                    let closedWithCueIn = false;
                    let closedWithDisc = false;
                    while (i < lines.length) {
                        const skipped = lines[i].trim();
                        if (skipped.startsWith('#EXTINF')) adsRemoved++;
                        i++;
                        if (skipped === '#EXT-X-DISCONTINUITY') { closedWithDisc = true; break; }
                        if (skipped === '#EXT-X-CUE-IN') { closedWithCueIn = true; break; }
                    }
                    if (!closedWithCueIn && i < lines.length && lines[i].trim() === '#EXT-X-CUE-IN') i++;
                    // When a closing DISC was found it marks the boundary where live
                    // content resumes. Emit it so IVS reinitialises its AV decoders
                    // with the live stream's codec parameters (new EXT-X-MAP follows).
                    // Without this tag the H.264 decoder is not reset; audio (AAC)
                    // plays through but video shows as offline.
                    // When no closing DISC exists (ad block straddles window edge)
                    // we stay silent — emitting a dangling DISC would cause a stall.
                    if (closedWithDisc) out.push('#EXT-X-DISCONTINUITY');
                    // Reset flags: ad block fully consumed.
                    adContentDropped = false;
                    sawAdDaterange = false;
                    continue;
                }

                // Not an ad-opening DISC by lookahead, but ad content was
                // dropped earlier in this window (opening DISC has rolled off).
                // The current DISC is the closing boundary (ad→live). Emit it so
                // IVS reinitialises its AV decoders; without it the H.264 track
                // stays in ad-codec state and the video shows offline while audio
                // continues normally.
                if (adContentDropped) {
                    i++;
                    if (i < lines.length && lines[i].trim() === '#EXT-X-CUE-IN') i++;
                    out.push('#EXT-X-DISCONTINUITY');
                    adContentDropped = false;
                    continue;
                }
            }

            // Detect standalone EXTINF ad segments (Amazon creative IDs or
            // other ad markers embedded in the EXTINF title field).
            if (trimmed.startsWith('#EXTINF') && hasAdMarker(trimmed)) {
                adsRemoved++;
                dropNextSegmentUrl = true;
                adContentDropped = true;
                i++;
                continue;
            }

            if (trimmed.startsWith('#') && hasAdMarker(trimmed)) {
                // Signal that an ad DISC is coming up so the DISC handler can fall
                // back to sawAdDaterange when only PREFETCH tags follow the DISC.
                // Use stitched-ad as the trigger — it is ad-specific and reliable.
                // Session-persistent tags (twitch-trigger, twitch-session, timestamp)
                // must NOT set this flag or every DISC in the session would be
                // misidentified as an ad opener.
                if (trimmed.includes('stitched-ad')) {
                    sawAdDaterange = true;
                }

                // Extract ad break duration so the content script can schedule
                // post-ad stream recovery if the player stalls.
                if (adBreakDuration === 0 && trimmed.includes('twitch-stitched-ad')) {
                    const m = trimmed.match(/\bDURATION=([0-9.]+)/);
                    if (m) adBreakDuration = parseFloat(m[1]);
                }
                i++;
                continue;
            }

            // Drop #EXT-X-PROGRAM-DATE-TIME tags that precede a dropped ad
            // segment. Without this, the orphaned timestamp tag stays in the
            // filtered output with no following segment, which can confuse the
            // IVS player. Lookahead stops at the next DISCONTINUITY so we never
            // accidentally suppress a PDT that belongs to live content.
            if (trimmed.startsWith('#EXT-X-PROGRAM-DATE-TIME')) {
                let k = i + 1;
                while (k < lines.length &&
                       !lines[k].trim().startsWith('#EXTINF') &&
                       lines[k].trim() !== '#EXT-X-DISCONTINUITY') {
                    k++;
                }
                if (k < lines.length &&
                    lines[k].trim() !== '#EXT-X-DISCONTINUITY' &&
                    hasAdMarker(lines[k])) {
                    i++;
                    continue;
                }
            }

            if (trimmed !== '' && !trimmed.startsWith('#')) {
                if (isAdSegmentUrl(trimmed)) {
                    if (out.length > 0 && out[out.length - 1].trim().startsWith('#EXTINF')) {
                        out.pop();
                    }
                    adsRemoved++;
                } else {
                    let finalUrl = trimmed;
                    if (baseUrl && !trimmed.startsWith('http')) {
                        try {
                            finalUrl = new URL(trimmed, baseUrl).toString();
                        } catch (e) {}
                    }
                    out.push(finalUrl);
                }
                i++;
                continue;
            }

            if (trimmed.startsWith('#EXT-X-MAP:')) {
                if (baseUrl) {
                    const match = trimmed.match(/URI="([^"]+)"/);
                    if (match && !match[1].startsWith('http')) {
                        try {
                            const absUrl = new URL(match[1], baseUrl).toString();
                            out.push(trimmed.replace(`URI="${match[1]}"`, `URI="${absUrl}"`));
                            i++;
                            continue;
                        } catch (e) {}
                    }
                }
            }

            out.push(line);
            i++;
        }

        return { filtered: out.join('\n'), adsRemoved, adBreakDuration };
    }

    function shouldProcessUrl(url) {
        if (typeof url !== 'string') return false;
        // Match explicit .m3u8 URLs
        if (url.includes('.m3u8')) return true;
        // Twitch variant playlists use path-based URLs without .m3u8 extension
        // e.g. https://video-weaver.xxx.hls.ttvnw.net/v1/playlist/...
        //      https://euw12.playlist.ttvnw.net/v1/playlist/...
        if (url.includes('.ttvnw.net/') && url.includes('/playlist/')) return true;
        return false;
    }

    /**
     * Installs fetch/XHR playlist filters on the given global scope.
     */
    function installFetchAndXhrInterceptor(globalObj, onAdsRemoved) {
        // ─── Fetch Intercept ──────────────────────────────────────────────
        const nativeFetch = globalObj.fetch;

        if (typeof nativeFetch === 'function') {
            globalObj.fetch = async function (...args) {
                const url = (typeof args[0] === 'string' ? args[0] : args[0]?.url) ?? '';
                const response = await nativeFetch.apply(this, args);

                if (!shouldProcessUrl(url)) {
                    // Fallback: check content-type for HLS playlists on ttvnw.net
                    const ct = response.headers.get('content-type') || '';
                    if (!url.includes('.ttvnw.net') || !ct.includes('mpegurl')) return response;
                }

                // Clone so we can fall back to the original on error
                const clone = response.clone();

                try {
                    const text = await response.text();
                    const { filtered, adsRemoved, adBreakDuration } = filterM3U8(text, response.url);
                    if (adsRemoved > 0) onAdsRemoved(adsRemoved, adBreakDuration);

                    // Strip encoding/length headers: response.text() already decompresses
                    // the body, but the original headers still say content-encoding: gzip.
                    // If we forward that header with a plaintext body, the player (Amazon
                    // IVS WASM) attempts manual gzip decompression, fails, and falls back
                    // to re-fetching the unfiltered playlist — bypassing our filter.
                    const headers = new Headers();
                    for (const [name, value] of response.headers) {
                        const lower = name.toLowerCase();
                        if (lower === 'content-encoding') continue;
                        if (lower === 'content-length') continue;
                        if (lower === 'transfer-encoding') continue;
                        headers.set(name, value);
                    }
                    const res = new Response(filtered, {
                        status: response.status,
                        statusText: response.statusText,
                        headers,
                    });
                    Object.defineProperty(res, 'url', { value: response.url });
                    Object.defineProperty(res, 'redirected', { value: response.redirected });
                    return res;
                } catch {
                    // On any parse/network error return the unmodified clone
                    return clone;
                }
            };
        }

        // ─── XMLHttpRequest Intercept ─────────────────────────────────────
        const XHR = globalObj.XMLHttpRequest;
        if (!XHR?.prototype?.open) return;

        const nativeOpen = XHR.prototype.open;

        XHR.prototype.open = function (method, url, ...rest) {
            const urlStr = (typeof url === 'string' ? url : url?.toString()) ?? '';
            if (shouldProcessUrl(urlStr)) {
                const xhr = this;
                let handled = false;

                // Use readystatechange so our handler runs before any 'load'
                // listeners that the player adds after open().
                xhr.addEventListener('readystatechange', function () {
                    if (xhr.readyState === 4 && xhr.status === 200 && !handled) {
                        handled = true;
                        try {
                            const { filtered, adsRemoved, adBreakDuration } = filterM3U8(xhr.responseText, xhr.responseURL);
                            if (adsRemoved > 0) {
                                // Shadow native read-only response getters with
                                // own configurable props on this instance.
                                Object.defineProperty(xhr, 'responseText', { value: filtered, configurable: true });
                                Object.defineProperty(xhr, 'response', { value: filtered, configurable: true });
                                onAdsRemoved(adsRemoved, adBreakDuration);
                            }
                        } catch { }
                    }
                });
            }
            return nativeOpen.apply(this, [method, url, ...rest]);
        };
    }

    const dispatchBlocked = (count, adBreakDuration = 0) => {
        if (count > 0) {
            window.dispatchEvent(new CustomEvent('twitch-ad-blocker-intercepted', {
                detail: { count, adBreakDuration },
            }));
        }
    };

    installFetchAndXhrInterceptor(window, dispatchBlocked);

    // ─── Worker Interceptor ───────────────────────────────────────────────
    //
    // Twitch uses the Amazon IVS WASM worker (amazon-ivs-wasmworker.min-*.js)
    // to fetch all HLS playlists. The worker runs in an isolated context where
    // window.fetch override is invisible.
    //
    // Fix: redirect the Worker to an inline Blob URL that patches self.fetch
    // bounds to remove ad playlists before calling importScripts() on the original worker.

    /**
     * Builds the JavaScript source code that, when prepended to a Worker blob,
     * patches `self.fetch` inside the worker to run our M3U8 ad-filter.
     */
    function buildWorkerPatchCode() {
        return `
            // ── Twitch Ad Blocker: Worker-level M3U8 filter ──
            (() => {
                if (self.__twitch_ab_patched) return;   // guard against double-patch
                self.__twitch_ab_patched = true;

                const AD_MARKERS = ${JSON.stringify(AD_MARKERS)};
                const AD_SEGMENT_DOMAINS = ${JSON.stringify(AD_SEGMENT_DOMAINS)};

                function hasAdMarker(line) { return AD_MARKERS.some(m => line.includes(m)); }
                function isAdSegmentUrl(url) { return AD_SEGMENT_DOMAINS.some(d => url.includes(d)); }

                ${filterM3U8.toString()}

                let _statsChannel = null;
                try { _statsChannel = new BroadcastChannel('twitch-ab-stats'); } catch {}

                const nativeFetch = self.fetch;

                // ─── Ad-free backup stream ──────────────────────────────────
                // Stripping a 30 s midroll leaves the player with no segments to
                // play, so it stalls and IVS declares the stream offline. Instead,
                // when a stitched-ad break is detected we swap in segments from an
                // ad-free backup stream. The "picture-by-picture" player type never
                // receives midroll ads, so a PlaybackAccessToken requested under it
                // yields an ad-free encoding of the same live broadcast.
                //
                // Stream context (channel/quality/Client-ID/Device-ID) is relayed
                // from the main thread, which can read location + the player's own
                // GraphQL headers. The worker cannot see those directly.
                const _si = { channel: '', quality: '', clientId: 'kimne78kx3ncx6brgo4mv6wki5h1ko', deviceId: '' };
                const _backupCache = { ts: 0, master: '', channel: '' };
                try {
                    const _infoChan = new BroadcastChannel('twitch-ab-stream-info');
                    _infoChan.onmessage = (e) => {
                        const d = e.data;
                        if (d && d.channel) {
                            _si.channel = d.channel;
                            if (d.quality) _si.quality = d.quality;
                            if (d.clientId) _si.clientId = d.clientId;
                            if (d.deviceId) _si.deviceId = d.deviceId;
                        }
                    };
                    _infoChan.postMessage({ request: true }); // ask main thread to (re)send info
                } catch {}

                async function _getAccessToken(channel) {
                    const body = {
                        operationName: 'PlaybackAccessToken_Template',
                        query: 'query PlaybackAccessToken_Template($login: String!, $isLive: Boolean!, $vodID: ID!, $isVod: Boolean!, $playerType: String!) {  streamPlaybackAccessToken(channelName: $login, params: {platform: "web", playerBackend: "mediaplayer", playerType: $playerType}) @include(if: $isLive) {    value    signature    __typename  }  videoPlaybackAccessToken(id: $vodID, params: {platform: "web", playerBackend: "mediaplayer", playerType: $playerType}) @include(if: $isVod) {    value    signature    __typename  }}',
                        variables: { isLive: true, login: channel, isVod: false, vodID: '', playerType: 'picture-by-picture' },
                    };
                    const headers = { 'Content-Type': 'application/json', 'Client-ID': _si.clientId };
                    if (_si.deviceId) { headers['Device-ID'] = _si.deviceId; headers['X-Device-Id'] = _si.deviceId; }
                    const r = await nativeFetch('https://gql.twitch.tv/gql', { method: 'POST', body: JSON.stringify(body), headers });
                    if (!r.ok) return null;
                    const j = await r.json();
                    const t = j && j.data && j.data.streamPlaybackAccessToken;
                    return t ? { value: t.value, signature: t.signature } : null;
                }

                async function _getBackupMaster(channel) {
                    const now = Date.now();
                    if (_backupCache.channel === channel && (now - _backupCache.ts) < 20000 && _backupCache.master) {
                        return _backupCache.master;
                    }
                    const tok = await _getAccessToken(channel);
                    if (!tok) return '';
                    const p = new URLSearchParams({
                        allow_source: 'true', allow_audio_only: 'true', fast_bread: 'true',
                        p: String(Math.floor(Math.random() * 1e7)), player_backend: 'mediaplayer',
                        playlist_include_framerate: 'true', reassignments_supported: 'true',
                        sig: tok.signature, token: tok.value, supported_codecs: 'avc1',
                        cdm: 'wv', player_version: '1.0.0',
                    });
                    const url = 'https://usher.ttvnw.net/api/channel/hls/' + encodeURIComponent(channel) + '.m3u8?' + p.toString();
                    const r = await nativeFetch(url);
                    if (!r.ok) return '';
                    const master = await r.text();
                    _backupCache.ts = now; _backupCache.master = master; _backupCache.channel = channel;
                    return master;
                }

                function _pickVariant(master, quality) {
                    const lines = master.split('\\n');
                    const variants = [];
                    for (let k = 0; k < lines.length; k++) {
                        if (lines[k].indexOf('#EXT-X-STREAM-INF') === 0) {
                            let u = '';
                            for (let m = k + 1; m < lines.length; m++) {
                                const s = lines[m].trim();
                                if (s && s.charAt(0) !== '#') { u = s; break; }
                            }
                            if (u) variants.push({ info: lines[k], url: u });
                        }
                    }
                    if (!variants.length) return '';
                    if (quality) {
                        for (const v of variants) {
                            if (v.info.indexOf('VIDEO="' + quality + '"') !== -1 ||
                                v.info.indexOf('NAME="' + quality) !== -1) return v.url;
                        }
                    }
                    // Fallback: highest non-audio variant (master lists best first).
                    for (const v of variants) {
                        if (v.info.indexOf('audio_only') === -1) return v.url;
                    }
                    return variants[0].url;
                }

                async function _getBackupPlaylist() {
                    if (!_si.channel) return null;
                    try {
                        const master = await _getBackupMaster(_si.channel);
                        if (!master) return null;
                        const vurl = _pickVariant(master, _si.quality);
                        if (!vurl) return null;
                        const r = await nativeFetch(vurl);
                        if (!r.ok) return null;
                        const text = await r.text();
                        // Safety: if the backup somehow still carries an ad, bail to strip.
                        if (hasAdMarker(text)) return null;
                        return { text, url: vurl };
                    } catch { return null; }
                }

                self.fetch = async function (...args) {
                    const url = (typeof args[0] === 'string' ? args[0] : args[0]?.url) ?? '';
                    const response = await nativeFetch.apply(this, args);

                    if (typeof url !== 'string') return response;
                    let isPlaylist = url.includes('.m3u8') || (url.includes('.ttvnw.net/') && url.includes('/playlist/'));
                    if (!isPlaylist) {
                        const ct = response.headers.get('content-type') || '';
                        if (!url.includes('.ttvnw.net') || !ct.includes('mpegurl')) return response;
                    }

                    const clone = response.clone();
                    try {
                        const text = await response.text();
                        const { filtered, adsRemoved, adBreakDuration } = filterM3U8(text, response.url);
                        if (adsRemoved > 0) {
                            try { _statsChannel?.postMessage({ adsRemoved, adBreakDuration }); } catch {}
                            // Midroll: serve an ad-free backup stream instead of the
                            // starved (ad-stripped) playlist, which would freeze IVS.
                            if (text.indexOf('twitch-stitched-ad') !== -1) {
                                const backup = await _getBackupPlaylist();
                                if (backup) {
                                    const bh = new Headers();
                                    bh.set('Content-Type', 'application/vnd.apple.mpegurl');
                                    const bres = new Response(backup.text, { status: 200, statusText: 'OK', headers: bh });
                                    try { Object.defineProperty(bres, 'url', { value: response.url }); } catch {}
                                    return bres;
                                }
                            }
                        }
                        const headers = new Headers();
                        for (const [name, value] of response.headers) {
                            const lower = name.toLowerCase();
                            if (lower === 'content-encoding' || lower === 'content-length' || lower === 'transfer-encoding') continue;
                            headers.set(name, value);
                        }
                        const res = new Response(filtered, {
                            status: response.status,
                            statusText: response.statusText,
                            headers,
                        });
                        Object.defineProperty(res, 'url', { value: response.url });
                        Object.defineProperty(res, 'redirected', { value: response.redirected });
                        return res;
                    } catch {
                        return clone;
                    }
                };

                // ─── XHR fallback (IVS may use XHR for playlists) ────────
                const _XHR = self.XMLHttpRequest;
                if (_XHR?.prototype?.open) {
                    const _nativeOpen = _XHR.prototype.open;
                    _XHR.prototype.open = function (method, url, ...rest) {
                        const urlStr = (typeof url === 'string' ? url : url?.toString()) ?? '';
                        if (urlStr.includes('.ttvnw.net/') && urlStr.includes('/playlist/') ||
                            urlStr.includes('.m3u8')) {
                            const xhr = this;
                            let handled = false;
                            xhr.addEventListener('readystatechange', function () {
                                if (xhr.readyState === 4 && xhr.status === 200 && !handled) {
                                    handled = true;
                                    try {
                                        const { filtered, adsRemoved, adBreakDuration } = filterM3U8(xhr.responseText, xhr.responseURL);
                                        if (adsRemoved > 0) {
                                            Object.defineProperty(xhr, 'responseText', { value: filtered, configurable: true });
                                            Object.defineProperty(xhr, 'response', { value: filtered, configurable: true });
                                            try { _statsChannel?.postMessage({ adsRemoved, adBreakDuration }); } catch {}
                                        }
                                    } catch {}
                                }
                            });
                        }
                        return _nativeOpen.apply(this, [method, url, ...rest]);
                    };
                }
            })();
        `;
    }

    function installWorkerInterceptor() {
        const patchCode = buildWorkerPatchCode();

        // ── 1. Intercept URL.createObjectURL ────────────────────────────
        // Amazon IVS WASM player creates its worker via a Blob URL.
        // We recognise JS blobs by MIME type and prepend our filter code.
        //
        // IVS SDK uses 'application/javascript; charset=utf-8' (with charset
        // parameter). A strict Set lookup misses this, so we strip parameters
        // before comparison.
        const isJsBlob = (blob) => {
            if (!(blob instanceof Blob)) return false;
            const base = (blob.type || '').split(';')[0].trim().toLowerCase();
            return !base || base === 'application/javascript' ||
                   base === 'text/javascript' || base === 'application/ecmascript';
        };
        const nativeCreateObjectURL = URL.createObjectURL;

        URL.createObjectURL = function (obj) {
            if (isJsBlob(obj)) {
                const patched = new Blob(
                    [patchCode, obj],
                    { type: obj.type || 'application/javascript' },
                );
                return nativeCreateObjectURL.call(this, patched);
            }
            return nativeCreateObjectURL.call(this, obj);
        };

        // ── 2. Intercept Worker constructor ──────────────────────────────
        // Fallback for Workers created via regular URLs or data: URIs
        // that bypass our createObjectURL hook.
        const NativeWorker = window.Worker;
        window.Worker = function (url, options) {
            const urlStr = typeof url === 'string' ? url : url?.toString?.() ?? '';

            // Blob URLs are already patched by the createObjectURL hook above
            if (urlStr.startsWith('blob:')) {
                return new NativeWorker(url, options);
            }

            // For data: URLs — decode, prepend patch, re-encode
            if (urlStr.startsWith('data:')) {
                try {
                    // data:[<mediatype>][;base64],<data>
                    const comma = urlStr.indexOf(',');
                    const meta = urlStr.slice(0, comma);
                    const isBase64 = meta.includes(';base64');
                    const raw = isBase64
                        ? atob(urlStr.slice(comma + 1))
                        : decodeURIComponent(urlStr.slice(comma + 1));
                    const patched = new Blob(
                        [patchCode, raw],
                        { type: 'application/javascript' },
                    );
                    return new NativeWorker(
                        nativeCreateObjectURL.call(URL, patched),
                        options,
                    );
                } catch {
                    return new NativeWorker(url, options);
                }
            }

            // For regular URLs — fetch the script, prepend patch, create Blob URL
            // We must return the Worker synchronously, so we create a tiny bootstrap
            // worker that fetches the original script and evals it after our patch.
            try {
                const bootstrapCode = `
                    ${patchCode}
                    importScripts(${JSON.stringify(urlStr)});
                `;
                const bootstrapBlob = new Blob(
                    [bootstrapCode],
                    { type: 'application/javascript' },
                );
                return new NativeWorker(
                    nativeCreateObjectURL.call(URL, bootstrapBlob),
                    // Module workers use import(), not importScripts();
                    // fall back to native for those.
                    options?.type === 'module' ? undefined : options,
                );
            } catch {
                return new NativeWorker(url, options);
            }
        };
        // Preserve prototype chain so instanceof checks still work
        window.Worker.prototype = NativeWorker.prototype;
    }

    installWorkerInterceptor();

    // ─── Stream-info publisher (main thread → Worker) ─────────────────────
    //
    // The Worker fetches an ad-free backup stream during midrolls but cannot
    // see the channel, the selected quality, or the player's GraphQL auth
    // headers. We capture those on the main thread and relay them.
    (function setupStreamInfoPublisher() {
        let infoChan;
        try { infoChan = new BroadcastChannel('twitch-ab-stream-info'); } catch { return; }

        const captured = { clientId: '', deviceId: '' };

        function currentChannel() {
            const parts = location.pathname.split('/');
            const seg = (parts[1] || '').toLowerCase();
            // /popout/{channel}/chat and /moderator/{channel} nest the channel one level deeper.
            if ((seg === 'popout' || seg === 'moderator') && parts[2]) return parts[2].toLowerCase();
            const nonChannel = ['', 'videos', 'directory', 'search', 'settings', 'subscriptions',
                'wallet', 'friends', 'u', 'p', 'downloads', 'turbo', 'store', 'jobs', 'prime',
                'popout', 'moderator', 'team', 'drops', 'bits'];
            return nonChannel.indexOf(seg) !== -1 ? '' : seg;
        }

        function currentQuality() {
            try {
                const q = JSON.parse(localStorage.getItem('video-quality') || '{}');
                return q.default || '';
            } catch { return ''; }
        }

        function publish() {
            try {
                infoChan.postMessage({
                    channel: currentChannel(),
                    quality: currentQuality(),
                    clientId: captured.clientId || 'kimne78kx3ncx6brgo4mv6wki5h1ko',
                    deviceId: captured.deviceId,
                });
            } catch {}
        }

        // Worker pings { request: true } once it boots; reply with current info.
        infoChan.onmessage = (e) => { if (e.data && e.data.request) publish(); };

        // Capture Client-ID / Device-ID from the player's own GraphQL requests.
        const nativeFetch = window.fetch;
        window.fetch = function (input, init) {
            try {
                const u = typeof input === 'string' ? input : (input && input.url) || '';
                if (u.indexOf('gql.twitch.tv') !== -1) {
                    const h = (init && init.headers) || (input && input.headers);
                    const read = (name) => {
                        if (!h) return '';
                        if (typeof h.get === 'function') return h.get(name) || '';
                        return h[name] || h[name.toLowerCase()] || '';
                    };
                    const cid = read('Client-ID') || read('Client-Id');
                    const did = read('Device-ID') || read('X-Device-Id');
                    if (cid) captured.clientId = cid;
                    if (did) captured.deviceId = did;
                }
            } catch {}
            return nativeFetch.apply(this, arguments);
        };

        publish();
        setInterval(publish, 5000);
    })();

    // Relay blocked-ad counts from the Worker back to the content script
    // (the Worker uses BroadcastChannel; this side relays them as a window event).
    try {
        new BroadcastChannel('twitch-ab-stats').onmessage = (e) => {
            // Worker posts { adsRemoved, adBreakDuration }; legacy fallback: plain number.
            const count = typeof e.data === 'object' ? e.data.adsRemoved : e.data;
            const dur   = typeof e.data === 'object' ? (e.data.adBreakDuration || 0) : 0;
            if (count > 0) dispatchBlocked(count, dur);
        };
    } catch {}
})();
