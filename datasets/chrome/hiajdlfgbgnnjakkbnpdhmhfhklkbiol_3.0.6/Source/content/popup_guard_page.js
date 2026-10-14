// JustBlock Popup Guard — page-world hook
(() => {
  if (window.__JUSTBLOCK_POPUP_GUARD_PAGE__) return;
  window.__JUSTBLOCK_POPUP_GUARD_PAGE__ = true;
  let enabled = true;
  let lastUserGestureAt = 0;
  const originalOpen = window.open;
  ['pointerdown','mousedown','keydown','touchstart'].forEach(e => window.addEventListener(e, () => { lastUserGestureAt = Date.now(); }, {capture:true, passive:true}));
  function featureNumber(features, key) { const m = String(features || '').match(new RegExp(key + '\\s*=\\s*(-?\\d+)', 'i')); return m ? Number(m[1]) : null; }
  function fullUrl(url) { try { return new URL(String(url || ''), location.href).href; } catch (_) { return String(url || ''); } }
  function reasonFor(url, target, features) {
    const rawUrl = fullUrl(url), rawFeatures = String(features || '').toLowerCase(), rawTarget = String(target || '').toLowerCase();
    if (Date.now() - lastUserGestureAt > 1500) return 'automatic popup blocked';
    const width = featureNumber(rawFeatures, 'width'), height = featureNumber(rawFeatures, 'height'), left = featureNumber(rawFeatures, 'left'), top = featureNumber(rawFeatures, 'top');
    if ((width !== null && width > 0 && width < 160) || (height !== null && height > 0 && height < 120)) return 'tiny popup blocked';
    if ((left !== null && left < -50) || (top !== null && top < -50)) return 'hidden pop-under blocked';
    if (/^(_blank|popup|popunder|ad|ads)$/i.test(rawTarget) && /(?:popads|popcash|onclick|adsterra|propeller|pushads|adnxs|taboola|outbrain|doubleclick)/i.test(rawUrl)) return 'ad popup blocked';
    if (/(^|[./-])(popads|popcash|onclick|adsterra|propeller|pushads|adnxs|taboola|outbrain|doubleclick)([./-]|$)/i.test(rawUrl)) return 'ad popup blocked';
    return '';
  }
  function notify(reason, url) { window.postMessage({source:'JUSTBLOCK_POPUP_GUARD_PAGE', type:'popup-blocked', reason, url:fullUrl(url), host:location.hostname.replace(/^www\./,'')}, '*'); }
  window.open = function(url, target, features) { if (!enabled) return originalOpen.apply(window, arguments); const reason = reasonFor(url, target, features); if (reason) { notify(reason, url); return null; } return originalOpen.apply(window, arguments); };
  window.addEventListener('message', event => { if (event.source !== window) return; const data = event.data || {}; if (data.source === 'JUSTBLOCK_POPUP_GUARD_CONTENT' && data.type === 'set-enabled') enabled = data.enabled !== false; });
  window.postMessage({source:'JUSTBLOCK_POPUP_GUARD_PAGE', type:'ready'}, '*');
})();
