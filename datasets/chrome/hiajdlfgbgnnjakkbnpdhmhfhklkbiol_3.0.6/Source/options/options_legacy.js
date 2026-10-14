// Inline SVG icons to guarantee visuals if image files are missing
function svg(key){
  const map = {
    download: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 3v10m0 0 4-4m-4 4-4-4M5 20h14" stroke="#2563eb" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    crypto:   '<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="#2563eb" stroke-width="2"/><path d="M8 12h8M9.5 8.5h5M9.5 15.5h5" stroke="#2563eb" stroke-width="2" stroke-linecap="round"/></svg>',
    facebook:'<svg width="22" height="22" viewBox="0 0 24 24" fill="#2563eb"><path d="M22 12a10 10 0 1 0-11.5 9.9v-7H8v-3h2.5V9.5A3.5 3.5 0 0 1 14 6h2v3h-2c-.6 0-1 .4-1 1V12h3l-.5 3H13v7A10 10 0 0 0 22 12z"/></svg>',
    mail:     '<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M4 6h16v12H4z" stroke="#2563eb" stroke-width="2"/><path d="m4 7 8 6 8-6" stroke="#2563eb" stroke-width="2" fill="none"/></svg>',
    safety:   '<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 3l7 4v5c0 5-3.5 8-7 9-3.5-1-7-4-7-9V7l7-4z" stroke="#2563eb" stroke-width="2" fill="none"/></svg>',
    click:    '<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M8 12l4 4 4-8" stroke="#94a3b8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    finger:   '<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M9 11V7a3 3 0 1 1 6 0v8" stroke="#94a3b8" stroke-width="2"/><path d="M7 11v2a5 5 0 0 0 10 0v-1" stroke="#94a3b8" stroke-width="2"/></svg>',
    lock:     '<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><rect x="5" y="11" width="14" height="9" rx="2" stroke="#94a3b8" stroke-width="2"/><path d="M8 11V8a4 4 0 1 1 8 0v3" stroke="#94a3b8" stroke-width="2"/></svg>',
    cookie:   '<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="8" stroke="#94a3b8" stroke-width="2"/><circle cx="10" cy="10" r="1.2" fill="#94a3b8"/><circle cx="14.5" cy="12" r="1.2" fill="#94a3b8"/><circle cx="11.5" cy="14.5" r="1.2" fill="#94a3b8"/></svg>',
    bell:     '<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M18 16V11a6 6 0 1 0-12 0v5l-2 2h16l-2-2z" stroke="#94a3b8" stroke-width="2"/><path d="M9 20a3 3 0 0 0 6 0" stroke="#94a3b8" stroke-width="2"/></svg>'
  };
  map.search = map.search || '<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="7" stroke="#2563eb" stroke-width="2"/><path d="M20 20l-4-4" stroke="#2563eb" stroke-width="2" stroke-linecap="round"/></svg>';
map.shield = map.shield || '<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 3l7 4v5c0 5-3.5 8-7 9-3.5-1-7-4-7-9V7l7-4z" stroke="#2563eb" stroke-width="2"/></svg>';
map.redirect = map.redirect || '<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M7 17l10-10M9 7h8v8" stroke="#2563eb" stroke-width="2" stroke-linecap="round"/></svg>';
map.news = map.news || '<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="16" rx="2" stroke="#2563eb" stroke-width="2"/><path d="M7 8h10M7 12h10M7 16h6" stroke="#2563eb" stroke-width="2"/></svg>';
return map[key] || '<svg width="22" height="22"></svg>';
}

// Build the legacy-like dashboard list with icons and toggles
// Map to real rules where supported; grey out unsupported features.
const FEATURES = [
  // supported
  { id:'rules_file',   icon:'download', title:'Block Malicious Download', sub:'Block files that may contain malware & virus.', supported:true,  defaultOn:true },
  { id:'rules_crypto', icon:'crypto',   title:'Block Cryptocurrency Mining', sub:'Block hackers from mining cryptocurrencies with your computer.', supported:true, defaultOn:true },
  { id:'rules_fb',     icon:'facebook', title:'Facebook Protect', sub:'Block Facebook tracking endpoints on third‑party sites.', supported:true, defaultOn:true },
  { id:'rules_mail',   icon:'mail',     title:'Block Email Trackers', sub:'Stop tracking pixels and email tracking domains.', supported:true, defaultOn:true },
  { id:'rules_adult',  icon:'safety',   title:'Protect your Safety', sub:'Block unsafe/adult websites (opt‑in).', supported:true, defaultOn:false },

  // placeholders (not active in MV3 build)
  { id:'shadow_clicks',  icon:'click',     title:'Block Shadow Clicks', sub:'Block pages from opening links without your consent.', supported:false },
  { id:'fingerprint',    icon:'finger',    title:'Hide Digital Fingerprint', sub:'Reduce tracking via fingerprinting.', supported:false },
  { id:'privacy_data',   icon:'lock',      title:'Protect your Personal Data', sub:'Protect you and your device from dangerous sites.', supported:false },
  { id:'cookies_3p',     icon:'cookie',    title:'Block Third‑party Cookies', sub:'Restrict cross‑site tracking cookies.', supported:false },
  { id:'notifications',  icon:'bell',      title:'Block Notifications', sub:'Blocks annoying notification prompts from websites.', supported:false }
,
    { id:'rules_search',        icon:'search',    title:'Search Hijack Protection', sub:'Block known fake search / browser hijack domains.', supported:true, defaultOn:false },
  { id:'rules_scams',         icon:'shield',    title:'Block Known Scams', sub:'Block reported scam domains (conservative).', supported:true, defaultOn:false },
    { id:'rules_clickbait',     icon:'news',      title:'Clickbait Filter', sub:'Block common “around the web” widgets.', supported:true, defaultOn:false }
];


const ICON_MAP = {
  search: '../images/icon_search.png',
  shield: '../images/icon_shield.png',
  redirect: '../images/icon_redirect.png',
  news: '../images/icon_news.png',
  // (image paths may be missing; we also embed inline SVGs below)
  download: '../images/icon_download.png',
  crypto:   '../images/icon_crypto.png',
  facebook: '../images/icon_facebook.png',
  mail:     '../images/icon_mail.png',
  safety:   '../images/icon_safety.png',
  click:    '../images/icon_click.png',
  finger:   '../images/icon_fingerprint.png',
  lock:     '../images/icon_lock.png',
  cookie:   '../images/icon_cookie.png',
  bell:     '../images/icon_bell.png'
};

function iconSrc(key){
  const fallback = '../images/16.png';
  return ICON_MAP[key] || fallback;
}

function itemHTML(f, enabled, disabled){
  return `
  <li class="feature-item ${disabled?'disabled':''}" data-id="${f.id}">
    <span class="icon">${svg(f.icon)}</span>
    <div class="left">
      <div class="item-title">${f.title}<span class="q" title="${f.supported ? 'Enabled by DNR rules' : 'Not supported in Manifest V3 or requires extra permissions'}">?</span></div>
      <div class="item-sub">${f.sub}</div>
    </div>
    <div class="right">
      <label class="toggle">
        <input type="checkbox" ${enabled ? 'checked' : ''} ${disabled ? 'disabled' : ''}>
        <span class="track"></span><span class="knob"></span>
      </label>
    </div>
  </li>`;
}

async function load(){
  const { packs } = await chrome.storage.sync.get('packs');
  const st = packs || {};
  const list = document.getElementById('featureList');
  list.innerHTML = FEATURES.map(f => {
    const enabled = f.supported ? (st[f.id] ?? f.defaultOn) : false;
    return itemHTML(f, enabled, !f.supported);
  }).join('');

  // Wire supported toggles
  document.querySelectorAll('.feature-item').forEach(li => {
    const id = li.getAttribute('data-id');
    const f = FEATURES.find(x => x.id === id);
    const chk = li.querySelector('input[type="checkbox"]');
    if (!f || !f.supported) return;
    chk.addEventListener('change', async (e) => {
      await chrome.runtime.sendMessage({ type:'toggle-pack', id, enable: e.target.checked });
      const packs2 = (await chrome.storage.sync.get('packs')).packs || {};
      packs2[id] = e.target.checked;
      await chrome.storage.sync.set({ packs: packs2 });
    });
  });
}

document.addEventListener('DOMContentLoaded', load);
