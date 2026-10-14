/**
 * Cosmetic Ad Counter — Content Script
 *
 * Counts ad elements hidden by the extension's cosmetic (CSS) filters so the
 * popup can show a single unified "ads blocked" total together with the video
 * ads counted on YouTube/Twitch. Runs on all http(s) sites EXCEPT YouTube and
 * Twitch (handled by their dedicated scripts) and only while blocking is enabled
 * for the page.
 *
 * Note: network-level (DNR) blocks are invisible to extensions in MV3, so this
 * total covers page-visible cosmetic ads + video ads — not silently-blocked
 * network requests.
 */
(() => {
    'use strict';

    const COUNTED_ATTR = 'data-ab-counted';
    const SCAN_THROTTLE_MS = 1000;

    let combined = '';                 // joined, validated selector string
    let throttleTimer = null;
    let pendingRoots = new Set();      // subtrees added since the last scan

    // Ask the background for the cosmetic selectors that apply to this domain.
    // Returns [] when blocking is disabled for the page → we count nothing.
    chrome.runtime.sendMessage({ type: 'GET_COSMETIC_SELECTORS' })
        .then((res) => {
            const selectors = (res && res.selectors) || [];
            if (!selectors.length) return;

            // Drop selectors that aren't valid querySelectorAll syntax. EasyList
            // ships ABP-extended selectors (:has-text(), :-abp-..., :style(), ...)
            // that throw and would abort the entire query. Validated once at load.
            const valid = selectors.filter(isValidSelector);
            if (!valid.length) return;

            combined = valid.join(',');
            // The first pass runs the large selector list over the whole document,
            // so defer it to main-thread idle time to avoid competing with render.
            runWhenIdle(initialScan);
            startObserver();
        })
        .catch(() => {});

    function runWhenIdle(fn) {
        if (typeof requestIdleCallback === 'function') {
            requestIdleCallback(fn, { timeout: 2000 });
        } else {
            setTimeout(fn, 200);
        }
    }

    function isValidSelector(sel) {
        try { document.createDocumentFragment().querySelector(sel); return true; }
        catch { return false; }
    }

    function report(count) {
        if (count > 0) {
            try { chrome.runtime.sendMessage({ type: 'AD_BLOCKED', count }); } catch {}
        }
    }

    // One full-document pass for ad elements already present at load.
    function initialScan() {
        let nodes;
        try { nodes = document.querySelectorAll(combined); }
        catch { return; }
        report(markNew(nodes));
    }

    // Marks not-yet-counted elements and returns how many were newly counted.
    function markNew(nodes) {
        let n = 0;
        for (const el of nodes) {
            if (el.hasAttribute(COUNTED_ATTR)) continue;
            el.setAttribute(COUNTED_ATTR, '1');
            n++;
        }
        return n;
    }

    // After load, only inspect newly-added subtrees (cheap) instead of rescanning
    // the whole document against the large selector list on every mutation.
    function startObserver() {
        const observer = new MutationObserver((mutations) => {
            for (const m of mutations) {
                for (const node of m.addedNodes) {
                    if (node.nodeType === 1) pendingRoots.add(node);
                }
            }
            scheduleScan();
        });
        observer.observe(document.documentElement, { childList: true, subtree: true });
    }

    function scheduleScan() {
        if (throttleTimer) return;
        throttleTimer = setTimeout(() => {
            throttleTimer = null;
            scanPending();
        }, SCAN_THROTTLE_MS);
    }

    function scanPending() {
        if (!combined || pendingRoots.size === 0) return;
        const roots = pendingRoots;
        pendingRoots = new Set();

        let n = 0;
        for (const root of roots) {
            if (!root.isConnected) continue;
            // The added node itself may match a selector.
            try {
                if (!root.hasAttribute(COUNTED_ATTR) && root.matches(combined)) {
                    root.setAttribute(COUNTED_ATTR, '1');
                    n++;
                }
            } catch {}
            // ...as may anything inside its subtree.
            let nodes;
            try { nodes = root.querySelectorAll(combined); }
            catch { nodes = []; }
            n += markNew(nodes);
        }
        report(n);
    }
})();
