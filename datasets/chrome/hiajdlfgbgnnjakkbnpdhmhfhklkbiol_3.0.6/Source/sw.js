// JustBlock MV3 Service Worker — cleaned & whitelist-ready

// === Defaults ===
const DEFAULT_ENABLE = ["rules_mail", "rules_crypto", "rules_fb", "rules_file"];
const DAY_KEY = new Date().toISOString().slice(0, 10);

// === Seed safe default packs if unset ===
async function seedDefaultPacksIfUnset() {
  try {
    const { packs } = await chrome.storage.sync.get('packs');
    if (packs && Object.keys(packs).length) return; // already set by user
    const all = await getAllRuleIds();
    const seeded = {};
    for (const id of all) {
      seeded[id] = DEFAULT_ENABLE.includes(id); // safe defaults only
    }
    await chrome.storage.sync.set({ packs: seeded });
  } catch (e) {
    console.warn('seedDefaultPacksIfUnset failed', e);
  }
}


// === Whitelist cache ===
let JB_WHITELIST = [];

function isWhitelistedHost(urlString) {
  try {
    const h = new URL(urlString).hostname.toLowerCase().replace(/^www\./, '');
    return JB_WHITELIST.some(d => h === d || h.endsWith('.' + d));
  } catch { return false; }
}

// ---- Whitelist sync (array + DNR allow rules) ----
async function jbSyncWhitelistArray() {
  return new Promise(resolve => {
    chrome.storage.local.get(['whitelist'], ({ whitelist }) => {
      JB_WHITELIST = Array.isArray(whitelist) ? whitelist : [];
      resolve(JB_WHITELIST);
    });
  });
}

async function jbSyncDnrAllowRules() {
  const { whitelist = [] } = await chrome.storage.local.get('whitelist');
  const baseId = 900000; // high id range to avoid collisions
  const existing = await chrome.declarativeNetRequest.getDynamicRules();
  const toRemove = existing.filter(r => r.id >= baseId && r.id < baseId + 5000).map(r => r.id);
  if (toRemove.length) {
    await chrome.declarativeNetRequest.updateDynamicRules({ removeRuleIds: toRemove });
  }
  const addRules = whitelist.map((d, i) => ({
    id: baseId + i,
    priority: 100000,
    action: { type: 'allow' },
    condition: {
      initiatorDomains: [d],
      requestDomains: [d],
      resourceTypes: ["main_frame", "sub_frame", "script", "image", "xmlhttprequest", "media", "font", "stylesheet", "other"]
    }
  }));
  if (addRules.length) {
    await chrome.declarativeNetRequest.updateDynamicRules({ addRules });
  }
}

// ---- Ruleset helpers (packs) ----
async function getAllRuleIds() {
  // derive from manifest
  const manifest = chrome.runtime.getManifest();
  const res = (manifest.declarative_net_request?.rule_resources || []).map(r => r.id);
  return res;
}

async function getDesiredPackIdsFromStorage() {
  const all = await getAllRuleIds();
  try {
    const { packs = {} } = await chrome.storage.sync.get('packs');

    // Logic: If a "Parent" pack is present but FALSE, its children must be FALSE in the final list.
    // Hardcoded relationships for robustness (since SW doesn't know UI structure)
    const DEPENDENCIES = {
      'rules_fb': ['rules_fb_tracking', 'rules_fb_seen', 'rules_fb_typing']
    };

    const activeIds = [];
    const allKnown = all || [];

    // Set of IDs explicitly disabled by parent logic
    const forcedDisabled = new Set();

    for (const [parent, children] of Object.entries(DEPENDENCIES)) {
      // Check parent state. If explicit in packs, use it. If missing, check default.
      // Default for rules_fb is TRUE.
      const parentIsDefaultOn = DEFAULT_ENABLE.includes(parent);
      const parentState = packs.hasOwnProperty(parent) ? !!packs[parent] : parentIsDefaultOn;

      if (!parentState) {
        children.forEach(c => forcedDisabled.add(c));
      }
    }

    for (const id of allKnown) {
      if (forcedDisabled.has(id)) continue; // Skip if parent killed it

      // Normal check
      const isDefault = DEFAULT_ENABLE.includes(id) || id === 'rules_fb_tracking'; // 'tracking' default is true
      const val = packs.hasOwnProperty(id) ? !!packs[id] : isDefault;
      if (val) activeIds.push(id);
    }

    return activeIds;
  } catch {
    return all.filter(id => DEFAULT_ENABLE.includes(id));
  }
}

async function getActuallyEnabledRuleIds() {
  try {
    const { enabledRulesets } = await chrome.declarativeNetRequest.getEnabledRulesets();
    return enabledRulesets || [];
  } catch {
    return [];
  }
}

async function saveCurrentEnabledPacks() {
  const enabledNow = await getActuallyEnabledRuleIds();
  await chrome.storage.local.set({ previousEnabledRuleIds: enabledNow });
  return enabledNow;
}

async function restorePreviousEnabledPacks() {
  const { previousEnabledRuleIds = [] } = await chrome.storage.local.get('previousEnabledRuleIds');
  if (previousEnabledRuleIds && previousEnabledRuleIds.length) return previousEnabledRuleIds;
  return await getDesiredPackIdsFromStorage();
}


function jbBadgeCountText(count) {
  const n = Number(count || 0);
  if (n <= 0) return 'ON';
  return n > 99 ? '99+' : String(n);
}

function jbBadgeTextForState(state, count, popupCount = 0) {
  if (state === 'popup') return popupCount > 9 ? 'P9+' : `P${popupCount || 1}`;
  if (state === 'track') return 'T';
  if (state === 'sensitive') return 'L';
  if (state === 'warn') return '!';
  if (state === 'scan') return '…';
  if (state === 'good') return '✓';
  return jbBadgeCountText(count);
}

function jbBadgeColorForState(state) {
  if (state === 'popup') return '#7c3aed';
  if (state === 'track') return '#0ea5e9';
  if (state === 'sensitive') return '#db2777';
  if (state === 'warn') return '#f59e0b';
  if (state === 'scan') return '#2563eb';
  if (state === 'good') return '#16a34a';
  return '#16a34a';
}

async function jbUpdateActionBadge() {
  try {
    const defaults = { extensionEnabled: true, checksToday: 0, badgeState: 'scan', badgeReason: 'protection active', popupBlockDay: DAY_KEY, popupsBlockedToday: 0 };
    const { extensionEnabled, checksToday, badgeState, badgeReason, popupBlockDay, popupsBlockedToday } = await chrome.storage.local.get(defaults);
    const popupCount = popupBlockDay === DAY_KEY ? Number(popupsBlockedToday || 0) : 0;
    await chrome.action.setBadgeText({ text: extensionEnabled ? jbBadgeTextForState(badgeState, checksToday, popupCount) : 'OFF' });
    await chrome.action.setBadgeBackgroundColor({ color: extensionEnabled ? jbBadgeColorForState(badgeState) : '#dc2626' });
    await chrome.action.setTitle({ title: extensionEnabled ? `JustBlock Security — ${badgeReason || ((checksToday || 0) + ' page checks today')}` : 'JustBlock Security — protection paused' });
  } catch (e) {
    console.warn('badge update failed', e);
  }
}

async function jbLogActivity(message, kind = 'muted') {
  try {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const { activityLog = [] } = await chrome.storage.local.get({ activityLog: [] });
    const next = [{ message, kind, time }, ...(Array.isArray(activityLog) ? activityLog : [])].slice(0, 4);
    await chrome.storage.local.set({ activityLog: next });
  } catch (_) {}
}

// === Apply master enable/disable ===
async function applyExtensionEnabledState() {
  const { extensionEnabled = true } = await chrome.storage.local.get({ extensionEnabled: true });
  const allIds = await getAllRuleIds();
  if (!allIds.length) return;
  if (extensionEnabled) {
    try {
      const toEnable = await restorePreviousEnabledPacks();
      const toDisable = allIds.filter(id => !toEnable.includes(id));
      await chrome.declarativeNetRequest.updateEnabledRulesets({ enableRulesetIds: toEnable, disableRulesetIds: toDisable });
    } catch (e) { console.warn('Failed to restore packs', e); }
  } else {
    try {
      await saveCurrentEnabledPacks();
      await chrome.declarativeNetRequest.updateEnabledRulesets({ enableRulesetIds: [], disableRulesetIds: allIds });
    } catch (e) { console.warn('Failed to disable all rules', e); }
  }
}

// Keep packs in sync if popup toggles them
chrome.storage.onChanged.addListener((changes, area) => {
  if (area === 'sync' && changes.packs) {
    // apply user's desired packs, but respect master toggle
    applyExtensionEnabledState().then(jbUpdateActionBadge);
  }
});

// ===== Message handler from popup/options =====
chrome.runtime.onMessage.addListener((msg, sender, sendReply) => {
  (async () => {
    try {
      if (msg?.type === "toggle-pack") {
        // Persist desired state to storage.sync
        const { packs = {} } = await chrome.storage.sync.get('packs');
        packs[msg.id] = !!msg.enable;
        await chrome.storage.sync.set({ packs });
        await applyExtensionEnabledState();
    await jbUpdateActionBadge();
        await jbUpdateActionBadge();
        await jbLogActivity(`${msg.id} ${msg.enable ? 'enabled' : 'paused'}.`, msg.enable ? 'muted' : 'warn');
        sendReply({ ok: true });
        return;
      }
      if (msg?.type === "allowlist-domain" && msg.domain) {
        const domain = String(msg.domain).toLowerCase().replace(/^www\./, '');
        const { whitelist = [] } = await chrome.storage.local.get('whitelist');
        const next = Array.from(new Set([...(Array.isArray(whitelist) ? whitelist : []), domain]));
        await chrome.storage.local.set({ whitelist: next });
        await jbSyncWhitelistArray();
        await jbSyncDnrAllowRules();
        await jbLogActivity(`${domain} added to trusted sites.`, 'warn');
        sendReply({ ok: true, added: domain });
        return;
      }
      if (msg?.type === "set-extension-enabled") {
        await chrome.storage.local.set({ extensionEnabled: !!msg.value });
        await applyExtensionEnabledState();
        await jbUpdateActionBadge();
        await jbLogActivity(msg.value ? 'Protection resumed.' : 'Protection paused by user.', msg.value ? 'muted' : 'warn');
        sendReply({ ok: true });
        return;
      }
      if (msg?.type === "set-popup-blocker-enabled") {
        await chrome.storage.local.set({ popupBlockerEnabled: !!msg.value });
        await jbLogActivity(msg.value ? 'Popup Guard enabled — automatic popups will be stopped.' : 'Popup Guard paused.', msg.value ? 'muted' : 'warn');
        await jbUpdateActionBadge();
        sendReply({ ok: true });
        return;
      }
      if (msg?.type === "popup-blocked-activity") {
        const { popupBlockDay = DAY_KEY, popupsBlockedToday = 0 } = await chrome.storage.local.get({ popupBlockDay: DAY_KEY, popupsBlockedToday: 0 });
        const nextCount = popupBlockDay === DAY_KEY ? Number(popupsBlockedToday || 0) + 1 : 1;
        const host = String(msg.host || 'this site').replace(/^www\./, '');
        const reason = String(msg.reason || 'unwanted popup blocked');
        await chrome.storage.local.set({ popupBlockDay: DAY_KEY, popupsBlockedToday: nextCount, badgeState: 'popup', badgeReason: `${host}: ${reason}` });
        await jbLogActivity(`Popup Guard stopped ${reason} on ${host}.`.replace(' on .', ' on this site.'), 'good');
        await jbUpdateActionBadge();
        sendReply({ ok: true, count: nextCount });
        return;
      }
      sendReply({ ok: false, error: "unknown_message" });
    } catch (e) {
      console.warn('Message handler error', e);
      try { sendReply({ ok: false, error: String(e) }); } catch (_) { }
    }
  })();
  return true; // keep channel open for async reply
});

// ---- Init on startup ----
(async () => {
  try {
    await jbSyncWhitelistArray();
    await jbSyncDnrAllowRules();
    await applyExtensionEnabledState();
    const { popupBlockerEnabled } = await chrome.storage.local.get('popupBlockerEnabled');
    if (typeof popupBlockerEnabled === 'undefined') await chrome.storage.local.set({ popupBlockerEnabled: true });
    await jbUpdateActionBadge();
  } catch (e) {
    console.warn('Init failed', e);
  }
})();

chrome.runtime.onInstalled.addListener(() => {
  seedDefaultPacksIfUnset();
  jbSyncWhitelistArray().then(jbSyncDnrAllowRules);
  applyExtensionEnabledState().then(jbUpdateActionBadge);
  chrome.storage.local.set({ badgeState: 'active', badgeReason: 'protection active — open any website for a live check' }).then(jbUpdateActionBadge);
  getDesiredPackIdsFromStorage().then(ids => jbLogActivity(`${ids.length} enabled shields ready for the next website you open.`, 'muted'));
});

chrome.runtime.onStartup.addListener(() => {
  seedDefaultPacksIfUnset();
  jbSyncWhitelistArray().then(jbSyncDnrAllowRules);
  applyExtensionEnabledState().then(jbUpdateActionBadge);
});

chrome.storage.onChanged.addListener((c, area) => {
  if (area === 'local' && c.whitelist) {
    jbSyncWhitelistArray().then(jbSyncDnrAllowRules);
  }
  if (area === 'local' && (c.checksToday || c.extensionEnabled)) {
    jbUpdateActionBadge();
  }
});
