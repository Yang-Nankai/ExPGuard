// AdsMeta Background Service Worker

// ─── Secure JWT storage (session-scoped only: cleared on browser close) ───
// Plan info is cached separately in local storage (smeta_plan) — JWT is never persisted to disk.
const jwtStore = {
  get: () => new Promise(resolve => chrome.storage.session.get('smeta_jwt', d => resolve(d.smeta_jwt || null))),
  set: (jwt) => new Promise(resolve => chrome.storage.session.set({ smeta_jwt: jwt }, resolve)),
  remove: () => new Promise(resolve =>
    chrome.storage.session.remove('smeta_jwt', () =>
      // Clean up any legacy local backup from older versions
      chrome.storage.local.remove('smeta_jwt_bk', resolve))),
}

// ─── Icon click handled by popup.html / popup.js (default_popup) ───


const ALLOWED_HOSTS = [
  'graph.facebook.com',
  'adsmanager.facebook.com',
  'adsmanager-graph.facebook.com',
  'business.facebook.com',
  'www.facebook.com',
  'api.imgbb.com',
];

function isAllowedUrl(url) {
  try {
    const { hostname } = new URL(url);
    return ALLOWED_HOSTS.some(h => hostname === h || hostname.endsWith('.' + h));
  } catch { return false; }
}

function buildFetchOptions(request) {
  const { method = 'GET', header = {}, body, form } = request;
  const isForm = !!form;
  const isFbOrSmeta = /facebook\.com|fbcdn\.net|adsmeta\.io/.test(request.url || '');
  const opts = {
    method,
    credentials: isFbOrSmeta ? 'include' : 'omit',
    headers: {
      'Content-Type': isForm ? 'application/x-www-form-urlencoded' : 'application/json',
      ...header,
    },
  };
  if (method !== 'GET') {
    if (isForm) opts.body = form;
    else if (body) opts.body = typeof body === 'string' ? body : JSON.stringify(body);
  }
  return opts;
}

// ─── Smeta.io Notifications ───
const SMETA_API = 'https://adsmeta.io/api';
const POLL_ALARM = 'smeta-notif-poll';

async function smetaFetch(path, jwt, opts = {}) {
  try {
    const r = await fetch(`${SMETA_API}${path}`, {
      ...opts,
      headers: {
        'Authorization': `Bearer ${jwt}`,
        'Content-Type': 'application/json',
        ...(opts.headers || {}),
      },
    });
    if (!r.ok) return null;
    return await r.json();
  } catch { return null; }
}

// ─── REMOTE CONFIG (Kill Switch + Version Gate) — đọc /api/ext/config (server MÌNH, KHÔNG phải FB) ───
// Admin gạt Kill Switch / đặt Phiên bản tối thiểu ở Operations Dashboard → áp NGAY mà KHÔNG cần resubmit store.
// Cache 5 phút (TTL) trong storage.local; lỗi mạng → dùng cache cũ (fail-soft, không tự khoá nhầm).
const EXT_CONFIG_TTL = 5 * 60 * 1000;
async function getRemoteConfig(force = false) {
  try {
    const { smeta_ext_cfg, smeta_ext_cfg_t } = await chrome.storage.local.get(['smeta_ext_cfg', 'smeta_ext_cfg_t']);
    if (!force && smeta_ext_cfg && Date.now() - (smeta_ext_cfg_t || 0) < EXT_CONFIG_TTL) return smeta_ext_cfg;
    const r = await fetch(`${SMETA_API}/ext/config`);
    if (!r.ok) return smeta_ext_cfg || null;
    const cfg = await r.json();
    await chrome.storage.local.set({ smeta_ext_cfg: cfg, smeta_ext_cfg_t: Date.now() });
    return cfg;
  } catch {
    const { smeta_ext_cfg } = await chrome.storage.local.get('smeta_ext_cfg');
    return smeta_ext_cfg || null;
  }
}
// So sánh semver "a vs b": <0 nếu a cũ hơn b.
function cmpVer(a, b) {
  const pa = String(a || '0').split('.').map(n => parseInt(n, 10) || 0);
  const pb = String(b || '0').split('.').map(n => parseInt(n, 10) || 0);
  for (let i = 0; i < Math.max(pa.length, pb.length); i++) { const d = (pa[i] || 0) - (pb[i] || 0); if (d) return d < 0 ? -1 : 1; }
  return 0;
}
// Trả về CHUỖI lý do chặn (killSwitch / dưới minVersion) hoặc null nếu được phép chạm FB.
async function gateBlockMsg() {
  const cfg = await getRemoteConfig();
  if (!cfg) return null;                       // chưa có config (lỗi mạng) → KHÔNG chặn (fail-soft)
  if (cfg.killSwitch) return cfg.killMsg || 'AdsMeta tạm bảo trì — vui lòng thử lại sau ít phút.';
  if (cfg.minVersion && cmpVer(chrome.runtime.getManifest().version, cfg.minVersion) < 0)
    return cfg.minVersionMsg || 'Vui lòng cập nhật AdsMeta Extension lên phiên bản mới nhất để tiếp tục.';
  return null;
}

// ─── Thống kê lượt cài extension (ẩn danh — KHÔNG cần đăng nhập, KHÔNG gắn với user) ───
// Mỗi thiết bị tự sinh 1 installId ngẫu nhiên lưu local, ping server ĐÚNG 1 LẦN (suốt đời cài).
// Server dedupe theo installId → đếm số máy đã cài thật, kể cả người chưa đăng nhập.
async function pingInstallOnce() {
  try {
    const { smeta_ext_install_id } = await chrome.storage.local.get('smeta_ext_install_id');
    if (smeta_ext_install_id) return; // đã ping rồi → bỏ qua
    const installId = (self.crypto && crypto.randomUUID)
      ? crypto.randomUUID()
      : (Date.now().toString(36) + Math.random().toString(36).slice(2));
    const version = chrome.runtime.getManifest().version;
    await fetch(`${SMETA_API}/ext/installed`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ installId, version }),
    });
    await chrome.storage.local.set({ smeta_ext_install_id: installId });
  } catch { /* tracking không được phép làm vỡ extension */ }
}

// ─── LỚP 1 (instant-fresh trợ lý) — hướng (3): nhờ TAB DASHBOARD đang mở chạy sync ───
// AN TOÀN CHECKPOINT: extension KHÔNG fetch FB. Chỉ khi server báo có lệnh (user vừa hỏi Telegram + data cũ) →
// tìm tab adsmeta.io đang mở → nhắn nó "sync đi" (dashboard có sẵn logic+token). Không có tab → báo server để
// A nhắn user "mở 1 tab Facebook/AdsMeta". On-demand, KHÔNG timer-FB. Rate-limit 30s tránh spam.
let _lastFetchCmdAt = 0;
async function checkFetchCommand(smeta_jwt) {
  try {
    if (Date.now() - _lastFetchCmdAt < 30000) return;   // rate-limit 30s
    const cmd = await smetaFetch('/ext/fetch-command', smeta_jwt);
    if (!cmd || !cmd.fetch || !cmd.reqId) return;
    _lastFetchCmdAt = Date.now();
    const tabs = await chrome.tabs.query({ url: ['https://adsmeta.io/*', 'https://www.adsmeta.io/*', 'https://v2.adsmeta.io/*'] });
    const tab = (tabs || []).find(t => t.id != null);
    if (!tab) {
      // Không có tab dashboard → A nhắn user mở (LỚP 0 vẫn trả số gần nhất).
      await smetaFetch('/ext/fetch-done', smeta_jwt, { method: 'POST', body: JSON.stringify({ reqId: cmd.reqId, ok: false, reason: 'no_dashboard_tab' }) });
      return;
    }
    // Nhờ tab dashboard chạy sync (dashboard tự POST /sync/fb-data + /ext/fetch-done {ok:true} khi xong — A làm).
    try { chrome.tabs.sendMessage(tab.id, { type: 'AMS_REFRESH_SYNC', reqId: cmd.reqId }); } catch {}
  } catch {}
}

async function pollSmetaNotifications() {
  const smeta_jwt = await jwtStore.get();
  if (!smeta_jwt) return;

  checkFetchCommand(smeta_jwt);   // LỚP 1: kiểm lệnh lấy số tươi (on-demand, không chạm FB)

  const notifs = await smetaFetch('/notifications', smeta_jwt);
  if (!Array.isArray(notifs)) return;

  const { smeta_seen_ids = [] } = await chrome.storage.local.get('smeta_seen_ids');
  const seenSet = new Set(smeta_seen_ids);

  const newNotifs = notifs.filter(n => !seenSet.has(n.id) && !n.isRead);
  for (const n of newNotifs.slice(0, 3)) {
    try {
      await chrome.notifications.create(`smeta-${n.id}`, {
        type: 'basic',
        iconUrl: 'icons/icon48.png',
        title: `AdsMeta: ${n.title}`,
        message: n.message,
        priority: (n.type === 'WARNING' || n.type === 'ERROR') ? 2 : 1,
      });
    } catch {}
    seenSet.add(n.id);
  }

  await chrome.storage.local.set({
    smeta_seen_ids: [...seenSet].slice(-500),
    smeta_notifs: notifs,
  });
}

// ─── [ĐÃ GỠ] Tự động hóa nền (runAutomation/getFbTokenCached) ───
// LÝ DO: nó gọi graph.facebook.com TỪ service worker (origin chrome-extension) trên timer 5' =
// đúng kiểu gây checkpoint (956). Mặc định đã TẮT + không có UI bật, nay gỡ hẳn cho sạch bề mặt rủi ro.
// Nếu sau cần hẹn lịch bật/tắt campaign: phải chạy TRONG TAB facebook.com như cụm Marketing Nhóm
// (chrome.scripting.executeScript), KHÔNG fetch FB từ SW. Xem MARKETING_NHOM_FB_CODES.md.

chrome.alarms.onAlarm.addListener(async alarm => {
  if (alarm.name !== POLL_ALARM) return;
  pollSmetaNotifications(); // CHỈ poll thông báo từ server mình (KHÔNG chạm FB)
});

chrome.runtime.onInstalled.addListener(async () => {
  pingInstallOnce(); // đếm lượt cài (ẩn danh, 1 lần/thiết bị)
  getRemoteConfig(true); // nạp Kill Switch + Version Gate ngay
  const smeta_jwt = await jwtStore.get();
  if (smeta_jwt) chrome.alarms.create(POLL_ALARM, { periodInMinutes: 5 });

  chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: [101, 102, 103],
    addRules: [
      {
        id: 101,
        priority: 1,
        action: {
          type: 'modifyHeaders',
          requestHeaders: [
            { header: 'origin', operation: 'set', value: 'https://business.facebook.com' },
            { header: 'referer', operation: 'set', value: 'https://business.facebook.com/' },
          ],
        },
        condition: {
          urlFilter: 'https://business.facebook.com/business/adaccount/limits/*',
          resourceTypes: ['xmlhttprequest'],
        },
      },
      // Upload ảnh nhóm: SW gửi Origin = id extension → FB chặn. Ghi đè về www.facebook.com.
      {
        id: 102,
        priority: 1,
        action: {
          type: 'modifyHeaders',
          requestHeaders: [
            { header: 'origin', operation: 'set', value: 'https://www.facebook.com' },
            { header: 'referer', operation: 'set', value: 'https://www.facebook.com/' },
          ],
        },
        condition: {
          urlFilter: 'https://upload.facebook.com/*',
          resourceTypes: ['xmlhttprequest', 'other'],
        },
      },
      // GraphQL nội bộ www (lấy nhóm / đăng bài) qua SW — đảm bảo Origin đúng.
      {
        id: 103,
        priority: 1,
        action: {
          type: 'modifyHeaders',
          requestHeaders: [
            { header: 'origin', operation: 'set', value: 'https://www.facebook.com' },
            { header: 'referer', operation: 'set', value: 'https://www.facebook.com/' },
          ],
        },
        condition: {
          urlFilter: 'https://www.facebook.com/api/graphql/*',
          resourceTypes: ['xmlhttprequest', 'other'],
        },
      },
    ],
  });
});

chrome.runtime.onStartup.addListener(async () => {
  pingInstallOnce(); // bắt cả máy đã cài từ trước (ping 1 lần khi bản mới chạy)
  getRemoteConfig(true); // nạp Kill Switch + Version Gate ngay
  const smeta_jwt = await jwtStore.get();
  if (smeta_jwt) chrome.alarms.create(POLL_ALARM, { periodInMinutes: 5 });
});

// [KHÔI PHỤC theo yêu cầu] fetchFbTokenFromSW() — service worker tự fetch HTML FB ở NỀN (cookie user)
// để bóc access_token khi KHÔNG có tab FB nào mở. CHỈ dùng làm FALLBACK sau khi in-tab thất bại.
// ⚠️ Lưu ý rủi ro: fetch FB từ service worker (không tab) là chữ ký "headless" có thể khiến FB
// checkpoint (956). Ưu tiên in-tab; SW-fetch chỉ chạy khi user không mở sẵn tab FB.
let _swTokenInflight = null;
async function fetchFbTokenFromSW() {
  if (_swTokenInflight) return _swTokenInflight;
  _swTokenInflight = (async () => {
    // KILL SWITCH / VERSION GATE: nếu admin tắt hoặc bản quá cũ → KHÔNG chạm FB (kể cả lấy token).
    const _blk = await gateBlockMsg();
    if (_blk) return { token: null, fbdt: '', time: 0, blocked: _blk };
    // adsmanager TRƯỚC: token first-party (EAAB) chuẩn nhất cho Ads. Rồi business/www làm dự phòng.
    const urls = [
      'https://adsmanager.facebook.com/adsmanager/manage/campaigns',
      'https://business.facebook.com/',
      'https://www.facebook.com/adsmanager/manage/campaigns',
    ];
    const headers = {
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
      'Accept-Language': 'en-US,en;q=0.9',
    };
    for (const url of urls) {
      try {
        const r = await fetch(url, { credentials: 'include', headers, redirect: 'follow' });
        if (!r.ok) continue;
        const html = await r.text();
        let token = null;
        const m1 = html.match(/window\.__accessToken="([^"]+)"/);
        if (m1) token = m1[1];
        if (!token) { const m2 = html.match(/__accessToken=([^&"'\s]+)/); if (m2) token = m2[1]; }
        if (!token) { const m3 = html.match(/"access_token":"(EAA[^"]+)"/); if (m3) token = m3[1]; }
        if (!token) { const m4 = html.match(/EAA[A-Za-z0-9]{0,4}[A-Za-z0-9_-]{20,}/); if (m4) token = m4[0]; }
        if (token && token !== 'NO' && token.length > 20) {
          // Lấy thêm fb_dtsg (cần cho 1 số GraphQL write) nếu có — không bắt buộc
          let fbdt = '';
          const d1 = html.match(/"DTSGInitialData",\[\],\{"token":"([^"]+)"/);
          if (d1) fbdt = d1[1];
          else { const d2 = html.match(/name="fb_dtsg" value="([^"]+)"/); if (d2) fbdt = d2[1]; }
          await chrome.storage.local.set({ fb_token: token, fb_token_time: Date.now(), ...(fbdt ? { fb_fbdt: fbdt } : {}) });
          return { token, fbdt, time: Date.now() };
        }
      } catch (e) {
        console.warn('[AdsMeta SW] fetchFbTokenFromSW failed for', url, e?.message);
      }
    }
    return { token: null, fbdt: '', time: 0 };
  })();
  try { return await _swTokenInflight; }
  finally { _swTokenInflight = null; }
}

// ─── PREFER-IN-TAB: lấy token bằng cách fetch HTML FB CÙNG-ORIGIN TRONG tab FB user đang mở (executeScript) ───
// AN TOÀN CHECKPOINT: KHÔNG fetch FB từ service worker. Chỉ chạy khi có tab adsmanager/business/www FB (đường an
// toàn nhất — request có origin/cookie/sec-fetch thật của tab). Không có tab/không lấy được → trả noTab:true (KHÔNG còn fallback SW).
let _tabTokenInflight = null;
async function fetchFbTokenInTab() {
  if (_tabTokenInflight) return _tabTokenInflight;
  _tabTokenInflight = (async () => {
    const _blk = await gateBlockMsg();
    if (_blk) return { token: null, fbdt: '', time: 0, blocked: _blk };
    const order = ['adsmanager.facebook.com', 'business.facebook.com', 'www.facebook.com'];
    const tabs = await chrome.tabs.query({ url: ['https://adsmanager.facebook.com/*', 'https://business.facebook.com/*', 'https://www.facebook.com/*', 'https://web.facebook.com/*'] });
    const cand = (tabs || []).filter(t => t.id != null).sort((a, b) => {
      const ia = order.findIndex(o => (a.url || '').includes(o)); const ib = order.findIndex(o => (b.url || '').includes(o));
      return (ia < 0 ? 9 : ia) - (ib < 0 ? 9 : ib);
    });
    for (const tab of cand) {
      const host = order.find(o => (tab.url || '').includes(o)) || 'www.facebook.com';
      // fetch CÙNG ORIGIN với tab (tránh CORS cross-subdomain) → đọc được HTML có token
      const fetchUrl = host === 'business.facebook.com' ? 'https://business.facebook.com/'
        : host === 'adsmanager.facebook.com' ? 'https://adsmanager.facebook.com/adsmanager/manage/campaigns'
          : 'https://www.facebook.com/adsmanager/manage/campaigns';
      try {
        const inj = await chrome.scripting.executeScript({
          target: { tabId: tab.id }, world: 'ISOLATED', args: [fetchUrl],
          func: async (u) => { try { const r = await fetch(u, { credentials: 'include', redirect: 'follow' }); if (!r.ok) return null; return await r.text(); } catch (e) { return null; } },
        });
        const html = inj && inj[0] && inj[0].result;
        if (!html) continue;
        let token = null;
        const m1 = html.match(/window\.__accessToken="([^"]+)"/); if (m1) token = m1[1];
        if (!token) { const m3 = html.match(/"access_token":"(EAA[^"]+)"/); if (m3) token = m3[1]; }
        if (!token) { const m4 = html.match(/EAA[A-Za-z0-9]{0,4}[A-Za-z0-9_-]{20,}/); if (m4) token = m4[0]; }
        if (token && token.length > 20 && token !== 'NO') {
          let fbdt = '';
          const d1 = html.match(/"DTSGInitialData",\[\],\{"token":"([^"]+)"/); if (d1) fbdt = d1[1];
          else { const d2 = html.match(/name="fb_dtsg" value="([^"]+)"/); if (d2) fbdt = d2[1]; }
          await chrome.storage.local.set({ fb_token: token, fb_token_time: Date.now(), ...(fbdt ? { fb_fbdt: fbdt } : {}) });
          return { token, fbdt, time: Date.now() };
        }
      } catch (e) { /* tab này không lấy được → thử tab kế */ }
    }
    return { token: null, fbdt: '', time: 0, noTab: true };
  })();
  try { return await _tabTokenInflight; }
  finally { _tabTokenInflight = null; }
}

// Đọc c_user (ID tài khoản FB đang đăng nhập) từ tab FB — RẺ (chỉ đọc document.cookie, không network).
// Dùng để phát hiện user ĐỔI SANG FB KHÁC → token cache 12h thành sai → phải lấy token tươi.
// c_user KHÔNG httpOnly nên đọc được. An toàn checkpoint: không gọi API FB.
async function readFbCUser() {
  try {
    const tabs = await chrome.tabs.query({ url: ['https://adsmanager.facebook.com/*', 'https://business.facebook.com/*', 'https://www.facebook.com/*', 'https://web.facebook.com/*'] });
    for (const tab of (tabs || [])) {
      if (tab.id == null) continue;
      try {
        const inj = await chrome.scripting.executeScript({
          target: { tabId: tab.id }, world: 'ISOLATED',
          func: () => { const m = document.cookie.match(/c_user=(\d+)/); return m ? m[1] : null; },
        });
        const cu = inj && inj[0] && inj[0].result;
        if (cu) return cu;
      } catch (e) { /* tab này không đọc được → thử tab kế */ }
    }
  } catch (e) { /* ignore */ }
  return null;
}

// FB Graph proxy — DÙNG CHUNG cho external (dashboard) + internal (content script sidebar.js/overlay).
// Trước đây FB_FETCH CHỈ đăng ở onMessageExternal → sidebar.js gọi qua onMessage bị "no response" (đổi tên TK lỗi).
function handleFbFetch(request, sendResponse) {
  const { url, method = 'GET', body, headers: extraHeaders, credentials: credOverride } = request;
  if (!url) { sendResponse(JSON.stringify({ error: 'no_url' })); return true; }
  let urlOk = false;
  try {
    const h = new URL(url).hostname;
    urlOk = ['graph.facebook.com', 'adsmanager.facebook.com', 'adsmanager-graph.facebook.com', 'business.facebook.com', 'www.facebook.com']
      .some(d => h === d || h.endsWith('.' + d));
  } catch {}
  if (!urlOk) { sendResponse(JSON.stringify({ error: 'url_not_allowed' })); return true; }
  const opts = { method, credentials: credOverride || 'include' };
  if (body && method !== 'GET') {
    if (typeof body === 'string') { opts.body = body; opts.headers = { 'Content-Type': 'application/x-www-form-urlencoded' }; }
    else { opts.body = JSON.stringify(body); }
  }
  if (extraHeaders && typeof extraHeaders === 'object') { opts.headers = { ...(opts.headers || {}), ...extraHeaders }; }
  gateBlockMsg().then(blk => {
    if (blk) { sendResponse(JSON.stringify({ error: blk })); return; }
    fetch(url, opts).then(r => r.text()).then(text => sendResponse(text)).catch(err => sendResponse(JSON.stringify({ error: err.message })));
  });
  return true;
}

// External messages from dashboard (externally_connectable)
chrome.runtime.onMessageExternal.addListener((request, sender, sendResponse) => {
  // Validate sender origin
  const origin = sender.origin || '';
  const allowedOrigins = ['https://adsmeta.io', 'https://www.adsmeta.io', 'https://v2.adsmeta.io', 'http://localhost:5173', 'http://127.0.0.1:5173'];
  if (!allowedOrigins.includes(origin)) {
    sendResponse({ error: 'forbidden' });
    return true;
  }

  if (request?.type === 'PING') {
    sendResponse({ ok: true, version: chrome.runtime.getManifest().version });
    return true;
  }

  // Dashboard hỏi trạng thái Kill Switch / Version Gate (để hiện banner "bảo trì" / "cập nhật").
  if (request?.type === 'GET_EXT_CONFIG') {
    getRemoteConfig().then(cfg => {
      const version = chrome.runtime.getManifest().version;
      const needUpdate = !!(cfg?.minVersion && cmpVer(version, cfg.minVersion) < 0);
      sendResponse({ ok: true, killSwitch: !!cfg?.killSwitch, killMsg: cfg?.killMsg || '', needUpdate, minVersion: cfg?.minVersion || '', version, spotlight: Array.isArray(cfg?.spotlight) ? cfg.spotlight : [] });
    });
    return true;
  }

  // [AN TOÀN CHECKPOINT] Chạy GraphQL nhóm TRONG tab facebook.com thật (origin/sec-fetch thật, không spoof).
  // TỰ CHỮA: dùng chrome.scripting.executeScript chạy fetch THẲNG trong tab → KHÔNG phụ thuộc content script
  // (khỏi lỗi "Receiving end does not exist" sau khi reload ext, user KHÔNG phải F5 tab Facebook).
  // Cần ≥1 tab www.facebook.com đang mở; không có → trả 'no_fb_tab' để dashboard mời user mở FB.
  if (request?.type === 'GQL_IN_TAB') {
    const { url, method = 'POST', body, headers } = request;
    gateBlockMsg().then(async (blk) => {
      if (blk) { sendResponse(JSON.stringify({ error: blk })); return; }
      try {
        const tabs = await chrome.tabs.query({ url: ['https://www.facebook.com/*', 'https://web.facebook.com/*'] });
        const tab = (tabs || []).find(t => t.id != null);
        if (!tab) { sendResponse(JSON.stringify({ error: 'no_fb_tab' })); return; }
        const inj = await chrome.scripting.executeScript({
          target: { tabId: tab.id },
          world: 'ISOLATED',                 // cùng origin facebook.com + cookie phiên thật (credentials:'include')
          args: [url, method, body || '', headers || {}],
          func: async (u, m, b, h) => {
            try {
              const r = await fetch(u, { method: m, credentials: 'include', headers: h, body: m !== 'GET' ? b : undefined });
              return { ok: true, data: await r.text() };
            } catch (e) { return { ok: false, error: String((e && e.message) || e) }; }
          },
        });
        const res = inj && inj[0] && inj[0].result;
        if (res && res.ok) sendResponse(res.data);
        else sendResponse(JSON.stringify({ error: (res && res.error) || chrome.runtime.lastError?.message || 'tab_fetch_failed' }));
      } catch (e) {
        sendResponse(JSON.stringify({ error: String((e && e.message) || e) }));
      }
    });
    return true;
  }

  // Dashboard asks for FB token — SW auto-fetches from Facebook if not cached
  if (request?.type === 'GET_FB_TOKEN') {
    const TOKEN_MAX_AGE = 12 * 60 * 60 * 1000; // 12 hours
    chrome.storage.local.get(['fb_token', 'fb_token_time', 'fb_fbdt', 'fb_cuser'], async (items) => {
      const age = Date.now() - (items.fb_token_time || 0);
      // [FIX ĐỔI FB] Kiểm tra RẺ tài khoản FB HIỆN TẠI (c_user). Nếu khác lúc chộp token cũ
      // (hoặc chưa lưu baseline) → coi như đã đổi tài khoản → BỎ cache, lấy token tươi của con MỚI.
      const curCUser = await readFbCUser();
      const switched = !!curCUser && items.fb_cuser !== curCUser;
      if (items.fb_token && age < TOKEN_MAX_AGE && !switched) {
        sendResponse({ token: items.fb_token, fbdt: items.fb_fbdt || '', time: items.fb_token_time });
        return;
      }
      // Đổi acc HOẶC cache-miss → ưu tiên lấy token TRONG tab FB user đang mở (executeScript, an toàn nhất).
      // Không có tab / không lấy được → FALLBACK SW-fetch FB nền (đã khôi phục theo yêu cầu).
      let r = await fetchFbTokenInTab();
      if (!r?.token) r = await fetchFbTokenFromSW();
      if (r?.token && curCUser) { try { await chrome.storage.local.set({ fb_cuser: curCUser }); } catch (e) {} }
      sendResponse({ token: r?.token || null, fbdt: r?.fbdt || '', time: r?.time || 0, noTab: !r?.token });
    });
    return true;
  }

  if (request?.type === 'CLEAR_FB_TOKEN') {
    chrome.storage.local.remove(['fb_token', 'fb_token_time', 'fb_fbdt'], () => {
      sendResponse({ ok: true });
    });
    return true;
  }

  // [ĐÃ GỠ] GET/SET_AUTOMATION_ENABLED — automation nền đã bỏ (xem ghi chú ở trên).
  // [ĐÃ GỠ 2026-06-29] khối route-qua-business-tab (type===' ') — dead code không bao giờ trùng type, đã xóa.

  // FB Graph API proxy — service worker fetches directly using access_token in URL.
  if (request?.type === 'FB_FETCH') return handleFbFetch(request, sendResponse);

  // Upload ảnh lên upload.facebook.com (multipart). File gửi dạng base64 → dựng Blob trong SW.
  if (request?.type === 'FB_UPLOAD_PHOTO') {
    const { url, fields, file } = request;
    if (!url || !file?.base64) { sendResponse(JSON.stringify({ error: 'bad_upload_args' })); return true; }
    let h = '';
    try { h = new URL(url).hostname; } catch {}
    if (h !== 'upload.facebook.com') { sendResponse(JSON.stringify({ error: 'url_not_allowed' })); return true; }
    (async () => {
      try {
        const blk = await gateBlockMsg();
        if (blk) { sendResponse(JSON.stringify({ error: blk })); return; }
        const bin = atob(file.base64);
        const bytes = new Uint8Array(bin.length);
        for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
        const blob = new Blob([bytes], { type: file.mime || 'image/jpeg' });
        const fd = new FormData();
        for (const k in (fields || {})) fd.append(k, fields[k]);
        fd.append('farr', blob, file.name || 'photo.jpg');
        const r = await fetch(url, { method: 'POST', credentials: 'include', body: fd });
        sendResponse(await r.text());
      } catch (err) {
        sendResponse(JSON.stringify({ error: err?.message || 'upload_failed' }));
      }
    })();
    return true;
  }

  // Dashboard pushes JWT when user logs in / logs out
  if (request?.type === 'SMETA_JWT') {
    const jwt = request.jwt;
    if (jwt && typeof jwt === 'string' && jwt.length < 2048) {
      jwtStore.set(jwt).then(async () => {
        chrome.alarms.create(POLL_ALARM, { periodInMinutes: 5 });
        pollSmetaNotifications();
        try {
          chrome.storage.local.remove(['smeta_promo', 'smeta_promo_t']);   // user mới → lấy lại bucket
          const me = await smetaFetch('/auth/me', jwt);
          if (me?.plan) chrome.storage.local.set({ smeta_plan: me.plan, smeta_plan_expiry: me.planExpiry || null });
        } catch {}
        sendResponse({ ok: true });
      });
    } else {
      jwtStore.remove().then(() => {
        chrome.storage.local.remove(['smeta_notifs', 'smeta_seen_ids', 'smeta_plan', 'smeta_plan_expiry']);
        chrome.alarms.clear(POLL_ALARM);
        sendResponse({ ok: true });
      });
    }
    return true;
  }

  if (request?.type === 'SMETA_LOGOUT') {
    jwtStore.remove().then(() => {
      chrome.storage.local.remove(['smeta_notifs', 'smeta_seen_ids', 'smeta_plan', 'smeta_plan_expiry']);
      chrome.alarms.clear(POLL_ALARM);
      sendResponse({ ok: true });
    });
    return true;
  }

  // Limited fetch proxy for dashboard — credentials always omitted (access_token in URL)
  // adsmanager/business: needs cookies to extract token from HTML
  // graph.facebook.com: uses access_token param, no cookies needed
  if (request?.url) {
    const EXTERNAL_ALLOWED = [
      'adsmanager.facebook.com',
      'business.facebook.com',
      'graph.facebook.com',
      'www.facebook.com',
    ];
    let urlHostOk = false;
    try {
      const { hostname } = new URL(request.url);
      urlHostOk = EXTERNAL_ALLOWED.some(h => hostname === h || hostname.endsWith('.' + h));
    } catch {}
    if (!urlHostOk) {
      sendResponse(JSON.stringify({ error: 'url_not_allowed' }));
      return true;
    }
    // Build options but override credentials based on host
    const opts = buildFetchOptions(request);
    // graph.facebook.com uses access_token in URL — never send cookies from external context
    try {
      const { hostname } = new URL(request.url);
      if (hostname === 'graph.facebook.com' || hostname.endsWith('.graph.facebook.com')) {
        opts.credentials = 'omit';
      }
    } catch {}
    gateBlockMsg().then(blk => {
      if (blk) { sendResponse(JSON.stringify({ error: blk })); return; }
      fetch(request.url, opts)
        .then(async r => sendResponse(await r.text()))
        .catch(err => sendResponse(JSON.stringify({ error: err.message })));
    });
    return true;
  }

  sendResponse({ error: 'not_allowed' });
  return true;
});

// Internal messages from popup / content scripts
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (!request) return;   // guard null → tránh throw ở các request.type bên dưới
  // FB Graph proxy cho content script nội bộ (sidebar.js đổi tên TK…) — dùng chung hàm với onMessageExternal.
  if (request.type === 'FB_FETCH') return handleFbFetch(request, sendResponse);
  if (request.type === 'FETCH') {
    fetch(request.url, buildFetchOptions(request))
      .then(r => r.text())
      .then(text => sendResponse({ ok: true, data: text }))
      .catch(err => sendResponse({ ok: false, error: err.message }));
    return true;
  }
  if (request.type === 'PING') {
    sendResponse({ ok: true, version: chrome.runtime.getManifest().version });
    return true;
  }
  // Overlay đẩy số liệu TKQC (balance/threshold) lên DB AdsMeta → cron cảnh báo ngưỡng/Telegram.
  // CHỈ dùng data overlay ĐÃ fetch từ FB (KHÔNG gọi FB thêm). Cần JWT (user đã đăng nhập AdsMeta).
  if (request.type === 'SYNC_FBDATA') {
    (async () => {
      try {
        const jwt = await jwtStore.get();
        if (jwt && request.account) {
          await smetaFetch('/sync/fb-data', jwt, { method: 'POST', body: JSON.stringify({ accounts: [request.account] }) });
        }
      } catch {}
      sendResponse({ ok: true });
    })();
    return true;
  }
  // Content script (overlay/sidebar) asks SW for FB token — SW can fetch adsmanager
  // cross-origin with cookies (no CORS), so this works on any *.facebook.com page.
  if (request.type === 'SW_GET_FB_TOKEN') {
    const TOKEN_MAX_AGE = 12 * 60 * 60 * 1000; // 12h
    chrome.storage.local.get(['fb_token', 'fb_token_time', 'fb_fbdt', 'fb_cuser'], async (items) => {
      const age = Date.now() - (items.fb_token_time || 0);
      // [FIX ĐỔI FB] c_user đổi → bỏ cache, lấy token con mới (xem GET_FB_TOKEN).
      const curCUser = await readFbCUser();
      const switched = !!curCUser && items.fb_cuser !== curCUser;
      if (items.fb_token && age < TOKEN_MAX_AGE && !switched) {
        sendResponse({ token: items.fb_token, fbdt: items.fb_fbdt || '' });
        return;
      }
      // Cache-miss / đổi acc → ưu tiên in-tab (executeScript). Không có tab → FALLBACK SW-fetch FB nền (đã khôi phục).
      let r = await fetchFbTokenInTab();
      if (!r?.token) r = await fetchFbTokenFromSW();
      if (r?.token && curCUser) { try { await chrome.storage.local.set({ fb_cuser: curCUser }); } catch (e) {} }
      sendResponse({ token: r?.token || null, fbdt: r?.fbdt || '', noTab: !r?.token });
    });
    return true;
  }
  if (request.type === 'SMETA_GET_NOTIFS') {
    Promise.all([
      chrome.storage.local.get('smeta_notifs'),
      jwtStore.get(),
    ]).then(([items, jwt]) => {
      sendResponse({ notifs: items.smeta_notifs || [], hasJwt: !!jwt });
    });
    return true;
  }
  if (request.type === 'SMETA_GET_PLAN') {
    chrome.storage.local.get(['smeta_plan', 'smeta_plan_expiry'], async items => {
      if (items.smeta_plan) {
        sendResponse({ ok: true, plan: items.smeta_plan, planExpiry: items.smeta_plan_expiry });
        return;
      }
      // Fallback: fetch live if not cached
      const jwt = await jwtStore.get();
      if (!jwt) { sendResponse({ ok: false }); return; }
      try {
        const data = await smetaFetch('/auth/me', jwt);
        if (data?.plan) chrome.storage.local.set({ smeta_plan: data.plan, smeta_plan_expiry: data.planExpiry || null });
        sendResponse({ ok: true, plan: data.plan, planExpiry: data.planExpiry });
      } catch { sendResponse({ ok: false }); }
    });
    return true;
  }
  // Bucket khuyến mãi (free/vepro/pro/allbought) + số ngày còn hoàn 69k — server MÌNH tính, KHÔNG chạm FB.
  // Cache 30' (giảm tải: gọi mỗi lần mở tab FB) — bucket đổi chậm, refundDaysLeft theo ngày nên 30' trễ không sao.
  if (request.type === 'SMETA_GET_PROMO') {
    (async () => {
      try {
        const c = await chrome.storage.local.get(['smeta_promo', 'smeta_promo_t']);
        if (c.smeta_promo && Date.now() - (c.smeta_promo_t || 0) < 30 * 60 * 1000) { sendResponse(c.smeta_promo); return; }
        const jwt = await jwtStore.get();
        if (!jwt) { sendResponse({ ok: false }); return; }
        const data = await smetaFetch('/ext/promo-context', jwt);
        const resp = { ok: true, bucket: data?.bucket || null, refundDaysLeft: data?.refundDaysLeft || 0, isTeamMember: !!data?.isTeamMember };
        chrome.storage.local.set({ smeta_promo: resp, smeta_promo_t: Date.now() });
        sendResponse(resp);
      } catch { sendResponse({ ok: false }); }
    })();
    return true;
  }
  // Log hành vi spotlight (impression/click/dismiss) — endpoint public, gọi server MÌNH (không FB, fire-and-forget)
  if (request.type === 'SMETA_SPOTLIGHT_EVENT') {
    try {
      fetch(`${SMETA_API}/ext/spotlight-event`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request.event || {}),
      }).catch(() => {});
    } catch {}
    return false;  // fire-and-forget, không cần response
  }
  if (request.type === 'SMETA_LOGIN') {
    const { email, password } = request;
    fetch(`${SMETA_API}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    }).then(async r => {
      if (!r.ok) { sendResponse({ ok: false, error: 'Sai email hoặc mật khẩu' }); return; }
      const data = await r.json();
      const jwt = data.token;
      if (!jwt) { sendResponse({ ok: false, error: 'Không lấy được token' }); return; }
      jwtStore.set(jwt).then(async () => {
        chrome.alarms.create(POLL_ALARM, { periodInMinutes: 5 });
        pollSmetaNotifications();
        try {
          chrome.storage.local.remove(['smeta_promo', 'smeta_promo_t']);   // user mới → lấy lại bucket
          const me = await smetaFetch('/auth/me', jwt);
          if (me?.plan) chrome.storage.local.set({ smeta_plan: me.plan, smeta_plan_expiry: me.planExpiry || null });
        } catch {}
        sendResponse({ ok: true });
      });
    }).catch(() => sendResponse({ ok: false, error: 'Lỗi kết nối' }));
    return true;
  }
  if (request.type === 'SMETA_LOGOUT') {
    jwtStore.remove().then(() => {
      // Xoá cả plan + promo cache → đổi tài khoản không thấy nhầm gói/bucket của người trước
      chrome.storage.local.remove(['smeta_notifs', 'smeta_seen_ids', 'smeta_plan', 'smeta_plan_expiry', 'smeta_promo', 'smeta_promo_t']);
      chrome.alarms.clear(POLL_ALARM);
      sendResponse({ ok: true });
    });
    return true;
  }
  if (request.type === 'SMETA_MARK_READ') {
    jwtStore.get().then(async (smeta_jwt) => {
      if (smeta_jwt) {
        await smetaFetch(`/notifications/${request.id}/read`, smeta_jwt, { method: 'PUT' });
        await pollSmetaNotifications();
      }
      sendResponse({ ok: true });
    });
    return true;
  }
  if (request.type === 'SMETA_MARK_ALL_READ') {
    jwtStore.get().then(async (smeta_jwt) => {
      if (smeta_jwt) {
        await smetaFetch('/notifications/read-all', smeta_jwt, { method: 'PUT' });
        await pollSmetaNotifications();
      }
      sendResponse({ ok: true });
    });
    return true;
  }
  if (request.type === 'SMETA_REFRESH') {
    pollSmetaNotifications().then(() => sendResponse({ ok: true }));
    return true;
  }
  if (request.type === 'SMETA_SUBMIT_RATING') {
    jwtStore.get().then(async (smeta_jwt) => {
      if (!smeta_jwt) { sendResponse({ ok: false, error: 'Chưa đăng nhập' }); return; }
      try {
        const data = await smetaFetch('/rating', smeta_jwt, {
          method: 'POST',
          body: JSON.stringify({ stars: request.stars, comment: request.comment || '', source: 'extension' }),
        });
        sendResponse({ ok: true, data: data || {}, rewarded: data?.rewarded, rewardAmount: data?.rewardAmount });
      } catch (e) {
        sendResponse({ ok: false, error: e.message });
      }
    });
    return true;
  }
  if (request.type === 'SMETA_CWS_CLICK') {
    jwtStore.get().then(async (smeta_jwt) => {
      if (smeta_jwt) await smetaFetch('/rating/cws-click', smeta_jwt, { method: 'POST', body: '{}' });
      sendResponse({ ok: true });
    });
    return true;
  }
  if (request.type === 'SMETA_GET_RATING') {
    jwtStore.get().then(async (smeta_jwt) => {
      if (!smeta_jwt) { sendResponse({ ok: false }); return; }
      try {
        const data = await smetaFetch('/rating/mine', smeta_jwt);
        sendResponse({ ok: true, rating: data?.rating || null });
      } catch { sendResponse({ ok: false }); }
    });
    return true;
  }
});
