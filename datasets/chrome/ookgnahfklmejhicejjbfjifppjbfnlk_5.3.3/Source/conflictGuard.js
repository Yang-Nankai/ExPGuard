// AdsMeta — Lá chắn xung đột với extension "Ads Check by SMIT".
// Smit có quyền chặn network (declarativeNetRequest) → khi bật, AdsMeta không lấy được dữ liệu / không mở được.
// Không query trực tiếp được extension khác, nên dò dấu vết Smit chèn vào DOM trang (chrome-extension://<id>/...).
(() => {
  'use strict';
  const SMIT_ID = 'mkioennpdihocmahmgaeekhpoacfilcn';
  const BANNER_ID = '__adsmeta-smit-warning';

  // Dò Smit qua: (1) resource tham chiếu tới extension Smit, (2) host element có shadow của Smit nếu lộ id/class.
  function smitDetected() {
    try {
      if (document.querySelector(
        `[src*="${SMIT_ID}"],[href*="${SMIT_ID}"],[style*="${SMIT_ID}"]`
      )) return true;
      // Một số node nền dùng background-image qua CSS inline khác — quét nhanh các fixed panel z-index cao
      const nodes = document.querySelectorAll('div,img,iframe,link');
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const a = n.getAttribute && (n.getAttribute('src') || n.getAttribute('href') || n.getAttribute('style') || '');
        if (a && a.indexOf(SMIT_ID) !== -1) return true;
      }
    } catch (_) {}
    return false;
  }

  function buildBanner() {
    const wrap = document.createElement('div');
    wrap.id = BANNER_ID;
    wrap.style.cssText = [
      'position:fixed', 'top:14px', 'left:50%', 'transform:translateX(-50%)',
      'z-index:2147483647', 'width:min(94vw,640px)',
      'background:#fff', 'border:1px solid #fecaca', 'border-radius:14px',
      'box-shadow:0 8px 32px rgba(0,0,0,.22)', 'overflow:hidden',
      "font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif",
      'animation:__amsbwarn .22s ease',
    ].join(';');
    wrap.innerHTML = `
      <style>@keyframes __amsbwarn{from{opacity:0;transform:translate(-50%,-10px)}to{opacity:1;transform:translate(-50%,0)}}</style>
      <div style="display:flex;align-items:center;gap:8px;padding:9px 14px;background:linear-gradient(90deg,#dc2626,#ef4444)">
        <span style="font-size:16px">⚠️</span>
        <span style="flex:1;color:#fff;font-size:13px;font-weight:700;line-height:1.3">AdsMeta đang bị extension "Ads Check by SMIT" chặn</span>
        <button id="__amsbwarn-x" style="background:rgba(255,255,255,.2);border:none;color:#fff;width:22px;height:22px;border-radius:6px;cursor:pointer;font-size:14px;line-height:1;flex-shrink:0">✕</button>
      </div>
      <div style="padding:12px 14px">
        <p style="margin:0 0 10px;font-size:13px;color:#374151;line-height:1.5">
          Hai extension cùng chạy trên trang Facebook nên xung đột. Để dùng được AdsMeta, anh/chị hãy
          <b>tắt extension "Ads Check by SMIT"</b> rồi tải lại trang.
        </p>
        <ol style="margin:0 0 12px;padding-left:18px;font-size:12.5px;color:#4b5563;line-height:1.7">
          <li>Mở <b style="font-family:monospace">chrome://extensions</b> (copy dán vào thanh địa chỉ)</li>
          <li>Tìm <b>"Ads Check by SMIT"</b> → gạt <b>tắt</b> công tắc</li>
          <li>Quay lại trang này, bấm <b>Tải lại trang</b></li>
        </ol>
        <div style="display:flex;align-items:center;gap:8px;justify-content:flex-end">
          <button id="__amsbwarn-copy" style="background:#f3f4f6;border:1px solid #e5e7eb;color:#374151;font-size:12px;font-weight:600;padding:7px 12px;border-radius:9px;cursor:pointer">Copy chrome://extensions</button>
          <button id="__amsbwarn-reload" style="background:#1877F2;border:none;color:#fff;font-size:12px;font-weight:700;padding:7px 14px;border-radius:9px;cursor:pointer">Tải lại trang</button>
        </div>
      </div>`;
    document.documentElement.appendChild(wrap);

    wrap.querySelector('#__amsbwarn-x').addEventListener('click', () => {
      wrap.remove();
      // Đã đóng → không bật lại trong phiên này (tránh phiền) nhưng vẫn dò lại sau reload
      sessionStorage.setItem('__amsb_smit_dismissed', '1');
    });
    wrap.querySelector('#__amsbwarn-reload').addEventListener('click', () => location.reload());
    wrap.querySelector('#__amsbwarn-copy').addEventListener('click', (e) => {
      const btn = e.currentTarget;
      try { navigator.clipboard.writeText('chrome://extensions'); btn.textContent = '✓ Đã copy'; setTimeout(() => { btn.textContent = 'Copy chrome://extensions'; }, 1500); } catch (_) {}
    });
  }

  function showBanner() {
    if (document.getElementById(BANNER_ID)) return;
    if (sessionStorage.getItem('__amsb_smit_dismissed') === '1') return;
    buildBanner();
  }
  function hideBanner() {
    const b = document.getElementById(BANNER_ID);
    if (b) b.remove();
  }

  // Chỉ cảnh báo ở 2 màn có panel AdsMeta (SPA có thể đổi URL không reload)
  function amsbAllowed() {
    const p = location.pathname;
    return /\/adsmanager\/manage\/(campaigns|adsets|ads)(\/|$)/.test(p)
        || /\/billing_hub\/(accounts\/details|payment_settings)(\/|$)/.test(p);
  }

  function check() {
    if (amsbAllowed() && smitDetected()) showBanner();
    else hideBanner();
  }

  // Smit có thể chèn muộn → dò nhiều lần lúc đầu + theo dõi thay đổi DOM, rồi định kỳ nhẹ.
  function start() {
    check();
    let n = 0;
    const fast = setInterval(() => { check(); if (++n >= 8) clearInterval(fast); }, 1000); // 8s đầu
    try {
      const mo = new MutationObserver(() => check());
      mo.observe(document.documentElement, { childList: true, subtree: true });
      setTimeout(() => mo.disconnect(), 15000);
    } catch (_) {}
    setInterval(check, 5000); // dò nhẹ lâu dài (nếu user bật/tắt Smit giữa chừng)
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();
