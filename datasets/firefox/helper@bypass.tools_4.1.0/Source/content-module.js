// BypassTools Content Module v4.1.0
// Do NOT run this file standalone.

(function () {
if (window.self !== window.top) { return; } // skip iframe execution

// ==========================================
// shell Utils
// ==========================================
var _ext = window.__btExt || {};
var gmFetch             = _ext.gmFetch            || window.gmFetch;
var GM_xmlhttpRequest   = _ext.GM_xmlhttpRequest;
var GM_addStyle         = _ext.GM_addStyle        || function () {};
var GM_getValue         = _ext.GM_getValue        || function (k, d) { return d; };
var GM_setValue         = _ext.GM_setValue        || function () {};
var GM_deleteValue      = _ext.GM_deleteValue     || function () {};
var GM_getResourceText  = _ext.GM_getResourceText || function () { return ''; };
var GM_info             = _ext.GM_info            || { script: { version: '4.1.0' } };
var createNotifier      = _ext.createNotifier;
var btIsEnabled         = _ext.btIsEnabled        || function () { return true; };
var btIsWorkInk         = _ext.btIsWorkInk        || function () { return true; };
var btIsLootLabs        = _ext.btIsLootLabs       || function () { return true; };
var sendExtensionMessage = _ext.sendExtensionMessage || function () {};
var unsafeWindow        = _ext.unsafeWindow       || window;
var isDevelopment       = _ext.isDevelopment      || false;
var reportSuccess       = _ext.reportSuccess      || function () { window.postMessage({ type: 'easx-bypass-success' }, '*'); };

// ogga boogga go back to africa
const isExtensionEnabled = () => btIsEnabled();
const isWorkInkEnabled   = () => btIsWorkInk();
const isLootLabsEnabled  = () => btIsLootLabs();
const BT_VERSION = GM_info?.script?.version || '4.1.0';
const isSecureMode = () => {
    const attr = document.documentElement.getAttribute('data-easx-secure');
    return attr === null ? true : attr === 'true';
};

const waitForSettingsBridge = async (timeoutMs = 5000) => {
    const start = Date.now();
    while (Date.now() - start < timeoutMs) {
        if (document.documentElement.getAttribute('data-easx-ready') === 'true') return true;
        await new Promise(resolve => setTimeout(resolve, 25));
    }
    return false;
};

// discord.gg/bypasstools
unsafeWindow.easxRetry = function () {
    console.log('[BypassTools] Retry function called from website');

    let retryUrl = null;

    if (location.pathname === '/bypass' && location.search.includes('url=')) {
        const urlParam = new URLSearchParams(location.search).get('url');
        if (urlParam) {
            retryUrl = decodeURIComponent(urlParam);
        }
    }

    if (!retryUrl && unsafeWindow.easxEarlyCapture &&
        !unsafeWindow.easxEarlyCapture.includes('favicon.ico') &&
        !unsafeWindow.easxEarlyCapture.includes('/bypass?url=')) {
        retryUrl = unsafeWindow.easxEarlyCapture;
    }

    if (!retryUrl) {
        try {
            const earlyCapture = sessionStorage.getItem('easx_early_capture');
            if (earlyCapture && !earlyCapture.includes('favicon.ico') &&
                !earlyCapture.includes('/bypass?url=')) {
                retryUrl = earlyCapture;
            }
        } catch (e) { }
    }

    if (!retryUrl) {
        try {
            const storedOriginal = sessionStorage.getItem('easx_original_url');
            if (storedOriginal && !storedOriginal.includes('favicon.ico') &&
                !storedOriginal.includes('/bypass?url=')) {
                retryUrl = storedOriginal;
            }
        } catch (e) { }
    }

    if (!retryUrl) {
        if (unsafeWindow.easxOriginalUrl && !unsafeWindow.easxOriginalUrl.includes('favicon.ico') &&
            !unsafeWindow.easxOriginalUrl.includes('/bypass?url=')) {
            retryUrl = unsafeWindow.easxOriginalUrl;
        } else if (unsafeWindow.easxStoredOriginal && !unsafeWindow.easxStoredOriginal.includes('favicon.ico') &&
            !unsafeWindow.easxStoredOriginal.includes('/bypass?url=')) {
            retryUrl = unsafeWindow.easxStoredOriginal;
        }
    }

    if (!retryUrl) retryUrl = 'https://linkvertise.com/';

    try {
        retryUrl = retryUrl.replace(/^https:\/\/https:\/\//, 'https://');
        retryUrl = retryUrl.replace(/^http:\/\/https:\/\//, 'https://');
        retryUrl = retryUrl.replace(/^https:\/\/http:\/\//, 'http://');
        new URL(retryUrl);
    } catch (e) {
        retryUrl = 'https://linkvertise.com/';
    }

    console.log('[BypassTools] Global retry with URL:', retryUrl);

    const protocol = isDevelopment ? 'http:' : 'https:';
    const _apiBase = isDevelopment ? 'localhost:13075' : 'bypass.tools';
    const _wait    = unsafeWindow.easxSecureMode ? CONFIG.wait : 1;
    window.location.href = `${protocol}//${_apiBase}/wait?url=${encodeURIComponent(retryUrl)}&wait=${_wait}`;
};

// epstein was here
function findRetryButton() {
    const selectors = [
        'button[onclick*="retry"]', 'button[onclick*="Retry"]',
        '#retry-btn', '.retry-btn', '.try-again', '[data-action="retry"]',
        'button[title*="retry"]', 'button[title*="Try again"]'
    ];
    for (const selector of selectors) {
        const button = document.querySelector(selector);
        if (button) return button;
    }
    const buttons = document.querySelectorAll('button, .btn, [role="button"]');
    for (const button of buttons) {
        const text = button.textContent?.toLowerCase() || '';
        const title = button.title?.toLowerCase() || '';
        const ariaLabel = button.getAttribute('aria-label')?.toLowerCase() || '';
        if (text.includes('retry') || text.includes('try again') ||
            title.includes('retry') || title.includes('try again') ||
            ariaLabel.includes('retry') || ariaLabel.includes('try again')) {
            return button;
        }
    }
    return null;
}

const CONFIG = {
    wait: 1,
    site: isDevelopment ? 'localhost:13075/wait?url=' : 'bypass.tools/wait?url=',
    timeout: 6000000,
    interval: 500,
    SecureMode: true,
    WorkInk: true,
    LootLabs: true,
    UVersion: "V4.1.0",
    apiBase: isDevelopment ? 'http://localhost:13075' : 'https://bypass.tools',
    bypassPage: isDevelopment ? 'http://localhost:13075/bypass?url=' : 'https://bypass.tools/bypass?url='
};

const BT_LOGO_DATA_URI = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAnMSURBVHhe7ZxrbBxXFceXtKQJQi1QUCElEHCrgoRUVOAbIRCECI0EXxLieHZn3fTBGwmJRyBFK6G61r6869htE/IBKUUlgAQICi1CNIiqoVJtldSP9TN+xI7jJPY23tmHvfZezpk9TrPrsT0L6Xp2+P+kv2aizB3fe899nHPn2B4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADA/yOH9469M6oX7gzWp7dVS/H61B1tvsLtrd8p3CLVWJVEIrFjenq6rrOzcxvd14wmJia203WHNMOZNNendscb81NRXy4d0owqKW2EtfQcKRnxZscivuzLUT13skVf+F6rX31CqnaN/v7+nSMjI12jo6OKOjTd19fneA0ODmbGx8fzVHddmuE8muuTu+P+hUzbA0pR51dZeVNxf0EdpZ//xINKPfWQUjH/omrxL3RQvb4e8I9skap6zp49+/5z5851zM7OquHhYUX3jhTXbWxsTCWTSUUD4YdSfefR1JD6HBv/aGNBhbyGCnvTjhCtBooH5DFzMOR7glry81JlT0dHx23Uwb0XLlzgzlU0uxwnmvnqypUrvFI9KtV2Hs1a6rNk/PTRRuUo45er7ZBSrY2Lqlm7ekiq7unq6rqXtoIFnmlWBthIsfFnZmZ4cD4u1XUewYNzu2I1YPyiDNoiFmmLWKL77G5pgqenp6f98uXLlkbYKA0MDJjGp2urVNN5NB2c3RX3543aMP6yDHNLCHnTwwG/Mn2CoaGhu2kFyNPV0hgbIfZNyPgnzI52Is0Ns5+hZb/GjP+G2EEMNWQapDkeWmZfmZyctDRGtSXGf0aq5jyC2txO0/jmTKo947OepCiBVoFfS5M4NHzy0qVLlgappnjZp5Xo91SltxRr5jCaDsyy8VO1bHwW15+ur0mzeAB8fyP9AI5CxPh/pejkrVItZ0Eh1RfJ+OrYw+xNK8XL/0aL6xHV51cYeD3xeQEN4PHWPQPmySEZ4BupVEqNj4+bYn+gktCQn+W4fbl8peI4n7z+F8+cObPV7GynQV7zh2gA/Cum5xMhzXiNOm/DFdbSZ6ku/WTQ+XYK8cqNvJaKAyA9GtivNnP7yIDe6enpPjKmKeJqJU6hPHuZdO0ddjU2NtZHTujztO/fana2E2ndU7glEFA3yz8dQyAQ2BT1Zu+K6tlTRx8oWBrbSrIFvCqv8SilSvZcGgD/4AMiMpAtXbx4kR03TYqDahPY372ZVqhpPvotN7aV2AmkkPCUFC+hu7t7Mw2ASf5WYGXscvGBDS//dH+vvAJsBEEtNcQ+gZXBy8VhYFAzHpKiJZDxP0KzuWB3CxgZGWEfYIaW8dvkFaDaNH115mMxfX4h6stZGvx6xfx5umZSTfvm3iPFSyBjfmVqaso8jbMyeLkmJib4+ooUB9UmpuXuieq5Tjs+ADl+6vgj5hlAkxRfQSKROFJJSEjOI3+seVqKu4+gltnZ/uBSPKJlWpwiMmaUlvD2sJZ5ju6zxePdtc8l+P957494Mz00CN4mzVsBrQC/YqNaGdtKPFiojHM/1f6vhLypEye/pczOc5o4/ON8ACuDl4ufj+kLkxw1SNMsoaX/VVnW1xVvExIt3C/F3Qd13gv8KbW8Q2tFcf+SOv6womu+82cHr94tzbKEIoB30XJ+Vbz6dSWO4iKVW3NQ1Sx8UkZL53nuRKvOdbYyKuLLLJJzOBjTc48Gdr2REbQaZNBPslfPoV25sa3E2Tq0/I9z6CivcBe8XIapE+14105Tiz7PHv9kWMvtleasCxneV8n+L9lEL0hx9xHWjL3sYPFssupkp4sHbty/kI/6MifsZAzTnh6qJAIQB7BNiruPoNf4ER+aWHVurYgHwc8p9Atr6ed/s1/dJE2zhIz6Fz4DKDf0auJPyOQzfE2Kuw/qwKc5w7a8U2tPGXMQhDTjp9K0FSilbqLZPMRf56yMXS6OAPjZ4eHhT8sr3EfIm+6QDyc2ZHCMbaZkl4drN1S0IvHV7rHvsorfCVY/Aezq6tpOA2DeboIoP0fPZ3p7e98nr3AXAX/yHRQBzMZ0ex9YIrTU0gzLh7T04xEtc5gGxI9vtOj9h0lH6P4YDbYB+4OzKDMVzGtY/nIFGXP3+fPnbR8B87N0TZR/SXQNQS15H/+yBefWW3VmueL8OwGacU6Kv+n8wq+2UN3+2GZm+VrXqVymP6MZ7fKKEsiY364kLYw/AdP1D1LcfYR8qYZK9n8zKUNLPyfFq0LEm/1CMRnEXpTyhPms8TspXgKtAMcrGQASATwmxd1H0JturiQCKM6udFiKV4Wgz7i/kgHAz5Jf86wUL4GM+mIlmcGyAtRLcfdBe/mfip1r3ZnlMlcLn+GT4lWB9vNnirPauk7l4jpSmRWJIOTNb6XZPFVJEgg7gd3d3R+XV7iLQEBtogHQb9fTZgewRZ8vxBtza5613yjaDhW20c8LtTYuUeRhz0dhcQRBW0BUXnMNMupHyfmrOAmEf79QXuEuonr6TnLocna/tEV8tARrqSW6/xsvsSEt9ecbLnovbTF0b7xMEcAcz2a7DuqyOHykFaBRmnkNmtFmEoiVsa3EXwtpALg3CSTqy+xqJa+e43qrjlxNfGzM28abKf4Zdgfm9Yr65vlUcClo8UWQjFpREog4iyeluPugmfZNni1WHVmr4sFDq8dL0sQSyJinKk0CSSQSP5Di7iOiGU+5awBklqOUfdLEEmg5/3clSSAcLVCZL0lx90GO0j+LXwGtOrO2RHt+MQu4wTgtzSuht7f39v8mCYQGQp28wl1E941vpQEwWZtJIKVi4/PSTxHDxciBzHZpYgk0kz+FJJDrCGq5eyi0WqrFJJBy8TYW1xemHtOS90nzVkBG1StNAqHr36W4+4ho6S/zrLHq0FoRn1+YfxdIn3+pueH1D0vTLKHZHEYSyHUENeMnlRwBO0MZMnbePOsvzvr8SMyf+67HE9gkzVoVMmrFSSB0fUSKu49Qg/Fbnj3FuNkh0ufN2J/F3/V5hrOTyodBPFj5PuLLztCMf5akB/ZPv12asyanT5++mWbzKHv17NytJ3YUJQJwdxJIa+PSIjmCeSeIHLnFkJZeCGtGlmZ7ikK5S2EtM0j3Z6K+7C9j/oUjUX9+T+Tg3LulCbbp6en5IM3m9PDwMP8RxnVFg2CRIwZ6/g55hftoPpDcwdnAIf31OmcoW8f7eKQxsz3kV+9t1Qq3rpfbZxfy/reQ938Xh3R2RBFAHRn/A1IcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGzh8fwHqoWWaSeYmHAAAAAASUVORK5CYII=';

function btBrandHtml() {
    return `<div class="bt-brand" style="display:flex;align-items:center;justify-content:center;gap:12px;margin-bottom:34px;flex-wrap:nowrap;width:100%;"><div class="bt-mark" style="width:42px;height:42px;display:grid;place-items:center;border-radius:15px;border:1px solid rgba(168,85,247,.34);background:rgba(168,85,247,.10);box-shadow:0 0 32px rgba(168,85,247,.18);flex:0 0 auto;"><img src="${BT_LOGO_DATA_URI}" alt="" style="width:28px;height:28px;display:block;filter:drop-shadow(0 8px 16px rgba(168,85,247,.22));"></div><div class="bt-wordmark" style="display:inline-flex;align-items:baseline;justify-content:center;flex-flow:row nowrap;font-size:1.25rem;font-weight:900;letter-spacing:-.045em;line-height:1;white-space:nowrap;flex:0 0 auto;min-width:max-content;"><span style="color:#8b5cf6;display:inline-block;">Bypass</span><span style="color:#fff;display:inline-block;">Tools</span></div></div>`;
}

function btBaseUiCss() {
    return `
        :root {
            --bt-bg:#07070a; --bt-panel:rgba(18,18,22,.88); --bt-border:rgba(244,244,245,.10);
            --bt-accent:#8b5cf6; --bt-accent-2:#7c3aed; --bt-text:#fff; --bt-muted:#a1a1aa;
        }
        .bt-brand{display:flex;align-items:center;justify-content:center;gap:12px;margin-bottom:34px;flex-wrap:nowrap;width:100%;}
        .bt-mark{width:42px;height:42px;display:grid;place-items:center;border-radius:15px;border:1px solid rgba(168,85,247,.34);background:rgba(168,85,247,.10);box-shadow:0 0 32px rgba(168,85,247,.18);flex:0 0 auto;}
        .bt-mark img{width:28px;height:28px;display:block;filter:drop-shadow(0 8px 16px rgba(168,85,247,.22));}
        .bt-wordmark{display:inline-flex;align-items:baseline;justify-content:center;flex-flow:row nowrap;font-size:1.25rem;font-weight:900;letter-spacing:-.045em;line-height:1;white-space:nowrap;flex:0 0 auto;min-width:max-content;}
        .bt-wordmark span{display:inline-block;}
        .bt-wordmark span:first-child{color:var(--bt-accent);}
        .bt-wordmark span:last-child{color:#fff;}
        .bt-stage-bg::before,.bt-stage-bg::after{content:"";position:fixed;width:420px;height:420px;border-radius:999px;background:radial-gradient(circle,rgba(168,85,247,.30),transparent 66%);filter:blur(6px);z-index:-2;animation:bt-drift 12s ease-in-out infinite alternate;}
        .bt-stage-bg::before{top:-150px;right:-120px;}
        .bt-stage-bg::after{left:-160px;bottom:-180px;width:520px;height:520px;background:radial-gradient(circle,rgba(124,58,237,.22),transparent 68%);animation-duration:15s;}
        @keyframes bt-drift{from{transform:translate3d(0,0,0) scale(1)}to{transform:translate3d(-30px,28px,0) scale(1.08)}}
        @keyframes bt-fade-in{0%{opacity:0;transform:translateY(28px) scale(.96);filter:blur(10px)}60%{opacity:1;transform:translateY(-2px) scale(1.01);filter:blur(0)}100%{opacity:1;transform:translateY(0) scale(1);filter:blur(0)}}
        @keyframes bt-fill{0%,100%{width:28%}50%{width:76%}}
        @keyframes bt-spin{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}
    `;
}

unsafeWindow.easxSecureMode = CONFIG.SecureMode;

let BT_RESOLVED_API_BASE = null;
async function btResolveApiBase() {
    if (BT_RESOLVED_API_BASE) return BT_RESOLVED_API_BASE;
    const localBase = 'http://localhost:13075';
    try {
        const resp = await gmFetch(`${localBase}/api/status?op=llbs`, { timeoutMs: 1200 });
        if (resp && resp.ok) { BT_RESOLVED_API_BASE = localBase; return BT_RESOLVED_API_BASE; }
    } catch { }
    BT_RESOLVED_API_BASE = CONFIG.apiBase;
    return BT_RESOLVED_API_BASE;
}

// diddy
function btSolveLootlabsPayload(rawToken) {
    try {
        const raw  = atob(rawToken.replace(/[^\x20-\x7E]/g, '').trim());
        const key  = raw.substring(0, 5);
        const data = raw.substring(5);
        let out = '';
        for (let _i = 0; _i < data.length; _i++)
            out += String.fromCharCode(data.charCodeAt(_i) ^ key.charCodeAt(_i % 5));
        return /^https?:\/\//i.test(out) ? out : null;
    } catch { return null; }
}

// i love israel and benjamin netanyahu
function createUnifiedOverlay(config) {
    if (document.getElementById('bypasstools-overlay')) return;

    const style = document.createElement('style');
    style.textContent = `
        ${btBaseUiCss()}
        :root {
            --bg-color: #07070a; --card-bg: rgba(18,18,22,.88); --accent: #8b5cf6;
            --accent-dim: rgba(139, 92, 246, 0.1); --border: rgba(244,244,245,.10);
            --text-primary: #ffffff; --text-secondary: #a1a1aa;
            --font-main: "Segoe UI Variable", "Segoe UI", "Aptos", sans-serif; --font-mono: "Cascadia Mono", "Consolas", monospace;
        }
        #bypasstools-overlay {
            position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
            background:
                linear-gradient(rgba(255,255,255,.035) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,.035) 1px, transparent 1px),
                var(--bg-color);
            background-size: 52px 52px, 52px 52px, auto;
            color: var(--text-primary);
            font-family: var(--font-main); display: flex; flex-direction: column;
            align-items: center; justify-content: center; z-index: 2147483647;
            overflow-y: auto; padding: 20px; box-sizing: border-box; isolation:isolate;
        }
        #bypasstools-card {
            position:relative; overflow:hidden; background:
                linear-gradient(145deg, rgba(24,24,27,.92), rgba(12,12,15,.88)),
                radial-gradient(circle at top right, rgba(168,85,247,.15), transparent 220px);
            border: 1px solid var(--border);
            border-radius: 28px; padding: 34px; width: min(520px, calc(100vw - 40px)); max-width: 520px; min-height: 420px;
            box-shadow: 0 34px 110px rgba(0,0,0,.48);
            display: flex; flex-direction: column; align-items: center; text-align: center;
            animation: bt-fade-in .68s cubic-bezier(.16,1,.3,1);
            transition: min-height .32s ease, max-width .32s ease, padding .32s ease;
        }
        #bypasstools-card::before{content:"";position:absolute;inset:0;border-radius:inherit;border:1px solid rgba(168,85,247,.18);pointer-events:none;}
        h1#bypasstools-title {
            font-family: "Aptos Display", "Segoe UI Variable", "Segoe UI", sans-serif;
            font-size: clamp(2rem, 3.5vw, 3rem); line-height:1.05; font-weight: 800; margin: 0 0 14px 0;
            color:#fff; letter-spacing: -.035em;
        }
        p#bypasstools-subtitle { font-size: 1rem; color: var(--text-secondary); margin: 0 0 1.8rem 0; line-height:1.65; }
        #bypasstools-status-text { font-weight: 800; color: var(--text-primary); font-size: 1rem; margin-bottom: 1rem; }
        .bt-status-container { width: 100%; margin: 20px 0; }
        #bypasstools-api-ref { margin-top: 26px; font-size: 0.78rem; color: #52525b; }
        #bypasstools-api-ref a { color:#71717a; text-decoration:none; transition: color .2s ease; }
        #bypasstools-api-ref a:hover { color: var(--accent); }
        .bt-loading-bar-c { width: 100%; height: 10px; background: #27272a; border-radius: 999px; overflow: hidden; margin-top: 15px; }
        .bt-loading-bar-i { height: 100%; border-radius:inherit; background: linear-gradient(90deg,var(--accent),#a855f7); width: 0%; transition: width 0.3s ease; box-shadow: 0 0 28px rgba(168,85,247,.60); }
        .bt-status-detail { font-size: .9rem; color: #e4e4e7; margin-top: 15px; display: flex; justify-content: space-between; gap:16px; font-weight: 700; align-items: center; padding: 0 5px; }
        .bt-runtime-inline{white-space:nowrap;color:#e9d5ff;font-weight:850;}
        .bt-captcha-slot{width:100%;display:grid;place-items:center;gap:14px;margin-top:18px;padding:18px;border-radius:20px;border:1px solid rgba(168,85,247,.22);background:rgba(255,255,255,.035);box-shadow:inset 0 1px 0 rgba(255,255,255,.04);overflow:hidden;max-height:220px;opacity:1;transform:translateY(0);transition:max-height .34s cubic-bezier(.16,1,.3,1),opacity .22s ease,transform .34s cubic-bezier(.16,1,.3,1),margin .34s ease,padding .34s ease,border-width .34s ease;animation:bt-captcha-in .32s ease-out;}
        .bt-captcha-slot.bt-captcha-removing{max-height:0;opacity:0;transform:translateY(10px);margin-top:0;padding-top:0;padding-bottom:0;border-width:0;}
        .bt-captcha-title{font-size:.92rem;font-weight:850;color:#f4f4f5;line-height:1.35;}
        @keyframes bt-captcha-in{from{opacity:0;transform:translateY(12px);max-height:0}to{opacity:1;transform:translateY(0);max-height:220px}}
        .bt-spinner { width: 24px; height: 24px; border: 3px solid var(--border); border-top: 3px solid var(--accent); border-radius: 50%; animation: bt-spin 1s linear infinite; display: inline-block; margin-right: 10px; vertical-align: text-bottom; }
        .bypasstools-btn {
            display:flex;align-items:center;justify-content:center;background: linear-gradient(135deg, #8b5cf6, #7c3aed); color: #fff; border: 1px solid rgba(196,181,253,.38);
            min-height:54px;padding: 0 20px; border-radius: 18px; font-weight: 850; font-size: 1rem;
            cursor: pointer; transition: transform .18s ease, box-shadow .18s ease, background .18s ease, opacity .18s ease; line-height:1;text-align:center;
            box-shadow: 0 16px 44px rgba(168,85,247,.26), inset 0 1px 0 rgba(255,255,255,.16);
            width: 100%; margin-top: 30px; box-sizing: border-box;
            letter-spacing: .01em;
        }
        .bypasstools-btn:hover { background: linear-gradient(135deg, #a855f7, #8b5cf6); transform: translateY(-2px); box-shadow: 0 20px 50px rgba(139,92,246,.36), inset 0 1px 0 rgba(255,255,255,.18); }
        .bypasstools-btn:disabled { background: #27272a; color: #a1a1aa; cursor: wait; box-shadow: none; transform: none; opacity:.78; }
        @media (max-width: 640px) { #bypasstools-card { padding: 22px; width: min(95vw, 520px); min-height:auto; } h1#bypasstools-title { font-size: 2rem; } }
    `;
    document.head.appendChild(style);

    const overlay = document.createElement('div');
    overlay.id = 'bypasstools-overlay';
    overlay.className = 'bt-stage-bg';

    const card = document.createElement('div');
    card.id = 'bypasstools-card';
    card.insertAdjacentHTML('beforeend', btBrandHtml());

    const title = document.createElement('h1');
    title.id = 'bypasstools-title';
    title.textContent = config.title || 'BypassTools';

    const subtitle = document.createElement('p');
    subtitle.id = 'bypasstools-subtitle';
    subtitle.textContent = config.subtitle || 'Advanced Bypass System';

    const infoDiv = document.createElement('div');
    infoDiv.style.width = '100%';
    infoDiv.innerHTML = `<div style="color:var(--text-secondary); margin-bottom:10px; font-size:1rem;line-height:1.65;">${config.description || 'Processing request...'}</div>`;
    let runtimeEl = null;

    if ((config.statusElementId === 'fear-status' || config.useAnimatedStatus) && config.statusElementId !== null) {
        const statusContainer = document.createElement('div');
        statusContainer.id = config.statusElementId || 'bt-status-c';
        statusContainer.className = 'bt-status-container';
        statusContainer.innerHTML = `
            <div class="bt-loading-bar-c"><div class="bt-loading-bar-i" style="width: 5%;"></div></div>
            <div class="bt-status-detail">
                <span><div class="bt-spinner"></div>Initializing...</span>
                <span${config.showRuntime ? ' class="bt-runtime-inline"' : ''}>${config.showRuntime ? 'Elapsed 0s' : '0%'}</span>
            </div>`;
        infoDiv.appendChild(statusContainer);
        if (config.showRuntime) {
            const startedAt = Date.now();
            const timer = setInterval(() => {
                const target = card.querySelector('.bt-runtime-inline');
                if (!document.body.contains(card) || !target) {
                    clearInterval(timer);
                    return;
                }
                if (target.dataset.final === 'true') {
                    clearInterval(timer);
                    return;
                }
                target.textContent = `Elapsed ${Math.floor((Date.now() - startedAt) / 1000)}s`;
            }, 1000);
            runtimeEl = statusContainer.querySelector('.bt-runtime-inline');
        }
    } else if (config.statusElementId) {
        const statusP = document.createElement('p');
        statusP.id = config.statusElementId;
        statusP.className = 'bt-status-container';
        statusP.innerHTML = `<span id="bypasstools-status-text">CONNECTED TO SERVER</span>`;
        infoDiv.appendChild(statusP);
    }

    if (config.warningText) {
        const warning = document.createElement('div');
        warning.style.cssText = 'color:#fbbf24;font-size:.85rem;margin-top:14px;font-weight:700;background:rgba(251,191,36,.08);padding:12px;border-radius:14px;border:1px solid rgba(251,191,36,.22);';
        warning.textContent = config.warningText;
        infoDiv.appendChild(warning);
    }

    card.appendChild(title);
    card.appendChild(subtitle);
    card.appendChild(infoDiv);

    const btn = document.createElement('button');
    btn.className = 'bypasstools-btn';
    btn.id = config.redirectBtnId || 'bypasstools-action-btn';
    btn.textContent = 'Open Destination';
    btn.style.display = 'none';
    if (config.onButtonClick) btn.onclick = config.onButtonClick;
    card.appendChild(btn);

    const apiRef = document.createElement('div');
    apiRef.id = 'bypasstools-api-ref';
    apiRef.innerHTML = `Powered by <a href="https://bypass.tools" target="_blank" rel="noopener noreferrer">BypassTools</a> · v${BT_VERSION}`;
    card.appendChild(apiRef);

    overlay.appendChild(card);
    document.body.appendChild(overlay);

    return { overlay, card, infoDiv, runtimeEl, consoleDiv: null, consoleBody: null, button: btn };
}

// =================
// workink
// module
// thank you evade
// ===============
(function () {
    if (!CONFIG.WorkInk || location.hostname !== 'work.ink') return;
    if (location.pathname === '/' || location.pathname === '' || location.pathname.startsWith('/token/')) return;

    window.easxModuleRunning = true;

    const EVADE_BASE = 'https://evade.bypass.tools';
    const _evSession = Math.random().toString(36).substring(2, 15);

    // united states of workink 
    let _wiDone          = false;
    let _wiRealWS        = null;
    let _wiInitData      = null;
    let _wiOverlayCtrl   = null;
    let _wiStartTime     = null;
    let _wiSocialDone    = null;
    let _wiMonDone       = null;
    let _wiOffersDone    = null;
    let _wiDestResolve   = null;
    let _wiExecStarted   = false;
    let _wiLinkInfoTimeout = null;

    const _wiLog   = msg => console.log('[BypassTools/WI]', msg);
    const _wiSleep = ms  => new Promise(r => setTimeout(r, ms));
    const _wiFetch = (url, opts) => gmFetch(url, opts);
    const _wiDismissCaptchaPanel = (panel) => {
        if (!panel) return;
        try {
            if (panel.classList?.contains('bt-captcha-slot')) {
                panel.classList.add('bt-captcha-removing');
                setTimeout(() => { try { panel.remove(); } catch (e) { } }, 360);
            } else {
                panel.remove();
            }
        } catch (e) { }
    };
    const _wiCreateCaptchaPanel = (id, title) => {
        const existing = document.getElementById(id + '-panel');
        if (existing) {
            try { existing.remove(); } catch (e) { }
        }

        const panel = document.createElement('div');
        panel.id = id + '-panel';
        const hostCard = document.getElementById('bypasstools-card');
        panel.className = hostCard ? 'bt-captcha-slot' : '';
        panel.style.cssText = hostCard ? '' : [
            'position:fixed',
            'left:50%',
            'top:50%',
            'transform:translate(-50%,-50%)',
            'z-index:2147483647',
            'display:flex',
            'flex-direction:column',
            'align-items:center',
            'gap:16px',
            'width:min(390px,calc(100vw - 32px))',
            'padding:24px 22px 24px',
            'box-sizing:border-box',
            'border-radius:24px',
            'background:linear-gradient(145deg,rgba(24,24,27,.96),rgba(12,12,15,.94))',
            'border:1px solid rgba(244,244,245,.12)',
            'box-shadow:0 30px 90px rgba(0,0,0,.55),0 0 42px rgba(139,92,246,.16)',
            'color:#fff',
            'font-family:Segoe UI,Aptos,sans-serif',
            'text-align:center',
            'pointer-events:auto'
        ].join(';');

        if (!hostCard) panel.insertAdjacentHTML('beforeend', btBrandHtml());

        const label = document.createElement('div');
        label.textContent = title;
        label.className = 'bt-captcha-title';
        label.style.cssText = hostCard ? '' : 'font-size:18px;font-weight:900;line-height:1.15;color:#f4f4f5;letter-spacing:-.03em;';
        panel.appendChild(label);

        const container = document.createElement('div');
        container.id = id;
        container.style.cssText = 'display:flex;align-items:center;justify-content:center;min-width:300px;min-height:65px;';
        panel.appendChild(container);

        (hostCard || document.body).appendChild(panel);
        return { panel, container };
    };
    const _wiPersistCustomerToken = (token) => {
        if (!token) return;
        const pairs = [
            ['localStorage', 'customerToken', token],
            ['sessionStorage', 'customerToken', token],
            ['localStorage', 'customerSessionToken', token],
            ['sessionStorage', 'customerSessionToken', token]
        ];
        for (const [storeName, key, value] of pairs) {
            try { window[storeName]?.setItem(key, value); } catch (e) { }
        }
        try { window.customerToken = token; } catch (e) { }
        try { window.customerSessionToken = token; } catch (e) { }
        try {
            console.log('[BypassTools/WI] persisted customer token', {
                key: 'customerToken',
                length: token.length
            });
        } catch (e) { }
    };
    const _wiSolveTurnstile = (action) => new Promise((resolve, reject) => {
        if (!document.getElementById('bt-turnstile-script')) {
            const script = document.createElement('script');
            script.id = 'bt-turnstile-script';
            script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
            script.async = true;
            script.defer = true;
            script.onerror = () => reject(new Error('turnstile script failed to load'));
            document.head.appendChild(script);
        }
        const { panel } = _wiCreateCaptchaPanel('bt-turnstile-container', 'Complete the security check');
        _wiUpdateStatus(28, 'Please complete the security check below...');
        const iv = setInterval(() => {
            const turnstile = window.turnstile;
            if (typeof turnstile?.render !== 'function') return;
            clearInterval(iv);
            try {
                const opts = {
                    sitekey: '0x4AAAAAAAJoXhmMXwq7jgK9',
                    theme: 'dark',
                    callback: token => {
                        _wiDismissCaptchaPanel(panel);
                        resolve(token);
                    },
                    'error-callback': err => {
                        _wiDismissCaptchaPanel(panel);
                        reject(new Error('turnstile error: ' + err));
                    }
                };
                if (action) opts.action = action;
                turnstile.render('#bt-turnstile-container', opts);
                console.log('[BypassTools/WI] remote Turnstile rendered', { hasAction: !!action });
            } catch (e) {
                _wiDismissCaptchaPanel(panel);
                reject(e);
            }
        }, 100);
    });
    const _wiSolveHCaptcha = () => new Promise((resolve, reject) => {
        if (!document.getElementById('bt-hcaptcha-script')) {
            const script = document.createElement('script');
            script.id = 'bt-hcaptcha-script';
            script.src = 'https://js.hcaptcha.com/1/api.js?render=explicit&recaptchacompat=on&sentry=false';
            script.async = true;
            script.defer = true;
            script.onerror = () => reject(new Error('hcaptcha script failed to load'));
            document.head.appendChild(script);
        }
        const { panel } = _wiCreateCaptchaPanel('bt-hcaptcha-container', 'Complete the hCaptcha challenge');
        const iv = setInterval(() => {
            const hcaptcha = window.hcaptcha;
            if (typeof hcaptcha?.render !== 'function') return;
            clearInterval(iv);
            try {
                hcaptcha.render('bt-hcaptcha-container', {
                    sitekey: '74184788-498a-4910-ba14-be9c2acc3f98',
                    theme: 'dark',
                    callback: token => {
                        _wiDismissCaptchaPanel(panel);
                        resolve(token);
                    },
                    'error-callback': err => {
                        _wiDismissCaptchaPanel(panel);
                        reject(new Error('hcaptcha error: ' + err));
                    },
                    'expired-callback': () => {}
                });
            } catch (e) {
                _wiDismissCaptchaPanel(panel);
                reject(e);
            }
        }, 100);
    });

    // server hit 27K members today
    function _wiElapsedText() {
        const seconds = _wiStartTime ? Math.max(0, Math.floor((Date.now() - _wiStartTime) / 1000)) : 0;
        return `Elapsed ${seconds}s`;
    }
    function _wiUpdateStatus(pct, msg) {
        const bar = document.querySelector('#fear-status .bt-loading-bar-i');
        const det = document.querySelector('#fear-status .bt-status-detail');
        if (bar) bar.style.width = Math.max(5, Math.min(100, pct)) + '%';
        if (det) det.innerHTML = `<span>${msg}</span><span class="bt-runtime-inline">${_wiElapsedText()}</span>`;
    }
    function _wiShowSuccess(url) {
        _wiUpdateStatus(100, 'Bypass complete - click to continue');
        const bar = document.querySelector('#fear-status .bt-loading-bar-i');
        if (bar) { bar.style.background = '#8b5cf6'; bar.style.boxShadow = '0 0 20px #8b5cf6'; }
        const det = document.querySelector('#fear-status .bt-status-detail');
        if (det) det.innerHTML = `<span style="color:#8b5cf6;font-weight:700;">Bypass complete</span><span class="bt-runtime-inline" data-final="true">Finished in ${_wiElapsedText().replace('Elapsed ', '')}</span>`;
        const btn = document.getElementById('fear-redirect-btn') || document.querySelector('.bypasstools-btn');
        if (btn) {
            btn.style.display = 'block';
            btn.textContent = 'Open Destination';
            btn.onclick = () => { window.location.href = url; };
        }
        window.wokeresponse = url;
        reportSuccess();
    }
    function _wiShowError(msg) {
        _wiUpdateStatus(100, msg);
        const bar = document.querySelector('#fear-status .bt-loading-bar-i');
        if (bar) bar.style.background = '#ef4444';
        const det = document.querySelector('#fear-status .bt-status-detail');
        if (det) det.innerHTML = `<span style="color:#fda4af;font-weight:700;">${msg}</span><span>Error</span>`;
    }

    // code is sooo messyy need to clean it at some point. well not today it works, at least most of the time.
    function _wiSend(msg) {
        try { if (_wiRealWS?.readyState === 1) _wiRealWS.send(msg); } catch {}
    }

    // i dont think anybody would be reading these soooo :p
    async function _wiExecute(data) {
        const { fM, flM, sM, raM, mM, coM, pinger, envC, mUrl } = data;
        if (envC) _wiSend(envC);
        if (pinger) _wiSend(pinger);

        if (Array.isArray(sM) && sM.length) {
            for (let i = 0; i < sM.length; i++) {
                if (_wiDone) return;
                _wiUpdateStatus(30 + (i / sM.length) * 15, `Completing social ${i + 1}/${sM.length}...`);
                _wiSend(sM[i].encrypted || sM[i]);
                if (flM) _wiSend(flM);
                await new Promise((res, rej) => {
                    const t = setTimeout(() => { _wiSocialDone = null; rej(); }, 10000);
                    _wiSocialDone = () => { clearTimeout(t); _wiSocialDone = null; res(); };
                }).catch(() => {});
                await _wiSleep(10);
                if (fM) _wiSend(fM);
            }
        }

        if (Array.isArray(raM) && raM.length) {
            _wiUpdateStatus(50, 'Sending read-articles...');
            for (const a of raM) _wiSend(a.encrypted || a);
            await new Promise((res, rej) => {
                const t = setTimeout(() => { _wiOffersDone = null; rej(); }, 20000);
                _wiOffersDone = () => { clearTimeout(t); _wiOffersDone = null; res(); };
            }).catch(() => {});
            if (_wiDone) return;
        }

        if (_wiDone) return;

        const allOffers = [
            ...(Array.isArray(mM)  ? mM.map(x  => ({ ...x, _src: 'monetization' })) : []),
            ...(Array.isArray(coM) ? coM.map(x => ({ ...x, _src: 'customOffer' }))   : [])
        ].sort((a, b) => a.id - b.id);

        for (let i = 0; i < allOffers.length; i++) {
            if (_wiDone) return;
            const item = allOffers[i];
            const raw  = item.encrypted || JSON.stringify(item);

            if (item._src === 'customOffer') {
                _wiUpdateStatus(55 + (i / allOffers.length) * 15, `Processing ${item.name || 'custom offer'}...`);
                _wiSend(item.initEncrypted);
                _wiSend(item.startEncrypted);
                if (flM) _wiSend(flM);
                if (Array.isArray(mUrl)) {
                    const entry = mUrl.find(u => String(u.ID) === String(item.id));
                    if (entry?.OfferUrl) {
                        const f = document.createElement('iframe');
                        f.style.cssText = 'position:absolute;width:0;height:0;border:0;visibility:hidden;';
                        f.src = entry.OfferUrl;
                        document.body?.appendChild(f);
                        setTimeout(() => f.remove(), 5000);
                    }
                }
                await _wiSleep(500);
                if (fM) _wiSend(fM);
                await new Promise((res, rej) => {
                    const t = setTimeout(() => { _wiMonDone = null; rej(); }, 65000);
                    _wiMonDone = v => { clearTimeout(t); _wiMonDone = null; res(v); };
                }).catch(() => {});
                await _wiSleep(50);

            } else if (item.id === 80) {
                _wiUpdateStatus(55, 'Processing Stake offer...');
                _wiSend(raw);
                await new Promise((res, rej) => {
                    const t = setTimeout(() => { _wiMonDone = null; rej(); }, 140000);
                    _wiMonDone = v => { clearTimeout(t); _wiMonDone = null; res(v); };
                }).catch(() => {});

            } else if ((item.id === 25 || item.id === 34) && item.event === 'start') {
                _wiUpdateStatus(55, item.id === 25 ? 'Processing Opera GX...' : 'Processing browser task (2 min max)...');
                _wiSend(raw);
                const clicked = allOffers.find(x => x.id === item.id && x.event === 'installClicked');
                if (clicked) _wiSend(clicked.encrypted || JSON.stringify(clicked));
                if (item.id === 25) {
                    try {
                        await _wiFetch('https://work.ink/_api/v2/affiliate/operaGX', {
                            method: 'HEAD', headers: { 'User-Agent': 'Opera Installer/1.0' }
                        }).catch(() => {});
                        await _wiFetch('https://work.ink/_api/v2/callback/operaGX', {
                            method: 'POST', headers: { 'Content-Type': 'application/json', 'User-Agent': 'Opera Installer/1.0' },
                            body: JSON.stringify({ noteligible: true })
                        }).catch(() => {});
                        await _wiSleep(1200);
                    } catch (_) { _wiUpdateStatus(55, 'Opera GX task running...'); }
                }
                if (_wiDone) { if (fM) _wiSend(fM); continue; }
                if (flM) _wiSend(flM);
                await new Promise((res, rej) => {
                    const t = setTimeout(() => { _wiMonDone = null; rej(); }, 300000);
                    _wiMonDone = v => { clearTimeout(t); _wiMonDone = null; res(v); };
                }).catch(() => {});
                if (fM) _wiSend(fM);

            } else {
                _wiSend(raw);
                await _wiSleep(500);
            }
            if (_wiDone) return;
        }

        if (_wiDone) return;

        // discord.gg/bypasstools ---> we have free pizza
        const _destPromise = new Promise(res => {
            const t = setTimeout(() => { _wiDestResolve = null; res(null); }, 180000);
            _wiDestResolve = url => { clearTimeout(t); _wiDestResolve = null; res(url); };
        });
        if (fM) _wiSend(fM);
        _wiUpdateStatus(85, 'Waiting for destination...');
        const _destUrl = await _destPromise;
        if (_destUrl) _wiShowSuccess(_destUrl);
    }

    function _wiHandleRelayResponse(resp) {
        if (!resp || _wiDone) return;
        try {
            console.log('[BypassTools/WI] negotiate response', {
                conditions: resp.conditions || null,
                hasTat: !!resp.tat,
                hasHcr: !!resp.hcr,
                hcsn: resp.hcsn ?? null,
                hasSM: !!(resp.sM?.length),
                hasRaM: !!(resp.raM?.length),
                hasMM: !!(resp.mM?.length),
                hasCoM: !!(resp.coM?.length),
                hasDestination: !!resp.destinationURL,
                hasEm: !!resp.em
            });
        } catch (e) { }
        if (resp.success === false && resp.error) {
            _wiShowError(resp.error);
            _wiDone = true;
            return;
        }
        if (resp.conditions === 'destination' && resp.destinationURL) {
            _wiDone = true;
            if (_wiDestResolve) { _wiDestResolve(resp.destinationURL); return; }
            const minTime = 20;
            const elapsed = _wiStartTime ? Math.floor((Date.now() - _wiStartTime) / 1000) : 0;
            const wait    = Math.max(0, minTime - elapsed);
            if (wait > 0) {
                let rem = wait;
                _wiUpdateStatus(95, `Bypass complete! Waiting ${rem}s...`);
                const iv = setInterval(() => {
                    if (--rem <= 0) { clearInterval(iv); _wiShowSuccess(resp.destinationURL); }
                    else _wiUpdateStatus(95, `Bypass complete! Waiting ${rem}s...`);
                }, 1000);
            } else {
                _wiShowSuccess(resp.destinationURL);
            }
            return;
        }
        if (resp.conditions === 'prxd' && _wiStartTime && Date.now() - _wiStartTime < 9000) {
            _wiShowError('VPN/Proxy detected - disable and refresh');
            _wiDone = true;
            return;
        }
        if (resp.conditions === 'social_done'        && _wiSocialDone)  _wiSocialDone();
        if (resp.conditions === 'monetization_done'  && _wiMonDone)     _wiMonDone();
        if (resp.conditions === 'monetization_ack'   && _wiMonDone)     _wiMonDone(resp);
        if (resp.conditions === 'offers_state'       && _wiOffersDone)  _wiOffersDone(resp);
        if (resp.conditions === 'ping' && resp.pingMsg) setTimeout(() => _wiSend(resp.pingMsg), 2000);
        if (resp.em) _wiSend(resp.em);

        if (!_wiExecStarted && (resp.sM?.length || resp.raM?.length || resp.mM?.length
                                || resp.coM?.length || resp.hasOwnProperty('sM'))) {
            _wiExecStarted = true;
            if (_wiLinkInfoTimeout) {
                clearTimeout(_wiLinkInfoTimeout);
                _wiLinkInfoTimeout = null;
            }
                (async () => {
                    console.log('[BypassTools/WI] waiting for Turnstile token', {
                        action: resp.tat || null
                    });
                    try {
                        const token = await _wiSolveTurnstile(resp.tat);
                        console.log('[BypassTools/WI] Turnstile token captured', { length: token?.length || 0 });
                        _wiUpdateStatus(30, 'Security check passed - executing bypass...');
                        const tsResp = await _wiFetch(`${EVADE_BASE}/api/evade/negotiate`, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ turnstile: token })
                        }).then(r => r?.ok ? r.json() : null);
                        console.log('[BypassTools/WI] captcha verify response', {
                            hasTst: !!tsResp?.tst,
                            hasHcResp: !!tsResp?.hcresp,
                            keys: tsResp ? Object.keys(tsResp) : []
                        });
                        if (tsResp?.tst) _wiSend(tsResp.tst);
                    } catch (_) {
                        _wiShowError('Failed to verify security check - refresh');
                        return;
                    }
                    if (resp.hcr) {
                        const solves = Math.max(1, parseInt(resp.hcsn, 10) || 1);
                        for (let i = 0; i < solves; i++) {
                            _wiUpdateStatus(28, `Please complete the hCaptcha challenge (${i + 1}/${solves})...`);
                            let token;
                            try {
                                token = await _wiSolveHCaptcha();
                            } catch (_) {
                                _wiShowError('Failed to load hCaptcha - refresh');
                                return;
                            }
                            _wiUpdateStatus(30, `hCaptcha solved (${i + 1}/${solves}), submitting...`);
                            try {
                                const hcResp = await _wiFetch(`${EVADE_BASE}/api/evade/negotiate`, {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify({ hCapToken: token })
                                }).then(r => r?.ok ? r.json() : null);
                                const relay = hcResp?.hcresp || hcResp?.tst;
                                if (relay) _wiSend(relay);
                            } catch (_) {
                                _wiShowError('Failed to verify hCaptcha - refresh');
                                return;
                            }
                        }
                        _wiUpdateStatus(30, 'hCaptcha complete - executing bypass...');
                    }
                _wiExecute(resp);
            })();
        }
    }

    function _wiRelayDemands(direction, data, timestamp) {
        if (_wiDone || typeof data !== 'string' || !_wiRealWS) return;
        try {
            console.log('[BypassTools/WI] relay message', {
                direction: direction || 'incoming',
                sample: data.slice(0, 160)
            });
        } catch (e) { }
        _wiFetch(`${EVADE_BASE}/api/evade/negotiate`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                demands: data,
                direction: direction || 'incoming',
                session_id: _evSession,
                client_timestamp: timestamp || Date.now()
            })
        }).then(r => r?.ok ? r.json() : null)
          .then(_wiHandleRelayResponse)
          .catch(() => {});
    }

    function _wiOpenWS(userId, custom, serverOverride, monocle) {
        const tok = _wiInitData?.tok || '';
        const wsUrl = `wss://work.ink/_api/v2/ws?userId=${userId}&custom=${custom}&referrer=https://work.ink/&toLink=&serverOverride=${serverOverride}&customerSessionToken=${tok}&monocleAssessment=${monocle || ''}`;
        _wiRealWS = new (window._btWIOrigWS || WebSocket)(wsUrl);

        _wiLinkInfoTimeout = setTimeout(() => {
            if (!_wiDone) _wiShowError('work.ink failed to respond - refresh');
        }, 15000);

        _wiRealWS.onopen = () => {
            if (_wiInitData?.mcl) _wiSend(_wiInitData.mcl);
            if (_wiInitData?.pinger) _wiSend(_wiInitData.pinger);
            _wiUpdateStatus(22, 'Connected - waiting for link info...');
        };

        _wiRealWS.onmessage = (event) => {
            if (typeof event.data !== 'string') return;
            _wiRelayDemands('incoming', event.data, Date.now());
        };

        _wiRealWS.onerror = () => {
            if (!_wiDone) _wiShowError('WS connection error - refresh');
        };
        _wiRealWS.onclose = (event) => {
            if (!_wiDone) _wiLog('WS closed: ' + event.code);
        };
    }

    // initialsegs
    async function _wiInit() {
        if (!await waitForSettingsBridge(5000)) { _wiLog('Settings bridge not ready, skipping Work.ink module'); return; }
        if (!btIsEnabled() || !btIsWorkInk()) { _wiLog('Disabled by settings'); return; }

        const headText = (document.head?.textContent || '').toLowerCase();
        if (headText.includes('just a mome') || headText.includes('just a second')) {
            _wiLog('CF challenge page - halting'); return;
        }
        await new Promise(res => {
            const iv = setInterval(() => { if (document.body) { clearInterval(iv); res(); } }, 50);
        });
        _wiOverlayCtrl = createUnifiedOverlay({
            title:           'Processing link.',
            subtitle:        'Work.ink Bypass',
            description:     'Connecting to bypass relay...',
            statusElementId: 'fear-status',
            redirectBtnId:   'fear-redirect-btn',
            showConsole:     false,
            useAnimatedStatus: true,
            showRuntime: true,
            onButtonClick: () => { if (window.wokeresponse) location.href = window.wokeresponse; }
        }) || null;
        _wiUpdateStatus(5, 'Polling bot-check token...');
        _wiStartTime = Date.now();

        // greetings
        const _origPD  = Event.prototype.preventDefault;
        const _origSP  = Event.prototype.stopPropagation;
        const _origSIP = Event.prototype.stopImmediatePropagation;
        const _inOvl   = e => e.target?.closest?.('#bypasstools-overlay');
        Event.prototype.preventDefault           = function() { if (!_inOvl(this)) return _origPD.call(this); };
        Event.prototype.stopPropagation          = function() { if (!_inOvl(this)) return _origSP.call(this); };
        Event.prototype.stopImmediatePropagation = function() { if (!_inOvl(this)) return _origSIP.call(this); };

        _wiUpdateStatus(5, 'Polling bot-check token...');

        const monocle = await new Promise(res => {
            const iv = setInterval(() => {
                const el = document.querySelector('form.monocle-enriched input[name="monocle"]');
                if (el?.value?.length > 0) { clearInterval(iv); res(el.value); }
            }, 200);
        });
        _wiLog('Monocle captured');
        _wiUpdateStatus(10, 'Token captured - contacting relay...');

        try {
            const initResp = await _wiFetch(`${EVADE_BASE}/api/evade/init`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ mcl: monocle, session_id: _evSession })
            });
            if (initResp?.ok) {
                _wiInitData = await initResp.json();
                _wiPersistCustomerToken(_wiInitData?.tok || '');
                console.log('[BypassTools/WI] init response', {
                    hasTok: !!_wiInitData?.tok,
                    tokLength: _wiInitData?.tok?.length || 0,
                    hasMcl: !!_wiInitData?.mcl,
                    hasPinger: !!_wiInitData?.pinger
                });
            }
        } catch (e) {
            _wiLog('/init failed: ' + (e?.message || e));
        }

        _wiUpdateStatus(16, 'Fetching link parameters...');

        try {
            const html = await fetch(location.href).then(r => r.text());
            const match = html.match(/f_user_id\s*:\s*["']?(\d+)["']?/);
            if (!match?.[1]) {
                _wiShowError('Could not extract user ID - refresh');
                return;
            }
            const userId = match[1];
            const parts = new URL(location.href).pathname.split('/').filter(Boolean);
            const custom = parts[1] || parts[0] || '';
            const sr = new URLSearchParams(new URL(location.href).search).get('sr') || '';
            _wiUpdateStatus(20, 'Connecting to work.ink...');
            _wiOpenWS(userId, custom, sr, monocle);
        } catch (e) {
            _wiShowError('Page fetch failed - refresh');
        }
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', _wiInit);
    else _wiInit();
})();

(function () {
    const _rsPath   = location.pathname;
    const _rsParams = new URLSearchParams(location.search);

    function _rsIsLootLabsUrl(url) {
        try {
            const h = new URL(url).hostname;
            return ['loot-link.com', 'loot-links.com', 'lootdest.org', 'lootdest.com',
                    'lootlabs.gg', 'links.lootlabs.gg', 'lootboost.net'].some(d => h === d || h.endsWith('.' + d));
        } catch { return false; }
    }

    if (_rsPath === '/vm/Z' && _rsParams.has('url')) {
        const innerUrl = _rsParams.get('url');
        if (_rsIsLootLabsUrl(innerUrl) || innerUrl.startsWith('https://')) {
            window.__btRedirecting = true;
            location.replace(innerUrl);
            return;
        }
    }

    if (_rsPath.startsWith('/DTOM/') && _rsParams.has('antibypass')) {
        const uuid = _rsPath.split('/').filter(Boolean)[1];
        if (!uuid) return;
        window.__btRedirecting = true;
        location.replace(`${location.origin}/TaskStarted/${uuid}?antibypass=true`);
        return;
    }
})();

// addddmaven thank you mr freeman
(function () {
    if (!CONFIG.LootLabs || !location.href.includes("/s?")) return;
    if (!btIsEnabled() || !btIsLootLabs()) {
        console.log('[BypassTools] LootLabs module disabled by settings.');
        return;
    }

    let overlayCreated = false;
    let requestCount = 0;
    let lootLabsStartedAt = 0;
    const LOOTLABS_MAX_PINGS = 6;
    const LOOTLABS_SOCKET_TIMEOUT_MS = 70000;
    const LOOTLABS_MAX_SOCKET_RETRIES = 1;

    function updateLootLabsStatus(requestsDone) {
        const statusEl = document.getElementById('fear-status');
        if (!statusEl) return;
        let percent = Math.min(100, Math.max(10, (requestsDone / 6) * 100));
        const bar = statusEl.querySelector('.bt-loading-bar-i');
        const details = statusEl.querySelector('.bt-status-detail');
        const elapsed = lootLabsStartedAt ? Math.floor((Date.now() - lootLabsStartedAt) / 1000) : 0;
        if (bar) bar.style.width = percent + '%';
        if (details) {
            details.innerHTML = `<span><div class="bt-spinner"></div>Bypassing AdMaven/LootLabs...</span><span class="bt-runtime-inline">Elapsed ${elapsed}s</span>`;
        }
    }

    function updateWKestCount() { updateLootLabsStatus(requestCount); }

    function createBypassOverlay() {
        if (overlayCreated) return;
        overlayCreated = true;
        lootLabsStartedAt = Date.now();
        const ui = createUnifiedOverlay({
            title: "Processing link.",
            subtitle: "Bypassing LootLabs Client-Side...",
            warningText: "Do not leave this page or processing may fail!",
            statusElementId: "fear-status",
            redirectBtnId: "fear-redirect-btn",
            showConsole: false,
            useAnimatedStatus: true,
            showRuntime: true,
            onButtonClick: () => {
                console.log("[BypassTools] Redirecting to:", unsafeWindow.wokeresponse);
                if (unsafeWindow.wokeresponse) window.location.href = unsafeWindow.wokeresponse;
            }
        });
        updateLootLabsStatus(0);
        if (ui.button) {
            ui.button.textContent = "Processing...";
            ui.button.disabled = true;
            ui.button.style.display = "none";
        }
        setInterval(() => {
            const ov = document.getElementById("bypasstools-overlay");
            if (ov) ov.style.zIndex = "2147483647";
        }, 500);
    }

    function showRedirectButton(e) {
        console.log("[BypassTools] Showing redirect button for:", e);
        unsafeWindow.wokeresponse = e;
        if (!document.getElementById("fear-redirect-btn")) createBypassOverlay();
        const t = document.getElementById("fear-redirect-btn");
        if (t) {
            t.disabled = false;
            t.textContent = "Open Destination";
            t.style.display = "block";
            const statusEl = document.getElementById('fear-status');
            if (statusEl) {
                const bar = statusEl.querySelector('.bt-loading-bar-i');
                const details = statusEl.querySelector('.bt-status-detail');
                if (bar) { bar.style.width = '100%'; bar.style.background = '#8b5cf6'; bar.style.boxShadow = '0 0 20px #8b5cf6'; }
                const elapsed = lootLabsStartedAt ? Math.floor((Date.now() - lootLabsStartedAt) / 1000) : 0;
                if (details) details.innerHTML = `<span style="color:#8b5cf6; font-weight:700;">Bypass complete</span><span class="bt-runtime-inline" data-final="true">Finished in ${elapsed}s</span>`;
            }
            console.log("[BypassTools] Button enabled!");
            reportSuccess();
        }
    }

    function showLootLabsRetryState(reason) {
        const statusEl = document.getElementById('fear-status');
        if (statusEl) {
            const bar = statusEl.querySelector('.bt-loading-bar-i');
            const details = statusEl.querySelector('.bt-status-detail');
            if (bar) { bar.style.width = '100%'; bar.style.background = '#ef4444'; bar.style.boxShadow = '0 0 20px rgba(239, 68, 68, 0.6)'; }
            if (details) details.innerHTML = `<span style="color:#fda4af;font-weight:700;">Bypass stalled (${reason})</span><span>Retry needed</span>`;
        }
        const btn = document.getElementById('fear-redirect-btn') || document.querySelector('.bypasstools-btn');
        if (btn) {
            btn.disabled = false;
            btn.textContent = 'Retry Bypass';
            btn.style.display = 'block';
            btn.onclick = () => { try { location.reload(); } catch { } };
        }
    }

    const runLootlabsSocket = (retryIndex, wsUrl, tcJson, syncerDomain, tid) => {
        let settled = false;
        let tokenReceived = false;
        let pendingToken = null;
        let pingInterval, watchdog;

        const taskCount  = tcJson.length;
        const testChoose = tcJson[0]?.test_choose;

        const cleanupSocket = () => {
            try { if (pingInterval) clearInterval(pingInterval); } catch { }
            try { if (watchdog) clearTimeout(watchdog); } catch { }
        };

        const showToken = (rawToken) => {
            if (settled) return;
            tokenReceived = true;
            cleanupSocket();
            const tok = String(rawToken || '').replace(/[\u0000-\u001F\u007F]/g, '').trim();
            if (!tok) { failSocket('invalid token'); return; }
            requestCount = LOOTLABS_MAX_PINGS; updateWKestCount();
            const pyl = btSolveLootlabsPayload(tok);
            if (pyl) { settled = true; showRedirectButton(pyl); try { u.close(); } catch { } return; }
            failSocket('xor decode failed');
        };

        const failSocket = (reason) => {
            if (settled) return;
            if (tokenReceived && reason === 'websocket closed') return;
            settled = true;
            cleanupSocket();
            try { u.close(); } catch { }
            if (retryIndex < LOOTLABS_MAX_SOCKET_RETRIES) {
                console.warn('[BypassTools] LootLabs WS retry', retryIndex + 1, reason);
                runLootlabsSocket(retryIndex + 1, wsUrl, tcJson, syncerDomain, tid);
                return;
            }
            showLootLabsRetryState(reason || 'no token');
        };

        const u = new (window._btOrigWS || window.WebSocket)(wsUrl);

        u.onopen = () => {
            console.log('[BypassTools] LootLabs: WS opened');
            requestCount = 1; updateWKestCount();
            watchdog = setTimeout(() => failSocket('websocket timeout'), LOOTLABS_SOCKET_TIMEOUT_MS);
            setTimeout(() => {
                if (settled) return;
                try { u.send('0'); } catch { }
                requestCount = Math.min(LOOTLABS_MAX_PINGS, requestCount + 1); updateWKestCount();
                pingInterval = setInterval(() => {
                    if (settled) return;
                    try { u.send('0'); } catch { }
                    requestCount = Math.min(LOOTLABS_MAX_PINGS, requestCount + 1); updateWKestCount();
                }, 10000);
            }, 10000);
        };

        u.onmessage = (ev) => {
            const msg = typeof ev.data === 'string' ? ev.data : String(ev.data || '');
            if (!msg) return;
            console.log('[BypassTools] LootLabs WS:', msg.substring(0, 80));
            requestCount = Math.min(LOOTLABS_MAX_PINGS, requestCount + 1); updateWKestCount();
            if (msg.includes('r:')) {
                pendingToken = msg.replace('r:', '');
                if (requestCount >= taskCount || (testChoose === 1 && requestCount >= 2)) {
                    showToken(pendingToken);
                }
                return;
            }
            if (msg === 'Refresh Page') { failSocket('refresh page'); return; }
            // any other message — check if pending token can now be shown
            if (pendingToken && (requestCount >= taskCount || (testChoose === 1 && requestCount >= 2))) {
                showToken(pendingToken);
            }
        };

        u.onerror = () => failSocket('websocket error');
        u.onclose = () => { if (!settled) failSocket('websocket closed'); };
    };

    // Self-contained runner: capture p + botd, make own TC, open WS
    let _llStarted = false;
    (function llRun() {
        const waitBody = (fn) => {
            if (document.body) { fn(); return; }
            const tick = () => { if (document.body) fn(); else setTimeout(tick, 25); };
            if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', tick, { once: true });
            else tick();
        };
        waitBody(async () => {
            if (_llStarted) return;
            _llStarted = true;
            createBypassOverlay();

            // 1. Capture p from page scope via script injection
            const p = await new Promise(resolve => {
                let tries = 0;
                const iv = setInterval(() => {
                    try {
                        const s = document.createElement('script');
                        s.textContent = "try{if(typeof p!=='undefined'&&p&&p.TID&&p.KEY){document.documentElement.setAttribute('data-bt-ll-p',JSON.stringify(p));}}catch(e){}";
                        document.documentElement.appendChild(s); s.remove();
                        const attr = document.documentElement.getAttribute('data-bt-ll-p');
                        if (attr) { document.documentElement.removeAttribute('data-bt-ll-p'); clearInterval(iv); resolve(JSON.parse(attr)); return; }
                    } catch { }
                    if (++tries > 100) { clearInterval(iv); resolve(null); }
                }, 100);
            });
            if (!p || !p.TID || !p.KEY) { showLootLabsRetryState('page config missing'); return; }
            console.log('[BypassTools] LootLabs: p ready, KEY len:', p.KEY.length);

            // 2. Wait for document.botd (the server requires it — without it TC returns error)
            await new Promise(resolve => {
                let tries = 0;
                const iv = setInterval(() => {
                    try {
                        const s = document.createElement('script');
                        s.textContent = "document.documentElement.setAttribute('data-bt-ll-botd-rdy', document.botd ? '1' : '0');";
                        document.documentElement.appendChild(s); s.remove();
                        if (document.documentElement.getAttribute('data-bt-ll-botd-rdy') === '1' || tries++ > 50) { clearInterval(iv); resolve(); }
                    } catch { tries++; }
                }, 200);
            });
            let llBotd = null, llBotds = '';
            try {
                const s = document.createElement('script');
                s.textContent = `document.documentElement.setAttribute('data-bt-ll-botd', JSON.stringify(document.botd||null)); document.documentElement.setAttribute('data-bt-ll-botds', document.session||'');`;
                document.documentElement.appendChild(s); s.remove();
                const ba = document.documentElement.getAttribute('data-bt-ll-botd');
                llBotd = (ba && ba !== 'null') ? JSON.parse(ba) : null;
                llBotds = document.documentElement.getAttribute('data-bt-ll-botds') || '';
            } catch { }
            console.log('[BypassTools] LootLabs: botd:', llBotd ? 'captured' : 'none', 'botds:', llBotds ? 'yes' : 'no');

            // 3. CDN fetch
            let cdnData;
            try {
                const r = await fetch('//' + p.CDN_DOMAIN + '/?tid=' + p.TID + '&params_only=1');
                const t = await r.text();
                cdnData = JSON.parse('[' + t.slice(1, -2) + ']');
            } catch { showLootLabsRetryState('cdn fetch failed'); return; }
            const serverDomain = cdnData[9];
            const syncerDomain = cdnData[29];
            const tcUrl = 'https://' + syncerDomain + '/tc';

            // 4. Session + cookie
            const sessionId = String(Math.floor(Math.random()*9+1) + Array(16).fill(0).map(()=>Math.floor(Math.random()*10)).join('') + Math.floor(Math.random()*10));
            let cookieId; try { cookieId = localStorage.getItem('ll_cookie_id'); } catch {}
            if (!cookieId) { cookieId = String(Math.floor(Math.random()*900000000)+100000000); try { localStorage.setItem('ll_cookie_id', cookieId); } catch {} }

            // 5. TC body with botd
            const tcBody = {
                tid: p.TID,
                bl: [1,3,4,5,6,7,8,9,10,11,12,13,14,15,16,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53],
                session: sessionId, max_tasks: 1, design_id: 106,
                cur_url: location.href, doc_ref: document.referrer,
                tier_id: p.TIER_ID || '', num_of_tasks: 1, is_loot: true,
                rkey: p.KEY, cookie_id: cookieId, offer: p.OFFER || '0'
            };
            if (llBotd)  tcBody.botd  = llBotd;
            if (llBotds) tcBody.botds = llBotds;
            const puid = new URLSearchParams(location.search).get('puid') || '';
            if (puid) tcBody.puid = puid;

            // 6. Own TC call (flag lets it through our fetch blocker)
            window.__ll_allow_tc = true;
            let tcJson;
            try {
                const resp = await fetch(tcUrl, {
                    method: 'POST', headers: { 'Content-Type': 'application/json' },
                    credentials: 'include', mode: 'cors', body: JSON.stringify(tcBody)
                });
                tcJson = await resp.json();
            } catch (e) {
                window.__ll_allow_tc = false;
                console.warn('[BypassTools] LootLabs: TC failed:', e);
                showLootLabsRetryState('TC failed'); return;
            }
            window.__ll_allow_tc = false;

            if (!Array.isArray(tcJson) || !tcJson.length) { showLootLabsRetryState('no tasks'); return; }
            console.log('[BypassTools] LootLabs: TC ok —', tcJson.length, 'task(s)');

            const taskSessionId = tcJson[0].session_id || sessionId;
            const urids   = tcJson.map(t => t.urid);
            const taskIds = tcJson.map(t => t.task_id);
            const x       = parseInt(String(urids[0]).slice(-5)) % 3;
            const wsBase  = x + '.' + serverDomain;

            // 7. Beacons
            for (let idx = 0; idx < tcJson.length; idx++) {
                const task = tcJson[idx];
                if (task.task_id == 17) { setTimeout(() => { gmFetch('https://skipped.lol/api/evade/ll', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ID: 17, URL: task.ad_url }) }).catch(() => {}); }, 100); }
                try { navigator.sendBeacon('https://enaightdecipie.com?event=task_clicked&session_id=' + taskSessionId + '&info=' + (idx+1)); } catch {}
                try { navigator.sendBeacon('https://' + wsBase + '/st?uid=' + task.urid + '&cat=' + task.task_id); } catch {}
                if (task.action_pixel_url) { try { fetch('//' + task.action_pixel_url.replace(/^\/\//, ''), { mode: 'cors' }).catch(() => {}); } catch {} }
            }
            for (const task of tcJson) {
                if (task.auto_complete_seconds != null) { const pu = 'https://' + wsBase + '/p?uid=' + task.urid; setTimeout(() => { try { navigator.sendBeacon(pu); } catch {} }, task.auto_complete_seconds * 1000); }
            }

            // 8. WS
            const wsUrl = 'wss://' + wsBase + '/c?uid=' + urids.join(',') + '&cat=' + taskIds.join(',') + '&key=' + p.KEY + '&session_id=' + taskSessionId + '&is_loot=1&tid=' + p.TID;
            console.log('[BypassTools] LootLabs: WS connecting, key len:', p.KEY.length);
            runLootlabsSocket(0, wsUrl, tcJson, syncerDomain, p.TID);
        });
    })();
})();

// ==========================================
// normal flow
// ==========================================

// im might be paranoid
document.addEventListener('click', function (e) {
    const target = e.target;
    const text = target.textContent?.toLowerCase() || '';
    const title = target.title?.toLowerCase() || '';
    const onclick = target.getAttribute('onclick') || '';
    if ((text.includes('retry') || text.includes('try again') ||
        title.includes('retry') || title.includes('try again') ||
        onclick.includes('retry')) &&
        (target.tagName === 'BUTTON' || target.classList.contains('btn') || target.getAttribute('role') === 'button')) {
        if (document.querySelector("#bypass-title")?.textContent === "BYPASS FAILED!" ||
            document.body.innerHTML.includes('bypass failed') ||
            document.body.innerHTML.includes('Bypass failed') ||
            document.body.innerHTML.includes('BYPASS FAILED')) {
            e.preventDefault();
            e.stopPropagation();
            unsafeWindow.easxRetry();
        }
    }
}, true);

const Log = {
    i: (msg) => console.log(`[BypassTools] ${msg}`),
    e: (msg) => console.error(`[BypassTools ERROR] ${msg}`),
    w: (msg) => console.warn(`[BypassTools WARN] ${msg}`),
};

async function sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }

async function findHref() {
    const start = Date.now();
    while (Date.now() - start < CONFIG.timeout) {
        await sleep(CONFIG.interval);
        try {
            if (document.querySelector("#bypass-title")?.textContent === "BYPASS DONE" && unsafeWindow.easxSuccess) {
                return unsafeWindow.easxResult;
            } else if (document.querySelector("#bypass-title")?.textContent === "BYPASS FAILED!") {
                return false;
            }
        } catch (err) {
            console.log(`Find href error: ${err}`);
        }
    }
    return false;
}

function isBot() {
    const t = document.title;
    return t.includes('Just a moment') || t.includes('Just a second') || (document.body?.innerHTML.includes('Are you human?') ?? false);
}

function isIndexPage() {
    const url = location.href.toLowerCase();
    const pathname = location.pathname.toLowerCase();
    const allowedDomains = [
        'rekonise.com', 'pastebin.com', 'social-unlock.com', 'sub2unlock.com',
        'sub2get.com', 'sub2unlock.net', 'sub2unlock.io', 'work.ink',
        'linkvertise.com', 'loot-links.com', 'loot-link.com', 'lootdest.com',
        'lootdest.org', 'lootlinks.co', 'lootlinks.com', 'best-links.org',
        'direct-links.net', 'direct-link.net'
    ];
    if (allowedDomains.some(d => location.hostname.includes(d))) {
        return pathname === '/' || pathname === '' || pathname === '/index.html' || pathname === '/index.php';
    }
    if (pathname === '/' || pathname === '' || pathname === '/index' || pathname === '/index.html') return true;
    const indexPatterns = [ /\/index\.html?$/, /\/home\.html?$/, /\/main\.html?$/, /\/$/, /^https?:\/\/[^\/]+\/?$/ ];
    for (const pattern of indexPatterns) { if (pattern.test(url)) return true; }
    return false;
}

// ==========================================
// yea i guess im a schizophrenic (i googled that word to make sure i typed it right)
// ==========================================
function showSecureBypassOverlay(persistent = false) {
    if (!unsafeWindow.easxOriginalUrl) {
        unsafeWindow.easxOriginalUrl = location.href;
        unsafeWindow.easxStoredOriginal = location.href;
        sessionStorage.setItem('easx_original_url', location.href);
    }
    if (document.getElementById('easx-overlay')) return;

    const makeStyle = () => {
        const s = document.createElement('style');
        s.id = 'easx-overlay-style';
        s.textContent = `
          ${btBaseUiCss()}
          #easx-overlay { position: fixed !important; inset: 0 !important; z-index: 2147483647 !important; display: flex !important; align-items: center !important; justify-content: center !important; background: linear-gradient(rgba(255,255,255,.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.035) 1px, transparent 1px), #07070a !important; background-size:52px 52px,52px 52px,auto !important; font-family: "Segoe UI","Aptos",sans-serif !important; pointer-events: auto !important; touch-action: manipulation !important; isolation:isolate !important; }
          #easx-panel { position:relative !important; overflow:hidden !important; background: linear-gradient(145deg,rgba(24,24,27,.92),rgba(12,12,15,.88)), radial-gradient(circle at top right,rgba(168,85,247,.15),transparent 220px) !important; color: #fff !important; padding: 34px !important; border-radius: 28px !important; max-width: 480px !important; width: min(480px, calc(100vw - 40px)) !important; text-align: center !important; border: 1px solid rgba(244,244,245,.10) !important; box-shadow: 0 34px 110px rgba(0,0,0,.48) !important; animation: bt-fade-in .5s ease-out !important; pointer-events: auto !important; box-sizing:border-box !important; }
          #easx-panel::before { content:"" !important; position:absolute !important; inset:0 !important; border-radius:inherit !important; border:1px solid rgba(168,85,247,.18) !important; pointer-events:none !important; }
          #easx-panel h2 { color: #fff !important; margin: 0 0 14px !important; font-family: "Aptos Display","Segoe UI Variable","Segoe UI",sans-serif !important; font-size: clamp(2rem,3.5vw,2.8rem) !important; line-height:1.05 !important; font-weight: 800 !important; letter-spacing:-.035em !important; }
          #easx-panel p { color: #a1a1aa !important; margin: 0 0 28px !important; font-size: 1rem !important; line-height: 1.65 !important; }
          .easx-button-group { display: grid !important; gap: 11px !important; }
          .easx-btn { display: flex !important; align-items: center !important; justify-content: center !important; min-height:52px !important; padding: 0 18px !important; border-radius: 16px !important; border: 1px solid rgba(168,85,247,.34) !important; cursor: pointer !important; font-weight: 900 !important; font-size: 1rem !important; line-height: 1 !important; text-align: center !important; transition: all .2s ease !important; width: 100% !important; font-family: "Segoe UI","Aptos",sans-serif !important; letter-spacing:.01em !important; pointer-events: auto !important; touch-action: manipulation !important; -webkit-tap-highlight-color: transparent !important; }
          #easx-yes { background: linear-gradient(135deg,#8b5cf6,#7c3aed) !important; color: #fff !important; box-shadow: 0 14px 42px rgba(168,85,247,.24) !important; }
          #easx-yes:hover { background: linear-gradient(135deg,#a855f7,#8b5cf6) !important; box-shadow: 0 18px 46px rgba(139,92,246,.34) !important; transform: translateY(-2px) !important; }
          #easx-yes:disabled { background:#27272a !important; color:#a1a1aa !important; cursor:wait !important; transform:none !important; box-shadow:none !important; }
          #easx-no { background: rgba(255,255,255,.035) !important; color: #a1a1aa !important; border-color: rgba(244,244,245,.10) !important; box-shadow:none !important; }
          #easx-no:hover { background: rgba(168,85,247,.10) !important; color: #fff !important; }
          .easx-footer { margin-top: 25px !important; font-size: 0.75rem !important; color: #52525b !important; }
          .easx-footer a { color: #a1a1aa !important; text-decoration: none !important; }
          .easx-footer a:hover { color: #8b5cf6 !important; }
        `;
        return s;
    };

    const create = () => {
        if (document.getElementById('easx-overlay')) return;
        if (!document.getElementById('easx-overlay-style')) document.head.appendChild(makeStyle());
        const root = document.createElement('div');
        root.id = 'easx-overlay';
        root.className = 'bt-stage-bg';
        const panel = document.createElement('div');
        panel.id = 'easx-panel';
        panel.innerHTML = `
          ${btBrandHtml()}
          <h2>Start bypass?</h2>
          <p>Ad-link detected. Start bypass when ready.</p>
          <div class="easx-button-group">
            <button id="easx-yes" class="easx-btn" type="button">Start Bypass</button>
            <button id="easx-no" class="easx-btn" type="button">Cancel</button>
          </div>
          <div class="easx-footer">Powered by <a href="https://bypass.tools" target="_blank" rel="noopener noreferrer">BypassTools</a> · v${BT_VERSION}</div>
        `;
        root.appendChild(panel);
        (document.body || document.documentElement).appendChild(root);
        document.documentElement.style.overflow = 'hidden';

        const cleanup = () => {
            document.documentElement.style.overflow = '';
            document.getElementById('easx-overlay')?.remove();
        };

        const yes = document.getElementById('easx-yes');
        const no = document.getElementById('easx-no');

        const navigateTo = (url) => {
            try { window.location.href = url; return; } catch { }
            try { window.location.assign(url); return; } catch { }
            try { window.open(url, '_self'); } catch { }
        };

        const handleYes = (ev) => {
            try { ev?.preventDefault?.(); ev?.stopPropagation?.(); } catch { }
            try { reportSuccess?.(); } catch { }
            try { if (persistent && window.easxOverlayInterval) clearInterval(window.easxOverlayInterval); } catch { }
            try {
                if (yes) { yes.disabled = true; yes.textContent = 'Redirecting...'; }
                if (no) { no.disabled = true; no.style.opacity = '0.55'; }
            } catch { }
            const protocol = isDevelopment ? 'http://' : 'https://';
            setTimeout(() => {
                try { cleanup(); } catch { }
                navigateTo(`${protocol}${CONFIG.site}${encodeURIComponent(location.href)}&wait=${CONFIG.wait}`);
            }, 360);
        };

        const handleNo = (ev) => {
            try { ev?.preventDefault?.(); ev?.stopPropagation?.(); } catch { }
            try { if (persistent && window.easxOverlayInterval) clearInterval(window.easxOverlayInterval); } catch { }
            try { cleanup(); } catch { }
        };

        const addTapListeners = (el, handler) => {
            if (!el) return;
            try { el.onclick = null; } catch { }
            el.addEventListener('click', handler, { capture: true });
            el.addEventListener('pointerup', handler, { capture: true });
            el.addEventListener('touchend', handler, { capture: true, passive: false });
        };
        addTapListeners(yes, handleYes);
        addTapListeners(no, handleNo);
    };

    create();

    if (persistent) {
        if (window.easxOverlayInterval) clearInterval(window.easxOverlayInterval);
        window.easxOverlayInterval = setInterval(() => {
            if (!document.getElementById('easx-overlay')) {
                create();
            } else {
                const ov = document.getElementById('easx-overlay');
                if (ov && ov.style.zIndex !== '2147483647') ov.style.setProperty('z-index', '2147483647', 'important');
            }
        }, 500);
    }
}

async function easxMain() {
    if (unsafeWindow.easxSkipMain) return;

    if (!await waitForSettingsBridge(5000)) {
        console.log('[BypassTools] Settings bridge not ready, skipping page processing.');
        return;
    }

    if (location.hostname === 'bypass.tools') {
        const pathname = location.pathname.toLowerCase();
        const hasUrlParam = new URLSearchParams(location.search).has('url');
        const isBypassRoute = pathname === '/bypass' || pathname === '/wait' || (pathname === '/' && hasUrlParam);
        if (!isBypassRoute) { console.log('[BypassTools] bypass.tools non-bypass page detected, skipping.'); return; }
    }

    if (!isExtensionEnabled()) { console.log('[BypassTools] Extension disabled via popup settings.'); return; }

    CONFIG.SecureMode = isSecureMode();
    const waitAttr = document.documentElement.getAttribute('data-easx-wait-time');
    let userWait = 25;
    if (waitAttr !== null) { userWait = parseInt(waitAttr); if (isNaN(userWait)) userWait = 25; }
    CONFIG.wait = userWait;

    if (CONFIG.SecureMode) { unsafeWindow.easxSecureMode = true; } else { unsafeWindow.easxSecureMode = false; }

    if (!unsafeWindow.easxSettingsListenerAttached) {
        unsafeWindow.easxSettingsListenerAttached = true;
        window.addEventListener('easx-settings-changed', () => {
            CONFIG.SecureMode = isSecureMode();
            const waitAttrLive = document.documentElement.getAttribute('data-easx-wait-time');
            let waitLive = 25;
            if (waitAttrLive !== null) { waitLive = parseInt(waitAttrLive, 10); if (isNaN(waitLive)) waitLive = 25; }
            CONFIG.wait = waitLive;
            unsafeWindow.easxSecureMode = CONFIG.SecureMode;
            if (!isExtensionEnabled()) {
                document.getElementById('easx-overlay')?.remove();
                if (window.easxOverlayInterval) { clearInterval(window.easxOverlayInterval); window.easxOverlayInterval = null; }
            }
        });
    }

    const notyf = createNotifier();

    if (window.easxModuleRunning) { console.log('[BypassTools] Module running, halting main generic logic'); return; }

    if (location.hostname === 'work.ink') {
        console.log('[BypassTools] Work.ink page detected, skipping generic secure overlay');
        return;
    }

    const easxHost = location.hostname.toLowerCase();
    const isLootLabsPage = [
        'loot-link.com', 'loot-links.com', 'lootdest.org', 'lootdest.com',
        'lootlabs.gg', 'links.lootlabs.gg', 'lootboost.net', 'lootlinks.co',
        'lootlinks.com', 'best-links.org'
    ].some(domain => easxHost === domain || easxHost.endsWith('.' + domain));
    if (isLootLabsPage) {
        console.log('[BypassTools] LootLabs page detected, skipping generic secure overlay');
        return;
    }

    if (easxHost === 'rinku.pro' || easxHost.endsWith('.rinku.pro')) {
        if (location.pathname === '/' || location.pathname === '' || location.href.includes('favicon.ico')) return;
        console.log('[BypassTools] Rinku page detected');
        if (!unsafeWindow.easxOriginalUrl) {
            unsafeWindow.easxOriginalUrl = location.href;
            unsafeWindow.easxStoredOriginal = location.href;
            sessionStorage.setItem('easx_original_url', location.href);
        }
        if (CONFIG.SecureMode) { showSecureBypassOverlay(true); return; }
        const protocol = isDevelopment ? 'http://' : 'https://';
        location.assign(`${protocol}${CONFIG.site}${encodeURIComponent(location.href)}&wait=${CONFIG.wait}`);
        return;
    }

    if (location.hostname.includes('linkvertise.com') || location.hostname.includes('linkvertise.net')) {
        if (location.href.includes('favicon.ico')) return;
        if (location.pathname === '/' || location.pathname === '') return;
        console.log('[BypassTools] Explicit Linkvertise detection triggered');
        if (!unsafeWindow.easxOriginalUrl) {
            unsafeWindow.easxOriginalUrl = location.href;
            unsafeWindow.easxStoredOriginal = location.href;
            sessionStorage.setItem('easx_original_url', location.href);
        }
        if (CONFIG.SecureMode) { showSecureBypassOverlay(true); return; }
        else {
            const protocol = isDevelopment ? 'http://' : 'https://';
            location.assign(`${protocol}${CONFIG.site}${encodeURIComponent(location.href)}&wait=${CONFIG.wait}`);
            return;
        }
    }

    if (isBot()) { notyf.information('Complete the bot challenge to proceed'); return; }
    if (isIndexPage()) { Log.i('Index page detected, skipping bypass popup'); return; }

    const p = new URLSearchParams(window.location.search);
    const ref = p.get('referrer');
    if (ref) {
        try { window.stop(); } catch (e) { }
        if (!unsafeWindow.easxOriginalUrl) {
            let originalUrl = null;
            if (unsafeWindow.easxEarlyCapture) originalUrl = unsafeWindow.easxEarlyCapture;
            if (!originalUrl) { try { originalUrl = sessionStorage.getItem('easx_early_capture'); } catch (e) { } }
            if (!originalUrl) {
                originalUrl = location.href;
                originalUrl = originalUrl.split('#')[0].split('?hash=')[0].split('&hash=')[0];
                if (originalUrl.includes('bypass.vip') || originalUrl.includes('rip.linkvertise')) {
                    const urlParams = new URLSearchParams(location.search);
                    if (urlParams.get('url')) { originalUrl = decodeURIComponent(urlParams.get('url')); }
                    else if (document.referrer && !document.referrer.includes('bypass')) { originalUrl = document.referrer; }
                }
            }
            if (!originalUrl || originalUrl.includes('favicon.ico') || originalUrl.includes('.css') || originalUrl.includes('.js')) {
                originalUrl = `https://${location.hostname}/`;
            }
            unsafeWindow.easxOriginalUrl = originalUrl;
            try { sessionStorage.setItem('easx_original_url', originalUrl); } catch (e) { }
        }

        if (CONFIG.SecureMode) {
            unsafeWindow.dest = decodeURIComponent(ref);
            document.documentElement.innerHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BypassTools - Destination Ready</title>
    <style>
        :root { --bg-color:#07070a; --accent:#8b5cf6; --accent-hover:#7c3aed; --text-primary:#ffffff; --text-secondary:#a1a1aa; }
        body { font-family:"Segoe UI Variable","Segoe UI","Aptos",sans-serif; background:linear-gradient(rgba(255,255,255,.035) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.035) 1px,transparent 1px),var(--bg-color); background-size:52px 52px,52px 52px,auto; color:var(--text-primary); display:flex; justify-content:center; align-items:center; min-height:100vh; margin:0; overflow:hidden; isolation:isolate; }
        body::before,body::after{content:"";position:fixed;width:420px;height:420px;border-radius:999px;background:radial-gradient(circle,rgba(168,85,247,.30),transparent 66%);filter:blur(6px);z-index:-2;animation:drift 12s ease-in-out infinite alternate;}
        body::before{top:-150px;right:-120px;} body::after{left:-160px;bottom:-180px;width:520px;height:520px;background:radial-gradient(circle,rgba(124,58,237,.22),transparent 68%);animation-duration:15s;}
        .container { position:relative;overflow:hidden;background:linear-gradient(145deg,rgba(24,24,27,.92),rgba(12,12,15,.88)),radial-gradient(circle at top right,rgba(168,85,247,.15),transparent 220px);border:1px solid rgba(244,244,245,.10);border-radius:28px;padding:34px;text-align:center;box-shadow:0 34px 110px rgba(0,0,0,.48);max-width:480px;width:min(480px,calc(100vw - 40px));animation:fadeIn .5s ease-out;box-sizing:border-box; }
        .container::before{content:"";position:absolute;inset:0;border-radius:inherit;border:1px solid rgba(168,85,247,.18);pointer-events:none;}
        @keyframes fadeIn { from { opacity:0; transform:translateY(14px); } to { opacity:1; transform:translateY(0); } }
        @keyframes drift{from{transform:translate3d(0,0,0) scale(1)}to{transform:translate3d(-30px,28px,0) scale(1.08)}}
        h1.title { font-family:"Aptos Display","Segoe UI Variable","Segoe UI",sans-serif;font-size:clamp(2rem,3.5vw,3rem);line-height:1.05;font-weight:800;margin:0 0 14px;letter-spacing:-.035em;color:#fff; }
        p.subtitle { color:var(--text-secondary);font-size:1rem;line-height:1.65;margin:0 0 28px; }
        .next-btn { display:flex;align-items:center;justify-content:center;min-height:54px;background:linear-gradient(135deg,var(--accent),var(--accent-hover));color:white;border:1px solid rgba(196,181,253,.38);padding:0 20px;font-size:1rem;font-weight:850;border-radius:18px;cursor:pointer;transition:all .2s ease;width:100%;box-shadow:0 16px 44px rgba(168,85,247,.26),inset 0 1px 0 rgba(255,255,255,.16);letter-spacing:.01em;line-height:1;text-align:center; }
        .next-btn:hover { transform:translateY(-2px);box-shadow:0 18px 46px rgba(139,92,246,.34); }
        .next-btn:disabled { background: #27272a; color: #52525b; cursor: not-allowed; transform: none; box-shadow: none; }
        .footer { margin-top: 26px; font-size: 0.78rem; color: #52525b; }
        .footer a { color: #71717a; text-decoration: none; transition: color 0.2s; }
        .footer a:hover { color: var(--accent); }
        .countdown { display:inline-flex;align-items:center;justify-content:center;width:100%;min-height:42px;margin:4px 0 18px;padding:10px 14px;border-radius:999px;border:1px solid rgba(245,158,11,.26);background:rgba(245,158,11,.10);color:#fcd34d;font-size:.86rem;line-height:1.25;font-weight:800;box-sizing:border-box; }
    </style>
</head>
<body>
    <div class="container">
        ${btBrandHtml()}
        <h1 class="title">Your link is ready.</h1>
        <p class="subtitle">The destination has been prepared. Continue when ready.</p>
        <div id="countdown" class="countdown"></div>
        <button id="nextBtn" class="next-btn">Open Destination</button>
        <div class="footer">Powered by <a href="https://bypass.tools" target="_blank" rel="noopener noreferrer">BypassTools</a> · v${BT_VERSION}</div>
    </div>
</body>
</html>`;
            const script = document.createElement('script');
            script.textContent = 'window.ock=true;';
            document.head.appendChild(script);

            (function waitForOck() {
                if (unsafeWindow.ock === true) {
                    const dest = unsafeWindow.dest || '';
                    const countdownEl = document.getElementById('countdown');
                    const btn = document.getElementById('nextBtn');
                    const hasHash = (u) => { try { return unsafeWindow.dest.includes("hash="); } catch { return false; } };
                    if (hasHash(dest)) {
                        let time = 8;
                        countdownEl.textContent = `Hash expires in ${time}s. Open the destination now.`;
                        const interval = setInterval(() => {
                            time--;
                            if (time > 0) {
                                countdownEl.textContent = `Hash expires in ${time}s. Open the destination now.`;
                            } else {
                                countdownEl.textContent = `This time-sensitive link may be expired. If it fails, restart the bypass from the original page.`;
                                countdownEl.style.color = '#ff4d4d';
                                clearInterval(interval);
                            }
                        }, 1000);
                    } else {
                        if (countdownEl) countdownEl.style.display = 'none';
                    }
                    if (btn) {
                        btn.addEventListener('click', () => {
                            if (!btn.disabled && unsafeWindow.dest) { window.location.href = unsafeWindow.dest; }
                        });
                    }
                } else { setTimeout(waitForOck, 50); }
            })();

        } else {
            // goes brrrrrrr
            const dest = decodeURIComponent(ref);
            window.location.href = dest;
        }
        return;
    }

    if (location.href.includes(`${CONFIG.apiBase}/wait`)) {
        notyf.information(`Bypass Tool processing your link...`);
        return;
    }

    if ((location.hostname === 'localhost' && (location.port === '13075' || location.port === '3000') && location.pathname === "/bypass") ||
        (location.hostname === 'bypass.tools' && location.pathname === "/bypass")) {
        notyf.information("BypassTools is bypassing this link...");
        let retryAttempts = 0;
        const maxRetries = 3;
        const attemptBypass = async () => {
            const success = await findHref();
            if (success) {
                notyf.success(`Redirecting to destination...`);
                const redirect = p.get('url');
                const host = new URL(redirect).hostname;
                await sleep(2000);
                const bypassUrl = `https://${host}/favicon.ico?referrer=${encodeURIComponent(success)}`;
                reportSuccess();
                window.location.href = bypassUrl;
            } else {
                Log.e('Failed to find link');
                retryAttempts++;
                if (retryAttempts < maxRetries) {
                    notyf.error(`Bypass failed. Attempt ${retryAttempts}/${maxRetries}. Setting up retry...`);
                    const setupRetryListener = () => {
                        const retryBtn = findRetryButton();
                        if (retryBtn) {
                            retryBtn.onclick = null;
                            retryBtn.addEventListener('click', async (e) => {
                                e.preventDefault(); e.stopPropagation();
                                unsafeWindow.easxRetry();
                            });
                            return true;
                        }
                        return false;
                    };
                    if (!setupRetryListener()) {
                        const observer = new MutationObserver(() => { if (setupRetryListener()) observer.disconnect(); });
                        observer.observe(document.body, { childList: true, subtree: true });
                        setTimeout(() => observer.disconnect(), 30000);
                    }
                } else {
                    notyf.error(`Bypass failed after ${maxRetries} attempts. Please check the URL and try again.`);
                }
            }
        };
        await attemptBypass();
        return;
    }

    if (location.href.includes(`${CONFIG.apiBase}/?url=`) && !location.href.includes('example')) {
        await sleep(1000);
        const info = document.getElementById('information');
        if (info) info.click();
        notyf.information(`BypassTools redirecting in ${CONFIG.wait}s...`);
        let timeLeft = CONFIG.wait;
        const h1 = document.querySelector('h1');
        if (h1) {
            h1.textContent = `BypassTools redirecting in ${timeLeft}s...`;
            h1.style.color = '#1E88E5';
            const countdown = setInterval(() => {
                timeLeft--;
                if (timeLeft <= 0) { clearInterval(countdown); h1.textContent = `Redirecting now...`; }
                else { h1.textContent = `BypassTools redirecting in ${timeLeft}s...`; }
            }, 1000);
        }
        await sleep(CONFIG.wait * 1000);
        const u = new URLSearchParams(location.search).get('url');
        const protocol = isDevelopment ? 'http://' : 'https://';
        window.location.href = `${protocol}${CONFIG.site}${encodeURIComponent(u)}&wait=${CONFIG.wait}`;
        return;
    }

    if (CONFIG.SecureMode) {
        setTimeout(() => showSecureBypassOverlay(false), 1000);
    } else {
        if (!unsafeWindow.easxOriginalUrl) {
            unsafeWindow.easxOriginalUrl = location.href;
            unsafeWindow.easxStoredOriginal = location.href;
            sessionStorage.setItem('easx_original_url', location.href);
        }
        document.documentElement.innerHTML = `<h2>BypassTools - Advanced Bypass System</h2>`;
        const bypassUrl = `${CONFIG.apiBase}/wait?url=${encodeURIComponent(location.href)}&wait=${CONFIG.wait}`;
        window.location.assign(bypassUrl);
    }
}

// one i was screamed "amoungus" at 3:33 am in coridor, my mom woke up and beat me.
const easxInit = async () => {
    if (window.__btRedirecting) return;
    try {
        console.log('[BypassTools Extension] Content module loaded v4.1.0. Initializing...');
        await easxMain();
    } catch (e) {
        console.error(`[BypassTools Extension] Init failed: ${e.message}`);
        console.error(e);
    }
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', easxInit);
} else {
    easxInit();
}

})(); // end it all eas | https://eas.lol

