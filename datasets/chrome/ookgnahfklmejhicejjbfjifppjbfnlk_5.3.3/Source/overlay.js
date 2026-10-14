// AdsMeta Overlay — Realtime card on Facebook Ads Manager toolbar
'use strict';

const GRAPH    = 'https://graph.facebook.com/v19.0';
const NO_CENTS = new Set(['VND','BILL','CLP','COP','CRC','HUF','ISK','IDR','JPY','KRW','PYG','TWD']);

// Ký hiệu tiền tệ thay cho mã ISO. Nhóm "$" dùng tiền tố phân biệt (MX$, A$, C$…) tránh trùng USD.
const CUR_SYMBOL = {
  USD:'$', EUR:'€', GBP:'£', JPY:'¥', CNY:'¥', CHF:'CHF',
  VND:'₫', THB:'฿', KRW:'₩', INR:'₹', PHP:'₱', IDR:'Rp', MYR:'RM',
  TWD:'NT$', HKD:'HK$', SGD:'S$', AUD:'A$', CAD:'C$', NZD:'NZ$',
  BRL:'R$', MXN:'MX$', ARS:'AR$', COP:'COL$', CLP:'CLP$',
  TRY:'₺', RUB:'₽', ILS:'₪', UAH:'₴', NGN:'₦', ZAR:'R',
  PLN:'zł', SEK:'kr', NOK:'kr', DKK:'kr', ISK:'kr', CZK:'Kč',
  HUF:'Ft', RON:'lei', BGN:'лв', PEN:'S/', CRC:'₡', PYG:'₲',
  AED:'AED', SAR:'SAR', EGP:'E£', BDT:'৳', LKR:'Rs',
};
function curSym(c) { return c === 'BILL' ? '₫' : (CUR_SYMBOL[c] || c); }

const OVL_LBL = {
  VI: { bal:'Dư nợ',   balPre:'Số dư',  thr:'Ngưỡng', acc:'Loại', prepaid:'Trả trước', updated:'Đồng bộ:' },
  EN: { bal:'Balance', balPre:'Balance', thr:'Threshold', acc:'Type', prepaid:'Prepaid', updated:'Synced:' },
  ZH: { bal:'余额',    thr:'阈值',       updated:'更新:'     },
  JA: { bal:'残高',    thr:'しきい値',   updated:'更新:'     },
  KO: { bal:'잔액',    thr:'임계값',     updated:'업데이트:' },
  TH: { bal:'ยอดเงิน', thr:'เกณฑ์',     updated:'อัปเดต:'  },
  ID: { bal:'Saldo',   thr:'Ambang',     updated:'Diperbarui:'},
  MS: { bal:'Baki',    thr:'Ambang',     updated:'Dikemaskini:'},
  AR: { bal:'الرصيد',  thr:'الحد',      updated:'تحديث:'    },
};

function applyLang(lang) {
  const t  = OVL_LBL[lang] || OVL_LBL.VI;
  const el = id => document.getElementById(id);
  if (el('smRtBalLbl')) el('smRtBalLbl').textContent = t.bal;
  if (el('smRtThrLbl')) el('smRtThrLbl').textContent = t.thr;
  if (el('smRtUpdLbl')) el('smRtUpdLbl').textContent = t.updated;
  // Render lại theo loại TK (nhãn Dư nợ/Số dư, Ngưỡng/Loại) nếu đã có data
  if (typeof _s !== 'undefined' && _s && _s.data) updateCard(_s.data);
}

let _s = { actId: null, token: null, data: null, lastUpdate: null, timer: null, rates: null, ratesTime: 0, bill: null };

// Tỷ giá BÁN + %biên user đặt ở adsmeta.io (bridge amsbridge.js đẩy vào chrome.storage) — cho chế độ VND* (báo khách)
function loadBill() {
  try { chrome.storage.local.get(['_ams_bill'], r => { if (r && r._ams_bill) { _s.bill = r._ams_bill; if (typeof _s !== 'undefined' && _s.data) updateCard(_s.data); try { scheduleConvert(); } catch {} } }); } catch {}
}
try { chrome.storage.onChanged.addListener((ch, area) => { if (area === 'local' && ch._ams_bill) { _s.bill = ch._ams_bill.newValue || null; if (_s.data) updateCard(_s.data); try { scheduleConvert(); } catch {} } }); } catch {}
// Quy 1 khoản (đơn vị CHÍNH của nativeCur) → VND BÁO KHÁCH: VND ×(1+%biên); ngoại tệ ×tỷ giá bán (fallback tỷ giá live)
function billVnd(nativeMajor, nativeCur) {
  const b = _s.bill || {};
  if (nativeCur === 'VND') return Math.round(nativeMajor * (1 + (Number(b.vndMarkup) || 0) / 100));
  let sell = nativeCur === 'USD' ? Number(b.customUsdRate) : Number(b.sellRates && b.sellRates[nativeCur]);
  if (!sell && _s.rates && _s.rates.VND && _s.rates[nativeCur]) sell = _s.rates.VND / _s.rates[nativeCur]; // fallback VND/đơn-vị từ live (tiền KHÔNG có tỷ giá → bỏ, không coi như USD)
  if (!sell) return null;
  return Math.round(nativeMajor * sell);
}

// ─── Formatting ───────────────────────────────────────────────────────────────
function getDispCur(nativeCur) {
  const pref = localStorage.getItem('_adsmeta_curr') || 'default';
  return pref === 'default' ? nativeCur : pref;
}

function toMajor(raw, cur, useRound) {
  const n = Number(raw) || 0;
  if (useRound) return Math.round(n);
  return NO_CENTS.has(cur) ? Math.round(n) : n / 100;
}

function fmtVal(v, cur) {
  const n = Number(v);
  const sym = curSym(cur);
  if (NO_CENTS.has(cur)) return Math.round(n).toLocaleString('vi-VN') + sym;   // ký hiệu LIỀN số như web
  // vi-VN: chấm ngăn nghìn, phẩy thập phân → "19.212,62". Số nguyên thì bỏ ",00" → "15.000"
  const hasFrac = Math.round(n * 100) % 100 !== 0;
  return n.toLocaleString('vi-VN', { minimumFractionDigits: hasFrac ? 2 : 0, maximumFractionDigits: 2 }) + sym;
}

function getActId() {
  const p = new URLSearchParams(location.search);
  return p.get('act') || p.get('asset_id') || p.get('payment_account_id') || '';
}

function fmtTime(d) {
  if (!d) return '—';
  const pad = n => String(n).padStart(2, '0');
  return `${pad(d.getDate())}/${pad(d.getMonth()+1)}/${d.getFullYear()} ${d.toLocaleTimeString('vi-VN', { hour:'2-digit', minute:'2-digit', second:'2-digit', hour12: false })}`;
}

// ─── Fetch ────────────────────────────────────────────────────────────────────
// Direct fetch from content script context — carries FB session cookies to graph.facebook.com
function directFetch(url) {
  return fetch(url, {
    credentials: 'include',
    headers: { 'Referer': 'https://business.facebook.com/adsmanager/manage/accounts' },
  }).then(r => r.json());
}

// Background fetch (for non-FB URLs like fx-rates)
function bgFetch(url) {
  return new Promise((res, rej) => {
    chrome.runtime.sendMessage({ type: 'FETCH', url }, r => {
      if (chrome.runtime.lastError) return rej(new Error(chrome.runtime.lastError.message));
      if (r?.ok) { try { res(JSON.parse(r.data)); } catch { rej(new Error('parse')); } }
      else rej(new Error(r?.error || 'fail'));
    });
  });
}

function getFreshToken() {
  const html = document.documentElement.outerHTML;
  const m = html.match(/"(EAA[A-Za-z0-9_-]{20,})"/);
  return m ? m[1] : null;
}

async function fetchData(actId, token) {
  return directFetch(`${GRAPH}/act_${actId}?fields=balance,currency,account_currency_ratio_to_usd,adtrust_dsl,is_prepay_account,adspaymentcycle{threshold_amount}&access_token=${token}`);
}

async function fetchRates() {
  if (_s.rates && Date.now() - _s.ratesTime < 3600000) return;
  try {
    // Backend: { VND:1, USD:25490, ... } — 1 unit = X VND → convert to 1 USD = X other
    const r = await bgFetch('https://adsmeta.io/api/fx-rates');
    if (r && r.USD) {
      const usdVnd = r.USD;
      const rates = { USD: 1, VND: usdVnd };
      for (const [cur, vndPer] of Object.entries(r)) {
        if (cur !== 'VND' && cur !== 'USD' && vndPer > 0) rates[cur] = usdVnd / vndPer;
      }
      _s.rates = rates;
      _s.ratesTime = Date.now();
      scheduleConvert();
    }
  } catch {}
}

// ─── Update card ──────────────────────────────────────────────────────────────
function updateCard(d) {
  const nativeCur = d.currency || 'VND';
  const ratio     = Number(d.account_currency_ratio_to_usd) || 1;
  const dispCur   = getDispCur(nativeCur);
  const needConv  = dispCur !== nativeCur;
  const el        = id => document.getElementById(id);

  function toDisp(raw, useRound) {
    const native = toMajor(raw, nativeCur, useRound);
    if (!needConv) return native;
    if (dispCur === 'BILL') { const bv = billVnd(native, nativeCur); return bv == null ? native : bv; }
    const usd = native / ratio;
    if (dispCur === 'USD') return Math.round(usd * 100) / 100;
    const rate = _s.rates?.[dispCur];
    if (rate) {
      const v = usd * rate;
      return NO_CENTS.has(dispCur) ? Math.round(v) : Math.round(v * 100) / 100;
    }
    return native; // fallback: show native if rates not loaded yet
  }

  function dualHtml(nativeV, useRound, noBill) {
    const nativeMajor = toMajor(nativeV, nativeCur, useRound);
    const natStr = fmtVal(nativeMajor, nativeCur);
    const html   = `<span class="smrt-val-main">${natStr}</span>`;
    if (ratio <= 0) return html;
    if (noBill && dispCur === 'BILL') return html;  // Ngưỡng: chế độ VND* hiện NATIVE, không cộng biên (giống "Ngưỡng còn lại")
    // Badge phụ: target nếu khác native, ngược lại USD (chế độ Default luôn show quy đổi USD).
    // FIX: TK USD + target khác (VND…) trước đây bị return sớm → nay hiện badge quy đổi.
    const secCur = (dispCur && dispCur !== nativeCur) ? dispCur : 'USD';
    if (secCur === nativeCur) return html;  // TK USD + Default → trùng USD, 1 badge
    const secVal = secCur === 'USD'
      ? Math.round(nativeMajor / ratio * 100) / 100
      : toDisp(nativeV, useRound);
    return html + `<span class="smrt-val-usd">${fmtVal(secVal, secCur)}</span>`;
  }

  // Loại TK: trả trước (số dư cạn dần → ads tắt) vs trả sau (dư nợ tăng → chạm ngưỡng → trừ thẻ)
  const isPrepay = !!d.is_prepay_account;
  const lang = localStorage.getItem('_adsmeta_lang') || 'VI';
  const L = OVL_LBL[lang] || OVL_LBL.VI;

  // Balance — nhãn theo loại TK (Dư nợ / Số dư)
  if (el('smRtBalLbl')) el('smRtBalLbl').textContent = isPrepay ? (L.balPre || L.bal) : L.bal;
  if (el('smRtBal')) el('smRtBal').innerHTML = dualHtml(d.balance, false);

  // Ngưỡng: CHỈ lấy adspaymentcycle (ngưỡng billing thật). KHÔNG lùi về adtrust_dsl — đó là hạn mức TÍN DỤNG, khác khái niệm (đối chiếu smeta cũ).
  const cycleAmt = d.adspaymentcycle?.data?.[0]?.threshold_amount;
  let thrHtml, nearThr = false;
  if (isPrepay) {
    // TK trả trước không có ngưỡng thanh toán → hiện loại, không cảnh báo ngưỡng
    if (el('smRtThrLbl')) el('smRtThrLbl').textContent = L.acc || L.thr;
    thrHtml = `<span class="smrt-val-main" style="background:#dbeafe;color:#1d4ed8">${L.prepaid || 'Prepaid'}</span>`;
  } else {
    if (el('smRtThrLbl')) el('smRtThrLbl').textContent = L.thr;
    if (cycleAmt && Number(cycleAmt) > 0) {
      // Cảnh báo: dư nợ ≥ 80% ngưỡng → FB sắp trừ thẻ
      nearThr = Number(d.balance) >= 0.8 * Number(cycleAmt);
      thrHtml = dualHtml(cycleAmt, false, true);  // Ngưỡng KHÔNG cộng biên
    } else {
      thrHtml = `<span class="smrt-val-main">—</span>`;
    }
  }
  if (nearThr) thrHtml = `<span title="Sắp đến ngưỡng thanh toán — Facebook sắp trừ thẻ" style="color:#ef4444;font-weight:700">⚠️ ${thrHtml}</span>`;
  if (el('smRtThr')) el('smRtThr').innerHTML = thrHtml;

  // Cột số TỰ CO theo số dài nhất + thẳng hàng (giống panel lớn): đo width thật 2 dòng rồi cân bằng cả cột
  const _bar = document.getElementById('adsmeta-rt-bar');
  if (_bar) ['smrt-val-main', 'smrt-val-usd'].forEach(cls => {
    const els = _bar.querySelectorAll('.' + cls); if (els.length < 2) return;
    let mx = 0;
    els.forEach(e => { e.style.minWidth = ''; const w = Math.ceil(e.getBoundingClientRect().width); if (w > mx) mx = w; });
    if (mx > 0) els.forEach(e => { e.style.minWidth = mx + 'px'; });
  });

  if (el('smRtTime')) el('smRtTime').textContent = fmtTime(_s.lastUpdate);
}

// Đẩy số liệu TKQC (balance/ngưỡng native) lên DB AdsMeta qua background (dùng JWT có sẵn).
// CHỈ dùng data overlay ĐÃ fetch từ FB — KHÔNG gọi FB thêm. Để cron cảnh báo ngưỡng/Telegram dù user rời trang.
function syncToDb(actId, d) {
  try {
    const cur      = d.currency || 'VND';
    const balance  = toMajor(d.balance, cur, false);
    // Ngưỡng đẩy DB: CHỈ adspaymentcycle (ngưỡng thật). TK trả trước / không có cycle → 0 (không cảnh báo ngưỡng sai).
    const cycleAmt = d.is_prepay_account ? null : d.adspaymentcycle?.data?.[0]?.threshold_amount;
    let threshold  = 0;
    if (cycleAmt && Number(cycleAmt) > 0) threshold = toMajor(cycleAmt, cur, false);
    chrome.runtime.sendMessage(
      { type: 'SYNC_FBDATA', account: { accountId: String(actId), currency: cur, balance, threshold } },
      () => void chrome.runtime.lastError,
    );
  } catch {}
}

// ─── Load data ────────────────────────────────────────────────────────────────
async function loadData(force = false) {
  const actId = getActId();
  if (!actId) return;

  if (!_s.token) {
    // Priority 1: token stored by inject.js (reads window.__accessToken — real user token)
    const stored = await new Promise(r => chrome.storage.local.get(['fb_token','fb_token_time'], r));
    // Hạn 12h — đồng bộ SW + sidebar + dashboard (trước 2h → token 2–12h tuổi bị bỏ qua)
    if (stored.fb_token && stored.fb_token_time && Date.now() - stored.fb_token_time < 43200000)
      _s.token = stored.fb_token;
  }
  if (!_s.token) {
    // Priority 2: fallback to EAA regex on outerHTML
    _s.token = getFreshToken();
  }
  if (!_s.token) return;

  // Pre-fetch exchange rates for any non-USD target (USD only needs the account's USD ratio).
  // VND is NOT excluded: a non-VND account (e.g. MXN) converting TO VND still needs the VND rate.
  const dispPref = localStorage.getItem('_adsmeta_curr') || 'default';
  if (dispPref !== 'default' && dispPref !== 'USD') fetchRates();

  if (!force && _s.actId === actId && _s.data) { updateCard(_s.data); scheduleConvert(); return; }
  _s.actId = actId;

  const bar = document.getElementById('adsmeta-rt-bar');
  if (bar) bar.classList.add('smrt-loading');

  try {
    const d = await fetchData(actId, _s.token);
    if (d.error) {
      if (d.error.code === 190 || d.error.code === 200 || d.error.type === 'OAuthException') _s.token = null;
      return;
    }
    _s.data       = d;
    _s.lastUpdate = new Date();
    updateCard(d);
    syncToDb(actId, d);   // đẩy balance/ngưỡng lên DB AdsMeta (cron cảnh báo Telegram) — KHÔNG gọi FB thêm
    scheduleConvert();
    // Retry after FB finishes its initial React render burst
    setTimeout(() => scheduleConvert(), 1500);
  } catch {}

  if (bar) bar.classList.remove('smrt-loading');
}

// ─── Font: ARIAL (y hệt SMIT) — font có sẵn 100% máy, không tải nên KHÔNG dính CSP billing, đồng nhất mọi trang ──
const FB_FONT = "Arial,Helvetica,sans-serif"
const OVL_BILLING = /\/billing_hub\//.test(location.pathname)   // bill giữ đậm; campaigns bỏ in đậm (đồng bộ panel lớn)

// ─── CSS ──────────────────────────────────────────────────────────────────────
const CSS = `
  @keyframes smrt-spin    { to { transform: rotate(360deg); } }
  @keyframes smrt-pulse   { 0%,100%{opacity:1} 50%{opacity:.35} }
  @keyframes smrt-slide-in {
    from { opacity: 0; transform: translateY(-10px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  #adsmeta-rt-bar {
    position: fixed; z-index: 2147483646;
    background: #fff; border: 1px solid #e5e7eb; border-radius: 14px;
    box-shadow: 0 4px 20px rgba(0,0,0,.12);
    font-family: ${FB_FONT};
    overflow: hidden; min-width: 0; width: max-content; max-width: 340px;
    animation: smrt-slide-in .22s ease;
    transition: border-color .3s ease, box-shadow .3s ease;
    user-select: none;
  }

  /* ── Header ── */
  .smrt-hdr {
    display: flex; align-items: center; justify-content: space-between;
    padding: 4px 9px 4px;
    background: linear-gradient(90deg, #1a4dd4 0%, #1877F2 100%);
    cursor: move;
  }
  .smrt-brand { display: flex; align-items: center; gap: 6px; }
  .smrt-logo-box {
    display: flex; align-items: center; flex-shrink: 0;
  }
  .smrt-brand-name { font-size: 11px; font-weight: 700; color: #fff; letter-spacing: .3px; }
  .smrt-hdr-right { display: flex; align-items: center; gap: 4px; }
  .smrt-tag {
    font-size: 9px; font-weight: 700; color: rgba(255,255,255,.85);
    background: rgba(255,255,255,.15); border-radius: 4px;
    padding: 1px 5px; letter-spacing: .5px; text-transform: uppercase;
  }
  .smrt-reload-btn {
    background: rgba(255,255,255,.15); border: 1.5px solid rgba(255,255,255,.35); cursor: pointer;
    color: rgba(255,255,255,.9); width: 22px; height: 22px;
    display: flex; align-items: center; justify-content: center;
    border-radius: 6px; padding: 0; transition: background .15s, color .15s, border-color .15s;
    flex-shrink: 0;
  }
  .smrt-reload-btn:hover { background: rgba(255,255,255,.28); border-color: rgba(255,255,255,.6); color: #fff; }

  /* ── Body (theo hàng: nhãn trái, giá trị phải) ── */
  .smrt-body {
    display: flex; flex-direction: column; gap: 5px;
    padding: 8px 12px 6px;
  }
  .smrt-row { display: flex; align-items: center; gap: 10px; }
  .smrt-row-lbl {
    font-size: 13px; font-weight: 700; color: #444; white-space: nowrap; min-width: 52px;
  }
  .smrt-row-vals { display: flex; align-items: center; gap: 4px; flex-wrap: nowrap; justify-content: flex-end; margin-left: auto; }
  .smrt-val-main {
    font-size: 14px; font-weight: ${OVL_BILLING ? 500 : 700}; border-radius: 6px;
    padding: 2px 8px; white-space: nowrap; box-sizing: border-box; text-align: right;
    background: #e7f7f0; color: #047857;
  }
  .smrt-val-usd {
    font-size: 14px; font-weight: ${OVL_BILLING ? 500 : 700}; border-radius: 6px;
    padding: 2px 8px; white-space: nowrap; box-sizing: border-box; text-align: right;
    background: #e8f0fe; color: #1d4ed8;
  }

  /* ── Footer ── */
  .smrt-foot {
    padding: 4px 12px 6px;
    border-top: 1px solid #f9fafb;
    display: flex; align-items: center; justify-content: flex-end;
  }
  .smrt-time { font-size: 8.5px; color: #9ca3af; font-weight: 500; font-variant-numeric: tabular-nums; }
  .smrt-upd-lbl { color: #c4c9d4; margin-right: 2px; }

  /* Loading state */
  #adsmeta-rt-bar.smrt-loading .smrt-val-main,
  #adsmeta-rt-bar.smrt-loading .smrt-val-usd {
    animation: smrt-pulse .7s ease-in-out infinite;
  }
  #adsmeta-rt-bar.smrt-loading .smrt-reload-btn svg {
    animation: smrt-spin .6s linear infinite;
  }

  /* Table currency conversion — hide native VND, show converted badge */
  [data-amsb-src="1"] {
    font-size: 0.01em !important;
    color: transparent !important;
    user-select: none !important;
    line-height: 0 !important;
  }

  /* ── Dark mode ── */
  #adsmeta-rt-bar[data-theme="dark"] {
    background: #1e2533;
    border-color: #374151;
    box-shadow: 0 4px 20px rgba(0,0,0,.45);
  }
  #adsmeta-rt-bar[data-theme="dark"] .smrt-row-lbl { color: #9ca3af; }
  #adsmeta-rt-bar[data-theme="dark"] .smrt-val-main { background: #e7f7f0; color: #047857; }
  #adsmeta-rt-bar[data-theme="dark"] .smrt-val-usd { background: #e8f0fe; color: #1d4ed8; }
  #adsmeta-rt-bar[data-theme="dark"] .smrt-foot { border-top-color: #2d3748; }
  #adsmeta-rt-bar[data-theme="dark"] .smrt-time { color: #6b7280; }
  #adsmeta-rt-bar[data-theme="dark"] .smrt-upd-lbl { color: #4b5563; }
`;

const LOGO_SVG = `<div style="display:flex;align-items:center;justify-content:center"><img src="${chrome.runtime.getURL('icons/logo-full.svg')}" height="16" style="width:auto;display:block"></div>`;

// Card chỉ hiện ở: Ads Manager (campaigns/adsets/ads) và billing_hub (accounts/details + payment_settings).
// FB là SPA → kiểm tra runtime để ẩn khi rời sang trang khác.
function amsbAllowed() {
  const p = location.pathname;
  return /\/adsmanager\/manage\/(campaigns|adsets|ads)(\/|$)/.test(p)
      || /\/billing_hub\/(accounts\/details|payment_settings)(\/|$)/.test(p);
}

// ─── Init ─────────────────────────────────────────────────────────────────────
function initCard() {
  if (document.getElementById('adsmeta-rt-bar')) return;

  const style = document.createElement('style');
  style.textContent = CSS;
  document.head.appendChild(style);

  const bar = document.createElement('div');
  bar.id = 'adsmeta-rt-bar';
  bar.innerHTML = `
    <div class="smrt-hdr" style="justify-content:center;position:relative">
      <div style="display:flex;align-items:center;gap:5px">
        <img src="${chrome.runtime.getURL('icons/logo-full.svg')}" height="18" style="width:auto;display:block">
      </div>
      <button id="smRtReload" title="Tải lại số dư (Facebook trả số theo đợt — bấm để lấy mới nhất)"
        style="position:absolute;right:6px;top:50%;transform:translateY(-50%);background:none;border:none;cursor:pointer;padding:2px;line-height:0;color:#9ca3af;opacity:.8"
        onmouseover="this.style.opacity=1" onmouseout="this.style.opacity=.8">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-2.64-6.36"/><path d="M21 3v6h-6"/></svg>
      </button>
    </div>

    <div class="smrt-body">
      <div class="smrt-row">
        <span class="smrt-row-lbl" id="smRtBalLbl">Dư nợ</span>
        <div class="smrt-row-vals" id="smRtBal"><span class="smrt-val-main">—</span></div>
      </div>
      <div class="smrt-row">
        <span class="smrt-row-lbl" id="smRtThrLbl" title="Ngưỡng billing cycle — hạn mức chi tiêu mỗi chu kỳ thanh toán">Ngưỡng</span>
        <div class="smrt-row-vals" id="smRtThr"><span class="smrt-val-main" style="background:#dbeafe;color:#1d4ed8">—</span></div>
      </div>
    </div>

    <div class="smrt-foot">
      <span class="smrt-time">
        <span class="smrt-upd-lbl" id="smRtUpdLbl">Cập nhật:</span>
        <span id="smRtTime">—</span>
      </span>
    </div>`;

  document.body.appendChild(bar);
  if (!amsbAllowed()) bar.style.display = 'none';

  const reloadBtn = document.getElementById('smRtReload');
  if (reloadBtn) reloadBtn.addEventListener('click', e => {
    e.stopPropagation();
    const svg = reloadBtn.querySelector('svg');
    if (svg) { svg.style.transition = 'transform .6s'; svg.style.transform = 'rotate(360deg)'; setTimeout(() => { svg.style.transition = 'none'; svg.style.transform = 'rotate(0deg)'; }, 650); }
    loadData(true);
  });

  // ── Restore saved position or default to toolbar area ──
  const savedPos = (() => { try { return JSON.parse(localStorage.getItem('_adsmeta_rt_pos') || 'null') } catch { return null } })();
  // Giữ card luôn trong viewport (tránh kẹt ngoài màn sau khi thu nhỏ cửa sổ)
  function clampBar() {
    if (!bar.style.left || bar.style.left === 'auto') return;
    const w = bar.offsetWidth, h = bar.offsetHeight;
    let l = parseFloat(bar.style.left) || 0, t = parseFloat(bar.style.top) || 0;
    l = Math.max(8, Math.min(l, window.innerWidth  - w - 8));
    t = Math.max(8, Math.min(t, window.innerHeight - h - 8));
    bar.style.left = l + 'px'; bar.style.top = t + 'px';
  }
  if (savedPos) {
    bar.style.top  = savedPos.top  + 'px';
    bar.style.left = savedPos.left + 'px';
    clampBar();
  } else {
    bar.style.top  = '130px';
    bar.style.right = '16px';
  }
  window.addEventListener('resize', clampBar);

  // ── Drag to move ──
  const hdr = bar.querySelector('.smrt-hdr');
  let dragging = false, ox = 0, oy = 0;
  hdr.addEventListener('mousedown', e => {
    if (e.target.closest('button')) return;
    dragging = true;
    const r = bar.getBoundingClientRect();
    bar.style.right = 'auto';
    bar.style.left  = r.left + 'px';
    bar.style.top   = r.top  + 'px';
    ox = e.clientX - r.left;
    oy = e.clientY - r.top;
    bar.style.transition = 'none';
    e.preventDefault();
  });
  document.addEventListener('mousemove', e => {
    if (!dragging) return;
    const x = Math.max(0, Math.min(e.clientX - ox, window.innerWidth  - bar.offsetWidth));
    const y = Math.max(0, Math.min(e.clientY - oy, window.innerHeight - bar.offsetHeight));
    bar.style.left = x + 'px';
    bar.style.top  = y + 'px';
  });
  document.addEventListener('mouseup', () => {
    if (!dragging) return;
    dragging = false;
    bar.style.transition = '';
    try { localStorage.setItem('_adsmeta_rt_pos', JSON.stringify({ top: parseFloat(bar.style.top), left: parseFloat(bar.style.left) })) } catch {}
  });

  applyLang(localStorage.getItem('_adsmeta_lang') || 'VI');
  applyOverlayTheme(resolveOverlayTheme());
  // CHỐNG CHECKPOINT TUYỆT ĐỐI: chỉ tự gọi FB (loadData) lúc mở trang khi user ĐÃ opt-in —
  // bật realtime HOẶC đã chọn quy đổi tiền. User mặc định (chưa dùng gì) → KHÔNG gọi FB tự động.
  // (Bật realtime → showCard tự loadData; chọn tiền sau → listener _adsmeta_cur_change loadData 1 lần.)
  if (localStorage.getItem('_adsmeta_rt') === '1' || (localStorage.getItem('_adsmeta_curr') || 'default') !== 'default') loadData();
  // Bỏ auto-refresh theo timer (chống checkpoint — extension KHÔNG tự lặp gọi FB).
  // Số cập nhật khi: mở/đổi trang, đổi tài khoản, hoặc user bấm nút Tải lại. Table conversion vẫn chạy qua MutationObserver.
  if (localStorage.getItem('_adsmeta_rt') !== '1') {
    bar.style.display = 'none';
  }

  // Theme change from sidebar → sync bar theme
  window.addEventListener('_adsmeta_theme_change', e => applyOverlayTheme(e.detail));
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if ((localStorage.getItem('_adsmeta_theme') || 'auto') === 'auto') applyOverlayTheme(resolveOverlayTheme());
  });

  // Currency change from sidebar → update card + fetch rates if needed + re-run table conversion
  window.addEventListener('_adsmeta_cur_change', () => {
    fetchRates(); // ensure rates cached for non-USD currencies; no-op if already fresh
    // User vừa CHỌN quy đổi tiền mà chưa có dữ liệu TK (vì lúc mở trang đã gate không fetch) → fetch 1 lần (user chủ động).
    if ((localStorage.getItem('_adsmeta_curr') || 'default') !== 'default' && !_s.data) { loadData(); return; }
    if (_s.data) updateCard(_s.data);
    scheduleConvert();
  });

  // Công tắc "Màu tiền tệ" trong panel → đổi màu chữ tiền tệ quy đổi trong bảng (không cần re-convert)
  window.addEventListener('_adsmeta_curcolor_change', () => {
    const cc = convColor();
    document.querySelectorAll('[data-amsb="1"]').forEach(b => { b.style.color = cc; });
  });

  // SPA navigation — reload when account changes; also re-convert table after renders
  let lastUrl = location.href;
  new MutationObserver(mutations => {
    // URL change → reload data
    if (location.href !== lastUrl) {
      lastUrl = location.href;
      const card = document.getElementById('adsmeta-rt-bar');
      // Show the card only on allowed pages AND when realtime is on (conversion still runs regardless).
      const rtOn = localStorage.getItem('_adsmeta_rt') === '1';
      if (card) card.style.display = (amsbAllowed() && rtOn) ? '' : 'none';
      if (amsbAllowed()) {
        const newAct = getActId();
        if (newAct && newAct !== _s.actId) { _s.actId = newAct; loadData(true); }
      }
    }
    // Re-convert when React re-renders content or removes our badge
    for (const m of mutations) {
      const removed = [...m.removedNodes];
      const added   = [...m.addedNodes];
      // Our badge was removed by React → re-add it
      if (removed.some(n => n.nodeType === 1 && n.dataset?.amsb === '1')) { scheduleConvert(); break; }
      // Non-badge element or text node added → React re-rendered → re-apply conversion
      if (added.some(n => n.nodeType === 3 || (n.nodeType === 1 && !n.dataset?.amsb))) { scheduleConvert(); break; }
    }
  }).observe(document.body, { childList: true, subtree: true });
}

// ─── Table currency conversion ────────────────────────────────────────────────
function parseVNDStr(str) {
  const clean = str.replace(/[đ₫\s]/g, '');
  // Comma-formatted thousands (e.g. "83,739,456")
  if (/,/.test(clean)) return Number(clean.replace(/,/g, '')) || 0;
  const dots = (clean.match(/\./g) || []).length;
  if (dots === 0) return Number(clean) || 0;
  if (dots > 1) return Number(clean.replace(/\./g, '')) || 0;
  const [intPart, fracPart] = clean.split('.');
  if (intPart === '0') return Number(clean) || 0;        // "0.599" → decimal
  if (fracPart?.length === 3) return Number(intPart + fracPart) || 0; // "5.673" → 5673
  return Number(clean) || 0;
}

function getConvFactor() {
  if (!_s.data) return null;
  const nativeCur = _s.data.currency || 'VND';
  const dispCur = localStorage.getItem('_adsmeta_curr') || 'default';
  if (dispCur === 'default' || dispCur === nativeCur) return null;
  if (dispCur === 'BILL') {
    const b = _s.bill || {};
    let factor;
    if (nativeCur === 'VND') factor = 1 + (Number(b.vndMarkup) || 0) / 100;
    else { let sell = nativeCur === 'USD' ? Number(b.customUsdRate) : Number(b.sellRates && b.sellRates[nativeCur]); if (!sell && _s.rates && _s.rates.VND && _s.rates[nativeCur]) sell = _s.rates.VND / _s.rates[nativeCur]; if (!sell) return null; factor = sell; }
    return { factor, cur: 'BILL', nativeCur };
  }
  const ratio = Number(_s.data.account_currency_ratio_to_usd) || 1;
  if (dispCur === 'USD') return { factor: 1 / ratio, cur: 'USD', nativeCur };
  const rate = _s.rates?.[dispCur];
  if (!rate) return null;
  return { factor: rate / ratio, cur: dispCur, nativeCur };
}

function fmtConvVal(amount, factor, cur) {
  // 0 vẫn hiển thị (vd "0 ₫") để đồng bộ khi đang chọn quy đổi — không bỏ qua như giá trị rỗng
  const sym = curSym(cur);
  if (!amount) return '0 ' + sym;
  const v = amount * factor;
  if (v < 0.005) return null;
  // vi-VN: chấm ngăn nghìn, phẩy thập phân. Số nguyên bỏ ",00" → "15.000"
  if (NO_CENTS.has(cur)) return Math.round(v).toLocaleString('vi-VN') + ' ' + sym;
  const hasFrac = Math.round(v * 100) % 100 !== 0;
  return v.toLocaleString('vi-VN', { minimumFractionDigits: hasFrac ? 2 : 0, maximumFractionDigits: 2 }) + ' ' + sym;
}

// Ký hiệu nhiều ký tự / không phải mã ISO (chữ thường, có dấu, kèm $) — FB đặt trước hoặc sau số.
const CUR_SYM = {
  TWD: 'NT$', SEK: 'kr', NOK: 'kr', DKK: 'kr', ISK: 'kr',
  PLN: 'zł', CZK: 'Kč', HUF: 'Ft', RON: 'lei', PEN: 'S/', BGN: 'лв',
  IDR: 'Rp', MYR: 'RM',
  TRY: 'TL',          // FB hiển thị Lira Thổ là "TL" (vd "3.000,00 TL"), không phải ₺/TRY → cần để bảng quy đổi
  ZAR: 'R',           // Rand Nam Phi: FB in "R" (vd "17,00 R") — không phải ZAR
  BRL: 'R$',          // Real Brazil: FB in "R$"
  BDT: '৳',           // Taka Bangladesh: FB in "৳" (vd "6.000,00 ৳") — ký hiệu Bengali, không nằm trong SYM 1 ký tự → cần map riêng để bảng quy đổi
  LKR: 'Rs',          // Rupee Sri Lanka: FB in "Rs" (vd "10.738,00 Rs") — không phải ₨/LKR → cần để bảng quy đổi
};

// Màu chữ tiền tệ quy đổi — bật/tắt qua công tắc "Màu tiền tệ" trong panel (localStorage _adsmeta_curr_color)
const CONV_TEXT_COLOR = '#1877F2';
function convColor() { return localStorage.getItem('_adsmeta_curr_color') !== '0' ? CONV_TEXT_COLOR : 'inherit'; }

function getCellRx(nativeCur) {
  // Số: cho phép . , dấu nháy (CHF "1'234.56") và dấu cách ngăn nghìn (EUR-fr, SEK, PLN: "1 234,56")
  const N = `[\\d.,'’\\s]+`;
  // Ký hiệu 1 ký tự — mở rộng thêm ₺(TRY) ₪(ILS) ₦(NGN) ₡(CRC) ₲(PYG) ₽(RUB) ₴(UAH) ¢
  const SYM = `[$€£¥₩₫฿₱₹₺₪₦₡₲₽₴¢]`;
  if (nativeCur === 'VND') return /^[\d.,\s]+\s*[đ₫]$|^[đ₫]\s*[\d.,\s]+$/;
  const parts = [
    `^${N}\\s*${nativeCur}$`,           // số + mã ISO:        "1 234,56 MXN", "1'234.56 CHF"
    `^${nativeCur}\\s*${N}$`,           // mã ISO + số:        "MXN 1,234.56"
    `^${N}\\s*${SYM}$`,                 // số + ký hiệu:       "1 536,48 €", "1.234,56 ₺"
    `^[A-Za-z]{0,3}${SYM}\\s*${N}$`,    // ký hiệu(+tiền tố) + số: "$1,234", "MX$1,234.56", "₩1,234"
  ];
  const sym = CUR_SYM[nativeCur];
  if (sym) {
    const e = sym.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');   // escape ký tự đặc biệt (vd "$" trong "NT$")
    parts.push(`^${N}\\s*${e}\\.?$`, `^${e}\\.?\\s*${N}$`); // ký hiệu riêng trước/sau, cho phép "kr."/"S/."
  }
  return new RegExp(parts.join('|'), 'i');
}

function parseNativeAmount(str, nativeCur) {
  if (nativeCur === 'VND') return parseVNDStr(str);
  const nums = str.replace(/[^0-9.,]/g, '');
  if (!nums) return 0;
  const periods = (nums.match(/\./g) || []).length;
  const commas  = (nums.match(/,/g)  || []).length;
  // Both separators present (e.g. "1,234.56" or "1.234,56") → the LAST one is the decimal sep.
  if (periods >= 1 && commas >= 1) {
    return nums.lastIndexOf(',') > nums.lastIndexOf('.')
      ? Number(nums.replace(/\./g, '').replace(',', '.')) || 0   // European: 1.234,56 → 1234.56
      : Number(nums.replace(/,/g,  '')) || 0;                    // en-US:    1,234.56 → 1234.56
  }
  if (periods > 1) return Number(nums.replace(/\./g, '')) || 0;  // 1.234.567 → 1234567
  if (commas  > 1) return Number(nums.replace(/,/g,  '')) || 0;  // 1,234,567 → 1234567
  if (periods === 1)
    return nums.split('.')[1].length === 3 ? Number(nums.replace('.', '')) || 0 : Number(nums) || 0;
  if (commas === 1)
    return nums.split(',')[1].length === 3 ? Number(nums.replace(',', '')) || 0 : Number(nums.replace(',', '.')) || 0;
  return Number(nums) || 0;
}

function tagTextNode(node, factor, cur, nativeCur) {
  const text = node.textContent.trim();
  if (!getCellRx(nativeCur).test(text)) return;
  const amount = parseNativeAmount(text, nativeCur);
  if (amount < 0) return;
  const convStr = fmtConvVal(amount, factor, cur);
  if (!convStr) return;

  const parent = node.parentElement;
  if (!parent || !parent.parentNode) return;
  if (parent.matches('[role="cell"],[role="gridcell"],td')) return;

  parent.dataset.amsbSrc = '1';

  const container = parent.parentNode;
  const existingBadge = container.querySelector('[data-amsb="1"]');
  if (existingBadge) {
    if (existingBadge.textContent !== convStr) existingBadge.textContent = convStr;
    return;
  }
  const badge = document.createElement('span');
  badge.dataset.amsb = '1';
  badge.dataset.amsbVnd = String(amount);
  badge.style.cssText = `color:${convColor()};white-space:nowrap;pointer-events:none;`;
  badge.textContent = convStr;
  container.insertBefore(badge, parent.nextSibling);
}

function runConvert() {
  // Never touch the AdsMeta sidebar (#__amsb) — it renders its OWN dual-currency badges.
  // Remove any conversion badge we may have injected into it before this guard existed.
  document.querySelectorAll('#__amsb [data-amsb="1"]').forEach(el => el.remove());
  document.querySelectorAll('#__amsb [data-amsb-src]').forEach(el => delete el.dataset.amsbSrc);

  const conv = getConvFactor();
  if (!conv) {
    document.querySelectorAll('[data-amsb="1"]').forEach(el => el.remove());
    document.querySelectorAll('[data-amsb-src]').forEach(el => delete el.dataset.amsbSrc);
    return;
  }
  const cellRx = getCellRx(conv.nativeCur);

  // 1) Refresh already-tagged badges in place (e.g. currency switch). In-place text update causes
  //    no DOM removal, so it won't trigger the observer loop.
  const cc = convColor();
  document.querySelectorAll('[data-amsb="1"][data-amsb-vnd]').forEach(badge => {
    const amount = Number(badge.dataset.amsbVnd);
    const convStr = fmtConvVal(amount, conv.factor, conv.cur);
    if (convStr && badge.textContent !== convStr) badge.textContent = convStr;
    if (badge.style.color !== cc) badge.style.color = cc;
  });

  // 2) Scan for NEW, untagged currency cells. Always run this — newly rendered rows (lazy-load on
  //    scroll, "Xem thêm", React re-renders) appear after the first pass, so we can't stop once some
  //    badges exist. The walker rejects nodes already inside a tagged cell/badge, so no double-tagging.
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const p = node.parentElement;
      if (!p) return NodeFilter.FILTER_REJECT;
      if (p.closest('[data-amsb="1"],[data-amsb-src],#adsmeta-rt-bar,#__amsb,script,style,noscript,input,textarea,[contenteditable]'))
        return NodeFilter.FILTER_REJECT;
      if (!cellRx.test(node.textContent.trim())) return NodeFilter.FILTER_REJECT;
      // BÁO KHÁCH (VND*): cột NGÂN SÁCH là số user đặt → KHÔNG cộng biên. Bỏ qua ô có "Hàng ngày/Trọn đời/Daily/Lifetime".
      // (1) Kiểm THEO Ô (closest cell) — chắc cho mọi view (Chiến dịch/Nhóm QC/Quảng cáo) khi FB có role=gridcell/td.
      // (2) + Đi lên tối đa 4 cấp DỪNG ở ranh giới hàng — phòng trường hợp FB dựng ô bằng div (không có role).
      if (conv.cur === 'BILL') {
        const BUDGET_RX = /Hàng ng[àa]y|Tr[ọo]n đời|\bDaily\b|\bLifetime\b/i;
        const cell = p.closest('[role="gridcell"],[role="cell"],td');
        if (cell && BUDGET_RX.test(cell.textContent || '')) return NodeFilter.FILTER_REJECT;
        let el = p;
        for (let i = 0; i < 4 && el && !(el.matches && el.matches('[role="row"],tr')); i++) {
          if (BUDGET_RX.test(el.textContent || '')) return NodeFilter.FILTER_REJECT;
          el = el.parentElement;
        }
      }
      return NodeFilter.FILTER_ACCEPT;
    }
  });
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);
  nodes.forEach(n => tagTextNode(n, conv.factor, conv.cur, conv.nativeCur));
}

let _cvTimer = null;
function scheduleConvert() {
  clearTimeout(_cvTimer);
  _cvTimer = setTimeout(runConvert, 400);
}

// ─── Theme ────────────────────────────────────────────────────────────────────
function resolveOverlayTheme() {
  const t = localStorage.getItem('_adsmeta_theme') || 'auto';
  if (t === 'auto') return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  return t;
}
function applyOverlayTheme(resolved) {
  const bar = document.getElementById('adsmeta-rt-bar');
  if (bar) bar.setAttribute('data-theme', resolved);
}

// ─── Show / hide ──────────────────────────────────────────────────────────────
function showCard() {
  const bar = document.getElementById('adsmeta-rt-bar');
  if (bar) {
    bar.style.display = amsbAllowed() ? 'block' : 'none';
    loadData(true);   // bật card → tải 1 lần (KHÔNG đặt timer lặp)
    return;
  }
  initCard();
}

function hideCard() {
  const bar = document.getElementById('adsmeta-rt-bar');
  if (bar) bar.style.display = 'none';
  clearInterval(_s.timer);
  _s.timer = null;
}

// ─── Entry ────────────────────────────────────────────────────────────────────
(function boot() {
  if (window.location.hostname !== 'adsmanager.facebook.com') return;

  loadBill(); // nạp tỷ giá bán/biên (báo khách) từ chrome.storage

  window.addEventListener('_adsmeta_rt_change',   e => { if (e.detail) showCard(); else hideCard(); });
  window.addEventListener('_adsmeta_lang_change', e => { applyLang(e.detail); });

  // Always init: the overlay also drives table currency conversion, which must work even when the
  // realtime card is OFF. initCard() hides the card itself (and skips the 5-min timer) when rt is off.
  initCard();
})();
