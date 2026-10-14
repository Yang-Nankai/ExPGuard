// JustBlock Popup Guard — content bridge
(() => {
  if (window.__JUSTBLOCK_POPUP_GUARD_BRIDGE__) return;
  window.__JUSTBLOCK_POPUP_GUARD_BRIDGE__ = true;
  let enabled = true;
  function postState() { window.postMessage({source:'JUSTBLOCK_POPUP_GUARD_CONTENT', type:'set-enabled', enabled}, '*'); }
  function inject() { const s = document.createElement('script'); s.src = chrome.runtime.getURL('content/popup_guard_page.js'); s.async = false; (document.documentElement || document.head || document.body).appendChild(s); s.onload = () => s.remove(); }
  async function loadState() { try { const r = await chrome.storage.local.get({popupBlockerEnabled:true, extensionEnabled:true}); enabled = r.extensionEnabled !== false && r.popupBlockerEnabled !== false; } catch (_) { enabled = true; } postState(); }
  window.addEventListener('message', event => { if (event.source !== window) return; const d = event.data || {}; if (d.source !== 'JUSTBLOCK_POPUP_GUARD_PAGE') return; if (d.type === 'ready') postState(); if (d.type === 'popup-blocked') { try { chrome.runtime.sendMessage({type:'popup-blocked-activity', reason:d.reason, url:String(d.url || location.href).slice(0,300), host:String(d.host || location.hostname || 'this site').replace(/^www\./,'')}); } catch (_) {} } });
  chrome.storage.onChanged.addListener((changes, area) => { if (area === 'local' && (changes.popupBlockerEnabled || changes.extensionEnabled)) loadState(); });
  inject(); loadState();
})();
