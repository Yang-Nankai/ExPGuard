
// BypassTools Extension Shell v4.1.0
// sonic

const unsafeWindow = window; // MAIN_WORLD — window IS the page window.
const BT_LOGO_DATA_URI = 'data:image/png;base64,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';

// i wonder if a butterfly ever wanted a tattoo of an owerweight single mother on its back
const btIsEnabled     = () => document.documentElement.getAttribute('data-easx-enabled')     !== 'false';
const btIsWorkInk     = () => document.documentElement.getAttribute('data-easx-workink')     !== 'false';
const btIsLootLabs    = () => document.documentElement.getAttribute('data-easx-lootlabs')    !== 'false';
const isDevelopment = (location.hostname === 'localhost' || location.hostname === '127.0.0.1') &&
                      (location.port === '13075' || location.port === '3000');

// if trees produce oxygen why we dont put them in the ocean so we can breathe underwater?
(function btHookLootLabsWS() {
    var _llh = location.hostname;
    if (!_llh.includes('lootlabs') && !_llh.includes('loot-labs') && !_llh.includes('links.lootlabs')) return;
    try {
        const _OrigWS = window.WebSocket;
        // Save original so content-module.js can use it directly
        window._btOrigWS = _OrigWS;
        const _fakeWS = () => ({
            readyState: 3, send: () => {}, close: () => {},
            addEventListener: () => {}, removeEventListener: () => {}, dispatchEvent: () => false,
            onopen: null, onclose: null, onmessage: null, onerror: null
        });
        // Replace page's WebSocket: stub lootlabs connections, pass everything else through
        window.WebSocket = function(url, protocols) {
            const urlStr = String(url || '');
            if (urlStr.includes('/c?uid=') && urlStr.includes('&session_id=')) {
                console.log('[BypassTools] LootLabs WS stubbed (page native)');
                return _fakeWS();
            }
            return new _OrigWS(url, protocols);
        };
        window.WebSocket.prototype = _OrigWS.prototype;
        window.WebSocket.CONNECTING = 0; window.WebSocket.OPEN = 1;
        window.WebSocket.CLOSING = 2;   window.WebSocket.CLOSED = 3;
        console.log('[BypassTools] LootLabs WS stub active');
    } catch (e) {
        console.warn('[BypassTools] WebSocket hook setup failed:', e);
    }
})();

// Nothing suprises me at this point
const GM_xmlhttpRequest = (details) => {
    const requestId = Math.random().toString(36).substring(7);

    const timeoutMs = typeof details.timeout === 'number' ? details.timeout : 30000;
    let timeoutHandle = null;

    const handler = (e) => {
        try {
            if (timeoutHandle) clearTimeout(timeoutHandle);
        } catch { }

        let response;
        try {
            // i dont know what HD is but doctor said i have 80 of them
            const raw = e?.detail;
            response = typeof raw === 'string' ? JSON.parse(raw) : raw;
        } catch {
            response = null;
        }

        if (!response) {
            try { if (details.onerror) details.onerror('Empty response'); } catch { }
            window.removeEventListener(`BypassTools_GM_XHR_Response_${requestId}`, handler);
            return;
        }

        let hasError = false;
        let errorVal = null;
        let statusVal = 0;
        let statusTextVal = '';
        let responseTextVal = '';
        try { hasError = !!response.error; errorVal = response.error; } catch { }
        try { statusVal = response.status; } catch { }
        try { statusTextVal = response.statusText; } catch { }
        try { responseTextVal = response.responseText; } catch { }

        if (hasError) {
            if (details.onerror) details.onerror(errorVal);
        } else {
            if (details.onload) details.onload({
                status: statusVal,
                statusText: statusTextVal,
                responseText: responseTextVal,
                finalUrl: details.url,
                readyState: 4
            });
        }

        window.removeEventListener(`BypassTools_GM_XHR_Response_${requestId}`, handler);
    };

    window.addEventListener(`BypassTools_GM_XHR_Response_${requestId}`, handler);

    if (timeoutMs > 0) {
        timeoutHandle = setTimeout(() => {
            try {
                window.removeEventListener(`BypassTools_GM_XHR_Response_${requestId}`, handler);
            } catch { }
            if (details.ontimeout) {
                try { details.ontimeout(); } catch { }
            } else {
                try { if (details.onerror) details.onerror('GM_xmlhttpRequest timeout'); } catch { }
            }
        }, timeoutMs);
    }

    window.dispatchEvent(new CustomEvent('BypassTools_GM_XHR', {
        detail: {
            id: requestId,
            url: details.url,
            method: details.method,
            headers: details.headers,
            data: details.data
        }
    }));
};

const GM_addStyle = (css) => {
    const style = document.createElement('style');
    style.textContent = css;
    (document.head || document.documentElement).append(style);
};

const GM_getValue = (key, def) => {
    const val = localStorage.getItem('GM_' + key);
    return val === null ? def : val;
};
const GM_setValue = (key, val) => localStorage.setItem('GM_' + key, val);
const GM_deleteValue = (key) => localStorage.removeItem('GM_' + key);
const GM_getResourceText = () => "";
const GM_info = { script: { version: "4.1.0" } };
const BT_VERSION = GM_info.script.version;

const createNotifier = () => {
    const fallback = {
        success: (message) => console.log('[BypassTools]', message),
        error: (message) => console.error('[BypassTools]', message),
        information: (message) => console.log('[BypassTools]', message)
    };

    if (typeof unsafeWindow.Notyf !== 'function') {
        return fallback;
    }

    try {
        const notyf = new unsafeWindow.Notyf({ duration: 5000 });
        notyf.information = function (message) {
            this.success({
                message: message,
                duration: 4000,
                dismissible: true,
                background: '#1E88E5',
                icon: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" viewBox="0 0 16 16"><path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412l-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.302.156-.506.258-.678l-.803-.303c-.21.105-.402.26-.523.465l-.728 3.424c-.07.34-.029.533-.304.533-.194 0-.487.07-.686.246l.088-.416c.287-.346-.92-.598-1.465-.598-.703 0-1.002-.422-.808-1.319l.738-3.468c-.064.302-.156.506-.258.678l.803.303c.21-.105.402-.26.523-.465z"/></svg>'
            });
        };
        return notyf;
    } catch (e) {
        return fallback;
    }
};

const sendExtensionMessage = (payload) => {
    try {
        if (unsafeWindow.chrome?.runtime?.sendMessage) {
            unsafeWindow.chrome.runtime.sendMessage(payload);
            return;
        }
    } catch (e) { }

    try {
        window.postMessage({ type: 'bt-ext-forward', payload }, '*');
    } catch (e) { }
};

// it means you have ADHD you numbnuts

// not like you know what its stands for anyway
function gmFetch(url, options = {}) {
    return new Promise((resolve, reject) => {
        GM_xmlhttpRequest({
            method: options.method || 'GET',
            url: url,
            headers: options.headers || {},
            data: options.body,
            timeout: typeof options.timeoutMs === 'number' ? options.timeoutMs : undefined,
            ontimeout: function () {
                reject(new Error('gmFetch timeout'));
            },
            onload: function (response) {
                resolve({
                    ok: response.status >= 200 && response.status < 300,
                    status: response.status,
                    statusText: response.statusText,
                    text: () => Promise.resolve(response.responseText),
                    json: () => Promise.resolve(JSON.parse(response.responseText))
                });
            },
            onerror: function (error) {
                console.error('[BypassTools] gmFetch Error:', error);
                reject(error);
            }
        });
    });
}

// of course i do
try { unsafeWindow.gmFetch = gmFetch; } catch { }
try { window.gmFetch = gmFetch; } catch { }

// ================================
// its attention deficit
// ================================

// hey donuts
(function captureOriginalUrl() {
    if (!unsafeWindow.easxEarlyCapture) {
        const currentUrl = location.href;

        // see what i mean?
        if (!currentUrl.includes('favicon.ico') && !currentUrl.includes('.css') && !currentUrl.includes('.js')) {
            unsafeWindow.easxEarlyCapture = currentUrl;

            // where am i?
            try {
                sessionStorage.setItem('easx_early_capture', currentUrl);
                if (isDevelopment) console.log('[BypassTools] Early capture of URL:', currentUrl);
            } catch (e) { }
        }
    }
})();

// where is tails?
(function interceptReferrerRedirects() {
    // hes going through a very chinese moment in his life
    if (!btIsEnabled()) return;

    const isFavicon = location.pathname.endsWith('favicon.ico');
    const isTaskCompleted = location.pathname.includes('taskCompleted');
    if (!(isFavicon || isTaskCompleted)) return;

    const qp = new URLSearchParams(location.search);
    const refParamRaw = qp.get('referrer') || qp.get('redirect');
    if (!refParamRaw) return;

    const safeDecode = (value) => {
        try { return decodeURIComponent(value); } catch { return value; }
    };

    const decodedRef = safeDecode(refParamRaw);
    const doubleDecodedRef = safeDecode(decodedRef);
    const resolvedDest = (doubleDecodedRef || decodedRef || '').trim();
    if (!resolvedDest) return;

    // What the hell is this?
    if (!resolvedDest.startsWith('http')) return;

    try { window.stop(); } catch (e) { }
    unsafeWindow.easxSkipMain = true;
    unsafeWindow.dest = resolvedDest;

    sendExtensionMessage({ type: 'bt-lock-nav', stayUrl: location.href, dest: resolvedDest });

    document.documentElement.innerHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BypassTools - Destination Ready</title>
    <style>
        :root { --bg-color:#07070a; --accent:#8b5cf6; --accent-hover:#7c3aed; --text-primary:#fff; --text-secondary:#a1a1aa; }
        * { box-sizing: border-box; }
        body {
            font-family: "Segoe UI Variable", "Segoe UI", "Aptos", sans-serif;
            background: linear-gradient(rgba(255,255,255,.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.035) 1px, transparent 1px), var(--bg-color);
            background-size: 52px 52px, 52px 52px, auto;
            color: var(--text-primary);
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            margin: 0;
            overflow: hidden;
            isolation: isolate;
        }
        body::before, body::after { content: ""; position: fixed; width: 420px; height: 420px; border-radius: 999px; background: radial-gradient(circle, rgba(168,85,247,.30), transparent 66%); filter: blur(6px); z-index: -2; animation: drift 12s ease-in-out infinite alternate; }
        body::before { top: -150px; right: -120px; }
        body::after { left: -160px; bottom: -180px; width: 520px; height: 520px; background: radial-gradient(circle, rgba(124,58,237,.22), transparent 68%); animation-duration: 15s; }
        .container {
            position: relative;
            overflow: hidden;
            background: linear-gradient(145deg, rgba(24,24,27,.92), rgba(12,12,15,.88)), radial-gradient(circle at top right, rgba(168,85,247,.15), transparent 220px);
            border: 1px solid rgba(244,244,245,.10);
            border-radius: 28px;
            padding: 34px;
            text-align: center;
            box-shadow: 0 34px 110px rgba(0,0,0,.48);
            max-width: 480px;
            width: min(480px, calc(100vw - 40px));
            animation: fadeIn .5s ease-out;
        }
        .container::before { content: ""; position: absolute; inset: 0; border-radius: inherit; border: 1px solid rgba(168,85,247,.18); pointer-events: none; }
        .brand { display: flex; align-items: center; justify-content: center; gap: 12px; margin-bottom: 34px; flex-wrap: nowrap; width: 100%; }
        .mark { width: 42px; height: 42px; display: grid; place-items: center; border-radius: 15px; border: 1px solid rgba(168,85,247,.34); background: rgba(168,85,247,.10); box-shadow: 0 0 32px rgba(168,85,247,.18); flex: 0 0 auto; }
        .mark img { width: 28px; height: 28px; display: block; filter: drop-shadow(0 8px 16px rgba(168,85,247,.22)); }
        .wordmark { display: inline-flex; align-items: baseline; justify-content: center; flex-flow: row nowrap; font-size: 1.25rem; font-weight: 900; letter-spacing: -.045em; line-height: 1; white-space: nowrap; flex: 0 0 auto; min-width: max-content; }
        .wordmark span { display: inline-block; }
        .wordmark span:first-child { color: var(--accent); }
        .wordmark span:last-child { color: #fff; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes drift { from { transform: translate3d(0,0,0) scale(1); } to { transform: translate3d(-30px,28px,0) scale(1.08); } }
        h1.title {
            font-family: "Aptos Display", "Segoe UI Variable", "Segoe UI", sans-serif;
            font-size: clamp(2rem,3.5vw,3rem);
            line-height: 1.05;
            font-weight: 800;
            margin: 0 0 14px;
            letter-spacing: -.035em;
            color: #fff;
        }
        p.subtitle {
            color: var(--text-secondary);
            font-size: 1rem;
            line-height: 1.65;
            margin: 0 0 28px;
        }
        .countdown {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            min-height: 42px;
            margin: 4px 0 18px;
            padding: 10px 14px;
            border-radius: 999px;
            border: 1px solid rgba(245,158,11,.26);
            background: rgba(245,158,11,.10);
            color: #fcd34d;
            font-size: .86rem;
            line-height: 1.25;
            font-weight: 800;
        }
        .next-btn {
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 52px;
            background: linear-gradient(135deg, var(--accent), var(--accent-hover));
            color: white;
            border: 1px solid rgba(196,181,253,.38);
            padding: 0 20px;
            font-size: 1rem;
            font-weight: 850;
            border-radius: 18px;
            cursor: pointer;
            width: 100%;
            box-shadow: 0 16px 44px rgba(168,85,247,.26), inset 0 1px 0 rgba(255,255,255,.16);
            transition: all .2s ease;
            letter-spacing: .01em;
            line-height: 1;
            text-align: center;
        }
        .next-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 18px 46px rgba(139,92,246,.34);
        }
        .next-btn:disabled {
            background: #27272a;
            color: #52525b;
            cursor: not-allowed;
            box-shadow: none;
            transform: none;
        }
        .footer { margin-top: 26px; font-size: 0.78rem; color: #52525b; }
        .footer a { color: #71717a; text-decoration: none; transition: color 0.2s; }
        .footer a:hover { color: var(--accent); }
    </style>
</head>
<body>
    <div class="container">
        <div class="brand"><div class="mark"><img src="${BT_LOGO_DATA_URI}" alt=""></div><div class="wordmark"><span>Bypass</span><span>Tools</span></div></div>
        <h1 class="title">Your link is ready.</h1>
        <p class="subtitle">The destination has been prepared. Continue when ready.</p>
        <div id="countdown" class="countdown"></div>
        <button id="nextBtn" class="next-btn">Open Destination</button>
        <div class="footer">Powered by <a href="https://bypass.tools" target="_blank" rel="noopener noreferrer">BypassTools</a> · v${BT_VERSION}</div>
    </div>
</body>
</html>`;

    const countdownEl = document.getElementById('countdown');
    const btn = document.getElementById('nextBtn');

    const hasHash = resolvedDest.includes('hash=');
    if (countdownEl) {
        if (hasHash) {
            let time = 8;
            countdownEl.textContent = `Hash expires in ${time}s. Open the destination now.`;
            const interval = setInterval(() => {
                time -= 1;
                if (time > 0) {
                    countdownEl.textContent = `Hash expires in ${time}s. Open the destination now.`;
                    return;
                }

                clearInterval(interval);
                countdownEl.textContent = 'This time-sensitive link may be expired. If it fails, restart the bypass from the original page.';
            }, 1000);
        } else {
            countdownEl.style.display = 'none';
        }
    }

    if (btn) {
        btn.addEventListener('click', () => {
            if (btn.disabled) return;
            sendExtensionMessage({ type: 'bt-allow-nav', dest: resolvedDest });
            location.href = resolvedDest;
        });
    }
})();

if (location.hostname.includes("loot-link") || location.hostname.includes("lootdest") || location.hostname.includes("lootlink")) { setInterval(() => { document.querySelector(".fc-monetization-dialog-container")?.remove() }, 2500) }

// ==========================================
// Thanks for letting me borrow the chaos emeralds tails
// ==========================================
// allright then i guess were done here
(function btPrepareWorkInkWS() {
    if (location.hostname !== 'work.ink') return;
    if (!btIsWorkInk() || !btIsEnabled()) return;
    const _path = location.pathname;
    if (_path === '/' || _path === '' || _path.startsWith('/token/')) return;

    const _origWS = window.WebSocket;
    window._btWIOrigWS = _origWS;
    const _fakeWS = () => ({
        readyState: 3,
        send: () => {},
        close: () => {},
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => false,
        onopen: null,
        onclose: null,
        onmessage: null,
        onerror: null
    });
    try {
        window.WebSocket = new Proxy(_origWS, {
            construct(Target, args) {
                const url = String(args?.[0] || '');
                if (url.includes('work.ink')) return _fakeWS();
                return Reflect.construct(Target, args);
            },
            apply(Target, thisArg, args) {
                const url = String(args?.[0] || '');
                if (url.includes('work.ink')) return _fakeWS();
                return Reflect.apply(Target, thisArg, args);
            }
        });
        console.log('[BypassTools] WI Evade-style socket stub active');
    } catch (e) {
        console.warn('[BypassTools] WI socket stub failed:', e);
    }
})();
// were not done
(() => {
    if (location.href.startsWith("http://bypass.tools/workink?url=") ||
        location.href.startsWith("https://bypass.tools/workink?url=") ||
        location.href.startsWith("http://localhost:13075/workink?url=") ||
        location.href.startsWith("http://localhost:3000/workink?url=")) {
        unsafeWindow.EASX_Running = true;
        // Stop execution for this context
        throw new Error('BypassTools: Stopping execution on bypass page');
    }
})();
// ==========================================
// daddy isnt done speaking
// ==========================================
// i dont get this rubiks cube
(function btInstallLootLabsTCHook() {
    if (!btIsLootLabs() || !location.href.includes('/s?')) return;
    window.easxModuleRunning = true; // whatre you stupid?
    const _origFetch = unsafeWindow.fetch;
    unsafeWindow.fetch = async function (t, n) {
        n = n || {};
        if (!btIsEnabled() || !btIsLootLabs()) return _origFetch(t, n);
        if ('string' !== typeof t && !(t instanceof Request)) return _origFetch(t, n);
        const url = t instanceof Request ? t.url : t;
        const method = (n.method || (t instanceof Request ? t.method : 'GET')).toUpperCase();
        if (method === 'POST' && url.endsWith('/tc')) {
            if (window.__ll_allow_tc) {
                // Our module's own TC call — pass straight to native fetch
                return _origFetch(t, n);
            }
            // Block page's TC forever — our module makes its own with botd
            return new Promise(() => {});
        }
        return _origFetch(t, n);
    };
    console.log('[BypassTools] LootLabs TC interceptor active');
})();

// ==========================================
// nah i gave up
// ==========================================
// just whatre they doing in there
window.__btExt = {
    gmFetch             : gmFetch,
    GM_xmlhttpRequest   : GM_xmlhttpRequest,
    GM_addStyle         : GM_addStyle,
    GM_getValue         : GM_getValue,
    GM_setValue         : GM_setValue,
    GM_deleteValue      : GM_deleteValue,
    GM_getResourceText  : GM_getResourceText,
    GM_info             : GM_info,
    createNotifier      : createNotifier,
    btIsEnabled         : btIsEnabled,
    btIsWorkInk         : btIsWorkInk,
    btIsLootLabs        : btIsLootLabs,
    sendExtensionMessage: sendExtensionMessage,
    unsafeWindow        : window,
    isDevelopment       : isDevelopment,
    reportSuccess       : function () { window.postMessage({ type: 'easx-bypass-success' }, '*'); }
};


