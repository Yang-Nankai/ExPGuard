// Import rule updater instance
import { ruleUpdater } from './rule_updater.js';

const MAX_LOG_ENTRIES = 100;
async function logMessage(message) {
    const timestamp = new Date().toLocaleTimeString('en-GB');
    const logEntry = `[${timestamp}] ${message}`;
    console.log(logEntry); // For service worker debugging

    try {
        const { debugLogs = [] } = await chrome.storage.local.get('debugLogs');
        debugLogs.push(logEntry);
        if (debugLogs.length > MAX_LOG_ENTRIES) {
            debugLogs.splice(0, debugLogs.length - MAX_LOG_ENTRIES);
        }
        await chrome.storage.local.set({ debugLogs });
    } catch (e) {
        console.error("Failed to write to debug log:", e);
    }
}

const SERVER_RULESET_ID = 'server_rules';
const EASYLIST_RULESET_ID = 'easylist_rules';
// Only these two big lists are static rulesets, toggled together by the global
// on/off switch. The YouTube/Twitch ad-domain rules are applied as DYNAMIC rules
// instead (see syncVideoRules) so they have a separate quota and are not at
// the mercy of the shared global static-rule pool.
const STATIC_RULESET_IDS = [SERVER_RULESET_ID, EASYLIST_RULESET_ID];

// YouTube/Twitch network rules — bundled file, applied as dynamic rules.
// Dynamic rules use a separate ~30k quota (MAX_NUMBER_OF_DYNAMIC_RULES) that is
// independent of the static-rule limit, so these 37 rules are guaranteed to apply
// even though easylist + server already use ~128k static rules and may be capped
// by Chrome's shared global static-rule pool.
const VIDEO_RULES_PATH = 'video/rules.json';
// Dynamic-rule id space, kept far above the disabled-site allow rules (ids 1..N)
// so the two sets never collide.
const VIDEO_DYN_ID_BASE = 900000;
let cosmeticRules = [];

// ── Unified ad-block stats (lightweight, debounced) ──
// Every blocking layer that can see what it removed reports each blocked ad via
// { type: 'AD_BLOCKED' }: the YouTube/Twitch content scripts (video ads) and the
// cosmetic counter (hidden ad elements on other sites). They all add up to one
// `adsBlocked` total. (Network-level DNR blocks are invisible in MV3 and not
// counted.) The count is cached in memory and flushed at most once per second.
let adsBlocked = null;
let statsFlushTimer = null;

async function ensureStatsLoaded() {
    if (adsBlocked !== null) return;
    const { adsBlocked: stored = 0 } = await chrome.storage.local.get('adsBlocked');
    adsBlocked = stored;
}

function scheduleStatsFlush() {
    if (statsFlushTimer) return;
    statsFlushTimer = setTimeout(() => {
        statsFlushTimer = null;
        chrome.storage.local.set({ adsBlocked });
    }, 1000);
}

async function handleAdBlocked(count) {
    await ensureStatsLoaded();
    adsBlocked += count;
    scheduleStatsFlush();
}

// Sync dynamic allow-rules for disabled sites so static rulesets are bypassed per domain
async function syncDisabledSiteRules() {
    const { disabledSites = [], globalEnabled = true } = await chrome.storage.sync.get(['disabledSites', 'globalEnabled']);

    const existing = await chrome.declarativeNetRequest.getDynamicRules();
    const allowRuleIds = existing.filter(r => r.action.type === 'allow').map(r => r.id);

    const addRules = [];
    if (globalEnabled) {
        disabledSites.forEach((domain, index) => {
            addRules.push({
                id: index + 1,
                priority: 9999,
                action: { type: 'allow' },
                condition: { initiatorDomains: [domain] }
            });
        });
    }

    await chrome.declarativeNetRequest.updateDynamicRules({
        removeRuleIds: allowRuleIds,
        addRules
    });
    logMessage(`Synced ${addRules.length} dynamic allow rules for disabled sites.`);
}

// Apply (or remove) the YouTube/Twitch ad-domain rules as dynamic rules. Dynamic
// rules have their own quota, independent of the static-rule limit, so these are
// guaranteed to be installed regardless of how many static (easylist) rules exist.
// Only block-type rules in our id range are touched — the disabled-site allow
// rules (ids 1..N) are left untouched and still override these (priority 9999).
async function syncVideoRules(enabled) {
    try {
        const existing = await chrome.declarativeNetRequest.getDynamicRules();
        const ourIds = existing
            .filter(r => r.id >= VIDEO_DYN_ID_BASE)
            .map(r => r.id);

        let addRules = [];
        if (enabled) {
            const resp = await fetch(chrome.runtime.getURL(VIDEO_RULES_PATH));
            const raw = await resp.json();
            addRules = raw.map(r => ({
                id: VIDEO_DYN_ID_BASE + r.id,
                priority: r.priority || 1,
                action: r.action,
                condition: r.condition,
            }));
        }

        await chrome.declarativeNetRequest.updateDynamicRules({
            removeRuleIds: ourIds,
            addRules,
        });
        logMessage(`Synced ${addRules.length} YouTube/Twitch dynamic rules (enabled=${enabled}).`);
    } catch (error) {
        console.error('Failed to sync YouTube/Twitch dynamic rules:', error);
        logMessage(`Failed to sync YouTube/Twitch dynamic rules: ${error.message}`);
    }
}

// Load rules from storage and populate global variables
async function loadRulesFromStorage() {
    try {
        // This now loads raw text from storage and parses it, returning both rule types.
        const { dnrRules, cosmeticRules: loadedCosmetic } = await ruleUpdater.loadAndProcessRulesFromStorage();
        
        if (loadedCosmetic && loadedCosmetic.length > 0) {
            cosmeticRules = loadedCosmetic;
            logMessage(`Loaded and parsed ${cosmeticRules.length} cosmetic rules from storage.`);
            logMessage(`Sample: ${JSON.stringify(cosmeticRules.slice(0, 3))}`);
            console.log(`Loaded and parsed ${cosmeticRules.length} cosmetic rules from storage.`);
        } else {
            cosmeticRules = [];
            logMessage('No raw rules found in storage for parsing.');
            console.log('No raw rules found in storage for parsing.');
        }
        // IMPORTANT: Return the dnrRules that were just parsed.
        return { dnrRules };
    } catch (error) {
        console.error("Failed to load and parse rules from storage:", error);
        logMessage(`Failed to load and parse rules from storage: ${error.message}`);
        cosmeticRules = [];
        return { dnrRules: [] };
    }
}

chrome.runtime.onInstalled.addListener(async (details) => {
    chrome.runtime.setUninstallURL("https://adblocker-dlg.pages.dev/uninstall-page");
    if (details.reason === 'install') {
        chrome.tabs.create({
            url: 'welcome_page/index.html'
        });
    }
    if (details.reason === 'install' || details.reason === 'update') {
        console.log(`Extension ${details.reason}ed. Processing bundled rule lists...`);
        try {
            const { cosmeticRules: newCosmeticRules } = await ruleUpdater.processBundledLists();
            cosmeticRules = newCosmeticRules;
            // Динамические правила больше не применяются
        } catch (error) {
            console.error(`Failed to process rules from bundled files on ${details.reason}:`, error);
        }
    }
});

async function startupTasks() {
    console.log("Service worker started. Loading rules and scheduling updates.");
    await loadRulesFromStorage();
    if (cosmeticRules.length === 0) {
        console.log("No rules found in storage. Processing bundled lists as a fallback.");
        logMessage("No rules in storage. Processing bundled lists as a fallback.");
        try {
            const processed = await ruleUpdater.processBundledLists();
            cosmeticRules = processed.cosmeticRules;
        } catch (error) {
            console.error("Failed to process bundled lists on startup:", error);
            logMessage(`Failed to process bundled lists on startup: ${error.message}`);
        }
    }
    const { globalEnabled = true } = await chrome.storage.sync.get('globalEnabled');
    logMessage(`Startup: Global protection is ${globalEnabled ? 'enabled' : 'disabled'}.`);
    if (globalEnabled) {
        await chrome.declarativeNetRequest.updateEnabledRulesets({
            enableRulesetIds: STATIC_RULESET_IDS
        });
    } else {
        await chrome.declarativeNetRequest.updateEnabledRulesets({
            disableRulesetIds: STATIC_RULESET_IDS
        });
        logMessage('Network rules disabled as per settings.');
    }
    await syncVideoRules(globalEnabled);
    await syncDisabledSiteRules();
}

// Run startup tasks every time the service worker starts.
startupTasks();

function getSelectorsForDomain(structuredRules, targetDomain) {
  const cssSelectors = new Set();

  const addSelectorWithHeuristics = (selector) => {
    cssSelectors.add(selector);
    // Heuristic: If a rule is a simple class selector (e.g., ".ad-unit"),
    // also create a corresponding attribute selector for 'data-testid'.
    // This helps block ads on modern sites (React, etc.) that use test IDs for ad containers.
    if (/^\.[a-zA-Z0-9_-]+$/.test(selector)) {
      const className = selector.substring(1);
      const attributeSelector = `[data-testid="${className}"]`;
      cssSelectors.add(attributeSelector);
    }
  };

  structuredRules.forEach(rule => {
    // rule is { domains: string[], selector: string }

    // Generic rule (e.g., "##.ad-banner") applies everywhere.
    if (rule.domains.length === 0) {
      addSelectorWithHeuristics(rule.selector);
      return;
    }

    // A rule is invalid for a domain if it's explicitly excluded.
    const isExcluded = rule.domains.some(domain => {
      if (!domain.startsWith('~')) return false;
      const cleanDomain = domain.substring(1);
      return targetDomain === cleanDomain || targetDomain.endsWith('.' + cleanDomain);
    });

    if (isExcluded) {
      return; // Do not apply this rule.
    }

    const inclusionDomains = rule.domains.filter(d => !d.startsWith('~'));

    // If there are no inclusion domains (e.g., "~example.com##.ad"),
    // it applies to all domains EXCEPT the excluded ones.
    if (inclusionDomains.length === 0) {
      addSelectorWithHeuristics(rule.selector);
      return;
    }

    // If there are inclusion domains, it applies only if one matches.
    const isIncluded = inclusionDomains.some(domain => {
      return targetDomain === domain || targetDomain.endsWith('.' + domain);
    });

    if (isIncluded) {
      addSelectorWithHeuristics(rule.selector);
    }
  });

  return Array.from(cssSelectors);
}

// Function to convert cosmetic rules to a CSS string for a specific domain.
function convertCosmeticRulesToCss(structuredRules, targetDomain) {
  const selectors = getSelectorsForDomain(structuredRules, targetDomain);
  // Create a separate rule for each selector for better performance and to avoid selector list length limits.
  if (selectors.length > 0) {
    return selectors.map(selector => `${selector} { display: none !important; }`).join('\n');
  }

  return "";
}

// Check if extension is enabled for a specific domain
async function isEnabledForDomain(domain) {
  return new Promise((resolve) => {
    chrome.storage.sync.get(['globalEnabled', 'disabledSites'], function(result) {
      const globalEnabled = result.globalEnabled !== false; // Default to true
      const disabledSites = result.disabledSites || [];
      const siteEnabled = globalEnabled && !disabledSites.includes(domain);
      resolve(siteEnabled);
    });
  });
}

// Inject content script and apply cosmetic rules on tab update
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (changeInfo.status === 'loading' && tab.url && tab.url.startsWith('http')) {
    const url = new URL(tab.url);
    const domain = url.hostname;

    // If service worker restarted, `cosmeticRules` will be empty. Reload them.
    if (cosmeticRules.length === 0) {
        logMessage("Cosmetic rules empty, reloading from storage...");
        await loadRulesFromStorage();
    }

    const enabled = await isEnabledForDomain(domain);
    logMessage(`Tab ${tabId} updated to loading: ${domain}. Protection enabled: ${enabled}.`);
    if (enabled) {
      const cssToInject = convertCosmeticRulesToCss(cosmeticRules, domain);
      if (cssToInject) {
        logMessage(`Injecting CSS (${cssToInject.length} bytes) into tab ${tabId}.`);
        chrome.scripting.insertCSS({
          target: { tabId: tabId, allFrames: true },
          css: cssToInject,
        }).catch(error => {
            // This can happen if the tab is closed or it's a restricted page.
            if (!error.message.includes("No tab with id") && !error.message.includes("cannot be scripted")) {
               logMessage(`Could not insert CSS into tab ${tabId}: ${error.message}`);
               console.warn(`Could not insert CSS into tab ${tabId}: ${error.message}`);
            }
        });
      } else {
        logMessage(`No applicable cosmetic rules found for domain: ${domain}.`);
      }
    }
  }
});

// Handle messages from popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  // YouTube/Twitch content scripts ask whether blocking is active for their tab.
  // Reuses the same global + per-site state as the rest of the extension.
  if (message.type === 'GET_STATE') {
    (async () => {
      let domain = '';
      try { domain = new URL(sender.tab?.url || sender.url || '').hostname; } catch {}
      const enabled = domain ? await isEnabledForDomain(domain) : true;
      sendResponse({ enabled });
    })();
    return true;
  }

  // Any blocking layer (video scripts, cosmetic counter) reports a blocked ad.
  if (message.type === 'AD_BLOCKED') {
    handleAdBlocked(message.count || 1);
    sendResponse({ success: true });
    return true;
  }

  // The cosmetic counter asks for the selectors that apply to its page so it can
  // count hidden ad elements. Returns [] when blocking is off for the domain
  // (then nothing is hidden, so nothing should be counted).
  if (message.type === 'GET_COSMETIC_SELECTORS') {
    (async () => {
      let domain = '';
      try { domain = new URL(sender.tab?.url || sender.url || '').hostname; } catch {}
      if (!domain) { sendResponse({ selectors: [] }); return; }
      if (cosmeticRules.length === 0) await loadRulesFromStorage();
      const enabled = await isEnabledForDomain(domain);
      const selectors = enabled ? getSelectorsForDomain(cosmeticRules, domain) : [];
      sendResponse({ selectors });
    })();
    return true;
  }

  if (message.type === 'DISABLE_RULES') {
    (async () => {
      await chrome.declarativeNetRequest.updateEnabledRulesets({
          disableRulesetIds: STATIC_RULESET_IDS
      });
      await syncVideoRules(false);
      await syncDisabledSiteRules();
      logMessage('All rulesets disabled.');
      sendResponse({ success: true });
    })();
    return true;
  }

  if (message.type === 'ENABLE_RULES') {
    (async () => {
      await chrome.declarativeNetRequest.updateEnabledRulesets({
          enableRulesetIds: STATIC_RULESET_IDS
      });
      await syncVideoRules(true);
      await syncDisabledSiteRules();
      logMessage('All rulesets enabled.');
      sendResponse({ success: true });
    })();
    return true;
  }

  if (message.type === 'SYNC_DISABLED_SITES') {
    (async () => {
      await syncDisabledSiteRules();
      sendResponse({ success: true });
    })();
    return true;
  }

  if (message.type === 'GET_DEBUG_INFO') {
    (async () => {
        if (cosmeticRules.length === 0) {
            await loadRulesFromStorage();
        }
        const selectors = getSelectorsForDomain(cosmeticRules, message.domain);
        sendResponse({ selectors });
    })();
    return true; // async
  }

  if (message.type === 'FORCE_APPLY_COSMETIC') {
    (async () => {
        const { tabId, domain } = message;
        if (cosmeticRules.length === 0) {
            await loadRulesFromStorage();
        }
        const cssToInject = convertCosmeticRulesToCss(cosmeticRules, domain);
        if (cssToInject) {
            chrome.scripting.insertCSS({
                target: { tabId: tabId, allFrames: true },
                css: cssToInject,
            }).catch(err => {
                logMessage(`Force apply CSS failed for tab ${tabId}: ${err.message}`);
                console.warn(`Force apply CSS failed for tab ${tabId}: ${err.message}`);
            });
        }
        sendResponse({ success: true });
    })();
    return true;
  }
});

