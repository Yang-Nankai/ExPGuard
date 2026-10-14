// AdsMeta bridge — CHỈ chạy trên adsmeta.io.
// Đọc tỷ giá BÁN + %biên (user tự đặt, lưu localStorage) → chrome.storage.local cho overlay (trên Facebook)
// dùng chế độ VND* (báo khách). KHÔNG gọi Facebook, KHÔNG timer nền — chỉ đọc localStorage cùng origin khi có thay đổi.
(function () {
  'use strict';
  // Chặn giá trị xấu (âm/NaN/khổng lồ) trước khi đẩy cho overlay quy đổi tiền báo khách.
  function clampRate(v) { const n = Number(v); return (isFinite(n) && n > 0) ? Math.min(1000000, n) : null; }
  function readBill() {
    try {
      const customUsdRate = clampRate(localStorage.getItem('_user_usd_rate'));
      let raw = {}; try { raw = JSON.parse(localStorage.getItem('_user_sell_rates') || '{}') || {}; } catch (e) { raw = {}; }
      const sellRates = {};
      for (const k in raw) { const c = clampRate(raw[k]); if (c) sellRates[k] = c; }
      let vndMarkup = Number(localStorage.getItem('_user_vnd_markup')) || 0;
      if (!isFinite(vndMarkup) || vndMarkup < 0) vndMarkup = 0; if (vndMarkup > 100) vndMarkup = 100;
      return { customUsdRate, sellRates, vndMarkup };
    } catch (e) { return null; }
  }
  function push() {
    const b = readBill();
    if (!b) return;
    try { chrome.storage.local.set({ _ams_bill: b }); } catch (e) {}
  }
  push(); // lần đầu (tỷ giá đã có sẵn trong localStorage)
  // Web app dispatch '_fx_custom_changed' mỗi khi user đổi tỷ giá/%biên → đẩy lại (content script nghe được event của trang trên window)
  try { window.addEventListener('_fx_custom_changed', push); } catch (e) {}
  // Phòng hờ: cập nhật khi quay lại tab / đổi tab khác sửa (storage event chỉ bắn tab khác)
  try { window.addEventListener('focus', push); } catch (e) {}
  try { window.addEventListener('storage', function (ev) { if (!ev || /^_user_(usd_rate|sell_rates|vnd_markup)$/.test(ev.key || '')) push(); }); } catch (e) {}

  // LỚP 1 (trợ lý instant-fresh): background SW nhắn AMS_REFRESH_SYNC (user vừa hỏi Telegram + data cũ) →
  // relay vào TRANG dashboard để nó chạy fetchReportData + sync. KHÔNG fetch FB ở đây (content script chỉ chuyển tiếp).
  try {
    chrome.runtime.onMessage.addListener(function (msg) {
      if (msg && msg.type === 'AMS_REFRESH_SYNC') {
        try { window.postMessage({ __adsmeta: true, type: 'AMS_REFRESH_SYNC', reqId: msg.reqId || '' }, window.location.origin); } catch (e) {}
      }
    });
  } catch (e) {}
})();
