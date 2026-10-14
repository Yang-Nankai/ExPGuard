const EXTENSION_ID = 'hiajdlfgbgnnjakkbnpdhmhfhklkbiol';
const STORE_REVIEW_URL = `https://chromewebstore.google.com/detail/justblock-security/${EXTENSION_ID}/reviews`;

const FEATURES = [
  { id: 'rules_file', icon: 'download', title: 'Malicious downloads', sub: 'Warns before risky files and suspicious sources.', defaultOn: true, core: true },
  { id: 'popup_guard', icon: 'popup', title: 'Popup Guard', sub: 'Stops automatic popups, pop-unders and scam redirects without breaking normal clicks.', defaultOn: true, core: true, local: true },
  { id: 'rules_crypto', icon: 'crypto', title: 'Crypto miner blocking', sub: 'Stops known in-browser mining scripts.', defaultOn: true, core: true },
  {
    id: 'rules_fb', icon: 'facebook', title: 'Facebook privacy guard', sub: 'Controls Facebook tracking protections.', defaultOn: true, core: true,
    children: [
      { id: 'rules_fb_tracking', title: 'Block Facebook tracking', defaultOn: true },
      { id: 'rules_fb_seen', title: 'Block “seen” receipts', defaultOn: false },
      { id: 'rules_fb_typing', title: 'Block “typing…” indicator', defaultOn: false }
    ]
  },
  { id: 'rules_mail', icon: 'mail', title: 'Email tracker blocking', sub: 'Blocks common mail tracking pixels and domains.', defaultOn: true, core: true },
  { id: 'rules_adult', icon: 'safety', title: 'Parental control', sub: 'Optional adult and risky domain blocking.', defaultOn: false },
  { id: 'rules_search', icon: 'search', title: 'Search hijack protection', sub: 'Blocks known fake search redirect patterns.', defaultOn: false },
  { id: 'rules_scams', icon: 'shield', title: 'Known scam domains', sub: 'Blocks reported scam and phishing destinations.', defaultOn: false },
  { id: 'rules_clickbait', icon: 'news', title: 'Clickbait widgets', sub: 'Blocks common low-quality recommendation widgets.', defaultOn: false }
];

const qs = (s, root = document) => root.querySelector(s);
const qsa = (s, root = document) => Array.from(root.querySelectorAll(s));

const DAY_KEY = new Date().toISOString().slice(0, 10);
let LIVE_ACTIVITY_MESSAGES = [
  'Checking this page against enabled protection rules…',
  'Watching for risky downloads and suspicious redirects…',
  'Keeping privacy shields ready without collecting browsing history…'
];

function nowShort() {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function badgeCountText(count) {
  const n = Number(count || 0);
  if (n <= 0) return 'ON';
  return n > 99 ? '99+' : String(n);
}

function badgeTextForState(badgeState, count, popupCount = 0) {
  if (badgeState === 'popup') return popupCount > 9 ? 'P9+' : `P${popupCount || 1}`;
  if (badgeState === 'track') return 'T';
  if (badgeState === 'sensitive') return 'L';
  if (badgeState === 'warn') return '!';
  if (badgeState === 'scan') return '…';
  if (badgeState === 'good') return '✓';
  return badgeCountText(count);
}

function badgeColorForState(badgeState) {
  if (badgeState === 'popup') return '#7c3aed';
  if (badgeState === 'track') return '#0ea5e9';
  if (badgeState === 'sensitive') return '#db2777';
  if (badgeState === 'warn') return '#f59e0b';
  if (badgeState === 'scan') return '#2563eb';
  if (badgeState === 'good') return '#16a34a';
  return '#16a34a';
}

async function getActivityState() {
  const defaults = { checksDay: DAY_KEY, checksToday: 0, activityLog: [], popupOpens: 0 };
  const state = await chrome.storage.local.get(defaults);
  if (state.checksDay !== DAY_KEY) {
    state.checksDay = DAY_KEY;
    state.checksToday = 0;
    state.activityLog = [];
    await chrome.storage.local.set(state);
  }
  return state;
}

async function addActivity(message, kind = 'muted') {
  const state = await getActivityState();
  const existing = Array.isArray(state.activityLog) ? state.activityLog : [];
  if (existing[0]?.message === message) { renderActivity(existing); return; }
  const entry = { message, kind, time: nowShort() };
  const activityLog = [entry, ...existing].slice(0, 5);
  await chrome.storage.local.set({ activityLog });
  renderActivity(activityLog);
}

function renderActivity(activityLog = []) {
  const feed = qs('#activityFeed');
  if (!feed) return;
  const rows = (activityLog.length ? activityLog : [{ message: 'Open any website to see live checks here.', kind: 'muted', time: nowShort() }])
    .slice(0, 4)
    .map(entry => `<div class="activity-row ${entry.kind || 'muted'}"><span>●</span><p><strong>${entry.time || nowShort()}</strong> · ${entry.message}</p></div>`)
    .join('');
  feed.innerHTML = rows;
}

async function recordPageCheck(hostname, insights = []) {
  const state = await getActivityState();
  const cleanHost = hostname || 'Current page';
  const checksToday = Number(state.checksToday || 0) + 1;
  const hasTrack = insights.some(item => /tracking parameter/i.test(item.message || ''));
  const hasSensitive = insights.some(item => /payment|checkout|login|account/i.test(item.message || ''));
  const hasWarn = insights.some(item => (item.kind || '') === 'warn');
  const badgeState = hasTrack ? 'track' : (hasSensitive ? 'sensitive' : (hasWarn ? 'warn' : 'good'));
  const badgeReason = hasTrack ? `${cleanHost}: tracking parameters noticed` : (hasSensitive ? `${cleanHost}: sensitive page awareness active` : (hasWarn ? `${cleanHost}: attention recommended` : `${cleanHost}: checked and protected`));
  await chrome.storage.local.set({ checksToday, lastCheckedAt: Date.now(), lastCheckedHost: cleanHost, badgeState, badgeReason });
  qs('#checksToday').textContent = String(checksToday);
  qs('#lastCheckedTime').textContent = nowShort();
  await updateBadgeFromChecks(checksToday, badgeState, badgeReason);
  const messages = insights.length ? insights : [{ message: `${cleanHost} checked — no browsing data stored.`, kind: 'muted' }];
  for (const item of messages.slice(0, 4).reverse()) await addActivity(item.message || item, item.kind || 'muted');
}

async function refreshActivityCounters() {
  const state = await getActivityState();
  qs('#checksToday').textContent = String(state.checksToday || 0);
  qs('#lastCheckedTime').textContent = state.lastCheckedAt ? new Date(state.lastCheckedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Now';
  renderActivity(state.activityLog || []);
  await updateBadgeFromChecks(state.checksToday || 0);
}

async function trackPopupOpen() {
  const state = await getActivityState();
  const popupOpens = Number(state.popupOpens || 0) + 1;
  await chrome.storage.local.set({ popupOpens });
  if (popupOpens > 1 && popupOpens % 7 === 0) {
    await addActivity(`Protection dashboard opened ${popupOpens} times — showing live checks for the current site.`, 'muted');
  }
  if (popupOpens >= 3) maybeShowReviewPrompt();
}

function startLiveActivityTicker() {
  let idx = 0;
  setInterval(() => {
    const sub = qs('#activitySub');
    if (!sub) return;
    sub.textContent = LIVE_ACTIVITY_MESSAGES[idx % LIVE_ACTIVITY_MESSAGES.length];
    idx += 1;
  }, 3500);
}

async function updateBadgeFromChecks(checksOverride = null, badgeStateOverride = null, badgeReasonOverride = null) {
  try {
    const defaults = { extensionEnabled: true, checksToday: 0, badgeState: 'active', badgeReason: 'protection active', popupBlockDay: DAY_KEY, popupsBlockedToday: 0 };
    const state = await chrome.storage.local.get(defaults);
    const count = checksOverride === null ? state.checksToday : checksOverride;
    const badgeState = badgeStateOverride || state.badgeState || 'active';
    const badgeReason = badgeReasonOverride || state.badgeReason || `${count || 0} page checks today`;
    const popupCount = state.popupBlockDay === DAY_KEY ? Number(state.popupsBlockedToday || 0) : 0;
    const text = state.extensionEnabled ? badgeTextForState(badgeState, count, popupCount) : 'OFF';
    const color = state.extensionEnabled ? badgeColorForState(badgeState) : '#dc2626';
    await chrome.action.setBadgeText({ text });
    await chrome.action.setBadgeBackgroundColor({ color });
    await chrome.action.setTitle({ title: state.extensionEnabled ? `JustBlock Security — ${badgeReason}` : 'JustBlock Security — protection paused' });
  } catch (_) {}
}


function enabledPackTitles(packs) {
  return FEATURES.flatMap(f => [f, ...(f.children || [])]).filter(f => !!packs[f.id]).map(f => f.title);
}

function describeDomain(host, path = '') {
  const lower = `${host || ''} ${path || ''}`.toLowerCase();
  if (/(bank|upi|wallet|checkout|billing|payment|pay|invoice|card)/i.test(lower)) return 'payment';
  if (/(login|signin|auth|account|password|verify|otp)/i.test(lower)) return 'login';
  if (/(mail|inbox|outlook|gmail|yahoo|proton)/i.test(lower)) return 'email';
  if (/(facebook|instagram|x\.com|twitter|linkedin|youtube|reddit)/i.test(lower)) return 'social';
  if (/(amazon|flipkart|shop|store|cart|order|product)/i.test(lower)) return 'shopping';
  if (/(github|gitlab|console|cloud|aws|azure|digitalocean|fly\.io)/i.test(lower)) return 'developer';
  if (/(news|blog|article|medium|substack)/i.test(lower)) return 'content';
  return 'standard';
}

function pageTypeLabel(type) {
  return {
    payment: 'payment or checkout page',
    login: 'login or account page',
    email: 'email page',
    social: 'social media page',
    shopping: 'shopping page',
    developer: 'developer/admin page',
    content: 'content page',
    standard: 'website'
  }[type] || 'website';
}

function timeContextMessage() {
  const h = new Date().getHours();
  if (h < 6) return 'Quiet-hours protection is active in the background.';
  if (h < 12) return 'Morning browsing is being checked as you open pages.';
  if (h < 18) return 'Active browsing session — shields are checking each site you visit.';
  return 'Evening browsing protected — JustBlock stays lightweight in the background.';
}

function pickContextAdvice(type, host) {
  const advice = {
    payment: `Extra caution mode: avoid entering payment details unless you trust ${host}.`,
    login: `Login-page awareness: verify the domain before entering passwords or OTPs.`,
    email: 'Email shield ready: tracking-pixel and suspicious mail resources are monitored by enabled rules.',
    social: 'Social privacy guard ready: social tracking and privacy controls are checked.',
    shopping: 'Shopping-page check: redirects, tracking links and known risky patterns are watched.',
    developer: 'Developer/admin page detected: keep sessions private and avoid suspicious redirects.',
    content: 'Content-page check: low-quality widgets and tracking parameters are reviewed.',
    standard: 'Standard site check completed with enabled JustBlock shields.'
  };
  return advice[type] || advice.standard;
}

function buildSmartActivity(tab, packs, extensionEnabled) {
  if (!extensionEnabled) {
    LIVE_ACTIVITY_MESSAGES = ['Protection is paused — turn it back on to resume scanning.'];
    qs('#activitySub').textContent = LIVE_ACTIVITY_MESSAGES[0];
    return [{ message: 'Protection is paused for this browser.', kind: 'warn' }];
  }

  const url = new URL(tab.url);
  const host = url.hostname.replace(/^www\./, '');
  const popupGuardOn = packs.popup_guard !== false;
  const activeNames = enabledPackTitles(packs).filter(name => name !== 'Popup Guard');
  const type = describeDomain(host, url.pathname);
  const typeLabel = pageTypeLabel(type);
  const insights = [];
  const enabledCount = activeNames.length + (popupGuardOn ? 1 : 0);

  insights.push({ message: `${host} identified as a ${typeLabel}; ${enabledCount} shield${enabledCount === 1 ? '' : 's'} available for this check.`, kind: 'muted' });

  if (url.protocol === 'https:') {
    insights.push({ message: `Connection check passed — HTTPS is active on ${host}.`, kind: 'good' });
  } else {
    insights.push({ message: `Attention: ${host} is not using HTTPS. Avoid passwords, cards or private data here.`, kind: 'warn' });
  }

  const junkParams = ['utm_source','utm_medium','utm_campaign','utm_term','utm_content','utm_id','utm_referrer','utm_name','fbclid','gclid','msclkid','igshid'];
  const foundJunk = junkParams.filter(key => url.searchParams.has(key));
  if (foundJunk.length) insights.push({ message: `${foundJunk.length} tracking parameter${foundJunk.length === 1 ? '' : 's'} found in the URL — Clean link can remove them.`, kind: 'warn' });
  else insights.push({ message: 'URL hygiene passed — no common tracking parameters found.', kind: 'good' });

  insights.push({ message: pickContextAdvice(type, host), kind: (type === 'payment' || type === 'login') ? 'warn' : 'muted' });

  if (type === 'email' && packs.rules_mail) insights.push({ message: 'Email tracker blocking is enabled for mail-related resources.', kind: 'good' });
  if (type === 'social' && packs.rules_fb) insights.push({ message: 'Social privacy guard is enabled for Facebook-related protections.', kind: 'good' });
  if ((type === 'payment' || type === 'login') && packs.rules_scams) insights.push({ message: 'Known scam-domain rules are enabled for sensitive-page protection.', kind: 'good' });
  if (packs.rules_file) insights.push({ message: 'Download shield is ready before risky file patterns load.', kind: 'muted' });
  insights.push({ message: popupGuardOn ? 'Popup Guard is active — automatic popups and pop-unders are being blocked.' : 'Popup Guard is paused for this browser.', kind: popupGuardOn ? 'good' : 'warn' });

  const activePreview = activeNames.slice(0, 3).join(', ');
  LIVE_ACTIVITY_MESSAGES = [
    `Checking ${host} as a ${typeLabel}…`,
    url.protocol === 'https:' ? 'HTTPS verified for this page.' : 'HTTP page detected — be careful with private data.',
    activePreview ? `Active shields: ${activePreview}${activeNames.length > 3 ? ' +' + (activeNames.length - 3) : ''}` : 'No rule packs enabled — turn shields on for protection.',
    popupGuardOn ? 'Popup Guard is watching for automatic popups and pop-unders.' : 'Popup Guard is paused.',
    foundJunk.length ? 'Tracking parameters found — Clean link is available.' : 'No common tracking parameters in this URL.',
    timeContextMessage(),
    'Privacy note: checks run locally; browsing history is not collected.'
  ];
  qs('#activitySub').textContent = LIVE_ACTIVITY_MESSAGES[0];
  return insights;
}

async function openReviewPage() {
  await chrome.storage.local.set({ sentimentDone: true });
  try { await chrome.tabs.create({ url: STORE_REVIEW_URL }); }
  catch (_) { window.open(STORE_REVIEW_URL, '_blank', 'noopener,noreferrer'); }
}

async function openFeedbackPage() {
  await chrome.storage.local.set({ sentimentDone: true });
  const subject = encodeURIComponent('JustBlock feedback');
  const body = encodeURIComponent('What can we improve?\n\n');
  try { await chrome.tabs.create({ url: `mailto:support@justblock.org?subject=${subject}&body=${body}` }); }
  catch (_) { window.location.href = `mailto:support@justblock.org?subject=${subject}&body=${body}`; }
}

function svg(key) {
  const map = {
    download: '<svg viewBox="0 0 24 24" fill="none"><path d="M12 3v10m0 0 4-4m-4 4-4-4M5 20h14" stroke="#2563eb" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    crypto: '<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="#2563eb" stroke-width="2"/><path d="M8 12h8M9.5 8.5h5M9.5 15.5h5" stroke="#2563eb" stroke-width="2" stroke-linecap="round"/></svg>',
    facebook: '<svg viewBox="0 0 24 24" fill="#2563eb"><path d="M22 12a10 10 0 1 0-11.5 9.9v-7H8v-3h2.5V9.5A3.5 3.5 0 0 1 14 6h2v3h-2c-.6 0-1 .4-1 1V12h3l-.5 3H13v7A10 10 0 0 0 22 12z"/></svg>',
    mail: '<svg viewBox="0 0 24 24" fill="none"><path d="M4 6h16v12H4z" stroke="#2563eb" stroke-width="2"/><path d="m4 7 8 6 8-6" stroke="#2563eb" stroke-width="2"/></svg>',
    safety: '<svg viewBox="0 0 24 24" fill="none"><path d="M12 3l7 4v5c0 5-3.5 8-7 9-3.5-1-7-4-7-9V7l7-4z" stroke="#2563eb" stroke-width="2"/></svg>',
    search: '<svg viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="7" stroke="#2563eb" stroke-width="2"/><path d="M20 20l-4-4" stroke="#2563eb" stroke-width="2" stroke-linecap="round"/></svg>',
    shield: '<svg viewBox="0 0 24 24" fill="none"><path d="M12 3l7 4v5c0 5-3.5 8-7 9-3.5-1-7-4-7-9V7l7-4z" stroke="#2563eb" stroke-width="2"/><path d="m9 12 2 2 4-5" stroke="#2563eb" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    news: '<svg viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="16" rx="2" stroke="#2563eb" stroke-width="2"/><path d="M7 8h10M7 12h10M7 16h6" stroke="#2563eb" stroke-width="2"/></svg>',
    popup: '<svg viewBox="0 0 24 24" fill="none"><path d="M5 7.5A2.5 2.5 0 0 1 7.5 5h8A2.5 2.5 0 0 1 18 7.5v8a2.5 2.5 0 0 1-2.5 2.5h-8A2.5 2.5 0 0 1 5 15.5v-8Z" stroke="#2563eb" stroke-width="2"/><path d="M9 9h8.5A1.5 1.5 0 0 1 19 10.5V19" stroke="#2563eb" stroke-width="2" stroke-linecap="round"/><path d="m8.5 8.5 6 6m0-6-6 6" stroke="#2563eb" stroke-width="2" stroke-linecap="round"/></svg>'
  };
  return map[key] || map.shield;
}

function defaultPacks() {
  const out = {};
  const seed = (items) => items.forEach(f => { out[f.id] = !!f.defaultOn; if (f.children) seed(f.children); });
  seed(FEATURES);
  return out;
}

async function getPacks() {
  const { packs } = await chrome.storage.sync.get('packs');
  let merged = packs && Object.keys(packs).length ? packs : defaultPacks();
  if (!packs || !Object.keys(packs).length) await chrome.storage.sync.set({ packs: merged });
  const { popupBlockerEnabled = true } = await chrome.storage.local.get({ popupBlockerEnabled: true });
  merged = { ...merged, popup_guard: popupBlockerEnabled !== false };
  return merged;
}

function renderItem(f, packs) {
  const enabled = typeof packs[f.id] === 'undefined' ? !!f.defaultOn : !!packs[f.id];
  let childrenHtml = '';
  if (f.children?.length) {
    childrenHtml = `<div class="sub-items ${enabled ? '' : 'disabled'}" id="subs-${f.id}">` + f.children.map(child => {
      const childEnabled = typeof packs[child.id] === 'undefined' ? !!child.defaultOn : !!packs[child.id];
      return `<div class="item item--child" data-id="${child.id}" data-parent="${f.id}">
        <div class="child-connector"></div>
        <div><div class="titleRow">${child.title}</div></div>
        <label class="toggle toggle--small"><input type="checkbox" ${childEnabled ? 'checked' : ''}><span class="track"></span><span class="knob"></span></label>
      </div>`;
    }).join('') + '</div>';
  }

  return `<div class="item-group">
    <div class="item" data-id="${f.id}">
      <span class="icon">${svg(f.icon)}</span>
      <div><div class="titleRow">${f.title}</div><div class="sub">${f.sub}</div></div>
      <label class="toggle"><input type="checkbox" ${enabled ? 'checked' : ''}><span class="track"></span><span class="knob"></span></label>
    </div>${childrenHtml}
  </div>`;
}

function allFeatureIds() {
  const ids = [];
  FEATURES.forEach(f => { ids.push(f.id); (f.children || []).forEach(c => ids.push(c.id)); });
  return ids;
}

async function updateStatusUI() {
  const { extensionEnabled = true } = await chrome.storage.local.get({ extensionEnabled: true });
  const hero = qs('#heroCard');
  const input = qs('#popupEnabled');
  const title = qs('#heroTitle');
  const subtitle = qs('#heroSubtitle');
  const pill = qs('#statusPill');

  input.checked = !!extensionEnabled;
  hero.classList.toggle('off', !extensionEnabled);
  title.textContent = extensionEnabled ? 'You are protected' : 'Protection is paused';
  subtitle.textContent = extensionEnabled ? 'Threat blocking is active for safer browsing.' : 'All rule packs are temporarily disabled.';
  pill.textContent = extensionEnabled ? 'Protected' : 'Paused';
  qs('#activityBadge').textContent = extensionEnabled ? 'Live' : 'Paused';
  qs('#activityBadge').classList.toggle('warn', !extensionEnabled);

  qsa('.item').forEach(el => el.classList.toggle('disabled', !extensionEnabled));
  qsa('.item input[type="checkbox"]').forEach(inp => inp.disabled = !extensionEnabled);
}

async function updateStats(packs) {
  const ids = allFeatureIds();
  const active = ids.filter(id => !!packs[id]).length;
  const optional = FEATURES.filter(f => !f.core && !!packs[f.id]).length;
  qs('#activePackCount').textContent = String(active);
  qs('#visibleRulesCount').textContent = String(active);
  qs('#optionalPackCount').textContent = String(optional);
  await updateBadgeFromChecks();
}

async function renderFeatures() {
  const packs = await getPacks();
  const core = FEATURES.filter(f => f.core);
  const extra = FEATURES.filter(f => !f.core);
  qs('#list').innerHTML = `<div class="list-section-label">Core shields</div>${core.map(f => renderItem(f, packs)).join('')}
    <div class="list-section-label">Optional filters</div>${extra.map(f => renderItem(f, packs)).join('')}`;
  await updateStats(packs);
  await updateStatusUI();

  qsa('.item input[type="checkbox"]').forEach(input => {
    input.addEventListener('change', async (e) => {
      const item = e.target.closest('.item');
      const id = item?.dataset.id;
      if (!id) return;
      const enable = !!e.target.checked;
      if (id === 'popup_guard') {
        await chrome.runtime.sendMessage({ type: 'set-popup-blocker-enabled', value: enable });
        await chrome.storage.local.set({ popupBlockerEnabled: enable });
      } else {
        await chrome.runtime.sendMessage({ type: 'toggle-pack', id, enable });
        const current = await chrome.storage.sync.get('packs');
        const nextPacks = current.packs || {};
        nextPacks[id] = enable;
        await chrome.storage.sync.set({ packs: nextPacks });
      }
      const packs = await getPacks();

      const subs = qs(`#subs-${id}`);
      if (subs) subs.classList.toggle('disabled', !enable);
      await updateStats(packs);
      await addActivity(`${item.querySelector('.titleRow')?.textContent || id} ${enable ? 'enabled' : 'paused'}.`, enable ? 'muted' : 'warn');
    });
  });
}

async function getActiveTab() {
  // activeTab is granted when the user opens the extension popup.
  // Avoid requesting optional "tabs" permission here; if users deny it, the UI
  // incorrectly falls back to "Limited" even on normal websites.
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  return tab || null;
}

function isWebUrl(url) {
  return /^https?:\/\//i.test(url || '');
}

function isRestrictedChromeUrl(url) {
  return /^(chrome|edge|brave|vivaldi|opera|about|devtools):\/\//i.test(url || '') ||
    /^chrome-extension:\/\//i.test(url || '') ||
    /^https:\/\/(chromewebstore\.google\.com|chrome\.google\.com\/webstore)/i.test(url || '');
}

async function loadCurrentSite() {
  const site = qs('#currentSite');
  const help = qs('#currentSiteHelp');
  const state = qs('#siteState');
  try {
    const tab = await getActiveTab();
    if (!tab?.url) {
      site.textContent = 'Current site unavailable';
      help.textContent = 'Open a normal website, then open JustBlock again.';
      state.textContent = 'Limited';
      state.classList.add('warn');
      return;
    }
    if (isRestrictedChromeUrl(tab.url)) {
      site.textContent = 'Restricted Chrome page';
      help.textContent = 'Chrome does not allow extensions to control this page. Protection resumes on normal websites.';
      state.textContent = 'Limited';
      state.classList.add('warn');
      return;
    }
    if (!isWebUrl(tab.url)) {
      site.textContent = 'Unsupported page';
      help.textContent = 'Site controls work on normal http/https websites.';
      state.textContent = 'Limited';
      state.classList.add('warn');
      return;
    }
    const url = new URL(tab.url);
    const host = url.hostname.replace(/^www\./, '');
    site.textContent = host;
    help.textContent = 'Protection is active on this website.';
    state.textContent = 'Active';
    state.classList.remove('warn');
    await updateBadgeFromChecks(null, 'scan', `${host}: checking now`);
    const packs = await getPacks();
    const { extensionEnabled = true } = await chrome.storage.local.get({ extensionEnabled: true });
    const insights = buildSmartActivity(tab, packs, extensionEnabled);
    await recordPageCheck(host, insights);
  } catch {
    site.textContent = 'Permission needed';
    help.textContent = 'Allow tab access to show site controls.';
    state.textContent = 'Needs access';
    state.classList.add('warn');
  }
}

async function allowlistCurrentSite() {
  const tab = await getActiveTab();
  if (!tab?.url || !isWebUrl(tab.url)) return;
  const host = new URL(tab.url).hostname.replace(/^www\./, '');
  await chrome.runtime.sendMessage({ type: 'allowlist-domain', domain: host });
  qs('#siteState').textContent = 'Trusted';
  qs('#siteState').classList.remove('warn');
  qs('#currentSiteHelp').textContent = `${host} is now in your trusted list.`;
  await addActivity(`${host} added to trusted sites.`, 'warn');
  maybeShowReviewPrompt();
}

async function cleanCurrentLink() {
  const status = qs('#junkCleanerStatus');
  const btn = qs('#junkCleanerBtn');
  btn.disabled = true;
  status.textContent = 'Checking link…';
  status.classList.remove('good');

  try {
    const tab = await getActiveTab();
    if (!tab?.url || !isWebUrl(tab.url)) throw new Error('This page cannot be cleaned.');
    const url = new URL(tab.url);
    const junkParams = ['utm_source','utm_medium','utm_campaign','utm_term','utm_content','utm_id','utm_referrer','utm_name','fbclid','gclid','msclkid','igshid'];
    let removed = 0;
    junkParams.forEach(key => { if (url.searchParams.has(key)) { url.searchParams.delete(key); removed++; } });
    if (!removed) {
      status.textContent = 'All clean — no tracking parameters found.';
      status.classList.add('good');
      await addActivity('Link cleaner checked this page — no tracking parameters found.', 'muted');
      return;
    }
    await chrome.tabs.update(tab.id, { url: url.toString() });
    status.textContent = `Cleaned ${removed} tracking parameter${removed > 1 ? 's' : ''}.`;
    status.classList.add('good');
    await addActivity(`Cleaned ${removed} tracking parameter${removed > 1 ? 's' : ''} from the current URL.`, 'muted');
    maybeShowReviewPrompt();
  } catch (e) {
    status.textContent = e.message || 'Could not clean this page.';
  } finally {
    btn.disabled = false;
  }
}

async function maybeShowReviewPrompt(force = false) {
  const { sentimentDone, popupOpens = 0 } = await chrome.storage.local.get({ sentimentDone: false, popupOpens: 0 });
  if (!sentimentDone && (force || popupOpens >= 3)) qs('#sentiment-ui')?.classList.remove('hidden');
}

function wireReviewPrompt() {
  qs('#btn-sentiment-yes')?.addEventListener('click', () => {
    qs('#sentiment-step-1').classList.add('hidden');
    qs('#sentiment-step-love').classList.remove('hidden');
  });
  qs('#btn-sentiment-no')?.addEventListener('click', () => {
    qs('#sentiment-step-1').classList.add('hidden');
    qs('#sentiment-step-hate').classList.remove('hidden');
  });
  qs('#btn-rate-extension')?.addEventListener('click', openReviewPage);
  qs('#btn-contact-support')?.addEventListener('click', openFeedbackPage);
}

function wireGlobalControls() {
  qs('#popupEnabled')?.addEventListener('change', async e => {
    const enabled = !!e.target.checked;
    await chrome.runtime.sendMessage({ type: 'set-extension-enabled', value: enabled });
    await updateStatusUI();
    await addActivity(enabled ? 'Protection resumed.' : 'Protection paused by user.', enabled ? 'muted' : 'warn');
  });
  qs('#allowlistBtn')?.addEventListener('click', allowlistCurrentSite);
  qs('#junkCleanerBtn')?.addEventListener('click', cleanCurrentLink);
  qs('#openOptionsBtn')?.addEventListener('click', () => chrome.runtime.openOptionsPage());
  qs('#showAllBtn')?.addEventListener('click', e => {
    const list = qs('#list');
    list.classList.toggle('expanded');
    e.target.textContent = list.classList.contains('expanded') ? 'Collapse' : 'Show all';
  });
  qs('#footerRateBtn')?.addEventListener('click', openReviewPage);
}

chrome.storage.onChanged.addListener(async (changes, area) => {
  if (area === 'local' && changes.extensionEnabled) { updateStatusUI(); updateBadgeFromChecks(); }
  if (area === 'sync' && changes.packs) renderFeatures();
});

document.addEventListener('DOMContentLoaded', async () => {
  wireGlobalControls();
  wireReviewPrompt();
  await refreshActivityCounters();
  startLiveActivityTicker();
  await trackPopupOpen();
  await renderFeatures();
  await loadCurrentSite();
});
