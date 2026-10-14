const navLocks = new Map();
const RINKU_RULE_ID = 4201001;

function clampWaitTime(value) {
    const n = parseInt(value, 10);
    if (Number.isNaN(n)) return 25;
    return Math.max(0, Math.min(60, n));
}

function syncRinkuRedirectRule() {
    if (!chrome.declarativeNetRequest?.updateDynamicRules) return;
    chrome.storage.local.get(['easxEnabled', 'easxWaitTime'], (result) => {
        const enabled = result.easxEnabled !== false;
        const wait = clampWaitTime(result.easxWaitTime);
        const options = { removeRuleIds: [RINKU_RULE_ID] };
        if (enabled) {
            options.addRules = [{
                id: RINKU_RULE_ID,
                priority: 1,
                action: {
                    type: 'redirect',
                    redirect: {
                        regexSubstitution: `https://bypass.tools/wait?url=\\0&wait=${wait}`
                    }
                },
                condition: {
                    regexFilter: '^https?://(www\\.)?rinku\\.pro/[A-Za-z0-9_-]+/?$',
                    resourceTypes: ['main_frame']
                }
            }];
        }
        chrome.declarativeNetRequest.updateDynamicRules(options, () => {
            if (chrome.runtime.lastError) {
                console.warn('[BypassTools] Rinku redirect rule update failed:', chrome.runtime.lastError.message);
            }
        });
    });
}

syncRinkuRedirectRule();
chrome.runtime.onInstalled?.addListener(syncRinkuRedirectRule);
chrome.runtime.onStartup?.addListener(syncRinkuRedirectRule);
chrome.storage.onChanged.addListener((changes, area) => {
    if (area === 'local' && (changes.easxEnabled || changes.easxWaitTime)) {
        syncRinkuRedirectRule();
    }
});

async function performExtensionFetch(request) {
    const _bgAbort = new AbortController();
    const _bgTimeout = setTimeout(() => _bgAbort.abort(), 28000);
    try {
        const response = await fetch(request.url, {
            method: request.method || 'GET',
            headers: request.headers || {},
            body: request.data || null,
            signal: _bgAbort.signal
        });
        clearTimeout(_bgTimeout);
        const text = await response.text();
        return {
            status: response.status,
            statusText: response.statusText,
            responseText: text
        };
    } catch (error) {
        clearTimeout(_bgTimeout);
        if (error.name !== 'AbortError') {
            console.warn('[BypassTools] Background fetch error:', error.message || error);
        }
        return {
            error: error.name === 'AbortError' ? 'Request timed out' : error.toString()
        };
    }
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.type === 'bt-lock-nav' && sender.tab && sender.tab.id) {
        const tabId = sender.tab.id;
        navLocks.set(tabId, {
            stayUrl: request.stayUrl,
            dest: request.dest,
            allow: false,
            restoreCount: 0,
            createdAt: Date.now()
        });
        sendResponse({ ok: true });
        return true;
    }

    if (request.type === 'bt-allow-nav' && sender.tab && sender.tab.id) {
        const tabId = sender.tab.id;
        const lock = navLocks.get(tabId);
        if (lock) {
            lock.allow = true;
            navLocks.set(tabId, lock);
        }
        sendResponse({ ok: true });
        return true;
    }

    if (request.type === 'GM_xmlhttpRequest') {
        performExtensionFetch(request).then(sendResponse);
        return true;
    }
});

chrome.tabs.onRemoved.addListener((tabId) => {
    navLocks.delete(tabId);
});

// main frame eggman
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (!changeInfo.url && changeInfo.status !== 'loading') return;
    const lock = navLocks.get(tabId);
    if (!lock || lock.allow) return;
    if (Date.now() - (lock.createdAt || 0) > 10 * 60 * 1000) {
        navLocks.delete(tabId);
        return;
    }

    const targetUrl = changeInfo.url || tab.url;
    if (!targetUrl) return;

    try {
        const url = new URL(targetUrl);
        const isFavicon = url.pathname.endsWith('/favicon.ico') && url.searchParams.has('referrer');
        const isTask = url.pathname.includes('taskCompleted');
        const hitsDest = lock.dest && targetUrl.includes(lock.dest);
        if ((isFavicon || isTask || hitsDest) && lock.stayUrl) {
            if (targetUrl === lock.stayUrl) return;
            lock.restoreCount = (lock.restoreCount || 0) + 1;
            if (lock.restoreCount > 3) {
                console.warn('[BypassTools Background] Releasing nav lock after repeated restore attempts', targetUrl);
                navLocks.delete(tabId);
                return;
            }
            navLocks.set(tabId, lock);
            console.warn('[BypassTools Background] Blocking auto-nav and restoring stayUrl', targetUrl);
            chrome.tabs.update(tabId, { url: lock.stayUrl });
        }
    } catch (e) {
        console.error('[BypassTools Background] URL parsing error:', e);
    }
});
